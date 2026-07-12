import {startMap, startCoords} from './meta.js';

export const ACTIONS = {
  restAtArbor({S}){ S.flags.scrollLost = true; },

  scrollFound({S}){ S.flags.scrollLost = false; },

  palaceReached({S}){ S.flags.palaceReached = true; },

  armorGiven({S}){
    S.flags.armorGiven = true;
    S.items.push({name:'Armor of God', note:'Sword, shield, helmet, breastplate, the shoes of readiness, and the belt of all-prayer — given at the Palace Beautiful for what lies ahead (Eph. 6:11-17).'});
  },

  // Reached from Act I's finale choice — doAct's ACTIONS registry is a flat
  // merge across every act, so act1/dialogue.js can name this action with
  // no import coupling to act2 at all.
  startAct2({player, setCur}){
    setCur(startMap);
    player.x = startCoords.x; player.y = startCoords.y;
    player.face = 'down'; player.step = 0; player.moveT = performance.now();
  }
};
