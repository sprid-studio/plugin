# Changelog

the Sprid plugin follows semver: a breaking change to a command's arguments,
its output shape or its exit codes is a major release.

## 1.5.0 - 2026-10-30

- The reels skill has a guide for building motion graphics in code with Remotion or HyperFrames: their licences, a project structure for demos and ads, and fast cuts on a tempo grid. A reel is written from research and Scout findings first.
- One home per rule: the Pinterest rules, the marketing review flow, the connect clipboard steps and the traffic provider order each live in one place. Retired formats and variants are gone, bootstrap saves the plan with `sprid plan`, the connect guides name the current Settings paths and Cloudflare's account id, and Scout installs on Codex too.
- Windows: the marketing review reaches `sprid` through its npm shim, and the Scout skill shows the `cmd /c sprid-scout` form for MCP clients.

## 1.4.7 - 2026-10-27

- Scout's format census: before planning a batch on an account, pull everything it posted in a window, label each post's format (hook template, slide skeleton, where the call to action sits, visual, sound) and measure each format's median views against the account's own median. Top posts show what peaked; the census shows what a format does on average, which is what a plan can repeat.
- The post skill's weekly read: every post is compared at seven days old against the account's median at the same age. A post at 3x or more gets a part 2 with the same hook template and skeleton and a new payload; a part 2 that also beats the median becomes a series; two parts in a row under it end the series. A post at 10x or more also earns its own video.

## 1.4.6 - 2026-10-27

- The ads skill covers Meta's wider surface, each part only when the person asks: audiences (cities and regions with a radius, ages, interests, saved and lookalike audiences, reach estimates), delivery (app promotion, awareness, profile visits, bid and cost caps, lifetime and campaign budgets, schedules, placements), creative (carousels from a post, text options, named Advantage+ features, previews, lead forms) and measurement (server conversions, A/B tests, live breakdowns, Meta-side hard stops). Unprompted, an agent keeps the playbook defaults. Financial products and services replaces credit as the regulated category.

## 1.4.5 - 2026-10-26

- Explain the directory connector’s separate video editing tools and the batch editor available on other connections.

## 1.4.4 - 2026-10-21

- Bootstrap prepares a first post beside its recommended artifact when that artifact is not a post, for the same audience, so a post can go out this week while a page or listing change takes effect. It skips the post only when the audience is still unknown. Bootstrap's "What this touches" now says that scout, when the person agrees to run it, browses TikTok and Meta's ad library in their own Chrome.

## 1.4.3 - 2026-10-21

- A first post starts from what travels in its niche. Bootstrap and the post skill run `/sprid:scout` before drafting when the app has no niche research yet, ask once first because scout drives the person's own Chrome, and say plainly when the draft was made without it.

## 1.4.2 - 2026-10-21

- Content tests: a format, message or visual test is a hypothesis listing the posts made for it, read at seven days old against your usual posts of the same platform and kind, on saves and shares per reach (views where no reach is reported). The post skill says how to record one; the review says what follows: variants of a winner, or the next thing to change as a new hypothesis that follows the old one.
- The person can close review items between reviews on the Reviews page (done, dropped with a reason) and add hand-counted readings; reviews treat those as decided. A hypothesis can be `dropped`, with the reason in `result`.

## 1.4.1 - 2026-10-21

- Marketing reviews write each hypothesis for the app's Reviews page: one plain sentence, a `measure` the line is drawn from (a PostHog query, an Insights series or dated hand readings), a short `label` and a numeric `target`. A query is checked against the number the review reported before it is saved, and every agenda item that tests something names its hypothesis.

## 1.4.0 - 2026-10-20

- New skill `/sprid:measurement`: a tracking plan written from the questions the business needs answered, each event fired on the live product and checked as it arrives, and the key events registered so Sprid notices when one stops arriving.
- Marketing reviews keep their history. Each agenda item keeps its id and the date it was first made; an item carried unchanged through two reviews is escalated, handed off or dropped with a reason. A claimed defect needs a reproduced check first.
- Reviews recheck the pages and flows people decide on (homepage, product pages, onboarding, checkout, listing) on a cadence, even when their numbers did not move, and keep a hypothesis ledger whose bar and read date are set before a change ships.
- Content skills load the rules and corrections the repository already keeps before drafting, and write accepted corrections back. Search pages ask the person behind the product for a concrete case, number or opinion before drafting a guide, and posts can use that material as hooks.
- Ads: an ad set needs a hypothesis and a target cost per event, which the skill helps work out from what one event is worth; verdicts wait until spend reaches twice the target.
- Research counts distinct people, marks paraphrases and tracks themes against the last run. Landing pages read where visitors stop and keep a tested page unchanged until its read date.

## 1.3.2 - 2026-10-19

- Bing Webmaster Tools: a connect guide, and the marketing review reads Bing clicks, impressions, queries, pages and index size beside Search Console. A site Google ranks poorly can still draw its search traffic from Bing, so the review checks Bing before concluding search does not work.
- When Sprid cannot reach Bing, the review reads it from the customer's machine with `tools/bing.mjs` and the app's local `bingWebmasterApiKeyPath`.

## 1.3.1 - 2026-10-19

- Marketing reviews reuse saved goals, support app, shop and service outcomes, and turn findings into concrete actions when requested.
- Content and research guidance follows the customer's evidence and voice. Clarify measurement limits, background refresh and the permissions needed to act.
- Scout guidance requires a version without automatic likes before discovery runs.

## 1.3.0 - 2026-10-18

- Marketing review: new reference "From diagnosis to an activity". After the headline movements, split the paying segment's volume from its rates, trace a volume change upstream, check each lever against earlier tests, then pick the kind of activity the evidence points to (reach through owned channels and dated moments, converting the visitors entry pages already get, winning the click in search, a missing handoff, a truth pass). The first agenda item is now an activity brief with audience size, date, assets, success measure, baseline and stop rule, handed to the execution skill.

## 1.2.4 - 2026-10-14

- Add a Meta conversion campaign guide covering preflight checks, creative controls, attribution and app approval. Explain shared Meta ad accounts, spending limits and the connections affected by removing access.

- The chat guide provides an app fallback when a connector does not expose account creation.

## 1.2.3 - 2026-10-12

- The chat guide has the agent create a missing content account with `create_content_account` instead of sending the person to the dashboard, and ask whether the app has users before offering analytics and revenue connections.

## 1.2.2 - 2026-10-09

- Refresh the plugin version alongside the Pinterest video upload fix.

## 1.2.1 - 2026-10-07

- Skills and guides say a post is scheduled, never booked, matching the app and the CLI.

## 1.2.0 - 2026-10-07

- Pinterest setup covers account-wide organic analytics and board/section management.
- New Pinterest Ads guide: separate advertising consent, reviewed maximum CPC and fixed daily budget, paused preparation, app-only spending approval and campaign reporting.

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
