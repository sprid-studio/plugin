# Resume the first useful result

Deliver the local diagnosis and artifact before signup. Preserve existing work;
setup must return to the same draft or question after every browser approval.
Read [one marketing plan](guided-marketing.md). Keep the plan action and artifact
references beside the legacy setup task so another surface resumes the same work.

## Save the task

Check `command -v sprid`. If absent, install the CLI after delivering the result
(`npm install -g sprid`), then save the task without authenticating:

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
