import type { Permission } from "./permissions";
import type { AuditEntry, Session } from "./store";
import type { GeneratedReport } from "./reports";
import type { DataAlert, DuplicateCase, Plot, Producer, Scoop } from "./mock/data";
import type { FieldOperation } from "./mock/agronomy";
import type { Credit, Repayment, Sale, StockLot, StockMovement } from "./mock/commerce";
import type { Expense } from "./mock/exploitation";
import type {
  ContributionPayment,
  ContributionRule,
  DocumentMeta,
  ExploitationPlan,
  Meeting,
  Member,
  ProducerDossier,
} from "./mock/cooperative";

/**
 * Périmètre SCOOP : source unique de ce qu'un utilisateur a le droit de voir.
 * Toute liste ou fiche (producteur, parcelle, alerte, doublon, rapport) passe par ici.
 * Le serveur applique la même règle ; ceci évite d'exposer des données dans l'interface (PRD BE-04).
 */

export const isConsolidated = (s: Session | null) => !s || s.scope.kind === "consolidé";

/** SCOOP visibles de la session (vide en vue consolidée : à lire avec `isConsolidated`). */
export function scoopIdsOf(s: Session | null): Set<string> {
  const { scoopId, scoopIds } = s?.scope ?? {};
  return new Set(scoopIds ?? (scoopId !== undefined ? [scoopId] : []));
}

/** Noms des SCOOP visibles, séparés par une virgule (vide en vue consolidée). */
export function scoopNamesOf(s: Session | null, scoops: Scoop[]): string {
  const ids = scoopIdsOf(s);
  return scoops
    .filter((c) => ids.has(c.id))
    .map((c) => c.name)
    .join(", ");
}

/** Garde les éléments rattachés à la SCOOP de la session (tout, en vue consolidée). */
export function inScope<T extends { scoopId: string }>(items: T[], s: Session | null): T[] {
  if (isConsolidated(s)) return items;
  const allowed = scoopIdsOf(s);
  return items.filter((i) => allowed.has(i.scoopId));
}

export const canSeeProducer = (s: Session | null, p: Pick<Producer, "scoopId"> | undefined) =>
  !!p && inScope([p], s).length === 1;

const byId = <T extends { id: string }>(items: T[]) => new Map(items.map((i) => [i.id, i]));

/** Identifiants des producteurs visibles : base des filtres de parcelles, alertes, corrections et doublons. */
export function scopedProducerIds(producers: Producer[], s: Session | null): Set<string> {
  return new Set(inScope(producers, s).map((p) => p.id));
}

export function scopedPlots(plots: Plot[], producers: Producer[], s: Session | null): Plot[] {
  if (isConsolidated(s)) return plots;
  const ids = scopedProducerIds(producers, s);
  return plots.filter((p) => ids.has(p.producerId));
}

export function canSeePlot(
  s: Session | null,
  plot: Plot | undefined,
  producers: Producer[],
): boolean {
  return !!plot && canSeeProducer(s, byId(producers).get(plot.producerId));
}

/** Une alerte appartient au producteur visé, ou au propriétaire de la parcelle visée. */
export function scopedAlerts(
  alerts: DataAlert[],
  producers: Producer[],
  plots: Plot[],
  s: Session | null,
): DataAlert[] {
  if (isConsolidated(s)) return alerts;
  const ids = scopedProducerIds(producers, s);
  const plotOwner = new Map(plots.map((p) => [p.id, p.producerId]));
  return alerts.filter((a) =>
    ids.has(a.entity === "producteur" ? a.entityId : (plotOwner.get(a.entityId) ?? "")),
  );
}

/** Un cas de doublon est visible si sa fiche principale l'est. */
export function scopedCases(
  cases: DuplicateCase[],
  producers: Producer[],
  s: Session | null,
): DuplicateCase[] {
  if (isConsolidated(s)) return cases;
  const ids = scopedProducerIds(producers, s);
  return cases.filter((c) => ids.has(c.aId));
}

// ============ Coopérative : membres, dossiers, pièces, plans ============

/**
 * Lecture protégée : le droit du rôle d'abord, puis le périmètre SCOOP, jamais l'un sans l'autre.
 * Sans le droit (ou sans session), la liste est vide. Une liste de droits veut dire « l'un d'eux suffit ».
 */
function readable<T extends { scoopId: string }>(
  items: T[],
  s: Session | null,
  permission: Permission | readonly Permission[],
): T[] {
  const needed = Array.isArray(permission) ? permission : [permission as Permission];
  return s && needed.some((p) => s.permissions.includes(p)) ? inScope(items, s) : [];
}

export const scopedMembers = (members: Member[], s: Session | null): Member[] =>
  readable(members, s, "member.read");

export const scopedPlans = (plans: ExploitationPlan[], s: Session | null): ExploitationPlan[] =>
  readable(plans, s, "plan.read");

/** Le technicien ne voit que les dossiers qu'il a créés ; les rôles de la coopérative voient ceux de leur SCOOP. */
export function scopedDossiers(dossiers: ProducerDossier[], s: Session | null): ProducerDossier[] {
  const mine = readable(dossiers, s, ["dossier.create", "dossier.review"]);
  return s?.role === "technicien" ? mine.filter((d) => d.createdByEmail === s.email) : mine;
}

/** Une pièce sensible (CNI) n'est jamais lisible sans le droit `cni.read`, quel que soit le droit sur les pièces. */
export function canReadDocument(s: Session | null, doc: DocumentMeta): boolean {
  if (!s?.permissions.includes("document.read")) return false;
  return !doc.sensitive || s.permissions.includes("cni.read");
}

/**
 * Téléchargement d'une pièce. Document de la coopérative (statuts, règlement, procès-verbal) : il suit
 * `library.read`, la secrétaire peut donc télécharger les pièces non sensibles de sa bibliothèque.
 * Pièce d'un dossier, d'un producteur ou d'un membre : `document.download`.
 * Une pièce sensible exige toujours `cni.read` en plus.
 */
export function canDownloadDocument(s: Session | null, doc: DocumentMeta): boolean {
  const needed = doc.ownerType === "scoop" ? "library.read" : "document.download";
  if (!s?.permissions.includes(needed)) return false;
  return !doc.sensitive || s.permissions.includes("cni.read");
}

/** Pièces visibles : dans le périmètre, lisibles selon leur sensibilité, et pour un technicien celles de ses dossiers. */
export function scopedDocuments(
  documents: DocumentMeta[],
  dossiers: ProducerDossier[],
  s: Session | null,
): DocumentMeta[] {
  const readable = inScope(documents, s).filter((d) => canReadDocument(s, d));
  if (s?.role !== "technicien") return readable;
  const own = new Set(scopedDossiers(dossiers, s).map((d) => d.id));
  return readable.filter((d) => d.ownerType === "dossier" && own.has(d.ownerId));
}

/**
 * Journal d'audit : l'administrateur (`audit.read`) lit tout ; un rôle de coopérative (`audit.read.scoop`) ne lit que
 * les entrées de sa SCOOP. Une entrée qui vise toute la plateforme (sans SCOOP) lui reste fermée.
 */
export function scopedAudit(entries: AuditEntry[], s: Session | null): AuditEntry[] {
  if (s?.permissions.includes("audit.read")) return entries;
  if (!s?.permissions.includes("audit.read.scoop")) return [];
  const mine = scoopIdsOf(s);
  return entries.filter((e) => e.scoopId !== undefined && mine.has(e.scoopId));
}

/**
 * Historique des rapports : le consolidé lit tout ; un rôle de coopérative ne lit que les rapports entièrement
 * limités à ses SCOOP (un rapport consolidé de toutes les coopératives lui reste fermé).
 */
export function scopedReports(reports: GeneratedReport[], s: Session | null): GeneratedReport[] {
  if (isConsolidated(s)) return reports;
  const mine = scoopIdsOf(s);
  return reports.filter((r) => r.scoopIds.length > 0 && r.scoopIds.every((id) => mine.has(id)));
}

// ============ Cotisations, réunions, bibliothèque (plan 4.6) ============

export const scopedPayments = (payments: ContributionPayment[], s: Session | null) =>
  readable(payments, s, "contribution.read");

export const scopedRules = (rules: ContributionRule[], s: Session | null) =>
  readable(rules, s, "contribution.read");

export const scopedMeetings = (meetings: Meeting[], s: Session | null) =>
  readable(meetings, s, "meeting.read");

/** Documents propres à la coopérative : droit `library.read`, périmètre ; une pièce sensible demande en plus `cni.read`. */
export const scopedLibrary = (documents: DocumentMeta[], s: Session | null): DocumentMeta[] =>
  s?.permissions.includes("library.read")
    ? inScope(
        documents.filter((d) => d.ownerType === "scoop"),
        s,
      ).filter((d) => canReadDocument(s, d))
    : [];

/** Opérations de culture dans le périmètre (leur coopérative est celle du plan). */
export const scopedOperations = (operations: FieldOperation[], s: Session | null) =>
  readable(operations, s, "operation.read");

// ============ M2 Commercial : stocks, crédits, ventes ============

/**
 * Données commerciales : un droit de lecture ET le périmètre SCOOP, jamais l'un sans l'autre.
 * Sans le droit (par exemple le rôle « ventes » devant les crédits), la liste est vide.
 */
const withPermission = <T extends { scoopId: string }>(
  items: T[],
  s: Session | null,
  permission: "stock.read" | "credit.read" | "sales.read",
): T[] => (s?.permissions.includes(permission) ? inScope(items, s) : []);

export const scopedLots = (lots: StockLot[], s: Session | null) =>
  withPermission(lots, s, "stock.read");
export const scopedMovements = (movements: StockMovement[], s: Session | null) =>
  withPermission(movements, s, "stock.read");
export const scopedCredits = (credits: Credit[], s: Session | null) =>
  withPermission(credits, s, "credit.read");
export const scopedRepayments = (repayments: Repayment[], s: Session | null) =>
  withPermission(repayments, s, "credit.read");
export const scopedSales = (sales: Sale[], s: Session | null) =>
  withPermission(sales, s, "sales.read");

// ============ M3 Exploitation ============

/** Charges lisibles : droit `expense.read` puis périmètre ; sans l'un des deux, rien. */
export const scopedExpenses = (expenses: Expense[], s: Session | null): Expense[] =>
  s?.permissions.includes("expense.read") ? inScope(expenses, s) : [];

/** Ventes servant au compte d'exploitation : droit `exploitation.read` puis périmètre. */
export const exploitationSales = (sales: Sale[], s: Session | null): Sale[] =>
  s?.permissions.includes("exploitation.read") ? inScope(sales, s) : [];

/** Charges servant au compte d'exploitation : droit `exploitation.read` puis périmètre. */
export const exploitationExpenses = (expenses: Expense[], s: Session | null): Expense[] =>
  s?.permissions.includes("exploitation.read") ? inScope(expenses, s) : [];
