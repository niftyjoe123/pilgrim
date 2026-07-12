export const id = 'act1';
export const title = 'Act I: The City of Destruction';

export const startMap = 'home';
export const startCoords = {x:6, y:5};

export const maps = ['world', 'home', 'obst', 'timorous', 'sagacity', 'interp'];

export const mapNames = {
  world:'', home:"Christian's House", obst:"Obstinate's House",
  timorous:"Mrs. Timorous's Cottage", sagacity:"Old Sagacity's Cottage",
  interp:"The House of the Interpreter"
};

export const flags = {
  metEvangelist:false, obstinateGone:false, sinaiDone:false, gateOpen:false,
  roomsSeen:0, interpreterDone:false, crossDone:false, helpMet:false, act1Ended:false,
  room1:false, room2:false, room3:false, room4:false
};

// Replays this act's one LIVE-tile mutation (the gate) after a save is
// loaded, since buildMaps() always rebuilds LIVE from the pristine MAPS.
export function reapplyWorld(S, LIVE){
  if(S.flags.gateOpen) LIVE.world[11][50] = '=';
}

export function objective(S){
  const f = S.flags;
  if(f.act1Ended) return "Act I complete — wander freely, or begin again.";
  if(!f.metEvangelist) return "The Burden grows heavy. Leave your house and seek counsel in the fields east of the city.";
  if(!f.gateOpen) return "Reach the Wicket Gate in the great wall, far to the east. Beware the swamp.";
  if(!f.interpreterDone) return "Enter the Interpreter's House north of the road, and look at its living pictures.";
  if(S.burden) return "Climb the walled way east, to the place of Deliverance.";
  return "Follow the road east to the end of Act I.";
}
