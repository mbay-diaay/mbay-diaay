import { useMemo } from "react";
import { cn } from "@/lib/utils";
import type { CalendarStep } from "@/lib/mock/agronomy";
import { useI18n } from "@/lib/i18n";
import { OPERATION_KIND_LABEL, describeOffset, placeableSteps } from "./CalendarKinds";

/**
 * Frise du cycle : une ligne par étape, placée sur un axe en jours (0 = jour du semis).
 * Sur téléphone, l'axe disparaît et chaque ligne se lit comme une fiche : le texte dit déjà tout, la barre n'est qu'un repère.
 */
export function CalendarTimeline({ steps }: { steps: CalendarStep[] }) {
  const { t } = useI18n();
  const rows = useMemo(
    () => [...placeableSteps(steps)].sort((a, b) => a.offsetDays - b.offsetDays),
    [steps],
  );
  if (!rows.length)
    return <p className="text-sm text-muted-foreground">{t("calendriers.timeline.empty")}</p>;

  const min = Math.min(0, ...rows.map((r) => r.offsetDays));
  const max = Math.max(0, ...rows.map((r) => r.offsetDays + Math.max(1, r.durationDays)));
  const span = Math.max(1, max - min);
  const pct = (d: number) => ((d - min) / span) * 100;

  return (
    <div>
      <div className="mb-2 hidden items-center gap-3 text-xs text-muted-foreground sm:grid sm:grid-cols-[13rem_1fr]">
        <span>{t("calendriers.timeline.cycle", { from: min, to: max })}</span>
        <div className="relative h-4" aria-hidden>
          <span
            className="absolute -translate-x-1/2 whitespace-nowrap"
            style={{ left: `${pct(0)}%` }}
          >
            {t("calendriers.timeline.sowingMark")}
          </span>
        </div>
      </div>
      <ol className="grid gap-2">
        {rows.map((r) => {
          const len = Math.max(1, r.durationDays);
          return (
            <li
              key={r.id}
              className="grid gap-1 rounded-md border p-3 sm:grid-cols-[13rem_1fr] sm:items-center sm:gap-3 sm:border-0 sm:p-0"
            >
              <div className="min-w-0">
                <div className="font-semibold">{t(OPERATION_KIND_LABEL[r.kind])}</div>
                <div className="text-sm text-muted-foreground">
                  {describeOffset(t, r.offsetDays)}
                  {" · "}
                  {t("calendriers.duration.autre", { count: len })}
                </div>
                {r.note && <div className="mt-0.5 break-words text-sm">{r.note}</div>}
              </div>
              <div className="relative hidden h-6 rounded bg-muted sm:block" aria-hidden>
                <span
                  className="absolute inset-y-0 w-px bg-border-strong"
                  style={{ left: `${pct(0)}%` }}
                />
                <span
                  className={cn(
                    "absolute inset-y-1 min-w-1.5 rounded-sm",
                    r.kind === "semis" || r.kind === "récolte" ? "bg-primary" : "bg-ochre",
                  )}
                  style={{ left: `${pct(r.offsetDays)}%`, width: `${(len / span) * 100}%` }}
                />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
