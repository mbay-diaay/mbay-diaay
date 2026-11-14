import { Component, afterNextRender, input, signal } from "@angular/core";

import { IconComponent, type IconName } from "./icon.component";

let nextId = 0;

/**
 * Section ouvrable / fermable (charte V2), animée et mémorisée.
 *
 * ```html
 * <ui-collapsible title="Structure du réseau" icon="hub" storageKey="mbd.coop.network">
 *   <div collapsible-summary>…résumé visible quand la section est fermée…</div>
 *   …contenu…
 * </ui-collapsible>
 * ```
 * - En-tête cliquable (`aria-expanded`, `aria-controls`), chevron qui pivote.
 * - Ouverture/fermeture : hauteur (grille 0fr ↔ 1fr) + opacité ; rien d'animé si « réduire les animations ».
 * - `storageKey` : l'état est retenu dans le navigateur (sinon `defaultOpen`).
 */
@Component({
  selector: "ui-collapsible",
  imports: [IconComponent],
  host: { class: "block" },
  styles: `
    .head {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 12px;
      border-radius: 18px;
      padding: 4px;
      text-align: left;
      cursor: pointer;
    }
    .head:focus-visible {
      outline: 2px solid var(--v2-foret);
      outline-offset: 4px;
    }
    .toggle {
      display: grid;
      height: 36px;
      width: 36px;
      flex-shrink: 0;
      place-items: center;
      border-radius: 12px;
      background: var(--v2-creme);
      color: var(--v2-ardoise);
      transition:
        background-color 0.2s ease,
        color 0.2s ease;
    }
    .head:hover .toggle {
      background: var(--v2-foret);
      color: var(--v2-citron);
    }
    .chev {
      transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .open .chev {
      transform: rotate(180deg);
    }
    .summary {
      display: grid;
      grid-template-rows: 1fr;
      opacity: 1;
      transition:
        grid-template-rows 0.3s cubic-bezier(0.32, 0.72, 0, 1),
        opacity 0.2s ease;
    }
    .open .summary {
      grid-template-rows: 0fr;
      opacity: 0;
    }
    .panel {
      display: grid;
      grid-template-rows: 0fr;
      opacity: 0;
      transition:
        grid-template-rows 0.35s cubic-bezier(0.32, 0.72, 0, 1),
        opacity 0.25s ease;
    }
    .open .panel {
      grid-template-rows: 1fr;
      opacity: 1;
    }
    .clip {
      min-height: 0;
      overflow: hidden;
    }
    @media (prefers-reduced-motion: reduce) {
      .chev,
      .summary,
      .panel {
        transition: none;
      }
    }
  `,
  template: `
    <div [class.open]="open()">
      <button type="button" class="head" [attr.aria-expanded]="open()" [attr.aria-controls]="panelId" (click)="toggle()">
        @if (icon()) {
          <span class="grid size-10 shrink-0 place-items-center rounded-[12px]" style="background: var(--v2-foret); color: var(--v2-citron)">
            <ui-icon [name]="icon()!" [size]="20" />
          </span>
        }
        <span class="min-w-0 flex-1">
          <span class="block text-[18px] font-extrabold leading-tight tracking-[-0.02em]">{{ title() }}</span>
          @if (subtitle()) {
            <span class="mt-0.5 block text-[13px] font-medium" style="color: var(--v2-gris-texte)">{{ subtitle() }}</span>
          }
        </span>
        <span class="toggle" aria-hidden="true"><ui-icon name="keyboard_arrow_down" [size]="22" class="chev" /></span>
      </button>

      <!-- Résumé : visible seulement quand la section est fermée -->
      <div class="summary" [attr.aria-hidden]="open()">
        <div class="clip"><div class="pt-3"><ng-content select="[collapsible-summary]" /></div></div>
      </div>

      <div class="panel" [id]="panelId" role="region" [attr.inert]="open() ? null : ''">
        <div class="clip"><div class="pt-4"><ng-content /></div></div>
      </div>
    </div>
  `,
})
export class CollapsibleComponent {
  readonly title = input.required<string>();
  readonly subtitle = input("");
  readonly icon = input<IconName | null>(null);
  readonly defaultOpen = input(true);
  /** Clé de mémorisation dans le navigateur (facultative). */
  readonly storageKey = input("");

  protected readonly panelId = `collapsible-${nextId++}`;
  protected readonly open = signal(true);

  constructor() {
    afterNextRender(() => {
      let stored: string | null = null;
      try {
        stored = this.storageKey() ? window.localStorage.getItem(this.storageKey()) : null;
      } catch {
        /* stockage indisponible */
      }
      this.open.set(stored === null ? this.defaultOpen() : stored === "1");
    });
  }

  protected toggle(): void {
    const next = !this.open();
    this.open.set(next);
    if (!this.storageKey()) return;
    try {
      window.localStorage.setItem(this.storageKey(), next ? "1" : "0");
    } catch {
      /* stockage indisponible : l'état n'est pas mémorisé */
    }
  }
}
