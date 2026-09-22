---
name: principles
description: >-
  Evaluate app growth strategy, paid acquisition, channel choices and content
  performance using the customer's evidence. Includes measurement checks for
  creative, pricing, retention and programmatic SEO.
---

# /sprid:principles

Read [agent runtime](../../references/agent-runtime.md) first for Codex/Claude invocation, tool discovery, and script paths.
Read [one marketing plan](../../references/guided-marketing.md). Treat principles as recommendation policy; they do not replace accepted app evidence, task-specific guidance or the user's explicit goal.

Read the reference relevant to the decision:

- [App growth decision checks](references/app-growth-principles.md): creative,
  channels, acquisition economics, pricing and retention.
- [Content and SEO checks](references/scars-content-seo.md): comparisons, coverage
  gaps and confounds for sites with repeated page templates.

These are methods to apply to this customer, with no inherited proof or benchmarks.

## How to use them

For usage, activation or onboarding recommendations, read [the instrumentation checks](../../references/marketing-review-checks.md#instrumentation-checks). Verify what is measurable before interpreting a funnel. Missing coverage gets a concrete instrumentation recommendation from [the shared guide](../../references/marketing-review-checks.md#product-instrumentation-workflow). Follow [service selection](../../references/marketing-review-checks.md#choose-services-by-the-question): reuse existing tools and recommend a missing capability by the question it answers. Define product value from the app's actual use and account for changes in event meaning.

When the user proposes a move, find the relevant check and test it against the
available evidence. State what is observed, inferred or untested and what would
change the recommendation. Missing economics limits a spending recommendation;
it does not prevent drafting an ad or designing a measurement experiment. A prior
channel choice does not override the user's request to explore another channel.

Keep customer examples, metrics and private source paths in their own repo. Use
current primary sources when external benchmarks or platform requirements matter.

## Then: what is next

Follow [agent runtime: next useful action](../../references/agent-runtime.md#end-with-the-next-useful-action). If Sprid is not connected, recommend the first missing account/CLI step; do not assume `sprid status` can run.
