import ProductGridItems from "components/layout/product-grid-items";
import { defaultSort, sorting } from "lib/constants";
import { getProducts } from "lib/shopify";

export const metadata = {
  title: "Browse – Homelyx",
  description: "Explore homemade food from neighbourhood vendors.",
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length > 1 ? "results" : "result";

  return (
    <div>
      {searchValue ? (
        <div className="mb-6">
          <p className="text-sm text-stone-500">
            {products.length === 0
              ? "No products match "
              : `Showing ${products.length} ${resultsText} for `}
            <span className="font-semibold text-stone-900">&quot;{searchValue}&quot;</span>
          </p>
        </div>
      ) : (
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-stone-900">All Products</h1>
          <p className="mt-1 text-sm text-stone-400">{products.length} homemade items available</p>
        </div>
      )}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <ProductGridItems products={products} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-5xl">🍽️</p>
          <p className="mt-4 text-lg font-semibold text-stone-800">No results found</p>
          <p className="mt-1 text-sm text-stone-400">Try a different search or browse all categories</p>
        </div>
      )}
    </div>
  );
}
