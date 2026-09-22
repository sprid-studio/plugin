# App Store Connect

**What Sprid does with this:** Read App Store reviews and download reports, and update listing copy when you approve it.

## You need

**Account Holder** or **Admin** access to your Apple Developer team, to create a **Team API key** with **Admin** access. One key covers every app on the account.

**App Manager** is enough to read reviews and edit metadata. Review replies and analytics reports need Admin.

## Click path (appstoreconnect.apple.com, checked 2026-09-08)

1. Open [App Store Connect](https://appstoreconnect.apple.com) → **Users and Access → Integrations → App Store Connect API → Team Keys**.
2. Click **Generate API Key**, or **+** beside **Active**.
3. Name it `Sprid`, choose **Admin**, then **Generate**.
4. Click **Download API Key** and keep the `.p8` file. Apple offers the download once; if you lose it, revoke the key and make another.
5. Copy the **Key ID** from its row and the **Issuer ID** above the table.

## Find the app's numeric id

**Apps → your app → General → App Information → General Information → Apple ID**. If your Sprid app profile lacks it, run `sprid init`.

## Then run

```
sprid connect asc --key ~/Downloads/AuthKey_XXXXXXXXXX.p8 --key-id XXXXXXXXXX --issuer YYYYYYYY-YYYY-YYYY-YYYY-YYYYYYYYYYYY
```

Use your own file path and ids. Keep the key file out of chat.

## How to check it worked

Run `sprid status`, then ask your agent: “Check that Sprid can read this app’s App Store reviews and analytics. Tell me if any reports are still missing.” A saved key alone does not confirm access. The daily review email only arrives when there are new reviews.

## If it fails

- **Key not accepted:** check the Key ID matches the downloaded file and the Issuer ID came from above the keys table. A Team ID will not work.
- **Permission denied:** create a replacement key with **Admin** access. A key’s role cannot be changed.
- **Older analytics are missing:** Apple starts preparing reports after setup. Missing history does not mean downloads fell to zero.

## Investigate with this connection

Reads `reviews`, `versions`, `reports` and `report_rows` for the pinned app. Read-only: no report request is created.

```sh
sprid marketing-review capabilities --app <slug> --source asc --json
```

See [connected queries](https://sprid.studio/docs/queries).

## Sources

- [Generate keys](https://developer.apple.com/help/app-store-connect/get-started/app-store-connect-api)
- [Role permissions](https://developer.apple.com/help/app-store-connect/reference/account-management/role-permissions)
- [Respond to reviews](https://developer.apple.com/help/app-store-connect/monitor-ratings-and-reviews/respond-to-reviews)
- [API key access levels compared](https://aso.dev/app-store-connect/api-key-access-levels/)
- [App Manager 403 on review replies](https://developer.apple.com/forums/thread/800545)
