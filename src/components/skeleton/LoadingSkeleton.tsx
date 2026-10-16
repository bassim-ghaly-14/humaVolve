import { useId } from 'react';

export interface LoadingSkeletonProps {
  /** Number of placeholder lines to render. Defaults to 3. */
  lines?: number;
}

/**
 * Accessible loading placeholder.
 *
 * Uses `role="status"` inside an `aria-live="polite"` region so assistive
 * technologies announce that content is loading, and marks the decorative
 * bars `aria-hidden` so the purely visual shapes are not read aloud.
 *
 * The placeholder lines are static, identical, and never reordered, so an
 * index suffix is safe here. It is combined with `useId()` so keys stay
 * unique when several skeletons render on the same page.
 */
export function LoadingSkeleton({ lines = 3 }: LoadingSkeletonProps) {
  const baseId = useId();
  return (
    <div className="skeleton" role="status" aria-live="polite">
      <span className="skeleton__label">Loading…</span>
      {Array.from({ length: lines }, (_, index) => (
        <div
          key={`${baseId}-line-${index}`}
          className="skeleton__line"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
