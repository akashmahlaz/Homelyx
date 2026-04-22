import Link from "next/link";

export const metadata = {
  title: "Order Placed – Homelyx",
  description: "Your Homelyx order has been placed successfully.",
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-orange-50 px-4 py-16 lg:px-6">
      <div className="mx-auto max-w-xl">
        {/* Success card */}
        <div className="rounded-3xl border border-orange-100 bg-white p-8 shadow-sm text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg className="h-10 w-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-stone-900">Order placed! 🎉</h1>
          <p className="mt-2 text-stone-500">
            Thank you for ordering from Homelyx. Your home chef is already preparing your meal.
          </p>

          {/* Order details */}
          <div className="mt-8 rounded-2xl border border-stone-100 bg-stone-50 p-5 text-left space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone-500">Order ID</span>
              <span className="font-mono font-semibold text-stone-800">#HLX-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone-500">Delivery slot</span>
              <span className="font-semibold text-stone-800">Morning (8 AM – 11 AM)</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone-500">Payment</span>
              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">Confirmed</span>
            </div>
          </div>

          {/* What happens next */}
          <div className="mt-6 rounded-2xl border border-orange-100 bg-orange-50 p-5 text-left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-orange-500">What happens next</p>
            <ol className="space-y-2 text-sm text-stone-600">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-200 text-xs font-bold text-orange-700">1</span>
                Your home chef confirms the order and starts cooking.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-200 text-xs font-bold text-orange-700">2</span>
                You get an SMS notification 30 min before delivery.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-200 text-xs font-bold text-orange-700">3</span>
                Fresh food arrives at your door during your chosen slot.
              </li>
            </ol>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href="/search"
              className="rounded-xl bg-orange-500 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Order more food
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-stone-200 px-5 py-3 text-center text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* Rate nudge */}
        <p className="mt-6 text-center text-xs text-stone-400">
          After delivery, you&apos;ll receive a link to rate your home chef. Your feedback helps the community grow.
        </p>
      </div>
    </div>
  );
}
