---
titre: SkillBadge
afficher: true
cv: true
a_la_une: true
ordre: 2
annee: 2026
filtres: [web, blockchain]
domaine_fr: Blockchain · Web
domaine_en: Blockchain · Web
surtitre_fr: Blockchain · Web · Éducation
surtitre_en: Blockchain · Web · Education
role_fr: Conception et développement
role_en: Design and development
resume_fr: Le registre souverain des compétences numériques. Chaque compétence est validée par un formateur, gravée sous forme de badge NFT sur la blockchain Polygon et vérifiable par n’importe quel recruteur.
resume_en: A sovereign registry of digital skills. Each skill is validated by a trainer, recorded as an NFT badge on the Polygon blockchain and verifiable by any recruiter.
image: /assets/img/skillbadge-portfolio.webp
image_largeur: 1280
image_hauteur: 800
image_type: capture
fond: sable
image_alt_fr: "Portfolio d’une apprenante dans SkillBadge : score, badges certifiés React.js, PostgreSQL et Docker, chacun avec son jeton et son hash vérifiés on-chain."
image_alt_en: "A learner’s portfolio in SkillBadge: score and certified React.js, PostgreSQL and Docker badges, each with its token and on-chain verified hash."
liens:
  - type: code
    url: https://github.com/Sorghobrayan-dotcom/skillbadge-hackaton2026
    texte_fr: Code source
    texte_en: Source code
infos:
  - titre_fr: Contexte
    titre_en: Context
    texte_fr: MIABE Hackathon 2026, Burkina Faso
  - titre_fr: Équipe
    titre_en: Team
    texte_fr: Youngtech
  - titre_fr: Technologies
    titre_en: Stack
    texte_fr: React · Node.js · Solidity
sections:
  - titre_fr: Le problème
    titre_en: The problem
    texte_fr: Au Burkina Faso comme dans toute l’Afrique de l’Ouest, les compétences numériques sont difficiles à prouver. Les CV sont déclaratifs, les diplômes papier falsifiables, et un recruteur n’a aucun moyen simple de vérifier ce qu’un candidat sait vraiment faire.
    texte_en: In Burkina Faso, as across West Africa, digital skills are hard to prove. CVs are self-declared, paper diplomas can be forged, and recruiters have no simple way to check what a candidate can actually do.
  - titre_fr: La solution
    titre_en: The solution
    texte_fr: |
      SkillBadge relie trois acteurs autour d’un registre commun :

      - **l’apprenant** soumet ses projets, reçoit des badges certifiés et partage un identifiant unique avec les recruteurs ;
      - **le formateur** évalue chaque projet, attribue un niveau et un score, puis émet le badge NFT, ou refuse avec un motif ;
      - **le recruteur** vérifie un portfolio grâce à cet identifiant (impossible de chercher par nom ou par e-mail), envoie des offres et peut certifier une expérience vécue dans son entreprise.

      Chaque badge porte un jeton unique et un hash de transaction : il est horodaté, infalsifiable et vérifiable par tous.

      ![Écran de connexion de SkillBadge : choix du profil apprenant, recruteur ou formateur.](/assets/img/skillbadge-connexion.webp)
    texte_en: |
      SkillBadge connects three roles around a shared registry:

      - **the learner** submits projects, receives certified badges and shares a unique ID with recruiters;
      - **the trainer** reviews each project, sets a level and a score, then issues the NFT badge, or rejects it with a reason;
      - **the recruiter** checks a portfolio with that ID (searching by name or email is impossible), sends job offers and can certify experience gained in their company.

      Every badge carries a unique token and a transaction hash: it is timestamped, tamper-proof and verifiable by anyone.

      ![SkillBadge sign-in screen: choosing the learner, recruiter or trainer profile.](/assets/img/skillbadge-connexion.webp)
  - titre_fr: Technique
    titre_en: Technology
    texte_fr: |
      - **Interface** : React 18 dans un seul fichier HTML, sans étape de build ; trois espaces, notifications et score dynamique.
      - **API** : Node.js, Express et MongoDB ; authentification JWT, validation des entrées, limitation de débit et en-têtes de sécurité.
      - **Blockchain** : contrat intelligent Solidity (OpenZeppelin) déployé avec Hardhat sur le réseau de test Polygon Amoy, appelé depuis l’API avec ethers.js, et métadonnées des badges servies par l’API.
    texte_en: |
      - **Interface**: React 18 in a single HTML file, with no build step; three workspaces, notifications and a live score.
      - **API**: Node.js, Express and MongoDB; JWT authentication, input validation, rate limiting and security headers.
      - **Blockchain**: a Solidity smart contract (OpenZeppelin) deployed with Hardhat on the Polygon Amoy test network, called from the API with ethers.js, with badge metadata served by the API.
cv_titre_fr: "SkillBadge : registre des compétences sur blockchain"
cv_titre_en: "SkillBadge: blockchain skills registry"
cv_sous_titre_fr: React · Node.js · Express · MongoDB · Solidity · Polygon
cv_points_fr:
  - Certification des compétences numériques par badges NFT sur Polygon, classée parmi les meilleurs projets du MIABE Hackathon 2026.
  - Application React à trois espaces, API Node.js et MongoDB, contrat Solidity déployé avec Hardhat.
cv_points_en:
  - Digital skills certified as NFT badges on Polygon, ranked among the top projects at the MIABE Hackathon 2026.
  - React app with three workspaces, Node.js and MongoDB API, Solidity contract deployed with Hardhat.
seo_titre_fr: "SkillBadge : compétences certifiées sur blockchain"
seo_titre_en: "SkillBadge: blockchain-certified skills"
seo_description: "SkillBadge : plateforme de certification des compétences numériques par badges NFT sur Polygon, classée parmi les meilleurs projets du MIABE Hackathon 2026."
---
