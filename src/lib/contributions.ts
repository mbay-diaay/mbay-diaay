/**
 * Cotisations (plan 4.6, M1-3). Fonctions pures : le store les applique, l'interface les lit, les tests les rejouent.
 * Seuls les membres en règle (statut « membre ») doivent cotiser. Une période est exigible une fois son échéance
 * passée ; une cotisation partielle laisse un solde. Un paiement annulé ne compte plus.
 */
import { makeReceipt } from "./receipts";
import type {
  ContributionPayment,
  ContributionRule,
  Member,
  Periodicity,
} from "./mock/cooperative";

export type DueState = "à jour" | "en retard" | "jamais payé" | "non exigible";

export interface DueLine {
  period: string;
  dueAt: string;
  expected: number;
  paid: number;
}

export interface MemberDues {
  state: DueState;
  expected: number;
  paid: number;
  /** Reste à payer sur les périodes exigibles (jamais négatif). */
  balance: number;
  lines: DueLine[];
}

const pad = (n: number) => String(n).padStart(2, "0");
const lastDay = (year: number, month: number) => new Date(Date.UTC(year, month, 0)).getUTCDate();

/** Échéance d'une période : la date de la règle (annuelle) ou la fin du mois (mensuelle). */
export function dueAtOf(rule: Pick<ContributionRule, "periodicity" | "dueDate">, period: string) {
  if (rule.periodicity === "annuelle") return `${period}-${rule.dueDate}T23:59:59.000Z`;
  const [y, m] = period.split("-").map(Number) as [number, number];
  return `${y}-${pad(m)}-${pad(lastDay(y, m))}T23:59:59.000Z`;
}

export const periodPattern = (p: Periodicity) =>
  p === "annuelle" ? /^\d{4}$/ : /^\d{4}-(0[1-9]|1[0-2])$/;

/**
 * Périodes exigibles d'un membre à une date : depuis son adhésion (ou le début de la règle) jusqu'à la dernière
 * échéance passée. Une personne qui adhère après l'échéance d'une période ne la doit pas.
 */
export function dueLines(
  member: Pick<Member, "status" | "joinedAt">,
  rule: ContributionRule,
  nowIso: string,
): { period: string; dueAt: string }[] {
  if (member.status !== "membre" || !member.joinedAt) return [];
  const now = new Date(nowIso).getTime();
  const joined = new Date(member.joinedAt);
  const out: { period: string; dueAt: string }[] = [];
  if (rule.periodicity === "annuelle") {
    for (
      let y = Math.max(rule.startYear, joined.getUTCFullYear());
      y <= new Date(nowIso).getUTCFullYear();
      y++
    ) {
      const dueAt = dueAtOf(rule, String(y));
      if (joined.getTime() > new Date(dueAt).getTime()) continue;
      if (new Date(dueAt).getTime() <= now) out.push({ period: String(y), dueAt });
    }
    return out;
  }
  const start = Math.max(rule.startYear * 12, joined.getUTCFullYear() * 12 + joined.getUTCMonth());
  const end = new Date(nowIso).getUTCFullYear() * 12 + new Date(nowIso).getUTCMonth();
  for (let k = start; k <= end; k++) {
    const period = `${Math.floor(k / 12)}-${pad((k % 12) + 1)}`;
    const dueAt = dueAtOf(rule, period);
    if (new Date(dueAt).getTime() <= now) out.push({ period, dueAt });
  }
  return out;
}

const live = (p: ContributionPayment) => p.voided === null;

export function memberDues(
  member: Pick<Member, "id" | "status" | "joinedAt">,
  rule: ContributionRule | undefined,
  payments: ContributionPayment[],
  nowIso: string,
): MemberDues {
  if (!rule) return { state: "non exigible", expected: 0, paid: 0, balance: 0, lines: [] };
  const mine = payments.filter((p) => p.memberId === member.id && live(p));
  const lines: DueLine[] = dueLines(member, rule, nowIso).map((d) => ({
    ...d,
    expected: rule.amount,
    paid: mine.filter((p) => p.period === d.period).reduce((n, p) => n + p.amount, 0),
  }));
  const expected = lines.reduce((n, l) => n + l.expected, 0);
  const paid = lines.reduce((n, l) => n + Math.min(l.paid, l.expected), 0);
  const balance = Math.max(0, expected - paid);
  const state: DueState =
    lines.length === 0
      ? "non exigible"
      : balance === 0
        ? "à jour"
        : mine.length === 0
          ? "jamais payé"
          : "en retard";
  return { state, expected, paid, balance, lines };
}

export interface ScoopTotals {
  expected: number;
  collected: number;
  /** 0 à 100 ; 0 quand rien n'est exigible. */
  rate: number;
  late: number;
  upToDate: number;
}

export function scoopTotals(
  members: Member[],
  rule: ContributionRule | undefined,
  payments: ContributionPayment[],
  nowIso: string,
): ScoopTotals {
  const rows = members.map((m) => memberDues(m, rule, payments, nowIso));
  const expected = rows.reduce((n, r) => n + r.expected, 0);
  const collected = rows.reduce((n, r) => n + r.paid, 0);
  return {
    expected,
    collected,
    rate: expected ? Math.round((collected / expected) * 100) : 0,
    late: rows.filter((r) => r.state === "en retard" || r.state === "jamais payé").length,
    upToDate: rows.filter((r) => r.state === "à jour").length,
  };
}

export interface PaymentIssue {
  field: "amount" | "period" | "member";
  /** Clé de message `errors.*`. */
  key: "errors.contribution.amount" | "errors.contribution.period" | "errors.contribution.member";
}

/** Contrôles d'un paiement avant enregistrement. */
export function paymentIssues(
  input: { amount: number; period: string; memberId: string },
  rule: ContributionRule | undefined,
  memberIds: string[],
): PaymentIssue[] {
  const issues: PaymentIssue[] = [];
  if (!memberIds.includes(input.memberId))
    issues.push({ field: "member", key: "errors.contribution.member" });
  if (!Number.isInteger(input.amount) || input.amount <= 0)
    issues.push({ field: "amount", key: "errors.contribution.amount" });
  if (!rule || !periodPattern(rule.periodicity).test(input.period))
    issues.push({ field: "period", key: "errors.contribution.period" });
  return issues;
}

export const nextReceipt = (payments: ContributionPayment[], year: number) =>
  makeReceipt(
    "R",
    payments.map((p) => p.receipt),
    year,
  );

/** Jour et mois valides ensemble (« 02-31 » n'existe pas) : on teste sur une année bissextile. */
export function isValidMonthDay(md: string): boolean {
  const m = /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.exec(md);
  if (!m) return false;
  const month = Number(m[1]);
  const day = Number(m[2]);
  return new Date(Date.UTC(2024, month - 1, day)).getUTCDate() === day;
}

/** Date de paiement : un jour réel, jamais dans le futur, pas avant 2000. */
export function isPaymentDate(day: string, todayIso: string): boolean {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(day) &&
    !Number.isNaN(Date.parse(day)) &&
    day >= "2000-01-01" &&
    day <= todayIso.slice(0, 10)
  );
}
