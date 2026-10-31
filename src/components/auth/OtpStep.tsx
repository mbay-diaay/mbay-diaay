import { useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { authErrorMessage } from "@/lib/auth/messages";
import { OTP_LENGTH, OTP_TTL_MS } from "@/lib/auth/policy";
import type { CodeSent } from "@/lib/auth/types";
import { useCountdown } from "@/hooks/use-countdown";
import { useT } from "@/lib/i18n";
import { FormMessage } from "./FormMessage";

interface Props {
  sent: CodeSent;
  submitLabel: string;
  onSubmit: (code: string) => Promise<void>;
  onResend: () => Promise<CodeSent>;
  onSent: (next: CodeSent) => void;
  onBack: () => void;
  backLabel: string;
}

/** Saisie du code à usage unique reçu par e-mail : partagée par la connexion et la réinitialisation. */
export function OtpStep({
  sent,
  submitLabel,
  onSubmit,
  onResend,
  onSent,
  onBack,
  backLabel,
}: Props) {
  const t = useT();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);
  const wait = useCountdown(sent.resendAvailableAt);

  const submit = async (value: string) => {
    if (busy) return;
    if (value.length < OTP_LENGTH)
      return setError(t("auth.otp.errorLength", { length: OTP_LENGTH }));
    setBusy(true);
    setError("");
    try {
      await onSubmit(value);
    } catch (e) {
      setError(authErrorMessage(e, t));
      setCode("");
    } finally {
      setBusy(false);
    }
  };
  const resend = async () => {
    setBusy(true);
    setError("");
    try {
      onSent(await onResend());
      setCode("");
      setInfo(t("auth.otp.resent"));
    } catch (e) {
      setInfo("");
      setError(authErrorMessage(e, t));
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        void submit(code);
      }}
    >
      <p className="text-sm text-muted-foreground">
        {t("auth.otp.sent", {
          length: OTP_LENGTH,
          email: sent.maskedEmail,
          minutes: Math.round(OTP_TTL_MS / 60000),
        })}
      </p>
      <div className="space-y-2">
        <Label htmlFor="otp">{t("auth.otp.code")}</Label>
        <InputOTP
          id="otp"
          maxLength={OTP_LENGTH}
          pattern={REGEXP_ONLY_DIGITS}
          value={code}
          onChange={(v) => {
            setCode(v);
            if (v.length === OTP_LENGTH) void submit(v);
          }}
          autoComplete="one-time-code"
          inputMode="numeric"
          autoFocus
          disabled={busy}
        >
          <InputOTPGroup>
            {Array.from({ length: OTP_LENGTH }, (_, i) => (
              <InputOTPSlot key={i} index={i} className="size-12 text-lg max-[359px]:size-10" />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
      <FormMessage>{error}</FormMessage>
      <FormMessage tone="info">{info}</FormMessage>
      <Button type="submit" className="h-touch w-full" disabled={busy || code.length < OTP_LENGTH}>
        {busy ? t("auth.otp.verifying") : submitLabel}
      </Button>
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <button
          type="button"
          onClick={() => void resend()}
          disabled={busy || wait > 0}
          className="font-semibold text-primary hover:underline disabled:cursor-not-allowed disabled:text-muted-foreground disabled:no-underline pointer-coarse:py-2"
        >
          {wait > 0 ? t("auth.otp.resendIn", { seconds: wait }) : t("auth.otp.resend")}
        </button>
        <button
          type="button"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground pointer-coarse:py-2"
        >
          {backLabel}
        </button>
      </div>
    </form>
  );
}
