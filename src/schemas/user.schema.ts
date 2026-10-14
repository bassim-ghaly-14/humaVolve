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
  const candidate = value as Partial<Record<keyof User, unknown>>;

  if (typeof candidate.id !== 'number' || Number.isNaN(candidate.id)) {
    errors.id = 'id must be a number.';
  }

  if (typeof candidate.name !== 'string' || candidate.name.trim().length === 0) {
    errors.name = 'name must be a non-empty string.';
  }

  if (typeof candidate.email !== 'string' || !EMAIL_PATTERN.test(candidate.email)) {
    errors.email = 'email must be a valid email address.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
