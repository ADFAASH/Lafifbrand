"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useLanguage } from "@/components/LanguageProvider";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-xs tracking-[0.3em] uppercase text-accent">{t.thanks}</p>
      <h1 className="mt-3 font-display text-5xl">{t.orderReceived}</h1>
      <p className="mt-6 leading-relaxed text-muted">{t.orderReceivedText}</p>
      {ref ? (
        <p className="mt-8 border border-border bg-surface px-6 py-4 text-sm">
          {t.reference} :{" "}
          <span className="font-medium tracking-wide text-foreground">{ref}</span>
        </p>
      ) : null}
      <Link
        href="/"
        className="mt-10 inline-block bg-accent px-8 py-3 text-xs tracking-[0.2em] uppercase text-white"
      >
        {t.backHome}
      </Link>
    </div>
  );
}

export default function ConfirmationPage() {
  const { t } = useLanguage();

  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-lg px-4 py-24 text-center text-muted">
          {t.loading}
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
