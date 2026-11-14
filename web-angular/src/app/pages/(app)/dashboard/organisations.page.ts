import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { LucideAngularModule, Search, Users } from "lucide-angular";

import { inScope } from "@/lib/scope";
import { nf } from "@/lib/format";
import { AppShellComponent } from "../shared/app-shell.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { UiEmptyComponent } from "../shared/ui/empty.component";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";

/** Port allégé de organisations.index.tsx. */
@Component({
  selector: "app-organisations-page",
  imports: [
    FormsModule,
    RouterLink,
    LucideAngularModule,
    AppShellComponent,
    UiEmptyComponent,
    UiPageHeaderComponent,
  ],
  template: `
    <app-shell perm="org.read" [area]="t()('organisations.area')">
      <ui-page-header
        [title]="t()('organisations.title')"
        [description]="t()('organisations.description')"
      />
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
        @for (o of shown(); track o.id) {
          <a
            [routerLink]="['/organisations', o.id]"
            class="flex items-start gap-3 px-4 py-3 hover:bg-muted/60"
          >
            <div
              class="grid size-10 shrink-0 place-items-center rounded-md bg-primary-soft text-primary"
            >
              <lucide-angular [img]="icons.users" class="size-5" />
            </div>
            <div class="min-w-0 flex-1">
              <div class="font-semibold">{{ o.name }}</div>
              <div class="mt-0.5 text-xs text-muted-foreground">
                {{ o.type ?? "—" }} · {{ scoopName(o.scoopId) }} ·
                {{ nf.format(producerCount(o.id)) }} producteurs
              </div>
            </div>
          </a>
        } @empty {
          <ui-empty>{{ t()("organisations.empty.none") }}</ui-empty>
        }
      </div>
    </app-shell>
  `,
})
export default class OrganisationsPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly icons = { search: Search, users: Users };
  protected readonly q = signal("");

  protected readonly shown = computed(() => {
    const s = this.store.state();
    const needle = this.q().trim().toLowerCase();
    return inScope(s.orgs, s.session).filter(
      (o) => !needle || `${o.name} ${o.type ?? ""}`.toLowerCase().includes(needle),
    );
  });

  protected scoopName(id: string): string {
    return this.store.state().scoops.find((s) => s.id === id)?.name ?? id;
  }

  protected producerCount(orgId: string): number {
    return this.store.state().producers.filter((p) => p.orgId === orgId && !p.mergedInto).length;
  }
}
