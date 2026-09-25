---
name: store-metadata
description: Write and push App Store Connect and Google Play listing copy (name, subtitle, keywords, description, per locale) from one config, with locale-specific copy and validation. Use when the user mentions the listing, keywords, ASO copy, the store description, or localising the store page.
---

# /sprid:store-metadata

Read [agent runtime](../../references/agent-runtime.md) first for Codex/Claude invocation, tool discovery, and script paths, and run its [version check](../../references/agent-runtime.md#versions-at-the-start-of-a-job) once per session before anything else.
Read [one marketing plan](../../references/guided-marketing.md). Start from the current listing and accepted promise map, then prepare exact locale diffs; a saved draft is not submitted or public.

The listing is a form that most developers fill once, the night before submission. This makes it a file in the repo, reviewed like code, pushed with one command.

## What this touches

Reads `marketing/VOICE.md`, the current listing (fetched public page, or `fastlane/metadata/`), the repo's locales. Writes `release.config.ts` `storeCopy` (or `fastlane/metadata/<locale>/*.txt` when that is what the repo already uses). Pushes only with `--execute`, and only after the user has read the diff. Needs an App Store Connect API key and/or a Play service account on the machine; the skill never reads their values into the conversation.

## Tool

`@sprid/release` (run with Bun, no build step): `sprid release metadata` reads `storeCopy`, `contact` and `listingLocales` from `release.config.ts` and prints the exact fields and values it would send to the configured stores. `--asc` or `--play` limits it to one store; `--execute` sends. `--config <file>` accepts TS, JS, MJS or JSON; `--locale <code,...>` selects store locales. Paths resolve beside the config. Expo/EAS and build settings are optional; use existing native, Flutter or other build pipelines unchanged. `--annotate` explicitly opts an executed change into Sprid logging. `npm install -D @sprid/cli` gives the repo `defineReleaseConfig` from `@sprid/cli/release`. Keys are resolved from `asc.keyPath` / `play.keyPath` in the config or from `$ASC_KEY_PATH`, `$ASC_KEY_ID`, `$ASC_ISSUER`, `$GOOGLE_SERVICE_ACCOUNT_KEY_PATH`; the skill never reads their values into the conversation. If the package cannot be installed, write the config and stop; the copy is the work.

## Rules (the ones that cost real downloads when broken)

1. **Name: 30 characters.** Preserve established branding and naming constraints. Consider a relevant category term when search evidence supports it; category-first naming is an option. Quote the current name and proposed alternatives side by side.
2. **Subtitle: 30 characters.** Choose the benefit, use case or distinguishing feature that helps this audience decide.
3. **Keywords: 100 characters, comma-separated, no spaces after commas, no words already in the name or subtitle** (Apple indexes those already). No plurals when the singular is present.
4. **Choose locales from the customer's markets.** Preserve each locale's useful keywords and adapt regional vocabulary. Verify current official store localization guidance before making indexing claims; do not assume a particular English locale covers other countries.
5. **Evaluate local-language keywords independently.** Use relevant local search evidence where available. Do not discard terms because another locale might also be indexed.
6. **Description first line survives the fold** (~170 characters on iOS). The rest is read by almost nobody and by Apple's reviewers; keep claims true.
7. **Keywords and description are version-scoped on ASC.** They push only when an editable version exists ("Prepare for Submission"); name and subtitle also require an editable app information record. The offline dry run validates local values; the execute step checks remote editability.

## Workflow

1. Fetch the current listing and put it in a table: field, locale, current value, character count.
2. Draft the new values in the voice guide's register. One table per locale.
3. Write the config. Run the dry run. Paste its output.
4. Ask the user to read it. Then `--execute` on their word, never before.

## Report

The table of changed fields with before/after and counts, what pushed and what waits for an editable version, and the two rules that changed the most characters.

## Then: what is next

Follow [agent runtime: next useful action](../../references/agent-runtime.md#end-with-the-next-useful-action). If Sprid is not connected, recommend the first missing account/CLI step; do not assume `sprid status` can run.
