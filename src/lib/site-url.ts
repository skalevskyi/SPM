/**
 * Public marketing URL (canonical links, metadata, emails).
 * Override with NEXT_PUBLIC_SITE_URL in deployment when needed.
 */
export function getPublicSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    return raw.replace(/\/+$/, '');
  }
  return 'https://www.spmads.fr';
}
