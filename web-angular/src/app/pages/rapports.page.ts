import { Component, inject } from "@angular/core";
import { LucideAngularModule, FileText } from "lucide-angular";

import { REPORTS } from "@/lib/reports";
import { AppShellComponent } from "../shared/app-shell.component";
import { LocaleService } from "../shared/locale.service";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";

/** Port allégé de rapports.tsx — catalogue des rapports (génération complète plus tard). */
@Component({
  selector: "app-rapports-page",
  imports: [LucideAngularModule, AppShellComponent, UiPageHeaderComponent],
  template: `
    <app-shell perm="report.read" [area]="t()('rapports.area')">
      <ui-page-header
        [title]="t()('rapports.title')"
        [description]="t()('rapports.description')"
      />
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        @for (r of reports; track r.id) {
          <div class="surface flex flex-col p-5">
            <div class="flex items-center gap-2 text-primary">
              <lucide-angular [img]="icons.file" class="size-5" />
              <h2 class="font-semibold text-foreground">{{ t()(r.nameKey) }}</h2>
            </div>
            <p class="mt-2 flex-1 text-sm text-muted-foreground">{{ t()(r.descriptionKey) }}</p>
            <button
              type="button"
              disabled
              class="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground opacity-60"
            >
              {{ t()("rapports.generate") }}
            </button>
          </div>
        }
      </div>
      <p class="mt-4 text-xs text-muted-foreground">
        Génération CSV/PDF pas encore branchée côté Angular — catalogue aligné sur le React.
      </p>
    </app-shell>
  `,
})
export default class RapportsPage {
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly reports = REPORTS;
  protected readonly icons = { file: FileText };
}
