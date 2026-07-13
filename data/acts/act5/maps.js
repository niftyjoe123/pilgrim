/* Act V maps: mountains (the hub — a west-to-east journey through real
   PLACES: the Delectable Mountains, the Flatterer's road, the Enchanted
   Ground, Beulah Land, and the River of Death, each a region of its own
   terrain rather than a person standing in for it) and celestial (the
   Celestial City itself — walled in shining stone, streets of gold, trees
   of life, the river of life, and the game's true finale).

   mountains tiles: # tree/border · . grass · ^ mountain peak (scenery) ·
     n the Enchanted Ground (walkable; entering it opens its dialogue — see
       meta.js's `triggers`) · B Beulah's flowering fields (walkable trigger) ·
     W the River of Death (walkable trigger — it spans every row, so the
       crossing genuinely cannot be walked around; the trigger dialogue IS
       the crossing) · Y the golden far shore · Z the City's outer wall ·
     D the City gate (warp to celestial)

   celestial tiles: Z shining wall · Y streets of gold · U tree of life ·
     l the river of the water of life (walkable, bright — deliberately NOT
     the same glyph as the dark River of Death, and never a trigger) ·
     E act end (the true finale) · X exit mat (warp back to mountains,
     for anyone who wants to keep wandering) */

const W = 56;
const ENCH_X0 = 23, ENCH_X1 = 30;
const BEU_X0  = 33, BEU_X1  = 43;
const RIV_X0  = 46, RIV_X1  = 48;
const SHORE_X0 = 49, SHORE_X1 = 53;

function mrow(y, overrides){
  const cells = new Array(W).fill('.');
  cells[0] = '#'; cells[W-1] = '#';
  for(let x = ENCH_X0; x <= ENCH_X1; x++) cells[x] = 'n';
  for(let x = BEU_X0;  x <= BEU_X1;  x++) cells[x] = 'B';
  for(let x = RIV_X0;  x <= RIV_X1;  x++) cells[x] = 'W';
  for(let x = SHORE_X0; x <= SHORE_X1; x++) cells[x] = 'Y';
  cells[54] = (y === 5) ? 'D' : 'Z';   // the City wall on the far shore, gate on the path row
  for(const [x, ch] of overrides || []) cells[x] = ch;
  return cells.join('');
}

const MOUNTAINS_ROWS = [
  '#'.repeat(W),
  mrow(1, [[5,'^'],[9,'^']]),
  mrow(2, [[3,'^']]),
  mrow(3),
  mrow(4),
  mrow(5),
  mrow(6),
  mrow(7),
  mrow(8, [[3,'^'],[10,'^']]),
  mrow(9, [[7,'^']]),
  '#'.repeat(W)
];

const CELESTIAL_ROWS = [
  'Z'.repeat(21),
  'Z' + 'Y'.repeat(19) + 'Z',
  'ZYYYU' + 'YYYYY' + 'E' + 'YYYYY' + 'U' + 'YYY' + 'Z',
  'Z' + 'Y'.repeat(19) + 'Z',
  'ZYU' + 'Y'.repeat(15) + 'UYZ',
  'Z' + 'Y'.repeat(19) + 'Z',
  'Z' + 'l'.repeat(7) + 'YYY' + 'l'.repeat(9) + 'Z',
  'Z' + 'Y'.repeat(19) + 'Z',
  'ZYYU' + 'Y'.repeat(12) + 'U' + 'YYYZ',
  'Z' + 'Y'.repeat(19) + 'Z',
  'Z' + 'Y'.repeat(9) + 'X' + 'Y'.repeat(9) + 'Z',
  'Z' + 'Y'.repeat(19) + 'Z',
  'Z'.repeat(21)
];

export const MAPS = { mountains: MOUNTAINS_ROWS, celestial: CELESTIAL_ROWS };

export const WARPS = {
  'mountains:54,5' : {map:'celestial', x:10, y:8},
  'celestial:10,10': {map:'mountains', x:53, y:5}
};
