# Google Ads

**What Sprid does with this:** Promote your published YouTube videos from your own Google Ads account, start each campaign only when you confirm, and report what it spent and how many people watched.

## You need

- A **Google Ads account** with a payment method. It can be the same Google login as your YouTube channel or a different one.
- Access to that ad account as **Standard** or **Admin**. Read-only and Billing access cannot create campaigns.
- A **YouTube video published through Sprid** that is **public** or **unlisted**. Google does not run private videos as ads.
- A **channel picture** on that YouTube channel. Google shows it as the ad’s logo and refuses an ad without one.

You do **not** create a Google Cloud project, a developer token or an API key. You only sign in with Google and pick the ad account.

## Set up Google Ads (once, before you connect)

Skip any step you have already done.

1. **Ad account.** Go to [ads.google.com](https://ads.google.com) and create an account. Pick the **currency** and **time zone** carefully: neither can be changed later.
2. **Payment method.** Open **Billing → Settings** in that account and add a payment method. Sprid can connect an account without one, but no campaign can start until it has one.
3. **Access.** If someone else owns the ad account, ask them to add your Google login under **Admin → Access and security** with **Standard** or **Admin** access.

## Then run

```sh
sprid connect google-ads --account <slug>
```

Replace `<slug>` with your Sprid account slug.

## Click path (the connect)

1. Sign in with the Google login that has access to the ad account.
2. Google asks to let Sprid **see, edit, create and delete your Google Ads accounts and data**. Click **Continue**. Sprid only creates the campaigns you review, and creates them paused.
3. If the login can manage more than one ad account, Sprid lists their ids. Connect again with the one this brand should use:

```sh
sprid connect google-ads --account <slug> --ad-account <customer id>
```

The customer id is the ten-digit number at the top right of Google Ads, for example `123-456-7890`.

## Check the connection

Run `sprid status` and check that the ad account’s name shows, followed by “(Google Ads)”.

When you promote a YouTube video, Sprid prepares a **Demand Gen** campaign that shows the video on YouTube (in-stream, in-feed and Shorts) in the countries you pick, at the daily budget you review. It starts **paused**. Nothing is spent until you confirm the start. Google reviews the ad before it runs, usually within a day.

What Sprid sends Google for the ad: the video, its title as the headline, the first line of its caption as the description, the channel name as the business name and the channel picture as the logo. Hashtags are left out.

## If it fails

- **“Google Ads promotion is not switched on in Sprid yet”:** Sprid is waiting on Google’s approval of its own access. Nothing on your side needs to change.
- **“This Google login has no active Google Ads account”:** the login you signed in with has no ad account, or only cancelled ones. Create one (step 1) or sign in with the login that has access.
- **Your ad account is missing from the list:** only active accounts you can open directly, or directly under a manager account you can open, are listed. Ask the owner to add your login to the ad account itself.
- **“Google returned no refresh token”:** remove Sprid at [myaccount.google.com/permissions](https://myaccount.google.com/permissions), then connect again.
- **“This Google login cannot manage the connected Google Ads account”:** your access is read-only or billing-only. Ask for Standard access and reconnect.
- **A campaign refuses to start:** add a payment method (step 2). Sprid shows this before you pick a budget when Google reports no approved billing.
- **“Google Ads needs the YouTube channel’s picture as the ad’s logo”:** add a channel picture in **YouTube Studio → Customization → Branding**, reconnect YouTube, then promote again.
- **“Google Ads cannot target …”:** Google does not advertise in that country. Remove it and try again.
- **Political or gambling content:** Google requires advertiser verification or a certification Sprid cannot hold for you. Promote those from Google Ads directly.
- **The ad is disapproved:** Sprid shows Google’s policy reason on the promotion. Open the campaign in Google Ads to appeal or edit.
- **“Invalid scope”, app unavailable or “redirect_uri_mismatch”:** contact [Sprid support](mailto:hello@sprid.studio). Only Sprid can fix these.

## Sources

- [Create a Google Ads account](https://support.google.com/google-ads/answer/6366720)
- [Add a payment method](https://support.google.com/google-ads/answer/2375375)
- [Access levels in your Google Ads account](https://support.google.com/google-ads/answer/9978556)
- [About Demand Gen campaigns](https://support.google.com/google-ads/answer/13695777)
- [Create a Demand Gen campaign (API)](https://developers.google.com/google-ads/api/docs/demand-gen/create-campaign)
- [Google Ads API OAuth scope](https://developers.google.com/google-ads/api/docs/oauth/overview)
