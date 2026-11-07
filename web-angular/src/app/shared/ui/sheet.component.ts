import {
  Component,
  ElementRef,
  HostListener,
  effect,
  inject,
  input,
  model,
  output,
  viewChild,
} from "@angular/core";
import { LucideAngularModule, X } from "lucide-angular";

import { LocaleService } from "../locale.service";
import {
  focusInitial,
  lockBodyScroll,
  trapTabKey,
  unlockBodyScroll,
} from "./modal-focus";

export type UiSheetSide = "right" | "left" | "bottom";

/**
 * Panneau coulissant (équivalent Angular du Sheet Radix côté React).
 * Animations : utilitaires `mbay-animate-*` dans styles.css.
 */
@Component({
  selector: "ui-sheet",
  imports: [LucideAngularModule],
  template: `
    @if (open()) {
      <div class="fixed inset-0 z-50 md:hidden" role="presentation">
        <div
          class="absolute inset-0 bg-black/80 mbay-animate-sheet-overlay"
          (click)="close()"
          aria-hidden="true"
        ></div>
        <div
          #panel
          class="absolute flex max-h-[95vh] flex-col bg-background shadow-lg"
          [class]="panelClasses()"
          role="dialog"
          aria-modal="true"
          [attr.aria-labelledby]="titleId"
          tabindex="-1"
        >
          <div class="flex items-start justify-between gap-3 border-b px-4 py-3 sm:px-6">
            <h2 [id]="titleId" class="text-lg font-semibold text-foreground">
              {{ title() }}
            </h2>
            <button
              type="button"
              class="grid size-9 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring pointer-coarse:size-10"
              (click)="close()"
              [attr.aria-label]="t()('common.close')"
            >
              <lucide-angular [img]="icons.x" class="size-4" />
            </button>
          </div>
          <div class="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
            <ng-content />
          </div>
          <div class="border-t px-4 py-4 sm:px-6">
            <ng-content select="[sheetFooter]" />
          </div>
        </div>
      </div>
    }
  `,
})
export class UiSheetComponent {
  readonly open = model(false);
  readonly title = input.required<string>();
  readonly side = input<UiSheetSide>("right");
  readonly closed = output<void>();

  private readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly titleId = `sheet-${Math.random().toString(36).slice(2, 9)}`;
  protected readonly icons = { x: X };

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
      this.close();
      return;
    }
    const el = this.panel()?.nativeElement;
    if (el) trapTabKey(el, event);
  }

  protected panelClasses(): string {
    const s = this.side();
    if (s === "bottom") {
      return "inset-x-0 bottom-0 max-h-[90vh] w-full rounded-t-xl border-t mbay-animate-sheet-panel-bottom";
    }
    if (s === "left") {
      return "inset-y-0 left-0 h-full w-full max-w-[min(100%,24rem)] border-r mbay-animate-sheet-panel-left";
    }
    return "inset-y-0 right-0 h-full w-full max-w-[min(100%,24rem)] border-l mbay-animate-sheet-panel-right";
  }

  close(): void {
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
