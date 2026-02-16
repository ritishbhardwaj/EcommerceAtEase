import { fetchProducts } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">All products</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          {products.length} products available
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
