import { Component, inject, input, output, signal } from "@angular/core";

import { LocaleService } from "../locale.service";
import { IconComponent, type IconName } from "./icon.component";

export interface FileSlot {
  id: string;
  label: string;
  /** Consigne courte sous le titre (ex. « Recto et verso »). */
  hint: string;
  icon: IconName;
  /** Pièce attendue pour soumettre : pastille « Requise » tant qu'elle manque. */
  required?: boolean;
  /** Pièce sensible (CNI) : pastille d'avertissement. */
  sensitive?: boolean;
}

export interface SlotFile {
  key: string;
  name: string;
  sizeKb: number;
  slot: string;
}

let nextId = 0;

/**
 * Dépôt de pièces par type (charte V2) : une case par type de pièce, chacune avec sa consigne,
 * sa zone « glisser ou cliquer » et ses fichiers listés dedans (retrait possible).
 *
 * `<ui-file-slots [slots]="slots" [files]="files()" accept="image/*,application/pdf" (added)="…" (removed)="…" />`
 * Le parent garde la liste des fichiers et applique ses règles (taille, nombre) dans `added`.
 */
@Component({
  selector: "ui-file-slots",
  imports: [IconComponent],
  host: { class: "block" },
  styles: `
    .slots {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 12px;
    }
    .slot {
      display: flex;
      flex-direction: column;
      border-radius: 20px;
      border: 1.5px solid var(--v2-bord-carte);
      background: var(--v2-blanc);
      padding: 14px;
      transition:
        border-color 0.15s ease,
        background-color 0.15s ease;
    }
    .slot.filled {
      border-color: color-mix(in oklab, var(--v2-vert-pousse) 45%, transparent);
    }
    .slot.over {
      border-color: var(--v2-foret);
      background: var(--v2-sauge);
    }
    .ico {
      display: grid;
      height: 40px;
      width: 40px;
      flex-shrink: 0;
      place-items: center;
      border-radius: 12px;
      background: var(--v2-sauge);
      color: var(--v2-foret);
    }
    .filled .ico {
      background: var(--v2-foret);
      color: var(--v2-citron);
    }
    .tag {
      border-radius: 999px;
      padding: 2px 8px;
      font-size: 11px;
      font-weight: 800;
      white-space: nowrap;
    }
    .drop {
      display: flex;
      margin-top: 12px;
      min-height: 52px;
      align-items: center;
      justify-content: center;
      gap: 8px;
      border-radius: 14px;
      border: 1.5px dashed var(--v2-gris-trait);
      background: var(--v2-creme);
      padding: 10px 12px;
      font-size: 13px;
      font-weight: 700;
      color: var(--v2-foret);
      cursor: pointer;
      transition:
        border-color 0.15s ease,
        background-color 0.15s ease;
    }
    .drop:hover {
      border-color: var(--v2-foret);
    }
    .drop:focus-within {
      outline: 2px solid var(--v2-foret);
      outline-offset: 2px;
    }
    .files {
      margin-top: 10px;
      display: grid;
      gap: 6px;
    }
    .file {
      display: flex;
      align-items: center;
      gap: 10px;
      border-radius: 12px;
      background: var(--v2-creme);
      padding: 6px 6px 6px 10px;
      font-size: 13px;
    }
    .rm {
      display: grid;
      height: 28px;
      width: 28px;
      flex-shrink: 0;
      place-items: center;
      border-radius: 8px;
      color: var(--v2-ardoise);
      cursor: pointer;
    }
    .rm:hover {
      background: var(--v2-erreur-bg);
      color: var(--v2-erreur-fg);
    }
    .rm:focus-visible {
      outline: 2px solid var(--v2-foret);
    }
  `,
  template: `
    <div class="slots">
      @for (slot of slots(); track slot.id) {
        @let mine = filesOf(slot.id);
        <div
          class="slot"
          [class.filled]="mine.length"
          [class.over]="over() === slot.id"
          (dragover)="$event.preventDefault(); over.set(slot.id)"
          (dragleave)="over.set(null)"
          (drop)="onDrop($event, slot.id)"
        >
          <div class="flex items-start gap-3">
            <span class="ico" aria-hidden="true"><ui-icon [name]="mine.length ? 'check_circle' : slot.icon" [size]="20" /></span>
            <div class="min-w-0 flex-1">
              <p class="flex flex-wrap items-center gap-1.5 text-[14px] font-extrabold">
                {{ slot.label }}
                @if (slot.required && !mine.length) {
                  <span class="tag" style="background: var(--v2-attente-bg); color: var(--v2-attente-fg)">{{ t()("ui.files.required") }}</span>
                }
                @if (slot.sensitive) {
                  <span class="tag" style="background: var(--v2-erreur-bg); color: var(--v2-erreur-fg)">{{ t()("ui.files.sensitive") }}</span>
                }
              </p>
              <p class="mt-0.5 text-[12.5px] font-medium leading-snug" style="color: var(--v2-gris-texte)">{{ slot.hint }}</p>
            </div>
          </div>

          @if (mine.length) {
            <ul class="files">
              @for (file of mine; track file.key) {
                <li class="file">
                  <ui-icon name="description" [size]="16" style="color: var(--v2-foret)" />
                  <span class="min-w-0 flex-1 truncate font-bold" [title]="file.name">{{ file.name }}</span>
                  <span class="shrink-0 tabular-nums" style="color: var(--v2-gris-texte)">{{ file.sizeKb }} Ko</span>
                  <button type="button" class="rm" [attr.aria-label]="t()('ui.files.remove', { name: file.name })" (click)="removed.emit(file.key)">
                    <ui-icon name="close" [size]="16" />
                  </button>
                </li>
              }
            </ul>
          }

          <!-- Case à fichier unique : une fois remplie, on retire le fichier pour en mettre un autre. -->
          @if (multiple() || !mine.length) {
            <label class="drop" [attr.for]="uid + slot.id">
              <ui-icon name="upload_file" [size]="18" />
              {{ mine.length ? t()("ui.files.addAnother") : t()("ui.files.add") }}
              <input [id]="uid + slot.id" type="file" class="sr-only" [accept]="accept()" [multiple]="multiple()" (change)="onPick($event, slot.id)" />
            </label>
          }
        </div>
      }
    </div>
    @if (hint()) {
      <p class="mt-3 flex items-center gap-2 text-[12.5px] font-medium" style="color: var(--v2-gris-texte)">
        <ui-icon name="help" [size]="16" />{{ hint() }}
      </p>
    }
  `,
})
export class FileSlotsComponent {
  readonly slots = input.required<readonly FileSlot[]>();
  readonly files = input<readonly SlotFile[]>([]);
  readonly accept = input("");
  /** `false` : un seul fichier par case (le bouton d'ajout disparaît une fois la case remplie). */
  readonly multiple = input(true);
  /** Règle commune sous les cases (formats, taille maximale). */
  readonly hint = input("");
  readonly added = output<{ slot: string; files: File[] }>();
  readonly removed = output<string>();

  protected readonly t = inject(LocaleService).t;
  protected readonly uid = `fs-${nextId++}-`;
  protected readonly over = signal<string | null>(null);

  protected filesOf(slot: string): readonly SlotFile[] {
    return this.files().filter((f) => f.slot === slot);
  }

  protected onPick(ev: Event, slot: string): void {
    const input = ev.target as HTMLInputElement;
    if (input.files?.length) this.added.emit({ slot, files: Array.from(input.files) });
    input.value = "";
  }

  protected onDrop(ev: DragEvent, slot: string): void {
    ev.preventDefault();
    this.over.set(null);
    const files = ev.dataTransfer?.files;
    if (files?.length) this.added.emit({ slot, files: Array.from(files) });
  }
}
