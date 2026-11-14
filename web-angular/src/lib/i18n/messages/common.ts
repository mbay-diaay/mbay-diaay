/** Libellés communs à plusieurs écrans : montants et unités. Le français de référence ; le wolof est calculé depuis lui. */
export const common = {
  "common.money": "{amount} FCFA",
  "common.currency": "FCFA",
  /** Navigateur sans téléchargement (blob) ou exception pendant l’export CSV. */
  "common.exportError": "Export impossible",
  "common.exportErrorDesc":
    "Le navigateur a bloqué le téléchargement ou une erreur est survenue. Réessayez ou vérifiez les paramètres du navigateur.",
  /** Pagination des tableaux (`ui-pagination`). */
  "common.pager.label": "Pagination",
  /** « 21–40 sur 96 » : le mot entre la plage et le total. */
  "common.pager.of": "sur",
  "common.pager.prev": "Page précédente",
  "common.pager.next": "Page suivante",
  "common.pager.page": "Page {page}",
  "common.pager.size": "Lignes par page",
  "common.pager.sizeOption": "{size} par page",
  /** Action « voir le détail » dans les listes. */
  "common.view": "Voir",
  "common.viewDetail": "Voir le détail",
  "common.openFull": "Ouvrir la fiche complète",
  "common.detail.more": "Et {count} de plus",
} as const;
