/**
 * Shared domain types.
 *
 * These interfaces are intentionally small and reusable so they can be
 * consumed by the API layer, the validation schema, and any future
 * state-management or presentation code without duplication.
 */

export interface User {
  id: number;
  name: string;
  email: string;
}

/**
 * Payload accepted when creating a new user.
 * The `id` is assigned by the backend, so it is omitted here.
 */
export type NewUser = Omit<User, 'id'>;
