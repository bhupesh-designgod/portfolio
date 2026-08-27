---
client: TBS
title: A trainer dashboard that replaced one person's memory
heroTitle: Thirty cases, one memory
summary: >-
  The second surface of the TBS build. Every mechanic in the client app assumes
  somebody is on the other side of it — and he was running thirty people out of
  his own head.
tags: [Product strategy, Information architecture, Internal tools, Design systems]
tint: '#f1eee6'
accent: gold
folderTone: light
folderArt: /assets/projects/tbs-dash/queue.png
folderArtAlt: The TBS trainer dashboard, needs-you-today queue
costume: fitness
role: Product Designer
timeline: May – July 2026
cover: /assets/projects/tbs-dash/queue.png
coverAlt: >-
  TBS trainer dashboard — the landing view, sorted by who needs the trainer
  today
# 1.5 so this sits directly after the client app without renumbering the rest.
order: 1.5
---

<svg width="0" height="0" aria-hidden="true" focusable="false" style="position:absolute">
  <symbol id="i-grid" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></symbol>
  <symbol id="i-users" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.4"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16.5 5.2a3.4 3.4 0 0 1 0 6.6M17 14.2A6.5 6.5 0 0 1 21.5 20"/></symbol>
  <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.6"/><path d="M5 20a7 7 0 0 1 14 0"/></symbol>
  <symbol id="i-doc" viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></symbol>
  <symbol id="i-calendar" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></symbol>
  <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol>
  <symbol id="i-chart" viewBox="0 0 24 24"><path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 16v-4M13 16V8M18 16v-6"/></symbol>
  <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/></symbol>
  <symbol id="i-x" viewBox="0 0 24 24"><path d="M6 6 18 18M18 6 6 18"/></symbol>
  <symbol id="i-check" viewBox="0 0 24 24"><path d="m4.5 12.5 5 5 10-11"/></symbol>
  <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 2.5 20 6v6c0 5-3.4 8.4-8 9.5C7.4 20.4 4 17 4 12V6z"/><path d="m9 12 2 2 4-4"/></symbol>
  <symbol id="i-bulb" viewBox="0 0 24 24"><path d="M9 17.5a6 6 0 1 1 6 0V19a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 19z"/><path d="M10 22h4"/></symbol>
  <symbol id="i-eye" viewBox="0 0 24 24"><path d="M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="2.8"/></symbol>
  <symbol id="i-star" viewBox="0 0 24 24"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></symbol>
  <symbol id="i-target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/></symbol>
  <symbol id="i-phone" viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18.5h2"/></symbol>
  <symbol id="i-send" viewBox="0 0 24 24"><path d="M21.5 2.5 10.5 13.5M21.5 2.5 14.5 21.5l-4-8-8-4z"/></symbol>
  <symbol id="i-dumbbell" viewBox="0 0 24 24"><path d="M3 9v6M6.5 7v10M17.5 7v10M21 9v6M6.5 12h11"/></symbol>
  <symbol id="i-fork" viewBox="0 0 24 24"><path d="M7 2v7a2.5 2.5 0 0 0 5 0V2M9.5 11.5V22"/><path d="M17.5 2c-1.5 1.5-2 3-2 5.5s.7 3.5 2 3.5V22"/></symbol>
  <symbol id="i-list" viewBox="0 0 24 24"><path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/></symbol>
  <symbol id="i-layers" viewBox="0 0 24 24"><path d="m12 3 8.5 4.5L12 12 3.5 7.5z"/><path d="m3.5 12.5 8.5 4.5 8.5-4.5"/></symbol>
  <symbol id="i-bell" viewBox="0 0 24 24"><path d="M18 15V10a6 6 0 1 0-12 0v5l-1.5 3h15z"/><path d="M10 21h4"/></symbol>
  <symbol id="i-wand" viewBox="0 0 24 24"><path d="M4 20 16 8"/><path d="M14 3.5V7M20.5 10H17M17.5 3.5 15 6M20.5 15.5 18 13"/></symbol>
</svg>

## Overview

TBS is the coaching arm of a fitness creator with 404k followers on Instagram.
Clients arrive from a story, pay over WhatsApp, and get coached there — voice
notes, meal plans as files, calls at whatever hour they dial. It works, and it
stops working at about thirty people, because thirty is the point at which one
trainer's day fills up.

I joined as product designer to turn that practice into a product. It took
three surfaces: an **acquisition funnel** to bring the right clients in, a
**client app** to carry the daily habit, and a **trainer dashboard** to turn
conversations into structured work.

This case study is the dashboard — roughly 50 of the project's 60 screens, and
the surface everything else quietly depends on. Every mechanic in the client
app assumes somebody is on the other side of it: reading check-ins, writing
plans, answering. That somebody was running thirty people out of his own head,
and the app would have made his day worse before it made it better.

<div class="k-stats k-wide">
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-grid"/></svg></span><span class="k-stats__v"><b>~50</b><span>screens, of the project's 60</span></span></div>
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-list"/></svg></span><span class="k-stats__v"><b>5</b><span>destinations</span></span></div>
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-wand"/></svg></span><span class="k-stats__v"><b>6</b><span>steps in the plan builder</span></span></div>
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-calendar"/></svg></span><span class="k-stats__v"><b>Jul 2026</b><span>into development</span></span></div>
</div>

<div class="k-band k-wide">
  <span class="k-tile"><svg class="k-ic"><use href="#i-layers"/></svg></span>
  <div><h4>Three surfaces. <em>This is one of them.</em></h4><p>The client app has <a href="/work/tbs">its own case study</a>, written to stand on its own — as this one is. Read either first; they are two ends of the same failure, and neither depends on the other.</p></div>
</div>

## Context

Before the dashboard existed, the trainer opened WhatsApp and worked whoever
had messaged most recently.

<p class="k-hook">Recency set the order of his day. <em>Silence has no notification.</em></p>

That is the whole problem in one sentence. The client who messaged four times
got attention; the client who went quiet three weeks ago — the one actually at
risk — did not appear anywhere.

Every plan was written from a blank page. Every context recall came from
memory. Every call arrived unscheduled.

He was good at it. That is why it scaled to thirty and not to zero. But the
skill being exercised was memory, and memory is the one resource you cannot buy
more of.

## Problem space

<p class="k-claim">The plan survived only in the trainer's memory and the
client's scroll history. Neither one holds past thirty people.</p>

That single missing object — a durable record of what each client is on and how
it is going — failed both sides at once. The client had no way to retrieve it.
The trainer was running out of room to remember it, and from his side that
showed up as four separate things going wrong.

<div class="k-why k-wide">
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-bulb"/></svg></span><div><h4>Recall as infrastructure</h4><p>Thirty cases held in his head — goals, history, injuries, what was tried last month — retrieved at the moment someone messaged.</p></div></div>
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-bell"/></svg></span><div><h4>No triage</h4><p>Recency stood in for priority. The loudest client was served first; the disengaged one was invisible.</p></div></div>
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-doc"/></svg></span><div><h4>Every plan from scratch</h4><p>No templates, no reuse. Plan-writing was a fresh act of memory each time, and the single most expensive thing in his week.</p></div></div>
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-clock"/></svg></span><div><h4>No shape to the day</h4><p>Calls landed whenever a client chose to dial, working hours or not.</p></div></div>
</div>

<p class="k-claim k-claim--sub">The ceiling was never demand. It was one
person's working memory.</p>

## Goal

<p class="k-claim k-claim--goal">Replace recall<br><em>with a queue.</em></p>

The dashboard answers one question the moment it opens: **who needs me today.**

Not *who are my clients*. A roster only externalises the problem — it moves
thirty names from his head onto a screen and leaves the judgement exactly where
it was. A queue does the judgement.

<div class="k-shift k-wide">
  <div class="k-shift__row">
    <span class="k-tile"><svg class="k-ic"><use href="#i-bell"/></svg></span>
    <h4>Priority</h4>
    <p class="k-shift__was">Whoever messaged most recently is who gets worked on next.</p>
    <p class="k-shift__now">The system surfaces pending action, and decides what is overdue.</p>
    <p class="k-shift__why">Activity is not priority. A tool whose job is triage cannot be organised around the wrong one.</p>
  </div>
  <div class="k-shift__row">
    <span class="k-tile"><svg class="k-ic"><use href="#i-user"/></svg></span>
    <h4>Context</h4>
    <p class="k-shift__was">Open a thread, scroll back, reconstruct the client from memory.</p>
    <p class="k-shift__now">Context is assembled before he arrives.</p>
    <p class="k-shift__why">Opening a client should not mean rebuilding them first.</p>
  </div>
  <div class="k-shift__row">
    <span class="k-tile"><svg class="k-ic"><use href="#i-doc"/></svg></span>
    <h4>Plans</h4>
    <p class="k-shift__was">A blank page, and everything he knows about that person recalled at once.</p>
    <p class="k-shift__now">A repeatable six-step procedure.</p>
    <p class="k-shift__why">The most expensive task in the week is the one that most needs structure.</p>
  </div>
</div>

<div class="k-aside k-wide">
  <div class="k-aside__h"><span class="k-tile k-tile--plain"><svg class="k-ic"><use href="#i-x"/></svg></span><h4>What it deliberately is not</h4></div>
  <p>An analytics product. No charts for the sake of charts, no engagement reporting. This is a working tool for <b>one person on a weekday</b>, not a reporting layer for a stakeholder.</p>
</div>

## Information architecture

<div class="k-ia k-wide">
  <div class="k-ia__tabs">
    <div class="k-ia__tab is-lead"><svg class="k-ic"><use href="#i-grid"/></svg><b>Dashboard</b></div>
    <div class="k-ia__tab"><svg class="k-ic"><use href="#i-users"/></svg><b>Clients</b></div>
    <div class="k-ia__tab"><svg class="k-ic"><use href="#i-check"/></svg><b>Check-ins</b></div>
    <div class="k-ia__tab"><svg class="k-ic"><use href="#i-doc"/></svg><b>Plans</b></div>
    <div class="k-ia__tab"><svg class="k-ic"><use href="#i-calendar"/></svg><b>Calls</b></div>
  </div>
</div>

The landing view is the queue, not the roster. Clients exists — he needs to
look someone up — but it is not the entry point, because entering through a
list means choosing who to work on, and choosing is the work the tool is
supposed to remove.

<figure class="k-cap k-wide">
  <div class="k-mount">
    <div class="k-win">
      <div class="k-win__bar"><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i><span class="k-win__title">Clients</span></div>
      <div class="k-win__view"><img src="/assets/projects/tbs-dash/clients.png" alt="TBS trainer dashboard — the Clients roster, filtered by state and sorted by needs attention" loading="lazy" width="1440" height="1020" /></div>
    </div>
  </div>
  <figcaption><b>Clients</b> — the roster, one tap away rather than in front. Even here the default sort is <b>needs attention</b>, not alphabetical: the list is for lookup, and lookup is not the same job as deciding.</figcaption>
</figure>

<div class="k-band k-wide">
  <span class="k-tile"><svg class="k-ic"><use href="#i-target"/></svg></span>
  <div><h4>The app leads with the relationship. <em>The dashboard leads with the backlog.</em></h4><p>Same logic in reverse: each surface opens on whatever its user cannot supply for themselves.</p></div>
</div>

## The queue

The landing view sorts clients by what is pending against them — not by name,
and not by recency.

<figure class="k-cap k-wide">
  <div class="k-mount">
    <div class="k-win k-win--crop">
      <div class="k-win__bar"><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i><span class="k-win__title">Dashboard</span></div>
      <div class="k-win__view"><img src="/assets/projects/tbs-dash/queue.png" alt="TBS trainer dashboard — the landing view, with a needs-you-today queue, check-ins to review and a roster rail" loading="lazy" width="1440" height="1290" /></div>
    </div>
  </div>
  <ol class="k-notes k-notes--row">
    <li><span><b>Needs you today</b><span>Two items, each with the action attached. Not a feed of everything that happened.</span></span></li>
    <li><span><b>Check-ins to review</b><span>Submitted work waiting on him, counted so the backlog cannot hide.</span></span></li>
    <li><span><b>The roster rail</b><span>Every client, grouped by state — depleted, lagging, rest, on track, new.</span></span></li>
  </ol>
  <figcaption><b>Dashboard</b> — the day opens already sorted. "2 things need you today" is the entire promise of the surface, stated in the first line of the screen.</figcaption>
</figure>

Four things can put a client in the queue: **plan pending**, **check-in
submitted**, **call unscheduled**, and **client gone quiet**.

The last one is the one that matters. A client who stops logging and stops
replying generates no notification anywhere — in WhatsApp their silence looks
identical to contentment. Making absence a queue item is the difference between
a tool that surfaces work and a tool that surfaces noise.

### Rejected — the pulse layout

<figure class="k-cap k-wide">
  <span class="k-verdict k-verdict--cut">Not shipped</span>
  <div class="k-mount">
    <div class="k-win">
      <div class="k-win__bar"><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i><span class="k-win__title">Dashboard — Exploration B</span></div>
      <div class="k-win__view"><img src="/assets/projects/tbs-dash/pulse.png" alt="TBS trainer dashboard — rejected exploration with stat cards, a client pulse list, streaks and a live activity feed" loading="lazy" width="1440" height="1061" /></div>
    </div>
  </div>
  <figcaption>Exploration B: stat cards across the top, streaks in the rail, and a live activity feed of everything happening across all clients, in the order it happened.</figcaption>
</figure>

It looked like a product. It answered nothing. A feed tells you what is recent,
which is precisely the failure the WhatsApp workflow already had — it just
renders it more attractively.

## Client detail

The trainer opens a client for one of three reasons, at three different moments
in the week, and each one needs a different thing on screen.

<figure class="k-cap k-wide">
  <div class="k-mount">
    <div class="k-win k-win--crop">
      <div class="k-win__bar"><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i><span class="k-win__title">Client &middot; Overview</span></div>
      <div class="k-win__view"><img src="/assets/projects/tbs-dash/overview.png" alt="TBS trainer dashboard — client detail, Overview tab, with macros, this week's pulse, meals, notes, goal and injury flags" loading="lazy" width="1440" height="1330" /></div>
    </div>
  </div>
  <ol class="k-notes k-notes--row">
    <li><span><b>State, immediately</b><span>Phase, week, streak and days since the last check-in, in the header.</span></span></li>
    <li><span><b>The things he used to remember</b><span>Notes, goal and countdown, limitations and injuries — down the right rail, always in the same place.</span></span></li>
    <li><span><b>What the client sees</b><span>Fields that appear in the client's app are marked as such, so he knows what he is editing.</span></span></li>
  </ol>
  <figcaption><b>Overview</b> — who is this, where are they, what is the history. The context he used to hold in memory, assembled before he arrives.</figcaption>
</figure>

<div class="k-compare k-wide">
  <figure>
    <div class="k-mount">
      <div class="k-win">
        <div class="k-win__bar"><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i><span class="k-win__title">Client &middot; Diet &amp; Nutrition</span></div>
        <div class="k-win__view"><img src="/assets/projects/tbs-dash/nutrition.png" alt="TBS trainer dashboard — client detail, Diet and Nutrition tab" loading="lazy" width="1440" height="1120" /></div>
      </div>
    </div>
    <figcaption><b>Diet &amp; Nutrition</b>What was logged against what was planned, plus hydration, supplements and the plan calendar.</figcaption>
  </figure>
  <figure>
    <div class="k-mount">
      <div class="k-win">
        <div class="k-win__bar"><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i><span class="k-win__title">Client &middot; Check-in</span></div>
        <div class="k-win__view"><img src="/assets/projects/tbs-dash/checkin.png" alt="TBS trainer dashboard — client detail, Check-in tab, with progress comparison and report history" loading="lazy" width="1440" height="1180" /></div>
      </div>
    </div>
    <figcaption><b>Check-in</b>The submitted week, photo comparison against an earlier week, and the full report history.</figcaption>
  </figure>
</div>

Adherence detail lives on this side deliberately. In the client's own app a
missed target recalculates rather than failing the day, so nobody is handed a
verdict at 1pm. The full pattern — how often, on which days, by how much —
surfaces here instead, where a human reads it and decides whether it matters.

One screen holding all three would have been a dashboard *about a person*.
Three views are three jobs.

## Plan builder

<ol class="k-journey k-wide">
  <li><span class="k-journey__dot"><svg class="k-ic"><use href="#i-user"/></svg></span><b>Snapshot</b><span>Who this is</span></li>
  <li><span class="k-journey__dot"><svg class="k-ic"><use href="#i-chart"/></svg></span><b>Calorie base</b><span>Sets the ceiling</span></li>
  <li><span class="k-journey__dot"><svg class="k-ic"><use href="#i-grid"/></svg></span><b>Structure</b><span>Meals per day</span></li>
  <li><span class="k-journey__dot"><svg class="k-ic"><use href="#i-fork"/></svg></span><b>Meal plan</b><span>And hydration</span></li>
  <li><span class="k-journey__dot"><svg class="k-ic"><use href="#i-star"/></svg></span><b>Supplements</b><span>If any</span></li>
  <li class="is-key"><span class="k-journey__dot"><svg class="k-ic"><use href="#i-check"/></svg></span><b>Review</b><span>Then publish</span></li>
</ol>

Plan-writing was the most expensive thing in the trainer's week and the most
memory-dependent — a blank page and everything he knew about that client,
recalled at once.

A form would have reproduced the blank page with boxes around it. A sequence
carries the reasoning: each step narrows the next, the calorie base sets the
ceiling the meal plan works inside, and review comes before publish because a
plan going out wrong costs a week.

<figure class="k-cap k-wide">
  <div class="k-mount">
    <div class="k-win k-win--crop">
      <div class="k-win__bar"><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i><span class="k-win__title">Nutrition Plan Builder &middot; 1 of 6</span></div>
      <div class="k-win__view"><img src="/assets/projects/tbs-dash/plan-1-snapshot.png" alt="TBS plan builder — step one, client snapshot, with details, preferences, a suggested calorie starting point and reference guidelines" loading="lazy" width="1440" height="1310" /></div>
    </div>
  </div>
  <ol class="k-notes k-notes--row">
    <li><span><b>Six steps, always visible</b><span>Where he is in the sequence, and what is still coming.</span></span></li>
    <li><span><b>The client, already assembled</b><span>Goal, diet type, health issues, foods to avoid, allergens — no recall required.</span></span></li>
    <li><span><b>A suggested starting point</b><span>Proposed, not imposed. He can take the suggestion or ignore it.</span></span></li>
  </ol>
  <figcaption><b>Step 1 — Snapshot.</b> The step exists so the plan starts from the client rather than from a number he has to remember.</figcaption>
</figure>

<div class="k-compare k-wide">
  <figure>
    <div class="k-mount">
      <div class="k-win">
        <div class="k-win__bar"><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i><span class="k-win__title">Nutrition Plan Builder &middot; 2 of 6</span></div>
        <div class="k-win__view"><img src="/assets/projects/tbs-dash/plan-2-calories.png" alt="TBS plan builder — step two, calorie base, showing the formula preview and macro split" loading="lazy" width="1440" height="1010" /></div>
      </div>
    </div>
    <figcaption><b>Step 2 — Calorie base</b>The formula is shown, not hidden. This number is the ceiling every later step works inside.</figcaption>
  </figure>
  <figure>
    <div class="k-mount">
      <div class="k-win">
        <div class="k-win__bar"><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i><span class="k-win__title">Nutrition Plan Builder &middot; 6 of 6</span></div>
        <div class="k-win__view"><img src="/assets/projects/tbs-dash/plan-6-review.png" alt="TBS plan builder — step six, review and publish, summarising the calorie base, macro split, seven-day meal plan and supplements" loading="lazy" width="1440" height="1120" /></div>
      </div>
    </div>
    <figcaption><b>Step 6 — Review &amp; publish</b>Every decision back in one place, each still editable, and a plain statement of what publishing does to the client's app.</figcaption>
  </figure>
</div>

<p class="k-claim">This is the decision that actually moves the ceiling.
Everything else on this surface saves minutes; this one turns an act of recall
into a repeatable procedure.</p>

### The same shape, twice

Workout Builder mirrors the nutrition sequence, and both plans need to survive
contact with a real week — a client travels, gets sick, has a wedding.

<div class="k-compare k-wide">
  <figure>
    <div class="k-mount">
      <div class="k-win">
        <div class="k-win__bar"><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i><span class="k-win__title">Program Editor</span></div>
        <div class="k-win__view"><img src="/assets/projects/tbs-dash/workout-editor.png" alt="TBS program editor — a training block with weekly volume, medical flags and one-off overrides" loading="lazy" width="1440" height="820" /></div>
      </div>
    </div>
    <figcaption><b>Program editor</b>Edits state their own blast radius: "applies to all 12 remaining sessions". Medical flags sit beside the exercise list, not in a profile three clicks away.</figcaption>
  </figure>
  <figure>
    <div class="k-mount">
      <div class="k-win">
        <div class="k-win__bar"><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i><span class="k-win__title">Edit Meal &middot; Today override</span></div>
        <div class="k-win__view"><img src="/assets/projects/tbs-dash/override-meal.png" alt="TBS edit meal modal — apply changes to today only or the entire plan, with a warning that one food conflicts with the client's preferences" loading="lazy" width="1440" height="1120" /></div>
      </div>
    </div>
    <figcaption><b>Same-day override</b>Today only, or the entire plan — chosen before anything else, because it is the only choice in the dialog that is hard to undo.</figcaption>
  </figure>
</div>

## Calls

One call per week, ten minutes, inside two fixed windows in the trainer's own
timezone.

<div class="k-compare k-wide">
  <figure>
    <div class="k-mount">
      <div class="k-win">
        <div class="k-win__bar"><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i><span class="k-win__title">Call Schedules</span></div>
        <div class="k-win__view"><img src="/assets/projects/tbs-dash/calls-today.png" alt="TBS call schedules — today's calls with completed, upcoming, cancelled and reschedule-requested states" loading="lazy" width="1440" height="830" /></div>
      </div>
    </div>
    <figcaption><b>Today</b>Every call carries its state and the client's own words — why they cancelled, what they want to talk about.</figcaption>
  </figure>
  <figure>
    <div class="k-mount">
      <div class="k-win">
        <div class="k-win__bar"><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i><span class="k-win__title">Availability Settings</span></div>
        <div class="k-win__view"><img src="/assets/projects/tbs-dash/availability.png" alt="TBS availability settings — weekly hours, buffer time, minimum notice and date overrides" loading="lazy" width="1440" height="1082" /></div>
      </div>
    </div>
    <figcaption><b>Availability</b>Weekly hours, buffer between calls, minimum notice, and date overrides for the weeks that do not look like the others.</figcaption>
  </figure>
</div>

This is the least glamorous surface in the project and one of the most
consequential.

<p class="k-claim">Bounding the call is what makes a hundred clients
arithmetically possible. Thirty clients dialling at will is not a scheduling
inconvenience — it is a business that cannot grow.</p>

It is also the decision most likely to read as a downgrade to the client, so it
is defended rather than hidden: the client app only ever offers the windows the
trainer actually works, so a bounded call never presents as a rejection.

## Check-in review

<ol class="k-journey k-wide">
  <li><span class="k-journey__dot"><svg class="k-ic"><use href="#i-phone"/></svg></span><b>Client submits</b><span>Photos, weight, mood</span></li>
  <li><span class="k-journey__dot"><svg class="k-ic"><use href="#i-bell"/></svg></span><b>Lands in queue</b><span>Counted, not buried</span></li>
  <li><span class="k-journey__dot"><svg class="k-ic"><use href="#i-doc"/></svg></span><b>Opens assembled</b><span>The week, already gathered</span></li>
  <li class="is-key"><span class="k-journey__dot"><svg class="k-ic"><use href="#i-send"/></svg></span><b>He replies</b><span>In writing, as a person</span></li>
</ol>

<figure class="k-cap k-wide">
  <div class="k-mount">
    <div class="k-win">
      <div class="k-win__bar"><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i><span class="k-win__title">Check-in Review</span></div>
      <div class="k-win__view"><img src="/assets/projects/tbs-dash/checkin-review.png" alt="TBS check-in review — weight and measurements, the client's note, progress photos, and the trainer's written reply" loading="lazy" width="1440" height="826" /></div>
    </div>
  </div>
  <ol class="k-notes k-notes--row">
    <li><span><b>The week, gathered</b><span>Weight, four measurements, deltas against last time — nothing to look up.</span></span></li>
    <li><span><b>Her words, kept</b><span>The client's note sits next to her numbers, because it usually explains them.</span></span></li>
    <li><span><b>A reply, not a score</b><span>Free text with suggested openers. The composer is the largest thing on the screen.</span></span></li>
  </ol>
  <figcaption><b>Check-in review</b> — the client never receives a number as a verdict. They receive a person reading their week and naming a focus for the next one.</figcaption>
</figure>

<div class="k-band k-wide">
  <span class="k-tile"><svg class="k-ic"><use href="#i-target"/></svg></span>
  <div><h4>Automate the logistics. <em>Protect the contact.</em></h4><p>The collection, the assembly and the queueing are the product's job. The judgement and the reply stay human — and now have room, because the assembly stopped eating the hour.</p></div>
</div>

### Progress journey — two explorations

<div class="k-compare k-wide">
  <figure>
    <span class="k-verdict k-verdict--cut">Not shipped</span>
    <div class="k-mount">
      <div class="k-win">
        <div class="k-win__bar"><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i><span class="k-win__title">Progress Journey — Exploration A</span></div>
        <div class="k-win__view"><img src="/assets/projects/tbs-dash/journey-table.png" alt="TBS progress journey — exploration A, a full table with every week and every metric visible at once" loading="lazy" width="1440" height="869" /></div>
      </div>
    </div>
    <figcaption><b>A — Table</b>Every check-in, every metric, all rows visible. Complete, and unreadable.</figcaption>
  </figure>
  <figure>
    <span class="k-verdict k-verdict--ship">Shipped</span>
    <div class="k-mount">
      <div class="k-win">
        <div class="k-win__bar"><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i><span class="k-win__title">Progress Journey — Exploration B</span></div>
        <div class="k-win__view"><img src="/assets/projects/tbs-dash/journey-spine.png" alt="TBS progress journey — exploration B, a spine of six weeks with one week opened in detail beside a plan-change log" loading="lazy" width="1440" height="758" /></div>
      </div>
    </div>
    <figcaption><b>B — Spine + focus</b>A timeline with one week in focus and the rest legible as shape.</figcaption>
  </figure>
</div>

The trainer is looking for a trend and one anomaly, not a spreadsheet. The
table gave him every number and made him find both himself, which is the same
work he was already doing in his head.

## Design language

<p class="k-hook">Same system. <em>Opposite theme.</em></p>

Same tokens, same components, same type scale as the client app — rendered
light, because the two products are used in different rooms.

<div class="k-spec k-wide">
  <div class="k-spec__themes">
    <div class="k-spec__theme k-spec__theme--dark">
      <h4>Client app</h4>
      <p>Dark · gym at dawn, phone, thirty seconds</p>
      <div class="k-spec__chips" aria-hidden="true"><i class="is-accent"></i><i></i><i></i><i></i><i></i></div>
    </div>
    <div class="k-spec__theme k-spec__theme--light">
      <h4>Trainer dashboard</h4>
      <p>Light · 1440px, working hours, many rows</p>
      <div class="k-spec__chips" aria-hidden="true"><i class="is-accent"></i><i></i><i></i><i></i><i></i></div>
    </div>
  </div>
</div>

<div class="k-why k-wide">
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-eye"/></svg></span><div><h4>Opposite kind of work</h4><p>The app shows one thing at a time and has to make it feel like something. The dashboard is comparison and triage — dense rows scanned fast, which is exactly where dark backgrounds cost the most.</p></div></div>
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-star"/></svg></span><div><h4>Only one of them is the brand</h4><p>The client app is what the customer paid for; it should feel like the coach. The dashboard is a tool for doing work, and its highest ambition is to disappear. A tool that expresses personality is a tool that is in the way.</p></div></div>
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-layers"/></svg></span><div><h4>One accent, doing one job</h4><p>Gold marks the action in a row and nothing else. On a screen of thirty clients it is the only thing that tells you where to click, which is the only reason it still reads as emphasis by the tenth row.</p></div></div>
</div>

## Key decisions and trade-offs

<div class="k-decision k-wide">
  <div class="k-decision__h"><span class="k-tile"><svg class="k-ic"><use href="#i-list"/></svg></span><h4>Queue over roster</h4></div>
  <dl>
    <div><dt>Decision</dt><dd>The landing view sorts by pending action, not by client name.</dd></div>
    <div><dt>Because</dt><dd>A list externalises the problem; it moves thirty names out of his head and leaves the judgement where it was.</dd></div>
    <div><dt>Trade-off</dt><dd>He cannot scan his whole book at a glance from the landing screen. Clients exists for that, one tap away.</dd></div>
  </dl>
</div>

<div class="k-decision k-wide">
  <div class="k-decision__h"><span class="k-tile"><svg class="k-ic"><use href="#i-wand"/></svg></span><h4>Wizard over form</h4></div>
  <dl>
    <div><dt>Decision</dt><dd>Plan creation is a six-step sequence, not a single editable page.</dd></div>
    <div><dt>Because</dt><dd>Plan-writing was the memory tax. A sequence carries reasoning forward; a form reproduces the blank page.</dd></div>
    <div><dt>Trade-off</dt><dd>Slower for the expert case where he already knows every value. Accepted — the expert case is not where the ceiling lives.</dd></div>
  </dl>
</div>

<div class="k-decision k-wide">
  <div class="k-decision__h"><span class="k-tile"><svg class="k-ic"><use href="#i-chart"/></svg></span><h4>No analytics surface</h4></div>
  <dl>
    <div><dt>Decision</dt><dd>No charts layer, no engagement reporting.</dd></div>
    <div><dt>Because</dt><dd>There is one trainer and thirty clients. Analytics answers questions nobody has yet, and every screen it adds competes with the queue.</dd></div>
    <div><dt>Trade-off</dt><dd>Nothing to show a stakeholder at a glance. There is no stakeholder — that is the point.</dd></div>
  </dl>
</div>

<div class="k-decision k-decision--cut k-wide">
  <div class="k-decision__h"><span class="k-tile"><svg class="k-ic"><use href="#i-shield"/></svg></span><h4>Blood work comes out</h4><span class="k-tag">Cut</span></div>
  <dl>
    <div><dt>Decision</dt><dd>Removed from both surfaces. Not deferred to a later phase.</dd></div>
    <div><dt>Because</dt><dd>Storing clinical health reports puts the product under health-data regulation, and in European markets that means certification obtained before launch. A large compliance cost attached to a feature nobody signed up for.</dd></div>
    <div><dt>Trade-off</dt><dd>One workflow stays outside the product, which is exactly what this project set out to stop. Worth it — the alternative was a certification programme blocking an MVP.</dd></div>
  </dl>
</div>

## Outcomes

<div class="k-stats k-stats--out k-wide">
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-grid"/></svg></span><span class="k-stats__v"><b>~50</b><span>screens</span></span></div>
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-list"/></svg></span><span class="k-stats__v"><b>5</b><span>destinations</span></span></div>
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-wand"/></svg></span><span class="k-stats__v"><b>2</b><span>builders, one shape</span></span></div>
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-user"/></svg></span><span class="k-stats__v"><b>3</b><span>views per client</span></span></div>
</div>

Around 50 screens: the queue, the client roster, three-view client detail, the
six-step plan builder, the workout builder, call scheduling with availability
and overrides, and check-in review. A light theme built from the same tokens as
the client app. Into development July 2026.

**No measured impact yet.** Phase 0 is in development. There is no
trainer-hours data, no queue-clearance data, and no client count past the
original thirty. Nothing on this page is a result.

<div class="k-why k-wide">
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-target"/></svg></span><div><h4>North star — active coached clients per trainer</h4><p>Without a fall in coaching quality. The entire project exists because thirty was the ceiling.</p></div></div>
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-clock"/></svg></span><div><h4>Trainer hours per client per week</h4><p>The direct test of whether admin actually left the day.</p></div></div>
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-bell"/></svg></span><div><h4>Time from check-in submitted to response</h4><p>The queue's own metric. If this does not fall, the sorting did not work.</p></div></div>
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-wand"/></svg></span><div><h4>Time to publish a plan</h4><p>The plan builder's metric, and the one attached to the most expensive hour in the week.</p></div></div>
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-shield"/></svg></span><div><h4>Guardrail — response time and check-in depth</h4><p>Clients per trainer is inflatable by degrading care, so both are tracked against it. A metric without its counter-metric gets gamed by whoever is optimising it.</p></div></div>
</div>

## What I learned

**Two finished directions did not ship, and both failed the same way.** The
pulse dashboard and the progress table were not sketches — they were complete,
and each was more impressive to look at than what replaced it. The feed showed
more; the table showed everything. Both handed the judgement straight back to
the person the tool was supposed to do the judging for. The version that
shipped shows less on purpose, and the discipline that took was harder than the
layout work by a distance.

**Designing for one known user cuts both ways.** There was exactly one trainer,
and he was reachable — so every question about how the day actually runs had an
answer within a day, and the queue's sort order is his real triage logic rather
than a guess at one. The risk sits on the other side of that: a tool shaped
this precisely around one person's habits has assumptions baked in that nobody
noticed making, and the second trainer is the one who finds them.

<!-- TODO — two gaps to close with Bhupesh before this goes live:
     1. On the two rejected directions: did you catch those yourself, or did the
        PM push back? The paragraph above is deliberately neutral on that.
     2. Anything on this surface you handed over knowing it was unresolved?
        The client app piece ends on the funnel being unfinished; this one has
        no equivalent admission yet, and it should. -->

<div class="k-aside k-wide">
  <div class="k-aside__h"><span class="k-tile k-tile--plain"><svg class="k-ic"><use href="#i-phone"/></svg></span><h4>The other end of this</h4></div>
  <p>The <b>client app</b> is the surface this one exists to serve — five tabs, a day that recalculates instead of failing, and a logging habit that has to survive the weeks when the scale is not moving. The <b>acquisition funnel</b> is the third: eleven steps, framed as an application rather than a checkout, with payment sitting behind acceptance.</p>
  <p><a href="/work/tbs">Read the client app case study →</a></p>
</div>
