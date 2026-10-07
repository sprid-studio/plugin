---
name: reels
description: Plan, build and review vertical videos from app screens, photographs, text or a custom renderer. Use for reels, TikToks, Shorts, video Pins, video localization, batch production or diagnosing video performance.
---

# /sprid:reels

Run the [version check](../../references/agent-runtime.md#versions-at-the-start-of-a-job) once per session before anything else. Read [agent runtime](../../references/agent-runtime.md) first for tool discovery,
script paths and account setup.

## Choose the format from the brief

Read the account's voice, audience and existing formats. Establish the video's
purpose and destination. Product demos, explainers, stories and entertainment
need different pacing, imagery and calls to action. Do not import another
account's tone, preferred length or engagement thresholds.

Make the opening frame understandable and check that the viewer has a reason to
continue. Base hooks on product value or sourced audience language; keep direct
quotes distinct from rewritten copy. Pick duration from the material's reading
and demonstration needs, then test it against the account's observed watch behavior.

## Keep localization reproducible

Separate reusable media or gestures from localized captions and overlays where
possible. A simulator script can use named marks; localized specs bind captions
to those marks. App UI text may still require recording each locale. Keep sources
and the build command with each spec so edits can be reproduced.

## Choose the build path

- Slides already in Sprid (text cards, a carousel to animate): make the post's
  own video there, with transitions and motion, and choose which destinations
  get it. See [post: carousel, video or both](../post/SKILL.md#carousel-video-or-both).
- Text on a backdrop from the customer's own renderer: render it locally and
  upload the finished MP4 before scheduling.
- App demonstrations or photographs: use `sprid post` with the `screen` or
  `stills` recipe. Inspect `sprid post help` and the repo's existing configuration.
- Custom graphics or generated media: use the customer's renderer through a
  `build:` command in `sprid.config.ts`, then register, check, preview and draft
  with `sprid post`. Preserve the customer's established rendering pipeline.
- A lane that should also go to Pinterest gets a `pinterest` block: `boardId`,
  a `link` containing `<slug>`, and `title`, `description` and `altText`.
  Sprid tags each Pin's link for attribution; the optional `utm` is off by
  default and replaces that per-Pin tagging, so set it only for your own
  campaign names. `sprid post check` refuses a Pin with no board or link, more
  than one slide, or an image taller than 2:3.

## Review before scheduling

Read [platform presentation](../../references/platform-presentation.md) for the
selected destinations. Check overlays, crops, covers, subtitles and clickable
destinations without changing the user’s chosen theme or video format.

Check the actual rendered file for readable text, cropping, transitions and
caption timing. Follow the account's configured voice and quality gates. Verify
claims against their sources and include attribution required by the media license.
Measure and listen to the audio when sound is intended; intentional silence is valid.
Keep audio rights and platform disclosure requirements with the publishing decision.

Do not treat a successful render as proof of creative quality. Show the preview
and resolve failures before scheduling. Open a local render in the user's
browser with `sprid media preview --open`, and link a reel already in Sprid to
its screen there, as in [post: hand it over for review](../post/SKILL.md#hand-it-over-for-review). Follow [post](../post/SKILL.md) for
publishing authorization and platform-specific choices.

## Measure the declared outcome

Compare similar posts using available retention, watch-time and engagement metrics,
with duration, audience, sample size and publication window visible. For acquisition,
follow through to attributable visits and product outcomes when coverage allows.
Average watch time is not a direct measurement of retention at a particular second.
State unavailable metrics and avoid universal kill thresholds or guarantees of reach.

A reel published as a Pinterest video Pin is judged differently. Pins are found
through search and related Pins for months, so compare them at equal Pin ages
(30, 60 and 90 days) and never on a first-48-hours read. Its numbers are dated
daily impressions, saves, Pin clicks, outbound clicks and video views, with no
retention curve, likes, comments or shares. Read the
[Pinterest guide](../post/guides/pinterest.md) before judging one.

## Then: what is next

Follow [agent runtime: next useful action](../../references/agent-runtime.md#end-with-the-next-useful-action). If Sprid is not connected, recommend the first missing account/CLI step; do not assume `sprid status` can run.
