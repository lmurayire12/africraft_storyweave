import { Product, products } from "./mockData";

const CUSTOM_PRODUCTS_KEY = "africraft_custom_products";

function getStorage() {
  return window.localStorage;
}

function getCustomProducts(): Product[] {
  const raw = getStorage().getItem(CUSTOM_PRODUCTS_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as Product[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setCustomProducts(items: Product[]) {
  getStorage().setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(items));
}

export function getAllProducts() {
  return [...products, ...getCustomProducts()];
}

export function getOnlyCustomProducts() {
  return getCustomProducts();
}

export function addCustomProduct(product: Product) {
  const current = getCustomProducts();
  setCustomProducts([product, ...current]);
}

export function deleteCustomProduct(productId: string) {
  const current = getCustomProducts();
  setCustomProducts(current.filter((item) => item.id !== productId));
}
