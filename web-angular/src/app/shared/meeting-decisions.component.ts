import { Component, computed, inject, input, signal } from "@angular/core";

import { fmtDate } from "@/lib/format";
import type { MessageKey } from "@/lib/i18n";
import type { DecisionStatus, Meeting, MeetingDecision } from "@/lib/mock/cooperative";

import { LocaleService } from "./locale.service";
import { StoreService } from "./store.service";
import { IconComponent } from "./ui/icon.component";
import { ModalComponent } from "./ui/modal.component";
import { SnackbarService } from "./ui/snackbar.service";
import { TextFieldComponent } from "./ui/text-field.component";
import { TONE, V2_PAGE_STYLES } from "./ui/v2-page.styles";

const STATUS_STYLE: Record<DecisionStatus, { label: MessageKey; bg: string; fg: string }> = {
  ouverte: { label: "decisions.status.ouverte", ...TONE.attente },
  "en cours": { label: "decisions.status.enCours", ...TONE.info },
  clôturée: { label: "decisions.status.cloturee", ...TONE.succes },
};

type AddErrors = Partial<Record<"text" | "owner", string>>;

/**
 * Décisions d'une réunion (charte V2) : liste suivie jusqu'à la clôture, ajout et changement d'état en modale.
 * Droit `decision.manage` pour écrire ; lecture pour qui voit la réunion. Une décision clôturée ne change plus.
 *
 * `<app-meeting-decisions [meeting]="current" />`
 */
@Component({
  selector: "app-meeting-decisions",
  imports: [IconComponent, ModalComponent, TextFieldComponent],
  host: { class: "block" },
  styles: [
    V2_PAGE_STYLES,
    `
      .decision {
        display: grid;
        gap: 8px;
        border-top: 1px solid var(--v2-separateur);
        padding: 16px 20px;
      }
      .decision:first-child {
        border-top: none;
      }
      .late {
        color: var(--v2-erreur-fg);
        font-weight: 800;
      }
      .closing {
        border-radius: 14px;
        background: var(--v2-creme);
        padding: 10px 12px;
        font-size: 14px;
        font-weight: 600;
      }
    `,
  ],
  template: `
    <section class="sec-card">
      <div class="sec-head">
        <h2>
          <span class="sec-ico"><ui-icon name="gavel" [size]="18" /></span>{{ t()("decisions.title") }}<span class="n">{{ meeting().decisions.length }}</span>
        </h2>
        @if (canAdd()) {
          <button type="button" class="btn btn-ghost" style="height: 40px" (click)="openAdd()"><ui-icon name="add" [size]="18" />{{ t()("decisions.add") }}</button>
        }
      </div>
      <div class="border-t" style="border-color: var(--v2-separateur)">
        @for (decision of decisions(); track decision.id) {
          <article class="decision">
            <div class="flex flex-wrap items-start justify-between gap-2">
              <p class="min-w-0 flex-1 text-[15px] font-bold">{{ decision.text }}</p>
              <span class="badge" [style.background]="statusStyle[decision.status].bg" [style.color]="statusStyle[decision.status].fg">{{ t()(statusStyle[decision.status].label) }}</span>
            </div>
            <p class="sub flex flex-wrap items-center gap-x-4 gap-y-1">
              <span class="inline-flex items-center gap-1.5"><ui-icon name="person" [size]="16" />{{ decision.ownerName }}</span>
              @if (decision.dueDate) {
                <span class="inline-flex items-center gap-1.5" [class.late]="isLate(decision)">
                  <ui-icon name="schedule" [size]="16" />{{ t()("decisions.due", { date: fmtDate(decision.dueDate) }) }}{{ isLate(decision) ? " · " + t()("decisions.late") : "" }}
                </span>
              } @else {
                <span class="zero">{{ t()("decisions.noDue") }}</span>
              }
            </p>
            @if (decision.status === "clôturée") {
              <p class="closing">
                {{ decision.closingNote }}
                <span class="sub block">{{ t()("decisions.closedBy", { by: decision.closedBy ?? "", date: decision.closedAt ? fmtDate(decision.closedAt) : "" }) }}</span>
              </p>
            } @else if (canManage()) {
              <span class="flex flex-wrap gap-2">
                @if (decision.status === "ouverte") {
                  <button type="button" class="btn btn-ghost" style="height: 40px" (click)="start(decision)"><ui-icon name="progress_activity" [size]="18" />{{ t()("decisions.start") }}</button>
                }
                <button type="button" class="btn btn-ghost" style="height: 40px" (click)="openClose(decision)"><ui-icon name="task_alt" [size]="18" />{{ t()("decisions.close") }}</button>
              </span>
            }
          </article>
        } @empty {
          <p class="sub p-5">{{ meeting().status === "tenue" ? t()("decisions.empty") : t()("decisions.notHeld") }}</p>
        }
      </div>
    </section>

    <!-- Ajouter une décision -->
    <ui-modal [open]="addOpen()" [title]="t()('decisions.addTitle')" [description]="t()('decisions.addDescription')" icon="gavel" [width]="620" [closeLabel]="t()('common.close')" (closed)="addOpen.set(false)">
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="sm:col-span-2">
          <label class="lbl" for="decision-text">{{ t()("decisions.field.text") }}</label>
          <textarea id="decision-text" class="area mt-2" [placeholder]="t()('decisions.field.textPh')" [value]="text()" (input)="text.set($any($event.target).value)"></textarea>
          @if (addErrors().text; as textError) {
            <p class="mt-1.5 flex items-center gap-1.5 text-[13px] font-bold" style="color: var(--v2-erreur-fg)" role="alert"><ui-icon name="warning" [size]="16" />{{ textError }}</p>
          }
        </div>
        <ui-text-field [label]="t()('decisions.field.owner')" preset="firstName" [placeholder]="t()('decisions.field.ownerPh')" [value]="owner()" [error]="addErrors().owner ?? ''" (valueChange)="owner.set($event)" />
        <ui-text-field [label]="t()('decisions.field.due')" type="date" icon="calendar_today" [optional]="t()('decisions.optional')" [placeholder]="t()('decisions.field.duePh')" [value]="dueDate()" (valueChange)="dueDate.set($event)" />
      </div>
      <button modal-footer type="button" class="btn btn-ghost" (click)="addOpen.set(false)">{{ t()("common.cancel") }}</button>
      <button modal-footer type="button" class="btn btn-primary" (click)="submitAdd()">{{ t()("decisions.addSubmit") }}<span class="btn-chip"><ui-icon name="check" [size]="18" /></span></button>
    </ui-modal>

    <!-- Clôturer une décision -->
    @if (closing(); as closingDecision) {
      <ui-modal [open]="true" [title]="t()('decisions.closeTitle')" [description]="closingDecision.text" icon="task_alt" [width]="580" [closeLabel]="t()('common.close')" (closed)="closing.set(null)">
        <label class="lbl" for="decision-note">{{ t()("decisions.field.note") }}</label>
        <textarea id="decision-note" class="area mt-2" [placeholder]="t()('decisions.field.notePh')" [value]="note()" (input)="note.set($any($event.target).value)"></textarea>
        @if (noteTried() && note().trim().length < 5) {
          <p class="mt-1.5 flex items-center gap-1.5 text-[13px] font-bold" style="color: var(--v2-erreur-fg)" role="alert"><ui-icon name="warning" [size]="16" />{{ t()("errors.decision.closingNote") }}</p>
        }
        <p class="sub mt-3">{{ t()("decisions.closeLocked") }}</p>
        <button modal-footer type="button" class="btn btn-ghost" (click)="closing.set(null)">{{ t()("common.cancel") }}</button>
        <button modal-footer type="button" class="btn btn-primary" (click)="submitClose(closingDecision)">{{ t()("decisions.closeSubmit") }}<span class="btn-chip"><ui-icon name="check" [size]="18" /></span></button>
      </ui-modal>
    }
  `,
})
export class MeetingDecisionsComponent {
  readonly meeting = input.required<Meeting>();

  private readonly store = inject(StoreService);
  private readonly snackbar = inject(SnackbarService);
  protected readonly locale = inject(LocaleService);
  protected readonly t = this.locale.t;
  protected readonly fmtDate = fmtDate;
  protected readonly statusStyle = STATUS_STYLE;

  protected readonly canManage = computed(() => this.store.can("decision.manage"));
  protected readonly canAdd = computed(() => this.canManage() && this.meeting().status === "tenue");

  /** Ouvertes et en cours d'abord (échéance la plus proche), puis clôturées. */
  protected readonly decisions = computed(() => {
    const rank = (decision: MeetingDecision) => (decision.status === "clôturée" ? 1 : 0);
    return [...this.meeting().decisions].sort(
      (first, second) =>
        rank(first) - rank(second) ||
        (first.dueDate ?? "9999").localeCompare(second.dueDate ?? "9999"),
    );
  });

  protected readonly addOpen = signal(false);
  protected readonly text = signal("");
  protected readonly owner = signal("");
  protected readonly dueDate = signal("");
  private readonly addTried = signal(false);

  protected readonly closing = signal<MeetingDecision | null>(null);
  protected readonly note = signal("");
  protected readonly noteTried = signal(false);

  protected readonly addErrors = computed<AddErrors>(() => {
    if (!this.addTried()) return {};
    const t = this.t();
    const errors: AddErrors = {};
    if (this.text().trim().length < 5) errors.text = t("errors.decision.text");
    if (this.owner().trim().length < 3) errors.owner = t("errors.decision.owner");
    return errors;
  });

  protected isLate(decision: MeetingDecision): boolean {
    return (
      decision.status !== "clôturée" &&
      !!decision.dueDate &&
      decision.dueDate < new Date().toISOString().slice(0, 10)
    );
  }

  protected openAdd(): void {
    this.text.set("");
    this.owner.set("");
    this.dueDate.set("");
    this.addTried.set(false);
    this.addOpen.set(true);
  }

  protected submitAdd(): void {
    this.addTried.set(true);
    if (Object.keys(this.addErrors()).length) return;
    const result = this.store.actions.addMeetingDecision(this.meeting().id, {
      text: this.text(),
      ownerName: this.owner(),
      dueDate: this.dueDate() || null,
    });
    if (!result.ok) {
      this.snackbar.error(result.error);
      return;
    }
    this.snackbar.success(this.locale.tNow("decisions.added"));
    this.addOpen.set(false);
  }

  protected start(decision: MeetingDecision): void {
    const result = this.store.actions.setDecisionStatus(this.meeting().id, decision.id, "en cours");
    if (!result.ok) this.snackbar.error(result.error);
    else this.snackbar.success(this.locale.tNow("decisions.started"));
  }

  protected openClose(decision: MeetingDecision): void {
    this.note.set("");
    this.noteTried.set(false);
    this.closing.set(decision);
  }

  protected submitClose(decision: MeetingDecision): void {
    this.noteTried.set(true);
    if (this.note().trim().length < 5) return;
    const result = this.store.actions.setDecisionStatus(
      this.meeting().id,
      decision.id,
      "clôturée",
      this.note(),
    );
    if (!result.ok) {
      this.snackbar.error(result.error);
      return;
    }
    this.snackbar.success(this.locale.tNow("decisions.closed"));
    this.closing.set(null);
  }
}
