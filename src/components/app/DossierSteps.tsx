import { AlertTriangle, ArrowRightCircle, Check, Info, Undo2, X } from "lucide-react";
import { DOSSIER_NEXT, DOSSIER_STATE } from "@/lib/dossier-labels";
import { useI18n, type MessageKey } from "@/lib/i18n";
import type { DossierStatus } from "@/lib/mock/cooperative";
import { cn } from "@/lib/utils";

const STEP_LABEL: readonly MessageKey[] = [
  "dossiers.steps.s1",
  "dossiers.steps.s2",
  "dossiers.steps.s3",
  "dossiers.steps.s4",
];

/** Étape en cours (0 à 3) pour chaque état : un complément demandé ramène à la préparation. */
const CURRENT: Record<DossierStatus, number> = {
  brouillon: 0,
  soumis: 1,
  "en examen": 2,
  "complément demandé": 0,
  approuvé: 3,
  refusé: 3,
};

type StepState = "done" | "current" | "todo" | "approved" | "refused" | "back";

function stepState(status: DossierStatus, i: number): StepState {
  const cur = CURRENT[status];
  if (status === "approuvé") return i === 3 ? "approved" : "done";
  if (status === "refusé") return i === 3 ? "refused" : "done";
  if (i < cur) return "done";
  if (i > cur) return "todo";
  return status === "complément demandé" ? "back" : "current";
}

const STATE_TEXT: Record<StepState, MessageKey> = {
  done: "dossiers.steps.done",
  current: "dossiers.steps.current",
  todo: "dossiers.steps.todo",
  approved: "dossiers.steps.approved",
  refused: "dossiers.steps.refused",
  back: "dossiers.steps.back",
};

const BAR: Record<StepState, string> = {
  done: "bg-success",
  approved: "bg-success",
  current: "bg-primary",
  back: "bg-ochre",
  refused: "bg-danger",
  todo: "bg-border",
};

const CIRCLE: Record<StepState, string> = {
  done: "border-success bg-success-bg text-success-fg",
  approved: "border-success bg-success text-white",
  current: "border-primary bg-primary text-primary-foreground ring-2 ring-primary/30",
  back: "border-ochre bg-ochre-soft text-ochre-text ring-2 ring-ochre/30",
  refused: "border-danger bg-danger-bg text-danger-fg ring-2 ring-danger/30",
  todo: "border-border-strong bg-card text-muted-foreground",
};

export interface DossierStepsProps {
  status: DossierStatus;
  /** Nom du technicien qui a préparé le dossier. */
  preparedBy: string;
  /** Motif écrit par la coopérative quand un complément est demandé. */
  complementReason?: string | undefined;
  /** Nombre de jours sans réponse, quand le rappel s'applique ; sinon `null`. */
  reminderDays: number | null;
  /** Message qui invite la personne connectée à agir maintenant (calculé par la page selon ses droits). */
  nudge: MessageKey | null;
  /** Précision pour la personne qui n'a rien à faire ou ne peut pas décider. */
  note: MessageKey | null;
}

/**
 * Bandeau des quatre étapes du dossier et bloc « Où en est ce dossier ? ». Aucune règle de rôle ici :
 * la page calcule `nudge` et `note` avec les droits de la personne connectée.
 */
export function DossierSteps({
  status,
  preparedBy,
  complementReason,
  reminderDays,
  nudge,
  note,
}: DossierStepsProps) {
  const { t } = useI18n();
  const closed = status === "approuvé" || status === "refusé";
  const who: MessageKey =
    status === "brouillon" || status === "complément demandé"
      ? "dossiers.steps.who.technicien"
      : closed
        ? "dossiers.steps.who.none"
        : "dossiers.steps.who.cooperative";

  return (
    <section className="surface mb-6 p-4 sm:p-5" aria-labelledby="where-title">
      <ol aria-label={t("dossiers.steps.aria")} className="grid grid-cols-4 gap-1.5 sm:gap-3">
        {STEP_LABEL.map((label, i) => {
          const s = stepState(status, i);
          return (
            <li
              key={label}
              aria-current={s === "current" || s === "back" ? "step" : undefined}
              className="flex flex-col items-center gap-1.5 text-center"
            >
              <span className={cn("h-1.5 w-full rounded-full", BAR[s])} aria-hidden />
              <span
                className={cn(
                  "mt-1 flex size-9 items-center justify-center rounded-full border-2 text-sm font-bold",
                  CIRCLE[s],
                )}
                aria-hidden
              >
                {s === "done" || s === "approved" ? (
                  <Check className="size-5" strokeWidth={3} />
                ) : s === "refused" ? (
                  <X className="size-5" strokeWidth={3} />
                ) : s === "back" ? (
                  <Undo2 className="size-4" strokeWidth={3} />
                ) : (
                  i + 1
                )}
              </span>
              <span
                className={cn(
                  "text-xs leading-tight sm:text-sm",
                  s === "current" || s === "back" || s === "refused"
                    ? "font-bold text-foreground"
                    : "font-medium text-foreground",
                )}
              >
                {t(label)}
              </span>
              <span
                className={cn(
                  "text-[11px] leading-tight sm:text-xs",
                  s === "todo" ? "text-muted-foreground" : "font-semibold text-foreground",
                )}
              >
                {t(STATE_TEXT[s])}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-5 space-y-3 border-t pt-4">
        <h2 id="where-title" className="text-base font-semibold">
          {t("dossiers.steps.where")}
        </h2>
        <p className="text-sm font-medium">{t(DOSSIER_STATE[status])}</p>

        {status === "complément demandé" && complementReason && (
          <div className="rounded-md bg-ochre-soft p-3 text-sm text-ochre-text">
            <div className="font-semibold">{t("dossiers.steps.complement.title")}</div>
            <p>{complementReason}</p>
          </div>
        )}

        {reminderDays !== null && (
          <div className="flex items-start gap-2 rounded-md bg-warning-bg p-3 text-sm font-medium text-warning-fg">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
            <p>{t("dossiers.steps.reminder.autre", { count: reminderDays })}</p>
          </div>
        )}

        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t("dossiers.steps.next.label")}
            </dt>
            <dd className="mt-0.5">{t(DOSSIER_NEXT[status])}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t("dossiers.steps.who.label")}
            </dt>
            <dd className="mt-0.5 font-medium">{t(who, { by: preparedBy })}</dd>
          </div>
        </dl>

        {nudge && (
          <div className="flex items-start gap-2 rounded-md bg-info-bg p-3 text-sm font-semibold text-info-fg">
            <ArrowRightCircle className="mt-0.5 size-5 shrink-0" aria-hidden />
            <p>{t(nudge)}</p>
          </div>
        )}
        {note && (
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
            <p>{t(note)}</p>
          </div>
        )}
      </div>
    </section>
  );
}
