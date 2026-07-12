import {player, setCur, buildMaps} from './engine/state.js';
import {MAPS, FIRST_ACT} from '../data/index.js';
import {renderStatus} from './engine/ui.js';
import {toast} from './engine/dom.js';
import {initInput} from './engine/input.js';
import {initRender} from './engine/render.js';

setCur(FIRST_ACT.startMap);
player.x = FIRST_ACT.startCoords.x;
player.y = FIRST_ACT.startCoords.y;
buildMaps(MAPS);

initInput();
initRender();
renderStatus();
toast('Your journey begins at home. Speak with your family, then take the mat at the south wall out to the road.');
