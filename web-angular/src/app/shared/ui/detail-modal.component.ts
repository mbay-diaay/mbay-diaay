import { Component, inject, input, output } from "@angular/core";
import { RouterLink } from "@angular/router";

import { nf } from "@/lib/format";

import { LocaleService } from "../locale.service";
import { IconComponent, type IconName } from "./icon.component";
import { ModalComponent } from "./modal.component";
import { V2_PAGE_STYLES } from "./v2-page.styles";

export type Tone = { bg: string; fg: string };
export type Badge = Tone & { label: string };

/** Contenu d'une fiche de détail en modale (organisation, adhérent, producteur, dossier…). */
export interface DetailView {
  title: string;
  subtitle: string;
  icon: IconName;
  /** Pastilles d'état sous le titre, dans l'en-tête forêt. */
  badges: Badge[];
  /** Chiffres clés en tuiles colorées (0 à 4). */
  kpis: { label: string; value: string; icon: IconName; tone: Tone; muted?: boolean }[];
  /** Fiche d'identité : icône, libellé, valeur (en pastille quand `tone` est donné). */
  facts: { label: string; value: string; icon: IconName; muted?: boolean; wide?: boolean; tone?: Tone | undefined }[];
  sections: {
    title: string;
    icon: IconName;
    count: number | null;
    empty: string;
    items: { label: string; sub?: string; badge?: Badge; initials?: string; index?: number }[];
    more: number;
  }[];
  /** Lien « Ouvrir la fiche complète » (facultatif). */
  link: string[] | null;
}

/**
 * Fiche de détail en modale (charte V2) : en-tête forêt + pastilles, chiffres clés colorés,
 * fiche d'identité à icônes, listes à avatars, lien facultatif vers la page complète.
 *
 * `<ui-detail-modal [view]="detail()" (closed)="closeDetail()" />` — rien n'est affiché si `view` est `null`.
 * Emplacements facultatifs : `<div detail-body>` (bloc libre sous les sections) et `<button detail-actions>`
 * (boutons du pied, avant « Fermer »).
 * Aide : `detailFact()` et `detailKpi()` construisent les lignes avec les valeurs vides grisées.
 */
@Component({
  selector: "ui-detail-modal",
  imports: [RouterLink, IconComponent, ModalComponent],
  styles: [
    V2_PAGE_STYLES,
    `
  /* Fenêtre de détail : chiffres clés colorés, fiche d'identité à icônes, listes à avatars. */
  .kpis {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
  }
  .kpi {
    position: relative;
    overflow: hidden;
    border-radius: 18px;
    padding: 14px 16px;
  }
  .kpi .kpi-ico {
    position: absolute;
    right: -6px;
    bottom: -10px;
    opacity: 0.14;
  }
  .kpi-value {
    font-size: 26px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.03em;
    font-variant-numeric: tabular-nums;
  }
  .kpi-label {
    margin-top: 6px;
    font-size: 12px;
    font-weight: 700;
  }
  .sec-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 800;
    color: var(--v2-encre);
  }
  .sec-title .n {
    border-radius: 999px;
    background: var(--v2-creme);
    padding: 1px 8px;
    font-size: 12px;
    color: var(--v2-ardoise);
  }
  .facts {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    overflow: hidden;
    border-radius: 18px;
    border: 1px solid var(--v2-bord-carte);
  }
  .fact {
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 12px;
    border-top: 1px solid var(--v2-separateur);
    padding: 12px 14px;
  }
  .fact:nth-child(-n + 2) {
    border-top: none;
  }
  .fact:nth-child(even) {
    border-left: 1px solid var(--v2-separateur);
  }
  .fact.wide {
    grid-column: 1 / -1;
    border-left: none;
  }
  .fact-ico {
    display: grid;
    height: 34px;
    width: 34px;
    flex-shrink: 0;
    place-items: center;
    border-radius: 10px;
    background: var(--v2-sauge);
    color: var(--v2-foret);
  }
  .fact dt {
    font-size: 12px;
    font-weight: 600;
    color: var(--v2-gris-texte);
  }
  .fact dd {
    margin-top: 1px;
    overflow-wrap: anywhere;
    font-size: 14px;
    font-weight: 800;
  }
  .dlist {
    overflow: hidden;
    border-radius: 18px;
    border: 1px solid var(--v2-bord-carte);
  }
  .dlist li {
    display: flex;
    align-items: center;
    gap: 12px;
    border-top: 1px solid var(--v2-separateur);
    padding: 10px 14px;
    font-size: 14px;
  }
  .dlist li:first-child {
    border-top: none;
  }
  .avatar {
    display: grid;
    height: 32px;
    width: 32px;
    flex-shrink: 0;
    place-items: center;
    border-radius: 999px;
    background: var(--v2-sauge);
    color: var(--v2-foret);
    font-size: 11px;
    font-weight: 800;
  }
  .step {
    background: var(--v2-foret);
    color: var(--v2-citron);
  }
  @media (max-width: 520px) {
    .facts {
      grid-template-columns: 1fr;
    }
    .fact:nth-child(2) {
      border-top: 1px solid var(--v2-separateur);
    }
    .fact:nth-child(even) {
      border-left: none;
    }
  }
  `,
  ],
  template: `
    @if (view(); as detail) {
      <ui-modal tone="brand" [open]="true" [title]="detail.title" [description]="detail.subtitle" [icon]="detail.icon" [width]="width()" [closeLabel]="t()('common.close')" (closed)="closed.emit()">
        @if (detail.badges.length) {
          <div modal-badges class="mt-3 flex flex-wrap gap-2">
            @for (badge of detail.badges; track badge.label) {
              <span class="badge" [style.background]="badge.bg" [style.color]="badge.fg">{{ badge.label }}</span>
            }
          </div>
        }

        @if (detail.kpis.length) {
          <div class="kpis">
            @for (kpi of detail.kpis; track kpi.label) {
              <div class="kpi" [style.background]="kpi.tone.bg" [style.color]="kpi.tone.fg">
                <ui-icon class="kpi-ico" [name]="kpi.icon" [size]="64" />
                <p class="kpi-value" [style.opacity]="kpi.muted ? 0.45 : 1">{{ kpi.value }}</p>
                <p class="kpi-label">{{ kpi.label }}</p>
              </div>
            }
          </div>
        }

        <dl class="facts" [class.mt-4]="detail.kpis.length">
          @for (fact of detail.facts; track fact.label) {
            <div class="fact" [class.wide]="fact.wide">
              <span class="fact-ico" aria-hidden="true"><ui-icon [name]="fact.icon" [size]="18" /></span>
              <div class="min-w-0">
                <dt>{{ fact.label }}</dt>
                <dd class="tabular-nums" [class.zero]="fact.muted">
                  @if (fact.tone && !fact.muted) {
                    <span class="badge" [style.background]="fact.tone.bg" [style.color]="fact.tone.fg">{{ fact.value }}</span>
                  } @else {
                    {{ fact.value }}
                  }
                </dd>
              </div>
            </div>
          }
        </dl>

        @for (section of detail.sections; track section.title) {
          <h3 class="sec-title mb-2 mt-6">
            <ui-icon [name]="section.icon" [size]="18" />
            {{ section.title }}
            @if (section.count !== null) {
              <span class="n tabular-nums">{{ nf.format(section.count) }}</span>
            }
          </h3>
          @if (section.items.length) {
            <ul class="dlist">
              @for (item of section.items; track $index) {
                <li>
                  @if (item.initials) {
                    <span class="avatar">{{ item.initials }}</span>
                  } @else if (item.index) {
                    <span class="avatar step">{{ item.index }}</span>
                  }
                  <span class="min-w-0 flex-1">
                    <span class="block truncate font-bold">{{ item.label }}</span>
                    @if (item.sub) {
                      <span class="sub block truncate">{{ item.sub }}</span>
                    }
                  </span>
                  @if (item.badge) {
                    <span class="badge shrink-0" [style.background]="item.badge.bg" [style.color]="item.badge.fg">{{ item.badge.label }}</span>
                  }
                </li>
              }
            </ul>
            @if (section.more > 0) {
              <p class="sub mt-2">{{ t()("common.detail.more", { count: section.more }) }}</p>
            }
          } @else {
            <p class="sub rounded-[16px] px-4 py-3" style="background: var(--v2-creme)">{{ section.empty }}</p>
          }
        }
        <!-- Bloc propre à l'écran (ex. gestion de l'accès d'un membre) -->
        <ng-content select="[detail-body]" />
        <div class="h-4" aria-hidden="true"></div>

        <!-- Actions propres à l'écran, dans le pied, avant « Fermer » -->
        <div modal-footer class="contents"><ng-content select="[detail-actions]" /></div>

        <button modal-footer type="button" class="btn btn-ghost" (click)="closed.emit()">{{ t()("common.close") }}</button>
        @if (detail.link) {
          <a modal-footer class="btn btn-primary" [routerLink]="detail.link">
            {{ t()("common.openFull") }}
            <span class="grid size-9 place-items-center rounded-[12px]" style="background: var(--v2-citron); color: var(--v2-foret)"><ui-icon name="arrow_forward" [size]="18" /></span>
          </a>
        }
      </ui-modal>
    }
  `,
})
export class DetailModalComponent {
  readonly view = input<DetailView | null>(null);
  readonly width = input(600);
  readonly closed = output<void>();

  protected readonly t = inject(LocaleService).t;
  protected readonly nf = nf;
}

const NONE = "—";
const isEmpty = (v: unknown) => v === null || v === undefined || v === "";

/** Ligne de fiche : valeur vide affichée « — » et grisée. */
export function detailFact(
  label: string,
  value: string | null | undefined,
  icon: IconName,
  opts: { wide?: boolean; tone?: Tone | undefined } = {},
): DetailView["facts"][number] {
  return { label, value: isEmpty(value) ? NONE : value!, icon, muted: isEmpty(value), wide: opts.wide ?? false, tone: opts.tone };
}

/** Chiffre clé : 0 grisé ; `display` remplace le nombre formaté (ex. « 5 000 F »). */
export function detailKpi(label: string, n: number, icon: IconName, tone: Tone, display?: string): DetailView["kpis"][number] {
  return { label, value: display ?? nf.format(n), icon, tone, muted: n === 0 };
}
