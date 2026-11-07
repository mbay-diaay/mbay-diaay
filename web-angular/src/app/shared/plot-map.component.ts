import {
  afterNextRender,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  PLATFORM_ID,
  viewChild,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import type { Map as LeafletMap, LayerGroup, TileLayer, SVG } from "leaflet";

import { escapeHtml } from "@/lib/html";
import type { Plot, PlotStatus } from "@/lib/mock/data";

const STATUS_VAR: Record<PlotStatus, string> = {
  validée: "--map-plot-validated",
  relevée: "--map-plot-surveyed",
  "à reprendre": "--map-plot-to-redo",
  chevauchement: "--map-plot-overlap",
};

/**
 * Port Angular de PlotMap.tsx — import dynamique Leaflet, client-only (SSR-safe).
 * Tuiles Esri (Street Map / Imagery) — aligné CSP Report-Only.
 */
@Component({
  selector: "app-plot-map",
  template: `
    @if (browser) {
      <div #host class="h-full w-full"></div>
    } @else {
      <div class="grid h-full place-items-center text-xs text-muted-foreground">…</div>
    }
  `,
})
export class PlotMapComponent implements OnDestroy {
  readonly plots = input.required<Plot[]>();
  readonly selectedId = input<string | undefined>();
  readonly basemap = input<"osm" | "sat">("sat");
  readonly onSelect = input<(id: string) => void>(() => undefined);

  protected readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly host = viewChild<ElementRef<HTMLDivElement>>("host");

  private map: LeafletMap | null = null;
  private layer: LayerGroup | null = null;
  private tiles: TileLayer | null = null;
  private svgRenderer: SVG | null = null;
  private L: typeof import("leaflet") | null = null;
  private ready = false;

  constructor() {
    if (!this.browser) return;
    afterNextRender(() => {
      void this.init();
    });
    effect(() => {
      this.basemap();
      if (this.ready) void this.applyTiles();
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

  ngOnDestroy(): void {
    this.map?.remove();
    this.map = null;
  }

  private async init(): Promise<void> {
    const el = this.host()?.nativeElement;
    if (!el || this.map) return;
    this.L = await import("leaflet");
    await import("leaflet/dist/leaflet.css");
    const L = this.L;

    // Garde défensive canvas (comme React) : ignore redraw après démontage.
    const canvasProto = L.Canvas.prototype as unknown as Record<
      string,
      (...args: unknown[]) => unknown
    >;
    const origRedraw = canvasProto["_redraw"];
    canvasProto["_redraw"] = function (this: unknown, ...args: unknown[]) {
      const self = this as { _map?: unknown; _ctx?: unknown };
      if (!self._map || !self._ctx) return;
      return origRedraw?.apply(this, args);
    };

    if (!document.getElementById("hatch-alert")) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "0");
      svg.setAttribute("height", "0");
      svg.setAttribute("aria-hidden", "true");
      svg.style.position = "absolute";
      svg.id = "hatch-alert-root";
      svg.innerHTML =
        '<defs><pattern id="hatch-alert" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">' +
        '<rect width="6" height="6" style="fill:var(--p-status-danger-bg)"/>' +
        '<line x1="0" y1="0" x2="0" y2="6" style="stroke:var(--p-status-danger);stroke-width:2.5"/>' +
        "</pattern></defs>";
      document.body.appendChild(svg);
    }

    this.map = L.map(el, { preferCanvas: true, zoomControl: true }).setView([15.6, -16.0], 9);
    this.layer = L.layerGroup().addTo(this.map);
    this.svgRenderer = L.svg({ padding: 0.3 }).addTo(this.map);
    this.ready = true;
    await this.applyTiles();
    this.drawPlots();
    const sel = this.selectedId();
    if (sel) this.fitSelected(sel);
  }

  private async applyTiles(): Promise<void> {
    if (!this.map || !this.L) return;
    const L = this.L;
    this.tiles?.remove();
    this.tiles = (
      this.basemap() === "osm"
        ? L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
            {
              attribution:
                '© <a href="https://www.esri.com/">Esri</a> · <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
              maxZoom: 19,
            },
          )
        : L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            { attribution: "© Esri" },
          )
    ).addTo(this.map);
  }

  private drawPlots(): void {
    const L = this.L;
    const g = this.layer;
    const ar = this.svgRenderer;
    if (!L || !g || !ar || !this.map) return;
    g.clearLayers();
    const css = getComputedStyle(document.documentElement);
    const color = (s: PlotStatus) => css.getPropertyValue(STATUS_VAR[s]).trim();
    const select = this.onSelect();
    const selected = this.selectedId();
    for (const p of this.plots()) {
      const sel = p.id === selected;
      const ring = p.repaired ?? p.raw;
      if (sel && p.repaired) {
        L.polygon(p.raw, {
          renderer: ar,
          color: color("à reprendre"),
          weight: 2,
          dashArray: "4 4",
          fill: false,
        }).addTo(g);
      }
      L.polygon(ring, {
        color: color(p.status),
        weight: sel ? 3 : 1,
        fillOpacity: sel ? 0.55 : 0.35,
        smoothFactor: 1.5,
      })
        .on("click", () => select(p.id))
        .bindTooltip(escapeHtml(p.code), { sticky: true, direction: "top" })
        .addTo(g);
    }
  }

  private fitSelected(id: string): void {
    const L = this.L;
    const p = this.plots().find((x) => x.id === id);
    if (!p || !L || !this.map) return;
    this.map.fitBounds(L.latLngBounds(p.repaired ?? p.raw), {
      maxZoom: 16,
      padding: [80, 80],
    });
  }
}
