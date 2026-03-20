'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

import { useLanguage } from '@/context/LanguageContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { BASE_PATH } from '@/lib/base-path';

const OFFRES = [
  { id: 'BASIC' as const, image: `${BASE_PATH}/vehicle/BASIC.png`, featured: false },
  { id: 'PRO' as const, image: `${BASE_PATH}/vehicle/PRO.png`, featured: true },
  { id: 'EXCLUSIVE' as const, image: `${BASE_PATH}/vehicle/EXCLUSIVE.png`, featured: false },
];

type OfferId = (typeof OFFRES)[number]['id'];
const CALC_DURATION = 0.28;
const OFFER_INDEX: Record<OfferId, number> = { BASIC: 0, PRO: 1, EXCLUSIVE: 2 };
const focusRing =
  'focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400/70 dark:focus-visible:ring-slate-500/70';

export function OffresSection() {
  const reducedMotion = useReducedMotion();
  const { t } = useLanguage();
  const [expandedPackage, setExpandedPackage] = useState<OfferId | null>(null);
  const [switchDirection, setSwitchDirection] = useState<1 | -1>(1);
  const previewRef = useRef<HTMLDivElement>(null);

  const toggleCalculator = (id: OfferId) => {
    setExpandedPackage((prev) => {
      const next = prev === id ? null : id;
      if (prev !== null && next !== null) {
        const prevIndex = OFFER_INDEX[prev];
        const nextIndex = OFFER_INDEX[next];
        setSwitchDirection(nextIndex >= prevIndex ? 1 : -1);
      }

      if (next !== null) {
        requestAnimationFrame(() => {
          const el = previewRef.current;
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const viewportH = window.innerHeight || 0;
          const notMeaningfullyVisible =
            rect.top > viewportH * 0.82 || rect.bottom < viewportH * 0.22;

          if (notMeaningfullyVisible) {
            el.scrollIntoView({
              behavior: reducedMotion ? 'auto' : 'smooth',
              block: 'start',
            });
          }
        });
      }

      return next;
    });
  };

  const selectedOffer = expandedPackage
    ? OFFRES.find((o) => o.id === expandedPackage) ?? null
    : null;

  const selectedName = selectedOffer
    ? selectedOffer.id === 'BASIC'
      ? t.offres.rear
      : selectedOffer.id === 'PRO'
        ? t.offres.side
        : t.offres.full
    : null;
  const selectedPositioning = selectedOffer
    ? selectedOffer.id === 'BASIC'
      ? t.offres.positioningRear
      : selectedOffer.id === 'PRO'
        ? t.offres.positioningSide
        : t.offres.positioningFull
    : null;

  return (
    <section
      id="offres"
      className="border-t border-slate-200 bg-slate-100/40 py-16 dark:border-slate-800 dark:bg-slate-900/40"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.h2
          className="text-center text-3xl font-bold text-slate-900 dark:text-white md:text-4xl"
          initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: reducedMotion ? 0 : 0.4 }}
        >
          {t.offres.title}
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 max-w-2xl text-center text-slate-600 dark:text-slate-300"
          initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.05 }}
        >
          {t.offres.subtitle}
        </motion.p>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 items-start md:items-start">
          {OFFRES.map((offer, i) => {
            const name =
              offer.id === 'BASIC'
                ? t.offres.rear
                : offer.id === 'PRO'
                  ? t.offres.side
                  : t.offres.full;
            const isSelected = expandedPackage === offer.id;
            const positioning =
              offer.id === 'BASIC'
                ? t.offres.positioningRear
                : offer.id === 'PRO'
                  ? t.offres.positioningSide
                  : t.offres.positioningFull;
            const description =
              offer.id === 'BASIC'
                ? t.offres.descriptionRear
                : offer.id === 'PRO'
                  ? t.offres.descriptionSide
                  : t.offres.descriptionFull;
            const benefits =
              offer.id === 'BASIC'
                ? t.offres.benefitsRear
                : offer.id === 'PRO'
                  ? t.offres.benefitsSide
                  : t.offres.benefitsFull;
            const alt =
              offer.id === 'BASIC'
                ? t.offres.altRear
                : offer.id === 'PRO'
                  ? t.offres.altSide
                  : t.offres.altFull;
            return (
              <motion.article
                key={offer.id}
                className={`relative self-start flex flex-col rounded-2xl border bg-white dark:bg-slate-800/55 transition-shadow hover:shadow-md dark:hover:shadow-none ${
                  isSelected
                    ? 'border-sky-300 ring-2 ring-sky-500/20 dark:border-sky-700 dark:ring-sky-400/25'
                    : offer.featured
                      ? 'border-sky-200 ring-1 ring-sky-500/20 dark:border-sky-800/60 dark:ring-sky-400/20'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
                initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : i * 0.08 }}
              >
                <div className="flex min-h-[340px] flex-col p-6">
                  {/* Top area: label + optional recommended badge */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
                        {name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                        {positioning}
                      </p>
                    </div>
                    {offer.featured ? (
                      <span className="shrink-0 rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-700 dark:border-sky-800/60 dark:bg-sky-900/40 dark:text-sky-300">
                        {t.offres.badgeFeatured}
                      </span>
                    ) : null}
                  </div>

                  {/* Visual area: vehicle mockup */}
                  <div className="relative mt-6 flex h-40 items-center justify-center rounded-xl border border-slate-200 bg-slate-100/70 px-4 dark:border-slate-600/80 dark:bg-slate-700/35">
                    <Image
                      src={offer.image}
                      alt={alt}
                      fill
                      className="object-contain object-center"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                  </div>

                  {/* Short card description */}
                  <p className="mt-4 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                    {description}
                  </p>

                  {/* Value bullets */}
                  <ul className="mt-5 space-y-2">
                    {benefits.map((benefit, bi) => (
                      <li
                        key={bi}
                        className="flex gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500 dark:bg-sky-400"
                          aria-hidden
                        />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA area */}
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => toggleCalculator(offer.id)}
                      className={`block w-full rounded-lg bg-gradient-to-b from-sky-500 to-sky-600 py-2.5 text-center text-sm font-medium text-white transition-colors duration-150 ease-out hover:from-sky-600 hover:to-sky-700 active:from-sky-600 active:to-sky-700 dark:bg-gradient-to-b dark:from-sky-500 dark:to-sky-400 dark:hover:from-sky-500 dark:hover:to-sky-300 dark:active:from-sky-500 dark:active:to-sky-600 ${focusRing}`}
                    >
                      {t.offres.calculer}
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <AnimatePresence initial={false}>
          {expandedPackage !== null && selectedOffer !== null ? (
            <motion.div
              key="shared-preview"
              ref={previewRef}
              className="mt-10"
              initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : -8 }}
              transition={{ duration: reducedMotion ? 0 : 0.24 }}
            >
              <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-slate-50/80 p-6 md:p-8 dark:border-slate-600 dark:bg-slate-900/90">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={expandedPackage}
                    initial={{
                      opacity: reducedMotion ? 1 : 0,
                      x: reducedMotion ? 0 : switchDirection * 18,
                      y: 0,
                    }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{
                      opacity: reducedMotion ? 1 : 0,
                      x: reducedMotion ? 0 : switchDirection * -18,
                      y: 0,
                    }}
                    transition={{ duration: reducedMotion ? 0 : 0.2 }}
                  >
                    <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                      {t.offres.simTitle}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {t.offres.hint}
                    </p>

                    <div className="mt-5 space-y-2.5">
                      <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-300">
                        <span className="mr-2 inline-block font-medium uppercase tracking-wide text-slate-500 dark:text-slate-300">
                          {t.offres.simFormatLabel}:
                        </span>
                        <span className="font-medium text-slate-700 dark:text-slate-200">
                          {selectedName}
                        </span>
                      </p>
                      <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-300">
                        {selectedPositioning}
                      </p>
                      <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-300">
                        {t.offres.simAdapted}
                      </p>
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-slate-500 dark:text-slate-300">
                      {t.offres.simDisclaimer}
                    </p>

                    <a
                      href="#contact"
                      className={`mt-5 block w-full rounded-lg bg-gradient-to-b from-sky-500 to-sky-600 py-2.5 text-center text-sm font-medium text-white transition-colors duration-150 ease-out hover:from-sky-600 hover:to-sky-700 active:from-sky-600 active:to-sky-700 dark:bg-gradient-to-b dark:from-sky-500 dark:to-sky-400 dark:hover:from-sky-500 dark:hover:to-sky-300 dark:active:from-sky-500 dark:active:to-sky-600 ${focusRing}`}
                    >
                      {t.offres.ctaEstimation}
                    </a>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
