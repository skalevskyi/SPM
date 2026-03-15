'use client';

import { motion } from 'framer-motion';

const PRICING = [
  { name: 'BASIC', price: '250 €', note: 'Face arrière' },
  { name: 'PRO', price: '450 €', note: 'Flancs' },
  { name: 'EXCLUSIVE', price: '750 €', note: 'Habillage complet' },
] as const;

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="border-t border-slate-200 bg-slate-50/50 py-16 dark:border-slate-800 dark:bg-slate-900/30"
    >
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <motion.h2
          className="text-center text-3xl font-bold text-slate-900 dark:text-white md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
        >
          Tarifs
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 max-w-xl text-center text-slate-600 dark:text-slate-300"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          Grille tarifaire transparente. Production et durée de contrat à préciser selon l’offre.
        </motion.p>
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {PRICING.map((item, i) => (
            <motion.div
              key={item.name}
              className="min-w-[200px] rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <p className="text-lg font-semibold text-slate-900 dark:text-white">
                {item.name}
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {item.price}
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {item.note}
              </p>
            </motion.div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          Simulateur de prix et options de durée — à venir en phase fonctionnelle.
        </p>
      </div>
    </section>
  );
}
