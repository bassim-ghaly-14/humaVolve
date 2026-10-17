import type {
  Product,
  ProductListParams,
  ProductSearchParams,
  ProductsResponse,
} from '../types/product.types';
import { isProduct, isProductsResponse } from '../schemas/product.schema';

/**
 * Typed API boundary for the DummyJSON products endpoints.
 * Mirrors the conventions of `users.api.ts`: native fetch, explicit
 * `response.ok` checks, and runtime payload validation before returning.
 */

const PRODUCTS_BASE_URL = 'https://dummyjson.com/products';

async function parseJsonResponse(response: Response): Promise<unknown> {
  if (!response.ok) {
    throw new Error(
      `Request failed with status ${response.status} ${response.statusText}`.trim(),
    );
  }
  return response.json();
}

/** Fetch one page of products: GET /products?limit=&skip= */
export async function fetchProducts(
  params: ProductListParams,
): Promise<ProductsResponse> {
  const url = new URL(PRODUCTS_BASE_URL);
  url.searchParams.set('limit', String(params.limit));
  url.searchParams.set('skip', String(params.skip));
  const response = await fetch(url.toString());
  const payload: unknown = await parseJsonResponse(response);
  if (!isProductsResponse(payload)) {
    throw new Error('Received an unexpected products payload.');
  }
  return payload;
}

/** Search products by keyword: GET /products/search?q=&limit=&skip= */
export async function searchProducts(
  params: ProductSearchParams,
): Promise<ProductsResponse> {
  const url = new URL(`${PRODUCTS_BASE_URL}/search`);
  url.searchParams.set('q', params.q);
  url.searchParams.set('limit', String(params.limit));
  url.searchParams.set('skip', String(params.skip));
  const response = await fetch(url.toString());
  const payload: unknown = await parseJsonResponse(response);
  if (!isProductsResponse(payload)) {
    throw new Error('Received an unexpected product search payload.');
  }
  return payload;
}

/** Fetch a single product: GET /products/:id */
export async function fetchProductById(id: number): Promise<Product> {
  const response = await fetch(`${PRODUCTS_BASE_URL}/${id}`);
  const payload: unknown = await parseJsonResponse(response);
  if (!isProduct(payload)) {
    throw new Error('Received an unexpected product payload.');
  }
  return payload;
}
