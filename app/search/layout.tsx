import Footer from "components/layout/footer";
import Collections from "components/layout/search/collections";
import FilterList from "components/layout/search/filter";
import { sorting } from "lib/constants";
import { Suspense } from "react";
import ChildrenWrapper from "./children-wrapper";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-6 lg:px-6">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Sidebar – Collections */}
          <aside className="w-full shrink-0 md:w-48">
            <div className="sticky top-24 space-y-6">
              <Collections />
              <FilterList list={sorting} title="Sort by" />
            </div>
          </aside>

          {/* Main */}
          <main className="min-h-screen w-full">
            <Suspense fallback={null}>
              <ChildrenWrapper>{children}</ChildrenWrapper>
            </Suspense>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
