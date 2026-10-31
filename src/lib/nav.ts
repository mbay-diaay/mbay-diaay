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
} from "lucide-react";
import type { Permission } from "@/lib/permissions";
import { fr, type MessageKey } from "@/lib/i18n/fr";
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
      }),
      entry({
        to: "/rapports",
        labelKey: "nav.item.rapports",
        icon: FileBarChart,
        perm: ["report.generate", "report.read", "report.download"],
      }),
    ],
  },
  {
    group: "Personnes",
    groupKey: "nav.group.personnes",
    defaultOpen: true,
    items: [
      entry({
        to: "/cooperative",
        labelKey: "nav.item.cooperative",
        module: "administratif",
        icon: Building2,
        perm: "member.read",
        audience: "scoped",
      }),
      entry({
        to: "/cooperatives",
        labelKey: "nav.item.cooperatives",
        icon: Landmark,
        perm: ["scoop.manage", "org.read"],
        module: "administratif",
        audience: "consolidated",
      }),
      entry({
        to: "/equipe",
        labelKey: "nav.item.equipe",
        icon: UserCog,
        perm: "member.read",
        module: "administratif",
      }),
      entry({
        to: "/producteurs",
        labelKey: "nav.item.producteurs",
        icon: Users,
        perm: "producer.read",
        module: "administratif",
      }),
      entry({
        to: "/dossiers",
        labelKey: "nav.item.dossiers",
        icon: FolderOpen,
        perm: ["dossier.create", "dossier.review"],
        module: "administratif",
      }),
      entry({
        to: "/organisations",
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
        to: "/cotisations",
        labelKey: "nav.item.cotisations",
        icon: Wallet,
        perm: "contribution.read",
        module: "administratif",
      }),
      entry({
        to: "/reunions",
        labelKey: "nav.item.reunions",
        icon: CalendarCheck,
        perm: "meeting.read",
        module: "administratif",
      }),
      entry({
        to: "/documents",
        labelKey: "nav.item.documents",
        icon: Files,
        perm: "library.read",
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
        to: "/qualite",
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
    group: "Administration",
    groupKey: "nav.group.administration",
    defaultOpen: false,
    items: [
      entry({
        to: "/utilisateurs",
        labelKey: "nav.item.utilisateurs",
        icon: UserCog,
        perm: "user.manage",
      }),
      entry({ to: "/comptes", labelKey: "nav.item.comptes", icon: Link2, perm: "account.manage" }),
      entry({
        to: "/appareils",
        labelKey: "nav.item.appareils",
        icon: Smartphone,
        perm: "device.manage",
      }),
      entry({
        to: "/referentiels",
        labelKey: "nav.item.referentiels",
        icon: BookMarked,
        perm: "config.manage",
      }),
      entry({ to: "/imports", labelKey: "nav.item.imports", icon: Upload, perm: "import.manage" }),
      entry({ to: "/donnees", labelKey: "nav.item.donnees", icon: Archive, perm: "data.backup" }),
      entry({
        to: "/audit",
        labelKey: "nav.item.audit",
        icon: ScrollText,
        perm: ["audit.read", "audit.read.scoop"],
      }),
    ],
  },
];

/** Écrans qui lisent les filtres globaux `scoop` / `campagne` dans leur URL. */
export const FILTERED_PATHS = [
  "/cotisations",
  "/reunions",
  "/documents",
  "/dossiers",
  "/cooperative",
  "/equipe",
  "/producteurs",
  "/organisations",
  "/qualite/alertes",
  "/qualite/doublons",
];
