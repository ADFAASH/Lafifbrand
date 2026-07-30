"use client";

import Link from "next/link";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/components/LanguageProvider";
import { categories } from "@/data/products";

const navLinkClassName =
  "whitespace-nowrap text-xs tracking-[0.14em] uppercase text-foreground/80 transition-colors hover:text-accent";

export function Header() {
  const [open, setOpen] = useState(false);
  const { t, locale } = useLanguage();

  const navLinks = [
    { href: "/collections/best-sellers", label: t.bestsellers },
    { href: "/collections/ensembles", label: t.ensembles },
    { href: "/collections/hijab", label: "Hijab" },
    {
      href: "/collections/robes",
      label: locale === "fr" ? "Robes" : "Dresses",
    },
    { href: "/collections/tops", label: "Tops" },
    { href: "/a-propos", label: t.brand },
    { href: "/collections/outlet", label: "Outlet" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-4 md:px-8">
        <button
          type="button"
          className="col-start-1 row-start-1 text-sm tracking-wide uppercase xl:hidden"
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? t.close : t.menu}
        </button>

        <nav className="col-start-1 row-start-1 hidden min-w-0 items-center gap-4 xl:flex xl:gap-5 2xl:gap-6">
          {navLinks.slice(0, 4).map((link) => (
            <Link key={link.href} href={link.href} className={navLinkClassName}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="col-start-2 row-start-1 justify-self-center">
          <Logo
            priority
            sizes="(max-width: 768px) 160px, 240px"
            className="h-7 w-auto sm:h-8 xl:h-10"
          />
        </Link>

        <nav className="col-start-3 row-start-1 hidden min-w-0 items-center justify-end gap-4 xl:flex xl:gap-5 2xl:gap-6">
          {navLinks.slice(4).map((link) => (
            <Link key={link.href} href={link.href} className={navLinkClassName}>
              {link.label}
            </Link>
          ))}
          <Link href="/faq" className={navLinkClassName}>
            {t.faq}
          </Link>
          <LanguageSwitcher />
        </nav>

        <div className="col-start-3 row-start-1 flex items-center justify-end xl:hidden">
          <LanguageSwitcher />
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background px-4 py-6 xl:hidden">
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-display text-2xl tracking-wide"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/faq"
                className="font-display text-2xl tracking-wide"
                onClick={() => setOpen(false)}
              >
                {t.faq}
              </Link>
            </li>
            <li className="pt-4">
              <p className="mb-2 text-xs uppercase tracking-widest text-muted">
                {t.collections}
              </p>
              <div className="flex flex-wrap gap-3">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/collections/${c.slug}`}
                    className="text-sm text-accent underline-offset-4 hover:underline"
                    onClick={() => setOpen(false)}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
