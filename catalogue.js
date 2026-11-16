/* catalogue.js — besoins types, fonctionnalités suggérées, listes et exemples de projets. Modifiable librement. */
const CAT={
 pour:[
  {v:'eleve',t:'🎒 Les élèves',s:'apprendre, se situer, progresser'},
  {v:'prof',t:'🧑‍🏫 L\'enseignant',s:'observer, organiser, évaluer'},
  {v:'deux',t:'🤝 Les deux',s:'un outil partagé en séance'}],
 besoins:{
  eleve:[
   {v:'consignes',t:'Comprendre la consigne (reformulation)',fn:['Consigne reformulée en plusieurs versions (texte simple, pictogrammes, audio)','Fiches consignes illustrées (schémas, pictogrammes)','Lecture vocale des consignes']},
   {v:'rythme',t:'Progresser à son rythme, à son niveau',fn:['Diagnostic initial qui oriente vers une tâche adaptée','Parcours à paliers avec choix du niveau d\'entrée','Variables réglables (distance, temps, matériel, cible)','Contrat ou projet personnel d\'apprentissage']},
   {v:'etayage',t:'Être guidé pas à pas (aides graduées)',fn:['Aides graduées à débloquer (indice 1, 2, 3)','Démonstration par schéma animé ou vidéo locale','Question-guide avant de recommencer','Repères concrets à placer sur le terrain']},
   {v:'analyser',t:'Analyser sa pratique',fn:['Vidéo différée avec ralenti (sans enregistrement)','Repères d\'observation à cocher','Mise en relation ressenti / résultat','Comparaison de ses essais successifs']},
   {v:'situer',t:'Se situer, s\'auto-évaluer',fn:['Grille d\'auto-évaluation par critères','Repères de réussite visuels (couleurs, paliers)','Comparaison avec son objectif personnel']},
   {v:'feedback',t:'Recevoir un retour immédiat',fn:['Retour immédiat après chaque essai','Calculs automatiques (vitesse, allure, score…)','Code couleur réussi / à retravailler']},
   {v:'trace',t:'Garder une trace de ses progrès',fn:['Carnet de bord daté','Graphique de progression','Export de ses résultats (.xlsx) pour le professeur']},
   {v:'role',t:'Tenir un rôle (arbitre, observateur, coach)',fn:['Fiche d\'observation avec compteurs','Aide à l\'arbitrage (règles, score, temps)','Conseils à transmettre au partenaire']},
   {v:'motivation',t:'S\'engager, rester motivé',fn:['Défis et paliers à débloquer','Badges ou étoiles de réussite','Choix de son parcours']},
   {v:'cooperer',t:'Coopérer avec ses pairs',fn:['Co-évaluation en binôme','Répartition des rôles dans le groupe','Projet de groupe (chorégraphie, enchaînement)']},
   {v:'inclusion',t:'Être inclus (besoins particuliers)',fn:['Interface simplifiée, gros boutons','Pictogrammes et peu de texte','Adaptation des barèmes et des tâches']}],
  prof:[
   {v:'observer',t:'Observer, évaluer en direct',fn:['Saisie rapide par élève pendant l\'activité','Grille de critères avec barème','Note calculée automatiquement']},
   {v:'temps',t:'Gérer le temps de la séance',fn:['Minuteur / chronomètre grand format','Signaux sonores et alternance travail-repos','Rotation automatique des ateliers']},
   {v:'groupes',t:'Organiser groupes, équipes, rotations',fn:['Tirage d\'équipes équilibrées','Constitution de groupes de niveau','Planning de rotation des ateliers']},
   {v:'suivi',t:'Suivre les progrès sur le cycle',fn:['Historique daté par élève','Bilan de classe (moyennes, graphiques)','Synthèse par élève dans Mes Apps EPS']},
   {v:'admin',t:'Gagner du temps administratif',fn:['Appel / présence rapide','Export .xlsx vers Mes Apps EPS','Aucune ressaisie le soir']},
   {v:'differencier',t:'Différencier, adapter',fn:['Tâches à plusieurs niveaux','Barèmes adaptés (inaptitudes, PAP, PAI)','Suggestions de remédiation']},
   {v:'securite',t:'Sécuriser la pratique',fn:['Check-list sécurité avant activité','Rappel des règles de sécurité','Suivi des inaptitudes du jour']},
   {v:'affichage',t:'Projeter, afficher pour la classe',fn:['Mode vidéoprojecteur / TNI','Affichage plein écran lisible de loin','Tableau des résultats en direct']}]},
 public:['Aucun en particulier','Troubles DYS','TDAH','TSA','Élèves allophones','Handicap moteur','Handicap visuel','Inaptitudes partielles'],
 niveaux:['','Cycle 3 (6e)','Cycle 4 (5e-4e-3e)','Seconde','Première','Terminale','CAP','Bac Pro','BTS / Supérieur','Primaire','Tous niveaux'],
 cible:[
  {v:'prof',t:'🧑‍🏫 Le professeur',s:'→ portail Mes Apps EPS (liste Pronote)'},
  {v:'eleve',t:'🎒 Les élèves',s:'→ portail Applis EPS Élèves (identification de l\'élève)'}],
 moments:['Avant la séance','Pendant la séance','Après la séance','À la maison'],
 appareils:['Tablette du prof','Smartphone du prof','Tablettes partagées (élèves)','Smartphones des élèves','Vidéoprojecteur / TNI','Ordinateur'],
 modes:[
  {v:'aucune',t:'Pas d\'enregistrement de données élèves'},
  {v:'lignes',t:'Plusieurs saisies datées par élève (recommandé)'},
  {v:'colonnes',t:'Une seule saisie par élève (mise à jour)'}],
 types:['Texte','Nombre','Durée (mm:ss)','Note /20','Niveau (A/B/C/D)','Choix dans une liste','Oui / Non','Date'],
 categories:['Performances','Réalisations','Projets','Evaluations','Tests','Outils','Statistiques','Gestion'],
 activites:['Demi-fond','Course de vitesse','Course d\'orientation','Natation','Lancers','Sauts','Badminton','Tennis de table','Volley-ball','Handball','Basket-ball','Football','Rugby','Ultimate','Acrosport','Gymnastique','Danse','Arts du cirque','Escalade','Musculation','Step','Cross training','Yoga / Relaxation','Boxe française','Judo / Lutte'],
 voies:[
  {v:'chat',t:'💬 Claude (conversation)',s:'claude.ai ou l\'appli Claude'},
  {v:'code',t:'🧑‍💻 Claude Code',s:'relié à GitHub (avancé)'}],
 repoMode:[{v:'new',t:'➕ Créer un nouveau dépôt'},{v:'old',t:'♻️ Mettre à jour un dépôt existant'}],
 themes:[
  {v:'individualiser',t:'🎯 Individualiser les apprentissages'},
  {v:'adapter',t:'🔄 Adapter, reformuler'},
  {v:'accompagner',t:'🤝 Accompagner l\'élève'},
  {v:'analyser',t:'🔍 Analyser sa pratique'},
  {v:'orga',t:'🧰 Organiser, observer, suivre'}],
 exemples:[]
};
/* Exemples : X(thème, titre, besoin, contexte, appli). Champs : [nom, type, unité/valeurs]. */
(function(){const X=(th,t,b,c,a)=>CAT.exemples.push({th,t,p:{
  besoin:{pour:b.pour||'eleve',types:b.types,probleme:b.pb,niveau:b.niv||'',effectif:b.eff||'',public:b.pub||['Aucun en particulier'],actuel:b.act||'',reussite:b.ok,objectif:b.obj||''},
  ctx:{activite:c.act,moments:c.mom||['Pendant la séance'],appareils:c.app||['Tablettes partagées (élèves)'],horsLigne:true},
  app:{cible:a.cible||'eleve',nom:a.nom,id:a.id,emoji:a.em,desc:a.desc,categorie:a.cat,c1:a.c1||'#ff8a1f',c2:a.c2||'#2f9bff',donnees:{mode:a.mode||'lignes',champs:(a.ch||[]).map(([n,t,u])=>({n,t,u:u||''}))}}}});

/* ── Individualiser ── */
X('individualiser','🏊 Natation : chacun son contrat',
 {types:['rythme','situer','trace'],pb:'Dans une même classe, des non-nageurs côtoient des nageurs confirmés : la même tâche met les uns en échec et ennuie les autres, et chacun ignore ce qu\'il doit viser.',niv:'Seconde',eff:'28',pub:['Inaptitudes partielles'],act:'Groupes de niveau fixés au début du cycle, consignes identiques à l\'intérieur de chaque groupe.',ok:'Chaque élève nage sur un contrat de distance et d\'allure adapté à son palier, et sait à la fin de la séance s\'il l\'a tenu et quel est le contrat suivant.',obj:'AFL1 – Produire et répartir intentionnellement ses efforts en fonction de ses ressources'},
 {act:'Natation',app:['Tablette du prof'],mom:['Pendant la séance','Après la séance']},
 {nom:'NageContrat',id:'nagecontrat',em:'🏊',desc:'Contrats de nage par paliers, choisis après un test et validés à chaque séance',cat:'Performances',c1:'#2fd0ff',c2:'#0a4fd0',ch:[['Palier','Choix dans une liste','1, 2, 3, 4, 5'],['Distance','Nombre','m'],['Temps','Durée (mm:ss)'],['Contrat tenu','Oui / Non'],['Nage','Choix dans une liste','Crawl, Dos, Brasse']]});
X('individualiser','🧗 Escalade : la bonne voie pour progresser',
 {types:['rythme','situer','trace'],pb:'Les élèves choisissent des voies trop faciles (pour réussir) ou trop dures (par défi) et progressent peu ; ils ne savent pas quelle voie tenter ensuite.',niv:'Cycle 4 (5e-4e-3e)',eff:'24',act:'Liste des voies affichée, choix libre, pas de suivi des réalisations.',ok:'Après chaque essai, l\'élève sait quelle voie tenter ensuite selon sa réussite et sa manière de grimper (à vue, après travail, avec chutes).',obj:'AFL1 – S\'engager à l\'aide d\'une motricité spécifique pour réaliser en sécurité un itinéraire'},
 {act:'Escalade',app:['Tablettes partagées (élèves)']},
 {nom:'GrimpeProjet',id:'grimpeprojet',em:'🧗',desc:'Carnet de voies et proposition de la prochaine voie adaptée au niveau',cat:'Projets',c1:'#ffb02f',c2:'#d0420a',ch:[['Voie','Texte'],['Cotation','Choix dans une liste','4a, 4b, 4c, 5a, 5b, 5c, 6a'],['Réussite','Choix dans une liste','À vue, Après travail, Avec chutes, Non réussie'],['Ressenti','Choix dans une liste','Facile, Juste, Trop dur']]});
X('individualiser','🏋️ Musculation : mon programme, ma charge',
 {types:['rythme','trace','feedback'],pb:'Les élèves recopient les charges de leurs camarades sans lien avec leur mobile (forme, volume, puissance) ni avec leurs sensations ; ils ne savent pas ajuster d\'une séance à l\'autre.',niv:'Terminale',eff:'30',act:'Carnet papier, souvent perdu ou incomplet ; calcul des charges approximatif.',ok:'Chaque élève construit sa séance selon son mobile, et l\'appli lui propose la charge de la séance suivante à partir de ses répétitions et de son ressenti (RPE).',obj:'AFL1 – S\'entraîner, individuellement ou collectivement, pour développer ses ressources et s\'entretenir'},
 {act:'Musculation',app:['Smartphones des élèves','Tablettes partagées (élèves)']},
 {nom:'MuscuProjet',id:'muscuprojet',em:'🏋️',desc:'Programme personnel selon le mobile choisi et ajustement des charges',cat:'Projets',c1:'#ff5e7a',c2:'#7a2fff',ch:[['Mobile','Choix dans une liste','Forme, Volume, Puissance'],['Exercice','Texte'],['Charge','Nombre','kg'],['Séries','Nombre'],['Répétitions','Nombre'],['RPE','Choix dans une liste','1 à 10']]});

/* ── Adapter, reformuler ── */
X('adapter','🤸 Gymnastique : la consigne autrement',
 {types:['consignes','situer','inclusion'],pb:'Les fiches d\'éléments gymniques sont trop chargées : les élèves DYS ou allophones ne savent pas ce qu\'ils doivent réaliser ni à quoi on reconnaît la réussite.',niv:'Cycle 3 (6e)',eff:'27',pub:['Troubles DYS','Élèves allophones','TDAH'],act:'Fiches A4 avec texte et petits croquis, explications orales répétées.',ok:'Chaque élève choisit la version de consigne qui lui convient (texte court, pictogrammes, audio) et valide lui-même un élément à l\'aide de 2 ou 3 critères visuels.',obj:'AFL1 – Réaliser une prestation corporelle destinée à être vue et appréciée'},
 {act:'Gymnastique'},
 {nom:'GymConsigne',id:'gymconsigne',em:'🤸',desc:'Fiches d\'éléments en 3 versions (texte simple, pictos, audio) et auto-validation',cat:'Réalisations',c1:'#ff8a1f',c2:'#c040ff',ch:[['Agrès','Choix dans une liste','Sol, Poutre, Saut, Barres'],['Élément','Texte'],['Niveau','Niveau (A/B/C/D)'],['Réussi','Oui / Non']]});
X('adapter','🏀 Basket : adapter pour participer',
 {pour:'deux',types:['inclusion','differencier','role'],pb:'Les élèves en inaptitude partielle ou en situation de handicap sont mis à l\'écart (feuille de match) au lieu d\'apprendre ; je manque de temps pour leur préparer une tâche adaptée.',niv:'Seconde',eff:'30',pub:['Inaptitudes partielles','Handicap moteur'],act:'L\'élève est arbitre ou marque le score, sans objectif d\'apprentissage ni évaluation.',ok:'En moins d\'une minute, je trouve pour l\'élève une tâche ou un rôle adapté à sa contrainte du jour, avec des critères d\'évaluation correspondants.',obj:'AFL – S\'engager dans un rôle social et contribuer au projet de son équipe'},
 {act:'Basket-ball',app:['Tablette du prof','Smartphone du prof']},
 {cible:'prof',nom:'AdaptBasket',id:'adaptbasket',em:'🏀',desc:'Tâches et rôles adaptés selon la contrainte de l\'élève, avec critères d\'évaluation',cat:'Evaluations',c1:'#ff7a1f',c2:'#ffd27a',ch:[['Contrainte','Choix dans une liste','Pas de course, Pas de saut, Membre supérieur, Effort limité, Autre'],['Tâche ou rôle','Texte'],['Critère atteint','Niveau (A/B/C/D)']]});
X('adapter','💃 Danse : oser créer',
 {types:['consignes','cooperer','etayage'],pb:'Face à la consigne « inventez une chorégraphie », les groupes restent bloqués ou reproduisent des danses connues ; la consigne de création est trop ouverte pour eux.',niv:'Cycle 4 (5e-4e-3e)',eff:'26',pub:['TSA'],act:'Consigne orale + liste de procédés au tableau.',ok:'Chaque groupe tire des contraintes simples (inducteur, procédé, espace) reformulées en défis, et compose une phrase dansée de 30 secondes dans la séance.',obj:'AFL1 – S\'exprimer devant les autres par une prestation artistique'},
 {act:'Danse'},
 {nom:'DanseDéfis',id:'dansedefis',em:'💃',desc:'Générateur de contraintes de composition reformulées en défis simples',cat:'Projets',c1:'#ff4fa0',c2:'#7a2fff',ch:[['Inducteur','Texte'],['Procédés utilisés','Choix dans une liste','Canon, Unisson, Accumulation, Cascade, Miroir'],['Durée','Durée (mm:ss)'],['Auto-évaluation','Niveau (A/B/C/D)']]});

/* ── Accompagner ── */
X('accompagner','🦘 Saut en longueur : trouver son élan',
 {types:['etayage','feedback','rythme'],pb:'Beaucoup d\'élèves mordent ou sautent loin de la planche : ils ne savent pas étalonner leur course d\'élan et se découragent après quelques essais.',niv:'Cycle 4 (5e-4e-3e)',eff:'28',act:'Conseils oraux individuels, impossible à donner à tous.',ok:'Grâce à des aides graduées, chaque élève fixe sa marque d\'élan et réussit au moins 3 appels sans mordre dans la séance.',obj:'AFL1 – Produire et répartir ses efforts pour réaliser la meilleure performance'},
 {act:'Sauts'},
 {nom:'ÉlanSaut',id:'elansaut',em:'🦘',desc:'Étalonnage de l\'élan pas à pas avec aides graduées',cat:'Performances',c1:'#ffd21f',c2:'#ff5e00',ch:[['Nombre de foulées','Nombre'],['Marque d\'élan','Nombre','m'],['Appel','Choix dans une liste','Mordu, Bien placé, Trop loin'],['Performance','Nombre','m'],['Aide utilisée','Choix dans une liste','Aucune, Indice 1, Indice 2, Indice 3']]});
X('accompagner','🏓 Tennis de table : le coach qui aide vraiment',
 {types:['role','etayage','cooperer'],pb:'Les élèves coachs ne savent pas quoi dire : ils encouragent mais ne donnent pas de conseil utile en lien avec ce qu\'ils voient.',niv:'Seconde',eff:'24',act:'Fiche coach papier avec une liste de conseils, peu utilisée.',ok:'Après chaque set, le coach repère le problème principal du joueur et lui transmet un conseil adapté ; le joueur indique si le conseil l\'a aidé.',obj:'AFL3 – Choisir et assumer les rôles qui permettent un fonctionnement collectif solidaire'},
 {act:'Tennis de table'},
 {nom:'CoachPing',id:'coachping',em:'🏓',desc:'Problème observé → conseil adapté, et retour du joueur',cat:'Réalisations',c1:'#2fd07a',c2:'#0a6bd0',ch:[['Problème observé','Choix dans une liste','Balles hautes, Fautes de service, Coup droit, Revers, Placement'],['Conseil donné','Texte'],['Effet','Choix dans une liste','A aidé, Un peu, Pas aidé']]});
X('accompagner','🧭 Course d\'orientation : ne plus se perdre',
 {types:['etayage','analyser','situer'],pb:'Des élèves se perdent, abandonnent ou suivent les autres ; je ne peux pas aider tout le monde sur un grand terrain.',niv:'Cycle 4 (5e-4e-3e)',eff:'28',pub:['TDAH'],act:'Retour au poste de départ pour demander de l\'aide.',ok:'Un élève en difficulté débloque des aides graduées (orienter sa carte, ligne d\'arrêt, point d\'attaque) et trouve sa balise sans revenir au départ.',obj:'AFL1 – Choisir et conduire un déplacement adapté aux différents milieux'},
 {act:'Course d\'orientation',app:['Smartphones des élèves','Tablettes partagées (élèves)'],mom:['Pendant la séance','Après la séance']},
 {nom:'BoussolAide',id:'boussolaide',em:'🧭',desc:'Aides graduées pour trouver sa balise et bilan des aides utilisées',cat:'Performances',c1:'#2fd0a0',c2:'#ff8a1f',ch:[['Balise','Texte'],['Aides utilisées','Nombre'],['Temps','Durée (mm:ss)'],['Trouvée','Oui / Non']]});

/* ── Analyser sa pratique ── */
X('analyser','🏐 Volley-ball : se voir pour comprendre',
 {types:['analyser','role','feedback'],pb:'Les élèves ne perçoivent pas leurs erreurs de placement en manchette et en service : mes retours oraux ne leur parlent pas.',niv:'Seconde',eff:'30',act:'Démonstrations et consignes orales.',ok:'En binôme, chaque élève se voit en différé (sans enregistrement), coche 2 repères observables et choisit une piste de travail pour l\'essai suivant.',obj:'AFL2 – S\'organiser tactiquement pour gagner le duel ou la rencontre'},
 {act:'Volley-ball'},
 {nom:'VolleyMiroir',id:'volleymiroir',em:'🏐',desc:'Vidéo différée avec repères d\'observation et piste de travail',cat:'Réalisations',c1:'#ffd27a',c2:'#2f9bff',ch:[['Geste','Choix dans une liste','Service, Manchette, Passe haute, Attaque'],['Repères observés','Texte'],['Piste de travail','Texte']]});
X('analyser','🤾 Handball : analyser nos tirs',
 {pour:'eleve',types:['analyser','cooperer','trace'],pb:'Après les matchs, les équipes ne savent pas expliquer pourquoi elles ont perdu : elles ne relient pas zones de tir et efficacité.',niv:'Première',eff:'30',act:'Feuille de marque avec seulement le score.',ok:'À la fin du match, l\'équipe voit sa carte de tirs (zones, réussite) et formule un projet tactique pour la rencontre suivante.',obj:'AFL1 – Réaliser des choix tactiques et stratégiques pour faire basculer le rapport de force'},
 {act:'Handball',mom:['Pendant la séance','Après la séance']},
 {nom:'TirsHand',id:'tirshand',em:'🤾',desc:'Carte des tirs par zone et projet tactique d\'équipe',cat:'Statistiques',c1:'#ff5e00',c2:'#0a4fd0',ch:[['Zone','Choix dans une liste','Aile G, Arrière G, Centre, Arrière D, Aile D, 6 m'],['Type de tir','Choix dans une liste','En appui, En suspension, Après course'],['Résultat','Choix dans une liste','But, Arrêt, Hors cadre']]});
X('analyser','🏃 Vitesse : où est-ce que je perds du temps ?',
 {types:['analyser','situer','trace'],pb:'Les élèves ne savent pas quelle phase de leur course améliorer (départ, mise en action, vitesse maximale) : ils ne connaissent que leur temps final.',niv:'Cycle 4 (5e-4e-3e)',eff:'28',act:'Un seul chronométrage, sur 50 m.',ok:'Chaque élève compare ses temps sur 3 segments au fil des essais, identifie sa phase la plus faible et choisit un atelier pour la travailler.',obj:'AFL1 – Produire une performance optimale, mesurable à une échéance donnée'},
 {act:'Course de vitesse',app:['Tablette du prof','Tablettes partagées (élèves)']},
 {nom:'SprintPhases',id:'sprintphases',em:'🏃',desc:'Temps intermédiaires par segment et phase à travailler',cat:'Performances',c1:'#ff3f3f',c2:'#ffb02f',ch:[['Essai','Nombre'],['Temps 0-15 m','Nombre','s'],['Temps 15-30 m','Nombre','s'],['Temps 30-50 m','Nombre','s'],['Phase à travailler','Choix dans une liste','Départ, Mise en action, Vitesse maximale']]});

/* ── Organiser, observer, suivre ── */
X('orga','🏃 Allure en demi-fond',
 {types:['feedback','trace'],pb:'En demi-fond, les élèves ne savent pas s\'ils courent à l\'allure prévue ; je ne peux pas donner un retour à 30 élèves à chaque tour.',niv:'Seconde',eff:'30',act:'Chrono + fiche papier tenue par un binôme, calculs faits par moi après la séance.',ok:'À la fin de chaque course, l\'élève voit son allure réelle et l\'écart à son projet, sans calcul de ma part.',obj:'AFL1 – Gérer son effort pour réaliser la meilleure performance'},
 {act:'Demi-fond',app:['Smartphones des élèves']},
 {nom:'AllureRun',id:'allurerun',em:'🏃',desc:'Allure de course en direct et carnet de bord de l\'élève',cat:'Performances',ch:[['Distance','Nombre','m'],['Temps','Durée (mm:ss)'],['Allure prévue','Nombre','km/h'],['Allure réalisée','Nombre','km/h'],['Ressenti','Choix dans une liste','Facile, Moyen, Difficile']]});
X('orga','🏸 Observation en badminton',
 {pour:'deux',types:['role','observer'],pb:'Les observateurs décrochent vite et je n\'ai pas de données fiables sur les points gagnés et perdus.',niv:'Cycle 4 (5e-4e-3e)',eff:'28',pub:['Troubles DYS'],act:'Feuilles de pointage papier, souvent incomplètes.',ok:'Chaque joueur repart avec la répartition de ses points gagnés/perdus et un conseil.',obj:'AFL1 – Réaliser des choix tactiques pour gagner le match'},
 {act:'Badminton'},
 {cible:'prof',nom:'BadObs',id:'badobs',em:'🏸',desc:'Observation des points gagnés et perdus, bilan par joueur',cat:'Statistiques',ch:[['Adversaire','Texte'],['Points gagnés','Nombre'],['Points perdus','Nombre'],['Point fort','Texte']]});
X('orga','⏱️ Rotation d\'ateliers',
 {pour:'prof',types:['temps','groupes'],pb:'Je passe trop de temps à siffler les rotations et à vérifier qui va où dans un circuit à 6 ateliers.',niv:'Tous niveaux',eff:'32',act:'Chrono et tableau Velleda.',ok:'Les rotations s\'enchaînent seules avec un affichage clair de « qui va où », je peux circuler et observer.'},
 {act:'Cross training',app:['Vidéoprojecteur / TNI','Tablette du prof']},
 {cible:'prof',nom:'RotaFlow',id:'rotaflow',em:'⏱️',desc:'Minuteur de rotation d\'ateliers avec affichage des groupes',cat:'Outils',mode:'aucune'});
})();
