import {$} from './dom.js';
import {LIVE, S, player, cur, trail} from './state.js';
import {NPCS, ITEMS} from '../../data/index.js';
import {BASE_PAL, SPR} from '../sprites.js';
import {stepNow} from './input.js';

const cv=$("cv"), ctx=cv.getContext("2d");
const mm=$("minimap"), mctx=mm.getContext("2d");
let TILE=40, VW=0, VH=0;

function mapW(){ return LIVE[cur][0].length; }
function mapH(){ return LIVE[cur].length; }

function resize(){
  const w=$("gameWrap").clientWidth;
  const h=Math.min(Math.round(w*0.68), Math.round(innerHeight*0.62));
  const dpr=Math.min(devicePixelRatio||1, 2);
  cv.width=Math.round(w*dpr); cv.height=Math.round(h*dpr);
  cv.style.height=h+"px";
  ctx.setTransform(dpr,0,0,dpr,0,0);
  TILE = w<520? 42:48;
  VW=w; VH=h;
  ctx.imageSmoothingEnabled=false;
}

function n2(x,y,m){ return ((x*73856093 ^ y*19349663)>>>0)%m; } // deterministic noise

function drawShadow(cx,cy,r){
  ctx.fillStyle='rgba(0,0,0,.22)';
  ctx.beginPath(); ctx.ellipse(cx,cy,r,r*0.4,0,0,7); ctx.fill();
}

/* draws one 12x16 figure with palette overrides + accessories */
function drawFigure(rows, ox, oy, u, pal, acc){
  const P = Object.assign({}, BASE_PAL, pal||{});
  const a = acc||[];
  const dress = a.includes('dress');
  for(let r=0;r<16;r++){
    const row=rows[r];
    for(let c=0;c<12;c++){
      let ch=row[c];
      if(ch==='.'){ if(!(dress && r>=11 && c>=3 && c<=8)) continue; ch='T'; }
      if(dress && r>=11 && (ch==='P'||ch==='B')) ch='T';
      ctx.fillStyle=P[ch]||P.T;
      ctx.fillRect(ox+c*u, oy+r*u, u+0.5, u+0.5);
    }
  }
  if(dress){ ctx.fillStyle=P.T; ctx.fillRect(ox+2.5*u, oy+12*u, 7*u, 3.6*u); }
  if(a.includes('beard')){
    ctx.fillStyle=P.H;
    ctx.fillRect(ox+3*u, oy+4*u, 6*u, 1.4*u);
    ctx.fillRect(ox+4*u, oy+5*u, 4*u, 0.8*u);
  }
  if(a.includes('tophat')){
    ctx.fillStyle='#14141a';
    ctx.fillRect(ox+2.4*u, oy-0.4*u, 7.2*u, 1*u);
    ctx.fillRect(ox+3.4*u, oy-3.2*u, 5.2*u, 3*u);
  }
  if(a.includes('staff')){
    ctx.fillStyle='#6e5638';
    ctx.fillRect(ox+10.6*u, oy+3.5*u, 1*u, 11.5*u);
    ctx.fillStyle='#8a6b45';
    ctx.beginPath(); ctx.arc(ox+11.1*u, oy+3.2*u, 0.9*u, 0, 7); ctx.fill();
  }
  if(a.includes('light')){
    const g=0.6+0.4*Math.sin(performance.now()/300);
    ctx.globalAlpha=0.35*g;
    ctx.fillStyle='#ffd75e';
    ctx.beginPath(); ctx.arc(ox+0.4*u, oy+7*u, 2.6*u, 0, 7); ctx.fill();
    ctx.globalAlpha=1;
    ctx.fillStyle='#ffd75e';
    ctx.fillRect(ox-0.2*u, oy+6.4*u, 1.2*u, 1.2*u);
  }
}

/* a monster figure, drawn in the same 12x16-unit box a humanoid figure
   would occupy, for NPCs with monster:'dragon' instead of a palette-swapped
   human (Apollyon) — wings, horns, glowing eyes, a little scary is fine. */
function drawDragon(ox, oy, u){
  const cx=ox+6*u, cy=oy+9*u;
  ctx.fillStyle='#3a0a0a';
  ctx.beginPath();
  ctx.moveTo(cx-1*u,cy-2*u); ctx.lineTo(cx-7*u,cy-6*u); ctx.lineTo(cx-6*u,cy-1*u); ctx.lineTo(cx-8*u,cy+2*u); ctx.lineTo(cx-2*u,cy+1*u);
  ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx+1*u,cy-2*u); ctx.lineTo(cx+7*u,cy-6*u); ctx.lineTo(cx+6*u,cy-1*u); ctx.lineTo(cx+8*u,cy+2*u); ctx.lineTo(cx+2*u,cy+1*u);
  ctx.closePath(); ctx.fill();
  ctx.strokeStyle='#5a1515'; ctx.lineWidth=u*0.15;
  ctx.beginPath(); ctx.moveTo(cx-1*u,cy-2*u); ctx.lineTo(cx-6*u,cy-1*u); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+1*u,cy-2*u); ctx.lineTo(cx+6*u,cy-1*u); ctx.stroke();

  ctx.strokeStyle='#5a1515'; ctx.lineWidth=u*1.1; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(cx,cy+4*u); ctx.quadraticCurveTo(cx+3*u,cy+6*u,cx+2*u,cy+8.5*u); ctx.stroke();

  ctx.fillStyle='#2b0808';
  ctx.fillRect(cx-3*u,cy+3.5*u,1.6*u,3*u);
  ctx.fillRect(cx+1.4*u,cy+3.5*u,1.6*u,3*u);

  ctx.fillStyle='#7a1515';
  ctx.beginPath(); ctx.ellipse(cx,cy,3*u,4*u,0,0,7); ctx.fill();
  ctx.fillStyle='#9c2f2f';
  ctx.beginPath(); ctx.ellipse(cx,cy+1*u,1.6*u,2.6*u,0,0,7); ctx.fill();

  const headCy=cy-4.5*u;
  ctx.fillStyle='#8c1c1c';
  ctx.beginPath(); ctx.ellipse(cx,headCy,2.4*u,2*u,0,0,7); ctx.fill();
  ctx.fillStyle='#2b0808';
  ctx.beginPath(); ctx.moveTo(cx-1.6*u,headCy-1.6*u); ctx.lineTo(cx-2.6*u,headCy-3.4*u); ctx.lineTo(cx-1*u,headCy-1.8*u); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(cx+1.6*u,headCy-1.6*u); ctx.lineTo(cx+2.6*u,headCy-3.4*u); ctx.lineTo(cx+1*u,headCy-1.8*u); ctx.closePath(); ctx.fill();
  ctx.fillStyle='#6e1414';
  ctx.beginPath(); ctx.ellipse(cx,headCy+1.6*u,1.3*u,0.9*u,0,0,7); ctx.fill();
  ctx.fillStyle='#1a0505';
  ctx.beginPath(); ctx.ellipse(cx,headCy+1.9*u,1*u,0.5*u,0,0,7); ctx.fill();
  ctx.fillStyle='#e8e2d0';
  ctx.beginPath(); ctx.moveTo(cx-0.7*u,headCy+1.6*u); ctx.lineTo(cx-0.4*u,headCy+2.2*u); ctx.lineTo(cx-0.1*u,headCy+1.6*u); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(cx+0.7*u,headCy+1.6*u); ctx.lineTo(cx+0.4*u,headCy+2.2*u); ctx.lineTo(cx+0.1*u,headCy+1.6*u); ctx.closePath(); ctx.fill();
  const glow=0.6+0.4*Math.sin(performance.now()/260);
  ctx.globalAlpha=glow; ctx.fillStyle='#ffcf3a';
  ctx.beginPath(); ctx.arc(cx-0.9*u,headCy-0.3*u,0.35*u,0,7); ctx.fill();
  ctx.beginPath(); ctx.arc(cx+0.9*u,headCy-0.3*u,0.35*u,0,7); ctx.fill();
  ctx.globalAlpha=1;
}

/* NPC render: big figures, optional per-NPC scale (e.g. 0.68 for children) */
function drawNPC(n, px, py){
  const u=(TILE/10)*(n.scale||1), h=16*u;
  const ox=px+(TILE-12*u)/2, oy=py+TILE-h+u*0.5;
  drawShadow(px+TILE/2, py+TILE-2, TILE*0.36*(n.scale||1));
  if(n.monster==='dragon') drawDragon(ox, oy, u);
  else drawFigure(SPR.down[0], ox, oy, u, n.pal, n.acc);
  if((n.acc||[]).includes('child')){
    const cu=u*0.62, ch=16*cu;
    drawFigure(SPR.down[0], ox+11*u, py+TILE-ch+cu*0.5, cu, {H:'#6e4a22', T:'#7a8c5b', U:'#69794d', P:'#4a3b2a'}, []);
  }
}

function drawPlayer(px,py){
  const u = TILE/10;
  const h = 16*u;
  const ox = px+(TILE-12*u)/2, oy = py + TILE - h + u*0.5;
  const moving = performance.now() - player.moveT < 220;
  const frame = moving ? player.step % 2 : 0;
  const rows = SPR[player.face][frame];

  drawShadow(px+TILE/2, py+TILE-2, TILE*0.36);

  const packC='#6e5638', packS='#4a3a24';
  if(S.burden && (player.face==='left'||player.face==='right')){
    const side = player.face==='right' ? ox+0.4*u : ox+7.4*u;
    ctx.fillStyle=packC; ctx.fillRect(side, oy+5.6*u, 4.2*u, 5.4*u);
    ctx.strokeStyle=packS; ctx.strokeRect(side, oy+5.6*u, 4.2*u, 5.4*u);
  }

  drawFigure(rows, ox, oy, u, null, []);

  if(S.burden && player.face==='up'){
    ctx.fillStyle=packC; ctx.fillRect(ox+2.4*u, oy+5.8*u, 7.2*u, 5.2*u);
    ctx.strokeStyle=packS; ctx.strokeRect(ox+2.4*u, oy+5.8*u, 7.2*u, 5.2*u);
    ctx.fillStyle=packS; ctx.fillRect(ox+3.4*u, oy+6.8*u, 5.2*u, u*0.8);
  }
  if(S.burden && player.face==='down'){
    ctx.fillStyle=packS;
    ctx.fillRect(ox+3.6*u, oy+5.5*u, u*0.8, 5*u);
    ctx.fillRect(ox+7.6*u, oy+5.5*u, u*0.8, 5*u);
  }
  if(!S.burden){
    drawStar(ox+11*u, oy+1.2*u, u*1.1, 0.7+0.3*Math.sin(performance.now()/350));
  }

  if(S.items.some(i=>i.name==='Armor of God')){
    // helmet
    ctx.fillStyle='#9aa3a8'; ctx.fillRect(ox+3*u, oy+0.1*u, 6*u, 2*u);
    ctx.fillStyle='#7d8890'; ctx.fillRect(ox+3*u, oy+1.5*u, 6*u, 0.6*u);
    // breastplate
    ctx.fillStyle='#8b96a0'; ctx.fillRect(ox+3.2*u, oy+6*u, 5.6*u, 4*u);
    ctx.strokeStyle='#5c6870'; ctx.lineWidth=0.3*u;
    ctx.beginPath(); ctx.moveTo(ox+6*u, oy+6*u); ctx.lineTo(ox+6*u, oy+10*u); ctx.stroke();
    // shield, on whichever side faces outward
    if(player.face!=='up'){
      const shieldX = player.face==='left' ? ox-0.6*u : ox+9.6*u;
      ctx.fillStyle='#b8860b';
      ctx.beginPath(); ctx.ellipse(shieldX+1*u, oy+7*u, 1.3*u, 1.8*u, 0, 0, 7); ctx.fill();
      ctx.strokeStyle='#7a5c05'; ctx.lineWidth=0.25*u; ctx.stroke();
      ctx.fillStyle='#d4a017'; ctx.beginPath(); ctx.arc(shieldX+1*u, oy+7*u, 0.4*u, 0, 7); ctx.fill();
    }
  }
}

/* drawn 4-point star */
function drawStar(cx,cy,r,alpha){
  ctx.globalAlpha=alpha;
  ctx.fillStyle='#ffd75e';
  ctx.beginPath();
  ctx.moveTo(cx,cy-r); ctx.lineTo(cx+r*0.28,cy-r*0.28); ctx.lineTo(cx+r,cy);
  ctx.lineTo(cx+r*0.28,cy+r*0.28); ctx.lineTo(cx,cy+r); ctx.lineTo(cx-r*0.28,cy+r*0.28);
  ctx.lineTo(cx-r,cy); ctx.lineTo(cx-r*0.28,cy-r*0.28); ctx.closePath(); ctx.fill();
  ctx.globalAlpha=1;
}

/* drawn item icons — scrolls glow so they can't be missed */
function drawItemIcon(icon, px, py, bob){
  const cx=px+TILE/2, cy=py+TILE/2+bob;
  drawShadow(px+TILE/2, py+TILE-4, TILE*0.22);
  if(icon==='scroll'){
    const pulse=0.5+0.5*Math.sin(performance.now()/350);
    ctx.globalAlpha=0.18+0.16*pulse;
    ctx.fillStyle='#ffd75e';
    ctx.beginPath(); ctx.arc(cx, cy, TILE*0.46, 0, 7); ctx.fill();
    ctx.globalAlpha=0.3+0.2*pulse;
    ctx.beginPath(); ctx.arc(cx, cy, TILE*0.3, 0, 7); ctx.fill();
    ctx.globalAlpha=1;
    const w=TILE*0.62, h=TILE*0.36;
    ctx.fillStyle='#f5ecd7'; ctx.fillRect(cx-w/2, cy-h/2, w, h);
    ctx.strokeStyle='#b8860b'; ctx.lineWidth=2; ctx.strokeRect(cx-w/2, cy-h/2, w, h);
    ctx.fillStyle='#d9c9a3';
    ctx.beginPath(); ctx.arc(cx-w/2, cy, h/2, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.arc(cx+w/2, cy, h/2, 0, 7); ctx.fill();
    ctx.strokeStyle='#8a6b45'; ctx.lineWidth=1.2;
    ctx.beginPath(); ctx.moveTo(cx-w*0.25, cy-3); ctx.lineTo(cx+w*0.25, cy-3); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx-w*0.25, cy+2); ctx.lineTo(cx+w*0.2, cy+2); ctx.stroke();
    drawStar(cx, cy-TILE*0.42+bob*0.5, TILE*0.12, 0.5+0.5*pulse);
  } else if(icon==='key'){
    const pulse=0.5+0.5*Math.sin(performance.now()/500);
    ctx.globalAlpha=0.12+0.1*pulse;
    ctx.fillStyle='#ffd75e';
    ctx.beginPath(); ctx.arc(cx, cy, TILE*0.36, 0, 7); ctx.fill();
    ctx.globalAlpha=1;
    ctx.strokeStyle='#d4a017'; ctx.lineWidth=3;
    ctx.beginPath(); ctx.arc(cx-TILE*0.12, cy, TILE*0.11, 0, 7); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx-TILE*0.02, cy); ctx.lineTo(cx+TILE*0.22, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx+TILE*0.14, cy); ctx.lineTo(cx+TILE*0.14, cy+TILE*0.09);
    ctx.moveTo(cx+TILE*0.21, cy); ctx.lineTo(cx+TILE*0.21, cy+TILE*0.11); ctx.stroke();
  }
}

/* drawn flames */
function drawFlames(px,py,scale,baseY){
  const t=performance.now()/120;
  const s=scale||1, by=baseY===undefined? py+TILE*0.85 : baseY;
  for(let i=0;i<3;i++){
    const fx=px+TILE*(0.25+i*0.25)*s, fh=TILE*s*(0.35+0.15*Math.abs(Math.sin(t+i*1.7)));
    ctx.fillStyle= i===1? '#e85d1a':'#c74a10';
    ctx.beginPath();
    ctx.moveTo(fx-TILE*0.1*s, by);
    ctx.quadraticCurveTo(fx-TILE*0.06*s, by-fh*0.6, fx, by-fh);
    ctx.quadraticCurveTo(fx+TILE*0.06*s, by-fh*0.6, fx+TILE*0.1*s, by);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle='#ffd75e';
    ctx.beginPath(); ctx.arc(fx, by-TILE*0.07*s, TILE*0.05*s, 0, 7); ctx.fill();
  }
}

const EXHIBIT_COLORS = {1:'#9aa3a8', 2:'#c74a10', 3:'#5b6e8c', 4:'#3a3a42', 5:'#7a5c3a', 6:'#8b6b2a'};

function drawTile(t,x,y,px,py){
  switch(t){
    case '.': {
      ctx.fillStyle = n2(x,y,5)===0? '#3f6b34':'#456f38';
      ctx.fillRect(px,py,TILE,TILE);
      if(n2(x,y,7)===1){ ctx.fillStyle='#557d42'; ctx.fillRect(px+TILE*0.3,py+TILE*0.55,3,3); ctx.fillRect(px+TILE*0.65,py+TILE*0.3,3,3);}
      if(n2(x,y,23)===2){ ctx.fillStyle='#d8c25e'; ctx.fillRect(px+TILE*0.45,py+TILE*0.45,4,4); ctx.fillStyle='#e8e2d0'; ctx.fillRect(px+TILE*0.42,py+TILE*0.42,3,3);}
      break; }
    case '=': {
      ctx.fillStyle='#456f38'; ctx.fillRect(px,py,TILE,TILE);
      ctx.fillStyle='#b59a63'; ctx.fillRect(px,py+2,TILE,TILE-4);
      if(n2(x,y,3)===1){ ctx.fillStyle='#a88c55'; ctx.fillRect(px+TILE*0.4,py+TILE*0.4,4,4); }
      break; }
    case '~': {
      ctx.fillStyle='#31403a'; ctx.fillRect(px,py,TILE,TILE);
      ctx.strokeStyle='rgba(160,190,170,.25)'; ctx.lineWidth=1.5;
      const o=n2(x,y,4)*3 + Math.sin(performance.now()/600 + x + y)*2;
      ctx.beginPath(); ctx.moveTo(px+6,py+TILE*0.4+o); ctx.quadraticCurveTo(px+TILE/2,py+TILE*0.3+o,px+TILE-6,py+TILE*0.4+o); ctx.stroke();
      break; }
    case 'o': {
      ctx.fillStyle='#31403a'; ctx.fillRect(px,py,TILE,TILE);
      ctx.fillStyle='#9aa3a8'; ctx.beginPath(); ctx.ellipse(px+TILE/2,py+TILE/2,TILE*0.32,TILE*0.24,0,0,7); ctx.fill();
      ctx.fillStyle='rgba(255,255,255,.25)'; ctx.beginPath(); ctx.ellipse(px+TILE/2-3,py+TILE/2-3,TILE*0.12,TILE*0.08,0,0,7); ctx.fill();
      break; }
    case '#': {
      ctx.fillStyle='#456f38'; ctx.fillRect(px,py,TILE,TILE);
      ctx.fillStyle='rgba(0,0,0,.15)'; ctx.beginPath(); ctx.ellipse(px+TILE/2,py+TILE*0.8,TILE*0.3,TILE*0.12,0,0,7); ctx.fill();
      ctx.fillStyle='#5a4526'; ctx.fillRect(px+TILE*0.42,py+TILE*0.55,TILE*0.16,TILE*0.3);
      ctx.fillStyle= n2(x,y,2)? '#2e5526':'#356029';
      ctx.beginPath(); ctx.arc(px+TILE/2,py+TILE*0.42,TILE*0.34,0,7); ctx.fill();
      ctx.fillStyle='rgba(255,255,255,.08)';
      ctx.beginPath(); ctx.arc(px+TILE*0.4,py+TILE*0.34,TILE*0.14,0,7); ctx.fill();
      break; }
    case 'r': {
      ctx.fillStyle='#8b4a34'; ctx.fillRect(px,py,TILE,TILE);
      ctx.strokeStyle='#6e3826'; ctx.lineWidth=1;
      for(let i=0;i<3;i++){
        ctx.beginPath(); ctx.moveTo(px,py+TILE*(0.25+i*0.3)); ctx.lineTo(px+TILE,py+TILE*(0.25+i*0.3)); ctx.stroke();
      }
      ctx.strokeStyle='rgba(0,0,0,.15)';
      ctx.beginPath(); ctx.moveTo(px+TILE*0.5, py); ctx.lineTo(px+TILE*0.5, py+TILE); ctx.stroke();
      break; }
    case 'h': {
      ctx.fillStyle='#c9b98f'; ctx.fillRect(px,py,TILE,TILE);
      ctx.strokeStyle='#6e5638'; ctx.lineWidth=2;
      ctx.strokeRect(px+1,py+1,TILE-2,TILE-2);
      ctx.beginPath(); ctx.moveTo(px,py); ctx.lineTo(px+TILE,py+TILE); ctx.stroke();
      if(n2(x,y,3)===0){
        ctx.fillStyle='#f5e8b8'; ctx.fillRect(px+TILE*0.3,py+TILE*0.28,TILE*0.4,TILE*0.4);
        ctx.strokeStyle='#4a3a24'; ctx.lineWidth=1.5; ctx.strokeRect(px+TILE*0.3,py+TILE*0.28,TILE*0.4,TILE*0.4);
        ctx.beginPath(); ctx.moveTo(px+TILE*0.5,py+TILE*0.28); ctx.lineTo(px+TILE*0.5,py+TILE*0.68); ctx.stroke();
      }
      break; }
    case 'D': {
      ctx.fillStyle='#c9b98f'; ctx.fillRect(px,py,TILE,TILE);
      ctx.fillStyle='#5a4022'; ctx.fillRect(px+TILE*0.15,py+TILE*0.1,TILE*0.7,TILE*0.9);
      ctx.strokeStyle='#3a2814'; ctx.lineWidth=2; ctx.strokeRect(px+TILE*0.15,py+TILE*0.1,TILE*0.7,TILE*0.9);
      ctx.fillStyle='#d4a017'; ctx.beginPath(); ctx.arc(px+TILE*0.68,py+TILE*0.55,2.5,0,7); ctx.fill();
      break; }
    case 'w': {
      ctx.fillStyle='#7d7d84'; ctx.fillRect(px,py,TILE,TILE);
      ctx.strokeStyle='#5c5c63'; ctx.lineWidth=1;
      ctx.strokeRect(px+1,py+1,TILE-2,TILE/2-1);
      ctx.strokeRect(px+1,py+TILE/2,TILE/2-1,TILE/2-2);
      ctx.strokeRect(px+TILE/2,py+TILE/2,TILE/2-2,TILE/2-2);
      break; }
    case 'g': {
      ctx.fillStyle='#7d7d84'; ctx.fillRect(px,py,TILE,TILE);
      ctx.fillStyle='#5a4022'; ctx.fillRect(px+4,py+4,TILE-8,TILE-6);
      ctx.strokeStyle='#d4a017'; ctx.lineWidth=2; ctx.strokeRect(px+4,py+4,TILE-8,TILE-6);
      ctx.fillStyle='#d4a017'; ctx.beginPath(); ctx.arc(px+TILE*0.68,py+TILE*0.55,2.5,0,7); ctx.fill();
      break; }
    case 'i': {
      ctx.fillStyle='#d9cba0'; ctx.fillRect(px,py,TILE,TILE);
      ctx.strokeStyle='#968655'; ctx.strokeRect(px+1,py+1,TILE-2,TILE-2);
      if(n2(x,y,4)===0){
        ctx.fillStyle='#f5e8b8'; ctx.fillRect(px+TILE*0.3,py+TILE*0.3,TILE*0.4,TILE*0.36);
        ctx.strokeStyle='#6e5638'; ctx.strokeRect(px+TILE*0.3,py+TILE*0.3,TILE*0.4,TILE*0.36);
      }
      break; }
    case 'I': {
      ctx.fillStyle='#d9cba0'; ctx.fillRect(px,py,TILE,TILE);
      ctx.fillStyle='#5a4022'; ctx.fillRect(px+TILE*0.15,py+TILE*0.1,TILE*0.7,TILE*0.9);
      ctx.strokeStyle='#d4a017'; ctx.lineWidth=2; ctx.strokeRect(px+TILE*0.15,py+TILE*0.1,TILE*0.7,TILE*0.9);
      break; }
    case '^': {
      ctx.fillStyle='#456f38'; ctx.fillRect(px,py,TILE,TILE);
      ctx.fillStyle='#6b4a3a';
      ctx.beginPath(); ctx.moveTo(px+TILE*0.15,py+TILE*0.85); ctx.lineTo(px+TILE*0.5,py+TILE*0.15); ctx.lineTo(px+TILE*0.85,py+TILE*0.85); ctx.closePath(); ctx.fill();
      ctx.fillStyle='#8b2500'; ctx.fillRect(px+TILE*0.42,py+TILE*0.2,TILE*0.16,TILE*0.12);
      break; }
    case 'f': {
      ctx.fillStyle='#456f38'; ctx.fillRect(px,py,TILE,TILE);
      drawFlames(px,py);
      break; }
    case '+': {
      ctx.fillStyle='#b59a63'; ctx.fillRect(px,py,TILE,TILE);
      ctx.fillStyle='#d4a017';
      ctx.fillRect(px+TILE*0.45,py+TILE*0.12,TILE*0.1,TILE*0.6);
      ctx.fillRect(px+TILE*0.28,py+TILE*0.26,TILE*0.44,TILE*0.1);
      break; }
    case 'E': {
      ctx.fillStyle='#b59a63'; ctx.fillRect(px,py,TILE,TILE);
      ctx.fillStyle='#ffd75e';
      ctx.beginPath(); ctx.arc(px+TILE/2, py+TILE*0.75, TILE*0.3, Math.PI, 0); ctx.fill();
      ctx.strokeStyle='#ffd75e'; ctx.lineWidth=2;
      for(let i=0;i<5;i++){
        const a=Math.PI+(i+0.5)*Math.PI/5;
        ctx.beginPath();
        ctx.moveTo(px+TILE/2+Math.cos(a)*TILE*0.36, py+TILE*0.75+Math.sin(a)*TILE*0.36);
        ctx.lineTo(px+TILE/2+Math.cos(a)*TILE*0.46, py+TILE*0.75+Math.sin(a)*TILE*0.46);
        ctx.stroke();
      }
      break; }
    /* ---- interiors ---- */
    case 'm': {
      ctx.fillStyle='#4a3a26'; ctx.fillRect(px,py,TILE,TILE);
      ctx.strokeStyle='#3a2d1c'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(px+TILE*0.33,py); ctx.lineTo(px+TILE*0.33,py+TILE);
      ctx.moveTo(px+TILE*0.66,py); ctx.lineTo(px+TILE*0.66,py+TILE); ctx.stroke();
      break; }
    case 'F': {
      ctx.fillStyle=(x+y)%2? '#a8845a':'#b08c60';
      ctx.fillRect(px,py,TILE,TILE);
      ctx.strokeStyle='rgba(74,58,38,.4)'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(px,py+TILE*0.5); ctx.lineTo(px+TILE,py+TILE*0.5); ctx.stroke();
      break; }
    case 'R': { // woven rug (walkable)
      ctx.fillStyle=(x+y)%2? '#a8845a':'#b08c60'; ctx.fillRect(px,py,TILE,TILE);
      ctx.fillStyle='#8b3a3a'; ctx.fillRect(px+2,py+2,TILE-4,TILE-4);
      ctx.strokeStyle='#d4a017'; ctx.lineWidth=1.5; ctx.strokeRect(px+4,py+4,TILE-8,TILE-8);
      if((x+y)%2){ ctx.fillStyle='#a85050'; ctx.fillRect(px+TILE*0.35,py+TILE*0.35,TILE*0.3,TILE*0.3); }
      break; }
    case 'b': {
      ctx.fillStyle='#a8845a'; ctx.fillRect(px,py,TILE,TILE);
      ctx.fillStyle='#5a4022'; ctx.fillRect(px+2,py+2,TILE-4,TILE-4);
      ctx.fillStyle='#6b8cae'; ctx.fillRect(px+4,py+TILE*0.3,TILE-8,TILE*0.62);
      ctx.fillStyle='#e8e2d0'; ctx.fillRect(px+4,py+4,TILE-8,TILE*0.22);
      break; }
    case 't': {
      ctx.fillStyle='#a8845a'; ctx.fillRect(px,py,TILE,TILE);
      ctx.fillStyle='#6e5638'; ctx.fillRect(px+3,py+3,TILE-6,TILE-6);
      ctx.strokeStyle='#4a3a24'; ctx.strokeRect(px+3,py+3,TILE-6,TILE-6);
      ctx.fillStyle='#8a6b45'; ctx.fillRect(px+6,py+6,TILE-12,TILE-12);
      break; }
    case 'c': { // chair
      ctx.fillStyle='#a8845a'; ctx.fillRect(px,py,TILE,TILE);
      ctx.fillStyle='#6e5638'; ctx.fillRect(px+TILE*0.22,py+TILE*0.3,TILE*0.56,TILE*0.5);
      ctx.fillRect(px+TILE*0.22,py+TILE*0.1,TILE*0.12,TILE*0.7);
      ctx.strokeStyle='#4a3a24'; ctx.strokeRect(px+TILE*0.22,py+TILE*0.3,TILE*0.56,TILE*0.5);
      break; }
    case 'k': { // bookshelf
      ctx.fillStyle='#5a4530'; ctx.fillRect(px,py,TILE,TILE);
      ctx.strokeStyle='#3a2d1c'; ctx.lineWidth=2; ctx.strokeRect(px+1,py+1,TILE-2,TILE-2);
      const cols=['#8b3a3a','#3d6b35','#5b6e8c','#b8860b','#7a4c68'];
      for(let s=0;s<2;s++){
        for(let b=0;b<4;b++){
          ctx.fillStyle=cols[n2(x+b,y+s,5)];
          ctx.fillRect(px+4+b*(TILE-10)/4, py+5+s*(TILE/2-3), (TILE-12)/4, TILE*0.32);
        }
        ctx.fillStyle='#3a2d1c'; ctx.fillRect(px+2, py+TILE*0.46+s*(TILE/2-4), TILE-4, 2);
      }
      break; }
    case 'p': { // potted plant
      ctx.fillStyle=(x+y)%2? '#a8845a':'#b08c60'; ctx.fillRect(px,py,TILE,TILE);
      ctx.fillStyle='#8b4a34'; ctx.fillRect(px+TILE*0.3,py+TILE*0.55,TILE*0.4,TILE*0.3);
      ctx.fillStyle='#3d6b35';
      ctx.beginPath(); ctx.arc(px+TILE*0.5,py+TILE*0.38,TILE*0.24,0,7); ctx.fill();
      ctx.fillStyle='#5b8c4a';
      ctx.beginPath(); ctx.arc(px+TILE*0.38,py+TILE*0.3,TILE*0.12,0,7); ctx.fill();
      ctx.beginPath(); ctx.arc(px+TILE*0.62,py+TILE*0.3,TILE*0.12,0,7); ctx.fill();
      break; }
    case 'Q': { // fireplace
      ctx.fillStyle='#6e6e74'; ctx.fillRect(px,py,TILE,TILE);
      ctx.strokeStyle='#4c4c52'; ctx.lineWidth=1;
      ctx.strokeRect(px+2,py+2,TILE/2-3,TILE/3-2);
      ctx.strokeRect(px+TILE/2+1,py+2,TILE/2-3,TILE/3-2);
      ctx.fillStyle='#1e1610'; ctx.fillRect(px+TILE*0.18,py+TILE*0.35,TILE*0.64,TILE*0.55);
      drawFlames(px+TILE*0.18, py, 0.6, py+TILE*0.82);
      break; }
    case 'X': {
      ctx.fillStyle='#a8845a'; ctx.fillRect(px,py,TILE,TILE);
      ctx.fillStyle='#6e5638'; ctx.fillRect(px+4,py+4,TILE-8,TILE-8);
      ctx.fillStyle='#d4a017';
      ctx.beginPath();
      ctx.moveTo(px+TILE*0.5,py+TILE*0.7); ctx.lineTo(px+TILE*0.3,py+TILE*0.45); ctx.lineTo(px+TILE*0.7,py+TILE*0.45);
      ctx.closePath(); ctx.fill();
      break; }
    case '1': case '2': case '3': case '4': case '5': case '6': {
      ctx.fillStyle='#4a3a26'; ctx.fillRect(px,py,TILE,TILE);
      const seen=S.flags['room'+t];
      ctx.fillStyle='#d4a017'; ctx.fillRect(px+TILE*0.12,py+TILE*0.08,TILE*0.76,TILE*0.84);
      ctx.fillStyle=EXHIBIT_COLORS[t]; ctx.fillRect(px+TILE*0.2,py+TILE*0.16,TILE*0.6,TILE*0.68);
      if(!seen){
        drawStar(px+TILE*0.5, py+TILE*0.5, TILE*0.12, 0.5+0.5*Math.sin(performance.now()/400+ +t));
      }
      break; }
    case 'A': { // arbor bench — a resting spot part-way up the hill
      ctx.fillStyle='#456f38'; ctx.fillRect(px,py,TILE,TILE);
      ctx.fillStyle='#2e5526';
      ctx.beginPath(); ctx.arc(px+TILE*0.5,py+TILE*0.32,TILE*0.42,0,7); ctx.fill();
      ctx.fillStyle='#6e5638'; ctx.fillRect(px+TILE*0.22,py+TILE*0.55,TILE*0.56,TILE*0.14);
      ctx.fillStyle='#4a3a24';
      ctx.fillRect(px+TILE*0.26,py+TILE*0.69,TILE*0.08,TILE*0.22);
      ctx.fillRect(px+TILE*0.66,py+TILE*0.69,TILE*0.08,TILE*0.22);
      break; }
    case 'L': { // chained lion — trial of faith, roars but does no harm on the true path
      ctx.fillStyle='#456f38'; ctx.fillRect(px,py,TILE,TILE);
      const lcx=px+TILE*0.52, lcy=py+TILE*0.62;
      const hcx=lcx-TILE*0.13, hcy=lcy-TILE*0.16;
      // tail with tuft
      ctx.strokeStyle='#a87830'; ctx.lineWidth=TILE*0.04; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(lcx+TILE*0.22,lcy); ctx.quadraticCurveTo(lcx+TILE*0.38,lcy-TILE*0.05,lcx+TILE*0.4,lcy-TILE*0.2); ctx.stroke();
      ctx.fillStyle='#5a3a1a'; ctx.beginPath(); ctx.arc(lcx+TILE*0.4,lcy-TILE*0.2,TILE*0.035,0,7); ctx.fill();
      // legs
      ctx.fillStyle='#a87830';
      ctx.fillRect(lcx-TILE*0.2,lcy+TILE*0.08,TILE*0.07,TILE*0.12);
      ctx.fillRect(lcx+TILE*0.12,lcy+TILE*0.08,TILE*0.07,TILE*0.12);
      // body
      ctx.fillStyle='#c9973f';
      ctx.beginPath(); ctx.ellipse(lcx,lcy,TILE*0.24,TILE*0.15,0,0,7); ctx.fill();
      // mane — radial spikes so it reads as a mane, not a second circle
      ctx.fillStyle='#8b6b2a';
      for(let i=0;i<10;i++){
        const a=(i/10)*Math.PI*2;
        ctx.beginPath(); ctx.arc(hcx+Math.cos(a)*TILE*0.17, hcy+Math.sin(a)*TILE*0.17, TILE*0.065,0,7); ctx.fill();
      }
      // head + snout
      ctx.fillStyle='#d9a94a';
      ctx.beginPath(); ctx.arc(hcx,hcy,TILE*0.13,0,7); ctx.fill();
      ctx.fillStyle='#e8c98a';
      ctx.beginPath(); ctx.ellipse(hcx,hcy+TILE*0.06,TILE*0.075,TILE*0.055,0,0,7); ctx.fill();
      // eyes + nose
      ctx.fillStyle='#2b2115';
      ctx.fillRect(hcx-TILE*0.065,hcy-TILE*0.03,TILE*0.032,TILE*0.032);
      ctx.fillRect(hcx+TILE*0.03,hcy-TILE*0.03,TILE*0.032,TILE*0.032);
      ctx.fillStyle='#3a2a1a';
      ctx.beginPath(); ctx.moveTo(hcx-TILE*0.02,hcy+TILE*0.045); ctx.lineTo(hcx+TILE*0.02,hcy+TILE*0.045); ctx.lineTo(hcx,hcy+TILE*0.075); ctx.closePath(); ctx.fill();
      break; }
    case '!': { // hidden pit — a near-miss scare on the road to Destruction
      ctx.fillStyle='#456f38'; ctx.fillRect(px,py,TILE,TILE);
      ctx.fillStyle='#1a140e';
      ctx.beginPath(); ctx.ellipse(px+TILE*0.5,py+TILE*0.55,TILE*0.34,TILE*0.22,0,0,7); ctx.fill();
      ctx.strokeStyle='#0a0806'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.ellipse(px+TILE*0.5,py+TILE*0.55,TILE*0.34,TILE*0.22,0,0,7); ctx.stroke();
      break; }
    case 'q': { // a dangerous quag, in the dark of the Valley of the Shadow of Death
      ctx.fillStyle='#1c2420'; ctx.fillRect(px,py,TILE,TILE);
      ctx.fillStyle='#2e3a30';
      ctx.beginPath(); ctx.ellipse(px+TILE*0.5,py+TILE*0.58,TILE*0.36,TILE*0.24,0,0,7); ctx.fill();
      ctx.strokeStyle='rgba(140,160,140,.2)'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(px+TILE*0.3,py+TILE*0.55); ctx.quadraticCurveTo(px+TILE*0.5,py+TILE*0.45,px+TILE*0.7,py+TILE*0.55); ctx.stroke();
      break; }
    case 'j': { // the deep ditch beside the path
      ctx.fillStyle='#1c2420'; ctx.fillRect(px,py,TILE,TILE);
      ctx.fillStyle='#0a0d0a';
      ctx.beginPath(); ctx.ellipse(px+TILE*0.5,py+TILE*0.55,TILE*0.36,TILE*0.24,0,0,7); ctx.fill();
      ctx.strokeStyle='#050705'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.ellipse(px+TILE*0.5,py+TILE*0.55,TILE*0.36,TILE*0.24,0,0,7); ctx.stroke();
      break; }
    case 'N': { // the Valley of the Shadow of Death — the same ground, gone dark
      ctx.fillStyle = n2(x,y,5)===0? '#1c2420':'#212b24';
      ctx.fillRect(px,py,TILE,TILE);
      if(n2(x,y,11)===0){ ctx.fillStyle='rgba(140,160,140,.12)'; ctx.fillRect(px+TILE*0.35,py+TILE*0.4,2,2); }
      break; }
    case 'V': { // Vanity Fair's market ground — bright and festive, unlike the plain road
      ctx.fillStyle = n2(x,y,3)===0? '#b8860b':'#c9973f';
      ctx.fillRect(px,py,TILE,TILE);
      ctx.strokeStyle='rgba(139,58,58,.35)'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(px,py+TILE*0.5); ctx.lineTo(px+TILE,py+TILE*0.5); ctx.stroke();
      if(n2(x,y,5)===1){ ctx.fillStyle='#8b3a3a'; ctx.fillRect(px+TILE*0.2,py+TILE*0.2,TILE*0.14,TILE*0.14); }
      break; }
    case 'M': { // a market stall/tent at Vanity Fair
      ctx.fillStyle='#c9973f'; ctx.fillRect(px,py,TILE,TILE);
      ctx.fillStyle = n2(x,y,2)? '#8b3a3a':'#5b6e8c';
      ctx.beginPath();
      ctx.moveTo(px+TILE*0.1,py+TILE*0.92); ctx.lineTo(px+TILE*0.5,py+TILE*0.16); ctx.lineTo(px+TILE*0.9,py+TILE*0.92);
      ctx.closePath(); ctx.fill();
      ctx.strokeStyle='rgba(0,0,0,.2)'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(px+TILE*0.5,py+TILE*0.16); ctx.lineTo(px+TILE*0.5,py+TILE*0.92); ctx.stroke();
      ctx.fillStyle='#e8d8b0';
      ctx.beginPath(); ctx.moveTo(px+TILE*0.5,py+TILE*0.16); ctx.lineTo(px+TILE*0.62,py+TILE*0.4); ctx.lineTo(px+TILE*0.38,py+TILE*0.4); ctx.closePath(); ctx.fill();
      break; }
    case 'C': { // Doubting Castle's stone wall
      ctx.fillStyle='#3a3f47'; ctx.fillRect(px,py,TILE,TILE);
      ctx.strokeStyle='#262a30'; ctx.lineWidth=1;
      const boff=(y%2)*TILE*0.5;
      for(let bx=-TILE*0.5; bx<TILE*1.5; bx+=TILE*0.5){
        ctx.beginPath(); ctx.moveTo(px+bx+boff,py); ctx.lineTo(px+bx+boff,py+TILE); ctx.stroke();
      }
      ctx.beginPath(); ctx.moveTo(px,py+TILE*0.5); ctx.lineTo(px+TILE,py+TILE*0.5); ctx.stroke();
      ctx.fillStyle='rgba(0,0,0,.15)'; ctx.fillRect(px,py,TILE,3);
      break; }
    case 'G': { // Doubting Castle's dungeon flagstones
      ctx.fillStyle=(x+y)%2? '#4c4f54':'#54575c';
      ctx.fillRect(px,py,TILE,TILE);
      ctx.strokeStyle='rgba(20,20,24,.4)'; ctx.lineWidth=1;
      ctx.strokeRect(px+1,py+1,TILE-2,TILE-2);
      if(n2(x,y,11)===0){ ctx.fillStyle='rgba(20,20,24,.3)'; ctx.fillRect(px+TILE*0.3,py+TILE*0.6,TILE*0.4,2); }
      break; }
    default: ctx.fillStyle='#456f38'; ctx.fillRect(px,py,TILE,TILE);
  }
}

/* At-a-glance overview of the 'world' map — the only map big enough that
   the zoomed-in camera can make it hard to tell where you are. Interiors
   already fit on screen, so it's hidden there. (Coupled to the map named
   'world' specifically; if a future act adds its own big outdoor map under
   a different name, this will need to know about it too.) */
const MM_TILE = 2;
const MM_GROUND = {'#':'#2e5526', '.':'#3f6b34', '=':'#8a744a', '~':'#22302b', 'o':'#7d868c',
  'w':'#5c5c63', 'h':'#5c5c63', 'i':'#5c5c63', '^':'#4a352a', 'r':'#6e3826'};
const MM_LANDMARK = new Set(['g','D','I','X','+','E']);
let mmSized = false;

function sizeMinimap(){
  if(mmSized || !LIVE.world) return;
  mm.width = LIVE.world[0].length * MM_TILE;
  mm.height = LIVE.world.length * MM_TILE;
  mmSized = true;
}

function drawMinimap(){
  sizeMinimap();
  if(cur !== 'world' || !mmSized){ mm.style.display='none'; return; }
  mm.style.display='block';
  const rows = LIVE.world;
  for(let y=0;y<rows.length;y++) for(let x=0;x<rows[y].length;x++){
    const t = rows[y][x];
    mctx.fillStyle = MM_LANDMARK.has(t) ? '#ffd75e' : (MM_GROUND[t] || '#3f6b34');
    mctx.fillRect(x*MM_TILE, y*MM_TILE, MM_TILE, MM_TILE);
  }
  mctx.globalAlpha = 0.6+0.4*Math.sin(performance.now()/300);
  mctx.fillStyle = '#ffffff';
  mctx.beginPath();
  mctx.arc(player.x*MM_TILE+MM_TILE/2, player.y*MM_TILE+MM_TILE/2, MM_TILE*1.6, 0, 7);
  mctx.fill();
  mctx.globalAlpha = 1;
}

/* Companions (NPCs with a `follow` predicate, e.g. Faithful/Hopeful once
   met) render at a position lagging behind the player's own movement
   trail, on whatever map the player is currently on — not at their
   original static npc.x/npc.y, and not gated by npc.map===cur, since a
   companion follows across acts/maps. `state.js`'s `trail` records recent
   {x,y,map} positions; we just take the Nth-most-recent one on this map. */
function companionPos(n){
  const offset = n.followOffset || 5;
  const onMap = trail.filter(t => t.map === cur);
  const spot = onMap[offset] || onMap[onMap.length - 1];
  return spot || {x: player.x, y: player.y};
}

function draw(){
  const MW=mapW(), MH=mapH();
  const mapPW=MW*TILE, mapPH=MH*TILE;
  const camX = mapPW<=VW ? (mapPW-VW)/2 : Math.max(0, Math.min(mapPW-VW, player.x*TILE+TILE/2-VW/2));
  const camY = mapPH<=VH ? (mapPH-VH)/2 : Math.max(0, Math.min(mapPH-VH, player.y*TILE+TILE/2-VH/2));
  ctx.clearRect(0,0,VW,VH);
  if(cur!=='world'){ ctx.fillStyle='#241c12'; ctx.fillRect(0,0,VW,VH); }
  const x0=Math.max(0,Math.floor(camX/TILE)), y0=Math.max(0,Math.floor(camY/TILE));
  const x1=Math.min(MW-1, Math.ceil((camX+VW)/TILE)), y1=Math.min(MH-1, Math.ceil((camY+VH)/TILE));
  const M=LIVE[cur];
  for(let y=y0;y<=y1;y++) for(let x=x0;x<=x1;x++)
    drawTile(M[y][x],x,y, x*TILE-camX, y*TILE-camY);

  const bob = Math.sin(performance.now()/300)*2;

  ITEMS.forEach(i=>{ if(i.map===cur && !i.taken){
    drawItemIcon(i.icon, i.x*TILE-camX, i.y*TILE-camY, bob);
  }});
  NPCS.forEach(n=>{
    if(n.gone && n.gone()) return;
    if(n.follow && n.follow()){
      const pos = companionPos(n);
      drawNPC(n, pos.x*TILE-camX, pos.y*TILE-camY);
    } else if(n.map===cur){
      drawNPC(n, n.x*TILE-camX, n.y*TILE-camY);
    }
  });

  if(cur==='world' && !S.flags.gateOpen){
    const gx=50*TILE-camX+TILE/2, gy=11*TILE-camY-TILE*0.4;
    if(gx>-40&&gx<VW+40&&gy>-40&&gy<VH+40){
      drawStar(gx, gy+bob, TILE*0.28, 0.6+0.4*Math.sin(performance.now()/400));
    }
  }

  drawPlayer(player.x*TILE-camX, player.y*TILE-camY);
  drawMinimap();
}

function loop(){
  stepNow();
  draw();
  requestAnimationFrame(loop);
}

export function initRender(){
  resize();
  addEventListener('resize', resize);
  requestAnimationFrame(loop);
}
