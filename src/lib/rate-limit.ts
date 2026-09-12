/* The per-IP ceiling for the two routes that cost something to run.
 *
 * `chat.ts` spends Google quota per question and `speak.ts` spends Microsoft's
 * patience per sentence, so both need a real answer to "how often may one
 * person do this". Both used to keep that count in a module-level Map, which on
 * serverless is a count per *instance*: Vercel runs as many as traffic asks for
 * and recycles them freely, so a limit of ten was ten times however many
 * instances happened to be warm. It bounded accidents, not abuse.
 *
 * Redis is shared across every instance, so the count is now the real one. It
 * arrived for the guestbook; this is the same store and the same INCR/EXPIRE
 * shape, kept here rather than imported from that route because a limiter that
 * lives inside the guestbook is a limiter nobody thinks to reuse.
 *
 * The Map stays as the fallback. With no store configured — `astro dev` without
 * credentials — the old behaviour is better than no limit at all, and it is
 * also what answers if Redis is briefly unreachable. Failing open is deliberate:
 * a store outage should cost a few extra questions, not take the site's voice
 * away.
 */
const REST_URL =
  import.meta.env.KV_REST_API_URL ?? import.meta.env.UPSTASH_REDIS_REST_URL ?? '';
const REST_TOKEN =
  import.meta.env.KV_REST_API_TOKEN ?? import.meta.env.UPSTASH_REDIS_REST_TOKEN ?? '';

export const hasStore = Boolean(REST_URL && REST_TOKEN);

/* ------------------------------ fallback -------------------------------- */

const hits = new Map<string, number[]>();

function memoryLimited(key: string, max: number, windowSec: number): boolean {
  const now = Date.now();
  const windowMs = windowSec * 1000;
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= max) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 500) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  }
  return false;
}

/* -------------------------------- redis --------------------------------- */

/**
 * True when this key has already had its allowance for the window.
 *
 * `EXPIRE ... NX` rather than a plain EXPIRE: setting the TTL on every hit
 * pushes the window forward each time, so someone knocking steadily would
 * never see it reset and the counter would live forever. NX writes the TTL
 * once, when the counter is created, which is what makes it a window.
 */
export async function rateLimited(
  key: string,
  max: number,
  windowSec: number
): Promise<boolean> {
  if (!hasStore) return memoryLimited(key, max, windowSec);

  try {
    const res = await fetch(`${REST_URL}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${REST_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        ['INCR', key],
        ['EXPIRE', key, String(windowSec), 'NX'],
      ]),
    });
    if (!res.ok) return memoryLimited(key, max, windowSec);

    const out = await res.json();
    const n = Number(out?.[0]?.result ?? 0);
    /* A store that answers with nonsense is a store that is not working. Fall
       back rather than treating 0 as "plenty of room left". */
    if (!Number.isFinite(n) || n <= 0) return memoryLimited(key, max, windowSec);
    return n > max;
  } catch {
    return memoryLimited(key, max, windowSec);
  }
}
