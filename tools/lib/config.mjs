// Shared config + auth helpers for the plugin's pull scripts (GSC, Cloudflare,
// the stores). No npm deps: JWTs are signed with node:crypto so this runs under
// `node` or `bun`.
//
// Where things come from:
//   ids      .sprid/app.json in the repo — the App Profile, written by
//            /sprid:bootstrap from `get_app_profile` (or by hand). Fields are
//            the profile's own: appStoreId, playPackageName, playExportBucket,
//            gscProperty, cloudflareZoneId, cloudflareAccountTag, ...
//   secrets  ~/.sprid/secrets/<slug>.json — never in a repo, never uploaded.
//            Same shape the marketing-review skill documents:
//            { gscServiceAccountPath, cloudflareApiToken,
//              asc: { keyId, issuerId, keyPath },
//              playServiceAccounts: { "<packageName>": "<sa json path>" } }
//            SPRID_SECRETS_FILE overrides the path.
import { readFileSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
import crypto from 'node:crypto';

const USER_DIR = homedir();
export const SECRETS_DIR = join(USER_DIR, '.sprid', 'secrets');
export const expandHome = (p) => typeof p === 'string' && p.startsWith('~/') ? join(USER_DIR, p.slice(2)) : p;

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

// The App Profile for this repo. `--app <slug>` is accepted for scripts run
// outside a repo; it then reads ~/.sprid/profiles/<slug>.json.
export function resolveApp(appId) {
  const local = process.env.SPRID_PROFILE_FILE || resolve(process.cwd(), '.sprid', 'app.json');
  let profile = null;
  if (existsSync(local)) profile = readJson(local);
  if (appId && (!profile || profile.slug !== appId)) {
    if (!/^[a-z0-9-]+$/.test(appId)) throw new Error('Invalid --app slug');
    const byId = join(USER_DIR, '.sprid', 'profiles', `${appId}.json`);
    profile = existsSync(byId) ? readJson(byId) : null;
  }
  if (!profile) {
    throw new Error(
      `No App Profile found. Run /sprid:bootstrap in the repo (writes .sprid/app.json), or pass --app <slug> with ~/.sprid/profiles/<slug>.json present.`,
    );
  }
  if (!/^[a-z0-9-]+$/.test(profile.slug || '') || (appId && profile.slug !== appId)) throw new Error('App Profile slug is invalid or does not match the requested app');
  if (profile.enabled === false || profile.review?.enabled === false) {
    throw new Error(`Review paused for ${profile.slug}: ${profile.review?.disabledReason || profile.disabledReason || 'disabled in App Profile'}`);
  }
  // Present the profile in the shape the pull scripts read.
  return {
    ...profile,
    id: profile.slug,
    gsc: { property: profile.gscProperty },
    cloudflare: { zone: profile.cloudflareZoneId, accountTag: profile.cloudflareAccountTag },
    appStore: { appId: profile.appStoreId },
    googlePlay: { packageName: profile.playPackageName, exportBucket: profile.playExportBucket },
  };
}

export function loadSecrets(appId) {
  const override = process.env.SPRID_SECRETS_FILE;
  if (override) return normalizeSecrets(readJson(expandHome(override)));
  const local = process.env.SPRID_PROFILE_FILE || resolve(process.cwd(), '.sprid', 'app.json');
  const slug = appId || (existsSync(local) ? readJson(local).slug : null);
  if (slug && !/^[a-z0-9-]+$/.test(slug)) throw new Error('Invalid app slug');
  const path = slug ? join(SECRETS_DIR, `${slug}.json`) : null;
  if (path && existsSync(path)) return normalizeSecrets(readJson(path));
  return {};
}

function normalizeSecrets(s) {
  return { ...s, gscServiceAccountPath: expandHome(s.gscServiceAccountPath),
    asc: s.asc ? { ...s.asc, keyPath: expandHome(s.asc.keyPath) } : undefined,
    playServiceAccounts: Object.fromEntries(Object.entries(s.playServiceAccounts || {}).map(([k, v]) => [k, expandHome(v)])),
  };
}

export { windows, isoDate, inclusiveEnd, pctChange } from './period.mjs';
import { windows, isoDate, dateValue } from './period.mjs';

// ---- base64url ----------------------------------------------------------
function b64url(buf) {
  return Buffer.from(buf).toString('base64')
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

// ---- Google service-account access token (RS256 JWT -> OAuth2) ----------
export async function googleAccessToken(saJsonPath, scope) {
  const sa = JSON.parse(readFileSync(saJsonPath, 'utf8'));
  if (sa.token_uri && sa.token_uri !== 'https://oauth2.googleapis.com/token') throw new Error('Google service account has an unexpected token endpoint');
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claim = {
    iss: sa.client_email,
    scope,
    aud: sa.token_uri || 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };
  const signingInput = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(claim))}`;
  const signature = crypto.createSign('RSA-SHA256').update(signingInput).sign(sa.private_key);
  const jwt = `${signingInput}.${b64url(signature)}`;
  const res = await fetch(sa.token_uri || 'https://oauth2.googleapis.com/token', {
    method: 'POST',
    redirect: 'error',
    signal: AbortSignal.timeout(20000),
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
  });
  if (!res.ok) throw new Error(`Google token exchange failed: HTTP ${res.status}`);
  return (await res.json()).access_token;
}

// ---- App Store Connect token (ES256 JWT) --------------------------------
export function ascToken({ keyId, issuerId, keyPath }) {
  const privateKey = readFileSync(keyPath, 'utf8');
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'ES256', kid: keyId, typ: 'JWT' };
  const payload = { iss: issuerId, iat: now, exp: now + 1200, aud: 'appstoreconnect-v1' };
  const signingInput = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(payload))}`;
  const sig = crypto.createSign('SHA256')
    .update(signingInput)
    .sign({ key: privateKey, dsaEncoding: 'ieee-p1363' });
  return `${signingInput}.${b64url(sig)}`;
}

// ---- misc ---------------------------------------------------------------
export function parseArgs(argv) {
  const a = { days: 30, check: false, app: null, json: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--app') a.app = argv[++i];
    else if (argv[i] === '--days') a.days = Number(argv[++i]);
    else if (argv[i] === '--end') a.end = argv[++i];
    else if (argv[i] === '--since') a.since = argv[++i];
    else if (argv[i] === '--only') a.only = argv[++i];
    else if (argv[i] === '--output') a.output = argv[++i];
    else if (argv[i] === '--request-reports') a.requestReports = true;
    else if (argv[i] === '--pages') a.pages = parseInt(argv[++i], 10);
    else if (argv[i] === '--check') a.check = true;
    else if (argv[i] === '--json') a.json = true;
    else if (!a.app && !argv[i].startsWith('--')) a.app = argv[i];
    else throw new Error(`Unknown argument: ${argv[i]}`);
  }
  a.end ||= isoDate(new Date());
  if (a.since) {
    if (argv.includes('--days')) throw new Error('Use --since or --days, not both');
    a.days = (+dateValue(a.end) - +dateValue(a.since)) / 86400000;
  }
  windows(a.days, a.end);
  return a;
}
