# Portfolio de Brayan Sorgho

Site personnel bilingue (français / anglais) : profil, projets, parcours, distinctions et CV.
En ligne sur **https://sorghobrayan-dotcom.github.io/**

Tout le contenu (projets, distinctions, parcours, compétences, textes) vit dans quelques fichiers
simples. Le site **et le CV** se reconstruisent tout seuls à chaque modification : il n’y a jamais
de HTML à toucher pour ajouter un projet ou une distinction.

---

## Mettre le site à jour

### Méthode 1 : avec des formulaires (recommandée)

Une seule fois :

1. Ouvre **https://app.pagescms.org** et clique sur *Sign in with GitHub*.
2. Autorise l’application sur le dépôt `Sorghobrayan-dotcom.github.io`.
3. Ouvre le dépôt : les menus **Projets**, **Distinctions**, **Parcours**, **Compétences** et
   **Profil** apparaissent à gauche.

Ensuite : tu modifies, tu cliques sur *Save*, et le site est à jour 1 à 2 minutes plus tard.
Ça marche aussi depuis le téléphone.

### Méthode 2 : directement sur GitHub (ordinateur ou téléphone)

1. Ouvre le fichier à modifier sur github.com (par exemple `_data/distinctions.yml`).
2. Clique sur le crayon ✎, modifie, puis *Commit changes*.

### Méthode 3 : en local

```bash
bundle install
bundle exec jekyll serve
# puis ouvrir http://localhost:4000
```

---

## Recettes rapides

### Ajouter une distinction

Dans `_data/distinctions.yml`, ajoute un bloc **en haut** (le plus récent d’abord) :

```yaml
- annee: 2026
  prix_fr: Finaliste
  prix_en: Finalist
  evenement_fr: Nom du concours
  evenement_en: Competition name
  projet: WIIGA        # facultatif : la distinction apparaît aussi sur la page de WIIGA
  afficher: true
  cv: true
```

Elle apparaît automatiquement sur la page À propos, dans le CV, sur la page du projet, et le
compteur de distinctions de l’accueil augmente.

### Ajouter un projet

Crée un fichier dans `_projets/`, par exemple `_projets/MonProjet.md`
(le nom du fichier devient l’adresse : `/MonProjet.html`) :

```yaml
---
titre: MonProjet
afficher: true
cv: true
a_la_une: true
ordre: 1                  # 1 = en premier
annee: 2026
filtres: [ia, data]       # ia, data, eau, energie, agriculture, web, social
domaine_fr: IA · Data
domaine_en: AI · Data
role_fr: Conception et développement
role_en: Design and development
resume_fr: Une phrase qui dit ce que fait le projet.
resume_en: One sentence that says what the project does.
image: /assets/img/monprojet.webp
liens:
  - { type: code, url: "https://github.com/Sorghobrayan-dotcom/MonProjet", texte_fr: Code source, texte_en: Source code }
sections:
  - titre_fr: Le problème
    titre_en: The problem
    texte_fr: Ce qui ne va pas, pour qui.
    texte_en: What is wrong, and for whom.
  - titre_fr: Mon rôle
    titre_en: My role
    texte_fr: |
      - ce que j’ai conçu ;
      - ce que j’ai codé.
cv_points_fr:
  - Un point fort pour le CV, avec un chiffre si possible.
cv_points_en:
  - One strong point for the CV, with a figure if possible.
---
```

La page du projet, sa ligne dans la liste, son aperçu au survol, son filtre, son entrée dans le
CV et le lien « Projet suivant » se créent tout seuls. Les textes des `sections` acceptent le
Markdown (`**gras**`, listes avec `-`, liens `[texte](adresse)`).

### Passer d’une « phase » à une autre (et revenir)

| Je veux… | Je change… |
|---|---|
| Cacher un projet, une distinction ou une ligne de parcours | `afficher: false` (rien n’est supprimé ; `true` pour le remettre) |
| Garder un élément sur le site mais l’enlever du CV | `cv: false` |
| Sortir un projet de l’accueil | `a_la_une: false` |
| Changer l’ordre des projets | `ordre` |
| Annoncer que je cherche un stage | `_data/profil.yml` → `annonce:` → `afficher: true` et le texte |
| Changer de statut (stage, nouvelle école, poste) | `_data/profil.yml` → `titre_fr`, `titre_en`, `ecole_fr`… : repris partout (accueil, CV, Google) |
| Ajouter un stage, un job, du bénévolat | `_data/parcours.yml` → `experiences:` (la section s’affiche dès la première ligne) |

Chaque modification est enregistrée dans l’historique de GitHub : pour revenir en arrière, ouvre
le fichier sur github.com, clique sur *History* et recopie l’ancienne version.

### Ajouter une compétence et son badge

Dans `_data/competences.yml`, ajoute une ligne dans la bonne famille :

```yaml
    - { nom: Docker, icone: docker }
    - { nom: Analyse de données, nom_en: Data analysis, icone: graphique }
```

`cv: false` la retire du CV, `ruban: false` des bandeaux défilants de l’accueil.

**Logos disponibles** (`icone:`) : python, numpy, pandas, scipy, jupyter, anaconda, googlecolab,
kaggle, pytorch, tensorflow, keras, scikitlearn, huggingface, opencv, plotly, streamlit, fastapi,
flask, mlflow, apachespark, apacheairflow, duckdb, mysql, postgresql, sqlite, mongodb, html5, css,
javascript, typescript, react, nodedotjs, php, openjdk, go, flutter, c, cplusplus, r, julia, git,
github, gitlab, linux, ubuntu, gnubash, docker, latex, markdown, jekyll, figma, notion, arduino,
raspberrypi, espressif, firebase, supabase, vercel, netlify, selenium, langchain, ollama.

**Pictogrammes** : ia, renforcement, donnees, graphique, test, optimisation, jumeau, simulation,
eau, capteur, maison, prototype, micro, leadership, projet, equipe, pitch, code, reseau, securite,
langue, energie, maths, cloud, conception.

Pour ajouter un logo : copier le `<symbol>` voulu depuis [Simple Icons](https://simpleicons.org)
dans `assets/img/skills.svg`.

---

## Règles d’écriture

- Chaque texte existe en `_fr` et en `_en`. Si la version anglaise manque, le français est repris.
- Si un texte contient `:` suivi d’un espace, mets-le entre guillemets : `prix_fr: "Prix : jury"`.
  (Les formulaires de la méthode 1 s’en chargent tout seuls.)
- Inutile de soigner la typographie : apostrophes courbes, espaces insécables avant `: ; ? ! %`
  et suppression des tirets longs sont appliqués automatiquement.
- Le CV tient sur une page tant que possible ; s’il grandit, la suite passe proprement sur une
  deuxième page. Le bouton « Télécharger en PDF » de la page CV produit le fichier.

---

## Organisation

```
_data/
  profil.yml         titre, école, annonce, textes de présentation, qualités, chiffres de l’accueil
  parcours.yml       formation, expériences, responsabilités
  distinctions.yml   prix et classements
  competences.yml    compétences et badges
  filtres.yml        catégories des filtres de la page Projets
_projets/            un fichier par projet (WIIGA.md, YILGA.md, SG-KOOM.md…)
_includes/etudes/    études de cas détaillées écrites en HTML (WIIGA, YILGA, SG-KOOM)
_includes/, _layouts/  gabarits (en-tête, menu, pied de page, page projet)
index.html, projets.html, a-propos.html, contact.html, cv.html   les pages
assets/
  css/style.css      styles communs
  css/cv.css         mise en page A4 du CV, écran et impression
  js/main.js         langue, intro, menu, transitions, animations, heure locale
  img/               photos, couvertures, icônes (icons.svg) et logos des badges (skills.svg)
.pages.yml           formulaires de Pages CMS
```

## Choix techniques

- **Jekyll**, le générateur intégré à GitHub Pages : aucune étape de build à lancer soi-même,
  GitHub reconstruit le site à chaque modification.
- **Contenu séparé de la présentation** : les données dans `_data/` et `_projets/`, la mise en
  page dans les gabarits. Le CV est généré à partir des mêmes données que le site.
- **Bilingue sans rechargement** : le bouton FR / EN bascule instantanément, le choix est
  mémorisé et `?lang=en` ouvre directement la version anglaise.
- **Mobile d’abord**, **accessibilité** (HTML sémantique, focus visible, ARIA,
  `prefers-reduced-motion`), **amélioration progressive** (lisible sans JavaScript).
- **Palette neutre et lumineuse** : blanc, gris chauds et noir profond ; le vert n’apparaît que
  dans la pluie binaire de l’intro.
- **Référencement** : Open Graph, données structurées `schema.org/Person`, `sitemap.xml` généré.
