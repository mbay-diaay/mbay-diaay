# Branchement front M1 ↔ API NestJS

| | |
|---|---|
| Front | [`mbay-diaay/mbay-diaay`](https://github.com/mbay-diaay/mbay-diaay) (Vercel) |
| API | [`mbay-diaay/mbay-diaay-api`](https://github.com/mbay-diaay/mbay-diaay-api) (`api.mbaydiaay.com`) |
| Date | 2 novembre 2026 |

## Principe

- Si **`VITE_API_URL`** est défini → authentification et utilisateurs passent par l’API.
- Sinon → mode démonstration en mémoire (comportement historique).

## Local

### 1. API

```bash
cd /Users/moha/Dev/mbay-diaay-api
bash infra/scripts/generate-env.sh .env   # si pas déjà fait
# Docker Desktop allumé :
docker compose -f infra/compose/docker-compose.yml \
  -f infra/compose/docker-compose.override.yml \
  --env-file .env up -d postgres redis minio minio-init
cd apps/api && pnpm migrate && pnpm start:dev
```

Dans `.env` API, CORS doit inclure le front :

```env
CORS_ORIGINS=http://localhost:8080,http://localhost:3000,http://127.0.0.1:8080
```

### 2. Front

```bash
cd /Users/moha/Dev/mbay-diaay
cp .env.example .env.local
# Contenu minimal :
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

Création d’utilisateur : écran **Utilisateurs & rôles** (rôle admin) → l’utilisateur est enregistré en Postgres.

## Production (Vercel + VPS)

**Guide serveur complet (copier-coller) :** dans le dépôt API → [`docs/COMMANDES_SERVEUR.md`](https://github.com/mbay-diaay/mbay-diaay-api/blob/main/docs/COMMANDES_SERVEUR.md)

1. Variables Vercel / `.env.production` front :
   - `VITE_DEMO_MODE` = `false`
   - `VITE_API_URL` = `https://api.mbaydiaay.com/v1`
2. Secrets VPS : fichier local `mbay-diaay-api/deploy-pack/env.production.READY_TO_COPY` → `/etc/mbay-diaay/.env.production`
3. Redéployer l’API sur le VPS, puis le front sur Vercel.

## Ce qui est branché / pas encore

| Zone | État |
|---|---|
| Login e-mail + mot de passe + OTP | Branché |
| Jetons JWT (access / refresh) | Branchés |
| Création / activation utilisateurs | Branché |
| Producteurs, cotisations, dossiers… | Encore store local (stubs API) |
| Reset mot de passe / invitations e-mail | API à venir |

## Fichiers clés

Front : `src/lib/api/*`, `src/lib/auth/api-service.ts`, `src/lib/auth/index.ts`  
API : `auth/sign-in`, `auth/otp/*`, `users/*`
