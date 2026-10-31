# État du projet Mbay Diaay

| | |
|---|---|
| **Dernière mise à jour** | 31 octobre 2026 |
| **Version suivie** | Prototype web, données fictives, sans serveur |
| **Usage** | Document **interne** : suivre ce qui est fait, ce qui manque, et préparer les propositions au client. La section 6 est la matière à présenter ; les sections 7 et 8 ne sont pas à transmettre telles quelles. |
| **Sources** | PRD Web v0.1, PRD Backend v0.1, PRD Mobile v0.1, décisions du porteur du projet, code du dépôt |

## Comment tenir ce document à jour

Mettre à jour **à chaque lot livré** (fusion d'une PR significative), dans le même commit que le code :

1. Changer le statut des lignes concernées (sections 2 à 4) et la date ci-dessus.
2. Ajouter une ligne au **journal** (section 9) : date, ce qui change, preuve (test, capture, PR).
3. Déplacer ce qui est terminé hors des listes « à faire » ; ajouter ce qui a été découvert.
4. Une proposition acceptée par le client passe de la section 6 à la section 2, avec sa référence de devis.
5. Recompter la synthèse (section 1). Statuts autorisés : **Fait**, **Partiel**, **À faire**, **À valider**, **Hors prototype**.

---

## 1. Synthèse

| Indicateur | Valeur |
|---|---|
| Exigences du PRD Web (WE-xx) | 44 : **29 faites**, **12 partielles**, **3 à faire** |
| Principes du PRD Web (W1 à W7) | 7 : 5 faits, 2 partiels (voir section 2) |
| Backend (PRD BE) | Non commencé : le prototype fonctionne sans serveur |
| Tests automatiques | 50 tests, 5 fichiers (règles métier, droits, périmètre, authentification, import, routage) |
| Qualité du code | TypeScript strict, 0 erreur ESLint, Prettier appliqué, build de production vert |
| Intégration continue | Définie (`.github/`), à activer au passage sur GitHub |
| Prêt pour la production | **Non** : voir section 5 |

Lecture : l'interface et les règles métier du PRD Web sont couvertes à environ 65 % en complet et 27 % en partiel. Ce qui bloque la mise en service n'est plus l'interface, mais le **serveur**, la **sécurité de production** et trois décisions du client (charte graphique, hébergement, fournisseur d'envoi d'e-mails).

---

## 2. Couverture des exigences du client (PRD Web)

### 2.1 Principes

| ID | Principe | Statut | Remarque |
|---|---|---|---|
| W1 | Permissions pilotées par le serveur | Partiel | L'interface lit les droits (`permissions.ts`) sans les coder. Le serveur qui décide reste à construire. |
| W2 | Aucune action destructrice silencieuse | Fait | Confirmations et journal d'audit sur fusion, export nominatif, révocation. |
| W3 | Données personnelles masquées | Fait | CNI et téléphone masqués ; révélation tracée. |
| W4 | Tableaux sûrs à grande échelle | Partiel | Pagination côté navigateur ; passage côté serveur avec l'API. |
| W5 | Indicateur de qualité sur les chiffres | Fait | Part de fiches « à vérifier » sur chaque indicateur. |
| W6 | Aucune valeur de design en dur | Fait | Variables de `styles.css`, vérifié en revue. |
| W7 | Adaptation aux téléphones | Fait | Passe d'adaptation du 23 octobre (360 px à 1440 px). Reste à valider sur appareils réels (INF 44). |

### 2.2 Accès, tableau de bord

| ID | Exigence | Statut | Détail |
|---|---|---|---|
| WE-01 | Connexion sécurisée | Fait | **Écart assumé avec le PRD** : e-mail + mot de passe + code reçu par e-mail (SMS reporté), mot de passe oublié, verrouillage, expiration à 30 min. Voir `docs/DEVELOPPEMENT.md`, chapitre 5. Démonstration seulement. |
| WE-02 | Menu et actions selon les permissions | Fait | Écran interdit avec message clair. |
| WE-10 | Tableau de bord administratif | Fait | Sans les cotisations (module à venir). |
| WE-11 | Vue consolidée ou limitée à sa SCOOP | Fait | Périmètre appliqué partout et testé par rôle (23 octobre). |
| WE-12 | Part de fiches « à vérifier » | Fait | |
| WE-13 | Définition de « jeune » configurable | Fait | Modifiable dans Référentiels ; la décision de seuil reste **à valider** avec le client. |

### 2.3 Producteurs et organisations

| ID | Exigence | Statut | Détail |
|---|---|---|---|
| WE-20 | Annuaire multicritère | Partiel | Manque le filtre par organisation ; pagination côté navigateur. |
| WE-21 | Fiche producteur | Partiel | Manque les **photos** (dépend de la collecte Kobo, voir `docs/notes/Note_demande_photos_Kobo.md`). |
| WE-22 | Création et modification | Partiel | Modification par demande de correction : fait. **Création d'un producteur : absente.** |
| WE-23 | Export CSV ou PDF | Partiel | CSV anonymisé et nominatif tracés ; PDF absent. |
| WE-24 | Rattachement et statut d'adhésion | Partiel | Statut modifiable avec historique ; changement d'organisation à ajouter. |
| WE-30 | Arborescence des organisations | Fait | Liste, arborescence, fiche d'une organisation. |
| WE-31 | Types d'organisation configurables | Partiel | Attribution et qualification faites ; ajout ou retrait d'un type depuis l'interface à faire. |
| WE-32 | Qualification en lot | Fait | |
| WE-33 | Gestion de la liste des SCOOP | À faire | La liste est figée dans les données. 11 dans la base, 10 dans la note de cadrage : **à clarifier avec le client**. |

### 2.4 Qualité des données

| ID | Exigence | Statut | Détail |
|---|---|---|---|
| WE-40 | File de revue des doublons | Fait | |
| WE-41 | Comparaison côte à côte | Fait | Mini-carte de comparaison des parcelles incluse. |
| WE-42 | Classement du cas | Fait | Six statuts, commentaire obligatoire. |
| WE-43 | Fusion réversible | Fait | Permission dédiée ; défaire restaure fiche et parcelles (testé). |
| WE-44 | File d'alertes | Fait | |
| WE-45 | Actions en lot avec aperçu | Fait | |
| WE-46 | Téléphone partagé = signal secondaire | Fait | Onglet distinct. |

### 2.5 Cartographie

| ID | Exigence | Statut | Détail |
|---|---|---|---|
| WE-50 | Carte interactive filtrable | Fait | Plan et satellite. |
| WE-51 | Statuts visuels | Fait | Couleur + hachures + icône : jamais la couleur seule. |
| WE-52 | Fiche parcelle | Fait | Contours brut et réparé, écarts, historique. |
| WE-53 | Validation d'une géométrie | Fait | |
| WE-54 | Chevauchements | Fait | 68 paires détectées sur les données de démonstration. |
| WE-55 | Performance des contours | Partiel | 1 534 parcelles s'affichent ; simplification selon le zoom à faire avec le serveur. |
| WE-56 | Export cartographique | Partiel | GeoJSON fait ; PDF par impression navigateur seulement. |
| WE-57 | Analyses spatiales | À faire | Répartition des cultures, assolements, densité par localité. |

### 2.6 Utilisateurs, référentiels, import, rapports

| ID | Exigence | Statut | Détail |
|---|---|---|---|
| WE-60 | Utilisateurs | Fait | Création avec **adresse e-mail**, désactivation ; un compte désactivé ne peut plus se connecter. |
| WE-61 | Rôles et permissions éditables | Partiel | Matrice des rôles affichée ; modification depuis l'interface à faire. |
| WE-62 | Liaison compte et producteur | Fait | |
| WE-63 | File des demandes de correction | Fait | Avant / après, décision motivée. |
| WE-64 | Appareils | Fait | Révocation simulée. |
| WE-65 | Lecture complète de la CNI par rôle | Partiel | Droit défini dans le code, non éditable depuis l'interface ; **à valider** avec le client (Q4). |
| WE-70 | Cultures et alias | Fait | |
| WE-71 | Localités, campagnes, types, seuils | Partiel | Seuils modifiables ; autres listes en consultation. |
| WE-80 | Écran d'import | Fait | Excel multi-feuilles, import à blanc, rapport. |
| WE-81 | Rapport d'import | Fait | |
| WE-82 | Historique des lots | Fait | L'idempotence réelle sera garantie par le serveur. |
| WE-90 | Rapports consolidés | Partiel | Quatre rapports en CSV, limités au périmètre ; **PDF et Excel mis en forme à la charte** à produire côté serveur. |
| WE-91 | Journal d'audit | Fait | Filtres par utilisateur et période, export. |
| WE-92 | Réunions, PV, cotisations, documents | À faire | Module administratif : PRD ultérieur. |

---

## 3. Demandes ajoutées pendant le projet

| Demande | Statut | Détail |
|---|---|---|
| Connexion par e-mail et code (OTP) à la place du SMS | Fait (démo) | SMS prévu plus tard comme second canal. Le PRD (BE-10, BE-93) est à mettre à jour. |
| Pages de connexion complètes : mot de passe oublié, code de sécurité | Fait (démo) | Parcours complet, règles de sécurité testées (17 tests). |
| Interface sobre : pas d'icônes enfantines, pas de tirets typographiques | Fait | Règle ESLint qui bloque les tirets cadratins ; 117 occurrences corrigées. |
| Modales et placeholders soignés | Fait | Composant `FormField` (libellé visible + aide), dialogues adaptés au téléphone, placeholders sans points de suspension. |
| Règles claires de développement, tests, CI/CD | Fait | `docs/DEVELOPPEMENT.md` (un seul guide à chapitres : démarrer, Git, qualité et CI, sécurité, authentification, bilingue, architecture), `.github/` (CI, CodeQL, Dependabot, modèle de PR). |
| Réutilisation du code et sécurité robuste | Partiel | Fait : `scope.ts` (périmètre), `FormField`, composants d'authentification, `RowActions`. Reste : dialogues à factoriser (voir 4.2). |
| Interface bilingue français / wolof | À faire | Décision prise ; mécanisme et traduction à planifier (`docs/DEVELOPPEMENT.md`, chapitre 6). |
| Passage à pnpm, nouveau dépôt GitHub sans fichiers Lovable | Partiel | pnpm : fait. Migration de dépôt : en attente du nom du dépôt (section 4.3). |
| Notes fonctionnelles Scopla : gestionnaire, rapports, membres et producteurs, rôles, plans d'exploitation | Plan rédigé | Section 4.5 : modèle de données, droits proposés, phases P1 à P8, décisions D1 à D12. |
| Réorganisation du menu en cinq modules métier (administratif, commercial, exploitation, agronomique, SIG) | Plan rédigé | Section 4.5.4 ; phase P2. |
| Document d'état tenu à jour | Fait | Ce document. |

---

## 4. Ce qui reste à faire

### 4.1 Points issus de l'audit du 23 octobre

| N° | Point | Statut |
|---|---|---|
| 1 | Périmètre SCOOP sur alertes, fiches producteur et parcelle, rapports, carte | Fait (un défaut supplémentaire corrigé : `?plot=` ouvrait une parcelle hors périmètre) |
| 2 | Test par rôle du périmètre | Fait (11 tests) |
| 3 | Brancher le jeu de données complet (1 317 producteurs, 609 alertes) | Fait (adaptateur `src/lib/mock/fixture.ts`, 4 tests de volumes) |
| 4 | Injection de formules dans les exports CSV | Fait |
| 5 | Prettier sur tout le dépôt | Fait |
| 6 | Pages 404 et d'erreur en français | Fait |
| 7 | Libellé obsolète du tableau de bord | Fait |
| 8 | Double filtre SCOOP sur la liste des producteurs, filtres dans l'URL | À faire |
| 9 | Campagnes écrites en dur dans la fiche producteur | Fait |
| 10 | Test de rôle écrit en dur dans `utilisateurs.tsx` | Fait (`ROLE_IS_SCOPED` dans `permissions.ts`, testé) |
| 11 | Garde d'accès centralisée au niveau du routeur | À faire |
| 12 | Libellé du filtre « statut » des alertes | Fait (pastilles de statut avec libellés) |
| 13 | Session : jetons côté serveur | Partiel (les droits ne sont plus conservés dans le navigateur) |
| 14 | Contenu de l'export « anonymisé » à faire valider par la CRADESC | À valider |
| 15 | Quels dossiers dans Git (docs, data, tools) | Décidé : inclus, sauf `data/revue-doublons/` |
| 16 | Messages de commit descriptifs | Fait (convention) ; aucun commit encore créé |
| 17 | Mises à jour majeures de dépendances (ESLint 10, Vitest 5, TypeScript 7) | À faire, non urgent |
| 18 | Essais sur appareils réels (Android d'entrée de gamme, iPad) | À faire |
| 19 | Les gestionnaires ont-ils un ordinateur ? (INF 44) | À valider |

### 4.2 Dette technique et qualité

| Sujet | Détail | Priorité |
|---|---|---|
| Tests de parcours complets | Fait : 22 scénarios Playwright (`e2e/`), dont 3 sur téléphone, dans la CI. À étendre à chaque nouvel écran | Suivi |
| Dialogues | Une dizaine de dialogues répètent le même squelette : extraire un `FormDialog` | Moyenne |
| Dépendance Lovable | `@lovable.dev/vite-tanstack-config` est une dépendance de build : écrire la configuration Vite explicite avant de quitter Lovable | Moyenne |
| `bun.lock` | Non mis à jour après l'ajout de `xlsx` ; disparaît avec la migration de dépôt | Basse |
| Dépendance `xlsx` | Servie depuis `cdn.sheetjs.com` (source officielle), hors registre npm et hors délai de sécurité 24 h | À surveiller |
| Poids du jeu de démonstration | Le jeu complet est compris dans le code client (environ 285 Ko compressés, chargés dès la connexion) ; à remplacer par l'API ou un chargement différé quand le serveur existe | Basse |
| Avertissements ESLint | 11 avertissements « fast refresh » sur des fichiers qui exportent aussi des constantes | Basse |

### 4.3 Migration vers le nouveau dépôt GitHub

**Décision du 23 octobre 2026 : historique propre.** Le nouveau dépôt reçoit **un seul commit initial** (`chore: import initial du prototype Mbay Diaay`) sur l'état validé du dossier de travail, après retrait des fichiers Lovable ci-dessous. Le plan de 19 commits de la section 4.4 sert alors de référence de lecture du travail, il n'est pas exécuté. La titularité du code (maître d'ouvrage CRADESC, mission CANAS, réutilisation éventuelle de DIGICOOP) reste à confirmer par écrit : `LICENSE` en tient compte.

**Nouveau dépôt :** `https://github.com/MohaPeth/mbaydiaay-proto.git` (communiqué le 23 octobre 2026). **Poussé le 23 octobre 2026** (commit unique `1735db7`, dépôt privé). Le dossier de travail est désormais le clone `/Users/moha/Dev/mbaydiaay-proto` ; l'ancien dossier (relié à Lovable) n'est plus modifié et sert d'archive.

Interprétation retenue : les fichiers à ne pas inclure sont ceux de **Lovable** et les **sorties de build**. Déjà fait : `.gitignore` durci (`.output/`, `.wrangler/`, `.lovable/`, `.env*`, `*.xlsx` hors fixtures) ; `docs/`, `data/fixtures/` et `tools/` sont à versionner (aucune donnée personnelle), `data/revue-doublons/` reste ignoré.

| Fichier lié à Lovable | À la migration |
|---|---|
| `.lovable/` | Retirer |
| `bun.lock`, `bunfig.toml` | Retirer (pnpm est la référence) |
| `AGENTS.md` | Garder les règles du projet, supprimer le bloc d'avertissement Lovable |
| `src/lib/lovable-error-reporting.ts` | Remplacé par `src/lib/error-reporting.ts` (neutre, sans donnée personnelle) |
| `vite.config.ts`, `package.json` (`@lovable.dev/vite-tanstack-config`) | **Dépendance de build** : écrire d'abord la configuration Vite explicite équivalente |

Étapes : attendre la fin des chantiers en cours et `pnpm run ci` vert ; commiter par thèmes avec des chemins explicites (pnpm, `.gitignore` et guide, documentation, données et outils, adaptation mobile, authentification, puis travaux de la seconde session) ; choisir l'historique du nouveau dépôt (conserver les 45 commits « Changes », ou départ propre en un commit, recommandé) ; dans le nouveau dépôt, retirer les fichiers ci-dessus et pousser. L'avertissement de ne pas réécrire l'historique concerne le dépôt relié à Lovable, pas un nouveau dépôt. Déconnecter l'ancien dépôt de Lovable est une décision à prendre côté plateforme.

### 4.4 Répartition du travail restant (web)

Deux sessions travaillent dans le même dossier : **A** (écrans et données) et **B** (socle transversal, sécurité et outillage). **Chacune coche sa case** (`[x]`) quand le travail est fait et ajoute une ligne au journal (section 9). Une tâche qui change de responsable est annoncée à l'autre session avant d'être commencée. Les règles de travail à deux sont au chapitre 2 de `DEVELOPPEMENT.md`.

| Fait | Tâche | Resp. | Fichiers principaux | Réf. |
|---|---|---|---|---|
| [x] | Brancher le jeu de données complet (1 317 producteurs, 609 alertes) et retirer les compteurs écrits en dur dans les écrans (hors page de connexion) | A | `src/lib/mock/`, `src/lib/store.ts`, `index.tsx` | 4.1 n° 3 |
| [x] | Retirer les compteurs écrits en dur de la page de connexion (« 11 SCOOP », « 948 producteurs ») | B | `login.tsx` | 4.1 n° 3 |
| [x] | Double filtre SCOOP de la liste des producteurs ; filtres locaux dans l'URL | B | `producteurs.index.tsx` | 4.1 n° 8 |
| [x] | Campagnes écrites en dur dans la fiche producteur | A | `producteurs.$id.tsx` | 4.1 n° 9 |
| [x] | Test de rôle écrit en dur dans la gestion des utilisateurs : passer par `permissions.ts` | A | `utilisateurs.tsx`, `permissions.ts` | 4.1 n° 10 |
| [ ] **Reporté** | Garde d'accès centralisée au niveau du routeur (au lieu de `AppShell`) : aujourd'hui la session vit dans le navigateur, un garde de routeur ne peut pas la lire au rendu serveur. À faire avec le cookie de session du vrai serveur (voir `DEVELOPPEMENT.md`, chapitre 4) | B | `__root.tsx`, `router.tsx`, `AppShell.tsx` | 4.1 n° 11 |
| [x] | Libellé du filtre « statut » des alertes | A | `qualite.alertes.tsx` | 4.1 n° 12 |
| [x] | Vérification sur téléphone (360 px) des écrans Organisations, Comptes, Appareils, Référentiels, Imports, Sauvegarde, Journal, Qualité | A | écrans cités | Définition de « terminé » |
| [x] | Vérification sur téléphone (360 px) de la carte, des producteurs, du tableau de bord et de la connexion | B | écrans cités | Définition de « terminé » |
| [x] | Passage « langage simple » (phrases courtes, aide, états vides) sur le tableau de bord, les rapports et l'annuaire | A | `index.tsx`, `rapports.tsx`, `producteurs.*.tsx` | Retour client |
| [x] | Extraire un `FormDialog` commun aux dialogues | B | `components/app/`, écrans à dialogue | 4.2 |
| [x] | Tests de parcours complets dans un navigateur (connexion avec code, correction, carte, fusion, import) | A | `e2e/`, CI | 4.2 |
| [x] | Configuration Vite explicite à la place de `@lovable.dev/vite-tanstack-config` | B | `vite.config.ts`, `package.json` | 4.2, 4.3 |
| [x] | Rapporteur d'erreurs neutre à la place de `lovable-error-reporting.ts` (après la configuration Vite) | A | `src/lib/`, `__root.tsx` | 4.3 |
| [x] | Onze avertissements ESLint « fast refresh » | B | composants concernés | 4.2 |
| [ ] | Mises à jour majeures des dépendances (ESLint, Vitest, TypeScript) | B | `package.json` | 4.1 n° 17 |
| [ ] **Remplacé** par un commit initial unique (décision du 23 oct.) : voir 4.3 | Commits conventionnels par thème (plan ci-dessous), après accord des deux sessions et `pnpm run ci` vert | A | dépôt entier | 4.1 n° 16 |
| [ ] | Mécanisme bilingue français / wolof (extraction des textes) : **plan validé le 23 oct. 2026 (6 décisions acceptées) ; mécanisme puis extraction selon ch. 6** | A + B | tout `src/` | `DEVELOPPEMENT.md`, chapitre 6 |
| [ ] | Décisions du client : export anonymisé (n° 14), ordinateurs des gestionnaires (n° 19), charte, wolof | Client | section 7 | 4.1 |

**Plan de commits** (type et périmètre selon `DEVELOPPEMENT.md`, chapitre 2). Un commit = une intention, `git add` sur des chemins explicites, `pnpm run ci` vert à la fin :

1. `build: passer à pnpm et ajouter la lecture des fichiers Excel` (`package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`)
2. `chore: durcir .gitignore et ajouter les fichiers d'éditeur` (`.gitignore`, `.editorconfig`, `.nvmrc`, `.env.example`, favicon)
3. `docs: ajouter le guide de développement et l'état du projet` (`docs/`, `README.md`)
4. `data: versionner les jeux de données fictifs et l'outil d'import à blanc` (`data/fixtures/`, `tools/`)
5. `build(ci): ajouter les workflows GitHub et les règles ESLint` (`.github/`, `eslint.config.js`)
6. `feat(shell): adapter l'interface aux téléphones et tablettes` (shell, composants `ui/`, styles)
7. `feat(ui): ajouter squelettes, interrupteur, filtres et menus d'actions communs` (composants partagés)
8. `feat(auth): connecter par e-mail, mot de passe et code de vérification` (`src/lib/auth/`, `src/components/auth/`, connexion)
9. `fix(permissions): centraliser le périmètre SCOOP et le tester` (`src/lib/scope.ts`, tests de périmètre)
10. `feat(organisations): ajouter la fiche organisation et la qualification en lot`
11. `feat(producteurs): enrichir la fiche producteur et relier comptes, doublons et carte`
12. `feat(carte): ajouter le menu d'actions et le traitement des alertes sur une parcelle`
13. `feat(alertes): regrouper la qualité des données en un espace à menu à plat` (doublons, alertes, corrections)
14. `feat(comptes): ajouter le rapprochement manuel et les vues de liaison`
15. `feat(appareils): ajouter le menu d'actions et le détail d'un appareil`
16. `feat(referentiels): présenter les référentiels en deux vues avec leur impact`
17. `feat(imports): lire les fichiers Excel et CSV avec rapport à blanc détaillé`
18. `feat(audit): détailler chaque entrée du journal et ajouter la sauvegarde`
19. `style: reformater le dépôt avec Prettier` (seul, en dernier, si nécessaire)

Chaque message explique **pourquoi** dans son corps. Si deux thèmes partagent un fichier (par exemple `store.ts`), il est indexé dans le premier commit qui en a besoin.

### 4.5 Évolution fonctionnelle : notes « Scopla » et cinq modules métier

**Sources** : les notes fonctionnelles de Scopla (gestionnaire, rapports, membres et producteurs, rôles, plans d'exploitation) et la classification en cinq modules de la note de cadrage. Statut : **plan proposé, en attente de validation de l'utilisateur** (décisions en 4.5.7). Les règles précises de validation, les droits de chaque rôle et le contenu des rapports doivent être confirmés avec les responsables des coopératives : la matrice ci-dessous est une **proposition de départ**, pas une règle.

#### 4.5.1 Ce que disent les notes, et comment on les lit

| Besoin des notes | Lecture retenue | Aujourd'hui |
|---|---|---|
| Le gestionnaire lit et télécharge les « CVNI » et leurs documents | « CVNI » lu comme **CNI** (à confirmer) ; lecture en clair tracée au journal, téléchargement des pièces jointes | CNI lisible par l'administrateur seul ; aucun document |
| Le gestionnaire consulte le journal de la coopérative | Journal d'audit limité à sa SCOOP | Journal réservé à l'administrateur |
| Module de production de rapports | Catalogue par rôle, paramètres (campagne, SCOOP, période), historique des rapports générés, téléchargement | 4 rapports CSV générés à la volée, rien n'est conservé |
| Membre différent de producteur ; GIE à part | Trois notions distinctes : **membre** (personne dans la coopérative), **producteur** (profil agricole), **GIE** (organisation) | `Producer.status` vaut `recensé` ou `membre` : tout est fondu dans la fiche producteur |
| Le technicien ajoute un producteur, monte son dossier, le soumet ; la coopérative traite | **Dossier producteur** avec circuit de validation | Le technicien lit seulement ; création de fiche impossible (sauf import) |
| Rôles : représentant, ventes, secrétaire, techniciens, responsables des rapports | Rôles fonctionnels de l'application, **séparés du statut de membre** | 4 rôles : administrateur CRADESC, gestionnaire, faîtière, technicien |
| Le représentant gère les membres, les rôles et les accès | Écran « Équipe » propre à sa SCOOP | Gestion des utilisateurs réservée à l'administrateur |
| Plans d'exploitation à intégrer | Nouvelle entité liée au producteur, à la campagne et aux parcelles | Absent |
| Principe : ne rien perdre de l'existant | Toute évolution garde les droits et écrans actuels du gestionnaire | |

#### 4.5.2 Modèle de données proposé

| Entité | Contenu principal | Liens |
|---|---|---|
| **Membre** | identité, SCOOP, GIE éventuel, **statut dans la coopérative** (candidat, membre, suspendu, sorti : à confirmer), date d'adhésion | peut avoir **zéro ou un** producteur ; peut avoir un compte |
| **Producteur** (existant) | fiche agricole actuelle (parcelles, cultures, alertes) | peut être lié à un membre ; créé à l'approbation d'un dossier |
| **GIE** (organisation existante) | type GIE, **statut dans la coopérative** (à confirmer) | contient des membres et des producteurs |
| **Compte** (utilisateur existant) | e-mail, **rôle fonctionnel** (accès à l'application) | peut être lié à un membre |
| **Dossier producteur** | brouillon des champs d'une fiche, pièces jointes, état : brouillon, soumis, en examen, complément demandé, approuvé, refusé ; historique | créé par un technicien ; traité par la coopérative ; crée un producteur (et un membre si demandé) |
| **Document** | type (CNI, photo, justificatif, autre), nom, taille, auteur, date, **sensible** oui ou non | rattaché à un dossier, un producteur, un membre ou un plan |
| **Plan d'exploitation** | campagne, producteur ou dossier, parcelles et cultures prévues, surfaces, calendrier, état (brouillon, validé, à jour), historique | liens vers parcelle et campagne ; alimentera M3 et M4 |

Règle centrale : **le statut d'une personne dans la coopérative et son rôle dans l'application sont deux champs différents** ; être membre ne donne aucun droit, ne crée aucun producteur.

#### 4.5.3 Rôles et droits (proposition à valider)

Nouveaux rôles fonctionnels, en plus des quatre existants : `representant`, `ventes`, `secretaire`, `rapports`. Nouvelles permissions : `member.read`, `member.manage`, `role.assign`, `dossier.create`, `dossier.submit`, `dossier.review`, `document.read`, `document.download`, `plan.read`, `plan.write`, `report.read`, `report.download` (le droit `report.generate` actuel est conservé), `audit.read.scoop`, `sales.read` et `sales.manage` (réservés au module M2).

| Droit | Admin CRADESC | Faîtière | Gestionnaire | Représentant | Secrétaire | Ventes | Rapports | Technicien |
|---|---|---|---|---|---|---|---|---|
| Producteurs : lire (téléphone et CNI **masqués** par défaut) | oui | oui | oui | oui | oui | non | oui | oui, ses SCOOP |
| Producteurs : modifier | oui | non | oui | non | non | non | non | non |
| CNI en clair et pièces sensibles | oui, tracé | non | oui, tracé | oui, tracé | non | non | non | non |
| Pièces non sensibles d'un dossier | oui | non | oui | oui | oui | non | non | oui, ses dossiers |
| Membres : lire | oui | oui | oui | oui | oui | non | non | non |
| Membres : gérer, attribuer les rôles | oui | non | non | oui, sa SCOOP | non | non | non | non |
| Dossier : créer et soumettre | oui | non | non | non | non | non | non | oui, ses SCOOP |
| Dossier : instruire (examen, demande de complément ; sans pièces sensibles pour la secrétaire) | oui | non | oui | oui | oui | non | non | non |
| Dossier : **décider** (approuver, refuser) | oui | non | oui | oui | **non** | non | non | non |
| Plan d'exploitation : lire | oui | oui | oui | oui | oui | non | oui | oui, ses SCOOP |
| Plan d'exploitation : écrire | oui | non | oui | non | non | non | non | oui, ses SCOOP |
| Rapports : historique (`report.read`) | oui | oui | oui | oui | non | non | oui | non |
| Rapports : générer et télécharger le fichier (`report.download`) | oui | oui | oui | oui | non | non | oui | non |
| Journal de sa SCOOP | oui | non | oui | oui | non | non | non | non |
| Ventes (M2, plus tard) | oui | non | non | non | non | oui | non | non |

Le périmètre reste celui de `scope.ts` : un rôle de coopérative ne voit que sa SCOOP, un technicien que ses SCOOP.

**Règles de sécurité de la matrice** (relecture de sécurité du 24 octobre 2026) :

1. **Secrétaire** : elle traite les dossiers mais ne voit ni la CNI ni les pièces sensibles ; `document.read` est limité aux pièces non sensibles (champ `sensible` du document).
2. **Séparation des tâches** : celui qui crée ou soumet un dossier ne peut pas l'approuver, **sauf l'administrateur CRADESC et le gestionnaire de la SCOOP** (D12, décision du 24 oct.), dont l'approbation de leur propre demande est tracée « auto-approuvé ». Règle testée pour chaque rôle.
3. **Technicien** : voit uniquement ses dossiers et les producteurs de ses SCOOP (via `scope.ts`), jamais la CNI en clair.
4. **Données personnelles masquées par défaut** pour tous les rôles de lecture (faîtière, rapports, secrétaire, technicien) : téléphone et CNI en clair seulement avec un droit dédié et une ligne au journal.
5. **Traçabilité** : chaque téléchargement de pièce ou de rapport écrit au journal l'utilisateur, la SCOOP, l'objet et l'heure. `report.read` (historique) et `report.download` (fichier) sont deux droits distincts.
6. **Comptes de démonstration** : un compte par rôle, et un test par rôle qui vérifie la matrice (écrans cachés, actions refusées, périmètre).

#### 4.5.4 Réorganisation du menu en cinq modules

| Module (action) | Écrans existants | Écrans à créer dans ce plan | Plus tard |
|---|---|---|---|
| **M1 Administratif** (gérer) | Producteurs, Organisations et GIE | **Équipe** (membres et rôles), **Dossiers producteurs**, Documents | cotisations, réunions |
| **M2 Commercial** (échanger) | | | stocks, ventes, crédits, trésorerie |
| **M3 Exploitation** (mesurer) | | | charges, revenus, marges |
| **M4 Agronomique** (conduire) | | **Plans d'exploitation** | campagnes, calendriers, itinéraires |
| **M5 SIG** (localiser) | Carte, Parcelles | | |
| **Transversal** | Tableau de bord, Qualité des données, Imports, Sauvegarde, Journal, Utilisateurs, Comptes, Appareils, Référentiels | **Rapports** (module complet) | |

Le tableau de bord gagne une **page d'accueil des modules** : cinq cartes (disponible ou à venir, volumes clés). Les modules non construits ne produisent aucun lien mort dans le menu (décision D10).

#### 4.5.5 Phases, répartition et cases à cocher

Contrat commun, fixé ici pour que les deux sessions avancent en parallèle : noms des rôles et des permissions (4.5.3), entités et états (4.5.2). Toute modification de ce contrat est annoncée à l'autre session. **A** = écrans, données, store ; **B** = droits, périmètre, navigation, tests de parcours, documentation. Chaque phase se termine par `pnpm run ci` et `pnpm e2e` verts, une ligne au journal et des commits conventionnels.

| Fait | Phase | Contenu | A | B |
|---|---|---|---|---|
| [x] | **P0 Validation** | Réponses aux décisions 4.5.7, matrice 4.5.3 confirmée | Rédige et ajuste ce plan | Relit |
| [x] | **P1 Fondations** | Types, données de démonstration et actions du store (membre, dossier, document, plan) ; rôles, permissions, comptes de démonstration, périmètre et tests par rôle | Types, `mock/data.ts`, `store.ts`, tests des règles | `permissions.ts`, `scope.ts`, comptes de démonstration, tests de droits |
| [x] | **P2 Cinq modules** | Menu en cinq blocs, page d'accueil des modules, palette de recherche, libellés | Intitulés des écrans, cartes de la page d'accueil | `nav.ts`, `AppShell`, `CommandPalette`, e2e du menu |
| [x] | **P3 Équipe et accès** | Écran Équipe : membres (avec ou sans producteur), GIE, fonctions, attribution des rôles par le représentant | Écran, fiche membre, tests | Garde d'accès, journal, e2e |
| [x] | **P4 Dossiers producteurs** | Technicien : brouillon, pièces jointes, soumission. Coopérative : file de traitement (approuver, refuser, demander un complément), création du producteur | Écrans et circuit | Droits, journal structuré, e2e du circuit complet |
| [x] | **P5 Gestionnaire étendu** | Lecture et téléchargement CNI et documents (tracés), journal de la SCOOP, onglet Documents des fiches | Onglet, téléchargement | Droits, journal limité à la SCOOP, e2e |
| [x] | **P6 Rapports** | Catalogue par rôle, paramètres, historique des rapports générés, téléchargement CSV et Excel | Module et historique (A fait) | Séparation `report.read` et `report.download`, e2e |
| [x] | **P7 Plans d'exploitation** | Création, consultation, lien producteur et parcelles, suivi et mise à jour, accès par rôle | Écrans, fiche, onglet sur le producteur (A fait) | Droits, export et sauvegarde, e2e |
| [x] | **P8 Bilingue** | Extraction des textes (chapitre 6 de `DEVELOPPEMENT.md`) **après** les phases fonctionnelles, pour ne pas extraire deux fois | Mécanisme et écrans métier | Socle |

Règles pendant ces phases : les nouveaux écrans suivent déjà le chapitre 6 (pas de phrase construite, pas de pluriel fait à la main, textes courts) ; chaque droit a un test ; les données personnelles restent masquées par défaut ; le périmètre passe par `scope.ts`.

#### 4.5.6 Hors de ce plan (à chiffrer avec le client)

Cotisations, réunions et gestion documentaire complète (reste de M1), stocks, ventes, crédits et trésorerie (M2), comptes d'exploitation (M3), campagnes, calendriers et itinéraires techniques (M4). La chaîne visée est : producteur (M1), parcelle (M5), campagne et culture (M4), puis ventes (M2) et compte d'exploitation calculé (M3).

#### 4.5.7 Décisions à obtenir

| # | Question | Recommandation |
|---|---|---|
| D1 | Le nom du produit est-il **Scopla** ou Mbay Diaay ? | **Décidé le 24 oct. : Mbay Diaay.** Aucun renommage. |
| D2 | « CVNI » désigne-t-il bien la CNI ? | **Décidé : oui, la carte nationale d'identité.** |
| D3 | Gestionnaire et représentant : deux rôles, ou une seule personne ? | **Décidé : deux rôles distincts**, un compte peut en cumuler. |
| D4 | Statuts de membre (candidat, membre, suspendu, sorti) et statut d'un GIE dans la coopérative | Liste à fournir par les coopératives |
| D5 | Circuit de validation d'un dossier | **Proposition à valider** (en s'appuyant sur `ACTEURS.md` : le gestionnaire approuve déjà les corrections, le technicien reste limité à sa SCOOP) : voir 4.5.8 |
| D6 | Contenu d'un plan d'exploitation (champs, calendrier, coûts, rendement attendu) | Modèle fourni par les techniciens |
| D7 | Plan d'exploitation dans M3 (rentabilité) ou M4 (conduite des cultures) ? | M4, ses coûts alimentent M3 plus tard |
| D8 | Contenu des rapports, format (CSV, Excel, PDF), qui peut télécharger | Excel et CSV d'abord, PDF ensuite (P3 du chapitre 6) |
| D9 | Documents : types, taille maximale, durée de conservation, lieu de stockage | Métadonnées seules dans la démonstration, stockage réel avec le serveur |
| D10 | Modules non construits (M2, M3, M4 partiel) : affichés « à venir » ou cachés ? | **Décidé : affichés « à venir »** (non cliquables, sans lien mort). |
| D11 | Ordre des phases et place du bilingue | P1, P2, P3, P4, P5, P6, P7 puis P8 |
| D12 | La séparation des tâches s'applique-t-elle aussi à l'administrateur ? | **Décidé : exception pour le rang le plus élevé** (administrateur CRADESC et gestionnaire de sa SCOOP, qui gère producteurs, techniciens et GIE). Il peut approuver une demande qu'il a lui-même créée ; l'action est **tracée « auto-approuvé »** au journal. Les autres rôles (technicien, secrétaire, représentant…) ne peuvent jamais approuver leur propre dossier. *À confirmer : l'exception couvre-t-elle le représentant ?* |
| D13 | Qui peut nommer quels rôles ? | **Proposition (appliquée dans la démonstration, à valider)** : l'administrateur attribue tous les rôles de coopérative ; le représentant attribue secrétaire, ventes, rapports et technicien, jamais un autre représentant ni un gestionnaire ; personne ne modifie son propre accès. |
| D14 | Champs obligatoires d'une coopérative (code court, commune, région, date de création) | Nom, commune, code court, gestionnaire |
| D15 | Archiver ou supprimer une coopérative | Archiver seulement |
| D16 | Comment le gestionnaire reçoit son accès | Courriel d'invitation avec lien à usage unique, jamais de mot de passe fourni |

#### 4.5.8 Proposition de circuit de validation d'un dossier (D5)

Fondée sur les rôles de `ACTEURS.md` : le technicien agit sur le terrain dans sa SCOOP, le gestionnaire approuve déjà les corrections et valide les parcelles.

| Étape | Qui | Ce qui se passe |
|---|---|---|
| 1. Brouillon | Technicien (sa SCOOP) | Remplit la fiche et joint les pièces ; enregistrement libre, rien n'est visible de la coopérative |
| 2. Soumission | Technicien | Contrôles automatiques bloquants : champs obligatoires, CNI et téléphone valides, **doublon possible** signalé (règles de qualité existantes). Le dossier passe à « soumis » et ne peut plus être modifié par le technicien |
| 3. Instruction | Secrétaire (ou gestionnaire) | Vérifie les pièces non sensibles ; passe à « en examen » ou **demande un complément** (message obligatoire, le dossier revient au technicien) |
| 4. Décision | Gestionnaire ou représentant de la SCOOP | **Approuve** (crée le producteur, et le membre si demandé) ou **refuse** avec **motif obligatoire** : doublon, pièce illisible ou manquante, hors zone ou hors SCOOP, informations incohérentes, autre (précision libre) |
| 5. Suites | Système | Journal structuré à chaque étape ; le technicien est notifié ; un dossier refusé reste consultable, il ne se rouvre pas : le technicien en crée un nouveau |

Règles : un dossier sans réponse après 14 jours déclenche un rappel (jamais une approbation automatique) ; si un doublon est confirmé à l'approbation, le dossier est lié au producteur existant au lieu d'en créer un ; la séparation des tâches suit D12.

#### 4.5.9 Proposition : créer une coopérative et le compte de son gestionnaire (phase P9)

Demande de l'utilisateur (24 oct.) : le CRADESC doit pouvoir créer les coopératives et leurs comptes. Aujourd'hui les 11 SCOOP viennent du jeu de données, figées dans le code (69 usages de `SCOOPS` dans 28 fichiers) : le premier travail est de les rendre **modifiables dans le store**.

| Élément | Proposition |
|---|---|
| Droit | Nouveau droit **`scoop.manage`**, réservé à l'administrateur CRADESC. La faîtière n'a que la lecture |
| Écran | « Coopératives » dans Administration : liste (nom, commune, producteurs, gestionnaire, statut) et dialogue « Créer une coopérative » |
| Champs | Nom (unique), commune, code court unique (3 à 5 lettres, sert aux identifiants), **gestionnaire** : prénom, nom, e-mail |
| Résultat | La SCOOP est créée **et** un compte `gestionnaire` rattaché à elle, **désactivé tant que la personne n'a pas choisi son mot de passe** |
| Mot de passe | Jamais saisi par l'administrateur. Le gestionnaire reçoit un courriel avec un lien à usage unique (durée limitée) : même mécanisme que « mot de passe oublié » (`resetPassword`), puis connexion normale avec code à 6 chiffres |
| Journal | Création de SCOOP, création du compte, envoi de l'invitation, activation : entrées structurées, avec la SCOOP |
| Suppression | Jamais : une coopérative est **archivée** (ses données restent lisibles, plus aucun accès actif) ; refus d'archivage tant qu'un dossier est en cours |
| Comptes producteurs | Restent hors web (mobile, PRD) ; en attendant, la liaison compte ↔ producteur existante (`account.manage`) |

Impact sur le code : `SCOOPS` devient un état (`store.scoops`) lu par un seul sélecteur ; les filtres, rapports, menus, tests de périmètre et jeux de données de démonstration lisent ce sélecteur. Répartition proposée : **A** = état des coopératives, actions, écran, migration des 28 fichiers ; **B** = droit `scoop.manage`, flux d'invitation et d'activation côté authentification, tests de droits et parcours navigateur (création, invitation, premier accès du gestionnaire, archivage refusé avec dossier en cours).

Décisions à obtenir : **D14** champs obligatoires d'une coopérative (code, commune, région, date de création) ; **D15** archivage seulement, jamais de suppression ; **D16** invitation par e-mail avec lien à usage unique (et SMS plus tard) plutôt qu'un mot de passe provisoire.

---

### 4.6 Fermeture du module M1 Administratif (plan du 25 octobre 2026)

**Demande de l'utilisateur** : finaliser chaque module d'après la note de cadrage v1.1 et les dernières informations données (notes Scopla, création de coopérative), en commençant par M1, et consigner ici, module par module, ce qui est fait (chapitre 10).

**Périmètre de M1 d'après la note de cadrage (§5.1, confirmé [OT §5.1])** : base des adhérents (identité, contact, genre, âge, handicap, localisation, pièces) ; coopératives et statuts d'adhésion ; cotisations et leur historique ; réunions et assemblées avec leurs procès-verbaux ; gestion documentaire ; tableau de bord administratif. **À valider avec le client** : champs obligatoires (alignés sur la base existante) et règles de cotisation (INF 30, par coopérative). Ajouts des notes Scopla : membre distinct du producteur, dossiers à valider, rôles, création de coopérative et de son gestionnaire (4.5.9).

**Hypothèses de travail** (marquées « à valider » dans l'interface et ici ; remplacées dès la réponse du client) : D14 à D16 comme proposés en 4.5.7 ; une règle de cotisation par coopérative (montant en FCFA, périodicité annuelle ou mensuelle, échéance) ; une réunion a un type, une date, un lieu, un ordre du jour, des présents et un procès-verbal ; les documents d'une coopérative sont rangés par type.

| Fait | Phase | Contenu | A | B |
|---|---|---|---|---|
| [x] | **M1-1 Coopératives** (P9) | Créer, modifier, archiver une coopérative et créer le compte de son gestionnaire (invitation à usage unique) | `store.scoops`, actions, écran « Coopératives », migration de `SCOOPS` | Droit `scoop.manage`, invitation et activation, e2e |
| [x] | **M1-2 Fiche membre complète** | Âge, handicap, village, contact, pièces rattachées ; vue d'ensemble de l'adhérent (statut, producteur lié, compte, cotisation, documents) | Modèle, formulaire, fiche | Droits, e2e |
| [x] | **M1-3 Cotisations** | Règle par coopérative, paiements enregistrés, historique par membre, état (à jour, en retard, jamais payé), totaux, export | Modèle, store, écran, tests des règles | Droits `contribution.*`, périmètre, e2e |
| [x] | **M1-4 Réunions et procès-verbaux** | Convocation, ordre du jour, présences, PV (brouillon puis validé), pièce jointe | Modèle, store, écran, tests | Droits `meeting.*`, e2e |
| [x] | **M1-5 Gestion documentaire** | Bibliothèque de la coopérative (statuts, règlement, PV, justificatifs), dépôt, téléchargement tracé, documents sensibles | Écran, store | Droits, journal, e2e |
| [x] | **M1-6 Tableau de bord administratif** | « Ma coopérative » : adhésions en attente, cotisations en retard, prochaines réunions, documents récents ; cartes du module | Écrans | Tests |
| [ ] | **M1-7 Recette et fiche de module** | Recette visuelle et d'accessibilité, e2e de bout en bout, fiche M1 du chapitre 10 à jour | Fiche, recette | e2e, droits |

Règles de la phase : les nouveaux écrans sont écrits directement en clés de traduction (aucun texte en dur), les messages d'erreur passent par `errors.*`, chaque droit a son test, le périmètre passe par `scope.ts`, chaque action sensible écrit au journal.

### 4.7 Retours de l'utilisateur du 25 octobre 2026 (soir) : coopératives, calendrier, dossiers, menu

Message dicté de l'utilisateur, lu ainsi (« le CODES » = CRADESC). Chaque ligne a un responsable et une case.

| # | Demande | Lecture et décision | Fait | Resp. |
|---|---|---|---|---|
| R1 | Le CRADESC a la vue consolidée de tout, enregistre les coopératives, donne leurs accès, et peut aider un utilisateur en difficulté | Déjà vrai pour la vue et la création (écran Coopératives, invitation). **L'aide à un utilisateur** : proposition « Assistance » (D17) : l'administrateur ouvre l'application **comme l'utilisateur, en lecture seule**, avec une bannière et une ligne au journal ; à valider avant tout code (sensible) | [ ] | B (proposition), A (écran) |
| R2 | « Ma coopérative » doit disparaître en tant que page distincte : depuis la liste des coopératives, on **clique** sur une coopérative pour voir sa fiche (informations, **GIE**, **membres**, **techniciens**, indicateurs) | Une seule fiche coopérative `/cooperatives/$id` à onglets : Aperçu, GIE, Membres, Techniciens, Réunions, Cotisations. Rôle de coopérative : le menu « Ma coopérative » ouvre directement sa fiche ; administrateur et faîtière : liste Coopératives puis fiche | [x] | A (fiche), B (menu, droits) |
| R3 | « Équipe » : on y ajoute une personne **à une coopérative précise** | Le choix de la coopérative devient obligatoire pour l'administrateur dans « Ajouter un membre » ; filtre SCOOP toujours visible | [x] | A |
| R4 | Réunions et assemblées générales : **vrai calendrier** (bibliothèque proposée : `event-manager` de 21st.dev) | Composant d'agenda maison, dans le style du projet (jetons de couleur, textes en clés, français), vues mois, semaine, jour et liste, filtres, d'après ce composant : le code reçu est tronqué, écrit en anglais avec des couleurs hors charte | [x] | B (composant), A (branchement sur Réunions) |
| R5 | Dossier producteur plus **explicatif**, **filtres toujours visibles** | Bandeau d'étapes (où en est le dossier, ce qui vient ensuite, qui doit agir), aide en une phrase sous chaque statut, filtres de la liste affichés en permanence | [x] | A |
| R6 | Organisation des GIE : à optimiser | Après R2 : onglet GIE de la fiche coopérative, liste filtrable | [x] | A |
| R7 | Menu devenu long : **le centraliser**, menus à plat | Sections repliables mémorisées (Personnes, Vie de la coopérative, Terrain et qualité ; Administration et Bientôt repliés), modules « à venir » regroupés, total à traiter affiché sur une section repliée, « Ma coopérative » ou « Coopératives » selon le périmètre. **Fait** pour la structure ; l'allègement final (retrait des entrées reprises dans les onglets de la fiche coopérative) suit R2 | [x] partiel | B |

Décision à obtenir : **D17** : l'« Assistance » en lecture seule est-elle voulue ? (sinon, l'aide reste hors de l'application).

### 4.8 Plan du module M4 Agronomique (26 octobre 2026)

**Source** : note de cadrage §5.5 (confirmé [OT §5.4]) : planification des campagnes, calendriers culturaux co-construits avec les techniciens, suivi de l'itinéraire technique avec observations et photos ; alertes et recommandations par stade en second rang. **À valider** : ce qu'est une campagne pour les OP (saison ou cycle de culture, INF 23) et qui rédige et valide les calendriers (INF 28). Déjà fait : plans d'exploitation (P7), une seule campagne figée dans le jeu de données (« CHN 2025-2026 »).

**Hypothèses de travail** (affichées « à valider ») : **D18** une campagne est une période de production nommée, avec début, fin et état (planifiée, en cours, clôturée) ; **D19** un calendrier cultural est rédigé par un technicien ou un gestionnaire, **validé** par un gestionnaire ou l'administrateur, et ne change plus une fois validé (on en crée une nouvelle version) ; **D20** les photos d'observation ne sont que décrites (nom, taille) en démonstration.

| Fait | Phase | Contenu | A | B |
|---|---|---|---|---|
| [x] | **M4-1 Campagnes** | Campagne devient une entité modifiable (créer, ouvrir, clôturer), lue partout par un seul sélecteur comme les coopératives | État, actions, écran « Campagnes », migration de `CAMPAIGNS` | Droit `campaign.manage`, menu, e2e |
| [x] | **M4-2 Calendriers culturaux** | Modèle par culture : étapes (préparation, semis, repiquage, fertilisation, traitement, irrigation, récolte) avec leur décalage en jours après le semis ; brouillon puis validé ; versions | Modèle, règles, écran liste et fiche, calendriers de démonstration pour les cultures principales | Droits `calendar.*`, e2e |
| [x] | **M4-3 Opérations et suivi** | Des opérations prévues se déduisent du calendrier et du mois de semis d'une ligne de plan ; la personne saisit le réel (fait le, observation, photo décrite) ; état à faire, fait, en retard ; écart prévu et réel | Modèle, règles, onglet « Suivi » du plan, tests | Droits `operation.*`, e2e |
| [x] | **M4-4 Vue agronomique** | Agenda des opérations (composant d'agenda), assolement par culture et campagne, opérations en retard, rapports correspondants | Écrans, rapports | Tests |
| [ ] | **M4-5 Recette et fiche** | Accessibilité, 360 px, parcours, fiche M4 du chapitre 10 et document partagé à jour | Fiche, recette | e2e, droits |

Droits proposés (à confirmer) : `campaign.read` (tout rôle qui lit les plans) et `campaign.manage` (administrateur) ; `calendar.read` (administrateur, faîtière, gestionnaire, représentant, secrétaire, technicien, rapports), `calendar.write` (administrateur, gestionnaire, technicien), `calendar.validate` (administrateur, gestionnaire) ; `operation.read` (comme `plan.read`) et `operation.write` (comme `plan.write` : administrateur, gestionnaire, technicien).

### 4.9 Plan du module M2 Commercial (26 octobre 2026)

**Source** : note de cadrage §5.2 (confirmé [OT §5.2]) : stocks d'intrants avec traçabilité par lot, crédits accordés par la coopérative avec leurs échéanciers et remboursements, enregistrement des ventes ; veille des prix de marché en second rang. Le rôle « Responsable des ventes » et les droits `sales.read` et `sales.manage` existent déjà sans écran. **À valider avec les coopératives** : règles de crédit (taux, garanties, échéances), unités et catalogue d'intrants, qui enregistre les ventes.

**Hypothèses de travail** (affichées « à valider ») : **D21** un lot d'intrant a un numéro, une quantité reçue, une unité, un prix unitaire en FCFA, un fournisseur, une date de réception et une péremption éventuelle ; le stock d'un lot est la quantité reçue moins les sorties (distribution à un membre, consommation, perte) ; une sortie ne peut pas dépasser le solde ; **D22** un crédit est accordé à un membre en règle, avec un montant en FCFA, un taux simple (0 % par défaut), un échéancier (échéances mensuelles ou unique à la récolte) et des remboursements enregistrés, jamais effacés mais annulés avec un motif ; l'état est en cours, soldé ou en retard ; **D23** une vente enregistre le producteur, la culture, la quantité en kg, le prix au kg, l'acheteur, la date et l'état du paiement ; le revenu alimentera le compte d'exploitation (M3).

| Fait | Phase | Contenu | A | B |
|---|---|---|---|---|
| [x] | **M2-1 Stocks d'intrants** | Catalogue d'intrants, lots reçus, sorties (distribution, consommation, perte), solde par lot, seuil d'alerte, péremption proche | Modèle, règles, écrans, tests | Droits `stock.*`, menu, e2e |
| [x] | **M2-2 Crédits** | Octroi à un membre, échéancier, remboursements et annulation, états en cours, soldé, en retard, encours par coopérative | Modèle, règles, écrans, tests | Droits `credit.*`, menu, e2e |
| [x] | **M2-3 Ventes** | Enregistrement d'une vente (producteur, culture, quantité, prix, acheteur, paiement), liste, filtres, acheteurs | Modèle, règles, écrans, tests | Droits `sales.*` (existants), menu, e2e |
| [x] | **M2-4 Vue commerciale** | Tableau de bord commercial, rapports (stocks, encours des crédits, ventes par culture et campagne) | Écrans, rapports | Tests |
| [ ] | **M2-5 Recette et fiche** | Accessibilité, 360 px, parcours, fiche M2 du chapitre 10 et document partagé | Fiche, recette | e2e, droits |

Droits proposés (à confirmer) : `stock.read` (administrateur, faîtière, gestionnaire, représentant, secrétaire, ventes) et `stock.manage` (administrateur, gestionnaire) ; `credit.read` (administrateur, faîtière, gestionnaire, représentant) et `credit.manage` (administrateur, gestionnaire) ; `sales.read` (administrateur, faîtière, gestionnaire, représentant, ventes, rapports) et `sales.manage` (administrateur, gestionnaire, ventes).

### 4.10 Plan du module M3 Exploitation (26 octobre 2026)

**Source** : note de cadrage §5.3 (confirmé [OT §5.3]) : saisie guidée des charges (intrants, main-d'œuvre, transport, irrigation, location de matériel), enregistrement des revenus alimenté par le module commercial, calcul automatique des marges et du revenu à l'hectare, rapports individuels et consolidés. Entité pivot de la note : « la culture conduite sur une parcelle pendant une campagne ». Le but métier : savoir quelles cultures et quelles exploitations sont rentables, et lesquelles sont en difficulté.

**Hypothèses de travail** (affichées « à valider ») : **D24** une charge est rattachée à un producteur, une culture et une campagne, avec une catégorie (intrants, main-d'œuvre, transport, irrigation, location de matériel, autre), un montant en FCFA, une date et un libellé ; jamais effacée, annulée avec un motif ; **D25** les revenus sont les ventes du module M2 (chiffre d'affaires, pas seulement l'encaissé) rattachées au même producteur, à la même culture et à la même campagne ; **D26** compte d'exploitation d'une culture = produits (ventes) moins charges ; marge par hectare = marge divisée par la superficie prévue au plan d'exploitation de la culture et de la campagne ; une exploitation est « en difficulté » quand sa marge est négative. Les intrants distribués par la coopérative ne sont pas encore comptés automatiquement.

| Fait | Phase | Contenu | A | B |
|---|---|---|---|---|
| [x] | **M3-1 Charges** | Saisie guidée (catégorie, culture du producteur, montant, date), liste filtrable, annulation avec motif, export | Modèle, règles, écran, tests | Droits `expense.*`, menu, e2e |
| [x] | **M3-2 Compte d'exploitation** | Par producteur, culture et campagne : produits, charges par catégorie, marge, marge par hectare, part de chaque charge | Règles, écran et fiche, onglet sur le producteur, tests | Droits `exploitation.read`, e2e |
| [x] | **M3-3 Vue consolidée et rapports** | Par coopérative et par culture : marges, classement, exploitations en difficulté ; rapports (compte d'exploitation, charges par catégorie) | Écrans, rapports | Tests |
| [ ] | **M3-4 Recette et fiche** | Accessibilité, 360 px, parcours, fiche M3 du chapitre 10 et document partagé | Fiche, recette | e2e, droits |

Droits proposés (à confirmer) : `expense.read` (administrateur, faîtière, gestionnaire, représentant, technicien, rapports) ; `expense.write` (administrateur, gestionnaire, technicien) ; `exploitation.read`, c'est-à-dire voir produits, marges et rentabilité (administrateur, faîtière, gestionnaire, représentant, rapports). Le technicien saisit des charges mais ne voit pas les ventes ni les marges (les revenus d'un producteur sont des données financières ; à valider).

## 5. Ce qui manque pour une mise en production

| Domaine | Manque |
|---|---|
| **Serveur** | API, base de données, import réel, fichiers, tâches asynchrones (PRD Backend) |
| **Authentification réelle** | Service HTTP à la place du service de démonstration ; cookies `HttpOnly`, limitation de débit, sessions révocables |
| **E-mail** | Fournisseur d'envoi, domaine d'expédition (SPF, DKIM, DMARC), modèles de messages en français et en wolof |
| **Sécurité** | En-têtes HTTP et CSP, protection CSRF, chiffrement des CNI et des sauvegardes, journal d'audit inaltérable, test d'intrusion (voir `docs/DEVELOPPEMENT.md`, chapitre 4) |
| **Hébergement** | Cible non choisie ; déploiement continu non écrit |
| **Charte graphique** | Aucune charte reçue : jetons provisoires. Seul le bloc « primitive » de `styles.css` change à la réception |
| **Wolof** | Traducteur ou relecteur, glossaire métier, vérification de la police |
| **Données** | Import réel de la base CRADESC, validation des 11 ou 10 SCOOP |
| **Exploitation** | Supervision, sauvegarde et restauration testées, plan de reprise |
| **Recette** | Essais sur appareils réels, tests d'accessibilité, accompagnement des utilisateurs |

---

## 6. Propositions d'amélioration à présenter au client

Éléments **hors du périmètre actuel** ou allant au-delà des exigences. Les efforts sont des **estimations d'ordre de grandeur** à confirmer avant tout chiffrage : S = jusqu'à 3 jours, M = 4 à 10 jours, L = plus de 10 jours.

| # | Proposition | Intérêt pour le client | Effort | Lien avec l'existant |
|---|---|---|---|---|
| P1 | **Interface complète en wolof** (mécanisme, glossaire, traduction relue, lecteur de textes en option) | Accès réel des gestionnaires et techniciens ; argument fort auprès des bailleurs | M à L | Décidé en interne ; à chiffrer comme prestation |
| P2 | **Connexion par SMS** en second canal, avec choix du canal par utilisateur | Joignable sans e-mail ; réalité du terrain | S à M | Prévu au chapitre 5 de `DEVELOPPEMENT.md` ; coût des SMS à la charge du client |
| P3 | **Rapports PDF et Excel mis en forme à la charte**, avec envoi planifié par e-mail (hebdomadaire, mensuel) | Rapports prêts pour les bailleurs sans manipulation | M | WE-90 ; la base des rapports existe |
| P4 | **Analyses cartographiques avancées** : cartes thématiques par SCOOP, assolements, densité par localité, comparaison de campagnes | Pilotage agronomique et argumentaire de financement | M à L | WE-57 |
| P5 | **Aide au traitement des doublons** : score de similarité, prise en compte des variantes de noms locaux, suggestions de classement | Gain de temps important sur 1 317 fiches et les imports futurs | M | Fondations de la revue des doublons en place |
| P6 | **Synchronisation automatique avec la collecte Kobo** (import planifié, photos incluses) | Plus de fichiers à échanger, données à jour | M à L | Note sur les photos Kobo ; import à blanc en place |
| P7 | **Application utilisable hors connexion** pour les gestionnaires en zone peu couverte | Travail possible en déplacement ; synchronisation au retour du réseau | L | Dépend de la réponse à INF 44 |
| P8 | **Sécurité renforcée** : double authentification par application, journal d'audit inaltérable, alertes de connexion inhabituelle, test d'intrusion indépendant | Confiance du client et des bailleurs sur des données personnelles | M | Base de sécurité posée ; renforcement possible |
| P9 | **Module cotisations et paiements mobiles** (Wave, Orange Money) | Fait vivre la plateforme au quotidien dans les SCOOP | L | Hors périmètre du PRD (paiement en ligne exclu) : à cadrer à part |
| P10 | **Tableau de bord bailleurs** : indicateurs de résultats, répartition femmes et jeunes, évolution par campagne, export de rapports de suivi | Valorise le projet auprès des financeurs | M | Dashboard et indicateurs de qualité existants |
| P11 | **Notifications** : résumé quotidien des alertes et demandes à traiter, rappels | Réduit les oublis, accélère la qualité des données | S à M | Dépend du fournisseur d'e-mail |
| P12 | **Formation et documentation utilisateur** en français et en wolof (guides illustrés, vidéos courtes), support de lancement | Adoption par les utilisateurs | M | Interface prête pour la recette |
| P13 | **Maintenance, supervision et sauvegardes** sous contrat de service | Continuité et sécurité après la livraison | Récurrent | |
| P14 | **Extension à d'autres zones ou organisations** (gestion de plusieurs faîtières) | Réutilisation de la plateforme au-delà de la Zone des Niayes | L | Hiérarchie déjà modélisée |
| P15 | **Audit d'accessibilité** et essais sur appareils d'entrée de gamme | Conformité et confort d'usage | S à M | Adaptation mobile réalisée |

Ordre suggéré à présenter : **P1, P3, P8** (valeur immédiate et visible), puis **P5, P4, P10**, puis **P6, P7, P9** selon les réponses du client.

---

## 7. Décisions à obtenir

| Sujet | Question | Pour qui |
|---|---|---|
| Charte graphique | Calendrier de réception de la charte et des logos (INF 61 à 64) | Client |
| Hébergement | Où héberger l'application et les données ? Contraintes de localisation des données ? | Client, direction technique |
| E-mail | Qui fournit le nom de domaine et le service d'envoi ? | Client |
| Postes de travail | Les gestionnaires ont-ils un ordinateur ? (INF 44) | Client |
| CNI | Quels rôles peuvent lire la CNI en clair ? (Q4) | Client |
| SCOOP | Onze ou dix SCOOP ? Liste officielle | Client, faîtière |
| Export anonymisé | Le contenu actuel suffit-il à protéger les personnes dans de petits villages ? | Client |
| Wolof | Qui traduit et relit ? Quelle part de l'interface en priorité ? | Client |
| Évolution Scopla | Valider le plan 4.5 et répondre aux décisions D1 à D12 (nom du produit, CNI, rôles, statuts de membre, circuit de validation, plans d'exploitation, rapports, documents, menu, ordre) | Client, direction technique |
| Wolof : plan | ~~Valider le plan du chapitre 6~~ **Validé le 23 oct. 2026** (locuteur + relectrice / glossaire d'abord ; FR par défaut ; **journal d'audit conservé en français** ; en-têtes FR ; nombres `fr-SN` ; ordre d'extraction laissé aux équipes, chapitre 6.9 de `DEVELOPPEMENT.md`) | Client, direction technique |
| Historique Git | Nouveau dépôt avec historique conservé ou départ propre ? | Direction technique |

## 8. Risques

| Risque | Effet | Parade |
|---|---|---|
| Démonstration prise pour un produit prêt | Attentes de mise en service rapide | Rappeler la section 5 ; bandeau « Mode démonstration » conservé |
| Charte graphique tardive | Reprise de l'habillage | Variables de design isolées : seul le bloc « primitive » change |
| Traduction wolof sous-estimée | Retard et incohérences | Glossaire d'abord, relecture par une personne locutrice, test des clés manquantes |
| Données personnelles réelles dans le dépôt | Fuite | Règles du chapitre 4 de `DEVELOPPEMENT.md`, recherche de secrets en intégration continue, `data/revue-doublons/` ignoré |
| Droits appliqués seulement par l'interface | Dans la démonstration, les actions du store (plans, dossiers, membres) vérifient le périmètre SCOOP et les règles de données, mais pas le droit du rôle : c'est l'interface qui masque les boutons. Un appel direct contournerait ce contrôle | Le serveur réel applique les droits à chaque appel (chapitre 4 de `DEVELOPPEMENT.md`) ; à ne jamais livrer sans cette couche |
| Deux personnes ou agents dans le même dossier | Écrasements de fichiers | Règles du chapitre 2 de `DEVELOPPEMENT.md` (fichiers annoncés, ajout explicite à Git) |

## 9. Journal des mises à jour

| Date | Changement | Preuve |
|---|---|---|
| 22 oct. 2026 | Rédaction des PRD Web, Backend, Mobile et des jetons de design | `docs/prd/` |
| 21 à 22 oct. 2026 | Prototype web : écrans des lots 1 et 2 (plateforme Lovable) | Historique Git |
| 23 oct. 2026 | Audit complet du dépôt : points forts, 19 points à traiter | Rapport d'audit de la session |
| 23 oct. 2026 | Adaptation aux téléphones, tablettes et ordinateurs : tiroir de navigation, tableaux en cartes, filtres en panneau, cibles tactiles de 48 px | Captures avant / après, 3 tailles |
| 23 oct. 2026 | Passage à pnpm, `pnpm-lock.yaml`, garde de sécurité 24 h | Build et tests verts |
| 23 oct. 2026 | Refonte de l'organisation des écrans (entrée unique « Qualité des données », fiche organisation, import et export Excel, menus d'actions par ligne, sauvegarde) par une seconde session | 22 tests à ce moment |
| 23 oct. 2026 | Conventions de commit, nettoyage de `.gitignore`, plan de migration de dépôt, décision bilingue | `docs/DEVELOPPEMENT.md` |
| 23 oct. 2026 | Authentification par e-mail et code : connexion, mot de passe oublié, règles de sécurité testées | 17 tests ; parcours vérifié dans un navigateur sur mobile et ordinateur |
| 23 oct. 2026 | Règles de développement et CI/CD : guide unique `docs/DEVELOPPEMENT.md`, workflows GitHub, ESLint (tirets), Prettier, éditeur, variables d'environnement | `docs/DEVELOPPEMENT.md`, `.github/` |
| 23 oct. 2026 | Périmètre SCOOP centralisé (`scope.ts`) et appliqué à la fiche parcelle, aux rapports et à la carte ; rapports générés sur le périmètre ; protection des exports CSV ; pages d'erreur en français ; balayage des tirets ; libellés et placeholders des dialogues ; e-mail dans la gestion des utilisateurs ; comptes désactivés bloqués à la connexion | 50 tests ; vérification navigateur avec un compte gestionnaire |
| 23 oct. 2026 | Squelettes de chargement (première image, attente du routeur, carte) ; interrupteur partagé `Segmented` ; liste de filtre `FilterSelect` grisée à l'état neutre et teintée quand un filtre est actif ; jeton de couleur unique pour tous les placeholders | Vérifié dans un navigateur (ordinateur et téléphone) ; 50 tests |

| 23 oct. 2026 | Retours utilisateur (2e lot) : pastille de filtre `FilterPill` ; Qualité des données avec statuts de doublons regroupés en quatre pastilles et filtres secondaires repliés ; Référentiels en deux vues (Cultures, Règles et listes) avec phrases et impact en direct ; liens directs utilisateurs ↔ appareils ; Journal d'audit détaillé (familles d'actions, panneau de détail par entrée, liens vers l'objet, phrase lisible) | Vérifié dans un navigateur sur :8080 ; 50 tests |
| 23 oct. 2026 | Points 9, 10 et 12 : campagnes issues du référentiel, périmètre d'un rôle lu dans `permissions.ts` (`ROLE_IS_SCOPED`), statuts d'alertes en pastilles ; répartition du travail restant (section 4.4) | 51 tests |
| 23 oct. 2026 | Annuaire des producteurs : le filtre SCOOP en double est supprimé (celui de l'en-tête reste), tous les critères et la recherche sont dans l'adresse (partageable, conservés au rechargement) ; compteurs de la page de connexion calculés sur les données | Vérifié dans un navigateur ; 50 tests |
| 23 oct. 2026 | Composant `FormDialog` (titre, description, Annuler à gauche, action à droite, Entrée valide) adopté dans les dialogues des alertes, des corrections et des appareils ; libellé de champ corrigé (un exemple servait de nom accessible) | Vérifié dans un navigateur ; 51 tests |
| 23 oct. 2026 | Jeu de démonstration remplacé par le jeu complet : 1 317 producteurs, 1 534 parcelles (surfaces mesurées recalculées depuis les contours), 1 941 cultures, 609 alertes, 5 doublons candidats, 28 chevauchements, 114 organisations, 35 cultures en 7 familles ; 26 âges manquants gérés (« Âge non renseigné ») ; fusions historiques dans le journal | 55 tests dont 4 sur les volumes ; vérification navigateur |
| 23 oct. 2026 | `FormDialog` adopté aussi dans la carte (reprise, alerte) et la fiche producteur (demande de modification, avec libellés reliés aux champs) ; fichiers LICENSE, CONTRIBUTING, SECURITY et CODEOWNERS ajoutés pour le nouveau dépôt | Vérifié dans un navigateur ; 55 tests |
| 23 oct. 2026 | Vérification à 360 px de 13 écrans (organisations, comptes, appareils, référentiels, imports, sauvegarde, journal, qualité, utilisateurs) : aucun débordement ; tableau des cultures adapté, compteur d'actions sensibles du journal aligné ; textes du tableau de bord, des rapports et de l'annuaire réécrits en langage simple | Captures 360 px ; 55 tests |
| 23 oct. 2026 | `LICENSE` au nom du CRADESC (maître d'ouvrage) et du CANAS (titulaire de la mission) d'après la note de cadrage ; décision d'un commit initial unique pour le nouveau dépôt | Note de cadrage v1.1 |
| 23 oct. 2026 | Nouveau dépôt privé `mbaydiaay-proto` : commit initial unique `1735db7` poussé, dossier de travail déplacé dans le clone ; ajout au guide de la liste des réglages GitHub (chapitre 3), mention de confidentialité au README, étiquette `v0.1.0` ; répartition A/B des tâches restantes | CI verte avant envoi ; 55 tests |
| 23 oct. 2026 | `vite.config.ts` écrit à la main (Tailwind, chemins TS, TanStack Start, Nitro au build (preset Vercel depuis le 23 octobre), React, port 8080) ; dépendance `@lovable.dev/vite-tanstack-config` supprimée | `pnpm run ci` vert ; serveur 8080 répond |
| 23 oct. 2026 | Onze avertissements « fast refresh » supprimés : constantes de navigation et de la section Qualité déplacées dans `src/lib/nav.ts` et `src/lib/quality-nav.ts`, exception de règle pour `components/ui` (convention shadcn) ; vérification à 360 px de la connexion (2 étapes), du tableau de bord, des producteurs (liste et fiche) et de la carte : aucun débordement horizontal mesuré | lint sans avertissement ; 55 tests |
| 23 oct. 2026 | Tests de parcours dans un navigateur (Playwright) : connexion en deux étapes, droits et périmètre par rôle, correction demandée puis approuvée, carte et reprise, fusion défaite, import CSV avec rapport à blanc, exports, téléphone 360 px ; job `e2e` dans la CI | 22 scénarios, exécutés deux fois sans échec ; `pnpm e2e` |
| 23 oct. 2026 | Rapporteur d'erreurs neutre à la place de celui de Lovable : écoute des erreurs de script et des promesses rejetées, masquage des données personnelles, route sans paramètres, anti-doublon, envoi facultatif par `VITE_ERROR_REPORT_URL` ; plus aucune référence à Lovable dans `src/` | 9 tests (64 au total) ; 22 parcours navigateur |
| 23 oct. 2026 | Outillage à jour : ESLint 10, `@eslint/js` 10, `globals` 17, `jest-dom` 7. **Volontairement gardés** : `eslint-plugin-react-hooks` 5 et `eslint-plugin-react-refresh` 0.4 (leurs versions 7 et 0.5 ajoutent 13 erreurs et 34 avertissements à traiter dans un chantier à part). **Pas encore montés** (changements de code à prévoir, un par un) : Recharts 3, Zod 4, TypeScript 7, Vitest 5, jsdom 30, lucide-react 1, react-day-picker 10, `@hookform/resolvers` 6, plugin React 6, Vite 8.3 et TanStack | `pnpm run ci` vert |
| 23 oct. 2026 | Plan de l'interface bilingue français et wolof rédigé et chiffré (570 textes, 272 pluriels à la main, 45 entrées de journal) : mécanisme maison `src/lib/i18n/`, répartition entre les deux sessions, glossaire à faire remplir, six décisions à obtenir ; aucun changement dans `src/` | `docs/DEVELOPPEMENT.md` chapitre 6 |
| 23 oct. 2026 | Déploiement Vercel : preset Nitro `vercel` (plus Cloudflare), `vercel.json`, garde-fou `pnpm check:host` et point de revue PR | build → `.vercel/output` |
| 23 oct. 2026 | Plan bilingue validé (6 décisions) ; mécanisme `src/lib/i18n/` + sélecteur de langue dans la coquille ; textes repères wolof d'essai | tests i18n ; bandeau et en-tête basculent |
| 24 oct. 2026 | Plan d'évolution fonctionnelle rédigé : notes Scopla (rôles, membres et producteurs distincts, dossiers à valider, rapports, plans d'exploitation, gestionnaire étendu) et réorganisation en cinq modules ; phases P1 à P8 réparties entre les deux sessions, douze décisions à obtenir ; aucun changement dans `src/` | `docs/ETAT_DU_PROJET.md` section 4.5 |
| 24 oct. 2026 | Relecture de sécurité de la matrice des droits (4.5.3) par la seconde session : pièces sensibles et secrétaire, séparation des tâches, périmètre du technicien, masquage par défaut, traçabilité des téléchargements, un compte de démonstration par rôle ; décision D12 ajoutée | `docs/ETAT_DU_PROJET.md` section 4.5.3 |
| 24 oct. 2026 | P1, part B : 4 nouveaux rôles (représentant, secrétaire, ventes, rapports) avec leurs droits, périmètre à plusieurs SCOOP pour le technicien (un rôle limité sans SCOOP ne voit rien), 4 comptes de démonstration, fonctions `scopedMembers/Dossiers/Documents/Plans`, `canReadDocument` et `canDownloadDocument` (pièces sensibles : droit CNI requis ; technicien : ses dossiers seulement) ; 239 tests de droits par rôle et par droit | `pnpm run ci` et `pnpm e2e` verts |
| 24 oct. 2026 | P2 et P3, part B : menu en cinq modules (fonctions « à venir » non cliquables), droit `org.read` (la faîtière voit les GIE en lecture seule), entrées « Ma coopérative » et « Équipe », filtre SCOOP global sur ces deux écrans ; parcours navigateur du menu et de l'attribution des accès (représentant, gestionnaire) ; décision D13 consignée | tests de droits, `pnpm e2e` menu et équipe verts |
| 24 oct. 2026 | P4, part B : entrée « Dossiers producteurs » au menu (filtre SCOOP global) ; règle de décision consignée dans la matrice (la secrétaire instruit, seuls l'administrateur, le gestionnaire et le représentant approuvent ou refusent) ; 5 parcours navigateur du circuit : soumission par le technicien, dossier incomplet bloqué, doublon à trancher avant approbation, secrétaire sans CNI ni décision, accès refusé aux ventes | `pnpm e2e` dossiers vert |
| 24 oct. 2026 | P5, part B : le journal d'audit s'ouvre avec `audit.read` ou `audit.read.scoop` (entrée de menu alignée) ; 4 parcours navigateur : le gestionnaire lit moins d'entrées que l'administrateur, le technicien est refusé, l'onglet Pièces est visible du gestionnaire et absent pour le responsable des rapports | `pnpm e2e` audit vert |
| 25 oct. 2026 | P6, part B : 3 parcours navigateur des rapports (le gestionnaire génère, retrouve et télécharge un CSV, tracé au journal ; la secrétaire est refusée ; la faîtière choisit parmi toutes les coopératives). Les tests ont révélé une boucle infinie à l'ouverture de l'écran Rapports (sélecteur du store qui renvoyait un nouveau tableau à chaque lecture) : corrigée | `pnpm e2e` rapports vert |
| 25 oct. 2026 | P7, part B : tests du périmètre des plans (un plan d'une autre SCOOP est invisible, non modifiable, non créable ; un technicien écrit dans ses SCOOP seulement) ; sauvegarde et restauration confirmées couvrir membres, dossiers, pièces, plans et rapports ; limite consignée aux risques : le store ne vérifie pas le droit du rôle, seulement le périmètre | 377 tests |
| 25 oct. 2026 | Bilingue : réponses de l'utilisateur consignées (journal d'audit conservé en français, ordre d'extraction en carte blanche) ; répartition finale en neuf lots (6.9) ; extraction autorisée | `docs/DEVELOPPEMENT.md` 6.3, 6.4, 6.7, 6.9 |
| 25 oct. 2026 | Bilingue, lot L1 côté B : connexion, mot de passe oublié, saisie du code, règles du mot de passe, messages d'erreur d'authentification et courriel simulé sortis en clés (`messages/auth.ts`, 95 clés) ; sélecteur de langue sur les pages d'accès ; parcours navigateur du choix de langue (bascule en repères wolof, choix conservé au rechargement) | 377 tests ; e2e auth, mobile, langue verts |
| 25 oct. 2026 | Bilingue, lots B : pages d'accès, menu, recherche, filtres, rôles et droits, pages d'erreur, carte, parcelle, composants communs, imports, sauvegarde, organisations extraits (dictionnaires `auth`, `shell`, `carte`, `imports`, `sauvegarde`, `organisations`) ; recette à 360 px en pseudo-localisation (textes allongés de 30 %) sur 18 pages : aucun débordement ; il reste 1 texte en dur (équipe, lot A) | e2e `mobile-wolof` vert (4 répétitions) |
| 25 oct. 2026 | M1, part B : menu activé (Cotisations, Réunions, Documents, Coopératives) avec leurs droits ; téléchargement d'un document de la coopérative aligné sur `library.read` (la secrétaire télécharge les pièces ouvertes, jamais une pièce sensible) ; 9 parcours de droits M1 ; recette wolof à 360 px étendue à 22 pages : débordements corrigés (rapports, doublons, sauvegarde, utilisateurs, carte, pastilles longues) | 472 tests ; 81 parcours navigateur verts |
| 25 oct. 2026 | M1-1, part B : invitation du gestionnaire d'une nouvelle coopérative : lien à usage unique valable 7 jours, page `/invitation` (mot de passe choisi par la personne, règles affichées), activation du compte, refus d'un lien expiré, déjà utilisé ou remplacé ; avant activation, aucun mot de passe ne marche (message identique, aucune fuite) ; en démonstration le lien est affiché dans un encadré « invitation simulée » ; 6 tests des règles et 1 parcours de bout en bout (création, déconnexion, lien, mot de passe, code, première connexion) | tests et e2e verts |
| 25 oct. 2026 | M1-2 à M1-5 : membre complet (âge, handicap, village), cotisations (règle par coopérative, états à jour, en retard, jamais payé, paiements annulés sans effacement, reçus), réunions et assemblées avec pointage et procès-verbal figé, bibliothèque de documents de la coopérative ; périmètre par `scope.ts` ; droits `contribution.*`, `meeting.*`, `library.*` | 471 tests ; parcours par écran |
| 25 oct. 2026 | M1-1 : les coopératives deviennent un état du store (30 fichiers migrés), création avec compte gestionnaire inactif et invitation, archivage refusé si dossiers en cours, journal par étape ; invitation à usage unique et activation côté authentification (B) | 482 tests ; e2e invitation |
| 25 oct. 2026 | Rapports « Cotisations par membre » et « Réunions et présences » ; téléchargement d'un document contrôlé par le droit et le périmètre | 476 tests |
| 25 oct. 2026 | Recette d'accessibilité du module : contrôle axe automatisé, contrastes corrigés (texte d'accent, pastille de compteur, texte indicatif), noms accessibles des boutons de recherche et de page, entrée de menu active seulement sur la route exacte | 12 contrôles verts |
| 25 oct. 2026 | Retours du soir : fiche coopérative à onglets (R2, R6), choix de la coopérative à l'ajout d'un membre (R3), calendrier des réunions (R4, composant de B), dossiers explicatifs (R5) ; document partagé de vision, rôles et suivi | 495 tests ; parcours verts |
| 26 oct. 2026 | M4-1 à M4-4 : campagnes modifiables (entité du store, clôture définitive), calendriers culturaux (brouillon puis validé, versions), planning prévu déduit du mois de semis, opérations réelles avec écart, onglet Suivi du plan, vue d'ensemble avec calendrier et assolement ; droits `campaign.*`, `calendar.*`, `operation.*` | 566 tests ; 134 parcours |
| 26 oct. 2026 | M4, part B : entrées de menu Campagnes, Calendriers culturaux et Suivi des cultures (section Terrain et qualité) ; « Campagnes et calendriers » retiré de « Bientôt » ; 5 tests des droits appliqués par le store (campagne : administrateur seul ; calendrier : le technicien rédige, ni la secrétaire ni les ventes ; validation refusée au technicien ; opération : refusée à la secrétaire, aux ventes et à la faîtière, et à un technicien sur le plan d'une autre SCOOP) ; 7 parcours de droits ; boutons « Annuler » et « Fermer » des dialogues passés en clés | 571 tests ; 141 parcours verts |
| 26 oct. 2026 | M2 : stocks d'intrants par lot (alertes de stock bas et de péremption), crédits avec échéancier, remboursements et retards, ventes avec encaissements et section par culture ; droits `stock.*`, `credit.*`, `sales.*` ; trou de périmètre repéré par B (le rôle ventes aurait lu les crédits via le sélecteur) corrigé : droit de lecture puis périmètre ; trois rapports du module | 628 tests ; 167 parcours |
| 26 oct. 2026 | M3 : charges des exploitations (saisie guidée, annulation avec motif, répartition), compte d'exploitation par producteur, culture et campagne (produits, charges, marge, marge par hectare, exploitations en difficulté), agrégats par culture d'abord, consultation d'un compte tracée au journal, deux rapports ; droits `expense.*` et `exploitation.read` (le technicien saisit mais ne voit ni ventes ni marges) | 638 tests ; 194 parcours |
| 31 oct. 2026 | Dépôt officiel `mbay-diaay/mbay-diaay` : import borné au **Module 1** uniquement (routes M2–M5 retirées, menu et e2e adaptés) ; docs `MISSION_MODULE1_ET_TRELLO.md` + `suivi-trello/` (pas d’API Trello : aucun jeton local) | `pnpm typecheck` ; 723 tests unitaires |

## 10. Fiches par module : ce qui est fait

Cette partie répond à une seule question par module : **qu'est-ce qui existe, que peut-on faire, qui peut le faire, et qu'est-ce qui reste ?** Elle est mise à jour à chaque fin de phase. Sources : note de cadrage v1.1 (§5), notes Scopla, échanges avec l'utilisateur.

### 10.1 M1 Administratif (gérer)

**Objectif** : connaître les personnes et la structure de chaque coopérative, et tenir son administration (note de cadrage §5.1).

**État au 25 octobre 2026 : toutes les fonctions de la note existent dans le prototype ; reste la validation avec les coopératives et le serveur réel.** Une version lisible par toute l'équipe, avec la vision, les rôles, les règles, les décisions et les commentaires, est le document partagé « Mbay Diaay : vision, rôles et suivi du module Administratif » (lien donné à l'utilisateur ; il se met à jour à chaque fin de phase).

| Capacité demandée | État | Où | Qui peut |
|---|---|---|---|
| Base des producteurs (identité, contact, genre, âge, handicap, localisation) | Fait | Producteurs, fiche producteur | Lecture : tous les rôles de coopérative ; modification : administrateur, gestionnaire |
| Données personnelles protégées (téléphone, CNI masqués, lecture tracée) | Fait | Fiche producteur, pièces | CNI en clair : administrateur, gestionnaire, représentant |
| Organisations et GIE navigables, onglet GIE filtrable dans la fiche coopérative | Fait | Fiche coopérative, Organisations | Lecture : faîtière et coopératives ; gestion : administrateur, gestionnaire |
| Membres : statut, âge, handicap, village, compte, cotisation, présence aux réunions | Fait | Équipe, fiche membre | Représentant, administrateur ; lecture : gestionnaire, secrétaire, faîtière |
| Rôles et accès attribués par le représentant (périmètre SCOOP), coopérative choisie par l'administrateur à l'ajout | Fait | Équipe | Représentant, administrateur |
| Dossier producteur : circuit, séparation des tâches, doublons, rappel à 14 jours, bandeau d'étapes, aide par statut, filtres toujours visibles | Fait | Dossiers producteurs | Création : technicien ; instruction : secrétaire, gestionnaire, représentant ; décision : gestionnaire, représentant, administrateur |
| Pièces jointes, pièces sensibles protégées | Fait | Dossier, fiche producteur | Selon la matrice 4.5.3 |
| Coopératives : créer (avec compte gestionnaire invité), modifier, archiver (refusé si dossiers en cours), réactiver | Fait | Coopératives | Administrateur ; lecture : faîtière et coopératives (leur périmètre) |
| Fiche coopérative à onglets (Aperçu, GIE, Membres, Techniciens, Réunions, Cotisations) | Fait | Coopératives, clic sur une coopérative | Selon les droits de chaque onglet |
| Invitation du gestionnaire (lien à usage unique de 7 jours, activation du compte) | Fait | Page d'invitation | Administrateur crée, gestionnaire accepte |
| Cotisations : règle par coopérative, paiements, annulation avec motif, reçus, export | Fait, règle à confirmer | Cotisations | Enregistrer : administrateur, gestionnaire, représentant ; lecture : secrétaire, faîtière |
| Réunions et assemblées : liste, calendrier (mois, semaine, jour, liste), pointage, procès-verbal validé figé | Fait | Réunions | Gérer : administrateur, gestionnaire, représentant, secrétaire ; lecture : faîtière |
| Documents de la coopérative (statuts, règlement, PV, conventions) | Fait | Documents | Gérer : administrateur, gestionnaire, représentant, secrétaire |
| Journal d'audit (complet pour l'administrateur, limité à la SCOOP sinon) | Fait | Journal d'audit | Administrateur, gestionnaire, représentant |
| Rapports (effectifs, superficies, qualité, reprises, cotisations, réunions) avec historique et téléchargement tracé | Fait | Rapports | `report.generate`, `report.read`, `report.download` |
| Comptes, appareils, utilisateurs, référentiels, imports, sauvegarde | Fait | Administration | Administrateur |
| Accessibilité : contrôle axe WCAG A et AA sur les écrans du module et la coquille | Fait | e2e/a11y-m1.spec.ts | |
| Menu en sections repliables, cible de 7 entrées visibles | En cours (B) | Menu | |
| Assistance : l'administrateur aide un utilisateur en lecture seule | Non commencé | | Décision D17 |

**Décisions en attente** : D4, D6 à D9, D13 à D17 (4.5.7 et 4.7) ; règles de cotisation de chaque coopérative et champs obligatoires d'un adhérent (client, INF 30).

**Preuves** : 495 tests unitaires, 96 parcours dans un navigateur, contrôle d'accessibilité, `docs/ETAT_DU_PROJET.md` 4.5 à 4.7.

### 10.2 M2 Commercial (échanger)

**Objectif** : suivre ce que la coopérative distribue, prête et vend (note de cadrage §5.2). **État au 26 octobre 2026 : fonctions web faites, règles à valider avec les coopératives ; reste la veille des prix (second rang) et la saisie hors connexion (mobile).**

| Capacité | État | Où | Qui peut |
|---|---|---|---|
| Stocks d'intrants par lot : catalogue, réception, solde, valeur, péremption proche ou dépassée, stock bas, sorties (distribution à un membre, consommation, perte), annulation avec motif | Fait, unités et catalogue à valider (D21) | Stocks d'intrants | Lecture : administrateur, faîtière, gestionnaire, représentant, secrétaire, ventes ; gestion : administrateur, gestionnaire |
| Crédits à un membre en règle : échéancier calculé avec aperçu, remboursements avec reçu, annulation avec motif, états en cours, soldé, en retard, encours | Fait, règles de crédit à valider (D22) | Crédits | Lecture : administrateur, faîtière, gestionnaire, représentant ; gestion : administrateur, gestionnaire ; jamais visibles du profil ventes ni de la secrétaire |
| Ventes : enregistrement (producteur, culture, quantité, prix, acheteur), encaissements, annulation avec motif, section par culture, campagne en cours | Fait, revenu repris par M3 (D23) | Ventes | Lecture : administrateur, faîtière, gestionnaire, représentant, ventes, rapports ; gestion : administrateur, gestionnaire, ventes |
| Rapports : état des stocks, encours des crédits, ventes par culture (droit de lecture du sujet exigé) | Fait | Rapports | Selon le droit de chaque sujet |
| Veille des prix de marché | Non commencé (second rang dans la note) | | |
| Saisie hors connexion | Non commencé (application mobile) | | |

**Décisions en attente** : D21 à D23 (4.9) ; règles réelles de crédit de chaque coopérative, catalogue d'intrants et unités, qui enregistre les ventes.

**Preuves** : 628 tests unitaires, 167 parcours dans un navigateur, accessibilité sans violation sur les trois écrans, 360 px en français et en wolof repère ; les données financières ne sortent des sélecteurs qu'avec le droit de lecture puis le périmètre.

### 10.3 M3 Exploitation (mesurer)

**Objectif** : savoir quelles cultures et quelles exploitations sont rentables, et lesquelles sont en difficulté (note de cadrage §5.3). **État au 26 octobre 2026 : fonctions web faites, règles de calcul à valider ; reste le PDF mis en forme (avec le serveur), les rapports individuels envoyés au producteur et les intrants de la coopérative comptés automatiquement.**

| Capacité | État | Où | Qui peut |
|---|---|---|---|
| Charges par catégorie (intrants, main-d'œuvre, transport, irrigation, location de matériel, autre) rattachées à un producteur, une culture, une campagne ; saisie guidée ; annulation avec motif ; répartition ; export | Fait, catégories à valider (D24) | Charges | Lecture : administrateur, faîtière, gestionnaire, représentant, technicien, rapports ; saisie : administrateur, gestionnaire, technicien |
| Compte d'exploitation calculé : produits (ventes de M2), charges, marge, marge par hectare, exploitations en difficulté | Fait, définitions à valider (D25, D26) | Comptes d'exploitation ; onglet Exploitation de la fiche producteur | Administrateur, faîtière, gestionnaire, représentant, rapports ; jamais le technicien, la secrétaire ni « ventes » |
| Agrégats par culture d'abord, détail par producteur ensuite ; chaque consultation du compte d'un producteur écrite au journal comme la CNI | Fait | Comptes d'exploitation | Idem |
| Rapports : comptes d'exploitation par culture (sans nom de producteur), charges par catégorie | Fait | Rapports | Selon le droit de chaque sujet |
| Rapports individuels et PDF mis en forme | Non commencé (avec le serveur) | | |
| Intrants distribués par la coopérative comptés automatiquement dans les charges | Non commencé | | |

**Décisions en attente** : D24 à D26 (4.10) ; règles de calcul de la marge confirmées avec les coopératives.

**Preuves** : 638 tests unitaires, 194 parcours dans un navigateur, accessibilité sans violation sur les écrans, 360 px en français et en wolof repère ; marges et revenus jamais lisibles sans le droit puis le périmètre.

### 10.4 M4 Agronomique (conduire)

**Objectif** : planifier les cultures et suivre ce qui est réellement fait (note de cadrage §5.5). **État au 26 octobre 2026 : fonctions web faites, à valider avec les techniciens ; reste le mobile (saisie hors connexion) et les recommandations par stade (second rang).**

| Capacité | État | Où | Qui peut |
|---|---|---|---|
| Plans d'exploitation (cultures, surface, mois de semis, parcelle, états brouillon, validé, à jour) | Fait | Plans d'exploitation, onglet Plans du producteur | Lecture : coopératives et faîtière ; écriture : technicien, gestionnaire, administrateur |
| Campagnes : créer, modifier, ouvrir, clôturer (clôture définitive, plus de plan ni d'opération) | Fait, définition à valider (D18) | Campagnes | Administrateur ; lecture : tous les rôles qui lisent les plans |
| Calendriers culturaux par culture : étapes datées depuis le semis, brouillon puis validé, nouvelle version qui remplace l'ancienne | Fait, rédacteurs et valideurs à valider (D19) | Calendriers culturaux | Rédiger : technicien, gestionnaire, administrateur ; valider : gestionnaire, administrateur |
| Opérations prévues déduites du calendrier et du mois de semis de chaque ligne de plan | Fait | Plan, onglet Suivi | Lecture : comme les plans |
| Saisie du réel : date, observation, photos décrites, hors calendrier possible ; état à faire, fait, en retard ; écart prévu et réel | Fait, photos décrites seulement en démonstration (D20) | Plan, onglet Suivi ; Suivi des cultures | Saisir : technicien, gestionnaire, administrateur |
| Vue d'ensemble : opérations à faire ou en retard, calendrier, assolement par culture et campagne | Fait | Suivi des cultures | Lecture : comme les plans |
| Alertes et recommandations par stade | Non commencé (second rang dans la note) | | |
| Saisie hors connexion sur le terrain | Non commencé (application mobile) | | |

**Décisions en attente** : D18 (définition d'une campagne), D19 (qui rédige et valide les calendriers), D20 (photos), modèle de plan des techniciens (D6). Les calendriers de démonstration (oignon, tomate, pomme de terre, chou validés ; carotte en brouillon) sont indicatifs.

**Preuves** : 566 tests, 134 parcours dans un navigateur, contrôle d'accessibilité sans violation sur les écrans du module, 360 px en français et en wolof repère.

### 10.5 M5 SIG (localiser)

Fait pour le web : carte des parcelles avec filtres et actions par parcelle, fiche parcelle, détection des chevauchements, validation et reprise, qualité des données (doublons, alertes, corrections), export GeoJSON. **Reste** : relevé GPS hors connexion (mobile, PRD Mobile).