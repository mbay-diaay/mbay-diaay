/**
 * Calendriers culturaux et suivi des opérations (plan 4.8, M4-2 et M4-3). Fonctions pures.
 * Une ligne de plan (culture + mois de semis) et le calendrier validé de sa culture donnent des opérations prévues
 * datées ; les opérations réellement faites s'y rattachent, ce qui donne l'état (à faire, fait, en retard) et l'écart.
 */
import type { ExploitationPlan, PlanLine } from "./mock/cooperative";
import type { CalendarStep, CropCalendar, FieldOperation, OperationKind } from "./mock/agronomy";

const DAY_MS = 86_400_000;

export const addDays = (isoDay: string, n: number): string =>
  new Date(Date.parse(`${isoDay}T00:00:00.000Z`) + n * DAY_MS).toISOString().slice(0, 10);

export const daysBetween = (fromDay: string, toDay: string): number =>
  Math.round(
    (Date.parse(`${toDay}T00:00:00.000Z`) - Date.parse(`${fromDay}T00:00:00.000Z`)) / DAY_MS,
  );

/** Le mois de semis d'une ligne devient le 15 de ce mois : on ne connaît pas le jour exact. */
export const sowingDay = (line: Pick<PlanLine, "sowingMonth">): string | null =>
  line.sowingMonth && /^\d{4}-\d{2}$/.test(line.sowingMonth) ? `${line.sowingMonth}-15` : null;

/** Le calendrier qui fait foi pour une culture : sa version validée. */
export const validatedCalendar = (calendars: CropCalendar[], crop: string) =>
  calendars.find((c) => c.crop === crop && c.status === "validé");

export const canEditCalendar = (c: Pick<CropCalendar, "status">) => c.status === "brouillon";

export type CalendarIssueKey =
  | "errors.calendar.semis"
  | "errors.calendar.harvest"
  | "errors.calendar.offset"
  | "errors.calendar.duration"
  | "errors.calendar.duplicate";

/** Contrôles d'un calendrier avant validation : un seul semis à 0, une récolte après, valeurs plausibles, pas de doublon. */
export function calendarIssues(steps: CalendarStep[]): CalendarIssueKey[] {
  const issues = new Set<CalendarIssueKey>();
  const sowings = steps.filter((s) => s.kind === "semis");
  if (sowings.length !== 1 || sowings[0]!.offsetDays !== 0) issues.add("errors.calendar.semis");
  if (!steps.some((s) => s.kind === "récolte" && s.offsetDays > 0))
    issues.add("errors.calendar.harvest");
  if (
    steps.some((s) => !Number.isInteger(s.offsetDays) || s.offsetDays < -90 || s.offsetDays > 400)
  )
    issues.add("errors.calendar.offset");
  if (
    steps.some(
      (s) => !Number.isInteger(s.durationDays) || s.durationDays < 1 || s.durationDays > 120,
    )
  )
    issues.add("errors.calendar.duration");
  const keys = steps.map((s) => `${s.kind}|${s.offsetDays}`);
  if (new Set(keys).size !== keys.length) issues.add("errors.calendar.duplicate");
  return [...issues];
}

export type OperationState = "fait" | "à faire" | "en retard";

export interface ScheduleRow {
  /** Étape du calendrier ; `null` pour une opération hors calendrier. */
  stepId: string | null;
  kind: OperationKind;
  /** Fenêtre prévue ; `null` hors calendrier. */
  dueFrom: string | null;
  dueTo: string | null;
  state: OperationState;
  /** Opération réelle quand elle est faite. */
  done: FieldOperation | null;
  /** Écart en jours entre le réel et le début de la fenêtre prévue (positif = en retard) ; `null` sans les deux. */
  gapDays: number | null;
}

/** Planning d'une ligne de plan : étapes du calendrier (avec leur état) puis opérations faites hors calendrier. */
export function lineSchedule(
  plan: Pick<ExploitationPlan, "id">,
  lineIndex: number,
  line: PlanLine,
  calendars: CropCalendar[],
  operations: FieldOperation[],
  todayIso: string,
): ScheduleRow[] {
  const mine = operations.filter((o) => o.planId === plan.id && o.lineIndex === lineIndex);
  const day = sowingDay(line);
  const cal = validatedCalendar(calendars, line.crop);
  const rows: ScheduleRow[] = [];
  const used = new Set<string>();
  if (cal && day) {
    for (const st of [...cal.steps].sort((a, b) => a.offsetDays - b.offsetDays)) {
      const dueFrom = addDays(day, st.offsetDays);
      const dueTo = addDays(dueFrom, st.durationDays - 1);
      const done = mine.find((o) => o.stepId === st.id) ?? null;
      if (done) used.add(done.id);
      rows.push({
        stepId: st.id,
        kind: st.kind,
        dueFrom,
        dueTo,
        state: done ? "fait" : dueTo < todayIso.slice(0, 10) ? "en retard" : "à faire",
        done,
        gapDays: done ? daysBetween(dueFrom, done.doneAt) : null,
      });
    }
  }
  for (const o of mine.filter((x) => !used.has(x.id)))
    rows.push({
      stepId: o.stepId,
      kind: o.kind,
      dueFrom: null,
      dueTo: null,
      state: "fait",
      done: o,
      gapDays: null,
    });
  return rows.sort((a, b) =>
    (a.dueFrom ?? a.done?.doneAt ?? "").localeCompare(b.dueFrom ?? b.done?.doneAt ?? ""),
  );
}

export interface PlanProgress {
  total: number;
  done: number;
  late: number;
  /** Opérations restant à faire (hors retard). */
  todo: number;
}

export function planProgress(
  plan: ExploitationPlan,
  calendars: CropCalendar[],
  operations: FieldOperation[],
  todayIso: string,
): PlanProgress {
  const rows = plan.lines.flatMap((line, i) =>
    lineSchedule(plan, i, line, calendars, operations, todayIso).filter((r) => r.stepId !== null),
  );
  return {
    total: rows.length,
    done: rows.filter((r) => r.state === "fait").length,
    late: rows.filter((r) => r.state === "en retard").length,
    todo: rows.filter((r) => r.state === "à faire").length,
  };
}
