import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { EmptyState } from "../components/common/EmptyState";
import { LoadingSkeleton } from "../components/skeleton/LoadingSkeleton";
import { Button } from "../components/ui/Button";
import { HumaVolveHero } from "../components/humavolve/HumaVolveHero";
import { ShopFilters } from "../components/shop/ShopFilters";
import { ShopCard } from "../components/shop/ShopCard";
import { useShopCart } from "../hooks/useShopCart";
import {
  getShopCategory,
  useShopKeywordFilter,
  type ShopCategoryKey,
} from "../components/shop/shopCatalog";
import { ProductsPagination } from "../components/products/ProductsPagination";
import { useDebounce } from "../hooks/useDebounce";
import {
  SHOP_PRODUCTS_PAGE_SIZE,
  useShopProductsList,
} from "../hooks/useProducts";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong while loading products.";
}

function updateSearchParams(
  searchParams: URLSearchParams,
  setSearchParams: ReturnType<typeof useSearchParams>[1],
  key: string,
  value?: string,
): void {
  const params = new URLSearchParams(searchParams);

  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }

  setSearchParams(params, { replace: true });
}

function getTotalPages(total: number, limit: number): number {
  if (total === 0) {
    return 0;
  }

  return Math.max(1, Math.ceil(total / limit));
}

function getSafePage(page: number, totalPages: number): number {
  if (totalPages === 0) {
    return 0;
  }

  return Math.min(page, totalPages - 1);
}

function ShopStatus({
  isLoading,
  isError,
  error,
  hasProducts,
  search,
  categoryLabel,
  onRetry,
  onClearSearch,
  onViewAll,
}: {
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  hasProducts: boolean;
  search: string;
  categoryLabel: string;
  onRetry: () => void;
  onClearSearch: () => void;
  onViewAll: () => void;
}) {
  if (isLoading && !hasProducts) {
    return (
      <div className="shop-status" aria-live="polite">
        <LoadingSkeleton lines={8} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="shop-status" role="alert">
        <p>{errorMessage(error)}</p>
        <Button text="Retry" variant="primary" onClick={onRetry} />
      </div>
    );
  }

  if (hasProducts) {
    return null;
  }

  return (
    <div className="shop-status">
      <EmptyState
        title={
          search
            ? `No results for “${search}”`
            : `No products in ${categoryLabel}`
        }
        description="Try a different keyword or another category."
        action={
          search ? (
            <Button
              text="Clear search"
              variant="secondary"
              onClick={onClearSearch}
            />
          ) : (
            <Button
              text="View all products"
              variant="secondary"
              onClick={onViewAll}
            />
          )
        }
      />
    </div>
  );
}

/**
 * Shop page — preserves existing behavior and applies a subtle,
 * page-scoped typography increase without affecting the hero.
 */
export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState<ShopCategoryKey>("all");
  const [page, setPage] = useState(0);
  const { addProduct } = useShopCart();

  const urlSearch = searchParams.get("search") ?? "";
  const effectiveSearch = useDebounce(urlSearch, 350).trim();

  const clearSearch = (): void => {
    updateSearchParams(searchParams, setSearchParams, "search");
  };

  const activeCategory = getShopCategory(category);
  const limit = SHOP_PRODUCTS_PAGE_SIZE;

  const [searchForPage, setSearchForPage] = useState(effectiveSearch);
  const [categoryForPage, setCategoryForPage] = useState(category);

  let queryPage = page;

  if (searchForPage !== effectiveSearch || categoryForPage !== category) {
    setSearchForPage(effectiveSearch);
    setCategoryForPage(category);
    setPage(0);
    queryPage = 0;
  }

  const { data, isLoading, isFetching, isError, error, refetch } =
    useShopProductsList({
      search: effectiveSearch,
      categories: activeCategory.slugs,
      page: queryPage,
      limit,
    });

  const keywordFiltered = useShopKeywordFilter(
    data?.products ?? [],
    activeCategory.keyword,
  );

  const products = useMemo(() => keywordFiltered, [keywordFiltered]);
  const total = activeCategory.keyword ? products.length : (data?.total ?? 0);

  const totalPages = getTotalPages(total, limit);
  const safePage = getSafePage(queryPage, totalPages);

  const visibleProducts = activeCategory.keyword
    ? products.slice(safePage * limit, safePage * limit + limit)
    : products;

  const showInitialLoading = isLoading && products.length === 0;
  const hasVisibleProducts = visibleProducts.length > 0;

  const handlePageChange = (nextPage: number): void => {
    if (nextPage < 0 || nextPage >= totalPages) {
      return;
    }

    setPage(nextPage);
  };

  return (
    <main className="shop-page" aria-labelledby="hv-hero-heading">
      <div className="shop-shell">
        <HumaVolveHero />

        <div className="shop-typography" style={{ fontSize: "108%" }}>
          <ShopFilters active={category} onChange={setCategory} />

          {!hasVisibleProducts || showInitialLoading || isError ? (
            <ShopStatus
              isLoading={showInitialLoading}
              isError={isError}
              error={error}
              hasProducts={false}
              search={effectiveSearch}
              categoryLabel={activeCategory.label}
              onRetry={() => void refetch()}
              onClearSearch={clearSearch}
              onViewAll={() => setCategory("all")}
            />
          ) : (
            <>
              <div className="shop-grid" aria-busy={isFetching}>
                {visibleProducts.map((product) => (
                  <ShopCard
                    key={product.id}
                    product={product}
                    onAdd={addProduct}
                  />
                ))}
              </div>

              {isFetching && !showInitialLoading && (
                <p className="shop-updating" aria-live="polite">
                  Updating…
                </p>
              )}

              <div className="mt-5">
                <ProductsPagination
                  page={safePage}
                  totalPages={totalPages}
                  isFetching={isFetching}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
