/* Shared tile glyph vocabulary, reused across every act's maps.
   New interactive tile? Add it here (and to BLOCKED if impassable), add its
   drawTile case in src/engine/render.js, and wire any trigger in
   src/engine/movement.js's tryStep(). */
export const BLOCKED = new Set(['#','h','w','i','^','r','m','b','t','c','k','p','Q','L','!','M','C','q','j']);

/* Generic "impassable + costs Resolve + shows a toast on bump" tiles —
   any act can add a hazard glyph purely as data, no engine changes needed.
   Also add the glyph to BLOCKED above (it's a wall you can bump, not walk onto). */
export const HAZARDS = {
  'L': {cost:1, message:'🦁 The lion roars — but its chain holds. −1 Resolve'},
  '!': {cost:2, message:'😱 The ground gives way underfoot — you scramble back just in time! −2 Resolve'},
  'q': {cost:1, message:'The quag sucks at your feet in the dark — you pull free. −1 Resolve'},
  'j': {cost:2, message:'You feel the ground drop away at the ditch\'s edge — you catch yourself. −2 Resolve'}
};
