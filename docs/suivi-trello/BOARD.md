# Board Trello — Mbay Diaay (Module 1 + suivi)

**Pack mis à jour le 31 octobre 2026** — renvoyer `cartes.csv` au secrétaire ; **ne pas** réimporter tout le board en double (ajouter seulement les nouvelles cartes Terminé / Backlog NestJS).

## Colonnes (à créer dans cet ordre)

| Colonne | Usage |
|---|---|
| **Backlog** | Idées et tickets pas encore démarrés |
| **En cours** | Travail actif (1 à 3 cartes max par personne) |
| **À vérifier / Recette** | Prêt pour revue Moha / client / QA |
| **Terminé** | Livré et accepté |
| **Bloqué** | Attente décision client, accès, dépendance externe |

## Labels

Créer ces labels (couleurs libres) :

### Module

- `M1-Administratif`
- `M2-Commercial`
- `M3-Exploitation`
- `M4-Agronomique`
- `M5-SIG`
- `Transversal` (auth, i18n, hébergement, CI)

### Priorité

- `P0-Critique`
- `P1-Haute`
- `P2-Normale`
- `P3-Basse`

### Responsable (placeholders)

- `R-Moha`
- `R-Dev-A`
- `R-Dev-B`
- `R-Client-CRADESC`

## Comment importer / créer le board en 10 minutes

1. Sur [trello.com](https://trello.com) : **Créer** → **Tableau** → nom `Mbay Diaay — Suivi`.
2. Renommer / ajouter les 5 colonnes ci-dessus (supprimer les colonnes par défaut inutiles).
3. **Labels** : menu du tableau → Labels → créer la liste ci-dessus.
4. Ouvrir [`cartes.csv`](cartes.csv) dans Numbers / Excel / Google Sheets.
5. Pour chaque ligne utile : dans Trello, **Ajouter une carte** dans la bonne colonne ; coller **titre** + **description** ; poser les labels module / priorité / responsable ; deadline si la colonne `deadline` est remplie.
6. Dans la description, garder les liens repo / docs (colonne `liens`).
7. Critère de done : coller le texte de la colonne `criteres_done` en bas de la carte (checklist manuelle si tu préfères).
8. Optionnel : pouvoir « Custom Fields » Trello pour Module / Priorité si tu as Trello Premium — sinon les labels suffisent.

### Mise à jour si le board existe déjà (31/10)

Ajouter **sans doublon** :

- Terminé : Brancher Vercel ; DNS `api.mbaydiaay.com` ; 4 cartes UX (confiance / operate / parcours / polish)
- Backlog : remplacer « Backend API réel » par **Backend NestJS + Docker sur VPS** (ou mettre à jour le titre/description)

### Automatisation API (non faite ici)

Aucun jeton `TRELLO_API_KEY` / `TRELLO_TOKEN` n’a été trouvé dans l’environnement local de cette session.  
Quand tu auras un jeton : créer un board via l’API Trello ou Power-Up « CSV import », sans committer le secret dans Git.

## Lien repo

- Module 1 : https://github.com/mbay-diaay/mbay-diaay  
- Proto référence : https://github.com/MohaPeth/mbaydiaay-proto  
- Guide Moha : [`../MISSION_MODULE1_ET_TRELLO.md`](../MISSION_MODULE1_ET_TRELLO.md)  
- Domaines / API : [`../HEBERGEMENT_VERCEL_ORG.md`](../HEBERGEMENT_VERCEL_ORG.md) §8 — `api.mbaydiaay.com` → VPS  
