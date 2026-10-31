# Module 1 et suivi Trello — guide pour Moha

Document d’explication (31 octobre 2026). Pas besoin de jargon pour s’en servir.

## En une phrase

On a ouvert le dépôt GitHub officiel **mbay-diaay** avec **uniquement le Module 1 (Administratif — action « Gérer »)**, et on a préparé un board Trello prêt à coller à la main.

---

## 1. Qu’est-ce que le Module 1 ?

Le Module 1 couvre la **vie administrative** de la coopérative : les personnes et l’organisation, pas encore le commerce ni la carte.

### Dedans (ce dépôt)

| Zone | Écrans / sujets |
|---|---|
| Personnes | Ma coopérative, coopératives (vue consolidée), équipe / membres, producteurs, dossiers producteurs, organisations / GIE |
| Vie de la coopérative | Cotisations, réunions / PV, documents |
| Pilotage | Tableau de bord, rapports |
| Socle nécessaire | Connexion, permissions, i18n FR/WO, qualité des données, utilisateurs, imports, journal d’audit, référentiels |

### Hors périmètre (volontairement absents du menu)

| Module | Contenu reporté |
|---|---|
| **M2 Commercial** | Stocks, ventes, crédits |
| **M3 Exploitation** | Charges, comptes / marges |
| **M4 Agronomique** | Plans, campagnes, calendriers, suivi des cultures |
| **M5 SIG** | Carte interactive, fiche parcelle dédiée |

Sur la page d’accueil des modules, M2–M5 apparaissent comme **« à venir »**. Le proto riche (tous les modules) reste ailleurs pour référence.

---

## 2. Ce qui a été fait sur le repo GitHub

| | |
|---|---|
| **URL** | https://github.com/mbay-diaay/mbay-diaay |
| **Branche** | `main` |
| **Origine** | Proto local `/Users/moha/Dev/Mbay Diaay` (souvent nommé mbaydiaay-proto), borné au M1 |
| **État avant** | Dépôt **vide** — intégration réelle possible sans conflit |

Travail effectué :

1. Base saine (TanStack Start, Vite, Vercel/Nitro, tokens CSS, permissions, mock store).
2. Routes et menu **sans** M2–M5 ; liens carte / plans retirés des fiches producteur et organisation.
3. Tests unitaires verts ; e2e M1 adaptés (hors parcours carte / commerce).
4. Documentation de suivi Trello + ce guide.

**Proto distinct (référence tous modules)** : dépôt privé `https://github.com/MohaPeth/mbaydiaay-proto.git` et/ou dossier local `mbaydiaay-proto` / `Mbay Diaay`.

---

## 3. Comment utiliser le board Trello

Il n’y a **pas** d’API Trello branchée dans cette session (aucun jeton `TRELLO_*` trouvé en local). Tout est **manuel**, en 10 minutes : voir [`docs/suivi-trello/BOARD.md`](suivi-trello/BOARD.md).

Fichiers :

- [`docs/suivi-trello/BOARD.md`](suivi-trello/BOARD.md) — colonnes, labels, mode d’emploi
- [`docs/suivi-trello/cartes.csv`](suivi-trello/cartes.csv) — import tableur / collage
- [`docs/suivi-trello/cartes.json`](suivi-trello/cartes.json) — même contenu, structure claire

---

## 4. Vision d’avancement

| Statut | Contenu |
|---|---|
| **Fait (M1)** | Membres / équipe, producteurs, dossiers, organisations, cotisations, réunions, documents, tableau de bord admin, qualité, auth démo, droits, i18n mécanisme, CI locale |
| **En cours / à valider** | Décisions client (cotisations INF 30, rôles Scopla D4–D17), charte graphique, hébergeur Vercel en prod, Toolbar Feedback désactivée |
| **Reste M1** | Création producteur directe, filtre org annuaire, PDF exports, édition types d’org / matrice rôles depuis l’UI, bilingue wolof relu |
| **Hors M1** | M2–M5 (dans le proto), backend réel, SMS, Kobo photos, paiements mobiles |

---

## 5. Prochaines étapes concrètes

1. Vérifier le dépôt GitHub (clone, `pnpm install`, `pnpm dev`, se connecter en démo).
2. Créer le board Trello à partir de `docs/suivi-trello/` (10 min).
3. Recette Module 1 avec un gestionnaire SCOOP (parcours Personnes + Vie coopérative).
4. Brancher Vercel sur `mbay-diaay/mbay-diaay` — pas à pas : [`docs/HEBERGEMENT_VERCEL_ORG.md`](HEBERGEMENT_VERCEL_ORG.md) (Node **22.x**, pas d’override Output `dist`).
5. Quand M2 sera décidé : réintégrer depuis le proto **par lot**, jamais en dump massif.

---

## 6. Liens utiles

| Ressource | Lien |
|---|---|
| Repo Module 1 | https://github.com/mbay-diaay/mbay-diaay |
| Proto (réf.) | https://github.com/MohaPeth/mbaydiaay-proto |
| Vercel ↔ org GitHub | [`docs/HEBERGEMENT_VERCEL_ORG.md`](HEBERGEMENT_VERCEL_ORG.md) |
| État projet | [`docs/ETAT_DU_PROJET.md`](ETAT_DU_PROJET.md) |
| Valeur livrée | [`docs/VALEUR_LIVREE.md`](VALEUR_LIVREE.md) |
| Guide dev | [`docs/DEVELOPPEMENT.md`](DEVELOPPEMENT.md) |
| Règles agents | [`AGENTS.md`](../AGENTS.md) |
| Suivi Trello | [`docs/suivi-trello/BOARD.md`](suivi-trello/BOARD.md) |
