import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Search, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { ALL, FilterSelect } from "@/components/app/FilterSelect";
import { Empty, PageHeader, QualityPill } from "@/components/app/ui-bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
import { actions, can, inScope, useStore, useScoops } from "@/lib/store";
import { CROPS, VILLAGES } from "@/lib/mock/data";
import { AGE_BANDS, ageBand, downloadCsv, fmtAge, maskPhone, nf } from "@/lib/format";
import { useI18n, type MessageKey } from "@/lib/i18n";
import type { Quality } from "@/lib/mock/data";

export const Route = createFileRoute("/producteurs/")({
  // Tous les critères sont dans l'adresse : on peut partager une recherche ou revenir en arrière sans la perdre.
  validateSearch: (s: Record<string, unknown>): Search => {
    const str = (k: string) => (typeof s[k] === "string" && s[k] ? (s[k] as string) : undefined);
    return {
      scoop: str("scoop"),
      campagne: str("campagne"),
      q: str("q"),
      village: str("village"),
      sexe: str("sexe"),
      age: str("age"),
      qualite: str("qualite"),
      culture: str("culture"),
    };
  },
  head: () => ({
    meta: [
      { title: "Annuaire des producteurs · Mbay Diaay" },
      {
        name: "description",
        content: "Recherche multicritère des producteurs par village, SCOOP, sexe, âge et qualité.",
      },
      { property: "og:title", content: "Annuaire des producteurs · Mbay Diaay" },
      { property: "og:description", content: "Recherche et export des producteurs." },
    ],
  }),
  component: DirectoryRoute,
});

function DirectoryRoute() {
  const { t } = useI18n();
  return (
    <AppShell perm="producer.read" area={t("producteurs.area")}>
      <Directory />
    </AppShell>
  );
}

const QUALITY_KEY: Record<Quality, MessageKey> = {
  validé: "producteurs.quality.validé",
  "à vérifier": "producteurs.quality.à vérifier",
  doublon: "producteurs.quality.doublon",
  invalide: "producteurs.quality.invalide",
};
const STATUS_KEY = {
  recensé: "producteurs.status.recensé",
  membre: "producteurs.status.membre",
} as const satisfies Record<string, MessageKey>;

const PAGE = 25;

/** Le filtre SCOOP et la campagne sont ceux de l'en-tête (`scoop`, `campagne`) : pas de second filtre SCOOP ici. */
interface Search {
  scoop?: string | undefined;
  campagne?: string | undefined;
  q?: string | undefined;
  village?: string | undefined;
  sexe?: string | undefined;
  age?: string | undefined;
  qualite?: string | undefined;
  culture?: string | undefined;
}
type FilterKey = "village" | "sexe" | "age" | "qualite" | "culture";

function Directory() {
  const allScoops = useScoops();
  const { t } = useI18n();
  const g = Route.useSearch();
  const session = useStore((s) => s.session);
  const all = useStore((s) => s.producers);
  const orgs = useStore((s) => s.orgs);
  const navigate = Route.useNavigate();
  const q = g.q ?? "";
  const f = {
    village: g.village ?? ALL,
    sexe: g.sexe ?? ALL,
    age: g.age ?? ALL,
    qualite: g.qualite ?? ALL,
    culture: g.culture ?? ALL,
  };
  const [page, setPage] = useState(0);
  const [exportOpen, setExportOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const nominatif = can(session, "producer.export_nominatif");

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    return inScope(
      all.filter((p) => !p.mergedInto),
      session,
    ).filter(
      (p) =>
        (!s || `${p.firstName} ${p.lastName} ${p.code}`.toLowerCase().includes(s)) &&
        (!g.scoop || p.scoopId === g.scoop) &&
        (!g.campagne || p.crops.some((c) => c.campaign === g.campagne)) &&
        (f.village === ALL || p.village === f.village) &&
        (f.sexe === ALL || p.sex === f.sexe) &&
        (f.age === ALL || ageBand(p.age) === f.age) &&
        (f.qualite === ALL || p.quality === f.qualite) &&
        (f.culture === ALL || p.crops.some((c) => c.crop === f.culture)),
    );
  }, [all, q, f.village, f.sexe, f.age, f.qualite, f.culture, session, g.scoop, g.campagne]);
  const pages = Math.max(1, Math.ceil(rows.length / PAGE));
  const view = rows.slice(page * PAGE, page * PAGE + PAGE);
  /** Met à jour un critère dans l'adresse (valeur vide ou « tous » : le critère disparaît). */
  const setSearch = (patch: Partial<Search>) => {
    void navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });
    setPage(0);
  };
  const setFilter = (k: FilterKey) => (v: string) => setSearch({ [k]: v === ALL ? undefined : v });

  const doExport = () => {
    const head = nominatif
      ? ["Code", "Prénom", "Nom", "Sexe", "Âge", "Village", "SCOOP", "Statut", "Qualité"]
      : ["Code", "Sexe", "Tranche d'âge", "Village", "SCOOP", "Statut", "Qualité"];
    const body = rows.map((p) => {
      const sc = allScoops.find((s) => s.id === p.scoopId)!.name;
      return nominatif
        ? [p.code, p.firstName, p.lastName, p.sex, p.age ?? "", p.village, sc, p.status, p.quality]
        : [p.code, p.sex, ageBand(p.age), p.village, sc, p.status, p.quality];
    });
    downloadCsv(`producteurs${nominatif ? "_nominatif" : ""}.csv`, [head, ...body]);
    actions.audit(
      nominatif ? "Export nominatif" : "Export anonymisé",
      "Producteurs",
      `${rows.length} lignes (CSV)`,
    );
    toast.success(t("producteurs.index.exportReady"), {
      description: t("producteurs.index.exportReadyDesc", { total: nf.format(rows.length) }),
    });
    setExportOpen(false);
  };

  const filters: [FilterKey, string, [string, string][]][] = [
    ["village", t("producteurs.col.village"), VILLAGES.map((v) => [v, v])],
    [
      "sexe",
      t("producteurs.col.sex"),
      [
        ["F", t("producteurs.sex.F")],
        ["H", t("producteurs.sex.H")],
      ],
    ],
    [
      "age",
      t("producteurs.col.age"),
      AGE_BANDS.map((a) => [a, t("producteurs.index.ageBand", { band: a })]),
    ],
    [
      "qualite",
      t("producteurs.col.quality"),
      (Object.keys(QUALITY_KEY) as Quality[]).map((x) => [x, t(QUALITY_KEY[x])]),
    ],
    ["culture", t("producteurs.col.crop"), CROPS.map((c) => [c, c])],
  ];

  const activeCount = Object.values(f).filter((v) => v !== ALL).length;
  const searchBox = (
    <>
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder={t("producteurs.index.searchPlaceholder")}
        aria-label={t("producteurs.index.searchLabel")}
        value={q}
        onChange={(e) => {
          setSearch({ q: e.target.value || undefined });
          setPage(0);
        }}
        className="pl-9"
      />
    </>
  );
  const filterControls = filters.map(([k, label, opts]) => (
    <FilterSelect key={k} label={label} value={f[k]} onChange={setFilter(k)} options={opts} />
  ));

  return (
    <>
      <PageHeader
        eyebrow={t("producteurs.index.eyebrow")}
        title={t("producteurs.index.title")}
        description={t("producteurs.index.description", { total: nf.format(rows.length) })}
        actions={
          <Button variant="outline" onClick={() => setExportOpen(true)}>
            <Download className="size-4" /> {t("producteurs.index.exportCsv")}
          </Button>
        }
      />
      <div className="surface mb-4 flex flex-wrap items-center gap-2 p-3 sm:gap-3 sm:p-4">
        <div className="relative min-w-0 flex-1 basis-48">{searchBox}</div>
        <Button
          variant="outline"
          className="shrink-0"
          onClick={() => setFiltersOpen(true)}
          aria-expanded={filtersOpen}
        >
          <SlidersHorizontal className="size-4" />
          {t("producteurs.index.filters")}
          {activeCount > 0 && (
            <span className="rounded-full bg-primary px-1.5 text-[11px] text-primary-foreground tabular">
              {activeCount}
            </span>
          )}
        </Button>
      </div>
      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{t("producteurs.index.filters")}</SheetTitle>
          </SheetHeader>
          <div className="mt-4 grid gap-3">{filterControls}</div>
          <SheetFooter className="mt-6 gap-2">
            {activeCount > 0 && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearch({
                    village: undefined,
                    sexe: undefined,
                    age: undefined,
                    qualite: undefined,
                    culture: undefined,
                  });
                  setPage(0);
                }}
              >
                {t("producteurs.index.reset")}
              </Button>
            )}
            <SheetClose asChild>
              <Button>{t("producteurs.index.seeRows", { total: nf.format(rows.length) })}</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <div className="surface overflow-hidden">
        {/* Téléphone : une carte par producteur, toute la ligne est cliquable. */}
        <ul className="divide-y md:hidden">
          {view.map((p) => (
            <li key={p.id}>
              <Link
                to="/producteurs/$id"
                params={{ id: p.id }}
                className="flex items-start gap-3 px-4 py-3 active:bg-muted"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">
                    {p.firstName} {p.lastName}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    <span className="tabular">{p.code}</span> ·{" "}
                    {t(p.sex === "F" ? "producteurs.sex.F" : "producteurs.sex.H")}, {fmtAge(p.age)}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">{p.village}</div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <QualityPill q={p.quality} />
                  <span className="text-xs capitalize text-muted-foreground">
                    {t(STATUS_KEY[p.status])}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted text-left text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">{t("producteurs.index.colProducer")}</th>
                <th className="px-4 py-3 font-semibold">{t("producteurs.index.colSexAge")}</th>
                <th className="px-4 py-3 font-semibold">{t("producteurs.col.village")}</th>
                <th className="hidden px-4 py-3 font-semibold lg:table-cell">
                  {t("producteurs.col.organisation")}
                </th>
                <th className="hidden px-4 py-3 font-semibold lg:table-cell">
                  {t("producteurs.col.phone")}
                </th>
                <th className="px-4 py-3 font-semibold">{t("producteurs.col.status")}</th>
                <th className="px-4 py-3 font-semibold">{t("producteurs.col.quality")}</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {view.map((p) => (
                <tr key={p.id} className="hover:bg-muted/60">
                  <td className="px-4 py-3">
                    <Link
                      to="/producteurs/$id"
                      params={{ id: p.id }}
                      className="font-semibold hover:text-primary hover:underline"
                    >
                      {p.firstName} {p.lastName}
                    </Link>
                    <div className="text-xs text-muted-foreground">{p.code}</div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 tabular">
                    {p.sex} · {fmtAge(p.age)}
                  </td>
                  <td className="px-4 py-3">{p.village}</td>
                  <td className="hidden max-w-56 truncate px-4 py-3 lg:table-cell">
                    {orgs.find((o) => o.id === p.orgId)?.name}
                  </td>
                  <td className="hidden whitespace-nowrap px-4 py-3 tabular text-muted-foreground lg:table-cell">
                    {maskPhone(p.phone)}
                  </td>
                  <td className="px-4 py-3 capitalize">{t(STATUS_KEY[p.status])}</td>
                  <td className="px-4 py-3">
                    <QualityPill q={p.quality} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!view.length && <Empty>{t("producteurs.index.empty")}</Empty>}
        <div className="flex items-center justify-between gap-2 border-t px-4 py-3 text-sm text-muted-foreground">
          <span className="tabular">{t("producteurs.index.page", { page: page + 1, pages })}</span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft className="size-4" />
              <span className="sr-only sm:not-sr-only">{t("producteurs.index.prev")}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= pages - 1}
              onClick={() => setPage(page + 1)}
            >
              <span className="sr-only sm:not-sr-only">{t("producteurs.index.next")}</span>
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <AlertDialog open={exportOpen} onOpenChange={setExportOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {nominatif
                ? t("producteurs.index.exportNominatif")
                : t("producteurs.index.exportAnonymise")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t(
                nominatif
                  ? "producteurs.index.exportNominatifDesc"
                  : "producteurs.index.exportAnonymiseDesc",
                { total: nf.format(rows.length) },
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("producteurs.index.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={doExport}>
              {t("producteurs.index.export")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
