import {player, cur, setCur, buildMaps, initFlags} from './engine/state.js';
import {MAPS, FIRST_ACT, FLAGS, actOf} from '../data/index.js';
import {renderStatus} from './engine/ui.js';
import {$, toast} from './engine/dom.js';
import {initInput} from './engine/input.js';
import {initRender} from './engine/render.js';
import {hasSave, loadGame, clearSave, initAutosave} from './engine/save.js';
import {initAudio, toggleMute, isMuted, setMood} from './engine/audio.js';

initFlags(FLAGS);

function boot(startToast){
  initInput();
  initRender();
  renderStatus();
  initAutosave();
  toast(startToast);
  setMood(actOf(cur).id);
}

function newGame(){
  clearSave();
  setCur(FIRST_ACT.startMap);
  player.x = FIRST_ACT.startCoords.x;
  player.y = FIRST_ACT.startCoords.y;
  buildMaps(MAPS);
  boot('Your journey begins at home. Speak with your family, then take the mat at the south wall out to the road.');
}

function continueGame(){
  if(loadGame()) boot('Your journey continues.');
  else newGame();
}

$('continueBtn').disabled = !hasSave();
$('titleScreen').classList.add('show');
$('newGameBtn').onclick = () => { initAudio(); $('titleScreen').classList.remove('show'); newGame(); };
$('continueBtn').onclick = () => { initAudio(); $('titleScreen').classList.remove('show'); continueGame(); };

$('muteBtn').textContent = isMuted() ? '🔇' : '🔊';
$('muteBtn').onclick = () => { $('muteBtn').textContent = toggleMute() ? '🔇' : '🔊'; };
