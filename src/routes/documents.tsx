import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Download,
  ExternalLink,
  FileText,
  Lock,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { EmptyState, PageHeader, Pill } from "@/components/app/ui-bits";
import { FilterPill } from "@/components/app/FilterPill";
import { FormDialog } from "@/components/app/FormDialog";
import { RowActions, type RowAction } from "@/components/app/RowActions";
import { LibraryAddDialog } from "@/components/app/LibraryAddDialog";
import { useFileSize } from "@/components/app/LibraryFile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { actions, useCan, useStore, useScoops } from "@/lib/store";
import { inScope, scopedLibrary } from "@/lib/scope";
import { LIBRARY_KINDS, type DocumentMeta, type LibraryDocumentKind } from "@/lib/mock/cooperative";
import { KIND_KEY } from "@/lib/dossier-labels";
import { fmtDate } from "@/lib/format";
import { useI18n, type MessageKey } from "@/lib/i18n";

export const Route = createFileRoute("/documents")({
  validateSearch: (s: Record<string, unknown>) => ({
    scoop: typeof s["scoop"] === "string" ? (s["scoop"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Documents · Mbay Diaay" },
      {
        name: "description",
        content:
          "La bibliothèque de la coopérative : statuts, règlement intérieur, procès-verbaux et conventions.",
      },
      { property: "og:title", content: "Documents · Mbay Diaay" },
      { property: "og:description", content: "Les documents de la coopérative." },
    ],
  }),
  component: DocumentsRoute,
});

function DocumentsRoute() {
  const { t } = useI18n();
  return (
    <AppShell perm="library.read" area={t("documents.area")}>
      <Library />
    </AppShell>
  );
}

const GROUP_KEY: Record<LibraryDocumentKind, MessageKey> = {
  statuts: "documents.group.statuts",
  règlement: "documents.group.reglement",
  "procès-verbal": "documents.group.pv",
  convention: "documents.group.convention",
  justificatif: "documents.group.justificatif",
  autre: "documents.group.autre",
};

function Library() {
  const allScoops = useScoops();
  const { t } = useI18n();
  const size = useFileSize();
  const g = Route.useSearch();
  const session = useStore((s) => s.session);
  const documents = useStore((s) => s.documents);
  const meetings = useStore((s) => s.meetings);
  const canManage = useCan("library.manage");
  const canDownload = useCan("document.download");
  const [kind, setKind] = useState<LibraryDocumentKind | "all">("all");
  const [q, setQ] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [removing, setRemoving] = useState<DocumentMeta | null>(null);

  const mine = useMemo(
    () => scopedLibrary(documents, session).filter((d) => !g.scoop || d.scoopId === g.scoop),
    [documents, session, g.scoop],
  );
  const scoops = useMemo(
    () => allScoops.filter((s) => inScope([{ scoopId: s.id }], session).length === 1),
    [allScoops, session],
  );
  const defaultScoopId = g.scoop ?? scoops[0]?.id ?? "";
  const needle = q.trim().toLowerCase();
  const matching = useMemo(
    () => mine.filter((d) => !needle || d.name.toLowerCase().includes(needle)),
    [mine, needle],
  );
  const shown = matching.filter((d) => kind === "all" || d.kind === kind);
  const groups = LIBRARY_KINDS.map((k) => ({
    kind: k,
    docs: shown.filter((d) => d.kind === k),
  })).filter((x) => x.docs.length);
  const meetingOf = (d: DocumentMeta) =>
    d.kind === "procès-verbal" ? meetings.find((m) => m.minutes?.documentId === d.id) : undefined;
  const filtered = kind !== "all" || !!needle;

  const download = (d: DocumentMeta) => {
    const r = actions.downloadDocument(d.id);
    if (!r.ok) return void toast.error(r.error);
    // Démonstration : le contenu reste côté serveur ; on remet un petit fichier texte de repère.
    const blob = new Blob(
      [`${t("documents.demoFile", { name: d.name, kind: t(KIND_KEY[d.kind]) })}\n`],
      {
        type: "text/plain",
      },
    );
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${d.name}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success(t("documents.downloaded"));
  };

  const addButton = canManage ? (
    <Button size="lg" onClick={() => setAddOpen(true)}>
      <Plus className="size-4" />
      {t("documents.add")}
    </Button>
  ) : undefined;

  return (
    <>
      <PageHeader
        eyebrow={t("documents.eyebrow")}
        title={t("documents.title")}
        description={t("documents.description")}
        actions={addButton}
      />

      {mine.length > 0 && (
        <div className="surface mb-4 flex flex-wrap items-center gap-2 p-3">
          <div className="relative min-w-0 flex-1 basis-48">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              aria-label={t("documents.search.aria")}
              placeholder={t("documents.search.placeholder")}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setFiltersOpen(true)}
            aria-expanded={filtersOpen}
          >
            <SlidersHorizontal className="size-4" />
            {t("documents.filters")}
            {kind !== "all" && (
              <span className="rounded-full bg-primary px-1.5 text-[11px] text-primary-foreground tabular">
                1
              </span>
            )}
          </Button>
        </div>
      )}
      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{t("documents.filters")}</SheetTitle>
          </SheetHeader>
          <div className="mt-4 flex flex-wrap gap-2">
            <FilterPill
              active={kind === "all"}
              onClick={() => setKind("all")}
              count={matching.length}
            >
              {t("documents.filter.all")}
            </FilterPill>
            {LIBRARY_KINDS.map((k) => (
              <FilterPill
                key={k}
                active={kind === k}
                onClick={() => setKind(kind === k ? "all" : k)}
                count={matching.filter((d) => d.kind === k).length}
              >
                {t(GROUP_KEY[k])}
              </FilterPill>
            ))}
          </div>
          <div className="mt-6 flex gap-2">
            {kind !== "all" && (
              <Button variant="outline" onClick={() => setKind("all")}>
                {t("documents.filters.reset")}
              </Button>
            )}
            <Button className="flex-1" onClick={() => setFiltersOpen(false)}>
              {t("documents.filters.apply")}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {shown.length === 0 ? (
        <div className="surface">
          {mine.length === 0 ? (
            <EmptyState icon={FileText} title={t("documents.empty.title")} action={addButton}>
              {t(canManage ? "documents.empty.manage" : "documents.empty.read")}
            </EmptyState>
          ) : (
            <EmptyState
              icon={Search}
              title={t("documents.empty.filtered")}
              action={
                filtered ? (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setKind("all");
                      setQ("");
                    }}
                  >
                    {t("documents.empty.reset")}
                  </Button>
                ) : undefined
              }
            />
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {groups.map(({ kind: k, docs }) => (
            <section key={k} aria-labelledby={`group-${k}`}>
              <div className="mb-2 flex items-baseline gap-2">
                <h2 id={`group-${k}`} className="text-base font-semibold">
                  {t(GROUP_KEY[k])}
                </h2>
                <span className="text-xs text-muted-foreground">
                  {t("documents.group.count.autre", { count: docs.length })}
                </span>
              </div>
              <ul className="surface divide-y">
                {docs.map((d) => {
                  const meeting = meetingOf(d);
                  const items: RowAction[] = [
                    {
                      label: t("documents.actions.download"),
                      icon: Download,
                      onSelect: () => download(d),
                      perm: "document.download",
                    },
                    {
                      label: t("documents.actions.remove"),
                      icon: Trash2,
                      onSelect: () => setRemoving(d),
                      perm: "library.manage",
                      danger: true,
                    },
                  ];
                  return (
                    <li
                      key={d.id}
                      className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:p-4"
                    >
                      <div className="flex min-w-0 flex-1 items-start gap-3">
                        <FileText
                          className="mt-0.5 size-5 shrink-0 text-muted-foreground sm:mt-0"
                          aria-hidden
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span className="break-all font-medium">{d.name}</span>
                            <Pill
                              tone={
                                (d.lifecycle ?? "en vigueur") === "remplacé" ? "neutral" : "success"
                              }
                            >
                              {(d.lifecycle ?? "en vigueur") === "remplacé"
                                ? t("documents.version.replaced")
                                : t("documents.version.current")}
                            </Pill>
                            <span className="text-xs text-muted-foreground">
                              {t("documents.version.label", { n: d.version ?? 1 })}
                            </span>
                            {d.sensitive && (
                              <span title={t("documents.sensitive.title")}>
                                <Pill tone="warning" icon={Lock}>
                                  {t("documents.sensitive.pill")}
                                </Pill>
                              </span>
                            )}
                          </div>
                          <div className="mt-0.5 text-xs text-muted-foreground">
                            {size(d.sizeKb)} ·{" "}
                            {t("documents.version.effect", {
                              date: fmtDate(d.effectiveAt ?? d.uploadedAt),
                            })}{" "}
                            ·{" "}
                            {t("documents.addedBy", {
                              name: d.uploadedBy,
                              date: fmtDate(d.uploadedAt),
                            })}
                          </div>
                          {meeting && (
                            <Link
                              to="/reunions/$id"
                              params={{ id: meeting.id }}
                              aria-label={t("documents.meeting.aria", { name: d.name })}
                              className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-2 hover:underline"
                            >
                              <ExternalLink className="size-3.5" aria-hidden />
                              {t("documents.actions.meeting")}
                            </Link>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pl-8 sm:pl-0">
                        {canDownload && (
                          <Button
                            variant="outline"
                            className="shrink-0"
                            onClick={() => download(d)}
                          >
                            <Download className="size-4" />
                            {t("documents.actions.download")}
                          </Button>
                        )}
                        <RowActions
                          items={items}
                          label={t("documents.actions.label", { name: d.name })}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}

      {canManage && (
        <LibraryAddDialog
          open={addOpen}
          onOpenChange={setAddOpen}
          scoops={scoops}
          defaultScoopId={defaultScoopId}
        />
      )}
      <FormDialog
        open={!!removing}
        onOpenChange={(o) => !o && setRemoving(null)}
        title={t("documents.remove.title")}
        description={
          removing ? t("documents.remove.description", { name: removing.name }) : undefined
        }
        submitLabel={t("documents.remove.submit")}
        cancelLabel={t("documents.add.cancel")}
        destructive
        onSubmit={() => {
          if (!removing) return;
          const r = actions.removeLibraryDocument(removing.id);
          if (r.ok) toast.success(t("documents.removed"));
          else toast.error(r.error);
          setRemoving(null);
        }}
      />
    </>
  );
}
