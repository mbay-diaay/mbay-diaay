import {
  afterNextRender,
  DestroyRef,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
  viewChild,
} from "@angular/core";

import { LocaleService } from "../locale.service";
import { IconComponent, type IconName } from "./icon.component";

export interface SelectOption {
  value: string;
  label: string;
  /** Icône Material à gauche du libellé (facultative). */
  icon?: IconName;
  /** Petit compteur ou précision à droite (ex. « 11 »). */
  hint?: string;
}

let nextId = 0;

/**
 * Liste déroulante personnalisée (charte V2), à la place du `<select>` natif.
 *
 * `<ui-select [options]="opts" [value]="v()" (valueChange)="v.set($event)" label="Coopérative" />`
 *
 * - Bouton déclencheur + liste flottante (`role="listbox"`), coche sur l'option choisie.
 *   Le compteur (`hint`) n'apparaît que dans la liste, pour laisser toute la place au libellé.
 * - Clavier : ↑/↓ pour parcourir, Entrée pour choisir, Échap pour fermer, Début/Fin.
 * - Recherche intégrée au-delà de `searchFrom` options (7 par défaut).
 * - Fermeture au clic extérieur. Couleurs : tokens `--v2-*`.
 */
@Component({
  selector: "ui-select",
  imports: [IconComponent],
  host: {
    class: "relative block",
    "(document:click)": "onDocumentClick($event)",
    "(window:resize)": "close(false)",
  },
  styles: `
    .trigger {
      display: flex;
      height: 52px;
      width: 100%;
      align-items: center;
      gap: 10px;
      border-radius: 16px;
      border: 1.5px solid var(--v2-gris-trait);
      background: var(--v2-blanc);
      padding: 0 12px 0 16px;
      text-align: left;
      font-size: 15px;
      font-weight: 600;
      color: var(--v2-encre);
      cursor: pointer;
      transition:
        border-color 0.15s ease,
        box-shadow 0.15s ease;
    }
    .trigger:hover {
      border-color: var(--v2-gris-texte);
    }
    .trigger:focus-visible,
    .trigger.open {
      outline: none;
      border: 2px solid var(--v2-foret);
      padding-left: 15.5px;
      box-shadow: var(--v2-halo);
    }
    .compact .trigger {
      height: 48px;
      border-radius: 14px;
      border-color: transparent;
      background: var(--v2-creme);
    }
    .chevron {
      color: var(--v2-gris-texte);
      transition: transform 0.2s ease;
    }
    .open .chevron {
      transform: rotate(180deg);
    }
    .panel {
      position: absolute;
      left: 0;
      right: 0;
      top: calc(100% + 8px);
      z-index: 70;
      min-width: 240px;
      border-radius: 18px;
      border: 1px solid var(--v2-bord-carte);
      background: var(--v2-blanc);
      padding: 6px;
      box-shadow: var(--v2-ombre-modale);
      animation: drop 0.16s ease both;
    }
    .panel.right {
      left: auto;
    }
    /* Ouverture vers le haut : pied de tableau, bas d'une carte qui masque le débordement. */
    .panel.up {
      top: auto;
      bottom: calc(100% + 8px);
    }
    @keyframes drop {
      from {
        opacity: 0;
        transform: translateY(-4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .filter {
      display: flex;
      height: 42px;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
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
    /* Liste flottante : position calculée depuis le champ, jamais coupée par une modale ou une carte. */
    .panel.floating {
      position: fixed;
      right: auto;
      bottom: auto;
      top: auto;
      display: flex;
      flex-direction: column;
    }
    .panel.floating .list {
      max-height: none;
      min-height: 0;
      flex: 1;
    }
    .list {
      max-height: 280px;
      overflow-y: auto;
      overscroll-behavior: contain;
    }
    .option {
      display: flex;
      min-height: 44px;
      align-items: center;
      gap: 10px;
      border-radius: 12px;
      padding: 8px 10px;
      font-size: 14px;
      font-weight: 600;
      color: var(--v2-ardoise);
      cursor: pointer;
    }
    .option.active {
      background: var(--v2-sauge);
      color: var(--v2-encre);
    }
    .option.selected {
      color: var(--v2-foret);
      font-weight: 800;
    }
    .hint {
      border-radius: 999px;
      padding: 1px 8px;
      font-size: 12px;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      background: var(--v2-creme);
      color: var(--v2-gris-texte);
    }
    .empty {
      padding: 12px;
      font-size: 13px;
      font-weight: 500;
      color: var(--v2-gris-texte);
    }
    @media (prefers-reduced-motion: reduce) {
      .panel {
        animation: none;
      }
      .chevron {
        transition: none;
      }
    }
  `,
  template: `
    <div [class.compact]="variant() === 'compact'" [class.open]="open()">
      <button
        #trigger
        type="button"
        class="trigger"
        [class.open]="open()"
        [id]="ids.trigger"
        aria-haspopup="listbox"
        [attr.aria-expanded]="open()"
        [attr.aria-controls]="ids.list"
        [attr.aria-label]="label() ? label() + ' : ' + (current()?.label ?? (placeholder() || t()('ui.select.placeholder'))) : null"
        (click)="toggle()"
        (keydown)="onTriggerKey($event)"
      >
        @if (current()?.icon; as icon) {
          <ui-icon [name]="icon" [size]="20" style="color: var(--v2-foret)" />
        } @else if (leadingIcon()) {
          <ui-icon [name]="leadingIcon()!" [size]="20" style="color: var(--v2-gris-texte)" />
        }
        <span class="min-w-0 flex-1 truncate" [style.color]="current() ? null : 'var(--v2-gris-texte)'">
          {{ current()?.label ?? (placeholder() || t()("ui.select.placeholder")) }}
        </span>
        <ui-icon name="keyboard_arrow_down" [size]="22" class="chevron" />
      </button>

      @if (open()) {
        <div
          #panel
          class="panel floating"
          [style.left.px]="place().left"
          [style.width.px]="place().width"
          [style.top.px]="place().top"
          [style.bottom.px]="place().bottom"
          [style.max-height.px]="place().maxHeight"
        >
          @if (searchable()) {
            <label class="filter">
              <ui-icon name="search" [size]="18" />
              <input
                #filterInput
                type="text"
                [placeholder]="t()('ui.select.search')"
                [attr.aria-label]="t()('ui.select.search')"
                [attr.aria-controls]="ids.list"
                [value]="query()"
                (input)="onQuery($any($event.target).value)"
                (keydown)="onListKey($event)"
              />
            </label>
          }
          <ul
            class="list"
            role="listbox"
            [id]="ids.list"
            [attr.aria-labelledby]="ids.trigger"
            [attr.aria-activedescendant]="activeId()"
            tabindex="-1"
            (keydown)="onListKey($event)"
          >
            @for (option of visible(); track option.value; let optionIndex = $index) {
              <li
                role="option"
                class="option"
                [id]="ids.option + optionIndex"
                [class.active]="optionIndex === active()"
                [class.selected]="option.value === value()"
                [attr.aria-selected]="option.value === value()"
                (mouseenter)="active.set(optionIndex)"
                (click)="choose(option)"
              >
                @if (option.icon) {
                  <ui-icon [name]="option.icon" [size]="19" />
                }
                <span class="min-w-0 flex-1 truncate">{{ option.label }}</span>
                @if (option.hint) {
                  <span class="hint">{{ option.hint }}</span>
                }
                @if (option.value === value()) {
                  <ui-icon name="check" [size]="18" />
                }
              </li>
            } @empty {
              <li class="empty">{{ t()("ui.select.empty") }}</li>
            }
          </ul>
        </div>
      }
    </div>
  `,
})
export class SelectComponent {
  readonly options = input.required<readonly SelectOption[]>();
  readonly value = input<string>("");
  readonly label = input<string>("");
  readonly placeholder = input<string>("");
  /** Icône du déclencheur quand l'option choisie n'en a pas. */
  readonly leadingIcon = input<IconName | null>(null);
  /** `compact` : fond crème sans bordure, pour une barre d'outils. */
  readonly variant = input<"default" | "compact">("default");
  readonly align = input<"left" | "right">("left");
  /** `up` : la liste s'ouvre au-dessus du champ (pied de tableau, bas de carte). */
  readonly drop = input<"down" | "up">("down");
  /** Nombre d'options à partir duquel un champ de recherche apparaît. */
  readonly searchFrom = input(8);
  readonly valueChange = output<string>();

  protected readonly t = inject(LocaleService).t;
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly triggerRef = viewChild<ElementRef<HTMLButtonElement>>("trigger");
  private readonly filterRef = viewChild<ElementRef<HTMLInputElement>>("filterInput");

  private readonly uid = nextId++;
  protected readonly ids = { trigger: `sel-${this.uid}`, list: `sel-${this.uid}-list`, option: `sel-${this.uid}-opt-` };

  protected readonly open = signal(false);
  /** Position de la liste flottante (coordonnées de la fenêtre). */
  protected readonly place = signal<{ left: number; width: number; top: number | null; bottom: number | null; maxHeight: number }>({
    left: 0,
    width: 240,
    top: 0,
    bottom: null,
    maxHeight: 340,
  });
  private readonly panelRef = viewChild<ElementRef<HTMLElement>>("panel");
  protected readonly query = signal("");
  protected readonly active = signal(0);

  protected readonly current = computed(() => this.options().find((o) => o.value === this.value()));
  protected readonly searchable = computed(() => this.options().length >= this.searchFrom());
  protected readonly visible = computed(() => {
    const norm = (v: string) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    const q = norm(this.query().trim());
    return q ? this.options().filter((o) => norm(o.label).includes(q)) : this.options();
  });
  protected readonly activeId = computed(() => (this.open() && this.visible().length ? this.ids.option + this.active() : null));

  constructor() {
    // Défilement de n'importe quel conteneur (page, modale, carte) : écouté en capture, retiré à la destruction.
    afterNextRender(() => {
      const onScroll = (e: Event) => this.onScroll(e);
      window.addEventListener("scroll", onScroll, true);
      this.destroyRef.onDestroy(() => window.removeEventListener("scroll", onScroll, true));
    });
    // À l'ouverture : on part de l'option choisie, et le focus va dans la recherche si elle existe.
    effect(() => {
      if (!this.open()) return;
      untracked(() => {
        const i = this.visible().findIndex((o) => o.value === this.value());
        this.active.set(Math.max(0, i));
        queueMicrotask(() => this.filterRef()?.nativeElement.focus({ preventScroll: true }));
      });
    });
  }

  protected toggle(): void {
    if (!this.open()) this.measure();
    this.open.update((o) => !o);
    if (!this.open()) this.query.set("");
  }

  /**
   * Place la liste sous le champ, ou au-dessus quand la place manque en bas (ou si `drop="up"`).
   * Largeur : celle du champ (240 px au moins), alignée à droite si `align="right"`.
   */
  private measure(): void {
    const trigger = this.triggerRef()?.nativeElement;
    if (!trigger || typeof window === "undefined") return;
    const r = trigger.getBoundingClientRect();
    const gap = 8;
    const margin = 12;
    const wanted = 360;
    const below = window.innerHeight - r.bottom - gap - margin;
    const above = r.top - gap - margin;
    const up = this.drop() === "up" ? above >= 160 || above > below : below < Math.min(wanted, 240) && above > below;
    const width = Math.max(r.width, 240);
    const left = Math.min(
      Math.max(margin, this.align() === "right" ? r.right - width : r.left),
      window.innerWidth - width - margin,
    );
    this.place.set({
      left,
      width,
      top: up ? null : r.bottom + gap,
      bottom: up ? window.innerHeight - r.top + gap : null,
      maxHeight: Math.max(160, Math.min(wanted, up ? above : below)),
    });
    // Un ancêtre transformé (animation, carte) sert parfois de repère au « fixed » : on mesure l'écart réel
    // une fois la liste affichée et on le compense.
    requestAnimationFrame(() => this.correct());
  }

  private correct(): void {
    const panel = this.panelRef()?.nativeElement;
    if (!panel) return;
    const p = this.place();
    const rect = panel.getBoundingClientRect();
    const dx = rect.left - p.left;
    const dy = p.top !== null ? rect.top - p.top : rect.bottom - (window.innerHeight - (p.bottom ?? 0));
    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
    this.place.set({
      ...p,
      left: p.left - dx,
      top: p.top !== null ? p.top - dy : null,
      bottom: p.bottom !== null ? p.bottom + dy : null,
    });
  }

  /** Défilement de la page : la liste suivrait mal le champ, on la ferme (sauf défilement dans la liste). */
  protected onScroll(e: Event): void {
    if (!this.open()) return;
    const panel = this.panelRef()?.nativeElement;
    if (panel && e.target instanceof Node && panel.contains(e.target)) return;
    this.close(false);
  }

  protected choose(o: SelectOption): void {
    this.valueChange.emit(o.value);
    this.close(true);
  }

  protected onQuery(v: string): void {
    this.query.set(v);
    this.active.set(0);
  }

  protected onTriggerKey(e: KeyboardEvent): void {
    if (!this.open() && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      e.preventDefault();
      this.measure();
      this.open.set(true);
      return;
    }
    if (this.open()) this.onListKey(e);
  }

  protected onListKey(e: KeyboardEvent): void {
    const n = this.visible().length;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (n) this.active.update((i) => (i + 1) % n);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (n) this.active.update((i) => (i - 1 + n) % n);
        break;
      case "Home":
        e.preventDefault();
        this.active.set(0);
        break;
      case "End":
        e.preventDefault();
        this.active.set(Math.max(0, n - 1));
        break;
      case "Enter": {
        e.preventDefault();
        const o = this.visible()[this.active()];
        if (o) this.choose(o);
        break;
      }
      case "Escape":
        e.preventDefault();
        this.close(true);
        break;
      case "Tab":
        this.close(false);
        break;
    }
  }

  protected onDocumentClick(e: MouseEvent): void {
    if (this.open() && !this.host.nativeElement.contains(e.target as Node)) this.close(false);
  }

  protected close(refocus: boolean): void {
    this.open.set(false);
    this.query.set("");
    if (refocus) this.triggerRef()?.nativeElement.focus();
  }
}
