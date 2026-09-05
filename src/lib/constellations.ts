/* Star signs as ASCII, for the back of a guestbook card.
 *
 * Every visitor card carries the constellation of whatever sign the signer
 * picked, drawn in characters. It's the one personal thing on the card that
 * costs nobody any personal data — a birth month is not a birth date, and most
 * people will tell you their sign for fun when they'd refuse a date field.
 *
 * The constellations are stored as star positions and the lines between them
 * rather than as hand-typed art, so they rasterise to any grid the layout asks
 * for and stay consistent with each other. Hand-drawn ASCII drifts in weight
 * and density between figures; a rasteriser can't.
 *
 * These are recognisable, not astronomical. Star positions are simplified to
 * the figure people actually draw when they draw the sign.
 */
export type SignKey =
  | 'aries' | 'taurus' | 'gemini' | 'cancer' | 'leo' | 'virgo'
  | 'libra' | 'scorpio' | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';

type Figure = {
  label: string;
  /* Normalised to the unit square; y runs downward, like the grid. */
  stars: [number, number][];
  edges: [number, number][];
};

export const SIGNS: Record<SignKey, Figure> = {
  aries: {
    label: 'Aries',
    stars: [[0.16, 0.70], [0.38, 0.54], [0.54, 0.48], [0.76, 0.28]],
    edges: [[0, 1], [1, 2], [2, 3]],
  },
  taurus: {
    label: 'Taurus',
    stars: [[0.12, 0.20], [0.30, 0.38], [0.47, 0.53], [0.65, 0.40], [0.85, 0.22], [0.40, 0.76]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5]],
  },
  gemini: {
    label: 'Gemini',
    stars: [[0.20, 0.18], [0.29, 0.45], [0.36, 0.74], [0.58, 0.16], [0.66, 0.44], [0.74, 0.72]],
    edges: [[0, 1], [1, 2], [3, 4], [4, 5], [1, 4]],
  },
  cancer: {
    label: 'Cancer',
    stars: [[0.50, 0.20], [0.48, 0.48], [0.26, 0.70], [0.74, 0.66]],
    edges: [[0, 1], [1, 2], [1, 3]],
  },
  leo: {
    label: 'Leo',
    stars: [
      [0.16, 0.62], [0.22, 0.42], [0.33, 0.26], [0.48, 0.22],
      [0.57, 0.40], [0.74, 0.55], [0.86, 0.34], [0.50, 0.70],
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [5, 7], [7, 0]],
  },
  virgo: {
    label: 'Virgo',
    stars: [
      [0.12, 0.28], [0.30, 0.37], [0.47, 0.28], [0.51, 0.55],
      [0.69, 0.62], [0.86, 0.42], [0.35, 0.76],
    ],
    edges: [[0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [3, 6]],
  },
  libra: {
    label: 'Libra',
    stars: [[0.28, 0.26], [0.51, 0.18], [0.70, 0.40], [0.46, 0.52], [0.22, 0.64], [0.78, 0.70]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [2, 5]],
  },
  scorpio: {
    label: 'Scorpio',
    stars: [
      [0.10, 0.32], [0.20, 0.20], [0.32, 0.30], [0.46, 0.34],
      [0.58, 0.45], [0.68, 0.59], [0.72, 0.74], [0.58, 0.82],
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]],
  },
  sagittarius: {
    label: 'Sagittarius',
    stars: [
      [0.22, 0.44], [0.36, 0.28], [0.51, 0.42], [0.66, 0.28],
      [0.78, 0.46], [0.63, 0.62], [0.40, 0.64], [0.25, 0.62],
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0], [2, 6]],
  },
  capricorn: {
    label: 'Capricorn',
    stars: [[0.16, 0.30], [0.34, 0.22], [0.62, 0.34], [0.80, 0.56], [0.53, 0.74], [0.28, 0.60]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]],
  },
  aquarius: {
    label: 'Aquarius',
    stars: [
      [0.14, 0.32], [0.29, 0.22], [0.44, 0.34], [0.59, 0.24],
      [0.74, 0.38], [0.87, 0.28], [0.45, 0.60], [0.60, 0.74],
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [2, 6], [6, 7]],
  },
  pisces: {
    label: 'Pisces',
    stars: [[0.12, 0.22], [0.29, 0.33], [0.46, 0.43], [0.63, 0.54], [0.79, 0.66], [0.70, 0.26], [0.87, 0.17]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]],
  },
};

export const SIGN_KEYS = Object.keys(SIGNS) as SignKey[];
export const SIGN_LABELS = SIGN_KEYS.map((k) => ({ key: k, label: SIGNS[k].label }));

/* A stable hash, so the scattered background dots are the same on the server
   and in the browser and don't shuffle when a card re-renders. */
function noise(x: number, y: number, seed: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453;
  return n - Math.floor(n);
}

/* Draws one figure into a character grid.
 *
 * Three passes, cheapest first: an optional dust of faint dots, then the lines
 * between stars, then the stars themselves — so a star always wins the cell
 * it's in.
 *
 * `dust` is the fraction of cells that get a speck, and it is the difference
 * between a star field and a smudge. On the big blank pass the dust IS the
 * artwork, since there is no sign to draw. On a 196px card behind handwriting
 * it reads as dirt and buries the figure, so there it goes to zero and the
 * constellation is left to carry the card on its own. */
export function asciiSign(
  key: SignKey | null,
  cols = 34,
  rows = 18,
  seed = 1,
  dust = 0.14,
): string {
  const grid: string[][] = Array.from({ length: rows }, () => Array(cols).fill(' '));

  if (dust > 0) {
    const lo = 1 - dust;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const n = noise(x, y, seed);
        if (n > lo) grid[y][x] = n > lo + dust * 0.25 ? '˙' : '·';
      }
    }
  }

  const fig = key ? SIGNS[key] : null;
  if (fig) {
    const pt = ([sx, sy]: [number, number]): [number, number] => [
      Math.round(sx * (cols - 1)),
      Math.round(sy * (rows - 1)),
    ];

    for (const [a, b] of fig.edges) {
      const [x0, y0] = pt(fig.stars[a]);
      const [x1, y1] = pt(fig.stars[b]);
      const dx = x1 - x0;
      const dy = y1 - y0;
      /* The character carries the slope, so the line reads as a line rather
         than as a run of identical marks. Doubling dy compensates for cells
         being about twice as tall as they are wide. */
      const ch =
        Math.abs(dx) > Math.abs(dy) * 2 ? '-'
        : Math.abs(dy) * 2 > Math.abs(dx) * 4 ? '|'
        : dx * dy > 0 ? '\\'
        : '/';
      const steps = Math.max(Math.abs(dx), Math.abs(dy)) * 2;
      for (let i = 1; i < steps; i++) {
        const x = Math.round(x0 + (dx * i) / steps);
        const y = Math.round(y0 + (dy * i) / steps);
        if (grid[y] && grid[y][x] !== undefined) grid[y][x] = ch;
      }
    }

    fig.stars.forEach((s, i) => {
      const [x, y] = pt(s);
      if (grid[y] && grid[y][x] !== undefined) grid[y][x] = i % 3 === 0 ? '✦' : '*';
    });
  }

  return grid.map((r) => r.join('').replace(/\s+$/, '')).join('\n');
}
