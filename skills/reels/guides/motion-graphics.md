# Motion graphics in code

**What this guide does:** Helps build reels with animated type, product mock-ups and
fast cuts in code, when the customer has no renderer and the video needs more than
text on a backdrop.

Use the customer's existing pipeline when there is one. Building in code suits an
agent: every frame is reproducible, a copy change is an edit and a re-render, and
it runs on the customer's machine without credits.

## Start from what the research found

Write the video from evidence before opening a renderer. The problem line comes
from the audience's own words, found with `/sprid:research` in reviews, threads
and support mail. The shape comes from what already travels in the niche, found
with `/sprid:scout`: the hooks, pace and look of the slideshows, reels and ads
that hold attention for products like this one. The answer comes from the
product's own screens and numbers. A viewer recognises the problem, then sees the
product deal with it.

## Pick a renderer

Two examples, both rendering locally with headless Chrome and FFmpeg:

- **Remotion**: React components on a frame clock. Mature, with audio, captions and
  3D. Free for individuals and for companies with up to three employees; larger
  companies need a paid company licence.
- **HyperFrames**: compositions in plain HTML and CSS, made for agents. Apache 2.0,
  so there is no licence threshold. Young and changing quickly, so pin the version.

Read each licence before recommending it, because terms change (both checked in
October 2026). Run the render as a `build:` command in `sprid.config.ts`, then
register, check and preview with `sprid post` as for any other lane.

## A structure that holds up

One way to lay out the project, loose enough for a product demo or an ad:

- **One look**: fonts, colours and easing taken from the product's own site or app,
  so the video matches what a viewer finds after the tap.
- **A shared stage** behind every scene (background and lighting), so scenes cut
  over it without a flash of black.
- **Scenes as a list**, each with its length, how it enters and the sounds it
  triggers. Reordering the video is editing the list.
- **A small kit** of reusable pieces: headings, cards, a simple mock of the app's
  screen, a chart, an end card.
- **A render script** that renders, normalises loudness to the level the platforms
  play at (about -14 LUFS) and writes a contact sheet, a few frames a second on one
  image, to read before anyone watches.

## Fast cuts

When scenes change every 1.5 to 2 seconds, keep to about six words a scene and let
the picture carry the rest, with shapes standing in for the text on mock screens.
Keep something moving in every scene, such as a slow push-in or items entering one
after another. Text that has to be read while it moves, such as a caption being
typed out, rarely survives a scene this short. Put it on screen still.

Put the music on a fixed tempo and make each scene a whole number of beats, so
every cut lands on the beat. Check the track's tempo before cutting to it. Give each kind of event
one sound (a whoosh for a cut, a pop for a card landing), use it every time that
event happens, and keep the effects under the music.

## Review

Read the contact sheet for clipped text, overflow and empty frames, then watch at
phone size with sound. Treat the word and tempo rules as starting points and compare
against the account's own retention, as in [the first seconds](first-seconds.md).
