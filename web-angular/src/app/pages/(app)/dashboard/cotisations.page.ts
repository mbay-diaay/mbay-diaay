import { Component, computed, inject, signal } from "@angular/core";

import { memberDues, scoopTotals, type DueState, type MemberDues } from "@/lib/contributions";
import { activeMembers } from "@/lib/membership";
import { aggregatorConnected, paymentLinkMessage, paymentLinkUrl } from "@/lib/payment-provider";
import {
  PAYMENT_METHODS,
  type ContributionPayment,
  type PaymentLink,
  type ContributionRule,
  type Member,
  type PaymentMethod,
  type Periodicity,
} from "@/lib/mock/cooperative";
import { inScope, scopedMembers, scopedPayments, scopedRules } from "@/lib/scope";
import { downloadCsv, fmtDate, nf } from "@/lib/format";
import type { MessageKey } from "@/lib/i18n";
import { actions } from "@/lib/store";
import { AppShellComponent } from "@shared/app-shell.component";
import { LocaleService } from "@shared/locale.service";
import { StoreService } from "@shared/store.service";
import { createPager } from "@shared/pager";
import {
  detailFact,
  detailKpi,
  DetailModalComponent,
  IconComponent,
  initialsOf,
  ModalComponent,
  PaginationComponent,
  SelectComponent,
  SnackbarService,
  StatCardsComponent,
  TextFieldComponent,
  TONE,
  V2_PAGE_STYLES,
  type DetailView,
  type SelectOption,
  type StatCard,
} from "@shared/ui";

const STATES: readonly DueState[] = ["à jour", "en retard", "jamais payé", "non exigible"];
const STATE: Record<DueState, { label: MessageKey; bg: string; fg: string }> = {
  "à jour": { label: "cotisations.state.à jour", ...TONE.succes },
  "en retard": { label: "cotisations.state.en retard", ...TONE.erreur },
  "jamais payé": { label: "cotisations.state.jamais payé", ...TONE.attente },
  "non exigible": { label: "cotisations.state.non exigible", ...TONE.neutre },
};
const ALL = "__tous";
const OTHER = "__autre";
/** Date du jour (AAAA-MM-JJ, heure locale). */
const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const norm = (v: string) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

type Row = {
  member: Member;
  name: string;
  scoop: string;
  /** GIE ou organisation du membre ; vide pour un membre individuel. */
  orgId: string;
  orgName: string;
  dues: MemberDues;
  rule: ContributionRule | undefined;
};

const INDIVIDUAL = "__individuel";

/**
 * Cotisations (charte V2) : statistiques de recouvrement, règles par coopérative, filtre par état
 * à compteurs, tableau paginé (barre payé / attendu), détail en modale (périodes dues, reçus)
 * et saisie d'un paiement (droit `contribution.manage`, reçu créé et action tracée par le store).
 */
/** Paiement annulé ou contre-écriture d'une annulation : ni l'un ni l'autre ne compte dans les totaux. */
const isCancelled = (payment: { voided: unknown; reversalOf?: string | null }) =>
  !!payment.voided || !!payment.reversalOf;

@Component({
  selector: "app-cotisations-page",
  imports: [
    AppShellComponent,
    DetailModalComponent,
    IconComponent,
    ModalComponent,
    PaginationComponent,
    SelectComponent,
    StatCardsComponent,
    TextFieldComponent,
  ],
  styles: [
    V2_PAGE_STYLES,
    `
      .meter {
        display: block;
        height: 6px;
        width: 100%;
        overflow: hidden;
        border-radius: 999px;
        background: var(--v2-lin);
      }
      .meter span {
        display: block;
        height: 100%;
        border-radius: 999px;
        transition: width 0.4s cubic-bezier(0.32, 0.72, 0, 1);
      }
      .rules {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 10px;
      }
      .rule {
        border-radius: 18px;
        border: 1px solid var(--v2-bord-carte);
        padding: 14px 16px;
      }
      .tabs {
        width: fit-content;
        max-width: 100%;
      }
      .tabs button {
        padding: 11px 16px;
        font-size: 15px;
      }
      .receipt-no {
        border-radius: 10px;
        background: var(--v2-foret);
        padding: 4px 10px;
        font-family: var(--v2-font-mono);
        font-size: 12px;
        font-weight: 700;
        color: var(--v2-citron);
        white-space: nowrap;
      }
      tr.voided td {
        color: var(--v2-gris-texte);
      }
      tr.voided .receipt-no {
        background: var(--v2-lin);
        color: var(--v2-gris-texte);
        text-decoration: line-through;
      }
      .act-danger:hover {
        border-color: var(--v2-erreur-fg);
        background: var(--v2-erreur-bg);
        color: var(--v2-erreur-fg);
      }
      .rc-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px 20px;
      }
      .rc-grid dt {
        font-size: 12px;
        font-weight: 600;
        color: var(--v2-gris-texte);
      }
      .rc-grid dd {
        margin-top: 2px;
        font-size: 15px;
        font-weight: 800;
      }
      .area {
        width: 100%;
        border-radius: 16px;
        border: 1.5px solid var(--v2-gris-trait);
        background: var(--v2-blanc);
        padding: 12px 16px;
        font-size: 15px;
        font-weight: 600;
        color: var(--v2-encre);
      }
      .area:focus-visible {
        outline: none;
        border: 2px solid var(--v2-foret);
        box-shadow: var(--v2-halo);
      }
      .check {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
      }
      .check input {
        margin-top: 2px;
        height: 20px;
        width: 20px;
        accent-color: var(--v2-foret);
        cursor: pointer;
      }
      .lbl {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--v2-ardoise);
      }
      .seg-form button {
        flex: 1;
        justify-content: center;
      }
    `,
  ],
  template: `
    <app-shell perm="contribution.read" [area]="t()('cotisations.area')">
      <!-- ───── En-tête ───── -->
      <header class="rise flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div class="min-w-0">
          <p class="mono" style="color: var(--v2-gris-texte)">{{ t()("cotisations.eyebrow") }}</p>
          <h1
            class="mt-2 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]"
          >
            {{ t()("cotisations.title") }}
          </h1>
          <p class="mt-2 max-w-2xl text-[16px] font-medium" style="color: var(--v2-gris-texte)">
            {{ t()("cotisations.description") }}
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          @if (canEnroll()) {
            <button type="button" class="btn btn-primary" (click)="openEnroll()">
              {{ t()("cotisations.enroll.open") }}<span class="btn-chip"><ui-icon name="person_add" [size]="20" /></span>
            </button>
          }
          <button
            type="button"
            class="btn btn-ghost"
            [disabled]="!shown().length"
            (click)="exportCsv()"
          >
            <ui-icon name="csv" [size]="22" />{{ t()("cotisations.export") }}
          </button>
        </div>
      </header>

      <!-- ───── Statistiques ───── -->
      <ui-stat-cards class="rise mt-8" [stats]="stats()" />

      <!-- ───── Onglets : adhérents · paiements reçus · règles ───── -->
      <div class="seg tabs mt-6" role="tablist" [attr.aria-label]="t()('cotisations.tab.aria')">
        <button
          type="button"
          role="tab"
          [class.on]="tab() === 'members'"
          [attr.aria-selected]="tab() === 'members'"
          (click)="tab.set('members')"
        >
          <ui-icon name="group" [size]="18" />{{ t()("cotisations.tab.members")
          }}<span class="n">{{ nf.format(rows().length) }}</span>
        </button>
        <button
          type="button"
          role="tab"
          [class.on]="tab() === 'payments'"
          [attr.aria-selected]="tab() === 'payments'"
          (click)="tab.set('payments')"
        >
          <ui-icon name="receipt_long" [size]="18" />{{ t()("cotisations.tab.payments")
          }}<span class="n">{{ nf.format(payments().length) }}</span>
        </button>
        <button
          type="button"
          role="tab"
          [class.on]="tab() === 'rules'"
          [attr.aria-selected]="tab() === 'rules'"
          (click)="tab.set('rules')"
        >
          <ui-icon name="gavel" [size]="18" />{{ t()("cotisations.tab.rules")
          }}<span class="n" [class.zero]="!rules().length">{{ rules().length }}</span>
        </button>
        <button
          type="button"
          role="tab"
          [class.on]="tab() === 'links'"
          [attr.aria-selected]="tab() === 'links'"
          (click)="tab.set('links')"
        >
          <ui-icon name="link" [size]="18" />{{ t()("cotisations.tab.links")
          }}<span class="n" [class.zero]="!linkRows().length">{{ linkRows().length }}</span>
        </button>
      </div>

      @if (tab() === "links") {
        <p class="notice mt-6">
          <ui-icon name="info" [size]="18" />{{ t()(aggregator ? "cotisations.links.aggregatorOn" : "cotisations.links.aggregatorOff") }}
        </p>
        <section class="card mt-4 overflow-hidden">
          @if (linkRows().length) {
            <div class="overflow-x-auto">
              <table class="tbl min-w-[860px]">
                <thead>
                  <tr>
                    <th>{{ t()("cotisations.col.member") }}</th>
                    <th>{{ t()("cotisations.links.col.period") }}</th>
                    <th class="text-right">{{ t()("cotisations.links.col.amount") }}</th>
                    <th>{{ t()("cotisations.links.col.status") }}</th>
                    <th>{{ t()("cotisations.links.col.expires") }}</th>
                    <th class="text-right">{{ t()("cotisations.row.actions") }}</th>
                  </tr>
                </thead>
                <tbody>
                  @for (row of linkRows(); track row.link.id) {
                    <tr>
                      <td class="font-bold">{{ row.name }}</td>
                      <td class="tabular-nums">{{ row.link.period }}</td>
                      <td class="text-right font-extrabold tabular-nums">{{ nf.format(row.link.amount) }} FCFA</td>
                      <td>
                        <span class="badge" [style.background]="row.tone.bg" [style.color]="row.tone.fg">{{ t()(row.statusKey) }}</span>
                      </td>
                      <td class="tabular-nums">{{ fmtDate(row.link.expiresAt) }}</td>
                      <td>
                        <span class="flex justify-end gap-2">
                          @if (row.live) {
                            <button type="button" class="act" [title]="t()('cotisations.link.copy')" [attr.aria-label]="t()('cotisations.link.copy') + ' · ' + row.name" (click)="openLink(row.link)"><ui-icon name="content_copy" [size]="18" /></button>
                            @if (canManage()) {
                              <button type="button" class="act act-danger" [title]="t()('cotisations.link.cancel')" [attr.aria-label]="t()('cotisations.link.cancel') + ' · ' + row.name" (click)="cancelLink(row.link)"><ui-icon name="close" [size]="18" /></button>
                            }
                          }
                        </span>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          } @else {
            <div class="flex flex-col items-center gap-3 p-10 text-center">
              <span class="grid size-14 place-items-center rounded-[16px]" style="background: var(--v2-sauge); color: var(--v2-foret)"><ui-icon name="link" [size]="26" /></span>
              <p class="text-[16px] font-extrabold">{{ t()("cotisations.links.empty.title") }}</p>
              <p class="sub max-w-md">{{ t()("cotisations.links.empty.text") }}</p>
            </div>
          }
        </section>
      }

      @if (tab() === "members") {
        <!-- ───── Recherche · état ───── -->
        <div class="toolbar card mt-6">
          <label class="search">
            <ui-icon name="search" [size]="20" />
            <input
              type="search"
              [placeholder]="t()('cotisations.search.placeholder')"
              [attr.aria-label]="t()('cotisations.search.aria')"
              [value]="q()"
              (input)="q.set($any($event.target).value)"
            />
          </label>
          <div class="seg" role="radiogroup" [attr.aria-label]="t()('cotisations.filter.aria')">
            @for (stateButton of stateButtons(); track stateButton.id) {
              <button
                type="button"
                role="radio"
                [class.on]="state() === stateButton.id"
                [attr.aria-checked]="state() === stateButton.id"
                (click)="state.set(stateButton.id)"
              >
                {{ stateButton.label
                }}<span class="n" [class.zero]="!stateButton.count">{{
                  nf.format(stateButton.count)
                }}</span>
              </button>
            }
          </div>
          @if (orgFilterOptions().length > 2) {
            <ui-select class="min-w-[220px]" [label]="t()('cotisations.filter.org')" leadingIcon="hub" [options]="orgFilterOptions()" [value]="orgFilter()" (valueChange)="orgFilter.set($event)" />
          }
        </div>

        <p class="sub mt-4" aria-live="polite">
          {{
            t()(shown().length > 1 ? "cotisations.count.autre" : "cotisations.count.un", {
              shown: nf.format(shown().length),
              total: nf.format(rows().length),
            })
          }}
        </p>

        <!-- ───── Liste ───── -->
        <section class="card mt-3 overflow-hidden">
          @if (shown().length) {
            <div class="overflow-x-auto">
              <table class="tbl min-w-[980px]">
                <thead>
                  <tr>
                    <th>{{ t()("cotisations.col.member") }}</th>
                    <th>{{ t()("cotisations.col.scoop") }}</th>
                    <th>{{ t()("cotisations.col.org") }}</th>
                    <th>{{ t()("cotisations.col.state") }}</th>
                    <th class="w-[220px]">{{ t()("cotisations.col.paid") }}</th>
                    <th class="text-right">{{ t()("cotisations.col.balance") }}</th>
                    <th class="text-right">{{ t()("cotisations.row.actions") }}</th>
                  </tr>
                </thead>
                <tbody>
                  @for (row of pager.items(); track row.member.id) {
                    <tr class="row-link" (click)="detailId.set(row.member.id)">
                      <td>
                        <span class="flex items-center gap-3">
                          <span
                            class="avatar"
                            [style.background]="state_[row.dues.state].bg"
                            [style.color]="state_[row.dues.state].fg"
                            >{{ initials(row.name) }}</span
                          >
                          <span class="min-w-0">
                            <span class="block truncate font-bold">{{ row.name }}</span>
                            <span
                              class="sub block truncate tabular-nums"
                              [class.zero]="!row.member.phone"
                              >{{ store.phone(row.member.phone) || "—" }}</span
                            >
                          </span>
                        </span>
                      </td>
                      <td class="max-w-48 truncate font-medium" [title]="row.scoop">
                        {{ row.scoop }}
                      </td>
                      <td class="max-w-48 truncate font-medium" [class.zero]="!row.orgName" [title]="row.orgName">
                        {{ row.orgName || t()("cotisations.filter.individual") }}
                      </td>
                      <td>
                        <span
                          class="badge"
                          [style.background]="state_[row.dues.state].bg"
                          [style.color]="state_[row.dues.state].fg"
                          >{{ t()(state_[row.dues.state].label) }}</span
                        >
                      </td>
                      <td>
                        @if (row.dues.expected) {
                          <span class="block text-[13px] font-bold tabular-nums">{{
                            t()("cotisations.row.paidOf", {
                              paid: nf.format(row.dues.paid),
                              expected: nf.format(row.dues.expected),
                            })
                          }}</span>
                          <span class="meter mt-1.5" aria-hidden="true">
                            <span
                              [style.width.%]="pct(row.dues)"
                              [style.background]="
                                row.dues.balance ? 'var(--v2-soleil)' : 'var(--v2-vert-pousse)'
                              "
                            ></span>
                          </span>
                        } @else {
                          <span class="sub">{{ t()("cotisations.row.nothingDue") }}</span>
                        }
                      </td>
                      <td
                        class="whitespace-nowrap text-right font-extrabold tabular-nums"
                        [class.zero]="!row.dues.balance"
                        [style.color]="row.dues.balance ? 'var(--v2-erreur-fg)' : null"
                      >
                        {{ nf.format(row.dues.balance) }} FCFA
                      </td>
                      <td>
                        <span class="flex justify-end gap-2">
                          @if (canManage() && row.rule) {
                            <button
                              type="button"
                              class="act"
                              [title]="t()('cotisations.row.pay')"
                              [attr.aria-label]="t()('cotisations.row.payFor', { name: row.name })"
                              (click)="$event.stopPropagation(); openPay(row.member.id)"
                            >
                              <ui-icon name="payments" [size]="18" />
                            </button>
                          }
                          <button
                            type="button"
                            class="act"
                            [title]="t()('common.view')"
                            [attr.aria-label]="t()('cotisations.row.view', { name: row.name })"
                            (click)="$event.stopPropagation(); detailId.set(row.member.id)"
                          >
                            <ui-icon name="visibility" [size]="18" />
                          </button>
                        </span>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
            <ui-pagination class="px-5 pb-5" [pager]="pager" />
          } @else {
            <div class="flex flex-col items-center gap-3 p-10 text-center">
              <span
                class="grid size-14 place-items-center rounded-[16px]"
                style="background: var(--v2-sauge); color: var(--v2-foret)"
                ><ui-icon name="account_balance_wallet" [size]="26"
              /></span>
              @if (rows().length) {
                <p class="text-[16px] font-extrabold">
                  {{ t()("cotisations.empty.filtered.title") }}
                </p>
                <p class="sub max-w-md">{{ t()("cotisations.empty.filtered.text") }}</p>
              } @else {
                <p class="text-[16px] font-extrabold">
                  {{ t()("cotisations.empty.noMembers.title") }}
                </p>
                <p class="sub max-w-md">{{ t()("cotisations.empty.noMembers.text") }}</p>
              }
            </div>
          }
        </section>
      }

      <!-- ───── Paiements reçus (journal des reçus) ───── -->
      @if (tab() === "payments") {
        <div class="toolbar card mt-4">
          <label class="search">
            <ui-icon name="search" [size]="20" />
            <input
              type="search"
              [placeholder]="t()('cotisations.journal.search')"
              [attr.aria-label]="t()('cotisations.journal.search')"
              [value]="pq()"
              (input)="pq.set($any($event.target).value)"
            />
          </label>
          <ui-select
            class="min-w-[200px]"
            variant="compact"
            leadingIcon="payments"
            [label]="t()('cotisations.journal.col.method')"
            [options]="methodOptions()"
            [value]="pMethod()"
            (valueChange)="pMethod.set($event)"
          />
          <div
            class="seg"
            role="radiogroup"
            [attr.aria-label]="t()('cotisations.journal.col.receipt')"
          >
            @for (statusButton of payStatusButtons(); track statusButton.id) {
              <button
                type="button"
                role="radio"
                [class.on]="pStatus() === statusButton.id"
                [attr.aria-checked]="pStatus() === statusButton.id"
                (click)="pStatus.set(statusButton.id)"
              >
                {{ statusButton.label
                }}<span class="n" [class.zero]="!statusButton.count">{{
                  nf.format(statusButton.count)
                }}</span>
              </button>
            }
          </div>
        </div>
        <p class="sub mt-4" aria-live="polite">
          {{
            t()("cotisations.journal.total", {
              count: nf.format(journalTotals().count),
              amount: nf.format(journalTotals().amount),
            })
          }}
        </p>
        <section class="card mt-3 overflow-hidden">
          @if (journal().length) {
            <div class="overflow-x-auto">
              <table class="tbl min-w-[920px]">
                <thead>
                  <tr>
                    <th>{{ t()("cotisations.journal.col.date") }}</th>
                    <th>{{ t()("cotisations.journal.col.receipt") }}</th>
                    <th>{{ t()("cotisations.journal.col.member") }}</th>
                    <th>{{ t()("cotisations.journal.col.period") }}</th>
                    <th class="text-right">{{ t()("cotisations.journal.col.amount") }}</th>
                    <th>{{ t()("cotisations.journal.col.method") }}</th>
                    <th>{{ t()("cotisations.journal.col.by") }}</th>
                    <th class="text-right">{{ t()("cotisations.row.actions") }}</th>
                  </tr>
                </thead>
                <tbody>
                  @for (payment of journalPager.items(); track payment.id) {
                    <tr
                      class="row-link"
                      [class.voided]="!!payment.voided || !!payment.reversalOf"
                      (click)="receiptId.set(payment.id)"
                    >
                      <td class="whitespace-nowrap font-medium tabular-nums">
                        {{ fmtDate(payment.paidAt) }}
                      </td>
                      <td>
                        <span class="receipt-no">{{ payment.receipt }}</span>
                      </td>
                      <td>
                        <span class="block max-w-52 truncate font-bold">{{
                          memberName(payment.memberId)
                        }}</span>
                        <span class="sub block max-w-52 truncate">{{
                          scoopName(payment.scoopId)
                        }}</span>
                      </td>
                      <td class="font-semibold tabular-nums">{{ payment.period }}</td>
                      <td class="whitespace-nowrap text-right font-extrabold tabular-nums">
                        @if (payment.reversalOf) {
                          <span class="block">{{ nf.format(payment.amount) }} FCFA</span>
                          <span
                            class="badge"
                            style="background: var(--v2-attente-bg); color: var(--v2-attente-fg)"
                            >{{ t()("cotisations.journal.reversalTag") }}</span
                          >
                        } @else if (payment.voided) {
                          <span
                            class="badge"
                            style="background: var(--v2-lin); color: var(--v2-gris-texte)"
                            >{{ t()("cotisations.sheet.history.voidTag") }}</span
                          >
                        } @else {
                          {{ nf.format(payment.amount) }} FCFA
                        }
                      </td>
                      <td>
                        <span
                          class="badge"
                          style="background: var(--v2-creme); color: var(--v2-ardoise)"
                          >{{ t()(methodKey(payment.method)) }}</span
                        >
                      </td>
                      <td class="font-medium">{{ payment.recordedBy }}</td>
                      <td>
                        <span class="flex justify-end gap-2">
                          @if (canManage() && !payment.voided && !payment.reversalOf) {
                            <button
                              type="button"
                              class="act act-danger"
                              [title]="t()('cotisations.row.void')"
                              [attr.aria-label]="
                                t()('cotisations.journal.void', { receipt: payment.receipt })
                              "
                              (click)="$event.stopPropagation(); openVoid(payment.id)"
                            >
                              <ui-icon name="close" [size]="18" />
                            </button>
                          }
                          <button
                            type="button"
                            class="act"
                            [title]="t()('cotisations.receipt.title')"
                            [attr.aria-label]="
                              t()('cotisations.receipt.view', { receipt: payment.receipt })
                            "
                            (click)="$event.stopPropagation(); receiptId.set(payment.id)"
                          >
                            <ui-icon name="receipt_long" [size]="18" />
                          </button>
                        </span>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
            <ui-pagination class="px-5 pb-5" [pager]="journalPager" />
          } @else {
            <div class="flex flex-col items-center gap-3 p-10 text-center">
              <span
                class="grid size-14 place-items-center rounded-[16px]"
                style="background: var(--v2-sauge); color: var(--v2-foret)"
                ><ui-icon name="receipt_long" [size]="26"
              /></span>
              <p class="text-[16px] font-extrabold">{{ t()("cotisations.journal.empty") }}</p>
            </div>
          }
        </section>
      }

      <!-- ───── Règles par coopérative ───── -->
      @if (tab() === "rules") {
        @if (rules().length) {
          <div class="rules mt-4">
            @for (ruleRow of rules(); track ruleRow.scoopId) {
              <div class="rule card">
                <div class="flex items-start gap-3">
                  <span
                    class="grid size-10 shrink-0 place-items-center rounded-[12px]"
                    [style.background]="ruleRow.summary ? 'var(--v2-foret)' : 'var(--v2-erreur-bg)'"
                    [style.color]="ruleRow.summary ? 'var(--v2-citron)' : 'var(--v2-erreur-fg)'"
                  >
                    <ui-icon name="gavel" [size]="20" />
                  </span>
                  <div class="min-w-0 flex-1">
                    <p class="truncate text-[15px] font-extrabold" [title]="ruleRow.scoop">
                      {{ ruleRow.scoop }}
                    </p>
                    @if (ruleRow.summary) {
                      <p class="mt-1 text-[13px] font-semibold" style="color: var(--v2-ardoise)">
                        {{ ruleRow.summary }}
                      </p>
                      <p class="sub mt-0.5">
                        {{ t()("cotisations.rule.since", { year: ruleRow.startYear ?? "" }) }}
                      </p>
                    }
                  </div>
                </div>
                <div class="mt-4 flex flex-wrap items-center justify-between gap-2">
                  @if (ruleRow.summary) {
                    <span
                      class="badge"
                      [style.background]="
                        ruleRow.confirmed ? 'var(--v2-sauge)' : 'var(--v2-attente-bg)'
                      "
                      [style.color]="
                        ruleRow.confirmed ? 'var(--v2-vert-pousse)' : 'var(--v2-attente-fg)'
                      "
                    >
                      {{
                        ruleRow.confirmed
                          ? t()("cotisations.rule.confirmed")
                          : t()("cotisations.rule.toConfirm")
                      }}
                    </span>
                  } @else {
                    <span
                      class="badge"
                      style="background: var(--v2-erreur-bg); color: var(--v2-erreur-fg)"
                      >{{ t()("cotisations.rules.missing") }}</span
                    >
                  }
                  @if (canManage()) {
                    <button
                      type="button"
                      class="btn btn-ghost"
                      style="height: 40px"
                      (click)="openRule(ruleRow.scoopId)"
                    >
                      <ui-icon name="edit" [size]="18" />{{
                        ruleRow.summary
                          ? t()("cotisations.rule.edit")
                          : t()("cotisations.rule.define")
                      }}
                    </button>
                  }
                </div>
              </div>
            }
          </div>
        } @else {
          <p class="card sub mt-4 p-6">{{ t()("cotisations.rules.none") }}</p>
        }
      }

      <!-- ───── Détail ───── -->
      <ui-detail-modal [view]="detail()" (closed)="detailId.set(null)" />

      <!-- ───── Enregistrer un paiement ───── -->
      @if (payFor(); as payTarget) {
        <ui-modal
          [open]="true"
          [title]="t()('cotisations.payDialog.title')"
          [description]="t()('cotisations.payDialog.description', { name: payTarget.name })"
          icon="payments"
          [width]="560"
          [closeLabel]="t()('common.close')"
          (closed)="payId.set(null)"
        >
          <div class="grid gap-4 pb-4">
            <div>
              <p class="lbl">{{ t()("cotisations.payDialog.period") }}</p>
              <ui-select
                class="mt-2 block"
                [label]="t()('cotisations.payDialog.period')"
                leadingIcon="calendar_today"
                [options]="periodOptions()"
                [value]="payPeriod()"
                (valueChange)="choosePeriod($event)"
              />
            </div>
            @if (payPeriod() === other) {
              <ui-text-field
                preset="period"
                [placeholder]="
                  payTarget.rule?.periodicity === 'mensuelle' ? t()('ui.field.ph.month') : ''
                "
                [label]="t()('cotisations.payDialog.otherLabel')"
                [hint]="
                  t()(
                    payTarget.rule?.periodicity === 'mensuelle'
                      ? 'cotisations.payDialog.otherHint.mensuelle'
                      : 'cotisations.payDialog.otherHint.annuelle'
                  )
                "
                [value]="payOther()"
                (valueChange)="payOther.set($event)"
              />
            }
            <ui-text-field
              preset="amount"
              [label]="t()('cotisations.payDialog.amount')"
              [hint]="t()('cotisations.payDialog.amountHint')"
              [value]="payAmount()"
              [error]="payError()"
              (valueChange)="payAmount.set($event); payError.set('')"
            />
            <div>
              <p class="lbl">{{ t()("cotisations.payDialog.method") }}</p>
              <div
                class="seg seg-form mt-2"
                role="radiogroup"
                [attr.aria-label]="t()('cotisations.payDialog.method')"
              >
                @for (method of methods; track method) {
                  <button
                    type="button"
                    role="radio"
                    [class.on]="payMethod() === method"
                    [attr.aria-checked]="payMethod() === method"
                    (click)="payMethod.set(method)"
                  >
                    {{ t()(methodKey(method)) }}
                  </button>
                }
              </div>
            </div>
            @if (payMethod() !== "espèces") {
              <ui-text-field
                icon="receipt_long"
                [label]="t()('cotisations.payDialog.reference')"
                [optional]="t()('cotisations.optional')"
                [hint]="t()('cotisations.payDialog.referenceHint')"
                [value]="payReference()"
                (valueChange)="payReference.set($event)"
              />
            }
            <ui-text-field
              type="date"
              icon="calendar_today"
              [label]="t()('cotisations.payDialog.date')"
              [hint]="t()('cotisations.payDialog.dateHint')"
              [value]="payDate()"
              (valueChange)="payDate.set($event)"
            />
            <ui-text-field
              preset="note"
              [label]="t()('cotisations.payDialog.note')"
              [value]="payNote()"
              (valueChange)="payNote.set($event)"
            />
            <p class="sub flex items-center gap-2">
              <ui-icon name="fact_check" [size]="16" />{{ t()("cotisations.payDialog.footer") }}
            </p>
          </div>
          <button modal-footer type="button" class="btn btn-ghost" (click)="payId.set(null)">
            {{ t()("cotisations.cancel") }}
          </button>
          <button modal-footer type="button" class="btn btn-ghost" (click)="submitLink()">
            <ui-icon name="link" [size]="18" />{{ t()("cotisations.payDialog.createLink") }}
          </button>
          <button modal-footer type="button" class="btn btn-primary" (click)="submitPay()">
            {{ t()("cotisations.payDialog.submit") }}
            <span class="btn-chip"><ui-icon name="check" [size]="18" /></span>
          </button>
        </ui-modal>
      }

      <!-- ───── Lien de paiement : copier, envoyer ───── -->
      @if (sharedLink(); as shared) {
        <ui-modal
          [open]="true"
          [title]="t()('cotisations.link.title', { name: shared.name })"
          [description]="t()('cotisations.link.description')"
          icon="link"
          tone="brand"
          [width]="600"
          [closeLabel]="t()('common.close')"
          (closed)="linkShown.set(null)"
        >
          <div class="space-y-4 pb-6">
            <dl class="rc-grid">
              <div><dt>{{ t()("cotisations.links.col.period") }}</dt><dd>{{ shared.link.period }}</dd></div>
              <div><dt>{{ t()("cotisations.links.col.amount") }}</dt><dd>{{ nf.format(shared.link.amount) }} FCFA</dd></div>
              <div><dt>{{ t()("cotisations.links.col.expires") }}</dt><dd>{{ fmtDate(shared.link.expiresAt) }}</dd></div>
            </dl>
            <p class="break-all rounded-[14px] px-4 py-3 text-[14px] font-bold" style="background: var(--v2-sauge); color: var(--v2-foret); user-select: all">{{ shared.url }}</p>
            <div class="grid gap-3 sm:grid-cols-2">
              <button type="button" class="btn btn-primary justify-center" (click)="copyLink(shared.url)">
                <ui-icon name="content_copy" [size]="18" />{{ linkCopied() ? t()("cotisations.link.copied") : t()("cotisations.link.copy") }}
              </button>
              <button type="button" class="btn btn-ghost justify-center" (click)="copyLink(shared.message)">
                <ui-icon name="description" [size]="18" />{{ t()("cotisations.link.copyMessage") }}
              </button>
              <a class="btn btn-ghost justify-center" [href]="shared.whatsapp" target="_blank" rel="noopener noreferrer"><ui-icon name="public" [size]="18" />{{ t()("cotisations.link.whatsapp") }}</a>
              <a class="btn btn-ghost justify-center" [href]="shared.sms"><ui-icon name="call" [size]="18" />{{ t()("cotisations.link.sms") }}</a>
              @if (shared.mail) {
                <a class="btn btn-ghost justify-center sm:col-span-2" [href]="shared.mail"><ui-icon name="mail" [size]="18" />{{ t()("cotisations.link.email") }}</a>
              }
            </div>
            <p class="notice"><ui-icon name="info" [size]="18" />{{ t()(aggregator ? "cotisations.links.aggregatorOn" : "cotisations.links.aggregatorOff") }}</p>
          </div>
          <button modal-footer type="button" class="btn btn-primary" (click)="linkShown.set(null)">
            {{ t()("cotisations.link.done") }}<span class="btn-chip"><ui-icon name="check" [size]="18" /></span>
          </button>
        </ui-modal>
      }

      <!-- ───── Inscrire un producteur comme membre cotisant ───── -->
      <ui-modal
        [open]="enrollOpen()"
        [title]="t()('cotisations.enroll.title')"
        [description]="t()('cotisations.enroll.description')"
        icon="person_add"
        [width]="640"
        [closeLabel]="t()('common.close')"
        (closed)="enrollOpen.set(false)"
      >
        <div class="space-y-4 pb-6">
          @if (enrollScoops().length > 1) {
            <ui-select [label]="t()('documents.add.scoop')" leadingIcon="apartment" [options]="enrollScoops()" [value]="enrollScoop()" (valueChange)="enrollScoop.set($event); enrollPick.set('')" />
          }
          <ui-text-field icon="search" [label]="t()('cotisations.enroll.search')" [value]="enrollQuery()" (valueChange)="enrollQuery.set($event)" />
          @if (enrollCandidates().length) {
            <ul class="people" [attr.aria-label]="t()('cotisations.enroll.listAria')">
              @for (candidate of enrollCandidates(); track candidate.id) {
                <li>
                  <label class="person">
                    <input type="radio" name="enroll" [checked]="enrollPick() === candidate.id" (change)="enrollPick.set(candidate.id)" />
                    <span class="min-w-0 flex-1 truncate">{{ candidate.firstName }} {{ candidate.lastName }}</span>
                    <span class="sub shrink-0">{{ candidate.orgName || t()("cotisations.filter.individual") }}</span>
                  </label>
                </li>
              }
            </ul>
          } @else {
            <p class="rounded-[16px] px-4 py-3 text-[13px] font-medium" style="background: var(--v2-creme); color: var(--v2-gris-texte)">{{ t()("cotisations.enroll.none") }}</p>
          }
          <p class="sub">{{ t()("cotisations.enroll.rule") }}</p>
        </div>
        <button modal-footer type="button" class="btn btn-ghost" (click)="enrollOpen.set(false)">{{ t()("cotisations.cancel") }}</button>
        <button modal-footer type="button" class="btn btn-primary" [disabled]="!enrollPick()" (click)="submitEnroll()">
          {{ t()("cotisations.enroll.submit") }}<span class="btn-chip"><ui-icon name="check" [size]="18" /></span>
        </button>
      </ui-modal>

      <!-- ───── Reçu (remis au membre : imprimer ou enregistrer en PDF) ───── -->
      @if (receipt(); as receiptView) {
        <ui-modal
          [open]="true"
          [title]="t()('cotisations.receipt.title')"
          [description]="t()('cotisations.receipt.number', { receipt: receiptView.p.receipt })"
          icon="receipt_long"
          [width]="560"
          [closeLabel]="t()('common.close')"
          (closed)="receiptId.set(null)"
        >
          <div class="receipt" [class.is-void]="!!receiptView.p.voided">
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="mono" style="color: var(--v2-gris-texte)">
                  {{ t()("cotisations.receipt.coop") }}
                </p>
                <p class="text-[16px] font-extrabold">{{ receiptView.scoop }}</p>
              </div>
              <span class="receipt-no">{{ receiptView.p.receipt }}</span>
            </div>
            <div
              class="mt-5 rounded-[18px] p-5 text-center"
              [style.background]="receiptView.p.voided ? 'var(--v2-lin)' : 'var(--v2-sauge)'"
            >
              <p class="mono" style="color: var(--v2-gris-texte)">
                {{ t()("cotisations.receipt.amount") }}
              </p>
              <p
                class="mt-1 text-[36px] font-extrabold leading-none tracking-[-0.03em] tabular-nums"
                [style.color]="
                  receiptView.p.voided ? 'var(--v2-gris-texte)' : 'var(--v2-vert-pousse)'
                "
                [style.text-decoration]="receiptView.p.voided ? 'line-through' : null"
              >
                {{ nf.format(receiptView.p.amount) }} FCFA
              </p>
            </div>
            <dl class="rc-grid mt-5">
              <div>
                <dt>{{ t()("cotisations.receipt.from") }}</dt>
                <dd>{{ receiptView.member }}</dd>
              </div>
              <div>
                <dt>{{ t()("cotisations.receipt.period") }}</dt>
                <dd>{{ receiptView.p.period }}</dd>
              </div>
              <div>
                <dt>{{ t()("cotisations.receipt.date") }}</dt>
                <dd>{{ fmtDate(receiptView.p.paidAt) }}</dd>
              </div>
              <div>
                <dt>{{ t()("cotisations.receipt.method") }}</dt>
                <dd>{{ t()(methodKey(receiptView.p.method)) }}</dd>
              </div>
              <div>
                <dt>{{ t()("cotisations.receipt.by") }}</dt>
                <dd>{{ receiptView.p.recordedBy }}</dd>
              </div>
              @if (receiptView.p.reference) {
                <div>
                  <dt>{{ t()("cotisations.receipt.reference") }}</dt>
                  <dd>{{ receiptView.p.reference }}</dd>
                </div>
              }
              @if (receiptView.p.note) {
                <div>
                  <dt>{{ t()("cotisations.receipt.note") }}</dt>
                  <dd>{{ receiptView.p.note }}</dd>
                </div>
              }
            </dl>
            @if (receiptView.p.voided; as voidInfo) {
              <p
                class="mt-4 rounded-[14px] px-4 py-3 text-[13px] font-bold"
                style="background: var(--v2-erreur-bg); color: var(--v2-erreur-fg)"
              >
                {{
                  t()("cotisations.receipt.voided", {
                    date: fmtDate(voidInfo.at),
                    name: voidInfo.by,
                  })
                }}
                · {{ t()("cotisations.sheet.history.reason", { reason: voidInfo.reason }) }}
              </p>
            }
            <p
              class="sub mt-5 border-t pt-4 text-center"
              style="border-color: var(--v2-separateur)"
            >
              {{ t()("cotisations.receipt.footer") }}
            </p>
          </div>
          <div class="h-4" aria-hidden="true"></div>
          @if (canManage() && !receiptView.p.voided) {
            <button
              modal-footer
              type="button"
              class="btn btn-ghost"
              style="color: var(--v2-erreur-fg)"
              (click)="openVoid(receiptView.p.id)"
            >
              {{ t()("cotisations.sheet.void") }}
            </button>
          }
          <button
            modal-footer
            type="button"
            class="btn btn-primary"
            (click)="printReceipt(receiptView)"
          >
            {{ t()("cotisations.receipt.print") }}
            <span class="btn-chip"><ui-icon name="download" [size]="18" /></span>
          </button>
        </ui-modal>
      }

      <!-- ───── Annuler un paiement (le reçu reste, barré) ───── -->
      @if (voidPay(); as paymentToVoid) {
        <ui-modal
          tone="danger"
          [open]="true"
          [title]="t()('cotisations.voidDialog.title')"
          [description]="t()('cotisations.voidDialog.description')"
          icon="close"
          [width]="540"
          [closeLabel]="t()('common.close')"
          (closed)="voidId.set(null)"
        >
          <p
            class="mb-4 rounded-[16px] px-4 py-3 text-[14px] font-bold"
            style="background: var(--v2-creme)"
          >
            {{
              t()("cotisations.voidDialog.option", {
                receipt: paymentToVoid.receipt,
                amount: nf.format(paymentToVoid.amount),
                period: paymentToVoid.period,
              })
            }}
            · {{ memberName(paymentToVoid.memberId) }}
          </p>
          <label class="lbl" for="void-reason">{{ t()("cotisations.voidDialog.reason") }}</label>
          <textarea
            id="void-reason"
            class="area mt-2"
            rows="3"
            [placeholder]="t()('cotisations.voidDialog.reasonHint')"
            [value]="voidReason()"
            (input)="voidReason.set($any($event.target).value)"
          ></textarea>
          <p class="sub mb-4 mt-1.5">{{ t()("cotisations.voidDialog.reasonHint") }}</p>
          <button modal-footer type="button" class="btn btn-ghost" (click)="voidId.set(null)">
            {{ t()("cotisations.voidDialog.back") }}
          </button>
          <button
            modal-footer
            type="button"
            class="btn"
            style="background: var(--v2-erreur-fg); color: var(--v2-blanc)"
            [disabled]="voidReason().trim().length < 3"
            (click)="submitVoid(paymentToVoid.id)"
          >
            {{ t()("cotisations.voidDialog.submit") }}
          </button>
        </ui-modal>
      }

      <!-- ───── Règle de cotisation ───── -->
      @if (ruleScoop(); as ruleTarget) {
        <ui-modal
          [open]="true"
          [title]="t()('cotisations.ruleDialog.titleScoop', { scoop: ruleTarget.name })"
          [description]="t()('cotisations.ruleDialog.description')"
          icon="gavel"
          [width]="600"
          [closeLabel]="t()('common.close')"
          (closed)="ruleFor.set(null)"
        >
          <div class="grid gap-5 pb-5">
            <ui-text-field
              preset="amount"
              [label]="t()('cotisations.ruleDialog.amount')"
              [hint]="t()('cotisations.ruleDialog.amountHint')"
              [value]="rAmount()"
              [error]="rErr().amount ?? ''"
              (valueChange)="rAmount.set($event)"
            />
            <div>
              <p class="lbl">{{ t()("cotisations.ruleDialog.periodicity") }}</p>
              <div
                class="seg seg-form mt-2"
                role="radiogroup"
                [attr.aria-label]="t()('cotisations.ruleDialog.periodicity')"
              >
                <button
                  type="button"
                  role="radio"
                  [class.on]="rPeriodicity() === 'annuelle'"
                  [attr.aria-checked]="rPeriodicity() === 'annuelle'"
                  (click)="rPeriodicity.set('annuelle')"
                >
                  {{ t()("cotisations.periodicity.annuelle") }}
                </button>
                <button
                  type="button"
                  role="radio"
                  [class.on]="rPeriodicity() === 'mensuelle'"
                  [attr.aria-checked]="rPeriodicity() === 'mensuelle'"
                  (click)="rPeriodicity.set('mensuelle')"
                >
                  {{ t()("cotisations.periodicity.mensuelle") }}
                </button>
              </div>
            </div>
            @if (rPeriodicity() === "annuelle") {
              <div>
                <p class="lbl">{{ t()("cotisations.ruleDialog.dueDate") }}</p>
                <div class="mt-2 grid gap-3 sm:grid-cols-[1fr_140px]">
                  <ui-select
                    [label]="t()('cotisations.ruleDialog.dueMonth')"
                    leadingIcon="calendar_month"
                    [options]="monthOptions()"
                    [value]="rMonth()"
                    (valueChange)="rMonth.set($event)"
                  />
                  <ui-text-field
                    [label]="t()('cotisations.ruleDialog.dueDay')"
                    type="number"
                    inputmode="numeric"
                    [maxlength]="2"
                    placeholder="31"
                    [value]="rDay()"
                    [error]="rErr().day ?? ''"
                    (valueChange)="rDay.set($event)"
                  />
                </div>
                <p class="sub mt-1.5">{{ t()("cotisations.ruleDialog.dueHint") }}</p>
              </div>
            } @else {
              <p class="sub rounded-[14px] px-4 py-3" style="background: var(--v2-creme)">
                {{ t()("cotisations.ruleDialog.monthlyHint") }}
              </p>
            }
            <ui-text-field
              preset="period"
              [label]="t()('cotisations.ruleDialog.startYear')"
              [maxlength]="4"
              [value]="rYear()"
              [error]="rErr().year ?? ''"
              (valueChange)="rYear.set($event)"
            />
            <label class="check">
              <input
                type="checkbox"
                [checked]="rConfirmed()"
                (change)="rConfirmed.set($any($event.target).checked)"
              />
              <span
                >{{ t()("cotisations.ruleDialog.confirmed")
                }}<span class="sub block">{{
                  t()("cotisations.ruleDialog.confirmedHint")
                }}</span></span
              >
            </label>
          </div>
          <button modal-footer type="button" class="btn btn-ghost" (click)="ruleFor.set(null)">
            {{ t()("cotisations.cancel") }}
          </button>
          <button
            modal-footer
            type="button"
            class="btn btn-primary"
            (click)="submitRule(ruleTarget.id)"
          >
            {{ t()("cotisations.ruleDialog.submit") }}
            <span class="btn-chip"><ui-icon name="check" [size]="18" /></span>
          </button>
        </ui-modal>
      }
    </app-shell>
  `,
})
export default class CotisationsPage {
  protected readonly store = inject(StoreService);
  protected readonly locale = inject(LocaleService);
  private readonly snackbar = inject(SnackbarService);
  protected readonly t = this.locale.t;
  protected readonly nf = nf;
  protected readonly initials = initialsOf;
  protected readonly fmtDate = fmtDate;
  protected readonly state_ = STATE;
  protected readonly methods = PAYMENT_METHODS;
  protected readonly other = OTHER;
  protected readonly q = signal("");
  protected readonly state = signal<string>(ALL);
  protected readonly orgFilter = signal<string>(ALL);
  protected readonly detailId = signal<string | null>(null);

  protected readonly canManage = computed(() => this.store.can("contribution.manage"));

  /** Membres actifs du périmètre, avec leur situation de cotisation. */
  protected readonly rows = computed<Row[]>(() => {
    const s = this.store.state();
    const session = s.session;
    const payments = scopedPayments(s.payments, session);
    const rules = scopedRules(s.contributionRules, session);
    const scoopName = new Map(s.scoops.map((c) => [c.id, c.name]));
    const now = new Date().toISOString();
    return (
      activeMembers(scopedMembers(s.members, session))
        .map((member) => {
          const rule = rules.find((r) => r.scoopId === member.scoopId);
          return {
            member,
            name: `${member.firstName} ${member.lastName}`,
            scoop: scoopName.get(member.scoopId) ?? member.scoopId,
            orgId: member.orgId ?? "",
            orgName: member.orgId ? (s.orgs.find((org) => org.id === member.orgId)?.name ?? "") : "",
            dues: memberDues(member, rule, payments, now),
            rule,
          };
        })
        // Les plus gros restes à payer d'abord : la liste sert à relancer.
        .sort((a, b) => b.dues.balance - a.dues.balance || a.name.localeCompare(b.name))
    );
  });

  protected readonly totals = computed(() => {
    const s = this.store.state();
    const session = s.session;
    const members = activeMembers(scopedMembers(s.members, session));
    const payments = scopedPayments(s.payments, session);
    const rules = scopedRules(s.contributionRules, session);
    const now = new Date().toISOString();
    let expected = 0;
    let collected = 0;
    let late = 0;
    const byScoop = new Map<string, Member[]>();
    for (const m of members) byScoop.set(m.scoopId, [...(byScoop.get(m.scoopId) ?? []), m]);
    for (const [scoopId, mine] of byScoop) {
      const tt = scoopTotals(
        mine,
        rules.find((r) => r.scoopId === scoopId),
        payments,
        now,
      );
      expected += tt.expected;
      collected += tt.collected;
      late += tt.late;
    }
    return {
      expected,
      collected,
      late,
      members: members.length,
      rate: expected ? Math.round((collected / expected) * 100) : 0,
    };
  });

  protected readonly stats = computed<StatCard[]>(() => {
    const t = this.t();
    const x = this.totals();
    return [
      {
        label: t("cotisations.kpi.expected"),
        value: `${nf.format(x.expected)} F`,
        sub: t(
          x.members > 1 ? "cotisations.kpi.expectedSub.autre" : "cotisations.kpi.expectedSub.un",
          { count: nf.format(x.members) },
        ),
        icon: "account_balance_wallet",
        bg: "",
        fg: "",
      },
      {
        label: t("cotisations.kpi.collected"),
        value: `${nf.format(x.collected)} F`,
        sub: t("cotisations.kpi.collectedSub"),
        icon: "check_circle",
        ...TONE.succes,
      },
      {
        label: t("cotisations.kpi.rate"),
        value: `${x.rate} %`,
        sub: t("cotisations.kpi.rateSub"),
        icon: "trending_up",
        ...TONE.info,
      },
      {
        label: t("cotisations.kpi.late"),
        value: nf.format(x.late),
        sub: t(
          x.late === 0
            ? "cotisations.kpi.lateSub.zero"
            : x.late > 1
              ? "cotisations.kpi.lateSub.autre"
              : "cotisations.kpi.lateSub.un",
        ),
        icon: "warning",
        ...(x.late ? TONE.erreur : TONE.succes),
      },
    ];
  });

  /** Règle de chaque coopérative du périmètre (ou son absence). */
  protected readonly rules = computed(() => {
    const s = this.store.state();
    const rules = scopedRules(s.contributionRules, s.session);
    // Toutes les coopératives du périmètre (hors archivées) : l'admin peut définir la règle de chacune.
    const ids = inScope(
      s.scoops.filter((c) => !c.archived).map((c) => ({ ...c, scoopId: c.id })),
      s.session,
    ).map((c) => c.id);
    return (
      ids
        .map((scoopId) => {
          const rule = rules.find((r) => r.scoopId === scoopId);
          return {
            scoopId,
            scoop: s.scoops.find((c) => c.id === scoopId)?.name ?? scoopId,
            summary: rule ? this.ruleSummary(rule) : "",
            confirmed: !!rule?.confirmed,
            startYear: rule?.startYear ?? null,
          };
        })
        // Les coopératives sans règle d'abord : c'est l'action à faire.
        .sort((a, b) => Number(!!a.summary) - Number(!!b.summary) || a.scoop.localeCompare(b.scoop))
    );
  });

  protected readonly confirmedRules = computed(
    () => this.rules().filter((r) => r.confirmed).length,
  );

  protected readonly stateButtons = computed(() => {
    const t = this.t();
    const base = this.searched();
    return [
      { id: ALL, label: t("cotisations.filter.all"), count: base.length },
      ...STATES.map((st) => ({
        id: st,
        label: t(STATE[st].label),
        count: base.filter((r) => r.dues.state === st).length,
      })),
    ];
  });

  private readonly searched = computed(() => {
    const needle = norm(this.q().trim());
    const org = this.orgFilter();
    return this.rows().filter(
      (r) =>
        (!needle || norm(`${r.name} ${r.scoop} ${r.orgName}`).includes(needle)) &&
        (org === ALL || (org === INDIVIDUAL ? !r.orgId : r.orgId === org)),
    );
  });

  /** Filtre par GIE : tous, membres individuels, ou un GIE précis (avec l'effectif de chacun). */
  protected readonly orgFilterOptions = computed<SelectOption[]>(() => {
    const rows = this.rows();
    const ids = [...new Set(rows.map((row) => row.orgId).filter(Boolean))];
    const names = new Map(rows.map((row) => [row.orgId, row.orgName]));
    return [
      { value: ALL, label: this.t()("cotisations.filter.allOrgs"), hint: nf.format(rows.length) },
      { value: INDIVIDUAL, label: this.t()("cotisations.filter.individual"), hint: nf.format(rows.filter((row) => !row.orgId).length) },
      ...ids
        .map((id) => ({ value: id, label: names.get(id) || id, hint: nf.format(rows.filter((row) => row.orgId === id).length) }))
        .sort((first, second) => first.label.localeCompare(second.label)),
    ];
  });

  protected readonly shown = computed(() => {
    const st = this.state();
    return this.searched().filter((r) => st === ALL || r.dues.state === st);
  });

  /** Pagination : mêmes règles que l'API (`GET /v1/contributions?page=&limit=`). */
  protected readonly pager = createPager(() => this.shown());

  protected pct(d: MemberDues): number {
    return d.expected ? Math.min(100, Math.round((d.paid / d.expected) * 100)) : 0;
  }

  protected methodKey(m: PaymentMethod): MessageKey {
    return `cotisations.method.${m}` as MessageKey;
  }

  private ruleSummary(rule: ContributionRule): string {
    const amount = nf.format(rule.amount);
    if (rule.periodicity === "mensuelle")
      return this.t()("cotisations.rule.summary.mensuelle", { amount });
    const date = this.locale.formatDate(`2000-${rule.dueDate}T12:00:00Z`, {
      day: "numeric",
      month: "long",
    });
    return this.t()("cotisations.rule.summary.annuelle", { amount, date });
  }

  // ── Détail en modale ──
  protected readonly detail = computed<DetailView | null>(() => {
    const id = this.detailId();
    const r = id ? this.rows().find((x) => x.member.id === id) : null;
    if (!r) return null;
    const t = this.t();
    const s = this.store.state();
    const payments = s.payments
      .filter((p) => p.memberId === r.member.id)
      .sort((a, b) => b.paidAt.localeCompare(a.paidAt));
    const st = STATE[r.dues.state];
    const lines = [...r.dues.lines].sort((a, b) => b.period.localeCompare(a.period));
    return {
      title: r.name,
      subtitle: [r.member.village, r.scoop].filter(Boolean).join(" · "),
      icon: "account_balance_wallet",
      badges: [{ label: t(st.label), bg: st.bg, fg: st.fg }],
      kpis: [
        detailKpi(
          t("cotisations.sheet.expected"),
          r.dues.expected,
          "account_balance_wallet",
          TONE.info,
          `${nf.format(r.dues.expected)} F`,
        ),
        detailKpi(
          t("cotisations.sheet.paid"),
          r.dues.paid,
          "check_circle",
          TONE.succes,
          `${nf.format(r.dues.paid)} F`,
        ),
        detailKpi(
          t("cotisations.sheet.balance"),
          r.dues.balance,
          "payments",
          r.dues.balance ? TONE.erreur : TONE.succes,
          `${nf.format(r.dues.balance)} F`,
        ),
      ],
      facts: [
        detailFact(t("cotisations.col.scoop"), r.scoop, "apartment"),
        detailFact(t("producteurs.col.phone"), this.store.phone(r.member.phone) || null, "call"),
        detailFact(
          t("cooperatives.fiche.detail.joined"),
          r.member.joinedAt ? fmtDate(r.member.joinedAt) : null,
          "calendar_today",
        ),
        detailFact(
          t("cotisations.detail.rule"),
          r.rule ? this.ruleSummary(r.rule) : t("cotisations.sheet.noRule"),
          "gavel",
          { wide: true },
        ),
      ],
      sections: [
        {
          title: t("cotisations.detail.lines"),
          icon: "event_note",
          count: lines.length || null,
          empty: t("cotisations.sheet.due.none"),
          items: lines.slice(0, 8).map((l) => {
            const left = Math.max(0, l.expected - l.paid);
            return {
              label: l.period,
              sub: t("cotisations.sheet.due.line", {
                paid: nf.format(l.paid),
                expected: nf.format(l.expected),
              }),
              badge: left
                ? {
                    label: t("cotisations.sheet.due.left", { amount: nf.format(left) }),
                    ...TONE.erreur,
                  }
                : { label: t("cotisations.sheet.due.done"), ...TONE.succes },
            };
          }),
          more: Math.max(0, lines.length - 8),
        },
        {
          title: t("cotisations.sheet.history.title"),
          icon: "receipt_long",
          count: payments.length || null,
          empty: t("cotisations.sheet.history.none"),
          items: payments.slice(0, 8).map((p) => ({
            label: `${nf.format(p.amount)} FCFA · ${t("cotisations.sheet.history.receipt", { receipt: p.receipt })}`,
            sub: `${t("cotisations.sheet.history.period", { period: p.period })} · ${t(this.methodKey(p.method))} · ${fmtDate(p.paidAt)}`,
            ...(p.voided
              ? { badge: { label: t("cotisations.sheet.history.voidTag"), ...TONE.neutre } }
              : p.reversalOf
                ? { badge: { label: t("cotisations.journal.reversalTag"), ...TONE.attente } }
                : {}),
          })),
          more: Math.max(0, payments.length - 8),
        },
      ],
      link: null,
    };
  });

  // ── Enregistrer un paiement ──
  protected readonly payId = signal<string | null>(null);
  protected readonly payPeriod = signal("");
  protected readonly payOther = signal("");
  protected readonly payAmount = signal("");
  protected readonly payMethod = signal<PaymentMethod>("espèces");
  protected readonly payNote = signal("");
  protected readonly payError = signal("");
  /** Date du paiement (AAAA-MM-JJ) : aujourd'hui par défaut. */
  protected readonly payDate = signal(today());

  protected readonly payFor = computed(() => {
    const id = this.payId();
    return id ? (this.rows().find((r) => r.member.id === id) ?? null) : null;
  });

  /** Périodes encore dues (avec le reste) + « une autre période ». */
  protected readonly periodOptions = computed<SelectOption[]>(() => {
    const r = this.payFor();
    const t = this.t();
    if (!r) return [];
    const open = r.dues.lines
      .filter((l) => l.expected > l.paid)
      .map((l) => ({
        value: l.period,
        label: t("cotisations.payDialog.periodLeft", {
          period: l.period,
          amount: nf.format(l.expected - l.paid),
        }),
      }));
    return [...open, { value: OTHER, label: t("cotisations.payDialog.periodOther") }];
  });

  protected readonly aggregator = aggregatorConnected();
  protected readonly payReference = signal("");

  // ── Liens de paiement ──
  protected readonly linkShown = signal<{ link: PaymentLink; name: string; scoop: string } | null>(null);
  protected readonly linkCopied = signal(false);

  /** Lien affiché avec l'adresse, le message prêt à envoyer et les raccourcis WhatsApp, SMS et e-mail. */
  protected readonly sharedLink = computed(() => {
    const shown = this.linkShown();
    if (!shown) return null;
    const origin = typeof window === "undefined" ? "" : window.location.origin;
    const member = this.store.state().members.find((candidate) => candidate.id === shown.link.memberId);
    const url = paymentLinkUrl(shown.link.token, origin);
    const message = paymentLinkMessage({ name: shown.name, scoop: shown.scoop, amount: nf.format(shown.link.amount), period: shown.link.period, url });
    const phone = (member?.phone ?? "").replace(/\D/g, "");
    return {
      ...shown,
      url,
      message,
      whatsapp: `https://wa.me/${phone ? (phone.length === 9 ? `221${phone}` : phone) : ""}?text=${encodeURIComponent(message)}`,
      sms: `sms:${phone ? `+${phone.length === 9 ? `221${phone}` : phone}` : ""}?body=${encodeURIComponent(message)}`,
      mail: member?.email ? `mailto:${member.email}?subject=${encodeURIComponent(this.t()("cotisations.link.mailSubject"))}&body=${encodeURIComponent(message)}` : "",
    };
  });

  protected readonly linkRows = computed(() => {
    const state = this.store.state();
    const session = state.session;
    const names = new Map(state.members.map((member) => [member.id, `${member.firstName} ${member.lastName}`]));
    const now = Date.now();
    return state.paymentLinks
      .filter((link) => inScope([link], session).length > 0)
      .map((link) => {
        const expired = link.status === "en attente" && Date.parse(link.expiresAt) < now;
        const status = expired ? "expiré" : link.status;
        const tone = status === "payé" ? TONE.succes : status === "en attente" ? TONE.info : status === "expiré" ? TONE.attente : TONE.neutre;
        return {
          link,
          name: names.get(link.memberId) ?? link.memberId,
          live: status === "en attente",
          tone,
          statusKey: `cotisations.link.status.${status}` as MessageKey,
        };
      })
      .sort((first, second) => second.link.createdAt.localeCompare(first.link.createdAt));
  });

  /** Crée le lien depuis le formulaire de paiement (période et montant choisis) et l'affiche. */
  protected submitLink(): void {
    const target = this.payFor();
    if (!target) return;
    const amount = Number(this.payAmount());
    if (!amount || amount <= 0) {
      this.payError.set(this.t()("cotisations.ruleDialog.invalidAmount"));
      return;
    }
    const period = this.payPeriod() === OTHER ? this.payOther().trim() : this.payPeriod();
    const result = actions.createPaymentLink({ memberId: target.member.id, amount, period });
    if (!result.ok) {
      this.snackbar.error(result.error);
      return;
    }
    this.payId.set(null);
    this.openLink(this.store.state().paymentLinks.find((link) => link.id === result.id)!);
  }

  protected openLink(link: PaymentLink): void {
    const member = this.store.state().members.find((candidate) => candidate.id === link.memberId);
    const scoop = this.store.state().scoops.find((candidate) => candidate.id === link.scoopId)?.name ?? "";
    this.linkCopied.set(false);
    this.linkShown.set({ link, name: member ? `${member.firstName} ${member.lastName}` : "", scoop });
  }

  protected async copyLink(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      this.snackbar.error(this.t()("cotisations.link.copyFailed"));
      return;
    }
    this.linkCopied.set(true);
    this.snackbar.success(this.t()("cotisations.link.copiedToast"));
    setTimeout(() => this.linkCopied.set(false), 2500);
  }

  protected cancelLink(link: PaymentLink): void {
    const result = actions.cancelPaymentLink(link.id);
    if (!result.ok) {
      this.snackbar.error(result.error);
      return;
    }
    this.snackbar.success(this.t()("cotisations.link.cancelled"));
  }

  // ── Inscrire un producteur comme membre cotisant ──
  protected readonly enrollOpen = signal(false);
  protected readonly enrollScoop = signal("");
  protected readonly enrollQuery = signal("");
  protected readonly enrollPick = signal("");
  protected readonly canEnroll = computed(() => this.store.can("member.manage"));

  protected readonly enrollScoops = computed<SelectOption[]>(() => {
    const state = this.store.state();
    return state.scoops
      .filter((scoop) => !scoop.archived && inScope([{ scoopId: scoop.id }], state.session).length)
      .sort((first, second) => first.name.localeCompare(second.name))
      .map((scoop) => ({ value: scoop.id, label: scoop.name }));
  });

  /** Producteurs de la coopérative qui ne sont pas encore membres (candidats à l'inscription). */
  protected readonly enrollCandidates = computed(() => {
    const state = this.store.state();
    const members = new Set(state.members.filter((member) => member.status !== "sorti").map((member) => member.producerId));
    const needle = norm(this.enrollQuery().trim());
    return state.producers
      .filter((producer) => producer.scoopId === this.enrollScoop() && !producer.mergedInto && !members.has(producer.id))
      .filter((producer) => !needle || norm(`${producer.firstName} ${producer.lastName} ${producer.code}`).includes(needle))
      .map((producer) => ({
        id: producer.id,
        firstName: producer.firstName,
        lastName: producer.lastName,
        orgName: producer.orgId ? (state.orgs.find((org) => org.id === producer.orgId)?.name ?? "") : "",
      }))
      .sort((first, second) => first.lastName.localeCompare(second.lastName))
      .slice(0, 50);
  });

  protected openEnroll(): void {
    this.enrollScoop.set(this.enrollScoops()[0]?.value ?? "");
    this.enrollQuery.set("");
    this.enrollPick.set("");
    this.enrollOpen.set(true);
  }

  protected submitEnroll(): void {
    const result = actions.enrollProducerAsMember(this.enrollPick());
    if (!result.ok) {
      this.snackbar.error(result.error);
      return;
    }
    this.enrollOpen.set(false);
    this.snackbar.success(this.t()("cotisations.enroll.done"));
  }

  protected openPay(memberId: string): void {
    this.payReference.set("");
    this.payId.set(memberId);
    this.payOther.set("");
    this.payNote.set("");
    this.payMethod.set("espèces");
    this.payError.set("");
    this.payDate.set(today());
    this.choosePeriod(this.periodOptions()[0]?.value ?? OTHER);
  }

  protected choosePeriod(period: string): void {
    this.payPeriod.set(period);
    const r = this.payFor();
    const line = r?.dues.lines.find((l) => l.period === period);
    this.payAmount.set(
      line ? String(line.expected - line.paid) : r?.rule ? String(r.rule.amount) : "",
    );
  }

  protected submitPay(): void {
    const r = this.payFor();
    if (!r) return;
    const amount = Number(this.payAmount());
    if (!amount || amount <= 0) {
      this.payError.set(this.t()("cotisations.ruleDialog.invalidAmount"));
      return;
    }
    const period = this.payPeriod() === OTHER ? this.payOther().trim() : this.payPeriod();
    const day = this.payDate();
    const res = actions.recordPayment({
      memberId: r.member.id,
      amount,
      period,
      method: this.payMethod(),
      note: this.payNote(),
      ...(this.payMethod() !== "espèces" && this.payReference().trim() ? { reference: this.payReference().trim() } : {}),
      // Paiement du jour : heure actuelle ; paiement passé : midi (évite un changement de jour avec le fuseau).
      ...(day && day !== today() ? { paidAt: `${day}T12:00:00.000Z` } : {}),
    });
    if (!res.ok) {
      this.snackbar.error(this.locale.tNow(res.error as MessageKey));
      return;
    }
    this.payId.set(null);
    // Le reçu s'ouvre tout de suite : il se remet au membre (impression ou PDF).
    this.receiptId.set(res.id);
    this.snackbar.success(
      `${this.t()("cotisations.payDialog.toast", { receipt: res.receipt })} · ${this.t()("cotisations.payDialog.toastDetail", { name: r.name, amount: nf.format(amount), period })}`,
    );
  }

  // ── Onglets ──
  protected readonly tab = signal<"members" | "payments" | "rules" | "links">("members");

  // ── Paiements reçus (journal des reçus) ──
  protected readonly pq = signal("");
  protected readonly pMethod = signal("");
  protected readonly pStatus = signal<"all" | "valid" | "voided">("all");

  /** Tous les paiements du périmètre, les plus récents d'abord. */
  protected readonly payments = computed(() => {
    const s = this.store.state();
    return [...scopedPayments(s.payments, s.session)].sort((a, b) =>
      b.paidAt.localeCompare(a.paidAt),
    );
  });

  private readonly memberNames = computed(
    () => new Map(this.store.state().members.map((m) => [m.id, `${m.firstName} ${m.lastName}`])),
  );

  protected memberName(id: string): string {
    return this.memberNames().get(id) ?? id;
  }

  protected scoopName(id: string): string {
    return this.store.state().scoops.find((c) => c.id === id)?.name ?? id;
  }

  /** Recherche et mode, avant le filtre valide / annulé (pour les compteurs). */
  private readonly journalBase = computed(() => {
    const needle = norm(this.pq().trim());
    const method = this.pMethod();
    return this.payments().filter(
      (p) =>
        (!method || p.method === method) &&
        (!needle || norm(`${this.memberName(p.memberId)} ${p.receipt}`).includes(needle)),
    );
  });

  protected readonly payStatusButtons = computed(() => {
    const t = this.t();
    const base = this.journalBase();
    return [
      { id: "all" as const, label: t("cotisations.journal.status.all"), count: base.length },
      {
        id: "valid" as const,
        label: t("cotisations.journal.status.valid"),
        count: base.filter((p) => !isCancelled(p)).length,
      },
      {
        id: "voided" as const,
        label: t("cotisations.journal.status.voided"),
        count: base.filter(isCancelled).length,
      },
    ];
  });

  protected readonly methodOptions = computed<SelectOption[]>(() => [
    { value: "", label: this.t()("cotisations.journal.methodAll") },
    ...PAYMENT_METHODS.map((m) => ({ value: m, label: this.t()(this.methodKey(m)) })),
  ]);

  protected readonly journal = computed(() => {
    const st = this.pStatus();
    return this.journalBase().filter(
      (p) => st === "all" || (st === "voided" ? isCancelled(p) : !isCancelled(p)),
    );
  });

  protected readonly journalTotals = computed(() => {
    const valid = this.journal().filter((p) => !isCancelled(p));
    return { count: valid.length, amount: valid.reduce((n, p) => n + p.amount, 0) };
  });

  protected readonly journalPager = createPager(() => this.journal());

  // ── Reçu ──
  protected readonly receiptId = signal<string | null>(null);

  protected readonly receipt = computed(() => {
    const id = this.receiptId();
    const p = id ? this.store.state().payments.find((x) => x.id === id) : null;
    return p ? { p, member: this.memberName(p.memberId), scoop: this.scoopName(p.scoopId) } : null;
  });

  /** Ouvre une page d'impression du reçu (le navigateur propose aussi « Enregistrer en PDF »). */
  protected printReceipt(rc: { p: ContributionPayment; member: string; scoop: string }): void {
    const t = this.t();
    const esc = (v: string) =>
      v.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
    const row = (label: string, value: string) =>
      `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`;
    const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${esc(t("cotisations.receipt.number", { receipt: rc.p.receipt }))}</title>
<style>
  body{font-family:"Plus Jakarta Sans",system-ui,sans-serif;color:#0E1A14;margin:40px;}
  .card{max-width:560px;margin:auto;border:2px solid #0F3D2A;border-radius:20px;padding:28px;}
  .top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
  .brand{font-weight:800;color:#0F3D2A;font-size:20px}.sub{color:#5B6660;font-size:13px}
  .no{background:#0F3D2A;color:#C6F05A;border-radius:10px;padding:6px 12px;font-family:monospace;font-weight:700}
  h1{font-size:22px;margin:22px 0 4px}.amount{margin:18px 0;padding:18px;border-radius:16px;background:#EEF3E4;text-align:center;font-size:34px;font-weight:800;color:#2E7D32}
  dl{display:grid;grid-template-columns:1fr 1fr;gap:12px 20px;margin:0}dt{font-size:12px;color:#5B6660}dd{margin:2px 0 0;font-weight:800}
  .void{margin-top:16px;padding:12px;border-radius:12px;background:#FFE0E0;color:#B3261E;font-weight:700}
  .sign{margin-top:36px;display:flex;justify-content:flex-end}.sign div{width:220px;border-top:1px solid #B9C0BB;padding-top:6px;text-align:center;font-size:12px;color:#5B6660}
  .foot{margin-top:24px;font-size:11px;color:#5B6660;text-align:center}
  ${rc.p.voided ? ".amount{background:#E6E2D6;color:#5B6660;text-decoration:line-through}" : ""}
</style></head><body><div class="card">
<div class="top"><div><div class="brand">Mbay Diaay</div><div class="sub">${esc(rc.scoop)}</div></div><span class="no">${esc(rc.p.receipt)}</span></div>
<h1>${esc(t("cotisations.receipt.title"))}</h1>
<div class="amount">${esc(nf.format(rc.p.amount))} FCFA</div>
<dl>${row(t("cotisations.receipt.from"), rc.member)}${row(t("cotisations.receipt.period"), rc.p.period)}${row(t("cotisations.receipt.date"), fmtDate(rc.p.paidAt))}${row(t("cotisations.receipt.method"), t(this.methodKey(rc.p.method)))}${row(t("cotisations.receipt.by"), rc.p.recordedBy)}${rc.p.note ? row(t("cotisations.receipt.note"), rc.p.note) : ""}</dl>
${rc.p.voided ? `<div class="void">${esc(t("cotisations.receipt.voided", { date: fmtDate(rc.p.voided.at), name: rc.p.voided.by }))} · ${esc(rc.p.voided.reason)}</div>` : ""}
<div class="sign"><div>${esc(t("cotisations.receipt.signature"))}</div></div>
<p class="foot">${esc(t("cotisations.receipt.footer"))}</p>
</div><script>window.onload=()=>{window.print();}</script></body></html>`;
    const w = window.open("", "_blank", "width=720,height=900");
    if (!w) {
      this.snackbar.error(this.t()("common.exportError"));
      return;
    }
    w.document.write(html);
    w.document.close();
  }

  // ── Annuler un paiement ──
  protected readonly voidId = signal<string | null>(null);
  protected readonly voidReason = signal("");

  protected readonly voidPay = computed(() => {
    const id = this.voidId();
    return id ? (this.store.state().payments.find((p) => p.id === id) ?? null) : null;
  });

  protected openVoid(id: string): void {
    this.receiptId.set(null);
    this.voidReason.set("");
    this.voidId.set(id);
  }

  protected submitVoid(id: string): void {
    const pay = this.voidPay();
    const res = actions.voidPayment(id, this.voidReason());
    if (!res.ok) {
      this.snackbar.error(this.locale.tNow(res.error as MessageKey));
      return;
    }
    this.voidId.set(null);
    this.snackbar.success(
      `${this.t()("cotisations.voidDialog.done")} · ${this.t()("cotisations.voidDialog.doneDetail", { receipt: pay?.receipt ?? "" })}`,
    );
  }

  // ── Règle de cotisation ──
  protected readonly ruleFor = signal<string | null>(null);
  protected readonly rAmount = signal("");
  protected readonly rPeriodicity = signal<Periodicity>("annuelle");
  protected readonly rMonth = signal("03");
  protected readonly rDay = signal("31");
  protected readonly rYear = signal(String(new Date().getFullYear()));
  protected readonly rConfirmed = signal(false);
  protected readonly rErr = signal<{ amount?: string; day?: string; year?: string }>({});

  protected readonly ruleScoop = computed(() => {
    const id = this.ruleFor();
    return id ? { id, name: this.scoopName(id) } : null;
  });

  protected readonly monthOptions = computed<SelectOption[]>(() =>
    Array.from({ length: 12 }, (_, i) => {
      const mm = String(i + 1).padStart(2, "0");
      return {
        value: mm,
        label: this.locale.formatDate(`2000-${mm}-15T12:00:00Z`, { month: "long" }),
      };
    }),
  );

  protected openRule(scoopId: string): void {
    const s = this.store.state();
    const rule = scopedRules(s.contributionRules, s.session).find((r) => r.scoopId === scoopId);
    this.rAmount.set(rule ? String(rule.amount) : "");
    this.rPeriodicity.set(rule?.periodicity ?? "annuelle");
    const [mm, dd] = (rule?.dueDate ?? "03-31").split("-");
    this.rMonth.set(mm ?? "03");
    this.rDay.set(String(Number(dd ?? "31")));
    this.rYear.set(String(rule?.startYear ?? new Date().getFullYear()));
    this.rConfirmed.set(rule?.confirmed ?? false);
    this.rErr.set({});
    this.ruleFor.set(scoopId);
  }

  protected submitRule(scoopId: string): void {
    const t = this.t();
    const amount = Number(this.rAmount());
    const day = Number(this.rDay());
    const year = Number(this.rYear());
    const err: { amount?: string; day?: string; year?: string } = {};
    if (!(amount > 0)) err.amount = t("cotisations.ruleDialog.invalidAmount");
    if (this.rPeriodicity() === "annuelle" && !(Number.isInteger(day) && day >= 1 && day <= 31))
      err.day = t("cotisations.ruleDialog.invalidDay");
    if (!/^\d{4}$/.test(this.rYear().trim())) err.year = t("cotisations.ruleDialog.invalidYear");
    this.rErr.set(err);
    if (Object.keys(err).length) return;
    const res = actions.setContributionRule(scoopId, {
      amount,
      periodicity: this.rPeriodicity(),
      dueDate:
        this.rPeriodicity() === "annuelle"
          ? `${this.rMonth()}-${String(day).padStart(2, "0")}`
          : "12-31",
      startYear: year,
      confirmed: this.rConfirmed(),
    });
    if (!res.ok) {
      this.snackbar.error(this.locale.tNow(res.error as MessageKey));
      return;
    }
    this.ruleFor.set(null);
    this.snackbar.success(t("cotisations.ruleDialog.saved"));
  }

  protected exportCsv(): void {
    const rows = this.shown();
    try {
      downloadCsv("cotisations.csv", [
        ["Membre", "Coopérative", "État", "Attendu (FCFA)", "Payé (FCFA)", "Reste (FCFA)"],
        ...rows.map((r) => [
          r.name,
          r.scoop,
          r.dues.state,
          r.dues.expected,
          r.dues.paid,
          r.dues.balance,
        ]),
      ]);
    } catch {
      this.snackbar.error(this.t()("common.exportError"));
      return;
    }
    actions.audit("Export cotisations", "Cotisations", `${rows.length} lignes (CSV)`);
    this.snackbar.success(
      `${this.t()("cotisations.exported")} · ${this.t()(rows.length > 1 ? "cotisations.exportedCount.autre" : "cotisations.exportedCount.un", { count: nf.format(rows.length) })}`,
    );
  }
}
