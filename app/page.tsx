import { Carousel } from "components/carousel";
import { ThreeItemGrid } from "components/grid/three-items";
import { CategoriesNav } from "components/homepage/categories";
import { HeroSection } from "components/homepage/hero-section";
import { TrustBar } from "components/homepage/trust-bar";
import { VendorStories } from "components/homepage/vendor-stories";
import Footer from "components/layout/footer";

export const metadata = {
  title: "Homelyx – Fresh homemade food, on your schedule",
  description:
    "Order homemade food from neighbourhood vendors. Fresh, home-prepared meals delivered to your door across India.",
  openGraph: {
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <CategoriesNav />

      {/* Featured products from Shopify collection */}
      <section className="mx-auto max-w-7xl px-4 pb-4 lg:px-6">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">
              Featured Today
            </h2>
            <p className="mt-1 text-sm text-stone-400">
              Hand-picked by our home-chef community
            </p>
          </div>
          <a
            href="/search"
            className="text-sm font-medium text-orange-500 hover:text-orange-600"
          >
            View all →
          </a>
        </div>
      </section>
      <ThreeItemGrid />

      <VendorStories />

      {/* Trending section */}
      <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
        <div className="mb-2 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">Trending Now</h2>
            <p className="mt-1 text-sm text-stone-400">
              What India&apos;s ordering this week
            </p>
          </div>
          <a
            href="/search"
            className="text-sm font-medium text-orange-500 hover:text-orange-600"
          >
            See more →
          </a>
        </div>
      </section>
      <Carousel />

      <Footer />
    </>
  );
}
