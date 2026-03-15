'use client';

import { motion } from 'framer-motion';

import { useLanguage } from '@/context/LanguageContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function ConceptSection() {
  const reducedMotion = useReducedMotion();
  const { t } = useLanguage();
  const container = {
    hidden: { opacity: reducedMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: reducedMotion ? 0 : 0.08 },
    },
  };
  const item = {
    hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 12 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="support"
      className="border-t border-slate-200 bg-slate-50/50 py-16 dark:border-slate-800 dark:bg-slate-900/30"
    >
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <motion.h2
          className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl"
          initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: reducedMotion ? 0 : 0.4 }}
        >
          {t.support.title}
        </motion.h2>
        <motion.p
          className="mt-4 text-lg text-slate-600 dark:text-slate-300"
          initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.05 }}
        >
          {t.support.subtitle}
        </motion.p>
        <motion.div
          className="mt-10 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/50"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <ul className="space-y-2 text-slate-600 dark:text-slate-300">
            {t.support.bullets.map((text, i) => (
              <motion.li key={i} variants={item} className="flex gap-2">
                <span className="text-sky-500" aria-hidden>•</span>
                {text}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
