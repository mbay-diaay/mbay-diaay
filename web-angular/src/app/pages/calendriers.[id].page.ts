import { Component, computed, effect, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { map } from "rxjs";
import { CalendarDays, FilePlus2, LucideAngularModule, Plus, Save, Trash2 } from "lucide-angular";

import { addDays, calendarIssues, canEditCalendar } from "@/lib/agronomy";
import { fmtDate, fmtDateTime } from "@/lib/format";
import type { MessageKey } from "@/lib/i18n";
import { OPERATION_KINDS, type CalendarStep, type CropCalendar, type OperationKind } from "@/lib/mock/agronomy";
import { AppShellComponent } from "../shared/app-shell.component";
import {
  CALENDAR_HISTORY_LABEL,
  CALENDAR_STATUS_LABEL,
  CALENDAR_STATUS_TONE,
  OPERATION_KIND_LABEL,
  describeOffset,
  placeableSteps,
} from "../shared/calendar-kinds";
import { ExtraModuleGateComponent } from "../shared/extra-module-gate.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { UiButtonComponent } from "../shared/ui/button.component";
import { UiDialogComponent } from "../shared/ui/dialog.component";
import { UiEmptyComponent } from "../shared/ui/empty.component";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiPillComponent } from "../shared/ui/pill.component";

const HELP: Record<CropCalendar["status"], MessageKey> = {
  brouillon: "calendriers.status.help.brouillon",
  validé: "calendriers.status.help.validé",
  remplacé: "calendriers.status.help.remplacé",
};

const EXAMPLE_SOWING = "2026-10-15";

@Component({
  selector: "app-calendrier-detail-page",
  imports: [
    FormsModule,
    RouterLink,
    LucideAngularModule,
    ExtraModuleGateComponent,
    AppShellComponent,
    UiButtonComponent,
    UiDialogComponent,
    UiEmptyComponent,
    UiPageHeaderComponent,
    UiPillComponent,
  ],
  template: `
    <app-extra-module-gate>
      <app-shell perm="calendar.read" [area]="t()('calendriers.detail.area')">
        @if (feedback()) {
          <p class="mb-3 text-sm text-muted-foreground">{{ feedback() }}</p>
        }
        @if (!cal()) {
          <ui-empty>
            <lucide-angular [img]="icons.cal" class="mx-auto mb-2 size-8 text-muted-foreground" />
            <p class="font-semibold">{{ t()("calendriers.detail.notFound.title") }}</p>
            <p class="mt-1 text-sm">{{ t()("calendriers.detail.notFound.text") }}</p>
            <a routerLink="/calendriers" class="mt-3 inline-block text-primary hover:underline">{{ t()("calendriers.detail.back") }}</a>
          </ui-empty>
        } @else if (cal(); as c) {
          <nav [attr.aria-label]="t()('calendriers.detail.breadcrumb')" class="mb-4 text-sm">
            <ol class="flex flex-wrap items-center gap-1.5 text-muted-foreground">
              <li><a routerLink="/calendriers" class="hover:text-foreground hover:underline">{{ t()("calendriers.title") }}</a></li>
              <li aria-hidden>/</li>
              <li aria-current="page" class="font-medium text-foreground">{{ c.crop }}</li>
            </ol>
          </nav>

          <ui-page-header
            [eyebrow]="t()('calendriers.detail.eyebrow', { n: c.version })"
            [title]="t()('calendriers.detail.title', { crop: c.crop })"
            [description]="detailDesc(c)"
          >
            <ui-pill actions [tone]="CALENDAR_STATUS_TONE[c.status]">{{ t()(CALENDAR_STATUS_LABEL[c.status]) }}</ui-pill>
          </ui-page-header>

          <p class="mb-4 rounded-md border bg-muted/50 p-3 text-sm" role="note">
            {{ draft() && !store.can("calendar.write") ? t()("calendriers.status.help.brouillon.readonly") : t()(HELP[c.status]) }}
          </p>

          <section class="surface mb-4 p-4">
            <h2 class="font-semibold">{{ t()("calendriers.timeline.title") }}</h2>
            <p class="mb-3 text-sm text-muted-foreground">{{ t()("calendriers.timeline.intro") }}</p>
            @if (timeline().length) {
              <ol class="grid gap-2">
                @for (s of timeline(); track s.id) {
                  <li class="rounded-md border p-3 text-sm">
                    <div class="font-semibold">{{ t()(OPERATION_KIND_LABEL[s.kind]) }}</div>
                    <div class="text-muted-foreground">
                      {{ describeOffset(t(), s.offsetDays) }}
                      ·
                      {{ t()("calendriers.duration.autre", { count: s.durationDays }) }}
                    </div>
                  </li>
                }
              </ol>
            } @else {
              <p class="text-sm text-muted-foreground">{{ t()("calendriers.timeline.empty") }}</p>
            }
          </section>

          <section class="surface mb-4 p-4">
            <h2 class="mb-3 font-semibold">{{ t()("calendriers.steps.title") }}</h2>
            @if (editable()) {
              @for (s of steps(); track s.id; let i = $index) {
                <div class="mb-3 grid gap-2 rounded-md border p-3 sm:grid-cols-[2fr_1fr_1fr_auto]">
                  <select
                    class="h-9 rounded-md border px-2 text-sm"
                    [ngModel]="s.kind"
                    (ngModelChange)="patchStep(s.id, { kind: $event })"
                  >
                    @for (k of kinds; track k) {
                      <option [value]="k">{{ t()(OPERATION_KIND_LABEL[k]) }}</option>
                    }
                  </select>
                  <input
                    type="number"
                    class="h-9 rounded-md border px-2 text-sm"
                    [ngModel]="s.offsetDays"
                    (ngModelChange)="patchStep(s.id, { offsetDays: +$event })"
                  />
                  <input
                    type="number"
                    class="h-9 rounded-md border px-2 text-sm"
                    [ngModel]="s.durationDays"
                    (ngModelChange)="patchStep(s.id, { durationDays: +$event })"
                  />
                  <button type="button" class="rounded p-2 hover:bg-muted" (click)="removeStep(s.id)">
                    <lucide-angular [img]="icons.trash" class="size-4" />
                  </button>
                  <textarea
                    class="col-span-full rounded-md border px-2 py-1 text-sm"
                    rows="2"
                    [placeholder]="t()('calendriers.field.note')"
                    [ngModel]="s.note"
                    (ngModelChange)="patchStep(s.id, { note: $event })"
                  ></textarea>
                </div>
              }
              <ui-button type="button" variant="outline" (click)="addStep()">
                <lucide-angular [img]="icons.plus" class="size-4" />
                {{ t()("calendriers.step.add") }}
              </ui-button>
            } @else if (c.steps.length) {
              <ul class="divide-y text-sm">
                @for (s of sortedSteps(c.steps); track s.id) {
                  <li class="py-2">
                    <span class="font-semibold">{{ t()(OPERATION_KIND_LABEL[s.kind]) }}</span>
                    <span class="text-muted-foreground">
                      · {{ describeOffset(t(), s.offsetDays) }}
                      · {{ t()("calendriers.duration.autre", { count: s.durationDays }) }}
                    </span>
                  </li>
                }
              </ul>
            } @else {
              <p class="text-sm text-muted-foreground">{{ t()("calendriers.steps.emptyRead") }}</p>
            }
          </section>

          <div class="mb-6 flex flex-wrap items-center gap-2">
            @if (editable()) {
              <ui-button type="button" [disabled]="!dirty()" (click)="save()">
                <lucide-angular [img]="icons.save" class="size-4" />
                {{ t()("calendriers.save") }}
              </ui-button>
              @if (store.can("calendar.validate")) {
                <ui-button type="button" variant="outline" [disabled]="dirty()" (click)="validateOpen.set(true)">
                  {{ t()("calendriers.validate") }}
                </ui-button>
              }
              <ui-button type="button" variant="outline" class="text-danger-fg" (click)="deleteOpen.set(true)">
                {{ t()("calendriers.delete") }}
              </ui-button>
            }
            @if (c.status === 'validé' && store.can('calendar.write') && !otherDraft()) {
              <ui-button type="button" (click)="newVersion()">
                <lucide-angular [img]="icons.plus" class="size-4" />
                {{ t()("calendriers.newVersion") }}
              </ui-button>
            }
          </div>

          @if (previewRows().length) {
            <section class="surface mb-4 p-4">
              <h2 class="font-semibold">{{ t()("calendriers.preview.title") }}</h2>
              <p class="mb-3 text-sm text-muted-foreground">{{ t()("calendriers.preview.intro") }}</p>
              <table class="w-full text-sm">
                <tbody class="divide-y">
                  @for (row of previewRows(); track row.s.id) {
                    <tr>
                      <td class="py-2 pr-3 font-medium">{{ t()(OPERATION_KIND_LABEL[row.s.kind]) }}</td>
                      <td class="py-2 pr-3">{{ row.from }}</td>
                      <td class="py-2">{{ row.to }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </section>
          }

          <section class="surface p-4">
            <h2 class="mb-3 font-semibold">{{ t()("calendriers.history.title") }}</h2>
            <ol class="grid gap-1.5 text-sm">
              @for (h of c.history.slice().reverse(); track h.at + h.action) {
                <li class="flex flex-wrap gap-x-2">
                  <span class="text-muted-foreground">{{ fmtDateTime(h.at) }}</span>
                  <span class="font-medium">{{ h.by }}</span>
                  <span>{{ historyLabel(h.action) }}</span>
                </li>
              }
            </ol>
          </section>

          <ui-dialog [(open)]="validateOpen" [title]="t()('calendriers.validate.title')">
            <p class="text-sm">{{ t()("calendriers.validate.text") }}</p>
            @if (issues().length) {
              <ul class="mt-2 list-disc pl-5 text-sm text-destructive">
                @for (k of issues(); track k) {
                  <li>{{ t()(k) }}</li>
                }
              </ul>
            } @else {
              <p class="mt-2 text-sm text-success-fg">{{ t()("calendriers.validate.ok") }}</p>
            }
            <div actions class="flex gap-2">
              <ui-button type="button" variant="outline" (click)="validateOpen.set(false)">{{ t()("calendriers.cancel") }}</ui-button>
              <ui-button type="button" [disabled]="issues().length > 0" (click)="validate()">{{ t()("calendriers.validate.submit") }}</ui-button>
            </div>
          </ui-dialog>

          <ui-dialog [(open)]="deleteOpen" [title]="t()('calendriers.delete.title')">
            <p class="text-sm text-muted-foreground">{{ t()("calendriers.delete.text") }}</p>
            <div actions class="flex gap-2">
              <ui-button type="button" variant="outline" (click)="deleteOpen.set(false)">{{ t()("calendriers.cancel") }}</ui-button>
              <ui-button type="button" variant="destructive" (click)="remove()">{{ t()("calendriers.delete") }}</ui-button>
            </div>
          </ui-dialog>
        }
      </app-shell>
    </app-extra-module-gate>
  `,
})
export default class CalendrierDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly store = inject(StoreService);
  private readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly fmtDateTime = fmtDateTime;
  protected readonly describeOffset = describeOffset;
  protected readonly icons = { cal: CalendarDays, save: Save, trash: Trash2, plus: Plus };
  protected readonly kinds = OPERATION_KINDS;
  protected readonly OPERATION_KIND_LABEL = OPERATION_KIND_LABEL;
  protected readonly CALENDAR_STATUS_TONE = CALENDAR_STATUS_TONE;
  protected readonly CALENDAR_STATUS_LABEL = CALENDAR_STATUS_LABEL;
  protected readonly HELP = HELP;

  private readonly id = toSignal(this.route.paramMap.pipe(map((p) => p.get("id") ?? "")), { initialValue: "" });

  protected readonly steps = signal<CalendarStep[]>([]);
  protected readonly feedback = signal("");
  protected readonly validateOpen = signal(false);
  protected readonly deleteOpen = signal(false);

  protected readonly cal = computed(() => this.store.state().calendars.find((c) => c.id === this.id()) ?? null);

  protected readonly draft = computed(() => {
    const c = this.cal();
    return c ? canEditCalendar(c) : false;
  });

  protected readonly editable = computed(() => this.draft() && this.store.can("calendar.write"));

  protected readonly dirty = computed(() => {
    const c = this.cal();
    return c ? JSON.stringify(this.steps()) !== JSON.stringify(c.steps) : false;
  });

  protected readonly issues = computed(() => calendarIssues(this.cal()?.steps ?? []));

  protected readonly otherDraft = computed(() => {
    const c = this.cal();
    if (!c) return null;
    return this.store.state().calendars.find(
      (x) => x.crop === c.crop && x.status === "brouillon" && x.id !== c.id,
    );
  });

  protected readonly timeline = computed(() =>
    [...placeableSteps(this.steps())].sort((a, b) => a.offsetDays - b.offsetDays),
  );

  protected readonly previewRows = computed(() => {
    const day = (iso: string) =>
      new Date(`${iso}T00:00:00.000Z`).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      });
    return [...placeableSteps(this.steps())]
      .sort((a, b) => a.offsetDays - b.offsetDays)
      .map((s) => {
        const from = addDays(EXAMPLE_SOWING, s.offsetDays);
        return { s, from: day(from), to: day(addDays(from, Math.max(1, s.durationDays) - 1)) };
      });
  });

  constructor() {
    effect(() => {
      const c = this.cal();
      if (c) this.steps.set(structuredClone(c.steps));
    });
  }

  detailDesc(c: CropCalendar): string {
    const validated =
      c.validatedBy && c.validatedAt
        ? this.t()("calendriers.detail.validatedBy", { name: c.validatedBy, date: fmtDate(c.validatedAt) })
        : this.t()("calendriers.detail.notValidated");
    return `${this.t()("calendriers.detail.createdBy", { name: c.createdBy })} · ${validated}`;
  }

  sortedSteps(steps: CalendarStep[]): CalendarStep[] {
    return [...steps].sort((a, b) => a.offsetDays - b.offsetDays);
  }

  historyLabel(action: string): string {
    const k = CALENDAR_HISTORY_LABEL[action];
    return k ? this.t()(k) : action;
  }

  patchStep(id: string, patch: Partial<CalendarStep>): void {
    this.steps.update((ss) => ss.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  removeStep(id: string): void {
    this.steps.update((ss) => ss.filter((s) => s.id !== id));
  }

  addStep(): void {
    const nid = `n${Date.now()}`;
    this.steps.update((ss) => [
      ...ss,
      { id: nid, kind: "traitement" as OperationKind, offsetDays: 30, durationDays: 1, note: "" },
    ]);
  }

  private err(e: MessageKey | string): string {
    return this.locale.tNow(e as MessageKey);
  }

  save(): void {
    const c = this.cal();
    if (!c) return;
    if (placeableSteps(this.steps()).length !== this.steps().length) {
      this.feedback.set(this.t()("calendriers.fillAll"));
      return;
    }
    const res = this.store.actions.saveCalendar(c.id, this.steps());
    this.feedback.set(res.ok ? this.t()("calendriers.saved") : this.err(res.error));
  }

  validate(): void {
    const c = this.cal();
    if (!c) return;
    const res = this.store.actions.validateCalendar(c.id);
    if (!res.ok) this.feedback.set(this.err(res.error));
    else {
      this.validateOpen.set(false);
      this.feedback.set(this.t()("calendriers.validated"));
    }
  }

  remove(): void {
    const c = this.cal();
    if (!c) return;
    const res = this.store.actions.deleteCalendar(c.id);
    if (!res.ok) this.feedback.set(this.err(res.error));
    else void this.router.navigate(["/calendriers"]);
  }

  newVersion(): void {
    const c = this.cal();
    if (!c) return;
    const res = this.store.actions.newCalendarVersion(c.id);
    if (!res.ok) this.feedback.set(this.err(res.error));
    else void this.router.navigate(["/calendriers", res.id]);
  }
}
