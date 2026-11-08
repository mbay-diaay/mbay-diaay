import { Component, computed, inject, input, model, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";

import type { MessageKey } from "@/lib/i18n";
import { OPERATION_KINDS, type OperationKind } from "@/lib/mock/agronomy";
import { KIND_LABEL, todayIso } from "./follow-kinds";
import { LocaleService } from "./locale.service";
import { StoreService } from "./store.service";
import { UiButtonComponent } from "./ui/button.component";
import { UiModalA11yDirective } from "./ui/modal-a11y.directive";

export interface OperationTarget {
  planId: string;
  lineIndex: number;
  crop: string;
  stepId: string | null;
  kind: OperationKind | null;
}

@Component({
  selector: "app-operation-done-dialog",
  imports: [FormsModule, UiButtonComponent, UiModalA11yDirective],
  template: `
    @if (open() && target()) {
      @let tg = target()!;
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" (click)="onBackdrop($event)">
        <div
          class="surface max-h-[90vh] w-full max-w-md overflow-y-auto p-6 shadow-lg"
          role="dialog"
          aria-modal="true"
          uiModalA11y
          (dismiss)="close()"
          (click)="$event.stopPropagation()"
        >
          <h2 class="text-lg font-semibold">
            {{
              tg.kind
                ? t()("suivi.dialog.title", { kind: t()(KIND_LABEL[tg.kind]) })
                : t()("suivi.dialog.titleExtra")
            }}
          </h2>
          <p class="mt-1 text-sm text-muted-foreground">{{ t()("suivi.dialog.description", { crop: tg.crop }) }}</p>
          @if (error()) {
            <p class="mt-2 text-sm text-destructive">{{ error() }}</p>
          }
          <form class="mt-4 space-y-4" (ngSubmit)="submit()">
            @if (!tg.kind) {
              <div>
                <label class="block text-sm font-medium" for="od-kind">{{ t()("suivi.dialog.kind") }} *</label>
                <select
                  id="od-kind"
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                  [ngModel]="kind()"
                  (ngModelChange)="kind.set($event)"
                  name="kind"
                >
                  @for (k of kinds; track k) {
                    <option [value]="k">{{ t()(KIND_LABEL[k]) }}</option>
                  }
                </select>
              </div>
            }
            <div>
              <label class="block text-sm font-medium" for="od-date">{{ t()("suivi.dialog.date") }} *</label>
              <input
                id="od-date"
                type="date"
                class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                [ngModel]="doneAt()"
                (ngModelChange)="doneAt.set($event)"
                name="doneAt"
                [max]="today"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium" for="od-note">{{ t()("suivi.dialog.note") }}</label>
              <textarea
                id="od-note"
                class="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                rows="3"
                [ngModel]="note()"
                (ngModelChange)="note.set($event)"
                name="note"
              ></textarea>
            </div>
            <div class="flex justify-end gap-2">
              <ui-button type="button" variant="outline" (click)="close()">{{ t()("suivi.dialog.cancel") }}</ui-button>
              <ui-button type="submit" [disabled]="!doneAt() || future()">{{ t()("suivi.dialog.submit") }}</ui-button>
            </div>
          </form>
        </div>
      </div>
    }
  `,
})
export class OperationDoneDialogComponent {
  readonly open = model(false);
  readonly target = input<OperationTarget | null>(null);

  private readonly store = inject(StoreService);
  private readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly KIND_LABEL = KIND_LABEL;
  protected readonly kinds = OPERATION_KINDS;
  protected readonly today = todayIso();

  protected readonly doneAt = signal(this.today);
  protected readonly kind = signal<OperationKind>("traitement");
  protected readonly note = signal("");
  protected readonly error = signal("");

  protected readonly future = computed(() => this.doneAt() > this.today);

  close(): void {
    this.open.set(false);
  }

  onBackdrop(ev: MouseEvent): void {
    if (ev.target === ev.currentTarget) this.close();
  }

  submit(): void {
    const tg = this.target();
    if (!tg) return;
    const res = this.store.actions.recordOperation({
      planId: tg.planId,
      lineIndex: tg.lineIndex,
      stepId: tg.stepId,
      kind: tg.kind ?? this.kind(),
      doneAt: this.doneAt(),
      note: this.note(),
      photos: [],
    });
    if (!res.ok) {
      this.error.set(this.locale.tNow(res.error as MessageKey));
      return;
    }
    this.close();
  }
}
