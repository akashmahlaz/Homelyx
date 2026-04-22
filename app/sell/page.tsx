import {
    ArrowRightIcon,
    BanknotesIcon,
    ChartBarIcon,
    ChatBubbleLeftRightIcon,
    ClipboardDocumentCheckIcon,
    ClockIcon,
    HomeIcon,
    ShieldCheckIcon,
    StarIcon,
    TruckIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";

export const metadata = {
  title: "Sell with Homelyx â€“ Turn Your Kitchen into a Business",
  description:
    "Join Homelyx as a home-based vendor. Sell homemade food on your own schedule with slot-based delivery.",
};

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const STATS = [
  { value: "2,400+", label: "Active vendors" },
  { value: "â‚¹18,000", label: "Avg. monthly earnings" },
  { value: "4.8", label: "Vendor rating" },
  { value: "0%", label: "Commission month 1" },
];

const STEPS: Array<{
  num: string;
  Icon: IconType;
  title: string;
  desc: string;
  time: string;
  image: string;
}> = [
  {
    num: "01",
    Icon: ClipboardDocumentCheckIcon,
    title: "KYC & Documents",
    desc: "Submit Aadhaar, PAN, bank account details, and your FSSAI registration (we help you get one if needed).",
    time: "~10 min",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
  },
  {
    num: "02",
    Icon: HomeIcon,
    title: "Add Your Products",
    desc: "Upload photos, set prices, write descriptions, and choose which delivery slots each item is available for.",
    time: "~15 min",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
  },
  {
    num: "03",
    Icon: ClockIcon,
    title: "Set Your Schedule",
    desc: "You pick morning, afternoon, evening, or night slots â€” cook and deliver only when it works for you.",
    time: "Fully flexible",
    image:
      "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&w=800&q=80",
  },
  {
    num: "04",
    Icon: BanknotesIcon,
    title: "Weekly Payouts",
    desc: "All orders are settled weekly directly to your bank account. Real-time sales dashboard included.",
    time: "Every Monday",
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
  },
];

const BENEFITS: Array<{ Icon: IconType; title: string; desc: string; tint: string }> = [
  {
    Icon: HomeIcon,
    title: "Cook from home",
    desc: "No commercial kitchen needed. Your home is your workplace.",
    tint: "bg-orange-50 text-orange-600",
  },
  {
    Icon: ClockIcon,
    title: "Your own hours",
    desc: "Choose slots that fit your lifestyle. No mandatory availability.",
    tint: "bg-amber-50 text-amber-600",
  },
  {
    Icon: TruckIcon,
    title: "We handle delivery",
    desc: "Homelyx delivery partners pick up and deliver â€” you just cook.",
    tint: "bg-sky-50 text-sky-600",
  },
  {
    Icon: ChartBarIcon,
    title: "Live analytics",
    desc: "Track sales, ratings, and earnings in real-time from your dashboard.",
    tint: "bg-indigo-50 text-indigo-600",
  },
  {
    Icon: ShieldCheckIcon,
    title: "FSSAI support",
    desc: "We guide you through food safety certification at no cost.",
    tint: "bg-emerald-50 text-emerald-600",
  },
  {
    Icon: ChatBubbleLeftRightIcon,
    title: "Vendor community",
    desc: "Join WhatsApp groups with 2,400+ home chefs sharing tips and recipes.",
    tint: "bg-rose-50 text-rose-600",
  },
];

const TESTIMONIALS = [
  {
    name: "Meera Reddy",
    city: "Bengaluru",
    quote:
      "I started selling 2 tiffins a day. Now I run 80+ orders a week and earn more than my old IT job â€” from my own kitchen.",
    earnings: "â‚¹42,000/month",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Anita Sharma",
    city: "Pune",
    quote:
      "Homelyx handles delivery, payments, even the FSSAI paperwork. I just cook the meals my grandmother taught me.",
    earnings: "â‚¹28,000/month",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Priya Iyer",
    city: "Chennai",
    quote:
      "The slot system means no last-minute panic orders. I cook fresh, deliver on time, and have my evenings back.",
    earnings: "â‚¹35,000/month",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
];

const FAQS = [
  {
    q: "Do I need a professional kitchen?",
    a: "No. Your home kitchen is perfectly fine as long as you maintain basic hygiene standards outlined in our vendor guide.",
  },
  {
    q: "How much can I earn?",
    a: "Vendors typically earn â‚¹8,000â€“â‚¹35,000/month depending on menu size and slot availability. Top vendors earn over â‚¹60,000/month.",
  },
  {
    q: "What commission does Homelyx take?",
    a: "0% for your first month. After that, 12% platform fee â€” among the lowest in the industry.",
  },
  {
    q: "Who handles delivery?",
    a: "Homelyx coordinates delivery through our partner network. You package and hand over to our pickup agent.",
  },
];

export default function SellPage() {
  return (
    <div className="bg-white">
      {/* Hero with image */}
      <section className="relative overflow-hidden bg-stone-950 text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=2000&q=80"
            alt="Home chef preparing food"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/85 to-stone-950/30" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-6 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-widest text-orange-400">
              Vendor Programme
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              Turn your kitchen
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                into a business
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-stone-300 sm:text-lg">
              Cook what you love, on your schedule. Homelyx handles delivery,
              payments, and customer support â€” you focus on the food.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#apply"
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-orange-600"
              >
                Apply now â€” it's free
                <ArrowRightIcon className="h-4 w-4" />
              </a>
              <a
                href="#how-it-works"
                className="rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                See how it works
              </a>
            </div>

            {/* Floating chef proof badge */}
            <div className="mt-10 inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/20 backdrop-blur-md">
              <div className="flex -space-x-2">
                {TESTIMONIALS.map((t) => (
                  <div
                    key={t.name}
                    className="relative h-7 w-7 overflow-hidden rounded-full ring-2 ring-stone-950"
                  >
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      sizes="28px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs font-medium text-white">
                Joined by <span className="font-bold">2,400+ home chefs</span> across India
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-b border-stone-100 bg-orange-50/60">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-stone-200 px-4 sm:divide-x md:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`px-6 py-7 text-center ${i > 0 ? "sm:border-l sm:border-stone-200" : ""}`}
            >
              <p className="text-2xl font-extrabold text-orange-600 sm:text-3xl">{s.value}</p>
              <p className="mt-1 text-xs text-stone-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works â€” image cards */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-20 lg:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500">
            Simple process
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Start selling in 4 steps
          </h2>
          <p className="mt-3 text-stone-500">
            From signup to first payout â€” usually under a week.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="group overflow-hidden rounded-3xl bg-white ring-1 ring-stone-200 transition-all hover:-translate-y-1 hover:shadow-lg hover:ring-orange-200"
            >
              <div className="relative aspect-[5/3] overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-orange-600 backdrop-blur-sm">
                  {step.num}
                </span>
                <span className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-orange-600 ring-2 ring-white">
                  <step.Icon className="h-5 w-5" />
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-stone-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">
                  {step.desc}
                </p>
                <p className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-orange-600">
                  <ClockIcon className="h-3.5 w-3.5" />
                  {step.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Earnings calculator + image */}
      <section id="earnings" className="bg-stone-50 px-4 py-20 lg:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl ring-1 ring-stone-200">
              <Image
                src="https://images.unsplash.com/photo-1556909114-44e3e9399a2e?auto=format&fit=crop&w=900&q=80"
                alt="Home chef plating food"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="rounded-2xl bg-white/95 p-4 shadow-xl ring-1 ring-stone-200 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-stone-500">
                      Avg. earnings (Top 10%)
                    </p>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                      +12% MoM
                    </span>
                  </div>
                  <p className="mt-1 text-3xl font-extrabold text-stone-900">
                    â‚¹62,400<span className="text-base font-medium text-stone-400">/mo</span>
                  </p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-stone-100">
                    <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-orange-500 to-amber-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500">
              Earnings preview
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Real numbers from real home chefs
            </h2>
            <p className="mt-3 max-w-xl text-stone-500">
              You set the menu and slots. We track everything in your vendor dashboard.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <article
                  key={t.name}
                  className="rounded-2xl bg-white p-4 ring-1 ring-stone-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-orange-100">
                      <Image src={t.image} alt={t.name} fill sizes="44px" className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-stone-900">{t.name}</p>
                      <p className="text-[11px] text-stone-500">{t.city}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-stone-600">
                    "{t.quote}"
                  </p>
                  <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                    <BanknotesIcon className="h-3 w-3" />
                    {t.earnings}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 py-20 lg:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500">
              Why Homelyx
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Everything you need to succeed
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="group rounded-3xl bg-white p-6 ring-1 ring-stone-200 transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-orange-200"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${b.tint}`}
                >
                  <b.Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-bold text-stone-900">{b.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-500">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-stone-50 px-4 py-20 lg:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500">
              FAQ
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Common questions
            </h2>
          </div>
          <div className="mt-10 space-y-4">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl bg-white p-6 ring-1 ring-stone-200 open:ring-orange-200"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4">
                  <p className="font-semibold text-stone-900">{faq.q}</p>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600 transition-transform group-open:rotate-45">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Apply CTA with split image */}
      <section
        id="apply"
        className="relative overflow-hidden bg-stone-950 px-4 py-20 text-white lg:px-6"
      >
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=2000&q=80"
            alt="Indian home cook"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/90 to-orange-950/40" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-orange-400">
              Apply now
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ready to start cooking for money?
            </h2>
            <p className="mt-4 text-stone-300">
              Applications take under 5 minutes. Our onboarding team reaches
              out within 24 hours.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-stone-300">
              {[
                "0% commission your first month",
                "Free FSSAI registration support",
                "Weekly bank payouts, no lock-in",
              ].map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-2 text-xs text-stone-400">
              <StarIcon className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span>
                <span className="font-bold text-white">4.8/5</span> vendor satisfaction across India
              </span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/20 backdrop-blur-md sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Your full name"
                  className="rounded-xl border-0 bg-white/15 px-4 py-3 text-sm text-white placeholder-stone-400 outline-none ring-1 ring-white/20 focus:ring-orange-400"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp number"
                  className="rounded-xl border-0 bg-white/15 px-4 py-3 text-sm text-white placeholder-stone-400 outline-none ring-1 ring-white/20 focus:ring-orange-400"
                />
                <input
                  type="text"
                  placeholder="City (e.g. Bengaluru)"
                  className="rounded-xl border-0 bg-white/15 px-4 py-3 text-sm text-white placeholder-stone-400 outline-none ring-1 ring-white/20 focus:ring-orange-400"
                />
                <select
                  className="rounded-xl border-0 bg-white/15 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/20 focus:ring-orange-400"
                  defaultValue=""
                >
                  <option value="" className="text-stone-800">
                    What will you sell?
                  </option>
                  <option value="breakfast" className="text-stone-800">Breakfast / Tiffin</option>
                  <option value="lunch" className="text-stone-800">Lunch / Thali</option>
                  <option value="snacks" className="text-stone-800">Snacks / Sweets</option>
                  <option value="baked" className="text-stone-800">Baked Goods</option>
                  <option value="pickles" className="text-stone-800">Pickles / Preserves</option>
                  <option value="other" className="text-stone-800">Other</option>
                </select>
              </div>

              <button
                type="submit"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.01] hover:bg-orange-600 active:scale-100"
              >
                Submit application
                <ArrowRightIcon className="h-4 w-4" />
              </button>

              <p className="mt-4 text-center text-xs text-stone-400">
                Already a vendor?{" "}
                <Link href="/auth/login" className="font-semibold text-orange-300 underline hover:text-orange-200">
                  Sign in to dashboard
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
