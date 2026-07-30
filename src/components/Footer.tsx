"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-1">
          <p className="font-display text-3xl tracking-[0.25em] uppercase">
            Lafif
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {t.footerBlurb}
          </p>
        </div>

        <div>
          <h3 className="text-xs tracking-[0.2em] uppercase text-foreground">
            {t.footerHelp}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <Link href="/faq" className="hover:text-accent">
                {t.faq}
              </Link>
            </li>
            <li>
              <Link href="/faq#livraison" className="hover:text-accent">
                {t.delivery}
              </Link>
            </li>
            <li>
              <Link href="/faq#retours" className="hover:text-accent">
                {t.returns}
              </Link>
            </li>
            <li>
              <Link href="/faq#tailles" className="hover:text-accent">
                {t.sizeGuide}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs tracking-[0.2em] uppercase text-foreground">
            Lafif
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <Link href="/a-propos" className="hover:text-accent">
                {t.ourStoryLink}
              </Link>
            </li>
            <li>
              <Link
                href="/collections/best-sellers"
                className="hover:text-accent"
              >
                {t.bestsellers}
              </Link>
            </li>
            <li>
              <Link href="/collections/outlet" className="hover:text-accent">
                Outlet
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs tracking-[0.2em] uppercase text-foreground">
            {t.contact}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>{t.moroccoOnly}</li>
            <li>
              <a href="mailto:contact@lafif.ma" className="hover:text-accent">
                contact@lafif.ma
              </a>
            </li>
            <li className="pt-2 flex gap-4">
              <a href="#" className="hover:text-accent" aria-label="Instagram">
                Instagram
              </a>
              <a href="#" className="hover:text-accent" aria-label="TikTok">
                TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-4 py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} Lafif · {t.rights}
      </div>
    </footer>
  );
}
