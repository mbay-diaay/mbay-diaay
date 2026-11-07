import { Component, inject } from "@angular/core";
import { LucideAngularModule, X } from "lucide-angular";

import { LocaleService } from "./locale.service";
import { ToastService, type ToastItem } from "./toast.service";

@Component({
  selector: "app-toast-host",
  imports: [LucideAngularModule],
  template: `
    <div
      class="pointer-events-none fixed bottom-0 right-0 z-[100] flex max-w-[100vw] flex-col gap-2 p-4 sm:max-w-sm sm:p-6"
      aria-live="polite"
      aria-relevant="additions"
    >
      @for (item of toast.items(); track item.id) {
        <div
          class="pointer-events-auto mbay-animate-toast-in"
          [class]="panelClass(item)"
          role="status"
        >
          <div class="flex gap-3">
            <div class="min-w-0 flex-1">
              <p class="text-sm font-semibold leading-snug">
                {{ t()(item.titleKey, item.titleParams) }}
              </p>
              @if (item.descriptionKey) {
                <p class="mt-1 text-xs leading-relaxed opacity-90">
                  {{ t()(item.descriptionKey, item.descriptionParams) }}
                </p>
              }
            </div>
            <button
              type="button"
              class="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-background/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              (click)="toast.dismiss(item.id)"
              [attr.aria-label]="t()('common.close')"
            >
              <lucide-angular [img]="iconClose" class="size-4" />
            </button>
          </div>
        </div>
      }
    </div>
  `,
})
export class ToastHostComponent {
  protected readonly toast = inject(ToastService);
  private readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly iconClose = X;

  protected panelClass(item: ToastItem): string {
    const base =
      "rounded-lg border p-3 shadow-lg backdrop-blur-sm transition-[transform,opacity]";
    if (item.tone === "success") {
      return `${base} border-success/30 bg-success-bg text-success-fg`;
    }
    return `${base} border-danger/30 bg-danger-bg text-danger-fg`;
  }
}
