/* Procedurally synthesized audio via the Web Audio API — no external files,
   consistent with the project's procedural-art direction (see CLAUDE.md
   backlog item 2: a real tileset/sprite integration was tried and reverted
   in favor of procedural rendering; the same call applies to audio, since
   sourcing/licensing real CC0 tracks is out of scope here and browsers
   block autoplay of any <audio> element anyway until a user gesture).
   assets/audio/ stays empty/scaffolded for real files if that ever changes.

   Music is a small step-sequencer playing COMPOSED material per act — each
   mood has its own meter, tempo, form and instrumentation, not one shared
   texture with different scales (that was v2 of this file, and every act
   sounded the same; v1 was a sustained drone that read as background hum).
   The distinctness lives in structure: Act I is a 3/4 folk hymn, Act II a
   4/4 climbing march over an ostinato, Act III near-pulseless dark swells,
   Act IV a fast carnival waltz with a deliberately "wrong" bVI bar, Act V
   harp arpeggios under lydian bells, and 'battle' a driving riff for the
   Apollyon fight. If revisiting: keep real composed phrases and per-act
   FORM differences — parameter tweaks on one texture aren't enough. */

const MUTE_KEY = 'pilgrim-muted';

let ctx = null, masterGain = null, musicGain = null, sfxGain = null;
let muted = false;
try { muted = localStorage.getItem(MUTE_KEY) === '1'; } catch(e){ /* ignore */ }

export function isMuted(){ return muted; }
export function audioReady(){ return !!ctx; }

// Must be called from inside a user-gesture handler (click/keydown) — the
// title screen's New Game/Continue buttons are the natural place. Sets up
// the audio graph only; call setMood() separately once the starting act is
// known (main.js does this right after newGame()/continueGame()).
export function initAudio(){
  if(ctx) return;
  const AC = window.AudioContext || window.webkitAudioContext;
  if(!AC) return;
  try { ctx = new AC(); } catch(e){ return; }

  masterGain = ctx.createGain();
  musicGain = ctx.createGain(); musicGain.gain.value = 0.4;
  sfxGain = ctx.createGain(); sfxGain.gain.value = 0.32;
  musicGain.connect(masterGain); sfxGain.connect(masterGain);
  masterGain.connect(ctx.destination);

  masterGain.gain.value = muted ? 0 : 1;
}

export function toggleMute(){
  if(!ctx) return muted;
  muted = !muted;
  masterGain.gain.setTargetAtTime(muted ? 0 : 1, ctx.currentTime, 0.06);
  try { localStorage.setItem(MUTE_KEY, muted ? '1' : '0'); } catch(e){ /* ignore */ }
  return muted;
}

/* ---------------- Composition helpers ---------------- */

// Repeat a per-bar step generator across nBars bars of beatsPerBar each.
// fn(barIndex, barStartBeat) returns an array of steps for that bar.
function bars(nBars, beatsPerBar, fn){
  const out = [];
  for(let i=0;i<nBars;i++) out.push(...fn(i, i*beatsPerBar));
  return out;
}

// Harp-style broken chord: eighth notes rising through the chord tones and
// the octave above, then falling back, filling `beats` beats from startBeat.
function harp(chord, startBeat, beats){
  const up = [...chord, ...chord.map(s=>s+12)];
  const cycle = up.concat([...up].reverse().slice(1, -1));
  const steps = [];
  for(let k=0;k<beats*2;k++) steps.push([startBeat + k*0.5, cycle[k % cycle.length], 0.55, 0.9]);
  return steps;
}

/* ---------------- The six moods ----------------

   Mood shape: {root (Hz), bpm, loopBeats, voices:[...]}.
   Pitched voice: {wave, gain, oct?, cutoff?, detune?, atk?, rel?,
     steps:[[beat, semitoneOrChordArray, durBeats, vel?], ...]}
     (semitones are relative to root; `variants` may replace `steps` with
      several step-arrays, one picked at random each loop pass).
   Percussion voice: {kind:'kick'|'boom'|'snare'|'tick'|'bell', gain?,
     steps:[[beat, vel, bellSemi?], ...]}. */

// Act I — chord roots and triads in G major (root G3).
const A1_G=[0,4,7], A1_C=[5,9,12], A1_D=[7,11,14], A1_Em=[9,12,16];
const A1_PROG=[A1_G, A1_C, A1_G, A1_D, A1_Em, A1_C, A1_D, A1_G];

// Act IV — triads in A major, with F major as the bVI "wrong glitter" bar.
const A4_A=[0,4,7], A4_D=[5,9,12], A4_E=[7,11,14], A4_F=[8,12,15];
const A4_PROG=[A4_A, A4_D, A4_A, A4_E, A4_A, A4_F, A4_E, A4_A];

// Act V — lydian progression (root C4): Cmaj7, D, G, Cmaj7 — two bars each.
const A5_C=[0,4,7,11], A5_D=[2,6,9], A5_G=[7,11,14];
const A5_PROG=[A5_C, A5_D, A5_G, A5_C];

// Battle — E minor riff cell, one semitone value per eighth note (8 beats).
const BT_RIFF=[0,0,0,3, 0,0,6,5, 0,0,0,3, 7,5,3,2];

const MOODS = {

  // ACT I — "The Pilgrim's Morning". A 3/4 folk hymn at a walking pace:
  // waltzing bass, warm pad, and a real singable 8-bar tune (two variants
  // so it breathes). No percussion — open air, morning light.
  act1: {
    root:196.00, bpm:92, loopBeats:24,
    voices:[
      { wave:'triangle', gain:0.15, oct:12, atk:0.05, rel:0.12,
        variants:[
          [[0,7,2],[2,4,1],[3,5,1],[4,4,1],[5,2,1],[6,0,1],[7,2,1],[8,4,1],[9,2,3],
           [12,4,1],[13,7,1],[14,9,1],[15,12,1],[16,9,1],[17,7,1],[18,4,1],[19,2,1],[20,2,1],[21,0,3]],
          [[0,7,2],[2,9,1],[3,12,1],[4,9,1],[5,5,1],[6,4,1],[7,2,1],[8,4,1],[9,2,3],
           [12,9,1],[13,7,1],[14,4,1],[15,5,1],[16,4,1],[17,2,1],[18,7,1],[19,4,1],[20,2,1],[21,0,3]]
        ]},
      { wave:'sine', gain:0.1, detune:5, atk:0.5, rel:0.7,
        steps: bars(8, 3, (i,b)=>[[b, A1_PROG[i], 3, 0.9]]) },
      { wave:'sine', gain:0.13, oct:-12, atk:0.04, rel:0.1,
        steps: bars(8, 3, (i,b)=>{
          const r=A1_PROG[i][0], fifth = r>=7 ? r-5 : r+7;
          return [[b, r, 1.6],[b+2, fifth, 0.9, 0.7]];
        })}
    ]
  },

  // ACT II — "The Hill". A 4/4 march in D dorian, now in verse/chorus form
  // (8 bars): the verse is the climbing sequence — each phrase repeats the
  // last shape a third higher, so the climb itself is audible — and the
  // chorus is the arrival: higher, harmonized in thirds, over new chords
  // (F–C–G–Dm) while the bass leaves its pedal ostinato to walk the roots.
  // A snare fill at the end of the chorus marches back into the verse.
  act2: {
    root:146.83, bpm:106, loopBeats:32,
    voices:[
      { wave:'triangle', gain:0.14, oct:12, atk:0.03, rel:0.08,
        steps:[
          // verse — the climb
          [0,0,0.9],[1,2,0.9],[2,3,0.9],[3,5,0.9],
          [4,3,0.9],[5,5,0.9],[6,7,0.9],[7,9,0.9],
          [8,7,0.9],[9,9,0.9],[10,10,0.9],[11,12,0.9],
          [12,12,0.9],[13,10,0.9],[14,7,1.8],
          // chorus — the summit view, in parallel thirds
          [16,[15,12],1.4],[17.5,[17,14],0.5],[18,[15,12],0.9],[19,[12,9],0.9],
          [20,[14,10],1.4],[21.5,[12,9],0.5],[22,[10,7],0.9],[23,[14,10],0.9],
          [24,[12,9],1.9],[26,[9,5],0.9],[27,[7,3],0.9],
          [28,[5,2],0.9],[29,[3,0],0.9],[30,0,1.9]]},
      { wave:'sawtooth', gain:0.06, cutoff:700, atk:0.15, rel:0.3,
        steps: bars(8, 4, (i,b)=>{
          const CH=[[0,3,7],[3,7,10],[5,9,12],[0,3,7],
                    [3,7,10],[10,14,17],[5,9,12],[0,3,7]][i];
          return [[b, CH, 1.6, 0.9],[b+2, CH, 1.6, 0.7]];
        })},
      { wave:'sine', gain:0.15, oct:-12, atk:0.02, rel:0.06,
        steps: bars(8, 4, (i,b)=>{
          if(i<4) return [[b,0,0.85],[b+1,0,0.85,0.8],[b+2,7,0.85],[b+3,10,0.85,0.9]];
          const r=[3,10,5,0][i-4], fifth = r>=7 ? r-5 : r+7;
          return [[b,r,0.85],[b+1,r,0.85,0.8],[b+2,fifth,0.85],[b+3,r,0.85,0.9]];
        })},
      { kind:'kick', gain:0.8, steps: bars(8, 4, (i,b)=>[[b,1],[b+2,0.7]]) },
      { kind:'snare', gain:0.5,
        steps: bars(8, 4, (i,b)=>[[b+1,0.6],[b+3,0.6]]).concat([[31,0.7],[31.5,0.9]]) },
      { kind:'tick', gain:0.5, steps: bars(4, 4, (i,b)=>[[16+b+0.5,0.3],[16+b+1.5,0.3],[16+b+2.5,0.3],[16+b+3.5,0.3]]) }
    ]
  },

  // ACT III — "The Valley of the Shadow". Nearly pulseless, but now a slow
  // harmonic journey rather than two stations: bare-fifth swells walk
  // C → Ab (false warmth) → Bbm → Db (the phrygian dread interval, leaning
  // home to C at the loop), with a tritone intrusion smeared across the Ab.
  // A distant bowed counter-voice drifts through the stations' thirds and
  // fifths, the sparse high voice has real phrygian cells to sing, and the
  // deep booms land at irregular places. Still no ground to stand on.
  act3: {
    root:130.81, bpm:50, loopBeats:48,
    voices:[
      { wave:'sine', gain:0.14, detune:6, atk:3, rel:3.5,
        steps:[[0,[0,7],10],[12,[8,15],10],[18,6,6,0.35],[24,[10,17],10],[36,[1,8],10]]},
      { wave:'sine', gain:0.16, oct:-12, atk:2.2, rel:2.5,
        steps:[[0,0,10],[12,-4,10],[24,-2,10],[36,1,10]]},
      { wave:'sawtooth', gain:0.045, oct:12, cutoff:300, atk:2.5, rel:3,
        steps:[[2,7,8],[14,12,8],[26,13,8],[38,8,8]]},
      { wave:'sine', gain:0.07, oct:24, atk:1.6, rel:2,
        variants:[
          [[4,12,3],[9,13,2.5],[21,10,3],[33,8,3],[44,7,3]],
          [[6,15,3],[11,13,2],[27,12,4],[40,13,3]],
          [[3,8,4],[19,7,3],[31,10,3],[43,12,4]],
          [[15,19,4],[36,17,3]]
        ]},
      { kind:'boom', gain:1, steps:[[0,1],[17,0.5],[29,0.7],[41,0.4]] }
    ]
  },

  // ACT IV — "Vanity Fair". A fast carnival waltz: oom-pah-pah bass and
  // stabs, a jaunty chromatic square-wave tune — and bar six lurches onto
  // F major (bVI in A), the harmonic equivalent of gilt paint peeling.
  act4: {
    root:220.00, bpm:160, loopBeats:24,
    voices:[
      { wave:'square', gain:0.12, oct:12, cutoff:2600, atk:0.01, rel:0.05,
        steps:[[0,12,0.4],[0.5,11,0.4],[1,12,0.4],[1.5,14,0.4],[2,16,0.9],
               [3,17,0.4],[3.5,16,0.4],[4,17,0.4],[4.5,19,0.4],[5,21,0.9],
               [6,16,0.4],[6.5,12,0.4],[7,9,0.4],[7.5,12,0.4],[8,16,0.9],
               [9,14,0.9],[10,11,0.9],[11,7,0.9],
               [12,12,0.4],[12.5,11,0.4],[13,12,0.4],[13.5,14,0.4],[14,16,0.9],
               [15,17,0.4],[15.5,16,0.4],[16,15,0.4],[16.5,12,0.4],[17,8,0.9],
               [18,14,0.9],[19,11,0.9],[20,7,0.4],[20.5,11,0.4],
               [21,12,2.5]]},
      { wave:'sawtooth', gain:0.07, cutoff:1400, atk:0.01, rel:0.06,
        steps: bars(8, 3, (i,b)=>[[b+1, A4_PROG[i], 0.35, 0.8],[b+2, A4_PROG[i], 0.35, 0.8]])},
      { wave:'triangle', gain:0.15, oct:-12, atk:0.01, rel:0.05,
        steps: bars(8, 3, (i,b)=>[[b, A4_PROG[i][0], 0.5]])},
      { kind:'tick', gain:0.6, steps: bars(8, 3, (i,b)=>[[b,1],[b+1,0.35],[b+2,0.35]]) }
    ]
  },

  // ACT V — "The City". Slow lydian radiance: an unbroken harp arpeggio
  // rippling through each chord, long pad and high two-voice "choir", a
  // bell tolling each change, all over a deep gentle bass. No drums —
  // the harp itself is the pulse.
  act5: {
    root:261.63, bpm:58, loopBeats:32,
    voices:[
      { wave:'triangle', gain:0.09, atk:0.02, rel:0.25,
        steps: A5_PROG.flatMap((ch,i)=>harp(ch, i*8, 8)) },
      { wave:'sine', gain:0.09, detune:6, atk:1.5, rel:2,
        steps: A5_PROG.map((ch,i)=>[i*8, ch, 8, 0.9]) },
      { wave:'sine', gain:0.05, detune:8, atk:2.5, rel:2.5,
        steps:[[0,[12,19],8],[8,[14,21],8],[16,[19,26],8],[24,[12,19],8]]},
      { wave:'sine', gain:0.1, oct:-24, atk:1, rel:1.5,
        steps:[[0,0,7.5],[8,2,7.5],[16,7,7.5],[24,0,7.5]]},
      { kind:'bell', gain:0.6, steps:[[0,1,0],[8,0.8,2],[16,0.9,7],[24,0.7,0]] }
    ]
  },

  // BATTLE — "Apollyon". Not tied to an act: startBattle() switches here
  // and endBattle() restores the current act's mood. A two-section
  // arrangement: section A (bars 1–4) establishes the low saw riff with
  // its tritone snarl over Em → C → Bb(!) → B stabs; section B (bars 5–8)
  // is the full fight — a fat detuned lead melody rides the riff (ending
  // suspended on D#, the leading tone, so the loop hungers back into A),
  // an eighth-note alarm pedal hammers E'/B above it, offbeat kicks double
  // the drive, and a snare fill hurls the loop back to the top.
  battle: {
    root:82.41, bpm:140, loopBeats:32,
    voices:[
      { wave:'sawtooth', gain:0.22, cutoff:520, atk:0.01, rel:0.05,
        steps: bars(4, 8, (i,b)=>BT_RIFF.map((s,k)=>[b + k*0.5, s, 0.42])) },
      { wave:'sawtooth', gain:0.1, oct:12, cutoff:1600, atk:0.01, rel:0.1,
        steps: bars(2, 16, (i,b)=>
          [[b,[0,3,7],0.7],[b+4,[8,12,15],0.7],[b+8,[6,10,13],0.7],[b+12,[7,11,14],0.7]]) },
      { wave:'sawtooth', gain:0.13, oct:24, cutoff:2400, detune:8, atk:0.02, rel:0.09,
        steps:[[16,12,1.4],[17.5,10,0.5],[18,8,0.9],[19,7,0.9],
               [20,8,1.4],[21.5,7,0.5],[22,5,0.9],[23,3,0.9],
               [24,6,1.8],[26,5,0.45],[26.5,6,0.45],[27,8,0.9],
               [28,7,0.9],[29,10,0.9],[30,11,1.9]]},
      { wave:'square', gain:0.045, oct:24, cutoff:3200, atk:0.01, rel:0.05,
        steps: Array.from({length:32}, (_,k)=>[16 + k*0.5, k%2 ? 7 : 12, 0.4, 0.8]) },
      { kind:'kick', gain:0.9, steps: bars(32, 1, (i,b)=>{
          const hits=[[b, i%2===0 ? 1 : 0.85]];
          if(i>=16 && i%4===2) hits.push([b+0.5, 0.6]);
          return hits;
        })},
      { kind:'snare', gain:0.6,
        steps: bars(16, 2, (i,b)=>[[b+1, 0.8]])
          .concat([[30.25,0.4],[30.75,0.5],[31.25,0.6],[31.5,0.7],[31.75,0.85]]) },
      { kind:'tick', gain:0.3, steps: bars(32, 1, (i,b)=>[[b+0.5, i>=16 ? 0.45 : 0.3]]) }
    ]
  }
};

/* ---------------- Sequencer ---------------- */

let musicGenCounter = 0;
let activeMoodId = null;
let currentBus = null;

function freqOf(root, semi){ return root * Math.pow(2, semi/12); }

function playNote(bus, t0, freq, dur, v, vel){
  vel = (vel==null?1:vel) * (0.92 + Math.random()*0.16); // humanize
  const detunes = v.detune ? [-v.detune, v.detune] : [0];
  for(const d of detunes){
    const o = ctx.createOscillator(); o.type = v.wave; o.frequency.value = freq;
    if(d) o.detune.value = d;
    let node = o;
    if(v.cutoff){
      const f = ctx.createBiquadFilter(); f.type='lowpass'; f.frequency.value=v.cutoff; f.Q.value=0.4;
      o.connect(f); node = f;
    }
    const g = ctx.createGain(); g.gain.value = 0;
    node.connect(g); g.connect(bus);
    const atk = Math.min(v.atk||0.02, dur*0.5);
    const rel = Math.min(v.rel||0.08, dur*0.5);
    const peak = (v.gain * vel) / detunes.length * (detunes.length>1 ? 1.3 : 1);
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(peak, t0+atk);
    g.gain.setValueAtTime(peak, t0+dur-rel);
    g.gain.linearRampToValueAtTime(0, t0+dur);
    o.start(t0); o.stop(t0+dur+0.05);
  }
}

function noiseBurst(bus, t0, cutoff, gain, decay){
  const n = Math.max(1, Math.round(ctx.sampleRate * Math.min(0.35, decay)));
  const buf = ctx.createBuffer(1, n, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for(let i=0;i<n;i++) data[i] = Math.random()*2-1;
  const src = ctx.createBufferSource(); src.buffer = buf;
  const filt = ctx.createBiquadFilter(); filt.type='lowpass'; filt.frequency.value=cutoff;
  const g = ctx.createGain(); g.gain.value=0;
  src.connect(filt); filt.connect(g); g.connect(bus);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0+0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t0+decay);
  src.start(t0); src.stop(t0+decay+0.05);
}

// kick/boom: a sine pitch-drop (the classic synth drum); snare/tick:
// filtered noise; bell: a sine with one inharmonic partial, long ring.
function playPerc(bus, t0, kind, vel, root, bellSemi){
  if(kind==='kick' || kind==='boom'){
    const boom = kind==='boom';
    const o = ctx.createOscillator(); o.type='sine';
    o.frequency.setValueAtTime(boom?90:130, t0);
    o.frequency.exponentialRampToValueAtTime(boom?36:44, t0+(boom?0.6:0.16));
    const g = ctx.createGain(); g.gain.value=0;
    o.connect(g); g.connect(bus);
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(0.5*vel, t0+0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t0+(boom?0.9:0.22));
    o.start(t0); o.stop(t0+(boom?1:0.3));
    if(!boom) noiseBurst(bus, t0, 3000, 0.08*vel, 0.05);
  } else if(kind==='snare'){
    noiseBurst(bus, t0, 2400, 0.2*vel, 0.12);
  } else if(kind==='tick'){
    noiseBurst(bus, t0, 4500, 0.1*vel, 0.045);
  } else if(kind==='bell'){
    const f = freqOf(root, (bellSemi||0) + 24);
    for(const [mult, amt] of [[1, 1],[2.76, 0.35]]){
      const o = ctx.createOscillator(); o.type='sine'; o.frequency.value=f*mult;
      const g = ctx.createGain(); g.gain.value=0;
      o.connect(g); g.connect(bus);
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(0.16*vel*amt, t0+0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t0+2.2);
      o.start(t0); o.stop(t0+2.3);
    }
  }
}

// Schedules one full loop pass of every voice, then re-arms itself just
// before the loop boundary. `session.gen` is stamped at creation; once a
// newer mood supersedes it, the stale pass sees its gen is old and stops.
function scheduleLoop(session){
  if(session.gen !== musicGenCounter) return;
  const {mood, bus, spb} = session;
  // if the tab was throttled and we're late, skip ahead rather than
  // machine-gunning missed loops into the past
  while(session.loopStart + mood.loopBeats*spb < ctx.currentTime)
    session.loopStart += mood.loopBeats*spb;
  const t0 = session.loopStart;

  for(const v of mood.voices){
    const steps = v.variants ? v.variants[Math.floor(Math.random()*v.variants.length)] : v.steps;
    for(const st of steps){
      if(v.kind){
        const [beat, vel, bellSemi] = st;
        playPerc(bus, t0+beat*spb, v.kind, (vel==null?1:vel)*(v.gain==null?1:v.gain), mood.root, bellSemi);
      } else {
        const [beat, payload, durB, vel] = st;
        const semis = Array.isArray(payload) ? payload : [payload];
        for(const s of semis)
          playNote(bus, t0+beat*spb, freqOf(mood.root, s+(v.oct||0)), durB*spb,
                   v, (vel==null?1:vel)/Math.sqrt(semis.length));
      }
    }
  }

  session.loopStart += mood.loopBeats*spb;
  const waitMs = (session.loopStart - ctx.currentTime)*1000 - 400;
  setTimeout(()=>scheduleLoop(session), Math.max(50, waitMs));
}

// Crossfades from whatever's currently playing to `moodId` — an act id
// ('act1'…'act5', from warps/boot/restart) or 'battle' (from battle.js).
// A no-op if that mood is already active or audio isn't initialized.
export function setMood(moodId){
  if(!ctx || !moodId || moodId === activeMoodId) return;
  const mood = MOODS[moodId];
  if(!mood) return;
  activeMoodId = moodId;
  musicGenCounter++;

  if(currentBus){
    const oldBus = currentBus;
    oldBus.gain.cancelScheduledValues(ctx.currentTime);
    oldBus.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
    setTimeout(()=>{ try{ oldBus.disconnect(); }catch(e){ /* ignore */ } }, 900);
  }

  const bus = ctx.createGain(); bus.gain.value = 0;
  bus.connect(musicGain);
  bus.gain.setTargetAtTime(1, ctx.currentTime, 0.4);
  currentBus = bus;

  scheduleLoop({gen: musicGenCounter, mood, bus, spb: 60/mood.bpm, loopStart: ctx.currentTime + 0.1});
}

/* ---------------- SFX (unchanged) ---------------- */

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
