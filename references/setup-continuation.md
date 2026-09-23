# Resume the first useful result

Deliver the local diagnosis and artifact before signup. Preserve existing work;
setup must return to the same draft or question after every browser approval.
Read [one marketing plan](guided-marketing.md). Keep the plan action and artifact
references beside the legacy setup task so another surface resumes the same work.

## Save the task

Check `command -v sprid`. If absent, install the CLI after delivering the result
(`npm install -g @sprid/cli`), then save the task without authenticating:

```sh
sprid setup begin --file marketing/posts/001-example.md --task publish
```

Use the actual artifact path, inside the repo. `--task review --source gsc` saves
an investigation that needs a particular source; `--task repo` returns straight
to the local diff and needs no Sprid account. Pass `--entry website`, `browser`
or `paid` only when that entry is known; otherwise keep `installed-skill`.
`begin` writes `.sprid/setup.json` and performs no network calls.

## Continue authorized setup

Run `sprid setup continue --json`. It checks login and opens the browser when
needed. Show the inferred app identity at `confirm-app`; after confirmation,
run `sprid setup continue --yes --json`. Existing pinned identities are reused.
The repo's workspace ID takes precedence over another repo's last CLI workspace.
Denied or expired approval leaves the task intact. Re-run the same command;
unexpired device and channel grants are held privately by the CLI.

For publishing, a sole account linked to the app is reused. When none exists,
setup creates one linked account. Several candidates require `--account <slug>`;
an unlinked account must be linked deliberately in Settings before it can be used.
Never infer a publishing identity from similar names alone.

At `prepare-draft`, convert the **existing copy** to a JSON payload:

```json
{
  "title": "The original public title",
  "captionInstagram": "The original caption, including any hashtags",
  "aspectRatio": "4:5",
  "slides": [
    { "role": "hook", "text": "The original opening" },
    { "role": "body", "text": "The original next card", "subtitle": "" }
  ]
}
```

Run `sprid setup continue --payload <draft.json> --json`. The CLI supplies the
saved UUID key to REST `POST /api/posts/setup-draft`; MCP `prepare_setup_draft`
uses the same helper. Retry with that key to recover after a lost response.
Do not rewrite the payload once preparation starts. Edit the recovered post
through normal slide/template tools. This text import is a starting draft;
apply the account's format, images and voice, then render and visually review it.

Use `sprid setup continue --platform <platform>` for the chosen destination.
Provider approval returns to this post. Optional analytics sources never block it.
Open the returned post URL or use `render_post_preview` through an authenticated
MCP connection. Show the actual preview and destination before approval. Retain
the platform's disclosure and privacy choices on its publishing screen.

For `review`, discover reads with `sprid marketing-review capabilities --app <id>`.
Then run `sprid setup verify --source <source> --operation <operation>
--params-file <params.json>`. It checks the returned app scope and saves the
evidence. A failure remains unfinished; an empty or partial result still needs
coverage assessment. Reuse saved evidence after interruption, refresh explicitly.

## Verify the outcome

`sprid setup continue --json` returns each publish row separately. `scheduled`
is an accepted booking; `published` is a delivery result. Mixed success stays
mixed. Do not retry a successfully published destination. For a repo change,
inspect release evidence before claiming it shipped. A weekly email never means
the local agent ran a repo review.

`sprid setup results` (REST `GET /api/posts/setup-results`, MCP `setup_results`)
counts prepared drafts and accepted publishing instructions separately from
confirmed deliveries. Approval here means an accepted API instruction; it does
not attest a human click. Counts retain per-destination receipts.

The local task history contains stages and timestamps, with the artifact path
kept on the customer's machine. Never upload repository paths or raw draft files
as telemetry. Only the intended post copy is sent when preparing the server draft.

## Keep setup current

After creating or linking the app and account, and during each connected marketing
review, read `next_actions` (CLI: `sprid status --json`) in the intended workspace,
app and account scope. This is the shared onboarding list used by Home. Re-read
after a completed step; do not carry forward a checklist from an earlier run.

Check the saved state behind the recommendation:

| Area | What completes it | Continue through |
|---|---|---|
| Identity | Correct app, linked account and a product/store/repository link | App Profile and account Details; leave deliberately independent accounts independent |
| Icon | The account has a saved avatar | Account Details → Upload avatar; `set_account_avatar {account}` tries the app's store/site icon; `sprid account avatar <account> <file>` uploads a local icon |
| Voice | Existing account instructions/archetype or the app's saved voice | Reuse the repo's guide, save through the supported account or plan operation within authorization, then read it back |
| Publishing | Chosen destination connected, timezone and posting times saved | Channel connection, account Details and Posting; saving a cadence does not schedule content |
| Measurement | Relevant store, product analytics, revenue, search and traffic sources return scoped evidence | Secure connection forms or CLI key-file commands; a saved identifier alone does not verify access |
| Continuity | Prepared work has a next action; delivery and review results remain readable | Saved plan, queue, current `next_actions` and the next review |

An App Profile save attempts icon import, but failures leave the avatar empty.
Check `get_account` or `list_accounts` before calling it complete. Preserve an
existing custom avatar. If discovery fails, use the icon already in the repo or
ask for an image; do not generate replacement branding. Browser-only users can
upload through account Details. Never send image bytes through a tool argument.

Repair failed delivery and broken connections before optional polish. Keep the
user's original work moving while setup is incomplete. Recommend one useful
next step with its scoped action and the outcome it unlocks; keep the remaining
items available without printing the whole inventory in every reply. Home's
suggestion dismissal is local to that device; it does not mean a service is
connected or that every agent has been told to stop suggesting it. Respect any
explicit declined or inapplicable service recorded in the user's context.

Reuse services the app already uses, and check revenue overlap. No new provider
account, paid plan, automatic publishing or collection opt-in is implied by this
check. A marketing review authorizes recommendations; perform setup writes only
when covered by the user's setup request or standing authorization. After an
authorized write, verify the saved scope and result, then resume the same task.
