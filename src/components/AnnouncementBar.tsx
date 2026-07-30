"use client";

import { useLanguage } from "@/components/LanguageProvider";

export function AnnouncementBar() {
  const { t } = useLanguage();
  return (
    <div className="bg-accent px-4 py-2 text-center text-xs tracking-wide text-white sm:text-sm">
      {t.annonce}
    </div>
  );
}
