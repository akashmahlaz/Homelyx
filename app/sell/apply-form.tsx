"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

type CuisineKind = "breakfast" | "lunch" | "snacks" | "baked" | "pickles" | "other";

const CUISINE_OPTIONS: Array<{ value: CuisineKind; label: string }> = [
  { value: "breakfast", label: "Breakfast / Tiffin" },
  { value: "lunch", label: "Lunch / Thali" },
  { value: "snacks", label: "Snacks / Sweets" },
  { value: "baked", label: "Baked Goods" },
  { value: "pickles", label: "Pickles / Preserves" },
  { value: "other", label: "Other" },
];

export function ApplyForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [cuisine, setCuisine] = useState<CuisineKind | "">("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !phone.trim() || !city.trim() || !cuisine) {
      setError("Please fill all fields");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/vendor/apply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ownerName: name.trim(),
          phone: phone.trim(),
          city: city.trim(),
          pincode: "000000", // collected later in onboarding
          kitchenName: `${name.trim().split(" ")[0]}'s Kitchen`,
          cuisines: [cuisine],
          isVeg: cuisine !== "other",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error ?? "Something went wrong. Try again.");
        return;
      }
      setDone(true);
    } catch {
      setError("Network error. Please retry.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-stone-200">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-bold text-stone-900">Application received</h3>
        <p className="mt-2 text-sm text-stone-600">
          We'll WhatsApp you within 24 hours to walk through onboarding & FSSAI.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white hover:bg-orange-600"
        >
          Back to Homelyx
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-stone-200 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 placeholder-stone-400 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
        />
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="WhatsApp number (10 digits)"
          className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 placeholder-stone-400 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
        />
        <input
          type="text"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City (e.g. Bengaluru)"
          className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 placeholder-stone-400 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
        />
        <select
          required
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value as CuisineKind)}
          className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
        >
          <option value="">What will you sell?</option>
          {CUISINE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {error ? (
        <p className="mt-4 rounded-xl bg-rose-50 px-4 py-2.5 text-sm font-medium text-rose-700 ring-1 ring-rose-200">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition-transform hover:scale-[1.01] hover:bg-orange-600 active:scale-100 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        {submitting ? "Submitting..." : "Submit application"}
        {!submitting && <ArrowRightIcon className="h-4 w-4" />}
      </button>

      <p className="mt-4 text-center text-xs text-stone-500">
        Already a vendor?{" "}
        <Link href="/auth/login" className="font-semibold text-orange-600 hover:text-orange-700">
          Sign in to dashboard
        </Link>
      </p>
    </form>
  );
}
