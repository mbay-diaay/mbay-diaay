# L2 — Architecture technique et fonctionnelle · Mbay Diaay

| | |
|---|---|
| **Livrable contractuel** | L2 (fin S3) — Brief §13.1 |
| **Tranche** | **T1** (avec L1) |
| **Version** | 1.0 — 8 novembre 2026 |
| **Statut** | Dossier consolidé à partir des PRD + déploiement réel · **validation client ouverte** |
| **Compléments API** | Dépôt `mbay-diaay-api` : OpenAPI, `docs/DEPLOY.md`, `docs/API_ROUTES_M1.md` |

---

## 1. Objet

Document d’architecture (stack, données, modules, sécurité, hébergement, synchro) alimentant L2 et la tranche T1.

## 2. Architecture cible (vue d’ensemble)

```
[ Mobile Flutter ]────┐
                      ├── HTTPS / JWT ──► [ NestJS API · api.mbaydiaay.com ]
[ Web Analog Angular ]┘                         │
                     Vercel (www.mbaydiaay.com)  ├── PostgreSQL (+ PostGIS cible)
                                                ├── Redis / BullMQ (jobs)
                                                └── MinIO (fichiers)
```

| Couche | Choix | Preuve dépôt |
|---|---|---|
| Web | Analog.js (Angular + Vite + Nitro `preset: vercel`), Node 22.x | `web-angular/` |
| API | NestJS, OpenAPI `/v1` | `mbay-diaay-api` |
| Auth | e-mail + mot de passe + OTP (stub recette `000000`) | `auth/sign-in`, `auth/otp/*` |
| Front prod | Vercel Root `web-angular/` | `.env.production` |
| API prod | VPS + Traefik TLS | `docs/DEPLOY.md` |

## 3. Modules fonctionnels (specs)

| Module | Spec | UI Angular | API métier |
|---|---|---|---|
| M1 Administratif | Note cadrage §5.1 · fiche ETAT §10.1 | **Prod** | Auth + users branchés ; métier partiel / stubs |
| M2 Commercial | §5.2 · D21–D23 | Porté, **gated** | Stubs / à exposer |
| M3 Exploitation | §5.3 · D24–D26 | Porté, **gated** | Idem |
| M4 Agronomique | §5.4 · D18–D20 | Porté, **gated** | Idem |
| M5 SIG | §5.5 | Porté, **gated** (Leaflet) | PostGIS cible |

Activation progressive : `VITE_ENABLE_EXTRA_MODULES` + `nav.ts` — voir `docs/MODULES_EXTRA_ANGULAR.md`.

## 4. Données

| Élément | État |
|---|---|
| Schéma logique | PRD Backend § schéma indicatif |
| Schéma CRADESC v2 / seed recette | API `infra/db`, `seed_recette.sql` |
| Dictionnaire + mapping source→cible | **À formaliser** (annexe L2 attendue cadrage) |
| PostGIS parcelles | Prévu ; pas encore le cœur prod API |

## 5. Sécurité

| Contrôle | État |
|---|---|
| OTP + JWT access/refresh | En prod API |
| RBAC / permissions | `permissions.ts` + rôles seed |
| CNI masquée + motif | UI + droits |
| CSP Report-Only, HSTS | `vercel.json` |
| Secrets VPS | `/etc/mbay-diaay/.env.production` (hors git) |

## 6. Synchronisation offline (spécification)

| Point | Position L2 |
|---|---|
| Outbox mobile | Drift (locale) — mutations offline |
| Serveur | BullMQ pour jobs lourds **après** réception API (pas comme file téléphone) |
| Conflits | Proposition : stratégie **par type** (D-06) — à valider |
| PoC | **À produire** (preuve Drift ↔ Nest) |

Détail : Brief §8 + `PRD_Mobile` / `PRD_Backend`.

## 7. Hébergement et environnements

| Env | Front | API |
|---|---|---|
| Prod | `www.mbaydiaay.com` | `api.mbaydiaay.com` |
| Recette | Preview Vercel / flag modules | VPS ou compose local |
| Dev | `pnpm dev` + API locale | Docker compose |

## 8. Maquettes / prototype

| Attendu L2/L3 | État |
|---|---|
| Maquettes Figma validées (L3) | **Hors L2 strict** mais souvent jointes à T2 — à confirmer existence Figma CANAS |
| Prototype web interactif | **Oui** — M1 prod + M2–M5 en preview local |

## 9. Critères de clôture L2 (T1)

| Critère | Preuve | Statut |
|---|---|---|
| Architecture + stack + hébergement | §2, §7 | **Prêt** |
| Specs 5 modules (renvoi + hypothèses) | §3 + ETAT §4–10 | **Prêt (à valider client)** |
| Schéma PostgreSQL/PostGIS | PRD + seed ; PostGIS partiel | **Partiel** |
| Spec synchro | §6 | **Rédigé ; PoC manquant** |
| Dictionnaire / mapping migration | — | **Manque** |
| Sécurité | §5 | **Prêt** |
| Validation client L2 | PV | **Externe** |

---

## Annexes (lecture obligatoire)

1. `docs/cadrage/Brief_cadrage_Mbay_Diaay_v0.1.md`
2. `docs/prd/PRD_Web_Mbay_Diaay_v0.1.md`
3. `docs/prd/PRD_Mobile_Mbay_Diaay_v0.1.md`
4. `docs/prd/PRD_Backend_API_Mbay_Diaay_v0.1.md`
5. `docs/ETAT_DU_PROJET.md`
6. `docs/MODULES_EXTRA_ANGULAR.md`
7. API : `DEPLOY.md`, `openapi.json`, `API_ROUTES_M1.md`
