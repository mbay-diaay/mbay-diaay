import { useMemo, useState } from "react";
import { toast } from "sonner";
import { FormDialog } from "@/components/app/FormDialog";
import { FormField } from "@/components/app/FormField";
import { todayIso } from "@/components/app/FollowKinds";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { actions, useScoops, useStore } from "@/lib/store";
import { scopedMembers } from "@/lib/scope";
import { creditIssues, generateSchedule, totalDue } from "@/lib/commerce";
import { nf } from "@/lib/format";
import { useI18n } from "@/lib/i18n";
import { useFormat } from "@/hooks/use-format";

const toNumber = (v: string) => Number(v.replace(/\s/g, "").replace(",", "."));
const isDay = (d: string) => /^\d{4}-\d{2}-\d{2}$/.test(d) && !Number.isNaN(Date.parse(d));

/** Même jour, un mois plus tard (fin de mois comprise) : première échéance proposée. */
function inOneMonth(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number) as [number, number, number];
  const last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  return new Date(Date.UTC(y, m, Math.min(d, last))).toISOString().slice(0, 10);
}

type Field = "member" | "purpose" | "amount" | "rate" | "grantedAt" | "count" | "firstDue";

/**
 * Octroi d'un crédit : saisie guidée, validation en direct (erreur après la première saisie ou la sortie du champ),
 * et aperçu de l'échéancier calculé avant de valider. À monter seulement quand il est ouvert.
 */
export function CreditGrantDialog({
  onClose,
  scoopId,
}: {
  onClose: () => void;
  /** Coopérative en vue (filtre global), pour ne proposer que ses membres. */
  scoopId?: string | undefined;
}) {
  const { t } = useI18n();
  const { money, day } = useFormat();
  const session = useStore((s) => s.session);
  const members = useStore((s) => s.members);
  const scoops = useScoops();
  const today = todayIso();

  const eligible = useMemo(
    () =>
      scopedMembers(members, session)
        .filter((m) => m.status === "membre" && (!scoopId || m.scoopId === scoopId))
        .map((m) => ({ id: m.id, scoopId: m.scoopId, name: `${m.firstName} ${m.lastName}` }))
        .sort((a, b) => a.name.localeCompare(b.name, "fr")),
    [members, session, scoopId],
  );
  const manyScoops = new Set(eligible.map((m) => m.scoopId)).size > 1;
  const scoopName = (id: string) => scoops.find((s) => s.id === id)?.name ?? "";

  const [search, setSearch] = useState("");
  const [memberId, setMemberId] = useState("");
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("0");
  const [grantedAt, setGrantedAt] = useState(today);
  const [count, setCount] = useState("3");
  const [firstDue, setFirstDue] = useState(inOneMonth(today));
  const [every, setEvery] = useState("1");
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const touch = (f: Field) => setTouched((s) => (s[f] ? s : { ...s, [f]: true }));

  const needle = search.trim().toLowerCase();
  const choices = eligible.filter(
    (m) => m.id === memberId || m.name.toLowerCase().includes(needle),
  );

  const input = {
    amount: toNumber(amount),
    ratePct: rate.trim() === "" ? 0 : toNumber(rate),
    count: toNumber(count),
    firstDue,
    grantedAt,
  };
  const issues = creditIssues(input, today);
  const fieldError: Record<Field, string | undefined> = {
    member: memberId ? undefined : t("credits.grantDialog.memberRequired"),
    purpose: purpose.trim() ? undefined : t("credits.grantDialog.purposeRequired"),
    amount: issues.includes("errors.credit.amount") ? t("errors.credit.amount") : undefined,
    rate: issues.includes("errors.credit.rate") ? t("errors.credit.rate") : undefined,
    count: issues.includes("errors.credit.schedule") ? t("errors.credit.schedule") : undefined,
    grantedAt: !isDay(grantedAt) || grantedAt > today ? t("errors.credit.date") : undefined,
    firstDue:
      !isDay(firstDue) || (isDay(grantedAt) && firstDue <= grantedAt)
        ? t("errors.credit.date")
        : undefined,
  };
  const show = (f: Field) => (touched[f] ? fieldError[f] : undefined);
  const invalid = issues.length > 0 || !memberId || !purpose.trim();

  const everyMonths = Number(every);
  const previewable =
    Number.isInteger(input.amount) &&
    input.amount > 0 &&
    input.ratePct >= 0 &&
    input.ratePct <= 100 &&
    Number.isInteger(input.count) &&
    input.count >= 1 &&
    input.count <= 36 &&
    isDay(firstDue);
  const schedule = useMemo(
    () =>
      previewable
        ? generateSchedule({
            amount: input.amount,
            ratePct: input.ratePct,
            count: input.count,
            firstDue,
            everyMonths,
            idPrefix: "apercu",
          })
        : [],
    [previewable, input.amount, input.ratePct, input.count, firstDue, everyMonths],
  );

  const submit = () => {
    if (invalid) {
      setTouched({
        member: true,
        purpose: true,
        amount: true,
        rate: true,
        grantedAt: true,
        count: true,
        firstDue: true,
      });
      return;
    }
    const res = actions.grantCredit({
      memberId,
      amount: input.amount,
      ratePct: input.ratePct,
      purpose,
      grantedAt,
      count: input.count,
      firstDue,
      everyMonths,
    });
    if (res.ok) {
      toast.success(t("credits.grantDialog.toast"), {
        description: t("credits.grantDialog.toastDetail", {
          name: eligible.find((m) => m.id === memberId)?.name ?? "",
          amount: nf.format(input.amount),
          count: input.count,
        }),
      });
      onClose();
    } else toast.error(res.error);
  };

  return (
    <FormDialog
      open
      onOpenChange={(o) => !o && onClose()}
      size="lg"
      title={t("credits.grantDialog.title")}
      description={t("credits.grantDialog.description")}
      cancelLabel={t("credits.cancel")}
      submitLabel={t("credits.grantDialog.submit")}
      onSubmit={submit}
      submitDisabled={invalid}
      footerNote={t("credits.grantDialog.footer")}
    >
      <div className="grid max-h-[60vh] gap-4 overflow-y-auto px-1 pb-1">
        <FormField label={t("credits.grantDialog.memberSearch")}>
          {(c) => (
            <Input
              {...c}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("credits.grantDialog.memberSearchPlaceholder")}
              autoComplete="off"
            />
          )}
        </FormField>
        <FormField
          label={t("credits.grantDialog.member")}
          hint={choices.length ? t("credits.grantDialog.memberHint") : undefined}
          error={choices.length ? show("member") : t("credits.grantDialog.memberNone")}
          required
        >
          {(c) => (
            <Select
              value={memberId}
              onValueChange={(v) => {
                setMemberId(v);
                touch("member");
              }}
            >
              <SelectTrigger {...c} onBlur={() => touch("member")}>
                <SelectValue placeholder={t("credits.grantDialog.memberPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {choices.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {manyScoops
                      ? t("credits.grantDialog.memberOption", {
                          name: m.name,
                          scoop: scoopName(m.scoopId),
                        })
                      : m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </FormField>
        <FormField
          label={t("credits.grantDialog.purpose")}
          hint={t("credits.grantDialog.purposeHint")}
          error={show("purpose")}
          required
        >
          {(c) => (
            <Input
              {...c}
              value={purpose}
              onChange={(e) => {
                setPurpose(e.target.value);
                touch("purpose");
              }}
              onBlur={() => touch("purpose")}
            />
          )}
        </FormField>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label={t("credits.grantDialog.amount")}
            hint={t("credits.grantDialog.amountHint")}
            error={show("amount")}
            required
          >
            {(c) => (
              <Input
                {...c}
                inputMode="numeric"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  touch("amount");
                }}
                onBlur={() => touch("amount")}
              />
            )}
          </FormField>
          <FormField
            label={t("credits.grantDialog.rate")}
            hint={t("credits.grantDialog.rateHint")}
            error={show("rate")}
          >
            {(c) => (
              <Input
                {...c}
                inputMode="decimal"
                value={rate}
                onChange={(e) => {
                  setRate(e.target.value);
                  touch("rate");
                }}
                onBlur={() => touch("rate")}
              />
            )}
          </FormField>
          <FormField label={t("credits.grantDialog.grantedAt")} error={show("grantedAt")} required>
            {(c) => (
              <Input
                {...c}
                type="date"
                max={today}
                value={grantedAt}
                onChange={(e) => {
                  setGrantedAt(e.target.value);
                  touch("grantedAt");
                }}
                onBlur={() => touch("grantedAt")}
              />
            )}
          </FormField>
          <FormField
            label={t("credits.grantDialog.count")}
            hint={t("credits.grantDialog.countHint")}
            error={show("count")}
            required
          >
            {(c) => (
              <Input
                {...c}
                inputMode="numeric"
                value={count}
                onChange={(e) => {
                  setCount(e.target.value);
                  touch("count");
                }}
                onBlur={() => touch("count")}
              />
            )}
          </FormField>
          <FormField label={t("credits.grantDialog.firstDue")} error={show("firstDue")} required>
            {(c) => (
              <Input
                {...c}
                type="date"
                value={firstDue}
                onChange={(e) => {
                  setFirstDue(e.target.value);
                  touch("firstDue");
                }}
                onBlur={() => touch("firstDue")}
              />
            )}
          </FormField>
          <FormField label={t("credits.grantDialog.every")}>
            {(c) => (
              <Select value={every} onValueChange={setEvery}>
                <SelectTrigger {...c}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {t("credits.grantDialog.every.autre", { count: n })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </FormField>
        </div>

        <section
          className="rounded-md border bg-muted/50 p-3"
          aria-labelledby="credit-preview-title"
          data-testid="credit-preview"
        >
          <h3 id="credit-preview-title" className="text-sm font-semibold">
            {t("credits.grantDialog.preview.title")}
          </h3>
          {schedule.length ? (
            <>
              <ol className="mt-2 divide-y text-sm">
                {schedule.map((i, n) => (
                  <li key={i.id} className="flex items-center justify-between gap-3 py-1.5">
                    <span>
                      <span className="font-medium">
                        {t("credits.grantDialog.preview.line", { n: n + 1 })}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {day(i.dueDate, "long")}
                      </span>
                    </span>
                    <span className="whitespace-nowrap font-semibold tabular">
                      {money(i.amount)}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-2 flex items-center justify-between gap-3 border-t pt-2 text-sm font-semibold">
                <span>{t("credits.grantDialog.preview.total")}</span>
                <span className="tabular" data-testid="credit-preview-total">
                  {money(totalDue(input))}
                </span>
              </p>
            </>
          ) : (
            <p className="mt-1 text-sm text-muted-foreground">
              {t("credits.grantDialog.preview.empty")}
            </p>
          )}
        </section>
      </div>
    </FormDialog>
  );
}
