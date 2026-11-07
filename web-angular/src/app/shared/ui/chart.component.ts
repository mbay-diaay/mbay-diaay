import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
  PLATFORM_ID,
  viewChild,
  effect,
} from "@angular/core";
import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import type { Chart as ChartType, ChartConfiguration, ChartType as ChartJsType } from "chart.js";

/**
 * Wrapper Chart.js — client-only (canvas indisponible en SSR Analog).
 * Résout `var(--chart-*)` / `var(--…)` en couleurs calculées : Chart.js
 * n'interprète pas les variables CSS dans `backgroundColor`.
 */
@Component({
  selector: "ui-chart",
  host: {
    class: "block h-full w-full min-h-0",
  },
  template: `
    @if (browser) {
      <div class="relative h-full w-full min-h-0">
        <canvas #canvas class="absolute inset-0 !h-full !w-full"></canvas>
      </div>
    } @else {
      <div class="grid h-full min-h-40 place-items-center text-xs text-muted-foreground">…</div>
    }
  `,
})
export class UiChartComponent implements OnDestroy {
  readonly type = input.required<ChartJsType>();
  readonly data = input.required<ChartConfiguration["data"]>();
  readonly options = input<ChartConfiguration["options"]>({});

  protected readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly document = inject(DOCUMENT);
  private readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>("canvas");
  private chart: ChartType | null = null;
  private ready = false;

  constructor() {
    if (!this.browser) return;
    afterNextRender(() => {
      this.ready = true;
      void this.render();
    });
    effect(() => {
      this.type();
      this.data();
      this.options();
      if (this.ready) void this.render();
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
    this.chart = null;
  }

  private async render(): Promise<void> {
    const el = this.canvas()?.nativeElement;
    if (!el || !this.browser) return;
    const {
      Chart,
      BarController,
      BarElement,
      CategoryScale,
      LinearScale,
      PieController,
      DoughnutController,
      ArcElement,
      Tooltip,
      Legend,
    } = await import("chart.js");
    Chart.register(
      BarController,
      BarElement,
      CategoryScale,
      LinearScale,
      PieController,
      DoughnutController,
      ArcElement,
      Tooltip,
      Legend,
    );
    this.chart?.destroy();
    this.chart = new Chart(el, {
      type: this.type(),
      data: this.resolveCssColors(this.data()),
      options: {
        responsive: true,
        maintainAspectRatio: false,
        ...this.options(),
      },
    });
  }

  /** Remplace `var(--token)` par la valeur calculée sur `:root`. */
  private resolveCssColors(data: ChartConfiguration["data"]): ChartConfiguration["data"] {
    const resolve = (value: unknown): unknown => {
      if (typeof value === "string" && value.includes("var(")) {
        return cssVar(this.document, value);
      }
      if (Array.isArray(value)) return value.map((v) => resolve(v));
      return value;
    };
    return {
      ...data,
      datasets: data.datasets.map((ds) => {
        const next: Record<string, unknown> = { ...ds };
        for (const key of ["backgroundColor", "borderColor", "hoverBackgroundColor", "hoverBorderColor"] as const) {
          if (key in next) next[key] = resolve(next[key]);
        }
        return next as unknown as (typeof data.datasets)[number];
      }),
    };
  }
}

function cssVar(doc: Document, raw: string): string {
  const match = raw.match(/var\(\s*(--[\w-]+)\s*(?:,\s*([^)]+))?\)/);
  if (!match) return raw;
  const [, name, fallback] = match;
  const resolved = getComputedStyle(doc.documentElement).getPropertyValue(name!).trim();
  return resolved || fallback?.trim() || raw;
}
