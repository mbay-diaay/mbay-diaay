# Prompt Claude Design — Application web Mbay Diaay

**À joindre avec le prompt :** `PRD_Web_Mbay_Diaay_v0.1.md` et `design-tokens.json` (dossier `PRD/`).
**À ne PAS joindre :** la base CRADESC, le classeur de revue des doublons, ni aucune donnée réelle (noms, CNI, téléphones).

---

## Prompt à copier

```
Conçois l'application web d'administration « Mbay Diaay » : un prototype haute fidélité, cliquable, en français, pour ordinateur (1440 px), avec une adaptation tablette et téléphone.

CONTEXTE
Plateforme numérique pour les producteurs maraîchers et les coopératives (SCOOP) de la zone des Niayes, au Sénégal. Maître d'ouvrage : CRADESC. Les utilisateurs sont des administrateurs, des gestionnaires de SCOOP et des techniciens, parfois peu à l'aise avec l'informatique. L'application sert à gérer les producteurs et les organisations, nettoyer les données (doublons, alertes), voir les parcelles sur une carte, importer des données, produire des rapports et administrer les accès.
Le fichier PRD_Web_Mbay_Diaay_v0.1.md joint décrit les exigences (WE-xx). Suis-le : il fait foi pour le contenu et les règles.

CHARTE
Aucune charte officielle n'existe encore. Utilise design-tokens.json (vert principal #2F6B3A, ocre #B7791F, neutres, statuts, police Inter).
- Commence par créer le système de design à partir de ce fichier : couleurs, typo, espacements, boutons, champs, cartes, tableaux, badges de statut, onglets, modales, bandeaux d'alerte.
- Aucune couleur ni taille en dur dans les écrans : tout passe par des jetons nommés, pour que la charte du client puisse être appliquée plus tard en changeant uniquement la couche « primitive ».
- Logo : emplacement provisoire (monogramme texte « Mbay Diaay »), facile à remplacer.
- Sobre, lisible, institutionnel. Pas d'effets décoratifs. Couleur jamais seule : toujours icône ou libellé en plus. Contrastes AA, focus visible.

DONNÉES
Utilise uniquement des données fictives crédibles (noms sénégalais inventés, villages de la zone des Niayes, SCOOP fictives). N'utilise aucune donnée réelle. CNI et téléphones toujours masqués (••••••••245) avec un bouton « Afficher » qui précise que l'action est enregistrée.
Volumes de référence pour rendre les écrans réalistes : 11 SCOOP, environ 1 300 producteurs, 1 500 parcelles, 35 cultures, environ 600 alertes ouvertes, environ 250 organisations « à qualifier ».

STRUCTURE
Barre latérale : Tableau de bord · Producteurs · Organisations · Qualité (Doublons, Alertes) · Carte · Rapports · Administration (Utilisateurs et rôles, Référentiels, Imports, Journal d'audit). Les entrées s'affichent selon les permissions : montre aussi une variante « Gestionnaire de SCOOP » (périmètre limité) et une variante « Faîtière » (lecture seule, aucun bouton d'action).

ÉCRANS À CONCEVOIR (par ordre de priorité)
Lot 1, cœur du produit :
1. Connexion par téléphone + code OTP (WE-01).
2. Tableau de bord : effectifs par SCOOP, sexe, tranche d'âge, handicap, activité récente ; chaque chiffre porte un indicateur « x % de fiches à vérifier » (WE-10 à WE-13).
3. Annuaire des producteurs : recherche et filtres (nom, village, SCOOP, sexe, tranche d'âge, culture, statut qualité), tableau paginé côté serveur, export (WE-20, WE-23).
4. Fiche producteur : identité avec CNI masquée, contacts, organisation et statut « recensé / membre », parcelles, cultures par campagne, alertes, historique (WE-21).
5. File de revue des doublons avec compteurs par statut (WE-40).
6. Comparaison côte à côte de deux fiches, classement du cas (à examiner, confirmé, probable, non-doublon, erreur de saisie d'identité, non résolu) avec commentaire obligatoire, fusion avec confirmation et possibilité de la défaire (WE-41 à WE-43). Un téléphone partagé n'est qu'un signal secondaire, jamais une preuve (WE-46).
7. Carte des parcelles : filtres, statuts visuels (relevée, validée, à reprendre, chevauchement), fonds plan et satellite, fiche parcelle avec contour brut et contour réparé, validation ou demande de reprise avec motif (WE-50 à WE-53).
8. Liste des chevauchements avec vue côte à côte sur la carte (WE-54).

Lot 2, administration :
9. File d'alertes avec actions groupées et aperçu avant validation (WE-44, WE-45).
10. Organisations : arborescence faîtière → SCOOP → organisation → producteurs ; écran de qualification en lot (WE-30 à WE-32).
11. Import : téléversement, import à blanc, rapport (volumes, rejets, réparations, doublons candidats), import final, historique des lots (WE-80 à WE-82).
12. Utilisateurs, rôles et permissions éditables, appareils, liaison compte ↔ producteur, demandes de correction avant / après (WE-60 à WE-65).
13. Référentiels : cultures et alias, localités, seuils (WE-70, WE-71).
14. Rapports et exports, journal d'audit (WE-90, WE-91).

PARCOURS CLIQUABLES À RELIER
A. Connexion → tableau de bord → annuaire → fiche producteur → révéler la CNI (confirmation) → retour.
B. File des doublons → comparaison → classer « erreur de saisie d'identité » (aucune fiche modifiée) ; puis fusionner → confirmer → défaire la fusion.
C. Carte → parcelle au contour réparé → deux contours visibles → valider ou demander une reprise.
D. Import à blanc → rapport → import final.

ÉTATS À MONTRER SUR CHAQUE ÉCRAN CLÉ
Chargement, liste vide, erreur, accès refusé avec message clair (jamais une page vide), succès, confirmation avant toute action destructive ou nominative.

RÈGLES
- Mets de côté tout ce qui n'est pas dans le PRD (cotisations, réunions, modules commercial et agronomique) : un simple emplacement « bientôt disponible » suffit.
- Les décisions sensibles (fusion, révélation de CNI, export nominatif) ont toujours une confirmation et une mention « action enregistrée ».
- Signale en commentaire toute hypothèse que tu fais là où le PRD ne tranche pas.

LIVRABLE
Un prototype navigable avec le système de design, les écrans du lot 1 d'abord, puis le lot 2. Termine par la liste des composants réutilisables et des jetons utilisés, pour que l'équipe Angular puisse les transposer.
```

---

## Conseils d'utilisation

- Si Claude Design peine sur l'ensemble, envoie le prompt tel quel pour le **système de design + lot 1**, puis demande le lot 2 dans un second message.
- Ne rends pas le prototype public : il reste fictif mais il montre l'architecture de l'outil.
- Après génération, vérifie en priorité : les parcours B (fusion réversible) et C (deux contours), les états « accès refusé », et que la CNI n'apparaît jamais en clair par défaut.
- Quand tu valides le web, je prépare le prompt mobile (PRD Mobile : hors connexion, GPS, synchronisation) avec le même système de design.
