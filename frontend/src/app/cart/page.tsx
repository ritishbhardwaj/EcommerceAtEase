'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Your cart is empty</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Add some products from the shop to get started.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-xl bg-primary-500 px-6 py-3 font-semibold text-white transition hover:bg-primary-600"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Shopping cart</h1>
      <p className="mt-1 text-slate-600 dark:text-slate-300">{totalItems} item(s)</p>

      <div className="mt-8 space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800 sm:flex-row sm:items-center"
          >
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-700">
              <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-semibold text-slate-900 dark:text-white">{item.name}</h2>
              <p className="text-slate-600 dark:text-slate-300">
                ${item.price.toFixed(2)} × {item.quantity}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-600">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="flex h-10 w-10 items-center justify-center text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 dark:hover:text-white"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="flex h-10 w-10 items-center justify-center text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 dark:hover:text-white"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                aria-label="Remove item"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            <p className="text-right font-semibold text-slate-900 dark:text-white sm:w-24">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-end gap-4 sm:flex-row sm:justify-between">
        <Link
          href="/products"
          className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          ← Continue shopping
        </Link>
        <div className="flex items-center gap-6">
          <p className="text-xl font-bold text-slate-900 dark:text-white">
            Total: ${totalPrice.toFixed(2)}
          </p>
          <button
            className="rounded-xl bg-primary-500 px-6 py-3 font-semibold text-white transition hover:bg-primary-600"
            onClick={() => alert('Checkout would open here. Integrate with your payment provider.')}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
