import { Component, ElementRef, computed, inject, input, output, viewChild } from "@angular/core";

import { LocaleService } from "../locale.service";
import { FIELD_PRESETS, type FieldPreset } from "./field-presets";

import { IconComponent, type IconName } from "./icon.component";

let nextId = 0;

/**
 * Champ de saisie (charte V2) : libellé en capitales, icône facultative, aide et message d'erreur.
 *
 * `<ui-text-field label="Commune" [value]="commune()" (valueChange)="commune.set($event)" [error]="errors().commune" />`
 *
 * - Bordure visible au repos, contour forêt + halo au focus, rouge si `error` est renseigné.
 * - L'erreur est reliée au champ (`aria-invalid` + `aria-describedby`) et annoncée par les lecteurs d'écran.
 * - `focus()` permet au parent de placer le curseur sur le premier champ fautif.
 * - `preset` (prénom, téléphone, CNI, montant…) : placeholder d'exemple, icône, clavier et longueur
 *   communs à toute l'app (`field-presets.ts`) ; une valeur passée explicitement l'emporte.
 */
@Component({
  selector: "ui-text-field",
  imports: [IconComponent],
  host: { class: "block" },
  styles: `
    .label {
      display: flex;
      align-items: baseline;
      gap: 6px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--v2-ardoise);
    }
    .optional {
      text-transform: none;
      letter-spacing: 0;
      font-weight: 500;
      color: var(--v2-gris-texte);
    }
    .box {
      position: relative;
      margin-top: 8px;
    }
    .icon {
      pointer-events: none;
      position: absolute;
      inset: 0 auto 0 0;
      display: grid;
      width: 48px;
      place-items: center;
      color: var(--v2-gris-texte);
    }
    input {
      height: 52px;
      width: 100%;
      border-radius: 16px;
      border: 1.5px solid var(--v2-gris-trait);
      background: var(--v2-blanc);
      padding: 0 16px;
      font-size: 15px;
      font-weight: 600;
      color: var(--v2-encre);
      transition:
        border-color 0.15s ease,
        box-shadow 0.15s ease;
    }
    input.with-icon {
      padding-left: 48px;
    }
    input::placeholder {
      color: var(--v2-gris-texte);
      font-weight: 500;
      opacity: 0.8;
    }
    input:hover {
      border-color: var(--v2-gris-texte);
    }
    input:focus-visible {
      outline: none;
      border: 2px solid var(--v2-foret);
      box-shadow: var(--v2-halo);
    }
    input[aria-invalid="true"] {
      border: 2px solid var(--v2-erreur-fg);
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
    <label class="label" [for]="inputId">
      {{ label() }}
      @if (optional()) {
        <span class="optional">{{ optional() }}</span>
      }
    </label>
    <div class="box">
      @if (eff().icon; as iconName) {
        <span class="icon" aria-hidden="true"><ui-icon [name]="iconName" [size]="20" /></span>
      }
      <input
        #field
        [id]="inputId"
        [type]="eff().type"
        [class.with-icon]="!!eff().icon"
        [placeholder]="eff().placeholder"
        [attr.autocomplete]="eff().autocomplete || null"
        [attr.inputmode]="eff().inputmode || null"
        [attr.maxlength]="eff().maxlength || null"
        [attr.aria-invalid]="error() ? true : null"
        [attr.aria-describedby]="describedBy()"
        [value]="value()"
        (input)="valueChange.emit($any($event.target).value)"
      />
    </div>
    @if (error()) {
      <p class="error" [id]="errorId" role="alert"><ui-icon name="warning" [size]="16" />{{ error() }}</p>
    } @else if (hint()) {
      <p class="hint" [id]="hintId">{{ hint() }}</p>
    }
  `,
})
export class TextFieldComponent {
  readonly label = input.required<string>();
  readonly value = input("");
  readonly placeholder = input("");
  readonly type = input<"text" | "email" | "tel" | "date" | "datetime-local" | "number" | null>(null);
  readonly hint = input("");
  readonly error = input("");
  /** Mention « (facultatif) » à côté du libellé. */
  readonly optional = input("");
  readonly icon = input<IconName | null>(null);
  readonly autocomplete = input("");
  readonly inputmode = input("");
  readonly maxlength = input<number | null>(null);
  /** Champ type de l'app : placeholder d'exemple, icône, clavier, longueur (voir `field-presets.ts`). */
  readonly preset = input<FieldPreset | null>(null);
  readonly valueChange = output<string>();

  private readonly t = inject(LocaleService).t;

  /** Valeurs effectives : ce qui est passé au champ, sinon le champ type, sinon rien. */
  protected readonly eff = computed(() => {
    const p = this.preset() ? FIELD_PRESETS[this.preset()!] : null;
    return {
      type: this.type() ?? p?.type ?? "text",
      placeholder: this.placeholder() || (p ? this.t()(p.placeholder) : ""),
      icon: this.icon() ?? p?.icon ?? null,
      autocomplete: this.autocomplete() || p?.autocomplete || "",
      inputmode: this.inputmode() || p?.inputmode || "",
      maxlength: this.maxlength() ?? p?.maxlength ?? null,
    };
  });

  private readonly uid = nextId++;
  protected readonly inputId = `tf-${this.uid}`;
  protected readonly hintId = `tf-${this.uid}-hint`;
  protected readonly errorId = `tf-${this.uid}-error`;
  protected readonly describedBy = computed(() => (this.error() ? this.errorId : this.hint() ? this.hintId : null));

  private readonly field = viewChild<ElementRef<HTMLInputElement>>("field");

  focus(): void {
    this.field()?.nativeElement.focus();
  }
}
