import { Component, DOCUMENT, DestroyRef, afterNextRender, inject, input, signal } from "@angular/core";

import type { CreditedPhoto } from "@/config/brand";
import { LocaleService } from "../locale.service";

/**
 * Diaporama de fond : photos superposées en fondu enchaîné, avec un zoom lent (effet « Ken Burns »).
 * Décoratif : les images ont un `alt` vide ; seules les pastilles de navigation sont annoncées.
 *
 * - Défile uniquement côté navigateur (rien au rendu serveur), en pause quand l'onglet est caché.
 * - `prefers-reduced-motion` : pas de défilement automatique ni de zoom ; navigation manuelle seule.
 * - Le parent dimensionne l'élément (ex. `class="absolute inset-0"`) et pose son propre voile.
 */
@Component({
  selector: "ui-photo-slideshow",
  host: { class: "block overflow-hidden" },
  styles: `
    .slide {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transform: scale(1.06);
      transition:
        opacity 1.4s ease,
        transform 9s linear;
    }
    .slide.active {
      opacity: 1;
      transform: scale(1);
    }
    .dot {
      height: 6px;
      width: 6px;
      border-radius: 999px;
      cursor: pointer;
      background: color-mix(in oklab, var(--v2-blanc, #fff) 45%, transparent);
      transition:
        width 0.3s ease,
        background-color 0.3s ease;
    }
    .dot.active {
      width: 22px;
      background: var(--v2-blanc, #fff);
    }
    .dot:focus-visible {
      outline: 2px solid var(--v2-blanc, #fff);
      outline-offset: 3px;
    }
    @media (prefers-reduced-motion: reduce) {
      .slide {
        transition: opacity 0.3s ease;
        transform: none;
      }
      .slide.active {
        transform: none;
      }
    }
  `,
  template: `
    @for (photo of photos(); track photo.src; let photoIndex = $index) {
      <img
        class="slide"
        [class.active]="photoIndex === index()"
        [src]="photo.src"
        [style.object-position]="photo.position"
        alt=""
        decoding="async"
        [attr.fetchpriority]="photoIndex === 0 ? 'high' : 'low'"
        [attr.loading]="photoIndex === 0 ? 'eager' : 'lazy'"
      />
    }
    @if (photos().length > 1) {
      <div class="absolute bottom-5 right-6 z-10 flex items-center gap-2">
        @for (photo of photos(); track photo.src; let photoIndex = $index) {
          <button
            type="button"
            class="dot"
            [class.active]="photoIndex === index()"
            [attr.aria-label]="t()('ui.slideshow.goTo', { current: photoIndex + 1, total: photos().length })"
            [attr.aria-current]="photoIndex === index() || null"
            (click)="goTo(photoIndex)"
          ></button>
        }
      </div>
    }
  `,
})
export class PhotoSlideshowComponent {
  readonly photos = input.required<readonly CreditedPhoto[]>();
  /** Durée d'affichage de chaque photo, en ms. */
  readonly interval = input(7000);

  protected readonly t = inject(LocaleService).t;
  protected readonly index = signal(0);
  private readonly document = inject(DOCUMENT);
  private timer: ReturnType<typeof setInterval> | undefined;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const view = this.document.defaultView;
      if (view?.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      this.start();
      const onVisibility = () => (this.document.hidden ? this.stop() : this.start());
      this.document.addEventListener("visibilitychange", onVisibility);
      destroyRef.onDestroy(() => {
        this.stop();
        this.document.removeEventListener("visibilitychange", onVisibility);
      });
    });
  }

  protected goTo(i: number): void {
    this.index.set(i);
    // Un clic relance le compte à rebours pour laisser le temps de voir la photo choisie.
    if (this.timer) {
      this.stop();
      this.start();
    }
  }

  private start(): void {
    this.stop();
    this.timer = setInterval(
      () => this.index.update((i) => (i + 1) % this.photos().length),
      this.interval(),
    );
  }

  private stop(): void {
    clearInterval(this.timer);
    this.timer = undefined;
  }
}
