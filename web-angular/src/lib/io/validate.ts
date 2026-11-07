/**
 * Import à blanc : transforme les lignes lues en un plan d'écriture, sans rien
 * modifier. Chaque ligne est acceptée, acceptée avec avertissement ou rejetée,
 * avec son numéro de ligne et le motif — le rapport est lisible par le client.
 */
import { getState } from "@/lib/store";
import {
  ORG_TYPES,
  VILLAGES,
  type CropRef,
  type DataAlert,
  type DuplicateCase,
  type Org,
  type OrgType,
  type Plot,
  type Producer,
  type Seuils,
} from "@/lib/mock/data";
import { norm, SCHEMA, type EntityKey } from "./schema";

export interface RawSheet {
  name: string;
  /** Première ligne = en-têtes. */
  rows: string[][];
}

export interface MappedSheet {
  name: string;
  entity: EntityKey;
  headers: string[];
  rows: string[][];
  mapping: Record<string, number | null>;
}

export interface Issue {
  sheet: string;
  /** Numéro de ligne dans le fichier (en-tête = 1). */
  row: number;
  field: string;
  message: string;
  level: "rejet" | "avertissement";
}

export interface ImportPlan {
  orgs: Org[];
  producers: Producer[];
  plots: Plot[];
  alerts: DataAlert[];
  cases: DuplicateCase[];
  issues: Issue[];
  /** Lignes ignorées car déjà présentes (même code / même organisation). */
  skipped: { sheet: string; row: number; label: string }[];
  unknownCrops: string[];
  sheets: { name: string; entity: EntityKey; rows: number; rejects: number }[];
}

export interface Base {
  producers: Producer[];
  orgs: Org[];
  plots: Plot[];
  cropRefs: CropRef[];
  seuils: Seuils;
}

export interface PlanOptions {
  batchId: string;
  now: string;
}

const num = (s: string) => {
  const n = Number(s.replace(/\s/g, "").replace(",", "."));
  return s.trim() && Number.isFinite(n) ? n : NaN;
};
const yes = (s: string) => ["oui", "o", "1", "true", "vrai", "yes", "x"].includes(norm(s));
const fmtPhone = (d: string) =>
  `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5, 7)} ${d.slice(7, 9)}`;

export function findScoop(v: string) {
  const n = norm(v).replace(/^scoop /, "");
  return getState().scoops.find(
    (s) =>
      norm(s.commune) === n ||
      norm(s.name) === norm(v) ||
      norm(s.name).replace(/^scoop /, "") === n,
  );
}

/** Polygone approximatif (octogone) centré sur un point, d'aire ≈ `ha`. */
export function estimatePolygon(lat: number, lng: number, ha: number): [number, number][] {
  const r = Math.sqrt((ha * 10000) / Math.PI) / 111000;
  return Array.from({ length: 8 }, (_, k) => {
    const a = (k / 8) * Math.PI * 2;
    return [lat + Math.sin(a) * r, lng + (Math.cos(a) * r) / Math.cos((lat * Math.PI) / 180)] as [
      number,
      number,
    ];
  });
}

/** Contour GeoJSON (Polygon ou Feature) → anneau [lat, lng]. */
function parseContour(s: string): [number, number][] | null {
  try {
    const g = JSON.parse(s) as {
      type?: string;
      coordinates?: number[][][];
      geometry?: { coordinates?: number[][][] };
    };
    const ring = (g.type === "Feature" ? g.geometry?.coordinates : g.coordinates)?.[0];
    if (!ring || ring.length < 4) return null;
    const pts = ring
      .slice(0, -1)
      .map(([lng, lat]) => [Number(lat), Number(lng)] as [number, number]);
    return pts.every(([la, ln]) => Number.isFinite(la) && Number.isFinite(ln)) ? pts : null;
  } catch {
    return null;
  }
}

const inSenegal = (lat: number, lng: number) => lat > 12 && lat < 17 && lng > -18 && lng < -11;

export function buildPlan(sheets: MappedSheet[], base: Base, opt: PlanOptions): ImportPlan {
  const plan: ImportPlan = {
    orgs: [],
    producers: [],
    plots: [],
    alerts: [],
    cases: [],
    issues: [],
    skipped: [],
    unknownCrops: [],
    sheets: [],
  };
  const tag = opt.batchId.toLowerCase().replace(/[^a-z0-9]/g, "");
  const crops = new Map(base.cropRefs.map((r) => [norm(r.name), r.name]));
  const villages = new Set(VILLAGES.map(norm));
  const campaignNames = getState().campaigns.map((c) => c.name);
  const campaigns = new Map(campaignNames.map((c) => [norm(c), c]));
  const allOrgs = () => [...base.orgs, ...plan.orgs];
  const codes = new Set(base.producers.map((p) => p.code));
  const plotCodes = new Set(base.plots.map((p) => p.code));
  let alertSeq = 0;

  const crop = (raw: string) => {
    const hit = crops.get(norm(raw));
    if (hit) return hit;
    if (!plan.unknownCrops.includes(raw)) plan.unknownCrops.push(raw);
    return raw;
  };
  const alert = (
    type: string,
    severity: DataAlert["severity"],
    entity: DataAlert["entity"],
    entityId: string,
    detail: string,
  ) =>
    plan.alerts.push({
      id: `a-${tag}-${++alertSeq}`,
      type,
      severity,
      entity,
      entityId,
      status: "ouvert",
      enumerator: `Import ${opt.batchId}`,
      detail,
    });

  const order: EntityKey[] = ["organisations", "producteurs", "parcelles"];
  const sorted = [...sheets].sort((a, b) => order.indexOf(a.entity) - order.indexOf(b.entity));

  for (const sh of sorted) {
    const cols = SCHEMA[sh.entity].columns;
    let rejects = 0;
    let read = 0;
    sh.rows.forEach((cells, i) => {
      if (cells.every((c) => !String(c ?? "").trim())) return;
      read++;
      const row = i + 2;
      const v = (k: string) => {
        const idx = sh.mapping[k];
        return idx === null || idx === undefined ? "" : String(cells[idx] ?? "").trim();
      };
      const local: Issue[] = [];
      const reject = (field: string, message: string) =>
        local.push({ sheet: sh.name, row, field, message, level: "rejet" });
      const warn = (field: string, message: string) =>
        local.push({ sheet: sh.name, row, field, message, level: "avertissement" });
      cols
        .filter((c) => c.required && !v(c.key))
        .forEach((c) => reject(c.label, "Valeur obligatoire manquante"));

      if (sh.entity === "organisations") {
        const scoop = v("scoop") ? findScoop(v("scoop")) : undefined;
        if (v("scoop") && !scoop) reject("SCOOP", `SCOOP inconnue : « ${v("scoop")} »`);
        let type: OrgType | null = null;
        if (v("type")) {
          type = ORG_TYPES.find((t) => norm(t) === norm(v("type"))) ?? null;
          if (!type) warn("Type", `Type « ${v("type")} » non reconnu : organisation à qualifier`);
        }
        if (v("village") && !villages.has(norm(v("village"))))
          warn("Village", `Village « ${v("village")} » absent du référentiel des localités`);
        if (local.some((x) => x.level === "rejet")) {
          rejects++;
        } else if (
          allOrgs().some((o) => o.scoopId === scoop!.id && norm(o.name) === norm(v("nom")))
        ) {
          plan.skipped.push({ sheet: sh.name, row, label: v("nom") });
        } else {
          plan.orgs.push({
            id: `o-${tag}-${plan.orgs.length + 1}`,
            name: v("nom"),
            type,
            scoopId: scoop!.id,
            village: v("village"),
          });
        }
      }

      if (sh.entity === "producteurs") {
        const sexRaw = norm(v("sexe"));
        const sex = ["f", "femme", "feminin"].includes(sexRaw)
          ? "F"
          : ["h", "m", "homme", "masculin"].includes(sexRaw)
            ? "H"
            : null;
        if (v("sexe") && !sex) reject("Sexe", `« ${v("sexe")} » : attendu F ou H`);
        const age = num(v("age"));
        if (v("age") && (!Number.isInteger(age) || age < 15 || age > 100))
          reject("Âge", `« ${v("age")} » : entier entre 15 et 100 attendu`);
        const scoop = v("scoop") ? findScoop(v("scoop")) : undefined;
        if (v("scoop") && !scoop) reject("SCOOP", `SCOOP inconnue : « ${v("scoop")} »`);
        const code = v("code");
        if (code && plan.producers.some((p) => p.code === code))
          reject("Code", `Code ${code} présent deux fois dans le fichier`);
        let phone = "";
        if (v("telephone")) {
          const d = v("telephone").replace(/\D/g, "").replace(/^221/, "");
          if (/^7[0678]\d{7}$/.test(d)) phone = fmtPhone(d);
          else warn("Téléphone", `« ${v("telephone")} » ignoré : format attendu 77 123 45 67`);
        }
        if (v("village") && !villages.has(norm(v("village"))))
          warn("Village", `Village « ${v("village")} » absent du référentiel des localités`);
        const status = !v("statut")
          ? "recensé"
          : norm(v("statut")).startsWith("membre")
            ? "membre"
            : norm(v("statut")).startsWith("recens")
              ? "recensé"
              : null;
        if (!status) {
          warn("Statut", `« ${v("statut")} » non reconnu : « recensé » retenu`);
        }

        if (local.some((x) => x.level === "rejet")) {
          rejects++;
        } else if (code && codes.has(code)) {
          plan.skipped.push({ sheet: sh.name, row, label: code });
        } else {
          let org = allOrgs().find(
            (o) => o.scoopId === scoop!.id && norm(o.name) === norm(v("organisation")),
          );
          if (!org) {
            org = {
              id: `o-${tag}-${plan.orgs.length + 1}`,
              name: v("organisation"),
              type: null,
              scoopId: scoop!.id,
              village: v("village"),
            };
            plan.orgs.push(org);
            warn("Organisation", `Organisation « ${org.name} » créée (à qualifier)`);
          }
          const id = `p-${tag}-${plan.producers.length + 1}`;
          const finalCode =
            code || `MD-I${tag.slice(-3)}${String(plan.producers.length + 1).padStart(4, "0")}`;
          codes.add(finalCode);
          const area = num(v("superficie"));
          const campaign =
            campaigns.get(norm(v("campagne"))) ??
            (v("campagne") || campaignNames[campaignNames.length - 1]!);
          if (v("superficie") && !(area > 0))
            warn("Superficie (ha)", `« ${v("superficie")} » n'est pas une surface valide`);
          const p: Producer = {
            id,
            code: finalCode,
            firstName: v("prenom"),
            lastName: v("nom"),
            sex: sex!,
            age,
            handicap: yes(v("handicap")),
            phone,
            cni: v("cni").replace(/\s/g, ""),
            village: v("village"),
            scoopId: scoop!.id,
            orgId: org.id,
            status: status ?? "recensé",
            quality: "à vérifier",
            crops: v("culture")
              ? [{ campaign, crop: crop(v("culture")), area: area > 0 ? area : 0 }]
              : [],
            createdAt: opt.now,
            enumerator: `Import ${opt.batchId}`,
            history: [],
          };
          if (v("telephone") && !phone)
            alert(
              "Téléphone invalide",
              "faible",
              "producteur",
              id,
              `Numéro « ${v("telephone")} » non reconnu à l'import`,
            );
          // Doublon candidat : même nom + village, ou même téléphone qu'une fiche existante.
          const twin = base.producers.find(
            (x) =>
              !x.mergedInto &&
              ((norm(`${x.firstName} ${x.lastName}`) === norm(`${p.firstName} ${p.lastName}`) &&
                norm(x.village) === norm(p.village)) ||
                (p.phone && x.phone === p.phone)),
          );
          if (twin) {
            const sameName =
              norm(`${twin.firstName} ${twin.lastName}`) === norm(`${p.firstName} ${p.lastName}`);
            p.quality = "doublon";
            plan.cases.push({
              id: `d-${tag}-${plan.cases.length + 1}`,
              aId: twin.id,
              bId: id,
              score: sameName && twin.phone && twin.phone === p.phone ? 92 : sameName ? 80 : 62,
              signals: [
                ...(sameName
                  ? [
                      { label: "Nom et prénom identiques", primary: true },
                      { label: "Même village", primary: true },
                    ]
                  : []),
                ...(p.phone && twin.phone === p.phone
                  ? [{ label: "Téléphone partagé", primary: false }]
                  : []),
                { label: `Fiche importée par le lot ${opt.batchId}`, primary: false },
              ],
              status: "à examiner",
            });
            warn("Identité", `Doublon possible avec la fiche existante ${twin.code}`);
          }
          plan.producers.push(p);
        }
      }

      if (sh.entity === "parcelles") {
        const owner = [...base.producers, ...plan.producers].find(
          (p) => p.code === v("producteur") && !p.mergedInto,
        );
        if (v("producteur") && !owner)
          reject("Code producteur", `Aucun producteur avec le code ${v("producteur")}`);
        const declared = num(v("declaree"));
        if (v("declaree") && !(declared > 0))
          reject("Surface déclarée (ha)", `« ${v("declaree")} » n'est pas une surface valide`);
        const measuredRaw = num(v("mesuree"));
        const measured = measuredRaw > 0 ? measuredRaw : declared;
        let ring: [number, number][] | null = null;
        if (v("contour")) {
          ring = parseContour(v("contour"));
          if (!ring) warn("Contour (GeoJSON)", "Contour illisible : estimé depuis le centre");
        }
        if (!ring) {
          const lat = num(v("latitude"));
          const lng = num(v("longitude"));
          if (!Number.isFinite(lat) || !Number.isFinite(lng))
            reject(
              "Latitude / Longitude",
              "Coordonnées manquantes : impossible de placer la parcelle",
            );
          else if (!inSenegal(lat, lng))
            reject("Latitude / Longitude", `${lat}, ${lng} est hors de la zone attendue (Sénégal)`);
          else if (declared > 0) ring = estimatePolygon(lat, lng, measured);
        }
        const code = v("code");
        if (code && plan.plots.some((p) => p.code === code))
          reject("Code parcelle", `Code ${code} présent deux fois dans le fichier`);
        const campaign = campaigns.get(norm(v("campagne")));
        if (v("campagne") && !campaign)
          warn("Campagne", `Campagne « ${v("campagne")} » absente du référentiel`);
        const precision = num(v("precision"));

        if (local.some((x) => x.level === "rejet") || !ring || !owner) {
          rejects++;
        } else if (code && plotCodes.has(code)) {
          plan.skipped.push({ sheet: sh.name, row, label: code });
        } else {
          const id = `pl-${tag}-${plan.plots.length + 1}`;
          const finalCode =
            code || `PA-I${tag.slice(-3)}${String(plan.plots.length + 1).padStart(4, "0")}`;
          plotCodes.add(finalCode);
          plan.plots.push({
            id,
            code: finalCode,
            producerId: owner.id,
            declared,
            measured,
            gpsPrecision: precision > 0 ? precision : 0,
            status: "relevée",
            raw: ring,
            crop: crop(v("culture")),
            campaign: campaign ?? v("campagne"),
            versions: [
              {
                at: opt.now,
                label: `Importée (lot ${opt.batchId})${v("contour") ? "" : ", contour estimé depuis le centre"}`,
              },
            ],
          });
          const gap = Math.abs((measured - declared) / declared) * 100;
          if (gap > base.seuils.areaGapPct)
            alert(
              "Écart de superficie",
              "moyenne",
              "parcelle",
              id,
              `Écart déclaré / mesuré de ${Math.round(gap)} %`,
            );
          if (precision > base.seuils.gpsPrecisionMax)
            alert("Précision GPS faible", "faible", "parcelle", id, `Précision ± ${precision} m`);
        }
      }
      plan.issues.push(...local);
    });
    plan.sheets.push({ name: sh.name, entity: sh.entity, rows: read, rejects });
  }
  return plan;
}

export const planCounts = (p: ImportPlan) => ({
  producers: p.producers.length,
  plots: p.plots.length,
  crops: p.producers.reduce((n, x) => n + x.crops.length, 0),
  rejects: p.sheets.reduce((n, s) => n + s.rejects, 0),
  repaired: 0,
  alerts: p.alerts.length,
  duplicates: p.cases.length,
});
