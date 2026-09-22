# Stripe

**What Sprid does with this:** Read revenue and subscriptions from your Stripe account.

## You need

Permission to create a **restricted API key** in Stripe: live and read-only, beginning with `rk_live_`.

## Click path (dashboard.stripe.com)

1. Open [Stripe](https://dashboard.stripe.com) → **Developers → API keys → Restricted keys → Create restricted key**, and name it `Sprid`.
2. Set these to **Read**:
   - **Core → Charges** and **Account**
   - **Billing → Subscriptions**, **Invoices** and **Prices**
3. Leave every other permission at **None**.
4. Create the key and save it to a private file such as `~/keys/stripe-sprid.txt`.

## Then run

```
sprid connect stripe --app <slug> --key ~/keys/stripe-sprid.txt
```

Use your Sprid app slug and your own file path. Keep the key out of chat.

## How to check it worked

Ask your agent: “Read this app’s Stripe revenue through Sprid and check that it is the right account.” A saved key alone does not confirm access.

## What the numbers mean

MRR is current active and past-due subscription prices, with annual plans spread over 12 months. It excludes trials and ignores discounts, proration and tax, so it differs from Stripe’s dashboard. Revenue covers 28 complete calendar days; refunds restate the original charge date. Currencies stay separate.

## If you also use RevenueCat

If RevenueCat may already count these Stripe sales, Sprid withholds the combined total until the overlap is resolved and currencies and definitions match.

## If it fails

- **Key rejected:** check the copied value is complete and starts with `rk_live_`.
- **Permission denied:** check every Read permission above, then reconnect with a corrected key.
- **MRR is zero but sales appear:** one-off purchases count as revenue, not recurring subscriptions.

## Investigate with this connection

Reads `subscriptions` and `charges` for the key’s merchant account. Filter by price or customer when several products share it. Amounts keep currency and minor units; Stripe SQL and Analytics are not exposed.

```sh
sprid marketing-review capabilities --app <slug> --source stripe --json
```

See [connected queries](https://sprid.studio/docs/queries).

## Sources

- [Restricted API keys](https://docs.stripe.com/keys/restricted-api-keys)
- [Analytics API and its write requirement](https://docs.stripe.com/data/analytics)
- [Subscriptions and charges](https://docs.stripe.com/api)
