import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ZodError } from 'zod';
import {
  CommitteeListSchema,
  PastEventListSchema,
  EXPECTED_OC_CALLSIGNS,
} from '@/lib/schemas/homepage-data.schema';
import { getCommitteeMembers, getPastEvents } from '@/lib/content-loader';
import { validateAssets } from '../../scripts/validate-data';
import HomePage from '@/app/page';

describe('Story 1.2 — Zod Schema Validation & Data Loaders (FR-11, AD-1, AD-4)', () => {
  it('validates all 11 Organizing Committee members (9A4M..9A6PAX) and historical WRTC editions (1990 Seattle..2026 UK)', () => {
    const result = validateAssets();
    expect(result.svgsChecked).toBe(3);
    expect(result.pdfsChecked).toBe(3);
    expect(result.committeeMembersChecked).toBe(11);
    expect(result.pastEventsChecked).toBeGreaterThanOrEqual(9);

    const members = getCommitteeMembers();
    expect(members).toHaveLength(11);
    expect(members.map((m) => m.callsign)).toEqual([...EXPECTED_OC_CALLSIGNS]);
    expect(members[0].name).toBe('Mate Botica');
    expect(members[10].name).toBe('Marija Sorić');

    const pastEvents = getPastEvents();
    expect(pastEvents.length).toBeGreaterThanOrEqual(9);
    expect(pastEvents[0].year).toBe(1990);
    expect(pastEvents[0].hostCity).toContain('Seattle');
    expect(pastEvents[pastEvents.length - 1].year).toBe(2026);
    expect(pastEvents[pastEvents.length - 1].location).toContain('2026 UK');
  });

  it('throws descriptive ZodError if any OC member is missing or malformed', () => {
    const validMembers = getCommitteeMembers();

    // Missing member (10 instead of 11)
    expect(() => CommitteeListSchema.parse(validMembers.slice(0, 10))).toThrow(
      ZodError
    );

    // Missing required callsign (replacing 9A6PAX with a different callsign)
    const missing9A6PAX = validMembers.map((m, idx) =>
      idx === 10 ? { ...m, callsign: '9A9ZZ' } : m
    );
    expect(() => CommitteeListSchema.parse(missing9A6PAX)).toThrow(
      /Missing required Organizing Committee member callsign: 9A6PAX/
    );

    // Malformed callsign format
    const malformedCallsign = validMembers.map((m, idx) =>
      idx === 0 ? { ...m, callsign: 'invalid_call!' } : m
    );
    expect(() => CommitteeListSchema.parse(malformedCallsign)).toThrow(ZodError);
  });

  it('throws descriptive ZodError if any Past WRTC edition is missing or has malformed callsigns/URLs', () => {
    const validEvents = getPastEvents();

    // Missing required historical year (e.g., removing 2018 Wittenberg)
    const without2018 = validEvents.filter((e) => e.year !== 2018);
    expect(() => PastEventListSchema.parse(without2018)).toThrow(
      /Missing required historical WRTC edition year: 2018/
    );

    // Malformed archive URL
    const badUrl = validEvents.map((e, idx) =>
      idx === 0 ? { ...e, archiveUrl: 'not-a-valid-url' } : e
    );
    expect(() => PastEventListSchema.parse(badUrl)).toThrow(ZodError);

    // Malformed champion callsign list
    const singleChampion = validEvents.map((e, idx) =>
      idx === 0 ? { ...e, champions: ['K1AR'] } : e
    );
    expect(() => PastEventListSchema.parse(singleChampion)).toThrow(ZodError);
  });
});

describe('Story 1.2 — Homepage Sections: Hero, Live Event #1 Ticker, About WRTC, Slavonia, OC Roster & Past WRTCs', () => {
  it('renders Proposal 1 Hero, Kockice Mosaic SVG, Championship Brief card, and Live Event #1 Ticker bar', () => {
    const { container } = render(<HomePage />);

    // Hero & Kockice Mosaic SVG
    expect(container.querySelector('svg.p1-kockice-mosaic')).not.toBeNull();
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /THE OLYMPICS OF AMATEUR RADIO ARRIVES IN CROATIA/i,
      })
    ).toBeInTheDocument();

    // Official Championship Brief card with 9A · CROATIA & CheckerFive
    const briefCard = screen.getByRole('complementary', {
      name: /Official Championship Brief/i,
    });
    expect(within(briefCard).getByText('9A · CROATIA')).toBeInTheDocument();
    expect(briefCard.querySelector('.checker-five')).not.toBeNull();

    // Dedicated Live Event #1 Countdown / Telemetry Ticker bar
    const ticker = container.querySelector('.ticker-bar');
    expect(ticker).not.toBeNull();
    expect(ticker?.textContent).toMatch(/9A DX Contest — Dec 19–20, 2026 UTC/i);
  });

  it('renders the complete About WRTC section (2 operators, 24h, ~4M radio amateurs, 60 identical field stations) and Slavonia showcase (Osijek · Čepin · Đakovo)', () => {
    const { container } = render(<HomePage />);

    const aboutSection = container.querySelector('#about');
    expect(aboutSection).not.toBeNull();
    expect(aboutSection?.textContent).toMatch(/2 operators/i);
    expect(aboutSection?.textContent).toMatch(/24h/i);
    expect(aboutSection?.textContent).toMatch(/~4M radio amateurs/i);
    expect(aboutSection?.textContent).toMatch(/60 identical field stations/i);

    const slavoniaSection = container.querySelector('#slavonia');
    expect(slavoniaSection).not.toBeNull();
    expect(slavoniaSection?.textContent).toMatch(/Osijek · Čepin · Đakovo/i);
  });

  it('renders all 11 Organizing Committee members in #team with initials avatars and JetBrains Mono callsign badges', () => {
    const { container } = render(<HomePage />);

    const teamSection = container.querySelector('#team') as HTMLElement;
    expect(teamSection).not.toBeNull();

    const members = getCommitteeMembers();
    const personCards = teamSection.querySelectorAll('.person');
    expect(personCards).toHaveLength(11);

    for (const member of members) {
      expect(within(teamSection).getByText(member.callsign)).toHaveClass(
        'font-mono-tabular'
      );
      expect(within(teamSection).getByText(member.name)).toBeInTheDocument();
      expect(within(teamSection).getByText(member.role)).toBeInTheDocument();
      expect(within(teamSection).getByText(member.initials)).toBeInTheDocument();
    }
  });

  it('renders all historical WRTC editions (1990 Seattle through 2026 UK) in #past-events with JetBrains Mono champion callsign badges and external archive links', () => {
    const { container } = render(<HomePage />);

    const pastSection = container.querySelector('#past-events') as HTMLElement;
    expect(pastSection).not.toBeNull();

    const pastEvents = getPastEvents();
    const eventCards = pastSection.querySelectorAll('.past-event-card');
    expect(eventCards).toHaveLength(pastEvents.length);

    expect(pastSection.textContent).toContain('1990 Seattle');
    expect(pastSection.textContent).toContain('2026 UK');

    for (const ev of pastEvents) {
      for (const champCall of ev.champions) {
        const badges = within(pastSection).getAllByText(champCall);
        expect(badges.length).toBeGreaterThanOrEqual(1);
        expect(badges[0]).toHaveClass('font-mono-tabular');
      }
    }

    const archiveLinks = pastSection.querySelectorAll('a[target="_blank"]');
    expect(archiveLinks.length).toBe(pastEvents.length);
    archiveLinks.forEach((link) => {
      expect(link.getAttribute('rel')).toContain('noopener');
      expect(link.getAttribute('rel')).toContain('noreferrer');
    });

    // AD-6: Never introduce interactive 60-tent picking grids or crowdfunding progress bars
    expect(container.querySelector('[role="progressbar"]')).toBeNull();
    expect(container.querySelector('progress')).toBeNull();
  });
});
