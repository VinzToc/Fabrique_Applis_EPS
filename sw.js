importScripts('version.js');
const V='fabrikapplis-eps-v'+APP_VERSION,F=['nouveautes.js','nouveautes.json','./','index.html','style.css','version.js','eps-core.js','eleve-core.js','qrcode.js','zip.js','github.js','catalogue.js','prompt.js','app.js','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'];
const T=2500;
const net=r=>new Promise((ok,ko)=>{const t=setTimeout(()=>ko(new Error('timeout')),T);fetch(r,{cache:'no-cache'}).then(x=>{clearTimeout(t);ok(x)},e=>{clearTimeout(t);ko(e)})});
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(F.map(u=>fetch(u,{cache:'reload'}).then(r=>r.ok&&c.put(u,r)).catch(()=>{})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>(x.startsWith('fabrique-eps')||x.startsWith('fabrikapplis-eps'))&&x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
// Seules les ressources de l'appli passent par le cache : les appels à l'API GitHub vont toujours au réseau.
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET'||new URL(q.url).origin!==location.origin)return;
 e.respondWith(net(q).then(r=>{if(r.ok){const c=r.clone();caches.open(V).then(x=>x.put(q,c))}return r})
  .catch(()=>caches.match(q,{ignoreSearch:true}).then(h=>h||(q.mode==='navigate'?caches.match('index.html'):undefined)||Response.error())))});
