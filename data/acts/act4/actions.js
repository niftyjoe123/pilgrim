import {startMap, startCoords} from './meta.js';

export const ACTIONS = {
  metTalkative({S}){ S.flags.metTalkative = true; },
  warnedFair({S}){ S.flags.warnedFair = true; },
  vanityFairDone({S}){ S.flags.vanityFairDone = true; },
  metByends({S}){ S.flags.metByends = true; },
  castleEscaped({S}){ S.flags.castleEscaped = true; },

  // Reached from Act III's finale choice — see data/acts/act3/dialogue.js.
  startAct4({player, setCur}){
    setCur(startMap);
    player.x = startCoords.x; player.y = startCoords.y;
    player.face = 'down'; player.step = 0; player.moveT = performance.now();
  }
};
