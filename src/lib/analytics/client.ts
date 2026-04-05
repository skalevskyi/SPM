'use client';

import { track } from '@vercel/analytics';

/**
 * Conversion events (Vercel Analytics). Safe to call from client components; fails quietly if analytics is unavailable.
 */
export function trackSpmEvent(
  name: 'lead_submitted' | 'calculator_opened' | 'calculator_prefill_used',
  props?: Record<string, string | number | boolean>,
): void {
  try {
    track(name, props);
  } catch {
    /* ignore */
  }
}
