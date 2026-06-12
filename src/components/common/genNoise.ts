/** Shared seeded randomness for the Lucid generative backgrounds. */

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Seeded 3D fractal value noise in [0, 1]. */
export function makeNoise(seed: number) {
  const rand = mulberry32(seed);
  const perm = new Uint8Array(512);
  const p = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  const lattice = (x: number, y: number, z: number) =>
    perm[(perm[(perm[x & 255] + y) & 255] + z) & 255] / 255;
  const smooth = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const noise3 = (x: number, y: number, z: number) => {
    const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
    const xf = smooth(x - xi), yf = smooth(y - yi), zf = smooth(z - zi);
    const v = (dx: number, dy: number, dz: number) => lattice(xi + dx, yi + dy, zi + dz);
    return lerp(
      lerp(lerp(v(0, 0, 0), v(1, 0, 0), xf), lerp(v(0, 1, 0), v(1, 1, 0), xf), yf),
      lerp(lerp(v(0, 0, 1), v(1, 0, 1), xf), lerp(v(0, 1, 1), v(1, 1, 1), xf), yf),
      zf
    );
  };

  // 3 octaves, persistence 0.55
  return (x: number, y: number, z: number) => {
    let sum = 0, amp = 1, freq = 1, norm = 0;
    for (let o = 0; o < 3; o++) {
      sum += noise3(x * freq, y * freq, z * freq) * amp;
      norm += amp;
      amp *= 0.55;
      freq *= 2;
    }
    return sum / norm;
  };
}

export function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
