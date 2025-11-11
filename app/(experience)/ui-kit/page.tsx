import Link from "next/link";
import { ThreeScene } from "@/components/ThreeScene";

export const metadata = {
  title: "Lumen UI — UI Kit",
  description:
    "Browse reusable components and motion presets that mirror the Lumen UI hero experience.",
};

const tokens = [
  {
    label: "Light Glyphs",
    value: "Procedural knots, facets, and wavelets rendered in neutral chrome.",
  },
  {
    label: "Lumin Pulse",
    value: "Ambient sweep 0.6s, intensity 1.4, bloom falloff 35%.",
  },
  {
    label: "Layer Stack",
    value: "Glass shell › Noise veil › Particle mesh › Motion core.",
  },
  {
    label: "Typeface",
    value: "Geist Variable · Tracking +0.08em for captions.",
  },
];

const galleryItems = [
  {
    title: "Helix Bloom",
    caption: "Dual-loop lattice with counterphase shimmer.",
    position: "left-[8%] top-[18%]",
  },
  {
    title: "Prism Fold",
    caption: "Segmented shard rotates on micro easing curves.",
    position: "left-[34%] bottom-[20%]",
  },
  {
    title: "Flux Ribbon",
    caption: "Single sweep ribbon that refracts ambient velocity.",
    position: "right-[18%] top-[24%]",
  },
];

export default function UIKitPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-zinc-950 to-zinc-900 text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(229,231,235,0.12),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(161,161,170,0.1),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(180deg,rgba(255,255,255,0.45),transparent_80%)]">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(82,82,91,0.05)_0px,rgba(82,82,91,0.05)_1px,transparent_1px,transparent_28px)]" />
      </div>

      <section className="relative flex min-h-screen flex-col lg:flex-row">
        <div className="relative flex flex-1 flex-col justify-between px-8 pb-20 pt-28 sm:px-16 lg:px-24">
          <div className="space-y-10">
            <span className="inline-flex items-center rounded-full border border-zinc-700/60 bg-zinc-900/60 px-4 py-2 text-xs uppercase tracking-[0.35em] text-zinc-400 shadow-[0_0_30px_rgba(161,161,170,0.2)]">
              MonoLight Gallery
            </span>
            <div className="space-y-6 max-w-2xl">
              <h1 className="text-balance text-4xl font-semibold leading-tight text-zinc-50 sm:text-5xl lg:text-6xl">
                Curate luminous forms with reusable, production-ready presets.
              </h1>
              <p className="text-pretty text-base text-zinc-400 sm:text-lg">
                Each asset blends volumetric lighting with glass morphism surfaces.
                Assemble hero visuals, animation cues, and layouts using refined,
                monochrome-first components.
              </p>
            </div>
          </div>

          <div className="grid gap-4 rounded-[32px] border border-zinc-800/70 bg-zinc-950/60 p-10 backdrop-blur">
            {tokens.map((token) => (
              <div key={token.label} className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-[0.3em] text-zinc-400">
                  {token.label}
                </span>
                <span className="text-sm text-zinc-100">{token.value}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center rounded-full border border-zinc-500/60 px-7 py-3 text-sm font-medium tracking-wide text-zinc-200 transition hover:border-zinc-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-300"
            >
              View Live Demo
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-zinc-200 via-zinc-100 to-white px-7 py-3 text-sm font-medium tracking-wide text-zinc-900 shadow-[0_18px_55px_rgba(161,161,170,0.35)] transition hover:from-white hover:via-zinc-200 hover:to-zinc-100 hover:shadow-[0_24px_70px_rgba(161,161,170,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-200"
            >
              Back to Landing
            </Link>
          </div>
        </div>

        <div className="relative flex flex-1 items-center justify-center overflow-hidden px-6 pb-24 pt-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_center,rgba(229,231,235,0.2),transparent_75%)] blur-2xl" />
          </div>
          <div className="relative flex w-full max-w-[920px] items-center justify-center">
            <div className="absolute inset-[6%] rounded-[56px] border border-zinc-600/40 bg-gradient-to-br from-white/15 via-white/5 to-transparent backdrop-blur-xl" />
            <div className="absolute inset-[9%] rounded-[48px] border border-zinc-700/40 bg-zinc-950/70 backdrop-blur-xl" />
            <ThreeScene
              variant="onyx"
              className="h-[660px] w-full"
              glowClassName="from-slate-100/40 via-zinc-400/20 to-black/50"
            />

            {galleryItems.map((item) => (
              <div
                key={item.title}
                className={`absolute ${item.position} w-52 rounded-3xl border border-zinc-700/50 bg-zinc-950/80 p-5 shadow-[0_30px_80px_rgba(161,161,170,0.35)] backdrop-blur`}
              >
                <div className="text-xs uppercase tracking-[0.3em] text-zinc-400">
                  {item.title}
                </div>
                <p className="mt-2 text-xs text-zinc-300">{item.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

