# Migration React → Angular

Started 2026-11-05 on branch `feat/angular-migration`, per explicit user
direction (not yet committed — see repo root for the commit-discipline rule).
This directory is a **new, separate app** living alongside the React app in
`src/`. Nothing here is wired into Vercel, CI, or `docs/DEVELOPPEMENT.md` yet.
The React app in `src/` remains the live, production-headed app until this
migration is much further along — do not remove or stop maintaining it.

**Honest scope check**: the React app has 33 routes, a ~3,200-line central
store, 50+ components under `src/components/app/`, a full shadcn-based UI
kit, and Leaflet maps. What's below is real, working, verified progress —
not a finished migration. Porting everything is a multi-week effort.

## Why Analog.js, not plain Angular CLI

AGENTS.md pins the hosting setup hard: **Vercel + Nitro `preset: "vercel"`**,
output at `.vercel/output`. Plain Angular CLI's SSR (`@angular/ssr`) has no
Nitro integration, which would have meant redesigning hosting from scratch.
[Analog.js](https://analogjs.org) is an Angular meta-framework built on
**Vite + Nitro**, the same two pieces TanStack Start already uses here — its
`analog()` Vite plugin takes a `nitro: { preset: 'vercel' }` option exactly
like the current app's Nitro config. Verified end-to-end: `vite build`
produces a valid `.vercel/output/` (static assets + a Vercel serverless
function), confirming the hosting setup survives the framework swap.

## What's ported verbatim (framework-agnostic — just copied)

The **entire `src/lib/` tree** (92 files, ~15,000 lines) was bulk-copied —
only 5 files in it had any React import, and 4 of those are tiny i18n glue
(see below). Everything else — all business logic, including the ~3,200-line
central store, permissions, scope filtering, auth, mock/fixture data, report
generation, i18n messages (all ~25 modules) — is framework-agnostic
TypeScript and ported as-is:

- `src/lib/store.ts` — the **real** central store (not a stand-in). State,
  `actions` (~2,400 lines of them), mock data assembly: all unchanged. Only
  its `useStore()` hook (`useSyncExternalStore`) was replaced — see
  `StoreService` below. `State` and `subscribeToStore` are now exported
  (weren't, in the React original) so the Angular side can reach them.
- `src/lib/quality-nav.ts` — `useQualityCounts()` hook became a plain
  `qualityCounts(state: State)` function.
- `src/lib/nav.ts` — icons switched from `lucide-react` to `lucide-angular`
  (deprecated package, kept deliberately — see the note in that file for why
  the successor `@lucide/angular` doesn't fit this file's data-driven
  `icon: typeof Users` pattern without a larger rework).
- `src/lib/i18n/` — full `fr.ts`/`wo.ts` (all ~25 message modules, not a
  trimmed subset anymore), `translate.ts`, `format.ts`, `storage.ts`. A
  trimmed `index.ts` barrel re-exports only the framework-agnostic pieces
  (several `src/lib/*.ts` files import `tNow`/`MessageKey` from it) —
  `LocaleProvider`/`useI18n`/`useT` are dropped in favor of `LocaleService`.
- `src/styles.css` — full primitive/semantic/component design-token system.
  **This is a copy, not a symlink**: when a brand charter changes the
  primitive block, update the React `src/styles.css` as usual, then copy
  the result here too, until the React app is retired.
- `data/fixtures/mbay_fixture_complet.json` — the 2.3 MB demo dataset
  `src/lib/mock/fixture.ts` imports, copied to the same relative path.

## What's rebuilt for Angular (same behavior, different idiom)

- `src/app/shared/locale.service.ts` — replaces `LocaleProvider`/`useI18n()`.
- `src/app/shared/store.service.ts` — replaces the store's `useStore()` hook.
  Wraps `subscribeToStore`/`getState` in a signal; exposes the **same**
  `actions` object the React app calls, plus a `can(permission)` helper.
- `src/app/shared/auth.service.ts` — now matches `src/lib/auth/index.ts`
  exactly (now that the real store exists): `isActive` really checks user
  records, `acceptInvitation` really activates accounts, and
  `pendingInvitationLinks()` is ported too.
- `src/app/shared/sidebar-nav.component.ts` — port of
  `src/components/app/SidebarNav.tsx` (collapsible groups, localStorage-
  remembered open state, badge counts).
- `src/app/shared/app-shell.component.ts` — port of
  `src/components/app/AppShell.tsx`. Each page wraps its content in
  `<app-shell [perm]="..." [area]="...">...</app-shell>`, same composition
  shape as React's `<AppShell perm={} area={}>{children}</AppShell>`.
  Permission-gated content, session-expiry watcher, demo role switcher,
  demo banner, mobile nav panel, scope label, CommandPalette (⌘K),
  GlobalFilters, toast host — all working. **Simplified**: session expiry
  still logs out silently (pas de toast Sonner).
- `src/app/pages/login.page.ts` — full port of `src/routes/login.tsx` +
  `AuthLayout`/`OtpStep`/`PasswordField`/`FormMessage`/`DemoMailNotice`/
  `DemoInvitationNotice` (inlined into one component rather than extracted
  into a shared Angular UI kit yet). Stats in the side panel (SCOOP/parcelles/
  producteurs counts) are now **real**, read from the store.
- `src/app/pages/index.page.ts` — **real** port of `src/routes/index.tsx`
  (the dashboard): same "À traiter" KPI cards (dossiers/alertes/cotisations)
  and stat tiles (fiches, adhérents, femmes %, jeunes), same numbers as the
  React app (verified side-by-side: 1 317 fiches, 42 adhérents, 14% femmes,
  609 alertes, etc., and they re-scope correctly on demo role switch).
  **Not ported**: the two recharts (bar chart by SCOOP, pie/status chart) —
  no charting library is installed in this app yet.
- `src/app/shared/ui/` — first shared Angular UI kit pieces:
  `button`, `page-header`, `pill` / `quality-pill`, `empty`. Still thin vs
  the React `src/components/ui/*` kit; enough to stop rewriting Tailwind
  markup on every new page.
- `src/app/pages/producteurs.page.ts` — **real** port of
  `src/routes/producteurs.index.tsx`: search, URL filters, `ui-sheet`
  mobile + panneau md+, cards/table, pagination, CSV export + toasts,
  quality pills. **Simplifications**: confirm export encore en dialog HTML.
- `src/app/pages/producteurs.[id].page.ts` — fiche producteur (parcelle
  Leaflet, correction, révélation CNI/téléphone). Toasts export/copie
  encore à brancher.

## Verified end-to-end (Playwright, against the real dev server + a real build)

- Login → OTP (with visible demo code) → dashboard → logout, in both locale
  toggles (fr/wo, including the Wolof pseudo-translation wrapper).
- Dashboard numbers match the React app's screenshots exactly.
- Demo role switching (header dropdown) correctly re-scopes the whole
  dashboard, the sidebar nav items, and the "Terrain et qualité" badge count
  (622 → 42 when switching from admin/consolidated to a single SCOOP
  gestionnaire) — confirms `StoreService`, `can()`, and scope filtering all
  work together correctly.
- `tsc --noEmit` is clean, but **note**: plain `tsc` does NOT type-check
  Angular templates (`strictTemplates`) — only the real Angular compiler
  does, which runs during `vite build`/`vite dev`. Always verify with an
  actual build, not just `tsc`, after touching a `.page.ts` template.
- A real `vite build` produces a valid `.vercel/output/` (see above).
- Zero browser console errors throughout.
- **Gotcha hit during testing**: clicking an element immediately after it
  appears in the DOM (right after `waitForSelector`) can race Angular's
  hydration — the element exists (SSR) before its event listeners are
  attached (client hydration). Add a short wait after the page settles
  before interacting, in tests and when judging "is this broken".

## Known simplifications / explicit TODOs

- OTP entry is a single 6-digit text input, not the 6 separate boxes the
  React app gets from `input-otp` (no direct Angular port available).
- No shared Angular UI kit (Button/Input/Label/Card are inlined Tailwind
  markup, not reusable components like `src/components/ui/*`).
- No charting library installed (dashboard charts not ported — see above).
- No ESLint/Prettier config in this directory yet.
- Not in `pnpm ci` / GitHub Actions / Vercel yet.
- `lucide-angular` (not `@lucide/angular`) is used deliberately — see
  `src/lib/nav.ts`'s inline note.

## Status 2026-11-06 — full route surface on Angular

Every React route under `src/routes/` (except `__root`) has an Analog
counterpart under `web-angular/src/app/pages/`. No `ui-stub-page` left in
nav screens. `pnpm build` green (client + SSR + `.vercel/output`).

**Deep / interactive ports**: login (+OTP), invitation, mot-de-passe-oublié,
dashboard (Chart.js client-only), producteurs (+fiche Leaflet `app-plot-map`,
révélation CNI/tél + demande de correction), cooperatives, organisations
(+id), dossiers (**création**, édition brouillon, pièces, review / approve /
complement / refuse / submit), reunions (+id + vue **calendrier**
`?vue=calendrier` + **création/édition** via `meeting-form-dialog`), equipe,
cotisations, qualité hub + doublons + alertes + corrections, documents,
utilisateurs, comptes, appareils, referentiels, imports (**wizard complet**
dépôt→colonnes→rapport à blanc→écriture + modèles + historique), donnees,
audit, rapports, cooperative redirect. CommandPalette (⌘K) + GlobalFilters
(`?scoop`/`?campagne`) dans `AppShell`.

**Production** : Angular couvre les parcours métier critiques (login,
dossiers, réunions, import, qualité, producteur, shell). Build +
`pnpm typecheck` verts. Cutover Vercel : Root Directory `web-angular/`.
React `src/` reste disponible pour rollback (Root Directory → `.`).

**Encore plus mince que React** : UI kit `select` partagé ; toasts pas
encore branchés partout (fiche producteur, expiration session) ; export
CSV encore en dialog HTML natif.

## Next milestones, roughly in order of leverage

1. **Cutover** (sans basculer prod tant que non validé) — checklist :
   - [x] `web-angular/vercel.json` + `.env.production` (`VITE_DEMO_MODE`) + `.nvmrc` (`22`)
   - [x] Nitro `preset: "vercel"` → sortie `.vercel/output` (pas `dist` forcé)
   - [x] `pnpm check:host` depuis `web-angular/` (script partagé `../scripts/check-host.mjs`)
   - [x] Job CI `angular` (check:host + typecheck + build) — React `verify` reste prod
   - [x] Projet Vercel **prod** : Root Directory `web-angular/`, Node **22.x**,
         overrides Build/Output/Install **OFF**, Framework Angular, Toolbar off (CSP)
   - [x] Cutover prod (redeploy après commit de `web-angular/`)
   - [ ] Retirer / archiver `src/` React quand le rollback n’est plus nécessaire
2. Polish restant : UI kit select ; toasts fiche producteur / session ;
   AlertDialog export.

## Running it

```sh
cd web-angular
pnpm install --ignore-workspace   # NOT part of the root pnpm workspace
pnpm check:host
pnpm dev       # http://localhost:4200 (vite dev server)
pnpm test
pnpm typecheck
pnpm ci        # check:host + typecheck + build
```
