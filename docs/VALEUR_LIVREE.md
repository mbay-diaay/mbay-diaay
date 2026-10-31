# Valeur livrée au-delà du PRD Web v0.1

Document pour la direction / les bailleurs : ce que le prototype **dépasse** déjà par rapport au PRD Web et à la note de cadrage (Must have web initial). Les écrans listés existent dans le dépôt `mbaydiaay-proto` au 26 octobre 2026.

## 1. Modules métier (note de cadrage)

| Module | Attendu (cadrage) | Dans le prototype | Au-delà |
|---|---|---|---|
| **M1 Administratif** | Membres, OP, réunions, documents, tableau de bord | Coopératives, équipe, producteurs, dossiers, organisations/GIE, cotisations, réunions, documents, journal | Dossiers producteurs guidés, 8 rôles (vs 4 dans le PRD initial), liaison compte ↔ producteur, appareils |
| **M2 Commercial** | Stocks, ventes, crédits | Stocks, crédits (échéancier, retards, remboursements), ventes | Panneaux détail, reçus, états « en retard / en cours / soldé » |
| **M3 Exploitation** | Charges, revenus, marges | Charges + comptes d'exploitation | Annulation tracée des charges, rattachement culture / campagne |
| **M4 Agronomique** | Campagnes, calendriers, itinéraires | Plans d'exploitation, campagnes, calendriers, **suivi des cultures** | Calendrier d'opérations, retards, marquage « fait » |
| **M5 SIG** | Carte web, superficies | Carte Leaflet, fiche parcelle, chevauchements, anomalies | Bascule satellite / OSM, GeoJSON / PDF |

## 2. Transversal — souvent hors « Must have » web strict

| Sujet | Livré | Pourquoi c’est vendable |
|---|---|---|
| **Qualité des données** | Doublons (6 statuts + fusion réversible), alertes, demandes de correction | Argument fort sur la base des ~9 000 fiches |
| **Import à blanc multi-feuilles** | Rapport feuille par feuille + historique des lots | Réduit le risque migration CRADESC |
| **Bilingue FR / WO** | Mécanisme `i18n`, sélecteur, extraction avancée | Différenciant terrain Niayes |
| **Auth e-mail + OTP** | Connexion, mot de passe oublié, invitations | Plus réaliste que le seul SMS du PRD initial |
| **Périmètre SCOOP** | `scope.ts` partout (listes, fiche, carte, rapports) | Sécurité démontrable en démo |
| **Rapports** | Catalogue générable Excel / CSV + historique | Prêt pour bailleurs (mise en forme charte = suite) |
| **CI / sécurité** | Tests Vitest + Playwright, audit deps, CodeQL, garde-fou hébergeur Vercel | Crédibilité livraison |

## 3. Ce qui reste clairement « à vendre » (pas encore livré)

Reprendre `docs/ETAT_DU_PROJET.md` §6 : PDF à la charte, SMS second canal, Kobo auto, offline gestionnaires, paiements Wave / Orange Money, tableau de bord bailleurs dédié.

## 4. Phrase courte pour un comité

> « Au-delà du pilotage web demandé (annuaire, carte, qualité), le prototype ouvre déjà les cinq modules de la note de cadrage — administratif, commercial, exploitation, agronomique, SIG — avec cotisations, crédits, charges, suivi cultural et bilingue français / wolof, prêts à être chiffrés en lots de production. »
