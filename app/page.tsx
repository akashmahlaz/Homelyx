import { Carousel } from "components/carousel";
import { ThreeItemGrid } from "components/grid/three-items";
import { CategoriesNav } from "components/homepage/categories";
import { HeroSection } from "components/homepage/hero-section";
import { SlotsInfo } from "components/homepage/slots-info";
import { TrustBar } from "components/homepage/trust-bar";
import { VendorCta } from "components/homepage/vendor-cta";
import { VendorStories } from "components/homepage/vendor-stories";
import { WhyHomelyx } from "components/homepage/why-homelyx";
import Footer from "components/layout/footer";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export const metadata = {
  title: "Homelyx â€“ Fresh homemade food, on your schedule",
  description:
    "Order homemade food from neighbourhood vendors across India. Real kitchens, real people, real flavour â€” delivered when it suits you.",
  openGraph: {
    type: "website",
  },
};

export default async function HomePage() {
  const tFeatured = await getTranslations("featured");
  const tTrending = await getTranslations("trending");

  return (
    <>
      <HeroSection />
      <TrustBar />
      <CategoriesNav />

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 pt-10 pb-4 lg:px-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
              {tFeatured("title")}
            </h2>
            <p className="mt-1 text-sm text-stone-400">
              {tFeatured("subtitle")}
            </p>
          </div>
          <Link
            href="/search"
            className="text-sm font-medium text-orange-500 hover:text-orange-600"
          >
            View all â†’
          </Link>
        </div>
      </section>
      <ThreeItemGrid />

      <SlotsInfo />

      <VendorStories />

      <WhyHomelyx />

      {/* Trending */}
      <section className="mx-auto max-w-7xl px-4 pt-12 lg:px-6">
        <div className="mb-2 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
              {tTrending("title")}
            </h2>
            <p className="mt-1 text-sm text-stone-400">
              {tTrending("subtitle")}
            </p>
          </div>
          <Link
            href="/search"
            className="text-sm font-medium text-orange-500 hover:text-orange-600"
          >
            See more â†’
          </Link>
        </div>
      </section>
      <Carousel />

      <VendorCta />

      <Footer />
    </>
  );
}
