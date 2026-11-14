import { Component, computed, inject } from "@angular/core";
import { RouterLink } from "@angular/router";

import { qualityCounts, QUALITY_SECTIONS } from "@/lib/quality-nav";
import type { MessageKey } from "@/lib/i18n";
import type { Permission } from "@/lib/permissions";
import { AppShellComponent } from "../shared/app-shell.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";

const SECTION_LABEL: Record<string, MessageKey> = {
  "/qualite/doublons": "qualite.nav.doublons",
  "/qualite/alertes": "qualite.nav.alertes",
  "/qualite/corrections": "qualite.nav.corrections",
};

/**
 * Hub `/qualite` : liens vers doublons / alertes / corrections avec compteurs.
 * La redirection automatique vers la première section (React) est remplacée pour
 * que les trois liens restent utilisables.
 */
@Component({
  selector: "app-qualite-page",
  imports: [RouterLink, AppShellComponent, UiPageHeaderComponent],
  template: `
    <app-shell [perm]="hubPerm()" [area]="t()('qualite.header.title')">
      <ui-page-header
        [eyebrow]="t()('qualite.header.eyebrow')"
        [title]="t()('qualite.header.title')"
        [description]="t()('qualite.hub.intro')"
      />
      <ul class="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        @for (s of sections(); track s.to) {
          <li>
            <a
              [routerLink]="s.to"
              class="surface flex flex-col gap-1 p-4 transition-colors hover:bg-muted/60"
            >
              <span class="font-semibold">{{ sectionTitle(s.to) }}</span>
              <span class="text-xs text-muted-foreground tabular">
                {{ countFor(s.to) }} {{ t()('qualite.hub.countLabel') }}
              </span>
            </a>
          </li>
        }
      </ul>
    </app-shell>
  `,
})
export default class QualitePage {
  private readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly sectionLabel = SECTION_LABEL;

  /** Au moins un des droits « qualité » suffit pour afficher le hub. */
  protected hubPerm = computed(
    (): readonly Permission[] => [...new Set(QUALITY_SECTIONS.map((s) => s.perm))],
  );

  protected sections = computed(() => {
    const perms = this.store.state().session?.permissions ?? [];
    return QUALITY_SECTIONS.filter((s) => perms.includes(s.perm));
  });

  protected countFor(to: string): number {
    const q = qualityCounts(this.store.state());
    if (to === "/qualite/doublons") return q.doublons;
    if (to === "/qualite/alertes") return q.alertes;
    if (to === "/qualite/corrections") return q.corrections;
    return 0;
  }

  protected sectionTitle(to: string): string {
    const key = this.sectionLabel[to];
    return key ? this.t()(key) : to;
  }
}
