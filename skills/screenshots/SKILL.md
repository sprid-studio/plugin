---
name: screenshots
description: Produce App Store and Google Play screenshot sets from raw captures and a config the skill writes from the voice guide, in every store language, with headlines, device frames and an optional laurel badge. Use when the user mentions screenshots, store images, localising the listing, or App Store assets.
---

# /sprid:screenshots

Read [agent runtime](../../references/agent-runtime.md) first for Codex/Claude invocation, tool discovery, and script paths.
Read [one marketing plan](../../references/guided-marketing.md). Use the accepted promise map and preserve existing locale-specific work; screenshot preparation never implies store submission.

Make screenshot sets reproducible: a config file is the source of truth, raw captures go in named files, one command renders every language × device × slot.

## What this touches

Reads `marketing/VOICE.md`, the repo's locales, and `screenshots/{lang}/raw/*.png` if present. Writes `aso.config.ts` and `screenshots/{lang}/aso/*.jpg`. Runs `@sprid/shots`, a headless composer (`@napi-rs/canvas`, no browser). Nothing leaves the machine.

For a browser-only user, read `marketing_plan_capabilities` and open the plan's
hosted screenshot continuation when available. That path accepts uploaded real
captures and validated declarative layout data. Captures become future-public
store assets under unguessable keys, so refuse secrets and internal-only screens.
It prepares downloadable files and never submits a store listing. Native capture
still requires the user's local simulator or manual upload.

## Install the composer

```
sprid screenshots --help
```

Bun runs the TypeScript directly; nothing to build. `npm install -D sprid` gives the repo the `AsoConfig` type through `sprid/screenshots` for the config file.

If it is not installed and cannot be, write the config anyway and say what is missing; the config is the durable artefact.

## 1. Decide the slots

Choose the number of slots for the product story, target devices and current store limits. Preserve a customer’s chosen count. The following sequence is a starting point; omit, combine or reorder slots when the product calls for it:

1. The reason to install, on the app's best screen. The headline is the subtitle's promise in the user's words.
2. The moment the app is used (the situation from the voice guide).
3. The relief (the outcome line the reviews use, if any).
4. Proof or trust (rating, a real number the repo can back, or nothing).
5. The second most-used screen.

Keep headlines short enough for the layout and use the app’s voice and visual style. The composer supports `*highlighted*` words when emphasis suits the design. Do not add a rating or badge without a verified claim.

## 2. Write `aso.config.ts`

```ts
import type { AsoConfig } from "sprid/screenshots";

export const config: AsoConfig = {
  outputDir: "./screenshots",
  filenamePrefix: "<slug>",
  languages: [{ id: "en", label: "English" } /* every store locale the app ships */],
  devices: [
    { id: "iphone-65", label: 'iPhone 6.5"', width: 1284, height: 2778, platform: "ios", frame: "iphone" },
    { id: "iphone-67", label: 'iPhone 6.7"', width: 1290, height: 2796, platform: "ios", frame: "iphone" },
    { id: "play-phone", label: "Android Phone", width: 1080, height: 1920, platform: "android", frame: "android-phone" },
  ],
  slots: [
    { id: 1, scene: "home", description: "…", headlines: { en: "…", sv: "…" } },
  ],
  background: { type: "color", color: "#0B0B0B" },
  laurelBadge: { slotIds: [1], text: { en: "…" } },
};
```

Rules the composer learned the hard way: CJK locales need `fontFallbacks` and `headlineLineHeightByLang`; Android wants a slightly tighter line height; tablets are off unless `--include-tablets`.

For a standalone opening image, use `slot.hero`: optional photo tiles (`images` with config-relative paths and 0..1 canvas boxes), a `textBox`, and localised `support`. It needs no raw capture or frame. Per-slot `background` and `style` let the opener differ from the rest of the set. Keep app-specific photos, words and colours in config; use the shared renderer instead of writing another app-local hero compositor. See `@sprid/shots`' README for the full example.

Reuse the app's localisation files and terminology where available. For missing locales, draft translations and mark them for review; do not present an unreviewed translation as approved copy. Follow the customer's translation workflow.

## 3. Raw captures

Use existing captures from any framework or capture tool: native, Flutter, React Native, Expo, browser or manual. `slot.capture` accepts a path pattern such as `captures/{lang}/{device}/{scene}.png`, or a language → device → path map, relative to the config. Omit it to keep `screenshots/{lang}/raw/{scene}_{lang}_raw.png` (iOS) and `{scene}_{lang}_android_raw.png`. Omit `device.frame` or use `"none"` for unframed screenshots.

Reuse the repo's capture command when available (for example fastlane, Maestro, an existing Expo script or an iOS simulator recipe). Run it within the user's authorized local scope. Otherwise report which captures are missing. Do not introduce Expo or a simulator dependency just to compose existing images.

## 4. Render

```
sprid screenshots --config ./aso.config.ts
sprid screenshots --config ./aso.config.ts --lang en --slot 1 --platform ios   # one image, to check
```

Output: `screenshots/{lang}/aso/<slug>_{lang}_{deviceId}_{slotId}.jpg`. Open slot 1 for one language and look at it before rendering everything.

When comparing directions, export a `ReviewConfig` as `review` alongside `config`, with a separate `outputDir` and labelled `variants` (each supplies an `AsoConfig`). Run `sprid screenshots --config ./aso.config.ts --review`. It produces an offline gallery, contact strips and an image manifest without replacing the store outputs. Check every locale/device, including translated text fit, before presenting the review. Missing captures or hero translations fail the render.

## 5. Report

The slot list with headlines per language as a table, the files rendered (count per language), and the captures still missing. If the composer is unavailable, the config path and the install line.

## Then: what is next

Follow [agent runtime: next useful action](../../references/agent-runtime.md#end-with-the-next-useful-action). Continue the prepared screenshot review or missing capture. Setup is relevant only when the chosen hosted operation needs it; a missing account or CLI is not itself the marketing result.
