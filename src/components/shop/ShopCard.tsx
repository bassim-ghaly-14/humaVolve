import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import type { Product } from '../../types/product.types';
import { productDetail } from '../../constants/routes';
import { formatPrice } from '../../utils/formatPrice';

export interface ShopCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

const IMAGE_FALLBACK = `${import.meta.env.BASE_URL}huma-volve-logo.jpg`;

/** How long the "Added to Cart" success state stays visible before resetting. */
const ADDED_FEEDBACK_MS = 1800;

/**
 * Compact luxury-commerce card: image, uppercase name, muted brand, price.
 * No ratings/badges/quantity controls — the reference shows none.
 * An "Add" affordance appears on hover/focus only so the resting layout
 * stays pixel-faithful while cart wiring stays real.
 * After `onAdd` completes successfully, the clicked card's button briefly
 * switches to a checkmark + "Added to Cart" success state, then resets.
 */
export function ShopCard({ product, onAdd }: ShopCardProps) {
  const [imageSrc, setImageSrc] = useState(product.thumbnail);
  const [added, setAdded] = useState(false);
  const addedResetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  // Clear any pending reset timer on unmount to avoid setState after teardown.
  useEffect(() => {
    return () => {
      if (addedResetTimer.current !== undefined) {
        clearTimeout(addedResetTimer.current);
      }
    };
  }, []);

  const brand = (product.brand ?? '').trim() || 'HumaVolve';

  const handleAdd = (): void => {
    // Only celebrate a successful cart operation: if the cart action throws,
    // the button never enters the success state (no false feedback).
    try {
      onAdd(product);
    } catch {
      return;
    }

    setAdded(true);

    // Repeated clicks restart the reset timer instead of stacking timers.
    if (addedResetTimer.current !== undefined) {
      clearTimeout(addedResetTimer.current);
    }
    addedResetTimer.current = setTimeout(() => {
      setAdded(false);
      addedResetTimer.current = undefined;
    }, ADDED_FEEDBACK_MS);
  };

  // Accessible name reflects the current state for screen readers.
  const statusLabel = added
    ? `${product.title} added to cart`
    : `Add ${product.title} to cart`;

  return (
    <article className="shop-card">
      <Link
        className="shop-card__media"
        to={productDetail(product.id)}
        aria-label={`View details for ${product.title}`}
      >
        <img
          src={imageSrc}
          alt={product.title}
          loading="lazy"
          onError={() => {
            if (imageSrc !== IMAGE_FALLBACK) setImageSrc(IMAGE_FALLBACK);
          }}
        />
      </Link>
      <h3 className="shop-card__name" title={product.title}>
        <Link to={productDetail(product.id)}>{product.title}</Link>
      </h3>
      <p className="shop-card__brand">{brand}</p>
      <p className="shop-card__price">{formatPrice(product.price)}</p>
      <button
        type="button"
        className={
          added ? 'shop-card__add shop-card__add--added' : 'shop-card__add'
        }
        onClick={handleAdd}
        aria-label={statusLabel}
      >
        {added ? (
          <>
            <Check size={12} aria-hidden="true" />
            Added to Cart
          </>
        ) : (
          'Add to Cart'
        )}
      </button>
      {/* Quiet live announcement for the specific card that was clicked. */}
      <span className="shop-card__status" role="status">
        {added ? statusLabel : ''}
      </span>
    </article>
  );
}
