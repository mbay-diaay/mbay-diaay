import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LucideAngularModule, Search } from "lucide-angular";

import { inScope } from "@/lib/store";
import { nf } from "@/lib/format";
import type { AlertStatus, DataAlert } from "@/lib/mock/data";
import type { MessageKey } from "@/lib/i18n";
import { AppShellComponent } from "../shared/app-shell.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { UiDialogComponent } from "../shared/ui/dialog.component";
import { UiEmptyComponent } from "../shared/ui/empty.component";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiPillComponent, type UiPillTone } from "../shared/ui/pill.component";

const STATUS_TONE: Record<AlertStatus, UiPillTone> = {
  ouvert: "warning",
  "en vérification": "info",
  résolu: "success",
  rejeté: "neutral",
};
const SEV_TONE = { faible: "neutral", moyenne: "ochre", élevée: "danger" } as const;
const STATUS_LABEL: Record<AlertStatus, MessageKey> = {
  ouvert: "qualite.alertes.statusValue.ouvert",
  "en vérification": "qualite.alertes.statusValue.en vérification",
  résolu: "qualite.alertes.statusValue.résolu",
  rejeté: "qualite.alertes.statusValue.rejeté",
};

/** Port de qualite.alertes.tsx — liste + résoudre / rejeter. */
@Component({
  selector: "app-qualite-alertes-page",
  imports: [
    FormsModule,
    LucideAngularModule,
    AppShellComponent,
    UiDialogComponent,
    UiEmptyComponent,
    UiPageHeaderComponent,
    UiPillComponent,
  ],
  template: `
    <app-shell perm="alert.manage" [area]="t()('qualite.alertes.area')">
      <ui-page-header
        [title]="t()('qualite.alertes.area')"
        [description]="t()('qualite.alertes.description')"
      />

      <div class="surface mb-3 flex flex-wrap gap-2 p-3">
        <div class="relative min-w-0 flex-1 basis-48">
          <lucide-angular
            [img]="icons.search"
            class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            class="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm shadow-sm pointer-coarse:h-touch focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            [attr.aria-label]="t()('qualite.alertes.searchAria')"
            [placeholder]="t()('qualite.alertes.searchPlaceholder')"
            [ngModel]="q()"
            (ngModelChange)="q.set($event)"
          />
        </div>
        <select
          class="h-10 rounded-md border border-input bg-background px-3 text-sm pointer-coarse:h-touch"
          [attr.aria-label]="t()('qualite.alertes.status.aria')"
          [ngModel]="status()"
          (ngModelChange)="status.set($event)"
        >
          <option value="ouvert">{{ t()("qualite.alertes.statusValue.ouvert") }}</option>
          <option value="en vérification">
            {{ t()("qualite.alertes.statusValue.en vérification") }}
          </option>
          <option value="résolu">{{ t()("qualite.alertes.statusValue.résolu") }}</option>
          <option value="rejeté">{{ t()("qualite.alertes.statusValue.rejeté") }}</option>
          <option value="__all">{{ t()("qualite.common.all") }}</option>
        </select>
      </div>

      <div class="surface divide-y overflow-hidden">
        @for (a of rows(); track a.id) {
          <div class="flex flex-wrap items-start gap-3 px-4 py-3">
            <div class="min-w-0 flex-1">
              <div class="font-semibold">{{ a.type }}</div>
              <div class="mt-0.5 text-xs text-muted-foreground">
                {{ a.entity }} · {{ a.entityId }} · {{ a.enumerator }}
              </div>
            </div>
            <ui-pill [tone]="sevTone[a.severity]">{{ a.severity }}</ui-pill>
            <ui-pill [tone]="statusTone[a.status]">{{ t()(statusLabel[a.status]) }}</ui-pill>
            @if (a.status === "ouvert" || a.status === "en vérification") {
              <div class="flex gap-1">
                <button
                  type="button"
                  class="h-8 rounded-md border px-2 text-xs font-medium hover:bg-muted pointer-coarse:h-touch"
                  (click)="openDecision(a, 'résolu')"
                >
                  {{ t()("qualite.alertes.resolve") }}
                </button>
                <button
                  type="button"
                  class="h-8 rounded-md border px-2 text-xs font-medium hover:bg-muted pointer-coarse:h-touch"
                  (click)="openDecision(a, 'rejeté')"
                >
                  {{ t()("qualite.alertes.reject") }}
                </button>
              </div>
            }
          </div>
        } @empty {
          <ui-empty>{{ t()("qualite.alertes.empty") }}</ui-empty>
        }
      </div>
      <p class="mt-2 text-xs text-muted-foreground">{{ nf.format(rows().length) }}</p>

      <ui-dialog [(open)]="dialogOpen" [title]="dialogTitle()">
        <label class="block text-sm font-medium">{{ t()("qualite.common.comment") }}</label>
        <textarea
          class="mt-1 min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          [ngModel]="comment()"
          (ngModelChange)="comment.set($event)"
        ></textarea>
        <button
          actions
          type="button"
          class="inline-flex h-9 items-center rounded-md border px-4 text-sm font-medium hover:bg-muted"
          (click)="dialogOpen.set(false)"
        >
          {{ t()("common.cancel") }}
        </button>
        <button
          actions
          type="button"
          class="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
          (click)="confirmDecision()"
        >
          {{ dialogTitle() }}
        </button>
      </ui-dialog>
    </app-shell>
  `,
})
export default class QualiteAlertesPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly icons = { search: Search };
  protected readonly statusTone = STATUS_TONE;
  protected readonly sevTone = SEV_TONE;
  protected readonly statusLabel = STATUS_LABEL;
  protected readonly q = signal("");
  protected readonly status = signal<AlertStatus | "__all">("ouvert");
  protected readonly dialogOpen = signal(false);
  protected readonly comment = signal("");
  private readonly pending = signal<{ id: string; status: AlertStatus } | null>(null);

  protected readonly dialogTitle = computed(() => {
    const p = this.pending();
    if (!p) return "";
    return p.status === "résolu"
      ? this.t()("qualite.alertes.resolve")
      : this.t()("qualite.alertes.reject");
  });

  protected readonly rows = computed(() => {
    const s = this.store.state();
    const session = s.session;
    const mine = new Set(inScope(s.producers, session).map((p) => p.id));
    const minePlots = new Set(s.plots.filter((p) => mine.has(p.producerId)).map((p) => p.id));
    const needle = this.q().trim().toLowerCase();
    const st = this.status();
    return s.alerts
      .filter(
        (a: DataAlert) =>
          (mine.has(a.entityId) || minePlots.has(a.entityId)) &&
          (st === "__all" || a.status === st) &&
          (!needle ||
            `${a.type} ${a.entityId} ${a.enumerator}`.toLowerCase().includes(needle)),
      )
      .sort((a, b) => {
        const rank = { élevée: 0, moyenne: 1, faible: 2 } as const;
        return rank[a.severity] - rank[b.severity] || a.id.localeCompare(b.id);
      });
  });

  protected openDecision(a: DataAlert, status: AlertStatus): void {
    this.pending.set({ id: a.id, status });
    this.comment.set("");
    this.dialogOpen.set(true);
  }

  protected confirmDecision(): void {
    const p = this.pending();
    if (!p) return;
    this.store.actions.updateAlerts([p.id], p.status, this.comment().trim());
    this.dialogOpen.set(false);
    this.pending.set(null);
  }
}
