/* Act III's single map: a west-to-east descent through the Valley of
   Humiliation, a chokepoint where Apollyon blocks the path (flanked by
   trees so there's no walking around him — the same "real blockade"
   pattern Act II used for the lions), and on into the Valley of the
   Shadow of Death.
   valley tiles: # tree/border · . grass · E act end
   (shared glyph vocabulary lives in data/tiles.js) */

const W = 34;
function open(overrides){
  const row = new Array(W).fill('.');
  row[0] = '#'; row[W-1] = '#';
  for(const [x, ch] of overrides || []) row[x] = ch;
  return row.join('');
}

const VALLEY_ROWS = [
  '#'.repeat(W),                          // 0 top border
  open(),                                 // 1
  open(),                                 // 2 a scroll hides up here
  open([[13,'#'],[14,'#'],[15,'#']]),     // 3 trees pinch the path above the chokepoint
  open([[31,'E']]),                       // 4 the Shepherd, Apollyon (the only way through), Faithful, and the act-end marker all sit on this row
  open([[13,'#'],[14,'#'],[15,'#']]),     // 5 trees pinch the path below the chokepoint
  open(),                                 // 6 a scroll hides down here
  open(),                                 // 7
  '#'.repeat(W)                           // 8 bottom border
];

export const MAPS = { valley: VALLEY_ROWS };

// No interiors in Act III yet — this map is reached only via Act II's
// finale hand-off (startAct3), same as Act II's hillworld was via startAct2.
export const WARPS = {};
