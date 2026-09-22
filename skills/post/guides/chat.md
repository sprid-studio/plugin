# Use Sprid in chat

**What this guide does:** Take an app from setup to a reviewed post and confirmed delivery using Sprid MCP and your browser. No CLI or installed skills are required for this flow.

Read [one marketing plan](../../../references/guided-marketing.md). Begin with `get_marketing_plan` when available and reuse its prepared artifact, accepted guidance and exact continuation. A browser user can start discovery from a website or store URL without creating a social account.

## Connect Sprid via MCP

Choose your chat at `https://sprid.studio/start#chat` and follow its connection steps, then tell your connected agent what you want to make. You do not need to learn the tool names below. They tell the agent how to continue: check capabilities, retrieve the relevant guide, follow the returned next action and ask you for missing inputs or approval. Setup should introduce only the connection or tool your current task needs.

Add `https://api.sprid.studio/api/mcp?surface=core` in your chat application's remote MCP connection settings. Sign in to Sprid and authorize the intended workspace. A host may call this an app, connector or integration. **Sprid MCP** is the remote service behind it. Sprid skills supply optional workflow instructions; the plugin bundles those skills and the MCP configuration. Sprid CLI adds terminal access and local production.

Call `get_capabilities`, then `list_apps` and `list_accounts`. Reuse existing records. If your app is missing, describe it or supply its website/store URL, confirm its identity and create its App Profile using `upsert_app_profile`. A content account owns its voice and media; a channel is the exact social destination. Use the dashboard's account setup if one is missing. Never choose a handle just because it is first in a list.

## Connect the destination

Read `get_documentation` with the platform name. Use `connect_channel` and open its returned OAuth link in the browser. The person completes consent; `channel_status` checks the saved result. The CLI is optional.

For analytics or store credentials, open the secure App Profile form at `https://app.sprid.studio/settings/app-profiles`. Select the app and service, enter its identifiers and choose the key file or paste the key into that form. Never put credentials in chat, tool arguments or generated reports. `get_marketing_review` performs a live read; a saved-key indicator establishes configuration only.

## Use images or a finished video

Draft the copy in your current chat, using the content account's voice and the intended platform. Ordinary drafting does not require an additional Sprid model key.

If your host exposes the selected files, use `import_assets` with its file references. Each file has `download_url`, `file_id`, and optionally `mime_type` and `file_name`. Public HTTPS URLs and existing `{kind, id}` library references are also accepted. The limit is 32 MiB per imported file. PNG, JPEG, WebP and finished MP4 are supported. The result reports each position independently; retry missing files before assembling the full post. Files are copied to the selected account and deduplicated by bytes. Temporary download URLs are not retained as provenance.

For an image generated in ChatGPT, use the existing result when the host exposes a transferable file. Direct transfer of every generated-image type is unverified. If the host cannot transfer an image, download it and use the browser upload fallback. Do not ask the agent to recreate the image or transcribe binary data. A `sandbox:` URL or a local path cannot be fetched by remote MCP.

Fallback: call `create_upload_session` with the content account and a new UUID `requestId`. Open its authenticated browser link, select the files, then return to chat. Read `get_studio_job` with the returned ID. Its result keys are zero-based positions. The same session and asset IDs work in another chat client. Existing files incur no image-generation charge.

## Create and review the post

Use `create_post_from_assets` with a new UUID `requestId`, account, ordered `{kind, id}` assets, captions and aspect ratio. Keep the ID and inputs when retrying a lost response. `presentation: "finished"` preserves artwork without text overlays or added music; images fit inside the chosen output canvas, which can add margins. `presentation: "editable"` allows `text` and `subtitle` on image slides. One finished video becomes one reel. Never mix a finished video with image slides in this operation.

Read the draft with `get_post`; edit captions using `update_post` and slide content using `update_slide` or `batch_update_slides`. Call `preview_post`. Inspect every returned slide or the video, and check captions, order, crop and legibility. Links work even when your host cannot show an embedded preview. A preview is not publication approval.

For photos or text that need to become a reel, inspect `get_capabilities` for hosted creation. `create_reel` accepts ordered scenes with `imageId`, `text` and `durationMs`, up to 120 seconds. It creates a silent finished MP4. Check `spend_status`, explain the render charge (3 cents per started render minute or the plan allowance), and obtain authorization before `confirmed: true`. Save its job ID and read `get_studio_job`; a retry with the same ID never starts a second render. A stopped job reports `needs_attention` rather than silently charging another attempt. Custom app capture and arbitrary local builds remain external inputs; upload their finished files.

## Approve delivery and read the receipt

Open the returned `/p/<postId>` review link. The person reviews the actual media and captions, chooses exact channels and time, and completes platform-specific choices. TikTok privacy and interaction choices have no defaults. The existing posting screen owns those requirements. An agent-supplied confirmation flag is not evidence of a human click.

After approval, read `get_publication_status`. Keep draft, scheduled, failed and delivered states separate. Report delivery only with its platform receipt. Read a failure before retrying; never repeat a publishing call merely because a response was lost.

For results, read the `marketing-review` guide through `get_documentation`. Return to the same app/account and post IDs across clients. Call `next_actions` for the next relevant need; an empty `verb` means follow its browser link.

## Limits and troubleshooting

- An inaccessible attachment needs the browser upload page, not a CLI installation.
- A missing account or service needs secure dashboard setup. Never paste credentials into MCP.
- Check current capabilities before promising hosted creation. App binaries, native simulator captures and arbitrary repository scripts still run outside remote MCP.
- Store screenshot composition and store release commands remain explicit local capabilities unless `get_capabilities` reports a hosted implementation.
- Uploaded-file and generated-file transfer require separate host integration checks. A supported schema alone does not prove a particular host exposes either file.
