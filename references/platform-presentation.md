# Platform presentation checks

Use this when writing captions or preparing media for connected destinations.
Preserve the person's theme, voice and chosen format. These checks address what
gets hidden, cropped, counted or clicked; they do not prescribe topics, pacing,
posting frequency, hashtag counts or a supposedly winning creative format.

Reviewed 2026-09-30. Sources below distinguish documented platform behavior
from working checks. Recheck current capabilities before relying on a number
or feature. No character budget guarantees a collapsed-feed preview, and ad
safe-zone guidance does not establish identical organic-feed geometry.

## Collapsed captions: LinkedIn, Facebook and Instagram

**Working check:** make the opening sentence understandable by itself, without
expanding the caption or reading the artwork. Put essential context before
introductions, links and hashtags. If the next sentence supplies the reason to
expand, avoid spending the opening on blank lines. The body must deliver what
the opening promises. This is writing guidance, not a claim about reach.

Example for a team delaying company posts:

> “We should post on LinkedIn.” Another meeting, no posts.
> Bring drafts to the next one.

Read just the first sentence with the image hidden. Then read the opening plus
the body. Neither should require an unseen setup. The caption hook and the
artwork may differ; each should remain understandable on its own.

LinkedIn breakpoint tests are dated observations, not a current platform
contract. Do not copy their line counts to Facebook or Instagram. Device width,
text size and placement matter; a typed newline is not a rendered line. Show
the proposed opening in the handoff, and call a simulated cutoff an estimate.

## Titles: YouTube and other title-bearing destinations

YouTube advises putting important words early because viewers may see only part
of a title. Keep necessary identification before branding or episode suffixes.

Example: “Invoice tracking for freelancers | Product demo 04” retains its
subject when shortened; “Product demo 04 | September update | Invoice tracking
for freelancers” may lose it. Preserve the actual subject and factual promise.
Do not assume a title field appears in every feed placement.

## Cropping and controls: Instagram, Facebook, TikTok and Shorts

**Working check:** preview the selected output size and where it will appear.
Keep essential text and demonstrated results clear of visible caption blocks,
buttons and account labels. Check the full-screen view and any relevant cover
or grid crop separately; a correctly sized file can still hide important text.

Example: if a result sits at the bottom of a screen recording, reframe the
recording or move the annotation above the controls. Keep the result readable
at phone size. Do not automatically shrink the entire recording until the UI
text becomes illegible.

TikTok documents that ad safe zones depend on dimensions, caption length and
additional formats. Meta also provides Reels ad safe-zone guidance. Use the
current template for the actual ad placement; for organic posts, inspect the
available native preview rather than treating an ad overlay as exact.
Never invent one universal pixel margin for every platform.

## Links: validate the destination a person can actually tap

**Documented example:** ordinary URLs in YouTube Shorts descriptions and
comments are not clickable. YouTube lists other link surfaces separately;
special brand-deal links have their own eligibility and setup.

**Working check across platforms:** verify the actual placement and account
before writing “tap the link.” A URL visible in a caption is not proof of a
clickable link. Profile links, stickers and other native features may need
setup or may be unavailable through the publishing connection.

Example: use “Open the guide from our profile” only after checking that the
profile has that destination. Do not substitute that instruction automatically
for a non-clickable URL. Check the final page and any preview card as well.

## Fields and limits: check what Sprid will send

Sprid currently uses `captionInstagram` as the shared caption for Instagram,
Facebook and LinkedIn. TikTok and X use non-empty `captionTiktok` and `captionX`
overrides respectively, falling back to the shared caption when empty.
Hashtags are part of the caption. Pinterest has separate title, description,
link and alt-text fields; follow the [Pinterest guide](../skills/post/guides/pinterest.md).

Example: shortening `captionInstagram` for LinkedIn also changes the Facebook
copy on that post. Use separate drafts if those destinations need different
wording; do not invent a `captionLinkedin` field or silently overwrite copy.

Read current tool schemas and destination validation for accepted lengths,
media counts and outputs. Validate the resolved text including links and tags.
Character counting can be platform-specific; a plain string length is only a
rough check. A platform's paid/native composer features are not proof that
Sprid's connection supports the same limits or features.

## Subtitles, covers and the review boundary

**Working check:** watch the actual export muted to see whether essential spoken
information is missing. Where speech carries meaning, provide readable captions
or equivalent on-screen information. If both burned-in and native subtitles
will appear, check their interaction; do not promise to disable a feature the
publishing connection cannot control. Review audio separately when intended.

Example: a spoken instruction naming a button needs a readable equivalent;
decorative music needs no word-for-word subtitle. Check that caption text does
not obscure the button being demonstrated.

Inspect the selected cover and opening frame independently. Do not assume the
platform always chooses frame zero or that Sprid supports a custom cover for
every destination. A blank opening frame can remain visible before playback.

A Sprid render verifies the asset, not the platform's caption truncation,
interface overlays or link behavior. State which native placements were actually
checked and what remains estimated. Never publish merely to obtain a preview.

## Sources and scope

- [LinkedIn breakpoint observations, September 2024](https://espirian.co.uk/linkedin-see-more-breakpoints/): third-party tests; historical, not a guaranteed current cutoff.
- [YouTube title guidance](https://support.google.com/youtube/answer/12340300): title truncation and important words first.
- [YouTube link surfaces](https://support.google.com/youtube/answer/13748639): clickable and non-clickable destinations.
- [YouTube brand-deal links](https://support.google.com/youtube/answer/17081657): a conditional Shorts exception, not a general caption-link feature.
- [TikTok in-feed ad specifications](https://ads-useast2a.tiktok.com/resources/help/article/tiktok-auction-in-feed-ads): variable ad safe zones.
- [Meta Reels ads](https://www.facebook.com/business/ads/facebook-instagram-reels-ads): ad-placement safe zones; do not transfer performance claims to organic posts.
- Sprid caption routing was checked against the implementation on the review date. Recheck the connected tool schemas and saved post before changing destinations.
