import "@shared/ui/charte-v2-fonts";

import { Component, DOCUMENT, DestroyRef, computed, inject, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleAlert,
  Clock,
  ExternalLink,
  Eye,
  EyeOff,
  Inbox,
  Loader2,
  Lock,
  LucideAngularModule,
  Mail,
  MailCheck,
  Phone,
  RotateCw,
  ShieldCheck,
} from "lucide-angular";

import { CRADESC, LOGIN_PHOTOS } from "@/config/brand";
import { isApiMode } from "@/lib/api/config";
import { DEMO_MODE } from "@/lib/auth/config";
import { authErrorMessage } from "@/lib/auth/messages";
import { OTP_LENGTH, OTP_TTL_MS, normalizeEmail } from "@/lib/auth/policy";
import type { CodeSent } from "@/lib/auth/types";
import { AuthService, DEMO_ACCOUNTS, DEMO_PASSWORD } from "@shared/auth.service";
import { LocaleService } from "@shared/locale.service";
import { OtpInputComponent } from "@shared/otp-input.component";
import { StoreService } from "@shared/store.service";
import {
  BrandLogoComponent,
  PhotoSlideshowComponent,
  SnackbarComponent,
  SnackbarService,
} from "@shared/ui";

type Step = { name: "credentials" } | { name: "code"; challengeId: string; sent: CodeSent };

/**
 * Connexion (charte graphique V2) : e-mail + mot de passe, puis code à usage unique.
 *
 * Règle absolue : le CRADESC, porteur de la plateforme, est mis en avant (carte « Porté par »
 * en tête des partenaires sur grand écran, bandeau dès le haut de l'écran sur mobile).
 * Forêt pour l'identité, crème pour le travail. Le citron reste rare : jamais sur crème ni blanc,
 * il n'apparaît que sur la forêt (signature, puce d'action du bouton principal).
 *
 * Les comptes de démonstration ne sont plus listés : voir `docs/COMPTES_DEMO.md`.
 * Seul le courriel simulé (code OTP aléatoire) reste visible en démonstration locale.
 */
@Component({
  selector: "app-login-page",
  imports: [
    OtpInputComponent,
    RouterLink,
    LucideAngularModule,
    BrandLogoComponent,
    SnackbarComponent,
    PhotoSlideshowComponent,
  ],
  styles: `
    /* Tout élément cliquable affiche la main (Tailwind v4 remet les boutons en curseur par défaut). */
    button:not(:disabled),
    a[href],
    [role="radio"] {
      cursor: pointer;
    }
    button:disabled {
      cursor: not-allowed;
    }
    .mono {
      font-family: var(--v2-font-mono);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .label {
      display: block;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--v2-ardoise);
    }
    .field {
      height: 60px;
      width: 100%;
      border-radius: var(--v2-radius-champ);
      /* Bordure visible au repos (gris trait de la charte), plus marquée au survol. */
      border: 1.5px solid var(--v2-gris-trait);
      background: var(--v2-blanc);
      padding-left: 56px;
      padding-right: 16px;
      font-size: 16px;
      font-weight: 500;
      color: var(--v2-encre);
      transition:
        border-color 0.15s ease,
        box-shadow 0.15s ease;
    }
    @media (max-width: 420px) {
      :host ::ng-deep app-otp-input input {
        width: 46px;
        height: 58px;
      }
    }
    /* Écrans d'ordinateur peu hauts (≤ 820 px) : tout tient sans défiler. */
    @media (min-width: 1024px) and (max-height: 820px) {
      .form-col h1 {
        margin-top: 1rem;
        font-size: 34px;
      }
      .form-col form {
        margin-top: 1.25rem;
      }
      .form-col form > * + * {
        margin-top: 0.875rem;
      }
      .form-col .field {
        height: 54px;
      }
      .form-col .btn-primary {
        height: 58px;
        margin-top: 1.125rem !important;
      }
      .form-col .help {
        margin-top: 1.25rem;
        padding-top: 1rem;
      }
      .session-note {
        display: none;
      }
    }
    .field::placeholder {
      color: var(--v2-gris-texte);
      opacity: 0.75;
      font-weight: 500;
    }
    .field:hover {
      border-color: var(--v2-gris-texte);
    }
    .field:focus-visible {
      outline: none;
      border: 2px solid var(--v2-foret);
      padding-left: 55.5px;
      box-shadow: var(--v2-halo);
    }
    .field[aria-invalid="true"] {
      border: 2px solid var(--v2-erreur-fg);
      padding-left: 55.5px;
    }
    .btn-primary {
      display: flex;
      height: 64px;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      border-radius: var(--v2-radius-champ);
      background: var(--v2-foret);
      padding: 0 8px 0 24px;
      font-size: 17px;
      font-weight: 800;
      color: var(--v2-blanc);
      transition: background-color 0.15s ease;
    }
    .btn-primary:hover {
      background: var(--v2-foret-clair);
    }
    .btn-primary:focus-visible {
      outline: none;
      box-shadow: var(--v2-halo);
    }
    .btn-primary:disabled {
      background: var(--v2-lin);
      color: var(--v2-gris-texte);
      pointer-events: none;
    }
    .btn-chip {
      display: grid;
      height: 48px;
      width: 48px;
      place-items: center;
      border-radius: 14px;
      background: var(--v2-citron);
      color: var(--v2-foret);
    }
    .btn-primary:disabled .btn-chip {
      background: var(--v2-gris-trait);
      color: var(--v2-blanc);
    }
    .link {
      font-weight: 700;
      color: var(--v2-foret-clair);
      text-underline-offset: 3px;
    }
    .link:hover {
      text-decoration: underline;
    }
    .link:focus-visible,
    .ghost:focus-visible {
      outline: 2px solid var(--v2-foret);
      outline-offset: 2px;
      border-radius: 6px;
    }
    :host ::ng-deep app-otp-input input {
      height: 64px;
      width: 56px;
      border-radius: 16px;
      border: 1.5px solid var(--v2-gris-trait);
      background: var(--v2-blanc);
      font-family: var(--v2-font-mono);
      font-size: 20px;
      font-weight: 700;
      color: var(--v2-encre);
      box-shadow: none;
    }
    :host ::ng-deep app-otp-input input:focus-visible {
      outline: none;
      border: 2px solid var(--v2-foret);
      box-shadow: var(--v2-halo);
    }
    @media (max-width: 359px) {
      :host ::ng-deep app-otp-input input {
        width: 42px;
        height: 56px;
      }
    }
  `,
  template: `
    <div
      class="charte-v2 grid min-h-screen grid-cols-[minmax(0,1fr)] lg:h-screen lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:overflow-hidden"
    >
      <!-- Snackbar flottante (composant partagé), en haut de la colonne de connexion -->
      <ui-snackbar class="lg:left-[48.8%] lg:justify-start lg:pl-16 lg:pr-[260px] lg:pt-[18px]" />

      <!-- ───────── Panneau identité (grand écran) : diaporama des jardins maraîchers sous voile forêt ───────── -->
      <aside
        class="relative hidden overflow-hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col"
        style="background: var(--v2-foret); color: var(--v2-blanc)"
      >
        <ui-photo-slideshow class="absolute inset-0" [photos]="photos" />
        <div
          class="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style="background: linear-gradient(180deg, color-mix(in oklab, var(--v2-foret) 88%, transparent) 0%, color-mix(in oklab, var(--v2-foret) 35%, transparent) 42%, color-mix(in oklab, var(--v2-foret) 70%, transparent) 68%, color-mix(in oklab, var(--v2-foret) 96%, transparent) 100%)"
        ></div>

        <div class="relative flex flex-1 flex-col px-12 py-10 xl:px-16">
          <ui-brand-logo variant="inverse" [size]="56" />

          <div class="mt-auto">
            <p
              class="max-w-[17em] text-[32px] font-extrabold leading-[1.08] tracking-[-0.03em] text-balance"
            >
              {{ t()("auth.layout.headline") }}
            </p>
            <div class="mt-5 flex max-w-xl gap-4">
              <span
                class="mt-[0.7em] h-[3px] w-10 shrink-0 rounded-full"
                style="background: var(--v2-citron)"
              ></span>
              <p
                class="text-[18px] font-bold leading-snug tracking-[-0.01em] text-balance"
                style="color: var(--v2-citron)"
              >
                {{ t()("auth.layout.lead") }}
              </p>
            </div>

            <!-- Porteur : CRADESC -->
            <a
              [href]="cradesc.url"
              target="_blank"
              rel="noopener noreferrer"
              class="ghost mt-10 flex max-w-md items-center gap-4 rounded-[20px] p-3 pr-5"
              style="background: var(--v2-blanc); color: var(--v2-encre)"
              [attr.aria-label]="t()('auth.cradesc.visit')"
            >
              <img
                [src]="cradesc.emblem"
                [alt]="t()('auth.cradesc.logoAlt')"
                width="80"
                height="70"
                class="h-16 w-auto shrink-0"
              />
              <span class="min-w-0">
                <span class="mono block" style="color: var(--v2-foret-clair)">{{
                  t()("auth.cradesc.carriedBy")
                }}</span>
                <span
                  class="block text-[20px] font-extrabold leading-tight tracking-[-0.02em]"
                  style="color: var(--v2-terre)"
                  >{{ cradesc.acronym }}</span
                >
                <span
                  class="block text-xs font-semibold leading-snug"
                  style="color: var(--v2-ardoise)"
                  >{{ t()("auth.cradesc.fullName") }}</span
                >
                <span class="link mt-1.5 inline-flex items-center gap-1 text-[13px]">
                  {{ cradesc.urlLabel }}
                  <lucide-angular [img]="icons.external" [size]="13" />
                </span>
              </span>
            </a>
          </div>
        </div>
      </aside>

      <!-- ───────── Connexion : formulaire posé sur le crème, sans défilement sur grand écran ───────── -->
      <main
        class="relative flex min-w-0 flex-col px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 sm:px-10 lg:h-screen lg:overflow-y-auto lg:px-16 lg:py-6"
      >
        <header class="flex items-center justify-between gap-3">
          <ui-brand-logo class="lg:invisible" variant="color" [size]="40" />
          <div
            class="inline-flex gap-1 rounded-[14px] border p-1 text-[13px] font-bold"
            style="border-color: var(--v2-bord-carte); background: var(--v2-blanc)"
            role="radiogroup"
            [attr.aria-label]="t()('locale.fr') + ' / ' + t()('locale.wo')"
          >
            @for (localeOption of locales; track localeOption) {
              <button
                type="button"
                role="radio"
                class="ghost rounded-[10px] px-3.5 py-1.5 transition-colors"
                [style.background]="locale() === localeOption ? 'var(--v2-foret)' : 'transparent'"
                [style.color]="locale() === localeOption ? 'var(--v2-blanc)' : 'var(--v2-ardoise)'"
                [attr.aria-checked]="locale() === localeOption"
                (click)="localeService.setLocale(localeOption)"
              >
                {{ t()(localeOption === "fr" ? "locale.fr" : "locale.wo") }}
              </button>
            }
          </div>
        </header>

        <!-- Porteur sur mobile : visible dès l'arrivée -->
        <a
          [href]="cradesc.url"
          target="_blank"
          rel="noopener noreferrer"
          class="ghost mt-5 flex items-center gap-3 rounded-[20px] border p-3 lg:hidden"
          style="border-color: var(--v2-bord-carte); background: var(--v2-blanc)"
          [attr.aria-label]="t()('auth.cradesc.visit')"
        >
          <img [src]="cradesc.emblem" alt="" width="60" height="52" class="h-11 w-auto shrink-0" />
          <span class="min-w-0">
            <span class="mono block" style="color: var(--v2-gris-texte)">{{
              t()("auth.cradesc.carriedBy")
            }}</span>
            <span class="block text-[15px] font-extrabold" style="color: var(--v2-terre)">{{
              cradesc.acronym
            }}</span>
            <span class="block truncate text-xs font-medium" style="color: var(--v2-gris-texte)">{{
              t()("auth.cradesc.fullName")
            }}</span>
            <span class="link mt-0.5 inline-flex items-center gap-1 text-xs"
              >{{ cradesc.urlLabel }}<lucide-angular [img]="icons.external" [size]="12"
            /></span>
          </span>
        </a>

        <div class="flex flex-1 items-start justify-center py-8 lg:items-center lg:py-4">
          <div class="form-col w-full max-w-[480px]">
            <!-- Progression -->
            <span
              class="mono inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5"
              style="background: var(--v2-sauge); color: var(--v2-foret)"
            >
              <lucide-angular [img]="icons.shield" [size]="14" />
              {{
                t()("auth.step.progress", {
                  current: step().name === "code" ? "02" : "01",
                  total: "02",
                })
              }}
              · {{ step().name === "code" ? t()("auth.step.code") : t()("auth.step.credentials") }}
            </span>
            <div class="mt-3 flex max-w-[200px] gap-1.5" aria-hidden="true">
              <span class="h-1 flex-1 rounded-full" style="background: var(--v2-foret)"></span>
              <span
                class="h-1 flex-1 rounded-full transition-colors"
                [style.background]="step().name === 'code' ? 'var(--v2-foret)' : 'var(--v2-lin)'"
              ></span>
            </div>

            @if (step().name === "code") {
              <h1
                id="auth-title"
                class="mt-7 text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] lg:text-[40px]"
              >
                {{ t()("auth.otp.title") }}
              </h1>
              <p class="mt-3 text-base font-medium" style="color: var(--v2-gris-texte)">
                {{
                  t()("auth.otp.sent", {
                    length: OTP_LENGTH,
                    email: sentInfo()?.maskedEmail ?? "",
                    minutes: otpMinutes,
                  })
                }}
              </p>
              <form class="mt-8 space-y-5" (submit)="$event.preventDefault(); submitOtp(otpCode())">
                <div class="space-y-2.5">
                  <label id="otp-label" for="otp" class="label">{{ t()("auth.otp.code") }}</label>
                  <app-otp-input
                    fieldId="otp"
                    labelledBy="otp-label"
                    [value]="otpCode()"
                    [disabled]="otpBusy()"
                    (valueChange)="onOtpValueChange($event)"
                    (complete)="submitOtp($event)"
                  />
                </div>
                @if (showDemoUi() && demoMail(); as mail) {
                  <div
                    role="status"
                    class="flex gap-3 rounded-[16px] border-2 border-dashed p-3.5 text-sm"
                    style="border-color: var(--v2-gris-trait); background: var(--v2-blanc)"
                  >
                    <lucide-angular
                      [img]="icons.inbox"
                      [size]="18"
                      class="mt-0.5 shrink-0"
                      style="color: var(--v2-gris-texte)"
                    />
                    <div>
                      <div class="mono" style="color: var(--v2-gris-texte)">
                        {{ t()("auth.mail.title") }}
                      </div>
                      <p class="mt-1 font-medium">
                        {{ t()("auth.mail.line", { to: mail.to }) }} {{ t()("auth.mail.code") }}
                        <span
                          class="font-bold tracking-[0.2em]"
                          style="font-family: var(--v2-font-mono)"
                          >{{ mail.code }}</span
                        >
                      </p>
                    </div>
                  </div>
                }
                <button
                  type="submit"
                  class="btn-primary"
                  [disabled]="otpBusy() || otpCode().length < OTP_LENGTH"
                >
                  <span>{{ otpBusy() ? t()("auth.otp.verifying") : t()("auth.otp.submit") }}</span>
                  <span class="btn-chip" aria-hidden="true">
                    <lucide-angular
                      [img]="otpBusy() ? icons.loader : icons.arrowRight"
                      [size]="22"
                      [class.animate-spin]="otpBusy()"
                    />
                  </span>
                </button>
                <div class="flex flex-wrap items-center justify-between gap-3 text-[15px]">
                  <button
                    type="button"
                    class="link inline-flex items-center gap-1.5 disabled:cursor-not-allowed disabled:no-underline disabled:opacity-60"
                    [disabled]="otpBusy() || resendWait() > 0"
                    (click)="resend()"
                  >
                    <lucide-angular [img]="icons.resend" [size]="16" />
                    {{
                      resendWait() > 0
                        ? t()("auth.otp.resendIn", { seconds: resendWait() })
                        : t()("auth.otp.resend")
                    }}
                  </button>
                  <button
                    type="button"
                    class="ghost inline-flex items-center gap-1.5 font-semibold"
                    style="color: var(--v2-gris-texte)"
                    (click)="backToCredentials()"
                  >
                    <lucide-angular [img]="icons.arrowLeft" [size]="16" />
                    {{ t()("auth.otp.back") }}
                  </button>
                </div>
              </form>
            } @else {
              <h1
                id="auth-title"
                class="mt-7 text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] lg:text-[40px]"
              >
                {{ t()("auth.login.title") }}
              </h1>
              <p class="mt-3 text-base font-medium" style="color: var(--v2-gris-texte)">
                {{ t()("auth.login.description") }}
              </p>
              <form class="mt-8 space-y-5" novalidate (submit)="onCredentialsSubmit($event)">
                <div class="space-y-2.5">
                  <label for="email" class="label">{{ t()("auth.login.email") }}</label>
                  <div class="relative">
                    <span
                      class="pointer-events-none absolute inset-y-0 left-0 grid w-14 place-items-center"
                      style="color: var(--v2-gris-texte)"
                      aria-hidden="true"
                    >
                      <lucide-angular [img]="icons.mail" [size]="20" />
                    </span>
                    <input
                      id="email"
                      type="email"
                      autocomplete="username"
                      inputmode="email"
                      autocapitalize="none"
                      spellcheck="false"
                      class="field"
                      [placeholder]="t()('auth.login.emailPlaceholder')"
                      [value]="email()"
                      (input)="onEmailInput($event)"
                      [attr.aria-invalid]="emailInvalid() || null"
                      autofocus
                    />
                  </div>
                </div>
                <div class="space-y-2.5">
                  <div class="flex items-baseline justify-between gap-2">
                    <label for="password" class="label">{{ t()("auth.login.password") }}</label>
                    <a routerLink="/mot-de-passe-oublie" class="link text-sm">{{
                      t()("auth.login.forgot")
                    }}</a>
                  </div>
                  <div class="relative">
                    <span
                      class="pointer-events-none absolute inset-y-0 left-0 grid w-14 place-items-center"
                      style="color: var(--v2-gris-texte)"
                      aria-hidden="true"
                    >
                      <lucide-angular [img]="icons.lock" [size]="20" />
                    </span>
                    <input
                      id="password"
                      [type]="passwordVisible() ? 'text' : 'password'"
                      autocomplete="current-password"
                      spellcheck="false"
                      autocapitalize="none"
                      class="field pr-16"
                      [placeholder]="t()('auth.login.passwordPlaceholder')"
                      [value]="password()"
                      (input)="onPasswordInput($event)"
                      [attr.aria-invalid]="passwordInvalid() || null"
                    />
                    <button
                      type="button"
                      class="ghost absolute right-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-[14px] transition-colors hover:bg-[var(--v2-sauge)]"
                      style="color: var(--v2-ardoise)"
                      [attr.aria-label]="
                        passwordVisible() ? t()('auth.password.hide') : t()('auth.password.show')
                      "
                      [attr.aria-pressed]="passwordVisible()"
                      (click)="passwordVisible.set(!passwordVisible())"
                    >
                      <lucide-angular
                        [img]="passwordVisible() ? icons.eyeOff : icons.eye"
                        [size]="20"
                      />
                    </button>
                  </div>
                </div>
                <button type="submit" class="btn-primary !mt-7" [disabled]="busy()">
                  <span>{{
                    busy() ? t()("auth.login.submitting") : t()("auth.login.submit")
                  }}</span>
                  <span class="btn-chip" aria-hidden="true">
                    <lucide-angular
                      [img]="busy() ? icons.loader : icons.arrowRight"
                      [size]="22"
                      [class.animate-spin]="busy()"
                    />
                  </span>
                </button>
              </form>

              @if (invitationLinks().length > 0) {
                <div
                  role="status"
                  class="mt-5 rounded-[16px] border-2 border-dashed p-3.5 text-sm"
                  style="border-color: var(--v2-gris-trait); background: var(--v2-blanc)"
                >
                  <div class="mono" style="color: var(--v2-gris-texte)">
                    {{ t()("auth.mail.invitationTitle") }}
                  </div>
                  <ul class="mt-1 space-y-2">
                    @for (link of invitationLinks(); track link.email) {
                      <li>
                        <p>{{ t()("auth.mail.invitationLine", { to: link.email }) }}</p>
                        <span class="font-bold" style="color: var(--v2-foret-clair)">{{
                          t()("auth.mail.invitationOpen", { name: link.name })
                        }}</span>
                      </li>
                    }
                  </ul>
                </div>
              }
            }

            <!-- Aide : l'équipe du CRADESC -->
            <div
              class="help mt-8 flex items-center gap-4 border-t pt-6"
              style="border-color: var(--v2-bord-carte)"
            >
              <span
                class="grid size-12 shrink-0 place-items-center rounded-[14px] border"
                style="border-color: var(--v2-bord-carte); background: var(--v2-blanc)"
              >
                <img [src]="cradesc.emblem" alt="" width="40" height="34" class="h-8 w-auto" />
              </span>
              <div class="min-w-0 text-[15px]">
                <p class="font-bold">{{ t()("auth.help.title") }}</p>
                <div class="mt-0.5 flex flex-wrap gap-x-4 gap-y-1">
                  <a
                    [href]="'mailto:' + cradesc.email"
                    class="link inline-flex items-center gap-1.5"
                  >
                    <lucide-angular [img]="icons.mail" [size]="15" />{{ cradesc.email }}
                  </a>
                  <a
                    [href]="'tel:' + cradesc.phoneHref"
                    class="link inline-flex items-center gap-1.5 tabular-nums"
                  >
                    <lucide-angular [img]="icons.phone" [size]="15" />{{ cradesc.phone }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p
          class="session-note flex items-center justify-center gap-1.5 text-xs font-medium"
          style="color: var(--v2-gris-texte)"
        >
          <lucide-angular [img]="icons.clock" [size]="14" />
          {{ t()("auth.login.footer") }}
        </p>
      </main>
    </div>
  `,
})
export default class LoginPage {
  private readonly auth = inject(AuthService);
  private readonly store = inject(StoreService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly snackbar = inject(SnackbarService);
  private readonly document = inject(DOCUMENT);
  protected readonly localeService = inject(LocaleService);

  protected readonly cradesc = CRADESC;
  protected readonly photos = LOGIN_PHOTOS;
  protected readonly locales = ["fr", "wo"] as const;
  protected readonly icons = {
    alert: CircleAlert,
    arrowLeft: ArrowLeft,
    arrowRight: ArrowRight,
    check: Check,
    clock: Clock,
    external: ExternalLink,
    eye: Eye,
    eyeOff: EyeOff,
    inbox: Inbox,
    loader: Loader2,
    lock: Lock,
    mail: Mail,
    mailCheck: MailCheck,
    phone: Phone,
    resend: RotateCw,
    shield: ShieldCheck,
  };

  /** Courriel simulé et invitations simulées : uniquement en démonstration locale (hors API). */
  protected readonly showDemoUi = () => DEMO_MODE && !isApiMode();
  protected readonly OTP_LENGTH = OTP_LENGTH;
  protected readonly otpMinutes = Math.round(OTP_TTL_MS / 60000);

  protected readonly locale = this.localeService.locale;
  protected readonly t = this.localeService.t;
  protected readonly invitationLinks = computed(() => {
    this.store.state(); // re-evaluate when users change
    return this.auth.pendingInvitationLinks();
  });
  protected readonly step = signal<Step>({ name: "credentials" });
  /** Démonstration locale uniquement : champs pré-remplis avec le compte administrateur CRADESC. */
  private readonly demoAdmin = this.showDemoUi()
    ? DEMO_ACCOUNTS.find((a) => a.role === "admin")
    : undefined;
  protected readonly email = signal(this.demoAdmin?.email ?? "");
  protected readonly password = signal(this.demoAdmin ? DEMO_PASSWORD : "");
  protected readonly passwordVisible = signal(false);
  /**
   * Validation côté client, champ par champ : rien n'est signalé avant la première tentative
   * d'envoi ; ensuite seul le champ fautif est en rouge, et il redevient neutre dès qu'on le corrige.
   * Un refus serveur (identifiants incorrects) n'accuse aucun champ : message seul, sans révéler
   * lequel des deux est faux.
   */
  protected readonly emailInvalid = signal(false);
  protected readonly passwordInvalid = signal(false);
  protected readonly busy = signal(false);

  protected readonly otpCode = signal("");
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

  protected onEmailInput(event: Event): void {
    this.email.set(this.inputValue(event));
    if (this.emailInvalid() && normalizeEmail(this.email())) {
      this.emailInvalid.set(false);
      this.snackbar.dismiss();
    }
  }

  protected onPasswordInput(event: Event): void {
    this.password.set(this.inputValue(event));
    if (this.passwordInvalid() && this.password()) {
      this.passwordInvalid.set(false);
      this.snackbar.dismiss();
    }
  }

  /** Marque les champs fautifs, place le focus sur le premier et l'annonce. */
  private validateCredentials(): string | null {
    const normalized = normalizeEmail(this.email());
    this.emailInvalid.set(!normalized);
    this.passwordInvalid.set(!this.password());
    if (!normalized) {
      this.focus("email");
      this.snackbar.error(this.t()("auth.login.errorEmail"));
      return null;
    }
    if (!this.password()) {
      this.focus("password");
      this.snackbar.error(this.t()("auth.login.errorPassword"));
      return null;
    }
    return normalized;
  }

  private focus(id: string): void {
    this.document.getElementById(id)?.focus();
  }

  protected inputValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  protected onOtpValueChange(value: string): void {
    this.otpCode.set(value);
  }

  protected onCredentialsSubmit(event: Event): void {
    event.preventDefault();
    void this.submitCredentials();
  }

  protected async submitCredentials(): Promise<void> {
    if (this.busy()) return;
    const normalized = this.validateCredentials();
    if (!normalized) return;
    this.busy.set(true);
    this.snackbar.dismiss();
    try {
      const { challengeId, ...sent } = await this.auth.signIn(normalized, this.password());
      this.step.set({ name: "code", challengeId, sent });
    } catch (e) {
      this.snackbar.error(authErrorMessage(e, this.t()));
    } finally {
      this.busy.set(false);
    }
  }

  protected async submitOtp(code: string): Promise<void> {
    const current = this.step();
    if (current.name !== "code" || this.otpBusy()) return;
    if (code.length < OTP_LENGTH) {
      this.snackbar.error(this.t()("auth.otp.errorLength", { length: OTP_LENGTH }));
      return;
    }
    this.otpBusy.set(true);
    try {
      const user = await this.auth.verifyOtp(current.challengeId, code);
      this.store.actions.login(user.name, user.email, user.role);
      // Chaque rôle arrive sur son tableau de bord : /dashboard/admin, /dashboard/gestionnaire…
      await this.router.navigate(["/dashboard", user.role]);
    } catch (e) {
      this.snackbar.error(authErrorMessage(e, this.t()));
      this.otpCode.set("");
    } finally {
      this.otpBusy.set(false);
    }
  }

  protected async resend(): Promise<void> {
    const current = this.step();
    if (current.name !== "code") return;
    this.otpBusy.set(true);
    try {
      const next = await this.auth.resendOtp(current.challengeId);
      this.step.set({ name: "code", challengeId: current.challengeId, sent: next });
      this.otpCode.set("");
      this.snackbar.success(this.t()("auth.otp.resent"));
    } catch (e) {
      this.snackbar.error(authErrorMessage(e, this.t()));
    } finally {
      this.otpBusy.set(false);
    }
  }

  protected backToCredentials(): void {
    this.snackbar.dismiss();
    this.step.set({ name: "credentials" });
    this.password.set(this.demoAdmin ? DEMO_PASSWORD : "");
    this.emailInvalid.set(false);
    this.passwordInvalid.set(false);
    this.otpCode.set("");
  }
}
