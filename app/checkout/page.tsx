import { cookies } from "next/headers";
import Link from "next/link";

const SLOTS = [
  { id: "morning", label: "Morning", time: "5–10 AM", emoji: "🌅" },
  { id: "afternoon", label: "Afternoon", time: "11 AM–3 PM", emoji: "☀️" },
  { id: "evening", label: "Evening", time: "4–8 PM", emoji: "🌆" },
  { id: "night", label: "Night", time: "8–11 PM", emoji: "🌙" },
];

export default async function CheckoutPage() {
  const cookieStore = await cookies();
  const selectedSlot = cookieStore.get("selectedSlot")?.value || "evening";
  const slot = SLOTS.find((s) => s.id === selectedSlot) || SLOTS[2];

  return (
    <div className="min-h-screen bg-orange-50 px-4 py-8 lg:px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-stone-900">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left: Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-stone-900">Delivery Address</h2>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-stone-600">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Priya Sharma"
                      className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-stone-600">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-stone-600">Address Line 1</label>
                  <input
                    type="text"
                    name="address1"
                    placeholder="42, MG Road, Indiranagar"
                    className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-stone-600">Address Line 2</label>
                  <input
                    type="text"
                    name="address2"
                    placeholder="Near Metro Station"
                    className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-stone-600">Landmark (optional)</label>
                    <input
                      type="text"
                      name="landmark"
                      placeholder="Opposite Park"
                      className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-stone-600">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      placeholder="560001"
                      className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Delivery Slot */}
            <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-stone-900">Delivery Slot</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {SLOTS.map((s) => {
                  const isSelected = s.id === selectedSlot;
                  return (
                    <div
                      key={s.id}
                      className={`flex flex-col items-center rounded-xl border-2 p-3 transition-all ${
                        isSelected
                          ? "border-orange-500 bg-orange-50"
                          : "border-stone-100 hover:border-stone-200"
                      }`}
                    >
                      <span className="text-2xl">{s.emoji}</span>
                      <span className={`mt-1 text-sm font-bold ${isSelected ? "text-orange-600" : "text-stone-700"}`}>
                        {s.label}
                      </span>
                      <span className="text-xs text-stone-500">{s.time}</span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 text-sm text-stone-500">
                Your order will be delivered during <span className="font-semibold text-orange-600">{slot?.label ?? "Evening"} ({slot?.time ?? "4-8 PM"})</span>
              </p>
            </div>

            {/* Payment Method */}
            <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-stone-900">Payment Method</h2>
              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-4 rounded-xl border-2 border-orange-500 bg-orange-50 p-4 transition-all">
                  <input type="radio" name="payment" value="razorpay" defaultChecked className="h-5 w-5 text-orange-500" />
                  <div className="flex-1">
                    <span className="font-semibold text-stone-900">Pay Online (Razorpay)</span>
                    <p className="text-sm text-stone-500">UPI, Cards, Netbanking</p>
                  </div>
                  <span className="text-xs font-medium text-green-600">Recommended</span>
                </label>
                <label className="flex cursor-pointer items-center gap-4 rounded-xl border-2 border-stone-100 p-4 transition-all hover:border-stone-200">
                  <input type="radio" name="payment" value="cod" className="h-5 w-5 text-orange-500" />
                  <div className="flex-1">
                    <span className="font-semibold text-stone-900">Cash on Delivery</span>
                    <p className="text-sm text-stone-500">+₹49 COD handling fee</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-stone-900">Order Summary</h2>

              {/* Order items placeholder */}
              <div className="space-y-3 border-b border-stone-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-orange-50 text-xl">🍛</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-stone-800">Paneer Butter Masala</p>
                    <p className="text-xs text-stone-400">Qty: 1</p>
                  </div>
                  <span className="text-sm font-bold text-stone-800">₹259</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-orange-50 text-xl">🫓</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-stone-800">Garlic Naan</p>
                    <p className="text-xs text-stone-400">Qty: 2</p>
                  </div>
                  <span className="text-sm font-bold text-stone-800">₹120</span>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="space-y-2 border-b border-stone-100 py-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-500">Subtotal</span>
                  <span className="font-medium text-stone-700">₹379</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Delivery</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between py-4 text-lg font-bold">
                <span className="text-stone-900">Total</span>
                <span className="text-orange-600">₹379</span>
              </div>

              {/* Place Order Button */}
              <button className="w-full rounded-full bg-orange-500 py-4 text-base font-bold text-white transition hover:bg-orange-600">
                Pay ₹379 →
              </button>

              {/* Trust indicator */}
              <p className="mt-4 text-center text-xs text-stone-400">
                🔒 Secured by Razorpay
              </p>

              {/* Back to cart link */}
              <Link
                href="/"
                className="mt-4 flex items-center justify-center gap-1 text-sm text-stone-500 hover:text-orange-500"
              >
                ← Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}