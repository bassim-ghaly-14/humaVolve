/**
 * Central route path constants.
 *
 * These are plain string paths, independent of any routing library, so they
 * can be used for links, tests, or a future router without changes.
 */
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
