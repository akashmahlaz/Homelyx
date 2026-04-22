import Footer from "components/layout/footer";
import { VENDORS, getVendorBySlug } from "lib/vendors";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return VENDORS.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const vendor = getVendorBySlug(slug);
  if (!vendor) return {};
  return {
    title: `${vendor.name} – Homelyx`,
    description: vendor.headline,
  };
}

export default async function VendorPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const vendor = getVendorBySlug(slug);
  if (!vendor) return notFound();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
        <div className="mx-auto max-w-5xl px-4 py-14 lg:px-6">
          <Link
            href="/search"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-stone-400 transition-colors hover:text-orange-500"
          >
            ← Back to Browse
          </Link>

          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            {/* Avatar */}
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl bg-white text-6xl shadow-md border border-orange-100">
              {vendor.emoji}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-extrabold text-stone-900 sm:text-4xl">
                  {vendor.name}
                </h1>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${vendor.tagColor}`}
                >
                  {vendor.tag}
                </span>
              </div>

              <p className="mt-2 text-base text-stone-500">{vendor.specialty}</p>
              <p className="mt-1 flex items-center gap-1 text-sm text-stone-400">
                <span>📍</span> {vendor.location}
              </p>

              {/* Stats row */}
              <div className="mt-5 flex flex-wrap gap-4">
                <div className="rounded-2xl border border-amber-200 bg-white px-4 py-2.5 text-center shadow-sm">
                  <p className="text-xl font-extrabold text-stone-900">
                    ⭐ {vendor.rating}
                  </p>
                  <p className="text-xs text-stone-400">Rating</p>
                </div>
                <div className="rounded-2xl border border-orange-200 bg-white px-4 py-2.5 text-center shadow-sm">
                  <p className="text-xl font-extrabold text-stone-900">
                    {vendor.orders}
                  </p>
                  <p className="text-xs text-stone-400">Orders</p>
                </div>
                <div className="rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-center shadow-sm">
                  <p className="text-xl font-extrabold text-stone-900">
                    Since {vendor.since}
                  </p>
                  <p className="text-xs text-stone-400">On Homelyx</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto max-w-5xl px-4 py-10 lg:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Headline */}
            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-orange-500 mb-2">
                Their Story
              </p>
              <h2 className="text-xl font-bold text-stone-900 mb-4">
                &ldquo;{vendor.headline}&rdquo;
              </h2>
              <p className="text-sm leading-relaxed text-stone-600">
                {vendor.story}
              </p>
            </div>

            {/* Menu items */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-stone-900">
                What they make
              </h3>
              <div className="flex flex-wrap gap-3">
                {vendor.items.map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 shadow-sm"
                  >
                    <span className="text-base">{vendor.emoji}</span>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Quality badges */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-stone-900">
                Our promise
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {vendor.badges.map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-3 rounded-xl border border-stone-100 bg-white p-4 shadow-sm"
                  >
                    <span className="text-xl">{badge.split(" ")[0]}</span>
                    <span className="text-sm font-medium text-stone-700">
                      {badge.split(" ").slice(1).join(" ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* CTA */}
            <div className="rounded-2xl border border-orange-200 bg-white p-6 shadow-sm">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-orange-500">
                Ready to order?
              </p>
              <h3 className="mb-4 text-lg font-bold text-stone-900">
                Shop from {vendor.name}
              </h3>
              <Link
                href={`/search/${vendor.searchCollection}`}
                className="block w-full rounded-xl bg-orange-500 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-orange-600"
              >
                Browse {vendor.specialty}
              </Link>
              <Link
                href="/search"
                className="mt-3 block w-full rounded-xl border border-stone-200 py-3 text-center text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50"
              >
                Browse all vendors
              </Link>
            </div>

            {/* Delivery slots */}
            <div className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-400">
                Available slots
              </p>
              <div className="space-y-2">
                {vendor.slots.map((slot) => {
                  const slotMap: Record<
                    string,
                    { emoji: string; time: string; color: string }
                  > = {
                    Morning: {
                      emoji: "🌅",
                      time: "5 AM – 10 AM",
                      color: "bg-amber-50 border-amber-200",
                    },
                    Afternoon: {
                      emoji: "☀️",
                      time: "11 AM – 3 PM",
                      color: "bg-sky-50 border-sky-200",
                    },
                    Evening: {
                      emoji: "🌆",
                      time: "4 PM – 8 PM",
                      color: "bg-orange-50 border-orange-200",
                    },
                    Night: {
                      emoji: "🌙",
                      time: "8 PM – 11 PM",
                      color: "bg-indigo-50 border-indigo-200",
                    },
                  };
                  const s = slotMap[slot];
                  if (!s) return null;
                  return (
                    <div
                      key={slot}
                      className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${s.color}`}
                    >
                      <span>{s.emoji}</span>
                      <div>
                        <p className="text-xs font-semibold text-stone-700">
                          {slot}
                        </p>
                        <p className="text-[10px] text-stone-400">{s.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Location */}
            <div className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-stone-400">
                Location
              </p>
              <p className="text-sm font-semibold text-stone-800">
                {vendor.location}
              </p>
              <p className="mt-1 text-xs text-stone-400">
                Delivering within {vendor.city}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
