import { X } from 'lucide-react';
import type { Product } from '../../types/product.types';
import { formatPrice } from '../../utils/formatPrice';

export interface CartLine {
  product: Product;
  quantity: number;
}

export interface ShopCartDrawerProps {
  open: boolean;
  lines: CartLine[];
  onClose: () => void;
  onRemove: (id: number) => void;
  onClear: () => void;
}

/**
 * Minimal local cart drawer. The project has no cart store/backend, so the
 * Shop page keeps a page-local cart (add from cards, view/remove here).
 * Nothing is faked: every control performs its stated action.
 */
export function ShopCartDrawer({ open, lines, onClose, onRemove, onClear }: ShopCartDrawerProps) {
  if (!open) return null;
  const total = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <div className="shop-cart__overlay" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <button type="button" className="shop-cart__scrim" onClick={onClose} aria-label="Close cart" />
      <aside className="shop-cart">
        <header className="shop-cart__head">
          <h2>
            Your Cart{count > 0 ? ` (${count})` : ''}
          </h2>
          <button type="button" className="shop-cart__close" onClick={onClose} aria-label="Close cart">
            <X size={14} aria-hidden="true" />
          </button>
        </header>
        {lines.length === 0 ? (
          <p className="shop-cart__empty">
            Your cart is empty. Use “Add to Cart” on any product to start a list.
          </p>
        ) : (
          <>
            <ul className="shop-cart__lines">
              {lines.map((line) => (
                <li key={line.product.id} className="shop-cart__line">
                  <span className="shop-cart__line-name">{line.product.title}</span>
                  <span className="shop-cart__line-meta">
                    × {line.quantity} · {formatPrice(line.product.price * line.quantity)}
                  </span>
                  <button
                    type="button"
                    className="shop-cart__remove"
                    onClick={() => onRemove(line.product.id)}
                    aria-label={`Remove ${line.product.title} from cart`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <footer className="shop-cart__foot">
              <p className="shop-cart__total">Total: {formatPrice(total)}</p>
              <button type="button" className="shop-cart__clear" onClick={onClear}>
                Clear cart
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
