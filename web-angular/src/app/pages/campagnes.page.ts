import { Component, computed, effect, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CalendarRange, Lock, LucideAngularModule, Pencil, Play, Plus, Search } from "lucide-angular";

import { currentCampaign, isOpenCampaign } from "@/lib/campaigns";
import { fmtDate, nf } from "@/lib/format";
import type { MessageKey } from "@/lib/i18n";
import type { Campaign, CampaignStatus } from "@/lib/mock/agronomy";
import { AppShellComponent } from "../shared/app-shell.component";
import {
  CAMPAIGN_STATUS_LABEL,
  CAMPAIGN_TONE,
} from "../shared/campaign-labels";
import { CampaignFormDialogComponent } from "../shared/campaign-form-dialog.component";
import { CampaignSheetComponent } from "../shared/campaign-sheet.component";
import { ExtraModuleGateComponent } from "../shared/extra-module-gate.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { UiButtonComponent } from "../shared/ui/button.component";
import { UiChipRailComponent } from "../shared/ui/chip-rail.component";
import { UiDialogComponent } from "../shared/ui/dialog.component";
import { UiEmptyComponent } from "../shared/ui/empty.component";
import { UiKpiTileComponent } from "../shared/ui/kpi-tile.component";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiPillComponent } from "../shared/ui/pill.component";

const FILTERS: { status: CampaignStatus; label: MessageKey }[] = [
  { status: "en cours", label: "campagnes.filter.running" },
  { status: "planifiée", label: "campagnes.filter.planned" },
  { status: "clôturée", label: "campagnes.filter.closed" },
];

interface CampRow {
  campaign: Campaign;
  plans: number;
  plots: number;
  used: boolean;
}

type ConfirmKind = "open" | "close";

@Component({
  selector: "app-campagnes-page",
  imports: [
    FormsModule,
    LucideAngularModule,
    ExtraModuleGateComponent,
    AppShellComponent,
    CampaignFormDialogComponent,
    CampaignSheetComponent,
    UiChipRailComponent,
    UiDialogComponent,
    UiEmptyComponent,
    UiKpiTileComponent,
    UiPageHeaderComponent,
    UiPillComponent,
    UiButtonComponent,
  ],
  template: `
    <app-extra-module-gate>
      <app-shell perm="campaign.read" [area]="t()('campagnes.area')">
        @if (toast()) {
          <p class="mb-3 text-sm text-muted-foreground">{{ toast() }}</p>
        }
        <ui-page-header
          [eyebrow]="t()('campagnes.eyebrow')"
          [title]="t()('campagnes.title')"
          [description]="t()('campagnes.description')"
        >
          @if (store.can('campaign.manage')) {
            <ui-button actions type="button" size="lg" (click)="openCreate()">
              <lucide-angular [img]="icons.plus" class="size-4" />
              {{ t()("campagnes.new") }}
            </ui-button>
          }
        </ui-page-header>

        <div class="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-5">
          <ui-kpi-tile [label]="t()('campagnes.kpi.running')" [value]="nf.format(kpi().running)" />
          <ui-kpi-tile [label]="t()('campagnes.kpi.planned')" [value]="nf.format(kpi().planned)" />
          <ui-kpi-tile [label]="t()('campagnes.kpi.closed')" [value]="nf.format(kpi().closed)" />
          <ui-kpi-tile
            [label]="t()('campagnes.kpi.plans')"
            [value]="nf.format(kpi().plans)"
            [sub]="
              kpi().currentName
                ? t()('campagnes.kpi.currentName', { name: kpi().currentName ?? '' })
                : t()('campagnes.kpi.noCurrent')
            "
          />
          <ui-kpi-tile
            [label]="t()('campagnes.kpi.plots')"
            [value]="nf.format(kpi().plots)"
            [sub]="
              kpi().currentName
                ? t()('campagnes.kpi.currentName', { name: kpi().currentName ?? '' })
                : t()('campagnes.kpi.noCurrent')
            "
          />
        </div>

        <div class="surface mb-3 p-3">
          <div class="flex flex-wrap items-center gap-2">
            <ui-chip-rail>
              <button type="button" class="chip-filter" [class.chip-filter-active]="filter() === 'tous'" (click)="filter.set('tous')">
                {{ t()("campagnes.filter.all") }}
                <span class="chip-filter-count">{{ rows().length }}</span>
              </button>
              @for (f of filters; track f.status) {
                <button
                  type="button"
                  class="chip-filter"
                  [class.chip-filter-active]="filter() === f.status"
                  (click)="filter.set(filter() === f.status ? 'tous' : f.status)"
                >
                  {{ t()(f.label) }}
                  <span class="chip-filter-count">{{ rows().filter((r) => r.campaign.status === f.status).length }}</span>
                </button>
              }
            </ui-chip-rail>
            <div class="relative ml-auto w-full sm:w-64">
              <lucide-angular [img]="icons.search" class="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                class="flex h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-sm"
                [attr.aria-label]="t()('campagnes.search.aria')"
                [placeholder]="t()('campagnes.search.placeholder')"
                [ngModel]="q()"
                (ngModelChange)="q.set($event)"
              />
            </div>
          </div>
        </div>

        <div class="surface overflow-x-auto">
          @if (shown().length) {
            <table class="w-full text-sm">
              <thead class="border-b bg-muted text-left text-xs text-muted-foreground">
                <tr>
                  <th class="px-4 py-3 font-semibold">{{ t()("campagnes.col.name") }}</th>
                  <th class="hidden font-semibold sm:table-cell">{{ t()("campagnes.col.period") }}</th>
                  <th class="font-semibold">{{ t()("campagnes.col.status") }}</th>
                  <th class="hidden text-right font-semibold md:table-cell">{{ t()("campagnes.col.plans") }}</th>
                  <th class="hidden px-4 text-right font-semibold md:table-cell">{{ t()("campagnes.col.plots") }}</th>
                  <th class="w-28 pr-4"></th>
                </tr>
              </thead>
              <tbody class="divide-y">
                @for (r of shown(); track r.campaign.id) {
                  <tr
                    class="cursor-pointer hover:bg-muted/60"
                    [class.text-muted-foreground]="r.campaign.status === 'clôturée'"
                    (click)="detailId.set(r.campaign.id)"
                  >
                    <td class="px-4 py-3 font-semibold text-primary">{{ r.campaign.name }}</td>
                    <td class="hidden py-3 sm:table-cell">{{ period(r.campaign) }}</td>
                    <td>
                      <ui-pill [tone]="CAMPAIGN_TONE[r.campaign.status]">{{ t()(CAMPAIGN_STATUS_LABEL[r.campaign.status]) }}</ui-pill>
                    </td>
                    <td class="hidden text-right tabular md:table-cell">{{ nf.format(r.plans) }}</td>
                    <td class="hidden px-4 text-right tabular md:table-cell">{{ nf.format(r.plots) }}</td>
                    <td class="pr-4 text-right" (click)="$event.stopPropagation()">
                      @if (store.can("campaign.manage")) {
                        @if (isOpenCampaign(r.campaign)) {
                          <button type="button" class="rounded p-1 hover:bg-muted" (click)="openEdit(r)" [attr.aria-label]="t()('campagnes.row.edit')">
                            <lucide-angular [img]="icons.edit" class="size-4" />
                          </button>
                        }
                        @if (r.campaign.status === 'planifiée') {
                          <button type="button" class="rounded p-1 hover:bg-muted" (click)="setConfirm('open', r.campaign)" [attr.aria-label]="t()('campagnes.row.open')">
                            <lucide-angular [img]="icons.play" class="size-4" />
                          </button>
                        }
                        @if (r.campaign.status !== 'clôturée') {
                          <button type="button" class="rounded p-1 hover:bg-muted" (click)="setConfirm('close', r.campaign)" [attr.aria-label]="t()('campagnes.row.close')">
                            <lucide-angular [img]="icons.lock" class="size-4" />
                          </button>
                        }
                      }
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          } @else {
            <ui-empty>
              <lucide-angular [img]="icons.cal" class="mx-auto mb-2 size-8 text-muted-foreground" />
              <p class="font-semibold">{{ t()("campagnes.empty.title") }}</p>
              <p class="mt-1 text-sm">
                {{ rows().length ? t()("campagnes.empty.filtered") : store.can("campaign.manage") ? t()("campagnes.empty.create") : t()("campagnes.empty.readonly") }}
              </p>
            </ui-empty>
          }
        </div>
        <p class="mt-2 text-xs text-muted-foreground">
          {{ t()("campagnes.count.autre", { count: shown().length, total: rows().length }) }}
        </p>

        <app-campaign-form-dialog [(open)]="createOpen" (saved)="onSaved()" />
        @if (editing(); as ed) {
          <app-campaign-form-dialog
            [(open)]="editOpen"
            [campaign]="ed.campaign"
            [nameLocked]="ed.used"
            (saved)="onSaved()"
          />
        }

        <ui-dialog [(open)]="confirmOpen" [title]="confirmTitle()">
          <p class="text-sm text-muted-foreground">{{ confirmText() }}</p>
          <div actions class="flex gap-2">
            <ui-button type="button" variant="outline" (click)="confirmOpen.set(false)">{{ t()("campagnes.form.cancel") }}</ui-button>
            <ui-button type="button" [variant]="confirmKind() === 'close' ? 'destructive' : 'default'" (click)="runConfirm()">
              {{ confirmSubmit() }}
            </ui-button>
          </div>
        </ui-dialog>

        @if (detailCampaign(); as dc) {
          <app-campaign-sheet [(open)]="sheetOpen" [campaign]="dc" />
        }
      </app-shell>
    </app-extra-module-gate>
  `,
})
export default class CampagnesPage {
  protected readonly store = inject(StoreService);
  private readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly icons = { plus: Plus, search: Search, cal: CalendarRange, edit: Pencil, play: Play, lock: Lock };
  protected readonly filters = FILTERS;
  protected readonly CAMPAIGN_TONE = CAMPAIGN_TONE;
  protected readonly CAMPAIGN_STATUS_LABEL = CAMPAIGN_STATUS_LABEL;
  protected readonly isOpenCampaign = isOpenCampaign;

  protected readonly filter = signal<CampaignStatus | "tous">("tous");
  protected readonly q = signal("");
  protected readonly createOpen = signal(false);
  protected readonly editOpen = signal(false);
  protected readonly editing = signal<CampRow | null>(null);
  protected readonly confirmOpen = signal(false);
  protected readonly confirmKind = signal<ConfirmKind>("open");
  protected readonly confirmCampaign = signal<Campaign | null>(null);
  protected readonly detailId = signal<string | null>(null);
  protected readonly sheetOpen = signal(false);
  protected readonly toast = signal("");

  protected readonly rows = computed((): CampRow[] => {
    const s = this.store.state();
    const planCount = new Map<string, number>();
    for (const p of s.plans) planCount.set(p.campaign, (planCount.get(p.campaign) ?? 0) + 1);
    const plotCount = new Map<string, number>();
    for (const p of s.plots) plotCount.set(p.campaign, (plotCount.get(p.campaign) ?? 0) + 1);
    return s.campaigns.map((campaign) => {
      const np = planCount.get(campaign.name) ?? 0;
      const nl = plotCount.get(campaign.name) ?? 0;
      return { campaign, plans: np, plots: nl, used: np + nl > 0 };
    });
  });

  protected readonly kpi = computed(() => {
    const campaigns = this.store.state().campaigns;
    const current = currentCampaign(campaigns, new Date().toISOString().slice(0, 10));
    const row = current && this.rows().find((r) => r.campaign.id === current.id);
    return {
      running: campaigns.filter((c) => c.status === "en cours").length,
      planned: campaigns.filter((c) => c.status === "planifiée").length,
      closed: campaigns.filter((c) => c.status === "clôturée").length,
      currentName: current?.name,
      plans: row?.plans ?? 0,
      plots: row?.plots ?? 0,
    };
  });

  protected readonly shown = computed(() => {
    const needle = this.q().trim().toLowerCase();
    const f = this.filter();
    return this.rows().filter(
      (r) =>
        (f === "tous" || r.campaign.status === f) &&
        (!needle || r.campaign.name.toLowerCase().includes(needle)),
    );
  });

  protected readonly detailCampaign = computed(() => {
    const id = this.detailId();
    return id ? (this.store.state().campaigns.find((c) => c.id === id) ?? null) : null;
  });

  constructor() {
    effect(() => {
      const id = this.detailId();
      this.sheetOpen.set(!!id);
    });
    effect(() => {
      if (!this.sheetOpen()) this.detailId.set(null);
    });
  }

  period(c: Campaign): string {
    return this.t()("campagnes.period", { start: fmtDate(c.start), end: fmtDate(c.end) });
  }

  openCreate(): void {
    this.createOpen.set(true);
  }

  openEdit(row: CampRow): void {
    this.editing.set(row);
    this.editOpen.set(true);
  }

  setConfirm(kind: ConfirmKind, campaign: Campaign): void {
    this.confirmKind.set(kind);
    this.confirmCampaign.set(campaign);
    this.confirmOpen.set(true);
  }

  confirmTitle(): string {
    return this.t()(this.confirmKind() === "open" ? "campagnes.open.title" : "campagnes.close.title");
  }

  confirmText(): string {
    const c = this.confirmCampaign();
    if (!c) return "";
    return this.t()(
      this.confirmKind() === "open" ? "campagnes.open.description" : "campagnes.close.description",
      { name: c.name },
    );
  }

  confirmSubmit(): string {
    return this.t()(this.confirmKind() === "open" ? "campagnes.open.confirm" : "campagnes.close.confirm");
  }

  runConfirm(): void {
    const c = this.confirmCampaign();
    if (!c) return;
    const res = this.store.actions.setCampaignStatus(
      c.id,
      this.confirmKind() === "open" ? "en cours" : "clôturée",
    );
    this.confirmOpen.set(false);
    this.toast.set(
      res.ok
        ? this.t()(this.confirmKind() === "open" ? "campagnes.opened" : "campagnes.closed")
        : this.locale.tNow(res.error as MessageKey),
    );
  }

  onSaved(): void {
    this.editing.set(null);
    this.toast.set(this.t()("campagnes.saved"));
  }
}
