export const id = 'act5';
export const title = 'Act V: The Delectable Mountains to the Celestial City';

export const startMap = 'mountains';
export const startCoords = {x:2, y:5};

// Walkable story-region tiles (merged into data/index.js's TRIGGERS):
// entering the region opens its dialogue until the flag is set by the
// dialogue's own choices — the place itself is the encounter, no person
// standing in for it.
export const triggers = {
  n: {flag:'metEnchanted', dlg:'enchanted_ground'},
  B: {flag:'metBeulah',    dlg:'beulah'},
  W: {flag:'riverCrossed', dlg:'river_edge'}
};

export const maps = ['mountains', 'celestial'];

export const mapNames = {
  mountains: '', celestial: 'The Celestial City'
};

export const flags = {
  metShepherds:false, metIgnorance:false, flatteredAndFreed:false, metAtheist:false,
  metEnchanted:false, metBeulah:false, riverCrossed:false, act5Ended:false
};

export function objective(S){
  const f = S.flags;
  if(f.act5Ended) return "Your journey is complete — wander freely, or begin again.";
  if(!f.riverCrossed) return "Cross the Delectable Mountains, the Enchanted Ground, and Beulah Land, to the River of Death.";
  return "Enter the Celestial City.";
}
