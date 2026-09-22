#!/usr/bin/env node
// Reddit research through the user's own Chrome. Reddit refuses unauthenticated
// and headless access (both fingerprinted), so this drives a headful Chrome
// with a persistent profile and reads the JSON endpoints the logged-in page
// itself uses. It searches, reads, and writes a file. It posts nothing.
//
// Usage: node research.mjs --config marketing/research/research.config.json
// Config: { "subs": ["..."], "queries": ["..."], "out": "marketing/research",
//           "commentsMinReplies": 15, "commentsTopThreads": 110 }
// Needs: playwright-core (`npm i -D playwright-core`) and Google Chrome.
import fs from 'node:fs';
import path from 'node:path';
import { homedir } from 'node:os';
import { createHash } from 'node:crypto';
import { loadResearchBrowser } from './lib/browser.mjs';

const argv = process.argv.slice(2);
const cfgPath = argv[argv.indexOf('--config') + 1];
if (!cfgPath || argv.indexOf('--config') === -1) {
  console.error('usage: research.mjs --config <path>');
  process.exit(2);
}
const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
const SUBS = cfg.subs || [];
const QUERIES = cfg.queries || [];
const OUT = cfg.out || 'marketing/research';
const MIN_REPLIES = cfg.commentsMinReplies ?? 15;
const TOP_THREADS = cfg.commentsTopThreads ?? 110;
if (!SUBS.length || !QUERIES.length) {
  console.error('config needs non-empty "subs" and "queries"');
  process.exit(2);
}
if (!SUBS.every(sub => typeof sub === 'string' && /^[A-Za-z0-9_]+$/.test(sub)) || !QUERIES.every(q => typeof q === 'string')) throw new Error('Subreddits must be names, and queries must be strings.');
fs.mkdirSync(OUT, { recursive: true, mode: 0o700 });

const chromium = loadResearchBrowser();
const profile = path.join(homedir(), '.sprid', 'browser', 'research', createHash('sha256').update(process.cwd()).digest('hex').slice(0, 20));
fs.mkdirSync(profile, { recursive: true, mode: 0o700 });
fs.chmodSync(profile, 0o700);
const ignore = path.join(OUT, '.gitignore');
const currentIgnore = fs.existsSync(ignore) ? fs.readFileSync(ignore, 'utf8') : '';
const ignored = ['reddit_posts.json', 'reddit_comments.json', '/chrome-profile/'];
fs.writeFileSync(ignore, currentIgnore + (currentIgnore.endsWith('\n') || !currentIgnore ? '' : '\n') + ignored.filter(line => !currentIgnore.split('\n').includes(line)).join('\n') + '\n');

const ctx = await chromium.launchPersistentContext(profile, {
  channel: 'chrome',
  headless: false,
  viewport: { width: 1280, height: 900 },
});
try {
const pg = await ctx.newPage();
await pg.goto('https://www.reddit.com/', { waitUntil: 'domcontentloaded', timeout: 90000 });
await pg.waitForTimeout(3000);

const get = async (url) => {
  try {
    return await pg.evaluate(async (u) => {
      const r = await fetch(u, { headers: { Accept: 'application/json' } });
      if (r.status !== 200) return { err: r.status };
      return await r.json();
    }, url);
  } catch (e) {
    return { err: String(e) };
  }
};

const posts = [];
for (const sub of SUBS) {
  for (const q of QUERIES) {
    const u = `/r/${sub}/search.json?q=${encodeURIComponent(q)}&restrict_sr=1&sort=top&t=year&limit=25`;
    const j = await get(u);
    const kids = j?.data?.children || [];
    for (const k of kids) {
      const d = k.data;
      if (!d) continue;
      posts.push({
        sub, q, id: d.id, title: d.title || '', body: (d.selftext || '').slice(0, 4000),
        ups: d.ups || 0, nc: d.num_comments || 0, perma: d.permalink, created: d.created_utc,
      });
    }
    process.stderr.write(`${sub}/${q}: ${kids.length} (total ${posts.length})\n`);
    await pg.waitForTimeout(1600);
  }
}

const seen = new Set();
const uniq = [];
for (const p of posts) {
  if (seen.has(p.id)) continue;
  seen.add(p.id);
  uniq.push(p);
}
fs.writeFileSync(path.join(OUT, 'reddit_posts.json'), JSON.stringify(uniq), { mode: 0o600 });
process.stderr.write(`\nUNIQUE POSTS: ${uniq.length}\n`);

// Comments only for the most-discussed threads, and only as secondary
// evidence: in advice subreddits they console the poster and describe nobody.
const top = uniq.filter((p) => p.nc >= MIN_REPLIES).sort((a, b) => b.nc - a.nc).slice(0, TOP_THREADS);
const comments = [];
for (const p of top) {
  const j = await get(`${p.perma}.json?limit=60&sort=top`);
  const listing = Array.isArray(j) ? j[1] : null;
  for (const c of listing?.data?.children || []) {
    const d = c.data;
    if (!d || !d.body) continue;
    comments.push({ sub: p.sub, pid: p.id, ups: d.ups || 0, body: d.body.slice(0, 2500) });
  }
  await pg.waitForTimeout(1400);
}
fs.writeFileSync(path.join(OUT, 'reddit_comments.json'), JSON.stringify(comments), { mode: 0o600 });
process.stderr.write(`COMMENTS: ${comments.length}\n`);
} finally { await ctx.close(); }
