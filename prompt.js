/* prompt.js — rédaction du cahier des charges (prompt) envoyé à Claude, du kit de démarrage et des prompts de correction. */
const PORTAIL_PROF='https://vinztoc.github.io/Mes_Apps_EPS/',PORTAIL_ELEVES='https://vinztoc.github.io/Applis_EPS_Eleves/';
/* Dépôt qui reçoit les propositions « Applis de la communauté » (tickets) et héberge communaute.json */
const COMMU={owner:'VinzToc',repo:'Mes_Apps_EPS',fichier:PORTAIL_PROF+'communaute.json',label:'communaute-valide'};
const PR={
 lab(list,v){const x=list.find(o=>o.v===v);return x?x.t.replace(/^\S+\s/,''):v},
 besoinLabels(p){const all=[...CAT.besoins.eleve,...CAT.besoins.prof];return(p.besoin.types||[]).map(v=>(all.find(b=>b.v===v)||{t:v}).t)},
 qui(p){const b=p.besoin,niv=b.niveau?` de ${b.niveau}`:'';
  return{eleve:`les élèves${niv}`,prof:`l'enseignant`,deux:`l'enseignant et ses élèves${niv}`}[b.pour]||'…'},
 repo(p){return(p.gh&&p.gh.repo)||PR.repoName(p)},
 repoName(p){return((p.app.nom||'MonAppli').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^A-Za-z0-9_-]+/g,'_').replace(/^_|_$/g,'')||'MonAppli')+'_'+((p.ctx.discipline||'EPS').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^A-Za-z0-9]/g,'')||'EPS')},
 url(p){const o=(p.gh&&p.gh.owner)||'votre-identifiant';return`https://${o.toLowerCase()}.github.io/${PR.repo(p)}/`},
 /* Récit du besoin (« user story ») */
 story(p,html){const b=p.besoin,e=s=>html?esc(s):s,B=s=>html?`<b>${esc(s)}</b>`:s,I=s=>html?`<em>${s}</em>`:s;
  const types=PR.besoinLabels(p).map(x=>x.toLowerCase());
  return`Pour ${B(PR.qui(p))}${b.effectif?` (${e(b.effectif)} élèves)`:''}, `
   +(b.probleme?`qui rencontre${b.pour==='eleve'?'nt':''} ce problème : « ${e(b.probleme.trim().replace(/[.\s]+$/,''))} », `:I('[décrivez la situation problème], '))
   +`l'appli devra aider à ${types.length?B(types.join(', ')):I('[choisissez les besoins]')}`
   +`, avec ce critère de réussite : ${b.reussite?B('« '+b.reussite.trim().replace(/[.\s]+$/,'')+' »'):I('[critère de réussite]')}.`},
 manque(p){const m=[];if(!p.besoin.pour)m.push('pour qui est le besoin');if(!(p.besoin.types||[]).length)m.push('le type de besoin');
  if(!p.besoin.probleme)m.push('la situation problème');if(!p.besoin.reussite)m.push('le critère de réussite');
  if(!p.app.cible)m.push('qui manipule l\'appli');if(!p.app.nom)m.push('le nom de l\'appli');return m},
 champs(p){const c=(p.app.donnees.champs||[]).filter(x=>x.n);return c.map(x=>`  - ${x.n} : ${x.t}${x.u?` (${x.u})`:''}`).join('\n')},
 integration(p){const id=p.app.id||'mon_app',mode=p.app.donnees.mode,ex='{Date:\'AAAA-MM-JJ\', '+((p.app.donnees.champs||[]).filter(x=>x.n).map(x=>`'${x.n}':…`).join(', ')||'…')+'}';
  if(p.app.cible==='eleve')return`Appli destinée aux ÉLÈVES (portail « Applis EPS Élèves » : ${PORTAIL_ELEVES}).
- Charger \`eps-core.js\` PUIS \`eleve-core.js\` (fournis dans le kit, ne pas les modifier) avant le script de l'appli.
- Ne JAMAIS importer ni contenir de liste d'élèves : l'élève s'identifie lui-même.
${mode==='aucune'?`- Aucune sauvegarde nécessaire : ne pas demander d'identification.`:`- Avant une sauvegarde : \`const el = await ELEVE.demander();\` (fenêtre « Qui es-tu ? », une seule fois pour toutes les applis élèves). Si \`null\` (« sans m'identifier »), l'appli reste utilisable mais ne sauvegarde pas.
- ${mode==='lignes'?`Enregistrer chaque saisie datée : \`await ELEVE.enregistrer('${id}', ${ex});\``:`Enregistrer : \`await ELEVE.enregistrerChamps('${id}', {champ:valeur,…});\``} (retourne false si non identifié).
- \`ELEVE.bandeau(element)\` affiche l'élève courant en haut de l'écran ; \`await ELEVE.donnees()\` relit ses saisies (historique, progression).
- Bouton « 📤 Exporter mes résultats (.xlsx) » : \`ELEVE.exporter(['${id}'])\` → fichier que l'élève remet au professeur, qui l'importe dans Mes Apps EPS.`}`;
  return`Appli destinée au PROFESSEUR (portail « Mes Apps EPS » : ${PORTAIL_PROF}).
- Charger \`eps-core.js\` (fourni dans le kit, ne pas le modifier) avant le script de l'appli.
- Liste des élèves : \`const eleves = await EPS.all();\` → objets {id, nom, prenom, naissance, classe, regime}. Proposer un filtre par classe et une recherche.
- Si la liste est vide (appareil sans base ou appli hébergée sur un autre domaine que le portail) : bouton « 📂 Charger la liste » → \`await EPS.importFile(fichier)\` (accepte le .xlsx de Mes Apps EPS et le .csv Pronote).
${mode==='aucune'?`- Pas d'enregistrement de données élèves dans cette version.`:`- ${mode==='lignes'?`Enregistrer chaque saisie datée (sans doublon) : \`await EPS.addLigne('${id}', eleve.id, ${ex});\` — Date au format AAAA-MM-JJ.`:`Enregistrer (une saisie par élève) : \`await EPS.setExt('${id}', eleve.id, {champ:valeur,…});\``}
- Relire les données de l'appli : \`await EPS.getExt('${id}')\` → [{id, nom, prenom, classe, data}].
- Bouton « 💾 Enregistrer dans Mes Apps EPS » avec message d'état clair (✅ enregistré / ⚠ erreur).
- Bouton « ⬇ Exporter (.xlsx) » : \`EPS.downloadXLSX(await EPS.exportXLSX({apps:['${id}']}), '${(p.app.nom||'MonAppli').replace(/\s/g,'')}_AAAA-MM-JJ.xlsx');\` (fichier à importer dans Mes Apps EPS sur un autre appareil).`}`},
 a11y(p){const pub=(p.besoin.public||[]).filter(x=>x!=='Aucun en particulier');const r=[];
  const M={'Troubles DYS':'police sans empattement, grande taille, interlignage aéré, peu de texte, pas de texte en majuscules continues','TDAH':'une seule action par écran, consignes courtes, retour immédiat, pas d\'animations distrayantes','TSA':'interface prévisible et stable, étapes annoncées, pas de sons surprises (désactivables)','Élèves allophones':'pictogrammes systématiques à côté des mots, phrases très simples, lecture vocale possible (speechSynthesis, fr-FR)','Handicap moteur':'zones tactiles très larges (≥ 60 px), pas de geste complexe (glisser, double-toucher)','Handicap visuel':'contraste élevé, taille de texte réglable, compatibilité lecteur d\'écran (aria-label)','Inaptitudes partielles':'possibilité d\'adapter la tâche ou le barème pour un élève'};
  pub.forEach(x=>r.push(`  - ${x} : ${M[x]||'adapter l\'interface'}`));return r.join('\n')},
 build(p,voie){const b=p.besoin,c=p.ctx,a=p.app,repo=PR.repo(p),url=PR.url(p),fn=[...(a.fonctions||[])];
  const autre=(p.gh&&p.gh.owner)&&p.gh.owner.toLowerCase()!=='vinztoc';
  return`# Cahier des charges — ${a.nom||'Mon appli'} (${c.discipline||'EPS'}${c.activite?' · '+c.activite:''})

Tu es un développeur web spécialisé dans les outils pédagogiques. Crée une **application web progressive (PWA)** complète, simple et robuste, prête à être publiée sur GitHub Pages et intégrée à l'écosystème « Mes Apps EPS ».

## 1. Le besoin (point de départ : chaque choix doit le servir)
${PR.story(p,false)}

- Pour qui : ${PR.lab(CAT.pour,b.pour)||'—'}
- Besoins identifiés : ${PR.besoinLabels(p).join(' ; ')||'—'}
- Situation problème : ${b.probleme||'—'}
- Fonctionnement actuel et limites : ${b.actuel||'—'}
- Élèves : ${b.niveau||'niveau non précisé'}${b.effectif?`, environ ${b.effectif} par classe`:''}
${b.objectif?`- Objectif d'apprentissage : ${b.objectif}\n`:''}- **Critère de réussite** : ${b.reussite||'—'}
  → L'appli est réussie si ce critère est atteint en séance réelle. Ne pas ajouter de fonction qui n'y contribue pas.

${p.inspireDe&&p.inspireDe.url?`Appli de la communauté dont s'inspirer (sans la copier) : « ${p.inspireDe.nom} » — ${p.inspireDe.url}${p.inspireDe.auteur?` (créée par ${p.inspireDe.auteur})`:''}. Adapte-la au besoin décrit ici.

`:''}## 2. Contexte d'utilisation
- Utilisée par : ${PR.lab(CAT.cible,a.cible)||'—'}
- Moments : ${(c.moments||[]).join(', ')||'—'}
- Appareils : ${(c.appareils||[]).join(', ')||'—'}
- ${c.horsLigne?'**Doit fonctionner entièrement sans connexion Internet** une fois ouverte une première fois.':'Connexion Internet disponible.'}
${a.deroule?`- Déroulé en séance :\n${a.deroule.split('\n').map(l=>'  '+l).join('\n')}\n`:''}
## 3. Fonctionnalités de la version 1
${fn.length?fn.map(x=>'- '+x).join('\n'):'- (à déduire du besoin)'}
${a.fonctionsLibres?`- Précisions : ${a.fonctionsLibres}`:''}

## 4. Données enregistrées
${a.donnees.mode==='aucune'?'Aucune donnée élève enregistrée dans cette version.':`Mode « ${a.donnees.mode} » : ${a.donnees.mode==='lignes'?'plusieurs saisies datées par élève (une ligne par saisie)':'une seule saisie par élève, mise à jour'}.
Identifiant de l'appli (feuille du classeur .xlsx) : \`${a.id||'mon_app'}\`
Champs :
${PR.champs(p)||'  - (à définir avec moi)'}`}

## 5. Intégration à Mes Apps EPS
${PR.integration(p)}
${autre?`- ⚠ L'appli sera hébergée sur ${url}, un domaine différent du portail (vinztoc.github.io) : la base locale n'est PAS partagée. Les échanges passent obligatoirement par l'import de la liste et l'export .xlsx décrits ci-dessus.`:''}

## 6. Contraintes techniques
- Fichiers à la racine : \`index.html\`, \`app.js\`, \`style.css\`, \`sw.js\`, \`manifest.webmanifest\`, ${a.cible==='eleve'?'`eps-core.js` et `eleve-core.js`':'`eps-core.js`'} (fournis), \`icons/icon-192.png\` et \`icons/icon-512.png\` (fournies), \`.gitignore\` (fourni).
- HTML, CSS et JavaScript « vanilla » : aucun framework, aucune étape de compilation, **aucune ressource externe** (CDN, polices web, images en ligne) pour garantir le hors-ligne.
- Tous les chemins sont **relatifs** (\`./\`) : l'appli est servie depuis le sous-dossier \`/${repo}/\`.
- \`manifest.webmanifest\` : name « ${a.nom||'Mon appli'} », short_name, start_url "./", scope "./", display "standalone", lang "fr", theme_color et background_color "#0a1428", les deux icônes.
- \`sw.js\` : liste de tous les fichiers en cache ; stratégie « réseau d'abord, copie locale en secours » avec délai de 2,5 s ; nom de cache versionné (\`${a.id||'app'}-v1\`) et suppression des anciens caches. Enregistrer le service worker dans index.html.
- Ergonomie terrain : mobile d'abord, boutons tactiles d'au moins 48 px, texte lisible en plein soleil, aucune saisie clavier quand un bouton suffit, confirmation avant toute suppression.
- Charte graphique commune aux applis Mes Apps EPS : fond bleu nuit #0a1428, cartes semi-transparentes (effet verre), coins arrondis (16-20 px), accent en dégradé ${a.c1||'#ff8a1f'} → ${a.c2||'#2f9bff'}, police système, emoji ${a.emoji||''} dans l'en-tête.
${PR.a11y(p)?`- Accessibilité (élèves à besoins particuliers) :\n${PR.a11y(p)}`:''}
- RGPD : aucune donnée envoyée sur Internet, ni cookie, ni statistiques, ni liste d'élèves dans le code. **Aucun champ de donnée de santé** (diagnostic, pathologie, motif médical) : seulement l'aménagement pédagogique.
- Pied de page : « ${a.nom||'Appli'}${a.auteur?` · créée par ${a.auteur}`:''} · données stockées uniquement sur cet appareil » et un lien « Confidentialité » ouvrant une courte notice (fenêtre ou page \`confidentialite.html\`) : données enregistrées et finalité, stockage local sans serveur, effacement (bouton « Effacer les données de l'appli » avec confirmation), utilisation sous la responsabilité du chef d'établissement (responsable de traitement, registre, information des familles), hébergement GitHub Pages qui enregistre l'adresse IP des visiteurs.
${/vid[ée]o|filme|caméra/i.test(fn.join(' ')+(a.fonctionsLibres||''))?`- Vidéo (droit à l'image) : utiliser la caméra de l'appareil (getUserMedia) en lecture différée ou en mémoire vive uniquement ; ne jamais enregistrer, téléverser ni conserver de vidéo après la fermeture de l'écran ; prévoir un bouton « Effacer » visible.
`:''}
- Interface entièrement en français, sans jargon technique.

## 7. Ce que j'attends de toi
${voie==='code'?`1. Reformule le besoin en 3 lignes. Pose-moi au maximum 3 questions, uniquement si une information indispensable manque.
2. Crée le dépôt GitHub **public** \`${repo}\`, écris tous les fichiers à sa racine (en reprenant tels quels les fichiers fournis du kit), puis commit et push sur \`main\`.
3. Active GitHub Pages (branche \`main\`, dossier racine) et donne-moi l'adresse : ${url}
4. Termine par une **check-list de test en séance** construite à partir du critère de réussite.
5. Ne publie jamais de fichier .csv, .xlsx ou de liste d'élèves dans le dépôt.`:`1. Reformule le besoin en 3 lignes. Pose-moi au maximum 3 questions, uniquement si une information indispensable manque ; sinon, code directement.
2. Je te joins le **kit de démarrage** (.zip) : reprends ses fichiers tels quels, sans les réécrire.
3. Fournis l'appli complète dans **un seul fichier .zip** dont la racine contient directement les fichiers (pas de sous-dossier englobant), prêt à déposer dans le dépôt \`${repo}\`.
4. Termine par une **check-list de test en séance** construite à partir du critère de réussite.`}
`},
 evolution(p,txt){return`# Évolution de l'appli ${p.app.nom||''} (${PR.url(p)})

Je te joins le .zip des fichiers actuels de l'appli. Rappel du besoin d'origine, qui reste prioritaire :
${PR.story(p,false)}

## Modifications demandées
${txt||'(à préciser)'}

## Règles
- Ne modifie que ce qui est nécessaire ; conserve \`eps-core.js\`${p.app.cible==='eleve'?' et `eleve-core.js`':''} sans les changer, ainsi que l'identifiant \`${p.app.id||'mon_app'}\` (les données déjà saisies doivent rester lisibles).
- Incrémente la version du cache dans \`sw.js\` pour que les appareils reçoivent la mise à jour.
- Rends-moi l'appli complète dans un seul .zip (fichiers à la racine) et liste en 3 lignes ce qui a changé.
`},
 fix(p,fails){return`# Corrections de l'appli ${p.app.nom||''} (${PR.url(p)})

La FabrikApplis EPS a vérifié le dépôt et signale ces problèmes :
${fails.map(f=>'- '+f).join('\n')}

Je te joins le .zip des fichiers actuels. Corrige uniquement ces points (sans changer \`eps-core.js\`${p.app.cible==='eleve'?' ni `eleve-core.js`':''}), incrémente la version du cache dans \`sw.js\`, et rends-moi l'appli complète dans un seul .zip (fichiers à la racine).
`},
 gitignore:`# Données élèves : ne JAMAIS publier dans ce dépôt public
*.csv
*.xlsx
*.xls
*.ods
donnees/
eleves/
# Fichiers système
.DS_Store
Thumbs.db
`,
 communaute(p){const j=PR.appsJson(p),b=p.besoin,s=p.partage||{};
  return{...j,auteur:(p.app.auteur||'').trim(),cible:p.app.cible||'prof',discipline:p.ctx.discipline||'EPS',activite:p.ctx.activite||'',niveau:b.niveau||'',
   besoin:{pour:b.pour||'',types:b.types||[],libelles:PR.besoinLabels(p),probleme:b.probleme||'',reussite:b.reussite||'',objectif:b.objectif||''},
   etablissement:(s.etablissement||'').trim(),academie:(s.academie||'').trim(),
   depot:p.gh&&p.gh.owner&&p.gh.repo?`https://github.com/${p.gh.owner}/${p.gh.repo}`:'',date:new Date().toISOString().slice(0,10)}},
 ticket(p){const e=PR.communaute(p);return{title:`[Communauté] ${e.emoji} ${e.nom} — ${e.activite||e.discipline}`,
  body:`## ${e.emoji} ${e.nom}
${e.desc}

**Adresse :** ${e.url}
**Code source :** ${e.depot||'—'}
**Pour :** ${e.cible==='eleve'?'les élèves (portail Applis EPS Élèves)':'le professeur (portail Mes Apps EPS)'} · ${e.discipline}${e.activite?' · '+e.activite:''}${e.niveau?' · '+e.niveau:''}
**Proposée par :** ${e.auteur||'—'}${e.etablissement?' — '+e.etablissement:''}${e.academie?' (académie de '+e.academie+')':''}

### Le besoin
${PR.story(p,false)}

${e.besoin.objectif?`**Objectif d'apprentissage :** ${e.besoin.objectif}

`:''}### Engagements de l'auteur
- [x] L'appli ne contient aucune donnée personnelle d'élève.
- [x] J'accepte la publication de mon nom, de l'appli et du besoin dans « Applis de la communauté ».

### Fiche (ne pas modifier)
\`\`\`json
${JSON.stringify(e,null,1)}
\`\`\`

---
*Proposition envoyée depuis la FabrikApplis EPS. Pour valider : tester l'appli, puis ajouter l'étiquette \`${COMMU.label}\` à ce ticket (l'ajout dans communaute.json est automatique).*
`}},
 appsJson(p){const u=PR.url(p);return{id:p.app.id||'mon_app',nom:p.app.nom||'',desc:p.app.desc||'',url:u,icon:u+'icons/icon-192.png',emoji:p.app.emoji||'🧭',couleur:`${p.app.c1||'#ff8a1f'},${p.app.c2||'#2f9bff'}`,categorie:p.app.categorie||'Outils',...(p.app.auteur?{auteur:p.app.auteur.trim()}:{})}}
};
/* Icône générée à partir de l'emoji et des couleurs de l'appli */
function makeIcon(p,size){return new Promise(ok=>{const c=document.createElement('canvas');c.width=c.height=size;const x=c.getContext('2d');
 const g=x.createLinearGradient(0,0,size,size);g.addColorStop(0,p.app.c1||'#ff8a1f');g.addColorStop(1,p.app.c2||'#2f9bff');x.fillStyle=g;
 const r=size*.22;x.beginPath();x.moveTo(r,0);x.arcTo(size,0,size,size,r);x.arcTo(size,size,0,size,r);x.arcTo(0,size,0,0,r);x.arcTo(0,0,size,0,r);x.fill();
 x.font=`${Math.round(size*.56)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText(p.app.emoji||'🧭',size/2,size*.54);
 c.toBlob(async b=>ok(new Uint8Array(await b.arrayBuffer())),'image/png')})}
async function kitFiles(p,opt={}){const f=[];const get=async n=>new Uint8Array(await (await fetch(n)).arrayBuffer());
 f.push({name:'eps-core.js',data:await get('eps-core.js')});
 if(p.app.cible==='eleve')f.push({name:'eleve-core.js',data:await get('eleve-core.js')});
 f.push({name:'icons/icon-192.png',data:await makeIcon(p,192)},{name:'icons/icon-512.png',data:await makeIcon(p,512)},{name:'.gitignore',data:PR.gitignore});
 if(!opt.publish)f.push({name:'CAHIER_DES_CHARGES.md',data:PR.build(p,p.voie)},{name:'LISEZMOI.txt',data:`Kit de démarrage « ${p.app.nom||'Mon appli'} » — FabrikApplis EPS\n\nJoignez ce .zip à votre conversation avec Claude, avec le prompt copié depuis FabrikApplis.\n- eps-core.js${p.app.cible==='eleve'?' et eleve-core.js':''} : liaison avec Mes Apps EPS (ne pas modifier)\n- icons/ : icônes de l'appli\n- .gitignore : empêche de publier des données élèves\n- CAHIER_DES_CHARGES.md : le prompt complet\n`});
 return f}
