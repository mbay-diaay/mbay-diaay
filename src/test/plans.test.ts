import { describe, expect, it } from "vitest";
import { PLAN_NEXT, lineIssues, planArea, planCrops, validLines } from "@/lib/plans";
import type { PlanLine } from "@/lib/mock/cooperative";

const line = (patch: Partial<PlanLine> = {}): PlanLine => ({
  plotId: null,
  crop: "Oignon",
  areaHa: 1,
  sowingMonth: null,
  ...patch,
});

describe("plans d'exploitation", () => {
  it("additionne les surfaces et liste chaque culture une fois", () => {
    const lines = [line({ areaHa: 0.1 }), line({ areaHa: 0.2 }), line({ crop: "Tomate" })];
    expect(planArea(lines)).toBe(1.3);
    expect(planCrops(lines)).toEqual(["Oignon", "Tomate"]);
  });

  it("refuse une ligne sans culture ou sans surface", () => {
    expect(lineIssues(line({ crop: " " }))).not.toBeNull();
    expect(lineIssues(line({ areaHa: 0 }))).not.toBeNull();
    expect(validLines([line(), line({ crop: "" })])).toBe(false);
    expect(validLines([line()])).toBe(true);
  });

  it("suit l'ordre brouillon, validé, à jour", () => {
    expect(PLAN_NEXT.brouillon?.to).toBe("validé");
    expect(PLAN_NEXT.validé?.to).toBe("à jour");
    expect(PLAN_NEXT["à jour"]).toBeNull();
  });
});
