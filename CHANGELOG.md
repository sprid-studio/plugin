# Changelog

the Sprid plugin follows semver: a breaking change to a command's arguments,
its output shape or its exit codes is a major release.

## 1.1.4 - 2026-10-06

- `/sprid:post`: if you change a TikTok post after you approved it, your agent now tells
  you, shows you what changed and asks before booking it again, so the post goes out at
  its slot. Switching another platform to video no longer counts as a change to the TikTok
  post. A video booked more than two hours ahead is rendered two hours before it goes out,
  so edits until then cost nothing.

## 1.1.3 - 2026-10-06

- `/sprid:connect` no longer offers saving an Anthropic or fal key to Sprid. Work Sprid
  does for you is part of your plan; to use your own AI, connect your agent over MCP.

## 1.1.2 - 2026-10-05

- `/sprid:connect` for PostHog covers countries, sources and entry pages that read Unknown:
  the property each one reads, the three setups that lose the country (cookieless mode,
  your own relay, discarded IPs) with the fix for each, and what a relay has to send.

## 1.1.1 - 2026-10-04

- `/sprid:ads`: spending starts only when you press Launch or Confirm in the Sprid app.
  `launch_ads`, `start_promotion` and the two budget tools return what the change would
  commit and the link to that button; the skill shows you the amount and sends you the link.

## 1.1.0 - 2026-10-03

- `/sprid:landing-page`: works out what a homepage or landing page has to say by
  investigating the page, who arrives, how users describe the problem and what
  competitors promise, writes a short brief of testable decisions, drafts the
  headings first, and records a baseline and read date to check the result.
- `/sprid:seo-pages`: decides whether search can bring this app users, plans a small
  first batch of pages against the current results, writes them from sourced facts,
  runs technical checks that silently stop pages ranking, and grows only what earns
  clicks. Includes a way to measure mentions in AI answers.
- A shared writing gate (`references/writing-gate.md`) for any copy a stranger reads:
  mechanical checks for machine-written tells, the swap and "Now you can" tests, and
  proof rules. The store listing skill and the marketing review now point to it and
  to the new skills.
- `references/copy-framing.md`: how to find the angle for a headline from the
  readers' own words, the alternatives they compare against and what holds them
  back, with several frames drafted before one is chosen and a cheap way to test
  them as posts first.

## 1.0.17 - 2026-10-03

- Listing assets for Anthropic's plugin directory: a square icon at
  `.claude-plugin/icon.png` and the privacy policy URL in the Claude manifest.
- Installs as a Gemini CLI extension: `gemini-extension.json` at the root connects
  the Sprid MCP server (OAuth on first use) and the skills load from `skills/`.
- Marketing reviews read PostHog's measurement checks first: each one names a number
  that cannot be taken at face value (a paywall that never sells, every payer in one
  country, review devices, a signup surface the event misses). PostHog and RevenueCat
  setup guides say how to fix each.

## 1.0.16 - 2026-10-02

- TikTok: before a direct post, the guidance has you choose how it is delivered and
  every posting setting, using the choices TikTok currently offers your account, and
  confirm before anything goes out.

## 1.0.15 - 2026-10-02

- Google Play setup guidance retries saved credentials after temporary provider
  failures and checks review access separately from download reports and replies.

## 1.0.14 - 2026-09-30

- Share technical presentation checks between the post and reels skills:
  collapsed captions, title truncation, crops, interface overlays, subtitles,
  links and destination fields. Include practical examples without prescribing
  themes or creative formats, and distinguish estimates from native previews.

## 1.0.13 - 2026-09-30

- Require CLI 1.0.0 for UUID record identifiers. Local post examples use post references and UUID media IDs.

## 1.0.12 - 2026-09-30

- Post creation accepts ordered assets, with retry protection and finished-artwork
  safeguards. Slide editing and appending accept one or many entries. The guides
  use these shared operations for images, ideas and videos.
- Ad creation accepts one or many creatives; pausing explicitly selects an ad or
  ad set. Existing tool names remain compatible on plugin connections.

## 1.0.11 - 2026-09-28

- Carousel, video or both: a post's slides can also go out as a video, and each
  destination gets the one you choose (for example a photo carousel on TikTok
  and a reel on Instagram). The post skill explains the video tools, how a
  render is quoted and confirmed before it is booked, and how a booking waits
  for its render.
- TikTok: agents send posts to the creator's TikTok drafts on their own. A
  direct post goes out only after the person confirms it on Sprid's posting
  screen; the agent hands over that link instead of choosing privacy or
  disclosure itself.

## 1.0.10 - 2026-09-28

- Previews show in the chat. `preview_post` and `render_post_preview` return a
  small image of every slide, which the agent checks before calling a post done
  and shows you. The post skill and chat guide tell the agent never to redraw a
  preview in its own widget, where Sprid's media host is blocked and every
  image shows broken.
- Every post the agent mentions is a link to its page in Sprid: the review
  screen when you are approving or scheduling, the editor when something needs
  changing.

## 1.0.9 - 2026-09-28

- The RevenueCat connect guide explains how to see who buys: send RevenueCat's
  purchase events to the analytics or attribution tool you already use, under
  the same user id. The key's permissions are unchanged.
- The Meta Ads guide says Instagram posts can only be promoted once the
  Instagram account is linked to the Facebook Page the ad account runs as, and
  how to link it. The Instagram and ads guides point to it.

## 1.0.8 - 2026-09-27

- Every marketing review now ends by saving its verdict and ranked agenda to
  Sprid (`save_marketing_review`, or `sprid marketing-review save`), and starts
  by reading the last saved one. The full report still stays in the repo; the
  app's Reviews page shows what each review concluded.
- Posts handed over for review come with a one-click link: the Sprid review
  screen or editor for posts in Sprid, and a browser preview for media rendered
  locally, instead of a bare post id or file path.
- When a post or reel needs the user's eyes, the post and reels skills now
  open a local render in the browser (`sprid media preview --open`) and link
  anything already in Sprid straight to its review screen or editor, instead
  of naming a post ID.

## 1.0.7 - 2026-09-27

- The plugin installs in Cursor. A `.cursor-plugin/` manifest and marketplace
  file let Cursor's Customize → From GitHub Repository import the whole plugin,
  skills and Sprid connection together, with no terminal. The README gains a
  Cursor section; `npx skills add ... --agent cursor` stays as the terminal
  route.

## 1.0.6 - 2026-09-27

- The PostHog connect guide gains "Keep your own testing out": flag your own
  accounts `is_internal`, list your own devices under `exclude`, and what Sprid
  already drops (Play pre-launch devices, emulators, bots). Registrations are
  now called Signups and are an app's user count on Home and in Insights; a
  period that starts before the tracking date counts from that date.

## 1.0.5 - 2026-09-27

- `store.mjs` no longer double-counts App Store Connect reports. Apple's daily
  report instances overlap (each re-delivers the previous day or two), and the
  review summed every instance: first-time downloads and their source and
  territory splits came out about 2x, impressions and page views about 3x. Each
  date is now read from its latest processing instance only.
- Pinterest is a full channel across the skills and references: connected
  queries list `pinterest` `posts` (no `comments`, since Sprid collects no Pin
  comments), Pins are read at equal ages with saves and outbound clicks kept
  apart, and a reel can go out as a video Pin. `sprid post` lanes target
  Pinterest with a `pinterest` block (needs CLI 0.1.13).

## 1.0.4 - 2026-09-26

- Credits are quoted to the person as Sprid credits, one to a cent: a render
  minute is 3 credits, and a `creditCeilingCents` of 400 is 400 credits. The
  guides no longer quote the wallet in dollars.

## 1.0.3 - 2026-09-26

- The PostHog connect guide documents `registration.accounts: false`, for an
  app with no accounts (local-first, or identified by device). Registrations
  then read as not applicable and the weekly email stops listing them as unread.

## 1.0.2 - 2026-09-25

- `sprid connect github` needs CLI 0.1.10; 0.1.9 refused `--repo`.

## 1.0.1 - 2026-09-25

- Installed copies now update. The Claude Code manifest carries no version, so
  each release is picked up by `claude plugin update`; the Codex manifest
  moves with every release.
- Every skill starts with one version check per session, covering the CLI and
  the skills themselves (`sprid doctor --apply-updates --plugin <root>`, CLI
  0.1.9), and says how to update when either is behind.
- Bootstrap asks once whether Sprid may keep the CLI and skills up to date
  (`sprid update --auto on|off`); the answer is remembered per installation.
- Distribution and traffic guides revised.
- A GitHub connect guide: repository traffic kept past GitHub's 14-day window
  (CLI 0.1.9).

## 1.0.0 - unreleased

- First public release: the skills, the connect guides and the local tools,
  with the Sprid MCP server on its `core` verbs.
