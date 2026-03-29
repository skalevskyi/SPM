'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Car, MapPin, MousePointerClick, Repeat, Route, Sun } from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/** Aller: Montpellier → Port Marianne → Pérols → Carnon → La Grande-Motte */
const ROUTE_ALLER = [
  'montpellier',
  'portMarianne',
  'perols',
  'carnon',
  'grandeMotte',
] as const;

/** Retour: La Grande-Motte → Carnon → Palavas → Port Marianne → Montpellier */
const ROUTE_RETOUR = [
  'grandeMotte',
  'carnon',
  'palavas',
  'portMarianne',
  'montpellier',
] as const;

type RouteDirection = 'aller' | 'retour';

function getRouteIds(direction: RouteDirection): readonly string[] {
  return direction === 'aller' ? ROUTE_ALLER : ROUTE_RETOUR;
}

const ROUTE_AUTOPLAY_MS = 5000;
const PAUSE_AFTER_CLICK_MS = 5500;

/** Parses "PACKAGE (placement) — metrics" into parts for metric row + legend. */
function parseVisibilityRow(
  raw: string,
): { package: string; placement: string; metrics: string } | null {
  const dashMatch = /^(.+?)\s*—\s*(.+)$/.exec(raw.trim());
  if (!dashMatch) return null;
  const [, left, right] = dashMatch;
  const parenMatch = /^(.+?)\s*\((.+?)\)\s*$/.exec(left.trim());
  const pkg = parenMatch ? parenMatch[1].trim() : left.trim();
  const placement = parenMatch ? parenMatch[2].trim() : '';
  // Replace only the separator comma between daily/monthly metrics (`, ~...`),
  // not thousand separators like `5,000/day`.
  const metrics = right.replace(/,\s*(?=~)/g, ' · ').trim();
  return { package: pkg, placement, metrics };
}

export function VehicleSection() {
  const [routeStep, setRouteStep] = useState<{ direction: RouteDirection; index: number }>({
    direction: 'aller',
    index: 0,
  });
  const [pausedUntil, setPausedUntil] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const { t } = useLanguage();

  const routeIds = getRouteIds(routeStep.direction);
  const routePoints = routeIds.map((id, logicalIndex) => ({
    id,
    logicalIndex,
    label: t.locations[id as keyof typeof t.locations],
    descriptor: t.parcours.descriptors[id as keyof typeof t.parcours.descriptors],
  }));
  /** Aller: top→bottom = travel order. Retour: reversed so bottom = journey start (coast), read upward. */
  const displayRows =
    routeStep.direction === 'aller' ? routePoints : [...routePoints].reverse();
  const activeLocationId = routeIds[routeStep.index] as keyof typeof t.parcours.locationContent;
  const activeContent = t.parcours.locationContent[activeLocationId];

  const isSegmentFilled = (displayIdx: number) => {
    if (routeStep.direction === 'aller') {
      return displayIdx < routeStep.index;
    }
    const lastDisplay = displayRows.length - 1;
    return routeStep.index >= lastDisplay - displayIdx;
  };

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => {
      const now = Date.now();
      if (pausedUntil !== null && now < pausedUntil) return;
      if (pausedUntil !== null && now >= pausedUntil) setPausedUntil(null);
      setRouteStep((prev) => {
        const ids = getRouteIds(prev.direction);
        const nextIndex = prev.index + 1;
        if (nextIndex >= ids.length) {
          return {
            direction: prev.direction === 'aller' ? 'retour' : 'aller',
            index: 0,
          };
        }
        return { direction: prev.direction, index: nextIndex };
      });
    }, ROUTE_AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [pausedUntil, reducedMotion]);

  const handleMarkerClick = (logicalIndex: number) => {
    setRouteStep((prev) => ({ ...prev, index: logicalIndex }));
    setPausedUntil(Date.now() + PAUSE_AFTER_CLICK_MS);
  };

  return (
    <section id="parcours" className="py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Shared section header */}
        <header className="mx-auto mb-10 max-w-4xl text-center">
          <h2 className="text-3xl font-bold leading-tight text-slate-900 dark:text-white md:text-4xl">
            {t.parcours.title}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
            {t.parcours.subtitle}
          </p>
        </header>

        <div className="grid gap-12 md:grid-cols-[0.35fr_0.65fr] md:items-start">
          {/* Left: route block — content-sized on mobile (w-fit) so it centers; full-width in column on desktop */}
          <motion.div
            className="flex justify-center self-center md:flex md:items-center md:justify-center"
            initial={{ opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: reducedMotion ? 0 : 0.4 }}
          >
            <div className="mx-auto flex w-fit flex-col md:w-full md:max-w-xs">
              {displayRows.map((point, displayIdx) => {
                const isActive = routeStep.index === point.logicalIndex;
                const isFilled = point.logicalIndex < routeStep.index;
                const segmentAfterFilled =
                  displayIdx < displayRows.length - 1 && isSegmentFilled(displayIdx);
                /** Line only: passed segment = dark; not yet passed = light (same semantics for aller and retour). */
                const segmentUseLightColor = !segmentAfterFilled;
                return (
                  <div
                    key={`${routeStep.direction}-${point.logicalIndex}-${point.id}`}
                    className="flex min-w-0 items-start gap-2.5 py-1"
                  >
                    <div className="flex flex-col items-center">
                      <button
                        type="button"
                        onClick={() => handleMarkerClick(point.logicalIndex)}
                        aria-label={`${point.label} — ${point.descriptor}`}
                        aria-current={isActive ? 'true' : undefined}
                        className={`relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors duration-150 ease-out active:bg-slate-100 dark:active:bg-slate-800 focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400/70 dark:focus-visible:ring-slate-500/70 ${
                          isActive
                            ? 'ring-2 ring-sky-500/60 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 dark:ring-sky-400/50'
                            : ''
                        }`}
                      >
                        <span
                          className={`block rounded-full transition-colors duration-150 ease-out ${
                            isActive
                              ? 'h-2.5 w-2.5 bg-slate-700 dark:bg-slate-200'
                              : isFilled
                                ? 'h-2 w-2 bg-sky-500 dark:bg-sky-400'
                                : 'h-1.5 w-1.5 border border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-500'
                          }`}
                        />
                      </button>
                      {displayIdx < displayRows.length - 1 && (
                        <div
                          className={`mx-auto mt-1.5 h-4 w-px flex-shrink-0 transition-colors duration-300 ${
                            segmentUseLightColor
                              ? 'bg-slate-300 dark:bg-slate-600'
                              : 'bg-slate-500 dark:bg-slate-400'
                          }`}
                          aria-hidden
                        />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleMarkerClick(point.logicalIndex)}
                      className="min-w-0 -ml-1 rounded px-1 text-left transition-colors duration-150 ease-out active:bg-slate-100 dark:active:bg-slate-800 focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400/70 dark:focus-visible:ring-slate-500/70"
                    >
                      <span
                        className={`block max-w-[10.5rem] break-words text-sm leading-snug ${
                          isActive
                            ? 'font-semibold text-slate-800 dark:text-white'
                            : 'font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                      >
                        {point.label}
                      </span>
                      <span
                        className={`mt-px block max-w-[10.5rem] break-words text-xs leading-relaxed text-slate-500 dark:text-slate-400 ${
                          !isActive ? 'invisible' : ''
                        }`}
                      >
                        {point.descriptor}
                      </span>
                    </button>
                  </div>
                );
              })}

              <div className="mt-3 flex max-w-xs items-start gap-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                <MousePointerClick className="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" strokeWidth={1.5} aria-hidden />
                <span className="break-words">{t.parcours.timelineHint}</span>
              </div>
            </div>
          </motion.div>

          {/* Right: dynamic title + description, then static bullets + note */}
          <motion.div
            layout
            className="flex max-w-xl flex-col space-y-5"
            transition={{ duration: reducedMotion ? 0 : 0.26, ease: 'easeOut' }}
          >
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${routeStep.direction}-${routeStep.index}-${String(activeLocationId)}`}
                  layout
                  className="flex min-w-0 flex-col gap-3"
                  initial={{ opacity: reducedMotion ? 1 : 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: reducedMotion ? 1 : 0 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.24,
                    ease: 'easeOut',
                  }}
                >
                  <h3 className="text-xl font-semibold leading-snug tracking-tight text-slate-900 dark:text-white">
                    {routePoints[routeStep.index].label}
                  </h3>
                  <div className="flex min-w-0 items-center gap-2 text-sm leading-tight text-slate-600 dark:text-slate-400">
                    {activeContent.icon === 'route' ? (
                      <Route className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
                    ) : activeContent.icon === 'coast' ? (
                      <Sun className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
                    ) : (
                      <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
                    )}
                    <span>{activeContent.tag}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 md:text-base break-words">
                    {activeContent.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex gap-3 items-start">
                <Car
                  className="mt-0.5 h-5 w-5 shrink-0 stroke-[2] text-sky-600 dark:text-sky-400"
                  aria-hidden
                />
                <span className="leading-relaxed break-words">{activeContent.bullet1}</span>
              </li>
              <li className="flex gap-3 items-start">
                <Repeat
                  className="mt-0.5 h-5 w-5 shrink-0 stroke-[2] text-sky-600 dark:text-sky-400"
                  aria-hidden
                />
                <span className="leading-relaxed break-words">{activeContent.bullet2}</span>
              </li>
              <li className="flex gap-3 items-start">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 stroke-[2] text-sky-600 dark:text-sky-400"
                  aria-hidden
                />
                <span className="leading-relaxed break-words">{activeContent.bullet3}</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Visibility storytelling — part of Parcours, not a separate nav item */}
        <div className="mx-auto mt-12 max-w-4xl border-t border-slate-200/80 pt-6 dark:border-slate-700/80">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {t.parcours.visibilityBlockTitle}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base break-words">
            {t.parcours.visibilityIntro}
          </p>
          {t.parcours.visibilityIntro2 ? (
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base break-words">
              {t.parcours.visibilityIntro2}
            </p>
          ) : null}
          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-100/80 px-6 py-6 dark:border-slate-700 dark:bg-slate-800/70">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t.parcours.visibilitySummary}
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {(
                [
                  t.parcours.visibilityRear,
                  t.parcours.visibilitySide,
                  t.parcours.visibilityFull,
                ] as const
              ).map((raw) => {
                const parsed = parseVisibilityRow(raw);
                if (!parsed) return null;
                const metricParts = parsed.metrics.split(' · ').map((p) => p.trim());
                const dailyPart = metricParts[0] ?? parsed.metrics;
                const monthlyPart = metricParts[1] ?? parsed.metrics;

                return (
                  <div
                    key={parsed.package}
                    className="rounded-xl border border-slate-200/90 bg-white/75 p-4 dark:border-slate-600/70 dark:bg-slate-700/30"
                  >
                    <p className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
                      {parsed.package}
                    </p>
                    {parsed.placement ? (
                      <p className="mt-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                        {parsed.placement}
                      </p>
                    ) : null}

                    <div className="mt-3">
                      <p className="text-xl font-bold leading-tight text-slate-900 dark:text-white">
                        {monthlyPart}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                        {dailyPart}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
