/**
 * Adaptateur du jeu de données fictif complet (`data/fixtures/mbay_fixture_complet.json`)
 * vers les types de l'application. Les volumes reprennent la base CRADESC du 05/10/2026
 * (1 317 producteurs, 1 534 parcelles, 1 941 cultures, 609 alertes, 5 doublons candidats).
 * Tout est inventé : téléphones et CNI en clair sont fabriqués à partir des fins masquées.
 */
import raw from "../../../data/fixtures/mbay_fixture_complet.json";
import type {
  CropRecord,
  DataAlert,
  DuplicateCase,
  Org,
  OrgType,
  Plot,
  PlotStatus,
  Producer,
  Scoop,
} from "./data";

interface FxScoop {
  id: string;
  nom: string;
  code: string;
}
interface FxOrg {
  id: string;
  nom: string;
  type: string;
  parent: string;
}
interface FxProducer {
  id: string;
  nom: string | null;
  sexe: "Homme" | "Femme";
  scoop_id: string;
  organisation_id: string;
  village: string;
  age: number | null;
  statut_qualite: string;
  situation_handicap: string;
  telephone_masque: string | null;
  cni_masquee: string | null;
  statut_adhesion: string;
  date_enquete: string;
  enqueteur: string;
}
interface FxPlot {
  id: string;
  producteur_id: string;
  superficie_ha: number;
  contour: [number, number][];
  contour_valide: boolean;
  contour_brut: [number, number][];
  precision_gps_m: number;
  cultures: { culture: string; part_pct: number }[];
  statut_carte: string;
}
interface FxAlert {
  id: string;
  entite_type: "Producteurs" | "Parcelles" | "Cultures";
  entite_id: string;
  alerte: string;
  severite: "faible" | "moyenne" | "élevée";
  statut: string;
}
interface FxDuplicate {
  id: string;
  signal: string;
  fiche_a: string;
  fiche_b: string;
  sim_nom: number;
  meme_village: boolean;
  meme_telephone: boolean;
  distance_min_parcelles_m: number | null;
}
interface FxMerge {
  id: string;
  fiche_conservee: string;
  fiche_supprimee_source: string;
  scoop: string;
  nom_conserve: string;
  date: string;
  parcelles_rattachees: number;
}
interface Fixture {
  scoops: FxScoop[];
  organisations: FxOrg[];
  producteurs: FxProducer[];
  parcelles: FxPlot[];
  chevauchements: { parcelle_a: string; parcelle_b: string }[];
  doublons_candidats: FxDuplicate[];
  groupes_telephone: { fiches: string[] }[];
  fusions_historiques: FxMerge[];
  alertes: FxAlert[];
  cultures_referentiel: { nom: string; famille: string }[];
  journal_audit: { horodatage: string; utilisateur: string; action: string; entite: string }[];
}

export const CAMPAIGN = "CHN 2025-2026";

const ORG_TYPE: Record<string, OrgType | null> = {
  gie: "GIE",
  section: "Section",
  association: "Association",
  individuel: "Individuel",
  membre_direct: "Membre direct",
  a_qualifier: null,
};
const PLOT_STATUS: Record<string, PlotStatus> = {
  validee: "validée",
  relevee: "relevée",
  a_reprendre: "à reprendre",
  chevauchement: "chevauchement",
};

/** Surface d'un anneau [lng, lat] en mètres carrés (projection locale, suffisante à cette échelle). */
function areaM2(ring: [number, number][]): number {
  const lat0 = ring.reduce((s, p) => s + p[1], 0) / ring.length;
  const lng0 = ring.reduce((s, p) => s + p[0], 0) / ring.length;
  const kx = 111320 * Math.cos((lat0 * Math.PI) / 180);
  const ky = 110540;
  let sum = 0;
  for (let i = 0; i < ring.length; i++) {
    const [x1, y1] = [(ring[i]![0] - lng0) * kx, (ring[i]![1] - lat0) * ky];
    const [x2, y2] = [
      (ring[(i + 1) % ring.length]![0] - lng0) * kx,
      (ring[(i + 1) % ring.length]![1] - lat0) * ky,
    ];
    sum += x1 * y2 - x2 * y1;
  }
  return Math.abs(sum) / 2;
}
const toLatLng = (ring: [number, number][]) =>
  ring.map(([lng, lat]) => [lat, lng] as [number, number]);
const round = (n: number, d: number) => Math.round(n * 10 ** d) / 10 ** d;
const isoDay = (day: string, hour = 9) => `${day}T${String(hour).padStart(2, "0")}:00:00.000Z`;

/** Types d'alertes du jeu : regroupés sous des intitulés courts, le texte d'origine devient le détail. */
function normalizeAlert(text: string): { type: string; detail: string } {
  const rendement = text.match(/^(.*) — Rendement (CHN|CS) aberrant/);
  if (rendement)
    return {
      type: `Rendement aberrant (${rendement[2]})`,
      detail: `${rendement[1]} : quantité à vérifier`,
    };
  if (text.startsWith("Précision GPS")) return { type: "Précision GPS faible", detail: text };
  if (text.startsWith("Durée d'entretien"))
    return { type: "Durée d'entretien atypique", detail: text };
  if (text.startsWith("Contour auto-intersecté"))
    return { type: "Écart de superficie", detail: text };
  if (text.startsWith("Superficie cultivée"))
    return { type: "Superficie incohérente", detail: text };
  if (text.startsWith("Superficie hors bornes"))
    return { type: "Superficie hors bornes", detail: text };
  if (text === "Âge manquant")
    return { type: text, detail: "L'âge n'a pas été renseigné à l'enquête." };
  if (text === "Format de CNI invalide")
    return { type: "CNI invalide", detail: "Le numéro de CNI n'a pas le format attendu." };
  return { type: text, detail: text };
}

export interface FixtureData {
  scoops: Scoop[];
  villages: string[];
  orgs: Org[];
  producers: Producer[];
  plots: Plot[];
  cases: DuplicateCase[];
  alerts: DataAlert[];
  cropRefs: { name: string; family: string }[];
  /** Entrées de journal d'audit de départ : journal de la base et fusions historiques. */
  audit: { id: string; at: string; user: string; action: string; entity: string; detail: string }[];
  counts: {
    producers: number;
    plots: number;
    crops: number;
    alerts: number;
    duplicates: number;
    overlaps: number;
    merges: number;
  };
}

/**
 * Code court d'une coopérative du jeu de données (3 à 5 lettres, unique) : le sigle entre parenthèses s'il
 * existe, sinon les initiales des mots, sinon le début du nom ; un chiffre jamais, une lettre de plus si besoin.
 */
export function scoopCode(name: string, taken: string[]): string {
  const letters = (t: string) =>
    t
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^A-Za-z]/g, "")
      .toUpperCase();
  const sigle = name.match(/\(([A-Z]{3,5})\)/)?.[1];
  const plain = name.replace(/\s*\(.*\)\s*$/, "");
  const words = plain.split(/[\s-]+/).filter(Boolean);
  const candidates = [
    sigle,
    words.length > 1 ? words.map((w) => letters(w)[0]).join("") : undefined,
    letters(plain).slice(0, 5),
  ].filter((c): c is string => !!c && c.length >= 3);
  for (const c of candidates) if (!taken.includes(c.slice(0, 5))) return c.slice(0, 5);
  const base = letters(plain);
  for (let n = 3; n <= Math.min(5, base.length); n++)
    if (!taken.includes(base.slice(0, n))) return base.slice(0, n);
  return base.slice(0, 5);
}

export function buildFixtureData(fx: Fixture = raw as unknown as Fixture): FixtureData {
  const scoops: Scoop[] = [];
  fx.scoops.forEach((s, i) =>
    scoops.push({
      id: `s${i + 1}`,
      name: s.nom,
      commune: s.nom.replace(/\s*\(.*\)\s*$/, ""),
      code: scoopCode(
        s.nom,
        scoops.map((x) => x.code ?? ""),
      ),
    }),
  );
  const scoopId = new Map(fx.scoops.map((s, i) => [s.id, `s${i + 1}`]));

  const pidOf = new Map(fx.producteurs.map((p, i) => [p.id, `p${i + 1}`]));
  const plidOf = new Map(fx.parcelles.map((p, i) => [p.id, `pl${i + 1}`]));
  const plCodeById = new Map(fx.parcelles.map((p) => [p.id, p.id]));
  void plCodeById;

  // Organisations : le village est le plus fréquent parmi leurs producteurs.
  const villageCount = new Map<string, Map<string, number>>();
  fx.producteurs.forEach((p) => {
    const m = villageCount.get(p.organisation_id) ?? new Map<string, number>();
    m.set(p.village, (m.get(p.village) ?? 0) + 1);
    villageCount.set(p.organisation_id, m);
  });
  const orgs: Org[] = fx.organisations.map((o, i) => {
    const top = [...(villageCount.get(o.id) ?? [])].sort((a, b) => b[1] - a[1])[0]?.[0];
    return {
      id: `o${i + 1}`,
      name: o.nom,
      type: ORG_TYPE[o.type] ?? null,
      scoopId: scoopId.get(o.parent) ?? "s1",
      village: top ?? "",
    };
  });
  const orgId = new Map(fx.organisations.map((o, i) => [o.id, `o${i + 1}`]));

  // Téléphones : fabriqués depuis les deux derniers chiffres visibles ; les groupes partagent un numéro.
  const used = new Set<string>();
  const last2 = (masked: string | null) =>
    (masked ?? "").replace(/\D/g, "").slice(-2).padStart(2, "0");
  const makePhone = (i: number, masked: string | null) => {
    for (let bump = 0; ; bump++) {
      const op = [7, 8, 6, 0][(i + bump) % 4]!;
      const phone = `7${op} ${String(100 + ((i * 7919 + bump * 13) % 900))} ${String(10 + ((i * 31) % 90))} ${last2(masked)}`;
      if (!used.has(phone)) {
        used.add(phone);
        return phone;
      }
    }
  };
  const phoneOf = new Map<string, string>();
  fx.groupes_telephone.forEach((g, gi) => {
    const lead = fx.producteurs.find((p) => p.id === g.fiches[0])!;
    const phone = makePhone(gi + 5000, lead.telephone_masque);
    g.fiches.forEach((f) => phoneOf.set(f, phone));
  });

  // Cultures des producteurs : une entrée par culture de chaque parcelle.
  const plotsOfProducer = new Map<string, FxPlot[]>();
  fx.parcelles.forEach((pl) =>
    plotsOfProducer.set(pl.producteur_id, [...(plotsOfProducer.get(pl.producteur_id) ?? []), pl]),
  );

  const producers: Producer[] = fx.producteurs.map((p, i) => {
    const [first = "Fiche", ...rest] = (p.nom ?? "").trim().split(/\s+/).filter(Boolean);
    const crops: CropRecord[] = (plotsOfProducer.get(p.id) ?? []).flatMap((pl) =>
      pl.cultures.map((c) => ({
        campaign: CAMPAIGN,
        crop: c.culture,
        area: round((pl.superficie_ha * c.part_pct) / 100, 2),
      })),
    );
    const sex = p.sexe === "Femme" ? "F" : "H";
    return {
      id: pidOf.get(p.id)!,
      code: p.id,
      firstName: p.nom ? first : "Fiche",
      lastName: p.nom ? rest.join(" ") || first : "sans nom",
      sex,
      age: p.age,
      handicap: p.situation_handicap === "Oui",
      phone: phoneOf.get(p.id) ?? (p.telephone_masque ? makePhone(i, p.telephone_masque) : ""),
      cni: p.cni_masquee
        ? `${sex === "F" ? 2 : 1}${String(100000000 + ((i * 7561) % 900000000)).slice(0, 9)}${p.cni_masquee.replace(/\D/g, "").slice(-3)}`
        : "",
      village: p.village,
      scoopId: scoopId.get(p.scoop_id) ?? "s1",
      orgId: orgId.get(p.organisation_id) ?? "o1",
      status: p.statut_adhesion === "membre" ? "membre" : "recensé",
      quality: p.statut_qualite === "Validée" ? "validé" : "à vérifier",
      crops,
      createdAt: isoDay(p.date_enquete),
      enumerator: p.enqueteur,
      history: [],
    };
  });
  const prodByCode = new Map(producers.map((p) => [p.code, p]));

  // Chevauchements : les deux parcelles de chaque paire se citent mutuellement dans leurs versions.
  const overlapWith = new Map<string, string>();
  fx.chevauchements.forEach((c) => {
    overlapWith.set(c.parcelle_a, c.parcelle_b);
    overlapWith.set(c.parcelle_b, c.parcelle_a);
  });

  const plots: Plot[] = fx.parcelles.map((pl) => {
    const owner = prodByCode.get(pl.producteur_id)!;
    const status = PLOT_STATUS[pl.statut_carte] ?? "relevée";
    const main = [...pl.cultures].sort((a, b) => b.part_pct - a.part_pct)[0];
    const fixed = pl.contour;
    const measured = round(areaM2(fixed) / 10000, 2);
    const versions: Plot["versions"] = [{ at: owner.createdAt, label: "Relevé GPS initial" }];
    if (!pl.contour_valide)
      versions.push({
        at: owner.createdAt,
        label: "Contour réparé à l'import (auto-intersection)",
      });
    const other = overlapWith.get(pl.id);
    if (other) versions.push({ at: owner.createdAt, label: `Chevauchement détecté avec ${other}` });
    return {
      id: plidOf.get(pl.id)!,
      code: pl.id,
      producerId: owner.id,
      declared: round(pl.superficie_ha, 2),
      measured,
      gpsPrecision: round(pl.precision_gps_m, 1),
      status,
      raw: toLatLng(pl.contour_valide ? fixed : pl.contour_brut),
      repaired: pl.contour_valide ? undefined : toLatLng(fixed),
      crop: main?.culture ?? "Non renseignée",
      campaign: CAMPAIGN,
      versions,
      reason: status === "à reprendre" ? "Relevé à refaire : contour incomplet" : undefined,
    };
  });
  const plotByCode = new Map(plots.map((p) => [p.code, p]));

  const alerts: DataAlert[] = fx.alertes.map((a, i) => {
    const { type, detail } = normalizeAlert(a.alerte);
    const isProducer = a.entite_type === "Producteurs";
    const plotCode = a.entite_id.replace(/-C\d+$/, "");
    const plot = isProducer ? undefined : plotByCode.get(plotCode);
    const owner = isProducer
      ? prodByCode.get(a.entite_id)
      : plot && producers.find((p) => p.id === plot.producerId);
    return {
      id: `a${i + 1}`,
      type,
      detail,
      severity: a.severite,
      entity: isProducer ? "producteur" : "parcelle",
      entityId: isProducer ? (owner?.id ?? "") : (plot?.id ?? ""),
      status: a.statut === "ouvert" ? "ouvert" : "ouvert",
      enumerator: owner?.enumerator ?? "Agent",
    };
  });

  const cases: DuplicateCase[] = fx.doublons_candidats.map((d) => {
    const a = prodByCode.get(d.fiche_a)!;
    const b = prodByCode.get(d.fiche_b)!;
    a.quality = "doublon";
    b.quality = "doublon";
    return {
      id: `d${d.id.replace(/\D/g, "").replace(/^0+/, "") || "0"}`,
      aId: a.id,
      bId: b.id,
      score: Math.min(99, Math.round(70 + d.sim_nom * 0.3)),
      signals: [
        { label: d.signal, primary: true },
        ...(d.meme_village ? [{ label: "Même village", primary: true }] : []),
        ...(d.meme_telephone ? [{ label: "Téléphone partagé", primary: false }] : []),
        { label: `Noms semblables à ${d.sim_nom} %`, primary: d.sim_nom >= 70 },
        ...(d.distance_min_parcelles_m !== null
          ? [{ label: `Parcelles à ${d.distance_min_parcelles_m} m`, primary: false }]
          : []),
      ],
      status: "à examiner",
    };
  });

  const audit = [
    ...fx.journal_audit.map((j, i) => ({
      id: `fx-j${i + 1}`,
      at: `${j.horodatage.replace(" ", "T")}:00.000Z`,
      user: j.utilisateur,
      action: j.action,
      entity: j.entite,
      detail: "Journal de la base",
    })),
    ...fx.fusions_historiques.map((m, i) => ({
      id: `fx-m${i + 1}`,
      at: isoDay(m.date, 10),
      user: "Admin CRADESC",
      action: "Fusion de fiches (historique)",
      entity: `Producteur ${m.fiche_conservee}`,
      detail: `${m.nom_conserve} (${m.scoop}) : ${m.parcelles_rattachees} parcelle(s) rattachée(s)`,
    })),
  ].sort((a, b) => b.at.localeCompare(a.at));

  return {
    scoops,
    villages: [...new Set(producers.map((p) => p.village))].sort((a, b) =>
      a.localeCompare(b, "fr"),
    ),
    orgs,
    producers,
    plots,
    cases,
    alerts,
    cropRefs: fx.cultures_referentiel.map((c) => ({ name: c.nom, family: c.famille })),
    audit,
    counts: {
      producers: producers.length,
      plots: plots.length,
      crops: producers.reduce((n, p) => n + p.crops.length, 0),
      alerts: alerts.length,
      duplicates: cases.length,
      overlaps: fx.chevauchements.length,
      merges: fx.fusions_historiques.length,
    },
  };
}
