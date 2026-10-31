# Jeu de données fictif — Mbay Diaay

**Entièrement inventé** : noms, téléphones, CNI (masquées), villages, positions des parcelles. Aucune personne réelle. Peut être fourni à un outil de conception.
Seuls les **volumes et les répartitions** reprennent la base CRADESC du 05/10/2026, pour que les écrans montrent les bons ordres de grandeur.

| Fichier | Usage |
|---|---|
| `mbay_fixture_complet.json` (2,2 Mo) | Avec les contours des parcelles (carte). |
| `mbay_fixture_leger.json` (1,6 Mo) | Sans contours (tableaux, fiches, tableau de bord). |
| `generer_jeu_de_donnees_fictif.py` | Générateur reproductible (graine fixe). |

## Ce qu'il contient (conforme à la base)

| Élément | Valeur |
|---|---|
| SCOOP / organisations de base | 11 / 114 |
| Producteurs | 1 317 (1 125 hommes, 192 femmes ; 26 âges manquants ; 74 fiches « À vérifier » ; 1 fiche sans nom) |
| Parcelles | 1 534 (6 parcelles sans culture, 6 de moins de 100 m², 2 de plus de 10 ha) |
| Cultures | 1 941 réparties sur 35 valeurs, avec famille (pour regrouper les couleurs de la carte) |
| Contours | 433 parcelles ont un contour brut (invalide) et un contour réparé |
| Chevauchements | 28 paires (12 entre 20 et 50 %, 9 entre 50 et 90 %, 7 au-dessus de 90 %), calculées sur les contours |
| Doublons candidats | 5 (CNI identique, aucun traité) ; 19 fusions historiques réversibles ; 26 groupes de téléphone partagé (53 fiches) |
| Alertes | 609, toutes « ouvert », mêmes types que la base |
| Identifiants | `NIA-{Zone}-{SCOOP}-{n}` pour les producteurs, `…-P{n}` pour les parcelles |

## Limites

- Les contours sont des rectangles légèrement déformés, pas de vraies formes de champs.
- Les positions sont placées autour du centre de chaque SCOOP ; elles ne correspondent à aucun champ réel.
- La répartition des types d'organisation est approximative (GIE, association, section, à qualifier, individuel, membre direct).
- Les superficies suivent la distribution réelle (médiane autour de 0,5 ha) sans la reproduire parcelle par parcelle.
