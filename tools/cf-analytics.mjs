#!/usr/bin/env node
// Cloudflare web traffic for a marketing site, via the GraphQL Analytics API.
// Emits Web Analytics page loads, visits and top countries, referrers and pages
// for the window and the prior equal window. Needs a CF API token with Account
// Analytics: Read. When the beacon cannot be read it falls back to the zone's
// request counts (bots included), which need Zone Analytics: Read.
//
// Usage: node cf-analytics.mjs --app <slug> [--days 30] [--check]
import { resolveApp, loadSecrets, windows, pctChange, parseArgs } from './lib/config.mjs';

import { collectCloudflare } from './lib/cloudflare.mjs';
async function main() {
  const args = parseArgs(process.argv.slice(2));
  // --app is optional inside a repo that has .sprid/app.json.
  const app = resolveApp(args.app);
  const secrets = loadSecrets(args.app);
  const token = secrets.cloudflareApiToken;
  const zoneHint = app.cloudflare?.zone;

  const acct = app.cloudflare?.accountTag;
  // A zone id is not an HTTP hostname. RUM works on a Pages host without Zone:Read.
  const host = app.websiteUrl ? new URL(app.websiteUrl).hostname
    : zoneHint && !/^[0-9a-f]{32}$/i.test(zoneHint) ? zoneHint : null;

  if (args.check || !token || !acct || !host || String(host).startsWith('TODO')) {
    const missing = [];
    if (!token) missing.push('~/.sprid/secrets/<slug>.json → cloudflareApiToken (Account Analytics: Read)');
    if (!acct) missing.push(`.sprid/app.json → cloudflareAccountTag`);
    if (!host || String(host).startsWith('TODO')) missing.push(`.sprid/app.json → websiteUrl (the hostname serving the beacon)`);
    console.log(JSON.stringify({ source: 'cloudflare', app: app.slug, ready: missing.length === 0, missing }, null, 2));
    process.exit(missing.length ? 1 : 0);
  }

  const w = windows(args.days, args.end);
  console.log(JSON.stringify(await collectCloudflare(app, token, w), null, 2));
}
main().catch(e => { console.error(e.message); process.exitCode = 1; });
