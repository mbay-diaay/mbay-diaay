import { Component, effect, inject } from "@angular/core";
import { Router } from "@angular/router";

/** Ancienne URL React `/corrections` → `/qualite/corrections`. */
@Component({
  selector: "app-corrections-redirect-page",
  template: `<p class="p-8 text-sm text-muted-foreground">Redirection…</p>`,
})
export default class CorrectionsRedirectPage {
  private readonly router = inject(Router);

  constructor() {
    effect(() => {
      void this.router.navigateByUrl("/qualite/corrections", { replaceUrl: true });
    });
  }
}
