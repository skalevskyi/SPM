'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import type { CalculatorContactPrefillPayload } from '@/lib/contactPrefillMessage';

type CalculatorContactPrefillContextValue = {
  payload: CalculatorContactPrefillPayload | null;
  setPayload: (next: CalculatorContactPrefillPayload | null) => void;
};

const CalculatorContactPrefillContext = createContext<CalculatorContactPrefillContextValue | null>(
  null,
);

export function CalculatorContactPrefillProvider({ children }: { children: ReactNode }) {
  const [payload, setPayload] = useState<CalculatorContactPrefillPayload | null>(null);

  const value = useMemo(
    () => ({
      payload,
      setPayload,
    }),
    [payload],
  );

  return (
    <CalculatorContactPrefillContext.Provider value={value}>{children}</CalculatorContactPrefillContext.Provider>
  );
}

export function useCalculatorContactPrefill(): CalculatorContactPrefillContextValue {
  const ctx = useContext(CalculatorContactPrefillContext);
  if (!ctx) {
    throw new Error('useCalculatorContactPrefill must be used within CalculatorContactPrefillProvider');
  }
  return ctx;
}
