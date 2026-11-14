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
  | "identity.read_full"
  | "contact.read"
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
  | "exploitation.read"
  | "role.configure"
  | "technician.invite"
  | "minutes.manage"
  | "decision.manage"
  | "notification.configure"
  | "library.upload"
  | "subrole.manage";

/** Rôles fournis avec l'application (leurs règles métier sont dans le code). */
export type BuiltInRoleId =
  | "superadmin"
  | "admin"
  | "gestionnaire"
  | "faitiere"
  | "technicien"
  | "representant"
  | "secretaire"
  | "ventes"
  | "rapports"
  | "bureau"
  | "surveillance";

/** Rôle créé par le super administrateur : identifiant `custom-…`, nom et portée choisis par lui. */
export type CustomRoleId = `custom-${string}`;

export type RoleId = BuiltInRoleId | CustomRoleId;

/** Rôle créé par le super administrateur (les droits sont dans la matrice, comme pour les autres rôles). */
export interface CustomRole {
  id: CustomRoleId;
  name: string;
  description: string;
  /**
   * Coopérative propriétaire : un sous-rôle créé par un gestionnaire n'existe que dans sa coopérative.
   * Absent : rôle global, créé par le super administrateur.
   */
  scoopId?: string | undefined;
  /** Vrai : limité à une coopérative ; faux : vue consolidée. */
  scoped: boolean;
  createdAt: string;
  createdBy: string;
}

export const isCustomRoleId = (value: unknown): value is CustomRoleId =>
  typeof value === "string" && /^custom-[a-z0-9-]{1,60}$/.test(value);

export interface Scope {
  kind: "consolidé" | "scoop";
  /** SCOOP principale d'un rôle limité (la première de `scoopIds`). */
  scoopId?: string;
  /** Toutes les SCOOP visibles : une seule pour un rôle de coopérative, une ou plusieurs pour un technicien. */
  scoopIds?: string[];
}

/** Libellés français (référence) lus dans le dictionnaire : une seule source pour les rôles et les droits. */
export const ROLE_LABEL: Record<BuiltInRoleId, string> = {
  superadmin: fr["role.superadmin"],
  admin: fr["role.admin"],
  gestionnaire: fr["role.gestionnaire"],
  faitiere: fr["role.faitiere"],
  technicien: fr["role.technicien"],
  representant: fr["role.representant"],
  secretaire: fr["role.secretaire"],
  ventes: fr["role.ventes"],
  rapports: fr["role.rapports"],
  bureau: fr["role.bureau"],
  surveillance: fr["role.surveillance"],
};

/** Rôles intégrés, dans l'ordre d'affichage. */
export const BUILT_IN_ROLES = Object.keys(ROLE_LABEL) as BuiltInRoleId[];

export const isBuiltInRole = (value: unknown): value is BuiltInRoleId =>
  typeof value === "string" && value in ROLE_LABEL;

/** Rôle connu : intégré, ou créé par le super administrateur et encore présent. */
export const isKnownRole = (value: unknown, customRoles: readonly CustomRole[]): value is RoleId =>
  isBuiltInRole(value) || customRoles.some((role) => role.id === value);

/** Nom d'un rôle en français (référence) : libellé intégré ou nom choisi à la création. */
export const roleName = (role: RoleId, customRoles: readonly CustomRole[]): string =>
  isBuiltInRole(role) ? ROLE_LABEL[role] : (customRoles.find((item) => item.id === role)?.name ?? role);

/** Rôle limité à sa coopérative ? Un rôle créé inconnu est traité comme limité (jamais de vue consolidée par défaut). */
export const roleIsScoped = (role: RoleId, customRoles: readonly CustomRole[]): boolean =>
  isBuiltInRole(role) ? ROLE_IS_SCOPED[role] : (customRoles.find((item) => item.id === role)?.scoped ?? true);

/** Rôles qui peuvent être liés à plusieurs coopératives : le technicien et la faîtière. */
export const MULTI_SCOPE_ROLES: readonly BuiltInRoleId[] = ["technicien", "faitiere"];
export const roleAllowsManyScoops = (role: RoleId): boolean =>
  (MULTI_SCOPE_ROLES as readonly string[]).includes(role);

/** Rôles qu'un administrateur CRADESC ne crée ni n'attribue : seul le super administrateur le fait. */
export const SUPER_ADMIN_ONLY_ROLES: readonly BuiltInRoleId[] = ["superadmin", "admin"];

/**
 * Droits qu'un gestionnaire ne peut pas confier à un sous-rôle : administration de la plateforme, du réseau et
 * des comptes. Un sous-rôle reçoit au plus ce que son créateur a, moins cette liste.
 */
export const NON_DELEGABLE_PERMISSIONS: readonly Permission[] = [
  "role.configure",
  "role.assign",
  "subrole.manage",
  "user.manage",
  "scoop.manage",
  "data.backup",
  "import.manage",
  "config.manage",
  "device.manage",
  "account.manage",
  "audit.read",
  "quality.merge",
  "producer.export_nominatif",
  "identity.read_full",
  "contact.read",
  "map.export",
];

/** Droits que `creatorPermissions` peut confier à un sous-rôle de sa coopérative. */
export const delegablePermissions = (creatorPermissions: readonly Permission[]): Permission[] =>
  ALL_PERMISSIONS.filter(
    (permission) =>
      creatorPermissions.includes(permission) && !NON_DELEGABLE_PERMISSIONS.includes(permission),
  );

export const PERMISSION_LABEL: Record<Permission, string> = Object.fromEntries(
  (Object.keys(fr) as (keyof typeof fr)[])
    .filter((k) => k.startsWith("perm."))
    .map((k) => [k.slice("perm.".length), fr[k]]),
) as Record<Permission, string>;

/** Rôle dont les droits ne se modifient jamais : il garde tout, pour qu'on ne puisse pas s'enfermer dehors. */
export const LOCKED_ROLE: BuiltInRoleId = "superadmin";

/** Droit de modifier la matrice des rôles : réservé au super administrateur, jamais distribué. */
export const RESERVED_PERMISSIONS: readonly Permission[] = ["role.configure"];

const ALL_PERMISSIONS = Object.keys(PERMISSION_LABEL) as Permission[];

/** Ce qu'un rôle de coopérative en lecture seule voit de sa SCOOP. */
const SCOOP_READ_ONLY: Permission[] = [
  "dashboard.read",
  "org.read",
  "producer.read",
  "member.read",
  "contribution.read",
  "meeting.read",
  "library.read",
  "document.read",
  "report.read",
  "report.download",
  "audit.read.scoop",
];

/**
 * Matrice par défaut (Module 1, matrice des droits proposée au CRADESC, DEC 05). Le super administrateur la
 * modifie depuis « Utilisateurs & rôles » ; le serveur applique la même matrice à chaque requête.
 */
export const DEFAULT_ROLE_PERMISSIONS: Record<BuiltInRoleId, Permission[]> = {
  superadmin: ALL_PERMISSIONS,
  // Administrateur CRADESC : tout, sauf la configuration des rôles et l'écriture dans la vie des SCOOP
  // (réunions, procès-verbaux, décisions : lecture seule) et la saisie de dossiers (il les approuve).
  admin: ALL_PERMISSIONS.filter(
    (permission) =>
      ![
        "role.configure",
        "meeting.manage",
        "minutes.manage",
        "decision.manage",
        "dossier.create",
        "dossier.submit",
      ].includes(permission),
  ),
  gestionnaire: [
    "sales.read",
    "sales.manage",
    "contribution.read",
    "contribution.manage",
    "meeting.read",
    "meeting.manage",
    "minutes.manage",
    "decision.manage",
    "notification.configure",
    "library.read",
    "library.upload",
    "library.manage",
    "dashboard.read",
    "org.read",
    "producer.read",
    "producer.edit",
    "org.manage",
    "quality.review",
    "correction.manage",
    "alert.manage",
    "map.read",
    "report.generate",
    "report.read",
    "report.download",
    "member.read",
    "member.manage",
    "contact.read",
    "role.assign",
    "technician.invite",
    "subrole.manage",
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
  // Faîtière : lecture consolidée de toutes les coopératives, aucun droit d'écriture.
  faitiere: [
    "sales.read",
    "contribution.read",
    "meeting.read",
    "library.read",
    "document.read",
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
  // Technicien : il recense les producteurs et les GIE de ses coopératives (application mobile), rien de plus.
  technicien: [
    "dashboard.read",
    "org.read",
    "producer.read",
    "dossier.create",
    "dossier.submit",
    "document.read",
  ],
  // Élu du bureau (président, secrétaire général, trésorier) : la vie de la SCOOP, sans la qualité des données.
  bureau: [
    ...SCOOP_READ_ONLY,
    "member.manage",
    "contribution.manage",
    "meeting.manage",
    "minutes.manage",
    "decision.manage",
    "notification.configure",
    "library.upload",
    "library.manage",
    "dossier.review",
    "document.download",
    "report.generate",
  ],
  // Conseil de surveillance : contrôle en lecture seule de sa SCOOP.
  surveillance: [...SCOOP_READ_ONLY],
  representant: [
    "sales.read",
    "contribution.read",
    "contribution.manage",
    "meeting.read",
    "meeting.manage",
    "minutes.manage",
    "decision.manage",
    "library.read",
    "library.upload",
    "library.manage",
    "dashboard.read",
    "org.read",
    "producer.read",
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
    "minutes.manage",
    "library.read",
    "library.upload",
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

/** Matrice des rôles en vigueur (rôles intégrés et rôles créés), modifiable par le super administrateur. */
export type RolePermissionsMatrix = Record<string, Permission[]>;

/** Copie modifiable de la matrice par défaut (point de départ du store). */
export const cloneDefaultMatrix = (): RolePermissionsMatrix =>
  Object.fromEntries(
    BUILT_IN_ROLES.map((role) => [
      role,
      [...DEFAULT_ROLE_PERMISSIONS[role]],
    ]),
  ) as RolePermissionsMatrix;

/**
 * Nettoie une liste de droits avant de l'appliquer à un rôle : droits connus uniquement, sans doublon, dans
 * l'ordre du catalogue ; les droits réservés ne se distribuent pas ; le rôle verrouillé garde tout.
 */
export function sanitizeRolePermissions(role: RoleId, wanted: readonly string[]): Permission[] {
  if (role === LOCKED_ROLE) return [...ALL_PERMISSIONS];
  const wantedSet = new Set(wanted);
  return ALL_PERMISSIONS.filter(
    (permission) => wantedSet.has(permission) && !RESERVED_PERMISSIONS.includes(permission),
  );
}

/** Familles de droits, dans l'ordre d'affichage de l'éditeur de rôles. */
export const PERMISSION_GROUPS: readonly { key: string; permissions: readonly Permission[] }[] = [
  {
    key: "pilotage",
    permissions: [
      "dashboard.read",
      "report.generate",
      "report.read",
      "report.download",
      "audit.read",
      "audit.read.scoop",
    ],
  },
  {
    key: "personnes",
    permissions: [
      "producer.read",
      "producer.edit",
      "producer.export_nominatif",
      "identity.read_full",
      "contact.read",
      "member.read",
      "member.manage",
      "dossier.create",
      "dossier.submit",
      "dossier.review",
      "document.read",
      "document.download",
      "org.read",
      "org.manage",
      "scoop.manage",
    ],
  },
  {
    key: "vie",
    permissions: [
      "contribution.read",
      "contribution.manage",
      "meeting.read",
      "meeting.manage",
      "minutes.manage",
      "decision.manage",
      "library.read",
      "library.upload",
      "library.manage",
      "notification.configure",
    ],
  },
  {
    key: "qualite",
    permissions: [
      "quality.review",
      "quality.merge",
      "alert.manage",
      "correction.manage",
      "import.manage",
    ],
  },
  {
    key: "administration",
    permissions: [
      "user.manage",
      "technician.invite",
      "subrole.manage",
      "role.assign",
      "role.configure",
      "account.manage",
      "device.manage",
      "config.manage",
      "data.backup",
    ],
  },
  {
    key: "autresModules",
    permissions: [
      "map.read",
      "map.export",
      "plot.validate",
      "plan.read",
      "plan.write",
      "campaign.read",
      "campaign.manage",
      "calendar.read",
      "calendar.write",
      "calendar.validate",
      "operation.read",
      "operation.write",
      "sales.read",
      "sales.manage",
      "stock.read",
      "stock.manage",
      "credit.read",
      "credit.manage",
      "expense.read",
      "expense.write",
      "exploitation.read",
    ],
  },
];

/** Rôles rattachés à une ou plusieurs SCOOP : leur périmètre est limité, les autres voient la vue consolidée. */
export const ROLE_IS_SCOPED: Record<BuiltInRoleId, boolean> = {
  superadmin: false,
  bureau: true,
  surveillance: true,
  admin: false,
  gestionnaire: true,
  // Faîtière : liée à une, deux coopératives ou plus (lecture seule) ; sans lien, elle ne voit rien.
  faitiere: true,
  technicien: true,
  representant: true,
  secretaire: true,
  ventes: true,
  rapports: true,
};

/** SCOOP de démonstration quand le compte n'en précise pas : un technicien couvre deux SCOOP. */
const DEMO_SCOOPS: Record<BuiltInRoleId, string[]> = {
  superadmin: [],
  bureau: ["s1"],
  surveillance: ["s1"],
  admin: [],
  faitiere: ["s1", "s2", "s3", "s4"],
  gestionnaire: ["s1"],
  representant: ["s1"],
  secretaire: ["s1"],
  ventes: ["s1"],
  rapports: ["s1"],
  technicien: ["s1", "s2"],
};

export function fetchMyPermissions(
  role: RoleId,
  scoopIds: string[] = isBuiltInRole(role) ? DEMO_SCOOPS[role] : [],
  matrix: RolePermissionsMatrix = DEFAULT_ROLE_PERMISSIONS,
  customRoles: readonly CustomRole[] = [],
): { permissions: Permission[]; scope: Scope } {
  const permissions = [...(matrix[role] ?? [])];
  if (!roleIsScoped(role, customRoles)) return { permissions, scope: { kind: "consolidé" } };
  // Un rôle limité sans SCOOP ne voit rien : il ne retombe jamais en vue consolidée.
  const first = scoopIds[0];
  return {
    permissions,
    scope: { kind: "scoop", ...(first !== undefined && { scoopId: first }), scoopIds },
  };
}
