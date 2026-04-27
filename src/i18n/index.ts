/**
 * SPM i18n — FR-first, section-based. Whole-locale fallback only.
 */

import { fr } from './locales/fr';
import { getEagerFrenchTranslations, loadLocaleTranslations } from './load-locale';

import type { Locale, TranslationKeys } from './types';

export type { Locale, TranslationKeys };
export { getEagerFrenchTranslations, loadLocaleTranslations };

export function getTranslations(locale: Locale): TranslationKeys {
  if (locale === 'fr') {
    return fr as TranslationKeys;
  }
  return fr as TranslationKeys;
}
