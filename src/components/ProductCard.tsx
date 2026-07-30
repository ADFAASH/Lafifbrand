import Link from "next/link";
import { formatPrice, type Product } from "@/data/products";
import { ImagePlaceholder } from "./ImagePlaceholder";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block transition-opacity hover:opacity-90"
    >
      <div className="overflow-hidden">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <ImagePlaceholder label="Photo produit" aspect="product" />
        )}
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="font-display text-lg tracking-wide text-foreground">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2 text-sm">
          <span className="text-foreground">{formatPrice(product.price)}</span>
          {product.compareAtPrice ? (
            <span className="text-muted line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          ) : null}
        </div>
        {product.colors.length > 0 ? (
          <p className="text-xs text-muted">
            {product.colors.slice(0, 3).join(" · ")}
            {product.colors.length > 3 ? "…" : ""}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
