import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Ban,
  Eye,
  LogOut,
  Pencil,
  RefreshCw,
  RotateCcw,
  ScrollText,
  Search,
  Smartphone,
  UserCog,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { FormDialog } from "@/components/app/FormDialog";
import { FormField } from "@/components/app/FormField";
import { EmptyState, Field, PageHeader, Pill } from "@/components/app/ui-bits";
import { RowActions } from "@/components/app/RowActions";
import { Button } from "@/components/ui/button";
import { Segmented } from "@/components/ui/segmented";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { actions, useStore } from "@/lib/store";
import type { Device } from "@/lib/mock/data";
import { fmtDate, fmtDateTime, nf } from "@/lib/format";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/appareils")({
  validateSearch: (s: Record<string, unknown>) => ({
    user: typeof s["user"] === "string" ? (s["user"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Appareils · Mbay Diaay" },
      {
        name: "description",
        content:
          "Appareils enregistrés par utilisateur, dernière activité, resynchronisation et révocation.",
      },
      { property: "og:title", content: "Appareils · Mbay Diaay" },
      { property: "og:description", content: "Gestion des appareils connectés et révocation." },
    ],
  }),
  component: DevicesRoute,
});

function DevicesRoute() {
  const { t } = useI18n();
  return (
    <AppShell perm="device.manage" area={t("appareils.area")}>
      <DevicesPage />
    </AppShell>
  );
}

type Confirm = { kind: "revoke" | "reactivate" | "signout"; device: Device };

function DevicesPage() {
  const { t, tEnum } = useI18n();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const devices = useStore((s) => s.devices);
  const users = useStore((s) => s.users);
  const audit = useStore((s) => s.audit);
  const [f, setF] = useState<"tous" | "actif" | "révoqué">("tous");
  const [q, setQ] = useState("");
  const [confirm, setConfirm] = useState<Confirm | null>(null);
  const [detailId, setDetailId] = useState<string | undefined>();
  const [rename, setRename] = useState<{ id: string; label: string } | null>(null);

  const user = (id: string) => users.find((u) => u.id === id);
  const filterUser = search.user ? user(search.user) : undefined;
  const rows = useMemo(
    () =>
      devices
        .filter((d) => !search.user || d.userId === search.user)
        .filter((d) => (f === "tous" ? true : f === "actif" ? d.active : !d.active))
        .filter((d) => {
          if (!q.trim()) return true;
          const u = users.find((x) => x.id === d.userId);
          return `${d.label} ${u?.name ?? ""}`.toLowerCase().includes(q.trim().toLowerCase());
        }),
    [devices, users, f, q, search.user],
  );
  const activeCount = devices.filter((d) => d.active).length;
  const detail = detailId ? devices.find((d) => d.id === detailId) : undefined;
  const history = detail
    ? audit.filter((a) => a.entity === "Appareil" && a.detail.includes(detail.label))
    : [];

  const menu = (d: Device) => [
    { label: t("appareils.action.detail"), icon: Eye, onSelect: () => setDetailId(d.id) },
    {
      label: t("appareils.action.rename"),
      icon: Pencil,
      onSelect: () => setRename({ id: d.id, label: d.label }),
    },
    {
      label: t("appareils.action.resync"),
      icon: RefreshCw,
      hidden: !d.active,
      onSelect: () => {
        actions.resyncDevice(d.id);
        toast.success(t("appareils.toast.resync"), {
          description: t("appareils.toast.resyncDesc"),
        });
      },
    },
    {
      label: t("appareils.action.user"),
      icon: UserCog,
      to: "/utilisateurs",
      search: { q: user(d.userId)?.name },
      perm: "user.manage" as const,
    },
    {
      label: t("appareils.action.audit"),
      icon: ScrollText,
      to: "/audit",
      search: { q: d.label },
      perm: "audit.read" as const,
    },
    {
      label: t("appareils.action.signout"),
      icon: LogOut,
      danger: true,
      hidden: !d.active,
      onSelect: () => setConfirm({ kind: "signout", device: d }),
    },
    d.active
      ? {
          label: t("appareils.action.revoke"),
          icon: Ban,
          danger: true,
          onSelect: () => setConfirm({ kind: "revoke", device: d }),
        }
      : {
          label: t("appareils.action.reactivate"),
          icon: RotateCcw,
          onSelect: () => setConfirm({ kind: "reactivate", device: d }),
        },
  ];

  const runConfirm = () => {
    if (!confirm) return;
    const { kind, device } = confirm;
    if (kind === "revoke") actions.revokeDevice(device.id);
    if (kind === "reactivate") actions.reactivateDevice(device.id);
    if (kind === "signout") actions.signOutDevice(device.id);
    toast.success(
      kind === "revoke"
        ? t("appareils.toast.revoked")
        : kind === "reactivate"
          ? t("appareils.toast.reactivated")
          : t("appareils.toast.signedOut"),
      { description: t("appareils.toast.audited") },
    );
    setConfirm(null);
  };

  return (
    <>
      <PageHeader
        eyebrow={t("appareils.eyebrow")}
        title={t("appareils.title")}
        description={t("appareils.description")}
        actions={
          <div className="flex gap-2">
            <Pill tone="success">{t("appareils.count.active", { n: nf.format(activeCount) })}</Pill>
            <Pill tone="neutral">
              {t("appareils.count.revoked", { n: nf.format(devices.length - activeCount) })}
            </Pill>
          </div>
        }
      />
      {filterUser && (
        <div className="mb-3 flex flex-wrap items-center gap-2 rounded-md bg-info-bg px-3 py-2 text-sm text-info-fg">
          {t("appareils.filter.of")} <strong>{filterUser.name}</strong>
          <button
            className="ml-auto inline-flex items-center gap-1 text-xs font-semibold hover:underline"
            onClick={() =>
              navigate({ to: "/appareils", search: { user: undefined }, replace: true })
            }
          >
            <X className="size-3.5" />
            {t("appareils.filter.all")}
          </button>
        </div>
      )}
      <div className="surface mb-3 flex flex-wrap items-center gap-3 p-3">
        <Segmented
          ariaLabel={t("appareils.state.aria")}
          value={f}
          onChange={setF}
          size="sm"
          options={[
            { value: "tous", label: t("appareils.seg.all") },
            { value: "actif", label: t("appareils.seg.active") },
            { value: "révoqué", label: t("appareils.seg.revoked") },
          ]}
        />
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="w-64 pl-8"
            aria-label={t("appareils.search")}
            placeholder={t("appareils.search")}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>
      <div className="surface overflow-x-auto">
        {rows.length ? (
          <table className="w-full text-sm">
            <thead className="border-b bg-muted text-left text-xs text-muted-foreground">
              <tr>
                <th className="py-3 pl-4 font-semibold">{t("appareils.col.device")}</th>
                <th className="font-semibold">{t("appareils.col.user")}</th>
                <th className="hidden font-semibold md:table-cell">
                  {t("appareils.col.registered")}
                </th>
                <th className="font-semibold">{t("appareils.col.lastActive")}</th>
                <th className="font-semibold">{t("appareils.col.status")}</th>
                <th className="w-12 pr-4" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((d) => {
                const u = user(d.userId);
                return (
                  <tr
                    key={d.id}
                    className="cursor-pointer hover:bg-muted/40"
                    onClick={() => setDetailId(d.id)}
                  >
                    <td className="py-2.5 pl-4">
                      <span className="flex items-center gap-2 font-medium">
                        <Smartphone className="size-4 text-muted-foreground" />
                        {d.label}
                      </span>
                    </td>
                    <td>
                      {u ? (
                        <>
                          <Link
                            to="/utilisateurs"
                            search={{ q: u.name }}
                            onClick={(e) => e.stopPropagation()}
                            className="font-medium hover:text-primary hover:underline"
                          >
                            {u.name}
                          </Link>
                          <div className="text-xs text-muted-foreground">
                            {tEnum("role", u.role)}
                          </div>
                        </>
                      ) : (
                        t("appareils.unknown")
                      )}
                    </td>
                    <td className="hidden whitespace-nowrap text-muted-foreground md:table-cell">
                      {fmtDate(d.registeredAt)}
                    </td>
                    <td className="whitespace-nowrap text-muted-foreground">
                      {fmtDate(d.lastActiveAt)}
                    </td>
                    <td>
                      {d.active ? (
                        <Pill tone="success">{t("appareils.state.active")}</Pill>
                      ) : (
                        <Pill tone="neutral">{t("appareils.state.revoked")}</Pill>
                      )}
                    </td>
                    <td className="pr-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <RowActions title={d.label} items={menu(d)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <EmptyState icon={Smartphone} title={t("appareils.empty.title")}>
            {t("appareils.empty.desc")}
          </EmptyState>
        )}
      </div>

      <Sheet open={!!detail} onOpenChange={(o) => !o && setDetailId(undefined)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          {detail && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Smartphone className="size-5 text-primary" />
                  {detail.label}
                </SheetTitle>
              </SheetHeader>
              <div className="mt-2">
                {detail.active ? (
                  <Pill tone="success">{t("appareils.state.active")}</Pill>
                ) : (
                  <Pill tone="neutral">{t("appareils.state.revoked")}</Pill>
                )}
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <Field label={t("appareils.col.user")}>
                  {user(detail.userId) ? (
                    <Link
                      to="/utilisateurs"
                      search={{ q: user(detail.userId)!.name }}
                      className="text-primary hover:underline"
                    >
                      {user(detail.userId)!.name}
                    </Link>
                  ) : (
                    t("appareils.unknown")
                  )}
                </Field>
                <Field label={t("appareils.detail.role")}>
                  {user(detail.userId)
                    ? tEnum("role", user(detail.userId)!.role)
                    : t("appareils.unknown")}
                </Field>
                <Field label={t("appareils.col.registered")}>{fmtDate(detail.registeredAt)}</Field>
                <Field label={t("appareils.col.lastActive")}>{fmtDate(detail.lastActiveAt)}</Field>
                <Field label={t("appareils.detail.id")}>{detail.id}</Field>
              </dl>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRename({ id: detail.id, label: detail.label })}
                >
                  <Pencil className="size-4" />
                  {t("appareils.detail.rename")}
                </Button>
                {detail.active && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      actions.resyncDevice(detail.id);
                      toast.success(t("appareils.toast.resync"));
                    }}
                  >
                    <RefreshCw className="size-4" />
                    {t("appareils.detail.resync")}
                  </Button>
                )}
                {detail.active ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-danger-fg"
                    onClick={() => setConfirm({ kind: "revoke", device: detail })}
                  >
                    <Ban className="size-4" />
                    {t("appareils.detail.revoke")}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setConfirm({ kind: "reactivate", device: detail })}
                  >
                    <RotateCcw className="size-4" />
                    {t("appareils.detail.reactivate")}
                  </Button>
                )}
              </div>
              <div className="mt-6">
                <div className="eyebrow mb-2">{t("appareils.history")}</div>
                {history.length ? (
                  <ul className="divide-y text-sm">
                    {history.map((h) => (
                      <li key={h.id} className="py-2">
                        <div className="font-medium">{h.action}</div>
                        <div className="text-xs text-muted-foreground">
                          {h.user} · {fmtDateTime(h.at)}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">{t("appareils.history.empty")}</p>
                )}
                <Link
                  to="/audit"
                  search={{ q: detail.label } as never}
                  className="mt-2 inline-block text-xs font-semibold text-primary hover:underline"
                >
                  {t("appareils.history.open")}
                </Link>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <FormDialog
        open={!!rename}
        onOpenChange={(o) => !o && setRename(null)}
        title={t("appareils.rename.title")}
        description={t("appareils.rename.desc")}
        submitLabel={t("appareils.rename.submit")}
        submitDisabled={
          !rename ||
          rename.label.trim().length < 3 ||
          rename.label.trim() === devices.find((d) => d.id === rename.id)?.label
        }
        onSubmit={() => {
          if (!rename) return;
          actions.renameDevice(rename.id, rename.label.trim());
          toast.success(t("appareils.toast.renamed"));
          setRename(null);
        }}
      >
        <FormField label={t("appareils.rename.field")}>
          {(c) => (
            <Input
              {...c}
              value={rename?.label ?? ""}
              onChange={(e) => rename && setRename({ ...rename, label: e.target.value })}
              placeholder={t("appareils.rename.placeholder")}
            />
          )}
        </FormField>
      </FormDialog>
      <FormDialog
        open={!!confirm}
        onOpenChange={(o) => !o && setConfirm(null)}
        title={
          confirm?.kind === "revoke"
            ? t("appareils.confirm.revoke.title")
            : confirm?.kind === "reactivate"
              ? t("appareils.confirm.reactivate.title")
              : t("appareils.confirm.signout.title")
        }
        description={t("appareils.confirm.desc")}
        submitLabel={
          confirm?.kind === "revoke"
            ? t("appareils.confirm.revoke.submit")
            : confirm?.kind === "reactivate"
              ? t("appareils.confirm.reactivate.submit")
              : t("appareils.confirm.signout.submit")
        }
        destructive={confirm?.kind !== "reactivate"}
        onSubmit={runConfirm}
      >
        {confirm && (
          <>
            <p className="text-sm">
              {t("appareils.confirm.device")}{" "}
              <span className="font-semibold">{confirm.device.label}</span>{" "}
              {t("appareils.confirm.of")} {user(confirm.device.userId)?.name}.{" "}
              {confirm.kind === "revoke" && t("appareils.confirm.revoke.note")}
              {confirm.kind === "reactivate" && t("appareils.confirm.reactivate.note")}
              {confirm.kind === "signout" && t("appareils.confirm.signout.note")}
            </p>
            <p className="rounded-md bg-warning-bg p-3 text-sm text-warning-fg">
              {t("appareils.confirm.demo")}
            </p>
          </>
        )}
      </FormDialog>
    </>
  );
}
