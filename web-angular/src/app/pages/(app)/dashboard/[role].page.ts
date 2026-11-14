import { Component, computed, effect, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs";

import { cooperativeHomeId } from "@/lib/scope";
import { StoreService } from "@shared/store.service";
import IndexPage from "../../../features/dashboard/dashboard-home.component";

/**
 * Tableau de bord par rôle : `/dashboard/admin`, `/dashboard/gestionnaire`, etc. (un compte d’une seule coopérative est envoyé sur la fiche de sa coopérative).
 * Les autres pages vivent aussi sous `/dashboard/…` : Analog trie les segments fixes
 * (`rapports`, `producteurs`…) avant ce paramètre, ils ne sont donc jamais pris pour un rôle.
 * Destination après connexion. Le contenu est le tableau de bord commun (`index.page.ts`),
 * déjà filtré par les permissions et le périmètre SCOOP de la session.
 *
 * Le segment d'URL n'accorde aucun droit : si le rôle demandé n'est pas celui de la session
 * (lien partagé, saisie manuelle), on redirige vers le tableau de bord du rôle réel.
 * Sans session, `app-shell` renvoie vers `/login`.
 */
@Component({
  selector: "app-dashboard-role-page",
  imports: [IndexPage],
  template: `<app-index-page />`,
})
export default class DashboardRolePage {
  private readonly store = inject(StoreService);
  private readonly router = inject(Router);
  private readonly role = toSignal(inject(ActivatedRoute).paramMap.pipe(map((p) => p.get("role"))));
  private readonly sessionRole = computed(() => this.store.state().session?.role ?? null);

  constructor() {
    // Un compte d'une seule coopérative arrive sur la fiche de sa coopérative, pas sur le tableau de bord.
    effect(() => {
      const coopId = cooperativeHomeId(this.store.state().session);
      if (coopId) void this.router.navigate(["/dashboard/cooperatives", coopId], { replaceUrl: true });
    });
    effect(() => {
      const actual = this.sessionRole();
      if (actual && this.role() !== actual) {
        void this.router.navigate(["/dashboard", actual], { replaceUrl: true });
      }
    });
  }
}
