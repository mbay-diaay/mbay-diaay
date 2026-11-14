import { Component, DestroyRef, inject } from "@angular/core";
import { CircleAlert, CircleCheck, Clock, CloudOff, Info, LucideAngularModule, X } from "lucide-angular";

import { LocaleService } from "../locale.service";
import { SnackbarService, type SnackKind } from "./snackbar.service";

/** Fond, encre et icône par état, d'après la charte V2 (« Couleurs d'état · fond + encre associée »). */
const KIND = {
  success: { bg: "var(--v2-succes-bg)", fg: "var(--v2-succes-fg)", icon: CircleCheck },
  info: { bg: "var(--v2-info-bg)", fg: "var(--v2-info-fg)", icon: Info },
  warning: { bg: "var(--v2-attente-bg)", fg: "var(--v2-attente-fg)", icon: Clock },
  error: { bg: "var(--v2-erreur-bg)", fg: "var(--v2-erreur-fg)", icon: CircleAlert },
  blocking: { bg: "var(--v2-bloquant-bg)", fg: "var(--v2-bloquant-fg)", icon: CloudOff },
} satisfies Record<SnackKind, unknown>;

/**
 * Rendu de la snackbar flottante : glisse depuis le haut, se ferme seule (barre de temps) ou au clic.
 * À placer une fois par écran, sous un ancêtre `.charte-v2`. Le parent règle la position par
 * des classes sur l'élément (ex. `class="lg:left-[48.8%] lg:pt-20"`).
 * Erreur → `role="alert"` (annoncée immédiatement) ; autres états → `role="status"`.
 */
@Component({
  selector: "ui-snackbar",
  imports: [LucideAngularModule],
  host: {
    class:
      "pointer-events-none fixed inset-x-0 top-0 z-[200] flex justify-center px-4 pt-[max(1rem,env(safe-area-inset-top))]",
  },
  styles: `
    .snack {
      position: relative;
      overflow: hidden;
      box-shadow:
        0 1px 2px color-mix(in oklab, var(--v2-foret) 10%, transparent),
        0 24px 60px color-mix(in oklab, var(--v2-foret) 28%, transparent);
      animation: snack-in 0.42s cubic-bezier(0.32, 0.72, 0, 1) both;
    }
    .timer {
      position: absolute;
      inset: auto 0 0 0;
      height: 3px;
      opacity: 0.35;
      transform-origin: left;
      animation-name: snack-timer;
      animation-timing-function: linear;
      animation-fill-mode: both;
    }
    .close {
      cursor: pointer;
      transition: background-color 0.15s ease;
    }
    .close:hover {
      background: color-mix(in oklab, currentColor 10%, transparent);
    }
    .close:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 1px;
    }
    @keyframes snack-in {
      from {
        opacity: 0;
        transform: translateY(-120%) scale(0.98);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    @keyframes snack-timer {
      from {
        transform: scaleX(1);
      }
      to {
        transform: scaleX(0);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .snack,
      .timer {
        animation: none;
      }
    }
  `,
  template: `
    @if (service.snack(); as snack) {
      @for (item of [snack]; track item.id) {
        <div
          class="snack pointer-events-auto flex w-full max-w-[460px] items-center gap-3 rounded-[18px] py-3 pl-3 pr-2"
          [style.background]="kind[item.kind].bg"
          [style.color]="kind[item.kind].fg"
          [attr.role]="item.kind === 'error' || item.kind === 'blocking' ? 'alert' : 'status'"
          [attr.aria-live]="item.kind === 'error' || item.kind === 'blocking' ? 'assertive' : 'polite'"
        >
          <span
            class="grid size-10 shrink-0 place-items-center rounded-[12px]"
            [style.background]="kind[item.kind].fg"
            [style.color]="kind[item.kind].bg"
          >
            <lucide-angular [img]="kind[item.kind].icon" [size]="20" />
          </span>
          <p class="min-w-0 flex-1 text-[15px] font-bold leading-snug">{{ item.text }}</p>
          <button
            type="button"
            class="close grid size-10 shrink-0 place-items-center rounded-[12px]"
            [attr.aria-label]="t()('auth.snack.close')"
            (click)="service.dismiss()"
          >
            <lucide-angular [img]="closeIcon" [size]="18" />
          </button>
          @if (item.duration > 0) {
            <span
              class="timer"
              aria-hidden="true"
              [style.background]="kind[item.kind].fg"
              [style.animation-duration.ms]="item.duration"
            ></span>
          }
        </div>
      }
    }
  `,
})
export class SnackbarComponent {
  protected readonly service = inject(SnackbarService);
  protected readonly t = inject(LocaleService).t;
  protected readonly kind = KIND;
  protected readonly closeIcon = X;

  constructor() {
    // Un message ne doit pas survivre à l'écran qui l'a affiché.
    inject(DestroyRef).onDestroy(() => this.service.dismiss());
  }
}
