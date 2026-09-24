# RevenueCat

**What Sprid does with this:** See subscription revenue and how it changes over time.

## You need

**Admin** access to the RevenueCat project, to create a dedicated **V2 secret API key**. The app’s public key and V1 keys do not work.

## Click path (app.revenuecat.com)

1. Select your project → **API keys → Secret API keys → New secret API key**.
2. Name it `Sprid analytics` and select **V2**.
3. **Charts metrics permissions**: set **Overview Configuration Access Level** and **Charts Configuration Access Level** to **Read only**.
4. **Project configuration permissions**: set **Apps Configuration Access Level** to **Read only**. Leave everything else at **No access**.
5. Click **Generate**. Use a separate key per app.
6. Copy the key and leave it on your clipboard.

## Project id

**Project settings → General → Project ID**, such as `proj1ab2c3d4`. Not the shorter id in the dashboard address.

## Then run

```sh
sprid connect revenuecat --app myapp --key-from-clipboard --project proj1ab2c3d4
```

Use your own app slug and project id. Add `--workspace <slug>` if needed. Keep the key out of chat.

Sprid reads the key from your clipboard, saves it and clears the clipboard, so it never shows on screen or lands in a file. Working with an agent? Tell it the key is copied and it runs this for you. Typing it yourself, copy the key last: paste the command into your terminal first, then copy the key, then press Enter. If the clipboard still holds the command, Sprid refuses it; copy the key and run it again. Without clipboard access (a remote shell), save the key to a file and pass `--key <file>` instead.

## How to check it worked

Ask your agent: “Check that Sprid can read this app’s RevenueCat overview and daily revenue history. Report any missing dates.” A saved key alone does not confirm access. The overview can work while history does not; missing dates are not zero sales.

## If you also sell on the web

Connect the services that record the other sales. Sprid withholds a combined total when RevenueCat may already include the same Stripe or Paddle sales, or when currencies or definitions differ. RevenueCat Web Billing and your own Stripe are separate merchant accounts, so they never overlap.

## If it fails

- **Key rejected:** check it is an active V2 secret key for this project.
- **Access denied or history missing:** open the key’s **More → Edit**, check all three Read only settings, then **Submit**. No new key needed.
- **Project not found:** copy the full Project ID from **Project settings → General**. Key and id must belong to the same project.
- **Too many requests:** retry later. Another key will not help.

## Investigate with this connection

Reads `chart_options`, `chart` and `subscriptions` for the pinned project. Read `chart_options` before picking dimensions, filters or resolution, and keep the returned units. `subscriptions` also needs `customer_information:subscriptions:read` and defaults to production; ask for sandbox to see test purchases.

```sh
sprid marketing-review capabilities --app <slug> --source revenuecat --json
```

See [connected queries](https://sprid.studio/docs/queries).

## Sources and verification

Setup and live reads checked 2026-09-09.

- [RevenueCat API keys](https://www.revenuecat.com/docs/projects/authentication)
- [API V2 reference](https://www.revenuecat.com/docs/api-v2)
