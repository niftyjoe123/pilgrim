import {S} from '../../../src/engine/state.js';

export const NPCS = [
  {id:'talkative',   map:'fairroad', x:5,  y:6, pal:{H:'#4a3b2a', T:'#9c7a5b', U:'#8a694c', P:'#5a4a30'}, acc:[], dlg:()=> 'talkative'},
  {id:'evangelist3', map:'fairroad', x:10, y:6, pal:{H:'#c9c2b2', T:'#e8e2d0', U:'#cfc7b0', P:'#cfc7b0'}, acc:['light'], dlg:()=> 'evangelist_fair'},
  // The crier stands just inside the Fair's west gate, pinched between
  // stalls (see maps.js) — the trial genuinely cannot be walked around,
  // so Faithful's death is a fixed story beat, not an optional one.
  {id:'vanityfair',  map:'fairroad', x:14, y:6, pal:{H:'#8c5b3a', T:'#9c3a3a', U:'#8a2f2f', P:'#3a2f24'}, acc:[], dlg:()=> 'vanityfair_intro', gone:()=>S.flags.vanityFairDone},
  {id:'byends',      map:'fairroad', x:33, y:6, pal:{H:'#2b2115', T:'#4a5f7d', U:'#3d4f68', P:'#2e2e38'}, acc:['tophat'], dlg:()=> 'byends'},
  // A fair chance to reconsider before the fork, per the design's Doubting
  // Castle lock below — she doesn't spell the mechanic out, just warns.
  {id:'meadowwary',  map:'fairroad', x:35, y:7, pal:{H:'#6e4a22', T:'#8a744a', U:'#786a4c', P:'#4a3b2a'}, acc:[], dlg:()=> 'meadow_warning'},
  {id:'giantdespair',map:'castle',   x:7,  y:4, pal:{H:'#3a2f24', T:'#5a4a30', U:'#4a3b2a', P:'#2b2115'}, acc:[], scale:1.4,
   dlg:()=> S.items.some(i=>i.name==='Key of Promise') ? 'giantDespair_key' : 'giantDespair_nokey', gone:()=>S.flags.castleEscaped},
  // Hopeful has no static encounter spot — he appears mid-dialogue during
  // Vanity Fair's trial (see hopeful_joins) and only ever follows the
  // player from then on (see render.js's companionPos), so gone() hides
  // him everywhere until that moment and follow() takes over immediately.
  {id:'hopeful', map:'fairroad', x:16, y:6, pal:{H:'#6e5638', T:'#6b8c5b', U:'#5b7a4c', P:'#4a3b2a'}, acc:[], dlg:()=> 'hopeful_walk',
   gone:()=>!S.flags.vanityFairDone, follow:()=>S.flags.vanityFairDone}
];
