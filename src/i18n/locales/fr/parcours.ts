/**
 * FR — Parcours section. B2B advertising exposure; right column: dynamic title + description, static bullets + note.
 */

export const parcours = {
  title: 'Publicité visible sur les trajets quotidiens du littoral',
  subtitle:
    'Une présence publicitaire mobile visible chaque jour entre Montpellier et le littoral.',
  descriptors: {
    montpellier: 'centre urbain',
    portMarianne: 'quartier actif',
    carnon: 'axe littoral',
    palavas: 'front de mer',
    grandeMotte: 'zone fréquentée',
  },
  locationContent: {
    montpellier: {
      description:
        'Zone urbaine active avec circulation continue et visibilité publicitaire régulière.',
    },
    portMarianne: {
      description:
        'Quartier dynamique avec circulation locale et visibilité publicitaire régulière.',
    },
    carnon: {
      description:
        'Accès fréquenté vers le littoral offrant une visibilité publicitaire régulière.',
    },
    palavas: {
      description:
        'Zone très fréquentée avec circulation constante et forte visibilité publicitaire locale.',
    },
    grandeMotte: {
      description:
        'Zone littorale fréquentée avec circulation locale et visibilité publicitaire régulière.',
    },
  },
  sharedBullets: {
    bullet1:
      "Visibilité dans les flux quotidiens d'automobilistes et de passants",
    bullet2: "Répétition du message auprès d'un public local régulier",
    bullet3: 'Présence visible en circulation et à l\'arrêt',
    note: 'Visibilité indicative basée sur les flux locaux.',
  },
  visibilityTitle: 'Estimation de la visibilité',
  visibilityIntro:
    "Les estimations s'appuient sur le parcours, la circulation locale, les temps de stationnement et la fréquentation des zones traversées.",
  visibilityIntro2:
    'Les chiffres restent indicatifs et servent de base à la communication commerciale.',
  visibilitySummary: 'Exemples indicatifs par format',
  visibilityRear: 'BASIC (arrière) — ~5 000 / jour, ~110 000 / mois',
  visibilitySide: 'PRO (latéral) — ~7 000 / jour, ~150 000 / mois',
  visibilityFull: 'EXCLUSIVE (habillage complet) — ~9 000 / jour, ~200 000 / mois',
  visibilityIndicative: '· visibilité indicative',
} as const;
