import { Component } from "@angular/core";

/**
 * Rangée de filtres / pastilles : une ligne avec scroll horizontal sur petit
 * écran (évite le wrap orphelin), wrap autorisé dès `md`.
 */
@Component({
  selector: "ui-chip-rail",
  host: {
    role: "group",
    class: "relative block min-w-0",
  },
  template: `
    <div
      class="chip-rail-track -mx-1 flex gap-2 overflow-x-auto overscroll-x-contain px-1 pb-1 [scrollbar-width:thin] snap-x snap-mandatory md:flex-wrap md:overflow-visible md:pb-0"
    >
      <ng-content />
    </div>
  `,
  styles: `
    :host::after {
      content: "";
      pointer-events: none;
      position: absolute;
      inset-block: 0;
      inset-inline-end: 0;
      width: 1.75rem;
      background: linear-gradient(to left, var(--sem-surface), transparent);
      opacity: 0.9;
    }
    @media (min-width: 768px) {
      :host::after {
        display: none;
      }
    }
  `,
})
export class UiChipRailComponent {}
