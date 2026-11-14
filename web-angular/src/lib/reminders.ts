/**
 * Notifications et rappels (matrice M1) : réglages par coopérative, avec une valeur par défaut fixée par
 * l'administration. Fonctions pures. L'envoi réel (SMS, courriel, application) relève du serveur.
 */
import { dueReminders, REMINDER_DAYS } from "./dossiers";
import type { ContributionRule, Meeting, ProducerDossier } from "./mock/cooperative";

export type ReminderChannel = "app" | "sms" | "email";
export const REMINDER_CHANNELS: readonly ReminderChannel[] = ["app", "sms", "email"];

export interface ReminderSettings {
  enabled: boolean;
  /** Relance d'un dossier d'adhésion resté sans réponse (jours). Jamais une approbation automatique. */
  dossierPendingDays: number;
  /** Rappel de convocation avant une réunion (jours). */
  meetingNoticeDays: number;
  /** Rappel avant l'échéance de la cotisation (jours). */
  contributionDueDays: number;
  /** Rappel avant l'échéance d'une décision de réunion (jours). */
  decisionDueDays: number;
  channels: ReminderChannel[];
}

/** Clé des réglages par défaut (s'appliquent aux coopératives sans réglage propre). */
export const DEFAULT_REMINDER_KEY = "*";

export const DEFAULT_REMINDER_SETTINGS: ReminderSettings = {
  enabled: true,
  dossierPendingDays: REMINDER_DAYS,
  meetingNoticeDays: 7,
  contributionDueDays: 15,
  decisionDueDays: 3,
  channels: ["app", "sms"],
};

/** Bornes d'un délai de rappel, en jours. */
export const REMINDER_MIN_DAYS = 1;
export const REMINDER_MAX_DAYS = 90;

export type ReminderDelayField =
  | "dossierPendingDays"
  | "meetingNoticeDays"
  | "contributionDueDays"
  | "decisionDueDays";

export const REMINDER_DELAY_FIELDS: readonly ReminderDelayField[] = [
  "dossierPendingDays",
  "meetingNoticeDays",
  "contributionDueDays",
  "decisionDueDays",
];

/** Réglages d'une coopérative : les siens, sinon ceux par défaut, sinon ceux d'origine. */
export function reminderSettingsOf(
  settingsByScoop: Record<string, ReminderSettings>,
  scoopId: string | null,
): ReminderSettings {
  return (
    (scoopId ? settingsByScoop[scoopId] : undefined) ??
    settingsByScoop[DEFAULT_REMINDER_KEY] ??
    DEFAULT_REMINDER_SETTINGS
  );
}

/** Champs invalides (délai hors bornes, aucun canal alors que les rappels sont actifs). */
export function reminderIssues(settings: ReminderSettings): (ReminderDelayField | "channels")[] {
  const issues: (ReminderDelayField | "channels")[] = REMINDER_DELAY_FIELDS.filter((field) => {
    const days = settings[field];
    return !Number.isInteger(days) || days < REMINDER_MIN_DAYS || days > REMINDER_MAX_DAYS;
  });
  if (settings.enabled && !settings.channels.length) issues.push("channels");
  return issues;
}

export type ReminderKind = "dossier" | "meeting" | "contribution" | "decision";

/** Rappel qui partirait avec les réglages en vigueur (aperçu, rien n'est envoyé). */
export interface ReminderPreview {
  kind: ReminderKind;
  /** Réunion, dossier ou coopérative concernés (lien de l'aperçu). */
  refId: string;
  title: string;
  /** Date de l'événement (ISO). */
  date: string;
}

const DAY_MS = 86_400_000;

/** Prochaine échéance d'une règle de cotisation : fin du mois (mensuelle) ou date MM-JJ (annuelle). */
export function nextContributionDue(
  rule: Pick<ContributionRule, "periodicity" | "dueDate">,
  nowIso: string,
): string {
  const now = new Date(nowIso);
  if (rule.periodicity === "mensuelle")
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0)).toISOString().slice(0, 10);
  const today = nowIso.slice(0, 10);
  const thisYear = `${now.getUTCFullYear()}-${rule.dueDate}`;
  return thisYear >= today ? thisYear : `${now.getUTCFullYear() + 1}-${rule.dueDate}`;
}

/** Rappels que la coopérative recevrait maintenant : utile pour vérifier un réglage avant de l'enregistrer. */
export function previewReminders(input: {
  scoopId: string;
  settings: ReminderSettings;
  nowIso: string;
  meetings: readonly Meeting[];
  dossiers: readonly ProducerDossier[];
  rules: readonly ContributionRule[];
}): ReminderPreview[] {
  const { scoopId, settings, nowIso } = input;
  if (!settings.enabled) return [];
  const now = new Date(nowIso).getTime();
  const within = (iso: string, days: number) => new Date(iso).getTime() <= now + days * DAY_MS;
  const meetings = input.meetings.filter((meeting) => meeting.scoopId === scoopId);
  const previews: ReminderPreview[] = [];

  for (const meeting of meetings)
    if (
      meeting.status === "planifiée" &&
      new Date(meeting.date).getTime() >= now &&
      within(meeting.date, settings.meetingNoticeDays)
    )
      previews.push({ kind: "meeting", refId: meeting.id, title: meeting.title, date: meeting.date });

  for (const meeting of meetings)
    for (const decision of meeting.decisions)
      if (decision.status !== "clôturée" && decision.dueDate && within(decision.dueDate, settings.decisionDueDays))
        previews.push({ kind: "decision", refId: meeting.id, title: decision.text, date: decision.dueDate });

  const pending = dueReminders(
    input.dossiers.filter((dossier) => dossier.scoopId === scoopId),
    nowIso,
    settings.dossierPendingDays,
  );
  for (const dossier of pending)
    previews.push({
      kind: "dossier",
      refId: dossier.id,
      title: `${dossier.draft.firstName} ${dossier.draft.lastName}`.trim() || dossier.id,
      date: dossier.submittedAt ?? nowIso,
    });

  const rule = input.rules.find((candidate) => candidate.scoopId === scoopId && candidate.confirmed);
  if (rule) {
    const due = nextContributionDue(rule, nowIso);
    if (within(due, settings.contributionDueDays))
      previews.push({ kind: "contribution", refId: scoopId, title: `${rule.amount}`, date: due });
  }
  return previews.sort((first, second) => first.date.localeCompare(second.date));
}
