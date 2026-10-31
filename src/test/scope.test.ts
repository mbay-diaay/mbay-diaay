import { describe, expect, it } from "vitest";
import { getState, inScope as storeInScope, type Session } from "@/lib/store";
import { fetchMyPermissions, ROLE_IS_SCOPED, ROLE_LABEL, type RoleId } from "@/lib/permissions";
import {
  canSeePlot,
  canSeeProducer,
  inScope,
  scopedAlerts,
  scopedCases,
  scopedPlots,
} from "@/lib/scope";
import { buildReport, REPORTS } from "@/lib/reports";
import { SCOOPS } from "@/lib/mock/data";
import { csvCell } from "@/lib/format";

const sessionOf = (role: RoleId): Session => ({
  name: "Test",
  email: "test@exemple.sn",
  role,
  expiresAt: Date.now() + 60_000,
  ...fetchMyPermissions(role),
});
const ROLES = Object.keys(ROLE_LABEL) as RoleId[];
const { producers, plots, alerts, cases, youthMaxAge } = getState();
const data = { producers, plots, alerts, cases, scoops: SCOOPS, youthMaxAge };
const manager = sessionOf("gestionnaire");
const myScoop = manager.scope.scoopId!;
const producerOf = new Map(producers.map((p) => [p.id, p]));
const ownerScoop = (a: (typeof alerts)[number]) =>
  producerOf.get(
    a.entity === "producteur"
      ? a.entityId
      : (plots.find((p) => p.id === a.entityId)?.producerId ?? ""),
  )?.scoopId;

describe("périmètre SCOOP par rôle", () => {
  it("les rôles de coopérative sont limités à leur SCOOP, l'administrateur et la faîtière voient tout", () => {
    for (const role of ROLES) {
      const s = sessionOf(role);
      const visible = inScope(producers, s);
      if (ROLE_IS_SCOPED[role]) {
        expect(visible.length).toBeGreaterThan(0);
        expect(visible.length).toBeLessThan(producers.length);
        const allowed = new Set(s.scope.scoopIds);
        expect(visible.every((p) => allowed.has(p.scoopId))).toBe(true);
      } else {
        expect(visible).toHaveLength(producers.length);
      }
    }
  });
  it("la source de vérité est unique : le store réexporte la fonction du module scope", () => {
    expect(storeInScope).toBe(inScope);
  });
  it("une session absente ne protège rien (le contrôle d'accès à la page s'en charge avant)", () => {
    expect(inScope(producers, null)).toHaveLength(producers.length);
  });
  it("les parcelles d'une autre SCOOP sont invisibles, y compris par accès direct", () => {
    const mine = scopedPlots(plots, producers, manager);
    expect(mine.length).toBeGreaterThan(0);
    expect(mine.length).toBeLessThan(plots.length);
    expect(mine.every((p) => producerOf.get(p.producerId)?.scoopId === myScoop)).toBe(true);
    const foreign = plots.find((p) => producerOf.get(p.producerId)?.scoopId !== myScoop)!;
    expect(canSeePlot(manager, foreign, producers)).toBe(false);
    expect(canSeePlot(sessionOf("admin"), foreign, producers)).toBe(true);
    expect(canSeePlot(manager, undefined, producers)).toBe(false);
  });
  it("les fiches producteur d'une autre SCOOP sont refusées", () => {
    const foreign = producers.find((p) => p.scoopId !== myScoop)!;
    expect(canSeeProducer(manager, foreign)).toBe(false);
    expect(canSeeProducer(sessionOf("faitiere"), foreign)).toBe(true);
  });
  it("les alertes et les doublons sont filtrés par propriétaire", () => {
    const a = scopedAlerts(alerts, producers, plots, manager);
    expect(a.length).toBeGreaterThan(0);
    expect(a.length).toBeLessThan(alerts.length);
    expect(a.every((x) => ownerScoop(x) === myScoop)).toBe(true);
    const c = scopedCases(cases, producers, manager);
    expect(c.every((x) => producerOf.get(x.aId)?.scoopId === myScoop)).toBe(true);
  });
});

describe("rapports : jamais au-delà du périmètre", () => {
  it("le rapport d'effectifs du gestionnaire ne contient que sa SCOOP", () => {
    const r = buildReport("effectifs", data, manager);
    const scoopName = SCOOPS.find((s) => s.id === myScoop)!.name;
    expect(r.scopeLabel).toBe(scoopName);
    expect(r.rows.map((x) => x[0])).toEqual([scoopName, "Total"]);
    const expected = inScope(
      producers.filter((p) => !p.mergedInto),
      manager,
    ).length;
    expect(r.rows[0]![1]).toBe(expected);
    const all = buildReport("effectifs", data, sessionOf("admin"));
    expect(all.rows.at(-1)![1] as number).toBeGreaterThan(expected);
  });
  it("les parcelles à reprendre et la qualité restent dans le périmètre", () => {
    const scoopName = SCOOPS.find((s) => s.id === myScoop)!.name;
    const redo = buildReport("reprises", data, manager);
    expect(redo.rows.every((x) => x[2] === scoopName)).toBe(true);
    const adminRedo = buildReport("reprises", data, sessionOf("admin"));
    expect(adminRedo.rows.length).toBeGreaterThanOrEqual(redo.rows.length);
    const q = buildReport("qualite", data, manager);
    const open = scopedAlerts(alerts, producers, plots, manager).filter(
      (x) => x.status === "ouvert",
    ).length;
    expect(q.rows.find((x) => x[0] === "Alertes ouvertes")![1]).toBe(open);
  });
  it("chaque rapport se construit pour chaque rôle sans erreur", () => {
    for (const role of ROLES)
      for (const def of REPORTS)
        expect(() => buildReport(def.id, data, sessionOf(role))).not.toThrow();
  });
});

describe("export CSV", () => {
  it("neutralise les formules et double les guillemets", () => {
    expect(csvCell("=SOMME(A1:A9)")).toBe(`"'=SOMME(A1:A9)"`);
    expect(csvCell("+221 77 123 45 67")).toBe(`"'+221 77 123 45 67"`);
    expect(csvCell("-2+3")).toBe(`"'-2+3"`);
    expect(csvCell("@cmd")).toBe(`"'@cmd"`);
    expect(csvCell('Il dit "oui"')).toBe(`"Il dit ""oui"""`);
  });
  it("laisse intacts les nombres, même négatifs, et le texte ordinaire", () => {
    expect(csvCell(-5)).toBe(`"-5"`);
    expect(csvCell(12.5)).toBe(`"12.5"`);
    expect(csvCell("Thiamène")).toBe(`"Thiamène"`);
  });
});
