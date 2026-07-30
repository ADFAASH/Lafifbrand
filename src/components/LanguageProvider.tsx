"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  dictionaries,
  LOCALE_COOKIE,
  RTL_LOCALES,
  type Dictionary,
  type Locale,
} from "@/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readCookieLocale(): Locale {
  if (typeof document === "undefined") return "ar";
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`),
  );
  const value = match?.[1];
  if (value === "en" || value === "fr" || value === "ar") return value;
  return "ar";
}

function applyDocumentLocale(next: Locale) {
  document.documentElement.lang = next;
  document.documentElement.dir = RTL_LOCALES.includes(next) ? "rtl" : "ltr";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar");

  useEffect(() => {
    const next = readCookieLocale();
    setLocaleState(next);
    applyDocumentLocale(next);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=31536000`;
    applyDocumentLocale(next);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      t: dictionaries[locale],
      setLocale,
    }),
    [locale, setLocale],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
