/**
 * EN — Parcours section. B2B advertising exposure; right column: dynamic title + description, static bullets + note.
 */

export const parcours = {
  title: 'Advertising visible on daily littoral routes',
  subtitle:
    'A mobile advertising presence visible every day between Montpellier and the coast.',
  descriptors: {
    montpellier: 'urban center',
    portMarianne: 'active district',
    carnon: 'coastal route',
    palavas: 'seafront',
    grandeMotte: 'busy area',
  },
  locationContent: {
    montpellier: {
      description:
        'Active urban area with continuous traffic and steady advertising visibility.',
    },
    portMarianne: {
      description:
        'Dynamic district with local circulation and regular advertising visibility.',
    },
    carnon: {
      description:
        'Frequent access route to the coast offering regular advertising visibility.',
    },
    palavas: {
      description:
        'Highly frequented area with constant circulation and strong local advertising visibility.',
    },
    grandeMotte: {
      description:
        'Busy coastal area with local circulation and regular advertising visibility.',
    },
  },
  sharedBullets: {
    bullet1: 'Visibility in daily flows of drivers and passers-by',
    bullet2: 'Repeated message exposure to a regular local audience',
    bullet3: 'Visible presence in traffic and while parked',
    note: 'Indicative visibility based on local traffic flows.',
  },
  visibilityTitle: 'Visibility estimation',
  visibilityIntro:
    'Estimates are based on the route, local traffic, parking time and footfall in the areas crossed.',
  visibilityIntro2:
    'Figures remain indicative and are used as a basis for commercial communication.',
  visibilitySummary: 'Indicative examples by format',
  visibilityRear: 'BASIC (rear) — ~5,000/day, ~110,000/month',
  visibilitySide: 'PRO (side panels) — ~7,000/day, ~150,000/month',
  visibilityFull: 'EXCLUSIVE (full vehicle wrap) — ~9,000/day, ~200,000/month',
  visibilityIndicative: '· indicative visibility',
} as const;
