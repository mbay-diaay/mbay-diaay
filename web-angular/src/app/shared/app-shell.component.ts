import { Component, computed, inject, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { LucideAngularModule, ShieldAlert } from "lucide-angular";

import type { Permission } from "@/lib/permissions";
import { LocaleService } from "./locale.service";
import { StoreService } from "./store.service";

/**
 * Garde de page : `<app-shell perm="producer.read" [area]="…">contenu</app-shell>`.
 *
 * Le cadre (menu, barre du haut, session) n'est plus ici : il vit dans le layout persistant
 * `AppLayoutComponent`, monté une seule fois par `pages/(app).page.ts`. Ce composant ne fait
 * plus que vérifier la permission de la page et afficher « Accès non autorisé » sinon.
 * Le nom `app-shell` est conservé pour ne pas réécrire chaque page.
 */
@Component({
  selector: "app-shell",
  imports: [RouterLink, LucideAngularModule],
  host: { class: "block" },
  template: `
    @if (allowed()) {
      <ng-content />
    } @else if (session(); as s) {
      <div
        class="mx-auto mt-16 max-w-lg rounded-[24px] border p-8 text-center"
        style="border-color: var(--v2-bord-carte); background: var(--v2-blanc)"
      >
        <div
          class="mx-auto mb-4 grid size-12 place-items-center rounded-[14px]"
          style="background: var(--v2-attente-fg); color: var(--v2-attente-bg)"
        >
          <lucide-angular [img]="shieldAlert" [size]="24" />
        </div>
        <h2 class="text-[22px] font-extrabold tracking-[-0.02em]">{{ t()("shell.forbidden.title") }}</h2>
        <p class="mt-2 font-medium" style="color: var(--v2-gris-texte)">{{ t()("shell.forbidden.body", { what: area() }) }}</p>
        <a
          [routerLink]="['/dashboard', s.role]"
          class="mt-6 inline-block cursor-pointer font-bold underline-offset-4 hover:underline"
          style="color: var(--v2-foret-clair)"
        >
          {{ t()("shell.forbidden.back") }}
        </a>
      </div>
    }
  `,
})
export class AppShellComponent {
  readonly perm = input.required<Permission | readonly Permission[]>();
  readonly area = input.required<string>();

  private readonly store = inject(StoreService);
  protected readonly t = inject(LocaleService).t;
  protected readonly shieldAlert = ShieldAlert;
  protected readonly session = computed(() => this.store.state().session);

  protected readonly allowed = computed(() => {
    const session = this.session();
    if (!session) return false;
    const perm = this.perm();
    const perms: readonly Permission[] = Array.isArray(perm) ? perm : [perm as Permission];
    return perms.some((p) => session.permissions.includes(p));
  });
}
