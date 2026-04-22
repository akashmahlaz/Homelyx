"use client";

import {
    ArrowLeftIcon,
    CheckBadgeIcon,
    LockClosedIcon,
    PhoneIcon,
    TruckIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const dynamic = "force-dynamic";

const PROOF = [
  { Icon: CheckBadgeIcon, label: "FSSAI verified kitchens" },
  { Icon: TruckIcon, label: "Same-day fresh delivery" },
  { Icon: StarIcon, label: "4.8 rated by 12,000+ customers" },
];

const AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
];

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const startTimer = () => setTimer(30);

  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const r = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error ?? "Failed to send OTP");
      setStep("otp");
      startTimer();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const r = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code: otpValue }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error ?? "Invalid OTP");
      window.location.href = "/";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid OTP");
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const r = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      if (!r.ok) {
        const data = await r.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to resend OTP");
      }
      startTimer();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (idx: number, value: string) => {
    const v = value.replace(/\D/g, "").slice(0, 1);
    const next = [...otp];
    next[idx] = v;
    setOtp(next);
    if (v && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpKey = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const otpValue = otp.join("");

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">
        {/* Left: Form */}
        <div className="flex flex-col px-6 py-8 sm:px-10 lg:px-14 lg:py-12">
          {/* Brand */}
          <Link href="/" className="inline-flex items-center gap-2.5 self-start">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/30">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 2 2 11h3v10h6v-6h2v6h6V11h3z" />
              </svg>
            </span>
            <span className="text-lg font-extrabold tracking-tight text-stone-900">
              Homelyx
            </span>
          </Link>

          <div className="flex flex-1 flex-col justify-center py-12">
            <div className="mx-auto w-full max-w-md">
              {step === "phone" ? (
                <>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500">
                    Welcome back
                  </p>
                  <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
                    Sign in to Homelyx
                  </h1>
                  <p className="mt-2 text-sm text-stone-500">
                    Enter your mobile number - we'll send you a 6-digit OTP via SMS.
                  </p>

                  <form onSubmit={handleSendOtp} className="mt-8 space-y-4">
                    <label className="block">
                      <span className="text-xs font-semibold text-stone-700">
                        Mobile number
                      </span>
                      <div className="mt-1.5 flex overflow-hidden rounded-xl border border-stone-200 bg-white transition focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100">
                        <span className="flex shrink-0 items-center gap-1 border-r border-stone-200 bg-stone-50 px-3.5 text-sm font-medium text-stone-600">
                          <PhoneIcon className="h-4 w-4 text-stone-400" />
                          +91
                        </span>
                        <input
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel"
                          value={phone}
                          onChange={(e) =>
                            setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                          }
                          placeholder="98765 43210"
                          className="flex-1 bg-white px-4 py-3.5 text-base text-stone-900 placeholder-stone-400 outline-none"
                          required
                        />
                      </div>
                    </label>

                    {error && (
                      <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-red-200">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={phone.length !== 10 || isLoading}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Sending OTP...
                        </>
                      ) : (
                        "Send OTP"
                      )}
                    </button>
                  </form>

                  {/* Divider */}
                  <div className="mt-8 flex items-center gap-4">
                    <div className="flex-1 border-t border-stone-200" />
                    <span className="text-xs uppercase tracking-wider text-stone-400">
                      Or continue with
                    </span>
                    <div className="flex-1 border-t border-stone-200" />
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white py-3 text-sm font-medium text-stone-700 transition hover:border-stone-300 hover:bg-stone-50">
                      <svg viewBox="0 0 24 24" className="h-5 w-5">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Google
                    </button>
                    <button className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white py-3 text-sm font-medium text-stone-700 transition hover:border-stone-300 hover:bg-stone-50">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                      </svg>
                      Apple
                    </button>
                  </div>

                  <p className="mt-8 text-xs text-stone-500">
                    New to Homelyx?{" "}
                    <span className="font-semibold text-stone-700">
                      We'll create your account automatically.
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setStep("phone");
                      setOtp(Array(6).fill(""));
                    }}
                    className="inline-flex items-center gap-1 text-xs font-medium text-stone-500 hover:text-orange-600"
                  >
                    <ArrowLeftIcon className="h-3.5 w-3.5" />
                    Change phone number
                  </button>

                  <div className="mt-6 flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                      <LockClosedIcon className="h-6 w-6" />
                    </span>
                    <div>
                      <h1 className="text-2xl font-extrabold tracking-tight text-stone-900">
                        Verify OTP
                      </h1>
                      <p className="text-xs text-stone-500">
                        Sent to +91 {phone.slice(0, 5)} ••••{phone.slice(-2)}
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleVerifyOtp} className="mt-8 space-y-5">
                    <div className="flex justify-between gap-2">
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          ref={(el) => {
                            otpRefs.current[i] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleOtpKey(i, e)}
                          className="h-14 w-12 rounded-xl border border-stone-200 bg-white text-center text-xl font-bold text-stone-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                          required
                        />
                      ))}
                    </div>

                    {error && (
                      <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-red-200">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={otpValue.length !== 6 || isLoading}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify & sign in"
                      )}
                    </button>

                    <div className="text-center text-sm">
                      {timer > 0 ? (
                        <p className="text-stone-400">
                          Resend OTP in <span className="font-semibold text-stone-600">{timer}s</span>
                        </p>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          disabled={isLoading}
                          className="font-semibold text-orange-600 hover:text-orange-700"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>

          <p className="mt-auto text-center text-xs text-stone-400">
            By continuing, you agree to our{" "}
            <a href="#" className="underline hover:text-stone-600">Terms</a>{" "}
            &{" "}
            <a href="#" className="underline hover:text-stone-600">Privacy Policy</a>
          </p>
        </div>

        {/* Right: Hero image with proof */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-orange-100 via-amber-50 to-rose-50 lg:block">
          <Image
            src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1200&q=80"
            alt="Fresh homemade thali"
            fill
            sizes="50vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-900/30 via-transparent to-transparent" />

          {/* Floating quote card */}
          <div className="absolute left-10 top-12 max-w-xs rounded-2xl bg-white/95 p-5 shadow-xl ring-1 ring-stone-200 backdrop-blur-md">
            <div className="flex items-center gap-1 text-amber-500">
              {[0, 1, 2, 3, 4].map((i) => (
                <StarIcon key={i} className="h-3.5 w-3.5" />
              ))}
            </div>
            <p className="mt-2 text-sm font-bold leading-snug text-stone-900">
              "Tastes exactly like Mom's"
            </p>
            <p className="mt-1 text-xs text-stone-500">
              — Aarav · Verified order in Bengaluru
            </p>
          </div>

          {/* Bottom proof block */}
          <div className="absolute inset-x-8 bottom-8 rounded-3xl bg-white/95 p-6 shadow-2xl ring-1 ring-stone-200 backdrop-blur-md">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex -space-x-2">
                {AVATARS.map((src, i) => (
                  <div
                    key={i}
                    className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-white"
                  >
                    <Image src={src} alt="customer" fill sizes="36px" className="object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-bold text-stone-900">12,000+ customers</p>
                <p className="text-xs text-stone-500">across 24 cities in India</p>
              </div>
            </div>

            <ul className="grid gap-2.5">
              {PROOF.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5 text-sm text-stone-700">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
