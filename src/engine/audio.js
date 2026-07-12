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
  musicGain = ctx.createGain(); musicGain.gain.value = 0.22;
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

// A2/E3 root pad (quiet, sustained, just for warmth) plus a slow, generative
// melody wandering over an A minor pentatonic scale — spaced notes with soft
// attack/release and real rests between them, so it reads as gentle ambient
// music rather than a held drone. Each note self-schedules the next one.
const SCALE = [220.00, 261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33]; // A3 C4 D4 E4 G4 A4 C5 D5
let lastNoteIdx = -1;

function startAmbient(){
  const now = ctx.currentTime;
  const pad1 = ctx.createOscillator(); pad1.type = 'sine'; pad1.frequency.value = 110;    // A2
  const pad2 = ctx.createOscillator(); pad2.type = 'sine'; pad2.frequency.value = 164.81; // E3

  const lfo = ctx.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 0.045;
  const lfoGain = ctx.createGain(); lfoGain.gain.value = 60;
  const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 260; filter.Q.value = 0.6;
  lfo.connect(lfoGain); lfoGain.connect(filter.frequency);

  const padGain = ctx.createGain(); padGain.gain.value = 0;
  pad1.connect(filter); pad2.connect(filter); filter.connect(padGain); padGain.connect(musicGain);

  pad1.start(now); pad2.start(now); lfo.start(now);
  padGain.gain.linearRampToValueAtTime(0.3, now + 5);

  setTimeout(scheduleMelodyNote, 2500);
}

function scheduleMelodyNote(){
  if(!ctx) return;
  // step by a small scale interval rather than jumping fully at random, so
  // the melody wanders instead of scattering — an easy way to sound composed
  let idx = lastNoteIdx < 0
    ? Math.floor(SCALE.length / 2)
    : Math.max(0, Math.min(SCALE.length - 1, lastNoteIdx + (Math.floor(Math.random()*5) - 2)));
  lastNoteIdx = idx;

  const dur = 1.6 + Math.random() * 1.4;
  const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = SCALE[idx];
  const g = ctx.createGain(); g.gain.value = 0;
  o.connect(g); g.connect(musicGain);

  const t0 = ctx.currentTime;
  const peak = 0.16 + Math.random() * 0.08;
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(peak, t0 + 0.5);
  g.gain.linearRampToValueAtTime(0, t0 + dur);
  o.start(t0); o.stop(t0 + dur + 0.1);

  const rest = 900 + Math.random() * 2000;
  setTimeout(scheduleMelodyNote, (dur * 1000) + rest);
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
