import { useI18n, type Locale } from "@/lib/i18n";
import { Segmented } from "@/components/ui/segmented";

const OPTIONS: { value: Locale; labelKey: "locale.fr" | "locale.wo" }[] = [
  { value: "fr", labelKey: "locale.fr" },
  { value: "wo", labelKey: "locale.wo" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <Segmented
      {...(className ? { className } : {})}
      value={locale}
      onChange={setLocale}
      ariaLabel={t("locale.switch")}
      size="sm"
      options={OPTIONS.map((o) => ({
        value: o.value,
        label: t(o.labelKey),
      }))}
    />
  );
}
