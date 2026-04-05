import { getPublicSiteUrl } from '@/lib/site-url';

/**
 * Minimal truthful Organization JSON-LD for the public marketing site.
 */
export function OrganizationJsonLd() {
  const url = getPublicSiteUrl();
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SPM — Skalevskyi publicité mobile',
    url,
    description:
      'Publicité mobile sur véhicule à Montpellier et sur le littoral : formats Rear, Side, Full.',
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Montpellier et littoral occitan',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
