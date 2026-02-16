import Link from 'next/link';
import { fetchProducts } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const products = await fetchProducts();
  const featured = products.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-mint/20 dark:from-slate-900 dark:via-slate-900 dark:to-primary-900/20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              Welcome to <span className="text-primary-600 dark:text-primary-400">NexShop</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              Discover quality products with fast delivery. Shop the latest trends and best deals.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/products"
                className="rounded-xl bg-primary-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-primary-600"
              >
                Shop now
              </Link>
              <Link
                href="/products#featured"
                className="rounded-xl border-2 border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:border-primary-500 hover:text-primary-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-primary-500 dark:hover:text-primary-400"
              >
                View featured
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section id="featured" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Featured products
          </h2>
          <Link
            href="/products"
            className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            View all →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
