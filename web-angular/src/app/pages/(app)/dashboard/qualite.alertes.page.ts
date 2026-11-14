import { Component, computed, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";

import { AccessDeniedError, inScope } from "@/lib/store";
import { nf } from "@/lib/format";
import type { AlertStatus, DataAlert } from "@/lib/mock/data";
import type { MessageKey } from "@/lib/i18n";
import { AppShellComponent } from "@shared/app-shell.component";
import { LocaleService } from "@shared/locale.service";
import { StoreService } from "@shared/store.service";
import { createPager } from "@shared/pager";
import {
  IconComponent,
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

const STATUSES: readonly AlertStatus[] = ["ouvert", "en vérification", "résolu", "rejeté"];
const STATUS: Record<AlertStatus, { label: MessageKey; tab: MessageKey; bg: string; fg: string }> =
  {
    ouvert: {
      label: "qualite.alertes.statusValue.ouvert",
      tab: "qualite.alertes.status.ouvert",
      ...TONE.attente,
    },
    "en vérification": {
      label: "qualite.alertes.statusValue.en vérification",
      tab: "qualite.alertes.status.en vérification",
      ...TONE.info,
    },
    résolu: {
      label: "qualite.alertes.statusValue.résolu",
      tab: "qualite.alertes.status.résolu",
      ...TONE.succes,
    },
    rejeté: {
      label: "qualite.alertes.statusValue.rejeté",
      tab: "qualite.alertes.status.rejeté",
      ...TONE.neutre,
    },
  };
const SEVERITY: Record<DataAlert["severity"], { label: MessageKey; bg: string; fg: string }> = {
  élevée: { label: "qualite.alertes.severity.élevée", ...TONE.erreur },
  moyenne: { label: "qualite.alertes.severity.moyenne", ...TONE.attente },
  faible: { label: "qualite.alertes.severity.faible", ...TONE.neutre },
};
const RANK = { élevée: 0, moyenne: 1, faible: 2 } as const;
const norm = (v: string) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/**
 * Alertes qualité (charte V2) : statistiques, filtres état / sévérité à compteurs, tableau
 * sélectionnable, décision en lot (vérifier, résoudre, rejeter) avec commentaire, lien vers la fiche.
 */
@Component({
  selector: "app-qualite-alertes-page",
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
      .bulk {
        position: sticky;
        bottom: 16px;
        z-index: 20;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        border-radius: 20px;
        background: var(--v2-foret);
        padding: 10px 10px 10px 18px;
        color: var(--v2-blanc);
        box-shadow: var(--v2-ombre-flottant);
      }
      .bulk .b {
        display: inline-flex;
        height: 40px;
        align-items: center;
        gap: 6px;
        border-radius: 12px;
        padding: 0 14px;
        font-size: 14px;
        font-weight: 800;
        cursor: pointer;
      }
      .tbl input[type="checkbox"] {
        height: 18px;
        width: 18px;
        accent-color: var(--v2-foret);
        cursor: pointer;
      }
      .act-ok:hover {
        border-color: var(--v2-vert-pousse);
        background: var(--v2-sauge);
        color: var(--v2-vert-pousse);
      }
    `,
  ],
  template: `
    <app-shell perm="alert.manage" [area]="t()('qualite.alertes.area')">
      <header class="rise">
        <p class="mono" style="color: var(--v2-gris-texte)">{{ t()("qualite.header.title") }}</p>
        <h1
          class="mt-2 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]"
        >
          {{ t()("qualite.alertes.area") }}
        </h1>
        <p class="mt-2 max-w-2xl text-[16px] font-medium" style="color: var(--v2-gris-texte)">
          {{ t()("qualite.alertes.description") }}
        </p>
      </header>

      <ui-stat-cards class="rise mt-8" [stats]="stats()" />

      <div class="toolbar card mt-6">
        <label class="search">
          <ui-icon name="search" [size]="20" />
          <input
            type="search"
            [placeholder]="t()('qualite.alertes.searchPlaceholder')"
            [attr.aria-label]="t()('qualite.alertes.searchAria')"
            [value]="q()"
            (input)="q.set($any($event.target).value)"
          />
        </label>
        <ui-select
          class="min-w-[200px]"
          variant="compact"
          leadingIcon="warning"
          [label]="t()('qualite.alertes.filter.severity')"
          [options]="severityOptions()"
          [value]="severity()"
          (valueChange)="severity.set($event)"
        />
        <div class="seg" role="radiogroup" [attr.aria-label]="t()('qualite.alertes.status.aria')">
          @for (statusButton of statusButtons(); track statusButton.id) {
            <button
              type="button"
              role="radio"
              [class.on]="status() === statusButton.id"
              [attr.aria-checked]="status() === statusButton.id"
              (click)="status.set(statusButton.id); selected.set([])"
            >
              {{ statusButton.label
              }}<span class="n" [class.zero]="!statusButton.count">{{
                nf.format(statusButton.count)
              }}</span>
            </button>
          }
        </div>
      </div>

      <p class="sub mt-4" aria-live="polite">
        {{ t()("qualite.v2.alertes.count", { count: nf.format(rows().length) }) }}
      </p>

      <section class="card mt-3 overflow-hidden">
        @if (rows().length) {
          <div class="overflow-x-auto">
            <table class="tbl min-w-[960px]">
              <thead>
                <tr>
                  <th class="w-10">
                    @if (canDecide()) {
                      <input
                        type="checkbox"
                        [checked]="allPageSelected()"
                        [attr.aria-label]="t()('qualite.alertes.selectAll')"
                        (change)="togglePage($any($event.target).checked)"
                      />
                    }
                  </th>
                  <th>{{ t()("qualite.alertes.col.type") }}</th>
                  <th>{{ t()("qualite.alertes.col.entity") }}</th>
                  <th>{{ t()("qualite.alertes.col.enumerator") }}</th>
                  <th>{{ t()("qualite.alertes.col.severity") }}</th>
                  <th>{{ t()("qualite.alertes.col.status") }}</th>
                  <th class="text-right">{{ t()("organisations.col.actions") }}</th>
                </tr>
              </thead>
              <tbody>
                @for (alert of pager.items(); track alert.id) {
                  <tr [class.row-link]="canDecide()" (click)="canDecide() && toggle(alert.id)">
                    <td (click)="$event.stopPropagation()">
                      @if (canDecide()) {
                        <input
                          type="checkbox"
                          [checked]="selected().includes(alert.id)"
                          [attr.aria-label]="t()('qualite.alertes.selectOne', { type: alert.type })"
                          (change)="toggle(alert.id)"
                        />
                      }
                    </td>
                    <td>
                      <span class="block font-bold">{{ alert.type }}</span>
                      <span class="sub block max-w-[320px] truncate" [title]="alert.detail">{{
                        alert.detail
                      }}</span>
                    </td>
                    <td>
                      <span class="block font-semibold">{{ entityName(alert) }}</span>
                      <span class="sub block">{{
                        t()(
                          alert.entity === "producteur"
                            ? "qualite.alertes.entity.producteur"
                            : "qualite.alertes.entity.parcelle"
                        )
                      }}</span>
                    </td>
                    <td class="font-medium">{{ alert.enumerator }}</td>
                    <td>
                      <span
                        class="badge"
                        [style.background]="sev[alert.severity].bg"
                        [style.color]="sev[alert.severity].fg"
                        >{{ t()(sev[alert.severity].label) }}</span
                      >
                    </td>
                    <td>
                      <span
                        class="badge"
                        [style.background]="stat[alert.status].bg"
                        [style.color]="stat[alert.status].fg"
                        >{{ t()(stat[alert.status].label) }}</span
                      >
                    </td>
                    <td (click)="$event.stopPropagation()">
                      <span class="flex justify-end gap-2">
                        @if (
                          canDecide() &&
                          (alert.status === "ouvert" || alert.status === "en vérification")
                        ) {
                          <button
                            type="button"
                            class="act act-ok"
                            [title]="t()('qualite.alertes.resolve')"
                            [attr.aria-label]="t()('qualite.alertes.resolve')"
                            (click)="openDecision([alert.id], 'résolu')"
                          >
                            <ui-icon name="check" [size]="18" />
                          </button>
                          <button
                            type="button"
                            class="act act-danger"
                            [title]="t()('qualite.alertes.reject')"
                            [attr.aria-label]="t()('qualite.alertes.reject')"
                            (click)="openDecision([alert.id], 'rejeté')"
                          >
                            <ui-icon name="close" [size]="18" />
                          </button>
                        }
                        @if (ownerOf(alert); as producerId) {
                          <a
                            class="act"
                            [routerLink]="['/dashboard/producteurs', producerId]"
                            [title]="t()('qualite.v2.alertes.open')"
                            [attr.aria-label]="t()('qualite.v2.alertes.open')"
                            ><ui-icon name="visibility" [size]="18"
                          /></a>
                        }
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
            <p class="text-[16px] font-extrabold">{{ t()("qualite.alertes.empty") }}</p>
          </div>
        }
      </section>

      <!-- Actions groupées -->
      @if (selected().length) {
        <div
          class="bulk mt-4"
          role="region"
          [attr.aria-label]="t()('qualite.alertes.selected', { n: selected().length })"
        >
          <span class="flex-1 text-[14px] font-extrabold">{{
            t()("qualite.alertes.selected", { n: selected().length })
          }}</span>
          <button type="button" class="b" style="color: var(--v2-blanc)" (click)="selected.set([])">
            {{ t()("qualite.alertes.deselect") }}
          </button>
          <button
            type="button"
            class="b"
            style="background: var(--v2-info-bg); color: var(--v2-info-fg)"
            (click)="openDecision(selected(), 'en vérification')"
          >
            <ui-icon name="visibility" [size]="16" />{{ t()("qualite.alertes.verifyShort") }}
          </button>
          <button
            type="button"
            class="b"
            style="background: var(--v2-erreur-bg); color: var(--v2-erreur-fg)"
            (click)="openDecision(selected(), 'rejeté')"
          >
            <ui-icon name="close" [size]="16" />{{ t()("qualite.alertes.reject") }}
          </button>
          <button
            type="button"
            class="b"
            style="background: var(--v2-citron); color: var(--v2-foret)"
            (click)="openDecision(selected(), 'résolu')"
          >
            <ui-icon name="check" [size]="16" />{{ t()("qualite.alertes.resolve") }}
          </button>
        </div>
      }

      <!-- Décision -->
      @if (pending(); as decision) {
        <ui-modal
          [tone]="decision.status === 'rejeté' ? 'danger' : 'default'"
          [open]="true"
          [title]="
            t()('qualite.alertes.dialog.title', {
              n: decision.ids.length,
              status: t()(stat[decision.status].label),
            })
          "
          [description]="t()('qualite.alertes.dialog.description')"
          icon="fact_check"
          [width]="580"
          [closeLabel]="t()('common.close')"
          (closed)="pending.set(null)"
        >
          <ul
            class="mb-4 max-h-48 overflow-y-auto rounded-[16px] border"
            style="border-color: var(--v2-bord-carte)"
          >
            @for (alert of pendingAlerts(); track alert.id) {
              <li
                class="flex items-center justify-between gap-3 border-t px-4 py-2.5 text-[14px] first:border-t-0"
                style="border-color: var(--v2-separateur)"
              >
                <span class="min-w-0 truncate font-bold"
                  >{{ alert.type }} · {{ entityName(alert) }}</span
                >
                <span
                  class="badge"
                  [style.background]="sev[alert.severity].bg"
                  [style.color]="sev[alert.severity].fg"
                  >{{ t()(sev[alert.severity].label) }}</span
                >
              </li>
            }
          </ul>
          <label class="lbl" for="alert-comment">{{ t()("qualite.common.comment") }}</label>
          <textarea
            id="alert-comment"
            class="area mb-5 mt-2"
            [placeholder]="t()('qualite.alertes.dialog.commentPlaceholder')"
            [value]="comment()"
            (input)="comment.set($any($event.target).value)"
          ></textarea>
          <button modal-footer type="button" class="btn btn-ghost" (click)="pending.set(null)">
            {{ t()("common.cancel") }}
          </button>
          <button
            modal-footer
            type="button"
            class="btn"
            [class.btn-danger]="decision.status === 'rejeté'"
            [class.btn-primary]="decision.status !== 'rejeté'"
            (click)="confirmDecision()"
          >
            {{ t()("qualite.alertes.dialog.submit") }}
            @if (decision.status !== "rejeté") {
              <span class="btn-chip"><ui-icon name="check" [size]="18" /></span>
            }
          </button>
        </ui-modal>
      }
    </app-shell>
  `,
})
export default class QualiteAlertesPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  private readonly snackbar = inject(SnackbarService);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly stat = STATUS;
  protected readonly sev = SEVERITY;
  protected readonly q = signal("");
  protected readonly status = signal<AlertStatus | "__all">("ouvert");
  protected readonly severity = signal("");
  protected readonly selected = signal<string[]>([]);
  protected readonly comment = signal("");
  protected readonly pending = signal<{ ids: string[]; status: AlertStatus } | null>(null);

  protected readonly canDecide = computed(() => this.store.can("alert.manage"));

  /** Alertes du périmètre (producteurs et parcelles de la session). */
  private readonly mine = computed(() => {
    const s = this.store.state();
    const prod = new Set(inScope(s.producers, s.session).map((p) => p.id));
    const plots = new Set(s.plots.filter((p) => prod.has(p.producerId)).map((p) => p.id));
    return s.alerts.filter((a) => prod.has(a.entityId) || plots.has(a.entityId));
  });

  private readonly names = computed(() => {
    const s = this.store.state();
    return {
      producer: new Map(s.producers.map((p) => [p.id, `${p.firstName} ${p.lastName}`])),
      plot: new Map(s.plots.map((p) => [p.id, { code: p.code, owner: p.producerId }])),
    };
  });

  /** Recherche et sévérité, avant le filtre d'état (pour les compteurs). */
  private readonly base = computed(() => {
    const needle = norm(this.q().trim());
    const sev = this.severity();
    return this.mine().filter(
      (a) =>
        (!sev || a.severity === sev) &&
        (!needle ||
          norm(`${a.type} ${a.detail} ${a.enumerator} ${this.entityName(a)}`).includes(needle)),
    );
  });

  protected readonly statusButtons = computed(() => {
    const t = this.t();
    const base = this.base();
    return [
      ...STATUSES.map((st) => ({
        id: st as AlertStatus | "__all",
        label: t(STATUS[st].tab),
        count: base.filter((a) => a.status === st).length,
      })),
      { id: "__all" as const, label: t("qualite.common.all"), count: base.length },
    ];
  });

  protected readonly severityOptions = computed<SelectOption[]>(() => [
    { value: "", label: this.t()("qualite.v2.alertes.severityAll") },
    ...(["élevée", "moyenne", "faible"] as const).map((s) => ({
      value: s,
      label: this.t()(SEVERITY[s].label),
    })),
  ]);

  protected readonly rows = computed(() => {
    const st = this.status();
    return this.base()
      .filter((a) => st === "__all" || a.status === st)
      .sort((a, b) => RANK[a.severity] - RANK[b.severity] || a.id.localeCompare(b.id));
  });

  /** Pagination : mêmes règles que l'API (`GET /v1/quality/alerts?page=&limit=`). */
  protected readonly pager = createPager(() => this.rows());

  protected readonly stats = computed<StatCard[]>(() => {
    const t = this.t();
    const all = this.mine();
    const n = (st: AlertStatus) => all.filter((a) => a.status === st).length;
    const open = all.filter((a) => a.status === "ouvert");
    const types = new Map<string, number>();
    for (const a of open) types.set(a.type, (types.get(a.type) ?? 0) + 1);
    const top = [...types].sort((a, b) => b[1] - a[1])[0];
    return [
      {
        label: t("qualite.v2.alertes.stat.open"),
        value: nf.format(open.length),
        sub: t("qualite.v2.alertes.stat.openSub", {
          count: open.filter((a) => a.severity === "élevée").length,
        }),
        icon: "warning",
        bg: "",
        fg: "",
      },
      {
        label: t("qualite.v2.alertes.stat.verify"),
        value: nf.format(n("en vérification")),
        sub: t("qualite.v2.alertes.stat.verifySub"),
        icon: "visibility",
        ...TONE.info,
      },
      {
        label: t("qualite.v2.alertes.stat.resolved"),
        value: nf.format(n("résolu")),
        sub: t("qualite.v2.alertes.stat.resolvedSub", { count: n("rejeté") }),
        icon: "task_alt",
        ...TONE.succes,
      },
      {
        label: t("qualite.v2.alertes.stat.top"),
        value: top ? nf.format(top[1]) : "—",
        sub: top?.[0] ?? "—",
        icon: "analytics",
        ...TONE.attente,
      },
    ];
  });

  protected entityName(a: DataAlert): string {
    const n = this.names();
    if (a.entity === "producteur") return n.producer.get(a.entityId) ?? a.entityId;
    const pl = n.plot.get(a.entityId);
    return pl ? `${pl.code} · ${n.producer.get(pl.owner) ?? ""}` : a.entityId;
  }

  /** Producteur à ouvrir : la personne, ou le propriétaire de la parcelle. */
  protected ownerOf(a: DataAlert): string | null {
    if (a.entity === "producteur") return a.entityId;
    return this.names().plot.get(a.entityId)?.owner ?? null;
  }

  protected readonly allPageSelected = computed(() => {
    const ids = this.pager.items().map((a) => a.id);
    return ids.length > 0 && ids.every((id) => this.selected().includes(id));
  });

  protected toggle(id: string): void {
    this.selected.update((list) =>
      list.includes(id) ? list.filter((x) => x !== id) : [...list, id],
    );
  }

  protected togglePage(on: boolean): void {
    const ids = this.pager.items().map((a) => a.id);
    this.selected.update((list) =>
      on ? [...new Set([...list, ...ids])] : list.filter((x) => !ids.includes(x)),
    );
  }

  protected readonly pendingAlerts = computed(() => {
    const p = this.pending();
    return p ? this.mine().filter((a) => p.ids.includes(a.id)) : [];
  });

  protected openDecision(ids: string[], status: AlertStatus): void {
    this.comment.set("");
    this.pending.set({ ids: [...ids], status });
  }

  protected confirmDecision(): void {
    const p = this.pending();
    if (!p) return;
    try {
      this.store.actions.updateAlerts(p.ids, p.status, this.comment().trim());
    } catch (e) {
      this.snackbar.error(e instanceof AccessDeniedError ? this.locale.tNow(e.key) : String(e));
      return;
    }
    this.pending.set(null);
    this.selected.update((list) => list.filter((id) => !p.ids.includes(id)));
    this.snackbar.success(this.t()("qualite.alertes.dialog.updated", { n: p.ids.length }));
  }
}
