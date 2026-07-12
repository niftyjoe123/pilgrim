import {$} from './dom.js';
import {S} from './state.js';
import {tryStep} from './movement.js';
import {dlgOpen, closeDlg} from './ui.js';

const held={up:false,down:false,left:false,right:false};
const KEYMAP={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',s:'down',a:'left',d:'right',W:'up',S:'down',A:'left',D:'right'};
let lastStep=0;

function heldDir(){ if(held.up)return[0,-1]; if(held.down)return[0,1]; if(held.left)return[-1,0]; if(held.right)return[1,0]; return null; }

export function stepNow(){
  const d=heldDir(); if(!d) return;
  const speed = S.burden? 200:150;
  const now=performance.now();
  if(now-lastStep>=speed){ lastStep=now; tryStep(d[0],d[1]); }
}

export function initInput(){
  addEventListener('keydown',e=>{
    const d=KEYMAP[e.key];
    if(d){ e.preventDefault(); held[d]=true; }
    if(e.key==='Escape'&&dlgOpen) closeDlg();
  });
  addEventListener('keyup',e=>{ const d=KEYMAP[e.key]; if(d) held[d]=false; });
  document.querySelectorAll('#dpad button[data-d]').forEach(b=>{
    const d=b.dataset.d;
    const on=e=>{e.preventDefault(); held[d]=true; stepNow();};
    const off=e=>{e.preventDefault(); held[d]=false;};
    b.addEventListener('pointerdown',on); b.addEventListener('pointerup',off);
    b.addEventListener('pointerleave',off); b.addEventListener('pointercancel',off);
  });
}
