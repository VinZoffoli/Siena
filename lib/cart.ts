// Cart lives in localStorage (not a real backend) so it survives navigation
// between /order-online and /checkout. Keys match order-menu's keyFor format:
// `${tabIdx}-${subIdx}-${itemIdx}`.
export const CART_STORAGE_KEY = "siena-order-cart";

export function loadCart(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveCart(cart: Record<string, number>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // localStorage can throw in private-browsing/quota-exceeded edge cases;
    // the cart just won't persist across navigation in that case.
  }
}
