# TikTok Ads

**What Sprid does with this:** Promote a post that is already live on TikTok as a Spark Ad from your own TikTok ad account, start it only when you confirm, and report what it spent and reached.

## You need

- A **TikTok for Business** login at [ads.tiktok.com](https://ads.tiktok.com), with an **ad account** you manage. This is a different login from your TikTok app account, and a different connection from TikTok publishing in Sprid.
- A **payment method** or a prepaid balance on that ad account.
- For each post you promote, its **ad authorization code**, generated in the TikTok app by whoever owns the post. See **Get a post's ad authorization code** below. Once a code is applied, Sprid remembers the post until the code expires.

You do **not** create a TikTok developer app or copy a token. You only sign in to TikTok for Business and pick the ad account.

## Set up TikTok for Business (once, before you connect)

Skip any step you have already done.

1. **Ad account.** Sign in at [ads.tiktok.com](https://ads.tiktok.com) and create an ad account. Pick the **currency** and **time zone** carefully: neither can be changed later. Sprid’s budget controls support currencies with two decimals (USD, EUR, SEK and most others).
2. **Payment.** In TikTok Ads Manager open **Account → Payment** and add a card or funds. Sprid can connect an account without one, but nothing can deliver until it can pay.
3. **Account review.** A new ad account is reviewed by TikTok before it can run anything. Sprid tells you when the account is still under review.

## Then run

```sh
sprid connect tiktok-ads --account <slug>
```

Replace `<slug>` with your Sprid account slug. You can also use **Settings → Accounts → [account] → TikTok Ads** in Sprid.

## Click path (the connect)

1. Sign in with the TikTok for Business login that manages the ad account.
2. Choose the ad account, leave every requested permission switched on and click **Confirm**.
3. Back in Sprid, pick the **ad account** if the login manages more than one. The list only appears when there is a choice.

With several brands, connect each Sprid account separately and pick that brand’s own ad account every time.

## Get a post's ad authorization code

A Spark Ad runs the post as itself, under the creator’s account, so the creator has to allow it. In the TikTok app, signed in as the account that published the post:

1. Open the post, tap **…** (or the share arrow), then **Ad settings**.
2. Turn on **Ad authorization**. The first time, TikTok may ask you to turn it on for the account in **Settings and privacy → Creator tools → Ad settings**.
3. Tap **Generate code**, pick how long the authorization should last and copy the code.
4. In Sprid, open **Promote** on the post and paste the code when it asks for one.

Pick a duration longer than the promotion. Sprid refuses a code that ends before the promotion would, because the ad would stop when it expires. TikTok offers 7, 30, 60, 180 or 365 days *(from TikTok’s help pages; the exact labels in the app may differ)*.

## Check the connection

Run `sprid status` and check that TikTok Ads shows the intended ad account name, followed by “(TikTok Ads)”.

A promotion Sprid prepares starts **paused**. Nothing is spent until you confirm the start. It runs on TikTok only, to adults (18+), in the countries you choose.

## If it fails

- **“TikTok promotion is not switched on in Sprid yet”:** Sprid has not enabled TikTok ads on this server. Contact [Sprid support](mailto:hello@sprid.studio).
- **“This post needs its ad authorization code”:** generate one in the TikTok app (see above) and paste it in the Promote sheet.
- **“That authorization code belongs to a different TikTok post”:** the code was generated on another post. Generate it on the post you are promoting.
- **“The post’s ad authorization ends … before the promotion would”:** generate a new code with a longer duration, or shorten the promotion.
- **“This TikTok ad account is not active” or still under review:** check the account’s status in TikTok Ads Manager.
- **“TikTok cannot show ads in …”:** that country is not available to this ad account. Remove it from the promotion.
- **The currency is not supported:** Sprid’s budgets need a two-decimal currency. Create an ad account in a supported currency.
- **Political content:** TikTok does not allow political ads. Sprid refuses them.
- **Housing, credit or employment:** declare the category in the Promote sheet. TikTok then limits targeting. Outside the US and Canada TikTok may refuse the category for your account; the message says so.
- **The ad stopped with “creator authorization revoked”:** the creator turned ad authorization off or the code expired. Generate a new code and promote the post again.

## Sources

- [TikTok API for Business: authorization](https://business-api.tiktok.com/portal/docs?id=1738373164380162)
- [About Spark Ads](https://ads.tiktok.com/help/article/spark-ads)
- [How to create Spark Ads in TikTok Ads Manager](https://ads.tiktok.com/help/article/spark-ads-creation-guide)
- [Special ad categories on TikTok](https://ads.tiktok.com/help/article/special-ad-categories)
