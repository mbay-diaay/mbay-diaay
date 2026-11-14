import { Component, computed, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map } from "rxjs";
import { LucideAngularModule, ArrowLeft } from "lucide-angular";

import { nf } from "@/lib/format";
import { AppShellComponent } from "../shared/app-shell.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiPillComponent } from "../shared/ui/pill.component";

/** Stub fiche SCOOP — à enrichir (onglets React cooperatives.$id). */
@Component({
  selector: "app-cooperative-detail-page",
  imports: [RouterLink, LucideAngularModule, AppShellComponent, UiPageHeaderComponent, UiPillComponent],
  template: `
    <app-shell [perm]="perms" [area]="t()('cooperatives.area')">
      @if (scoop(); as c) {
        <ui-page-header [title]="c.name" [description]="c.code + ' · ' + c.commune">
          <a
            actions
            routerLink="/cooperatives"
            class="inline-flex h-9 items-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium shadow-sm hover:bg-accent"
          >
            <lucide-angular [img]="icons.arrowLeft" class="size-4" />
            {{ t()("cooperatives.title") }}
          </a>
        </ui-page-header>
        <div class="surface grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt class="text-xs text-muted-foreground">{{ t()("cooperatives.kpi.producers") }}</dt>
            <dd class="mt-0.5 text-xl font-semibold tabular">{{ nf.format(stats().producers) }}</dd>
          </div>
          <div>
            <dt class="text-xs text-muted-foreground">{{ t()("cooperatives.kpi.active") }}</dt>
            <dd class="mt-0.5 text-xl font-semibold tabular">{{ nf.format(stats().members) }}</dd>
          </div>
          <div>
            <dt class="text-xs text-muted-foreground">Statut</dt>
            <dd class="mt-1">
              @if (c.archived) {
                <ui-pill tone="neutral">{{ t()("cooperatives.filter.archived") }}</ui-pill>
              } @else {
                <ui-pill tone="success">{{ t()("cooperatives.filter.active") }}</ui-pill>
              }
            </dd>
          </div>
        </div>
        <p class="mt-4 text-xs text-muted-foreground">
          Fiche partielle : onglets membres / GIE / invitations seront portés ensuite.
        </p>
      } @else {
        <ui-page-header [title]="t()('cooperatives.empty.none')" />
        <a routerLink="/cooperatives" class="text-sm font-medium text-primary hover:underline">
          ← {{ t()("cooperatives.title") }}
        </a>
      }
    </app-shell>
  `,
})
export default class CooperativeDetailPage {
  private readonly route = inject(ActivatedRoute);
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly perms = ["scoop.manage", "org.read"] as const;
  protected readonly icons = { arrowLeft: ArrowLeft };

  private readonly id = toSignal(this.route.paramMap.pipe(map((p) => p.get("id") ?? "")), {
    initialValue: "",
  });

  protected readonly scoop = computed(() =>
    this.store.state().scoops.find((s) => s.id === this.id()),
  );

  protected readonly stats = computed(() => {
    const id = this.id();
    const s = this.store.state();
    return {
      producers: s.producers.filter((p) => p.scoopId === id && !p.mergedInto).length,
      members: s.members.filter((m) => m.scoopId === id && m.status === "membre").length,
    };
  });
}
