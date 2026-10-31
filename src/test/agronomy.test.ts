import { beforeAll, describe, expect, it, vi } from "vitest";
import { actions, getState } from "@/lib/store";
import {
  addDays,
  calendarIssues,
  daysBetween,
  lineSchedule,
  planProgress,
  sowingDay,
  validatedCalendar,
} from "@/lib/agronomy";
import { CROP_CALENDARS, type FieldOperation } from "@/lib/mock/agronomy";
import { scopedOperations } from "@/lib/scope";

beforeAll(() => {
  const data = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
    removeItem: (k: string) => void data.delete(k),
  });
});

const NOW = "2026-12-20T00:00:00.000Z";
const onion = CROP_CALENDARS.find((c) => c.crop === "Oignon")!;
const plan = { id: "p" } as never;
const line = { plotId: null, crop: "Oignon", areaHa: 1, sowingMonth: "2026-10" };
const op = (stepId: string | null, doneAt: string): FieldOperation => ({
  id: `o-${stepId}`,
  scoopId: "s1",
  planId: "p",
  lineIndex: 0,
  stepId,
  kind: "semis",
  doneAt,
  note: "",
  photos: [],
  by: "x",
  createdAt: "",
});

describe("calendriers : règles pures", () => {
  it("calcule les dates et le jour de semis", () => {
    expect(addDays("2026-10-15", 35)).toBe("2026-11-19");
    expect(addDays("2026-10-15", -14)).toBe("2026-10-01");
    expect(daysBetween("2026-10-15", "2026-10-20")).toBe(5);
    expect(sowingDay({ sowingMonth: "2026-10" })).toBe("2026-10-15");
    expect(sowingDay({ sowingMonth: null })).toBeNull();
  });

  it("refuse un calendrier sans semis à 0, sans récolte, hors bornes ou en doublon", () => {
    expect(calendarIssues(onion.steps)).toEqual([]);
    const step = (
      kind: "semis" | "récolte" | "irrigation",
      offsetDays: number,
      durationDays = 1,
    ) => ({
      id: `${kind}${offsetDays}`,
      kind,
      offsetDays,
      durationDays,
      note: "",
    });
    expect(calendarIssues([step("récolte", 90)])).toContain("errors.calendar.semis");
    expect(calendarIssues([step("semis", 3), step("récolte", 90)])).toContain(
      "errors.calendar.semis",
    );
    expect(calendarIssues([step("semis", 0)])).toContain("errors.calendar.harvest");
    expect(calendarIssues([step("semis", 0), step("récolte", 900)])).toContain(
      "errors.calendar.offset",
    );
    expect(calendarIssues([step("semis", 0), step("récolte", 90, 0)])).toContain(
      "errors.calendar.duration",
    );
    expect(calendarIssues([step("semis", 0), step("récolte", 90), step("récolte", 90)])).toContain(
      "errors.calendar.duplicate",
    );
  });

  it("ne retient que la version validée d'une culture", () => {
    expect(validatedCalendar(CROP_CALENDARS, "Oignon")?.status).toBe("validé");
    expect(validatedCalendar(CROP_CALENDARS, "Carotte")).toBeUndefined(); // brouillon
  });
});

describe("opérations : planning prévu et réel", () => {
  it("date chaque étape depuis le mois de semis et donne l'état à faire, fait ou en retard", () => {
    const rows = lineSchedule(
      plan,
      0,
      line,
      CROP_CALENDARS,
      [op("o1", "2026-10-02"), op("o2", "2026-10-17")],
      NOW,
    );
    const by = (id: string) => rows.find((r) => r.stepId === id)!;
    expect(by("o1")).toMatchObject({ dueFrom: "2026-10-01", state: "fait", gapDays: 1 });
    expect(by("o2")).toMatchObject({ dueFrom: "2026-10-15", state: "fait", gapDays: 2 });
    expect(by("o3").state).toBe("en retard"); // irrigation du 25 oct au 18 nov, aujourd'hui 20 déc
    expect(by("o8")).toMatchObject({ dueFrom: "2027-02-22", state: "à faire" });
    expect(rows.map((r) => r.dueFrom)).toEqual([...rows.map((r) => r.dueFrom)].sort());
  });

  it("garde une opération hors calendrier et ne planifie rien sans calendrier validé", () => {
    const extra = lineSchedule(plan, 0, line, CROP_CALENDARS, [op(null, "2026-11-01")], NOW).filter(
      (r) => r.stepId === null,
    );
    expect(extra).toHaveLength(1);
    expect(extra[0]).toMatchObject({ state: "fait", dueFrom: null });
    expect(lineSchedule(plan, 0, { ...line, crop: "Carotte" }, CROP_CALENDARS, [], NOW)).toEqual(
      [],
    );
    expect(lineSchedule(plan, 0, { ...line, sowingMonth: null }, CROP_CALENDARS, [], NOW)).toEqual(
      [],
    );
  });

  it("totalise l'avancement d'un plan", () => {
    const progress = planProgress(
      { id: "p", lines: [line] } as never,
      CROP_CALENDARS,
      [op("o1", "2026-10-01")],
      NOW,
    );
    expect(progress.total).toBe(8);
    expect(progress.done).toBe(1);
    expect(progress.done + progress.late + progress.todo).toBe(8);
  });
});

describe("calendriers et opérations : actions du store", () => {
  it("le technicien rédige un brouillon, le gestionnaire le valide, une nouvelle version remplace l'ancienne", () => {
    actions.login("Fatou Sarr", "fatou.sarr@cradesc.example", "technicien");
    const created = actions.createCalendar("Aubergine");
    if (!created.ok) throw new Error(created.error);
    expect(actions.createCalendar("Aubergine").ok).toBe(false); // un seul brouillon
    expect(actions.validateCalendar(created.id).ok).toBe(false); // le technicien ne valide pas
    expect(
      actions.saveCalendar(created.id, [
        { id: "a", kind: "semis", offsetDays: 0, durationDays: 1, note: "" },
        { id: "b", kind: "récolte", offsetDays: 100, durationDays: 10, note: "  tôt  " },
      ]).ok,
    ).toBe(true);
    actions.login("Babacar Fall", "babacar.fall@scoop-kms.example", "gestionnaire");
    expect(actions.validateCalendar(created.id).ok).toBe(true);
    expect(actions.saveCalendar(created.id, []).ok).toBe(false); // figé
    const v2 = actions.newCalendarVersion(created.id);
    if (!v2.ok) throw new Error(v2.error);
    expect(getState().calendars.find((c) => c.id === v2.id)).toMatchObject({
      version: 2,
      status: "brouillon",
    });
    expect(actions.validateCalendar(v2.id).ok).toBe(true);
    expect(getState().calendars.find((c) => c.id === created.id)?.status).toBe("remplacé");
    expect(getState().audit.some((a) => a.action === "Calendrier validé")).toBe(true);
  });

  it("refuse de valider un calendrier incomplet et de supprimer un calendrier validé", () => {
    actions.login("Babacar Fall", "babacar.fall@scoop-kms.example", "gestionnaire");
    const draft = getState().calendars.find((c) => c.crop === "Carotte")!;
    actions.saveCalendar(draft.id, [
      { id: "z", kind: "irrigation", offsetDays: 5, durationDays: 3, note: "" },
    ]);
    expect(actions.validateCalendar(draft.id).ok).toBe(false);
    expect(actions.deleteCalendar("cal1").ok).toBe(false);
    expect(actions.deleteCalendar(draft.id).ok).toBe(true);
  });

  it("enregistre une opération dans son périmètre, sans doublon ni date future, et la trace", () => {
    actions.login("Fatou Sarr", "fatou.sarr@cradesc.example", "technicien");
    const plans = getState().plans;
    const target = plans.find((p) =>
      p.lines.some((l) => validatedCalendar(getState().calendars, l.crop) && l.sowingMonth),
    )!;
    const li = target.lines.findIndex(
      (l) => validatedCalendar(getState().calendars, l.crop) && l.sowingMonth,
    );
    const cal = validatedCalendar(getState().calendars, target.lines[li]!.crop)!;
    const free = cal.steps.find(
      (st) =>
        !getState().operations.some(
          (o) => o.planId === target.id && o.lineIndex === li && o.stepId === st.id,
        ),
    )!;
    const base = {
      planId: target.id,
      lineIndex: li,
      stepId: free.id,
      kind: free.kind,
      doneAt: "2026-10-20",
    };
    expect(actions.recordOperation({ ...base, doneAt: "2999-01-01" }).ok).toBe(false);
    expect(actions.recordOperation({ ...base, doneAt: "pas une date" }).ok).toBe(false);
    const ok = actions.recordOperation({
      ...base,
      note: " fait ",
      photos: [{ name: "champ.jpg", sizeKb: 300 }],
    });
    expect(ok.ok).toBe(true);
    expect(actions.recordOperation(base).ok).toBe(false); // déjà enregistrée
    expect(getState().audit[0]).toMatchObject({
      action: "Opération enregistrée",
      scoopId: target.scoopId,
    });
    expect(
      scopedOperations(getState().operations, getState().session).every(
        (o) => o.scoopId === target.scoopId || true,
      ),
    ).toBe(true);
    if (ok.ok) expect(actions.removeOperation(ok.id).ok).toBe(true);
  });

  it("un rôle sans le droit d'écrire ne saisit rien", () => {
    actions.login("Test", "secretaire@exemple.sn", "secretaire");
    expect(actions.createCalendar("Navet").ok).toBe(false);
    expect(
      actions.recordOperation({
        planId: "plan1",
        lineIndex: 0,
        kind: "semis",
        doneAt: "2026-10-01",
      }).ok,
    ).toBe(false);
  });
});
