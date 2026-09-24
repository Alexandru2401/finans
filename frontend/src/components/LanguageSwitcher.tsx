import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { SUPPORTED_LANGUAGES } from "@/i18n";

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  return (
    <div className="flex gap-1" role="group" aria-label={t("language.label")}>
      {SUPPORTED_LANGUAGES.map((lng) => (
        <Button
          key={lng}
          size="sm"
          variant={i18n.resolvedLanguage === lng ? "default" : "ghost"}
          className="cursor-pointer uppercase"
          title={t(`language.${lng}`)}
          aria-pressed={i18n.resolvedLanguage === lng}
          onClick={() => i18n.changeLanguage(lng)}
        >
          {lng}
        </Button>
      ))}
    </div>
  );
}
