/* Act IV maps: fairroad (the hub — Talkative, Evangelist's warning, Vanity
   Fair, By-ends, then a genuine two-lane fork) and castle (Doubting
   Castle's interior).

   fairroad tiles: # tree/border · . grass · V Vanity Fair ground ·
     M market stall/tent (decorative, blocked) · K castle outer wall ·
     D door (warp to castle) · E act end

   VANITY FAIR (x 14-29, rows 2-10) is a walled district and a genuine
   chokepoint: the tree-lines at x=13 and x=30 are sealed on every row but
   the path row (the CLAUDE.md chokepoint convention), and just inside the
   west gate the crier NPC stands at (14,6) pinched between stalls at
   (14,5)/(14,7) — there is no entering the Fair without facing him, so
   Faithful's trial (and death) cannot be walked around.

   THE FORK (x 40-49) is a true two-lane corridor: row 3 is "the plain
   road" (safe, uneventful — skips the castle entirely), row 9 is "By-path
   Meadow", which runs straight into Doubting Castle's outer wall (the K
   mass at x 44-49, rows 7-11) — its only way forward is through the castle
   door at (46,9). The other rows are treed through the corridor so the two
   lanes can't be crossed mid-way.

   castle tiles: C stone wall · a barred window · G dungeon flagstone ·
     b bed (flavor) · X exit mat (warp) */

const W = 56;
const FAIR_X0 = 14, FAIR_X1 = 29;
const FORK_X0 = 40, FORK_X1 = 49;

function row(y, overrides){
  const cells = new Array(W).fill('.');
  cells[0] = '#'; cells[W-1] = '#';
  if(y !== 6){ cells[13] = '#'; cells[30] = '#'; }          // the Fair's walls, gates on the path row only
  if(y >= 2 && y <= 10)
    for(let x = FAIR_X0; x <= FAIR_X1; x++) cells[x] = 'V'; // the Fair's market ground
  if(y !== 3 && y !== 9)
    for(let x = FORK_X0; x <= FORK_X1; x++)
      cells[x] = (x >= 44 && y >= 5) ? 'K' : '#';           // the fork; Doubting Castle's looming mass around the meadow lane
  for(const [x, ch] of overrides || []) cells[x] = ch;
  return cells.join('');
}

const FAIRROAD_ROWS = [
  '#'.repeat(W),
  row(1),
  row(2),
  row(3, [[17,'M'],[21,'M'],[25,'M'],[28,'M']]),
  row(4),
  row(5, [[14,'M'],[18,'M'],[22,'M'],[26,'M']]),
  row(6, [[52,'E']]),
  row(7, [[14,'M'],[16,'M'],[20,'M'],[24,'M'],[28,'M']]),
  row(8),
  row(9, [[18,'M'],[22,'M'],[26,'M'],[46,'D']]),
  row(10),
  row(11),
  '#'.repeat(W)
];

const CASTLE_ROWS = [
  'CCCCCaCCCaCCCCC',
  'CGGGGGGGGGGGGGC',
  'CGGGGGGGGGGGGGC',
  'CGGbGGGGGGGbGGC',
  'CGGGGGGGGGGGGGC',
  'CGGGGGGGGGGGGGC',
  'CGGGGGGGGGGGGGC',
  'CGGGGGGGGGGGGGC',
  'CCCCCCCXCCCCCCC'
];

export const MAPS = { fairroad: FAIRROAD_ROWS, castle: CASTLE_ROWS };

export const WARPS = {
  'fairroad:46,9': {map:'castle',   x:7,  y:1},
  'castle:7,8'   : {map:'fairroad', x:47, y:9}
};
