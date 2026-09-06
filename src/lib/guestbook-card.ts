/* One card, three places.
 *
 * The pass is rendered on the wall at build time, re-rendered in the browser
 * when the live list arrives, and drawn again — many times a second — in the
 * dialog while someone is customising it. Three copies of the markup would
 * drift within a week, so there is one function and it returns a string.
 *
 * A string means innerHTML, which means every value that came from a person has
 * to go through `esc` on the way in. The API validates all of this too; this is
 * the second lock, because the preview renders text the server has never seen.
 */
import { asciiArt, THEME_KEYS, type Theme } from './ascii-art';

export const FINISHES = [
  { key: 'paper', label: 'Paper' },
  { key: 'ink', label: 'Ink' },
  { key: 'blue', label: 'Blue' },
  { key: 'sky', label: 'Sky' },
] as const;

export type Finish = (typeof FINISHES)[number]['key'];
export const FINISH_KEYS = FINISHES.map((f) => f.key) as readonly string[];

export type Art = { theme: Theme; seed: number; finish: Finish };

export type CardEntry = {
  name: string;
  reason?: string;
  note?: string;
  /** Normalised signature path, 100x40 viewBox. */
  sign?: string;
  art?: Partial<Art>;
  date: string;
};

export const DEFAULT_ART: Art = { theme: 'waves', seed: 7, finish: 'paper' };

/* Anything off the menu falls back rather than throwing — a card with an
   unknown finish should still be a card. */
export function cleanArt(a: unknown): Art {
  const o = (a ?? {}) as Partial<Art>;
  return {
    theme: THEME_KEYS.includes(o.theme as Theme) ? (o.theme as Theme) : DEFAULT_ART.theme,
    seed: Number.isFinite(o.seed) ? Math.abs(Math.floor(o.seed as number)) % 997 : DEFAULT_ART.seed,
    finish: FINISH_KEYS.includes(o.finish as string) ? (o.finish as Finish) : DEFAULT_ART.finish,
  };
}

const esc = (v: unknown) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/* 05 SEP 2026 — a passport stamp, not a timestamp. Deliberately not relative
   ("2 days ago"): a guestbook is a record, and a record wants a date on it. */
export const stamp = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d
    .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    .toUpperCase();
};

/* The serial on a pass. Derived from the name and date rather than a counter,
   so it survives entries being trimmed and never needs to be stored. */
export const serial = (name: string, date: string) => {
  let h = 7;
  for (const ch of name + date) h = (h * 31 + ch.charCodeAt(0)) % 9973;
  return String(1000 + (h % 8999));
};

/** The pass itself. `cols`/`rows` size the art grid for the card's width. */
export function cardHtml(e: CardEntry, cols = 22, rows = 15): string {
  const art = cleanArt(e.art);
  /* Only ever empty in the studio preview — the API refuses a nameless entry.
     Not "Visitor", which under the VISITOR label reads as a stuck placeholder. */
  const name = e.name?.trim() || 'Your name';

  return (
    `<article class="gbc gbc--${art.finish}">` +
      `<pre class="gbc__art" aria-hidden="true">${esc(asciiArt(art.theme, cols, rows, art.seed))}</pre>` +
      `<div class="gbc__body">` +
        `<p class="gbc__mark">The guestbook</p>` +
        `<p class="gbc__lab">Visitor</p>` +
        `<p class="gbc__name">${esc(name)}</p>` +
        `<p class="gbc__meta"><span>${esc(stamp(e.date))}</span>` +
          (e.reason ? `<i>${esc(e.reason)}</i>` : '') +
        `</p>` +
        (e.note ? `<p class="gbc__note">${esc(e.note)}</p>` : '') +
        `<p class="gbc__foot">` +
          `<span class="gbc__no">No. ${esc(serial(name, e.date))}</span>` +
          `<span class="gbc__sig"><i>X</i>` +
            (e.sign
              ? `<svg class="gbc__ink" viewBox="0 0 100 40" aria-hidden="true"><path d="${esc(e.sign)}"/></svg>`
              : '') +
          `</span>` +
        `</p>` +
      `</div>` +
    `</article>`
  );
}

/* ---------------------------- borrowed names -----------------------------
   Not everyone wants to put their real name on a stranger's website, and the
   alternative to a made-up name is no signature at all. Two word lists give a
   memorable one nobody has to think up. */
const FIRST = [
  'Parchment', 'Marble', 'Cobalt', 'Velvet', 'Copper', 'Cinder', 'Harbour',
  'Lantern', 'Orchard', 'Pewter', 'Saffron', 'Thistle', 'Amber', 'Juniper',
  'Quartz', 'Wander', 'Meadow', 'Solstice',
];
const SECOND = [
  'Inkwell', 'Compass', 'Meridian', 'Almanac', 'Lantern', 'Anchor', 'Foxglove',
  'Beacon', 'Willow', 'Cadence', 'Ledger', 'Harbour', 'Trellis', 'Falcon',
  'Aurora', 'Sparrow', 'Atlas', 'Ember',
];

export function borrowedName(): string {
  const a = FIRST[Math.floor(Math.random() * FIRST.length)];
  const b = SECOND[Math.floor(Math.random() * SECOND.length)];
  return a === b ? borrowedName() : `${a} ${b}`;
}
