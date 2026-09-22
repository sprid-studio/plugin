# Create your social accounts

**What Sprid does with this:** Connect your brand, creator and other social accounts to their own publishing destinations, so approved content reaches the intended audience.

## You need

- The email address that should own the accounts, access to its inbox, and your phone for verification.
- Your chosen account names, handles and the purpose of each account. Handles are proposals until the platform confirms them.
- Access to your existing Meta business portfolio if it should own the Facebook Pages and Instagram accounts.

Keep passwords, verification codes and identity documents in the platform’s own browser or app. An agent can prepare forms and continue after you sign in.

## Set up your account map

You can connect one main account or several accounts with different purposes. A side account might share educational content, follow a character or cover a topic separately from your main brand.

| Account purpose | Example display name | Example handle | Sprid publishing account |
|---|---|---|---|
| Main brand or product | Your Brand | yourbrand | yourbrand |
| Founder or creator | Alex from Your Brand | alexfromyourbrand | brand-founder |
| Character or persona | Everyday Alex | everydayalex | everyday-alex |
| Topic or community | Small Space Ideas | smallspaceideas | small-space-ideas |
| Campaign or project | The Weekend Project | theweekendproject | weekend-project |
| Language or regional audience | Your Brand Español | yourbrand.espanol | brand-spanish |

These describe what you publish. They are separate from platform settings such as Instagram’s Business or Creator account type, or Google’s Brand Account. A character account can represent a fictional persona; keep that identity clear in its profile.

Choose the accounts that serve your audience. You do not need every type or every platform. For each identity, write down the owner, purpose, desired handle and platforms. Add language or region only when relevant. The examples are naming ideas, not availability checks.

Group matching profiles across platforms under one Sprid publishing account. For example, your main brand’s Instagram and YouTube can share a destination, while a founder’s account has its own. This keeps content and connections attached to the identity that will publish them.

Use the same owner email and existing business portfolio where appropriate. An Instagram login, a Facebook Page, a Meta business portfolio and a Sprid publishing account are separate objects. Connecting a channel to Sprid does not transfer its ownership to a portfolio.

Your agent can inspect `sprid apps` and reuse existing publishing accounts. Missing destinations can be created with `sprid account create --file account.json`; see the [CLI reference](https://sprid.studio/docs/cli). A Sprid destination does not reserve a handle or create a social account.

## Set up Instagram

1. Open [Instagram signup](https://www.instagram.com/accounts/emailsignup/). Reuse an existing account if it already serves the intended purpose.
2. Enter the owner email, display name and desired handle. Complete the password, birthday and any verification in Instagram itself.
3. Check the profile’s actual handle and account contact email. Do not assume the requested handle was accepted.
4. Use a Business or Creator account. Choose Business for a business or brand, or Creator for a creator-led account. Select a category that describes the account.
5. If you use a Meta business portfolio, have its administrator add the Instagram account there and verify who has control. This is separate from Sprid authorization.
6. Follow the [Instagram connection guide](https://sprid.studio/docs/connect/instagram), one account at a time.

The browser connection may offer professional-account conversion directly: **Change → Business → Next → category → Done → Continue**. These labels were observed in September 2026 and may vary. If creating an additional account takes you back to login, finish signup in a separate browser session or the Instagram app; keep the working account signed in.

## Set up Facebook

Reuse any existing Page before creating another. For a new Page, open [Create a Page](https://www.facebook.com/pages/create/) under the profile that should manage it. Use the chosen public display name. If a business portfolio should own the Page, have its administrator add or claim it there.

Follow the [Facebook connection guide](https://sprid.studio/docs/connect/facebook). If your profile manages several Pages, choose the specific Page returned by the connection flow. The Facebook profile’s name is not the Page destination.

## Set up YouTube

Sign in to [YouTube’s channel list](https://www.youtube.com/channel_switcher) with the intended owner’s Google account. Review existing channels, then choose **Create a channel** for each additional identity or audience you want to publish as. Check both the channel name and handle.

If YouTube asks for advanced-feature verification, the account owner completes the offered verification in YouTube Studio. A submitted video or ID can remain under review. Continue other platforms while approval is pending, then recheck eligibility before retrying channel creation. Do not assume an existing channel’s approval has unlocked every new channel. [YouTube explains eligibility and owner verification](https://support.google.com/youtube/answer/9891124?hl=en).

Once the channel exists, follow the [YouTube connection guide](https://sprid.studio/docs/connect/youtube) and choose that exact channel in Google’s authorization screen.

## Set up TikTok

Create or sign in to each intended account in TikTok. Confirm the handle and owner’s recovery access, then follow the [TikTok connection guide](https://sprid.studio/docs/connect/tiktok). Complete any verification yourself. The agent can resume the connection afterward.

## Then run

```sh
sprid connect instagram --account yourbrand
```

Repeat with the actual Sprid publishing-account slug and platform: `instagram`, `facebook`, `youtube` or `tiktok`. Connect only accounts that already exist.

If your agent uses a separate browser session, it can run the command with `--no-browser` and open the returned authorization link in the session signed in to the correct account. Keep that temporary link private. This avoids opening another account’s login in your default browser.

## How to check it worked

Run `sprid status --json` and match the returned platform identity to the intended Sprid publishing account. Record these separately for each platform:

- Account created, with its confirmed handle or Page/channel ID.
- Owner and business-portfolio access checked.
- Any provider verification or tester invitation still pending.
- Sprid connection saved for the correct destination.
- Publishing tested with explicitly approved content, or still untested.

An authorization screen saying you allowed access is not proof that Sprid saved a connection. A connected channel is not proof that a post was delivered. Check the platform itself when you authorize a publishing test.

## If it fails

- **Another account appears in authorization:** cancel. Sign in to the intended account and restart the connection. Do not move a working channel just to clear the error.
- **Several Facebook Pages are listed:** rerun with `--page <id>` using the intended Page’s returned ID.
- **YouTube verification is pending:** leave its destination pending and continue another platform.
- **Instagram authorization succeeds but Sprid reports a token-exchange error:** save the error message and contact [Sprid support](mailto:hello@sprid.studio). Sprid must check its Meta permissions and any tester restrictions. You do not need to create your own developer app. A tester invitation, if required, comes from Sprid and must be accepted by the intended Instagram account.
- **The CLI points to an unavailable local server:** inspect `sprid whoami --json`. For production, use a command-scoped `SPRID_URL=https://api.sprid.studio` and retry. Do not change credentials or another workspace to solve a server-address mismatch.

## Sources

- [Instagram signup](https://www.instagram.com/accounts/emailsignup/)
- [Instagram Business Login](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/business-login/)
- [Meta app modes](https://developers.facebook.com/docs/development/build-and-test/app-modes)
- [Meta Accounts Center](https://www.facebook.com/help/943858526073065)
- [Create a Facebook Page](https://www.facebook.com/pages/create/)
- [YouTube channel list](https://www.youtube.com/channel_switcher)
- [YouTube feature eligibility](https://support.google.com/youtube/answer/9891124?hl=en)
