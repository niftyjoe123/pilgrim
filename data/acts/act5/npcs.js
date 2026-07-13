import {S} from '../../../src/engine/state.js';

// The Enchanted Ground, Beulah Land, and the River of Death are REGIONS
// (see maps.js + meta.js's `triggers`), not people — no NPC stands in for
// them anymore.
export const NPCS = [
  {id:'shepherds', map:'mountains', x:5,  y:5, pal:{H:'#b98a4a', T:'#8c9c6b', U:'#7a8a5b', P:'#5a4a30'}, acc:['staff'], dlg:()=> 'shepherds'},
  {id:'ignorance', map:'mountains', x:9,  y:5, pal:{H:'#c77b4a', T:'#9c8c5b', U:'#8a7a4c', P:'#5a4a30'}, acc:[], dlg:()=> 'ignorance'},
  {id:'flatterer', map:'mountains', x:14, y:5, pal:{H:'#2b2115', T:'#4a5f7d', U:'#3d4f68', P:'#2e2e38'}, acc:['tophat'], dlg:()=> 'flatterer_intro', gone:()=>S.flags.flatteredAndFreed},
  {id:'atheist',   map:'mountains', x:19, y:5, pal:{H:'#3a2f24', T:'#5a4a30', U:'#4a3b2a', P:'#2b2115'}, acc:[], dlg:()=> 'atheist'},
  {id:'shining1', map:'celestial', x:6,  y:4, pal:{H:'#f5ecd7', T:'#ffe9a8', U:'#f0dc8c', P:'#f0dc8c'}, acc:['light'], dlg:()=> 'shining_welcome'},
  {id:'shining2', map:'celestial', x:14, y:4, pal:{H:'#f5ecd7', T:'#ffe9a8', U:'#f0dc8c', P:'#f0dc8c'}, acc:['light'], dlg:()=> 'shining_welcome'}
];
