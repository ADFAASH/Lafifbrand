export type CheckoutItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  color: string;
  size: string;
};

const STORAGE_KEY = "lafif-checkout";

export function saveCheckoutItem(item: CheckoutItem) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(item));
}

export function loadCheckoutItem(): CheckoutItem | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CheckoutItem;
  } catch {
    return null;
  }
}

export function clearCheckoutItem() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}
