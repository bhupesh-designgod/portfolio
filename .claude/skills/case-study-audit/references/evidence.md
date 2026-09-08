# Evidence

Copy makes the argument. Evidence is why anyone believes it. This half of the audit is the one most case studies fail and almost nobody asks about.

## The derivation chain

Every artifact on the page should answer three questions without the reader having to ask:

1. **What came before this?** The sketch, the rejected version, the thing it replaced.
2. **What changed it?** A test finding, a constraint, a conversation, a technical limit.
3. **What did it change?** The next screen, the flow, the scope.

A final screen with none of these is decoration. A final screen with a rejected version beside it and one sentence about what the change cost is an argument. This is the single highest-leverage fix in most case studies, and it usually costs nothing to make — the artifacts already exist in the file history, they just never got shown.

**The audit pattern for this:**

> **On this slide:** a high-fidelity screenshot of the trainer's client detail view.
> **Taken on faith:** that the three-tab structure was reasoned rather than assumed. The reader has no way to know what else was considered.
> **Add:** the single-scroll version you tried first, at half size beside it, with one line — what broke when everything was on one page.
> **Source:** likely already in the Figma page history or an earlier frame; no new work needed.

Always say whether the artifact already exists, needs assembling from existing material, or needs making from scratch. That's the difference between a suggestion someone acts on and one they don't.

## What each section owes the reader

**Opening / overview** — one image that shows what the thing is. Not a mood board, not a logo. A reader who leaves after ten seconds should still know what product this was.

**Problem space** — evidence that the problem is real and not assumed. A screenshot of the actual mess (the chat thread, the spreadsheet, the scattered files), a quote with attribution, a count of something. The most convincing artifact here is usually the artifact of the old way of working, photographed as it was.

**Strategy / goal** — the constraint made visible. A scope line, a phasing diagram, a list of what was deliberately not built. "What we cut" is more persuasive than "what we planned."

**Information architecture** — the structure as a diagram, and ideally the structure you rejected. IA slides that show only the final tree are the most common place a reviewer learns nothing.

**User flows** — the flow, annotated at the two or three points where a decision was made. An unannotated flow diagram is wallpaper; nobody reads the boxes.

**Feature / module breakdown** — screens grouped by job, not by screen order. And states: empty, loading, error, first-run. Showing an empty state is one of the fastest ways to signal that someone thought past the happy path.

**Design system** — evidence of a system rather than a style. Tokens, a component with its variants, one page showing the same component doing three jobs. A colour palette swatch strip proves nothing.

**Key decisions** — the rejected option, visually, beside the chosen one. If a decision has no visual, it should have a small diagram or a before/after. A decision slide that is pure text is a missed opportunity, because the comparison is the whole point.

**Outcomes** — the measurement, or an honest statement that measurement wasn't possible plus what you'd measure and how. A projected number labelled as projected is fine. An unlabelled one is a liability.

**Reflections** — usually needs no artifact. If it has one, it should be the thing you'd do differently, drawn.

## Standard artifacts that are usually missing

Check for these specifically. Most case studies are missing at least four:

- Rejected alternatives, shown rather than described
- Empty, error, loading, and first-run states
- The old way of working, captured as it actually looked
- Annotated flows (annotation at the decision points, not labels on boxes)
- Before/after pairs for anything described as an improvement
- Anything at real device scale — a screen shown at laptop scale hides what a thumb can reach
- A single diagram that explains the system, for anyone who won't read the text
- Captions that say what to notice

## Suggesting new artifacts

When suggesting something that needs making, keep it proportionate. Name the artifact, the rough effort, and what it buys:

- *"A three-up of the nav structures — 20 minutes in Figma, and it turns your strongest decision from a claim into a comparison."*

Don't suggest work that costs more than the score it moves. Three well-chosen additions beat a list of twelve.

## Layout and format notes

These come up often enough to check every time:

- **One idea per slide.** Two ideas on a slide means the reader gets neither.
- **Text blocks over ~120 words** on a single slide will not be read. Split or cut.
- **Images without captions** get skipped. Every one, no exceptions.
- **Consistent slide anatomy** — title in the same place, body in the same place, image area in the same place. Inconsistency reads as carelessness even when the content is strong.
- **Contrast and size** — if body text is below ~24px on a 1920px slide, or lighter than about 60% black, it won't survive being viewed on a shared screen or a projector.
