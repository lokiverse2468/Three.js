import Link from "next/link";
import { SoundWaveScene } from "@/components/SoundWaveScene";

export const metadata = {
  title: "Lumen UI — Live Demo",
  description:
    "Explore a live interaction flow crafted with Next.js, Tailwind, and Three.js energy visuals.",
};

const waveModules = [
  {
    title: "Telemetry",
    description: "Live capture of user intent, converted into motion cues.",
    position: "top-10 left-[10%]",
  },
  {
    title: "Flow Scripts",
    description: "Trigger sequences that choreograph the 3D scene.",
    position: "bottom-16 right-[12%]",
  },
  {
    title: "Signal Uplinks",
    description: "Route events to parallel UI canvases in real time.",
    position: "top-1/2 right-[35%]",
  },
];

export default function DemoPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-950 to-black text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(148,163,184,0.18),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(100,116,139,0.12),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(120deg,rgba(255,255,255,0.35),transparent_70%)]">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(100,116,139,0.05)_0px,rgba(100,116,139,0.05)_1px,transparent_1px,transparent_32px)]" />
      </div>

      <section className="relative flex min-h-screen flex-col gap-16 lg:flex-row">
        <div className="relative z-10 flex flex-1 flex-col justify-between px-8 pb-24 pt-28 sm:px-14 lg:px-20">
          <div className="space-y-10">
            <span className="inline-flex items-center rounded-full border border-slate-700/60 bg-slate-900/70 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-300 shadow-[0_0_30px_rgba(148,163,184,0.25)]">
              Orbital Control Center
            </span>
            <div className="space-y-6 max-w-2xl">
              <h1 className="text-balance text-5xl font-semibold leading-tight text-slate-100 lg:text-6xl">
                Conduct multi-surface experiences from a single orbit.
              </h1>
              <p className="text-lg text-slate-300">
                The live demo routes realtime signals into responsive choreography.
                Pilot transitions, command waveforms, and benchmark feel before code
                ever hits production.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-800/60 bg-slate-950/60 p-6 backdrop-blur">
                <div className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
                  Command Mesh
                </div>
                <p className="mt-3 text-sm text-slate-300">
                  Joystick the orbit, then log the resulting motion as reusable
                  presets ready for integration.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-800/60 bg-slate-950/60 p-6 backdrop-blur">
                <div className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
                  Phase Locks
                </div>
                <p className="mt-3 text-sm text-slate-300">
                  Snap components into synchronized transitions to build cohesive
                  multi-screen stories.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-slate-500/60 px-7 py-3 text-sm font-medium tracking-wide text-slate-200 transition hover:border-slate-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
            >
              Back to Landing
            </Link>
            <Link
              href="/ui-kit"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-zinc-100 via-slate-200 to-zinc-100 px-7 py-3 text-sm font-medium tracking-wide text-slate-900 shadow-[0_20px_55px_rgba(148,163,184,0.35)] transition hover:from-white hover:to-slate-100 hover:shadow-[0_28px_70px_rgba(148,163,184,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200"
            >
              Jump to Design Assets
            </Link>
          </div>
        </div>

        <div className="relative flex flex-1 items-center justify-center overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_center,rgba(148,163,184,0.25),transparent_70%)] blur-2xl" />
          </div>
          <div className="relative flex w-full max-w-[900px] items-center justify-center px-8 py-24">
            <div className="absolute inset-[4%] rounded-[48px] border border-slate-700/40 bg-gradient-to-br from-white/15 via-white/5 to-transparent backdrop-blur-xl" />
            <div className="absolute inset-[8%] rounded-[44px] border border-slate-700/30 bg-slate-950/70 backdrop-blur-xl" />
            <SoundWaveScene />

            {waveModules.map((module) => (
              <div
                key={module.title}
                className={`absolute ${module.position} w-48 rounded-2xl border border-slate-700/40 bg-slate-950/80 p-4 shadow-[0_24px_70px_rgba(100,116,139,0.35)] backdrop-blur`}
              >
                <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  {module.title}
                </div>
                <p className="mt-2 text-xs text-slate-300">{module.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

