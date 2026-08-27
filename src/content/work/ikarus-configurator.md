---
client: Ikarus Delta
title: A unified 3D configurator platform that cut build time by 70%
heroTitle: Ten rounds of revisions, gone
summary: >-
  Every 3D configurator was hand-built from scratch and took ten to fifteen
  rounds to land. Replacing that with one white-label platform took three weeks
  of work down to seven days.
tags: [Platform design, Workflow design, Design systems, 0 → 1]
tint: '#ffe8d6'
accent: ember
folderTone: light
folderArt: /assets/projects/ikarus/final-editor.png
folderArtAlt: The Ikarus Delta 3D scene editor
role: Product designer — discovery and early structure
timeline: Jun – Aug 2024 · my part Jun – 4 Jul
order: 3
draft: false
---

<svg width="0" height="0" aria-hidden="true" focusable="false" style="position:absolute">
  <symbol id="i-cube" viewBox="0 0 24 24"><path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7z"/><path d="m3.5 7 8.5 4.6L20.5 7M12 11.6v9.9"/></symbol>
  <symbol id="i-layers" viewBox="0 0 24 24"><path d="m12 3 9 4.5-9 4.5-9-4.5z"/><path d="m3 12.5 9 4.5 9-4.5"/></symbol>
  <symbol id="i-palette" viewBox="0 0 24 24"><path d="M12 3a9 9 0 0 0 0 18c1.4 0 2-1 2-1.8 0-1.5-1.4-1.6-1.4-2.9 0-.9.7-1.5 1.7-1.5H16a5 5 0 0 0 5-5c0-3.7-4-6.8-9-6.8z"/><circle cx="7.5" cy="11.5" r="1"/><circle cx="10.5" cy="7.5" r="1"/><circle cx="15" cy="8.5" r="1"/></symbol>
  <symbol id="i-sliders" viewBox="0 0 24 24"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2.2"/><circle cx="10" cy="17" r="2.2"/></symbol>
  <symbol id="i-code" viewBox="0 0 24 24"><path d="m8 8-4.5 4L8 16M16 8l4.5 4L16 16M13.5 5l-3 14"/></symbol>
  <symbol id="i-users" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.4"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16.5 5.2a3.4 3.4 0 0 1 0 6.6M17 14.2A6.5 6.5 0 0 1 21.5 20"/></symbol>
  <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.6"/><path d="M5 20a7 7 0 0 1 14 0"/></symbol>
  <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol>
  <symbol id="i-doc" viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></symbol>
  <symbol id="i-chart" viewBox="0 0 24 24"><path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 16v-4M13 16V8M18 16v-6"/></symbol>
  <symbol id="i-target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/></symbol>
  <symbol id="i-bulb" viewBox="0 0 24 24"><path d="M9 17.5a6 6 0 1 1 6 0V19a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 19z"/><path d="M10 22h4"/></symbol>
  <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 2.5 20 6v6c0 5-3.4 8.4-8 9.5C7.4 20.4 4 17 4 12V6z"/><path d="m9 12 2 2 4-4"/></symbol>
  <symbol id="i-eye" viewBox="0 0 24 24"><path d="M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="2.8"/></symbol>
  <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/></symbol>
  <symbol id="i-grid" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></symbol>
  <symbol id="i-repeat" viewBox="0 0 24 24"><path d="M4 9a5 5 0 0 1 5-5h11M20 15a5 5 0 0 1-5 5H4"/><path d="m17 1 3 3-3 3M7 17l-3 3 3 3"/></symbol>
  <symbol id="i-zap" viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></symbol>
  <symbol id="i-star" viewBox="0 0 24 24"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></symbol>
  <symbol id="i-x" viewBox="0 0 24 24"><path d="M6 6 18 18M18 6 6 18"/></symbol>
</svg>

## Overview

Ikarus Delta turns static product catalogues into interactive 3D experiences
for e-commerce. Through 2024 the client roster grew faster than the process
behind it. Every configurator was built from nothing — custom models, custom
code, custom interface — and every one took ten to fifteen rounds of
back-and-forth before it shipped.

We replaced that pipeline with a single white-label platform that three very
different groups could work in: the 3D artists making the models, the managers
tracking the projects, and the developers putting them on client storefronts.

<div class="k-stats k-wide">
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-zap"/></svg></span><span class="k-stats__v"><b>70%</b><span>faster to build</span></span></div>
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-chart"/></svg></span><span class="k-stats__v"><b>40→90%</b><span>on-time delivery</span></span></div>
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-repeat"/></svg></span><span class="k-stats__v"><b>10–15</b><span>revision rounds removed</span></span></div>
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-clock"/></svg></span><span class="k-stats__v"><b>5 wks</b><span>my part, of 3 months</span></span></div>
</div>

<div class="k-aside k-wide">
  <div class="k-aside__h"><span class="k-tile k-tile--plain"><svg class="k-ic"><use href="#i-users"/></svg></span><h4>Credit, and what was mine</h4></div>
  <p>Design was two people. <b>Dipanshu Saini</b> and I worked through this together — the discovery with the three teams, the platform architecture, the interface and the component system. The project ran <b>June to the end of August 2024</b>; the design work happened in the first stretch of that, and I was on it until <b>4 July</b>, when I left Ikarus to start a master's. What ran after that was deployment handoff — integration with the dev team, and minor changes as it went live.</p>
  <p>Team: one co-founder running 3D, one product manager, two developers, and the two of us on design.</p>
</div>

<div class="k-grid k-wide">
  <figure><img src="/assets/projects/ikarus/delivered-1.png" alt="A pendant lamp configurator on a client storefront, with finish swatches beside the model" loading="lazy" width="1600" height="877" /><figcaption><b>Lighting</b>Finish and shade, swapped live</figcaption></figure>
  <figure><img src="/assets/projects/ikarus/delivered-4.png" alt="A sofa configurator with a grid of upholstery swatches" loading="lazy" width="1600" height="877" /><figcaption><b>Seating</b>Upholstery across a large swatch set</figcaption></figure>
  <figure><img src="/assets/projects/ikarus/delivered-3.png" alt="A height-adjustable desk configurator with size and top options" loading="lazy" width="1600" height="877" /><figcaption><b>Desks</b>Size, top and frame</figcaption></figure>
  <figure><img src="/assets/projects/ikarus/delivered-2.png" alt="An apparel configurator on a product page with colour options" loading="lazy" width="1600" height="877" /><figcaption><b>Apparel</b>Same engine, different category</figcaption></figure>
</div>

The output looks like this on a client's storefront. Four categories, four
separate builds — and before the platform, four times the work.

## Context

The problem surfaced in a monthly cross-functional meeting rather than in any
metric. Two groups described the same project from opposite ends and neither
description was good.

The 3D artists were tired of feedback loops that never seemed to close. The
developers were tired of rebuilding the same functionality for every new
client. Between them sat a serial handoff: nothing the developers did could
start until the artists were finished, and the artists were rarely finished
when they thought they were.

<p class="k-hook">The product was strong. <em>The way it got built was not.</em></p>

Every project began at zero — a fresh set of models, a fresh configurator
coded from scratch, a fresh interface. That is fine for three clients a year.
It is what stops you taking the fourth.

## Problem space

<figure class="k-cap k-wide">
  <div class="k-plate k-plate--raw">
    <img src="/assets/projects/ikarus/cardsort-photo.png" alt="A whiteboard covered in coloured sticky notes from a card-sorting session on camera and environment settings" loading="lazy" width="1600" height="1174" />
  </div>
  <figcaption>Card sorting with the 3D artists on camera and environment settings — the controls nobody could find. Grouping them by the artists' mental model rather than by the underlying technical spec is what made that panel usable.</figcaption>
</figure>

Discovery ran for about a month, spent inside each discipline's actual working
day rather than in interviews about it. That is what surfaced the problems
people had stopped reporting — the ones that had been normalised into "how
long this takes."

<p class="k-claim">Six findings, and every one of them was a tax somebody had
quietly agreed to keep paying.</p>

<div class="k-duo k-wide">
  <div class="k-card">
    <div class="k-card__h"><span class="k-tile"><svg class="k-ic"><use href="#i-cube"/></svg></span><h4>For the 3D artists</h4></div>
    <ul>
      <li><b>The environment mismatch.</b> Models were reviewed and approved in a QA environment that did not render like the web, so work that had passed came back wrong once it was implemented.</li>
      <li><b>Deadline pressure.</b> Because revision rounds started after the work was supposedly done, the fixing happened late at night against a delivery date.</li>
      <li><b>Workflow chaos.</b> Assets and change requests were tracked across several different tools, so nobody could say where a model was without asking a person.</li>
    </ul>
  </div>
  <div class="k-card">
    <div class="k-card__h"><span class="k-tile"><svg class="k-ic"><use href="#i-code"/></svg></span><h4>For the developers</h4></div>
    <ul>
      <li><b>Reinventing the wheel.</b> Around 60% of a developer's day went on rebuilding functionality that already existed somewhere else in the company.</li>
      <li><b>The handoff marathon.</b> Ten to fifteen rounds of back-and-forth per configurator, treated as normal rather than as a defect.</li>
      <li><b>Maintenance over progress.</b> More time went on fixing what had already been delivered than on building what was next.</li>
    </ul>
  </div>
</div>

Both sides were describing one problem from two ends: there was no shared place
where a configurator existed. It lived as a model in one tool, a spec in
another, a thread in a third, and code in a fourth — and every gap between
those was a revision round waiting to happen.

<figure class="k-cap k-wide">
  <div class="k-plate">
    <img src="/assets/projects/ikarus/mind-map.png" alt="A mind map radiating from a central 'finding cause' node, grouping the pipeline's failures by where they originated" loading="lazy" width="1600" height="910" />
  </div>
  <figcaption>Mapping the findings against each other rather than listing them. Six complaints from two teams collapsed into one cause — which is the only reason the fix could be a single platform rather than six improvements.</figcaption>
</figure>

## Goal and vision

<p class="k-claim k-claim--goal">One environment.<br><em>No code. Nothing built twice.</em></p>

We looked at how the category already solved this — **Zakeke** and
**Combeenation** in particular — to separate the conventions worth keeping
from the traps.

<div class="k-grid k-grid--2 k-wide">
  <figure><img src="/assets/projects/ikarus/benchmark-direct.png" alt="A teardown board of a direct competitor's configurator, screen by screen with annotations" loading="lazy" width="1600" height="1437" /><figcaption><b>Direct</b>Platforms selling the same thing we were about to build</figcaption></figure>
  <figure><img src="/assets/projects/ikarus/benchmark-indirect.png" alt="A teardown board of indirect competitors, covering adjacent product-customisation tools" loading="lazy" width="1600" height="1438" /><figcaption><b>Indirect</b>Adjacent tools solving one piece of it well</figcaption></figure>
</div>

<div class="k-duo k-wide">
  <div class="k-card k-card--gold">
    <div class="k-card__h"><span class="k-tile"><svg class="k-ic"><use href="#i-eye"/></svg></span><h4>Worth keeping</h4></div>
    <ul>
      <li>Direct manipulation of the model rather than form fields beside it</li>
      <li>Hover states that explain what a control actually does</li>
      <li>Real-time feedback as settings change</li>
      <li>Metadata generated automatically instead of typed</li>
    </ul>
  </div>
  <div class="k-card">
    <div class="k-card__h"><span class="k-tile k-tile--plain"><svg class="k-ic"><use href="#i-x"/></svg></span><h4>Worth avoiding</h4></div>
    <ul>
      <li>Interfaces dense enough to need a training session</li>
      <li>Control setup that becomes its own busywork</li>
      <li>Anything that requires the user to write code</li>
      <li>No way to start from anything but a blank file</li>
    </ul>
  </div>
</div>

The gap that left was a single-environment tool with no-code controls and
reusable templates. Four principles were set to judge every screen against:

<div class="k-why k-wide">
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-zap"/></svg></span><div><h4>Simplify</h4><p>Shorten the path from a set of models to a finished, embeddable configurator.</p></div></div>
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-user"/></svg></span><div><h4>Empower</h4><p>Let a non-technical user do work that previously required a developer.</p></div></div>
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-shield"/></svg></span><div><h4>Maintain</h4><p>Make the output something you can change after handoff without a rebuild.</p></div></div>
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-repeat"/></svg></span><div><h4>Reuse</h4><p>Every asset produced on one project should be available to the next one.</p></div></div>
</div>

## Information architecture

The layout question had an unusually clear answer. A configurator's final home
is an e-commerce product page — model on one side, options on the other — so
the editor was built to mirror that arrangement rather than invent its own.

<figure class="k-cap k-wide">
  <div class="k-plate">
    <img src="/assets/projects/ikarus/layout-mirror.png" alt="Two wireframe panels side by side: an e-commerce product page and the 3D editor, with matching regions annotated" loading="lazy" width="1600" height="989" />
  </div>
  <figcaption>The product page on the left, the editor on the right, region for region. Model in the centre, options on the right rail, thumbnails down the side — the artist is already fluent in this layout because it is the one their work ships into.</figcaption>
</figure>

<div class="k-ia k-wide">
  <div class="k-ia__tabs">
    <div class="k-ia__tab is-lead"><svg class="k-ic"><use href="#i-cube"/></svg><b>Scene</b></div>
    <div class="k-ia__tab"><svg class="k-ic"><use href="#i-grid"/></svg><b>Projects</b></div>
    <div class="k-ia__tab"><svg class="k-ic"><use href="#i-palette"/></svg><b>Materials</b></div>
    <div class="k-ia__tab"><svg class="k-ic"><use href="#i-sliders"/></svg><b>Controls</b></div>
    <div class="k-ia__tab"><svg class="k-ic"><use href="#i-code"/></svg><b>Embed</b></div>
  </div>
  <p class="k-ia__caption">The scene editor, mirroring where the output ends up</p>
  <ol class="k-ia__stack">
    <li class="is-lead"><span class="k-ia__txt"><b>The model, live</b><span>the same renderer the shopper will see</span></span></li>
    <li class="is-lead"><span class="k-ia__txt"><b>Options panel, right</b><span>exactly where a product page puts them</span></span></li>
    <li><span class="k-ia__txt"><b>Environment &amp; lighting</b><span>a popover, so the model stays in view</span></span></li>
    <li><span class="k-ia__txt"><b>Theme &amp; versioning</b><span>in context, not on their own screens</span></span></li>
  </ol>
</div>

Matching the two environments is what removed the revision rounds at source.
When the review surface renders the same way the storefront does, what an
artist approves is what a shopper sees — and the loop that used to open *after*
sign-off never opens.

<div class="k-band k-wide">
  <span class="k-tile"><svg class="k-ic"><use href="#i-target"/></svg></span>
  <div><h4>Review it where <em>it will actually live.</em></h4><p>Most of the ten-to-fifteen rounds were not disagreements about the work. They were the gap between two rendering environments, discovered late.</p></div>
</div>

## Feature breakdown

<ol class="k-journey k-wide">
  <li><span class="k-journey__dot"><svg class="k-ic"><use href="#i-grid"/></svg></span><b>Project</b><span>Set up the catalogue</span></li>
  <li><span class="k-journey__dot"><svg class="k-ic"><use href="#i-cube"/></svg></span><b>Scene</b><span>Load and stage models</span></li>
  <li><span class="k-journey__dot"><svg class="k-ic"><use href="#i-palette"/></svg></span><b>Materials</b><span>Pull from the library</span></li>
  <li class="is-key"><span class="k-journey__dot"><svg class="k-ic"><use href="#i-sliders"/></svg></span><b>Controls</b><span>No-code, live preview</span></li>
  <li><span class="k-journey__dot"><svg class="k-ic"><use href="#i-code"/></svg></span><b>Embed</b><span>One iframe line</span></li>
</ol>

<figure class="k-cap k-wide">
  <div class="k-plate">
    <img src="/assets/projects/ikarus/final-editor.png" alt="The 3D scene editor: parts tree on the left, the model rendered centre, product details and controls on the right" loading="lazy" width="1600" height="1138" />
  </div>
  <figcaption><b>The scene editor</b> — the model rendered in the environment it will ship into, with the options panel in the position a product page would put it. Parts tree left, controls right, and a preview button that opens the real thing rather than an approximation of it.</figcaption>
</figure>

<figure class="k-cap k-wide">
  <div class="k-plate">
    <img src="/assets/projects/ikarus/final-organization.png" alt="The projects view: a grid of configurators grouped by client, each with a status" loading="lazy" width="1600" height="1140" />
  </div>
  <figcaption><b>Projects and files</b> — a structure that holds up past a handful of clients, so finding a model stops being a question you ask a colleague. Status sits on the card, which is what took progress-chasing out of chat.</figcaption>
</figure>

<figure class="k-cap k-wide">
  <div class="k-plate">
    <img src="/assets/projects/ikarus/final-materials.png" alt="The material library: a grid of wood and fabric swatches with names and variants" loading="lazy" width="1600" height="1142" />
  </div>
  <figcaption><b>The material library</b> — the reusable layer of the whole system, and the thing that made every subsequent project cheaper than the last. This is the piece we got wrong first: competitors index models, but Ikarus builds models to order and reuses <i>finishes</i>, so the library had to be built around materials.</figcaption>
</figure>

<figure class="k-cap k-wide">
  <div class="k-plate">
    <img src="/assets/projects/ikarus/ui-form.png" alt="A control being created in a modal over the scene, with option rows and part pickers" loading="lazy" width="1600" height="1151" />
  </div>
  <figcaption><b>Controls</b> — configurator logic set up in a modal with the result appearing on the right panel as you build it. No accordions, no scrolling, no code. This is the piece that took developers out of the critical path.</figcaption>
</figure>

Frequent adjustments — lighting, environment, theme, version — sit in context
popovers rather than dedicated screens, so the model never leaves the frame
while you change it.

<div class="k-grid k-grid--2 k-wide">
  <figure><img src="/assets/projects/ikarus/ui-editor-alt.png" alt="The scene editor with an Edit Part popover open beside the model" loading="lazy" width="1600" height="1151" /><figcaption><b>Edit in place</b>Part editing as a popover over the scene — the model stays in view while you change it</figcaption></figure>
  <figure><img src="/assets/projects/ikarus/ui-materials-alt.png" alt="The material library with a colour picker open over a swatch grid" loading="lazy" width="1600" height="1154" /><figcaption><b>Materials, up close</b>Finishes and variants edited against the grid rather than on their own screen</figcaption></figure>
  <figure><img src="/assets/projects/ikarus/ui-detail.png" alt="A material group properties dialog with roughness and metalness sliders beside a live sphere preview" loading="lazy" width="1600" height="1154" /><figcaption><b>Material properties</b>Roughness and metalness against a live sphere, so a value is judged by eye, not by number</figcaption></figure>
  <figure><img src="/assets/projects/ikarus/ui-organization-alt.png" alt="The projects grid with a context menu open on one configurator card" loading="lazy" width="1600" height="1151" /><figcaption><b>Project actions</b>Status on the card, actions in a menu — no detail screen needed to see where something is</figcaption></figure>
</div>

### Getting there

None of these landed first time. Each surface went through a wireframe, a round
of annotated critique with the team it was for, and a rebuild.

<div class="k-grid k-wide">
  <figure><img src="/assets/projects/ikarus/editor-wireframe.png" alt="An early wireframe of the scene editor with a placeholder model and stacked panels" loading="lazy" width="1600" height="1135" /><figcaption><b>Scene editor</b>Wireframe</figcaption></figure>
  <figure><img src="/assets/projects/ikarus/org-wireframe.png" alt="An early wireframe of the projects and file organisation screen" loading="lazy" width="1600" height="1020" /><figcaption><b>Projects</b>Wireframe</figcaption></figure>
  <figure><img src="/assets/projects/ikarus/material-wireframe.png" alt="An early wireframe of the material library with a flagged problem note" loading="lazy" width="1600" height="1020" /><figcaption><b>Materials</b>Wireframe</figcaption></figure>
</div>

<figure class="k-cap k-wide">
  <div class="k-plate">
    <img src="/assets/projects/ikarus/editor-iter-2.png" alt="A wireframe of the scene editor annotated with green critique notes explaining each decision" loading="lazy" width="1600" height="1020" />
  </div>
  <figcaption>Critique ran on the wireframes with the reasoning written next to the screen, not delivered in a meeting. That is also what made the handover survive my leaving: the argument for each layout was on the artboard rather than in my head.</figcaption>
</figure>

## Design language

<p class="k-hook">Borrowed on purpose. <em>Three months is not long.</em></p>

<div class="k-spec k-wide">
  <div class="k-ramp">
    <div><span class="k-ramp__a k-ramp__a--ui">Aa</span><span><b>Inter — inherited from Hero UI</b><span>Restyling the type would have bought nothing and cost a sprint</span></span></div>
  </div>
  <dl class="k-spec__tokens">
    <div><dt>Components</dt><dd><b>Hero UI</b>, chosen with the developers over building a custom set — the most complete coverage, actively maintained, and it shipped both themes out of the box.</dd></div>
    <div><dt>Themes</dt><dd>Light and dark from day one, because the 3D artists work against dark backgrounds and the managers do not.</dd></div>
    <div><dt>Templates</dt><dd>Configurator themes are templated per product category, so a new client starts from something rather than from a blank file.</dd></div>
  </dl>
</div>

<div class="k-grid k-wide">
  <figure><img src="/assets/projects/ikarus/heroui-2.png" alt="Hero UI open source component kit" loading="lazy" width="952" height="408" /><figcaption><b>Hero UI</b>Chosen — widest coverage, both themes, actively maintained</figcaption></figure>
  <figure><img src="/assets/projects/ikarus/heroui-1.png" alt="Chakra UI open source component kit" loading="lazy" width="952" height="408" /><figcaption><b>Chakra</b>Strong, thinner coverage of the dense controls we needed</figcaption></figure>
  <figure><img src="/assets/projects/ikarus/heroui-3.png" alt="Material UI for Figma" loading="lazy" width="952" height="408" /><figcaption><b>Material UI</b>Too opinionated to disappear behind a 3D viewport</figcaption></figure>
  <figure><img src="/assets/projects/ikarus/heroui-4.png" alt="shadcn/ui component library" loading="lazy" width="952" height="408" /><figcaption><b>shadcn/ui</b>More assembly than the schedule had room for</figcaption></figure>
</div>

Picking a component library reads like a visual decision and is really a
scheduling one. It set how fast two developers could move for three months,
which mattered more than any amount of bespoke styling would have.

The one place the platform gets styled is the output. Configurator themes are
templated per product category, so a client's storefront gets something that
looks like their brand rather than like our tool.

<div class="k-grid k-wide">
  <figure><img src="/assets/projects/ikarus/theme-1.png" alt="A configurator theme applied to an upholstered sofa product page" loading="lazy" width="1600" height="1137" /><figcaption><b>Upholstery</b></figcaption></figure>
  <figure><img src="/assets/projects/ikarus/theme-2.png" alt="A configurator theme applied to an armchair product page" loading="lazy" width="1600" height="1137" /><figcaption><b>Seating</b></figcaption></figure>
  <figure><img src="/assets/projects/ikarus/theme-3.png" alt="A configurator theme applied to a leather bag product page" loading="lazy" width="1600" height="1137" /><figcaption><b>Accessories</b></figcaption></figure>
  <figure><img src="/assets/projects/ikarus/theme-4.png" alt="A configurator theme applied to a wooden sideboard product page" loading="lazy" width="1600" height="1137" /><figcaption><b>Casegoods</b></figcaption></figure>
  <figure><img src="/assets/projects/ikarus/theme-5.png" alt="A configurator theme applied to a standing desk product page" loading="lazy" width="1600" height="1137" /><figcaption><b>Desks</b></figcaption></figure>
  <figure><img src="/assets/projects/ikarus/theme-6.png" alt="A configurator theme applied to a lounge chair product page with colour swatches" loading="lazy" width="1600" height="1137" /><figcaption><b>Lounge</b></figcaption></figure>
</div>

## Key decisions and trade-offs

<div class="k-decision k-wide">
  <div class="k-decision__h"><span class="k-tile"><svg class="k-ic"><use href="#i-palette"/></svg></span><h4>A material library, not a model library</h4></div>
  <dl>
    <div><dt>Decision</dt><dd>Invest in a deep, well-organised library of materials and textures rather than a library of finished models.</dd></div>
    <div><dt>Because</dt><dd>The original plan assumed models would be reused between clients. They are not — the team builds each one from scratch against client photographs. The genuinely reusable layer was one level down, in the materials. Finding that out changed the roadmap.</dd></div>
    <div><dt>Result</dt><dd>A narrower feature, and a far more useful one. The library compounds: each project leaves the next one with more to start from.</dd></div>
  </dl>
</div>

<div class="k-decision k-wide">
  <div class="k-decision__h"><span class="k-tile"><svg class="k-ic"><use href="#i-code"/></svg></span><h4>Ship on someone else's components</h4></div>
  <dl>
    <div><dt>Decision</dt><dd>Adopt Hero UI wholesale, including its typeface, rather than design a component set.</dd></div>
    <div><dt>Because</dt><dd>Two developers, three months, and an internal tool whose value is entirely in what it does. A custom system would have been the more impressive artefact and the slower launch.</dd></div>
    <div><dt>Trade-off</dt><dd>The platform does not look like anything in particular. For a tool used by four people inside the company, that was the correct thing to give up.</dd></div>
  </dl>
</div>

<div class="k-decision k-wide">
  <div class="k-decision__h"><span class="k-tile"><svg class="k-ic"><use href="#i-doc"/></svg></span><h4>Fit the Excel workflow instead of replacing it</h4></div>
  <dl>
    <div><dt>Decision</dt><dd>Integration is a single iframe link, pasted into the spreadsheets the team already tracked projects in.</dd></div>
    <div><dt>Because</dt><dd>The elegant answer was to absorb tracking into the platform. The workable answer was to require nobody to change how they already worked.</dd></div>
    <div><dt>Result</dt><dd>Adoption needed almost no training and no rollout plan, which for an internal tool is most of the battle.</dd></div>
  </dl>
</div>

<div class="k-decision k-wide k-decision--cut">
  <div class="k-decision__h"><span class="k-tile"><svg class="k-ic"><use href="#i-x"/></svg></span><h4>In-platform messaging</h4><span class="k-tag">Cut</span></div>
  <dl>
    <div><dt>Decision</dt><dd>Dropped from the first version. Artists and developers keep talking wherever they already talk.</dd></div>
    <div><dt>Because</dt><dd>It was the obvious nice-to-have and the obvious thing to lose. Shipping something the team could actually use beat shipping something complete.</dd></div>
    <div><dt>Trade-off</dt><dd>Conversation stays outside the record, which is a real cost — just a smaller one than launching a quarter late.</dd></div>
  </dl>
</div>

## Outcomes

<div class="k-shift k-wide">
  <div class="k-shift__row">
    <span class="k-tile"><svg class="k-ic"><use href="#i-clock"/></svg></span>
    <h4>Build time</h4>
    <p class="k-shift__was">Three weeks per configurator.</p>
    <p class="k-shift__now">Seven days — 70% faster.</p>
    <p class="k-shift__why">Most of it came from the two teams no longer waiting on each other.</p>
  </div>
  <div class="k-shift__row">
    <span class="k-tile"><svg class="k-ic"><use href="#i-chart"/></svg></span>
    <h4>On-time delivery</h4>
    <p class="k-shift__was">40% of projects landed when promised.</p>
    <p class="k-shift__now">90% — a 50-point improvement.</p>
    <p class="k-shift__why">Predictability was worth as much to the business as the raw speed.</p>
  </div>
  <div class="k-shift__row">
    <span class="k-tile"><svg class="k-ic"><use href="#i-repeat"/></svg></span>
    <h4>Handoff</h4>
    <p class="k-shift__was">Ten to fifteen rounds of revision.</p>
    <p class="k-shift__now">Eliminated as a stage.</p>
    <p class="k-shift__why">Not reduced — removed, by making review and delivery the same environment.</p>
  </div>
  <div class="k-shift__row">
    <span class="k-tile"><svg class="k-ic"><use href="#i-users"/></svg></span>
    <h4>How the teams work</h4>
    <p class="k-shift__was">One serial chain, each group blocking the next.</p>
    <p class="k-shift__now">Two independent tracks running in parallel.</p>
    <p class="k-shift__why">The structural change underneath every other number here.</p>
  </div>
</div>

<div class="k-compare k-wide">
  <figure>
    <span class="k-verdict k-verdict--cut">Before</span>
    <div class="k-plate"><img src="/assets/projects/ikarus/process-before.png" alt="An illustration of the old process: artists, revisions and developers looping back on each other" loading="lazy" width="1600" height="474" /></div>
    <figcaption><b>A loop</b>Model, review, implement, discover the mismatch, go back. The cycle had no natural end — it stopped when the deadline arrived.</figcaption>
  </figure>
  <figure>
    <span class="k-verdict k-verdict--ship">After</span>
    <div class="k-plate"><img src="/assets/projects/ikarus/process-after.png" alt="A five-step process strip: upload and organize, connect and visualize, create controls, publish, share and integrate" loading="lazy" width="1600" height="449" /></div>
    <figcaption><b>A line</b>Upload → connect → controls → publish → share. Five steps, each finishing before the next starts.</figcaption>
  </figure>
</div>

Two things happened that nobody had scoped for. The platform turned into a
sales asset — configurations could be shown live in a pitch instead of played
as a video, which helped win larger clients. And adoption cost almost nothing,
because the 3D artists kept their spreadsheets and simply began pasting a link
into them.

## What this taught us

<div class="k-why k-wide">
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-search"/></svg></span><div><h4>Watch the work, don't ask about it</h4><p>The environment mismatch was the single most expensive problem in the pipeline and nobody raised it in a meeting, because it had stopped registering as a problem. A month inside the work found it; a round of interviews would not have.</p></div></div>
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-bulb"/></svg></span><div><h4>Check the assumption under the roadmap</h4><p>An entire planned feature rested on models being reusable. They were not. The cheapest possible moment to discover that is before anything is drawn, and it was very nearly missed.</p></div></div>
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-star"/></svg></span><div><h4>The unglamorous integration is the one that sticks</h4><p>An iframe link pasted into a spreadsheet is nobody's portfolio piece. It is also why the thing got used.</p></div></div>
  <div><span class="k-tile"><svg class="k-ic"><use href="#i-users"/></svg></span><div><h4>Leaving a project is its own skill</h4><p>I handed this over five weeks in, on 4 July, to start a master's. What made that clean was that the discovery work was written down rather than held in my head — the reasoning survived the handover, which is the only reason it was worth anything after I left.</p></div></div>
</div>
