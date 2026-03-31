'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

const THEME_KEY = 'spm-theme';

export type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  setTheme: (next: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/** Returns `light` / `dark` from `spm-theme` or a legacy `*-theme` key; `null` if none — follow system. */
function readStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(THEME_KEY) as Theme | null;
  if (stored === 'dark' || stored === 'light') return stored;

  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (!key || key === THEME_KEY) continue;
    if (!key.endsWith('-theme')) continue;
    const legacyStored = localStorage.getItem(key) as Theme | null;
    if (legacyStored === 'dark' || legacyStored === 'light') return legacyStored;
  }
  return null;
}

function hasManualPersistence(): boolean {
  return readStoredTheme() !== null;
}

function resolveTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = readStoredTheme();
  if (stored !== null) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  /** Bumps when `spm-theme` is written so the system-preference listener is dropped after manual toggle. */
  const [themeEpoch, setThemeEpoch] = useState(0);

  useLayoutEffect(() => {
    const initial = resolveTheme();
    setThemeState(initial);
    applyTheme(initial);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    applyTheme(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_KEY, next);
    }
    setThemeEpoch((e) => e + 1);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (hasManualPersistence()) return undefined;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (hasManualPersistence()) return;
      const next = mq.matches ? 'dark' : 'light';
      setThemeState(next);
      applyTheme(next);
    };

    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [themeEpoch]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}
