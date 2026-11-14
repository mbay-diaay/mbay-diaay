import { Component, computed, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map } from "rxjs";

import { memberDues } from "@/lib/contributions";
import { ageAtMost, fmtDate, fmtDateTime, nf } from "@/lib/format";
import type { MessageKey } from "@/lib/i18n";
import { accountOf, managerOf, type AccountState } from "@/lib/scoop-account";
import { AppShellComponent } from "@shared/app-shell.component";
import { LocaleService } from "@shared/locale.service";
import { StoreService } from "@shared/store.service";
import { createPager } from "@shared/pager";
import {
  DetailModalComponent,
  IconComponent,
  PaginationComponent,
  SnackbarService,
  type Badge,
  type DetailView,
  type IconName,
  type Tone,
} from "@shared/ui";
import { TechnicianDialogComponent } from "@shared/technician-dialog.component";

type Tab = "apercu" | "gie" | "membres" | "techniciens" | "reunions" | "cotisations";

const ACCOUNT: Record<AccountState, { label: MessageKey; bg: string; fg: string }> = {
  active: {
    label: "cooperatives.badge.active",
    bg: "var(--v2-sauge)",
    fg: "var(--v2-vert-pousse)",
  },
  invited: {
    label: "cooperatives.badge.invited",
    bg: "var(--v2-info-bg)",
    fg: "var(--v2-info-fg)",
  },
  expired: {
    label: "cooperatives.badge.expired",
    bg: "var(--v2-attente-bg)",
    fg: "var(--v2-attente-fg)",
  },
  closed: { label: "cooperatives.badge.closed", bg: "var(--v2-lin)", fg: "var(--v2-gris-texte)" },
  none: { label: "cooperatives.account.none", bg: "var(--v2-lin)", fg: "var(--v2-gris-texte)" },
};

const MEMBER_STATUS: Record<string, { label: MessageKey; bg: string; fg: string }> = {
  membre: {
    label: "cooperatives.fiche.status.membre",
    bg: "var(--v2-sauge)",
    fg: "var(--v2-vert-pousse)",
  },
  candidat: {
    label: "cooperatives.fiche.status.candidat",
    bg: "var(--v2-info-bg)",
    fg: "var(--v2-info-fg)",
  },
  suspendu: {
    label: "cooperatives.fiche.status.suspendu",
    bg: "var(--v2-attente-bg)",
    fg: "var(--v2-attente-fg)",
  },
  sorti: {
    label: "cooperatives.fiche.status.sorti",
    bg: "var(--v2-lin)",
    fg: "var(--v2-gris-texte)",
  },
};

const MEETING_STATUS: Record<string, { label: MessageKey; bg: string; fg: string }> = {
  planifiée: {
    label: "cooperatives.fiche.meeting.planned",
    bg: "var(--v2-info-bg)",
    fg: "var(--v2-info-fg)",
  },
  tenue: {
    label: "cooperatives.fiche.meeting.held",
    bg: "var(--v2-sauge)",
    fg: "var(--v2-vert-pousse)",
  },
  annulée: {
    label: "cooperatives.fiche.meeting.cancelled",
    bg: "var(--v2-lin)",
    fg: "var(--v2-gris-texte)",
  },
};

const DUE: Record<string, { bg: string; fg: string }> = {
  "à jour": { bg: "var(--v2-sauge)", fg: "var(--v2-vert-pousse)" },
  "en retard": { bg: "var(--v2-erreur-bg)", fg: "var(--v2-erreur-fg)" },
  "jamais payé": { bg: "var(--v2-attente-bg)", fg: "var(--v2-attente-fg)" },
};

/** Lignes d'aperçu dans une fenêtre de détail (adhérents d'une organisation, historique). */
const DETAIL_ROWS = 8;

type DetailKind = "org" | "member" | "tech" | "meeting";
const norm = (v: string) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/**
 * Fiche coopérative (charte V2) : en-tête forêt (identité, gestionnaire), puis six onglets
 * — Aperçu, GIE, Adhérents, Techniciens, Réunions, Cotisations — sur les données réelles du store.
 *
 * Animations (toutes coupées si « réduire les animations ») : apparition de l'en-tête et de chaque
 * onglet, cartes de statistiques qui se soulèvent (filigrane qui pivote), barres qui se remplissent,
 * survols doux sur les lignes et les liens.
 */
@Component({
  selector: "app-cooperative-detail-page",
  imports: [
    RouterLink,
    AppShellComponent,
    IconComponent,
    DetailModalComponent,
    PaginationComponent,
    TechnicianDialogComponent,
  ],
  styles: `
    .mono {
      font-family: var(--v2-font-mono);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .card {
      border-radius: 24px;
      border: 1px solid var(--v2-bord-carte);
      background: var(--v2-blanc);
    }
    .sub {
      font-size: 13px;
      font-weight: 500;
      color: var(--v2-gris-texte);
    }
    .h2 {
      font-size: 18px;
      font-weight: 800;
      letter-spacing: -0.02em;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      border-radius: 999px;
      padding: 3px 10px 3px 8px;
      font-size: 12px;
      font-weight: 800;
      white-space: nowrap;
    }

    /* ── Animations ── */
    @keyframes rise {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes grow {
      from {
        transform: scaleX(0);
      }
      to {
        transform: scaleX(1);
      }
    }
    @keyframes ring-in {
      from {
        opacity: 0;
        transform: rotate(-90deg) scale(0.9);
      }
      to {
        opacity: 1;
        transform: rotate(0) scale(1);
      }
    }
    .rise {
      animation: rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;
    }
    .panel > * {
      animation: rise 0.4s cubic-bezier(0.32, 0.72, 0, 1) both;
    }
    .panel > *:nth-child(2) {
      animation-delay: 0.05s;
    }
    .panel > *:nth-child(3) {
      animation-delay: 0.1s;
    }
    .panel > *:nth-child(4) {
      animation-delay: 0.15s;
    }
    .ring {
      animation: ring-in 0.7s cubic-bezier(0.32, 0.72, 0, 1) both;
    }

    .hero {
      position: relative;
      overflow: hidden;
      border-radius: 28px;
      background: var(--v2-foret);
      color: var(--v2-blanc);
    }
    .hero-mono {
      display: grid;
      height: 76px;
      width: 76px;
      flex-shrink: 0;
      place-items: center;
      border-radius: 22px;
      background: var(--v2-citron);
      color: var(--v2-foret);
      font-family: var(--v2-font-mono);
      font-size: 20px;
      font-weight: 700;
      transition: transform 0.3s ease;
    }
    .hero:hover .hero-mono {
      transform: rotate(-4deg) scale(1.04);
    }
    .crumb a {
      color: color-mix(in oklab, var(--v2-blanc) 70%, transparent);
      cursor: pointer;
      transition: color 0.15s ease;
    }
    .crumb a:hover {
      color: var(--v2-citron);
    }
    .ghost-dark {
      display: inline-flex;
      height: 44px;
      align-items: center;
      gap: 8px;
      border-radius: 14px;
      border: 1.5px solid color-mix(in oklab, var(--v2-blanc) 25%, transparent);
      padding: 0 14px;
      font-size: 14px;
      font-weight: 800;
      color: var(--v2-blanc);
      cursor: pointer;
      transition:
        background-color 0.15s ease,
        border-color 0.15s ease;
    }
    .ghost-dark:hover {
      border-color: var(--v2-citron);
      background: color-mix(in oklab, var(--v2-blanc) 10%, transparent);
    }

    .tabs {
      display: flex;
      gap: 4px;
      overflow-x: auto;
      scrollbar-width: none;
      border-radius: 18px;
      border: 1px solid var(--v2-bord-carte);
      background: var(--v2-blanc);
      padding: 6px;
    }
    .tabs::-webkit-scrollbar {
      display: none;
    }
    .tab {
      display: inline-flex;
      flex: 1 0 auto;
      justify-content: center;
      align-items: center;
      gap: 7px;
      white-space: nowrap;
      border-radius: 12px;
      padding: 10px 11px;
      font-size: 14px;
      font-weight: 700;
      color: var(--v2-gris-texte);
      cursor: pointer;
      transition:
        background-color 0.2s ease,
        color 0.2s ease;
    }
    .tab:hover {
      color: var(--v2-encre);
      background: var(--v2-creme);
    }
    .tab.on {
      background: var(--v2-foret);
      color: var(--v2-blanc);
    }
    .tab .n {
      border-radius: 999px;
      padding: 0 7px;
      font-size: 12px;
      font-variant-numeric: tabular-nums;
      background: var(--v2-creme);
      color: var(--v2-ardoise);
      transition:
        background-color 0.2s ease,
        color 0.2s ease;
    }
    .tab.on .n {
      background: var(--v2-citron);
      color: var(--v2-foret);
    }

    .stat {
      position: relative;
      overflow: hidden;
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
    }
    .stat:hover {
      transform: translateY(-3px);
      box-shadow: var(--v2-ombre-flottant);
    }
    .watermark {
      pointer-events: none;
      position: absolute;
      right: -18px;
      bottom: -26px;
      opacity: 0.12;
      transform: rotate(-12deg);
      transition:
        transform 0.35s ease,
        opacity 0.35s ease;
    }
    .stat:hover .watermark {
      transform: rotate(-4deg) scale(1.08);
      opacity: 0.18;
    }
    .lift {
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        border-color 0.2s ease;
    }
    .lift:hover {
      transform: translateY(-2px);
      border-color: var(--v2-gris-trait);
      box-shadow: var(--v2-ombre-flottant);
    }

    .search {
      display: flex;
      height: 48px;
      align-items: center;
      gap: 10px;
      border-radius: 14px;
      background: var(--v2-creme);
      padding: 0 14px;
      color: var(--v2-gris-texte);
      transition: box-shadow 0.15s ease;
    }
    .search:focus-within {
      box-shadow: inset 0 0 0 2px var(--v2-foret);
    }
    .search input {
      min-width: 0;
      flex: 1;
      background: transparent;
      font-size: 15px;
      font-weight: 600;
      color: var(--v2-encre);
      outline: none;
    }
    .row {
      border-top: 1px solid var(--v2-separateur);
    }
    .row-link {
      cursor: pointer;
      transition: background-color 0.15s ease;
    }
    .row-link:hover {
      background: var(--v2-creme);
    }
    .row-link .go {
      color: var(--v2-gris-trait);
      transition:
        transform 0.2s ease,
        color 0.2s ease;
    }
    .row-link:hover .go {
      transform: translateX(3px);
      color: var(--v2-foret);
    }
    .link {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 14px;
      font-weight: 700;
      color: var(--v2-foret-clair);
      cursor: pointer;
    }
    .link:hover {
      text-decoration: underline;
    }
    .bar {
      height: 8px;
      overflow: hidden;
      border-radius: 999px;
      background: var(--v2-lin);
    }
    .bar > span {
      display: block;
      height: 100%;
      border-radius: 999px;
      transform-origin: left;
      animation: grow 0.8s cubic-bezier(0.32, 0.72, 0, 1) both;
    }
    .zero {
      color: var(--v2-gris-trait) !important;
    }
    /* Action « Voir » des lignes : signale qu'un détail s'ouvre. */
    .act {
      display: grid;
      height: 34px;
      width: 34px;
      place-items: center;
      border-radius: 12px;
      border: 1px solid var(--v2-bord-carte);
      background: var(--v2-blanc);
      color: var(--v2-ardoise);
      cursor: pointer;
      transition:
        background-color 0.15s ease,
        color 0.15s ease,
        border-color 0.15s ease;
    }
    .act:hover,
    .row-link:hover .act {
      border-color: var(--v2-foret);
      background: var(--v2-foret);
      color: var(--v2-citron);
    }
    .act:focus-visible {
      outline: 2px solid var(--v2-foret);
      outline-offset: 2px;
    }
    .act-danger:hover,
    .row-link:hover .act-danger:hover {
      border-color: var(--v2-erreur-fg);
      background: var(--v2-erreur-bg);
      color: var(--v2-erreur-fg);
    }
    .btn {
      display: inline-flex;
      height: 48px;
      align-items: center;
      gap: 10px;
      border-radius: 16px;
      font-size: 15px;
      font-weight: 800;
      cursor: pointer;
    }
    .btn-primary {
      padding: 0 6px 0 18px;
      background: var(--v2-foret);
      color: var(--v2-blanc);
    }
    .btn-primary:hover {
      background: var(--v2-foret-clair);
    }
    /* Filtres à compteurs : ils montrent comment le total de l'onglet se décompose. */
    .chips {
      display: flex;
      gap: 4px;
      overflow-x: auto;
      scrollbar-width: none;
      border-radius: 14px;
      background: var(--v2-creme);
      padding: 4px;
    }
    .chips::-webkit-scrollbar {
      display: none;
    }
    .chip {
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
      border-radius: 10px;
      padding: 8px 12px;
      font-size: 13px;
      font-weight: 700;
      color: var(--v2-gris-texte);
      cursor: pointer;
      transition:
        background-color 0.15s ease,
        color 0.15s ease;
    }
    .chip:hover {
      color: var(--v2-encre);
    }
    .chip.on {
      background: var(--v2-blanc);
      color: var(--v2-foret);
      box-shadow: 0 1px 3px color-mix(in oklab, var(--v2-foret) 15%, transparent);
    }
    .chip .n {
      border-radius: 999px;
      padding: 0 7px;
      font-size: 12px;
      font-variant-numeric: tabular-nums;
      background: color-mix(in oklab, var(--v2-gris-trait) 45%, transparent);
      color: var(--v2-ardoise);
    }
    .chip.on .n {
      background: var(--v2-foret);
      color: var(--v2-blanc);
    }
    .chip:focus-visible {
      outline: 2px solid var(--v2-foret);
      outline-offset: 2px;
    }
    .info dt {
      font-size: 13px;
      font-weight: 600;
      color: var(--v2-gris-texte);
    }
    .info dd {
      font-size: 14px;
      font-weight: 700;
      text-align: right;
    }
    .tab:focus-visible,
    .link:focus-visible,
    .ghost-dark:focus-visible,
    .row-link:focus-visible,
    .crumb a:focus-visible {
      outline: 2px solid var(--v2-foret);
      outline-offset: 2px;
    }
    @media (prefers-reduced-motion: reduce) {
      .rise,
      .panel > *,
      .ring,
      .bar > span {
        animation: none;
      }
      .stat,
      .stat:hover,
      .lift,
      .lift:hover,
      .watermark,
      .hero-mono,
      .row-link .go {
        transition: none;
        transform: none;
      }
      .watermark {
        transform: rotate(-12deg);
      }
    }
  `,
  template: `
    <app-shell [perm]="perms" [area]="t()('cooperatives.fiche.area')">
      @if (scoop(); as coop) {
        <!-- ───── En-tête ───── -->
        <section class="hero rise p-6 sm:p-8">
          <svg
            class="pointer-events-none absolute -right-16 -top-10 h-72 w-[30rem] opacity-[0.06]"
            viewBox="0 0 320 220"
            aria-hidden="true"
          >
            <path
              d="M10 120 Q160 60 310 110"
              fill="none"
              stroke="currentColor"
              stroke-width="22"
              stroke-linecap="round"
            />
            <path
              d="M30 168 Q170 108 310 156"
              fill="none"
              stroke="currentColor"
              stroke-width="22"
              stroke-linecap="round"
            />
            <path
              d="M60 212 Q180 160 310 200"
              fill="none"
              stroke="currentColor"
              stroke-width="22"
              stroke-linecap="round"
            />
          </svg>
          <nav
            class="crumb relative flex items-center gap-1.5 text-[13px] font-semibold"
            [attr.aria-label]="t()('cooperatives.fiche.crumb')"
          >
            <a routerLink="/dashboard/cooperatives">{{ t()("cooperatives.fiche.crumb") }}</a>
            <ui-icon name="chevron_right" [size]="16" style="opacity: 0.5" />
            <span aria-current="page" style="color: var(--v2-citron)">{{ coop.name }}</span>
          </nav>

          <div class="relative mt-6 flex flex-wrap items-start justify-between gap-6">
            <div class="flex min-w-0 items-start gap-5">
              <span class="hero-mono" aria-hidden="true">{{ mono() }}</span>
              <div class="min-w-0">
                <h1
                  class="text-[28px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[34px]"
                >
                  {{ coop.name }}
                </h1>
                <div class="mt-3 flex flex-wrap gap-2">
                  @if (coop.archived) {
                    <span
                      class="badge"
                      style="background: var(--v2-lin); color: var(--v2-gris-texte)"
                      ><ui-icon name="archive" [size]="14" />{{
                        t()("cooperatives.status.archived")
                      }}</span
                    >
                  } @else {
                    <span class="badge" style="background: var(--v2-citron); color: var(--v2-foret)"
                      ><ui-icon name="check_circle" [size]="14" />{{
                        t()("cooperatives.status.active")
                      }}</span
                    >
                  }
                  @if (isNew()) {
                    <span class="badge" style="background: var(--v2-blanc); color: var(--v2-foret)"
                      ><ui-icon name="north_east" [size]="14" />{{
                        t()("cooperatives.badge.new")
                      }}</span
                    >
                  }
                  @if (coop.code) {
                    <span
                      class="badge"
                      style="background: color-mix(in oklab, var(--v2-blanc) 12%, transparent); color: var(--v2-blanc); font-family: var(--v2-font-mono)"
                      >{{ coop.code }}</span
                    >
                  }
                </div>
                <p
                  class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] font-medium"
                  style="color: color-mix(in oklab, var(--v2-blanc) 75%, transparent)"
                >
                  <span class="inline-flex items-center gap-1.5"
                    ><ui-icon name="location_on" [size]="16" />{{ place() }}</span
                  >
                  @if (coop.createdAt) {
                    <span class="inline-flex items-center gap-1.5"
                      ><ui-icon name="calendar_today" [size]="16" />{{
                        t()("cooperatives.fiche.created", { date: fmtDate(coop.createdAt) })
                      }}</span
                    >
                  }
                  <span class="inline-flex items-center gap-1.5"
                    ><ui-icon name="account_balance" [size]="16" />{{
                      t()("cooperatives.network.faitiere")
                    }}
                    {{ t()("cooperatives.network.faitiereName") }}</span
                  >
                </p>
              </div>
            </div>
            <a class="ghost-dark" routerLink="/dashboard/cooperatives">
              <ui-icon name="arrow_forward" [size]="18" style="transform: rotate(180deg)" />{{
                t()("cooperatives.fiche.back")
              }}
            </a>
          </div>

          <!-- Gestionnaire -->
          <div
            class="relative mt-6 flex flex-wrap items-center gap-4 rounded-[20px] p-4"
            style="background: color-mix(in oklab, var(--v2-blanc) 8%, transparent)"
          >
            <span
              class="grid size-12 shrink-0 place-items-center rounded-full text-[14px] font-extrabold"
              style="background: var(--v2-citron); color: var(--v2-foret)"
              >{{ manager().initials || "—" }}</span
            >
            <span class="min-w-0 flex-1">
              <span class="mono block" style="color: var(--v2-citron)">{{
                t()("cooperatives.fiche.manager")
              }}</span>
              <span class="mt-0.5 block truncate text-[16px] font-extrabold">{{
                manager().user?.name ?? t()("cooperatives.fiche.managerNone")
              }}</span>
              @if (manager().user; as managerUser) {
                <span
                  class="block truncate text-[13px] font-medium"
                  style="color: color-mix(in oklab, var(--v2-blanc) 70%, transparent)"
                  >{{ managerUser.email
                  }}{{ managerUser.phone ? " · " + managerUser.phone : "" }}</span
                >
              }
            </span>
            @if (manager().user) {
              <span
                class="badge"
                [style.background]="account(manager().state).bg"
                [style.color]="account(manager().state).fg"
                >{{ t()(account(manager().state).label) }}</span
              >
            }
          </div>
        </section>

        <!-- ───── Onglets ───── -->
        <div
          class="tabs rise mt-6"
          style="animation-delay: 0.08s"
          role="tablist"
          [attr.aria-label]="t()('cooperatives.fiche.tabs.aria')"
        >
          @for (tabItem of tabs(); track tabItem.id) {
            <button
              type="button"
              role="tab"
              class="tab"
              [class.on]="tab() === tabItem.id"
              [attr.aria-selected]="tab() === tabItem.id"
              (click)="tab.set(tabItem.id)"
            >
              <ui-icon [name]="tabItem.icon" [size]="18" />{{ tabItem.label }}
              @if (tabItem.count !== null) {
                <span class="n">{{ tabItem.count }}</span>
              }
            </button>
          }
        </div>

        <!-- Chaque changement d'onglet recrée le panneau : son contenu réapparaît en fondu. -->
        @for (current of [tab()]; track current) {
          <div class="panel" role="tabpanel">
            <!-- ═════ Aperçu ═════ -->
            @if (current === "apercu") {
              <section class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                @for (stat of stats(); track stat.label; let first = $first) {
                  <div
                    class="card stat flex flex-col p-5"
                    [style.background]="first ? 'var(--v2-foret)' : stat.bg"
                    [style.border-color]="first ? 'var(--v2-foret)' : 'transparent'"
                    [style.color]="first ? 'var(--v2-blanc)' : stat.fg"
                  >
                    <span
                      class="watermark"
                      [style.color]="first ? 'var(--v2-citron)' : stat.fg"
                      aria-hidden="true"
                      ><ui-icon [name]="stat.icon" [size]="120"
                    /></span>
                    <div class="relative flex items-center justify-between gap-3">
                      <span class="text-[14px] font-bold" [style.opacity]="first ? 0.8 : 1">{{
                        stat.label
                      }}</span>
                      <span
                        class="grid size-10 place-items-center rounded-[12px]"
                        [style.background]="first ? 'var(--v2-citron)' : stat.fg"
                        [style.color]="first ? 'var(--v2-foret)' : stat.bg"
                        ><ui-icon [name]="stat.icon" [size]="20"
                      /></span>
                    </div>
                    <span
                      class="relative mt-3 text-[34px] font-extrabold leading-none tracking-[-0.03em] tabular-nums"
                      >{{ stat.value }}</span
                    >
                    <span
                      class="relative mt-2 truncate text-[13px] font-medium"
                      style="opacity: 0.75"
                      >{{ stat.sub }}</span
                    >
                  </div>
                }
              </section>

              <div class="mt-4 grid gap-4 lg:grid-cols-3">
                <!-- Qualité des fiches -->
                <section class="card lift p-6" aria-labelledby="q-title">
                  <div class="flex items-center justify-between">
                    <h2 id="q-title" class="h2">{{ t()("dashboard.quality.title") }}</h2>
                    <ui-icon name="verified" [size]="22" style="color: var(--v2-vert-pousse)" />
                  </div>
                  <div class="mt-5 flex items-center gap-5">
                    <div
                      class="ring grid size-[116px] shrink-0 place-items-center rounded-full"
                      [style.background]="quality().ring"
                      role="img"
                      [attr.aria-label]="quality().pct + ' % ' + t()('dashboard.quality.ring')"
                    >
                      <div
                        class="grid size-[88px] place-items-center rounded-full text-center"
                        style="background: var(--v2-blanc)"
                      >
                        <span class="text-[24px] font-extrabold leading-none tracking-[-0.03em]"
                          >{{ quality().pct }}<span class="text-[14px]"> %</span></span
                        >
                      </div>
                    </div>
                    <ul class="min-w-0 flex-1 space-y-2">
                      @for (share of quality().rows; track share.label) {
                        <li class="flex items-center justify-between gap-2 text-[13px]">
                          <span class="flex items-center gap-2 font-semibold"
                            ><span
                              class="size-2.5 rounded-full"
                              [style.background]="share.color"
                            ></span
                            >{{ share.label }}</span
                          >
                          <span class="font-extrabold tabular-nums" [class.zero]="!share.n">{{
                            nf.format(share.n)
                          }}</span>
                        </li>
                      }
                    </ul>
                  </div>
                </section>

                <!-- Composition -->
                <section class="card lift p-6" aria-labelledby="compo-title">
                  <div class="flex items-center justify-between">
                    <h2 id="compo-title" class="h2">{{ t()("cooperatives.fiche.compo.title") }}</h2>
                    <ui-icon name="group" [size]="22" style="color: var(--v2-foret-clair)" />
                  </div>
                  <ul class="mt-5 space-y-4">
                    @for (share of composition(); track share.label) {
                      <li>
                        <div class="flex items-center justify-between text-[14px] font-semibold">
                          <span>{{ share.label }}</span>
                          <span class="font-extrabold tabular-nums" [class.zero]="!share.n"
                            >{{ nf.format(share.n) }}
                            <span class="sub">· {{ share.pct }} %</span></span
                          >
                        </div>
                        <div class="bar mt-1.5">
                          <span [style.width.%]="share.pct" [style.background]="share.color"></span>
                        </div>
                      </li>
                    }
                  </ul>
                </section>

                <!-- Informations -->
                <section class="card lift p-6" aria-labelledby="info-title">
                  <div class="flex items-center justify-between">
                    <h2 id="info-title" class="h2">{{ t()("cooperatives.fiche.info.title") }}</h2>
                    <ui-icon name="description" [size]="22" style="color: var(--v2-foret-clair)" />
                  </div>
                  <dl class="info mt-4">
                    @for (infoRow of info(); track infoRow.label; let first = $first) {
                      <div
                        class="flex items-center justify-between gap-4 py-2.5"
                        [style.border-top]="first ? 'none' : '1px solid var(--v2-separateur)'"
                      >
                        <dt>{{ infoRow.label }}</dt>
                        <dd [class.zero]="!infoRow.known">{{ infoRow.value }}</dd>
                      </div>
                    }
                  </dl>
                </section>
              </div>

              <div class="mt-4 grid gap-4 lg:grid-cols-2">
                <!-- À traiter -->
                <section class="card p-6" aria-labelledby="todo-title">
                  <h2 id="todo-title" class="h2">{{ t()("cooperatives.fiche.pending.title") }}</h2>
                  <ul class="mt-4 space-y-2">
                    @for (pendingItem of pending(); track pendingItem.label) {
                      <li>
                        <a
                          class="row-link flex items-center gap-4 rounded-[16px] p-3"
                          [routerLink]="pendingItem.to"
                        >
                          <span
                            class="grid size-11 shrink-0 place-items-center rounded-[14px]"
                            [style.background]="pendingItem.fg"
                            [style.color]="pendingItem.bg"
                            ><ui-icon [name]="pendingItem.icon" [size]="20"
                          /></span>
                          <span class="min-w-0 flex-1 text-[14px] font-bold">{{
                            pendingItem.label
                          }}</span>
                          <span
                            class="text-[24px] font-extrabold tracking-[-0.03em] tabular-nums"
                            [class.zero]="!pendingItem.n"
                            >{{ nf.format(pendingItem.n) }}</span
                          >
                          <ui-icon name="arrow_forward" [size]="18" class="go" />
                        </a>
                      </li>
                    }
                  </ul>
                </section>

                <!-- Prochaines réunions -->
                <section class="card p-6" aria-labelledby="next-title">
                  <div class="flex items-center justify-between">
                    <h2 id="next-title" class="h2">{{ t()("dashboard.meetings.title") }}</h2>
                    <button type="button" class="link" (click)="tab.set('reunions')">
                      {{ t()("cooperatives.fiche.reunions.all") }}
                      <ui-icon name="arrow_forward" [size]="16" />
                    </button>
                  </div>
                  <ul class="mt-4 space-y-2">
                    @for (meeting of upcoming(); track meeting.id) {
                      <li>
                        <a
                          class="row-link flex items-center gap-4 rounded-[16px] p-3"
                          [routerLink]="['/dashboard/reunions', meeting.id]"
                        >
                          <span
                            class="grid w-14 shrink-0 place-items-center rounded-[14px] py-2 text-center"
                            style="background: var(--v2-foret); color: var(--v2-blanc)"
                          >
                            <span class="text-[20px] font-extrabold leading-none">{{
                              meeting.day
                            }}</span>
                            <span
                              class="mono mt-1"
                              style="color: var(--v2-citron); font-size: 10px"
                              >{{ meeting.month }}</span
                            >
                          </span>
                          <span class="min-w-0 flex-1">
                            <span class="block truncate text-[15px] font-bold">{{
                              meeting.title
                            }}</span>
                            <span class="sub flex items-center gap-1 truncate"
                              ><ui-icon name="location_on" [size]="14" />{{ meeting.place }}</span
                            >
                          </span>
                          <ui-icon name="arrow_forward" [size]="18" class="go" />
                        </a>
                      </li>
                    } @empty {
                      <li class="sub rounded-[16px] p-4" style="background: var(--v2-creme)">
                        {{ t()("dashboard.meetings.empty") }}
                      </li>
                    }
                  </ul>
                </section>
              </div>
            }

            <!-- ═════ GIE et organisations ═════ -->
            @if (current === "gie") {
              <section class="card mt-6 overflow-hidden">
                <div class="flex flex-wrap items-center justify-between gap-3 p-5">
                  <label class="search min-w-[240px] flex-1">
                    <ui-icon name="search" [size]="20" />
                    <input
                      type="search"
                      [placeholder]="t()('cooperatives.fiche.gie.search.placeholder')"
                      [attr.aria-label]="t()('cooperatives.fiche.gie.search.aria')"
                      [value]="gieQ()"
                      (input)="gieQ.set($any($event.target).value)"
                    />
                  </label>
                  <div
                    class="chips"
                    role="radiogroup"
                    [attr.aria-label]="t()('cooperatives.fiche.tab.orgs')"
                  >
                    @for (filterButton of orgFilters(); track filterButton.id) {
                      <button
                        type="button"
                        role="radio"
                        class="chip"
                        [class.on]="orgFilter() === filterButton.id"
                        [attr.aria-checked]="orgFilter() === filterButton.id"
                        (click)="orgFilter.set(filterButton.id)"
                      >
                        {{ filterButton.label
                        }}<span class="n" [class.zero]="!filterButton.count">{{
                          filterButton.count
                        }}</span>
                      </button>
                    }
                  </div>
                </div>
                @if (orgs().length) {
                  <div class="overflow-x-auto">
                    <table class="w-full min-w-[640px] text-left text-[14px]">
                      <thead>
                        <tr class="mono" style="color: var(--v2-gris-texte)">
                          <th class="px-5 py-3">{{ t()("cooperatives.fiche.gie.col.name") }}</th>
                          <th class="px-3 py-3">{{ t()("cooperatives.fiche.gie.col.type") }}</th>
                          <th class="px-3 py-3">{{ t()("cooperatives.fiche.gie.col.village") }}</th>
                          <th class="px-3 py-3 text-right">
                            {{ t()("cooperatives.fiche.gie.col.producers") }}
                          </th>
                          <th class="px-3 py-3 text-right">
                            {{ t()("cooperatives.fiche.gie.col.members") }}
                          </th>
                          <th class="px-5 py-3 text-right">
                            {{ t()("cooperatives.col.actions") }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        @for (org of orgPager.items(); track org.id) {
                          <tr class="row row-link" (click)="openDetail('org', org.id)">
                            <td class="px-5 py-3.5">
                              <span class="flex items-center gap-3">
                                <span
                                  class="grid size-9 shrink-0 place-items-center rounded-[10px]"
                                  style="background: var(--v2-info-bg); color: var(--v2-info-fg)"
                                  ><ui-icon name="hub" [size]="18"
                                /></span>
                                <span class="font-bold">{{ org.name }}</span>
                              </span>
                            </td>
                            <td class="px-3 py-3.5">
                              @if (org.type) {
                                <span
                                  class="badge"
                                  [style.background]="
                                    org.type === 'GIE' ? 'var(--v2-info-bg)' : 'var(--v2-creme)'
                                  "
                                  [style.color]="
                                    org.type === 'GIE' ? 'var(--v2-info-fg)' : 'var(--v2-ardoise)'
                                  "
                                  >{{ org.type }}</span
                                >
                              } @else {
                                <span
                                  class="badge"
                                  style="background: var(--v2-attente-bg); color: var(--v2-attente-fg)"
                                  >{{ t()("cooperatives.fiche.gie.toQualify") }}</span
                                >
                              }
                            </td>
                            <td class="px-3 py-3.5 font-medium">{{ org.village || "—" }}</td>
                            <td
                              class="px-3 py-3.5 text-right font-extrabold tabular-nums"
                              [class.zero]="!org.producers"
                            >
                              {{ nf.format(org.producers) }}
                            </td>
                            <td
                              class="px-3 py-3.5 text-right font-semibold tabular-nums"
                              [class.zero]="!org.members"
                            >
                              {{ nf.format(org.members) }}
                            </td>
                            <td class="px-5 py-2.5">
                              <span class="flex justify-end">
                                <button
                                  type="button"
                                  class="act"
                                  [attr.aria-label]="
                                    t()('cooperatives.fiche.view.aria', { name: org.name })
                                  "
                                  [title]="t()('common.view')"
                                  (click)="$event.stopPropagation(); openDetail('org', org.id)"
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
                  <ui-pagination class="px-5 pb-5" [pager]="orgPager" />
                } @else {
                  <p class="sub px-5 pb-6">
                    {{
                      orgCount()
                        ? t()("cooperatives.fiche.gie.empty.filtered")
                        : t()("cooperatives.fiche.gie.empty.text")
                    }}
                  </p>
                }
              </section>
            }

            <!-- ═════ Adhérents ═════ -->
            @if (current === "membres") {
              <section class="card mt-6 overflow-hidden">
                <div class="flex flex-wrap items-center justify-between gap-3 p-5">
                  <label class="search min-w-[240px] flex-1">
                    <ui-icon name="search" [size]="20" />
                    <input
                      type="search"
                      [placeholder]="t()('cooperatives.fiche.membres.search.placeholder')"
                      [attr.aria-label]="t()('cooperatives.fiche.membres.search.aria')"
                      [value]="memberQ()"
                      (input)="memberQ.set($any($event.target).value)"
                    />
                  </label>
                  <div
                    class="chips"
                    role="radiogroup"
                    [attr.aria-label]="t()('cooperatives.fiche.membres.col.status')"
                  >
                    @for (filterButton of memberFilters(); track filterButton.id) {
                      <button
                        type="button"
                        role="radio"
                        class="chip"
                        [class.on]="memberFilter() === filterButton.id"
                        [attr.aria-checked]="memberFilter() === filterButton.id"
                        (click)="memberFilter.set(filterButton.id)"
                      >
                        {{ filterButton.label
                        }}<span class="n" [class.zero]="!filterButton.count">{{
                          filterButton.count
                        }}</span>
                      </button>
                    }
                  </div>
                </div>
                @if (members().length) {
                  <div class="overflow-x-auto">
                    <table class="w-full min-w-[720px] text-left text-[14px]">
                      <thead>
                        <tr class="mono" style="color: var(--v2-gris-texte)">
                          <th class="px-5 py-3">
                            {{ t()("cooperatives.fiche.membres.col.name") }}
                          </th>
                          <th class="px-3 py-3">{{ t()("cooperatives.fiche.gie.col.village") }}</th>
                          <th class="px-3 py-3">
                            {{ t()("cooperatives.fiche.membres.col.status") }}
                          </th>
                          <th class="px-3 py-3">{{ t()("cooperatives.fiche.membres.joined") }}</th>
                          <th class="px-3 py-3">
                            {{ t()("cooperatives.fiche.membres.col.dues") }}
                          </th>
                          <th class="px-5 py-3 text-right">
                            {{ t()("cooperatives.col.actions") }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        @for (member of memberPager.items(); track member.id) {
                          <tr class="row row-link" (click)="openDetail('member', member.id)">
                            <td class="px-5 py-3">
                              <span class="flex items-center gap-3">
                                <span
                                  class="grid size-9 shrink-0 place-items-center rounded-full text-[12px] font-extrabold"
                                  style="background: var(--v2-sauge); color: var(--v2-foret)"
                                  >{{ member.initials }}</span
                                >
                                <span class="min-w-0">
                                  <span class="block truncate font-bold">{{ member.name }}</span>
                                  @if (member.phone) {
                                    <span class="sub block truncate tabular-nums">{{
                                      member.phone
                                    }}</span>
                                  }
                                </span>
                              </span>
                            </td>
                            <td class="px-3 py-3 font-medium">{{ member.village || "—" }}</td>
                            <td class="px-3 py-3">
                              <span
                                class="badge"
                                [style.background]="member.status.bg"
                                [style.color]="member.status.fg"
                                >{{ t()(member.status.label) }}</span
                              >
                            </td>
                            <td class="px-3 py-3 font-medium tabular-nums">{{ member.joined }}</td>
                            <td class="px-3 py-3">
                              @if (member.due) {
                                <span
                                  class="badge"
                                  [style.background]="member.due.bg"
                                  [style.color]="member.due.fg"
                                  >{{ member.dueLabel }}</span
                                >
                              } @else {
                                <span class="sub">—</span>
                              }
                            </td>
                            <td class="px-5 py-2.5">
                              <span class="flex justify-end">
                                <button
                                  type="button"
                                  class="act"
                                  [attr.aria-label]="
                                    t()('cooperatives.fiche.view.aria', { name: member.name })
                                  "
                                  [title]="t()('common.view')"
                                  (click)="
                                    $event.stopPropagation(); openDetail('member', member.id)
                                  "
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
                  <ui-pagination class="px-5 pb-5" [pager]="memberPager" />
                } @else {
                  <p class="sub px-5 pb-6">
                    {{ t()("cooperatives.fiche.membres.empty.filtered") }}
                  </p>
                }
              </section>
            }

            <!-- ═════ Techniciens ═════ -->
            @if (current === "techniciens") {
              <section class="mt-6">
                @if (canManageTech()) {
                  <div class="mb-4 flex justify-end">
                    <button type="button" class="btn btn-primary" (click)="techOpen.set(true)">
                      {{ t()("tech.add") }}
                      <span
                        class="grid size-9 place-items-center rounded-[12px]"
                        style="background: var(--v2-citron); color: var(--v2-foret)"
                        ><ui-icon name="person_add" [size]="18"
                      /></span>
                    </button>
                  </div>
                }
                @if (technicians().length) {
                  <div class="card overflow-hidden">
                    <div class="overflow-x-auto">
                      <table class="w-full min-w-[720px] text-left text-[14px]">
                        <thead>
                          <tr class="mono" style="color: var(--v2-gris-texte)">
                            <th class="px-5 py-3">
                              {{ t()("cooperatives.fiche.membres.col.name") }}
                            </th>
                            <th class="px-3 py-3">{{ t()("cooperatives.fiche.detail.phone") }}</th>
                            <th class="px-3 py-3">{{ t()("cooperatives.fiche.detail.scoops") }}</th>
                            <th class="px-3 py-3">
                              {{ t()("cooperatives.fiche.membres.col.status") }}
                            </th>
                            <th class="px-5 py-3 text-right">
                              {{ t()("cooperatives.col.actions") }}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          @for (technician of techPager.items(); track technician.id) {
                            <tr class="row row-link" (click)="openDetail('tech', technician.id)">
                              <td class="px-5 py-3">
                                <span class="flex items-center gap-3">
                                  <span
                                    class="grid size-9 shrink-0 place-items-center rounded-full text-[12px] font-extrabold"
                                    style="background: var(--v2-foret); color: var(--v2-citron)"
                                    >{{ technician.initials }}</span
                                  >
                                  <span class="min-w-0">
                                    <span class="block truncate font-bold">{{
                                      technician.name
                                    }}</span>
                                    <span class="sub block truncate">{{ technician.email }}</span>
                                  </span>
                                </span>
                              </td>
                              <td
                                class="px-3 py-3 font-medium tabular-nums"
                                [class.zero]="!technician.phone"
                              >
                                {{ technician.phone || "—" }}
                              </td>
                              <td class="px-3 py-3">
                                <span
                                  class="badge"
                                  style="background: var(--v2-info-bg); color: var(--v2-info-fg)"
                                >
                                  {{
                                    t()(
                                      technician.scoops > 1
                                        ? "cooperatives.fiche.techniciens.scoops.autre"
                                        : "cooperatives.fiche.techniciens.scoops.un",
                                      { count: technician.scoops }
                                    )
                                  }}
                                </span>
                              </td>
                              <td class="px-3 py-3">
                                @if (technician.invited) {
                                  <span
                                    class="badge"
                                    style="background: var(--v2-info-bg); color: var(--v2-info-fg)"
                                    >{{ t()("tech.status.invited") }}</span
                                  >
                                } @else {
                                  <span
                                    class="badge"
                                    [style.background]="
                                      technician.active ? 'var(--v2-sauge)' : 'var(--v2-lin)'
                                    "
                                    [style.color]="
                                      technician.active
                                        ? 'var(--v2-vert-pousse)'
                                        : 'var(--v2-gris-texte)'
                                    "
                                  >
                                    {{
                                      technician.active
                                        ? t()("cooperatives.fiche.techniciens.active")
                                        : t()("cooperatives.fiche.techniciens.closed")
                                    }}
                                  </span>
                                }
                              </td>
                              <td class="px-5 py-2.5">
                                <span class="flex justify-end">
                                  @if (canManageTech()) {
                                    <button
                                      type="button"
                                      class="act act-danger mr-2"
                                      [attr.aria-label]="
                                        t()('tech.removeAria', { name: technician.name })
                                      "
                                      [title]="t()('tech.remove')"
                                      (click)="
                                        $event.stopPropagation();
                                        removeTech(technician.id, technician.name)
                                      "
                                    >
                                      <ui-icon name="close" [size]="18" />
                                    </button>
                                  }
                                  <button
                                    type="button"
                                    class="act"
                                    [attr.aria-label]="
                                      t()('cooperatives.fiche.view.aria', { name: technician.name })
                                    "
                                    [title]="t()('common.view')"
                                    (click)="
                                      $event.stopPropagation(); openDetail('tech', technician.id)
                                    "
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
                    <ui-pagination class="px-5 pb-5" [pager]="techPager" />
                  </div>
                } @else {
                  <div class="card flex flex-col items-center gap-3 p-10 text-center">
                    <span
                      class="grid size-14 place-items-center rounded-[16px]"
                      style="background: var(--v2-sauge); color: var(--v2-foret)"
                      ><ui-icon name="person" [size]="26"
                    /></span>
                    <p class="text-[16px] font-extrabold">
                      {{ t()("cooperatives.fiche.techniciens.empty.title") }}
                    </p>
                    <p class="sub max-w-md">
                      {{ t()("cooperatives.fiche.techniciens.empty.text") }}
                    </p>
                  </div>
                }
              </section>
            }

            <!-- ═════ Réunions ═════ -->
            @if (current === "reunions") {
              <section class="card mt-6 overflow-hidden">
                @for (meeting of meetingPager.items(); track meeting.id; let first = $first) {
                  <button
                    type="button"
                    class="row-link flex w-full items-center gap-4 px-5 py-4 text-left"
                    [style.border-top]="first ? 'none' : '1px solid var(--v2-separateur)'"
                    [attr.aria-label]="t()('cooperatives.fiche.view.aria', { name: meeting.title })"
                    (click)="openDetail('meeting', meeting.id)"
                  >
                    <span
                      class="grid w-14 shrink-0 place-items-center rounded-[14px] py-2 text-center"
                      [style.background]="meeting.past ? 'var(--v2-creme)' : 'var(--v2-foret)'"
                      [style.color]="meeting.past ? 'var(--v2-ardoise)' : 'var(--v2-blanc)'"
                    >
                      <span class="text-[20px] font-extrabold leading-none">{{ meeting.day }}</span>
                      <span
                        class="mono mt-1"
                        style="font-size: 10px"
                        [style.color]="meeting.past ? 'var(--v2-gris-texte)' : 'var(--v2-citron)'"
                        >{{ meeting.month }}</span
                      >
                    </span>
                    <span class="min-w-0 flex-1">
                      <span class="block truncate text-[15px] font-bold">{{ meeting.title }}</span>
                      <span class="sub block truncate"
                        >{{ meeting.when }} · {{ meeting.place }}</span
                      >
                    </span>
                    <span
                      class="badge"
                      [style.background]="meeting.status.bg"
                      [style.color]="meeting.status.fg"
                      >{{ t()(meeting.status.label) }}</span
                    >
                    <span class="act" aria-hidden="true"
                      ><ui-icon name="visibility" [size]="18"
                    /></span>
                  </button>
                } @empty {
                  <p class="sub p-6">{{ t()("cooperatives.fiche.reunions.empty.text") }}</p>
                }
                <ui-pagination class="px-5 pb-5" [pager]="meetingPager" />
              </section>
            }

            <!-- ═════ Cotisations ═════ -->
            @if (current === "cotisations") {
              <section class="mt-6">
                @if (dues().rule) {
                  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div class="card stat p-5">
                      <span class="watermark" style="color: var(--v2-foret)" aria-hidden="true"
                        ><ui-icon name="description" [size]="110"
                      /></span>
                      <p class="relative text-[14px] font-bold" style="color: var(--v2-ardoise)">
                        {{ t()("cooperatives.fiche.cot.rule") }}
                      </p>
                      <p
                        class="relative mt-2 text-[26px] font-extrabold leading-none tracking-[-0.03em]"
                      >
                        {{ dues().ruleLabel }}
                      </p>
                    </div>
                    <div
                      class="card stat p-5"
                      style="background: var(--v2-sauge); border-color: transparent; color: var(--v2-vert-pousse)"
                    >
                      <span class="watermark" aria-hidden="true"
                        ><ui-icon name="check_circle" [size]="110"
                      /></span>
                      <p class="relative text-[14px] font-bold">
                        {{ t()("cooperatives.fiche.cot.collected") }}
                      </p>
                      <p
                        class="relative mt-2 text-[26px] font-extrabold leading-none tracking-[-0.03em] tabular-nums"
                      >
                        {{ dues().collected }}
                      </p>
                    </div>
                    <div
                      class="card stat p-5"
                      style="background: var(--v2-attente-bg); border-color: transparent; color: var(--v2-attente-fg)"
                    >
                      <span class="watermark" aria-hidden="true"
                        ><ui-icon name="payments" [size]="110"
                      /></span>
                      <p class="relative text-[14px] font-bold">
                        {{ t()("cooperatives.fiche.cot.expected") }}
                      </p>
                      <p
                        class="relative mt-2 text-[26px] font-extrabold leading-none tracking-[-0.03em] tabular-nums"
                      >
                        {{ dues().remaining }}
                      </p>
                    </div>
                  </div>
                  <section class="card mt-4 overflow-hidden">
                    <div class="flex items-center justify-between gap-3 p-5">
                      <h2 class="h2">{{ t()("cooperatives.fiche.cot.late.title") }}</h2>
                      <a class="link" routerLink="/dashboard/cotisations"
                        >{{ t()("cooperatives.fiche.cot.open") }}
                        <ui-icon name="arrow_forward" [size]="16"
                      /></a>
                    </div>
                    @for (lateMember of latePager.items(); track lateMember.id) {
                      <button
                        type="button"
                        class="row row-link flex w-full items-center gap-4 px-5 py-3 text-left"
                        [attr.aria-label]="
                          t()('cooperatives.fiche.view.aria', { name: lateMember.name })
                        "
                        (click)="openDetail('member', lateMember.id)"
                      >
                        <span
                          class="grid size-9 shrink-0 place-items-center rounded-full text-[12px] font-extrabold"
                          style="background: var(--v2-erreur-bg); color: var(--v2-erreur-fg)"
                          >{{ lateMember.initials }}</span
                        >
                        <span class="min-w-0 flex-1 truncate font-bold">{{ lateMember.name }}</span>
                        <span
                          class="text-[14px] font-extrabold tabular-nums"
                          style="color: var(--v2-erreur-fg)"
                          >{{ lateMember.owes }}</span
                        >
                        <span class="act" aria-hidden="true"
                          ><ui-icon name="visibility" [size]="18"
                        /></span>
                      </button>
                    } @empty {
                      <p class="sub px-5 pb-6">{{ t()("cooperatives.fiche.cot.late.none") }}</p>
                    }
                    <ui-pagination class="px-5 pb-5" [pager]="latePager" />
                  </section>
                } @else {
                  <p class="card sub p-6">{{ t()("cooperatives.fiche.cot.noRule") }}</p>
                }
              </section>
            }
          </div>
        }
      } @else {
        <div
          class="card rise mx-auto mt-16 flex max-w-lg flex-col items-center gap-3 p-10 text-center"
        >
          <span
            class="grid size-14 place-items-center rounded-[16px]"
            style="background: var(--v2-attente-bg); color: var(--v2-attente-fg)"
            ><ui-icon name="warning" [size]="26"
          /></span>
          <h1 class="text-[22px] font-extrabold">{{ t()("cooperatives.fiche.notFound.title") }}</h1>
          <p class="sub">{{ t()("cooperatives.fiche.notFound.text") }}</p>
          <a class="link mt-2" routerLink="/dashboard/cooperatives"
            >{{ t()("cooperatives.fiche.back") }} <ui-icon name="arrow_forward" [size]="16"
          /></a>
        </div>
      }

      <!-- ───── Détail (organisation, adhérent, technicien, réunion) : on reste sur la fiche ───── -->
      <ui-detail-modal [view]="detail()" (closed)="closeDetail()" />
      <app-technician-dialog [(open)]="techOpen" [scoopId]="coopId()" />
    </app-shell>
  `,
})
export default class CooperativeDetailPage {
  private readonly route = inject(ActivatedRoute);
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  private readonly snackbar = inject(SnackbarService);
  protected readonly nf = nf;
  protected readonly fmtDate = fmtDate;
  protected readonly perms = ["scoop.manage", "org.read"] as const;

  protected readonly tab = signal<Tab>("apercu");
  protected readonly gieQ = signal("");
  protected readonly memberQ = signal("");
  protected readonly memberFilter = signal<"tous" | "membre" | "candidat" | "autres">("tous");
  /** `tous`, un type d'organisation (« GIE », « Individuel »…) ou `aucun` (à qualifier). */
  protected readonly orgFilter = signal<string>("tous");

  /** Types d'organisation présents dans la coopérative, du plus fréquent au moins fréquent ; « À qualifier » en dernier. */
  protected readonly orgTypes = computed(() => {
    const counts = new Map<string, number>();
    let unqualified = 0;
    for (const o of this.base().orgs) {
      if (o.type) counts.set(o.type, (counts.get(o.type) ?? 0) + 1);
      else unqualified++;
    }
    const types = [...counts]
      .sort((a, b) => b[1] - a[1])
      .map(([id, count]) => ({ id, label: id, count }));
    if (unqualified)
      types.push({
        id: "aucun",
        label: this.t()("cooperatives.fiche.gie.toQualify"),
        count: unqualified,
      });
    return types;
  });

  /** Décomposition des personnes inscrites : elle fait le lien entre « 31 adhérents actifs » et « 34 personnes ». */
  protected readonly memberFilters = computed(() => {
    const t = this.t();
    const all = this.base().members;
    const n = (st: string[]) => all.filter((m) => st.includes(m.status)).length;
    return [
      {
        id: "tous" as const,
        label: t("cooperatives.fiche.filter.allAdherents"),
        count: all.length,
      },
      { id: "membre" as const, label: t("cooperatives.fiche.filter.active"), count: n(["membre"]) },
      {
        id: "candidat" as const,
        label: t("cooperatives.fiche.filter.candidates"),
        count: n(["candidat"]),
      },
      {
        id: "autres" as const,
        label: t("cooperatives.fiche.filter.others"),
        count: n(["suspendu", "sorti"]),
      },
    ];
  });

  /** Décomposition des organisations : « 4 GIE » sur « 6 organisations ». */
  protected readonly orgFilters = computed(() => {
    const t = this.t();
    return [
      { id: "tous", label: t("cooperatives.fiche.filter.allOrgs"), count: this.base().orgs.length },
      ...this.orgTypes(),
    ];
  });

  private readonly id = toSignal(this.route.paramMap.pipe(map((p) => p.get("id") ?? "")), {
    initialValue: "",
  });

  protected readonly scoop = computed(() =>
    this.store.state().scoops.find((s) => s.id === this.id()),
  );

  protected readonly mono = computed(() => {
    const c = this.scoop();
    return c
      ? (c.code ?? c.name.replace(/[^A-Za-zÀ-ÿ]/g, "").slice(0, 3)).toUpperCase().slice(0, 4)
      : "";
  });

  protected readonly place = computed(() => {
    const c = this.scoop();
    return c ? [c.commune, c.region].filter(Boolean).join(", ") : "";
  });

  protected readonly isNew = computed(() => {
    const c = this.scoop();
    return !!c?.createdAt && Date.now() - new Date(c.createdAt).getTime() < 90 * 86_400_000;
  });

  protected readonly manager = computed(() => {
    const user = managerOf(this.store.state().users, this.id());
    return { user, state: accountOf(user, Date.now()), initials: user ? initials(user.name) : "" };
  });

  protected account(a: AccountState) {
    return ACCOUNT[a];
  }

  /** Données de la coopérative (producteurs non fusionnés, membres, organisations, techniciens, réunions). */
  private readonly base = computed(() => {
    const s = this.store.state();
    const id = this.id();
    return {
      producers: s.producers.filter((p) => p.scoopId === id && !p.mergedInto),
      members: s.members.filter((m) => m.scoopId === id),
      orgs: s.orgs.filter((o) => o.scoopId === id),
      technicians: s.users.filter(
        (u) => u.role === "technicien" && (u.scoopIds?.includes(id) || u.scoopId === id),
      ),
      meetings: s.meetings
        .filter((m) => m.scoopId === id)
        .sort((a, b) => b.date.localeCompare(a.date)),
    };
  });

  protected readonly orgCount = computed(() => this.base().orgs.length);

  protected readonly tabs = computed(() => {
    const t = this.t();
    const b = this.base();
    // Les libellés d'origine portent « ({count}) » : on garde le mot, le nombre va dans la pastille.
    const strip = (label: string) => label.replace(/\s*\(\d+\)/, "");
    return [
      {
        id: "apercu" as const,
        icon: "space_dashboard" as IconName,
        label: t("cooperatives.fiche.tab.apercu"),
        count: null,
      },
      // Les onglets disent ce qu'ils comptent : TOUTES les organisations, TOUTES les personnes inscrites.
      {
        id: "gie" as const,
        icon: "hub" as IconName,
        // « Organisations (GIE, Individuel, À qualifier) » : les types présents, dans l'ordre du filtre.
        label: this.orgTypes().length
          ? `${t("cooperatives.fiche.tab.orgs")} (${this.orgTypes()
              .map((ty) => ty.label)
              .join(", ")})`
          : t("cooperatives.fiche.tab.orgs"),
        count: b.orgs.length,
      },
      {
        id: "membres" as const,
        icon: "group" as IconName,
        label: t("cooperatives.fiche.tab.adherents"),
        count: b.members.length,
      },
      {
        id: "techniciens" as const,
        icon: "person" as IconName,
        label: strip(t("cooperatives.fiche.tab.techniciens", { count: 0 })),
        count: b.technicians.length,
      },
      {
        id: "reunions" as const,
        icon: "event" as IconName,
        label: strip(t("cooperatives.fiche.tab.reunions", { count: 0 })),
        count: b.meetings.length,
      },
      {
        id: "cotisations" as const,
        icon: "payments" as IconName,
        label: strip(t("cooperatives.fiche.tab.cotisations", { count: 0 })),
        count: null,
      },
    ];
  });

  protected readonly stats = computed(() => {
    const t = this.t();
    const b = this.base();
    const active = b.members.filter((m) => m.status === "membre").length;
    const techActive = b.technicians.filter((u) => u.active).length;
    // « 4 GIE · 1 individuel · 1 à qualifier » : la répartition des organisations par type.
    const orgBreakdown = this.orgTypes()
      // Les sigles (GIE) restent en capitales ; les autres types passent en minuscules dans la phrase.
      .map(
        (ty) =>
          `${ty.count} ${ty.label === ty.label.toUpperCase() ? ty.label : ty.label.toLowerCase()}`,
      )
      .join(" · ");
    return [
      {
        label: t("cooperatives.card.producers"),
        value: nf.format(b.producers.length),
        sub: t("cooperatives.structure.producersSub"),
        icon: "agriculture" as IconName,
        bg: "",
        fg: "",
      },
      {
        label: t("cooperatives.fiche.kpi.adherents"),
        value: nf.format(b.members.length),
        sub: t("cooperatives.fiche.kpi.adherentsSub", { count: active }),
        icon: "group" as IconName,
        bg: "var(--v2-sauge)",
        fg: "var(--v2-vert-pousse)",
      },
      {
        label: t("cooperatives.fiche.kpi.orgs"),
        value: nf.format(b.orgs.length),
        sub: orgBreakdown || t("cooperatives.fiche.gie.empty.title"),
        icon: "hub" as IconName,
        bg: "var(--v2-info-bg)",
        fg: "var(--v2-info-fg)",
      },
      {
        label: t("cooperatives.fiche.kpi.techniciansTotal"),
        value: nf.format(b.technicians.length),
        sub: t("cooperatives.fiche.kpi.techniciansSub", { count: techActive }),
        icon: "person" as IconName,
        bg: "var(--v2-culture-bg)",
        fg: "var(--v2-culture-fg)",
      },
    ];
  });

  protected readonly quality = computed(() => {
    const ps = this.base().producers;
    const t = this.t();
    const rows = [
      {
        label: t("dashboard.quality.validated"),
        n: ps.filter((p) => p.quality === "validé").length,
        color: "var(--v2-vert-pousse)",
      },
      {
        label: t("dashboard.quality.toVerify"),
        n: ps.filter((p) => p.quality === "à vérifier").length,
        color: "var(--v2-soleil)",
      },
      {
        label: t("dashboard.quality.duplicate"),
        n: ps.filter((p) => p.quality === "doublon").length,
        color: "var(--v2-info-fg)",
      },
      {
        label: t("dashboard.quality.invalid"),
        n: ps.filter((p) => p.quality === "invalide").length,
        color: "var(--v2-erreur-fg)",
      },
    ];
    const total = ps.length || 1;
    let acc = 0;
    const stops = rows.map((r) => {
      const from = (acc / total) * 100;
      acc += r.n;
      return `${r.color} ${from}% ${(acc / total) * 100}%`;
    });
    return {
      rows,
      pct: Math.round((rows[0]!.n / total) * 100),
      ring: ps.length ? `conic-gradient(${stops.join(", ")})` : "var(--v2-lin)",
    };
  });

  protected readonly composition = computed(() => {
    const t = this.t();
    const ps = this.base().producers;
    const n = ps.length || 1;
    const youthAge = this.store.state().youthMaxAge;
    const women = ps.filter((p) => p.sex === "F").length;
    const youth = ps.filter((p) => ageAtMost(p.age, youthAge)).length;
    const handicap = ps.filter((p) => p.handicap).length;
    return [
      {
        label: t("cooperatives.fiche.compo.women"),
        n: women,
        pct: Math.round((women / n) * 100),
        color: "var(--v2-chart-2)",
      },
      {
        label: t("cooperatives.fiche.compo.youth", { age: youthAge }),
        n: youth,
        pct: Math.round((youth / n) * 100),
        color: "var(--v2-foret)",
      },
      {
        label: t("cooperatives.fiche.compo.handicap"),
        n: handicap,
        pct: Math.round((handicap / n) * 100),
        color: "var(--v2-soleil)",
      },
    ];
  });

  protected readonly info = computed(() => {
    const t = this.t();
    const c = this.scoop();
    const none = t("cooperatives.fiche.info.none");
    return [
      { label: t("cooperatives.fiche.info.code"), value: c?.code ?? none, known: !!c?.code },
      {
        label: t("cooperatives.fiche.info.commune"),
        value: c?.commune || none,
        known: !!c?.commune,
      },
      { label: t("cooperatives.fiche.info.region"), value: c?.region || none, known: !!c?.region },
      {
        label: t("cooperatives.fiche.info.created"),
        value: c?.createdAt ? fmtDate(c.createdAt) : none,
        known: !!c?.createdAt,
      },
      {
        label: t("cooperatives.network.faitiere"),
        value: t("cooperatives.network.faitiereName"),
        known: true,
      },
      {
        label: t("cooperatives.fiche.info.villages"),
        value: nf.format(
          new Set(
            this.base()
              .producers.map((p) => p.village)
              .filter(Boolean),
          ).size,
        ),
        known: true,
      },
    ];
  });

  protected readonly pending = computed(() => {
    const s = this.store.state();
    const t = this.t();
    const id = this.id();
    const ids = new Set(this.base().producers.map((p) => p.id));
    const plotOwner = new Map(s.plots.map((p) => [p.id, p.producerId]));
    const dossiers = s.dossiers.filter(
      (d) => d.scoopId === id && (d.status === "soumis" || d.status === "en examen"),
    ).length;
    const corrections = s.corrections.filter(
      (c) => c.status === "en attente" && ids.has(c.producerId),
    ).length;
    const alerts = s.alerts.filter(
      (a) =>
        a.status === "ouvert" &&
        ids.has(a.entity === "producteur" ? a.entityId : (plotOwner.get(a.entityId) ?? "")),
    ).length;
    return [
      {
        label: t("cooperatives.fiche.pending.dossiers"),
        n: dossiers,
        icon: "folder_shared" as IconName,
        to: "/dashboard/dossiers",
        bg: "var(--v2-info-bg)",
        fg: "var(--v2-info-fg)",
      },
      {
        label: t("cooperatives.fiche.pending.corrections"),
        n: corrections,
        icon: "edit" as IconName,
        to: "/dashboard/qualite/corrections",
        bg: "var(--v2-culture-bg)",
        fg: "var(--v2-culture-fg)",
      },
      {
        label: t("cooperatives.fiche.pending.alerts"),
        n: alerts,
        icon: "warning" as IconName,
        to: "/dashboard/qualite/alertes",
        bg: "var(--v2-attente-bg)",
        fg: "var(--v2-attente-fg)",
      },
    ];
  });

  private meetingView(m: {
    id: string;
    title: string;
    date: string;
    place: string;
    status: string;
  }) {
    return {
      id: m.id,
      title: m.title,
      place: m.place,
      past: m.date < new Date().toISOString(),
      when: fmtDateTime(m.date),
      day: this.locale.formatDate(m.date, { day: "2-digit" }),
      month: this.locale.formatDate(m.date, { month: "short" }).replace(".", ""),
      status: MEETING_STATUS[m.status] ?? MEETING_STATUS["planifiée"]!,
    };
  }

  protected readonly upcoming = computed(() => {
    const now = new Date().toISOString();
    return this.base()
      .meetings.filter((m) => m.status === "planifiée" && m.date >= now)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 3)
      .map((m) => this.meetingView(m));
  });

  protected readonly meetings = computed(() =>
    this.base().meetings.map((m) => this.meetingView(m)),
  );

  protected readonly orgs = computed(() => {
    const b = this.base();
    const q = norm(this.gieQ().trim());
    const members = this.store.state().members;
    return b.orgs
      .map((o) => ({
        id: o.id,
        name: o.name,
        type: o.type,
        village: o.village,
        producers: b.producers.filter((p) => p.orgId === o.id).length,
        members: members.filter((m) => m.orgId === o.id && m.status === "membre").length,
      }))
      .filter((o) => !q || norm(`${o.name} ${o.village}`).includes(q))
      .filter((o) => {
        const f = this.orgFilter();
        return f === "tous" || (f === "aucun" ? !o.type : o.type === f);
      })
      .sort((a, b) => b.producers - a.producers);
  });

  private readonly duesOf = computed(() => {
    const s = this.store.state();
    const rule = s.contributionRules.find((r) => r.scoopId === this.id());
    const now = new Date().toISOString();
    return {
      rule,
      map: new Map(this.base().members.map((m) => [m.id, memberDues(m, rule, s.payments, now)])),
    };
  });

  protected readonly members = computed(() => {
    const q = norm(this.memberQ().trim());
    const { map: dues } = this.duesOf();
    const all = this.base()
      .members.filter((m) => !q || norm(`${m.firstName} ${m.lastName} ${m.village}`).includes(q))
      .filter((m) => {
        const f = this.memberFilter();
        return (
          f === "tous" ||
          (f === "autres" ? m.status === "suspendu" || m.status === "sorti" : m.status === f)
        );
      })
      .sort((a, b) => `${a.lastName}${a.firstName}`.localeCompare(`${b.lastName}${b.firstName}`));
    return all.map((m) => {
      const d = dues.get(m.id);
      const due = d && d.state !== "non exigible" ? (DUE[d.state] ?? null) : null;
      return {
        id: m.id,
        name: `${m.firstName} ${m.lastName}`,
        initials: initials(`${m.firstName} ${m.lastName}`),
        phone: this.store.phone(m.phone),
        village: m.village,
        status: MEMBER_STATUS[m.status] ?? MEMBER_STATUS["membre"]!,
        joined: m.joinedAt ? fmtDate(m.joinedAt) : "—",
        due,
        dueLabel: d
          ? d.state === "en retard" || d.state === "jamais payé"
            ? `${d.state} · ${nf.format(d.balance)} FCFA`
            : d.state
          : "",
      };
    });
  });

  protected readonly technicians = computed(() =>
    this.base().technicians.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: this.store.phone(u.phone),
      initials: initials(u.name),
      active: u.active,
      invited: !!u.invited || !!u.activation,
      scoops: u.scoopIds?.length ?? 1,
    })),
  );

  // ── Techniciens : ajout (invitation ou affectation) et retrait de cette coopérative ──
  protected readonly techOpen = signal(false);
  protected readonly canManageTech = computed(() => this.store.can("user.manage") || this.store.can("technician.invite"));
  protected readonly coopId = computed(() => this.id());

  protected removeTech(userId: string, name: string): void {
    const u = this.store.state().users.find((x) => x.id === userId);
    const next = (u?.scoopIds ?? (u?.scoopId ? [u.scoopId] : [])).filter((id) => id !== this.id());
    const res = this.store.actions.setTechnicianScoops(userId, next);
    if (!res.ok) {
      this.snackbar.error(this.locale.tNow(res.error as MessageKey));
      return;
    }
    this.snackbar.success(this.t()("tech.removed", { name }));
  }

  protected readonly dues = computed(() => {
    const { rule, map: dues } = this.duesOf();
    const members = this.base().members;
    if (!rule) return { rule: null, ruleLabel: "", collected: "", remaining: "", late: [] };
    let collected = 0;
    let remaining = 0;
    const late: { id: string; name: string; initials: string; owes: string; balance: number }[] =
      [];
    for (const m of members) {
      const d = dues.get(m.id);
      if (!d) continue;
      collected += d.paid;
      remaining += d.balance;
      if (d.state === "en retard" || d.state === "jamais payé") {
        const name = `${m.firstName} ${m.lastName}`;
        late.push({
          id: m.id,
          name,
          initials: initials(name),
          owes: `${nf.format(d.balance)} FCFA`,
          balance: d.balance,
        });
      }
    }
    late.sort((a, b) => b.balance - a.balance);
    return {
      rule,
      ruleLabel: `${nf.format(rule.amount)} FCFA · ${rule.periodicity}`,
      collected: `${nf.format(collected)} FCFA`,
      remaining: `${nf.format(remaining)} FCFA`,
      late,
    };
  });

  // ── Pagination des listes de la fiche (mêmes règles que l'API : ?page=&limit=) ──
  protected readonly orgPager = createPager(() => this.orgs());
  protected readonly memberPager = createPager(() => this.members());
  protected readonly techPager = createPager(() => this.technicians());
  protected readonly meetingPager = createPager(() => this.meetings());
  protected readonly latePager = createPager(() => this.dues().late);

  // ── Fenêtre de détail : une ligne s'ouvre en modale au lieu de quitter la fiche ──
  private readonly detailTarget = signal<{ kind: DetailKind; id: string } | null>(null);

  protected openDetail(kind: DetailKind, id: string): void {
    this.detailTarget.set({ kind, id });
  }

  protected closeDetail(): void {
    this.detailTarget.set(null);
  }

  protected readonly detail = computed<DetailView | null>(() => {
    const target = this.detailTarget();
    if (!target) return null;
    const s = this.store.state();
    const t = this.t();
    const none = "—";
    const empty = (v: unknown) => v === null || v === undefined || v === "";
    const fact = (
      label: string,
      value: string | null | undefined,
      icon: IconName,
      opts: { wide?: boolean; tone?: Tone | undefined } = {},
    ) => ({
      label,
      value: empty(value) ? none : value!,
      icon,
      muted: empty(value),
      wide: opts.wide ?? false,
      tone: opts.tone,
    });
    const kpi = (label: string, n: number, icon: IconName, tone: Tone, display?: string) => ({
      label,
      value: display ?? nf.format(n),
      icon,
      tone,
      muted: n === 0,
    });
    const badge = (k: { label: MessageKey; bg: string; fg: string }): Badge => ({
      label: t(k.label),
      bg: k.bg,
      fg: k.fg,
    });
    const memberStatus = (st: string) => MEMBER_STATUS[st] ?? MEMBER_STATUS["membre"]!;
    const SAUGE: Tone = { bg: "var(--v2-sauge)", fg: "var(--v2-vert-pousse)" };
    const INFO: Tone = { bg: "var(--v2-info-bg)", fg: "var(--v2-info-fg)" };
    const ATTENTE: Tone = { bg: "var(--v2-attente-bg)", fg: "var(--v2-attente-fg)" };
    const CULTURE: Tone = { bg: "var(--v2-culture-bg)", fg: "var(--v2-culture-fg)" };
    const ERREUR: Tone = { bg: "var(--v2-erreur-bg)", fg: "var(--v2-erreur-fg)" };

    if (target.kind === "org") {
      const o = s.orgs.find((x) => x.id === target.id);
      if (!o) return null;
      const people = s.members
        .filter((m) => m.orgId === o.id)
        .sort((a, b) => `${a.lastName}${a.firstName}`.localeCompare(`${b.lastName}${b.firstName}`));
      const producers = this.base().producers.filter((p) => p.orgId === o.id).length;
      const active = people.filter((m) => m.status === "membre").length;
      return {
        title: o.name,
        subtitle: this.scoop()?.name ?? "",
        icon: "hub",
        badges: [
          o.type
            ? { label: o.type, ...(o.type === "GIE" ? INFO : CULTURE) }
            : { label: t("cooperatives.fiche.gie.toQualify"), ...ATTENTE },
        ],
        kpis: [
          kpi(t("cooperatives.fiche.detail.producers"), producers, "agriculture", SAUGE),
          kpi(t("cooperatives.fiche.detail.registered"), people.length, "group", INFO),
          kpi(t("cooperatives.fiche.detail.activeMembers"), active, "task_alt", CULTURE),
        ],
        facts: [
          fact(
            t("cooperatives.fiche.detail.type"),
            o.type ?? t("cooperatives.fiche.gie.toQualify"),
            "hub",
          ),
          fact(t("cooperatives.fiche.detail.village"), o.village, "location_on"),
        ],
        sections: [
          {
            title: t("cooperatives.fiche.detail.orgMembers"),
            icon: "group",
            count: people.length,
            empty: t("cooperatives.fiche.detail.orgMembersEmpty"),
            items: people.slice(0, DETAIL_ROWS).map((m) => ({
              label: `${m.firstName} ${m.lastName}`,
              sub: m.village,
              initials: initials(`${m.firstName} ${m.lastName}`),
              badge: badge(memberStatus(m.status)),
            })),
            more: Math.max(0, people.length - DETAIL_ROWS),
          },
        ],
        link: ["/dashboard/organisations", o.id],
      };
    }

    if (target.kind === "member") {
      const m = s.members.find((x) => x.id === target.id);
      if (!m) return null;
      const d = this.duesOf().map.get(m.id);
      const org = m.orgId ? s.orgs.find((o) => o.id === m.orgId) : null;
      const history = [...m.history].sort((a, b) => b.at.localeCompare(a.at));
      const dueTone = d && d.state !== "non exigible" ? DUE[d.state] : undefined;
      return {
        title: `${m.firstName} ${m.lastName}`,
        subtitle: [m.village, org?.name].filter(Boolean).join(" · "),
        icon: "person",
        badges: [
          badge(memberStatus(m.status)),
          ...(dueTone && d ? [{ label: d.state, ...dueTone }] : []),
        ],
        kpis: d
          ? [
              kpi(
                t("cooperatives.fiche.detail.paid"),
                d.paid,
                "check_circle",
                SAUGE,
                `${nf.format(d.paid)} F`,
              ),
              kpi(
                t("cooperatives.fiche.detail.balance"),
                d.balance,
                "payments",
                d.balance > 0 ? ERREUR : SAUGE,
                `${nf.format(d.balance)} F`,
              ),
            ]
          : [],
        facts: [
          fact(t("cooperatives.fiche.detail.phone"), this.store.phone(m.phone), "call"),
          fact(t("cooperatives.fiche.detail.email"), m.email, "mail"),
          fact(
            t("cooperatives.fiche.detail.org"),
            org?.name ?? t("cooperatives.fiche.detail.direct"),
            "hub",
          ),
          fact(
            t("cooperatives.fiche.detail.joined"),
            m.joinedAt ? fmtDate(m.joinedAt) : null,
            "calendar_today",
          ),
          fact(
            t("cooperatives.fiche.detail.age"),
            m.age === null ? null : t("cooperatives.fiche.detail.ageValue", { count: m.age }),
            "person",
          ),
          fact(
            t("cooperatives.fiche.detail.dues"),
            d && d.state !== "non exigible" ? d.state : null,
            "account_balance_wallet",
            { tone: dueTone },
          ),
        ],
        sections: [
          {
            title: t("cooperatives.fiche.detail.history"),
            icon: "event_note",
            count: history.length || null,
            empty: t("cooperatives.fiche.detail.historyEmpty"),
            items: history
              .slice(0, DETAIL_ROWS)
              .map((h) => ({ label: h.action, sub: `${fmtDate(h.at)} · ${h.by}` })),
            more: Math.max(0, history.length - DETAIL_ROWS),
          },
        ],
        link: m.producerId ? ["/dashboard/producteurs", m.producerId] : null,
      };
    }

    if (target.kind === "tech") {
      const u = s.users.find((x) => x.id === target.id);
      if (!u) return null;
      const scoops = s.scoops.filter((c) => u.scoopIds?.includes(c.id) || u.scoopId === c.id);
      const state = u.active
        ? { label: t("cooperatives.fiche.techniciens.active"), ...SAUGE }
        : {
            label: t("cooperatives.fiche.techniciens.closed"),
            bg: "var(--v2-lin)",
            fg: "var(--v2-gris-texte)",
          };
      return {
        title: u.name,
        subtitle: u.email,
        icon: "person",
        badges: [state],
        kpis: [kpi(t("cooperatives.fiche.detail.scoops"), scoops.length, "apartment", INFO)],
        facts: [
          fact(t("cooperatives.fiche.detail.email"), u.email, "mail", { wide: true }),
          fact(t("cooperatives.fiche.detail.phone"), this.store.phone(u.phone), "call"),
          fact(t("cooperatives.fiche.detail.account"), state.label, "account_circle", {
            tone: state,
          }),
        ],
        sections: [
          {
            title: t("cooperatives.fiche.detail.scoops"),
            icon: "apartment",
            count: scoops.length,
            empty: none,
            items: scoops.map((c) => ({
              label: c.name,
              sub: [c.commune, c.region].filter(Boolean).join(", "),
              initials: (c.code ?? c.name).slice(0, 3).toUpperCase(),
            })),
            more: 0,
          },
        ],
        link: null,
      };
    }

    const mt = s.meetings.find((x) => x.id === target.id);
    if (!mt) return null;
    const view = this.meetingView(mt);
    return {
      title: mt.title,
      subtitle: `${this.locale.formatDate(mt.date, { weekday: "long", day: "numeric", month: "long", year: "numeric" })} · ${mt.place}`,
      icon: "event",
      badges: [badge(view.status), { label: mt.kind, ...CULTURE }],
      kpis: [
        kpi(t("cooperatives.fiche.detail.agendaPoints"), mt.agenda.length, "fact_check", INFO),
        ...(mt.status === "tenue"
          ? [kpi(t("cooperatives.fiche.detail.present"), mt.presentIds.length, "group", SAUGE)]
          : []),
        ...(mt.status === "planifiée" && !view.past
          ? [
              kpi(
                t("cooperatives.fiche.detail.daysLeft"),
                Math.ceil((new Date(mt.date).getTime() - Date.now()) / 86_400_000),
                "calendar_today",
                ATTENTE,
              ),
            ]
          : []),
      ],
      facts: [
        fact(t("cooperatives.fiche.detail.date"), view.when, "calendar_today"),
        fact(t("cooperatives.fiche.detail.place"), mt.place, "location_on"),
        ...(mt.cancelReason
          ? [
              fact(t("cooperatives.fiche.detail.cancelReason"), mt.cancelReason, "warning", {
                wide: true,
              }),
            ]
          : []),
      ],
      sections: [
        {
          title: t("cooperatives.fiche.detail.agenda"),
          icon: "fact_check",
          count: null,
          empty: t("cooperatives.fiche.detail.agendaEmpty"),
          items: mt.agenda.map((a, i) => ({ label: a, index: i + 1 })),
          more: 0,
        },
      ],
      link: ["/dashboard/reunions", mt.id],
    };
  });
}
