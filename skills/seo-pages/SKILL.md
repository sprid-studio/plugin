---
name: seo-pages
description: Find out whether search can bring this app users, then write, ship and measure pages meant to rank in Google and be cited in AI answers, starting with a small test batch and growing only what earns clicks. Covers guides, definitions, comparison pages, tools and pages built from the app's own data, plus the technical checks that silently stop pages from ranking. Use when the user says "SEO", "rank on Google", "search pages", "blog posts for traffic", "programmatic pages", "Search Console", "why don't we get clicks", or a marketing review points at search.
---

# /sprid:seo-pages

Read [agent runtime](../../references/agent-runtime.md) first for Codex/Claude invocation, tool discovery, and script paths, and run its [version check](../../references/agent-runtime.md#versions-at-the-start-of-a-job) once per session before anything else.
Read [one marketing plan](../../references/guided-marketing.md). Search is one route among several; take it when the evidence says it can reach this app's readers.

Search can compound for years, or it can absorb months and return nothing. Both
happened on apps we run. A site generated from one app's own database grew from
about 400 to 3,300 clicks a month. A library of a few dozen guides went from 10
clicks a quarter to 220 a month, then levelled off. More than 2,000 carefully
sourced pages for a third app earned 2 clicks in 90 days. Careful sourcing did not
separate them. What did was whether people searched for what the pages answered,
whether someone else already owned those results, and whether the pages held
something nobody else had.
That is why this skill starts with an investigation and a small test, and grows
only what the numbers support.

## What this touches

Reads the site's source and rendered pages, Search Console through Sprid when
connected, `marketing/research/` and `marketing/VOICE.md` when they exist, and live
search results for candidate queries. Writes pages in the repo as reviewable diffs
and a plan at `marketing/search/PLAN.md`. Deploys nothing; the user ships.

## 1. Investigate: is search a channel for this app?

Answer with evidence, and mark guesses as guesses.

- **Where does the site stand?** With Sprid connected, read Search Console
  (`query_marketing_source` with source `gsc`, operation `search`; see
  [connected investigations](../../references/connected-queries.md)): queries with
  impressions, pages at positions 5 to 30, pages with impressions and no clicks,
  and which countries they come from. Impressions in a market the app does not
  serve are not progress.
- **What do the readers search?** From research, reviews and support: the questions
  people ask before they would need this app, in their words and their languages.
  Search autocomplete shows the phrasing. Count real queries, do not assume them.
- **Who owns the results today?** For each candidate query, fetch the top results.
  Who ranks: dictionaries, big brands, forums, the search engine's own answer box?
  What format wins: a guide, a tool, a definition, a list? A query the search engine
  answers on its own page sends few clicks to anyone.
- **What can only this app add?** Its own data, a working tool or calculator,
  first-hand experience, a specific local or niche angle. A page that restates what
  the top results say has no reason to outrank them.
- **What is search worth here?** Is it how these readers find tools like this one?
  How long can the user wait for it? Compare the effort with the other routes in
  the plan.

Write the answer in `marketing/search/PLAN.md` as go, not yet, or no, with the
evidence. A "no" is a useful result; say it plainly.

## 2. Plan a small first batch

Pick five to ten pages, never a whole library. For each, write down:

- the query and the searcher's intent (what they want to do next);
- why this page can win against the current top results;
- the page type that matches that intent, chosen from what ranks today;
- the next step a reader takes into the app, and how you will count it;
- what result after the read date would make you write more like it.

Prefer queries that already show impressions in Search Console, and queries where
this app has something nobody else has. If the app holds data that could fill one
page per item (a place, a product, a term, a city), a sample of those pages can be
part of the first batch: build a few dozen, with a written rule for when an item
has enough content to deserve a page, and read them like any other test. Start in
the market the app sells in; more languages come after the first one ranks.
Show the plan to the user before writing.

## 3. Write each page

Ask these questions as you write. The answers differ by app and market; record
the ones that were decisions.

- **What is the searcher trying to do, and how fast can the page help?** Put the
  answer, number or definition near the top; the context follows.
- **Does the title use the words people type?** Check against real queries, not
  the brand's vocabulary.
- **What will the result snippet say?** Write the description as a sentence built
  from the page's own facts, so the search engine does not cut a paragraph in half.
- **Is every fact sourced from a page you actually read?** Never write a fact,
  statistic, law, price or date from model memory; it is wrong often enough to
  cost the page its trust. Keep the source and the date you read it with the page,
  and plan when it gets checked again. The author marking their own page "checked"
  is not a check.
- **Is it written in the reader's language, for their market?** Write each
  language from that market's own sources and phrasing. A translated page reads
  translated.
- **What is the one next step?** Link it where the reader would want it, and
  measure whether they take it. Ranking without readers moving on is half a result.
- Run the [writing gate](../../references/writing-gate.md). For the frame of a page
  that has to sell as well as answer, see [finding the frame](../../references/copy-framing.md).

Before scaling any page type past the test batch, read
[content and SEO checks](../principles/references/scars-content-seo.md).

## 4. Check what would silently stop it ranking

Run the [technical checks](references/technical-checks.md) on every new page type
and after every structural change. Most of the search failures we have seen were here:
redirects that never fired, canonicals pointing at redirects, sitemaps listing
pages marked not to be indexed, links to pages that do not exist. Each one looked
fine in the code.

## 5. Ship, measure, decide

1. **Baseline:** for each target page and query, the impressions, clicks and
   position over the last 28 days. Search Console runs about two days behind and
   dates are Pacific time, so leave the latest days out.
2. **Log the change:** `add_event` with `areas: ["search"]` and a `why` naming the
   query and the hypothesis. With Sprid connected, prepare each page as a reviewable
   change with `prepare_marketing_execution` (kind `search`).
3. **Read after four to eight weeks.** New pages are crawled slowly; check that a
   sample is indexed before reading rankings.
4. **Compare a fixed set of pages.** New pages enter low and drag every average
   down, so compare the same pages across periods, and positions within bands.
5. **Decide per page:**
   - earning clicks: write more pages of that kind;
   - on the first page with no clicks: rewrite the title and description for that
     query's intent, then read again;
   - two pages for the same intent: merge them into the stronger one with a
     permanent redirect;
   - a query owned by a dictionary or a giant: stop investing in it;
   - nothing after a fair window: say so, and move the effort.
6. **AI answers.** Ask a few assistants the questions your pages answer, three to
   five times each, and record how often the app is mentioned or recommended (for
   example "2 of 5"). Add "an AI assistant" to the app's "how did you hear about
   us" question, so it can be counted.

Write the decisions and what you learned into `marketing/search/PLAN.md`. The next
marketing review reads the results against it.

## Report

Go / not yet / no with the evidence, the first batch with each page's query and
reason to win, the technical check results, the baseline with dates and the read
date.

## Then: what is next

Follow [agent runtime: next useful action](../../references/agent-runtime.md#end-with-the-next-useful-action). If readers land but do not move on, continue with `/sprid:landing-page` for the destination page.
