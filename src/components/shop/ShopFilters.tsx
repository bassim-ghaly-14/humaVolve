import { Brush, LayoutGrid, Pipette, SoapDispenserDroplet, SprayCan } from 'lucide-react';
import { SHOP_CATEGORIES, type ShopCategoryKey } from './shopCatalog';

export interface ShopFiltersProps {
  active: ShopCategoryKey;
  onChange: (key: ShopCategoryKey) => void;
}

const CATEGORY_ICONS: Record<ShopCategoryKey, typeof LayoutGrid> = {
  all: LayoutGrid,
  skincare: Pipette,
  haircare: SprayCan,
  makeup: Brush,
  'bath-body': SoapDispenserDroplet,
};

/** Compact horizontal category filter pills matching the reference. */
export function ShopFilters({ active, onChange }: ShopFiltersProps) {
  return (
    <div className="shop-filters" role="tablist" aria-label="Product categories">
      {SHOP_CATEGORIES.map((category) => {
        const Icon = CATEGORY_ICONS[category.key];
        const selected = category.key === active;
        return (
          <button
            key={category.key}
            type="button"
            role="tab"
            aria-selected={selected}
            className={selected ? 'shop-filter is-selected' : 'shop-filter'}
            onClick={() => onChange(category.key)}
          >
            <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
            <span>{category.label}</span>
          </button>
        );
      })}
    </div>
  );
}
