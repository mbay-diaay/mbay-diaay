import { Component, computed, inject } from "@angular/core";
import { RouterLink } from "@angular/router";

import { nf } from "@/lib/format";
import type { MessageKey } from "@/lib/i18n";
import type { Permission } from "@/lib/permissions";
import { qualityCounts, QUALITY_SECTIONS } from "@/lib/quality-nav";
import { inScope } from "@/lib/scope";
import { AppShellComponent } from "@shared/app-shell.component";
import { LocaleService } from "@shared/locale.service";
import { StoreService } from "@shared/store.service";
import {
  IconComponent,
  StatCardsComponent,
  TONE,
  V2_PAGE_STYLES,
  type IconName,
  type StatCard,
} from "@shared/ui";

/** Les trois files de travail de la qualité, dans l'ordre du menu. */
const SECTION: Record<
  string,
  { label: MessageKey; desc: MessageKey; icon: IconName; bg: string; fg: string }
> = {
  "/dashboard/qualite/doublons": {
    label: "qualite.nav.doublons",
    desc: "qualite.v2.hub.doublons",
    icon: "group",
    ...TONE.info,
  },
  "/dashboard/qualite/alertes": {
    label: "qualite.nav.alertes",
    desc: "qualite.v2.hub.alertes",
    icon: "warning",
    ...TONE.attente,
  },
  "/dashboard/qualite/corrections": {
    label: "qualite.nav.corrections",
    desc: "qualite.v2.hub.corrections",
    icon: "edit",
    ...TONE.culture,
  },
};

/**
 * Accueil « Qualité des données » (charte V2) : état des fiches du périmètre et les trois files
 * de travail (doublons, alertes, corrections) avec leur volume à traiter.
 */
@Component({
  selector: "app-qualite-page",
  imports: [AppShellComponent, IconComponent, RouterLink, StatCardsComponent],
  styles: [
    V2_PAGE_STYLES,
    `
      .queues {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 16px;
      }
      .queue {
        display: flex;
        flex-direction: column;
        gap: 14px;
        border-radius: 24px;
        border: 1px solid var(--v2-bord-carte);
        background: var(--v2-blanc);
        padding: 22px;
        transition:
          transform 0.2s ease,
          box-shadow 0.2s ease,
          border-color 0.2s ease;
      }
      .queue:hover {
        transform: translateY(-2px);
        border-color: var(--v2-gris-trait);
        box-shadow: var(--v2-ombre-flottant);
      }
      .queue:focus-visible {
        outline: 2px solid var(--v2-foret);
        outline-offset: 3px;
      }
      .q-ico {
        display: grid;
        height: 48px;
        width: 48px;
        place-items: center;
        border-radius: 14px;
      }
      .q-count {
        font-size: 40px;
        font-weight: 800;
        line-height: 1;
        letter-spacing: -0.03em;
        font-variant-numeric: tabular-nums;
      }
      .q-go {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        font-weight: 800;
        color: var(--v2-foret);
      }
      .queue:hover .q-go {
        gap: 10px;
      }
    `,
  ],
  template: `
    <app-shell [perm]="hubPerm()" [area]="t()('qualite.header.title')">
      <header class="rise">
        <p class="mono" style="color: var(--v2-gris-texte)">{{ t()("qualite.header.eyebrow") }}</p>
        <h1
          class="mt-2 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]"
        >
          {{ t()("qualite.header.title") }}
        </h1>
        <p class="mt-2 max-w-2xl text-[16px] font-medium" style="color: var(--v2-gris-texte)">
          {{ t()("qualite.hub.intro") }}
        </p>
      </header>

      <h2 class="mono mt-8" style="color: var(--v2-gris-texte)">
        {{ t()("qualite.v2.hub.sharesTitle") }}
      </h2>
      <ui-stat-cards class="rise mt-3" [stats]="stats()" />

      <div class="queues mt-8">
        @for (section of sections(); track section.to) {
          <a class="queue" [routerLink]="section.to">
            <div class="flex items-start justify-between gap-3">
              <span class="q-ico" [style.background]="section.bg" [style.color]="section.fg"
                ><ui-icon [name]="section.icon" [size]="24"
              /></span>
              <span class="text-right">
                <span class="q-count block" [class.zero]="!section.count">{{
                  nf.format(section.count)
                }}</span>
                <span class="sub">{{ t()("qualite.v2.hub.toTreat") }}</span>
              </span>
            </div>
            <div>
              <p class="text-[19px] font-extrabold tracking-[-0.01em]">{{ t()(section.label) }}</p>
              <p class="sub mt-1 text-[14px]">{{ t()(section.desc) }}</p>
            </div>
            <span class="q-go mt-auto"
              >{{ t()("qualite.v2.hub.open") }}<ui-icon name="arrow_forward" [size]="18"
            /></span>
          </a>
        }
      </div>
    </app-shell>
  `,
})
export default class QualitePage {
  private readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;

  /** Au moins un des droits « qualité » suffit pour afficher l'accueil. */
  protected readonly hubPerm = computed((): readonly Permission[] => [
    ...new Set(QUALITY_SECTIONS.map((s) => s.perm)),
  ]);

  /** Files visibles avec la session, avec leur volume à traiter. */
  protected readonly sections = computed(() => {
    const perms = this.store.state().session?.permissions ?? [];
    const q = qualityCounts(this.store.state());
    const count: Record<string, number> = {
      "/dashboard/qualite/doublons": q.doublons,
      "/dashboard/qualite/alertes": q.alertes,
      "/dashboard/qualite/corrections": q.corrections,
    };
    return QUALITY_SECTIONS.filter((s) => perms.includes(s.perm)).map((s) => ({
      to: s.to,
      count: count[s.to] ?? 0,
      ...SECTION[s.to]!,
    }));
  });

  /** Répartition des fiches producteurs du périmètre par qualité. */
  protected readonly stats = computed<StatCard[]>(() => {
    const t = this.t();
    const s = this.store.state();
    const ps = inScope(
      s.producers.filter((p) => !p.mergedInto),
      s.session,
    );
    const n = ps.length || 1;
    const k = (q: string) => ps.filter((p) => p.quality === q).length;
    const pct = (v: number) => `${Math.round((v / n) * 100)} %`;
    const sub = t("qualite.v2.hub.sharesSub", { count: nf.format(ps.length) });
    return [
      {
        label: t("dashboard.quality.validated"),
        value: pct(k("validé")),
        sub: `${nf.format(k("validé"))} · ${sub}`,
        icon: "task_alt",
        bg: "",
        fg: "",
      },
      {
        label: t("dashboard.quality.toVerify"),
        value: nf.format(k("à vérifier")),
        sub: pct(k("à vérifier")),
        icon: "warning",
        ...TONE.attente,
      },
      {
        label: t("dashboard.quality.duplicate"),
        value: nf.format(k("doublon")),
        sub: pct(k("doublon")),
        icon: "group",
        ...TONE.info,
      },
      {
        label: t("dashboard.quality.invalid"),
        value: nf.format(k("invalide")),
        sub: pct(k("invalide")),
        icon: "close",
        ...TONE.erreur,
      },
    ];
  });
}
