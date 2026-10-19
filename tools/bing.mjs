#!/usr/bin/env node
// Bing Webmaster Tools: clicks, impressions, queries, pages and index size for
// the window vs prior. Runs on the customer's machine because Bing throttles
// shared cloud egress, including Sprid's servers (ErrorCode 17, ThrottleIP).
// Key: a file named by bingWebmasterApiKeyPath in ~/.sprid/secrets/<slug>.json,
// or BING_WEBMASTER_API_KEY. The site is the App Profile's websiteUrl.
//
// Usage: node bing.mjs --app <slug> [--days 30] [--end YYYY-MM-DD] [--check]
import { readFileSync } from 'node:fs';
import { resolveApp, loadSecrets, windows, parseArgs } from './lib/config.mjs';
import { collectBing, bingSiteUrl } from './lib/bing.mjs';

function apiKey(secrets) {
  if (process.env.BING_WEBMASTER_API_KEY) return process.env.BING_WEBMASTER_API_KEY.trim();
  if (secrets.bingWebmasterApiKeyPath) return readFileSync(secrets.bingWebmasterApiKeyPath, 'utf8').trim();
  return null;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const app = resolveApp(args.app);
  const secrets = loadSecrets(args.app);
  const key = apiKey(secrets);
  const site = bingSiteUrl(app.websiteUrl);
  if (args.check || !key || !site) {
    const missing = [];
    if (!key) missing.push('~/.sprid/secrets/<slug>.json → bingWebmasterApiKeyPath (a file holding the Bing Webmaster Tools API key), or BING_WEBMASTER_API_KEY');
    if (!site) missing.push('App Profile → websiteUrl');
    console.log(JSON.stringify({ source: 'bing', app: app.slug, ready: missing.length === 0, missing }, null, 2));
    process.exit(missing.length ? 1 : 0);
  }
  console.log(JSON.stringify(await collectBing(app, key, windows(args.days, args.end)), null, 2));
}
main().catch(e => { console.error(e.message); process.exitCode = 1; });
