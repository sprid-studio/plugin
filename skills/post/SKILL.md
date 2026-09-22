---
name: post
description: Draft, review, schedule and publish a Pin, carousel or reel through Sprid's MCP. Use when the user wants to post, schedule, make a Pin, carousel or reel, fill the queue, or asks what is scheduled. Requires the sprid MCP server (a Sprid token).
---

# /sprid:post

Read [agent runtime](../../references/agent-runtime.md) first for Codex/Claude invocation, tool discovery, and script paths.
Read [one marketing plan](../../references/guided-marketing.md). Reuse the plan's accepted audience, guidance bundle and prepared artifact instead of asking for a new brief.

Sprid MCP supplies connected operations; this skill supplies editorial method. Read [Use Sprid in chat](guides/chat.md) for the complete browser-only path, attachment imports and hosted creation. Read [Build locally](guides/local.md) when a repository or renderer is available. If tools are missing, connect remote MCP through the host; CLI installation is optional. The agent drafts and prepares. **Nothing is published unless the person asks for it**, and a TikTok post is completed on the posting screen, where its privacy, interaction and disclosure choices are made. Never claim a post is live because a tool returned; say what state it is in.

For Pinterest, read [Pinterest content and publishing](guides/pinterest.md) before drafting, reviewing or scheduling. Pinterest is search- and destination-led: a useful standalone checklist can be complete on the Pin, and the Instagram/TikTok open-loop and carousel-completion rules do not apply. Keep the account’s voice, factual gates and asset-rights rules. The user must select every Pin in an approved batch; those selected Pins may then publish automatically on their schedule without another approval at posting time.

If `.sprid/setup.json` holds the first draft, read
[resuming setup](../../references/setup-continuation.md) before creating a post.
Recover its saved post ID and edit that post. Render and inspect it before seeking
approval; `draft-prepared` only means the copy arrived, not that visual review passed.

## Connect once

The server speaks OAuth 2.1. Follow [agent runtime](../../references/agent-runtime.md) for the current client’s connection flow. In Claude Code, or to inspect the connection in Codex:

```
/mcp                          # pick sprid; a browser opens on app.sprid.studio
```

They sign in (magic link), pick the workspace the client may see, press Allow, and `list_accounts` answers. Nothing is pasted into the terminal. Find the connection for the current client under Settings → Tokens; removing it there disconnects.

A token (`SPRID_PAT`, minted at `https://app.sprid.studio/settings/tokens`, starts with `sprd_`) is only for CI or a client that cannot open a browser. Never ask the user to paste one into the conversation. The `sprid` CLI (`npm i -g sprid`) pairs a machine the same browser-first way (`sprid login`), and `sprid mcp` is a stdio adapter for clients that cannot reach the HTTP endpoint.

The authenticated `?surface=core` catalog includes the everyday workflow. `get_capabilities` reports availability and browser fallbacks; specialized primitives are listed with `?surface=all`.

## The verbs, in the order a post moves

1. `list_accounts` → if empty, follow the shared setup browser link (local alternative: `sprid open accounts`), then connect the chosen channel. Once available, pick the account; read its `instructions` (the voice rules) before writing a word.
2. `search_lines` for hooks already in the bank; `list_inspirations` for what the user saved. Never reuse a bank line verbatim across posts.
3. `create_post` with a `formatId` (scaffolds the slides), or `draft_post_from_hook`.
4. `batch_update_slides` with the copy. Use the selected account’s format and voice; `/sprid:bootstrap` §4 provides a starting structure when neither exists.
5. `search_images` by tag and mood; `generate_image` only when generation is authorized and `spend_status` shows headroom. Choose style, subjects and demographics from the brief and account guidance. Do not inject another brand’s camera style or restrictions.
6. `review_post`. Fix every applicable error, then re-review. Apply the configured account and format gates. For Pinterest, do not rewrite a useful standalone Pin to satisfy an Instagram/TikTok open-loop, slide-count or completion gate; report that gate as inapplicable and use the Pinterest guide. Report the returned review result and keep other unresolved failures in draft; do not invent a universal score threshold.
7. `render_post_preview` and show the user the images.
8. Schedule with the narrowest bulk verb that fits:
   - Adding a destination to an existing future queue: `mirror_schedule` with its default dry run, inspect every post/time/error, then repeat with `dryRun: false`.
   - Placing several unscheduled posts on a cadence: `schedule_batch` with `dryRun: true`, inspect every placement/error, then repeat with `dryRun: false`.
   - One post: `next_schedule_slot`, then `schedule_post` — or `publish_post` for now.

Do not loop over `schedule_post` when either bulk verb fits. Both bulk paths preflight the complete queue before writing, so one invalid destination or media file stops the run with zero new bookings. A later concurrent channel change can still interrupt execution; report each returned placement rather than claiming the whole batch from the call alone.

For supplied artwork or MP4s, use `import_assets` then `create_post_from_assets`; reuse its request ID on retry. If chat cannot transfer a file, use `create_upload_session`. `preview_post` returns media and the shared approval link. Explicit hosted photos/text creation uses `create_reel` when available, after render-spend authorization. Publish-time composition remains disabled: both hosted creation and local rendering must produce one finished MP4 before scheduling. Read the chat guide for limits and job recovery.

## Apps, accounts and market editions

Use `list_apps` to resolve the app and its content accounts inside the authorized workspace. App data belongs to the parent; each account keeps its own voice and content. Select actual `channelIds` for publishing and scheduling. A platform name is accepted only when exactly one active channel matches. Never choose the first of several Instagram handles.

For one idea in several languages, use `create_content_family` with the source post, theme and source reference. `create_market_edition` creates an independent draft for each target account, locale and market; it does not translate or publish. Save translated captions, slide text and reel beats with `localize_market_edition`. Check market-specific facts against that market's sources.

`preview_market_edition` renders the complete edition. Show its preview and source reference for human review; `review_market_edition` records that approval against the returned fingerprint. An edit to the edition, its assets or its source makes the approval stale. `plan_content_family` returns exact handles, local times and blockers. After approval, pass its `planFingerprint` and the same destination rows to `schedule_content_family`. Only include approved editions; another market can remain in draft. Repeating a booking returns its existing delivery.

`compare_content_themes` compares matched post ages against each channel's baseline, with sample counts. Treat market differences as observational. CLI equivalents are `sprid apps`, `sprid family ...`; use `sprid docs cli` for payload fields.

## TikTok

Privacy level, comment/duet/stitch permissions and the commercial-content disclosure have no default and are never remembered between posts. `schedule_post` for TikTok needs them in `options.tiktok` every time, and the user has to have answered them; the agent does not pick. Say which are missing rather than guessing.

## Pinterest

For cadence advice or a request to fill the Pinterest queue, read the guide’s “Choose a cadence to test” and “Review and schedule in Sprid” sections. Keep its suggested cadences labelled as experiments; respect an existing user-chosen schedule. Check timezone, occupied days and unplaced Pins in the dry run before committing.

Use `list_connections` to select the exact Pinterest `channelId`, then `list_pinterest_boards`. If it returns no boards, say so and use `create_pinterest_board` only after the user supplies or approves the name and privacy. An image Pin is one post, preferably created at `aspectRatio: "2:3"`; a video Pin is one finished video, preferably 9:16. Save its board, optional section, title, description, destination, alt text and disclosures as `pinterestOptions` through `update_post`. Render and show the preview.

Before scheduling, show the concrete Pin or dry-run batch and have the user select every Pin. That one selection authorizes the saved schedule; the cron publishes it later without another approval. Added or edited Pins need review before they join the schedule. Read results with `get_pinterest_metrics`; keep outbound clicks separate from Pin clicks, saves and activation.

## Captions and hashtags

One field per platform. Hashtags live in the caption, on their own line at the end; there is no separate tag field and any tool call carrying one is refused by name.

## What not to do

- No posting to a channel the user did not name.
- No "posted" in the summary for anything that is `scheduled`, `pending` or `draft`.
- No re-running `publish_post` on a failure without reading the error; a retry can duplicate.
- If approved work is unscheduled, surface that when relevant; continue new drafting when that is what the user requested.

## Report

What is scheduled (date, platform, post id), what is in draft and why, and the one thing waiting on the user.
