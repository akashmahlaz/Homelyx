import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import Prose from "components/prose";
import { Product } from "lib/shopify/types";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      {/* Title & price */}
      <div className="mb-5 border-b border-orange-100 pb-5">
        <h1 className="mb-3 text-3xl font-bold leading-tight text-stone-900 sm:text-4xl">
          {product.title}
        </h1>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-orange-500 px-4 py-1.5 text-base font-bold text-white">
            <Price
              amount={product.priceRange.maxVariantPrice.amount}
              currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            />
          </span>
          {product.availableForSale ? (
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600 border border-green-200">
              In Stock
            </span>
          ) : (
            <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-500 border border-red-200">
              Sold Out
            </span>
          )}
        </div>
      </div>

      {/* Variant selector */}
      <VariantSelector options={product.options} variants={product.variants} />

      {/* Description */}
      {product.descriptionHtml ? (
        <Prose
          className="mb-5 text-sm leading-relaxed text-stone-500"
          html={product.descriptionHtml}
        />
      ) : null}

      {/* Delivery slot info - shown at checkout */}
      <div className="mb-5 rounded-2xl border border-orange-100 bg-orange-50 p-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⏰</span>
          <div>
            <p className="text-sm font-semibold text-stone-700">
              Choose your delivery slot at checkout
            </p>
            <p className="text-xs text-stone-500">
              Morning, Afternoon, Evening & Night slots available
            </p>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="mb-5 flex flex-wrap gap-2">
        {[
          { label: "Home-cooked", d: "M12 2 2 11h3v10h6v-6h2v6h6V11h3z" },
          { label: "No preservatives", d: "M12 2C8 6 6 9 6 13a6 6 0 0 0 12 0c0-4-2-7-6-11z" },
          { label: "Fresh daily", d: "M13 2 4 14h7l-1 8 9-12h-7z" },
        ].map((badge) => (
          <span
            key={badge.label}
            className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-600"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-orange-500" fill="currentColor" aria-hidden>
              <path d={badge.d} />
            </svg>
            {badge.label}
          </span>
        ))}
      </div>

      <AddToCart product={product} />
    </>
  );
}