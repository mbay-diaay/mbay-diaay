import { Component, computed, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import {
  LucideAngularModule,
  Archive,
  Database,
  Download,
  FileJson,
  FileSpreadsheet,
  History,
  Upload,
} from "lucide-angular";

import { actions, can, getState, isSnapshot } from "@/lib/store";
import { downloadCsv, fmtDateTime, nf } from "@/lib/format";
import { ENTITY_ORDER, SCHEMA, type EntityKey } from "@/lib/io/schema";
import { downloadWorkbook, exchangeRows, type Cell, type SheetOut } from "@/lib/io/workbook";
import { AppShellComponent } from "../shared/app-shell.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { UiButtonComponent } from "../shared/ui/button.component";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";

type ExtraKey = "alertes" | "doublons" | "corrections" | "journal";

const ENTITY_ORDER_ARR = [...ENTITY_ORDER];

/** Port de src/routes/donnees.tsx — restauration JSON via `confirm()` (pas d’AlertDialog). */
@Component({
  selector: "app-donnees-page",
  imports: [
    RouterLink,
    LucideAngularModule,
    AppShellComponent,
    UiButtonComponent,
    UiPageHeaderComponent,
  ],
  template: `
    <app-shell perm="data.backup" [area]="t()('sauvegarde.area')">
      <ui-page-header
        [eyebrow]="t()('sauvegarde.eyebrow')"
        [title]="t()('sauvegarde.title')"
        [description]="t()('sauvegarde.description')"
      />

      @if (!nominatif()) {
        <p class="mb-4 rounded-md bg-info-bg p-3 text-sm text-info-fg">
          {{ t()("sauvegarde.notice.noNominatif") }}
        </p>
      }
      @if (nominatif() && !cni()) {
        <p class="mb-4 rounded-md bg-info-bg p-3 text-sm text-info-fg">
          {{ t()("sauvegarde.notice.noCni") }}
        </p>
      }

      <div class="grid grid-cols-[minmax(0,1fr)] gap-6 xl:grid-cols-2">
        <section class="surface p-5">
          <div class="flex items-start gap-3">
            <span class="grid size-10 place-items-center rounded-md bg-primary-soft text-primary">
              <lucide-angular [img]="icons.sheet" class="size-5" />
            </span>
            <div>
              <h2 class="font-semibold">{{ t()("sauvegarde.export.title") }}</h2>
              <p class="text-sm text-muted-foreground">{{ t()("sauvegarde.export.description") }}</p>
            </div>
          </div>
          <ui-button class="mt-4 h-auto min-h-10 max-w-full whitespace-normal py-2" (click)="exportAll()">
            <lucide-angular [img]="icons.download" class="size-4" />
            {{ t()("sauvegarde.export.all") }}
          </ui-button>
          <div class="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {{ t()("sauvegarde.export.single") }}
          </div>
          <ul class="mt-2 divide-y text-sm">
            @for (row of exportRows(); track row.key) {
              <li class="flex items-center justify-between py-2">
                <span>
                  {{ row.label }}
                  <span class="tabular text-muted-foreground">· {{ nf.format(row.n) }}</span>
                </span>
                <ui-button variant="ghost" size="sm" class="h-8" (click)="exportCsv(row.key)">
                  <lucide-angular [img]="icons.download" class="size-4" />
                  {{ t()("sauvegarde.export.csvButton") }}
                </ui-button>
              </li>
            }
          </ul>
        </section>

        <section class="space-y-6">
          <div class="surface p-5">
            <div class="flex items-start gap-3">
              <span class="grid size-10 place-items-center rounded-md bg-primary-soft text-primary">
                <lucide-angular [img]="icons.archive" class="size-5" />
              </span>
              <div>
                <h2 class="font-semibold">{{ t()("sauvegarde.backup.title") }}</h2>
                <p class="text-sm text-muted-foreground">{{ t()("sauvegarde.backup.description") }}</p>
              </div>
            </div>
            <ui-button class="mt-4 h-auto min-h-10 max-w-full whitespace-normal py-2" (click)="backup()">
              <lucide-angular [img]="icons.json" class="size-4" />
              {{ t()("sauvegarde.backup.download") }}
            </ui-button>
            <p class="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <lucide-angular [img]="icons.history" class="size-3.5" />
              @if (lastBackup(); as lb) {
                {{ t()("sauvegarde.backup.last", { date: fmtDateTime(lb.at), user: lb.user }) }}
              } @else {
                {{ t()("sauvegarde.backup.none") }}
              }
            </p>
          </div>
          <div class="surface p-5">
            <div class="flex items-start gap-3">
              <span class="grid size-10 place-items-center rounded-md bg-warning-bg text-warning-fg">
                <lucide-angular [img]="icons.database" class="size-5" />
              </span>
              <div>
                <h2 class="font-semibold">{{ t()("sauvegarde.restore.title") }}</h2>
                <p class="text-sm text-muted-foreground">{{ t()("sauvegarde.restore.description") }}</p>
              </div>
            </div>
            <ui-button
              variant="outline"
              class="mt-4 h-auto min-h-10 max-w-full whitespace-normal py-2"
              (click)="fileInput.click()"
            >
              <lucide-angular [img]="icons.upload" class="size-4" />
              {{ t()("sauvegarde.restore.choose") }}
            </ui-button>
            <input
              #fileInput
              type="file"
              accept=".json,application/json"
              class="sr-only"
              (change)="onRestoreFile($event)"
            />
            <p class="mt-3 text-xs text-muted-foreground">
              {{ t()("sauvegarde.restore.importHintBefore") }}
              <a routerLink="/imports" class="font-semibold text-primary hover:underline">{{
                t()("sauvegarde.restore.importLink")
              }}</a>
              {{ t()("sauvegarde.restore.importHintAfter") }}
            </p>
          </div>
        </section>
      </div>
    </app-shell>
  `,
})
export default class DonneesPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly fmtDateTime = fmtDateTime;
  protected readonly nf = nf;
  protected readonly icons = {
    sheet: FileSpreadsheet,
    download: Download,
    archive: Archive,
    json: FileJson,
    history: History,
    database: Database,
    upload: Upload,
  };

  private readonly EXTRA: { key: ExtraKey; labelKey: `sauvegarde.extra.${ExtraKey}` }[] = [
    { key: "alertes", labelKey: "sauvegarde.extra.alertes" },
    { key: "doublons", labelKey: "sauvegarde.extra.doublons" },
    { key: "corrections", labelKey: "sauvegarde.extra.corrections" },
    { key: "journal", labelKey: "sauvegarde.extra.journal" },
  ];

  protected readonly nominatif = computed(() =>
    can(this.store.state().session, "producer.export_nominatif"),
  );
  protected readonly cni = computed(() => can(this.store.state().session, "cni.read"));

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
    await downloadWorkbook(`mbay_diaay_export_${stamp()}.xlsx`, sheets);
    actions.audit(
      opt.nominatif ? "Export nominatif" : "Export anonymisé",
      "Toutes les données",
      "Classeur Excel complet",
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
      isEntity
        ? exchangeRows(e as EntityKey, s, opt)
        : this.extraRows(e as ExtraKey),
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
  }

  async onRestoreFile(ev: Event): Promise<void> {
    const input = ev.target as HTMLInputElement;
    const f = input.files?.[0];
    if (!f) return;
    try {
      const parsed: unknown = JSON.parse(await f.text());
      if (!isSnapshot(parsed)) throw new Error(this.t()("sauvegarde.restore.notBackup"));
      const after = parsed.data;
      const counts = this.currentCounts();
      const ok = confirm(
        `${this.t()("sauvegarde.confirm.title", { file: f.name })}\n${this.t()("sauvegarde.confirm.description", {
          date: fmtDateTime(parsed.exportedAt),
        })}\n` +
          `organisations ${counts.orgs} → ${after.orgs.length}\n` +
          `producteurs ${counts.producers} → ${after.producers.filter((p) => !p.mergedInto).length}\n` +
          `parcelles ${counts.plots} → ${after.plots.length}`,
      );
      if (ok) {
        actions.restoreSnapshot(parsed);
        alert(this.t()("sauvegarde.restore.done"));
      }
    } catch (e) {
      alert(
        `${this.t()("sauvegarde.restore.failed")}: ${
          e instanceof Error ? e.message : this.t()("sauvegarde.restore.unreadable")
        }`,
      );
    } finally {
      input.value = "";
    }
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
