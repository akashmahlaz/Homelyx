import { getCollectionProducts } from "lib/shopify";
import Image from "next/image";
import Link from "next/link";
import Price from "./price";

export async function Carousel() {
  const products = await getCollectionProducts({
    collection: "hidden-homepage-carousel",
  });

  if (!products?.length) return null;

  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className="w-full overflow-x-auto pb-8 pt-1">
      <ul className="flex animate-carousel gap-4 px-4 lg:px-6">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.handle}${i}`}
            className="relative h-[260px] w-52 flex-none"
          >
            <Link
              href={`/product/${product.handle}`}
              className="group block h-full overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-36 overflow-hidden bg-orange-50">
                {product.featuredImage?.url ? (
                  <Image
                    alt={product.featuredImage.altText || product.title}
                    src={product.featuredImage.url}
                    fill
                    sizes="208px"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-orange-100 to-amber-100">
                    <svg viewBox="0 0 24 24" className="h-10 w-10 text-orange-400" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16l-1.5 11a2 2 0 0 1-2 1.7H7.5a2 2 0 0 1-2-1.7zM9 7V5a3 3 0 0 1 6 0v2" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="line-clamp-1 text-sm font-semibold text-stone-900">
                  {product.title}
                </p>
                <p className="mt-1 text-sm font-bold text-orange-500">
                  <Price
                    amount={product.priceRange.maxVariantPrice.amount}
                    currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                  />
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

