import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, KeyRound, Pencil, Search, ShieldOff, UserPlus, Users } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { EmptyState, Field, PageHeader, Pill } from "@/components/app/ui-bits";
import { FilterPill } from "@/components/app/FilterPill";
import { FormDialog } from "@/components/app/FormDialog";
import { FormField } from "@/components/app/FormField";
import { RowActions } from "@/components/app/RowActions";
import {
  MemberProfileFields,
  parseAge,
  type MemberProfileValues,
} from "@/components/app/MemberProfileFields";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { actions, can, useStore, useScoops } from "@/lib/store";
import { canReadDocument, inScope, scopedMembers } from "@/lib/scope";
import { MEMBERSHIP_STATUSES, type Member, type MembershipStatus } from "@/lib/mock/cooperative";
import type { RoleId } from "@/lib/permissions";
import { accountBlocker, assignableRoles } from "@/lib/team";
import { memberDues, type DueState } from "@/lib/contributions";
import { fmtDate, maskPhone, nf } from "@/lib/format";
import { useI18n, type MessageKey } from "@/lib/i18n";

export const Route = createFileRoute("/equipe")({
  validateSearch: (s: Record<string, unknown>) => ({
    scoop: typeof s["scoop"] === "string" ? (s["scoop"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Équipe · Mbay Diaay" },
      {
        name: "description",
        content:
          "Les membres de la coopérative, producteurs ou non, leur statut et leur accès à l'application.",
      },
      { property: "og:title", content: "Équipe · Mbay Diaay" },
      { property: "og:description", content: "Membres et accès de la coopérative." },
    ],
  }),
  component: TeamRoute,
});

function TeamRoute() {
  const { t } = useI18n();
  return (
    <AppShell perm="member.read" area={t("equipe.area")}>
      <Team />
    </AppShell>
  );
}

const TONE: Record<MembershipStatus, "success" | "info" | "warning" | "neutral"> = {
  membre: "success",
  candidat: "info",
  suspendu: "warning",
  sorti: "neutral",
};
const STATUS_LABEL: Record<MembershipStatus, MessageKey> = {
  membre: "equipe.status.membre",
  candidat: "equipe.status.candidat",
  suspendu: "equipe.status.suspendu",
  sorti: "equipe.status.sorti",
};
const ALL = "tous";
const DUE_TONE: Record<DueState, "success" | "warning" | "danger" | "neutral"> = {
  "à jour": "success",
  "en retard": "warning",
  "jamais payé": "danger",
  "non exigible": "neutral",
};

function Team() {
  const { t, tEnum } = useI18n();
  const g = Route.useSearch();
  const session = useStore((s) => s.session);
  const members = useStore((s) => s.members);
  const producers = useStore((s) => s.producers);
  const orgs = useStore((s) => s.orgs);
  const users = useStore((s) => s.users);
  const [status, setStatus] = useState<MembershipStatus | typeof ALL>(ALL);
  const [q, setQ] = useState("");
  const [openId, setOpenId] = useState<string | undefined>();
  const [addOpen, setAddOpen] = useState(false);
  const [statusFor, setStatusFor] = useState<Member | null>(null);
  const canManage = can(session, "member.manage");

  const mine = useMemo(
    () => scopedMembers(members, session).filter((m) => !g.scoop || m.scoopId === g.scoop),
    [members, session, g.scoop],
  );
  const needle = q.trim().toLowerCase();
  const shown = mine.filter(
    (m) =>
      (status === ALL || m.status === status) &&
      (!needle || `${m.firstName} ${m.lastName} ${m.email}`.toLowerCase().includes(needle)),
  );
  const producerOf = (m: Member) => producers.find((p) => p.id === m.producerId);
  const orgOf = (m: Member) => orgs.find((o) => o.id === m.orgId);
  const userOf = (m: Member) => users.find((u) => u.memberId === m.id);
  const open = openId ? members.find((m) => m.id === openId) : undefined;

  return (
    <>
      <PageHeader
        eyebrow={t("equipe.eyebrow")}
        title={t("equipe.title")}
        description={t("equipe.description")}
        actions={
          canManage ? (
            <Button onClick={() => setAddOpen(true)}>
              <UserPlus className="size-4" />
              {t("equipe.add")}
            </Button>
          ) : undefined
        }
      />

      <div className="surface mb-3 p-3">
        <div className="flex flex-wrap items-center gap-2">
          <FilterPill active={status === ALL} onClick={() => setStatus(ALL)} count={mine.length}>
            {t("equipe.filter.all")}
          </FilterPill>
          {MEMBERSHIP_STATUSES.map((s) => (
            <FilterPill
              key={s}
              active={status === s}
              onClick={() => setStatus(status === s ? ALL : s)}
              count={mine.filter((m) => m.status === s).length}
              tone={s === "membre" ? "success" : s === "suspendu" ? "warning" : "neutral"}
            >
              {t(STATUS_LABEL[s])}
            </FilterPill>
          ))}
          <div className="relative ml-auto w-full sm:w-64">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              aria-label={t("equipe.search.aria")}
              placeholder={t("equipe.search.placeholder")}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </div>

      <div className="surface overflow-x-auto">
        {shown.length ? (
          <table className="w-full text-sm">
            <thead className="border-b bg-muted text-left text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">{t("equipe.col.member")}</th>
                <th className="font-semibold">{t("equipe.col.status")}</th>
                <th className="hidden font-semibold md:table-cell">{t("equipe.col.org")}</th>
                <th className="hidden font-semibold sm:table-cell">{t("equipe.col.producer")}</th>
                <th className="font-semibold">{t("equipe.col.access")}</th>
                <th className="w-12 pr-4" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {shown.map((m) => {
                const user = userOf(m);
                const producer = producerOf(m);
                return (
                  <tr
                    key={m.id}
                    tabIndex={0}
                    onClick={() => setOpenId(m.id)}
                    onKeyDown={(e) => e.key === "Enter" && setOpenId(m.id)}
                    className="cursor-pointer hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:outline-none"
                  >
                    <td className="px-4 py-2.5">
                      <div className="font-semibold">
                        {m.firstName} {m.lastName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {m.email || t("equipe.noEmail")}
                      </div>
                    </td>
                    <td>
                      <Pill tone={TONE[m.status]}>{t(STATUS_LABEL[m.status])}</Pill>
                    </td>
                    <td className="hidden md:table-cell">
                      {orgOf(m)?.name ?? t("equipe.directMember")}
                    </td>
                    <td className="hidden sm:table-cell">
                      {producer ? (
                        <Link
                          to="/producteurs/$id"
                          params={{ id: producer.id }}
                          onClick={(e) => e.stopPropagation()}
                          className="font-medium text-primary hover:underline"
                        >
                          {producer.code}
                        </Link>
                      ) : (
                        <span className="text-muted-foreground">{t("equipe.notProducer")}</span>
                      )}
                    </td>
                    <td>
                      {user ? (
                        <span className={user.active ? "" : "text-muted-foreground"}>
                          {tEnum("role", user.role)}
                          {!user.active && <> {t("equipe.closed")}</>}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">{t("equipe.noAccess")}</span>
                      )}
                    </td>
                    <td className="pr-4 text-right">
                      <RowActions
                        title={`${m.firstName} ${m.lastName}`}
                        items={[
                          {
                            label: t("equipe.row.open"),
                            icon: ExternalLink,
                            onSelect: () => setOpenId(m.id),
                          },
                          {
                            label: t("equipe.row.changeStatus"),
                            icon: Users,
                            perm: "member.manage",
                            onSelect: () => setStatusFor(m),
                          },
                        ]}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <EmptyState icon={Users} title={t("equipe.empty.title")}>
            {mine.length ? t("equipe.empty.filtered") : t("equipe.empty.none")}
          </EmptyState>
        )}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {t("equipe.count", { shown: nf.format(shown.length), total: nf.format(mine.length) })}
      </p>

      <MemberSheet member={open} onClose={() => setOpenId(undefined)} onStatus={setStatusFor} />
      <AddMemberDialog open={addOpen} onOpenChange={setAddOpen} defaultScoopId={g.scoop} />
      <StatusDialog member={statusFor} onClose={() => setStatusFor(null)} />
    </>
  );
}

/** Fiche d'un membre : identité, statut, producteur lié, accès à l'application. */
function MemberSheet({
  member,
  onClose,
  onStatus,
}: {
  member: Member | undefined;
  onClose: () => void;
  onStatus: (m: Member) => void;
}) {
  const allScoops = useScoops();
  const { t, tEnum } = useI18n();
  const session = useStore((s) => s.session);
  const orgs = useStore((s) => s.orgs);
  const producers = useStore((s) => s.producers);
  const users = useStore((s) => s.users);
  const [role, setRole] = useState<RoleId | "">("");
  const [editOpen, setEditOpen] = useState(false);
  const roles = session ? assignableRoles(session.role) : [];
  const user = member ? users.find((u) => u.memberId === member.id) : undefined;
  const producer = member ? producers.find((p) => p.id === member.producerId) : undefined;
  const blocker = member ? accountBlocker(member) : null;
  const manageAccess = roles.length > 0 && can(session, "role.assign");
  const chosen = role || (user && roles.includes(user.role) ? user.role : "");

  return (
    <Sheet open={!!member} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        {member && (
          <>
            <SheetHeader>
              <SheetTitle>
                {member.firstName} {member.lastName}
              </SheetTitle>
            </SheetHeader>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {can(session, "member.manage") && (
                <Button variant="outline" size="sm" onClick={() => onStatus(member)}>
                  {t("equipe.sheet.changeStatus")}
                </Button>
              )}
            </div>
            <MemberOverview member={member} />

            <section className="mt-6 border-t pt-4" aria-labelledby="identite-title">
              <div className="flex items-center justify-between gap-2">
                <h3 id="identite-title" className="font-semibold">
                  {t("equipe.sheet.identity")}
                </h3>
                {can(session, "member.manage") && (
                  <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
                    <Pencil className="size-4" />
                    {t("equipe.edit.open")}
                  </Button>
                )}
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-4 text-sm">
                <Field label={t("equipe.sheet.sex")}>{tEnum("equipe.sheet.sex", member.sex)}</Field>
                <Field label={t("equipe.sheet.age")}>
                  {member.age === null
                    ? t("equipe.sheet.notSet")
                    : t("equipe.sheet.ageValue.autre", { count: member.age })}
                </Field>
                <Field label={t("equipe.sheet.village")}>
                  {member.village || t("equipe.sheet.notSet")}
                </Field>
                <Field label={t("equipe.sheet.handicap")}>
                  {member.handicap ? t("equipe.sheet.yes") : t("equipe.sheet.no")}
                </Field>
                <Field label={t("equipe.sheet.phone")}>
                  {member.phone ? maskPhone(member.phone) : t("equipe.sheet.notSet")}
                </Field>
                <Field label={t("equipe.sheet.scoop")}>
                  {allScoops.find((s) => s.id === member.scoopId)?.name ?? t("equipe.sheet.notSet")}
                </Field>
                <Field label={t("equipe.sheet.org")}>
                  {orgs.find((o) => o.id === member.orgId)?.name ?? t("equipe.directMember")}
                </Field>
                <Field label={t("equipe.sheet.joined")}>
                  {member.joinedAt ? fmtDate(member.joinedAt) : t("equipe.sheet.notMember")}
                </Field>
                <Field label={t("equipe.sheet.email")}>
                  <span className="break-all">{member.email || t("equipe.sheet.notSet")}</span>
                </Field>
              </dl>
            </section>

            <section className="mt-6 border-t pt-4" aria-labelledby="acces-title">
              <h3 id="acces-title" className="font-semibold">
                {t("equipe.sheet.access.title")}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {user
                  ? t(user.active ? "equipe.sheet.access.open" : "equipe.sheet.access.closed", {
                      role: tEnum("role", user.role),
                    })
                  : t("equipe.sheet.access.none")}
              </p>
              {manageAccess ? (
                blocker ? (
                  <p className="mt-3 rounded-md bg-warning-bg p-3 text-sm text-warning-fg">
                    {blocker}
                  </p>
                ) : (
                  <div className="mt-3 space-y-3">
                    <FormField label={t("equipe.sheet.role")}>
                      {(c) => (
                        <Select value={chosen} onValueChange={(v) => setRole(v as RoleId)}>
                          <SelectTrigger id={c.id}>
                            <SelectValue placeholder={t("equipe.sheet.rolePlaceholder")} />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((r) => (
                              <SelectItem key={r} value={r}>
                                {tEnum("role", r)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </FormField>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        disabled={!chosen || (user?.active === true && user.role === chosen)}
                        onClick={() => {
                          if (!chosen) return;
                          const res = actions.grantAccess(member.id, chosen);
                          if (res.ok) toast.success(t("equipe.sheet.granted"));
                          else toast.error(res.error);
                        }}
                      >
                        <KeyRound className="size-4" />
                        {user?.active ? t("equipe.sheet.changeRole") : t("equipe.sheet.grant")}
                      </Button>
                      {user?.active && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            const res = actions.revokeAccess(member.id);
                            if (res.ok) toast.success(t("equipe.sheet.revoked"));
                            else toast.error(res.error);
                          }}
                        >
                          <ShieldOff className="size-4" />
                          {t("equipe.sheet.revoke")}
                        </Button>
                      )}
                    </div>
                  </div>
                )
              ) : (
                <p className="mt-3 text-xs text-muted-foreground">
                  {t("equipe.sheet.cannotManage")}
                </p>
              )}
            </section>

            <section className="mt-6 border-t pt-4" aria-labelledby="hist-title">
              <h3 id="hist-title" className="font-semibold">
                {t("equipe.sheet.history")}
              </h3>
              {member.history.length ? (
                <ul className="mt-2 divide-y text-sm">
                  {member.history.map((h, i) => (
                    <li key={i} className="py-2">
                      <div className="font-medium">{h.action}</div>
                      <div className="text-xs text-muted-foreground">
                        {h.by} · {fmtDate(h.at)}
                        {h.comment ? ` · ${h.comment}` : ""}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">{t("equipe.sheet.noHistory")}</p>
              )}
            </section>
          </>
        )}
      </SheetContent>
      <EditMemberDialog member={editOpen ? member : undefined} onClose={() => setEditOpen(false)} />
    </Sheet>
  );
}

/** Vue d'ensemble : statut, producteur lié, compte, cotisation, présence aux réunions, documents. Chaque ligne suit les droits. */
function MemberOverview({ member }: { member: Member }) {
  const { t, tEnum } = useI18n();
  const session = useStore((s) => s.session);
  const producers = useStore((s) => s.producers);
  const users = useStore((s) => s.users);
  const rules = useStore((s) => s.contributionRules);
  const payments = useStore((s) => s.payments);
  const meetings = useStore((s) => s.meetings);
  const documents = useStore((s) => s.documents);
  const producer = producers.find((p) => p.id === member.producerId);
  const user = users.find((u) => u.memberId === member.id);
  const showDues = can(session, "contribution.read");
  const showMeetings = can(session, "meeting.read");
  const showDocs = can(session, "document.read");

  const dues = useMemo(
    () =>
      showDues
        ? memberDues(
            member,
            rules.find((r) => r.scoopId === member.scoopId),
            payments,
            new Date().toISOString(),
          )
        : null,
    [showDues, member, rules, payments],
  );
  const attendance = useMemo(() => {
    if (!showMeetings || !member.joinedAt) return { held: 0, present: 0 };
    const since = new Date(member.joinedAt).getTime();
    const held = meetings.filter(
      (m) =>
        m.scoopId === member.scoopId && m.status === "tenue" && new Date(m.date).getTime() >= since,
    );
    return {
      held: held.length,
      present: held.filter((m) => m.presentIds.includes(member.id)).length,
    };
  }, [showMeetings, member, meetings]);
  const docs = useMemo(
    () =>
      showDocs
        ? documents.filter(
            (d) =>
              d.ownerType === "membre" && d.ownerId === member.id && canReadDocument(session, d),
          )
        : [],
    [showDocs, documents, member.id, session],
  );

  return (
    <section className="mt-5 rounded-md border p-4" aria-labelledby="overview-title">
      <h3 id="overview-title" className="font-semibold">
        {t("equipe.sheet.overview")}
      </h3>
      <dl className="mt-3 grid grid-cols-2 gap-4 text-sm">
        <Field label={t("equipe.sheet.status")}>
          <Pill tone={TONE[member.status]}>{t(STATUS_LABEL[member.status])}</Pill>
        </Field>
        <Field label={t("equipe.sheet.account")}>
          {user ? (
            <span className={user.active ? "" : "text-muted-foreground"}>
              {tEnum("role", user.role)}
              {!user.active && <> {t("equipe.closed")}</>}
            </span>
          ) : (
            <span className="text-muted-foreground">{t("equipe.sheet.account.none")}</span>
          )}
        </Field>
        <Field label={t("equipe.sheet.producer")}>
          {producer ? (
            <Link
              to="/producteurs/$id"
              params={{ id: producer.id }}
              className="text-primary hover:underline"
            >
              {producer.firstName} {producer.lastName} ({producer.code})
            </Link>
          ) : (
            <span className="text-muted-foreground">{t("equipe.notProducer")}</span>
          )}
        </Field>
      </dl>

      {dues && (
        <div className="mt-4 border-t pt-3 text-sm" data-testid="member-dues">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold">{t("equipe.dues.title")}</span>
            <Pill tone={DUE_TONE[dues.state]}>{tEnum("equipe.dues.state", dues.state)}</Pill>
          </div>
          {dues.expected > 0 && (
            <p className="mt-1 text-muted-foreground">
              {dues.balance > 0
                ? t("equipe.dues.balance", { amount: nf.format(dues.balance) })
                : t("equipe.dues.paid", {
                    paid: nf.format(dues.paid),
                    expected: nf.format(dues.expected),
                  })}
            </p>
          )}
          <Link
            to="/cotisations"
            search={{ scoop: member.scoopId }}
            className="mt-1 inline-block font-semibold text-primary hover:underline"
          >
            {t("equipe.dues.open")}
          </Link>
        </div>
      )}

      {showMeetings && (
        <div className="mt-4 border-t pt-3 text-sm" data-testid="member-meetings">
          <div className="font-semibold">{t("equipe.meetings.title")}</div>
          <p className="mt-1 text-muted-foreground">
            {attendance.held
              ? t("equipe.meetings.present.autre", {
                  count: attendance.held,
                  present: attendance.present,
                })
              : t("equipe.meetings.none")}
          </p>
        </div>
      )}

      {showDocs && (
        <div className="mt-4 border-t pt-3 text-sm" data-testid="member-docs">
          <div className="font-semibold">{t("equipe.docs.title")}</div>
          {docs.length ? (
            <ul className="mt-1 divide-y">
              {docs.map((d) => (
                <li key={d.id} className="py-1.5">
                  <div className="font-medium">{d.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {tEnum("equipe.docs.kind", d.kind)} · {fmtDate(d.uploadedAt)}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-muted-foreground">{t("equipe.docs.none")}</p>
          )}
        </div>
      )}
    </section>
  );
}

function EditMemberDialog({
  member,
  onClose,
}: {
  member: Member | undefined;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const [f, setF] = useState<MemberProfileValues | null>(null);
  const values: MemberProfileValues = f ?? {
    age: member?.age === null || member === undefined ? "" : String(member.age),
    handicap: member?.handicap ?? false,
    village: member?.village ?? "",
  };
  const age = parseAge(values.age);
  const close = () => {
    setF(null);
    onClose();
  };
  return (
    <FormDialog
      open={!!member}
      onOpenChange={(o) => !o && close()}
      title={t("equipe.edit.title")}
      description={t("equipe.edit.description", {
        name: member ? `${member.firstName} ${member.lastName}` : "",
      })}
      submitLabel={t("equipe.edit.submit")}
      submitDisabled={!age.ok}
      onSubmit={() => {
        if (!member || !age.ok) return;
        actions.updateMember(member.id, {
          age: age.value,
          handicap: values.handicap,
          village: values.village.trim(),
        });
        toast.success(t("equipe.edit.done"));
        close();
      }}
    >
      <MemberProfileFields values={values} onChange={(p) => setF({ ...values, ...p })} />
    </FormDialog>
  );
}

function AddMemberDialog({
  open,
  onOpenChange,
  defaultScoopId,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  /** Coopérative choisie dans le filtre de la page, proposée d'office. */
  defaultScoopId?: string | undefined;
}) {
  const allScoops = useScoops();
  const { t } = useI18n();
  const session = useStore((s) => s.session);
  const orgs = useStore((s) => s.orgs);
  const scoops = allScoops.filter(
    (s) => !s.archived && inScope([{ scoopId: s.id }], session).length === 1,
  );
  // Avec plusieurs coopératives, on choisit : aucune n'est devinée (sauf celle du filtre de la page).
  const initialScoop =
    defaultScoopId && scoops.some((s) => s.id === defaultScoopId)
      ? defaultScoopId
      : scoops.length === 1
        ? scoops[0]!.id
        : "";
  const empty = {
    firstName: "",
    lastName: "",
    sex: "F" as "F" | "H",
    phone: "",
    email: "",
    scoopId: initialScoop,
    orgId: "",
    status: "membre" as MembershipStatus,
    age: "",
    handicap: false,
    village: "",
  };
  const [f, setF] = useState(empty);
  const emailErr =
    f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())
      ? t("equipe.add.emailFormat")
      : "";
  const ok =
    f.firstName.trim() && f.lastName.trim() && f.scoopId && !emailErr && parseAge(f.age).ok;
  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((x) => ({ ...x, [k]: v }));

  return (
    <FormDialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setF(empty);
      }}
      title={t("equipe.add.title")}
      description={t("equipe.add.description")}
      submitLabel={t("equipe.add.submit")}
      submitDisabled={!ok}
      onSubmit={() => {
        actions.addMember({
          scoopId: f.scoopId,
          orgId: f.orgId || null,
          firstName: f.firstName.trim(),
          lastName: f.lastName.trim(),
          sex: f.sex,
          phone: f.phone.trim(),
          email: f.email.trim(),
          status: f.status,
          producerId: null,
          age: parseAge(f.age).value,
          handicap: f.handicap,
          village: f.village.trim(),
        });
        toast.success(t("equipe.add.done"));
        setF(empty);
        onOpenChange(false);
      }}
    >
      {scoops.length > 1 && (
        <FormField label={t("equipe.add.scoop")} required>
          {(c) => (
            <Select
              value={f.scoopId}
              onValueChange={(v) => setF((x) => ({ ...x, scoopId: v, orgId: "" }))}
            >
              <SelectTrigger id={c.id}>
                <SelectValue placeholder={t("equipe.add.scoopPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {scoops.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </FormField>
      )}
      <div className="grid grid-cols-2 gap-3">
        <FormField label={t("equipe.add.firstName")} required>
          {(c) => (
            <Input {...c} value={f.firstName} onChange={(e) => set("firstName", e.target.value)} />
          )}
        </FormField>
        <FormField label={t("equipe.add.lastName")} required>
          {(c) => (
            <Input {...c} value={f.lastName} onChange={(e) => set("lastName", e.target.value)} />
          )}
        </FormField>
      </div>
      <FormField
        label={t("equipe.add.email")}
        hint={t("equipe.add.emailHint")}
        error={emailErr || undefined}
      >
        {(c) => (
          <Input
            {...c}
            type="email"
            value={f.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder={t("equipe.example.email")}
          />
        )}
      </FormField>
      <FormField label={t("equipe.add.phone")}>
        {(c) => (
          <Input
            {...c}
            value={f.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder={t("equipe.example.phone")}
          />
        )}
      </FormField>
      <div className="grid grid-cols-2 gap-3">
        <FormField label={t("equipe.add.sex")}>
          {(c) => (
            <Select value={f.sex} onValueChange={(v) => set("sex", v as "F" | "H")}>
              <SelectTrigger id={c.id}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="F">{t("equipe.add.female")}</SelectItem>
                <SelectItem value="H">{t("equipe.add.male")}</SelectItem>
              </SelectContent>
            </Select>
          )}
        </FormField>
        <FormField label={t("equipe.add.status")}>
          {(c) => (
            <Select value={f.status} onValueChange={(v) => set("status", v as MembershipStatus)}>
              <SelectTrigger id={c.id}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="membre">{t("equipe.status.membre")}</SelectItem>
                <SelectItem value="candidat">{t("equipe.status.candidat")}</SelectItem>
              </SelectContent>
            </Select>
          )}
        </FormField>
      </div>
      <MemberProfileFields values={f} onChange={(p) => setF((x) => ({ ...x, ...p }))} />
      <FormField label={t("equipe.add.org")} hint={t("equipe.add.orgHint")}>
        {(c) => (
          <Select
            value={f.orgId || "__none"}
            onValueChange={(v) => set("orgId", v === "__none" ? "" : v)}
          >
            <SelectTrigger id={c.id}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__none">{t("equipe.directMember")}</SelectItem>
              {orgs
                .filter((o) => o.scoopId === f.scoopId)
                .map((o) => (
                  <SelectItem key={o.id} value={o.id}>
                    {o.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        )}
      </FormField>
    </FormDialog>
  );
}

function StatusDialog({ member, onClose }: { member: Member | null; onClose: () => void }) {
  const { t } = useI18n();
  const [next, setNext] = useState<MembershipStatus | "">("");
  const [comment, setComment] = useState("");
  const needsReason = next === "suspendu" || next === "sorti";
  const reset = () => {
    setNext("");
    setComment("");
    onClose();
  };
  return (
    <FormDialog
      open={!!member}
      onOpenChange={(o) => !o && reset()}
      title={
        member
          ? t("equipe.statusDialog.title", { name: `${member.firstName} ${member.lastName}` })
          : t("equipe.statusDialog.titleNone")
      }
      description={t("equipe.statusDialog.description")}
      submitLabel={t("equipe.statusDialog.submit")}
      submitDisabled={
        !next || next === member?.status || (needsReason && comment.trim().length < 5)
      }
      destructive={needsReason}
      onSubmit={() => {
        if (!member || !next) return;
        actions.setMembershipStatus(member.id, next, comment.trim() || undefined);
        toast.success(t("equipe.statusDialog.done"));
        reset();
      }}
    >
      <FormField label={t("equipe.statusDialog.next")} required>
        {(c) => (
          <Select value={next} onValueChange={(v) => setNext(v as MembershipStatus)}>
            <SelectTrigger id={c.id}>
              <SelectValue placeholder={t("equipe.statusDialog.choose")} />
            </SelectTrigger>
            <SelectContent>
              {MEMBERSHIP_STATUSES.filter((s) => s !== member?.status).map((s) => (
                <SelectItem key={s} value={s}>
                  {t(STATUS_LABEL[s])}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </FormField>
      <FormField
        label={t("equipe.statusDialog.reason")}
        required={needsReason}
        hint={needsReason ? t("equipe.statusDialog.reasonHint") : undefined}
      >
        {(c) => (
          <Textarea
            {...c}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t("equipe.statusDialog.reasonPlaceholder")}
          />
        )}
      </FormField>
    </FormDialog>
  );
}
