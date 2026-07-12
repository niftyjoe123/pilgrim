/* Merges every act's content into the flat lookups src/engine/* consumes.
   Adding Act II is: create data/acts/act2/{meta,maps,npcs,items,dialogue,actions}.js
   in the same shape as act1, then add it to the `acts` array below. */
import * as act1Meta from './acts/act1/meta.js';
import {MAPS as act1Maps, WARPS as act1Warps} from './acts/act1/maps.js';
import {NPCS as act1Npcs} from './acts/act1/npcs.js';
import {ITEMS as act1Items} from './acts/act1/items.js';
import {DLG as act1Dlg} from './acts/act1/dialogue.js';
import {ACTIONS as act1Actions} from './acts/act1/actions.js';

const acts = [
  {meta: act1Meta, maps: act1Maps, warps: act1Warps, npcs: act1Npcs, items: act1Items, dlg: act1Dlg, actions: act1Actions}
];

export const MAPS = {};
export const WARPS = {};
export const NPCS = [];
export const ITEMS = [];
export const DLG = {};
export const MAP_NAMES = {};
export const ACTIONS = {};
const mapToAct = {};

for(const act of acts){
  Object.assign(MAPS, act.maps);
  Object.assign(WARPS, act.warps);
  NPCS.push(...act.npcs);
  ITEMS.push(...act.items);
  Object.assign(DLG, act.dlg);
  Object.assign(MAP_NAMES, act.meta.mapNames);
  Object.assign(ACTIONS, act.actions);
  for(const mapName of act.meta.maps) mapToAct[mapName] = act.meta;
}

export const FIRST_ACT = acts[0].meta;

export function actOf(mapName){
  return mapToAct[mapName];
}
