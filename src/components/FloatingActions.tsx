'use client';

import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useLanguage } from '@/context/LanguageContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const SCROLL_THRESHOLD = 500;
const focusRing =
  'focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400/70 dark:focus-visible:ring-slate-500/70';

export function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });

  return (
    <div
      className="fixed right-4 z-30 bottom-[var(--shell-floating-bottom-mobile)] md:bottom-8 md:right-6"
      aria-hidden
    >
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label={t.floating.scrollTop}
          className={`flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white/90 shadow-sm backdrop-blur-sm transition-colors transition-shadow duration-150 ease-out hover:bg-slate-50 active:bg-slate-100 active:shadow-none dark:border-slate-600/80 dark:bg-slate-900/80 dark:shadow-slate-950/40 dark:hover:bg-slate-800/90 dark:active:bg-slate-800 dark:active:shadow-none ${focusRing}`}
        >
          <ChevronUp className="h-5 w-5 text-slate-600 dark:text-slate-300" strokeWidth={2} />
        </button>
      )}
    </div>
  );
}
