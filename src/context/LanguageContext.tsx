'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  getEagerFrenchTranslations,
  loadLocaleTranslations,
  type Locale,
  type TranslationKeys,
} from '@/i18n';

const LOCALE_KEY = 'spm-locale';

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

  // Backward-compatible fallback: read any existing `*-locale` key in localStorage.
  // This avoids hardcoding legacy brand keys while still preserving stored preference.
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (!key || key === LOCALE_KEY) continue;
    if (!key.endsWith('-locale')) continue;
    const legacyStored = localStorage.getItem(key) as Locale | null;
    if (legacyStored === 'fr' || legacyStored === 'en' || legacyStored === 'ua') return legacyStored;
  }

  return 'fr';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr');
  const [t, setTranslations] = useState<TranslationKeys>(() => getEagerFrenchTranslations());
  const localeRequestIdRef = useRef(0);

  const applyLocale = useCallback(async (next: Locale, options?: { persist: boolean }) => {
    localeRequestIdRef.current += 1;
    const requestId = localeRequestIdRef.current;

    if (options?.persist && typeof window !== 'undefined') {
      localStorage.setItem(LOCALE_KEY, next);
    }

    if (next === 'fr') {
      setLocaleState('fr');
      setTranslations(getEagerFrenchTranslations());
      document.documentElement.lang = 'fr';
      return;
    }

    try {
      const loadedTranslations = await loadLocaleTranslations(next);
      if (requestId !== localeRequestIdRef.current) {
        return;
      }
      setLocaleState(next);
      setTranslations(loadedTranslations);
      document.documentElement.lang = next === 'ua' ? 'uk' : next;
    } catch {
      if (requestId !== localeRequestIdRef.current) {
        return;
      }

      setLocaleState('fr');
      setTranslations(getEagerFrenchTranslations());
      document.documentElement.lang = 'fr';

      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[i18n] Failed to load locale "${next}", falling back to "fr".`);
      }
    }
  }, []);

  useEffect(() => {
    const stored = getStoredLocale();
    void applyLocale(stored);
  }, [applyLocale]);

  const setLocale = useCallback((next: Locale) => {
    void applyLocale(next, { persist: true });
  }, [applyLocale]);

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
