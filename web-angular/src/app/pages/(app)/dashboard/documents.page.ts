import { Component, computed, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map } from "rxjs";

import { actions } from "@/lib/store";
import { KIND_KEY } from "@/lib/dossier-labels";
import { fmtDate, nf, nf1 } from "@/lib/format";
import { inScope, scopedLibrary } from "@/lib/scope";
import { LIBRARY_KINDS, type DocumentLinkType, type DocumentMeta, type LibraryDocumentKind } from "@/lib/mock/cooperative";
import type { MessageKey } from "@/lib/i18n";
import { AppShellComponent } from "@shared/app-shell.component";
import { GlobalFiltersComponent } from "@shared/global-filters.component";
import { LocaleService } from "@shared/locale.service";
import { StoreService } from "@shared/store.service";
import {
  detailFact,
  DetailModalComponent,
  FileSlotsComponent,
  IconComponent,
  ModalComponent,
  SelectComponent,
  SnackbarService,
  StatCardsComponent,
  TONE,
  V2_PAGE_STYLES,
  type DetailView,
  type FileSlot,
  type IconName,
  type SelectOption,
  type SlotFile,
  type StatCard,
} from "@shared/ui";

const GROUP_KEY: Record<LibraryDocumentKind, MessageKey> = {
  statuts: "documents.group.statuts",
  règlement: "documents.group.reglement",
  "procès-verbal": "documents.group.pv",
  convention: "documents.group.convention",
  justificatif: "documents.group.justificatif",
  autre: "documents.group.autre",
};

/** Icône et couleur de chaque type de document (charte V2). */
const KIND_STYLE: Record<LibraryDocumentKind, { icon: IconName; bg: string; fg: string }> = {
  statuts: { icon: "gavel", ...TONE.info },
  règlement: { icon: "menu_book", ...TONE.culture },
  "procès-verbal": { icon: "event_note", ...TONE.succes },
  convention: { icon: "description", ...TONE.attente },
  justificatif: { icon: "fact_check", ...TONE.neutre },
  autre: { icon: "folder_open", ...TONE.neutre },
};

const MAX_KB = 5 * 1024;
const ALL = "__tous";

/**
 * Bibliothèque de la coopérative (charte V2) : statistiques, recherche + type à compteurs + coopérative,
 * documents rangés par type, détail en modale, téléchargement (tracé), ajout (nouvelle version possible)
 * et retrait en modale (`library.manage`).
 */
@Component({
  selector: "app-documents-page",
  imports: [
    AppShellComponent,
    DetailModalComponent,
    FileSlotsComponent,
    GlobalFiltersComponent,
    IconComponent,
    ModalComponent,
    RouterLink,
    SelectComponent,
    StatCardsComponent,
  ],
  styles: [
    V2_PAGE_STYLES,
    `
      .group-head {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 20px;
      }
      .kind-ico {
        display: grid;
        height: 40px;
        width: 40px;
        flex-shrink: 0;
        place-items: center;
        border-radius: 12px;
      }
      .doc {
        display: flex;
        align-items: center;
        gap: 14px;
        border-top: 1px solid var(--v2-separateur);
        padding: 12px 20px;
      }
      .doc.old {
        background: color-mix(in oklab, var(--v2-creme) 55%, transparent);
      }
      .act-danger:hover {
        border-color: var(--v2-erreur-fg);
        background: var(--v2-erreur-bg);
        color: var(--v2-erreur-fg);
      }
      .lbl {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--v2-ardoise);
      }
      .check {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
      }
      .check input {
        margin-top: 2px;
        height: 20px;
        width: 20px;
        accent-color: var(--v2-foret);
        cursor: pointer;
      }
      .seg-form button {
        flex: 1;
        justify-content: center;
      }
    `,
  ],
  template: `
    <app-shell perm="library.read" [area]="t()('documents.area')">
      <!-- ───── En-tête ───── -->
      <header class="rise flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div class="min-w-0">
          <p class="mono" style="color: var(--v2-gris-texte)">{{ t()("documents.eyebrow") }}</p>
          <h1
            class="mt-2 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]"
          >
            {{ t()("documents.title") }}
          </h1>
          <p class="mt-2 max-w-2xl text-[16px] font-medium" style="color: var(--v2-gris-texte)">
            {{ t()("documents.description") }}
          </p>
        </div>
        @if (canUpload()) {
          <button type="button" class="btn btn-primary" (click)="openAdd()">
            {{ t()("documents.add") }}
            <span class="btn-chip"><ui-icon name="upload_file" [size]="20" /></span>
          </button>
        }
      </header>

      <!-- ───── Statistiques ───── -->
      <ui-stat-cards class="rise mt-8" [stats]="stats()" />

      <!-- ───── Recherche · coopérative · type ───── -->
      <div class="toolbar card mt-6">
        <label class="search">
          <ui-icon name="search" [size]="20" />
          <input
            type="search"
            [placeholder]="t()('documents.search.placeholder')"
            [attr.aria-label]="t()('documents.search.aria')"
            [value]="q()"
            (input)="q.set($any($event.target).value)"
          />
        </label>
        <app-global-filters />
        <div class="seg" role="radiogroup" [attr.aria-label]="t()('documents.filters')">
          <button
            type="button"
            role="radio"
            [class.on]="kind() === 'all'"
            [attr.aria-checked]="kind() === 'all'"
            (click)="kind.set('all')"
          >
            {{ t()("documents.filter.all")
            }}<span class="n" [class.zero]="!matching().length">{{ matching().length }}</span>
          </button>
          @for (libraryKind of libraryKinds; track libraryKind) {
            <button
              type="button"
              role="radio"
              [class.on]="kind() === libraryKind"
              [attr.aria-checked]="kind() === libraryKind"
              (click)="kind.set(libraryKind)"
            >
              {{ t()(GROUP_KEY[libraryKind])
              }}<span class="n" [class.zero]="!countKind(libraryKind)">{{
                countKind(libraryKind)
              }}</span>
            </button>
          }
        </div>
      </div>

      <!-- ───── Documents par type ───── -->
      @if (shown().length === 0) {
        <div class="card mt-4 flex flex-col items-center gap-3 p-10 text-center">
          <span
            class="grid size-14 place-items-center rounded-[16px]"
            style="background: var(--v2-sauge); color: var(--v2-foret)"
            ><ui-icon [name]="mine().length ? 'search' : 'folder_open'" [size]="26"
          /></span>
          @if (mine().length === 0) {
            <p class="text-[16px] font-extrabold">{{ t()("documents.empty.title") }}</p>
            <p class="sub max-w-md">
              {{ canUpload() ? t()("documents.empty.manage") : t()("documents.empty.read") }}
            </p>
          } @else {
            <p class="text-[16px] font-extrabold">{{ t()("documents.empty.filtered") }}</p>
            <button type="button" class="btn btn-ghost" (click)="resetFilters()">
              {{ t()("documents.empty.reset") }}
            </button>
          }
        </div>
      } @else {
        <div class="mt-4 grid gap-4">
          @for (group of groups(); track group.kind) {
            <section class="card overflow-hidden" [attr.aria-labelledby]="'group-' + group.kind">
              <div class="group-head">
                <span
                  class="kind-ico"
                  [style.background]="kindStyle[group.kind].bg"
                  [style.color]="kindStyle[group.kind].fg"
                  ><ui-icon [name]="kindStyle[group.kind].icon" [size]="20"
                /></span>
                <h2
                  [id]="'group-' + group.kind"
                  class="min-w-0 flex-1 text-[17px] font-extrabold tracking-[-0.01em]"
                >
                  {{ t()(GROUP_KEY[group.kind]) }}
                </h2>
                <span class="badge" style="background: var(--v2-creme); color: var(--v2-ardoise)">
                  {{
                    t()(
                      group.docs.length > 1
                        ? "documents.group.count.autre"
                        : "documents.group.count.un",
                      { count: group.docs.length }
                    )
                  }}
                </span>
              </div>
              <ul>
                @for (doc of group.docs; track doc.id) {
                  @let isReplaced = (doc.lifecycle ?? "en vigueur") === "remplacé";
                  <li class="doc row-link" [class.old]="isReplaced" (click)="detailId.set(doc.id)">
                    <span
                      class="kind-ico"
                      style="height: 36px; width: 36px"
                      [style.background]="isReplaced ? 'var(--v2-lin)' : styleOf(doc.kind).bg"
                      [style.color]="isReplaced ? 'var(--v2-gris-texte)' : styleOf(doc.kind).fg"
                    >
                      <ui-icon name="description" [size]="18" />
                    </span>
                    <span class="min-w-0 flex-1">
                      <span class="flex flex-wrap items-center gap-1.5">
                        <span
                          class="truncate font-bold"
                          [title]="doc.name"
                          [style.color]="isReplaced ? 'var(--v2-gris-texte)' : null"
                          >{{ doc.name }}</span
                        >
                        <span
                          class="badge"
                          [style.background]="isReplaced ? 'var(--v2-lin)' : 'var(--v2-sauge)'"
                          [style.color]="
                            isReplaced ? 'var(--v2-gris-texte)' : 'var(--v2-vert-pousse)'
                          "
                        >
                          {{
                            isReplaced
                              ? t()("documents.version.replaced")
                              : t()("documents.version.current")
                          }}
                          · v{{ doc.version ?? 1 }}
                        </span>
                        @if (doc.sensitive) {
                          <span
                            class="badge"
                            style="background: var(--v2-erreur-bg); color: var(--v2-erreur-fg)"
                            [title]="t()('documents.sensitive.title')"
                          >
                            <ui-icon name="warning" [size]="13" />{{
                              t()("documents.sensitive.pill")
                            }}
                          </span>
                        }
                      </span>
                      <span class="sub mt-0.5 block truncate">
                        {{ formatSize(doc.sizeKb) }} ·
                        {{
                          t()("documents.version.effect", {
                            date: fmtDate(doc.effectiveAt ?? doc.uploadedAt),
                          })
                        }}
                        ·
                        {{
                          t()("documents.addedBy", {
                            name: doc.uploadedBy,
                            date: fmtDate(doc.uploadedAt),
                          })
                        }}
                        @if (linkName(doc); as linked) {
                          · {{ t()("documents.linkedTo", { name: linked }) }}
                        }
                      </span>
                    </span>
                    <span
                      class="flex shrink-0 items-center gap-2"
                      (click)="$event.stopPropagation()"
                    >
                      @if (meetingOf(doc); as linkedMeeting) {
                        <a
                          class="act"
                          [routerLink]="['/dashboard/reunions', linkedMeeting.id]"
                          [title]="t()('documents.actions.meeting')"
                          [attr.aria-label]="t()('documents.actions.meeting')"
                          ><ui-icon name="event" [size]="18"
                        /></a>
                      }
                      @if (canDownload()) {
                        <button
                          type="button"
                          class="act"
                          [title]="t()('documents.actions.download')"
                          [attr.aria-label]="t()('documents.actions.download') + ' : ' + doc.name"
                          (click)="download(doc)"
                        >
                          <ui-icon name="download" [size]="18" />
                        </button>
                      }
                      @if (canManage()) {
                        <button
                          type="button"
                          class="act act-danger"
                          [title]="t()('documents.actions.remove')"
                          [attr.aria-label]="t()('documents.actions.remove') + ' : ' + doc.name"
                          (click)="removeId.set(doc.id)"
                        >
                          <ui-icon name="close" [size]="18" />
                        </button>
                      }
                      <button
                        type="button"
                        class="act"
                        [title]="t()('common.view')"
                        [attr.aria-label]="t()('documents.row.view', { name: doc.name })"
                        (click)="detailId.set(doc.id)"
                      >
                        <ui-icon name="visibility" [size]="18" />
                      </button>
                    </span>
                  </li>
                }
              </ul>
            </section>
          }
        </div>
      }

      <!-- ───── Détail ───── -->
      <ui-detail-modal [view]="detail()" (closed)="detailId.set(null)" />

      <!-- ───── Ajouter un document ───── -->
      <ui-modal
        [open]="addOpen()"
        [title]="t()('documents.add.title')"
        [description]="t()('documents.add.description')"
        icon="upload_file"
        [width]="640"
        [closeLabel]="t()('common.close')"
        (closed)="addOpen.set(false)"
      >
        <div class="grid gap-5 pb-5 pt-1">
          <div class="grid gap-5 sm:grid-cols-2">
            @if (addScoops().length > 1) {
              <div>
                <p class="lbl">{{ t()("documents.add.scoop") }}</p>
                <ui-select
                  class="mt-2 block"
                  [label]="t()('documents.add.scoop')"
                  leadingIcon="apartment"
                  [options]="addScoops()"
                  [value]="addScoop()"
                  (valueChange)="addScoop.set($event)"
                />
              </div>
            }
            <div>
              <p class="lbl">{{ t()("documents.add.kind") }}</p>
              <ui-select
                class="mt-2 block"
                [label]="t()('documents.add.kind')"
                [leadingIcon]="kindStyle[addKind()].icon"
                [options]="kindOptions()"
                [value]="addKind()"
                (valueChange)="addKind.set($any($event))"
              />
            </div>
          </div>
          <div>
            <p class="lbl">{{ t()("documents.add.link") }}</p>
            <div class="seg seg-form mt-2" role="radiogroup" [attr.aria-label]="t()('documents.add.link')">
              @for (option of linkTypes; track option.id) {
                <button type="button" role="radio" [class.on]="addLinkType() === option.id" [attr.aria-checked]="addLinkType() === option.id" (click)="addLinkType.set(option.id); addLinkId.set('')">{{ t()(option.label) }}</button>
              }
            </div>
            @if (addLinkType() !== "scoop") {
              @if (linkOptions().length) {
                <ui-select class="mt-3 block" [label]="t()('documents.add.link.target')" leadingIcon="link" [options]="linkOptions()" [value]="addLinkId()" (valueChange)="addLinkId.set($event)" />
              } @else {
                <p class="sub mt-3">{{ t()("documents.add.link.none") }}</p>
              }
            }
          </div>
          <ui-file-slots
            [slots]="addSlot()"
            [files]="addFiles()"
            [multiple]="false"
            accept="image/*,application/pdf,.doc,.docx"
            [hint]="t()('documents.add.fileHint', { mb: maxMb })"
            (added)="pickFile($event.files)"
            (removed)="addFile.set(null)"
          />
          @if (duplicate(); as duplicateDoc) {
            <div
              class="rounded-[18px] p-4"
              style="background: var(--v2-attente-bg); color: var(--v2-attente-fg)"
            >
              <p class="flex items-center gap-2 text-[14px] font-bold">
                <ui-icon name="warning" [size]="18" />{{ t()("documents.add.duplicateWarn") }}
              </p>
              @if (canManage()) {
              <div class="seg seg-form mt-3" role="radiogroup">
                <button
                  type="button"
                  role="radio"
                  [class.on]="replace()"
                  [attr.aria-checked]="replace()"
                  (click)="replace.set(true)"
                >
                  {{ t()("documents.add.replaceVersion") }} (v{{ (duplicateDoc.version ?? 1) + 1 }})
                </button>
                <button
                  type="button"
                  role="radio"
                  [class.on]="!replace()"
                  [attr.aria-checked]="!replace()"
                  (click)="replace.set(false)"
                >
                  {{ t()("documents.add.newName") }}
                </button>
              </div>
              } @else {
                <p class="mt-2 text-[13px] font-semibold">{{ t()("documents.add.keepBothOnly") }}</p>
              }
            </div>
          }
          <label class="check">
            <input
              type="checkbox"
              [checked]="addSensitive()"
              (change)="addSensitive.set($any($event.target).checked)"
            />
            <span>
              {{ t()("documents.add.sensitive") }}
              <span class="sub block">{{ t()("documents.add.sensitiveHint") }}</span>
              @if (addSensitive() && !store.can("identity.read_full")) {
                <span class="mt-1 block text-[13px] font-bold" style="color: var(--v2-erreur-fg)">{{
                  t()("documents.add.sensitiveWarn")
                }}</span>
              }
            </span>
          </label>
        </div>
        <button modal-footer type="button" class="btn btn-ghost" (click)="addOpen.set(false)">
          {{ t()("documents.add.cancel") }}
        </button>
        <button
          modal-footer
          type="button"
          class="btn btn-primary"
          [disabled]="!addFile() || !addScoop() || (addLinkType() !== 'scoop' && !addLinkId())"
          (click)="submitAdd()"
        >
          {{ t()("documents.add.submit") }}
          <span class="btn-chip"><ui-icon name="check" [size]="18" /></span>
        </button>
      </ui-modal>

      <!-- ───── Retirer un document ───── -->
      @if (toRemove(); as docToRemove) {
        <ui-modal
          tone="danger"
          [open]="true"
          [title]="t()('documents.remove.title')"
          [description]="t()('documents.remove.description', { name: docToRemove.name })"
          icon="close"
          [width]="520"
          [closeLabel]="t()('common.close')"
          (closed)="removeId.set(null)"
        >
          <button modal-footer type="button" class="btn btn-ghost" (click)="removeId.set(null)">
            {{ t()("documents.add.cancel") }}
          </button>
          <button
            modal-footer
            type="button"
            class="btn"
            style="background: var(--v2-erreur-fg); color: var(--v2-blanc)"
            (click)="submitRemove(docToRemove.id)"
          >
            {{ t()("documents.remove.submit") }}
          </button>
        </ui-modal>
      }
    </app-shell>
  `,
})
export default class DocumentsPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  private readonly snackbar = inject(SnackbarService);
  protected readonly t = this.locale.t;
  protected readonly fmtDate = fmtDate;
  protected readonly GROUP_KEY = GROUP_KEY;
  protected readonly kindStyle = KIND_STYLE;
  protected readonly libraryKinds = [...LIBRARY_KINDS];
  protected readonly maxMb = MAX_KB / 1024;

  private readonly route = inject(ActivatedRoute);
  private readonly scoopFilter = toSignal(
    this.route.queryParamMap.pipe(map((m) => m.get("scoop"))),
    { initialValue: null as string | null },
  );

  protected readonly q = signal("");
  protected readonly kind = signal<LibraryDocumentKind | "all">("all");
  protected readonly detailId = signal<string | null>(null);
  protected readonly removeId = signal<string | null>(null);

  protected readonly canManage = computed(() => this.store.can("library.manage"));
  /** Ajouter un document : `library.upload` (technicien) ou `library.manage`. */
  protected readonly canUpload = computed(
    () => this.store.can("library.upload") || this.store.can("library.manage"),
  );
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

  /** Par type ; dans chaque type, les versions en vigueur d'abord puis les plus récentes. */
  protected readonly groups = computed(() =>
    this.libraryKinds
      .map((k) => ({
        kind: k,
        docs: this.shown()
          .filter((d) => d.kind === k)
          .sort(
            (a, b) =>
              Number((a.lifecycle ?? "en vigueur") === "remplacé") -
                Number((b.lifecycle ?? "en vigueur") === "remplacé") ||
              b.uploadedAt.localeCompare(a.uploadedAt),
          ),
      }))
      .filter((x) => x.docs.length),
  );

  protected readonly stats = computed<StatCard[]>(() => {
    const t = this.t();
    const all = this.mine();
    const current = all.filter((d) => (d.lifecycle ?? "en vigueur") === "en vigueur").length;
    const sensitive = all.filter((d) => d.sensitive).length;
    return [
      {
        label: t("documents.stat.total"),
        value: nf.format(all.length),
        sub: t("documents.stat.totalSub", { count: new Set(all.map((d) => d.kind)).size }),
        icon: "folder_open",
        bg: "",
        fg: "",
      },
      {
        label: t("documents.stat.current"),
        value: nf.format(current),
        sub: t("documents.stat.currentSub"),
        icon: "check_circle",
        ...TONE.succes,
      },
      {
        label: t("documents.stat.replaced"),
        value: nf.format(all.length - current),
        sub: t("documents.stat.replacedSub"),
        icon: "event_note",
        ...TONE.info,
      },
      {
        label: t("documents.stat.sensitive"),
        value: nf.format(sensitive),
        sub: t("documents.stat.sensitiveSub"),
        icon: "warning",
        ...(sensitive ? TONE.erreur : TONE.neutre),
      },
    ];
  });

  /** Style d'un type ; un type hors bibliothèque retombe sur « autre ». */
  protected styleOf(kind: string) {
    return KIND_STYLE[kind as LibraryDocumentKind] ?? KIND_STYLE.autre;
  }

  protected countKind(k: LibraryDocumentKind): number {
    return this.matching().filter((d) => d.kind === k).length;
  }

  protected meetingOf(d: DocumentMeta) {
    if (d.kind !== "procès-verbal") return undefined;
    return this.store.state().meetings.find((m) => m.minutes?.documentId === d.id);
  }

  protected formatSize(kb: number): string {
    return kb >= 1024
      ? this.t()("documents.size.mb", { n: nf1.format(kb / 1024) })
      : this.t()("documents.size.kb", { n: nf1.format(Math.max(1, Math.round(kb))) });
  }

  protected resetFilters(): void {
    this.kind.set("all");
    this.q.set("");
  }

  protected download(d: DocumentMeta): void {
    const r = actions.downloadDocument(d.id);
    if (!r.ok) {
      this.snackbar.error(this.locale.tNow(r.error as MessageKey));
      return;
    }
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

  // ── Détail en modale ──
  protected readonly detail = computed<DetailView | null>(() => {
    const id = this.detailId();
    const d = id ? this.mine().find((x) => x.id === id) : null;
    if (!d) return null;
    const t = this.t();
    const old = (d.lifecycle ?? "en vigueur") === "remplacé";
    const kind = d.kind as LibraryDocumentKind;
    const versions = this.mine()
      .filter(
        (x) =>
          x.scoopId === d.scoopId &&
          x.kind === d.kind &&
          x.name.toLowerCase() === d.name.toLowerCase(),
      )
      .sort((a, b) => (b.version ?? 1) - (a.version ?? 1));
    const mtg = this.meetingOf(d);
    return {
      title: d.name,
      subtitle: t(GROUP_KEY[kind]),
      icon: KIND_STYLE[kind].icon,
      badges: [
        old
          ? { label: t("documents.version.replaced"), ...TONE.neutre }
          : { label: t("documents.version.current"), ...TONE.succes },
        { label: t("documents.version.label", { n: d.version ?? 1 }), ...TONE.info },
        ...(d.sensitive ? [{ label: t("documents.sensitive.pill"), ...TONE.erreur }] : []),
      ],
      kpis: [],
      facts: [
        detailFact(t("documents.quick.kind"), t(GROUP_KEY[kind]), KIND_STYLE[kind].icon),
        detailFact(t("documents.quick.size"), this.formatSize(d.sizeKb), "description"),
        detailFact(
          t("documents.quick.effect"),
          fmtDate(d.effectiveAt ?? d.uploadedAt),
          "calendar_today",
        ),
        detailFact(
          t("documents.quick.addedBy"),
          `${d.uploadedBy} · ${fmtDate(d.uploadedAt)}`,
          "badge",
        ),
        ...(this.linkName(d) ? [detailFact(t("documents.quick.linked"), this.linkName(d), "link", { wide: true })] : []),
        detailFact(
          t("documents.quick.scoop"),
          this.store.state().scoops.find((c) => c.id === d.scoopId)?.name,
          "apartment",
          { wide: true },
        ),
      ],
      sections: [
        {
          title: t("documents.quick.version"),
          icon: "event_note",
          count: versions.length,
          empty: "—",
          items: versions.map((v) => ({
            label: t("documents.version.label", { n: v.version ?? 1 }),
            sub: `${fmtDate(v.effectiveAt ?? v.uploadedAt)} · ${v.uploadedBy}`,
            badge:
              (v.lifecycle ?? "en vigueur") === "remplacé"
                ? { label: t("documents.version.replaced"), ...TONE.neutre }
                : { label: t("documents.version.current"), ...TONE.succes },
          })),
          more: 0,
        },
      ],
      link: mtg ? ["/dashboard/reunions", mtg.id] : null,
    };
  });

  // ── Ajouter un document ──
  protected readonly addOpen = signal(false);
  protected readonly addScoop = signal("");
  protected readonly addKind = signal<LibraryDocumentKind>("statuts");
  protected readonly addFile = signal<{ name: string; sizeKb: number; mime: string } | null>(null);
  protected readonly addSensitive = signal(false);
  protected readonly addLinkType = signal<"scoop" | DocumentLinkType>("scoop");
  protected readonly addLinkId = signal("");
  protected readonly linkTypes: { id: "scoop" | DocumentLinkType; label: MessageKey }[] = [
    { id: "scoop", label: "documents.add.link.scoop" },
    { id: "org", label: "documents.add.link.org" },
    { id: "technicien", label: "documents.add.link.technicien" },
    { id: "personnel", label: "documents.add.link.personnel" },
  ];

  /** Cibles possibles du rattachement, dans la coopérative choisie. */
  protected readonly linkOptions = computed<SelectOption[]>(() => {
    const state = this.store.state();
    const scoop = this.addScoop();
    const type = this.addLinkType();
    if (type === "org")
      return state.orgs
        .filter((org) => org.scoopId === scoop)
        .sort((first, second) => first.name.localeCompare(second.name))
        .map((org) => ({ value: org.id, label: org.name }));
    if (type === "scoop") return [];
    return state.users
      .filter((user) => user.scoopId === scoop || user.scoopIds?.includes(scoop))
      .filter((user) => (type === "technicien" ? user.role === "technicien" : user.role !== "technicien" && !["admin", "superadmin", "faitiere"].includes(user.role)))
      .sort((first, second) => first.name.localeCompare(second.name))
      .map((user) => ({ value: user.id, label: user.name, ...(type === "personnel" ? { hint: this.store.roleLabel(user.role) } : {}) }));
  });

  /** Nom de ce à quoi le document est lié ; vide si c'est toute la coopérative. */
  protected linkName(doc: DocumentMeta): string {
    if (!doc.link) return "";
    const state = this.store.state();
    return doc.link.type === "org"
      ? (state.orgs.find((org) => org.id === doc.link!.id)?.name ?? "")
      : (state.users.find((user) => user.id === doc.link!.id)?.name ?? "");
  }
  protected readonly replace = signal(true);

  /** Coopératives où la session peut ranger un document (périmètre, hors archivées). */
  protected readonly addScoops = computed<SelectOption[]>(() => {
    const s = this.store.state();
    return inScope(
      s.scoops.filter((c) => !c.archived).map((c) => ({ ...c, scoopId: c.id })),
      s.session,
    )
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((c) => ({ value: c.id, label: c.name }));
  });

  protected readonly kindOptions = computed<SelectOption[]>(() =>
    this.libraryKinds.map((k) => ({
      value: k,
      label: this.t()(GROUP_KEY[k]),
      icon: KIND_STYLE[k].icon,
    })),
  );

  /** Une seule case de dépôt, intitulée selon le type choisi. */
  protected readonly addSlot = computed<FileSlot[]>(() => [
    {
      id: "file",
      label: this.t()(GROUP_KEY[this.addKind()]),
      hint: this.t()("documents.add.choose"),
      icon: KIND_STYLE[this.addKind()].icon,
      required: true,
    },
  ]);

  protected readonly addFiles = computed<SlotFile[]>(() => {
    const f = this.addFile();
    return f ? [{ key: "file", name: f.name, sizeKb: f.sizeKb, slot: "file" }] : [];
  });

  /** Un document en vigueur porte déjà ce nom dans cette coopérative : nouvelle version ou autre nom. */
  protected readonly duplicate = computed(() => {
    const f = this.addFile();
    if (!f) return null;
    return (
      this.store
        .state()
        .documents.find(
          (d) =>
            d.ownerType === "scoop" &&
            d.scoopId === this.addScoop() &&
            d.name.toLowerCase() === f.name.trim().toLowerCase() &&
            (d.lifecycle ?? "en vigueur") === "en vigueur",
        ) ?? null
    );
  });

  protected openAdd(): void {
    const scoop = this.scoopFilter();
    this.addScoop.set(
      scoop && this.addScoops().some((o) => o.value === scoop)
        ? scoop
        : (this.addScoops()[0]?.value ?? ""),
    );
    this.addKind.set(this.kind() === "all" ? "statuts" : (this.kind() as LibraryDocumentKind));
    this.addFile.set(null);
    this.addSensitive.set(false);
    this.addLinkType.set("scoop");
    this.addLinkId.set("");
    this.replace.set(true);
    this.addOpen.set(true);
  }

  protected pickFile(files: File[]): void {
    const file = files[0];
    if (!file) return;
    const sizeKb = Math.ceil(file.size / 1024);
    if (sizeKb > MAX_KB) {
      this.snackbar.error(
        this.t()("documents.add.tooBig", { size: this.formatSize(sizeKb), mb: this.maxMb }),
      );
      return;
    }
    this.addFile.set({ name: file.name, sizeKb, mime: file.type || "application/octet-stream" });
  }

  protected submitAdd(): void {
    const f = this.addFile();
    if (!f) return;
    const dup = this.duplicate();
    // « Garder les deux » : le nouveau fichier prend un autre nom (suffixe de version).
    const name =
      dup && !(this.replace() && this.canManage())
        ? f.name.replace(/(\.[^.]+)?$/, (ext) => ` (${(dup.version ?? 1) + 1})${ext}`)
        : f.name;
    const res = actions.addLibraryDocument(this.addScoop(), {
      kind: this.addKind(),
      name,
      sizeKb: f.sizeKb,
      mime: f.mime,
      sensitive: this.addSensitive(),
      ...(this.addLinkType() !== "scoop" ? { link: { type: this.addLinkType() as DocumentLinkType, id: this.addLinkId() } } : {}),
      replaceExisting: !!dup && this.replace() && this.canManage(),
    });
    if (!res.ok) {
      this.snackbar.error(this.locale.tNow(res.error as MessageKey));
      return;
    }
    this.addOpen.set(false);
    this.snackbar.success(this.t()("documents.added"));
  }

  // ── Retirer un document ──
  protected readonly toRemove = computed(() => {
    const id = this.removeId();
    return id ? (this.mine().find((d) => d.id === id) ?? null) : null;
  });

  protected submitRemove(id: string): void {
    const res = actions.removeLibraryDocument(id);
    if (!res.ok) {
      this.snackbar.error(this.locale.tNow(res.error as MessageKey));
      return;
    }
    this.removeId.set(null);
    this.snackbar.success(this.t()("documents.removed"));
  }
}
