// Server-side fetch needs an absolute URL; client can use relative /api (rewrite)
function getApiBase(): string {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  if (typeof window === 'undefined') return 'http://localhost:8000';
  return '/api';
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  in_stock: boolean;
}

export async function fetchProducts(): Promise<Product[]> {
  const base = getApiBase();
  const res = await fetch(`${base}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchProduct(id: string): Promise<Product | null> {
  const base = getApiBase();
  const res = await fetch(`${base}/products/${id}`);
  if (!res.ok) return null;
  return res.json();
}
