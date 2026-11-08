# Modules M2–M5 Angular — portage hors déploiement

Date : 8 novembre 2026.

## Principe

Les écrans M2–M5 sont **portés dans `web-angular/`** pour préparation, mais **pas ouverts en production** :

1. `VITE_ENABLE_EXTRA_MODULES=false` dans `.env.production` → la garde `app-extra-module-gate` renvoie à `/`.
2. Le menu (`nav.ts`) garde les entrées en `soon: true` (non cliquables).
3. Activation **partie par partie** : flag local/preview à `true`, puis remplacer `soon(...)` par `entry({ to: "/…", … })` pour le module voulu.

## Routes

| Module | Routes |
|---|---|
| M2 Commercial | `/stocks`, `/credits`, `/ventes` |
| M3 Exploitation | `/charges`, `/exploitation` |
| M4 Agronomique | `/plans`, `/plans/:id`, `/campagnes`, `/calendriers`, `/calendriers/:id`, `/suivi` |
| M5 SIG | `/carte`, `/parcelles/:id` |

Source de vérité UI : proto `/Users/moha/Dev/mbaydiaay-proto` (et clone `Mbay Diaay`).

## Test local

```bash
cd web-angular
# .env.local
echo 'VITE_ENABLE_EXTRA_MODULES=true' >> .env.local
pnpm dev
```

Ouvrir les URLs directement (le menu reste « à venir » tant que `nav.ts` n’est pas ouvert).
