import Price from "components/price";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <>
      {products.map((product) => (
        <Link
          key={product.handle}
          href={`/product/${product.handle}`}
          prefetch={true}
          className="group block overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-orange-50">
            {product.featuredImage?.url ? (
              <Image
                src={product.featuredImage.url}
                alt={product.featuredImage.altText || product.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-orange-100 to-amber-100">
                <svg viewBox="0 0 24 24" className="h-12 w-12 text-orange-400" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16l-1.5 11a2 2 0 0 1-2 1.7H7.5a2 2 0 0 1-2-1.7zM9 7V5a3 3 0 0 1 6 0v2" />
                </svg>
              </div>
            )}
            <div className="absolute right-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-orange-600 backdrop-blur-sm">
              Homemade
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold leading-snug text-stone-900 line-clamp-1">
              {product.title}
            </h3>
            {product.description && (
              <p className="mt-1 text-xs text-stone-400 line-clamp-2">
                {product.description}
              </p>
            )}
            <div className="mt-3 flex items-center justify-between">
              <span className="text-base font-bold text-orange-500">
                <Price
                  amount={product.priceRange.maxVariantPrice.amount}
                  currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                />
              </span>
              <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                Order
              </span>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

