import { request } from './request.mjs';
import { pctChange, inclusiveEnd, observedCoverage } from './period.mjs';

async function query(token, siteUrl, body) {
  const res = await request(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    { method: 'POST', headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' }, body: JSON.stringify(body) },
  );
  if (!res.ok) throw new Error(`GSC ${siteUrl}: ${res.status} ${await res.text()}`);
  return (await res.json()).rows || [];
}

// Walk results in 5000-row chunks (the API allows up to 25000 per response).
// with startRow. Stops as soon as a short page comes back.
async function pagedQuery(token, siteUrl, body, limit) {
  if (limit <= 5000) return query(token, siteUrl, { ...body, rowLimit: limit });
  const out = [];
  for (let start = 0; start < limit; start += 5000) {
    const rows = await query(token, siteUrl, { ...body, rowLimit: Math.min(5000, limit - start), startRow: start });
    out.push(...rows);
    if (rows.length < 5000) break;
  }
  return out;
}

function totals(rows) {
  return rows.reduce((a, r) => ({
    clicks: a.clicks + (r.clicks || 0),
    impressions: a.impressions + (r.impressions || 0),
  }), { clicks: 0, impressions: 0 });
}

export async function collectSearch(app, token, w, options = {}) {
  const site = app.gscProperty;
  // Aggregate totals for both windows.
  const curTotals = totals(await query(token, site, { startDate: w.curStart, endDate: inclusiveEnd(w.curEnd), dimensions: [] }));
  const prevTotals = totals(await query(token, site, { startDate: w.prevStart, endDate: inclusiveEnd(w.prevEnd), dimensions: [] }));

  // Top queries (current window) + top pages.
  const topQueries = (await query(token, site, {
    startDate: w.curStart, endDate: inclusiveEnd(w.curEnd), dimensions: ['query'], rowLimit: 25,
  })).map((r) => ({ query: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: +(r.ctr * 100).toFixed(2), position: +r.position.toFixed(1) }));

  // --pages N raises the page cap (paginated past GSC's 5000-row response limit).
  // The default 15 is enough to eyeball winners and far too few to say which
  // *surface* of a site earns; a per-surface answer needs the whole list.
  const pageLimit = Math.max(1, Number(options.pages) || 15);
  const topPages = (await pagedQuery(token, site, {
    startDate: w.curStart, endDate: inclusiveEnd(w.curEnd), dimensions: ['page'],
  }, pageLimit)).map((r) => ({ page: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: +(r.ctr * 100).toFixed(2), position: +r.position.toFixed(1) }));

  // Movers: query clicks delta cur vs prev.
  const prevByQuery = new Map((await query(token, site, {
    startDate: w.prevStart, endDate: inclusiveEnd(w.prevEnd), dimensions: ['query'], rowLimit: 100,
  })).map((r) => [r.keys[0], r.clicks]));
  const movers = topQueries.map((q) => ({ query: q.query, clicksNow: q.clicks, clicksPrev: prevByQuery.get(q.query) ?? null, delta: prevByQuery.has(q.query) ? q.clicks - prevByQuery.get(q.query) : null }))
    .sort((a, b) => Math.abs(b.delta ?? 0) - Math.abs(a.delta ?? 0)).slice(0, 10);

  const daily = await query(token, site, { startDate: w.prevStart, endDate: inclusiveEnd(w.curEnd), dimensions: ['date'], rowLimit: 1000 });
  const dates = daily.map(r => r.keys[0]).sort();
  const periods = observedCoverage(dates, w);
  return {
    status: periods.comparable ? "ready" : "partial",
    dataThrough: dates.at(-1) || null, daily,
    coverage: { periods, timezone: 'America/Los_Angeles', dataState: 'final', pagesLimit: pageLimit, pagesPossiblyTruncated: topPages.length === pageLimit, queriesLimit: 25, priorQueriesLimit: 100, note: 'Query/page rows omit anonymized searches. A missing prior query is unknown, not zero; movers cover current top queries only.' },
    source: 'gsc', app: app.slug, property: site, window: w,
    totals: {
      current: curTotals, prior: prevTotals,
      change: { clicks: periods.comparable ? pctChange(curTotals.clicks, prevTotals.clicks) : null, impressions: periods.comparable ? pctChange(curTotals.impressions, prevTotals.impressions) : null },
      ctrNow: curTotals.impressions ? +((curTotals.clicks / curTotals.impressions) * 100).toFixed(2) : 0,
    },
    topQueries, topPages, movers,
  };
}
