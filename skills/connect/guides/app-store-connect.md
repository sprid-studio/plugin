# App Store Connect

**What Sprid does with this:** Read App Store reviews and download reports, and update listing copy when you approve it.

## You need

**Account Holder** or **Admin** access to your Apple Developer team. You will create a **Team API key** with **Admin** access; it covers every app on the account.

If you only want to read reviews and edit metadata, **App Manager** access is sufficient. Use Admin for review replies and analytics reports.

## Click path (appstoreconnect.apple.com, checked 2026-09-08)

1. Open [App Store Connect](https://appstoreconnect.apple.com) → **Users and Access → Integrations → App Store Connect API → Team Keys**.
2. Click **Generate API Key**, or **+** beside **Active**.
3. Name the key `Sprid`, choose **Admin** access, then click **Generate**.
4. Click **Download API Key** and keep the `.p8` file. Apple offers this download once; if lost, revoke the key and create another.
5. Copy the **Key ID** from its row and the **Issuer ID** above the table. Use these in the command below.

## Find the app's numeric id

Open **Apps → your app → General → App Information → General Information → Apple ID**. If your Sprid app profile is missing this number, run `sprid init` to add it.

## Then run

```
sprid connect asc --key ~/Downloads/AuthKey_XXXXXXXXXX.p8 --key-id XXXXXXXXXX --issuer YYYYYYYY-YYYY-YYYY-YYYY-YYYYYYYYYYYY
```

Replace the file path and ids with yours. Keep the key file private; do not paste its contents into chat.

## How to check it worked

Run `sprid status` to check setup. Then ask your agent: “Check that Sprid can read this app’s App Store reviews and analytics. Tell me if any reports are still missing.”

A saved key alone does not confirm access. The daily review email only arrives when there are new reviews.

## If it fails

- **Key not accepted:** check the Key ID matches the downloaded file and the Issuer ID came from above the keys table. A Team ID will not work here.
- **Permission denied:** create a replacement key with **Admin** access. An existing key’s role cannot be changed.
- **Older analytics are missing:** Apple starts preparing reports after setup. Missing history does not mean downloads fell to zero.

## Sources

- [Generate keys](https://developer.apple.com/help/app-store-connect/get-started/app-store-connect-api)
- [Role permissions](https://developer.apple.com/help/app-store-connect/reference/account-management/role-permissions)
- [Respond to reviews](https://developer.apple.com/help/app-store-connect/monitor-ratings-and-reviews/respond-to-reviews)
- [API key access levels compared](https://aso.dev/app-store-connect/api-key-access-levels/)
- [App Manager 403 on review replies](https://developer.apple.com/forums/thread/800545)

## Investigate with this connection

Your agent can use `list_marketing_queries` and `query_marketing_source` for `reviews`, `versions`, `reports`, `report_rows`. Discover the exact parameters and required setup with:

```sh
sprid marketing-review capabilities --app <slug> --source asc --json
```

Pinned app. Reviews and existing analytics report definitions are read-only. No report request is created. See [connected queries](https://sprid.studio/docs/queries) for the shared workflow. Extra operations may need additional read permissions; a stored key alone is not live verification.
