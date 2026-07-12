/* Procedurally synthesized audio via the Web Audio API — no external files,
   consistent with the project's procedural-art direction (see CLAUDE.md
   backlog item 2: a real tileset/sprite integration was tried and reverted
   in favor of procedural rendering; the same call applies to audio, since
   sourcing/licensing real CC0 tracks is out of scope here and browsers
   block autoplay of any <audio> element anyway until a user gesture).
   assets/audio/ stays empty/scaffolded for real files if that ever changes. */

const MUTE_KEY = 'pilgrim-muted';

let ctx = null, masterGain = null, musicGain = null, sfxGain = null;
let muted = false;
try { muted = localStorage.getItem(MUTE_KEY) === '1'; } catch(e){ /* ignore */ }

export function isMuted(){ return muted; }
export function audioReady(){ return !!ctx; }

// Must be called from inside a user-gesture handler (click/keydown) — the
// title screen's New Game/Continue buttons are the natural place.
export function initAudio(){
  if(ctx) return;
  const AC = window.AudioContext || window.webkitAudioContext;
  if(!AC) return;
  try { ctx = new AC(); } catch(e){ return; }

  masterGain = ctx.createGain();
  musicGain = ctx.createGain(); musicGain.gain.value = 0.16;
  sfxGain = ctx.createGain(); sfxGain.gain.value = 0.32;
  musicGain.connect(masterGain); sfxGain.connect(masterGain);
  masterGain.connect(ctx.destination);

  masterGain.gain.value = muted ? 0 : 1;

  startAmbient();
}

export function toggleMute(){
  if(!ctx) return muted;
  muted = !muted;
  masterGain.gain.setTargetAtTime(muted ? 0 : 1, ctx.currentTime, 0.06);
  try { localStorage.setItem(MUTE_KEY, muted ? '1' : '0'); } catch(e){ /* ignore */ }
  return muted;
}

// A slow, quiet two-note drone with a gentle filter sweep — meant to sit
// under the game without demanding attention. Loops forever via sustained
// oscillators rather than a sample loop.
function startAmbient(){
  const now = ctx.currentTime;
  const osc1 = ctx.createOscillator(); osc1.type = 'sine'; osc1.frequency.value = 110;    // A2
  const osc2 = ctx.createOscillator(); osc2.type = 'sine'; osc2.frequency.value = 164.81; // E3

  const lfo = ctx.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 0.045;
  const lfoGain = ctx.createGain(); lfoGain.gain.value = 60;
  const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 260; filter.Q.value = 0.6;
  lfo.connect(lfoGain); lfoGain.connect(filter.frequency);

  const swell = ctx.createGain(); swell.gain.value = 0;
  osc1.connect(filter); osc2.connect(filter); filter.connect(swell); swell.connect(musicGain);

  osc1.start(now); osc2.start(now); lfo.start(now);
  swell.gain.linearRampToValueAtTime(1, now + 4);
}

function tone(freq, startOffset, dur, type, peak){
  if(!ctx) return;
  const o = ctx.createOscillator(); o.type = type; o.frequency.value = freq;
  const g = ctx.createGain(); g.gain.value = 0;
  o.connect(g); g.connect(sfxGain);
  const t0 = ctx.currentTime + startOffset;
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(peak, t0 + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.start(t0); o.stop(t0 + dur + 0.05);
}

export function sfxDialogue(){ tone(440, 0, 0.12, 'triangle', 0.16); }
export function sfxPickup(){ tone(660, 0, 0.16, 'sine', 0.22); tone(880, 0.09, 0.2, 'sine', 0.2); }
export function sfxWarp(){ tone(220, 0, 0.22, 'sine', 0.14); tone(330, 0.05, 0.2, 'sine', 0.11); }
export function sfxHazard(){ tone(120, 0, 0.22, 'sawtooth', 0.18); }
export function sfxRestart(){ tone(392, 0, 0.14, 'triangle', 0.18); tone(523.25, 0.1, 0.22, 'triangle', 0.18); }
