import Link from "next/link";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      prefetch
      className="group flex shrink-0 items-center gap-2.5"
      aria-label="Homelyx — Home"
    >
      {/* Mark */}
      <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-500 to-amber-500 shadow-sm ring-1 ring-orange-600/20 transition-transform group-hover:scale-105">
        {/* Subtle inner highlight */}
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="relative h-5 w-5 fill-white"
          aria-hidden
        >
          {/* Stylised house + roof — clean wordmark */}
          <path d="M16 4 4 14h3v14h7v-8h4v8h7V14h3L16 4z" />
        </svg>
      </span>

      {/* Wordmark */}
      <span
        className={`hidden flex-col leading-none ${compact ? "" : "sm:flex"}`}
      >
        <span className="text-[17px] font-extrabold tracking-tight text-stone-900">
          Homelyx
        </span>
        <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-orange-500">
          home kitchens
        </span>
      </span>
    </Link>
  );
}
