import type { Product, ProductsResponse } from '../types/product.types';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/** Type predicate for a single product. Required fields are strict; the rest stay optional. */
export function isProduct(value: unknown): value is Product {
  if (!isRecord(value)) return false;
  const { id, title, description, category, price, rating, thumbnail } = value;
  return (
    typeof id === 'number' &&
    typeof title === 'string' &&
    typeof description === 'string' &&
    typeof category === 'string' &&
    typeof price === 'number' &&
    typeof rating === 'number' &&
    typeof thumbnail === 'string'
  );
}

/** Type predicate for the paginated products response. */
export function isProductsResponse(value: unknown): value is ProductsResponse {
  if (!isRecord(value)) return false;
  const { products, total, skip, limit } = value;
  return (
    Array.isArray(products) &&
    products.every(isProduct) &&
    typeof total === 'number' &&
    typeof skip === 'number' &&
    typeof limit === 'number'
  );
}
