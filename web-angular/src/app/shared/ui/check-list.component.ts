import { Component, computed, inject, input, output, signal } from "@angular/core";

import { LocaleService } from "../locale.service";
import { IconComponent } from "./icon.component";
import type { SelectOption } from "./select.component";

let nextId = 0;

/**
 * Choix multiple en cases à cocher (charte V2) : recherche, « Tout cocher », compteur, erreur.
 *
 * `<ui-check-list label="Coopératives" [options]="opts" [value]="ids()" (valueChange)="ids.set($event)" />`
 * - Les options cochées restent visibles même filtrées hors de la recherche (compteur à jour).
 * - Accessibilité : `fieldset` + `legend`, vraies cases à cocher, erreur reliée et annoncée.
 */
@Component({
  selector: "ui-check-list",
  imports: [IconComponent],
  host: { class: "block" },
  styles: `
    .legend {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--v2-ardoise);
    }
    .count {
      border-radius: 999px;
      background: var(--v2-foret);
      padding: 2px 9px;
      font-size: 12px;
      letter-spacing: 0;
      text-transform: none;
      color: var(--v2-citron);
    }
    .count.zero {
      background: var(--v2-lin);
      color: var(--v2-gris-texte);
    }
    .box {
      margin-top: 8px;
      overflow: hidden;
      border-radius: 18px;
      border: 1.5px solid var(--v2-gris-trait);
      background: var(--v2-blanc);
    }
    .box.invalid {
      border: 2px solid var(--v2-erreur-fg);
    }
    .tools {
      display: flex;
      align-items: center;
      gap: 8px;
      border-bottom: 1px solid var(--v2-separateur);
      padding: 8px;
    }
    .filter {
      display: flex;
      min-width: 0;
      flex: 1;
      height: 40px;
      align-items: center;
      gap: 8px;
      border-radius: 12px;
      background: var(--v2-creme);
      padding: 0 12px;
      color: var(--v2-gris-texte);
    }
    .filter input {
      min-width: 0;
      flex: 1;
      background: transparent;
      font-size: 14px;
      font-weight: 600;
      color: var(--v2-encre);
      outline: none;
    }
    .filter:focus-within {
      box-shadow: inset 0 0 0 2px var(--v2-foret);
    }
    .bulk {
      flex-shrink: 0;
      border-radius: 10px;
      padding: 8px 10px;
      font-size: 13px;
      font-weight: 800;
      color: var(--v2-foret);
      cursor: pointer;
    }
    .bulk:hover {
      background: var(--v2-sauge);
    }
    .bulk:focus-visible {
      outline: 2px solid var(--v2-foret);
    }
    .list {
      max-height: 260px;
      overflow-y: auto;
      overscroll-behavior: contain;
    }
    .opt {
      display: flex;
      min-height: 48px;
      align-items: center;
      gap: 12px;
      border-top: 1px solid var(--v2-separateur);
      padding: 8px 14px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
    .opt:first-child {
      border-top: none;
    }
    .opt:hover {
      background: var(--v2-creme);
    }
    .opt.on {
      background: color-mix(in oklab, var(--v2-sauge) 70%, transparent);
    }
    .opt input {
      height: 20px;
      width: 20px;
      flex-shrink: 0;
      accent-color: var(--v2-foret);
      cursor: pointer;
    }
    .hint {
      margin-top: 6px;
      font-size: 13px;
      font-weight: 500;
      color: var(--v2-gris-texte);
    }
    .error {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 6px;
      font-size: 13px;
      font-weight: 700;
      color: var(--v2-erreur-fg);
    }
  `,
  template: `
    <fieldset [attr.aria-describedby]="error() ? errorId : null">
      <legend class="legend">
        <span>{{ label() }}</span>
        <span class="count" [class.zero]="!value().length">{{ t()("ui.checklist.selected", { count: value().length }) }}</span>
      </legend>
      <div class="box" [class.invalid]="!!error()">
        @if (options().length > 6) {
          <div class="tools">
            <label class="filter">
              <ui-icon name="search" [size]="18" />
              <input type="search" [placeholder]="t()('ui.checklist.search')" [attr.aria-label]="t()('ui.checklist.search')" [value]="q()" (input)="q.set($any($event.target).value)" />
            </label>
            <button type="button" class="bulk" (click)="toggleAll()">{{ allVisibleOn() ? t()("ui.checklist.none") : t()("ui.checklist.all") }}</button>
          </div>
        }
        <div class="list">
          @for (option of visible(); track option.value) {
            <label class="opt" [class.on]="value().includes(option.value)">
              <input type="checkbox" [checked]="value().includes(option.value)" (change)="toggle(option.value, $any($event.target).checked)" />
              @if (option.icon) {
                <ui-icon [name]="option.icon" [size]="18" style="color: var(--v2-foret)" />
              }
              <span class="min-w-0 flex-1 truncate">{{ option.label }}</span>
              @if (option.hint) {
                <span class="shrink-0 text-[12px] font-bold" style="color: var(--v2-gris-texte)">{{ option.hint }}</span>
              }
            </label>
          } @empty {
            <p class="px-4 py-3 text-[13px] font-medium" style="color: var(--v2-gris-texte)">{{ t()("ui.checklist.empty") }}</p>
          }
        </div>
      </div>
      @if (error()) {
        <p class="error" [id]="errorId" role="alert"><ui-icon name="warning" [size]="16" />{{ error() }}</p>
      } @else if (hint()) {
        <p class="hint">{{ hint() }}</p>
      }
    </fieldset>
  `,
})
export class CheckListComponent {
  readonly label = input.required<string>();
  readonly options = input.required<readonly SelectOption[]>();
  readonly value = input<readonly string[]>([]);
  readonly hint = input("");
  readonly error = input("");
  readonly valueChange = output<string[]>();

  protected readonly t = inject(LocaleService).t;
  protected readonly errorId = `cl-${nextId++}-error`;
  protected readonly q = signal("");

  protected readonly visible = computed(() => {
    const norm = (v: string) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    const q = norm(this.q().trim());
    return q ? this.options().filter((o) => norm(o.label).includes(q)) : this.options();
  });

  protected readonly allVisibleOn = computed(() => this.visible().length > 0 && this.visible().every((o) => this.value().includes(o.value)));

  protected toggle(v: string, on: boolean): void {
    const set = new Set(this.value());
    if (on) set.add(v);
    else set.delete(v);
    // Ordre des options conservé.
    this.valueChange.emit(this.options().map((o) => o.value).filter((x) => set.has(x)));
  }

  protected toggleAll(): void {
    const set = new Set(this.value());
    const on = !this.allVisibleOn();
    for (const o of this.visible()) {
      if (on) set.add(o.value);
      else set.delete(o.value);
    }
    this.valueChange.emit(this.options().map((o) => o.value).filter((x) => set.has(x)));
  }
}
