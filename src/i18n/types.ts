/**
 * i18n types. TranslationKeys derived strictly from assembled FR locale.
 */

import type { fr } from './locales/fr';

export type Locale = 'fr' | 'en' | 'ua';

export type TranslationKeys = typeof fr;
