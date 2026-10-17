import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingSkeleton } from '../components/skeleton/LoadingSkeleton';
import { Button } from '../components/ui/Button';
import { ROUTES } from '../constants/routes';
import { useProductDetail } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';

function parseProductId(rawId: string | undefined): number | null {
  if (!rawId) return null;
  if (!/^\d+$/.test(rawId)) return null;
  const id = Number(rawId);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

/** Individual product details: validates the route id, fetches one product. */
export default function ProductDetails() {
  const { id: rawId } = useParams<{ id: string }>();
  const productId = parseProductId(rawId);
  const { data: product, isLoading, isError, error, refetch } = useProductDetail(productId);
  const [imageFailed, setImageFailed] = useState(false);
  const fallbackImage = `${import.meta.env.BASE_URL}huma-volve-logo.jpg`;

  if (productId === null) {
    return (
      <main className="page page--wide" aria-labelledby="product-invalid-heading">
        <Link className="products-back" to={ROUTES.PRODUCTS}>
          <ArrowLeft aria-hidden="true" size={16} /> Back to products
        </Link>
        <EmptyState
          title="Invalid product id"
          description={`“${rawId ?? ''}” is not a valid product identifier. Return to the listing and pick a product.`}
          action={
            <Link className="button button--secondary" to={ROUTES.PRODUCTS} id="product-invalid-heading">
              Browse products
            </Link>
          }
        />
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="page page--wide" aria-labelledby="product-loading-heading">
        <h1 id="product-loading-heading">Product details</h1>
        <LoadingSkeleton lines={5} />
      </main>
    );
  }

  if (isError || !product) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : 'This product could not be found.';
    return (
      <main className="page page--wide" aria-labelledby="product-error-heading">
        <Link className="products-back" to={ROUTES.PRODUCTS}>
          <ArrowLeft aria-hidden="true" size={16} /> Back to products
        </Link>
        <div className="status" role="alert">
          <h1 id="product-error-heading">Product unavailable</h1>
          <p>{message}</p>
          <Button text="Retry" variant="primary" onClick={() => void refetch()} />
        </div>
      </main>
    );
  }

  const gallery = (product.images ?? []).filter((src) => src !== product.thumbnail);
  const mainImage = imageFailed ? fallbackImage : product.thumbnail;

  return (
    <main className="page page--wide" aria-labelledby="product-title">
      <Link className="products-back" to={ROUTES.PRODUCTS}>
        <ArrowLeft aria-hidden="true" size={16} /> Back to products
      </Link>
      <div className="product-details">
        <div className="product-details__media">
          <img
            src={mainImage}
            alt={product.title}
            onError={() => setImageFailed(true)}
          />
          {gallery.length > 0 ? (
            <div className="product-details__thumbs" aria-label="More product images">
              {gallery.slice(0, 4).map((src) => (
                <img key={src} src={src} alt="" loading="lazy" />
              ))}
            </div>
          ) : null}
        </div>
        <div className="product-details__info">
          <p className="eyebrow">{product.category}</p>
          <h1 id="product-title">{product.title}</h1>
          {product.brand ? <p className="card__meta">Brand: {product.brand}</p> : null}
          <p className="product-details__price">{formatPrice(product.price)}</p>
          <p className="products-card__rating">
            <Star aria-hidden="true" size={14} />
            <span>
              {Number.isFinite(product.rating) ? product.rating.toFixed(1) : 'No rating'} / 5
            </span>
          </p>
          <p>{product.description}</p>
          <dl className="product-details__facts">
            {typeof product.discountPercentage === 'number' ? (
              <>
                <dt>Discount</dt>
                <dd>{product.discountPercentage}%</dd>
              </>
            ) : null}
            {product.availabilityStatus ? (
              <>
                <dt>Availability</dt>
                <dd>{product.availabilityStatus}</dd>
              </>
            ) : null}
            {typeof product.stock === 'number' ? (
              <>
                <dt>Stock</dt>
                <dd>{product.stock} units</dd>
              </>
            ) : null}
          </dl>
        </div>
      </div>
    </main>
  );
}
