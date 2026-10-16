import type { User } from '../types/user.types';

/**
 * Result of a validation attempt.
 *
 * We do not rely on runtime validation provided by TypeScript, because
 * TypeScript types are erased at runtime. This module performs explicit
 * checks so an untrusted value can be validated before it is treated as a
 * `User`.
 */
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate an unknown value against the expected {@link User} shape.
 * Returns a typed result describing whether the value is valid and, if not,
 * which fields failed and why.
 */
export function validateUser(value: unknown): ValidationResult {
  if (typeof value !== 'object' || value === null) {
    return { isValid: false, errors: { root: 'User must be an object.' } };
  }

  const errors: Record<string, string> = {};
  const id: unknown = Reflect.get(value, 'id');
  const name: unknown = Reflect.get(value, 'name');
  const email: unknown = Reflect.get(value, 'email');

  if (typeof id !== 'number' || Number.isNaN(id)) {
    errors.id = 'id must be a number.';
  }

  if (typeof name !== 'string' || name.trim().length === 0) {
    errors.name = 'name must be a non-empty string.';
  }

  if (typeof email !== 'string' || !EMAIL_PATTERN.test(email)) {
    errors.email = 'email must be a valid email address.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/** Type predicate: true only when `value` has the full user shape. */
export function isUser(value: unknown): value is User {
  return validateUser(value).isValid;
}

/** Type predicate for a list of users. */
export function isUserArray(value: unknown): value is User[] {
  return Array.isArray(value) && value.every(isUser);
}
