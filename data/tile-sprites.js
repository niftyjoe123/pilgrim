/* Glyph -> real-sprite lookup, shared across acts like data/tiles.js's
   BLOCKED set. Only the generic/common tiles are mapped here — bespoke
   story-moment tiles (the Cross, act-end marker, Sinai fire, the
   Interpreter's living pictures, the animated fireplace, the Wicket
   Gate) are deliberately left off this list so drawTile() in
   src/engine/render.js falls through to its existing procedural
   drawing for them; a static generic sprite wouldn't improve on
   custom glow/pulse/flicker animation built for a specific narrative
   beat. Coordinates are {sheet, col, row} grid indices (0-based) into
   the sheets defined in src/sprite-atlas.js. */
export const TILE_SPRITES = {
  '.': {sheet:'roguelike', col:2,  row:15}, // grass
  '=': {sheet:'roguelike', col:5,  row:8},  // dirt path
  '~': {sheet:'roguelike', col:11, row:9},  // swamp/water
  '#': {sheet:'roguelike', col:13, row:9},  // tree
  'w': {sheet:'roguelike', col:5,  row:13}, // city/great wall (stone)
  'i': {sheet:'roguelike', col:5,  row:13}, // interpreter walls (stone)
  'm': {sheet:'roguelike', col:5,  row:13}, // interior wall (stone)
  'h': {sheet:'urban',     col:18, row:0},  // house exterior wall (brick)
  'D': {sheet:'roguelike', col:32, row:0},  // house/exterior door
  'I': {sheet:'roguelike', col:33, row:0},  // interpreter door
  '^': {sheet:'roguelike', col:0,  row:19}, // Sinai rocks
  'F': {sheet:'roguelike', col:13, row:12}, // interior floor
  // 'R' (rug) intentionally omitted — no clean match found in the pack;
  // stays on the existing procedural mosaic-rug rendering.
};
