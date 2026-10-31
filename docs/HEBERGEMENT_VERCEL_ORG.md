# Brancher l’org GitHub `mbay-diaay` sur Vercel

Guide court pour Moha (31 octobre 2026). Aucun secret ici : uniquement le flux standard et comment **vérifier** l’état actuel.

## Deux choses distinctes (à ne pas confondre)

| | **GitHub org** | **Team Vercel** |
|---|---|---|
| Rôle | Héberge le **code** (`mbay-diaay/mbay-diaay`) | Héberge le **déploiement** et la facturation |
| Exemple | https://github.com/mbay-diaay | Dashboard Vercel → sélecteur de team en haut à gauche |
| Ce qu’il faut | Compte GitHub **membre** de l’org + Vercel autorisé à voir l’org | Projet Vercel créé **sous la bonne team** (perso vs team org) |

Les deux doivent « voir » le même repo : GitHub pour le push, Vercel pour le build après chaque push sur `main`.

### « Je ne vois pas mbay-diaay » dans le menu Teams (cas fréquent)

Sur Vercel, le menu en haut à gauche (Teams…) liste des **teams Vercel**, pas les organisations GitHub.

Exemple typique d’écran :

- **Moha's projects** (Hobby) ← team perso  
- **Darlyn** (Pro)  
- **nootec's projects** (Pro)  
- **+ Create Team**

**Il n’y a pas** de ligne `mbay-diaay` tant que personne n’a créé une **team Vercel** avec ce nom. C’est normal : l’org GitHub https://github.com/mbay-diaay existe déjà, mais Vercel ne la crée pas automatiquement.

**Deux façons de continuer (choisir une) :**

| Option | Quand | Quoi faire |
|---|---|---|
| **A — Simple (recommandé pour démarrer)** | Tu veux juste voir le site | Rester sur **Moha's projects** → **Add New Project** → importer le repo GitHub `mbay-diaay/mbay-diaay` (après avoir accordé l’accès org, §3) |
| **B — Team dédiée** | Tu veux une team « Mbay Diaay » visible dans le menu | Cliquer **+ Create Team** → nommer p.ex. `Mbay Diaay` → puis depuis **cette** team → Add New Project → même repo |

Tant que le repo n’apparaît pas à l’import : ce n’est **pas** un problème de team manquante, c’est l’**accès Vercel → org GitHub** (§3) qui manque.

---

## 1. Prérequis GitHub

1. Se connecter sur GitHub avec un compte **membre** de https://github.com/mbay-diaay  
2. Vérifier l’accès au repo : https://github.com/mbay-diaay/mbay-diaay  
3. Droits utiles : au minimum lecture + capacité de push sur `main` (ou PR) selon le rôle org

---

## 2. Se connecter à Vercel avec le même GitHub

1. Aller sur https://vercel.com/login  
2. Choisir **Continue with GitHub** (pas un autre provider)  
3. Accepter l’accès demandé par Vercel sur le compte GitHub

Le compte Vercel doit être lié au **même** utilisateur GitHub que celui qui voit l’org `mbay-diaay`.

---

## 3. Donner à Vercel l’accès à l’organisation `mbay-diaay`

Sans cet accès, Vercel ne liste pas le repo `mbay-diaay/mbay-diaay` à l’import.

**Pendant l’import** : si GitHub demande « Organization access », autoriser `mbay-diaay` (Grant / Approve).

**Ou après coup** (vérification / réparation) :

1. GitHub → **Settings** (compte perso) → **Applications** → **Authorized OAuth Apps** ou **Installed GitHub Apps** → **Vercel**  
2. Section **Organization access** → `mbay-diaay` → **Grant** / **Request** / **Approve**  
3. Si l’org exige une approbation admin : un owner de https://github.com/mbay-diaay doit valider la demande

Contrôle rapide : dans Vercel → **Add New Project** → le repo `mbay-diaay/mbay-diaay` apparaît dans la liste GitHub.

---

## 4. Importer le projet

1. Vercel Dashboard → **Add New…** → **Project**  
2. Importer **`mbay-diaay/mbay-diaay`** (branche `main`)  
3. Framework : **TanStack Start** (ou détection auto Vite / autre — l’important est le build ci-dessous)  
4. **Build Command** : `pnpm build` (défaut du repo)  
5. **Install** : laisser le défaut pnpm (lockfile présent)  
6. **Ne pas** forcer **Output Directory** à `dist` — TanStack Start + Nitro produit `.vercel/output`. Laisser les overrides Build / Output / Install **OFF** dans Project Settings (voir `AGENTS.md`)

---

## 5. Réglages critiques (rappel `AGENTS.md`)

| Réglage | Valeur |
|---|---|
| Node.js Version (Project Settings) | **22.x** (aligné `package.json` → `engines.node: "22.x"` et `.nvmrc`) |
| Output Directory | **pas** `dist` — overrides OFF |
| `VITE_DEMO_MODE` | Déjà dans **`.env.production`** commitée (`true` pour le prototype). Ne pas compter sur `vercel.json` → `env` pour le build Vite |
| Toolbar / Feedback Vercel | Désactiver (Settings → Toolbar) pour une console démo propre (CSP) |

Après changement d’hébergeur / env de build en local : `pnpm check:host` puis `VERCEL=1 VERCEL_ENV=production pnpm build`.

---

## 6. Push → redeploy auto

1. Une fois le projet relié au repo GitHub, chaque push sur **`main`** déclenche un déploiement Production  
2. Les PR peuvent déclencher des Preview (selon les réglages Git Integration)  
3. Suivre le build : Vercel → projet → **Deployments**

---

## 7. Mauvais team Vercel (personnel vs org) — basculer / transférer

Symptôme : le déploiement marche sous *ton* team perso, alors que l’orga veut tout sous une **team Vercel** partagée (billing / droits).

**Vérifier** : en haut à gauche du Dashboard Vercel, le nom de la team affichée. Ouvrir le projet → Settings → General : voir à quelle team il appartient.

**Options** :

1. **Créer / rejoindre** une team Vercel dédiée (ex. « mbay-diaay ») et y inviter les membres  
2. **Transfer** le projet : Project Settings → **General** → **Transfer** vers la team cible (droits owner requis sur les deux côtés)  
3. Ou **ré-importer** le repo sous la bonne team (Add New Project depuis cette team), puis retirer l’ancien projet perso pour éviter le double déploiement

La **connexion GitHub org** (étape 3) reste nécessaire même après transfert : sans elle, la nouvelle team ne pourra pas redeployer depuis le repo.

---

## 8. Domaines (front Vercel vs API VPS)

Deux rôles distincts — **ne pas** brancher le même enregistrement DNS sur Vercel et sur le VPS sans reverse-proxy clair.

| Hôte | Cible actuelle | Rôle |
|---|---|---|
| URL `*.vercel.app` du projet | **Vercel** | Front Module 1 (TanStack Start) |
| `app.mbaydiaay.com` ou apex `mbaydiaay.com` (plus tard) | **Vercel** → Domains | Front prod (CNAME / A selon l’UI Vercel) |
| **`api.mbaydiaay.com`** | **VPS / serveur** (DNS déjà pointé, 31 oct. 2026) | **API NestJS** future (cadrage : monolithe modulaire, Docker, PostgreSQL 16 + PostGIS) |

**Règles :**

1. Le front démo / M1 continue de se déployer via push `main` → Vercel.  
2. `api.mbaydiaay.com` est **réservé à l’API** : pas d’hébergement du front M1 sur ce sous-domaine.  
3. Tant que NestJS n’est pas déployé, le sous-domaine peut résoudre vers le serveur sans service HTTP métier — c’est attendu.  
4. API : repo [`mbay-diaay/mbay-diaay-api`](https://github.com/mbay-diaay/mbay-diaay-api) — Traefik + NestJS, runbook [`DEPLOY.md`](https://github.com/mbay-diaay/mbay-diaay-api/blob/main/docs/DEPLOY.md).

Voir aussi : [`docs/prd/PRD_Backend_API_Mbay_Diaay_v0.1.md`](prd/PRD_Backend_API_Mbay_Diaay_v0.1.md) · brief cadrage §7 (NestJS / Docker / VPS).

---

## 9. Checklist « demain matin » (5 minutes)

1. GitHub : je vois https://github.com/mbay-diaay/mbay-diaay  
2. Vercel : login **Continue with GitHub** (même compte)  
3. GitHub Apps → Vercel → Organization access **`mbay-diaay` = Granted**  
4. Vercel → bonne **team** → projet `mbay-diaay` importé (ou Transfer)  
5. Project Settings : Node **22.x**, pas d’Output `dist`  
6. Push test sur `main` → Deployments vert  
7. Optionnel : Toolbar Feedback **OFF**  
8. DNS : `api.mbaydiaay.com` résout vers le VPS (API) ; ne pas le coller sur Vercel Domains par erreur

---

## Liens

| Ressource | Lien |
|---|---|
| Org GitHub | https://github.com/mbay-diaay |
| Repo Module 1 | https://github.com/mbay-diaay/mbay-diaay |
| Vercel login | https://vercel.com/login |
| API (DNS) | `api.mbaydiaay.com` → VPS |
| Règles build / CSP | [`AGENTS.md`](../AGENTS.md) |
| Guide dev | [`docs/DEVELOPPEMENT.md`](DEVELOPPEMENT.md) |
| Mission M1 | [`docs/MISSION_MODULE1_ET_TRELLO.md`](MISSION_MODULE1_ET_TRELLO.md) |
| PRD Backend | [`docs/prd/PRD_Backend_API_Mbay_Diaay_v0.1.md`](prd/PRD_Backend_API_Mbay_Diaay_v0.1.md) |
