import {toast} from './dom.js';

/* Pure game state. Owns S/player/LIVE/cur; every other module reads them
   (ES module imports are live bindings) but only this module ever reassigns
   `cur`, or touches the contents of S/player/LIVE (always in place — never
   `S = ...`, and never replacing S.flags/verses/items wholesale either —
   so importers' references, including nested ones, stay valid across a
   restart). player's initial x/y is a placeholder (0,0): main.js sets the
   real starting position from the first act's meta.js before anything
   renders, so that's the one source of truth for where a run begins. */

export const START = {
  faith:2, hope:2, endurance:2, wisdom:2, humility:2, love:2, resolve:10, maxResolve:10,
  burden:true, verses:[], items:[],
  flags:{} // populated by initFlags() at boot from every act's own meta.js defaults
};

export const S = JSON.parse(JSON.stringify(START));
export const player = {x:0, y:0, face:'down', step:0, moveT:0};
export let cur = 'home';
export function setCur(name){ cur = name; }

export const STAT_META = {
  faith:{icon:"✝", name:"Faith"}, hope:{icon:"🕊", name:"Hope"},
  endurance:{icon:"⛰", name:"Endurance"}, wisdom:{icon:"📖", name:"Wisdom"},
  humility:{icon:"🙏", name:"Humility"}, love:{icon:"❤", name:"Love"}
};

/* Each act's meta.js owns its own flag defaults (see data/acts/act1/meta.js);
   data/index.js merges them all into FLAGS and main.js calls this once at
   boot, before anything reads S.flags. Keeps state.js act-agnostic. */
export function initFlags(defaults){
  Object.assign(START.flags, defaults);
  Object.assign(S.flags, defaults);
}

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
  const fresh = JSON.parse(JSON.stringify(START));
  for(const k in fresh){
    if(k === 'flags' || k === 'verses' || k === 'items') continue;
    S[k] = fresh[k];
  }
  Object.assign(S.flags, fresh.flags);
  S.verses.length = 0;
  S.items.length = 0;
  Object.assign(player, {x:startCoords.x, y:startCoords.y, face:'down', step:0, moveT:0});
  setCur(startMap);
}
