# Branchement front M1 ↔ API NestJS

| | |
|---|---|
| Front | [`mbay-diaay/mbay-diaay`](https://github.com/mbay-diaay/mbay-diaay) — **`web-angular/`** (site statique, production) |
| API | [`mbay-diaay/mbay-diaay-api`](https://github.com/mbay-diaay/mbay-diaay-api) (`api.mbaydiaay.com`) |
| Date | 8 novembre 2026 |

## Principe

- Si **`VITE_API_URL`** est défini → authentification et utilisateurs passent par l’API.
- Sinon → mode démonstration en mémoire (comportement historique).
- Production : `VITE_DEMO_MODE=false` + `VITE_API_URL=https://api.mbaydiaay.com/v1` dans `web-angular/.env.production`.

## Local

### 1. API

```bash
cd /Users/moha/Dev/mbay-diaay-api
# Docker Desktop allumé : services de développement (voir le README du dépôt API pour apps/api/.env)
docker compose -f infra/compose/docker-compose.dev.yml up -d
cd apps/api && pnpm migrate && pnpm start:dev
```

Dans `.env` API, CORS doit inclure le front :

```env
CORS_ORIGINS=http://localhost:8080,http://localhost:3000,http://127.0.0.1:8080
```

### 2. Front

```bash
cd /Users/moha/Dev/mbay-diaay/web-angular
# .env.local ou .env :
# VITE_DEMO_MODE=false
# VITE_API_URL=http://localhost:3000/v1
pnpm install && pnpm dev
```

### 3. Connexion

| Champ | Valeur |
|---|---|
| E-mail | `aissatou.ndiaye@cradesc.example` |
| Mot de passe | `Demonstration2026` |
| Code OTP | `000000` |

Flux API : `POST /v1/auth/sign-in` puis `POST /v1/auth/otp/verify` (challengeId + code).

Création d’utilisateur : écran **Utilisateurs & rôles** (rôle admin) → `POST /v1/users`.

Comptes multi-rôles : [API `COMPTES_RECETTE.md`](https://github.com/mbay-diaay/mbay-diaay-api/blob/main/docs/COMPTES_RECETTE.md).

## Production

**Guide serveur :** [`COMMANDES_SERVEUR.md`](https://github.com/mbay-diaay/mbay-diaay-api/blob/main/docs/COMMANDES_SERVEUR.md)

1. Front : Root Directory `web-angular/`, Node **22.x**, overrides OFF ; `pnpm check:host`.
2. Secrets VPS : `/etc/mbay-diaay/.env.production`.
3. Redéployer l’API puis le front.

## Ce qui est branché / pas encore

| Zone | État |
|---|---|
| Login e-mail + mot de passe + OTP | Branché |
| Jetons JWT (access / refresh) | Branchés |
| Création / activation utilisateurs | Branché |
| Producteurs, cotisations, dossiers… | Encore store local / stubs API |
| Reset mot de passe / invitations e-mail | API à venir |

## Fichiers clés

Front : `web-angular/src/lib/api/*`, `web-angular/src/lib/auth/*`, `web-angular/src/lib/store.ts`  
API : `auth/sign-in`, `auth/otp/*`, `users/*`
