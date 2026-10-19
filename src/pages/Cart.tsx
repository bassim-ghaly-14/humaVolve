import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, ShoppingBag, Trash2 } from "lucide-react";
import { useShopCart, type CartLine } from "../hooks/useShopCart";
import { ROUTES, productDetail } from "../constants/routes";
import type { Product } from "../types/product.types";
import { formatPrice } from "../utils/formatPrice";

const IMAGE_FALLBACK = `${import.meta.env.BASE_URL}huma-volve-logo.jpg`;

/** How long the remove/clear confirmation stays visible. */
const NOTICE_MS = 2600;

/**
 * One cart row: thumbnail, title/brand links to details, read-only quantity,
 * line total and an accessible remove action. The image fallback mirrors
 * ShopCard so a broken thumbnail never leaves an empty box.
 */
function CartLineItem({
  line,
  onRemove,
}: {
  line: CartLine;
  onRemove: (product: Product) => void;
}) {
  const { product, quantity } = line;
  const [imageSrc, setImageSrc] = useState(product.thumbnail);
  const brand = (product.brand ?? "").trim() || "HumaVolve";
  const lineTotal = product.price * quantity;

  return (
    <li className="cart-item">
      <Link
        className="cart-item__media"
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

      <div className="cart-item__info">
        <h2 className="cart-item__title">
          <Link to={productDetail(product.id)}>{product.title}</Link>
        </h2>
        <p className="cart-item__brand">{brand}</p>
        <p className="cart-item__qty">
          Quantity {quantity}
          <span className="cart-item__unit">
            {" "}
            · {formatPrice(product.price)} each
          </span>
        </p>
      </div>

      <div className="cart-item__pricing">
        <p className="cart-item__total">{formatPrice(lineTotal)}</p>
        <button
          type="button"
          className="cart-item__remove"
          onClick={() => onRemove(product)}
          aria-label={`Remove ${product.title} from bag`}
          title="Remove item"
        >
          <Trash2 size={15} aria-hidden="true" />
          <span aria-hidden="true">Remove</span>
        </button>
      </div>
    </li>
  );
}

/**
 * Dedicated full-page shopping cart at /cart. Replaces the former
 * ShopCartDrawer overlay. Reads the shared cart context, so adding products
 * on the Shop page updates this page live; Continue shopping links back to
 * the Shop route. Subtotal is the only computed figure — shipping and fees
 * are explicitly excluded because the app has no checkout backend.
 */
export default function Cart() {
  const { lines, itemCount, subtotal, removeLine, clearCart } = useShopCart();
  const [notice, setNotice] = useState("");
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  // Clear any pending notice timer on unmount to avoid setState after teardown.
  useEffect(() => {
    return () => {
      if (noticeTimer.current !== undefined) {
        clearTimeout(noticeTimer.current);
      }
    };
  }, []);

  const showNotice = (message: string): void => {
    setNotice(message);

    if (noticeTimer.current !== undefined) {
      clearTimeout(noticeTimer.current);
    }

    noticeTimer.current = setTimeout(() => {
      setNotice("");
      noticeTimer.current = undefined;
    }, NOTICE_MS);
  };

  const handleRemove = (product: Product): void => {
    removeLine(product.id);
    showNotice(`Removed “${product.title}” from your bag.`);
  };

  const handleClear = (): void => {
    if (lines.length === 0) return;
    clearCart();
    showNotice("Your bag is now empty.");
  };

  const itemLabel = `${itemCount} ${itemCount === 1 ? "item" : "items"}`;

  return (
    <main className="cart-page" aria-labelledby="cart-page-title">
      <div className="cart-shell">
        <header className="cart-head">
          <div className="cart-head__main">
            <div>
              <h1 id="cart-page-title" className="cart-head__title">
                Shopping bag
              </h1>
              <p className="cart-head__count">{itemLabel}</p>
            </div>

            <Link to={ROUTES.SHOP} className="cart-head__continue">
              <ArrowLeft size={15} aria-hidden="true" />
              Continue shopping
            </Link>
          </div>

          {/* Polite live region: announces remove/clear confirmations. */}
          <p className="cart-head__notice" role="status">
            {notice ? (
              <>
                <Check size={14} aria-hidden="true" />
                <span>{notice}</span>
              </>
            ) : null}
          </p>
        </header>

        {lines.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty__icon">
              <ShoppingBag size={30} strokeWidth={1.4} aria-hidden="true" />
            </span>

            <h2 className="cart-empty__title">Your bag is empty</h2>

            <p className="cart-empty__copy">
              Explore the collection and add something you love — everything
              you pick shows up here.
            </p>

            <Link to={ROUTES.SHOP} className="cart-btn cart-btn--primary">
              Continue shopping
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <ul className="cart-items" aria-label="Cart items">
              {lines.map((line) => (
                <CartLineItem
                  key={line.product.id}
                  line={line}
                  onRemove={handleRemove}
                />
              ))}
            </ul>

            <aside
              className="cart-summary"
              aria-labelledby="cart-summary-title">
              <h2 id="cart-summary-title" className="cart-summary__title">
                Order summary
              </h2>

              <dl className="cart-summary__rows">
                <div className="cart-summary__row">
                  <dt>Items</dt>
                  <dd>{itemCount}</dd>
                </div>

                <div className="cart-summary__row cart-summary__row--subtotal">
                  <dt>Subtotal</dt>
                  <dd className="cart-summary__subtotal">
                    {formatPrice(subtotal)}
                  </dd>
                </div>
              </dl>

              <p className="cart-summary__note">
                Shipping and any applicable fees are not included.
              </p>

              <Link
                to={ROUTES.SHOP}
                className="cart-btn cart-btn--primary cart-btn--block">
                Continue shopping
                <ArrowRight size={15} aria-hidden="true" />
              </Link>

              <button
                type="button"
                className="cart-btn cart-btn--ghost cart-btn--block"
                onClick={handleClear}>
                Clear bag
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}