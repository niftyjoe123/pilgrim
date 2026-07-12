/* Loads the real Kenney spritesheets and exposes a tiny draw helper.
   The only module that touches `new Image()` / raw sheet pixel math —
   render.js should always go through drawSprite(), never reach into
   SHEETS directly. CC0, see assets/CREDITS.md. */

function sheet(src, pitch, tile){
  const s = {img: new Image(), pitch, tile, loaded: false};
  s.img.onload = () => { s.loaded = true; };
  s.img.src = src;
  return s;
}

export const SHEETS = {
  roguelike: sheet('../assets/sprites/kenney_roguelike-rpg-pack/Spritesheet/roguelikeSheet_transparent.png', 17, 16),
  urban:     sheet('../assets/sprites/kenney_rpg-urban-pack/Tilemap/tilemap_packed.png', 16, 16),
};

export function ready(){
  return SHEETS.roguelike.loaded && SHEETS.urban.loaded;
}

/* col/row are grid indices into the sheet (0-based); dx/dy/size are
   destination canvas pixels — draws the 16x16 source tile scaled to size. */
export function drawSprite(ctx, sheetName, col, row, dx, dy, size){
  const s = SHEETS[sheetName];
  if(!s.loaded) return;
  ctx.drawImage(s.img, col*s.pitch, row*s.pitch, s.tile, s.tile, dx, dy, size, size);
}
