/**
 * Central route path constants.
 */

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PRODUCTS: '/products',
  PRODUCT_DETAIL_PATTERN: '/products/:id',
} as const;

/** Build a details path for a concrete product id. */
export function productDetail(id: number | string): string {
  return `/products/${id}`;
}

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];

