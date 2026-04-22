"use client";

import { useState } from "react";
import Link from "next/link";
import { PhoneIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";

// Simple translations object for now
const translations = {
  loginTitle: "Welcome to Homelyx",
  loginSubtitle: "Enter your mobile number to continue",
  phonePlaceholder: "Enter mobile number",
  sendOtp: "Send OTP",
  otpSent: "OTP sent to +91 {phone}",
  verifyOtp: "Verify OTP",
  resendOtp: "Resend OTP",
  resendIn: "Resend in {seconds}s",
  continueWith: "Or continue with",
  termsAgree: "By continuing, you agree to our Terms & Privacy Policy",
};

export const dynamic = "force-dynamic";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  const t = (key: string, params?: Record<string, string | number>) => {
    let text = translations[key as keyof typeof translations] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setOtpSent(true);
    setStep("otp");
    setTimer(30);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    window.location.href = "/";
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setTimer(30);
    setTimer((prev) => {
      const interval = setInterval(() => {
        setTimer((innerPrev) => {
          if (innerPrev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return innerPrev - 1;
        });
      }, 1000);
      return 30;
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 20% 30%, #FF8C42 1px, transparent 1px), radial-gradient(circle at 80% 70%, #E85D04 1px, transparent 1px)`,
        backgroundSize: "40px 40px"
      }} />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg">
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <span className="text-2xl font-bold text-stone-800">Homelyx</span>
        </Link>

        {/* Card */}
        <div className="rounded-3xl border border-orange-100 bg-white px-8 py-10 shadow-xl">
          {step === "phone" ? (
            <>
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
                  <PhoneIcon className="h-7 w-7 text-orange-500" />
                </div>
                <h1 className="text-2xl font-bold text-stone-900">{t("loginTitle")}</h1>
                <p className="mt-2 text-sm text-stone-500">{t("loginSubtitle")}</p>
              </div>

              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex w-20 items-center justify-center rounded-xl border border-stone-200 bg-stone-50 text-sm font-medium text-stone-600">
                    +91 ▼
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder={t("phonePlaceholder")}
                    className="flex-1 rounded-xl border border-stone-200 px-4 py-3.5 text-base outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={phone.length !== 10 || isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 text-base font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    t("sendOtp")
                  )}
                </button>
              </form>

              {/* OAuth divider */}
              <div className="mt-6 flex items-center gap-4">
                <div className="flex-1 border-t border-stone-200" />
                <span className="text-xs text-stone-400">{t("continueWith")}</span>
                <div className="flex-1 border-t border-stone-200" />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white py-3 text-sm font-medium text-stone-600 transition hover:bg-stone-50">
                  <svg viewBox="0 0 24 24" className="h-5 w-5">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white py-3 text-sm font-medium text-stone-600 transition hover:bg-stone-50">
                  <svg viewBox="0 0 24 24" className="h-5 w-5">
                    <path fill="#000" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .8-3.32.82-1.31-.02-2.32-1.28-3.12-2.53-1.91-2.99-3.85-5.89-3.83-11.63.02-5.73 4.91-8.7 9.54-8.7 4.21 0 6.97 2.84 7.09 7.07.02 4.71-2.83 7.45-5.83 7.45-1.4 0-2.42-.56-3.23-1.74-.52-.75-.97-1.93-1.33-3.22h2.13c.47 1.65 1.52 3.06 3.02 2.95 1.76-.08 2.52-1.16 3.04-2.58.82-2.16.72-3.93.45-4.31-.27-.38-1.01-.58-2.03-.4-1.15.2-2.27.72-3.08 1.53-1.71 1.72-1.85 4.18-1.82 5.77-.02 1.84 1.27 3.13 2.61 3.65 1.33.52 2.86.4 4.01-.25 1.17-.65 2.12-1.91 2.25-3.73.14-1.88-.38-3.67-1.32-5.04-.86-1.25-1.3-2.11-.82-2.79.37-.54 1.35-.62 2.27-.23.88.36 1.64 1.03 2.28 1.66 1.17 1.12 2.01 2.56 2.28 4.06.27 1.49.04 3.09-.5 4.51z"/>
                  </svg>
                  Apple
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
                  <LockClosedIcon className="h-7 w-7 text-orange-500" />
                </div>
                <h1 className="text-2xl font-bold text-stone-900">Verify OTP</h1>
                <p className="mt-2 text-sm text-stone-500">
                  {t("otpSent", { phone: `${phone.slice(0, 5)}****${phone.slice(-2)}` })}
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="flex justify-center gap-2">
                  {[...Array(6)].map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      value={otp[i] || ""}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        if (val.length <= 1) {
                          const newOtp = otp.split("");
                          newOtp[i] = val;
                          setOtp(newOtp.join(""));
                          if (val && i < 5) {
                            const inputs = document.querySelectorAll('input[maxLength="1"]');
                            (inputs[i + 1] as HTMLInputElement)?.focus();
                          }
                        }
                      }}
                      className="h-12 w-12 rounded-xl border border-stone-200 text-center text-xl font-bold outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                      required
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={otp.length !== 6 || isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 text-base font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    t("verifyOtp")
                  )}
                </button>

                <div className="text-center">
                  {timer > 0 ? (
                    <p className="text-sm text-stone-400">
                      {t("resendIn", { seconds: timer })}
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isLoading}
                      className="text-sm font-medium text-orange-500 hover:text-orange-600"
                    >
                      {t("resendOtp")}
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setStep("phone");
                    setOtp("");
                    setOtpSent(false);
                  }}
                  className="w-full py-2 text-center text-sm text-stone-400 hover:text-stone-600"
                >
                  ← Change phone number
                </button>
              </form>
            </>
          )}
        </div>

        {/* Terms */}
        <p className="mt-6 text-center text-xs text-stone-400">
          {t("termsAgree")}
        </p>
      </div>
    </div>
  );
}