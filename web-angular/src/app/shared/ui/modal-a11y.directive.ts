import {
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  output,
} from "@angular/core";

import {
  focusInitial,
  lockBodyScroll,
  trapTabKey,
  unlockBodyScroll,
} from "./modal-focus";

/**
 * Escape + trap Tab + restore focus + lock scroll pour un panneau
 * `role="dialog"` ad hoc (hors ui-dialog / ui-sheet).
 */
@Directive({
  selector: "[uiModalA11y]",
})
export class UiModalA11yDirective implements OnInit, OnDestroy {
  /** Émis sur Escape (ou quand le parent doit fermer). */
  readonly dismiss = output<void>();

  private previous: HTMLElement | null = null;
  private locked = false;

  constructor(private readonly host: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const el = this.host.nativeElement;
    this.previous =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    lockBodyScroll();
    this.locked = true;
    setTimeout(() => focusInitial(el), 0);
  }

  ngOnDestroy(): void {
    if (this.locked) {
      unlockBodyScroll();
      this.locked = false;
    }
    this.previous?.focus({ preventScroll: true });
    this.previous = null;
  }

  @HostListener("document:keydown", ["$event"])
  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      this.dismiss.emit();
      return;
    }
    trapTabKey(this.host.nativeElement, event);
  }
}
