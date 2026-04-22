import { useTranslations } from "next-intl";
import Link from "next/link";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative isolate overflow-hidden bg-stone-950">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-90"
        aria-hidden
      >
        <source
          src="/videos-of-sections/Hero_section_Food_Animation.mp4"
          type="video/mp4"
        />
      </video>

      {/* Layered overlays for legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/55 to-stone-950/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-stone-950/30" />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(255,140,66,0.4) 0%, transparent 50%), radial-gradient(circle at 75% 70%, rgba(232,93,4,0.3) 0%, transparent 45%)",
        }}
      />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-center px-4 py-20 lg:px-6 lg:py-28">
        <div className="max-w-2xl">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-300/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-200 backdrop-blur-md">
            <span>ðŸ </span>
            <span>2,400+ home chefs across India</span>
          </span>

          <h1 className="text-4xl font-extrabold leading-[1.05] text-white drop-shadow-lg sm:text-5xl lg:text-6xl xl:text-7xl">
            {t("title")
              .split(",")
              .map((part, i, arr) => (
                <span key={i}>
                  {i === arr.length - 1 ? (
                    <span className="bg-gradient-to-r from-orange-300 to-amber-200 bg-clip-text text-transparent">
                      {part.trim()}
                    </span>
                  ) : (
                    <>
                      {part.trim()}
                      {i < arr.length - 1 && ","}
                      <br />
                    </>
                  )}
                </span>
              ))}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-200 sm:text-lg">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/40 transition-all hover:scale-[1.03] hover:bg-orange-600"
            >
              {t("ctaPrimary")}
              <span aria-hidden>â†’</span>
            </Link>
            <Link
              href="/sell"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              {t("ctaSecondary")}
            </Link>
          </div>

          {/* Trust strip */}
          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-white/85">
            <div className="flex items-center gap-2">
              <span className="text-base">â­</span>
              <span>
                <span className="font-bold text-white">4.8</span> avg rating
              </span>
            </div>
            <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:inline" />
            <div className="flex items-center gap-2">
              <span className="text-base">ðŸšš</span>
              <span>
                <span className="font-bold text-white">Free</span> delivery
                above â‚¹499
              </span>
            </div>
            <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:inline" />
            <div className="flex items-center gap-2">
              <span className="text-base">ðŸŒ¿</span>
              <span>Zero preservatives</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-white/30 pt-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-white/70" />
        </div>
      </div>
    </section>
  );
}
