import "@shared/ui/charte-v2-fonts";

import { NgTemplateOutlet } from "@angular/common";
import { Component, computed, inject, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { CRADESC, PAYMENT_PHOTO } from "@/config/brand";
import { nf } from "@/lib/format";
import { PAYMENT_CHANNELS, type PaymentChannel } from "@/lib/payment-provider";
import { LocaleService } from "@shared/locale.service";
import { StoreService } from "@shared/store.service";
import { BrandLogoComponent, IconComponent } from "@shared/ui";

/**
 * Page publique d'un lien de paiement de cotisation, dans le style de la connexion (charte V2) : sur grand écran,
 * panneau identité (jardins maraîchers sous voile forêt, logo, carte « Porté par CRADESC ») ; à droite, sur le crème,
 * la cotisation à payer (membre, montant), le choix du moyen de paiement (logos officiels), le bouton forêt à pastille
 * citron et l'aide du CRADESC. Sur téléphone : logo, carte CRADESC, puis le paiement.
 *
 * Le règlement réel passe par un agrégateur de paiement qui confirme au serveur : tant qu'il n'est pas relié, « Payer »
 * répond « moyen de paiement non configuré », et la page ne déclare jamais un lien payé toute seule.
 * En démonstration, les liens sont gardés dans le navigateur : ils s'ouvrent dans ce navigateur seulement.
 */
@Component({
  selector: "app-payer-page",
  imports: [BrandLogoComponent, IconComponent, NgTemplateOutlet],
  styles: `
    button:not(:disabled),
    a[href],
    [role="radio"] {
      cursor: pointer;
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
    /* Récapitulatif : même cadre que les champs de la connexion. */
    .recap {
      border-radius: var(--v2-radius-champ);
      border: 1.5px solid var(--v2-gris-trait);
      background: var(--v2-blanc);
    }
    .recap-row {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 18px;
    }
    .recap-row + .recap-row {
      border-top: 1px solid var(--v2-separateur);
    }
    .recap-ico {
      display: grid;
      height: 40px;
      width: 40px;
      flex-shrink: 0;
      place-items: center;
      border-radius: 12px;
      background: var(--v2-sauge);
      color: var(--v2-foret);
    }
    /* Moyens de paiement : tuiles au cadre des champs, sélection forêt comme le focus. */
    .channel {
      position: relative;
      display: flex;
      height: 64px;
      width: 100%;
      align-items: center;
      gap: 12px;
      border-radius: var(--v2-radius-champ);
      border: 1.5px solid var(--v2-gris-trait);
      background: var(--v2-blanc);
      padding: 0 14px;
      font-size: 15px;
      font-weight: 700;
      color: var(--v2-encre);
      text-align: left;
      transition:
        border-color 0.15s ease,
        box-shadow 0.15s ease;
    }
    .channel:hover {
      border-color: var(--v2-gris-texte);
    }
    .channel.on {
      border: 2px solid var(--v2-foret);
      padding: 0 13.5px;
      box-shadow: var(--v2-halo);
    }
    .channel:focus-visible {
      outline: none;
      border: 2px solid var(--v2-foret);
      padding: 0 13.5px;
      box-shadow: var(--v2-halo);
    }
    .channel .logos {
      display: flex;
      height: 36px;
      min-width: 36px;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }
    .channel .logos img {
      height: 34px;
      width: auto;
      border-radius: 9px;
    }
    .channel .logos img.wordmark {
      height: 26px;
      border-radius: 0;
    }
    .channel .logos img.card {
      height: 16px;
      border-radius: 0;
    }
    .radio {
      margin-left: auto;
      display: grid;
      height: 22px;
      width: 22px;
      flex-shrink: 0;
      place-items: center;
      border-radius: 999px;
      border: 2px solid var(--v2-gris-trait);
      color: var(--v2-citron);
    }
    .channel.on .radio {
      border-color: var(--v2-foret);
      background: var(--v2-foret);
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
    .btn-primary:hover:not(:disabled) {
      background: var(--v2-foret-clair);
    }
    .btn-primary:focus-visible {
      outline: none;
      box-shadow: var(--v2-halo);
    }
    .btn-primary:disabled {
      background: var(--v2-lin);
      color: var(--v2-gris-texte);
      cursor: not-allowed;
    }
    .btn-chip {
      display: grid;
      height: 48px;
      width: 48px;
      flex-shrink: 0;
      place-items: center;
      border-radius: 14px;
      background: var(--v2-citron);
      color: var(--v2-foret);
    }
    .btn-primary:disabled .btn-chip {
      background: var(--v2-gris-trait);
      color: var(--v2-blanc);
    }
    .band {
      position: relative;
      height: 190px;
      overflow: hidden;
      background: var(--v2-foret);
    }
    .band img {
      position: absolute;
      inset: 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    .band-veil {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, color-mix(in oklab, var(--v2-foret) 70%, transparent) 0%, color-mix(in oklab, var(--v2-foret) 25%, transparent) 45%, color-mix(in oklab, var(--v2-foret) 88%, transparent) 100%);
    }
    .credit {
      position: absolute;
      right: 16px;
      bottom: 10px;
      z-index: 1;
      font-size: 10.5px;
      font-weight: 600;
      color: color-mix(in oklab, var(--v2-blanc) 70%, transparent);
    }
    .credit:hover {
      color: var(--v2-blanc);
      text-decoration: underline;
    }
    .credit-band {
      bottom: 8px;
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
    @media (prefers-reduced-motion: reduce) {
      .channel,
      .btn-primary {
        transition: none;
      }
    }
  `,
  template: `
    <div class="charte-v2 grid min-h-screen grid-cols-[minmax(0,1fr)] lg:h-screen lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:overflow-hidden">
      <!-- ───────── Panneau identité (grand écran) : comme la connexion ───────── -->
      <aside class="relative hidden overflow-hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col" style="background: var(--v2-foret); color: var(--v2-blanc)">
        <img class="absolute inset-0 h-full w-full object-cover" [src]="photo.src" alt="" [style.object-position]="photo.position" />
        <div
          class="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style="background: linear-gradient(180deg, color-mix(in oklab, var(--v2-foret) 88%, transparent) 0%, color-mix(in oklab, var(--v2-foret) 35%, transparent) 42%, color-mix(in oklab, var(--v2-foret) 70%, transparent) 68%, color-mix(in oklab, var(--v2-foret) 96%, transparent) 100%)"
        ></div>
        <div class="relative flex flex-1 flex-col px-12 py-10 xl:px-16">
          <ui-brand-logo variant="inverse" [size]="56" />
          <a class="credit" [href]="photo.source" target="_blank" rel="noopener noreferrer">{{ t()("pay.photoCredit", { author: photo.author, license: photo.license }) }}</a>
          <div class="mt-auto">
            <p class="max-w-[17em] text-[32px] font-extrabold leading-[1.08] tracking-[-0.03em] text-balance">{{ t()("pay.layout.headline") }}</p>
            <div class="mt-5 flex max-w-xl gap-4">
              <span class="mt-[0.7em] h-[3px] w-10 shrink-0 rounded-full" style="background: var(--v2-citron)"></span>
              <p class="text-[18px] font-bold leading-snug tracking-[-0.01em] text-balance" style="color: var(--v2-citron)">{{ t()("pay.layout.lead") }}</p>
            </div>
            <a [href]="cradesc.url" target="_blank" rel="noopener noreferrer" class="ghost mt-10 flex max-w-md items-center gap-4 rounded-[20px] p-3 pr-5" style="background: var(--v2-blanc); color: var(--v2-encre)" [attr.aria-label]="t()('auth.cradesc.visit')">
              <img [src]="cradesc.emblem" [alt]="t()('auth.cradesc.logoAlt')" width="80" height="70" class="h-16 w-auto shrink-0" />
              <span class="min-w-0">
                <span class="mono block" style="color: var(--v2-foret-clair)">{{ t()("auth.cradesc.carriedBy") }}</span>
                <span class="block text-[20px] font-extrabold leading-tight tracking-[-0.02em]" style="color: var(--v2-terre)">{{ cradesc.acronym }}</span>
                <span class="block text-xs font-semibold leading-snug" style="color: var(--v2-ardoise)">{{ t()("auth.cradesc.fullName") }}</span>
                <span class="link mt-1.5 inline-flex items-center gap-1 text-[13px]">{{ cradesc.urlLabel }}</span>
              </span>
            </a>
          </div>
        </div>
      </aside>

      <!-- ───────── Paiement : sur le crème ───────── -->
      <main class="relative flex min-w-0 flex-col px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 sm:px-10 lg:h-screen lg:overflow-y-auto lg:px-16 lg:py-6">
        <!-- Téléphone : la photo de la page en bandeau, sous voile forêt, avec le logo -->
        <div class="band -mx-6 -mt-5 mb-5 sm:-mx-10 lg:hidden">
          <img [src]="photo.src" alt="" [style.object-position]="photo.position" />
          <div class="band-veil" aria-hidden="true"></div>
          <div class="relative flex h-full flex-col justify-between px-6 pb-4 pt-5 sm:px-10">
            <div class="flex items-center justify-between gap-3">
              <ui-brand-logo variant="inverse" [size]="38" />
              <ng-container [ngTemplateOutlet]="localeSwitch" />
            </div>
            <p class="max-w-[18em] text-[19px] font-extrabold leading-tight tracking-[-0.02em] text-balance" style="color: var(--v2-blanc)">{{ t()("pay.layout.headline") }}</p>
          </div>
          <a class="credit credit-band" [href]="photo.source" target="_blank" rel="noopener noreferrer">{{ t()("pay.photoCredit", { author: photo.author, license: photo.license }) }}</a>
        </div>
        <header class="hidden items-center justify-end gap-3 lg:flex">
          <ng-container [ngTemplateOutlet]="localeSwitch" />
        </header>

        <!-- Porteur sur mobile : visible dès l'arrivée -->
        <a [href]="cradesc.url" target="_blank" rel="noopener noreferrer" class="ghost flex items-center gap-3 rounded-[20px] border p-3 lg:hidden" style="border-color: var(--v2-bord-carte); background: var(--v2-blanc)" [attr.aria-label]="t()('auth.cradesc.visit')">
          <img [src]="cradesc.emblem" alt="" width="60" height="52" class="h-11 w-auto shrink-0" />
          <span class="min-w-0">
            <span class="mono block" style="color: var(--v2-gris-texte)">{{ t()("auth.cradesc.carriedBy") }}</span>
            <span class="block text-[15px] font-extrabold" style="color: var(--v2-terre)">{{ cradesc.acronym }}</span>
            <span class="block truncate text-xs font-medium" style="color: var(--v2-gris-texte)">{{ t()("auth.cradesc.fullName") }}</span>
          </span>
        </a>

        <div class="flex flex-1 items-start justify-center py-7 lg:items-center lg:py-4">
          <div class="w-full max-w-[480px]">
            @if (view(); as shown) {
              <span class="mono inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5" style="background: var(--v2-sauge); color: var(--v2-foret)">
                <ui-icon name="lock" [size]="14" />{{ t()("pay.eyebrowPeriod", { period: shown.period }) }} · {{ t()("pay.secureShort") }}
              </span>

              @if (shown.payable) {
                <h1 class="mt-5 text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] lg:text-[40px]">{{ t()("pay.title") }}</h1>
                <p class="mt-2 text-[16px] font-medium leading-relaxed" style="color: var(--v2-gris-texte)">{{ t()("pay.lead", { scoop: shown.scoop }) }}</p>

                <!-- Récapitulatif -->
                <div class="recap mt-6">
                  <div class="recap-row">
                    <span class="recap-ico" aria-hidden="true"><ui-icon name="person" [size]="20" /></span>
                    <span class="min-w-0">
                      <span class="label">{{ t()("pay.member") }}</span>
                      <span class="block truncate text-[16px] font-extrabold">{{ shown.fullName }}</span>
                      @if (shown.phone) {
                        <span class="block text-[13px] font-semibold tabular-nums" style="color: var(--v2-gris-texte)">{{ shown.phone }}</span>
                      }
                    </span>
                  </div>
                  <div class="recap-row">
                    <span class="recap-ico" aria-hidden="true"><ui-icon name="payments" [size]="20" /></span>
                    <span class="min-w-0 flex-1">
                      <span class="label">{{ t()("pay.amount") }}</span>
                      <span class="block text-[24px] font-extrabold leading-tight tracking-[-0.02em] tabular-nums" style="color: var(--v2-foret)">{{ nf.format(shown.amount) }} FCFA</span>
                    </span>
                  </div>
                </div>

                <!-- Moyen de paiement -->
                <p class="label mt-6" id="pay-with">{{ t()("pay.method") }}</p>
                <div class="mt-2 grid grid-cols-2 gap-2.5" role="radiogroup" aria-labelledby="pay-with">
                  @for (channel of channels; track channel.id) {
                    <button type="button" role="radio" class="channel" [class.on]="picked()?.id === channel.id" [attr.aria-checked]="picked()?.id === channel.id" [attr.aria-label]="channel.label" (click)="pick(channel)">
                      <span class="logos" aria-hidden="true">
                        @for (logo of channel.logos; track logo) {
                          <img [src]="logo" alt="" [class.wordmark]="channel.wordmark" [class.card]="channel.id === 'carte'" />
                        }
                      </span>
                      @if (!channel.wordmark) {
                        <span class="min-w-0 truncate" aria-hidden="true">{{ channel.id === "carte" ? t()("pay.card") : channel.label }}</span>
                      }
                      <span class="radio" aria-hidden="true">
                        @if (picked()?.id === channel.id) {
                          <ui-icon name="check" [size]="13" />
                        }
                      </span>
                    </button>
                  }
                </div>

                <button type="button" class="btn-primary mt-6" [disabled]="!picked()" (click)="pay()">
                  <span class="min-w-0 truncate text-left">{{ picked() ? t()("pay.payWith", { amount: nf.format(shown.amount), channel: picked()!.label }) : t()("pay.choose") }}</span>
                  <span class="btn-chip" aria-hidden="true"><ui-icon name="arrow_forward" [size]="20" /></span>
                </button>
                @if (notConfigured()) {
                  <p class="mt-3 flex items-start gap-2.5 rounded-[16px] px-4 py-3 text-[14px] leading-snug" style="background: var(--v2-attente-bg); color: var(--v2-attente-fg)" role="alert">
                    <ui-icon name="warning" [size]="18" class="mt-0.5 shrink-0" />
                    <span><strong>{{ t()("pay.notConfigured.title") }}.</strong> {{ t()("pay.notConfigured") }}</span>
                  </p>
                }
              } @else {
                <h1 class="mt-5 text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] lg:text-[40px]">
                  {{ t()(shown.status === "payé" ? "pay.paid.title" : shown.expired ? "pay.expired.title" : "pay.cancelled.title") }}
                </h1>
                <p class="mt-3 text-[16px] font-medium leading-relaxed" style="color: var(--v2-gris-texte)">
                  {{ shown.status === "payé" ? t()("pay.done", { receipt: receipt() }) : t()(shown.expired ? "pay.expired" : "pay.cancelled") }}
                </p>
              }
            } @else {
              <h1 class="text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] lg:text-[40px]">{{ t()("pay.notFound.title") }}</h1>
              <p class="mt-3 text-[16px] font-medium leading-relaxed" style="color: var(--v2-gris-texte)">{{ t()("pay.notFound.text") }}</p>
            }

            <!-- Aide : l'équipe du CRADESC -->
            <div class="mt-8 flex items-center gap-4 border-t pt-6" style="border-color: var(--v2-bord-carte)">
              <span class="grid size-12 shrink-0 place-items-center rounded-[14px] border" style="border-color: var(--v2-bord-carte); background: var(--v2-blanc)">
                <img [src]="cradesc.emblem" alt="" width="40" height="34" class="h-8 w-auto" />
              </span>
              <div class="min-w-0 text-[15px]">
                <p class="font-bold">{{ t()("pay.help") }}</p>
                <div class="mt-0.5 flex flex-wrap gap-x-4 gap-y-1">
                  <a [href]="'mailto:' + cradesc.email" class="link inline-flex items-center gap-1.5"><ui-icon name="mail" [size]="15" />{{ cradesc.email }}</a>
                  <a [href]="'tel:' + cradesc.phoneHref" class="link inline-flex items-center gap-1.5 tabular-nums"><ui-icon name="call" [size]="15" />{{ cradesc.phone }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        @if (view()?.payable) {
          <p class="flex items-center justify-center gap-1.5 text-xs font-medium" style="color: var(--v2-gris-texte)">
            <ui-icon name="calendar_today" [size]="14" />{{ t()("pay.validUntil", { date: view()!.expires }) }}
          </p>
        }
      </main>
    </div>

    <ng-template #localeSwitch>
      <div class="inline-flex gap-1 rounded-[14px] border p-1 text-[13px] font-bold" style="border-color: var(--v2-bord-carte); background: var(--v2-blanc)" role="radiogroup" [attr.aria-label]="t()('locale.fr') + ' / ' + t()('locale.wo')">
        @for (localeOption of locales; track localeOption) {
          <button
            type="button"
            role="radio"
            class="ghost rounded-[10px] px-3.5 py-1.5 transition-colors"
            [style.background]="localeService.locale() === localeOption ? 'var(--v2-foret)' : 'transparent'"
            [style.color]="localeService.locale() === localeOption ? 'var(--v2-blanc)' : 'var(--v2-ardoise)'"
            [attr.aria-checked]="localeService.locale() === localeOption"
            (click)="localeService.setLocale(localeOption)"
          >
            {{ t()(localeOption === "fr" ? "locale.fr" : "locale.wo") }}
          </button>
        }
      </div>
    </ng-template>
  `,
})
export default class PayerPage {
  private readonly store = inject(StoreService);
  protected readonly localeService = inject(LocaleService);
  protected readonly t = this.localeService.t;
  protected readonly nf = nf;
  protected readonly cradesc = CRADESC;
  protected readonly photo = PAYMENT_PHOTO;
  protected readonly locales = ["fr", "wo"] as const;
  protected readonly channels = PAYMENT_CHANNELS;
  protected readonly picked = signal<PaymentChannel | null>(null);
  protected readonly notConfigured = signal(false);

  /** Jeton lu tout de suite (pas d'attente d'un flux) : la page n'affiche jamais « introuvable » le temps de charger. */
  private readonly token = inject(ActivatedRoute).snapshot.paramMap.get("token") ?? "";

  private readonly link = computed(() => this.store.state().paymentLinks.find((candidate) => candidate.token === this.token) ?? null);

  /** Ce que voit le membre : son nom complet et son numéro, pour vérifier que le lien est bien le sien. */
  protected readonly view = computed(() => {
    const link = this.link();
    if (!link) return null;
    const state = this.store.state();
    const member = state.members.find((candidate) => candidate.id === link.memberId);
    const expired = link.status === "en attente" && Date.parse(link.expiresAt) < Date.now();
    return {
      amount: link.amount,
      period: link.period,
      status: link.status,
      expired,
      payable: link.status === "en attente" && !expired,
      scoop: state.scoops.find((scoop) => scoop.id === link.scoopId)?.name ?? "",
      fullName: member ? `${member.firstName} ${member.lastName}` : "",
      phone: member?.phone ?? "",
      expires: this.localeService.formatDate(link.expiresAt, { day: "numeric", month: "long", year: "numeric" }),
    };
  });

  protected readonly receipt = computed(() => {
    const link = this.link();
    return this.store.state().payments.find((payment) => payment.id === link?.paymentId)?.receipt ?? "";
  });

  protected pick(channel: PaymentChannel): void {
    this.picked.set(channel);
    this.notConfigured.set(false);
  }

  /** Le moyen choisi n'est pas configuré tant que l'agrégateur n'est pas relié côté serveur : on ne fait jamais semblant de payer. */
  protected pay(): void {
    this.notConfigured.set(true);
  }
}
