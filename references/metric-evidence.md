# Metric evidence

Sprid’s review packet includes a versioned `dataset`: observations, checked results and hashes of the source receipts. The CLI saves complete review/query packets under `marketing-reports/evidence/` with immutable content-hash filenames and owner-only file permissions. The plugin runner preserves that dataset alongside its local evidence and git context. An explicit runner `--output` refuses to overwrite an existing file.

## Read a number

- `definition` names the entity, measurement kind, unit, calculation basis and implementation version. An active subscription is not a unique customer; a store download is not an activated person.
- `window` uses an exclusive end and retains its calendar. `asOf` belongs to a snapshot; `fetchedAt` records collection. Historical revenue and current MRR are separate observations.
- `quality` separates coverage, pagination, sampling, finality and trust. A successful HTTP request does not prove complete coverage. Unknown, pending, suppressed and unavailable values remain missing.
- `value.kind: money` stores an exact decimal coefficient and scale with a currency and conversion policy. Do not assume every provider amount is cents. Keep gross, refunded revenue and proceeds separate.

## Respond to a blocked calculation

| Reason | Continue with |
| --- | --- |
| `currency_mismatch` | Separate currency rows; convert only with explicit dated FX evidence and a declared policy. |
| `overlap_unresolved` | Source subtotals and the identity check. Do not add RevenueCat and a rail it already ingests. |
| `definition_mismatch` | Name the provider definitions separately, including MRR policy and revenue basis. |
| `window_mismatch` | Request matching periods/calendars. A daily Pacific aggregate cannot be relabeled UTC. |
| `population_mismatch` | Verify numerator/denominator attribution with an actual identity mapping. All-app revenue cannot stand for website-cohort revenue. |
| `incomplete_sources`, `incomplete_coverage` | Keep usable readings; complete pagination or narrow the period. Missing dates are not automatically zero. |
| `unverified_calculation` | Inspect emitting code and the query’s population, ordering and exclusions. Preserve a local attestation for local database work. |
| `non_additive` | Query period-level distinct people, select the relevant snapshot, or recompute a rate from compatible numerators and denominators. |

## Investigate through Sprid

Run `sprid marketing-review capabilities --app <slug>` to discover operations. The `revenuecat` / `revenue` operation reads an explicit period total, with `revenue_type` set to `revenue`, `revenue_net_of_taxes` or `proceeds`. Its scope is the bound RevenueCat project, which can contain multiple apps. Use `chart_options` before selecting chart dimensions. Cohort-chart period zero may describe customer count, not the month-zero metric.

Custom query results carry `measurement` provenance and retain provider-native data. They remain investigative; the server does not certify arbitrary SQL’s business meaning. The shared calculation library supports sequential/strict ordered funnels and fixed elapsed-time retention from complete event evidence. These helpers are not additional public query operation names. For provider-side investigations, use the discovered custom query operation and preserve the exact SQL.

Stripe MRR is a current active/past-due price estimate before discounts. Paddle’s adapter reports gross completed transactions before adjustments. Lemon Squeezy combines orders with renewal/update invoices and excludes duplicate initial invoices; a complete priced schedule is required for MRR. Separate source readings survive when combined totals cannot be justified.

Revenue observations and aggregate Search Console observations are normalized in the review dataset. Other source receipts retain native definitions and coverage; they are not silently converted into a universal business scorecard. App-specific activation, cross-source identity and attribution still require repository evidence. Local fallback results do not automatically inherit the server dataset’s verification.

Save the full packet and exact query beside the report. Hashes identify evidence but cannot recreate it. Link corrected reports to their earlier dataset and retain the earlier packet; provider backfills and refund revisions must remain inspectable. Sprid does not upload repository database rows or provide hosted dataset-history storage through this contract.
