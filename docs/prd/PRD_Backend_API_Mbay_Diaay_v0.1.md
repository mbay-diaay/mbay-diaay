# PRD — Backend & API partagé · Mbay Diaay

| | |
|---|---|
| **Version** | 0.1 — brouillon de travail interne |
| **Date** | 22 octobre 2026 |
| **Auteur** | Direction technique (Lead technique) |
| **Lecteurs** | Dev web, dev mobile, base de données, sécurité |
| **Statut** | Non validé par le client. Alimente le L2 (fin S3). |

## 0. Convention de lecture

Chaque exigence porte un statut :

- **Confirmé** : établi par une source citée.
- **Proposé** : ce que l'équipe **prévoit de développer**. Ce n'est pas encore validé par le client : ces choix lui seront présentés comme des propositions, et ses retours pourront les modifier.
- **À valider** : décision ou information manquante.

Sources : **[NC]** Note de cadrage v1.0 · **[OT]** Offre technique CANAS · **[BC]** Base CRADESC (export Kobo apuré du 05/10/2026) · **[GT]** Grille des tâches Phase 1.

> Le schéma de données ci-dessous est un **schéma logique indicatif**. Il ne doit pas être figé avant l'arbitrage de la Vision des acteurs et des rôles par le client.

---

## 1. Objectif et périmètre

**Objectif.** Fournir une API REST unique, partagée par l'application web et l'application mobile. Le backend est la **seule source** des règles métier et des droits d'accès : ni le web ni le mobile ne redéfinissent ces règles.

**Dans ce PRD :** authentification, droits, organisations, producteurs, parcelles et SIG, campagnes et cultures, synchronisation, qualité des données et doublons, données personnelles (dont la CNI), import de la base CRADESC, conventions d'API.

**Hors de ce PRD :**
- les écrans et parcours (PRD Web, PRD Mobile) ;
- la charte graphique ;
- la base consolidée SCOOP, traitée après la base CRADESC, sans fusion entre les deux ;
- le détail des modules commercial, compte d'exploitation et agronomique, qui font l'objet d'un PRD ultérieur (§4.8).

## 2. Principes directeurs

| # | Principe | Statut |
|---|---|---|
| P1 | Les droits sont vérifiés **côté serveur** sur chaque requête et chaque mutation synchronisée. L'appareil n'est jamais source de confiance. | Confirmé [NC §8.3] |
| P2 | Les **rôles sont de la configuration** (tables), jamais du code en dur. | Proposé |
| P3 | **Offline-first** : le mobile écrit d'abord en local ; le serveur applique les mutations de façon idempotente. | Confirmé [OT §4.2] |
| P4 | **Aucune fusion ni suppression automatique** de fiches. Toute fusion est humaine, journalisée et réversible. | Proposé |
| P5 | Toute modification de donnée sensible est **auditée** (avant / après / auteur / date). | Confirmé [OT §4.3] |
| P6 | **Minimisation** : on ne collecte et n'expose que le nécessaire, par rôle. | Proposé [NC §10.4] |

## 3. Architecture

| Couche | Choix | Statut |
|---|---|---|
| API | NestJS, monolithe modulaire, REST, Swagger | Confirmé [OT §3.2] |
| Données | PostgreSQL 16 + PostGIS | Confirmé |
| Asynchrone | Redis + BullMQ (rapports, imports, post-traitement de sync) | Confirmé |
| Fichiers | MinIO (compatible S3) | Confirmé |
| Exploitation | Docker, GitHub Actions, Sentry, Grafana/Loki | Confirmé |

**Modules métier :** Administratif, Commercial, Agronomique, Exploitation, SIG.
**Modules transverses (proposés) :** Auth, Droits et périmètres, Synchronisation, Audit, Fichiers, Rapports/exports, Référentiels, Notifications, Import, Qualité des données.

**Règle de modularité (proposée) :** un module n'accède jamais directement aux tables d'un autre ; il passe par les services exposés.

---

## 4. Exigences fonctionnelles

### 4.1 Organisations et rôles

| ID | Exigence | Prio. | Statut |
|---|---|---|---|
| BE-01 | Hiérarchie **Faîtière (USCN) → SCOOP → organisation de base → producteur**. Le *type* d'organisation de base (GIE, section, association, groupement, individuel, membre direct) est une valeur de référentiel, pas une structure figée. | Must | Proposé |
| BE-02 | Tables `role`, `permission`, `role_assignment (utilisateur, rôle, organisation)`. Rôles de travail : Producteur, Technicien, Gestionnaire, Administrateur CRADESC [OT §4.3] ; Faîtière en lecture consolidée (DEC 05). | Must | Proposé |
| BE-03 | Les actions **saisir / valider / contrôler** sont des permissions distinctes. Le fait qu'un rôle (ex. président) cumule ou non ces permissions est un paramétrage, tranché après la Vision V1. | Must | Proposé |
| BE-04 | Chaque requête est contrôlée par le triplet *(rôle, action, périmètre organisationnel)*. Réponse 403 sinon. Tests automatisés par rôle. | Must | Confirmé |

**À valider avec le client :** liste officielle des SCOOP (**11** dans [BC], dix dans [NC]) ; statut du GIE par rapport à la section villageoise ; droits de CRADESC et de l'USCN.

### 4.2 Authentification

| ID | Exigence | Statut |
|---|---|---|
| BE-10 | Connexion par numéro de téléphone + code OTP par SMS, sans mot de passe. Limitation des tentatives et des envois. | Confirmé [OT §4.3] |
| BE-11 | Code PIN à 4 chiffres vérifié **localement** sur l'appareil pour l'usage sans réseau. | Confirmé |
| BE-12 | Jeton d'accès 1 h + jeton de renouvellement à rotation. Authentification renforcée pour l'administration web. | Confirmé / Proposé |
| BE-13 | Révocation à distance d'un appareil ; effacement local à la révocation. | Proposé |
| BE-14 | **Un numéro peut correspondre à plusieurs producteurs** : [BC] contient 26 numéros partagés par 53 fiches, tous au sein d'une même SCOOP. Le *compte utilisateur* est distinct de la fiche *producteur* : après l'OTP, l'utilisateur choisit le profil concerné, et la liaison compte ↔ producteur est validée par un technicien ou un gestionnaire. | Proposé |
| BE-15 | Durée maximale de saisie hors connexion après la dernière connexion. | À valider (INF 46) |

### 4.3 Producteurs et adhésions

| ID | Exigence | Statut |
|---|---|---|
| BE-20 | `producer` (identité stable) est séparé de `survey_response` (réponses de collecte datées : instruction, smartphone, difficultés, besoins, phase de collecte). | Proposé |
| BE-21 | « **Recensé** » n'est pas « **membre** » : le statut d'adhésion à une SCOOP est une donnée distincte de l'existence de la fiche. | Proposé |
| BE-22 | Chaque entité importée garde `legacy_id` (ex. `NIA-N-BTL-0001`, unique) et `source_kobo_id` en plus de son UUID. | Proposé |
| BE-23 | Téléphones normalisés E.164 (+221…) dans une table de contacts. **Aucune contrainte d'unicité** sur le numéro. | Proposé |
| BE-24 | Définition de « jeune » unique et configurable. [BC] contient 170 divergences entre « jeune déclaré » et « moins de 35 ans calculé ». | À valider |

### 4.4 Parcelles et SIG

| ID | Exigence | Statut |
|---|---|---|
| BE-30 | Géométrie stockée en WGS 84 ; surfaces calculées en UTM 28N (EPSG:32628). Surface stockée en **m² entiers**, affichée en hectares. | Confirmé / Proposé [NC §7.3, §9.2] |
| BE-31 | **Deux géométries par parcelle** : contour brut et contour réparé (`ST_MakeValid`). Le contour brut n'est jamais écrasé. | Proposé |
| BE-32 | Deux superficies : déclarée et mesurée, avec affichage de l'écart ; la mesurée validée prévaut. | Proposé (DEC 11) |
| BE-33 | Contrôles : validité du polygone, bornes de superficie, précision GPS, **chevauchements entre parcelles de producteurs différents** (alerte, pas de blocage). Statut : relevée / validée / à reprendre. | Proposé |
| BE-34 | Une nouvelle géométrie crée une **nouvelle version soumise à validation** ; jamais d'écrasement silencieux. | Confirmé [NC §8.4] |

### 4.5 Campagnes et cultures

| ID | Exigence | Statut |
|---|---|---|
| BE-40 | Entité pivot : **culture conduite sur une parcelle au cours d'une campagne** (`plot_crop`), rattachée à une campagne. | Proposé [NC §5.1] |
| BE-41 | Les résultats par campagne (quantité, prix, valeur, destinations) sont en **format long** : une ligne par campagne. Types initiaux : *campagne horticole nationale (CHN)* et *contre-saison (CS)*, extensibles. | Proposé |
| BE-42 | Référentiel de cultures normalisé (35 valeurs dans [BC]) + table d'alias conservant la saisie brute (79 variantes). | Proposé |
| BE-43 | Définition précise d'une campagne / saison. | À valider (INF 23) |

### 4.6 Synchronisation [NC §8, Must]

| ID | Exigence |
|---|---|
| BE-50 | **Envoi** : lots de mutations ordonnés, chacune identifiée par un UUID généré sur l'appareil ; application **idempotente** (une mutation déjà reçue n'est jamais rejouée). |
| BE-51 | **Réception** : synchronisation différentielle par curseur, **filtrée par périmètre** (technicien = sa SCOOP ; producteur = ses données). |
| BE-52 | Conflits par type de donnée : écritures financières et de stock en ajout seul (contre-écriture) ; fiche producteur fusionnée champ par champ (serveur prioritaire, conflit signalé) ; géométrie en nouvelle version ; référentiels en lecture seule ; opérations culturales en dernière écriture. |
| BE-53 | Pièces jointes (photos, documents) dans une file distincte, avec reprise après coupure. |
| BE-54 | Horloge : la date serveur fait foi pour l'ordre ; la date de l'appareil est conservée comme date métier. |
| BE-55 | Les droits sont **revérifiés pour chaque mutation** reçue. |
| BE-56 | Aucune perte de donnée saisie hors connexion, testée par scénarios de coupure réseau. |

### 4.7 Qualité des données et doublons

| ID | Exigence | Statut |
|---|---|---|
| BE-60 | `data_quality_flag` : type, sévérité, entité, statut (*ouvert, en vérification, résolu, rejeté*), commentaire, auteur. | Proposé |
| BE-61 | `duplicate_candidate` : paire de fiches, **signaux** (CNI identique, téléphone identique, nom proche, même village, âge compatible), statut ci-dessous. | Proposé |
| BE-62 | **Aucune fusion automatique.** Une fusion est une action humaine autorisée, qui conserve les identifiants d'origine et les liens producteur ↔ parcelle ↔ culture, est journalisée et **réversible**. | Confirmé [NC §6.5] |

Statuts d'un candidat doublon : `à_examiner` · `confirmé` · `probable` · `non_doublon` · `erreur_de_saisie_identité` · `non_résolu`.

### 4.8 Autres modules (périmètre seulement)

Commercial (stocks, crédits, ventes), Exploitation (charges, marges) et Agronomique (calendriers, itinéraires) seront détaillés dans un PRD ultérieur. Une règle est déjà fixée : les **écritures financières et de stock sont non modifiables** et corrigées par contre-écriture [NC §5.3]. Montants en FCFA entiers.

### 4.9 Identité visuelle et documents générés

Aucune charte n'a été transmise (INF 61 à 64). Le backend produit des documents (rapports PDF, exports cartographiques, fiches) et des SMS : l'identité visuelle doit donc y être **remplaçable sans toucher au code**.

| ID | Exigence | Statut |
|---|---|---|
| BE-90 | Table `branding` **versionnée** : nom affiché, logos (principal, monochrome, icône), mentions et logos des partenaires, slogan éventuel. Fichiers stockés dans MinIO. Valeurs provisoires tant que la charte n'est pas reçue. | Proposé |
| BE-91 | Les **documents générés** (rapports PDF, exports cartographiques, fiches) utilisent les design tokens (`design-tokens.json`) et le branding actif. Aucune mise en forme n'est figée dans le code des gabarits. | Proposé |
| BE-92 | Endpoint `GET /v1/branding` consommé par le web et le mobile ; le mobile en garde une copie locale pour fonctionner hors connexion. | Proposé |
| BE-93 | **Nom d'expéditeur des SMS** (OTP) configurable. | À valider (INF 55) |
| BE-94 | Un changement de charte met à jour la configuration et s'applique aux **documents futurs** ; les documents déjà émis ne sont pas modifiés. | Proposé |
| BE-95 | Graphie officielle du nom, logos et mentions obligatoires des partenaires. | À valider (INF 61 à 64) |

---

## 5. CNI et données personnelles

### 5.1 Position

La **CNI est conservée**. Elle est utile au rapprochement des doublons mais elle n'est **pas fiable seule** : elle peut être erronée, ou être celle d'un agent de terrain saisie à la place de celle du producteur. Elle sert donc de **signal**, jamais de preuve.

### 5.2 Règles

| ID | Règle | Statut |
|---|---|---|
| BE-70 | Stockage **chiffré au niveau applicatif** (AES-256-GCM, clé hors base) + **empreinte HMAC** distincte pour tester l'égalité sans déchiffrer. | Proposé |
| BE-71 | Affichage **masqué par défaut**. Lecture complète réservée à une permission dédiée (`identity.read_full`), attribuée par rôle. Qui la reçoit est à décider avec le client. | Proposé / À valider |
| BE-72 | Chaque lecture complète ou export nominatif est **tracé**. Aucune CNI, aucun téléphone en clair dans les logs [OT §10.2]. | Confirmé |
| BE-73 | Statut de la CNI : `déclarée` · `vérifiée` (pièce vue par un technicien) · `contestée`. | Proposé |
| BE-74 | Si une CNI correspond à celle d'un agent, technicien ou gestionnaire, le cas passe en `erreur_de_saisie_identité` et part en vérification humaine. Nécessite que le client fournisse ces données. | À valider |
| BE-75 | Un format non conforme (hors 13 chiffres) est signalé, pas rejeté. | Proposé |

### 5.3 Correction par les utilisateurs une fois connectés

| ID | Exigence | Statut |
|---|---|---|
| BE-80 | Un producteur connecté **consulte ses données** et peut en corriger une partie. | Proposé |
| BE-81 | Champs non sensibles (contact, village…) : modification directe, auditée. Champs d'identité (nom, CNI, sexe, âge) : **demande de correction** (`change_request`) approuvée par un technicien ou un gestionnaire. La répartition exacte est configurable. | Proposé / À valider |
| BE-82 | Toute modification conserve valeur avant, valeur après, auteur, date et motif. Une correction peut résoudre un candidat doublon ouvert. | Proposé |
| BE-83 | Consentement, droits d'accès et de rectification, durée de conservation, responsable du traitement, formalités CDP. | À valider (tâche 1.44, INF 70–72) |

---

## 6. Import de la base CRADESC

### 6.1 Principes

- **Scripts rejouables** et versionnés ; deux imports à blanc avant l'import final [NC §6.3].
- Le fichier Excel reste **la source figée**. Chargement brut en tables `staging_*` (colonnes en texte), puis transformation vers les tables cibles.
- Chaque lot est enregistré (`import_batch` : empreinte du fichier, date, version du script, compteurs).
- Idempotence par `legacy_id` : rejouer un import ne crée pas de doublon.

### 6.2 Correspondance feuilles → tables

| Feuille source | Lignes | Tables cibles |
|---|---|---|
| Producteurs | 1 317 | `producer`, `contact`, `membership`, `survey_response` |
| Parcelles | 1 534 | `plot`, `plot_geometry` (brute + réparée), `plot_infrastructure` |
| Cultures | 1 941 | `plot_crop`, `plot_crop_campaign` (CHN, CS en format long), `crop_practice` |
| Doublons traités | 19 | `merge_log` |
| Journal corrections | 2 673 | `import_correction_log` |
| Alertes à vérifier | 609 | `data_quality_flag` |
| Enquêteurs | 22 comptes Kobo | `field_agent` |
| Colonnes Zone, SCOOP, OP, Village, Culture | — | référentiels `organization`, `locality`, `crop`, `crop_alias` |

Les colonnes répétées sur Parcelles et Cultures (Zone, SCOOP, Village, nom) ne sont pas importées : elles sont déduites du producteur (aucune divergence dans [BC], hormis un nom).

### 6.3 Règles de transformation

| Sujet | Règle |
|---|---|
| Identifiants | UUID généré ; `legacy_id` et `source_kobo_id` conservés. |
| Superficie | Hectares (4 décimales) → m² entiers, sans perte. |
| Géométrie | Les 433 contours invalides sont conservés bruts, réparés par `ST_MakeValid`, et chaque réparation est journalisée. **Testé sur la base :** `make_valid` reproduit la superficie de référence à ±1 % pour 430 des 433 contours (les 3 autres sont des parcelles de moins de 10 m²) ; `buffer(0)` n'y parvient que pour 386 et s'écarte de plus de 5 % pour 25. `make_valid` est donc la méthode retenue. |
| Téléphone | Normalisé E.164 ; 4 numéros non conformes (ne commencent pas par 7) signalés. |
| CNI | Chiffrée + empreinte (§5). 898 renseignées sur 1 317 ; 90 hors format signalées. |
| Organisation (colonne OP) | 103 libellés libres → table `organization` avec un type **provisoire** (GIE, section, association/union, individuel, membre direct, à qualifier). Environ 250 fiches restent « à qualifier » en attendant la Vision V1. |
| Cultures | CHN et CS séparées en deux lignes de campagne ; 4 lignes « à préciser » (2 libellés) et 1 libellé invalide (« 0 Pour l'instant ») sont signalées ; 6 parcelles sans culture sont signalées. |
| Photos | ≈ 2 600 liens Kobo : télécharger vers MinIO et remplacer les URL. À faire **avant** la fin d'accès à Kobo. |
| Doublons | Les 5 groupes de CNI partagées (10 fiches) deviennent des `duplicate_candidate` `à_examiner`. Rien n'est fusionné. |
| Alertes | Les 609 alertes deviennent des `data_quality_flag` `ouvert` (aucun statut de vérification n'est renseigné dans la source). |
| Chevauchements | 28 paires de parcelles de producteurs différents (> 20 %, calcul sur contours réparés) deviennent des alertes. 16 dépassent 50 % et 7 dépassent 90 % : probables doubles saisies. |
| Montants | FCFA entiers ; tout arrondi est journalisé. Aucune valeur non entière dans la base actuelle. |
| Superficies | La base **ne contient pas de superficie déclarée par le producteur** : elle fournit `Superficie_ha` (mesurée, UTM 28N) et `Superficie_kobo_ha` (calculée par Kobo, pour comparaison). Les deux sont importées en m² entiers ; la superficie « déclarée » de BE-32 reste vide à l'import. |
| Parcelles atypiques | 6 parcelles de moins de 100 m² (3 de moins de 10 m²), dont 4 sans culture : signalées au titre des bornes de superficie [BE-33]. 2 parcelles dépassent 10 ha. |
| Fiche sans nom | 1 fiche (ASLB) n'a pas de nom : elle est **conservée** et signalée, jamais rejetée ni supprimée. Le champ nom n'est donc pas obligatoire à l'import. |
| Journal des corrections | 45 lignes concernent la CNI et contiennent des valeurs **en clair** dans la source : elles sont chiffrées à l'import. |

### 6.4 Critères d'acceptation

1. **Réconciliation :** 1 317 producteurs, 1 534 parcelles, 1 941 cultures importés ; 0 lien orphelin.
2. **Géométrie :** 1 534 contours chargés ; 433 réparés et journalisés ; aucune écriture de contour brut modifiée.
3. **Traçabilité :** 2 673 lignes de journal et 19 fusions historiques importées ; chaque fiche retrouvable par son `legacy_id`.
4. **Doublons :** aucune fiche fusionnée ou supprimée par l'import.
5. **Sécurité :** aucune CNI ni aucun téléphone en clair dans les logs ni dans les tables `staging_*` après l'import final ; CNI chiffrées en base.
6. **Rejouabilité :** un second import identique ne crée aucune donnée nouvelle.
7. **Rapport :** un rapport d'import liste volumes, rejets, réparations, alertes ouvertes et fiches à compléter.

### 6.5 Résultat de l'import à blanc

Un script de validation (`import-dryrun/`) a rejoué ces règles deux fois sur la base du 05/10/2026 : les **7 critères sont atteints** (1 317 / 1 534 / 1 941, 0 lien orphelin, 1 967 lignes de géométrie, 2 673 + 19 lignes de traçabilité, 0 CNI en clair, 2e passe sans création). Ce banc utilise SQLite et non PostgreSQL/PostGIS : il valide les règles et les volumes, pas les performances ni le schéma de production. Il a corrigé trois hypothèses de ce PRD (nombre de chevauchements, absence de superficie déclarée, fiche sans nom).

---

## 7. Conventions d'API

| Sujet | Convention |
|---|---|
| Version | Préfixe `/v1` |
| Format | JSON ; dates ISO 8601 UTC ; erreurs `{code, message, details}` |
| Identifiants | UUID v4 générés par le client pour toute création hors connexion |
| Données synchronisées | `created_at`, `updated_at`, `version`, `deleted_at` (suppression logique) |
| Montants / surfaces | FCFA entiers ; m² entiers |
| Pagination | Curseur ; filtres standardisés |
| Documentation | 100 % des endpoints décrits dans Swagger avant la version finale [OT §10.2] |

## 8. Exigences non fonctionnelles

| Exigence | Cible | Statut |
|---|---|---|
| Disponibilité | 99,5 % mensuel avec un seul serveur | À valider (DEC 12) |
| Tests | > 80 % sur auth, commercial, SIG | Confirmé [OT §10.2] |
| Transport / stockage | TLS 1.3 ; sauvegardes quotidiennes chiffrées, 30 jours, restauration testée chaque trimestre | Confirmé |
| Journaux | Aucune donnée personnelle en clair | Confirmé |
| Hébergement | VPS en Afrique, comptes au nom du CRADESC | À valider (INF 50–52) |

## 9. Décisions et questions ouvertes

| Réf. | Question | Décideur |
|---|---|---|
| Q1 | Liste officielle des SCOOP : **11** dans [BC], dix dans [NC]. | CRADESC |
| Q2 | Les 1 317 producteurs de [BC] sont-ils un sous-ensemble des ~9 000 annoncés ? | CRADESC |
| Q3 | GIE, section, association : statut et rattachement. | CRADESC (Vision V1) |
| Q4 | Qui peut lire la CNI en clair ? | CRADESC |
| Q5 | Droits d'un producteur connecté sur ses données d'identité. | CRADESC |
| Q6 | Définition officielle de « jeune ». | CRADESC |
| Q7 | Les producteurs ont-ils un compte propre ? | CRADESC (DEC 04) |
| Q8 | Responsable du traitement, formalités CDP, durée de conservation. | CRADESC / sécurité |
| Q9 | Durée maximale hors connexion. | CRADESC |
| Q10 | Définition d'une campagne (CHN, contre-saison, hivernage). | CRADESC / CANAS |
| Q11 | Identité visuelle : logo vectoriel, charte, mentions des partenaires, graphie du nom, icône (INF 61 à 64). | CRADESC |

## 10. Suite

1. Revue interne de ce PRD avec le développeur mobile (sections 4.2, 4.6, 5).
2. Présentation au CRADESC des choix « Proposé » et des points « À valider » (section 9), pour recueillir ses retours.
3. Identité visuelle : tokens provisoires fournis (`design-tokens.json`), à remplacer à réception de la charte (INF 61 à 64).
