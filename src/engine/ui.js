import {$, toast} from './dom.js';
import {S, cur, STAT_META, applyFx, addVerse} from './state.js';
import {DLG, MAP_NAMES, actOf} from '../../data/index.js';
import {doAct} from './actions.js';

export let dlgOpen = false;
let bumped = {};

function objective(){
  const act = actOf(cur);
  return act ? act.objective(S) : '';
}

export function renderStatus(){
  $("status").innerHTML =
    Object.keys(STAT_META).map(k=>`<span class="chip ${bumped[k]?'bump':''}">${STAT_META[k].icon} ${STAT_META[k].name} <b>${S[k]}</b></span>`).join("")
    + `<span class="chip">${S.burden?'⚓ Burden':'✨ Unburdened'}</span>`
    + `<span class="chip btn" id="satchelBtn">🎒 <b>${S.verses.length+S.items.length}</b></span>`;
  bumped={};
  $("satchelBtn").onclick=()=>openDlg('satchel');
  $("resolveFill").style.width=(S.resolve/S.maxResolve*100)+"%";
  $("resolveNum").textContent=`${S.resolve} / ${S.maxResolve}`;
  const place = MAP_NAMES[cur];
  $("objective").textContent = "✦ " + objective() + (place? "  ·  📍 "+place : "");
}

function dynamicText(id){
  if(id==='summary'){
    const lines = Object.keys(STAT_META).map(k=>`<b>${STAT_META[k].name}:</b> ${S[k]}`).join(" &nbsp;·&nbsp; ");
    const v = S.verses.length? S.verses.map(v=>`<div class="verse">“${v.text}”<b>${v.ref}</b></div>`).join("") : "<p><i>No verses gathered.</i></p>";
    const it = S.items.length? S.items.map(i=>`<p>🗝 <b>${i.name}</b> — ${i.note}</p>`).join("") : "";
    return [`<p>${lines}</p>`, `<p><b>Scriptures gathered (${S.verses.length}):</b></p>`, v, it];
  }
  if(id==='satchel'){
    const v = S.verses.length? S.verses.map(v=>`<div class="verse">“${v.text}”<b>${v.ref}</b></div>`).join("") : "<p><i>No scriptures yet — watch for glowing scrolls along the way and inside houses.</i></p>";
    const it = S.items.length? S.items.map(i=>`<p>🗝 <b>${i.name}</b> — ${i.note}</p>`).join("") : "";
    return [v, it];
  }
  return [];
}

export function openDlg(id){
  const d=DLG[id]; if(!d) return;
  dlgOpen=true; $("overlay").classList.add("show");
  $("dlgGlyph").textContent=d.glyph; $("dlgTitle").textContent=d.title;
  const paras = d.dynamic? dynamicText(id) : d.text;
  $("dlgText").innerHTML=paras.map(p=>p.startsWith("<")?p:`<p>${p}</p>`).join("");
  const ch=$("dlgChoices"); ch.innerHTML="";
  d.choices.forEach(c=>{
    const ok = !c.req || S[c.req.stat]>=c.req.min;
    const b=document.createElement("button");
    b.className="choice"+(ok?"":" locked");
    let rq="";
    if(c.req){ const m=STAT_META[c.req.stat]; rq=`<span class="req">${ok?"✓":"✗"} Requires ${m.name} ${c.req.min}+</span>`; }
    b.innerHTML=c.label+rq;
    if(ok) b.onclick=()=>{
      if(c.fx){
        applyFx(c.fx);
        for(const k in c.fx) if(k in STAT_META) bumped[k]=true;
      }
      if(c.toast) toast(c.toast);
      if(d.onEnd && (c.end||c.next)) { if(d.onEnd.verse) addVerse(d.onEnd.verse); }
      if(c.act) doAct(c.act);
      renderStatus();
      if(c.next){ openDlg(c.next); }
      else closeDlg();
    };
    ch.appendChild(b);
  });
}
export function closeDlg(){ dlgOpen=false; $("overlay").classList.remove("show"); }
