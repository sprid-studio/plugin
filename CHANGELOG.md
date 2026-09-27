# Changelog

the Sprid plugin follows semver: a breaking change to a command's arguments,
its output shape or its exit codes is a major release.

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
