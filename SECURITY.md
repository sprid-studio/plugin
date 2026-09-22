# Security

Email hello@sprid.studio with `security` in the subject. Please do not open a
public issue for anything exploitable. Say what you did, what happened, and
the plugin version. We reply within three working days. No bug bounty.

**In scope:** anything in a skill or bundled script that exposes a credential
(the keys under `~/.sprid/secrets/`, a token in the environment, a value in
`.sprid/app.json`) in output, a log, or a request to somewhere it does not
belong.

**Not a bug:** an agent reads the repository you point it at, so content that
talks an agent into something unwanted is a risk you carry with any agent. A
skill that sends a credential somewhere it does not belong is a bug.

Only the latest published version is patched.
