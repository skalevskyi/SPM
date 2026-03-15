'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { getTranslations, type Locale, type TranslationKeys } from '@/i18n';

const LOCALE_KEY = 'admove-locale';

type LanguageContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: TranslationKeys;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getStoredLocale(): Locale {
  if (typeof window === 'undefined') return 'fr';
  const stored = localStorage.getItem(LOCALE_KEY) as Locale | null;
  if (stored === 'fr' || stored === 'en' || stored === 'ua') return stored;
  return 'fr';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr');

  useEffect(() => {
    const stored = getStoredLocale();
    setLocaleState(stored);
    document.documentElement.lang = stored === 'ua' ? 'uk' : stored;
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCALE_KEY, next);
      document.documentElement.lang = next === 'ua' ? 'uk' : next;
    }
  }, []);

  const t = useMemo(() => getTranslations(locale), [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
