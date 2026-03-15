'use client';

import { motion } from 'framer-motion';

import { useLanguage } from '@/context/LanguageContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Contact section — UI placeholder only.
 * No form submission, no API. Visual form only per UI-only phase.
 */
export function ContactSection() {
  const reducedMotion = useReducedMotion();
  const { t } = useLanguage();
  return (
    <section
      id="contact"
      className="py-16"
    >
      <div className="mx-auto max-w-xl px-4 md:px-6">
        <motion.h2
          className="text-center text-3xl font-bold text-slate-900 dark:text-white md:text-4xl"
          initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: reducedMotion ? 0 : 0.4 }}
        >
          {t.contact.title}
        </motion.h2>
        <motion.p
          className="mt-4 text-center text-slate-600 dark:text-slate-300"
          initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.05 }}
        >
          {t.contact.subtitle}
        </motion.p>
        <motion.form
          className="mt-10 space-y-4"
          initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.1 }}
          onSubmit={(e) => e.preventDefault()}
          noValidate
        >
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t.contact.name}
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              autoComplete="name"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
              placeholder={t.contact.placeholderName}
            />
          </div>
          <div>
            <label htmlFor="contact-company" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t.contact.company}
            </label>
            <input
              id="contact-company"
              type="text"
              name="company"
              autoComplete="organization"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
              placeholder={t.contact.placeholderCompany}
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t.contact.email}
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              autoComplete="email"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
              placeholder={t.contact.placeholderEmail}
            />
          </div>
          <div>
            <label htmlFor="contact-phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t.contact.phone}
            </label>
            <input
              id="contact-phone"
              type="tel"
              name="phone"
              autoComplete="tel"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
              placeholder={t.contact.placeholderPhone}
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t.contact.message}
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
              placeholder={t.contact.placeholderMessage}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-slate-900 py-3 font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:bg-sky-600 dark:hover:bg-sky-500 dark:focus:ring-offset-slate-900"
          >
            {t.contact.submit}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
