import { request } from './request.mjs';
import { pctChange, observedCoverage, isoDate } from './period.mjs';

const API = 'https://ssl.bing.com/webmaster/api.svc/json';

/** Bing's site key: the verified URL, scheme + host + trailing slash. */
export function bingSiteUrl(websiteUrl) {
  if (!websiteUrl) return null;
  try {
    const u = new URL(/^https?:\/\//.test(websiteUrl) ? websiteUrl : `https://${websiteUrl}`);
    return `${u.protocol}//${u.host}/`;
  } catch {
    return null;
  }
}

async function call(apiKey, method, siteUrl, transport) {
  const qs = new URLSearchParams({ apikey: apiKey, siteUrl });
  // `transport` routes the request elsewhere (a server-side relay); without it
  // the request goes straight to Bing.
  const res = transport ? await transport(`${API}/${method}?${qs}`) : await request(`${API}/${method}?${qs}`);
  const text = await res.text();
  // Bing answers every failure as HTTP 400 with {ErrorCode, Message}. Translate
  // the ones a person can act on: 3 InvalidApiKey → 401, 14 NotAuthorized (the
  // site is not verified in this key's account) → 403, and 17 ThrottleIP → 429
  // marked `throttled`: Bing refuses shared cloud egress (every request from a
  // Cloudflare Worker, measured 2026-10-19), so the read has to run from the
  // customer's own machine. The key is never part of the message.
  if (!res.ok) {
    let code = null;
    try { code = JSON.parse(text).ErrorCode ?? null; } catch {}
    const status = code === 3 ? 401 : code === 14 ? 403 : code === 17 ? 429 : res.status;
    const what = code === 3 ? 'the API key is invalid'
      : code === 14 ? `${siteUrl} is not verified in this Bing account`
      : code === 17 ? 'Bing refuses requests from this network (ThrottleIP)'
      : text.slice(0, 200);
    throw Object.assign(new Error(`Bing ${method}: ${status} ${what}`), { status, throttled: code === 17 });
  }
  return JSON.parse(text).d ?? [];
}

// Bing dates arrive as "/Date(1786320000000)/".
const day = (value) => isoDate(new Date(Number(String(value).match(/-?\d+/)?.[0] ?? NaN)));
const inWindow = (d, start, end) => d >= start && d < end;

function sumRows(rows) {
  return rows.reduce((a, r) => ({ clicks: a.clicks + (r.Clicks || 0), impressions: a.impressions + (r.Impressions || 0) }), { clicks: 0, impressions: 0 });
}

/** Query or page rows summed over the window. Bing's AvgImpressionPosition is
 *  per bucket; weighting by impressions keeps a one-impression row from
 *  steering the average. */
function aggregate(rows, start, end, keyName, limit) {
  const agg = new Map();
  for (const r of rows) {
    const d = day(r.Date);
    if (!inWindow(d, start, end)) continue;
    const a = agg.get(r.Query) ?? { [keyName]: r.Query, clicks: 0, impressions: 0, posWeight: 0, posImpressions: 0 };
    a.clicks += r.Clicks || 0;
    a.impressions += r.Impressions || 0;
    if (r.AvgImpressionPosition > 0) {
      a.posWeight += r.AvgImpressionPosition * (r.Impressions || 0);
      a.posImpressions += r.Impressions || 0;
    }
    agg.set(r.Query, a);
  }
  return [...agg.values()]
    .sort((x, y) => y.clicks - x.clicks || y.impressions - x.impressions)
    .slice(0, limit)
    .map(({ posWeight, posImpressions, ...row }) => ({
      ...row,
      ctr: row.impressions ? +((row.clicks / row.impressions) * 100).toFixed(2) : 0,
      position: posImpressions ? +(posWeight / posImpressions).toFixed(1) : null,
    }));
}

/**
 * Bing Webmaster Tools for one site and review window.
 *
 * `site.websiteUrl` must be a site verified in the Bing account that owns the
 * API key; one key covers every site of that account.
 */
export async function collectBing(site, apiKey, w, options = {}) {
  const siteUrl = bingSiteUrl(site.websiteUrl);
  if (!siteUrl) return { status: 'unconfigured', source: 'bing', reason: 'The App Profile has no website URL.' };
  const t = options.fetch;
  const [traffic, queries, pages, crawl] = await Promise.all([
    call(apiKey, 'GetRankAndTrafficStats', siteUrl, t),
    call(apiKey, 'GetQueryStats', siteUrl, t),
    call(apiKey, 'GetPageStats', siteUrl, t),
    call(apiKey, 'GetCrawlStats', siteUrl, t).catch(() => []),
  ]);

  const daily = traffic
    .map((r) => ({ date: day(r.Date), clicks: r.Clicks || 0, impressions: r.Impressions || 0 }))
    .filter((r) => inWindow(r.date, w.prevStart, w.curEnd))
    .sort((a, b) => a.date.localeCompare(b.date));
  const current = sumRows(daily.filter((r) => inWindow(r.date, w.curStart, w.curEnd)).map((r) => ({ Clicks: r.clicks, Impressions: r.impressions })));
  const prior = sumRows(daily.filter((r) => inWindow(r.date, w.prevStart, w.prevEnd)).map((r) => ({ Clicks: r.clicks, Impressions: r.impressions })));
  const periods = observedCoverage(daily.map((r) => r.date), w);

  const crawlRows = crawl
    .map((r) => ({ date: day(r.Date), inIndex: r.InIndex, crawled: r.CrawledPages, errors: r.CrawlErrors, code4xx: r.Code4xx, code5xx: r.Code5xx, blockedByRobots: r.BlockedByRobotsTxt }))
    .sort((a, b) => a.date.localeCompare(b.date));
  const atStart = crawlRows.filter((r) => r.date < w.curStart).at(-1) ?? crawlRows[0] ?? null;
  const latest = crawlRows.filter((r) => r.date < w.curEnd).at(-1) ?? null;

  const queryLimit = Math.max(1, Number(options.queries) || 25);
  const pageLimit = Math.max(1, Number(options.pages) || 50);
  return {
    status: periods.comparable ? 'ready' : 'partial',
    source: 'bing',
    app: site.slug,
    site: siteUrl,
    window: w,
    dataThrough: daily.at(-1)?.date ?? null,
    daily,
    coverage: {
      periods,
      note: 'Bing omits days without data, so a missing day is unknown, not zero. Query and page rows come in dated buckets of about a week; their window edge is approximate, and a row can show more clicks than impressions, so read CTR on the totals, not per row. Bing search only: Copilot citations are a separate report Bing does not expose here.',
      queriesLimit: queryLimit,
      pagesLimit: pageLimit,
    },
    totals: {
      current,
      prior,
      change: {
        clicks: periods.comparable ? pctChange(current.clicks, prior.clicks) : null,
        impressions: periods.comparable ? pctChange(current.impressions, prior.impressions) : null,
      },
      ctrNow: current.impressions ? +((current.clicks / current.impressions) * 100).toFixed(2) : 0,
    },
    topQueries: aggregate(queries, w.curStart, w.curEnd, 'query', queryLimit),
    topPages: aggregate(pages, w.curStart, w.curEnd, 'page', pageLimit),
    index: latest ? {
      date: latest.date,
      pagesInIndex: latest.inIndex,
      pagesInIndexAtStart: atStart?.inIndex ?? null,
      crawledLastDay: latest.crawled,
      crawlErrorsLastDay: latest.errors,
      blockedByRobotsLastDay: latest.blockedByRobots,
    } : null,
  };
}
