/* Shared tile glyph vocabulary, reused across every act's maps.
   New interactive tile? Add it here (and to BLOCKED if impassable), add its
   drawTile case in src/engine/render.js, and wire any trigger in
   src/engine/movement.js's tryStep(). */
export const BLOCKED = new Set(['#','h','w','i','^','r','m','b','t','c','k','p','Q']);
