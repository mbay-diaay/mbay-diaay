import { Injectable, computed, signal } from "@angular/core";
import type { MessageKey } from "@/lib/i18n";

export type ToastTone = "success" | "error";

export interface ToastItem {
  id: number;
  tone: ToastTone;
  titleKey: MessageKey;
  titleParams?: Record<string, string | number>;
  descriptionKey?: MessageKey;
  descriptionParams?: Record<string, string | number>;
}

/**
 * Toasts légers (équivalent léger de Sonner côté React), sans dépendance supplémentaire.
 * L’affichage est assuré par `ToastHostComponent` monté dans `AppShellComponent`.
 */
@Injectable({ providedIn: "root" })
export class ToastService {
  private static nextId = 1;
  private readonly _items = signal<ToastItem[]>([]);
  readonly items = this._items.asReadonly();
  readonly count = computed(() => this._items().length);

  private dismissTimers = new Map<number, ReturnType<typeof setTimeout>>();
  /** Durée d’affichage par défaut (ms). */
  private readonly defaultDuration = 4500;

  show(opts: Omit<ToastItem, "id"> & { durationMs?: number }): void {
    const { durationMs = this.defaultDuration, ...rest } = opts;
    const id = ToastService.nextId++;
    this._items.update((list) => [...list, { ...rest, id }]);

    if (durationMs > 0 && typeof document !== "undefined") {
      const handle = setTimeout(() => this.dismiss(id), durationMs);
      this.dismissTimers.set(id, handle);
    }
  }

  success(
    titleKey: MessageKey,
    desc?: { key: MessageKey; params?: Record<string, string | number> },
    titleParams?: Record<string, string | number>,
  ): void {
    this.show({
      tone: "success",
      titleKey,
      titleParams,
      descriptionKey: desc?.key,
      descriptionParams: desc?.params,
    });
  }

  error(
    titleKey: MessageKey,
    desc?: { key: MessageKey; params?: Record<string, string | number> },
    titleParams?: Record<string, string | number>,
  ): void {
    this.show({
      tone: "error",
      titleKey,
      titleParams,
      descriptionKey: desc?.key,
      descriptionParams: desc?.params,
    });
  }

  dismiss(id: number): void {
    const t = this.dismissTimers.get(id);
    if (t !== undefined) {
      clearTimeout(t);
      this.dismissTimers.delete(id);
    }
    this._items.update((list) => list.filter((x) => x.id !== id));
  }
}
