# Build locally and send to Sprid

**What this guide does:** Build content with your own tools, upload originals into Sprid, and continue editing, reviewing and measuring the same posts in chat or the dashboard.

Read [one marketing plan](../../../references/guided-marketing.md). Preserve the shared action and artifact identity when moving local output into Sprid; login failure must leave the local result usable.

## Name the work

`sprid media` owns local production and file transfer. `sprid post` owns shared server posts. Sprid MCP reaches the same connected operations from chat; optional Sprid skills teach the method. A plugin packages the skills and MCP configuration.

`sprid media` is the prefix for that local pipeline: `build`, `register`, `check`, `push` and `preview`. A numeric local slug stays local: shared preview is explicitly `sprid post preview --id <postId>`.

## Build and upload

Use your app's existing renderer or design tools. `sprid media init` configures built-in stills or simulator-screen recipes; `sprid media build <slug>` builds through that configuration. `sprid media check <slug>` checks the output. Trusted TS/JS configuration executes local code. Native captures and binary builds require the app's own environment.

Sign in with `sprid login`. For finished files, run:

```sh
sprid media upload slide-01.png slide-02.png --account my-account --json
```

The upload goes directly to storage. Sprid checks the original bytes and returns ordered asset IDs. PNG, JPEG, WebP and MP4 imports are bounded at 32 MiB per file; the existing local `push` video path handles larger files under its own limits. The command prints its request ID before uploading. Resume with the same files in the same order and `--request-id <UUID>`; read saved results with `sprid media job <UUID>`. Do not reuse a session for a different ordered selection.

Create `draft.json` with the returned IDs:

```json
{
  "account": "my-account",
  "requestId": "5e253644-d8a5-4b18-9cc9-d4d921874138",
  "title": "A concrete moment",
  "captionInstagram": "The caption, with hashtags at the end",
  "aspectRatio": "4:5",
  "presentation": "finished",
  "assets": [{ "kind": "image", "id": 101 }, { "kind": "image", "id": 102 }]
}
```

Replace the example request ID with a new UUID for each new draft, then keep it for retries. Use `kind: "video"` and one asset for a finished reel. Finished artwork gets no new overlay or music. Images fit inside the selected canvas; inspect any margins in the shared preview.

```sh
sprid post create --file draft.json --json
sprid post get 123 --json
sprid post update 123 --file changes.json --json
sprid post preview --id 123 --json
sprid post deliveries 123 --json
```

`changes.json` uses the existing post-update schema, for example `{"captionInstagram":"Revised caption"}`. Continue in chat by supplying post ID `123`; do not create another draft. The returned review link opens the same dashboard screen used from MCP. Human approval and platform choices remain explicit. Read delivery receipts before reporting success.

## Hosted options and results

`sprid capabilities --json` reports server limits and local-only tasks. `sprid media import --file sources.json` accepts the same account/files/urls/assets payload as MCP `import_assets`. `sprid media reel --file recipe.json` starts the explicit metered hosted recipe; the payload and approval requirements are in `sprid docs chat`. Poll with `sprid media job <UUID>`.

Use `sprid marketing-review` for connected evidence, and the optional marketing-review skill to interpret it alongside repo changes. Secrets are handled by CLI key-file commands or secure Sprid forms, never conversations. Read `sprid docs marketing-review` for coverage and attribution rules.
