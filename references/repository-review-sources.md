# Repository-specific review sources

Connected sensors cannot describe every app's meaningful actions. The agent in
the app repo can also read its reporting scripts, database or exports. Bootstrap
discovers those sources once; marketing review carries them forward.

## Discover before asking

Read repository instructions, the latest reports including corrections, schema
definitions and existing reporting scripts. Follow the emitting or writing code
to distinguish an analytics event from a durable action. Prefer an existing
maintained query over copying SQL into the profile. Import useful investigations
from an old review command as well as its provider/event mapping.

Then ask one optional question, adapted to what was found, for example:
“I found completed-task records and email results. Is there other app data you want
future reviews to use, or a product question these sources cannot answer?”
Ask for the source or question in plain language, never a secret or raw user data.
The user may not know the table name; inspect it yourself. If they already answered
in this session or the local profile, reuse that answer. A refusal applies to the
sources they declined, not to the rest of an authorized review.

## Save a local investigation index

Merge into `.sprid/app.json`, preserving identifiers, pause flags and existing
review settings. `review.additionalData` records `answered`, `declined` or `pending`
and a short note about the user's answer; no reply means `pending`. It is discovery
state, not permission to query. Do not repeatedly ask a declined question.

`review.investigations` is an array of agent-readable entries with stable `id`s:

```json
{
  "review": {
    "additionalData": {
      "status": "answered",
      "note": "Include completed tasks and lifecycle email results."
    },
    "investigations": [
      {
        "id": "first-task-completion",
        "question": "Do new accounts complete a task after creating one?",
        "enabled": true,
        "references": ["docs/analytics.md"],
        "read": "Use the repository's documented read-only database access and inspect the current schema.",
        "definition": "Join task creation and subsequent completion for the same eligible account; distinguish tutorial tasks from user-created tasks.",
        "caveats": "Exclude internal accounts. Record instrumentation boundaries and cohort maturity."
      }
    ]
  }
}
```

Use repo-relative paths for existing guides, scripts, SQL or exports. Record the
question, source/read path, population, exclusions and period semantics. If an
export is the only available route, say how to obtain it and label its freshness.
Keep unknown access or definitions explicit. Never invent a table or a command.
Set `enabled: false` with a reason when the user declines an investigation.

These are local instructions, not server App Profile fields or executable plugin
hooks. `sprid init` leaves `review` local; the review runner copies it into the
evidence packet. The agent reads the references and performs authorized analysis.
Do not send this block through `upsert_app_profile`. A local database connection
does not become an unattended Sprid sensor or part of the weekly email.

## Keep a surface inventory

Metrics only point at pages whose numbers moved. A page that never changes, and
never gets reviewed, can contradict the positioning for months. Keep the surfaces
where people understand the product and take the next step in `review.surfaces`:

```json
{
  "review": {
    "surfaces": [
      { "id": "home", "kind": "page", "locator": "https://example.com/", "everyDays": 30, "lastAuditedAt": "2026-10-01", "note": "Hero promise and the path to the store" },
      { "id": "product-page", "kind": "page", "locator": "https://example.com/products/example", "everyDays": 30, "lastAuditedAt": null, "note": "Template for every product page" },
      { "id": "checkout", "kind": "flow", "locator": "https://example.com/checkout", "everyDays": 60, "lastAuditedAt": null }
    ]
  }
}
```

Kinds include `page` (homepage, a page template, a guide or category hub),
`flow` (an app's onboarding or paywall, a shop's checkout, a booking or enquiry
form), `listing` (a store page, a marketplace or directory profile) and `message`
(a lifecycle email, a bio). `locator` is a URL or a repository path. Bootstrap
proposes the first inventory from the site's navigation, its entry pages and the
first-use or purchase path; the user can add or retire entries.

Save the inventory to Sprid with `update_review_surfaces` as well, so a hosted
review, the app and a review without the repository rotate through the same list:
`upsert` adds or edits entries, `audited` records a surface read in this run with
its date and a one-line finding, `remove` retires one. The review packet's
`context.dueSurfaces` lists what is due, most overdue first. Without a repository,
Sprid's list is the only one. A surface is due when `lastAuditedAt` is empty or older than
`everyDays`.

## Use the index in each review

- Honor the overall pause first and skip disabled entries. Preserve answered
  preferences when adding a source discovered later.
- Inspect each read path before running it. Use authorized read-only queries or
  exports; a reporting script may also contain write, send or paid-generation
  modes. Discovery does not authorize those modes or new access grants.
- Use both review periods where supported. Label a rolling-only script or
  incomplete export separately instead of presenting it as the same cohort.
- Cite supplemental results by query/output and population. Keep raw evidence
  local; record an index, not copies of commercial data or personal records, in
  maintained docs. Missing access becomes a named gap, never an observed zero.
- Reconcile with connected sensors: a completed task can exist without a client
  event. Identify mismatches before combining counts. Every enabled entry must
  end with evidence or a reason it could not be evaluated.
- Audit the one or two most overdue surfaces even when their numbers did not
  move. Read the live page or the flow's current code against the accepted
  positioning, voice rules and the offer it leads to. Findings join the ranked
  agenda like any other; an audit that finds nothing still records the date.
  Record the audit only for a surface actually read in this run, locally and with
  `update_review_surfaces` `audited`.

## Other investigation examples

A subscription app might compare lifecycle email delivery with subsequent product
use, using its own send ledger and attributed visits. A marketplace might compare
unfulfilled searches with available inventory. Record the app's actual read paths
and definitions locally; these examples prescribe no table names or metrics.

Shared skills and references use generic examples. Customer names, internal
schemas, queries and observed results belong in that customer's repository.
