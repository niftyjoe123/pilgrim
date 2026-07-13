import {S, player, LIVE, buildMaps, resetState, setCur} from './state.js';
import {toast} from './dom.js';
import {ACTIONS as CONTENT_ACTIONS, ITEMS, MAPS, FIRST_ACT} from '../../data/index.js';
import {sfxRestart, setMood} from './audio.js';

/* Thin dispatcher: 'restart' is the one engine-level action; everything
   else is looked up in the merged per-act ACTIONS registry, so a new act
   never requires touching this file. */
export function doAct(name){
  if(name === 'restart'){
    resetState(FIRST_ACT.startMap, FIRST_ACT.startCoords);
    buildMaps(MAPS);
    ITEMS.forEach(i=>i.taken=false);
    sfxRestart();
    setMood(FIRST_ACT.id);
    return;
  }
  const fn = CONTENT_ACTIONS[name];
  if(fn) fn({S, player, LIVE, toast, setCur});
}
