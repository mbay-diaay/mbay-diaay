# AGENTS.md — Mbay Diaay (Module 1)

## Projet
Mbay Diaay Module 1 administratif SCOOP (Zone des Niayes, client CRADESC). Données fictives en mémoire (réinitialisées au rechargement), pas de backend ici (API Nest dans le dépôt frère `mbay-diaay-api`). Modules M2–M5 hors menu. Textes UI, commentaires, docs et commits en français ; format de commit `type(périmètre): sujet` (impératif présent).

## Deux apps, un dépôt
- `web-angular/` (Analog.js = Angular 22 + Vite + Nitro) : app **production** (site statique) et référence fonctionnelle. Nouveaux parcours ici.
- `src/` (React 19 + TanStack Start) : archive locale pour rollback. Ne plus y développer de nouveautés. `e2e/` et Playwright ciblent Angular.
- Commandes à la racine = archive React (port 8080). Pour Angular, `cd web-angular`. Dépendances séparées : CI utilise `pnpm install --ignore-workspace`.

## Commandes
Node **22.x** uniquement (jamais de plage ouverte), pnpm ≥ 11 (jamais `npm`/`bun install`).

Angular (depuis `web-angular/`) :
- `pnpm dev` — vite
- `pnpm typecheck` — `tsc --noEmit -p tsconfig.app.json`
- `pnpm test` — `vitest run` (seul test actuel : `src/app/app.spec.ts`)
- `pnpm build` — `vite build` (site statique dans `dist/client`)
- `pnpm check:host` — garde-fou site statique / `.env.production`
- `pnpm ci` — `check:host` + `typecheck` + `build`

E2E Playwright (depuis la racine, démarre `web-angular` sur le port 4173) :
- `pnpm e2e:install` — une fois
- `pnpm e2e` — projets « bureau » et « mobile » (fichiers `mobile*.spec.ts`)
- `pnpm e2e e2e/auth.spec.ts` — un fichier ; ajouter `-g "<titre>"` pour un test
- `E2E_BASE_URL=http://localhost:4173 pnpm e2e` — cibler un serveur déjà lancé

React archive (depuis la racine) :
- `pnpm run ci` — `check:host`, `typecheck`, `lint`, `format:check`, `test`, `build`
- `pnpm test -- src/<fichier>.test.ts` — un test Vitest
- `pnpm lint:fix` / `pnpm format`
- `pnpm i18n:coverage` / `pnpm i18n:inventory`

## Architecture & conventions
- `src/lib/` est partagé **par copie** : `web-angular/src/lib/` en est une copie (logique métier, store, permissions, mocks, i18n, `styles.css`). Pas de symlink : toute modification de logique ou de tokens CSS doit être reportée dans les deux arbres. Voir `web-angular/MIGRATION.md`.
- Store central `src/lib/store.ts` (~3 200 lignes, état + `actions.*` + assemblage des données mock), indépendant du framework. Angular : `shared/store.service.ts` l'expose en signal (`state`, `actions`, `can()`). React : hook `useStore()`. Données fictives : `src/lib/mock/` et `data/fixtures/mbay_fixture_complet.json` (2,3 Mo).
- Routage Analog par fichiers : page = `web-angular/src/app/pages/<route>.page.ts` (`cooperatives.[id].page.ts` = route paramétrée ; `.` = séparateur de segment). Transverses dans `app/shared/`, kit UI dans `app/shared/ui/`. React : `src/routes/` (TanStack Router, `routeTree.gen.ts` généré).
- Permissions : toujours via `src/lib/permissions.ts` / `can()` du store ; jamais de contrôle de rôle codé en dur dans un composant. Le périmètre SCOOP (`scope.ts`) s'applique partout ; CNI et actions sensibles = permission + audit.
- i18n FR/WO : tout texte visible passe par `src/lib/i18n/` (messages par module dans `messages/`, `fr.ts`/`wo.ts`) ; le wolof n'est **jamais** traduit automatiquement. Angular : `LocaleService`.
- Design tokens : couleurs/tailles/polices uniquement via les variables CSS primitive→semantic→component de `styles.css` (miroir de `docs/prd/design-tokens.json`) ; pour une nouvelle charte, ne changer que le bloc primitive. Pas de couleurs hors tokens (graphiques : `--chart-1`/`--chart-2`). Marron CRADESC `#4E3228` non négociable.
- Leaflet : chargé côté client seulement, après montage (React : `React.lazy`, Angular : `plot-map.component.ts`).

## Hébergement / pièges de déploiement
- Le front Angular est un **site statique** (`analog({ ssr: false })`, sortie `dist/client`), voir `docs/DEPLOY_FRONT.md`. Ne pas rétablir le rendu serveur sans mettre à jour ce guide et `pnpm check:host` dans le même commit.
- Hébergement : Build Path `web-angular/`, Node 22.x, dossier publié `dist/client`, mode SPA activé.
- `VITE_DEMO_MODE` (`true|false`) doit être commitée dans `.env.production` (lue par Vite et `scripts/check-env.mjs`) ; les variables `VITE_*` sont lues à la construction.
- CSP en **Report-Only**, posée sur le routeur du serveur (voir `docs/DEPLOY_FRONT.md`) ; tuiles Esri autorisées, pas d'OSM.org.

## Workflow
- `pnpm run ci` (React) / `pnpm ci` (Angular) doit passer avant chaque commit ; un commit par intention ; branches `type/sujet`.
- Mettre à jour `docs/ETAT_DU_PROJET.md` dans chaque lot livré. Règles détaillées : `docs/DEVELOPPEMENT.md`.
- Fichiers sensibles (CODEOWNERS, relecture `@MohaPeth`) : `/src/lib/auth/`, `/src/lib/permissions.ts`, `/src/lib/scope.ts`, `/.github/`, `/package.json`, `/pnpm-lock.yaml`.
- Aucune donnée réelle ni secret ; documents client confidentiels dans `docs/cadrage/` ; `data/revue-doublons/` ignoré par git.
