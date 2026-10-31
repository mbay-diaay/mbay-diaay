# Module 1 et suivi Trello — guide pour Moha

Document d’explication (mis à jour 31 octobre 2026). Pas besoin de jargon pour s’en servir.

## En une phrase

On a ouvert le dépôt GitHub officiel **mbay-diaay** avec **uniquement le Module 1 (Administratif — action « Gérer »)**, un board Trello prêt à coller, le front sur **Vercel**, et le DNS **`api.mbaydiaay.com`** pointé vers le **serveur** pour l’API NestJS (à venir).

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
| **Front** | Vercel (Nitro `preset: "vercel"`, Node 22.x) |
| **API (DNS)** | `api.mbaydiaay.com` → VPS (NestJS + Docker : **prochain plan**) |

Travail effectué :

1. Base saine (TanStack Start, Vite, Vercel/Nitro, tokens CSS, permissions, mock store).
2. Routes et menu **sans** M2–M5 ; liens carte / plans retirés des fiches producteur et organisation.
3. Tests unitaires verts ; e2e M1 adaptés (hors parcours carte / commerce).
4. Documentation de suivi Trello + ce guide.
5. Lot UX M1 (fiabilité compteurs / CNI / alertes + dashboard À traiter, cotisations, réunions, docs, comptes, référentiels) — détail : [`AUDIT_UX_M1.md`](AUDIT_UX_M1.md).

**Proto distinct (référence tous modules)** : dépôt privé `https://github.com/MohaPeth/mbaydiaay-proto.git` et/ou dossier local `mbaydiaay-proto` / `Mbay Diaay`.

---

## 3. Comment utiliser le board Trello

Il n’y a **pas** d’API Trello branchée dans cette session (aucun jeton `TRELLO_*` trouvé en local). Tout est **manuel** : voir [`docs/suivi-trello/BOARD.md`](suivi-trello/BOARD.md).

Fichiers (pack **mis à jour le 31/10/2026** — à renvoyer au secrétaire) :

- [`docs/suivi-trello/BOARD.md`](suivi-trello/BOARD.md) — colonnes, labels, mode d’emploi
- [`docs/suivi-trello/cartes.csv`](suivi-trello/cartes.csv) — import tableur / collage
- [`docs/suivi-trello/cartes.json`](suivi-trello/cartes.json) — même contenu, structure claire

### Message type pour le secrétaire

> Le pack Trello a été **mis à jour** dans le dépôt (`docs/suivi-trello/cartes.csv` + `BOARD.md`, 31/10/2026).  
> Si tu as déjà créé le board avec l’ancien CSV : **n’importe pas tout en double** — ajoute seulement les **nouvelles cartes Terminé** (UX M1, DNS `api.mbaydiaay.com`, Vercel branché) et mets à jour la carte « Backend NestJS + Docker » (Backlog).  
> Colonnes / labels : inchangés (`BOARD.md`).  
> Repo : https://github.com/mbay-diaay/mbay-diaay → dossier `docs/suivi-trello/`.

---

## 4. Vision d’avancement

| Statut | Contenu |
|---|---|
| **Fait (M1)** | Membres / équipe, producteurs, dossiers, organisations, cotisations, réunions, documents, tableau de bord (bandeau À traiter), qualité, auth démo, droits, i18n mécanisme, CI locale, lot UX (compteurs, CNI, alertes, filtres Sheet, etc.) |
| **Fait (hébergement)** | Front Vercel branché sur l’org ; DNS **`api.mbaydiaay.com` → serveur** (API future) |
| **En cours / à valider** | Décisions client (cotisations INF 30, rôles Scopla D4–D17), charte graphique, Toolbar Feedback OFF, recette gestionnaire SCOOP, board Trello saisi par le secrétaire |
| **Reste M1** | Création producteur directe, filtre org annuaire, PDF exports, bilingue wolof relu |
| **Prochain lot (hors code web)** | Dockerisation VPS + NestJS + PostgreSQL/PostGIS derrière `api.mbaydiaay.com` (cadrage §7 / PRD Backend) |
| **Hors M1** | M2–M5 (dans le proto), SMS, Kobo photos, paiements mobiles |

---

## 5. Prochaines étapes concrètes

1. Secrétaire : mettre à jour le board Trello (nouvelles cartes seulement — message §3).
2. Recette Module 1 avec un gestionnaire SCOOP (parcours Personnes + Vie coopérative + bandeau À traiter).
3. Optionnel : brancher `app.` / apex sur Vercel Domains (front) — **pas** `api.`.
4. **Ensuite** : plan Docker + NestJS + doc chapitre C Backend ([`DEVELOPPEMENT.md`](DEVELOPPEMENT.md)) — pas démarré dans ce tour.
5. Quand M2 sera décidé : réintégrer depuis le proto **par lot**, jamais en dump massif.

---

## 6. Liens utiles

| Ressource | Lien |
|---|---|
| Repo Module 1 | https://github.com/mbay-diaay/mbay-diaay |
| Proto (réf.) | https://github.com/MohaPeth/mbaydiaay-proto |
| Vercel ↔ org + domaines | [`docs/HEBERGEMENT_VERCEL_ORG.md`](HEBERGEMENT_VERCEL_ORG.md) |
| Audit UX M1 | [`docs/AUDIT_UX_M1.md`](AUDIT_UX_M1.md) |
| CNI en clair | [`docs/CNI_LECTURE.md`](CNI_LECTURE.md) |
| État projet | [`docs/ETAT_DU_PROJET.md`](ETAT_DU_PROJET.md) |
| Valeur livrée | [`docs/VALEUR_LIVREE.md`](VALEUR_LIVREE.md) |
| Guide dev | [`docs/DEVELOPPEMENT.md`](DEVELOPPEMENT.md) |
| PRD Backend | [`docs/prd/PRD_Backend_API_Mbay_Diaay_v0.1.md`](prd/PRD_Backend_API_Mbay_Diaay_v0.1.md) |
| Règles agents | [`AGENTS.md`](../AGENTS.md) |
| Suivi Trello | [`docs/suivi-trello/BOARD.md`](suivi-trello/BOARD.md) |
