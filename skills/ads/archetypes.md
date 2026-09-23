# The archetypes: shapes you can build another of

An archetype is a recipe, not a label. Each one says what the shape *is*, which
slots it takes, what the slot has to contain, and what breaks it. That last part
is the whole value: the difference between copying a shape and copying the idea.

`ad_archetypes` lists what the account holds, `render_ad_creative` builds a
creative from a recipe plus slot values, and `archetype_standing` says how each
shape is doing here. Every creative carries its archetype, which is what turns a
result into something transferable - "the shape that shows the product's verdict
beat the shape that lists features" rather than "ad 7 beat ad 3".

## The eleven shapes

**The screen that reads you back.** The creative shows the product's verdict
about the reader, not its features. The screen text is the ad and has to be
written as carefully as the headline: an unflattering, specific, accurate
observation, in the product's voice. Specificity reads as competence without
making a claim. Breaks when the screenshot becomes a feature tour.

**Copy typed onto a thing.** The whole ad typed onto a photographed object that
belongs to the product's world. The object carries the tone, so it has to be a
real thing photographed plainly, not a render. Breaks when the object is generic
stock - then it is just text on a picture.

**Two columns, the reader does the arithmetic.** "Here is what that money buys
you elsewhere" against "here is what it buys here". Both sides must be stated in
the same grammar; if the right column reads as a different kind of thing, the
comparison collapses. The longest-running shape in the harvest that produced this
library ran 326 days.

**Four panels, before and after.** A short illustrated narrative in one still.
Needs a real before - a recognisable bad evening, not a shrug - and a specific
after. Breaks when the after is a feeling instead of a change.

**Which one are you.** Four labels and an invitation to self-select, usually into
a quiz. Cheap to make and strong at the top of a funnel, and it has to hand over
something at the end or it reads as a data grab.

**One word.** A single word over ordinary photographs. It only works for a brand
the reader already knows, because the word is doing no explaining. Reaching for
this without that recognition is the most common way to waste a good picture.

**One person, with an age.** One buyer's story, told plainly, with a real
photograph. The detail that makes it work is the mundane one, not the dramatic
one. Rare in most categories, which is usually the argument for trying it.

**Price typography.** The offer as the whole design, no emotion, no photograph.
Flat ground, condensed type, the terms stated. It converts people already
deciding, so it belongs late, and it needs the terms to be exactly true.

**On-screen text throughout.** The text converts and the image is a ground for
it. The only shape where going long before the fold is correct, which is why the
copy gate exempts it from the truncation warning.

**One sourced number.** A single figure carrying the entire ad, with its source
printed underneath. The source line is not decoration: it is what separates this
from a claim, and a number without one is a liability in any regulated category.

**Their words, your picture.** The category's own euphemism printed over a
photograph of what it actually describes. The reader draws the conclusion, which
is what keeps it a quotation rather than an accusation - and that distinction is
exactly what the copy gate's quoting rule protects.

## The evidence that travels with them

Each archetype carries what was observed: how many ads of that shape were found,
how many distinct advertisers ran them, the median and maximum days live, and the
markets. Two rules about quoting any of it:

- **`sampleSize` and `distinctAdvertisers` travel with the median, always.** Six
  ads from one advertiser is that advertiser's habit, not a shape that works.
- **Days live is survival, not efficiency.** It means somebody kept paying. It is
  not a click-through rate and must never be presented as one.

`refresh_archetype_evidence` recomputes a baseline from the inspirations behind
it, so a user who harvests their own market with the `scout` skill gets standings
measured against their competitors rather than inherited from someone else's.

## Choosing one

Not by taste. Ask what the ad has to do:

- The reader does not know the category exists → the shape that shows the
  product's verdict, or the four-panel narrative.
- They know the category and are comparing → two columns, or price typography.
- They know the brand → one word.
- The claim is a number → one sourced number, with the source line.
- The category speaks in euphemism → their words, your picture.

Then check `archetype_standing` before building: a shape that has already been
tried here and stalled is worth a different hypothesis, not a second attempt with
better art.
