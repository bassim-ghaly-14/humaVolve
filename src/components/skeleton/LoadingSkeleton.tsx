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
 */
export function LoadingSkeleton({ lines = 3 }: LoadingSkeletonProps) {
  return (
    <div className="skeleton" role="status" aria-live="polite">
      <span className="skeleton__label">Loading…</span>
      {Array.from({ length: lines }, (_, index) => (
        <div key={index} className="skeleton__line" aria-hidden="true" />
      ))}
    </div>
  );
}
