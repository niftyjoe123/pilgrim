/* Which Kenney RPG Urban Pack character band each figure uses.
   The urban sheet's character region (cols 23-26, all 18 rows) holds 6
   distinct character skins, each in its own 3-row band (band start row =
   skinIndex*3): row+0/1/2 are that skin's down-facing walk-cycle frames.
   No up/left/right poses were found anywhere in the region (confirmed by
   visual inspection — see the item-2 plan), so every figure here is
   down-facing only. NPCs are always stationary, so they just use a single
   frame (bandRow+0); the player animates across bandRow+0/1/2 by step.
   `col` is fixed at 23 (the 4 columns look like redundant/near-identical
   frames, not meaningfully different poses).

   Reused across NPCs since there are only 6 skins for many more figures —
   per-NPC accessories (beard/staff/tophat/dress/light/child, drawn by the
   existing procedural accessory code) still layer on top for distinction. */
const SKIN_COL = 23;
const BAND = i => i * 3;

export const PLAYER_SPRITE = {col: SKIN_COL, bandRow: BAND(0)};

/* family and timorous are deliberately absent: their 'dress' accessory
   reshapes the procedural figure's own leg/hem pixels rather than
   overlaying on top of it (see drawAccessories vs drawFigureBody in
   render.js), so there's no clean way to show a dress on a fixed-art
   sprite. They keep the original procedural figure instead. */
export const NPC_SPRITES = {
  obstinate:   {col: SKIN_COL, bandRow: BAND(2)},
  obst_home:   {col: SKIN_COL, bandRow: BAND(2)},
  pliable:     {col: SKIN_COL, bandRow: BAND(1)},
  child:       {col: SKIN_COL, bandRow: BAND(1)},
  evangelist:  {col: SKIN_COL, bandRow: BAND(4)},
  help:        {col: SKIN_COL, bandRow: BAND(3)},
  worldly:     {col: SKIN_COL, bandRow: BAND(5)},
  wary:        {col: SKIN_COL, bandRow: BAND(2)},
  sagacity:    {col: SKIN_COL, bandRow: BAND(4)},
  interpreter: {col: SKIN_COL, bandRow: BAND(4)},
};
