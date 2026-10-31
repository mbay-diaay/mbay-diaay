import { describe, expect, it } from "vitest";
import { getState } from "@/lib/store";
import { SCOOPS } from "@/lib/mock/data";
import { countTechnicians, overviewByScoop, sumOverview } from "@/lib/overview";

const data = () => {
  const s = getState();
  return {
    orgs: s.orgs,
    members: s.members,
    producers: s.producers,
    plots: s.plots,
    users: s.users,
    dossiers: s.dossiers,
    corrections: s.corrections,
    alerts: s.alerts,
  };
};
const all = () =>
  overviewByScoop(
    data(),
    SCOOPS.map((s) => s.id),
  );

describe("vue d'ensemble d'une coopérative", () => {
  it("additionne bien les SCOOP : les totaux retrouvent ceux de la plateforme", () => {
    const total = sumOverview(all());
    const s = getState();
    expect(total.producers).toBe(s.producers.filter((p) => !p.mergedInto).length);
    expect(total.orgs).toBe(s.orgs.length);
    expect(total.gie).toBe(s.orgs.filter((o) => o.type === "GIE").length);
    expect(total.members).toBe(s.members.filter((m) => m.status === "membre").length);
    expect(total.alerts).toBe(s.alerts.filter((a) => a.status === "ouvert").length);
    expect(total.corrections).toBe(s.corrections.filter((c) => c.status === "en attente").length);
  });

  it("compte les dossiers à traiter (soumis ou en examen), pas les brouillons ni les dossiers clos", () => {
    const s1 = overviewByScoop(data(), ["s1"])[0]!;
    const open = getState().dossiers.filter(
      (d) => d.scoopId === "s1" && (d.status === "soumis" || d.status === "en examen"),
    );
    expect(s1.dossiers).toBe(open.length);
    expect(open.length).toBeGreaterThan(0);
  });

  it("rattache un technicien à chacune de ses SCOOP, et ignore un accès fermé", () => {
    const rows = overviewByScoop(data(), ["s1", "s2", "s3"]);
    // Fatou Sarr couvre s1 et s2 ; Khadim Thiam (s3) est désactivé.
    expect(rows[0]!.technicians).toBeGreaterThanOrEqual(1);
    expect(rows[1]!.technicians).toBeGreaterThanOrEqual(1);
    expect(rows[2]!.technicians).toBe(0);
  });

  it("calcule chaque SCOOP séparément : la somme des alertes par SCOOP égale le total", () => {
    const rows = all();
    expect(rows.reduce((n, r) => n + r.alerts, 0)).toBe(
      getState().alerts.filter((a) => a.status === "ouvert").length,
    );
    expect(new Set(rows.map((r) => r.scoopId)).size).toBe(SCOOPS.length);
  });

  it("compte une fois un technicien qui couvre deux SCOOP", () => {
    const users = getState().users;
    const perScoop = sumOverview(overviewByScoop(data(), ["s1", "s2"])).technicians;
    expect(perScoop).toBeGreaterThan(countTechnicians(users, ["s1", "s2"]));
    expect(countTechnicians(users, ["s1", "s2"])).toBe(1);
    expect(countTechnicians(users, ["s3"])).toBe(0);
  });
});
