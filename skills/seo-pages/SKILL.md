---
name: seo-pages
description: Improve discovery through search and AI product recommendations. Investigate demand and crawl access, write useful product and search pages, and measure citations separately from recommendations and customers. Use for SEO, GEO/AEO, AI visibility, search pages, Search Console, or getting a product recommended by assistants.
---

# /sprid:seo-pages

Read [agent runtime](../../references/agent-runtime.md) first for Codex/Claude invocation, tool discovery, and script paths, and run its [version check](../../references/agent-runtime.md#versions-at-the-start-of-a-job) once per session before anything else.
Read [one marketing plan](../../references/guided-marketing.md). Search is one route among several; take it when the evidence says it can reach this app's readers. Load [standing rules and corrections](../../references/standing-rules.md) before drafting, and write accepted corrections back.

Assess search demand, competition and what the product can contribute before
recommending a page library. Use the customer's existing results to choose the
scale of the work. For an untested page type, agree a representative test and
the evidence needed to expand it.

For AI visibility or product recommendations, read [AI discovery](references/ai-discovery.md).
Start with the target customer question, inspect real answers when available,
and diagnose access, missing product evidence or an inaccurate recommendation.
Then prepare the relevant page changes using that reference. Use the investigation
below for supporting demand and technical evidence; do not force an AI task through
a page-library proposal. Improve existing URLs when they answer the gap.

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
  serve are not progress. Read the review packet's `bing` source too when it is connected:
  Bing's index also feeds Copilot's answers.
- **Where do AI answers find products?** Use the [AI discovery protocol](references/ai-discovery.md#measure-the-outcome).
  Separate citations, product mentions and recommendations. Inspect the actual
  cited pages before proposing a contribution or partnership; a citation alone
  establishes neither customer demand nor an easy distribution opportunity.
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

## 2. Plan the page changes

Choose a batch large enough to test the relevant page types and markets. Preserve
an explicitly requested scope and explain any evidence that argues for changing it.
For each page, write down:

- the query and the searcher's intent (what they want to do next);
- why this page can win against the current top results;
- the page type that matches that intent, chosen from what ranks today;
- the next step a reader takes into the app, and how you will count it;
- what result after the read date would make you write more like it.

A guide, comparison or opinion page needs something the top results lack. Get
one anchor from the person behind the product first ([founder
material](../../references/founder-material.md)); without one, pick another topic
or say the page will likely not stand out. A page built from the app's own data
has its anchor in that data.

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
and after every structural change. Check for:
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
3. **Confirm retrieval first.** Check crawl/index evidence after shipping, then
   choose a read date with enough comparable observations to assess the change.
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
6. **AI answers.** Repeat the saved [AI discovery protocol](references/ai-discovery.md#measure-the-outcome).
   Use available engine reports alongside answer samples and attributable product
   outcomes. Small prompt samples describe those runs, not market visibility.

Write the decisions and what you learned into `marketing/search/PLAN.md`. The next
marketing review reads the results against it.

## Report

For a search-page project: go / not yet / no with evidence, the proposed pages,
each query and reason to win, technical checks, baseline and evaluation criteria.

For AI discovery: target questions and engines, observed answer/access defects,
verified product facts, exact page diffs and the saved comparison protocol. Mark
answers or provider reports that were unavailable. A writing proposal is not a
measured visibility gain; do not report success before observing it.

## Then: what is next

Follow [agent runtime: next useful action](../../references/agent-runtime.md#end-with-the-next-useful-action). If readers land but do not move on, continue with `/sprid:landing-page` for the destination page.
