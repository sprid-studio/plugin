#!/usr/bin/env node
// Sprid first. Local scripts only fill gaps; repo history stays on the machine.
import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { promisify } from 'node:util';
import { mkdirSync, writeFileSync, readdirSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveApp, parseArgs, windows } from './lib/config.mjs';
const exec = promisify(execFile);
const here = dirname(fileURLToPath(import.meta.url));

async function capture(command, args, env = process.env) {
  try {
    const { stdout } = await exec(command, args, { env, cwd: process.cwd(), maxBuffer: 16 * 1024 * 1024, timeout: 300000 });
    try { return { ok: true, data: JSON.parse(stdout) }; }
    catch { return { ok: false, error: 'Command returned invalid JSON; the source cannot be used.' }; }
  } catch (e) {
    try { return { ok: false, data: JSON.parse(e.stdout) }; } catch {}
    return { ok: false, error: e.killed ? 'Pull exceeded its timeout; coverage incomplete.' : (e.stderr?.trim() || `Could not run ${command}: ${e.code || 'unknown error'}`) };
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  let local;
  try { local = resolveApp(args.app); }
  catch (e) { if (!e.message.startsWith('No App Profile')) throw e; }
  const window = windows(args.days, args.end);
  const cli = process.env.SPRID_CLI;
  const serverArgs = ['marketing-review', '--days', String(args.days), '--end', args.end, '--json'];
  if (args.app || local?.slug) serverArgs.push('--app', args.app || local.slug);
  if (local?.workspace) serverArgs.push('--workspace', String(local.workspace));
  if (args.check) serverArgs.push('--check');
  const server = await capture(cli ? process.execPath : 'sprid', cli ? [cli, ...serverArgs] : serverArgs);
  if (server.ok && (!server.data?.profile?.slug || !server.data?.sources)) throw new Error('Sprid returned an invalid marketing-review packet');
  const remote = server.ok ? server.data.profile : null;
  if (remote && local && remote.slug !== local.slug) throw new Error('Sprid returned a different app');
  const app = remote ? { ...local, ...remote, review: local?.review || {},
    posthogEvents: Object.keys(remote.posthogEvents || {}).length ? remote.posthogEvents : local?.posthogEvents || {} } : local;
  if (!app) throw new Error('No App Profile available locally or from Sprid. Run sprid login/init, or bootstrap a local profile.');
  const packet = { app: app.slug, generatedAt: new Date().toISOString(), window, review: app.review || {}, eventMap: app.posthogEvents || {}, sprid: server, sources: {} };
  const mapping = { gsc: 'gsc', cloudflare: 'cf-analytics', appStore: 'store', googlePlay: 'store', posthog: 'posthog' };
  const scratch = mkdtempSync(join(tmpdir(), 'sprid-review-'));
  try {
    const profileFile = join(scratch, 'profile.json');
    writeFileSync(profileFile, JSON.stringify(app), { mode: 0o600 });
    await Promise.all(Object.entries(mapping).map(async ([source, script]) => {
      const fromServer = server.ok ? server.data.sources[source] : null;
      if (['ready', 'partial', 'pending'].includes(fromServer?.status) || (fromServer?.collection && fromServer.collection.state !== 'disabled')) {
        packet.sources[source] = { via: 'sprid', ...fromServer };
        return;
      }
      const flags = ['--days', String(args.days), '--end', args.end, '--app', app.slug];
      if (args.check) flags.push('--check');
      if (args.pages && source === 'gsc') flags.push('--pages', String(args.pages));
      if (script === 'store') flags.push('--only', source);
      const fallback = await capture(process.execPath, [join(here, `${script}.mjs`), ...flags], { ...process.env, SPRID_PROFILE_FILE: profileFile });
      packet.sources[source] = { via: 'local-fallback', server: fromServer || { status: 'unavailable', reason: server.error || server.data?.error }, ...fallback };
    }));
  } finally { rmSync(scratch, { recursive: true, force: true }); }
  packet.sources.revenue = server.ok ? { via: 'sprid', ...server.data.sources.revenue } : { status: 'unavailable', reason: 'Sprid revenue unavailable. Use an available RevenueCat MCP or read-only app records; do not treat absent revenue as zero.' };
  if (args.check) { console.log(JSON.stringify(packet, null, 2)); return; }
  try {
    const { stdout } = await exec('git', ['log', `--since=${window.prevStart}T00:00:00Z`, `--until=${window.curEnd}T00:00:00Z`, '--format=%H %aI %s'], { maxBuffer: 8 * 1024 * 1024 });
    packet.commits = stdout.trim().split('\n').filter(Boolean);
    packet.codeNote = 'Commit presence is not proof of deployment; verify release evidence before attributing a change.';
  } catch { packet.codeGap = 'Could not read git history in the current directory.'; }
  const reports = resolve('marketing-reports');
  packet.previousReport = existsSync(reports) ? readdirSync(reports).filter(n => /^\d{4}-\d{2}-\d{2}\.md$/.test(n)).sort().at(-1) || null : null;
  packet.dataset = server.ok ? server.data.dataset ?? null : null;
  const bytes = JSON.stringify(packet, null, 2) + '\n';
  const hash = createHash('sha256').update(bytes).digest('hex');
  const path = resolve(args.output || join('marketing-reports', 'evidence', `${app.slug}-${window.curStart}-${window.curEnd}-${hash}.json`));
  mkdirSync(dirname(path), { recursive: true });
  try { writeFileSync(path, bytes, { mode: 0o600, flag: 'wx' }); }
  catch (error) { if (error.code !== 'EEXIST' || args.output) throw error; }
  console.log(JSON.stringify({ path, app: app.slug, window, via: Object.fromEntries(Object.entries(packet.sources).map(([k,v]) => [k, v.via || v.status])), sprid: server.ok, previousReport: packet.previousReport }, null, 2));
}
main().catch(e => { console.error(e.message); process.exitCode = 1; });
