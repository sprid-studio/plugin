---
name: ads
description: Prepare paid-campaign strategy and creative, inspect tracking and read advertising results through available connected tools.
---

# Ads

Read [connection and approvals](../../references/runtime.md) first.

Read `get_documentation` topics `ads` and `tracking`. Start from purchases, subscriptions, qualified leads or meaningful product use and the actual customer destination. Reuse the accepted campaign brief and existing creative.

Check capabilities and provider readiness before promising campaign operations. The directory connection may support reporting only; prepare copy and the campaign brief and use the returned Sprid handoff for unavailable changes. Do not switch connections to reach hidden operations.

Verify the intended conversion event using dated source and destination evidence. A configured pixel, connected account or aggregate event count does not establish attribution eligibility or deduplication. Evidence records do not authorize spending.

Use suitable organic assets as candidates, while judging them against the campaign's business goal. Review the exact audience, destination, creative, bidding event, budget and required category declarations. Every new claim needs support; fictional people cannot provide invented personal testimony.

Agree the outcome ceiling, maximum test loss and review timing from the customer's economics and conversion delay. Product defaults need review before launch. Known tracking or destination failures justify action immediately; a small sample does not justify a fixed budget increase or automatic weekly creative replacement.

For running Sprid-managed Meta ad sets, use `ads_status` when available. Its scheduled reads are checkpoints, not proof that outcomes have matured. `ad_metrics` post-click readings require connected PostHog, Meta ad IDs in link tags and configured funnel events. Check coverage before interpreting the ranking from `ad_council`. For Google or externally managed campaigns, use available provider reports; reuse existing analytics, commerce or CRM records for outcomes. Do not require switching analytics providers. Keep a due Meta read with `record_ad_read` when offered, including uncertainty and the next review date in its note; otherwise hand it off.

Use a unique event ID for each distinct action and reuse it for that action's retries and browser/server copies. A first-activation event can be once per person when the product enforces that definition; repeat purchases remain separate events.

Starting spend or changing budgets requires the person's approval in Sprid. Report business revenue separately from platform-attributed revenue, and never add parent and child rows or attributed customers across networks. Preserve paused drafts and report uncertain operations before any retry.
