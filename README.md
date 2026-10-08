# Portfolio — Brayan Sorgho

Site personnel bilingue (français / anglais) : profil, projets, parcours, distinctions et CV.
En ligne sur **https://sorghobrayan-dotcom.github.io/**

## Pages

| Fichier | Contenu |
|---|---|
| `index.html` | Accueil : profil, compétences, projets, parcours, distinctions, contact |
| `WIIGA.html` | Étude de cas — agent d’apprentissage par renforcement pour le pompage d’eau sous délestage |
| `YILGA.html` | Étude de cas — plateforme agrotech de recommandation de cultures |
| `SG-KOOM.html` | Étude de cas — traitement et réutilisation des eaux grises |
| `cv.html` | CV au format A4, en français ou en anglais, imprimable ou exportable en PDF depuis le navigateur |
| `404.html` | Page servie par GitHub Pages pour toute adresse inconnue |

## Organisation

```
assets/
  css/style.css   styles communs (variables, composants, mise en page)
  css/cv.css      mise en page A4 du CV, écran et impression
  js/main.js      langue, menu mobile, en-tête de l’accueil, lien actif, apparition au défilement, impression
  img/            icônes (sprite SVG) et favicon
```

## Choix techniques

- **HTML, CSS et JavaScript sans framework ni étape de build** : le dépôt est servi tel quel par GitHub Pages.
- **Bilingue sans rechargement** : chaque texte existe en `lang="fr"` et `lang="en"` ; le bouton FR / EN bascule instantanément, le choix est mémorisé et `?lang=en` ouvre directement la version anglaise.
- **Mobile d’abord** : grilles fluides, typographie en `clamp()`, menu repliable sous 880 px.
- **Accessibilité** : HTML sémantique, lien d’évitement, focus visible, attributs ARIA, respect de `prefers-reduced-motion`.
- **Amélioration progressive** : chaque page reste lisible et navigable sans JavaScript.
- **Performance** : images dimensionnées, chargement différé, icônes regroupées dans un seul sprite SVG.
- **Référencement** : métadonnées Open Graph, données structurées `schema.org/Person`, `sitemap.xml`.
- **Palette sobre** : blanc, gris ardoise et un seul bleu marine.

## Développer en local

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```
