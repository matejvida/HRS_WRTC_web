'use client';

import React, { useEffect, useState } from 'react';

export type WrtcTheme = 'day' | 'night';

export const THEME_STORAGE_KEY = 'wrtc2030-theme';

export interface ThemeResolutionEnv {
  getStorageItem: (key: string) => string | null;
  setStorageItem?: (key: string, value: string) => void;
  prefersDark: () => boolean;
}

/**
 * Pure theme resolution helper implementing the Story 1.1 I/O & Edge-Case Matrix:
 * - Stored "day" | "night" -> returns stored theme
 * - Invalid non-empty stored value -> normalizes to "day"
 * - Unset storage -> inspects prefers-color-scheme: dark ("night" if dark, else "day")
 * - Any storage or matchMedia exception -> safely falls back to "day"
 */
export function resolveInitialTheme(env?: Partial<ThemeResolutionEnv>): WrtcTheme {
  const getStorageItem =
    env?.getStorageItem ??
    ((key: string) =>
      typeof window !== 'undefined' ? window.localStorage.getItem(key) : null);
  const setStorageItem =
    env?.setStorageItem ??
    ((key: string, value: string) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, value);
      }
    });
  const prefersDark =
    env?.prefersDark ??
    (() =>
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  try {
    let stored: string | null = null;
    try {
      stored = getStorageItem(THEME_STORAGE_KEY);
    } catch {
      return 'day';
    }

    if (stored === 'day' || stored === 'night') {
      return stored;
    }

    if (stored !== null && stored !== undefined && stored !== '') {
      try {
        setStorageItem(THEME_STORAGE_KEY, 'day');
      } catch {
        // Ignore storage write errors
      }
      return 'day';
    }

    try {
      return prefersDark() ? 'night' : 'day';
    } catch {
      return 'day';
    }
  } catch {
    return 'day';
  }
}

export function applyInitialTheme(env?: Partial<ThemeResolutionEnv>): WrtcTheme {
  const theme = resolveInitialTheme(env);
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
  }
  return theme;
}

/**
 * Synchronous inline script injected in `src/app/layout.tsx` `<head>`
 * to set `<html data-theme="day" | "night">` before first paint (zero FOUC).
 */
export const THEME_INIT_SCRIPT = `(function(){try{var k='${THEME_STORAGE_KEY}',s=null;try{s=window.localStorage.getItem(k);}catch(e){document.documentElement.setAttribute('data-theme','day');return;}var t='day';if(s==='day'||s==='night'){t=s;}else if(s!==null&&s!==undefined&&s!==''){t='day';try{window.localStorage.setItem(k,'day');}catch(e){}}else{try{if(typeof window.matchMedia==='function'&&window.matchMedia('(prefers-color-scheme: dark)').matches){t='night';}}catch(e){t='day';}}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','day');}})();`;

export function ThemeToggle() {
  const [theme, setTheme] = useState<WrtcTheme>('day');

  useEffect(() => {
    const resolved = applyInitialTheme();
    setTheme(resolved);
  }, []);

  const handleSelectTheme = (nextTheme: WrtcTheme) => {
    setTheme(nextTheme);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', nextTheme);
    }
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      }
    } catch {
      // Ignore storage errors in restricted environments
    }
  };

  return (
    <div className="theme-switch" role="group" aria-label="Colour theme">
      <button
        type="button"
        className="theme-switch__btn"
        aria-pressed={theme === 'day'}
        onClick={() => handleSelectTheme('day')}
      >
        Day
      </button>
      <button
        type="button"
        className="theme-switch__btn"
        aria-pressed={theme === 'night'}
        onClick={() => handleSelectTheme('night')}
      >
        Night
      </button>
    </div>
  );
}
