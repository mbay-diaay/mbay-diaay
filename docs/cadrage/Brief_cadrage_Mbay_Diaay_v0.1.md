# Mbay Diaay — Brief de cadrage consolidé

> **Plateforme numérique des producteurs et organisations de producteurs de la Zone des Niayes**
> Client final : CRADESC · Titulaire de la mission : Cabinet Ndiaye Agro Service (CANAS)

| | |
|---|---|
| **Version** | 0.1 — brouillon pour validation interne |
| **Date** | 24 septembre 2026 |
| **Rédaction** | Équipe technique (Lead technique) |
| **Statut** | À relire en interne, puis à confronter avec CANAS et CRADESC |
| **Usage prévu** | Base pour la note de cadrage, les spécifications fonctionnelles et techniques, le plan de migration des données et le plan projet |

---

## 0. Comment lire ce document

Ce brief consolide **tout ce qu'on sait aujourd'hui** sur Mbay Diaay et sépare clairement ce qui est acquis de ce qui reste à décider. Chaque affirmation importante porte l'un de ces trois statuts :

| Statut | Signification |
|---|---|
| ✅ **Confirmé** | Écrit dans un document source ou dit par le client. La source est indiquée entre crochets. *Attention : « confirmé » veut dire « documenté ». Un engagement de l'offre CANAS n'est pas forcément validé tel quel par CRADESC (voir §0.2).* |
| 💡 **Proposé** | Notre recommandation (solution, méthode, découpage). Ce n'est pas encore validé. |
| ❓ **À valider** | Point ouvert, contradiction ou information manquante à trancher avec **CANAS** et/ou **CRADESC**. Chaque point porte un identifiant `Q-xx` repris dans le registre du §17. |

### 0.1 Sources utilisées

| Code | Document | Nature |
|---|---|---|
| **[OT]** | *CANAS — Offre technique finale*, 18 juin 2026, 33 p. | Offre remise à CRADESC : méthodo, architecture, modules, planning, équipe, risques |
| **[PPT]** | *Mbay_Diaay_Presentation_CRADESC_Condensee*, 14 slides | Présentation condensée de l'offre technique **et financière** |
| **[CP]** | *Document de cadrage préliminaire Mbay Diaay* | Notre première lecture du projet et de la contribution technique envisagée |
| **[ÉCH]** | Échanges avec le client (oral) | Notamment : existence d'une base d'**environ 9 000 producteurs** |

### 0.2 Limites de ce brief

- ❓ **Nous n'avons pas les Termes de Référence (TdR) du CRADESC.** L'offre [OT] y fait référence (cinq défis, dix coopératives, faîtière) mais on ne connaît le besoin qu'à travers la lecture qu'en fait CANAS. → `Q-01`
- ❓ **Nous n'avons ni le contrat signé ni l'éventuel PV de négociation.** On ne sait pas si le périmètre, le planning ou le budget de l'offre ont été modifiés à l'attribution. → `Q-02`
- Les éléments tirés des échanges oraux [ÉCH] doivent être **confirmés par écrit**, en particulier la base des 9 000 producteurs.

---

## 1. Synthèse en une page

**Ce qu'est Mbay Diaay.** Une plateforme intégrée (appli mobile terrain + appli web d'administration + backend central) pour les producteurs maraîchers de la Zone des Niayes, leurs **10 coopératives** et leur **faîtière**, pilotée par le CRADESC dans un projet de redynamisation des organisations de producteurs (OP). Elle couvre l'inclusion des femmes, des jeunes et des personnes vivant avec un handicap. ✅ [OT §2.1]

**Ce qu'elle doit faire.** Suivre, dans un seul système, la chaîne **producteur → coopérative → parcelle géoréférencée → campagne/culture → charges, production, ventes → rentabilité**. Elle doit aussi gérer l'administratif des OP (membres, cotisations, réunions, documents), les stocks d'intrants, les crédits et produire des rapports pour la faîtière, le CRADESC et les bailleurs. ✅ [OT §2.3, §V] [PPT 8]

**Comment on la construit.** ✅ Stack annoncée dans l'offre [OT §IV] :
- mobile Flutter **offline-first** (SQLite/Drift chiffré) ;
- web Angular ;
- backend NestJS en **monolithe modulaire** (5 modules métier) ;
- PostgreSQL 16 + PostGIS ;
- Redis/BullMQ, MinIO, Docker sur VPS, Sentry/Grafana.

💡 On garde cette stack. On précise en revanche la conception de la synchronisation (§8) et on la met en chantier dès le premier sprint.

**En combien de temps.** ✅ 12 semaines, 4 phases, 8 livrables contractuels (L1–L8), puis 4 semaines de support [OT §3.3, §VI, §7.4]. ✅ Budget : 4 500 000 FCFA, payés en 3 tranches (30/30/40) [PPT 13].

**Ce qui est nouveau depuis l'offre.** ✅ [ÉCH] Une base existante d'**environ 9 000 producteurs**. On ne connaît ni son format ni son état. L'offre ne prévoyait qu'un « import des données initiales » en phase 4 [OT §3.3]. 💡 Il faut un **chantier dédié d'audit, de qualification, de nettoyage et de migration** (§6), qui démarre dès la semaine 1.

**Les 10 points qui bloquent ou orientent le plus le démarrage :**

| # | Point | Réf. |
|---|---|---|
| 1 | Obtenir la base des ~9 000 producteurs (ou un extrait représentatif) et son format | `Q-20` à `Q-27` |
| 2 | Obtenir les TdR et le contrat ; confirmer que le périmètre de l'offre est le périmètre contractuel | `Q-01`, `Q-02` |
| 3 | Confirmer la date de démarrage (S1) et le circuit de validation côté CRADESC | `Q-03`, `Q-04` |
| 4 | Clarifier le rôle et le périmètre du Lead technique par rapport à l'équipe annoncée dans l'offre | `Q-70` à `Q-73` |
| 5 | Savoir si DIGICOOP (code, modèle de données) est réutilisé, et avec quelle propriété intellectuelle | `Q-05`, `Q-06` |
| 6 | Hébergement : infrastructure existante chez CRADESC ? exigence de données hébergées au Sénégal ? | `Q-60` à `Q-64` |
| 7 | Qui utilise l'appli mobile : producteurs eux-mêmes ou techniciens pour leur compte ? Équipement et taux de smartphones | `Q-10`, `Q-11` |
| 8 | Rôle de la faîtière : elle n'apparaît pas dans les 4 rôles RBAC | `Q-50` |
| 9 | Fournisseur d'OTP SMS et comptes stores (Google Play / Apple) au nom de qui | `Q-52`, `Q-66` |
| 10 | Logo, charte graphique, mentions bailleurs obligatoires, langue(s) de l'interface | `Q-80` à `Q-84` |

---

## 2. Contexte et parties prenantes

### 2.1 Le contexte

- ✅ La **Zone des Niayes** est la bande maraîchère qui approvisionne Dakar et les grandes villes. Filières principales citées : oignon, pomme de terre, tomate, chou. [OT §1.1, §2.2]
- ✅ Le CRADESC (Centre de Recherche et d'Action sur les Droits Économiques, Sociaux et Culturels) conduit un projet de **redynamisation des OP des Niayes**, axé sur l'inclusion (femmes, jeunes, personnes vivant avec un handicap) dans l'économie sociale et solidaire. [OT §2.1]
- ✅ Dans ce cadre, **dix sociétés coopératives** ont été créées. Elles sont regroupées sous une **faîtière** qui fait l'interface avec les partenaires. [OT §2.1]
- ✅ Aujourd'hui, la gestion se fait sur registres papier et fichiers Excel disparates, sans vue consolidée. [OT §2.2 Défi 1]
- ✅ [ÉCH] Il existe une **base d'environ 9 000 producteurs**. ❓ Son origine, son détenteur, son format et son lien avec les 10 coopératives sont inconnus. → `Q-20`, `Q-21`

### 2.2 Les acteurs

| Acteur | Rôle dans le projet | Statut |
|---|---|---|
| **CRADESC** | Maître d'ouvrage / client final. Propriétaire de la plateforme et du code source à la fin de la mission [OT §VI L8, §10.1] | ✅ |
| **CANAS** (Cabinet Ndiaye Agro Service) | Titulaire de la mission. Chef de mission : Mbaye NDIAYE, ingénieur agroéconomiste [OT p.1] | ✅ |
| **Faîtière des 10 coopératives** | Interface entre les coopératives et les partenaires. Utilisatrice de la vue consolidée [OT §2.1, §IV] | ✅ Existence confirmée · ❓ rôle dans l'outil → `Q-50` |
| **10 coopératives** | Utilisatrices : gestionnaires et techniciens | ✅ Nombre confirmé · ❓ liste, noms, localités → `Q-30` |
| **Producteurs / membres** | Utilisateurs finaux et sujets des données | ✅ |
| **AUMN / projet JAFOWA** | Source des référentiels économiques (9 comptes d'exploitation, études de marché) que CANAS prévoit d'intégrer [OT §1.4, §5.3] | ✅ · ❓ droits de réutilisation → `Q-36` |
| **Nous (équipe technique / Lead technique)** | Conception et réalisation technique de bout en bout, selon [CP §4] | 💡 Proposé · ❓ position contractuelle et périmètre à formaliser avec CANAS → `Q-70` |

### 2.3 DIGICOOP, la référence mise en avant par CANAS

- ✅ DIGICOOP (app.digicoops.com) est la plateforme de CANAS pour les coopératives sénégalaises : gestion des membres, marketplace, accès au financement, web responsive. D'après l'offre, l'appli mobile est « en cours ». Le suivi technico-économique et le SIG sont notés « extension prévue ». [OT §1.3]
- ✅ L'offre affirme que « nous ne partons pas de zéro » et que l'architecture et la logique métier sont « déjà éprouvées ». [OT §1.3, §10.1]
- ❓ **On ne sait pas si Mbay Diaay réutilise le code ou le modèle de données de DIGICOOP**, ni avec quelle stack DIGICOOP est construit. → `Q-05`
- ❓ Si du code DIGICOOP est réutilisé, il faut savoir comment cela se concilie avec l'engagement de transférer « le code source intégral » à CRADESC (propriété intellectuelle, licence). → `Q-06`
- 💡 On demande à CANAS un accès démo à DIGICOOP (et, si besoin, au dépôt) dès le lancement. Même sans réutilisation de code, c'est un bon support pour les ateliers utilisateurs.

---

## 3. Objectifs

### 3.1 Les problèmes à résoudre ✅ [OT §2.2] [PPT 4]

| # | Défi (tel que formulé dans l'offre) | Conséquence décrite |
|---|---|---|
| 1 | **Gestion administrative et organisationnelle des membres** : papier, Excel dispersés, doublons entre coopératives | Pas de statistiques consolidées (genre, âge, handicap) pour les bailleurs, donc accès aux financements ralenti |
| 2 | **Suivi des activités agricoles et des performances économiques** : pas d'itinéraires culturaux ni de comptes d'exploitation | Pas de vision de la rentabilité par culture ou par campagne |
| 3 | **Stocks, intrants et commercialisation** : crédits et ventes non tracés, pertes post-récolte estimées à 15–25 % | Trésorerie non pilotable, tensions sur les remboursements |
| 4 | **Traçabilité et planification des cultures** | Impossible de s'engager sur des volumes et des calendriers avec les acheteurs institutionnels |
| 5 | **Information géographique** : pas de cartographie, superficies déclarées approximatives | Pas de preuve de capacité de production, litiges fonciers non documentables |

✅ Fil conducteur retenu par l'offre : *« donner aux producteurs et aux OP une vision unifiée, fiable et exploitable de leur activité agricole, de la parcelle géoréférencée jusqu'à la transaction commerciale »*. [OT §2.3]

### 3.2 Objectifs du projet

- ✅ Livrer en 12 semaines une plateforme opérationnelle (mobile + web + API) couvrant les fonctionnalités *Must have* des 5 modules. [OT §6.3]
- ✅ Constituer une base structurée des producteurs et des parcelles (livrable L6). [OT §VI]
- ✅ Rendre CRADESC et les OP autonomes : code source, documentation, formation en cascade. [OT §3.1, §10.1]
- 💡 **Objectif ajouté après les échanges :** reprendre la base existante des ~9 000 producteurs dans un état qualifié et dédoublonné, avec un rapport de qualité partagé avec CRADESC (§6).

### 3.3 Indicateurs de réussite 💡 Proposés (à valider → `Q-07`)

L'offre donne des engagements de qualité (99,5 % de disponibilité de l'API, plus de 80 % de couverture de tests sur les modules critiques, 100 % des endpoints documentés) [OT §10.2] mais **pas d'indicateurs d'adoption ou d'impact**. On propose :

| Indicateur | Cible indicative (à fixer avec CRADESC) |
|---|---|
| Producteurs migrés, qualifiés et rattachés à une coopérative | % de la base des ~9 000, après dédoublonnage |
| Parcelles géoréférencées à la fin de la mission | Nombre ou % par coopérative (un échantillon réaliste, pas la totalité) |
| Techniciens actifs (au moins une synchro par semaine) pendant les 4 semaines de support | ≥ X par coopérative |
| Taux de synchronisations réussies sans perte de données | 100 % des mutations reçues ou rejouables |
| Rapports consolidés produits sans retraitement manuel | Au moins le rapport genre/âge/handicap par coopérative |

---

## 4. Utilisateurs et besoins

### 4.1 Les profils

✅ Quatre rôles sont définis dans l'offre [OT §4.3] [CP §3] :

| Rôle | Qui | Périmètre de données (offre) | Besoin principal |
|---|---|---|---|
| **Producteur / Membre** | Membre d'une OP | Ses parcelles, ses transactions, son profil | Consulter et renseigner ses informations d'activité |
| **Technicien terrain** | Agent de coopérative | Tous les membres de **sa** coopérative | Collecter sur le terrain, accompagner, valider les géoréférencements |
| **Gestionnaire de coopérative** | Responsable administratif d'une coopérative | Toute sa coopérative | Gérer membres, stocks, crédits, transactions ; extraire des rapports |
| **Administrateur CRADESC** | Équipe technique CRADESC | Toutes les coopératives et la faîtière | Superviser, configurer, gérer les utilisateurs, consolider |

Points de vigilance :

- ❓ **La faîtière n'a pas de rôle dédié.** Elle a pourtant besoin d'une vue consolidée multi-coopératives, sans les droits d'administration de CRADESC. → `Q-50`. 💡 Proposé : ajouter un rôle **« Faîtière (lecture consolidée) »**.
- ❓ **Le vocabulaire varie d'un document à l'autre** : « Gestionnaire de coopérative » [OT] et « Responsable d'OP » [PPT 9]. La présentation ajoute la **validation des données** par ce responsable, ce que l'offre ne dit pas. → `Q-51`
- ❓ Faut-il un rôle **support CANAS / super-admin technique**, distinct de l'administrateur CRADESC, pour l'exploitation pendant la mission et le support ? → `Q-53`
- 💡 Le modèle d'autorisation sera conçu pour ajouter des rôles sans refonte (rôles × périmètre organisationnel, voir §10).

### 4.2 Les parcours clés 💡 Proposés (à confirmer en ateliers S1–S2)

| Profil | Parcours prioritaires |
|---|---|
| Technicien | 1. Se connecter hors ligne (PIN) · 2. Rechercher ou créer un producteur · 3. Géoréférencer une parcelle · 4. Déclarer une campagne ou une culture · 5. Saisir une opération culturale, une charge ou une vente pour le compte d'un producteur · 6. Synchroniser |
| Producteur | Les 4 actions de la formation niveau 3 ✅ [OT §7.2] : consulter son profil · enregistrer une vente ou une charge · voir sa parcelle sur la carte · consulter le calendrier cultural |
| Gestionnaire | Gérer les adhésions et cotisations · entrées et sorties de stock · octroi et suivi des crédits · réunions et PV · rapports de sa coopérative |
| Admin CRADESC | Gérer utilisateurs et référentiels · tableau de bord multi-OP · carte globale · exports bailleurs |

### 4.3 Contraintes d'usage

- ✅ Connectivité irrégulière : l'offline-first est jugé « non négociable ». [OT §2.4]
- ✅ Maîtrise du numérique hétérogène : parcours courts (« 3 clics max pour les actions fréquentes »), OTP plutôt que mot de passe. [OT §8.1, §4.3]
- ✅ Langues : formation orale en wolof (et en pulaar si besoin), manuel en français. [OT §7.1]
- ✅ Android prioritaire, iOS supporté. [OT §4.1]
- ❓ **Qui tient le téléphone ?** Les producteurs ont-ils un smartphone, et dans quelle proportion ? Sinon, le technicien saisit-il pour eux (mode « assisté ») ? Cette réponse change l'UX, le nombre de comptes, le coût des OTP et la volumétrie de synchro. → `Q-10`
- ❓ Terminaux : fournis par le projet ou personnels ? Modèles et versions d'Android ? Appareils partagés entre plusieurs techniciens ? → `Q-11`
- ❓ Langue de l'**interface** : français seul, ou aussi wolof (libellés, pictogrammes, audio) ? → `Q-84`
- ❓ L'accessibilité pour les personnes vivant avec un handicap est un axe du projet CRADESC : y a-t-il des exigences concrètes (taille de texte, contrastes, lecture vocale) ? → `Q-12`

---

## 5. Périmètre fonctionnel

### 5.1 La chaîne de données qui relie les modules

✅ Principe de l'offre : une donnée saisie une fois est réutilisée partout, jusque dans la cartographie. [PPT 8] [OT §2.3]

```
Organisation (faîtière) ─┬─ Coopérative ─── Membre / Producteur
                         │                        │
                         │                        ├── Parcelle (polygone PostGIS)
                         │                        │       │
                         │                        │       └── Campagne ── Culture (sur parcelle)
                         │                        │                          │
                         │                        │                          ├── Opérations culturales (itinéraire)
                         │                        │                          ├── Charges ──┐
                         │                        │                          ├── Production│
                         │                        │                          └── Ventes ───┴─► Compte d'exploitation / Rentabilité
                         │                        │
                         │                        ├── Cotisations · Crédits (échéancier, remboursements)
                         │
                         └─ Stocks d'intrants (par coopérative) · Réunions / PV · Documents
```

💡 Choix de modélisation proposés (à confirmer en S3, livrable L2) :
- La **culture sur parcelle pour une campagne** est l'entité pivot. Elle porte charges, opérations, production et ventes. Le compte d'exploitation en découle par calcul, sans ressaisie.
- Une vente saisie dans le module commercial alimente automatiquement les revenus du compte d'exploitation, comme le prévoit l'offre [OT §5.3].
- ❓ Un producteur peut-il être membre de **plusieurs coopératives** ? L'offre évoque des « doublons dans les adhésions inter-coopératives » [OT §2.2]. Doublon à nettoyer ou réalité à modéliser ? → `Q-31`
- ❓ Une parcelle peut-elle être exploitée par plusieurs producteurs (indivision, location, métayage), et faut-il suivre le statut foncier ? → `Q-32`
- ❓ Comment une **campagne** est-elle définie : par saison (hivernage, contre-saison froide, contre-saison chaude), par cycle de culture, ou par coopérative ? → `Q-33`

### 5.2 M1 — Gestion administrative

| Fonctionnalité | Statut | Offline (offre) | Remarques |
|---|---|---|---|
| Base des adhérents : identité, contact, genre, âge, handicap, localisation, photos de pièces, recherche, export CSV/PDF | ✅ [OT §5.1] — *Must* | ✅ | ❓ Liste exacte des champs obligatoires, à caler sur la base des 9 000 → `Q-22`. Les photos de pièces d'identité sont des données sensibles (§10.4) |
| Hiérarchie Organisation → Coopérative → Membre, statuts d'adhésion, cotisations, historique des paiements | ✅ — *Must* | ✅ | ❓ Règles de cotisation (montant, périodicité, mode de paiement) → `Q-34` |
| Réunions et assemblées : planification, présences, PV, suivi des décisions | ✅ — *Must* | ✅ | ❓ L'offre parle de « signature numérique des PV ». 💡 On propose une **validation électronique horodatée** par les membres du bureau, pas une signature électronique à valeur juridique (qui demanderait un prestataire certifié) → `Q-35` |
| Gestion documentaire (statuts, agréments, PV, attestations), stockage MinIO | ✅ — *Must* (« de base ») | ⚠️ Métadonnées seules | |
| Tableau de bord administratif (membres par coopérative, genre/âge/handicap, taux de cotisation) | ✅ | ⚠️ Données locales | |
| Notifications et rappels (réunions, AG, échéances) | ✅ — *Should* (alertes auto) | ✅ | ❓ Canal : push, SMS, les deux ? Le coût SMS est à estimer → `Q-54` |

### 5.3 M2 — Gestion commerciale

| Fonctionnalité | Statut | Offline | Remarques |
|---|---|---|---|
| Stocks d'intrants (semences, engrais, pesticides) : entrées/sorties, stock calculé, traçabilité par lot | ✅ [OT §5.2] — *Must* | ✅ | ❓ Le stock est-il tenu au niveau coopérative, magasin ou producteur ? Quelles unités de mesure (sacs, kg, litres) ? → `Q-37` |
| Alertes de seuil de stock | ✅ — *Should* | ✅ | |
| Crédits accordés par la coopérative : échéanciers, alertes, statut de remboursement, trésorerie | ✅ — *Must* | ✅ | ❓ Nature des crédits (en nature/intrants ou en espèces), intérêts ou frais, règles d'échéancier → `Q-38`. 💡 Les montants et les remboursements sont des écritures **immuables et corrigibles par contre-écriture** (important pour l'offline, voir §8) |
| Ventes : quantité, prix, acheteur, canal, date, récapitulatifs | ✅ — *Must* | ✅ | ❓ Vente individuelle du producteur ou vente groupée par la coopérative (collecte puis revente) ? → `Q-39` |
| Veille des prix de marché (saisie par les techniciens, historique) | ✅ — *Should* | ✅ Dernier prix | ❓ Liste des marchés de référence → `Q-40` |
| Circuits de commercialisation (marchés locaux, Dakar, export), volumes et valeurs | ✅ [OT §5.2] | ⚠️ | Pas cité dans le *Must have* |
| Rapports commerciaux PDF | ✅ | ⚠️ | |

### 5.4 M3 — Compte d'exploitation

| Fonctionnalité | Statut | Offline | Remarques |
|---|---|---|---|
| Saisie guidée des charges : intrants, main-d'œuvre par étape, transport, irrigation, location de matériel ; rattachement campagne/parcelle | ✅ [OT §5.3] — *Must* | ✅ | 💡 Nomenclature des charges alignée sur les comptes d'exploitation AUMN |
| Revenus par vente, culture et campagne, alimentés depuis M2 | ✅ — *Must* | ✅ | |
| Calculs : marge brute, ratio charges/revenus, revenu net, revenu à l'hectare, comparaison aux normes de la zone | ✅ — *Must* (calcul des marges) | ✅ | ❓ Formules exactes à valider par l'agroéconomiste (autoconsommation ? main-d'œuvre familiale valorisée ?) → `Q-41`. Le revenu à l'hectare dépend de la qualité des superficies (SIG) |
| Référentiels Niayes (AUMN : oignon, PDT, tomate, chou) | ✅ [OT §5.3] | ✅ | ❓ CANAS doit fournir ces référentiels sous forme exploitable (tableur), avec l'accord de réutilisation → `Q-36` |
| Suivi socio-économique, exploitations en difficulté | ✅ | ⚠️ | ❓ Définition d'une « exploitation en difficulté » → `Q-41` |
| Rapports individuels et consolidés PDF | ✅ — *Must* (« de base ») | ⚠️ | |

### 5.5 M4 — Gestion agronomique

| Fonctionnalité | Statut | Offline | Remarques |
|---|---|---|---|
| Planification des campagnes : cultures, superficies prévues, parcelles, objectifs, intrants, duplication | ✅ [OT §5.4] — *Must* | ✅ | |
| Calendriers culturaux par culture, co-construits avec les techniciens | ✅ — *Must* | ✅ | ❓ Contenu à produire par CANAS ou les techniciens (qui ? quand ?) → `Q-42` |
| Itinéraire technique : préparation du sol, semis/repiquage, fertilisation, irrigation, traitements, récolte, photos | ✅ — *Must* | ✅ | Les photos alourdissent la synchro (§8.4) |
| Prévision vs réalisation de production, analyse des écarts | ✅ [OT §5.4] | ✅ | Pas explicitement dans le *Must have* |
| Alertes et recommandations par stade phénologique | ✅ — *Should* (alertes) | ✅ | ❓ Qui rédige les recommandations ? → `Q-42` |
| Historique des campagnes par producteur et par parcelle | ✅ | ✅ | |

### 5.6 M5 — SIG → détaillé au §9

### 5.7 Priorisation MoSCoW ✅ [OT §6.3] [PPT 10]

L'offre précise que cette priorisation fixe **contractuellement** le périmètre final et qu'elle sera validée en atelier en **semaine 1**.

- **Must have (garanti)** : M1 (membres, OP/coopératives, réunions, documents de base) · M2 (stocks + alertes, ventes, crédits) · M3 (charges, revenus, marges, PDF de base) · M4 (campagnes, calendriers, itinéraire) · M5 (GPS offline, carte web, superficies) · Sécurité (OTP, 4 rôles, AES-256, sauvegardes) · Offline complet et synchro automatique.
- **Should have** : alertes automatiques, exports Excel/CSV, recherche avancée, veille prix avec historique, carto comparative entre campagnes.
- **Could have (recommandations)** : paiement mobile (Wave, Orange Money), SMS/USSD, météo, dashboard analytique avancé CRADESC, messagerie communautaire.

⚠️ **Incohérence à lever** : la section *Must have* cite les « alertes de stock », que la liste *Should have* reprend comme « alertes automatiques (seuil de stock…) ». → `Q-43`

💡 **Ajout proposé au *Must have*** : l'import de la base existante des producteurs (§6). L'offre prévoit un import (L6, phase 4) mais pas le nettoyage d'une base de ~9 000 enregistrements. **Cet ajout peut avoir un impact sur la charge ou sur le budget, à discuter avec CANAS avant d'en parler au client.** → `Q-28`

### 5.8 Hors périmètre (à confirmer)

💡 Sauf décision contraire : pas de marketplace publique (qui existe dans DIGICOOP), pas de paiement en ligne, pas d'USSD, pas d'intégration météo, pas de comptabilité générale de la coopérative (seulement stocks, crédits et ventes). → `Q-44`

---

## 6. Base existante des ~9 000 producteurs : audit, qualification, nettoyage, migration

### 6.1 Ce qu'on sait

- ✅ [ÉCH] Il existe une base d'**environ 9 000 producteurs**.
- ✅ L'offre anticipe une « qualité hétérogène des données existantes » (risque moyen/moyen) et prévoit « contrôles de cohérence, procédure de collecte guidée, dédoublonnage automatique à l'import » [OT §8.1]. Elle note aussi, en retour d'expérience de DIGICOOP, que l'import « demande toujours plus de temps que prévu » et prévoit « une semaine dédiée » [OT §9.2].
- ❓ **On ne connaît rien d'autre** : format, détenteur, date et méthode de collecte, champs, lien avec les 10 coopératives, présence de parcelles ou de coordonnées GPS, doublons, consentement des personnes.

### 6.2 Hypothèses de travail (à invalider au plus vite)

| # | Hypothèse | Si elle est fausse… |
|---|---|---|
| H1 | La base est sous forme tabulaire (Excel/CSV, un ou plusieurs fichiers) | Base SQL, outil de collecte (KoboToolbox/ODK), DIGICOOP ou papier : effort d'extraction très différent |
| H2 | Chaque producteur est rattachable à l'une des 10 coopératives | S'il y a des producteurs hors coopératives : faut-il les importer ? sous quelle organisation ? |
| H3 | Il n'y a pas d'identifiant unique fiable ; le dédoublonnage repose sur nom + téléphone + localité | Si un n° CNI ou un identifiant interne fiable existe, le dédoublonnage devient plus simple |
| H4 | Peu ou pas de données parcellaires ou GPS | Si des points ou polygones existent, il faut les reprendre dans PostGIS (CRS à vérifier) |
| H5 | Les 9 000 sont des producteurs « à gérer » dans l'outil, pas seulement une liste de bénéficiaires historiques | Sinon, archivage ou import partiel |

### 6.3 Démarche proposée en 6 étapes 💡

| Étape | Contenu | Quand | Sortie |
|---|---|---|---|
| **1. Inventaire** | Récupérer toutes les sources (fichiers, exports, formulaires), identifier leur origine, leur date, leur responsable, et leur lien avec les coopératives | S1 | Inventaire des sources |
| **2. Profilage** | Analyse automatisée : nombre de lignes, taux de remplissage par champ, formats (téléphones, dates, genre), valeurs aberrantes, encodage, doublons exacts et probables | S1–S2 | **Rapport d'audit de la base** (chiffré) |
| **3. Qualification** | Définir avec CRADESC les champs obligatoires, les référentiels (coopératives, localités, cultures) et un **score de qualité** par fiche (voir §6.4) | S2–S3 | Règles de qualité validées + dictionnaire de données cible |
| **4. Nettoyage et dédoublonnage** | Normalisation automatique (téléphones au format +221, casse, localités sur référentiel), détection de doublons (§6.5), **arbitrage humain** des cas douteux par les coopératives | S3–S8 (en parallèle du dev) | Base nettoyée + journal des corrections + liste des cas à arbitrer |
| **5. Migration** | Scripts d'import idempotents et rejouables, mapping source → cible, **2 imports à blanc** sur l'environnement de recette, contrôles de réconciliation (comptages, sommes) | Dry-run 1 : S7 · Dry-run 2 : S9 · Import final : S11 | Base de production chargée (contribue à L6) |
| **6. Compléments terrain** | Les fiches incomplètes sont marquées « à compléter » et remontées aux techniciens dans l'appli (liste de tâches) | S11 et support | Taux de complétude suivi pendant les 4 semaines de support |

### 6.4 Grille de qualification des fiches 💡 (à caler sur les données réelles)

| Niveau | Critère indicatif | Traitement |
|---|---|---|
| **A — Exploitable** | Nom + prénom, genre, coopérative, localité, téléphone valide ; aucun doublon probable | Import direct |
| **B — Incomplet** | Identité + coopérative OK, mais il manque des champs secondaires (âge, handicap, téléphone) | Import avec l'étiquette « à compléter » |
| **C — Douteux** | Doublon probable, coopérative inconnue, incohérences | Arbitrage humain avant import |
| **D — Inexploitable** | Identité illisible ou vide | Non importé, listé dans le rapport |

### 6.5 Règles de dédoublonnage proposées 💡

1. **Doublon certain** : même numéro de téléphone normalisé **et** nom proche (distance de similarité faible).
2. **Doublon probable** : nom et prénom proches (translittérations courantes : Ndiaye/N'Diaye, Mouhamed/Mohamed/Mamadou…), même localité, âge compatible. Ces cas partent en arbitrage.
3. **Faux doublons attendus** : homonymes fréquents dans un même village. On ne fusionne jamais automatiquement sur le nom seul.
4. Toute fusion est **tracée** (fiche d'origine → fiche maîtresse) et **réversible**.

❓ Un même numéro de téléphone peut être partagé dans une famille (il sert aussi d'identifiant OTP) : comment le gérer ? → `Q-26`

### 6.6 Impacts sur l'architecture et le planning

- **Synchro mobile** : ~9 000 producteurs pour 10 coopératives, soit ~900 par coopérative si la répartition est homogène. 💡 Le mobile ne télécharge **que le périmètre de sa coopérative** (§8). C'est gérable en SQLite, à condition de synchroniser par delta et de ne pas charger les photos d'office.
- **Identifiants** : on conserve l'identifiant source (`legacy_id`, source, date d'import) sur chaque fiche migrée, pour la traçabilité.
- **Planning** : le chantier données tourne **en parallèle** du développement, sous la responsabilité du Lead technique, avec le Gestionnaire de données (§11). L'import à blanc exige que le modèle de données M1 soit figé à la fin du Sprint 1.
- ❓ **Budget et charge** : ce chantier n'est pas chiffré en tant que tel dans l'offre. → `Q-28`

### 6.7 Livrables du chantier données 💡

- Rapport d'audit de la base existante (fin S2) : **un livrable clé à présenter au CRADESC**, car il conditionne ce qui sera promis sur L6.
- Dictionnaire de données cible et table de correspondance source → cible (fin S3, annexe de L2).
- Scripts de migration versionnés et rejouables, rapports des imports à blanc (S7, S9).
- Rapport de migration final : comptages, rejets, fiches à compléter, fusions réalisées (S11–S12, annexe de L6).

---

## 7. Architecture technique

### 7.1 Vue d'ensemble ✅ [OT §IV] [PPT 5–6], avec compléments 💡

```
 ┌───────────────────────────┐          ┌───────────────────────────┐
 │  App mobile Flutter        │          │  App web Angular           │
 │  Android (prio) / iOS      │          │  Admin · Dashboards · Carte│
 │  Drift/SQLite chiffré      │          │  Leaflet · Rapports PDF    │
 │  Outbox de synchro 💡       │          │                            │
 │  flutter_map + tuiles cache│          │                            │
 └────────────┬──────────────┘          └────────────┬──────────────┘
              │  HTTPS/TLS · JWT (+ refresh)          │
              ▼                                        ▼
 ┌───────────────────────────────────────────────────────────────────┐
 │  API NestJS — monolithe modulaire (REST, Swagger)                  │
 │  Modules métier : Admin · Commercial · Agri · Exploitation · SIG    │
 │  Transverses 💡 : Auth/OTP · RBAC+périmètre · Sync · Audit ·        │
 │                  Fichiers · Rapports/Exports · Référentiels ·       │
 │                  Notifications · Import (migration)                │
 └──────┬───────────────────┬───────────────────┬────────────────────┘
        ▼                   ▼                   ▼
 PostgreSQL 16 + PostGIS   Redis + BullMQ       MinIO (S3)
 (données + géo + audit)   (cache, jobs async)  (docs, photos)

 Infra : Docker · VPS · GitHub Actions (CI/CD) · Sentry · Grafana/Loki
```

### 7.2 La stack, composant par composant

| Couche | Choix de l'offre ✅ | Notre position 💡 | À valider ❓ |
|---|---|---|---|
| Mobile | Flutter (Dart), Android prioritaire, iOS supporté [OT §4.1] | On garde. Drift + SQLCipher pour le chiffrement local | Version minimale d'Android → `Q-11` · iOS livré pendant la mission ou plus tard ? → `Q-13` |
| Web | Angular (TypeScript) [OT §4.1] [CP §5] | On garde | — |
| Backend | NestJS, monolithe modulaire, REST + Swagger, class-validator [OT §3.2, §4.1] | On garde. On ajoute les modules transverses (§7.3) | — |
| Base de données | PostgreSQL 16 + PostGIS [OT §4.1] | On garde. Migrations versionnées. Choix de l'ORM à arrêter en S3 (TypeORM, Prisma ou MikroORM : critère principal = support PostGIS) | — |
| Cache / jobs | Redis + BullMQ [OT §4.1] | On garde pour les **traitements asynchrones côté serveur** (rapports PDF, imports, notifications, post-traitement des lots de synchro). ⚠️ BullMQ ne gère pas la file côté mobile, voir §8.2 | — |
| Fichiers | MinIO compatible S3, hébergeable localement [OT §4.1] | On garde | Localisation de l'hébergement → `Q-61` |
| Infra | Docker, GitHub Actions, VPS « hébergé en Afrique » [OT §4.1] ; « infrastructure cloud » [OT §3.3] | 3 environnements : dev, recette/démo, production | Fournisseur, pays, propriétaire du compte → `Q-60` à `Q-64` |
| Observabilité | Sentry, Grafana/Loki, tableau de disponibilité pour CRADESC [OT §4.1] | On garde. Sentry aussi côté mobile | Qui reçoit les alertes après la mission ? → `Q-65` |
| Cartographie | Leaflet (web), flutter_map (mobile), fonds satellite + OSM [OT §5.5] | Voir §9.4 (tuiles hors ligne et licences) | → `Q-47` |
| Maquettes | Figma Pro (licence au budget) [PPT 13] | On garde | Compte Figma au nom de qui ? |

### 7.3 Organisation du backend 💡

- **Modules métier** ✅ [OT §3.2] : `AdminModule`, `CommercialModule`, `AgriModule`, `ExploitationModule`, `SIGModule`. Chacun a ses controllers, services et repositories.
- **Modules transverses** 💡 :
  - `AuthModule` : OTP SMS, JWT, refresh token avec rotation, PIN hors ligne ;
  - `AccessModule` : rôles et **périmètre organisationnel** (coopérative, faîtière), appliqués à chaque requête et à chaque paquet de synchro ;
  - `SyncModule` : push et pull par delta, idempotence, conflits (§8) ;
  - `AuditModule` : journal immuable des modifications sensibles ✅ [OT §4.3] ;
  - `FilesModule` : MinIO, URLs signées, upload en plusieurs parties reprenable ;
  - `ReportingModule` : PDF, Excel/CSV, via des jobs BullMQ ;
  - `ReferentialModule` : coopératives, localités, cultures, intrants, unités, marchés ;
  - `ImportModule` : scripts de migration de la base existante.
- **Règle d'architecture** : un module ne lit jamais directement les tables d'un autre module. Il passe par son service exposé. C'est ce qui garde la promesse « extractible par module » [OT §3.2].

### 7.4 Base de données : modèle conceptuel 💡 (à détailler en L2)

| Domaine | Entités principales |
|---|---|
| Organisation | `organisation` (faîtière), `cooperative`, `localite` (référentiel administratif), `membership` (adhésion, statut, dates) |
| Personnes | `producteur` (identité, genre, date de naissance ou tranche d'âge, handicap, contact, `legacy_id`), `utilisateur` (compte, rôle, périmètre, appareil) |
| Admin | `cotisation`, `paiement_cotisation`, `reunion`, `presence`, `pv`, `decision`, `document` |
| Foncier / SIG | `parcelle` (geometry Polygon SRID 4326, superficie calculée, superficie déclarée, précision GPS, statut de validation), `point_releve` (optionnel, pour l'audit de précision) |
| Agronomie | `campagne`, `culture_parcelle` (entité pivot), `operation_culturale`, `calendrier_type`, `prevision_production`, `recolte` |
| Économie | `charge`, `revenu`, `vue compte_exploitation` (calculée), `referentiel_norme_zone` (AUMN) |
| Commercial | `intrant`, `lot`, `mouvement_stock`, `credit`, `echeance`, `remboursement`, `vente`, `acheteur`, `canal`, `prix_marche`, `marche` |
| Technique | `audit_log`, `sync_mutation` (journal des mutations reçues, pour l'idempotence), `import_batch`, `import_rejet` |

Conventions proposées :
- **UUID générés côté client**, indispensables pour créer des données hors ligne ;
- `created_at`, `updated_at`, `version` et `deleted_at` sur toutes les tables synchronisées (suppression logique) ;
- montants en **FCFA entiers** (XOF, pas de décimales) ;
- superficies stockées en m² et affichées en ha.

### 7.5 Application mobile 💡

- Démarre et fonctionne toujours depuis la base locale ✅ [OT §4.2]. Le réseau n'est jamais bloquant.
- Gestion d'état et architecture à arrêter par le développeur mobile (Riverpod ou Bloc). Formulaires hors ligne avec validation locale.
- Écrans prioritaires : recherche de producteur, fiche producteur, relevé de parcelle, saisie rapide (charge, vente, opération), écran de synchro (en attente, envoyé, en erreur).
- Taille des données : photos compressées (≈ 200–400 Ko), envoyées séparément et seulement en Wi-Fi ou sur bon réseau (paramétrable).
- Distribution : Google Play (test interne puis production). ❓ APK en direct pour les techniciens pendant la recette ? → `Q-66`

### 7.6 Application web 💡

- Pour gestionnaires, faîtière et CRADESC : tableaux de bord, CRUD complets, référentiels, carte Leaflet avec filtres (coopérative, culture, campagne, producteur), exports.
- Pas d'offline côté web ✅ [OT §4.2] (le tableau de bord CRADESC nécessite une connexion).
- ❓ Les gestionnaires de coopérative ont-ils accès à un ordinateur, ou faut-il une version web utilisable sur mobile ? → `Q-14`

### 7.7 Environnements, CI/CD et exploitation

- ✅ Sauvegardes PostgreSQL chiffrées, quotidiennes, rétention 30 jours, restauration testée tous les trimestres [OT §4.3].
- 💡 Sauvegarde **hors du VPS** (autre fournisseur ou autre région) et sauvegarde MinIO.
- 💡 Pipeline : lint + tests + build des images Docker, déploiement automatique en recette, déploiement en production sur validation manuelle. Builds mobiles signés par la CI.
- ❓ L'engagement de **99,5 % de disponibilité** [OT §10.2] avec **un seul VPS** [OT §3.2] est ambitieux (≈ 3,6 h d'arrêt par mois maximum). À requalifier en objectif plutôt qu'en garantie contractuelle, ou à financer (redondance) → `Q-67`

---

## 8. Offline-first et synchronisation

### 8.1 Ce que dit l'offre ✅ [OT §4.2] [PPT 7]

1. L'appli fonctionne toujours depuis SQLite (Drift).
2. Chaque action est écrite en local avec le statut « en attente de synchronisation ».
3. Un service en arrière-plan envoie les mutations dès que le réseau revient.
4. Les conflits sont résolus selon une stratégie à définir en phase 1 (« last-write-wins ou merge intelligent par type de donnée »).
5. Aucune erreur réseau affichée à l'utilisateur, seulement un indicateur « synchronisé / en attente ».

✅ Données disponibles hors ligne : saisie des activités, GPS, ventes, profil, calendriers, carte (tuiles en cache). Rapports limités aux données locales. Tableau de bord CRADESC en ligne uniquement.

### 8.2 Point technique à corriger dans la conception

⚠️ L'offre dit que la synchronisation passe « via BullMQ ». BullMQ est une file de jobs **côté serveur** (Redis) : il ne peut pas stocker des mutations sur le téléphone. 💡 La file d'attente côté mobile doit être une **outbox dans la base locale Drift**. BullMQ sert ensuite côté serveur pour les traitements lourds déclenchés par la synchro. C'est une précision de conception, pas un changement de stack. À expliquer à CANAS pour que L2 soit juste.

### 8.3 Conception proposée 💡 (spécification détaillée en L2)

**Push (mobile → serveur)**
- Chaque écriture locale produit une entrée dans l'outbox : `mutation_id` (UUID), entité, `entity_id` (UUID client), opération, payload, `base_version`, horodatage de l'appareil.
- Les mutations partent **par lots ordonnés**. Le serveur les applique de façon **idempotente** : une mutation déjà reçue (même `mutation_id`) est acquittée sans être rejouée. Aucun doublon, même après une coupure en plein envoi.
- Le serveur **revérifie les droits** sur chaque mutation. Le mobile n'est jamais une source de confiance.

**Pull (serveur → mobile)**
- Synchro **par delta** avec un curseur (numéro de séquence serveur ou `updated_at` + id), **filtrée par périmètre** : un technicien ne reçoit que sa coopérative, un producteur que ses propres données.
- Premier chargement : un paquet initial compressé, pour éviter de télécharger ~900 producteurs ligne par ligne sur la 3G.
- Suppressions propagées par suppression logique (`deleted_at`).

**Conflits : stratégie par type de donnée**

| Type de donnée | Stratégie proposée | Raison |
|---|---|---|
| Écritures financières (ventes, charges, remboursements, mouvements de stock, cotisations) | **Ajout seul** : pas de modification en place, correction par contre-écriture | Deux saisies concurrentes s'additionnent au lieu de s'écraser ; l'audit reste propre |
| Fiche producteur (identité, contact) | **Fusion champ par champ**. Si le même champ a été modifié des deux côtés, la version serveur l'emporte et le conflit est signalé au gestionnaire | Données de référence, peu modifiées |
| Parcelle (géométrie) | **Pas d'écrasement silencieux** : la nouvelle géométrie crée une version et passe en « à valider » par le technicien ou le gestionnaire | Enjeux fonciers |
| Référentiels (cultures, intrants, marchés) | **Serveur maître**, lecture seule sur mobile | — |
| Opérations culturales, observations | Ajout seul ou last-write-wins par enregistrement | Faible risque de concurrence |

**Authentification hors ligne**
- ✅ PIN local à 4 chiffres pour déverrouiller sans réseau [OT §4.3].
- 💡 Le jeton d'accès expire (1 h ✅ [OT §4.3]), mais on autorise la **saisie hors ligne pendant une durée plafonnée** (par exemple 7 à 14 jours) après la dernière authentification en ligne. On prévoit aussi une révocation à distance (appareil perdu), appliquée à la reconnexion. → `Q-55`

**Pièces jointes** : photos et documents dans une file séparée, envoyés en plusieurs parties reprenables. La donnée métier est synchronisée d'abord, le binaire ensuite.

**Horloges** : les horodatages de l'appareil peuvent être faux. Le serveur garde sa propre date de réception et n'utilise la date de l'appareil que comme information métier (date de l'opération).

### 8.4 Volumétrie indicative 💡 (à recalculer après l'audit)

| Élément | Hypothèse | Ordre de grandeur |
|---|---|---|
| Producteurs | ~9 000 [ÉCH] | ~900 par coopérative |
| Parcelles | 1 à 3 par producteur | 9 000 – 27 000 au total |
| Techniciens | 1–2 par coopérative ✅ [OT §3.3] | 10–20 appareils actifs |
| Photos | Itinéraires + parcelles | Le principal poste de volume, à plafonner |

### 8.5 À valider

- Quelles actions doivent absolument marcher sans réseau ? L'offre dit « toutes les fonctionnalités terrain », à confirmer fonctionnalité par fonctionnalité → `Q-15`
- Un technicien peut-il couvrir **plusieurs coopératives** ? → `Q-16`
- Délai maximal acceptable sans synchronisation → `Q-55`

---

## 9. SIG et géolocalisation des parcelles

### 9.1 Ce qui est confirmé ✅ [OT §5.5] [PPT 8]

- Relevé sur mobile, **100 % hors ligne** : l'utilisateur choisit le producteur et la parcelle, marche jusqu'à chaque angle, appuie sur « Ajouter un point ». À partir de 3 points, le polygone s'affiche et la superficie est calculée. Stockage local, puis envoi vers PostGIS.
- Le relevé est fait par les techniciens ou les producteurs, **sans compétence SIG**.
- Web : carte Leaflet avec filtres (coopérative, culture, campagne, producteur), couches satellite et OSM, analyses spatiales PostGIS (répartition des cultures, assolements, densité, superficies par spéculation).
- Mobile : carte flutter_map des parcelles du producteur.
- Exports PDF (carte) et GeoJSON.
- Chaque parcelle est liée au producteur, aux cultures, au compte d'exploitation et à l'historique.
- *Must* : GPS offline, carte web, superficies. *Should* : cartographie comparative entre campagnes.

### 9.2 Ce qu'on propose en plus 💡

- **Précision GPS** : un smartphone donne typiquement 3 à 10 m de précision, parfois pire. Sur des parcelles maraîchères souvent petites, l'erreur relative sur la superficie peut être importante. On propose donc :
  - d'enregistrer la précision (`accuracy`) de chaque point ;
  - de refuser un point au-delà d'un seuil (par ex. 10 m, paramétrable) ;
  - de moyenner plusieurs positions par sommet ;
  - de proposer un **mode « marche le long du périmètre »** en plus du mode « point par angle ».
- **Superficie de référence** : on conserve **la superficie déclarée et la superficie mesurée**, on affiche l'écart et on indique laquelle alimente le revenu à l'hectare. → `Q-45`
- **Projection** : stockage en WGS84 (EPSG:4326), calcul des surfaces en projection métrique UTM 28N (EPSG:32628) ou en `geography`.
- **Contrôles** : géométrie valide (`ST_IsValid`), détection des **chevauchements** entre parcelles voisines, superficie hors bornes, statut « relevée / validée / à reprendre ». La validation par le technicien est prévue dans l'offre ✅ [OT §4.3].
- **Historique** des géométries : une parcelle peut être redécoupée d'une campagne à l'autre.
- **Import de géodonnées existantes** (KML, Shapefile, GeoJSON, GPX) si elles existent → `Q-46`.

### 9.3 Ce qu'il faut éviter de promettre

- Les données produites ne sont **pas cadastrales**. Elles documentent l'exploitation déclarée, pas la propriété. L'offre évoque les litiges fonciers [OT §2.2 Défi 5]. 💡 Il faut l'écrire clairement dans les CGU et les rapports. → `Q-48`
- On ne géoréférencera pas toutes les parcelles des ~9 000 producteurs en 12 semaines. L6 parle de « premières parcelles géoréférencées » ✅ [OT §VI]. 💡 Il faut fixer avec CRADESC un **objectif d'échantillon** par coopérative. → `Q-49`

### 9.4 Fonds de carte hors ligne et licences ❓ → `Q-47`

- Les serveurs de tuiles publics d'OpenStreetMap **interdisent le téléchargement en masse**, donc on ne peut pas s'en servir pour le cache hors ligne. 💡 Proposé : un **paquet de tuiles de la zone des Niayes** (MBTiles) généré par nous ou acheté, embarqué ou téléchargé une fois en Wi-Fi.
- L'imagerie satellite est **soumise à licence** (Esri, Mapbox, Google…). Les images gratuites (Sentinel-2, 10 m) sont trop peu précises pour de petites parcelles. Il faut choisir un fournisseur et un budget, ou se passer du satellite hors ligne.

---

## 10. Sécurité, rôles et données personnelles

### 10.1 Authentification

- ✅ Numéro de téléphone + **OTP SMS** (au lieu d'un mot de passe), PIN local à 4 chiffres pour le hors-ligne [OT §4.3]. Coûts d'OTP inclus dans les coûts récurrents [PPT 13].
- ⚠️ La présentation [PPT 9] ne mentionne que « JWT + refresh token », sans OTP. → `Q-52` : confirmer l'OTP et choisir le **fournisseur SMS** (opérateur local ou agrégateur), les coûts, le compte, l'identifiant d'expéditeur.
- 💡 Admin web : OTP + mot de passe, ou double authentification, pour les comptes CRADESC. Limitation du nombre de tentatives et anti-abus sur l'envoi d'OTP (le coût SMS est une surface d'attaque).

### 10.2 Matrice des droits 💡 (base de travail, issue de [OT §4.3] + faîtière)

| Action / Donnée | Producteur | Technicien | Gestionnaire coop. | Faîtière 💡 | Admin CRADESC |
|---|---|---|---|---|---|
| Voir sa propre fiche, ses parcelles, ses ventes | ✅ | — | — | — | — |
| Voir et saisir les producteurs de sa coopérative | ❌ | ✅ | ✅ | 👁 lecture (toutes les coopératives) | ✅ |
| Relever une parcelle | ❓ `Q-10` | ✅ | ✅ | ❌ | ✅ |
| Valider une géométrie | ❌ | ✅ | ✅ | ❌ | ✅ |
| Stocks, crédits, cotisations | 👁 les siens | ❓ saisie ? `Q-17` | ✅ | 👁 | ✅ |
| Réunions et PV | 👁 | ❓ | ✅ | 👁 | ✅ |
| Rapports | Individuel | Sa coopérative | Sa coopérative | Consolidé | Tout |
| Utilisateurs et référentiels | ❌ | ❌ | ❓ techniciens de sa coop ? `Q-18` | ❌ | ✅ |
| Export de données nominatives | ❌ | ❌ | ❓ | ❓ | ✅ (tracé) |

### 10.3 Protection des données ✅ [OT §4.3, §10.2]

- Base locale chiffrée en AES-256 (Drift/SQLCipher), HTTPS/TLS 1.3 ;
- JWT à durée de vie courte (1 h) et refresh tokens avec rotation ;
- journal d'audit **immuable** sur les transactions, crédits, membres et parcelles ;
- sauvegardes chiffrées ;
- moindre privilège ;
- aucune donnée personnelle en clair dans les logs ;
- audit de sécurité avant la mise en production (injections, droits par rôle, chiffrement local).

💡 Compléments : clé de chiffrement locale stockée dans le Keystore/Keychain, effacement des données locales à la révocation de l'appareil, URLs signées à durée courte pour les fichiers MinIO, secrets hors du dépôt.

### 10.4 Conformité données personnelles ❓ → `Q-56` à `Q-58`

La plateforme traitera des **données nominatives de ~9 000 personnes**, dont des données sensibles : **situation de handicap**, photos de pièces d'identité, données économiques, localisation des parcelles. L'offre ne traite pas ce volet réglementaire.

À clarifier :
- Qui est **responsable du traitement** (CRADESC ? la faîtière ? chaque coopérative ?) et qui est sous-traitant (CANAS, l'hébergeur) ? → `Q-56`
- Déclaration ou autorisation auprès de la **Commission de Protection des Données Personnelles (CDP)** du Sénégal, au titre de la loi n° 2008-12 et des textes en vigueur (à vérifier). Qui s'en charge ? → `Q-57`
- **Consentement** des producteurs de la base existante : comment la base a-t-elle été constituée et pour quel usage ? Faut-il recueillir un consentement à la migration ou à la première connexion ? → `Q-58`
- 💡 Minimisation : tranche d'âge plutôt que date de naissance si elle suffit aux rapports, statut de handicap en champ à accès restreint, photo de CNI seulement si nécessaire.

---

## 11. Organisation de l'équipe et responsabilités

### 11.1 L'équipe annoncée par CANAS, et ses incohérences

| Profil | [OT §1.6] (5 experts) | [PPT 12] (6 experts) | Remarque |
|---|---|---|---|
| Chef de mission — ingénieur agroéconomiste | Mbaye NDIAYE : coordination, analyse des besoins, supervision des livrables, relation CRADESC | Idem + rapport final | ✅ |
| Développeur Full-Stack Senior | « Aldrich Clement D. / Khadidja N. » : **architecture technique**, NestJS, Angular, intégration API | « Architecture backend, API REST, PostgreSQL/PostGIS » | ❓ Deux noms pour un poste ; recouvrement avec le Lead technique |
| Développeur Mobile Flutter | « Aldrich Clement D. » : Flutter, offline-first, GPS, UX terrain | « Développeur Mobile Flutter Senior » : app mobile, offline, GPS, synchro | ❓ Même nom que le full-stack |
| Géomaticien / SIG | « Mbaye NDIAYE » : géoréférencement, PostGIS, carto | « Géomaticien / Expert SIG » | ❓ **Même nom que le chef de mission** : erreur ou cumul ? |
| Expert sécurité informatique | Aziz Ndiaye : RBAC, chiffrement, audit et tests de sécurité | « Expert sécurité informatique » | ✅ |
| Gestionnaire de données | — | « Ateliers besoins, focus groups en wolof » | ❓ Nouveau profil dans la PPT, sans nom |
| **Lead technique** | **Absent** | **Absent** | ❓ Notre rôle n'est pas encore dans les documents du client |

✅ La présentation précise elle-même : *« La répartition des responsabilités techniques (architecture, backend, web, mobile, SIG, sécurité, tests, déploiement, documentation) sera définie au démarrage, pour éviter tout chevauchement. »* [PPT 12]

→ `Q-70` : composition réelle de l'équipe, noms, disponibilités (temps plein ou partiel), et place du Lead technique dans l'organigramme présenté au CRADESC.

### 11.2 Répartition proposée 💡 (RACI : R = réalise, A = décide / rend compte, C = consulté, I = informé)

| Activité | Chef de mission | Lead technique | Full-stack | Mobile | SIG | Sécurité | Gest. données | CRADESC |
|---|---|---|---|---|---|---|---|---|
| Relation client, contrat, planning global | **A/R** | C | I | I | I | I | I | C |
| Ateliers besoins, co-conception | **A/R** | R (volet technique) | C | C | C | — | R | C |
| Contenu métier (calendriers, charges, formules, référentiels AUMN) | **A/R** | C | I | I | I | — | C | C |
| Architecture technique, choix structurants | C | **A/R** | R | R | C | C | — | I (valide L2) |
| Modèle de données | C | **A** | R | C | R (géo) | C | C | I |
| Backend NestJS + API | I | A | **R** | C | C | C | — | — |
| Web Angular | I | A | **R** | — | C | — | — | — |
| Mobile Flutter + UX terrain | I | A | C | **R** | C | C | — | — |
| Moteur de synchronisation | I | **A/R** | R (serveur) | R (mobile) | — | C | — | — |
| SIG (relevé, PostGIS, carto) | I | A | C | R | **R** | — | — | — |
| Sécurité, RBAC, audit | I | A | R | R | — | **R** | — | I |
| Audit et migration de la base des 9 000 | C | **A/R** | C | — | C (géo) | C | **R** | C (arbitrages) |
| DevOps, environnements, CI/CD, monitoring | I | **A/R** | R | R | — | C | — | I |
| Tests (unitaires, intégration, offline, charge) | I | A | R | R | R | R | — | — |
| UAT terrain | **A** | R | C | C | C | — | R | R |
| Documentation technique, Swagger, guide d'admin | I | **A** | R | R | R | R | — | I |
| Manuels utilisateurs, formation | **A/R** | C | C | C | C | — | R | C |

### 11.3 Rôle et périmètre du Lead technique 💡

**Mission** : garantir que ce qui est construit est cohérent, solide, livré à temps et maintenable par CRADESC après la mission. Le Lead technique est l'**interlocuteur technique unique** pour le chef de mission et pour le référent technique du CRADESC.

**Responsabilités**

1. **Architecture et décisions techniques** : produire L2 (architecture, schéma de données, stratégie de sécurité et d'hébergement), tenir un registre des décisions (ADR), arbitrer les choix de librairies et de patterns.
2. **Traduction besoin → spécification** : transformer les sorties des ateliers en spécifications fonctionnelles et en tickets prêts à développer (critères d'acceptation), en binôme avec le chef de mission.
3. **Conception et pilotage de la synchronisation offline**, le composant le plus risqué du projet.
4. **Chantier données** : pilotage de l'audit, de la qualification, du nettoyage et de la migration de la base des ~9 000 producteurs, avec le gestionnaire de données.
5. **Pilotage de l'équipe de développement** : découpage en sprints, revue de code, standards (lint, conventions, tests), démos de fin de sprint.
6. **Qualité et livraison** : stratégie de tests, CI/CD, environnements, mise en production, monitoring, sauvegardes.
7. **Documentation et transfert** : documentation technique, procédures DevOps, transmission du code à CRADESC (L8), contribution au guide d'administration (L7).
8. **Développement** : contribution directe au code. ❓ Proportion et modules à définir (par exemple le cœur de la synchro, l'auth et l'import) → `Q-72`

**Hors périmètre (sauf accord)** : relation contractuelle et facturation avec CRADESC, contenu agronomique et économique, animation des formations niveaux 2 et 3, logistique terrain.

**À valider avec CANAS** : `Q-70` (position dans l'organigramme et vis-à-vis du CRADESC), `Q-71` (recouvrement avec le « Full-Stack Senior — architecture technique »), `Q-72` (part de développement), `Q-73` (pouvoir de décision technique, par ex. validation des merges et des mises en production, et escalade en cas de désaccord).

### 11.4 Gouvernance et rituels

- ✅ Sprints de 2 semaines, démo de 30 min avec CRADESC à chaque fin de sprint [OT §3.1, §3.3].
- ✅ Tableau des risques partagé et mis à jour à chaque revue de sprint [OT §8.1].
- ✅ Tout glissement est signalé sous 24 h, avec un plan de rattrapage sous 48 h [OT §10.2].
- 💡 Point technique hebdomadaire (Lead technique + devs), point de pilotage hebdomadaire (chef de mission + Lead technique), outil de tickets partagé, dépôt Git dans une organisation dont CRADESC devient propriétaire à la fin. → `Q-68`
- ❓ Qui valide les livrables côté CRADESC, dans quel délai, et y a-t-il un comité de pilotage ? → `Q-04`

---

## 12. Planning

### 12.1 Ce qui est prévu ✅ [OT §3.3, §6.2] [PPT 11]

| Phase | Semaines | Contenu | Livrables |
|---|---|---|---|
| 1. Analyse et conception | S1–S3 | Lancement, ateliers terrain (≥ 3 coopératives), MoSCoW, architecture, schéma de base, wireframes | L1 (fin S2), L2 (fin S3) |
| 2. Développement | S4–S9 | Sprint 1 (S4–5) : infra, Admin, OTP, RBAC · Sprint 2 (S6–7) : Agro, Exploitation, SIG · Sprint 3 (S8–9) : Commercial, finalisation web, **offline complet + synchro** | L3 (fin S5), L4 (fin S8) |
| 3. Tests et validation | S9–S10 | Tests fonctionnels, offline, charge, sécurité, UAT dans 2–3 coopératives | L5 (fin S10) |
| 4. Déploiement et formation | S11–S12 | Production, import des données, formation en cascade | L6, L7, L8 (fin S12) |
| Support | S13–S16 | 4 semaines de support à distance, bilan à 4 semaines | — |

✅ Démo disponible pour CRADESC dès **S6** [OT §7.1].

### 12.2 Incohérences et risques de planning relevés

1. **La synchro offline arrive trop tard.** Elle est prévue au Sprint 3 (S8–S9), alors que tous les modules mobiles en dépendent. Ils risquent d'être développés « en ligne » puis repris.
2. **L3 (prototype/maquettes validées) tombe fin S5**, alors que le développement commence en S4 : on développe avant que les maquettes soient validées.
3. **L4 (bêta) est prévue fin S8**, mais le Sprint 3 finit en S9.
4. La **phase 3 commence en S9**, en même temps que la fin du Sprint 3.
5. La **date de démarrage (S1)** n'est pas connue → `Q-03`. L'offre date du 18 juin 2026, et l'attribution et le calendrier réel sont à confirmer.
6. Le **chantier données (~9 000 producteurs)** n'est pas planifié.
7. Les UAT et la formation terrain dépendent de la **disponibilité des producteurs** (saisons, récoltes) → `Q-19`.

### 12.3 Planning ajusté proposé 💡 (même enveloppe de 12 semaines)

| Semaine | Fonctionnel / terrain | Technique | Données (~9 000) | Jalons |
|---|---|---|---|---|
| **S0** (avant lancement) | Réception TdR, contrat, contacts | Accès, comptes (Git, Figma, hébergeur), squelette des dépôts | **Réception de la base ou d'un extrait** | Checklist §16 envoyée |
| **S1** | Lancement, atelier gestionnaires, MoSCoW | Choix techniques de base, CI, environnement dev | Inventaire + début du profilage | — |
| **S2** | Terrain (≥ 3 coopératives), parcours, processus | **Prototype technique de la synchro** (preuve de concept Drift ↔ NestJS) | Rapport d'audit de la base | **L1** (avec rapport d'audit en annexe) |
| **S3** | Wireframes, référentiels | Architecture, schéma de données, spec de synchro | Règles de qualité et mapping validés | **L2** |
| **S4–S5** | Maquettes haute fidélité validées en atelier | **Sprint 1** : socle auth/OTP/RBAC/périmètre, **moteur de synchro**, M1 Admin, référentiels | Nettoyage + scripts d'import v1 | **L3** (fin S5) |
| **S6–S7** | Démo CRADESC (S6) | **Sprint 2** : M4 Agro, M3 Exploitation, M5 SIG (relevé + PostGIS + carte) | **Import à blanc n°1** (recette) | — |
| **S8–S9** | — | **Sprint 3** : M2 Commercial, rapports/exports, finalisation web | Arbitrages des coopératives, **import à blanc n°2** | **L4** (bêta, fin S8 ou S9 → `Q-08`) |
| **S9–S10** | UAT dans 2–3 coopératives | Tests offline, charge et sécurité, corrections | Contrôles de qualité de la base en recette | **L5** (fin S10) |
| **S11** | Formation niveau 1 (CRADESC) | Mise en production, monitoring | **Import final en production** | — |
| **S12** | Formation niveau 2 (techniciens) → niveau 3 en cascade | Stabilisation, docs | Rapport de migration | **L6, L7, L8** |
| **S13–S16** | Support, suivi d'adoption | Correctifs | Complétion des fiches « à compléter » | Bilan à 4 semaines |

### 12.4 Jalons de paiement ✅ [PPT 13]

| Tranche | Montant | Déclencheur |
|---|---|---|
| T1 — 30 % | 1 350 000 FCFA | Signature du contrat, L1, L2 |
| T2 — 30 % | 1 350 000 FCFA | Validation de la bêta, L3, L4 |
| T3 — 40 % | 1 800 000 FCFA | Acceptation du rapport final, L5 à L8 |

---

## 13. Livrables

### 13.1 Livrables contractuels ✅ [OT §6.1]

| N° | Livrable | Contenu (offre) | Échéance | Notre contribution 💡 |
|---|---|---|---|---|
| L1 | Rapport de démarrage | Synthèse du cadrage, ateliers, besoins validés, MoSCoW, plan de travail, risques | Fin S2 | Volet technique + **rapport d'audit de la base** |
| L2 | Document d'architecture technique et fonctionnelle | Architecture, schéma PostgreSQL/PostGIS, specs des 5 modules, maquettes, sécurité, hébergement | Fin S3 | **Rédaction principale** + spec de synchro + dictionnaire de données |
| L3 | Prototype / maquettes validées | Prototype interactif (Figma), mobile + web | Fin S5 | Faisabilité, cohérence avec le modèle |
| L4 | Version bêta | Mobile + web en recette, modules *Must*, Swagger, SIG | Fin S8 | Réalisation |
| L5 | Version finale | Corrigée après UAT, production configurée, monitoring | Fin S10 | Réalisation |
| L6 | Base des producteurs et parcelles | Base structurée avec données initiales et premières parcelles | Fin S12 | **Migration + rapport de migration** |
| L7 | Manuel d'utilisation et d'administration | Manuel en français, fiches pratiques, guide d'admin, procédures de sauvegarde (PDF + éditable) | Fin S12 | Guide d'administration technique |
| L8 | Rapport final | Bilan, doc technique, code source intégral, procédures DevOps, recommandations | Fin S12 | Doc technique, remise du code, recommandations techniques |

✅ Supports de formation également promis [OT §7.3] : manuel, fiches A5, guide d'admin, **10 vidéos de 2 à 5 min**, support de formation niveau 2.

### 13.2 Documents de cadrage internes à produire ensuite 💡

| Document | Base | Quand |
|---|---|---|
| Note de cadrage | Ce brief, épuré des points internes | Avant le lancement (S0–S1) |
| Checklist des demandes client | §16 | **Immédiatement** |
| Spécifications fonctionnelles détaillées (SFD) par module | §5 + ateliers | S2–S3 |
| Spécifications techniques (STD) + ADR | §7–10 | S3 |
| Spécification de synchronisation | §8 | S3 |
| Dictionnaire de données + mapping de migration | §6–7.4 | S3 |
| Plan de tests et de recette (y compris scénarios offline) | §12 | S5 |
| Plan de déploiement et d'exploitation | §7.7 | S9 |

---

## 14. Budget et coûts récurrents ✅ [PPT 13]

| Poste | Montant | % |
|---|---|---|
| Ressources humaines (6 profils) | 3 644 000 FCFA | 84 % |
| Déplacements et missions terrain | 202 000 FCFA | 5 % |
| Documentation | 176 000 FCFA | 4 % |
| Infrastructure et formation | 243 050 FCFA | 5 % |
| Licences (Figma Pro) | 55 000 FCFA | 1 % |
| Provisions pour imprévus | 179 950 FCFA | 4 % |
| **Total** | **4 500 000 FCFA** | |

- ✅ Coûts récurrents à la charge de CRADESC : **~354 000 FCFA/an** (hébergement, stockage, OTP SMS, CDN). **Les 6 premiers mois sont inclus** dans le budget.
- ❓ Hypothèse de volume d'OTP derrière ce chiffre, à recalculer si les ~9 000 producteurs ont chacun un compte → `Q-52`
- ❓ Les licences éventuelles (imagerie satellite, tuiles, comptes Apple Developer à ~99 USD/an et Google Play) ne semblent pas budgétées → `Q-47`, `Q-66`
- ❓ Le chantier de reprise des ~9 000 producteurs n'est pas budgété en tant que tel → `Q-28`
- *Remarque interne : l'enveloppe RH est serrée pour 6 profils sur 3 mois. Le découpage de la part technique entre CANAS et nous est à clarifier (hors document client).*

---

## 15. Risques

### 15.1 Risques identifiés dans l'offre ✅ [OT §8.1]

Connectivité (élevé/élevé) · délai de 3 mois (moyen/élevé) · faible maîtrise du numérique (élevé/moyen) · disponibilité des OP pour les ateliers (moyen/moyen) · qualité des données existantes (moyen/moyen) · pérennité après la mission (faible/élevé) · résistance au changement (faible/moyen) · sécurité et confidentialité (faible/élevé).

### 15.2 Risques ajoutés ou réévalués 💡

| Risque | Proba. | Impact | Mitigation proposée |
|---|---|---|---|
| **Base des ~9 000 en mauvais état ou livrée tard** | Élevée | Élevé | Demande immédiate (S0), audit en S1–S2, grille A/B/C/D, import progressif, objectif L6 fixé *après* l'audit |
| **Synchro offline sous-estimée** (conflits, doublons, pertes) | Moyenne | Élevé | Preuve de concept en S2, moteur au Sprint 1, idempotence, tests de coupure réseau automatisés |
| **Périmètre trop large pour 12 semaines** (5 modules + migration + mobile + web) | Élevée | Élevé | MoSCoW strict en S1, *Must* réduit au minimum utile, livraison par modules |
| **Recouvrement des rôles dans l'équipe** (architecture, noms en double) | Moyenne | Moyen | Clarification S0 (`Q-70`–`Q-73`), RACI validé |
| **Ambiguïté sur la réutilisation de DIGICOOP** (IP, attentes du client) | Moyenne | Moyen | Clarification S0 (`Q-05`, `Q-06`) |
| **Non-conformité données personnelles** (handicap, CNI, consentement) | Moyenne | Élevé | Responsable de traitement désigné, démarche CDP, minimisation |
| **Précision GPS insuffisante** sur petites parcelles | Moyenne | Moyen | Seuil de précision, moyennage, superficie déclarée conservée, validation technicien |
| **Engagement de disponibilité à 99,5 % sur un seul VPS** | Moyenne | Moyen | Requalifier l'engagement ou prévoir une redondance (`Q-67`) |
| **Dépendance à l'OTP SMS** (coût, fournisseur, délivrabilité) | Moyenne | Moyen | Fournisseur local choisi en S1, PIN hors ligne, anti-abus |
| **Hébergement et comptes au nom d'un prestataire** (perte d'accès après la mission) | Moyenne | Élevé | Comptes créés au nom de CRADESC dès le départ (`Q-62`) |

---

## 16. Informations et ressources à demander au client

Légende priorité : **P1** = bloquant avant S1 · **P2** = nécessaire avant la fin de S3 (L2) · **P3** = nécessaire avant le développement concerné.
Destinataire : **CR** = CRADESC · **CA** = CANAS · **CR/CA** = les deux.

### 16.1 Cadre contractuel et gouvernance

| # | Demande | À | Prio |
|---|---|---|---|
| Q-01 | Termes de Référence (TdR) complets du CRADESC | CR/CA | P1 |
| Q-02 | Contrat signé, offre financière finale, PV de négociation ou d'attribution (modifications de périmètre, planning, budget) | CA | P1 |
| Q-03 | Date officielle de démarrage (S1) et contraintes calendaires (fêtes, campagnes agricoles, disponibilités) | CR | P1 |
| Q-04 | Interlocuteurs CRADESC (chef de projet, référent technique, validateurs), circuit et délai de validation des livrables, comité de pilotage | CR | P1 |
| Q-05 | DIGICOOP : réutilisation prévue (code, modèle de données, composants) ? Stack ? Accès démo et, si besoin, au dépôt | CA | P1 |
| Q-06 | Propriété intellectuelle : code remis à CRADESC, statut des éventuels composants DIGICOOP, licences | CA | P1 |
| Q-07 | Indicateurs de réussite attendus par CRADESC et ses bailleurs | CR | P2 |
| Q-08 | Date réelle de L4 (fin S8 ou S9) et règles de recette | CA/CR | P2 |

### 16.2 Base existante des ~9 000 producteurs

| # | Demande | À | Prio |
|---|---|---|---|
| Q-20 | **Export complet de la base** (ou à défaut un extrait représentatif d'au moins 500 lignes couvrant plusieurs coopératives), dans son format d'origine | CR | **P1** |
| Q-21 | Origine de la base : qui l'a constituée, quand, comment (enquête papier, Kobo/ODK, Excel, DIGICOOP, autre projet), dans quel but, dernière mise à jour | CR | P1 |
| Q-22 | Structure et format : type (Excel, CSV, Access, base SQL, outil en ligne), nombre de fichiers ou tables, **liste des champs et signification**, encodage, dictionnaire de données s'il existe | CR | P1 |
| Q-23 | Rattachement aux 10 coopératives : chaque producteur est-il affecté à une coopérative ? Y a-t-il des producteurs hors coopératives ? | CR | P1 |
| Q-24 | Identifiants : existe-t-il un identifiant unique (code membre, n° CNI, n° interne) ? Fiabilité des numéros de téléphone ? | CR | P1 |
| Q-25 | Données associées disponibles : parcelles, superficies déclarées, cultures, campagnes passées, cotisations, crédits, ventes, photos ou pièces | CR | P2 |
| Q-26 | Doublons et problèmes connus (inscriptions multiples, homonymes, numéros partagés), et personne qui pourra arbitrer les cas douteux dans chaque coopérative | CR | P2 |
| Q-27 | Accès technique : si la base est dans un outil ou un serveur, accès en lecture (compte, VPN, export API) | CR | P1 |
| Q-28 | Validation interne CANAS : prise en charge du chantier audit/nettoyage/migration (charge, budget, éventuel avenant) | CA | P1 |

### 16.3 Parcelles, géographie et référentiels

| # | Demande | À | Prio |
|---|---|---|---|
| Q-30 | Liste des **10 coopératives** et de la faîtière : noms officiels, statut juridique, sièges, localités couvertes, responsables, nombre de membres | CR | P1 |
| Q-31 | Multi-adhésion : un producteur peut-il appartenir à plusieurs coopératives ? | CR | P2 |
| Q-32 | Statut foncier des parcelles à suivre (propriétaire, location, prêt, indivision) ? | CR | P2 |
| Q-33 | Définition des campagnes et saisons utilisées par les OP | CR/CA | P2 |
| Q-46 | Données géographiques existantes : points GPS, polygones, KML/Shapefile/GeoJSON, système de coordonnées, source | CR | P2 |
| — | Référentiel des localités (région, département, commune, village) utilisé par CRADESC | CR | P2 |
| Q-36 | **Référentiels AUMN** (9 comptes d'exploitation, normes par culture) sous forme exploitable, avec l'accord de réutilisation | CA | P2 |
| Q-37 | Liste des intrants, unités de mesure locales (sac, caisse, bassine, litre…), magasins de stockage | CR/CA | P3 |
| Q-40 | Liste des marchés de référence et des canaux de vente | CR/CA | P3 |
| Q-42 | Calendriers culturaux et recommandations techniques : qui les rédige et les valide ? | CA | P3 |

### 16.4 Règles métier

| # | Demande | À | Prio |
|---|---|---|---|
| Q-34 | Règles de cotisation (montant, périodicité, mode de paiement) par coopérative | CR | P3 |
| Q-35 | Valeur attendue de la « signature numérique des PV » | CR | P3 |
| Q-38 | Règles de crédit : nature (intrants/espèces), intérêts ou frais, échéancier type, pénalités | CR | P3 |
| Q-39 | Ventes individuelles ou groupées via la coopérative | CR | P3 |
| Q-41 | Formules du compte d'exploitation (main-d'œuvre familiale, autoconsommation), définition d'une « exploitation en difficulté » | CA | P3 |
| Q-43 | Statut des alertes de stock (*Must* ou *Should*) | CA/CR | P2 |
| Q-44 | Confirmation du hors périmètre (marketplace, paiement, USSD, météo, comptabilité générale) | CR | P2 |
| — | **Modèles de rapports attendus** par CRADESC et les bailleurs (indicateurs, ventilations genre/âge/handicap, format) | CR | P2 |

### 16.5 Utilisateurs, terrain et équipements

| # | Demande | À | Prio |
|---|---|---|---|
| Q-10 | Les producteurs utiliseront-ils l'appli eux-mêmes ? Taux estimé de smartphones ; sinon, saisie par les techniciens | CR | P1 |
| Q-11 | Terminaux des techniciens : fournis ou personnels, modèles, versions d'Android, appareils partagés | CR | P2 |
| Q-12 | Exigences d'accessibilité (handicap visuel, lecture, etc.) | CR | P2 |
| Q-13 | iOS : nécessaire pendant la mission ? | CR | P2 |
| Q-14 | Accès des gestionnaires à un ordinateur | CR | P2 |
| Q-15 | Liste des actions à garantir hors ligne | CR | P2 |
| Q-16 | Un technicien peut-il couvrir plusieurs coopératives ? Nombre réel de techniciens | CR | P2 |
| Q-17 | Droits des techniciens sur stocks, crédits et cotisations | CR | P2 |
| Q-18 | Qui crée les comptes utilisateurs (CRADESC seul, ou gestionnaires pour leur coopérative) ? | CR | P2 |
| Q-19 | Calendrier agricole et disponibilités pour les ateliers (S1–S2), les UAT (S9–S10) et la formation (S11–S12) | CR | P1 |
| — | Couverture réseau connue par zone (opérateurs, zones blanches) | CR | P3 |

### 16.6 Sécurité, rôles et données personnelles

| # | Demande | À | Prio |
|---|---|---|---|
| Q-50 | Rôle de la **faîtière** dans l'outil | CR | P2 |
| Q-51 | Terminologie et droits du « Gestionnaire de coopérative / Responsable d'OP », y compris la validation des données | CR | P2 |
| Q-52 | Confirmation de l'OTP SMS, **fournisseur SMS** existant ou à choisir, compte au nom de qui, identifiant d'expéditeur, volume estimé | CR/CA | P2 |
| Q-53 | Rôle de super-admin technique (CANAS / Lead technique) pendant et après la mission | CA/CR | P2 |
| Q-54 | Canaux de notification (push, SMS) et budget SMS | CR | P3 |
| Q-55 | Durée maximale de travail hors ligne sans reconnexion, politique en cas d'appareil perdu | CR | P2 |
| Q-56 | Responsable du traitement des données | CR | P2 |
| Q-57 | Démarche auprès de la CDP (déclaration/autorisation) : qui la porte ? | CR | P2 |
| Q-58 | Consentement des producteurs de la base existante, conditions d'utilisation | CR | P2 |

### 16.7 Infrastructure, hébergement et accès techniques

| # | Demande | À | Prio |
|---|---|---|---|
| Q-60 | **Infrastructure existante** chez CRADESC : serveurs, cloud, hébergeur, équipe IT, outils utilisés | CR | P1 |
| Q-61 | Exigence de **localisation des données** (Sénégal, Afrique, indifférent) | CR | P1 |
| Q-62 | Comptes créés **au nom de CRADESC** : hébergeur, nom de domaine, DNS, e-mail technique, organisation GitHub, Sentry | CR | P1 |
| Q-63 | Nom de domaine souhaité (existant ou à acheter) et sous-domaines (app, api, admin) | CR | P2 |
| Q-64 | Budget d'hébergement validé (cohérence avec les ~354 000 FCFA/an) et payeur | CR/CA | P2 |
| Q-65 | Destinataire des alertes de monitoring et astreinte après la mission | CR | P3 |
| Q-66 | **Comptes développeur Google Play (et Apple si iOS)** au nom de CRADESC, avec délai de vérification anticipé | CR | P2 |
| Q-67 | Niveau de disponibilité réellement exigé (99,5 % garanti ou objectif) | CR/CA | P2 |
| Q-68 | Outils de projet (tickets, dépôt, documentation partagée) et accès pour CRADESC | CA | P1 |

### 16.8 API et services tiers déjà utilisés

| # | Demande | À | Prio |
|---|---|---|---|
| — | Outils de collecte utilisés (KoboToolbox, ODK, Google Forms…) et accès aux projets | CR | P1 |
| — | Services SMS, e-mail ou WhatsApp Business déjà contractés | CR | P2 |
| — | Services de paiement mobile utilisés par les coopératives (Wave, Orange Money), pour information (hors périmètre *Must*) | CR | P3 |
| — | API de DIGICOOP ou d'autres plateformes partenaires à connecter | CA/CR | P2 |
| — | Systèmes des bailleurs avec lesquels échanger des données (format d'export imposé ?) | CR | P3 |
| Q-47 | Fonds de carte et imagerie satellite : abonnement existant ? budget ? | CR/CA | P2 |

### 16.9 Identité visuelle et contenus

| # | Demande | À | Prio |
|---|---|---|---|
| Q-80 | **Logo Mbay Diaay** en vectoriel (SVG, AI ou EPS) et en PNG haute définition. S'il n'existe pas : qui le conçoit ? | CR | P2 |
| Q-81 | **Charte graphique** : couleurs (codes HEX), typographies, règles d'usage | CR | P2 |
| Q-82 | Logos et **mentions obligatoires** : CRADESC, faîtière, coopératives, bailleurs et partenaires financiers | CR | P2 |
| Q-83 | Orthographe officielle du nom (« Mbay Diaay » dans les documents, variantes ailleurs), slogan, icône d'application | CR | P2 |
| Q-84 | Langue(s) de l'interface : français seul, ou aussi wolof/pulaar (libellés, audio, pictogrammes) | CR | P2 |
| — | Photos terrain utilisables (avec droits) pour l'appli, les manuels et les vidéos | CR | P3 |
| Q-48 | Texte de mentions légales / CGU, avertissement « données non cadastrales » | CR | P3 |

---

## 17. Registre des décisions à prendre

| ID | Décision | Options | Recommandation 💡 | Décideur | Échéance |
|---|---|---|---|---|---|
| D-01 | Place et périmètre du Lead technique | Selon §11.3 / autre | §11.3 | CANAS | S0 |
| D-02 | Réutilisation de DIGICOOP | Aucune / modèle de données / code | À décider selon `Q-05` et `Q-06` | CANAS + CRADESC | S0 |
| D-03 | Chantier de migration des ~9 000 | Inclus / avenant / import brut sans nettoyage | Inclus avec objectif L6 fixé après l'audit | CANAS + CRADESC | S1 |
| D-04 | Mode d'usage producteur | Autonome / assisté par technicien / mixte | Mixte : technicien d'abord, producteur en consultation | CRADESC | S2 |
| D-05 | Rôle faîtière | Pas de rôle / lecture consolidée | Lecture consolidée | CRADESC | S2 |
| D-06 | Stratégie de conflits de synchro | LWW global / par type (§8.3) | Par type | Lead technique (validé en L2) | S3 |
| D-07 | Moteur de synchro au Sprint 1 | Sprint 3 (offre) / Sprint 1 | Sprint 1 | Lead technique + CANAS | S1 |
| D-08 | Hébergement | VPS Afrique / cloud / serveur CRADESC | Selon `Q-60` et `Q-61`, comptes au nom de CRADESC | CRADESC | S2 |
| D-09 | Fournisseur SMS/OTP | À comparer | Fournisseur local avec API fiable | CRADESC + Lead technique | S3 |
| D-10 | Fonds de carte hors ligne | OSM packagé / fournisseur payant / sans satellite | OSM packagé + satellite en ligne seulement | Lead technique + CRADESC | S3 |
| D-11 | Superficie de référence | Déclarée / mesurée | Les deux conservées, la mesurée validée prime | CRADESC + agroéconomiste | S3 |
| D-12 | Engagement de disponibilité | 99,5 % garanti / objectif | Objectif, sauf budget de redondance | CANAS + CRADESC | S3 |
| D-13 | Langue de l'interface | FR / FR + wolof | FR + pictogrammes, wolof à évaluer | CRADESC | S2 |

---

## 18. Prochaines étapes

1. **Relecture interne** de ce brief et correction des éventuelles erreurs de lecture.
2. **Échange avec CANAS** (avant de parler au client) : `Q-02`, `Q-05`, `Q-06`, `Q-28`, `Q-36`, `Q-53`, `Q-68`, `Q-70` à `Q-73`, planning ajusté (§12.3).
3. **Envoi au CRADESC de la checklist §16** (priorités P1 d'abord), dont la **demande de la base des ~9 000 producteurs**.
4. Dès réception de la base : **profilage automatisé** et première note de qualité (en 48–72 h).
5. Rédaction de la **note de cadrage** (version client), puis des SFD, STD et de la spec de synchro pour L2.

---

## Annexe A — Glossaire

| Terme | Définition |
|---|---|
| **OP** | Organisation de producteurs |
| **Faîtière** | Structure qui regroupe les 10 coopératives et les représente auprès des partenaires |
| **Niayes** | Zone côtière maraîchère du nord-ouest du Sénégal (entre Dakar et Saint-Louis) |
| **Campagne** | Période de production agricole (saison ou cycle) à laquelle se rattachent cultures, charges et ventes |
| **Itinéraire technique** | Suite des opérations culturales, de la préparation du sol à la récolte |
| **Compte d'exploitation** | Bilan charges/produits d'une culture ou d'une exploitation sur une campagne |
| **Géoréférencement** | Relevé des coordonnées GPS d'une parcelle pour en tracer le contour (polygone) |
| **Offline-first** | L'appli fonctionne d'abord en local ; le réseau sert seulement à synchroniser |
| **Outbox** | File locale des modifications en attente d'envoi au serveur |
| **Idempotence** | Rejouer la même opération n'a pas d'effet supplémentaire (pas de doublon) |
| **RBAC** | Contrôle d'accès par rôle |
| **MoSCoW** | Priorisation *Must / Should / Could / Won't have* |
| **UAT** | Tests d'acceptation par les utilisateurs |
| **CDP** | Commission de Protection des Données Personnelles (Sénégal) |
| **AUMN / JAFOWA** | Association des Unions Maraîchères des Niayes / projet dans le cadre duquel CANAS a produit les référentiels économiques |
| **DIGICOOP** | Plateforme de CANAS pour les coopératives (app.digicoops.com) |

## Annexe B — Incohérences relevées entre les documents

| # | Sujet | [OT] | [PPT] / [CP] | Action |
|---|---|---|---|---|
| 1 | Taille de l'équipe | 5 experts | 6 experts (+ gestionnaire de données) | `Q-70` |
| 2 | Noms | Même nom pour Full-stack et Mobile ; même nom pour Chef de mission et SIG | Pas de noms | `Q-70` |
| 3 | Architecture technique | Confiée au Full-Stack Senior | Lead technique absent ; [CP] prévoit la conception technique par nous | `Q-71` |
| 4 | Authentification | OTP SMS + PIN | « JWT + refresh token » uniquement | `Q-52` |
| 5 | Rôle coopérative | « Gestionnaire de coopérative » | « Responsable d'OP » avec validation des données | `Q-51` |
| 6 | Volumétrie | « Centaines d'OP » (tableau d'architecture) | 10 coopératives (§2.1) | Confirmer la cible de dimensionnement |
| 7 | Alertes de stock | *Must* | Également en *Should* | `Q-43` |
| 8 | Planning | L3 fin S5 alors que le dev commence en S4 ; L4 fin S8 alors que le sprint finit en S9 ; offline complet en Sprint 3 | — | `Q-08`, D-07 |
| 9 | Synchro | « via BullMQ » | — | Précision de conception §8.2 |
| 10 | Hébergement | « VPS hébergé en Afrique » et « infrastructure cloud » | « 1 VPS » | `Q-60`, `Q-61` |
| 11 | Import des données | 1 semaine d'import en phase 4 | Base de ~9 000 producteurs [ÉCH] | `Q-28`, §6 |
| 12 | Nom du projet | « Mbay Diaay » | Dossier local « Mbaay Diay » | `Q-83` |

---

*Brief de cadrage Mbay Diaay — v0.1 — document de travail interne, non destiné à être transmis tel quel au client.*
