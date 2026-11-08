# Tranches T1 / T2 — checklist opérationnelle

| | |
|---|---|
| **Réf. paiement** | Brief cadrage §12.4 · PPT 13 |
| **Date** | 8 novembre 2026 |
| **Branche front** | `chore/t1-livrables-et-modules-extra` (ne pas merger sur `main` sans décision) |
| **Branche API** | `chore/t1-livrables-architecture` |

Budget total 4 500 000 FCFA · T1 30 % · T2 30 % · T3 40 %.

---

## T1 — 1 350 000 FCFA

**Déclencheur :** signature du contrat + **L1** + **L2**.

| # | Élément | Statut | Preuve / action |
|---|---|---|---|
| T1-1 | Signature contrat | **Externe** | CANAS / CRADESC |
| T1-2 | L1 Rapport de démarrage | **Prêt à présenter** | [`L1_RAPPORT_DEMARRAGE.md`](L1_RAPPORT_DEMARRAGE.md) |
| T1-3 | L1 Annexe audit base chiffré | **Manque** | Produire sur export CRADESC (profilage, doublons, formats) |
| T1-4 | L1 Ateliers terrain documentés | **À confirmer** | CR CANAS ≥ 3 coopératives |
| T1-5 | L2 Architecture tech/fonct. | **Prêt à présenter** | [`L2_ARCHITECTURE_TECHNIQUE_FONCTIONNELLE.md`](L2_ARCHITECTURE_TECHNIQUE_FONCTIONNELLE.md) |
| T1-6 | L2 Dictionnaire + mapping migration | **Manque** | Rédiger annexe mapping Kobo/CRADESC → PostgreSQL |
| T1-7 | L2 Spec synchro (texte) | **Prêt (proposition)** | L2 §6 ; PoC Drift↔Nest = bonus / T2 |
| T1-8 | Acceptation écrite L1+L2 | **Externe** | Mail / PV client |

### Verdict T1 (technique interne)

- **Dossier L1+L2 présent et cohérent** avec le dépôt.
- **Pas encore « T1 encaissable »** tant que : signature + acceptation client + (idéalement) audit base + mapping migration.

**Pour « flotter » T1 rapidement :** prioriser T1-1, T1-3, T1-4, T1-6, T1-8.

---

## T2 — 1 350 000 FCFA — ce qui manque (préparation)

**Déclencheur :** validation de la **bêta** + **L3** + **L4**.

| # | Élément | Attendu | Écart actuel | Action |
|---|---|---|---|---|
| T2-1 | **L3** Prototype / maquettes validées | Figma mobile+web validé client | Proto web M1 prod ; Figma / validation formelle **?** | Confirmer maquettes CANAS ; PV validation L3 |
| T2-2 | **L4** Bêta recette | Mobile + web, modules Must, Swagger, SIG | Web M1 prod ; M2–M5 Angular **gated** ; Swagger API Lot1 ; **mobile offline / PostGIS** incomplets | Activer modules par lot ; avancer mobile + SIG API ; UAT |
| T2-3 | Modules Must en recette | M1–M5 utilisables en env. recette | M1 oui ; M2–M5 code prêt, flag off | `VITE_ENABLE_EXTRA_MODULES` + nav module par module |
| T2-4 | Swagger / OpenAPI | Publié / partagé | `openapi.json` API | Exposer docs-json en recette si besoin |
| T2-5 | SIG | Carte + superficies | UI carte Angular gated ; PostGIS serveur partiel | Brancher géométries API |
| T2-6 | Validation bêta client | PV UAT | Pas encore | Campagne UAT 2–3 SCOOP |

### Verdict T2

**Pas prêt aujourd’hui.** Manques structurants : **L3 validé**, **mobile + offline**, **activation contrôlée M2–M5**, **SIG serveur**, **UAT bêta**.

Le port Angular M2–M5 (cette branche) **réduit** le risque T2 côté web, sans le clôturer.

---

## T3 (rappel)

L5 à L8 : version finale, base producteurs/parcelles, manuels, rapport final + code — après UAT et prod stabilisée.

---

## Règle branches

- Travail T1 + modules extra : **uniquement** sur les branches ci-dessus.
- **`main` / prod** : ne pas ouvrir M2–M5 (`VITE_ENABLE_EXTRA_MODULES=false`).
- Merge vers `main` : décision explicite, module par module.
