import { Injectable, signal } from "@angular/core";

/** Couleurs d'état de la charte V2 (p. 10) : fond + encre associée. */
export type SnackKind = "success" | "info" | "warning" | "error" | "blocking";

export interface Snack {
  id: number;
  kind: SnackKind;
  text: string;
  /** Durée d'affichage en ms (0 = reste jusqu'à fermeture). */
  duration: number;
}

const DEFAULT_DURATION: Record<SnackKind, number> = {
  success: 4000,
  info: 4000,
  warning: 6000,
  error: 6000,
  /** Bloquant / hors ligne : reste affiché jusqu'à fermeture. */
  blocking: 0,
};

/**
 * Snackbar flottante (charte V2), un message à la fois : un nouveau message remplace le précédent.
 * Afficher : `inject(SnackbarService).error("…")`. Le rendu est fait par `<ui-snackbar />`,
 * à placer une fois dans l'écran, sous un ancêtre `.charte-v2` (tokens `--v2-*`).
 */
@Injectable({ providedIn: "root" })
export class SnackbarService {
  private readonly current = signal<Snack | null>(null);
  readonly snack = this.current.asReadonly();
  private seq = 0;
  private timer: ReturnType<typeof setTimeout> | undefined;

  show(kind: SnackKind, text: string, duration = DEFAULT_DURATION[kind]): void {
    clearTimeout(this.timer);
    this.current.set({ id: ++this.seq, kind, text, duration });
    if (duration > 0) this.timer = setTimeout(() => this.dismiss(), duration);
  }

  success(text: string, duration?: number): void {
    this.show("success", text, duration);
  }

  info(text: string, duration?: number): void {
    this.show("info", text, duration);
  }

  warning(text: string, duration?: number): void {
    this.show("warning", text, duration);
  }

  error(text: string, duration?: number): void {
    this.show("error", text, duration);
  }

  blocking(text: string, duration?: number): void {
    this.show("blocking", text, duration);
  }

  dismiss(): void {
    clearTimeout(this.timer);
    this.current.set(null);
  }
}
