import { Component, computed, effect, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map } from "rxjs";

import { KIND_KEY } from "@/lib/dossier-labels";
import { decisionCheck } from "@/lib/dossiers";
import { fmtDate, fmtDateTime, maskCni, maskPhone } from "@/lib/format";
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
import { AppShellComponent } from "@shared/app-shell.component";
import { LocaleService } from "@shared/locale.service";
import { StoreService } from "@shared/store.service";
import {
  DetailHeroComponent,
  FileSlotsComponent,
  IconComponent,
  initialsOf,
  ModalComponent,
  SelectComponent,
  SnackbarService,
  TextFieldComponent,
  V2_PAGE_STYLES,
  type FileSlot,
  type HeroBadge,
  type HeroMeta,
  type IconName,
  type SelectOption,
  type SlotFile,
} from "@shared/ui";

/** Étape atteinte dans le parcours (0 brouillon → 3 décision). */
const STEP: Record<DossierStatus, number> = {
  brouillon: 0,
  "complément demandé": 0,
  soumis: 1,
  "en examen": 2,
  approuvé: 3,
  refusé: 3,
};

const KIND_ICON: Record<string, IconName> = {
  cni: "badge",
  photo: "account_circle",
  justificatif: "description",
  autre: "folder_open",
};
const MAX_KB = 5 * 1024;

type DialogKind = "approve" | "complement" | "refuse" | null;

/**
 * Fiche dossier (charte V2) : en-tête avec parcours, décision de la coopérative (examen, approbation,
 * complément, refus en modale), informations (modifiables en brouillon), pièces jointes par type, historique.
 */
@Component({
  selector: "app-dossier-detail-page",
  imports: [
    AppShellComponent,
    DetailHeroComponent,
    FileSlotsComponent,
    IconComponent,
    ModalComponent,
    RouterLink,
    SelectComponent,
    TextFieldComponent,
  ],
  styles: [
    V2_PAGE_STYLES,
    `
      .steps {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 6px;
      }
      .step {
        display: flex;
        min-width: 0;
        align-items: center;
        gap: 8px;
        border-radius: 14px;
        background: color-mix(in oklab, var(--v2-blanc) 8%, transparent);
        padding: 10px 12px;
        font-size: 13px;
        font-weight: 800;
        color: color-mix(in oklab, var(--v2-blanc) 60%, transparent);
      }
      .step .b {
        display: grid;
        height: 24px;
        width: 24px;
        flex-shrink: 0;
        place-items: center;
        border-radius: 999px;
        border: 1.5px solid currentColor;
        font-size: 12px;
      }
      .step.done {
        color: var(--v2-blanc);
      }
      .step.done .b {
        border-color: var(--v2-citron);
        background: var(--v2-citron);
        color: var(--v2-foret);
      }
      .step.now {
        background: var(--v2-citron);
        color: var(--v2-foret);
      }
      .step.now .b {
        border-color: var(--v2-foret);
        background: var(--v2-foret);
        color: var(--v2-citron);
      }
      @media (max-width: 640px) {
        .steps {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
      .grid-main {
        display: grid;
        gap: 16px;
      }
      @media (min-width: 1100px) {
        .grid-main {
          grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
          align-items: start;
        }
      }
      .timeline li {
        display: flex;
        gap: 14px;
        border-top: 1px solid var(--v2-separateur);
        padding: 12px 20px;
      }
      .dot {
        margin-top: 5px;
        height: 12px;
        width: 12px;
        flex-shrink: 0;
        border-radius: 999px;
        background: var(--v2-foret);
        box-shadow: 0 0 0 4px var(--v2-sauge);
      }
      .seg-form button {
        flex: 1;
        justify-content: center;
      }
      .doc-row {
        display: flex;
        align-items: center;
        gap: 12px;
        border-top: 1px solid var(--v2-separateur);
        padding: 12px 20px;
        font-size: 14px;
      }
    `,
  ],
  template: `
    <app-shell [perm]="perms" [area]="t()('dossiers.detail.area')">
      @if (dossier(); as current) {
        <ui-detail-hero
          [crumb]="{ label: t()('dossiers.title'), link: '/dashboard/dossiers' }"
          [title]="name(current)"
          [eyebrow]="t()('dossiers.detail.eyebrow', { id: current.id })"
          [mono]="initials(name(current))"
          [badges]="heroBadges()"
          [meta]="heroMeta()"
          [backLabel]="t()('dossiers.detail.back')"
        >
          <div
            hero-extra
            class="steps relative mt-6"
            role="list"
            [attr.aria-label]="t()('dossiers.v2.steps.aria')"
          >
            @for (stepItem of steps(); track stepItem.key; let stepIndex = $index) {
              <div
                class="step"
                role="listitem"
                [class.done]="stepIndex < step()"
                [class.now]="stepIndex === step()"
                [attr.aria-current]="stepIndex === step() ? 'step' : null"
              >
                <span class="b">
                  @if (stepIndex < step()) {
                    <ui-icon name="check" [size]="14" />
                  } @else {
                    {{ stepIndex + 1 }}
                  }
                </span>
                <span class="truncate">{{ stepItem.label }}</span>
              </div>
            }
          </div>
        </ui-detail-hero>

        <!-- Décision de la coopérative -->
        @if (canReview() && (current.status === "soumis" || current.status === "en examen")) {
          <section class="sec-card mt-4">
            <div class="sec-head">
              <h2>
                <span class="sec-ico"><ui-icon name="gavel" [size]="18" /></span
                >{{ t()("dossiers.v2.decision.title") }}
              </h2>
              <div class="flex flex-wrap gap-2">
                @if (current.status === "soumis") {
                  <button
                    type="button"
                    class="btn btn-ghost"
                    style="height: 44px"
                    (click)="startReview()"
                  >
                    <ui-icon name="visibility" [size]="18" />{{
                      t()("dossiers.detail.decision.startReview")
                    }}
                  </button>
                }
                <button
                  type="button"
                  class="btn btn-ghost"
                  style="height: 44px"
                  (click)="openComplement()"
                >
                  <ui-icon name="mark_email_unread" [size]="18" />{{
                    t()("dossiers.detail.decision.askComplement")
                  }}
                </button>
                <button
                  type="button"
                  class="btn btn-ghost act-danger"
                  style="height: 44px"
                  (click)="openRefuse()"
                >
                  <ui-icon name="close" [size]="18" />{{ t()("dossiers.detail.decision.refuse") }}
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  style="height: 44px"
                  [disabled]="!decisionOk()"
                  (click)="dialog.set('approve')"
                >
                  {{ t()("dossiers.detail.decision.approve")
                  }}<span class="btn-chip" style="height: 32px; width: 32px"
                    ><ui-icon name="check" [size]="18"
                  /></span>
                </button>
              </div>
            </div>
            <p class="sub border-t px-5 py-3" style="border-color: var(--v2-separateur)">
              {{ t()("dossiers.v2.decision.hint") }}
            </p>
            @if (!decisionOk() && decisionError()) {
              <p
                class="notice mx-5 mb-4"
                style="background: var(--v2-attente-bg); color: var(--v2-attente-fg)"
              >
                <ui-icon name="warning" [size]="18" />{{ decisionError() }}
              </p>
            }
          </section>
        }

        @if (current.possibleDuplicateOf; as dupId) {
          <p
            class="notice mt-4"
            style="background: var(--v2-bloquant-bg); color: var(--v2-bloquant-fg)"
          >
            <ui-icon name="warning" [size]="18" />{{
              t()("dossiers.detail.approve.existing", { name: producerLabel(dupId), code: dupId })
            }}
          </p>
        }

        <div class="grid-main mt-4">
          <!-- Informations -->
          <section class="sec-card">
            <div class="sec-head">
              <h2>
                <span class="sec-ico"><ui-icon name="person" [size]="18" /></span
                >{{ t()("dossiers.detail.info.title") }}
              </h2>
            </div>
            @if (editable()) {
              <div
                class="grid gap-5 border-t p-5 sm:grid-cols-2"
                style="border-color: var(--v2-separateur)"
              >
                <ui-text-field
                  preset="firstName"
                  [label]="t()('dossiers.detail.edit.firstName')"
                  [value]="editFirst"
                  (valueChange)="editFirst = $event"
                />
                <ui-text-field
                  preset="lastName"
                  [label]="t()('dossiers.detail.edit.lastName')"
                  [value]="editLast"
                  (valueChange)="editLast = $event"
                />
                <div>
                  <p class="lbl">{{ t()("dossiers.detail.info.sex") }}</p>
                  <div
                    class="seg seg-form mt-2"
                    role="radiogroup"
                    [attr.aria-label]="t()('dossiers.detail.info.sex')"
                  >
                    <button
                      type="button"
                      role="radio"
                      [class.on]="editSex === 'F'"
                      [attr.aria-checked]="editSex === 'F'"
                      (click)="editSex = 'F'"
                    >
                      {{ t()("dossiers.detail.info.female") }}
                    </button>
                    <button
                      type="button"
                      role="radio"
                      [class.on]="editSex === 'H'"
                      [attr.aria-checked]="editSex === 'H'"
                      (click)="editSex = 'H'"
                    >
                      {{ t()("dossiers.detail.info.male") }}
                    </button>
                  </div>
                </div>
                <ui-text-field
                  preset="age"
                  [label]="t()('dossiers.detail.info.age')"
                  [value]="editAge"
                  (valueChange)="editAge = $event"
                />
                <ui-text-field
                  preset="phone"
                  [label]="t()('dossiers.detail.info.phone')"
                  [value]="editPhone"
                  (valueChange)="editPhone = $event"
                />
                <ui-text-field
                  preset="cni"
                  [label]="t()('dossiers.detail.info.cni')"
                  [hint]="t()('dossiers.detail.edit.cniHint')"
                  [value]="editCni"
                  (valueChange)="editCni = $event"
                />
                <ui-text-field
                  preset="village"
                  [label]="t()('dossiers.detail.info.village')"
                  [value]="editVillage"
                  (valueChange)="editVillage = $event"
                />
                <div>
                  <p class="lbl">{{ t()("dossiers.detail.info.org") }}</p>
                  <ui-select
                    class="mt-2 block"
                    [label]="t()('dossiers.detail.info.org')"
                    leadingIcon="hub"
                    [options]="orgOptions()"
                    [value]="editOrgId"
                    (valueChange)="editOrgId = $event"
                  />
                </div>
                <label class="check sm:col-span-2">
                  <input
                    type="checkbox"
                    [checked]="editCreateMember"
                    (change)="editCreateMember = $any($event.target).checked"
                  />
                  <span>{{ t()("dossiers.detail.edit.createMember") }}</span>
                </label>
                <div class="flex flex-wrap justify-end gap-2 sm:col-span-2">
                  <button
                    type="button"
                    class="btn btn-ghost"
                    [disabled]="!dirty()"
                    (click)="saveDraft()"
                  >
                    {{ t()("dossiers.detail.edit.saveDraft") }}
                  </button>
                  <button type="button" class="btn btn-primary" (click)="saveAndSubmit()">
                    {{ t()("dossiers.detail.edit.submit")
                    }}<span class="btn-chip"><ui-icon name="arrow_forward" [size]="18" /></span>
                  </button>
                </div>
              </div>
            } @else {
              <dl class="facts">
                <div class="fact">
                  <span class="fact-ico"><ui-icon name="person" [size]="18" /></span>
                  <div>
                    <dt>{{ t()("dossiers.detail.info.sex") }}</dt>
                    <dd>
                      {{
                        current.draft.sex === "F"
                          ? t()("dossiers.detail.info.female")
                          : t()("dossiers.detail.info.male")
                      }}
                    </dd>
                  </div>
                </div>
                <div class="fact">
                  <span class="fact-ico"><ui-icon name="calendar_today" [size]="18" /></span>
                  <div>
                    <dt>{{ t()("dossiers.detail.info.age") }}</dt>
                    <dd [class.zero]="current.draft.age === null">
                      {{
                        current.draft.age === null
                          ? "—"
                          : t()("dossiers.detail.info.ageYears", { age: current.draft.age })
                      }}
                    </dd>
                  </div>
                </div>
                <div class="fact">
                  <span class="fact-ico"><ui-icon name="call" [size]="18" /></span>
                  <div>
                    <dt>{{ t()("dossiers.detail.info.phone") }}</dt>
                    <dd class="tabular-nums" [class.zero]="!current.draft.phone">
                      {{ store.phone(current.draft.phone) || "—" }}
                    </dd>
                  </div>
                </div>
                <div class="fact">
                  <span class="fact-ico"><ui-icon name="badge" [size]="18" /></span>
                  <div>
                    <dt>{{ t()("dossiers.detail.info.cni") }}</dt>
                    <dd class="tabular-nums" [class.zero]="!current.draft.cni">
                      {{ current.draft.cni ? maskCni(current.draft.cni) : "—" }}
                    </dd>
                  </div>
                </div>
                <div class="fact">
                  <span class="fact-ico"><ui-icon name="location_on" [size]="18" /></span>
                  <div>
                    <dt>{{ t()("dossiers.detail.info.village") }}</dt>
                    <dd [class.zero]="!current.draft.village">
                      {{ current.draft.village || "—" }}
                    </dd>
                  </div>
                </div>
                <div class="fact">
                  <span class="fact-ico"><ui-icon name="hub" [size]="18" /></span>
                  <div>
                    <dt>{{ t()("dossiers.detail.info.org") }}</dt>
                    <dd>{{ orgName(current.draft.orgId) }}</dd>
                  </div>
                </div>
                <div class="fact">
                  <span class="fact-ico"><ui-icon name="group" [size]="18" /></span>
                  <div>
                    <dt>{{ t()("dossiers.detail.info.member") }}</dt>
                    <dd>
                      {{
                        current.draft.createMember
                          ? t()("dossiers.detail.info.willBeMember")
                          : t()("dossiers.detail.info.producerOnly")
                      }}
                    </dd>
                  </div>
                </div>
                <div class="fact">
                  <span class="fact-ico"><ui-icon name="apartment" [size]="18" /></span>
                  <div>
                    <dt>{{ t()("reunions.detail.scoop") }}</dt>
                    <dd>{{ scoopName(current.scoopId) }}</dd>
                  </div>
                </div>
              </dl>
            }
          </section>

          <div class="grid gap-4">
            <!-- Pièces jointes -->
            <section class="sec-card">
              <div class="sec-head">
                <h2>
                  <span class="sec-ico"><ui-icon name="upload_file" [size]="18" /></span
                  >{{ t()("dossiers.detail.pieces.title")
                  }}<span class="n">{{ docs().length }}</span>
                </h2>
              </div>
              @if (editable()) {
                <div class="border-t p-5" style="border-color: var(--v2-separateur)">
                  <ui-file-slots
                    [slots]="slots()"
                    [files]="slotFiles()"
                    accept="image/*,application/pdf"
                    [hint]="t()('dossiers.v2.piecesHint', { mb: 5 })"
                    (added)="addFiles($event.slot, $event.files)"
                    (removed)="removeDoc($event)"
                  />
                </div>
              } @else {
                <ul>
                  @for (doc of docs(); track doc.id) {
                    <li class="doc-row">
                      <span class="sec-ico"
                        ><ui-icon [name]="kindIcon(doc.kind)" [size]="18"
                      /></span>
                      <span class="min-w-0 flex-1">
                        <span class="block truncate font-bold">{{ doc.name }}</span>
                        <span class="sub"
                          >{{ t()(kindKey[doc.kind] ?? "dossiers.kind.autre") }} ·
                          {{ doc.sizeKb }} Ko</span
                        >
                      </span>
                      @if (doc.sensitive) {
                        <span
                          class="badge"
                          style="background: var(--v2-erreur-bg); color: var(--v2-erreur-fg)"
                          >{{ t()("documents.sensitive.pill") }}</span
                        >
                      }
                    </li>
                  } @empty {
                    <li class="sub border-t px-5 py-5" style="border-color: var(--v2-separateur)">
                      {{ t()("dossiers.detail.pieces.none") }}
                    </li>
                  }
                </ul>
              }
            </section>

            <!-- Historique -->
            <section class="sec-card">
              <div class="sec-head">
                <h2>
                  <span class="sec-ico"><ui-icon name="event_note" [size]="18" /></span
                  >{{ t()("dossiers.v2.history")
                  }}<span class="n">{{ current.history.length }}</span>
                </h2>
              </div>
              <ol class="timeline">
                @for (event of history(); track event.at + event.action) {
                  <li>
                    <span class="dot" aria-hidden="true"></span>
                    <span class="min-w-0">
                      <span class="block font-bold">{{ t()(eventKey(event.action)) }}</span>
                      @if (event.comment) {
                        <span class="block text-[14px]">« {{ event.comment }} »</span>
                      }
                      <span class="sub block">{{ fmtDateTime(event.at) }} · {{ event.by }}</span>
                    </span>
                  </li>
                }
              </ol>
            </section>
          </div>
        </div>

        <!-- Approuver -->
        <ui-modal
          [open]="dialog() === 'approve'"
          [title]="t()('dossiers.detail.approve.title')"
          [description]="
            t()('dossiers.detail.approve.description', { name: current.draft.firstName })
          "
          icon="task_alt"
          [width]="560"
          [closeLabel]="t()('common.close')"
          (closed)="dialog.set(null)"
        >
          <div class="grid gap-4 pb-5">
            @if (current.possibleDuplicateOf) {
              <p
                class="notice"
                style="background: var(--v2-attente-bg); color: var(--v2-attente-fg)"
              >
                <ui-icon name="warning" [size]="18" />{{
                  t()("dossiers.detail.approve.descriptionDuplicate")
                }}
              </p>
              <div class="seg seg-form" role="radiogroup">
                <button
                  type="button"
                  role="radio"
                  [class.on]="duplicateChoice === 'lié'"
                  [attr.aria-checked]="duplicateChoice === 'lié'"
                  (click)="duplicateChoice = 'lié'"
                >
                  {{ t()("dossiers.detail.approve.same") }}
                </button>
                <button
                  type="button"
                  role="radio"
                  [class.on]="duplicateChoice === 'distinct'"
                  [attr.aria-checked]="duplicateChoice === 'distinct'"
                  (click)="duplicateChoice = 'distinct'"
                >
                  {{ t()("dossiers.detail.approve.other") }}
                </button>
              </div>
            }
            <label class="check">
              <input
                type="checkbox"
                [checked]="createMember"
                (change)="createMember = $any($event.target).checked"
              />
              <span>{{ t()("dossiers.detail.approve.member") }}</span>
            </label>
          </div>
          <button modal-footer type="button" class="btn btn-ghost" (click)="dialog.set(null)">
            {{ t()("common.cancel") }}
          </button>
          <button modal-footer type="button" class="btn btn-primary" (click)="approve()">
            {{ t()("dossiers.detail.approve.submit")
            }}<span class="btn-chip"><ui-icon name="check" [size]="18" /></span>
          </button>
        </ui-modal>

        <!-- Demander un complément -->
        <ui-modal
          [open]="dialog() === 'complement'"
          [title]="t()('dossiers.detail.complementDialog.title')"
          [description]="t()('dossiers.detail.complementDialog.description')"
          icon="mark_email_unread"
          [width]="560"
          [closeLabel]="t()('common.close')"
          (closed)="dialog.set(null)"
        >
          <label class="lbl" for="complement">{{
            t()("dossiers.detail.complementDialog.label")
          }}</label>
          <textarea
            id="complement"
            class="area mb-5 mt-2"
            [placeholder]="t()('dossiers.detail.complementDialog.placeholder')"
            [value]="comment"
            (input)="comment = $any($event.target).value"
          ></textarea>
          <button modal-footer type="button" class="btn btn-ghost" (click)="dialog.set(null)">
            {{ t()("common.cancel") }}
          </button>
          <button modal-footer type="button" class="btn btn-primary" (click)="complement()">
            {{ t()("dossiers.detail.complementDialog.submit")
            }}<span class="btn-chip"><ui-icon name="arrow_forward" [size]="18" /></span>
          </button>
        </ui-modal>

        <!-- Refuser -->
        <ui-modal
          tone="danger"
          [open]="dialog() === 'refuse'"
          [title]="t()('dossiers.detail.refuseDialog.title')"
          [description]="t()('dossiers.detail.refuseDialog.description')"
          icon="close"
          [width]="560"
          [closeLabel]="t()('common.close')"
          (closed)="dialog.set(null)"
        >
          <div class="grid gap-4 pb-5">
            <div>
              <p class="lbl">{{ t()("dossiers.detail.refuseDialog.reason") }}</p>
              <ui-select
                class="mt-2 block"
                [label]="t()('dossiers.detail.refuseDialog.reason')"
                leadingIcon="warning"
                [options]="refusalOptions"
                [value]="refuseReason"
                (valueChange)="refuseReason = $any($event)"
              />
            </div>
            <div>
              <label class="lbl" for="refuse-detail">{{
                t()("dossiers.detail.refuseDialog.detail")
              }}</label>
              <textarea
                id="refuse-detail"
                class="area mt-2"
                [placeholder]="t()('dossiers.detail.refuseDialog.detailHint')"
                [value]="comment"
                (input)="comment = $any($event.target).value"
              ></textarea>
            </div>
          </div>
          <button modal-footer type="button" class="btn btn-ghost" (click)="dialog.set(null)">
            {{ t()("common.cancel") }}
          </button>
          <button modal-footer type="button" class="btn btn-danger" (click)="refuse()">
            {{ t()("dossiers.detail.refuseDialog.submit") }}
          </button>
        </ui-modal>
      } @else {
        <div class="card mx-auto mt-16 flex max-w-lg flex-col items-center gap-3 p-10 text-center">
          <span
            class="grid size-14 place-items-center rounded-[16px]"
            style="background: var(--v2-attente-bg); color: var(--v2-attente-fg)"
            ><ui-icon name="folder_open" [size]="26"
          /></span>
          <h1 class="text-[22px] font-extrabold">{{ t()("dossiers.detail.notFound.title") }}</h1>
          <p class="sub">{{ t()("dossiers.detail.notFound.text") }}</p>
          <a class="btn btn-ghost mt-2" routerLink="/dashboard/dossiers">{{
            t()("dossiers.detail.back")
          }}</a>
        </div>
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
  readonly fmtDateTime = fmtDateTime;
  readonly initials = initialsOf;
  private readonly snackbar = inject(SnackbarService);
  readonly refusalReasons = REFUSAL_REASONS;
  readonly refusalOptions: SelectOption[] = REFUSAL_REASONS.map((r) => ({ value: r, label: r }));
  readonly kindKey = KIND_KEY;

  readonly dialog = signal<DialogKind>(null);
  comment = "";
  createMember = true;
  duplicateChoice: "lié" | "distinct" = "distinct";
  refuseReason: RefusalReason = "informations incohérentes";

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
    this.say(res.ok, res.ok ? this.t()("dossiers.detail.edit.saved") : this.errMsg(res.error));
  }

  saveAndSubmit(): void {
    const d = this.dossier();
    if (!d) return;
    const p = this.patch();
    if (Object.keys(p).length) {
      const save = this.store.actions.updateDossier(d.id, p);
      if (!save.ok) {
        this.say(false, this.errMsg(save.error));
        return;
      }
    }
    const res = this.store.actions.submitDossier(d.id);
    this.say(
      res.ok,
      res.ok
        ? res.possibleDuplicateOf
          ? `${this.t()("dossiers.detail.edit.submitted")} · ${this.t()("dossiers.detail.edit.duplicateFlagged")}`
          : this.t()("dossiers.detail.edit.submitted")
        : this.errMsg(res.error),
    );
  }

  /** Pièces déposées dans une case (type = case), 5 Mo au plus chacune. */
  addFiles(kind: string, files: File[]): void {
    const d = this.dossier();
    if (!d) return;
    for (const file of files) {
      const sizeKb = Math.ceil(file.size / 1024);
      if (sizeKb > MAX_KB) {
        this.snackbar.error(
          this.t()("dossiers.new.tooBig", { name: file.name, mb: MAX_KB / 1024 }),
        );
        continue;
      }
      const res = this.store.actions.addDocument(d.id, {
        kind: kind as DocumentKind,
        name: file.name,
        sizeKb,
        mime: file.type || "application/octet-stream",
      });
      this.say(res.ok, res.ok ? this.t()("dossiers.detail.pieces.added") : this.errMsg(res.error));
    }
  }

  removeDoc(docId: string): void {
    const res = this.store.actions.removeDocument(docId);
    this.say(res.ok, res.ok ? this.t()("dossiers.detail.pieces.removed") : this.errMsg(res.error));
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
    this.say(
      res.ok,
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
    this.say(
      res.ok,
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
    this.say(
      res.ok,
      res.ok ? this.t()("dossiers.detail.complementDialog.done") : this.errMsg(res.error),
    );
  }

  refuse(): void {
    const d = this.dossier();
    if (!d) return;
    const res = this.store.actions.refuseDossier(d.id, this.refuseReason, this.comment);
    this.dialog.set(null);
    this.say(
      res.ok,
      res.ok ? this.t()("dossiers.detail.refuseDialog.done") : this.errMsg(res.error),
    );
  }

  private say(ok: boolean, text: string): void {
    if (ok) this.snackbar.success(text);
    else this.snackbar.error(text);
  }

  name(d: { draft: DossierDraft }): string {
    return `${d.draft.firstName || this.t()("dossiers.row.noFirstName")} ${d.draft.lastName || this.t()("dossiers.row.noLastName")}`;
  }

  kindIcon(kind: string): IconName {
    return KIND_ICON[kind] ?? "description";
  }

  eventKey(action: string): MessageKey {
    return `dossiers.event.${action}` as MessageKey;
  }

  readonly step = computed(() => {
    const d = this.dossier();
    return d ? STEP[d.status] : 0;
  });

  readonly steps = computed(() => {
    const t = this.t();
    const d = this.dossier();
    const last =
      d?.status === "approuvé" || d?.status === "refusé"
        ? t(this.statusKey(d.status))
        : t("dossiers.v2.step.decision");
    return [
      {
        key: "b",
        label:
          d?.status === "complément demandé"
            ? t(this.statusKey(d.status))
            : t("dossiers.v2.step.brouillon"),
      },
      { key: "s", label: t("dossiers.v2.step.soumis") },
      { key: "e", label: t("dossiers.v2.step.examen") },
      { key: "d", label: last },
    ];
  });

  readonly history = computed(() =>
    [...(this.dossier()?.history ?? [])].sort((a, b) => b.at.localeCompare(a.at)),
  );

  readonly heroBadges = computed<HeroBadge[]>(() => {
    const d = this.dossier();
    if (!d) return [];
    const t = this.t();
    const tone: Record<DossierStatus, HeroBadge["tone"]> = {
      brouillon: "light",
      soumis: "warn",
      "en examen": "light",
      "complément demandé": "warn",
      approuvé: "citron",
      refusé: "danger",
    };
    return [
      { label: t(this.statusKey(d.status)), tone: tone[d.status] },
      ...(d.possibleDuplicateOf
        ? [
            {
              label: t("dossiers.row.duplicate"),
              tone: "danger" as const,
              icon: "warning" as const,
            },
          ]
        : []),
    ];
  });

  readonly heroMeta = computed<HeroMeta[]>(() => {
    const d = this.dossier();
    if (!d) return [];
    return [
      { icon: "apartment", text: this.scoopName(d.scoopId) },
      { icon: "badge", text: d.createdBy },
      {
        icon: "calendar_today",
        text: this.t()("dossiers.v2.created", { date: fmtDate(d.createdAt) }),
      },
    ];
  });

  readonly orgOptions = computed<SelectOption[]>(() =>
    this.orgsForScoop()
      .map((o) => ({ value: o.id, label: o.name, ...(o.village ? { hint: o.village } : {}) }))
      .sort((a, b) => a.label.localeCompare(b.label)),
  );

  readonly slots = computed<FileSlot[]>(() =>
    DOCUMENT_KINDS.map((k) => ({
      id: k,
      label: this.t()(KIND_KEY[k]),
      hint: this.t()(`dossiers.new.kindHint.${k}` as MessageKey),
      icon: KIND_ICON[k] ?? "description",
      sensitive: k === "cni",
    })),
  );

  readonly slotFiles = computed<SlotFile[]>(() =>
    this.docs().map((doc) => ({ key: doc.id, name: doc.name, sizeKb: doc.sizeKb, slot: doc.kind })),
  );
}
