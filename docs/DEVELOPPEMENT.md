# Guide de développement Mbay Diaay

Un seul document pour toutes les règles de l'équipe. Les chapitres de la partie A valent pour **tous les composants** du projet (web aujourd'hui, backend et mobile ensuite). Chaque composant ajoute **un chapitre** à ce guide quand il démarre, sans créer de nouveau fichier.

## Sommaire

**A. Règles communes**
1. [Démarrer](#1-démarrer)
2. [Git et travail à plusieurs](#2-git-et-travail-à-plusieurs)
3. [Qualité, tests et CI/CD](#3-qualité-tests-et-cicd)
4. [Sécurité](#4-sécurité)
5. [Authentification](#5-authentification)
6. [Interface bilingue français et wolof](#6-interface-bilingue-français-et-wolof)

**B. Application web**

7. [Architecture web](#7-architecture-web)
8. [Écrans, dialogues et champs](#8-écrans-dialogues-et-champs)

**C. Backend** : [chapitre à rédiger](#c-backend)
**D. Mobile** : [chapitre à rédiger](#d-mobile)

Autres documents : besoins fonctionnels dans [`docs/prd/`](prd/), avancement dans [`ETAT_DU_PROJET.md`](ETAT_DU_PROJET.md).

---

# A. Règles communes

## 1. Démarrer

| Outil | Version | Vérification |
|---|---|---|
| Node.js | **22.x** (LTS Active ; pin Vercel + `engines` / `.nvmrc`, pas `>=22`) | `node -v` |
| pnpm | 11 ou plus | `pnpm -v` (sinon `corepack enable`) |
| Git | récent | `git --version` |

Le seul gestionnaire de paquets est **pnpm**. Jamais `npm install` ni `bun install` : cela crée un second fichier de verrouillage.

```sh
git clone <adresse-du-depot> mbay-diaay && cd mbay-diaay
pnpm install              # respecte pnpm-lock.yaml
cp .env.example .env.local
pnpm dev                  # http://localhost:8080
```

Il n'y a pas de serveur : les données sont fictives, en mémoire, et se réinitialisent au rechargement. La page de connexion propose quatre comptes de démonstration, un par rôle.

| Commande | Rôle |
|---|---|
| `pnpm dev` | Serveur de développement |
| `pnpm typecheck` | Vérification TypeScript |
| `pnpm lint` / `pnpm lint:fix` | ESLint |
| `pnpm format` / `pnpm format:check` | Prettier |
| `pnpm test` / `pnpm test:watch` | Tests Vitest |
| `pnpm build` | Build de production |
| `pnpm run ci` | Tout ce que la CI exécute, dans le même ordre |

| Problème | Solution |
|---|---|
| Page blanche « Chargement » | Arrêter le serveur, `pnpm install`, relancer `pnpm dev` |
| `ERR_PNPM_OUTDATED_LOCKFILE` | `pnpm install` puis commiter `pnpm-lock.yaml` |
| Port 8080 occupé | `pnpm dev --port 8081` |
| Erreur de types sur une route | `src/routeTree.gen.ts` périmé : lancer `pnpm dev` ou `pnpm build` |

## 2. Git et travail à plusieurs

### Messages de commit

[Conventional Commits](https://www.conventionalcommits.org/fr/), **en français**, au présent de l'impératif :

```text
type(périmètre): sujet court (72 caractères max, sans point final)

Pourquoi ce changement (le « quoi » se lit dans le diff).
```

- **Types** : `feat`, `fix`, `refactor`, `style` (mise en forme pure), `perf`, `test`, `docs`, `data` (fixtures, import), `i18n`, `build` (dépendances, pnpm), `chore`.
- **Périmètres** : `shell`, `dashboard`, `producteurs`, `organisations`, `carte`, `parcelles`, `doublons`, `alertes`, `corrections`, `imports`, `rapports`, `utilisateurs`, `comptes`, `appareils`, `referentiels`, `audit`, `permissions`, `store`, `ui`, `auth`, `i18n`, `tokens`, puis `api` et `mobile` plus tard.
- Exemples : `fix(alertes): appliquer le périmètre SCOOP à la file des alertes`, `style: reformater le dépôt avec Prettier`.
- Changement cassant : `!` après le périmètre et un paragraphe `BREAKING CHANGE:`.

### Règles

- **Un commit = une intention.** Pas de « Changes » ni de « WIP » sur `main`.
- Un reformatage de masse (`pnpm format`) se commite **seul**.
- `main` reste toujours dans un état qui compile : tests et build verts.
- Branches courtes `type/sujet` (`feat/otp-email`), fusion par pull request.
- **Ne jamais réécrire l'historique publié** : ni `push --force`, ni rebase, amend ou squash de commits poussés.
- Aucun fichier confidentiel : `data/revue-doublons/`, bases CRADESC réelles, `.env*`, jetons.
- Un commit créé avec l'aide d'un agent se termine par la ligne `Co-Authored-By:` fournie par l'outil.

### Plusieurs personnes ou agents dans le même dossier

1. Annoncer à l'avance les fichiers que l'on va modifier.
2. **Relire un fichier juste avant de l'éditer** s'il a pu bouger.
3. Pas de `git add -A` : indexer ses propres fichiers (`git add chemin/…`).
4. Pas de `pnpm format` sur tout le dépôt ni d'installation de dépendances sans prévenir : formater uniquement ses fichiers (`pnpm exec prettier --write <fichiers>`).

## 3. Qualité, tests et CI/CD

### Définition de « terminé »

1. `pnpm run ci` passe en local.
2. Droits et périmètre SCOOP respectés, avec un test pour toute règle ajoutée.
3. Écran vérifié sur téléphone (360 px) et ordinateur, états vide, chargement et erreur compris.
4. Textes en français, sans tiret typographique, faciles à traduire.
5. Code dupliqué factorisé ; aucune couleur ni taille en dur.
6. La PR remplit sa liste de contrôle (`.github/PULL_REQUEST_TEMPLATE.md`) et décrit l'impact sécurité.

### Tests

| Niveau | Où | Ce qu'on teste |
|---|---|---|
| Règles métier et sécurité (Vitest) | `src/test/*.test.ts` | Droits par rôle, périmètre, fusion réversible, corrections, authentification, import |
| Routage et rendu (Testing Library) | `src/test/app-routing.test.tsx` | Chaque route se résout |
| Parcours complet dans un navigateur (Playwright) | `e2e/*.spec.ts` | Connexion avec code, droits et périmètre par rôle, demande de correction approuvée, carte, fusion de doublons, import et export, téléphone 360 px |

**Lancer les parcours** : `pnpm e2e:install` (une fois : télécharge Chromium), puis `pnpm e2e`. Le serveur de développement démarre tout seul sur le port 4173 ; avec `E2E_BASE_URL=http://localhost:8080 pnpm e2e` on vise un serveur déjà lancé. Chaque test ouvre un navigateur neuf : les données de démonstration sont en mémoire et repartent de zéro. En cas d'échec, `pnpm exec playwright show-trace test-results/<test>/trace.zip` rejoue le parcours pas à pas. Le code de vérification de la démonstration est lu à l'écran (encadré « courriel simulé »), comme le ferait une personne.

On teste d'abord les **règles** (fonctions de `lib/`), rapides et stables ; l'interface reste mince. Chaque bug corrigé reçoit un test. Pas de dépendance à l'heure réelle, au réseau ou à l'ordre d'exécution. Un test de sécurité qui échoue bloque la fusion.

### Règles automatiques

TypeScript strict (`exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`) : ne pas contourner par `any` ou `as`. ESLint interdit les tirets cadratins et demi-cadratins dans le texte visible. Prettier impose un seul style.

### Intégration continue (GitHub Actions)

| Workflow | Déclencheur | Contrôles |
|---|---|---|
| `ci.yml`, job **verify** | PR et poussée sur `main` | `typecheck`, `lint`, `format:check`, `test`, `build`, avec `--frozen-lockfile` |
| `ci.yml`, job **e2e** | PR et poussée sur `main` | `pnpm e2e` : parcours dans Chromium (rapport conservé 7 jours en cas d'échec) |
| `ci.yml`, job **security** | Idem | `pnpm audit` (niveau élevé, production), recherche de secrets dans tout l'historique |
| `ci.yml`, job **dependency-review** | PR | Refus d'une nouvelle dépendance vulnérable (dépôt privé : demande GitHub Advanced Security, sinon retirer le job) |
| `codeql.yml` | PR, `main`, chaque lundi | Analyse statique de sécurité |
| `dependabot.yml` | Hebdomadaire | Mises à jour groupées, délai de 3 jours avant adoption |

### Réglages GitHub à faire une fois (par la personne propriétaire)

Cases à cocher dans *Settings* du dépôt, dans cet ordre :

1. **Visibilité** : le dépôt reste **privé** (il contient des documents confidentiels du client dans `docs/cadrage/`).
2. **Branches** : règle de protection sur `main` : relecture requise (1), contrôles `verify` et `security` requis, branche à jour avant fusion, poussée forcée et suppression interdites, historique linéaire.
3. **Fusion** : n'autoriser que « Squash and merge », titre de la PR repris comme message de commit (donc au format `type(périmètre): sujet`).
4. **Sécurité** : activer Dependabot alerts, Dependabot security updates, et Secret scanning avec Push protection si le forfait le permet.
5. **Actions** : permissions du jeton en lecture seule par défaut ; autoriser seulement les actions GitHub et celles déjà utilisées.
6. **Accès** : donner le rôle *Write* aux contributeurs, *Admin* à une seule personne ; activer l'authentification à deux facteurs pour tous.

### Livraison continue (à écrire avec l'hébergeur)

- **Protection de `main`** : CI verte obligatoire, une relecture minimum, pas de poussée forcée. Le fichier `.github/CODEOWNERS` impose la relecture de la personne responsable pour `src/lib/auth/`, `src/lib/permissions.ts`, `.github/`, `package.json` et `pnpm-lock.yaml`.
- **Prévisualisation** de chaque PR sur une adresse temporaire pour la recette.
- **Production** depuis `main` après validation, `VITE_DEMO_MODE=false`, secrets uniquement chez l'hébergeur.
- **Versions** : étiquette `vMAJEUR.MINEUR.PATCH` ; retour arrière en redéployant l'étiquette précédente.
- **Hébergeur actuel : Vercel** (Nitro `preset: "vercel"`, fichier `vercel.json`, sortie `.vercel/output`). Un changement d'hébergeur exige de changer le preset **et** la config d'hébergement dans le même lot (`pnpm check:host`).

### Revue de code, par ordre de priorité

1. Une donnée peut-elle être vue ou modifiée hors de son périmètre ou de son droit ?
2. Une entrée est-elle validée, une sortie neutralisée (CSV, HTML) ?
3. Une donnée sensible fuit-elle (journal, URL, export, message d'erreur) ?
4. Ce code existe-t-il déjà ailleurs ?
5. Le test échouerait-il si la règle était cassée ?
6. **Déploiement** : le preset Nitro (`vite.config.ts`) correspond-il à l'hébergeur (`vercel.json`) ? Pas de sortie `dist` attendue pour TanStack Start + Nitro. Lancer `pnpm check:host` si l'un des deux fichiers change.

## 4. Sécurité

La sécurité est une exigence première : les données concernent des personnes (noms, téléphones, CNI, parcelles).

**Principe : l'interface n'est jamais une protection.** Tout ce que le client masque ou désactive doit aussi être refusé par le serveur (PRD BE-04 : contrôle du triplet rôle, action, périmètre à chaque requête).

| # | Règle |
|---|---|
| 1 | **Aucun secret dans le dépôt** : pas de clé, jeton, mot de passe réel, `.env`. Variables locales dans `.env.local` (ignoré). La CI cherche les secrets dans tout l'historique. |
| 2 | **Aucune donnée personnelle réelle** dans le dépôt, les fixtures ou les tests. Les bases CRADESC restent hors dépôt. |
| 3 | **Droits** uniquement via `src/lib/permissions.ts`, jamais de test de rôle dans un composant. |
| 4 | **Périmètre SCOOP** : toute donnée affichée passe par `src/lib/scope.ts`, y compris l'accès direct par URL et la recherche globale. Un test par rôle le vérifie. |
| 5 | **Données sensibles masquées par défaut** (téléphone, CNI). Affichage en clair = droit dédié + ligne au journal d'audit. |
| 6 | **Exports** : un export nominatif demande un droit dédié et est journalisé ; les cellules CSV qui commencent par `=`, `+`, `-`, `@` sont neutralisées. |
| 7 | **Entrées validées** (format, longueur, plage) ; fichiers importés contrôlés ligne par ligne, taille et type vérifiés. |
| 8 | **Pas de HTML injecté** : jamais `dangerouslySetInnerHTML` ni `innerHTML` avec une donnée non maîtrisée. |
| 9 | **Journaux** : jamais de mot de passe, code OTP, jeton, CNI ou téléphone complet. Les erreurs du navigateur passent par `src/lib/error-reporting.ts` : chemin de la page sans paramètres, e-mails, téléphones et numéros d'identité masqués, une même erreur une fois par dix secondes. Aucun envoi tant que `VITE_ERROR_REPORT_URL` est vide ou qu'aucun service n'est enregistré (`addErrorSink`). |
| 10 | **Dépendances** : ajout justifié dans la PR, versions figées, installation `--frozen-lockfile`, délai de 24 h avant adoption d'une version fraîche (`pnpm-workspace.yaml`). Une dépendance servie hors registre (archive par URL, cas de `xlsx`) est une exception à documenter. |
| 11 | **Actions GitHub** : droits minimaux, jamais de secret dans les journaux. |

**À faire avant la production**

| Sujet | Action |
|---|---|
| Session | Cookie `HttpOnly` posé par le serveur ; plus rien de sensible dans `localStorage` |
| En-têtes HTTP | CSP (qui autorise les tuiles Esri), `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors` |
| CSRF | Jetons ou `SameSite` strict sur toute requête qui modifie des données |
| Limitation de débit | Par adresse IP et par compte, sur l'authentification et les exports |
| Chiffrement | CNI et sauvegardes chiffrées au repos |
| Mode démonstration | `VITE_DEMO_MODE=false` |
| Journal d'audit | Stockage inaltérable côté serveur (aujourd'hui en mémoire) |
| Actions GitHub | Épingler les versions par empreinte de commit |

Signaler une faille : ne pas ouvrir de ticket public ; prévenir directement la personne responsable de la sécurité, avec les étapes pour reproduire, sans donnée réelle.

## 5. Authentification

**Décision du 23 octobre 2026** : connexion par **adresse e-mail et mot de passe, puis code à usage unique (OTP) envoyé par e-mail**. Le SMS est reporté (coût) et viendra comme second canal d'envoi du même code. Cela **remplace** l'exigence BE-10 du PRD Backend (téléphone et SMS, sans mot de passe) ; le PRD est à mettre à jour.

```text
Connexion      e-mail + mot de passe  →  code reçu par e-mail  →  session ouverte
Mot de passe   e-mail  →  code reçu par e-mail  →  nouveau mot de passe  →  connexion
oublié
```

Pages : `/login` et `/mot-de-passe-oublie`. Code : `src/lib/auth/` (règles, service) et `src/components/auth/` (mise en page, saisie du code, champ de mot de passe).

| Sujet | Règle (valeurs dans `src/lib/auth/policy.ts`, à reproduire côté serveur) |
|---|---|
| Code OTP | 6 chiffres, générateur cryptographique, usage unique, valable 10 minutes |
| Essais de saisie | Code détruit après 5 erreurs |
| Renvoi | 60 s entre deux envois, 4 envois au maximum |
| Échecs de connexion | 5 échecs, blocage de 15 minutes, **y compris pour une adresse inconnue** |
| Messages | Identiques pour « compte inconnu », « mauvais mot de passe » et « compte désactivé » ; la réinitialisation répond toujours pareil (pas d'énumération de comptes) |
| Mot de passe | 12 caractères minimum, majuscule, minuscule, chiffre, pas de mot courant, sans prénom ni nom de l'adresse ; vérifié aussi côté serveur ; stocké avec une empreinte lente salée (Argon2id) |
| Réinitialisation | Jeton à usage unique, 10 minutes ; les sessions ouvertes sont invalidées |
| Session | 30 minutes ; le navigateur ne garde que nom, e-mail, rôle et échéance, les droits sont recalculés |

**Contrat avec le serveur.** L'interface ne parle qu'à l'interface `AuthService` (`src/lib/auth/types.ts`). Le service actuel fonctionne en mémoire ; pour brancher l'API, écrire un client HTTP qui implémente la même interface et le substituer dans `src/lib/auth/index.ts`. Aucun écran ne change.

| Méthode | Appel suggéré | Réponse |
|---|---|---|
| `signIn` | `POST /v1/auth/connexion` | Identifiant de défi, adresse masquée, échéances. Envoie le code. |
| `verifyOtp` | `POST /v1/auth/otp/verifier` | Utilisateur ; pose la session (cookie `HttpOnly`, `Secure`, `SameSite=Lax`) |
| `resendOtp` | `POST /v1/auth/otp/renvoyer` | Nouvelles échéances |
| `requestPasswordReset` | `POST /v1/auth/mot-de-passe/demande` | Toujours 202, même forme que le compte existe ou non |
| `verifyResetCode` | `POST /v1/auth/mot-de-passe/code` | Jeton de réinitialisation |
| `resetPassword` | `POST /v1/auth/mot-de-passe/nouveau` | 204 |

Codes d'erreur : `invalid_credentials`, `locked`, `otp_invalid`, `otp_expired`, `otp_attempts`, `rate_limited`, `weak_password`, `reset_expired`, `unavailable`. Le serveur limite aussi les requêtes par adresse IP et journalise chaque échec sans consigner mot de passe ni code.

**En-têtes de sécurité** (`vercel.json`) : HSTS, `nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: no-referrer`, `Permissions-Policy` fermée, `X-Robots-Tag: noindex`, et une politique `Content-Security-Policy` en **mode rapport seulement** (`Content-Security-Policy-Report-Only`) — les alertes console ne bloquent pas l'app. Elle autorise les tuiles de carte Esri (`server.arcgisonline.com` : World Street Map pour le plan, World Imagery pour le satellite), fixe `media-src 'self'` et `frame-src 'none'`. Pas de `tile.openstreetmap.org` (les serveurs bénévoles OSM bloquent les apps hors politique d'usage). **Prototype** : ne pas ouvrir la CSP à `vercel.live` ; désactiver la barre Feedback / Vercel Toolbar dans le Dashboard du projet (Settings → Toolbar / Comments) pour supprimer les rapports `feedback.js`, iframes et sons `data:audio` (AbortError `play()`/`pause()`). Elle passera en mode bloquant quand les scripts en ligne du rendu serveur recevront un nonce. Toute nouvelle ressource externe (police, service d'images, adresse de `VITE_ERROR_REPORT_URL`) s'ajoute à la politique dans le même lot.

**Mode démonstration** (`VITE_DEMO_MODE`, voir `.env.example`) : `true` affiche huit comptes fictifs, le mot de passe commun et un encadré « Courriel simulé » avec le code ; `false` masque ces aides **et** refuse toute connexion, pour qu'un build publié sans API ne laisse aucune porte ouverte. **Fermé par défaut** : la variable absente ferme le mode dans un build publié (elle reste ouverte en développement local) ; un déploiement de production doit la fixer à `true` ou `false`, sinon `pnpm build` échoue (`scripts/check-env.mjs`).

**SMS plus tard** : champ `canal` (`email` ou `sms`) à l'envoi du code, numéro vérifié sur le compte, choix du canal dans le profil. Mêmes règles de code. Coût et nom d'expéditeur à valider avec le client (BE-93).

## 6. Interface bilingue français et wolof

**Décision du 23 octobre 2026** : l'application est proposée en français et en wolof, le wolof étant la langue principale d'usage visée. **Plan validé le 23 octobre 2026** (section 6.7) : les six décisions sont acceptées ; la mise en œuvre démarre (mécanisme puis extraction écran par écran).

### 6.1 État des lieux (mesuré le 23 octobre 2026)

| Élément | Volume | Remarque |
|---|---|---|
| Écrans et composants avec du texte visible | 35 fichiers | `producteurs.$id`, `imports`, `carte`, `organisations.$id`, `appareils`, `comptes`, `audit` en tête |
| Textes dans le balisage et les attributs (titres, libellés, aides, champs) | environ 570 | hors composants `ui/` génériques |
| Notifications (`toast`) | 51 | |
| Entrées de journal écrites en français dans le code (`audit(...)`) | 45 | texte libre stocké en français, **non traduit** (décision du 25 octobre) : voir 6.3 |
| Pluriels faits à la main (`(s)`) | 272 dans 37 fichiers | à remplacer par une vraie règle de pluriel |
| Messages construits dans `lib/` | permissions, rôles, authentification, rapports, import (environ 50 libellés de colonnes et 40 messages de contrôle) | |
| Mise en forme de dates et de nombres | 9 appels | `Intl` : voir 6.5 |
| Valeurs de la base qui servent aussi d'affichage | qualité (`validé`, `à vérifier`…), statuts, types d'organisation, familles de cultures | le mot français est l'identifiant : voir 6.3 |

### 6.2 Principes (inchangés)

- **Aucun texte visible en dur dans les composants** : tout passe par un dictionnaire (clés stables, un fichier par langue, **français = référence**).
- **Wolof écrit** : orthographe officielle (CLD, alphabet latin), traduit ou relu par une personne locutrice, **jamais automatique**. Les entrées du glossaire (6.6) sont validées avant toute traduction d'écran.
- **Repli** sur le français si une clé manque, jamais une clé brute.
- **Choix de la langue** : sélecteur dans l'en-tête et sur la connexion, mémorisé par utilisateur.
- **Longueur** : prévoir +30 % de texte dans les boutons, onglets et pastilles (les écrans sont déjà vérifiés à 360 px).
- **Dès maintenant** : pas de phrase construite par concaténation, pas de pluriel fait à la main, libellés courts.

### 6.3 Choix et conception

**Mécanisme : un module maison, `src/lib/i18n/`** (environ 150 lignes, aucune dépendance). Raisons : deux langues et environ 700 textes ne justifient pas une bibliothèque ; les clés typées viennent directement du dictionnaire français ; le remplacement par une bibliothèque reste possible plus tard car les écrans n'utilisent que `t(...)`.

| Option | Pour | Contre |
|---|---|---|
| **Module maison** (recommandé) | Aucune dépendance, clés et paramètres typés, repli et tests faits sur mesure | À écrire et maintenir (pluriels, paramètres) |
| `react-i18next` | Très répandu, pluriels et espaces de noms prêts | Environ 40 Ko, clés non typées sans réglage, rendu serveur à configurer |
| Paraglide (inlang) | Typé, compilé, très léger | Chaîne de compilation en plus, moins de recul sur TanStack Start |

Conception :

- **Dictionnaires** `fr.ts` (référence) et `wo.ts` : objets plats, clés `domaine.écran.élément` (par exemple `audit.filtres.plus`). Le type des clés vient de `fr.ts` ; une clé inconnue ne compile pas.
- **Appel** : `t("audit.entrees", { count })` ; paramètres nommés `{nom}`, jamais de texte collé. Le type vérifie que les paramètres fournis sont ceux de la phrase.
- **Pluriel** : variantes `.un` et `.autre` choisies par `Intl.PluralRules` ; le wolof n'a qu'une forme, `wo.ts` n'a donc que `.autre`.
- **Langue courante** : fournisseur React, valeur mémorisée dans `localStorage` (`mbd.locale`) puis dans le profil de l'utilisateur côté serveur ; **la seule chose mémorisée est `fr` ou `wo`**, aucune donnée personnelle ; `<html lang>` suit (`fr` ou `wo`). Rendu serveur en français, bascule au chargement (un cookie lu côté serveur supprimera ce clignotement avec le vrai serveur).
- **Valeurs de la base** (qualité, statuts, types, familles) : le mot français reste l'**identifiant stable**, l'affichage passe par `tEnum("qualite", valeur)`. Un identifiant neutre (`validated`) est une évolution possible, à décider avec le chantier d'import réel.
- **Journal d'audit** : **conservé en français**, y compris quand l'interface est en wolof (décision du 25 octobre 2026). Les entrées restent du texte libre stocké tel quel : aucune conversion en événements structurés n'est nécessaire pour le bilingue. Seuls les libellés de l'écran du journal (titres, filtres, boutons) sont traduits. À revoir si le client demande un journal lisible en wolof.
- **Messages de `lib/`** (authentification, import, rapports, permissions) : ils renvoient une clé et des paramètres, l'interface traduit. Un message n'est plus un texte français. Les messages d'authentification (`lib/auth/messages.ts`) fonctionnent déjà par code d'erreur : leur conversion est courte.
- **Noms de cultures** : le référentiel reçoit une colonne par langue (`fr`, `wo`) ; villages et noms de SCOOP ne se traduisent pas.
- **Fichiers d'échange** (modèle d'import, export Excel, CSV) : **en-têtes français fixes** (contrat de données) ; les synonymes acceptés à l'import peuvent inclure des en-têtes wolof plus tard.
- **Garde-fous** : (1) test unitaire : toute clé de `fr.ts` existe dans `wo.ts` ou figure dans la liste « à traduire » ; mêmes paramètres dans les deux langues ; aucune valeur vide ; (2) règle ESLint qui interdit le texte brut dans le balisage, activée fichier par fichier au fur et à mesure de l'extraction ; (3) un scénario Playwright en wolof (changement de langue, titre traduit, choix conservé après rechargement).

### 6.4 Répartition entre les deux sessions

Les deux phases d'extraction touchent presque tout `src/` : **aucune autre fonctionnalité n'est développée pendant la phase 2** (une demi-journée à une journée par session, estimation à confirmer).

| Lot | Contenu | Qui |
|---|---|---|
| Mécanisme | `src/lib/i18n/` (fournisseur, `t`, pluriel, repli, `tEnum`), types, `fr.ts` vide, `wo.ts` vide, test des clés, sélecteur de langue, règle ESLint | A |
| Outils | `pnpm i18n:export` (tableur CSV : clé, français, wolof, écran, longueur) et `pnpm i18n:import` (contrôle des paramètres, écrit `wo.ts`), `pnpm i18n:coverage` | A |
| Écrans pilotes | `audit.tsx` (A, libellés seulement) et `login.tsx` (B) : valident le mécanisme avant le reste | A et B |
| Écrans métier | tableau de bord, producteurs, organisations, qualité (3 pages), comptes, appareils, utilisateurs, référentiels, imports, sauvegarde, rapports, journal | A |
| Socle | coquille (`AppShell`, navigation, recherche, filtres globaux), connexion et mot de passe oublié (`components/auth`, `lib/auth`), carte, parcelles, composants communs (`FormDialog`, `FormField`, `RowActions`, `FilterSelect`…), `permissions.ts`, `scope.ts`, pages d'erreur | B |
| Tests | `i18n.test.ts`, scénario Playwright en wolof, vérification à 360 px en wolof | A (tests), B (360 px) |

### 6.5 Dates, nombres et police

- **Nombres** : mesuré, `Intl` connaît `wo` (séparateur de milliers : point) mais le résultat varie selon le navigateur ; **recommandation : toujours le format `fr-SN`** (espace insécable) pour les nombres, afin que les tableaux se lisent pareil dans les deux langues.
- **Dates** : `Intl.DateTimeFormat("wo")` donne les jours et mois en wolof (« Àjjuma, 23 Okt, 2026 ») ; repli sur `fr-SN` si le navigateur ne supporte pas `wo` (test `supportedLocalesOf`).
- **Police** : vérifier ñ, ŋ, Ŋ, ó, é, ë, à dans la police embarquée sur téléphone d'entrée de gamme (Inter les gère ; contrôler le repli).
- **Audio** : lecture vocale des textes en option, hors périmètre de ce plan (proposition P1 de `ETAT_DU_PROJET.md`).

### 6.6 Glossaire métier (colonne wolof à remplir par la personne qui relit)

| Terme français | Où il sert | Wolof (à valider) |
|---|---|---|
| producteur, productrice | annuaire, fiches | |
| SCOOP, coopérative | filtres, tableaux | |
| organisation de base, GIE, section, association, groupement | organisations | |
| parcelle, superficie, hectare, contour | carte | |
| campagne, culture, famille de cultures | filtres, référentiels | |
| doublon, fusion, cas | qualité des données | |
| alerte, sévérité, à vérifier, validé | qualité des données | |
| demande de correction, approuver, refuser | corrections | |
| compte, liaison, appareil | administration | |
| référentiel, règle de contrôle, seuil | administration | |
| import, rapport à blanc, rejet | imports | |
| sauvegarde, export, restauration | sauvegarde | |
| journal d'audit, utilisateur, rôle, périmètre | administration | |
| tableau de bord, jeune, femme, handicap | tableau de bord | |

### 6.7 Étapes, critères et décisions

1. ~~**Validation du plan**~~ — **faite le 23 octobre 2026** (réponses ci-dessous).
2. **Mécanisme et écrans pilotes** (6.4) : critère : un écran pilote bascule vers un wolof d'essai (textes repères, sans vraie traduction) sans erreur de type ni de test.
3. **Extraction parallèle** des écrans selon la répartition ; chaque lot est livré avec `pnpm run ci` et `pnpm e2e` verts.
4. **Glossaire puis première traduction** : export CSV, traduction ou relecture par une personne locutrice, import contrôlé.
5. **Recette** : textes les plus longs à 360 px, police, scénario Playwright en wolof, relecture écran par écran avec la personne locutrice. **Critère** : aucun texte allongé de 30 % par rapport au français ne déborde à 360 px. Il se vérifie **avant toute vraie traduction**, avec un wolof d'essai en pseudo-localisation (chaque texte français rallongé de 30 %, par exemple `[Producteurs ~~~]`), joué dans un scénario Playwright à 360 px sur les pages principales.

**Décisions validées** (reportées en section 7 de `ETAT_DU_PROJET.md`) :

| # | Question | Décision |
|---|---|---|
| 1 | Qui traduit et relit le wolof, et sous quel délai ? | Une personne locutrice et une relectrice ; le glossaire d'abord |
| 2 | Langue à la première visite : français, wolof, langue du navigateur ? | Français par défaut, choix mémorisé ensuite (`fr` ou `wo` seulement) |
| 3 | Journal d'audit : traduit à l'affichage (événements structurés) ou conservé en français ? | **Conservé en français** (décision du 25 octobre 2026) ; l'écran lui-même est traduit |
| 4 | Fichiers d'import et d'export : en-têtes français fixes ? | Oui |
| 5 | Nombres : toujours au format français (`fr-SN`) ? | Oui |
| 6 | Part de l'interface à traduire en premier ? | Carte blanche donnée : ordre fixé en 6.9 (connexion, coquille, tableau de bord, producteurs, qualité, puis le reste) |

**Risques** : texte wolof non relu affiché aux utilisateurs (le repli en français est visible et mesuré par `i18n:coverage`) ; variantes d'orthographe ; textes plus longs ; mots français qui servent d'identifiants dans les données ; traducteur indisponible (le glossaire et l'extraction avancent sans lui).

---

# B. Application web

### 6.8 Outils de suivi (prêts avant l'extraction)

- `pnpm i18n:coverage` : combien de clés françaises sont relues en wolof, en texte repère, à traduire ou sans entrée, par écran. Sort en erreur s'il manque une entrée.
- `pnpm i18n:inventory` (option `--md` pour un tableau) : textes visibles encore écrits en dur dans `src/routes` et `src/components` (texte du balisage, attributs `title`, `placeholder`, `aria-label`, `label`…, messages `toast`). Mesure du 25 octobre 2026 : **986 textes dans 41 fichiers**, dont les plus chargés `imports.tsx` (84), `producteurs.$id.tsx` (80), `dossiers.$id.tsx` (75), `equipe.tsx` (59), `carte.tsx` (54). C'est un minimum : les libellés construits dans `src/lib` (états, motifs, journal, rapports) ne sont pas comptés. L'extraction est terminée quand ce nombre tombe à zéro.
- Les deux outils lisent seulement : ils ne modifient ni `fr.ts` ni `wo.ts` et ne traduisent rien.

### 6.9 Ordre d'extraction et répartition finale (décidée le 25 octobre 2026)

Principe : l'extraction ne remplit que `fr.ts` (le français actuel, mot pour mot). Le wolof reste en texte repère tant qu'aucune personne locutrice n'a relu : **aucune traduction inventée**. Chaque lot se termine par `pnpm run ci` et `pnpm e2e` verts et un commit par écran ou famille d'écrans. Un seul agent modifie un fichier à la fois.

| Lot | Contenu | Qui | Critère de fin |
|---|---|---|---|
| L1 Pilotes | `login.tsx`, `mot-de-passe-oublie.tsx`, `components/auth/*`, messages de `lib/auth` ; `audit.tsx` (libellés) | B (auth), A (audit) | Bascule fr / wo sans erreur ; parcours de connexion en repère |
| L2 Coquille et accueil | `AppShell`, `nav.ts` (libellés), `CommandPalette`, `GlobalFilters`, pages d'erreur, libellés de rôles et de droits (`permissions.ts`), tableau de bord et cartes des modules | B (coquille, droits, erreurs), A (tableau de bord) | Menu et accueil entièrement en clés |
| L3 Producteurs | annuaire, fiche producteur, onglets Pièces et Plans | A | `i18n:inventory` à zéro sur ces fichiers |
| L4 Qualité | doublons, alertes, corrections, en-tête commun | A | idem |
| L5 Coopérative | Ma coopérative, Équipe, dossiers (liste, détail, circuit), plans, rapports | A | idem |
| L6 Terrain et socle | carte, fiche parcelle, composants communs (`FormDialog`, `FormField`, `RowActions`, `FilterSelect`, `DocumentList`), messages `scope.ts` et `reports.ts` côté B | B | idem |
| L7 Administration | utilisateurs, comptes, appareils, référentiels, imports, sauvegarde, organisations | A (utilisateurs, comptes, appareils, référentiels), B (imports, sauvegarde, organisations) | idem |
| L8 Messages du store | textes d'erreur renvoyés par `actions.*` (`fail("...")`) : à transformer en clés | A | aucune phrase française dans `store.ts` hors journal |
| L9 Recette | test à 360 px avec textes allongés de 30 % (pseudo-localisation), scénario Playwright en wolof, `i18n:export` pour la personne locutrice | B (360 px, e2e), A (export) | critère 6.7 point 5 |

Règles : lots L1 puis L2 d'abord (ils définissent les habitudes) ; L3 à L7 peuvent avancer en parallèle car chaque agent ne touche que ses fichiers ; aucune autre fonctionnalité pendant ce chantier. Le journal d'audit reste en français : ne pas extraire le texte des appels `audit(...)`.

## 7. Architecture web

React 19, TypeScript strict, TanStack Start (routage par fichiers), Tailwind 4. Données en mémoire jusqu'au branchement de l'API.

```text
src/
  routes/              Une page par fichier (URL = nom du fichier). Pas de logique métier.
  components/
    ui/                Briques génériques (boutons, champs, dialogues, interrupteur). Rien de métier.
    app/               Éléments métier partagés (AppShell, pastilles, filtres, menus de ligne, squelettes)
    auth/              Pages d'accès (mise en page, saisie du code, mot de passe)
    map/               Carte Leaflet, chargée à la demande
  lib/
    permissions.ts     Qui peut faire quoi (source unique des droits)
    scope.ts           Périmètre SCOOP : ce qu'un utilisateur a le droit de voir
    store.ts           État de l'application et actions
    auth/              Règles et service d'authentification
    io/                Import et export Excel
    reports.ts         Rapports, construits sur le périmètre
    mock/              Données fictives, à remplacer par l'API
    format.ts          Dates, nombres, masquage, export CSV
  hooks/               Hooks réutilisables
  styles.css           Variables de design (primitives, sémantiques, composants)
  test/                Tests Vitest
```

Sens des dépendances : `routes` → `components/app` et `components/auth` → `components/ui`, et tous vers `lib`. Une couche n'importe jamais celle du dessus : `lib` ne connaît ni composants ni routes ; `components/ui` ne connaît rien du métier.

**Règles**

1. **Droits** : `can(session, "permission")` ou `useCan(...)`. Jamais `role === "admin"`.
2. **Périmètre SCOOP** : toute liste ou fiche passe par `lib/scope.ts`. Un gestionnaire ne voit jamais, même par URL, un élément d'une autre SCOOP.
3. **Design** : couleurs, tailles et rayons viennent de `styles.css`. Aucune valeur hexadécimale ni pixel isolé. Une nouvelle charte ne modifie que le bloc « primitive ». Les placeholders utilisent `text-placeholder`.
4. **Réutiliser avant d'écrire** : chercher dans `components/app` et `components/ui` (pastilles, `FilterSelect`, `FilterPill`, `Segmented`, `FormField`, `RowActions`, squelettes, composants d'authentification). Si un bloc apparaît deux fois, l'extraire ; ajouter une variante plutôt que copier.
5. **Routes minces** : le calcul (filtrage, regroupement, validation) va dans `lib/`, testable sans interface.
6. **Données personnelles masquées** par défaut ; affichage en clair tracé.
7. **Carte** : Leaflet via `React.lazy`, après le montage client.
8. **Texte visible** : français, sans tiret typographique, voir chapitre 6.

## 8. Écrans, dialogues et champs

- **Dialogue** : titre, description d'une phrase, contenu, puis pied avec **Annuler à gauche, action principale à droite**. Il tient dans l'écran d'un téléphone. Le bouton principal dit l'action (« Approuver et appliquer », pas « OK »). Action destructrice : `AlertDialog` avec confirmation explicite.
- **Champ** : libellé visible (`FormField`), le placeholder ne le remplace jamais. Le placeholder montre un exemple réaliste, sans point de suspension ni ponctuation finale (`prenom.nom@organisation.sn`, `Nom, code ou village`).
- **Erreur** : elle dit quoi faire (« Saisissez une adresse e-mail valide. »), sous le champ ou dans une zone `role="alert"` (`FormMessage`).
- **Attributs** `autoComplete` justes : `username`, `current-password`, `new-password`, `one-time-code`.
- **Filtres** : `FilterSelect` (gris sans filtre actif, teinté sinon), `FilterPill` pour les pastilles rondes, `Segmented` pour les interrupteurs à choix exclusifs.
- **Attente** : squelettes (`components/app/skeletons.tsx`) plutôt que du texte « Chargement ».
- **Pas à pas pour ajouter un écran** : créer `src/routes/<nom>.tsx` entouré de `<AppShell perm="…" area="…">` ; déclarer la permission dans `permissions.ts` et l'ajouter au menu (`NAV` dans `AppShell.tsx`) ; filtrer par périmètre ; prévoir les états chargement, vide, erreur, téléphone ; ajouter un test ; journaliser les actions sensibles (`actions.audit`).

---

# C. Backend

Le backend vit dans le dépôt dédié **[mbay-diaay/mbay-diaay-api](https://github.com/mbay-diaay/mbay-diaay-api)** (VPS, `api.mbaydiaay.com`). Le front Module 1 reste sur Vercel.

| | |
|---|---|
| Pile | NestJS monolithe modulaire, TypeORM, PostgreSQL 16 + PostGIS, Redis + BullMQ, MinIO, Traefik v3 |
| Contrat | Préfixe `/v1`, OpenAPI `/v1/docs`, erreurs `{code,message,details}` — voir PRD Backend et `docs/API_ROUTES_M1.md` du repo API |
| Droits | Contrôle rôle / action / périmètre **sur chaque requête** (`AccessModule`) — les chapitres 2–5 de ce guide s’appliquent |
| Déploiement | Docker Compose + `infra/scripts/deploy.sh` (smoke + rollback tag) ; backups chiffrés 30 j (`backup.sh`) |
| Audit infra | `docs/AUDIT_INFRA_VPS.md` dans le repo API |

Lot 1 : health, auth OTP stub, routes Administratif stub, squelettes M2–M5. Persistence complète et SMS prod = lots suivants.

# D. Mobile

*À rédiger au démarrage de l'application mobile.* Reprendre ici : pile technique, stockage local sécurisé, mode hors connexion et synchronisation, compte et appareil, publication (voir `docs/prd/PRD_Mobile_Mbay_Diaay_v0.1.md`). Les chapitres 2 à 6 s'appliquent tels quels.
