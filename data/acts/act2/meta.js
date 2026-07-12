export const id = 'act2';
export const title = 'Act II: The Hill Difficulty';

export const startMap = 'hillworld';
export const startCoords = {x:9, y:41};

export const maps = ['hillworld', 'palace'];

export const mapNames = {
  hillworld: '', palace: 'The Palace Beautiful'
};

export const flags = {
  scrollLost:false, palaceReached:false, armorGiven:false,
  room5:false, room6:false, act2Ended:false
};

export function objective(S){
  const f = S.flags;
  if(f.act2Ended) return "Act II complete — wander freely, or begin again.";
  if(f.scrollLost) return "You cannot find your scroll! Retrace your steps to the arbor where you rested.";
  if(!f.palaceReached) return "Climb the Hill Difficulty. Keep to the center of the path when the lions appear.";
  if(!f.armorGiven) return "You are welcome at the Palace Beautiful — see what the household has to show you.";
  return "Take the road on, toward the Valley of Humiliation.";
}
