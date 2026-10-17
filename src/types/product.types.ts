/**
 * Product domain types for the DummyJSON products API.
 *
 * Optional API fields stay optional so missing data never breaks rendering.
 */

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  thumbnail: string;
  images?: string[];
  brand?: string;
  discountPercentage?: number;
  availabilityStatus?: string;
  stock?: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductListParams {
  limit: number;
  skip: number;
}

export interface ProductSearchParams extends ProductListParams {
  /** Trimmed search query. Empty string means "no search". */
  q: string;
}
