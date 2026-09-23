# sprid

**You shipped the app. Now ship the marketing.**

Your app’s results, marketing plan and next move. Together in Sprid, ready for
the coding agent you already use.

For developers with apps in the stores. The skills run in your repo with your keys and cost nothing; Sprid, the server, holds what a local file cannot: the daily store-review digest, the Monday mail, memory of what already ran, and the queue that publishes when you are not there.

## Install

The plugin includes native manifests for Codex and Claude Code, sharing all eleven skills and the same MCP server.

### Codex

Follow the [installation guide](https://sprid.studio/docs/install) for the current
Codex plugin setup. For a skills-only installation:

```sh
npx skills add sprid-studio/plugin
```

Start a new thread in your app repo and ask: “Use Sprid’s bootstrap skill.” For an
existing app: “Use Sprid’s marketing-review skill.” Read
[agent runtime](references/agent-runtime.md) for MCP connection and script paths.

### Claude Code

```
/plugin marketplace add sprid-studio/plugin
/plugin install sprid@sprid
```

Or the skills alone, for Cursor, Codex, OpenClaw and the rest:

```
npx skills add sprid-studio/plugin
```

Then, in an app repo:

```
/sprid:bootstrap
```

The `/sprid:` names below are Claude Code commands. In Codex, select the corresponding Sprid skill or ask for it by name. [Agent runtime](references/agent-runtime.md) describes portable tool discovery and script paths.

## What the first run does

Reads the repo and the public listing. Comes back with the listing graded (5 checks, quoted), a recommended channel and the evidence for testing it, a voice guide lifted from your own copy, one drafted carousel that sounds like you, and `.sprid/app.json`, the App Profile that connects the repo to Sprid. No token, no account, nothing sent anywhere.

## Skills

| Skill | Say | What it does |
|---|---|---|
| `/sprid:bootstrap` | "where do I start" | The local diagnosis and first draft above |
| `/sprid:connect` | "connect this service" | Connect analytics, stores, revenue and publishing channels |
| `/sprid:marketing-review` | "how is it going", "did that change work" | Search Console + Cloudflare + App Store Connect + Play + PostHog + RevenueCat joined to `git log`, one dated report, ranked recommendations, honest Data gaps |
| `/sprid:screenshots` | "screenshots", "localise the listing" | A config file and a headless composer: every language × device × slot from raw captures |
| `/sprid:store-metadata` | "keywords", "the listing" | Name, subtitle, keywords, description per locale from one config, adapted to the app’s markets, pushed on your word |
| `/sprid:research` | "what do people actually say" | Reddit posts and your reviews into a hook bank, with each seam's worth written down |
| `/sprid:scout` | "who is winning in my niche", "what ads are they running" | Measures the accounts working in your niche and harvests the public ad library, over your own browser, filed locally |
| `/sprid:ads` | "run ads", "how is the campaign doing" | Campaigns, sets and creatives built from archetypes, through a copy gate, with one confirmed call that spends |
| `/sprid:principles` | "why", "should I run ads" | Decision checks for channels, acquisition economics and content, tested against your own evidence |
| `/sprid:post` | "post this", "fill the queue" | Draft, review, schedule and publish through Sprid |
| `/sprid:reels` | "reels", "why did it get no views", "video at volume" | Format selection, reproducible localization, render checks and outcome measurement |

## Marketing review

`sprid marketing-review --app <slug> --days 30 --json` reads connected analytics on
Sprid, together with stored post performance, queue state and milestones. The MCP
verb `get_marketing_review` uses the same contract. `--check` checks readiness
without calling providers; `--since` and `--end` support explicit calendar windows.

The skill adds local git/release context and writes the report. Its
`tools/review.mjs` runner calls Sprid first and uses local provider scripts only
for missing/failed sources. Existing local event maps and app-specific review
notes can be imported with `tools/migrate-review.mjs --from <mapping.json> --app
<slug>` (preview; add `--write` to save locally). Credentials are not imported.

## What it touches

Reads your repo, the public store pages, and, with your keys on your machine, your own analytics. Writes markdown under `marketing/` and `.sprid/app.json`. Never puts a secret in the conversation. Never posts, replies or follows on its own: it publishes when you ask it to, through the platforms’ official APIs. A TikTok post also needs its privacy, interaction and disclosure choices, which are made on the posting screen; a Pinterest pin needs its reviewed details.

## Connecting to Sprid

After the local diagnosis, connect your repo for scheduled publishing and weekly results:

```sh
npm install -g @sprid/cli
sprid login
sprid init
sprid connect
sprid status
```

The browser lets you sign in or create an account when signup is open, then approve the CLI. Return to the same repo in your terminal. `init` registers the App Profile; `connect` guides publishing-account setup and the services you use. Follow [the account and CLI handoff](references/agent-runtime.md#account-and-cli-handoff) for prerequisites and verification.

Your agent’s MCP connection is separate from CLI login. In Claude Code:

```
/mcp
```

Pick `sprid`. A browser opens on `app.sprid.studio`: sign in (magic link), choose the workspace the client may see, press Allow, and the terminal is connected. Nothing is pasted. Find the connection for your client under Settings → Tokens; remove it there to disconnect. For Codex, follow [agent runtime](references/agent-runtime.md).

A token is only for CI, or a client that cannot open a browser: mint one under Settings → Tokens, export it as `SPRID_PAT`, and send it as `Authorization: Bearer`. The `sprid` CLI pairs a machine the same browser-first way (`npm i -g @sprid/cli && sprid login`).

Keys for the sensors never go through the conversation: `sprid connect asc --key ~/AuthKey.p8 …`, `sprid connect play --key sa.json`, or `sprid connect --from-local` to push everything in `~/.sprid/secrets/<slug>.json`. A client that only speaks stdio can use `sprid mcp`.

The plugin's `.mcp.json` lists the everyday verbs (`?surface=core`). Templates, ads, fonts and tracks are behind `?surface=all`.

Scheduled publishing and the weekly email need a Sprid account, an active plan or trial, and the relevant connected services. Local drafts and reviews using available local data still work without an account. Current plans: [sprid.studio/pricing](https://sprid.studio/pricing).

## Scope

The skills adapt to your product, audience and existing tools. Recommendations name
their evidence and gaps. They do not guarantee reach or revenue, authorize ad spend,
or substitute another app's voice and benchmarks for yours.

© 2026 Väder AB. All rights reserved. Use is subject to Sprid's [Terms of Service](https://sprid.studio/terms).
