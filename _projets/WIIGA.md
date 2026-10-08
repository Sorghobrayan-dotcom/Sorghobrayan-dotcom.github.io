---
titre: WIIGA
afficher: true
cv: true
a_la_une: true
ordre: 1
annee: 2026
filtres: [ia, eau, energie]
domaine_fr: IA · Eau · Énergie
domaine_en: AI · Water · Energy
role_fr: Conception et développement
role_en: Design and development
resume_fr: "Amener l’eau là où elle est attendue, quand elle est attendue, sur l’énergie la plus propre disponible : un agent d’apprentissage par renforcement qui pilote une station de pompage soumise aux délestages électriques."
resume_en: "Bringing water where it is needed, when it is needed, on the cleanest power available: a reinforcement-learning agent that runs a pumping station through scheduled power cuts."
image: /assets/img/wiiga-console.webp
image_largeur: 1200
image_hauteur: 750
image_type: capture
fond: creme
image_alt_fr: "Console de la démo WIIGA à 13 h : les trois réservoirs se remplissent, les trois pompes tournent à 100 % sur le solaire."
image_alt_en: "WIIGA demo console at 1 p.m.: the three tanks are filling, all three pumps run at 100% on solar power."
liens:
  - type: demo
    url: https://sorghobrayan-dotcom.github.io/WIIGA/
    texte_fr: Essayer la démo
    texte_en: Try the demo
  - type: code
    url: https://github.com/Sorghobrayan-dotcom/WIIGA
    texte_fr: Code source
    texte_en: Source code
infos:
  - titre_fr: Rôle
    titre_en: Role
    texte_fr: Concepteur et développeur
    texte_en: Designer and developer
  - titre_fr: Origine
    titre_en: Origin
    texte_fr: Ideathon Deep Learning, en prépa
    texte_en: Deep Learning ideathon, during prep school
  - titre_fr: Technologies
    titre_en: Stack
    texte_fr: Python · PPO · Gymnasium
  - titre_fr: Licence
    titre_en: Licence
    texte_fr: Open source (MIT)
cv_titre_fr: "WIIGA : pompage d’eau piloté par IA"
cv_titre_en: "WIIGA: AI-driven water pumping"
cv_date: Open source
cv_sous_titre_fr: Python · Stable-Baselines3 (PPO) · Gymnasium · NumPy · SciPy
cv_points_fr:
  - Agent d’apprentissage par renforcement qui décide chaque heure quelle pompe tourne, à quelle puissance et sur quelle énergie, dans une ville soumise aux délestages.
  - Jumeau numérique d’une station de 22 000 habitants, calibré sur trois années de données climatiques.
  - "Sur 365 jours simulés : 67 % d’heures sans eau en moins pour le quartier le plus exposé face à la règle manuelle, et 48 % de CO₂ en moins face à la pratique actuelle."
cv_points_en:
  - Reinforcement-learning agent that decides every hour which pump runs, at what power and on which energy source, in a city facing scheduled power cuts.
  - Digital twin of a station serving 22,000 people, calibrated on three years of climate data.
  - "Over 365 simulated days: 67% fewer dry hours for the worst-served district than the hand-written rulebook, 48% less CO₂ than current practice."
seo_titre_fr: "WIIGA : pompage d’eau piloté par IA sous délestage"
seo_titre_en: "WIIGA: AI-driven water pumping under power cuts"
seo_description: "WIIGA : un agent d’apprentissage par renforcement (PPO) qui pilote une station de pompage soumise aux délestages. Jumeau numérique, résultats mesurés sur 365 jours, code open source."
partage_titre: "WIIGA : l’eau là où elle est attendue, quand elle est attendue"
partage_description: Un agent PPO qui pilote le pompage d’eau d’une ville soumise aux délestages électriques.
etude: WIIGA
sommaire:
  - { id: en-bref, fr: En bref, en: Overview }
  - { id: probleme, fr: Le problème, en: The problem }
  - { id: solution, fr: La solution, en: The solution }
  - { id: idees, fr: Ce qui le distingue, en: What sets it apart }
  - { id: resultats, fr: Résultats, en: Results }
  - { id: limites, fr: Limites assumées, en: Stated limits }
  - { id: role, fr: Mon rôle, en: My role }
  - { id: technique, fr: Stack technique, en: Tech stack }
  - { id: reproduire, fr: Reproduire, en: Reproduce }
---
