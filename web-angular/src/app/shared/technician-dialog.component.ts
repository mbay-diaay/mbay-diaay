import { Component, computed, effect, inject, input, model, signal, untracked } from "@angular/core";

import type { MessageKey } from "@/lib/i18n";
import { inScope } from "@/lib/scope";

import { LocaleService } from "./locale.service";
import { StoreService } from "./store.service";
import { TechnicianCodeDialogComponent, type TechnicianCodeView } from "./technician-code-dialog.component";
import { CheckListComponent } from "./ui/check-list.component";
import { IconComponent } from "./ui/icon.component";
import { ModalComponent } from "./ui/modal.component";
import { SelectComponent, type SelectOption } from "./ui/select.component";
import { SnackbarService } from "./ui/snackbar.service";
import { TextFieldComponent } from "./ui/text-field.component";

type Mode = "new" | "existing";
type Errors = Partial<Record<"firstName" | "lastName" | "email" | "phone" | "sex" | "age" | "scoops" | "pick", string>>;

/**
 * Ajouter un technicien (charte V2), utilisable depuis n'importe quel écran :
 * - « Nouveau technicien » : identité + e-mail + coopératives → code temporaire (`createTechnician`) ;
 * - « Technicien existant » : choisir un technicien du périmètre, cocher ses coopératives (`setTechnicianScoops`).
 *
 * `<app-technician-dialog [(open)]="techOpen" [scoopId]="id()" />` : `scoopId` pré-coche une coopérative.
 * La liste des coopératives suit le périmètre de la session (l'admin voit tout le réseau).
 */
@Component({
  selector: "app-technician-dialog",
  imports: [CheckListComponent, IconComponent, ModalComponent, SelectComponent, TechnicianCodeDialogComponent, TextFieldComponent],
  styles: `
    .sec {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 24px 0 12px;
      font-size: 14px;
      font-weight: 800;
      color: var(--v2-foret);
    }
    .modes {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
      gap: 8px;
    }
    .mode {
      display: flex;
      align-items: center;
      gap: 10px;
      border-radius: 16px;
      border: 1.5px solid var(--v2-bord-carte);
      background: var(--v2-blanc);
      padding: 12px 14px;
      text-align: left;
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
    }
    .mode:hover {
      border-color: var(--v2-gris-texte);
    }
    .mode.on {
      border: 2px solid var(--v2-foret);
      background: var(--v2-sauge);
      padding: 11.5px 13.5px;
    }
    .mode:focus-visible {
      outline: 2px solid var(--v2-foret);
      outline-offset: 2px;
    }
    .mode .ico {
      display: grid;
      height: 34px;
      width: 34px;
      flex-shrink: 0;
      place-items: center;
      border-radius: 10px;
      background: var(--v2-creme);
      color: var(--v2-foret);
    }
    .mode.on .ico {
      background: var(--v2-foret);
      color: var(--v2-citron);
    }
    .lbl {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--v2-ardoise);
    }
    .field-err {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 6px;
      font-size: 13px;
      font-weight: 700;
      color: var(--v2-erreur-fg);
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
    <ui-modal [open]="open()" [title]="t()('tech.dialog.title')" [description]="t()('tech.dialog.description')" icon="person_add" [width]="680" [closeLabel]="t()('common.close')" (closed)="open.set(false)">
      <div class="pb-6">
        <div class="modes" role="radiogroup" [attr.aria-label]="t()('tech.dialog.mode.aria')">
          <button type="button" role="radio" class="mode" [class.on]="mode() === 'new'" [attr.aria-checked]="mode() === 'new'" (click)="setMode('new')">
            <span class="ico"><ui-icon name="person_add" [size]="18" /></span>{{ t()("tech.dialog.mode.new") }}
          </button>
          <button type="button" role="radio" class="mode" [class.on]="mode() === 'existing'" [attr.aria-checked]="mode() === 'existing'" (click)="setMode('existing')">
            <span class="ico"><ui-icon name="group" [size]="18" /></span>{{ t()("tech.dialog.mode.existing") }}
          </button>
        </div>

        @if (mode() === "new") {
          <h3 class="sec"><ui-icon name="person" [size]="18" />{{ t()("tech.dialog.section.identity") }}</h3>
          <div class="grid gap-5 sm:grid-cols-2">
            <ui-text-field preset="firstName" [label]="t()('tech.dialog.firstName')" [value]="firstName()" [error]="err().firstName ?? ''" (valueChange)="firstName.set($event); clear('firstName')" />
            <ui-text-field preset="lastName" [label]="t()('tech.dialog.lastName')" [value]="lastName()" [error]="err().lastName ?? ''" (valueChange)="lastName.set($event); clear('lastName')" />
            <ui-text-field class="sm:col-span-2" preset="email" [label]="t()('tech.dialog.email')" [optional]="t()('cooperatives.form.regionOptional')" [hint]="t()('tech.dialog.emailHint')" [value]="email()" [error]="err().email ?? ''" (valueChange)="email.set($event); clear('email')" />
            <ui-text-field preset="phone" [label]="t()('tech.dialog.phone')" [value]="phone()" [error]="err().phone ?? ''" (valueChange)="phone.set($event); clear('phone')" />
            <ui-text-field preset="age" [label]="t()('adherents.add.age')" [hint]="t()('tech.dialog.ageHint')" [value]="age()" [error]="err().age ?? ''" (valueChange)="age.set($event); clear('age')" />
            <div class="sm:col-span-2">
              <p class="lbl">{{ t()("adherents.add.sex") }}</p>
              <div class="modes mt-2" role="radiogroup" [attr.aria-label]="t()('adherents.add.sex')">
                <button type="button" role="radio" class="mode" [class.on]="sex() === 'F'" [attr.aria-checked]="sex() === 'F'" (click)="sex.set('F'); clear('sex')">{{ t()("adherents.add.female") }}</button>
                <button type="button" role="radio" class="mode" [class.on]="sex() === 'H'" [attr.aria-checked]="sex() === 'H'" (click)="sex.set('H'); clear('sex')">{{ t()("adherents.add.male") }}</button>
              </div>
              @if (err().sex) {
                <p class="field-err"><ui-icon name="warning" [size]="16" />{{ err().sex }}</p>
              }
            </div>
          </div>
        } @else {
          <h3 class="sec"><ui-icon name="group" [size]="18" />{{ t()("tech.dialog.section.pick") }}</h3>
          @if (techOptions().length) {
            <p class="lbl">{{ t()("tech.dialog.pick") }}</p>
            <ui-select class="mt-2 block" [label]="t()('tech.dialog.pick')" leadingIcon="person" [options]="techOptions()" [value]="pickId()" (valueChange)="pick($event)" />
            @if (err().pick) {
              <p class="field-err"><ui-icon name="warning" [size]="16" />{{ err().pick }}</p>
            } @else {
              <p class="mt-1.5 text-[13px] font-medium" style="color: var(--v2-gris-texte)">{{ t()("tech.dialog.pickHint") }}</p>
            }
          } @else {
            <p class="rounded-[16px] px-4 py-3 text-[13px] font-medium" style="background: var(--v2-creme); color: var(--v2-gris-texte)">{{ t()("tech.dialog.noneExisting") }}</p>
          }
        }

        <ui-check-list class="mt-6" [label]="t()('tech.dialog.section.scoops')" [options]="scoopOptions()" [value]="scoopIds()" [error]="err().scoops ?? ''" (valueChange)="scoopIds.set($event); clear('scoops')" />

        @if (mode() === "new") {
          @if (orgOptions().length) {
            <ui-check-list class="mt-6" [label]="t()('tech.dialog.section.orgs')" [options]="orgOptions()" [value]="orgIds()" (valueChange)="orgIds.set($event)" />
            <p class="mt-1.5 text-[13px] font-medium" style="color: var(--v2-gris-texte)">{{ t()("tech.dialog.orgsHint") }}</p>
          } @else {
            <p class="mt-6 rounded-[16px] px-4 py-3 text-[13px] font-medium" style="background: var(--v2-creme); color: var(--v2-gris-texte)">{{ t()("tech.dialog.orgsNone") }}</p>
          }
        }
      </div>

      <button modal-footer type="button" class="btn btn-ghost" (click)="open.set(false)">{{ t()("producteurs.index.cancel") }}</button>
      <button modal-footer type="button" class="btn btn-primary" (click)="submit()">
        {{ mode() === "new" ? t()("tech.dialog.submitNew") : t()("tech.dialog.submitExisting") }}
        <span class="chip"><ui-icon [name]="mode() === 'new' ? 'mail' : 'check'" [size]="18" /></span>
      </button>
    </ui-modal>
    <app-technician-code-dialog [(view)]="codeView" />
  `,
})
export class TechnicianDialogComponent {
  readonly open = model(false);
  /** Coopérative pré-cochée (fiche coopérative). */
  readonly scoopId = input<string | null>(null);

  private readonly store = inject(StoreService);
  private readonly locale = inject(LocaleService);
  private readonly snackbar = inject(SnackbarService);
  protected readonly t = this.locale.t;

  protected readonly mode = signal<Mode>("new");
  protected readonly firstName = signal("");
  protected readonly lastName = signal("");
  protected readonly email = signal("");
  protected readonly phone = signal("");
  protected readonly age = signal("");
  protected readonly sex = signal<"F" | "H" | "">("");
  protected readonly pickId = signal("");
  protected readonly scoopIds = signal<string[]>([]);
  protected readonly orgIds = signal<string[]>([]);
  protected readonly err = signal<Errors>({});
  /** Code temporaire à remettre, affiché dès la création. */
  protected readonly codeView = signal<TechnicianCodeView | null>(null);

  /** Coopératives du périmètre, hors archivées. */
  protected readonly scoopOptions = computed<SelectOption[]>(() => {
    const s = this.store.state();
    return inScope(
      s.scoops.filter((c) => !c.archived).map((c) => ({ ...c, scoopId: c.id })),
      s.session,
    )
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((c) => ({ value: c.id, label: c.name, ...(c.code ? { hint: c.code } : {}) }));
  });

  /** GIE des coopératives cochées (le technicien peut en suivre quelques-uns, ou aucun = toute la coopérative). */
  protected readonly orgOptions = computed<SelectOption[]>(() => {
    const chosen = this.scoopIds();
    const state = this.store.state();
    return state.orgs
      .filter((org) => chosen.includes(org.scoopId))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((org) => ({
        value: org.id,
        label: org.name,
        ...(chosen.length > 1 ? { hint: state.scoops.find((scoop) => scoop.id === org.scoopId)?.name ?? "" } : {}),
      }));
  });

  /** Techniciens qui couvrent au moins une coopérative du périmètre. */
  private readonly technicians = computed(() => {
    const s = this.store.state();
    const visible = new Set(this.scoopOptions().map((o) => o.value));
    return s.users
      .filter((u) => u.role === "technicien")
      .filter((u) => (u.scoopIds ?? (u.scoopId ? [u.scoopId] : [])).some((id) => visible.has(id)))
      .sort((a, b) => a.name.localeCompare(b.name));
  });

  protected readonly techOptions = computed<SelectOption[]>(() =>
    this.technicians().map((u) => ({
      value: u.id,
      label: u.name,
      icon: "person",
      hint: this.t()("tech.dialog.scoopsCount", { count: (u.scoopIds ?? []).length || 1 }),
    })),
  );

  constructor() {
    effect(() => {
      if (!this.open()) return;
      untracked(() => this.reset());
    });
  }

  private reset(): void {
    const pre = this.scoopId();
    this.mode.set("new");
    this.firstName.set("");
    this.lastName.set("");
    this.email.set("");
    this.phone.set("");
    this.age.set("");
    this.sex.set("");
    this.pickId.set("");
    this.scoopIds.set(pre ? [pre] : []);
    this.orgIds.set([]);
    this.err.set({});
  }

  protected setMode(m: Mode): void {
    this.mode.set(m);
    this.err.set({});
    if (m === "new") this.scoopIds.set(this.scoopId() ? [this.scoopId()!] : []);
    else if (this.pickId()) this.pick(this.pickId());
  }

  /** Choisir un technicien coche ses coopératives actuelles (+ celle de la fiche). */
  protected pick(id: string): void {
    this.pickId.set(id);
    const u = this.technicians().find((x) => x.id === id);
    const current = u?.scoopIds ?? (u?.scoopId ? [u.scoopId] : []);
    const pre = this.scoopId();
    this.scoopIds.set([...new Set([...current, ...(pre ? [pre] : [])])]);
    this.clear("pick");
  }

  protected clear(k: keyof Errors): void {
    this.err.update((e) => {
      const { [k]: _gone, ...rest } = e;
      return rest;
    });
  }

  protected submit(): void {
    const t = this.t();
    const err: Errors = {};
    if (!this.scoopIds().length) err.scoops = t("errors.technician.scoops");
    if (this.mode() === "new") {
      if (!this.firstName().trim()) err.firstName = t("errors.technician.name");
      if (!this.lastName().trim()) err.lastName = t("errors.technician.name");
      if (this.email().trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email().trim())) err.email = t("errors.technician.email");
      if (this.phone().replace(/\D/g, "").length < 9) err.phone = t("errors.technician.phone");
      if (!this.sex()) err.sex = t("errors.technician.sex");
      const ageValue = Number(this.age().trim());
      if (!this.age().trim() || !Number.isInteger(ageValue) || ageValue < 15 || ageValue > 100) err.age = t("errors.technician.age");
    } else if (!this.pickId()) {
      err.pick = t("errors.technician.notFound");
    }
    this.err.set(err);
    if (Object.keys(err).length) return;

    if (this.mode() === "new") {
      const name = `${this.firstName().trim()} ${this.lastName().trim()}`;
      const res = this.store.actions.createTechnician({ name, email: this.email(), phone: this.phone(), sex: this.sex() as "F" | "H", age: Number(this.age().trim()), scoopIds: this.scoopIds(), orgIds: this.orgIds().filter((id) => this.orgOptions().some((option) => option.value === id)) });
      if (!res.ok) {
        // L'e-mail déjà utilisé se signale sous le champ ; le reste en message.
        const msg = this.locale.tNow(res.error as MessageKey);
        if (msg === t("errors.technician.emailTaken")) this.err.set({ email: msg });
        else if (msg === t("errors.technician.phoneTaken")) this.err.set({ phone: msg });
        else this.snackbar.error(msg);
        return;
      }
      this.open.set(false);
      this.codeView.set({ userId: res.userId, name, code: res.code, expiresAt: res.expiresAt, email: this.email().trim() });
      return;
    }

    const u = this.technicians().find((x) => x.id === this.pickId());
    const res = this.store.actions.setTechnicianScoops(this.pickId(), this.scoopIds());
    if (!res.ok) {
      this.snackbar.error(this.locale.tNow(res.error as MessageKey));
      return;
    }
    this.open.set(false);
    this.snackbar.success(t("tech.dialog.saved", { name: u?.name ?? "" }));
  }

}
