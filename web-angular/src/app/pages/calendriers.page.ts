import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { CalendarDays, ExternalLink, FilePlus2, LucideAngularModule, Search } from "lucide-angular";

import { nf, fmtDate } from "@/lib/format";
import type { MessageKey } from "@/lib/i18n";
import type { CropCalendar } from "@/lib/mock/agronomy";
import { AppShellComponent } from "../shared/app-shell.component";
import {
  CALENDAR_STATUS_LABEL,
  CALENDAR_STATUS_TONE,
  cycleDays,
} from "../shared/calendar-kinds";
import { CalendarNewDialogComponent } from "../shared/calendar-new-dialog.component";
import { ExtraModuleGateComponent } from "../shared/extra-module-gate.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { UiButtonComponent } from "../shared/ui/button.component";
import { UiChipRailComponent } from "../shared/ui/chip-rail.component";
import { UiEmptyComponent } from "../shared/ui/empty.component";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiPillComponent } from "../shared/ui/pill.component";

type Filter = "tous" | "validés" | "brouillons" | "sans";

interface CropRow {
  crop: string;
  family: string;
  validated: CropCalendar | undefined;
  draft: CropCalendar | undefined;
  main: CropCalendar | undefined;
}

const FILTERS: [Filter, MessageKey][] = [
  ["tous", "calendriers.filter.all"],
  ["validés", "calendriers.filter.validated"],
  ["brouillons", "calendriers.filter.drafts"],
  ["sans", "calendriers.filter.missing"],
];

@Component({
  selector: "app-calendriers-page",
  imports: [
    FormsModule,
    LucideAngularModule,
    ExtraModuleGateComponent,
    AppShellComponent,
    CalendarNewDialogComponent,
    UiChipRailComponent,
    UiEmptyComponent,
    UiPageHeaderComponent,
    UiPillComponent,
    UiButtonComponent,
  ],
  template: `
    <app-extra-module-gate>
      <app-shell perm="calendar.read" [area]="t()('calendriers.area')">
        @if (feedback()) {
          <p class="mb-3 text-sm text-muted-foreground">{{ feedback() }}</p>
        }
        <ui-page-header
          [eyebrow]="t()('calendriers.eyebrow')"
          [title]="t()('calendriers.title')"
          [description]="t()('calendriers.description')"
        >
          @if (store.can('calendar.write')) {
            <ui-button actions type="button" (click)="openNew('')">
              <lucide-angular [img]="icons.plus" class="size-4" />
              {{ t()("calendriers.new") }}
            </ui-button>
          }
        </ui-page-header>

        <div class="surface mb-3 p-3">
          <div class="flex flex-wrap items-center gap-2">
            <ui-chip-rail>
              @for (f of filters; track f[0]) {
                <button
                  type="button"
                  class="chip-filter"
                  [class.chip-filter-active]="filter() === f[0]"
                  (click)="filter.set(filter() === f[0] && f[0] !== 'tous' ? 'tous' : f[0])"
                >
                  {{ t()(f[1]) }}
                  <span class="chip-filter-count">{{ all().filter(matches[f[0]]).length }}</span>
                </button>
              }
            </ui-chip-rail>
            <div class="relative ml-auto w-full sm:w-64">
              <lucide-angular [img]="icons.search" class="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                class="flex h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-sm"
                [attr.aria-label]="t()('calendriers.search.aria')"
                [placeholder]="t()('calendriers.search.placeholder')"
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
                  <th class="px-4 py-3 font-semibold">{{ t()("calendriers.col.crop") }}</th>
                  <th class="font-semibold">{{ t()("calendriers.col.status") }}</th>
                  <th class="hidden font-semibold sm:table-cell">{{ t()("calendriers.col.version") }}</th>
                  <th class="hidden font-semibold sm:table-cell">{{ t()("calendriers.col.steps") }}</th>
                  <th class="hidden font-semibold md:table-cell">{{ t()("calendriers.col.cycle") }}</th>
                  <th class="hidden font-semibold lg:table-cell">{{ t()("calendriers.col.validated") }}</th>
                  <th class="w-20 pr-4"></th>
                </tr>
              </thead>
              <tbody class="divide-y">
                @for (r of shown(); track r.crop) {
                  <tr
                    [class.cursor-pointer]="r.main"
                    [class.hover:bg-muted/60]="r.main"
                    (click)="r.main && openCal(r.main.id)"
                  >
                    <td class="px-4 py-2.5">
                      <div class="font-semibold">{{ r.crop }}</div>
                      @if (r.family) {
                        <div class="text-xs text-muted-foreground">{{ r.family }}</div>
                      }
                      @if (!r.main) {
                        <div class="text-xs text-warning-fg">{{ t()("calendriers.none") }}</div>
                      }
                    </td>
                    <td>
                      @if (r.main) {
                        <ui-pill [tone]="CALENDAR_STATUS_TONE[r.main.status]">{{ t()(CALENDAR_STATUS_LABEL[r.main.status]) }}</ui-pill>
                      } @else {
                        <span class="text-muted-foreground">-</span>
                      }
                    </td>
                    <td class="hidden sm:table-cell">{{ r.main ? t()("calendriers.version", { n: r.main.version }) : "-" }}</td>
                    <td class="hidden sm:table-cell">
                      {{ r.main ? t()("calendriers.steps.autre", { count: r.main.steps.length }) : "-" }}
                    </td>
                    <td class="hidden md:table-cell">
                      {{ r.main ? t()("calendriers.days.autre", { count: cycleDays(r.main.steps) }) : "-" }}
                    </td>
                    <td class="hidden lg:table-cell">
                      @if (r.main?.validatedBy && r.main.validatedAt) {
                        {{ t()("calendriers.validatedBy", { name: r.main.validatedBy, date: fmtDate(r.main.validatedAt) }) }}
                      } @else {
                        -
                      }
                    </td>
                    <td class="pr-4 text-right" (click)="$event.stopPropagation()">
                      @if (r.main) {
                        <button type="button" class="rounded p-1 hover:bg-muted" (click)="openCal(r.main!.id)">
                          <lucide-angular [img]="icons.link" class="size-4" />
                        </button>
                      } @else if (store.can("calendar.write")) {
                        <button type="button" class="rounded p-1 hover:bg-muted" (click)="openNew(r.crop)">
                          <lucide-angular [img]="icons.plus" class="size-4" />
                        </button>
                      }
                      @if (r.validated && !r.draft && store.can("calendar.write")) {
                        <button type="button" class="rounded p-1 hover:bg-muted" (click)="newVersion(r)">
                          <lucide-angular [img]="icons.plus" class="size-4" />
                        </button>
                      }
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          } @else {
            <ui-empty>
              <lucide-angular [img]="icons.cal" class="mx-auto mb-2 size-8 text-muted-foreground" />
              <p class="font-semibold">{{ t()("calendriers.empty.title") }}</p>
              <p class="mt-1 text-sm">{{ all().length ? t()("calendriers.empty.filtered") : t()("calendriers.empty.none") }}</p>
            </ui-empty>
          }
        </div>
        <p class="mt-2 text-xs text-muted-foreground">
          {{ t()("calendriers.count", { shown: nf.format(shown().length), total: nf.format(all().length) }) }}
        </p>

        <app-calendar-new-dialog [(open)]="newOpen" [initialCrop]="newCrop()" />
      </app-shell>
    </app-extra-module-gate>
  `,
})
export default class CalendriersPage {
  private readonly router = inject(Router);
  protected readonly store = inject(StoreService);
  private readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly fmtDate = fmtDate;
  protected readonly icons = { search: Search, cal: CalendarDays, plus: FilePlus2, link: ExternalLink };
  protected readonly filters = FILTERS;
  protected readonly CALENDAR_STATUS_TONE = CALENDAR_STATUS_TONE;
  protected readonly CALENDAR_STATUS_LABEL = CALENDAR_STATUS_LABEL;
  protected readonly cycleDays = cycleDays;

  protected readonly filter = signal<Filter>("tous");
  protected readonly q = signal("");
  protected readonly newOpen = signal(false);
  protected readonly newCrop = signal("");
  protected readonly feedback = signal("");

  protected readonly matches: Record<Filter, (r: CropRow) => boolean> = {
    tous: () => true,
    validés: (r) => !!r.validated,
    brouillons: (r) => !!r.draft,
    sans: (r) => !r.validated,
  };

  protected readonly all = computed((): CropRow[] => {
    const s = this.store.state();
    const crops = new Map(s.cropRefs.map((r) => [r.name, r.family as string]));
    for (const c of s.calendars) if (!crops.has(c.crop)) crops.set(c.crop, "");
    return [...crops]
      .map(([crop, family]) => {
        const validated = s.calendars.find((c) => c.crop === crop && c.status === "validé");
        const draft = s.calendars.find((c) => c.crop === crop && c.status === "brouillon");
        return { crop, family, validated, draft, main: validated ?? draft };
      })
      .sort((a, b) => Number(!a.main) - Number(!b.main) || a.crop.localeCompare(b.crop, "fr"));
  });

  protected readonly shown = computed(() => {
    const needle = this.q().trim().toLowerCase();
    const f = this.filter();
    return this.all().filter((r) => this.matches[f](r) && (!needle || r.crop.toLowerCase().includes(needle)));
  });

  openNew(crop: string): void {
    this.newCrop.set(crop);
    this.newOpen.set(true);
  }

  openCal(id: string): void {
    void this.router.navigate(["/calendriers", id]);
  }

  newVersion(r: CropRow): void {
    if (!r.validated) return;
    const res = this.store.actions.newCalendarVersion(r.validated.id);
    if (!res.ok) {
      this.feedback.set(this.locale.tNow(res.error as MessageKey));
      return;
    }
    this.feedback.set(this.t()("calendriers.newVersion.created"));
    void this.router.navigate(["/calendriers", res.id]);
  }
}
