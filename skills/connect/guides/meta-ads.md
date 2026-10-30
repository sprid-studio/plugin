# Meta Ads

**What Sprid does with this:** Prepare campaigns in your own Meta ad account, start them only when you confirm, and report what they spent and returned.

## You need

- A Facebook profile with two-factor authentication turned on. Meta will not let you add ad assets without it.
- A **business portfolio** at [business.facebook.com](https://business.facebook.com). One per company is enough, even with several apps or brands. See **One portfolio or several** below.
- A **Facebook Page** for the brand. Ads always run from a Page, including the ones shown on Instagram. To create one, see [Create your social accounts](https://sprid.studio/docs/connect/social-accounts).
- To promote **Instagram** posts: the Instagram account **linked to that Page**. Meta runs an Instagram ad through the Page the profile is linked to, so without the link only Facebook posts can be promoted.
- An **ad account** with a payment method. Several apps in the same Sprid workspace can share it.
- Optional: a **dataset** (formerly Meta Pixel) if you want campaigns that optimise for signups or purchases.

You do **not** create a Meta developer app or copy a token. You only sign in with Facebook and pick the Page and ad account.

## Set up Meta (once, before you connect)

Skip any step you have already done.

1. **Business portfolio.** Go to [business.facebook.com](https://business.facebook.com) and create a business portfolio under your company’s legal name.
2. **Page.** In the portfolio, open **Settings → Accounts → Pages** and add the brand’s Page. Give yourself access that includes **Ads**.
3. **Instagram (to promote Instagram posts).** On the Page, open **Settings → Linked accounts → Instagram** and connect the brand’s Instagram account. It has to be the same account you publish to from Sprid. Sprid reads the link from Meta each time you promote, so you can do this later without reconnecting.
4. **Ad account.** Use an existing ad account, or open **Settings → Accounts → Ad accounts → Add → Create a new ad account**. Pick the **currency** and **time zone** carefully. Changing them creates a new ad account and closes the old one, stopping its ads. Choose the currency of the market you advertise in. Give yourself **Manage campaigns** or full control.
5. **Payment method.** Open **Billing & payments** for that ad account and add a card. Sprid can connect an account without one, but no campaign can start until it has one.
6. **Dataset (optional).** Open [Events Manager](https://business.facebook.com/events_manager2) → **Connect data sources → Web**, name it after your domain and copy its **dataset id**. Sprid only needs the id. The events themselves reach it from your site or app, through the Meta Pixel or the Conversions API, and without events a conversion campaign has nothing to optimise for.

For campaigns that optimise for signups or purchases, three more:

7. **Conversions API token** (if your server sends the events). Open the dataset → **Settings → Conversions API** and go through Meta's setup guide to the end. The events and fields you tick there only shape its instructions, not what your server may send. Generate the access token there and store it on your server. Sprid never needs it.
8. **Dataset settings.** Review Meta’s settings and any restrictions shown for this dataset. A server-only Conversions API integration can send events without browser pixel code.
9. **Advertising settings.** Review any optional AI tests that change your destination or its presentation. Creative opt-outs cannot verify account-level tests. Define engaged audiences and existing customers before using audience-segment reports.

## Then run

```sh
sprid connect meta-ads --account <slug>
```

Replace `<slug>` with your publishing account’s slug. Add `--dataset <id>` if you created one in step 6. You can also use **Settings → your app → Advertising → Ad accounts → Meta Ads** in Sprid.

## Click path (the connect)

1. Sign in with the Facebook profile that manages the Page and the ad account.
2. Leave every requested permission switched on and click **Continue**.
3. Back in Sprid, pick the **Page** your ads should appear from, then the **ad account**. Each list only appears when there is more than one to choose from.
4. From the CLI, a profile with several Pages or ad accounts gets a message listing their ids. Run the command again with them:

```sh
sprid connect meta-ads --account <slug> --page <page id> --ad-account <ad account id> --dataset <dataset id>
```

With several apps, connect each app’s publishing account separately. Pick that app’s Page and dataset each time; you can select the same ad account for apps in the same workspace. Their campaigns and conversion lists stay separate.

## Check the connection

Run `sprid status` and check that Meta Ads shows the intended Page name, followed by “(Ads)”.

For conversion delivery, complete the intended action and confirm its exact event name in Events Manager. An API response such as `{"events_received":1}` only acknowledges the request; it does not prove the chosen event arrived. Then ask your agent to run `dataset_health` for that event. A dataset ID alone cannot pass the conversion launch check. Follow [Run your first Meta conversion campaign](https://sprid.studio/docs/meta-conversions#prove-the-conversion-signal) for testing and custom conversions.

A campaign Sprid prepares starts **paused**. Nothing is spent until you confirm the start.

## One portfolio or several

Keep one business portfolio for your company. Use a Page and dataset for each app. You can share one ad account across apps in the same Sprid workspace, or use separate ad accounts if Meta allows them and you want separate billing.

A shared ad account uses one billing currency. Its payment and account status affect every app advertising through it. Check the currency before choosing budgets.

In Sprid, open **Ad settings → Shared Meta limits** on any connected account. A workspace owner or admin can set the combined daily budget and monthly spend-and-commitment limit. These limits cover campaigns managed through Sprid. Meta can vary actual daily spend, and changes made directly in Ads Manager can exceed these limits. Lowering a limit blocks new commitments; it does not pause running ads.

**Disconnect** removes only the selected Sprid connection. **Remove access** first lists every connection using the same Meta authorization, then asks you to confirm in Sprid. Removing access stops Sprid from managing those connections; running ads remain on Meta. Reconnect older connections if Sprid cannot identify who authorized them.

## If it fails

- **“No Facebook Pages found”:** the profile you signed in with has no Page access. Check the Page in the portfolio, give yourself access and reconnect.
- **No ad account to choose, or the wrong ones:** only active ad accounts are listed. Check that the account is not disabled or closed in Ads Manager and that your profile is assigned to it.
- **“Re-run the connect with --page / --ad-account”:** the profile manages several. Copy the right ids from the message and run the command again with them.
- **“Already connected to another account”:** check the workspace. Sharing a Meta ad account is supported within one workspace. Social publishing channels still belong to one publishing account at a time.
- **Campaign refuses to start with a conversion goal:** inspect the readiness reason. Connect the correct dataset, send a real event, or confirm a recent fire of the selected custom conversion. [The conversion guide](https://sprid.studio/docs/meta-conversions#if-it-fails) covers each repair.
- **Campaign refuses to start at all:** add a payment method to the ad account (step 5).
- **Instagram shows “Not linked” on the Ads page or in Promote:** the Page has no Instagram account linked. Link it (step 3), then press **I’ve linked it**. If the Page is linked to a different Instagram account than the one Sprid publishes to, Meta will only promote that other account’s posts: change the link, or connect the Page that belongs to your Instagram account.
- **“Invalid Scopes”, app unavailable or “URL blocked”:** contact [Sprid support](mailto:hello@sprid.studio). Only Sprid can fix these.
- **Expiring connection in `sprid status`:** Meta’s sign-in lasts about 60 days. Run the connect again.

## Sources

- [Connect a professional Instagram account and a Facebook Page](https://www.facebook.com/business/help/connect-instagram-to-page)
- [Create a business portfolio](https://www.facebook.com/business/help/1710077379203657)
- [Add an ad account to your business portfolio](https://www.facebook.com/business/help/915885887059947)
- [Ad account limits](https://www.facebook.com/business/help/1026272311098874)
- [Add a payment method to an ad account](https://www.facebook.com/business/help/132073386867900)
- [Assign business assets to people](https://www.facebook.com/business/help/325571851329683)
- [Create a dataset in Events Manager](https://www.facebook.com/business/help/5818684664831465)
- [About the Conversions API](https://www.facebook.com/business/help/AboutConversionsAPI)

- [Ad account currency and time zone changes](https://www.facebook.com/business/help/291404291014138)
