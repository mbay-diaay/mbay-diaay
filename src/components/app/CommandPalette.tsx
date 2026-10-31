import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { can, inScope, useStore } from "@/lib/store";
import { maskPhone } from "@/lib/format";
import { NAV, navAllowed } from "@/lib/nav";
import { useI18n } from "@/lib/i18n";

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const digits = (s: string) => s.replace(/\D/g, "");

/** Recherche universelle (Cmd/Ctrl+K) : pages, producteurs, organisations, parcelles. */
export function CommandPalette({
  open,
  onOpenChange: setOpen,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) {
  const { t } = useI18n();
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const session = useStore((s) => s.session);
  const producers = useStore((s) => s.producers);
  const orgs = useStore((s) => s.orgs);
  // Parcelles / carte (M5) hors périmètre de ce dépôt : pas de résultat parcelle.

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [setOpen]);

  const needle = norm(q.trim());
  const match = (s: string) => !needle || norm(s).includes(needle);

  // Recherche par numéro réservée aux profils qui peuvent déjà afficher le téléphone en clair.
  const byPhone = can(session, "producer.edit") && digits(q).length >= 4 ? digits(q) : "";

  const pages = useMemo(
    () =>
      session
        ? NAV.flatMap((g) => g.items).filter(
            (i) => !i.soon && navAllowed(session, i) && match(t(i.labelKey)),
          )
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [session, needle, t],
  );
  const mine = useMemo(
    () =>
      inScope(
        producers.filter((p) => !p.mergedInto),
        session,
      ),
    [producers, session],
  );
  const prodHits = useMemo(
    () =>
      needle
        ? mine
            .filter(
              (p) =>
                match(`${p.firstName} ${p.lastName} ${p.code} ${p.village}`) ||
                (byPhone && digits(p.phone).includes(byPhone)),
            )
            .slice(0, 8)
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mine, needle, byPhone],
  );
  const orgHits = useMemo(
    () =>
      needle
        ? inScope(orgs, session)
            .filter((o) => match(`${o.name} ${o.village}`))
            .slice(0, 6)
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [orgs, session, needle],
  );

  const go = (to: string, params?: Record<string, string>) => {
    setOpen(false);
    setQ("");
    void navigate(params ? ({ to, params } as never) : ({ to } as never));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="top-3 translate-y-0 overflow-hidden p-0 sm:top-[50%] sm:translate-y-[-50%]"
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">{t("shell.palette.title")}</DialogTitle>
        <Command shouldFilter={false}>
          <CommandInput
            aria-label={t("shell.palette.placeholder")}
            placeholder={t("shell.palette.placeholder")}
            value={q}
            onValueChange={setQ}
          />
          <CommandList>
            <CommandEmpty>{t("shell.palette.empty", { q })}</CommandEmpty>
            {pages.length > 0 && (
              <CommandGroup heading={t("shell.palette.pages")}>
                {pages.map((i) => (
                  <CommandItem key={i.to} value={`page-${i.to}`} onSelect={() => go(i.to)}>
                    <i.icon className="size-4 text-muted-foreground" />
                    {t(i.labelKey)}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {prodHits.length > 0 && (
              <CommandGroup heading={t("shell.palette.producers")}>
                {prodHits.map((p) => (
                  <CommandItem
                    key={p.id}
                    value={`p-${p.id}`}
                    onSelect={() => go("/producteurs/$id", { id: p.id })}
                  >
                    <span className="font-medium">
                      {p.firstName} {p.lastName}
                    </span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {p.code} · {p.village}
                      {byPhone && digits(p.phone).includes(byPhone)
                        ? ` · ${maskPhone(p.phone)}`
                        : ""}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {orgHits.length > 0 && (
              <CommandGroup heading={t("shell.palette.orgs")}>
                {orgHits.map((o) => (
                  <CommandItem
                    key={o.id}
                    value={`o-${o.id}`}
                    onSelect={() => go("/organisations/$id", { id: o.id })}
                  >
                    {o.name}
                    <span className="ml-auto text-xs text-muted-foreground">{o.village}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
