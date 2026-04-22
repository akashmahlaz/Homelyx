import {
    EnvelopeIcon,
    MapPinIcon,
    PhoneIcon,
    ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const CITY_TILES: Array<{ name: string; image: string }> = [
  { name: "Bengaluru", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80" },
  { name: "Mumbai", image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=600&q=80" },
  { name: "Delhi", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80" },
  { name: "Hyderabad", image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=600&q=80" },
  { name: "Pune", image: "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=600&q=80" },
  { name: "Chennai", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80" },
];

const PAYMENT_METHODS: Array<{ label: string; svg: React.ReactNode }> = [
  { label: "UPI", svg: (
    <svg viewBox="0 0 64 24" className="h-5 w-auto" aria-hidden>
      <text x="0" y="18" fontFamily="ui-sans-serif, system-ui" fontSize="18" fontWeight="800" fill="#5B247A">UPI</text>
    </svg>
  ) },
  { label: "Visa", svg: (
    <svg viewBox="0 0 64 24" className="h-5 w-auto" aria-hidden>
      <text x="0" y="18" fontFamily="ui-sans-serif, system-ui" fontSize="16" fontStyle="italic" fontWeight="800" fill="#1A1F71">VISA</text>
    </svg>
  ) },
  { label: "Mastercard", svg: (
    <svg viewBox="0 0 32 20" className="h-5 w-auto" aria-hidden>
      <circle cx="12" cy="10" r="8" fill="#EB001B" />
      <circle cx="20" cy="10" r="8" fill="#F79E1B" />
      <path d="M16 4.4a8 8 0 010 11.2 8 8 0 010-11.2z" fill="#FF5F00" />
    </svg>
  ) },
  { label: "RuPay", svg: (
    <svg viewBox="0 0 64 24" className="h-5 w-auto" aria-hidden>
      <text x="0" y="18" fontFamily="ui-sans-serif, system-ui" fontSize="14" fontWeight="800" fill="#097969">Ru</text>
      <text x="22" y="18" fontFamily="ui-sans-serif, system-ui" fontSize="14" fontWeight="800" fill="#E03A3E">Pay</text>
    </svg>
  ) },
  { label: "COD", svg: (
    <svg viewBox="0 0 64 24" className="h-5 w-auto" aria-hidden>
      <text x="0" y="18" fontFamily="ui-sans-serif, system-ui" fontSize="14" fontWeight="800" fill="#0F766E">COD</text>
    </svg>
  ) },
];

const SOCIALS = [
  {
    label: "Instagram",
    d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "Twitter",
    d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "WhatsApp",
    d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200 bg-stone-50 text-stone-600">
      {/* Cities strip with photos */}
      <div className="border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500">
                Now serving
              </p>
              <h3 className="mt-1 text-xl font-bold text-stone-900 sm:text-2xl">
                Live in 24+ cities across India
              </h3>
            </div>
            <Link
              href="/search"
              className="hidden text-xs font-semibold text-orange-600 hover:text-orange-700 sm:block"
            >
              See all cities →
            </Link>
          </div>

          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {CITY_TILES.map((city) => (
              <li key={city.name} className="group">
                <div className="relative aspect-square overflow-hidden rounded-2xl ring-1 ring-stone-200">
                  <Image
                    src={city.image}
                    alt={`${city.name} skyline`}
                    fill
                    sizes="(min-width: 640px) 14vw, 30vw"
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/10 to-transparent" />
                  <p className="absolute inset-x-0 bottom-2 text-center text-xs font-bold text-white drop-shadow">
                    {city.name}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-4 py-8 md:flex-row md:items-center lg:px-6">
          <div>
            <p className="text-base font-bold text-white sm:text-lg">
              Get weekly homemade deals
            </p>
            <p className="mt-0.5 text-sm text-orange-50">
              New chefs, seasonal specials, and slot offers in your inbox.
            </p>
          </div>
          <form className="flex w-full max-w-md gap-2">
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 rounded-xl border-0 bg-white px-4 py-3 text-sm text-stone-900 placeholder-stone-400 outline-none ring-1 ring-white/40 focus:ring-white"
            />
            <button
              type="submit"
              className="rounded-xl bg-stone-900 px-5 py-3 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-100"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto grid max-w-7xl gap-10 bg-white px-4 py-14 lg:grid-cols-12 lg:gap-8 lg:px-6">
        {/* Brand */}
        <div className="lg:col-span-4">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/30">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 2 2 11h3v10h6v-6h2v6h6V11h3z" />
              </svg>
            </span>
            <span className="text-lg font-extrabold tracking-tight text-stone-900">
              Homelyx
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-500">
            India's first slot-based homemade food marketplace - connecting
            real home cooks with customers who love real, fresh food.
          </p>

          {/* Contact */}
          <ul className="mt-6 space-y-2.5 text-sm">
            <li className="flex items-center gap-2.5 text-stone-600">
              <PhoneIcon className="h-4 w-4 text-orange-500" />
              <a href="tel:+918000000000" className="hover:text-stone-900">
                +91 80000 00000
              </a>
            </li>
            <li className="flex items-center gap-2.5 text-stone-600">
              <EnvelopeIcon className="h-4 w-4 text-orange-500" />
              <a href="mailto:hello@homelyx.in" className="hover:text-stone-900">
                hello@homelyx.in
              </a>
            </li>
            <li className="flex items-center gap-2.5 text-stone-600">
              <MapPinIcon className="h-4 w-4 text-orange-500" />
              Bengaluru, India
            </li>
          </ul>

          {/* Socials */}
          <div className="mt-6 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-500 transition-colors hover:bg-orange-500 hover:text-white"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6 lg:grid-cols-3">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-400">
              Marketplace
            </p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/search" className="hover:text-orange-600">Browse all</Link></li>
              <li><Link href="/search/tiffins" className="hover:text-orange-600">Tiffins</Link></li>
              <li><Link href="/search/curries" className="hover:text-orange-600">Curries</Link></li>
              <li><Link href="/search/baked-goods" className="hover:text-orange-600">Baked goods</Link></li>
              <li><Link href="/search/pickles" className="hover:text-orange-600">Pickles</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-400">
              For chefs
            </p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/sell" className="hover:text-orange-600">Sell with Homelyx</Link></li>
              <li><Link href="/sell#how-it-works" className="hover:text-orange-600">How it works</Link></li>
              <li><Link href="/sell#earnings" className="hover:text-orange-600">Earnings calculator</Link></li>
              <li><Link href="/auth/login" className="hover:text-orange-600">Vendor login</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-400">
              Support
            </p>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-600">Help centre</a></li>
              <li><a href="#" className="hover:text-orange-600">Track order</a></li>
              <li><a href="#" className="hover:text-orange-600">Refund policy</a></li>
              <li><a href="#" className="hover:text-orange-600">Contact us</a></li>
            </ul>
          </div>
        </div>

        {/* App + trust */}
        <div className="lg:col-span-2">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-400">
            Get the app
          </p>
          <div className="space-y-2">
            <a
              href="#"
              className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-xs text-stone-600 transition-colors hover:border-orange-300 hover:text-stone-900"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-stone-700" fill="currentColor">
                <path d="M3.6 2.7v18.6c0 .3.3.5.6.4l13-9.3c.3-.2.3-.6 0-.8l-13-9.3c-.3-.2-.6 0-.6.4z" />
              </svg>
              <div className="leading-tight">
                <p className="text-[10px] uppercase text-stone-400">Get it on</p>
                <p className="text-sm font-bold text-stone-900">Google Play</p>
              </div>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-xs text-stone-600 transition-colors hover:border-orange-300 hover:text-stone-900"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-stone-700" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <div className="leading-tight">
                <p className="text-[10px] uppercase text-stone-400">Download on</p>
                <p className="text-sm font-bold text-stone-900">App Store</p>
              </div>
            </a>
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5">
            <ShieldCheckIcon className="h-4 w-4 shrink-0 text-emerald-600" />
            <p className="text-[11px] leading-tight text-emerald-800">
              All vendors FSSAI-compliant & verified
            </p>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-stone-200 bg-stone-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 text-xs text-stone-500 md:flex-row md:items-center lg:px-6">
          <p>© {year} Homelyx Technologies Pvt. Ltd. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-2 md:ml-auto">
            <span className="text-[10px] uppercase tracking-wider text-stone-400">
              We accept
            </span>
            {PAYMENT_METHODS.map((p) => (
              <span
                key={p.label}
                title={p.label}
                className="flex h-7 items-center justify-center rounded-md bg-white px-2 ring-1 ring-stone-200"
              >
                {p.svg}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <a href="#" className="hover:text-stone-900">Privacy</a>
            <a href="#" className="hover:text-stone-900">Terms</a>
            <a href="#" className="hover:text-stone-900">FSSAI</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
