import {toast} from './dom.js';

/* Pure game state. Owns S/player/LIVE/cur; every other module reads them
   (ES module imports are live bindings) but only this module ever reassigns
   `cur`, or reassigns the contents of S/player/LIVE (always in place —
   never `S = ...` — so importers' references stay valid across a restart). */

export const START = {
  faith:2, hope:2, endurance:2, wisdom:2, resolve:10, maxResolve:10,
  burden:true, verses:[], items:[],
  flags:{ metEvangelist:false, obstinateGone:false, sinaiDone:false, gateOpen:false,
          roomsSeen:0, interpreterDone:false, crossDone:false, helpMet:false, ended:false,
          room1:false, room2:false, room3:false, room4:false }
};

export const S = structuredClone(START);
export const player = {x:6, y:5, face:'down', step:0, moveT:0};
export let cur = 'home';
export function setCur(name){ cur = name; }

export const STAT_META = {
  faith:{icon:"✝", name:"Faith"}, hope:{icon:"🕊", name:"Hope"},
  endurance:{icon:"⛰", name:"Endurance"}, wisdom:{icon:"📖", name:"Wisdom"}
};

export const LIVE = {};
export function buildMaps(mapsSource){
  for(const k of Object.keys(LIVE)) delete LIVE[k];
  for(const k in mapsSource) LIVE[k] = mapsSource[k].map(r=>r.split(''));
}

export function applyFx(fx){
  if(!fx) return;
  for(const k in fx){
    if(k === "resolve") S.resolve = Math.max(1, Math.min(S.maxResolve, S.resolve+fx[k]));
    else if(k in STAT_META) S[k] = Math.max(0, Math.min(10, S[k]+fx[k]));
  }
}

export function addVerse(v){
  if(S.verses.some(x=>x.ref===v.ref)) return false;
  S.verses.push(v);
  setTimeout(()=>toast(`📜 Scripture gathered: <b>${v.ref}</b> — “${v.text}”`), 700);
  return true;
}

export function resetState(startMap, startCoords){
  Object.assign(S, structuredClone(START));
  Object.assign(player, {x:startCoords.x, y:startCoords.y, face:'down', step:0, moveT:0});
  setCur(startMap);
}
