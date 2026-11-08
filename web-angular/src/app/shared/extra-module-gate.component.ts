import { Component, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { EXTRA_MODULES_ENABLED } from "@/lib/modules-preview";
import { LocaleService } from "./locale.service";

/**
 * Garde d’activation M2–M5 : sans `VITE_ENABLE_EXTRA_MODULES=true`,
 * redirige vers l’accueil (modules absents du menu prod).
 */
@Component({
  selector: "app-extra-module-gate",
  template: `
    @if (enabled) {
      <ng-content />
    } @else {
      <div class="surface mx-auto mt-10 max-w-lg p-6 text-sm text-muted-foreground" role="status">
        {{ t()("modules.preview.blocked") }}
      </div>
    }
  `,
})
export class ExtraModuleGateComponent implements OnInit {
  private readonly router = inject(Router);
  protected readonly t = inject(LocaleService).t;
  protected readonly enabled = EXTRA_MODULES_ENABLED;

  ngOnInit(): void {
    if (!this.enabled) {
      void this.router.navigateByUrl("/");
    }
  }
}
