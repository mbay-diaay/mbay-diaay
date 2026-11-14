import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { LucideAngularModule, RotateCcw, Search, SlidersHorizontal } from "lucide-angular";

import { fmtDateTime, maskCni, maskPhone, nf } from "@/lib/format";
import type { CorrectionRequest, CorrectionStatus, Producer } from "@/lib/mock/data";
import type { MessageKey } from "@/lib/i18n";
import { qualityCounts } from "@/lib/quality-nav";
import { inScope } from "@/lib/scope";
import { AppShellComponent } from "../shared/app-shell.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { UiChipRailComponent } from "../shared/ui/chip-rail.component";
import { UiEmptyComponent } from "../shared/ui/empty.component";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiPillComponent, type UiPillTone } from "../shared/ui/pill.component";

const ALL = "__all";

const SENSITIVE: Record<string, (v: string) => string> = {
  Téléphone: maskPhone,
  CNI: maskCni,
};

const STATUS_VALUE_LABEL: Record<CorrectionStatus, MessageKey> = {
  "en attente": "qualite.corrections.statusValue.en attente",
  approuvée: "qualite.corrections.statusValue.approuvée",
  refusée: "qualite.corrections.statusValue.refusée",
};

const COR_PILL_TONE: Record<CorrectionStatus, UiPillTone> = {
  "en attente": "warning",
  approuvée: "success",
  refusée: "danger",
};

/** Port de src/routes/qualite.corrections.tsx (listes, filtres, examen en dialog). */
@Component({
  selector: "app-qualite-corrections-page",
  imports: [
    FormsModule,
    RouterLink,
    LucideAngularModule,
    AppShellComponent,
    UiChipRailComponent,
    UiPageHeaderComponent,
    UiEmptyComponent,
    UiPillComponent,
  ],
  template: `
    <app-shell perm="correction.manage" [area]="t()('qualite.corrections.area')">
      <ui-page-header
        [eyebrow]="t()('qualite.header.eyebrow')"
        [title]="t()('qualite.header.title')"
        [description]="t()('qualite.corrections.description')"
      />

      <nav class="mb-4 border-b border-border pb-4 text-sm">
        <ui-chip-rail>
          @if (store.can('quality.review')) {
            <a routerLink="/qualite/doublons" class="chip-filter chip-filter-sm"
              >{{ t()('qualite.nav.doublons') }}
              <span class="chip-filter-count">{{ qCounts().doublons }}</span></a
            >
          }
          @if (store.can('alert.manage')) {
            <a routerLink="/qualite/alertes" class="chip-filter chip-filter-sm"
              >{{ t()('qualite.nav.alertes') }}
              <span class="chip-filter-count">{{ qCounts().alertes }}</span></a
            >
          }
          <a
            routerLink="/qualite/corrections"
            class="chip-filter chip-filter-sm chip-filter-active"
            >{{ t()('qualite.nav.corrections') }}
            <span class="chip-filter-count">{{ qCounts().corrections }}</span></a
          >
        </ui-chip-rail>
      </nav>

      <div class="surface mb-3 space-y-3 p-3">
        <ui-chip-rail>
          @for (pill of statusPills(); track pill.value) {
            <button
              type="button"
              [attr.aria-pressed]="f().status === pill.value"
              class="chip-filter chip-filter-sm"
              [class.chip-filter-active]="f().status === pill.value"
              (click)="setStatusFilter(pill.value)"
            >
              @if (f().status !== pill.value && pill.tone !== 'neutral') {
                <span
                  class="size-1.5 shrink-0 rounded-full"
                  [class.bg-warning]="pill.tone === 'warning'"
                  [class.bg-success]="pill.tone === 'success'"
                  [class.bg-danger]="pill.tone === 'danger'"
                  aria-hidden="true"
                ></span>
              }
              <span>{{ pillLabel(pill) }}</span>
              <span class="chip-filter-count">{{ pill.count }}</span>
            </button>
          }
        </ui-chip-rail>
        <div class="flex flex-wrap items-center gap-2">
          <div class="relative min-w-0 flex-1 basis-48 sm:max-w-xs">
            <lucide-angular
              [img]="icons.search"
              class="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              class="flex h-10 w-full rounded-md border border-input bg-background pl-8 pr-3 text-sm shadow-sm pointer-coarse:h-touch focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              [attr.aria-label]="t()('qualite.corrections.searchAria')"
              [placeholder]="t()('qualite.corrections.searchPlaceholder')"
              [ngModel]="f().q"
              (ngModelChange)="patchF({ q: $event })"
            />
          </div>
          <button
            type="button"
            class="inline-flex h-10 items-center gap-1.5 rounded-md border border-input bg-background px-3 text-sm hover:bg-muted pointer-coarse:h-touch"
            (click)="more.set(!more())"
            [attr.aria-expanded]="more()"
          >
            <lucide-angular [img]="icons.sliders" class="size-4" />
            {{ t()('qualite.common.filters') }}
            @if (extraFilterCount() > 0) {
              <span class="tabular">({{ extraFilterCount() }})</span>
            }
          </button>
        </div>
        @if (more()) {
          <div
            class="mt-3 grid grid-cols-2 gap-2 border-t pt-3 sm:flex sm:flex-wrap sm:items-center sm:gap-3"
          >
            <label class="flex flex-col gap-1 text-xs sm:w-48">
              <span class="font-medium text-foreground">{{ t()('qualite.corrections.scoopLabel') }}</span>
              <select
                class="h-9 rounded-md border border-input bg-background px-2 text-sm"
                [ngModel]="f().scoop"
                (ngModelChange)="patchF({ scoop: $event })"
              >
                <option [value]="ALL">{{ t()('qualite.corrections.scoopAll') }}</option>
                @for (sc of scoops(); track sc.id) {
                  <option [value]="sc.id">{{ sc.name }}</option>
                }
              </select>
            </label>
            <label class="flex flex-col gap-1 text-xs sm:w-44">
              <span class="font-medium text-foreground">{{ t()('qualite.corrections.fieldLabel') }}</span>
              <select
                class="h-9 rounded-md border border-input bg-background px-2 text-sm"
                [ngModel]="f().field"
                (ngModelChange)="patchF({ field: $event })"
              >
                <option [value]="ALL">{{ t()('qualite.common.all') }}</option>
                @for (field of fields(); track field) {
                  <option [value]="field">{{ field }}</option>
                }
              </select>
            </label>
            <select
              class="h-9 rounded-md border border-input bg-background px-2 text-sm sm:w-48"
              [attr.aria-label]="t()('qualite.corrections.sortAria')"
              [ngModel]="sort()"
              (ngModelChange)="sort.set($event)"
            >
              <option value="recent">{{ t()('qualite.corrections.sort.recent') }}</option>
              <option value="old">{{ t()('qualite.corrections.sort.old') }}</option>
            </select>
            <button
              type="button"
              class="hidden h-9 items-center rounded-md border border-input px-3 text-sm hover:bg-muted md:inline-flex"
              (click)="dense.set(!dense())"
            >
              {{ densityLabel() }}
            </button>
          </div>
        }
      </div>

      <div class="mb-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <span class="tabular font-medium text-foreground">{{ nf.format(rows().length) }}</span>
        {{ t()('qualite.corrections.ofTotal', { total: nf.format(counts().total) }) }}
        @if (activeFilters() > 0) {
          <span>{{ t()('qualite.corrections.activeFilters', { n: activeFilters() }) }}</span>
          <button
            type="button"
            class="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
            (click)="resetFilters()"
          >
            <lucide-angular [img]="icons.rotateCcw" class="size-3.5" />
            {{ t()('qualite.corrections.reset') }}
          </button>
        }
      </div>

      <div class="surface overflow-hidden">
        @if (rows().length > 0) {
          <ul class="divide-y md:hidden">
            @for (r of rows(); track r.id) {
              <li>
                <button
                  type="button"
                  class="w-full px-4 py-3 text-left active:bg-muted"
                  (click)="openDialog(r.id)"
                >
                  <div class="flex items-start justify-between gap-2">
                    <span class="min-w-0 font-medium">{{ producerName(r.producerId) }}</span>
                    <ui-pill [tone]="corPillTone[r.status]">{{ statusText(r.status) }}</ui-pill>
                  </div>
                  <div class="mt-0.5 text-xs text-muted-foreground tabular">{{ producerCode(r.producerId) }}</div>
                  <div class="mt-1 text-sm">
                    <span class="tabular font-medium">{{ r.changes.length }}</span>
                    {{ t()('qualite.corrections.fieldsList') }}
                    {{ changeFields(r) }}
                  </div>
                  <div class="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{{ r.motif }}</div>
                  <div class="mt-1 text-xs text-muted-foreground">
                    {{ r.requester }} · {{ fmtDateTime(r.requestedAt) }}
                  </div>
                </button>
              </li>
            }
          </ul>
        }
        @if (rows().length) {
          <div class="hidden overflow-x-auto md:block">
            <table class="w-full text-sm">
              <thead class="text-left text-xs text-muted-foreground">
                <tr>
                  <th class="py-3 pl-4">{{ t()('qualite.corrections.col.producer') }}</th>
                  <th>{{ t()('qualite.corrections.col.changes') }}</th>
                  <th>{{ t()('qualite.corrections.col.motif') }}</th>
                  <th class="hidden lg:table-cell">{{ t()('qualite.corrections.col.requester') }}</th>
                  <th>{{ t()('qualite.corrections.col.date') }}</th>
                  <th>{{ t()('qualite.corrections.col.status') }}</th>
                  <th class="pr-4"></th>
                </tr>
              </thead>
              <tbody class="divide-y">
                @for (r of rows(); track r.id) {
                  <tr class="hover:bg-muted/40" [class.py-0]="dense()">
                    <td [class]="dense() ? 'py-1.5 pl-4' : 'py-2.5 pl-4'">
                      @if (prodOf(r.producerId); as p) {
                        <a
                          [routerLink]="['/producteurs', p.id]"
                          class="font-medium hover:text-primary hover:underline"
                          >{{ p.code }} · {{ p.firstName }} {{ p.lastName }}</a
                        >
                      } @else {
                        {{ t()('qualite.common.notProvided') }}
                      }
                    </td>
                    <td>
                      <span class="tabular font-medium">{{ r.changes.length }}</span>
                      {{ t()('qualite.corrections.fieldsList') }}
                      {{ changeFields(r) }}
                    </td>
                    <td class="max-w-48 truncate pr-3 text-muted-foreground lg:max-w-64" [title]="r.motif">
                      {{ r.motif }}
                    </td>
                    <td class="hidden lg:table-cell">{{ r.requester }}</td>
                    <td class="whitespace-nowrap text-muted-foreground">{{ fmtDateTime(r.requestedAt) }}</td>
                    <td>
                      <ui-pill [tone]="corPillTone[r.status]">{{ statusText(r.status) }}</ui-pill>
                    </td>
                    <td class="pr-4 text-right">
                      <button
                        type="button"
                        class="inline-flex h-8 items-center rounded-md border border-input px-2 text-xs hover:bg-muted"
                        (click)="openDialog(r.id)"
                      >
                        {{ t()('qualite.corrections.examine') }}
                      </button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        } @else {
          <ui-empty>{{ t()('qualite.corrections.empty') }}</ui-empty>
        }
      </div>

      @if (open(); as o) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/40" (click)="closeDialog()"></div>
          <div
            class="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg border bg-card shadow-lg"
          >
            <div class="border-b p-4">
              <h2 class="text-lg font-semibold">{{ t()('qualite.corrections.dialog.title') }}</h2>
              <p class="mt-1 text-sm text-muted-foreground">{{ t()('qualite.corrections.dialog.description') }}</p>
            </div>
            <div class="flex-1 overflow-y-auto p-4 text-sm">
              @if (openProd(); as op) {
                <p>
                  {{ t()('qualite.corrections.dialog.producer') }}
                  <a [routerLink]="['/producteurs', op.id]" class="font-semibold text-primary hover:underline">
                    {{ op.code }} · {{ op.firstName }} {{ op.lastName }}
                  </a>
                </p>
              }
              <p class="text-muted-foreground">
                {{
                  t()('qualite.corrections.dialog.requestedBy', {
                    name: o.requester,
                    date: fmtDateTime(o.requestedAt),
                  })
                }}
              </p>
              <div class="mt-3 space-y-2">
                @for (c of o.changes; track $index) {
                  <div
                    class="grid gap-1 rounded-md border p-2.5 sm:grid-cols-[9rem_1fr] sm:items-center sm:gap-2"
                  >
                    <span class="font-medium">{{ c.field }}</span>
                    <span>
                      <span class="rounded bg-muted px-1.5 py-0.5 tabular line-through">{{
                        showVal(c.field, c.from)
                      }}</span>
                      <span class="mx-2">→</span>
                      <span class="rounded bg-primary-soft px-1.5 py-0.5 font-semibold tabular">{{
                        showVal(c.field, c.to)
                      }}</span>
                    </span>
                  </div>
                }
              </div>
              <p class="mt-3">
                <span class="font-medium">{{ t()('qualite.corrections.dialog.motif') }}</span>
                {{ o.motif }}
              </p>
              @if (motifWarn(o)) {
                <p class="mt-3 rounded-md border border-warning/40 bg-warning-bg p-3 text-sm text-warning-fg">
                  {{
                    t()('qualite.corrections.dialog.motifWarn', {
                      fields: o.changes.map((c) => c.field).join(', '),
                    })
                  }}
                </p>
              }
              @if (o.status === 'en attente') {
                <label class="mt-4 block">
                  <span class="font-medium">{{ t()('qualite.corrections.dialog.decisionLabel') }}</span>
                  <span class="mb-1 block text-xs text-muted-foreground">{{
                    t()('qualite.corrections.dialog.decisionHint')
                  }}</span>
                  <textarea
                    class="mt-1 flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    [placeholder]="t()('qualite.corrections.dialog.decisionPlaceholder')"
                    [ngModel]="decisionComment()"
                    (ngModelChange)="decisionComment.set($event)"
                  ></textarea>
                </label>
              } @else {
                <div class="mt-4 rounded-md bg-muted p-3 text-sm">
                  <span class="font-medium capitalize">{{ statusText(o.status) }}</span>
                  {{ t()('qualite.corrections.dialog.decidedBy', { name: o.decidedBy ?? '' }) }}
                  {{ fmtDateTime(o.decidedAt ?? '') }}
                  @if (o.decisionComment) {
                    <div class="mt-1 text-muted-foreground">« {{ o.decisionComment }} »</div>
                  }
                </div>
              }
              <p class="mt-4 text-xs text-muted-foreground">
                {{ t()('qualite.corrections.dialog.trace') }}
                <a routerLink="/audit" class="font-semibold text-primary hover:underline">{{
                  t()('qualite.corrections.dialog.auditLink')
                }}</a
                >.
              </p>
            </div>
            @if (o.status === 'en attente') {
              <div class="flex flex-wrap justify-end gap-2 border-t p-4">
                <button
                  type="button"
                  class="rounded-md border border-input px-3 py-1.5 text-sm text-danger-fg hover:bg-muted disabled:opacity-50"
                  [disabled]="decisionComment().trim().length < 3"
                  (click)="decide(false)"
                >
                  {{ t()('qualite.corrections.dialog.refuse') }}
                </button>
                <button
                  type="button"
                  class="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-95"
                  (click)="decide(true)"
                >
                  {{ t()('qualite.corrections.dialog.approve') }}
                </button>
              </div>
            }
          </div>
        </div>
      }
    </app-shell>
  `,
})
export default class QualiteCorrectionsPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly ALL = ALL;
  protected readonly nf = nf;
  protected readonly fmtDateTime = fmtDateTime;
  protected readonly icons = { search: Search, sliders: SlidersHorizontal, rotateCcw: RotateCcw };
  protected readonly statusValueLabel = STATUS_VALUE_LABEL;
  protected readonly corPillTone = COR_PILL_TONE;

  protected readonly densityLabel = computed(() =>
    this.t()("qualite.corrections.density", {
      mode: this.t()(
        this.dense()
          ? "qualite.corrections.density.compact"
          : "qualite.corrections.density.comfortable",
      ),
    }),
  );

  protected readonly f = signal({
    status: "en attente" as string,
    scoop: ALL,
    field: ALL,
    q: "",
  });
  protected readonly more = signal(false);
  protected readonly sort = signal<"recent" | "old">("recent");
  protected readonly dense = signal(false);
  protected readonly openId = signal<string | undefined>(undefined);
  protected readonly decisionComment = signal("");

  protected qCounts = computed(() => qualityCounts(this.store.state()));

  protected scoped = computed(() => {
    const s = this.store.state();
    return new Set(inScope(s.producers, s.session).map((p) => p.id));
  });

  protected prodMap = computed(() => {
    const s = this.store.state();
    return new Map(s.producers.map((p) => [p.id, p]));
  });

  protected fields = computed(() => {
    const s = this.store.state();
    return [...new Set(s.corrections.flatMap((r) => r.changes.map((c) => c.field)))].sort();
  });

  protected scoops = computed(() => this.store.state().scoops);

  protected counts = computed(() => {
    const s = this.store.state();
    const scoped = this.scoped();
    const inScopeRows = s.corrections.filter((r) => scoped.has(r.producerId));
    return {
      pending: inScopeRows.filter((r) => r.status === "en attente").length,
      approved: inScopeRows.filter((r) => r.status === "approuvée").length,
      refused: inScopeRows.filter((r) => r.status === "refusée").length,
      total: inScopeRows.length,
    };
  });

  protected statusPills = computed(() => {
    const c = this.counts();
    return [
      { value: ALL, labelKey: "qualite.common.all" as MessageKey, count: c.total, tone: "neutral" as const },
      {
        value: "en attente",
        labelKey: "qualite.corrections.status.en attente",
        count: c.pending,
        tone: "warning" as const,
      },
      {
        value: "approuvée",
        labelKey: "qualite.corrections.status.approuvée",
        count: c.approved,
        tone: "success" as const,
      },
      {
        value: "refusée",
        labelKey: "qualite.corrections.status.refusée",
        count: c.refused,
        tone: "danger" as const,
      },
    ];
  });

  protected rows = computed(() => {
    const s = this.store.state();
    const scoped = this.scoped();
    const pm = this.prodMap();
    const { status: st, scoop, field, q } = this.f();
    const sort = this.sort();
    const needle = q.trim().toLowerCase();

    return s.corrections
      .filter((r) => scoped.has(r.producerId))
      .filter((r) => st === ALL || r.status === st)
      .filter((r) => field === ALL || r.changes.some((c) => c.field === field))
      .filter((r) => scoop === ALL || pm.get(r.producerId)?.scoopId === scoop)
      .filter((r) => {
        if (!needle) return true;
        const p = pm.get(r.producerId);
        return `${p?.code ?? ""} ${p?.firstName ?? ""} ${p?.lastName ?? ""}`.toLowerCase().includes(needle);
      })
      .sort((a, b) =>
        sort === "recent"
          ? b.requestedAt.localeCompare(a.requestedAt)
          : a.requestedAt.localeCompare(b.requestedAt),
      );
  });

  protected activeFilters = computed(() => {
    const { scoop, field, q } = this.f();
    return (scoop !== ALL ? 1 : 0) + (field !== ALL ? 1 : 0) + (q.trim() ? 1 : 0);
  });

  protected extraFilterCount = computed(() => {
    const { scoop, field } = this.f();
    return (scoop !== ALL ? 1 : 0) + (field !== ALL ? 1 : 0);
  });

  protected open = computed((): CorrectionRequest | undefined => {
    const id = this.openId();
    if (!id) return undefined;
    return this.store.state().corrections.find((r) => r.id === id);
  });

  protected openProd = computed((): Producer | undefined => {
    const o = this.open();
    if (!o) return undefined;
    return this.prodMap().get(o.producerId);
  });

  protected patchF(patch: Partial<{ status: string; scoop: string; field: string; q: string }>) {
    this.f.set({ ...this.f(), ...patch });
  }

  protected setStatusFilter(v: string) {
    this.patchF({ status: v });
  }

  protected resetFilters() {
    this.patchF({ scoop: ALL, field: ALL, q: "" });
  }

  protected prodOf(id: string): Producer | undefined {
    return this.prodMap().get(id);
  }

  protected producerName(id: string): string {
    const p = this.prodOf(id);
    return p ? `${p.firstName} ${p.lastName}` : this.t()("qualite.common.notProvided");
  }

  protected producerCode(id: string): string {
    return this.prodOf(id)?.code ?? "";
  }

  protected changeFields(r: CorrectionRequest): string {
    return r.changes.map((c) => c.field).join(", ");
  }

  protected showVal(field: string, v: string): string {
    const mask = SENSITIVE[field];
    if (mask) return v ? mask(v) : this.t()("qualite.common.notProvided");
    return v || this.t()("qualite.common.notProvided");
  }

  protected motifWarn(r: CorrectionRequest): boolean {
    const hints: Record<string, string[]> = {
      téléphone: ["téléphone", "numero", "numéro", "phone"],
      âge: ["âge", "age", "ans", "identité", "cni"],
      nom: ["nom", "patronyme", "orthograph"],
      "statut d'adhésion": ["adhésion", "membre", "statut"],
    };
    const fieldList = r.changes.map((c) => c.field.toLowerCase());
    const motif = r.motif.toLowerCase();
    return !fieldList.every((field) => {
      const keys = Object.entries(hints).find(([k]) => field.includes(k))?.[1] ?? [field];
      return keys.some((k) => motif.includes(k));
    });
  }

  protected openDialog(id: string) {
    this.openId.set(id);
    this.decisionComment.set("");
  }

  protected closeDialog() {
    this.openId.set(undefined);
    this.decisionComment.set("");
  }

  protected pillLabel(pill: { labelKey: string }): string {
    return this.t()(pill.labelKey as MessageKey);
  }

  protected statusText(s: CorrectionStatus): string {
    return this.t()(STATUS_VALUE_LABEL[s]);
  }

  protected decide(approved: boolean) {
    const o = this.open();
    if (!o) return;
    const cmt = this.decisionComment().trim();
    if (!approved && cmt.length < 3) return;
    this.store.actions.decideCorrection(
      o.id,
      approved,
      cmt || "Approuvée après vérification du justificatif.",
    );
    this.closeDialog();
  }
}
