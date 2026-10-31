# Acteurs et rôles — Mbay Diaay

| | |
|---|---|
| **Date** | 25 octobre 2026 |
| **Statut** | Aligné sur la vision Claude du 25 oct. (`Mbay Diaay vision, rôles et suivi du module Administratif`) |
| **Sources** | PDF / MD vision @PethDev · note de cadrage · PRD · prototype |

Ce document reprend **ce que Claude a déjà traité** pour la vision, les rôles et le module Administratif (M1). À relire avec les coopératives : plusieurs droits sont encore « proposés ».

> **Écart dépôt local :** dans *ce* clone, `src/lib/permissions.ts` n’a encore que 4 rôles (`admin`, `gestionnaire`, `faitiere`, `technicien`). La vision ci-dessous décrit **8 rôles** et un M1 quasi complet (cotisations, réunions, dossiers, etc.). Vérifier la branche / session A–B avant de coder par-dessus.

---

## 1. Vision (retenue)

Un seul outil pour chaque coopérative des Niayes et leur faîtière : membres, parcelles, activité — de la parcelle géoréférencée jusqu’à la vente. Remplace papier et Excel dispersés.

- **Maître d’ouvrage** : CRADESC · **Titulaire** : CANAS
- **Principe** : chaque coopérative ne voit que ses données ; le CRADESC voit tout (avec trace) ; la faîtière lit seulement ; donnée sensible = droit + trace

### Cinq modules

| Module | État (25 oct.) | Contenu |
|---|---|---|
| **M1 Administratif** | Quasi complet | Coopératives, membres, producteurs, GIE, dossiers, cotisations, réunions, documents, journal |
| **M2 Commercial** | Non commencé | Stocks, crédits, ventes |
| **M3 Exploitation** | Non commencé | Charges, revenus, marges |
| **M4 Agronomique** | Partiel | Plans d’exploitation faits ; campagnes / calendriers / itinéraires à faire |
| **M5 SIG** | Fait (web) | Carte, fiche parcelle, chevauchements, qualité ; GPS offline = mobile |

Transversal : tableau de bord, rapports, qualité, imports / sauvegarde, comptes, appareils, référentiels.

---

## 2. Huit rôles (vision)

Un **rôle** = accès à l’application. Distinct du **statut de membre**. Un rôle de SCOOP ne voit que sa coopérative ; le technicien, **celles qui lui sont confiées**.

| Rôle | Voit | Peut | Ne peut pas |
|---|---|---|---|
| **Administrateur CRADESC** | Toutes | Tout (créer SCOOP + gestionnaire, comptes, imports, décisions, journal) | — (actions sensibles tracées) |
| **Faîtière** | Toutes, lecture seule | Consulter producteurs, membres, orgs, plans, carte ; rapports ; voir cotisations / réunions | Modifier ; documents de la SCOOP ; CNI |
| **Gestionnaire de SCOOP** | Sa SCOOP | Producteurs, orgs/GIE, cotisations, réunions, documents ; instruire **et** décider dossiers ; qualité ; plans ; rapports ; CNI (tracé) ; journal SCOOP | Créer une SCOOP ; attribuer les rôles |
| **Représentant de SCOOP** | Sa SCOOP | Membres, attribuer rôles/accès ; cotisations, réunions, documents ; **décider** dossiers ; CNI (tracé) ; rapports ; journal SCOOP | Modifier une fiche producteur ; nommer un autre représentant ou un gestionnaire |
| **Secrétaire de SCOOP** | Sa SCOOP | Réunions, PV, documents ; **instruire** un dossier (pas décider) ; lire membres, cotisations, plans | Décider ; CNI / pièces sensibles ; enregistrer une cotisation ; générer un rapport |
| **Technicien** | Ses SCOOP | Créer / soumettre dossiers producteurs ; valider parcelles ; alertes ; plans d’exploitation | Autres dossiers ; CNI ; membres, cotisations, réunions |
| **Responsable des rapports** | Selon périmètre | Lire producteurs et plans ; générer / télécharger rapports | Modifier ; CNI ; cotisations ; réunions |
| **Responsable des ventes** | — (pas d’écran) | Prévu pour M2 | Producteurs, carte |

**D3 (décidé) :** gestionnaire et représentant = deux rôles ; un compte peut cumuler.

**D13 (proposé) :** l’admin nomme tous les rôles ; le représentant nomme secrétaire, ventes, rapports, technicien ; personne ne change son propre accès.

---

## 3. Trois notions distinctes (règle 1)

| Notion | Sens |
|---|---|
| **Membre** | Personne de la coopérative (candidat / membre / suspendu / sorti). Être membre ≠ droit d’accès et ≠ fiche producteur |
| **Producteur** | Fiche agricole (parcelles, cultures) |
| **Compte** | Accès à l’app, avec un rôle |

Suspendre ou sortir un membre **ferme** son accès.

---

## 4. Circuit d’un dossier producteur (schéma PDF)

*Titre du schéma : « Un dossier se termine toujours par une décision, après examen » · 5 états, 1 retour.*

```
Brouillon
    │  le technicien soumet
    ▼
Soumis
    │  la coopérative examine
    ▼
En examen ──┬──► Approuvé          (fin)
            ├──► Refusé            (fin ; ne se rouvre jamais → nouveau dossier)
            └──► Complément demandé
                      │  pièce ou info manquante
                      │  le technicien corrige et soumet à nouveau
                      └──────────────► Soumis  (boucle possible plusieurs fois)
```

- Sans réponse depuis **14 jours** → rappel, **jamais** d’approbation automatique.
- **Séparation des tâches (D12, décidé)** : qui crée / soumet ne peut pas approuver, **sauf** admin et gestionnaire → trace « auto-approuvé ». Secrétaire instruit, ne décide pas. À confirmer pour le représentant.
- **Doublons** : même CNI, même téléphone, ou même nom + village → signaler ; le décideur lie ou confirme distinct.

---

## 5. Autres règles métier (M1)

5. **CNI / téléphone** masqués par défaut ; lecture en clair = droit + journal. Secrétaire et technicien ne voient pas les pièces sensibles.
6. **Cotisations** : règle par SCOOP (montant FCFA, périodicité, échéance). Paiement jamais effacé → annulation motivée. États membre : à jour / en retard / jamais payé. Règle « à confirmer » tant que la SCOOP ne l’a pas validée.
7. **Réunions** : planifiée → tenue (présents) ou annulée (motif). PV brouillon puis validé (immutable).

Toute action sensible (CNI, export, téléchargement, décision, création SCOOP) → journal. Archiver une SCOOP, ne pas supprimer (D15 à valider).

---

## 6. Décisions Claude (repères)

| # | Sujet | État |
|---|---|---|
| D1 | Nom Mbay Diaay | Décidé |
| D2 | CVNI = CNI | Décidé |
| D3 | Gestionnaire ≠ représentant (cumul possible) | Décidé |
| D10 | Modules absents = « à venir », non cliquables | Décidé |
| D11 | Fonctionnel d’abord, bilingue ensuite | Décidé |
| D12 | Exception SoD admin + gestionnaire, tracée | Décidé (confirmer représentant) |
| D13 | Qui nomme quels rôles | Proposé |
| D5 | Circuit dossier (brouillon → … → décision) | Proposé |
| D4 | Statuts membre / GIE | À valider |
| D6–D9, D14–D16 | Plans, rapports, documents, champs SCOOP, archive, invitation gestionnaire | À valider / proposé |
| D17 | Assistance admin (vue lecture seule d’un user) | **À valider avant tout code** |

---

## 7. Avancement M1 (selon vision Claude, 25 oct.)

Annoncé comme fait dans le prototype vision : producteurs, orgs/GIE, membres, rôles par représentant, dossiers producteurs, pièces, **créer / archiver SCOOP + inviter gestionnaire**, fiche SCOOP à onglets, cotisations, réunions/PV, documents, journal, rapports.

En cours : menu sections repliables. Non commencé : assistance (D17). Wolof : préparé (sélecteur), glossaire / relecture à faire.

Sessions : **A** écrans / données / règles · **B** droits / périmètre / menu / auth / e2e. Suivi technique : `docs/ETAT_DU_PROJET.md` §4.6 (dans la branche vision).

### Suite prévue

1. M4 (campagnes, calendriers, itinéraires)  
2. M2 (stocks, crédits, ventes)  
3. M3 (exploitation)  
4. D17 puis validation coopératives, puis serveur réel / mobile / hébergement

---

## 8. Liste de relecture (coopératives / client)

- [ ] Les 8 rôles et la séparation gestionnaire / représentant (D3, D13)
- [ ] Circuit dossier + exception SoD (D5, D12) y compris pour le représentant
- [ ] Statuts membre et GIE (D4)
- [ ] Qui lit la CNI (gestionnaire et représentant oui ; secrétaire / technicien / faîtière non)
- [ ] Règles de cotisation réelles (INF 30)
- [ ] D14–D16 (création SCOOP, archive, invitation)
- [ ] D17 assistance — oui / non avant de coder
