import type { User } from '../types/user.types';

/**
 * Lightweight API boundary built on the native Fetch API.
 *
 * This module is the single place that knows how to talk to the users
 * endpoint. Presentation components never call `fetch` directly; they use
 * these typed functions instead.
 *
 * No request is executed at import time, so simply loading the application
 * performs no network activity. Requests only happen when a function below
 * is called.
 */

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Parse a `Response` as JSON and reject unsuccessful HTTP responses with a
 * descriptive error. `fetch` only rejects on network failures, not on HTTP
 * error status codes, so the status is checked explicitly here.
 */
async function parseJsonResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(
      `Request failed with status ${response.status} ${response.statusText}`.trim(),
    );
  }
  return (await response.json()) as T;
}

/** Fetch the full list of users. */
export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/users`);
  return parseJsonResponse<User[]>(response);
}

/** Fetch a single user by id. Rejects when the request is unsuccessful. */
export async function fetchUserById(id: number): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  return parseJsonResponse<User>(response);
}
