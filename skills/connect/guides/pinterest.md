# Pinterest

**What Sprid does with this:** Publish the Pins you select to the right boards, keep their destination links intact and read their results when analytics access is available.

## You need

- A Pinterest account you can sign in to. A free Pinterest business account is recommended because Pinterest Analytics requires one.
- Access to the Sprid account that will own this channel.
- A board topic in mind. A specific board gives Pinterest and people useful context about the Pin; Sprid can create it during publishing.

You do **not** need to create a Pinterest developer app, request API access or copy a token. Sprid owns the developer integration; you only authorize your own Pinterest account.

## Then run

```sh
sprid connect pinterest --account <slug>
```

Replace `<slug>` with your Sprid account slug.

## Click path (the connect)

1. In Sprid, open **Settings → Accounts → [account] → Pinterest**.
2. Select **Continue with Pinterest**.
3. Check the Pinterest identity in the browser that opens. Sign out first if it is the wrong account.
4. Review the access Sprid requests, then authorize Sprid.
5. Return to Sprid and confirm the connected Pinterest name.
6. Open a post, select **Publish → Pinterest**, then confirm the intended destination in the **Board** picker. If none fits, select **Create board**, name it and choose whether it is public or secret. Sprid selects the new board automatically.

Connecting one Pinterest account does not connect another account signed in under the same browser. Repeat the command for each Sprid account and check the destination every time.

## Check the connection

Run `sprid status` and confirm that Pinterest shows the intended account. Open a draft Pin, select **Publish → Pinterest**, and confirm that its intended board appears before approving any schedule.

The first public Pin is the final check: after it publishes, open Pinterest while signed out or from another account and confirm the Pin, board, visual, title and destination. A successful API response alone does not prove public visibility.

## Trial and Standard access

Pinterest gives developer integrations Trial access for testing and Standard access for production. Sprid lets you connect an account and browse its boards while its app has Trial access, but it refuses both publishing and scheduling. Publishing becomes available only after **Sprid’s** Pinterest app has Standard access.

This is Sprid’s operational approval, not an application each customer completes. If Sprid reports that Pinterest publishing requires Standard access, keep preparing and reviewing drafts, but do not treat them as booked. Reconnecting your account will not change the access tier. Follow the status message or contact Sprid support.

## Prepare the account

Use a business account when you need analytics. Create a small set of specific boards around topics people actually search for, such as “Small apartment viewing checklist” instead of “Inspiration”. Board names, descriptions and the Pins saved to them help establish context.

Claim an owned website in Pinterest when possible. Claiming associates Pins from that site with the profile and expands website analytics. One website can be claimed by only one Pinterest account, so decide which market or brand account owns it before connecting several accounts in Sprid.

Read [Pinterest content and publishing](https://sprid.studio/docs/pinterest) before preparing the first batch.

## If it fails

- **“Pinterest is unavailable until API credentials and an access tier are configured”:** this Sprid deployment is not ready for Pinterest. The customer does not create a developer app or provide credentials; follow Sprid’s availability status or contact support.
- **Wrong Pinterest account connected:** disconnect it in Sprid, sign out of Pinterest in that browser, then run the command again and check the identity before authorizing.
- **“No Pinterest boards yet”:** create one from the board picker. If Sprid asks for board permission, reconnect Pinterest once; connections made before board creation support do not carry the required write scope.
- **Existing boards are missing:** reconnect once, then contact [Sprid support](mailto:hello@sprid.studio) with the account name and error message if they still do not appear.
- **Access denied:** confirm that the Pinterest account is active and that you completed the consent screen. Retry once; if Pinterest still refuses access, contact Sprid support.
- **Publishing or scheduling requires Standard access:** the account can remain connected and its boards can still be selected during setup. Sprid will not create Trial-access Pins. Only Sprid can resolve its developer access tier.
- **Analytics unavailable:** use a Pinterest business account and check that the Pin is public. Treat unavailable data as unavailable, never as zero.

## Sources

- [Pinterest developer access tiers](https://developer.pinterest.com/docs/key-concepts/access-tiers/)
- [Pinterest developer guidelines](https://policy.pinterest.com/en/developer-guidelines)
- [Claim your website](https://help.pinterest.com/en/business/article/claim-your-website)
- [Pinterest Analytics](https://help.pinterest.com/en/business/article/pinterest-analytics)
