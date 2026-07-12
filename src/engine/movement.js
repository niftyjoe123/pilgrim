import {LIVE, S, player, cur, setCur, addVerse, applyFx} from './state.js';
import {toast} from './dom.js';
import {openDlg, renderStatus, dlgOpen} from './ui.js';
import {WARPS, NPCS, ITEMS, MAP_NAMES, actOf} from '../../data/index.js';
import {BLOCKED, HAZARDS} from '../../data/tiles.js';
import {saveGame} from './save.js';
import {sfxPickup, sfxWarp, sfxHazard} from './audio.js';
import {isBattleOpen} from './battle.js';

function tileAt(x,y){ const M=LIVE[cur]; return (M[y]&&M[y][x])||'#'; }
function npcAt(x,y){ return NPCS.find(n=>n.map===cur&&n.x===x&&n.y===y&&!(n.gone&&n.gone())); }
function itemAt(x,y){ return ITEMS.find(i=>i.map===cur&&i.x===x&&i.y===y&&!i.taken); }

export function warpTo(w){
  setCur(w.map); player.x=w.x; player.y=w.y; player.moveT=performance.now();
  if(MAP_NAMES[cur]) toast('📍 '+MAP_NAMES[cur]);
  renderStatus();
  saveGame();
  sfxWarp();
}

let lastSwampToast=0;
const lastHazardToast={}; // per-glyph, so bumping two different hazards close together doesn't suppress the second
export function tryStep(dx,dy){
  if(dlgOpen || isBattleOpen()) return;
  player.face = dx===1?'right' : dx===-1?'left' : dy===1?'down' : 'up';
  const nx=player.x+dx, ny=player.y+dy;
  const t=tileAt(nx,ny);
  const npc=npcAt(nx,ny);
  if(npc){ openDlg(npc.dlg()); return; }
  if(t==='g'){ openDlg(S.flags.metEvangelist? 'gate':'gate_locked'); return; }
  if(t==='A'){ openDlg(S.flags.scrollLost ? 'arbor_found' : 'arbor'); return; }
  if(t==='D'||t==='I'||t==='X'){
    const w=WARPS[cur+':'+nx+','+ny];
    if(w) warpTo(w);
    return;
  }
  if(t>='1'&&t<='6'){
    // digits 1-9 are a shared "numbered exhibit" pool across every act's
    // interiors (Act I's Interpreter pictures use 1-4) — pick unused digits
    // per new exhibit, since the flag name below is global, not per-map.
    const n='room'+t;
    if(!S.flags[n]){ S.flags[n]=true; openDlg(n); }
    else toast('You have looked long at this already.');
    return;
  }
  if(HAZARDS[t]){
    const now=Date.now();
    if(now-(lastHazardToast[t]||0)>1800){
      lastHazardToast[t]=now;
      S.resolve=Math.max(1,S.resolve-HAZARDS[t].cost);
      toast(HAZARDS[t].message);
      renderStatus();
      sfxHazard();
    }
    return;
  }
  if(BLOCKED.has(t)) return;
  player.x=nx; player.y=ny; player.step++; player.moveT=performance.now();

  const it=itemAt(nx,ny);
  if(it){
    it.taken=true;
    if(it.verse){ addVerse(it.verse); }
    if(it.item){ S.items.push(it.item); toast(`🗝 Taken: <b>${it.item.name}</b> — ${it.item.note}`); }
    renderStatus();
    saveGame();
    sfxPickup();
  }
  if(t==='~'){
    const cost = S.burden? 2:1;
    S.resolve=Math.max(1,S.resolve-cost);
    const now=Date.now();
    if(now-lastSwampToast>2200){
      lastSwampToast=now;
      toast(S.burden? '⚓ The Burden drags you down into the mire… −2 Resolve per step'
                    : 'The mire sucks at your feet… −1 Resolve per step');
    }
    if(S.resolve<=2){
      player.x=34; player.y=14; S.resolve=Math.min(S.maxResolve,S.resolve+3);
      applyFx({hope:1});
      toast('🤝 A strong hand hauls you out — HELP was listening. “Why did you not look for the steps?” +1 Hope');
    }
    renderStatus();
  }
  if(t==='f'){
    if(!S.flags.sinaiDone) openDlg('sinai');
    else { toast('The hill still smokes. You know better now.'); player.y+=1; }
  }
  if(t==='+' && !S.flags.crossDone){ openDlg('cross'); }
  if(t==='E'){
    // 'E' (act-end) is shared across every act's map, but flags/dialogue
    // ids are a flat global namespace — so the "ended" flag and the
    // finale dialogue are namespaced per-act (actId + 'Ended' / 'Finale')
    // rather than the literal 'ended'/'finale' Act I originally used.
    const act = actOf(cur);
    const endedFlag = act.id + 'Ended';
    if(!S.flags[endedFlag]){
      S.flags[endedFlag] = true;
      renderStatus();
      saveGame();
      openDlg(act.id + 'Finale');
    }
  }
}
