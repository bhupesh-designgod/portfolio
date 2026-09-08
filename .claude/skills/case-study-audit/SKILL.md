---
name: case-study-audit
description: Audit and level up a product design portfolio case study — score it against a rubric, rewrite weak copy into plain human language, and suggest what visual evidence is missing (e.g. a screenshot shown with no explanation of how it was arrived at). Use this whenever the user mentions their portfolio, a case study, case study copy, portfolio slides, a Figma deck of their work, "does this read well", "is this good enough to send", or asks for feedback on how they've written up a project — even if they don't say the word "audit". Also use it before they publish or share a case study with recruiters.
---

# Case Study Audit

Two jobs, always run in this order:

1. **Copy** — is every sentence true, specific, plain, and human?
2. **Evidence** — does the reader have any reason to believe it, and is anything obviously missing from what's being shown?

Most case studies fail on #2 more badly than #1, and #1 is what people ask about. Do both anyway.

## The bar

A case study is not a description of work. It is an argument that the person who made it can be trusted with a harder problem. Every slide either advances that argument or is padding.

Reviewers spend 2–3 minutes on a case study and 10–15 seconds on the first screen. Assume the reader is skimming, intelligent, tired, and slightly sceptical. Write for that person.

## Step 0 — Get the source material

The copy might be in a few places. Handle whichever applies:

- **Figma** — if a Figma MCP is connected, call `get_metadata` on the file first to see every frame and its name, then `get_design_context` on individual frames to read the actual text. Pass `excludeScreenshot: true` when you only need copy; leave screenshots on when auditing layout or evidence. Frames are usually one slide each.
- **Local files** — markdown, docs, or a repo folder. Read them all before commenting on any one of them.
- **Images or a live URL** — read what's visible and say plainly what you can't see rather than guessing.

Read the **whole** case study before writing a single note. A slide that looks weak alone is often carrying a point set up three slides earlier, and a slide that looks strong alone is often repeating one. You cannot judge either in isolation.

## Step 1 — Score it

Score each dimension 1–10 and give the case study an overall score (the lowest two dimensions, averaged — a case study is as good as its weakest argument, not its best sentence).

Read `references/rubric.md` for what each score means. The seven dimensions:

| # | Dimension | The question it answers |
|---|---|---|
| 1 | Claim integrity | Is every claim traceable to something that actually happened? |
| 2 | Specificity | Numbers, names, constraints — or generic design vocabulary? |
| 3 | Decision visibility | Are rejected alternatives and trade-offs on the page? |
| 4 | Plain language | Could a smart twelve-year-old follow it without re-reading? |
| 5 | Human voice | Does it sound like a person who was there, or like a template? |
| 6 | Evidence pairing | Does each claim have the artifact that proves it, next to it? |
| 7 | Scannability | Do the titles alone tell the story? |

Report the scores in a small table at the top, then explain only the ones below 8. Don't pad an audit by explaining what's already working — one line of "these are fine" is enough.

## Step 2 — Audit the copy

Go slide by slide. For each problem, output exactly this shape:

```
### [Slide name]
**Problem:** [one sentence — what a reader would think, not what rule was broken]
**Line:** "[the exact text at fault]"
**Fix:** [the rewritten line, OR a question if the fix needs a fact you don't have]
```

Two rules govern which of those last two you produce, and they matter more than anything else in this skill:

**Never invent a fact.** Not a metric, not a user quote, not a number of interviews, not a percentage, not a timeline. If the copy is weak because information is missing rather than because the phrasing is clumsy, do not paper over it with a smoother sentence — ask for the missing fact. A fabricated detail in a portfolio is the single worst outcome of this skill, because the user will get asked about it in an interview and will not know the answer.

**Ask before rewriting anything in first person about who they are.** Headline, about section, positioning lines, reflections — these carry the user's own voice and judgement about themselves. Ask the question that surfaces the raw material, let them write their version, then edit and pressure-test what they wrote. Pre-written drafts and option menus for these sections do more harm than good; the user stops thinking and starts picking. Descriptive copy about the product, the problem, the flows, and the decisions is different — rewrite that directly.

Batch questions rather than asking one at a time. Roughly half a case study's worth of questions per turn is right.

Read `references/copy-craft.md` for the rewrite patterns, the plain-language test, and the specific words and constructions to strip out.

## Step 3 — Audit the evidence

This is the half people skip. For each slide, ask three questions:

1. **What is shown?** A screenshot, a flow, a diagram, nothing.
2. **What does the reader have to take on faith?** If a final screen appears with no path to it, the reader is being asked to trust that it was designed rather than decorated.
3. **What would make it undeniable?** Name a specific artifact, not a category. "The two nav structures you rejected, side by side with the chosen one, one line each on why" — not "consider adding more process."

The core idea: **every artifact needs a derivation chain.** For each thing shown, the page should make clear what came before it, what changed it, and what it changed. A screenshot with no before, no alternative, and no consequence is a picture. A screenshot with a rejected version beside it and a sentence about what the change cost is an argument.

Read `references/evidence.md` for what each section of a case study owes the reader and the standard artifacts that are usually missing.

## Step 4 — Suggest, don't restructure unasked

End the audit with a short **"If you only fix three things"** list, ordered by how much the score moves. Big structural suggestions (merge these four slides, cut this section, split this into two case studies) go here as proposals with a one-line rationale — never applied silently.

## Structural reference

If the case study has no clear section structure, or the user asks what the standard structure is, read `references/structure.md`. It covers the eleven-section product case study shape, what each section is for, and where flexibility is fine versus where skipping a section reads as a gap.

## Things that quietly work against the person

Flag these on sight, in a short section at the end of the audit called **"Read twice before publishing"**:

- Claims that overstate the role — "I led" when it was a team of three, "we shipped" when it was a prototype, engineering claims from someone who prototyped with AI tooling.
- Metrics with no source. A number in a portfolio invites the question "how did you measure that?"
- NDA or client-confidentiality exposure — real client names, revenue figures, internal screenshots.
- Blame aimed at a client, a PM, or a previous designer. Reviewers read it as how the person will talk about them.
- Reflections that confess a weakness with no evidence it was fixed.
- Anything the user has previously said they don't want to sound like — check for it, don't reintroduce it.

## Output

Write the audit to a markdown file next to the source (`<case-study-name>-audit.md`) and summarise the scores plus the top three fixes in the reply. Don't paste the whole audit into chat as well as the file.

If the user asks for the rewrite pass afterwards, apply the fixes back to the source — Figma via MCP, or the markdown file — one section at a time, showing what changed before moving on.
