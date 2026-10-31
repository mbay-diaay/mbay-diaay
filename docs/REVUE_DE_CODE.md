# Revue de code du 26 octobre 2026

**Périmètre** : tout le prototype web (5 modules, droits, authentification, bilingue). **Méthode** : trois relectures en lecture seule côté A (store et règles, écrans et composants, traduction / accessibilité / performance), une relecture côté B (sécurité et droits, authentification, menu, tests de parcours, configuration : `docs/revue/B.md`). Chaque constat a été vérifié dans le code. Gravité : critique (donnée ou droit en danger, ou bloquant), majeure (bug ou dette qui coûtera), mineure (confort). Effort : S (moins d'une heure), M (quelques heures), L (une journée ou plus).

**Règle du refactor** : un lot = un commit, tests et parcours verts avant et après, aucun changement visible pour les utilisateurs (les parcours e2e servent de filet).

## 1. Ce qui va bien

- Aucun sélecteur du store ne renvoie un nouvel objet à chaque lecture (287 appels vérifiés) : pas de risque de boucle de rendu.
- Pagination sur 10 listes ; Leaflet et SheetJS chargés à la demande.
- Aucun bouton-icône sans nom accessible, aucun `onClick` sur un `div`, focus rendu par Radix à la fermeture des dialogues.
- Droits et périmètre vérifiés dans les actions récentes (stocks, crédits, ventes, charges, campagnes, calendriers) ; données financières lues par des sélecteurs qui exigent le droit puis le périmètre.
- 670 tests, ESLint sans avertissement, typage strict, aucun texte en dur selon l'inventaire.

## 2. Bugs et risques de données (lot 0, à faire en premier)

| # | Gravité | Où | Constat | Action | Effort |
|---|---|---|---|---|---|
| 1 | Critique | `store.ts` `grantAccess` | Un compte existant de même e-mail sans `memberId` (par exemple l'administrateur) est écrasé : rôle, périmètre et activation remplacés. | Refuser quand le compte existant n'est pas lié à ce membre ou quand son rôle n'est pas attribuable par la personne connectée. | S |
| 2 | Critique | `store.ts` (une vingtaine d'actions historiques : `addUser`, `toggleUser`, `setYouthMaxAge`, `setSeuil`, `mergeCase`, `classifyCase`, `updateAlerts`, `reviewPlot`, `updateProducer`, `qualifyOrgs`, `decideCorrection`, appareils, `restoreSnapshot`, `ingestImport`…) | Aucun contrôle de droit, de session ni de périmètre dans le store ; seules les actions récentes en ont. Un appel direct contourne l'interface. | Helper `guard()` appliqué à ces actions avec les droits de `permissions.ts` (voir lot 1). À confirmer avec la revue de B. | M |
| 3 | Critique | `store.ts` `setContributionRule`, `contributions.ts` `dueAtOf` | Une échéance `02-31` ou `04-31` est acceptée ; la date produite est invalide et les cotisations ne sont jamais exigibles. | Valider le jour réel du mois. | S |
| 4 | Majeure | `store.ts` `recordPayment` | `paidAt` ni validé ni borné : reçu `R-NaN-0001`, date future acceptée. | Valider la date, pas dans le futur. | S |
| 5 | Majeure | `store.ts` (`addUser`, liens de comptes, corrections) | Identifiants `length + 1` : collisions après retrait (deux liens avec le même id, `unlinkLink` retire les deux). | Un seul générateur d'identifiants. | S |
| 6 | Majeure | `store.ts` `nextId`, `campaigns.ts`, `scoops.ts` | Maximum + 1 : l'identifiant d'un objet supprimé est réutilisé, une référence périmée (`documentIds`, `minutes.documentId`) pointe alors vers un autre objet ; trois copies de la fonction. | Compteur monotone par préfixe, une seule fonction testée. | S |
| 7 | Majeure | `store.ts` `restoreSnapshot`, `isSnapshot` | Seules trois listes sont vérifiées ; les autres ne sont pas remises à zéro : mélange d'ancien et de nouvel état, session qui garde ses anciens droits, aucun droit exigé. | Valider chaque liste, repartir de l'état initial, recalculer la session, exiger `data.backup`. | M |
| 8 | Majeure | `store.ts` `auditSeq` | Compteur non resynchronisé après restauration : identifiants d'audit en double. | Dériver du maximum existant. | S |
| 9 | Majeure | `campaigns.ts` `currentCampaign` | Hors de toute période, renvoie la dernière campagne en cours : une vente de 2020 est rattachée à la campagne actuelle. | Renvoyer rien hors période, ou signaler le repli. | S |
| 10 | Majeure | `store.ts` `setPlanStatus`, `updatePlan` | Le circuit brouillon, validé, à jour n'est pas imposé (retour de « à jour » à « brouillon ») ; `updatePlan` ne contrôle ni archivage, ni campagne clôturée. | Garde de transition et contrôles de `createPlan`. | S |
| 11 | Majeure | `commerce.ts` `creditIssues`, `addSalePayment`, `recordSale` | `everyMonths` non validé (NaN lève une erreur), objet vide accepté, montants sans contrôle d'entier. | Compléter les contrôles. | S |
| 12 | Majeure | `store.ts` `recordRepayment` | Pas de contrôle d'archivage, pas de `paidAt >= grantedAt`, reçu non monotone par année et au format différent des cotisations. | Générateur de reçu unique. | S |
| 13 | Majeure | `store.ts` `mergeCase` | `!` sur un `find`, statut du cas non contrôlé : une double fusion écrase le snapshot et `undoMerge` restaure un état déjà fusionné. | Refuser un cas déjà fusionné. | S |
| 14 | Majeure | `store.ts` `decideCorrection` | Libellés français utilisés comme clés de champ, `Number(c.to)` peut donner NaN, champ inconnu tracé sans être appliqué. | Union de champs typée et validation. | M |
| 15 | Majeure | `store.ts` `updateMeeting`, `holdMeeting` | `trim` absent, réunion future acceptée comme tenue. | `trim` et contrôle de date. | S |
| 16 | Majeure | `store.ts` `approveDossier` | Pas de contrôle d'archivage ; un second membre peut être créé pour le même producteur ; code producteur non unique par coopérative. | Contrôles et compteur par coopérative. | S |
| 17 | Majeure | `store.ts` `attachMinutesDocument` | Le document d'un procès-verbal validé peut être changé ; l'ancien reste orphelin. | Contrôler le statut du PV, journaliser. | S |
| 18 | Majeure | `mock/cooperative.ts`, `mock/commerce.ts` | `PaymentMethod` défini deux fois (alias `LoanPaymentMethod`) ; deux types `Actor`. | Un seul type partagé. | S |
| 19 | Majeure | `store.ts` (annulations) | Les annulations ne revérifient pas l'archivage ; le test « motif de 3 caractères » est copié 6 fois. | Helper `voidEntity`. | M |
| 20 | Mineure | `exploitation.ts` `cropArea` | Arrondi incohérent entre plans et parcelles. | Même arrondi. | S |
| 21 | Mineure | `store.ts` | 60 `new Date().toISOString()` : pas d'horloge injectable pour les tests. | `now()` remplaçable. | S |
| 22 | Mineure | `plans.ts` `lineIssues` | Textes français en dur dans `lib/`. | Clés de message. | S |
| 23 | Mineure | `store.ts` `restoreSnapshot` | `toLocaleString("fr-FR")` dans le journal : dépend de l'environnement. | Date ISO brute. | S |

## 3. Composants réutilisables (le refactor demandé)

Gain total estimé : 2 000 à 2 800 lignes. Les écrans récents ont été écrits sur un même modèle : les motifs sont copiés presque à l'identique.

| # | Motif | Occurrences | Composant ou hook proposé | Effort | Gain |
|---|---|---|---|---|---|
| 1 | Barre de filtres : pastille « Tout », pastilles d'état, recherche, « Tout afficher » | 47 `FilterPill` dans 20 fichiers, 25 recherches copiées | `FilterBar` + `SearchBox` + `StatusPills` | M | 450 à 600 |
| 2 | Export CSV + trace au journal + message | 16 `downloadCsv` dans 14 fichiers, la règle « une seule coopérative donc on la passe » copiée 6 fois | hook `useAuditedCsvExport` | S | 250 à 300 |
| 3 | Dialogue d'annulation avec motif | 6 copies (cotisations, remboursements, ventes, charges, sorties de stock, réunions) + 4 variantes | `ReasonDialog` + `useTouched` partagé | M | 250 à 300 |
| 4 | Panneau latéral d'une fiche (en-tête, état, montant, détail, historique) | 6 panneaux quasi identiques | `EntitySheet` + `DetailList` + `HistoryList` | M à L | 250 à 400 |
| 5 | Ligne de tableau cliquable (clavier, annulée barrée) | 16 fichiers | `ClickableRow` (puis éventuellement `DataTable`) | S | 100 |
| 6 | KPI avec unité FCFA qui passe à la ligne | 5 `kpiMoney`, 75 `KpiTile` | `KpiGrid` + `Money` | S à M | 150 à 200 |
| 7 | Contexte d'écran : `?scoop=`, coopérative en vue, campagne par défaut, composant `…Route` | 28 `validateSearch`, 38 `…Route`, 4 copies du choix de campagne | `scoopSearch`, `useScopeContext`, `useCampaignChoice`, `CampaignSelect` | M | 200 à 250 |
| 8 | Format d'argent et de date | 234 `nf.format`, 9 `day()`, 7 `money()`, 27 clés en doublon | hook `useFormat` + clé unique | S | 100 à 150 |
| 9 | État vide « filtré » ou « vide » | 51 `EmptyState` | `ListEmpty` | S | 100 |
| 10 | Introuvable ou hors périmètre | 6 fiches | `RecordGate` | S | 60 |
| 11 | Choix d'un producteur ou d'un membre avec recherche | 4 dialogues, `fullName` redéfini 4 fois | `ProducerCombobox` + `fullName` partagé | M | 150 à 200 |
| 12 | Barres horizontales HTML | 5 | `BarList` | S | 60 |
| 13 | Tables d'énumération et tons de pastille | 42 `Record<…, MessageKey>`, 14 tables de tons | `StatusPill` générique | M | 80 |

**Incohérences d'interface que ces composants règlent** : le motif d'annulation valide tantôt à la première frappe, tantôt à l'envoi ; le bouton « Valider » est désactivé ou non selon l'écran ; « Retour » contre « Garder » ; l'unité des KPI en deux tailles ; dates en mois court ou long, avec ou sans fuseau fixé (risque de décalage d'un jour) ; états vides sans bouton de remise à zéro dans les écrans anciens ; deux mécanismes pour le filtre de coopérative.

**Composants existants sous-utilisés ou en doublon** : `SectionNav` (2 usages alors que 6 écrans ont des onglets maison), `StatToggle` (2), `Segmented` qui double `FilterPill`, `Empty` et `EmptyState` à fusionner, `Field` et les `Row` locales à fusionner.

**Fichiers de plus de 500 lignes** : `cotisations.tsx` 1153, `CoopFicheTabs.tsx` 950, `producteurs.$id.tsx` 897, `equipe.tsx` 894, `dossiers.$id.tsx` 886, `carte.tsx` 883, `imports.tsx` 853, `referentiels.tsx` 692, `exploitation.tsx` 623, `comptes.tsx` 607, `StockDialogs.tsx` 576, `organisations.$id.tsx` 570, `ventes.tsx` 559, `store.ts` plusieurs milliers de lignes. Un écran de 1 100 lignes ne se relit pas : on le coupe en sous-composants après les lots 3 et 4.

**Découpage du store** (API publique `actions.*` inchangée) : d'abord des tests de caractérisation, puis `store/core.ts` (état, abonnement, journal, identifiants), `store/guards.ts` (droit, périmètre, archivage), puis un fichier par domaine, du plus isolé au plus couplé (cotisations, réunions, campagnes et agronomie, stocks, crédits, ventes, charges, plans, rapports, coopératives, dossiers, producteurs et qualité), enfin `store/snapshot.ts` avec une liste unique de clés d'état.

**Helpers internes du store** : `guard` (45 `actor()`, 33 vérifications de droit, 31 de périmètre, 11 d'archivage), `findScoped` (30 recherches + contrôle de périmètre), `voidEntity` (6 annulations), `updateById` (58 `map`), `withHistory` (31 historiques, ordre incohérent), `makeReceipt` (2), `newId` (23 appels), `by()` (10, avec deux valeurs par défaut différentes), `isDay` (3 copies).

## 4. Performance

| # | Gravité | Constat | Action | Effort |
|---|---|---|---|---|
| 1 | Critique | Le jeu de données (2,3 Mo de JSON : 1 317 producteurs, 1 534 parcelles) est dans le bundle partagé de 2,5 Mo chargé par tous les écrans, y compris la connexion. | Le charger à la demande (initialisation asynchrone du store) puis séparer les dictionnaires. Ne concerne que le prototype : le serveur réel remplacera ce jeu. | L |
| 2 | Majeure | `wo.ts` recalcule le texte repère des 3 364 clés au chargement, même en français. | Calcul paresseux au premier basculement. | M |
| 3 | Majeure | Le tableau de bord embarque recharts en statique. | `lazy()` sur les graphiques. | S |
| 4 | Majeure | Tableau de bord : 16 `filter` et `reduce` sur 1 317 producteurs et 1 534 parcelles à chaque rendu. | `useMemo`. | S |
| 5 | Majeure | `producteurs.index.tsx` navigue à chaque frappe de la recherche. | Saisie locale différée avant d'écrire l'adresse. | S |
| 6 | Mineure | `JSON.stringify` à chaque rendu pour détecter une modification (`plans.$id`, `calendriers.$id`). | `useMemo`. | S |

## 5. Traduction

| # | Gravité | Constat | Action | Effort |
|---|---|---|---|---|
| 1 | Majeure | 45 titres d'onglet (`head()`) en dur, que l'inventaire ne voit pas. | Une clé par route. | M |
| 2 | Majeure | Le journal d'audit s'écrit en français à l'écriture (91 appels), décision déjà prise par l'utilisateur. | Documenter cette décision au chapitre 6 ; ne rien changer. | S |
| 3 | Majeure | Cultures et types d'alerte affichés bruts : aucune table `crop.*` ni `alert.type.*` (34 occurrences). | Tables lues par `tEnum`. | M |
| 4 | Majeure | `fmtDate`, `fmtDateTime`, `nf`, `nf1` forcent `fr-FR` (368 usages) alors que `i18n/format.ts` suit `fr-SN` (21 usages). | Un seul jeu de formats, qui suit la langue. | M |
| 5 | Majeure | Textes visibles produits dans `lib/` (masquage CNI et téléphone, « ans », âge non renseigné, import). | Clés avec `tNow`. | M |
| 6 | Mineure | 45 pluriels faits à la main « (s) ». | Paires `.un` / `.autre`. | S |
| 7 | Mineure | Concaténations de libellés qui figent l'ordre des mots. | Clés avec paramètres. | S |
| 8 | Mineure | 55 clés mortes (dont 26 de l'ancien écran « Ma coopérative »). | Les supprimer. | S |
| 9 | Mineure | 341 libellés identiques portés par 768 clés (« Annuler » 17 fois) : autant d'entrées à relire en wolof. | Clés `common.*` pour les libellés génériques. | M |

## 6. Accessibilité

| # | Gravité | Constat | Action | Effort |
|---|---|---|---|---|
| 1 | Majeure | 22 écrans sans contrôle axe (tableau de bord, carte, fiches, qualité, rapports, imports, référentiels, utilisateurs, comptes, appareils, connexion…) ; le test ne vérifie qu'un rôle, en français, sans dialogue ouvert. | Compléter `SCREENS`, ajouter un écran en wolof et un panneau ouvert. | S |
| 2 | Majeure | 6 lignes de tableau cliquables sans clavier (`appareils`, `exploitation`, `organisations.index`, `organisations.$id`, `CoopFicheTabs`, `campagnes`). | `tabIndex` et `onKeyDown`, ou lien dans la première cellule (réglé par `ClickableRow`). | S |
| 3 | Mineure | 12 tables : Entrée sur un bouton interne ouvre aussi la ligne ; Espace non géré. | Filtrer sur la cible (réglé par `ClickableRow`). | S |
| 4 | Mineure | 19 colonnes d'action sans en-tête accessible. | Texte réservé aux lecteurs d'écran. | S |
| 5 | Mineure | Boutons natifs `text-xs` sans taille tactile minimale (8 endroits). | `Button` ou `min-h` tactile. | S |

## 7. Qualité générale

| # | Gravité | Constat | Action | Effort |
|---|---|---|---|---|
| 1 | Majeure | 27 fichiers shadcn jamais importés (alert, carousel, chart, drawer, sidebar…) et 18 dépendances qui ne servent qu'à eux. | Supprimer les fichiers puis les dépendances (surface d'attaque, installation). | S |
| 2 | Mineure | Dépendances sans usage direct : `@tanstack/router-plugin`, `eslint-config-prettier` (à vérifier). | Retirer après vérification. | S |
| 3 | Mineure | 12 `eslint-disable` sur `exhaustive-deps` sans justification. | Justifier ou corriger. | M |
| 4 | Mineure | Code mort : `planLabel`, `SALE_PAYMENTS`, `CAMPAIGN_STATUSES`, `isCsv`, `describeError`, `WEEK_START` ; `modules.ts` utilisé seulement par des tests ; de nombreux exports inutiles. | Supprimer ou dé-exporter. | S |
| 5 | Mineure | Actions du store sans test : `addUser`, `toggleUser`, `classifyCase`, liens de comptes, `removeDocument`, `resendInvitation`, `revealCni`, `reviewPlot`, `setYouthMaxAge`, `submitCorrection`, `updateAlerts`, `updateMember`, `updateProducer`… ; aucun test de restauration partielle. | Tests de caractérisation avant le découpage du store. | M |
| 6 | Mineure | Tests qui dépendent de la date du jour ou de l'ordre des données de démonstration. | Horloge figée. | M |

## 8. Plan de refactor en lots

Chaque lot se termine par `pnpm run ci` et les parcours ciblés verts.

| Lot | Contenu | Responsable | Risque |
|---|---|---|---|
| 0 | Bugs et risques de données (section 2, lignes 1, 3 à 17, 20) | A | Faible : chaque correction a son test |
| 1 | `guard()` et contrôle de droit sur les actions historiques (ligne 2) ; applique aussi les constats de `docs/revue/B.md` | A et B | Moyen : les e2e de droits sont le filet |
| 2 | Nettoyage : shadcn mort et dépendances, clés mortes, code mort, exports inutiles | A | Très faible |
| 3 | Composants : `useFormat`, `useAuditedCsvExport`, `ReasonDialog` + `useTouched`, `KpiGrid` + `Money` | A | Faible à moyen : libellés cherchés par les e2e |
| 4 | Composants : `FilterBar`, `ListEmpty`, contexte d'écran, `ClickableRow` (règle aussi l'accessibilité des lignes) | A | Moyen : touche beaucoup d'écrans, écran par écran |
| 5 | Composants : `EntitySheet`, `ProducerCombobox`, `BarList`, `RecordGate`, `StatusPill` | A | Moyen |
| 6 | Performance : recharts paresseux, `useMemo` du tableau de bord, recherche locale, `wo` paresseux | A | Faible |
| 7 | Traduction : titres d'onglet, tables des cultures et des types d'alerte, formats unifiés, pluriels, `common.*` | A et B | Moyen : texte repère à revérifier à 360 px |
| 8 | Accessibilité : étendre le contrôle axe, en-têtes des colonnes d'action, cibles tactiles | B | Faible |
| 9 | Découpage des gros fichiers (cotisations, fiche coopérative, équipe, dossiers, producteurs, carte, imports) | A | Moyen |
| 10 | Découpage du store en modules par domaine | A | Élevé : à faire en dernier, avec les tests de caractérisation |
| 11 | Jeu de données chargé à la demande | A | Moyen : initialisation asynchrone du store |

## 9. Décisions pour l'utilisateur

- **Journal d'audit en français** : confirmé par l'utilisateur. Le constat 2 de la section 5 se traite en le documentant, pas en le changeant.
- **Jeu de données dans le bundle** : acceptable pour un prototype de démonstration ; à traiter si les temps de chargement gênent les démonstrations, sinon il disparaît avec le serveur réel.

## 10. Revue de l'axe B

Les constats de sécurité, d'authentification, d'entrées non fiables, de menu, de livraison et de tests sont dans `docs/revue/B.md`. Les points à traiter avant tout refactor : session falsifiable par le stockage du navigateur, mode démonstration actif par défaut, infobulles de la carte non échappées (stockées, via l'import), 60 actions du store sur 97 sans contrôle de droit (recensement en annexe de `B.md`), sélecteurs de périmètre sans droit de lecture, test qui casse le 1er janvier 2027, annulation des contrôles de la branche principale. Répartition : B traite la session, les infobulles, la configuration, les sélecteurs et les tests ; A traite le store (lot 0 bugs, lot 1 garde commune de droit).

## 11. Avancement des lots (A, 26 octobre 2026)

| Lot | État | Résultat |
|---|---|---|
| 0 (store) | Fait | 20 bugs corrigés, 18 tests (`src/test/lot0-store.test.ts`) ; session relue dans les comptes, sauvegarde validée |
| 1 (garde de droit) | Fait par B | 59 actions gardées, test de refus par rôle et par action |
| 3 (composants : format, export, annulation, tuiles) | Fait | `useFormat`, `useTouched`, `useAuditedCsvExport`, `KpiGrid`, `KpiCell`, `Money`, `ReasonDialog` adoptés par 7 écrans et leurs panneaux : 512 lignes supprimées, 390 ajoutées (dont les nouveaux composants) ; rendu inchangé sauf le jour sur deux chiffres dans la liste des crédits et le comportement commun de l'annulation (bouton grisé tant que le motif est trop court) |
| 4 (barre de filtres, états vides, ligne cliquable, contexte d'écran) | À faire | Gain estimé le plus fort, touche le plus d'écrans : à faire écran par écran |
| 5 (panneau de fiche, choix de producteur, barres, introuvable, pastille d'état) | À faire | |
| 2, 6, 7, 8, 9, 10, 11 | À faire | Nettoyage, performance, traduction, accessibilité, découpage, jeu de données |

**Constat honnête sur le gain** : le lot 3 supprime plus qu'il n'ajoute, mais l'économie nette n'est que d'environ 120 lignes, parce que les composants communs sont nouveaux. Le vrai gain vient de la cohérence (un seul comportement d'annulation, un seul format d'argent) et des lots 4 et 5, qui touchent plus d'écrans. Les écrans les plus anciens (équipe, dossiers, producteurs, carte, imports) n'ont pas encore été touchés.
