/* One camera, shared by every reflective surface on the page.
 *
 * The reflection is the whole point of these components: the metal reflects
 * whoever is looking at it. That needs getUserMedia, and two rules follow.
 *
 * Nothing starts on mount. The stream is requested from a click and only from a
 * click — a permission prompt that appears while you are reading a page is a
 * prompt you deny without reading it.
 *
 * And one stream, not one per surface. Every getUserMedia call opens a separate
 * camera handle; several on one page means the indicator light cycling and, on
 * some machines, a visible re-exposure each time one opens.
 *
 * The frames never leave the tab. There is no canvas read, no upload, no
 * recording anywhere in this file — the MediaStream goes straight onto video
 * elements and the browser composites it.
 */

export type ReflectiveState = 'idle' | 'asking' | 'live' | 'denied' | 'unavailable';

let stream: MediaStream | null = null;
let state: ReflectiveState = 'idle';

/* Two sets, because "shows the reflection" and "keeps the camera on" are
   different jobs. A holder keeps the stream alive — the button, and the modal
   while it is open. A passive surface reflects whenever a stream happens to be
   running and has no say in whether it is: the resting tile on the page is one,
   and if it were a holder, opening the modal once would leave the camera on for
   the rest of the visit. */
const holders = new Set<HTMLVideoElement>();
const passive = new Set<HTMLVideoElement>();
const listeners = new Set<(s: ReflectiveState) => void>();

function set(next: ReflectiveState) {
  if (next === state) return;
  state = next;
  for (const fn of listeners) fn(state);
}

export function getState() {
  return state;
}

/** Subscribe to state. Fires immediately with the current value. */
export function onState(fn: (s: ReflectiveState) => void) {
  listeners.add(fn);
  fn(state);
  return () => listeners.delete(fn);
}

function bind(video: HTMLVideoElement) {
  if (!stream) return;
  video.srcObject = stream;
  /* Autoplay survives only because the element is muted and playsinline, and
     play() still rejects if the tab is backgrounded at the moment we bind. */
  video.play().catch(() => {});
}

/** Claim the camera. Gets the stream now if one is already running. */
export function attach(video: HTMLVideoElement) {
  holders.add(video);
  if (stream) bind(video);
}

/* Reference-counted, so closing the modal turns the camera off — unless the
   button is still using it. Leaving a stranger's camera running after they have
   finished looking at the thing is not a defensible default. */
export function detach(video: HTMLVideoElement) {
  holders.delete(video);
  video.srcObject = null;
  if (holders.size === 0) release();
}

/** Reflect whatever is already running, without keeping it running. */
export function join(video: HTMLVideoElement) {
  passive.add(video);
  if (stream) bind(video);
}

/* The filter chain re-runs per video frame, per surface, on the CPU. Three of
   them at once already costs half the frame rate, and this page is going to
   grow, so surfaces drop the stream the moment they leave the viewport. */
export function leave(video: HTMLVideoElement) {
  passive.delete(video);
  video.srcObject = null;
}

export async function request(): Promise<ReflectiveState> {
  if (state === 'live') return state;
  if (!navigator.mediaDevices?.getUserMedia) {
    /* Also the http:// case — getUserMedia is gated on a secure context, so a
       LAN preview over plain http lands here rather than on a prompt. */
    set('unavailable');
    return state;
  }

  set('asking');
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      /* Small on purpose. The frame is blurred and displaced well past
         legibility, so a 1080p stream would cost decode time for detail the
         filter destroys on the way past. */
      video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
      audio: false,
    });
  } catch (err) {
    stream = null;
    const name = (err as DOMException)?.name;
    set(name === 'NotFoundError' || name === 'OverconstrainedError' ? 'unavailable' : 'denied');
    return state;
  }

  for (const v of holders) bind(v);
  for (const v of passive) bind(v);
  /* Access can be revoked from the browser's own UI, which ends the track and
     tells us nothing else. */
  for (const t of stream.getTracks()) t.addEventListener('ended', () => release());
  set('live');
  return state;
}

export function release() {
  if (stream) for (const t of stream.getTracks()) t.stop();
  stream = null;
  for (const v of holders) v.srcObject = null;
  for (const v of passive) v.srcObject = null;
  if (state === 'live' || state === 'asking') set('idle');
}
