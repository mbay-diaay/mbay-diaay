import { Component, computed, inject, signal, viewChildren } from "@angular/core";
import { RouterLink } from "@angular/router";

import { fmtDate, nf } from "@/lib/format";
import type { MessageKey } from "@/lib/i18n";
import { accountOf, managerOf, type AccountState } from "@/lib/scoop-account";
import { inScope } from "@/lib/scope";
import { blockingDossiers, generateScoopCode, scoopIssues, type ScoopInput } from "@/lib/scoops";
import { AppShellComponent } from "@shared/app-shell.component";
import { LocaleService } from "@shared/locale.service";
import { StoreService } from "@shared/store.service";
import {
  CollapsibleComponent,
  IconComponent,
  ModalComponent,
  PaginationComponent,
  SnackbarService,
  TextFieldComponent,
  type IconName,
} from "@shared/ui";
import { createPager } from "@shared/pager";

type Filter = "tous" | "active" | "archived" | "pending";
type View = "grid" | "list";
type FieldKey =
  "name" | "commune" | "code" | "managerFirstName" | "managerLastName" | "managerEmail";

const VIEW_KEY = "mbd.cooperatives.view";
const FIELD_ORDER: FieldKey[] = [
  "name",
  "commune",
  "managerFirstName",
  "managerLastName",
  "managerEmail",
];

/** Badge de l'état du compte gestionnaire (couleurs d'état de la charte V2). */
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

/**
 * Coopératives (charte V2) : statistiques, recherche + filtres, vue cartes ou liste,
 * création et modification (même fenêtre modale, contrôles champ par champ), archivage / réactivation.
 * Droits : lecture `scoop.manage` ou `org.read` ; création et archivage `scoop.manage`.
 */
@Component({
  selector: "app-cooperatives-page",
  imports: [
    PaginationComponent,
    RouterLink,
    AppShellComponent,
    IconComponent,
    ModalComponent,
    TextFieldComponent,
    CollapsibleComponent,
  ],
  host: { "(document:click)": "onDocumentClick($event)" },
  styles: `
    /* Code court généré (lecture seule), aligné sur les champs du formulaire. */
    .code-label {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--v2-ardoise);
    }
    .code-box {
      display: flex;
      height: 52px;
      align-items: center;
      margin-top: 8px;
      border-radius: 16px;
      border: 1.5px dashed var(--v2-gris-trait);
      background: var(--v2-creme);
      padding: 0 14px;
    }
    .code-chip {
      border-radius: 10px;
      background: var(--v2-foret);
      padding: 5px 12px;
      font-family: var(--v2-font-mono);
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--v2-citron);
    }
    .code-empty {
      font-size: 14px;
      font-weight: 500;
      color: var(--v2-gris-texte);
    }
    .code-hint {
      margin-top: 6px;
      font-size: 13px;
      font-weight: 500;
      color: var(--v2-gris-texte);
    }
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
    .stat {
      position: relative;
      overflow: hidden;
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
    }
    .stat:hover {
      transform: translateY(-2px);
      box-shadow: var(--v2-ombre-flottant);
    }
    .watermark {
      pointer-events: none;
      position: absolute;
      right: -18px;
      bottom: -26px;
      opacity: 0.12;
      transform: rotate(-12deg);
      transition: transform 0.35s ease;
    }
    .stat:hover .watermark {
      transform: rotate(-4deg) scale(1.06);
    }
    .btn {
      display: inline-flex;
      height: 48px;
      align-items: center;
      gap: 10px;
      border-radius: 16px;
      padding: 0 18px;
      font-size: 15px;
      font-weight: 800;
      cursor: pointer;
      transition:
        background-color 0.15s ease,
        border-color 0.15s ease;
    }
    .btn-primary {
      padding: 0 6px 0 18px;
      background: var(--v2-foret);
      color: var(--v2-blanc);
    }
    .btn-primary:hover {
      background: var(--v2-foret-clair);
    }
    .btn-ghost {
      border: 1.5px solid var(--v2-gris-trait);
      background: var(--v2-blanc);
      color: var(--v2-encre);
    }
    .btn-ghost:hover {
      border-color: var(--v2-gris-texte);
    }
    .btn-danger {
      background: var(--v2-erreur-fg);
      color: var(--v2-blanc);
    }
    .btn-danger:hover {
      background: color-mix(in oklab, var(--v2-erreur-fg) 85%, var(--v2-encre));
    }
    .chip {
      display: grid;
      height: 36px;
      width: 36px;
      place-items: center;
      border-radius: 12px;
      background: var(--v2-citron);
      color: var(--v2-foret);
    }
    .toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      padding: 8px;
      border-radius: 20px;
    }
    .search {
      display: flex;
      flex: 1 1 260px;
      min-width: 0;
      height: 48px;
      align-items: center;
      gap: 10px;
      border-radius: 14px;
      background: var(--v2-creme);
      padding: 0 14px;
      color: var(--v2-gris-texte);
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
    .seg {
      display: flex;
      gap: 4px;
      overflow-x: auto;
      scrollbar-width: none;
      border-radius: 14px;
      background: var(--v2-creme);
      padding: 4px;
    }
    .seg::-webkit-scrollbar {
      display: none;
    }
    .seg button {
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      gap: 7px;
      white-space: nowrap;
      border-radius: 10px;
      padding: 9px 14px;
      font-size: 14px;
      font-weight: 700;
      color: var(--v2-gris-texte);
      cursor: pointer;
    }
    .seg button:hover {
      color: var(--v2-encre);
    }
    .seg button.on {
      background: var(--v2-blanc);
      color: var(--v2-foret);
      box-shadow: 0 1px 3px color-mix(in oklab, var(--v2-foret) 15%, transparent);
    }
    .seg .n {
      border-radius: 999px;
      padding: 1px 7px;
      font-size: 12px;
      font-variant-numeric: tabular-nums;
      background: color-mix(in oklab, var(--v2-gris-trait) 45%, transparent);
      color: var(--v2-ardoise);
    }
    .seg button.on .n {
      background: var(--v2-foret);
      color: var(--v2-blanc);
    }
    .seg-icons button {
      padding: 9px 11px;
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
    .coop {
      position: relative;
      display: flex;
      flex-direction: column;
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        border-color 0.2s ease;
    }
    .coop:hover {
      transform: translateY(-2px);
      border-color: var(--v2-gris-trait);
      box-shadow: var(--v2-ombre-flottant);
    }
    .coop.archived {
      background: var(--v2-creme);
    }
    .monogram {
      display: grid;
      height: 52px;
      width: 52px;
      flex-shrink: 0;
      place-items: center;
      border-radius: 16px;
      background: var(--v2-foret);
      color: var(--v2-citron);
      font-family: var(--v2-font-mono);
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.04em;
    }
    .archived .monogram {
      background: var(--v2-gris-trait);
      color: var(--v2-blanc);
    }
    /* Chaîne SCOOP › GIE › Producteurs : trois maillons égaux reliés par un chevron. */
    .structure {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
    }
    .level {
      position: relative;
      border-radius: 16px;
      background: var(--v2-creme);
      padding: 12px;
    }
    /* Un 0 est une information (ex. aucun GIE) : affiché, mais en gris pour ne pas se confondre avec un vrai chiffre. */
    .zero {
      color: var(--v2-gris-trait) !important;
    }
    /* Même grille que les cartes de statistiques (1 → 2 → 4 colonnes, 16 px) : les colonnes s'alignent. */
    .network {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 16px;
    }
    @media (min-width: 640px) {
      .network {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    @media (min-width: 1280px) {
      .network {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }
    .level-lg {
      padding: 20px;
      border-radius: 24px;
      border: 1px solid var(--v2-bord-carte);
      background: var(--v2-blanc);
    }
    .level-hero {
      background: var(--v2-foret);
      color: var(--v2-blanc);
    }
    @media (max-width: 1279px) {
      .network .link-arrow {
        display: none;
      }
    }
    .network .link-arrow {
      right: -19px;
    }
    .link-arrow {
      position: absolute;
      right: -14px;
      top: 50%;
      z-index: 1;
      display: grid;
      height: 22px;
      width: 22px;
      place-items: center;
      transform: translateY(-50%);
      border-radius: 999px;
      border: 1px solid var(--v2-bord-carte);
      background: var(--v2-blanc);
      color: var(--v2-gris-texte);
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
    }
    .menu-btn {
      display: grid;
      height: 40px;
      width: 40px;
      place-items: center;
      border-radius: 12px;
      color: var(--v2-gris-texte);
      cursor: pointer;
    }
    .menu-btn:hover,
    .menu-btn.on {
      background: var(--v2-creme);
      color: var(--v2-encre);
    }
    .menu {
      position: absolute;
      right: 0;
      top: calc(100% + 6px);
      z-index: 30;
      width: 220px;
      border-radius: 16px;
      border: 1px solid var(--v2-bord-carte);
      background: var(--v2-blanc);
      padding: 6px;
      box-shadow: var(--v2-ombre-modale);
    }
    .menu a,
    .menu button {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 10px;
      border-radius: 10px;
      padding: 10px 12px;
      text-align: left;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
    .menu a:hover,
    .menu button:hover {
      background: var(--v2-sauge);
    }
    /* Boutons d'action du tableau : tuiles icônes, couleur selon l'action. */
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 4px;
    }
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
    .act:hover {
      border-color: var(--v2-foret);
      background: var(--v2-foret);
      color: var(--v2-citron);
    }
    .act-danger:hover {
      border-color: var(--v2-erreur-fg);
      background: var(--v2-erreur-bg);
      color: var(--v2-erreur-fg);
    }
    .act-ok:hover {
      border-color: var(--v2-vert-pousse);
      background: var(--v2-sauge);
      color: var(--v2-vert-pousse);
    }
    .act:focus-visible {
      outline: 2px solid var(--v2-foret);
      outline-offset: 2px;
    }
    .row {
      cursor: pointer;
      transition: background-color 0.15s ease;
    }
    .row:hover {
      background: var(--v2-creme);
    }
    .btn:focus-visible,
    .seg button:focus-visible,
    .coop-link:focus-visible,
    .menu-btn:focus-visible,
    .menu a:focus-visible,
    .menu button:focus-visible,
    .row:focus-visible {
      outline: 2px solid var(--v2-foret);
      outline-offset: 2px;
    }
    @media (prefers-reduced-motion: reduce) {
      .stat,
      .stat:hover,
      .coop,
      .coop:hover,
      .watermark {
        transition: none;
        transform: none;
      }
    }
  `,
  template: `
    <app-shell [perm]="perms" [area]="t()('cooperatives.area')">
      <!-- ───── En-tête ───── -->
      <header class="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div class="min-w-0">
          <p class="mono" style="color: var(--v2-gris-texte)">{{ t()("cooperatives.eyebrow") }}</p>
          <h1
            class="mt-2 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]"
          >
            {{ t()("cooperatives.title") }}
          </h1>
          <p class="mt-2 max-w-2xl text-[16px] font-medium" style="color: var(--v2-gris-texte)">
            {{ t()("cooperatives.description") }}
          </p>
        </div>
        <!-- Création réservée au droit scoop.manage (administrateur CRADESC, super administrateur). -->
        @if (canManage()) {
          <button type="button" class="btn btn-primary" (click)="openCreate()">
            {{ t()("cooperatives.new") }}
            <span class="chip"><ui-icon name="add_business" [size]="20" /></span>
          </button>
        }
      </header>

      <!-- ───── Structure du réseau : Faîtière › Coopératives › GIE › Producteurs ───── -->
      <section class="mt-8">
        <ui-collapsible
          [title]="t()('cooperatives.network.title')"
          [subtitle]="t()('cooperatives.network.subtitle')"
          icon="account_balance"
          storageKey="mbd.cooperatives.network"
        >
          <!-- Résumé quand la section est fermée -->
          <div collapsible-summary class="flex flex-wrap items-center gap-2">
            @for (level of network(); track level.key; let last = $last) {
              <span
                class="badge"
                [style.background]="level.key === 'faitiere' ? 'var(--v2-foret)' : level.bg"
                [style.color]="level.key === 'faitiere' ? 'var(--v2-citron)' : level.fg"
              >
                <ui-icon [name]="level.icon" [size]="14" />
                <span class="font-extrabold">{{ level.value }}</span>
                @if (level.key !== "faitiere") {
                  <span class="font-semibold opacity-80">{{ level.title }}</span>
                }
              </span>
              @if (!last) {
                <ui-icon name="chevron_right" [size]="16" style="color: var(--v2-gris-trait)" />
              }
            }
          </div>
          <ol class="network">
            @for (level of network(); track level.key; let last = $last) {
              <li class="level level-lg" [class.level-hero]="level.key === 'faitiere'">
                <span class="flex items-center gap-2.5">
                  <span
                    class="grid size-10 shrink-0 place-items-center rounded-[12px]"
                    [style.background]="level.bg"
                    [style.color]="level.fg"
                  >
                    <ui-icon [name]="level.icon" [size]="20" />
                  </span>
                  <span
                    class="mono"
                    [style.color]="
                      level.key === 'faitiere' ? 'var(--v2-citron)' : 'var(--v2-ardoise)'
                    "
                    >{{ level.title }}</span
                  >
                </span>
                <span
                  class="mt-3 block text-[28px] font-extrabold leading-none tracking-[-0.03em] tabular-nums"
                  [class.zero]="level.zero"
                >
                  {{ level.value
                  }}<span class="ml-1.5 text-[13px] font-semibold opacity-70">{{
                    level.unit
                  }}</span>
                </span>
                <span
                  class="mt-1.5 block text-[12.5px] font-medium leading-snug"
                  [style.opacity]="0.75"
                  >{{ level.sub }}</span
                >
                @if (!last) {
                  <span class="link-arrow" aria-hidden="true"
                    ><ui-icon name="chevron_right" [size]="18"
                  /></span>
                }
              </li>
            }
          </ol>
        </ui-collapsible>
      </section>

      <!-- ───── Statistiques (aplats, filigrane) ───── -->
      <section
        class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        [attr.aria-label]="t()('cooperatives.title')"
      >
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
              >
                <ui-icon [name]="stat.icon" [size]="20" />
              </span>
            </div>
            <span
              class="relative mt-3 text-[34px] font-extrabold leading-none tracking-[-0.03em] tabular-nums"
              >{{ stat.value }}</span
            >
            <span class="relative mt-2 truncate text-[13px] font-medium" [style.opacity]="0.75">{{
              stat.sub
            }}</span>
          </div>
        }
      </section>

      <!-- ───── Recherche · filtres · affichage ───── -->
      <div class="toolbar card mt-6">
        <label class="search">
          <ui-icon name="search" [size]="20" />
          <input
            type="search"
            [placeholder]="t()('cooperatives.search.placeholder')"
            [attr.aria-label]="t()('cooperatives.search.aria')"
            [value]="q()"
            (input)="q.set($any($event.target).value)"
          />
        </label>
        <div class="seg" role="tablist" [attr.aria-label]="t()('cooperatives.title')">
          @for (filterButton of filterButtons(); track filterButton.id) {
            <button
              type="button"
              role="tab"
              [class.on]="filter() === filterButton.id"
              [attr.aria-selected]="filter() === filterButton.id"
              (click)="filter.set(filterButton.id)"
            >
              {{ filterButton.label }}<span class="n">{{ filterButton.count }}</span>
            </button>
          }
        </div>
        <div
          class="seg seg-icons"
          role="radiogroup"
          [attr.aria-label]="t()('cooperatives.view.aria')"
        >
          <button
            type="button"
            role="radio"
            [class.on]="view() === 'grid'"
            [attr.aria-checked]="view() === 'grid'"
            [attr.title]="t()('cooperatives.view.grid')"
            [attr.aria-label]="t()('cooperatives.view.grid')"
            (click)="setView('grid')"
          >
            <ui-icon name="grid_view" [size]="20" />
          </button>
          <button
            type="button"
            role="radio"
            [class.on]="view() === 'list'"
            [attr.aria-checked]="view() === 'list'"
            [attr.title]="t()('cooperatives.view.list')"
            [attr.aria-label]="t()('cooperatives.view.list')"
            (click)="setView('list')"
          >
            <ui-icon name="view_list" [size]="20" />
          </button>
        </div>
      </div>

      <p class="sub mt-4" aria-live="polite">{{ countLabel() }}</p>

      @if (shown().length === 0) {
        <div class="card mt-3 flex flex-col items-center gap-3 p-10 text-center">
          <span
            class="grid size-14 place-items-center rounded-[16px]"
            style="background: var(--v2-sauge); color: var(--v2-foret)"
            ><ui-icon name="search" [size]="26"
          /></span>
          <p class="text-[15px] font-semibold" style="color: var(--v2-ardoise)">
            {{
              rows().length ? t()("cooperatives.empty.filtered") : t()("cooperatives.empty.none")
            }}
          </p>
        </div>
      } @else if (view() === "grid") {
        <!-- ───── Vue cartes ───── -->
        <div class="mt-3 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          @for (row of pager.items(); track row.scoop.id) {
            <article class="card coop" [class.archived]="row.scoop.archived">
              <div class="flex items-start gap-4 p-5 pb-4">
                <a
                  class="coop-link flex min-w-0 flex-1 items-start gap-4 rounded-[14px]"
                  [routerLink]="['/dashboard/cooperatives', row.scoop.id]"
                >
                  <span class="monogram" aria-hidden="true">{{ row.mono }}</span>
                  <span class="min-w-0">
                    <span
                      class="block text-[17px] font-extrabold leading-snug tracking-[-0.01em]"
                      >{{ row.scoop.name }}</span
                    >
                    @if (row.place) {
                      <span class="sub mt-0.5 flex items-center gap-1 truncate">
                        <ui-icon name="location_on" [size]="15" />{{ row.place }}
                      </span>
                    }
                  </span>
                </a>
                <div class="relative" data-card-menu>
                  <button
                    type="button"
                    class="menu-btn"
                    [class.on]="menuFor() === row.scoop.id"
                    [attr.aria-label]="t()('cooperatives.row.actions', { name: row.scoop.name })"
                    [attr.aria-expanded]="menuFor() === row.scoop.id"
                    aria-haspopup="menu"
                    (click)="toggleMenu(row.scoop.id, $event)"
                  >
                    <ui-icon name="more_horiz" [size]="22" />
                  </button>
                  @if (menuFor() === row.scoop.id) {
                    <div class="menu" role="menu">
                      <a role="menuitem" [routerLink]="['/dashboard/cooperatives', row.scoop.id]"
                        ><ui-icon name="open_in_new" [size]="18" />{{
                          t()("cooperatives.row.open")
                        }}</a
                      >
                      @if (canManage()) {
                        <button type="button" role="menuitem" (click)="openEdit(row.scoop.id)">
                          <ui-icon name="edit" [size]="18" />{{ t()("cooperatives.row.edit") }}
                        </button>
                        @if (row.scoop.archived) {
                          <button type="button" role="menuitem" (click)="restore(row.scoop.id)">
                            <ui-icon name="unarchive" [size]="18" />{{
                              t()("cooperatives.row.restore")
                            }}
                          </button>
                        } @else {
                          <button
                            type="button"
                            role="menuitem"
                            style="color: var(--v2-erreur-fg)"
                            (click)="askArchive(row.scoop.id)"
                          >
                            <ui-icon name="archive" [size]="18" />{{
                              t()("cooperatives.row.archive")
                            }}
                          </button>
                        }
                      }
                    </div>
                  }
                </div>
              </div>

              <div class="flex flex-wrap gap-2 px-5">
                @if (row.scoop.archived) {
                  <span class="badge" style="background: var(--v2-lin); color: var(--v2-gris-texte)"
                    ><ui-icon name="archive" [size]="14" />{{
                      t()("cooperatives.status.archived")
                    }}</span
                  >
                } @else {
                  <span
                    class="badge"
                    style="background: var(--v2-sauge); color: var(--v2-vert-pousse)"
                    ><ui-icon name="check_circle" [size]="14" />{{
                      t()("cooperatives.status.active")
                    }}</span
                  >
                }
                @if (row.isNew) {
                  <span class="badge" style="background: var(--v2-foret); color: var(--v2-citron)"
                    ><ui-icon name="north_east" [size]="14" />{{
                      t()("cooperatives.badge.new")
                    }}</span
                  >
                }
                @if (row.scoop.code) {
                  <span
                    class="badge"
                    style="background: var(--v2-creme); color: var(--v2-ardoise); font-family: var(--v2-font-mono)"
                    >{{ row.scoop.code }}</span
                  >
                }
              </div>

              <!-- Structure : SCOOP › GIE › Producteurs -->
              <ol
                class="structure mt-4 px-5"
                [attr.aria-label]="t()('cooperatives.structure.aria')"
              >
                @for (level of row.structure; track level.key; let last = $last) {
                  <li class="level">
                    <span class="flex items-center gap-2">
                      <span
                        class="grid size-8 shrink-0 place-items-center rounded-[10px]"
                        [style.background]="level.bg"
                        [style.color]="level.fg"
                      >
                        <ui-icon [name]="level.icon" [size]="17" />
                      </span>
                      <span class="mono" style="color: var(--v2-ardoise)">{{ level.title }}</span>
                    </span>
                    <span
                      class="mt-2 block text-[22px] font-extrabold leading-none tracking-[-0.02em] tabular-nums"
                      [class.zero]="level.zero"
                    >
                      {{ level.value
                      }}<span
                        class="ml-1 text-[12px] font-semibold"
                        style="color: var(--v2-gris-texte)"
                        >{{ level.unit }}</span
                      >
                    </span>
                    <span
                      class="mt-1 block text-[11.5px] font-medium leading-snug"
                      style="color: var(--v2-gris-texte)"
                      >{{ level.sub }}</span
                    >
                    @if (!last) {
                      <span class="link-arrow" aria-hidden="true"
                        ><ui-icon name="chevron_right" [size]="18"
                      /></span>
                    }
                  </li>
                }
              </ol>

              <div class="mt-4 px-5">
                <div class="flex items-center justify-between text-[13px] font-semibold">
                  <span style="color: var(--v2-ardoise)">{{
                    t()("cooperatives.card.quality")
                  }}</span>
                  <span class="font-extrabold tabular-nums">{{ row.quality }} %</span>
                </div>
                <div class="bar mt-1.5">
                  <span
                    [style.width.%]="row.quality"
                    [style.background]="
                      row.quality >= 70 ? 'var(--v2-vert-pousse)' : 'var(--v2-soleil)'
                    "
                  ></span>
                </div>
              </div>

              <div
                class="mt-auto flex items-center gap-3 border-t px-5 py-4"
                style="border-color: var(--v2-separateur); margin-top: 18px"
              >
                <span
                  class="grid size-10 shrink-0 place-items-center rounded-full text-[12px] font-extrabold"
                  style="background: var(--v2-sauge); color: var(--v2-foret)"
                  >{{ row.managerInitials || "—" }}</span
                >
                <span class="min-w-0 flex-1">
                  <span class="block truncate text-[14px] font-bold">{{
                    row.manager?.name ?? t()("cooperatives.account.none")
                  }}</span>
                  <span class="sub block truncate">{{
                    row.manager?.email ?? t()("cooperatives.fiche.managerNone")
                  }}</span>
                </span>
                @if (row.manager) {
                  <span
                    class="badge"
                    [style.background]="account(row.account).bg"
                    [style.color]="account(row.account).fg"
                    >{{ t()(account(row.account).label) }}</span
                  >
                }
              </div>
            </article>
          }
        </div>
        <ui-pagination [pager]="pager" />
      } @else {
        <!-- ───── Vue liste ───── -->
        <div class="card mt-3 overflow-x-auto">
          <table class="w-full min-w-[820px] text-left text-[14px]">
            <thead>
              <tr class="mono" style="color: var(--v2-gris-texte)">
                <th class="px-5 py-3 font-bold">{{ t()("cooperatives.col.name") }}</th>
                <th class="px-3 py-3 font-bold">{{ t()("cooperatives.col.status") }}</th>
                <th class="px-2.5 py-3 text-right font-bold">
                  {{ t()("cooperatives.structure.gie") }}
                </th>
                <th class="px-2.5 py-3 text-right font-bold">
                  {{ t()("cooperatives.col.producers") }}
                </th>
                <th class="px-2.5 py-3 text-right font-bold">
                  {{ t()("cooperatives.col.members") }}
                </th>
                <th class="px-3 py-3 font-bold">{{ t()("cooperatives.card.quality") }}</th>
                <th class="px-5 py-3 font-bold">{{ t()("cooperatives.col.manager") }}</th>
                <th class="py-3 pl-2 pr-4 text-right font-bold">
                  {{ t()("cooperatives.col.actions") }}
                </th>
              </tr>
            </thead>
            <tbody>
              @for (row of pager.items(); track row.scoop.id) {
                <tr
                  class="row"
                  tabindex="0"
                  [routerLink]="['/dashboard/cooperatives', row.scoop.id]"
                  style="border-top: 1px solid var(--v2-separateur)"
                >
                  <td class="px-5 py-3.5">
                    <span class="flex items-center gap-3">
                      <span
                        class="monogram"
                        style="height: 40px; width: 40px; border-radius: 12px; font-size: 12px"
                        aria-hidden="true"
                        >{{ row.mono }}</span
                      >
                      <span class="min-w-0">
                        <span class="block truncate font-bold">{{ row.scoop.name }}</span>
                        @if (row.place) {
                          <span class="sub block truncate">{{ row.place }}</span>
                        }
                      </span>
                    </span>
                  </td>
                  <td class="px-3 py-3.5">
                    @if (row.scoop.archived) {
                      <span
                        class="badge"
                        style="background: var(--v2-lin); color: var(--v2-gris-texte)"
                        >{{ t()("cooperatives.status.archived") }}</span
                      >
                    } @else {
                      <span
                        class="badge"
                        style="background: var(--v2-sauge); color: var(--v2-vert-pousse)"
                        >{{ t()("cooperatives.status.active") }}</span
                      >
                    }
                  </td>
                  <td
                    class="px-3 py-3.5 text-right font-semibold tabular-nums"
                    [class.zero]="!row.gie"
                  >
                    {{ nf.format(row.gie) }}
                  </td>
                  <td
                    class="px-3 py-3.5 text-right font-extrabold tabular-nums"
                    [class.zero]="!row.producers"
                  >
                    {{ nf.format(row.producers) }}
                  </td>
                  <td
                    class="px-3 py-3.5 text-right font-semibold tabular-nums"
                    [class.zero]="!row.members"
                  >
                    {{ nf.format(row.members) }}
                  </td>
                  <td class="px-3 py-3.5">
                    <span class="flex items-center gap-2">
                      <span class="bar w-14"
                        ><span
                          [style.width.%]="row.quality"
                          [style.background]="
                            row.quality >= 70 ? 'var(--v2-vert-pousse)' : 'var(--v2-soleil)'
                          "
                        ></span
                      ></span>
                      <span class="whitespace-nowrap text-[13px] font-bold tabular-nums"
                        >{{ row.quality }} %</span
                      >
                    </span>
                  </td>
                  <td class="px-5 py-3.5">
                    <span class="block max-w-[160px] truncate font-semibold">{{
                      row.manager?.name ?? "—"
                    }}</span>
                    @if (row.manager) {
                      <span
                        class="badge mt-1"
                        [style.background]="account(row.account).bg"
                        [style.color]="account(row.account).fg"
                        >{{ t()(account(row.account).label) }}</span
                      >
                    }
                  </td>
                  <td class="py-3.5 pl-2 pr-4" (click)="$event.stopPropagation()">
                    <span class="actions">
                      <a
                        class="act"
                        [routerLink]="['/dashboard/cooperatives', row.scoop.id]"
                        [attr.aria-label]="t()('cooperatives.row.open') + ' · ' + row.scoop.name"
                        [attr.title]="t()('cooperatives.row.open')"
                      >
                        <ui-icon name="visibility" [size]="18" />
                      </a>
                      @if (canManage()) {
                        <button
                          type="button"
                          class="act"
                          [attr.aria-label]="t()('cooperatives.row.edit') + ' · ' + row.scoop.name"
                          [attr.title]="t()('cooperatives.row.edit')"
                          (click)="openEdit(row.scoop.id)"
                        >
                          <ui-icon name="edit" [size]="18" />
                        </button>
                        @if (row.scoop.archived) {
                          <button
                            type="button"
                            class="act act-ok"
                            [attr.aria-label]="
                              t()('cooperatives.row.restore') + ' · ' + row.scoop.name
                            "
                            [attr.title]="t()('cooperatives.row.restore')"
                            (click)="restore(row.scoop.id)"
                          >
                            <ui-icon name="unarchive" [size]="18" />
                          </button>
                        } @else {
                          <button
                            type="button"
                            class="act act-danger"
                            [attr.aria-label]="
                              t()('cooperatives.row.archive') + ' · ' + row.scoop.name
                            "
                            [attr.title]="t()('cooperatives.row.archive')"
                            (click)="askArchive(row.scoop.id)"
                          >
                            <ui-icon name="archive" [size]="18" />
                          </button>
                        }
                      }
                    </span>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <ui-pagination class="px-4 pb-4" [pager]="pager" />
      }

      <!-- ───── Créer une coopérative ───── -->
      <ui-modal
        [open]="createOpen()"
        [title]="
          formMode() === 'edit' ? t()('cooperatives.edit.title') : t()('cooperatives.create.title')
        "
        [description]="
          formMode() === 'edit'
            ? t()('cooperatives.edit.description')
            : t()('cooperatives.create.description')
        "
        [icon]="formMode() === 'edit' ? 'edit' : 'add_business'"
        [closeLabel]="t()('cooperatives.form.cancel')"
        (closed)="createOpen.set(false)"
      >
        <form
          id="create-scoop"
          class="space-y-5 pb-4"
          novalidate
          (submit)="$event.preventDefault(); submitForm()"
        >
          <ui-text-field
            #f_name
            preset="scoopName"
            [label]="t()('cooperatives.form.name')"
            [value]="form().name"
            (valueChange)="patch('name', $event)"
            [error]="errors().name ?? ''"
          />
          <div class="grid gap-5 sm:grid-cols-2">
            <ui-text-field
              #f_commune
              preset="commune"
              [label]="t()('cooperatives.form.commune')"
              [value]="form().commune"
              (valueChange)="patch('commune', $event)"
              [error]="errors().commune ?? ''"
            />
            <!-- Code court : jamais saisi, généré à partir du nom (création) ou conservé (modification). -->
            <div>
              <p class="code-label">{{ t()("cooperatives.form.code") }}</p>
              <div class="code-box" aria-live="polite">
                @if (shownCode(); as code) {
                  <span class="code-chip">{{ code }}</span>
                } @else {
                  <span class="code-empty">{{ t()("cooperatives.form.codeWaiting") }}</span>
                }
              </div>
              <p class="code-hint">{{ formMode() === "edit" ? t()("cooperatives.form.codeKept") : t()("cooperatives.form.codeAuto") }}</p>
            </div>
          </div>
          <ui-text-field
            preset="region"
            [label]="t()('cooperatives.form.region')"
            [optional]="t()('cooperatives.form.regionOptional')"
            [value]="form().region"
            (valueChange)="patch('region', $event)"
          />

          @if (formMode() === "create") {
            <div class="rounded-[20px] p-5" style="background: var(--v2-creme)">
              <p class="flex items-center gap-2 text-[15px] font-extrabold">
                <ui-icon name="person_add" [size]="20" />{{ t()("cooperatives.form.manager") }}
              </p>
              <p class="sub mt-1">{{ t()("cooperatives.form.managerHint") }}</p>
              <div class="mt-4 grid gap-5 sm:grid-cols-2">
                <ui-text-field
                  #f_managerFirstName
                  preset="firstName"
                  [label]="t()('cooperatives.form.managerFirstName')"
                  [value]="form().managerFirstName"
                  (valueChange)="patch('managerFirstName', $event)"
                  [error]="errors().managerFirstName ?? ''"
                />
                <ui-text-field
                  #f_managerLastName
                  preset="lastName"
                  [label]="t()('cooperatives.form.managerLastName')"
                  [value]="form().managerLastName"
                  (valueChange)="patch('managerLastName', $event)"
                  [error]="errors().managerLastName ?? ''"
                />
              </div>
              <ui-text-field
                #f_managerEmail
                class="mt-5"
                preset="email"
                [label]="t()('cooperatives.form.managerEmail')"
                [value]="form().managerEmail"
                (valueChange)="patch('managerEmail', $event)"
                [error]="errors().managerEmail ?? ''"
              />
            </div>
          }
        </form>
        <div modal-footer class="contents">
          <button type="button" class="btn btn-ghost" (click)="createOpen.set(false)">
            {{ t()("cooperatives.form.cancel") }}
          </button>
          <button type="submit" form="create-scoop" class="btn btn-primary">
            {{
              formMode() === "edit"
                ? t()("cooperatives.edit.submit")
                : t()("cooperatives.create.submit")
            }}
            <span class="chip"
              ><ui-icon [name]="formMode() === 'edit' ? 'check' : 'mark_email_unread'" [size]="20"
            /></span>
          </button>
        </div>
      </ui-modal>

      <!-- ───── Archiver ───── -->
      @if (archiveTarget(); as archiveInfo) {
        <ui-modal
          [open]="true"
          [title]="
            archiveInfo.blocked
              ? t()('cooperatives.blocked.title')
              : t()('cooperatives.archive.title')
          "
          [description]="archiveInfo.description"
          [icon]="archiveInfo.blocked ? 'warning' : 'archive'"
          tone="danger"
          [width]="520"
          [closeLabel]="t()('cooperatives.blocked.close')"
          (closed)="archiveTarget.set(null)"
        >
          @if (!archiveInfo.blocked) {
            <p
              class="mb-4 flex items-center gap-2 rounded-[14px] p-3 text-[14px] font-semibold"
              style="background: var(--v2-attente-bg); color: var(--v2-attente-fg)"
            >
              <ui-icon name="person" [size]="18" />{{ archiveInfo.accounts }}
            </p>
          }
          <div modal-footer class="contents">
            <button type="button" class="btn btn-ghost" (click)="archiveTarget.set(null)">
              {{ t()("cooperatives.form.cancel") }}
            </button>
            @if (archiveInfo.blocked) {
              <a
                class="btn btn-primary"
                routerLink="/dashboard/dossiers"
                (click)="archiveTarget.set(null)"
              >
                {{ t()("cooperatives.blocked.submit")
                }}<span class="chip"><ui-icon name="arrow_forward" [size]="20" /></span>
              </a>
            } @else {
              <button type="button" class="btn btn-danger" (click)="confirmArchive(archiveInfo.id)">
                <ui-icon name="archive" [size]="20" />{{ t()("cooperatives.archive.submit") }}
              </button>
            }
          </div>
        </ui-modal>
      }
    </app-shell>
  `,
})
export default class CooperativesPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  private readonly snackbar = inject(SnackbarService);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly perms = ["scoop.manage", "org.read"] as const;

  protected readonly q = signal("");
  protected readonly filter = signal<Filter>("tous");
  protected readonly view = signal<View>(readView());
  protected readonly menuFor = signal<string | null>(null);
  protected readonly createOpen = signal(false);
  protected readonly archiveTarget = signal<{
    id: string;
    blocked: boolean;
    description: string;
    accounts: string;
  } | null>(null);

  protected readonly canManage = computed(() => this.store.can("scoop.manage"));

  protected readonly rows = computed(() => {
    const s = this.store.state();
    const session = s.session;
    const now = Date.now();
    const since = now - 90 * 86_400_000;
    const scoops = s.scoops.filter((c) => inScope([{ scoopId: c.id }], session).length === 1);
    const t = this.t();
    return scoops.map((scoop) => {
      const producers = s.producers.filter((p) => p.scoopId === scoop.id && !p.mergedInto);
      const members = s.members.filter(
        (m) => m.scoopId === scoop.id && m.status === "membre",
      ).length;
      const scoopOrgs = s.orgs.filter((o) => o.scoopId === scoop.id);
      const orgs = scoopOrgs.length;
      const gie = scoopOrgs.filter((o) => o.type === "GIE").length;
      const manager = managerOf(s.users, scoop.id);
      const account = accountOf(manager, now);
      const quality = producers.length
        ? Math.round(
            (producers.filter((p) => p.quality === "validé").length / producers.length) * 100,
          )
        : 0;
      return {
        scoop,
        producers: producers.length,
        members,
        manager,
        account,
        quality,
        pending: !scoop.archived && (account === "invited" || account === "expired"),
        isNew: !!scoop.createdAt && new Date(scoop.createdAt).getTime() >= since,
        mono: (scoop.code ?? scoop.name.replace(/[^A-Za-zÀ-ÿ]/g, "").slice(0, 3))
          .toUpperCase()
          .slice(0, 4),
        // La commune n'est utile que si elle diffère du nom (dans les données, elles sont souvent identiques).
        place: [scoop.commune !== scoop.name ? scoop.commune : "", scoop.region]
          .filter(Boolean)
          .join(", "),
        managerInitials: manager
          ? manager.name
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()
          : "",
        gie,
        // Lecture « du collectif à l'exploitant » : SCOOP › GIE › Producteurs.
        structure: [
          {
            key: "scoop",
            icon: "diversity_3" as IconName,
            title: t("cooperatives.structure.scoop"),
            value: nf.format(members),
            zero: members === 0,
            unit: t("cooperatives.structure.membersUnit"),
            sub: t("cooperatives.structure.scoopSub"),
            bg: "var(--v2-foret)",
            fg: "var(--v2-citron)",
          },
          {
            key: "gie",
            icon: "hub" as IconName,
            title: t("cooperatives.structure.gie"),
            value: nf.format(gie),
            zero: gie === 0,
            unit: orgs > gie ? t("cooperatives.structure.orgsUnit", { count: orgs }) : "",
            sub: t("cooperatives.structure.gieSub"),
            bg: "var(--v2-info-bg)",
            fg: "var(--v2-info-fg)",
          },
          {
            key: "producers",
            icon: "agriculture" as IconName,
            title: t("cooperatives.structure.producers"),
            value: nf.format(producers.length),
            zero: producers.length === 0,
            unit: "",
            sub: t("cooperatives.structure.producersSub"),
            bg: "var(--v2-sauge)",
            fg: "var(--v2-vert-pousse)",
          },
        ],
      };
    });
  });

  protected readonly stats = computed(() => {
    const t = this.t();
    const rows = this.rows();
    const active = rows.filter((r) => !r.scoop.archived);
    const fresh = rows.filter((r) => r.isNew).length;
    return [
      {
        label: t("cooperatives.kpi.active"),
        value: nf.format(active.length),
        sub: fresh
          ? t("cooperatives.kpi.activeNew", { count: fresh })
          : t("cooperatives.kpi.activeSub", { total: rows.length }),
        icon: "diversity_3" as IconName,
        bg: "",
        fg: "",
      },
      {
        label: t("cooperatives.kpi.pending"),
        value: nf.format(rows.filter((r) => r.pending).length),
        sub: t("cooperatives.kpi.pendingSub"),
        icon: "mark_email_unread" as IconName,
        bg: "var(--v2-attente-bg)",
        fg: "var(--v2-attente-fg)",
      },
      {
        label: t("cooperatives.kpi.members"),
        value: nf.format(rows.reduce((n, r) => n + r.members, 0)),
        sub: t("cooperatives.kpi.membersSub"),
        icon: "group" as IconName,
        bg: "var(--v2-info-bg)",
        fg: "var(--v2-info-fg)",
      },
      {
        label: t("cooperatives.kpi.archived"),
        value: nf.format(rows.length - active.length),
        sub: t("cooperatives.kpi.archivedSub"),
        icon: "archive" as IconName,
        bg: "var(--v2-culture-bg)",
        fg: "var(--v2-culture-fg)",
      },
    ];
  });

  /** Pyramide du réseau : la faîtière fédère les coopératives, qui regroupent des GIE et des producteurs. */
  protected readonly network = computed(() => {
    const t = this.t();
    const rows = this.rows().filter((r) => !r.scoop.archived);
    const gie = rows.reduce((n, r) => n + r.gie, 0);
    const producers = rows.reduce((n, r) => n + r.producers, 0);
    return [
      {
        key: "faitiere",
        icon: "account_balance" as IconName,
        title: t("cooperatives.network.faitiere"),
        value: t("cooperatives.network.faitiereName"),
        zero: false,
        unit: "",
        sub: t("cooperatives.network.faitiereSub"),
        bg: "var(--v2-citron)",
        fg: "var(--v2-foret)",
      },
      {
        key: "scoops",
        icon: "diversity_3" as IconName,
        title: t("cooperatives.structure.scoop"),
        value: nf.format(rows.length),
        zero: rows.length === 0,
        unit: "",
        sub: t("cooperatives.structure.scoopSub"),
        bg: "var(--v2-foret)",
        fg: "var(--v2-citron)",
      },
      {
        key: "gie",
        icon: "hub" as IconName,
        title: t("cooperatives.structure.gie"),
        value: nf.format(gie),
        zero: gie === 0,
        unit: "",
        sub: t("cooperatives.structure.gieSub"),
        bg: "var(--v2-info-bg)",
        fg: "var(--v2-info-fg)",
      },
      {
        key: "producers",
        icon: "agriculture" as IconName,
        title: t("cooperatives.structure.producers"),
        value: nf.format(producers),
        zero: producers === 0,
        unit: "",
        sub: t("cooperatives.structure.producersSub"),
        bg: "var(--v2-sauge)",
        fg: "var(--v2-vert-pousse)",
      },
    ];
  });

  protected readonly filterButtons = computed(() => {
    const t = this.t();
    const rows = this.rows();
    return [
      { id: "tous" as const, label: t("cooperatives.filter.all"), count: rows.length },
      {
        id: "active" as const,
        label: t("cooperatives.filter.active"),
        count: rows.filter((r) => !r.scoop.archived).length,
      },
      {
        id: "archived" as const,
        label: t("cooperatives.filter.archived"),
        count: rows.filter((r) => !!r.scoop.archived).length,
      },
      {
        id: "pending" as const,
        label: t("cooperatives.filter.pending"),
        count: rows.filter((r) => r.pending).length,
      },
    ];
  });

  protected readonly shown = computed(() => {
    const norm = (v: string) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    const needle = norm(this.q().trim());
    const f = this.filter();
    return this.rows().filter((r) => {
      const okFilter =
        f === "tous" ||
        (f === "active" && !r.scoop.archived) ||
        (f === "archived" && !!r.scoop.archived) ||
        (f === "pending" && r.pending);
      const okQ =
        !needle ||
        norm(
          `${r.scoop.name} ${r.scoop.code ?? ""} ${r.scoop.commune} ${r.manager?.name ?? ""}`,
        ).includes(needle);
      return okFilter && okQ;
    });
  });

  protected readonly countLabel = computed(() => {
    const n = this.shown().length;
    return this.t()(n > 1 ? "cooperatives.count.autre" : "cooperatives.count.un", {
      count: n,
      total: this.rows().length,
    });
  });

  protected account(a: AccountState) {
    return ACCOUNT[a];
  }

  protected setView(v: View): void {
    this.view.set(v);
    try {
      window.localStorage.setItem(VIEW_KEY, v);
    } catch {
      /* stockage indisponible : l'affichage n'est pas mémorisé */
    }
  }

  protected toggleMenu(id: string, e: Event): void {
    e.stopPropagation();
    this.menuFor.update((cur) => (cur === id ? null : id));
  }

  protected onDocumentClick(e: MouseEvent): void {
    if (this.menuFor() && !(e.target as Element).closest?.("[data-card-menu]"))
      this.menuFor.set(null);
  }

  // ───── Création ─────
  private readonly emptyForm = {
    name: "",
    commune: "",
    code: "",
    region: "",
    managerFirstName: "",
    managerLastName: "",
    managerEmail: "",
  };
  protected readonly form = signal({ ...this.emptyForm });
  protected readonly errors = signal<Partial<Record<FieldKey, string>>>({});
  private readonly fields = viewChildren(TextFieldComponent);

  /** Le même formulaire sert à créer et à modifier (sans le bloc gestionnaire, qui ne change pas). */
  protected readonly formMode = signal<"create" | "edit">("create");
  private readonly editId = signal<string | null>(null);

  protected openCreate(): void {
    this.formMode.set("create");
    this.editId.set(null);
    this.form.set({ ...this.emptyForm });
    this.errors.set({});
    this.createOpen.set(true);
  }

  protected openEdit(id: string): void {
    this.menuFor.set(null);
    const scoop = this.store.state().scoops.find((x) => x.id === id);
    if (!scoop) return;
    this.formMode.set("edit");
    this.editId.set(id);
    this.form.set({
      ...this.emptyForm,
      name: scoop.name,
      commune: scoop.commune,
      code: scoop.code ?? "",
      region: scoop.region ?? "",
    });
    this.errors.set({});
    this.createOpen.set(true);
  }

  protected submitForm(): void {
    if (this.formMode() === "edit") this.submitEdit();
    else this.submitCreate();
  }

  /** Erreurs champ par champ : bordure rouge + message sous le champ, focus sur le premier, résumé en snackbar. */
  private showIssues(issues: { field: string; key: string }[]): void {
    const errs: Partial<Record<FieldKey, string>> = {};
    // Le code est généré à partir du nom : un problème de code se corrige en changeant le nom.
    for (const i of issues)
      errs[(i.field === "code" ? "name" : i.field) as FieldKey] ??= this.t()(i.key as MessageKey);
    this.errors.set(errs);
    const first = FIELD_ORDER.findIndex((k) => errs[k]);
    const order = [0, 1, 3, 4, 5]; // index des ui-text-field (la région est en 2)
    this.fields()[order[first] ?? 0]?.focus();
    this.snackbar.error(errs[FIELD_ORDER[first]!]!);
  }

  private submitEdit(): void {
    const id = this.editId();
    if (!id) return;
    const s = this.store.state();
    const input = this.input();
    const issues = scoopIssues(input, s.scoops, [], { checkManager: false, ignore: id });
    if (issues.length) return this.showIssues(issues);
    const res = this.store.actions.updateScoop(id, {
      name: input.name,
      commune: input.commune,
      code: input.code,
      region: input.region ?? "",
    });
    if (!res.ok) {
      this.snackbar.error(this.t()(res.error as MessageKey));
      return;
    }
    this.createOpen.set(false);
    this.snackbar.success(this.t()("cooperatives.edit.done"));
  }

  protected patch(key: keyof typeof this.emptyForm, value: string): void {
    this.form.update((f) => ({ ...f, [key]: value }));
    // Le champ redevient neutre dès qu'on le corrige.
    if (key in this.errors()) this.errors.update((e) => ({ ...e, [key]: undefined }));
  }

  /**
   * Code court affiché : celui de la coopérative en modification, sinon celui généré à partir du nom saisi
   * (le store le recalcule à l'enregistrement, c'est lui qui fait foi).
   */
  protected readonly shownCode = computed(() => {
    const f = this.form();
    if (this.formMode() === "edit") return f.code;
    return generateScoopCode(f.name, this.store.state().scoops.map((scoop) => scoop.code));
  });

  private input(): ScoopInput & { region?: string } {
    const f = this.form();
    return {
      name: f.name,
      commune: f.commune,
      code: this.shownCode(),
      region: f.region,
      manager: {
        firstName: f.managerFirstName,
        lastName: f.managerLastName,
        email: f.managerEmail,
      },
    };
  }

  private submitCreate(): void {
    const s = this.store.state();
    const input = this.input();
    const used = [...s.users.map((u) => u.email), ...s.members.map((m) => m.email)].filter(Boolean);
    const issues = scoopIssues(input, s.scoops, used);
    if (issues.length) return this.showIssues(issues);
    const res = this.store.actions.createScoop(input);
    if (!res.ok) {
      this.snackbar.error(this.t()(res.error as MessageKey));
      return;
    }
    this.createOpen.set(false);
    this.snackbar.success(
      this.t()("cooperatives.create.done", { email: input.manager.email.trim() }),
    );
  }

  // ───── Archivage / réactivation ─────
  protected askArchive(id: string): void {
    this.menuFor.set(null);
    const s = this.store.state();
    const scoop = s.scoops.find((x) => x.id === id);
    if (!scoop) return;
    const t = this.t();
    const blocking = blockingDossiers(id, s.dossiers).length;
    if (blocking) {
      this.archiveTarget.set({
        id,
        blocked: true,
        description: t(
          blocking > 1
            ? "cooperatives.blocked.description.autre"
            : "cooperatives.blocked.description.un",
          { name: scoop.name, count: blocking },
        ),
        accounts: "",
      });
      return;
    }
    const closing = s.users.filter(
      (u) =>
        u.active &&
        u.role !== "admin" &&
        (u.scoopId === id || (u.scoopIds?.length === 1 && u.scoopIds[0] === id)),
    ).length;
    this.archiveTarget.set({
      id,
      blocked: false,
      description: t("cooperatives.archive.description", { name: scoop.name }),
      accounts: closing
        ? t(
            closing > 1
              ? "cooperatives.archive.accounts.autre"
              : "cooperatives.archive.accounts.un",
            { count: closing },
          )
        : t("cooperatives.archive.noAccounts"),
    });
  }

  protected confirmArchive(id: string): void {
    const res = this.store.actions.archiveScoop(id);
    this.archiveTarget.set(null);
    if (!res.ok) {
      this.snackbar.error(this.t()(res.error as MessageKey));
      return;
    }
    const n = res.closedAccounts;
    this.snackbar.success(
      `${this.t()("cooperatives.archive.done")} · ${this.t()(n > 1 ? "cooperatives.archive.doneAccounts.autre" : "cooperatives.archive.doneAccounts.un", { count: n })}`,
    );
  }

  protected restore(id: string): void {
    this.menuFor.set(null);
    const res = this.store.actions.restoreScoop(id);
    if (!res.ok) {
      this.snackbar.error(this.t()(res.error as MessageKey));
      return;
    }
    this.snackbar.success(this.t()("cooperatives.restore.done"));
  }

  protected readonly fmtDate = fmtDate;

  /** Pagination (shown) : mêmes règles que l'API (?page=&limit=). */
  protected readonly pager = createPager(() => this.shown());
}

function readView(): View {
  try {
    return typeof window !== "undefined" && window.localStorage.getItem(VIEW_KEY) === "list"
      ? "list"
      : "grid";
  } catch {
    return "grid";
  }
}
