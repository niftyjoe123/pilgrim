import {S} from '../../../src/engine/state.js';

export const NPCS = [
  {id:'shepherds', map:'mountains', x:5,  y:4, pal:{H:'#b98a4a', T:'#8c9c6b', U:'#7a8a5b', P:'#5a4a30'}, acc:['staff'], dlg:()=> 'shepherds'},
  {id:'ignorance', map:'mountains', x:9,  y:4, pal:{H:'#c77b4a', T:'#9c8c5b', U:'#8a7a4c', P:'#5a4a30'}, acc:[], dlg:()=> 'ignorance'},
  {id:'flatterer', map:'mountains', x:14, y:4, pal:{H:'#2b2115', T:'#4a5f7d', U:'#3d4f68', P:'#2e2e38'}, acc:['tophat'], dlg:()=> 'flatterer_intro', gone:()=>S.flags.flatteredAndFreed},
  {id:'atheist',   map:'mountains', x:18, y:4, pal:{H:'#3a2f24', T:'#5a4a30', U:'#4a3b2a', P:'#2b2115'}, acc:[], dlg:()=> 'atheist'},
  {id:'enchantedrest', map:'mountains', x:25, y:4, pal:{H:'#8c9c6b', T:'#c9c2b2', U:'#b0a998', P:'#7a8a5b'}, acc:[], dlg:()=> 'enchanted_ground'},
  {id:'beulahresident', map:'mountains', x:32, y:4, pal:{H:'#d8d2c2', T:'#e8e2d0', U:'#cfc7b0', P:'#cfc7b0'}, acc:['light'], dlg:()=> 'beulah'},
  {id:'riveredge', map:'mountains', x:40, y:4, pal:{H:'#4a3b2a', T:'#5b7a9c', U:'#4c688a', P:'#3a2f24'}, acc:[], dlg:()=> 'river_edge', gone:()=>S.flags.riverCrossed},
  {id:'shining1', map:'celestial', x:4, y:5, pal:{H:'#f5ecd7', T:'#ffe9a8', U:'#f0dc8c', P:'#f0dc8c'}, acc:['light'], dlg:()=> 'shining_welcome'},
  {id:'shining2', map:'celestial', x:8, y:5, pal:{H:'#f5ecd7', T:'#ffe9a8', U:'#f0dc8c', P:'#f0dc8c'}, acc:['light'], dlg:()=> 'shining_welcome'}
];
