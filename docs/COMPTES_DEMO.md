# Comptes de démonstration

Depuis la refonte de la page de connexion (11/11/2026), les comptes de démonstration ne sont **plus listés à l'écran**. Ils sont documentés ici pour la recette et les tests. Toutes les données sont fictives.

Source de vérité : `web-angular/src/lib/auth/demo-service.ts` (`DEMO_ACCOUNTS`). Les tests E2E les utilisent via `e2e/helpers.ts` (`ROLES`).

## Accès

| Champ | Valeur |
|---|---|
| Mot de passe (tous les comptes) | `Demonstration2026` |
| Code OTP, mode démonstration (front seul) | aléatoire, affiché dans l'encadré « Courriel simulé » de l'écran de vérification |
| Code OTP, mode API (NestJS) | `000000` (stub tant que le SMS n'est pas branché) |

## Les 8 comptes

| Rôle | Nom | E-mail | Périmètre |
|---|---|---|---|
| Administrateur CRADESC | Aïssatou Ndiaye | `aissatou.ndiaye@cradesc.example` | consolidé |
| Gestionnaire de SCOOP | Babacar Fall | `babacar.fall@scoop-kms.example` | une SCOOP |
| Faîtière (USCN) | Ousmane Guèye | `ousmane.gueye@uscn.example` | consolidé, lecture |
| Technicien | Fatou Sarr | `fatou.sarr@cradesc.example` | deux SCOOP |
| Représentant de SCOOP | Moussa Diouf | `moussa.diouf@scoop-kms.example` | une SCOOP |
| Secrétaire de SCOOP | Aminata Bâ | `aminata.ba@scoop-kms.example` | une SCOOP |
| Responsable des ventes | Ibrahima Seck | `ibrahima.seck@scoop-kms.example` | une SCOOP |
| Responsable des rapports | Rokhaya Diallo | `rokhaya.diallo@scoop-kms.example` | une SCOOP |

Comptes supplémentaires du seed de l'API (mêmes mot de passe et OTP `000000`) : `admin@mbay.sn`, `gestionnaire@mbay.sn`, `representant@mbay.sn`. Voir aussi `mbay-diaay-api/docs/COMPTES_RECETTE.md`.

## Se connecter

1. Ouvrir `/login`.
2. Saisir l'e-mail du rôle voulu et le mot de passe `Demonstration2026`.
3. Saisir le code à 6 chiffres (voir le tableau « Accès »).
