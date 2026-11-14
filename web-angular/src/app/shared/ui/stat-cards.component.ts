import { Component, input } from "@angular/core";

import { IconComponent, type IconName } from "./icon.component";

export interface StatCard {
  label: string;
  value: string;
  sub: string;
  icon: IconName;
  /** Fond et encre (jetons d'état). La première carte est toujours forêt. */
  bg: string;
  fg: string;
}

/**
 * Rangée de statistiques (charte V2) : aplats colorés, grand chiffre, détail en petit, icône en filigrane.
 * La première carte (le total) est en forêt. `<ui-stat-cards [stats]="stats()" />`
 */
@Component({
  selector: "ui-stat-cards",
  imports: [IconComponent],
  host: { class: "block" },
  styles: `
    .stat {
      position: relative;
      overflow: hidden;
      border-radius: 24px;
      border: 1px solid transparent;
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
    }
    .stat:hover {
      transform: translateY(-2px);
      box-shadow: var(--v2-ombre-flottant);
    }
    .watermark {
      pointer-events: none;
      position: absolute;
      right: -18px;
      bottom: -26px;
      opacity: 0.12;
      transform: rotate(-12deg);
      transition: transform 0.35s ease;
    }
    .stat:hover .watermark {
      transform: rotate(-4deg) scale(1.06);
    }
    /* Cinq indicateurs : une seule rangée sur grand écran. */
    @media (min-width: 1280px) {
      .five {
        grid-template-columns: repeat(5, minmax(0, 1fr));
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .stat,
      .watermark {
        transition: none;
      }
    }
  `,
  template: `
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" [class.five]="stats().length === 5">
      @for (stat of stats(); track stat.label; let first = $first) {
        <div
          class="stat flex flex-col p-5"
          [style.background]="first ? 'var(--v2-foret)' : stat.bg"
          [style.color]="first ? 'var(--v2-blanc)' : stat.fg"
        >
          <span class="watermark" [style.color]="first ? 'var(--v2-citron)' : stat.fg" aria-hidden="true"><ui-icon [name]="stat.icon" [size]="120" /></span>
          <div class="relative flex items-center justify-between gap-3">
            <span class="text-[14px] font-bold" [style.opacity]="first ? 0.8 : 1">{{ stat.label }}</span>
            <span class="grid size-10 place-items-center rounded-[12px]" [style.background]="first ? 'var(--v2-citron)' : stat.fg" [style.color]="first ? 'var(--v2-foret)' : stat.bg">
              <ui-icon [name]="stat.icon" [size]="20" />
            </span>
          </div>
          <span class="relative mt-3 text-[34px] font-extrabold leading-none tracking-[-0.03em] tabular-nums">{{ stat.value }}</span>
          <span class="relative mt-2 text-[13px] font-medium leading-snug" [style.opacity]="0.75">{{ stat.sub }}</span>
        </div>
      }
    </div>
  `,
})
export class StatCardsComponent {
  readonly stats = input.required<readonly StatCard[]>();
}
