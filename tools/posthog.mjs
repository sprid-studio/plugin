#!/usr/bin/env node
// Project-pinned REST query: aggregate people per surface/event, with the exact SQL.
import { resolveApp, loadSecrets, windows, parseArgs } from './lib/config.mjs';

import { collectPosthog } from './lib/posthog.mjs';
async function main() {
  const args = parseArgs(process.argv.slice(2));
  const app = resolveApp(args.app);
  const secrets = loadSecrets(app.slug);
  const missing = [];
  if (!app.posthogProjectId) missing.push('.sprid/app.json → posthogProjectId');
  if (!secrets.posthogApiKey) missing.push('Local posthogApiKey absent; use a project-pinned PostHog MCP query, or sprid marketing-review for server data when connected.');
  if (args.check || missing.length) {
    console.log(JSON.stringify({ source: 'posthog', app: app.slug, ready: !missing.length, missing }, null, 2));
    process.exitCode = missing.length ? 1 : 0;
    return;
  }
  const window = windows(args.days, args.end);
  console.log(JSON.stringify(await collectPosthog(app, secrets.posthogApiKey, window, { trustedHost: secrets.posthogHost }), null, 2));
}
main().catch(e => { console.error(e.message); process.exitCode = 1; });
