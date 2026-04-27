import { fr } from './locales/fr';

import type { Locale, TranslationKeys } from './types';

const localeCache: Partial<Record<Locale, TranslationKeys>> = {
  fr: fr as TranslationKeys,
};

const inFlightLocaleLoads = new Map<Locale, Promise<TranslationKeys>>();

export function getEagerFrenchTranslations(): TranslationKeys {
  return fr as TranslationKeys;
}

export async function loadLocaleTranslations(locale: Locale): Promise<TranslationKeys> {
  const cached = localeCache[locale];
  if (cached) {
    return cached;
  }

  const inFlight = inFlightLocaleLoads.get(locale);
  if (inFlight) {
    return inFlight;
  }

  const loadPromise = (async () => {
    try {
      if (locale === 'en') {
        const localeModule = await import('./locales/en');
        const translations = localeModule.en as unknown as TranslationKeys;
        localeCache.en = translations;
        return translations;
      }

      if (locale === 'ua') {
        const localeModule = await import('./locales/ua');
        const translations = localeModule.ua as unknown as TranslationKeys;
        localeCache.ua = translations;
        return translations;
      }

      return fr as TranslationKeys;
    } finally {
      inFlightLocaleLoads.delete(locale);
    }
  })();

  inFlightLocaleLoads.set(locale, loadPromise);
  return loadPromise;
}
