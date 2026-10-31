# Mbay Diaay — Module 1 (Administratif)

Plateforme d’administration des **SCOOP** pour la Zone des Niayes — client **CRADESC**.

Ce dépôt contient le **prototype web borné au Module 1** (données fictives en mémoire) : personnes et coopérative (membres, producteurs, dossiers, organisations, cotisations, réunions, documents), tableau de bord, qualité des données, imports, rapports et administration des accès. Les modules M2–M5 (commercial, exploitation, agronomique, SIG/carte) sont **hors menu** ici ; le proto complet reste sur `mbaydiaay-proto`.

**Guide Moha** : [`docs/MISSION_MODULE1_ET_TRELLO.md`](docs/MISSION_MODULE1_ET_TRELLO.md) · **Suivi Trello** : [`docs/suivi-trello/BOARD.md`](docs/suivi-trello/BOARD.md)

> Identité visuelle **provisoire** (tokens dans `docs/prd/design-tokens.json`). Aucune charte officielle reçue à ce jour.

---

> **Dépôt privé et confidentiel.** Il contient des documents du client (`docs/cadrage/`) et un prototype à données fictives. Ne pas le rendre public ni en partager des extraits sans l'accord du CRADESC. Droits : voir `LICENSE`.

## Prérequis

- **Node.js** **22.x** (pin Vercel / `engines.node`)
- **pnpm** 11+ (`npm install -g pnpm` ou `corepack enable`)

Vérifier :

```sh
node -v
pnpm -v
```

---

## Démarrage local

```sh
cd "/chemin/vers/Mbay Diaay"
pnpm install
pnpm dev
```

L’app s’ouvre en général sur [http://localhost:8080](http://localhost:8080) (le port exact s’affiche dans le terminal).

Autres commandes utiles :

> En local, on utilise pnpm (`pnpm-lock.yaml`, réglages dans `pnpm-workspace.yaml`). Ne pas lancer `npm install`.

| Commande       | Rôle                                  |
| -------------- | ------------------------------------- |
| `pnpm dev`     | Serveur de développement (hot reload) |
| `pnpm build`   | Build de production                   |
| `pnpm preview` | Prévisualiser le build                |
| `pnpm test`    | Tests Vitest                          |
| `pnpm lint`    | ESLint                                |
| `pnpm format`  | Prettier                              |

---

## Connexion (mode démonstration)

| **Guide de développement** (démarrer, Git, qualité et CI, sécurité, authentification, bilingue, architecture) | [`docs/DEVELOPPEMENT.md`](docs/DEVELOPPEMENT.md) |

Un bandeau **« Mode démonstration »** rappelle que les données sont fictives et **réinitialisées au rechargement** de la page.

---

## Stack

- **React 19** + **TypeScript**
- **TanStack Start / Router / Query**
- **Vite 8** + **Tailwind CSS 4**
- **Leaflet** (carte, chargée en lazy après mount — compatible SSR)
- UI : composants type shadcn / Radix

Les permissions UI passent par `src/lib/permissions.ts` (stand-in d’un futur endpoint serveur). Les données vivent dans `src/lib/mock` et `src/lib/store.ts`.

---

## Structure du dépôt

```text
/
├── src/                 # Application web
│   ├── routes/          # Pages (TanStack Router)
│   ├── components/      # UI + shell + carte
│   ├── lib/             # store, mock, permissions
│   └── styles.css       # tokens CSS (primitive → semantic → component)
├── public/              # Assets statiques (favicon, robots)
├── docs/
│   ├── cadrage/         # Briefs, notes, présentations
│   ├── prd/             # PRD web / API / mobile + design-tokens
│   └── notes/
├── tools/               # Scripts (ex. import dry-run)
└── data/
    ├── fixtures/        # Jeux de données fictifs JSON
    └── revue-doublons/  # Local / confidentiel (ignoré par git)
```

Le code applicatif reste à la **racine** ; `docs/`, `tools/` et `data/` regroupent le cadrage et les outils hors runtime.

---

## Documentation utile

| Document                                         | Emplacement                                                                                      |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| PRD Web                                          | [`docs/prd/PRD_Web_Mbay_Diaay_v0.1.md`](docs/prd/PRD_Web_Mbay_Diaay_v0.1.md)                     |
| PRD Backend / API                                | [`docs/prd/PRD_Backend_API_Mbay_Diaay_v0.1.md`](docs/prd/PRD_Backend_API_Mbay_Diaay_v0.1.md)     |
| Design tokens                                    | [`docs/prd/design-tokens.json`](docs/prd/design-tokens.json)                                     |
| Brief de cadrage                                 | [`docs/cadrage/Brief_cadrage_Mbay_Diaay_v0.1.md`](docs/cadrage/Brief_cadrage_Mbay_Diaay_v0.1.md) |
| Roadmap prototype                                | [`roadmap.md`](roadmap.md)                                                                       |
| Règles projet (agents)                           | [`AGENTS.md`](AGENTS.md)                                                                         |
| **État du projet** (fait, à faire, propositions) | [`docs/ETAT_DU_PROJET.md`](docs/ETAT_DU_PROJET.md)                                               |

---

## Conventions à respecter

- **Couleurs / tailles / polices** : uniquement via les variables CSS de `src/styles.css` (miroir de `design-tokens.json`). Pour une nouvelle charte, ne modifier que le bloc **primitive**.
- **Permissions** : lire `src/lib/permissions.ts` — ne jamais hardcoder des contrôles de rôle dans les composants.
- **Carte** : n’importer Leaflet que via `React.lazy` après le montage client.

---

## Statut

Prototype fonctionnel pour démonstration et recette interne. L'interface sera **bilingue français / wolof** (mise en œuvre à planifier). La bascule vers l’API réelle et le dépôt principal du projet interviendront dans une phase suivante.

---

## Licence

Logiciel propriétaire, tous droits réservés (voir [`LICENSE`](LICENSE)). Contribuer : [`CONTRIBUTING.md`](CONTRIBUTING.md). Sécurité : [`SECURITY.md`](SECURITY.md).
