import { i as inject, a2 as PLATFORM_ID, a3 as ElementRef, F as signal, c as computed, a4 as isPlatformBrowser, ɵ as __defineComponent, d as RouterLink, f as __elementStart, H as __listener, b as __element, g as __text, h as __elementEnd, j as __conditionalCreate, m as __repeaterCreate, G as __controlCreate, n as __property, o as __advance, q as __textInterpolate1, u as __attribute, s as __conditional, v as __repeater, J as __control, p as __textInterpolate, V as __repeaterTrackByIdentity, w as __nextContext, a5 as __classMap, z as __classProp, L as __getCurrentView, r as __pureFunction1, x as __pureFunction2, a6 as __repeaterTrackByIndex, a7 as __pureFunction5, N as __textInterpolate2, M as __pureFunction0, O as __restoreView, P as __resetView, C as __reference, S as __resolveDocument } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { C as CommonModule } from './snackbar.component-sjBBVJT0.mjs';
import { n as cn, P as PaginationComponent, F as FormsModule, h as NgSelectOption, ɵ as _NgSelectMultipleOption, D as DefaultValueAccessor, i as SelectControlValueAccessor, N as NgControlStatus, a as NgModel, j as UiButtonComponent, o as UiKpiTileComponent, c as UiPageHeaderComponent, d as UiPillComponent } from './ui-DDO8FoUF.mjs';
import { T as TriangleAlert, C as CircleCheck, k as CircleX, F as FlaskConical, R as RotateCcw, l as LoaderCircle, I as Info, m as Upload, D as Download, n as FileSpreadsheet, e as LucideAngularModule, f as LucideAngularComponent } from './lucide-angular-RJABeBQ2.mjs';
import { L as LocaleService, f as fmtDateTime, j as nf, A as can, C as getState, l as downloadCsv, V as VILLAGES, O as ORG_TYPES } from './locale.service-c0QhtcVY.mjs';
import { S as SCHEMA, E as ENTITY_ORDER, a as detectEntity, b as autoMap, d as downloadWorkbook, t as templateSheets, h as headers, n as norm } from './workbook-Ci1z78q0.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { c as createPager } from './pager-CsQ8gi_F.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'rxjs';
import 'rxjs/operators';
import 'node:module';
import 'node:async_hooks';
import 'clsx';
import 'tailwind-merge';
import 'date-fns';
import 'date-fns/locale';

var _a;
function parseCsv(text) {
  var _a2;
  const src = text.replace(/^\uFEFF/, "");
  const first = (_a2 = src.split(/\r?\n/, 1)[0]) != null ? _a2 : "";
  const sep = [
    ";",
    ",",
    "	"
  ].map((c) => [c, first.split(c).length]).sort((a, b) => b[1] - a[1])[0][0];
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"' && src[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"' && !cell) quoted = true;
    else if (ch === sep) {
      row.push(cell.trim());
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && src[i + 1] === "\n") i++;
      row.push(cell.trim());
      rows.push(row);
      row = [];
      cell = "";
    } else cell += ch;
  }
  if (cell || row.length) {
    row.push(cell.trim());
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c));
}
var isCsv = (f) => /\.(csv|txt)$/i.test(f.name) || f.type === "text/csv";
async function readFile(file) {
  if (isCsv(file)) return [{
    name: file.name.replace(/\.[^.]+$/, ""),
    rows: parseCsv(await file.text())
  }];
  const XLSX = await import('xlsx');
  const wb = XLSX.read(await file.arrayBuffer(), { type: "array" });
  return wb.SheetNames.map((name) => ({
    name,
    rows: XLSX.utils.sheet_to_json(wb.Sheets[name], {
      header: 1,
      raw: false,
      defval: "",
      blankrows: false
    }).map((r) => r.map((c) => String(c != null ? c : "").trim()))
  })).filter((s) => s.rows.length > 0);
}
async function sha(file) {
  const buf = await crypto.subtle.digest("SHA-256", await file.arrayBuffer());
  const h = [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 4)}\u2026${h.slice(-4)}`;
}
var num = (s) => {
  const n = Number(s.replace(/\s/g, "").replace(",", "."));
  return s.trim() && Number.isFinite(n) ? n : NaN;
};
var yes = (s) => [
  "oui",
  "o",
  "1",
  "true",
  "vrai",
  "yes",
  "x"
].includes(norm(s));
var fmtPhone = (d) => `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5, 7)} ${d.slice(7, 9)}`;
function findScoop(v) {
  const n = norm(v).replace(/^scoop /, "");
  return getState().scoops.find((s) => norm(s.commune) === n || norm(s.name) === norm(v) || norm(s.name).replace(/^scoop /, "") === n);
}
function estimatePolygon(lat, lng, ha) {
  const r = Math.sqrt(ha * 1e4 / Math.PI) / 111e3;
  return Array.from({ length: 8 }, (_, k) => {
    const a = k / 8 * Math.PI * 2;
    return [lat + Math.sin(a) * r, lng + Math.cos(a) * r / Math.cos(lat * Math.PI / 180)];
  });
}
function parseContour(s) {
  var _a2, _b;
  try {
    const g = JSON.parse(s);
    const ring = (_b = g.type === "Feature" ? (_a2 = g.geometry) == null ? void 0 : _a2.coordinates : g.coordinates) == null ? void 0 : _b[0];
    if (!ring || ring.length < 4) return null;
    const pts = ring.slice(0, -1).map(([lng, lat]) => [Number(lat), Number(lng)]);
    return pts.every(([la, ln]) => Number.isFinite(la) && Number.isFinite(ln)) ? pts : null;
  } catch {
    return null;
  }
}
var inSenegal = (lat, lng) => lat > 12 && lat < 17 && lng > -18 && lng < -11;
function buildPlan(sheets, base, opt) {
  const plan = {
    orgs: [],
    producers: [],
    plots: [],
    alerts: [],
    cases: [],
    issues: [],
    skipped: [],
    unknownCrops: [],
    sheets: []
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
  const crop = (raw) => {
    const hit = crops.get(norm(raw));
    if (hit) return hit;
    if (!plan.unknownCrops.includes(raw)) plan.unknownCrops.push(raw);
    return raw;
  };
  const alert = (type, severity, entity, entityId, detail) => plan.alerts.push({
    id: `a-${tag}-${++alertSeq}`,
    type,
    severity,
    entity,
    entityId,
    status: "ouvert",
    enumerator: `Import ${opt.batchId}`,
    detail
  });
  const order = [
    "organisations",
    "producteurs",
    "parcelles"
  ];
  const sorted = [...sheets].sort((a, b) => order.indexOf(a.entity) - order.indexOf(b.entity));
  for (const sh of sorted) {
    const cols = SCHEMA[sh.entity].columns;
    let rejects = 0;
    let read = 0;
    sh.rows.forEach((cells, i) => {
      var _a2, _b;
      if (cells.every((c) => !String(c != null ? c : "").trim())) return;
      read++;
      const row = i + 2;
      const v = (k) => {
        var _a3;
        const idx = sh.mapping[k];
        return idx === null || idx === void 0 ? "" : String((_a3 = cells[idx]) != null ? _a3 : "").trim();
      };
      const local = [];
      const reject = (field, message) => local.push({
        sheet: sh.name,
        row,
        field,
        message,
        level: "rejet"
      });
      const warn = (field, message) => local.push({
        sheet: sh.name,
        row,
        field,
        message,
        level: "avertissement"
      });
      cols.filter((c) => c.required && !v(c.key)).forEach((c) => reject(c.label, "Valeur obligatoire manquante"));
      if (sh.entity === "organisations") {
        const scoop = v("scoop") ? findScoop(v("scoop")) : void 0;
        if (v("scoop") && !scoop) reject("SCOOP", `SCOOP inconnue : \xAB ${v("scoop")} \xBB`);
        let type = null;
        if (v("type")) {
          type = (_a2 = ORG_TYPES.find((t) => norm(t) === norm(v("type")))) != null ? _a2 : null;
          if (!type) warn("Type", `Type \xAB ${v("type")} \xBB non reconnu : organisation \xE0 qualifier`);
        }
        if (v("village") && !villages.has(norm(v("village")))) warn("Village", `Village \xAB ${v("village")} \xBB absent du r\xE9f\xE9rentiel des localit\xE9s`);
        if (local.some((x) => x.level === "rejet")) rejects++;
        else if (allOrgs().some((o) => o.scoopId === scoop.id && norm(o.name) === norm(v("nom")))) plan.skipped.push({
          sheet: sh.name,
          row,
          label: v("nom")
        });
        else plan.orgs.push({
          id: `o-${tag}-${plan.orgs.length + 1}`,
          name: v("nom"),
          type,
          scoopId: scoop.id,
          village: v("village")
        });
      }
      if (sh.entity === "producteurs") {
        const sexRaw = norm(v("sexe"));
        const sex = [
          "f",
          "femme",
          "feminin"
        ].includes(sexRaw) ? "F" : [
          "h",
          "m",
          "homme",
          "masculin"
        ].includes(sexRaw) ? "H" : null;
        if (v("sexe") && !sex) reject("Sexe", `\xAB ${v("sexe")} \xBB : attendu F ou H`);
        const age = num(v("age"));
        if (v("age") && (!Number.isInteger(age) || age < 15 || age > 100)) reject("\xC2ge", `\xAB ${v("age")} \xBB : entier entre 15 et 100 attendu`);
        const scoop = v("scoop") ? findScoop(v("scoop")) : void 0;
        if (v("scoop") && !scoop) reject("SCOOP", `SCOOP inconnue : \xAB ${v("scoop")} \xBB`);
        const code = v("code");
        if (code && plan.producers.some((p) => p.code === code)) reject("Code", `Code ${code} pr\xE9sent deux fois dans le fichier`);
        let phone = "";
        if (v("telephone")) {
          const d = v("telephone").replace(/\D/g, "").replace(/^221/, "");
          if (/^7[0678]\d{7}$/.test(d)) phone = fmtPhone(d);
          else warn("T\xE9l\xE9phone", `\xAB ${v("telephone")} \xBB ignor\xE9 : format attendu 77 123 45 67`);
        }
        if (v("village") && !villages.has(norm(v("village")))) warn("Village", `Village \xAB ${v("village")} \xBB absent du r\xE9f\xE9rentiel des localit\xE9s`);
        const status = !v("statut") ? "recens\xE9" : norm(v("statut")).startsWith("membre") ? "membre" : norm(v("statut")).startsWith("recens") ? "recens\xE9" : null;
        if (!status) warn("Statut", `\xAB ${v("statut")} \xBB non reconnu : \xAB recens\xE9 \xBB retenu`);
        if (local.some((x) => x.level === "rejet")) rejects++;
        else if (code && codes.has(code)) plan.skipped.push({
          sheet: sh.name,
          row,
          label: code
        });
        else {
          let org = allOrgs().find((o) => o.scoopId === scoop.id && norm(o.name) === norm(v("organisation")));
          if (!org) {
            org = {
              id: `o-${tag}-${plan.orgs.length + 1}`,
              name: v("organisation"),
              type: null,
              scoopId: scoop.id,
              village: v("village")
            };
            plan.orgs.push(org);
            warn("Organisation", `Organisation \xAB ${org.name} \xBB cr\xE9\xE9e (\xE0 qualifier)`);
          }
          const id = `p-${tag}-${plan.producers.length + 1}`;
          const finalCode = code || `MD-I${tag.slice(-3)}${String(plan.producers.length + 1).padStart(4, "0")}`;
          codes.add(finalCode);
          const area = num(v("superficie"));
          const campaign = (_b = campaigns.get(norm(v("campagne")))) != null ? _b : v("campagne") || campaignNames[campaignNames.length - 1];
          if (v("superficie") && !(area > 0)) warn("Superficie (ha)", `\xAB ${v("superficie")} \xBB n'est pas une surface valide`);
          const p = {
            id,
            code: finalCode,
            firstName: v("prenom"),
            lastName: v("nom"),
            sex,
            age,
            handicap: yes(v("handicap")),
            phone,
            cni: v("cni").replace(/\s/g, ""),
            village: v("village"),
            scoopId: scoop.id,
            orgId: org.id,
            status: status != null ? status : "recens\xE9",
            quality: "\xE0 v\xE9rifier",
            crops: v("culture") ? [{
              campaign,
              crop: crop(v("culture")),
              area: area > 0 ? area : 0
            }] : [],
            createdAt: opt.now,
            enumerator: `Import ${opt.batchId}`,
            history: []
          };
          if (v("telephone") && !phone) alert("T\xE9l\xE9phone invalide", "faible", "producteur", id, `Num\xE9ro \xAB ${v("telephone")} \xBB non reconnu \xE0 l'import`);
          const twin = base.producers.find((x) => !x.mergedInto && (norm(`${x.firstName} ${x.lastName}`) === norm(`${p.firstName} ${p.lastName}`) && norm(x.village) === norm(p.village) || p.phone && x.phone === p.phone));
          if (twin) {
            const sameName = norm(`${twin.firstName} ${twin.lastName}`) === norm(`${p.firstName} ${p.lastName}`);
            p.quality = "doublon";
            plan.cases.push({
              id: `d-${tag}-${plan.cases.length + 1}`,
              aId: twin.id,
              bId: id,
              score: sameName && twin.phone && twin.phone === p.phone ? 92 : sameName ? 80 : 62,
              signals: [
                ...sameName ? [{
                  label: "Nom et pr\xE9nom identiques",
                  primary: true
                }, {
                  label: "M\xEAme village",
                  primary: true
                }] : [],
                ...p.phone && twin.phone === p.phone ? [{
                  label: "T\xE9l\xE9phone partag\xE9",
                  primary: false
                }] : [],
                {
                  label: `Fiche import\xE9e par le lot ${opt.batchId}`,
                  primary: false
                }
              ],
              status: "\xE0 examiner"
            });
            warn("Identit\xE9", `Doublon possible avec la fiche existante ${twin.code}`);
          }
          plan.producers.push(p);
        }
      }
      if (sh.entity === "parcelles") {
        const owner = [...base.producers, ...plan.producers].find((p) => p.code === v("producteur") && !p.mergedInto);
        if (v("producteur") && !owner) reject("Code producteur", `Aucun producteur avec le code ${v("producteur")}`);
        const declared = num(v("declaree"));
        if (v("declaree") && !(declared > 0)) reject("Surface d\xE9clar\xE9e (ha)", `\xAB ${v("declaree")} \xBB n'est pas une surface valide`);
        const measuredRaw = num(v("mesuree"));
        const measured = measuredRaw > 0 ? measuredRaw : declared;
        let ring = null;
        if (v("contour")) {
          ring = parseContour(v("contour"));
          if (!ring) warn("Contour (GeoJSON)", "Contour illisible : estim\xE9 depuis le centre");
        }
        if (!ring) {
          const lat = num(v("latitude"));
          const lng = num(v("longitude"));
          if (!Number.isFinite(lat) || !Number.isFinite(lng)) reject("Latitude / Longitude", "Coordonn\xE9es manquantes : impossible de placer la parcelle");
          else if (!inSenegal(lat, lng)) reject("Latitude / Longitude", `${lat}, ${lng} est hors de la zone attendue (S\xE9n\xE9gal)`);
          else if (declared > 0) ring = estimatePolygon(lat, lng, measured);
        }
        const code = v("code");
        if (code && plan.plots.some((p) => p.code === code)) reject("Code parcelle", `Code ${code} pr\xE9sent deux fois dans le fichier`);
        const campaign = campaigns.get(norm(v("campagne")));
        if (v("campagne") && !campaign) warn("Campagne", `Campagne \xAB ${v("campagne")} \xBB absente du r\xE9f\xE9rentiel`);
        const precision = num(v("precision"));
        if (local.some((x) => x.level === "rejet") || !ring || !owner) rejects++;
        else if (code && plotCodes.has(code)) plan.skipped.push({
          sheet: sh.name,
          row,
          label: code
        });
        else {
          const id = `pl-${tag}-${plan.plots.length + 1}`;
          const finalCode = code || `PA-I${tag.slice(-3)}${String(plan.plots.length + 1).padStart(4, "0")}`;
          plotCodes.add(finalCode);
          plan.plots.push({
            id,
            code: finalCode,
            producerId: owner.id,
            declared,
            measured,
            gpsPrecision: precision > 0 ? precision : 0,
            status: "relev\xE9e",
            raw: ring,
            crop: crop(v("culture")),
            campaign: campaign != null ? campaign : v("campagne"),
            versions: [{
              at: opt.now,
              label: `Import\xE9e (lot ${opt.batchId})${v("contour") ? "" : ", contour estim\xE9 depuis le centre"}`
            }]
          });
          const gap = Math.abs((measured - declared) / declared) * 100;
          if (gap > base.seuils.areaGapPct) alert("\xC9cart de superficie", "moyenne", "parcelle", id, `\xC9cart d\xE9clar\xE9 / mesur\xE9 de ${Math.round(gap)} %`);
          if (precision > base.seuils.gpsPrecisionMax) alert("Pr\xE9cision GPS faible", "faible", "parcelle", id, `Pr\xE9cision \xB1 ${precision} m`);
        }
      }
      plan.issues.push(...local);
    });
    plan.sheets.push({
      name: sh.name,
      entity: sh.entity,
      rows: read,
      rejects
    });
  }
  return plan;
}
var planCounts = (p) => ({
  producers: p.producers.length,
  plots: p.plots.length,
  crops: p.producers.reduce((n, x) => n + x.crops.length, 0),
  rejects: p.sheets.reduce((n, s) => n + s.rejects, 0),
  repaired: 0,
  alerts: p.alerts.length,
  duplicates: p.cases.length
});
var _c0 = (a0) => ({ label: a0 });
var _c1 = (a0) => ({ hash: a0 });
var _c2 = (a0, a1) => ({
  id: a0,
  date: a1
});
var _c3 = (a0) => ({ name: a0 });
var _c4 = (a0, a1) => ({
  count: a0,
  n: a1
});
var _c5 = (a0) => ({ n: a0 });
var _c6 = (a0) => ({ list: a0 });
var _c7 = (a0) => ({ file: a0 });
var _c8 = (a0) => ({ count: a0 });
var _c9 = (a0) => ({ id: a0 });
var _c10 = (a0, a1, a2, a3, a4) => ({
  producers: a0,
  plots: a1,
  orgs: a2,
  alerts: a3,
  cases: a4
});
var _c11 = () => ({ vue: "a-qualifier" });
var _c12 = () => ({ section: "noms" });
var _c13 = (a0) => ({ q: a0 });
var _forTrack0 = ($index, $item) => $item.name;
var _forTrack1 = ($index, $item) => $item.key;
var _forTrack2 = ($index, $item) => $item.id + $item.at;
function ImportsPage_Conditional_10_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "button", 22);
    __listener("click", function ImportsPage_Conditional_10_For_2_Template_button_click_0_listener() {
      const entity_r2 = __restoreView(_r1).$implicit;
      const ctx_r2 = __nextContext(2);
      ctx_r2.downloadEntityCsv(entity_r2);
      return __resetView(ctx_r2.csvOpen.set(false));
    });
    __element(1, "lucide-angular", 5);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const entity_r2 = ctx.$implicit;
    const ctx_r2 = __nextContext(2);
    __advance();
    __property("img", ctx_r2.icons.download);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("imports.template.entity", __pureFunction1(2, _c0, ctx_r2.entityLabel(entity_r2))), " ");
  }
}
function ImportsPage_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 8);
    __repeaterCreate(1, ImportsPage_Conditional_10_For_2_Template, 3, 4, "button", 21, __repeaterTrackByIdentity);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance();
    __repeater(ctx_r2.entityOrder);
  }
}
function ImportsPage_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 9);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance();
    __textInterpolate1(" ", ctx_r2.flash(), " ");
  }
}
function ImportsPage_For_14_Conditional_5_Template(rf, ctx) {
  if (rf & 1) __element(0, "span", 24);
}
function ImportsPage_For_14_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li", 11)(1, "span", 23);
    __text(2);
    __elementEnd();
    __elementStart(3, "span");
    __text(4);
    __elementEnd();
    __conditionalCreate(5, ImportsPage_For_14_Conditional_5_Template, 1, 0, "span", 24);
    __elementEnd();
  }
  if (rf & 2) {
    const stepName_r4 = ctx.$implicit;
    const \u0275$index_34_r5 = ctx.$index;
    const ctx_r2 = __nextContext();
    __advance();
    __classMap(ctx_r2.cn(\u0275$index_34_r5 < ctx_r2.stepIdx() ? "bg-primary text-primary-foreground" : \u0275$index_34_r5 === ctx_r2.stepIdx() ? "bg-primary-soft text-primary ring-2 ring-primary" : "bg-muted text-muted-foreground"));
    __advance();
    __textInterpolate1(" ", \u0275$index_34_r5 + 1, " ");
    __advance();
    __classProp("font-semibold", \u0275$index_34_r5 === ctx_r2.stepIdx())("text-muted-foreground", \u0275$index_34_r5 !== ctx_r2.stepIdx());
    __advance();
    __textInterpolate1(" ", ctx_r2.locale.tEnum("imports.step", stepName_r4), " ");
    __advance();
    __conditional(\u0275$index_34_r5 < ctx_r2.STEPS.length - 1 ? 5 : -1);
  }
}
function ImportsPage_Conditional_15_Conditional_1_Template(rf, ctx) {
  if (rf & 1) __element(0, "lucide-angular", 26);
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __property("img", ctx_r2.icons.loader);
  }
}
function ImportsPage_Conditional_15_Conditional_2_Template(rf, ctx) {
  if (rf & 1) __element(0, "lucide-angular", 27);
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __property("img", ctx_r2.icons.upload);
  }
}
function ImportsPage_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = __getCurrentView();
    __elementStart(0, "label", 25);
    __listener("click", function ImportsPage_Conditional_15_Template_label_click_0_listener() {
      __restoreView(_r6);
      const fileInput_r7 = __reference(8);
      return __resetView(fileInput_r7.click());
    })("dragover", function ImportsPage_Conditional_15_Template_label_dragover_0_listener($event) {
      __restoreView(_r6);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.onDragOver($event));
    })("dragleave", function ImportsPage_Conditional_15_Template_label_dragleave_0_listener() {
      __restoreView(_r6);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.drag.set(false));
    })("drop", function ImportsPage_Conditional_15_Template_label_drop_0_listener($event) {
      __restoreView(_r6);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.onDrop($event));
    });
    __conditionalCreate(1, ImportsPage_Conditional_15_Conditional_1_Template, 1, 1, "lucide-angular", 26)(2, ImportsPage_Conditional_15_Conditional_2_Template, 1, 1, "lucide-angular", 27);
    __elementStart(3, "span", 28);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 29);
    __text(6);
    __elementEnd();
    __elementStart(7, "input", 30, 0);
    __listener("click", function ImportsPage_Conditional_15_Template_input_click_7_listener($event) {
      return $event.stopPropagation();
    })("change", function ImportsPage_Conditional_15_Template_input_change_7_listener($event) {
      __restoreView(_r6);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.onFileInput($event));
    });
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __classProp("border-primary", ctx_r2.drag())("bg-primary-soft", ctx_r2.drag());
    __advance();
    __conditional(ctx_r2.busy() ? 1 : 2);
    __advance(3);
    __textInterpolate1(" ", ctx_r2.busy() ? ctx_r2.t()("imports.drop.reading") : ctx_r2.t()("imports.drop.prompt"), " ");
    __advance(2);
    __textInterpolate(ctx_r2.t()("imports.drop.hint"));
  }
}
function ImportsPage_Conditional_16_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 35);
    __element(1, "lucide-angular", 40);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const same_r9 = ctx;
    const ctx_r2 = __nextContext(2);
    __advance();
    __property("img", ctx_r2.icons.info);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("imports.sameFile", __pureFunction2(2, _c2, same_r9.id, ctx_r2.fmtDateTime(same_r9.at))), " ");
  }
}
function ImportsPage_Conditional_16_For_12_For_10_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "option", 44);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const entity_r12 = ctx.$implicit;
    const ctx_r2 = __nextContext(3);
    __property("value", entity_r12);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("imports.sheet.contains", __pureFunction1(2, _c0, ctx_r2.entityLabel(entity_r12))), " ");
  }
}
function ImportsPage_Conditional_16_For_12_Conditional_11_For_12_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 53);
    __text(1, " *");
    __elementEnd();
  }
}
function ImportsPage_Conditional_16_For_12_Conditional_11_For_12_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 54);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const column_r14 = __nextContext().$implicit;
    __advance();
    __textInterpolate(column_r14.hint);
  }
}
function ImportsPage_Conditional_16_For_12_Conditional_11_For_12_For_11_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "option", 44);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const header_r15 = ctx.$implicit;
    const \u0275$index_150_r16 = ctx.$index;
    const ctx_r2 = __nextContext(5);
    __property("value", ctx_r2.colIdxStr(\u0275$index_150_r16));
    __advance();
    __textInterpolate1(" ", header_r15 || ctx_r2.t()("imports.map.columnN", __pureFunction1(2, _c5, \u0275$index_150_r16 + 1)), " ");
  }
}
function ImportsPage_Conditional_16_For_12_Conditional_11_For_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = __getCurrentView();
    __elementStart(0, "tr")(1, "td", 51)(2, "span", 52);
    __text(3);
    __elementEnd();
    __conditionalCreate(4, ImportsPage_Conditional_16_For_12_Conditional_11_For_12_Conditional_4_Template, 2, 0, "span", 53);
    __conditionalCreate(5, ImportsPage_Conditional_16_For_12_Conditional_11_For_12_Conditional_5_Template, 2, 1, "div", 54);
    __elementEnd();
    __elementStart(6, "td", 55)(7, "select", 56);
    __controlCreate();
    __listener("ngModelChange", function ImportsPage_Conditional_16_For_12_Conditional_11_For_12_Template_select_ngModelChange_7_listener($event) {
      const column_r14 = __restoreView(_r13).$implicit;
      const \u0275$index_87_r11 = __nextContext(2).$index;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.onMapping(\u0275$index_87_r11, column_r14.key, $event));
    });
    __elementStart(8, "option", 44);
    __text(9);
    __elementEnd();
    __repeaterCreate(10, ImportsPage_Conditional_16_For_12_Conditional_11_For_12_For_11_Template, 2, 4, "option", 44, __repeaterTrackByIndex);
    __elementEnd()();
    __elementStart(12, "td", 57);
    __text(13);
    __elementEnd()();
  }
  if (rf & 2) {
    const column_r14 = ctx.$implicit;
    const sheet_r17 = __nextContext(2).$implicit;
    const ctx_r2 = __nextContext(2);
    __classProp("bg-danger-bg/40", column_r14.required && sheet_r17.mapping[column_r14.key] === null);
    __advance(3);
    __textInterpolate(column_r14.label);
    __advance();
    __conditional(column_r14.required ? 4 : -1);
    __advance();
    __conditional(column_r14.hint ? 5 : -1);
    __advance(2);
    __classProp("border-danger", column_r14.required && sheet_r17.mapping[column_r14.key] === null);
    __property("ngModel", ctx_r2.mapSelectValue(sheet_r17.mapping[column_r14.key]));
    __attribute("aria-label", ctx_r2.t()("imports.map.columnFor", __pureFunction1(12, _c0, column_r14.label)));
    __control();
    __advance();
    __property("value", ctx_r2.NONE);
    __advance();
    __textInterpolate(ctx_r2.t()("imports.map.notProvided"));
    __advance();
    __repeater(sheet_r17.headers);
    __advance(3);
    __textInterpolate1(" ", ctx_r2.previewCells(sheet_r17, column_r14.key), " ");
  }
}
function ImportsPage_Conditional_16_For_12_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 45)(1, "table", 46)(2, "thead", 47)(3, "tr")(4, "th", 48);
    __text(5);
    __elementEnd();
    __elementStart(6, "th", 28);
    __text(7);
    __elementEnd();
    __elementStart(8, "th", 28);
    __text(9);
    __elementEnd()()();
    __elementStart(10, "tbody", 49);
    __repeaterCreate(11, ImportsPage_Conditional_16_For_12_Conditional_11_For_12_Template, 14, 14, "tr", 50, _forTrack1);
    __elementEnd()()();
  }
  if (rf & 2) {
    const sheet_r17 = __nextContext().$implicit;
    const ctx_r2 = __nextContext(2);
    __advance(5);
    __textInterpolate(ctx_r2.t()("imports.map.expected"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("imports.map.column"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("imports.map.preview"));
    __advance(2);
    __repeater(ctx_r2.SCHEMA[ctx_r2.asEntity(sheet_r17.entityChoice)].columns);
  }
}
function ImportsPage_Conditional_16_For_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = __getCurrentView();
    __elementStart(0, "div", 36)(1, "div", 41)(2, "h2", 28);
    __text(3);
    __elementEnd();
    __elementStart(4, "span", 42);
    __text(5);
    __elementEnd();
    __elementStart(6, "select", 43);
    __controlCreate();
    __listener("ngModelChange", function ImportsPage_Conditional_16_For_12_Template_select_ngModelChange_6_listener($event) {
      const \u0275$index_87_r11 = __restoreView(_r10).$index;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.onEntityChoice(\u0275$index_87_r11, $event));
    });
    __elementStart(7, "option", 44);
    __text(8);
    __elementEnd();
    __repeaterCreate(9, ImportsPage_Conditional_16_For_12_For_10_Template, 2, 4, "option", 44, __repeaterTrackByIdentity);
    __elementEnd()();
    __conditionalCreate(11, ImportsPage_Conditional_16_For_12_Conditional_11_Template, 13, 3, "div", 45);
    __elementEnd();
  }
  if (rf & 2) {
    const sheet_r17 = ctx.$implicit;
    const ctx_r2 = __nextContext(2);
    __advance(3);
    __textInterpolate1(" ", ctx_r2.t()("imports.sheet.title", __pureFunction1(7, _c3, sheet_r17.name)), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("imports.rows.autre", __pureFunction2(9, _c4, sheet_r17.rows.length, ctx_r2.nf.format(sheet_r17.rows.length))), " ");
    __advance();
    __property("ngModel", sheet_r17.entityChoice);
    __attribute("aria-label", ctx_r2.t()("imports.sheet.contentAria", __pureFunction1(12, _c3, sheet_r17.name)));
    __control();
    __advance();
    __property("value", ctx_r2.IGNORE);
    __advance();
    __textInterpolate(ctx_r2.t()("imports.sheet.ignore"));
    __advance();
    __repeater(ctx_r2.entityOrder);
    __advance(2);
    __conditional(sheet_r17.entityChoice !== ctx_r2.IGNORE ? 11 : -1);
  }
}
function ImportsPage_Conditional_16_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 37);
    __element(1, "lucide-angular", 40);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance();
    __property("img", ctx_r2.icons.x);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("imports.map.missing", __pureFunction1(2, _c6, ctx_r2.missing().join(", "))), " ");
  }
}
function ImportsPage_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = __getCurrentView();
    __elementStart(0, "section", 13)(1, "div", 31);
    __element(2, "lucide-angular", 32);
    __elementStart(3, "span", 28);
    __text(4);
    __elementEnd();
    __elementStart(5, "span", 33);
    __text(6);
    __elementEnd();
    __elementStart(7, "ui-button", 34);
    __listener("click", function ImportsPage_Conditional_16_Template_ui_button_click_7_listener() {
      __restoreView(_r8);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.reset());
    });
    __element(8, "lucide-angular", 5);
    __text(9);
    __elementEnd()();
    __conditionalCreate(10, ImportsPage_Conditional_16_Conditional_10_Template, 3, 5, "p", 35);
    __repeaterCreate(11, ImportsPage_Conditional_16_For_12_Template, 12, 14, "div", 36, _forTrack0);
    __conditionalCreate(13, ImportsPage_Conditional_16_Conditional_13_Template, 3, 4, "p", 37);
    __elementStart(14, "div", 38)(15, "ui-button", 39);
    __listener("click", function ImportsPage_Conditional_16_Template_ui_button_click_15_listener() {
      __restoreView(_r8);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.runDry());
    });
    __element(16, "lucide-angular", 5);
    __text(17);
    __elementEnd();
    __elementStart(18, "ui-button", 4);
    __listener("click", function ImportsPage_Conditional_16_Template_ui_button_click_18_listener() {
      __restoreView(_r8);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.reset());
    });
    __text(19);
    __elementEnd()()();
  }
  if (rf & 2) {
    let tmp_7_0;
    const L_r18 = ctx;
    const ctx_r2 = __nextContext();
    __advance(2);
    __property("img", ctx_r2.icons.sheet);
    __advance(2);
    __textInterpolate(L_r18.file);
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("imports.hash", __pureFunction1(11, _c1, L_r18.hash)), " ");
    __advance(2);
    __property("img", ctx_r2.icons.reset);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("imports.changeFile"), " ");
    __advance();
    __conditional((tmp_7_0 = ctx_r2.sameAsImported()) ? 10 : -1, tmp_7_0);
    __advance();
    __repeater(L_r18.sheets);
    __advance(2);
    __conditional(ctx_r2.missing().length ? 13 : -1);
    __advance(2);
    __property("disabled", !ctx_r2.active().length || ctx_r2.missing().length > 0);
    __advance();
    __property("img", ctx_r2.icons.flask);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("imports.map.runDry"), " ");
    __advance(2);
    __textInterpolate(ctx_r2.t()("imports.abandon"));
  }
}
function ImportsPage_Conditional_17_For_30_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 53);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const sheet_r20 = __nextContext().$implicit;
    const ctx_r2 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r2.nf.format(sheet_r20.rejects));
  }
}
function ImportsPage_Conditional_17_For_30_Conditional_9_Template(rf, ctx) {
  if (rf & 1) __text(0, " 0 ");
}
function ImportsPage_Conditional_17_For_30_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "tr")(1, "td", 70);
    __text(2);
    __elementEnd();
    __elementStart(3, "td");
    __text(4);
    __elementEnd();
    __elementStart(5, "td", 71);
    __text(6);
    __elementEnd();
    __elementStart(7, "td", 72);
    __conditionalCreate(8, ImportsPage_Conditional_17_For_30_Conditional_8_Template, 2, 1, "span", 53)(9, ImportsPage_Conditional_17_For_30_Conditional_9_Template, 1, 0);
    __elementEnd()();
  }
  if (rf & 2) {
    const sheet_r20 = ctx.$implicit;
    const ctx_r2 = __nextContext(2);
    __advance(2);
    __textInterpolate(sheet_r20.name);
    __advance(2);
    __textInterpolate(ctx_r2.SCHEMA[sheet_r20.entity].label);
    __advance(2);
    __textInterpolate(ctx_r2.nf.format(sheet_r20.rows));
    __advance(2);
    __conditional(sheet_r20.rejects > 0 ? 8 : 9);
  }
}
function ImportsPage_Conditional_17_Conditional_31_For_25_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "tr")(1, "td", 83);
    __text(2);
    __elementEnd();
    __elementStart(3, "td", 84);
    __text(4);
    __elementEnd();
    __elementStart(5, "td");
    __text(6);
    __elementEnd();
    __elementStart(7, "td", 85);
    __text(8);
    __elementEnd()();
  }
  if (rf & 2) {
    const issue_r22 = ctx.$implicit;
    __advance(2);
    __textInterpolate(issue_r22.sheet);
    __advance(2);
    __textInterpolate(issue_r22.row);
    __advance(2);
    __textInterpolate(issue_r22.field);
    __advance();
    __classProp("text-danger-fg", issue_r22.level === "rejet")("text-warning-fg", issue_r22.level !== "rejet");
    __advance();
    __textInterpolate1(" ", issue_r22.message, " ");
  }
}
function ImportsPage_Conditional_17_Conditional_31_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 81);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(3);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("imports.report.truncated"), " ");
  }
}
function ImportsPage_Conditional_17_Conditional_31_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 82);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(3);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("imports.report.nothing"), " ");
  }
}
function ImportsPage_Conditional_17_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = __getCurrentView();
    __elementStart(0, "div", 68)(1, "div", 73)(2, "button", 74);
    __listener("click", function ImportsPage_Conditional_17_Conditional_31_Template_button_click_2_listener() {
      __restoreView(_r21);
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.issueLevel.set("rejet"));
    });
    __text(3);
    __elementEnd();
    __elementStart(4, "button", 74);
    __listener("click", function ImportsPage_Conditional_17_Conditional_31_Template_button_click_4_listener() {
      __restoreView(_r21);
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.issueLevel.set("avertissement"));
    });
    __text(5);
    __elementEnd();
    __elementStart(6, "button", 74);
    __listener("click", function ImportsPage_Conditional_17_Conditional_31_Template_button_click_6_listener() {
      __restoreView(_r21);
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.issueLevel.set("tous"));
    });
    __text(7);
    __elementEnd();
    __elementStart(8, "ui-button", 75);
    __listener("click", function ImportsPage_Conditional_17_Conditional_31_Template_ui_button_click_8_listener() {
      __restoreView(_r21);
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.downloadPlanIssues());
    });
    __element(9, "lucide-angular", 5);
    __text(10);
    __elementEnd()();
    __elementStart(11, "div", 76)(12, "table", 46)(13, "thead", 77)(14, "tr")(15, "th", 78);
    __text(16);
    __elementEnd();
    __elementStart(17, "th", 28);
    __text(18);
    __elementEnd();
    __elementStart(19, "th", 28);
    __text(20);
    __elementEnd();
    __elementStart(21, "th", 79);
    __text(22);
    __elementEnd()()();
    __elementStart(23, "tbody", 49);
    __repeaterCreate(24, ImportsPage_Conditional_17_Conditional_31_For_25_Template, 9, 8, "tr", null, __repeaterTrackByIndex);
    __elementEnd()();
    __element(26, "ui-pagination", 80);
    __conditionalCreate(27, ImportsPage_Conditional_17_Conditional_31_Conditional_27_Template, 2, 1, "p", 81);
    __conditionalCreate(28, ImportsPage_Conditional_17_Conditional_31_Conditional_28_Template, 2, 1, "p", 82);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance(2);
    __classProp("border-primary", ctx_r2.issueLevel() === "rejet")("bg-primary-soft", ctx_r2.issueLevel() === "rejet");
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("imports.level.rejects", __pureFunction1(24, _c8, ctx_r2.rejects().length)), " ");
    __advance();
    __classProp("border-primary", ctx_r2.issueLevel() === "avertissement")("bg-primary-soft", ctx_r2.issueLevel() === "avertissement");
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("imports.level.warnings", __pureFunction1(26, _c8, ctx_r2.warnings().length)), " ");
    __advance();
    __classProp("border-primary", ctx_r2.issueLevel() === "tous")("bg-primary-soft", ctx_r2.issueLevel() === "tous");
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("imports.level.all"), " ");
    __advance(2);
    __property("img", ctx_r2.icons.download);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("imports.report.download"), " ");
    __advance(6);
    __textInterpolate(ctx_r2.t()("imports.report.sheet"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("imports.report.row"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("imports.report.column"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("imports.report.reason"));
    __advance(2);
    __repeater(ctx_r2.issuesPager.items());
    __advance(2);
    __property("pager", ctx_r2.issuesPager);
    __advance();
    __conditional(ctx_r2.shownIssues().length > 500 ? 27 : -1);
    __advance();
    __conditional(!ctx_r2.shownIssues().length ? 28 : -1);
  }
}
function ImportsPage_Conditional_17_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 42);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("imports.report.blocked", __pureFunction1(1, _c9, ctx.id)), " ");
  }
}
function ImportsPage_Conditional_17_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 42);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r2.t()("imports.report.nothingToWrite"));
  }
}
function ImportsPage_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = __getCurrentView();
    __elementStart(0, "section", 13)(1, "div", 11);
    __element(2, "lucide-angular", 58);
    __elementStart(3, "h2", 28);
    __text(4);
    __elementEnd()();
    __elementStart(5, "p", 42);
    __text(6);
    __elementEnd();
    __elementStart(7, "div", 59);
    __element(8, "ui-kpi-tile", 60)(9, "ui-kpi-tile", 60)(10, "ui-kpi-tile", 60)(11, "ui-kpi-tile", 61)(12, "ui-kpi-tile", 62)(13, "ui-kpi-tile", 62)(14, "ui-kpi-tile", 60)(15, "ui-kpi-tile", 63);
    __elementEnd();
    __elementStart(16, "div", 19)(17, "table", 46)(18, "thead", 64)(19, "tr")(20, "th", 65);
    __text(21);
    __elementEnd();
    __elementStart(22, "th", 28);
    __text(23);
    __elementEnd();
    __elementStart(24, "th", 66);
    __text(25);
    __elementEnd();
    __elementStart(26, "th", 67);
    __text(27);
    __elementEnd()()();
    __elementStart(28, "tbody", 49);
    __repeaterCreate(29, ImportsPage_Conditional_17_For_30_Template, 10, 4, "tr", null, _forTrack0);
    __elementEnd()()();
    __conditionalCreate(31, ImportsPage_Conditional_17_Conditional_31_Template, 29, 28, "div", 68);
    __elementStart(32, "div", 38)(33, "ui-button", 39);
    __listener("click", function ImportsPage_Conditional_17_Template_ui_button_click_33_listener() {
      __restoreView(_r19);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.confirm());
    });
    __element(34, "lucide-angular", 5);
    __text(35);
    __elementEnd();
    __elementStart(36, "ui-button", 4);
    __listener("click", function ImportsPage_Conditional_17_Template_ui_button_click_36_listener() {
      __restoreView(_r19);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.step.set("colonnes"));
    });
    __text(37);
    __elementEnd();
    __elementStart(38, "ui-button", 69);
    __listener("click", function ImportsPage_Conditional_17_Template_ui_button_click_38_listener() {
      __restoreView(_r19);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.reset());
    });
    __text(39);
    __elementEnd()();
    __conditionalCreate(40, ImportsPage_Conditional_17_Conditional_40_Template, 2, 3, "p", 42);
    __conditionalCreate(41, ImportsPage_Conditional_17_Conditional_41_Template, 2, 1, "p", 42);
    __elementEnd();
  }
  if (rf & 2) {
    let tmp_38_0;
    const report_r23 = ctx;
    const ctx_r2 = __nextContext();
    __advance(2);
    __property("img", ctx_r2.icons.flask);
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("imports.report.title", __pureFunction1(37, _c7, ctx_r2.loaded().file)), " ");
    __advance(2);
    __textInterpolate(ctx_r2.t()("imports.report.intro"));
    __advance(2);
    __property("label", ctx_r2.t()("imports.kpi.newOrgs"))("value", ctx_r2.nf.format(report_r23.orgs.length));
    __advance();
    __property("label", ctx_r2.t()("imports.kpi.producers"))("value", ctx_r2.nf.format(report_r23.producers.length));
    __advance();
    __property("label", ctx_r2.t()("imports.kpi.plots"))("value", ctx_r2.nf.format(report_r23.plots.length));
    __advance();
    __property("label", ctx_r2.t()("imports.kpi.skipped"))("value", ctx_r2.nf.format(report_r23.skipped.length))("sub", ctx_r2.t()("imports.kpi.skippedSub"));
    __advance();
    __property("label", ctx_r2.t()("imports.kpi.rejectedRows"))("value", ctx_r2.nf.format(ctx_r2.rejectedRows()))("tone", ctx_r2.rejectedRows() ? "danger" : "neutral")("sub", ctx_r2.t()("imports.kpi.reasons.autre", __pureFunction2(39, _c4, ctx_r2.rejects().length, ctx_r2.nf.format(ctx_r2.rejects().length))));
    __advance();
    __property("label", ctx_r2.t()("imports.kpi.warnings"))("value", ctx_r2.nf.format(ctx_r2.warnings().length))("tone", ctx_r2.warnings().length ? "warning" : "neutral")("sub", ctx_r2.t()("imports.kpi.warningsSub"));
    __advance();
    __property("label", ctx_r2.t()("imports.kpi.alerts"))("value", ctx_r2.nf.format(report_r23.alerts.length));
    __advance();
    __property("label", ctx_r2.t()("imports.kpi.duplicates"))("value", ctx_r2.nf.format(report_r23.cases.length))("tone", report_r23.cases.length ? "warning" : "neutral");
    __advance(6);
    __textInterpolate(ctx_r2.t()("imports.report.sheet"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("imports.report.content"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("imports.report.rowsRead"));
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("imports.kpi.rejectedRows"), " ");
    __advance(2);
    __repeater(report_r23.sheets);
    __advance(2);
    __conditional(report_r23.issues.length ? 31 : -1);
    __advance(2);
    __property("disabled", !ctx_r2.writes() || !!ctx_r2.sameAsImported());
    __advance();
    __property("img", ctx_r2.icons.check);
    __advance();
    __textInterpolate1(" ", ctx_r2.writes() === 1 ? ctx_r2.t()("imports.report.confirm.un", __pureFunction1(42, _c5, ctx_r2.nf.format(ctx_r2.writes()))) : ctx_r2.t()("imports.report.confirm.autre", __pureFunction1(44, _c5, ctx_r2.nf.format(ctx_r2.writes()))), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("imports.report.back"), " ");
    __advance(2);
    __textInterpolate(ctx_r2.t()("imports.abandon"));
    __advance();
    __conditional((tmp_38_0 = ctx_r2.sameAsImported()) ? 40 : -1, tmp_38_0);
    __advance();
    __conditional(!ctx_r2.writes() && !ctx_r2.sameAsImported() ? 41 : -1);
  }
}
function ImportsPage_Conditional_18_Conditional_0_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 92);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(3);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("imports.done.duplicates"), " ");
  }
}
function ImportsPage_Conditional_18_Conditional_0_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 93);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(3);
    __property("queryParams", __pureFunction0(2, _c11));
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("imports.done.qualify"), " ");
  }
}
function ImportsPage_Conditional_18_Conditional_0_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 94);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const importPlan_r25 = __nextContext();
    const ctx_r2 = __nextContext(2);
    __property("queryParams", __pureFunction0(2, _c12));
    __advance();
    __textInterpolate1(" ", importPlan_r25.unknownCrops.length === 1 ? ctx_r2.t()("imports.done.crops.un", __pureFunction1(3, _c5, ctx_r2.nf.format(importPlan_r25.unknownCrops.length))) : ctx_r2.t()("imports.done.crops.autre", __pureFunction1(5, _c5, ctx_r2.nf.format(importPlan_r25.unknownCrops.length))), " ");
  }
}
function ImportsPage_Conditional_18_Conditional_0_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    __text(0);
    __elementStart(1, "a", 97);
    __text(2);
    __elementEnd();
    __text(3);
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(3);
    __textInterpolate1(" ", ctx_r2.t()("imports.done.backupBefore"), " ");
    __advance(2);
    __textInterpolate(ctx_r2.t()("imports.done.backupLink"));
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("imports.done.backupAfter"), " ");
  }
}
function ImportsPage_Conditional_18_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = __getCurrentView();
    __elementStart(0, "section", 86)(1, "div", 11);
    __element(2, "lucide-angular", 87);
    __elementStart(3, "h2", 88);
    __text(4);
    __elementEnd()();
    __elementStart(5, "p", 89);
    __text(6);
    __elementEnd();
    __elementStart(7, "div", 90)(8, "a", 91);
    __text(9);
    __elementEnd();
    __conditionalCreate(10, ImportsPage_Conditional_18_Conditional_0_Conditional_10_Template, 2, 1, "a", 92);
    __conditionalCreate(11, ImportsPage_Conditional_18_Conditional_0_Conditional_11_Template, 2, 3, "a", 93);
    __conditionalCreate(12, ImportsPage_Conditional_18_Conditional_0_Conditional_12_Template, 2, 7, "a", 94);
    __elementStart(13, "ui-button", 95);
    __listener("click", function ImportsPage_Conditional_18_Conditional_0_Template_ui_button_click_13_listener() {
      __restoreView(_r24);
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.reset());
    });
    __element(14, "lucide-angular", 5);
    __text(15);
    __elementEnd()();
    __elementStart(16, "p", 96);
    __element(17, "lucide-angular", 40);
    __elementStart(18, "span");
    __text(19);
    __conditionalCreate(20, ImportsPage_Conditional_18_Conditional_0_Conditional_20_Template, 4, 3);
    __elementEnd()()();
  }
  if (rf & 2) {
    const importPlan_r25 = ctx;
    const result_r26 = __nextContext();
    const ctx_r2 = __nextContext();
    __advance(2);
    __property("img", ctx_r2.icons.check);
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("imports.done.title", __pureFunction1(12, _c9, result_r26.id)), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("imports.done.summary", __pureFunction5(14, _c10, ctx_r2.nf.format(importPlan_r25.producers.length), ctx_r2.nf.format(importPlan_r25.plots.length), ctx_r2.nf.format(importPlan_r25.orgs.length), ctx_r2.nf.format(importPlan_r25.alerts.length), ctx_r2.nf.format(importPlan_r25.cases.length))), " ");
    __advance(3);
    __textInterpolate1(" ", ctx_r2.t()("imports.done.directory"), " ");
    __advance();
    __conditional(importPlan_r25.cases.length > 0 && ctx_r2.store.can("quality.review") ? 10 : -1);
    __advance();
    __conditional(ctx_r2.hasUnqualifiedOrgs() && ctx_r2.store.can("org.manage") ? 11 : -1);
    __advance();
    __conditional(importPlan_r25.unknownCrops.length > 0 && ctx_r2.store.can("config.manage") ? 12 : -1);
    __advance(2);
    __property("img", ctx_r2.icons.upload);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("imports.done.again"), " ");
    __advance(2);
    __property("img", ctx_r2.icons.warn);
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("imports.done.demo"), " ");
    __advance();
    __conditional(ctx_r2.store.can("data.backup") ? 20 : -1);
  }
}
function ImportsPage_Conditional_18_Template(rf, ctx) {
  if (rf & 1) __conditionalCreate(0, ImportsPage_Conditional_18_Conditional_0_Template, 21, 20, "section", 86);
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r2 = __nextContext();
    __conditional((tmp_2_0 = ctx_r2.plan()) ? 0 : -1, tmp_2_0);
  }
}
function ImportsPage_Conditional_26_For_20_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "ui-pill", 104);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const batch_r28 = __nextContext().$implicit;
    const ctx_r2 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r2.locale.tEnum("imports.mode", batch_r28.mode));
  }
}
function ImportsPage_Conditional_26_For_20_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "ui-pill", 105);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const batch_r28 = __nextContext().$implicit;
    const ctx_r2 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r2.locale.tEnum("imports.mode", batch_r28.mode));
  }
}
function ImportsPage_Conditional_26_For_20_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = __getCurrentView();
    __elementStart(0, "ui-button", 108);
    __listener("click", function ImportsPage_Conditional_26_For_20_Conditional_19_Template_ui_button_click_0_listener() {
      __restoreView(_r29);
      const batch_r28 = __nextContext().$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.downloadBatchReport(batch_r28.id));
    });
    __element(1, "lucide-angular", 5);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(3);
    __advance();
    __property("img", ctx_r2.icons.download);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("imports.report.download"), " ");
  }
}
function ImportsPage_Conditional_26_For_20_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 109);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const batch_r28 = __nextContext().$implicit;
    const ctx_r2 = __nextContext(2);
    __property("queryParams", __pureFunction1(2, _c13, batch_r28.id));
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("imports.history.viewJournal"), " ");
  }
}
function ImportsPage_Conditional_26_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = __getCurrentView();
    __elementStart(0, "tr")(1, "td", 100);
    __text(2);
    __elementEnd();
    __elementStart(3, "td");
    __text(4);
    __elementEnd();
    __elementStart(5, "td", 101);
    __text(6);
    __elementEnd();
    __elementStart(7, "td", 102);
    __text(8);
    __elementEnd();
    __elementStart(9, "td", 103);
    __text(10);
    __elementEnd();
    __elementStart(11, "td");
    __conditionalCreate(12, ImportsPage_Conditional_26_For_20_Conditional_12_Template, 2, 1, "ui-pill", 104)(13, ImportsPage_Conditional_26_For_20_Conditional_13_Template, 2, 1, "ui-pill", 105);
    __elementEnd();
    __elementStart(14, "td", 71);
    __text(15);
    __elementStart(16, "span");
    __text(17);
    __elementEnd()();
    __elementStart(18, "td", 106);
    __conditionalCreate(19, ImportsPage_Conditional_26_For_20_Conditional_19_Template, 3, 2, "ui-button", 107);
    __elementStart(20, "ui-button", 108);
    __listener("click", function ImportsPage_Conditional_26_For_20_Template_ui_button_click_20_listener() {
      const batch_r28 = __restoreView(_r27).$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.downloadSheetsCsv(batch_r28));
    });
    __element(21, "lucide-angular", 5);
    __text(22);
    __elementEnd();
    __conditionalCreate(23, ImportsPage_Conditional_26_For_20_Conditional_23_Template, 2, 4, "a", 109);
    __elementEnd()();
  }
  if (rf & 2) {
    const batch_r28 = ctx.$implicit;
    const ctx_r2 = __nextContext(2);
    __advance(2);
    __textInterpolate(batch_r28.id);
    __advance(2);
    __textInterpolate(batch_r28.file);
    __advance(2);
    __textInterpolate(batch_r28.hash);
    __advance(2);
    __textInterpolate(ctx_r2.fmtDateTime(batch_r28.at));
    __advance(2);
    __textInterpolate(batch_r28.script);
    __advance(2);
    __conditional(batch_r28.mode === "r\xE9el" ? 12 : 13);
    __advance(3);
    __textInterpolate2(" ", ctx_r2.nf.format(batch_r28.counts.producers), " \xB7 ", ctx_r2.nf.format(batch_r28.counts.plots), " \xB7 ");
    __advance();
    __classProp("text-danger-fg", batch_r28.counts.rejects > 0);
    __advance();
    __textInterpolate(ctx_r2.nf.format(batch_r28.counts.rejects));
    __advance(2);
    __conditional(ctx_r2.hasStoredReport(batch_r28.id) ? 19 : -1);
    __advance(2);
    __property("img", ctx_r2.icons.sheet);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("imports.history.sheetsCsv"), " ");
    __advance();
    __conditional(ctx_r2.canAudit() ? 23 : -1);
  }
}
function ImportsPage_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "table", 46)(1, "thead", 64)(2, "tr")(3, "th", 98);
    __text(4);
    __elementEnd();
    __elementStart(5, "th", 28);
    __text(6);
    __elementEnd();
    __elementStart(7, "th", 99);
    __text(8);
    __elementEnd();
    __elementStart(9, "th", 28);
    __text(10);
    __elementEnd();
    __elementStart(11, "th", 99);
    __text(12);
    __elementEnd();
    __elementStart(13, "th", 28);
    __text(14);
    __elementEnd();
    __elementStart(15, "th", 66);
    __text(16);
    __elementEnd();
    __element(17, "th", 67);
    __elementEnd()();
    __elementStart(18, "tbody", 49);
    __repeaterCreate(19, ImportsPage_Conditional_26_For_20_Template, 24, 15, "tr", null, _forTrack2);
    __elementEnd()();
    __element(21, "ui-pagination", 80);
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance(4);
    __textInterpolate(ctx_r2.t()("imports.history.batch"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("imports.history.file"));
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("imports.history.hash"), " ");
    __advance(2);
    __textInterpolate(ctx_r2.t()("imports.history.date"));
    __advance(2);
    __textInterpolate1(" ", ctx_r2.t()("imports.history.script"), " ");
    __advance(2);
    __textInterpolate(ctx_r2.t()("imports.history.mode"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("imports.history.counts"));
    __advance(3);
    __repeater(ctx_r2.batchPager.items());
    __advance(2);
    __property("pager", ctx_r2.batchPager);
  }
}
function ImportsPage_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 20);
    __element(1, "lucide-angular", 110);
    __elementStart(2, "div", 111);
    __text(3);
    __elementEnd();
    __elementStart(4, "p", 112);
    __text(5);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance();
    __property("img", ctx_r2.icons.upload);
    __advance(2);
    __textInterpolate(ctx_r2.t()("imports.history.empty"));
    __advance(2);
    __textInterpolate(ctx_r2.t()("imports.history.emptyHint"));
  }
}
var SCRIPT = "import-web-1.0";
var IGNORE = "__ignore";
var NONE = "__none";
var ENTITY_ORDER_ARR = [...ENTITY_ORDER];
var STEPS = [
  "depot",
  "colonnes",
  "rapport",
  "termine"
];
var ImportsPage = (_a = class {
  constructor() {
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.platformId = inject(PLATFORM_ID);
    this.host = inject(ElementRef);
    this.t = this.locale.t;
    this.fmtDateTime = fmtDateTime;
    this.nf = nf;
    this.cn = cn;
    this.SCHEMA = SCHEMA;
    this.entityOrder = ENTITY_ORDER_ARR;
    this.STEPS = STEPS;
    this.IGNORE = IGNORE;
    this.NONE = NONE;
    this.icons = {
      sheet: FileSpreadsheet,
      download: Download,
      upload: Upload,
      info: Info,
      loader: LoaderCircle,
      reset: RotateCcw,
      flask: FlaskConical,
      x: CircleX,
      check: CircleCheck,
      warn: TriangleAlert
    };
    this.csvOpen = signal(false, ...[]);
    this.historyQ = signal("", ...[]);
    this.step = signal("depot", ...[]);
    this.loaded = signal(null, ...[]);
    this.plan = signal(null, ...[]);
    this.done = signal(null, ...[]);
    this.busy = signal(false, ...[]);
    this.drag = signal(false, ...[]);
    this.flash = signal("", ...[]);
    this.issueLevel = signal("rejet", ...[]);
    this.sessionReports = /* @__PURE__ */ new Map();
    this.batches = computed(() => this.store.state().imports, ...[]);
    this.filteredBatches = computed(() => {
      const n = this.historyQ().trim().toLowerCase();
      return this.batches().filter((b) => !n || b.id.toLowerCase().includes(n) || b.file.toLowerCase().includes(n) || b.hash.toLowerCase().includes(n));
    }, ...[]);
    this.stepIdx = computed(() => STEPS.indexOf(this.step()), ...[]);
    this.sameAsImported = computed(() => {
      const L = this.loaded();
      if (!L) return void 0;
      return this.batches().find((b) => b.hash === L.hash && b.mode === "r\xE9el");
    }, ...[]);
    this.active = computed(() => {
      var _a2, _b;
      return ((_b = (_a2 = this.loaded()) == null ? void 0 : _a2.sheets) != null ? _b : []).filter((s) => s.entityChoice !== IGNORE);
    }, ...[]);
    this.missing = computed(() => this.active().flatMap((s) => SCHEMA[s.entityChoice].columns.filter((c) => c.required && s.mapping[c.key] === null).map((c) => `${s.name} \u203A ${c.label}`)), ...[]);
    this.rejects = computed(() => {
      var _a2, _b;
      return (_b = (_a2 = this.plan()) == null ? void 0 : _a2.issues.filter((i) => i.level === "rejet")) != null ? _b : [];
    }, ...[]);
    this.warnings = computed(() => {
      var _a2, _b;
      return (_b = (_a2 = this.plan()) == null ? void 0 : _a2.issues.filter((i) => i.level === "avertissement")) != null ? _b : [];
    }, ...[]);
    this.shownIssues = computed(() => {
      var _a2, _b;
      const level = this.issueLevel();
      const issues = (_b = (_a2 = this.plan()) == null ? void 0 : _a2.issues) != null ? _b : [];
      return level === "tous" ? issues : issues.filter((i) => i.level === level);
    }, ...[]);
    this.rejectedRows = computed(() => {
      var _a2, _b;
      return (_b = (_a2 = this.plan()) == null ? void 0 : _a2.sheets.reduce((n, s) => n + s.rejects, 0)) != null ? _b : 0;
    }, ...[]);
    this.writes = computed(() => {
      const p = this.plan();
      if (!p) return 0;
      return p.producers.length + p.plots.length + p.orgs.length;
    }, ...[]);
    this.issuesPager = createPager(() => this.shownIssues());
    this.batchPager = createPager(() => this.filteredBatches());
  }
  asEntity(v) {
    return v;
  }
  entityLabel(e) {
    return SCHEMA[e].label;
  }
  mapSelectValue(idx) {
    return idx === null || idx === void 0 ? NONE : String(idx);
  }
  previewCells(s, key) {
    const idx = s.mapping[key];
    if (idx === null || idx === void 0) return this.t()("imports.map.empty");
    return s.rows.slice(0, 3).map((r) => r[idx] || "\u2205").join(" \xB7 ");
  }
  hasUnqualifiedOrgs() {
    var _a2;
    return !!((_a2 = this.plan()) == null ? void 0 : _a2.orgs.some((o) => !o.type));
  }
  canAudit() {
    return can(getState().session, "audit.read");
  }
  hasStoredReport(id) {
    return this.sessionReports.has(id);
  }
  onDocumentClick(ev) {
    var _a2;
    if (!this.csvOpen()) return;
    if ((_a2 = this.host.nativeElement.querySelector("[data-csv-menu]")) == null ? void 0 : _a2.contains(ev.target)) return;
    this.csvOpen.set(false);
  }
  toggleCsvMenu(ev) {
    ev.stopPropagation();
    this.csvOpen.update((v) => !v);
  }
  nextId() {
    return `L-${String(getState().imports.length + 1).padStart(3, "0")}`;
  }
  colIdxStr(k) {
    return String(k);
  }
  reset() {
    this.step.set("depot");
    this.loaded.set(null);
    this.plan.set(null);
    this.done.set(null);
    this.flash.set("");
  }
  onDragOver(ev) {
    ev.preventDefault();
    this.drag.set(true);
  }
  onDrop(ev) {
    var _a2, _b;
    ev.preventDefault();
    this.drag.set(false);
    this.onFile((_b = (_a2 = ev.dataTransfer) == null ? void 0 : _a2.files) == null ? void 0 : _b[0]);
  }
  onFileInput(ev) {
    var _a2;
    const input = ev.target;
    this.onFile((_a2 = input.files) == null ? void 0 : _a2[0]);
    input.value = "";
  }
  async onFile(f) {
    if (!isPlatformBrowser(this.platformId) || !f) return;
    if (!/\.(xlsx|xls|csv|txt)$/i.test(f.name)) {
      this.flash.set(`${this.t()("imports.error.format")} \u2014 ${this.t()("imports.error.formatHint")}`);
      return;
    }
    this.busy.set(true);
    this.flash.set("");
    try {
      const [raw, hash] = await Promise.all([readFile(f), sha(f)]);
      const sheets = raw.map((r) => {
        var _a2;
        const [head = [], ...rows] = r.rows;
        const headersRow = head.map((h) => h.trim());
        const entity = (_a2 = detectEntity(r.name, headersRow)) != null ? _a2 : raw.length === 1 ? "producteurs" : null;
        const ent = entity != null ? entity : "producteurs";
        return {
          name: r.name,
          headers: headersRow,
          rows,
          entity: ent,
          entityChoice: entity && r.name !== "Lisez-moi" ? entity : IGNORE,
          mapping: autoMap(ent, headersRow)
        };
      });
      if (!sheets.length) throw new Error(this.t()("imports.error.noSheet"));
      this.loaded.set({
        file: f.name,
        hash,
        sheets
      });
      this.step.set("colonnes");
    } catch (e) {
      this.flash.set(`${this.t()("imports.error.read")} \u2014 ${e instanceof Error ? e.message : this.t()("imports.error.unreadable")}`);
    } finally {
      this.busy.set(false);
    }
  }
  onEntityChoice(i, v) {
    this.loaded.update((L) => {
      if (!L) return L;
      const sheets = L.sheets.map((s, k) => {
        if (k !== i) return s;
        if (v === IGNORE) return {
          ...s,
          entityChoice: IGNORE
        };
        const entity = v;
        return {
          ...s,
          entityChoice: entity,
          entity,
          mapping: autoMap(entity, s.headers)
        };
      });
      return {
        ...L,
        sheets
      };
    });
  }
  onMapping(i, key, v) {
    this.loaded.update((L) => {
      if (!L) return L;
      const sheets = L.sheets.map((s, k) => k !== i ? s : {
        ...s,
        mapping: {
          ...s.mapping,
          [key]: v === NONE ? null : Number(v)
        }
      });
      return {
        ...L,
        sheets
      };
    });
  }
  runDry() {
    const L = this.loaded();
    if (!L) return;
    const st = getState();
    const id = this.nextId();
    const p = buildPlan(this.active().map((s) => ({
      ...s,
      entity: s.entityChoice
    })), {
      producers: st.producers,
      orgs: st.orgs,
      plots: st.plots,
      cropRefs: st.cropRefs,
      seuils: st.seuils
    }, {
      batchId: id,
      now: (/* @__PURE__ */ new Date()).toISOString()
    });
    this.store.actions.addImport({
      id,
      file: L.file,
      hash: L.hash,
      at: (/* @__PURE__ */ new Date()).toISOString(),
      script: SCRIPT,
      mode: "\xE0 blanc",
      counts: planCounts(p),
      sheets: p.sheets.map(({ name, rows, rejects }) => ({
        name,
        rows,
        rejects
      }))
    });
    this.sessionReports.set(id, p.issues);
    this.plan.set(p);
    this.issueLevel.set("rejet");
    this.step.set("rapport");
  }
  confirm() {
    const L = this.loaded();
    if (!L) return;
    const st = getState();
    const id = this.nextId();
    const p = buildPlan(this.active().map((s) => ({
      ...s,
      entity: s.entityChoice
    })), {
      producers: st.producers,
      orgs: st.orgs,
      plots: st.plots,
      cropRefs: st.cropRefs,
      seuils: st.seuils
    }, {
      batchId: id,
      now: (/* @__PURE__ */ new Date()).toISOString()
    });
    const batch = {
      id,
      file: L.file,
      hash: L.hash,
      at: (/* @__PURE__ */ new Date()).toISOString(),
      script: SCRIPT,
      mode: "r\xE9el",
      counts: planCounts(p),
      sheets: p.sheets.map(({ name, rows, rejects }) => ({
        name,
        rows,
        rejects
      }))
    };
    this.store.actions.ingestImport(p, batch);
    this.sessionReports.set(id, p.issues);
    this.plan.set(p);
    this.done.set(batch);
    this.step.set("termine");
    this.flash.set(`${this.t()("imports.toast.done")} \u2014 ${this.t()("imports.toast.added", {
      producers: nf.format(p.producers.length),
      plots: nf.format(p.plots.length)
    })}`);
  }
  downloadPlanIssues() {
    const L = this.loaded();
    const p = this.plan();
    if (!L || !p) return;
    this.downloadIssues(p.issues, `rapport_import_a_blanc_${L.file.replace(/\.[^.]+$/, "")}.csv`);
  }
  downloadBatchReport(id) {
    var _a2;
    this.downloadIssues((_a2 = this.sessionReports.get(id)) != null ? _a2 : [], `rapport_${id}.csv`);
  }
  downloadIssues(issues, name) {
    downloadCsv(name, [[
      "Feuille",
      "Ligne",
      "Colonne",
      "Niveau",
      "Motif"
    ], ...issues.map((i) => [
      i.sheet,
      i.row,
      i.field,
      i.level,
      i.message
    ])]);
  }
  async downloadExcelTemplate() {
    if (!isPlatformBrowser(this.platformId)) return;
    await downloadWorkbook("modele_import_mbay_diaay.xlsx", templateSheets());
    this.store.actions.audit("T\xE9l\xE9chargement", "Mod\xE8le d'import", "Excel");
  }
  downloadEntityCsv(e) {
    downloadCsv(`modele_${e}.csv`, [headers(e), SCHEMA[e].columns.map((c) => c.example)]);
  }
  downloadSheetsCsv(b) {
    downloadCsv(`feuilles_${b.id}.csv`, [[
      "Feuille",
      "Lignes lues",
      "Lignes rejet\xE9es"
    ], ...b.sheets.map((s) => [
      s.name,
      s.rows,
      s.rejects
    ])]);
  }
}, _a.\u0275fac = function ImportsPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-imports-page"]],
  hostBindings: function ImportsPage_HostBindings(rf, ctx) {
    if (rf & 1) __listener("click", function ImportsPage_click_HostBindingHandler($event) {
      return ctx.onDocumentClick($event);
    }, __resolveDocument);
  },
  decls: 28,
  vars: 22,
  consts: [
    ["fileInput", ""],
    [
      "perm",
      "import.manage",
      3,
      "area"
    ],
    [
      3,
      "eyebrow",
      "title",
      "description"
    ],
    [
      "actions",
      "",
      1,
      "flex",
      "flex-wrap",
      "gap-2"
    ],
    [
      "variant",
      "outline",
      3,
      "click"
    ],
    [
      1,
      "size-4",
      3,
      "img"
    ],
    [
      "data-csv-menu",
      "",
      1,
      "relative",
      "inline-block"
    ],
    [
      "variant",
      "outline",
      "type",
      "button",
      3,
      "click"
    ],
    [
      "data-csv-menu",
      "",
      1,
      "absolute",
      "right-0",
      "z-10",
      "mt-1",
      "min-w-56",
      "rounded-md",
      "border",
      "bg-popover",
      "p-2",
      "text-sm",
      "shadow-md"
    ],
    [
      1,
      "mb-3",
      "rounded-md",
      "border",
      "border-border",
      "bg-muted/50",
      "px-3",
      "py-2",
      "text-sm"
    ],
    [
      1,
      "mb-5",
      "flex",
      "flex-wrap",
      "items-center",
      "gap-2",
      "text-sm"
    ],
    [
      1,
      "flex",
      "items-center",
      "gap-2"
    ],
    [
      1,
      "surface",
      "bg-dots",
      "flex",
      "cursor-pointer",
      "flex-col",
      "items-center",
      "gap-2",
      "border-dashed",
      "p-10",
      "text-center",
      "hover:border-primary",
      3,
      "border-primary",
      "bg-primary-soft"
    ],
    [1, "space-y-4"],
    [
      1,
      "surface",
      "mb-3",
      "p-3"
    ],
    [1, "relative"],
    [
      1,
      "pointer-events-none",
      "absolute",
      "left-3",
      "top-1/2",
      "size-4",
      "-translate-y-1/2",
      "text-muted-foreground",
      3,
      "img"
    ],
    [
      1,
      "flex",
      "h-9",
      "w-full",
      "rounded-md",
      "border",
      "border-input",
      "bg-background",
      "pl-9",
      "pr-3",
      "text-sm",
      "shadow-sm",
      "focus-visible:outline-none",
      "focus-visible:ring-1",
      "focus-visible:ring-ring",
      3,
      "ngModelChange",
      "placeholder",
      "ngModel"
    ],
    [
      1,
      "mb-3",
      "mt-8",
      "font-semibold"
    ],
    [
      1,
      "surface",
      "overflow-x-auto"
    ],
    [
      1,
      "px-4",
      "py-10",
      "text-center",
      "text-muted-foreground"
    ],
    [
      "type",
      "button",
      1,
      "flex",
      "w-full",
      "items-center",
      "gap-2",
      "rounded",
      "px-2",
      "py-1.5",
      "text-left",
      "hover:bg-muted"
    ],
    [
      "type",
      "button",
      1,
      "flex",
      "w-full",
      "items-center",
      "gap-2",
      "rounded",
      "px-2",
      "py-1.5",
      "text-left",
      "hover:bg-muted",
      3,
      "click"
    ],
    [
      1,
      "grid",
      "size-6",
      "place-items-center",
      "rounded-full",
      "text-xs",
      "font-semibold"
    ],
    [
      1,
      "mx-1",
      "h-px",
      "w-6",
      "bg-border"
    ],
    [
      1,
      "surface",
      "bg-dots",
      "flex",
      "cursor-pointer",
      "flex-col",
      "items-center",
      "gap-2",
      "border-dashed",
      "p-10",
      "text-center",
      "hover:border-primary",
      3,
      "click",
      "dragover",
      "dragleave",
      "drop"
    ],
    [
      1,
      "size-6",
      "animate-spin",
      "text-primary",
      3,
      "img"
    ],
    [
      1,
      "size-6",
      "text-primary",
      3,
      "img"
    ],
    [1, "font-semibold"],
    [
      1,
      "max-w-lg",
      "text-sm",
      "text-muted-foreground"
    ],
    [
      "type",
      "file",
      "accept",
      ".xlsx,.xls,.csv,.txt",
      1,
      "sr-only",
      3,
      "click",
      "change"
    ],
    [
      1,
      "surface",
      "flex",
      "flex-wrap",
      "items-center",
      "gap-3",
      "p-4",
      "text-sm"
    ],
    [
      1,
      "size-5",
      "text-primary",
      3,
      "img"
    ],
    [
      1,
      "font-mono",
      "text-xs",
      "text-muted-foreground"
    ],
    [
      "variant",
      "ghost",
      "size",
      "sm",
      1,
      "ml-auto",
      3,
      "click"
    ],
    [
      1,
      "flex",
      "items-start",
      "gap-2",
      "rounded-md",
      "bg-info-bg",
      "p-3",
      "text-sm",
      "text-info-fg"
    ],
    [
      1,
      "surface",
      "p-4"
    ],
    [
      1,
      "flex",
      "items-start",
      "gap-2",
      "rounded-md",
      "bg-danger-bg",
      "p-3",
      "text-sm",
      "text-danger-fg"
    ],
    [
      1,
      "flex",
      "flex-wrap",
      "gap-2"
    ],
    [
      3,
      "click",
      "disabled"
    ],
    [
      1,
      "mt-0.5",
      "size-4",
      "shrink-0",
      3,
      "img"
    ],
    [
      1,
      "flex",
      "flex-wrap",
      "items-center",
      "gap-3"
    ],
    [
      1,
      "text-sm",
      "text-muted-foreground"
    ],
    [
      1,
      "ml-auto",
      "h-9",
      "w-56",
      "rounded-md",
      "border",
      "border-input",
      "bg-background",
      "px-3",
      "text-sm",
      3,
      "ngModelChange",
      "ngModel"
    ],
    [3, "value"],
    [
      1,
      "mt-3",
      "overflow-x-auto"
    ],
    [
      1,
      "w-full",
      "text-sm"
    ],
    [
      1,
      "border-b",
      "text-left",
      "text-xs",
      "text-muted-foreground"
    ],
    [
      1,
      "py-2",
      "font-semibold"
    ],
    [1, "divide-y"],
    [3, "bg-danger-bg/40"],
    [
      1,
      "py-2",
      "pr-3"
    ],
    [1, "font-medium"],
    [1, "text-danger-fg"],
    [
      1,
      "text-xs",
      "text-muted-foreground"
    ],
    [1, "pr-3"],
    [
      1,
      "h-9",
      "w-56",
      "rounded-md",
      "border",
      "border-input",
      "bg-background",
      "px-3",
      "text-sm",
      3,
      "ngModelChange",
      "ngModel"
    ],
    [
      1,
      "max-w-80",
      "truncate",
      "text-xs",
      "text-muted-foreground"
    ],
    [
      1,
      "size-5",
      "text-ochre",
      3,
      "img"
    ],
    [
      1,
      "grid",
      "grid-cols-2",
      "gap-3",
      "sm:grid-cols-4",
      "xl:grid-cols-8"
    ],
    [
      3,
      "label",
      "value"
    ],
    [
      3,
      "label",
      "value",
      "sub"
    ],
    [
      3,
      "label",
      "value",
      "tone",
      "sub"
    ],
    [
      3,
      "label",
      "value",
      "tone"
    ],
    [
      1,
      "border-b",
      "bg-muted",
      "text-left",
      "text-xs",
      "text-muted-foreground"
    ],
    [
      1,
      "px-4",
      "py-2.5",
      "font-semibold"
    ],
    [
      1,
      "text-right",
      "font-semibold"
    ],
    [
      1,
      "pr-4",
      "text-right",
      "font-semibold"
    ],
    [1, "surface"],
    [
      "variant",
      "ghost",
      3,
      "click"
    ],
    [
      1,
      "px-4",
      "py-2",
      "font-medium"
    ],
    [
      1,
      "text-right",
      "tabular"
    ],
    [
      1,
      "pr-4",
      "text-right",
      "tabular"
    ],
    [
      1,
      "flex",
      "flex-wrap",
      "items-center",
      "gap-2",
      "border-b",
      "p-3"
    ],
    [
      "type",
      "button",
      1,
      "rounded-full",
      "border",
      "px-3",
      "py-1",
      "text-xs",
      "font-medium",
      3,
      "click"
    ],
    [
      "variant",
      "outline",
      "size",
      "sm",
      1,
      "ml-auto",
      "h-8",
      3,
      "click"
    ],
    [
      1,
      "max-h-96",
      "overflow-auto"
    ],
    [
      1,
      "sticky",
      "top-0",
      "bg-card",
      "text-left",
      "text-xs",
      "text-muted-foreground"
    ],
    [
      1,
      "px-4",
      "py-2",
      "font-semibold"
    ],
    [
      1,
      "pr-4",
      "font-semibold"
    ],
    [
      1,
      "px-4",
      "pb-4",
      3,
      "pager"
    ],
    [
      1,
      "p-3",
      "text-xs",
      "text-muted-foreground"
    ],
    [
      1,
      "p-6",
      "text-center",
      "text-sm",
      "text-muted-foreground"
    ],
    [
      1,
      "px-4",
      "py-1.5"
    ],
    [1, "tabular"],
    [1, "pr-4"],
    [
      1,
      "surface",
      "p-6"
    ],
    [
      1,
      "size-6",
      "text-success",
      3,
      "img"
    ],
    [
      1,
      "text-lg",
      "font-semibold"
    ],
    [
      1,
      "mt-1",
      "text-sm",
      "text-muted-foreground"
    ],
    [
      1,
      "mt-4",
      "flex",
      "flex-wrap",
      "gap-2"
    ],
    [
      "routerLink",
      "/dashboard/producteurs",
      1,
      "inline-flex",
      "h-9",
      "items-center",
      "rounded-md",
      "border",
      "px-4",
      "text-sm",
      "font-medium",
      "hover:bg-muted"
    ],
    [
      "routerLink",
      "/dashboard/qualite/doublons",
      1,
      "inline-flex",
      "h-9",
      "items-center",
      "rounded-md",
      "border",
      "px-4",
      "text-sm",
      "font-medium",
      "hover:bg-muted"
    ],
    [
      "routerLink",
      "/dashboard/organisations",
      1,
      "inline-flex",
      "h-9",
      "items-center",
      "rounded-md",
      "border",
      "px-4",
      "text-sm",
      "font-medium",
      "hover:bg-muted",
      3,
      "queryParams"
    ],
    [
      "routerLink",
      "/dashboard/referentiels",
      1,
      "inline-flex",
      "h-9",
      "items-center",
      "rounded-md",
      "border",
      "px-4",
      "text-sm",
      "font-medium",
      "hover:bg-muted",
      3,
      "queryParams"
    ],
    [3, "click"],
    [
      1,
      "mt-4",
      "flex",
      "items-start",
      "gap-2",
      "rounded-md",
      "bg-warning-bg",
      "p-3",
      "text-sm",
      "text-warning-fg"
    ],
    [
      "routerLink",
      "/dashboard/donnees",
      1,
      "font-semibold",
      "underline"
    ],
    [
      1,
      "px-4",
      "py-3",
      "font-semibold"
    ],
    [
      1,
      "hidden",
      "font-semibold",
      "lg:table-cell"
    ],
    [
      1,
      "px-4",
      "py-2.5",
      "font-medium"
    ],
    [
      1,
      "hidden",
      "font-mono",
      "text-xs",
      "lg:table-cell"
    ],
    [1, "whitespace-nowrap"],
    [
      1,
      "hidden",
      "text-xs",
      "lg:table-cell"
    ],
    ["tone", "brand"],
    ["tone", "ochre"],
    [
      1,
      "pr-4",
      "text-right"
    ],
    [
      "size",
      "sm",
      "variant",
      "ghost"
    ],
    [
      "size",
      "sm",
      "variant",
      "ghost",
      3,
      "click"
    ],
    [
      "routerLink",
      "/dashboard/audit",
      1,
      "ml-2",
      "text-xs",
      "font-semibold",
      "text-primary",
      "hover:underline",
      3,
      "queryParams"
    ],
    [
      1,
      "mx-auto",
      "mb-2",
      "size-10",
      "opacity-50",
      3,
      "img"
    ],
    [
      1,
      "font-semibold",
      "text-foreground"
    ],
    [
      1,
      "mt-1",
      "text-sm"
    ]
  ],
  template: function ImportsPage_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "app-shell", 1)(1, "ui-page-header", 2)(2, "div", 3)(3, "ui-button", 4);
      __listener("click", function ImportsPage_Template_ui_button_click_3_listener() {
        return ctx.downloadExcelTemplate();
      });
      __element(4, "lucide-angular", 5);
      __text(5);
      __elementEnd();
      __elementStart(6, "div", 6)(7, "ui-button", 7);
      __listener("click", function ImportsPage_Template_ui_button_click_7_listener($event) {
        return ctx.toggleCsvMenu($event);
      });
      __element(8, "lucide-angular", 5);
      __text(9);
      __elementEnd();
      __conditionalCreate(10, ImportsPage_Conditional_10_Template, 3, 0, "div", 8);
      __elementEnd()()();
      __conditionalCreate(11, ImportsPage_Conditional_11_Template, 2, 1, "p", 9);
      __elementStart(12, "ol", 10);
      __repeaterCreate(13, ImportsPage_For_14_Template, 6, 9, "li", 11, __repeaterTrackByIdentity);
      __elementEnd();
      __conditionalCreate(15, ImportsPage_Conditional_15_Template, 9, 7, "label", 12);
      __conditionalCreate(16, ImportsPage_Conditional_16_Template, 20, 13, "section", 13);
      __conditionalCreate(17, ImportsPage_Conditional_17_Template, 42, 46, "section", 13);
      __conditionalCreate(18, ImportsPage_Conditional_18_Template, 1, 1);
      __elementStart(19, "div", 14)(20, "div", 15);
      __element(21, "lucide-angular", 16);
      __elementStart(22, "input", 17);
      __controlCreate();
      __listener("ngModelChange", function ImportsPage_Template_input_ngModelChange_22_listener($event) {
        return ctx.historyQ.set($event);
      });
      __elementEnd()()();
      __elementStart(23, "h2", 18);
      __text(24);
      __elementEnd();
      __elementStart(25, "div", 19);
      __conditionalCreate(26, ImportsPage_Conditional_26_Template, 22, 8)(27, ImportsPage_Conditional_27_Template, 6, 3, "div", 20);
      __elementEnd()();
    }
    if (rf & 2) {
      let tmp_15_0;
      let tmp_16_0;
      let tmp_17_0;
      __property("area", ctx.t()("imports.area"));
      __advance();
      __property("eyebrow", ctx.t()("imports.eyebrow"))("title", ctx.t()("imports.title"))("description", ctx.t()("imports.description"));
      __advance(3);
      __property("img", ctx.icons.sheet);
      __advance();
      __textInterpolate1(" ", ctx.t()("imports.template.excel"), " ");
      __advance(2);
      __attribute("aria-expanded", ctx.csvOpen())("aria-label", ctx.t()("imports.template.csvTitle"));
      __advance();
      __property("img", ctx.icons.download);
      __advance();
      __textInterpolate1(" ", ctx.t()("imports.template.csv"), " ");
      __advance();
      __conditional(ctx.csvOpen() ? 10 : -1);
      __advance();
      __conditional(ctx.flash() ? 11 : -1);
      __advance();
      __attribute("aria-label", ctx.t()("imports.steps.label"));
      __advance();
      __repeater(ctx.STEPS);
      __advance(2);
      __conditional(ctx.step() === "depot" ? 15 : -1);
      __advance();
      __conditional((tmp_15_0 = ctx.step() === "colonnes" && ctx.loaded()) ? 16 : -1, tmp_15_0);
      __advance();
      __conditional((tmp_16_0 = ctx.step() === "rapport" && ctx.plan()) ? 17 : -1, tmp_16_0);
      __advance();
      __conditional((tmp_17_0 = ctx.step() === "termine" && ctx.done()) ? 18 : -1, tmp_17_0);
      __advance(3);
      __property("img", ctx.icons.upload);
      __advance();
      __property("placeholder", ctx.t()("imports.history.searchPlaceholder"))("ngModel", ctx.historyQ());
      __control();
      __advance(2);
      __textInterpolate(ctx.t()("imports.history.title"));
      __advance(2);
      __conditional(ctx.filteredBatches().length ? 26 : 27);
    }
  },
  dependencies: [
    PaginationComponent,
    CommonModule,
    FormsModule,
    NgSelectOption,
    _NgSelectMultipleOption,
    DefaultValueAccessor,
    SelectControlValueAccessor,
    NgControlStatus,
    NgModel,
    RouterLink,
    LucideAngularModule,
    LucideAngularComponent,
    AppShellComponent,
    UiButtonComponent,
    UiKpiTileComponent,
    UiPageHeaderComponent,
    UiPillComponent
  ],
  encapsulation: 2
}), _a);

export { ImportsPage as default };
//# sourceMappingURL=imports.page-Dlpzc0kR.mjs.map
