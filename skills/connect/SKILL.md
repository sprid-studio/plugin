---
name: connect
description: Walk the user through connecting one service to Sprid, click by click, without ever seeing a secret. Covers the store and analytics keys (App Store Connect, Google Play, Search Console, PostHog, Cloudflare), the five revenue rails (RevenueCat, Stripe, Polar, Lemon Squeezy, Paddle) and the publishing channels (Instagram, TikTok, YouTube, LinkedIn, Facebook, X, Pinterest). Use when `sprid status` or `next_actions` reports a `connect` item, when a channel shows expiring or revoked, when a sensor is missing, or when the user says "connect", "hook up", "add my key", "why is the Monday mail missing PostHog".
---

# /sprid:connect [service]

Read [agent runtime](../../references/agent-runtime.md) first for Codex/Claude invocation, tool discovery, and script paths.
Read [one marketing plan](../../references/guided-marketing.md). Connect only a dependency of the active app action; a missing optional service is not onboarding debt.

Sprid holds encrypted keys and OAuth tokens and does the unattended work. This skill guides setup without exposing secrets to the conversation. Local users can use `sprid connect` with a key-file path. Browser-chat users open the secure App Profile form, select the app/service and choose the key file or enter its value there. Social channels use `connect_channel` and the returned OAuth link. The agent shows the guide and verifies the saved connection; neither MCP nor this skill needs to receive secret values.

## The rule: the agent never asks for, reads, or repeats a secret value

- Never ask the user to paste a key, token, `.p8`, service-account JSON, password or `phx_`/`sk_` string into the conversation. If they paste one anyway, do not echo it, do not write it to a file, tell them to rotate it (the guide's "if it fails" section says where), and continue with the file path instead.
- Never `cat`, `Read`, `grep -v` or otherwise open a key file, `.env`, or `~/.sprid/secrets/<slug>.json`. Checking a file **exists** (`ls -la ~/Downloads/AuthKey_*.p8`) is fine. Reading it is not.
- Never run `curl` with a key in it yourself. The probes in the guides are for the user's terminal; hand them over as text.
- Identifiers are not secrets and may be discussed: Issuer IDs, Key IDs, app ids, package names, `sc-domain:` strings, PostHog project ids, RevenueCat `proj…` ids, zone ids, account slugs.
- Always pass a **file path** to `sprid connect` for credentials. Some CLI flags retain literal-value compatibility; agents must use files to keep secrets out of tool arguments and shell history.

## Make every key a Sprid-only key

Ask the user to create a NEW key or service account for Sprid rather than reusing the one their build pipeline holds (App Store Connect: a new Team Key named "Sprid"; Google Cloud: a new service account or at least a new JSON key; PostHog/RevenueCat: a new read-only key). Two reasons, say them: revoking Sprid's key later costs nothing else, and a key with the smallest role Sprid needs (the guide's "You need" line) is a smaller loss if anything ever leaks. Sprid stores every key encrypted (AES-256-GCM, key held only in Cloudflare secrets), never returns a value from any API, and deletes it the moment the user clears it in Settings or runs `sprid connect <service> --clear`.

## Before connecting

Read [service selection and access](../../references/marketing-review-checks.md#choose-services-by-the-question) when recommending a service or handling an unsupported provider. Use the customer’s existing tools and distinguish Sprid’s unattended reads from an agent-accessible tool or export. Check the current documentation catalog and available command/tool before recommending a Sprid connection; do not invent a connection verb for an unsupported service. Record the capability and missing read in the current plan/report as an integration need.

For product analytics, read [the instrumentation workflow](../../references/marketing-review-checks.md#product-instrumentation-workflow). Check whether the app sends useful events already. A missing SDK or missing onboarding steps needs an app instrumentation recommendation; saving a read key cannot repair it. Use the PostHog connection instructions only for PostHog.

Use an existing MCP connection first; browser users need no CLI. Local users can follow [the account and CLI handoff](../../references/agent-runtime.md#account-and-cli-handoff). If the ranked action is to add an app or create a publishing account, complete that prerequisite first. A missing `verb` means follow its browser link. Secure credential entry is a browser step, never an invented secrets-bearing tool call.

## Pick the guide

1. Run `sprid status --json` (or call MCP `next_actions`). Items with `kind: "connect"` name the service and carry the exact `verb` to run. Channels appear under `connections` with `ok | expiring | revoked | missing`; sensors under each profile's `sensors` as booleans, with `secretsSet` saying which keys are held.
2. If the user named a service, use that guide. Otherwise take the first `connect` item in the shared ranked list and explain what it unlocks. Publishing work can rank above adding another sensor.
3. Read the shared guide section by section: prerequisites, provider click path, then save in the secure Sprid form or run the guide's CLI command with the provided file path when authorized. Browser users select the same identifiers and key in Settings → App Profiles; a guide's `Then run` block is the local alternative. Never ask for the value in chat.
4. Rerun `sprid status --json`, then perform the guide's live "How to check it worked" read using [connected analytics checks](../../references/marketing-review-checks.md#reading-connected-analytics). A sensor boolean or `marketing-review --check` confirms configuration only; do not call a connection verified until the correct project returns data or a successful empty response. Inspect individual revenue sources and history notes even when the aggregate is available. If it failed, match the error against the guide's "If it fails" list before theorising. Quote the fix, not the whole section.
5. Not in the guide: say so, and give the guide's source URLs. Do not invent menu labels. PostHog and RevenueCat paths and reads were verified live on 2026-09-09; other guides were checked against official docs on 2026-09-08. Anything marked *(unverified)* is a report we could not confirm, say that too.

`sprid connect` with no argument prints the wizard (missing for the plan, channels, optional) from the same `next` list; offering it is the shortest path when several things are missing.

## Shared guides

Read MCP `get_documentation` with `topic` set to the service name before giving setup advice. The same guide is available as `sprid docs <service> --json` and on the public website. Omit the topic to list services; `asc`, `play` and `gsc` are accepted aliases.

The CLI fetches current instructions and labels a bundled fallback if the server is unavailable. `--offline` selects that fallback explicitly. Use the returned `revision` when comparing copies. If neither tool is available, read `guides/<service>.md` here (`app-store-connect`, `google-play`, `search-console` for those aliases). Do not claim the installed copy is current without checking.

The guide supplies prerequisites, exact permissions, commands, live verification and troubleshooting. Never reconstruct those from memory or copy them into this skill. Authors edit `guides/*.md`, run `bun run docs:build`, then `bun run docs:check` in the source repo; builds reject stale copies.

Connect multiple revenue rails when they represent separate sales. RevenueCat app-list access lets Sprid check Stripe/Paddle overlap; inspect the result before summing money.

Store and analytics keys land on the **App Profile** (`.sprid/app.json` holds the ids; the server holds the secrets, listed back only as `secretsSet`). Channels land on the **Sprid account** named by `--account`.

## Already have keys locally?

For a local fallback, the CLI and plugin scripts can read `~/.sprid/secrets/<slug>.json`. This legacy file mixes paths and secret values; the agent must not open it:

```json
{ "gscServiceAccountPath": "~/keys/gsc-sa.json",
  "cloudflareApiToken": "…",
  "asc": { "keyId": "…", "issuerId": "…", "keyPath": "~/keys/AuthKey_….p8" },
  "playServiceAccounts": { "<packageName>": "~/keys/play-sa.json" },
  "posthogApiKey": "phx_…", "revenuecatApiKey": "sk_…" }
```

`sprid connect --from-local` pushes everything that file points at in one go. Offer it before walking six guides. The agent still does not open the file.

## Finish

Report which provider reads succeeded and any partial data gaps. Then read `next_actions` (or `sprid status`) and surface the relevant next action; do not let optional sensor setup displace getting a reviewed post out.

## Investigate after connecting

A saved connection also supports follow-up reads through `list_marketing_queries` and `query_marketing_source`. Read [connected investigations](../../references/connected-queries.md) for discovery, CLI commands and coverage limits. Run a relevant read to verify access; configuration alone is not success. Do not require the user to install a separate provider MCP for supported queries.
