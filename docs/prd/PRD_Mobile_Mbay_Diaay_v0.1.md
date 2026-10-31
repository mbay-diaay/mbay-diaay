# PRD — Application mobile · Mbay Diaay

| | |
|---|---|
| **Version** | 0.1 — brouillon de travail interne |
| **Date** | 22 octobre 2026 |
| **Auteur** | Direction technique (Lead technique) |
| **Destinataire** | Développeur mobile (Flutter) |
| **Dépend de** | PRD Backend & API partagé v0.1 (référencé **[BE-xx]**) · `design-tokens.json` |
| **Statut** | Non validé par le client. Alimente le L2 (fin S3) et le prototype L3 (fin S5). |

## 0. Convention de lecture

Statuts : **Confirmé** (source citée) · **Proposé** (ce que l'équipe **prévoit de développer** ; non validé par le client, il lui sera présenté comme une proposition et ses retours pourront le modifier) · **À valider** (décision ou information manquante).
Sources : **[NC]** Note de cadrage · **[OT]** Offre technique · **[BC]** Base CRADESC · **[BE]** PRD Backend.

> Ce PRD décrit **ce que l'application doit faire**, pas son apparence détaillée. Les maquettes viendront ensuite. Les règles métier et les droits ne sont **jamais** décidés dans l'application : le backend a le dernier mot [BE P1].

---

## 1. Objectif et utilisateurs

**Objectif.** Une application de terrain, **utilisable sans réseau**, qui permet de recenser les producteurs, relever les parcelles au GPS, déclarer les cultures et synchroniser le tout avec le serveur.

| Utilisateur | Usage principal sur mobile | Statut |
|---|---|---|
| **Technicien de SCOOP** | Utilisateur principal : collecte, relevé GPS, suivi des fiches. Données limitées à sa SCOOP. | Confirmé [OT §4.3] |
| **Producteur** | Consulter son profil, ses parcelles, son calendrier cultural ; demander une correction. Mode d'usage (autonome, assisté ou mixte) à trancher. | Confirmé / À valider (DEC 04) |
| **Gestionnaire** | Pas d'usage mobile prévu : l'administration se fait sur le web. Un affichage adapté peut s'ajouter selon l'équipement (INF 44). | À valider |

**Plateformes.** Android prioritaire ; iOS supporté selon la décision du CRADESC [OT §4.1] (INF 43).

## 2. Principes d'expérience

| # | Principe | Statut |
|---|---|---|
| M1 | L'application **démarre et fonctionne toujours depuis la base locale**. Le réseau n'est jamais bloquant. | Confirmé [OT §4.2] |
| M2 | **Jamais de message d'erreur de connexion.** Un indicateur discret montre : synchronisé / en attente / erreur à corriger / hors connexion. « Hors connexion » est un état normal, pas une erreur. | Confirmé |
| M3 | **Trois actions au plus** pour les opérations fréquentes. | Confirmé [OT §8.1] |
| M4 | Interface simple, **pictogrammes**, textes courts, français (wolof à évaluer). | Proposé (DEC 13) |
| M5 | Cibles tactiles ≥ 48 px, bon contraste (lisible en plein soleil), police lisible. | Proposé |
| M6 | L'application **n'invente pas de règle** : elle affiche ce que le serveur lui indique (droits, validations, statuts). | Confirmé [BE P1] |
| M7 | Aucune couleur, taille ni police en dur : tout vient de `design-tokens.json` (§8). | Proposé |

---

## 3. Parcours et exigences

Chaque exigence : priorité MoSCoW [NC §5.7], statut, et critères d'acceptation testables.

### 3.1 Accès et sécurité

| ID | Exigence | Prio. | Statut |
|---|---|---|---|
| MO-01 | **Activation de l'appareil.** Numéro de téléphone → code OTP par SMS → choix d'un PIN à 4 chiffres → téléchargement initial des données de son périmètre et du fond de carte. | Must | Confirmé [OT §4.3] |
| MO-02 | **Déverrouillage par PIN** sans réseau. Verrouillage temporaire après plusieurs échecs. Durée maximale d'usage hors connexion avant reconnexion obligatoire. | Must | Confirmé / À valider (INF 46, [BE-15]) |
| MO-03 | **Compte partagé entre plusieurs producteurs** : si un numéro correspond à plusieurs fiches, l'utilisateur choisit son profil après l'OTP. | Must | Proposé [BE-14] |
| MO-04 | **Appareil révoqué** : à la prochaine connexion, les données locales sont effacées. | Must | Proposé [BE-13] |

*Acceptation :* activation en moins de 5 écrans ; déverrouillage sans réseau ; après révocation, aucune donnée lisible sur l'appareil.

### 3.2 Producteurs

| ID | Exigence | Prio. | Statut |
|---|---|---|---|
| MO-10 | **Recherche** d'un producteur par nom, village ou téléphone, en local. | Must | Confirmé [NC §4.2] |
| MO-11 | **Fiche producteur** : identité, contact, SCOOP et organisation, parcelles, cultures, alertes ouvertes, photos. | Must | Confirmé |
| MO-12 | **Création / modification** d'un producteur hors connexion. Champs obligatoires alignés sur la base existante. Statut **« recensé »** (pas « membre ») par défaut. | Must | Proposé [BE-21] |
| MO-13 | **Contrôles à la saisie** : téléphone au format +221, âge plausible, CNI à 13 chiffres (avertissement, jamais de blocage). | Must | Proposé [BE-75] |
| MO-14 | **Doublon probable** (nom proche + même village, ou même téléphone) : afficher une suggestion « fiche existante ? » avec choix de continuer. Le contrôle sur la CNI est fait **par le serveur** à la synchronisation. | Should | Proposé [BE-61, BE-62] |
| MO-15 | La **CNI est masquée** à l'écran ; elle ne descend pas en clair sur l'appareil. | Must | Proposé [BE-71] |
| MO-16 | **Photo du producteur** : prise, compression, envoi différé. Consentement à la prise de photo à confirmer. | Should | À valider |

*Acceptation :* créer une fiche complète sans réseau ; la retrouver par recherche ; après synchronisation, le serveur peut signaler un doublon sans bloquer la saisie.

> **Pourquoi la CNI n'est pas comparée sur l'appareil :** l'égalité se teste par une empreinte HMAC dont le secret reste côté serveur [BE-70]. L'appareil ne peut donc pas détecter une CNI en double hors connexion ; le serveur le fait à la synchronisation.

### 3.3 Relevé de parcelle au GPS

Parcours central de l'application [OT §5.5].

| ID | Exigence | Prio. | Statut |
|---|---|---|---|
| MO-20 | **Relevé pas à pas, entièrement hors connexion** : choisir le producteur et la parcelle → se placer à un angle → « Ajouter un point » → répéter. | Must | Confirmé [OT §5.5] |
| MO-21 | Dès **3 points**, afficher le polygone et la **superficie estimée**. | Must | Confirmé |
| MO-22 | **Précision GPS** enregistrée par point ; seuil d'acceptation paramétrable (reçu du serveur) ; option de moyenne de plusieurs mesures par sommet ; mode « cheminement » le long du périmètre. | Should | Proposé [NC §9.2] |
| MO-23 | **Détection d'un contour croisé** avant confirmation : message clair et invitation à reprendre. Dans la base existante, 433 contours sur 1 534 ont dû être réparés (auto-intersection). | Must | Proposé |
| MO-24 | Enregistrement local avec le statut **« relevée »** ; la validation se fait ensuite (MO-25). | Must | Proposé |
| MO-25 | **Validation d'une géométrie** par un technicien : « validée » ou « à reprendre » avec motif. Une nouvelle géométrie crée une **nouvelle version**, jamais d'écrasement. | Must | Confirmé [NC §8.4, BE-34] |
| MO-26 | La superficie affichée sur l'appareil est **indicative** ; la valeur de référence est celle calculée par le serveur (UTM 28N). L'écart avec la superficie déclarée est affiché. | Must | Proposé [BE-30, BE-32] |
| MO-27 | **Cartes hors ligne** : fonds de la zone des Niayes empaquetés ; satellite en ligne seulement. | Must | Proposé (DEC 10) |
| MO-28 | **Photo de parcelle** et de document foncier, envoi différé. | Should | Confirmé [OT §5.4] |

*Acceptation :* relever une parcelle de 6 points en mode avion ; contour croisé détecté avant enregistrement ; après synchronisation, la superficie serveur est affichée avec l'écart.

### 3.4 Campagnes et cultures

| ID | Exigence | Prio. | Statut |
|---|---|---|---|
| MO-30 | **Déclarer une culture sur une parcelle pour une campagne** : culture (référentiel), part de la parcelle en %, variété. Types de campagne : horticole nationale (CHN) et contre-saison, extensibles. | Must | Proposé [BE-40, BE-41] |
| MO-31 | La **somme des parts** d'une parcelle ne dépasse pas 100 % (contrôle local). | Must | Proposé |
| MO-32 | Résultats d'une campagne : quantité, prix, destination (autoconsommation, vente, transformation, perte). | Should | Proposé |
| MO-33 | **Calendrier cultural** de la culture principale (lecture, dernière version synchronisée). | Must | Confirmé [OT §7.2] |

*Acceptation :* déclarer deux cultures sur une parcelle (60 % + 40 %) ; refuser 60 % + 50 %.

### 3.5 Synchronisation

Conception détaillée dans [BE §4.6] ; ce qui suit décrit le comportement visible.

| ID | Exigence | Prio. | Statut |
|---|---|---|---|
| MO-40 | **Toute action est écrite localement** avec le statut « en attente », puis envoyée en arrière-plan quand le réseau revient. | Must | Confirmé [OT §4.2] |
| MO-41 | **Indicateur d'état** permanent (synchronisé / en attente / erreur / hors connexion) et nombre d'éléments en attente. | Must | Confirmé |
| MO-42 | **Synchronisation manuelle** possible depuis l'indicateur. | Should | Proposé |
| MO-43 | **Photos dans une file séparée**, envoyées après les données, avec reprise après coupure. | Must | Confirmé [BE-53] |
| MO-44 | Écran **« À corriger »** : mutations rejetées par le serveur (droit manquant, valeur invalide, doublon signalé), avec le motif en langage simple. | Must | Proposé |
| MO-45 | **Conflit sur une fiche producteur** : la version du serveur prévaut ; l'utilisateur voit « mise à jour reçue » sur le champ concerné. Pas de perte silencieuse d'une saisie financière. | Must | Confirmé [NC §8.4, BE-52] |
| MO-46 | Chargement initial par **paquet compressé** puis synchronisation différentielle, limitée au périmètre de l'utilisateur. | Must | Confirmé [BE-51] |

*Acceptation :* 50 saisies en mode avion puis reconnexion → 0 perte, 0 doublon ; coupure au milieu d'un envoi → reprise sans rejeu ; un rejet apparaît dans « À corriger ».

### 3.6 Qualité et suivi

| ID | Exigence | Prio. | Statut |
|---|---|---|---|
| MO-50 | Liste **« Fiches à compléter / à vérifier »** pour le technicien : alertes ouvertes de sa SCOOP (ex. âge manquant, téléphone non conforme, contour à reprendre). | Should | Proposé [BE-60] |
| MO-51 | Résolution d'une alerte depuis la fiche : correction + commentaire, auditée. | Should | Proposé |

### 3.7 Espace producteur

| ID | Exigence | Prio. | Statut |
|---|---|---|---|
| MO-60 | Le producteur connecté voit **son profil, ses parcelles sur la carte et son calendrier**. | Must | Confirmé [OT §7.2] |
| MO-61 | **Correction** : champs non sensibles modifiables directement ; champs d'identité via une **demande de correction** suivie par statut. | Should | Proposé [BE-80, BE-81] |

### 3.8 Saisies commerciales et d'exploitation

Saisie rapide d'une **vente** ou d'une **charge** en trois actions au plus [OT §8.1]. Le détail (stocks, crédits, compte d'exploitation) fait l'objet d'un PRD ultérieur. Règle déjà fixée : les écritures financières sont **non modifiables** et corrigées par contre-écriture [NC §5.3].

---

## 4. Navigation (liste d'écrans, sans maquette)

| Zone | Contenu |
|---|---|
| **Accueil** | Indicateur de synchronisation, éléments à corriger, raccourcis (nouveau producteur, relever une parcelle) |
| **Producteurs** | Recherche, fiche, création |
| **Carte** | Parcelles du périmètre, relevé GPS |
| **À compléter** | Alertes et fiches à vérifier |
| **Profil et paramètres** | Compte, PIN, état de l'appareil, version, langue |

---

## 5. Données locales et sécurité

| Exigence | Statut |
|---|---|
| Base locale **SQLite via Drift**, chiffrée AES-256 ; clé protégée par le coffre sécurisé du système. | Confirmé / Proposé [OT §4.1, NC §10.3] |
| Effacement local à la révocation de l'appareil. | Proposé |
| Pas de CNI en clair sur l'appareil ; aucune donnée personnelle dans les journaux locaux. | Proposé |
| Identifiants **UUID générés par l'appareil** pour toute création hors connexion. | Confirmé [NC §7.3] |
| Chaque donnée synchronisée porte `created_at`, `updated_at`, `version`, `deleted_at` (suppression logique). | Confirmé [BE §7] |

**Volumétrie de référence.** Environ 900 producteurs et 900 à 2 700 parcelles par appareil [NC §8.5]. Dans [BC], un producteur a en moyenne 1,16 parcelle et une parcelle 1,26 culture ; un contour compte 24 points en médiane et jusqu'à 530. Ces chiffres seront recalculés après l'audit.

## 6. Exigences non fonctionnelles

| Exigence | Cible | Statut |
|---|---|---|
| Android | Parc réel des terminaux (versions, mémoire) | À valider (INF 41) |
| Réactivité | Ouverture d'une fiche et recherche fluides sur un terminal d'entrée de gamme | Proposé (seuil chiffré à fixer après INF 41) |
| Consommation | Synchronisation en arrière-plan sans vider la batterie ; photos envoyées de préférence sur bonne connexion | Proposé [NC §7.4] |
| Tests | Scénarios de coupure réseau obligatoires en recette ; couverture > 80 % sur auth et synchronisation | Confirmé [OT §10.2] |
| Accessibilité | Exigences liées au handicap à préciser | À valider (INF 42) |
| Distribution | Google Play ; version iOS selon décision | À valider (INF 43, INF 54) |

## 7. Dépendances avec le backend

| Besoin mobile | Exigence backend |
|---|---|
| Connexion, PIN, révocation | BE-10 à BE-14 |
| Producteurs, statut « recensé », contacts | BE-20 à BE-23 |
| Parcelles, géométrie versionnée, double superficie | BE-30 à BE-34 |
| Campagnes et cultures | BE-40 à BE-42 |
| Synchronisation (envoi, réception, conflits, pièces jointes) | BE-50 à BE-56 |
| Alertes et doublons | BE-60 à BE-62 |
| CNI et corrections par l'utilisateur | BE-70 à BE-75, BE-80 à BE-83 |

**À figer entre les deux équipes avant le sprint 1 :** le contrat d'API de synchronisation (format des mutations, curseur, codes de rejet), la liste des champs obligatoires par entité, et le format des paramètres reçus du serveur (seuil de précision GPS, durée hors connexion).

## 8. Charte graphique provisoire

Aucune charte n'a été transmise (INF 61 à 64). L'application utilise `design-tokens.json` : à réception de la charte, **seule la section `primitive` change**.

- Générer le `ThemeData` Flutter depuis le fichier (couleurs, typographies, espacements, rayons).
- États de synchronisation et de qualité : jetons `semantic.sync.*` et `semantic.quality.*`.
- Couleur **jamais seule** pour porter une information : toujours un pictogramme ou un texte (daltonisme, plein soleil).
- Police **embarquée** dans l'application (pas de téléchargement hors réseau).
- **Logo, nom affiché et mentions des partenaires** (INF 63, 64) : reçus du serveur via `GET /v1/branding` [BE-90, BE-92] et gardés en copie locale pour le hors connexion.
- **Icône de l'application, écran de démarrage et visuels de la fiche Google Play** : intégrés au *build*, ils ne peuvent pas changer à distance. Un changement de charte demande donc une **nouvelle version** de l'application pour ces éléments.
- Mode sombre : hors périmètre initial.

## 9. Hors périmètre et questions ouvertes

**Hors périmètre de ce PRD :** détail des modules commercial, exploitation et agronomique ; paiement mobile, SMS/USSD, alertes météo [NC §5.8].

| Réf. | Question | Décideur |
|---|---|---|
| Q1 | Mode d'usage par les producteurs : autonome, assisté ou mixte (DEC 04). Dans [BC], 90 producteurs sur 1 317 n'utilisent pas de smartphone, dont 26 femmes. | CRADESC |
| Q2 | Langue de l'interface : français avec pictogrammes ; wolof à évaluer (DEC 13). | CRADESC |
| Q3 | Version iOS pendant la mission (INF 43). | CRADESC |
| Q4 | Parc réel des terminaux des techniciens (INF 41). | CRADESC |
| Q5 | Consentement pour la photo d'un producteur. | CRADESC / sécurité |
| Q6 | Seuil de précision GPS acceptable. | Lead technique + CANAS |
| Q7 | Durée maximale hors connexion (INF 46). | CRADESC |
| Q8 | Qui valide un relevé fait par un producteur lui-même ? | CRADESC |
| Q9 | Champs obligatoires d'une fiche producteur. | CRADESC |

## 10. Critères d'acceptation globaux

1. Un technicien active son appareil, relève une parcelle, déclare une culture et crée un producteur **sans aucun réseau**.
2. À la reconnexion, tout est synchronisé **sans perte ni doublon**, y compris après une coupure en cours d'envoi.
3. Les rejets du serveur sont **compris et corrigeables** depuis « À corriger ».
4. Un appareil révoqué ne laisse **aucune donnée lisible**.
5. Aucune valeur de style n'est écrite en dur : changer `primitive` dans les tokens change l'application entière.
