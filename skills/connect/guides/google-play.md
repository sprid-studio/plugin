# Google Play

**What Sprid does with this:** Read Google Play reviews and download reports, and update listing copy when you approve it.

## You need

**Owner** or **Admin** access in Play Console, and a Google Cloud project where you can create a service account. The project does not need to be linked to Play Console.

## Click path

### A. Google Cloud

1. Open [Google Cloud](https://console.cloud.google.com) and select or create a project.
2. **APIs & Services → Library**: enable **Google Play Android Developer API**. For statistics reports, also enable **Google Play Developer Reporting API**.
3. **IAM & Admin → Service Accounts → Create service account**. Name it `sprid-play`, click **Create and continue**, then **Done**. Leave Cloud roles empty.
4. Open the account → **Keys → Add key → Create new key → JSON → Create**. Save it as `play-sa.json` and keep it private.
5. Copy the service account’s email.

### B. Play Console

6. Open [Play Console](https://play.google.com/console) → **Users and permissions → Invite new users**. Enter the service account’s email; leave access expiry unset.
7. **App permissions → Add app**: select your app, then **Apply**.
8. Enable **View app information (read-only)** and **Reply to reviews**. Add **Manage store presence** to update listing copy. Leave financial access off.
9. Click **Invite user → Send invite**.

## Find the package name

Copy it from beneath your app’s name on its Play Console **Dashboard**, such as `com.example.app`. Run `sprid init` if your Sprid app profile lacks it.

For download reports, copy the **Cloud Storage URI** from **Download reports → Statistics** into `playExportBucket` in `.sprid/app.json`. These also need the account-level **View app information and download bulk reports (read-only)** permission.

## Then run

```
sprid connect play --key ~/Downloads/play-sa.json
```

Use your own file path. Keep its contents out of chat.

## How to check it worked

Run `sprid status`, then ask your agent: “Check that Sprid can read this app’s Play reviews and download reports. Tell me what is missing.” The review email only arrives when there are new reviews.

## If it fails

- **Permission denied:** check the service account appears under **Users and permissions** with your app selected. New permissions can take time; integrators report up to 24 hours, which Google’s docs do not confirm.
- **Google Play’s API is switched off:** enable **Google Play Android Developer API** in the service account’s Cloud project. Sprid’s error message links to it.
- **Reviews are empty:** Google’s API only returns recent reviews with written text. Older reviews and star-only ratings stay visible in the store but not to Sprid.

## Investigate with this connection

Reads `reviews` and `report_rows` for the pinned package. Reviews are limited by Google’s history window; report rows need the saved export bucket.

```sh
sprid marketing-review capabilities --app <slug> --source play --json
```

See [connected queries](https://sprid.studio/docs/queries).

## Sources

- [Getting started](https://developers.google.com/android-publisher/getting_started)
- [Permission names in Users and permissions](https://support.google.com/googleplay/android-developer/answer/9844686)
- [Reviews API only returns recent reviews](https://developers.google.com/android-publisher/reply-to-reviews)
- [24-hour propagation](https://docs.apphud.com/docs/google-play-service-credentials)
- [24-hour propagation](https://documentation.qonversion.io/docs/service-account-key-android)
