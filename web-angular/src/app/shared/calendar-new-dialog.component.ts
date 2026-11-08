import { Component, computed, effect, inject, input, model, signal, untracked } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

import type { MessageKey } from "@/lib/i18n";
import { LocaleService } from "./locale.service";
import { StoreService } from "./store.service";
import { UiButtonComponent } from "./ui/button.component";
import { UiModalA11yDirective } from "./ui/modal-a11y.directive";

@Component({
  selector: "app-calendar-new-dialog",
  imports: [FormsModule, UiButtonComponent, UiModalA11yDirective],
  template: `
    @if (open()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" (click)="onBackdrop($event)">
        <div
          class="surface max-h-[90vh] w-full max-w-md overflow-y-auto p-6 shadow-lg"
          role="dialog"
          aria-modal="true"
          uiModalA11y
          (dismiss)="close()"
          (click)="$event.stopPropagation()"
        >
          <h2 class="text-lg font-semibold">{{ t()("calendriers.new.title") }}</h2>
          <p class="mt-1 text-sm text-muted-foreground">{{ t()("calendriers.new.text") }}</p>
          @if (error()) {
            <p class="mt-2 text-sm text-destructive">{{ error() }}</p>
          }
          <form class="mt-4 space-y-4" (ngSubmit)="submit()">
            @if (free().length) {
              <div>
                <label class="block text-sm font-medium" for="cn-crop">{{ t()("calendriers.new.crop") }} *</label>
                <select
                  id="cn-crop"
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                  [ngModel]="crop()"
                  (ngModelChange)="crop.set($event)"
                  name="crop"
                  required
                >
                  <option value="">{{ t()("calendriers.new.choose") }}</option>
                  @for (r of free(); track r.name) {
                    <option [value]="r.name">{{ r.name }}</option>
                  }
                </select>
              </div>
            } @else {
              <p class="text-sm text-muted-foreground">{{ t()("calendriers.new.none") }}</p>
            }
            <div class="flex justify-end gap-2">
              <ui-button type="button" variant="outline" (click)="close()">{{ t()("calendriers.cancel") }}</ui-button>
              <ui-button type="submit" [disabled]="!value()">{{ t()("calendriers.new.submit") }}</ui-button>
            </div>
          </form>
        </div>
      </div>
    }
  `,
})
export class CalendarNewDialogComponent {
  readonly open = model(false);
  readonly initialCrop = input("");

  private readonly store = inject(StoreService);
  private readonly locale = inject(LocaleService);
  private readonly router = inject(Router);
  protected readonly t = this.locale.t;

  protected readonly crop = signal("");
  protected readonly error = signal("");

  protected readonly free = computed(() => {
    const s = this.store.state();
    return s.cropRefs.filter(
      (r) => !s.calendars.some((c) => c.crop === r.name && c.status === "brouillon"),
    );
  });

  protected readonly value = computed(() => {
    const c = this.crop();
    return this.free().some((r) => r.name === c) ? c : "";
  });

  constructor() {
    effect(() => {
      if (!this.open()) return;
      untracked(() => {
        this.crop.set(this.initialCrop());
        this.error.set("");
      });
    });
  }

  close(): void {
    this.open.set(false);
  }

  onBackdrop(ev: MouseEvent): void {
    if (ev.target === ev.currentTarget) this.close();
  }

  submit(): void {
    const crop = this.value();
    if (!crop) return;
    const res = this.store.actions.createCalendar(crop);
    if (!res.ok) {
      this.error.set(this.locale.tNow(res.error as MessageKey));
      return;
    }
    this.close();
    void this.router.navigate(["/calendriers", res.id]);
  }
}
