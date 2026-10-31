import type { Session } from "./store";
import type { MessageKey } from "./i18n";
import type { Permission } from "./permissions";
import type { DataAlert, DuplicateCase, Plot, Producer, Scoop } from "./mock/data";
import type {
  ContributionPayment,
  ContributionRule,
  ExploitationPlan,
  Meeting,
  Member,
} from "./mock/cooperative";
import { memberDues } from "./contributions";
import { activeMembers, membershipCounts } from "./membership";
import type { Credit, InputItem, Repayment, Sale, StockLot, StockMovement } from "./mock/commerce";
import type { Expense } from "./mock/exploitation";
import { accountRows, byCrop, chargesByCategory } from "./exploitation";
import {
  creditBalance,
  creditState,
  itemBalance,
  overdueAmount,
  paidTotal,
  saleTotal,
  totalDue,
} from "./commerce";
import { ageAtMost } from "./format";
import {
  inScope,
  isConsolidated,
  scoopNamesOf,
  scopedAlerts,
  scopedCases,
  scopedPlots,
} from "./scope";

export type ReportId =
  | "effectifs"
  | "superficies"
  | "qualite"
  | "reprises"
  | "cotisations"
  | "reunions"
  | "stocks"
  | "credits"
  | "ventes"
  | "exploitation"
  | "charges";

export interface ReportDef {
  id: ReportId;
  /** Nom du rapport tel qu'écrit dans le fichier généré (reste en français). */
  name: string;
  /** Clés d'affichage au catalogue de l'écran. */
  nameKey: MessageKey;
  descriptionKey: MessageKey;
  /** Droit supplémentaire pour voir ce rapport au catalogue (en plus de « Générer des rapports »). */
  perm?: Permission;
}

export const REPORTS: ReportDef[] = [
  {
    id: "effectifs",
    name: "Synthèse des effectifs",
    nameKey: "rapports.catalogue.effectifs.name",
    descriptionKey: "rapports.catalogue.effectifs.description",
  },
  {
    id: "superficies",
    name: "Superficies par spéculation",
    nameKey: "rapports.catalogue.superficies.name",
    descriptionKey: "rapports.catalogue.superficies.description",
  },
  {
    id: "qualite",
    name: "Qualité des données",
    nameKey: "rapports.catalogue.qualite.name",
    descriptionKey: "rapports.catalogue.qualite.description",
  },
  {
    id: "reprises",
    name: "Parcelles à reprendre",
    nameKey: "rapports.catalogue.reprises.name",
    descriptionKey: "rapports.catalogue.reprises.description",
    perm: "plot.validate",
  },
  {
    id: "cotisations",
    name: "Cotisations par membre",
    nameKey: "rapports.catalogue.cotisations.name",
    descriptionKey: "rapports.catalogue.cotisations.description",
    perm: "contribution.read",
  },
  {
    id: "reunions",
    name: "Réunions et présences",
    nameKey: "rapports.catalogue.reunions.name",
    descriptionKey: "rapports.catalogue.reunions.description",
    perm: "meeting.read",
  },
  {
    id: "stocks",
    name: "État des stocks d'intrants",
    nameKey: "rapports.catalogue.stocks.name",
    descriptionKey: "rapports.catalogue.stocks.description",
    perm: "stock.read",
  },
  {
    id: "credits",
    name: "Encours des crédits",
    nameKey: "rapports.catalogue.credits.name",
    descriptionKey: "rapports.catalogue.credits.description",
    perm: "credit.read",
  },
  {
    id: "ventes",
    name: "Ventes par culture",
    nameKey: "rapports.catalogue.ventes.name",
    descriptionKey: "rapports.catalogue.ventes.description",
    perm: "sales.read",
  },
  {
    id: "exploitation",
    name: "Comptes d'exploitation par culture",
    nameKey: "rapports.catalogue.exploitation.name",
    descriptionKey: "rapports.catalogue.exploitation.description",
    perm: "exploitation.read",
  },
  {
    id: "charges",
    name: "Charges par catégorie",
    nameKey: "rapports.catalogue.charges.name",
    descriptionKey: "rapports.catalogue.charges.description",
    perm: "expense.read",
  },
];

/** Rapports proposés à la session : ceux qu'elle a le droit de produire. */
export function catalogueFor(session: Session | null): ReportDef[] {
  if (!session?.permissions.includes("report.generate")) return [];
  return REPORTS.filter((r) => !r.perm || session.permissions.includes(r.perm));
}

export interface ReportData {
  producers: Producer[];
  plots: Plot[];
  alerts: DataAlert[];
  cases: DuplicateCase[];
  scoops: Scoop[];
  youthMaxAge: number;
  /** Données du module administratif ; absentes = listes vides. */
  members?: Member[];
  payments?: ContributionPayment[];
  contributionRules?: ContributionRule[];
  meetings?: Meeting[];
  inputItems?: InputItem[];
  stockLots?: StockLot[];
  stockMovements?: StockMovement[];
  credits?: Credit[];
  repayments?: Repayment[];
  sales?: Sale[];
  expenses?: Expense[];
  plans?: ExploitationPlan[];
  allPlots?: Plot[];
  /** Date du jour (ISO) pour calculer les cotisations dues ; par défaut maintenant. */
  nowIso?: string;
}

/** Réglages choisis par la personne : une SCOOP parmi celles qu'elle voit, une campagne. Absent = tout son périmètre. */
export interface ReportParams {
  scoopId?: string | undefined;
  campaign?: string | undefined;
}

export interface Report {
  name: string;
  /** Périmètre réellement couvert, rappelé dans le fichier et le journal d'audit. */
  scopeLabel: string;
  header: string[];
  rows: (string | number)[][];
}

/** Rapport généré et conservé : le contenu est figé à la date de génération, dans le périmètre de son auteur. */
export interface GeneratedReport extends Report {
  id: string;
  reportId: ReportId;
  /** SCOOP couvertes ; vide pour un rapport consolidé de toutes les coopératives. */
  scoopIds: string[];
  campaign: string | null;
  generatedBy: string;
  generatedByEmail: string;
  generatedAt: string;
}

export function scopeLabel(session: Session | null, scoops: Scoop[]): string {
  if (isConsolidated(session)) return "Vue consolidée";
  return scoopNamesOf(session, scoops) || "SCOOP";
}

/** Périmètre en clair d'un rapport : la session, précisée par la SCOOP et la campagne choisies. */
function paramsLabel(session: Session | null, scoops: Scoop[], params: ReportParams): string {
  const base = params.scoopId
    ? (scoops.find((s) => s.id === params.scoopId)?.name ?? params.scoopId)
    : scopeLabel(session, scoops);
  return params.campaign ? `${base}, campagne ${params.campaign}` : base;
}

const round1 = (n: number) => Math.round(n * 10) / 10;

/** Construit un rapport en ne lisant que les données du périmètre de la session. */
export function buildReport(
  id: ReportId,
  data: ReportData,
  session: Session | null,
  params: ReportParams = {},
): Report {
  const def = REPORTS.find((r) => r.id === id)!;
  const label = paramsLabel(session, data.scoops, params);
  const producerOf = new Map(data.producers.map((p) => [p.id, p]));
  const plotOwner = new Map(data.plots.map((p) => [p.id, p.producerId]));
  const scoopOfProducer = (producerId: string) => producerOf.get(producerId)?.scoopId;
  // Le périmètre de la session passe d'abord ; la SCOOP et la campagne choisies ne font que le réduire.
  const onlyScoop = (producerId: string) =>
    !params.scoopId || scoopOfProducer(producerId) === params.scoopId;
  const producers = inScope(
    data.producers.filter((p) => !p.mergedInto),
    session,
  ).filter((p) => onlyScoop(p.id));
  const plots = scopedPlots(data.plots, data.producers, session).filter(
    (p) => onlyScoop(p.producerId) && (!params.campaign || p.campaign === params.campaign),
  );

  if (id === "effectifs") {
    const rows = data.scoops
      .map((sc) => {
        const ps = producers.filter((p) => p.scoopId === sc.id);
        const mc = membershipCounts((data.members ?? []).filter((m) => m.scoopId === sc.id));
        return [
          sc.name,
          ps.length,
          mc.active,
          mc.candidates,
          ps.filter((p) => p.sex === "F").length,
          ps.filter((p) => p.sex === "H").length,
          ps.filter((p) => ageAtMost(p.age, data.youthMaxAge)).length,
          ps.filter((p) => p.handicap).length,
          ps.filter((p) => p.quality !== "validé").length,
        ];
      })
      .filter((r) => (r[1] as number) > 0 || (r[2] as number) > 0);
    const total = [
      "Total",
      ...[1, 2, 3, 4, 5, 6, 7, 8].map((i) => rows.reduce((n, r) => n + (r[i] as number), 0)),
    ];
    return {
      name: def.name,
      scopeLabel: label,
      header: [
        "SCOOP",
        "Fiches recensées",
        "Adhérents actifs",
        "Candidats",
        "Femmes (producteurs)",
        "Hommes (producteurs)",
        `Jeunes (${data.youthMaxAge} ans ou moins)`,
        "Situation de handicap",
        "Fiches à vérifier",
      ],
      rows: [...rows, total],
    };
  }

  if (id === "superficies") {
    const groups = new Map<
      string,
      { crop: string; campaign: string; n: number; measured: number; declared: number }
    >();
    for (const p of plots) {
      const k = `${p.crop}|${p.campaign}`;
      const g = groups.get(k) ?? {
        crop: p.crop,
        campaign: p.campaign,
        n: 0,
        measured: 0,
        declared: 0,
      };
      g.n += 1;
      g.measured += p.measured;
      g.declared += p.declared;
      groups.set(k, g);
    }
    const rows = [...groups.values()]
      .sort((a, b) => a.campaign.localeCompare(b.campaign) || a.crop.localeCompare(b.crop))
      .map((g) => [g.crop, g.campaign, g.n, round1(g.measured), round1(g.declared)]);
    return {
      name: def.name,
      scopeLabel: label,
      header: ["Culture", "Campagne", "Parcelles", "Surface mesurée (ha)", "Surface déclarée (ha)"],
      rows,
    };
  }

  if (id === "qualite") {
    const alerts = scopedAlerts(data.alerts, data.producers, data.plots, session).filter(
      (a) =>
        a.status === "ouvert" &&
        onlyScoop(a.entity === "producteur" ? a.entityId : (plotOwner.get(a.entityId) ?? "")),
    );
    const byType = new Map<string, number>();
    alerts.forEach((a) => byType.set(a.type, (byType.get(a.type) ?? 0) + 1));
    const cases = scopedCases(data.cases, data.producers, session).filter(
      (c) => c.status === "à examiner" && onlyScoop(c.aId),
    );
    const rows: (string | number)[][] = [
      ["Producteurs", producers.length],
      ["Fiches à vérifier", producers.filter((p) => p.quality !== "validé").length],
      ["Doublons à examiner", cases.length],
      ["Alertes ouvertes", alerts.length],
      ...[...byType.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([t, n]) => [`Alertes ouvertes : ${t}`, n]),
    ];
    return { name: def.name, scopeLabel: label, header: ["Indicateur", "Valeur"], rows };
  }

  const scoopName = (sid: string) => data.scoops.find((s) => s.id === sid)?.name ?? sid;

  if (id === "cotisations") {
    const now = data.nowIso ?? new Date().toISOString();
    const payments = data.payments ?? [];
    const rows = activeMembers(inScope(data.members ?? [], session))
      .filter((m) => !params.scoopId || m.scoopId === params.scoopId)
      .map((m) => {
        const rule = (data.contributionRules ?? []).find((r) => r.scoopId === m.scoopId);
        const d = memberDues(m, rule, payments, now);
        return [
          scoopName(m.scoopId),
          `${m.firstName} ${m.lastName}`,
          d.state,
          d.expected,
          d.paid,
          d.balance,
        ];
      });
    return {
      name: def.name,
      scopeLabel: label,
      header: ["SCOOP", "Membre", "État", "Attendu (FCFA)", "Payé (FCFA)", "Solde (FCFA)"],
      rows,
    };
  }

  if (id === "stocks") {
    const lots = inScope(data.stockLots ?? [], session).filter(
      (l) => !params.scoopId || l.scoopId === params.scoopId,
    );
    const items = data.inputItems ?? [];
    const moves = data.stockMovements ?? [];
    const rows = [...new Set(lots.map((l) => `${l.scoopId}|${l.itemId}`))].map((k) => {
      const [scoopId, itemId] = k.split("|") as [string, string];
      const item = items.find((i) => i.id === itemId);
      const mine = lots.filter((l) => l.scoopId === scoopId && l.itemId === itemId);
      const balance = itemBalance(itemId, scoopId, lots, moves);
      const value = mine.reduce((n, l) => {
        const out = moves
          .filter((m) => m.lotId === l.id && m.voided === null)
          .reduce((x, m) => x + m.quantity, 0);
        return n + Math.round((l.quantity - out) * l.unitPrice);
      }, 0);
      return [
        scoopName(scoopId),
        item?.name ?? itemId,
        balance,
        item?.unit ?? "",
        item && item.alertBelow > 0 && balance < item.alertBelow ? "stock bas" : "",
        value,
      ];
    });
    return {
      name: def.name,
      scopeLabel: label,
      header: ["SCOOP", "Intrant", "Solde", "Unité", "Alerte", "Valeur (FCFA)"],
      rows,
    };
  }

  if (id === "credits") {
    const now = data.nowIso ?? new Date().toISOString();
    const reps = data.repayments ?? [];
    const rows = inScope(data.credits ?? [], session)
      .filter((c) => !params.scoopId || c.scoopId === params.scoopId)
      .map((c) => {
        const m = (data.members ?? []).find((x) => x.id === c.memberId);
        return [
          scoopName(c.scoopId),
          m ? `${m.firstName} ${m.lastName}` : c.memberId,
          c.amount,
          totalDue(c),
          paidTotal(c.id, reps),
          creditBalance(c, reps),
          overdueAmount(c, reps, now),
          creditState(c, reps, now),
        ];
      });
    return {
      name: def.name,
      scopeLabel: label,
      header: [
        "SCOOP",
        "Membre",
        "Capital (FCFA)",
        "Total dû (FCFA)",
        "Remboursé (FCFA)",
        "Reste (FCFA)",
        "Échu (FCFA)",
        "État",
      ],
      rows,
    };
  }

  if (id === "ventes") {
    const sales = inScope(data.sales ?? [], session)
      .filter((s) => s.voided === null && (!params.scoopId || s.scoopId === params.scoopId))
      .filter((s) => !params.campaign || s.campaign === params.campaign);
    const by = new Map<
      string,
      { crop: string; campaign: string; n: number; kg: number; total: number; paid: number }
    >();
    for (const s of sales) {
      const k = `${s.crop}|${s.campaign}`;
      const e = by.get(k) ?? { crop: s.crop, campaign: s.campaign, n: 0, kg: 0, total: 0, paid: 0 };
      e.n += 1;
      e.kg += s.quantityKg;
      e.total += saleTotal(s);
      e.paid += Math.min(s.paidAmount, saleTotal(s));
      by.set(k, e);
    }
    const rows = [...by.values()]
      .sort((a, b) => b.total - a.total)
      .map((e) => [e.crop, e.campaign, e.n, e.kg, e.total, e.paid, e.total - e.paid]);
    return {
      name: def.name,
      scopeLabel: label,
      header: [
        "Culture",
        "Campagne",
        "Ventes",
        "Quantité (kg)",
        "Chiffre d'affaires (FCFA)",
        "Encaissé (FCFA)",
        "Reste (FCFA)",
      ],
      rows,
    };
  }

  if (id === "exploitation") {
    // Agrégat par culture, sans nom de producteur : la vue qu'on partage d'abord.
    const rows = accountRows(
      {
        sales: inScope(data.sales ?? [], session).filter(
          (s) => !params.scoopId || s.scoopId === params.scoopId,
        ),
        expenses: inScope(data.expenses ?? [], session).filter(
          (e) => !params.scoopId || e.scoopId === params.scoopId,
        ),
        plans: data.plans ?? [],
        plots: data.allPlots ?? data.plots,
      },
      { campaign: params.campaign },
    );
    return {
      name: def.name,
      scopeLabel: label,
      header: [
        "Culture",
        "Exploitations",
        "En difficulté",
        "Produits (FCFA)",
        "Charges (FCFA)",
        "Marge (FCFA)",
        "Marge par hectare (FCFA)",
      ],
      rows: byCrop(rows).map((c) => [
        c.crop,
        c.count,
        c.distressCount,
        c.revenue,
        c.charges,
        c.margin,
        c.marginPerHa ?? "",
      ]),
    };
  }

  if (id === "charges") {
    const expenses = inScope(data.expenses ?? [], session).filter(
      (e) =>
        (!params.scoopId || e.scoopId === params.scoopId) &&
        (!params.campaign || e.campaign === params.campaign),
    );
    const total = expenses.filter((e) => !e.voided).reduce((n, e) => n + e.amount, 0);
    return {
      name: def.name,
      scopeLabel: label,
      header: ["Catégorie", "Montant (FCFA)", "Part (%)"],
      rows: chargesByCategory(expenses).map((c) => [
        c.category,
        c.amount,
        total ? Math.round((c.amount / total) * 100) : 0,
      ]),
    };
  }

  if (id === "reunions") {
    const members = inScope(data.members ?? [], session);
    const rows = inScope(data.meetings ?? [], session)
      .filter((m) => !params.scoopId || m.scoopId === params.scoopId)
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((m) => [
        scoopName(m.scoopId),
        m.title,
        m.kind,
        m.date.slice(0, 10),
        m.status,
        m.status === "tenue" ? m.presentIds.length : "",
        m.status === "tenue"
          ? members.filter((x) => x.scoopId === m.scoopId && x.status === "membre").length
          : "",
        m.minutes ? m.minutes.status : "",
      ]);
    return {
      name: def.name,
      scopeLabel: label,
      header: ["SCOOP", "Réunion", "Type", "Date", "État", "Présents", "Membres", "Procès-verbal"],
      rows,
    };
  }

  const rows = plots
    .filter((p) => p.status === "à reprendre")
    .map((p) => {
      const owner = producerOf.get(p.producerId);
      return [
        p.code,
        owner?.code ?? "",
        owner ? scoopName(owner.scoopId) : "",
        p.crop,
        p.campaign,
        p.reason ?? "",
      ];
    });
  return {
    name: def.name,
    scopeLabel: label,
    header: ["Parcelle", "Producteur", "SCOOP", "Culture", "Campagne", "Motif de reprise"],
    rows,
  };
}
