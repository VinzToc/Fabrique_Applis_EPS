# Fabrique EPS

PWA du portail **Mes Apps EPS** qui aide un enseignant à créer son propre outil numérique avec Claude, en partant d'un **besoin réel** (élève ou enseignant), puis à le publier sur GitHub Pages.

## Les 5 étapes
1. **Besoin** : pour qui, quel besoin, situation problème, élèves concernés (dont besoins particuliers), pratique actuelle, critère de réussite, objectif d'apprentissage. Reformulation automatique du besoin.
2. **Conception** : qui manipule l'appli (prof → Mes Apps EPS / élèves → Applis EPS Élèves), moments, appareils, hors ligne, fonctionnalités suggérées à partir du besoin, données enregistrées (lignes / colonnes), identité de l'appli.
3. **Claude** : cahier des charges complet (prompt) intégrant l'API `eps-core.js` / `eleve-core.js`, la charte, le RGPD et l'accessibilité ; kit de démarrage .zip (eps-core.js, icônes générées, .gitignore) ; prompts d'évolution. Voie « conversation » ou « Claude Code ».
4. **GitHub** : jeton personnel (`public_repo`), création du dépôt, dépôt du .zip de Claude en un seul commit, blocage des fichiers de données élèves, ajout automatique des fichiers manquants, activation de GitHub Pages et suivi de la mise en ligne, QR code.
5. **Vérifier** : contrôle du dépôt (index, manifest, service worker, eps-core.js, appels d'enregistrement et d'export, icônes, absence de données, ressources externes, Pages), prompt de correction, ligne `apps.json` pour le portail.

## Déploiement
Créer le dépôt `Fabrique_EPS`, y déposer le contenu de ce dossier, puis Settings → Pages → Branch `main` / root.
URL : https://vinztoc.github.io/Fabrique_EPS/

Ligne à ajouter dans `apps.json` de Mes_Apps_EPS (icône à copier dans `icons/` du portail) :
```json
{"id":"fabrique","nom":"Fabrique EPS","desc":"Créer son propre outil à partir d'un besoin, le faire coder par Claude et le publier sur GitHub Pages","url":"https://vinztoc.github.io/Fabrique_EPS/","icon":"icons/icon-192-Fabrique.png","emoji":"🛠️","couleur":"#ff8a1f,#2f9bff","categorie":"Gestion"},
```

## Personnaliser
Les besoins types, fonctionnalités suggérées, activités et exemples sont dans `catalogue.js`. Le texte du cahier des charges est dans `prompt.js`.

## Données
Aucune donnée d'élève n'est traitée. Les projets sont enregistrés dans le navigateur (localStorage) et exportables en .json. Le jeton GitHub reste dans le navigateur et n'est envoyé qu'à api.github.com.
