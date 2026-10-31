# Revue de code, axe B : sécurité, droits, authentification, menu, tests, livraison

Revue du 26 octobre 2026, dépôt au commit `c797904`. Chaque constat a été vérifié dans le code (fichier:ligne). Gravité : **critique** et **haute** bloquent toute mise en production ; **moyenne** à traiter avant ; **basse** au fil de l'eau. « Prototype » = acceptable tant que les données sont fictives.

## 0. Statut au 26 octobre 2026 (soir)

**Corrigé et poussé** (commits `4927294`, `3e894f1`, `8c0d494`, `6f1ef21`, `c2e28e9`, `d7b9abb`, `55373e2`) :

- Session falsifiable, changement de profil hors démonstration, rôle relu dans les comptes (fait par la session A dans `store.ts`, lot 0 store).
- `DEMO_MODE` fermé par défaut + contrôle du build de production (`scripts/check-env.mjs`) : **une variable `VITE_DEMO_MODE=true` ou `false` est désormais obligatoire dans les réglages de production de Vercel**, sinon `pnpm build` échoue.
- Injection de script dans les infobulles de la carte (échappement + test avec un nom piégé).
- En-têtes de sécurité (HSTS, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy, X-Robots-Tag) et CSP en mode rapport ; `robots.txt` fermé.
- Plafond des codes de réinitialisation, réponses identiques pour un compte inconnu, jeton d'invitation retiré de l'adresse.
- 59 actions du store gardées par le droit du rôle (`access()` / `requirePermission()`), un refus testé par rôle et par action avec son motif ; test qui interdit d'ajouter une action sans garde.
- Sélecteurs de lecture alignés sur « droit puis périmètre ».
- CI : les contrôles de `main` ne sont plus annulés ; horloge des tests figée (la bombe du 1er janvier 2027 est désamorcée).

**Reste ouvert** : archivage vérifié partout (action `requireWritableScoop`, session A), jeton d'invitation et verrouillage par IP côté serveur, CSP bloquante (nonce), épinglage des actions GitHub par empreinte, audit des dépendances de développement, documentation périmée (README, DEVELOPPEMENT 163), utilitaires de test partagés et parcours de refus générés depuis la matrice (lot 4), hooks `useScoped*` (lot 2).

## 1. Droits et périmètre (store, sélecteurs)

| Gravité | Constat | Fichier:ligne | Action | Resp. |
|---|---|---|---|---|
| haute (production) | Session falsifiable : `restoreSession` reprend `role`, `email`, `expiresAt` du `localStorage["mbd.session"]` sans recalculer le rôle depuis le compte ni vérifier `DEMO_MODE` ; écrire `{"role":"admin",...}` ouvre une session administrateur sans connexion. | `src/lib/store.ts:650-676`, `527-534` | Refuser la restauration hors démonstration ; relire le rôle par e-mail dans `state.users` et rejeter un compte inconnu ou inactif. Production : cookie `HttpOnly` côté serveur. | B |
| haute (production) | Le sélecteur « Profil de démonstration » de l'en-tête et `switchRole` ne sont pas soumis à `DEMO_MODE` : tout utilisateur connecté devient administrateur. | `src/components/app/AppShell.tsx:185-196`, `src/lib/store.ts:687-691` | Afficher seulement si `DEMO_MODE` ; `switchRole` refuse sinon. | B |
| moyenne | 60 actions sur 97 de `actions` n'ont aucun contrôle de droit (script de recensement du 26 oct.) : `revealCni` (697), `updateProducer` (700), `mergeCase` (733), `undoMerge` (750), `addUser` (805), `toggleUser` (809), `addImport` (814), `revokeDevice` (927), `exportSnapshot` (1001), `restoreSnapshot` (1010), `addMember` (1045), `updateMember` (1069), `setMembershipStatus` (1098), `updateDossier` (1230), `submitDossier` (1303), `startReview` (1340), `updateMeeting` (2651), `holdMeeting` (2682), etc. Seules M2, M3 et M4 vérifient `permissions.includes`. | `src/lib/store.ts` (liste complète dans la section 6) | Une garde commune `requirePermission(perm)` appelée en tête de chaque action ; tests « refus » par action. À refaire côté serveur à chaque appel. | A + B |
| moyenne | 25 actions de création ou de modification ne vérifient pas si la coopérative est archivée : `addMember`, `submitDossier`, `approveDossier`, `refuseDossier`, `recordRepayment`, `addSalePayment`, `createCampaign`, `createCalendar`, `saveCalendar`, `validateCalendar`, `recordOperation`, `addInputItem`, `setContributionRule`, `holdMeeting`, `saveMinutes`, `validateMinutes`, `attachMinutesDocument`, etc. | `src/lib/store.ts` (`isArchived` n'apparaît que 12 fois) | Même garde commune (`requireWritableScoop(scoopId)`) ; test par action. | A |
| moyenne | `scopedPayments`, `scopedRules`, `scopedMeetings`, `scopedOperations`, `scopedMembers`, `scopedPlans`, `scopedDossiers` filtrent le périmètre mais n'exigent pas le droit de lecture (`contribution.read`, `meeting.read`, `plan.read`, `member.read`), contrairement aux sélecteurs M2/M3/`scopedLibrary`. | `src/lib/scope.ts:99-108`, `164-169`, `181` | Aligner sur `withPermission`. Même défaut que celui corrigé sur la bibliothèque et les crédits. | B |
| moyenne | `addUser` et `toggleUser` sans permission ; désactiver un utilisateur ne ferme pas sa session ouverte (`isActive` vérifié seulement à la connexion). | `src/lib/store.ts:805-813`, `src/lib/auth/demo-service.ts:228,250` | Contrôle `user.manage` ; vérifier `active` à la restauration ; invalider la session courante. | B |
| basse | Des écrans lisent l'état brut (`useStore((s) => s.payments)`, `s.sales`, `s.audit`…) puis filtrent eux-mêmes : `CoopFicheTabs.tsx:94-104,556`, `use-fiche-counts.ts:9-13`, `ExploitationData.ts:16-18`, `stocks.tsx:73-75`, `appareils.tsx:73-74`. Les données restent en mémoire ; un oubli de filtre les exposerait. | fichiers cités | Un hook par donnée sensible (`useScopedPayments()`…) qui applique droit puis périmètre ; interdire la lecture brute par une règle ESLint ciblée. | A |
| basse | La déconnexion n'est pas journalisée alors que la connexion l'est. | `src/lib/store.ts:681-686` | `audit("Déconnexion")`. | B |

## 2. Authentification, session, invitation

| Gravité | Constat | Fichier:ligne | Action | Resp. |
|---|---|---|---|---|
| haute (production) | `DEMO_MODE` est actif par défaut : `VITE_DEMO_MODE !== "false"`. Un déploiement qui oublie la variable expose comptes, mot de passe commun et codes à l'écran. | `src/lib/auth/config.ts:6` | Inverser en `=== "true"` ; faire échouer `check:host` ou le build de production si la variable n'est pas explicitement `false`. | B |
| moyenne (production) | Le plafond d'essais du code de réinitialisation se contourne : après 5 échecs l'état est supprimé, une nouvelle demande émet un code avec `sends=1` sans délai ; `OTP_MAX_SENDS` est neutralisé. | `src/lib/auth/demo-service.ts:185-187,265-272` | Compteur par compte indépendant du code (fenêtre d'une heure), non remis à zéro quand les essais sont épuisés. Même règle côté API. | B |
| moyenne (production) | Énumération de comptes : `verifyResetCode` renvoie `otp_expired` pour une adresse inconnue et `otp_invalid` avec le nombre d'essais pour une adresse connue. | `src/lib/auth/demo-service.ts:178-189,283-287` | Même réponse et même compteur via un état fictif. | B |
| moyenne (production) | Jeton d'invitation en paramètre d'URL `?jeton=` : reste dans l'historique et les journaux ; `invitationInfo` renvoie l'adresse complète. | `src/routes/invitation.tsx:12-14,38-45`, `demo-service.ts:314` | Fragment `#` ou `history.replaceState` après lecture ; `Referrer-Policy: no-referrer` ; ne renvoyer que l'adresse masquée. | B |
| basse | Verrouillage par compte sans limite par adresse IP (déni de service ciblé) ; comparaisons de code et de mot de passe non constantes ; session de 30 minutes sans expiration glissante. | `demo-service.ts:183,224-235,228`, `store.ts:275` | Côté API : délai progressif, limite IP + compte, `timingSafeEqual`, argon2id, expiration glissante. | B (API) |
| basse | `DEMO_PASSWORD` et `DEMO_ACCOUNTS` restent dans le bundle même avec `DEMO_MODE=false`. | `demo-service.ts:19-70`, `login.tsx:12` | Import dynamique conditionné à `DEMO_MODE`. | B |
| basse (démo) | L'encadré « courriel simulé » affiche le code de réinitialisation de n'importe quel compte connu. | `DemoMailNotice.tsx:18-30` | Conditionné à la correction de `DEMO_MODE`. | B |

## 3. Entrées non fiables et navigateur

| Gravité | Constat | Fichier:ligne | Action | Resp. |
|---|---|---|---|---|
| haute (production) | Injection de script (XSS stockée) : prénom, nom et culture d'un producteur sont insérés sans échappement dans le HTML des infobulles Leaflet (`bindTooltip(string)`). Source : import CSV/XLSX et restauration de sauvegarde. | `src/routes/carte.tsx:245-249`, `src/components/map/PlotMap.tsx:140,153`, `src/lib/io/validate.ts:285-286` | `escapeHtml` ou nœud DOM construit avec `textContent` ; test avec un nom `<img onerror=…>`. | B |
| moyenne (production) | Aucun en-tête de sécurité : CSP, HSTS, `frame-ancestors`/X-Frame-Options, `nosniff`, Referrer-Policy, Permissions-Policy. | `vercel.json:1-6`, `src/start.ts:27-29` | Bloc `headers` dans `vercel.json` ; CSP autorisant les tuiles Leaflet et `VITE_ERROR_REPORT_URL`. | B |
| basse | Le rapporteur d'erreurs envoie `Response.url` avec sa query (peut contenir `jeton=`). | `src/lib/error-reporting.ts:47,60-70` | Retirer la query, garder origine et chemin. | A |
| basse | `robots.txt` autorise tout, application d'administration privée. | `public/robots.txt:1-14` | `Disallow: /` et `X-Robots-Tag: noindex` global. | B |
| basse | Le serveur de développement écoute sur toutes les interfaces. | `vite.config.ts:9` | `localhost` par défaut. | B |

## 4. Menu et navigation

| Gravité | Constat | Fichier:ligne | Action | Resp. |
|---|---|---|---|---|
| basse | Mécanisme « à venir » (`soon`, `NavItem.soon`, clé `shell.soon`) sans aucune entrée depuis M3 : code mort tant qu'aucun module futur n'est prévu. | `src/lib/nav.ts:45,54-61`, `SidebarNav.tsx:65,67,94-104` | Le garder s'il est voulu pour de futurs écrans, sinon le retirer. | B |
| basse | Les groupes repliés sont masqués par l'attribut `hidden` : le total « à traiter » d'un groupe replié n'est annoncé qu'au rendu visuel. | `SidebarNav.tsx:70-120` | Vérifier avec un lecteur d'écran (`aria-label` du bouton avec le total). | B |
| basse | Le menu et la palette de recherche lisent `NAV` ; la liste des écrans filtrables `FILTERED_PATHS` est tenue à la main (oubli possible quand on ajoute un écran). | `src/lib/nav.ts` (fin) | Porter `filtered: true` sur chaque `NavItem` et déduire la liste. | B |

## 5. Livraison, configuration, documentation

| Gravité | Constat | Fichier:ligne | Action | Resp. |
|---|---|---|---|---|
| moyenne | `concurrency: cancel-in-progress: true` annule les contrôles de la branche principale quand deux envois se suivent : plusieurs envois récents n'ont **aucun** contrôle terminé. | `.github/workflows/ci.yml:11-13` | `cancel-in-progress: ${{ github.event_name == 'pull_request' }}`. | B |
| basse | Actions GitHub épinglées par étiquette (`@v4`), image gitleaks `:latest`. | `ci.yml:22-24,41-52,63-67,76`, `codeql.yml:24-32` | Épingler par SHA (Dependabot les tient à jour) ; fixer la version de gitleaks. | B |
| basse | `pnpm audit --prod` ignore les dépendances de développement ; `xlsx` (URL sheetjs) échappe à l'audit et à Dependabot. | `ci.yml:73`, `package.json:87` | Audit complet `--audit-level moderate` ; surveillance manuelle de xlsx. | B |
| basse | `overrides` de `package.json` (`vite >=8.1.6`) ignoré par pnpm : le verrou est illusoire. | `package.json:31-34`, `pnpm-lock.yaml:7-8` | Déplacer dans `pnpm-workspace.yaml` ou supprimer. | B |
| basse | Nitro en version bêta pour la production. | `package.json:108` | Version stable avant la mise en production. | B |
| basse | `dependency-review` désactivé (`if: false`), CodeQL en `upload: never` (résultats invisibles). | `ci.yml:83`, `codeql.yml:34` | Réactiver dès que GHAS est disponible. | B |
| basse | Documentation périmée : `README.md:39` (« bun.lock conservé pour Lovable »), `DEVELOPPEMENT.md:163` (« vercel.json / Cloudflare »), `ETAT_DU_PROJET.md:581` (config Vite « Nitro Cloudflare »). | fichiers cités | Mettre à jour. | B |
| basse (à confirmer) | `docs/cadrage/` (documents confidentiels du client) est versionné dans le dépôt privé. | `git ls-files docs/cadrage` | Confirmer que c'est voulu ; sinon sortir du dépôt et purger l'historique. | utilisateur |

## 5 bis. Tests unitaires et parcours navigateur

| Gravité | Constat | Fichier:ligne | Action | Resp. |
|---|---|---|---|---|
| haute | **Bombe à retardement** : `firstDue` figé à `"2027-01-01"` et `grantedAt` = date du jour ; la règle `firstDue <= grantedAt` refusera le crédit dès le 1er janvier 2027 et le test échouera. | `src/test/m2-droits.test.ts:27,34`, `src/lib/commerce.ts:195` | Calculer `firstDue` à partir de `today` ou fixer l'horloge (`vi.useFakeTimers`). À corriger avant le 1er janvier. | B |
| haute | Les tests de refus ne vérifient que `.ok === false`, jamais le motif : un refus dû à une validation ou au périmètre passe pour un refus de droit (4 tests dans m2-droits, 6 dans m3-droits, 4 dans m4-droits). | `src/test/m2-droits.test.ts:40,64,75,92`, `m3-droits.test.ts:100,113`, `m4-droits.test.ts:33,52` | Vérifier aussi le code d'erreur (`errors.*.notAllowed`). | B |
| haute | Aucun parcours de refus pour `/utilisateurs`, `/comptes`, `/appareils`, `/referentiels`, `/imports` ni pour `/equipe`, `/organisations`, `/carte`, `/qualite/alertes`, `/qualite/corrections` ; le représentant n'a aucun test « Accès non autorisé ». | `e2e/droits.spec.ts:19-28` | Boucle rôle × chemin générée depuis `ROLE_PERMISSIONS` (attend « Accès non autorisé »). | B |
| moyenne | La matrice de `rights.test.ts` n'a aucune ligne pour 7 droits : `alert.manage`, `correction.manage`, `dashboard.read`, `map.read`, `plot.validate`, `quality.review`, `report.generate`. Les rôles `rapports` et l'administrateur (cas positif) manquent aux tests de refus du store. | `src/test/rights.test.ts:39-180`, `m2-droits.test.ts:15-23,36` | Compléter la matrice et les comptes. | B |
| moyenne | Les parcours tournent sur `pnpm dev` (compilation à la demande) : délais de 240 s, version de production jamais testée. | `playwright.config.ts:47`, `e2e/mobile.spec.ts:18`, `mobile-wolof.spec.ts:22` | En CI : `pnpm build` puis servir la sortie ; revenir à 60 s. | B |
| moyenne | CI : `retries: 1` laisse vert un test qui réussit au second essai, rapport publié seulement en cas d'échec ; navigateurs non mis en cache ; `i18n:coverage` absent de la CI. | `playwright.config.ts:17`, `.github/workflows/ci.yml:28-55`, `package.json:29` | Publier le rapport `if: always()`, signaler les tests instables, cache `~/.cache/ms-playwright`, étape `i18n:coverage`. | B |
| moyenne | Faux `localStorage` (Map + `vi.stubGlobal`) copié dans 18 fichiers, sans `unstubAllGlobals` ; comptes de démonstration recopiés (l'adresse admin dans 11 fichiers, `actions.login(` dans 18). | `src/test/m2-droits.test.ts:6-13,15-27` (et 17 autres) | Utilitaire `loginAs(role)` basé sur `DEMO_ACCOUNTS` et stockage simulé dans `src/test/setup.ts`. | B |
| moyenne | Utilitaires de parcours dupliqués : `menu(page)` (4 définitions locales), « Accès non autorisé » écrit 28 fois dans 22 fichiers (un seul `denied`), `firstProducerFiche` (2 définitions et 2 copies), `open(page, role)` (2), trois listes d'écrans qui divergent (22, 25, 32 chemins) ; l'accessibilité ne couvre que l'administrateur. | `e2e/m1-droits.spec.ts:4`, `m2:4`, `m3:4`, `m4:4`, `audit.spec.ts:6`, `a11y-m1.spec.ts:10`, `mobile.spec.ts:20`, `mobile-wolof.spec.ts:28` | `menu`, `expectDenied`, `firstProducerFiche` et une liste `SCREENS` dans `e2e/helpers.ts`. | A + B |
| moyenne | Attentes fixes (`waitForTimeout`, 3 occurrences) ; assertions négatives qui passent toujours (texte absent d'une page « Accès non autorisé »). | `e2e/a11y-m1.spec.ts:43,63`, `mobile-wolof.spec.ts:69`, `m2-droits.spec.ts:38`, `m3-droits.spec.ts:30` | `expect.poll` ou attente du `h1` ; viser un `data-testid` sur l'écran autorisé. | B |
| basse | `toast()` non utilisé (7 occurrences de `getByText(...).first()`), 1 317 producteurs en dur, contextes de navigateur non fermés, `sessionStorage.clear()` sans effet (session dans `localStorage`), titre de test qui annonce plus que ce qu'il vérifie (`m4-droits.spec.ts:17-24`), `hydrated()` appuyé sur `__reactProps`, `/organisations/$id` et `/qualite` jamais ouverts. | `e2e/calendriers.spec.ts:19`, `droits.spec.ts:35,42`, `auth.spec.ts:23`, `audit.spec.ts:21-22`, `helpers.ts:17-22` | Voir le détail du relecteur dans le fil ; traiter au fil de l'eau. | B |

## 6. Annexe : droit à exiger pour chaque action du store sans contrôle (au 26 octobre 2026)

Confirmé : 60 actions sur 97 n'ont aucun contrôle de droit. Table à appliquer par une garde commune `guard(permission, { scoopId })` en tête de chaque action (droit, puis périmètre, puis coopérative non archivée pour les écritures). Les droits viennent de la matrice 4.5.3 et des `AppShell perm` des écrans.

| Action | Droit à exiger | Remarque |
|---|---|---|
| `setYouthMaxAge`, `setCropFamily`, `attachAlias`, `setSeuil` | `config.manage` | référentiels |
| `revealCni` | `cni.read` | + ligne au journal déjà écrite ; périmètre du producteur |
| `updateProducer` | `producer.edit` | + périmètre du producteur |
| `qualifyOrgs` | `org.manage` | + périmètre des organisations |
| `classifyCase` | `quality.review` | + périmètre |
| `mergeCase`, `undoMerge` | `quality.merge` | + périmètre |
| `updateAlerts` | `alert.manage` | + périmètre |
| `reviewPlot` | `plot.validate` | + périmètre |
| `addUser`, `toggleUser` | `user.manage` | `toggleUser` ferme aussi la session ouverte |
| `addImport`, `ingestImport` | `import.manage` | |
| `submitCorrection` | `producer.read` | + périmètre du producteur |
| `decideCorrection` | `correction.manage` | + périmètre |
| `confirmLink`, `rejectLink`, `unlinkLink`, `linkManually` | `account.manage` | |
| `revokeDevice`, `reactivateDevice`, `renameDevice`, `resyncDevice`, `signOutDevice` | `device.manage` | |
| `exportSnapshot`, `restoreSnapshot` | `data.backup` | toutes les données personnelles : administrateur seul |
| `addMember`, `updateMember`, `setMembershipStatus` | `member.manage` | + périmètre + archivage |
| `grantAccess`, `revokeAccess` | `role.assign` | + `assignableRoles` déjà appliqué |
| `createDossier`, `updateDossier`, `addDocument`, `removeDocument`, `submitDossier` | `dossier.create` (écriture) / `dossier.submit` | le technicien auteur seulement ; pièce sensible : `cni.read` |
| `startReview`, `requestComplement`, `sendDossierReminders` | `dossier.review` | |
| `approveDossier`, `refuseDossier` | `dossier.review` **et** rôle de décision (`canDecide`) | séparation des tâches déjà appliquée |
| `downloadDocument` | `canDownloadDocument(session, doc)` | `document.download` ou `library.read`, + `cni.read` si sensible |
| `recordReportDownload` | `report.download` | |
| `createPlan`, `updatePlan`, `setPlanStatus` | `plan.write` (`setPlanStatus` « validé » : à préciser) | |
| `setContributionRule`, `recordPayment`, `voidPayment` | `contribution.manage` | + archivage |
| `createMeeting`, `updateMeeting`, `holdMeeting`, `cancelMeeting`, `saveMinutes`, `validateMinutes`, `attachMinutesDocument` | `meeting.manage` | + archivage |
| `addLibraryDocument`, `removeLibraryDocument` | `library.manage` | `cni.read` si sensible |
| `activateInvitedAccount` | aucun droit : appelée seulement par `authService.acceptInvitation` | vérifier l'expiration ; ne doit jamais être appelée depuis un écran |
| `login`, `logout`, `restoreSession` | hors garde | voir section 1 (session) |
| `switchRole` | refusée hors `DEMO_MODE` | voir section 1 |

Un test de refus par ligne, qui vérifie le **code d'erreur** (`errors.*.notAllowed`) et pas seulement `ok === false`.

## 7. Plan proposé

- **Lot 0 (sécurité, avant tout refactor, un commit chacun, test de non-régression à chaque fois) :** session non falsifiable et `switchRole` sous `DEMO_MODE` ; `DEMO_MODE` fermé par défaut et contrôle de build ; échappement des infobulles de la carte ; bloc d'en-têtes de sécurité ; compteur de réinitialisation et réponse uniforme ; jeton d'invitation hors de l'URL ; annulation de la CI limitée aux demandes de fusion.
- **Lot 1 :** garde commune `requirePermission` et `requireWritableScoop` dans le store, appliquée action par action avec un test de refus ; sélecteurs de périmètre alignés sur `withPermission`.
- **Lot 2 :** hooks `useScoped*` et règle ESLint contre la lecture brute des données sensibles.
- **Lot 3 :** documentation et configuration de livraison (section 5).
- **Lot 4 :** tests (section 5 bis) : correction de la bombe à retardement du 1er janvier avant tout, motif d'erreur dans les tests de refus, utilitaires partagés (`loginAs`, `expectDenied`, `menu`, `SCREENS`), parcours de refus générés depuis la matrice des droits.
