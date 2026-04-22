import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900">
      {/* Animated gradient background - placeholder for Veo 3 video */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-stone-900/60 to-orange-800/20" />
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 35%, rgba(255, 140, 66, 0.15) 0%, transparent 45%),
            radial-gradient(circle at 75% 65%, rgba(232, 93, 4, 0.1) 0%, transparent 40%)
          `,
          backgroundSize: "100% 100%"
        }} />
      </div>

      {/* Gradient overlays for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-900/95 via-stone-900/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-4 py-20 lg:px-6">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-1.5 text-sm font-medium text-orange-300 backdrop-blur-sm">
            <span>🏠</span>
            <span>2,400+ home chefs across India</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl font-extrabold leading-[1.05] text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
            Fresh Homemade Food,
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
              On Your Schedule
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-300 sm:text-xl">
            Order authentic home-cooked meals from neighbourhood vendors. No preservatives, no delivery delay — just real food, fresh when you need it.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:scale-105 hover:bg-orange-600 hover:shadow-xl"
            >
              Browse Food
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/sell"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              Sell with us
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-14 flex flex-wrap items-center gap-8 text-sm text-stone-400">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20">
                <span className="text-orange-400">⭐</span>
              </div>
              <div>
                <span className="font-semibold text-white">4.8/5</span>
                <span className="ml-1">avg rating</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20">
                <span className="text-orange-400">🚚</span>
              </div>
              <div>
                <span className="font-semibold text-white">Free</span>
                <span className="ml-1">delivery above ₹499</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20">
                <span className="text-orange-400">🌿</span>
              </div>
              <span>Zero preservatives</span>
            </div>
          </div>
        </div>

        {/* Floating food cards - decorative */}
        <div className="absolute right-10 top-1/2 hidden -translate-y-1/2 lg:block">
          <div className="relative w-80">
            {/* Card 1 */}
            <div className="absolute -top-8 right-0 w-64 rotate-3 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md p-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/30 text-2xl">
                  🍛
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    Dal Makhani
                  </p>
                  <p className="text-xs text-stone-400">Meera's Kitchen</p>
                </div>
                <span className="ml-auto shrink-0 text-sm font-bold text-orange-400">
                  ₹180
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="absolute top-16 right-8 w-64 -rotate-2 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md p-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/30 text-2xl">
                  🥐
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    Sourdough Loaf
                  </p>
                  <p className="text-xs text-stone-400">The Bake Shack</p>
                </div>
                <span className="ml-auto shrink-0 text-sm font-bold text-orange-400">
                  ₹189
                </span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="absolute top-36 right-0 w-64 rotate-1 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md p-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/30 text-2xl">
                  🥗
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    Mediterranean Bowl
                  </p>
                  <p className="text-xs text-stone-400">Green Bites Co.</p>
                </div>
                <span className="ml-auto shrink-0 text-sm font-bold text-orange-400">
                  ₹199
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}