# Roadmap — Mbay Diaay (prototype web)

- [x] Design system from design-tokens.json
- [x] Login (phone + OTP, admin second factor), permission-driven shell
- [x] Dashboard, producers (list + sheet), organisations
- [x] Duplicates, alerts, map, reports, users & roles, imports, audit
- [x] Suggest next step to the user (after remix)

## Finalisation demandée — deux lots

- [x] Valider le plan de finalisation sans Lovable Cloud.
- [x] Lot 1A — Écrans manquants : corrections, liaison compte/producteur, appareils, référentiels (qualification en lot déjà présente sous Organisations › Qualifier).
- [x] Lot 1B — Fiche producteur : statut recensé/membre, demandes avant/après avec motif, onglet Demandes, historique et passerelles.
- [x] Lot 1C — Carte et fiche parcelle : bascule statut/famille, anomalies (<100 m², >10 ha, sans culture), chevauchements (fichier distinct), contours bruts/réparés, validation, PDF/GeoJSON.
- [x] Lot 1 — Parcours croisés vérifiés (connexion, correction, carte, parcelle), 6 tests verts, aucune 404.
- [ ] Lot 2A — Aligner la source de données sur le cadrage (fichier mbay_fixture_complet.json à retrouver ou fournir).
- [x] Lot 2B — Doublons : 6 statuts + fusion réversible, téléphones partagés dans un onglet séparé, minicarte de comparaison des parcelles.
- [x] Lot 2C — Import Excel multi-feuilles : rapport à blanc feuille par feuille, historique des lots avec nombre de feuilles.
- [x] Lot 2D — Filtres globaux SCOOP + campagne dans l’URL (producteurs, organisations, carte, alertes, doublons), recherche universelle Cmd+K, bandeau « Mode démonstration ».
- [x] Recette finale lot 2 : parcours navigateur vérifiés (onglets doublons, minicarte, filtres URL, Cmd+K, import multi-feuilles), 7 tests verts, build OK, aucune erreur console.
