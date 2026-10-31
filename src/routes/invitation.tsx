import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormMessage } from "@/components/auth/FormMessage";
import { PasswordField } from "@/components/auth/PasswordField";
import { Button } from "@/components/ui/button";
import { authErrorMessage, authService } from "@/lib/auth";
import { isPasswordValid } from "@/lib/auth/policy";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/invitation")({
  validateSearch: (s: Record<string, unknown>) => ({
    jeton: typeof s["jeton"] === "string" ? s["jeton"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Invitation · Mbay Diaay" },
      { name: "description", content: "Activez votre compte en choisissant votre mot de passe." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Invitation,
});

type Known = { name: string; email: string; maskedEmail: string };

function Invitation() {
  const t = useT();
  const navigate = useNavigate();
  const { jeton: urlToken } = Route.useSearch();
  // Le jeton quitte l'adresse dès la lecture : il ne reste ni dans l'historique du navigateur, ni dans une capture
  // d'écran, ni dans un en-tête de référence. Recharger la page demande donc de rouvrir le lien reçu par courriel.
  const [jeton] = useState(urlToken);
  useEffect(() => {
    if (urlToken) void navigate({ to: "/invitation", search: { jeton: undefined }, replace: true });
  }, [urlToken, navigate]);
  const [known, setKnown] = useState<Known | null>(null);
  const [checking, setChecking] = useState(!!jeton);
  const [error, setError] = useState(jeton ? "" : t("auth.invitation.missing"));
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!jeton) return;
    let alive = true;
    authService
      .invitationInfo(jeton)
      .then((info) => alive && setKnown(info))
      .catch((e) => alive && setError(authErrorMessage(e, t)))
      .finally(() => alive && setChecking(false));
    return () => {
      alive = false;
    };
  }, [jeton, t]);

  const toLogin = (
    <Link
      to="/login"
      search={{ motdepasse: undefined }}
      className="text-sm font-semibold text-primary hover:underline pointer-coarse:inline-block pointer-coarse:py-2"
    >
      {t("auth.invitation.toLogin")}
    </Link>
  );

  if (checking || !known || !jeton) {
    return (
      <AuthLayout title={t("auth.invitation.title")} footer={toLogin}>
        {checking ? (
          <p role="status" className="text-sm text-muted-foreground">
            {t("auth.invitation.checking")}
          </p>
        ) : (
          <FormMessage>{error || t("auth.error.invitation_invalid")}</FormMessage>
        )}
      </AuthLayout>
    );
  }

  const mismatch = confirm.length > 0 && confirm !== password;
  const canSubmit = isPasswordValid(password, known.email) && confirm === password;
  return (
    <AuthLayout
      title={t("auth.invitation.title")}
      description={t("auth.invitation.description")}
      footer={toLogin}
    >
      <form
        className="space-y-5"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (!canSubmit || busy) return;
          setBusy(true);
          setError("");
          authService
            .acceptInvitation(jeton, password)
            .then(() => navigate({ to: "/login", search: { motdepasse: "modifie" } }))
            .catch((err) => setError(authErrorMessage(err, t)))
            .finally(() => setBusy(false));
        }}
      >
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{known.name}</span>
          <br />
          {t("auth.invitation.account", { email: known.maskedEmail })}
        </p>
        <PasswordField
          label={t("auth.invitation.password")}
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          rulesFor={known.email}
          autoFocus
        />
        <PasswordField
          label={t("auth.invitation.confirm")}
          value={confirm}
          onChange={setConfirm}
          autoComplete="new-password"
          invalid={mismatch}
        />
        <FormMessage>{mismatch ? t("auth.invitation.mismatch") : error}</FormMessage>
        <Button type="submit" className="h-touch w-full" disabled={busy || !canSubmit}>
          {busy ? t("auth.invitation.submitting") : t("auth.invitation.submit")}
        </Button>
      </form>
    </AuthLayout>
  );
}
