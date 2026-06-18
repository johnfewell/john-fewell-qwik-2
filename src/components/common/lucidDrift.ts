/**
 * Lucid Drift: generative background for the Lucid surface.
 *
 * Wisps surrender to a slowly metamorphosing noise field and leave additive
 * trails that are gradually "forgotten" (alpha erosion keeps the canvas
 * transparent, so it composites between the animated gradient and the haze
 * overlay). Seeded and deterministic; explore variations in
 * design/lucid-drift-viewer.html. Philosophy: design/lucid-drift-philosophy.md
 */

import { mulberry32, makeNoise, hexToRgb } from './genNoise';

const SEED = 1147;
const FIELD_SCALE = 0.0016;
const TURBULENCE = 2.5;
const DRIFT_SPEED = 84; // px/sec
const TIME_DRIFT = 0.18; // field metamorphosis per second
const TRAIL_FADE = 0.045; // alpha erosion per frame
const MAX_DPR = 1.5;

const LIGHT_PALETTE = ['#ee7752', '#e73c7e', '#23a6d5', '#23d5ab'];
const DARK_PALETTE = ['#8b7ae8', '#e73c7e', '#23a6d5', '#7df9d9'];

interface Wisp {
  x: number;
  y: number;
  px: number;
  py: number;
  hueBias: number;
  speedPhase: number;
  life: number;
}

export function startLucidDrift(canvas: HTMLCanvasElement) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const noise = makeNoise(SEED);
  const rand = mulberry32(SEED ^ 0x9e3779b9);
  let palette = (document.documentElement.classList.contains('dark') ? DARK_PALETTE : LIGHT_PALETTE).map(hexToRgb);

  new MutationObserver(() => {
    palette = (document.documentElement.classList.contains('dark') ? DARK_PALETTE : LIGHT_PALETTE).map(hexToRgb);
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  let w = 0;
  let h = 0;
  let wisps: Wisp[] = [];
  let zTime = 0;

  const spawn = (wisp: Wisp) => {
    wisp.x = wisp.px = rand() * w;
    wisp.y = wisp.py = rand() * h;
    wisp.hueBias = rand();
    wisp.speedPhase = rand() * Math.PI * 2;
    wisp.life = 3 + rand() * 12; // seconds
  };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(1600, Math.max(200, Math.round((w * h) / 1300)));
    wisps = Array.from({ length: count }, () => {
      const wisp = {} as Wisp;
      spawn(wisp);
      return wisp;
    });
  };

  let last = performance.now();
  let raf = 0;

  const frame = (now: number) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    zTime += TIME_DRIFT * dt;

    // Forgetting: erode old trails while keeping the canvas transparent.
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = `rgba(0, 0, 0, ${TRAIL_FADE})`;
    ctx.fillRect(0, 0, w, h);

    // Remembering: additive wisps, brightest where they overlap.
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';
    for (const wisp of wisps) {
      const a = noise(wisp.x * FIELD_SCALE, wisp.y * FIELD_SCALE, zTime) * Math.PI * 2 * TURBULENCE;
      const breath = 0.6 + 0.4 * Math.sin(zTime * 40 + wisp.speedPhase);
      const sp = DRIFT_SPEED * breath * dt;
      wisp.px = wisp.x;
      wisp.py = wisp.y;
      wisp.x += Math.cos(a) * sp;
      wisp.y += Math.sin(a) * sp;
      wisp.life -= dt;

      if (wisp.x < -10 || wisp.x > w + 10 || wisp.y < -10 || wisp.y > h + 10 || wisp.life <= 0) {
        spawn(wisp);
        continue;
      }

      // Velocity → warmth: fast wisps burn toward the warm end of the palette.
      const v = Math.min(breath, 1);
      const t = Math.min(0.75 * (1 - v) + 0.5 * wisp.hueBias, 0.999);
      const scaled = t * (palette.length - 1);
      const idx = Math.floor(scaled);
      const frac = scaled - idx;
      const c0 = palette[idx];
      const c1 = palette[idx + 1] || c0;
      const r = Math.round(c0[0] + (c1[0] - c0[0]) * frac);
      const g = Math.round(c0[1] + (c1[1] - c0[1]) * frac);
      const b = Math.round(c0[2] + (c1[2] - c0[2]) * frac);

      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${(0.16 + 0.3 * v).toFixed(3)})`;
      ctx.lineWidth = 1.1 + 1.1 * v;
      ctx.beginPath();
      ctx.moveTo(wisp.px, wisp.py);
      ctx.lineTo(wisp.x, wisp.y);
      ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';

    raf = requestAnimationFrame(frame);
  };

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  });

  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resize, 200);
  });

  resize();
  raf = requestAnimationFrame(frame);
}
