/* Builds the spoken walkthroughs.
 *
 * Run locally (`npm run walkthrough`), commit what it writes. Deliberately NOT
 * part of the Vercel build:
 *
 *   - Edge TTS is an endpoint Microsoft ships for its own browser and documents
 *     nowhere. Calling it from a build container is the same datacenter-IP
 *     exposure as calling it from a serverless function, just moved.
 *   - If it ever starts refusing that traffic, a build-time dependency means the
 *     whole site stops deploying, including changes that have nothing to do with
 *     this. A committed mp3 keeps working forever.
 *
 * So the audio is a checked-in artifact and the site has no TTS dependency at
 * any stage, build or runtime. Ten people or ten thousand opening a walkthrough
 * at once is just files off the CDN.
 *
 * Beats are cached by a hash of their text, so editing one line re-synthesises
 * one beat rather than the whole tour.
 */
import { createHash } from 'node:crypto';
import { mkdir, readdir, readFile, writeFile, unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Communicate } from 'edge-tts-ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src/data/walkthroughs');
const OUT = join(ROOT, 'public/walkthrough');
const CASES = join(ROOT, 'src/content/work');

/* Edge reports boundary offsets in 100-nanosecond ticks, the Windows unit.
   Milliseconds are what the browser's clock speaks, so convert once here. */
const TICKS_PER_MS = 10_000;
const TIMEOUT_MS = 30_000;

const hash = (s) => createHash('sha1').update(s).digest('hex').slice(0, 10);

/* Mirrors github-slugger, which is what Astro uses for heading ids. It only has
   to agree for the headings we actually write; if it ever drifts, the anchor
   check below fails loudly rather than shipping a beat that scrolls nowhere. */
const slug = (s) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

/* Every beat points at an element id. A renamed section would otherwise break
   the tour silently: the audio still plays, the page just never moves. */
async function anchorsFor(caseSlug) {
  const file = join(CASES, `${caseSlug}.md`);
  if (!existsSync(file)) return null;
  const md = await readFile(file, 'utf8');
  const ids = new Set(['csHero', 'csRead', 'cs-more-head']);
  for (const m of md.matchAll(/^#{2,3}\s+(.+)$/gm)) ids.add(slug(m[1].replace(/[*`]/g, '')));
  return ids;
}

async function speak(text, voice) {
  const parts = [];
  const marks = [];
  const speech = new Communicate(text, { voice, boundary: 'WordBoundary' });
  const deadline = new Promise((_, rej) =>
    setTimeout(() => rej(new Error('timed out')), TIMEOUT_MS),
  );
  await Promise.race([
    (async () => {
      for await (const chunk of speech.stream()) {
        if (chunk.type === 'audio' && chunk.data) parts.push(chunk.data);
        else if (chunk.type === 'WordBoundary') {
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
  if (!parts.length) throw new Error('no audio returned');
  return { mp3: Buffer.concat(parts.map((p) => Buffer.from(p))), marks };
}

async function build(file) {
  const script = JSON.parse(await readFile(join(SRC, file), 'utf8'));
  const { slug: caseSlug, voice, beats } = script;
  const dir = join(OUT, caseSlug);
  await mkdir(dir, { recursive: true });

  /* The previous run's marks, so an unchanged beat costs no network. */
  const manifestPath = join(dir, 'manifest.json');
  const prev = existsSync(manifestPath)
    ? JSON.parse(await readFile(manifestPath, 'utf8'))
    : { beats: [] };
  const cached = new Map(prev.beats.map((b) => [b.id, b]));

  const anchors = await anchorsFor(caseSlug);
  const missing = anchors ? beats.filter((b) => !anchors.has(b.at)) : [];
  if (missing.length) {
    console.error(`\n  x ${caseSlug}: ${missing.length} beat(s) point at ids not on the page:`);
    for (const b of missing) console.error(`      #${b.at}  "${b.say.slice(0, 52)}..."`);
    console.error('    Fix the anchor in the script, or the heading in the case study.\n');
    process.exitCode = 1;
    return null;
  }

  const out = [];
  let made = 0;
  let reused = 0;

  for (const [i, beat] of beats.entries()) {
    const id = hash(voice + ' ' + beat.say);
    const rel = `/walkthrough/${caseSlug}/${id}.mp3`;
    const abs = join(dir, `${id}.mp3`);
    const hit = cached.get(id);

    let marks;
    let bytes;
    if (hit && existsSync(abs)) {
      marks = hit.marks;
      bytes = hit.bytes;
      reused++;
    } else {
      const r = await speak(beat.say, voice);
      await writeFile(abs, r.mp3);
      marks = r.marks;
      bytes = r.mp3.length;
      made++;
      console.log(`  + ${String(i + 1).padStart(2, '0')}/${beats.length}  ${(bytes / 1024).toFixed(0)} KB  #${beat.at}`);
    }

    const last = marks.at(-1);
    out.push({
      id,
      at: beat.at,
      say: beat.say,
      src: rel,
      /* From the word marks, so it is known before the audio loads: the player
         needs it to pace the scroll. `audio.duration` is authoritative once the
         clip is decoded, and the player prefers it. */
      ms: last ? last.t + last.d : 0,
      hold: beat.hold ?? 0,
      bytes,
      marks,
    });
  }

  const manifest = {
    slug: caseSlug,
    title: script.title,
    voice,
    generated: new Date().toISOString(),
    totalMs: out.reduce((n, b) => n + b.ms + b.hold, 0),
    beats: out,
  };
  await writeFile(manifestPath, JSON.stringify(manifest));

  /* Drop mp3s no beat references any more, so editing the script does not
     silently grow the repo. */
  const keep = new Set(out.map((b) => `${b.id}.mp3`));
  let pruned = 0;
  for (const f of await readdir(dir)) {
    if (f.endsWith('.mp3') && !keep.has(f)) {
      await unlink(join(dir, f));
      pruned++;
    }
  }

  const kb = out.reduce((n, b) => n + b.bytes, 0) / 1024;
  console.log(
    `  ${caseSlug}: ${out.length} beats, ${(manifest.totalMs / 60000).toFixed(1)} min, ` +
      `${(kb / 1024).toFixed(2)} MB (${made} new, ${reused} cached` +
      `${pruned ? `, ${pruned} pruned` : ''})`,
  );
  return manifest;
}

const files = (await readdir(SRC)).filter((f) => f.endsWith('.json'));
if (!files.length) {
  console.log('No walkthrough scripts in src/data/walkthroughs.');
  process.exit(0);
}
console.log(`\nBuilding ${files.length} walkthrough${files.length > 1 ? 's' : ''}...\n`);
for (const f of files) await build(f);
console.log('');
