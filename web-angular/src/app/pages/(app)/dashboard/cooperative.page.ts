import { Component, effect, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs";

import { isConsolidated, scoopIdsOf } from "@/lib/scope";
import { AppShellComponent } from "@shared/app-shell.component";
import { LocaleService } from "@shared/locale.service";
import { StoreService } from "@shared/store.service";

/**
 * Port de src/routes/cooperative.tsx — redirection vers la fiche SCOOP unique du périmètre
 * ou vers la liste, selon la session et le paramètre `scoop` de l’URL.
 */
@Component({
  selector: "app-cooperative-page",
  imports: [AppShellComponent],
  template: `
    <app-shell [perm]="perms" [area]="t()('cooperatives.fiche.area')">
      <p class="text-sm text-muted-foreground">Redirection…</p>
    </app-shell>
  `,
})
export default class CooperativePage {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly perms = ["member.read", "scoop.manage", "org.read"] as const;

  private readonly scoopQuery = toSignal(
    this.route.queryParamMap.pipe(map((m) => m.get("scoop"))),
    { initialValue: null as string | null },
  );

  constructor() {
    effect(() => {
      const session = this.store.state().session;
      if (!session) return;
      const scoopQ = this.scoopQuery();
      if (scoopQ) {
        void this.router.navigate(["/dashboard/cooperatives", scoopQ], {
          replaceUrl: true,
          queryParams: {},
        });
        return;
      }
      const ids = [...scoopIdsOf(session)];
      const only = !isConsolidated(session) && ids.length === 1 ? ids[0] : undefined;
      if (only) {
        void this.router.navigate(["/dashboard/cooperatives", only], { replaceUrl: true });
      } else {
        void this.router.navigate(["/dashboard/cooperatives"], { replaceUrl: true });
      }
    });
  }
}
