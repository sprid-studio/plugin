# The first seconds of a reel

**What this guide does:** Explains why a vertical video is watched or skipped in
its opening seconds, and gives the timing arithmetic to build one that gets past
it. Read it before writing a hook, choosing a length, or diagnosing a reel that
got no views.

Both platforms decide a video's reach from a small first batch of viewers and
from what each of them does in the first seconds. Nothing after second three
matters to someone who left at second two. Everything below follows from that.

Each claim carries how we know it: **measured** (we ran it and wrote the number
down), **reproduced** (we made the mistake and watched it happen), **published**
(the platform or a cited source says so, we have not tested it).

## Frame 0 is the cover, so it must already be readable

**Reproduced, twice, on two different accounts.** The feed shows the video's
first frame as its poster image. A hook that fades in from black has a black
cover. A hook that animates up from 0.42 opacity reads as washed-out grey for
the first half second - which is inside the window that decides whether anyone
stays.

Place the first card. Do not animate it in. Light it at 0.7 opacity or more, and
make it true at t=0.

## The opener has to end before second three

**Reproduced.** A hook card held for 3.3 seconds puts the first cut at 3.1
seconds, so the entire skip window contains one motionless card. Nothing has
happened yet when the viewer decides.

Size the opener to its own reading load with a floor of 1.6 seconds, and check
that the first cut lands under three. A cut inside the window is the cheapest
signal you have that this video is going somewhere.

## Length: one measured result, and its confound

**Measured, on one of our own accounts, 2026-08-29.** A batch cut to 15.5
seconds drew 113-162 views on an account with a single follower. The 29-32
second cuts that followed on the same account drew 6-22, and one sat at 6 views
after 29 hours - a distribution collapse rather than a slow start.

State the confound honestly: three things changed in that batch at once
(background, word density, length). Length is the reversible one, not the proven
one. That account now runs a 10-13 second test. **Neither band is a benchmark**,
and anyone quoting 15.5 seconds as an optimum - including us - is over-reading a
single comparison.

## The timing arithmetic

Reading load, not taste. These are the holds that stop a card from reading faster
than it is shown.

| | hold | why |
|---|---|---|
| any word | 300 ms | silent reading speed on a phone |
| any character | 52 ms | a compound noun is one word and twenty letters, so take `max(words, chars)` |
| opener | 1.6-2.8 s | reading load + 0.5 s, and the first cut must land under 3 s |
| body or turn | 2.4-4.2 s | reading load + 0.7 s |
| a big number | 2.6-3.8 s | the number reads at a glance, its label does not |
| closer | 3.6-5.0 s | reading load + 1.3 s; this is the card people screenshot |
| overlap | 200 ms | each card starts before the previous one leaves |

Word budgets per card, never totalled: hook 3-11, body 3-14, closer 4-16. A
3.5-second card holds roughly 10 words or 55 characters at a comfortable size.
Past that the card reads faster than it holds, and the viewer waits - which is
the same experience as being bored.

## What a hook is, and is not

- A sentence your buyer has actually thought, or the sharpest fact stated flat.
  A scene or a number. It opens a loop the closer shuts.
- **Not a "how to".** That creates an expectation of information, and information
  can be postponed. Not a question. Not "did you know".
- **Recognition stops a scroll; tempo does not.** A harvested ten-word hook beat
  an invented four-word one on our own account (**reproduced**). Hooks come from
  what people actually said - forum threads, reviews, support mail - not from the
  bank of phrases that sound like hooks.
- **The second card is a second hook.** It has to work cold, with the first card
  gone. On carousels the platform literally re-serves from the second slide; on
  video, the first cut is the same second chance.
- The closer is flat and screenshottable, and it lets the product do the work
  rather than issuing an install instruction.

## The kill rule

**Published**, from platform averages rather than our own numbers: under 25% of
viewers still watching past three seconds, keep the body and replace the hook.
Around 30% is healthy and 40% is exceptional on TikTok.

Two guards on that rule. Never judge a format before ten posts, and never judge
a new account before 90 days - distribution is a power law, and a handful of
posts carry most of the reach. Reading the first three posts of a new account
is reading noise.

## Where that number actually lives

This matters more than it sounds, because the metric the kill rule needs is the
one hardest to get:

- Views, likes, comments, shares, saves and reach come back through the
  platforms' public APIs, and Sprid stores them per post.
- **Three-second hook rate and the retention curve exist only inside the native
  Instagram and TikTok insights screens.** There is no API field for them as an
  organic number. If you need them, you open the app.
- Average watch time is available through both business APIs, which makes
  `average watch ÷ duration` the honest proxy you can automate.
- Taps through to your site or store are the number that pays. The rest are
  directional.

## One picture, many languages

The reason a demo video is usually made once is that the work is a person
holding a phone. Split it instead: the wordless part (the footage, the gesture
script, the photographs) and the worded part (the captions and cards, bound to
marks in the footage rather than to timestamps).

The rule that makes it hold: **no word is ever inside a picture.** A wordless
cutaway serves every language you have a string table for, so a seventh language
costs its translation and one render rather than a second shoot.
