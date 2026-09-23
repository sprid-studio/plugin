# Google Analytics 4

**What Sprid does with this:** See how many people visit your website, where they came from and which pages they land on. If your app uses Firebase Analytics, this is also how Sprid sees your app’s active and new users.

Firebase Analytics **is** Google Analytics: a Firebase app reports into a linked GA4 property, and that property is what you connect here.

## You need

**Editor** or **Administrator** on the GA4 property, and a Google service account. You can reuse the one from Sprid’s Google Play or Search Console connection.

## Click path

### A. Google Cloud

1. Open [Google Cloud](https://console.cloud.google.com) and select your service account’s project.
2. **APIs & Services → Library**: enable **Google Analytics Data API**.
3. No service account yet? **IAM & Admin → Service Accounts → Create service account**, name it `sprid-analytics`, then **Done**.
4. Open the account → **Keys → Add key → Create new key → JSON**. Save it as `ga4-sa.json` and copy the account’s email. Reusing an account? Use its existing key file and email.

### B. Google Analytics

5. Open [Google Analytics](https://analytics.google.com) and select the property.
6. **Admin → Property access management → + → Add users**.
7. Enter the service account’s email, choose **Viewer**, uncheck the notification email, then **Add**.

### C. The property id

8. **Admin → Property details**. Copy **Property ID**: digits only, such as `493820184`.

A measurement id (`G-XXXXXXX`) is the tag on your page, not the property. The Data API refuses it, so Sprid rejects it when you type it.

## Then run

```
sprid connect ga4 --key ~/Downloads/ga4-sa.json --property 493820184
```

Use your own file path and property id. Keep the file private.

Add `--use` to make Google Analytics the source Sprid reports website traffic from. See **Only one provider answers** below.

## Only one provider answers

PostHog, Google Analytics and Plausible all count the same visits to the same site. Sprid reads **one** of them per app and never adds them together, because adding them would overstate your traffic by roughly the overlap, and the overlap is nearly everything.

With one connected, that one answers. With several, Sprid uses the one you chose with `--use` (PostHog by default, because it also answers the people and registration cards). The others stay connected and idle, and the traffic card says so.

## How to check it worked

Run `sprid status`, then ask your agent: “Read this website’s visitors for the last 28 days through Sprid and say which provider answered.” A saved key confirms setup; only the live read confirms access.

## If it fails

- **Permission denied:** access is granted on the property, not on the Google Cloud project. Check the service account’s email is in **Property access management** with at least Viewer.
- **API not enabled:** enable **Google Analytics Data API** in the project the key came from, then wait a minute.
- **Property not found:** you probably saved a measurement id or a stream id. Use **Admin → Property details → Property ID**.
- **Numbers do not match the GA4 dashboard:** Google applies thresholding and its own bot filtering, and reports in the property’s time zone rather than UTC. Small differences on small properties are expected.

## What Sprid can and cannot read here

Visitors, pageviews, sessions, engaged sessions and engagement time, plus breakdowns by country, region, city, source, channel group, campaign, term, page, landing page, hostname, browser, operating system and device.

Two honest gaps. Google reports **no exit page**, so that breakdown is empty rather than estimated. And **channel** is Google’s own default channel group and **referrer** is the session source, neither of which is the raw referring domain another provider would show, so those rows do not compare like for like across providers.

## Sources

- [Data API `runReport`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport)
- [Batch limit of five reports](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/batchRunReports)
- [Firebase reports into Google Analytics](https://firebase.google.com/docs/analytics)
- [Linking a Firebase app to a GA4 property](https://support.google.com/analytics/answer/9289234)
