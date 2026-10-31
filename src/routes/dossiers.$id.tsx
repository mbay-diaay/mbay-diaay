import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CircleCheck,
  Download,
  Eye,
  FileText,
  FolderOpen,
  Lock,
  Send,
  Trash2,
  Upload,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { DossierHelp, DossierPill } from "@/components/app/DossierBits";
import { DossierSteps } from "@/components/app/DossierSteps";
import { DocumentList } from "@/components/app/DocumentList";
import { EVENT_LABEL, KIND_KEY } from "@/lib/dossier-labels";
import { EmptyState, Field, PageHeader, Pill } from "@/components/app/ui-bits";
import { FormDialog } from "@/components/app/FormDialog";
import { FormField } from "@/components/app/FormField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { actions, can, useStore, useScoops } from "@/lib/store";
import { canDownloadDocument, canReadDocument, scopedDossiers } from "@/lib/scope";
import {
  DOCUMENT_KINDS,
  REFUSAL_REASONS,
  type DocumentKind,
  type DocumentMeta,
  type DossierDraft,
  type ProducerDossier,
  type RefusalReason,
} from "@/lib/mock/cooperative";
import {
  canDecide,
  decisionCheck,
  dueReminders,
  isClosed,
  isEditable,
  requiresComment,
  type DraftIssue,
} from "@/lib/dossiers";
import { fmtDate, fmtDateTime, maskCni, maskPhone } from "@/lib/format";
import { useI18n, type MessageKey } from "@/lib/i18n";

export const Route = createFileRoute("/dossiers/$id")({
  head: () => ({
    meta: [
      { title: "Dossier producteur · Mbay Diaay" },
      {
        name: "description",
        content: "Identité, pièces, décision et historique d'un dossier de nouveau producteur.",
      },
      { property: "og:title", content: "Dossier producteur · Mbay Diaay" },
      { property: "og:description", content: "Un dossier de nouveau producteur." },
    ],
  }),
  component: DossierRoute,
});

function DossierRoute() {
  const { t } = useI18n();
  return (
    <AppShell perm={["dossier.create", "dossier.review"]} area={t("dossiers.detail.area")}>
      <DossierPage />
    </AppShell>
  );
}

const MAX_KB = 5 * 1024;

function DossierPage() {
  const { t } = useI18n();
  const { id } = Route.useParams();
  const session = useStore((s) => s.session);
  const all = useStore((s) => s.dossiers);
  const dossier = all.find((d) => d.id === id);
  const visible = !!dossier && scopedDossiers([dossier], session).length === 1;

  if (!dossier || !visible)
    return (
      <EmptyState icon={FolderOpen} title={t("dossiers.detail.notFound.title")}>
        {t("dossiers.detail.notFound.text")}
      </EmptyState>
    );
  return <Detail key={dossier.id} dossier={dossier} />;
}

function Detail({ dossier }: { dossier: ProducerDossier }) {
  const allScoops = useScoops();
  const { t } = useI18n();
  const session = useStore((s) => s.session)!;
  const documents = useStore((s) => s.documents);
  const orgs = useStore((s) => s.orgs);
  const producers = useStore((s) => s.producers);
  const owner = dossier.createdByEmail === session.email;
  const editable = owner && isEditable(dossier);
  const reviewer = can(session, "dossier.review");
  const open = dossier.status === "soumis" || dossier.status === "en examen";
  const check = decisionCheck(dossier, { email: session.email, role: session.role });
  const duplicate = dossier.possibleDuplicateOf
    ? producers.find((p) => p.id === dossier.possibleDuplicateOf)
    : undefined;
  const docs = dossier.documentIds
    .map((x) => documents.find((d) => d.id === x))
    .filter((d): d is DocumentMeta => !!d);
  const [dialog, setDialog] = useState<"approve" | "complement" | "refuse" | null>(null);

  // Rappel : le dossier attend la coopérative depuis plus de 14 jours (ou un rappel est déjà parti).
  const reminderDays = useMemo(() => {
    if (!open) return null;
    const now = new Date();
    const due = dueReminders([dossier], now.toISOString()).length === 1 || !!dossier.remindedAt;
    if (!due) return null;
    const since = dossier.history.filter(
      (h) => h.action === "soumis" || h.action === "pris en examen",
    );
    const last = since[since.length - 1]?.at ?? dossier.submittedAt;
    if (!last) return null;
    return Math.max(0, Math.floor((now.getTime() - new Date(last).getTime()) / 86_400_000));
  }, [dossier, open]);

  // Message d'invitation à agir, selon les droits de la personne connectée (calculés ici, pas dans le composant).
  let nudge: MessageKey | null = null;
  let note: MessageKey | null = null;
  if (editable) {
    nudge =
      dossier.status === "brouillon"
        ? "dossiers.steps.nudge.draft"
        : "dossiers.steps.nudge.complement";
  } else if (open && reviewer) {
    if (!canDecide(session.role)) {
      nudge =
        dossier.status === "soumis"
          ? "dossiers.steps.nudge.instructSubmitted"
          : "dossiers.steps.nudge.instructExam";
      note = "dossiers.steps.note.decisionByOthers";
    } else if (check.ok) nudge = "dossiers.steps.nudge.decide";
    else note = "dossiers.steps.note.decisionByOthers";
  } else if (open) {
    note = "dossiers.steps.note.waitingCooperative";
  } else if (isEditable(dossier)) {
    note = reviewer
      ? "dossiers.steps.note.waitingTechnician"
      : can(session, "dossier.create")
        ? "dossiers.steps.note.notYours"
        : "dossiers.steps.note.waitingTechnician";
  }
  const complementReason = [...dossier.history]
    .reverse()
    .find((h) => h.action === "complément demandé")?.comment;

  return (
    <>
      <Link
        to="/dossiers"
        search={{ scoop: undefined }}
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {t("dossiers.detail.back")}
      </Link>
      <PageHeader
        eyebrow={t("dossiers.detail.eyebrow", { id: dossier.id })}
        title={`${dossier.draft.firstName || t("dossiers.row.noFirstName")} ${dossier.draft.lastName || t("dossiers.row.noLastName")}`}
        description={t("dossiers.detail.description", {
          scoop: allScoops.find((s) => s.id === dossier.scoopId)?.name ?? "",
          by: dossier.createdBy,
        })}
        actions={<DossierPill status={dossier.status} />}
      />
      <DossierHelp status={dossier.status} className="-mt-3 mb-4 text-sm text-muted-foreground" />

      <DossierSteps
        status={dossier.status}
        preparedBy={dossier.createdBy}
        complementReason={complementReason}
        reminderDays={reminderDays}
        nudge={nudge}
        note={note}
      />

      {duplicate && !isClosed(dossier) && (
        <div className="mb-4 flex items-start gap-3 rounded-md bg-warning-bg p-4 text-sm text-warning-fg">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
          <div>
            <div className="font-semibold">{t("dossiers.detail.duplicate.title")}</div>
            <p>
              {t("dossiers.detail.duplicate.before")}{" "}
              <Link
                to="/producteurs/$id"
                params={{ id: duplicate.id }}
                className="font-semibold underline"
              >
                {duplicate.firstName} {duplicate.lastName} ({duplicate.code})
              </Link>
              {t("dossiers.detail.duplicate.after")}
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="space-y-6">
          {editable ? <Editor dossier={dossier} /> : <ReadOnly dossier={dossier} />}
          <Pieces dossier={dossier} docs={docs} editable={editable} />
        </div>

        <div className="space-y-6">
          {reviewer && (
            <section className="surface p-5" aria-labelledby="decision-title">
              <h2 id="decision-title" className="font-semibold">
                {t("dossiers.detail.decision.title")}
              </h2>
              {open ? (
                <>
                  {!check.ok && (
                    <p className="mt-2 rounded-md bg-warning-bg p-3 text-sm text-warning-fg">
                      {check.error}
                    </p>
                  )}
                  {!canDecide(session.role) && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {t("dossiers.detail.decision.instructing")}
                    </p>
                  )}
                  {canDecide(session.role) && check.ok && check.selfDecided && (
                    <p className="mt-2 rounded-md bg-info-bg p-3 text-sm text-info-fg">
                      {t("dossiers.detail.decision.self")}
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {dossier.status === "soumis" && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          const r = actions.startReview(dossier.id);
                          if (r.ok) toast.success(t("dossiers.detail.decision.startedToast"));
                          else toast.error(r.error);
                        }}
                      >
                        <Eye className="size-4" />
                        {t("dossiers.detail.decision.startReview")}
                      </Button>
                    )}
                    <Button variant="outline" onClick={() => setDialog("complement")}>
                      {t("dossiers.detail.decision.askComplement")}
                    </Button>
                    {canDecide(session.role) && (
                      <>
                        <Button disabled={!check.ok} onClick={() => setDialog("approve")}>
                          <CircleCheck className="size-4" />
                          {t("dossiers.detail.decision.approve")}
                        </Button>
                        <Button
                          variant="outline"
                          disabled={!check.ok}
                          onClick={() => setDialog("refuse")}
                        >
                          <XCircle className="size-4" />
                          {t("dossiers.detail.decision.refuse")}
                        </Button>
                      </>
                    )}
                  </div>
                </>
              ) : dossier.decision ? (
                <Decision dossier={dossier} />
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">
                  {dossier.status === "brouillon"
                    ? t("dossiers.detail.decision.draftWaiting")
                    : t("dossiers.detail.decision.complementWaiting")}
                </p>
              )}
            </section>
          )}
          {!reviewer && dossier.decision && (
            <section className="surface p-5">
              <h2 className="font-semibold">{t("dossiers.detail.decision.title")}</h2>
              <Decision dossier={dossier} />
            </section>
          )}

          <section className="surface p-5" aria-labelledby="hist-title">
            <h2 id="hist-title" className="font-semibold">
              {t("dossiers.detail.history")}
            </h2>
            <ol className="mt-3 space-y-3 text-sm">
              {[...dossier.history].reverse().map((h, i) => (
                <li key={i} className="border-l-2 pl-3">
                  <div className="font-medium">{t(EVENT_LABEL[h.action])}</div>
                  <div className="text-xs text-muted-foreground">
                    {h.by} · {fmtDateTime(h.at)}
                  </div>
                  {h.comment && <p className="mt-0.5 text-muted-foreground">{h.comment}</p>}
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>

      <ApproveDialog
        open={dialog === "approve"}
        onClose={() => setDialog(null)}
        dossier={dossier}
        selfDecided={check.ok && check.selfDecided}
        orgName={orgs.find((o) => o.id === dossier.draft.orgId)?.name}
      />
      <ComplementDialog
        open={dialog === "complement"}
        onClose={() => setDialog(null)}
        id={dossier.id}
      />
      <RefuseDialog open={dialog === "refuse"} onClose={() => setDialog(null)} id={dossier.id} />
    </>
  );
}

function Decision({ dossier }: { dossier: ProducerDossier }) {
  const { t, tEnum } = useI18n();
  const d = dossier.decision!;
  return (
    <div className="mt-2 space-y-2 text-sm">
      <p>
        {d.approved
          ? t("dossiers.detail.decided.approvedBy")
          : t("dossiers.detail.decided.refusedBy")}{" "}
        <span className="font-medium">{d.by}</span> {t("dossiers.detail.decided.on")}{" "}
        {fmtDate(d.at)}
        {d.selfApproved && <> {t("dossiers.detail.decided.self")}</>}.
      </p>
      {d.reason && (
        <p>
          {t("dossiers.detail.decided.reason")}{" "}
          <span className="font-medium">{tEnum("dossiers.reason", d.reason)}</span>
          {d.comment ? `. ${d.comment}` : ""}
        </p>
      )}
      {d.approved && dossier.producerId && (
        <Link
          to="/producteurs/$id"
          params={{ id: dossier.producerId }}
          className="inline-block font-semibold text-primary hover:underline"
        >
          {t("dossiers.detail.decided.viewProducer")}
        </Link>
      )}
      {!d.approved && (
        <p className="text-muted-foreground">{t("dossiers.detail.decided.closed")}</p>
      )}
    </div>
  );
}

/** Lecture seule : CNI et téléphone masqués ; l'affichage de la CNI en clair est réservé et tracé. */
function ReadOnly({ dossier }: { dossier: ProducerDossier }) {
  const { t } = useI18n();
  const session = useStore((s) => s.session);
  const orgs = useStore((s) => s.orgs);
  const [showCni, setShowCni] = useState(false);
  const d = dossier.draft;
  return (
    <section className="surface p-5" aria-labelledby="info-title">
      <h2 id="info-title" className="font-semibold">
        {t("dossiers.detail.info.title")}
      </h2>
      <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <Field label={t("dossiers.detail.info.sex")}>
          {d.sex === "F" ? t("dossiers.detail.info.female") : t("dossiers.detail.info.male")}
        </Field>
        <Field label={t("dossiers.detail.info.age")}>
          {d.age === null
            ? t("dossiers.detail.info.notSet")
            : t("dossiers.detail.info.ageYears", { age: d.age })}
        </Field>
        <Field label={t("dossiers.detail.info.village")}>
          {d.village || t("dossiers.detail.info.notSet")}
        </Field>
        <Field label={t("dossiers.detail.info.org")}>
          {orgs.find((o) => o.id === d.orgId)?.name ?? t("dossiers.detail.info.notSet")}
        </Field>
        <Field label={t("dossiers.detail.info.phone")}>
          {d.phone ? maskPhone(d.phone) : t("dossiers.detail.info.notSet")}
        </Field>
        <Field label={t("dossiers.detail.info.cni")}>
          <span className="tabular">{showCni ? d.cni : maskCni(d.cni)}</span>
          {can(session, "cni.read") && d.cni && !showCni && (
            <button
              className="ml-2 text-xs font-semibold text-primary"
              onClick={() => {
                setShowCni(true);
                actions.audit(
                  "Révélation CNI",
                  `Dossier ${dossier.id}`,
                  "Affichage de la CNI du dossier",
                );
                toast(t("dossiers.detail.info.revealed"));
              }}
            >
              {t("dossiers.detail.info.reveal")}
            </button>
          )}
        </Field>
        <Field label={t("dossiers.detail.info.member")}>
          {d.createMember
            ? t("dossiers.detail.info.willBeMember")
            : t("dossiers.detail.info.producerOnly")}
        </Field>
      </dl>
    </section>
  );
}

/** Formulaire du technicien : tant que le dossier est brouillon ou en complément demandé. */
function Editor({ dossier }: { dossier: ProducerDossier }) {
  const { t } = useI18n();
  const orgs = useStore((s) => s.orgs).filter((o) => o.scoopId === dossier.scoopId);
  const [f, setF] = useState({
    ...dossier.draft,
    age: dossier.draft.age === null ? "" : String(dossier.draft.age),
  });
  const [issues, setIssues] = useState<DraftIssue[]>([]);
  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((x) => ({ ...x, [k]: v }));
  const err = (field: DraftIssue["field"]) => issues.find((i) => i.field === field)?.message;

  const patch = (): Partial<DossierDraft> => {
    const age = f.age.trim() === "" ? null : Number(f.age);
    const next: DossierDraft = { ...f, age: Number.isFinite(age) ? age : null };
    const out: Partial<DossierDraft> = {};
    (Object.keys(next) as (keyof DossierDraft)[]).forEach((k) => {
      if (next[k] !== dossier.draft[k]) (out as Record<string, unknown>)[k] = next[k];
    });
    return out;
  };
  const dirty = Object.keys(patch()).length > 0;

  const save = () => {
    const p = patch();
    if (!Object.keys(p).length) return true;
    const r = actions.updateDossier(dossier.id, p);
    if (!r.ok) toast.error(r.error);
    return r.ok;
  };

  return (
    <section className="surface p-5" aria-labelledby="info-title">
      <h2 id="info-title" className="font-semibold">
        {t("dossiers.detail.info.title")}
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <FormField label={t("dossiers.detail.edit.firstName")} required error={err("firstName")}>
          {(c) => (
            <Input {...c} value={f.firstName} onChange={(e) => set("firstName", e.target.value)} />
          )}
        </FormField>
        <FormField label={t("dossiers.detail.edit.lastName")} required error={err("lastName")}>
          {(c) => (
            <Input {...c} value={f.lastName} onChange={(e) => set("lastName", e.target.value)} />
          )}
        </FormField>
        <FormField label={t("dossiers.detail.info.sex")}>
          {(c) => (
            <Select value={f.sex} onValueChange={(v) => set("sex", v as "F" | "H")}>
              <SelectTrigger id={c.id}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="F">{t("dossiers.detail.info.female")}</SelectItem>
                <SelectItem value="H">{t("dossiers.detail.info.male")}</SelectItem>
              </SelectContent>
            </Select>
          )}
        </FormField>
        <FormField label={t("dossiers.detail.info.age")} required error={err("age")}>
          {(c) => (
            <Input
              {...c}
              inputMode="numeric"
              value={f.age}
              onChange={(e) => set("age", e.target.value)}
            />
          )}
        </FormField>
        <FormField label={t("dossiers.detail.info.phone")} required error={err("phone")}>
          {(c) => (
            <Input
              {...c}
              value={f.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="77 123 45 67"
            />
          )}
        </FormField>
        <FormField
          label={t("dossiers.detail.info.cni")}
          required
          error={err("cni")}
          hint={t("dossiers.detail.edit.cniHint")}
        >
          {(c) => (
            <Input
              {...c}
              inputMode="numeric"
              value={f.cni}
              onChange={(e) => set("cni", e.target.value)}
            />
          )}
        </FormField>
        <FormField label={t("dossiers.detail.info.village")} required error={err("village")}>
          {(c) => (
            <Input {...c} value={f.village} onChange={(e) => set("village", e.target.value)} />
          )}
        </FormField>
        <FormField label={t("dossiers.detail.info.org")} required error={err("orgId")}>
          {(c) => (
            <Select value={f.orgId} onValueChange={(v) => set("orgId", v)}>
              <SelectTrigger id={c.id}>
                <SelectValue placeholder={t("dossiers.detail.edit.choose")} />
              </SelectTrigger>
              <SelectContent>
                {orgs.map((o) => (
                  <SelectItem key={o.id} value={o.id}>
                    {o.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </FormField>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Checkbox
          id="create-member"
          checked={f.createMember}
          onCheckedChange={(c) => set("createMember", c === true)}
        />
        <Label htmlFor="create-member" className="font-normal">
          {t("dossiers.detail.edit.createMember")}
        </Label>
      </div>

      {err("pièces") && <p className="mt-4 text-sm text-danger-fg">{err("pièces")}</p>}
      <div className="mt-5 flex flex-wrap gap-2">
        <Button
          variant="outline"
          disabled={!dirty}
          onClick={() => {
            if (save()) toast.success(t("dossiers.detail.edit.saved"));
          }}
        >
          {t("dossiers.detail.edit.saveDraft")}
        </Button>
        <Button
          onClick={() => {
            if (!save()) return;
            const r = actions.submitDossier(dossier.id);
            if (!r.ok) {
              setIssues(r.issues ?? []);
              toast.error(r.error, { description: t("dossiers.detail.edit.fixFields") });
              return;
            }
            toast.success(t("dossiers.detail.edit.submitted"), {
              description: r.possibleDuplicateOf
                ? t("dossiers.detail.edit.duplicateFlagged")
                : undefined,
            });
          }}
        >
          <Send className="size-4" />
          {t("dossiers.detail.edit.submit")}
        </Button>
      </div>
    </section>
  );
}

function Pieces({
  dossier,
  docs,
  editable,
}: {
  dossier: ProducerDossier;
  docs: DocumentMeta[];
  editable: boolean;
}) {
  const { t } = useI18n();
  const session = useStore((s) => s.session);
  const [kind, setKind] = useState<DocumentKind>("cni");
  return (
    <section className="surface p-5" aria-labelledby="pieces-title">
      <h2 id="pieces-title" className="font-semibold">
        {t("dossiers.detail.pieces.title")}
      </h2>
      {docs.length ? (
        <div className="mt-3">
          <DocumentList
            docs={docs}
            {...(editable
              ? {
                  onRemove: (d: DocumentMeta) => {
                    const r = actions.removeDocument(d.id);
                    if (r.ok) toast(t("dossiers.detail.pieces.removed"));
                    else toast.error(r.error);
                  },
                }
              : {})}
          />
        </div>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">{t("dossiers.detail.pieces.none")}</p>
      )}

      {editable && (
        <div className="mt-4 flex flex-wrap items-end gap-3 border-t pt-4">
          <FormField label={t("dossiers.detail.pieces.type")}>
            {(c) => (
              <Select value={kind} onValueChange={(v) => setKind(v as DocumentKind)}>
                <SelectTrigger id={c.id} className="w-52">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DOCUMENT_KINDS.map((k) => (
                    <SelectItem key={k} value={k}>
                      {t(KIND_KEY[k])}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </FormField>
          <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-md border bg-background px-3 text-sm font-medium hover:bg-muted">
            <Upload className="size-4" aria-hidden />
            {t("dossiers.detail.pieces.add")}
            <input
              type="file"
              className="sr-only"
              accept="image/*,application/pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (!file) return;
                const r = actions.addDocument(dossier.id, {
                  kind,
                  name: file.name,
                  sizeKb: Math.ceil(file.size / 1024),
                  mime: file.type || "application/octet-stream",
                });
                if (r.ok) toast.success(t("dossiers.detail.pieces.added"));
                else toast.error(r.error);
              }}
            />
          </label>
          <p className="basis-full text-xs text-muted-foreground">
            {t("dossiers.detail.pieces.hint", { mb: MAX_KB / 1024 })}
          </p>
        </div>
      )}
    </section>
  );
}

function ApproveDialog({
  open,
  onClose,
  dossier,
  selfDecided,
  orgName,
}: {
  open: boolean;
  onClose: () => void;
  dossier: ProducerDossier;
  selfDecided: boolean;
  orgName: string | undefined;
}) {
  const { t } = useI18n();
  const producers = useStore((s) => s.producers);
  const duplicate = dossier.possibleDuplicateOf
    ? producers.find((p) => p.id === dossier.possibleDuplicateOf)
    : undefined;
  const [choice, setChoice] = useState<"lié" | "distinct" | "">("");
  const [member, setMember] = useState(dossier.draft.createMember);
  const [comment, setComment] = useState("");
  const reset = () => {
    setChoice("");
    setComment("");
    onClose();
  };
  return (
    <FormDialog
      open={open}
      onOpenChange={(o) => !o && reset()}
      title={t("dossiers.detail.approve.title")}
      description={
        duplicate
          ? t("dossiers.detail.approve.descriptionDuplicate")
          : orgName
            ? t("dossiers.detail.approve.descriptionOrg", {
                name: `${dossier.draft.firstName} ${dossier.draft.lastName}`,
                org: orgName,
              })
            : t("dossiers.detail.approve.description", {
                name: `${dossier.draft.firstName} ${dossier.draft.lastName}`,
              })
      }
      submitLabel={t("dossiers.detail.approve.submit")}
      submitDisabled={!!duplicate && !choice}
      footerNote={selfDecided ? t("dossiers.detail.approve.footerSelf") : undefined}
      onSubmit={() => {
        const r = actions.approveDossier(dossier.id, {
          ...(duplicate && choice ? { duplicate: choice } : {}),
          createMember: member,
          ...(comment.trim() ? { comment: comment.trim() } : {}),
        });
        if (!r.ok) return void toast.error(r.error);
        toast.success(
          selfDecided ? t("dossiers.detail.approve.doneSelf") : t("dossiers.detail.approve.done"),
          {
            description:
              choice === "lié"
                ? t("dossiers.detail.approve.linked")
                : t("dossiers.detail.approve.created"),
          },
        );
        reset();
      }}
    >
      {duplicate && (
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium">
            {t("dossiers.detail.approve.existing", {
              name: `${duplicate.firstName} ${duplicate.lastName}`,
              code: duplicate.code,
            })}
          </legend>
          <RadioGroup value={choice} onValueChange={(v) => setChoice(v as "lié" | "distinct")}>
            <div className="flex items-center gap-2">
              <RadioGroupItem id="dup-link" value="lié" />
              <Label htmlFor="dup-link" className="font-normal">
                {t("dossiers.detail.approve.same")}
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem id="dup-distinct" value="distinct" />
              <Label htmlFor="dup-distinct" className="font-normal">
                {t("dossiers.detail.approve.other")}
              </Label>
            </div>
          </RadioGroup>
        </fieldset>
      )}
      <div className="flex items-center gap-2">
        <Checkbox
          id="approve-member"
          checked={member}
          onCheckedChange={(c) => setMember(c === true)}
        />
        <Label htmlFor="approve-member" className="font-normal">
          {t("dossiers.detail.approve.member")}
        </Label>
      </div>
      <FormField label={t("dossiers.detail.approve.comment")}>
        {(c) => <Textarea {...c} value={comment} onChange={(e) => setComment(e.target.value)} />}
      </FormField>
    </FormDialog>
  );
}

function ComplementDialog({
  open,
  onClose,
  id,
}: {
  open: boolean;
  onClose: () => void;
  id: string;
}) {
  const { t } = useI18n();
  const [message, setMessage] = useState("");
  const reset = () => {
    setMessage("");
    onClose();
  };
  return (
    <FormDialog
      open={open}
      onOpenChange={(o) => !o && reset()}
      title={t("dossiers.detail.complementDialog.title")}
      description={t("dossiers.detail.complementDialog.description")}
      submitLabel={t("dossiers.detail.complementDialog.submit")}
      submitDisabled={message.trim().length < 5}
      onSubmit={() => {
        const r = actions.requestComplement(id, message);
        if (!r.ok) return void toast.error(r.error);
        toast.success(t("dossiers.detail.complementDialog.done"));
        reset();
      }}
    >
      <FormField
        label={t("dossiers.detail.complementDialog.label")}
        required
        hint={t("dossiers.detail.complementDialog.hint")}
      >
        {(c) => (
          <Textarea
            {...c}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("dossiers.detail.complementDialog.placeholder")}
          />
        )}
      </FormField>
    </FormDialog>
  );
}

function RefuseDialog({ open, onClose, id }: { open: boolean; onClose: () => void; id: string }) {
  const { t, tEnum } = useI18n();
  const [reason, setReason] = useState<RefusalReason | "">("");
  const [comment, setComment] = useState("");
  const reset = () => {
    setReason("");
    setComment("");
    onClose();
  };
  const needs = reason !== "" && requiresComment(reason);
  return (
    <FormDialog
      open={open}
      onOpenChange={(o) => !o && reset()}
      title={t("dossiers.detail.refuseDialog.title")}
      description={t("dossiers.detail.refuseDialog.description")}
      submitLabel={t("dossiers.detail.refuseDialog.submit")}
      destructive
      submitDisabled={!reason || (needs && comment.trim().length < 5)}
      onSubmit={() => {
        if (!reason) return;
        const r = actions.refuseDossier(id, reason, comment);
        if (!r.ok) return void toast.error(r.error);
        toast(t("dossiers.detail.refuseDialog.done"));
        reset();
      }}
    >
      <FormField label={t("dossiers.detail.refuseDialog.reason")} required>
        {(c) => (
          <Select value={reason} onValueChange={(v) => setReason(v as RefusalReason)}>
            <SelectTrigger id={c.id}>
              <SelectValue placeholder={t("dossiers.detail.refuseDialog.choose")} />
            </SelectTrigger>
            <SelectContent>
              {REFUSAL_REASONS.map((r) => (
                <SelectItem key={r} value={r}>
                  {tEnum("dossiers.reason", r)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </FormField>
      <FormField
        label={t("dossiers.detail.refuseDialog.detail")}
        required={needs}
        hint={needs ? t("dossiers.detail.refuseDialog.detailHint") : undefined}
      >
        {(c) => <Textarea {...c} value={comment} onChange={(e) => setComment(e.target.value)} />}
      </FormField>
    </FormDialog>
  );
}
