import { Component, computed, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";

import { actions, can, getState, isSnapshot } from "@/lib/store";
import { downloadCsv, fmtDateTime, nf } from "@/lib/format";
import { ENTITY_ORDER, SCHEMA, type EntityKey } from "@/lib/io/schema";
import { downloadWorkbook, exchangeRows, type Cell, type SheetOut } from "@/lib/io/workbook";
import { AppShellComponent } from "@shared/app-shell.component";
import { LocaleService } from "@shared/locale.service";
import { StoreService } from "@shared/store.service";
import {
  IconComponent,
  ModalComponent,
  SnackbarService,
  StatCardsComponent,
  TONE,
  V2_PAGE_STYLES,
  type StatCard,
} from "@shared/ui";

type ExtraKey = "alertes" | "doublons" | "corrections" | "journal";

const ENTITY_ORDER_ARR = [...ENTITY_ORDER];

type Snapshot = Parameters<typeof actions.restoreSnapshot>[0];

/**
 * Sauvegarde et export (charte V2) : volumes, export Excel complet ou CSV par entité (tracés),
 * sauvegarde JSON, restauration avec comparatif avant / après en modale.
 */
@Component({
  selector: "app-donnees-page",
  imports: [AppShellComponent, IconComponent, ModalComponent, RouterLink, StatCardsComponent],
  styles: [
    V2_PAGE_STYLES,
    `
      .grid-main {
        display: grid;
        gap: 16px;
      }
      @media (min-width: 1100px) {
        .grid-main {
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
          align-items: start;
        }
      }
      .ent {
        display: flex;
        align-items: center;
        gap: 12px;
        border-top: 1px solid var(--v2-separateur);
        padding: 10px 20px;
      }
      .cmp td,
      .cmp th {
        border-top: 1px solid var(--v2-separateur);
        padding: 8px 12px;
        text-align: left;
        font-size: 14px;
      }
      .cmp th {
        font-family: var(--v2-font-mono);
        font-size: 11px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--v2-gris-texte);
        border-top: none;
      }
    `,
  ],
  template: `
    <app-shell perm="data.backup" [area]="t()('sauvegarde.area')">
      <header class="rise">
        <p class="mono" style="color: var(--v2-gris-texte)">{{ t()("sauvegarde.eyebrow") }}</p>
        <h1
          class="mt-2 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]"
        >
          {{ t()("sauvegarde.title") }}
        </h1>
        <p class="mt-2 max-w-2xl text-[16px] font-medium" style="color: var(--v2-gris-texte)">
          {{ t()("sauvegarde.description") }}
        </p>
      </header>

      @if (!nominatif()) {
        <p class="notice mt-4" style="background: var(--v2-info-bg); color: var(--v2-info-fg)">
          <ui-icon name="info" [size]="18" />{{ t()("sauvegarde.notice.noNominatif") }}
        </p>
      }
      @if (nominatif() && !cni()) {
        <p class="notice mt-4" style="background: var(--v2-info-bg); color: var(--v2-info-fg)">
          <ui-icon name="info" [size]="18" />{{ t()("sauvegarde.notice.noCni") }}
        </p>
      }

      <ui-stat-cards class="rise mt-8" [stats]="stats()" />

      <div class="grid-main mt-6">
        <!-- Exporter -->
        <section class="sec-card">
          <div class="sec-head">
            <h2>
              <span class="sec-ico"><ui-icon name="table_view" [size]="18" /></span
              >{{ t()("sauvegarde.export.title") }}
            </h2>
            <button type="button" class="btn btn-primary" (click)="exportAll()">
              {{ t()("sauvegarde.export.all")
              }}<span class="btn-chip"><ui-icon name="download" [size]="18" /></span>
            </button>
          </div>
          <p class="sub border-t px-5 py-3" style="border-color: var(--v2-separateur)">
            {{ t()("sauvegarde.export.description") }}
          </p>
          <p class="lbl px-5 pb-2 pt-3">{{ t()("sauvegarde.export.single") }}</p>
          <ul>
            @for (row of exportRows(); track row.key) {
              <li class="ent">
                <span class="sec-ico"><ui-icon name="description" [size]="18" /></span>
                <span class="min-w-0 flex-1 font-bold">{{ row.label }}</span>
                <span class="sub tabular-nums">{{ nf.format(row.n) }}</span>
                <button
                  type="button"
                  class="btn btn-ghost"
                  style="height: 38px; padding: 0 12px"
                  (click)="exportCsv(row.key)"
                >
                  <ui-icon name="download" [size]="16" />{{ t()("sauvegarde.export.csvButton") }}
                </button>
              </li>
            }
          </ul>
        </section>

        <div class="grid gap-4">
          <!-- Sauvegarde -->
          <section class="sec-card">
            <div class="sec-head">
              <h2>
                <span class="sec-ico"><ui-icon name="archive" [size]="18" /></span
                >{{ t()("sauvegarde.backup.title") }}
              </h2>
            </div>
            <div class="border-t p-5" style="border-color: var(--v2-separateur)">
              <p class="sub">{{ t()("sauvegarde.backup.description") }}</p>
              <button type="button" class="btn btn-primary mt-4" (click)="backup()">
                {{ t()("sauvegarde.backup.download")
                }}<span class="btn-chip"><ui-icon name="download" [size]="18" /></span>
              </button>
              <p class="sub mt-3 flex items-center gap-1.5">
                <ui-icon name="event_note" [size]="16" />
                @if (lastBackup(); as backupEntry) {
                  {{
                    t()("sauvegarde.backup.last", {
                      date: fmtDateTime(backupEntry.at),
                      user: backupEntry.user,
                    })
                  }}
                } @else {
                  {{ t()("sauvegarde.backup.none") }}
                }
              </p>
            </div>
          </section>

          <!-- Restauration -->
          <section class="sec-card">
            <div class="sec-head">
              <h2>
                <span
                  class="sec-ico"
                  style="background: var(--v2-attente-bg); color: var(--v2-attente-fg)"
                  ><ui-icon name="upload_file" [size]="18" /></span
                >{{ t()("sauvegarde.restore.title") }}
              </h2>
            </div>
            <div class="border-t p-5" style="border-color: var(--v2-separateur)">
              <p class="sub">{{ t()("sauvegarde.restore.description") }}</p>
              <button type="button" class="btn btn-ghost mt-4" (click)="fileInput.click()">
                <ui-icon name="upload_file" [size]="18" />{{ t()("sauvegarde.restore.choose") }}
              </button>
              <input
                #fileInput
                type="file"
                accept=".json,application/json"
                class="sr-only"
                (change)="onRestoreFile($event)"
              />
              <p class="sub mt-3">
                {{ t()("sauvegarde.restore.importHintBefore") }}
                <a routerLink="/dashboard/imports" class="font-bold underline underline-offset-4">{{
                  t()("sauvegarde.restore.importLink")
                }}</a
                >{{ t()("sauvegarde.restore.importHintAfter") }}
              </p>
            </div>
          </section>
        </div>
      </div>

      <!-- Confirmer la restauration -->
      @if (pending(); as restore) {
        <ui-modal
          tone="danger"
          [open]="true"
          [title]="t()('sauvegarde.confirm.title', { file: restore.file })"
          [description]="
            t()('sauvegarde.confirm.description', { date: fmtDateTime(restore.snap.exportedAt) })
          "
          icon="upload_file"
          [width]="560"
          [closeLabel]="t()('common.close')"
          (closed)="pending.set(null)"
        >
          <div
            class="mb-5 overflow-hidden rounded-[16px] border"
            style="border-color: var(--v2-bord-carte)"
          >
            <table class="cmp w-full">
              <thead>
                <tr>
                  <th></th>
                  <th class="text-right">{{ t()("sauvegarde.confirm.current") }}</th>
                  <th class="text-right">{{ t()("sauvegarde.confirm.after") }}</th>
                </tr>
              </thead>
              <tbody>
                @for (volume of restore.rows; track volume.label) {
                  <tr>
                    <td class="font-semibold">{{ volume.label }}</td>
                    <td class="text-right tabular-nums">{{ nf.format(volume.now) }}</td>
                    <td
                      class="text-right font-extrabold tabular-nums"
                      [style.color]="volume.after !== volume.now ? 'var(--v2-attente-fg)' : null"
                    >
                      {{ nf.format(volume.after) }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <button modal-footer type="button" class="btn btn-ghost" (click)="pending.set(null)">
            {{ t()("sauvegarde.confirm.cancel") }}
          </button>
          <button modal-footer type="button" class="btn btn-danger" (click)="confirmRestore()">
            {{ t()("sauvegarde.confirm.action") }}
          </button>
        </ui-modal>
      }
    </app-shell>
  `,
})
export default class DonneesPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly fmtDateTime = fmtDateTime;
  protected readonly nf = nf;
  private readonly snackbar = inject(SnackbarService);
  /** Sauvegarde lue, en attente de confirmation (comparatif des volumes). */
  protected readonly pending = signal<{
    file: string;
    snap: Snapshot;
    rows: { label: string; now: number; after: number }[];
  } | null>(null);

  protected readonly stats = computed<StatCard[]>(() => {
    const t = this.t();
    const c = this.currentCounts();
    return [
      {
        label: t("sauvegarde.volume.producteurs"),
        value: nf.format(c.producers),
        sub: `${nf.format(c.orgs)} ${t("sauvegarde.volume.organisations").toLowerCase()}`,
        icon: "agriculture",
        bg: "",
        fg: "",
      },
      {
        label: t("sauvegarde.volume.parcelles"),
        value: nf.format(c.plots),
        sub: t("sauvegarde.export.single"),
        icon: "landscape",
        ...TONE.succes,
      },
      {
        label: t("sauvegarde.volume.alertes"),
        value: nf.format(c.alerts),
        sub: `${nf.format(c.cases)} ${t("sauvegarde.volume.doublons").toLowerCase()}`,
        icon: "warning",
        ...TONE.attente,
      },
      {
        label: t("sauvegarde.volume.journal"),
        value: nf.format(c.audit),
        sub: this.lastBackup()
          ? t("sauvegarde.backup.last", {
              date: fmtDateTime(this.lastBackup()!.at),
              user: this.lastBackup()!.user,
            })
          : t("sauvegarde.backup.none"),
        icon: "receipt_long",
        ...TONE.info,
      },
    ];
  });

  private readonly EXTRA: { key: ExtraKey; labelKey: `sauvegarde.extra.${ExtraKey}` }[] = [
    { key: "alertes", labelKey: "sauvegarde.extra.alertes" },
    { key: "doublons", labelKey: "sauvegarde.extra.doublons" },
    { key: "corrections", labelKey: "sauvegarde.extra.corrections" },
    { key: "journal", labelKey: "sauvegarde.extra.journal" },
  ];

  protected readonly nominatif = computed(() =>
    can(this.store.state().session, "producer.export_nominatif"),
  );
  protected readonly cni = computed(() => can(this.store.state().session, "identity.read_full"));

  protected readonly lastBackup = computed(() =>
    this.store.state().audit.find((a) => a.action === "Sauvegarde complète"),
  );

  protected readonly exportRows = computed(() => {
    const s = this.store.state();
    const counts = {
      orgs: s.orgs.length,
      producers: s.producers.filter((p) => !p.mergedInto).length,
      plots: s.plots.length,
      alertes: s.alerts.length,
      doublons: s.cases.length,
      corrections: s.corrections.length,
      journal: s.audit.length,
    };
    const entityCount: Record<EntityKey, number> = {
      organisations: counts.orgs,
      producteurs: counts.producers,
      parcelles: counts.plots,
    };
    const rows: { key: EntityKey | ExtraKey; label: string; n: number }[] = [];
    for (const e of ENTITY_ORDER_ARR) {
      rows.push({ key: e, label: SCHEMA[e].label, n: entityCount[e] });
    }
    for (const x of this.EXTRA) {
      rows.push({ key: x.key, label: this.t()(x.labelKey), n: counts[x.key] });
    }
    return rows;
  });

  private extraRows(k: ExtraKey): Cell[][] {
    const s = getState();
    const code = new Map(s.producers.map((p) => [p.id, p.code]));
    const plotCode = new Map(s.plots.map((p) => [p.id, p.code]));
    if (k === "alertes")
      return [
        ["Type", "Sévérité", "Concerne", "Code", "Statut", "Enquêteur", "Détail", "Commentaire"],
        ...s.alerts.map((a) => [
          a.type,
          a.severity,
          a.entity,
          (a.entity === "parcelle" ? plotCode.get(a.entityId) : code.get(a.entityId)) ?? "",
          a.status,
          a.enumerator,
          a.detail,
          a.comment ?? "",
        ]),
      ];
    if (k === "doublons")
      return [
        ["Cas", "Fiche A", "Fiche B", "Score", "Statut", "Signaux", "Commentaire"],
        ...s.cases.map((c) => [
          c.id.toUpperCase(),
          code.get(c.aId) ?? "",
          code.get(c.bId) ?? "",
          c.score,
          c.status,
          c.signals.map((x) => x.label).join(" | "),
          c.comment ?? "",
        ]),
      ];
    if (k === "corrections")
      return [
        ["Producteur", "Demandeur", "Date", "Champs", "Motif", "Statut", "Décision"],
        ...s.corrections.map((c) => [
          code.get(c.producerId) ?? "",
          c.requester,
          c.requestedAt,
          c.changes.map((x) => x.field).join(", "),
          c.motif,
          c.status,
          c.decisionComment ?? "",
        ]),
      ];
    return [
      ["Date", "Utilisateur", "Action", "Entité", "Détail"],
      ...s.audit.map((a) => [a.at, a.user, a.action, a.entity, a.detail]),
    ];
  }

  async exportAll(): Promise<void> {
    const s = getState();
    const opt = { nominatif: this.nominatif(), cni: this.cni() };
    const sheets: SheetOut[] = [
      ...ENTITY_ORDER_ARR.map((e) => ({ name: SCHEMA[e].sheet, rows: exchangeRows(e, s, opt) })),
      ...this.EXTRA.map((x) => ({ name: this.frExtraLabel(x.key), rows: this.extraRows(x.key) })),
    ];
    const stamp = () => new Date().toISOString().slice(0, 10);
    try {
      await downloadWorkbook(`mbay_diaay_export_${stamp()}.xlsx`, sheets);
    } catch {
      this.snackbar.error(this.t()("common.exportError"));
      return;
    }
    actions.audit(
      opt.nominatif ? "Export nominatif" : "Export anonymisé",
      "Toutes les données",
      "Classeur Excel complet",
    );
    this.snackbar.success(
      `${this.t()("sauvegarde.exportAll.done")} · ${this.t()("sauvegarde.exportAll.doneHint")}`,
    );
  }

  private frExtraLabel(k: ExtraKey): string {
    const map: Record<ExtraKey, string> = {
      alertes: "Alertes",
      doublons: "Doublons",
      corrections: "Demandes de correction",
      journal: "Journal d'audit",
    };
    return map[k];
  }

  exportCsv(e: EntityKey | ExtraKey): void {
    const s = getState();
    const opt = { nominatif: this.nominatif(), cni: this.cni() };
    const stamp = () => new Date().toISOString().slice(0, 10);
    const isEntity = (ENTITY_ORDER_ARR as string[]).includes(e);
    downloadCsv(
      `${e}_${stamp()}.csv`,
      isEntity ? exchangeRows(e as EntityKey, s, opt) : this.extraRows(e as ExtraKey),
    );
    actions.audit(
      isEntity && opt.nominatif ? "Export nominatif" : "Export",
      isEntity ? SCHEMA[e as EntityKey].label : this.frExtraLabel(e as ExtraKey),
      "CSV",
    );
  }

  backup(): void {
    const snap = actions.exportSnapshot();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(snap)], { type: "application/json" }));
    a.download = `mbay_diaay_sauvegarde_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    this.snackbar.success(
      `${this.t()("sauvegarde.backup.done")} · ${this.t()("sauvegarde.backup.doneHint")}`,
    );
  }

  async onRestoreFile(ev: Event): Promise<void> {
    const input = ev.target as HTMLInputElement;
    const f = input.files?.[0];
    if (!f) return;
    try {
      const parsed: unknown = JSON.parse(await f.text());
      if (!isSnapshot(parsed)) throw new Error(this.t()("sauvegarde.restore.notBackup"));
      const after = parsed.data;
      const c = this.currentCounts();
      const t = this.t();
      this.pending.set({
        file: f.name,
        snap: parsed,
        rows: [
          { label: t("sauvegarde.volume.organisations"), now: c.orgs, after: after.orgs.length },
          {
            label: t("sauvegarde.volume.producteurs"),
            now: c.producers,
            after: after.producers.filter((p) => !p.mergedInto).length,
          },
          { label: t("sauvegarde.volume.parcelles"), now: c.plots, after: after.plots.length },
          { label: t("sauvegarde.volume.alertes"), now: c.alerts, after: after.alerts.length },
          { label: t("sauvegarde.volume.doublons"), now: c.cases, after: after.cases.length },
          { label: t("sauvegarde.volume.journal"), now: c.audit, after: after.audit.length },
        ],
      });
    } catch (e) {
      this.snackbar.error(
        `${this.t()("sauvegarde.restore.failed")} : ${e instanceof Error ? e.message : this.t()("sauvegarde.restore.unreadable")}`,
      );
    } finally {
      input.value = "";
    }
  }

  protected confirmRestore(): void {
    const p = this.pending();
    if (!p) return;
    actions.restoreSnapshot(p.snap);
    this.pending.set(null);
    this.snackbar.success(this.t()("sauvegarde.restore.done"));
  }

  private currentCounts() {
    const s = this.store.state();
    return {
      orgs: s.orgs.length,
      producers: s.producers.filter((p) => !p.mergedInto).length,
      plots: s.plots.length,
      alerts: s.alerts.length,
      cases: s.cases.length,
      audit: s.audit.length,
    };
  }
}
