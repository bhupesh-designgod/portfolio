/* The guestbook store.
 *
 * GET  -> the most recent entries plus a total, for the wall.
 * POST -> validate, filter, rate-limit, prepend.
 *
 * Backed by Upstash Redis over its REST API rather than a client library: the
 * whole surface used here is LPUSH/LTRIM/LRANGE/LLEN/INCR/EXPIRE, and a
 * dependency to send six commands would be pure weight in the function bundle.
 * Same reasoning as api/chat.ts talking to Gemini over plain REST.
 *
 * Entries go live immediately. That is a deliberate choice — a guestbook where
 * nothing appears until it is approved is a contact form wearing a costume —
 * and it is why `screen()` below is as strict as it is. Everything that lands
 * on the page has to survive a length cap, a link ban, a character-mix check
 * and a word list, and every IP gets three signatures an hour.
 */
import type { APIRoute } from 'astro';
import { cleanArt, type Art } from '../../lib/guestbook-card';

export const prerender = false;

/* Vercel's Upstash integration injects the KV_* pair; the Upstash marketplace
   listing injects the UPSTASH_* pair. Same service, same REST contract, two
   naming conventions depending on which button was clicked — so accept both
   rather than making the choice matter. */
const REST_URL =
  import.meta.env.KV_REST_API_URL ?? import.meta.env.UPSTASH_REDIS_REST_URL ?? '';
const REST_TOKEN =
  import.meta.env.KV_REST_API_TOKEN ?? import.meta.env.UPSTASH_REDIS_REST_TOKEN ?? '';

/* No store configured and running `astro dev`: keep entries in a git-ignored
   file so the whole flow — sign, submit, sweep, land on the wall — can be
   exercised locally without an account anywhere.

   Deliberately dev-only. The same fallback in production would be a lie: each
   serverless instance has its own filesystem and it is wiped between cold
   starts, so a visitor would watch their card appear and then find it gone. In
   production with no store the POST still refuses, which is honest. */
const DEV_FILE = '.guestbook-dev.json';
const devStore = import.meta.env.DEV && !REST_URL;

const KEY = 'guestbook';
const KEEP = 500;      // entries retained; the wall shows five
const PAGE = 24;       // returned per GET — enough for the future wall page
const MAX_PER_HOUR = 3;

const NAME_MAX = 24;
const NOTE_MAX = 90;
const SIGN_MAX = 1500;

const REASONS = ['Hiring', 'Collaboration', 'Just exploring', 'Industry buddy', 'Other'];

type Entry = {
  id: string;
  name: string;
  reason: string;
  note?: string;
  /* Signature path. */
  sign?: string;
  /* Theme, seed and finish — the two numbers and a name that reproduce the
     card exactly. Never an image: the wall re-renders the art at whatever size
     it needs, and nothing has to be stored or served but this. */
  art: Art;
  date: string;
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

/* ------------------------------- redis ---------------------------------- */

/* One round trip for many commands. Returns results positionally, or null if
   the store isn't configured or the request failed — every caller treats null
   as "no store", so an outage degrades the section to its build-time cards
   rather than breaking the page. */
async function pipeline(cmds: (string | number)[][]): Promise<any[] | null> {
  if (!REST_URL || !REST_TOKEN) return null;
  try {
    const res = await fetch(`${REST_URL}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${REST_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cmds.map((c) => c.map(String))),
    });
    if (!res.ok) return null;
    const out = await res.json();
    return Array.isArray(out) ? out.map((r) => r?.result ?? null) : null;
  } catch {
    return null;
  }
}

async function devRead(): Promise<Entry[]> {
  const { readFile } = await import('node:fs/promises');
  try {
    const raw = JSON.parse(await readFile(DEV_FILE, 'utf8'));
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

async function devWrite(list: Entry[]) {
  const { writeFile } = await import('node:fs/promises');
  await writeFile(DEV_FILE, JSON.stringify(list, null, 2));
}

async function readWall(): Promise<{ entries: Entry[]; total: number }> {
  if (devStore) {
    const all = await devRead();
    return { entries: all.slice(0, PAGE), total: all.length };
  }

  const out = await pipeline([
    ['LRANGE', KEY, 0, PAGE - 1],
    ['LLEN', KEY],
  ]);
  if (!out) return { entries: [], total: 0 };

  const rows: string[] = out[0] ?? [];
  const entries = rows
    .map((r) => {
      try {
        return JSON.parse(r) as Entry;
      } catch {
        return null;
      }
    })
    .filter((e): e is Entry => !!e && typeof e.name === 'string');

  return { entries, total: Number(out[1] ?? entries.length) };
}

/* --------------------------------- guards -------------------------------- */

/* Behind Vercel the socket address is the proxy, so the forwarded header is the
   only thing that identifies a caller. It is spoofable — this bounds accidents
   and casual spam, not somebody determined. */
/* The address the platform reports, preferred over anything the request says
   about itself: `x-forwarded-for` and `x-real-ip` are both headers a caller can
   set freely, and a limiter keyed off those is one a script can walk straight
   past by changing a string. Vercel overwrites them with the truth, so the
   values agree in production — but only one of them cannot be forged, so only
   one of them decides. */
function clientIp(req: Request, address?: string): string {
  if (address) return address;
  const fwd = req.headers.get('x-forwarded-for') ?? '';
  return fwd.split(',')[0].trim() || req.headers.get('x-real-ip') || 'anon';
}

async function rateLimited(ip: string): Promise<boolean> {
  const key = `gb:rl:${ip}`;
  const out = await pipeline([
    ['INCR', key],
    ['EXPIRE', key, 3600],
  ]);
  /* No store means no counter. The POST that follows will fail on its own, so
     refusing here would only swap one error for a less honest one. */
  if (!out) return false;
  return Number(out[0] ?? 0) > MAX_PER_HOUR;
}

/* Anything that lets a stranger put a link on someone else's portfolio is the
   whole prize for a spammer, so links lose in every form — scheme, bare
   domain, or an @ handle that resolves to one elsewhere. */
const LINKY =
  /(https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|io|ru|cn|xyz|top|shop|link|site|info|biz|co|me)\b|@[a-z0-9_.-]{3,})/i;

/* Small and blunt on purpose. A long profanity list catches Scunthorpe and
   misses every creative spelling anyway; this is here for the laziest case,
   and the link ban plus the rate limit do the real work. */
const BANNED =
  /\b(fuck|shit|bitch|cunt|nigg|faggot|rape|porn|viagra|casino|crypto\s*giveaway|seo\s*service)/i;

function screen(name: string, note: string): string | null {
  if (name.length < 1) return 'A name would be nice.';
  if (name.length > NAME_MAX) return `Names cap out at ${NAME_MAX} characters.`;
  if (note.length > NOTE_MAX) return `Notes cap out at ${NOTE_MAX} characters.`;

  if (LINKY.test(name) || LINKY.test(note)) return 'Links can’t go in the guestbook, sorry.';
  if (BANNED.test(name) || BANNED.test(note)) return 'Let’s keep it kind.';

  /* Has to be mostly language. Catches "asdkjhaskdjh", "▓▓▓▓▓" and the emoji
     wall, none of which read as a person having been here. */
  const letters = (name.match(/\p{L}/gu) ?? []).length;
  if (letters < Math.ceil(name.length * 0.5)) return 'That name didn’t come through.';

  if (note) {
    const noteLetters = (note.match(/\p{L}/gu) ?? []).length;
    if (noteLetters < Math.ceil(note.length * 0.4)) return 'That note didn’t come through.';
  }

  /* aaaaaaaaaa */
  if (/(.)\1{6,}/.test(name + ' ' + note)) return 'That note didn’t come through.';

  return null;
}

/* The signature arrives as path data built by the client. It is written into an
   SVG `d` attribute, so it is allowed to be exactly one shape: M/L commands and
   numbers. Anything else is dropped rather than rejected — a bad signature
   shouldn't cost someone their note. */
function cleanSign(raw: unknown): string | undefined {
  if (typeof raw !== 'string' || !raw) return undefined;
  const s = raw.slice(0, SIGN_MAX);
  if (!/^[ML0-9.\s-]+$/.test(s)) return undefined;
  return s;
}

/* --------------------------------- routes -------------------------------- */

export const GET: APIRoute = async () => json(await readWall());

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!devStore && (!REST_URL || !REST_TOKEN)) {
    return json({ error: 'The guestbook isn’t open yet. Check back shortly.' }, 503);
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'That didn’t come through.' }, 400);
  }

  const name = String(body?.name ?? '').replace(/\s+/g, ' ').trim();
  const note = String(body?.note ?? '').replace(/\s+/g, ' ').trim();
  const reason = String(body?.reason ?? '');

  if (!REASONS.includes(reason)) return json({ error: 'Pick a reason from the list.' }, 400);

  const bad = screen(name, note);
  if (bad) return json({ error: bad }, 400);

  /* The limiter is Redis-backed, so there is nothing to count against in the
     dev store — and rate-limiting yourself while building the thing is only an
     obstacle. */
  if (!devStore && (await rateLimited(clientIp(request, clientAddress)))) {
    return json({ error: 'You’ve signed already — thank you twice over.' }, 429);
  }

  const entry: Entry = {
    id: crypto.randomUUID(),
    name,
    reason,
    /* Anything off the menu falls back to the default rather than failing —
       a card with an unknown finish should still be a card. */
    art: cleanArt(body?.art),
    date: new Date().toISOString(),
    ...(note ? { note } : {}),
    ...(cleanSign(body?.sign) ? { sign: cleanSign(body?.sign) } : {}),
  };

  if (devStore) {
    const all = await devRead();
    all.unshift(entry);
    await devWrite(all.slice(0, KEEP));
  } else {
    const out = await pipeline([
      ['LPUSH', KEY, JSON.stringify(entry)],
      ['LTRIM', KEY, 0, KEEP - 1],
    ]);
    if (!out) return json({ error: 'Couldn’t save that. Try again in a moment.' }, 502);
  }

  /* Hand back the fresh wall so the client re-renders from the server's truth
     rather than optimistically splicing in its own copy. */
  return json(await readWall(), 201);
};
