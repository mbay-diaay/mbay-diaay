import { Component, computed, inject, input, model } from "@angular/core";
import { RouterLink } from "@angular/router";

import { fmtDate, fmtDateTime } from "@/lib/format";
import type { Campaign } from "@/lib/mock/agronomy";
import { PLAN_STATUS_LABEL, PLAN_TONE } from "@/lib/plans";
import { CAMPAIGN_HISTORY_LABEL, CAMPAIGN_STATUS_LABEL, CAMPAIGN_TONE } from "./campaign-labels";
import { LocaleService } from "./locale.service";
import { StoreService } from "./store.service";
import { UiPillComponent } from "./ui/pill.component";
import { UiSheetComponent } from "./ui/sheet.component";

@Component({
  selector: "app-campaign-sheet",
  imports: [RouterLink, UiSheetComponent, UiPillComponent],
  template: `
    @if (campaign(); as c) {
      <ui-sheet [(open)]="open" [title]="c.name">
        <p class="text-sm text-muted-foreground">{{ t()("campagnes.sheet.description") }}</p>
        <div class="mt-4 space-y-6 text-sm">
          <section class="space-y-2">
            <h3 class="font-semibold">{{ t()("campagnes.sheet.period") }}</h3>
            <p>{{ period(c) }}</p>
            <ui-pill [tone]="CAMPAIGN_TONE[c.status]">{{ t()(CAMPAIGN_STATUS_LABEL[c.status]) }}</ui-pill>
          </section>
          <p class="text-muted-foreground">
            {{ t()("campagnes.sheet.plansCount.autre", { count: planCount() }) }}
            ·
            {{ t()("campagnes.sheet.plotsCount.autre", { count: plotCount() }) }}
          </p>
          @if (plans().length) {
            <section>
              <h3 class="font-semibold">{{ t()("campagnes.sheet.plans") }}</h3>
              <ul class="divide-y">
                @for (p of plans(); track p.id) {
                  <li class="py-2">
                    <a [routerLink]="['/plans', p.id]" class="font-medium text-primary hover:underline">
                      {{ producerName(p.producerId) }}
                    </a>
                    <ui-pill class="ml-2" [tone]="PLAN_TONE[p.status]">{{ t()(PLAN_STATUS_LABEL[p.status]) }}</ui-pill>
                  </li>
                }
              </ul>
            </section>
          }
          <section>
            <h3 class="font-semibold">{{ t()("campagnes.sheet.history") }}</h3>
            <ol class="grid gap-1.5">
              @for (h of history(); track h.at + h.action) {
                <li class="flex flex-wrap gap-x-2">
                  <span class="text-muted-foreground">{{ fmtDateTime(h.at) }}</span>
                  <span class="font-medium">{{ h.by }}</span>
                  <span>{{ historyLabel(h.action) }}</span>
                </li>
              }
            </ol>
          </section>
        </div>
      </ui-sheet>
    }
  `,
})
export class CampaignSheetComponent {
  readonly open = model(false);
  readonly campaign = input<Campaign | null>(null);

  private readonly store = inject(StoreService);
  private readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly fmtDateTime = fmtDateTime;
  protected readonly CAMPAIGN_TONE = CAMPAIGN_TONE;
  protected readonly CAMPAIGN_STATUS_LABEL = CAMPAIGN_STATUS_LABEL;
  protected readonly PLAN_TONE = PLAN_TONE;
  protected readonly PLAN_STATUS_LABEL = PLAN_STATUS_LABEL;

  protected readonly plans = computed(() => {
    const c = this.campaign();
    if (!c) return [];
    return this.store.state().plans.filter((p) => p.campaign === c.name);
  });

  protected readonly planCount = computed(() => this.plans().length);

  protected readonly plotCount = computed(() => {
    const c = this.campaign();
    if (!c) return 0;
    return this.store.state().plots.filter((p) => p.campaign === c.name).length;
  });

  protected readonly history = computed(() => {
    const c = this.campaign();
    return c ? [...c.history].reverse() : [];
  });

  period(c: Campaign): string {
    return this.t()("campagnes.period", { start: fmtDate(c.start), end: fmtDate(c.end) });
  }

  producerName(id: string | null): string {
    if (!id) return this.t()("plans.producerFallback");
    const p = this.store.state().producers.find((x) => x.id === id);
    return p ? `${p.firstName} ${p.lastName}` : id;
  }

  historyLabel(action: string): string {
    const key = CAMPAIGN_HISTORY_LABEL[action];
    return key ? this.t()(key) : action;
  }
}
