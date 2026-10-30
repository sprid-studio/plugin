# Store art beyond screenshots

**What this guide does:** Lists every image and video slot on an App Store and
Google Play listing besides the screenshots: the exact sizes the stores accept,
what each slot is for, and how to produce and push it. Read it before making a
header, a search asset, an app preview, a Play video or a feature graphic.
Specs were checked against the stores' own pages and App Store Connect's live
reference data in October 2026; re-check a size before promising it.

## App Store: header and search results (iOS and iPadOS 27 and later)

Two optional placements, live since October 2026. Devices on iOS 26 and earlier
never show them and keep showing screenshots and previews, so they add to a
listing and replace nothing.

| Placement | Image | Video |
|---|---|---|
| Product page header | 3840×1646 PNG (21:9) | 3840×1646, 5-30 s, 30 or 60 fps, MOV/MP4/M4V |
| Search results | 3:2, 1920×1280 to 3840×2560, PNG or JPEG | same 3:2 range, 5-30 s, 30 or 60 fps |
| Universal (both) | 5244×2950 PNG (16:9) | none |

- No alpha channel in any image, even a fully opaque one. App Store Connect
  refuses it. Apple's help page also lists JPEG for the 21:9 header, but the
  live spec accepts only PNG.
- One header and one search asset per version, per localization.
- Videos loop. The header is muted until the person unmutes it; search results
  are always muted. Design for silence and make the loop seamless.
- **Safe area.** Apple's templates mark the only region every device and
  orientation shows. Key art and every word go inside it; the rest is bleed.
  As fractions of the canvas: header x 0.286-0.714, y 0.300-0.701; search x
  0.218-0.782, y 0.299-0.701; universal x 0.366-0.634, y 0.224-0.550 (upper
  middle, not centred).
- **What each is for.** The header is one clear idea for a first-time visitor:
  the brand, a season, the promise. The search asset states the obvious and
  shows the product: the interface, content or gameplay. Text is a short phrase
  that adds to the picture, localized.
- **Content rules** (Apple's asset guidance): 4+ appropriate whatever the app's
  rating; no prices, discounts, URLs, copyright symbols, other platforms' logos,
  unverifiable awards or Apple accolades.
- **Review.** Attached to a version, they go to review with it. They can also be
  submitted alone from Asset Library in App Store Connect, approved ahead of
  time and published to the live version without an app update.

Without a search asset, search keeps showing events, previews and screenshots.
Vendor tests (SplitMetrics, 2026, not Apple data) report the header pushing the
first screenshot further down the page: re-read screenshot 1's job once a
header is live.

## App Store: app previews

Up to three per device size per language, shown before the screenshots and
autoplaying muted. 15-30 s, at most 30 fps, 500 MB. Current iPhones take
886×1920 portrait or 1920×886 landscape. **Every preview needs an audio track**;
a silent one is fine, a file with no track is refused. Show the real interface.
The poster frame defaults to 5 s and can be changed only before approval.

## App Store: iPhone Duo screenshots

The foldable has its own sizes: outer 1398×2034, inner 2007×2853 (portrait;
landscape is the same sizes rotated). They are optional now. Apple says they
become required in April 2027. Its spec page ties that to builds made with the
iOS 27.1 SDK, while its news post applies it to every submission. Plan for the
broader reading.

## Google Play

- **Preview video.** A YouTube URL on the listing: public or unlisted, ads off,
  not age restricted. It sits before the screenshots and autoplays muted where
  Play allows. A portrait video opens in a full-screen player with the install
  button; Google reported 5% more conversions from that player in 2024. Show the
  product within the first seconds, caption it, and never letterbox it.
- **Feature graphic.** 1024×500 PNG or JPEG, no alpha. With a video set, it is
  also the video's cover, under a play button.
- **Screenshots.** Up to 8 per device type. Four or more at 1080 px or above,
  9:16 or 16:9, make the app eligible for the large-format placements.
- Play Shorts (9:16 uploads) and the YouTube carousel are limited to selected or
  very large developers. Check eligibility before planning for them.

## Make them

Store art is a slot in `@sprid/shots` like any screenshot. Give the placement
its own config, so the sizes and boxes stay apart from the screenshot set:

```ts
export const config: AsoConfig = {
  outputDir: "./store-art", filenamePrefix: "<slug>", outputFormat: "png",
  languages: [{ id: "en", label: "English" }],
  devices: [{ id: "header", label: "App Store header", width: 3840, height: 1646, platform: "ios", frame: "none" }],
  slots: [{ id: 1, scene: "header", description: "The promise", headlines: { en: "…" },
    hero: { textBox: { x: 0.286, y: 0.30, width: 0.428, height: 0.40 }, images: [/* bleed art */] } }],
};
```

PNG output is written without an alpha channel. For the search asset, put real
screens in the hero images: `sprid screenshots mockup <capture> --trim` renders a
framed phone with a transparent background. Look at the result at the size it
is shown, about a third of a phone's width, before calling it done.

For a header or search video, follow [reels](../../reels/SKILL.md) and export
the store's exact size and frame rate. A 21:9 header cut from a 16:9 render
loses its sides, so compose for 21:9 from the start.

## Push them

`sprid release creative` (dry run) checks every file against the specs above
and prints the placements; `--execute` uploads to Asset Library and attaches
them to the editable version in each configured locale:

```ts
ascCreative: {
  header: "./store-art/{lang}/aso/<slug>_{lang}_header_01.png",
  search: "./store-art/{lang}/aso/<slug>_{lang}_search_01.png",
  previews: ["./previews/{lang}/demo.mp4"],
},
```

A Play preview video is listing copy: `playVideo` on the locale's `storeCopy`,
pushed by `sprid release metadata`. The feature graphic goes through
`sprid release graphics`.
