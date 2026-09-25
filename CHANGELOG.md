# Changelog

the Sprid plugin follows semver: a breaking change to a command's arguments,
its output shape or its exit codes is a major release.

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
