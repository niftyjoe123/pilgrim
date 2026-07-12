/* A small, self-contained turn-based battle engine — the one encounter in
   the game that genuinely doesn't fit the DLG choice/next graph (it's a
   numeric loop against an enemy HP pool, not a single branching text page).
   Everything else about the fight (the intro, the victory text, the verse
   reward) is still ordinary data-driven DLG, wired in via act3/dialogue.js
   and act3/actions.js — this module is only the loop itself.

   Apollyon's attacks are a fixed, telegraphed pattern (not random) so the
   fight stays "turn-based, readable" per the design doc: the player always
   sees what's coming next before they choose their action. */
import {$} from './dom.js';
import {S, applyFx} from './state.js';
import {renderStatus, openDlg} from './ui.js';
import {saveGame} from './save.js';

const MAX_HP = 24;
const PATTERN = ['claw', 'claw', 'flame', 'claw', 'claw', 'flame'];

let open = false;
let enemyHp = 0;
let turn = 0;

export function isBattleOpen(){ return open; }
export function battleEnemyHp(){ return enemyHp; }
export function battleTurn(){ return turn; }

function attackFor(t){ return PATTERN[t % PATTERN.length]; }

function renderBattle(log){
  $('battleFill').style.width = Math.max(0, enemyHp/MAX_HP*100) + '%';
  $('battleHpNum').textContent = `${Math.max(0, enemyHp)} / ${MAX_HP}`;
  const next = attackFor(turn);
  $('battleTelegraph').textContent = next === 'flame'
    ? '🔥 Apollyon rears back — a burning dart is coming!'
    : '🐾 Apollyon crouches, claws ready.';
  if(log) $('battleLog').textContent = log;
}

export function startBattle(){
  open = true; enemyHp = MAX_HP; turn = 0;
  $('battleOverlay').classList.add('show');
  $('battleAttack').onclick = () => battleAction('attack');
  $('battleBlock').onclick = () => battleAction('block');
  $('battleStand').onclick = () => battleAction('standFirm');
  $('battleCry').onclick = () => battleAction('cryOut');
  renderBattle('Apollyon blocks the way. Choose your stand.');
}

function endBattle(){
  open = false;
  $('battleOverlay').classList.remove('show');
}

export function battleAction(name){
  if(!open) return;
  const incoming = attackFor(turn);
  const incomingDmg = incoming === 'flame' ? 4 : 2;
  const log = [];
  let mitigated = incomingDmg; // damage that actually lands this turn

  if(name === 'attack'){
    const dmg = 3 + Math.floor(S.verses.length/4);
    enemyHp -= dmg;
    log.push(`⚔ Sword of the Spirit — ${dmg} damage to Apollyon.`);
  } else if(name === 'block'){
    const reduce = Math.floor(S.faith/2) + 1;
    mitigated = Math.max(1, incomingDmg - reduce);
    log.push(`🛡 Shield of Faith raised — you take only ${mitigated}.`);
  } else if(name === 'standFirm'){
    const reduce = Math.floor(S.endurance/3) + 1;
    const counter = Math.floor(S.endurance/2) + 1;
    mitigated = Math.max(1, incomingDmg - reduce);
    enemyHp -= counter;
    log.push(`⛰ Stand Firm — you take ${mitigated} and strike back for ${counter}.`);
    if(incoming === 'flame' && !S.flags.apollyonStandFirmBonus){
      S.flags.apollyonStandFirmBonus = true;
      applyFx({endurance:1});
      log.push('+1 Endurance for holding the line against the flame dart.');
    }
  } else if(name === 'cryOut'){
    const before = S.resolve;
    const heal = 2 + Math.floor(S.hope/2);
    S.resolve = Math.min(S.maxResolve, S.resolve + heal);
    log.push(`🕊 Cry Out — +${S.resolve-before} Resolve.`);
    if(before <= 3 && !S.flags.apollyonCryOutBonus){
      S.flags.apollyonCryOutBonus = true;
      applyFx({hope:1});
      log.push('+1 Hope for calling out even in the worst of it.');
    }
  } else {
    return;
  }

  if(enemyHp <= 0){
    renderStatus();
    saveGame();
    endBattle();
    openDlg('apollyonVictory');
    return;
  }

  S.resolve = Math.max(1, S.resolve - mitigated);
  log.push(incoming === 'flame'
    ? `🔥 The flame dart lands — −${mitigated} Resolve.`
    : `🐾 Apollyon's claws rake past your guard — −${mitigated} Resolve.`);

  turn++;
  renderStatus();
  renderBattle(log.join(' '));
}
