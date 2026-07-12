import {S} from '../../../src/engine/state.js';

export const NPCS = [
  {id:'talkative',   map:'fairroad', x:6,  y:4, pal:{H:'#4a3b2a', T:'#9c7a5b', U:'#8a694c', P:'#5a4a30'}, acc:[], dlg:()=> 'talkative'},
  {id:'evangelist3', map:'fairroad', x:11, y:4, pal:{H:'#c9c2b2', T:'#e8e2d0', U:'#cfc7b0', P:'#cfc7b0'}, acc:['light'], dlg:()=> 'evangelist_fair'},
  {id:'vanityfair',  map:'fairroad', x:16, y:4, pal:{H:'#8c5b3a', T:'#9c3a3a', U:'#8a2f2f', P:'#3a2f24'}, acc:[], dlg:()=> 'vanityfair_intro', gone:()=>S.flags.vanityFairDone},
  {id:'byends',      map:'fairroad', x:22, y:4, pal:{H:'#2b2115', T:'#4a5f7d', U:'#3d4f68', P:'#2e2e38'}, acc:['tophat'], dlg:()=> 'byends'},
  {id:'giantdespair',map:'castle',   x:6,  y:4, pal:{H:'#3a2f24', T:'#5a4a30', U:'#4a3b2a', P:'#2b2115'}, acc:[], scale:1.4,
   dlg:()=> S.items.some(i=>i.name==='Key of Promise') ? 'giantDespair_key' : 'giantDespair_nokey', gone:()=>S.flags.castleEscaped}
];
