import { Component, computed, effect, inject, input, model, output, untracked } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

import type { MessageKey } from "@/lib/i18n";
import { AccessDeniedError } from "@/lib/store";
import { MEETING_KINDS, type Meeting, type MeetingKind } from "@/lib/mock/cooperative";
import type { Scoop } from "@/lib/mock/data";
import { inScope } from "@/lib/scope";

import { MEETING_KIND_LABEL } from "./meeting-kinds";
import { LocaleService } from "./locale.service";
import { StoreService } from "./store.service";
import { UiButtonComponent } from "./ui/button.component";
import { UiModalA11yDirective } from "./ui/modal-a11y.directive";

const pad = (n: number) => String(n).padStart(2, "0");

/** ISO → valeur `datetime-local` (heure locale). */
function toLocalInput(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Création ou modification d'une réunion planifiée — port de MeetingFormDialog.tsx. */
@Component({
  selector: "app-meeting-form-dialog",
  imports: [FormsModule, UiButtonComponent, UiModalA11yDirective],
  template: `
    @if (open()) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        (click)="onBackdrop($event)"
      >
        <div
          class="surface max-h-[90vh] w-full max-w-md overflow-y-auto p-6 shadow-lg"
          role="dialog"
          aria-modal="true"
          uiModalA11y
          (dismiss)="close()"
          (click)="$event.stopPropagation()"
        >
          <h2 class="text-lg font-semibold">{{ titleText() }}</h2>
          <p class="mt-1 text-sm text-muted-foreground">{{ descriptionText() }}</p>

          <form class="mt-4 space-y-4" (ngSubmit)="submit()">
            @if (!meeting() && scoops().length > 1) {
              <div>
                <label class="block text-sm font-medium" for="mf-scoop">
                  {{ t()("reunions.form.scoop") }} *
                </label>
                <select
                  id="mf-scoop"
                  name="scoopId"
                  class="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  [(ngModel)]="scoopId"
                >
                  @for (s of scoops(); track s.id) {
                    <option [ngValue]="s.id">{{ s.name }}</option>
                  }
                </select>
              </div>
            }

            <div>
              <label class="block text-sm font-medium" for="mf-kind">{{ t()("reunions.form.kind") }} *</label>
              <select
                id="mf-kind"
                name="kind"
                class="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                [(ngModel)]="kind"
              >
                @for (k of meetingKinds; track k) {
                  <option [ngValue]="k">{{ t()(kindLabel[k]) }}</option>
                }
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium" for="mf-title">{{ t()("reunions.form.title") }} *</label>
              <span class="block text-xs font-normal text-muted-foreground">{{
                t()("reunions.form.titleHint")
              }}</span>
              <input
                id="mf-title"
                name="title"
                type="text"
                autocomplete="off"
                class="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                [(ngModel)]="title"
              />
              @if (tried && errTitle()) {
                <p class="mt-1 text-xs text-destructive">{{ errTitle() }}</p>
              }
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label class="block text-sm font-medium" for="mf-date">{{ t()("reunions.form.date") }} *</label>
                <input
                  id="mf-date"
                  name="date"
                  type="datetime-local"
                  class="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  [(ngModel)]="dateLocal"
                />
                @if (tried && errDate()) {
                  <p class="mt-1 text-xs text-destructive">{{ errDate() }}</p>
                }
              </div>
              <div>
                <label class="block text-sm font-medium" for="mf-place">{{ t()("reunions.form.place") }} *</label>
                <input
                  id="mf-place"
                  name="place"
                  type="text"
                  autocomplete="off"
                  class="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  [(ngModel)]="place"
                />
                @if (tried && errPlace()) {
                  <p class="mt-1 text-xs text-destructive">{{ errPlace() }}</p>
                }
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium" for="mf-agenda">{{ t()("reunions.form.agenda") }}</label>
              <span class="block text-xs font-normal text-muted-foreground">{{
                t()("reunions.form.agendaHint")
              }}</span>
              <textarea
                id="mf-agenda"
                name="agenda"
                rows="4"
                class="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                [(ngModel)]="agendaText"
              ></textarea>
            </div>

            <div class="flex justify-end gap-2 pt-2">
              <ui-button type="button" variant="outline" (click)="close()">
                {{ t()("producteurs.index.cancel") }}
              </ui-button>
              <ui-button type="submit">{{ submitLabel() }}</ui-button>
            </div>
          </form>
        </div>
      </div>
    }
  `,
})
export class MeetingFormDialogComponent {
  private readonly locale = inject(LocaleService);
  private readonly store = inject(StoreService);
  private readonly router = inject(Router);

  protected readonly t = this.locale.t;
  protected readonly kindLabel = MEETING_KIND_LABEL;
  protected readonly meetingKinds = [...MEETING_KINDS];

  readonly open = model(false);
  readonly meeting = input<Meeting | undefined>(undefined);
  readonly defaultScoopId = input<string | undefined>(undefined);
  /** Jour choisi dans le calendrier : proposition à 9 h (comme React). */
  readonly defaultDate = input<Date | undefined>(undefined);

  readonly notify = output<{ kind: "success" | "error"; text: string }>();
  readonly closed = output<void>();

  protected readonly scoops = computed(() => {
    const all = this.store.state().scoops;
    const session = this.store.state().session;
    return all.filter((s: Scoop) => inScope([{ scoopId: s.id }], session).length === 1);
  });

  protected readonly titleText = computed(() =>
    this.meeting() ? this.t()("reunions.form.editTitle") : this.t()("reunions.form.createTitle"),
  );

  protected readonly descriptionText = computed(() =>
    this.meeting()
      ? this.t()("reunions.form.editDescription")
      : this.t()("reunions.form.createDescription"),
  );

  protected readonly submitLabel = computed(() =>
    this.meeting() ? this.t()("reunions.form.save") : this.t()("reunions.form.create"),
  );

  protected scoopId = "";
  protected kind: MeetingKind = "assemblée générale";
  protected title = "";
  protected dateLocal = "";
  protected place = "";
  protected agendaText = "";
  protected tried = false;

  constructor() {
    effect(() => {
      if (!this.open()) return;
      untracked(() => this.resetForm());
    });
  }

  private resetForm(): void {
    const m = this.meeting();
    const defScoop = this.defaultScoopId();
    const list = this.scoops();
    const allowed = new Set(list.map((s) => s.id));

    this.tried = false;

    if (m) {
      this.scoopId = m.scoopId;
      this.kind = m.kind;
      this.title = m.title;
      this.dateLocal = toLocalInput(m.date);
      this.place = m.place;
      this.agendaText = m.agenda.join("\n");
      return;
    }

    this.scoopId =
      (defScoop && allowed.has(defScoop) ? defScoop : list[0]?.id) ?? "";
    this.kind = "assemblée générale";
    this.title = "";
    const dd = this.defaultDate();
    if (dd) {
      const d = new Date(dd.getFullYear(), dd.getMonth(), dd.getDate(), 9, 0);
      this.dateLocal = toLocalInput(d.toISOString());
    } else {
      this.dateLocal = "";
    }
    this.place = "";
    this.agendaText = "";
  }

  protected errTitle(): string | undefined {
    if (!this.title.trim()) return this.t()("reunions.form.errorTitle");
    return undefined;
  }

  protected errDate(): string | undefined {
    if (!this.dateLocal) return this.t()("reunions.form.errorDate");
    return undefined;
  }

  protected errPlace(): string | undefined {
    if (!this.place.trim()) return this.t()("reunions.form.errorPlace");
    return undefined;
  }

  protected onBackdrop(ev: MouseEvent): void {
    if (ev.target === ev.currentTarget) this.close();
  }

  protected close(): void {
    this.open.set(false);
    this.closed.emit();
  }

  protected submit(): void {
    this.tried = true;
    if (this.errTitle() || this.errDate() || this.errPlace()) return;

    const agenda = this.agendaText.split("\n").map((l) => l.trim()).filter(Boolean);
    const m = this.meeting();

    try {
      if (m) {
        const res = this.store.actions.updateMeeting(m.id, {
          kind: this.kind,
          title: this.title,
          date: this.dateLocal,
          place: this.place,
          agenda,
        });
        if (!res.ok) {
          this.pushError(res.error as MessageKey);
          return;
        }
        this.notify.emit({ kind: "success", text: this.t()("reunions.form.saved") });
        this.open.set(false);
        this.closed.emit();
        return;
      }

      const res = this.store.actions.createMeeting({
        scoopId: this.scoopId,
        kind: this.kind,
        title: this.title,
        date: this.dateLocal,
        place: this.place,
        agenda,
      });
      if (!res.ok) {
        this.pushError(res.error as MessageKey);
        return;
      }
      this.notify.emit({ kind: "success", text: this.t()("reunions.form.created") });
      this.open.set(false);
      this.closed.emit();
      void this.router.navigate(["/reunions", res.id]);
    } catch (e) {
      this.notify.emit({ kind: "error", text: this.exceptionText(e) });
    }
  }

  private pushError(key: MessageKey): void {
    this.notify.emit({ kind: "error", text: this.locale.tNow(key) });
  }

  private exceptionText(e: unknown): string {
    if (e instanceof AccessDeniedError) return this.locale.tNow(e.key);
    return e instanceof Error ? e.message : String(e);
  }
}
