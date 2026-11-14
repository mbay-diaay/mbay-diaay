import { aa as input, a4 as isPlatformBrowser, i as inject, a2 as PLATFORM_ID, ab as viewChild, ac as afterNextRender, e as effect, ɵ as __defineComponent, j as __conditionalCreate, s as __conditional, X as __viewQuerySignal, Y as __queryAdvance, ad as __domElement, Z as __domElementStart, g as __text, $ as __domElementEnd } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';

var _a;
var ENTITIES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function escapeHtml(value) {
  return String(value != null ? value : "").replace(/[&<>"']/g, (c) => ENTITIES[c]);
}
var _c0 = ["host"];
function PlotMapComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) __domElement(0, "div", 1, 0);
}
function PlotMapComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    __domElementStart(0, "div", 2);
    __text(1, "\u2026");
    __domElementEnd();
  }
}
var STATUS_VAR = {
  valid\u00E9e: "--map-plot-validated",
  relev\u00E9e: "--map-plot-surveyed",
  "\xE0 reprendre": "--map-plot-to-redo",
  chevauchement: "--map-plot-overlap"
};
var PlotMapComponent = (_a = class {
  constructor() {
    this.plots = input.required(...[]);
    this.selectedId = input(...[]);
    this.basemap = input("sat", ...[]);
    this.onSelect = input(() => void 0, ...[]);
    this.browser = isPlatformBrowser(inject(PLATFORM_ID));
    this.host = viewChild("host", ...[]);
    this.map = null;
    this.layer = null;
    this.tiles = null;
    this.svgRenderer = null;
    this.L = null;
    this.ready = false;
    if (!this.browser) return;
    afterNextRender(() => {
      this.init();
    });
    effect(() => {
      this.basemap();
      if (this.ready) this.applyTiles();
    });
    effect(() => {
      this.plots();
      this.selectedId();
      if (this.ready) this.drawPlots();
    });
    effect(() => {
      const id = this.selectedId();
      if (this.ready && id) this.fitSelected(id);
    });
  }
  ngOnDestroy() {
    var _a2;
    (_a2 = this.map) == null ? void 0 : _a2.remove();
    this.map = null;
  }
  async init() {
    var _a2;
    const el = (_a2 = this.host()) == null ? void 0 : _a2.nativeElement;
    if (!el || this.map) return;
    this.L = await import('leaflet');
    await Promise.resolve({});
    const L = this.L;
    const canvasProto = L.Canvas.prototype;
    const origRedraw = canvasProto["_redraw"];
    canvasProto["_redraw"] = function(...args) {
      const self = this;
      if (!self._map || !self._ctx) return;
      return origRedraw == null ? void 0 : origRedraw.apply(this, args);
    };
    if (!document.getElementById("hatch-alert")) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "0");
      svg.setAttribute("height", "0");
      svg.setAttribute("aria-hidden", "true");
      svg.style.position = "absolute";
      svg.id = "hatch-alert-root";
      svg.innerHTML = '<defs><pattern id="hatch-alert" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)"><rect width="6" height="6" style="fill:var(--p-status-danger-bg)"/><line x1="0" y1="0" x2="0" y2="6" style="stroke:var(--p-status-danger);stroke-width:2.5"/></pattern></defs>';
      document.body.appendChild(svg);
    }
    this.map = L.map(el, {
      preferCanvas: true,
      zoomControl: true
    }).setView([15.6, -16], 9);
    this.layer = L.layerGroup().addTo(this.map);
    this.svgRenderer = L.svg({ padding: 0.3 }).addTo(this.map);
    this.ready = true;
    await this.applyTiles();
    this.drawPlots();
    const sel = this.selectedId();
    if (sel) this.fitSelected(sel);
  }
  async applyTiles() {
    var _a2;
    if (!this.map || !this.L) return;
    const L = this.L;
    (_a2 = this.tiles) == null ? void 0 : _a2.remove();
    this.tiles = (this.basemap() === "osm" ? L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
      attribution: '\xA9 <a href="https://www.esri.com/">Esri</a> \xB7 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }) : L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", { attribution: "\xA9 Esri" })).addTo(this.map);
  }
  drawPlots() {
    var _a2;
    const L = this.L;
    const g = this.layer;
    const ar = this.svgRenderer;
    if (!L || !g || !ar || !this.map) return;
    g.clearLayers();
    const css = getComputedStyle(document.documentElement);
    const color = (s) => css.getPropertyValue(STATUS_VAR[s]).trim();
    const select = this.onSelect();
    const selected = this.selectedId();
    for (const p of this.plots()) {
      const sel = p.id === selected;
      const ring = (_a2 = p.repaired) != null ? _a2 : p.raw;
      if (sel && p.repaired) L.polygon(p.raw, {
        renderer: ar,
        color: color("\xE0 reprendre"),
        weight: 2,
        dashArray: "4 4",
        fill: false
      }).addTo(g);
      L.polygon(ring, {
        color: color(p.status),
        weight: sel ? 3 : 1,
        fillOpacity: sel ? 0.55 : 0.35,
        smoothFactor: 1.5
      }).on("click", () => select(p.id)).bindTooltip(escapeHtml(p.code), {
        sticky: true,
        direction: "top"
      }).addTo(g);
    }
  }
  fitSelected(id) {
    var _a2;
    const L = this.L;
    const p = this.plots().find((x) => x.id === id);
    if (!p || !L || !this.map) return;
    this.map.fitBounds(L.latLngBounds((_a2 = p.repaired) != null ? _a2 : p.raw), {
      maxZoom: 16,
      padding: [80, 80]
    });
  }
}, _a.\u0275fac = function PlotMapComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-plot-map"]],
  viewQuery: function PlotMapComponent_Query(rf, ctx) {
    if (rf & 1) __viewQuerySignal(ctx.host, _c0, 5);
    if (rf & 2) __queryAdvance();
  },
  hostAttrs: [
    1,
    "relative",
    "isolate",
    "block",
    "h-full",
    "w-full",
    2,
    "z-index",
    "0"
  ],
  inputs: {
    plots: [1, "plots"],
    selectedId: [1, "selectedId"],
    basemap: [1, "basemap"],
    onSelect: [1, "onSelect"]
  },
  decls: 2,
  vars: 1,
  consts: [
    ["host", ""],
    [
      1,
      "h-full",
      "w-full"
    ],
    [
      1,
      "grid",
      "h-full",
      "place-items-center",
      "text-xs",
      "text-muted-foreground"
    ]
  ],
  template: function PlotMapComponent_Template(rf, ctx) {
    if (rf & 1) __conditionalCreate(0, PlotMapComponent_Conditional_0_Template, 2, 0, "div", 1)(1, PlotMapComponent_Conditional_1_Template, 2, 0, "div", 2);
    if (rf & 2) __conditional(ctx.browser ? 0 : 1);
  },
  encapsulation: 2
}), _a);

export { PlotMapComponent as P };
//# sourceMappingURL=plot-map.component-DDK5c2GY.mjs.map
