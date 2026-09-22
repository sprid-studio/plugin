---
name: reels
description: Plan, build and review vertical videos from app screens, photographs, text or a custom renderer. Use for reels, TikToks, Shorts, video localization, batch production or diagnosing video performance.
---

# /sprid:reels

Read [agent runtime](../../references/agent-runtime.md) first for tool discovery,
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

- Text on a backdrop: render it with the customer's local renderer and upload
  the finished MP4 before booking.
- App demonstrations or photographs: use `sprid post` with the `screen` or
  `stills` recipe. Inspect `sprid post help` and the repo's existing configuration.
- Custom graphics or generated media: use the customer's renderer through a
  `build:` command in `sprid.config.ts`, then register, check, preview and draft
  with `sprid post`. Preserve the customer's established rendering pipeline.

## Review before scheduling

Check the actual rendered file for readable text, cropping, transitions and
caption timing. Follow the account's configured voice and quality gates. Verify
claims against their sources and include attribution required by the media license.
Measure and listen to the audio when sound is intended; intentional silence is valid.
Keep audio rights and platform disclosure requirements with the publishing decision.

Do not treat a successful render as proof of creative quality. Show the preview
and resolve failures before scheduling. Follow [post](../post/SKILL.md) for
publishing authorization and platform-specific choices.

## Measure the declared outcome

Compare similar posts using available retention, watch-time and engagement metrics,
with duration, audience, sample size and publication window visible. For acquisition,
follow through to attributable visits and product outcomes when coverage allows.
Average watch time is not a direct measurement of retention at a particular second.
State unavailable metrics and avoid universal kill thresholds or guarantees of reach.

## Then: what is next

Follow [agent runtime: next useful action](../../references/agent-runtime.md#end-with-the-next-useful-action). If Sprid is not connected, recommend the first missing account/CLI step; do not assume `sprid status` can run.
