import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              NexShop
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Your one-stop shop for quality products. Fast delivery, secure checkout.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Shop
            </h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/products" className="text-sm text-slate-600 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-sm text-slate-600 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Support
            </h3>
            <ul className="mt-2 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>Contact Us</li>
              <li>Shipping Info</li>
              <li>Returns</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Newsletter
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Subscribe for deals and new arrivals.
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-200 pt-8 dark:border-slate-800">
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} NexShop. Built with Next.js & FastAPI.
          </p>
        </div>
      </div>
    </footer>
  );
}
