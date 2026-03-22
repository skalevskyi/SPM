/**
 * UA — Contact section. Translated from FR.
 */

export const contact = {
  title: 'Контакт',
  subtitle:
    'Залиште запит, і ми зв’яжемося з вами, щоб підтвердити оцінку під вашу мету.',
  name: "Ім'я",
  company: 'Компанія',
  email: 'Email',
  phone: "Телефон (необов'язково)",
  message: 'Повідомлення',
  placeholderName: "Ваше ім'я",
  placeholderCompany: 'Ваша компанія',
  placeholderEmail: 'email@example.com',
  placeholderPhone: '+33 6 00 00 00 00',
  placeholderMessage: 'Ваше повідомлення або запит пропозиції...',
  reassurance: {
    responseTimeShort: 'Відповідь протягом 24 год',
    noCommitment: 'Без зобов’язань',
    privacy: 'Ваші дані залишаються конфіденційними',
  },
  submit: 'Запросити оцінку',
  submitLoading: 'Надсилання…',
  submitSuccess: 'Дякуємо. Ваш запит надіслано.',
  submitError: 'Сталася помилка. Спробуйте ще раз.',
  validation: {
    required: 'Це поле обов’язкове',
    invalid: 'Некоректний формат',
    tooLong: 'Текст занадто довгий',
  },
  success: {
    title: 'Запит надіслано',
    description: 'Дякуємо — ми отримали ваш запит.',
    responseTime: 'Ми відповімо протягом 24 годин.',
    reassurance: 'Без зобов’язань. Ваші дані нікому не передаються.',
    resetButton: 'Надіслати ще один запит',
  },
} as const;
