import { Component, computed, effect, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map } from "rxjs";
import { LucideAngularModule, ArrowLeft, FolderOpen, Upload } from "lucide-angular";

import { KIND_KEY } from "@/lib/dossier-labels";
import { decisionCheck } from "@/lib/dossiers";
import { maskCni, maskPhone } from "@/lib/format";
import type { MessageKey } from "@/lib/i18n";
import {
  DOCUMENT_KINDS,
  REFUSAL_REASONS,
  type DocumentKind,
  type DossierDraft,
  type DossierStatus,
  type RefusalReason,
} from "@/lib/mock/cooperative";
import { scopedDossiers } from "@/lib/scope";
import { AppShellComponent } from "../shared/app-shell.component";
import { LocaleService } from "../shared/locale.service";
import { StoreService } from "../shared/store.service";
import { UiDialogComponent } from "../shared/ui/dialog.component";
import { UiEmptyComponent } from "../shared/ui/empty.component";
import { UiPageHeaderComponent } from "../shared/ui/page-header.component";
import { UiPillComponent, type UiPillTone } from "../shared/ui/pill.component";

const STATUS_TONE: Record<DossierStatus, UiPillTone> = {
  brouillon: "neutral",
  soumis: "warning",
  "en examen": "info",
  "complément demandé": "ochre",
  approuvé: "success",
  refusé: "danger",
};

type DialogKind = "approve" | "complement" | "refuse" | null;

/** Fiche dossier — décisions review (startReview / approve / complement / refuse). */
@Component({
  selector: "app-dossier-detail-page",
  imports: [
    FormsModule,
    RouterLink,
    LucideAngularModule,
    AppShellComponent,
    UiDialogComponent,
    UiPageHeaderComponent,
    UiEmptyComponent,
    UiPillComponent,
  ],
  template: `
    <app-shell [perm]="perms" [area]="t()('dossiers.detail.area')">
      @if (!dossier()) {
        <ui-empty>
          <div class="mx-auto mb-3 grid size-12 place-items-center text-muted-foreground">
            <lucide-angular [img]="icons.folder" class="size-8" />
          </div>
          <p class="font-semibold">{{ t()("dossiers.detail.notFound.title") }}</p>
          <p class="mt-1 text-sm">{{ t()("dossiers.detail.notFound.text") }}</p>
        </ui-empty>
      } @else {
        @if (dossier(); as d) {
          <a
            routerLink="/dossiers"
            class="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <lucide-angular [img]="icons.arrowLeft" class="size-4" />
            {{ t()("dossiers.detail.back") }}
          </a>

          <ui-page-header
            [eyebrow]="t()('dossiers.detail.eyebrow', { id: d.id })"
            [title]="
              (d.draft.firstName || t()('dossiers.row.noFirstName')) +
              ' ' +
              (d.draft.lastName || t()('dossiers.row.noLastName'))
            "
            [description]="
              t()('dossiers.detail.description', {
                scoop: scoopName(d.scoopId),
                by: d.createdBy,
              })
            "
          >
            <ui-pill actions [tone]="statusTone(d.status)">{{
              t()(statusKey(d.status))
            }}</ui-pill>
          </ui-page-header>

          @if (feedback()) {
            <p class="mb-3 text-sm text-muted-foreground">{{ feedback() }}</p>
          }

          @if (canReview()) {
            <div class="mb-4 flex flex-wrap gap-2">
              @if (d.status === "soumis") {
                <button
                  type="button"
                  class="inline-flex h-9 items-center rounded-md border px-4 text-sm font-medium hover:bg-muted"
                  (click)="startReview()"
                >
                  {{ t()("dossiers.detail.decision.startReview") }}
                </button>
              }
              @if (d.status === "soumis" || d.status === "en examen") {
                <button
                  type="button"
                  class="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50"
                  [disabled]="!decisionOk()"
                  (click)="dialog.set('approve')"
                >
                  {{ t()("dossiers.detail.decision.approve") }}
                </button>
                <button
                  type="button"
                  class="inline-flex h-9 items-center rounded-md border px-4 text-sm font-medium hover:bg-muted"
                  (click)="openComplement()"
                >
                  {{ t()("dossiers.detail.decision.askComplement") }}
                </button>
                <button
                  type="button"
                  class="inline-flex h-9 items-center rounded-md border px-4 text-sm font-medium hover:bg-muted"
                  (click)="openRefuse()"
                >
                  {{ t()("dossiers.detail.decision.refuse") }}
                </button>
              }
            </div>
            @if (!decisionOk() && decisionError()) {
              <p class="mb-3 text-sm text-warning-fg">{{ decisionError() }}</p>
            }
          }

          @if (editable()) {
            <section class="surface mb-4 p-5" aria-labelledby="info-title">
              <h2 id="info-title" class="font-semibold">{{ t()("dossiers.detail.info.title") }}</h2>
              <div class="mt-4 grid gap-4 sm:grid-cols-2">
                <label class="block text-sm font-medium">
                  {{ t()("dossiers.detail.edit.firstName") }}
                  <input
                    class="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm font-normal"
                    [(ngModel)]="editFirst"
                  />
                </label>
                <label class="block text-sm font-medium">
                  {{ t()("dossiers.detail.edit.lastName") }}
                  <input
                    class="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm font-normal"
                    [(ngModel)]="editLast"
                  />
                </label>
                <label class="block text-sm font-medium">
                  {{ t()("dossiers.detail.info.sex") }}
                  <select
                    class="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm font-normal"
                    [(ngModel)]="editSex"
                  >
                    <option value="F">{{ t()("dossiers.detail.info.female") }}</option>
                    <option value="H">{{ t()("dossiers.detail.info.male") }}</option>
                  </select>
                </label>
                <label class="block text-sm font-medium">
                  {{ t()("dossiers.detail.info.age") }}
                  <input
                    class="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm font-normal"
                    inputmode="numeric"
                    [(ngModel)]="editAge"
                  />
                </label>
                <label class="block text-sm font-medium">
                  {{ t()("dossiers.detail.info.phone") }}
                  <input
                    class="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm font-normal"
                    [(ngModel)]="editPhone"
                  />
                </label>
                <label class="block text-sm font-medium">
                  {{ t()("dossiers.detail.info.cni") }}
                  <span class="block text-xs font-normal text-muted-foreground">{{
                    t()("dossiers.detail.edit.cniHint")
                  }}</span>
                  <input
                    class="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm font-normal"
                    inputmode="numeric"
                    [(ngModel)]="editCni"
                  />
                </label>
                <label class="block text-sm font-medium">
                  {{ t()("dossiers.detail.info.village") }}
                  <input
                    class="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm font-normal"
                    [(ngModel)]="editVillage"
                  />
                </label>
                <label class="block text-sm font-medium">
                  {{ t()("dossiers.detail.info.org") }}
                  <select
                    class="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm font-normal"
                    [(ngModel)]="editOrgId"
                  >
                    <option value="">{{ t()("dossiers.detail.edit.choose") }}</option>
                    @for (o of orgsForScoop(); track o.id) {
                      <option [value]="o.id">{{ o.name }}</option>
                    }
                  </select>
                </label>
              </div>
              <label class="mt-4 flex items-center gap-2 text-sm">
                <input type="checkbox" [(ngModel)]="editCreateMember" />
                {{ t()("dossiers.detail.edit.createMember") }}
              </label>
              <div class="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  class="inline-flex h-9 items-center rounded-md border px-4 text-sm font-medium hover:bg-muted disabled:opacity-50"
                  [disabled]="!dirty()"
                  (click)="saveDraft()"
                >
                  {{ t()("dossiers.detail.edit.saveDraft") }}
                </button>
                <button
                  type="button"
                  class="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
                  (click)="saveAndSubmit()"
                >
                  {{ t()("dossiers.detail.edit.submit") }}
                </button>
              </div>
            </section>
          } @else {
            <section class="surface mb-4 p-5" aria-labelledby="info-title">
              <h2 id="info-title" class="font-semibold">{{ t()("dossiers.detail.info.title") }}</h2>
              <dl class="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt class="text-xs text-muted-foreground">{{ t()("dossiers.detail.info.sex") }}</dt>
                  <dd class="mt-0.5 font-medium">
                    {{
                      d.draft.sex === "F"
                        ? t()("dossiers.detail.info.female")
                        : t()("dossiers.detail.info.male")
                    }}
                  </dd>
                </div>
                <div>
                  <dt class="text-xs text-muted-foreground">{{ t()("dossiers.detail.info.age") }}</dt>
                  <dd class="mt-0.5 font-medium">
                    {{
                      d.draft.age === null
                        ? t()("dossiers.detail.info.notSet")
                        : t()("dossiers.detail.info.ageYears", { age: d.draft.age })
                    }}
                  </dd>
                </div>
                <div>
                  <dt class="text-xs text-muted-foreground">
                    {{ t()("dossiers.detail.info.village") }}
                  </dt>
                  <dd class="mt-0.5 font-medium">
                    {{ d.draft.village || t()("dossiers.detail.info.notSet") }}
                  </dd>
                </div>
                <div>
                  <dt class="text-xs text-muted-foreground">{{ t()("dossiers.detail.info.org") }}</dt>
                  <dd class="mt-0.5 font-medium">{{ orgName(d.draft.orgId) }}</dd>
                </div>
                <div>
                  <dt class="text-xs text-muted-foreground">{{ t()("dossiers.detail.info.phone") }}</dt>
                  <dd class="mt-0.5 font-medium tabular">
                    {{
                      d.draft.phone ? maskPhone(d.draft.phone) : t()("dossiers.detail.info.notSet")
                    }}
                  </dd>
                </div>
                <div>
                  <dt class="text-xs text-muted-foreground">{{ t()("dossiers.detail.info.cni") }}</dt>
                  <dd class="mt-0.5 font-medium tabular">{{ maskCni(d.draft.cni) }}</dd>
                </div>
                <div class="col-span-2">
                  <dt class="text-xs text-muted-foreground">
                    {{ t()("dossiers.detail.info.member") }}
                  </dt>
                  <dd class="mt-0.5 font-medium">
                    {{
                      d.draft.createMember
                        ? t()("dossiers.detail.info.willBeMember")
                        : t()("dossiers.detail.info.producerOnly")
                    }}
                  </dd>
                </div>
                @if (d.possibleDuplicateOf; as dupId) {
                  <div class="col-span-2">
                    <dt class="text-xs text-muted-foreground">
                      {{
                        t()("dossiers.detail.approve.existing", {
                          name: producerLabel(dupId),
                          code: dupId,
                        })
                      }}
                    </dt>
                  </div>
                }
              </dl>
            </section>
          }

          <section class="surface mb-4 p-5" aria-labelledby="pieces-title">
            <h2 id="pieces-title" class="font-semibold">{{ t()("dossiers.detail.pieces.title") }}</h2>
            @if (docs().length) {
              <ul class="mt-3 divide-y rounded-md border">
                @for (doc of docs(); track doc.id) {
                  <li class="flex items-center justify-between gap-3 px-3 py-2 text-sm">
                    <span>
                      <span class="font-medium">{{ t()(kindKey[doc.kind] ?? "dossiers.kind.autre") }}</span>
                      · {{ doc.name }}
                    </span>
                    @if (editable()) {
                      <button
                        type="button"
                        class="text-xs font-medium text-danger-fg hover:underline"
                        (click)="removeDoc(doc.id)"
                      >
                        {{ t()("documents.actions.remove") }}
                      </button>
                    }
                  </li>
                }
              </ul>
            } @else {
              <p class="mt-2 text-sm text-muted-foreground">{{ t()("dossiers.detail.pieces.none") }}</p>
            }
            @if (editable()) {
              <div class="mt-4 flex flex-wrap items-end gap-3 border-t pt-4">
                <label class="block text-sm font-medium">
                  {{ t()("dossiers.detail.pieces.type") }}
                  <select
                    class="mt-1 h-9 w-52 rounded-md border border-input bg-background px-3 text-sm font-normal"
                    [(ngModel)]="pieceKind"
                  >
                    @for (k of dossierKinds; track k) {
                      <option [value]="k">{{ t()(kindKey[k]) }}</option>
                    }
                  </select>
                </label>
                <label
                  class="inline-flex h-10 cursor-pointer items-center gap-2 rounded-md border bg-background px-3 text-sm font-medium hover:bg-muted"
                >
                  <lucide-angular [img]="icons.upload" class="size-4" />
                  {{ t()("dossiers.detail.pieces.add") }}
                  <input
                    type="file"
                    class="sr-only"
                    accept="image/*,application/pdf"
                    (change)="onFile($event)"
                  />
                </label>
                <p class="basis-full text-xs text-muted-foreground">
                  {{ t()("dossiers.detail.pieces.hint", { mb: 5 }) }}
                </p>
              </div>
            }
          </section>

          <ui-dialog
            [open]="dialog() === 'approve'"
            (openChange)="onDialogOpen($event, 'approve')"
            [title]="t()('dossiers.detail.approve.title')"
          >
            <p class="text-sm text-muted-foreground">
              {{ t()("dossiers.detail.approve.description", { name: d.draft.firstName }) }}
            </p>
            @if (d.possibleDuplicateOf) {
              <fieldset class="mt-3 space-y-2 text-sm">
                <label class="flex items-center gap-2">
                  <input type="radio" name="dup" value="lié" [(ngModel)]="duplicateChoice" />
                  {{ t()("dossiers.detail.approve.same") }}
                </label>
                <label class="flex items-center gap-2">
                  <input type="radio" name="dup" value="distinct" [(ngModel)]="duplicateChoice" />
                  {{ t()("dossiers.detail.approve.other") }}
                </label>
              </fieldset>
            }
            <label class="mt-3 flex items-center gap-2 text-sm">
              <input type="checkbox" [(ngModel)]="createMember" />
              {{ t()("dossiers.detail.approve.member") }}
            </label>
            <button
              actions
              type="button"
              class="inline-flex h-9 items-center rounded-md border px-4 text-sm"
              (click)="dialog.set(null)"
            >
              {{ t()("common.cancel") }}
            </button>
            <button
              actions
              type="button"
              class="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
              (click)="approve()"
            >
              {{ t()("dossiers.detail.approve.submit") }}
            </button>
          </ui-dialog>

          <ui-dialog
            [open]="dialog() === 'complement'"
            (openChange)="onDialogOpen($event, 'complement')"
            [title]="t()('dossiers.detail.complementDialog.title')"
          >
            <p class="mb-2 text-sm text-muted-foreground">
              {{ t()("dossiers.detail.complementDialog.description") }}
            </p>
            <label class="block text-sm font-medium">
              {{ t()("dossiers.detail.complementDialog.label") }}
              <textarea
                class="mt-1 min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-normal"
                [(ngModel)]="comment"
                [placeholder]="t()('dossiers.detail.complementDialog.placeholder')"
              ></textarea>
            </label>
            <button
              actions
              type="button"
              class="inline-flex h-9 items-center rounded-md border px-4 text-sm"
              (click)="dialog.set(null)"
            >
              {{ t()("common.cancel") }}
            </button>
            <button
              actions
              type="button"
              class="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
              (click)="complement()"
            >
              {{ t()("dossiers.detail.complementDialog.submit") }}
            </button>
          </ui-dialog>

          <ui-dialog
            [open]="dialog() === 'refuse'"
            (openChange)="onDialogOpen($event, 'refuse')"
            [title]="t()('dossiers.detail.refuseDialog.title')"
          >
            <p class="mb-2 text-sm text-muted-foreground">
              {{ t()("dossiers.detail.refuseDialog.description") }}
            </p>
            <label class="block text-sm font-medium">
              {{ t()("dossiers.detail.refuseDialog.reason") }}
              <select
                class="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm font-normal"
                [(ngModel)]="refuseReason"
              >
                @for (r of refusalReasons; track r) {
                  <option [value]="r">{{ r }}</option>
                }
              </select>
            </label>
            <label class="mt-3 block text-sm font-medium">
              {{ t()("dossiers.detail.refuseDialog.detail") }}
              <span class="block text-xs font-normal text-muted-foreground">{{
                t()("dossiers.detail.refuseDialog.detailHint")
              }}</span>
              <textarea
                class="mt-1 min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-normal"
                [(ngModel)]="comment"
              ></textarea>
            </label>
            <button
              actions
              type="button"
              class="inline-flex h-9 items-center rounded-md border px-4 text-sm"
              (click)="dialog.set(null)"
            >
              {{ t()("common.cancel") }}
            </button>
            <button
              actions
              type="button"
              class="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
              (click)="refuse()"
            >
              {{ t()("dossiers.detail.refuseDialog.submit") }}
            </button>
          </ui-dialog>
        }
      }
    </app-shell>
  `,
})
export default class DossierDetailPage {
  private readonly route = inject(ActivatedRoute);
  readonly store = inject(StoreService);
  readonly locale = inject(LocaleService);
  readonly t = this.locale.t;
  readonly maskPhone = maskPhone;
  readonly maskCni = maskCni;
  readonly perms = ["dossier.create", "dossier.review"] as const;
  readonly icons = { arrowLeft: ArrowLeft, folder: FolderOpen, upload: Upload };
  readonly refusalReasons = REFUSAL_REASONS;
  readonly dossierKinds = DOCUMENT_KINDS;
  readonly kindKey = KIND_KEY;

  readonly dialog = signal<DialogKind>(null);
  readonly feedback = signal("");
  comment = "";
  createMember = true;
  duplicateChoice: "lié" | "distinct" = "distinct";
  refuseReason: RefusalReason = "informations incohérentes";
  pieceKind: DocumentKind = "cni";

  editFirst = "";
  editLast = "";
  editSex: "F" | "H" = "F";
  editAge = "";
  editPhone = "";
  editCni = "";
  editVillage = "";
  editOrgId = "";
  editCreateMember = true;

  private readonly id = toSignal(this.route.paramMap.pipe(map((p) => p.get("id") ?? "")), {
    initialValue: "",
  });

  readonly dossier = computed(() => {
    const id = this.id();
    const s = this.store.state();
    const row = s.dossiers.find((x) => x.id === id);
    if (!row) return undefined;
    return scopedDossiers([row], s.session).length === 1 ? row : undefined;
  });

  readonly editable = computed(() => {
    const d = this.dossier();
    return (
      !!d &&
      this.store.can("dossier.create") &&
      (d.status === "brouillon" || d.status === "complément demandé")
    );
  });

  readonly docs = computed(() => {
    const d = this.dossier();
    if (!d) return [];
    const ids = new Set(d.documentIds);
    return this.store.state().documents.filter((doc) => ids.has(doc.id));
  });

  readonly orgsForScoop = computed(() => {
    const d = this.dossier();
    if (!d) return [];
    return this.store.state().orgs.filter((o) => o.scoopId === d.scoopId);
  });

  readonly canReview = computed(() => this.store.can("dossier.review"));

  private readonly who = computed(() => {
    const s = this.store.state().session;
    if (!s) return null;
    return { email: s.email, role: s.role };
  });

  readonly decisionOk = computed(() => {
    const d = this.dossier();
    const who = this.who();
    if (!d || !who) return false;
    return decisionCheck(d, who).ok;
  });

  readonly decisionError = computed(() => {
    const d = this.dossier();
    const who = this.who();
    if (!d || !who) return "";
    const check = decisionCheck(d, who);
    return check.ok ? "" : check.error;
  });

  constructor() {
    effect(() => {
      const d = this.dossier();
      if (!d) return;
      this.editFirst = d.draft.firstName;
      this.editLast = d.draft.lastName;
      this.editSex = d.draft.sex;
      this.editAge = d.draft.age === null ? "" : String(d.draft.age);
      this.editPhone = d.draft.phone;
      this.editCni = d.draft.cni;
      this.editVillage = d.draft.village;
      this.editOrgId = d.draft.orgId;
      this.editCreateMember = d.draft.createMember;
      this.createMember = d.draft.createMember;
    });
  }

  scoopName(scoopId: string): string {
    return this.store.state().scoops.find((c) => c.id === scoopId)?.name ?? "";
  }

  orgName(orgId: string): string {
    return (
      this.store.state().orgs.find((o) => o.id === orgId)?.name ??
      this.t()("dossiers.detail.info.notSet")
    );
  }

  producerLabel(id: string): string {
    const p = this.store.state().producers.find((x) => x.id === id);
    return p ? `${p.firstName} ${p.lastName}` : id;
  }

  private errMsg(error: MessageKey | string): string {
    return this.locale.tNow(error as MessageKey);
  }

  statusTone(s: DossierStatus): UiPillTone {
    return STATUS_TONE[s];
  }

  statusKey(s: DossierStatus): `dossiers.status.${DossierStatus}` {
    return `dossiers.status.${s}`;
  }

  private draftFromForm(): DossierDraft {
    const age = this.editAge.trim() === "" ? null : Number(this.editAge);
    return {
      firstName: this.editFirst.trim(),
      lastName: this.editLast.trim(),
      sex: this.editSex,
      age: Number.isFinite(age) ? age : null,
      phone: this.editPhone.trim(),
      cni: this.editCni.trim(),
      village: this.editVillage.trim(),
      orgId: this.editOrgId,
      createMember: this.editCreateMember,
    };
  }

  dirty(): boolean {
    const d = this.dossier();
    if (!d) return false;
    const next = this.draftFromForm();
    return (Object.keys(next) as (keyof DossierDraft)[]).some((k) => next[k] !== d.draft[k]);
  }

  private patch(): Partial<DossierDraft> {
    const d = this.dossier();
    if (!d) return {};
    const next = this.draftFromForm();
    const out: Partial<DossierDraft> = {};
    for (const k of Object.keys(next) as (keyof DossierDraft)[]) {
      if (next[k] !== d.draft[k]) (out as Record<string, unknown>)[k] = next[k];
    }
    return out;
  }

  saveDraft(): void {
    const d = this.dossier();
    if (!d) return;
    const p = this.patch();
    if (!Object.keys(p).length) return;
    const res = this.store.actions.updateDossier(d.id, p);
    this.feedback.set(res.ok ? this.t()("dossiers.detail.edit.saved") : this.errMsg(res.error));
  }

  saveAndSubmit(): void {
    const d = this.dossier();
    if (!d) return;
    const p = this.patch();
    if (Object.keys(p).length) {
      const save = this.store.actions.updateDossier(d.id, p);
      if (!save.ok) {
        this.feedback.set(this.errMsg(save.error));
        return;
      }
    }
    const res = this.store.actions.submitDossier(d.id);
    this.feedback.set(
      res.ok
        ? res.possibleDuplicateOf
          ? `${this.t()("dossiers.detail.edit.submitted")} — ${this.t()("dossiers.detail.edit.duplicateFlagged")}`
          : this.t()("dossiers.detail.edit.submitted")
        : this.errMsg(res.error),
    );
  }

  onFile(ev: Event): void {
    const d = this.dossier();
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = "";
    if (!d || !file) return;
    const res = this.store.actions.addDocument(d.id, {
      kind: this.pieceKind,
      name: file.name,
      sizeKb: Math.ceil(file.size / 1024),
      mime: file.type || "application/octet-stream",
    });
    this.feedback.set(
      res.ok ? this.t()("dossiers.detail.pieces.added") : this.errMsg(res.error),
    );
  }

  removeDoc(docId: string): void {
    const res = this.store.actions.removeDocument(docId);
    this.feedback.set(
      res.ok ? this.t()("dossiers.detail.pieces.removed") : this.errMsg(res.error),
    );
  }

  onDialogOpen(open: boolean, kind: Exclude<DialogKind, null>): void {
    this.dialog.set(open ? kind : null);
  }

  openComplement(): void {
    this.comment = "";
    this.dialog.set("complement");
  }

  openRefuse(): void {
    this.comment = "";
    this.refuseReason = "informations incohérentes";
    this.dialog.set("refuse");
  }

  startReview(): void {
    const d = this.dossier();
    if (!d) return;
    const res = this.store.actions.startReview(d.id);
    this.feedback.set(
      res.ok ? this.t()("dossiers.detail.decision.startedToast") : this.errMsg(res.error),
    );
  }

  approve(): void {
    const d = this.dossier();
    if (!d) return;
    const res = this.store.actions.approveDossier(d.id, {
      ...(d.possibleDuplicateOf ? { duplicate: this.duplicateChoice } : {}),
      createMember: this.createMember,
    });
    this.dialog.set(null);
    this.feedback.set(
      res.ok
        ? res.selfApproved
          ? this.t()("dossiers.detail.approve.doneSelf")
          : this.t()("dossiers.detail.approve.done")
        : this.errMsg(res.error),
    );
  }

  complement(): void {
    const d = this.dossier();
    if (!d) return;
    const res = this.store.actions.requestComplement(d.id, this.comment);
    this.dialog.set(null);
    this.feedback.set(
      res.ok ? this.t()("dossiers.detail.complementDialog.done") : this.errMsg(res.error),
    );
  }

  refuse(): void {
    const d = this.dossier();
    if (!d) return;
    const res = this.store.actions.refuseDossier(d.id, this.refuseReason, this.comment);
    this.dialog.set(null);
    this.feedback.set(
      res.ok ? this.t()("dossiers.detail.refuseDialog.done") : this.errMsg(res.error),
    );
  }
}
