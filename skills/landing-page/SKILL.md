---
name: landing-page
description: Work out what the app's homepage or a landing page has to say, write it, and check afterwards whether it converts better. Investigates the page, its readers, the competitors and the evidence, then writes down a few testable decisions before drafting. Use when the user says "rewrite my homepage", "my landing page is weak", "nobody signs up", "the hero", "page copy", "message match for my ads", or a marketing review flags a page.
---

# /sprid:landing-page

Read [agent runtime](../../references/agent-runtime.md) first for Codex/Claude invocation, tool discovery, and script paths, and run its [version check](../../references/agent-runtime.md#versions-at-the-start-of-a-job) once per session before anything else.
Read [one marketing plan](../../references/guided-marketing.md). Start from the current page, the accepted promise and what the evidence says the page fails at. Change the page the plan points at, not every page.

Every app and audience is different, so this skill gives you questions and a way
to test the answers. Treat a page like code: read what is
there, form a hypothesis, change it, look at the result, ship it, measure it.
The few rules here hold for any page; everything else is a decision you make from
this app's evidence and write down so it can be checked.

## What this touches

Reads the page's source in the repo and the rendered page, `marketing/VOICE.md`,
`marketing/research/` and `marketing/HOOKS.md` when they exist, the store listing,
competitor pages, and, with Sprid connected, traffic and conversion for the page.
Writes the page change in the repo as a reviewable diff and a brief at
`marketing/pages/<slug>.md`. Deploys nothing; the user ships it.

## 1. Investigate

Answer these with evidence before writing a word. Note what each answer rests on and
mark guesses as guesses.

- **What does the page do today?** Render it at phone and desktop width. What does a
  visitor see before scrolling? What do the headings alone say? Where does it
  repeat itself?
- **Who arrives, from where, knowing what?** With Sprid connected, read visitors by
  source and the share who reach the next step (`get_insights`, then
  `query_marketing_source`; see
  [connected investigations](../../references/connected-queries.md)). A search
  visitor, a social visitor and an ad visitor arrive with different questions.
  Without data, ask which channel matters most and say the brief is unmeasured.
- **How do these people describe their problem?** Use research, reviews and support
  mail. If there is nothing, run `/sprid:research` for the gap only.
- **What are the alternatives saying?** Fetch the pages of three to five competitors
  or substitutes, including "doing nothing" and the spreadsheet people use today.
  For each: the promise in their hero, who they seem to write for, what proof they
  show, what they leave out. Look at what changed on them over time when an archive
  copy exists. Never describe a page you did not fetch.
- **What frame fits this reader?** Work through [finding the frame](../../references/copy-framing.md):
  what they already know, what they would use otherwise, what pushes and holds them
  back. Draft the hero in several frames before choosing one.
- **What can only this app say?** The data, the screen, the result or the way of
  working nobody else has. If the honest answer is "nothing yet", that is the
  finding; tell the user before polishing words.

## 2. Decide, in writing

Write the brief in `marketing/pages/<slug>.md` as a handful of decisions, each with
the evidence behind it and what would show it wrong:

- the reader this page is for, and the stage they are at;
- the end state they want, in their words;
- the one thing they must believe to act, and the objection most likely to stop them;
- the action the page asks for;
- how this page differs from the alternatives you fetched.

Show the brief to the user before drafting. Their correction here costs one line;
after the page is built it costs a rewrite.

## 3. Draft the heading spine, then test it

Write only the hero and the section headings and read them top to bottom. Most
visitors read nothing else, so the headings must carry the story on their own.

Test the spine against the brief and the competitors, not against a formula:

- Does the hero name the end state from the brief, or what the product is?
- Does each heading add an angle no other heading has?
- Does the order follow how this reader would actually use the app?
- Would a reader at another stage (a beginner, or someone already doing this at
  scale) feel the page is for them too, or shut out?
- Put each heading next to the competitor pages. Could it sit on theirs unchanged?
- If an ad or post links here, does the hero keep that ad's promise?

Take the user's feedback on the spine before writing body copy.

## 4. Body, proof and visuals

Ask of every line: does it help this reader decide? If not, cut it or move it behind
a link. Keep a reassurance line only if the brief's objection needs it.
Short body copy with details one click away usually beats long paragraphs. If the
brief says these readers want depth, say why in the brief.

Proof is real or absent; follow the [writing gate](../../references/writing-gate.md).

For visuals, ask what would show the product doing the thing the heading claims.
Usually that is the product's own screens or a simplified mock built from them, in
the product's own look. Check every visual at every breakpoint, and that big
headings break into balanced lines.

## 5. Gate, preview, ship

1. Run the [writing gate](../../references/writing-gate.md) on the whole page.
2. Render the changed page at phone and desktop width, light and dark. Fix overflow,
   clipped text and layouts that only work at one width.
3. Show the user the rendered page and the brief side by side.
4. Leave the change as a diff for the user to review and deploy.

With Sprid connected, record the change as a reviewable artifact with
`prepare_marketing_execution` (kind `offer_activation`, surface `landing`).

## 6. Measure, then learn

A page change is a hypothesis until the numbers come back.

1. **Baseline before shipping:** visitors and the share reaching the next step, over
   the last 28 days, by source, with dates.
2. **Log it when it ships:** `add_event` with `areas` (usually `product`, plus
   `search` when titles or headings changed) and a `why` that names the decision
   from the brief being tested.
3. **Set the read date** in the brief: when the page has had about as many visitors
   as the baseline period, and at least four weeks.
4. **Compare like with like.** A viral post or a new ad changes who arrives. Compare
   the same sources, and say when the sample is too small to tell.
5. **Write down what you learned** in the brief, whichever way it went. The next
   page starts from it.

## Report

The brief's decisions, the heading spine before and after, the rendered page, the
baseline with dates and the read date. List every `[NEED: proof]` and
`[NEED: differentiator]` the user has to answer.

## Then: what is next

Follow [agent runtime: next useful action](../../references/agent-runtime.md#end-with-the-next-useful-action). If the page should also rank in search, continue with `/sprid:seo-pages`. If the store listing makes a different promise, continue with `/sprid:store-metadata`.
