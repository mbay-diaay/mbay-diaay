# Audit UX — Module 1 (`mbay-diaay`)

Date : 31 octobre 2026 · Mode : **Operate** (outil de travail, pas marketing).

## Synthèse (1 minute)

Le vocabulaire métier (SCOOP, cotisations, recensé…) est bon. La **composition** a été simplifiée (bandeau « À traiter », cotisations list-first, filtres Sheet). Score heuristique cible après M1 : ~**32/40**.

## Déjà livré (fiabilité + UX M1)

### Vague 0 — Confiance (A-01…A-03) — *sur `main` (`866b723`)*

| ID | Fait |
|----|------|
| **A-01** | `src/lib/membership.ts` : `activeMembers` / `membershipCounts` / `producerStatusCounts` + tests. Libellés **Adhérents actifs** vs **Fiches recensées** (dashboard, coop, équipe, cotisations, rapports). |
| **A-02** | `cni.read` retiré du **représentant** (admin + gestionnaire). `revealCni(p, motif)` obligatoire + FormDialog fiche producteur. Note `docs/CNI_LECTURE.md` + matrice ACTEURS. |
| **A-03** | File alertes : total = filtré ; recherche ; tri urgence/ancienneté ; pagination 500 + « Charger la suite ». |

### Vague 1 — Operate (non commitée — à vérifier)

| Sujet | Fait |
|-------|------|
| Design system | `Pill` : pas de point si `icon` ; légendes via `StatusMark`. |
| Filtres | Recherche + bouton **Filtres** (Sheet) : cotisations, documents, réunions (comme Producteurs). |
| Dashboard | Bandeau **À traiter** ≤ 3 cartes (dossiers, alertes, cotisations à relancer) ; KPI secondaires sans warning si 0. |
| Cotisations | Liste / encaissement d’abord ; guide + **Règles** en Sheet ; 2 KPI ; retard / jamais payé en tête. |

### Vague 2 — Parcours (non commitée — à vérifier)

| Sujet | Fait |
|-------|------|
| Réunions + PV | Checklist Préparer → Présences → PV brouillon → Validé → signé ; défauts « À venir » / Sheet filtres. |
| Documents | Versions (en vigueur / remplacé) + alerte nom déjà utilisé à l’ajout. |
| Audit | Tri date décroissante par défaut + bouton d’inversion. |
| Corrections | Warning si motif ≠ champs ; fixtures motifs cohérents. |
| Dossiers | Plus anciens d’abord ; colonne ancienneté ; action Relancer (mock). |

### Vague 3 — Polish (non commitée — à vérifier)

| Sujet | Fait |
|-------|------|
| Comptes | Bloc **identité compte** dominant ; confirmation liaison en **FormDialog**. |
| Référentiels | Phrase « à quoi ça sert » (globale + par section). |

## Forces

1. Périmètre M1 clair (menu sans M2–M5 cliquables).
2. Producteurs : recherche + Filtres Sheet — modèle généralisé.
3. Compteurs d’adhésion unifiés via `membership.ts`.

## Reste / hors scope M1

- Backend réel, SMS, Wave.
- Refonte charte complète.
- Mesure utilisateur formelle.
- Items secondaires smoke (troncature header, double GlobalFilters, contraste login) : polish léger si encore visibles.

## Critères de succès UX

Un gestionnaire SCOOP, le matin, doit répondre en **moins de 2 clics** à : « Qui vérifier ? » / « Qui relancer ? » / « Quelle AG préparer ? » — via le bandeau **À traiter**.

## Liens

- [`CNI_LECTURE.md`](CNI_LECTURE.md)
- [`HEBERGEMENT_VERCEL_ORG.md`](HEBERGEMENT_VERCEL_ORG.md)
- [`MISSION_MODULE1_ET_TRELLO.md`](MISSION_MODULE1_ET_TRELLO.md)
