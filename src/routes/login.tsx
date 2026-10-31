import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { DemoInvitationNotice, DemoMailNotice } from "@/components/auth/DemoMailNotice";
import { FormMessage } from "@/components/auth/FormMessage";
import { OtpStep } from "@/components/auth/OtpStep";
import { PasswordField } from "@/components/auth/PasswordField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { actions } from "@/lib/store";
import { authErrorMessage, authService, DEMO_ACCOUNTS, DEMO_MODE, DEMO_PASSWORD } from "@/lib/auth";
import { normalizeEmail } from "@/lib/auth/policy";
import type { CodeSent } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>) => ({
    motdepasse: s["motdepasse"] === "modifie" ? ("modifie" as const) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Connexion · Mbay Diaay" },
      {
        name: "description",
        content:
          "Connexion à l'application de pilotage Mbay Diaay avec votre adresse e-mail et un code de vérification.",
      },
      { property: "og:title", content: "Connexion · Mbay Diaay" },
      { property: "og:description", content: "Administration et pilotage des SCOOP." },
    ],
  }),
  component: Login,
});

type Step = { name: "credentials" } | { name: "code"; challengeId: string; sent: CodeSent };

function Login() {
  const t = useT();
  const navigate = useNavigate();
  const { motdepasse } = Route.useSearch();
  const [step, setStep] = useState<Step>({ name: "credentials" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submitCredentials = async () => {
    const normalized = normalizeEmail(email);
    if (!normalized) return setError(t("auth.login.errorEmail"));
    if (!password) return setError(t("auth.login.errorPassword"));
    setBusy(true);
    setError("");
    try {
      const { challengeId, ...sent } = await authService.signIn(normalized, password);
      setStep({ name: "code", challengeId, sent });
    } catch (e) {
      setError(authErrorMessage(e, t));
    } finally {
      setBusy(false);
    }
  };

  if (step.name === "code") {
    const { challengeId, sent } = step;
    return (
      <AuthLayout title={t("auth.otp.title")} footer={t("auth.login.footer")}>
        <div className="space-y-5">
          <OtpStep
            sent={sent}
            submitLabel={t("auth.otp.submit")}
            backLabel={t("auth.otp.back")}
            onSubmit={async (code) => {
              const user = await authService.verifyOtp(challengeId, code);
              actions.login(user.name, user.email, user.role);
              await navigate({ to: "/" });
            }}
            onResend={() => authService.resendOtp(challengeId)}
            onSent={(next) => setStep({ name: "code", challengeId, sent: next })}
            onBack={() => {
              setStep({ name: "credentials" });
              setPassword("");
              setError("");
            }}
          />
          <DemoMailNotice purpose="connexion" />
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title={t("auth.login.title")}
      description={t("auth.login.description")}
      footer={t("auth.login.footer")}
    >
      <form
        className="space-y-5"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          void submitCredentials();
        }}
      >
        {motdepasse === "modifie" && (
          <FormMessage tone="info">{t("auth.login.passwordChanged")}</FormMessage>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">{t("auth.login.email")}</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            inputMode="email"
            placeholder={t("auth.login.emailPlaceholder")}
            autoCapitalize="none"
            spellCheck={false}
            className="h-touch"
            autoFocus
          />
        </div>
        <PasswordField
          label={t("auth.login.password")}
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
          placeholder={t("auth.login.passwordPlaceholder")}
        />
        <div className="-mt-2 text-right">
          <Link
            to="/mot-de-passe-oublie"
            className="text-sm font-semibold text-primary hover:underline pointer-coarse:inline-block pointer-coarse:py-2"
          >
            {t("auth.login.forgot")}
          </Link>
        </div>
        <FormMessage>{error}</FormMessage>
        <Button type="submit" className="h-touch w-full" disabled={busy}>
          {busy ? t("auth.login.submitting") : t("auth.login.submit")}
        </Button>
        <p className="text-xs text-muted-foreground">{t("auth.login.invitationHint")}</p>
      </form>
      <div className="mt-5">
        <DemoInvitationNotice />
      </div>

      {DEMO_MODE && (
        <section className="mt-8 border-t pt-5" aria-labelledby="demo-accounts">
          <h2 id="demo-accounts" className="text-sm font-semibold">
            {t("auth.login.demoTitle")}
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {t("auth.login.demoIntro")}{" "}
            <span className="font-semibold text-foreground">{DEMO_PASSWORD}</span>
          </p>
          <ul className="mt-3 space-y-1.5">
            {DEMO_ACCOUNTS.map((a) => (
              <li key={a.email}>
                <button
                  type="button"
                  onClick={() => {
                    setEmail(a.email);
                    setPassword(DEMO_PASSWORD);
                    setError("");
                  }}
                  className={cn(
                    "w-full rounded-md border px-3 py-2 text-left text-xs transition-colors hover:bg-muted pointer-coarse:py-3",
                    email === a.email && "border-primary bg-primary-soft",
                  )}
                >
                  <span className="block font-semibold">{a.label}</span>
                  <span className="block text-muted-foreground">{a.email}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </AuthLayout>
  );
}
