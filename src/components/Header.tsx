"use client";

import Link from "next/link";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/components/LanguageProvider";
import { categories } from "@/data/products";

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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <button
          type="button"
          className="md:hidden text-sm tracking-wide uppercase"
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? t.close : t.menu}
        </button>

        <nav className="hidden flex-1 items-center gap-5 lg:gap-6 md:flex">
          {navLinks.slice(0, 4).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs tracking-[0.14em] uppercase text-foreground/80 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <span className="font-display text-3xl tracking-[0.28em] uppercase md:text-4xl">
            Lafif
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-end gap-5 lg:gap-6 md:flex">
          {navLinks.slice(4).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs tracking-[0.14em] uppercase text-foreground/80 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/faq"
            className="text-xs tracking-[0.14em] uppercase text-foreground/80 transition-colors hover:text-accent"
          >
            {t.faq}
          </Link>
          <LanguageSwitcher />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background px-4 py-6 md:hidden">
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
