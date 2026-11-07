import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map } from "rxjs";
import { LucideAngularModule, ArrowLeft, Eye, Pencil } from "lucide-angular";

import { fmtAge, fmtDate, fmtDateTime, maskCni, maskPhone, nf, nf1 } from "@/lib/format";
import type { MessageKey } from "@/lib/i18n";
import type { CorrectionChange, Producer } from "@/lib/mock/data";
import { inScope } from "@/lib/store";
import { AppShellComponent } from "../shared/app-shell.component";
import { LocaleService } from "../shared/locale.service";
import { PlotMapComponent } from "../shared/plot-map.component";
import { StoreService } from "../shared/store.service";
import { UiDialogComponent } from "../shared/ui/dialog.component";
import { UiEmptyComponent } from "../shared/ui/empty.component";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiPillComponent, UiQualityPillComponent, type UiPillTone } from "../shared/ui/pill.component";

const PLOT_TONE: Record<string, UiPillTone> = {
  relevée: "info",
  validée: "success",
  "à reprendre": "warning",
  chevauchement: "danger",
};

const STATUS_KEY = {
  recensé: "producteurs.status.recensé",
  membre: "producteurs.status.membre",
} as const satisfies Record<Producer["status"], MessageKey>;

const PHONE_RE = /^7[0678]\s?\d{3}\s?\d{2}\s?\d{2}$/;

/** Port approfondi de producteurs.$id — identité, révélations auditées, demande de correction, carte, parcelles, cultures, historique. */
@Component({
  selector: "app-producteur-detail-page",
  imports: [
    FormsModule,
    RouterLink,
    LucideAngularModule,
    AppShellComponent,
    PlotMapComponent,
    UiDialogComponent,
    UiEmptyComponent,
    UiPageHeaderComponent,
    UiPillComponent,
    UiQualityPillComponent,
  ],
  template: `
    <app-shell perm="producer.read" [area]="t()('producteurs.detail.area')">
      @if (producer(); as p) {
        @if (!inScopeProducer()) {
          <ui-page-header [title]="t()('producteurs.detail.outOfScope')" />
          <p class="text-sm text-muted-foreground">{{ t()("producteurs.detail.outOfScopeDesc") }}</p>
          <a routerLink="/producteurs" class="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
            <lucide-angular [img]="icons.arrowLeft" class="size-4" />
            {{ t()("producteurs.fiche.back") }}
          </a>
        } @else {
          @if (feedback()) {
            <p class="mb-3 text-sm text-muted-foreground">{{ feedback() }}</p>
          }

          <ui-page-header [title]="p.firstName + ' ' + p.lastName" [description]="p.code">
            <a
              actions
              routerLink="/producteurs"
              class="inline-flex h-9 items-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium shadow-sm hover:bg-accent"
            >
              <lucide-angular [img]="icons.arrowLeft" class="size-4" />
              {{ t()("producteurs.index.title") }}
            </a>
          </ui-page-header>

          @if (p.mergedInto) {
            <div class="mb-4 rounded-md bg-info-bg p-3 text-sm text-info-fg">
              {{ t()("producteurs.detail.merged") }}
              <a [routerLink]="['/producteurs', p.mergedInto]" class="ml-1 font-semibold underline">{{
                t()("producteurs.detail.seeMain")
              }}</a>
            </div>
          }

          @if (store.can('producer.edit')) {
            <div class="mb-4">
              <button
                type="button"
                class="inline-flex h-9 items-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium shadow-sm hover:bg-accent"
                (click)="openCorrection()"
              >
                <lucide-angular [img]="icons.pencil" class="size-4" />
                {{ t()("producteurs.detail.requestEdit") }}
              </button>
            </div>
          }

          <h2 class="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {{ t()("producteurs.detail.identity") }}
          </h2>
          <div class="surface mb-4 grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <dt class="text-xs text-muted-foreground">{{ t()("producteurs.detail.sex") }}</dt>
              <dd class="mt-0.5 font-medium">
                {{ t()(p.sex === "F" ? "producteurs.sex.F" : "producteurs.sex.H") }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-muted-foreground">{{ t()("producteurs.detail.age") }}</dt>
              <dd class="mt-0.5 font-medium">{{ fmtAge(p.age) }}</dd>
            </div>
            <div>
              <dt class="text-xs text-muted-foreground">{{ t()("producteurs.detail.handicap") }}</dt>
              <dd class="mt-0.5 font-medium">
                {{ t()(p.handicap ? "producteurs.detail.yes" : "producteurs.detail.no") }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-muted-foreground">{{ t()("producteurs.detail.createdAt") }}</dt>
              <dd class="mt-0.5 font-medium">{{ fmtDate(p.createdAt) }}</dd>
            </div>
            <div>
              <dt class="text-xs text-muted-foreground">{{ t()("producteurs.detail.cni") }}</dt>
              <dd class="mt-0.5 font-medium tabular">
                {{ showCni() ? (p.cni || t()("producteurs.notSet")) : maskCni(p.cni) }}
                @if (canCni() && p.cni && !showCni()) {
                  <button
                    type="button"
                    class="ml-2 inline-flex items-center gap-1 text-xs font-semibold text-primary"
                    (click)="openCniDialog()"
                  >
                    <lucide-angular [img]="icons.eye" class="size-3" />
                    {{ t()("producteurs.detail.reveal") }}
                  </button>
                }
              </dd>
            </div>
            <div>
              <dt class="text-xs text-muted-foreground">{{ t()("producteurs.detail.phone") }}</dt>
              <dd class="mt-0.5 font-medium tabular">
                {{ showPhone() ? (p.phone || t()("producteurs.notSet")) : maskPhone(p.phone) }}
                @if (p.phone && !showPhone() && store.can('producer.edit')) {
                  <button
                    type="button"
                    class="ml-2 text-xs font-semibold text-primary"
                    (click)="revealPhone(p)"
                  >
                    {{ t()("producteurs.detail.reveal") }}
                  </button>
                }
              </dd>
            </div>
            <div>
              <dt class="text-xs text-muted-foreground">{{ t()("producteurs.detail.organisation") }}</dt>
              <dd class="mt-0.5 font-medium">
                @if (org(p.orgId); as o) {
                  <a [routerLink]="['/organisations', o.id]" class="text-primary hover:underline">{{ o.name }}</a>
                } @else {
                  {{ t()("producteurs.notSet") }}
                }
              </dd>
            </div>
            <div>
              <dt class="text-xs text-muted-foreground">{{ t()("producteurs.detail.status") }}</dt>
              <dd class="mt-0.5 font-medium capitalize">{{ t()(STATUS_KEY[p.status]) }}</dd>
            </div>
            <div>
              <dt class="text-xs text-muted-foreground">{{ t()("producteurs.detail.enumerator") }}</dt>
              <dd class="mt-0.5 font-medium">{{ p.enumerator }}</dd>
            </div>
            <div>
              <dt class="text-xs text-muted-foreground">{{ t()("producteurs.col.village") }}</dt>
              <dd class="mt-0.5 font-medium">{{ p.village }}</dd>
            </div>
            <div>
              <dt class="text-xs text-muted-foreground">{{ t()("producteurs.col.quality") }}</dt>
              <dd class="mt-1"><ui-quality-pill [q]="p.quality" /></dd>
            </div>
          </div>

          @if (plots().length && store.can('map.read')) {
            <div class="mb-4">
              <div class="eyebrow mb-2">{{ t()("producteurs.detail.plotsMap") }}</div>
              <div class="h-56 overflow-hidden rounded-md border">
                <app-plot-map
                  [plots]="plots()"
                  [selectedId]="selectedPlotId() ?? plots()[0]!.id"
                  basemap="sat"
                  [onSelect]="selectPlot"
                />
              </div>
              <p class="mt-1.5 text-xs text-muted-foreground">
                {{ t()("producteurs.detail.plotsMapHint") }}
              </p>
            </div>
          }

          <h2 class="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {{ t()("producteurs.detail.section.plots") }} · {{ nf.format(plots().length) }}
          </h2>
          <div class="surface mb-4 divide-y overflow-hidden">
            @for (pl of plots(); track pl.id) {
              <button
                type="button"
                class="flex w-full flex-wrap items-start justify-between gap-2 px-4 py-3 text-left hover:bg-muted/60"
                (click)="selectPlot(pl.id)"
              >
                <div class="min-w-0">
                  <div class="font-semibold">{{ pl.code }} · {{ pl.crop }}</div>
                  <div class="mt-0.5 text-xs text-muted-foreground">
                    {{ t()("producteurs.detail.plot.declared", { value: nf1.format(pl.declared) }) }} ·
                    {{ t()("producteurs.detail.plot.measured", { value: nf1.format(pl.measured) }) }} · {{ pl.campaign }}
                  </div>
                </div>
                <ui-pill [tone]="plotTone[pl.status] ?? 'neutral'">{{ pl.status }}</ui-pill>
              </button>
            } @empty {
              <ui-empty>{{ t()("producteurs.detail.plots.empty") }}</ui-empty>
            }
          </div>

          <h2 class="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {{ t()("producteurs.detail.section.crops") }}
          </h2>
          <div class="surface mb-4 divide-y overflow-hidden">
            @for (c of p.crops; track c.campaign + c.crop) {
              <div class="flex justify-between gap-2 px-4 py-3 text-sm">
                <span class="font-medium">{{ c.crop }}</span>
                <span class="text-muted-foreground">{{ c.campaign }} · {{ nf1.format(c.area) }} ha</span>
              </div>
            } @empty {
              <ui-empty>{{ t()("producteurs.detail.crops.empty") }}</ui-empty>
            }
          </div>

          <h2 class="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {{ t()("producteurs.detail.section.history") }}
          </h2>
          <div class="surface divide-y overflow-hidden">
            @for (h of p.history; track h.at + h.field) {
              <div class="px-4 py-3 text-sm">
                <div class="font-medium">{{ h.field }}</div>
                <div class="mt-0.5 text-xs text-muted-foreground">
                  {{ fmtDateTime(h.at) }} · {{ h.by }} · {{ h.from || t()("producteurs.notSet") }} → {{ h.to }}
                </div>
              </div>
            } @empty {
              <ui-empty>{{ t()("producteurs.detail.history.empty") }}</ui-empty>
            }
          </div>

          <ui-dialog
            [open]="cniOpen()"
            (openChange)="onCniOpenChange($event)"
            [title]="t()('producteurs.detail.cniDialog.title')"
          >
            <p class="text-sm text-muted-foreground">{{ t()("producteurs.detail.cniDialog.description") }}</p>
            <label class="mt-3 block text-sm font-medium">
              {{ t()("producteurs.detail.cniDialog.reason") }}
              <textarea
                class="mt-1 min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-normal"
                [(ngModel)]="cniReason"
                [placeholder]="t()('producteurs.detail.cniDialog.reasonPlaceholder')"
              ></textarea>
            </label>
            <button
              actions
              type="button"
              class="inline-flex h-9 items-center rounded-md border px-4 text-sm"
              (click)="closeCniDialog()"
            >
              {{ t()("common.cancel") }}
            </button>
            <button
              actions
              type="button"
              class="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50"
              [disabled]="cniReason.trim().length < 3"
              (click)="confirmRevealCni()"
            >
              {{ t()("producteurs.detail.cniDialog.submit") }}
            </button>
          </ui-dialog>

          <ui-dialog
            [open]="correctionOpen()"
            (openChange)="onCorrectionOpenChange($event)"
            [title]="correctionDialogTitle()"
          >
            <p class="text-sm text-muted-foreground">{{ t()("producteurs.detail.correction.description") }}</p>
            <div class="mt-3 grid grid-cols-2 gap-3">
              <label class="block text-sm font-medium">
                {{ t()("producteurs.detail.correction.firstName") }}
                <input
                  class="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                  [(ngModel)]="corrFirstName"
                />
              </label>
              <label class="block text-sm font-medium">
                {{ t()("producteurs.detail.correction.lastName") }}
                <input
                  class="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                  [(ngModel)]="corrLastName"
                />
              </label>
            </div>
            <label class="mt-3 block text-sm font-medium">
              {{ t()("producteurs.detail.correction.phone") }}
              @if (corrPhoneErr()) {
                <span class="ml-1 text-xs font-normal text-destructive">{{ corrPhoneErr() }}</span>
              }
              <input
                class="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                [(ngModel)]="corrPhone"
                inputmode="tel"
                placeholder="77 123 45 67"
              />
            </label>
            <label class="mt-3 block text-sm font-medium">
              {{ t()("producteurs.detail.correction.age") }}
              @if (corrAgeErr()) {
                <span class="ml-1 text-xs font-normal text-destructive">{{ corrAgeErr() }}</span>
              }
              <input
                class="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                [(ngModel)]="corrAge"
                inputmode="numeric"
              />
            </label>
            <label class="mt-3 block text-sm font-medium">
              {{ t()("producteurs.detail.correction.status") }}
              <select
                class="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                [(ngModel)]="corrStatus"
              >
                <option value="recensé">{{ t()("producteurs.status.recensé") }}</option>
                <option value="membre">{{ t()("producteurs.status.membre") }}</option>
              </select>
            </label>
            @if (correctionChanges().length > 0) {
              <div class="mt-3 rounded-md border p-3 text-sm">
                <div class="mb-2 font-semibold">
                  {{ t()("producteurs.detail.correction.beforeAfter", { n: correctionChanges().length }) }}
                </div>
                @for (ch of correctionChanges(); track ch.field + ch.from + ch.to) {
                  <div>
                    <span class="font-medium">{{ ch.field }}</span> :
                    <span class="text-muted-foreground line-through">{{ showVal(ch.field, ch.from) }}</span>
                    → {{ showVal(ch.field, ch.to) }}
                  </div>
                }
              </div>
            }
            <label class="mt-3 block text-sm font-medium">
              {{ t()("producteurs.detail.correction.motif") }}
              <textarea
                class="mt-1 min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-normal"
                [(ngModel)]="corrMotif"
                [placeholder]="t()('producteurs.detail.correction.motifPlaceholder')"
              ></textarea>
            </label>
            <button
              actions
              type="button"
              class="inline-flex h-9 items-center rounded-md border px-4 text-sm"
              (click)="correctionOpen.set(false)"
            >
              {{ t()("common.cancel") }}
            </button>
            <button
              actions
              type="button"
              class="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50"
              [disabled]="!canSubmitCorrection()"
              (click)="submitCorrectionForm()"
            >
              {{ t()("producteurs.detail.correction.submit") }}
            </button>
          </ui-dialog>
        }
      } @else {
        <ui-page-header [title]="t()('producteurs.detail.notFound')" />
        <p class="text-sm text-muted-foreground">{{ t()("producteurs.detail.notFoundDesc") }}</p>
        <a routerLink="/producteurs" class="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <lucide-angular [img]="icons.arrowLeft" class="size-4" />
          {{ t()("producteurs.index.title") }}
        </a>
      }
    </app-shell>
  `,
})
export default class ProducteurDetailPage {
  private readonly route = inject(ActivatedRoute);
  readonly store = inject(StoreService);
  readonly locale = inject(LocaleService);
  readonly t = this.locale.t;
  readonly fmtAge = fmtAge;
  readonly fmtDateTime = fmtDateTime;
  readonly fmtDate = fmtDate;
  readonly maskPhone = maskPhone;
  readonly maskCni = maskCni;
  readonly nf = nf;
  readonly nf1 = nf1;
  readonly icons = { arrowLeft: ArrowLeft, eye: Eye, pencil: Pencil };
  readonly plotTone = PLOT_TONE;
  readonly STATUS_KEY = STATUS_KEY;

  readonly selectedPlotId = signal<string | undefined>(undefined);
  readonly selectPlot = (id: string) => this.selectedPlotId.set(id);

  readonly showCni = signal(false);
  readonly showPhone = signal(false);
  readonly feedback = signal("");

  readonly cniOpen = signal(false);
  cniReason = "";

  readonly correctionOpen = signal(false);
  corrFirstName = "";
  corrLastName = "";
  corrPhone = "";
  corrAge = "";
  corrStatus: Producer["status"] = "recensé";
  corrMotif = "";

  private readonly id = toSignal(this.route.paramMap.pipe(map((p) => p.get("id") ?? "")), {
    initialValue: "",
  });

  readonly producer = computed(() => {
    const id = this.id();
    return this.store.state().producers.find((p) => p.id === id);
  });

  readonly inScopeProducer = computed(() => {
    const p = this.producer();
    if (!p) return false;
    return inScope([p], this.store.state().session).length === 1;
  });

  readonly plots = computed(() => {
    const id = this.id();
    return this.store.state().plots.filter((pl) => pl.producerId === id);
  });

  readonly canCni = () => this.store.can("cni.read");

  org(orgId: string): { id: string; name: string } | undefined {
    const o = this.store.state().orgs.find((x) => x.id === orgId);
    return o ? { id: o.id, name: o.name } : undefined;
  }

  showVal(field: string, v: string): string {
    const tr = this.t();
    if (field === "Téléphone") return v ? maskPhone(v) : tr("producteurs.notSet");
    if (field === "CNI") return v ? maskCni(v) : tr("producteurs.notSet");
    return v || tr("producteurs.notSet");
  }

  readonly correctionDialogTitle = computed(() => {
    const p = this.producer();
    if (!p) return "";
    return this.t()("producteurs.detail.correction.title", { name: `${p.firstName} ${p.lastName}` });
  });

  corrPhoneErr(): string {
    if (!this.correctionOpen()) return "";
    const phone = this.corrPhone.trim();
    if (!phone) return "";
    return PHONE_RE.test(phone) ? "" : this.t()("producteurs.detail.correction.phoneError");
  }

  corrAgeErr(): string {
    if (!this.correctionOpen()) return "";
    const raw = this.corrAge.trim();
    if (raw === "") return "";
    const n = Number(raw);
    if (!Number.isInteger(n) || n < 15 || n > 100) return this.t()("producteurs.detail.correction.ageError");
    return "";
  }

  correctionChanges(): CorrectionChange[] {
    const p = this.producer();
    if (!p || !this.correctionOpen()) return [];
    const out: CorrectionChange[] = [];
    if (this.corrFirstName !== p.firstName)
      out.push({ field: "Prénom", from: p.firstName, to: this.corrFirstName });
    if (this.corrLastName !== p.lastName) out.push({ field: "Nom", from: p.lastName, to: this.corrLastName });
    if (this.corrPhone.trim() !== p.phone)
      out.push({ field: "Téléphone", from: p.phone, to: this.corrPhone.trim() });
    const ageRaw = this.corrAge.trim();
    const ageN = ageRaw === "" ? null : Number(ageRaw);
    if (ageN !== null && ageN !== p.age)
      out.push({ field: "Âge", from: p.age === null ? "" : String(p.age), to: String(ageN) });
    if (this.corrStatus !== p.status)
      out.push({ field: "Statut d'adhésion", from: p.status, to: this.corrStatus });
    return out;
  }

  canSubmitCorrection(): boolean {
    const p = this.producer();
    if (!p) return false;
    return (
      this.correctionChanges().length > 0 &&
      this.corrMotif.trim().length >= 10 &&
      !this.corrPhoneErr() &&
      !this.corrAgeErr()
    );
  }

  onCniOpenChange(open: boolean): void {
    this.cniOpen.set(open);
    if (!open) this.cniReason = "";
  }

  openCniDialog(): void {
    this.feedback.set("");
    this.cniReason = "";
    this.cniOpen.set(true);
  }

  closeCniDialog(): void {
    this.cniOpen.set(false);
    this.cniReason = "";
  }

  confirmRevealCni(): void {
    const p = this.producer();
    if (!p) return;
    try {
      this.store.actions.revealCni(p, this.cniReason.trim());
      this.showCni.set(true);
      this.feedback.set(this.t()("producteurs.detail.revealed"));
      this.closeCniDialog();
    } catch {
      this.feedback.set(this.t()("producteurs.detail.cniDialog.tooShort"));
    }
  }

  onCorrectionOpenChange(open: boolean): void {
    this.correctionOpen.set(open);
    if (!open) {
      this.corrMotif = "";
    }
  }

  revealPhone(p: Producer): void {
    this.feedback.set("");
    this.store.actions.revealPhone(p);
    this.showPhone.set(true);
    this.feedback.set(this.t()("producteurs.detail.revealed"));
  }

  openCorrection(): void {
    const p = this.producer();
    if (!p) return;
    this.feedback.set("");
    this.corrFirstName = p.firstName;
    this.corrLastName = p.lastName;
    this.corrPhone = p.phone;
    this.corrAge = p.age === null ? "" : String(p.age);
    this.corrStatus = p.status;
    this.corrMotif = "";
    this.correctionOpen.set(true);
  }

  submitCorrectionForm(): void {
    const p = this.producer();
    if (!p || !this.canSubmitCorrection()) return;
    this.store.actions.submitCorrection(p.id, this.correctionChanges(), this.corrMotif.trim());
    this.correctionOpen.set(false);
    this.feedback.set(
      `${this.t()("producteurs.detail.correction.sent")} — ${this.t()("producteurs.detail.correction.sentDesc")}`,
    );
  }
}
