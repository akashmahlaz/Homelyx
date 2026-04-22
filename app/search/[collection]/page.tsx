import { getCollection, getCollectionProducts } from "lib/shopify";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductGridItems from "components/layout/product-grid-items";
import { defaultSort, sorting } from "lib/constants";

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description ||
      collection.description ||
      `${collection.title} products`,
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;
  const collection = await getCollection(params.collection);
  const products = await getCollectionProducts({
    collection: params.collection,
    sortKey,
    reverse,
  });

  return (
    <div>
      {collection && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-stone-900">{collection.title}</h1>
          {collection.description && (
            <p className="mt-1 text-sm text-stone-400">{collection.description}</p>
          )}
          <p className="mt-1 text-sm text-stone-400">{products.length} items available</p>
        </div>
      )}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-5xl">🍽️</p>
          <p className="mt-4 text-lg font-semibold text-stone-800">No items in this category yet</p>
          <p className="mt-1 text-sm text-stone-400">Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <ProductGridItems products={products} />
        </div>
      )}
    </div>
  );
}

