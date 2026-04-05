/**
 * FR — Contact section.
 */

export const contact = {
  title: 'Contact',
  subtitle:
    'Laissez votre demande et nous vous recontactons pour confirmer une estimation adaptée à votre objectif.',
  name: 'Nom',
  company: 'Société',
  email: 'Email',
  phone: 'Téléphone (optionnel)',
  message: 'Message',
  placeholderName: 'Votre nom',
  placeholderCompany: 'Votre société',
  placeholderEmail: 'email@exemple.fr',
  placeholderPhone: '06 00 00 00 00',
  placeholderMessage: 'Votre message ou demande de devis...',
  reassurance: 'Sans engagement. Vos données restent confidentielles.',
  submit: 'Demander votre estimation',
  submitLoading: 'Envoi en cours…',
  submitSuccess: 'Merci. Votre demande a bien été envoyée.',
  submitError: "Une erreur s'est produite. Réessayez ou contactez-nous autrement.",
  submitErrorRateLimited:
    'Trop de tentatives d’envoi. Patientez quelques minutes ou visitez spmads.fr si le problème persiste.',
  submitErrorBackup:
    "L'enregistrement sécurisé de votre demande a échoué. Réessayez dans quelques instants ou contactez-nous via spmads.fr.",
  validation: {
    required: 'Ce champ est requis',
    invalid: 'Format invalide',
    tooLong: 'Le texte est trop long',
  },
  success: {
    title: 'Demande envoyée',
    description: 'Merci, votre demande a bien été reçue.',
    responseTime: 'Nous vous répondrons sous 24h.',
    reassurance: 'Sans engagement. Vos données ne sont jamais partagées.',
    resetButton: 'Envoyer une autre demande',
  },
  /** Calculator → contact prefill ({package}, {billing}, {duration}, {addons}, {total}) */
  prefillMessageTemplate:
    'Bonjour,\n\nJe suis intéressé par une campagne publicitaire :\n\nOffre : {package}\nMode de paiement : {billing}\nDurée : {duration}\nOptions sélectionnées :\n{addons}\n\nPrix total : {total}\n\nMerci de me contacter pour convenir des détails.',
  prefillNoAddons: 'aucune option supplémentaire',
} as const;
