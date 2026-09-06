/* ASCII art for guestbook passes.
 *
 * Every card carries a generated pattern. The visitor picks the theme and can
 * reshuffle it; the seed they land on is stored with their entry, so the card
 * they made in the dialog is the card that appears on the wall. That round trip
 * — make a thing, see the thing — is the whole point of the section, and it
 * only works if the art is reproducible from a couple of numbers rather than
 * being a picture that has to be uploaded and stored.
 *
 * Everything is drawn into a character grid at whatever size the layout asks
 * for, so the same entry renders on a 373px card and in the dialog preview
 * without holding two copies of anything.
 */
export type Theme = 'waves' | 'contour' | 'orbit' | 'stars' | 'weave' | 'bloom';

export const THEMES: { key: Theme; label: string }[] = [
  { key: 'waves', label: 'Waves' },
  { key: 'contour', label: 'Contour' },
  { key: 'orbit', label: 'Orbit' },
  { key: 'stars', label: 'Stars' },
  { key: 'weave', label: 'Weave' },
  { key: 'bloom', label: 'Bloom' },
];

export const THEME_KEYS = THEMES.map((t) => t.key);

/* Light to heavy. Deliberately stops short of solid blocks — the art sits
   behind a name and a handwritten note, and a ramp that reaches '@' turns the
   card into a texture the text has to fight. */
const RAMP = ' ·:-=+*%';

/* Deterministic hash in [0,1). Same seed, same card, forever — which matters
   because these are stored as a seed and re-rendered, not saved as pixels. */
function hash(x: number, y: number, s: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7 + s * 74.7) * 43758.5453;
  return n - Math.floor(n);
}

/* Value noise with a smoothstep between lattice points — cheap, and smooth
   enough that contour bands come out as curves rather than staircases. */
function noise(x: number, y: number, s: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi, s);
  const b = hash(xi + 1, yi, s);
  const c = hash(xi, yi + 1, s);
  const d = hash(xi + 1, yi + 1, s);
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}

const ramp = (v: number) => RAMP[Math.max(0, Math.min(RAMP.length - 1, Math.round(v * (RAMP.length - 1))))];

/* --------------------------- the twelve figures ---------------------------
   The `stars` theme draws a constellation. Recognisable, not astronomical:
   these are the figures people actually draw when they draw the sign. */
const FIGURES: { stars: [number, number][]; edges: [number, number][] }[] = [
  { stars: [[0.16, 0.70], [0.38, 0.54], [0.54, 0.48], [0.76, 0.28]], edges: [[0, 1], [1, 2], [2, 3]] },
  { stars: [[0.12, 0.20], [0.30, 0.38], [0.47, 0.53], [0.65, 0.40], [0.85, 0.22], [0.40, 0.76]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5]] },
  { stars: [[0.20, 0.18], [0.29, 0.45], [0.36, 0.74], [0.58, 0.16], [0.66, 0.44], [0.74, 0.72]],
    edges: [[0, 1], [1, 2], [3, 4], [4, 5], [1, 4]] },
  { stars: [[0.50, 0.20], [0.48, 0.48], [0.26, 0.70], [0.74, 0.66]], edges: [[0, 1], [1, 2], [1, 3]] },
  { stars: [[0.16, 0.62], [0.22, 0.42], [0.33, 0.26], [0.48, 0.22], [0.57, 0.40], [0.74, 0.55], [0.86, 0.34], [0.50, 0.70]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [5, 7], [7, 0]] },
  { stars: [[0.12, 0.28], [0.30, 0.37], [0.47, 0.28], [0.51, 0.55], [0.69, 0.62], [0.86, 0.42], [0.35, 0.76]],
    edges: [[0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [3, 6]] },
  { stars: [[0.28, 0.26], [0.51, 0.18], [0.70, 0.40], [0.46, 0.52], [0.22, 0.64], [0.78, 0.70]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [2, 5]] },
  { stars: [[0.10, 0.32], [0.20, 0.20], [0.32, 0.30], [0.46, 0.34], [0.58, 0.45], [0.68, 0.59], [0.72, 0.74], [0.58, 0.82]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]] },
  { stars: [[0.22, 0.44], [0.36, 0.28], [0.51, 0.42], [0.66, 0.28], [0.78, 0.46], [0.63, 0.62], [0.40, 0.64], [0.25, 0.62]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0], [2, 6]] },
  { stars: [[0.16, 0.30], [0.34, 0.22], [0.62, 0.34], [0.80, 0.56], [0.53, 0.74], [0.28, 0.60]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]] },
  { stars: [[0.14, 0.32], [0.29, 0.22], [0.44, 0.34], [0.59, 0.24], [0.74, 0.38], [0.87, 0.28], [0.45, 0.60], [0.60, 0.74]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [2, 6], [6, 7]] },
  { stars: [[0.12, 0.22], [0.29, 0.33], [0.46, 0.43], [0.63, 0.54], [0.79, 0.66], [0.70, 0.26], [0.87, 0.17]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]] },
];

/* -------------------------------------------------------------------------- */

/** Renders one pass's artwork. Same (theme, seed, size) always gives the same grid. */
export function asciiArt(theme: Theme, cols = 22, rows = 16, seed = 1): string {
  const g: string[][] = Array.from({ length: rows }, () => Array(cols).fill(' '));
  const s = seed % 997;

  /* Cells are about twice as tall as they are wide, so every generator works in
     a corrected space — without this every circle comes out an ellipse. */
  const AR = 0.5;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const nx = x / (cols - 1);
      const ny = y / (rows - 1);
      /* Centred, aspect-corrected coordinates for the radial themes. */
      const dx = (nx - 0.5) / AR;
      const dy = ny - 0.5;
      const r = Math.hypot(dx * AR * 2, dy * 2);
      const th = Math.atan2(dy, dx * AR * 2);

      let v = -1;

      if (theme === 'waves') {
        /* Two detuned sines, one modulating the other, so the bands drift
           rather than marching in step. */
        const w = Math.sin(nx * 9.5 + Math.sin(ny * 3.1 + s) * 2.6 + s * 0.7);
        const band = 1 - Math.abs(w);
        v = band > 0.4 ? (band - 0.4) / 0.6 : -1;
      } else if (theme === 'contour') {
        /* Topographic: slice the noise field into bands and keep the edges.
           One octave, not fbm — a high-frequency octave at even 15% amplitude
           swings the value across more than a whole band within a couple of
           cells, and the contours break up into scattered specks. */
        const n = noise(nx * 2.2 + s * 0.19, ny * 2.2 + s * 0.19, s);
        const f = (n * 5) % 1;
        v = f < 0.34 ? 1 - f / 0.34 : -1;
      } else if (theme === 'orbit') {
        const o = Math.sin(r * 9 - th * 2.5 + s);
        v = o > 0.62 ? (o - 0.62) / 0.38 : -1;
      } else if (theme === 'bloom') {
        /* Radial symmetry: petal count varies with the seed. */
        const petals = 5 + (s % 4);
        const b = Math.cos(th * petals) * Math.cos(r * 3.4 - 0.5);
        v = b > 0.34 ? (b - 0.34) / 0.66 : -1;
      }

      if (v >= 0) g[y][x] = ramp(0.32 + v * 0.68);
    }
  }

  if (theme === 'weave') {
    /* Truchet tiles: one diagonal per cell, chosen by hash. Nothing else in
       ASCII gives this much structure for this little. */
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const h = hash(x, y, s);
        /* Only a thin slice left blank. Truchet needs the diagonals to meet at
           cell corners to read as a weave; punch too many holes and it stops
           being a pattern and starts looking like a rendering fault. */
        if (h > 0.12) g[y][x] = h > 0.56 ? '\\' : '/';
      }
    }
  }

  if (theme === 'stars') {
    const fig = FIGURES[s % FIGURES.length];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const n = hash(x, y, s + 3);
        if (n > 0.88) g[y][x] = n > 0.965 ? '˙' : '·';
      }
    }
    const pt = ([sx, sy]: [number, number]): [number, number] => [
      Math.round(sx * (cols - 1)),
      Math.round(sy * (rows - 1)),
    ];
    for (const [a, b] of fig.edges) {
      const [x0, y0] = pt(fig.stars[a]);
      const [x1, y1] = pt(fig.stars[b]);
      const ddx = x1 - x0;
      const ddy = y1 - y0;
      /* The character carries the slope, so a line reads as a line rather than
         as a run of identical marks. */
      const ch =
        Math.abs(ddx) > Math.abs(ddy) * 2 ? '-'
        : Math.abs(ddy) * 2 > Math.abs(ddx) * 4 ? '|'
        : ddx * ddy > 0 ? '\\'
        : '/';
      const steps = Math.max(Math.abs(ddx), Math.abs(ddy)) * 2;
      for (let i = 1; i < steps; i++) {
        const x = Math.round(x0 + (ddx * i) / steps);
        const y = Math.round(y0 + (ddy * i) / steps);
        if (g[y] && g[y][x] !== undefined) g[y][x] = ch;
      }
    }
    fig.stars.forEach((p, i) => {
      const [x, y] = pt(p);
      if (g[y] && g[y][x] !== undefined) g[y][x] = i % 3 === 0 ? '✦' : '*';
    });
  }

  return g.map((r) => r.join('').replace(/\s+$/, '')).join('\n');
}
