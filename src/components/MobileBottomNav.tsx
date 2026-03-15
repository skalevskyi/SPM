'use client';

import { Info, Mail, Package, Route } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useLanguage } from '@/context/LanguageContext';

const ITEMS = [
  { key: 'support' as const, href: '#support', icon: Info },
  { key: 'parcours' as const, href: '#parcours', icon: Route },
  { key: 'offres' as const, href: '#offres', icon: Package },
  { key: 'contact' as const, href: '#contact', icon: Mail },
] as const;

const SECTION_IDS = ITEMS.map((item) => item.href.slice(1));

const focusRing =
  'focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900';

function getActiveSectionFromHash(): string | null {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash.slice(1);
  return SECTION_IDS.includes(hash) ? hash : null;
}

function getActiveSectionFromScroll(): string | null {
  const threshold = 120;
  let active: string | null = null;
  let maxTop = -Infinity;
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top;
    if (top <= threshold && top > maxTop) {
      maxTop = top;
      active = id;
    }
  }
  return active;
}

export function MobileBottomNav() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const updateFromHash = () => setActiveSection(getActiveSectionFromHash());
    updateFromHash();
    window.addEventListener('hashchange', updateFromHash);
    return () => window.removeEventListener('hashchange', updateFromHash);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const fromScroll = getActiveSectionFromScroll();
        if (fromScroll !== null) setActiveSection(fromScroll);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [mounted]);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2"
      aria-label={t.mobileNav.ariaLabel}
    >
      <div className="mx-auto flex w-full max-w-lg items-center justify-around rounded-3xl border border-slate-200/90 bg-white/80 px-2 py-3 shadow-lg shadow-slate-200/50 backdrop-blur-md dark:border-slate-600/80 dark:bg-slate-900/80 dark:shadow-slate-950/30">
        {ITEMS.map(({ key, href, icon: Icon }) => {
          const isActive = mounted && activeSection === href.slice(1);
          return (
            <a
              key={href}
              href={href}
              className={`flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 rounded-lg px-4 py-2 text-xs font-medium transition ${focusRing} ${
                isActive
                  ? 'text-sky-600 dark:text-sky-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
              aria-current={isActive ? 'true' : undefined}
            >
              <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
              <span>{t.mobileNav[key]}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
