# Meta Ads

**What Sprid does with this:** Prepare campaigns in your own Meta ad account, start them only when you confirm, and report what they spent and returned.

## You need

- A Facebook profile with two-factor authentication turned on. Meta will not let you add ad assets without it.
- A **business portfolio** at [business.facebook.com](https://business.facebook.com). One per company is enough, even with several apps or brands. See **One portfolio or several** below.
- A **Facebook Page** for the brand. Ads always run from a Page, including the ones shown on Instagram. To create one, see [Create your social accounts](https://sprid.studio/docs/connect/social-accounts).
- An **ad account** with a payment method, one per brand.
- Optional: a **dataset** (formerly Meta Pixel) if you want campaigns that optimise for signups or purchases.

You do **not** create a Meta developer app or copy a token. You only sign in with Facebook and pick the Page and ad account.

## Set up Meta (once, before you connect)

Skip any step you have already done.

1. **Business portfolio.** Go to [business.facebook.com](https://business.facebook.com) and create a business portfolio under your company’s legal name.
2. **Page.** In the portfolio, open **Settings → Accounts → Pages** and add the brand’s Page. Give yourself access that includes **Ads**.
3. **Ad account.** Open **Settings → Accounts → Ad accounts → Add → Create a new ad account**. Pick the **currency** and **time zone** carefully: once the account has spent anything, neither can be changed. Choose the currency of the market you advertise in. Give yourself **Manage campaigns** or full control.
4. **Payment method.** Open **Billing & payments** for that ad account and add a card. Sprid can connect an account without one, but no campaign can start until it has one.
5. **Dataset (optional).** Open [Events Manager](https://business.facebook.com/events_manager2) → **Connect data sources → Web**, name it after your domain and copy its **dataset id**. Sprid only needs the id. The events themselves reach it from your site or app, through the Meta Pixel or the Conversions API, and without events a conversion campaign has nothing to optimise for.

## Then run

```sh
sprid connect meta-ads --account <slug>
```

Replace `<slug>` with your Sprid account slug. Add `--dataset <id>` if you created one in step 5. You can also use **Settings → Accounts → [account] → Meta Ads** in Sprid.

## Click path (the connect)

1. Sign in with the Facebook profile that manages the Page and the ad account.
2. Leave every requested permission switched on and click **Continue**.
3. Back in Sprid, pick the **Page** your ads should appear from, then the **ad account**. Each list only appears when there is more than one to choose from.
4. From the CLI, a profile with several Pages or ad accounts gets a message listing their ids. Run the command again with them:

```sh
sprid connect meta-ads --account <slug> --page <page id> --ad-account <ad account id> --dataset <dataset id>
```

With several brands, connect each Sprid account separately and pick that brand’s own Page and ad account every time.

## Check the connection

Run `sprid status` and check that Meta Ads shows the intended Page name, followed by “(Ads)”.

A campaign Sprid prepares starts **paused**. Nothing is spent until you confirm the start.

## One portfolio or several

Keep one business portfolio for your company and put one Page, one ad account and one dataset per brand inside it.

- **A restriction on an ad account stays on that account.** The other brands keep running.
- **Separate portfolios isolate less than they appear to.** Meta links portfolios run by the same people and paid with the same card, so a problem on one is often read as a problem on all of them. You also pay for the split: each portfolio has to be verified and set up separately, and a personal profile can only create a couple of them.
- **What one portfolio risks:** if the portfolio itself is restricted, every brand in it stops at once. If one brand operates in a regulated category (housing, credit, employment, politics) and draws an enforcement action, move that brand to its own portfolio then.

Give each ad account its own payment method where you can, and add a second admin to the portfolio so you are not locked out if your own profile has a problem.

## If it fails

- **“No Facebook Pages found”:** the profile you signed in with has no Page access. Check the Page in the portfolio, give yourself access and reconnect.
- **No ad account to choose, or the wrong ones:** only active ad accounts are listed. Check that the account is not disabled or closed in Ads Manager and that your profile is assigned to it.
- **“Re-run the connect with --page / --ad-account”:** the profile manages several. Copy the right ids from the message and run the command again with them.
- **“Already connected to another account”:** that ad account is connected to a different Sprid account. Check you picked the right one; move it only if you mean to.
- **Campaign refuses to start with a conversion goal:** the connection has no dataset. Reconnect with `--dataset <id>`.
- **Campaign refuses to start at all:** add a payment method to the ad account (step 4).
- **“Invalid Scopes”, app unavailable or “URL blocked”:** contact [Sprid support](mailto:hello@sprid.studio). Only Sprid can fix these.
- **Expiring connection in `sprid status`:** Meta’s sign-in lasts about 60 days. Run the connect again.

## Sources

- [Create a business portfolio](https://www.facebook.com/business/help/1710077379203657)
- [Add an ad account to your business portfolio](https://www.facebook.com/business/help/915885887059947)
- [Ad account limits](https://www.facebook.com/business/help/1026272311098874)
- [Add a payment method to an ad account](https://www.facebook.com/business/help/132073386867900)
- [Assign business assets to people](https://www.facebook.com/business/help/325571851329683)
- [Create a dataset in Events Manager](https://www.facebook.com/business/help/5818684664831465)
- [About the Conversions API](https://www.facebook.com/business/help/AboutConversionsAPI)
