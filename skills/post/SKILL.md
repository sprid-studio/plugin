---
name: post
description: Draft, review, schedule and publish a Pin, carousel or reel through Sprid's MCP. Use when the user wants to post, schedule, make a Pin, carousel or reel, fill the queue, or asks what is scheduled. Requires the sprid MCP server (a Sprid token).
---

# /sprid:post

Read [agent runtime](../../references/agent-runtime.md) first for Codex/Claude invocation, tool discovery, and script paths, and run its [version check](../../references/agent-runtime.md#versions-at-the-start-of-a-job) once per session before anything else.
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

A token (`SPRID_PAT`, minted at `https://app.sprid.studio/settings/tokens`, starts with `sprd_`) is only for CI or a client that cannot open a browser. Never ask the user to paste one into the conversation. The `sprid` CLI (`npm i -g @sprid/cli`) pairs a machine the same browser-first way (`sprid login`), and `sprid mcp` is a stdio adapter for clients that cannot reach the HTTP endpoint.

The authenticated `?surface=core` list is the everyday workflow. Every other verb this skill names is still available: if it is not in your tool list, run it with `call_tool {name, arguments}`, and use `find_tools {query}` to find a tool by what you want to do. `get_capabilities` reports availability and browser fallbacks; specialized primitives are listed with `?surface=all`.

## The verbs, in the order a post moves

1. `list_accounts` → if empty, follow the shared setup browser link (local alternative: `sprid open accounts`), then connect the chosen channel. Once available, pick the account; read its `instructions` (the voice rules) before writing a word.
2. `marketing/HOOKS.md` in the repo for hooks already researched, and `list_posts {work: "idea"}` for ideas already gathered in Sprid. Never reuse a hook verbatim across posts.
3. Start from an idea when one fits: it is a post in `idea` status with gathered media, `notes` and a `sourceUrl`, so `update_post {status: "draft"}` takes it forward in place. Otherwise `create_post` (optionally with a `seedHook` or a library `imageId`), or `draft_post_from_hook`. To save something for later without writing it yet, `create_post {status: "idea", notes, sourceUrl, imageIds}` and `add_post_media` as more turns up.
4. `batch_update_slides` with the copy. Use the selected account’s templates and voice; `/sprid:bootstrap` §4 provides a starting structure when neither exists.
5. `search_images` by tag and mood; `generate_image` only when generation is authorized and `spend_status` shows headroom. Choose style, subjects and demographics from the brief and account guidance. Do not inject another brand’s camera style or restrictions.
6. `review_post`. Fix every applicable error, then re-review. Apply the configured account and format gates. For Pinterest, do not rewrite a useful standalone Pin to satisfy an Instagram/TikTok open-loop, slide-count or completion gate; report that gate as inapplicable and use the Pinterest guide. Report the returned review result and keep other unresolved failures in draft; do not invent a universal score threshold.
7. `render_post_preview` and show the user the images, with the post linked as in [Hand it over for review](#hand-it-over-for-review).
8. Schedule with the narrowest bulk verb that fits:
   - Adding a destination to an existing future queue: `mirror_schedule` with its default dry run, inspect every post/time/error, then repeat with `dryRun: false`.
   - Placing several unscheduled posts on a cadence: `schedule_batch` with `dryRun: true`, inspect every placement/error, then repeat with `dryRun: false`.
   - One post: `next_schedule_slot`, then `schedule_post` — or `publish_post` for now.

Do not loop over `schedule_post` when either bulk verb fits. Both bulk paths preflight the complete queue before writing, so one invalid destination or media file stops the run with zero new bookings. A later concurrent channel change can still interrupt execution; report each returned placement rather than claiming the whole batch from the call alone.

For supplied artwork or MP4s, use `import_assets` then `create_post_from_assets`; reuse its request ID on retry. If chat cannot transfer a file, use `create_upload_session`. `preview_post` returns media and the shared approval link. Explicit hosted photos/text creation uses `create_reel` when available, after render-spend authorization. Publish-time composition remains disabled: both hosted creation and local rendering must produce one finished MP4 before scheduling. Read the chat guide for limits and job recovery.

## Hand it over for review

Whenever the user has to look at something, give them a way to open it in one click. A bare post ID or a file path sends them hunting for it.

- **Rendered locally and not yet in Sprid** (a reel or stills from `sprid media build`, or the output of the app's own renderer): open it in their browser for them. `sprid media preview --open` puts the whole batch on one page, as a grid and a feed you arrow through; use `--serve` instead when they need to scrub a video or are on Safari. For a single file outside the registry, run `open <file>` on macOS or `xdg-open <file>` on Linux. Say in one line what just opened.
- **In Sprid** (an idea, draft, scheduled or published post): link every post you mention to its screen in Sprid, as a Markdown link on the post's title or ref. The review screen, where a person approves it and makes the platform choices, is `https://app.sprid.studio/p/<id>`. The editor is `https://app.sprid.studio/post/<id>`. Both accept the ref (`BND-78`) as well as the number. Prefer a link a tool returned (`preview_post`, `next.web.url`) over one you build. Link the review screen when the ask is to approve or schedule, and the editor when the ask is to change something.

Once local work has been pushed into Sprid, the Sprid link is the one to act on, because that is where approval happens. When the agent runs on the user's machine and exactly one post is waiting, also `open` its link; for a batch, give the list of links rather than opening a tab per post.

## Apps and accounts

Use `list_apps` to resolve the app and its content accounts inside the authorized workspace. App data belongs to the parent; each account keeps its own voice and content. One market or persona is one account: `create_content_account` makes it, and a post for another market is written as its own post on that account. Select actual `channelIds` for publishing and scheduling. A platform name is accepted only when exactly one active channel matches. Never choose the first of several Instagram handles. The CLI equivalent is `sprid apps`; use `sprid docs cli` for payload fields.

## TikTok

Privacy level, comment/duet/stitch permissions and the commercial-content disclosure have no default and are never remembered between posts. `schedule_post` for TikTok needs them in `options.tiktok` every time, and the user has to have answered them; the agent does not pick. Say which are missing rather than guessing.

## Pinterest

For cadence advice or a request to fill the Pinterest queue, read the guide’s “Choose a cadence to test” and “Review and schedule the batch” sections. Keep its suggested cadences labelled as experiments; respect an existing user-chosen schedule. Check timezone, occupied days and unplaced Pins in the dry run before committing.

Use `list_connections` to select the exact Pinterest `channelId`, then `list_pinterest_boards`. If it returns no boards, say so and use `create_pinterest_board` only after the user supplies or approves the name and privacy. An image Pin is one post, preferably created at `aspectRatio: "2:3"`; a video Pin is one finished video, preferably 9:16, and a finished reel can go out as one. A carousel deck is not a Pin. Every Pin needs a board and a destination link. Give the plain destination URL: Sprid adds per-Pin tracking parameters (`utm_source=pinterest` and the publish ID) when it publishes, which is how the site’s analytics sees the visit. A link that already carries its own `utm_source` goes out as written and loses that per-Pin attribution, so add your own only when you need your own campaign names. Save its board, optional section, title, description, destination, alt text and disclosures as `pinterestOptions` through `update_post`. Render and show the preview.

Before scheduling, show the concrete Pin or dry-run batch and have the user select every Pin. That one selection authorizes the saved schedule; the cron publishes it later without another approval. Added or edited Pins need review before they join the schedule. Read results with `get_pinterest_metrics`: dated daily impressions, saves, Pin clicks, outbound clicks and video views. Saves are interest on Pinterest; an outbound click is someone leaving it, and neither is a site session or an install. Pins keep being found for months, so compare them at equal ages (30, 60 and 90 days), never a fresh Pin against an old one and never on a first-48-hours read. There are no likes, comments or shares, and Pin comments are not collected into the Inbox.

## Captions and hashtags

One field per platform. Hashtags live in the caption, on their own line at the end; there is no separate tag field and any tool call carrying one is refused by name. A Pin has no caption: people read the title and description saved in `pinterestOptions`.

## What not to do

- No posting to a channel the user did not name.
- No "posted" in the summary for anything that is `scheduled`, `pending` or `draft`.
- No re-running `publish_post` on a failure without reading the error; a retry can duplicate.
- If approved work is unscheduled, surface that when relevant; continue new drafting when that is what the user requested.

## Report

What is scheduled (date, platform, and the post linked to its Sprid screen), what is in draft and why, and the one thing waiting on the user, with the link that does it.
