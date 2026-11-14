import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";

import { IconComponent, type IconName } from "./icon.component";

export interface HeroBadge {
  label: string;
  icon?: IconName;
  /** `citron` (état positif), `light` (blanc), `glass` (discret), ou couleurs explicites. */
  tone?: "citron" | "light" | "glass" | "warn" | "danger";
  mono?: boolean;
}

export interface HeroMeta {
  icon: IconName;
  text: string;
}

/**
 * En-tête de fiche (charte V2) : bandeau forêt, fil d'Ariane, monogramme ou icône, titre, badges,
 * informations clés et bouton retour. Commun aux fiches producteur, dossier, organisation, réunion…
 *
 * ```html
 * <ui-detail-hero [crumb]="{ label: 'Producteurs', link: '/dashboard/producteurs' }" [title]="nom" mono="AD"
 *                 [badges]="badges()" [meta]="meta()" backLabel="Retour aux producteurs">
 *   <div hero-actions>…boutons…</div>
 *   <div hero-extra>…bloc sous l'en-tête (facultatif)…</div>
 * </ui-detail-hero>
 * ```
 */
@Component({
  selector: "ui-detail-hero",
  imports: [IconComponent, RouterLink],
  host: { class: "block" },
  styles: `
    .hero {
      position: relative;
      overflow: hidden;
      border-radius: 28px;
      background: var(--v2-foret);
      color: var(--v2-blanc);
      animation: hero-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;
    }
    .mono {
      display: grid;
      height: 72px;
      width: 72px;
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
    .hero:hover .mono {
      transform: rotate(-4deg) scale(1.04);
    }
    .crumb a {
      color: color-mix(in oklab, var(--v2-blanc) 70%, transparent);
      transition: color 0.15s ease;
    }
    .crumb a:hover {
      color: var(--v2-citron);
    }
    .crumb a:focus-visible,
    .back:focus-visible {
      outline: 2px solid var(--v2-citron);
      outline-offset: 3px;
      border-radius: 6px;
    }
    .back {
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
      white-space: nowrap;
      transition:
        background-color 0.15s ease,
        border-color 0.15s ease;
    }
    .back:hover {
      border-color: var(--v2-citron);
      background: color-mix(in oklab, var(--v2-blanc) 10%, transparent);
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
    .t-citron {
      background: var(--v2-citron);
      color: var(--v2-foret);
    }
    .t-light {
      background: var(--v2-blanc);
      color: var(--v2-foret);
    }
    .t-glass {
      background: color-mix(in oklab, var(--v2-blanc) 12%, transparent);
      color: var(--v2-blanc);
    }
    .t-warn {
      background: var(--v2-attente-bg);
      color: var(--v2-attente-fg);
    }
    .t-danger {
      background: var(--v2-erreur-bg);
      color: var(--v2-erreur-fg);
    }
    .is-mono {
      font-family: var(--v2-font-mono);
    }
    @keyframes hero-rise {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .hero,
      .mono {
        animation: none;
        transition: none;
      }
    }
  `,
  template: `
    <section class="hero p-6 sm:p-8">
      <svg class="pointer-events-none absolute -right-16 -top-10 h-72 w-[30rem] opacity-[0.06]" viewBox="0 0 320 220" aria-hidden="true">
        <path d="M10 120 Q160 60 310 110" fill="none" stroke="currentColor" stroke-width="22" stroke-linecap="round" />
        <path d="M30 168 Q170 108 310 156" fill="none" stroke="currentColor" stroke-width="22" stroke-linecap="round" />
        <path d="M60 212 Q180 160 310 200" fill="none" stroke="currentColor" stroke-width="22" stroke-linecap="round" />
      </svg>
      <nav class="crumb relative flex items-center gap-1.5 text-[13px] font-semibold" aria-label="Fil d'Ariane">
        <a [routerLink]="crumb().link">{{ crumb().label }}</a>
        <ui-icon name="chevron_right" [size]="16" style="opacity: 0.5" />
        <span class="truncate" aria-current="page" style="color: var(--v2-citron)">{{ title() }}</span>
      </nav>

      <div class="relative mt-6 flex flex-wrap items-start justify-between gap-6">
        <div class="flex min-w-0 items-start gap-5">
          <span class="mono" aria-hidden="true">
            @if (icon()) {
              <ui-icon [name]="icon()!" [size]="32" />
            } @else {
              {{ mono() }}
            }
          </span>
          <div class="min-w-0">
            @if (eyebrow()) {
              <p class="text-[12px] font-bold uppercase tracking-[0.08em]" style="color: var(--v2-citron); font-family: var(--v2-font-mono)">{{ eyebrow() }}</p>
            }
            <h1 class="text-[26px] font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-[34px]" [class.mt-1]="!!eyebrow()">{{ title() }}</h1>
            @if (badges().length) {
              <div class="mt-3 flex flex-wrap gap-2">
                @for (badge of badges(); track badge.label) {
                  <span class="badge" [class]="'t-' + (badge.tone ?? 'glass')" [class.is-mono]="badge.mono">
                    @if (badge.icon) {
                      <ui-icon [name]="badge.icon" [size]="14" />
                    }
                    {{ badge.label }}
                  </span>
                }
              </div>
            }
            @if (meta().length) {
              <p class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] font-medium" style="color: color-mix(in oklab, var(--v2-blanc) 75%, transparent)">
                @for (metaItem of meta(); track metaItem.text) {
                  <span class="inline-flex items-center gap-1.5"><ui-icon [name]="metaItem.icon" [size]="16" />{{ metaItem.text }}</span>
                }
              </p>
            }
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <ng-content select="[hero-actions]" />
          @if (backLabel()) {
            <a class="back" [routerLink]="crumb().link">
              <ui-icon name="arrow_forward" [size]="18" style="transform: rotate(180deg)" />{{ backLabel() }}
            </a>
          }
        </div>
      </div>
      <ng-content select="[hero-extra]" />
    </section>
  `,
})
export class DetailHeroComponent {
  readonly crumb = input.required<{ label: string; link: string | readonly string[] }>();
  readonly title = input.required<string>();
  readonly eyebrow = input("");
  /** Initiales ou code court affichés dans le carré citron (sinon `icon`). */
  readonly mono = input("");
  readonly icon = input<IconName | null>(null);
  readonly badges = input<readonly HeroBadge[]>([]);
  readonly meta = input<readonly HeroMeta[]>([]);
  readonly backLabel = input("");
}
