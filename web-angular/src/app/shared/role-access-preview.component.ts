import { Component, computed, inject, input } from "@angular/core";

import type { MessageKey } from "@/lib/i18n";
import { NAV, navAllowed } from "@/lib/nav";
import type { Permission } from "@/lib/permissions";
import type { Session } from "@/lib/store";

import { LocaleService } from "./locale.service";
import { IconComponent } from "./ui/icon.component";
import { V2_PAGE_STYLES } from "./ui/v2-page.styles";

/**
 * Aperçu des écrans que verront les utilisateurs d'un rôle : le menu de l'application calculé avec les droits donnés
 * (même règle que le vrai menu). Les modules « à venir » n'y figurent pas.
 *
 * `<app-role-access-preview [permissions]="draft()" [scoped]="true" />`
 * - `hint` et `emptyText` remplacent les textes par défaut (ex. dans la fenêtre de création) ;
 * - `bare` retire le cadre de carte quand l'aperçu est déjà dans un cadre.
 */
@Component({
  selector: "app-role-access-preview",
  imports: [IconComponent],
  host: { class: "block" },
  styles: [
    V2_PAGE_STYLES,
    `
      .access-groups {
        display: grid;
        gap: 14px 24px;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }
      .access-chip {
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        background: var(--v2-sauge);
        padding: 5px 12px;
        font-size: 13px;
        font-weight: 700;
        color: var(--v2-vert-pousse);
      }
      .framed {
        border-radius: 24px;
        border: 1px solid var(--v2-bord-carte);
        background: var(--v2-blanc);
        padding: 20px;
      }
      .plain {
        border-radius: 18px;
        background: var(--v2-creme);
        padding: 16px;
      }
    `,
  ],
  template: `
    <section [class]="bare() ? 'plain' : 'framed'" aria-live="polite">
      <div class="flex flex-wrap items-baseline justify-between gap-2">
        <h3 class="flex items-center gap-2 text-[16px] font-extrabold"><ui-icon name="visibility" [size]="18" />{{ t()("roles.access.title") }}</h3>
        <span class="sub">{{ t()("roles.access.count", { count: screenCount() }) }}</span>
      </div>
      <p class="sub mt-1">{{ hint() || t()("roles.access.hint") }}</p>
      @if (accessGroups().length) {
        <div class="access-groups mt-4">
          @for (accessGroup of accessGroups(); track accessGroup.key) {
            <div>
              <p class="mono" style="color: var(--v2-gris-texte)">{{ t()(accessGroup.title) }}</p>
              <div class="mt-2 flex flex-wrap gap-2">
                @for (screen of accessGroup.screens; track screen.key) {
                  <span class="access-chip">{{ t()(screen.label) }}</span>
                }
              </div>
            </div>
          }
        </div>
      } @else {
        <p class="mt-4 text-[14px] font-medium" style="color: var(--v2-gris-texte)">{{ emptyText() || t()("roles.access.none") }}</p>
      }
    </section>
  `,
})
export class RoleAccessPreviewComponent {
  /** Droits dont on calcule les écrans. */
  readonly permissions = input.required<readonly Permission[]>();
  /** Rôle limité à sa coopérative (sinon vue consolidée) : certains écrans en dépendent. */
  readonly scoped = input(true);
  readonly hint = input("");
  readonly emptyText = input("");
  readonly bare = input(false);

  protected readonly t = inject(LocaleService).t;

  protected readonly accessGroups = computed(() => {
    const previewSession = {
      name: "",
      email: "",
      role: "gestionnaire",
      permissions: [...this.permissions()],
      scope: { kind: this.scoped() ? "scoop" : "consolidé" },
      expiresAt: 0,
    } as Session;
    return NAV.map((navGroup) => ({
      key: navGroup.group,
      title: navGroup.groupKey as MessageKey,
      screens: navGroup.items
        .filter((item) => !item.soon && navAllowed(previewSession, item))
        .map((item) => ({ key: item.to, label: item.labelKey as MessageKey })),
    })).filter((accessGroup) => accessGroup.screens.length);
  });

  protected readonly screenCount = computed(() =>
    this.accessGroups().reduce((total, accessGroup) => total + accessGroup.screens.length, 0),
  );
}
