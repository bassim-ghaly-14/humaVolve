import { useMemo } from 'react';
import type { Product } from '../../types/product.types';

/**
 * Shop catalog curation (scoped to the Products / Shop page only).
 *
 * The DummyJSON catalog has no Chanel/Gucci/Nars product photography, so we
 * do NOT fabricate luxury product images. Instead we curate the closest
 * faithful subset — beauty + skin-care + fragrances — and map the reference
 * filter pills onto real API categories:
 *
 * - All Products -> beauty + skin-care + fragrances (13 items)
 * - Skincare     -> skin-care
 * - Haircare     -> keyword fallback inside the curated subset ("hair";
 *                   honest empty state when nothing matches)
 * - Makeup       -> beauty
 * - Bath & Body  -> skin-care + fragrances (wash, lotion, soap, perfume)
 */
export type ShopCategoryKey = 'all' | 'skincare' | 'haircare' | 'makeup' | 'bath-body';

export interface ShopCategory {
  key: ShopCategoryKey;
  label: string;
  /** Real DummyJSON category slugs to request. Empty = keyword-only fallback. */
  slugs: string[];
  /** Optional keyword fallback applied client-side on the curated subset. */
  keyword?: string;
}

export const SHOP_CATEGORIES: ShopCategory[] = [
  { key: 'all', label: 'All Products', slugs: ['beauty', 'skin-care', 'fragrances'] },
  { key: 'skincare', label: 'Skincare', slugs: ['skin-care'] },
  { key: 'haircare', label: 'Haircare', slugs: [], keyword: 'hair' },
  { key: 'makeup', label: 'Makeup', slugs: ['beauty'] },
  { key: 'bath-body', label: 'Bath & Body', slugs: ['skin-care', 'fragrances'] },
];

export function getShopCategory(key: ShopCategoryKey): ShopCategory {
  return SHOP_CATEGORIES.find((c) => c.key === key) ?? SHOP_CATEGORIES[0];
}

const HAIR_KEYWORDS = ['hair', 'shampoo', 'conditioner', 'scalp'];

function matchesKeyword(product: Product, keyword: string): boolean {
  const haystack = `${product.title} ${product.description} ${product.brand ?? ''} ${product.category}`.toLowerCase();
  if (keyword === 'hair') return HAIR_KEYWORDS.some((word) => haystack.includes(word));
  return haystack.includes(keyword.toLowerCase());
}

/** Client-side fallback filter used for keyword-only pills (e.g. Haircare). */
export function useShopKeywordFilter(products: Product[], keyword: string | undefined): Product[] {
  return useMemo(() => {
    if (!keyword) return products;
    return products.filter((product) => matchesKeyword(product, keyword));
  }, [products, keyword]);
}
