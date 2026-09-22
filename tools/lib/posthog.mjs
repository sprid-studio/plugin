import { request } from './request.mjs';
export function posthogHost(requested, trustedHost) {
  const url = new URL(requested || trustedHost || 'https://eu.posthog.com');
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/') throw new Error('PostHog needs an HTTPS origin without credentials or a path.');
  const allowed = trustedHost ? [new URL(trustedHost).origin] : ['https://eu.posthog.com', 'https://us.posthog.com', 'https://app.posthog.com'];
  if (!allowed.includes(url.origin)) throw new Error('PostHog host is not approved for this local key. Save the intended posthogHost beside posthogApiKey in your local secrets file. No key was sent.');
  return url.origin;
}
export async function queryPosthog(app, apiKey, query, { trustedHost } = {}) {
  const host = posthogHost(app.posthogHost, trustedHost);
  const base = `${host.replace(/\/$/, '')}/api/projects/${encodeURIComponent(app.posthogProjectId)}`;
  const headers = { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' };
  const projectResponse = await request(`${base}/`, { headers });
  if (!projectResponse.ok) throw new Error(`PostHog project access: HTTP ${projectResponse.status}`);
  const project = await projectResponse.json();
  if (String(project.id) !== String(app.posthogProjectId)) throw new Error('PostHog returned a different project');
  const response = await request(`${base}/query/`, { method: 'POST', headers, body: JSON.stringify({ query: { kind: 'HogQLQuery', query } }) });
  if (!response.ok) throw new Error(`PostHog query: HTTP ${response.status}`);
  const data = await response.json();
  if (!Array.isArray(data.results)) throw new Error('PostHog returned no completed query results');
  return { projectId: project.id, query, columns: data.columns, rows: data.results,
    possiblyTruncated: data.hasMore === true || data.results.length >= 1000 };
}

export async function collectPosthog(app, apiKey, window, options = {}) {
  // Both windows in one request; the URL pins identity for every query.
  const query = `SELECT if(timestamp >= '${window.curStart}', 'current', 'prior') AS period,
    multiIf(properties.$lib = 'web', 'marketing_site',
      properties.$lib = 'posthog-react-native' AND notEmpty(toString(properties.$app_version)), 'native',
      properties.$lib = 'posthog-react-native', 'web_spa', 'other') AS surface,
    event, count() AS events, count(DISTINCT person_id) AS people
    FROM events WHERE timestamp >= '${window.prevStart}' AND timestamp < '${window.curEnd}'
    GROUP BY period, surface, event ORDER BY events DESC LIMIT 1000`;
  const result = await queryPosthog(app, apiKey, query, options);
  return { source: 'posthog', app: app.slug, window, ...result,
    eventMap: app.posthogEvents || {},
    coverage: { possiblyTruncated: result.possiblyTruncated, internalTrafficExcluded: false,
      note: 'Event audience counts are not an ordered cohort funnel. Validate surface instrumentation and exclude internal identities with a follow-up query; other includes server/unknown SDKs. No bot filter applied.' },
  };
}
