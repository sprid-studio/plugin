---
name: store-metadata
description: Write and push App Store Connect and Google Play listing copy (name, subtitle, keywords, description, per locale) from one config, with locale-specific copy and validation. Use when the user mentions the listing, keywords, ASO copy, the store description, or localising the store page.
---

# /sprid:store-metadata

Read [agent runtime](../../references/agent-runtime.md) first for Codex/Claude invocation, tool discovery, and script paths, and run its [version check](../../references/agent-runtime.md#versions-at-the-start-of-a-job) once per session before anything else.
Read [one marketing plan](../../references/guided-marketing.md). Start from the current listing and accepted promise map, then prepare exact locale diffs; a saved draft is not submitted or public. Load [standing rules and corrections](../../references/standing-rules.md) before drafting, and write accepted corrections back.

The listing is a form that most developers fill once, the night before submission. This makes it a file in the repo, reviewed like code, pushed with one command.

## What this touches

Reads `marketing/VOICE.md`, the current listing (fetched public page, or `fastlane/metadata/`), the repo's locales. Writes `release.config.ts` `storeCopy` (or `fastlane/metadata/<locale>/*.txt` when that is what the repo already uses). Pushes only with `--execute`, and only after the user has read the diff. Needs an App Store Connect API key and/or a Play service account on the machine; the skill never reads their values into the conversation.

## Tool

`@sprid/release` (run with Bun, no build step): `sprid release metadata` reads `storeCopy`, `contact` and `listingLocales` from `release.config.ts` and prints the exact fields and values it would send to the configured stores. `--asc` or `--play` limits it to one store; `--execute` sends. `--config <file>` accepts TS, JS, MJS or JSON; `--locale <code,...>` selects store locales. Paths resolve beside the config. Expo/EAS and build settings are optional; use existing native, Flutter or other build pipelines unchanged. `--annotate` explicitly opts an executed change into Sprid logging. `sprid release pages` runs App Store custom product pages and `page-results` reads how each converts ([store listing guide](guides/store-listing.md) § One listing is not the only listing). `npm install -D @sprid/cli` gives the repo `defineReleaseConfig` from `@sprid/cli/release`. Keys are resolved from `asc.keyPath` / `play.keyPath` in the config or from `$ASC_KEY_PATH`, `$ASC_KEY_ID`, `$ASC_ISSUER`, `$GOOGLE_SERVICE_ACCOUNT_KEY_PATH`; the skill never reads their values into the conversation. If the package cannot be installed, write the config and stop; the copy is the work.

## Rules

Read [Write a store listing people can find](guides/store-listing.md) before drafting. It owns the field limits on both stores, the keyword rules, locales, what to change first and when App Store Connect accepts a push. Judge each locale's keywords on that language's own search evidence, and keep a useful term even when another locale might also index it.

## Workflow

1. Fetch the current listing and put it in a table: field, locale, current value, character count.
2. Draft the new values in the voice guide's register. One table per locale. Choose the subtitle's angle with [finding the frame](../../references/copy-framing.md), then run the [writing gate](../../references/writing-gate.md) on the subtitle and the description's first lines.
3. Write the config. Run the dry run. Paste its output.
4. Ask the user to read it. Then `--execute` on their word, never before.

## Report

The table of changed fields with before/after and counts, what pushed and what waits for an editable version, and the two rules that changed the most characters.

## Then: what is next

Follow [agent runtime: next useful action](../../references/agent-runtime.md#end-with-the-next-useful-action). If Sprid is not connected, recommend the first missing account/CLI step; do not assume `sprid status` can run.
