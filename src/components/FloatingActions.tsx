'use client';

import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useLanguage } from '@/context/LanguageContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const SCROLL_THRESHOLD = 500;
const focusRing =
  'focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900';

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
      className="fixed right-4 z-30 md:bottom-8 md:right-6 bottom-[calc(5.5rem+env(safe-area-inset-bottom)+0.75rem)]"
      aria-hidden
    >
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label={t.floating.scrollTop}
          className={`flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white/90 shadow-sm backdrop-blur-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800/90 dark:hover:bg-slate-700/90 ${focusRing}`}
        >
          <ChevronUp className="h-5 w-5 text-slate-600 dark:text-slate-300" strokeWidth={2} />
        </button>
      )}
    </div>
  );
}
