import { Component, computed, effect, inject, input, model, output, signal, untracked } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { campaignIssues } from "@/lib/campaigns";
import type { MessageKey } from "@/lib/i18n";
import type { Campaign } from "@/lib/mock/agronomy";
import { LocaleService } from "./locale.service";
import { StoreService } from "./store.service";
import { UiButtonComponent } from "./ui/button.component";
import { UiModalA11yDirective } from "./ui/modal-a11y.directive";

type Field = "name" | "start" | "end";

@Component({
  selector: "app-campaign-form-dialog",
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
          <h2 class="text-lg font-semibold">
            {{ t()(campaign() ? "campagnes.form.editTitle" : "campagnes.form.createTitle") }}
          </h2>
          <p class="mt-1 text-sm text-muted-foreground">{{ t()("campagnes.form.description") }}</p>
          @if (error()) {
            <p class="mt-2 text-sm text-destructive">{{ error() }}</p>
          }
          <form class="mt-4 space-y-4" (ngSubmit)="submit()">
            <div>
              <label class="block text-sm font-medium" for="cf-name">{{ t()("campagnes.form.name") }} *</label>
              <p class="text-xs text-muted-foreground">
                {{ t()(nameLocked() ? "campagnes.form.nameLocked" : "campagnes.form.nameHint") }}
              </p>
              <input
                id="cf-name"
                class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                [readOnly]="nameLocked()"
                [placeholder]="t()('campagnes.form.namePlaceholder')"
                [ngModel]="name()"
                (ngModelChange)="onName($event)"
                (blur)="touch('name')"
                name="name"
                autocomplete="off"
              />
              @if (fieldError("name")) {
                <p class="mt-1 text-xs text-destructive">{{ fieldError("name") }}</p>
              }
            </div>
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label class="block text-sm font-medium" for="cf-start">{{ t()("campagnes.form.start") }} *</label>
                <input
                  id="cf-start"
                  type="date"
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                  [ngModel]="start()"
                  (ngModelChange)="onStart($event)"
                  (blur)="touch('start')"
                  name="start"
                />
                @if (fieldError("start")) {
                  <p class="mt-1 text-xs text-destructive">{{ fieldError("start") }}</p>
                }
              </div>
              <div>
                <label class="block text-sm font-medium" for="cf-end">{{ t()("campagnes.form.end") }} *</label>
                <input
                  id="cf-end"
                  type="date"
                  class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                  [ngModel]="end()"
                  (ngModelChange)="onEnd($event)"
                  (blur)="touch('end')"
                  name="end"
                />
                @if (fieldError("end")) {
                  <p class="mt-1 text-xs text-destructive">{{ fieldError("end") }}</p>
                }
              </div>
            </div>
            <div class="flex justify-end gap-2">
              <ui-button type="button" variant="outline" (click)="close()">{{ t()("campagnes.form.cancel") }}</ui-button>
              <ui-button type="submit" [disabled]="issues().length > 0">
                {{ t()(campaign() ? "campagnes.form.save" : "campagnes.form.create") }}
              </ui-button>
            </div>
          </form>
        </div>
      </div>
    }
  `,
})
export class CampaignFormDialogComponent {
  readonly open = model(false);
  readonly campaign = input<Campaign | undefined>(undefined);
  readonly nameLocked = input(false);
  readonly saved = output<void>();

  private readonly store = inject(StoreService);
  private readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;

  protected readonly name = signal("");
  protected readonly start = signal("");
  protected readonly end = signal("");
  protected readonly touched = signal<Record<Field, boolean>>({ name: false, start: false, end: false });
  protected readonly error = signal("");

  protected readonly issues = computed(() =>
    campaignIssues(
      { name: this.name(), start: this.start(), end: this.end() },
      this.store.state().campaigns,
      this.campaign()?.id,
    ),
  );

  constructor() {
    effect(() => {
      if (!this.open()) return;
      const c = this.campaign();
      untracked(() => {
        this.name.set(c?.name ?? "");
        this.start.set(c?.start ?? "");
        this.end.set(c?.end ?? "");
        this.touched.set({ name: false, start: false, end: false });
        this.error.set("");
      });
    });
  }

  touch(f: Field): void {
    this.touched.update((s) => ({ ...s, [f]: true }));
  }

  onName(v: string): void {
    this.name.set(v);
    this.touch("name");
  }

  onStart(v: string): void {
    this.start.set(v);
    this.touch("start");
  }

  onEnd(v: string): void {
    this.end.set(v);
    this.touch("end");
  }

  fieldError(f: Field): string | undefined {
    const i = this.issues().find((x) => x.field === f);
    if (!i || !this.touched()[f]) return undefined;
    if (f === "name" && this.nameLocked()) return undefined;
    return this.t()(i.key);
  }

  close(): void {
    this.open.set(false);
  }

  onBackdrop(ev: MouseEvent): void {
    if (ev.target === ev.currentTarget) this.close();
  }

  submit(): void {
    const input = { name: this.name(), start: this.start(), end: this.end() };
    const c = this.campaign();
    const res = c
      ? this.store.actions.updateCampaign(c.id, input)
      : this.store.actions.createCampaign(input);
    if (!res.ok) {
      this.error.set(this.locale.tNow(res.error as MessageKey));
      return;
    }
    this.close();
    this.saved.emit();
  }
}
