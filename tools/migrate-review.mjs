#!/usr/bin/env node
// Explicit, local-only import. No implicit dependency on another agent's home.
import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';

export function migrateReview(legacy, slug, current = {}) {
  if (!/^[a-z0-9-]+$/.test(slug)) throw new Error('Pass a valid --app slug');
  const app = legacy.apps?.[slug];
  if (!app) throw new Error(`App ${slug} not found in the source mapping`);
  if (current.slug && current.slug !== slug) throw new Error(`This repo belongs to ${current.slug}, not ${slug}`);
  const imported = {
    slug, name: app.name, appStoreId: app.appStore?.appId,
    playPackageName: app.googlePlay?.packageName, playExportBucket: app.googlePlay?.exportBucket,
    gscProperty: app.gsc?.property, posthogProjectId: app.posthog?.projectId == null ? undefined : String(app.posthog.projectId),
    posthogHost: app.posthog?.url ? new URL(app.posthog.url).origin : undefined,
    revenuecatProjectId: app.revenuecat?.projectId,
    cloudflareZoneId: app.cloudflare?.zone, cloudflareAccountTag: app.cloudflare?.accountTag,
  };
  const result = { ...Object.fromEntries(Object.entries(imported).filter(([, v]) => v != null)), ...current };
  result.posthogEvents = { ...app.posthog?.events, ...current.posthogEvents };
  result.review = { enabled: app.enabled !== false, disabledReason: app.disabledReason,
    identityBasis: app.posthog?.identityBasis,
    inheritedNotes: Object.fromEntries(Object.entries(app).filter(([, v]) => v?.note).map(([k, v]) => [k, v.note])),
    ...current.review,
  };
  return result;
}

function main() {
  const argv = process.argv.slice(2);
  const value = f => argv[argv.indexOf(f) + 1];
  if (!argv.includes('--from') || !argv.includes('--app')) throw new Error('Usage: migrate-review.mjs --from <mapping.json> --app <slug> [--write]');
  const path = resolve('.sprid/app.json');
  const current = existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : {};
  const profile = migrateReview(JSON.parse(readFileSync(value('--from'), 'utf8')), value('--app'), current);
  if (argv.includes('--write')) {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, JSON.stringify(profile, null, 2) + '\n');
  }
  console.log(JSON.stringify({ written: argv.includes('--write'), path, profile }, null, 2));
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try { main(); } catch (e) { console.error(e.message); process.exitCode = 1; }
}
