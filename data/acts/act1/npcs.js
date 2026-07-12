import {S} from '../../../src/engine/state.js';

export const NPCS = [
  {id:'family',    map:'home',  x:3,  y:4, pal:{H:'#3a2814', T:'#8c5b7a', U:'#7a4c68', P:'#8c5b7a'}, acc:['dress','child'], dlg:()=> 'family'},
  {id:'obstinate', map:'world', x:14, y:10, pal:{H:'#1e1610', T:'#7a4a3a', U:'#68402f', P:'#3a2f24'}, acc:['beard'], dlg:()=> 'obstinate', gone:()=>S.flags.obstinateGone},
  {id:'obst_home', map:'obst',  x:4,  y:6, pal:{H:'#1e1610', T:'#7a4a3a', U:'#68402f', P:'#3a2f24'}, acc:['beard'], dlg:()=> 'obstinate_home', gone:()=>!S.flags.obstinateGone},
  {id:'pliable',   map:'world', x:14, y:12, pal:{H:'#b98a4a', T:'#6b8c5b', U:'#5b7a4c', P:'#4a3b2a'}, acc:[], dlg:()=> 'pliable'},
  {id:'child',     map:'world', x:8,  y:13, pal:{H:'#b98a4a', T:'#c77b4a', U:'#b06a3c', P:'#5a4a30'}, acc:[], scale:0.68, dlg:()=> 'child'},
  {id:'evangelist',map:'world', x:20, y:10, pal:{H:'#c9c2b2', T:'#e8e2d0', U:'#cfc7b0', P:'#cfc7b0'}, acc:['light'], dlg:()=> S.flags.metEvangelist ? 'evangelist2' : 'evangelist'},
  {id:'help',      map:'world', x:24, y:12, pal:{H:'#4a2f18', T:'#3d6b35', U:'#345c2d', P:'#3a2f24'}, acc:['staff'], dlg:()=> 'help'},
  {id:'worldly',   map:'world', x:41, y:10, pal:{H:'#2b2115', T:'#2e2e38', U:'#26262e', P:'#1e1e26'}, acc:['tophat'], dlg:()=> S.flags.sinaiDone ? 'worldly2' : 'worldly'},
  {id:'wary',      map:'world', x:45, y:12, pal:{H:'#6e4a22', T:'#a8845a', U:'#96744c', P:'#4a3b2a'}, acc:[], dlg:()=> 'wary'},
  {id:'timorous',  map:'timorous', x:9, y:5, pal:{H:'#9a8a7a', T:'#8a7a9c', U:'#786a8a', P:'#8a7a9c'}, acc:['dress'], dlg:()=> 'timorous'},
  {id:'sagacity',  map:'sagacity', x:4, y:5, pal:{H:'#d8d2c2', T:'#7a5c3a', U:'#684e30', P:'#4a3b2a'}, acc:['beard','staff'], dlg:()=> 'sagacity'},
  {id:'interpreter',map:'interp',x:8, y:3, pal:{H:'#d8d2c2', T:'#9c7a2e', U:'#876926', P:'#5a4a20'}, acc:['staff'], dlg:()=> S.flags.roomsSeen>=2 ? 'interp_done' : 'interp_welcome'}
];
