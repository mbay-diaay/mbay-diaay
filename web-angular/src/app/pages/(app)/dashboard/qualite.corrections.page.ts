import { Component, computed, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";

import { fmtDateTime, maskCni, maskPhone, nf } from "@/lib/format";
import type { CorrectionRequest, CorrectionStatus, Producer } from "@/lib/mock/data";
import type { MessageKey } from "@/lib/i18n";
import { inScope } from "@/lib/scope";
import { AppShellComponent } from "@shared/app-shell.component";
import { LocaleService } from "@shared/locale.service";
import { StoreService } from "@shared/store.service";
import { createPager } from "@shared/pager";
import {
  IconComponent,
  initialsOf,
  ModalComponent,
  PaginationComponent,
  SelectComponent,
  SnackbarService,
  StatCardsComponent,
  TONE,
  V2_PAGE_STYLES,
  type SelectOption,
  type StatCard,
} from "@shared/ui";

const ALL = "__all";
const DAY = 86_400_000;

const SENSITIVE: Record<string, (v: string) => string> = {
  Téléphone: maskPhone,
  CNI: maskCni,
};

const STATUS_VALUE_LABEL: Record<CorrectionStatus, MessageKey> = {
  "en attente": "qualite.corrections.statusValue.en attente",
  approuvée: "qualite.corrections.statusValue.approuvée",
  refusée: "qualite.corrections.statusValue.refusée",
};

const STATUS_TONE: Record<CorrectionStatus, { bg: string; fg: string }> = {
  "en attente": TONE.attente,
  approuvée: TONE.succes,
  refusée: TONE.erreur,
};

/**
 * Demandes de correction (charte V2) : statistiques, filtres (état à compteurs, coopérative, champ, tri),
 * tableau paginé, examen en modale avec l'avant / après, décision motivée (approuver ou refuser).
 */
@Component({
  selector: "app-qualite-corrections-page",
  imports: [
    AppShellComponent,
    IconComponent,
    ModalComponent,
    PaginationComponent,
    RouterLink,
    SelectComponent,
    StatCardsComponent,
  ],
  styles: [
    V2_PAGE_STYLES,
    `
      .chg {
        display: grid;
        gap: 6px;
        border-radius: 16px;
        border: 1px solid var(--v2-bord-carte);
        padding: 12px 14px;
      }
      @media (min-width: 640px) {
        .chg {
          grid-template-columns: 9rem 1fr;
          align-items: center;
        }
      }
      .from {
        border-radius: 8px;
        background: var(--v2-lin);
        padding: 2px 8px;
        color: var(--v2-gris-texte);
        text-decoration: line-through;
      }
      .to {
        border-radius: 8px;
        background: var(--v2-sauge);
        padding: 2px 8px;
        font-weight: 800;
        color: var(--v2-vert-pousse);
      }
    `,
  ],
  template: `
    <app-shell perm="correction.manage" [area]="t()('qualite.corrections.area')">
      <header class="rise">
        <p class="mono" style="color: var(--v2-gris-texte)">{{ t()("qualite.header.title") }}</p>
        <h1
          class="mt-2 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]"
        >
          {{ t()("qualite.nav.corrections") }}
        </h1>
        <p class="mt-2 max-w-2xl text-[16px] font-medium" style="color: var(--v2-gris-texte)">
          {{ t()("qualite.corrections.description") }}
        </p>
      </header>

      <ui-stat-cards class="rise mt-8" [stats]="stats()" />

      <div class="card mt-6 p-2">
        <div class="toolbar p-0">
          <label class="search">
            <ui-icon name="search" [size]="20" />
            <input
              type="search"
              [placeholder]="t()('qualite.corrections.searchPlaceholder')"
              [attr.aria-label]="t()('qualite.corrections.searchAria')"
              [value]="f().q"
              (input)="patchF({ q: $any($event.target).value })"
            />
          </label>
          <div
            class="seg"
            role="radiogroup"
            [attr.aria-label]="t()('qualite.corrections.col.status')"
          >
            @for (pill of statusPills(); track pill.value) {
              <button
                type="button"
                role="radio"
                [class.on]="f().status === pill.value"
                [attr.aria-checked]="f().status === pill.value"
                (click)="patchF({ status: pill.value })"
              >
                {{ pillLabel(pill)
                }}<span class="n" [class.zero]="!pill.count">{{ pill.count }}</span>
              </button>
            }
          </div>
        </div>
        <div class="mt-2 grid gap-2 sm:grid-cols-3">
          <ui-select
            variant="compact"
            leadingIcon="apartment"
            [label]="t()('qualite.corrections.scoopLabel')"
            [options]="scoopOptions()"
            [value]="f().scoop"
            (valueChange)="patchF({ scoop: $event })"
          />
          <ui-select
            variant="compact"
            leadingIcon="edit"
            [label]="t()('qualite.corrections.fieldLabel')"
            [options]="fieldOptions()"
            [value]="f().field"
            (valueChange)="patchF({ field: $event })"
          />
          <ui-select
            variant="compact"
            leadingIcon="event_note"
            [label]="t()('qualite.corrections.sortAria')"
            [options]="sortOptions()"
            [value]="sort()"
            (valueChange)="sort.set($any($event))"
          />
        </div>
      </div>

      <div class="mt-4 flex flex-wrap items-center gap-2">
        <p class="sub" aria-live="polite">
          <b class="tabular-nums" style="color: var(--v2-encre)">{{ nf.format(rows().length) }}</b>
          {{ t()("qualite.corrections.ofTotal", { total: nf.format(counts().total) }) }}
        </p>
        @if (activeFilters() > 0) {
          <button type="button" class="reveal" (click)="resetFilters()">
            <ui-icon name="close" [size]="14" />{{ t()("qualite.corrections.reset") }} ({{
              activeFilters()
            }})
          </button>
        }
      </div>

      <section class="card mt-3 overflow-hidden">
        @if (rows().length) {
          <div class="overflow-x-auto">
            <table class="tbl min-w-[920px]">
              <thead>
                <tr>
                  <th>{{ t()("qualite.corrections.col.producer") }}</th>
                  <th>{{ t()("qualite.corrections.col.changes") }}</th>
                  <th>{{ t()("qualite.corrections.col.motif") }}</th>
                  <th>{{ t()("qualite.corrections.col.requester") }}</th>
                  <th>{{ t()("qualite.corrections.col.date") }}</th>
                  <th>{{ t()("qualite.corrections.col.status") }}</th>
                  <th class="text-right">{{ t()("organisations.col.actions") }}</th>
                </tr>
              </thead>
              <tbody>
                @for (request of pager.items(); track request.id) {
                  <tr class="row-link" (click)="openDialog(request.id)">
                    <td>
                      <span class="flex items-center gap-3">
                        <span class="avatar">{{ initials(producerName(request.producerId)) }}</span>
                        <span class="min-w-0">
                          <span class="block truncate font-bold">{{
                            producerName(request.producerId)
                          }}</span>
                          <span class="mono block" style="color: var(--v2-gris-texte)">{{
                            producerCode(request.producerId)
                          }}</span>
                        </span>
                      </span>
                    </td>
                    <td>
                      <span class="block font-bold">{{
                        t()("qualite.v2.corr.changes", { count: request.changes.length })
                      }}</span>
                      <span class="sub block max-w-48 truncate">{{ changeFields(request) }}</span>
                    </td>
                    <td
                      class="max-w-64 truncate"
                      style="color: var(--v2-ardoise)"
                      [title]="request.motif"
                    >
                      {{ request.motif }}
                    </td>
                    <td class="font-medium">{{ request.requester }}</td>
                    <td class="whitespace-nowrap tabular-nums" style="color: var(--v2-gris-texte)">
                      {{ fmtDateTime(request.requestedAt) }}
                    </td>
                    <td>
                      <span
                        class="badge"
                        [style.background]="tone[request.status].bg"
                        [style.color]="tone[request.status].fg"
                        >{{ statusText(request.status) }}</span
                      >
                    </td>
                    <td>
                      <span class="flex justify-end">
                        <button
                          type="button"
                          class="act"
                          [title]="t()('qualite.corrections.examine')"
                          [attr.aria-label]="
                            t()('qualite.v2.corr.examine', {
                              name: producerName(request.producerId),
                            })
                          "
                          (click)="$event.stopPropagation(); openDialog(request.id)"
                        >
                          <ui-icon name="visibility" [size]="18" />
                        </button>
                      </span>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <ui-pagination class="px-5 pb-5" [pager]="pager" />
        } @else {
          <div class="flex flex-col items-center gap-3 p-10 text-center">
            <span
              class="grid size-14 place-items-center rounded-[16px]"
              style="background: var(--v2-sauge); color: var(--v2-foret)"
              ><ui-icon name="task_alt" [size]="26"
            /></span>
            <p class="text-[16px] font-extrabold">{{ t()("qualite.corrections.empty") }}</p>
          </div>
        }
      </section>

      <!-- Examen d'une demande -->
      @if (open(); as openRequest) {
        <ui-modal
          [open]="true"
          [title]="t()('qualite.corrections.dialog.title')"
          [description]="t()('qualite.corrections.dialog.description')"
          icon="edit"
          [width]="680"
          [closeLabel]="t()('common.close')"
          (closed)="closeDialog()"
        >
          <div class="grid gap-4 pb-5">
            @if (openProd(); as requestProducer) {
              <div
                class="flex items-center gap-3 rounded-[18px] p-3"
                style="background: var(--v2-creme)"
              >
                <span class="avatar">{{
                  initials(requestProducer.firstName + " " + requestProducer.lastName)
                }}</span>
                <span class="min-w-0 flex-1">
                  <a
                    class="block truncate font-extrabold underline-offset-4 hover:underline"
                    [routerLink]="['/dashboard/producteurs', requestProducer.id]"
                    (click)="closeDialog()"
                    >{{ requestProducer.firstName }} {{ requestProducer.lastName }}</a
                  >
                  <span class="sub block"
                    >{{ requestProducer.code }} ·
                    {{
                      t()("qualite.corrections.dialog.requestedBy", {
                        name: openRequest.requester,
                        date: fmtDateTime(openRequest.requestedAt),
                      })
                    }}</span
                  >
                </span>
                <span
                  class="badge"
                  [style.background]="tone[openRequest.status].bg"
                  [style.color]="tone[openRequest.status].fg"
                  >{{ statusText(openRequest.status) }}</span
                >
              </div>
            }
            <div class="grid gap-2">
              @for (change of openRequest.changes; track $index) {
                <div class="chg">
                  <span class="font-extrabold">{{ change.field }}</span>
                  <span class="flex flex-wrap items-center gap-2 tabular-nums">
                    <span class="from">{{ showVal(change.field, change.from) }}</span>
                    <ui-icon name="arrow_forward" [size]="16" style="color: var(--v2-gris-texte)" />
                    <span class="to">{{ showVal(change.field, change.to) }}</span>
                  </span>
                </div>
              }
            </div>
            <div>
              <p class="lbl">{{ t()("qualite.corrections.dialog.motif") }}</p>
              <p class="mt-1 text-[15px] font-semibold">« {{ openRequest.motif }} »</p>
            </div>
            @if (motifWarn(openRequest)) {
              <p
                class="notice"
                style="background: var(--v2-attente-bg); color: var(--v2-attente-fg)"
              >
                <ui-icon name="warning" [size]="18" />{{
                  t()("qualite.corrections.dialog.motifWarn", {
                    fields: openRequest.changes.map((c) => c.field).join(", "),
                  })
                }}
              </p>
            }
            @if (openRequest.status === "en attente") {
              <div>
                <label class="lbl" for="decision">{{
                  t()("qualite.corrections.dialog.decisionLabel")
                }}</label>
                <p class="sub mt-1">{{ t()("qualite.corrections.dialog.decisionHint") }}</p>
                <textarea
                  id="decision"
                  class="area mt-2"
                  [placeholder]="t()('qualite.corrections.dialog.decisionPlaceholder')"
                  [value]="decisionComment()"
                  (input)="decisionComment.set($any($event.target).value)"
                ></textarea>
              </div>
            } @else {
              <p
                class="notice"
                [style.background]="tone[openRequest.status].bg"
                [style.color]="tone[openRequest.status].fg"
              >
                <ui-icon
                  [name]="openRequest.status === 'approuvée' ? 'task_alt' : 'close'"
                  [size]="18"
                />
                <span>
                  {{ statusText(openRequest.status) }}
                  {{
                    t()("qualite.corrections.dialog.decidedBy", {
                      name: openRequest.decidedBy ?? "",
                    })
                  }}
                  {{ fmtDateTime(openRequest.decidedAt ?? "") }}
                  @if (openRequest.decisionComment) {
                    <span class="block font-semibold">« {{ openRequest.decisionComment }} »</span>
                  }
                </span>
              </p>
            }
            <p class="sub">
              {{ t()("qualite.corrections.dialog.trace") }}
              <a
                class="font-bold underline underline-offset-4"
                routerLink="/dashboard/audit"
                (click)="closeDialog()"
                >{{ t()("qualite.corrections.dialog.auditLink") }}</a
              >.
            </p>
          </div>
          @if (openRequest.status === "en attente") {
            <!-- Un seul élément racine : le bloc est bien projeté dans le pied de la modale. -->
            <div modal-footer class="contents">
              <button
                type="button"
                class="btn btn-danger"
                [disabled]="decisionComment().trim().length < 3"
                (click)="decide(false)"
              >
                {{ t()("qualite.corrections.dialog.refuse") }}
              </button>
              <button type="button" class="btn btn-primary" (click)="decide(true)">
                {{ t()("qualite.corrections.dialog.approve")
                }}<span class="btn-chip"><ui-icon name="check" [size]="18" /></span>
              </button>
            </div>
          } @else {
            <button modal-footer type="button" class="btn btn-ghost" (click)="closeDialog()">
              {{ t()("common.close") }}
            </button>
          }
        </ui-modal>
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
  protected readonly tone = STATUS_TONE;
  protected readonly initials = initialsOf;
  private readonly snackbar = inject(SnackbarService);

  protected readonly f = signal({
    status: "en attente" as string,
    scoop: ALL,
    field: ALL,
    q: "",
  });
  protected readonly sort = signal<"recent" | "old">("recent");
  protected readonly openId = signal<string | undefined>(undefined);
  protected readonly decisionComment = signal("");

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
      {
        value: ALL,
        labelKey: "qualite.common.all" as MessageKey,
        count: c.total,
        tone: "neutral" as const,
      },
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
        return `${p?.code ?? ""} ${p?.firstName ?? ""} ${p?.lastName ?? ""}`
          .toLowerCase()
          .includes(needle);
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

  protected readonly scoopOptions = computed<SelectOption[]>(() => {
    const s = this.store.state();
    const visible = inScope(
      s.scoops.filter((c) => !c.archived).map((c) => ({ ...c, scoopId: c.id })),
      s.session,
    );
    return [
      { value: ALL, label: this.t()("qualite.corrections.scoopAll") },
      ...visible.map((c) => ({ value: c.id, label: c.name })),
    ];
  });

  protected readonly fieldOptions = computed<SelectOption[]>(() => [
    { value: ALL, label: this.t()("qualite.v2.corr.fieldAll") },
    ...this.fields().map((f) => ({ value: f, label: f })),
  ]);

  protected readonly sortOptions = computed<SelectOption[]>(() => [
    { value: "recent", label: this.t()("qualite.corrections.sort.recent") },
    { value: "old", label: this.t()("qualite.corrections.sort.old") },
  ]);

  protected readonly stats = computed<StatCard[]>(() => {
    const t = this.t();
    const c = this.counts();
    const s = this.store.state();
    const scoped = this.scoped();
    const mine = s.corrections.filter((r) => scoped.has(r.producerId));
    const pending = mine
      .filter((r) => r.status === "en attente")
      .sort((a, b) => a.requestedAt.localeCompare(b.requestedAt));
    const oldest = pending[0]
      ? Math.max(0, Math.floor((Date.now() - new Date(pending[0].requestedAt).getTime()) / DAY))
      : null;
    const fieldCount = new Map<string, number>();
    for (const r of mine)
      for (const ch of r.changes) fieldCount.set(ch.field, (fieldCount.get(ch.field) ?? 0) + 1);
    const top = [...fieldCount].sort((a, b) => b[1] - a[1])[0];
    return [
      {
        label: t("qualite.v2.corr.stat.pending"),
        value: nf.format(c.pending),
        sub:
          oldest === null
            ? t("qualite.v2.corr.stat.pendingNone")
            : t("qualite.v2.corr.stat.pendingSub", { days: oldest }),
        icon: "edit",
        bg: "",
        fg: "",
      },
      {
        label: t("qualite.v2.corr.stat.approved"),
        value: nf.format(c.approved),
        sub: t("qualite.v2.corr.stat.approvedSub"),
        icon: "task_alt",
        ...TONE.succes,
      },
      {
        label: t("qualite.v2.corr.stat.refused"),
        value: nf.format(c.refused),
        sub: t("qualite.v2.corr.stat.refusedSub"),
        icon: "close",
        ...TONE.erreur,
      },
      {
        label: t("qualite.v2.corr.stat.field"),
        value: top ? nf.format(top[1]) : "—",
        sub: top?.[0] ?? "—",
        icon: "analytics",
        ...TONE.culture,
      },
    ];
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
    // Téléphone en clair avec le droit `contact.read` (admin) ; la CNI reste toujours masquée ici.
    if (field === "Téléphone" && v && this.store.can("contact.read")) return v;
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
    if (approved) this.snackbar.success(this.t()("qualite.v2.corr.approved"));
    else this.snackbar.info(this.t()("qualite.v2.corr.refused"));
  }

  /** Pagination (rows) : mêmes règles que l'API (?page=&limit=). */
  protected readonly pager = createPager(() => this.rows());
}
