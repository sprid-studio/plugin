# Google Play

**What Sprid does with this:** Read Google Play reviews and download reports, and update listing copy when you approve it.

## You need

**Owner** or **Admin** access in Play Console, plus a Google Cloud project where you can create a service account. The project does not need to be linked to Play Console.

## Click path

### A. Google Cloud

1. Open [Google Cloud](https://console.cloud.google.com) and select or create a project.
2. Open **APIs & Services → Library**. Find **Google Play Android Developer API** and click **Enable**.
3. For statistics reports, also enable **Google Play Developer Reporting API**.
4. Open **IAM & Admin → Service Accounts → Create service account**. Name it `sprid-play`, click **Create and continue**, then **Done**. Leave Cloud roles empty.
5. Open the account → **Keys → Add key → Create new key → JSON → Create**. Save the download as `play-sa.json`; keep it private.
6. Copy the service account’s email address.

### B. Play Console

7. Open [Play Console](https://play.google.com/console) → **Users and permissions → Invite new users**. Enter the service account’s email and leave access expiry unset.
8. Under **App permissions → Add app**, select your app and click **Apply**.
9. Enable **View app information (read-only)** and **Reply to reviews**. Add **Manage store presence** if you want to update listing copy. Leave financial access off.
10. Click **Invite user → Send invite**.

## Find the package name

Copy the package name beneath your app’s name on its Play Console **Dashboard**, such as `com.example.app`. Run `sprid init` if your Sprid app profile is missing it.

For download reports, copy the **Cloud Storage URI** from **Download reports → Statistics** into `playExportBucket` in `.sprid/app.json`. These reports also need the account-level **View app information and download bulk reports (read-only)** permission.

## Then run

```
sprid connect play --key ~/Downloads/play-sa.json
```

Use the path to your downloaded file. Do not paste its contents into chat.

## How to check it worked

Run `sprid status`, then ask your agent: “Check that Sprid can read this app’s Play reviews and download reports. Tell me what is missing.”

The review email only arrives when new reviews are available. Only recent reviews with written text can be imported initially.

## If it fails

- **Permission denied:** check the service account appears under **Users and permissions** with your app selected. New permissions may take time to apply; integrators report up to 24 hours, which Google’s docs do not confirm.
- **Google Play’s API is switched off:** enable **Google Play Android Developer API** in the Cloud project used to create the service account. Use the project link in Sprid’s error message.
- **Reviews are empty:** older reviews and star-only ratings may be visible in the store but unavailable to Sprid.

## Sources

- [Getting started](https://developers.google.com/android-publisher/getting_started)
- [Permission names in Users and permissions](https://support.google.com/googleplay/android-developer/answer/9844686)
- [Reviews API only returns recent reviews](https://developers.google.com/android-publisher/reply-to-reviews)
- [24-hour propagation](https://docs.apphud.com/docs/google-play-service-credentials)
- [24-hour propagation](https://documentation.qonversion.io/docs/service-account-key-android)

## Investigate with this connection

Your agent can use `list_marketing_queries` and `query_marketing_source` for `reviews`, `report_rows`. Discover the exact parameters and required setup with:

```sh
sprid marketing-review capabilities --app <slug> --source play --json
```

Pinned package. Live reviews have provider history limits; exported acquisition rows require the saved Play export bucket. See [connected queries](https://sprid.studio/docs/queries) for the shared workflow. Extra operations may need additional read permissions; a stored key alone is not live verification.
