import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { fetchProduct } from '@/lib/api';
import { AddToCartButton } from './AddToCartButton';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await fetchProduct(id);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-700">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            unoptimized
          />
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-primary-600 dark:text-primary-400">
            {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            {product.description}
          </p>
          <p className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">
            ${product.price.toFixed(2)}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <AddToCartButton product={product} />
            <Link
              href="/products"
              className="rounded-xl border-2 border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:border-primary-500 hover:text-primary-600 dark:border-slate-600 dark:text-slate-200 dark:hover:border-primary-500 dark:hover:text-primary-400"
            >
              Back to products
            </Link>
          </div>
          {!product.in_stock && (
            <p className="mt-4 text-sm text-amber-600 dark:text-amber-400">
              Currently out of stock. Check back later.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
