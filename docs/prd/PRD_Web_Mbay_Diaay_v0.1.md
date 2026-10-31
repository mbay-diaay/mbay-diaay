# PRD — Application web · Mbay Diaay

| | |
|---|---|
| **Version** | 0.1 — brouillon de travail interne |
| **Date** | 22 octobre 2026 |
| **Auteur** | Direction technique (Lead technique) |
| **Destinataire** | Développement web (Angular) |
| **Dépend de** | PRD Backend & API partagé v0.1 (référencé **[BE-xx]**) · PRD Mobile v0.1 · `design-tokens.json` |
| **Statut** | Non validé par le client. Alimente le L2 (fin S3) et le prototype L3 (fin S5). |

## 0. Convention de lecture

Statuts : **Confirmé** (source citée) · **Proposé** (ce que l'équipe **prévoit de développer** ; non validé par le client, il lui sera présenté comme une proposition et ses retours pourront le modifier) · **À valider** (décision ou information manquante).
Sources : **[NC]** Note de cadrage · **[OT]** Offre technique · **[BC]** Base CRADESC · **[BE]** PRD Backend · **[GT]** Grille des tâches Phase 1.

> Ce PRD décrit **ce que le web doit permettre**, pas son apparence détaillée. Les menus s'adaptent aux permissions de l'utilisateur, mais la sécurité repose **uniquement sur le backend** [BE P1] : masquer un bouton ne protège rien.

---

## 1. Objectif et utilisateurs

**Objectif.** Une application d'administration et de pilotage, en ligne uniquement [NC §7.5], pour gérer les membres et organisations, **qualifier les données** (doublons, alertes), visualiser les parcelles sur carte, produire les rapports et administrer les accès.

| Utilisateur | Usage principal sur le web | Statut |
|---|---|---|
| **Gestionnaire de SCOOP** | Membres, cotisations, réunions, rapports de sa SCOOP. | Confirmé [OT §4.3] |
| **Faîtière (USCN)** | Vue consolidée en **lecture**, sans droit d'administration. | Proposé (DEC 05) |
| **Administrateur CRADESC** | Supervision multi-SCOOP, utilisateurs et rôles, référentiels, imports, qualité des données, exports. | Confirmé |
| **Technicien** | Revue de qualité et validation de parcelles si besoin (usage secondaire). | Proposé |

> Les rôles sont des **paramètres** [BE-02]. Ce tableau est la base de travail ; il sera ajusté après la Vision des acteurs et des rôles validée par le client.

**Stack.** Angular + Leaflet [NC §7.1] ; l'affectation du web à Angular est confirmée dans [GT]. Le choix de la bibliothèque de composants est à faire (§9).

## 2. Principes

| # | Principe | Statut |
|---|---|---|
| W1 | **Permissions pilotées par le serveur** : l'interface demande « que puis-je faire ? » et affiche en conséquence ; aucune règle de droit n'est codée dans l'interface. | Confirmé [BE P1] |
| W2 | **Aucune action destructive silencieuse** : suppression, fusion, export nominatif demandent une confirmation et sont tracés. | Proposé |
| W3 | **Données personnelles masquées par défaut** (CNI, téléphone partiel selon rôle) ; l'affichage complet est une action volontaire et tracée. | Proposé [BE-71, BE-72] |
| W4 | **Tableaux sûrs à grande échelle** : pagination, tri et filtres côté serveur ; exports longs en tâche asynchrone. | Proposé |
| W5 | Un indicateur de **qualité** accompagne les chiffres : pas de statistique présentée sans signaler les fiches « à vérifier ». | Proposé |
| W6 | Aucune couleur, taille ni police en dur : tout vient de `design-tokens.json` (§8). | Proposé |
| W7 | Affichage adaptable aux écrans de téléphone si les gestionnaires n'ont pas d'ordinateur. | À valider (INF 44) |

---

## 3. Exigences par écran

Priorité MoSCoW [NC §5.7]. Les critères d'acceptation sont testables.

### 3.1 Accès

| ID | Exigence | Prio. | Statut |
|---|---|---|---|
| WE-01 | **Connexion** par téléphone + OTP ; authentification renforcée pour les comptes d'administration ; déconnexion automatique à l'expiration du jeton. | Must | Confirmé / Proposé [BE-10, BE-12] |
| WE-02 | **Menu et actions selon les permissions** reçues du serveur ; les écrans interdits renvoient un message clair, pas une page vide. | Must | Proposé |

### 3.2 Tableau de bord

| ID | Exigence | Prio. | Statut |
|---|---|---|---|
| WE-10 | **Tableau de bord administratif** : effectifs par SCOOP, répartition par sexe, tranche d'âge et situation de handicap, activité récente. Cotisations quand le module sera livré. | Must | Confirmé [OT §5.1] |
| WE-11 | Vue **consolidée** (CRADESC, faîtière) ou **limitée à sa SCOOP** (gestionnaire), selon le périmètre. | Must | Confirmé |
| WE-12 | Chaque chiffre affiche la part de fiches **« à vérifier »** (W5). | Should | Proposé |
| WE-13 | La définition de « jeune » est celle **configurée** [BE-24], jamais codée. | Must | À valider |

*Acceptation :* après l'import de la base CRADESC, les totaux (producteurs, parcelles, cultures, répartition par SCOOP) **correspondent à la feuille de synthèse de la base** ; changer la définition de « jeune » change le chiffre sans modifier le code.

### 3.3 Producteurs

| ID | Exigence | Prio. | Statut |
|---|---|---|---|
| WE-20 | **Annuaire** avec recherche multicritère : nom, village, SCOOP, organisation, sexe, tranche d'âge, statut qualité, culture. Pagination serveur. | Must | Confirmé [OT §5.1] |
| WE-21 | **Fiche producteur** : identité (CNI masquée), contacts, organisation et statut (recensé / membre), parcelles, cultures par campagne, photos, alertes, historique des modifications. | Must | Confirmé |
| WE-22 | **Création et modification** avec contrôles de saisie (téléphone, âge, CNI en avertissement). Les champs sensibles passent par une demande de correction si l'utilisateur n'a pas le droit d'édition directe. | Must | Proposé [BE-81] |
| WE-23 | **Export** de la liste en CSV ou PDF ; un export **nominatif** exige une permission dédiée et est tracé. | Must / Should | Confirmé [OT §5.1, NC §10.2] |
| WE-24 | Rattachement et statut d'adhésion modifiables avec historique. | Must | Proposé [BE-21] |

*Acceptation :* retrouver un producteur par village et sexe ; ouvrir sa fiche ; la CNI apparaît masquée, la révélation complète est enregistrée dans le journal d'audit.

### 3.4 Organisations

| ID | Exigence | Prio. | Statut |
|---|---|---|---|
| WE-30 | **Arborescence** faîtière → SCOOP → organisation de base → producteurs, avec effectifs. | Must | Proposé [BE-01] |
| WE-31 | **Types d'organisation configurables** (GIE, section, association, groupement, individuel, membre direct). | Must | Proposé |
| WE-32 | **Écran de qualification** : lister les organisations « à qualifier » (environ 250 fiches dans [BC]) et leur attribuer un type, en lot. | Must | Proposé |
| WE-33 | Gestion de la liste des SCOOP (11 dans [BC], dix dans [NC]). | Must | À valider |

### 3.5 Qualité des données et doublons

Cœur de la valeur de la phase d'import [NC §6]. Aucun traitement automatique destructif [BE-62].

| ID | Exigence | Prio. | Statut |
|---|---|---|---|
| WE-40 | **File de revue des doublons** : liste filtrable des candidats (statut, SCOOP, signal) avec compteurs par statut. | Must | Proposé [BE-61] |
| WE-41 | **Comparaison côte à côte** de deux fiches : nom, sexe, âge, téléphone, village, organisation, section, SCOOP, parcelles et cultures, journal de corrections. CNI **masquée par défaut** avec révélation tracée. | Must | Proposé |
| WE-42 | **Classement du cas** : à examiner, confirmé, probable, non-doublon, erreur de saisie d'identité, non résolu — avec commentaire obligatoire. | Must | Proposé [BE-61] |
| WE-43 | **Fusion** réservée à une permission dédiée, après confirmation : conserve les identifiants d'origine et les liens producteur ↔ parcelle ↔ culture ; journalisée ; **réversible** depuis le même écran. | Must | Confirmé [NC §6.5, BE-62] |
| WE-44 | **File d'alertes** (type, sévérité, entité, statut ouvert / en vérification / résolu / rejeté, commentaire). Dans [BC], 609 alertes sont ouvertes sans statut. | Must | Proposé [BE-60] |
| WE-45 | **Lot d'actions** sur les alertes de même nature (ex. confirmer toutes les durées d'entretien atypiques d'un enquêteur), toujours avec aperçu avant validation. | Should | Proposé |
| WE-46 | Un **téléphone partagé** n'est jamais présenté comme un doublon à lui seul : il apparaît comme un signal secondaire. | Must | Proposé |

*Acceptation :* classer un cas en « erreur de saisie d'identité » sans modifier aucune fiche ; fusionner deux fiches puis **défaire** la fusion et retrouver l'état initial, parcelles comprises.

### 3.6 Cartographie

| ID | Exigence | Prio. | Statut |
|---|---|---|---|
| WE-50 | **Carte interactive** des parcelles (Leaflet), filtrable par SCOOP, culture, campagne et producteur ; fonds OpenStreetMap et satellite. | Must | Confirmé [OT §5.5] |
| WE-51 | **Statuts visuels** des parcelles (relevée, validée, à reprendre, chevauchement) via les jetons `semantic.map.*`. | Must | Proposé |
| WE-52 | **Fiche parcelle** : superficie déclarée et mesurée avec écart, précision GPS, contour brut et contour réparé, producteur, cultures, historique des versions. | Must | Proposé [BE-31, BE-32] |
| WE-53 | **Validation** d'une géométrie : valider ou demander de reprendre, avec motif. | Must | Confirmé [NC §8.4] |
| WE-54 | **Liste des chevauchements** entre parcelles de producteurs différents (28 paires à plus de 20 % dans [BC], dont 7 à plus de 90 %) avec vue côte à côte sur la carte. | Should | Proposé [BE-33] |
| WE-55 | **Performance** : simplification des contours selon le niveau de zoom (1 534 parcelles, contours jusqu'à 530 points). | Must | Proposé |
| WE-56 | **Export cartographique** PDF et GeoJSON, permission dédiée. | Should | Confirmé [OT §5.5] |
| WE-57 | Analyses spatiales : répartition des cultures, assolements, densité par localité, superficies par spéculation. | Should | Confirmé [OT §5.5] |

*Acceptation :* afficher les 1 534 parcelles importées sans blocage ; cliquer sur une parcelle réparée affiche les deux contours.

### 3.7 Utilisateurs, rôles et accès

| ID | Exigence | Prio. | Statut |
|---|---|---|---|
| WE-60 | **Utilisateurs** : création, rattachement à une organisation, désactivation. | Must | Confirmé [OT §4.3] |
| WE-61 | **Rôles et permissions éditables** (tables de configuration) ; affectation d'un rôle à une organisation [BE-02]. | Must | Proposé |
| WE-62 | **Liaison compte ↔ producteur** : valider la correspondance quand un numéro couvre plusieurs fiches. | Must | Proposé [BE-14] |
| WE-63 | **File des demandes de correction** (producteurs connectés) : voir avant / après, approuver ou refuser avec motif. | Should | Proposé [BE-81] |
| WE-64 | **Appareils** : liste par utilisateur, révocation à distance. | Must | Proposé [BE-13] |
| WE-65 | **Permission de lecture complète de la CNI** attribuable par rôle. | Must | À valider (Q4) |

### 3.8 Référentiels

| ID | Exigence | Prio. | Statut |
|---|---|---|---|
| WE-70 | Gestion des **cultures** (35 valeurs normalisées) et de leurs **alias** (79 saisies brutes) ; rattacher une saisie brute à une culture. | Must | Proposé [BE-42] |
| WE-71 | Gestion des **localités**, **types de campagne**, **types d'organisation**, **seuils** (précision GPS, bornes de superficie). | Must | Proposé |

### 3.9 Import de données

| ID | Exigence | Prio. | Statut |
|---|---|---|---|
| WE-80 | **Écran d'import** (administrateur) : téléverser le fichier, lancer un import **à blanc**, consulter le rapport, puis lancer l'import final. | Must | Proposé [BE §6] |
| WE-81 | **Rapport** : volumes importés, rejets, réparations de contours, alertes ouvertes, doublons candidats, écarts de réconciliation. | Must | Proposé |
| WE-82 | **Historique des lots** (fichier, empreinte, date, version du script, compteurs) ; un import identique ne crée rien de nouveau. | Must | Proposé |

### 3.10 Rapports, journal d'audit, administratif

| ID | Exigence | Prio. | Statut |
|---|---|---|---|
| WE-90 | **Rapports consolidés** PDF (base) et export Excel/CSV, générés en tâche asynchrone. | Must / Should | Confirmé [OT §5.3] |
| WE-91 | **Journal d'audit** consultable (filtres par utilisateur, entité, période), en lecture seule. | Must | Confirmé [OT §4.3] |
| WE-92 | **Réunions, procès-verbaux, cotisations, documents** (module administratif) : détaillés dans un PRD ultérieur. Règle fixée : validation électronique horodatée par les membres du bureau, pas de signature à valeur probante sans prestataire de confiance. | Must | Proposé [NC §5.2] |

---

## 4. Navigation (liste, sans maquette)

| Zone | Contenu | Visible pour |
|---|---|---|
| Tableau de bord | WE-10 à WE-13 | Tous |
| Producteurs | Annuaire, fiche | Gestionnaire, CRADESC, faîtière (lecture) |
| Organisations | Arborescence, qualification | Gestionnaire, CRADESC |
| Qualité | Doublons, alertes | CRADESC, gestionnaire (selon permission) |
| Carte | Parcelles, chevauchements | Tous (périmètre) |
| Rapports | Exports et rapports | Selon permission |
| Administration | Utilisateurs, rôles, référentiels, imports, journal d'audit | Administrateur CRADESC |

La visibilité est **calculée à partir des permissions**, pas de cette table.

## 5. Dépendances avec le backend

| Besoin web | Exigence backend |
|---|---|
| Connexion, rôles, périmètres | BE-02 à BE-04, BE-10 à BE-14 |
| Producteurs, adhésions, contacts | BE-20 à BE-24 |
| Parcelles, géométries, SIG | BE-30 à BE-34 |
| Doublons, alertes, fusion | BE-60 à BE-62 |
| CNI, corrections | BE-70 à BE-75, BE-80 à BE-83 |
| Import | BE §6 |
| Conventions d'API (pagination, erreurs, versions) | BE §7 |

**À figer avant le sprint 1 :** pagination et filtres standard, format des erreurs, endpoint de permissions de l'utilisateur courant, format des exports asynchrones.

## 6. Exigences non fonctionnelles

| Exigence | Cible | Statut |
|---|---|---|
| Accessibilité | Contrastes AA ; navigation au clavier ; couleur jamais seule | Proposé |
| Performance | Listes paginées côté serveur ; carte fluide sur les 1 534 parcelles importées | Proposé |
| Sécurité | Aucune donnée personnelle dans les logs front ; jetons à durée courte | Confirmé [OT §10.2] |
| Compatibilité | Navigateurs récents ; adaptation aux écrans de téléphone | À valider (INF 44) |
| Langue | Français ; interface prête à être traduite (wolof à évaluer) | Proposé (DEC 13) |
| Tests | Parcours critiques automatisés (connexion, fusion réversible, permissions) | Proposé |

## 7. Hors périmètre

Détail des modules commercial, exploitation et agronomique ; place de marché, paiement en ligne, SMS/USSD, intégration météo [NC §5.8].

## 8. Charte graphique provisoire

Aucune charte n'a été transmise (INF 61 à 64). Le web utilise `design-tokens.json` :

- générer des **variables CSS** depuis le fichier ; les composants n'utilisent que ces variables ;
- à réception de la charte, **seule la section `primitive` change** ;
- le logo et les mentions obligatoires des partenaires (INF 63) sont des **ressources remplaçables**, jamais incrustées dans le code ;
- états de qualité et de carte : jetons `semantic.quality.*` et `semantic.map.*` ;
- le nom affiché, le logo, le favicon et la page de connexion viennent de `GET /v1/branding` [BE-90, BE-92] ;
- les **rapports PDF et exports** sont mis en forme par le backend avec la même charte [BE-91] : le web n'a aucune mise en forme d'impression à gérer.

## 9. Questions ouvertes

| Réf. | Question | Décideur |
|---|---|---|
| Q1 | Bibliothèque de composants Angular (Angular Material, PrimeNG ou autre) : celle qui se thème le mieux par variables CSS. | Lead technique |
| Q2 | Droits du rôle faîtière (DEC 05) et du gestionnaire sur les utilisateurs et les exports. | CRADESC |
| Q3 | Qui peut lire la CNI en clair et fusionner des fiches ? | CRADESC |
| Q4 | Les gestionnaires disposent-ils d'un ordinateur (INF 44) ? | CRADESC |
| Q5 | Rapports et indicateurs attendus par le CRADESC et les bailleurs (INF 35). | CRADESC |
| Q6 | Définition officielle de « jeune ». | CRADESC |
| Q7 | Liste officielle des SCOOP et statut du GIE / de la section. | CRADESC |

## 10. Critères d'acceptation globaux

1. Un administrateur importe la base CRADESC à blanc, lit le rapport, puis importe : **les totaux affichés correspondent à la source**.
2. Un utilisateur ne voit et ne peut modifier que ce que son rôle et son périmètre autorisent, **y compris en appelant l'API directement**.
3. Un cas de doublon est classé, fusionné, puis **défait**, sans perte de parcelle ni de culture.
4. Les 1 534 parcelles s'affichent sur la carte avec leur statut.
5. Changer `primitive` dans les tokens change l'apparence de toute l'application sans toucher au code des composants.
