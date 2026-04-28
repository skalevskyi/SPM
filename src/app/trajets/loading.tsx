export default function TrajetsLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
      <div className="h-6 w-32 animate-pulse rounded bg-slate-200/80 dark:bg-slate-700/70" />

      <header className="mt-5 space-y-4">
        <div className="h-6 w-36 animate-pulse rounded-full border border-sky-200/70 bg-sky-50/60 dark:border-sky-500/30 dark:bg-sky-950/30" />
        <div className="h-10 w-3/5 animate-pulse rounded-lg bg-slate-200/80 dark:bg-slate-700/70" />
        <div className="h-5 w-4/5 animate-pulse rounded bg-slate-200/70 dark:bg-slate-700/60" />
      </header>

      <section className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={`summary-skeleton-${index}`}
            className="min-h-[7rem] rounded-xl border border-slate-200 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-800/60"
          >
            <div className="h-3 w-2/3 animate-pulse rounded bg-slate-200/80 dark:bg-slate-700/70" />
            <div className="mt-3 h-6 w-3/4 animate-pulse rounded bg-slate-200/80 dark:bg-slate-700/70" />
          </div>
        ))}
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr] lg:items-start">
        <aside className="order-1 rounded-xl border border-slate-200/80 bg-white/80 p-4 dark:border-slate-700/80 dark:bg-slate-800/50 lg:order-2">
          <div className="h-4 w-40 animate-pulse rounded bg-slate-200/80 dark:bg-slate-700/70" />
          <div className="mt-4 space-y-2">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={`day-skeleton-${index}`}
                className="h-12 animate-pulse rounded-xl border border-slate-200/80 bg-white dark:border-slate-700/80 dark:bg-slate-800/40"
              />
            ))}
          </div>
        </aside>

        <div className="order-2 space-y-6 lg:order-1">
          <article className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-700 dark:bg-slate-800/60">
            <div className="h-5 w-4/5 animate-pulse rounded bg-slate-200/80 dark:bg-slate-700/70" />
            <div className="mt-5 h-72 animate-pulse rounded-xl border border-slate-200 bg-white/80 dark:border-slate-700 dark:bg-slate-900/40 md:h-[18.25rem]" />
          </article>

          <article className="rounded-xl border border-slate-200 bg-white/80 p-5 dark:border-slate-700 dark:bg-slate-800/60">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={`detail-col-skeleton-${index}`} className="space-y-2">
                  <div className="h-3 w-2/3 animate-pulse rounded bg-slate-200/80 dark:bg-slate-700/70" />
                  <div className="h-4 w-full animate-pulse rounded bg-slate-200/80 dark:bg-slate-700/70" />
                  <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200/80 dark:bg-slate-700/70" />
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800/50">
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200/80 dark:bg-slate-700/70" />
      </section>
    </div>
  );
}
