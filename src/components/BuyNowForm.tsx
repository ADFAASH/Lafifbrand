"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { MOROCCO_CITIES } from "@/data/cities";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";

type BuyNowFormProps = {
  product: Product;
};

export function BuyNowForm({ product }: BuyNowFormProps) {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const [color, setColor] = useState(product.colors[0] ?? "");
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState<string>(MOROCCO_CITIES[1]);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          address,
          city,
          phone,
          product: {
            productId: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            color,
            size,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.error ||
            (locale === "fr"
              ? "Une erreur est survenue."
              : "Something went wrong."),
        );
      }

      router.push(`/confirmation?ref=${encodeURIComponent(data.orderId)}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : locale === "fr"
            ? "Une erreur est survenue."
            : "Something went wrong.",
      );
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <p className="text-xs tracking-[0.2em] uppercase text-muted">{t.price}</p>
        <div className="mt-2 flex items-baseline gap-3">
          <span className="font-display text-3xl">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice ? (
            <span className="text-muted line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          ) : null}
        </div>
      </div>

      {product.colors.length > 0 ? (
        <fieldset>
          <legend className="text-xs tracking-[0.2em] uppercase text-muted">
            {t.color} — {color}
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`border px-4 py-2 text-sm transition-colors ${
                  color === c
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-surface hover:border-accent"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      {product.sizes.length > 0 ? (
        <fieldset>
          <legend className="text-xs tracking-[0.2em] uppercase text-muted">
            {t.size} — {size}
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`min-w-12 border px-4 py-2 text-sm transition-colors ${
                  size === s
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-surface hover:border-accent"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      <div className="border-t border-border pt-8 space-y-5">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-muted">
            {t.checkoutTitle}
          </p>
          <p className="mt-2 text-sm text-muted">{t.checkoutIntro}</p>
        </div>

        <div>
          <label
            htmlFor="fullName"
            className="text-xs tracking-[0.15em] uppercase text-muted"
          >
            {t.fullName}
          </label>
          <input
            id="fullName"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-2 w-full border border-border bg-surface px-4 py-3 outline-none focus:border-accent"
            placeholder="Fatima Zahra Benali"
            autoComplete="name"
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="text-xs tracking-[0.15em] uppercase text-muted"
          >
            {t.address}
          </label>
          <input
            id="address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-2 w-full border border-border bg-surface px-4 py-3 outline-none focus:border-accent"
            placeholder="12 Rue Example, Quartier…"
            autoComplete="street-address"
          />
        </div>

        <div>
          <label
            htmlFor="city"
            className="text-xs tracking-[0.15em] uppercase text-muted"
          >
            {t.city}
          </label>
          <select
            id="city"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-2 w-full border border-border bg-surface px-4 py-3 outline-none focus:border-accent"
          >
            {MOROCCO_CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="phone"
            className="text-xs tracking-[0.15em] uppercase text-muted"
          >
            {t.phone}
          </label>
          <input
            id="phone"
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-2 w-full border border-border bg-surface px-4 py-3 outline-none focus:border-accent"
            placeholder="06 XX XX XX XX"
            autoComplete="tel"
            minLength={8}
          />
        </div>
      </div>

      {error ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-accent px-8 py-4 text-xs tracking-[0.25em] uppercase text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {loading ? t.sending : t.buyNow}
      </button>

      <p className="text-center text-xs text-muted">{t.codMorocco}</p>
    </form>
  );
}
