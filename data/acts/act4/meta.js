export const id = 'act4';
export const title = 'Act IV: Vanity Fair and Doubting Castle';

export const startMap = 'fairroad';
export const startCoords = {x:2, y:6};

export const maps = ['fairroad', 'castle'];

export const mapNames = {
  fairroad: '', castle: 'Doubting Castle'
};

export const flags = {
  metTalkative:false, warnedFair:false, vanityFairDone:false,
  metByends:false, castleEscaped:false, act4Ended:false
};

export function objective(S){
  const f = S.flags;
  if(f.act4Ended) return "Act IV complete — wander freely, or begin again.";
  if(!f.vanityFairDone) return "The road leads through Vanity Fair. Hold to the truth, whatever the cost.";
  return "The road forks ahead — the plain way, or the inviting meadow. Follow it on toward the Delectable Mountains.";
}
