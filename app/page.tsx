import Link from "next/link";
import { WaveScene } from "@/components/WaveScene";

const highlights = [
  {
    title: "Fluid signals",
    description:
      "Channel state changes into sculpted waveforms that translate motion into meaning.",
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="h-10 w-10 text-zinc-200"
      >
        <path
          d="M32 54c-11.046 0-20-8.954-20-20S20.954 14 32 14c5.01 0 9.59 1.89 13.051 4.99C48.495 22.062 50.405 24.94 51 28c-3.103-2.322-6.927-3.705-11-3.705-9.941 0-18 8.059-18 18 0 4.073 1.383 7.897 3.705 11C22.94 53.095 25.818 51.185 29 50.051 32.101 49.01 35.657 49 38.5 49c-1.08 2.996-2.92 5.558-5.449 7.44C34.57 57.593 33.298 58 32 58"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Monochrome mastery",
    description:
      "Refine dark-mode layouts with tactile highlights and depth-driven luminance.",
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="h-10 w-10 text-zinc-200"
      >
        <path
          d="M12 21.5 32 10l20 11.5V42.5L32 54 12 42.5z"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="m12 21.5 20 11.5 20-11.5M32 33v21"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Wavebound systems",
    description:
      "Build modular interfaces that echo the rhythm of brand motion across surfaces.",
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="h-10 w-10 text-zinc-200"
      >
        <path
          d="M20 20c3.5-6 9.5-9 18-9 9 0 15 7 15 16s-6 16-15 16c-8.5 0-14.5-3-18-9"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 20v24"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const glyphs = [
  {
    label: "Orbit",
    element: (
      <svg viewBox="0 0 72 72" className="h-12 w-12 text-zinc-300">
        <path
          d="M36 60c-13.255 0-24-10.745-24-24S22.745 12 36 12s24 10.745 24 24-10.745 24-24 24Zm0-10c7.732 0 14-6.268 14-14 0-3.262-.092-6-3.5-6C39.054 30 30 39.054 30 46.5c0 3.408 2.738 3.5 6 3.5Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Facet",
    element: (
      <svg viewBox="0 0 72 72" className="h-12 w-12 text-zinc-300">
        <path
          d="M36 12 56 24v24L36 60 16 48V24Z"
          fill="currentColor"
          opacity={0.65}
        />
        <path
          d="M36 12v24l20-12"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Interlink",
    element: (
      <svg viewBox="0 0 72 72" className="h-12 w-12 text-zinc-300">
        <path
          d="M24 48c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12Zm24 0c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12Z"
          stroke="currentColor"
          strokeWidth="6"
        />
        <path
          d="M24 36h24"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Slipstream",
    element: (
      <svg viewBox="0 0 72 72" className="h-12 w-12 text-zinc-300">
        <path
          d="M22 52c4-8 10-10 16-16s10-12 12-20c4 8 2 14-2 20s-8 10-12 16c-4 6-8 12-14 12-2 0-2-6 0-12Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-zinc-950 via-neutral-950 to-black text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.08),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(229,231,235,0.05),_transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(120%_100%_at_top,rgba(255,255,255,0.9),transparent_70%)]">
        <div className="absolute inset-x-0 -top-40 h-[420px] bg-[radial-gradient(120%_80%_at_50%_0%,rgba(156,163,175,0.12),transparent_70%)] blur-3xl" />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute inset-x-0 bottom-0 h-[520px] bg-[linear-gradient(120deg,rgba(156,163,175,0.08),rgba(24,24,27,0)_60%)]" />
        <div className="absolute inset-x-0 top-0 h-full bg-[repeating-linear-gradient(135deg,rgba(63,63,70,0.05)_0px,rgba(63,63,70,0.05)_2px,transparent_2px,transparent_20px)] opacity-60 [mask-image:linear-gradient(180deg,rgba(255,255,255,0.4),transparent_70%)]" />
      </div>

      <section className="relative flex min-h-screen flex-col justify-between overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <WaveScene />
        </div>

        <div className="relative z-10 flex flex-1 flex-col justify-between">
          <div className="grid gap-16 px-8 pb-16 pt-24 sm:px-16 lg:grid-cols-[minmax(320px,1.1fr)_minmax(320px,1.4fr)] lg:px-24">
            <article className="space-y-10">
              <span className="inline-flex items-center rounded-full border border-zinc-700/60 bg-zinc-900/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-zinc-400 shadow-[0_0_30px_rgba(255,255,255,0.08)]">
                Wave-crafted Interfaces
              </span>
              <div className="space-y-6">
                <h1 className="text-balance text-4xl font-semibold leading-tight text-zinc-50 sm:text-5xl lg:text-6xl">
                  Move your product through monochrome oceans of motion.
          </h1>
                <p className="text-pretty text-base text-zinc-400 sm:text-lg">
                  Create wave-driven dashboards that sculpt light and shadow. Three.js
                  choreography weaves with Next.js velocity—no backend, just pure
                  experience.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center rounded-full bg-zinc-100 px-7 py-3 text-sm font-medium tracking-wide text-zinc-900 shadow-[0_20px_50px_rgba(24,24,27,0.35)] transition hover:bg-zinc-200 hover:shadow-[0_22px_60px_rgba(24,24,27,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
                >
                  Launch Live Demo
                </Link>
                <Link
                  href="/ui-kit"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-700/80 px-7 py-3 text-sm font-medium tracking-wide text-zinc-200 transition hover:border-zinc-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
                >
                  View UI Kit
                </Link>
                <Link
                  href="/command"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-700/80 px-7 py-3 text-sm font-medium tracking-wide text-zinc-200 transition hover:border-zinc-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
                >
                  Visit Command Room
                </Link>
              </div>
            </article>

            <div className="grid gap-8 rounded-[36px] border border-zinc-800/70 bg-zinc-950/55 p-8 backdrop-blur-lg md:grid-cols-3 md:gap-6 lg:grid-cols-2">
              {highlights.map((highlight) => (
                <article
                  key={highlight.title}
                  className="flex flex-col gap-3 rounded-3xl border border-zinc-800/60 bg-zinc-900/50 p-6 shadow-[0_40px_120px_rgba(24,24,27,0.35)] backdrop-blur"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800/70 bg-zinc-950/60">
                      {highlight.icon}
                    </div>
                    <h2 className="text-base font-medium text-zinc-100">
                      {highlight.title}
                    </h2>
                  </div>
                  <p className="text-sm text-zinc-400">{highlight.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative z-10 px-8 pb-20 sm:px-16 lg:px-24">
            <section className="w-full rounded-[42px] border border-zinc-800/60 bg-zinc-950/60 p-10 backdrop-blur">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {glyphs.map((glyph) => (
                  <div key={glyph.label} className="space-y-4 text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-zinc-800/70 bg-zinc-900/70">
                      {glyph.element}
                    </div>
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                      {glyph.label}
          </p>
        </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
      </main>
  );
}
