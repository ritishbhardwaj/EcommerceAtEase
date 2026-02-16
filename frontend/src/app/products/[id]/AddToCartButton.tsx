'use client';

import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/api';

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() =>
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        })
      }
      disabled={!product.in_stock}
      className="rounded-xl bg-primary-500 px-6 py-3 font-semibold text-white transition hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Add to cart
    </button>
  );
}
