"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState, type FormEvent } from "react";
import { genericError } from "@/components/BuyNowForm";
import { useLanguage } from "@/components/LanguageProvider";
import { MOROCCO_CITIES } from "@/data/cities";
import { formatPrice, getProductBySlug } from "@/data/products";
import {
  clearCheckoutItem,
  loadCheckoutItem,
  saveCheckoutItem,
  type CheckoutItem,
} from "@/lib/checkout";

function resolveCheckoutItem(
  slug: string | null,
  color: string | null,
  size: string | null,
): CheckoutItem | null {
  if (slug) {
    const product = getProductBySlug(slug);
    if (product) {
      const item: CheckoutItem = {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        color: color || product.colors[0] || "",
        size: size || product.sizes[0] || "",
      };
      saveCheckoutItem(item);
      return item;
    }
  }
  return loadCheckoutItem();
}

function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, locale } = useLanguage();

  const initialItem = useMemo(
    () =>
      resolveCheckoutItem(
        searchParams.get("slug"),
        searchParams.get("color"),
        searchParams.get("size"),
      ),
    [searchParams],
  );

  const [item, setItem] = useState<CheckoutItem | null>(initialItem);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState<string>(MOROCCO_CITIES[1]);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const resolved = resolveCheckoutItem(
      searchParams.get("slug"),
      searchParams.get("color"),
      searchParams.get("size"),
    );
    setItem(resolved);
    setReady(true);
  }, [searchParams]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!item) return;

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
          product: item,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || genericError(locale));
      }

      clearCheckoutItem();
      router.push(`/confirmation?ref=${encodeURIComponent(data.orderId)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : genericError(locale));
      setLoading(false);
    }
  }

  if (!ready) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center text-muted">
        {t.loading}
      </div>
    );
  }

  if (!item) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-4xl">{t.noOrder}</h1>
        <p className="mt-4 text-muted">{t.noOrderText}</p>
        <Link
          href="/collections/best-sellers"
          className="mt-8 inline-block bg-accent px-8 py-3 text-xs tracking-[0.2em] uppercase text-white"
        >
          {t.seeProducts}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 md:px-8">
      <h1 className="font-display text-4xl md:text-5xl">{t.checkoutTitle}</h1>
      <p className="mt-3 text-muted">{t.checkoutIntro}</p>

      <div className="mt-12 grid gap-12 md:grid-cols-5">
        <form onSubmit={handleSubmit} className="space-y-6 md:col-span-3">
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
            {loading ? t.sending : t.confirmOrder}
          </button>
        </form>

        <aside className="h-fit border border-border bg-surface p-6 md:col-span-2">
          <h2 className="text-xs tracking-[0.2em] uppercase text-muted">
            {t.yourOrder}
          </h2>
          <p className="mt-4 font-display text-2xl">{item.name}</p>
          <dl className="mt-4 space-y-2 text-sm text-muted">
            <div className="flex justify-between">
              <dt>{t.color}</dt>
              <dd className="text-foreground">{item.color}</dd>
            </div>
            <div className="flex justify-between">
              <dt>{t.size}</dt>
              <dd className="text-foreground">{item.size}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base">
              <dt className="text-foreground">{t.total}</dt>
              <dd className="font-medium text-foreground">
                {formatPrice(item.price)}
              </dd>
            </div>
          </dl>
          <p className="mt-6 text-xs leading-relaxed text-muted">{t.codNote}</p>
        </aside>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const { t } = useLanguage();

  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-lg px-4 py-24 text-center text-muted">
          {t.loading}
        </div>
      }
    >
      <CheckoutForm />
    </Suspense>
  );
}
