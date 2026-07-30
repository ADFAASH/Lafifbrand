"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import type { Product } from "@/data/products";

type ProductBreadcrumbProps = {
  product: Product;
  collectionHref: string;
};

export function ProductBreadcrumb({
  product,
  collectionHref,
}: ProductBreadcrumbProps) {
  const { t } = useLanguage();

  return (
    <nav className="mb-8 text-xs tracking-wide text-muted">
      <Link href="/" className="hover:text-accent">
        {t.home}
      </Link>
      <span className="mx-2">/</span>
      <Link href={collectionHref} className="hover:text-accent">
        {t.collection}
      </Link>
      <span className="mx-2">/</span>
      <span className="text-foreground">{product.name}</span>
    </nav>
  );
}

export function RelatedHeading() {
  const { t } = useLanguage();
  return <h2 className="font-display text-3xl">{t.youMayAlsoLike}</h2>;
}

export function ProductPhotoPlaceholder({
  className,
}: {
  className?: string;
}) {
  const { t } = useLanguage();
  return (
    <ImagePlaceholder
      aspect="product"
      label={`${t.productPhoto} — ${t.imageComing}`}
      className={className}
    />
  );
}
