import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Check,
  ExternalLink,
  Link2,
  Link2Off,
  Search,
  Smartphone,
  UserCog,
  UserRoundSearch,
  Users,
  X,
  ScrollText,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { EmptyState, PageHeader, Pill } from "@/components/app/ui-bits";
import { FormDialog } from "@/components/app/FormDialog";
import { RowActions } from "@/components/app/RowActions";
import { StatToggle } from "@/components/app/StatToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { actions, inScope, useStore, type AppUser, useScoops } from "@/lib/store";
import { type Producer } from "@/lib/mock/data";
import { fmtDateTime, maskPhone } from "@/lib/format";
import { useI18n } from "@/lib/i18n";

type Vue = "a-rapprocher" | "candidats" | "liees";

export const Route = createFileRoute("/comptes")({
  validateSearch: (s: Record<string, unknown>) => ({
    vue:
      s["vue"] === "a-rapprocher" || s["vue"] === "liees" || s["vue"] === "candidats"
        ? (s["vue"] as Vue)
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Comptes & liaisons · Mbay Diaay" },
      {
        name: "description",
        content:
          "Liaison entre comptes utilisateurs et fiches producteurs : comptes à rapprocher, correspondances candidates et liaisons confirmées.",
      },
      { property: "og:title", content: "Comptes & liaisons · Mbay Diaay" },
      {
        property: "og:description",
        content: "Liaison explicite entre comptes et fiches producteurs.",
      },
    ],
  }),
  component: ComptesRoute,
});

function ComptesRoute() {
  const { t } = useI18n();
  return (
    <AppShell perm="account.manage" area={t("comptes.area")}>
      <ComptesPage />
    </AppShell>
  );
}

function scorePill(score: number) {
  return (
    <Pill tone={score >= 80 ? "success" : score >= 60 ? "warning" : "neutral"}>{score} %</Pill>
  );
}

function ComptesPage() {
  const allScoops = useScoops();
  const { t, tEnum } = useI18n();
  const SCOOP_NAME = (id?: string) =>
    allScoops.find((s) => s.id === id)?.name ?? t("comptes.unknown");
  const search = Route.useSearch();
  const navigate = useNavigate();
  const users = useStore((s) => s.users);
  const candidates = useStore((s) => s.linkCandidates);
  const links = useStore((s) => s.links);
  const producers = useStore((s) => s.producers);
  const orgs = useStore((s) => s.orgs);
  const [q, setQ] = useState("");
  const [pending, setPending] = useState<{ user: AppUser; producer: Producer } | null>(null);
  const [unlinkId, setUnlinkId] = useState<string | null>(null);
  const prod = (id: string) => producers.find((p) => p.id === id);
  const user = (id: string) => users.find((u) => u.id === id);

  const unmatched = users.filter(
    (u) => !links.some((l) => l.userId === u.id) && !candidates.some((c) => c.userId === u.id),
  );
  const vue: Vue =
    search.vue ?? (candidates.length ? "candidats" : unmatched.length ? "a-rapprocher" : "liees");
  const setVue = (v: Vue) => void navigate({ to: "/comptes", search: { vue: v }, replace: true });

  const needle = q.trim().toLowerCase();
  const hit = (...hay: (string | undefined)[]) =>
    !needle || hay.some((h) => (h ?? "").toLowerCase().includes(needle));
  const cands = candidates.filter((c) => {
    const u = user(c.userId);
    const p = prod(c.producerId);
    return hit(u?.name, p?.code, p && `${p.firstName} ${p.lastName}`);
  });
  const linked = links.filter((l) => {
    const u = user(l.userId);
    const p = prod(l.producerId);
    return hit(u?.name, p?.code, p && `${p.firstName} ${p.lastName}`);
  });
  const toMatch = unmatched.filter((u) =>
    hit(u.name, tEnum("role", u.role), SCOOP_NAME(u.scoopId)),
  );
  const unlinkTarget = unlinkId ? links.find((l) => l.id === unlinkId) : undefined;

  const confirm = (userId: string, producerId: string) => {
    actions.confirmLink(userId, producerId);
    toast.success(t("comptes.toast.confirmed"), {
      description: t("comptes.toast.confirmedDesc"),
    });
  };

  return (
    <>
      <PageHeader
        eyebrow={t("comptes.eyebrow")}
        title={t("comptes.title")}
        description={t("comptes.description")}
      />

      <StatToggle<Vue>
        label={t("comptes.views")}
        value={vue}
        onChange={setVue}
        options={[
          {
            key: "a-rapprocher",
            label: t("comptes.view.toMatch"),
            value: unmatched.length,
            hint: t("comptes.view.toMatch.hint"),
            icon: UserRoundSearch,
            tone: "info",
          },
          {
            key: "candidats",
            label: t("comptes.view.candidates"),
            value: candidates.length,
            hint: t("comptes.view.candidates.hint"),
            icon: Sparkles,
            tone: "warning",
          },
          {
            key: "liees",
            label: t("comptes.view.linked"),
            value: links.length,
            hint: t("comptes.view.linked.hint"),
            icon: Link2,
            tone: "success",
          },
        ]}
      />

      <div className="relative mb-3 max-w-sm">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-8"
          aria-label={t("comptes.search")}
          placeholder={t("comptes.search")}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {vue === "a-rapprocher" && (
        <div className="surface overflow-x-auto">
          <div className="border-b bg-muted/40 px-4 py-3">
            <h2 className="text-sm font-semibold">{t("comptes.identity.title")}</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">{t("comptes.identity.hint")}</p>
          </div>
          {toMatch.length ? (
            <table className="w-full text-sm">
              <thead className="border-b bg-muted text-left text-xs text-muted-foreground">
                <tr>
                  <th className="py-3 pl-4 font-semibold">{t("comptes.col.account")}</th>
                  <th className="font-semibold">{t("comptes.col.role")}</th>
                  <th className="font-semibold">{t("comptes.col.scope")}</th>
                  <th className="font-semibold">{t("comptes.col.state")}</th>
                  <th className="pr-4 text-right font-semibold">{t("comptes.col.matching")}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {toMatch.map((u) => (
                  <tr key={u.id} className="hover:bg-muted/40">
                    <td className="py-3 pl-4">
                      <div className="font-medium">{u.name}</div>
                      <div className="text-xs text-muted-foreground">{u.email}</div>
                      <div className="text-xs text-muted-foreground tabular">
                        {maskPhone(u.phone)}
                      </div>
                    </td>
                    <td>{tEnum("role", u.role)}</td>
                    <td className="text-muted-foreground">
                      {u.scoopId ? SCOOP_NAME(u.scoopId) : t("comptes.scopeAll")}
                    </td>
                    <td>
                      {u.active ? (
                        <Pill tone="success">{t("comptes.state.active")}</Pill>
                      ) : (
                        <Pill tone="neutral">{t("comptes.state.inactive")}</Pill>
                      )}
                    </td>
                    <td className="pr-4 text-right">
                      <ProducerPicker onPick={(p) => setPending({ user: u, producer: p })} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <EmptyState
              icon={UserRoundSearch}
              title={needle ? t("comptes.empty.noAccount") : t("comptes.empty.allMatched")}
            >
              {needle ? t("comptes.empty.editSearch") : t("comptes.empty.allMatchedDesc")}
            </EmptyState>
          )}
        </div>
      )}

      {vue === "candidats" && (
        <div className="surface overflow-x-auto">
          {cands.length ? (
            <table className="w-full text-sm">
              <thead className="border-b bg-muted text-left text-xs text-muted-foreground">
                <tr>
                  <th className="py-3 pl-4 font-semibold">{t("comptes.col.account")}</th>
                  <th className="font-semibold">{t("comptes.col.candidate")}</th>
                  <th className="hidden font-semibold lg:table-cell">
                    {t("comptes.col.scoopOrg")}
                  </th>
                  <th className="font-semibold">{t("comptes.col.score")}</th>
                  <th className="hidden font-semibold xl:table-cell">{t("comptes.col.signals")}</th>
                  <th className="pr-4 text-right font-semibold">{t("comptes.col.decision")}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {cands.map((c) => {
                  const u = user(c.userId);
                  const p = prod(c.producerId);
                  const org = p ? orgs.find((o) => o.id === p.orgId) : undefined;
                  return (
                    <tr key={c.id} className="hover:bg-muted/40">
                      <td className="py-3 pl-4">
                        <div className="font-medium">{u?.name ?? t("comptes.unknown")}</div>
                        <div className="text-xs text-muted-foreground">
                          {tEnum("role", u?.role ?? "technicien")} · {maskPhone(u?.phone ?? "")}
                        </div>
                      </td>
                      <td>
                        {p ? (
                          <Link
                            to="/producteurs/$id"
                            params={{ id: p.id }}
                            className="font-medium hover:text-primary hover:underline"
                          >
                            {p.code} · {p.firstName} {p.lastName}
                          </Link>
                        ) : (
                          t("comptes.unknown")
                        )}
                      </td>
                      <td className="hidden text-muted-foreground lg:table-cell">
                        {p
                          ? `${SCOOP_NAME(p.scoopId)} · ${org?.name ?? t("comptes.unknown")}`
                          : t("comptes.unknown")}
                      </td>
                      <td>{scorePill(c.score)}</td>
                      <td className="hidden max-w-72 text-xs text-muted-foreground xl:table-cell">
                        {c.signals.join(" · ")}
                      </td>
                      <td className="pr-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <Button
                            size="sm"
                            className="h-8"
                            onClick={() => u && p && setPending({ user: u, producer: p })}
                          >
                            <Check className="size-4" /> {t("comptes.confirm")}
                          </Button>
                          <RowActions
                            title={u?.name}
                            items={[
                              {
                                label: t("comptes.action.producer"),
                                icon: ExternalLink,
                                to: "/producteurs/$id",
                                params: { id: c.producerId },
                                hidden: !p,
                              },
                              {
                                label: t("comptes.action.account"),
                                icon: UserCog,
                                to: "/utilisateurs",
                                perm: "user.manage",
                              },
                              {
                                label: t("comptes.action.devices"),
                                icon: Smartphone,
                                to: "/appareils",
                                search: { user: c.userId },
                                perm: "device.manage",
                              },
                              {
                                label: t("comptes.action.reject"),
                                icon: X,
                                danger: true,
                                onSelect: () => {
                                  actions.rejectLink(c.id);
                                  toast(t("comptes.toast.rejected"), {
                                    description: t("comptes.toast.rejectedDesc"),
                                  });
                                },
                              },
                            ]}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <EmptyState
              icon={Sparkles}
              title={needle ? t("comptes.empty.noProposal") : t("comptes.empty.noCandidate")}
              action={
                !needle && unmatched.length > 0 ? (
                  <Button variant="outline" onClick={() => setVue("a-rapprocher")}>
                    <UserRoundSearch className="size-4" />
                    {t("comptes.matchManually", { n: unmatched.length })}
                  </Button>
                ) : undefined
              }
            >
              {needle ? t("comptes.empty.editSearch") : t("comptes.empty.noCandidateDesc")}
            </EmptyState>
          )}
        </div>
      )}

      {vue === "liees" && (
        <div className="surface overflow-x-auto">
          {linked.length ? (
            <table className="w-full text-sm">
              <thead className="border-b bg-muted text-left text-xs text-muted-foreground">
                <tr>
                  <th className="py-3 pl-4 font-semibold">{t("comptes.col.account")}</th>
                  <th className="font-semibold">{t("comptes.col.linkedProducer")}</th>
                  <th className="font-semibold">{t("comptes.col.linkedOn")}</th>
                  <th className="hidden font-semibold md:table-cell">{t("comptes.col.by")}</th>
                  <th className="w-12 pr-4" />
                </tr>
              </thead>
              <tbody className="divide-y">
                {linked.map((l) => {
                  const u = user(l.userId);
                  const p = prod(l.producerId);
                  return (
                    <tr key={l.id} className="hover:bg-muted/40">
                      <td className="py-3 pl-4">
                        <div className="font-medium">{u?.name ?? t("comptes.unknown")}</div>
                        <div className="text-xs text-muted-foreground tabular">
                          {maskPhone(u?.phone ?? "")}
                        </div>
                      </td>
                      <td>
                        {p ? (
                          <Link
                            to="/producteurs/$id"
                            params={{ id: p.id }}
                            className="font-medium hover:text-primary hover:underline"
                          >
                            {p.code} · {p.firstName} {p.lastName}
                          </Link>
                        ) : (
                          t("comptes.unknown")
                        )}
                      </td>
                      <td className="whitespace-nowrap text-muted-foreground">
                        {fmtDateTime(l.linkedAt)}
                      </td>
                      <td className="hidden md:table-cell">{l.by}</td>
                      <td className="pr-4 text-right">
                        <RowActions
                          title={u?.name}
                          items={[
                            {
                              label: t("comptes.action.producer"),
                              icon: ExternalLink,
                              to: "/producteurs/$id",
                              params: { id: l.producerId },
                              hidden: !p,
                            },
                            {
                              label: t("comptes.action.devices"),
                              icon: Smartphone,
                              to: "/appareils",
                              search: { user: l.userId },
                              perm: "device.manage",
                            },
                            {
                              label: t("comptes.action.audit"),
                              icon: ScrollText,
                              to: "/audit",
                              search: { q: u?.name ?? "" },
                              perm: "audit.read",
                            },
                            {
                              label: t("comptes.action.unlink"),
                              icon: Link2Off,
                              danger: true,
                              onSelect: () => setUnlinkId(l.id),
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
            <EmptyState
              icon={Users}
              title={needle ? t("comptes.empty.noLink") : t("comptes.empty.noConfirmed")}
              action={
                !needle && candidates.length > 0 ? (
                  <Button variant="outline" onClick={() => setVue("candidats")}>
                    <Sparkles className="size-4" />
                    {t("comptes.examine", { n: candidates.length })}
                  </Button>
                ) : undefined
              }
            >
              {needle ? t("comptes.empty.editSearch") : t("comptes.empty.noConfirmedDesc")}
            </EmptyState>
          )}
        </div>
      )}

      <FormDialog
        open={!!pending}
        onOpenChange={(o) => !o && setPending(null)}
        title={t("comptes.dlg.link.title")}
        description={t("comptes.dlg.link.tail")}
        submitLabel={t("comptes.dlg.link.action")}
        onSubmit={() => {
          if (!pending) return;
          if (actions.linkManually(pending.user.id, pending.producer.id))
            toast.success(t("comptes.toast.created"), {
              description: `${pending.user.name} ↔ ${pending.producer.code}`,
            });
          else
            toast.error(t("comptes.toast.impossible"), {
              description: t("comptes.toast.impossibleDesc"),
            });
          setPending(null);
        }}
      >
        {pending && (
          <div className="space-y-3 rounded-md border p-4 text-sm">
            <div>
              <div className="text-xs text-muted-foreground">{t("comptes.dlg.link.account")}</div>
              <div className="font-semibold">{pending.user.name}</div>
              <div className="text-muted-foreground">
                {tEnum("role", pending.user.role)} ·{" "}
                {pending.user.scoopId ? SCOOP_NAME(pending.user.scoopId) : t("comptes.scopeAll")} ·{" "}
                {pending.user.active ? t("comptes.state.active") : t("comptes.state.inactive")}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">{t("comptes.dlg.link.sheet")}</div>
              <div className="font-semibold">
                {pending.producer.code} · {pending.producer.firstName} {pending.producer.lastName}
              </div>
              <div className="text-muted-foreground">{pending.producer.village}</div>
            </div>
          </div>
        )}
      </FormDialog>

      <AlertDialog open={!!unlinkTarget} onOpenChange={(o) => !o && setUnlinkId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("comptes.dlg.unlink.title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {unlinkTarget && (
                <>
                  {t("comptes.dlg.unlink.desc", {
                    name: user(unlinkTarget.userId)?.name ?? "",
                    code: prod(unlinkTarget.producerId)?.code ?? "",
                  })}
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("comptes.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (unlinkTarget) {
                  actions.unlinkLink(unlinkTarget.id);
                  toast(t("comptes.toast.removed"));
                }
                setUnlinkId(null);
              }}
            >
              {t("comptes.dlg.unlink.action")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

/** Recherche d'une fiche producteur libre (non fusionnée, non déjà liée) dans le périmètre de la session. */
function ProducerPicker({ onPick }: { onPick: (p: Producer) => void }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const session = useStore((s) => s.session);
  const producers = useStore((s) => s.producers);
  const links = useStore((s) => s.links);
  const hits = useMemo(() => {
    const n = q.trim().toLowerCase();
    if (n.length < 2) return [];
    const taken = new Set(links.map((l) => l.producerId));
    return inScope(producers, session)
      .filter(
        (p) =>
          !p.mergedInto &&
          !taken.has(p.id) &&
          `${p.firstName} ${p.lastName} ${p.code} ${p.village}`.toLowerCase().includes(n),
      )
      .slice(0, 20);
  }, [q, producers, links, session]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline" className="h-8">
          <UserRoundSearch className="size-4" />
          {t("comptes.picker.button")}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <Command shouldFilter={false}>
          <CommandInput
            aria-label={t("comptes.picker.placeholder")}
            placeholder={t("comptes.picker.placeholder")}
            value={q}
            onValueChange={setQ}
          />
          <CommandList>
            <CommandEmpty>
              {q.trim().length < 2 ? t("comptes.picker.min") : t("comptes.picker.none")}
            </CommandEmpty>
            {hits.length > 0 && (
              <CommandGroup heading={t("comptes.picker.group")}>
                {hits.map((p) => (
                  <CommandItem
                    key={p.id}
                    value={p.id}
                    onSelect={() => {
                      setOpen(false);
                      setQ("");
                      onPick(p);
                    }}
                  >
                    <span className="font-medium">
                      {p.firstName} {p.lastName}
                    </span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {p.code} · {p.village}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
