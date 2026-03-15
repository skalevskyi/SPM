/**
 * ADMOVE i18n — FR-first, section-based. Whole-locale fallback only.
 */

import { fr } from './locales/fr';
import { en } from './locales/en';
import { ua } from './locales/ua';

import type { Locale, TranslationKeys } from './types';

const locales = { fr, en, ua } as const;

export type { Locale, TranslationKeys };

export function getTranslations(locale: Locale): TranslationKeys {
  if (locale === 'fr' || locale === 'en' || locale === 'ua') {
    return locales[locale] as TranslationKeys;
  }
  return fr as TranslationKeys;
}
