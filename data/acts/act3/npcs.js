import {S} from '../../../src/engine/state.js';

export const NPCS = [
  {id:'shepherd', map:'valley', x:4,  y:4, pal:{H:'#b98a4a', T:'#8c9c6b', U:'#7a8a5b', P:'#5a4a30'}, acc:[], dlg:()=> 'shepherd'},
  {id:'apollyon', map:'valley', x:14, y:4, pal:{H:'#8c0f0f', T:'#1a0505', U:'#100303', P:'#0a0202'}, acc:[], scale:1.3, dlg:()=> 'apollyon', gone:()=>S.flags.apollyonDefeated},
  {id:'faithful', map:'valley', x:26, y:4, pal:{H:'#4a3b2a', T:'#5b7a9c', U:'#4c688a', P:'#3a2f24'}, acc:[], dlg:()=> 'faithful'}
];
