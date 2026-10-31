# Note de rappel — Demande des photos KoboToolbox

| | |
|---|---|
| **Projet** | Mbay Diaay |
| **Créée le** | 22 octobre 2026 |
| **Statut** | À envoyer |
| **Porteur** | Glenn |
| **À qui demander** | Le propriétaire du projet Kobo (CRADESC ou CANAS : à identifier) |
| **Urgence** | Moyenne, mais bloquante pour la migration des photos vers MinIO (PRD Backend §6.3) |

## 1. Pourquoi

La base CRADESC (`CRADESC_Base_Niayes_Collecte_SocioEco_Parcelles`) ne contient pas les photos, seulement des liens vers KoboToolbox :

| Type de photo | Liens |
|---|---|
| Photo du producteur | 1 064 |
| Photo de parcelle | 1 475 |
| Document foncier | 51 |
| **Total** | **≈ 2 590** |

Tous les liens sont au format `https://eu.kobotoolbox.org/api/v2/assets/…/attachments/…` : ils exigent une **connexion à un compte autorisé**. Si le compte ou le projet est fermé, les liens ne fonctionnent plus et les photos sont perdues pour nous.

> Je ne connais aucune date de fin d'accès : c'est un **risque**, pas une échéance connue. Il faut demander tôt.

## 2. Ce qu'on demande

À la personne qui détient le projet Kobo, dans l'ordre de préférence :

1. **Export ZIP des photos (recommandé).** Dans le projet : onglet **DATA** → **Downloads** → type d'export **Media Attachments (ZIP)** → **New Export** → télécharger le ZIP quand il est prêt.
2. **Accès en lecture pour Glenn.** **SETTINGS** → **Sharing** → **Add user** → identifiant Kobo de Glenn → permission **View submissions** → **Grant permissions**. Nécessite que Glenn ait un compte sur le **même serveur** (`eu.kobotoolbox.org`).
3. **Repli si le ZIP échoue** (gros volume) : export Excel avec « Include media URLs », puis téléchargement avec un outil adapté, depuis le compte qui détient les médias.

Limites connues de l'export ZIP :

- il ne contient que les questions de la **dernière version** du formulaire ;
- il peut rester sur « Pending » ou échouer pour un gros projet (ne pas cliquer plusieurs fois sur actualiser) ;
- la documentation ne donne pas de limite de taille.

## 3. Message prêt à envoyer

> Bonjour,
>
> Pour l'intégration de la base de collecte dans la plateforme Mbay Diaay, nous avons besoin des photos des fiches (producteurs, parcelles, documents fonciers), actuellement hébergées sur KoboToolbox.
>
> Pouvez-vous lancer un export « Media Attachments (ZIP) » depuis l'onglet Downloads du projet et nous transmettre le fichier ? Si possible, merci aussi de nous donner l'accès « View submissions » sur le projet.
>
> Ces photos contiennent des données personnelles (visages, titres fonciers) : merci de nous les transmettre par un canal sécurisé.
>
> Merci d'avance.

## 4. À vérifier à la réception

- [ ] Le nombre de fichiers est cohérent avec les ≈ 2 590 liens (sinon : photos manquantes dues à une ancienne version du formulaire).
- [ ] Les dossiers sont nommés par `rootUuid`. Vérifier qu'il correspond à la colonne `Kobo_UUID` de la feuille Producteurs (sinon utiliser `Kobo_ID`).
- [ ] Un échantillon de photos s'ouvre et correspond à la bonne fiche.
- [ ] Les photos sont copiées dans MinIO et les liens Kobo sont remplacés (PRD Backend §6.3).
- [ ] L'archive d'origine est conservée en lieu sûr, à accès restreint.

## 5. Précautions

- Les photos sont des **données personnelles** : canal de transfert sécurisé, accès restreint, pas de stockage dans un dossier partagé ouvert.
- Les comptes et accès du projet devraient être **au nom du CRADESC** (INF 52 de la Note de cadrage).
- Qui est le responsable du traitement, et les formalités CDP, restent à valider (PRD Backend §9, Q8).

## Sources

- [Managing respondent-submitted media — KoboToolbox](https://support.kobotoolbox.org/managing_media_responses.html)
- [Managing permissions — KoboToolbox](https://support.kobotoolbox.org/managing_permissions.html)
