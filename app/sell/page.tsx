import {
    ArrowRightIcon,
    BanknotesIcon,
    ChartBarIcon,
    ChatBubbleLeftRightIcon,
    CheckBadgeIcon,
    ClipboardDocumentCheckIcon,
    ClockIcon,
    HomeIcon,
    ShieldCheckIcon,
    TruckIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { ApplyForm } from "./apply-form";

export const metadata = {
  title: "Sell with Homelyx - Turn Your Kitchen into a Business",
  description:
    "Join Homelyx as a home-based vendor. Sell homemade food on your own schedule with slot-based delivery.",
};

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const STATS = [
  { value: "2,400+", label: "Active vendors" },
  { value: "₹18,000", label: "Avg. monthly earnings" },
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
    title: "Add your products",
    desc: "Upload photos, set prices, write descriptions, and choose which delivery slots each item is available for.",
    time: "~15 min",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
  },
  {
    num: "03",
    Icon: ClockIcon,
    title: "Set your schedule",
    desc: "Pick morning, afternoon, evening, or night slots - cook and deliver only when it works for you.",
    time: "Fully flexible",
    image:
      "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&w=800&q=80",
  },
  {
    num: "04",
    Icon: BanknotesIcon,
    title: "Weekly payouts",
    desc: "All orders are settled weekly directly to your bank account. Real-time sales dashboard included.",
    time: "Every Monday",
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
  },
];

const BENEFITS: Array<{ Icon: IconType; title: string; desc: string; tint: string }> = [
  { Icon: HomeIcon, title: "Cook from home", desc: "No commercial kitchen needed. Your home is your workplace.", tint: "bg-orange-50 text-orange-600" },
  { Icon: ClockIcon, title: "Your own hours", desc: "Choose slots that fit your lifestyle. No mandatory availability.", tint: "bg-amber-50 text-amber-600" },
  { Icon: TruckIcon, title: "We handle delivery", desc: "Homelyx delivery partners pick up and deliver - you just cook.", tint: "bg-sky-50 text-sky-600" },
  { Icon: ChartBarIcon, title: "Live analytics", desc: "Track sales, ratings, and earnings in real-time from your dashboard.", tint: "bg-indigo-50 text-indigo-600" },
  { Icon: ShieldCheckIcon, title: "FSSAI support", desc: "We guide you through food safety certification at no cost.", tint: "bg-emerald-50 text-emerald-600" },
  { Icon: ChatBubbleLeftRightIcon, title: "Vendor community", desc: "Join WhatsApp groups with 2,400+ home chefs sharing tips and recipes.", tint: "bg-rose-50 text-rose-600" },
];

const TESTIMONIALS = [
  {
    name: "Meera Reddy",
    city: "Bengaluru",
    quote: "I started selling 2 tiffins a day. Now I run 80+ orders a week and earn more than my old IT job - from my own kitchen.",
    earnings: "₹42,000/month",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Anita Sharma",
    city: "Pune",
    quote: "Homelyx handles delivery, payments, even the FSSAI paperwork. I just cook the meals my grandmother taught me.",
    earnings: "₹28,000/month",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Priya Iyer",
    city: "Chennai",
    quote: "The slot system means no last-minute panic orders. I cook fresh, deliver on time, and have my evenings back.",
    earnings: "₹35,000/month",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
];

const FAQS = [
  { q: "Do I need a professional kitchen?", a: "No. Your home kitchen is perfectly fine as long as you maintain basic hygiene standards outlined in our vendor guide." },
  { q: "How much can I earn?", a: "Vendors typically earn ₹8,000 to ₹35,000/month depending on menu size and slot availability. Top vendors earn over ₹60,000/month." },
  { q: "What commission does Homelyx take?", a: "0% for your first month. After that, 12% platform fee - among the lowest in the industry." },
  { q: "Who handles delivery?", a: "Homelyx coordinates delivery through our partner network. You package and hand over to our pickup agent." },
];

export default function SellPage() {
  return (
    <div className="bg-white">
      {/* Hero - light cream split layout */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50/40 to-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-6 lg:py-24">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-orange-600 ring-1 ring-orange-200/80">
              Vendor programme
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-stone-900 md:text-5xl lg:text-6xl">
              Turn your kitchen
              <br />
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                into a business
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-stone-600 sm:text-lg">
              Cook what you love, on your schedule. Homelyx handles delivery,
              payments, and customer support - you focus on the food.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#apply"
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition-transform hover:scale-105 hover:bg-orange-600"
              >
                Apply now - it's free
                <ArrowRightIcon className="h-4 w-4" />
              </a>
              <a
                href="#how-it-works"
                className="rounded-full border border-stone-300 bg-white px-7 py-3.5 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50"
              >
                See how it works
              </a>
            </div>

            {/* Proof row */}
            <div className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-stone-200">
              <div className="flex -space-x-2">
                {TESTIMONIALS.map((t) => (
                  <div
                    key={t.name}
                    className="relative h-7 w-7 overflow-hidden rounded-full ring-2 ring-white"
                  >
                    <Image src={t.image} alt={t.name} fill sizes="28px" className="object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-xs font-medium text-stone-700">
                Joined by <span className="font-bold text-stone-900">2,400+ home chefs</span> across India
              </p>
            </div>
          </div>

          {/* Right photo collage */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-stone-200">
                <Image
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80"
                  alt="Home chef preparing food"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>

              {/* Floating earnings card */}
              <div className="absolute -bottom-5 -left-3 hidden w-52 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-stone-100 sm:block lg:-left-6">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                  Top vendor this month
                </p>
                <p className="mt-1 text-2xl font-extrabold text-stone-900">
                  ₹62,400
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-100">
                  <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-orange-500 to-amber-500" />
                </div>
                <p className="mt-2 text-[11px] text-emerald-600">↑ 12% vs last month</p>
              </div>

              {/* Floating verified pill */}
              <div className="absolute -right-3 top-6 hidden items-center gap-1.5 rounded-full bg-white px-3 py-2 shadow-xl ring-1 ring-stone-100 sm:inline-flex lg:-right-6">
                <CheckBadgeIcon className="h-4 w-4 text-orange-500" />
                <p className="text-xs font-bold text-stone-800">FSSAI verified</p>
              </div>

              {/* Small thali photo top-left */}
              <div className="absolute -left-4 -top-4 hidden h-20 w-20 overflow-hidden rounded-2xl shadow-lg ring-4 ring-white sm:block lg:h-24 lg:w-24">
                <Image
                  src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=200&q=80"
                  alt="Thali"
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-y border-stone-100 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-4 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`px-6 py-7 text-center ${i > 0 ? "md:border-l md:border-stone-100" : ""} ${i === 1 ? "border-l border-stone-100" : ""}`}
            >
              <p className="text-2xl font-extrabold text-orange-600 sm:text-3xl">{s.value}</p>
              <p className="mt-1 text-xs text-stone-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works - image cards */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-20 lg:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500">
            Simple process
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Start selling in 4 steps
          </h2>
          <p className="mt-3 text-stone-500">
            From signup to first payout - usually under a week.
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
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />
                <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-orange-600 backdrop-blur-sm">
                  {step.num}
                </span>
                <span className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-orange-600 ring-2 ring-white">
                  <step.Icon className="h-5 w-5" />
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-stone-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">{step.desc}</p>
                <p className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-orange-600">
                  <ClockIcon className="h-3.5 w-3.5" />
                  {step.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Earnings + testimonials */}
      <section id="earnings" className="bg-stone-50 px-4 py-20 lg:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl ring-1 ring-stone-200">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80"
                alt="Home chef plating food"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="rounded-2xl bg-white/95 p-4 shadow-xl ring-1 ring-stone-200 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-stone-500">
                      Avg earnings (top 10%)
                    </p>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                      +12% MoM
                    </span>
                  </div>
                  <p className="mt-1 text-3xl font-extrabold text-stone-900">
                    ₹62,400<span className="text-base font-medium text-stone-400">/mo</span>
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
                <p className="mt-1.5 text-sm leading-relaxed text-stone-500">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-stone-50 px-4 py-20 lg:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500">FAQ</p>
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
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Apply CTA - light premium */}
      <section
        id="apply"
        className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50/50 to-rose-50 px-4 py-20 lg:px-6"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-orange-600">
              Apply now
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
              Ready to start cooking for money?
            </h2>
            <p className="mt-4 text-stone-600">
              Applications take under 5 minutes. Our onboarding team reaches out within 24 hours.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-stone-700">
              {[
                "0% commission your first month",
                "Free FSSAI registration support",
                "Weekly bank payouts, no lock-in",
              ].map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-2 text-xs text-stone-600">
              <StarIcon className="h-4 w-4 fill-amber-500 text-amber-500" />
              <span>
                <span className="font-bold text-stone-900">4.8/5</span> vendor satisfaction across India
              </span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ApplyForm />
          </div>
        </div>
      </section>
    </div>
  );
}

