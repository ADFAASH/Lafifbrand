import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { MOROCCO_CITIES } from "@/data/cities";
import { getProductBySlug } from "@/data/products";

export type Order = {
  id: string;
  createdAt: string;
  fullName: string;
  address: string;
  city: string;
  phone: string;
  product: {
    productId: string;
    slug: string;
    name: string;
    price: number;
    color: string;
    size: string;
  };
};

const ORDERS_PATH = path.join(process.cwd(), "data", "orders.json");

async function ensureOrdersFile() {
  const dir = path.dirname(ORDERS_PATH);
  await fs.mkdir(dir, { recursive: true });
  try {
    await fs.access(ORDERS_PATH);
  } catch {
    await fs.writeFile(ORDERS_PATH, "[]", "utf8");
  }
}

function generateOrderId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `LF-${stamp}-${rand}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const fullName = String(body.fullName ?? "").trim();
    const address = String(body.address ?? "").trim();
    const city = String(body.city ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const product = body.product;

    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { error: "Veuillez indiquer votre nom complet." },
        { status: 400 },
      );
    }
    if (!address || address.length < 5) {
      return NextResponse.json(
        { error: "Veuillez indiquer une adresse valide." },
        { status: 400 },
      );
    }
    if (!city || !MOROCCO_CITIES.includes(city as (typeof MOROCCO_CITIES)[number])) {
      return NextResponse.json(
        { error: "Veuillez sélectionner une ville au Maroc." },
        { status: 400 },
      );
    }
    if (!phone || phone.replace(/\D/g, "").length < 8) {
      return NextResponse.json(
        { error: "Veuillez indiquer un numéro de téléphone valide." },
        { status: 400 },
      );
    }
    if (!product?.slug || !product?.color || !product?.size) {
      return NextResponse.json(
        { error: "Produit manquant. Recommencez depuis la fiche produit." },
        { status: 400 },
      );
    }

    const catalogProduct = getProductBySlug(product.slug);
    if (!catalogProduct) {
      return NextResponse.json(
        { error: "Produit introuvable." },
        { status: 400 },
      );
    }

    const order: Order = {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      fullName,
      address,
      city,
      phone,
      product: {
        productId: catalogProduct.id,
        slug: catalogProduct.slug,
        name: catalogProduct.name,
        price: catalogProduct.price,
        color: String(product.color),
        size: String(product.size),
      },
    };

    await ensureOrdersFile();
    const raw = await fs.readFile(ORDERS_PATH, "utf8");
    const orders: Order[] = JSON.parse(raw || "[]");
    orders.push(order);
    await fs.writeFile(ORDERS_PATH, JSON.stringify(orders, null, 2), "utf8");

    return NextResponse.json({ orderId: order.id });
  } catch {
    return NextResponse.json(
      { error: "Impossible d'enregistrer la commande." },
      { status: 500 },
    );
  }
}
