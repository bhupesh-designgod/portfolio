/* Text to speech for Scout's voice mode.
 *
 * Sibling of ./chat.ts and deliberately shaped like it: same same-origin
 * check, same per-IP window, same "log the provider's message, return a human
 * one" handling.
 *
 * Provider is Edge TTS — the neural voices behind Microsoft Edge's Read Aloud,
 * reached over the same websocket Edge itself uses. There is no key, no
 * account and no billing relationship, which is the entire reason it is here:
 * every hosted alternative worth listening to wanted a card on file, and
 * Google's India signup wanted ₹1000 up front.
 *
 * The honest caveat: this is not a documented public API. Microsoft ships it
 * for their browser, not for us. It could change or start refusing traffic
 * with no notice — which is exactly why the client treats a failure here as
 * "use the browser's own voice" rather than as an error. Nothing breaks if it
 * goes away; it just gets worse again.
 */
import type { APIRoute } from 'astro';
import { rateLimited } from '../../lib/rate-limit';
import { Communicate } from 'edge-tts-ts';

export const prerender = false;

/* Microsoft tags each voice with a personality; this one is "Warm, Confident,
   Authentic, Honest", which is the right register for answering questions
   about someone's work. The Multilingual variant is deliberate — it handles
   "Bhupesh" and "Ikarus" far better than the plain en-US build, which reads
   both as if they were English words.

   Other male options, with Microsoft's own tags:
     en-US-BrianMultilingualNeural   Approachable, Casual, Sincere
     en-US-ChristopherNeural         Reliable, Authority
     en-US-GuyNeural                 Passion
     en-US-RogerNeural               Lively
   Female: en-US-EmmaMultilingualNeural, en-US-AriaNeural, en-US-JennyNeural. */
const VOICE = 'en-US-AndrewMultilingualNeural';

/* One sentence, not an essay. The client already splits answers into
   sentences; this is the backstop for anything calling the route directly. */
const MAX_CHARS = 320;
const WINDOW_SEC = 60 * 60;
/* Chat allows 10 questions an hour. An answer is a handful of sentences and
   each one is a request, so this is the same conversation length expressed in
   the unit this endpoint actually spends. Nothing here costs money any more,
   but an open synthesis endpoint is still not something to leave unbounded. */
const MAX_PER_WINDOW = 60;

/* Edge reports boundary offsets in 100-nanosecond ticks, the Windows unit.
   Milliseconds are what the client's clock speaks, so convert once here. */
const TICKS_PER_MS = 10_000;

/* One spoken word: `t` when it starts and `d` how long it lasts, both ms from
   the beginning of this clip, and `w` the word itself. `w` is what lets the
   client match a mark to a word on screen — the synthesiser does not always
   split text where a space does. */
type Mark = { t: number; d: number; w: string };

/* Synthesis of one sentence settles around 900ms. Past this something is
   wrong, and waiting longer only delays the fallback the visitor would rather
   have than silence. */
const TIMEOUT_MS = 8000;

/* Per-IP limiter, shared across instances via Redis. See lib/rate-limit.ts. */

const bad = (status: number, error: string) =>
  new Response(JSON.stringify({ error }), {
    status,
    headers: { 'content-type': 'application/json' },
  });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  /* Same-origin only. Doesn't stop a scripted client, but it does stop this
     endpoint being embedded as free narration on someone else's page. */
  const origin = request.headers.get('origin');
  if (origin) {
    const host = request.headers.get('host');
    if (host && new URL(origin).host !== host) {
      return bad(403, 'Cross-origin requests are not allowed.');
    }
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return bad(400, 'Expected JSON.');
  }

  const text = typeof body?.text === 'string' ? body.text.trim() : '';
  if (!text) return bad(400, 'Nothing to say.');
  if (text.length > MAX_CHARS) return bad(400, `Keep it under ${MAX_CHARS} characters.`);

  /* `clientAddress` first, and the header only as a fallback.
     `x-forwarded-for` is a request header: a client can send whatever it likes
     in it, and keying the limiter off it would let one script rotate through a
     fresh bucket per request and never hit a limit at all. Vercel overwrites
     the header with the real address, so in production the two agree — but the
     one the platform hands us is the one that cannot be typed by the caller,
     so that is the one that decides. */
  const ip =
    clientAddress || request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  if (await rateLimited(`speak:${ip}`, MAX_PER_WINDOW, WINDOW_SEC))
    return bad(429, 'Voice limit reached for now.');

  /* The stream yields audio chunks interleaved with boundary events, and both
     are wanted. The boundaries are the whole reason the subtitles line up: the
     synthesiser knows exactly when it says each word, and asking for that is
     free. Guessing instead — spreading a line's duration evenly across its
     characters — drifts within a sentence, because speech is not evenly paced
     and every clip opens with a beat of silence.

     Collected rather than piped: the pieces arrive over a websocket, and one
     sentence is small enough that assembling it costs nothing and saves the
     client a chunked body to reason about. */
  const parts: Uint8Array[] = [];
  const marks: Mark[] = [];
  try {
    /* WordBoundary, not the library's SentenceBoundary default — a mark per
       sentence on a route that only ever sends one sentence is a mark at zero
       and nothing else. */
    const speech = new Communicate(text, { voice: VOICE, boundary: 'WordBoundary' });
    const deadline = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('timed out')), TIMEOUT_MS)
    );

    await Promise.race([
      (async () => {
        for await (const chunk of speech.stream()) {
          if (chunk.type === 'audio' && chunk.data) {
            parts.push(chunk.data);
          } else if (chunk.type === 'WordBoundary') {
            marks.push({
              t: Math.round(chunk.offset / TICKS_PER_MS),
              d: Math.round(chunk.duration / TICKS_PER_MS),
              w: chunk.text,
            });
          }
        }
      })(),
      deadline,
    ]);
  } catch (err) {
    console.error('[speak] synthesis failed', err);
    return bad(502, 'The voice had trouble with that line.');
  }

  if (!parts.length) {
    console.error('[speak] no audio returned');
    return bad(502, 'The voice returned nothing.');
  }

  const mp3 = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let at = 0;
  for (const p of parts) {
    mp3.set(p, at);
    at += p.length;
  }

  /* JSON with the audio base64'd rather than a binary body with the marks in a
     header. It costs a third more bytes on a payload measured in tens of
     kilobytes, and buys a response that is one thing rather than two — no
     header size ceiling to discover in production, and `curl` shows you the
     timings. The fetches already run ahead of playback, so the extra bytes
     land in slack time rather than in front of the voice. */
  return new Response(
    JSON.stringify({ audio: Buffer.from(mp3).toString('base64'), marks }),
    {
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-store',
      },
    }
  );
};
