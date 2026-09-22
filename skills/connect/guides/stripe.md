# Stripe

**What Sprid does with this:** Read revenue and subscriptions from your Stripe account.

## You need

Permission to create a **restricted API key** in Stripe. Use a live, read-only key beginning with `rk_live_`.

## Click path (dashboard.stripe.com)

1. Open [Stripe](https://dashboard.stripe.com) → **Developers → API keys → Restricted keys → Create restricted key**.
2. Name it `Sprid`.
3. Set these permissions to **Read**:
   - **Core → Charges** and **Account**
   - **Billing → Subscriptions**, **Invoices** and **Prices**
4. Leave every other permission at **None**.
5. Create the key, reveal it and save it to a private file such as `~/keys/stripe-sprid.txt`.

## Then run

```
sprid connect stripe --app <slug> --key ~/keys/stripe-sprid.txt
```

Replace `<slug>` with your Sprid app slug and use your own file path. Keep the key out of chat.

## How to check it worked

Ask your agent: “Read this app’s Stripe revenue through Sprid and check that it is the right account.” A saved key alone does not confirm access.

## What the numbers mean

MRR estimates current active and past-due subscription prices, spreading annual subscriptions over 12 months. It excludes trials and does not apply discounts, proration or tax, so it differs from Stripe’s dashboard definition. Revenue covers 28 complete calendar days; refunds restate original charge dates. Currencies remain separate.

## If you also use RevenueCat

If RevenueCat may already count these Stripe sales, Sprid withholds the combined total. Addition requires resolved overlap, matching currencies and compatible measurement definitions.

## If it fails

- **Key rejected:** check the copied value is complete and starts with `rk_live_`.
- **Permission denied:** check all Read permissions listed above and reconnect with a corrected key.
- **MRR is zero but sales appear:** one-off purchases contribute revenue, but do not count as recurring subscriptions.

## Sources

- [Restricted API keys](https://docs.stripe.com/keys/restricted-api-keys)
- [Analytics API and its write requirement](https://docs.stripe.com/data/analytics)
- [Subscriptions and charges](https://docs.stripe.com/api)

## Investigate with this connection

Your agent can use `list_marketing_queries` and `query_marketing_source` for `subscriptions`, `charges`. Discover the exact parameters and required setup with:

```sh
sprid marketing-review capabilities --app <slug> --source stripe --json
```

Credential-scoped merchant account. Filter by price/customer as appropriate when several products share the account. Amounts retain currency and minor units; SQL/Stripe Analytics is not exposed. See [connected queries](https://sprid.studio/docs/queries) for the shared workflow. Extra operations may need additional read permissions; a stored key alone is not live verification.
