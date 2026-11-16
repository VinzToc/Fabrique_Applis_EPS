/* app.js — FabrikApplis EPS : du besoin à l'appli publiée. */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const store={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},del(k){try{localStorage.removeItem(k)}catch(e){}}};
$('#ver').textContent=APP_VERSION;
function toast(t,ko){const e=$('#toast');e.textContent=t;e.style.background=ko?'linear-gradient(135deg,#ff4d4d,#a00)':'';e.classList.add('on');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('on'),2800)}
async function copy(t,msg){try{await navigator.clipboard.writeText(t)}catch(e){const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(x){}a.remove()}toast(msg||'✅ Copié')}
function download(data,name,type){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([data],{type:type||'application/octet-stream'}));a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000)}
const today=()=>new Date().toISOString().slice(0,10);
const slug=s=>(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'');

/* ───────── Projets ───────── */
const DEF=()=>({id:'p'+Date.now().toString(36),maj:Date.now(),voie:'chat',
 besoin:{pour:'',types:[],probleme:'',niveau:'',effectif:'',public:[],actuel:'',reussite:'',objectif:''},
 ctx:{discipline:'EPS',activite:'',moments:[],appareils:[],horsLigne:true},
 app:{cible:'',nom:'',id:'',emoji:'',c1:'#ff8a1f',c2:'#2f9bff',desc:'',categorie:'Outils',fonctions:[],fonctionsLibres:'',deroule:'',donnees:{mode:'lignes',champs:[{n:'',t:'Texte',u:''}]}},
 gh:{mode:'new',owner:'',repo:'',branch:'main',url:''},partage:{auteur:'',etablissement:'',academie:'',ok1:false,ok2:false},inspireDe:null});
const merge=(a,b)=>{for(const k in b){if(b[k]&&typeof b[k]==='object'&&!Array.isArray(b[k])&&a[k]&&typeof a[k]==='object')merge(a[k],b[k]);else a[k]=b[k]}return a};
let P=store.get('fabrique_projets',{}),cur=null,step=1;
const save=(()=>{let t;return()=>{if(!cur)return;cur.maj=Date.now();P[cur.id]=cur;clearTimeout(t);t=setTimeout(()=>store.set('fabrique_projets',P),250)}})();
function openP(p){cur=p;if(typeof me!=='undefined'&&me&&!p.gh.owner)p.gh.owner=me.login;P[p.id]=p;store.set('fabrique_projets',P);store.set('fabrique_cur',p.id);fill();goStep(1);tab('tA')}
function newP(preset){const p=merge(DEF(),JSON.parse(JSON.stringify(preset||{})));p.app.auteur=p.app.auteur||store.get('fabrique_auteur','');if(preset&&!(p.app.fonctions||[]).length){const t=p.besoin.types||[];p.app.fonctions=[...new Set([...CAT.besoins.eleve,...CAT.besoins.prof].filter(b=>t.includes(b.v)).flatMap(b=>b.fn))]}openP(p)}
function listP(){const L=Object.values(P).sort((a,b)=>b.maj-a.maj);
 $('#plist').innerHTML=L.length?L.map(p=>`<div class="pi" data-id="${p.id}"><span class="em">${esc(p.app.emoji||'🛠️')}</span><div><b>${esc(p.app.nom||'Projet sans nom')}</b><small>${esc((p.ctx.activite?p.ctx.activite+' · ':'')+(p.besoin.probleme||'Besoin à décrire').slice(0,90))}</small><small>Modifié le ${new Date(p.maj).toLocaleString('fr-FR')}${p.gh&&p.gh.url?' · 🌐 publié':''}</small></div><button class="del" data-del="${p.id}" aria-label="Supprimer">🗑</button></div>`).join(''):'<p class="mini" style="margin:0">Aucun projet pour le moment : créez-en un ou partez d\'un exemple.</p>';
 $$('.pi').forEach(e=>e.onclick=ev=>{const d=ev.target.closest('[data-del]');if(d){ev.stopPropagation();if(confirm('Supprimer ce projet ? (l\'appli publiée sur GitHub n\'est pas supprimée)')){delete P[d.dataset.del];store.set('fabrique_projets',P);listP()}return}openP(P[e.dataset.id])})}
$('#newP').onclick=()=>newP();
$('#exs').innerHTML=CAT.themes.map(th=>{const L=CAT.exemples.map((x,i)=>[x,i]).filter(([x])=>x.th===th.v);return L.length?`<div class="exg"><h3>${esc(th.t)}</h3><div class="chips">${L.map(([x,i])=>`<button class="chip2 big" data-ex="${i}" title="${esc(x.p.besoin.probleme)}">${esc(x.t)}<small>${esc(x.p.besoin.probleme.slice(0,80))}…</small></button>`).join('')}</div></div>`:''}).join('');
$$('[data-ex]').forEach(b=>b.onclick=()=>newP(CAT.exemples[b.dataset.ex].p));
$('#impP').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const j=JSON.parse(await f.text());if(!j.besoin||!j.app)throw 0;j.id=j.id||'p'+Date.now().toString(36);if(P[j.id]&&!confirm('Ce projet existe déjà : le remplacer ?'))j.id='p'+Date.now().toString(36);openP(merge(DEF(),j));toast('✅ Projet ouvert')}catch(x){toast('⚠ Fichier de projet invalide',1)}e.target.value=''};
$('#expP').onclick=()=>{download(JSON.stringify(cur,null,1),`Projet_${slug(cur.app.nom)||'fabrique'}.json`,'application/json');toast('💾 Projet téléchargé')};

/* ───────── Navigation ───────── */
function tab(id){$$('nav button,.tab').forEach(x=>x.classList.remove('act'));$(`nav [data-t="${id}"]`).classList.add('act');$('#'+id).classList.add('act');if(id==='tP')listP();if(id==='tC')loadC();window.scrollTo(0,0)}
$$('nav button').forEach(b=>b.onclick=()=>{if(b.dataset.t==='tA'&&!cur){newP();return}tab(b.dataset.t)});
function goStep(n){step=+n;$$('.step').forEach(s=>s.classList.toggle('act',s.id==='s'+n));$$('#steps button').forEach(b=>b.classList.toggle('act',b.dataset.s==step));render();window.scrollTo(0,0)}
$$('#steps button').forEach(b=>b.onclick=()=>goStep(b.dataset.s));$$('[data-go]').forEach(b=>b.onclick=()=>goStep(b.dataset.go));

/* ───────── Liaison formulaire ⇄ projet ───────── */
const getK=(o,k)=>k.split('.').reduce((a,x)=>a==null?a:a[x],o);
const setK=(o,k,v)=>{const p=k.split('.'),l=p.pop();p.reduce((a,x)=>a[x]=a[x]||{},o)[l]=v};
function opts(sel,list){$(sel).innerHTML=list.map(x=>typeof x==='string'?`<option value="${esc(x)}">${esc(x)||'—'}</option>`:`<option value="${x.v}">${esc(x.t)}</option>`).join('')}
opts('#sNiv',CAT.niveaux);opts('#sMode',CAT.modes);opts('#sCat',CAT.categories);$('#dlAct').innerHTML=CAT.activites.map(a=>`<option value="${esc(a)}">`).join('');
function chips(el,list,k,multi){const v=getK(cur,k);el.innerHTML=list.map(o=>{o=typeof o==='string'?{v:o,t:o}:o;const on=multi?(v||[]).includes(o.v):v===o.v;
  return`<button type="button" class="chip2${o.s?' big':''}${on?' on':''}" data-v="${esc(o.v)}">${esc(o.t)}${o.s?`<small>${esc(o.s)}</small>`:''}</button>`}).join('');
 el.querySelectorAll('button').forEach(b=>b.onclick=()=>{const x=b.dataset.v;
  if(multi){let a=[...(getK(cur,k)||[])];a=a.includes(x)?a.filter(y=>y!==x):[...a,x];
   if(k==='besoin.public'){if(x==='Aucun en particulier'&&a.includes(x))a=[x];else a=a.filter(y=>y!=='Aucun en particulier'||x==='Aucun en particulier')}setK(cur,k,a)}
  else setK(cur,k,x);
  onChange(k);save();render()})}
function fill(){$$('[data-k]').forEach(e=>{const v=getK(cur,e.dataset.k);if(e.type==='checkbox')e.checked=!!v;else e.value=v??''})}
$$('[data-k]').forEach(e=>{e.addEventListener(e.type==='checkbox'||e.tagName==='SELECT'||e.type==='color'?'change':'input',()=>{
 let v=e.type==='checkbox'?e.checked:e.value;
 if(e.dataset.k==='app.id'){v=slug(v);cur.app._idManuel=!!v}
 setK(cur,e.dataset.k,v);onChange(e.dataset.k);save();renderLight();if(e.dataset.k==='app.auteur'){store.set('fabrique_auteur',v);$$('[data-k="app.auteur"]').forEach(x=>{if(x!==e)x.value=v})}})});
$('#sMode').addEventListener('change',()=>render());
function onChange(k){
 if(k==='app.nom'&&!cur.app._idManuel){cur.app.id=slug(cur.app.nom);const i=$('[data-k="app.id"]');if(i)i.value=cur.app.id}
 if(k==='besoin.pour'&&!cur.app.cible&&cur.besoin.pour!=='deux')cur.app.cible=cur.besoin.pour;
 if(k==='besoin.types'){const sug=suggestions();cur.app.fonctions=(cur.app.fonctions||[]).filter(f=>sug.includes(f)||!allFn().includes(f))}
}
const allFn=()=>[...CAT.besoins.eleve,...CAT.besoins.prof].flatMap(b=>b.fn);
function besoinsDispo(){const p=cur.besoin.pour;return p==='eleve'?CAT.besoins.eleve:p==='prof'?CAT.besoins.prof:[...CAT.besoins.eleve,...CAT.besoins.prof]}
function suggestions(){const t=cur.besoin.types||[];return[...new Set([...CAT.besoins.eleve,...CAT.besoins.prof].filter(b=>t.includes(b.v)).flatMap(b=>b.fn))]}

/* ───────── Champs de données ───────── */
function drawFields(){const m=cur.app.donnees.mode;$('#flds').hidden=$('#fldAdd').hidden=m==='aucune';if(m==='aucune')return;
 const c=cur.app.donnees.champs;
 $('#flds').innerHTML='<div class="fld mini"><span>Nom du champ</span><span>Type</span><span>Unité / valeurs</span><span></span></div>'+c.map((f,i)=>`<div class="fld" data-i="${i}"><input data-f="n" value="${esc(f.n)}" placeholder="Temps"><select data-f="t">${CAT.types.map(t=>`<option ${t===f.t?'selected':''}>${esc(t)}</option>`).join('')}</select><input data-f="u" value="${esc(f.u)}" placeholder="s, m, km/h…"><button class="x" aria-label="Supprimer le champ">✕</button></div>`).join('');
 $$('#flds .fld[data-i]').forEach(r=>{const i=+r.dataset.i;r.querySelectorAll('[data-f]').forEach(e=>e.addEventListener(e.tagName==='SELECT'?'change':'input',()=>{c[i][e.dataset.f]=e.value;save();renderLight()}));
  r.querySelector('.x').onclick=()=>{c.splice(i,1);save();drawFields()}})}
$('#addF').onclick=()=>{cur.app.donnees.champs.push({n:'',t:'Texte',u:''});save();drawFields();const l=$$('#flds [data-f="n"]').pop();l&&l.focus()};

/* ───────── Rendu ───────── */
function render(){if(!cur)return;
 chips($('#cPour'),CAT.pour,'besoin.pour');chips($('#cTypes'),besoinsDispo(),'besoin.types',1);chips($('#cPublic'),CAT.public,'besoin.public',1);
 chips($('#cCible'),CAT.cible,'app.cible');chips($('#cMom'),CAT.moments,'ctx.moments',1);chips($('#cApp'),CAT.appareils,'ctx.appareils',1);
 const sug=suggestions(),extra=(cur.app.fonctions||[]).filter(f=>!sug.includes(f));
 chips($('#cFn'),[...sug,...extra],'app.fonctions',1);if(!sug.length&&!extra.length)$('#cFn').innerHTML='<span class="mini">Choisissez d\'abord un besoin à l\'étape 1 : des fonctionnalités vous seront suggérées.</span>';
 chips($('#cVoie'),CAT.voies,'voie');chips($('#cRepoMode'),CAT.repoMode,'gh.mode');
 drawFields();renderLight();renderGH();
 const m=PR.manque(cur);$$('#steps button').forEach(b=>b.classList.toggle('ok',b.dataset.s==1?(cur.besoin.probleme&&cur.besoin.reussite&&cur.besoin.types.length):b.dataset.s==2?!!(cur.app.nom&&cur.app.cible):b.dataset.s==4?!!cur.gh.url:false))}
function renderLight(){if(!cur)return;
 $('#story').innerHTML=PR.story(cur,true)+(cur.inspireDe&&cur.inspireDe.url?`<br><span class="mini">💡 Inspiré de « <a href="${esc(cur.inspireDe.url)}" target="_blank" rel="noopener">${esc(cur.inspireDe.nom)}</a> »${cur.inspireDe.auteur?' de '+esc(cur.inspireDe.auteur):''}</span>`:'');
 if(step===3){const m=PR.manque(cur);$('#manque').innerHTML=m.length?`<div class="warn">⚠ Pour un meilleur résultat, complétez : <b>${m.join(', ')}</b>.</div>`:`<div class="okb">✅ Le cahier des charges est complet.</div>`;
  $('#prompt').textContent=PR.build(cur,cur.voie);
  $('#howto').innerHTML=cur.voie==='code'?`<li>Copiez le prompt et collez-le dans Claude Code (relié à votre compte GitHub).</li><li>Joignez le kit de démarrage (ou décompressez-le dans le dossier de travail).</li><li>Claude crée le dépôt <code>${esc(PR.repo(cur))}</code>, publie l'appli et vous donne son adresse.</li><li>Revenez ici à l'étape 5 pour vérifier le dépôt.</li>`
   :`<li>Téléchargez le <b>kit de démarrage</b> (liaison Mes Apps EPS, icônes, protection des données).</li><li>Copiez le <b>prompt</b>, ouvrez Claude, collez-le et <b>joignez le kit</b>.</li><li>Répondez aux éventuelles questions de Claude, testez l'aperçu, demandez des ajustements.</li><li>Téléchargez le <b>.zip</b> final fourni par Claude, puis passez à l'étape 4.</li>`}
 if(step===4){const n=$('#repoName');if(document.activeElement!==n)n.value=cur.gh.repo||PR.repoName(cur);$('#repoUrl').textContent='Adresse de l\'appli : '+PR.url({...cur,gh:{...cur.gh,repo:n.value}})}
 if(step===5)renderPortail()}

/* ───────── Étape 3 : Claude ───────── */
$('#cpy').onclick=()=>copy(PR.build(cur,cur.voie),'📋 Prompt copié : collez-le dans Claude');
$('#openC').onclick=()=>copy(PR.build(cur,cur.voie),'📋 Prompt copié : collez-le dans la conversation');
$('#dlMd').onclick=()=>download(PR.build(cur,cur.voie),`Prompt_${slug(cur.app.nom)||'appli'}.md`,'text/markdown');
$('#kit').onclick=async()=>{try{const f=await kitFiles(cur);download(FZ.zip(f),`Kit_${(cur.app.nom||'appli').replace(/\s+/g,'_')}.zip`,'application/zip');toast('⬇ Kit téléchargé : joignez-le à Claude')}catch(e){toast('⚠ '+e.message,1)}};
$('#cpyEvo').onclick=()=>copy(PR.evolution(cur,$('#evo').value.trim()),'📋 Prompt d\'évolution copié');

/* ───────── Étape 4 : GitHub ───────── */
let gh=null,me=null,repos=[],upl=[];
const tokSaved=store.get('fabrique_tok',null)||(()=>{try{return sessionStorage.getItem('fabrique_tok')}catch(e){return null}})();
if(tokSaved){$('#tok').value=tokSaved;$('#tokMem').checked=!!store.get('fabrique_tok',null)}
function log(t,c){const l=$('#log');l.hidden=false;const d=document.createElement('div');if(c)d.className=c;d.textContent=t;l.appendChild(d);l.scrollTop=l.scrollHeight}
async function connect(silent){const t=$('#tok').value.trim();if(!t){if(!silent)toast('Collez d\'abord votre jeton',1);return}
 try{gh=new GH(t);me=await gh.user();
  if($('#tokMem').checked)store.set('fabrique_tok',t);else{store.del('fabrique_tok');try{sessionStorage.setItem('fabrique_tok',t)}catch(e){}}
  $('#who').innerHTML=`<span class="user"><img src="${esc(me.avatar_url)}" alt="">${esc(me.login)}</span>`;$('#tokOut').hidden=false;$('#gTok').open=false;$('#ghZone').hidden=false;
  if(cur)cur.gh.owner=me.login;save();repos=await gh.repos();renderGH();renderLight()}
 catch(e){gh=me=null;$('#ghZone').hidden=true;if(!silent)toast('⚠ '+e.message,1);$('#who').textContent=silent?'':'⚠ '+e.message}}
$('#tokGo').onclick=()=>connect();
$('#tokOut').onclick=()=>{gh=me=null;store.del('fabrique_tok');try{sessionStorage.removeItem('fabrique_tok')}catch(e){}$('#tok').value='';$('#who').textContent='';$('#tokOut').hidden=true;$('#ghZone').hidden=true;$('#gTok').open=true};
$('#repoName').addEventListener('input',e=>{cur.gh.repo=e.target.value.trim().replace(/[^A-Za-z0-9._-]/g,'_');save();renderLight()});
$('#repoSel').onchange=e=>{cur.gh.repo=e.target.value;const r=repos.find(x=>x.name===e.target.value);if(r)cur.gh.branch=r.default_branch;save();renderLight()};
function renderGH(){if(!cur)return;const old=cur.gh.mode==='old';$('#repoNew').hidden=old;$('#repoOld').hidden=!old;
 if(old){$('#repoSel').innerHTML='<option value="">— Choisir —</option>'+repos.map(r=>`<option ${r.name===cur.gh.repo?'selected':''}>${esc(r.name)}</option>`).join('')}
 $('#dlRepo').hidden=!(gh&&cur.gh.repo&&(old||cur.gh.url));
 $('#pub').disabled=!(gh&&upl.some(f=>!f.bl)&&(old?cur.gh.repo:true));
 $('#pubOk').innerHTML=cur.gh.url?`<div class="okb">🌐 Appli en ligne : <a href="${esc(cur.gh.url)}" target="_blank" rel="noopener"><b>${esc(cur.gh.url)}</b></a><div class="row"><a class="btn b" href="${esc(cur.gh.url)}" target="_blank" rel="noopener">↗ Ouvrir</a><button class="btn r" id="qrB">▦ QR code</button><button class="btn r" id="cpU">🔗 Copier le lien</button></div><p class="mini">La mise en ligne d'une nouvelle version peut prendre 1 à 2 minutes. Sur un appareil déjà équipé, rechargez la page deux fois.</p></div>`:'';
 const q=$('#qrB');if(q)q.onclick=()=>showQR(cur.gh.url);const c=$('#cpU');if(c)c.onclick=()=>copy(cur.gh.url,'🔗 Lien copié')}
function showQR(u){try{const q=qrcode(0,'M');q.addData(u);q.make();const n=q.getModuleCount(),m=4,px=8,w=(n+2*m)*px,c=document.createElement('canvas');c.width=c.height=w;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,w,w);x.fillStyle='#000';
 for(let r=0;r<n;r++)for(let k=0;k<n;k++)if(q.isDark(r,k))x.fillRect((k+m)*px,(r+m)*px,px,px);$('#qrc').replaceChildren(c)}catch(e){$('#qrc').textContent='QR code indisponible'}
 $('#qru').textContent=u;$('#qrm').hidden=false}
$('#qx').onclick=()=>$('#qrm').hidden=true;$('#qrm').onclick=e=>{if(e.target.id==='qrm')$('#qrm').hidden=true};

/* Fichiers à publier */
const BLOQUE=/\.(csv|xlsx|xlsm|xls|ods|tsv)$/i,IGN=/(^|\/)(__MACOSX|\.DS_Store|Thumbs\.db|\.git)(\/|$)/;
async function takeFiles(list){let out=[];
 for(const f of list){const b=await f.arrayBuffer();
  if(/\.zip$/i.test(f.name)||FZ.isZip(b)&&!/\.(xlsx|docx|ods)$/i.test(f.name)){try{out.push(...await FZ.unzip(b))}catch(e){toast('⚠ '+e.message,1);return}}
  else out.push({name:f.webkitRelativePath||f.name,data:new Uint8Array(b)})}
 out=out.filter(f=>!IGN.test(f.name));
 /* retire un dossier englobant commun (ex. « MonAppli/index.html ») */
 const first=out.map(f=>f.name.split('/')[0]);if(out.length&&!out.some(f=>f.name==='index.html')&&first.every(x=>x===first[0])&&out.every(f=>f.name.includes('/')))out.forEach(f=>f.name=f.name.slice(first[0].length+1));
 const dec=new TextDecoder();
 out.forEach(f=>{if(BLOQUE.test(f.name))f.bl='données (fichier tableur)';
  else if(/\.json$/i.test(f.name)&&!/manifest|apps\.json|package/i.test(f.name)){const t=dec.decode(f.data).toLowerCase();if(/pr[ée]nom/.test(t)&&/classe/.test(t))f.bl='liste d\'élèves probable'}});
 upl=out;if($('#autoAdd').checked)await addMissing();drawUpl()}
async function addMissing(){upl=upl.filter(f=>!f.auto);const has=n=>upl.some(f=>f.name===n&&!f.bl);
 const k=await kitFiles(cur,{publish:true});for(const f of k)if(!has(f.name)){f.auto=1;upl.push(f)}}
function drawUpl(){const l=$('#flist');l.hidden=!upl.length;
 const noIdx=upl.length&&!upl.some(f=>f.name==='index.html');
 l.innerHTML=(noIdx?'<li class="bl" style="text-decoration:none">⚠ Aucun index.html à la racine : l\'appli ne s\'affichera pas.</li>':'')+upl.sort((a,b)=>a.name.localeCompare(b.name)).map(f=>`<li class="${f.bl?'bl':f.auto?'add':''}">${esc(f.name)}<span>${f.bl?'🚫 bloqué : '+f.bl:f.auto?'➕ ajouté par FabrikApplis':(f.data.length/1024).toFixed(1)+' Ko'}</span></li>`).join('');renderGH()}
const dz=$('#drop');dz.ondragover=e=>{e.preventDefault();dz.classList.add('on')};dz.ondragleave=()=>dz.classList.remove('on');
dz.ondrop=e=>{e.preventDefault();dz.classList.remove('on');takeFiles([...e.dataTransfer.files])};$('#files').onchange=e=>{takeFiles([...e.target.files]);e.target.value=''};
$('#autoAdd').onchange=async e=>{if(!upl.length)return;if(e.target.checked)await addMissing();else upl=upl.filter(f=>!f.auto);drawUpl()};

$('#pub').onclick=async()=>{const b=$('#pub');b.disabled=true;$('#log').innerHTML='';
 const files=upl.filter(f=>!f.bl).map(f=>({name:f.name,data:typeof f.data==='string'?new TextEncoder().encode(f.data):f.data}));
 try{const o=me.login;let name,branch;
  if(cur.gh.mode==='old'){name=cur.gh.repo;branch=(repos.find(r=>r.name===name)||{}).default_branch||'main'}
  else{name=($('#repoName').value||PR.repoName(cur)).trim();log('Création du dépôt '+o+'/'+name+'…');
   try{const r=await gh.createRepo(name,(cur.app.desc||cur.app.nom||'')+' — créé avec la FabrikApplis EPS');branch=r.default_branch;log('Dépôt créé ✔','s')}
   catch(e){if(e.status===422){if(!confirm(`Le dépôt « ${name} » existe déjà sur votre compte. Le mettre à jour avec ces fichiers ?`))throw new Error('Publication annulée.');const r=await gh.repo(o,name);branch=r.default_branch}else throw e}
   await new Promise(r=>setTimeout(r,1500))}
  const c=await gh.commitFiles(o,name,branch,files,$('#cmsg').value.trim()||('Version du '+new Date().toLocaleString('fr-FR')),$('#wipe').checked,t=>log(t));
  log('Fichiers déposés ✔ ('+files.length+')','s');
  log('Activation de GitHub Pages…');
  try{await gh.enablePages(o,name,branch)}catch(e){await new Promise(r=>setTimeout(r,3000));await gh.enablePages(o,name,branch)}
  const url=`https://${o.toLowerCase()}.github.io/${name}/`;
  Object.assign(cur.gh,{owner:o,repo:name,branch,url,mode:'old'});save();repos=await gh.repos().catch(()=>repos);renderGH();
  log('Mise en ligne en cours (1 à 2 minutes)…');
  const ok=await gh.waitPages(o,name,t=>log(t),c.sha);
  log(ok?'🎉 Appli en ligne : '+url:'La mise en ligne prend plus de temps que prévu : réessayez l\'adresse dans quelques minutes.',ok?'s':'');
  toast(ok?'🎉 Appli publiée !':'⏳ Publication en cours chez GitHub');render()}
 catch(e){log('⚠ '+e.message,'e');toast('⚠ '+e.message,1)}
 b.disabled=false};
$('#dlRepo').onclick=async()=>{try{const o=cur.gh.owner||me.login,r=cur.gh.repo,br=cur.gh.branch||'main';toast('⏳ Récupération des fichiers…');
 const t=await gh.tree(o,r,br),f=[];for(const x of t.files)f.push({name:x.path,data:await gh.blobBytes(o,r,x.sha)});
 download(FZ.zip(f),`${r}_${today()}.zip`,'application/zip');toast('⬇ Fichiers téléchargés : joignez-les à Claude')}catch(e){toast('⚠ '+e.message,1)}};

/* ───────── Étape 5 : vérification ───────── */
$('#chk').onclick=async()=>{const L=$('#chkL');
 if(!gh){L.innerHTML='<li>⚠ Connectez-vous d\'abord à GitHub (étape 4).</li>';return}
 const o=cur.gh.owner||me.login,r=cur.gh.repo;if(!r){L.innerHTML='<li>⚠ Aucun dépôt associé à ce projet (étape 4).</li>';return}
 L.innerHTML='<li>⏳ Analyse du dépôt…</li>';const res=[],fails=[];const add=(ok,t,fix,warn)=>{res.push(`<li>${ok?'✅':warn?'⚠️':'❌'} ${t}</li>`);if(!ok&&fix)fails.push(fix)};
 try{const rp=await gh.repo(o,r),t=await gh.tree(o,r,rp.default_branch),names=t.files.map(f=>f.path),has=n=>names.includes(n);
  const idx=has('index.html')?await gh.fileText(o,r,'index.html'):'';
  const js=[];for(const n of names.filter(n=>/\.js$/.test(n)&&!/^(eps-core|eleve-core|qrcode)\.js$/.test(n)).slice(0,15))js.push(await gh.fileText(o,r,n)||'');
  const code=idx+'\n'+js.join('\n'),id=cur.app.id,m=cur.app.donnees.mode,ev=cur.app.cible==='eleve';
  add(has('index.html'),'Page d\'accueil index.html à la racine','Il manque index.html à la racine du dépôt.');
  const man=names.find(n=>/^manifest\.(webmanifest|json)$/.test(n));add(man&&/rel=["']?manifest/i.test(idx),'Manifest PWA présent et déclaré','Le manifest (manifest.webmanifest) est absent ou non déclaré dans index.html (<link rel="manifest">).');
  add(has('sw.js')&&/serviceWorker\.register/.test(code),'Service worker (fonctionnement hors ligne)','Le service worker sw.js est absent ou jamais enregistré (navigator.serviceWorker.register).');
  add(has('eps-core.js')&&/<script[^>]+eps-core\.js/.test(idx),'eps-core.js présent et chargé','eps-core.js doit être présent à la racine et chargé dans index.html avant le script de l\'appli.');
  if(ev)add(has('eleve-core.js')&&/<script[^>]+eleve-core\.js/.test(idx)&&idx.indexOf('eps-core.js')<idx.indexOf('eleve-core.js'),'eleve-core.js chargé après eps-core.js','eleve-core.js doit être présent et chargé APRÈS eps-core.js.');
  if(m!=='aucune'){
   if(ev){add(/ELEVE\.(enregistrer|enregistrerChamps)\(/.test(code),'Sauvegarde des saisies de l\'élève (ELEVE.enregistrer)','Les saisies ne sont pas enregistrées avec ELEVE.enregistrer / ELEVE.enregistrerChamps.');
    add(/ELEVE\.exporter\(/.test(code),'Export .xlsx de l\'élève pour le professeur','Il manque le bouton d\'export de l\'élève (ELEVE.exporter).')}
   else{add(/EPS\.(addLigne|setExt)\(/.test(code),'Enregistrement dans Mes Apps EPS (EPS.addLigne / setExt)','Les saisies ne sont pas enregistrées avec EPS.addLigne ou EPS.setExt.');
    add(/EPS\.exportXLSX\(/.test(code),'Export .xlsx au format Mes Apps EPS','Il manque l\'export .xlsx (EPS.exportXLSX + EPS.downloadXLSX).');
    add(/EPS\.(importFile|importCSV|importXLSX)\(/.test(code),'Bouton « Charger la liste » (autre appareil ou autre domaine)','Il manque le bouton « Charger la liste » (EPS.importFile) quand la base est vide.',1)}
   add(!id||code.includes(`'${id}'`)||code.includes(`"${id}"`),`Identifiant d'appli « ${id} » utilisé`,`L'identifiant d'appli doit être « ${id} » dans les appels d'enregistrement.`,1)}
  add(has('icons/icon-192.png')&&has('icons/icon-512.png'),'Icônes 192 et 512 px','Il manque les icônes icons/icon-192.png et icons/icon-512.png.',1);
  const data=names.filter(n=>BLOQUE.test(n));add(!data.length,data.length?'Fichiers de données publiés : '+data.join(', '):'Aucune donnée élève dans le dépôt public','Supprimer du dépôt les fichiers de données : '+data.join(', '));
  const ext=[...idx.matchAll(/<(?:script|link)[^>]+(?:src|href)=["'](https?:\/\/[^"']+)/gi)].map(x=>x[1]).filter(u=>!/github\.io/.test(u));
  add(!ext.length,ext.length?'Ressources externes (hors ligne compromis) : '+ext.slice(0,3).join(', '):'Aucune ressource externe (CDN)','Supprimer les ressources externes (CDN, polices en ligne) et les intégrer localement : '+ext.join(', '),1);
  let pg=null;try{pg=await gh.req('GET',`/repos/${o}/${r}/pages`)}catch(e){}
  add(pg&&pg.status==='built',pg?`GitHub Pages : ${pg.status==='built'?'en ligne':pg.status} — <a href="${esc(pg.html_url)}" target="_blank" rel="noopener">${esc(pg.html_url)}</a>`:'GitHub Pages non activé (étape 4)',null,1);
  if(pg&&pg.html_url&&!cur.gh.url){cur.gh.url=pg.html_url;save()}
  L.innerHTML=res.join('');
  $('#fix').innerHTML=fails.length?`<div class="warn">${fails.length} point(s) à corriger. Copiez le prompt de correction, joignez à Claude le .zip des fichiers actuels (étape 4), puis republiez.<div class="row"><button class="btn b" id="cpFix">📋 Copier le prompt de correction</button><button class="btn r" id="dlFix">⬇ Fichiers actuels (.zip)</button></div></div>`:'<div class="okb">🎉 Tout est en ordre. Testez maintenant l\'appli en situation réelle avec le critère de réussite ci-dessous.</div>';
  if(fails.length){$('#cpFix').onclick=()=>copy(PR.fix(cur,fails),'📋 Prompt de correction copié');$('#dlFix').onclick=()=>$('#dlRepo').click()}}
 catch(e){L.innerHTML=`<li>❌ ${esc(e.message)}</li>`}};
function renderPortail(){const j=PR.appsJson(cur),ev=cur.app.cible==='eleve',own=(cur.gh.owner||'').toLowerCase()==='vinztoc';
 $('#appsJson').textContent=JSON.stringify(j);
 $('#testB').innerHTML=`${PR.story(cur,true)}<br><br>En séance, vérifiez : ${cur.besoin.reussite?`<b>${esc(cur.besoin.reussite)}</b>`:'<em>(critère de réussite à définir à l\'étape 1)</em>'}<br><span class="mini">Testez aussi : mode avion, appareil d'un collègue, export puis import du .xlsx dans Mes Apps EPS.</span>`;
 $('#portailTxt').innerHTML=(ev?'Appli élève → catalogue <code>apps.json</code> du dépôt <b>Applis_EPS_Eleves</b> (elle apparaîtra aussi dans le portail prof).':'Appli prof → catalogue <code>apps.json</code> du dépôt <b>Mes_Apps_EPS</b>.')
  +(own?' Ajoutez la ligne ci-dessous dans ce fichier.':' Envoyez cette ligne au responsable du portail, ou ajoutez-la à votre propre copie du portail.')}
$('#cpyJson').onclick=()=>copy(JSON.stringify(PR.appsJson(cur))+',','📋 Ligne apps.json copiée');
$('#cpyMail').onclick=()=>{const j=PR.appsJson(cur);copy(`Bonjour,\n\nJ'ai créé l'appli « ${j.nom} » avec la FabrikApplis EPS et je souhaiterais l'ajouter au portail ${cur.app.cible==='eleve'?'Applis EPS Élèves':'Mes Apps EPS'}.\n\nBesoin : ${PR.story(cur,false)}\nAdresse : ${j.url}\n\nLigne pour apps.json :\n${JSON.stringify(j)}\n\nMerci !`,'✉️ Demande copiée : collez-la dans un message')};

/* ───────── Partage avec la communauté ───────── */
function shareCheck(){const s=cur.partage||{},m=[];if(!cur.gh.url)m.push('publier l\'appli (étape 4)');if(!cur.app.nom)m.push('donner un nom à l\'appli');
 if(!cur.besoin.probleme||!cur.besoin.reussite)m.push('décrire le besoin et le critère de réussite (étape 1)');if(!(cur.app.auteur||'').trim())m.push('indiquer l\'auteur (votre nom)');if(!s.ok1||!s.ok2)m.push('cocher les deux engagements');return m}
$('#shareCp').onclick=()=>{const t=PR.ticket(cur);copy(t.title+'\n\n'+t.body,'📋 Proposition copiée')};
$('#share').onclick=async()=>{const m=shareCheck(),out=$('#shareMsg');
 if(m.length){out.innerHTML=`<div class="warn">Avant de proposer l'appli : ${m.map(esc).join(', ')}.</div>`;return}
 const t=PR.ticket(cur);
 if(gh){try{const i=await gh.req('POST',`/repos/${COMMU.owner}/${COMMU.repo}/issues`,{title:t.title,body:t.body});cur.partage.ticket=i.html_url;save();
  out.innerHTML=`<div class="okb">📨 Proposition envoyée : <a href="${esc(i.html_url)}" target="_blank" rel="noopener">ticket n° ${i.number}</a>. Vous serez notifié par GitHub dès qu'elle sera validée.</div>`;return}
  catch(e){out.innerHTML=`<div class="warn">Envoi direct impossible (${esc(e.message)}). Une page GitHub pré-remplie s'ouvre : cliquez sur « Create » / « Submit new issue ».</div>`}}
 const u=`https://github.com/${COMMU.owner}/${COMMU.repo}/issues/new?title=${encodeURIComponent(t.title)}&body=${encodeURIComponent(t.body)}`;
 if(u.length>7800){copy(t.title+'\n\n'+t.body,'📋 Proposition copiée : collez-la dans le ticket');window.open(`https://github.com/${COMMU.owner}/${COMMU.repo}/issues/new?title=${encodeURIComponent(t.title)}`,'_blank','noopener')}
 else window.open(u,'_blank','noopener');
 if(!gh)out.innerHTML='<div class="okb">Une page GitHub pré-remplie s\'est ouverte : connectez-vous si besoin puis cliquez sur « Create ». (Astuce : en vous connectant à l\'étape 4, l\'envoi se fait en un clic.)</div>'};

/* ───────── Onglet Communauté ───────── */
let COM=null;
async function loadC(force){if(COM&&!force){drawC();return}$('#clist').innerHTML='<p class="mini">⏳ Chargement du catalogue…</p>';
 try{const r=await fetch(COMMU.fichier,{cache:'no-cache'});if(!r.ok)throw new Error(r.status);COM=await r.json();if(!Array.isArray(COM))throw 0;store.set('fabrique_com',COM)}
 catch(e){COM=store.get('fabrique_com',null);if(!COM){$('#clist').innerHTML='<p class="mini">⚠ Catalogue de la communauté indisponible (hors connexion ou pas encore créé).</p>';$('#cCnt').textContent='';return}}
 const acts=[...new Set(COM.map(a=>a.activite).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'fr'));
 $('#cfA').innerHTML='<option value="">Toutes les APSA</option>'+acts.map(a=>`<option>${esc(a)}</option>`).join('');
 const T=[...CAT.besoins.eleve,...CAT.besoins.prof].filter(b=>COM.some(a=>((a.besoin||{}).types||[]).includes(b.v)));
 $('#cfT').innerHTML='<option value="">Tous les besoins</option>'+T.map(b=>`<option value="${b.v}">${esc(b.t)}</option>`).join('');drawC()}
function drawC(){const A=$('#cfA').value,Ty=$('#cfT').value,C=$('#cfC').value,q=slug($('#cfQ').value);
 const L=(COM||[]).filter(a=>(!A||a.activite===A)&&(!Ty||((a.besoin||{}).types||[]).includes(Ty))&&(!C||a.cible===C)&&(!q||slug([a.nom,a.desc,a.activite,a.auteur,(a.besoin||{}).probleme].join(' ')).includes(q)))
  .sort((a,b)=>(b.date||'').localeCompare(a.date||''));
 $('#cCnt').textContent=COM?`${L.length} appli(s) sur ${COM.length}`:'';
 $('#clist').innerHTML=L.map(a=>{const b=a.besoin||{},i=COM.indexOf(a);return`<div class="pi" style="cursor:default"><span class="em">${esc(a.emoji||'🧩')}</span><div><b>${esc(a.nom)}</b><small>${esc(a.desc||'')}</small>
  ${b.probleme?`<div class="bes">🎯 ${esc(b.probleme)}</div>`:''}${b.reussite?`<div class="bes">✅ ${esc(b.reussite)}</div>`:''}
  <div class="tags">${a.activite?`<i>${esc(a.activite)}</i>`:''}${a.niveau?`<i>${esc(a.niveau)}</i>`:''}<i>${a.cible==='eleve'?'🎒 élèves':'🧑‍🏫 prof'}</i>${(b.libelles||[]).map(x=>`<i>${esc(x)}</i>`).join('')}</div>
  <small>${a.auteur?'Par '+esc(a.auteur):''}${a.etablissement?' · '+esc(a.etablissement):''}${a.academie?' · '+esc(a.academie):''}${a.date?' · '+esc(a.date.split('-').reverse().join('/')):''}</small></div>
  <div class="acts"><a class="btn b" href="${esc(a.url)}" target="_blank" rel="noopener">↗ Ouvrir</a><button class="btn r" data-insp="${i}">💡 S'en inspirer</button>${a.depot?`<a class="btn r" href="${esc(a.depot)}" target="_blank" rel="noopener">{ } Code</a>`:''}</div></div>`}).join('')||'<p class="mini">Aucune appli ne correspond à ces filtres.</p>';
 $$('[data-insp]').forEach(b=>b.onclick=()=>inspire(COM[b.dataset.insp]))}
['#cfA','#cfT','#cfC'].forEach(s=>$(s).onchange=drawC);$('#cfQ').oninput=drawC;
function inspire(a){const b=a.besoin||{};newP({besoin:{pour:b.pour||'',types:(b.types||[]).slice(),probleme:b.probleme||'',reussite:b.reussite||'',objectif:b.objectif||'',niveau:a.niveau||''},
 ctx:{discipline:a.discipline||'EPS',activite:a.activite||''},app:{cible:a.cible||''},inspireDe:{nom:a.nom,url:a.url,auteur:a.auteur||''}});
 toast('💡 Projet créé à partir du besoin de « '+a.nom+' » : adaptez-le à vos élèves')}

/* ───────── Démarrage ───────── */
listP();const last=store.get('fabrique_cur',null);if(last&&P[last]){cur=P[last];fill()}
if($('#tok').value)connect(true);
{const q=new URLSearchParams(location.search),ins=q.get('inspire'),t=q.get('onglet');
 if(ins)loadC().then(()=>{const a=(COM||[]).find(x=>x.id===ins||x.url===ins);if(a)inspire(a)});else if(t==='communaute')tab('tC');
 if(ins||t)history.replaceState(null,'',location.pathname)}
if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
