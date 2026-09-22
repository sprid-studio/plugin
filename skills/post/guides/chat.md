# Use Sprid in chat

**What this guide does:** Take an app from setup to a reviewed post and confirmed delivery using only your chat app and a browser. No CLI or installed skills needed.

You tell the agent what you want; it handles the tool calls below. The tool names are here so the agent knows the order. Setup should only ask for the connection the current task needs.

## Connect Sprid

Choose your chat at `https://sprid.studio/start#chat` and follow its steps. Your chat may call this an app, connector or integration. The address is `https://api.sprid.studio/api/mcp?surface=core`. Sign in to Sprid and authorize the right workspace.

Agent: when available, start with `get_marketing_plan` and reuse its prepared work and next step rather than starting over. Discovery can start from a website or store URL, with no social account.

## Pick the app and account

Agent: call `get_capabilities`, then `list_apps` and `list_accounts`, and reuse what exists. If the app is missing, get its description or website/store URL, confirm it and create it with `upsert_app_profile`. A content account owns voice and media; a channel is one exact social destination. Never pick a handle just because it is first in a list. A missing account is created in the dashboard.

## Connect a destination or data source

- **Social channel:** `get_documentation` with the platform name, then `connect_channel`. The person opens the returned link and approves in the browser; `channel_status` confirms the saved result.
- **Store or analytics:** the person enters identifiers and the key in the secure form at `https://app.sprid.studio/settings/app-profiles`. Credentials never go in chat, tool arguments or reports. A saved-key indicator only proves configuration; `get_marketing_review` does a live read.

## Bring images or a finished video

Draft copy in the chat, in the account’s voice. No extra model key needed.

If the chat exposes the attached files, pass them to `import_assets`: each file has `download_url` and `file_id`, optionally `mime_type` and `file_name`. Public HTTPS URLs and existing `{kind, id}` library references also work. Limits: PNG, JPEG, WebP or finished MP4, up to 32 MiB each. Each position reports on its own; retry the missing ones before building the post. Files are copied to the account and deduplicated by bytes; temporary download URLs are not kept.

A `sandbox:` URL or local path can’t be fetched. For an image the chat generated, use the existing file if the host exposes it (not verified for every host); otherwise download it and use the browser upload. Never ask the agent to recreate an image or transcribe binary data.

**Fallback: browser upload.** Call `create_upload_session` with the account and a new UUID `requestId`. The person opens the link and picks the files. Then read `get_studio_job` with the returned ID; its result keys are zero-based positions. The same session and asset IDs work from any other chat. No image-generation charge.

## Create and review the post

Call `create_post_from_assets` with a new UUID `requestId`, the account, ordered `{kind, id}` assets, captions and aspect ratio. Reuse the same ID and inputs if a response is lost.

- `presentation: "finished"` keeps artwork as-is: no text overlay, no added music. Images fit inside the canvas, which can add margins.
- `presentation: "editable"` allows `text` and `subtitle` on image slides.
- One finished video becomes one reel. Never mix a video with image slides.

Edit with `update_post` (captions) and `update_slide` or `batch_update_slides` (slides). Call `preview_post` and check every slide or the video: captions, order, crop, legibility. Preview links work even if the chat can’t embed them. A preview is not approval to publish.

## Make a reel from photos or text

Check `get_capabilities` for hosted creation first. `create_reel` takes ordered scenes (`imageId`, `text`, `durationMs`), up to 120 seconds, and makes a silent MP4. It costs 3 cents per started render minute, or uses the plan allowance: check `spend_status`, tell the person, and get their go-ahead before sending `confirmed: true`. Save the job ID and read `get_studio_job`. Retrying with the same ID never starts a second render; a stopped job reports `needs_attention` instead of charging again.

App captures, simulator recordings and your own build scripts run outside remote MCP. Upload their finished files.

## Approve and confirm delivery

The person opens the returned `/p/<postId>` link, reviews the real media and captions, and picks the channels, time and platform options. TikTok privacy and interaction choices have no defaults and are made on that screen. An agent-supplied confirmation flag is not a human click.

After approval, read `get_publication_status`. Keep draft, scheduled, failed and delivered apart, and report delivery only with the platform receipt. Read a failure before retrying. Never repeat a publish call just because a response was lost.

For results, read `get_documentation` for `marketing-review`. Keep the same app, account and post IDs across clients. `next_actions` gives the next step; an empty `verb` means follow its browser link.

## Limits and troubleshooting

- **Attachment can’t be read:** use the browser upload, not the CLI.
- **Missing account or service:** set it up in the dashboard. Never paste credentials into chat.
- **Hosted creation:** check `get_capabilities` before promising it. Store screenshots and store releases are local unless it reports otherwise.
- **File transfer:** whether a host exposes uploaded or generated files has to be checked per host. A supported schema doesn’t prove it.
