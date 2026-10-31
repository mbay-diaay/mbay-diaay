import { useMemo } from "react";
import { addDays } from "@/lib/agronomy";
import type { CalendarStep } from "@/lib/mock/agronomy";
import { useI18n } from "@/lib/i18n";
import { OPERATION_KIND_LABEL, placeableSteps } from "./CalendarKinds";

/** Exemple fixe : un semis le 15 octobre, pour que chacun voie les dates réelles de chaque étape. */
const EXAMPLE_SOWING = "2026-10-15";

const day = (iso: string) =>
  new Date(`${iso}T00:00:00.000Z`).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export function CalendarPreview({ steps }: { steps: CalendarStep[] }) {
  const { t } = useI18n();
  const rows = useMemo(
    () =>
      [...placeableSteps(steps)]
        .sort((a, b) => a.offsetDays - b.offsetDays)
        .map((s) => {
          const from = addDays(EXAMPLE_SOWING, s.offsetDays);
          return { s, from, to: addDays(from, Math.max(1, s.durationDays) - 1) };
        }),
    [steps],
  );
  if (!rows.length) return null;
  return (
    <section className="surface mb-4 p-4" aria-labelledby="cal-preview">
      <h2 id="cal-preview" className="font-semibold">
        {t("calendriers.preview.title")}
      </h2>
      <p className="mb-3 text-sm text-muted-foreground">{t("calendriers.preview.intro")}</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b text-left text-xs text-muted-foreground">
            <tr>
              <th className="py-2 pr-3 font-semibold">{t("calendriers.preview.col.step")}</th>
              <th className="py-2 pr-3 font-semibold">{t("calendriers.preview.col.from")}</th>
              <th className="py-2 font-semibold">{t("calendriers.preview.col.to")}</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map(({ s, from, to }) => (
              <tr key={s.id}>
                <td className="py-2 pr-3 font-medium">{t(OPERATION_KIND_LABEL[s.kind])}</td>
                <td className="py-2 pr-3">{day(from)}</td>
                <td className="py-2">{from === to ? t("calendriers.preview.sameDay") : day(to)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
