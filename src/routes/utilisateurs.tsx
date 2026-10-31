import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Plus, Check, Minus, Smartphone, Link2, ScrollText, UserX, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { PageHeader, Pill } from "@/components/app/ui-bits";
import { RowActions } from "@/components/app/RowActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/app/FormField";
import { normalizeEmail } from "@/lib/auth/policy";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { actions, useStore, useScoops } from "@/lib/store";
import {
  PERMISSION_LABEL,
  ROLE_IS_SCOPED,
  ROLE_LABEL,
  ROLE_PERMISSIONS,
  type Permission,
  type RoleId,
} from "@/lib/permissions";
import { useI18n, type MessageKey } from "@/lib/i18n";

export const Route = createFileRoute("/utilisateurs")({
  validateSearch: (s: Record<string, unknown>) => ({
    q: typeof s["q"] === "string" ? (s["q"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Utilisateurs et rôles · Mbay Diaay" },
      {
        name: "description",
        content: "Gestion des utilisateurs, matrice des rôles et référentiels.",
      },
      { property: "og:title", content: "Utilisateurs et rôles · Mbay Diaay" },
      { property: "og:description", content: "Administration des accès." },
    ],
  }),
  component: UsersRoute,
});

function UsersRoute() {
  const { t } = useI18n();
  return (
    <AppShell perm="user.manage" area={t("utilisateurs.area")}>
      <Users />
    </AppShell>
  );
}

const ROLES = Object.keys(ROLE_LABEL) as RoleId[];

function Users() {
  const allScoops = useScoops();
  const { t, tEnum } = useI18n();
  const users = useStore((s) => s.users);
  const links = useStore((s) => s.links);
  const devices = useStore((s) => s.devices);
  const search = Route.useSearch();
  const navigate = useNavigate();
  const q = search.q ?? "";
  const shownUsers = users.filter(
    (u) => !q || `${u.name} ${u.email}`.toLowerCase().includes(q.toLowerCase()),
  );
  const devicesOf = (id: string) => devices.filter((d) => d.userId === id);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "gestionnaire" as RoleId,
    scoopId: "s1",
  });

  const typedEmail = normalizeEmail(form.email);
  const emailError =
    form.email.trim() && !typedEmail
      ? t("utilisateurs.err.emailInvalid")
      : typedEmail && users.some((u) => u.email === typedEmail)
        ? t("utilisateurs.err.emailTaken")
        : undefined;
  const phoneError =
    form.phone.trim() && !/^7[0678]\s?\d{3}\s?\d{2}\s?\d{2}$/.test(form.phone.trim())
      ? t("utilisateurs.err.phone")
      : undefined;

  return (
    <>
      <PageHeader
        eyebrow={t("utilisateurs.eyebrow")}
        title={t("utilisateurs.title")}
        actions={
          <Button onClick={() => setOpen(true)}>
            <Plus className="size-4" />
            {t("utilisateurs.new")}
          </Button>
        }
      />
      <Tabs defaultValue="users">
        <TabsList className="max-w-full overflow-x-auto justify-start">
          <TabsTrigger value="users">{t("utilisateurs.tab.users")}</TabsTrigger>
          <TabsTrigger value="roles">{t("utilisateurs.tab.roles")}</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="mt-4">
          <div className="surface overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted text-left text-xs text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">{t("utilisateurs.col.name")}</th>
                  <th>{t("utilisateurs.col.email")}</th>
                  <th>{t("utilisateurs.col.phone")}</th>
                  <th>{t("utilisateurs.col.role")}</th>
                  <th>{t("utilisateurs.col.devices")}</th>
                  <th>{t("utilisateurs.col.scope")}</th>
                  <th>{t("utilisateurs.col.state")}</th>
                  <th className="w-12 pr-4" />
                </tr>
              </thead>
              <tbody className="divide-y">
                {shownUsers.map((u) => (
                  <tr key={u.id}>
                    <td className="px-4 py-3 font-medium">{u.name}</td>
                    <td className="break-all">{u.email}</td>
                    <td className="tabular">{u.phone || t("utilisateurs.phoneNone")}</td>
                    <td>{tEnum("role", u.role)}</td>
                    <td>
                      {devicesOf(u.id).length ? (
                        <Link
                          to="/appareils"
                          search={{ user: u.id }}
                          className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
                        >
                          <Smartphone className="size-3.5" />
                          {t("utilisateurs.devicesActive", {
                            active: devicesOf(u.id).filter((d) => d.active).length,
                            total: devicesOf(u.id).length,
                          })}
                        </Link>
                      ) : (
                        <span className="text-muted-foreground">
                          {t("utilisateurs.devicesNone")}
                        </span>
                      )}
                    </td>
                    <td>
                      {u.scoopId
                        ? allScoops.find((s) => s.id === u.scoopId)?.name
                        : t("utilisateurs.scopeAll")}
                    </td>
                    <td>
                      {u.active ? (
                        <Pill tone="success">{t("utilisateurs.state.active")}</Pill>
                      ) : (
                        <Pill tone="neutral">{t("utilisateurs.state.inactive")}</Pill>
                      )}
                    </td>
                    <td className="pr-4 text-right">
                      <RowActions
                        title={u.name}
                        items={[
                          {
                            label: t("utilisateurs.action.devices"),
                            icon: Smartphone,
                            to: "/appareils",
                            search: { user: u.id },
                            perm: "device.manage",
                          },
                          {
                            label: links.some((l) => l.userId === u.id)
                              ? t("utilisateurs.action.linked")
                              : t("utilisateurs.action.link"),
                            icon: Link2,
                            to: "/comptes",
                            search: {
                              vue: links.some((l) => l.userId === u.id) ? "liees" : "a-rapprocher",
                            },
                            perm: "account.manage",
                          },
                          {
                            label: t("utilisateurs.action.audit"),
                            icon: ScrollText,
                            to: "/audit",
                            search: { q: u.name },
                            perm: "audit.read",
                          },
                          u.active
                            ? {
                                label: t("utilisateurs.action.deactivate"),
                                icon: UserX,
                                danger: true,
                                onSelect: () => {
                                  actions.toggleUser(u.id);
                                  toast(t("utilisateurs.toast.deactivated"), {
                                    description: u.name,
                                  });
                                },
                              }
                            : {
                                label: t("utilisateurs.action.reactivate"),
                                icon: UserCheck,
                                onSelect: () => {
                                  actions.toggleUser(u.id);
                                  toast.success(t("utilisateurs.toast.reactivated"), {
                                    description: u.name,
                                  });
                                },
                              },
                        ]}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        <TabsContent value="roles" className="mt-4">
          <div className="surface overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted text-xs text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left">{t("utilisateurs.col.permission")}</th>
                  {ROLES.map((r) => (
                    <th key={r} className="px-3">
                      {tEnum("role", r)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {(Object.keys(PERMISSION_LABEL) as Permission[]).map((p) => (
                  <tr key={p}>
                    <td className="px-4 py-2.5">{t(`perm.${p}` as MessageKey)}</td>
                    {ROLES.map((r) => (
                      <td key={r} className="px-1 py-1.5 text-center">
                        {ROLE_PERMISSIONS[r].includes(p) ? (
                          <span
                            className="mx-auto inline-flex size-7 items-center justify-center rounded-md bg-success-bg text-success-fg"
                            aria-label={t("utilisateurs.yes")}
                          >
                            <Check className="size-4" strokeWidth={2.5} aria-hidden />
                          </span>
                        ) : (
                          <span
                            className="mx-auto inline-flex size-7 items-center justify-center rounded-md bg-muted text-muted-foreground"
                            aria-label={t("utilisateurs.no")}
                          >
                            <Minus className="size-4" strokeWidth={2.25} aria-hidden />
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{t("utilisateurs.rolesNote")}</p>
        </TabsContent>
      </Tabs>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("utilisateurs.new")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <FormField label={t("utilisateurs.form.name")} required>
              {(c) => (
                <Input
                  {...c}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={t("utilisateurs.form.namePh")}
                  autoComplete="off"
                />
              )}
            </FormField>
            <FormField
              label={t("utilisateurs.form.email")}
              required
              hint={t("utilisateurs.form.emailHint")}
              error={emailError}
            >
              {(c) => (
                <Input
                  {...c}
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={t("utilisateurs.form.emailPh")}
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck={false}
                />
              )}
            </FormField>
            <FormField label={t("utilisateurs.form.phone")} error={phoneError}>
              {(c) => (
                <Input
                  {...c}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder={t("utilisateurs.form.phonePh")}
                  inputMode="tel"
                  autoComplete="off"
                />
              )}
            </FormField>
            <div className="space-y-1.5">
              <Label>{t("utilisateurs.form.role")}</Label>
              <Select
                value={form.role}
                onValueChange={(v) => setForm({ ...form, role: v as RoleId })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((r) => (
                    <SelectItem key={r} value={r}>
                      {tEnum("role", r)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {ROLE_IS_SCOPED[form.role] && (
              <div className="space-y-1.5">
                <Label>{t("utilisateurs.form.scoop")}</Label>
                <Select
                  value={form.scoopId}
                  onValueChange={(v) => setForm({ ...form, scoopId: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {allScoops.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              {t("utilisateurs.cancel")}
            </Button>
            <Button
              disabled={
                form.name.trim().length < 3 ||
                !normalizeEmail(form.email) ||
                !!emailError ||
                !!phoneError
              }
              onClick={() => {
                actions.addUser({
                  name: form.name.trim(),
                  email: normalizeEmail(form.email)!,
                  phone: form.phone.trim(),
                  role: form.role,
                  scoopId: ROLE_IS_SCOPED[form.role] ? form.scoopId : undefined,
                });
                toast.success(t("utilisateurs.toast.created"));
                setOpen(false);
                setForm({ ...form, name: "", email: "", phone: "" });
              }}
            >
              {t("utilisateurs.create")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
