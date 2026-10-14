import { useEffect, useState } from 'react';

/**
 * Return a value that only updates after `delay` milliseconds have elapsed
 * without the input changing. Useful for deferring expensive work such as
 * network requests or filtering while the user is typing.
 *
 * The pending timer is cleared whenever `value` or `delay` changes and on
 * unmount, so no stale timers can leak or fire after cleanup.
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
