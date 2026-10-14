/**
 * Format a date value into a human-readable string.
 *
 * Accepts anything the `Date` constructor understands (a `Date`, a timestamp,
 * or a date string). If the value cannot be parsed into a valid date, a
 * fallback string is returned instead of throwing or printing "Invalid Date".
 */
export function formatDate(
  value: Date | string | number,
  locale = 'en-US',
  fallback = '—',
): string {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return fallback;
  }

  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
