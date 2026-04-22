import Link from "next/link";

export const metadata = {
  title: "Sell with Homelyx – Turn Your Kitchen into a Business",
  description: "Join Homelyx as a home-based vendor. Sell homemade food on your own schedule with slot-based delivery.",
};

const STATS = [
  { value: "2,400+", label: "Active vendors" },
  { value: "₹18,000", label: "Avg. monthly earnings" },
  { value: "4.8★", label: "Vendor satisfaction" },
  { value: "0%", label: "Commission first month" },
];

const STEPS = [
  {
    num: "01",
    icon: "📋",
    title: "KYC & Documents",
    desc: "Submit Aadhaar, PAN, bank account details, and your FSSAI registration (we help you get one if needed).",
    time: "~10 min",
  },
  {
    num: "02",
    icon: "🍽️",
    title: "Add Your Products",
    desc: "Upload photos, set prices, write descriptions, and choose which delivery slots each item is available for.",
    time: "~15 min",
  },
  {
    num: "03",
    icon: "⏰",
    title: "Set Your Schedule",
    desc: "You pick morning, afternoon, evening, or night slots — cook and deliver only when it works for you.",
    time: "Fully flexible",
  },
  {
    num: "04",
    icon: "💸",
    title: "Receive Weekly Payouts",
    desc: "All orders are settled weekly directly to your bank account. Real-time sales dashboard included.",
    time: "Every Monday",
  },
];

const BENEFITS = [
  { icon: "🏠", title: "Cook from home", desc: "No commercial kitchen needed. Your home is your workplace." },
  { icon: "🕐", title: "Your own hours", desc: "Choose slots that fit your lifestyle. No mandatory availability." },
  { icon: "📦", title: "We handle delivery", desc: "Homelyx delivery partners pick up and deliver — you just cook." },
  { icon: "📊", title: "Live analytics", desc: "Track sales, ratings, and earnings in real-time from your dashboard." },
  { icon: "🛡️", title: "FSSAI support", desc: "We guide you through food safety certification at no cost." },
  { icon: "💬", title: "Vendor community", desc: "Join WhatsApp groups with 2,400+ home chefs sharing tips and recipes." },
];

const FAQS = [
  { q: "Do I need a professional kitchen?", a: "No. Your home kitchen is perfectly fine as long as you maintain basic hygiene standards outlined in our vendor guide." },
  { q: "How much can I earn?", a: "Vendors typically earn ₹8,000–₹35,000/month depending on menu size and slot availability. Top vendors earn over ₹60,000/month." },
  { q: "What commission does Homelyx take?", a: "0% for your first month. After that, 12% platform fee — among the lowest in the industry." },
  { q: "Who handles delivery?", a: "Homelyx coordinates delivery through our partner network. You package and hand over to our pickup agent." },
];

export default function SellPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600 px-4 py-20 text-white lg:px-6">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative mx-auto max-w-5xl">
          <span className="inline-block rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm">
            Vendor Programme
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            Turn your kitchen<br />into a business
          </h1>
          <p className="mt-5 max-w-xl text-lg text-orange-100">
            Cook what you love, on your schedule. Homelyx handles everything else — delivery, payments, and customer support.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#apply" className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-orange-600 shadow-lg transition-transform hover:scale-105">
              Apply Now — It&apos;s Free
            </a>
            <a href="#how-it-works" className="rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20">
              See how it works
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-b border-stone-100 bg-orange-50">
        <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-stone-200 px-4 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="px-6 py-6 text-center">
              <p className="text-2xl font-extrabold text-orange-500">{s.value}</p>
              <p className="mt-1 text-xs text-stone-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-5xl px-4 py-20 lg:px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-orange-500">Simple process</p>
        <h2 className="mt-2 text-center text-3xl font-bold text-stone-900">Start selling in 4 steps</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.num} className="group rounded-2xl border border-stone-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-3xl">{step.icon}</span>
                <span className="text-xs font-bold text-stone-300">{step.num}</span>
              </div>
              <h3 className="font-bold text-stone-900">{step.title}</h3>
              <p className="mt-2 text-sm text-stone-500">{step.desc}</p>
              <p className="mt-4 text-xs font-semibold text-orange-500">{step.time}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-stone-50 px-4 py-20 lg:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-orange-500">Why Homelyx</p>
          <h2 className="mt-2 text-center text-3xl font-bold text-stone-900">Everything you need to succeed</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <div key={b.title} className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
                <span className="text-3xl">{b.icon}</span>
                <h3 className="mt-3 font-bold text-stone-900">{b.title}</h3>
                <p className="mt-1.5 text-sm text-stone-500">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-3xl px-4 py-20 lg:px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-orange-500">FAQ</p>
        <h2 className="mt-2 text-center text-3xl font-bold text-stone-900">Common questions</h2>
        <div className="mt-10 space-y-4">
          {FAQS.map((faq) => (
            <div key={faq.q} className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
              <p className="font-semibold text-stone-900">{faq.q}</p>
              <p className="mt-2 text-sm text-stone-500">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Apply CTA */}
      <section id="apply" className="bg-gradient-to-br from-orange-500 to-orange-600 px-4 py-20 text-white lg:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold">Ready to start cooking for money?</h2>
          <p className="mt-4 text-orange-100">Applications take under 5 minutes. Our onboarding team will reach out within 24 hours.</p>
          <form className="mx-auto mt-10 max-w-md space-y-4">
            <input type="text" placeholder="Your full name" className="w-full rounded-xl border-0 bg-white/20 px-5 py-3.5 text-sm text-white placeholder-orange-200 outline-none ring-1 ring-white/30 backdrop-blur-sm focus:ring-white" />
            <input type="tel" placeholder="WhatsApp number" className="w-full rounded-xl border-0 bg-white/20 px-5 py-3.5 text-sm text-white placeholder-orange-200 outline-none ring-1 ring-white/30 backdrop-blur-sm focus:ring-white" />
            <input type="text" placeholder="City (e.g. Bengaluru, Mumbai)" className="w-full rounded-xl border-0 bg-white/20 px-5 py-3.5 text-sm text-white placeholder-orange-200 outline-none ring-1 ring-white/30 backdrop-blur-sm focus:ring-white" />
            <select className="w-full rounded-xl border-0 bg-white/20 px-5 py-3.5 text-sm text-white outline-none ring-1 ring-white/30 backdrop-blur-sm focus:ring-white">
              <option value="" className="text-stone-800">What will you sell?</option>
              <option value="breakfast" className="text-stone-800">Breakfast / Tiffin</option>
              <option value="lunch" className="text-stone-800">Lunch / Thali</option>
              <option value="snacks" className="text-stone-800">Snacks / Sweets</option>
              <option value="baked" className="text-stone-800">Baked Goods</option>
              <option value="pickles" className="text-stone-800">Pickles / Preserves</option>
              <option value="other" className="text-stone-800">Other</option>
            </select>
            <button type="submit" className="w-full rounded-xl bg-white py-3.5 text-sm font-bold text-orange-600 shadow-lg transition-transform hover:scale-[1.02] active:scale-100">
              Submit Application →
            </button>
          </form>
          <p className="mt-4 text-xs text-orange-200">
            Already a vendor?{" "}
            <Link href="/" className="underline hover:text-white">
              Sign in to dashboard
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
