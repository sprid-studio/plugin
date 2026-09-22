# YouTube

**What Sprid does with this:** Upload approved videos to your YouTube channel and read their results.

## You need

A Google account with a YouTube channel. To create one: [YouTube](https://youtube.com) → profile picture → **Create a channel**. For extra channels (another brand, creator or audience) and owner verification, see [Create your social accounts](https://sprid.studio/docs/connect/social-accounts).

## Then run

```
sprid connect youtube --account <slug>
```

Replace `<slug>` with your Sprid account slug.

## Click path (the connect)

1. Sign in with your Google account.
2. Choose the channel to upload to, including a Brand Account channel if you use one.
3. Review the requested access and click **Continue**.

## How to check it worked

Run `sprid status` and check the channel name. Upload a reviewed reel as private, then check **YouTube Studio → Content**.

## If it fails

- **Google blocks sign-in or says Sprid is unverified:** send the message to [Sprid support](mailto:hello@sprid.studio).
- **Upload is private although you chose Public:** check visibility in **YouTube Studio → Content**. If YouTube will not let you change it, contact Sprid support.
- **Upload limit reached:** wait, and check the post’s status in Sprid before submitting again.
- **Creating a channel asks for verification:** the primary owner follows YouTube Studio’s instructions (video, ID or channel history). Review can stay pending; reauthorizing Sprid cannot create the channel. Continue other platforms and recheck eligibility later.

## Investigate with this connection

Operations `posts` and `comments`, read from Sprid’s stored publishes, metric snapshots and inbox (no live platform read; missing metrics are unmeasured, not zero).

```sh
sprid marketing-review capabilities --app <slug> --source youtube --json
```

See [connected queries](https://sprid.studio/docs/queries).

## Sources

- [Feature eligibility and owner verification](https://support.google.com/youtube/answer/9891124?hl=en)
- [Getting started](https://developers.google.com/youtube/v3/getting-started)
- [`videos.insert` reference](https://developers.google.com/youtube/v3/docs/videos/insert)
- [Quota and compliance audits](https://developers.google.com/youtube/v3/guides/quota_and_compliance_audits)
- [Revision history](https://developers.google.com/youtube/v3/revision_history)
