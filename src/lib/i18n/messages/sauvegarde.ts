/** Sauvegarde et export : libellés de l'écran. Les en-têtes de fichiers et le journal restent en français. */
export const sauvegarde = {
  "sauvegarde.area": "Sauvegarde & export",
  "sauvegarde.eyebrow": "Administration",
  "sauvegarde.title": "Sauvegarde & export",
  "sauvegarde.description":
    "Exportez toutes les données pour les consulter ou les transmettre, et sauvegardez l'état complet pour le restaurer plus tard. Chaque export est inscrit au journal d'audit.",
  "sauvegarde.notice.noNominatif":
    "Votre rôle ne permet pas l'export nominatif : noms, téléphones et CNI sont retirés des exports Excel et CSV.",
  "sauvegarde.notice.noCni":
    "Les numéros de CNI sont retirés des exports (droit de lecture CNI requis).",
  "sauvegarde.export.title": "Exporter les données",
  "sauvegarde.export.description":
    "Le classeur complet reprend le format du modèle d'import : il peut être modifié puis réimporté.",
  "sauvegarde.export.all": "Classeur Excel complet",
  "sauvegarde.export.csvButton": "CSV",
  "sauvegarde.export.single": "Ou une seule entité (CSV)",
  "sauvegarde.exportAll.done": "Classeur exporté",
  "sauvegarde.exportAll.doneHint":
    "Les feuilles Organisations, Producteurs et Parcelles sont réimportables telles quelles.",
  "sauvegarde.extra.alertes": "Alertes",
  "sauvegarde.extra.doublons": "Doublons",
  "sauvegarde.extra.corrections": "Demandes de correction",
  "sauvegarde.extra.journal": "Journal d'audit",
  "sauvegarde.backup.title": "Sauvegarde complète",
  "sauvegarde.backup.description":
    "Un fichier JSON avec tout l'état de l'application : fiches, parcelles, décisions, référentiels et journal.",
  "sauvegarde.backup.download": "Télécharger une sauvegarde",
  "sauvegarde.backup.last": "Dernière sauvegarde : {date} par {user}",
  "sauvegarde.backup.none": "Aucune sauvegarde dans cette session.",
  "sauvegarde.backup.done": "Sauvegarde téléchargée",
  "sauvegarde.backup.doneHint":
    "Conservez ce fichier en lieu sûr : il contient des données personnelles.",
  "sauvegarde.restore.title": "Restaurer une sauvegarde",
  "sauvegarde.restore.description":
    "Remplace toutes les données actuelles par celles de la sauvegarde. Un aperçu des volumes est présenté avant confirmation.",
  "sauvegarde.restore.choose": "Choisir un fichier de sauvegarde",
  "sauvegarde.restore.importHintBefore":
    "Pour ajouter des données depuis un fichier Excel ou CSV sans rien remplacer, utilisez plutôt les",
  "sauvegarde.restore.importLink": "Imports",
  "sauvegarde.restore.importHintAfter": ".",
  "sauvegarde.restore.notBackup": "Ce fichier n'est pas une sauvegarde Mbay Diaay.",
  "sauvegarde.restore.failed": "Restauration impossible",
  "sauvegarde.restore.unreadable": "Fichier illisible.",
  "sauvegarde.restore.done": "Sauvegarde restaurée",
  "sauvegarde.confirm.title": "Restaurer « {file} » ?",
  "sauvegarde.confirm.description":
    "Sauvegarde du {date}. Toutes les données actuelles seront remplacées.",
  "sauvegarde.confirm.current": "Actuel",
  "sauvegarde.confirm.after": "Après restauration",
  "sauvegarde.confirm.cancel": "Annuler",
  "sauvegarde.confirm.action": "Restaurer",
  "sauvegarde.volume.organisations": "Organisations",
  "sauvegarde.volume.producteurs": "Producteurs",
  "sauvegarde.volume.parcelles": "Parcelles",
  "sauvegarde.volume.alertes": "Alertes",
  "sauvegarde.volume.doublons": "Doublons",
  "sauvegarde.volume.journal": "Entrées du journal",
} as const;
