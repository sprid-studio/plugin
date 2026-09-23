# The ads lane: what somebody is paying to show

`start_ad_harvest` reads Meta's public Ad Library - every ad currently running on
Facebook and Instagram in a given country. It is the other half of the research.
The organic side shows what people choose to watch. This shows what a company
decided was worth money, and kept deciding.

It needs no login, uses a throwaway browser rather than the signed-in research
profile, and is blocked by nothing but Chrome being installed. So it is the
cheapest research in this skill, and often the right first move in a niche where
the user does not yet know who the competitors are.

## The one signal, and the sentence you must not write

The library exposes **no spend, no impressions and no click-through rate**
outside EU political ads. What it gives you is the date an ad started.

**Days live is therefore the only performance signal available, and it means
"somebody keeps paying for this", not "this is efficient."** A 200-day ad is
evidence that a company with a budget has watched its own numbers and chosen not
to switch it off. That is real evidence and it is worth a great deal. It is still
not a measurement of the ad.

Never write "best-performing", "top-performing" or "winning" about anything
found here. Write what you actually know: how long it has run, how many variants
share the creative, and that it is still running.

## Writing the queries

Two kinds, and they answer different questions.

- **A keyword** (`"budget app"`, `"sleep tracker"`) discovers *who* advertises in
  a niche. It is noisy: it catches anyone whose copy happens to contain the
  words, in any language the country runs. Use it first, to build the list of
  advertisers.
- **A brand name** is the clean seam. Once you know the competitors, a run of
  brand queries gives you their whole current front, uncontaminated.

Run keywords first, read the advertisers, then run their names. Two passes beat
one long list, because the second pass is written from what the first found.

Country matters more than it looks: the library is searched per country, and the
same brand often runs entirely different creative in different markets. If the
user sells in several, harvest each one and compare - the differences are usually
the most informative thing in the whole run.

## Reading the result

The reply carries the longest-running forty, each with its advertiser, days live,
variant count, whether it is static or video, and the first part of its copy.
The full harvest is written to disk; say where.

What to look for, in order:

1. **The long runners.** Sort by days live and read the top of the list. These
   are the shapes a competitor has kept paying for, and they are the ones worth
   taking apart.
2. **Variant counts.** An ad whose creative is shared by twelve variants is a
   format a team built a system around, not a one-off.
3. **Static against video.** Whether a niche runs mostly stills is a fact about
   production cost as much as taste, and it tells the user what they would have
   to make to compete.
4. **What no one is doing.** A shape absent from a whole harvest is either a bad
   idea in this market or the opening. Say which you think it is, and why.

Every ad carries an archetype guessed from its copy where the copy makes it
obvious, and null otherwise. **Those are suggestions to check against the
creative, never facts.** Classification is a judgement call, and a wrong label
that goes unchecked into the library is worse than no label, because the next
read treats it as data.

## What comes down is still evidence, not material

The same rule as the rest of this skill. Competitor creatives are held for
analysis: the structure, the claim, the offer, the shape. They are never reused
as artwork and never handed back as something to publish. Describe what makes an
ad work and rebuild it in the user's own product, voice and images.

## Sending findings to Sprid

A harvest can be pushed into the user's inspiration library, where each ad lands
with its metrics and its source. That is what lets Sprid cluster competitor ads
into formats with evidence behind them, the same way it clusters carousels - and
the archetype standings that follow are only as honest as the labels, so correct
the guesses before distilling.

Pushing needs the user's own Sprid token and is theirs to run. Never send
anything anywhere without asking first.
