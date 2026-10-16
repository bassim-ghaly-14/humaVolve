import type { User } from '../types/user.types';
import { isUser, isUserArray } from '../schemas/user.schema';

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
 *
 * The payload is returned as `unknown` so callers must validate it against
 * the expected shape before use.
 */
async function parseJsonResponse(response: Response): Promise<unknown> {
  if (!response.ok) {
    throw new Error(
      `Request failed with status ${response.status} ${response.statusText}`.trim(),
    );
  }
  return response.json();
}

/** Fetch the full list of users. Rejects when the payload is unexpected. */
export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/users`);
  const payload: unknown = await parseJsonResponse(response);
  if (!isUserArray(payload)) {
    throw new Error('Received an unexpected users payload.');
  }
  return payload;
}

/**
 * Fetch a single user by id. Rejects when the request is unsuccessful or
 * the payload does not match the expected shape.
 */
export async function fetchUserById(id: number): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  const payload: unknown = await parseJsonResponse(response);
  if (!isUser(payload)) {
    throw new Error('Received an unexpected user payload.');
  }
  return payload;
}
