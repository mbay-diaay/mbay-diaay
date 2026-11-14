import {
  LayoutDashboard,
  Users,
  Network,
  ShieldCheck,
  Archive,
  FileBarChart,
  UserCog,
  Link2,
  Smartphone,
  BookMarked,
  Upload,
  ScrollText,
  Building2,
  FolderOpen,
  Wallet,
  CalendarCheck,
  Files,
  Landmark,
  Boxes,
  Receipt,
  TrendingUp,
  HandCoins,
  ShoppingCart,
  Sprout,
  CalendarDays,
  Leaf,
  ClipboardList,
  Map,
  BellRing,
  HardHat,
  KeyRound,
} from "lucide-angular";
// NOTE: `lucide-angular` is the deprecated package, kept deliberately for its
// `<lucide-angular [img]="data">` generic-by-value rendering, which matches
// this file's data-driven `icon: typeof Users` field exactly (React also
// stores icon *components* as plain data here). The successor
// `@lucide/angular` replaced this with one standalone component PER icon
// (`LucideUsers`, `LucideHome`, …) and dropped the generic-by-data path —
// porting to it means reworking this file to store icon names/components
// directly consumed by a switch in the rendering component, not a quick swap.
import type { Permission } from "@/lib/permissions";
import { fr, type MessageKey } from "@/lib/i18n/fr";
import { cooperativeHomeId } from "@/lib/scope";
import type { Session } from "@/lib/store";

/** `perm` : une permission, ou une liste dont une seule suffit (espace regroupant plusieurs files). */
export type NavItem = {
  to: string;
  /** Clé du libellé : à traduire à l'affichage (`t(item.labelKey)`). */
  labelKey: MessageKey;
  /** Libellé français (référence), pour le code qui n'est pas un composant. */
  label: string;
  icon: typeof Users;
  perm: Permission | Permission[];
  /** Fonction pas encore construite : affichée « à venir », sans lien (aucun lien mort). */
  soon?: boolean;
  /** Module métier de la note de cadrage : sert à la page d'accueil des modules, pas à l'ordre du menu. */
  module?: ModuleId;
  /** Masquée pour un compte d'une seule coopérative : sa fiche coopérative lui sert d'accueil (`cooperativeHomeId`). */
  hiddenWithCooperativeHome?: boolean;
  /** Entrée réservée aux sessions limitées à leurs coopératives (« scoped ») ou en vue consolidée. */
  audience?: "scoped" | "consolidated";
};
export type ModuleId = "administratif" | "commercial" | "exploitation" | "agronomique" | "sig";
/** Entrée de menu : le libellé français se lit dans le dictionnaire, une seule source. */
const entry = (i: Omit<NavItem, "label">): NavItem => ({ ...i, label: fr[i.labelKey] });
const soon = (labelKey: MessageKey, icon: typeof Users, module: ModuleId): NavItem =>
  entry({
    to: "",
    labelKey,
    icon,
    module,
    perm: "dashboard.read",
    soon: true,
  });
export const navAllowed = (session: Session, i: NavItem) =>
  !(i.hiddenWithCooperativeHome && cooperativeHomeId(session)) &&
  (i.audience === undefined ||
    (i.audience === "consolidated") === (session.scope.kind === "consolidé")) &&
  (Array.isArray(i.perm)
    ? i.perm.some((p) => session.permissions.includes(p))
    : session.permissions.includes(i.perm));
export type NavGroup = {
  group: string;
  groupKey: MessageKey;
  items: NavItem[];
  /** Ouvert au premier affichage (sinon replié) ; le groupe de la page courante s'ouvre toujours. */
  defaultOpen: boolean;
  /** Pas d'en-tête : entrées toujours visibles (Tableau de bord, Rapports). */
  flat?: boolean;
};

/**
 * Menu borné au Module 1 (Administratif) + socle transversal (auth, qualité, administration).
 * Les modules M2–M5 restent listés comme « à venir » pour la page d'accueil des modules.
 */
export const NAV: NavGroup[] = [
  {
    group: "Pilotage",
    groupKey: "nav.group.pilotage",
    defaultOpen: true,
    flat: true,
    items: [
      entry({
        to: "/",
        labelKey: "nav.item.dashboard",
        icon: LayoutDashboard,
        perm: "dashboard.read",
        hiddenWithCooperativeHome: true,
      }),
      entry({
        to: "/dashboard/rapports",
        labelKey: "nav.item.rapports",
        icon: FileBarChart,
        perm: ["report.generate", "report.read", "report.download"],
        hiddenWithCooperativeHome: true,
      }),
    ],
  },
  {
    group: "Personnes",
    groupKey: "nav.group.personnes",
    defaultOpen: true,
    items: [
      entry({
        to: "/dashboard/cooperative",
        labelKey: "nav.item.cooperative",
        module: "administratif",
        icon: Building2,
        perm: "member.read",
        audience: "scoped",
      }),
      entry({
        to: "/dashboard/cooperatives",
        labelKey: "nav.item.cooperatives",
        icon: Landmark,
        perm: ["scoop.manage", "org.read"],
        module: "administratif",
        audience: "consolidated",
      }),
      entry({
        to: "/dashboard/personnel",
        labelKey: "nav.item.personnel",
        icon: UserCog,
        perm: "role.assign",
        module: "administratif",
      }),
      entry({
        to: "/dashboard/techniciens",
        labelKey: "nav.item.techniciens",
        icon: HardHat,
        perm: "technician.invite",
        module: "administratif",
      }),
      entry({
        to: "/dashboard/producteurs",
        labelKey: "nav.item.producteurs",
        icon: Users,
        perm: "producer.read",
        module: "administratif",
      }),
      entry({
        to: "/dashboard/dossiers",
        labelKey: "nav.item.dossiers",
        icon: FolderOpen,
        perm: ["dossier.create", "dossier.review"],
        module: "administratif",
      }),
      entry({
        to: "/dashboard/organisations",
        labelKey: "nav.item.organisations",
        icon: Network,
        perm: "org.read",
        module: "administratif",
      }),
    ],
  },
  {
    group: "Vie de la coopérative",
    groupKey: "nav.group.vie",
    defaultOpen: false,
    items: [
      entry({
        to: "/dashboard/cotisations",
        labelKey: "nav.item.cotisations",
        icon: Wallet,
        perm: "contribution.read",
        module: "administratif",
      }),
      entry({
        to: "/dashboard/reunions",
        labelKey: "nav.item.reunions",
        icon: CalendarCheck,
        perm: "meeting.read",
        module: "administratif",
      }),
      entry({
        to: "/dashboard/documents",
        labelKey: "nav.item.documents",
        icon: Files,
        perm: "library.read",
        module: "administratif",
      }),
      entry({
        to: "/dashboard/rappels",
        labelKey: "nav.item.rappels",
        icon: BellRing,
        perm: "notification.configure",
        module: "administratif",
      }),
    ],
  },
  {
    group: "Qualité des données",
    groupKey: "nav.group.terrain",
    defaultOpen: false,
    items: [
      entry({
        to: "/dashboard/qualite",
        labelKey: "nav.item.qualite",
        icon: ShieldCheck,
        perm: ["quality.review", "alert.manage", "correction.manage"],
      }),
      // M2–M5 : visibles sur la page modules comme « à venir », absents du menu cliquable.
      soon("nav.item.stocks", Boxes, "commercial"),
      soon("nav.item.credits", HandCoins, "commercial"),
      soon("nav.item.ventes", ShoppingCart, "commercial"),
      soon("nav.item.charges", Receipt, "exploitation"),
      soon("nav.item.exploitation", TrendingUp, "exploitation"),
      soon("nav.item.plans", Sprout, "agronomique"),
      soon("nav.item.campagnes", CalendarDays, "agronomique"),
      soon("nav.item.calendriers", Leaf, "agronomique"),
      soon("nav.item.suivi", ClipboardList, "agronomique"),
      soon("nav.item.carte", Map, "sig"),
    ],
  },
  {
    // Bloc réservé au super administrateur (droit `role.configure`) : jamais mêlé à l'administration courante.
    group: "Super administration",
    groupKey: "nav.group.superadmin",
    defaultOpen: true,
    items: [
      entry({
        to: "/dashboard/super-admin/roles",
        labelKey: "nav.item.superadminRoles",
        icon: KeyRound,
        perm: "role.configure",
      }),
      entry({
        to: "/dashboard/super-admin/comptes",
        labelKey: "nav.item.superadminComptes",
        icon: KeyRound,
        perm: "role.configure",
      }),
    ],
  },
  {
    group: "Administration",
    groupKey: "nav.group.administration",
    defaultOpen: false,
    items: [
      entry({
        to: "/dashboard/utilisateurs",
        labelKey: "nav.item.utilisateurs",
        icon: UserCog,
        perm: "user.manage",
      }),
      entry({ to: "/dashboard/comptes", labelKey: "nav.item.comptes", icon: Link2, perm: "account.manage" }),
      entry({
        to: "/dashboard/appareils",
        labelKey: "nav.item.appareils",
        icon: Smartphone,
        perm: "device.manage",
      }),
      entry({
        to: "/dashboard/referentiels",
        labelKey: "nav.item.referentiels",
        icon: BookMarked,
        perm: "config.manage",
      }),
      entry({ to: "/dashboard/imports", labelKey: "nav.item.imports", icon: Upload, perm: "import.manage" }),
      entry({ to: "/dashboard/donnees", labelKey: "nav.item.donnees", icon: Archive, perm: "data.backup" }),
      entry({
        to: "/dashboard/roles-cooperative",
        labelKey: "nav.item.rolesCooperative",
        icon: KeyRound,
        perm: "subrole.manage",
      }),
      entry({
        to: "/dashboard/audit",
        labelKey: "nav.item.audit",
        icon: ScrollText,
        perm: ["audit.read", "audit.read.scoop"],
      }),
    ],
  },
];

/** Écrans qui lisent les filtres globaux `scoop` / `campagne` dans leur URL. */
export const FILTERED_PATHS = [
  "/dashboard/cotisations",
  "/dashboard/reunions",
  "/dashboard/documents",
  "/dashboard/dossiers",
  "/dashboard/cooperative",
  "/dashboard/producteurs",
  "/dashboard/organisations",
  "/dashboard/qualite/alertes",
  "/dashboard/qualite/doublons",
];
