/* github.js — accès à l'API GitHub depuis le navigateur (jeton personnel, aucune donnée ne transite ailleurs). */
(function(){
const API='https://api.github.com';
const b64=u8=>{let s='';for(let i=0;i<u8.length;i+=0x8000)s+=String.fromCharCode.apply(null,u8.subarray(i,i+0x8000));return btoa(s)};
const unb64=s=>{const b=atob(s.replace(/\s/g,'')),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const MSG={401:"Jeton refusé : il est invalide, expiré ou mal copié.",403:"Action refusée par GitHub : le jeton n'a pas le droit nécessaire (cochez « public_repo ») ou la limite d'appels est atteinte.",404:"Introuvable : vérifiez le nom du dépôt et les droits du jeton.",409:"Le dépôt est vide ou en conflit.",422:"GitHub refuse la demande"};
class GH{
 constructor(token){this.t=token.trim()}
 async req(method,path,body,raw){
  let r;try{r=await fetch(path.startsWith('http')?path:API+path,{method,headers:{'Accept':'application/vnd.github+json','Authorization':'Bearer '+this.t,'X-GitHub-Api-Version':'2022-11-28',...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined})}
  catch(e){throw new Error("GitHub ne répond pas : vérifiez la connexion Internet.")}
  if(raw)return r;
  const txt=await r.text();let j=null;try{j=txt?JSON.parse(txt):null}catch(e){}
  if(!r.ok){const m=(j&&j.message)||r.statusText;const det=j&&j.errors?' ('+j.errors.map(x=>x.message||x.code).join(', ')+')':'';
   const err=new Error((MSG[r.status]?MSG[r.status]+' — ':'')+m+det);err.status=r.status;throw err}
  return j}
 user(){return this.req('GET','/user')}
 repos(){return this.req('GET','/user/repos?per_page=100&sort=updated&affiliation=owner')}
 repo(o,r){return this.req('GET',`/repos/${o}/${r}`)}
 createRepo(name,description){return this.req('POST','/user/repos',{name,description,auto_init:true,has_issues:true,has_wiki:false,has_projects:false,private:false,homepage:''})}
 async tree(o,r,branch){const ref=await this.req('GET',`/repos/${o}/${r}/git/ref/heads/${branch}`);const c=await this.req('GET',`/repos/${o}/${r}/git/commits/${ref.object.sha}`);
  const t=await this.req('GET',`/repos/${o}/${r}/git/trees/${c.tree.sha}?recursive=1`);return{commit:ref.object.sha,tree:c.tree.sha,files:t.tree.filter(x=>x.type==='blob')}}
 async blobBytes(o,r,sha){const b=await this.req('GET',`/repos/${o}/${r}/git/blobs/${sha}`);return unb64(b.content)}
 async fileText(o,r,path){try{const f=await this.req('GET',`/repos/${o}/${r}/contents/${encodeURIComponent(path).replace(/%2F/g,'/')}`);return new TextDecoder().decode(unb64(f.content))}catch(e){return null}}
 /* Dépose tous les fichiers en UN seul commit. files=[{name,data:Uint8Array}] */
 async commitFiles(o,r,branch,files,message,wipe,log){
  let base;
  try{base=await this.tree(o,r,branch)}
  catch(e){if(e.status!==409&&e.status!==404)throw e;
   log('Dépôt vide : initialisation…');await this.req('PUT',`/repos/${o}/${r}/contents/README.md`,{message:'Initialisation',content:b64(new TextEncoder().encode('# '+r+'\n')),branch});
   await sleep(1200);base=await this.tree(o,r,branch)}
  const items=[];let i=0;
  for(const f of files){i++;log(`Envoi ${i}/${files.length} : ${f.name}`);
   const b=await this.req('POST',`/repos/${o}/${r}/git/blobs`,{content:b64(f.data),encoding:'base64'});
   items.push({path:f.name,mode:'100644',type:'blob',sha:b.sha})}
  const t=await this.req('POST',`/repos/${o}/${r}/git/trees`,wipe?{tree:items}:{base_tree:base.tree,tree:items});
  const c=await this.req('POST',`/repos/${o}/${r}/git/commits`,{message,tree:t.sha,parents:[base.commit]});
  await this.req('PATCH',`/repos/${o}/${r}/git/refs/heads/${branch}`,{sha:c.sha});
  return c}
 async enablePages(o,r,branch){
  try{return await this.req('GET',`/repos/${o}/${r}/pages`)}
  catch(e){if(e.status!==404)throw e}
  return this.req('POST',`/repos/${o}/${r}/pages`,{source:{branch,path:'/'}})}
 async waitPages(o,r,log,sha,max=240){const t0=Date.now();let last='';
  while(Date.now()-t0<max*1000){await sleep(5000);
   try{const b=await this.req('GET',`/repos/${o}/${r}/pages/builds/latest`);
    if(sha&&b.commit&&b.commit!==sha){if(last!=='old'){last='old';log('GitHub Pages : en attente de la nouvelle version…')}continue}
    if(b.status!==last){last=b.status;log('GitHub Pages : '+({queued:'en file d\'attente',building:'construction en cours',built:'en ligne ✔',errored:'erreur'}[b.status]||b.status))}
    if(b.status==='built')return true;if(b.status==='errored')throw new Error('La publication GitHub Pages a échoué : '+((b.error&&b.error.message)||'erreur inconnue'))}
   catch(e){if(e.status!==404)throw e}}
  return false}
}
window.GH=GH;window.GHutil={b64,unb64};
})();
