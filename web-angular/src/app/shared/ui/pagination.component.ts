import { Component, computed, inject, input } from "@angular/core";

import { PAGE_SIZES } from "@/lib/api/pagination";

import { LocaleService } from "../locale.service";
import type { Pager } from "../pager";
import { IconComponent } from "./icon.component";
import { SelectComponent, type SelectOption } from "./select.component";

type Slot = { kind: "page"; page: number } | { kind: "gap"; key: string };

/**
 * Pied de tableau paginé (charte V2) : « 21–40 sur 96 », pages numérotées, taille de page.
 *
 * `<ui-pagination [pager]="pager" />` avec `pager = createPager(() => this.lignes())`.
 * - Se masque quand toutes les lignes tiennent dans la plus petite taille de page.
 * - Pages : première, dernière, voisines de la courante, « … » entre les deux.
 * - Navigation clavier native (boutons), page courante en `aria-current="page"`.
 */
@Component({
  selector: "ui-pagination",
  imports: [IconComponent, SelectComponent],
  host: { class: "block" },
  styles: `
    .bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding-top: 16px;
    }
    .range {
      font-size: 13px;
      font-weight: 600;
      color: var(--v2-gris-texte);
      font-variant-numeric: tabular-nums;
    }
    .range b {
      color: var(--v2-encre);
      font-weight: 800;
    }
    .nav {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .btn {
      display: grid;
      min-width: 38px;
      height: 38px;
      place-items: center;
      border-radius: 12px;
      padding: 0 8px;
      font-size: 14px;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      color: var(--v2-ardoise);
      cursor: pointer;
      transition:
        background-color 0.15s ease,
        color 0.15s ease;
    }
    .btn:hover:not(:disabled):not([aria-current]) {
      background: var(--v2-creme);
      color: var(--v2-encre);
    }
    .btn:focus-visible {
      outline: 2px solid var(--v2-foret);
      outline-offset: 2px;
    }
    .btn:disabled {
      cursor: not-allowed;
      opacity: 0.35;
    }
    .btn[aria-current] {
      background: var(--v2-foret);
      color: var(--v2-citron);
      cursor: default;
    }
    .gap {
      min-width: 24px;
      text-align: center;
      color: var(--v2-gris-texte);
    }
    .size {
      width: 150px;
    }
  `,
  template: `
    @let pageResult = pager().result();
    @if (pageResult.total > minSize()) {
      <nav class="bar" [attr.aria-label]="t()('common.pager.label')">
        <p class="range" aria-live="polite">
          <b>{{ from() }}–{{ to() }}</b> {{ t()("common.pager.of") }} <b>{{ pageResult.total }}</b>
        </p>

        <div class="nav">
          <button
            type="button"
            class="btn"
            [disabled]="pageResult.page <= 1"
            [attr.aria-label]="t()('common.pager.prev')"
            (click)="pager().setPage(pageResult.page - 1)"
          >
            <ui-icon name="chevron_left" [size]="20" />
          </button>
          @for (slot of slots(); track slot.kind === "page" ? slot.page : slot.key) {
            @if (slot.kind === "page") {
              <button
                type="button"
                class="btn"
                [attr.aria-current]="slot.page === pageResult.page ? 'page' : null"
                [attr.aria-label]="t()('common.pager.page', { page: slot.page })"
                (click)="pager().setPage(slot.page)"
              >
                {{ slot.page }}
              </button>
            } @else {
              <span class="gap" aria-hidden="true">…</span>
            }
          }
          <button
            type="button"
            class="btn"
            [disabled]="pageResult.page >= pageResult.pages"
            [attr.aria-label]="t()('common.pager.next')"
            (click)="pager().setPage(pageResult.page + 1)"
          >
            <ui-icon name="chevron_right" [size]="20" />
          </button>
        </div>

        <ui-select
          class="size"
          variant="compact"
          align="right"
          drop="up"
          [label]="t()('common.pager.size')"
          [options]="sizeOptions()"
          [value]="'' + pageResult.limit"
          (valueChange)="pager().setSize(+$event)"
        />
      </nav>
    }
  `,
})
export class PaginationComponent {
  readonly pager = input.required<Pager<unknown>>();
  /** Tailles proposées (10, 20, 50, 100 par défaut). */
  readonly sizes = input<readonly number[]>(PAGE_SIZES);

  protected readonly t = inject(LocaleService).t;

  protected readonly minSize = computed(() => Math.min(...this.sizes()));
  protected readonly from = computed(() => {
    const r = this.pager().result();
    return r.total === 0 ? 0 : (r.page - 1) * r.limit + 1;
  });
  protected readonly to = computed(() => {
    const r = this.pager().result();
    return Math.min(r.page * r.limit, r.total);
  });

  protected readonly sizeOptions = computed<SelectOption[]>(() =>
    this.sizes().map((size) => ({ value: String(size), label: this.t()("common.pager.sizeOption", { size }) })),
  );

  /** 1 … 4 5 6 … 12 : toujours la première, la dernière et les voisines de la page courante. */
  protected readonly slots = computed<Slot[]>(() => {
    const { page, pages } = this.pager().result();
    const keep = new Set([1, pages, page - 1, page, page + 1].filter((p) => p >= 1 && p <= pages));
    // Évite un « … » qui ne cacherait qu'une seule page.
    if (keep.has(3) || page <= 3) keep.add(2);
    if (keep.has(pages - 2) || page >= pages - 2) keep.add(pages - 1);
    const sorted = [...keep].filter((p) => p >= 1 && p <= pages).sort((a, b) => a - b);
    const out: Slot[] = [];
    sorted.forEach((p, i) => {
      if (i > 0 && p - sorted[i - 1]! > 1) out.push({ kind: "gap", key: `gap-${p}` });
      out.push({ kind: "page", page: p });
    });
    return out;
  });
}
