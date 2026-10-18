import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingSkeleton } from '../components/skeleton/LoadingSkeleton';
import { Button } from '../components/ui/Button';
import { HumaVolveHero } from '../components/humavolve/HumaVolveHero';
import { ShopFilters } from '../components/shop/ShopFilters';
import { ShopCard } from '../components/shop/ShopCard';
import { ShopCartDrawer, type CartLine } from '../components/shop/ShopCartDrawer';
import { getShopCategory, useShopKeywordFilter, type ShopCategoryKey } from '../components/shop/shopCatalog';
import { ProductsPagination } from '../components/products/ProductsPagination';
import { useDebounce } from '../hooks/useDebounce';
import { SHOP_PRODUCTS_PAGE_SIZE, useShopProductsList } from '../hooks/useProducts';
import type { Product } from '../types/product.types';

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  return 'Something went wrong while loading products.';
}

function addLine(lines: CartLine[], product: Product): CartLine[] {
  const existing = lines.find((line) => line.product.id === product.id);
  if (existing) {
    return lines.map((line) =>
      line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line,
    );
  }
  return [...lines, { product, quantity: 1 }];
}

/**
 * Shop page — HumaVolveHero kept at the top (moved from HumaVolve);
 * original Shop content (filters, product grid, pagination, status states)
 * restored beneath it. The standalone in-page Cart button stays removed;
 * the shared navbar's View Cart link (`/shop?cart=open`) opens the drawer.
 */
export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState<ShopCategoryKey>('all');
  const [page, setPage] = useState(0);
  const [cartLines, setCartLines] = useState<CartLine[]>([]);

  // VIEW CART destination: the navbar links to /shop?cart=open, which opens
  // this existing drawer. Closing removes the param so refresh stays clean.
  const drawerOpen = searchParams.get('cart') === 'open';
  const closeCart = (): void => {
    const params = new URLSearchParams(searchParams);
    params.delete('cart');
    setSearchParams(params, { replace: true });
  };

  // Single search interface: the navbar input owns the URL `search` parameter
  // and this page reads it, so there is no duplicated search state.
  const urlSearch = searchParams.get('search') ?? '';
  const debouncedInput = useDebounce(urlSearch, 350);
  const effectiveSearch = debouncedInput.trim();

  const clearSearch = (): void => {
    const params = new URLSearchParams(searchParams);
    params.delete('search');
    setSearchParams(params, { replace: true });
  };
  const activeCategory = getShopCategory(category);
  const limit = SHOP_PRODUCTS_PAGE_SIZE;

  // Reset pagination when the *effective* search query or category changes.
  // React-endorsed "adjust state during render" pattern — no effect needed.
  const [searchForPage, setSearchForPage] = useState(effectiveSearch);
  const [categoryForPage, setCategoryForPage] = useState(category);
  let queryPage = page;
  if (searchForPage !== effectiveSearch || categoryForPage !== category) {
    setSearchForPage(effectiveSearch);
    setCategoryForPage(category);
    setPage(0);
    queryPage = 0;
  }

  const { data, isLoading, isFetching, isError, error, refetch } = useShopProductsList({
    search: effectiveSearch,
    categories: activeCategory.slugs,
    page: queryPage,
    limit,
  });

  // Keyword-only pills (e.g. Haircare) filter the fetched curated slice.
  const keywordFiltered = useShopKeywordFilter(data?.products ?? [], activeCategory.keyword);
  const products = useMemo(() => keywordFiltered, [keywordFiltered]);
  const total = activeCategory.keyword ? products.length : (data?.total ?? 0);

  const totalPages = total === 0 ? 0 : Math.max(1, Math.ceil(total / limit));
  const safePage = totalPages === 0 ? 0 : Math.min(queryPage, totalPages - 1);
  const visibleProducts = activeCategory.keyword
    ? products.slice(safePage * limit, safePage * limit + limit)
    : products;

  const showInitialLoading = isLoading && products.length === 0;

  return (
    <main className="shop-page" aria-labelledby="hv-hero-heading">
      <div className="shop-shell">
        <HumaVolveHero />
        <ShopFilters active={category} onChange={(key) => setCategory(key)} />

        {showInitialLoading ? (
          <div className="shop-status" aria-live="polite">
            <LoadingSkeleton lines={8} />
          </div>
        ) : isError ? (
          <div className="shop-status" role="alert">
            <p>{errorMessage(error)}</p>
            <Button text="Retry" variant="primary" onClick={() => void refetch()} />
          </div>
        ) : visibleProducts.length === 0 ? (
          <div className="shop-status">
            <EmptyState
              title={effectiveSearch ? `No results for “${effectiveSearch}”` : `No products in ${activeCategory.label}`}
              description="Try a different keyword or another category."
              action={
                effectiveSearch ? (
                  <Button text="Clear search" variant="secondary" onClick={clearSearch} />
                ) : (
                  <Button text="View all products" variant="secondary" onClick={() => setCategory('all')} />
                )
              }
            />
          </div>
        ) : (
          <>
            <div className="shop-grid" aria-busy={isFetching}>
              {visibleProducts.map((product) => (
                <ShopCard
                  key={product.id}
                  product={product}
                  onAdd={(item) => setCartLines((lines) => addLine(lines, item))}
                />
              ))}
            </div>
            {isFetching && !showInitialLoading ? (
              <p className="shop-updating" aria-live="polite">Updating…</p>
            ) : null}
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

      </div>

      <ShopCartDrawer
        open={drawerOpen}
        lines={cartLines}
        onClose={closeCart}
        onRemove={(id) => setCartLines((lines) => lines.filter((line) => line.product.id !== id))}
        onClear={() => setCartLines([])}
      />
    </main>
  );
}
