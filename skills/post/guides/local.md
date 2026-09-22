# Build locally and send to Sprid

**What this guide does:** Build content with your own tools, upload the finished files to Sprid, and keep editing, reviewing and measuring the same posts in chat or the dashboard.

Two command families: `sprid media` is local production and file transfer (`init`, `build`, `check`, `register`, `push`, `preview`, `upload`). `sprid post` works on shared posts on the server. If sign-in fails, the local result stays usable. Keep the same post and plan IDs when you move work into Sprid.

## Build

Use your app’s own renderer or design tools, or a built-in recipe:

```sh
sprid media init          # set up the stills or simulator-screen recipe
sprid media build <slug>
sprid media check <slug>
```

A TS/JS config runs local code, so only use one you trust. Native captures and binary builds need your app’s own environment. A local slug stays local; a shared preview is always `sprid post preview --id <postId>`.

## Upload

```sh
sprid login
sprid media upload slide-01.png slide-02.png --account my-account --json
```

Files go straight to storage and come back as ordered asset IDs. PNG, JPEG, WebP and MP4, up to 32 MiB each; larger videos go through `sprid media push`. The command prints a request ID first. To resume, rerun with the same files in the same order and `--request-id <UUID>`, or read the saved result with `sprid media job <UUID>`. Don’t reuse a request ID for a different selection.

## Create and review the post

Write `draft.json` with the returned IDs and a new UUID as `requestId` (keep it for retries):

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

For a finished reel, use one asset with `kind: "video"`. `finished` artwork gets no overlay or music; images fit inside the canvas, so check the preview for margins.

```sh
sprid post create --file draft.json --json
sprid post get 123 --json
sprid post update 123 --file changes.json --json   # e.g. {"captionInstagram":"Revised caption"}
sprid post preview --id 123 --json
sprid post deliveries 123 --json
```

The review link opens the same dashboard screen as from chat. To continue in chat, give it post ID `123` instead of creating another draft. Approval and platform choices stay with a person. Check delivery receipts before reporting success.

## Hosted options and results

- `sprid capabilities --json`: server limits and what stays local.
- `sprid media import --file sources.json`: the same account/files/urls/assets payload as MCP `import_assets`.
- `sprid media reel --file recipe.json`: the metered hosted reel. Payload and approval rules are in `sprid docs chat`. Poll with `sprid media job <UUID>`.
- `sprid marketing-review`: connected evidence. `sprid docs marketing-review` covers coverage and attribution.

Keys go in through CLI key-file commands or the secure Sprid forms, never a conversation.
