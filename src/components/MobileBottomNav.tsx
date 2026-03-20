'use client';

import { Layers, Mail, Package, Route } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useLanguage } from '@/context/LanguageContext';

const ITEMS = [
  { key: 'support' as const, href: '#support', icon: Layers },
  { key: 'parcours' as const, href: '#parcours', icon: Route },
  { key: 'offres' as const, href: '#offres', icon: Package },
  { key: 'contact' as const, href: '#contact', icon: Mail },
] as const;

const SECTION_IDS = ITEMS.map((item) => item.href.slice(1));

const interactionReset = 'outline-none focus:outline-none focus-visible:outline-none';

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
      <div className="mx-auto grid w-full max-w-lg grid-cols-4 items-center rounded-3xl border border-slate-200/90 bg-white/80 px-2 py-3 shadow-lg shadow-slate-200/50 backdrop-blur-md dark:border-slate-700/90 dark:bg-slate-900/95 dark:shadow-slate-950/60">
        {ITEMS.map(({ key, href, icon: Icon }) => {
          const isActive = mounted && activeSection === href.slice(1);
          return (
            <a
              key={href}
              href={href}
              onClick={() => setActiveSection(href.slice(1))}
              className={`flex min-h-[44px] w-full min-w-0 flex-col items-center justify-center gap-1 border border-transparent px-2 py-2 text-[11px] font-medium leading-tight transition-colors duration-150 ease-out ${interactionReset} ${
                isActive
                  ? 'rounded-3xl bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400'
                  : 'rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
              aria-current={isActive ? 'true' : undefined}
            >
              <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
              <span className="w-full truncate text-center whitespace-nowrap">{t.mobileNav[key]}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
