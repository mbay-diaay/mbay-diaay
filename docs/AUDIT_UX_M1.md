# Audit UX — Module 1 (`mbay-diaay`)

Date : 31 octobre 2026 · Mode : **Operate** (outil de travail, pas marketing).

## Synthèse (1 minute)

Le vocabulaire métier (SCOOP, cotisations, recensé…) est bon. La **composition** reste trop « admin SaaS » : trop d’options visibles en même temps. Score heuristique ~**25/40**. Priorité : **simplifier** dashboard, fiche producteur, cotisations, puis nav et réunions.

## Déjà livré sur ce déploiement

- Bloc **« Les cinq modules »** retiré du tableau de bord (M2–M5 hors périmètre de ce repo).

## Forces

1. Périmètre M1 clair (menu sans M2–M5 cliquables).
2. Producteurs : recherche + un bouton **Filtres** (Sheet) — bon modèle à généraliser.
3. Guide cotisations (états avec icônes) — aide utile pour un gestionnaire.

## Problèmes prioritaires (simplicité)

| Prio | Problème | Piste |
|------|----------|--------|
| **P1** | Dashboard : 6 KPI + graphiques d’égale importance → on *observe*, on ne *agit* pas | 2–3 cartes « à traiter » (qualité, dossiers, cotisations en retard) au-dessus |
| **P1** | Fiche producteur : KPI + passerelles + 6–7 onglets = 3 plans concurrents | ≤4 onglets regroupés ; passerelles dans le menu Actions |
| **P1** | Cotisations : guide + 4 KPI + règle + pills + table = trop de scroll avant l’encaissement | Guide repliable ; 2 KPI max ; pills allégées |
| **P2** | Nav « Personnes » : jusqu’à 5 entrées ouvertes | 3 primaires ; le reste replié |
| **P2** | Réunions : 5 pills + vue + recherche | Defaults utiles + Sheet Filtres (comme Producteurs) |

## Preuves techniques (extrait)

- Header scope **tronqué** (`AppShell` truncate) sur écrans moyens.
- **Double** montage `GlobalFilters` (desktop + mobile) dans le DOM.
- Labels graphiques SCOOP **coupés** (Recharts).
- Chrome sticky mobile ~**138 px** sur `/producteurs` avant le contenu.
- Login : contraste faible sur textes en opacity ; leading 1.1 sur le titre auth.

## Critères de succès UX

Un gestionnaire SCOOP, le matin, doit répondre en **moins de 2 clics** à : « Qui vérifier ? » / « Qui relancer ? » / « Quelle AG préparer ? » — sans lire six graphiques d’abord.

## Liens

- [`HEBERGEMENT_VERCEL_ORG.md`](HEBERGEMENT_VERCEL_ORG.md)
- [`MISSION_MODULE1_ET_TRELLO.md`](MISSION_MODULE1_ET_TRELLO.md)
