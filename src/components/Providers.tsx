'use client';

import { CalculatorContactPrefillProvider } from '@/context/CalculatorContactPrefillContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CalculatorContactPrefillProvider>{children}</CalculatorContactPrefillProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
