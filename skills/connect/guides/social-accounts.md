# Create your social accounts

**What Sprid does with this:** Connect your brand, creator and other social accounts to their own publishing destinations, so approved content reaches the intended audience.

## You need

- The email address that should own the accounts, access to its inbox, and your phone for verification.
- The display name, desired handle and purpose of each account. A handle is only a proposal until the platform accepts it.
- Access to your Meta business portfolio, if it should own the Facebook Pages and Instagram accounts.

Passwords, verification codes and identity documents stay in the platform’s own browser or app. An agent can prepare forms and continue after you sign in.

## Set up your account map

Connect one main account, or several with different purposes. Choose only the accounts and platforms your audience needs.

| Account purpose | Example display name | Example handle | Sprid publishing account |
|---|---|---|---|
| Main brand or product | Your Brand | yourbrand | yourbrand |
| Founder or creator | Alex from Your Brand | alexfromyourbrand | brand-founder |
| Character or persona | Everyday Alex | everydayalex | everyday-alex |
| Topic or community | Small Space Ideas | smallspaceideas | small-space-ideas |
| Campaign or project | The Weekend Project | theweekendproject | weekend-project |
| Language or regional audience | Your Brand Español | yourbrand.espanol | brand-spanish |

The examples are naming ideas, not availability checks. The purpose is separate from platform settings such as Instagram’s Business or Creator type or Google’s Brand Account. A character account can represent a fictional persona; keep that clear in its profile.

For each identity, write down the owner, purpose, handle and platforms. Group the same identity’s profiles under one Sprid publishing account: your brand’s Instagram and YouTube share one, a founder’s account gets its own.

An Instagram login, a Facebook Page, a Meta business portfolio and a Sprid publishing account are separate objects. Connecting a channel to Sprid does not move its ownership into a portfolio, and a Sprid destination does not reserve a handle or create a social account.

Your agent can list existing publishing accounts with `sprid apps` and create missing ones with `sprid account create --file account.json` (see the [CLI reference](https://sprid.studio/docs/cli)).

## Set up Instagram

1. Open [Instagram signup](https://www.instagram.com/accounts/emailsignup/), or reuse an existing account that already serves the purpose.
2. Enter the owner email, display name and desired handle. Complete password, birthday and verification in Instagram.
3. Check the profile’s actual handle and contact email.
4. Switch to a professional account: **Business** for a brand, **Creator** for a creator-led account, with a matching category.
5. If a Meta business portfolio should own it, its administrator adds the account there. This is separate from Sprid authorization.
6. Follow the [Instagram connection guide](https://sprid.studio/docs/connect/instagram), one account at a time.

The Sprid connection may offer the professional switch itself: **Change → Business → Next → category → Done → Continue** (labels as of September 2026). If signing up an additional account sends you back to login, finish signup in a separate browser session or the Instagram app and keep the working account signed in.

## Set up Facebook

Reuse an existing Page where you can. Otherwise open [Create a Page](https://www.facebook.com/pages/create/) under the profile that should manage it, using the public display name. If a business portfolio should own the Page, its administrator adds or claims it there. Then follow the [Facebook connection guide](https://sprid.studio/docs/connect/facebook).

## Set up YouTube

Sign in to [YouTube’s channel list](https://www.youtube.com/channel_switcher) with the owner’s Google account. Review existing channels, then choose **Create a channel** for each additional identity. Check both the channel name and handle.

If YouTube asks for advanced-feature verification, the owner completes it in YouTube Studio (video, ID or channel history). Review can stay pending: continue other platforms and recheck eligibility before retrying. Approval on one channel does not unlock every new channel. See [YouTube eligibility and owner verification](https://support.google.com/youtube/answer/9891124?hl=en).

Then follow the [YouTube connection guide](https://sprid.studio/docs/connect/youtube) and pick that exact channel in Google’s authorization screen.

## Set up TikTok

Create or sign in to each account in TikTok, confirm the handle and the owner’s recovery access, and complete any verification yourself. Then follow the [TikTok connection guide](https://sprid.studio/docs/connect/tiktok).

## Then run

```sh
sprid connect instagram --account yourbrand
```

Use your Sprid publishing-account slug and the platform: `instagram`, `facebook`, `youtube` or `tiktok`. Connect only accounts that already exist.

In an agent-controlled browser, add `--no-browser` and open the returned authorization link in the session signed in to the correct account. Keep that link private.

## How to check it worked

Run `sprid status --json` and match each platform identity to its Sprid publishing account. Track per platform:

- Account created, with its confirmed handle or Page/channel ID.
- Owner and business-portfolio access checked.
- Provider verification or tester invitation still pending.
- Sprid connection saved to the correct destination.
- Publishing tested with approved content, or untested.

“You allowed access” on the authorization screen does not prove Sprid saved the connection, and a connected channel does not prove a post was delivered. Check the platform itself after a publishing test.

## If it fails

- **Another account appears in authorization:** cancel, sign in to the intended account and restart. Do not move a working channel to clear the error.
- **Several Facebook Pages are listed:** rerun with `--page <id>` using the intended Page’s returned ID.
- **YouTube verification is pending:** leave that destination pending and continue with another platform.
- **Instagram authorizes but Sprid reports a token-exchange error:** send the error to [Sprid support](mailto:hello@sprid.studio). Sprid checks its Meta permissions and tester restrictions; any tester invitation comes from Sprid and must be accepted by the intended Instagram account. You do not need your own developer app.
- **The CLI points to an unavailable local server:** check `sprid whoami --json`, then retry with `SPRID_URL=https://api.sprid.studio` for that command. Do not change credentials or workspaces to fix a server-address mismatch.

## Sources

- [Instagram signup](https://www.instagram.com/accounts/emailsignup/)
- [Instagram Business Login](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/business-login/)
- [Meta app modes](https://developers.facebook.com/docs/development/build-and-test/app-modes)
- [Meta Accounts Center](https://www.facebook.com/help/943858526073065)
- [Create a Facebook Page](https://www.facebook.com/pages/create/)
- [YouTube channel list](https://www.youtube.com/channel_switcher)
- [YouTube feature eligibility](https://support.google.com/youtube/answer/9891124?hl=en)
