import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types/product.types';
import { productDetail } from '../../constants/routes';
import { formatPrice } from '../../utils/formatPrice';

export interface ShopCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

const IMAGE_FALLBACK = `${import.meta.env.BASE_URL}huma-volve-logo.jpg`;

/**
 * Compact luxury-commerce card: image, uppercase name, muted brand, price.
 * No ratings/badges/quantity controls — the reference shows none.
 * An "Add" affordance appears on hover/focus only so the resting layout
 * stays pixel-faithful while cart wiring stays real.
 */
export function ShopCard({ product, onAdd }: ShopCardProps) {
  const [imageSrc, setImageSrc] = useState(product.thumbnail);
  const brand = (product.brand ?? '').trim() || 'HumaVolve';

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
        className="shop-card__add"
        onClick={() => onAdd(product)}
        aria-label={`Add ${product.title} to cart`}
      >
        Add to Cart
      </button>
    </article>
  );
}
