export const id = 'act3';
export const title = 'Act III: The Valley of Humiliation';

export const startMap = 'valley';
export const startCoords = {x:2, y:4};

export const maps = ['valley'];

export const mapNames = {
  valley: ''
};

export const flags = {
  metShepherd:false, apollyonMet:false, apollyonDefeated:false,
  apollyonStandFirmBonus:false, apollyonCryOutBonus:false,
  metFaithful:false, act3Ended:false
};

export function objective(S){
  const f = S.flags;
  if(f.act3Ended) return "Act III complete — wander freely, or begin again.";
  if(f.apollyonMet && !f.apollyonDefeated) return "Stand your ground — there is no way around Apollyon.";
  if(!f.apollyonDefeated) return "Descend into the Valley of Humiliation. Something blocks the way ahead.";
  if(!f.metFaithful) return "Press on through the Valley of the Shadow of Death.";
  return "Follow the road on, toward what lies beyond.";
}
