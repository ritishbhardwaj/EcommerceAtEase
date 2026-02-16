import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Product not found</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        The product you’re looking for doesn’t exist or was removed.
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
