import {
    ArrowLeftIcon,
    ClockIcon,
    MapPinIcon,
    MoonIcon,
    StarIcon,
    SunIcon,
} from "@heroicons/react/24/outline";
import Footer from "components/layout/footer";
import { VENDORS, getVendorBySlug } from "lib/vendors";
import type { Metadata } from "next";
import Image from "next/image";
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

const SLOT_META: Record<
  string,
  {
    time: string;
    Icon: typeof SunIcon;
    ring: string;
    iconBg: string;
    iconText: string;
  }
> = {
  Morning: {
    time: "5 AM – 10 AM",
    Icon: SunIcon,
    ring: "ring-amber-200",
    iconBg: "bg-amber-50",
    iconText: "text-amber-600",
  },
  Afternoon: {
    time: "11 AM – 3 PM",
    Icon: SunIcon,
    ring: "ring-orange-200",
    iconBg: "bg-orange-50",
    iconText: "text-orange-600",
  },
  Evening: {
    time: "4 PM – 8 PM",
    Icon: ClockIcon,
    ring: "ring-rose-200",
    iconBg: "bg-rose-50",
    iconText: "text-rose-600",
  },
  Night: {
    time: "8 PM – 11 PM",
    Icon: MoonIcon,
    ring: "ring-indigo-200",
    iconBg: "bg-indigo-50",
    iconText: "text-indigo-600",
  },
};

export default async function VendorPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const vendor = getVendorBySlug(slug);
  if (!vendor) return notFound();

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="relative h-72 w-full sm:h-80 lg:h-96">
          <Image
            src={vendor.image}
            alt={`${vendor.name} cover`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/40 to-stone-900/30" />

          <div className="absolute inset-x-0 top-0">
            <div className="mx-auto flex max-w-6xl items-center px-4 pt-5 lg:px-6">
              <Link
                href="/search"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md hover:bg-white/20"
              >
                <ArrowLeftIcon className="h-3.5 w-3.5" />
                Back to Browse
              </Link>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto flex max-w-6xl items-end gap-4 px-4 pb-6 lg:px-6">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl shadow-xl ring-4 ring-white sm:h-24 sm:w-24">
                <Image
                  src={vendor.avatar}
                  alt={`${vendor.name} chef`}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1 text-white">
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${vendor.tagColor}`}
                >
                  {vendor.tag}
                </span>
                <h1 className="mt-2 text-2xl font-extrabold tracking-tight drop-shadow sm:text-3xl lg:text-4xl">
                  {vendor.name}
                </h1>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/85 sm:text-sm">
                  <span className="font-medium">{vendor.specialty}</span>
                  <span className="hidden sm:inline">·</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPinIcon className="h-3.5 w-3.5" />
                    {vendor.location}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-stone-100 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-stone-100 px-4 lg:px-6">
          <div className="px-3 py-4 text-center sm:py-5">
            <p className="flex items-center justify-center gap-1 text-xl font-extrabold text-stone-900 sm:text-2xl">
              <StarIcon className="h-4 w-4 text-amber-500" />
              {vendor.rating}
            </p>
            <p className="mt-0.5 text-[11px] text-stone-400 sm:text-xs">Rating</p>
          </div>
          <div className="px-3 py-4 text-center sm:py-5">
            <p className="text-xl font-extrabold text-stone-900 sm:text-2xl">
              {vendor.orders}
            </p>
            <p className="mt-0.5 text-[11px] text-stone-400 sm:text-xs">Orders</p>
          </div>
          <div className="px-3 py-4 text-center sm:py-5">
            <p className="text-xl font-extrabold text-stone-900 sm:text-2xl">
              {vendor.since}
            </p>
            <p className="mt-0.5 text-[11px] text-stone-400 sm:text-xs">
              On Homelyx
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="rounded-3xl border border-stone-100 bg-stone-50 p-6 sm:p-8">
              <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500">
                Their story
              </p>
              <h2 className="mt-1 text-xl font-bold text-stone-900 sm:text-2xl">
                {vendor.headline}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-stone-600 sm:text-base">
                {vendor.story}
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-bold text-stone-900">
                What they make
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {vendor.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-bold text-stone-900">
                Our promise
              </h3>
              <ul className="grid gap-3 sm:grid-cols-3">
                {vendor.badges.map((badge) => (
                  <li
                    key={badge}
                    className="flex items-center gap-3 rounded-2xl border border-stone-100 bg-white p-4 shadow-sm"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <StarIcon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-semibold text-stone-700">
                      {badge}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-500 to-amber-500 p-6 text-white shadow-lg shadow-orange-500/20">
              <p className="text-[11px] font-bold uppercase tracking-widest text-orange-100">
                Ready to order?
              </p>
              <h3 className="mt-1 text-lg font-bold">
                Shop from {vendor.name}
              </h3>
              <Link
                href={`/search/${vendor.searchCollection}`}
                className="mt-4 block w-full rounded-xl bg-white py-3 text-center text-sm font-bold text-orange-600 transition-colors hover:bg-stone-50"
              >
                Browse {vendor.specialty}
              </Link>
              <Link
                href="/search"
                className="mt-2.5 block w-full rounded-xl border border-white/30 bg-white/10 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white/20"
              >
                Browse all vendors
              </Link>
            </div>

            <div className="rounded-3xl border border-stone-100 bg-white p-5 shadow-sm">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-stone-400">
                Available slots
              </p>
              <ul className="space-y-2">
                {vendor.slots.map((slot) => {
                  const meta = SLOT_META[slot];
                  if (!meta) return null;
                  return (
                    <li
                      key={slot}
                      className={`flex items-center gap-3 rounded-2xl bg-white px-3 py-2.5 ring-1 ${meta.ring}`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${meta.iconBg}`}
                      >
                        <meta.Icon className={`h-4 w-4 ${meta.iconText}`} />
                      </span>
                      <div className="leading-tight">
                        <p className="text-xs font-semibold text-stone-800">
                          {slot}
                        </p>
                        <p className="text-[11px] text-stone-400">
                          {meta.time}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-3xl border border-stone-100 bg-white p-5 shadow-sm">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-stone-400">
                Location
              </p>
              <p className="flex items-center gap-1.5 text-sm font-semibold text-stone-800">
                <MapPinIcon className="h-4 w-4 text-orange-500" />
                {vendor.location}
              </p>
              <p className="mt-1 text-xs text-stone-400">
                Delivering within {vendor.city}
              </p>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </>
  );
}
