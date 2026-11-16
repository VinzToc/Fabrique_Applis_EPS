/* catalogue.js — besoins types, fonctionnalités suggérées, listes et exemples de projets. Modifiable librement. */
const CAT={
 pour:[
  {v:'eleve',t:'🎒 Les élèves',s:'apprendre, se situer, progresser'},
  {v:'prof',t:'🧑‍🏫 L\'enseignant',s:'observer, organiser, évaluer'},
  {v:'deux',t:'🤝 Les deux',s:'un outil partagé en séance'}],
 besoins:{
  eleve:[
   {v:'consignes',t:'Comprendre ce qu\'il faut faire',fn:['Fiches consignes illustrées (schémas, pictogrammes)','Lecture vocale des consignes','Niveaux de difficulté au choix']},
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
 exemples:[
  {t:'🏃 Allure en demi-fond',p:{besoin:{pour:'eleve',types:['feedback','trace'],probleme:'En demi-fond, les élèves ne savent pas s\'ils courent à l\'allure prévue ; je ne peux pas donner un retour à 30 élèves à chaque tour.',niveau:'Seconde',effectif:'30',public:['Aucun en particulier'],actuel:'Chrono + fiche papier tenue par un binôme, calculs faits par moi après la séance.',reussite:'À la fin de chaque course, l\'élève voit son allure réelle et l\'écart à son projet, sans calcul de ma part.',objectif:'AFL1 – Gérer son effort pour réaliser la meilleure performance'},ctx:{activite:'Demi-fond',moments:['Pendant la séance'],appareils:['Smartphones des élèves'],horsLigne:true},app:{cible:'eleve',nom:'AllureRun',id:'allurerun',emoji:'🏃',desc:'Allure de course en direct et carnet de bord de l\'élève',categorie:'Performances',donnees:{mode:'lignes',champs:[{n:'Distance',t:'Nombre',u:'m'},{n:'Temps',t:'Durée (mm:ss)',u:''},{n:'Allure prévue',t:'Nombre',u:'km/h'},{n:'Allure réalisée',t:'Nombre',u:'km/h'},{n:'Ressenti',t:'Choix dans une liste',u:'Facile, Moyen, Difficile'}]}}}},
  {t:'🏸 Observation en badminton',p:{besoin:{pour:'deux',types:['role','observer'],probleme:'Les observateurs décrochent vite et je n\'ai pas de données fiables sur les points gagnés et perdus.',niveau:'Cycle 4 (5e-4e-3e)',effectif:'28',public:['Troubles DYS'],actuel:'Feuilles de pointage papier, souvent incomplètes.',reussite:'Chaque joueur repart avec la répartition de ses points gagnés/perdus et un conseil.',objectif:'AFL1 – Réaliser des choix tactiques pour gagner le match'},ctx:{activite:'Badminton',moments:['Pendant la séance'],appareils:['Tablettes partagées (élèves)'],horsLigne:true},app:{cible:'prof',nom:'BadObs',id:'badobs',emoji:'🏸',desc:'Observation des points gagnés et perdus, bilan par joueur',categorie:'Statistiques',donnees:{mode:'lignes',champs:[{n:'Adversaire',t:'Texte',u:''},{n:'Points gagnés',t:'Nombre',u:''},{n:'Points perdus',t:'Nombre',u:''},{n:'Point fort',t:'Texte',u:''}]}}}},
  {t:'🤸 Projet en acrosport',p:{besoin:{pour:'eleve',types:['consignes','cooperer','situer'],probleme:'Les groupes perdent du temps à choisir les figures et ne savent pas si elles sont validées.',niveau:'Cycle 4 (5e-4e-3e)',effectif:'26',public:['Élèves allophones'],actuel:'Fiches de figures photocopiées, validation orale.',reussite:'Chaque groupe construit son enchaînement et sait quelles figures sont validées et à quel niveau de difficulté.',objectif:'AFL1 – Concevoir et réaliser un enchaînement à visée esthétique'},ctx:{activite:'Acrosport',moments:['Pendant la séance'],appareils:['Tablettes partagées (élèves)'],horsLigne:true},app:{cible:'eleve',nom:'AcroProjet',id:'acroprojet',emoji:'🤸',desc:'Choix des figures, construction de l\'enchaînement et auto-validation',categorie:'Projets',donnees:{mode:'lignes',champs:[{n:'Figure',t:'Texte',u:''},{n:'Niveau',t:'Niveau (A/B/C/D)',u:''},{n:'Validée',t:'Oui / Non',u:''}]}}}},
  {t:'⏱️ Rotation d\'ateliers',p:{besoin:{pour:'prof',types:['temps','groupes'],probleme:'Je passe trop de temps à siffler les rotations et à vérifier qui va où dans un circuit à 6 ateliers.',niveau:'Tous niveaux',effectif:'32',public:['Aucun en particulier'],actuel:'Chrono et tableau Velleda.',reussite:'Les rotations s\'enchaînent seules avec un affichage clair de « qui va où », je peux circuler et observer.',objectif:''},ctx:{activite:'Cross training',moments:['Pendant la séance'],appareils:['Vidéoprojecteur / TNI','Tablette du prof'],horsLigne:true},app:{cible:'prof',nom:'RotaFlow',id:'rotaflow',emoji:'⏱️',desc:'Minuteur de rotation d\'ateliers avec affichage des groupes',categorie:'Outils',donnees:{mode:'aucune',champs:[]}}}}]
};
