import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  ShopCartContext,
  type CartLine,
  type ShopCartContextValue,
} from "../../hooks/useShopCart";
import type { Product } from "../../types/product.types";

/**
 * Shop cart state, lifted out of the Shop page so the dedicated /cart route
 * shares the same live cart. Purely in-memory (matches previous drawer
 * behavior): adding a product increments its line quantity; removing filters
 * the line; clearing empties the bag. No persistence, no quantity editing —
 * only what the storefront actually supports.
 */
export function ShopCartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const addProduct = useCallback((product: Product): void => {
    setLines((previous) => {
      const existing = previous.find(
        (line) => line.product.id === product.id,
      );

      if (existing) {
        return previous.map((line) =>
          line.product.id === product.id
            ? { ...line, quantity: line.quantity + 1 }
            : line,
        );
      }

      return [...previous, { product, quantity: 1 }];
    });
  }, []);

  const removeLine = useCallback((productId: number): void => {
    setLines((previous) =>
      previous.filter((line) => line.product.id !== productId),
    );
  }, []);

  const clearCart = useCallback((): void => {
    setLines([]);
  }, []);

  const itemCount = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines],
  );

  const subtotal = useMemo(
    () =>
      lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
    [lines],
  );

  const value = useMemo<ShopCartContextValue>(
    () => ({ lines, itemCount, subtotal, addProduct, removeLine, clearCart }),
    [lines, itemCount, subtotal, addProduct, removeLine, clearCart],
  );

  return (
    <ShopCartContext.Provider value={value}>
      {children}
    </ShopCartContext.Provider>
  );
}