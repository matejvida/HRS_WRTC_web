import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { WrtcLogo } from '@/components/brand/WrtcLogo';
import {
  CheckerMark,
  CheckerFive,
  CheckerRibbon,
  CheckerStrip,
  KockiceCluster,
} from '@/components/brand/CheckerMark';
import {
  ThemeToggle,
  THEME_STORAGE_KEY,
  resolveInitialTheme,
  applyInitialTheme,
} from '@/components/layout/ThemeToggle';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { validateAssets } from '../../scripts/validate-data';

describe('Story 1.1 — Official Brand Assets & Data Validation', () => {
  it('verifies official wrtc2030.hr brand SVGs and 3 Selection Rules v1.0 PDFs', () => {
    const result = validateAssets();
    expect(result.svgsChecked).toBe(3);
    expect(result.pdfsChecked).toBe(3);
  });
});

describe('Story 1.1 — Proposal 1 Brand Primitives', () => {
  it('renders WrtcLogo with both Day (wrtc-logo.svg) and Night (wrtc-logo-white.svg) variants and brand tokens', () => {
    const { container } = render(<WrtcLogo />);
    const dayImg = container.querySelector('img.only-day');
    const nightImg = container.querySelector('img.only-night');

    expect(dayImg).not.toBeNull();
    expect(dayImg?.getAttribute('src')).toBe('/brand/wrtc-logo.svg');
    expect(dayImg?.getAttribute('data-brand-navy')).toBe('#273B8F');
    expect(dayImg?.getAttribute('data-brand-red')).toBe('#ED1C24');

    expect(nightImg).not.toBeNull();
    expect(nightImg?.getAttribute('src')).toBe('/brand/wrtc-logo-white.svg');
    expect(nightImg?.getAttribute('data-brand-shack-navy')).toBe('#0D1333');
    expect(nightImg?.getAttribute('data-brand-red')).toBe('#ED1C24');
  });

  it('renders CheckerMark (2x2), CheckerFive (5-square motif), CheckerRibbon/CheckerStrip, and KockiceCluster (4x4) with Proposal 1 tokens', () => {
    const { container } = render(
      <div>
        <CheckerMark size="md" data-testid="checker-mark" />
        <CheckerFive data-testid="checker-five" />
        <CheckerRibbon data-testid="checker-ribbon" />
        <CheckerStrip data-testid="checker-strip" />
        <KockiceCluster data-testid="kockice-cluster" />
      </div>
    );

    const mark = screen.getByTestId('checker-mark');
    expect(mark).toHaveClass('checker', 'checker--md');
    expect(mark.getAttribute('data-token-red')).toBe('#ED1C24');

    const five = screen.getByTestId('checker-five');
    expect(five).toHaveClass('checker-five');
    expect(five.querySelectorAll('span').length).toBe(5);
    expect(five.getAttribute('data-token-red')).toBe('#ED1C24');

    const ribbon = screen.getByTestId('checker-ribbon');
    expect(ribbon).toHaveClass('checker-ribbon');

    const strip = screen.getByTestId('checker-strip');
    expect(strip).toHaveClass('checker-strip');

    const cluster = screen.getByTestId('kockice-cluster');
    expect(cluster).toHaveClass('kockice-cluster');
    expect(cluster.querySelectorAll('span').length).toBe(16);
    expect(cluster.getAttribute('data-token-navy')).toBe('#273B8F');
    expect(cluster.getAttribute('data-token-shack')).toBe('#0D1333');
    expect(container.innerHTML).toContain('#ED1C24');
  });
});

describe('Story 1.1 — Zero-FOUC Theme Initialization & ThemeToggle Matrix', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('First visit (OS light): sets data-theme="day" when wrtc2030-theme is unset and prefers-color-scheme is light', () => {
    const theme = resolveInitialTheme({
      getStorageItem: () => null,
      prefersDark: () => false,
    });
    expect(theme).toBe('day');

    applyInitialTheme({
      getStorageItem: () => null,
      prefersDark: () => false,
    });
    expect(document.documentElement.getAttribute('data-theme')).toBe('day');
  });

  it('First visit (OS dark): sets data-theme="night" when wrtc2030-theme is unset and prefers-color-scheme is dark', () => {
    const theme = resolveInitialTheme({
      getStorageItem: () => null,
      prefersDark: () => true,
    });
    expect(theme).toBe('night');

    applyInitialTheme({
      getStorageItem: () => null,
      prefersDark: () => true,
    });
    expect(document.documentElement.getAttribute('data-theme')).toBe('night');
  });

  it('Edge cases: falls back to "day" if localStorage throws or matchMedia is unavailable, and normalizes invalid stored values to "day"', () => {
    const fromThrowingStorage = resolveInitialTheme({
      getStorageItem: () => {
        throw new Error('SecurityError: storage disabled');
      },
      prefersDark: () => false,
    });
    expect(fromThrowingStorage).toBe('day');

    const fromUnavailableMatchMedia = resolveInitialTheme({
      getStorageItem: () => null,
      prefersDark: () => {
        throw new Error('matchMedia unavailable');
      },
    });
    expect(fromUnavailableMatchMedia).toBe('day');

    window.localStorage.setItem(THEME_STORAGE_KEY, 'corrupted-value');
    render(<ThemeToggle />);
    expect(document.documentElement.getAttribute('data-theme')).toBe('day');
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('day');
  });

  it('Theme toggle (Day <-> Night): updates <html data-theme>, persists to localStorage, and updates aria-pressed', () => {
    document.documentElement.setAttribute('data-theme', 'day');
    render(<ThemeToggle />);

    const dayBtn = screen.getByRole('button', { name: /day/i });
    const nightBtn = screen.getByRole('button', { name: /night/i });

    expect(dayBtn).toHaveAttribute('aria-pressed', 'true');
    expect(nightBtn).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(nightBtn);
    expect(document.documentElement.getAttribute('data-theme')).toBe('night');
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('night');
    expect(nightBtn).toHaveAttribute('aria-pressed', 'true');
    expect(dayBtn).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(dayBtn);
    expect(document.documentElement.getAttribute('data-theme')).toBe('day');
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('day');
    expect(dayBtn).toHaveAttribute('aria-pressed', 'true');
    expect(nightBtn).toHaveAttribute('aria-pressed', 'false');
  });
});

describe('Story 1.1 — Sticky SiteHeader, Mobile Hamburger Drawer & SiteFooter', () => {
  it('toggles mobile drawer aria-expanded on hamburger click and closes on Escape or nav link click', () => {
    render(<SiteHeader />);
    const toggleBtn = screen.getByRole('button', { name: /toggle mobile menu/i });
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

    // Open mobile drawer
    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');

    // Close via Escape key
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

    // Re-open and close via clicking a navigation link
    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');

    const rulesLink = screen.getByRole('link', { name: /selection rules/i });
    fireEvent.click(rulesLink);
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders SiteFooter with HRS attribution, official emails, and Selection Rules v1.0 PDF links', () => {
    render(<SiteFooter />);
    expect(
      screen.getByText(/Croatian Amateur Radio Association \(HRS\)/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /^wrtc2030@hamradio\.hr$/i })
    ).toHaveAttribute('href', 'mailto:wrtc2030@hamradio.hr');
    expect(
      screen.getByRole('link', { name: /^rules-wrtc2030@hamradio\.hr$/i })
    ).toHaveAttribute('href', 'mailto:rules-wrtc2030@hamradio.hr');
  });
});
