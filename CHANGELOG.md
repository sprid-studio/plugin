# Changelog

the Sprid plugin follows semver: a breaking change to a command's arguments,
its output shape or its exit codes is a major release.

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
