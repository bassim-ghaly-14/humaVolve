import { Button } from '../ui/Button';

export interface ProductsPaginationProps {
  /** Zero-based current page index. */
  page: number;
  /** Total pages derived from the API `total`. */
  totalPages: number;
  /** True while the next page is being fetched in the background. */
  isFetching?: boolean;
  onPageChange: (page: number) => void;
}

function pageNumbers(page: number, totalPages: number): number[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index);
  }
  const windowStart = Math.max(0, Math.min(page - 2, totalPages - 5));
  return Array.from({ length: 5 }, (_, index) => windowStart + index);
}

/** Accessible server-driven pagination controls. */
export function ProductsPagination({
  page,
  totalPages,
  isFetching = false,
  onPageChange,
}: ProductsPaginationProps) {
  if (totalPages <= 1) return null;
  const numbers = pageNumbers(page, totalPages);

  return (
    <nav className="products-pagination" aria-label="Products pagination">
      <Button
        text="Previous"
        variant="secondary"
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
        aria-label="Go to previous page"
      />
      <div className="products-pagination__pages" role="group" aria-label="Page numbers">
        {numbers.map((pageIndex) => (
          <button
            key={pageIndex}
            type="button"
            className={
              pageIndex === page
                ? 'products-pagination__page products-pagination__page--active'
                : 'products-pagination__page'
            }
            aria-label={`Go to page ${pageIndex + 1}`}
            aria-current={pageIndex === page ? 'page' : undefined}
            onClick={() => onPageChange(pageIndex)}
          >
            {pageIndex + 1}
          </button>
        ))}
        {totalPages > 7 ? (
          <span className="products-pagination__of" aria-hidden="true">
            …
          </span>
        ) : null}
      </div>
      <Button
        text={isFetching ? 'Loading…' : 'Next'}
        variant="secondary"
        disabled={page >= totalPages - 1}
        onClick={() => onPageChange(page + 1)}
        aria-label="Go to next page"
      />
      <p className="products-pagination__status" aria-live="polite">
        Page {totalPages === 0 ? 0 : page + 1} of {totalPages}
      </p>
    </nav>
  );
}
