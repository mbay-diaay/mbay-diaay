import { fr } from "@/lib/i18n/fr";
/**
 * Simule l'endpoint « que puis-je faire ? » [BE-02 à BE-04].
 * L'interface ne code AUCUNE règle de droit : elle lit cette réponse.
 * La sécurité réelle reste côté serveur (principe W1).
 */
export type Permission =
  | "dashboard.read"
  | "producer.read"
  | "producer.edit"
  | "producer.export_nominatif"
  | "cni.read"
  | "org.read"
  | "org.manage"
  | "quality.review"
  | "quality.merge"
  | "alert.manage"
  | "map.read"
  | "plot.validate"
  | "map.export"
  | "report.generate"
  | "user.manage"
  | "import.manage"
  | "audit.read"
  | "config.manage"
  | "correction.manage"
  | "account.manage"
  | "device.manage"
  | "data.backup"
  | "member.read"
  | "member.manage"
  | "role.assign"
  | "dossier.create"
  | "dossier.submit"
  | "dossier.review"
  | "document.read"
  | "document.download"
  | "plan.read"
  | "plan.write"
  | "report.read"
  | "report.download"
  | "audit.read.scoop"
  | "sales.read"
  | "sales.manage"
  | "scoop.manage"
  | "contribution.read"
  | "contribution.manage"
  | "meeting.read"
  | "meeting.manage"
  | "library.read"
  | "library.manage"
  | "campaign.read"
  | "campaign.manage"
  | "calendar.read"
  | "calendar.write"
  | "calendar.validate"
  | "operation.read"
  | "operation.write"
  | "stock.read"
  | "stock.manage"
  | "credit.read"
  | "credit.manage"
  | "expense.read"
  | "expense.write"
  | "exploitation.read";

export type RoleId =
  | "admin"
  | "gestionnaire"
  | "faitiere"
  | "technicien"
  | "representant"
  | "secretaire"
  | "ventes"
  | "rapports";

export interface Scope {
  kind: "consolidé" | "scoop";
  /** SCOOP principale d'un rôle limité (la première de `scoopIds`). */
  scoopId?: string;
  /** Toutes les SCOOP visibles : une seule pour un rôle de coopérative, une ou plusieurs pour un technicien. */
  scoopIds?: string[];
}

/** Libellés français (référence) lus dans le dictionnaire : une seule source pour les rôles et les droits. */
export const ROLE_LABEL: Record<RoleId, string> = {
  admin: fr["role.admin"],
  gestionnaire: fr["role.gestionnaire"],
  faitiere: fr["role.faitiere"],
  technicien: fr["role.technicien"],
  representant: fr["role.representant"],
  secretaire: fr["role.secretaire"],
  ventes: fr["role.ventes"],
  rapports: fr["role.rapports"],
};

export const PERMISSION_LABEL: Record<Permission, string> = Object.fromEntries(
  (Object.keys(fr) as (keyof typeof fr)[])
    .filter((k) => k.startsWith("perm."))
    .map((k) => [k.slice("perm.".length), fr[k]]),
) as Record<Permission, string>;

// Paramétrage de rôles (modifiable côté serveur — ici, la base de travail du PRD §1).
export const ROLE_PERMISSIONS: Record<RoleId, Permission[]> = {
  admin: Object.keys(PERMISSION_LABEL) as Permission[],
  gestionnaire: [
    "sales.read",
    "sales.manage",
    "contribution.read",
    "contribution.manage",
    "meeting.read",
    "meeting.manage",
    "library.read",
    "library.manage",
    "dashboard.read",
    "org.read",
    "producer.read",
    "producer.edit",
    "cni.read",
    "org.manage",
    "quality.review",
    "correction.manage",
    "alert.manage",
    "map.read",
    "report.generate",
    "report.read",
    "report.download",
    "member.read",
    "dossier.review",
    "document.read",
    "document.download",
    "plan.read",
    "plan.write",
    "audit.read.scoop",
    "campaign.read",
    "calendar.read",
    "calendar.write",
    "calendar.validate",
    "operation.read",
    "operation.write",
    "stock.read",
    "stock.manage",
    "credit.read",
    "credit.manage",
    "expense.read",
    "expense.write",
    "exploitation.read",
  ],
  faitiere: [
    "sales.read",
    "contribution.read",
    "meeting.read",
    "dashboard.read",
    "org.read",
    "producer.read",
    "map.read",
    "report.generate",
    "report.read",
    "report.download",
    "member.read",
    "plan.read",
    "campaign.read",
    "calendar.read",
    "operation.read",
    "stock.read",
    "credit.read",
    "expense.read",
    "exploitation.read",
  ],
  technicien: [
    "dashboard.read",
    "producer.read",
    "quality.review",
    "alert.manage",
    "map.read",
    "plot.validate",
    "dossier.create",
    "dossier.submit",
    "document.read",
    "plan.read",
    "plan.write",
    "campaign.read",
    "calendar.read",
    "calendar.write",
    "operation.read",
    "operation.write",
    "expense.read",
    "expense.write",
  ],
  representant: [
    "sales.read",
    "contribution.read",
    "contribution.manage",
    "meeting.read",
    "meeting.manage",
    "library.read",
    "library.manage",
    "dashboard.read",
    "org.read",
    "producer.read",
    // Pas de cni.read : la révélation CNI reste admin CRADESC + gestionnaire SCOOP (audit A-02).
    "map.read",
    "report.generate",
    "report.read",
    "report.download",
    "member.read",
    "member.manage",
    "role.assign",
    "dossier.review",
    "document.read",
    "document.download",
    "plan.read",
    "audit.read.scoop",
    "campaign.read",
    "calendar.read",
    "operation.read",
    "stock.read",
    "credit.read",
    "expense.read",
    "exploitation.read",
  ],
  secretaire: [
    "contribution.read",
    "meeting.read",
    "meeting.manage",
    "library.read",
    "library.manage",
    "dashboard.read",
    "org.read",
    "producer.read",
    "member.read",
    "dossier.review",
    "document.read",
    "plan.read",
    "campaign.read",
    "calendar.read",
    "operation.read",
    "stock.read",
  ],
  ventes: ["dashboard.read", "sales.read", "sales.manage", "stock.read"],
  rapports: [
    "sales.read",
    "dashboard.read",
    "producer.read",
    "report.generate",
    "report.read",
    "report.download",
    "plan.read",
    "campaign.read",
    "calendar.read",
    "operation.read",
    "expense.read",
    "exploitation.read",
  ],
};

/** Rôles rattachés à une ou plusieurs SCOOP : leur périmètre est limité, les autres voient la vue consolidée. */
export const ROLE_IS_SCOPED: Record<RoleId, boolean> = {
  admin: false,
  gestionnaire: true,
  faitiere: false,
  technicien: true,
  representant: true,
  secretaire: true,
  ventes: true,
  rapports: true,
};

/** SCOOP de démonstration quand le compte n'en précise pas : un technicien couvre deux SCOOP. */
const DEMO_SCOOPS: Record<RoleId, string[]> = {
  admin: [],
  faitiere: [],
  gestionnaire: ["s1"],
  representant: ["s1"],
  secretaire: ["s1"],
  ventes: ["s1"],
  rapports: ["s1"],
  technicien: ["s1", "s2"],
};

export function fetchMyPermissions(
  role: RoleId,
  scoopIds: string[] = DEMO_SCOOPS[role],
): { permissions: Permission[]; scope: Scope } {
  if (!ROLE_IS_SCOPED[role])
    return { permissions: ROLE_PERMISSIONS[role], scope: { kind: "consolidé" } };
  // Un rôle limité sans SCOOP ne voit rien : il ne retombe jamais en vue consolidée.
  const first = scoopIds[0];
  return {
    permissions: ROLE_PERMISSIONS[role],
    scope: { kind: "scoop", ...(first !== undefined && { scoopId: first }), scoopIds },
  };
}
