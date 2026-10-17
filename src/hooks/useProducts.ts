import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  fetchProductById,
  fetchProducts,
  searchProducts,
} from '../api/products.api';

/**
 * Stable, structured query keys for the Products feature.
 *
 * - `['products', 'list', { search, page, limit }]` — every parameter that
 *   changes the response is part of the key, so different searches and pages
 *   never share cached results, while revisits reuse the cache.
 * - `['products', 'detail', productId]` — one cache entry per product.
 */

export const DEFAULT_PRODUCTS_PAGE_SIZE = 10;
export const PRODUCTS_STALE_TIME_MS = 30_000;

export interface ProductsListKeyParams {
  search: string;
  page: number;
  limit: number;
}

export const productsKeys = {
  all: ['products'] as const,
  list: (params: ProductsListKeyParams) =>
    ['products', 'list', params] as const,
  detail: (productId: number) => ['products', 'detail', productId] as const,
};

export interface UseProductsListOptions {
  /** Effective (trimmed, debounced) search query. Empty = plain listing. */
  search: string;
  /** Zero-based page index. */
  page: number;
  limit?: number;
}

/** Paginated listing + API search. Keeps previous page visible while fetching. */
export function useProductsList({ search, page, limit = DEFAULT_PRODUCTS_PAGE_SIZE }: UseProductsListOptions) {
  const normalizedSearch = search.trim();
  return useQuery({
    queryKey: productsKeys.list({ search: normalizedSearch, page, limit }),
    queryFn: () => {
      const skip = page * limit;
      if (normalizedSearch.length > 0) {
        return searchProducts({ q: normalizedSearch, limit, skip });
      }
      return fetchProducts({ limit, skip });
    },
    staleTime: PRODUCTS_STALE_TIME_MS,
    placeholderData: keepPreviousData,
  });
}

/** Single product details, keyed per product id. */
export function useProductDetail(productId: number | null) {
  return useQuery({
    queryKey: productsKeys.detail(productId ?? -1),
    queryFn: () => {
      if (productId === null) {
        throw new Error('A valid product id is required.');
      }
      return fetchProductById(productId);
    },
    enabled: productId !== null,
    staleTime: PRODUCTS_STALE_TIME_MS,
  });
}
