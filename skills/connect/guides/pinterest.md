# Pinterest

**What Sprid does with this:** Publish the image and video Pins you select to the right boards, keep their destination links intact and read their daily results.

## You need

- A Pinterest account. A free business account is recommended, because Pinterest Analytics requires one.
- Access to the Sprid account that will own this channel.
- A board topic in mind. Sprid can create the board during publishing.

You do **not** create a Pinterest developer app, request API access or copy a token. You only authorize your own Pinterest account.

## Then run

```sh
sprid connect pinterest --account <slug>
```

Replace `<slug>` with your Sprid account slug, or use **Settings → Accounts → [account] → Pinterest → Continue with Pinterest** in Sprid.

## Click path (the connect)

1. Check the Pinterest identity in the browser that opens. Sign out first if it is the wrong account.
2. Review the requested access and authorize Sprid.
3. Back in Sprid, confirm the connected Pinterest name.
4. Open a post, select **Publish → Pinterest** and pick the destination in the **Board** picker. If none fits, select **Create board**, name it and choose public or secret; Sprid selects it automatically.

Each Sprid account needs its own connect, even when several Pinterest accounts are signed in to the same browser. Check the identity every time.

## Check the connection

Run `sprid status` and confirm Pinterest shows the intended account. Open a draft Pin, select **Publish → Pinterest** and confirm the intended board appears before approving any schedule.

After the first Pin publishes, open Pinterest signed out or from another account and check the Pin, board, visual, title and destination. A successful API response does not prove public visibility.

## Prepare the account

Create a few specific boards around topics people search for, such as “Small apartment viewing checklist” rather than “Inspiration”. Board names, descriptions and saved Pins give Pinterest context.

Claim your website in Pinterest where possible: it links Pins from that site to the profile and expands website analytics. A website can be claimed by only one Pinterest account, so decide which market or brand owns it before connecting several.

Read [Pinterest content and publishing](https://sprid.studio/docs/pinterest) before preparing the first batch.

## If it fails

- **Sprid says Pinterest is unavailable:** Pinterest is not enabled on the Sprid server you are using. Contact [Sprid support](mailto:hello@sprid.studio); you do not supply credentials.
- **Wrong account connected:** disconnect it in Sprid, sign out of Pinterest in that browser, then reconnect and check the identity before authorizing.
- **“No Pinterest boards yet”:** create one from the board picker. If Sprid asks for board permission, reconnect once; older connections lack the board write scope.
- **Existing boards missing:** reconnect once, then contact [Sprid support](mailto:hello@sprid.studio) with the account name and error.
- **Access denied:** confirm the Pinterest account is active and you finished the consent screen. Retry once, then contact Sprid support.
- **“Reconnect Pinterest to publish public Pins”:** the saved connection cannot publish. Reconnect once with the same Pinterest account.
- **Analytics unavailable:** use a business account and check the Pin is public. Unavailable data is unavailable, not zero.

## Investigate with this connection

Operation `posts`, read from Sprid’s stored Pin publishes and collected daily Pin metrics: impressions, saves, Pin clicks, outbound clicks and video views, summed up to the exclusive end with the days actually observed. There is no `comments` operation: Sprid does not collect Pinterest comments. Compare Pins at equal ages, such as 30, 60 and 90 days. An outbound click is someone leaving Pinterest, not a website session or an install. Live results for one Pin come from `get_pinterest_metrics` (MCP) or `GET /api/metrics/pinterest`.

```sh
sprid marketing-review capabilities --app <slug> --source pinterest --json
```

See [connected queries](https://sprid.studio/docs/queries).

## Sources

- [Pinterest developer guidelines](https://policy.pinterest.com/en/developer-guidelines)
- [Claim your website](https://help.pinterest.com/en/business/article/claim-your-website)
- [Pinterest Analytics](https://help.pinterest.com/en/business/article/pinterest-analytics)
