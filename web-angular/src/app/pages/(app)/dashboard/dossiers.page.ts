import { Component, computed, inject, signal } from "@angular/core";
import { Router } from "@angular/router";

import type { MessageKey } from "@/lib/i18n";
import { type DraftIssue, validateDraft } from "@/lib/dossiers";
import {
  DOCUMENT_KINDS,
  type DossierDocumentKind,
  type DossierDraft,
  type DossierStatus,
  type ProducerDossier,
} from "@/lib/mock/cooperative";
import { inScope, scopedDossiers } from "@/lib/scope";
import { fmtDate, nf } from "@/lib/format";
import { AppShellComponent } from "@shared/app-shell.component";
import { LocaleService } from "@shared/locale.service";
import { StoreService } from "@shared/store.service";
import { createPager } from "@shared/pager";
import {
  detailFact,
  detailKpi,
  DetailModalComponent,
  FileSlotsComponent,
  IconComponent,
  initialsOf,
  ModalComponent,
  PaginationComponent,
  SelectComponent,
  SnackbarService,
  StatCardsComponent,
  TextFieldComponent,
  TONE,
  V2_PAGE_STYLES,
  type DetailView,
  type FileSlot,
  type IconName,
  type SelectOption,
  type SlotFile,
  type StatCard,
} from "@shared/ui";

type View = "tous" | "a-traiter" | DossierStatus;
const TO_PROCESS: DossierStatus[] = ["soumis", "en examen"];
const FILTERS = ["brouillon", "complément demandé", "approuvé", "refusé"] as const;
const FILTER_LABEL: Record<(typeof FILTERS)[number], MessageKey> = {
  brouillon: "dossiers.filter.brouillon",
  "complément demandé": "dossiers.filter.complément demandé",
  approuvé: "dossiers.filter.approuvé",
  refusé: "dossiers.filter.refusé",
};

/** Couleur d'état de chaque étape du dossier (charte V2). */
const STATUS: Record<DossierStatus, { bg: string; fg: string }> = {
  brouillon: TONE.neutre,
  soumis: TONE.attente,
  "en examen": TONE.info,
  "complément demandé": TONE.culture,
  approuvé: TONE.succes,
  refusé: TONE.erreur,
};

const DAY = 86_400_000;
/** Même plafond que le store (`addDocument`) : 5 Mo par pièce. */
const MAX_FILE_KB = 5 * 1024;

type NewForm = {
  scoopId: string;
  firstName: string;
  lastName: string;
  sex: "F" | "H";
  age: string;
  phone: string;
  cni: string;
  village: string;
  orgId: string;
  createMember: boolean;
};
type PendingFile = {
  key: string;
  name: string;
  sizeKb: number;
  mime: string;
  kind: DossierDocumentKind;
};

const emptyForm = (scoopId: string): NewForm => ({
  scoopId,
  firstName: "",
  lastName: "",
  sex: "F",
  age: "",
  phone: "",
  cni: "",
  village: "",
  orgId: "",
  createMember: true,
});

/**
 * Dossiers producteurs (charte V2) : statistiques, recherche + filtres à compteurs, tableau paginé,
 * détail en modale (lien « Ouvrir le dossier » pour instruire), création d'un brouillon en modale.
 */
@Component({
  selector: "app-dossiers-page",
  imports: [
    AppShellComponent,
    FileSlotsComponent,
    IconComponent,
    ModalComponent,
    DetailModalComponent,
    PaginationComponent,
    SelectComponent,
    StatCardsComponent,
    TextFieldComponent,
  ],
  styles: [
    V2_PAGE_STYLES,
    `
      .lbl {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--v2-ardoise);
      }
      .seg-form button {
        flex: 1;
        justify-content: center;
      }
      .dup {
        background: var(--v2-bloquant-bg);
        color: var(--v2-bloquant-fg);
      }
      .sec {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 26px 0 14px;
        font-size: 14px;
        font-weight: 800;
        color: var(--v2-foret);
      }
      .sec:first-child {
        margin-top: 4px;
      }
      .sec .n {
        border-radius: 999px;
        background: var(--v2-foret);
        padding: 1px 8px;
        font-size: 12px;
        color: var(--v2-citron);
      }
      .field-err {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-top: 6px;
        font-size: 13px;
        font-weight: 700;
        color: var(--v2-erreur-fg);
      }
      .check {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
      }
      .check input {
        height: 20px;
        width: 20px;
        accent-color: var(--v2-foret);
        cursor: pointer;
      }
    `,
  ],
  template: `
    <app-shell [perm]="perms" [area]="t()('dossiers.area')">
      <!-- ───── En-tête ───── -->
      <header class="rise flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div class="min-w-0">
          <p class="mono" style="color: var(--v2-gris-texte)">{{ t()("dossiers.eyebrow") }}</p>
          <h1
            class="mt-2 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]"
          >
            {{ t()("dossiers.title") }}
          </h1>
          <p class="mt-2 max-w-2xl text-[16px] font-medium" style="color: var(--v2-gris-texte)">
            {{
              store.can("dossier.review")
                ? t()("dossiers.description.reviewer")
                : t()("dossiers.description.creator")
            }}
          </p>
        </div>
        @if (canCreate()) {
          <button type="button" class="btn btn-primary" (click)="openNew()">
            {{ t()("dossiers.new") }}
            <span class="btn-chip"><ui-icon name="add" [size]="20" /></span>
          </button>
        }
      </header>

      <!-- ───── Statistiques ───── -->
      <ui-stat-cards class="rise mt-8" [stats]="stats()" />

      <!-- ───── Recherche · filtres ───── -->
      <div class="toolbar card mt-6">
        <label class="search">
          <ui-icon name="search" [size]="20" />
          <input
            type="search"
            [placeholder]="t()('dossiers.search.placeholder')"
            [attr.aria-label]="t()('dossiers.search.aria')"
            [value]="q()"
            (input)="q.set($any($event.target).value)"
          />
        </label>
        <div class="seg" role="radiogroup" [attr.aria-label]="t()('dossiers.filter.group')">
          @for (filterButton of filterButtons(); track filterButton.id) {
            <button
              type="button"
              role="radio"
              [class.on]="view() === filterButton.id"
              [attr.aria-checked]="view() === filterButton.id"
              (click)="view.set(filterButton.id)"
            >
              {{ filterButton.label
              }}<span class="n" [class.zero]="!filterButton.count">{{ filterButton.count }}</span>
            </button>
          }
        </div>
      </div>

      <p class="sub mt-4" aria-live="polite">
        {{
          t()("dossiers.count", {
            shown: nf.format(shown().length),
            total: nf.format(mine().length),
          })
        }}
      </p>

      <!-- ───── Liste ───── -->
      <section class="card mt-3 overflow-hidden">
        @if (shown().length) {
          <div class="overflow-x-auto">
            <table class="tbl min-w-[880px]">
              <thead>
                <tr>
                  <th>{{ t()("dossiers.col.future") }}</th>
                  <th>{{ t()("dossiers.col.scoop") }}</th>
                  <th>{{ t()("dossiers.col.tech") }}</th>
                  <th>{{ t()("dossiers.col.updated") }}</th>
                  <th class="text-right">{{ t()("dossiers.col.age") }}</th>
                  <th>{{ t()("dossiers.col.status") }}</th>
                  <th class="text-right">{{ t()("dossiers.col.actions") }}</th>
                </tr>
              </thead>
              <tbody>
                @for (dossier of pager.items(); track dossier.id) {
                  <tr class="row-link" (click)="detailId.set(dossier.id)">
                    <td>
                      <span class="flex items-center gap-3">
                        <span
                          class="avatar"
                          [style.background]="status[dossier.status].bg"
                          [style.color]="status[dossier.status].fg"
                          >{{ initials(name(dossier)) }}</span
                        >
                        <span class="min-w-0">
                          <span class="block truncate font-bold">{{ name(dossier) }}</span>
                          <span class="sub flex items-center gap-1.5 truncate">
                            {{ dossier.draft.village || t()("dossiers.row.noVillage") }}
                            @if (dossier.possibleDuplicateOf) {
                              <span class="badge dup">{{ t()("dossiers.row.duplicate") }}</span>
                            }
                          </span>
                        </span>
                      </span>
                    </td>
                    <td class="max-w-52 truncate font-medium" [title]="scoopName(dossier.scoopId)">
                      {{ scoopName(dossier.scoopId) }}
                    </td>
                    <td class="font-medium">{{ dossier.createdBy }}</td>
                    <td class="whitespace-nowrap font-medium tabular-nums">
                      {{ fmtDate(dossier.updatedAt) }}
                    </td>
                    <td
                      class="whitespace-nowrap text-right font-extrabold tabular-nums"
                      [style.color]="
                        ageDays(dossier) > 14 && isOpen(dossier) ? 'var(--v2-erreur-fg)' : null
                      "
                    >
                      {{
                        t()(
                          ageDays(dossier) > 1 ? "dossiers.age.days.autre" : "dossiers.age.days.un",
                          { count: ageDays(dossier) }
                        )
                      }}
                    </td>
                    <td>
                      <span
                        class="badge"
                        [style.background]="status[dossier.status].bg"
                        [style.color]="status[dossier.status].fg"
                        >{{ t()(statusKey(dossier.status)) }}</span
                      >
                    </td>
                    <td>
                      <span class="flex justify-end">
                        <button
                          type="button"
                          class="act"
                          [title]="t()('common.view')"
                          [attr.aria-label]="t()('dossiers.view.aria', { name: name(dossier) })"
                          (click)="$event.stopPropagation(); detailId.set(dossier.id)"
                        >
                          <ui-icon name="visibility" [size]="18" />
                        </button>
                      </span>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <ui-pagination class="px-5 pb-5" [pager]="pager" />
        } @else {
          <div class="flex flex-col items-center gap-3 p-10 text-center">
            <span
              class="grid size-14 place-items-center rounded-[16px]"
              style="background: var(--v2-sauge); color: var(--v2-foret)"
              ><ui-icon name="folder_open" [size]="26"
            /></span>
            <p class="text-[16px] font-extrabold">
              {{ mine().length ? t()("dossiers.empty.filtered") : t()("dossiers.empty.title") }}
            </p>
            @if (!mine().length) {
              <p class="sub max-w-md">
                {{ canCreate() ? t()("dossiers.empty.create") : t()("dossiers.empty.readonly") }}
              </p>
            }
          </div>
        }
      </section>

      <!-- ───── Détail ───── -->
      <ui-detail-modal [view]="detail()" (closed)="detailId.set(null)" />

      <!-- ───── Nouveau dossier : tous les champs du détail + pièces jointes ───── -->
      <ui-modal
        [open]="newOpen()"
        [title]="t()('dossiers.new.title')"
        [description]="t()('dossiers.new.draftHint')"
        icon="folder_shared"
        [width]="780"
        [closeLabel]="t()('common.close')"
        (closed)="newOpen.set(false)"
      >
        <div class="pb-6 pt-2">
          <!-- Identité -->
          <h3 class="sec">
            <ui-icon name="person" [size]="18" />{{ t()("dossiers.new.section.identity") }}
          </h3>
          <div class="grid gap-5 sm:grid-cols-2">
            <ui-text-field
              preset="firstName"
              [label]="t()('dossiers.new.firstName')"
              [value]="form().firstName"
              [error]="err('firstName')"
              (valueChange)="setField('firstName', $event)"
            />
            <ui-text-field
              preset="lastName"
              [label]="t()('dossiers.new.lastName')"
              [value]="form().lastName"
              [error]="err('lastName')"
              (valueChange)="setField('lastName', $event)"
            />
            <div>
              <p class="lbl">{{ t()("dossiers.new.sex") }}</p>
              <div
                class="seg seg-form mt-2"
                role="radiogroup"
                [attr.aria-label]="t()('dossiers.new.sex')"
              >
                <button
                  type="button"
                  role="radio"
                  [class.on]="form().sex === 'F'"
                  [attr.aria-checked]="form().sex === 'F'"
                  (click)="setField('sex', 'F')"
                >
                  {{ t()("dossiers.new.female") }}
                </button>
                <button
                  type="button"
                  role="radio"
                  [class.on]="form().sex === 'H'"
                  [attr.aria-checked]="form().sex === 'H'"
                  (click)="setField('sex', 'H')"
                >
                  {{ t()("dossiers.new.male") }}
                </button>
              </div>
            </div>
            <ui-text-field
              preset="age"
              [label]="t()('dossiers.detail.info.age')"
              [value]="form().age"
              [error]="err('age')"
              (valueChange)="setField('age', $event)"
            />
          </div>

          <!-- Contact et CNI -->
          <h3 class="sec">
            <ui-icon name="call" [size]="18" />{{ t()("dossiers.new.section.contact") }}
          </h3>
          <div class="grid gap-5 sm:grid-cols-2">
            <ui-text-field
              preset="phone"
              [label]="t()('dossiers.detail.info.phone')"
              [value]="form().phone"
              [error]="err('phone')"
              (valueChange)="setField('phone', $event)"
            />
            <ui-text-field
              preset="cni"
              [label]="t()('dossiers.detail.info.cni')"
              [hint]="t()('dossiers.detail.edit.cniHint')"
              [value]="form().cni"
              [error]="err('cni')"
              (valueChange)="setField('cni', $event)"
            />
          </div>

          <!-- Rattachement -->
          <h3 class="sec">
            <ui-icon name="hub" [size]="18" />{{ t()("dossiers.new.section.attach") }}
          </h3>
          <div class="grid gap-5 sm:grid-cols-2">
            @if (createScoops().length > 1) {
              <div>
                <p class="lbl">{{ t()("dossiers.new.scoop") }}</p>
                <ui-select
                  class="mt-2 block"
                  [label]="t()('dossiers.new.scoop')"
                  leadingIcon="apartment"
                  [options]="scoopOptions()"
                  [value]="form().scoopId"
                  (valueChange)="setScoop($event)"
                />
              </div>
            }
            <div>
              <p class="lbl">{{ t()("dossiers.detail.info.org") }}</p>
              <ui-select
                class="mt-2 block"
                [label]="t()('dossiers.detail.info.org')"
                leadingIcon="hub"
                [options]="orgOptions()"
                [value]="form().orgId"
                (valueChange)="setOrg($event)"
              />
              @if (err("orgId")) {
                <p class="field-err"><ui-icon name="warning" [size]="16" />{{ err("orgId") }}</p>
              }
            </div>
            <ui-text-field
              preset="village"
              [label]="t()('dossiers.detail.info.village')"
              [value]="form().village"
              [error]="err('village')"
              (valueChange)="setField('village', $event)"
            />
          </div>
          <label class="check mt-5">
            <input
              type="checkbox"
              [checked]="form().createMember"
              (change)="setField('createMember', $any($event.target).checked)"
            />
            <span>{{ t()("dossiers.detail.edit.createMember") }}</span>
          </label>

          <!-- Pièces jointes -->
          <h3 class="sec">
            <ui-icon name="upload_file" [size]="18" />{{ t()("dossiers.new.section.pieces") }}
            @if (files().length) {
              <span class="n">{{ files().length }}</span>
            }
          </h3>
          <ui-file-slots
            [slots]="fileSlots()"
            [files]="slotFiles()"
            accept="image/*,application/pdf"
            [hint]="t()('dossiers.new.filesHint', { mb: maxMb })"
            (added)="addFiles($event.slot, $event.files)"
            (removed)="removeFile($event)"
          />
          @if (err("pièces")) {
            <p class="field-err"><ui-icon name="warning" [size]="16" />{{ err("pièces") }}</p>
          }
        </div>
        <button modal-footer type="button" class="btn btn-ghost" (click)="newOpen.set(false)">
          {{ t()("common.cancel") }}
        </button>
        <button
          modal-footer
          type="button"
          class="btn btn-ghost"
          [disabled]="!canDraft()"
          (click)="submitNew(false)"
        >
          {{ t()("dossiers.new.submit") }}
        </button>
        @if (store.can("dossier.submit")) {
          <button modal-footer type="button" class="btn btn-primary" (click)="submitNew(true)">
            {{ t()("dossiers.new.submitNow") }}
            <span class="btn-chip"><ui-icon name="arrow_forward" [size]="18" /></span>
          </button>
        }
      </ui-modal>
    </app-shell>
  `,
})
export default class DossiersPage {
  private readonly router = inject(Router);
  private readonly snackbar = inject(SnackbarService);
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly fmtDate = fmtDate;
  protected readonly initials = initialsOf;
  protected readonly status = STATUS;
  protected readonly perms = ["dossier.create", "dossier.review"] as const;
  protected readonly q = signal("");
  protected readonly view = signal<View>("tous");
  protected readonly newOpen = signal(false);
  protected readonly detailId = signal<string | null>(null);

  /** Formulaire de création : mêmes champs que le détail du dossier (`DossierDraft`) + SCOOP. */
  protected readonly form = signal<NewForm>(emptyForm(""));
  /** Erreurs par champ, affichées seulement après un essai d'envoi. */
  protected readonly issues = signal<DraftIssue[]>([]);
  protected readonly files = signal<PendingFile[]>([]);
  protected readonly maxMb = MAX_FILE_KB / 1024;

  protected readonly mine = computed(() =>
    scopedDossiers(this.store.state().dossiers, this.store.state().session),
  );

  protected readonly canCreate = computed(() => this.store.can("dossier.create"));

  protected readonly createScoops = computed(() => {
    const session = this.store.state().session;
    return this.store
      .state()
      .scoops.filter((s) => inScope([{ scoopId: s.id }], session).length === 1);
  });

  protected readonly scoopOptions = computed<SelectOption[]>(() =>
    this.createScoops().map((s) => ({ value: s.id, label: s.name })),
  );

  protected readonly filterButtons = computed(() => {
    const t = this.t();
    const mine = this.mine();
    const n = (f: (d: ProducerDossier) => boolean) => mine.filter(f).length;
    const buttons: { id: View; label: string; count: number }[] = [
      { id: "tous", label: t("dossiers.filter.all"), count: mine.length },
      {
        id: "a-traiter",
        label: t("dossiers.filter.toProcess"),
        count: n((d) => TO_PROCESS.includes(d.status)),
      },
    ];
    for (const s of FILTERS)
      buttons.push({ id: s, label: t(FILTER_LABEL[s]), count: n((d) => d.status === s) });
    return buttons;
  });

  protected readonly stats = computed<StatCard[]>(() => {
    const t = this.t();
    const mine = this.mine();
    const n = (st: DossierStatus[]) => mine.filter((d) => st.includes(d.status)).length;
    return [
      {
        label: t("dossiers.stat.total"),
        value: nf.format(mine.length),
        sub: t("dossiers.stat.totalSub", { count: n(["brouillon"]) }),
        icon: "folder_shared",
        bg: "",
        fg: "",
      },
      {
        label: t("dossiers.stat.toProcess"),
        value: nf.format(n(TO_PROCESS)),
        sub: t("dossiers.stat.toProcessSub"),
        icon: "fact_check",
        ...TONE.attente,
      },
      {
        label: t("dossiers.stat.complement"),
        value: nf.format(n(["complément demandé"])),
        sub: t("dossiers.stat.complementSub"),
        icon: "mark_email_unread",
        ...TONE.culture,
      },
      {
        label: t("dossiers.stat.approved"),
        value: nf.format(n(["approuvé"])),
        sub: t("dossiers.stat.approvedSub", { count: n(["refusé"]) }),
        icon: "task_alt",
        ...TONE.succes,
      },
    ];
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

  /** Pagination : mêmes règles que l'API (?page=&limit=). */
  protected readonly pager = createPager(() => this.shown());

  protected name(d: ProducerDossier): string {
    const full = `${d.draft.firstName} ${d.draft.lastName}`.trim();
    return full || `${this.t()("dossiers.row.noFirstName")} ${this.t()("dossiers.row.noLastName")}`;
  }

  /** Ancienneté : depuis la soumission, sinon depuis la création. */
  protected ageDays(d: ProducerDossier): number {
    return Math.max(
      0,
      Math.floor((Date.now() - new Date(d.submittedAt ?? d.createdAt).getTime()) / DAY),
    );
  }

  protected isOpen(d: ProducerDossier): boolean {
    return d.status !== "approuvé" && d.status !== "refusé";
  }

  protected scoopName(id: string): string {
    return this.store.state().scoops.find((s) => s.id === id)?.name ?? id;
  }

  protected statusKey(s: DossierStatus): MessageKey {
    return `dossiers.status.${s}` as MessageKey;
  }

  protected readonly detail = computed<DetailView | null>(() => {
    const id = this.detailId();
    const d = id ? this.mine().find((x) => x.id === id) : null;
    if (!d) return null;
    const t = this.t();
    const s = this.store.state();
    const org = s.orgs.find((o) => o.id === d.draft.orgId);
    const history = [...d.history].sort((a, b) => b.at.localeCompare(a.at));
    const decision = d.decision
      ? `${t(d.decision.approved ? "dossiers.status.approuvé" : "dossiers.status.refusé")} · ${fmtDate(d.decision.at)} · ${d.decision.by}`
      : null;
    return {
      title: this.name(d),
      subtitle: [d.draft.village, this.scoopName(d.scoopId)].filter(Boolean).join(" · "),
      icon: "folder_shared",
      badges: [
        { label: t(this.statusKey(d.status)), ...STATUS[d.status] },
        ...(d.possibleDuplicateOf
          ? [
              {
                label: t("dossiers.row.duplicate"),
                bg: "var(--v2-bloquant-bg)",
                fg: "var(--v2-bloquant-fg)",
              },
            ]
          : []),
      ],
      kpis: [
        detailKpi(t("dossiers.quick.documents"), d.documentIds.length, "description", TONE.info),
        detailKpi(
          t("dossiers.quick.waiting"),
          this.ageDays(d),
          "calendar_today",
          this.ageDays(d) > 14 && this.isOpen(d) ? TONE.erreur : TONE.attente,
        ),
        detailKpi(t("dossiers.quick.events"), d.history.length, "event_note", TONE.culture),
      ],
      facts: [
        detailFact(
          t("dossiers.new.sex"),
          t(d.draft.sex === "F" ? "dossiers.new.female" : "dossiers.new.male"),
          "person",
        ),
        detailFact(
          t("producteurs.col.age"),
          d.draft.age === null
            ? null
            : t("cooperatives.fiche.detail.ageValue", { count: d.draft.age }),
          "calendar_today",
        ),
        detailFact(t("producteurs.col.phone"), this.store.phone(d.draft.phone) || null, "call"),
        detailFact(t("producteurs.col.village"), d.draft.village, "location_on"),
        detailFact(t("producteurs.col.organisation"), org?.name, "hub"),
        detailFact(
          t("dossiers.quick.member"),
          t(d.draft.createMember ? "dossiers.quick.yes" : "dossiers.quick.no"),
          "group",
        ),
        detailFact(t("dossiers.quick.createdBy"), d.createdBy, "badge"),
        detailFact(t("dossiers.quick.createdAt"), fmtDate(d.createdAt), "event_note"),
        detailFact(
          t("dossiers.quick.submittedAt"),
          d.submittedAt ? fmtDate(d.submittedAt) : null,
          "upload_file",
        ),
        detailFact(t("dossiers.quick.decision"), decision, "gavel", { wide: true }),
      ],
      sections: [
        {
          title: t("dossiers.quick.history"),
          icon: "event_note",
          count: history.length || null,
          empty: t("dossiers.quick.historyEmpty"),
          items: history.slice(0, 8).map((h) => ({
            label: t(`dossiers.event.${h.action}` as MessageKey),
            sub: `${fmtDate(h.at)} · ${h.by}${h.comment ? ` · ${h.comment}` : ""}`,
          })),
          more: Math.max(0, history.length - 8),
        },
      ],
      link: ["/dashboard/dossiers", d.id],
    };
  });

  protected readonly orgOptions = computed<SelectOption[]>(() =>
    this.store
      .state()
      .orgs.filter((o) => o.scoopId === this.form().scoopId)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((o) => ({ value: o.id, label: o.name, ...(o.village ? { hint: o.village } : {}) })),
  );

  protected kindKey(k: DossierDocumentKind): MessageKey {
    return `dossiers.kind.${k}` as MessageKey;
  }

  protected err(field: DraftIssue["field"]): string {
    return this.issues().find((i) => i.field === field)?.message ?? "";
  }

  protected setField<K extends keyof NewForm>(key: K, value: NewForm[K]): void {
    this.form.update((f) => ({ ...f, [key]: value }));
    // Le champ corrigé perd son erreur ; les autres restent jusqu'au prochain essai.
    this.issues.update((list) => list.filter((i) => i.field !== key));
  }

  protected setScoop(scoopId: string): void {
    this.form.update((f) => ({ ...f, scoopId, orgId: "" }));
  }

  /** Choisir l'organisation propose son village quand il n'est pas encore saisi. */
  protected setOrg(orgId: string): void {
    const org = this.store.state().orgs.find((o) => o.id === orgId);
    this.form.update((f) => ({
      ...f,
      orgId,
      village: f.village.trim() ? f.village : (org?.village ?? ""),
    }));
    this.issues.update((list) =>
      list.filter((i) => i.field !== "orgId" && (i.field !== "village" || !org?.village)),
    );
  }

  protected openNew(): void {
    this.form.set(emptyForm(this.createScoops()[0]?.id ?? ""));
    this.issues.set([]);
    this.files.set([]);
    this.newOpen.set(true);
  }

  /** Une case de dépôt par type de pièce (CNI, photo, justificatif, autre). */
  protected readonly fileSlots = computed<FileSlot[]>(() => {
    const t = this.t();
    const icon: Record<DossierDocumentKind, IconName> = {
      cni: "badge",
      photo: "account_circle",
      justificatif: "description",
      autre: "folder_open",
    };
    return DOCUMENT_KINDS.map((k) => ({
      id: k,
      label: t(this.kindKey(k)),
      hint: t(`dossiers.new.kindHint.${k}` as MessageKey),
      icon: icon[k],
      sensitive: k === "cni",
    }));
  });

  protected readonly slotFiles = computed<SlotFile[]>(() =>
    this.files().map((f) => ({ key: f.key, name: f.name, sizeKb: f.sizeKb, slot: f.kind })),
  );

  protected addFiles(kind: string, list: File[]): void {
    for (const file of list) {
      const sizeKb = Math.ceil(file.size / 1024);
      if (sizeKb > MAX_FILE_KB) {
        this.snackbar.error(this.t()("dossiers.new.tooBig", { name: file.name, mb: this.maxMb }));
        continue;
      }
      this.files.update((f) => [
        ...f,
        {
          key: `${Date.now()}-${f.length}-${file.name}`,
          name: file.name,
          sizeKb,
          mime: file.type || "application/octet-stream",
          kind: kind as DossierDocumentKind,
        },
      ]);
    }
    this.issues.update((issues) => issues.filter((i) => i.field !== "pièces"));
  }

  protected removeFile(key: string): void {
    this.files.update((f) => f.filter((x) => x.key !== key));
  }

  /** Un brouillon demande au moins le prénom, le nom et la SCOOP. */
  protected canDraft(): boolean {
    const f = this.form();
    return !!(f.firstName.trim() && f.lastName.trim() && f.scoopId);
  }

  private draft(): DossierDraft {
    const f = this.form();
    const age = f.age.trim() === "" ? null : Number(f.age);
    return {
      firstName: f.firstName.trim(),
      lastName: f.lastName.trim(),
      sex: f.sex,
      age: Number.isFinite(age) ? age : null,
      phone: f.phone.trim(),
      cni: f.cni.replace(/\s/g, ""),
      village: f.village.trim(),
      orgId: f.orgId,
      createMember: f.createMember,
    };
  }

  /**
   * Crée le dossier, joint les pièces, puis le soumet si demandé.
   * Soumettre applique d'abord les contrôles du store (`validateDraft`) : erreurs affichées champ par champ.
   */
  protected submitNew(submit: boolean): void {
    const draft = this.draft();
    if (submit) {
      const found = validateDraft(draft, this.files().length);
      if (found.length) {
        this.issues.set(found);
        this.snackbar.error(this.t()("dossiers.detail.edit.fixFields"));
        return;
      }
    } else if (!this.canDraft()) {
      this.issues.set(
        validateDraft(draft, 1).filter((i) => i.field === "firstName" || i.field === "lastName"),
      );
      return;
    }
    const res = this.store.actions.createDossier(this.form().scoopId, draft);
    if (!res.ok) {
      this.snackbar.error(this.locale.tNow(res.error as MessageKey));
      return;
    }
    for (const f of this.files()) {
      const added = this.store.actions.addDocument(res.id, {
        kind: f.kind,
        name: f.name,
        sizeKb: f.sizeKb,
        mime: f.mime,
      });
      if (!added.ok) this.snackbar.error(this.locale.tNow(added.error as MessageKey));
    }
    let message = this.t()("dossiers.new.done");
    if (submit) {
      const sent = this.store.actions.submitDossier(res.id);
      message = sent.ok
        ? sent.possibleDuplicateOf
          ? `${this.t()("dossiers.detail.edit.submitted")} · ${this.t()("dossiers.detail.edit.duplicateFlagged")}`
          : this.t()("dossiers.detail.edit.submitted")
        : this.locale.tNow(sent.error as MessageKey);
    }
    this.newOpen.set(false);
    this.snackbar.success(message);
    void this.router.navigate(["/dashboard/dossiers", res.id]);
  }
}
