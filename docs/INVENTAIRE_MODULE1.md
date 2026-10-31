# Inventaire Module 1 — dépôt `mbay-diaay`

Date : 31 octobre 2026. Source : proto `/Users/moha/Dev/Mbay Diaay`, borné pour ce dépôt.

## Inclus (routes)

| Route | Rôle |
|---|---|
| `/`, `/login`, `/mot-de-passe-oublie`, `/invitation` | Auth + tableau de bord |
| `/cooperative`, `/cooperatives`, `/cooperatives/$id` | Coopérative(s) |
| `/equipe` | Membres / équipe |
| `/producteurs`, `/producteurs/$id` | Producteurs (sans liens M4/M5) |
| `/dossiers`, `/dossiers/$id` | Dossiers producteurs |
| `/organisations`, `/organisations/$id` | Organisations / GIE |
| `/cotisations`, `/reunions`, `/reunions/$id`, `/documents` | Vie coopérative |
| `/rapports`, `/qualite/*` | Rapports + qualité |
| `/utilisateurs`, `/comptes`, `/appareils`, `/referentiels`, `/imports`, `/donnees`, `/audit` | Administration |

## Socle partagé conservé

- `src/lib/permissions.ts`, `scope.ts`, `store.ts`, `mock/*` (données mock encore riches ; UI M2–M5 retirée)
- `src/lib/i18n/`, shell (`AppShell`, nav, palette)
- Leaflet **lazy** uniquement sur mini-carte fiche producteur (pas d’écran `/carte`)
- Vercel + Nitro `preset: "vercel"`, `.env.production` → `VITE_DEMO_MODE`

## Exclus (routes retirées)

`/stocks`, `/credits`, `/ventes`, `/charges`, `/exploitation`, `/plans`, `/plans/$id`, `/campagnes`, `/calendriers`, `/calendriers/$id`, `/suivi`, `/carte`, `/parcelles/$id`

## Notes

- Des composants UI orphelins M2–M5 peuvent encore exister sous `src/components/app/` (non branchés au menu) : nettoyage ultérieur possible sans urgence.
- Réintégration M2–M5 : depuis le proto, **par PR / module**.
