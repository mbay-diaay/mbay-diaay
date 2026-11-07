import { Component, computed, input } from "@angular/core";
import { cn } from "@/lib/utils";

/** Indicateur chiffré — port de KpiTile (ui-bits.tsx). */
@Component({
  selector: "ui-kpi-tile",
  template: `
    <div class="surface p-4">
      <div class="text-xs text-muted-foreground">{{ label() }}</div>
      <div class="mt-1 text-2xl font-semibold tabular">{{ value() }}</div>
      @if (sub()) {
        <div [class]="subClass()">
          @if (tone() !== "neutral") {
            <span
              class="size-1.5 rounded-full"
              [class.bg-warning]="tone() === 'warning'"
              [class.bg-danger]="tone() === 'danger'"
              aria-hidden="true"
            ></span>
          }
          {{ sub() }}
        </div>
      }
    </div>
  `,
})
export class UiKpiTileComponent {
  readonly label = input.required<string>();
  readonly value = input.required<string | number>();
  readonly sub = input<string | undefined>(undefined);
  readonly tone = input<"neutral" | "warning" | "danger">("neutral");

  protected readonly subClass = computed(() =>
    cn(
      "mt-1.5 flex items-center gap-1.5 text-xs",
      this.tone() === "warning"
        ? "text-warning-fg"
        : this.tone() === "danger"
          ? "text-danger-fg"
          : "text-muted-foreground",
    ),
  );
}
