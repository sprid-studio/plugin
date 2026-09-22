# RevenueCat

**What Sprid does with this:** See subscription revenue and how it changes over time.

## You need

**Admin** access to the RevenueCat project. Create a dedicated **V2 secret API key**; the app’s public key and V1 keys cannot be used here.

## Click path (app.revenuecat.com)

1. Select your project and open **API keys → Secret API keys → New secret API key**.
2. Name it `Sprid analytics` and select **V2**.
3. Under **Charts metrics permissions**, set **Overview Configuration Access Level** and **Charts Configuration Access Level** to **Read only**.
4. Under **Project configuration permissions**, set **Apps Configuration Access Level** to **Read only**. Leave everything else at **No access**.
5. Click **Generate** and save the key to a private file such as `~/keys/revenuecat-myapp.txt`.

Use a separate key and filename for each app.

## Project id

Open **Project settings → General** and copy the full **Project ID**, such as `proj1ab2c3d4`. Use this field, not the shorter id in the dashboard address.

## Then run

```sh
sprid connect revenuecat --app myapp --key ~/keys/revenuecat-myapp.txt --project proj1ab2c3d4
```

Replace `myapp`, the file path and project id with yours. Add `--workspace <slug>` if needed. Keep the key out of chat.

## How to check it worked

Ask your agent: “Check that Sprid can read this app’s RevenueCat overview and daily revenue history. Report any missing dates.”

A saved key alone does not confirm access. An overview can work while history is unavailable; missing dates should not be treated as zero sales.

## If you also sell on the web

Connect services that record separate sales. Sprid withholds combined totals when RevenueCat may include the same Stripe or Paddle sales. Separate sales also need compatible currencies and measurement definitions before addition. RevenueCat Web Billing and your own Stripe sales use separate merchant accounts.

## If it fails

- **Key rejected:** check it is an active V2 secret key for the intended project.
- **Access denied or history missing:** open the key’s **More → Edit**, check all three Read only settings, then **Submit**. You can edit the existing key.
- **Project not found:** copy the full Project ID from **Project settings → General**. The key and id must belong to the same project.
- **Too many requests:** retry later; creating another key will not help.

## Sources and verification

Setup and live data reads checked on 2026-09-09.

- [RevenueCat API keys](https://www.revenuecat.com/docs/projects/authentication)
- [API V2 reference](https://www.revenuecat.com/docs/api-v2)

## Investigate with this connection

Your agent can use `list_marketing_queries` and `query_marketing_source` for `chart_options`, `chart`, `subscriptions`. Discover the exact parameters and required setup with:

```sh
sprid marketing-review capabilities --app <slug> --source revenuecat --json
```

Pinned project. Discover chart options before selecting dimensions, filters or resolution; preserve returned measure units. See [connected queries](https://sprid.studio/docs/queries) for the shared workflow. Extra operations may need additional read permissions; a stored key alone is not live verification.

Customer subscription reads additionally need `customer_information:subscriptions:read`. They default to production; request sandbox explicitly when investigating test purchases. Chart reads keep the chart permissions described above.
