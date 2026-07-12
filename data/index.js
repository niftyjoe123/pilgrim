/* Merges every act's content into the flat lookups src/engine/* consumes.
   Adding Act II is: create data/acts/act2/{meta,maps,npcs,items,dialogue,actions}.js
   in the same shape as act1, then add it to the `acts` array below. */
import * as act1Meta from './acts/act1/meta.js';
import {MAPS as act1Maps, WARPS as act1Warps} from './acts/act1/maps.js';
import {NPCS as act1Npcs} from './acts/act1/npcs.js';
import {ITEMS as act1Items} from './acts/act1/items.js';
import {DLG as act1Dlg} from './acts/act1/dialogue.js';
import {ACTIONS as act1Actions} from './acts/act1/actions.js';

import * as act2Meta from './acts/act2/meta.js';
import {MAPS as act2Maps, WARPS as act2Warps} from './acts/act2/maps.js';
import {NPCS as act2Npcs} from './acts/act2/npcs.js';
import {ITEMS as act2Items} from './acts/act2/items.js';
import {DLG as act2Dlg} from './acts/act2/dialogue.js';
import {ACTIONS as act2Actions} from './acts/act2/actions.js';

import * as act3Meta from './acts/act3/meta.js';
import {MAPS as act3Maps, WARPS as act3Warps} from './acts/act3/maps.js';
import {NPCS as act3Npcs} from './acts/act3/npcs.js';
import {ITEMS as act3Items} from './acts/act3/items.js';
import {DLG as act3Dlg} from './acts/act3/dialogue.js';
import {ACTIONS as act3Actions} from './acts/act3/actions.js';

import * as act4Meta from './acts/act4/meta.js';
import {MAPS as act4Maps, WARPS as act4Warps} from './acts/act4/maps.js';
import {NPCS as act4Npcs} from './acts/act4/npcs.js';
import {ITEMS as act4Items} from './acts/act4/items.js';
import {DLG as act4Dlg} from './acts/act4/dialogue.js';
import {ACTIONS as act4Actions} from './acts/act4/actions.js';

const acts = [
  {meta: act1Meta, maps: act1Maps, warps: act1Warps, npcs: act1Npcs, items: act1Items, dlg: act1Dlg, actions: act1Actions},
  {meta: act2Meta, maps: act2Maps, warps: act2Warps, npcs: act2Npcs, items: act2Items, dlg: act2Dlg, actions: act2Actions},
  {meta: act3Meta, maps: act3Maps, warps: act3Warps, npcs: act3Npcs, items: act3Items, dlg: act3Dlg, actions: act3Actions},
  {meta: act4Meta, maps: act4Maps, warps: act4Warps, npcs: act4Npcs, items: act4Items, dlg: act4Dlg, actions: act4Actions}
];

export const MAPS = {};
export const WARPS = {};
export const NPCS = [];
export const ITEMS = [];
export const DLG = {};
export const MAP_NAMES = {};
export const ACTIONS = {};
export const FLAGS = {};
const mapToAct = {};

for(const act of acts){
  Object.assign(MAPS, act.maps);
  Object.assign(WARPS, act.warps);
  NPCS.push(...act.npcs);
  ITEMS.push(...act.items);
  Object.assign(DLG, act.dlg);
  Object.assign(MAP_NAMES, act.meta.mapNames);
  Object.assign(ACTIONS, act.actions);
  Object.assign(FLAGS, act.meta.flags);
  for(const mapName of act.meta.maps) mapToAct[mapName] = act.meta;
}

export const FIRST_ACT = acts[0].meta;
export const START_MAPS = acts.map(a => a.meta.startMap);

export function actOf(mapName){
  return mapToAct[mapName];
}

// Called after a save is loaded (buildMaps rebuilds LIVE from pristine MAPS,
// discarding any tile mutations flags implied happened before saving).
// Optional per-act hook — most acts have no LIVE-tile mutations at all.
export function reapplyWorldMutations(S, LIVE){
  for(const act of acts) if(act.meta.reapplyWorld) act.meta.reapplyWorld(S, LIVE);
}
