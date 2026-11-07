/** Opérations de démonstration, déduites des plans et des calendriers : quelques-unes faites, dont une en retard. */
import { addDays, sowingDay, validatedCalendar } from "../agronomy";
import { CROP_CALENDARS, type FieldOperation } from "./agronomy";
import { PLANS } from "./cooperative";

export const FIELD_OPERATIONS: FieldOperation[] = (() => {
  const out: FieldOperation[] = [];
  PLANS.slice(0, 4).forEach((plan, pi) => {
    plan.lines.slice(0, 2).forEach((line, li) => {
      const day = sowingDay(line);
      const cal = validatedCalendar(CROP_CALENDARS, line.crop);
      if (!day || !cal) return;
      const sorted = [...cal.steps].sort((a, b) => a.offsetDays - b.offsetDays);
      // Les deux premières étapes faites, avec un léger décalage ; la troisième seulement pour une ligne sur deux.
      sorted.slice(0, 2 + ((pi + li) % 2)).forEach((st, k) => {
        out.push({
          id: `op${out.length + 1}`,
          scoopId: plan.scoopId,
          planId: plan.id,
          lineIndex: li,
          stepId: st.id,
          kind: st.kind,
          doneAt: addDays(day, st.offsetDays + ((pi + k) % 3)),
          note: k === 0 ? "Fait dans les délais." : "",
          photos: [],
          by: plan.createdBy,
          createdAt: `${addDays(day, st.offsetDays + ((pi + k) % 3))}T09:00:00.000Z`,
        });
      });
    });
  });
  return out;
})();
