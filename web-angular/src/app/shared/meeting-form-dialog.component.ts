import { Component, ElementRef, computed, effect, inject, input, model, output, signal, untracked } from "@angular/core";
import { Router } from "@angular/router";

import type { MessageKey } from "@/lib/i18n";
import { AccessDeniedError } from "@/lib/store";
import { MEETING_KINDS, MEETING_MODES, type Meeting, type MeetingKind, type MeetingMode } from "@/lib/mock/cooperative";
import type { Scoop } from "@/lib/mock/data";
import { inScope } from "@/lib/scope";

import { MEETING_KIND_LABEL } from "./meeting-kinds";
import { LocaleService } from "./locale.service";
import { StoreService } from "./store.service";
import { CheckListComponent } from "./ui/check-list.component";
import { IconComponent, type IconName } from "./ui/icon.component";
import { ModalComponent } from "./ui/modal.component";
import { SelectComponent, type SelectOption } from "./ui/select.component";
import { TextFieldComponent } from "./ui/text-field.component";

const pad = (n: number) => String(n).padStart(2, "0");

/** ISO → valeur `datetime-local` (heure locale). */
function toLocalInput(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Icône de chaque type de réunion. */
const KIND_ICON: Record<MeetingKind, IconName> = {
  "assemblée générale": "group",
  "assemblée extraordinaire": "gavel",
  bureau: "badge",
  autre: "event",
};

const MODE_ICON: Record<MeetingMode, IconName> = { "sur place": "location_on", "en ligne": "public", mixte: "hub" };
const MODE_LABEL: Record<MeetingMode, MessageKey> = {
  "sur place": "reunions.form.mode.onsite",
  "en ligne": "reunions.form.mode.online",
  mixte: "reunions.form.mode.mixed",
};

/**
 * Création ou modification d'une réunion planifiée (charte V2), partagée par la liste et la fiche réunion.
 * Type en cartes, titre / date / lieu en champs types, ordre du jour en liste de points (ajout, retrait,
 * Entrée pour passer au point suivant). Erreurs affichées champ par champ après un essai d'envoi.
 */
@Component({
  selector: "app-meeting-form-dialog",
  imports: [CheckListComponent, IconComponent, ModalComponent, SelectComponent, TextFieldComponent],
  styles: `
    .modes {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)) !important;
    }
    .sec {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 24px 0 12px;
      font-size: 14px;
      font-weight: 800;
      color: var(--v2-foret);
    }
    .sec:first-child {
      margin-top: 4px;
    }
    .lbl {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--v2-ardoise);
    }
    .kinds {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    @media (min-width: 640px) {
      .kinds {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }
    .kind {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      border-radius: 16px;
      border: 1.5px solid var(--v2-bord-carte);
      background: var(--v2-blanc);
      padding: 12px;
      text-align: left;
      font-size: 13px;
      font-weight: 700;
      line-height: 1.25;
      color: var(--v2-encre);
      cursor: pointer;
      transition:
        border-color 0.15s ease,
        background-color 0.15s ease;
    }
    .kind:hover {
      border-color: var(--v2-gris-texte);
    }
    .kind.on {
      border: 2px solid var(--v2-foret);
      background: var(--v2-sauge);
      padding: 11.5px;
    }
    .kind:focus-visible {
      outline: 2px solid var(--v2-foret);
      outline-offset: 2px;
    }
    .kind .ico {
      display: grid;
      height: 32px;
      width: 32px;
      place-items: center;
      border-radius: 10px;
      background: var(--v2-creme);
      color: var(--v2-foret);
    }
    .kind.on .ico {
      background: var(--v2-foret);
      color: var(--v2-citron);
    }
    .points {
      display: grid;
      gap: 8px;
    }
    .point {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .num {
      display: grid;
      height: 32px;
      width: 32px;
      flex-shrink: 0;
      place-items: center;
      border-radius: 999px;
      background: var(--v2-foret);
      color: var(--v2-citron);
      font-size: 12px;
      font-weight: 800;
    }
    .point input {
      height: 48px;
      min-width: 0;
      flex: 1;
      border-radius: 14px;
      border: 1.5px solid var(--v2-gris-trait);
      background: var(--v2-blanc);
      padding: 0 14px;
      font-size: 15px;
      font-weight: 600;
      color: var(--v2-encre);
    }
    .point input::placeholder {
      color: var(--v2-gris-texte);
      font-weight: 500;
    }
    .point input:hover {
      border-color: var(--v2-gris-texte);
    }
    .point input:focus-visible {
      outline: none;
      border: 2px solid var(--v2-foret);
      box-shadow: var(--v2-halo);
    }
    .rm {
      display: grid;
      height: 40px;
      width: 40px;
      flex-shrink: 0;
      place-items: center;
      border-radius: 12px;
      color: var(--v2-ardoise);
      cursor: pointer;
    }
    .rm:hover {
      background: var(--v2-erreur-bg);
      color: var(--v2-erreur-fg);
    }
    .rm:focus-visible {
      outline: 2px solid var(--v2-foret);
    }
    .add {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 10px;
      border-radius: 12px;
      padding: 8px 12px;
      font-size: 14px;
      font-weight: 800;
      color: var(--v2-foret);
      cursor: pointer;
    }
    .add:hover {
      background: var(--v2-sauge);
    }
    .add:focus-visible {
      outline: 2px solid var(--v2-foret);
    }
    .btn {
      display: inline-flex;
      height: 48px;
      align-items: center;
      gap: 10px;
      border-radius: 16px;
      padding: 0 18px;
      font-size: 15px;
      font-weight: 800;
      cursor: pointer;
    }
    .btn-primary {
      padding: 0 6px 0 18px;
      background: var(--v2-foret);
      color: var(--v2-blanc);
    }
    .btn-primary:hover {
      background: var(--v2-foret-clair);
    }
    .btn-ghost {
      border: 1.5px solid var(--v2-gris-trait);
      background: var(--v2-blanc);
      color: var(--v2-encre);
    }
    .btn-ghost:hover {
      border-color: var(--v2-gris-texte);
    }
    .chip {
      display: grid;
      height: 36px;
      width: 36px;
      place-items: center;
      border-radius: 12px;
      background: var(--v2-citron);
      color: var(--v2-foret);
    }
  `,
  template: `
    <ui-modal [open]="open()" [title]="titleText()" [description]="descriptionText()" icon="calendar_month" [width]="720" [closeLabel]="t()('common.close')" (closed)="close()">
      <div class="pb-6">
        <!-- La réunion -->
        <h3 class="sec"><ui-icon name="event" [size]="18" />{{ t()("reunions.form.section.what") }}</h3>
        @if (!meeting() && scoops().length > 1) {
          <p class="lbl">{{ t()("reunions.form.scoop") }}</p>
          <ui-select class="mb-5 mt-2 block" [label]="t()('reunions.form.scoop')" leadingIcon="apartment" [options]="scoopOptions()" [value]="scoopId()" (valueChange)="scoopId.set($event)" />
        }
        <p class="lbl">{{ t()("reunions.form.kind") }}</p>
        <div class="kinds mt-2" role="radiogroup" [attr.aria-label]="t()('reunions.form.kind')">
          @for (meetingKind of meetingKinds; track meetingKind) {
            <button type="button" role="radio" class="kind" [class.on]="kind() === meetingKind" [attr.aria-checked]="kind() === meetingKind" (click)="kind.set(meetingKind)">
              <span class="ico"><ui-icon [name]="kindIcon[meetingKind]" [size]="18" /></span>
              {{ t()(kindLabel[meetingKind]) }}
            </button>
          }
        </div>
        <ui-text-field class="mt-5" preset="meetingTitle" [label]="t()('reunions.form.title')" [value]="title()" [error]="tried() ? errTitle() : ''" (valueChange)="title.set($event)" />

        <!-- Date, lieu et lien -->
        <h3 class="sec"><ui-icon name="location_on" [size]="18" />{{ t()("reunions.form.section.when") }}</h3>
        <ui-text-field type="datetime-local" icon="calendar_today" [label]="t()('reunions.form.date')" [value]="dateLocal()" [error]="tried() ? errDate() : ''" (valueChange)="dateLocal.set($event)" />

        <p class="lbl mt-5">{{ t()("reunions.form.mode") }}</p>
        <div class="kinds modes mt-2" role="radiogroup" [attr.aria-label]="t()('reunions.form.mode')">
          @for (option of meetingModes; track option) {
            <button type="button" role="radio" class="kind" [class.on]="mode() === option" [attr.aria-checked]="mode() === option" (click)="mode.set(option)">
              <span class="ico"><ui-icon [name]="modeIcon[option]" [size]="18" /></span>
              {{ t()(modeLabel[option]) }}
            </button>
          }
        </div>

        @if (mode() !== "en ligne") {
          <ui-text-field class="mt-5" preset="place" [label]="t()('reunions.form.place')" [value]="place()" [error]="tried() ? errPlace() : ''" (valueChange)="place.set($event)" />
        }

        @if (mode() !== "sur place") {
          <p class="lbl mt-5">{{ t()("reunions.form.link.kind") }}</p>
          <div class="kinds modes mt-2" role="radiogroup" [attr.aria-label]="t()('reunions.form.link.kind')">
            <button type="button" role="radio" class="kind" [class.on]="linkKind() === 'jitsi'" [attr.aria-checked]="linkKind() === 'jitsi'" (click)="linkKind.set('jitsi')">
              <span class="ico"><ui-icon name="public" [size]="18" /></span>{{ t()("reunions.form.link.jitsi") }}
            </button>
            <button type="button" role="radio" class="kind" [class.on]="linkKind() === 'other'" [attr.aria-checked]="linkKind() === 'other'" (click)="linkKind.set('other')">
              <span class="ico"><ui-icon name="link" [size]="18" /></span>{{ t()("reunions.form.link.other") }}
            </button>
          </div>
          @if (linkKind() === "jitsi") {
            <p class="mt-3 text-[13px] font-medium" style="color: var(--v2-gris-texte)">{{ t()("reunions.form.link.jitsiHelp") }}</p>
            <p class="mt-2 break-all rounded-[14px] px-4 py-3 text-[14px] font-bold" style="background: var(--v2-sauge); color: var(--v2-foret)">{{ jitsiUrl() }}</p>
            <button type="button" class="add" (click)="jitsiUrl.set(newJitsiUrl())"><ui-icon name="refresh" [size]="18" />{{ t()("reunions.form.link.jitsiNew") }}</button>
          } @else {
            <ui-text-field class="mt-4" type="text" icon="link" [label]="t()('reunions.form.link.url')" placeholder="https://…" [value]="onlineUrl()" [error]="tried() ? errLink() : ''" (valueChange)="onlineUrl.set($event)" />
          }
        }

        <!-- Qui est convoqué -->
        @if (true) {
          <h3 class="sec"><ui-icon name="group" [size]="18" />{{ t()("reunions.form.section.who") }}</h3>
          <p class="mb-3 text-[13px] font-medium" style="color: var(--v2-gris-texte)">{{ t()("reunions.form.who.hint") }}</p>
          @if (orgOptions().length) {
            <ui-check-list [label]="t()('reunions.form.who.orgs')" [options]="orgOptions()" [value]="orgIds()" (valueChange)="orgIds.set($event)" />
          }
          @if (staffOptions().length) {
            <ui-check-list class="mt-5 block" [label]="t()('reunions.form.who.staff')" [options]="staffOptions()" [value]="staffIds()" (valueChange)="staffIds.set($event)" />
          }
          <p class="lbl mt-5">{{ t()("reunions.form.who.others") }}</p>
          @if (others().length) {
            <ul class="mt-2 flex flex-wrap gap-2">
              @for (guest of others(); track $index; let position = $index) {
                <li class="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-bold" style="background: var(--v2-sauge); color: var(--v2-foret)">
                  {{ guest }}
                  <button type="button" [attr.aria-label]="t()('reunions.form.who.remove', { name: guest })" (click)="removeOther(position)"><ui-icon name="close" [size]="14" /></button>
                </li>
              }
            </ul>
          }
          <div class="mt-2 flex gap-2">
            <input class="agenda-input" maxlength="80" [placeholder]="t()('reunions.form.who.othersPh')" [attr.aria-label]="t()('reunions.form.who.others')" [value]="otherDraft()" (input)="otherDraft.set($any($event.target).value)" (keydown.enter)="$event.preventDefault(); addOther()" />
            <button type="button" class="add" style="margin-top: 0" (click)="addOther()"><ui-icon name="add" [size]="18" />{{ t()("reunions.form.who.add") }}</button>
          </div>
        }

        <!-- Ordre du jour -->
        <h3 class="sec"><ui-icon name="fact_check" [size]="18" />{{ t()("reunions.form.section.agenda") }}</h3>
        @if (agenda().length) {
          <ol class="points">
            @for (item of agenda(); track $index; let position = $index) {
              <li class="point">
                <span class="num" aria-hidden="true">{{ position + 1 }}</span>
                <input
                  class="agenda-input"
                  [attr.aria-label]="t()('reunions.form.agendaPoint', { n: position + 1 })"
                  [placeholder]="t()('ui.field.ph.agendaItem')"
                  maxlength="160"
                  [value]="item"
                  (input)="setPoint(position, $any($event.target).value)"
                  (keydown.enter)="$event.preventDefault(); addPoint(position + 1)"
                />
                <button type="button" class="rm" [attr.aria-label]="t()('reunions.form.agendaRemove', { n: position + 1 })" (click)="removePoint(position)">
                  <ui-icon name="close" [size]="18" />
                </button>
              </li>
            }
          </ol>
        } @else {
          <p class="rounded-[16px] px-4 py-3 text-[13px] font-medium" style="background: var(--v2-creme); color: var(--v2-gris-texte)">{{ t()("reunions.form.agendaEmpty") }}</p>
        }
        <button type="button" class="add" (click)="addPoint(agenda().length)">
          <ui-icon name="add" [size]="18" />{{ t()("reunions.form.agendaAdd") }}
        </button>
      </div>

      <button modal-footer type="button" class="btn btn-ghost" (click)="close()">{{ t()("producteurs.index.cancel") }}</button>
      <button modal-footer type="button" class="btn btn-primary" (click)="submit()">
        {{ submitLabel() }}
        <span class="chip"><ui-icon name="check" [size]="18" /></span>
      </button>
    </ui-modal>
  `,
})
export class MeetingFormDialogComponent {
  private readonly locale = inject(LocaleService);
  private readonly store = inject(StoreService);
  private readonly router = inject(Router);

  protected readonly t = this.locale.t;
  protected readonly kindLabel = MEETING_KIND_LABEL;
  protected readonly kindIcon = KIND_ICON;
  protected readonly meetingKinds = [...MEETING_KINDS];
  protected readonly meetingModes = [...MEETING_MODES];
  protected readonly modeIcon = MODE_ICON;
  protected readonly modeLabel = MODE_LABEL;
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);

  readonly open = model(false);
  readonly meeting = input<Meeting | undefined>(undefined);
  readonly defaultScoopId = input<string | undefined>(undefined);
  /** Jour choisi dans le calendrier : proposition à 9 h (comme React). */
  readonly defaultDate = input<Date | undefined>(undefined);

  readonly notify = output<{ kind: "success" | "error"; text: string }>();
  readonly closed = output<void>();

  protected readonly scoops = computed(() => {
    const all = this.store.state().scoops;
    const session = this.store.state().session;
    return all.filter((s: Scoop) => inScope([{ scoopId: s.id }], session).length === 1);
  });

  protected readonly titleText = computed(() =>
    this.meeting() ? this.t()("reunions.form.editTitle") : this.t()("reunions.form.createTitle"),
  );

  protected readonly descriptionText = computed(() =>
    this.meeting()
      ? this.t()("reunions.form.editDescription")
      : this.t()("reunions.form.createDescription"),
  );

  protected readonly submitLabel = computed(() =>
    this.meeting() ? this.t()("reunions.form.save") : this.t()("reunions.form.create"),
  );

  protected readonly scoopOptions = computed<SelectOption[]>(() => this.scoops().map((s) => ({ value: s.id, label: s.name })));

  protected readonly scoopId = signal("");

  /** GIE de la coopérative choisie. */
  protected readonly orgOptions = computed<SelectOption[]>(() =>
    this.store
      .state()
      .orgs.filter((org) => org.scoopId === this.scoopId())
      .sort((first, second) => first.name.localeCompare(second.name))
      .map((org) => ({ value: org.id, label: org.name })),
  );

  /** Personnel de la coopérative choisie : comptes de la coopérative, techniciens compris. */
  protected readonly staffOptions = computed<SelectOption[]>(() =>
    this.store
      .state()
      .users.filter(
        (user) =>
          (user.scoopId === this.scoopId() || user.scoopIds?.includes(this.scoopId())) &&
          user.role !== "faitiere" &&
          user.role !== "admin" &&
          user.role !== "superadmin",
      )
      .sort((first, second) => first.name.localeCompare(second.name))
      .map((user) => ({ value: user.id, label: user.name, hint: this.store.roleLabel(user.role) })),
  );
  protected readonly kind = signal<MeetingKind>("assemblée générale");
  protected readonly title = signal("");
  protected readonly dateLocal = signal("");
  protected readonly place = signal("");
  protected readonly mode = signal<MeetingMode>("sur place");
  /** Jitsi : lien créé automatiquement ; autre lien : saisi par la personne. */
  protected readonly linkKind = signal<"jitsi" | "other">("jitsi");
  /** Lien Jitsi créé à l'ouverture du formulaire (salle au nom aléatoire, sans compte ni rendez-vous à créer). */
  protected readonly jitsiUrl = signal("");
  protected readonly onlineUrl = signal("");
  protected readonly orgIds = signal<string[]>([]);
  protected readonly staffIds = signal<string[]>([]);
  protected readonly others = signal<string[]>([]);
  protected readonly otherDraft = signal("");
  /** Ordre du jour : un point par ligne de la liste. */
  protected readonly agenda = signal<string[]>([]);
  protected readonly tried = signal(false);

  constructor() {
    effect(() => {
      if (!this.open()) return;
      untracked(() => this.resetForm());
    });
  }

  private resetForm(): void {
    const m = this.meeting();
    const defScoop = this.defaultScoopId();
    const list = this.scoops();
    const allowed = new Set(list.map((s) => s.id));

    this.tried.set(false);

    if (m) {
      this.scoopId.set(m.scoopId);
      this.kind.set(m.kind);
      this.title.set(m.title);
      this.dateLocal.set(toLocalInput(m.date));
      this.place.set(m.place);
      this.mode.set(m.mode ?? "sur place");
      const isJitsi = !m.onlineUrl || m.onlineUrl.startsWith("https://meet.jit.si/");
      this.linkKind.set(isJitsi ? "jitsi" : "other");
      this.jitsiUrl.set(isJitsi && m.onlineUrl ? m.onlineUrl : this.newJitsiUrl());
      this.onlineUrl.set(isJitsi ? "" : (m.onlineUrl ?? ""));
      this.orgIds.set([...(m.audience?.orgIds ?? [])]);
      this.staffIds.set([...(m.audience?.staffIds ?? [])]);
      this.others.set([...(m.audience?.others ?? [])]);
      this.otherDraft.set("");
      this.agenda.set([...m.agenda]);
      return;
    }

    this.scoopId.set((defScoop && allowed.has(defScoop) ? defScoop : list[0]?.id) ?? "");
    this.kind.set("assemblée générale");
    this.title.set("");
    const dd = this.defaultDate();
    this.dateLocal.set(dd ? toLocalInput(new Date(dd.getFullYear(), dd.getMonth(), dd.getDate(), 9, 0).toISOString()) : "");
    this.place.set("");
    this.mode.set("sur place");
    this.linkKind.set("jitsi");
    this.jitsiUrl.set(this.newJitsiUrl());
    this.onlineUrl.set("");
    this.orgIds.set([]);
    this.staffIds.set([]);
    this.others.set([]);
    this.otherDraft.set("");
    this.agenda.set([""]);
  }

  protected errTitle(): string {
    return this.title().trim() ? "" : this.t()("reunions.form.errorTitle");
  }

  protected errDate(): string {
    return this.dateLocal() ? "" : this.t()("reunions.form.errorDate");
  }

  protected errPlace(): string {
    return this.mode() === "en ligne" || this.place().trim() ? "" : this.t()("reunions.form.errorPlace");
  }

  /** Salle Jitsi au nom aléatoire (12 caractères) : le lien ne se devine pas et marche tout de suite, sans compte. */
  protected newJitsiUrl(): string {
    const letters = "abcdefghjkmnpqrstuvwxyz23456789";
    const picks = new Uint32Array(12);
    globalThis.crypto.getRandomValues(picks);
    return `https://meet.jit.si/mbay-diaay-${Array.from(picks, (value) => letters[value % letters.length]).join("")}`;
  }

  /** Lien choisi : celui de Jitsi, ou l'adresse saisie (https obligatoire) pour une réunion en ligne ou mixte. */
  protected chosenUrl(): string {
    return this.linkKind() === "jitsi" ? this.jitsiUrl() : this.onlineUrl().trim();
  }

  protected errLink(): string {
    if (this.mode() === "sur place" || this.linkKind() === "jitsi") return "";
    try {
      return new URL(this.onlineUrl().trim()).protocol === "https:" ? "" : this.t()("errors.meeting.link");
    } catch {
      return this.t()("errors.meeting.link");
    }
  }

  protected addOther(): void {
    const name = this.otherDraft().trim();
    if (!name) return;
    this.others.update((list) => (list.includes(name) ? list : [...list, name]));
    this.otherDraft.set("");
  }

  protected removeOther(position: number): void {
    this.others.update((list) => list.filter((_, index) => index !== position));
  }

  protected setPoint(i: number, value: string): void {
    this.agenda.update((list) => list.map((x, j) => (j === i ? value : x)));
  }

  /** Ajoute un point à la position donnée et y place le curseur. */
  protected addPoint(at: number): void {
    this.agenda.update((list) => [...list.slice(0, at), "", ...list.slice(at)]);
    setTimeout(() => {
      const inputs = this.host.nativeElement.ownerDocument.querySelectorAll<HTMLInputElement>("ui-modal .agenda-input");
      inputs[at]?.focus();
    });
  }

  protected removePoint(i: number): void {
    this.agenda.update((list) => list.filter((_, j) => j !== i));
  }

  protected close(): void {
    this.open.set(false);
    this.closed.emit();
  }

  protected submit(): void {
    this.tried.set(true);
    if (this.errTitle() || this.errDate() || this.errPlace() || this.errLink()) return;
    this.addOther();

    const agenda = this.agenda().map((l) => l.trim()).filter(Boolean);
    const m = this.meeting();

    try {
      if (m) {
        const res = this.store.actions.updateMeeting(m.id, {
          kind: this.kind(),
          title: this.title(),
          date: this.dateLocal(),
          place: this.place(),
          agenda,
          mode: this.mode(),
          onlineUrl: this.chosenUrl(),
          audience: { orgIds: this.orgIds(), staffIds: this.staffIds(), others: this.others() },
        });
        if (!res.ok) {
          this.pushError(res.error as MessageKey);
          return;
        }
        this.notify.emit({ kind: "success", text: this.t()("reunions.form.saved") });
        this.open.set(false);
        this.closed.emit();
        return;
      }

      const res = this.store.actions.createMeeting({
        scoopId: this.scoopId(),
        kind: this.kind(),
        title: this.title(),
        date: this.dateLocal(),
        place: this.place(),
        agenda,
        mode: this.mode(),
        onlineUrl: this.chosenUrl(),
        audience: { orgIds: this.orgIds(), staffIds: this.staffIds(), others: this.others() },
      });
      if (!res.ok) {
        this.pushError(res.error as MessageKey);
        return;
      }
      this.notify.emit({ kind: "success", text: this.t()("reunions.form.created") });
      this.open.set(false);
      this.closed.emit();
      void this.router.navigate(["/dashboard/reunions", res.id]);
    } catch (e) {
      this.notify.emit({ kind: "error", text: this.exceptionText(e) });
    }
  }

  private pushError(key: MessageKey): void {
    this.notify.emit({ kind: "error", text: this.locale.tNow(key) });
  }

  private exceptionText(e: unknown): string {
    if (e instanceof AccessDeniedError) return this.locale.tNow(e.key);
    return e instanceof Error ? e.message : String(e);
  }
}
