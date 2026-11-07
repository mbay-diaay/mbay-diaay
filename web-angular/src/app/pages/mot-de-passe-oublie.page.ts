import {
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from "@angular/core";
import { Router, RouterLink } from "@angular/router";

import { authErrorMessage } from "@/lib/auth/messages";
import {
  OTP_LENGTH,
  OTP_TTL_MS,
  isPasswordValid,
  normalizeEmail,
} from "@/lib/auth/policy";
import type { CodeSent } from "@/lib/auth/types";
import { AuthService } from "../shared/auth.service";
import { LocaleService } from "../shared/locale.service";

type Step =
  | { name: "email" }
  | { name: "code"; email: string; sent: CodeSent }
  | { name: "password"; email: string; resetToken: string };

/**
 * Port allégé de src/routes/mot-de-passe-oublie.tsx — réinitialisation en
 * trois étapes via AuthService (démo ou API).
 */
@Component({
  selector: "app-mot-de-passe-oublie-page",
  imports: [RouterLink],
  template: `
    <div
      class="flex min-h-screen items-start justify-center px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-8 sm:items-center sm:p-6"
    >
      <div class="w-full max-w-sm">
        <h1 class="text-xl font-semibold">{{ t()("auth.forgot.title") }}</h1>
        <p class="mt-1 text-muted-foreground">{{ t()("auth.forgot.description") }}</p>

        @switch (step().name) {
          @case ("email") {
            <form class="mt-6 space-y-5" novalidate (submit)="$event.preventDefault(); submitEmail()">
              <div class="space-y-2">
                <label for="email" class="text-sm font-medium leading-none">{{
                  t()("auth.login.email")
                }}</label>
                <input
                  id="email"
                  type="email"
                  autocomplete="username"
                  inputmode="email"
                  autocapitalize="none"
                  spellcheck="false"
                  [placeholder]="t()('auth.login.emailPlaceholder')"
                  [value]="email()"
                  (input)="email.set(inputValue($event))"
                  class="flex h-touch w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm placeholder:text-placeholder focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
                  autofocus
                />
              </div>
              @if (error()) {
                <div role="alert" class="rounded-md bg-danger-bg px-3 py-2.5 text-sm text-danger-fg">
                  {{ error() }}
                </div>
              }
              <button
                type="submit"
                class="inline-flex h-touch w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
                [disabled]="busy()"
              >
                {{ busy() ? t()("auth.forgot.sending") : t()("auth.forgot.send") }}
              </button>
            </form>
          }
          @case ("code") {
            <div class="mt-6 space-y-5">
              <h2 class="text-lg font-semibold">{{ t()("auth.forgot.codeTitle") }}</h2>
              <p class="text-sm text-muted-foreground">{{ t()("auth.forgot.step2") }}</p>
              <form class="space-y-4" (submit)="$event.preventDefault(); submitCode()">
                <p class="text-sm text-muted-foreground">
                  {{
                    t()("auth.otp.sent", {
                      length: OTP_LENGTH,
                      email: sentInfo()?.maskedEmail ?? "",
                      minutes: otpMinutes,
                    })
                  }}
                </p>
                <div class="space-y-2">
                  <label for="code" class="text-sm font-medium">{{ t()("auth.otp.code") }}</label>
                  <input
                    id="code"
                    inputmode="numeric"
                    autocomplete="one-time-code"
                    maxlength="6"
                    [value]="code()"
                    (input)="onCodeInput($event)"
                    [disabled]="busy()"
                    class="flex h-9 w-full pointer-coarse:h-touch rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm tabular tracking-[0.5em] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 md:text-sm"
                  />
                </div>
                @if (error()) {
                  <div role="alert" class="rounded-md bg-danger-bg px-3 py-2.5 text-sm text-danger-fg">
                    {{ error() }}
                  </div>
                }
                @if (demoMail(); as mail) {
                  <div
                    role="status"
                    class="rounded-md border border-dashed border-border-strong bg-muted p-3 text-sm"
                  >
                    <div class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {{ t()("auth.mail.title") }}
                    </div>
                    <p class="mt-1">
                      {{ t()("auth.mail.line", { to: mail.to }) }}
                      {{ t()("auth.mail.code") }}
                      <span class="font-semibold tabular tracking-widest">{{ mail.code }}</span>
                    </p>
                  </div>
                }
                <button
                  type="submit"
                  class="inline-flex h-touch w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                  [disabled]="busy() || code().length < OTP_LENGTH"
                >
                  {{ busy() ? t()("auth.otp.verifying") : t()("auth.forgot.validate") }}
                </button>
              </form>
              <div class="flex flex-wrap items-center justify-between gap-2 text-sm">
                <button
                  type="button"
                  class="font-semibold text-primary hover:underline disabled:cursor-not-allowed disabled:text-muted-foreground disabled:no-underline"
                  [disabled]="busy() || resendWait() > 0"
                  (click)="resend()"
                >
                  {{
                    resendWait() > 0
                      ? t()("auth.otp.resendIn", { seconds: resendWait() })
                      : t()("auth.otp.resend")
                  }}
                </button>
                <button type="button" class="text-muted-foreground hover:text-foreground" (click)="backToEmail()">
                  {{ t()("auth.otp.back") }}
                </button>
              </div>
            </div>
          }
          @case ("password") {
            <form class="mt-6 space-y-5" novalidate (submit)="$event.preventDefault(); submitPassword()">
              <h2 class="text-lg font-semibold">{{ t()("auth.forgot.newTitle") }}</h2>
              <p class="text-sm text-muted-foreground">{{ t()("auth.forgot.newDescription") }}</p>
              <div class="space-y-2">
                <label for="pw1" class="text-sm font-medium">{{ t()("auth.forgot.newPassword") }}</label>
                <input
                  id="pw1"
                  type="password"
                  autocomplete="new-password"
                  [value]="password()"
                  (input)="password.set(inputValue($event))"
                  class="flex h-touch w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
                  autofocus
                />
              </div>
              <div class="space-y-2">
                <label for="pw2" class="text-sm font-medium">{{ t()("auth.forgot.confirm") }}</label>
                <input
                  id="pw2"
                  type="password"
                  autocomplete="new-password"
                  [value]="confirm()"
                  (input)="confirm.set(inputValue($event))"
                  class="flex h-touch w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
                />
              </div>
              @if (mismatch()) {
                <div role="alert" class="rounded-md bg-danger-bg px-3 py-2.5 text-sm text-danger-fg">
                  {{ t()("auth.forgot.mismatch") }}
                </div>
              } @else if (error()) {
                <div role="alert" class="rounded-md bg-danger-bg px-3 py-2.5 text-sm text-danger-fg">
                  {{ error() }}
                </div>
              }
              <button
                type="submit"
                class="inline-flex h-touch w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                [disabled]="busy() || !canSubmitPassword()"
              >
                {{ busy() ? t()("auth.forgot.saving") : t()("auth.forgot.save") }}
              </button>
            </form>
          }
        }

        <p class="mt-8 text-center text-sm">
          <a routerLink="/login" class="font-semibold text-primary hover:underline pointer-coarse:inline-block pointer-coarse:py-2">
            {{ t()("auth.forgot.back") }}
          </a>
        </p>
      </div>
    </div>
  `,
})
export default class MotDePasseOubliePage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly OTP_LENGTH = OTP_LENGTH;
  protected readonly otpMinutes = Math.round(OTP_TTL_MS / 60000);

  protected readonly step = signal<Step>({ name: "email" });
  protected readonly email = signal("");
  protected readonly code = signal("");
  protected readonly password = signal("");
  protected readonly confirm = signal("");
  protected readonly error = signal("");
  protected readonly busy = signal(false);
  private readonly now = signal(Date.now());

  protected readonly sentInfo = computed(() => {
    const s = this.step();
    return s.name === "code" ? s.sent : null;
  });
  protected readonly resendWait = computed(() => {
    const sent = this.sentInfo();
    if (!sent) return 0;
    this.now();
    return Math.max(0, Math.ceil((sent.resendAvailableAt - Date.now()) / 1000));
  });
  protected readonly demoMail = signal(this.auth.mailbox.latest());

  constructor() {
    const tick = setInterval(() => this.now.set(Date.now()), 500);
    this.destroyRef.onDestroy(() => clearInterval(tick));
    const unsub = this.auth.mailbox.subscribe(() => {
      this.demoMail.set(this.auth.mailbox.latest());
    });
    this.destroyRef.onDestroy(unsub);
  }

  protected inputValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  protected onCodeInput(event: Event): void {
    const v = this.inputValue(event).replace(/\D/g, "").slice(0, OTP_LENGTH);
    this.code.set(v);
  }

  protected mismatch(): boolean {
    return this.confirm().length > 0 && this.confirm() !== this.password();
  }

  protected canSubmitPassword(): boolean {
    const s = this.step();
    if (s.name !== "password") return false;
    return isPasswordValid(this.password(), s.email) && this.confirm() === this.password();
  }

  protected async submitEmail(): Promise<void> {
    const normalized = normalizeEmail(this.email());
    if (!normalized) {
      this.error.set(this.t()("auth.login.errorEmail"));
      return;
    }
    this.busy.set(true);
    this.error.set("");
    try {
      const sent = await this.auth.requestPasswordReset(normalized);
      this.step.set({ name: "code", email: normalized, sent });
      this.code.set("");
    } catch (e) {
      this.error.set(authErrorMessage(e, this.t()));
    } finally {
      this.busy.set(false);
    }
  }

  protected async submitCode(): Promise<void> {
    const s = this.step();
    if (s.name !== "code") return;
    const raw = this.code();
    if (raw.length < OTP_LENGTH) return;
    this.busy.set(true);
    this.error.set("");
    try {
      const { resetToken } = await this.auth.verifyResetCode(s.email, raw);
      this.step.set({ name: "password", email: s.email, resetToken });
      this.password.set("");
      this.confirm.set("");
    } catch (e) {
      this.error.set(authErrorMessage(e, this.t()));
      this.code.set("");
    } finally {
      this.busy.set(false);
    }
  }

  protected async resend(): Promise<void> {
    const s = this.step();
    if (s.name !== "code") return;
    this.busy.set(true);
    this.error.set("");
    try {
      const next = await this.auth.requestPasswordReset(s.email);
      this.step.set({ name: "code", email: s.email, sent: next });
      this.code.set("");
    } catch (e) {
      this.error.set(authErrorMessage(e, this.t()));
    } finally {
      this.busy.set(false);
    }
  }

  protected backToEmail(): void {
    this.step.set({ name: "email" });
    this.code.set("");
    this.error.set("");
  }

  protected async submitPassword(): Promise<void> {
    const s = this.step();
    if (s.name !== "password" || !this.canSubmitPassword()) return;
    this.busy.set(true);
    this.error.set("");
    try {
      await this.auth.resetPassword(s.resetToken, this.password());
      await this.router.navigate(["/login"], { queryParams: { motdepasse: "modifie" } });
    } catch (e) {
      this.error.set(authErrorMessage(e, this.t()));
    } finally {
      this.busy.set(false);
    }
  }
}
