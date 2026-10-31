import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { NextEventTicker } from '@/components/calendar/NextEventTicker';
import { EventCard } from '@/components/calendar/EventCard';
import { QualifyingCalendar } from '@/components/calendar/QualifyingCalendar';
import { getQualifyingEvents } from '@/lib/rules-loader';

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(''),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  usePathname: () => '/competition/qualifying-events',
}));

describe('Qualifying Events Calendar Components (Story 2.3)', () => {
  const events = getQualifyingEvents();

  describe('NextEventTicker', () => {
    it('renders Event #1 9A DX Contest header, dates, and countdown unit labels', () => {
      render(<NextEventTicker targetDate="2026-12-19T14:00:00Z" event={events[0]} />);
      expect(screen.getByText(/Qualifying Event #1/i)).toBeInTheDocument();
      expect(screen.getByText(/9A DX Contest 2026/i)).toBeInTheDocument();
      expect(screen.getByText(/19–20 December 2026 UTC/i)).toBeInTheDocument();
      expect(screen.getByText(/Days/i)).toBeInTheDocument();
      expect(screen.getByText(/Hours/i)).toBeInTheDocument();
    });
  });

  describe('EventCard', () => {
    it('renders event details, dates in UTC, mode badge, and point values', () => {
      const event1 = events[0];
      render(<EventCard event={event1} />);
      expect(screen.getByText('9A DX Contest 2026')).toBeInTheDocument();
      expect(screen.getByText('#1')).toBeInTheDocument();
      expect(screen.getByText('19–20 December 2026 UTC')).toBeInTheDocument();
      expect(screen.getByText('CW & SSB')).toBeInTheDocument();
      expect(screen.getByText('1000 pts')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /official website/i })).toHaveAttribute(
        'href',
        'https://9adx-contest.com/'
      );
    });

    it('renders primary region callout when primaryRegionValue is defined', () => {
      const event2 = events[1]; // ARRL DX CW
      render(<EventCard event={event2} />);
      expect(screen.getByText(/900 pts for W\/VE/i)).toBeInTheDocument();
    });
  });

  describe('QualifyingCalendar', () => {
    it('renders all 24 events by default with mode filter pills', () => {
      render(<QualifyingCalendar events={events} />);
      const cards = screen.getAllByTestId('event-card');
      expect(cards.length).toBe(24);

      expect(screen.getByRole('button', { name: /^all/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^cw/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^ssb/i })).toBeInTheDocument();
    });

    it('filters events when clicking CW mode pill', () => {
      render(<QualifyingCalendar events={events} />);
      const cwButton = screen.getByRole('button', { name: /^cw/i });
      fireEvent.click(cwButton);

      const cards = screen.getAllByTestId('event-card');
      // All CW events in Table 1
      const cwEvents = events.filter((e) => e.mode === 'CW');
      expect(cards.length).toBe(cwEvents.length);
      expect(screen.getByText('ARRL International DX Contest CW 2027')).toBeInTheDocument();
    });
  });
});
