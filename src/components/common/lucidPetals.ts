/**
 * Sakura Fall — generative falling-blossom background for the Lucid surface.
 *
 * Petals are rigid bodies surrendered to gravity, a shared noise wind, and
 * per-petal harmonic tumble. No trails, no loops: the renderer draws only the
 * present moment. Seeded and deterministic; explore variations in
 * design/sakura-fall-viewer.html. Philosophy: design/sakura-fall-philosophy.md
 */

import { mulberry32, makeNoise, hexToRgb } from './genNoise';

const SEED = 1147;
const FALL_SPEED = 46; // px/sec at depth 1
const WIND_STRENGTH = 70; // px/sec horizontal at depth 1, full gust
const WIND_SCALE = 0.0012; // spatial coherence of the wind field
const GUST_PERIOD = 0.055; // gust-channel noise speed (slow surges)
const BLOW_THRESHOLD = 0.7; // gust channel level where the rightward blow kicks in
const GUST_BLOW = 320; // px/sec rightward at depth 1, full blow
const MAX_DPR = 1.5;

const LIGHT_PALETTE = ['#ffd9e8', '#f48fb8', '#e76aa2', '#fff4f8'];
const DARK_PALETTE = ['#f4d6e8', '#cfa3cf', '#a98fd0', '#ffe9f4'];

interface Petal {
  x: number;
  y: number;
  depth: number; // 0.35 (far) … 1 (near)
  size: number;
  angle: number;
  spin: number; // rad/sec
  tumble: number; // face/edge flip phase
  tumbleSpeed: number; // rad/sec
  flutterPhase: number;
  color: [number, number, number];
}

export function startLucidPetals(canvas: HTMLCanvasElement) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const noise = makeNoise(SEED);
  const rand = mulberry32(SEED ^ 0x9e3779b9);
  let palette = (document.documentElement.classList.contains('dark') ? DARK_PALETTE : LIGHT_PALETTE).map(hexToRgb);
  let dark = document.documentElement.classList.contains('dark');

  const recolor = (petal: Petal) => {
    petal.color = palette[Math.floor(rand() * palette.length)];
  };

  new MutationObserver(() => {
    dark = document.documentElement.classList.contains('dark');
    palette = (dark ? DARK_PALETTE : LIGHT_PALETTE).map(hexToRgb);
    petals.forEach(recolor);
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  let w = 0;
  let h = 0;
  let petals: Petal[] = [];
  let time = 0;

  const spawn = (petal: Petal, fromTop: boolean) => {
    petal.depth = 0.35 + rand() * 0.65;
    petal.size = (14 + rand() * 16) * petal.depth;
    petal.x = rand() * (w + 200) - 100;
    petal.y = fromTop ? -20 - rand() * 60 : rand() * h;
    petal.angle = rand() * Math.PI * 2;
    petal.spin = (rand() - 0.5) * 3;
    petal.tumble = rand() * Math.PI * 2;
    petal.tumbleSpeed = 1.2 + rand() * 2.6;
    petal.flutterPhase = rand() * Math.PI * 2;
    recolor(petal);
  };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(160, Math.max(40, Math.round((w * h) / 11000)));
    petals = Array.from({ length: count }, () => {
      const petal = {} as Petal;
      spawn(petal, false); // pre-fill the sky so it doesn't start empty
      return petal;
    });
  };

  // Sakura silhouette: soft oval with the notched tip, in unit size.
  const tracePetal = (s: number) => {
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.5);
    ctx.bezierCurveTo(s * 0.55, -s * 0.45, s * 0.5, s * 0.3, s * 0.12, s * 0.5);
    ctx.quadraticCurveTo(0, s * 0.32, -s * 0.12, s * 0.5);
    ctx.bezierCurveTo(-s * 0.5, s * 0.3, -s * 0.55, -s * 0.45, 0, -s * 0.5);
    ctx.closePath();
  };

  let last = performance.now();
  let raf = 0;

  const frame = (now: number) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    time += dt;

    // Gust channel: mostly calm, occasionally surging. Squaring biases
    // the distribution toward stillness so the surge reads as an event.
    const gustRaw = noise(time * GUST_PERIOD, 7.3, 0);
    const gust = 0.25 + 1.9 * gustRaw * gustRaw;
    // Hard gusts have a direction: past the threshold the channel becomes a
    // rightward blow (~7 events/10min at this seed), ramping in smoothly.
    const blowRamp = Math.min(Math.max((gustRaw - BLOW_THRESHOLD) / 0.12, 0), 1);
    const blow = blowRamp * blowRamp;

    ctx.clearRect(0, 0, w, h);

    for (const petal of petals) {
      // Shared wind field: neighbors lean together, never in lockstep.
      const wind = (noise(petal.x * WIND_SCALE, petal.y * WIND_SCALE, time * 0.12) - 0.5) * 2;
      petal.tumble += petal.tumbleSpeed * dt * (0.7 + 0.6 * gust);
      const face = Math.sin(petal.tumble); // 1 face-on … 0 edge-on

      // Flat petals catch the air: they stall vertically and drift more.
      const vy = FALL_SPEED * petal.depth * (0.55 + 0.45 * (1 - Math.abs(face)));
      const vx =
        wind * WIND_STRENGTH * petal.depth * gust +
        blow * GUST_BLOW * petal.depth +
        Math.sin(time * 2.1 + petal.flutterPhase) * 9 * petal.depth;

      petal.x += vx * dt;
      petal.y += vy * dt;
      petal.angle += (petal.spin + wind * 2.4 * gust + blow * 2.5) * dt;

      if (petal.y > h + 30) spawn(petal, true);
      if (petal.x < -120) petal.x = w + 100;
      else if (petal.x > w + 120) petal.x = -100;

      const [r, g, b] = petal.color;
      const alpha = (dark ? 0.65 : 0.9) * (0.4 + 0.6 * petal.depth) * (0.55 + 0.45 * Math.abs(face));

      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.angle);
      ctx.scale(1, 0.35 + 0.65 * Math.abs(face)); // fake 3D flip
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
      tracePetal(petal.size);
      ctx.fill();
      ctx.restore();
    }

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
