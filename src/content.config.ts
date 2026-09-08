import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

/* Every .md file in src/content/work becomes a page at /work/<filename>.
   Add a project = add a file. Nothing else to wire up. */
const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    /* Card + page */
    client: z.string(),                       // logo / client name on the card
    title: z.string(),                        // outcome-led headline
    summary: z.string(),                      // 2-line description on the card
    tags: z.array(z.string()).default([]),

    /* Card styling */
    tint: z.string().default('#e3ecfd'),      // collage panel background
    logoStyle: z.enum(['google', 'plain']).default('plain'),

    /* The project's accent — hero light, section numbers, callouts, reading
       progress, and the folder on the home page. Name the product's own colour
       so each page wears its own clothes; the palettes live in global.css
       under `[data-accent]`. */
    accent: z.enum(['gold', 'violet', 'ember', 'azure']).default('gold'),

    /* The folder on the home page.
       `folderTone` is the folder body: dark carries the accent as light
       falling on it, light carries it as a wash. Two projects from the same
       client want opposite tones or the pair reads as one entry.
       `folderArt` is the still on the stamp — falls back to `cover`, then to
       the first collage shot. `folderClip` is an optional muted loop that
       plays while the folder is open; without one the still just floats. */
    folderTone: z.enum(['dark', 'light']).default('dark'),
    folderArt: z.string().optional(),
    folderArtAlt: z.string().optional(),
    folderClip: z.string().optional(),

    /* Dresses the assistant while this project is what you're looking at —
       on its case study page, or while its card is mid-viewport on the home
       page. The value names a costume drawn in AiBlob.astro; anything without
       a matching one there is simply ignored. */
    costume: z.enum(['fitness']).optional(),

    /* Collage photos, in z-order slot order (up to 6).
       Paths are relative to /public — e.g. "/assets/projects/foo.jpg" */
    shots: z.array(z.string()).max(6).default([]),

    /* Case study page */
    role: z.string().optional(),
    timeline: z.string().optional(),
    cover: z.string().optional(),       // hero visual on the case study
    coverAlt: z.string().optional(),
    /* How the hero frames the cover. A phone export gets a bezel, a desktop
       capture gets window chrome, `plain` gets neither (cut-outs, mockups
       that already carry their own frame). */
    coverKind: z.enum(['phone', 'window', 'plain']).default('plain'),
    /* The hero hook. Falls back to `title` — set it when the card headline is
       too long to work at display size. */
    heroTitle: z.string().optional(),

    /* Listing control */
    order: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

/* Résumé rows. Same shape for both lists, so they share a schema.
   `logo` is optional — without it the row renders a monogram tile. */
const resumeRow = z.object({
  org: z.string(),
  role: z.string(),
  dates: z.string(),
  label: z.string().optional(),  // small chip, e.g. "Client project"
  logo: z.string().optional(),   // e.g. "/assets/logos/flipkart.svg"
  logoBg: z.string().default('#eef1f6'),
  href: z.string().optional(),
  order: z.number().default(99),
});

const experience = defineCollection({
  loader: file('./src/data/experience.json'),
  schema: resumeRow,
});

/* Client engagements, kept apart from Experience. Same shape — the split is
   about what a reader should take in first, not about the data. */
const freelance = defineCollection({
  loader: file('./src/data/freelance.json'),
  schema: resumeRow,
});

const education = defineCollection({
  loader: file('./src/data/education.json'),
  schema: resumeRow,
});

/* Testimonials. `role` + `company` are where the person is *now*, not where
   they were when you worked together — so they need updating when people move.
   That's the whole reason they live in a data file rather than in markup. */
const testimonials = defineCollection({
  loader: file('./src/data/testimonials.json'),
  schema: z.object({
    name: z.string(),
    /* Blank when the person's profile states no job title — the component
       then shows the company on its own rather than inventing one. */
    role: z.string(),
    company: z.string(),
    /* LinkedIn. Optional, but worth having — it's what lets a recruiter
       confirm the person is real without leaving the page for long. */
    href: z.string().url().optional(),
    avatar: z.string().optional(),
    quote: z.string(),
    order: z.number().default(99),
  }),
});

export const collections = { work, experience, freelance, education, testimonials };
