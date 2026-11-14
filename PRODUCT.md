# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary (UX priority):** Administrateurs CRADESC (vue consolidée, audit, imports, administration) et gestionnaires de SCOOP (périmètre coopérative, dossiers, qualité, cotisations, réunions).

**Secondary:** Représentant, secrétaire, technicien, responsables rapports / ventes — mêmes écrans M1, droits et périmètre différents. Faîtière en lecture.

**Situation:** Zone des Niayes (Sénégal) ; usage bureau et terrain (web mobile) ; mobile natif hors ce dépôt.

## Product Purpose

Mbay Diaay Module 1 (Administratif) permet à chaque SCOOP et au CRADESC de gérer membres, producteurs, dossiers, organisations, cotisations, réunions, documents, qualité des données, imports et rapports — sans Excel/papier dispersés — avec périmètre SCOOP et journal d’audit.

**Succès :** une SCOOP traite son quotidien administratif de bout en bout dans l’outil ; le CRADESC voit l’ensemble avec traçabilité.

## Positioning

Un seul outil web pour les coopératives des Niayes et leur faîtière, borné au Module 1 administratif (M2–M5 hors menu ici). Différenciateur : périmètre SCOOP appliqué partout + données sensibles (CNI) = droit + trace, bilingue FR/WO.

## Operating Context

- Client / maître d’ouvrage : **CRADESC** ; mission CANAS.
- UI de référence fonctionnelle : **Angular Analog** (`web-angular/`). React `src/` n'est plus qu'une archive, bientôt supprimée.
- Données : mock / store en mémoire jusqu’à branchement API Nest (`mbay-diaay-api`).
- Auth démo OTP ; session perdue au rechargement en mode démo.
- Locales : français (défaut) et wolof (jamais traduit automatiquement).

## Capabilities and Constraints

**Capabilities (M1) :** dashboard, producteurs (+ fiche), cooperatives / organisations, dossiers (CRUD + décisions), réunions (liste + calendrier + formulaire), équipe, cotisations, qualité (hub, doublons, alertes, corrections), documents, utilisateurs / comptes / appareils, référentiels, imports (wizard), données, audit, rapports, auth (login, invitation, mot de passe oublié).

**Constraints :**

- Couleurs et tailles via tokens (`docs/prd/design-tokens.json` → `styles.css`) ; pas de couleurs hors tokens dans les écrans (y compris charts → `--chart-1` / `--chart-2`).
- Marron CRADESC (`#4E3228`) non négociable.
- Permissions via `permissions.ts` / store — pas de checks de rôle en dur dans les composants.
- Leaflet chargé côté client uniquement (SSR-safe).
- Node 22.x ; front statique (`analog({ ssr: false })`), voir `docs/DEPLOY_FRONT.md`.

**Ouvert :** graphie officielle du nom / tagline / logo SVG transparent ; cutover prod Angular ; photos producteurs (Kobo).

## Brand Commitments

- Nom produit : **Mbay Diaay** (graphie officielle à valider).
- Identité visuelle CRADESC : marron principal `#4E3228`, indigo accent `#394076`, neutres ivoire/verts-gris des tokens (charte couleurs reçue 22/04/2026).
- Logo CRADESC reçu en PNG opaque ; exports SVG/monochrome encore à fournir avant intégration UI pleine.
- Voix : langage simple (phrases courtes, états vides utiles) — FR + pictogrammes ; WO sans auto-traduction.

## Evidence on Hand

- Tokens : `docs/prd/design-tokens.json`
- Styles : `web-angular/src/styles.css` (miroir `src/styles.css`)
- Acteurs / vision : `docs/ACTEURS.md`, `docs/ETAT_DU_PROJET.md`
- Migration Angular : `web-angular/MIGRATION.md`
- API : dépôt `mbay-diaay-api` (`docs/API_ROUTES_M1.md`)
- Ne pas inventer témoignages clients, benchmarks ou logos partenaires absents.

## Product Principles

1. **Périmètre d’abord** — chaque écran respecte le scope SCOOP / consolidé ; jamais de fuite de données hors droit.
2. **Traçabilité des sensibles** — CNI et actions sensibles = permission + audit.
3. **Charte unique** — toute couleur/UI vient des tokens CRADESC ; le marron porte l’identité.
4. **Angular = référence** — nouveaux parcours et polish se font dans `web-angular/` jusqu’au cutover.
5. **Clarté métier** — vocabulaire SCOOP / dossier / qualité ; densités Operate, pas marketing.

## Accessibility & Inclusion

- Cibles tactiles (`--size-touch-min` 48px) pour usage terrain / mobile web.
- Contraste et pastilles qualité : jamais la couleur seule (texte + point).
- Bilingue FR/WO ; contenu wolof géré humainement.
