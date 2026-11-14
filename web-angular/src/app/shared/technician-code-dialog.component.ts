import { Component, computed, inject, model, signal } from "@angular/core";

import type { MessageKey } from "@/lib/i18n";

import { LocaleService } from "./locale.service";
import { StoreService } from "./store.service";
import { IconComponent } from "./ui/icon.component";
import { ModalComponent } from "./ui/modal.component";
import { SnackbarService } from "./ui/snackbar.service";
import { V2_PAGE_STYLES } from "./ui/v2-page.styles";

/** Code temporaire à montrer une seule fois, avec de quoi le remettre au technicien. */
export interface TechnicianCodeView {
  userId: string;
  name: string;
  /** 8 chiffres. */
  code: string;
  expiresAt: string;
  /** Adresse e-mail du technicien, si elle est connue : active le bouton d'envoi. */
  email: string;
}

/**
 * Code temporaire d'un technicien (charte V2) : affiché une seule fois, à remettre en main propre. L'envoi par e-mail
 * n'est jamais automatique : le gestionnaire l'envoie seulement si le technicien le demande.
 *
 * `<app-technician-code-dialog [(view)]="codeView" />` : ouvert tant que `view` contient un code.
 */
@Component({
  selector: "app-technician-code-dialog",
  imports: [IconComponent, ModalComponent],
  styles: [
    V2_PAGE_STYLES,
    `
      .code {
        display: block;
        border-radius: 20px;
        background: var(--v2-sauge);
        padding: 22px 16px;
        text-align: center;
        font-family: var(--v2-font-mono);
        font-size: 40px;
        font-weight: 800;
        letter-spacing: 0.18em;
        color: var(--v2-foret);
        user-select: all;
      }
    `,
  ],
  template: `
    @if (view(); as shown) {
      <ui-modal
        [open]="true"
        [title]="t()('tech.code.title', { name: shown.name })"
        [description]="t()('tech.code.description')"
        icon="lock"
        tone="brand"
        [width]="560"
        [closeLabel]="t()('common.close')"
        (closed)="view.set(null)"
      >
        <div class="space-y-4 pb-6">
          <span class="code" [attr.aria-label]="t()('tech.code.aria')">{{ grouped() }}</span>
          <button type="button" class="btn btn-ghost w-full justify-center" (click)="copy(shown.code)">
            <ui-icon [name]="copied() ? 'check' : 'content_copy'" [size]="18" />{{ copied() ? t()("tech.code.copied") : t()("tech.code.copy") }}
          </button>
          <p class="notice"><ui-icon name="info" [size]="18" />{{ t()("tech.code.rules", { date: expiry() }) }}</p>
          @if (shown.email) {
            <p class="sub">{{ t()("tech.code.emailText", { email: shown.email }) }}</p>
          }
        </div>
        @if (shown.email) {
          <button modal-footer type="button" class="btn btn-ghost" (click)="sendByEmail(shown)">
            <ui-icon name="mail" [size]="18" />{{ t()("tech.code.sendEmail") }}
          </button>
        }
        <button modal-footer type="button" class="btn btn-primary" (click)="view.set(null)">
          {{ t()("tech.code.done") }}<span class="btn-chip"><ui-icon name="check" [size]="18" /></span>
        </button>
      </ui-modal>
    }
  `,
})
export class TechnicianCodeDialogComponent {
  readonly view = model<TechnicianCodeView | null>(null);

  private readonly store = inject(StoreService);
  private readonly locale = inject(LocaleService);
  private readonly snackbar = inject(SnackbarService);
  protected readonly t = this.locale.t;

  /** Vrai un court instant après la copie, pour le dire à la personne. */
  protected readonly copied = signal(false);

  /** Copie le code sans espace (8 chiffres), prêt à être collé dans un message. */
  protected async copy(code: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      this.snackbar.error(this.t()("tech.code.copyFailed"));
      return;
    }
    this.copied.set(true);
    this.snackbar.success(this.t()("tech.code.copiedToast"));
    setTimeout(() => this.copied.set(false), 2500);
  }

  /** « 1234 5678 » : plus facile à lire à voix haute. */
  protected readonly grouped = computed(() => {
    const code = this.view()?.code ?? "";
    return `${code.slice(0, 4)} ${code.slice(4)}`;
  });

  protected readonly expiry = computed(() => {
    const at = this.view()?.expiresAt;
    return at
      ? new Intl.DateTimeFormat(this.locale.locale() === "wo" ? "fr-SN" : "fr-FR", { dateStyle: "long", timeStyle: "short" }).format(new Date(at))
      : "";
  });

  protected sendByEmail(shown: TechnicianCodeView): void {
    const result = this.store.actions.sendTechnicianCodeByEmail(shown.userId, shown.code);
    if (!result.ok) {
      this.snackbar.error(result.error);
      return;
    }
    this.snackbar.success(this.t()("tech.code.sent", { email: result.email }));
  }
}
