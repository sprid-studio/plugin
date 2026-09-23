# Write a store listing people can find

**What this guide does:** Explains what each field of an App Store and Google
Play listing is actually for, which characters are wasted, and what to change
first. Read it before editing a listing, and before accepting any keyword
suggestion.

A listing is two jobs in one form. Some fields decide whether you appear in a
search at all; others decide whether the person who found you taps Get. They
are not the same words, and writing all of them for one job is the most common
way a listing quietly costs downloads.

## The fields, and what each one does

**App Store name, 30 characters. Indexed.** Your brand, and - when the evidence
supports it - one term describing the category. It is the heaviest indexed
field, so a name of only a coined brand word spends the store's strongest signal
on a word nobody searches. Against that: an established name is an asset you
already own. Quote the current name and the alternatives side by side and decide
in the open, rather than letting a keyword tool pick.

**App Store subtitle, 30 characters. Indexed.** The benefit, the use case, or the
one thing that separates you from the app above you in the results. It is read
by a person mid-scroll and indexed by the store, which is why it is the hardest
30 characters in the listing.

**App Store keyword field, 100 characters. Indexed, invisible.** Comma-separated,
**no spaces after the commas** - a space costs a character and buys nothing. The
rules that reclaim the most room:

- **No word that already appears in your name or subtitle.** Those are indexed
  already, and repeating them is the single biggest waste of the 100.
- **No plural beside its own singular.** The store handles that.
- No category names the store already knows you by, and no competitor brands.
- Single words, not phrases: the store builds combinations across your terms, so
  `budget,tracker,expense` covers more searches than `budget tracker`.

**Google Play has no keyword field, and that changes the work.** Play indexes the
title (30), the short description (80) and the full description (4000). So on
Play the searchable words have to live inside sentences a human also reads -
naturally, a few times, not stuffed. The same app therefore needs two different
pieces of writing, and a listing that pastes the Apple keyword string into a Play
description reads like spam to both the algorithm and the reader.

**The first line of the description survives the fold** (around 170 characters on
iOS before "more"). Almost nobody opens the rest - but the store's reviewers do,
so every claim in it has to be true.

## What to change first

In order, because this is the order of what it costs to be wrong:

1. **The subtitle**, if it is a slogan. A slogan is indexed and converts nothing.
2. **The keyword field**, if it repeats the name, carries plurals or has spaces
   after commas. This is pure reclaimed space and needs no new idea.
3. **The first two lines of the description**, if they open with the company
   rather than with what the person came for.
4. **The name**, last and rarely. It is the one change that costs you the
   recognition you have already built, and it resets any word-of-mouth search.

## Locales are separate listings, not translations

Choose the locales your actual markets use, and write each one's keyword field
against that language's searches rather than translating the English terms. The
useful words are frequently not the translated ones: people search the phrase
they say out loud, and in some languages that is a compound noun with no English
shape at all. Keep what already works in a locale - an existing keyword that
earns installs is evidence, and replacing it with a tidier translation is how a
rewrite loses ground.

Do not assume one English locale covers every English-speaking country. Check
the store's current localization guidance before making any claim about which
locale is indexed where; it changes, and a confident wrong answer here costs a
whole market's discoverability.

## When the store will and will not accept a change

Keywords and the description are attached to a **version** on App Store Connect.
They push only when an editable version exists - one in "Prepare for Submission" -
and the name and subtitle additionally need an editable app information record.
So a listing change is not a live edit: it is a change that ships with your next
release, and a dry run that validates your text locally can still be refused by
the store minutes later for this reason alone.

Sprid's listing tooling prints the exact fields and values it would send before
it sends anything, and pushes only on an explicit execute. Read the diff. A
listing is one of the few things in marketing where a bad change is visible to
every future visitor and takes a release to undo.

## How to tell whether it worked

Impressions, not installs, are the field that moves when a listing's indexed
words get better; the conversion rate is what moves when the subtitle and first
screenshot get better. Separating those two is the whole reason to change one at
a time.

Give it a full release cycle plus two weeks before reading the result, and
compare against the same weekday span, not against the launch spike. If the app
also runs paid installs, exclude that traffic first or you will read the ad
budget as a listing improvement.
