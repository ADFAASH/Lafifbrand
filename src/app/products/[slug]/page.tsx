import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BuyNowForm } from "@/components/BuyNowForm";
import { ProductCard } from "@/components/ProductCard";
import {
  ProductBreadcrumb,
  ProductPhotoPlaceholder,
  RelatedHeading,
} from "@/components/ProductChrome";
import {
  getProductBySlug,
  products,
} from "@/data/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Produit" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const collectionHref = `/collections/${product.category === "outlet" || product.bestseller ? (product.bestseller ? "best-sellers" : product.category) : product.category}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
      <ProductBreadcrumb product={product} collectionHref={collectionHref} />

      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image}
              alt={product.name}
              className="aspect-[3/4] w-full object-cover"
            />
          ) : (
            <ProductPhotoPlaceholder className="w-full" />
          )}
        </div>

        <div className="flex flex-col md:sticky md:top-28 md:self-start">
          <h1 className="font-display text-4xl md:text-5xl">{product.name}</h1>
          <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
            {product.description}
          </p>
          <div className="mt-10">
            <BuyNowForm product={product} />
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-24">
          <RelatedHeading />
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
