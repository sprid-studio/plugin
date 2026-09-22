#!/usr/bin/env node
// Store funnel: App Store Connect (impressions -> product page views -> downloads)
// and Google Play (store listing acquisitions -> installs), for the window.
//
// ASC uses the Analytics Reports API (asynchronous: Apple generates reports ~1-2 days
// after the first request; we request once, then read whatever is ready).
// Play uses the bulk CSV export in the developer's GCS bucket (needs play.exportBucket).
//
// Usage: node store.mjs --app <slug> [--days 30] [--check]
import { gunzipSync } from 'node:zlib';
import { existsSync } from 'node:fs';
import { resolveApp, loadSecrets, windows, parseArgs, ascToken, googleAccessToken } from './lib/config.mjs';

import { collectAppStore, collectPlay } from './lib/store.mjs';
const bucketOk = b => b && !String(b).startsWith('TODO');
async function main() {
  const args = parseArgs(process.argv.slice(2));
  // --app is optional inside a repo that has .sprid/app.json.
  const app = resolveApp(args.app);
  const secrets = loadSecrets(args.app);
  const w = windows(args.days, args.end);

  if (args.only && !['appStore', 'googlePlay'].includes(args.only)) throw new Error('--only must be appStore or googlePlay');
  const ascCfg = secrets.asc || {};
  const ascReady = ascCfg.keyId && ascCfg.issuerId && ascCfg.keyPath && existsSync(ascCfg.keyPath || '') && app.appStore?.appId;
  const playReady = bucketOk(app.googlePlay?.exportBucket) && secrets.playServiceAccounts?.[app.googlePlay?.packageName];

  if (args.check) {
    const missing = [];
    if (args.only !== 'googlePlay' && !ascReady) missing.push('App Store: appStoreId and local asc {keyId,issuerId,keyPath} required');
    if (args.only !== 'appStore' && !playReady) missing.push('Google Play: playPackageName, playExportBucket and local playServiceAccounts key required');
    console.log(JSON.stringify({ source: 'store', app: app.slug, ascReady: !!ascReady, playReady: !!playReady, missing }, null, 2));
    process.exitCode = missing.length ? 1 : 0;
    return;
  }

  const result = { source: 'store', app: app.slug, window: w };
  if (args.only !== 'googlePlay') try { result.appStore = ascReady ? await collectAppStore(ascToken(ascCfg), app.appStore.appId, w, args.requestReports) : { status: 'unconfigured' }; }
  catch (e) { result.appStore = { status: 'error', error: e.message }; }
  if (args.only !== 'appStore') try { result.googlePlay = playReady ? await collectPlay(app, w, await googleAccessToken(secrets.playServiceAccounts[app.googlePlay.packageName], 'https://www.googleapis.com/auth/devstorage.read_only')) : { status: 'unconfigured', missing: ['Play package/export bucket or local service account missing'] }; }
  catch (e) { result.googlePlay = { status: 'error', error: e.message }; }

  console.log(JSON.stringify(result, null, 2));
}

main().catch((e) => { console.error(e.message); process.exit(1); });
