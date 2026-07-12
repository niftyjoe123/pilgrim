import {startMap, startCoords} from './meta.js';
import {startBattle} from '../../../src/engine/battle.js';

export const ACTIONS = {
  metShepherd({S}){ S.flags.metShepherd = true; },

  startApollyonBattle({S}){
    S.flags.apollyonMet = true;
    startBattle();
  },

  apollyonWon({S}){
    S.flags.apollyonDefeated = true;
    S.resolve = Math.min(S.maxResolve, S.resolve + 2);
  },

  metFaithful({S}){ S.flags.metFaithful = true; },

  // Reached from Act II's finale choice — see data/acts/act2/dialogue.js.
  // doAct's ACTIONS registry is a flat merge across every act, so act2's
  // dialogue can name this action with no import coupling to act3 at all.
  startAct3({player, setCur}){
    setCur(startMap);
    player.x = startCoords.x; player.y = startCoords.y;
    player.face = 'down'; player.step = 0; player.moveT = performance.now();
  }
};
