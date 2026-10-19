/**
 * Central route path constants.
 *
 * SHOP is the canonical storefront listing (the former Products page).
 * PRODUCTS is kept as a legacy alias so old links keep working.
 * CART is the dedicated full-page shopping cart.
 */

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  HUMAVOLVE: '/humavolve',
  ASSIGNMENT_DETAIL_PATTERN: '/assignments/:id',
  SHOP: '/shop',
  PRODUCTS: '/products',
  PRODUCT_DETAIL_PATTERN: '/products/:id',
  CART: '/cart',
  COLLECTIONS: '/collections',
  CONTACT: '/contact',
} as const;

/** Build a details path for a concrete product id. */
export function productDetail(id: number | string): string {
  return `/products/${id}`;
}

/** Build a details path for a concrete assignment id (e.g. "01"). */
export function assignmentDetail(id: string): string {
  return `/assignments/${id}`;
}

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];


