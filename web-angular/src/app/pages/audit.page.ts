import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LucideAngularModule, Search, ShieldAlert } from "lucide-angular";

import { scopedAudit } from "@/lib/scope";
import { fmtDateTime, nf } from "@/lib/format";
import { AppShellComponent } from "../shared/app-shell.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { UiEmptyComponent } from "../shared/ui/empty.component";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";

/** Port allégé de audit.tsx — journal en lecture. */
@Component({
  selector: "app-audit-page",
  imports: [
    FormsModule,
    LucideAngularModule,
    AppShellComponent,
    UiEmptyComponent,
    UiPageHeaderComponent,
  ],
  template: `
    <app-shell [perm]="perms" [area]="t()('audit.area')">
      <ui-page-header [title]="t()('audit.title')" [description]="description()" />

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
        @for (a of shown(); track a.id) {
          <div class="flex items-start gap-3 px-4 py-3">
            <div
              class="grid size-10 shrink-0 place-items-center rounded-md bg-primary-soft text-primary"
            >
              <lucide-angular [img]="icons.shield" class="size-5" />
            </div>
            <div class="min-w-0 flex-1">
              <div class="font-semibold">{{ a.action }}</div>
              <div class="mt-0.5 text-xs text-muted-foreground">
                {{ a.user }} · {{ a.entity }} · {{ fmtDateTime(a.at) }}
              </div>
              @if (a.detail) {
                <div class="mt-1 text-xs text-muted-foreground">{{ a.detail }}</div>
              }
            </div>
          </div>
        } @empty {
          <ui-empty>{{ t()("audit.empty.text") }}</ui-empty>
        }
      </div>
    </app-shell>
  `,
})
export default class AuditPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly fmtDateTime = fmtDateTime;
  protected readonly perms = ["audit.read", "audit.read.scoop"] as const;
  protected readonly icons = { search: Search, shield: ShieldAlert };
  protected readonly q = signal("");

  protected readonly description = computed(() => {
    const session = this.store.state().session;
    const key =
      session?.permissions.includes("audit.read")
        ? "audit.description.platform"
        : "audit.description.scoop";
    return this.t()(key);
  });

  protected readonly rows = computed(() =>
    scopedAudit(this.store.state().audit, this.store.state().session),
  );

  protected readonly shown = computed(() => {
    const needle = this.q().trim().toLowerCase();
    return this.rows().filter(
      (a) =>
        !needle ||
        `${a.action} ${a.user} ${a.entity} ${a.detail}`.toLowerCase().includes(needle),
    );
  });
}
