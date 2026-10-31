## Objet

<!-- Pourquoi ce changement ? Lien avec le PRD (WE-xx / BE-xx) ou le besoin client. -->

## Changements

-

## Vérifications

- [ ] `pnpm run ci` passe en local (dont `check:host`, types, lint, format, tests, build)
- [ ] Les droits passent par `src/lib/permissions.ts` (aucun test de rôle dans un composant)
- [ ] Les données affichées respectent le périmètre SCOOP (`src/lib/scope.ts`)
- [ ] Aucune couleur ni taille en dur : variables de `src/styles.css`
- [ ] Textes visibles : français, sans tiret typographique, faciles à traduire en wolof
- [ ] Code réutilisé plutôt que dupliqué (composants de `components/app` et `components/auth`)
- [ ] Un test couvre la règle métier ou de sécurité ajoutée
- [ ] Aucun secret, aucune donnée personnelle réelle, aucune donnée sensible dans les journaux
- [ ] Si `vite.config.ts` ou `vercel.json` change : preset Nitro aligné sur Vercel (pas de `dist`, sortie `.vercel/output`)

## Sécurité

<!-- Nouvelle entrée utilisateur, nouvel export, nouvelle permission, nouvelle dépendance ? Détailler les risques. Sinon : « Sans impact ». -->

## Captures

<!-- Téléphone (360 px) et ordinateur pour tout changement d'interface. -->
