/* Tiny DOM leaf module — no imports, so anything can depend on it without risking a cycle. */
export const $ = id => document.getElementById(id);

let toastTimer = null;
export function toast(msg){
  const t = $("toast");
  t.innerHTML = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove("show"), 3600);
}
