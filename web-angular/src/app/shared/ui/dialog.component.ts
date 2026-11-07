import {
  Component,
  ElementRef,
  HostListener,
  effect,
  input,
  model,
  output,
  viewChild,
} from "@angular/core";

import {
  focusInitial,
  lockBodyScroll,
  trapTabKey,
  unlockBodyScroll,
} from "./modal-focus";

/** Dialogue modal minimal (kit UI Angular) — overlay + panneau. */
@Component({
  selector: "ui-dialog",
  template: `
    @if (open()) {
      <div class="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
        <div class="absolute inset-0 bg-black/40" (click)="dismiss()"></div>
        <div
          #panel
          role="dialog"
          [attr.aria-modal]="true"
          [attr.aria-labelledby]="titleId"
          class="relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-t-lg border bg-card p-5 shadow-lg sm:max-w-md sm:rounded-lg"
          tabindex="-1"
        >
          @if (title()) {
            <h2 [id]="titleId" class="text-lg font-semibold">{{ title() }}</h2>
          }
          <div class="mt-3">
            <ng-content />
          </div>
          <div class="mt-5 flex flex-wrap justify-end gap-2">
            <ng-content select="[actions]" />
          </div>
        </div>
      </div>
    }
  `,
})
export class UiDialogComponent {
  readonly open = model(false);
  readonly title = input("");
  readonly closed = output<void>();
  protected readonly titleId = `dlg-${Math.random().toString(36).slice(2, 9)}`;

  private readonly panel = viewChild<ElementRef<HTMLElement>>("panel");
  private previous: HTMLElement | null = null;
  private locked = false;

  constructor() {
    effect(() => {
      const isOpen = this.open();
      if (isOpen) {
        this.previous =
          document.activeElement instanceof HTMLElement ? document.activeElement : null;
        if (!this.locked) {
          lockBodyScroll();
          this.locked = true;
        }
        setTimeout(() => {
          const el = this.panel()?.nativeElement;
          if (el) focusInitial(el);
        }, 0);
      } else {
        this.release();
      }
    });
  }

  @HostListener("document:keydown", ["$event"])
  protected onKeydown(event: KeyboardEvent): void {
    if (!this.open()) return;
    if (event.key === "Escape") {
      event.preventDefault();
      this.dismiss();
      return;
    }
    const el = this.panel()?.nativeElement;
    if (el) trapTabKey(el, event);
  }

  protected dismiss(): void {
    this.open.set(false);
    this.closed.emit();
  }

  private release(): void {
    if (this.locked) {
      unlockBodyScroll();
      this.locked = false;
    }
    this.previous?.focus({ preventScroll: true });
    this.previous = null;
  }
}
