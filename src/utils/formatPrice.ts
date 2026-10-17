/**
 * Format a numeric price consistently as USD currency.
 * Falls back to a placeholder for non-finite input.
 */
export function formatPrice(value: number, fallback = '—'): string {
  if (!Number.isFinite(value)) return fallback;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}
