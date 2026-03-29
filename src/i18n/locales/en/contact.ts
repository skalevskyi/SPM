/**
 * EN — Contact section.
 */

export const contact = {
  title: 'Contact',
  subtitle:
    'Leave your request and we will contact you to confirm an estimate tailored to your objective.',
  name: 'Name',
  company: 'Company',
  email: 'Email',
  phone: 'Phone (optional)',
  message: 'Message',
  placeholderName: 'Your name',
  placeholderCompany: 'Your company',
  placeholderEmail: 'email@example.com',
  placeholderPhone: '+33 6 00 00 00 00',
  placeholderMessage: 'Your message or quote request...',
  reassurance: 'No commitment. Your data remains confidential.',
  submit: 'Request your estimate',
  submitLoading: 'Sending…',
  submitSuccess: 'Thank you. Your request has been sent.',
  submitError: 'Something went wrong. Please try again.',
  validation: {
    required: 'This field is required',
    invalid: 'Invalid format',
    tooLong: 'Text is too long',
  },
  success: {
    title: 'Request sent',
    description: 'Thank you — we have received your request.',
    responseTime: 'We will get back to you within 24 hours.',
    reassurance: 'No commitment. Your data is never shared.',
    resetButton: 'Send another request',
  },
  prefillMessageTemplate:
    'Hello,\n\nI am interested in an advertising campaign:\n\nPackage: {package}\nBilling mode: {billing}\nDuration: {duration}\nSelected add-ons:\n{addons}\n\nTotal price: {total}\n\nPlease contact me to discuss the details.',
  prefillNoAddons: 'no additional add-ons',
} as const;
