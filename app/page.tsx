import { CategoriesNav } from "components/homepage/categories";
import { HeroSection } from "components/homepage/hero-section";
import { SlotsInfo } from "components/homepage/slots-info";
import { TrustBar } from "components/homepage/trust-bar";
import { VendorCta } from "components/homepage/vendor-cta";
import { VendorStories } from "components/homepage/vendor-stories";
import { WhyHomelyx } from "components/homepage/why-homelyx";
import Footer from "components/layout/footer";

export const metadata = {
  title: "Homelyx — Fresh homemade food, on your schedule",
  description:
    "Order homemade food from neighbourhood vendors across India. Real kitchens, real people, real flavour — delivered when it suits you.",
  openGraph: { type: "website" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <CategoriesNav />
      <VendorStories />
      <SlotsInfo />
      <WhyHomelyx />
      <VendorCta />
      <Footer />
    </>
  );
}
