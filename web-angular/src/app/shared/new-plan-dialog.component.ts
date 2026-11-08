import { Component, computed, effect, inject, input, model, signal, untracked } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { LucideAngularModule, Search } from "lucide-angular";

import { currentCampaign, isOpenCampaign } from "@/lib/campaigns";
import type { MessageKey } from "@/lib/i18n";
import type { Producer } from "@/lib/mock/data";
import { inScope } from "@/lib/scope";
import { LocaleService } from "./locale.service";
import { StoreService } from "./store.service";
import { UiButtonComponent } from "./ui/button.component";
import { UiModalA11yDirective } from "./ui/modal-a11y.directive";

const fullName = (p: Producer) => `${p.firstName} ${p.lastName}`;

@Component({
  selector: "app-new-plan-dialog",
  imports: [FormsModule, LucideAngularModule, UiButtonComponent, UiModalA11yDirective],
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
          <h2 class="text-lg font-semibold">{{ t()("plans.dialog.title") }}</h2>
          <p class="mt-1 text-sm text-muted-foreground">{{ t()("plans.dialog.description") }}</p>
          @if (error()) {
            <p class="mt-2 text-sm text-destructive">{{ error() }}</p>
          }
          <form class="mt-4 space-y-4" (ngSubmit)="submit()">
            @if (!producerId()) {
              <div>
                <label class="block text-sm font-medium" for="np-find">{{ t()("plans.dialog.producer") }} *</label>
                <p class="text-xs text-muted-foreground">{{ t()("plans.dialog.producerHint") }}</p>
                <div class="relative mt-1">
                  <lucide-angular
                    [img]="icons.search"
                    class="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    id="np-find"
                    class="flex h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-sm"
                    [attr.aria-label]="t()('plans.dialog.findAria')"
                    [ngModel]="find()"
                    (ngModelChange)="find.set($event)"
                    name="find"
                  />
                </div>
                <select
                  id="np-producer"
                  class="mt-2 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                  [ngModel]="pid()"
                  (ngModelChange)="pid.set($event)"
                  name="producer"
                  required
                >
                  <option value="">{{ t()("plans.dialog.choose") }}</option>
                  @for (p of listed(); track p.id) {
                    <option [value]="p.id">{{ fullName(p) }} · {{ p.village }}</option>
                  }
                </select>
              </div>
            }
            <div>
              <label class="block text-sm font-medium" for="np-campaign">{{ t()("plans.dialog.campaign") }} *</label>
              <select
                id="np-campaign"
                class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                [ngModel]="campaign()"
                (ngModelChange)="campaign.set($event)"
                name="campaign"
                required
              >
                @for (c of openCampaigns(); track c.id) {
                  <option [value]="c.name">{{ c.name }}</option>
                }
              </select>
            </div>
            <div class="flex justify-end gap-2">
              <ui-button type="button" variant="outline" (click)="close()">{{ t()("campagnes.form.cancel") }}</ui-button>
              <ui-button type="submit" [disabled]="!producer()">{{ t()("plans.dialog.submit") }}</ui-button>
            </div>
          </form>
        </div>
      </div>
    }
  `,
})
export class NewPlanDialogComponent {
  readonly open = model(false);
  readonly producerId = input<string | undefined>(undefined);

  private readonly store = inject(StoreService);
  private readonly locale = inject(LocaleService);
  private readonly router = inject(Router);
  protected readonly t = this.locale.t;
  protected readonly icons = { search: Search };
  protected readonly fullName = fullName;

  protected readonly find = signal("");
  protected readonly pid = signal("");
  protected readonly campaign = signal("");
  protected readonly error = signal("");

  private readonly choices = computed(() => {
    const s = this.store.state();
    return s.producers
      .filter((p) => !p.mergedInto && inScope([p], s.session).length === 1)
      .sort((a, b) => fullName(a).localeCompare(fullName(b), "fr"));
  });

  protected readonly listed = computed(() => {
    const needle = this.find().trim().toLowerCase();
    return this.choices()
      .filter((p) => !needle || `${fullName(p)} ${p.village}`.toLowerCase().includes(needle))
      .slice(0, 50);
  });

  protected readonly openCampaigns = computed(() =>
    this.store.state().campaigns.filter(isOpenCampaign),
  );

  protected readonly producer = computed(() => {
    const fixed = this.producerId();
    if (fixed) return this.choices().find((p) => p.id === fixed);
    return this.choices().find((p) => p.id === this.pid());
  });

  constructor() {
    effect(() => {
      if (!this.open()) return;
      untracked(() => {
        const all = this.store.state().campaigns;
        const def =
          currentCampaign(all, new Date().toISOString().slice(0, 10))?.name ??
          all.filter(isOpenCampaign)[0]?.name ??
          "";
        this.campaign.set(def);
        this.error.set("");
        const pid = this.producerId();
        if (pid) this.pid.set(pid);
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
    const producer = this.producer();
    if (!producer) return;
    const res = this.store.actions.createPlan({
      scoopId: producer.scoopId,
      producerId: producer.id,
      campaign: this.campaign(),
      lines: [],
    });
    if (!res.ok) {
      this.error.set(this.locale.tNow(res.error as MessageKey));
      return;
    }
    this.close();
    void this.router.navigate(["/plans", res.id]);
  }
}
