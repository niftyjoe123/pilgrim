import {S} from '../../../src/engine/state.js';

export const NPCS = [
  {id:'simple',      map:'hillworld', x:5,  y:39, pal:{H:'#b98a4a', T:'#8c7a5b', U:'#7a6a4c', P:'#5a4a30'}, acc:[], dlg:()=> 'simple'},
  {id:'sloth',       map:'hillworld', x:13, y:39, pal:{H:'#6e4a22', T:'#6b7a5b', U:'#5b6a4c', P:'#4a3b2a'}, acc:[], dlg:()=> 'sloth'},
  {id:'presumption', map:'hillworld', x:9,  y:40, pal:{H:'#2b2115', T:'#8c5b5b', U:'#7a4c4c', P:'#3a2f24'}, acc:[], dlg:()=> 'presumption'},

  {id:'formalist',   map:'hillworld', x:7,  y:37, pal:{H:'#4a3b2a', T:'#8c8c5b', U:'#7a7a4c', P:'#5a4a30'}, acc:[], dlg:()=> 'formalist_hypocrisy'},
  {id:'hypocrisy',   map:'hillworld', x:11, y:37, pal:{H:'#1e1610', T:'#5b5b6e', U:'#4c4c5f', P:'#3a2f24'}, acc:[], dlg:()=> 'formalist_hypocrisy'},

  {id:'timorous2',   map:'hillworld', x:6,  y:7,  pal:{H:'#9a8a7a', T:'#8a7a9c', U:'#786a8a', P:'#4a3b2a'}, acc:[], dlg:()=> 'timorous_mistrust'},
  {id:'mistrust',    map:'hillworld', x:12, y:7,  pal:{H:'#4a2f18', T:'#6e6e6e', U:'#5c5c5c', P:'#3a2f24'}, acc:[], dlg:()=> 'timorous_mistrust'},

  {id:'watchful',    map:'hillworld', x:7,  y:2,  pal:{H:'#c9c2b2', T:'#4a5f7d', U:'#3d4f68', P:'#2b2115'}, acc:['staff'], dlg:()=> 'watchful'},

  {id:'discretion',  map:'palace', x:8,  y:3, pal:{H:'#4a2f18', T:'#7a8c9c', U:'#697a8a', P:'#7a8c9c'}, acc:['dress'], dlg:()=> S.flags.scrollLost ? 'discretion_noscroll' : 'discretion'},
  {id:'prudence',    map:'palace', x:5,  y:5, pal:{H:'#2b2115', T:'#8c6b9c', U:'#7a5c8a', P:'#8c6b9c'}, acc:['dress'], dlg:()=> 'prudence'},
  {id:'piety',       map:'palace', x:9,  y:5, pal:{H:'#c9c2b2', T:'#9c7a5b', U:'#8a694c', P:'#9c7a5b'}, acc:['dress'], dlg:()=> 'piety'},
  {id:'charity',     map:'palace', x:13, y:5, pal:{H:'#6e4a22', T:'#8c5b5b', U:'#7a4c4c', P:'#8c5b5b'}, acc:['dress'], dlg:()=> 'charity'}
];
