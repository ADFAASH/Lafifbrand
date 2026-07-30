"use client";

import { useLanguage } from "@/components/LanguageProvider";
import type { Locale } from "@/lib/i18n";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  function switchTo(next: Locale) {
    setLocale(next);
  }

  return (
    <div
      className={`inline-flex items-center gap-1 text-xs tracking-[0.14em] uppercase ${className}`}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => switchTo("fr")}
        className={
          locale === "fr"
            ? "text-foreground"
            : "text-muted hover:text-foreground"
        }
        aria-pressed={locale === "fr"}
      >
        FR
      </button>
      <span className="text-border" aria-hidden>
        /
      </span>
      <button
        type="button"
        onClick={() => switchTo("en")}
        className={
          locale === "en"
            ? "text-foreground"
            : "text-muted hover:text-foreground"
        }
        aria-pressed={locale === "en"}
      >
        EN
      </button>
    </div>
  );
}
