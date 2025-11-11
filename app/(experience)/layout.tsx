import Link from "next/link";

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <header className="relative flex w-full items-center justify-between px-8 py-8 sm:px-16">
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-slate-800/60 bg-slate-900/60 px-4 py-2 text-xs uppercase tracking-[0.4em] text-slate-200 transition hover:border-slate-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
        >
          Lumen UI
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 sm:flex">
          <Link
            href="/command"
            className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
          >
            Command Room
          </Link>
          <Link
            href="/demo"
            className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
          >
            Live Demo
          </Link>
          <Link
            href="/ui-kit"
            className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
          >
            UI Kit
          </Link>
        </nav>
      </header>
      <main className="relative flex min-h-[calc(100vh-6rem)] w-full flex-col">
        {children}
      </main>
    </div>
  );
}

