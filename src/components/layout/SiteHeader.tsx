'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { WrtcLogo } from '@/components/brand/WrtcLogo';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

export interface NavItem {
  label: string;
  href: string;
  isCta?: boolean;
}

const PRIMARY_NAV_ITEMS: NavItem[] = [
  { label: 'Competition', href: '/competition/selection-rules' },
  { label: 'Selection Rules', href: '/competition/selection-rules' },
  { label: 'Standings', href: '/competition/standings' },
  { label: 'Qualifying Events', href: '/competition/qualifying-events' },
  { label: 'Croatia & Slavonia', href: '/croatia-slavonia' },
  { label: 'News', href: '/news' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'Contact', href: '#contact', isCta: true },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <Link
          className="site-header__logo"
          href="/"
          aria-label="WRTC 2030 Croatia — home"
        >
          <WrtcLogo width={76} height={64} />
        </Link>

        <nav
          id="site-nav-menu"
          className={`site-nav ${mobileMenuOpen ? 'is-open' : ''}`.trim()}
          aria-label="Main"
        >
          {PRIMARY_NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              className={`site-nav__link ${
                item.isCta ? 'site-nav__link--cta' : ''
              }`.trim()}
              href={item.href}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <ThemeToggle />

        <button
          type="button"
          id="mobile-menu-toggle"
          className="mobile-menu-btn"
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="site-nav-menu"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
}
