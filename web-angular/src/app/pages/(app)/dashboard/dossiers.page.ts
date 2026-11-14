import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { LucideAngularModule, FolderOpen, Plus, Search } from "lucide-angular";

import type { MessageKey } from "@/lib/i18n";
import type { DossierStatus, ProducerDossier } from "@/lib/mock/cooperative";
import { inScope, scopedDossiers } from "@/lib/scope";
import { fmtDate, nf } from "@/lib/format";
import { AppShellComponent } from "../shared/app-shell.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { UiChipRailComponent } from "../shared/ui/chip-rail.component";
import { UiDialogComponent } from "../shared/ui/dialog.component";
import { UiEmptyComponent } from "../shared/ui/empty.component";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiPillComponent, type UiPillTone } from "../shared/ui/pill.component";

type View = "tous" | "a-traiter" | DossierStatus;
const TO_PROCESS: DossierStatus[] = ["soumis", "en examen"];
const FILTERS = ["brouillon", "complément demandé", "approuvé", "refusé"] as const;
const FILTER_LABEL: Record<(typeof FILTERS)[number], MessageKey> = {
  brouillon: "dossiers.filter.brouillon",
  "complément demandé": "dossiers.filter.complément demandé",
  approuvé: "dossiers.filter.approuvé",
  refusé: "dossiers.filter.refusé",
};
const STATUS_TONE: Record<DossierStatus, UiPillTone> = {
  brouillon: "neutral",
  soumis: "warning",
  "en examen": "info",
  "complément demandé": "ochre",
  approuvé: "success",
  refusé: "danger",
};

/** Port de dossiers.index.tsx — liste + création de dossier. */
@Component({
  selector: "app-dossiers-page",
  imports: [
    FormsModule,
    RouterLink,
    LucideAngularModule,
    AppShellComponent,
    UiChipRailComponent,
    UiDialogComponent,
    UiEmptyComponent,
    UiPageHeaderComponent,
    UiPillComponent,
  ],
  template: `
    <app-shell [perm]="perms" [area]="t()('dossiers.area')">
      <ui-page-header
        [eyebrow]="t()('dossiers.eyebrow')"
        [title]="t()('dossiers.title')"
        [description]="
          store.can('dossier.review')
            ? t()('dossiers.description.reviewer')
            : t()('dossiers.description.creator')
        "
      >
        @if (canCreate()) {
          <button
            actions
            type="button"
            class="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground pointer-coarse:h-touch"
            (click)="openNew()"
          >
            <lucide-angular [img]="icons.plus" class="size-4" />
            {{ t()("dossiers.new.title") }}
          </button>
        }
      </ui-page-header>

      @if (feedback()) {
        <p class="mb-4 text-sm text-muted-foreground">{{ feedback() }}</p>
      }

      <section class="toolbar-surface">
        <div class="relative">
          <lucide-angular
            [img]="icons.search"
            class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            class="flex h-11 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm shadow-sm pointer-coarse:h-touch focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            [attr.aria-label]="t()('dossiers.search.aria')"
            [placeholder]="t()('dossiers.search.placeholder')"
            [ngModel]="q()"
            (ngModelChange)="q.set($event)"
          />
        </div>
        <ui-chip-rail [attr.aria-label]="t()('dossiers.filter.group')">
          @for (f of filterButtons(); track f.id) {
            <button
              type="button"
              class="chip-filter"
              [class.chip-filter-active]="view() === f.id"
              [attr.aria-pressed]="view() === f.id"
              (click)="view.set(f.id)"
            >
              {{ f.label }}
              <span class="chip-filter-count">{{ f.count }}</span>
            </button>
          }
        </ui-chip-rail>
      </section>

      <div class="surface divide-y overflow-hidden">
        @for (d of shown(); track d.id) {
          <a [routerLink]="['/dossiers', d.id]" class="list-row">
            <div
              class="grid size-11 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary"
            >
              <lucide-angular [img]="icons.folder" class="size-5" />
            </div>
            <div class="min-w-0 flex-1">
              <div class="font-semibold leading-snug text-foreground">
                {{ d.draft.firstName }} {{ d.draft.lastName }}
              </div>
              <div class="mt-1 text-xs leading-relaxed text-muted-foreground">
                {{ scoopName(d.scoopId) }} · {{ fmtDate(d.updatedAt) }} · {{ d.createdBy }}
              </div>
            </div>
            <ui-pill class="mt-0.5 shrink-0" [tone]="statusTone[d.status]">{{
              t()(statusKey(d.status))
            }}</ui-pill>
          </a>
        } @empty {
          <ui-empty>{{ t()("dossiers.empty.filtered") }}</ui-empty>
        }
      </div>

      <ui-dialog
        [open]="newOpen()"
        (openChange)="onNewOpen($event)"
        [title]="t()('dossiers.new.title')"
      >
        <p class="mb-3 text-sm text-muted-foreground">{{ t()("dossiers.new.description") }}</p>
        <div class="grid grid-cols-2 gap-3">
          <label class="block text-sm font-medium">
            {{ t()("dossiers.new.firstName") }}
            <input
              class="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm font-normal"
              [(ngModel)]="newFirst"
            />
          </label>
          <label class="block text-sm font-medium">
            {{ t()("dossiers.new.lastName") }}
            <input
              class="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm font-normal"
              [(ngModel)]="newLast"
            />
          </label>
        </div>
        <label class="mt-3 block text-sm font-medium">
          {{ t()("dossiers.new.sex") }}
          <select
            class="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm font-normal"
            [(ngModel)]="newSex"
          >
            <option value="F">{{ t()("dossiers.new.female") }}</option>
            <option value="H">{{ t()("dossiers.new.male") }}</option>
          </select>
        </label>
        @if (createScoops().length > 1) {
          <label class="mt-3 block text-sm font-medium">
            {{ t()("dossiers.new.scoop") }}
            <select
              class="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm font-normal"
              [(ngModel)]="newScoopId"
            >
              @for (s of createScoops(); track s.id) {
                <option [value]="s.id">{{ s.name }}</option>
              }
            </select>
          </label>
        }
        <button
          actions
          type="button"
          class="inline-flex h-9 items-center rounded-md border px-4 text-sm"
          (click)="newOpen.set(false)"
        >
          {{ t()("common.cancel") }}
        </button>
        <button
          actions
          type="button"
          class="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50"
          [disabled]="!canSubmitNew()"
          (click)="submitNew()"
        >
          {{ t()("dossiers.new.submit") }}
        </button>
      </ui-dialog>
    </app-shell>
  `,
})
export default class DossiersPage {
  private readonly router = inject(Router);
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly fmtDate = fmtDate;
  protected readonly perms = ["dossier.create", "dossier.review"] as const;
  protected readonly icons = { search: Search, folder: FolderOpen, plus: Plus };
  protected readonly statusTone = STATUS_TONE;
  protected readonly q = signal("");
  protected readonly view = signal<View>("tous");
  protected readonly newOpen = signal(false);
  protected readonly feedback = signal("");

  protected newFirst = "";
  protected newLast = "";
  protected newSex: "F" | "H" = "F";
  protected newScoopId = "";

  private readonly mine = computed(() =>
    scopedDossiers(this.store.state().dossiers, this.store.state().session),
  );

  protected readonly canCreate = computed(() => this.store.can("dossier.create"));

  protected readonly createScoops = computed(() => {
    const session = this.store.state().session;
    return this.store.state().scoops.filter((s) => inScope([{ scoopId: s.id }], session).length === 1);
  });

  protected readonly filterButtons = computed(() => {
    const t = this.t();
    const mine = this.mine();
    const n = (f: (d: ProducerDossier) => boolean) => mine.filter(f).length;
    const buttons: { id: View; label: string; count: number }[] = [
      {
        id: "a-traiter",
        label: t("dossiers.filter.toProcess"),
        count: n((d) => TO_PROCESS.includes(d.status)),
      },
      { id: "tous", label: t("dossiers.filter.all"), count: mine.length },
    ];
    for (const s of FILTERS) {
      buttons.push({ id: s, label: t(FILTER_LABEL[s]), count: n((d) => d.status === s) });
    }
    return buttons;
  });

  protected readonly shown = computed(() => {
    const needle = this.q().trim().toLowerCase();
    const view = this.view();
    return this.mine()
      .filter((d) => {
        const inView =
          view === "tous" ||
          (view === "a-traiter" ? TO_PROCESS.includes(d.status) : d.status === view);
        const okQ =
          !needle ||
          `${d.draft.firstName} ${d.draft.lastName} ${d.createdBy}`.toLowerCase().includes(needle);
        return inView && okQ;
      })
      .sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
  });

  protected scoopName(id: string): string {
    return this.store.state().scoops.find((s) => s.id === id)?.name ?? id;
  }

  protected statusKey(s: DossierStatus): MessageKey {
    return `dossiers.status.${s}` as MessageKey;
  }

  protected openNew(): void {
    this.newFirst = "";
    this.newLast = "";
    this.newSex = "F";
    this.newScoopId = this.createScoops()[0]?.id ?? "";
    this.newOpen.set(true);
  }

  protected onNewOpen(open: boolean): void {
    this.newOpen.set(open);
  }

  protected canSubmitNew(): boolean {
    return !!(this.newFirst.trim() && this.newLast.trim() && this.newScoopId);
  }

  protected submitNew(): void {
    if (!this.canSubmitNew()) return;
    const scoopId = this.newScoopId;
    const org = this.store.state().orgs.find((o) => o.scoopId === scoopId);
    const res = this.store.actions.createDossier(scoopId, {
      firstName: this.newFirst.trim(),
      lastName: this.newLast.trim(),
      sex: this.newSex,
      age: null,
      phone: "",
      cni: "",
      village: org?.village ?? "",
      orgId: org?.id ?? "",
      createMember: true,
    });
    if (!res.ok) {
      this.feedback.set(this.locale.tNow(res.error as MessageKey));
      return;
    }
    this.newOpen.set(false);
    this.feedback.set(this.t()("dossiers.new.done"));
    void this.router.navigate(["/dossiers", res.id]);
  }
}
