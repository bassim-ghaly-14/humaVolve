import { useState } from 'react';
import { Search } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingSkeleton } from '../components/skeleton/LoadingSkeleton';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/products/ProductCard';
import { ProductsPagination } from '../components/products/ProductsPagination';
import { useDebounce } from '../hooks/useDebounce';
import { DEFAULT_PRODUCTS_PAGE_SIZE, useProductsList } from '../hooks/useProducts';

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  return 'Something went wrong while loading products.';
}

/** Products listing: heading, API search, responsive grid, server pagination. */
export default function Products() {
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(0);
  const debouncedInput = useDebounce(searchInput, 350);
  const effectiveSearch = debouncedInput.trim();
  const limit = DEFAULT_PRODUCTS_PAGE_SIZE;

  // Reset pagination when the *effective* (debounced + trimmed) search query
  // changes. This render-phase adjustment is the React-endorsed
  // "adjust state during render" pattern, so no effect is needed and no
  // extra out-of-range request fires for the previous search term.
  const [searchForPage, setSearchForPage] = useState(effectiveSearch);
  let queryPage = page;
  if (searchForPage !== effectiveSearch) {
    setSearchForPage(effectiveSearch);
    setPage(0);
    queryPage = 0;
  }

  const { data, isLoading, isFetching, isError, error, refetch } = useProductsList({
    search: effectiveSearch,
    page: queryPage,
    limit,
  });

  const total = data?.total ?? 0;
  const products = data?.products ?? [];
  const totalPages = total === 0 ? 0 : Math.max(1, Math.ceil(total / limit));
  const safePage = totalPages === 0 ? 0 : Math.min(queryPage, totalPages - 1);

  const showInitialLoading = isLoading && products.length === 0;

  return (
    <main className="page page--wide" aria-labelledby="products-heading">
      <section className="products-hero">
        <p className="eyebrow">HumaVolve catalog</p>
        <h1 id="products-heading">Products</h1>
        <p className="showcase__intro">
          Browse the catalog backed by the DummyJSON products API. Search runs
          against the server, and pages are fetched on demand.
        </p>
      </section>

      <section className="products-toolbar" aria-label="Search and results">
        <div className="products-search">
          <label className="products-search__label" htmlFor="products-search-input">
            Search products
          </label>
          <div className="products-search__field">
            <Search aria-hidden="true" size={16} />
            <input
              id="products-search-input"
              type="search"
              placeholder="Search by keyword, e.g. phone"
              autoComplete="off"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
          </div>
        </div>
        <p className="products-count" aria-live="polite">
          {showInitialLoading
            ? 'Loading products…'
            : isError
              ? 'Products are unavailable right now.'
              : total === 0
                ? 'No products found.'
                : `${total} product${total === 1 ? '' : 's'} found${effectiveSearch ? ` for “${effectiveSearch}”` : ''}`}
          {isFetching && !showInitialLoading ? ' · Updating…' : null}
        </p>
      </section>

      {showInitialLoading ? (
        <LoadingSkeleton lines={6} />
      ) : isError ? (
        <div className="status" role="alert">
          <p>{errorMessage(error)}</p>
          <Button text="Retry" variant="primary" onClick={() => void refetch()} />
        </div>
      ) : products.length === 0 ? (
        <EmptyState
          title={effectiveSearch ? `No results for “${effectiveSearch}”` : 'No products available'}
          description={
            effectiveSearch
              ? 'Try a different keyword or clear the search to browse everything.'
              : 'The catalog returned no products. Please try again later.'
          }
          action={
            effectiveSearch ? (
              <Button text="Clear search" variant="secondary" onClick={() => setSearchInput('')} />
            ) : (
              <Button text="Retry" variant="secondary" onClick={() => void refetch()} />
            )
          }
        />
      ) : (
        <>
          <div className="products-grid" aria-busy={isFetching}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <ProductsPagination
            page={safePage}
            totalPages={totalPages}
            isFetching={isFetching}
            onPageChange={(nextPage) => {
              if (nextPage < 0 || (totalPages > 0 && nextPage >= totalPages)) return;
              setPage(nextPage);
            }}
          />
        </>
      )}
    </main>
  );
}
