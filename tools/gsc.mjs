#!/usr/bin/env node
// Google Search Console — top queries + top pages + movers for the window vs prior,
// via the Search Analytics API. Auth = service account (webmasters.readonly) whose
// email has been added as a user on the property.
//
// Usage: node gsc.mjs --app <slug> [--days 30] [--check]
import { resolveApp, loadSecrets, windows, pctChange, parseArgs, googleAccessToken, inclusiveEnd } from './lib/config.mjs';

import { collectSearch } from './lib/search.mjs';
const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';
async function main() {
  const args = parseArgs(process.argv.slice(2));
  // --app is optional inside a repo that has .sprid/app.json.
  const app = resolveApp(args.app);
  const secrets = loadSecrets(args.app);
  const saPath = secrets.gscServiceAccountPath;
  const site = app.gsc?.property;

  if (args.check || !saPath || !site || String(site).startsWith('TODO')) {
    const missing = [];
    if (!saPath) missing.push('~/.sprid/secrets/<slug>.json → gscServiceAccountPath (service-account JSON path)');
    if (!site || String(site).startsWith('TODO')) missing.push(`.sprid/app.json → gscProperty (or upsert_app_profile {gscProperty})`);
    console.log(JSON.stringify({ source: 'gsc', app: app.slug, ready: missing.length === 0, missing }, null, 2));
    process.exit(missing.length ? 1 : 0);
  }

  const w = windows(args.days, args.end);
  const token = await googleAccessToken(saPath, SCOPE);

  console.log(JSON.stringify(await collectSearch(app, token, w, args), null, 2));
}
main().catch(e => { console.error(e.message); process.exitCode = 1; });
