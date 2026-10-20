# Standing rules and corrections

An agent's first draft of a new format is usually generic. The person narrows it,
cuts it and sharpens it until it has a character of its own. Those corrections
are the most valuable thing a session produces, and they are lost if the next
round starts from the same blank page. Load them before drafting; write new ones
back where the next round will find them.

## Load before drafting

Before drafting anything a customer will see (a post, a reel or explainer script,
a page, a listing, screenshot copy, an email), find the rules that already exist:

- `marketing/VOICE.md` and any voice, copy or positioning guide.
- Pointers in `CLAUDE.md` or `AGENTS.md` to marketing, design or writing docs.
  Follow them; a repository rarely keeps its rules where a skill would guess.
- Per-format files, such as a format's README with a lessons or rules section,
  a visual-language note, or a fact and writing rules document.
- Rules enforced in code: a pronunciation lexicon, a banned-phrase list, a
  publish gate. Read what they enforce so a draft does not fight them.
- Accepted guidance from Sprid (`resolve_marketing_guidance`) and accepted
  examples for this account.

Start the brief with the files you loaded, one line each. Name a pointer whose
file is missing. When the work goes to a subagent or a build tool, pass the rules
and the acceptance criteria verbatim; a summary loses the specific thing that
was corrected.

## Write corrections back

When the person rejects or corrects a draft, find the reason. Ask once if it is
not evident. A one-off edit changes this artifact only. A correction that should
hold next time becomes a rule:

- Propose the rule in one line with its scope (this format, this account, every
  format) and a before/after example from this session.
- On acceptance, add it to the existing file for that scope, dated, with its
  reason. Add to an existing file before creating a new one.
- A rule from taste is a hypothesis until results support it. Where the format
  keeps a results log, link the rule to the read that tests it.

Keep accepted rules in Sprid as well, so a hosted run, the app and agents
without the repository load the same ones: save them with
`save_marketing_document` as a `guidance` document per scope (append the dated
rule; the revision increments), then accept that revision with
`accept_marketing_decision`, whose `patch.guidanceBindings` is the full list
with this document's binding moved to the new revision. Before drafting,
`resolve_marketing_guidance` returns the accepted rules; a `newer_revision`
conflict means someone edited a rule after it was accepted, so ask before
following the edit.

A revision fixes what the acceptance list and the correction name. It does not
regenerate the whole piece, which reintroduces what was already fixed.

## Before calling it ready

Check the draft against every loaded rule and list any you knowingly broke with
the reason. A draft that repeats a correction from an earlier round is not ready.
