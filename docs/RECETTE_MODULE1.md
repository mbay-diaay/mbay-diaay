# Recette Module 1 — Administratif

Date : 8 novembre 2026 · Statut : **prêt pour recette testeurs** (signature client externe).

Front production : Angular Analog (`web-angular/`) sur Vercel · API : NestJS sur VPS (`api.mbaydiaay.com`).

Comptes détaillés : [`mbay-diaay-api` → `docs/COMPTES_RECETTE.md`](https://github.com/mbay-diaay/mbay-diaay-api/blob/main/docs/COMPTES_RECETTE.md).

---

## Accès

| | |
|---|---|
| Front | https://www.mbaydiaay.com |
| API | https://api.mbaydiaay.com/v1 |
| Mot de passe (tous) | `Demonstration2026` |
| OTP (tous) | `000000` |
| Compte principal | `aissatou.ndiaye@cradesc.example` (admin CRADESC) |
| Compte SCOOP | `babacar.fall@scoop-kms.example` (gestionnaire) |

Pas de liste de comptes cliquable ni de bascule de rôle en production. Se déconnecter pour changer de profil.

---

## Checklist visuelle (bureau + 360 px)

Cocher à chaque écran : pas de débordement horizontal · contrastes lisibles · actions principales visibles · textes via i18n (pas de clé brute).

| # | Parcours | OK |
|---|---|---|
| 1 | Connexion e-mail → mot de passe → OTP → tableau de bord | [ ] |
| 2 | Menu compte : déconnexion seule (skeleton pendant la coupure) | [ ] |
| 3 | Sidebar : sections repliables · partenaires en pied | [ ] |
| 4 | Recherche universelle (palette) ouvre une cible du Module 1 | [ ] |
| 5 | Coopératives → fiche à onglets | [ ] |
| 6 | Équipe / membres | [ ] |
| 7 | Producteurs → fiche | [ ] |
| 8 | Dossiers producteurs (filtres + bandeau d’étapes) | [ ] |
| 9 | Cotisations (liste / encaissement) | [ ] |
| 10 | Réunions + calendrier + PV | [ ] |
| 11 | Documents coopérative (dépôt / téléchargement) | [ ] |
| 12 | Rapports : périmètre → choix → aperçu → export | [ ] |
| 13 | Utilisateurs & rôles (admin) | [ ] |
| 14 | Appareils (pas de crash à l’ouverture) | [ ] |
| 15 | Journal d’audit | [ ] |

---

## Accessibilité (minimum)

| Contrôle | OK |
|---|---|
| Navigation clavier login + menu principal | [ ] |
| Focus visible sur boutons / liens | [ ] |
| `axe` WCAG A/AA sur les écrans M1 (`e2e/a11y-m1.spec.ts` en local) | [ ] |
| Pas de barre Feedback Vercel (Toolbar désactivée projet) | [ ] |

---

## Preuves automatiques déjà en dépôt

| Preuve | Où |
|---|---|
| Droits / périmètre M1 | tests unitaires + e2e historique (archive React alignée métier) |
| Auth e2e Angular | `e2e/auth.spec.ts` (cible `web-angular`) |
| Accessibilité M1 | `e2e/a11y-m1.spec.ts` |
| Hébergement | `cd web-angular && pnpm check:host` · Node 22.x · `.env.production` |

---

## Hors périmètre de cette recette

- Remap complet Nest ↔ tables CRADESC métier (producteurs, cotisations…) : stubs / store front encore partiels.
- Décisions client D4, D6–D9, D13–D17 et règles de cotisation INF 30.
- Modules M2–M5.
- Validation formelle signée par un gestionnaire SCOOP (cette checklist la prépare).

---

## Fiche module

Voir [`ETAT_DU_PROJET.md`](ETAT_DU_PROJET.md) §4.6 (M1-1…M1-7) et §10.1.
