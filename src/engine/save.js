import {S, player, cur, setCur, buildMaps, LIVE} from './state.js';
import {MAPS, ITEMS, actOf, reapplyWorldMutations} from '../../data/index.js';

const SAVE_KEY = 'pilgrim-save-v1';

export function hasSave(){
  try { return !!localStorage.getItem(SAVE_KEY); }
  catch(e){ return false; }
}

export function saveGame(){
  try {
    const data = {
      v: 1,
      cur,
      player: {x: player.x, y: player.y, face: player.face},
      S: {
        faith:S.faith, hope:S.hope, endurance:S.endurance, wisdom:S.wisdom,
        humility:S.humility, love:S.love, resolve:S.resolve, maxResolve:S.maxResolve,
        burden:S.burden, verses:S.verses, items:S.items, flags:S.flags
      }
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch(e) { /* localStorage unavailable (private mode, quota) — save silently skipped */ }
}

export function clearSave(){
  try { localStorage.removeItem(SAVE_KEY); }
  catch(e) { /* ignore */ }
}

// Restores S/cur/player from the save. Returns false (and leaves state
// untouched) if there's no save or it's unreadable, so callers can fall
// back to a new game.
export function loadGame(){
  let data;
  try { data = JSON.parse(localStorage.getItem(SAVE_KEY)); }
  catch(e) { return false; }
  if(!data || data.v !== 1 || !data.S || !data.player || !actOf(data.cur)) return false;

  for(const k in data.S){
    if(k === 'flags' || k === 'verses' || k === 'items') continue;
    S[k] = data.S[k];
  }
  Object.assign(S.flags, data.S.flags);
  S.verses.length = 0; S.verses.push(...data.S.verses);
  S.items.length = 0; S.items.push(...data.S.items);

  buildMaps(MAPS);
  reapplyWorldMutations(S, LIVE);
  ITEMS.forEach(it => {
    if(it.verse) it.taken = S.verses.some(v => v.ref === it.verse.ref);
    else if(it.item) it.taken = S.items.some(i => i.name === it.item.name);
  });

  setCur(data.cur);
  Object.assign(player, {x:data.player.x, y:data.player.y, face:data.player.face||'down', step:0, moveT:performance.now()});
  return true;
}

// Periodic + on-exit autosave, started once the game actually boots (not
// while the title screen is up, so there's nothing to save yet).
export function initAutosave(){
  setInterval(saveGame, 5000);
  addEventListener('beforeunload', saveGame);
}
