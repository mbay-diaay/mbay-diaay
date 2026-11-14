import { Component, computed, effect, inject } from "@angular/core";
import { Router } from "@angular/router";

import { StoreService } from "@shared/store.service";

/**
 * `/` : toutes les pages connectées vivent sous `/dashboard/…`. La racine renvoie vers
 * le tableau de bord du rôle (`/dashboard/<rôle>`) ; sans session, le layout renvoie vers `/login`.
 */
@Component({
  selector: "app-root-redirect-page",
  template: ``,
})
export default class RootRedirectPage {
  private readonly store = inject(StoreService);
  private readonly router = inject(Router);
  private readonly role = computed(() => this.store.state().session?.role ?? null);

  constructor() {
    effect(() => {
      const role = this.role();
      if (role) void this.router.navigate(["/dashboard", role], { replaceUrl: true });
    });
  }
}
