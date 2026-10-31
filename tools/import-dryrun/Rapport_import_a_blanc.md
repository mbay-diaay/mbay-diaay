# Rapport d'import à blanc — base CRADESC

| | |
|---|---|
| **Date** | 22 octobre 2026 |
| **Fichier source** | `CRADESC_Base_Niayes_Collecte_SocioEco_Parcelles` (export Kobo apuré du 05/10/2026), empreinte SHA-256 `b1c5b1a1d49ade6f…` |
| **Script** | `import_cradesc_dryrun.py` v0.1.0 — 2 passes consécutives |
| **Résultat** | **7 critères sur 7 atteints** |
| **Données personnelles** | Aucune dans ce rapport ni dans le journal d'exécution |

## 1. Critères d'acceptation (PRD Backend §6.4)

| # | Critère | Résultat | Détail |
|---|---|---|---|
| 1 | Réconciliation des volumes | OK | 1 317 producteurs · 1 534 parcelles · 1 941 cultures, identiques à la source |
| 1b | Aucun lien orphelin | OK | 0 violation de clé étrangère |
| 2 | Contours chargés, invalides conservés bruts et réparés à part | OK | 1 534 bruts + 433 réparés = 1 967 lignes |
| 3 | Traçabilité | OK | Journal 2 673 / 2 673 · fusions historiques 19 / 19 |
| 4 | Aucune fiche fusionnée ni supprimée | OK | 1 317 fiches pour 1 317 en source |
| 5 | Sécurité | OK | 0 CNI en clair dans la base ; aucune séquence de 9 chiffres ou plus dans le journal d'exécution |
| 6 | Rejouabilité | OK | La 2e passe ne crée aucune donnée (toutes les tables identiques) |
| 7 | Rapport | OK | Ce document |

## 2. Volumes chargés

| Table | Lignes | | Table | Lignes |
|---|---|---|---|---|
| organization | 125 (11 SCOOP + 114 organisations de base) | | plot_geometry | 1 967 |
| locality | 144 | | plot_crop | 1 941 |
| crop / crop_alias | 35 / 79 | | plot_crop_campaign | 2 336 (CHN + contre-saison) |
| field_agent | 22 | | merge_log | 19 |
| producer / membership | 1 317 / 1 317 | | import_correction_log | 2 673 |
| contact | 1 317 | | data_quality_flag | 638 |
| identity_doc (CNI chiffrées) | 898 | | duplicate_candidate | 5 |
| survey_response | 1 317 | | plot | 1 534 |

`data_quality_flag` = 609 alertes d'origine + 28 chevauchements + 1 fiche sans nom.

## 3. Constats de l'import (ce que le test a appris)

| Sujet | Constat | Effet |
|---|---|---|
| **Réparation des contours** | `make_valid` reproduit la superficie de référence à ±1 % pour 430 des 433 contours ; `buffer(0)` seulement pour 386 et s'écarte de plus de 5 % pour 25. Les 3 contours restants sont des parcelles de 3 à 9 m². | Méthode retenue : `make_valid`. |
| **Contours valides** | 1 101 contours valides : écart maximal avec la superficie de référence 0,24 %. | La superficie de la base est fiable. |
| **Chevauchements** | 28 paires de parcelles de producteurs différents (> 20 %, contours réparés) : 16 au-dessus de 50 %, 7 au-dessus de 90 %. | Alertes à examiner. Le chiffre de 19 donné plus tôt ne comptait que les contours valides. |
| **Superficie déclarée** | Absente de la base. Seules existent la superficie mesurée et celle de Kobo. | La superficie « déclarée » reste vide à l'import. |
| **Micro-parcelles** | 6 parcelles de moins de 100 m² (3 de moins de 10 m²) ; 4 d'entre elles n'ont aucune culture. | Probables relevés accidentels : `NIA-N-BTL-0006-P2`, `-0008-P3`, `-0030-P2`, `NIA-S-SCT-0035-P2`. |
| **Fiche sans nom** | 1 fiche (ASLB) sans nom. | Conservée et signalée ; le nom n'est pas obligatoire à l'import. |
| **Journal des corrections** | 45 lignes portent des CNI en clair dans la source. | Chiffrées à l'import. |
| **Organisations** | Classement provisoire des 1 317 fiches : GIE 489 · à qualifier 253 · associations ou unions 225 · sections 205 · individuels 124 · membres directs 21. | À confirmer avec le client (GIE contre section). |
| **CNI identiques** | 5 groupes, 10 fiches (mêmes résultats sur chaînes brutes et normalisées). | 5 candidats doublons « à examiner ». Aucune fusion. |
| **Téléphones** | 26 groupes, 53 fiches partagent un numéro. Les 4 numéros invalides concordent avec la colonne `Tel_valide`. | Information seulement, pas de candidat doublon. |
| **Campagnes** | 2 336 résultats par campagne (1 292 CHN + 1 044 contre-saison). Aucune donnée saisie hors campagne produite. | Format long validé. |
| **Montants** | Aucune valeur FCFA non entière. | Règle des FCFA entiers applicable sans arrondi. |
| **Alertes** | 609 alertes, tous identifiants résolus ; aucune n'a de statut de vérification. | Toutes importées « ouvert ». |
| **Alias de cultures** | 79 saisies brutes, chacune reliée à une seule culture normalisée. | Aucune ambiguïté. |

## 4. Limites de ce banc

- **SQLite, pas PostgreSQL/PostGIS.** Il valide les règles, les volumes et les liens ; pas les performances, les index spatiaux ni le schéma de production.
- **Staging en mémoire.** Il n'est jamais écrit ; la purge des tables `staging_*` de la production reste à tester.
- **Clés éphémères.** Le chiffrement de la CNI est démontré, pas la gestion de la clé (coffre, rotation).
- **UUID déterministes** (uuid5) pour prouver l'idempotence ; en production, ils sont générés par la base ou l'appareil.
- **Hors périmètre du test :** authentification, synchronisation, droits.

## 5. Suite

1. Transmettre à Khadidja les règles de transformation (§6.3 du PRD Backend) pour le schéma PostgreSQL.
2. Reprendre ce script comme base de l'import réel (NestJS / BullMQ), avec deux imports à blanc avant l'import final.
3. Qualifier les 253 organisations « à qualifier » après la Vision des acteurs et des rôles.
