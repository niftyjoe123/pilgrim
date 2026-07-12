/* Act II maps: a tall vertical climb (bottom = entry from Act I, top = the
   Palace door) followed by the Palace Beautiful's interior.
   hillworld tiles: # tree/border · . grass · A arbor bench (trigger) ·
     L chained lion (hazard) · ! hidden pit (hazard) · D door (warp to palace)
   palace tiles: m wall · F floor · X exit mat (warp) · 5 the Study (exhibit) ·
     6 the Armory (exhibit) — reuses the shared numbered-exhibit pattern,
     picking up where Act I's living pictures (1-4) left off. */

const W = 19; // hillworld width, including both border columns
function open(overrides){
  const row = new Array(W).fill('.');
  row[0] = '#'; row[W-1] = '#';
  for(const [x, ch] of overrides || []) row[x] = ch;
  return row.join('');
}

const HILL_ROWS = [
  '#'.repeat(W),                          //  0 top border
  open([[9,'D'],[14,'E']]),               //  1 the Palace door; road continues east to the act-end marker
  open(),                                 //  2 Watchful stands here
  open(),                                 //  3
  open(),                                 //  4
  open([[8,'L'],[10,'L']]),               //  5 narrow passage — lions
  open([[8,'L'],[10,'L']]),               //  6 narrow passage — lions
  open(),                                 //  7 hilltop — Timorous & Mistrust flee past
  open(),                                 //  8
  open(),                                 //  9
  open(),                                 // 10
  open(),                                 // 11
  open(),                                 // 12
  open(),                                 // 13
  open(),                                 // 14
  open(),                                 // 15
  open(),                                 // 16
  open(),                                 // 17
  open(),                                 // 18
  open(),                                 // 19
  open([[9,'A']]),                        // 20 the arbor, about midway up
  open(),                                 // 21
  open(),                                 // 22
  open(),                                 // 23
  open(),                                 // 24
  open(),                                 // 25
  open(),                                 // 26
  open(),                                 // 27
  open(),                                 // 28
  open(),                                 // 29
  open(),                                 // 30
  open(),                                 // 31
  open(),                                 // 32
  open(),                                 // 33 the spring — top of the fork
  open([[3,'#'],[4,'#'],[14,'!']]),       // 34 Danger (left, treed) / Destruction (right, a pit)
  open([[3,'#'],[4,'#'],[14,'!']]),       // 35
  open([[3,'#'],[4,'#']]),                // 36 Danger's forest keeps going; Destruction stopped at the pit
  open(),                                 // 37 Formalist & Hypocrisy tumble over the wall here
  open(),                                 // 38
  open(),                                 // 39 the valley — Simple, Sloth & Presumption sleep off the path
  open(),                                 // 40
  open(),                                 // 41 entry point (Act I hands off here)
  '#'.repeat(W)                           // 42 bottom border
];

const PALACE_ROWS = [
  'mmmmmmmmmmmmmmmmm',
  'mF5FFFFFFFFFFF6Fm',
  'mFFFFFFFFFFFFFFFm',
  'mFFFFFFFFFFFFFFFm',
  'mFFFFFFFFFFFFFFFm',
  'mFFFFFFFFFFFFFFFm',
  'mFFFFFFFFFFFFFFFm',
  'mFFFFFFFFFFFFFFFm',
  'mFFFFFFFFFFFFFFFm',
  'mFFFFFFFFFFFFFFFm',
  'mmmmmmmmXmmmmmmmm'
];

export const MAPS = { hillworld: HILL_ROWS, palace: PALACE_ROWS };

export const WARPS = {
  'hillworld:9,1' : {map:'palace',    x:8, y:2},
  'palace:8,10'   : {map:'hillworld', x:9, y:4}
};
