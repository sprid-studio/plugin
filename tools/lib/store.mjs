import { request } from './request.mjs';
import { gunzipSync } from 'node:zlib';
import { inclusiveEnd, observedCoverage } from './period.mjs';
const ASC = 'https://api.appstoreconnect.apple.com/v1';

async function ascGet(token, url) {
  const target = new URL(url.startsWith('http') ? url : `${ASC}${url}`);
  if (target.origin !== 'https://api.appstoreconnect.apple.com' || target.username || target.password) throw new Error('ASC returned an unexpected pagination host');
  const res = await request(target.href, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`ASC ${url}: ${res.status} ${await res.text()}`);
  return res.json();
}

async function ascList(token, url) {
  const data = [];
  const visited = new Set();
  while (url) {
    if (visited.size >= 20) throw new Error('ASC pagination exceeded 20 pages; review coverage is incomplete');
    if (visited.has(url)) throw new Error('ASC pagination repeated a page');
    visited.add(url);
    const page = await ascGet(token, url);
    data.push(...(page.data || []));
    url = page.links?.next;
  }
  return { data };
}

async function ascEnsureReportRequest(token, appId, allowCreate = false) {
  // Reuse an existing ONGOING request if present, else create one.
  const existing = await ascList(token, `/apps/${appId}/analyticsReportRequests`);
  const ongoing = (existing.data || []).find((r) => r.attributes?.accessType === 'ONGOING');
  if (ongoing) return { id: ongoing.id, created: false };
  if (!allowCreate) return null;
  const res = await request(`${ASC}/analyticsReportRequests`, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({ data: {
      type: 'analyticsReportRequests',
      attributes: { accessType: 'ONGOING' },
      relationships: { app: { data: { type: 'apps', id: appId } } },
    } }),
  });
  if (!res.ok) throw new Error(`ASC create report request: ${res.status} ${await res.text()}`);
  const j = await res.json();
  return { id: j.data.id, created: true };
}

// Parse an Apple analytics TSV: return [{...columns}] keyed by trimmed header names.
function parseTsv(txt) {
  const lines = txt.split('\n').filter((l) => l.length);
  if (!lines.length) return [];
  const header = lines[0].split('\t').map((h) => h.trim());
  return lines.slice(1).map((l) => {
    const cells = l.split('\t');
    const row = {};
    header.forEach((h, i) => { row[h] = (cells[i] ?? '').trim(); });
    return row;
  });
}
// Find a column name matching any regex. Regexes are tried in order, so pass the
// most specific/correct column FIRST — several Apple reports carry near-miss columns
// (e.g. "Engagement Type" sits next to "Event" but holds Get/Open, not Impression).
function col(row, ...res) {
  const keys = Object.keys(row);
  for (const re of res) { const k = keys.find((x) => re.test(x)); if (k) return k; }
  return null;
}

// Download every DAILY instance's segments overlapping [start,end), parse, and reduce
// with `fn`. `fn` receives (row, acc, rowDate) so callers can bucket by window themselves
// — we read the widest range once rather than re-downloading per window.
async function ascReadReport(token, reportId, start, end, fn, acc) {
  const instances = await ascList(token, `/analyticsReports/${reportId}/instances?filter[granularity]=DAILY&limit=200`);
  const inRange = (instances.data || []).filter((i) => {
    // processingDate is delivery time, not the date of the events. Late batches
    // delivered after end may still contain events inside the requested window.
    const d = i.attributes?.processingDate; return d && d >= start;
  });
  let sampledHeader = null;
  const dates = new Set();
  const readInstance = async (inst) => {
    const segs = await ascList(token, `/analyticsReportInstances/${inst.id}/segments`);
    for (const seg of segs.data || []) {
      const url = seg.attributes?.url; if (!url) continue;
      const response = await request(url);
      if (!response.ok) throw new Error(`ASC segment download: HTTP ${response.status}`);
      const buf = Buffer.from(await response.arrayBuffer());
      const txt = gunzipSync(buf, { maxOutputLength: 32 * 1024 * 1024 }).toString('utf8');
      const rows = parseTsv(txt);
      if (!sampledHeader && rows.length) sampledHeader = Object.keys(rows[0]);
      for (const r of rows) {
        const dk = col(r, /^Date$/i);
        const date = dk ? r[dk] : null;
        if (date && date >= start && date < end) dates.add(date);
        fn(r, acc, date);
      }
    }
  };
  // Independent daily instances dominate Apple latency. Keep a small pool and
  // reduce each download immediately instead of retaining whole reports in memory.
  // Drain in-flight reads on failure; never leave collectors running after return.
  let cursor = 0, stopped = false;
  const outcomes = await Promise.allSettled(Array.from({ length: Math.min(3, inRange.length) }, async () => {
    while (!stopped && cursor < inRange.length) {
      const inst = inRange[cursor++];
      try { await readInstance(inst); }
      catch (error) { stopped = true; throw error; }
    }
  }));
  const failed = outcomes.find(result => result.status === 'rejected');
  if (failed) throw failed.reason;
  return { instances: inRange.length, header: sampledHeader, dates: [...dates].sort() };
}

const emptyAscMetrics = () => ({ impressions: 0, productPageViews: 0, taps: 0, downloads: 0, firstTimeDownloads: 0, redownloads: 0 });

export async function collectAppStore(token, appId, w, allowCreate = false) {
  const req = await ascEnsureReportRequest(token, appId, allowCreate);
  if (!req) return { status: 'unconfigured', missing: ['No ONGOING analytics report request. After approval, run store.mjs --request-reports once to enable Apple report generation.'] };
  const reports = await ascList(token, `/analyticsReportRequests/${req.id}/reports?limit=200`);
  const byName = (needle) => (reports.data || []).find((r) => (r.attributes?.name || '') === needle);
  const downloads = byName('App Downloads Standard');
  const engagement = byName('App Store Discovery and Engagement Standard');
  if (!downloads && !engagement) {
    return { status: 'pending', note: 'Report definitions not present yet; Apple generates ~1-2 days after the first request.' };
  }

  // One pass over [prevStart, curEnd); each row is bucketed into cur/prev by its own Date.
  // Territory is tracked for BOTH windows and for impressions as well as downloads.
  // Impressions-by-territory is the only number that says whether a per-locale
  // listing change (name/subtitle/keywords) actually reached its storefront —
  // downloads alone can't distinguish "not shown" from "shown, not tapped".
  const acc = {
    cur: emptyAscMetrics(), prior: emptyAscMetrics(), bySource: {},
    dlBySource: {}, dlBySourceTerritory: {},
    byTerritory: {}, byTerritoryPrior: {},
    impByTerritory: {}, impByTerritoryPrior: {},
    maxDate: null,
  };
  const bucket = (a, d) => {
    if (!d || d < w.prevStart || d >= w.curEnd) return null;
    if (d && d >= w.curStart && (!a.maxDate || d > a.maxDate)) a.maxDate = d;
    return d >= w.curStart ? a.cur : (d >= w.prevStart ? a.prior : null);
  };
  const meta = {};

  if (engagement) {
    meta.engagement = await ascReadReport(token, engagement.id, w.prevStart, w.curEnd, (r, a, d) => {
      const m = bucket(a, d); if (!m) return;
      const cnt = +((r[col(r, /^Counts?$/i)] || '0').replace(/,/g, '')) || 0;
      // "Event" is the real discovery column (Impression / Page view / Tap).
      // "Engagement Type" holds Get/Open and must NOT be matched first.
      const type = (r[col(r, /^Event$/i, /Event Type/i) || ''] || '').toLowerCase();
      if (/impression/.test(type)) m.impressions += cnt;
      else if (/page view/.test(type)) m.productPageViews += cnt;
      else if (/tap/.test(type)) m.taps += cnt;
      if (m === a.cur && /impression|page view/.test(type)) {
        const src = r[col(r, /Source Type/i) || ''] || 'Unknown';
        a.bySource[src] = (a.bySource[src] || 0) + cnt;
      }
      if (/impression/.test(type)) {
        const t = r[col(r, /^Territory$/i) || ''] || 'Unknown';
        const bag = m === a.cur ? a.impByTerritory : a.impByTerritoryPrior;
        bag[t] = (bag[t] || 0) + cnt;
      }
    }, acc);
  }
  if (downloads) {
    meta.downloads = await ascReadReport(token, downloads.id, w.prevStart, w.curEnd, (r, a, d) => {
      const m = bucket(a, d); if (!m) return;
      const cnt = +((r[col(r, /^Counts?$/i)] || '0').replace(/,/g, '')) || 0;
      const type = (r[col(r, /Download Type/i) || ''] || '').toLowerCase();
      m.downloads += cnt;
      if (/first.time/.test(type)) m.firstTimeDownloads += cnt;
      else if (/re.?download/.test(type)) m.redownloads += cnt;
      {
        const t = r[col(r, /^Territory$/i) || ''] || 'Unknown';
        const bag = m === a.cur ? a.byTerritory : a.byTerritoryPrior;
        bag[t] = (bag[t] || 0) + cnt;
      }
      // First-time downloads measure acquisition; impressions measure exposure.
      // Keep territory splits because pooled source shares can hide differences.
      // Last-click attribution omits earlier visits that led to a store search.
      if (m === a.cur && /first.time/.test(type)) {
        const src = r[col(r, /Source Type/i) || ''] || 'Unknown';
        const t = r[col(r, /^Territory$/i) || ''] || 'Unknown';
        a.dlBySource[src] = (a.dlBySource[src] || 0) + cnt;
        a.dlBySourceTerritory[t] = a.dlBySourceTerritory[t] || {};
        a.dlBySourceTerritory[t][src] = (a.dlBySourceTerritory[t][src] || 0) + cnt;
      }
    }, acc);
  }

  const totalInstances = (meta.engagement?.instances || 0) + (meta.downloads?.instances || 0);
  if (totalInstances === 0) {
    return { status: 'pending', note: `Reports defined but no data instances in window yet (Apple still generating; request created this run=${req.created}). Re-run in 24-48h.` };
  }
  const c = acc.cur, p = acc.prior;
  const coverage = { engagement: observedCoverage(meta.engagement?.dates ?? [], w), downloads: observedCoverage(meta.downloads?.dates ?? [], w) };
  const pct = (now, was) => (was ? +(((now - was) / was) * 100).toFixed(1) : null);
  const rate = (n, d) => (d ? +((n / d) * 100).toFixed(1) : null);
  const topN = (o, n) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => ({ key: k, count: v }));
  // Same shape as topN plus the prior-window count and its % change, so a
  // per-market movement is readable without a second run. Ranked by the current
  // window; a territory that appears only in the prior window is still listed
  // (count 0) so a market going to zero is visible rather than silently absent.
  const topNWithPrior = (cur, prev, n, comparable) => {
    const keys = new Set([...Object.keys(cur), ...Object.keys(prev)]);
    return [...keys]
      .map((k) => {
        const count = cur[k] || 0;
        const prior = prev[k] || 0;
        return { key: k, count, prior, change: comparable ? pct(count, prior) : null };
      })
      .sort((a, b) => b.count - a.count || b.prior - a.prior)
      .slice(0, n);
  };

  return {
    status: coverage.engagement.comparable && coverage.downloads.comparable ? 'ready' : 'partial',
    coverage,
    window: `${w.curStart}..${w.curEnd}`,
    priorWindow: `${w.prevStart}..${w.prevEnd}`,
    dataThrough: acc.maxDate,
    metrics: c,
    prior: p,
    change: {
      impressions: coverage.engagement.comparable ? pct(c.impressions, p.impressions) : null,
      productPageViews: coverage.engagement.comparable ? pct(c.productPageViews, p.productPageViews) : null,
      downloads: coverage.downloads.comparable ? pct(c.downloads, p.downloads) : null,
      firstTimeDownloads: coverage.downloads.comparable ? pct(c.firstTimeDownloads, p.firstTimeDownloads) : null,
    },
    funnel: {
      impressionToPageViewPct: rate(c.productPageViews, c.impressions),
      pageViewToDownloadPct: rate(c.firstTimeDownloads, c.productPageViews),
    },
    discoveryBySource: topN(acc.bySource, 8),
    // Acquisition. Read this, not discoveryBySource, for "where do users come from".
    firstTimeDownloadsBySource: topN(acc.dlBySource, 8),
    firstTimeDownloadsBySourceTerritory: Object.entries(acc.dlBySourceTerritory)
      .map(([territory, srcs]) => ({
        territory,
        total: Object.values(srcs).reduce((x, y) => x + y, 0),
        sources: Object.entries(srcs).sort((a, b) => b[1] - a[1]).map(([key, count]) => ({ key, count })),
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 12),
    // 15, not 8: with seven shipping locales an 8-row list drops small markets
    // exactly when a localization change is what you're trying to evaluate.
    // (JP sat 7th at 47 impressions on 2026-08-31 and fell off the download list.)
    impressionsByTerritory: topNWithPrior(acc.impByTerritory, acc.impByTerritoryPrior, 15, coverage.engagement.comparable),
    downloadsByTerritory: topNWithPrior(acc.byTerritory, acc.byTerritoryPrior, 15, coverage.downloads.comparable),
    note: [
      'Apple privacy-thresholds low-volume rows, so impressions/page views undercount at small scale.',
      p.downloads === 0 && c.downloads > 0
        ? 'Prior downloads are zero. This can mean no downloads, suppressed rows, or unavailable history. Verify report coverage before interpreting a change.'
        : null,
      acc.maxDate && acc.maxDate < inclusiveEnd(w.curEnd) ? `ASC data runs through ${acc.maxDate}, not ${w.curEnd}.` : null,
    ].filter(Boolean).join(' '),
    _debug: meta,
  };
}

// ---- Google Play: bulk export CSV in the developer GCS bucket ----
async function gcsList(token, bucket, prefix) {
  const items = [];
  let pageToken;
  let pages = 0;
  do {
    if (++pages > 20) throw new Error('Play export listing exceeded 20 pages; review coverage is incomplete');
    const query = new URLSearchParams({ prefix });
    if (pageToken) query.set('pageToken', pageToken);
    const res = await request(`https://storage.googleapis.com/storage/v1/b/${bucket}/o?${query}`, { headers: { authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error(`GCS list ${bucket}: ${res.status} ${await res.text()}`);
    const page = await res.json();
    items.push(...(page.items || []));
    pageToken = page.nextPageToken;
  } while (pageToken);
  return items;
}
async function gcsGet(token, bucket, name) {
  const res = await request(`https://storage.googleapis.com/storage/v1/b/${bucket}/o/${encodeURIComponent(name)}?alt=media`, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`GCS get ${name}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return name.endsWith('.gz') ? gunzipSync(buf, { maxOutputLength: 32 * 1024 * 1024 }).toString('utf16le') : buf.toString('utf16le');
}

function bucketOk(b) { return b && !String(b).startsWith('TODO'); }

// Play bulk-export CSVs are UTF-16LE, comma-separated, with a U+FEFF BOM on the header.
function parseCsv(txt) {
  const records = [];
  let row = [], cell = '', quoted = false;
  for (const char of txt.replace(/^\uFEFF/, '')) {
    if (char === '"') { quoted = !quoted; }
    else if (char === ',' && !quoted) { row.push(cell.trim()); cell = ''; }
    else if (char === '\n' && !quoted) { row.push(cell.trim()); records.push(row); row = []; cell = ''; }
    else cell += char;
  }
  if (quoted) throw new Error('Play CSV ended inside a quoted field');
  if (cell || row.length) { row.push(cell.trim()); records.push(row); }
  const header = records.shift() || [];
  return records.filter(r => r.some(Boolean)).map(r => Object.fromEntries(header.map((h, i) => [h, r[i] || ''])));
}

// Every YYYYMM between two ISO dates, inclusive — a window can straddle a month boundary.
function monthsBetween(startIso, endIso) {
  const out = [];
  let y = +startIso.slice(0, 4), m = +startIso.slice(5, 7);
  const ey = +endIso.slice(0, 4), em = +endIso.slice(5, 7);
  while (y < ey || (y === ey && m <= em)) {
    out.push(`${y}${String(m).padStart(2, '0')}`);
    m += 1; if (m > 12) { m = 1; y += 1; }
  }
  return out;
}

export async function collectPlay(app, w, token) {
  const bucket = app.googlePlay.exportBucket;
  const pkg = app.googlePlay.packageName;
  // Read from prevStart so the prior window is covered too.
  const months = monthsBetween(w.prevStart, w.curEnd);

  const overviewRows = [];
  const countryRows = [];
  const files = [];
  for (const ym of months) {
    const items = await gcsList(token, bucket, `stats/installs/installs_${pkg}_${ym}`);
    for (const it of items) {
      files.push(it.name);
      const isOverview = it.name.endsWith('_overview.csv');
      const isCountry = it.name.endsWith('_country.csv');
      if (!isOverview && !isCountry) continue;
      const rows = parseCsv(await gcsGet(token, bucket, it.name));
      (isOverview ? overviewRows : countryRows).push(...rows);
    }
  }
  if (!overviewRows.length) {
    return { status: files.length ? 'no-data' : 'no-files', files, note: 'No overview CSV rows parsed for the window.' };
  }

  const num = (r, k) => +((r[k] || '0').replace(/,/g, '')) || 0;
  const dateOf = (r) => r[Object.keys(r).find((k) => /date/i.test(k))] || '';
  const sumWindow = (rows, start, end) => {
    const acc = { installs: 0, uninstalls: 0, updates: 0, userInstalls: 0, userUninstalls: 0, days: 0 };
    for (const r of rows) {
      const d = dateOf(r); if (!(d >= start && d < end)) continue;
      acc.days += 1;
      acc.installs += num(r, 'Daily Device Installs');
      acc.uninstalls += num(r, 'Daily Device Uninstalls');
      acc.updates += num(r, 'Daily Device Upgrades');
      acc.userInstalls += num(r, 'Daily User Installs');
      acc.userUninstalls += num(r, 'Daily User Uninstalls');
    }
    return acc;
  };

  const coverage = observedCoverage(overviewRows.map(dateOf), w);
  const cur = sumWindow(overviewRows, w.curStart, w.curEnd);
  const prior = sumWindow(overviewRows, w.prevStart, w.prevEnd);
  const inWindow = overviewRows
    .filter((r) => { const d = dateOf(r); return d >= w.curStart && d < w.curEnd; })
    .sort((a, b) => dateOf(a).localeCompare(dateOf(b)));
  // Play's bulk export lags several days — surface the real last day so a short Play
  // window is never silently compared against a full-length ASC/PostHog window.
  const dataThrough = inWindow.length ? dateOf(inWindow[inWindow.length - 1]) : null;
  // Active installs is a running snapshot, not a daily delta. The final partial day is
  // often exported as 0, so take the latest row that actually carries a value.
  const lastActive = [...inWindow].reverse().find((r) => num(r, 'Active Device Installs') > 0);

  const byCountry = {};
  for (const r of countryRows) {
    const d = dateOf(r); if (!(d >= w.curStart && d < w.curEnd)) continue;
    const c = r['Country'] || 'Unknown';
    const n = num(r, 'Daily Device Installs');
    if (n) byCountry[c] = (byCountry[c] || 0) + n;
  }
  const pct = (now, was) => (was ? +(((now - was) / was) * 100).toFixed(1) : null);

  return {
    status: cur.days === 0 ? 'no-data' : coverage.comparable ? 'ready' : 'partial',
    coverage,
    window: `${w.curStart}..${w.curEnd}`,
    priorWindow: `${w.prevStart}..${w.prevEnd}`,
    dataThrough,
    availableDataThrough: overviewRows.map(dateOf).sort().at(-1) || null,
    metrics: {
      installs: cur.installs,
      deviceUninstalls: cur.uninstalls,
      userInstalls: cur.userInstalls,
      userUninstalls: cur.userUninstalls,
      netUserInstalls: cur.userInstalls - cur.userUninstalls,
      updates: cur.updates,
      activeDeviceInstalls: lastActive ? num(lastActive, 'Active Device Installs') : null,
      activeAsOf: lastActive ? dateOf(lastActive) : null,
      daysCovered: cur.days,
    },
    prior: {
      installs: prior.installs,
      userInstalls: prior.userInstalls,
      userUninstalls: prior.userUninstalls,
      daysCovered: prior.days,
    },
    change: { installs: coverage.comparable ? pct(cur.installs, prior.installs) : null },
    note: dataThrough && dataThrough < inclusiveEnd(w.curEnd)
      ? `Play export lags: window ends ${w.curEnd} but data only runs through ${dataThrough} (${cur.days} of the requested days). Not directly comparable to ASC/PostHog totals.`
      : !dataThrough ? 'No exported days in the current window. Zero totals are unavailable data, not observed zero installs.' : undefined,
    installsByCountry: Object.entries(byCountry).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([k, v]) => ({ country: k, installs: v })),
    files,
  };
}
