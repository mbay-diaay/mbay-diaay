import { z as LayoutDashboard, H as FileChartColumnIncreasing, J as Building2, K as Landmark, U as UserCog, O as HardHat, g as Users, Q as FolderOpen, N as Network, W as Wallet, V as CalendarCheck, Y as Files, Z as BellRing, _ as ShieldCheck, $ as Boxes, a0 as HandCoins, a1 as ShoppingCart, a2 as Receipt, a3 as TrendingUp, r as Sprout, a4 as CalendarDays, a5 as Leaf, a6 as ClipboardList, a7 as Map, a8 as KeyRound, j as Link2, c as Smartphone, a9 as BookMarked, m as Upload, aa as Archive, S as ScrollText } from './lucide-angular-RJABeBQ2.mjs';
import { c as cooperativeHomeId, G as fr } from './locale.service-c0QhtcVY.mjs';

var entry = (i) => ({
  ...i,
  label: fr[i.labelKey]
});
var soon = (labelKey, icon, module) => entry({
  to: "",
  labelKey,
  icon,
  module,
  perm: "dashboard.read",
  soon: true
});
var navAllowed = (session, i) => !(i.hiddenWithCooperativeHome && cooperativeHomeId(session)) && (i.audience === void 0 || i.audience === "consolidated" === (session.scope.kind === "consolid\xE9")) && (Array.isArray(i.perm) ? i.perm.some((p) => session.permissions.includes(p)) : session.permissions.includes(i.perm));
var NAV = [
  {
    group: "Pilotage",
    groupKey: "nav.group.pilotage",
    defaultOpen: true,
    flat: true,
    items: [entry({
      to: "/",
      labelKey: "nav.item.dashboard",
      icon: LayoutDashboard,
      perm: "dashboard.read",
      hiddenWithCooperativeHome: true
    }), entry({
      to: "/dashboard/rapports",
      labelKey: "nav.item.rapports",
      icon: FileChartColumnIncreasing,
      perm: [
        "report.generate",
        "report.read",
        "report.download"
      ],
      hiddenWithCooperativeHome: true
    })]
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
        audience: "scoped"
      }),
      entry({
        to: "/dashboard/cooperatives",
        labelKey: "nav.item.cooperatives",
        icon: Landmark,
        perm: ["scoop.manage", "org.read"],
        module: "administratif",
        audience: "consolidated"
      }),
      entry({
        to: "/dashboard/personnel",
        labelKey: "nav.item.personnel",
        icon: UserCog,
        perm: "role.assign",
        module: "administratif"
      }),
      entry({
        to: "/dashboard/techniciens",
        labelKey: "nav.item.techniciens",
        icon: HardHat,
        perm: "technician.invite",
        module: "administratif"
      }),
      entry({
        to: "/dashboard/producteurs",
        labelKey: "nav.item.producteurs",
        icon: Users,
        perm: "producer.read",
        module: "administratif"
      }),
      entry({
        to: "/dashboard/dossiers",
        labelKey: "nav.item.dossiers",
        icon: FolderOpen,
        perm: ["dossier.create", "dossier.review"],
        module: "administratif"
      }),
      entry({
        to: "/dashboard/organisations",
        labelKey: "nav.item.organisations",
        icon: Network,
        perm: "org.read",
        module: "administratif"
      })
    ]
  },
  {
    group: "Vie de la coop\xE9rative",
    groupKey: "nav.group.vie",
    defaultOpen: false,
    items: [
      entry({
        to: "/dashboard/cotisations",
        labelKey: "nav.item.cotisations",
        icon: Wallet,
        perm: "contribution.read",
        module: "administratif"
      }),
      entry({
        to: "/dashboard/reunions",
        labelKey: "nav.item.reunions",
        icon: CalendarCheck,
        perm: "meeting.read",
        module: "administratif"
      }),
      entry({
        to: "/dashboard/documents",
        labelKey: "nav.item.documents",
        icon: Files,
        perm: "library.read",
        module: "administratif"
      }),
      entry({
        to: "/dashboard/rappels",
        labelKey: "nav.item.rappels",
        icon: BellRing,
        perm: "notification.configure",
        module: "administratif"
      })
    ]
  },
  {
    group: "Qualit\xE9 des donn\xE9es",
    groupKey: "nav.group.terrain",
    defaultOpen: false,
    items: [
      entry({
        to: "/dashboard/qualite",
        labelKey: "nav.item.qualite",
        icon: ShieldCheck,
        perm: [
          "quality.review",
          "alert.manage",
          "correction.manage"
        ]
      }),
      soon("nav.item.stocks", Boxes, "commercial"),
      soon("nav.item.credits", HandCoins, "commercial"),
      soon("nav.item.ventes", ShoppingCart, "commercial"),
      soon("nav.item.charges", Receipt, "exploitation"),
      soon("nav.item.exploitation", TrendingUp, "exploitation"),
      soon("nav.item.plans", Sprout, "agronomique"),
      soon("nav.item.campagnes", CalendarDays, "agronomique"),
      soon("nav.item.calendriers", Leaf, "agronomique"),
      soon("nav.item.suivi", ClipboardList, "agronomique"),
      soon("nav.item.carte", Map, "sig")
    ]
  },
  {
    group: "Super administration",
    groupKey: "nav.group.superadmin",
    defaultOpen: true,
    items: [entry({
      to: "/dashboard/super-admin/roles",
      labelKey: "nav.item.superadminRoles",
      icon: KeyRound,
      perm: "role.configure"
    }), entry({
      to: "/dashboard/super-admin/comptes",
      labelKey: "nav.item.superadminComptes",
      icon: KeyRound,
      perm: "role.configure"
    })]
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
        perm: "user.manage"
      }),
      entry({
        to: "/dashboard/comptes",
        labelKey: "nav.item.comptes",
        icon: Link2,
        perm: "account.manage"
      }),
      entry({
        to: "/dashboard/appareils",
        labelKey: "nav.item.appareils",
        icon: Smartphone,
        perm: "device.manage"
      }),
      entry({
        to: "/dashboard/referentiels",
        labelKey: "nav.item.referentiels",
        icon: BookMarked,
        perm: "config.manage"
      }),
      entry({
        to: "/dashboard/imports",
        labelKey: "nav.item.imports",
        icon: Upload,
        perm: "import.manage"
      }),
      entry({
        to: "/dashboard/donnees",
        labelKey: "nav.item.donnees",
        icon: Archive,
        perm: "data.backup"
      }),
      entry({
        to: "/dashboard/roles-cooperative",
        labelKey: "nav.item.rolesCooperative",
        icon: KeyRound,
        perm: "subrole.manage"
      }),
      entry({
        to: "/dashboard/audit",
        labelKey: "nav.item.audit",
        icon: ScrollText,
        perm: ["audit.read", "audit.read.scoop"]
      })
    ]
  }
];

export { NAV as N, navAllowed as n };
//# sourceMappingURL=nav-CV7kBTDN.mjs.map
