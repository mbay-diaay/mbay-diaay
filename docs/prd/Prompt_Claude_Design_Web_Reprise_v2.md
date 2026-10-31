# Prompt de reprise — Application web Mbay Diaay (v2)

**À joindre :** `PRD_Web_Mbay_Diaay_v0.1.md`, `design-tokens.json`, `mbay_fixture_complet.json` (ou `mbay_fixture_leger.json` si la taille pose problème).
**Rappel :** le jeu de données est entièrement fictif. Ne joins jamais la base réelle.

---

## Prompt à copier

```
Reprends le prototype web « Mbay Diaay » existant et fais-le évoluer. Il est bon sur la couverture des écrans et sur les passerelles entre modules (producteur → carte, alerte → carte, etc.) : garde-les. Les corrections ci-dessous passent avant toute nouvelle fonction. Les exigences font foi dans PRD_Web_Mbay_Diaay_v0.1.md (références WE-xx).

─── 1. DONNÉES : REMPLACE LE JEU DE DÉMO PAR CELUI JOINT ───
Charge mbay_fixture_complet.json comme unique source de données. Il est fictif et aligné sur la base réelle :
1 317 producteurs · 11 SCOOP · 114 organisations de base · 1 534 parcelles · 1 941 cultures · 609 alertes · 5 doublons candidats (CNI identique) · 19 fusions historiques · 26 groupes de téléphone partagé · 28 chevauchements de parcelles.
- Ces chiffres doivent apparaître tels quels dans le tableau de bord, les compteurs et les en-têtes. Aucune autre valeur (pas de 948 producteurs, 96 alertes, 28 « doublons »).
- Les 28 chevauchements ne sont PAS des doublons : ce sont deux listes distinctes.
- Identifiants à utiliser partout : NIA-{Zone}-{SCOOP}-{n} pour les producteurs, NIA-…-P{n} pour les parcelles. Supprime les codes du type PL-0842.
- Les trois zones sont Nord, Centre, Sud (région des Niayes) : n'écris plus « Région de Louga ».
- Ne génère aucune donnée personnelle supplémentaire. CNI et téléphones restent masqués.

─── 2. CHARTE : PROVISOIRE ───
Il n'existe aucune charte officielle du CRADESC. N'écris nulle part « charte du CRADESC ». Applique design-tokens.json (provisoire) : couleurs de statut, de qualité et de carte viennent uniquement des jetons semantic.quality.* et semantic.map.*. Aucune couleur en dur (« vert émeraude », « brique »…).
Ajoute au système de design une palette catégorielle pour les cultures, regroupée par famille (champ « famille » du référentiel : Bulbes, Feuilles, Fruits-légumes, Racines, Arbres fruitiers, Céréales et légumineuses), jamais 35 couleurs distinctes.

─── 3. DOUBLONS : MISE EN CONFORMITÉ (WE-40 à WE-46) ───
C'est la fonction centrale de l'import. Refais l'écran ainsi :
a) File de revue avec compteurs par statut. Six statuts de classement : à examiner, confirmé, probable, non-doublon, erreur de saisie d'identité, non résolu. Le commentaire est obligatoire à chaque classement.
b) Comparaison côte à côte : nom, sexe, âge, téléphone, village, organisation, SCOOP, parcelles, cultures, journal de corrections. CNI masquée avec révélation confirmée et tracée.
c) Ajoute la carte des parcelles des deux producteurs dans la comparaison, avec la distance minimale entre elles.
d) Un téléphone partagé n'est jamais présenté comme un doublon : c'est un signal secondaire, dans un bloc distinct (26 groupes dans les données).
e) Classer « erreur de saisie d'identité » ne modifie aucune fiche. Montre-le.
f) Fusion : permission distincte, confirmation, journalisation. Elle conserve les identifiants d'origine et les parcelles. L'annulation reste possible plus tard depuis un écran « Fusions effectuées » (19 fusions historiques dans les données), pas seulement par un « Annuler » immédiat.
g) Aucune fusion automatique, nulle part.

─── 4. FICHE PRODUCTEUR ET ÉDITION ───
- Statut « recensé / membre » distinct, avec historique (WE-21, WE-24).
- Les champs sensibles (identité, CNI, téléphone) ne se modifient pas directement : l'action crée une demande de correction avant / après, à approuver (WE-22, WE-63). Pour un rôle avec droit direct, montre la variante.
- Chaque chiffre du tableau de bord affiche la part de fiches « À vérifier » (WE-12).

─── 5. PARCELLE ET CARTE (WE-50 à WE-57) ───
- Bascule « couleur par : statut / culture ». Statuts : relevée, validée, à reprendre, chevauchement.
- Les parcelles en alerte ne pulsent pas : trait épais + icône + hachure, couleur jamais seule, mouvement désactivé si prefers-reduced-motion.
- Fiche parcelle complète : superficie MESURÉE uniquement (pas de superficie « déclarée » : la base n'en contient pas) et superficie calculée par Kobo avec écart, précision GPS, contour brut et contour réparé superposables, producteur, cultures, versions, alertes, validation ou reprise avec motif.
- Anomalies à montrer : 6 parcelles de moins de 100 m², 2 de plus de 10 ha, 6 sans culture (filtre « anomalies »).
- Exports : PDF et GeoJSON seulement. Pas de Shapefile, pas d'outils de mesure (hors périmètre).

─── 6. IMPORT (WE-80 à WE-82) ───
La source est un fichier Excel à plusieurs feuilles, pas des CSV / GeoJSON / KML. Reprends la structure du bloc « import_a_blanc » du jeu de données : les 7 critères d'acceptation (volumes, liens orphelins, géométries, journal de traçabilité, fusions, CNI en clair, seconde passe), puis les constats (28 chevauchements, 6 micro-parcelles, 1 fiche sans nom, 5 CNI identiques, 26 groupes de téléphone, 253 fiches « à qualifier »). Ajoute l'historique des lots (fichier, empreinte, date, version du script, compteurs).

─── 7. ÉCRANS MANQUANTS À AJOUTER ───
- Liaison compte ↔ producteur quand un numéro couvre plusieurs fiches (WE-62).
- File des demandes de correction avant / après (WE-63).
- Appareils par utilisateur, révocation (WE-64).
- Référentiels : cultures et alias (79 saisies brutes), localités, types d'organisation, seuils (WE-70, WE-71).
- Qualification en lot des organisations « à qualifier » (WE-32).
- États sur chaque écran clé : chargement, vide, erreur, accès refusé avec message clair, succès.

─── 8. À CONSERVER TELS QUELS ───
Tiroirs latéraux (fiche rapide sans quitter la carte ou le tableau), compteur « x sur 1 317 • n filtres actifs [Réinitialiser] », sélecteur de densité, retours d'action discrets, journal d'audit avec liens vers l'entité concernée.

─── 9. FILTRES GLOBAUX ET RECHERCHE ───
Barre de contexte globale SCOOP + campagne (CHN, contre-saison), conservée dans l'URL. Pour un gestionnaire de SCOOP, le périmètre est imposé et non modifiable ; pour la faîtière, tout est en lecture seule. Recherche rapide Cmd+K sur producteur, parcelle, village : priorité basse, à faire en dernier.

─── 10. DÉMO ET SÉCURITÉ ───
Le sélecteur de rôles, l'OTP 123456 et le PIN 1234 sont réservés à la démo : place-les derrière un bandeau « Mode démonstration » bien visible et rends-les faciles à retirer. En production, les droits viennent du serveur.

─── ORDRE DE TRAVAIL ───
1. Données et identifiants (section 1). 2. Doublons (section 3). 3. Fiche parcelle et carte (section 5). 4. Fiche producteur et corrections (section 4). 5. Import (section 6). 6. Écrans manquants (section 7). 7. Filtres globaux et recherche (section 9).
Après chaque étape, liste en une phrase ce qui a changé. Signale en commentaire toute hypothèse là où le PRD ne tranche pas.

LIVRABLE FINAL
Prototype navigable à jour, plus la liste des composants réutilisables et des jetons utilisés, pour la transposition en Angular.
```

---

## Conseils

- Si l'outil sature, envoie les sections 1 à 3 d'abord, puis le reste.
- Vérifie après étape 1 : tableau de bord = 1 317 / 1 534 / 609 / 5 / 28.
- Le prototype sert de référence de parcours et de composants. Le code de production reste Angular (offre technique).
