import { Component, computed, input } from "@angular/core";
import type { Quality } from "@/lib/mock/data";
import { cn } from "@/lib/utils";

export type UiPillTone =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  | "brand"
  | "ochre";

const TONE: Record<UiPillTone, string> = {
  success: "bg-success-bg text-success-fg",
  warning: "bg-warning-bg text-warning-fg",
  danger: "bg-danger-bg text-danger-fg",
  info: "bg-info-bg text-info-fg",
  neutral: "bg-muted text-muted-foreground border border-border",
  brand: "bg-primary-soft text-primary",
  ochre: "bg-ochre-soft text-ochre-text",
};

const DOT: Record<UiPillTone, string> = {
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  neutral: "bg-border-strong",
  brand: "bg-primary",
  ochre: "bg-ochre",
};

const Q_TONE: Record<Quality, UiPillTone> = {
  validé: "success",
  "à vérifier": "warning",
  doublon: "info",
  invalide: "danger",
};

/** Pastille de statut — port de Pill / QualityPill. */
@Component({
  selector: "ui-pill",
  template: `
    <span [class]="classes()">
      <span [class]="dotClass()" aria-hidden="true"></span>
      <ng-content />
    </span>
  `,
})
export class UiPillComponent {
  readonly tone = input<UiPillTone>("neutral");
  readonly className = input("", { alias: "class" });

  protected readonly classes = computed(() =>
    cn(
      "inline-flex items-center gap-1.5 max-w-full whitespace-normal sm:whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold",
      TONE[this.tone()],
      this.className(),
    ),
  );

  protected readonly dotClass = computed(() => cn("size-1.5 shrink-0 rounded-full", DOT[this.tone()]));
}

@Component({
  selector: "ui-quality-pill",
  imports: [UiPillComponent],
  template: `<ui-pill [tone]="tone()">{{ q() }}</ui-pill>`,
})
export class UiQualityPillComponent {
  readonly q = input.required<Quality>();
  protected readonly tone = computed(() => Q_TONE[this.q()]);
}
