import { request } from './request.mjs';
import { pctChange } from './period.mjs';
const GQL = 'https://api.cloudflare.com/client/v4/graphql';

async function cfGraphql(token, query, variables) {
  const res = await request(GQL, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const j = await res.json();
  if (!res.ok) throw new Error(`Cloudflare HTTP ${res.status}`);
  if (j.errors?.length) throw new Error('CF GraphQL: ' + JSON.stringify(j.errors));
  if (!j.data?.viewer) throw new Error('Cloudflare returned no analytics data');
  return j.data;
}

// Resolve zone id + name for a domain via the REST API (needs Zone: Read).
async function resolveZone(token, zoneHint) {
  // zoneHint may be a zone id (32 hex) or a domain name.
  if (/^[0-9a-f]{32}$/.test(zoneHint)) {
    const r = await request(`https://api.cloudflare.com/client/v4/zones/${zoneHint}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    const j = await r.json();
    if (!j.success) throw new Error('CF zone lookup failed: ' + JSON.stringify(j.errors));
    return { id: j.result.id, name: j.result.name };
  }
  const r = await request(`https://api.cloudflare.com/client/v4/zones?name=${encodeURIComponent(zoneHint)}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  const j = await r.json();
  if (!j.success || !j.result?.length) throw new Error(`No CF zone found for "${zoneHint}"`);
  return { id: j.result[0].id, name: j.result[0].name };
}

// RUM counts beacon events. Blocklists suppress them; JS-capable crawlers can emit them.
// Treat this as an audience cross-check, never a verified human count.
// Segment by requestHost (the site's domain) — the RUM siteTag is NOT the beacon token,
// so filtering by host is both simpler and reliable.
const RUM_QUERY = `
query ($acct: String!, $host: String!, $start: Date!, $end: Date!) {
  viewer { accounts(filter: { accountTag: $acct }) {
    totals: rumPageloadEventsAdaptiveGroups(limit: 1, filter: { requestHost: $host, date_geq: $start, date_lt: $end }) {
      count sum { visits }
    }
    country: rumPageloadEventsAdaptiveGroups(limit: 8, filter: { requestHost: $host, date_geq: $start, date_lt: $end }, orderBy: [count_DESC]) {
      count dimensions { metric: countryName }
    }
    referer: rumPageloadEventsAdaptiveGroups(limit: 12, filter: { requestHost: $host, date_geq: $start, date_lt: $end }, orderBy: [count_DESC]) {
      count dimensions { metric: refererHost }
    }
    path: rumPageloadEventsAdaptiveGroups(limit: 12, filter: { requestHost: $host, date_geq: $start, date_lt: $end }, orderBy: [count_DESC]) {
      count dimensions { metric: requestPath }
    }
  } }
}`;

// Zone fallback (bot-inflated) used when the token lacks Account Analytics scope.
const ZONE_QUERY = `
query ($zone: String!, $start: Date!, $end: Date!) {
  viewer { zones(filter: { zoneTag: $zone }) {
    httpRequests1dGroups(limit: 1000, filter: { date_geq: $start, date_lt: $end }) {
      sum { requests pageViews countryMap { clientCountryName requests } }
    }
  } }
}`;

const topList = (rows, dropSelf) => (rows || [])
  .map((r) => ({ name: r.dimensions?.metric || '(none)', count: r.count }))
  .filter((r) => r.name && r.name !== '(none)' && (!dropSelf || r.name !== dropSelf))
  .slice(0, 8);

async function pullRum(token, acct, host, start, end, zoneName) {
  const data = await cfGraphql(token, RUM_QUERY, { acct, host, start, end });
  const z = data.viewer.accounts[0];
  if (!z) throw new Error('Cloudflare account is not accessible to this token');
  const t = (z.totals || [])[0] || {};
  return {
    pageloads: t.count || 0,              // real human page loads (beacon)
    visits: t.sum?.visits || 0,           // sessions
    topCountries: topList(z.country).map((x) => ({ country: x.name, pageloads: x.count })),
    topReferrers: topList(z.referer, zoneName).map((x) => ({ host: x.name, pageloads: x.count })),
    topPages: topList(z.path).map((x) => ({ path: x.name, pageloads: x.count })),
  };
}

async function pullZone(token, zoneId, start, end) {
  const data = await cfGraphql(token, ZONE_QUERY, { zone: zoneId, start, end });
  const groups = (data.viewer.zones[0] || {}).httpRequests1dGroups || [];
  const country = new Map();
  let requests = 0, pageViews = 0;
  for (const x of groups) {
    requests += x.sum?.requests || 0;
    pageViews += x.sum?.pageViews || 0;
    for (const c of x.sum?.countryMap || []) country.set(c.clientCountryName, (country.get(c.clientCountryName) || 0) + c.requests);
  }
  const topCountries = [...country.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([country, requests]) => ({ country, requests }));
  return { requests, pageViews, topCountries };
}

export async function collectCloudflare(app, token, w) {
  const zoneHint = app.cloudflareZoneId;
  const acct = app.cloudflareAccountTag;
  const host = app.websiteUrl ? new URL(app.websiteUrl).hostname : zoneHint && !/^[0-9a-f]{32}$/i.test(zoneHint) ? zoneHint : null;
  if (!acct || !host) throw new Error('Cloudflare requires cloudflareAccountTag and websiteUrl');
  const zoneName = host;

  // Prefer the RUM beacon (real humans). If it comes back empty (no beacon data, or a
  // token that can't reach the dataset), fall back to the zone dataset (bot-inflated).
  let cur, prev, rumError;
  try {
    [cur, prev] = await Promise.all([
      pullRum(token, acct, host, w.curStart, w.curEnd, zoneName),
      pullRum(token, acct, host, w.prevStart, w.prevEnd, zoneName),
    ]);
  } catch (e) { rumError = e.message; }
  if (rumError) {
    const zone = await resolveZone(token, zoneHint || host);
    const zc = await pullZone(token, zone.id, w.curStart, w.curEnd);
    const zp = await pullZone(token, zone.id, w.prevStart, w.prevEnd);
    return {
      source: 'cloudflare', app: app.slug, zone: zoneName,
      dataset: 'zone-http (INCLUDES BOTS/CRAWLERS — not real audience)',
      warning: `RUM unavailable: ${rumError}. Both periods use zone-http, which includes bots.`,
      window: w, current: zc, prior: zp,
      change: { requests: pctChange(zc.requests, zp.requests), pageViews: pctChange(zc.pageViews, zp.pageViews) },
    };
  }
  return {
    source: 'cloudflare', app: app.slug, zone: zoneName, dataset: 'web-analytics-rum', window: w,
    warning: 'Beacon traffic is sampled and affected by blockers and JS-capable crawlers. Zero beacon events do not prove zero readers.',
    current: cur, prior: prev,
    change: {
      pageloads: pctChange(cur.pageloads, prev.pageloads),
      visits: pctChange(cur.visits, prev.visits),
    },
  };
}
