import { createContext, useContext } from "react";
import type { Product } from "../types/product.types";

export interface CartLine {
  product: Product;
  quantity: number;
}

export interface ShopCartContextValue {
  lines: CartLine[];
  /** Total number of units across all lines (sum of quantities). */
  itemCount: number;
  /** Sum of price × quantity across all lines. */
  subtotal: number;
  addProduct: (product: Product) => void;
  removeLine: (productId: number) => void;
  clearCart: () => void;
}

/** Backing context instance; provided by ShopCartProvider. */
export const ShopCartContext = createContext<ShopCartContextValue | null>(
  null,
);

/** Access the shared shop cart. Must be used inside ShopCartProvider. */
export function useShopCart(): ShopCartContextValue {
  const value = useContext(ShopCartContext);

  if (!value) {
    throw new Error("useShopCart must be used within a ShopCartProvider");
  }

  return value;
}