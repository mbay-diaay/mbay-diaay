import { Component, computed, effect, inject, signal, untracked } from "@angular/core";
import { RouterLink } from "@angular/router";

import { fmtDate, nf } from "@/lib/format";
import type { MessageKey } from "@/lib/i18n";
import {
  DEFAULT_REMINDER_KEY,
  previewReminders,
  REMINDER_CHANNELS,
  REMINDER_DELAY_FIELDS,
  REMINDER_MAX_DAYS,
  REMINDER_MIN_DAYS,
  reminderIssues,
  reminderSettingsOf,
  type ReminderChannel,
  type ReminderDelayField,
  type ReminderKind,
  type ReminderSettings,
} from "@/lib/reminders";
import { inScope } from "@/lib/scope";
import { AppShellComponent } from "@shared/app-shell.component";
import { LocaleService } from "@shared/locale.service";
import { StoreService } from "@shared/store.service";
import {
  IconComponent,
  SelectComponent,
  SnackbarService,
  TextFieldComponent,
  TONE,
  V2_PAGE_STYLES,
  type IconName,
  type SelectOption,
} from "@shared/ui";

/** Libellé, aide et icône de chaque délai réglable. */
const DELAY_FIELD: Record<ReminderDelayField, { label: MessageKey; hint: MessageKey; icon: IconName }> = {
  dossierPendingDays: { label: "rappels.field.dossier", hint: "rappels.field.dossierHint", icon: "folder_shared" },
  meetingNoticeDays: { label: "rappels.field.meeting", hint: "rappels.field.meetingHint", icon: "event" },
  contributionDueDays: { label: "rappels.field.contribution", hint: "rappels.field.contributionHint", icon: "payments" },
  decisionDueDays: { label: "rappels.field.decision", hint: "rappels.field.decisionHint", icon: "gavel" },
};

const CHANNEL: Record<ReminderChannel, { label: MessageKey; icon: IconName }> = {
  app: { label: "rappels.channel.app", icon: "notifications" },
  sms: { label: "rappels.channel.sms", icon: "call" },
  email: { label: "rappels.channel.email", icon: "mail" },
};

const PREVIEW: Record<ReminderKind, { label: MessageKey; icon: IconName; bg: string; fg: string }> = {
  meeting: { label: "rappels.preview.meeting", icon: "event", ...TONE.info },
  decision: { label: "rappels.preview.decision", icon: "gavel", ...TONE.attente },
  dossier: { label: "rappels.preview.dossier", icon: "folder_shared", ...TONE.culture },
  contribution: { label: "rappels.preview.contribution", icon: "payments", ...TONE.succes },
};

/** Formulaire : délais saisis en texte (champ numérique), convertis à l'enregistrement. */
type Draft = Omit<ReminderSettings, ReminderDelayField> & Record<ReminderDelayField, string>;

const toDraft = (settings: ReminderSettings): Draft => ({
  ...settings,
  dossierPendingDays: String(settings.dossierPendingDays),
  meetingNoticeDays: String(settings.meetingNoticeDays),
  contributionDueDays: String(settings.contributionDueDays),
  decisionDueDays: String(settings.decisionDueDays),
});

/**
 * Notifications et rappels (charte V2, matrice M1) : délais et canaux des rappels par coopérative.
 * L'administration règle les valeurs par défaut ; le gestionnaire ou le bureau règle sa coopérative.
 * Un aperçu montre les rappels qui partiraient aujourd'hui avec ces réglages.
 */
@Component({
  selector: "app-rappels-page",
  imports: [AppShellComponent, IconComponent, RouterLink, SelectComponent, TextFieldComponent],
  styles: [
    V2_PAGE_STYLES,
    `
      .layout {
        display: grid;
        gap: 16px;
      }
      @media (min-width: 1100px) {
        .layout {
          grid-template-columns: minmax(0, 1fr) 380px;
          align-items: start;
        }
      }
      .delays {
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      }
      .channels {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      .channels .check {
        flex: 1 1 160px;
      }
      .switch {
        display: flex;
        align-items: center;
        gap: 14px;
        border-radius: 18px;
        background: var(--v2-creme);
        padding: 14px 16px;
        cursor: pointer;
      }
      .switch input {
        height: 22px;
        width: 22px;
        accent-color: var(--v2-foret);
        cursor: pointer;
      }
      .preview-item {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        border-top: 1px solid var(--v2-separateur);
        padding: 12px 18px;
      }
      .preview-item:first-child {
        border-top: none;
      }
      .preview-ico {
        display: grid;
        height: 36px;
        width: 36px;
        flex-shrink: 0;
        place-items: center;
        border-radius: 12px;
      }
    `,
  ],
  template: `
    <app-shell perm="notification.configure" [area]="t()('rappels.title')">
      <header class="rise">
        <p class="mono" style="color: var(--v2-gris-texte)">{{ t()("rappels.eyebrow") }}</p>
        <h1 class="mt-2 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]">{{ t()("rappels.title") }}</h1>
        <p class="mt-2 max-w-2xl text-[16px] font-medium" style="color: var(--v2-gris-texte)">{{ t()("rappels.description") }}</p>
      </header>

      <div class="toolbar card mt-6">
        <ui-select class="min-w-[280px] flex-1" [label]="t()('rappels.target')" [options]="targetOptions()" [value]="target()" leadingIcon="apartment" (valueChange)="target.set($event)" />
        <span class="badge" [style.background]="ownSettings() ? 'var(--v2-citron)' : 'var(--v2-lin)'" [style.color]="ownSettings() ? 'var(--v2-foret)' : 'var(--v2-gris-texte)'">
          {{ target() === defaultKey ? t()("rappels.badge.default") : ownSettings() ? t()("rappels.badge.own") : t()("rappels.badge.inherited") }}
        </span>
      </div>

      <div class="layout mt-4">
        <section class="sec-card">
          <div class="sec-head">
            <h2><span class="sec-ico"><ui-icon name="tune" [size]="18" /></span>{{ t()("rappels.settings") }}</h2>
          </div>
          <div class="space-y-6 border-t p-5" style="border-color: var(--v2-separateur)">
            <label class="switch">
              <input type="checkbox" [checked]="draft().enabled" (change)="patch({ enabled: $any($event.target).checked })" />
              <span>
                <span class="block text-[15px] font-extrabold">{{ t()("rappels.enabled") }}</span>
                <span class="sub block">{{ draft().enabled ? t()("rappels.enabledOn") : t()("rappels.enabledOff") }}</span>
              </span>
            </label>

            <div class="delays">
              @for (field of delayFields; track field) {
                <ui-text-field
                  [label]="t()(delayField[field].label)"
                  type="number"
                  inputmode="numeric"
                  [icon]="delayField[field].icon"
                  [placeholder]="t()('rappels.daysPh')"
                  [hint]="t()(delayField[field].hint)"
                  [value]="draft()[field]"
                  [error]="fieldError(field)"
                  (valueChange)="patchDelay(field, $event)"
                />
              }
            </div>

            <fieldset>
              <legend class="lbl">{{ t()("rappels.channels") }}</legend>
              <div class="channels mt-2">
                @for (channel of channels; track channel) {
                  <label class="check">
                    <input type="checkbox" [checked]="draft().channels.includes(channel)" (change)="toggleChannel(channel, $any($event.target).checked)" />
                    <ui-icon [name]="channelStyle[channel].icon" [size]="18" />{{ t()(channelStyle[channel].label) }}
                  </label>
                }
              </div>
              @if (tried() && channelsMissing()) {
                <p class="mt-1.5 flex items-center gap-1.5 text-[13px] font-bold" style="color: var(--v2-erreur-fg)" role="alert"><ui-icon name="warning" [size]="16" />{{ t()("rappels.err.channels") }}</p>
              }
            </fieldset>

            <p class="notice"><ui-icon name="info" [size]="18" />{{ t()("rappels.noAutoApproval") }}</p>

            <div class="flex flex-wrap justify-end gap-2">
              @if (ownSettings() && target() !== defaultKey) {
                <button type="button" class="btn btn-ghost" (click)="useDefaults()"><ui-icon name="undo" [size]="18" />{{ t()("rappels.useDefaults") }}</button>
              }
              <button type="button" class="btn btn-primary" (click)="save()">
                {{ t()("rappels.save") }}<span class="btn-chip"><ui-icon name="check" [size]="18" /></span>
              </button>
            </div>
          </div>
        </section>

        <section class="sec-card">
          <div class="sec-head">
            <h2><span class="sec-ico"><ui-icon name="notifications_active" [size]="18" /></span>{{ t()("rappels.preview.title") }}<span class="n">{{ nf.format(preview().length) }}</span></h2>
          </div>
          <div class="border-t" style="border-color: var(--v2-separateur)">
            @if (target() === defaultKey) {
              <p class="sub p-5">{{ t()("rappels.preview.pickScoop") }}</p>
            } @else {
              @for (item of preview(); track item.kind + item.refId + item.date) {
                <div class="preview-item">
                  <span class="preview-ico" [style.background]="previewStyle[item.kind].bg" [style.color]="previewStyle[item.kind].fg"><ui-icon [name]="previewStyle[item.kind].icon" [size]="18" /></span>
                  <span class="min-w-0 flex-1">
                    <span class="mono block" style="color: var(--v2-gris-texte)">{{ t()(previewStyle[item.kind].label) }}</span>
                    @if (item.kind === "meeting" || item.kind === "decision") {
                      <a class="block truncate font-bold underline-offset-4 hover:underline" [routerLink]="['/dashboard/reunions', item.refId]">{{ item.title }}</a>
                    } @else if (item.kind === "dossier") {
                      <a class="block truncate font-bold underline-offset-4 hover:underline" [routerLink]="['/dashboard/dossiers', item.refId]">{{ item.title }}</a>
                    } @else {
                      <span class="block font-bold">{{ t()("rappels.preview.contributionText", { amount: nf.format(+item.title) }) }}</span>
                    }
                    <span class="sub block">{{ fmtDate(item.date) }}</span>
                  </span>
                </div>
              } @empty {
                <p class="sub p-5">{{ draft().enabled ? t()("rappels.preview.none") : t()("rappels.preview.disabled") }}</p>
              }
            }
          </div>
        </section>
      </div>
    </app-shell>
  `,
})
export default class RappelsPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  private readonly snackbar = inject(SnackbarService);

  protected readonly nf = nf;
  protected readonly fmtDate = fmtDate;
  protected readonly defaultKey = DEFAULT_REMINDER_KEY;
  protected readonly delayFields = REMINDER_DELAY_FIELDS;
  protected readonly delayField = DELAY_FIELD;
  protected readonly channels = REMINDER_CHANNELS;
  protected readonly channelStyle = CHANNEL;
  protected readonly previewStyle = PREVIEW;

  private readonly consolidated = computed(() => this.store.state().session?.scope.kind === "consolidé");

  /** Coopératives réglables : celles du périmètre (toutes en vue consolidée), précédées des valeurs par défaut. */
  protected readonly targetOptions = computed<SelectOption[]>(() => {
    const state = this.store.state();
    const scoops = inScope(
      state.scoops.filter((scoop) => !scoop.archived).map((scoop) => ({ ...scoop, scoopId: scoop.id })),
      state.session,
    );
    const own = (id: string) => (state.reminderSettings[id] ? this.t()("rappels.badge.own") : "");
    return [
      ...(this.consolidated()
        ? [{ value: DEFAULT_REMINDER_KEY, label: this.t()("rappels.defaults"), icon: "public" as IconName }]
        : []),
      ...scoops.map((scoop) => ({ value: scoop.id, label: scoop.name, hint: own(scoop.id) })),
    ];
  });

  protected readonly target = signal<string>("");
  protected readonly draft = signal<Draft>(toDraft(reminderSettingsOf({}, null)));
  protected readonly tried = signal(false);

  constructor() {
    // Première cible : les valeurs par défaut (vue consolidée) ou la première coopérative du périmètre.
    effect(() => {
      const options = this.targetOptions();
      untracked(() => {
        if (!options.some((option) => option.value === this.target())) this.target.set(options[0]?.value ?? "");
      });
    });
    // Le formulaire repart des réglages en vigueur à chaque changement de cible.
    effect(() => {
      const target = this.target();
      untracked(() => {
        this.draft.set(toDraft(this.current(target)));
        this.tried.set(false);
      });
    });
  }

  private current(target: string): ReminderSettings {
    const settings = this.store.state().reminderSettings;
    return reminderSettingsOf(settings, target === DEFAULT_REMINDER_KEY ? null : target);
  }

  protected readonly ownSettings = computed(() => !!this.store.state().reminderSettings[this.target()]);

  /** Réglages saisis, convertis (un délai vide ou non entier devient NaN et sera signalé). */
  private readonly parsed = computed<ReminderSettings>(() => {
    const draft = this.draft();
    const days = (value: string) => (value.trim() === "" ? Number.NaN : Number(value));
    return {
      ...draft,
      dossierPendingDays: days(draft.dossierPendingDays),
      meetingNoticeDays: days(draft.meetingNoticeDays),
      contributionDueDays: days(draft.contributionDueDays),
      decisionDueDays: days(draft.decisionDueDays),
    };
  });

  private readonly issues = computed(() => reminderIssues(this.parsed()));
  protected readonly channelsMissing = computed(() => this.issues().includes("channels"));

  protected fieldError(field: ReminderDelayField): string {
    if (!this.tried() || !this.issues().includes(field)) return "";
    return this.t()("rappels.err.days", { min: REMINDER_MIN_DAYS, max: REMINDER_MAX_DAYS });
  }

  /** Aperçu calculé avec les réglages saisis (avant enregistrement), pour la coopérative choisie. */
  protected readonly preview = computed(() => {
    const target = this.target();
    if (!target || target === DEFAULT_REMINDER_KEY || this.issues().some((issue) => issue !== "channels")) return [];
    const state = this.store.state();
    return previewReminders({
      scoopId: target,
      settings: this.parsed(),
      nowIso: new Date().toISOString(),
      meetings: state.meetings,
      dossiers: state.dossiers,
      rules: state.contributionRules,
    });
  });

  protected patch(change: Partial<Draft>): void {
    this.draft.update((draft) => ({ ...draft, ...change }));
  }

  protected patchDelay(field: ReminderDelayField, value: string): void {
    this.draft.update((draft) => ({ ...draft, [field]: value }));
  }

  protected toggleChannel(channel: ReminderChannel, checked: boolean): void {
    this.draft.update((draft) => ({
      ...draft,
      channels: checked
        ? REMINDER_CHANNELS.filter((item) => item === channel || draft.channels.includes(item))
        : draft.channels.filter((item) => item !== channel),
    }));
  }

  protected save(): void {
    this.tried.set(true);
    if (this.issues().length) return;
    const target = this.target();
    const result = this.store.actions.setReminderSettings(
      target === DEFAULT_REMINDER_KEY ? null : target,
      this.parsed(),
    );
    if (!result.ok) {
      this.snackbar.error(result.error);
      return;
    }
    this.snackbar.success(this.locale.tNow("rappels.saved"));
  }

  protected useDefaults(): void {
    const result = this.store.actions.clearReminderSettings(this.target());
    if (!result.ok) {
      this.snackbar.error(result.error);
      return;
    }
    this.draft.set(toDraft(this.current(this.target())));
    this.snackbar.success(this.locale.tNow("rappels.defaultsRestored"));
  }
}
