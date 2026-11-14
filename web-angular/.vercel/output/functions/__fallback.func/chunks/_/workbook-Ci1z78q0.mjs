import { C as getState } from './locale.service-c0QhtcVY.mjs';

var SCHEMA = {
  organisations: {
    key: "organisations",
    sheet: "Organisations",
    label: "Organisations",
    columns: [
      {
        key: "nom",
        label: "Nom",
        required: true,
        aliases: [
          "organisation",
          "nom organisation",
          "name"
        ],
        hint: "Nom de l'organisation de base",
        example: "GIE Bokk Jom Ndimb"
      },
      {
        key: "type",
        label: "Type",
        aliases: ["type organisation", "categorie"],
        hint: "GIE, Section, Association, Groupement, Individuel ou Membre direct (vide = \xE0 qualifier)",
        example: "GIE"
      },
      {
        key: "village",
        label: "Village",
        required: true,
        aliases: ["localite", "village"],
        hint: "Village de l'organisation",
        example: "Ndimb"
      },
      {
        key: "scoop",
        label: "SCOOP",
        required: true,
        aliases: [
          "scoop",
          "cooperative",
          "commune"
        ],
        hint: "Nom de la SCOOP ou de sa commune",
        example: "Keur Momar Sarr"
      }
    ]
  },
  producteurs: {
    key: "producteurs",
    sheet: "Producteurs",
    label: "Producteurs",
    columns: [
      {
        key: "code",
        label: "Code",
        aliases: [
          "code producteur",
          "identifiant",
          "id"
        ],
        hint: "Identifiant unique (vide = attribu\xE9 automatiquement). Un code d\xE9j\xE0 connu n'est pas r\xE9import\xE9.",
        example: ""
      },
      {
        key: "prenom",
        label: "Pr\xE9nom",
        required: true,
        aliases: [
          "prenoms",
          "first name",
          "firstname"
        ],
        hint: "",
        example: "Awa"
      },
      {
        key: "nom",
        label: "Nom",
        required: true,
        aliases: [
          "nom de famille",
          "last name",
          "lastname"
        ],
        hint: "",
        example: "Diop"
      },
      {
        key: "sexe",
        label: "Sexe",
        required: true,
        aliases: ["genre", "sex"],
        hint: "F ou H (Femme / Homme)",
        example: "F"
      },
      {
        key: "age",
        label: "\xC2ge",
        required: true,
        aliases: ["age", "ans"],
        hint: "Nombre entier entre 15 et 100",
        example: "34"
      },
      {
        key: "telephone",
        label: "T\xE9l\xE9phone",
        aliases: [
          "tel",
          "telephone",
          "phone",
          "numero"
        ],
        hint: "Format 77 123 45 67",
        example: "77 412 33 10"
      },
      {
        key: "cni",
        label: "CNI",
        aliases: ["numero cni", "piece identite"],
        hint: "Num\xE9ro de carte d'identit\xE9 (facultatif)",
        example: ""
      },
      {
        key: "handicap",
        label: "Handicap",
        aliases: ["situation de handicap"],
        hint: "Oui / Non",
        example: "Non"
      },
      {
        key: "village",
        label: "Village",
        required: true,
        aliases: ["localite"],
        hint: "",
        example: "Ndimb"
      },
      {
        key: "scoop",
        label: "SCOOP",
        required: true,
        aliases: ["cooperative", "commune"],
        hint: "Nom de la SCOOP ou de sa commune",
        example: "Keur Momar Sarr"
      },
      {
        key: "organisation",
        label: "Organisation",
        required: true,
        aliases: [
          "organisation de base",
          "groupement",
          "gie"
        ],
        hint: "Nom exact de l'organisation (cr\xE9\xE9e si inconnue)",
        example: "GIE Bokk Jom Ndimb"
      },
      {
        key: "statut",
        label: "Statut",
        aliases: ["statut adhesion", "adhesion"],
        hint: "membre ou recens\xE9 (vide = recens\xE9)",
        example: "membre"
      },
      {
        key: "culture",
        label: "Culture",
        aliases: ["culture principale", "speculation"],
        hint: "Culture principale de la campagne",
        example: "Arachide"
      },
      {
        key: "superficie",
        label: "Superficie (ha)",
        aliases: [
          "superficie",
          "surface",
          "superficie ha"
        ],
        hint: "Superficie cultiv\xE9e en hectares",
        example: "1,5"
      },
      {
        key: "campagne",
        label: "Campagne",
        aliases: ["saison"],
        hint: "Ex. Campagne 2026 (vide = la plus r\xE9cente)",
        example: "Campagne 2026"
      }
    ]
  },
  parcelles: {
    key: "parcelles",
    sheet: "Parcelles",
    label: "Parcelles",
    columns: [
      {
        key: "code",
        label: "Code parcelle",
        aliases: [
          "code",
          "parcelle",
          "identifiant parcelle"
        ],
        hint: "Vide = attribu\xE9 automatiquement",
        example: ""
      },
      {
        key: "producteur",
        label: "Code producteur",
        required: true,
        aliases: ["producteur", "code du producteur"],
        hint: "Code d'un producteur existant ou pr\xE9sent dans la feuille Producteurs",
        example: "MD-10000"
      },
      {
        key: "culture",
        label: "Culture",
        required: true,
        aliases: ["speculation"],
        hint: "",
        example: "Arachide"
      },
      {
        key: "campagne",
        label: "Campagne",
        required: true,
        aliases: ["saison"],
        hint: "",
        example: "Campagne 2026"
      },
      {
        key: "declaree",
        label: "Surface d\xE9clar\xE9e (ha)",
        required: true,
        aliases: [
          "surface declaree",
          "superficie declaree",
          "surface kobo"
        ],
        hint: "Surface d\xE9clar\xE9e \xE0 l'enqu\xEAte, en hectares",
        example: "1,2"
      },
      {
        key: "mesuree",
        label: "Surface mesur\xE9e (ha)",
        aliases: ["surface mesuree", "surface gps"],
        hint: "Surface mesur\xE9e au GPS (vide = d\xE9clar\xE9e)",
        example: "1,1"
      },
      {
        key: "latitude",
        label: "Latitude",
        aliases: ["lat"],
        hint: "Centre de la parcelle (degr\xE9s d\xE9cimaux)",
        example: "15,9201"
      },
      {
        key: "longitude",
        label: "Longitude",
        aliases: [
          "lon",
          "lng",
          "long"
        ],
        hint: "Centre de la parcelle (degr\xE9s d\xE9cimaux, n\xE9gatif)",
        example: "-15,9702"
      },
      {
        key: "precision",
        label: "Pr\xE9cision GPS (m)",
        aliases: ["precision", "precision gps"],
        hint: "",
        example: "4"
      },
      {
        key: "contour",
        label: "Contour (GeoJSON)",
        aliases: [
          "contour",
          "geometrie",
          "geojson",
          "polygone"
        ],
        hint: "Facultatif : polygone GeoJSON ; sinon un contour est estim\xE9 depuis le centre et la surface",
        example: ""
      }
    ]
  }
};
var ENTITY_ORDER = [
  "organisations",
  "producteurs",
  "parcelles"
];
var norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
function autoMap(entity, headers2) {
  const h = headers2.map(norm);
  const out = {};
  const used = /* @__PURE__ */ new Set();
  for (const c of SCHEMA[entity].columns) {
    const names = [
      c.label,
      c.key,
      ...c.aliases
    ].map(norm);
    const i = h.findIndex((x, idx) => !used.has(idx) && names.includes(x));
    out[c.key] = i >= 0 ? i : null;
    if (i >= 0) used.add(i);
  }
  return out;
}
function detectEntity(sheetName, headers2) {
  const n = norm(sheetName);
  const byName = ENTITY_ORDER.find((k) => n.includes(norm(SCHEMA[k].sheet)) || n.includes(k.slice(0, -1)));
  if (byName) return byName;
  let best = null;
  let score = 0;
  for (const k of ENTITY_ORDER) {
    const m = autoMap(k, headers2);
    const req = SCHEMA[k].columns.filter((c) => c.required);
    const s = req.filter((c) => m[c.key] !== null).length / req.length + Object.values(m).filter((v) => v !== null).length / 1e3;
    if (s > score) {
      score = s;
      best = k;
    }
  }
  return score >= 0.75 ? best : null;
}
async function downloadWorkbook(file, sheets) {
  const XLSX = await import('xlsx');
  const wb = XLSX.utils.book_new();
  sheets.forEach((s) => {
    var _a;
    const ws = XLSX.utils.aoa_to_sheet(s.rows);
    ws["!cols"] = ((_a = s.rows[0]) != null ? _a : []).map((_, i) => ({ wch: Math.min(48, Math.max(10, ...s.rows.slice(0, 50).map((r) => {
      var _a2;
      return String((_a2 = r[i]) != null ? _a2 : "").length + 2;
    }))) }));
    XLSX.utils.book_append_sheet(wb, ws, s.name.slice(0, 31));
  });
  XLSX.writeFile(wb, file);
}
var headers = (e) => SCHEMA[e].columns.map((c) => c.label);
function templateSheets() {
  return [{
    name: "Lisez-moi",
    rows: [
      ["Mod\xE8le d'import Mbay Diaay"],
      [""],
      ["1. Remplissez une ligne par organisation, producteur ou parcelle. Supprimez la ligne d'exemple."],
      ["2. Les colonnes marqu\xE9es * sont obligatoires. Les autres peuvent rester vides."],
      ["3. Vous pouvez n'utiliser qu'une seule feuille (ex. seulement Producteurs)."],
      ["4. D\xE9posez le fichier dans l'\xE9cran Imports : un import \xE0 blanc est toujours fait avant d'\xE9crire quoi que ce soit."],
      [""],
      [
        "Feuille",
        "Colonne",
        "Obligatoire",
        "Explication",
        "Exemple"
      ],
      ...ENTITY_ORDER.flatMap((e) => SCHEMA[e].columns.map((c) => [
        SCHEMA[e].sheet,
        c.label,
        c.required ? "oui" : "",
        c.hint,
        c.example
      ])),
      [""],
      ["SCOOP accept\xE9es", getState().scoops.map((s) => s.commune).join(", ")]
    ]
  }, ...ENTITY_ORDER.map((e) => ({
    name: SCHEMA[e].sheet,
    rows: [SCHEMA[e].columns.map((c) => c.required ? `${c.label} *` : c.label), SCHEMA[e].columns.map((c) => c.example)]
  }))];
}
function exchangeRows(entity, d, opt) {
  const scoop = (id) => {
    var _a, _b;
    return (_b = (_a = getState().scoops.find((s) => s.id === id)) == null ? void 0 : _a.commune) != null ? _b : "";
  };
  const orgName = new Map(d.orgs.map((o) => [o.id, o.name]));
  const prodCode = new Map(d.producers.map((p) => [p.id, p.code]));
  if (entity === "organisations") return [headers(entity), ...d.orgs.map((o) => {
    var _a;
    return [
      o.name,
      (_a = o.type) != null ? _a : "",
      o.village,
      scoop(o.scoopId)
    ];
  })];
  if (entity === "producteurs") {
    const live = d.producers.filter((p) => !p.mergedInto);
    return [headers(entity), ...live.map((p) => {
      var _a, _b, _c, _d;
      const c = p.crops[p.crops.length - 1];
      return [
        p.code,
        opt.nominatif ? p.firstName : "",
        opt.nominatif ? p.lastName : "",
        p.sex,
        (_a = p.age) != null ? _a : "",
        opt.nominatif ? p.phone : "",
        opt.nominatif && opt.cni ? p.cni : "",
        p.handicap ? "Oui" : "Non",
        p.village,
        scoop(p.scoopId),
        (_b = orgName.get(p.orgId)) != null ? _b : "",
        p.status,
        (_c = c == null ? void 0 : c.crop) != null ? _c : "",
        c ? String(c.area).replace(".", ",") : "",
        (_d = c == null ? void 0 : c.campaign) != null ? _d : ""
      ];
    })];
  }
  return [headers(entity), ...d.plots.map((p) => {
    var _a, _b;
    const ring = (_a = p.repaired) != null ? _a : p.raw;
    const lat = ring.reduce((s, x) => s + x[0], 0) / ring.length;
    const lng = ring.reduce((s, x) => s + x[1], 0) / ring.length;
    const geo = JSON.stringify({
      type: "Polygon",
      coordinates: [[...ring, ring[0]].map(([la, ln]) => [Number(ln.toFixed(6)), Number(la.toFixed(6))])]
    });
    return [
      p.code,
      (_b = prodCode.get(p.producerId)) != null ? _b : "",
      p.crop,
      p.campaign,
      String(p.declared).replace(".", ","),
      String(p.measured).replace(".", ","),
      lat.toFixed(6).replace(".", ","),
      lng.toFixed(6).replace(".", ","),
      p.gpsPrecision,
      geo
    ];
  })];
}

export { ENTITY_ORDER as E, SCHEMA as S, detectEntity as a, autoMap as b, downloadWorkbook as d, exchangeRows as e, headers as h, norm as n, templateSheets as t };
//# sourceMappingURL=workbook-Ci1z78q0.mjs.map
