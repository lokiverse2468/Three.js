import Link from "next/link";
import { CommandScene } from "@/components/CommandScene";

export const metadata = {
  title: "Lumen UI — Command Room",
  description:
    "Coordinate data-rich experiences with a command center built in pure client-side Three.js.",
};

const statusTimeline = [
  {
    title: "Signal Sync",
    description: "High-frequency events aligned to 16ms cadence.",
    accent: "from-cyan-400 to-sky-400",
  },
  {
    title: "Engage Flow",
    description: "In-scene scripts deployed across five surfaces.",
    accent: "from-emerald-400 to-lime-300",
  },
  {
    title: "Pulse Archive",
    description: "Waveform fingerprints stored for retrospection.",
    accent: "from-indigo-400 to-violet-400",
  },
  {
    title: "Telemetry Sweep",
    description: "Datastream normalized and visualized in orbit view.",
    accent: "from-rose-400 to-orange-400",
  },
];

export default function CommandPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-black to-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(129,140,248,0.16),transparent_75%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(180deg,rgba(255,255,255,0.5),transparent_85%)]">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(56,189,248,0.08)_0px,rgba(56,189,248,0.08)_1px,transparent_1px,transparent_26px)]" />
      </div>

      <section className="relative flex min-h-screen flex-col gap-20 px-8 pb-24 pt-28 sm:px-16 lg:px-24">
        <header className="relative z-10 max-w-3xl space-y-6">
          <span className="inline-flex items-center rounded-full border border-slate-500/60 bg-slate-900/70 px-5 py-2 text-xs uppercase tracking-[0.38em] text-slate-200 shadow-[0_0_40px_rgba(56,189,248,0.25)]">
            Data Wave Command Room
          </span>
          <h1 className="text-balance text-5xl font-semibold leading-tight text-white lg:text-6xl">
            See every waveform, script every motion, broadcast everywhere.
          </h1>
          <p className="max-w-2xl text-lg text-slate-300">
            The command room transforms raw telemetry into stage-ready visuals.
            Monitor wave timelines, preview in-room choreography, then deploy
            sequences across your product surfaces with one click.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-cyan-300/60 px-7 py-3 text-sm font-medium tracking-wide text-cyan-100 transition hover:border-cyan-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
            >
              Back to Landing
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-400 px-7 py-3 text-sm font-medium tracking-wide text-slate-900 shadow-[0_22px_60px_rgba(56,189,248,0.35)] transition hover:from-cyan-300 hover:via-sky-300 hover:to-blue-300 hover:shadow-[0_28px_70px_rgba(56,189,248,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
            >
              Enter Live Demo
            </Link>
          </div>
        </header>

        <div className="relative z-10 grid gap-20 lg:grid-cols-[minmax(320px,1.2fr)_minmax(320px,1fr)]">
          <div className="space-y-10">
            <div className="rounded-[56px] border border-cyan-400/20 bg-slate-950/70 p-8 shadow-[0_50px_140px_rgba(56,189,248,0.35)] backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-cyan-400/10 pb-4 text-xs uppercase tracking-[0.3em] text-slate-400">
                <span>Signal Array</span>
                <span>Realtime Visual</span>
              </div>
              <div className="mt-6">
                <CommandScene />
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-cyan-400/10 bg-slate-900/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">
                    Current Load
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">86%</p>
                  <p className="text-xs text-slate-400">Waveforms in sync</p>
                </div>
                <div className="rounded-2xl border border-cyan-400/10 bg-slate-900/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">
                    Active Scripts
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">12</p>
                  <p className="text-xs text-slate-400">Running concurrently</p>
                </div>
                <div className="rounded-2xl border border-cyan-400/10 bg-slate-900/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">
                    Latency
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">14ms</p>
                  <p className="text-xs text-slate-400">Edge-to-stage travel</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="flex flex-col justify-between gap-10">
            <div className="rounded-[40px] border border-slate-700/40 bg-slate-950/70 p-8 backdrop-blur-xl">
              <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Command Timeline
              </div>
              <div className="mt-6 space-y-6">
                {statusTimeline.map((item) => (
                  <div
                    key={item.title}
                    className="group relative rounded-3xl border border-slate-700/40 bg-slate-900/60 p-5"
                  >
                    <div
                      className={`absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r ${item.accent} opacity-0 transition group-hover:opacity-100`}
                    />
                    <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      {item.title}
                    </div>
                    <p className="mt-2 text-sm text-slate-200">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-700/40 bg-slate-950/70 p-8 backdrop-blur-xl">
              <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Broadcast Outputs
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {["Dashboard", "Mobile HUD", "Spatial Canvas", "Wearable"].map(
                  (channel) => (
                    <div
                      key={channel}
                      className="rounded-2xl border border-slate-700/40 bg-slate-900/60 p-4 text-sm text-slate-200"
                    >
                      {channel}
                    </div>
                  )
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

