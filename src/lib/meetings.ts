/**
 * Réunions, assemblées et procès-verbaux (plan 4.6, M1-4). Fonctions pures.
 * Cycle d'une réunion : planifiée, puis tenue (avec la liste des présents) ou annulée (avec un motif).
 * Le procès-verbal se rédige une fois la réunion tenue ; validé, il ne change plus.
 */
import type { Meeting, MeetingStatus } from "./mock/cooperative";

const TRANSITIONS: Record<MeetingStatus, readonly MeetingStatus[]> = {
  planifiée: ["tenue", "annulée"],
  tenue: [],
  annulée: [],
};
export const canMeetingTransition = (from: MeetingStatus, to: MeetingStatus) =>
  TRANSITIONS[from].includes(to);

/** Date, lieu et ordre du jour ne se modifient que tant que la réunion est planifiée. */
export const isMeetingEditable = (m: Pick<Meeting, "status">) => m.status === "planifiée";

/** Le procès-verbal se rédige pour une réunion tenue, jusqu'à sa validation. */
export const canEditMinutes = (m: Pick<Meeting, "status" | "minutes">) =>
  m.status === "tenue" && m.minutes?.status !== "validé";

export interface AttendanceStats {
  present: number;
  total: number;
  /** 0 à 100. */
  rate: number;
}

export const attendanceStats = (
  m: Pick<Meeting, "presentIds">,
  memberCount: number,
): AttendanceStats => ({
  present: m.presentIds.length,
  total: memberCount,
  rate: memberCount ? Math.round((m.presentIds.length / memberCount) * 100) : 0,
});

/** Réunions à venir d'abord (les plus proches), puis les passées (les plus récentes). */
export function sortMeetings(meetings: Meeting[], nowIso: string): Meeting[] {
  const now = new Date(nowIso).getTime();
  const key = (m: Meeting) => new Date(m.date).getTime();
  const upcoming = meetings.filter((m) => m.status === "planifiée" && key(m) >= now);
  const rest = meetings.filter((m) => !upcoming.includes(m));
  return [...upcoming.sort((a, b) => key(a) - key(b)), ...rest.sort((a, b) => key(b) - key(a))];
}

export const upcomingMeetings = (meetings: Meeting[], nowIso: string) =>
  sortMeetings(meetings, nowIso).filter(
    (m) => m.status === "planifiée" && new Date(m.date).getTime() >= new Date(nowIso).getTime(),
  );
