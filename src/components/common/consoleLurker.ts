/* ───────────────────────────────────────────────────────────────────────────
   you opened the file too. of course you did.

   this is the console easter egg. the strings are base64 so reading the source
   doesn't spoil the quiz -- decode any of them with atob(). there's a note in
   here for whoever got this far. start with:

   atob('eW91IHJlYWQgdGhlIHNvdXJjZSBhbmQgYm90aGVyZWQgdG8gZGVjb2RlIHRoaXMuIGknbSBqb2huLCBpJ20gYXQgZmV3ZWxsQGdtYWlsLmNvbSAtLSB0ZWxsIG1lIHdoYXQgeW91J3JlIGJ1aWxkaW5nLg==')
   ─────────────────────────────────────────────────────────────────────────── */

type K = 'hunter' | 'spelunker' | 'auditor' | 'voyeur';

const d = (s: string): string => (typeof atob === 'function' ? atob(s) : s);

// [question, a, b, c] per question.
const Q: string[][] = [
  [
    'SXQncyBsYXRlIGFuZCB5b3UndmUgbGFuZGVkIG9uIHNvbWUgc3RyYW5nZXIncyBwb3J0Zm9saW8uIEZpcnN0IHRoaW5nIHlvdSBkbz8=',
    'T3BlbiB2aWV3LXNvdXJjZSBhbmQgcmVhZCBpdC4=',
    'Q2hlY2sgdGhlIG5ldHdvcmsgdGFiIHRvIHNlZSB3aGF0IGl0J3MgbG9hZGluZy4=',
    'T3BlbiB0aGUgY29uc29sZSBhbmQgcG9rZSBhcm91bmQu',
  ],
  [
    'QSBwYWdlIGRvZXMgc29tZSBzbGljayBhbmltYXRpb24uIFlvdS4uLg==',
    'Z28gZmluZCBvdXQgaG93IGl0J3MgYnVpbHQu',
    'd29uZGVyIGlmIGl0J3Mgd3JlY2tpbmcgdGhlIGZyYW1lIHJhdGUu',
    'dHJ5IHRvIGJyZWFrIGl0Lg==',
  ],
  [
    'QmVzdCB0aGluZyB0byBmaW5kIGluIGEgY29uc29sZT8=',
    'UHJvb2YgdGhlIHNpdGUgaXNuJ3QgdHJhY2tpbmcgeW91Lg==',
    'Tm8gZXJyb3JzIGFuZCBhIHBhZ2UgdGhhdCBsb2FkcyBmYXN0Lg==',
    'QSBzZWNyZXQuIFRoaXMgb25lJ2xsIGRvLg==',
  ],
];

// option index -> archetype, per question.
const M: K[][] = [
  ['spelunker', 'voyeur', 'hunter'],
  ['spelunker', 'auditor', 'hunter'],
  ['voyeur', 'auditor', 'hunter'],
];

// archetype -> [title, blurb].
const R: Record<K, [string, string]> = {
  hunter: [
    'dGhlIGVhc3Rlci1lZ2cgaHVudGVy',
    'WW91IG9wZW5lZCB0aGUgY29uc29sZSBob3Bpbmcgc29tZXRoaW5nIHdhcyBpbiBoZXJlLiBTb21ldGhpbmcgd2FzLiBNb3N0IHBlb3BsZSBkb24ndCBib3RoZXIgbG9va2luZy4=',
  ],
  spelunker: [
    'dGhlIHNvdXJjZSByZWFkZXI=',
    'WW91IHJlYWQgdGhlIHNvdXJjZSBiZWZvcmUgeW91IHRydXN0IGEgcGFnZS4gWW91J3ZlIHByb2JhYmx5IGFscmVhZHkgZ29uZSB0aHJvdWdoIGhvdyB0aGlzIG9uZSBpcyBidWlsdCAtLSBpdCdzIHN0YXRpYyBBc3Ryby4=',
  ],
  auditor: [
    'dGhlIGF1ZGl0b3I=',
    'WW91IGNoZWNrZWQgdGhlIG51bWJlcnMgYmVmb3JlIGRlY2lkaW5nIHRoaXMgd2FzIGFueSBnb29kLiBJZiBzb21ldGhpbmcncyBzbG93IG9yIHNoaWZ0aW5nIGFyb3VuZCwgdGVsbCBtZSBhbmQgSSdsbCBmaXggaXQu',
  ],
  voyeur: [
    'dGhlIG5ldHdvcmsgd2F0Y2hlcg==',
    'WW91IG9wZW5lZCB0aGUgY29uc29sZSB0byBzZWUgd2hhdCB0aGlzIHNpdGUgc2VuZHMgb3V0LiBPbmUgQ2xvdWRmbGFyZSBiZWFjb24sIHRoYXQncyBpdC4=',
  ],
};

const X = {
  h1: 'c28geW91IG9wZW5lZCB0aGUgY29uc29sZQ==',
  sub: 'dGhlcmUncyBhIHF1aXogaW4gaGVyZS4=',
  cta: 'SSBtYWtlIHRoaW5ncyBsaWtlIHRoaXMuIElmIHlvdSB3YW50IHRvIHRhbGssIEknbSBhdCBmZXdlbGxAZ21haWwuY29tLg==',
  guard: 'Tm90aGluZyB0byBhbnN3ZXIgeWV0Lg==',
};

const P: K[] = ['hunter', 'spelunker', 'auditor', 'voyeur'];

// For the one who filters the Network tab by XHR/Fetch. These hit real (tiny)
// JSON files, so they're clean 200s whose filenames read as a note down the
// Name column -- and the responses carry one too.
const PINGS = [
  '/lurker/so-you-opened-the-network-tab.json',
  '/lurker/nothing-here-but-a-note.json',
  '/lurker/i-make-things-like-this.json',
  '/lurker/fewell-at-gmail-dot-com.json',
];

const ping = async () => {
  for (const u of PINGS) {
    try {
      await fetch(u);
    } catch {
      /* best-effort; an offline visitor just doesn't get this one */
    }
  }
};

const ART = [
  '     ██╗ ███████╗',
  '     ██║ ██╔════╝',
  '     ██║ █████╗  ',
  '██   ██║ ██╔══╝  ',
  '╚█████╔╝ ██║     ',
  ' ╚════╝  ╚═╝     ',
].join('\n');

const S = {
  art: 'color:#e76aa2;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:30px;line-height:1.04',
  h1: 'color:#e76aa2;font:700 20px/1.4 ui-sans-serif,system-ui,sans-serif',
  q: 'color:#e76aa2;font:600 14px/1.5 ui-sans-serif,system-ui,sans-serif',
  body: 'color:#8c8c8c;font:400 13px/1.6 ui-sans-serif,system-ui,sans-serif',
  cmd: 'color:#0f62fe;font:600 13px ui-monospace,SFMono-Regular,Menlo,monospace',
};

let step = 0;
let tally: Record<K, number> = { hunter: 0, spelunker: 0, auditor: 0, voyeur: 0 };

const ask = () => {
  const r = Q[step - 1];
  console.log('%c\n' + d(r[0]), S.q);
  console.log('%c  a() %c' + d(r[1]), S.cmd, S.body);
  console.log('%c  b() %c' + d(r[2]), S.cmd, S.body);
  console.log('%c  c() %c' + d(r[3]), S.cmd, S.body);
};

const finish = () => {
  const w = P.reduce((b, t) => (tally[t] > tally[b] ? t : b), P[0]);
  console.log('%c\nyou are: ' + d(R[w][0]), S.h1);
  console.log('%c' + d(R[w][1]), S.body);
  console.log('%c\n' + d(X.cta), S.body);
  console.log('%crun %clurker()%c to go again.', S.body, S.cmd, S.body);
  step = 0;
};

const answer = (i: number) => {
  if (step < 1 || step > Q.length) {
    console.log('%c' + d(X.guard) + ' Run %clurker()%c first.', S.body, S.cmd, S.body);
    return;
  }
  tally[M[step - 1][i]]++;
  step++;
  if (step > Q.length) finish();
  else ask();
};

const banner = () => {
  console.log('%c' + ART, S.art);
  console.log('%c' + d(X.h1), S.h1);
  console.log('%c' + d(X.sub) + ' run %clurker()%c.', S.body, S.cmd, S.body);
};

export function startConsoleLurker() {
  if (typeof window === 'undefined') return;
  const w = window as unknown as Record<string, unknown>;
  w.lurker = () => {
    tally = { hunter: 0, spelunker: 0, auditor: 0, voyeur: 0 };
    step = 1;
    ask();
  };
  w.a = () => answer(0);
  w.b = () => answer(1);
  w.c = () => answer(2);
  w.help = banner;
  banner();
  ping();
}
