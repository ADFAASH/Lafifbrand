import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import {
  categories,
  getCategory,
  getProductsByCategory,
  type ProductCategory,
} from "@/data/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Collection" };
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = getProductsByCategory(slug as ProductCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <div className="mb-12 max-w-2xl">
        <p className="text-xs tracking-[0.25em] uppercase text-muted">
          Collection
        </p>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">
          {category.name}
        </h1>
        <p className="mt-4 text-muted">{category.description}</p>
      </div>

      {items.length === 0 ? (
        <p className="text-muted">Aucun produit dans cette collection.</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 md:gap-x-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
