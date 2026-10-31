import {
  addDays,
  addMonths,
  addWeeks,
  endOfDay,
  endOfMonth,
  isSameDay,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";

/** Ton d'un événement : pris dans les jetons de couleur du projet (jamais une couleur écrite en dur). */
export type CalendarTone = "primary" | "info" | "success" | "warning" | "danger" | "neutral";

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  tone: CalendarTone;
  /** Clé de la catégorie : sert au filtre (par exemple le type de réunion). */
  category?: string;
  /** Ligne secondaire : lieu, statut. */
  subtitle?: string;
  /** Événement annulé ou sans suite : affiché atténué et barré. */
  muted?: boolean;
}

export type CalendarView = "month" | "week" | "day" | "list";

/** La semaine commence le lundi (usage au Sénégal). */
export const WEEK_START = 1 as const;
const OPTIONS = { weekStartsOn: WEEK_START } as const;

/** Les 6 semaines affichées pour un mois : 42 jours, du lundi précédant le 1er au dimanche qui suit. */
export function monthGrid(date: Date): Date[] {
  const first = startOfWeek(startOfMonth(date), OPTIONS);
  return Array.from({ length: 42 }, (_, i) => addDays(first, i));
}

export function weekDays(date: Date): Date[] {
  const first = startOfWeek(date, OPTIONS);
  return Array.from({ length: 7 }, (_, i) => addDays(first, i));
}

/** Un événement figure sur chaque jour qu'il couvre (une assemblée de deux jours apparaît deux fois). */
export function eventsOnDay(events: readonly CalendarEvent[], day: Date): CalendarEvent[] {
  const from = startOfDay(day).getTime();
  const to = endOfDay(day).getTime();
  return events
    .filter((e) => e.start.getTime() <= to && Math.max(e.end.getTime(), e.start.getTime()) >= from)
    .sort((a, b) => a.start.getTime() - b.start.getTime());
}

/** Événements regroupés par jour de début, jours triés : vue liste. */
export function groupByDay(
  events: readonly CalendarEvent[],
): { day: Date; events: CalendarEvent[] }[] {
  const sorted = [...events].sort((a, b) => a.start.getTime() - b.start.getTime());
  const groups: { day: Date; events: CalendarEvent[] }[] = [];
  for (const e of sorted) {
    const last = groups[groups.length - 1];
    if (last && isSameDay(last.day, e.start)) last.events.push(e);
    else groups.push({ day: startOfDay(e.start), events: [e] });
  }
  return groups;
}

/** Déplace la date affichée d'une période (mois, semaine ou jour) vers l'avant ou l'arrière. */
export function shiftDate(date: Date, view: CalendarView, direction: 1 | -1): Date {
  if (view === "month" || view === "list") return addMonths(date, direction);
  if (view === "week") return addWeeks(date, direction);
  return addDays(date, direction);
}

/** Bornes de la période affichée : sert à compter les événements du mois dans le titre. */
export function visibleRange(date: Date, view: CalendarView): { from: Date; to: Date } {
  if (view === "week") {
    const days = weekDays(date);
    return { from: startOfDay(days[0]!), to: endOfDay(days[6]!) };
  }
  if (view === "day") return { from: startOfDay(date), to: endOfDay(date) };
  return { from: startOfMonth(date), to: endOfMonth(date) };
}

export function eventsInRange(
  events: readonly CalendarEvent[],
  from: Date,
  to: Date,
): CalendarEvent[] {
  return events.filter(
    (e) => e.start.getTime() <= to.getTime() && e.end.getTime() >= from.getTime(),
  );
}
