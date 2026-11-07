import { Component, DestroyRef, computed, inject, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";

import { BRAND } from "@/config/brand";
import { authErrorMessage } from "@/lib/auth/messages";
import { OTP_LENGTH, OTP_TTL_MS, normalizeEmail } from "@/lib/auth/policy";
import type { CodeSent } from "@/lib/auth/types";
import { AuthService, DEMO_ACCOUNTS, DEMO_PASSWORD } from "../shared/auth.service";
import { LocaleService } from "../shared/locale.service";
import { OtpInputComponent } from "../shared/otp-input.component";
import { StoreService } from "../shared/store.service";

type Step = { name: "credentials" } | { name: "code"; challengeId: string; sent: CodeSent };

/**
 * Angular port of src/routes/login.tsx (React/TanStack). First fully migrated
 * screen — proves the shared design tokens (styles.css), i18n dictionaries,
 * and auth/demo-service business logic all carry over to Angular unchanged;
 * only the component layer (JSX → template, hooks → signals) is rewritten.
 *
 * Simplified vs. the React version for this first slice:
 * - DemoInvitationNotice (pending invitation links) is omitted — depends on
 *   store state that doesn't exist yet in this app.
 *
 * DemoMailNotice IS ported, unlike the above: without it a demo-mode user
 * has no way to ever see the OTP code and the flow would be a dead end.
 * DemoInvitationNotice is also ported, except its link to "/invitation" is
 * plain text for now — that page (src/routes/invitation.tsx) isn't ported.
 */
@Component({
  selector: "app-login-page",
  imports: [OtpInputComponent, RouterLink],
  template: `
    <div class="grid min-h-screen lg:grid-cols-[1.1fr_1fr]">
      <div
        class="relative hidden overflow-hidden bg-sidebar p-12 text-sidebar-foreground lg:flex lg:flex-col"
      >
        <div class="bg-dots absolute inset-0 opacity-40" aria-hidden="true"></div>
        <div class="relative flex items-center gap-3">
          <div
            class="grid size-10 place-items-center rounded-md bg-sidebar-primary font-bold text-sidebar-primary-foreground"
          >
            {{ brand.monogram }}
          </div>
          <span class="text-lg font-semibold text-sidebar-accent-foreground">{{ brand.name }}</span>
        </div>
        <div class="relative mt-auto max-w-md">
          <p class="text-[40px] font-semibold leading-[1.1] text-sidebar-accent-foreground">
            {{ t()("auth.layout.headline") }}
          </p>
          <p class="mt-4 opacity-75">{{ t()("auth.layout.lead") }}</p>
          <dl class="mt-10 grid grid-cols-3 gap-6 border-t border-sidebar-border pt-6">
            <div>
              <dt class="text-2xl font-semibold text-sidebar-accent-foreground tabular">
                {{ localeService.formatNumber(stats().scoops) }}
              </dt>
              <dd class="text-xs opacity-70">{{ t()("auth.layout.stat.scoop") }}</dd>
            </div>
            <div>
              <dt class="text-2xl font-semibold text-sidebar-accent-foreground tabular">
                {{ localeService.formatNumber(stats().plots) }}
              </dt>
              <dd class="text-xs opacity-70">{{ t()("auth.layout.stat.plots") }}</dd>
            </div>
            <div>
              <dt class="text-2xl font-semibold text-sidebar-accent-foreground tabular">
                {{ localeService.formatNumber(stats().producers) }}
              </dt>
              <dd class="text-xs opacity-70">{{ t()("auth.layout.stat.producers") }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <main
        class="flex items-start justify-center px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-8 sm:items-center sm:p-6"
      >
        <div class="w-full max-w-sm">
          <div class="mb-4 flex justify-end">
            <div class="inline-flex rounded-md border p-0.5 text-xs">
              <button
                type="button"
                class="rounded px-2 py-1"
                [class.bg-primary-soft]="locale() === 'fr'"
                (click)="localeService.setLocale('fr')"
              >
                {{ t()("locale.fr") }}
              </button>
              <button
                type="button"
                class="rounded px-2 py-1"
                [class.bg-primary-soft]="locale() === 'wo'"
                (click)="localeService.setLocale('wo')"
              >
                {{ t()("locale.wo") }}
              </button>
            </div>
          </div>
          <div class="mb-8 flex items-center gap-3 lg:hidden">
            <div
              class="grid size-10 place-items-center rounded-md bg-primary font-bold text-primary-foreground"
            >
              {{ brand.monogram }}
            </div>
            <div class="leading-tight">
              <div class="font-semibold">{{ brand.name }}</div>
              <div class="text-xs text-muted-foreground">{{ brand.tagline }}</div>
            </div>
          </div>

          @if (step().name === "code") {
            <h1 class="text-xl font-semibold">{{ t()("auth.otp.title") }}</h1>
            <div class="mt-6 space-y-5">
              <form
                class="space-y-5"
                (submit)="$event.preventDefault(); submitOtp(otpCode())"
              >
                <p class="text-sm text-muted-foreground">
                  {{
                    t()("auth.otp.sent", {
                      length: OTP_LENGTH,
                      email: sentInfo()?.maskedEmail ?? "",
                      minutes: otpMinutes
                    })
                  }}
                </p>
                <div class="space-y-2">
                  <label id="otp-label" for="otp" class="text-sm font-medium leading-none">{{
                    t()("auth.otp.code")
                  }}</label>
                  <app-otp-input
                    fieldId="otp"
                    labelledBy="otp-label"
                    [value]="otpCode()"
                    [disabled]="otpBusy()"
                    (valueChange)="onOtpValueChange($event)"
                    (complete)="submitOtp($event)"
                  />
                </div>
                @if (otpError()) {
                  <div role="alert" class="rounded-md bg-danger-bg px-3 py-2.5 text-sm text-danger-fg">
                    {{ otpError() }}
                  </div>
                }
                @if (otpInfo()) {
                  <div role="status" class="rounded-md bg-info-bg px-3 py-2.5 text-sm text-info-fg">
                    {{ otpInfo() }}
                  </div>
                }
                @if (demoMail(); as mail) {
                  <div role="status" class="rounded-md border border-dashed border-border-strong bg-muted p-3 text-sm">
                    <div class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {{ t()("auth.mail.title") }}
                    </div>
                    <p class="mt-1">
                      {{ t()("auth.mail.line", { to: mail.to }) }} {{ t()("auth.mail.code") }}
                      <span class="font-semibold tabular tracking-widest">{{ mail.code }}</span>
                    </p>
                  </div>
                }
                <button
                  type="submit"
                  class="inline-flex h-touch w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
                  [disabled]="otpBusy() || otpCode().length < OTP_LENGTH"
                >
                  {{ otpBusy() ? t()("auth.otp.verifying") : t()("auth.otp.submit") }}
                </button>
                <div class="flex flex-wrap items-center justify-between gap-2 text-sm">
                  <button
                    type="button"
                    class="font-semibold text-primary hover:underline disabled:cursor-not-allowed disabled:text-muted-foreground disabled:no-underline"
                    [disabled]="otpBusy() || resendWait() > 0"
                    (click)="resend()"
                  >
                    {{
                      resendWait() > 0
                        ? t()("auth.otp.resendIn", { seconds: resendWait() })
                        : t()("auth.otp.resend")
                    }}
                  </button>
                  <button
                    type="button"
                    class="text-muted-foreground hover:text-foreground"
                    (click)="backToCredentials()"
                  >
                    {{ t()("auth.otp.back") }}
                  </button>
                </div>
              </form>
            </div>
          } @else {
            <h1 class="text-xl font-semibold">{{ t()("auth.login.title") }}</h1>
            <div class="mt-1 text-muted-foreground">{{ t()("auth.login.description") }}</div>
            <form class="mt-6 space-y-5" novalidate (submit)="onCredentialsSubmit($event)">
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
              <div class="space-y-2">
                <div class="flex items-baseline justify-between gap-2">
                  <label for="password" class="text-sm font-medium leading-none">{{
                    t()("auth.login.password")
                  }}</label>
                  <div class="flex items-center gap-3">
                    <a
                      routerLink="/mot-de-passe-oublie"
                      class="rounded text-xs font-semibold text-primary hover:underline"
                    >
                      {{ t()("auth.login.forgot") }}
                    </a>
                    <button
                      type="button"
                      class="rounded text-xs font-semibold text-primary hover:underline"
                      (click)="passwordVisible.set(!passwordVisible())"
                    >
                      {{ passwordVisible() ? t()("auth.password.hide") : t()("auth.password.show") }}
                    </button>
                  </div>
                </div>
                <input
                  id="password"
                  [type]="passwordVisible() ? 'text' : 'password'"
                  autocomplete="current-password"
                  spellcheck="false"
                  autocapitalize="none"
                  [placeholder]="t()('auth.login.passwordPlaceholder')"
                  [value]="password()"
                  (input)="password.set(inputValue($event))"
                  class="flex h-touch w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm placeholder:text-placeholder focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
                />
              </div>
              @if (error()) {
                <div role="alert" class="rounded-md bg-danger-bg px-3 py-2.5 text-sm text-danger-fg">
                  {{ error() }}
                </div>
              }
              <button
                type="submit"
                class="inline-flex h-touch w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
                [disabled]="busy()"
              >
                {{ busy() ? t()("auth.login.submitting") : t()("auth.login.submit") }}
              </button>
              <p class="text-xs text-muted-foreground">{{ t()("auth.login.invitationHint") }}</p>
            </form>

            @if (invitationLinks().length > 0) {
              <div
                role="status"
                class="mt-5 rounded-md border border-dashed border-border-strong bg-muted p-3 text-sm"
              >
                <div class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {{ t()("auth.mail.invitationTitle") }}
                </div>
                <ul class="mt-1 space-y-2">
                  @for (link of invitationLinks(); track link.email) {
                    <li>
                      <p>{{ t()("auth.mail.invitationLine", { to: link.email }) }}</p>
                      <span class="font-semibold text-primary">{{
                        t()("auth.mail.invitationOpen", { name: link.name })
                      }}</span>
                    </li>
                  }
                </ul>
              </div>
            }

            <section class="mt-8 border-t pt-5" aria-labelledby="demo-accounts">
              <h2 id="demo-accounts" class="text-sm font-semibold">
                {{ t()("auth.login.demoTitle") }}
              </h2>
              <p class="mt-1 text-xs text-muted-foreground">
                {{ t()("auth.login.demoIntro") }}
                <span class="font-semibold text-foreground">{{ demoPassword }}</span>
              </p>
              <ul class="mt-3 space-y-1.5">
                @for (account of demoAccounts; track account.email) {
                  <li>
                    <button
                      type="button"
                      class="w-full rounded-md border px-3 py-2 text-left text-xs transition-colors hover:bg-muted"
                      [class.border-primary]="email() === account.email"
                      [class.bg-primary-soft]="email() === account.email"
                      (click)="fillDemoAccount(account.email)"
                    >
                      <span class="block font-semibold">{{ account.label }}</span>
                      <span class="block text-muted-foreground">{{ account.email }}</span>
                    </button>
                  </li>
                }
              </ul>
            </section>
          }

          <p class="mt-8 text-xs text-muted-foreground">{{ t()("auth.login.footer") }}</p>
        </div>
      </main>
    </div>
  `,
})
export default class LoginPage {
  private readonly auth = inject(AuthService);
  private readonly store = inject(StoreService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly localeService = inject(LocaleService);

  protected readonly brand = BRAND;
  protected readonly demoAccounts = DEMO_ACCOUNTS;
  protected readonly demoPassword = DEMO_PASSWORD;
  protected readonly OTP_LENGTH = OTP_LENGTH;
  protected readonly otpMinutes = Math.round(OTP_TTL_MS / 60000);

  protected readonly locale = this.localeService.locale;
  protected readonly t = this.localeService.t;
  protected readonly invitationLinks = computed(() => {
    this.store.state(); // re-evaluate when users change
    return this.auth.pendingInvitationLinks();
  });
  protected readonly stats = computed(() => {
    const s = this.store.state();
    return {
      scoops: s.scoops.length,
      plots: s.plots.length,
      producers: s.producers.filter((p) => !p.mergedInto).length,
    };
  });

  protected readonly step = signal<Step>({ name: "credentials" });
  protected readonly email = signal("");
  protected readonly password = signal("");
  protected readonly passwordVisible = signal(false);
  protected readonly error = signal("");
  protected readonly busy = signal(false);

  protected readonly otpCode = signal("");
  protected readonly otpError = signal("");
  protected readonly otpInfo = signal("");
  protected readonly otpBusy = signal(false);

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
    const interval = setInterval(() => this.now.set(Date.now()), 500);
    this.destroyRef.onDestroy(() => clearInterval(interval));

    const unsubscribe = this.auth.mailbox.subscribe(() => {
      this.demoMail.set(this.auth.mailbox.latest());
    });
    this.destroyRef.onDestroy(unsubscribe);
  }

  protected inputValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  protected onOtpValueChange(value: string): void {
    this.otpCode.set(value);
  }

  protected fillDemoAccount(email: string): void {
    this.email.set(email);
    this.password.set(DEMO_PASSWORD);
    this.error.set("");
  }

  protected onCredentialsSubmit(event: Event): void {
    event.preventDefault();
    void this.submitCredentials();
  }

  protected async submitCredentials(): Promise<void> {
    const normalized = normalizeEmail(this.email());
    if (!normalized) return this.error.set(this.t()("auth.login.errorEmail"));
    if (!this.password()) return this.error.set(this.t()("auth.login.errorPassword"));
    this.busy.set(true);
    this.error.set("");
    try {
      const { challengeId, ...sent } = await this.auth.signIn(normalized, this.password());
      this.step.set({ name: "code", challengeId, sent });
    } catch (e) {
      this.error.set(authErrorMessage(e, this.t()));
    } finally {
      this.busy.set(false);
    }
  }

  protected async submitOtp(code: string): Promise<void> {
    const current = this.step();
    if (current.name !== "code" || this.otpBusy()) return;
    if (code.length < OTP_LENGTH) {
      this.otpError.set(this.t()("auth.otp.errorLength", { length: OTP_LENGTH }));
      return;
    }
    this.otpBusy.set(true);
    this.otpError.set("");
    try {
      const user = await this.auth.verifyOtp(current.challengeId, code);
      this.store.actions.login(user.name, user.email, user.role);
      await this.router.navigateByUrl("/");
    } catch (e) {
      this.otpError.set(authErrorMessage(e, this.t()));
      this.otpCode.set("");
    } finally {
      this.otpBusy.set(false);
    }
  }

  protected async resend(): Promise<void> {
    const current = this.step();
    if (current.name !== "code") return;
    this.otpBusy.set(true);
    this.otpError.set("");
    try {
      const next = await this.auth.resendOtp(current.challengeId);
      this.step.set({ name: "code", challengeId: current.challengeId, sent: next });
      this.otpCode.set("");
      this.otpInfo.set(this.t()("auth.otp.resent"));
    } catch (e) {
      this.otpInfo.set("");
      this.otpError.set(authErrorMessage(e, this.t()));
    } finally {
      this.otpBusy.set(false);
    }
  }

  protected backToCredentials(): void {
    this.step.set({ name: "credentials" });
    this.password.set("");
    this.error.set("");
    this.otpCode.set("");
    this.otpError.set("");
    this.otpInfo.set("");
  }
}
