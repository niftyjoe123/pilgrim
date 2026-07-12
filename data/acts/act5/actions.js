import {startMap, startCoords} from './meta.js';

export const ACTIONS = {
  metShepherds({S}){ S.flags.metShepherds = true; },
  metIgnorance({S}){ S.flags.metIgnorance = true; },
  flatteredAndFreed({S}){ S.flags.flatteredAndFreed = true; },
  metAtheist({S}){ S.flags.metAtheist = true; },
  metEnchanted({S}){ S.flags.metEnchanted = true; },
  metBeulah({S}){ S.flags.metBeulah = true; },
  riverCrossed({S}){ S.flags.riverCrossed = true; },

  // Reached from Act IV's finale choice — see data/acts/act4/dialogue.js.
  startAct5({player, setCur}){
    setCur(startMap);
    player.x = startCoords.x; player.y = startCoords.y;
    player.face = 'down'; player.step = 0; player.moveT = performance.now();
  }
};
