/* Act III's single map: a west-to-east descent through the Valley of
   Humiliation, a chokepoint where Apollyon blocks the path (flanked by
   trees so there's no walking around him — the same "real blockade"
   pattern Act II used for the lions), and on into the Valley of the
   Shadow of Death: a darkened stretch (x 16-24) with a ditch ('j') on one
   side and a quag ('q') on the other, flanking the one safe lane through —
   the same HAZARDS-flanked-path idea as Act II's lions, just darker.
   valley tiles: # tree/border · . grass · N dark ground (Shadow of Death) ·
     q quag (hazard) · j ditch (hazard) · E act end
   (shared glyph vocabulary lives in data/tiles.js) */

const W = 34;
function open(overrides){
  const row = new Array(W).fill('.');
  row[0] = '#'; row[W-1] = '#';
  for(const [x, ch] of overrides || []) row[x] = ch;
  return row.join('');
}

function darkRange(x0, x1){
  const out = [];
  for(let x = x0; x <= x1; x++) out.push([x, 'N']);
  return out;
}

const VALLEY_ROWS = [
  '#'.repeat(W),                                                              // 0 top border
  open(darkRange(16,24)),                                                     // 1
  open(darkRange(16,24)),                                                     // 2 a scroll hides up here
  open([[13,'#'],[14,'#'],[15,'#'], ...darkRange(16,24), [18,'j'],[21,'j']]),  // 3 trees pinch the Apollyon chokepoint; the ditch flanks the Shadow of Death stretch
  open([...darkRange(16,24), [31,'E']]),                                      // 4 the Shepherd, Apollyon, the shadow-dread encounter, Faithful, and the act-end marker all sit on this row
  open([[13,'#'],[14,'#'],[15,'#'], ...darkRange(16,24), [18,'q'],[21,'q']]),  // 5 trees pinch the chokepoint; the quag flanks the shadow stretch
  open(darkRange(16,24)),                                                     // 6 a scroll hides down here
  open(darkRange(16,24)),                                                     // 7
  '#'.repeat(W)                                                               // 8 bottom border
];

export const MAPS = { valley: VALLEY_ROWS };

// No interiors in Act III yet — this map is reached only via Act II's
// finale hand-off (startAct3), same as Act II's hillworld was via startAct2.
export const WARPS = {};
