"use client";

import Link from "next/link";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { ProductCard } from "@/components/ProductCard";
import { useLanguage } from "@/components/LanguageProvider";
import { products } from "@/data/products";

export default function HomePage() {
  const { t } = useLanguage();
  const bestsellers = products.filter((p) => p.bestseller).slice(0, 8);
  const featured = products.find((p) => p.slug === "tshirt-oversize-lafif");

  return (
    <>
      <section className="relative overflow-hidden">
        <ImagePlaceholder aspect="hero" label="Image Lafif" />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/45 via-black/10 to-transparent">
          <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-32 md:px-8 md:pb-24">
            <p className="animate-fade-up text-xs tracking-[0.35em] uppercase text-white/90">
              {t.heroEyebrow}
            </p>
            <h1 className="animate-fade-up delay-1 mt-3 font-display text-5xl text-white md:text-7xl md:tracking-wide">
              Lafif
            </h1>
            <p className="animate-fade-up delay-2 mt-4 max-w-md text-sm leading-relaxed text-white/90 md:text-base">
              {t.heroText}
            </p>
            <div className="animate-fade-up delay-3 mt-8 flex flex-wrap gap-4">
              <Link
                href="/collections/best-sellers"
                className="bg-white px-8 py-3 text-xs tracking-[0.2em] uppercase text-foreground transition-opacity hover:opacity-90"
              >
                {t.seeBestsellers}
              </Link>
              <Link
                href="/collections/ensembles"
                className="border border-white/70 px-8 py-3 text-xs tracking-[0.2em] uppercase text-white transition-colors hover:bg-white/10"
              >
                {t.ensembles}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-muted">
              {t.selection}
            </p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">
              {t.bestsellers}
            </h2>
          </div>
          <Link
            href="/collections/best-sellers"
            className="text-xs tracking-[0.2em] uppercase text-accent underline-offset-4 hover:underline"
          >
            {t.seeAll}
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-7xl md:grid-cols-2">
          <ImagePlaceholder
            aspect="wide"
            label="Image collection"
            className="min-h-[50vh] md:aspect-auto md:h-full"
          />
          <div className="flex flex-col justify-center px-6 py-16 md:px-14">
            <p className="text-xs tracking-[0.25em] uppercase text-muted">
              {t.signaturePiece}
            </p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              {t.oversizedTee}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted md:text-base">
              {t.oversizedTeeText}
            </p>
            {featured ? (
              <Link
                href={`/products/${featured.slug}`}
                className="mt-8 inline-flex w-fit bg-accent px-8 py-3 text-xs tracking-[0.2em] uppercase text-white transition-opacity hover:opacity-90"
              >
                {t.discover}
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-20 md:grid-cols-2 md:px-8">
        <Link href="/a-propos" className="group relative overflow-hidden">
          <ImagePlaceholder
            aspect="wide"
            label="Image story"
            className="min-h-[40vh]"
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/50 to-transparent p-8">
            <p className="text-xs tracking-[0.25em] uppercase text-white/80">
              {t.ourStory}
            </p>
            <h3 className="mt-2 font-display text-3xl text-white">
              {t.discoverBrand}
            </h3>
            <span className="mt-4 text-xs tracking-[0.2em] uppercase text-white underline-offset-4 group-hover:underline">
              {t.learnMore}
            </span>
          </div>
        </Link>
        <Link
          href="/collections/hijab"
          className="group relative overflow-hidden"
        >
          <ImagePlaceholder
            aspect="wide"
            label="Image hijab"
            className="min-h-[40vh]"
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/50 to-transparent p-8">
            <p className="text-xs tracking-[0.25em] uppercase text-white/80">
              {t.collection}
            </p>
            <h3 className="mt-2 font-display text-3xl text-white">
              {t.premiumHijabs}
            </h3>
            <span className="mt-4 text-xs tracking-[0.2em] uppercase text-white underline-offset-4 group-hover:underline">
              {t.explore}
            </span>
          </div>
        </Link>
      </section>

      <section className="border-t border-border bg-accent-soft/50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 text-center md:grid-cols-3 md:px-8">
          <div>
            <p className="font-display text-2xl">{t.shippingMa}</p>
            <p className="mt-2 text-sm text-muted">{t.shippingMaText}</p>
          </div>
          <div>
            <p className="font-display text-2xl">{t.cod}</p>
            <p className="mt-2 text-sm text-muted">{t.codText}</p>
          </div>
          <div>
            <p className="font-display text-2xl">{t.simpleOrder}</p>
            <p className="mt-2 text-sm text-muted">{t.simpleOrderText}</p>
          </div>
        </div>
      </section>
    </>
  );
}
