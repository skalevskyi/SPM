/**
 * FR locale — canonical source. Assembled from section modules.
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

export const fr = {
  locations,
  nav,
  hero,
  support,
  parcours,
  offres,
  contact,
  footer,
  floating,
  mobileNav,
  theme,
  language,
} as const;
