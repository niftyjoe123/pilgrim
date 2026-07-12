/* Act I maps.
   world: # tree  . grass  = path  ~ swamp  o stone  h wall  r roof  D door  w city wall
          g wicket gate  i interp walls  I interp door  ^ rocks  f fire  + cross  E act end
   interiors: m wall  F floor  R rug  b bed  t table  c chair  k bookshelf  p plant  Q fireplace
              X exit mat  1-4 living pictures
   (shared glyph vocabulary lives in data/tiles.js) */

const WORLD_ROWS = [
  '#'.repeat(70),
  '#'+'.'.repeat(49)+'w'+'.'.repeat(18)+'#',
  '#'+'.'.repeat(36)+'^^^f^^^'+'.'.repeat(6)+'w'+'.'.repeat(18)+'#',
  '#'+'..'+'rrrr'+'...'+'rrrr'+'.'.repeat(23)+'.^.=.^.'+'.'.repeat(6)+'w'+'.'.repeat(18)+'#',
  '#'+'..'+'hhhh'+'...'+'hhhh'+'.'.repeat(26)+'='+'.'.repeat(9)+'w'+'.'.repeat(18)+'#',
  '#'+'..'+'hDhh'+'...'+'hDhh'+'.'.repeat(26)+'='+'.'.repeat(9)+'w'+'...'+'rrrrr'+'.'.repeat(10)+'#',
  '#'+'...'+'='+'.'.repeat(35)+'='+'.'.repeat(9)+'w'+'...'+'iiiii'+'.'.repeat(10)+'#',
  '#'+'...'+'='+'.'.repeat(35)+'='+'.'.repeat(9)+'w'+'...'+'iiiii'+'.'.repeat(10)+'#',
  '#'+'...'+'='+'.'.repeat(21)+'~'.repeat(8)+'.'.repeat(6)+'='+'.'.repeat(9)+'w'+'...'+'iiIii'+'.'.repeat(10)+'#',
  '#'+'...'+'='+'.'.repeat(21)+'~'.repeat(8)+'.'.repeat(6)+'='+'.'.repeat(9)+'w'+'.'.repeat(5)+'='+'.'.repeat(12)+'#',
  '#'+'...'+'='+'.'.repeat(21)+'~'.repeat(8)+'.'.repeat(6)+'='+'.'.repeat(9)+'w'+'.'.repeat(5)+'='+'...'+'#######'+'..'+'#',
  '#'+'='.repeat(25)+'~'.repeat(8)+'='.repeat(16)+'g'+'='.repeat(13)+'+'+'=='+'E'+'='+'#',
  '#'+'.'.repeat(25)+'~'.repeat(8)+'.'.repeat(16)+'w'+'.'.repeat(9)+'#######'+'..'+'#',
  '#'+'.'.repeat(25)+'~'.repeat(8)+'.'.repeat(16)+'w'+'.'.repeat(18)+'#',
  '#'+'.'.repeat(25)+'o'.repeat(8)+'.'.repeat(16)+'w'+'.'.repeat(18)+'#',
  '#'+'.'.repeat(9)+'rrrr'+'....'+'rrrr'+'....'+'~'.repeat(8)+'.'.repeat(16)+'w'+'.'.repeat(18)+'#',
  '#'+'.'.repeat(9)+'hhhh'+'....'+'hhhh'+'.'.repeat(28)+'w'+'.'.repeat(18)+'#',
  '#'+'.'.repeat(9)+'hDhh'+'....'+'hDhh'+'.'.repeat(28)+'w'+'.'.repeat(18)+'#',
  '#'+'.'.repeat(49)+'w'+'.'.repeat(18)+'#',
  '#'+'.'.repeat(49)+'w'+'.'.repeat(18)+'#',
  '#'+'.'.repeat(49)+'w'+'.'.repeat(18)+'#',
  '#'.repeat(70)
];
const HOME_ROWS = [
  'mmmmmmmmmmmmm',
  'mFkFFQQFFFFpm',
  'mFbbFFFFFttFm',
  'mFbbFFFFFctFm',
  'mFFFRRRFFFFFm',
  'mFFFRRRFFFFFm',
  'mFFFRRRFFFFFm',
  'mpFFFFFFFFFFm',
  'mmmmmmXmmmmmm'
];
const TIMOROUS_ROWS = [
  'mmmmmmmmmmmmm',
  'mFpFFFFFFFkFm',
  'mFttFFFFFbbFm',
  'mFctFFFFFbbFm',
  'mFFFFRRRFFFFm',
  'mFFFFRRRFFFFm',
  'mFFFFRRRFFFFm',
  'mFFFFFFFFFFpm',
  'mmmmmmXmmmmmm'
];
const SAGACITY_ROWS = [
  'mmmmmmmmmmmmm',
  'mFkkFQQFFkkFm',
  'mFFFFFFFFFFFm',
  'mFttFFFFFFbFm',
  'mFcFFRRRFFbFm',
  'mFFFFRRRFFFFm',
  'mFFFFRRRFFFFm',
  'mpFFFFFFFFFpm',
  'mmmmmmXmmmmmm'
];
const OBST_ROWS = [
  'mmmmmmmmmmmmm',
  'mFFFFFFFFFkpm',
  'mFbbFFFFFttFm',
  'mFbbFFFFFtcFm',
  'mFFFFFFFFFFFm',
  'mFFFRRRFFFFFm',
  'mFFFRRRFFFFFm',
  'mFFFFFFFFFFFm',
  'mmmmmmXmmmmmm'
];
const INTERP_ROWS = [
  'mmmmmmmmmmmmmmmmm',
  'mF1FFF2FFF3FFF4Fm',
  'mFFFFFFFFFFFFFFFm',
  'mFFFFFFFFFFFFFFFm',
  'mFFFFFFFFFFFFFFFm',
  'mFFFFFFFtFFFFFFFm',
  'mFFFFFFFFFFFFFFFm',
  'mFFFFFFFFFFFFFFFm',
  'mmmmmmmmXmmmmmmmm'
];

export const MAPS = {
  world: WORLD_ROWS, home: HOME_ROWS, timorous: TIMOROUS_ROWS,
  sagacity: SAGACITY_ROWS, obst: OBST_ROWS, interp: INTERP_ROWS
};

/* door/exit warps: 'map:x,y' -> destination */
export const WARPS = {
  'world:4,5'   :{map:'home',     x:6, y:6},
  'world:11,5'  :{map:'obst',     x:6, y:6},
  'world:11,17' :{map:'timorous', x:6, y:6},
  'world:19,17' :{map:'sagacity', x:6, y:6},
  'world:56,8'  :{map:'interp',   x:8, y:7},
  'home:6,8'     :{map:'world', x:4,  y:7},
  'obst:6,8'     :{map:'world', x:11, y:6},
  'timorous:6,8' :{map:'world', x:11, y:18},
  'sagacity:6,8' :{map:'world', x:19, y:18},
  'interp:8,8'   :{map:'world', x:56, y:9}
};
