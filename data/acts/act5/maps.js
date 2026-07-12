/* Act V maps: mountains (the hub — Delectable Mountains, Ignorance,
   Flatterer's net, the Atheist, Enchanted Ground, Beulah Land, and the
   River of Death crossing) and celestial (a small, bright arrival map —
   the Celestial City itself, and the game's true finale).

   mountains tiles: # tree/border · . grass · B Beulah's flowering fields ·
     D door (warp to celestial, past the River) · E act end (unused here —
     the true end is in celestial)
   celestial tiles: Y golden ground (no walls — this place has no borders
     but the map's own edges) · E act end (the true finale) · X exit mat
     (warp back to mountains, for anyone who wants to keep wandering) */

const W = 44;
function open(overrides){
  const row = new Array(W).fill('.');
  row[0] = '#'; row[W-1] = '#';
  for(const [x, ch] of overrides || []) row[x] = ch;
  return row.join('');
}

function rangeFill(x0, x1, ch){
  const out = [];
  for(let x = x0; x <= x1; x++) out.push([x, ch]);
  return out;
}

const MOUNTAINS_ROWS = [
  '#'.repeat(W),
  open([[40,'#']]),                                     // trees pinch the River's approach to a single lane (every
  open([[40,'#']]),                                     // row but the path row is blocked here, so there's no way
  open([[40,'#']]),                                     // around the crossing — it truly has to be walked through)
  open([...rangeFill(29,36,'B'), [41,'D']]),             // Beulah's fields, then the door past the River crossing
  open([[40,'#']]),
  open([[40,'#']]),
  open([[40,'#']]),
  '#'.repeat(W)
];

const CELESTIAL_ROWS = [
  'YYYYYYYYYYYYY',
  'YYYYYYYYYYYYY',
  'YYYYYYEYYYYYY',
  'YYYYYYYYYYYYY',
  'YYYYYYYYYYYYY',
  'YYYYYYYYYYYYY',
  'YYYYYYYYYYYYY',
  'YYYYYYYYYYYYY',
  'YYYYYYXYYYYYY'
];

export const MAPS = { mountains: MOUNTAINS_ROWS, celestial: CELESTIAL_ROWS };

export const WARPS = {
  'mountains:41,4': {map:'celestial',  x:6, y:6},
  'celestial:6,8'  : {map:'mountains', x:42, y:4}
};
