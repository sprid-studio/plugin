# Pinterest Ads

**What Sprid does with this:** Promote a public image or video Pin through your Pinterest ad account, prepare it paused, and read its campaign spend and attributed checkouts. Only your confirmation in the Sprid app starts spending.

## You need

- A Pinterest business account with an advertising account you can manage, set up in Pinterest Ads Manager.
- A public Pin published through the ordinary Pinterest connection on the same Sprid account. Its owner must match the advertising account’s owner.
- A reviewed daily budget, maximum cost per click, run length and audience countries. Sprid supports advertising currencies with two decimal places.

## Then run

```sh
sprid connect pinterest-ads --account <slug>
```

Or open **Settings → Accounts → [account] → Ads → Pinterest Ads**.

## Click path

1. Sign in to the Pinterest login that manages your advertising account.
2. Authorize reading your profile, Pins and boards, and reading and managing ads. Ordinary publishing remains a separate connection.
3. If Pinterest returns several manageable ad accounts, select the one that pays for this brand. Sprid never chooses one for you.
4. In Sprid, open a published Pin and choose **Promote**. Set audience countries, daily budget, maximum cost per click and run length. Declare any regulated category; these campaigns must be run in Pinterest Ads Manager instead.
5. Save a paused draft, review the amounts, then confirm Start in the app. Agents and tokens can prepare or pause, but cannot start or increase spending.

Sprid uses consideration campaigns with a fixed daily campaign budget, manual maximum-CPC bidding, adults-only targeting and a campaign end date. Run length counts UTC days including the creation day and ends at midnight UTC, so the reviewed total cannot span an extra daily budget. Pause stops the parent campaign before Sprid records it as paused. Changing budget or end date also requires app approval.

## Check the connection

Confirm the advertiser name and id in Settings. Check the reviewed Pin is public and owned by that advertiser before preparing it. Sprid checks identity again at creation and rejects historical test Pins.

Campaign reports cover spend, paid impressions, paid Pin clicks, paid outbound clicks and Pinterest-attributed checkouts, with a 30-day click and 1-day view window, reported on conversion date. Earned delivery is excluded. Pin clicks reach content on or off Pinterest; outbound clicks leave Pinterest. Missing metrics stay unavailable. Checkouts are provider-attributed actions, not verified new customers; Pinterest needs your conversion tracking configured to report them. Campaign and child totals overlap and must never be added.

## If it fails

- **No manageable ad accounts:** set up an advertiser in Pinterest Ads Manager or use a login with Owner, Admin or Campaign Manager access.
- **Choose the account that owns the Pin:** ordinary Pinterest and Pinterest Ads must refer to the same Pin owner. A public Pin on a different profile cannot be promoted by this advertiser.
- **Reconnect:** the grant expired or lacks `ads:read` / `ads:write`. Connect Pinterest Ads again; ordinary Pinterest consent does not add these permissions.
- **Setup interrupted:** check Pinterest Ads Manager before retrying. Pinterest creation has no idempotency key; an interrupted request may have created a paused entity. Sprid keeps an uncertain setup for review rather than silently retrying it.
- **Billing refused:** add or fix payment details in Pinterest Ads Manager. Sprid does not request billing permissions or manage your payment methods.

## Sources

[Pinterest campaign and ad-group API](https://developer.pinterest.com/docs/work-with-ads/create-campaigns-and-ad-groups/) and [Pinterest API description](https://github.com/pinterest/api-description/blob/main/v5/openapi.json).
