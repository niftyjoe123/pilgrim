/* Act IV maps: fairroad (the hub — Talkative, Evangelist's warning, Vanity
   Fair, By-ends, then a genuine two-lane fork) and castle (Doubting
   Castle's interior).

   fairroad tiles: # tree/border · . grass · V Vanity Fair ground ·
     M market stall/tent (decorative, blocked) · D door (warp to castle) · E act end
   The fork (x 26-33) is a true two-lane corridor: row 2 is "the plain
   road" (safe, uneventful — skips the castle entirely), row 6 is "By-path
   Meadow" (looks just as easy, but its only way forward is through the
   castle door — there is no walking past it without warping in). Rows
   1/3/4/5/7 are treed through the corridor so the two lanes can't be
   crossed mid-way, same technique Act III used for its Apollyon chokepoint.

   castle tiles: C stone wall · G dungeon flagstone · b bed (flavor) · X exit mat (warp) */

const W = 48;
const FORK_X0 = 26, FORK_X1 = 33;
const FAIR_X0 = 13, FAIR_X1 = 19;

function row(y, overrides){
  const cells = new Array(W).fill('.');
  cells[0] = '#'; cells[W-1] = '#';
  if(y !== 2 && y !== 6){
    for(let x = FORK_X0; x <= FORK_X1; x++) cells[x] = '#';
  }
  for(const [x, ch] of overrides || []) cells[x] = ch;
  return cells.join('');
}

function rangeFill(x0, x1, ch){
  const out = [];
  for(let x = x0; x <= x1; x++) out.push([x, ch]);
  return out;
}

const FAIRROAD_ROWS = [
  '#'.repeat(W),
  row(1),
  row(2),
  row(3, [[14,'M'],[16,'M'],[18,'M']]),
  row(4, [...rangeFill(FAIR_X0, FAIR_X1, 'V'), [44,'E']]),
  row(5, [[15,'M'],[17,'M'],[19,'M']]),
  row(6, [[33,'D']]),
  row(7),
  '#'.repeat(W)
];

const CASTLE_ROWS = [
  'CCCCCCCCCCCCC',
  'CGGGGGGGGGGGC',
  'CGGGGGGGGGGGC',
  'CGGbGGGGGbGGC',
  'CGGGGGGGGGGGC',
  'CGGGGGGGGGGGC',
  'CGGGGGGGGGGGC',
  'CGGGGGGGGGGGC',
  'CCCCCCXCCCCCC'
];

export const MAPS = { fairroad: FAIRROAD_ROWS, castle: CASTLE_ROWS };

export const WARPS = {
  'fairroad:33,6': {map:'castle',   x:6, y:1},
  'castle:6,8'   : {map:'fairroad', x:34, y:6}
};
