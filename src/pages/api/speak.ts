/* Text to speech for Scout's voice mode.
 *
 * Sibling of ./chat.ts and deliberately shaped like it: same same-origin
 * check, same per-IP window, same "log the provider's message, return a human
 * one" handling. The difference is what a mistake costs — chat bills per token
 * against a free tier, this bills per character against a card, so the caps
 * here are tighter and there is a hard character limit before the network is
 * touched at all.
 *
 * Provider is ElevenLabs. Swapping it is this file only: the browser gets
 * audio/mpeg and knows nothing about who made it, exactly as with chat.
 */
import type { APIRoute } from 'astro';

export const prerender = false;

/* Flash is the low-latency line — voice mode reads a sentence at a time and
   waits on each one, so time-to-first-byte matters more here than the extra
   fidelity of the slower models. */
const MODEL = 'eleven_flash_v2_5';
const VOICE = 'EXAVITQu4vr4xnSDxMaL'; // Sarah — warm, unhurried, reads well
const ENDPOINT = (voice: string) =>
  `https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_64`;

/* One sentence, not an essay. The client already splits answers into
   sentences; this is the backstop for anything calling the route directly. */
const MAX_CHARS = 320;
const WINDOW_MS = 60 * 60 * 1000;
/* Chat allows 10 questions an hour. An answer is a handful of sentences and
   each one is a request, so this is the same conversation length expressed in
   the unit this endpoint actually spends. */
const MAX_PER_WINDOW = 60;

const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 500) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  }
  return false;
}

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

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() || clientAddress || 'unknown';
  if (rateLimited(ip)) return bad(429, 'Voice limit reached for now.');

  const key = import.meta.env.ELEVENLABS_API_KEY ?? process.env.ELEVENLABS_API_KEY;
  /* 501, not 500: the client reads this as "fall back to the browser voice"
     rather than as an outage, so a site deployed without a key still talks. */
  if (!key) return bad(501, 'No voice configured.');

  let upstream: Response;
  try {
    upstream = await fetch(ENDPOINT(VOICE), {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'xi-api-key': key },
      body: JSON.stringify({
        text,
        model_id: MODEL,
        voice_settings: {
          /* Higher stability than the default: this reads the same handful of
             facts about one person over and over, and expressive variation
             across sentences of one answer reads as a wobble, not warmth. */
          stability: 0.5,
          similarity_boost: 0.75,
          speed: 1.0,
        },
      }),
    });
  } catch (err) {
    console.error('[speak] upstream unreachable', err);
    return bad(502, 'The voice is unreachable right now.');
  }

  if (!upstream.ok || !upstream.body) {
    // A bad key, an empty balance and a bad voice id are indistinguishable
    // from outside, so log what the provider actually said.
    console.error('[speak] upstream', upstream.status, (await upstream.text()).slice(0, 400));
    return bad(502, 'The voice had trouble with that line.');
  }

  /* Streamed straight through rather than buffered: playback can start on the
     first bytes, which is most of the felt latency in voice mode. */
  return new Response(upstream.body, {
    headers: {
      'content-type': 'audio/mpeg',
      'cache-control': 'no-store',
    },
  });
};
