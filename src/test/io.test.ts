import { describe, expect, it, beforeAll, beforeEach } from "vitest";
import { actions, getState, isSnapshot } from "@/lib/store";
import { ROLE_PERMISSIONS } from "@/lib/permissions";
import { SCOOPS } from "@/lib/mock/data";
import { autoMap, detectEntity, SCHEMA, type EntityKey } from "@/lib/io/schema";
import { buildPlan, planCounts, type MappedSheet } from "@/lib/io/validate";
import { parseCsv } from "@/lib/io/parse";
import { exchangeRows } from "@/lib/io/workbook";
import { installMemoryStorage, loginAs } from "./session";

const base = () => {
  const s = getState();
  return {
    producers: s.producers,
    orgs: s.orgs,
    plots: s.plots,
    cropRefs: s.cropRefs,
    seuils: s.seuils,
  };
};
const sheet = (entity: EntityKey, rows: string[][], name = SCHEMA[entity].sheet): MappedSheet => {
  const [headers, ...body] = rows;
  return { name, entity, headers: headers!, rows: body, mapping: autoMap(entity, headers!) };
};
/** SCOOP du jeu de données courant : les tests ne dépendent pas de noms précis. */
const COMMUNE = SCOOPS[0]!.commune;
const PROD_HEAD = [
  "Prénom *",
  "nom",
  "Sexe",
  "Age",
  "Tel",
  "Village",
  "SCOOP",
  "Organisation",
  "Culture",
  "Superficie (ha)",
];

beforeAll(installMemoryStorage);
// Toute action du store exige une session et le droit du rôle : ces tests agissent en administrateur.
beforeEach(() => loginAs("admin"));

describe("imports et exports", () => {
  it("lit un CSV à point-virgule avec guillemets et BOM", () => {
    const rows = parseCsv('\uFEFFNom;Village\n"GIE ""Sopi"" Ndimb";Ndimb\n\nKawral;Sine\n');
    expect(rows).toEqual([
      ["Nom", "Village"],
      ['GIE "Sopi" Ndimb', "Ndimb"],
      ["Kawral", "Sine"],
    ]);
  });

  it("associe les en-têtes clients aux colonnes attendues malgré accents, casse et synonymes", () => {
    const m = autoMap("producteurs", PROD_HEAD);
    expect(m["prenom"]).toBe(0);
    expect(m["age"]).toBe(3);
    expect(m["telephone"]).toBe(4);
    expect(m["superficie"]).toBe(9);
    expect(m["cni"]).toBeNull();
    expect(detectEntity("Feuil1", PROD_HEAD)).toBe("producteurs");
    expect(detectEntity("Parcelles 2026", ["x"])).toBe("parcelles");
  });

  it("l'import à blanc rejette les lignes invalides avec leur numéro et accepte les autres", () => {
    const plan = buildPlan(
      [
        sheet("producteurs", [
          PROD_HEAD,
          [
            "Awa",
            "Testeuse",
            "F",
            "34",
            "77 000 11 22",
            "Ndimb",
            COMMUNE,
            "GIE Nouveau Test",
            "Arachide",
            "1,5",
          ],
          ["Moussa", "Sans Sexe", "X", "40", "", "Ndimb", COMMUNE, "GIE Nouveau Test", "", ""],
          [
            "Fatou",
            "Trop Jeune",
            "F",
            "9",
            "",
            "Ndimb",
            "SCOOP inconnue",
            "GIE Nouveau Test",
            "",
            "",
          ],
          [
            "Ibou",
            "Tel Faux",
            "H",
            "51",
            "12345",
            "Ndimb",
            COMMUNE,
            "GIE Nouveau Test",
            "Quinoa",
            "",
          ],
        ]),
      ],
      base(),
      { batchId: "L-T01", now: "2026-10-23T10:00:00.000Z" },
    );
    expect(plan.producers.map((p) => p.lastName)).toEqual(["Testeuse", "Tel Faux"]);
    expect(plan.sheets[0]).toMatchObject({ rows: 4, rejects: 2 });
    const rejects = plan.issues.filter((i) => i.level === "rejet");
    expect(rejects.map((i) => [i.row, i.field])).toEqual([
      [3, "Sexe"],
      [4, "Âge"],
      [4, "SCOOP"],
    ]);
    expect(plan.orgs).toHaveLength(1);
    expect(plan.orgs[0]!.type).toBeNull();
    expect(plan.producers[1]!.phone).toBe("");
    expect(plan.alerts.some((a) => a.type === "Téléphone invalide")).toBe(true);
    expect(plan.unknownCrops).toEqual(["Quinoa"]);
    expect(planCounts(plan).rejects).toBe(2);
  });

  it("signale un doublon candidat quand l'identité existe déjà, et ignore les codes connus", () => {
    const known = getState().producers.find(
      (p) => !p.mergedInto && p.phone && p.quality !== "doublon",
    )!;
    const commune = SCOOPS.find((x) => x.id === known.scoopId)!.commune;
    const org = getState().orgs.find((o) => o.id === known.orgId)!.name;
    const plan = buildPlan(
      [
        sheet("producteurs", [
          ["Code", ...PROD_HEAD],
          [
            "",
            known.firstName,
            known.lastName,
            known.sex,
            String(known.age),
            known.phone,
            known.village,
            commune,
            org,
            "",
            "",
          ],
          [known.code, "X", "Y", "F", "30", "", known.village, commune, org, "", ""],
        ]),
      ],
      base(),
      { batchId: "L-T02", now: "2026-10-23T10:00:00.000Z" },
    );
    expect(plan.cases).toHaveLength(1);
    expect(plan.cases[0]!.aId).toBe(known.id);
    expect(plan.producers[0]!.quality).toBe("doublon");
    expect(plan.skipped.map((s) => s.label)).toEqual([known.code]);
  });

  it("une parcelle doit être rattachée à un producteur et placée sur la carte", () => {
    const owner = getState().producers.find((p) => !p.mergedInto)!;
    const head = [
      "Code producteur",
      "Culture",
      "Campagne",
      "Surface déclarée (ha)",
      "Surface mesurée (ha)",
      "Latitude",
      "Longitude",
    ];
    const plan = buildPlan(
      [
        sheet("parcelles", [
          head,
          [owner.code, "Mil", "Campagne 2026", "1", "1,6", "15,92", "-15,97"],
          ["MD-INCONNU", "Mil", "Campagne 2026", "1", "", "15,92", "-15,97"],
          [owner.code, "Mil", "Campagne 2026", "1", "", "", ""],
          [owner.code, "Mil", "Campagne 2026", "1", "", "48,85", "2,35"],
        ]),
      ],
      base(),
      { batchId: "L-T03", now: "2026-10-23T10:00:00.000Z" },
    );
    expect(plan.plots).toHaveLength(1);
    expect(plan.plots[0]!.raw.length).toBeGreaterThanOrEqual(3);
    expect(plan.alerts.map((a) => a.type)).toContain("Écart de superficie");
    expect(plan.sheets[0]!.rejects).toBe(3);
  });

  it("un import confirmé ajoute les fiches, et un export complet se réimporte sans rien créer", () => {
    const head = ["Prénom", "Nom", "Sexe", "Âge", "Village", "SCOOP", "Organisation"];
    const plan = buildPlan(
      [
        sheet("producteurs", [
          head,
          ["Néné", "Importée", "F", "29", "Sine", COMMUNE, "Section Import Sine"],
        ]),
      ],
      base(),
      { batchId: "L-T04", now: "2026-10-23T10:00:00.000Z" },
    );
    const before = getState().producers.length;
    actions.ingestImport(plan, {
      id: "L-T04",
      file: "t.csv",
      hash: "x",
      at: "2026-10-23T10:00:00.000Z",
      script: "test",
      mode: "réel",
      counts: planCounts(plan),
      sheets: [],
    });
    expect(getState().producers).toHaveLength(before + 1);
    expect(getState().orgs.some((o) => o.name === "Section Import Sine")).toBe(true);

    const s = getState();
    const reimport = buildPlan(
      (["organisations", "producteurs"] as EntityKey[]).map((e) =>
        sheet(
          e,
          exchangeRows(e, s, { nominatif: true, cni: true }).map((r) => r.map(String)),
        ),
      ),
      base(),
      { batchId: "L-T05", now: "2026-10-23T10:00:00.000Z" },
    );
    expect(reimport.producers).toHaveLength(0);
    expect(reimport.orgs).toHaveLength(0);
  });

  it("une sauvegarde restaurée rend exactement les mêmes données", () => {
    const snap = actions.exportSnapshot();
    expect(isSnapshot(JSON.parse(JSON.stringify(snap)))).toBe(true);
    const producers = getState().producers.length;
    actions.qualifyOrgs([getState().orgs[0]!.id], "GIE");
    actions.restoreSnapshot(JSON.parse(JSON.stringify(snap)));
    expect(getState().producers).toHaveLength(producers);
    expect(getState().orgs[0]!.type).toBe(snap.data.orgs[0]!.type);
    expect(isSnapshot({ format: "autre" })).toBe(false);
  });

  it("liaison manuelle, actions sur les appareils et droit de sauvegarde", () => {
    const u = getState().users.find((x) => !getState().links.some((l) => l.userId === x.id))!;
    const p = getState().producers.find(
      (x) => !x.mergedInto && !getState().links.some((l) => l.producerId === x.id),
    )!;
    expect(actions.linkManually(u.id, p.id)).toBe(true);
    expect(actions.linkManually(u.id, p.id)).toBe(false);
    const d = getState().devices.find((x) => x.active)!;
    actions.revokeDevice(d.id);
    actions.reactivateDevice(d.id);
    actions.renameDevice(d.id, "Tablette terrain");
    expect(getState().devices.find((x) => x.id === d.id)).toMatchObject({
      active: true,
      label: "Tablette terrain",
    });
    expect(ROLE_PERMISSIONS.admin).toContain("data.backup");
    expect(ROLE_PERMISSIONS.gestionnaire).not.toContain("data.backup");
  });
});
