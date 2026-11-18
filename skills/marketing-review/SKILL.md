---
name: marketing-review
description: Review marketing and business outcomes for an app, shop or service using connected evidence and produce a prioritized action plan.
---

# Marketing Review

Read [connection and approvals](../../references/runtime.md) first.

Read `get_documentation` for `marketing-review`, `queries` and `metrics`; fetch `traffic` when investigating a visitor spike. Read the current marketing plan and reuse unresolved work.

Identify the business model and decision first. Verify app, property, reporting window and timezone. Compare like periods and denominators; separate acquisition, activation, retention and revenue when evidence supports each. Distinguish first purchases, renewals and refunds. Traffic providers are alternatives, never additive.

For paid campaigns, identify each network and the reports available on this connection. `ads_status` covers running Sprid-managed Meta ad sets; `ad_metrics` post-click numbers require connected PostHog, Meta ad IDs in link tags and configured funnel events. Other networks and externally managed campaigns need their own reports. Reuse the customer's available analytics, commerce or CRM evidence and name missing coverage. A due read is a checkpoint: allow for conversion delay, preserve inconclusive results, and change creative or budgets only when the evidence and agreed loss limit justify it.

Use source reads behind a surprising aggregate. Check internal/test traffic, bots, changed coverage and small samples before reporting a trend. Missing or failed sources stay unknown. Cross-network attributed purchases are not unique customers; parent and child ad rows are not additive.

Trace the recommendation through the customer path to an observable business outcome. Read relevant product changes before assigning causality. Report the verdict first, cited evidence and a short ordered plan with owner and completion evidence. Record approved changes through the available event tool so later reviews can explain them.
