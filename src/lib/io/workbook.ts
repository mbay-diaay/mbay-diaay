/**
 * Écriture de classeurs Excel (modèle d'import, export complet) et lignes
 * d'export au format d'échange — un export complet peut être réimporté tel quel.
 */
import { type Org, type Plot, type Producer } from "@/lib/mock/data";
import { getState } from "@/lib/store";
import { ENTITY_ORDER, SCHEMA, type EntityKey } from "./schema";

export type Cell = string | number;
export interface SheetOut {
  name: string;
  rows: Cell[][];
}

export async function downloadWorkbook(file: string, sheets: SheetOut[]) {
  const XLSX = await import("xlsx");
  const wb = XLSX.utils.book_new();
  sheets.forEach((s) => {
    const ws = XLSX.utils.aoa_to_sheet(s.rows);
    ws["!cols"] = (s.rows[0] ?? []).map((_, i) => ({
      wch: Math.min(
        48,
        Math.max(10, ...s.rows.slice(0, 50).map((r) => String(r[i] ?? "").length + 2)),
      ),
    }));
    XLSX.utils.book_append_sheet(wb, ws, s.name.slice(0, 31));
  });
  XLSX.writeFile(wb, file);
}

export const headers = (e: EntityKey) => SCHEMA[e].columns.map((c) => c.label);

/** Modèle à remplir : une feuille « Lisez-moi » puis une feuille par entité avec une ligne d'exemple. */
export function templateSheets(): SheetOut[] {
  const readme: Cell[][] = [
    ["Modèle d'import Mbay Diaay"],
    [""],
    [
      "1. Remplissez une ligne par organisation, producteur ou parcelle. Supprimez la ligne d'exemple.",
    ],
    ["2. Les colonnes marquées * sont obligatoires. Les autres peuvent rester vides."],
    ["3. Vous pouvez n'utiliser qu'une seule feuille (ex. seulement Producteurs)."],
    [
      "4. Déposez le fichier dans l'écran Imports : un import à blanc est toujours fait avant d'écrire quoi que ce soit.",
    ],
    [""],
    ["Feuille", "Colonne", "Obligatoire", "Explication", "Exemple"],
    ...ENTITY_ORDER.flatMap((e) =>
      SCHEMA[e].columns.map((c) => [
        SCHEMA[e].sheet,
        c.label,
        c.required ? "oui" : "",
        c.hint,
        c.example,
      ]),
    ),
    [""],
    [
      "SCOOP acceptées",
      getState()
        .scoops.map((s) => s.commune)
        .join(", "),
    ],
  ];
  return [
    { name: "Lisez-moi", rows: readme },
    ...ENTITY_ORDER.map((e) => ({
      name: SCHEMA[e].sheet,
      rows: [
        SCHEMA[e].columns.map((c) => (c.required ? `${c.label} *` : c.label)),
        SCHEMA[e].columns.map((c) => c.example),
      ],
    })),
  ];
}

/** Lignes d'export au format d'échange. `nominatif` = false retire noms, téléphone et CNI ; `cni` = false retire la CNI. */
export function exchangeRows(
  entity: EntityKey,
  d: { orgs: Org[]; producers: Producer[]; plots: Plot[] },
  opt: { nominatif: boolean; cni: boolean },
): Cell[][] {
  const scoop = (id: string) => getState().scoops.find((s) => s.id === id)?.commune ?? "";
  const orgName = new Map(d.orgs.map((o) => [o.id, o.name]));
  const prodCode = new Map(d.producers.map((p) => [p.id, p.code]));
  if (entity === "organisations")
    return [
      headers(entity),
      ...d.orgs.map((o) => [o.name, o.type ?? "", o.village, scoop(o.scoopId)]),
    ];
  if (entity === "producteurs") {
    const live = d.producers.filter((p) => !p.mergedInto);
    return [
      headers(entity),
      ...live.map((p) => {
        const c = p.crops[p.crops.length - 1];
        return [
          p.code,
          opt.nominatif ? p.firstName : "",
          opt.nominatif ? p.lastName : "",
          p.sex,
          p.age ?? "",
          opt.nominatif ? p.phone : "",
          opt.nominatif && opt.cni ? p.cni : "",
          p.handicap ? "Oui" : "Non",
          p.village,
          scoop(p.scoopId),
          orgName.get(p.orgId) ?? "",
          p.status,
          c?.crop ?? "",
          c ? String(c.area).replace(".", ",") : "",
          c?.campaign ?? "",
        ];
      }),
    ];
  }
  return [
    headers(entity),
    ...d.plots.map((p) => {
      const ring = p.repaired ?? p.raw;
      const lat = ring.reduce((s, x) => s + x[0]!, 0) / ring.length;
      const lng = ring.reduce((s, x) => s + x[1]!, 0) / ring.length;
      const geo = JSON.stringify({
        type: "Polygon",
        coordinates: [
          [...ring, ring[0]!].map(([la, ln]) => [Number(ln.toFixed(6)), Number(la.toFixed(6))]),
        ],
      });
      return [
        p.code,
        prodCode.get(p.producerId) ?? "",
        p.crop,
        p.campaign,
        String(p.declared).replace(".", ","),
        String(p.measured).replace(".", ","),
        lat.toFixed(6).replace(".", ","),
        lng.toFixed(6).replace(".", ","),
        p.gpsPrecision,
        geo,
      ];
    }),
  ];
}
