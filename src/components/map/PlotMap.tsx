import { escapeHtml } from "@/lib/html";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useT } from "@/lib/i18n";
import { FAM_VAR } from "@/lib/mapColors";
import type { Plot, PlotStatus } from "@/lib/mock/data";

// Garde défensive : un redessin programmé juste après le démontage de la carte
// n'a plus de contexte canvas — on l'ignore au lieu de planter.
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

const VAR: Record<PlotStatus, string> = {
  validée: "--map-plot-validated",
  relevée: "--map-plot-surveyed",
  "à reprendre": "--map-plot-to-redo",
  chevauchement: "--map-plot-overlap",
};

export default function PlotMap({
  plots,
  selectedId,
  onSelect,
  basemap,
  colorMode = "statut",
  familyColor,
  alertIds,
  labelOf,
}: {
  plots: Plot[];
  selectedId?: string | undefined;
  onSelect: (id: string) => void;
  basemap: "osm" | "sat";
  colorMode?: "statut" | "famille";
  familyColor?: (crop: string) => string;
  alertIds?: Set<string>;
  /** Infobulle au survol (HTML court : code, producteur, statut…). */
  labelOf?: (p: Plot) => string;
}) {
  const t = useT();
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const layer = useRef<L.LayerGroup | null>(null);
  const alertLayer = useRef<L.LayerGroup | null>(null);
  const tiles = useRef<L.TileLayer | null>(null);
  const svgRenderer = useRef<L.SVG | null>(null);

  // Hachures d'alerte : motif SVG défini une seule fois dans la page.
  useEffect(() => {
    if (document.getElementById("hatch-alert")) return;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.setAttribute("aria-hidden", "true");
    svg.style.position = "absolute";
    svg.innerHTML =
      '<defs><pattern id="hatch-alert" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">' +
      '<rect width="6" height="6" style="fill:var(--p-status-danger-bg)"/>' +
      '<line x1="0" y1="0" x2="0" y2="6" style="stroke:var(--p-status-danger);stroke-width:2.5"/>' +
      "</pattern></defs>";
    document.body.appendChild(svg);
  }, []);

  useEffect(() => {
    if (!el.current || map.current) return;
    map.current = L.map(el.current, { preferCanvas: true, zoomControl: true }).setView(
      [15.6, -16.0],
      9,
    );
    layer.current = L.layerGroup().addTo(map.current);
    alertLayer.current = L.layerGroup().addTo(map.current);
    svgRenderer.current = L.svg({ padding: 0.3 }).addTo(map.current);
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;
    tiles.current?.remove();
    // Plan + satellite via Esri (même hôte CSP). Pas tile.openstreetmap.org (403 usage policy) ;
    // Carto Voyager a aussi été signalé invisible selon les réseaux.
    tiles.current = (
      basemap === "osm"
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
    ).addTo(map.current);
  }, [basemap]);

  useEffect(() => {
    const g = layer.current;
    const ga = alertLayer.current;
    const ar = svgRenderer.current;
    if (!g || !ga || !ar || !map.current) return;
    g.clearLayers();
    ga.clearLayers();
    const css = getComputedStyle(document.documentElement);
    const color = (s: PlotStatus) => css.getPropertyValue(VAR[s]).trim();
    const famColor = (crop: string) => {
      const fam = familyColor?.(crop) ?? "";
      return css.getPropertyValue(FAM_VAR[fam] ?? FAM_VAR["Autres"]!).trim();
    };
    const danger = css.getPropertyValue("--p-status-danger").trim();
    plots.forEach((p) => {
      const sel = p.id === selectedId;
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
      if (alertIds?.has(p.id)) {
        // Alerte : trait renforcé + hachures + icône — jamais la couleur seule, pas de pulsation.
        L.polygon(ring, {
          renderer: ar,
          color: danger,
          weight: sel ? 5 : 4,
          dashArray: "6 3",
          fillColor: "url(#hatch-alert)",
          fillOpacity: 1,
          smoothFactor: 1.5,
        })
          .on("click", () => onSelect(p.id))
          .bindTooltip(
            labelOf
              ? `${labelOf(p)}<br/>${escapeHtml(t("carte.map.openAlert"))}`
              : escapeHtml(p.code),
            {
              sticky: true,
              direction: "top",
            },
          )
          .addTo(g);
      } else {
        L.polygon(ring, {
          color: colorMode === "famille" ? famColor(p.crop) : color(p.status),
          weight: sel ? 3 : 1,
          fillOpacity: sel ? 0.55 : 0.35,
          smoothFactor: 1.5,
        })
          .on("click", () => onSelect(p.id))
          .bindTooltip(labelOf ? labelOf(p) : escapeHtml(p.code), {
            sticky: true,
            direction: "top",
          })
          .addTo(g);
      }
    });
    // Icône d'alerte au centre de chaque parcelle signalée (statique, sans pulsation).
    plots.forEach((p) => {
      if (!alertIds?.has(p.id)) return;
      const center = L.latLngBounds(p.repaired ?? p.raw).getCenter();
      L.marker(center, {
        interactive: false,
        keyboard: false,
        icon: L.divIcon({
          className: "",
          html: '<div class="alert-pin"></div>',
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        }),
      }).addTo(ga);
    });
  }, [plots, selectedId, onSelect, colorMode, familyColor, alertIds, labelOf, t]);

  useEffect(() => {
    const p = plots.find((x) => x.id === selectedId);
    if (p && map.current)
      map.current.fitBounds(L.latLngBounds(p.repaired ?? p.raw), {
        maxZoom: 16,
        padding: [80, 80],
      });
  }, [selectedId]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={el} className="h-full w-full" />;
}
