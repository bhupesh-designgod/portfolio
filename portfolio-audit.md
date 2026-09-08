# Portfolio audit

Four case studies plus the site copy, scored against the seven-dimension rubric.
Overall score per case study is the average of its **two lowest** dimensions,
because a reviewer's impression is set by the weakest argument.

Audited 8 September 2026.

---

## Scores

| Dimension | TBS app | TBS dashboard | Ikarus Nest | Ikarus Delta |
|---|:--:|:--:|:--:|:--:|
| 1. Claim integrity | 10 | 10 | 9 | **5** |
| 2. Specificity | 10 | 9 | 9 | 8 |
| 3. Decision visibility | 9 | 10 | **6** | 8 |
| 4. Plain language | 9 | 9 | 9 | 9 |
| 5. Human voice | 10 | 9 | 8 | 9 |
| 6. Evidence pairing | 8 | 9 | 7 | 7 |
| 7. Scannability | **6** | **6** | **6** | **6** |
| **Overall** | **7.0** | **7.5** | **5.5** | **5.5** |

The writing is genuinely good — plain language and human voice are 8–10 across
all four, which is rare. Three things are holding the scores down, and only one
of them is a writing problem.

---

## The one thing to fix before sending this anywhere

### Ikarus Delta claims four numbers it cannot source, for a period after you left

This is the hard gate. Everything else in this audit is improvement; this one is
exposure.

The case study claims:

- "Build time fell by 70%"
- "On-time delivery went from 40% to 90%"
- "Around 60% of a developer's day went on rebuilding functionality"
- "Ten to fifteen rounds of revision" (this one is fine — it is a description of
  a process, not a measurement)

None of the first three carries a source. Worse, the case study also says you
were on the project **five weeks of three months**, leaving on 4 July. The
outcomes describe a platform that landed after that. A reviewer who reads
carefully — and the ones you want will — arrives at one question:

> "You say build time dropped 70%. Who measured that, how, and were you there?"

If the answer is "the team told me afterwards", that is a completely fine
answer **as long as the page says so**. Right now the page does not, so the
numbers read as yours to defend.

The fix is not to remove them. It is to attribute them. Three examples of the
shape, using facts I do not have and cannot invent:

- "Build time fell from three weeks to seven days, per the team's own tracking
  after launch. I had left by then; this is what they reported back."
- "On-time delivery went from 40% to 90% — the PM's figures from the project
  tracker, measured over the first N projects."
- "Around 60% of a developer's day, from the developers' own estimate in
  discovery."

**I need from you, for each of the three:** who produced the number, from what,
and over what period. If any of them was an estimate rather than a measurement,
say estimate. A sourced estimate is stronger than an unsourced fact.

The same check, more mildly, applies to "about thirty clients" in both TBS case
studies. It is almost certainly the trainer's own count — say so once, and it
stops being a number a reviewer can poke.

---

## Scannability — 6 across all four, and the cheapest score to move

Read only the section titles of any of the four case studies:

> Overview · My role · The problem · The goal · What research changed · How the
> app is organised · The three key flows · Screen by screen · Design language ·
> Decisions and trade-offs · Outcomes · What I learned

That is a table of contents. It tells a reviewer the *shape* of a case study,
not the *story* of one. Most reviewers never get past this pass.

The frustrating part is that the pointed titles already exist in your writing —
they are just one level down, as callouts:

- "Recency set the order of his day. Silence has no notification."
- "Home is not a menu."
- "Automate the admin. Protect the contact."
- "Review it where it will actually live."
- "The ceiling was never demand. It was one person's working memory."
- "WhatsApp wasn't broken. It was the wrong place to keep a plan."

Any one of those is a better section title than the label above it. The fix is
promotion, not writing: move the line that already carries the point up into the
heading, and let the label become a small kicker above it if you want the
navigational cue kept.

The contents rail complicates this — it reads section titles, and long ones will
wrap. Two options, and this is a real choice rather than an obvious one:

1. **Keep the rail short, make the page titles long.** The rail shows "The
   problem"; the page shows "Recency set the order of his day". Needs a
   `navTitle` field in the frontmatter and a change to how the rail is built.
2. **Make both long.** Simpler, and the rail becomes an argument you can read
   top to bottom. Costs vertical space in the rail.

Tell me which and I will do it.

### The `Goal / What I did / What I found / What it changed` block

This four-row block appears **twelve times** across the four case studies. It is
a framework showing through the writing — the reference material calls this out
specifically, and a reviewer reading two of your case studies back to back will
see the same scaffold six times.

It works well the first time. Consider varying it: keep it where the four rows
genuinely each carry something, and collapse it to prose where one or two rows
are doing all the work.

---

## Ikarus Nest — decision visibility, 6

Nest is the only one of the four where **no rejected alternative appears
anywhere in the design sections.** The three decisions are argued forwards —
here is what I chose and why it works — but the obvious rival option is never
named, so a reader cannot tell whether it was considered or missed.

Compare with the TBS dashboard, which scores 10 here because it *shows* two
finished directions that did not ship, and says why each lost. That is the
single strongest thing in your whole portfolio and it is worth copying.

Nest does have one genuine explored-and-abandoned approach already written up —
the anti-piracy pipeline (non-downloadable licences → cloud slicer → wifi
sender), with three documented reasons it failed. But that is a *product*
reversal, covered at length in two sections. It is not a *design* alternative,
and it does not tell a reviewer how you choose between two layouts.

**I need from you:** on the marketplace screens — Explore, the model page, the
campaign builder — was there a version you drew and rejected? Even a rough one.
If the answer is genuinely no, say so and I will leave this alone rather than
manufacture a comparison. A 6 with an honest explanation beats a 9 built from
something that did not happen.

---

## Evidence gaps

Ranked by what they buy relative to the work.

**1. Rejected versions, shown, on Nest and Delta.** — *Nest: unknown whether
they exist. Delta: the wireframes exist already.* Delta says "each screen went
through a wireframe, a round of annotated critique, and a rebuild", and shows
wireframes — but never a before/after pair. Putting one wireframe beside its
final screen with one line on what the critique changed converts a claim into a
demonstration. The artifact already exists in the file.

**2. The old way of working, photographed as it was.** — *Needs checking
whether it exists.* All three of TBS, TBS dashboard and Delta describe a mess
that lived somewhere real: a WhatsApp thread with meal plans as attachments, a
spreadsheet the artists tracked projects in. A redacted screenshot of the actual
thread is the most persuasive single artifact available to the TBS case studies
and neither of them has it. If it exists and is shareable, it is worth more than
any diagram of it.

**3. Anything at real device scale.** — *20 minutes.* The TBS client app is
designed for "a gym before sunrise, in bad light, for thirty seconds at a time"
and is shown at laptop scale. One screen in a hand, at size, proves the thumb
reach that the copy asserts.

**4. Delta's before/after is a table where it should be a picture.** — *Exists
already.* The loop-versus-line comparison ("Model, review, implement, discover
the mismatch, go back" → "Upload → connect → controls → publish → share") is the
whole argument of the project and it is currently set as text. Drawn as two
small diagrams it would be the thing people remember.

Everything else is well covered. Empty states, error states and first-run states
are all present and called out — that is unusual and it reads well.

---

## Read twice before publishing

- **Delta's four unsourced numbers, for a period after you left.** Covered
  above. This is the one.
- **Client identifiability.** "TBS" plus "a fitness creator with 404k followers
  on Instagram" identifies the client to anyone who cares to look. Nest names
  Ikarus 3D and the product. Delta names Ikarus Delta and describes internal
  process problems and delivery rates. Do you have clearance for all three? This
  is a question about your agreements, not about the writing.
- **Other people's revenue, from interviews.** Nest cites artists who raised
  "$250,000 to $680,000" on Kickstarter and MyMiniFactory. Those are real
  people's earnings, given to you in a research conversation. Kickstarter totals
  are public, so this is probably fine — but it is worth being sure you would be
  comfortable if the artist read the page.
- **Role claims are clean.** Genuinely — this is handled better than most
  portfolios. Delta credits Dipanshu and states the five-week window. Nest says
  "the research was the team's work" and uses *we* for research, *I* for design.
  TBS is precise about the PM's role. Nothing here overstates.
- **The reflections demonstrate rather than confess.** All four name a specific
  thing that went wrong, what it cost, and what changed. "Design for a sparse
  marketplace, not just an empty one" is the best of them.

---

## If you only fix three things

**1. Source Delta's numbers, or cut them.** — *One paragraph, once you have the
facts.* Moves claim integrity from 5 to 9, which moves that case study's overall
from 5.5 to about 7.5. It is also the only item on this list that is a liability
rather than an improvement.

**2. Promote the pointed lines into the section titles.** — *An hour, plus the
contents-rail decision.* Moves scannability from 6 to 8–9 on all four at once.
The lines already exist; this is copy-paste and a frontmatter field. Best
score-per-minute in the audit by a wide margin.

**3. Put one rejected version beside its final screen, on Nest and Delta.** —
*Delta's already exists; Nest needs your answer first.* Moves Nest's decision
visibility from 6 to 8 and evidence from 7 to 8, taking its overall from 5.5 to
roughly 7.5.

Doing all three would put the portfolio at roughly **7.5–8 across the board**,
with the TBS pair at 8+.

---

## Site copy

Not scored — the rubric is built for case studies — but three notes.

**The About page is strong.** Present / past / future, plain language, and "No
invented numbers" stated as a working principle. Leave it alone.

**The hero sub-line and the About page make slightly different claims about
scope.** The hero says "a coaching platform, a marketplace for 3D-printable
files, and an internal tool". About says "at Ikarus 3D ... and on Nest". A
reviewer reading both sees three projects in one place and four in another,
because the two TBS case studies count as one thing in the hero. Not wrong, just
worth deciding which count you want front of house.

**Four case studies is one more than the reference recommends** (three to five
is the range, three is the recommendation, and cutting the weakest beats
shortening the best). The two TBS ones are the strongest and are explicitly
linked as two ends of one project — they earn their place. If you ever need to
cut, the honest question is whether Delta at 5.5 is helping, and the answer
changes entirely once its numbers are sourced.
