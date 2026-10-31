import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { DemoMailNotice } from "@/components/auth/DemoMailNotice";
import { FormMessage } from "@/components/auth/FormMessage";
import { OtpStep } from "@/components/auth/OtpStep";
import { PasswordField } from "@/components/auth/PasswordField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authErrorMessage, authService } from "@/lib/auth";
import { isPasswordValid, normalizeEmail } from "@/lib/auth/policy";
import type { CodeSent } from "@/lib/auth";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/mot-de-passe-oublie")({
  head: () => ({
    meta: [
      { title: "Mot de passe oublié · Mbay Diaay" },
      {
        name: "description",
        content: "Réinitialisez votre mot de passe avec un code de vérification envoyé par e-mail.",
      },
      { property: "og:title", content: "Mot de passe oublié · Mbay Diaay" },
      { property: "og:description", content: "Réinitialisation sécurisée du mot de passe." },
    ],
  }),
  component: ForgotPassword,
});

type Step =
  | { name: "email" }
  | { name: "code"; email: string; sent: CodeSent }
  | { name: "password"; email: string; resetToken: string };

function BackLink() {
  const t = useT();
  return (
    <Link
      to="/login"
      search={{ motdepasse: undefined }}
      className="text-sm font-semibold text-primary hover:underline pointer-coarse:inline-block pointer-coarse:py-2"
    >
      {t("auth.forgot.back")}
    </Link>
  );
}

function ForgotPassword() {
  const t = useT();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>({ name: "email" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const run = async (task: () => Promise<void>) => {
    setBusy(true);
    setError("");
    try {
      await task();
    } catch (e) {
      setError(authErrorMessage(e, t));
    } finally {
      setBusy(false);
    }
  };

  if (step.name === "email") {
    return (
      <AuthLayout
        title={t("auth.forgot.title")}
        description={t("auth.forgot.description")}
        footer={<BackLink />}
      >
        <form
          className="space-y-5"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const normalized = normalizeEmail(email);
            if (!normalized) return setError(t("auth.login.errorEmail"));
            void run(async () => {
              const sent = await authService.requestPasswordReset(normalized);
              setStep({ name: "code", email: normalized, sent });
            });
          }}
        >
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
          <FormMessage>{error}</FormMessage>
          <Button type="submit" className="h-touch w-full" disabled={busy}>
            {busy ? t("auth.forgot.sending") : t("auth.forgot.send")}
          </Button>
        </form>
      </AuthLayout>
    );
  }

  if (step.name === "code") {
    const { email: to, sent } = step;
    return (
      <AuthLayout
        title={t("auth.forgot.codeTitle")}
        description={t("auth.forgot.step2")}
        footer={<BackLink />}
      >
        <div className="space-y-5">
          <OtpStep
            sent={sent}
            submitLabel={t("auth.forgot.validate")}
            backLabel={t("auth.otp.back")}
            onSubmit={async (code) => {
              const { resetToken } = await authService.verifyResetCode(to, code);
              setStep({ name: "password", email: to, resetToken });
            }}
            onResend={() => authService.requestPasswordReset(to)}
            onSent={(next) => setStep({ name: "code", email: to, sent: next })}
            onBack={() => setStep({ name: "email" })}
          />
          <DemoMailNotice purpose="reinitialisation" />
        </div>
      </AuthLayout>
    );
  }

  const { email: account, resetToken } = step;
  const mismatch = confirm.length > 0 && confirm !== password;
  const canSubmit = isPasswordValid(password, account) && confirm === password;
  return (
    <AuthLayout
      title={t("auth.forgot.newTitle")}
      description={t("auth.forgot.newDescription")}
      footer={<BackLink />}
    >
      <form
        className="space-y-5"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (!canSubmit) return;
          void run(async () => {
            await authService.resetPassword(resetToken, password);
            await navigate({ to: "/login", search: { motdepasse: "modifie" } });
          });
        }}
      >
        <PasswordField
          label={t("auth.forgot.newPassword")}
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          rulesFor={account}
          autoFocus
        />
        <PasswordField
          label={t("auth.forgot.confirm")}
          value={confirm}
          onChange={setConfirm}
          autoComplete="new-password"
          invalid={mismatch}
        />
        <FormMessage>{mismatch ? t("auth.forgot.mismatch") : error}</FormMessage>
        <Button type="submit" className="h-touch w-full" disabled={busy || !canSubmit}>
          {busy ? t("auth.forgot.saving") : t("auth.forgot.save")}
        </Button>
      </form>
    </AuthLayout>
  );
}
