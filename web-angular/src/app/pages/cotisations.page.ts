import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LucideAngularModule, Search, Wallet } from "lucide-angular";

import { memberDues, scoopTotals, type DueState } from "@/lib/contributions";
import { activeMembers } from "@/lib/membership";
import { scopedMembers, scopedPayments, scopedRules } from "@/lib/scope";
import { nf } from "@/lib/format";
import type { MessageKey } from "@/lib/i18n";
import { AppShellComponent } from "../shared/app-shell.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { UiEmptyComponent } from "../shared/ui/empty.component";
import { UiKpiTileComponent } from "../shared/ui/kpi-tile.component";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiPillComponent, type UiPillTone } from "../shared/ui/pill.component";

const STATE_TONE: Record<DueState, UiPillTone> = {
  "à jour": "success",
  "en retard": "warning",
  "jamais payé": "danger",
  "non exigible": "neutral",
};
const STATE_LABEL: Record<DueState, MessageKey> = {
  "à jour": "cotisations.state.à jour",
  "en retard": "cotisations.state.en retard",
  "jamais payé": "cotisations.state.jamais payé",
  "non exigible": "cotisations.state.non exigible",
};

/** Port allégé de cotisations.tsx : KPI + liste des dues (sans saisie paiement). */
@Component({
  selector: "app-cotisations-page",
  imports: [
    FormsModule,
    LucideAngularModule,
    AppShellComponent,
    UiEmptyComponent,
    UiKpiTileComponent,
    UiPageHeaderComponent,
    UiPillComponent,
  ],
  template: `
    <app-shell perm="contribution.read" [area]="t()('cotisations.area')">
      <ui-page-header
        [title]="t()('cotisations.title')"
        [description]="t()('cotisations.description')"
      />

      <div class="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <ui-kpi-tile
          [label]="t()('cotisations.kpi.expected')"
          [value]="locale.formatNumber(totals().expected)"
        />
        <ui-kpi-tile
          [label]="t()('cotisations.kpi.collected')"
          [value]="locale.formatNumber(totals().collected)"
        />
        <ui-kpi-tile
          [label]="t()('cotisations.kpi.late')"
          [value]="nf.format(totals().late)"
          [tone]="totals().late ? 'warning' : 'neutral'"
        />
        <ui-kpi-tile [label]="t()('cotisations.kpi.rate')" [value]="totals().rate + '%'" />
      </div>

      <div class="surface mb-3 p-3">
        <div class="relative">
          <lucide-angular
            [img]="icons.search"
            class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            class="flex h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            [ngModel]="q()"
            (ngModelChange)="q.set($event)"
          />
        </div>
      </div>

      <div class="surface divide-y overflow-hidden">
        @for (row of shown(); track row.member.id) {
          <div class="flex items-start gap-3 px-4 py-3">
            <div
              class="grid size-10 shrink-0 place-items-center rounded-md bg-primary-soft text-primary"
            >
              <lucide-angular [img]="icons.wallet" class="size-5" />
            </div>
            <div class="min-w-0 flex-1">
              <div class="font-semibold">{{ row.name }}</div>
              <div class="mt-0.5 text-xs text-muted-foreground">
                {{ scoopName(row.member.scoopId) }} · attendu
                {{ locale.formatNumber(row.dues.expected) }} · payé
                {{ locale.formatNumber(row.dues.paid) }}
              </div>
            </div>
            <ui-pill [tone]="stateTone[row.dues.state]">{{ t()(stateLabel[row.dues.state]) }}</ui-pill>
          </div>
        } @empty {
          <ui-empty>{{ t()("cotisations.empty.filtered.title") }}</ui-empty>
        }
      </div>
    </app-shell>
  `,
})
export default class CotisationsPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly icons = { search: Search, wallet: Wallet };
  protected readonly stateTone = STATE_TONE;
  protected readonly stateLabel = STATE_LABEL;
  protected readonly q = signal("");

  private readonly duesRows = computed(() => {
    const s = this.store.state();
    const session = s.session;
    const members = activeMembers(scopedMembers(s.members, session));
    const payments = scopedPayments(s.payments, session);
    const rules = scopedRules(s.contributionRules, session);
    const now = new Date().toISOString();
    return members.map((member) => {
      const rule = rules.find((r) => r.scoopId === member.scoopId);
      return {
        member,
        name: `${member.firstName} ${member.lastName}`,
        dues: memberDues(member, rule, payments, now),
      };
    });
  });

  protected readonly totals = computed(() => {
    const s = this.store.state();
    const session = s.session;
    const members = activeMembers(scopedMembers(s.members, session));
    const payments = scopedPayments(s.payments, session);
    const rules = scopedRules(s.contributionRules, session);
    const now = new Date().toISOString();
    let expected = 0;
    let collected = 0;
    let late = 0;
    const byScoop = new Map<string, typeof members>();
    for (const m of members) {
      const list = byScoop.get(m.scoopId) ?? [];
      list.push(m);
      byScoop.set(m.scoopId, list);
    }
    for (const [scoopId, mine] of byScoop) {
      const tt = scoopTotals(
        mine,
        rules.find((r) => r.scoopId === scoopId),
        payments,
        now,
      );
      expected += tt.expected;
      collected += tt.collected;
      late += tt.late;
    }
    const rate = expected ? Math.round((collected / expected) * 100) : 0;
    return { expected, collected, late, rate };
  });

  protected readonly shown = computed(() => {
    const needle = this.q().trim().toLowerCase();
    return this.duesRows().filter((r) => !needle || r.name.toLowerCase().includes(needle));
  });

  protected scoopName(id: string): string {
    return this.store.state().scoops.find((s) => s.id === id)?.name ?? id;
  }
}
