# Product

## Register

brand

## Users

Primary audience is **recruiters and hiring managers** evaluating John Fewell for a
job or contract. They arrive skimming fast, with low patience and high pattern-match
instincts — they are deciding within seconds whether this person is credible and worth
a conversation. Secondary readers are peers and the dev community who find the blog.

The job to be done: in one quick pass, convince the visitor that John is a strong,
distinctive engineer/designer worth reaching out to, and make the contact path obvious.

## Product Purpose

johnfewell.com is John Fewell's personal site and blog (Astro + React islands +
Tailwind, static on Cloudflare Pages, migrated from the Qwind template). Its job is to
**drive job and contract opportunities**: present work, point of view, and writing in a
way that builds credibility and lands an outreach. Success looks like a recruiter or
client leaving convinced and taking the next step (email / contact), not just a pretty
page that gets a glance.

The site itself is part of the pitch: because the audience is hiring for design and
engineering, the craft of the site is evidence, not decoration.

## Brand Personality

**Bold, expressive, playful.** Confident and memorable, willing to take a visual stance
rather than play it safe — the recent Lucid 2026 direction and the generative Sakura /
petals background set that tone. Warm and human, never corporate. The voice should read
like a real person with taste and opinions, not a template or a committee.

## Anti-references

- **Generic AI/SaaS template.** No cream/sand body backgrounds, no tiny tracked-uppercase
  eyebrows above every section, no identical icon-card grids, no hero-metric blocks, no
  gradient text. If it looks like a default landing-page generator, it has failed.
- **Corporate / stiff.** No stock photography, no enterprise jargon, no soulless
  "professional" polish that strips out personality.

## Design Principles

- **The site is the portfolio.** Craft is the argument — every detail is proof of skill,
  so nothing ships half-done.
- **Earn the glance, then the reach-out.** Lead with credibility a skimming recruiter
  catches in seconds, and keep the contact path one obvious step away.
- **Take a stance.** A memorable, opinionated choice beats a safe one; bland is the only
  real failure for a portfolio whose job is to stand out.
- **Personality over polish-by-reflex.** Warmth and a real voice win over generic
  "professional" finish; avoid the AI/template reflexes by default.
- **Expressive, but it still has to work.** Bold visuals never cost legibility,
  performance, or accessibility.

## Accessibility & Inclusion

Target **WCAG 2.1 AA**. Body text meets >=4.5:1 contrast (>=3:1 for large text) in both
light and dark themes. The generative Sakura / petals background and any motion must
honor `prefers-reduced-motion: reduce` with a static or crossfade fallback, and must
never sit behind text in a way that drops contrast. Keyboard navigation and visible
focus states are required across nav, theme/menu toggles, and links.
