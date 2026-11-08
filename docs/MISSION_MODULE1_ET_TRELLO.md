# Module 1 et suivi Trello — guide pour Moha

Document d’explication (mis à jour **8 novembre 2026**). Pas besoin de jargon pour s’en servir.

## En une phrase

Le dépôt GitHub officiel **mbay-diaay** porte le **Module 1 (Administratif)** : front **Angular** en production sur **Vercel** (`www.mbaydiaay.com`), API NestJS sur VPS (`api.mbaydiaay.com`), pack de recette prêt pour les testeurs.

---

## 1. Qu’est-ce que le Module 1 ?

Le Module 1 couvre la **vie administrative** de la coopérative : les personnes et l’organisation, pas encore le commerce ni la carte.

### Dedans (ce dépôt)

| Zone | Écrans / sujets |
|---|---|
| Personnes | Coopératives (vue consolidée + fiche), équipe / membres, producteurs, dossiers producteurs, organisations / GIE |
| Vie de la coopérative | Cotisations, réunions / PV, documents |
| Pilotage | Tableau de bord, rapports (parcours 3 étapes) |
| Socle nécessaire | Connexion OTP, permissions, i18n FR/WO, qualité des données, utilisateurs, imports, journal d’audit, référentiels, appareils |

### Hors périmètre (volontairement absents du menu)

| Module | Contenu reporté |
|---|---|
| **M2 Commercial** | Stocks, ventes, crédits |
| **M3 Exploitation** | Charges, comptes / marges |
| **M4 Agronomique** | Plans, campagnes, calendriers, suivi des cultures |
| **M5 SIG** | Carte interactive, fiche parcelle dédiée |

Sur la page d’accueil des modules, M2–M5 apparaissent comme **« à venir »**. L’archive React `src/` reste locale pour rollback.

---

## 2. Ce qui a été fait sur le repo GitHub

| | |
|---|---|
| **URL** | https://github.com/mbay-diaay/mbay-diaay |
| **Branche** | `main` |
| **Front prod** | Analog Angular dans `web-angular/` (Root Directory Vercel) · https://www.mbaydiaay.com |
| **API** | [`mbay-diaay/mbay-diaay-api`](https://github.com/mbay-diaay/mbay-diaay-api) · `api.mbaydiaay.com` |

Travail effectué (jalons) :

1. Base M1 (permissions, mock store, i18n, UX Operate).
2. Migration Angular Analog + cutover Vercel (Node 22.x, Nitro `vercel`).
3. Auth API (sign-in + OTP stub `000000`) + seed multi-rôles.
4. Polish recette : Rapports bout-en-bout, shell prod, Appareils, Toolbar Feedback OFF.
5. Pack testeurs : [`docs/RECETTE_MODULE1.md`](RECETTE_MODULE1.md).

---

## 3. Comment utiliser le board Trello

Il n’y a **pas** d’API Trello branchée (aucun jeton `TRELLO_*` local). Tout est **manuel** : voir [`docs/suivi-trello/BOARD.md`](suivi-trello/BOARD.md).

Fichiers : `BOARD.md`, `cartes.csv`, `cartes.json` (pack du 31/10/2026 — à compléter avec les cartes Angular / API / recette si besoin).

---

## 4. Vision d’avancement

| Statut | Contenu |
|---|---|
| **Fait (M1 UI)** | Personnes, vie coopérative, rapports, admin, shell prod, i18n, droits |
| **Fait (hébergement)** | Front Vercel Angular · API VPS TLS · domaines `www` / `api` |
| **Fait (recette pack)** | `RECETTE_MODULE1.md` + `COMPTES_RECETTE.md` · M1-7 doc |
| **En cours / à valider** | Signature UAT gestionnaire SCOOP · décisions client (INF 30, D4–D17) · remap métier API |
| **Reste M1 (non bloquant recette)** | PDF exports, bilingue wolof relu, Assistance D17 |
| **Hors M1** | M2–M5, SMS, Kobo photos, paiements mobiles |

---

## 5. Prochaines étapes concrètes

1. Envoyer le mail testeurs (comptes + OTP) — voir `COMPTES_RECETTE.md`.
2. Faire cocher [`RECETTE_MODULE1.md`](RECETTE_MODULE1.md) avec un gestionnaire SCOOP.
3. Prioriser le remap API métier (producteurs, dossiers, cotisations…) hors stubs.
4. Quand M2 sera décidé : réintégrer depuis le proto **par lot**.

---

## 6. Liens utiles

| Ressource | Lien |
|---|---|
| Recette M1 | [`docs/RECETTE_MODULE1.md`](RECETTE_MODULE1.md) |
| Comptes | [API `COMPTES_RECETTE.md`](https://github.com/mbay-diaay/mbay-diaay-api/blob/main/docs/COMPTES_RECETTE.md) |
| État projet | [`docs/ETAT_DU_PROJET.md`](ETAT_DU_PROJET.md) |
| Branchement API | [`docs/BRANCHEMENT_API.md`](BRANCHEMENT_API.md) |
| Audit UX M1 | [`docs/AUDIT_UX_M1.md`](AUDIT_UX_M1.md) |
| Hébergement Vercel | [`docs/HEBERGEMENT_VERCEL_ORG.md`](HEBERGEMENT_VERCEL_ORG.md) |
| Suivi Trello | [`docs/suivi-trello/BOARD.md`](suivi-trello/BOARD.md) |
