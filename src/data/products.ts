export type ProductCategory =
  | "best-sellers"
  | "ensembles"
  | "hijab"
  | "robes"
  | "tops"
  | "outlet";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  colors: string[];
  sizes: string[];
  /** Set to a path like `/products/foo.jpg` when you add images */
  image: string | null;
  featured?: boolean;
  bestseller?: boolean;
};

export const categories: {
  slug: ProductCategory;
  name: string;
  description: string;
}[] = [
  {
    slug: "best-sellers",
    name: "Best-sellers",
    description: "Les pièces préférées de nos clientes.",
  },
  {
    slug: "ensembles",
    name: "Ensembles",
    description: "Sets deux pièces élégants pour chaque occasion.",
  },
  {
    slug: "hijab",
    name: "Hijab",
    description: "Hijabs doux, légers et de qualité premium.",
  },
  {
    slug: "robes",
    name: "Robes",
    description: "Robes longues et fluides pour un style intemporel.",
  },
  {
    slug: "tops",
    name: "Tops",
    description: "T-shirts oversize et chemises signature.",
  },
  {
    slug: "outlet",
    name: "Outlet",
    description: "Sélection à prix réduits, stocks limités.",
  },
];

export const products: Product[] = [
  {
    id: "1",
    slug: "ensemble-deux-pieces-sable",
    name: "Ensemble deux pièces Sable",
    description:
      "Ensemble fluide en tissu premium, coupe ample et élégante. Idéal pour le quotidien comme pour les occasions spéciales.",
    price: 490,
    category: "ensembles",
    colors: ["Sable", "Noir", "Olive"],
    sizes: ["S", "M", "L", "XL"],
    image: "/products/ensemble-deux-pieces-sable.jpg",
    featured: true,
    bestseller: true,
  },
  {
    id: "2",
    slug: "hijab-jersey-premium",
    name: "Hijab Jersey Premium",
    description:
      "Hijab en jersey premium, doux et opaque. Maintien confortable toute la journée.",
    price: 89,
    category: "hijab",
    colors: ["Noir", "Beige", "Marron", "Blanc cassé"],
    sizes: ["Unique"],
    image: "/products/hijab-jersey-premium.jpg",
    bestseller: true,
  },
  {
    id: "3",
    slug: "robe-longue-noura",
    name: "Robe longue Noura",
    description:
      "Robe longue à la coupe droite, manches amples et tombé fluide. Une pièce signature Lafif.",
    price: 420,
    category: "robes",
    colors: ["Noir", "Camel", "Bordeaux"],
    sizes: ["S", "M", "L", "XL"],
    image: "/products/robe-longue-noura.jpg",
    featured: true,
    bestseller: true,
  },
  {
    id: "4",
    slug: "tshirt-oversize-lafif",
    name: "T-shirt oversize Lafif",
    description:
      "Notre t-shirt signature en coton premium 100 %. Confort et élégance pour accompagner vos plus beaux jours.",
    price: 199,
    category: "tops",
    colors: ["Blanc", "Noir", "Gris chiné"],
    sizes: ["S", "M", "L", "XL"],
    image: "/products/tshirt-oversize-lafif.jpg",
    featured: true,
    bestseller: true,
  },
  {
    id: "5",
    slug: "hijab-modal-doux",
    name: "Hijab Modal Doux",
    description:
      "Hijab en modal ultra-doux, légère chute et finitions soignées.",
    price: 110,
    category: "hijab",
    colors: ["Noir", "Taupe", "Rose poudré", "Bleu nuit"],
    sizes: ["Unique"],
    image: "/products/hijab-modal-doux.jpg",
    bestseller: true,
  },
  {
    id: "6",
    slug: "ensemble-jupe-amira",
    name: "Ensemble jupe Amira",
    description:
      "Haut et jupe assortis, silhouette raffinée et tissu confortable.",
    price: 520,
    category: "ensembles",
    colors: ["Kaki", "Chocolat", "Noir"],
    sizes: ["S", "M", "L"],
    image: "/products/ensemble-jupe-amira.jpg",
  },
  {
    id: "7",
    slug: "chemise-oversize-lin",
    name: "Chemise oversize Lin",
    description:
      "Chemise ample en mélange lin, manches longues et boutonnage discret.",
    price: 280,
    category: "tops",
    colors: ["Écru", "Olive", "Noir"],
    sizes: ["S", "M", "L", "XL"],
    image: "/products/chemise-oversize-lin.jpg",
  },
  {
    id: "8",
    slug: "robe-longue-yasmin",
    name: "Robe longue Yasmin",
    description:
      "Robe longue fluide avec détails subtils, parfaite pour l'été marocain.",
    price: 390,
    compareAtPrice: 450,
    category: "outlet",
    colors: ["Blanc cassé", "Sauge"],
    sizes: ["S", "M", "L"],
    image: "/products/robe-longue-yasmin.jpg",
  },
  {
    id: "9",
    slug: "hijab-bambou",
    name: "Hijab Bambou",
    description:
      "Hijab en fibre de bambou, respirant et idéal pour le sport et le quotidien.",
    price: 95,
    category: "hijab",
    colors: ["Noir", "Gris", "Marine"],
    sizes: ["Unique"],
    image: "/products/hijab-bambou.jpg",
  },
  {
    id: "10",
    slug: "ensemble-pantalon-lina",
    name: "Ensemble pantalon Lina",
    description:
      "Ensemble haut et pantalon large, look moderne et confortable.",
    price: 510,
    category: "ensembles",
    colors: ["Noir", "Camel", "Bordeaux"],
    sizes: ["S", "M", "L", "XL"],
    image: "/products/ensemble-pantalon-lina.jpg",
    bestseller: true,
  },
  {
    id: "11",
    slug: "hijab-sparkle",
    name: "Hijab Sparkle",
    description:
      "Hijab légèrement scintillant pour vos soirées et événements.",
    price: 130,
    compareAtPrice: 160,
    category: "outlet",
    colors: ["Noir", "Or rose", "Argent"],
    sizes: ["Unique"],
    image: "/products/hijab-sparkle.jpg",
  },
  {
    id: "12",
    slug: "robe-longue-sara",
    name: "Robe longue Sara",
    description:
      "Robe longue élégante à col montant, coupe fluide et intemporelle.",
    price: 440,
    category: "robes",
    colors: ["Noir", "Vert olive", "Marron"],
    sizes: ["S", "M", "L", "XL"],
    image: "/products/robe-longue-sara.jpg",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  if (category === "best-sellers") {
    return products.filter((p) => p.bestseller);
  }
  return products.filter((p) => p.category === category);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function formatPrice(amount: number): string {
  return `${amount.toLocaleString("fr-MA")} DH`;
}
