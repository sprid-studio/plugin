# Check an ad image set

Run this before designing ad images or carousel cards, and again on the finished
set before uploading. Every item is a process check: fix a failure before
spending. Whether the set then sells is a separate question for the customer's own
paid outcomes.

## Before designing

1. **Start from the product's own visual system.** Look for an existing store
   screenshot config, brand fonts and colours, and the product's own components.
   If the product has a screenshot pipeline (an `aso.config.ts` or similar), add an
   ad configuration to it for the feed sizes (1080×1350, 1080×1080, 1080×1920)
   that reuses its slots, captures and style. Do not draw new slides by hand when
   the product already has a visual system.
2. **Look at what already shipped.** Open the current store screenshots, the
   latest product videos or explainers, and the ads running now. The new set must
   look like it belongs with them. Name any deliberate departure and why.

## Each card

3. **One message per card, said by the headline.** The headline is the answer in
   the product's voice ("See what it costs each month."), not a label or a teaser.
   The claim that matters most is the first card; do not save it for the end.
4. **The product does the showing.** Show a real screen in a real device frame,
   ideally with the one component that proves the headline lifted out and enlarged.
   A screen too small to read proves nothing.
5. **No line nobody reads.** No smaller sub-line under the headline, no wordmark
   or brand label as a header, no slide counter competing with the headline. If a
   point needs a second sentence, it needs its own card or belongs in the ad text.
6. **No emoji or Unicode symbols as icons** (check marks, link symbols, arrows).
   Icons appear inside the product's own components, in its own icon set.
7. **Example data reads as an example.** Label demo or sample content as such.
   Crop away any detail that could read as a factual claim about a real person,
   place or business that never agreed to appear.

8. **Inside the safe zone.** Placements crop cards and lay their own buttons over
   them. Keep the headline and every lifted component between about 10 % and 80 %
   of the height of a 4:5 card; backgrounds, photos and device bodies may run past.
   With the screenshot pipeline, set `safeZone: { top: 0.1, bottom: 0.2 }` on the ad
   configuration and render with `--guides`: each card is written again with the
   margins shaded and every element outlined, red where it crosses a line, and each
   crossing is listed by card. Fix every red outline before uploading.

## The whole set

9. **Legible at feed size.** Render a contact sheet with every card about 360 px
   wide and read every word on it. Anything you have to zoom to read is too small.
10. **Copy and offer.** Ad text reads like short text messages, one idea per line.
    The offer and price match the landing page and the preselected checkout option
    exactly (see the [campaign promise check](campaign-promise-check.md)).
11. **Side by side before upload.** Put the new set next to the store screenshots
    and the running ads. If it looks like a different product, go back to step 1.
