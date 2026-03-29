/**
 * UA locale — assembled from section modules. Structure must match FR.
 * Clean Ukrainian from FR source; curated place names.
 */

import {
  locations,
  nav,
  footer,
  floating,
  mobileNav,
  theme,
  language,
} from './common';
import { hero } from './hero';
import { support } from './support';
import { parcours } from './parcours';
import { offres } from './offres';
import { contact } from './contact';
import { tooltips } from './tooltips';

export const ua = {
  locations,
  nav,
  hero,
  support,
  parcours,
  offres,
  tooltips,
  contact,
  footer,
  floating,
  mobileNav,
  theme,
  language,
} as const;
