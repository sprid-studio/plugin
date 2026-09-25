# GitHub

**What Sprid does with this:** See how many people view and clone your repository each day, where they came from, which pages they read, and how stars, forks and watchers move.

GitHub only keeps traffic for 14 days, then deletes it. Sprid reads the window every day and keeps it, so your history starts the day you connect and never runs out.

## You need

A **token that can read traffic** on the repository, and **push access** to it yourself. GitHub shows traffic only to people who can write to a repo, whatever the token says.

Checked against GitHub's permissions reference on 2026-09-25: all four traffic endpoints need the fine-grained permission **Repository permissions → Administration: Read-only**. A classic token needs the `repo` scope.

## Click path

1. Open [GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens](https://github.com/settings/personal-access-tokens) and choose **Generate new token**.
2. Name it `sprid`. Pick an expiry date; Sprid tells you when the token stops working.
3. **Resource owner:** the account or organization that owns the repo.
4. **Repository access → Only select repositories**, and pick the repos you want measured.
5. **Permissions → Repository permissions → Administration → Read-only.** Metadata switches itself to Read-only; leave everything else off.
6. **Generate token**, copy it and leave it on your clipboard. GitHub shows it once.

In an organization, an owner may have to approve the token before it works. Until they do, the read fails with the permission message below.

## Then run

```
sprid connect github --key-from-clipboard --repo your-org/your-repo
```

Several repos: `--repo your-org/app,your-org/site`. The list replaces the one already saved, so name every repo you want kept. A pasted `github.com` URL works too.

Sprid reads the key from your clipboard, saves it and clears the clipboard, so it never shows on screen or lands in a file. Working with an agent? Tell it the token is copied and it runs this for you. Typing it yourself, copy the token last: paste the command into your terminal first, then copy the token, then press Enter. If the clipboard still holds the command, Sprid refuses it; copy the token and run it again. Without clipboard access (a remote shell), save the token to a file and pass `--key <file>` instead.

## How to check it worked

Run `sprid status`. The first read lands within the hour; then ask your agent: “Show this app’s GitHub views and clones for the last 7 days through Sprid.” A saved token confirms setup; only the read confirms access.

## If it fails

- **Rejected the token:** it expired, was revoked or was mistyped. Fine-grained tokens expire on the date you set. Create a new one and run the command again.
- **Cannot read traffic:** the token is missing **Administration: Read-only**, or you have read access to the repo but not push access. In an organization, check whether the token is waiting for an owner's approval.
- **Cannot see that repository:** the name is wrong, or the repo is private and not among the token's selected repositories. GitHub answers both the same way.
- **Rate limited:** another tool is using the same token heavily. Nothing is lost: GitHub still holds 14 days, and tomorrow's read catches up.

## What Sprid can and cannot read here

Views and clones per day, with GitHub's own daily unique counts; the top 10 referring sites and the top 10 pages over GitHub's 14-day window; stars, forks and watchers.

Views and clones add up across days and repos. Unique visitors do not: someone who cloned on three days is three daily uniques but one unique over the window. So Sprid reports period totals as counts, and shows unique people only as GitHub's own 14-day figure.

A clone is not an install. CI runs, mirrors and bots clone too, and one install can clone more than once. Treat clones as an upper bound that moves with real interest.
