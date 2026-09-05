/* The one serverless route on the site. Everything else prerenders.
 *
 * Talks to the Gemini API over plain REST rather than an SDK — one less
 * dependency in the function bundle, and the request shape is small enough
 * that an SDK would only be indirection.
 *
 * This endpoint spends someone's quota on behalf of anonymous visitors, so the
 * guards all run before the network is ever touched — see `guard()` below.
 */
import type { APIRoute } from 'astro';
import { portfolioContext } from '../../lib/portfolio-context';

export const prerender = false;

/* gemini-2.5-flash is listed on the account but rejected for new keys
   ("no longer available to new users"), so this is the current equivalent:
   the fastest and cheapest first-party model, which is the right shape for
   short Q&A over a fixed body of text. `gemma-4-31b-it` also works if you'd
   rather run open weights. */
const MODEL = 'gemini-3.5-flash-lite';
const ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/interactions?alt=sse';

const MAX_CHARS = 500; // one question, not a pasted document
const MAX_TURNS = 8; // ~4 exchanges of history
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 10;

type Turn = { role: 'user' | 'assistant'; content: string };

/* Best-effort per-IP limiter. On serverless each cold instance starts empty, so
   this bounds accidents and casual abuse, not a determined attacker. The real
   ceiling is the provider's own quota. */
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

/** Everything that can reject a request without calling the model. */
function guard(request: Request, messages: unknown): Response | null {
  /* Same-origin only. Doesn't stop a scripted client, but it does stop this
     endpoint being embedded as free API credit on someone else's page. */
  const origin = request.headers.get('origin');
  if (origin) {
    const host = request.headers.get('host');
    if (host && new URL(origin).host !== host) {
      return bad(403, 'Cross-origin requests are not allowed.');
    }
  }

  if (!Array.isArray(messages) || messages.length === 0) return bad(400, 'No messages provided.');
  if (messages.length > MAX_TURNS) return bad(400, 'Conversation too long. Start a new one.');

  for (const m of messages) {
    const t = m as Partial<Turn>;
    if (!t || (t.role !== 'user' && t.role !== 'assistant') || typeof t.content !== 'string') {
      return bad(400, 'Malformed message.');
    }
    if (t.content.length > MAX_CHARS) {
      return bad(400, `Keep messages under ${MAX_CHARS} characters.`);
    }
  }

  return null;
}

/* The documented `input` field takes a string. Rather than guess at a
   structured multi-turn shape, the short history is inlined — for a 2–4
   exchange conversation about a portfolio that reads identically to the model.
   If this ever needs real turn separation, only this function changes. */
function asInput(messages: Turn[]): string {
  if (messages.length === 1) return messages[0].content;
  return messages
    .map((m) => `${m.role === 'user' ? 'Visitor' : 'You'}: ${m.content}`)
    .join('\n\n');
}

/* The stream interleaves two kinds of step, verified against the live API:
 *
 *   step.start  { step: { type: "thought" } }        <- reasoning, not for the user
 *   step.delta  { delta: { type: "thought_signature" } }
 *   step.stop
 *   step.start  { step: { type: "model_output" } }   <- the actual answer
 *   step.delta  { delta: { type: "text", text: "..." } }
 *   step.stop
 *   interaction.completed
 *
 * Note the two different text paths: a model_output delta carries `delta.text`,
 * while a thought summary carries `delta.content.text`. Reading the wrong one
 * streams the model's private reasoning into the chat bubble.
 *
 * So a parser that just greps for any `text` field would stream the model's
 * private reasoning into the chat bubble. This one tracks which step it's
 * inside and only emits from `model_output`.
 */
function makeParser() {
  let inOutput = false;
  return function read(evt: any): { text?: string; done?: boolean } {
    switch (evt?.event_type) {
      case 'step.start':
        inOutput = evt.step?.type === 'model_output';
        return {};
      case 'step.stop':
        inOutput = false;
        return {};
      case 'step.delta': {
        if (!inOutput || evt.delta?.type !== 'text') return {};
        const text = evt.delta?.text ?? evt.delta?.content?.text;
        return typeof text === 'string' && text ? { text } : {};
      }
      case 'interaction.completed':
        return { done: true };
      default:
        return {};
    }
  };
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return bad(400, 'Expected JSON.');
  }

  const rejection = guard(request, body?.messages);
  if (rejection) return rejection;

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() || clientAddress || 'unknown';
  if (rateLimited(ip)) {
    return bad(429, "That's a lot of questions! Email designs.bhupesh@gmail.com and he'll answer directly.");
  }

  const key = import.meta.env.GOOGLE_API_KEY ?? process.env.GOOGLE_API_KEY;
  if (!key) return bad(500, 'The assistant is not configured yet.');

  let upstream: Response;
  try {
    upstream = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({
        model: MODEL,
        input: asInput(body.messages as Turn[]),
        stream: true,
        system_instruction: await portfolioContext(),
        generation_config: {
          // Low, not off: these models think by default, and a portfolio
          // answer needs none of it. This is the latency and quota lever.
          thinking_level: 'low',
          // Answers should come from the supplied material, not be invented
          // around it — so bias toward the boring, faithful phrasing.
          temperature: 0.3,
        },
      }),
    });
  } catch (err) {
    console.error('[chat] upstream unreachable', err);
    return bad(502, 'The assistant is unreachable right now.');
  }

  if (!upstream.ok || !upstream.body) {
    // Log the provider's own message — a bad key or an exhausted quota both
    // land here and are otherwise indistinguishable from the outside.
    console.error('[chat] upstream', upstream.status, (await upstream.text()).slice(0, 500));
    return bad(
      502,
      upstream.status === 429
        ? "The assistant has hit today's limit. Email designs.bhupesh@gmail.com instead."
        : 'The assistant had trouble answering. Try again in a moment.',
    );
  }

  /* Re-emit as our own minimal SSE rather than proxying the provider's format
     through — the browser then never has to know which model is behind this. */
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const sse = new ReadableStream({
    async start(controller) {
      const send = (o: unknown) => controller.enqueue(encoder.encode(`data: ${JSON.stringify(o)}\n\n`));
      const reader = upstream.body!.getReader();
      const parse = makeParser();
      let buf = '';

      try {
        outer: while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });

          const chunks = buf.split('\n\n');
          buf = chunks.pop() ?? '';

          for (const chunk of chunks) {
            for (const line of chunk.split('\n')) {
              if (!line.startsWith('data:')) continue;
              const raw = line.slice(5).trim();
              if (!raw) continue;
              let evt: any;
              try {
                evt = JSON.parse(raw);
              } catch {
                continue; // keep-alive or non-JSON line
              }
              // The provider reports its own errors inside the stream too.
              if (evt?.error) {
                console.error('[chat] in-stream error', evt.error);
                send({ error: 'upstream' });
                break outer;
              }
              const { text, done: finished } = parse(evt);
              if (text) send({ text });
              if (finished) break outer;
            }
          }
        }
        /* Written raw, not through send(): that helper JSON-stringifies, which
           turned the sentinel into `data: "[DONE]"` — quotes included — so the
           client's equality check never matched, the quoted string was parsed
           as a payload, and `.text` on a string appended the word "undefined"
           to the end of every answer. */
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      } catch (err) {
        console.error('[chat] stream broke', err);
        send({ error: 'stream' });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(sse, {
    headers: {
      'content-type': 'text/event-stream',
      'cache-control': 'no-cache',
      connection: 'keep-alive',
    },
  });
};
