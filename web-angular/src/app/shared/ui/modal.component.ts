import { Component, input, output } from "@angular/core";

import { IconComponent, type IconName } from "./icon.component";
import { UiModalA11yDirective } from "./modal-a11y.directive";

let nextId = 0;

/**
 * Fenêtre modale (charte V2) : voile, carte arrondie centrée (feuille en bas sur mobile).
 *
 * ```html
 * <ui-modal [open]="dialog()" title="Créer une coopérative" icon="add_business" (closed)="dialog.set(false)">
 *   …contenu…
 *   <div modal-footer>…boutons…</div>
 * </ui-modal>
 * ```
 * `tone="brand"` + `<div modal-badges>` : en-tête forêt avec pastilles d'état (fiches de détail).
 * Accessibilité (directive `uiModalA11y`) : focus piégé, Échap pour fermer, focus rendu à l'ouverture,
 * défilement de la page bloqué. Fermeture aussi au clic sur le voile et sur la croix.
 */
@Component({
  selector: "ui-modal",
  imports: [IconComponent, UiModalA11yDirective],
  styles: `
    .backdrop {
      position: fixed;
      inset: 0;
      z-index: 120;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      background: color-mix(in oklab, var(--v2-encre) 45%, transparent);
      padding: 0;
      animation: fade 0.18s ease both;
    }
    @media (min-width: 640px) {
      .backdrop {
        align-items: center;
        padding: 24px;
      }
    }
    .sheet {
      display: flex;
      max-height: calc(100dvh - 24px);
      width: 100%;
      flex-direction: column;
      border-radius: 28px 28px 0 0;
      background: var(--v2-blanc);
      color: var(--v2-encre);
      font-family: var(--v2-font);
      box-shadow: var(--v2-ombre-modale);
      animation: rise 0.26s cubic-bezier(0.32, 0.72, 0, 1) backwards;
    }
    @media (min-width: 640px) {
      .sheet {
        max-height: calc(100dvh - 48px);
        border-radius: 32px;
      }
    }
    /* Ton « brand » : en-tête forêt (fiches de détail), le contenu reste sur fond blanc. */
    .sheet.brand {
      overflow: hidden;
    }
    .brand .head {
      background: var(--v2-foret);
      color: var(--v2-blanc);
      padding-bottom: 22px;
    }
    .brand .head .desc {
      color: color-mix(in oklab, var(--v2-blanc) 72%, transparent) !important;
    }
    .brand .close {
      color: var(--v2-blanc);
      background: color-mix(in oklab, var(--v2-blanc) 10%, transparent);
    }
    .brand .close:hover {
      background: var(--v2-citron);
      color: var(--v2-foret);
    }
    .brand .close:focus-visible {
      outline-color: var(--v2-citron);
    }
    .close {
      display: grid;
      height: 40px;
      width: 40px;
      place-items: center;
      border-radius: 12px;
      color: var(--v2-gris-texte);
      cursor: pointer;
    }
    .close:hover {
      background: var(--v2-creme);
      color: var(--v2-encre);
    }
    .close:focus-visible {
      outline: 2px solid var(--v2-foret);
      outline-offset: 2px;
    }
    @keyframes fade {
      from {
        opacity: 0;
      }
    }
    @keyframes rise {
      from {
        opacity: 0;
        transform: translateY(16px) scale(0.98);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .backdrop,
      .sheet {
        animation: none;
      }
    }
  `,
  template: `
    @if (open()) {
      <div class="backdrop" (click)="onBackdrop($event)">
        <section
          class="sheet"
          [class.brand]="tone() === 'brand'"
          [style.max-width.px]="width()"
          role="dialog"
          aria-modal="true"
          [attr.aria-labelledby]="titleId"
          [attr.aria-describedby]="description() ? descId : null"
          uiModalA11y
          (dismiss)="closed.emit()"
        >
          <header class="head flex items-start gap-4 px-6 pb-4 pt-6 sm:px-8 sm:pt-7">
            @if (icon()) {
              <span
                class="grid size-12 shrink-0 place-items-center rounded-[14px]"
                [style.background]="tone() === 'danger' ? 'var(--v2-erreur-fg)' : tone() === 'brand' ? 'var(--v2-citron)' : 'var(--v2-foret)'"
                [style.color]="tone() === 'danger' ? 'var(--v2-erreur-bg)' : tone() === 'brand' ? 'var(--v2-foret)' : 'var(--v2-citron)'"
              >
                <ui-icon [name]="icon()!" [size]="24" />
              </span>
            }
            <div class="min-w-0 flex-1">
              <h2 [id]="titleId" class="text-[22px] font-extrabold leading-tight tracking-[-0.02em]">{{ title() }}</h2>
              @if (description()) {
                <p [id]="descId" class="desc mt-1.5 text-[14px] font-medium leading-relaxed" style="color: var(--v2-gris-texte)">{{ description() }}</p>
              }
              <!-- Pastilles d'état sous le titre (facultatif) -->
              <ng-content select="[modal-badges]" />
            </div>
            <button type="button" class="close shrink-0" [attr.aria-label]="closeLabel()" (click)="closed.emit()">
              <ui-icon name="close" [size]="22" />
            </button>
          </header>
          <div class="min-h-0 flex-1 overflow-y-auto px-6 pb-2 sm:px-8" [class.pt-6]="tone() === 'brand'">
            <ng-content />
          </div>
          <footer class="flex flex-wrap justify-end gap-3 border-t px-6 py-5 sm:px-8" style="border-color: var(--v2-separateur)">
            <ng-content select="[modal-footer]" />
          </footer>
        </section>
      </div>
    }
  `,
})
export class ModalComponent {
  readonly open = input(false);
  readonly title = input.required<string>();
  readonly description = input("");
  readonly icon = input<IconName | null>(null);
  /** `danger` : action destructive (archivage, suppression) ; `brand` : fiche de détail, en-tête forêt. */
  readonly tone = input<"default" | "danger" | "brand">("default");
  readonly width = input(620);
  readonly closeLabel = input("Fermer");
  readonly closed = output<void>();

  private readonly uid = nextId++;
  protected readonly titleId = `modal-${this.uid}-title`;
  protected readonly descId = `modal-${this.uid}-desc`;

  protected onBackdrop(e: MouseEvent): void {
    if (e.target === e.currentTarget) this.closed.emit();
  }
}
