import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import type { Product } from '../../types/product.types';
import { productDetail } from '../../constants/routes';
import { formatPrice } from '../../utils/formatPrice';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/shadcn-card';

export interface ProductCardProps {
  product: Product;
}

const IMAGE_FALLBACK = `${import.meta.env.BASE_URL}huma-volve-logo.jpg`;

/** Product card built on the shadcn-style Card composition. */
export function ProductCard({ product }: ProductCardProps) {
  const [imageSrc, setImageSrc] = useState(product.thumbnail);

  return (
    <Card className="products-card--interactive">
      <div className="products-card__media">
        <img
          src={imageSrc}
          alt={product.title}
          loading="lazy"
          onError={() => {
            if (imageSrc !== IMAGE_FALLBACK) setImageSrc(IMAGE_FALLBACK);
          }}
        />
      </div>
      <CardHeader>
        <CardTitle className="products-card__title--clamp">{product.title}</CardTitle>
        <CardDescription>
          {[product.brand, product.category].filter(Boolean).join(' · ') || 'Product'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="products-card__price">{formatPrice(product.price)}</p>
        <p className="products-card__rating">
          <Star aria-hidden="true" size={14} />
          <span>
            {Number.isFinite(product.rating)
              ? product.rating.toFixed(1)
              : 'No rating'}
          </span>
        </p>
      </CardContent>
      <CardFooter>
        <Link
          className="button button--secondary"
          to={productDetail(product.id)}
          aria-label={`View details for ${product.title}`}
        >
          View details
        </Link>
      </CardFooter>
    </Card>
  );
}
