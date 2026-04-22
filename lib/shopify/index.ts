import { TAGS } from "lib/constants";
import { revalidateTag } from "next/cache";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
    Cart,
    CartItem,
    Collection,
    Menu,
    Page,
    Product,
    ProductVariant,
} from "./types";

type ProductSeed = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  imageUrl: string;
  imageAlt: string;
  price: string;
  tags?: string[];
  options?: { id?: string; name: string; values: string[] }[];
  variants?: {
    id: string;
    title: string;
    availableForSale: boolean;
    selectedOptions: { name: string; value: string }[];
    price: { amount: string; currencyCode: string };
  }[];
  collectionHandles: string[];
  updatedAt: string;
};

const currencyCode = "INR";

const PRODUCT_SEEDS: ProductSeed[] = [
  {
    id: "prd_1",
    handle: "homestyle-breakfast-combo",
    title: "Homestyle Breakfast Combo",
    description: "Fresh poha, chutney and masala chai for a perfect start.",
    descriptionHtml:
      "<p>Start your day with <strong>freshly prepared poha</strong>, mint chutney, and masala chai.</p>",
    imageUrl: "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Breakfast combo",
    price: "149",
    collectionHandles: ["breakfast", "tiffins", "hidden-homepage-featured-items"],
    updatedAt: "2026-04-18T09:00:00.000Z",
  },
  {
    id: "prd_2",
    handle: "classic-veg-thali",
    title: "Classic Veg Thali",
    description: "Balanced home-cooked lunch with dal, sabzi, roti and rice.",
    descriptionHtml:
      "<p>A complete thali with <strong>dal, seasonal sabzi, roti, rice</strong> and salad.</p>",
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Veg thali",
    price: "229",
    collectionHandles: ["tiffins", "curries", "hidden-homepage-featured-items"],
    updatedAt: "2026-04-18T10:00:00.000Z",
  },
  {
    id: "prd_3",
    handle: "artisan-sourdough-loaf",
    title: "Artisan Sourdough Loaf",
    description: "Slow-fermented sourdough loaf, baked every morning.",
    descriptionHtml:
      "<p>Crisp crust, soft center, and naturally fermented for better flavor.</p>",
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Sourdough loaf",
    price: "189",
    collectionHandles: ["baked-goods", "snacks", "hidden-homepage-featured-items"],
    updatedAt: "2026-04-17T08:00:00.000Z",
  },
  {
    id: "prd_4",
    handle: "paneer-butter-masala",
    title: "Paneer Butter Masala",
    description: "Rich tomato gravy with soft paneer cubes.",
    descriptionHtml:
      "<p>Creamy North Indian favorite made fresh in small batches.</p>",
    imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Paneer curry",
    price: "259",
    collectionHandles: ["curries", "hidden-homepage-carousel"],
    updatedAt: "2026-04-16T13:00:00.000Z",
  },
  {
    id: "prd_5",
    handle: "mediterranean-salad-bowl",
    title: "Mediterranean Salad Bowl",
    description: "Crunchy veggies, chickpeas and citrus dressing.",
    descriptionHtml:
      "<p>A wholesome bowl with protein-rich chickpeas and fresh greens.</p>",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Salad bowl",
    price: "199",
    collectionHandles: ["salads", "hidden-homepage-carousel"],
    updatedAt: "2026-04-16T12:00:00.000Z",
  },
  {
    id: "prd_6",
    handle: "chocolate-brownie-box",
    title: "Chocolate Brownie Box",
    description: "Fudgy brownies made with premium cocoa.",
    descriptionHtml:
      "<p>Six-piece brownie box, ideal for sharing.</p>",
    imageUrl: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Brownie box",
    price: "299",
    collectionHandles: ["desserts", "baked-goods", "hidden-homepage-carousel"],
    updatedAt: "2026-04-15T18:00:00.000Z",
  },
  {
    id: "prd_7",
    handle: "mango-lassi-liter",
    title: "Mango Lassi (1L)",
    description: "Creamy mango lassi made with fresh curd and Alphonso pulp.",
    descriptionHtml: "<p>Refreshing summer beverage. Served chilled.</p>",
    imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Mango lassi",
    price: "179",
    collectionHandles: ["beverages", "dairy"],
    updatedAt: "2026-04-15T11:00:00.000Z",
  },
  {
    id: "prd_8",
    handle: "grandmas-mixed-pickle",
    title: "Grandma's Mixed Pickle",
    description: "Traditional mixed pickle aged in mustard oil.",
    descriptionHtml:
      "<p>Handcrafted in small batches using family recipes.</p>",
    imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Mixed pickle jar",
    price: "139",
    collectionHandles: ["pickles", "snacks"],
    updatedAt: "2026-04-14T09:00:00.000Z",
  },
  {
    id: "prd_9",
    handle: "makhana-trail-mix",
    title: "Makhana Trail Mix",
    description: "Roasted fox nuts with seeds and mild spices.",
    descriptionHtml: "<p>A light and crunchy tea-time snack.</p>",
    imageUrl: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Makhana mix",
    price: "159",
    collectionHandles: ["snacks", "beverages"],
    updatedAt: "2026-04-13T14:00:00.000Z",
  },
  {
    id: "prd_10",
    handle: "farm-fresh-paneer-pack",
    title: "Farm Fresh Paneer Pack",
    description: "Soft, fresh paneer block for daily cooking.",
    descriptionHtml: "<p>Prepared daily from full-fat milk.</p>",
    imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Paneer pack",
    price: "169",
    options: [{ name: "Weight", values: ["250g", "500g"] }],
    variants: [
      {
        id: "var_prd_10_250",
        title: "250g",
        availableForSale: true,
        selectedOptions: [{ name: "Weight", value: "250g" }],
        price: { amount: "169", currencyCode },
      },
      {
        id: "var_prd_10_500",
        title: "500g",
        availableForSale: true,
        selectedOptions: [{ name: "Weight", value: "500g" }],
        price: { amount: "319", currencyCode },
      },
    ],
    collectionHandles: ["dairy"],
    updatedAt: "2026-04-12T16:00:00.000Z",
  },
];

const COLLECTIONS: Collection[] = [
  {
    handle: "",
    title: "All",
    description: "All products",
    seo: { title: "All", description: "All products" },
    updatedAt: new Date().toISOString(),
    path: "/search",
  },
  {
    handle: "tiffins",
    title: "Tiffins",
    description: "Fresh home-style tiffins",
    seo: { title: "Tiffins", description: "Fresh home-style tiffins" },
    updatedAt: new Date().toISOString(),
    path: "/search/tiffins",
  },
  {
    handle: "baked-goods",
    title: "Baked Goods",
    description: "Daily baked bread and desserts",
    seo: { title: "Baked Goods", description: "Daily baked bread and desserts" },
    updatedAt: new Date().toISOString(),
    path: "/search/baked-goods",
  },
  {
    handle: "curries",
    title: "Curries",
    description: "Freshly cooked curry meals",
    seo: { title: "Curries", description: "Freshly cooked curry meals" },
    updatedAt: new Date().toISOString(),
    path: "/search/curries",
  },
  {
    handle: "salads",
    title: "Salads",
    description: "Healthy bowls and salads",
    seo: { title: "Salads", description: "Healthy bowls and salads" },
    updatedAt: new Date().toISOString(),
    path: "/search/salads",
  },
  {
    handle: "desserts",
    title: "Desserts",
    description: "Home-baked sweet treats",
    seo: { title: "Desserts", description: "Home-baked sweet treats" },
    updatedAt: new Date().toISOString(),
    path: "/search/desserts",
  },
  {
    handle: "beverages",
    title: "Beverages",
    description: "Refreshing handcrafted drinks",
    seo: { title: "Beverages", description: "Refreshing handcrafted drinks" },
    updatedAt: new Date().toISOString(),
    path: "/search/beverages",
  },
  {
    handle: "pickles",
    title: "Pickles",
    description: "Traditional homemade pickles",
    seo: { title: "Pickles", description: "Traditional homemade pickles" },
    updatedAt: new Date().toISOString(),
    path: "/search/pickles",
  },
  {
    handle: "dairy",
    title: "Dairy",
    description: "Fresh paneer and dairy products",
    seo: { title: "Dairy", description: "Fresh paneer and dairy products" },
    updatedAt: new Date().toISOString(),
    path: "/search/dairy",
  },
  {
    handle: "snacks",
    title: "Snacks",
    description: "Crunchy tea-time snacks",
    seo: { title: "Snacks", description: "Crunchy tea-time snacks" },
    updatedAt: new Date().toISOString(),
    path: "/search/snacks",
  },
  {
    handle: "breakfast",
    title: "Breakfast",
    description: "Morning favorites",
    seo: { title: "Breakfast", description: "Morning favorites" },
    updatedAt: new Date().toISOString(),
    path: "/search/breakfast",
  },
  {
    handle: "hidden-homepage-featured-items",
    title: "Hidden Featured",
    description: "Homepage featured items",
    seo: { title: "Hidden Featured", description: "Homepage featured items" },
    updatedAt: new Date().toISOString(),
    path: "/search/hidden-homepage-featured-items",
  },
  {
    handle: "hidden-homepage-carousel",
    title: "Hidden Carousel",
    description: "Homepage carousel items",
    seo: { title: "Hidden Carousel", description: "Homepage carousel items" },
    updatedAt: new Date().toISOString(),
    path: "/search/hidden-homepage-carousel",
  },
];

const HEADER_MENU: Menu[] = [
  { title: "Home", path: "/" },
  { title: "Shop", path: "/search" },
  { title: "Tiffins", path: "/search/tiffins" },
  { title: "Baked Goods", path: "/search/baked-goods" },
  { title: "Vendor Stories", path: "/#vendor-stories" },
];

const FOOTER_MENU: Menu[] = [
  { title: "All Products", path: "/search" },
  { title: "Breakfast", path: "/search/breakfast" },
  { title: "Desserts", path: "/search/desserts" },
  { title: "Beverages", path: "/search/beverages" },
];

const PAGES: Page[] = [];

function makeDefaultVariant(seed: ProductSeed): ProductVariant {
  return {
    id: `var_${seed.id}`,
    title: "Default",
    availableForSale: true,
    selectedOptions: [{ name: "Title", value: "Default Title" }],
    price: { amount: seed.price, currencyCode },
  };
}

function buildProduct(seed: ProductSeed): Product {
  const variants = seed.variants ?? [makeDefaultVariant(seed)];
  const prices = variants.map((variant) => Number(variant.price.amount));
  const min = Math.min(...prices).toFixed(2);
  const max = Math.max(...prices).toFixed(2);
  const image = {
    url: seed.imageUrl,
    altText: seed.imageAlt,
    width: 1200,
    height: 900,
  };

  return {
    id: seed.id,
    handle: seed.handle,
    availableForSale: variants.some((variant) => variant.availableForSale),
    title: seed.title,
    description: seed.description,
    descriptionHtml: seed.descriptionHtml,
    options: (seed.options ?? [
      { id: `opt_${seed.id}`, name: "Title", values: ["Default Title"] },
    ]).map((option, index) => ({
      ...option,
      id: option.id ?? `opt_${seed.id}_${index}`,
    })),
    priceRange: {
      minVariantPrice: { amount: min, currencyCode },
      maxVariantPrice: { amount: max, currencyCode },
    },
    variants,
    featuredImage: image,
    images: [image],
    seo: {
      title: seed.title,
      description: seed.description,
    },
    tags: seed.tags ?? [],
    updatedAt: seed.updatedAt,
  };
}

const PRODUCT_CATALOG: Product[] = PRODUCT_SEEDS.map(buildProduct);

const COLLECTION_TO_PRODUCT_HANDLES = new Map<string, string[]>(
  COLLECTIONS.map((collection) => [collection.handle, [] as string[]])
);

for (const seed of PRODUCT_SEEDS) {
  for (const handle of seed.collectionHandles) {
    const entries = COLLECTION_TO_PRODUCT_HANDLES.get(handle) ?? [];
    entries.push(seed.handle);
    COLLECTION_TO_PRODUCT_HANDLES.set(handle, entries);
  }
}

type CartStore = Map<string, Cart>;

const globalForCart = globalThis as unknown as {
  __homelyxCartStore?: CartStore;
};

const cartStore: CartStore = globalForCart.__homelyxCartStore ?? new Map();
if (!globalForCart.__homelyxCartStore) {
  globalForCart.__homelyxCartStore = cartStore;
}

function generateId(prefix: string) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function emptyCart(id: string): Cart {
  return {
    id,
    checkoutUrl: "/checkout",
    totalQuantity: 0,
    lines: [],
    cost: {
      subtotalAmount: { amount: "0.00", currencyCode },
      totalAmount: { amount: "0.00", currencyCode },
      totalTaxAmount: { amount: "0.00", currencyCode },
    },
  };
}

function recalculateCart(cart: Cart): Cart {
  const totalQuantity = cart.lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cart.lines
    .reduce((sum, line) => sum + Number(line.cost.totalAmount.amount), 0)
    .toFixed(2);

  return {
    ...cart,
    totalQuantity,
    cost: {
      subtotalAmount: { amount: subtotal, currencyCode },
      totalAmount: { amount: subtotal, currencyCode },
      totalTaxAmount: { amount: "0.00", currencyCode },
    },
  };
}

function getVariantAndProduct(merchandiseId: string) {
  for (const product of PRODUCT_CATALOG) {
    const variant = product.variants.find((item) => item.id === merchandiseId);
    if (variant) {
      return { product, variant };
    }
  }
  return undefined;
}

async function getOrCreateCartFromCookie(): Promise<Cart> {
  const cookieStore = await cookies();
  const existingId = cookieStore.get("cartId")?.value;

  if (existingId) {
    const existingCart = cartStore.get(existingId);
    if (existingCart) {
      return existingCart;
    }
  }

  const newCart = emptyCart(generateId("cart"));
  cartStore.set(newCart.id!, newCart);
  cookieStore.set("cartId", newCart.id!);
  return newCart;
}

function getProductsByCollectionHandle(handle: string): Product[] {
  if (!handle) {
    return PRODUCT_CATALOG;
  }

  const productHandles = COLLECTION_TO_PRODUCT_HANDLES.get(handle) ?? [];
  if (!productHandles.length) {
    return [];
  }

  const byHandle = new Map(PRODUCT_CATALOG.map((product) => [product.handle, product]));
  return productHandles
    .map((productHandle) => byHandle.get(productHandle))
    .filter(Boolean) as Product[];
}

function sortProducts(
  products: Product[],
  sortKey?: string,
  reverse?: boolean
): Product[] {
  const sorted = [...products];

  if (sortKey === "PRICE") {
    sorted.sort(
      (a, b) =>
        Number(a.priceRange.minVariantPrice.amount) -
        Number(b.priceRange.minVariantPrice.amount)
    );
  } else if (sortKey === "CREATED_AT") {
    sorted.sort(
      (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
    );
  } else if (sortKey === "BEST_SELLING") {
    sorted.sort(
      (a, b) => Number(b.priceRange.maxVariantPrice.amount) - Number(a.priceRange.maxVariantPrice.amount)
    );
  } else {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (reverse) {
    sorted.reverse();
  }

  return sorted;
}

function filterProductsByQuery(products: Product[], query?: string): Product[] {
  if (!query) {
    return products;
  }

  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return products;
  }

  return products.filter((product) => {
    const source = [product.title, product.description, ...product.tags].join(" ").toLowerCase();
    return source.includes(normalized);
  });
}

export async function shopifyFetch<T>(): Promise<{ status: number; body: T }> {
  throw new Error("shopifyFetch is unavailable in Shopify-free mode.");
}

export async function createCart(): Promise<Cart> {
  const cart = emptyCart(generateId("cart"));
  cartStore.set(cart.id!, cart);
  return cart;
}

export async function addToCart(
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const cart = await getOrCreateCartFromCookie();

  for (const line of lines) {
    const found = getVariantAndProduct(line.merchandiseId);
    if (!found) {
      continue;
    }

    const { product, variant } = found;
    const existingLine = cart.lines.find((item) => item.merchandise.id === variant.id);
    const nextQuantity = (existingLine?.quantity ?? 0) + line.quantity;
    const nextAmount = (Number(variant.price.amount) * nextQuantity).toFixed(2);

    const nextLine: CartItem = {
      id: existingLine?.id ?? generateId("line"),
      quantity: nextQuantity,
      cost: {
        totalAmount: {
          amount: nextAmount,
          currencyCode: variant.price.currencyCode,
        },
      },
      merchandise: {
        id: variant.id,
        title: variant.title,
        selectedOptions: variant.selectedOptions,
        product: {
          id: product.id,
          handle: product.handle,
          title: product.title,
          featuredImage: product.featuredImage,
        },
      },
    };

    if (existingLine) {
      cart.lines = cart.lines.map((item) =>
        item.id === existingLine.id ? nextLine : item
      );
    } else {
      cart.lines.push(nextLine);
    }
  }

  const nextCart = recalculateCart(cart);
  cartStore.set(nextCart.id!, nextCart);
  return nextCart;
}

export async function removeFromCart(lineIds: string[]): Promise<Cart> {
  const cart = await getOrCreateCartFromCookie();
  cart.lines = cart.lines.filter((line) => !line.id || !lineIds.includes(line.id));
  const nextCart = recalculateCart(cart);
  cartStore.set(nextCart.id!, nextCart);
  return nextCart;
}

export async function updateCart(
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const cart = await getOrCreateCartFromCookie();

  for (const patch of lines) {
    const idx = cart.lines.findIndex((line) => line.id === patch.id);
    if (idx === -1) {
      continue;
    }

    const currentLine = cart.lines[idx];
    if (!currentLine) {
      continue;
    }

    if (patch.quantity <= 0) {
      cart.lines.splice(idx, 1);
      continue;
    }

    const found = getVariantAndProduct(patch.merchandiseId);
    if (!found) {
      continue;
    }

    const amount = (Number(found.variant.price.amount) * patch.quantity).toFixed(2);
    cart.lines[idx] = {
      id: currentLine.id,
      merchandise: currentLine.merchandise,
      quantity: patch.quantity,
      cost: {
        totalAmount: {
          amount,
          currencyCode: found.variant.price.currencyCode,
        },
      },
    };
  }

  const nextCart = recalculateCart(cart);
  cartStore.set(nextCart.id!, nextCart);
  return nextCart;
}

export async function getCart(): Promise<Cart | undefined> {
  const cartId = (await cookies()).get("cartId")?.value;
  if (!cartId) {
    return undefined;
  }

  return cartStore.get(cartId);
}

export async function getCollection(
  handle: string
): Promise<Collection | undefined> {
  if (!handle) {
    return COLLECTIONS.find((item) => item.handle === "");
  }

  return COLLECTIONS.find((item) => item.handle === handle);
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey,
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const products = getProductsByCollectionHandle(collection);
  return sortProducts(products, sortKey, reverse);
}

export async function getCollections(): Promise<Collection[]> {
  return COLLECTIONS.filter((collection) => !collection.handle.startsWith("hidden"));
}

export async function getMenu(handle: string): Promise<Menu[]> {
  if (handle.includes("footer")) {
    return FOOTER_MENU;
  }

  return HEADER_MENU;
}

export async function getPage(handle: string): Promise<Page> {
  const page = PAGES.find((entry) => entry.handle === handle);
  if (!page) {
    return {
      id: generateId("page"),
      title: "Page",
      handle,
      body: "",
      bodySummary: "",
      seo: { title: "Page", description: "Page" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  return page;
}

export async function getPages(): Promise<Page[]> {
  return PAGES;
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  return PRODUCT_CATALOG.find((product) => product.handle === handle);
}

export async function getProductRecommendations(
  productId: string
): Promise<Product[]> {
  return PRODUCT_CATALOG.filter((product) => product.id !== productId).slice(0, 5);
}

export async function getProducts({
  query,
  reverse,
  sortKey,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const filtered = filterProductsByQuery(PRODUCT_CATALOG, query);
  return sortProducts(filtered, sortKey, reverse);
}

export async function revalidate(req: NextRequest): Promise<NextResponse> {
  const topic = (await headers()).get("x-shopify-topic") || "unknown";
  const collectionWebhooks = [
    "collections/create",
    "collections/delete",
    "collections/update",
  ];
  const productWebhooks = ["products/create", "products/delete", "products/update"];

  if (collectionWebhooks.includes(topic)) {
    revalidateTag(TAGS.collections, "seconds");
  }

  if (productWebhooks.includes(topic)) {
    revalidateTag(TAGS.products, "seconds");
  }

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
