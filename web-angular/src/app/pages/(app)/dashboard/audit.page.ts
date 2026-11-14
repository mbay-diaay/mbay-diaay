import { Component, computed, inject, signal } from "@angular/core";

import { scopedAudit } from "@/lib/scope";
import { downloadCsv, fmtDateTime, nf } from "@/lib/format";
import type { MessageKey } from "@/lib/i18n";
import { actions, type AuditEntry } from "@/lib/store";
import { AppShellComponent } from "@shared/app-shell.component";
import { LocaleService } from "@shared/locale.service";
import { StoreService } from "@shared/store.service";
import { createPager } from "@shared/pager";
import {
  detailFact,
  DetailModalComponent,
  IconComponent,
  initialsOf,
  PaginationComponent,
  SelectComponent,
  SnackbarService,
  StatCardsComponent,
  TextFieldComponent,
  TONE,
  V2_PAGE_STYLES,
  type DetailView,
  type IconName,
  type SelectOption,
  type StatCard,
} from "@shared/ui";

/** Actions à surveiller : données personnelles, exports, sauvegardes, fusions et accès coupés. */
const SENSITIVE =
  /Révélation|Export|Sauvegarde|Restauration|Téléchargement|Fusion|Révocation|Déconnexion forcée/i;

type Family = "sensibles" | "qualite" | "donnees" | "admin" | "connexions";
/** Familles d'actions, pour filtrer d'un clic sans connaître les intitulés exacts (mêmes règles que l'archive React). */
const FAMILIES: {
  key: Family;
  label: MessageKey;
  hint: MessageKey;
  test: RegExp;
  icon: IconName;
  bg: string;
  fg: string;
}[] = [
  {
    key: "sensibles",
    label: "audit.family.sensibles",
    hint: "audit.family.sensibles.hint",
    test: SENSITIVE,
    icon: "warning",
    ...TONE.erreur,
  },
  {
    key: "qualite",
    label: "audit.family.qualite",
    hint: "audit.family.qualite.hint",
    test: /doublon|fusion|alerte|correction|parcelle|reprise|classement|approbation|refus/i,
    icon: "fact_check",
    ...TONE.attente,
  },
  {
    key: "donnees",
    label: "audit.family.donnees",
    hint: "audit.family.donnees.hint",
    test: /Import|Modification|Qualification|Référentiel/i,
    icon: "dataset",
    ...TONE.info,
  },
  {
    key: "admin",
    label: "audit.family.admin",
    hint: "audit.family.admin.hint",
    test: /utilisateur|appareil|liaison|compte|Réactivation|Désactivation|Déconnexion forcée|Révocation|Renommage|Resynchronisation|correspondance/i,
    icon: "manage_accounts",
    ...TONE.culture,
  },
  {
    key: "connexions",
    label: "audit.family.connexions",
    hint: "audit.family.connexions.hint",
    test: /Connexion/i,
    icon: "logout",
    ...TONE.neutre,
  },
];
const familyOf = (a: AuditEntry) => FAMILIES.find((f) => f.test.test(a.action)) ?? FAMILIES[2]!;
const ALL = "__all";
const norm = (v: string) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/**
 * Journal d'audit (charte V2) : statistiques, familles d'actions à compteurs, filtres utilisateur et période,
 * tri, tableau paginé (actions sensibles repérées), détail en modale avec les entrées liées, export CSV tracé.
 */
@Component({
  selector: "app-audit-page",
  imports: [
    AppShellComponent,
    DetailModalComponent,
    IconComponent,
    PaginationComponent,
    SelectComponent,
    StatCardsComponent,
    TextFieldComponent,
  ],
  styles: [
    V2_PAGE_STYLES,
    `
      .filters {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 8px;
        align-items: end;
      }
      .fam {
        display: grid;
        height: 32px;
        width: 32px;
        flex-shrink: 0;
        place-items: center;
        border-radius: 10px;
      }
      tr.sensitive td:first-child {
        box-shadow: inset 3px 0 0 var(--v2-erreur-fg);
      }
    `,
  ],
  template: `
    <app-shell [perm]="perms" [area]="t()('audit.area')">
      <header class="rise flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div class="min-w-0">
          <p class="mono" style="color: var(--v2-gris-texte)">{{ t()("audit.eyebrow") }}</p>
          <h1
            class="mt-2 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]"
          >
            {{ t()("audit.title") }}
          </h1>
          <p class="mt-2 max-w-2xl text-[16px] font-medium" style="color: var(--v2-gris-texte)">
            {{ description() }}
          </p>
        </div>
        <button
          type="button"
          class="btn btn-ghost"
          [disabled]="!shown().length"
          (click)="exportCsv()"
        >
          <ui-icon name="download" [size]="20" />{{ t()("audit.export") }}
        </button>
      </header>

      <ui-stat-cards class="rise mt-8" [stats]="stats()" />

      <div class="card mt-6 p-2">
        <div class="toolbar p-0">
          <label class="search">
            <ui-icon name="search" [size]="20" />
            <input
              type="search"
              [placeholder]="t()('audit.search.placeholder')"
              [attr.aria-label]="t()('audit.search.aria')"
              [value]="q()"
              (input)="q.set($any($event.target).value)"
            />
          </label>
          <div class="seg" role="radiogroup" [attr.aria-label]="t()('audit.col.action')">
            <button
              type="button"
              role="radio"
              [class.on]="family() === all"
              [attr.aria-checked]="family() === all"
              (click)="family.set(all)"
            >
              {{ t()("audit.family.all") }}<span class="n">{{ nf.format(base().length) }}</span>
            </button>
            @for (familyDef of families; track familyDef.key) {
              <button
                type="button"
                role="radio"
                [class.on]="family() === familyDef.key"
                [attr.aria-checked]="family() === familyDef.key"
                [title]="t()(familyDef.hint)"
                (click)="family.set(familyDef.key)"
              >
                {{ t()(familyDef.label)
                }}<span class="n" [class.zero]="!familyCount(familyDef.key)">{{
                  nf.format(familyCount(familyDef.key))
                }}</span>
              </button>
            }
          </div>
        </div>
        <div class="filters mt-2">
          <ui-select
            variant="compact"
            leadingIcon="person"
            [label]="t()('audit.filter.user')"
            [options]="userOptions()"
            [value]="user()"
            (valueChange)="user.set($event)"
          />
          <ui-text-field
            type="date"
            icon="calendar_today"
            [label]="t()('audit.filter.from')"
            [value]="from()"
            (valueChange)="from.set($event)"
          />
          <ui-text-field
            type="date"
            icon="calendar_today"
            [label]="t()('audit.filter.to')"
            [value]="to()"
            (valueChange)="to.set($event)"
          />
          <button
            type="button"
            class="btn btn-ghost"
            style="height: 52px"
            [attr.aria-label]="t()('audit.sort.toggle')"
            (click)="desc.set(!desc())"
          >
            <ui-icon name="event_note" [size]="18" />{{
              desc() ? t()("audit.sort.desc") : t()("audit.sort.asc")
            }}
          </button>
        </div>
      </div>

      <div class="mt-4 flex flex-wrap items-center gap-2">
        <p class="sub" aria-live="polite">
          <b class="tabular-nums" style="color: var(--v2-encre)">{{ nf.format(shown().length) }}</b>
          {{ t()(shown().length > 1 ? "audit.count.autre" : "audit.count.un") }}
        </p>
        @if (filtered()) {
          <button type="button" class="reveal" (click)="reset()">
            <ui-icon name="close" [size]="14" />{{ t()("audit.reset") }}
          </button>
        }
      </div>

      <section class="card mt-3 overflow-hidden">
        @if (shown().length) {
          <div class="overflow-x-auto">
            <table class="tbl min-w-[900px]">
              <thead>
                <tr>
                  <th>{{ t()("audit.col.date") }}</th>
                  <th>{{ t()("audit.col.action") }}</th>
                  <th>{{ t()("audit.col.user") }}</th>
                  <th>{{ t()("audit.col.entity") }}</th>
                  <th>{{ t()("audit.col.detail") }}</th>
                  <th class="text-right">{{ t()("organisations.col.actions") }}</th>
                </tr>
              </thead>
              <tbody>
                @for (entry of pager.items(); track entry.id) {
                  @let entryFamily = fam(entry);
                  <tr
                    class="row-link"
                    [class.sensitive]="isSensitive(entry)"
                    (click)="detailId.set(entry.id)"
                  >
                    <td class="whitespace-nowrap font-medium tabular-nums">
                      {{ fmtDateTime(entry.at) }}
                    </td>
                    <td>
                      <span class="flex items-center gap-2.5">
                        <span
                          class="fam"
                          [style.background]="entryFamily.bg"
                          [style.color]="entryFamily.fg"
                          ><ui-icon [name]="entryFamily.icon" [size]="16"
                        /></span>
                        <span class="font-bold">{{ entry.action }}</span>
                        @if (isSensitive(entry)) {
                          <span
                            class="badge"
                            style="background: var(--v2-erreur-bg); color: var(--v2-erreur-fg)"
                            [attr.aria-label]="t()('audit.sensitiveAria')"
                            >{{ t()("audit.sheet.sensitive") }}</span
                          >
                        }
                      </span>
                    </td>
                    <td>
                      <span class="flex items-center gap-2"
                        ><span class="avatar" style="height: 28px; width: 28px; font-size: 10px">{{
                          initials(entry.user)
                        }}</span
                        ><span class="font-medium">{{ entry.user }}</span></span
                      >
                    </td>
                    <td class="max-w-56 truncate font-medium" [title]="entry.entity">
                      {{ entry.entity }}
                    </td>
                    <td
                      class="max-w-64 truncate"
                      style="color: var(--v2-gris-texte)"
                      [title]="entry.detail"
                    >
                      {{ entry.detail || "—" }}
                    </td>
                    <td>
                      <span class="flex justify-end">
                        <button
                          type="button"
                          class="act"
                          [title]="t()('common.view')"
                          [attr.aria-label]="t()('common.viewDetail')"
                          (click)="$event.stopPropagation(); detailId.set(entry.id)"
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
              ><ui-icon name="search" [size]="26"
            /></span>
            <p class="text-[16px] font-extrabold">{{ t()("audit.empty.title") }}</p>
            <p class="sub max-w-md">{{ t()("audit.empty.text") }}</p>
          </div>
        }
      </section>

      <ui-detail-modal [view]="detail()" (closed)="detailId.set(null)" />
    </app-shell>
  `,
})
export default class AuditPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  private readonly snackbar = inject(SnackbarService);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly fmtDateTime = fmtDateTime;
  protected readonly initials = initialsOf;
  protected readonly families = FAMILIES;
  protected readonly all = ALL;
  protected readonly perms = ["audit.read", "audit.read.scoop"] as const;

  protected readonly q = signal("");
  protected readonly family = signal<Family | typeof ALL>(ALL);
  protected readonly user = signal(ALL);
  protected readonly from = signal("");
  protected readonly to = signal("");
  protected readonly desc = signal(true);
  protected readonly detailId = signal<string | null>(null);

  protected readonly description = computed(() =>
    this.t()(
      this.store.state().session?.permissions.includes("audit.read")
        ? "audit.description.platform"
        : "audit.description.scoop",
    ),
  );

  protected readonly rows = computed(() =>
    scopedAudit(this.store.state().audit, this.store.state().session),
  );

  /** Tous les filtres sauf la famille (pour les compteurs). */
  protected readonly base = computed(() => {
    const needle = norm(this.q().trim());
    const user = this.user();
    const from = this.from();
    const to = this.to();
    return this.rows().filter(
      (a) =>
        (user === ALL || a.user === user) &&
        (!from || a.at.slice(0, 10) >= from) &&
        (!to || a.at.slice(0, 10) <= to) &&
        (!needle || norm(`${a.action} ${a.user} ${a.entity} ${a.detail}`).includes(needle)),
    );
  });

  protected readonly shown = computed(() => {
    const fam = this.family();
    const dir = this.desc() ? -1 : 1;
    return this.base()
      .filter((a) => fam === ALL || familyOf(a).key === fam)
      .sort((a, b) => dir * a.at.localeCompare(b.at));
  });

  /** Pagination : mêmes règles que l'API (`GET /v1/audit?page=&limit=`). */
  protected readonly pager = createPager(() => this.shown());

  protected readonly filtered = computed(
    () =>
      !!this.q().trim() ||
      this.family() !== ALL ||
      this.user() !== ALL ||
      !!this.from() ||
      !!this.to(),
  );

  protected readonly userOptions = computed<SelectOption[]>(() => [
    { value: ALL, label: this.t()("audit.family.all") },
    ...[...new Set(this.rows().map((a) => a.user))]
      .sort((a, b) => a.localeCompare(b))
      .map((u) => ({ value: u, label: u })),
  ]);

  protected readonly stats = computed<StatCard[]>(() => {
    const t = this.t();
    const all = this.rows();
    const shown = this.shown();
    const last = [...all].sort((a, b) => b.at.localeCompare(a.at))[0];
    return [
      {
        label: t("audit.kpi.entries"),
        value: nf.format(shown.length),
        sub: t("audit.kpi.entriesOf", { total: nf.format(all.length) }),
        icon: "receipt_long",
        bg: "",
        fg: "",
      },
      {
        label: t("audit.kpi.users"),
        value: nf.format(new Set(shown.map((a) => a.user)).size),
        sub: t("audit.kpi.usersSub"),
        icon: "group",
        ...TONE.info,
      },
      {
        label: t("audit.kpi.sensitive"),
        value: nf.format(shown.filter((a) => SENSITIVE.test(a.action)).length),
        sub: t("audit.kpi.sensitiveSub"),
        icon: "warning",
        ...TONE.erreur,
      },
      {
        label: t("audit.kpi.last"),
        value: last ? fmtDateTime(last.at).split(",")[0]! : "—",
        sub: last ? `${last.action} · ${last.user}` : t("audit.kpi.none"),
        icon: "event_note",
        ...TONE.succes,
      },
    ];
  });

  protected familyCount(key: Family): number {
    return this.base().filter((a) => familyOf(a).key === key).length;
  }

  protected fam(a: AuditEntry) {
    return familyOf(a);
  }

  protected isSensitive(a: AuditEntry): boolean {
    return SENSITIVE.test(a.action);
  }

  protected reset(): void {
    this.q.set("");
    this.family.set(ALL);
    this.user.set(ALL);
    this.from.set("");
    this.to.set("");
  }

  protected readonly detail = computed<DetailView | null>(() => {
    const id = this.detailId();
    const a = id ? this.rows().find((x) => x.id === id) : null;
    if (!a) return null;
    const t = this.t();
    const f = familyOf(a);
    const related = this.rows()
      .filter((x) => x.id !== a.id && x.entity === a.entity)
      .sort((x, y) => y.at.localeCompare(x.at));
    return {
      title: a.action,
      subtitle: t("audit.sheet.sentence", {
        user: a.user,
        action: a.action,
        entity: a.entity,
        date: fmtDateTime(a.at),
      }),
      icon: f.icon,
      badges: [
        { label: t(f.label), bg: f.bg, fg: f.fg },
        ...(this.isSensitive(a) ? [{ label: t("audit.sheet.sensitive"), ...TONE.erreur }] : []),
      ],
      kpis: [],
      facts: [
        detailFact(t("audit.sheet.when"), fmtDateTime(a.at), "calendar_today"),
        detailFact(t("audit.sheet.who"), a.user, "person"),
        detailFact(t("audit.sheet.object"), a.entity, "description", { wide: true }),
        detailFact(t("audit.sheet.what"), a.detail || null, "fact_check", { wide: true }),
      ],
      sections: [
        {
          title: t("audit.sheet.related"),
          icon: "event_note",
          count: related.length,
          empty: t("audit.sheet.noRelated"),
          items: related
            .slice(0, 8)
            .map((x) => ({
              label: x.action,
              sub: `${fmtDateTime(x.at)} · ${x.user}`,
              initials: initialsOf(x.user),
            })),
          more: Math.max(0, related.length - 8),
        },
      ],
      link: null,
    };
  });

  protected exportCsv(): void {
    const rows = this.shown();
    try {
      downloadCsv(`journal_audit_${new Date().toISOString().slice(0, 10)}.csv`, [
        ["Date", "Utilisateur", "Action", "Entité", "Détail"],
        ...rows.map((a) => [a.at, a.user, a.action, a.entity, a.detail]),
      ]);
    } catch {
      this.snackbar.error(this.t()("common.exportError"));
      return;
    }
    actions.audit("Export", "Journal d'audit", `${rows.length} entrées (CSV)`);
    this.snackbar.success(
      `${this.t()("audit.exported")} · ${this.t()(rows.length > 1 ? "audit.exportedCount.autre" : "audit.exportedCount.un", { count: nf.format(rows.length) })}`,
    );
  }
}
