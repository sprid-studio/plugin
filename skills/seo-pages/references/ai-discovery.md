# AI discovery and product recommendations

Use when improving discovery through assistants or AI search. Sources checked
2026-10-31; re-read the relevant provider documentation before changing access,
reporting or integration behavior. Provider guidance establishes eligibility and
supported behavior; writing recommendations below are hypotheses to evaluate.

## Choose the outcome

A cited page, a named product, a recommendation, a visit and a paying customer are
different observations. A useful reference page can be cited without its product
being recommended. Record which outcome the user needs and the task, market,
language and constraints a prospective customer brings.

Separate web discovery from selection of an installed app or tool. A working MCP
server or API alone does not establish that public assistants discover it.

## Diagnose before rewriting

Treat these as investigation routes, not causal conclusions from one answer.

| Observation | Check and prepare |
|---|---|
| Page cannot be fetched or indexed | Fix the verified access/canonical defect before rewriting copy. |
| A guide is cited but the product is absent | Check whether the question asks for information or a product. Inspect the product page's relevance before adding a recommendation request to every article. |
| Alternatives appear for a task the product supports | Compare the actual cited sources with verified product scope. Fill a concrete gap in use cases, prerequisites, price or proof on the appropriate URL. |
| An answer describes the product incorrectly | Locate the contradictory or stale source, correct owned pages and listings, and record external sources that need correction. Do not invent the model's reason. |
| Recommendations send visitors who do not activate | Verify referral coverage and the destination's promised task. Investigate the handoff with the landing-page skill. |

For each proposed change record: customer question, observed evidence, target URL,
verified claim and source, exact replacement copy or technical diff, intended next
action and what would disprove the hypothesis. When implementation is requested,
make the authorized local edits and run the site's relevant checks. If answers are
unavailable, deliver an evidence/access audit and label the recommendation gap
untested; do not fabricate a baseline. Keep all of this in the existing search plan.

## Verify access for the target engine

- **Google:** a supporting page must be indexed and eligible for snippets. Check
  canonical URLs, internal discovery, visible text and the live response. Read
  current Search Console inclusion controls as well as robots and snippet controls.
  Eligibility does not guarantee selection. [AI features](https://developers.google.com/search/docs/appearance/ai-features)
- **ChatGPT search:** check `OAI-SearchBot` and the provider's published IP ranges
  against robots and edge rules. `GPTBot` controls training separately;
  `ChatGPT-User` serves user-triggered requests and does not control search inclusion.
  Preserve the owner's training preference. [OpenAI crawlers](https://developers.openai.com/api/docs/bots)
- **Perplexity:** check `PerplexityBot` and published IP ranges; it serves search,
  separately from user-triggered `Perplexity-User` requests.
  [Perplexity crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)
- **Bing/Copilot:** inspect Bing indexing and available AI Performance data for the
  verified property. Its report covers supported Microsoft and partner surfaces,
  not every assistant. [Bing AI Performance](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/)

Use connected tools or existing CLI/API access first. A dashboard feature is not
proof that an API or connector exposes it. Mark unavailable evidence and use an
existing export when available. Request an interactive step only if necessary.

Fetch representative public URLs without JavaScript and inspect status, redirects,
content and response directives. A local request with a crawler user-agent tests
only that request: it does not verify access from the provider's IPs. Check real
verified crawler logs or provider inspection evidence when available. A robots
allow can still be defeated by an edge challenge. Keep private pages protected.

## Write useful product evidence

Build a fact sheet from the current public product and verified flows: intended
user/task, supported platforms and markets, price basis, prerequisites, meaningful
limitations and a demonstrable result. Resolve conflicts with the store listing,
checkout and documentation before adding more copy. A planned feature stays a plan.

Make the fit assessable in ordinary prose. Example structure for a fictional app:

> Use [product] to [task] when [specific situation]. It supports [verified scope].
> [Concrete demonstration] shows the result. [Price and billing basis] apply;
> [limitation] matters if you need [unsupported use].

Fill only verified fields; this is a writing aid, not wording that guarantees ranking.
Keep enough context beside a claim for a reader to interpret it on its own. Explain
the actual workflow and link to a working example. Put detailed constraints on an
appropriate product, use-case or comparison page rather than loading every detail
into the homepage. Comparative claims need current evidence for both products.

Choose questions from customers and relevant searches. Combine related questions
when one page answers them well. Add first-hand demonstrations, original data or
expert contributions with their sources and limitations. Headings and tables are
useful when they help readers compare; fixed paragraph lengths and FAQ templates
have no established universal advantage. Google's current guidance rejects special
AI wording, mandatory chunking and `llms.txt` as Google ranking tactics.
[Google optimization guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

Inspect third-party sources actually cited for relevant product-selection questions.
Propose a useful contribution, review or integration when there is a fit. Preserve
independence and disclose commercial relationships. Do not manufacture reviews,
forum mentions, facts or hidden instructions telling an assistant to recommend us.
Authentic references may help customers evaluate the product; a causal AI visibility
lift remains unproven until measured for this product and surface.

## Measure the outcome

Save the protocol and baseline in the existing search plan. A practical initial
diagnostic uses a fixed set of representative questions across discovery,
comparison and constraints. Include brand-free questions and negative-fit cases.
Keep brand-named diagnosis separate from unaided recommendations.

For every run record exact prompt, engine/product, model if exposed, search mode,
date, language/market, relevant personalization state, full answer and cited URLs.
Use fresh conversations without our product briefing; repeat on separate occasions.
Record failures and unavailable engines. Never simulate another assistant's answer
or treat a developer API response as its consumer product's answer.

Score citation, mention, recommendation and factual accuracy separately. Keep
denominators per engine and prompt class. Repeated answers are correlated; a small
sample is a diagnostic, not a population estimate or evidence of a small lift.
Retain comparison questions/pages, confirm retrieval after a change, and consider
model or search updates before attributing movement to rewritten copy.

Use provider evidence where accessible:

- Google's dedicated [Generative AI performance report](https://support.google.com/webmasters/answer/16984139)
  reports impressions for AI Overviews and AI Mode. It may be absent below its
  impressions threshold; its data overlaps the ordinary Search performance report.
  Do not add both totals or call impressions recommendations. Verify supported
  connector/API dimensions instead of assuming the report is exposed there.
- Bing's [AI Performance](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/)
  reports citations and sampled grounding queries. These are not conversions or
  the original user prompts, and citation counts do not establish answer position.
- Measure referral sessions and meaningful product outcomes where attribution
  survives. Separate self-reported discovery from observed referrals; neither sees
  every assisted purchase. Do not count crawler requests as customers or add
  overlapping attribution sources together.

Record the changed URLs, hypothesis, source dates and what would reverse the
decision. Expand a page pattern when it helps the agreed outcome, not merely when
more pages can be generated. A recommendation based on an unsupported feature is
a defect even if it sends traffic.

