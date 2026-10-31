# Audit UX — Module 1 (`mbay-diaay`)

Date : 31 octobre 2026 · Mode : **Operate** (outil de travail, pas marketing).  
Livré sur `main` : `866b723` … `a158994`.

## Synthèse (1 minute)

Le vocabulaire métier (SCOOP, cotisations, recensé…) est bon. La **composition** a été simplifiée (bandeau « À traiter », cotisations list-first, filtres Sheet). Score heuristique cible après M1 : ~**32/40**.

## Déjà livré (fiabilité + UX M1)

### Vague 0 — Confiance (A-01…A-03) — `866b723`

| ID | Fait |
|----|------|
| **A-01** | `src/lib/membership.ts` : `activeMembers` / `membershipCounts` / `producerStatusCounts` + tests. Libellés **Adhérents actifs** vs **Fiches recensées** (dashboard, coop, équipe, cotisations, rapports). |
| **A-02** | `cni.read` retiré du **représentant** (admin + gestionnaire). `revealCni(p, motif)` obligatoire + FormDialog fiche producteur. Note `docs/CNI_LECTURE.md`. |
| **A-03** | File alertes : total = filtré ; recherche ; tri urgence/ancienneté ; pagination 500 + « Charger la suite ». |

### Vague 1 — Operate — `fdc83fb`

| Sujet | Fait |
|-------|------|
| Design system | `Pill` : pas de point si `icon` ; légendes via `StatusMark`. |
| Filtres | Recherche + bouton **Filtres** (Sheet) : cotisations, documents, réunions (comme Producteurs). |
| Dashboard | Bandeau **À traiter** ≤ 3 cartes (dossiers, alertes, cotisations à relancer) ; KPI secondaires sans warning si 0. |
| Cotisations | Liste / encaissement d’abord ; guide + **Règles** en Sheet ; 2 KPI ; retard / jamais payé en tête. |

### Vague 2 — Parcours — `0bbff22`

| Sujet | Fait |
|-------|------|
| Réunions + PV | Checklist Préparer → Présences → PV brouillon → Validé → signé ; filtres Sheet. |
| Documents | Versions (en vigueur / remplacé) + alerte nom déjà utilisé à l’ajout. |
| Audit | Tri date décroissante par défaut + bouton d’inversion. |
| Corrections | Warning si motif ≠ champs ; fixtures motifs cohérents. |
| Dossiers | Plus anciens d’abord ; colonne ancienneté ; action Relancer (mock). |

### Vague 3 — Polish — `6017bb4` + `a158994`

| Sujet | Fait |
|-------|------|
| Comptes | Bloc **identité compte** dominant ; confirmation liaison en **FormDialog**. |
| Référentiels | Textes courts « à quoi ça sert » ; accordéon une section à la fois. |
| Réunions | Filtre liste par défaut **toutes** ; checklist fiche en étapes. |
| Matrice rôles | Cases Oui/Non contrastées ; placeholders formulaires plus lisibles. |
| FilterPill | Alignement icône / libellé / compteur. |

## Forces

1. Périmètre M1 clair (menu sans M2–M5 cliquables).
2. Producteurs : recherche + Filtres Sheet — modèle généralisé.
3. Compteurs d’adhésion unifiés via `membership.ts`.

## Reste / hors scope M1

- Backend NestJS + Docker sur VPS (`api.mbaydiaay.com`) — **prochain plan**.
- SMS, Wave, refonte charte complète, mesure utilisateur formelle.
- Items secondaires smoke (troncature header, double GlobalFilters, contraste login) si encore visibles.

## Critères de succès UX

Un gestionnaire SCOOP, le matin, doit répondre en **moins de 2 clics** à : « Qui vérifier ? » / « Qui relancer ? » / « Quelle AG préparer ? » — via le bandeau **À traiter**.

## Liens

- [`CNI_LECTURE.md`](CNI_LECTURE.md)
- [`HEBERGEMENT_VERCEL_ORG.md`](HEBERGEMENT_VERCEL_ORG.md) (dont §8 Domaines / `api.mbaydiaay.com`)
- [`MISSION_MODULE1_ET_TRELLO.md`](MISSION_MODULE1_ET_TRELLO.md)
