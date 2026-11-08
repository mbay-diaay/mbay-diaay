# L1 — Rapport de démarrage · Mbay Diaay

| | |
|---|---|
| **Livrable contractuel** | L1 (fin S2) — Brief de cadrage §13.1 |
| **Tranche** | **T1** (avec L2) |
| **Version** | 1.0 — 8 novembre 2026 |
| **Statut** | Dossier technique prêt à présentation client / CANAS · **signature formelle client encore requise** |
| **Sources** | Note de cadrage v1.1 · Brief v0.1 · `docs/ETAT_DU_PROJET.md` · PRD v0.1 · dépôt `mbay-diaay` / `mbay-diaay-api` |

---

## 1. Objet

Synthèse du cadrage, des besoins retenus (MoSCoW), du plan de travail et des risques, pour enclencher la **tranche T1** (signature + L1 + L2).

## 2. Parties et périmètre

| Rôle | Entité |
|---|---|
| Maître d’ouvrage | CRADESC |
| Mission / coordination | CANAS |
| Réalisation technique (dépôts) | `mbay-diaay` (front Analog Angular) · `mbay-diaay-api` (NestJS) |

**Périmètre Must have** (cadrage §5.8) : M1 Administratif · M2 Commercial · M3 Exploitation · M4 Agronomique · M5 SIG · sécurité OTP / rôles · offline (mobile) · synchro.

**Hors Must (Could)** : Wave / Orange Money, SMS/USSD, météo, marketplace.

## 3. MoSCoW (rappel validé côté offre)

| Priorité | Contenu |
|---|---|
| **Must** | Cinq modules + auth OTP + RBAC + offline/synchro + carte web + superficies |
| **Should** | Alertes stock (cohérence Q-43), exports enrichis, dashboard CRADESC avancé |
| **Could** | Paiement mobile, SMS, météo |
| **Won’t (sauf décision)** | Marketplace publique, compta générale coopérative |

## 4. Ateliers et besoins

| Élément | État |
|---|---|
| Brief + note de cadrage | Produits (`docs/cadrage/`) |
| Ateliers terrain ≥ 3 coopératives | **À confirmer / documenter** avec CANAS (preuve S1–S2) |
| Besoins validés client (liste Q-xx) | Partiels — voir §7 |

## 5. Plan de travail (12 semaines — rappel)

| Phase | Semaines | Livrables |
|---|---|---|
| Analyse / conception | S1–S3 | **L1**, **L2** |
| Développement | S4–S9 | L3, L4 |
| Tests / UAT | S9–S10 | L5 |
| Déploiement / formation | S11–S12 | L6, L7, L8 |

État technique au 8 nov. 2026 : **M1 web en production** (Angular + API auth/users) ; M2–M5 Angular **portés hors menu prod** (activation progressive) ; mobile offline et PostGIS métier encore ouverts.

## 6. Annexe technique attendue L1 — audit de la base

| Attendu cadrage | État |
|---|---|
| Rapport d’audit base ~9 000 (profilage, doublons, formats) | **Manquant comme livrable daté / chiffré** — capacité UI (qualité / import) existe ; le rapport d’audit formel reste à produire avec l’export CRADESC |
| Inventaire des sources | Partiel (docs PRD / notes) |

## 7. Risques (extrait)

| Risque | Impact | Mitigation |
|---|---|---|
| Décisions client ouvertes (cotisations, rôles, INF) | Retards SFD | Checklist Q/D dans le brief ; atelier validation |
| Offline trop tard vs modules mobiles | Reprise coûteuse | Spec synchro dans L2 ; PoC tôt |
| Qualité base 9k | L6 fragile | Audit L1 + imports à blanc S7/S9 |
| L4 exige 5 modules + mobile | T2 | Port Angular M2–M5 préparé ; mobile à planifier |

## 8. Critères de clôture L1 (T1)

| Critère | Preuve | Statut |
|---|---|---|
| Synthèse cadrage + MoSCoW + plan + risques | Ce document | **Prêt** |
| Volet technique | Liens PRD + état dépôt | **Prêt** |
| Rapport d’audit base chiffré | Annexe dédiée | **Manque** |
| Ateliers terrain documentés | Compte-rendu CANAS | **À confirmer** |
| Signature / acceptation client | PV ou mail | **Externe** |

---

*Document de travail pour T1 — ne remplace pas la note de cadrage signée.*
