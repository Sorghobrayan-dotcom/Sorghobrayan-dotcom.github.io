---
titre: Sniper Solana
afficher: true
cv: true
a_la_une: true
ordre: 2
annee: 2026
filtres: [finance, data, ia]
domaine_fr: Finance quantitative · Data
domaine_en: Quantitative finance · Data
surtitre_fr: Finance quantitative · Machine learning · On-chain
surtitre_en: Quantitative finance · Machine learning · On-chain
role_fr: Analyse et modélisation, en solo
role_en: Analysis and modelling, solo
resume_fr: Rétro-concevoir un robot de trading qui achète des jetons pump.fun dès leur création, comprendre sur quoi il décide, puis construire une réplique qui fait mieux. Une étude de cas sur ce que les backtests naïfs cachent.
resume_en: Reverse-engineering a trading bot that buys pump.fun tokens the moment they are created, understanding what it decides on, then building a replica that does better. A case study in what naive backtests hide.
image: /assets/img/solana-cover.webp
image_largeur: 1600
image_hauteur: 900
image_type: capture
fond: creme
image_alt_fr: "Histogramme des mises du robot : 94,6 % tombent exactement sur des multiples de 4/81 SOL."
image_alt_en: "Histogram of the bot’s stakes: 94.6% land exactly on multiples of 4/81 SOL."
liens:
  - type: autre
    url: https://www.kaggle.com/code/brayansorgho/a-sniper-that-bets-in-notches
    texte_fr: Notebook Kaggle
    texte_en: Kaggle notebook
  - type: code
    url: https://github.com/Sorghobrayan-dotcom/solana-sniper-reverse-engineering
    texte_fr: Code source
    texte_en: Source code
infos:
  - titre_fr: Données
    titre_en: Data
    texte_fr: 41,5 Go on-chain, 5 millions de créations
    texte_en: 41.5 GB on-chain, 5 million deployments
  - titre_fr: Méthode
    titre_en: Method
    texte_fr: DuckDB · LightGBM · SHAP
  - titre_fr: Validation
    titre_en: Validation
    texte_fr: Test hors échantillon sur juin 2026
    texte_en: Out-of-sample test on June 2026
  - titre_fr: Année
    titre_en: Year
    texte_fr: "2026"
sections:
  - titre_fr: Le problème
    titre_en: The problem
    texte_fr: Un portefeuille Solana a acheté 16 163 jetons pump.fun entre mars et juin 2026, presque toujours dans le bloc même de leur création, avant toute activité de marché. Trois questions guident l’étude. Que fait ce robot ? Sur quoi décide-t-il ? Peut-on faire mieux ?
    texte_en: A Solana wallet bought 16,163 pump.fun tokens between March and June 2026, almost always inside the very block where they were created, before any market activity. Three questions drive the study. What does the bot do? What does it decide on? Can we do better?
  - titre_fr: Trois découvertes
    titre_en: Three findings
    texte_fr: |
      - **La taille de la mise est un score de confiance.** 94,6 % des mises sont des multiples exacts de 4/81 SOL, et le cran prédit le résultat : 55,6 % de réussite pour les petits crans, 79,3 % pour les plus gros. Le robot ne décide pas en oui ou non, il gradue sa conviction.
      - **Il n’est pas dans le paquet de création.** Sa position médiane arrive 118 transactions après la création, dans le même bloc. C’est un écouteur rapide, pas un complice du créateur : une réplique qui suppose l’inverse teste une machine qui n’existe pas.
      - **Calculer les gains à partir des capitalisations les surestime de 7 à 17 fois.** Le rendement médian réel est de +6,6 %. Vendre 5 % de l’offre sur une courbe de liquidité rapporte bien moins que le prix affiché. Le backtest utilise donc un modèle d’exécution calibré sur 4 195 exécutions réelles.

      ![Performance du robot : durée de détention médiane de 6 secondes, sorties en plusieurs ventes, distribution des gains et courbe de capital.](/assets/img/solana-performance.webp)
    texte_en: |
      - **Position size is a confidence score.** 94.6% of stakes are exact multiples of 4/81 SOL, and the notch predicts the outcome: a 55.6% hit rate for the smallest notches, 79.3% for the largest. The bot does not decide yes or no, it grades its conviction.
      - **It is not in the creation bundle.** Its median position lands 118 transactions after creation, inside the same block. It is a fast listener, not the creator’s accomplice: a replica that assumes otherwise backtests a machine that does not exist.
      - **Computing P&L from market caps overstates it 7 to 17 times.** The real median return is +6.6%. Selling 5% of supply into a bonding curve realises far less than the displayed price. The backtest therefore uses an execution model calibrated on 4,195 real fills.

      ![Bot performance: 6-second median hold, laddered exits, P&L distribution and equity curve.](/assets/img/solana-performance.webp)
  - titre_fr: Données et méthode
    titre_en: Data and method
    texte_fr: |
      - **Un recensement, pas un échantillon** : 5 075 807 créations de jetons du 1er janvier au 30 juin 2026, sans rééchantillonnage. Le robot n’en achète que 0,53 %.
      - **Apprentissage de mars à mai, test sur tout le mois de juin**, jamais vu pendant l’entraînement.
      - **Aucune fuite d’information** : chaque variable n’utilise que des données strictement antérieures à la décision, et un audit recalcule l’historique par force brute pour le vérifier. Il a d’ailleurs trouvé et fait corriger un bogue.
      - Modèle LightGBM, interprété avec SHAP.
    texte_en: |
      - **A census, not a sample**: 5,075,807 token deployments from 1 January to 30 June 2026, with no resampling. The bot buys only 0.53% of them.
      - **Trained on March to May, tested on the whole of June**, never seen during training.
      - **No leakage**: every feature only uses data strictly before the decision, and an audit recomputes the history by brute force to check it. It caught and fixed a real bug.
      - LightGBM model, explained with SHAP.
  - titre_fr: Résultats
    titre_en: Results
    texte_fr: |
      - **PR-AUC de 0,21 au vrai taux de base**, 42 fois mieux que le hasard, ROC-AUC de 0,95. Sans les variables qui regardent les achats passés du robot, le PR-AUC reste à 0,10 : la moitié du pouvoir prédictif ne doit rien à la circularité.
      - **La réplique fait +11,9 % de rendement médian contre +6,6 % pour le robot**, sur 3 805 trades de juin.
      - **Ajuster la mise au cran prédit augmente le gain total de 34 % à capital égal** et réduit la perte maximale de 5,5 à 4,0 SOL.
    texte_en: |
      - **PR-AUC of 0.21 at the true base rate**, 42 times better than chance, ROC-AUC of 0.95. Without the features that look at the bot’s own past buys, PR-AUC stays at 0.10: half the predictive power owes nothing to circularity.
      - **The replica earns +11.9% median return against the bot’s +6.6%**, on 3,805 June trades.
      - **Sizing each stake by the predicted notch lifts total P&L by 34% at equal capital** and cuts the maximum drawdown from 5.5 to 4.0 SOL.
cv_titre_fr: "Rétro-conception d’un robot de trading Solana"
cv_titre_en: "Reverse-engineering a Solana trading bot"
cv_sous_titre_fr: Analyse en solo · DuckDB · LightGBM · SHAP · 41,5 Go de données on-chain
cv_sous_titre_en: Solo analysis · DuckDB · LightGBM · SHAP · 41.5 GB of on-chain data
cv_points_fr:
  - "Montré que le robot gradue sa mise selon sa confiance (réussite de 55,6 % à 79,3 % selon le cran) et qu’un backtest sur capitalisations surestime les gains de 7 à 17 fois."
  - "Réplique LightGBM testée hors échantillon sans fuite d’information : +11,9 % de rendement médian contre +6,6 %, et +34 % de gain à capital égal en dimensionnant les mises."
cv_points_en:
  - "Showed the bot grades its stake by confidence (55.6% to 79.3% hit rate by notch) and that a market-cap backtest overstates gains 7 to 17 times."
  - "Out-of-sample, leakage-free LightGBM replica: +11.9% median return vs +6.6%, and +34% P&L at equal capital through stake sizing."
seo_titre_fr: "Sniper Solana : rétro-conception d’un robot de trading"
seo_titre_en: "Solana sniper: reverse-engineering a trading bot"
seo_description: "Rétro-conception d’un robot de trading Solana sur 41,5 Go de données on-chain : la mise comme score de confiance, des backtests naïfs qui surestiment les gains de 7 à 17 fois, et une réplique LightGBM testée hors échantillon."
---
