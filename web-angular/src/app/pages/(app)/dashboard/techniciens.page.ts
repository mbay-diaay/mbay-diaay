import { Component, computed, inject, signal } from "@angular/core";

import { nf } from "@/lib/format";
import type { MessageKey } from "@/lib/i18n";
import { inScope } from "@/lib/scope";
import type { AppUser } from "@/lib/store";
import { AppShellComponent } from "@shared/app-shell.component";
import { createPager } from "@shared/pager";
import { LocaleService } from "@shared/locale.service";
import { StoreService } from "@shared/store.service";
import { TechnicianCodeDialogComponent, type TechnicianCodeView } from "@shared/technician-code-dialog.component";
import { TechnicianDialogComponent } from "@shared/technician-dialog.component";
import {
  CheckListComponent,
  IconComponent,
  ModalComponent,
  PaginationComponent,
  SelectComponent,
  SnackbarService,
  StatCardsComponent,
  type StatCard,
  TextFieldComponent,
  TONE,
  V2_PAGE_STYLES,
  type SelectOption,
} from "@shared/ui";

/** Valeur du filtre « techniciens sans GIE précis » (ils suivent toute la coopérative). */
const WHOLE_COOP = "__coop__";

/** Technicien tel qu'affiché dans le tableau. */
interface TechnicianRow {
  user: AppUser;
  initials: string;
  scoopNames: string[];
  scoopIds: string[];
  orgIds: string[];
  orgNames: string[];
  state: "active" | "invited" | "closed";
}

/**
 * Techniciens (charte V2) : le gestionnaire (ou l'admin) ajoute ses techniciens, corrige leurs coordonnées, choisit
 * les GIE qu'ils suivent (aucun GIE = toute la coopérative) et les retire. Droit `technician.invite`, dans le
 * périmètre de la session ; un technicien partagé avec une autre coopérative n'est jamais supprimé, seulement détaché.
 */
@Component({
  selector: "app-techniciens-page",
  imports: [
    AppShellComponent,
    CheckListComponent,
    IconComponent,
    ModalComponent,
    PaginationComponent,
    SelectComponent,
    StatCardsComponent,
    TechnicianCodeDialogComponent,
    TechnicianDialogComponent,
    TextFieldComponent,
  ],
  styles: [
    V2_PAGE_STYLES,
    `
      .facts {
        display: grid;
        gap: 14px 20px;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      }
      .facts .wide {
        grid-column: 1 / -1;
      }
      .facts dt {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--v2-gris-texte);
      }
      .facts dd {
        margin-top: 2px;
        font-size: 15px;
        font-weight: 700;
        word-break: break-word;
      }
    `,
  ],
  template: `
    <app-shell perm="technician.invite" [area]="t()('techniciens.area')">
      <header class="rise flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div class="min-w-0">
          <p class="mono" style="color: var(--v2-gris-texte)">{{ t()("techniciens.eyebrow") }}</p>
          <h1 class="mt-2 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]">{{ t()("techniciens.title") }}</h1>
          <p class="mt-2 max-w-2xl text-[16px] font-medium" style="color: var(--v2-gris-texte)">{{ t()("techniciens.description") }}</p>
        </div>
        <button type="button" class="btn btn-primary" (click)="addOpen.set(true)">
          {{ t()("techniciens.add") }}<span class="btn-chip"><ui-icon name="person_add" [size]="20" /></span>
        </button>
      </header>

      <ui-stat-cards class="rise mt-8" [stats]="stats()" />

      <div class="toolbar card mt-6">
        <label class="search">
          <ui-icon name="search" [size]="20" />
          <input type="search" [placeholder]="t()('techniciens.search.placeholder')" [attr.aria-label]="t()('techniciens.search.aria')" [value]="query()" (input)="query.set($any($event.target).value)" />
        </label>
        <div class="seg" role="radiogroup" [attr.aria-label]="t()('techniciens.col.state')">
          @for (option of stateFilters(); track option.id) {
            <button type="button" role="radio" [class.on]="stateFilter() === option.id" [attr.aria-checked]="stateFilter() === option.id" (click)="stateFilter.set(option.id)">
              {{ t()(option.label) }}<span class="n" [class.zero]="!option.count">{{ option.count }}</span>
            </button>
          }
        </div>
        @if (scoopFilterOptions().length > 2) {
          <ui-select class="min-w-[220px]" [label]="t()('techniciens.filter.scoop')" leadingIcon="apartment" [options]="scoopFilterOptions()" [value]="scoopFilter()" (valueChange)="scoopFilter.set($event)" />
        }
        @if (orgFilterOptions().length > 2) {
          <ui-select class="min-w-[220px]" [label]="t()('techniciens.filter.org')" leadingIcon="hub" [options]="orgFilterOptions()" [value]="orgFilter()" (valueChange)="orgFilter.set($event)" />
        }
      </div>

      <p class="sub mt-4" aria-live="polite">{{ t()("techniciens.count", { shown: shown().length, total: rows().length }) }}</p>

      <section class="card mt-3 overflow-hidden">
        @if (shown().length) {
          <div class="overflow-x-auto">
            <table class="tbl min-w-[900px]">
              <thead>
                <tr>
                  <th>{{ t()("techniciens.col.name") }}</th>
                  <th>{{ t()("techniciens.col.scoops") }}</th>
                  <th>{{ t()("techniciens.col.orgs") }}</th>
                  <th>{{ t()("techniciens.col.state") }}</th>
                  <th class="text-right">{{ t()("techniciens.col.actions") }}</th>
                </tr>
              </thead>
              <tbody>
                @for (row of pager.items(); track row.user.id) {
                  <tr class="row-link" (click)="viewing.set(row.user)">
                    <td>
                      <span class="flex items-center gap-3">
                        <span class="avatar" style="background: var(--v2-sauge); color: var(--v2-foret)">{{ row.initials }}</span>
                        <span class="min-w-0">
                          <span class="block truncate font-bold">{{ row.user.name }}</span>
                          <span class="sub block truncate">{{ store.phone(row.user.phone) }}{{ row.user.email ? " · " + row.user.email : "" }}</span>
                          @if (row.user.sex || row.user.age) {
                            <span class="sub block truncate">{{ row.user.sex === "F" ? t()("adherents.add.female") : row.user.sex === "H" ? t()("adherents.add.male") : "" }}{{ row.user.sex && row.user.age ? " · " : "" }}{{ row.user.age ? t()("tech.ageYears", { count: row.user.age }) : "" }}</span>
                          }
                        </span>
                      </span>
                    </td>
                    <td class="max-w-56 font-medium">{{ row.scoopNames.join(", ") }}</td>
                    <td class="max-w-64 font-medium" [class.zero]="!row.orgNames.length">{{ row.orgNames.length ? row.orgNames.join(", ") : t()("techniciens.orgs.all") }}</td>
                    <td>
                      <span class="badge" [style.background]="row.state === 'active' ? 'var(--v2-culture-bg)' : row.state === 'invited' ? 'var(--v2-attente-bg)' : 'var(--v2-lin)'" [style.color]="row.state === 'active' ? 'var(--v2-culture-fg)' : row.state === 'invited' ? 'var(--v2-attente-fg)' : 'var(--v2-gris-texte)'">
                        {{ t()(stateLabel[row.state]) }}
                      </span>
                    </td>
                    <td (click)="$event.stopPropagation()">
                      <span class="flex justify-end gap-2">
                        <button type="button" class="act" [title]="t()('common.view')" [attr.aria-label]="t()('techniciens.view.aria', { name: row.user.name })" (click)="viewing.set(row.user)"><ui-icon name="visibility" [size]="18" /></button>
                        <button type="button" class="act" [title]="t()('techniciens.newCode')" [attr.aria-label]="t()('techniciens.newCode.aria', { name: row.user.name })" (click)="askNewCode(row.user)"><ui-icon name="lock" [size]="18" /></button>
                        <button type="button" class="act" [title]="t()('techniciens.edit')" [attr.aria-label]="t()('techniciens.edit.aria', { name: row.user.name })" (click)="openEdit(row.user)"><ui-icon name="edit" [size]="18" /></button>
                        <button type="button" class="act act-danger" [title]="t()('techniciens.remove.confirm')" [attr.aria-label]="t()('techniciens.remove.aria', { name: row.user.name })" (click)="removing.set(row.user)"><ui-icon name="delete_forever" [size]="18" /></button>
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
            <span class="grid size-14 place-items-center rounded-[16px]" style="background: var(--v2-sauge); color: var(--v2-foret)"><ui-icon name="agriculture" [size]="26" /></span>
            <p class="text-[16px] font-extrabold">{{ t()("techniciens.empty.title") }}</p>
            <p class="sub max-w-md">{{ rows().length ? t()("techniciens.empty.filtered") : t()("techniciens.empty.none") }}</p>
          </div>
        }
      </section>

      <app-technician-dialog [(open)]="addOpen" [scoopId]="defaultScoopId()" />
      <app-technician-code-dialog [(view)]="codeView" />

      <!-- Fiche d'un technicien -->
      @if (viewedRow(); as view) {
        <ui-modal [open]="true" [title]="view.user.name" [description]="t()(stateLabel[view.state])" icon="person" [width]="640" [closeLabel]="t()('common.close')" (closed)="viewing.set(null)">
          <dl class="facts pb-6">
            <div><dt>{{ t()("tech.dialog.phone") }}</dt><dd>{{ view.user.phone ? store.phone(view.user.phone) : "—" }}</dd></div>
            <div><dt>{{ t()("tech.dialog.email") }}</dt><dd>{{ view.user.email || t()("techniciens.noEmail") }}</dd></div>
            <div><dt>{{ t()("adherents.add.sex") }}</dt><dd>{{ view.user.sex === "F" ? t()("adherents.add.female") : view.user.sex === "H" ? t()("adherents.add.male") : "—" }}</dd></div>
            <div><dt>{{ t()("adherents.add.age") }}</dt><dd>{{ view.user.age ? t()("tech.ageYears", { count: view.user.age }) : "—" }}</dd></div>
            <div class="wide"><dt>{{ t()("techniciens.col.scoops") }}</dt><dd>{{ view.scoopNames.join(", ") }}</dd></div>
            <div class="wide"><dt>{{ t()("techniciens.col.orgs") }}</dt><dd>{{ view.orgNames.length ? view.orgNames.join(", ") : t()("techniciens.orgs.all") }}</dd></div>
          </dl>
          <button modal-footer type="button" class="btn btn-ghost" (click)="viewing.set(null)">{{ t()("common.close") }}</button>
          <button modal-footer type="button" class="btn btn-ghost" (click)="askNewCode(view.user)">
            <ui-icon name="lock" [size]="18" />{{ t()("techniciens.newCode") }}
          </button>
          <button modal-footer type="button" class="btn btn-primary" (click)="openEdit(view.user)">
            {{ t()("techniciens.edit") }}<span class="btn-chip"><ui-icon name="edit" [size]="18" /></span>
          </button>
        </ui-modal>
      }

      <!-- Modifier : coordonnées et GIE suivis -->
      @if (editing(); as edited) {
        <ui-modal [open]="true" [title]="t()('techniciens.edit.title', { name: edited.name })" [description]="t()('techniciens.edit.description')" icon="edit" [width]="640" [closeLabel]="t()('common.close')" (closed)="editing.set(null)">
          <div class="space-y-5 pb-6">
            <ui-text-field [label]="t()('techniciens.edit.name')" [value]="editName()" [error]="editError()" (valueChange)="editName.set($event); editError.set('')" />
            <ui-text-field preset="phone" [label]="t()('tech.dialog.phone')" [value]="editPhone()" (valueChange)="editPhone.set($event)" />
            <ui-text-field preset="age" [label]="t()('adherents.add.age')" [hint]="t()('tech.dialog.ageHint')" [value]="editAge()" (valueChange)="editAge.set($event)" />
            <div>
              <p class="lbl">{{ t()("adherents.add.sex") }}</p>
              <div class="seg mt-2" role="radiogroup" [attr.aria-label]="t()('adherents.add.sex')">
                <button type="button" role="radio" [class.on]="editSex() === 'F'" [attr.aria-checked]="editSex() === 'F'" (click)="editSex.set('F')">{{ t()("adherents.add.female") }}</button>
                <button type="button" role="radio" [class.on]="editSex() === 'H'" [attr.aria-checked]="editSex() === 'H'" (click)="editSex.set('H')">{{ t()("adherents.add.male") }}</button>
              </div>
            </div>
            @if (editOrgOptions().length) {
              <ui-check-list [label]="t()('tech.dialog.section.orgs')" [options]="editOrgOptions()" [value]="editOrgIds()" (valueChange)="editOrgIds.set($event)" />
              <p class="text-[13px] font-medium" style="color: var(--v2-gris-texte)">{{ t()("tech.dialog.orgsHint") }}</p>
            }
          </div>
          <button modal-footer type="button" class="btn btn-ghost" (click)="editing.set(null)">{{ t()("common.cancel") }}</button>
          <button modal-footer type="button" class="btn btn-primary" (click)="saveEdit(edited)">
            {{ t()("techniciens.edit.save") }}<span class="btn-chip"><ui-icon name="check" [size]="18" /></span>
          </button>
        </ui-modal>
      }

      <!-- Nouveau code d'un technicien déjà actif : son mot de passe actuel ne marchera plus -->
      @if (renewing(); as renewed) {
        <ui-modal [open]="true" tone="danger" [title]="t()('techniciens.renew.title', { name: renewed.name })" [description]="t()('techniciens.renew.text', { name: renewed.name })" icon="lock" [width]="560" [closeLabel]="t()('common.close')" (closed)="renewing.set(null)">
          <button modal-footer type="button" class="btn btn-ghost" (click)="renewing.set(null)">{{ t()("common.cancel") }}</button>
          <button modal-footer type="button" class="btn btn-danger" (click)="newCode(renewed)">{{ t()("techniciens.renew.confirm") }}</button>
        </ui-modal>
      }

      <!-- Retirer -->
      @if (removing(); as removed) {
        <ui-modal [open]="true" tone="danger" [title]="t()('techniciens.remove.title', { name: removed.name })" [description]="t()(isOnlyHere(removed) ? 'techniciens.remove.textAlone' : 'techniciens.remove.textShared', { name: removed.name })" icon="delete_forever" [width]="540" [closeLabel]="t()('common.close')" (closed)="removing.set(null)">
          <button modal-footer type="button" class="btn btn-ghost" (click)="removing.set(null)">{{ t()("common.cancel") }}</button>
          <button modal-footer type="button" class="btn btn-danger" (click)="confirmRemove(removed)">{{ t()("techniciens.remove.confirm") }}</button>
        </ui-modal>
      }
    </app-shell>
  `,
})
export default class TechniciensPage {
  protected readonly store = inject(StoreService);
  private readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  private readonly snackbar = inject(SnackbarService);

  protected readonly stateLabel: Record<TechnicianRow["state"], MessageKey> = {
    active: "techniciens.state.active",
    invited: "techniciens.state.invited",
    closed: "techniciens.state.closed",
  };

  protected readonly query = signal("");
  protected readonly stateFilter = signal<"all" | TechnicianRow["state"]>("all");
  protected readonly scoopFilter = signal("all");
  protected readonly orgFilter = signal("all");
  protected readonly addOpen = signal(false);
  protected readonly viewing = signal<AppUser | null>(null);
  protected readonly renewing = signal<AppUser | null>(null);
  protected readonly codeView = signal<TechnicianCodeView | null>(null);
  protected readonly editing = signal<AppUser | null>(null);
  protected readonly removing = signal<AppUser | null>(null);
  protected readonly editName = signal("");
  protected readonly editPhone = signal("");
  protected readonly editAge = signal("");
  protected readonly editSex = signal<"F" | "H" | "">("");
  protected readonly editOrgIds = signal<string[]>([]);
  protected readonly editError = signal("");

  /** Coopératives visibles par la session : un gestionnaire n'en a qu'une, qu'on pré-coche à l'ajout. */
  private readonly visibleScoopIds = computed(() => {
    const state = this.store.state();
    return inScope(
      state.scoops.filter((scoop) => !scoop.archived).map((scoop) => ({ ...scoop, scoopId: scoop.id })),
      state.session,
    ).map((scoop) => scoop.id);
  });

  protected readonly defaultScoopId = computed(() =>
    this.visibleScoopIds().length === 1 ? this.visibleScoopIds()[0]! : null,
  );

  private scoopIdsOf(user: AppUser): string[] {
    return user.scoopIds ?? (user.scoopId ? [user.scoopId] : []);
  }

  protected readonly rows = computed<TechnicianRow[]>(() => {
    const state = this.store.state();
    const visible = new Set(this.visibleScoopIds());
    return state.users
      .filter((user) => user.role === "technicien" && this.scoopIdsOf(user).some((id) => visible.has(id)))
      .sort((first, second) => first.name.localeCompare(second.name))
      .map((user) => ({
        user,
        initials: user.name
          .split(" ")
          .map((word) => word[0] ?? "")
          .join("")
          .slice(0, 2)
          .toUpperCase(),
        scoopIds: this.scoopIdsOf(user).filter((id) => visible.has(id)),
        orgIds: (user.orgIds ?? []).filter((id) => {
          const org = state.orgs.find((candidate) => candidate.id === id);
          return !!org && visible.has(org.scoopId);
        }),
        scoopNames: this.scoopIdsOf(user)
          .filter((id) => visible.has(id))
          .map((id) => state.scoops.find((scoop) => scoop.id === id)?.name ?? id),
        orgNames: (user.orgIds ?? [])
          .map((id) => state.orgs.find((org) => org.id === id))
          .filter((org): org is NonNullable<typeof org> => !!org && visible.has(org.scoopId))
          .map((org) => org.name),
        state: user.activation ? "invited" : user.active ? "active" : "closed",
      }));
  });

  protected readonly shown = computed(() => {
    const needle = this.query().trim().toLowerCase();
    return this.rows().filter(
      (row) =>
        (this.stateFilter() === "all" || row.state === this.stateFilter()) &&
        (this.scoopFilter() === "all" || row.scoopIds.includes(this.scoopFilter())) &&
        (this.orgFilter() === "all" ||
          (this.orgFilter() === WHOLE_COOP ? !row.orgIds.length : row.orgIds.includes(this.orgFilter()))) &&
        (!needle ||
          [row.user.name, row.user.email, row.user.phone, ...row.scoopNames, ...row.orgNames].some((text) =>
            text.toLowerCase().includes(needle),
          )),
    );
  });

  /** Filtres d'accès, avec le nombre de techniciens de chacun. */
  protected readonly stateFilters = computed(() => {
    const rows = this.rows();
    const count = (state: TechnicianRow["state"]) => rows.filter((row) => row.state === state).length;
    return [
      { id: "all" as const, label: "techniciens.filter.all" as const, count: rows.length },
      { id: "active" as const, label: "techniciens.state.active" as const, count: count("active") },
      { id: "invited" as const, label: "techniciens.state.invited" as const, count: count("invited") },
      { id: "closed" as const, label: "techniciens.state.closed" as const, count: count("closed") },
    ];
  });

  /** Coopératives suivies par au moins un technicien visible (utile surtout à l'administration et à la faîtière). */
  protected readonly scoopFilterOptions = computed<SelectOption[]>(() => {
    const rows = this.rows();
    const state = this.store.state();
    const ids = [...new Set(rows.flatMap((row) => row.scoopIds))];
    return [
      { value: "all", label: this.t()("techniciens.filter.allScoops"), hint: nf.format(rows.length) },
      ...ids
        .map((id) => ({
          value: id,
          label: state.scoops.find((scoop) => scoop.id === id)?.name ?? id,
          hint: nf.format(rows.filter((row) => row.scoopIds.includes(id)).length),
        }))
        .sort((first, second) => first.label.localeCompare(second.label)),
    ];
  });

  /** GIE réellement suivis, plus « toute la coopérative » (techniciens sans GIE précis). */
  protected readonly orgFilterOptions = computed<SelectOption[]>(() => {
    const rows = this.rows();
    const state = this.store.state();
    const ids = [...new Set(rows.flatMap((row) => row.orgIds))];
    return [
      { value: "all", label: this.t()("techniciens.filter.allOrgs"), hint: nf.format(rows.length) },
      { value: WHOLE_COOP, label: this.t()("techniciens.orgs.all"), hint: nf.format(rows.filter((row) => !row.orgIds.length).length) },
      ...ids
        .map((id) => ({
          value: id,
          label: state.orgs.find((org) => org.id === id)?.name ?? id,
          hint: nf.format(rows.filter((row) => row.orgIds.includes(id)).length),
        }))
        .sort((first, second) => first.label.localeCompare(second.label)),
    ];
  });

  protected readonly stats = computed<StatCard[]>(() => {
    const t = this.t();
    const rows = this.rows();
    const count = (state: TechnicianRow["state"]) => rows.filter((row) => row.state === state).length;
    const scoops = new Set(rows.flatMap((row) => row.scoopIds)).size;
    const women = rows.filter((row) => row.user.sex === "F").length;
    return [
      { label: t("techniciens.stat.total"), value: nf.format(rows.length), sub: t("techniciens.stat.totalSub", { scoops: nf.format(scoops) }), icon: "badge", bg: "", fg: "" },
      { label: t("techniciens.stat.active"), value: nf.format(count("active")), sub: t("techniciens.stat.activeSub"), icon: "how_to_reg", ...TONE.succes },
      { label: t("techniciens.stat.invited"), value: nf.format(count("invited")), sub: t("techniciens.stat.invitedSub"), icon: "lock", ...TONE.info },
      { label: t("techniciens.stat.closed"), value: nf.format(count("closed")), sub: t("techniciens.stat.closedSub", { women: nf.format(women) }), icon: "block", ...TONE.attente },
    ];
  });

  protected readonly pager = createPager(() => this.shown());

  /** GIE proposés à la modification : ceux des coopératives du technicien que la session voit. */
  protected readonly editOrgOptions = computed<SelectOption[]>(() => {
    const user = this.editing();
    if (!user) return [];
    const state = this.store.state();
    const visible = new Set(this.visibleScoopIds());
    const scoops = this.scoopIdsOf(user).filter((id) => visible.has(id));
    return state.orgs
      .filter((org) => scoops.includes(org.scoopId))
      .sort((first, second) => first.name.localeCompare(second.name))
      .map((org) => ({
        value: org.id,
        label: org.name,
        ...(scoops.length > 1 ? { hint: state.scoops.find((scoop) => scoop.id === org.scoopId)?.name ?? "" } : {}),
      }));
  });

  /** Perdu ou expiré : on génère un nouveau code (l'ancien cesse de marcher) et on l'affiche une fois. */
  /** Un technicien actif perd son mot de passe : on demande confirmation avant de générer. */
  protected askNewCode(user: AppUser): void {
    this.viewing.set(null);
    if (user.active) this.renewing.set(user);
    else this.newCode(user);
  }

  protected newCode(user: AppUser): void {
    this.viewing.set(null);
    this.renewing.set(null);
    const result = this.store.actions.regenerateTechnicianCode(user.id);
    if (!result.ok) {
      this.snackbar.error(result.error);
      return;
    }
    this.codeView.set({ userId: user.id, name: user.name, code: result.code, expiresAt: result.expiresAt, email: user.email });
  }

  /** Ligne du technicien affiché (toujours à jour après une modification). */
  protected readonly viewedRow = computed(() => {
    const person = this.viewing();
    return person ? (this.rows().find((row) => row.user.id === person.id) ?? null) : null;
  });

  protected openEdit(user: AppUser): void {
    this.viewing.set(null);
    this.editName.set(user.name);
    this.editPhone.set(user.phone);
    this.editAge.set(user.age ? String(user.age) : "");
    this.editSex.set(user.sex ?? "");
    this.editOrgIds.set([...(user.orgIds ?? [])]);
    this.editError.set("");
    this.editing.set(user);
  }

  protected saveEdit(user: AppUser): void {
    if (!this.editSex()) {
      this.snackbar.error(this.locale.tNow("errors.technician.sex"));
      return;
    }
    const result = this.store.actions.updateTechnician(user.id, {
      name: this.editName(),
      phone: this.editPhone(),
      sex: (this.editSex() || "F") as "F" | "H",
      age: Number(this.editAge().trim()),
      orgIds: this.editOrgIds(),
    });
    if (!result.ok) {
      if (result.error === this.locale.tNow("errors.technician.name")) this.editError.set(result.error);
      else this.snackbar.error(result.error);
      return;
    }
    this.editing.set(null);
    this.snackbar.success(this.t()("techniciens.edit.saved", { name: this.editName().trim() }));
  }

  /** Coopérative dont on retire le technicien : celle de la session (la seule d'un gestionnaire). */
  private scoopToLeave(user: AppUser): string | null {
    const visible = new Set(this.visibleScoopIds());
    return this.scoopIdsOf(user).find((id) => visible.has(id)) ?? null;
  }

  protected isOnlyHere(user: AppUser): boolean {
    return this.scoopIdsOf(user).length <= 1;
  }

  protected confirmRemove(user: AppUser): void {
    const scoopId = this.scoopToLeave(user);
    if (!scoopId) return;
    const result = this.store.actions.removeTechnicianFromScoop(user.id, scoopId);
    this.removing.set(null);
    if (!result.ok) {
      this.snackbar.error(this.locale.tNow(result.error as MessageKey));
      return;
    }
    this.snackbar.success(this.t()("techniciens.removed", { name: user.name }));
  }
}
