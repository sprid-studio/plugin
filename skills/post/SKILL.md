---
name: post
description: Draft, review, schedule and publish a Pin, carousel or reel through Sprid's MCP. Use when the user wants to post, schedule, make a Pin, carousel or reel, fill the queue, or asks what is scheduled. Requires the sprid MCP server (a Sprid token).
---

# /sprid:post

Read [agent runtime](../../references/agent-runtime.md) first for Codex/Claude invocation, tool discovery, and script paths, and run its [version check](../../references/agent-runtime.md#versions-at-the-start-of-a-job) once per session before anything else.
Read [one marketing plan](../../references/guided-marketing.md). Reuse the plan's accepted audience, guidance bundle and prepared artifact instead of asking for a new brief. Load [standing rules and corrections](../../references/standing-rules.md) before drafting, and write accepted corrections back.

Sprid MCP supplies connected operations; this skill supplies editorial method. Read [Use Sprid in chat](guides/chat.md) for the complete browser-only path, attachment imports and hosted creation. Read [Build locally](guides/local.md) when a repository or renderer is available. If tools are missing, connect remote MCP through the host; CLI installation is optional. The agent drafts and prepares. **Nothing is published unless the person asks for it**, and a TikTok post straight to the profile requires the person's explicit settings and approval for that post (see TikTok below). Never claim a post is live because a tool returned; say what state it is in.

For Pinterest, read [Pinterest content and publishing](guides/pinterest.md) before drafting, reviewing or scheduling.

If `.sprid/setup.json` holds the first draft, read
[resuming setup](../../references/setup-continuation.md) before creating a post.
Recover its saved post ID and edit that post. Render and inspect it before seeking
approval; `draft-prepared` only means the copy arrived, not that visual review passed.

## Connect once

Connect as [agent runtime](../../references/agent-runtime.md#mcp-discovery-and-connection) describes for the current client; in a browser chat, follow the [chat guide](guides/chat.md#connect-sprid). The connection appears under Settings → Tokens, and removing it there disconnects. A token (`SPRID_PAT`, minted at `https://app.sprid.studio/settings/tokens`, starts with `sprd_`) is only for CI or a client that cannot open a browser. Never ask the user to paste one into the conversation.

The authenticated `?surface=core` list is the everyday workflow. Every other verb this skill names is still available: if it is not in your tool list, run it with `call_tool {name, arguments}`, and use `find_tools {query}` to find a tool by what you want to do. `get_capabilities` reports availability and browser fallbacks; specialized primitives are listed with `?surface=all`.

## The verbs, in the order a post moves

1. `list_accounts` → if empty, follow the shared setup browser link (local alternative: `sprid open accounts`), then connect the chosen channel. Once available, pick the account; read its `instructions` (the voice rules) before writing a word.
2. Know what travels before writing. If this app has no niche research yet (no `marketing/HOOKS.md`, nothing filed in scout's library for its niche), run [/sprid:scout](../scout/SKILL.md) with its `product.md` first: the accounts posting for this kind of app, and the formats and hooks that get views. When scout is not installed or the person says skip, draft from the product and say plainly that the draft has not been checked against the niche. Then `marketing/HOOKS.md` in the repo for hooks already researched, and `list_posts {work: "idea"}` for ideas already gathered in Sprid. Never reuse a hook verbatim across posts. Saved [founder material](../../references/founder-material.md) is a hook source of its own: an opinion in the founder's words, a choice made against the obvious option, or a case nobody else can post.
3. Start from an idea when one fits: it is a post in `idea` status with gathered media, `notes` and a `sourceUrl`, so `update_post {status: "draft"}` takes it forward in place. Otherwise `create_post` (optionally with a `seedHook` or a library `imageId`), or `draft_post_from_hook`. To save something for later without writing it yet, `create_post {status: "idea", notes, sourceUrl, imageIds}` and `add_slides {postId, slides: [{imageId}]}` as more turns up.
4. `update_slides` with the copy. Use the selected account’s templates and voice; `/sprid:bootstrap` §4 provides a starting structure when neither exists.
5. `search_images` by tag and mood; `generate_image` only when generation is authorized and `spend_status` shows headroom. Choose style, subjects and demographics from the brief and account guidance. Do not inject another brand’s camera style or restrictions.
6. `review_post`. Fix its errors, then re-review. Voice follows the customer's own accepted voice ([writing gate](../../references/writing-gate.md)), and an em dash is always an error. Apply the account's configured gates. For Pinterest, do not rewrite a useful standalone Pin to satisfy an Instagram/TikTok open-loop, slide-count or completion gate; report that gate as inapplicable and use the Pinterest guide. Report the returned review result and keep other unresolved failures in draft; do not invent a universal score threshold.
7. `preview_post` (with `slideIds` for a subset). It returns a small inline image of every slide: look at them before you call the post done, then show the user the post as in [Hand it over for review](#hand-it-over-for-review).
8. Schedule with the narrowest bulk verb that fits:
   - Adding a destination to an existing future queue: `mirror_schedule` with its default dry run, inspect every post/time/error, then repeat with `dryRun: false`.
   - Placing several unscheduled posts on a cadence: `schedule_batch` with `dryRun: true`, inspect every placement/error, then repeat with `dryRun: false`.
   - One post: `next_schedule_slot`, then `schedule_post`, or `publish_post` for now.

Do not loop over `schedule_post` when either bulk verb fits. Both bulk paths preflight the complete queue before writing, so one invalid destination or media file stops the run with nothing new scheduled. A later concurrent channel change can still interrupt execution; report each returned placement rather than claiming the whole batch from the call alone.

For supplied artwork or MP4s, use `import_assets` then `create_post`; reuse its request ID on retry. If chat cannot transfer a file, use `create_upload_session`. `preview_post` returns media and the shared approval link. Explicit hosted photos/text creation uses `create_reel` when available, after render-spend authorization. A locally rendered video is uploaded as one finished MP4 and publishes as it is. Read the chat guide for limits and job recovery.

## Carousel, video or both

A post can go out as its slides, as its own video made from those slides, or both, per destination: a carousel on TikTok and a reel on Instagram, to compare them. `get_post` returns `outputsResolved`. Change it only when the person asks, with `update_post {outputs}`: `{video: true}` sends the video where it is the default (TikTok, YouTube) and the carousel elsewhere; `{byPlatform: {instagram: "video"}}` changes one destination. YouTube takes only video, LinkedIn only a carousel.

The video is compiled from the slides on every read, so words, images and a slide's length stay on the slides (`update_slides {slides: [{slideId, durationMs}]}`; `durationMs` pins a slide, null means automatic). Start with `get_video_capabilities`, read `get_post_video` (revision, slide times, issues), then change transitions, element motion, what shows in the carousel or the video, the cover, the music mix and video-only layers with `edit_post_video {baseRevision, requestId, operations}`.

A video destination publishes a final render of the video as it is now. `quote_post_video_render`, show the person the price and the ceiling, and only after they agree call `render_post_video {mode: "final", confirmed: true}` with the quote's revision and `outputHash`; a render of the same video is reused without charge. Schedule with its `videoRenderId`, or in one step with `render: {confirmed: true, creditCeilingCents}` on `schedule_post` or `publish_post`, and the post waits for the render. Scheduled with `render: {confirmed: true}` more than two hours ahead, it renders two hours before its slot, so edits until then cost nothing. One that already has its render stays on it after an edit: `post_queue` marks it stale, and `rebook_post_video {jobId}` moves it onto a new one. A direct TikTok post of a video also needs the person to play that render on the posting screen.

## Hand it over for review

Whenever the user has to look at something, give them a way to open it in one click. A bare post ID or a file path sends them hunting for it.

- **Rendered locally and not yet in Sprid** (a reel or stills from `sprid media build`, or the output of the app's own renderer): open it in their browser for them. `sprid media preview --open` puts the whole batch on one page, as a grid and a feed you arrow through; use `--serve` instead when they need to scrub a video or are on Safari. For a single file outside the registry, run `open <file>` on macOS or `xdg-open <file>` on Linux. Say in one line what just opened.
- **In a chat** (Claude, ChatGPT): show the preview as the [chat guide](guides/chat.md#create-and-review-the-post) describes.
- **In Sprid** (an idea, draft, scheduled or published post): link every post you mention to its screen in Sprid, as a Markdown link on the post's title or ref. The review screen, where a person approves it and makes the platform choices, is `https://app.sprid.studio/p/<id>`. The editor is `https://app.sprid.studio/post/<id>`. Both accept the ref (`APP-78`) as well as the number. Prefer a link a tool returned (`links.review` and `links.editor` on every post, `url` on each `list_posts` row) over one you build. Link the review screen when the ask is to approve or schedule, and the editor when the ask is to change something.

Once local work has been pushed into Sprid, the Sprid link is the one to act on, because that is where approval happens. When the agent runs on the user's machine and exactly one post is waiting, also `open` its link; for a batch, give the list of links rather than opening a tab per post.

## Apps and accounts

Use `list_apps` to resolve the app and its content accounts inside the authorized workspace. App data belongs to the parent; each account keeps its own voice and content. One market or persona is one account: `create_content_account` makes it, and a post for another market is written as its own post on that account. Select actual `channelIds` for publishing and scheduling. A platform name is accepted only when exactly one active channel matches. Never choose the first of several Instagram handles. The CLI equivalent is `sprid apps`; use `sprid docs cli` for payload fields.

## TikTok

Follow the chat guide's [Approve and confirm delivery](guides/chat.md#approve-and-confirm-delivery): the draft and direct-post modes, every required setting, the approval before `confirmed: true` and the `rebook` after an edit. When running on the person's machine, open a returned `approvalUrl` for them.

An edit to a scheduled direct post needs a new yes when it changes what TikTok would receive: slides, their templates, the TikTok caption, its output, motion, audio, or the account's fonts and palette. Another platform's output leaves the TikTok approval as it was, and moving the post keeps its answers only while content and settings match. Finish edits before scheduling where you can. Report a direct TikTok post as scheduled only once `post_queue` or `get_post` shows it.

## Pinterest

The [Pinterest guide](guides/pinterest.md) owns Pins: its MCP steps for boards and `pinterestOptions`, “Choose a cadence to test”, “Review and schedule the batch” and “Measure what happened”. Select the exact Pinterest `channelId` from `list_connections`, and schedule only the Pins the user selected.

## Captions and hashtags

One field per platform. Hashtags live in the caption, on their own line at the end; there is no separate tag field and any tool call carrying one is refused by name. A Pin has no caption: people read the title and description saved in `pinterestOptions`.

### Platform presentation

Before writing captions or exporting media, read [platform presentation](../../references/platform-presentation.md)
for the selected destinations. It covers collapsed text, cropping, interface
controls, links and the fields Sprid actually publishes, with examples. Keep
the user's theme, voice and chosen format; these are technical checks.

## The weekly read: winners get a part 2

Once a week, or when the person asks how posts are doing, follow [Learn from a result](guides/distribution.md#learn-from-a-result) in the distribution guide: it reads posts at the same age, names winners, drafts their part 2 and records content tests in Sprid.

## What not to do

- No posting to a channel the user did not name.
- No "posted" in the summary for anything that is `scheduled`, `pending` or `draft`.
- No re-running `publish_post` on a failure without reading the error; a retry can duplicate.
- If approved work is unscheduled, surface that when relevant; continue new drafting when that is what the user requested.

## Report

What is scheduled (date, platform, and the post linked to its Sprid screen), what is in draft and why, and the one thing waiting on the user, with the link that does it.
