import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map } from "rxjs";
import {
  LucideAngularModule,
  Download,
  ExternalLink,
  FileText,
  Lock,
  Search,
  SlidersHorizontal,
} from "lucide-angular";

import { actions } from "@/lib/store";
import { KIND_KEY } from "@/lib/dossier-labels";
import { fmtDate, nf1 } from "@/lib/format";
import { scopedLibrary } from "@/lib/scope";
import { LIBRARY_KINDS, type DocumentMeta, type LibraryDocumentKind } from "@/lib/mock/cooperative";
import type { MessageKey } from "@/lib/i18n";
import { AppShellComponent } from "../shared/app-shell.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { UiButtonComponent } from "../shared/ui/button.component";
import { UiChipRailComponent } from "../shared/ui/chip-rail.component";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiPillComponent } from "../shared/ui/pill.component";

const GROUP_KEY: Record<LibraryDocumentKind, MessageKey> = {
  statuts: "documents.group.statuts",
  règlement: "documents.group.reglement",
  "procès-verbal": "documents.group.pv",
  convention: "documents.group.convention",
  justificatif: "documents.group.justificatif",
  autre: "documents.group.autre",
};

/** Port de src/routes/documents.tsx — ajout / suppression de pièces : dialogue à brancher plus tard. */
@Component({
  selector: "app-documents-page",
  imports: [
    FormsModule,
    RouterLink,
    LucideAngularModule,
    AppShellComponent,
    UiButtonComponent,
    UiChipRailComponent,
    UiPageHeaderComponent,
    UiPillComponent,
  ],
  template: `
    <app-shell perm="library.read" [area]="t()('documents.area')">
      <ui-page-header
        [eyebrow]="t()('documents.eyebrow')"
        [title]="t()('documents.title')"
        [description]="t()('documents.description')"
      />

      @if (mine().length > 0) {
        <div class="surface mb-4 flex flex-wrap items-center gap-2 p-3">
          <div class="relative min-w-0 flex-1 basis-48">
            <lucide-angular
              [img]="icons.search"
              class="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 pl-8 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              [attr.aria-label]="t()('documents.search.aria')"
              [placeholder]="t()('documents.search.placeholder')"
              [ngModel]="q()"
              (ngModelChange)="q.set($event)"
            />
          </div>
          <ui-button variant="outline" (click)="filtersOpen.set(!filtersOpen())">
            <lucide-angular [img]="icons.sliders" class="size-4" />
            {{ t()("documents.filters") }}
            @if (kind() !== 'all') {
              <span class="rounded-full bg-primary px-1.5 text-[11px] text-primary-foreground tabular">
                1
              </span>
            }
          </ui-button>
        </div>
      }

      @if (filtersOpen() && mine().length > 0) {
        <div class="surface mb-4 p-4">
          <div class="text-sm font-semibold mb-3">{{ t()("documents.filters") }}</div>
          <ui-chip-rail>
            <button
              type="button"
              class="chip-filter chip-filter-sm"
              [class.chip-filter-active]="kind() === 'all'"
              [attr.aria-pressed]="kind() === 'all'"
              (click)="kind.set('all')"
            >
              {{ t()("documents.filter.all") }}
              <span class="chip-filter-count">{{ matching().length }}</span>
            </button>
            @for (k of libraryKinds; track k) {
              <button
                type="button"
                class="chip-filter chip-filter-sm"
                [class.chip-filter-active]="kind() === k"
                [attr.aria-pressed]="kind() === k"
                (click)="kind.set(kind() === k ? 'all' : k)"
              >
                {{ t()(GROUP_KEY[k]) }}
                <span class="chip-filter-count">{{ countKind(matching(), k) }}</span>
              </button>
            }
          </ui-chip-rail>
          <div class="mt-4 flex gap-2">
            @if (kind() !== 'all') {
              <ui-button variant="outline" (click)="kind.set('all')">
                {{ t()("documents.filters.reset") }}
              </ui-button>
            }
            <ui-button class="flex-1" (click)="filtersOpen.set(false)">
              {{ t()("documents.filters.apply") }}
            </ui-button>
          </div>
        </div>
      }

      @if (shown().length === 0) {
        <div class="surface">
          @if (mine().length === 0) {
            <div class="px-4 py-10 text-center text-muted-foreground">
              <lucide-angular [img]="icons.file" class="mx-auto mb-2 size-10 opacity-50" />
              <div class="font-semibold text-foreground">{{ t()("documents.empty.title") }}</div>
              <p class="mt-1 text-sm">
                {{ canManage() ? t()("documents.empty.manage") : t()("documents.empty.read") }}
              </p>
            </div>
          } @else {
            <div class="px-4 py-10 text-center text-muted-foreground">
              <lucide-angular [img]="icons.search" class="mx-auto mb-2 size-10 opacity-50" />
              <div class="font-semibold text-foreground">{{ t()("documents.empty.filtered") }}</div>
              @if (filtered()) {
                <p class="mt-2">
                  <ui-button variant="outline" (click)="resetFilters()">
                    {{ t()("documents.empty.reset") }}
                  </ui-button>
                </p>
              }
            </div>
          }
        </div>
      } @else {
        <div class="space-y-6">
          @for (g of groups(); track g.kind) {
            <section [attr.aria-labelledby]="'group-' + g.kind">
              <div class="mb-2 flex items-baseline gap-2">
                <h2 [id]="'group-' + g.kind" class="text-base font-semibold">
                  {{ t()(GROUP_KEY[g.kind]) }}
                </h2>
                <span class="text-xs text-muted-foreground">
                  {{ t()("documents.group.count.autre", { count: g.docs.length }) }}
                </span>
              </div>
              <ul class="surface divide-y">
                @for (d of g.docs; track d.id) {
                  <li class="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:p-4">
                    <div class="flex min-w-0 flex-1 items-start gap-3">
                      <lucide-angular
                        [img]="icons.file"
                        class="mt-0.5 size-5 shrink-0 text-muted-foreground sm:mt-0"
                      />
                      <div class="min-w-0 flex-1">
                        <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span class="break-all font-medium">{{ d.name }}</span>
                          <ui-pill
                            [tone]="
                              (d.lifecycle ?? 'en vigueur') === 'remplacé' ? 'neutral' : 'success'
                            "
                          >
                            {{
                              (d.lifecycle ?? "en vigueur") === "remplacé"
                                ? t()("documents.version.replaced")
                                : t()("documents.version.current")
                            }}
                          </ui-pill>
                          <span class="text-xs text-muted-foreground">
                            {{ t()("documents.version.label", { n: d.version ?? 1 }) }}
                          </span>
                          @if (d.sensitive) {
                            <span [attr.title]="t()('documents.sensitive.title')">
                              <ui-pill tone="warning" className="inline-flex items-center gap-1">
                                <lucide-angular [img]="icons.lock" class="size-3" />
                                {{ t()("documents.sensitive.pill") }}
                              </ui-pill>
                            </span>
                          }
                        </div>
                        <div class="mt-0.5 text-xs text-muted-foreground">
                          {{ formatSize(d.sizeKb) }} ·
                          {{
                            t()("documents.version.effect", {
                              date: fmtDate(d.effectiveAt ?? d.uploadedAt),
                            })
                          }}
                          ·
                          {{
                            t()("documents.addedBy", {
                              name: d.uploadedBy,
                              date: fmtDate(d.uploadedAt),
                            })
                          }}
                        </div>
                        @if (meetingOf(d); as mtg) {
                          <a
                            [routerLink]="['/reunions', mtg.id]"
                            class="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-2 hover:underline"
                          >
                            <lucide-angular [img]="icons.external" class="size-3.5" />
                            {{ t()("documents.actions.meeting") }}
                          </a>
                        }
                      </div>
                    </div>
                    <div class="flex items-center gap-2 pl-8 sm:pl-0">
                      @if (canDownload()) {
                        <ui-button variant="outline" class="shrink-0" (click)="download(d)">
                          <lucide-angular [img]="icons.download" class="size-4" />
                          {{ t()("documents.actions.download") }}
                        </ui-button>
                      }
                    </div>
                  </li>
                }
              </ul>
            </section>
          }
        </div>
      }

      @if (canManage()) {
        <p class="mt-4 text-xs text-muted-foreground">
          Dialogue d’ajout et retrait de documents : à brancher (équivalent LibraryAddDialog / FormDialog
          React).
        </p>
      }
    </app-shell>
  `,
})
export default class DocumentsPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly fmtDate = fmtDate;
  protected readonly GROUP_KEY = GROUP_KEY;
  protected readonly libraryKinds = [...LIBRARY_KINDS];
  protected readonly icons = {
    search: Search,
    sliders: SlidersHorizontal,
    file: FileText,
    download: Download,
    external: ExternalLink,
    lock: Lock,
  };

  private readonly route = inject(ActivatedRoute);
  private readonly scoopFilter = toSignal(
    this.route.queryParamMap.pipe(map((m) => m.get("scoop"))),
    { initialValue: null as string | null },
  );

  protected readonly q = signal("");
  protected readonly filtersOpen = signal(false);
  protected readonly kind = signal<LibraryDocumentKind | "all">("all");

  protected readonly canManage = computed(() => this.store.can("library.manage"));
  protected readonly canDownload = computed(() => this.store.can("document.download"));

  protected readonly mine = computed(() => {
    const s = this.store.state();
    const scoop = this.scoopFilter();
    return scopedLibrary(s.documents, s.session).filter((d) => !scoop || d.scoopId === scoop);
  });

  protected readonly matching = computed(() => {
    const needle = this.q().trim().toLowerCase();
    return this.mine().filter((d) => !needle || d.name.toLowerCase().includes(needle));
  });

  protected readonly shown = computed(() => {
    const k = this.kind();
    return this.matching().filter((d) => k === "all" || d.kind === k);
  });

  protected readonly filtered = computed(() => this.kind() !== "all" || !!this.q().trim());

  protected readonly groups = computed(() =>
    this.libraryKinds
      .map((k) => ({
        kind: k,
        docs: this.shown().filter((d) => d.kind === k),
      }))
      .filter((x) => x.docs.length),
  );

  countKind(docs: DocumentMeta[], k: LibraryDocumentKind): number {
    return docs.filter((d) => d.kind === k).length;
  }

  meetingOf(d: DocumentMeta) {
    if (d.kind !== "procès-verbal") return undefined;
    return this.store.state().meetings.find((m) => m.minutes?.documentId === d.id);
  }

  formatSize(kb: number): string {
    return kb >= 1024
      ? this.t()("documents.size.mb", { n: nf1.format(kb / 1024) })
      : this.t()("documents.size.kb", { n: nf1.format(Math.max(1, Math.round(kb))) });
  }

  resetFilters(): void {
    this.kind.set("all");
    this.q.set("");
  }

  download(d: DocumentMeta): void {
    const r = actions.downloadDocument(d.id);
    if (!r.ok) return;
    const blob = new Blob(
      [`${this.t()("documents.demoFile", { name: d.name, kind: this.t()(KIND_KEY[d.kind]) })}\n`],
      { type: "text/plain" },
    );
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${d.name}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  }
}
