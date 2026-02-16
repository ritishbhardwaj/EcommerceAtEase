'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/api';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition-all duration-300 hover:border-primary-200 hover:shadow-card-hover dark:border-slate-700 dark:bg-slate-800 dark:hover:border-primary-800">
        <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />
          {!product.in_stock && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60">
              <span className="rounded-full bg-slate-700 px-3 py-1 text-sm font-medium text-white">
                Out of stock
              </span>
            </div>
          )}
        </div>
        <div className="p-4 sm:p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-primary-600 dark:text-primary-400">
            {product.category}
          </p>
          <h2 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
            {product.name}
          </h2>
          <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
            {product.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              ${product.price.toFixed(2)}
            </span>
            <button
              onClick={handleAddToCart}
              disabled={!product.in_stock}
              className="rounded-xl bg-primary-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Add to cart
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}
