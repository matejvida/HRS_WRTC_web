import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SponsorTierGrid } from '@/components/sponsors/SponsorTierGrid';
import { SponsoredTeamNotice } from '@/components/sponsors/SponsoredTeamNotice';
import { SponsorsDataSchema } from '@/lib/schemas/sponsors.schema';
import sponsorsData from '@/../data/sponsors.json';

describe('Sponsors Hub Data & Components (Story 4.2)', () => {
  it('validates canonical data/sponsors.json against Zod schema', () => {
    const parsed = SponsorsDataSchema.safeParse(sponsorsData);
    expect(parsed.success).toBe(true);
    if (!parsed.success) {
      console.error(parsed.error);
    }
  });

  it('renders Institutional Host (HRS) with official link', () => {
    render(<SponsorTierGrid data={sponsorsData} />);

    expect(screen.getByText(/Croatian Amateur Radio Association/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Hrvatski radioamaterski savez/i).length).toBeGreaterThan(0);

    const hrsLink = screen.getByRole('link', { name: /Visit HRS Official Site/i });
    expect(hrsLink).toHaveAttribute('href', 'https://www.hamradio.hr/');
  });

  it('renders sponsorship tiers and direct mailto inquiry links', () => {
    render(<SponsorTierGrid data={sponsorsData} />);

    expect(screen.getAllByText(/Principal Partners/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Equipment & Technology/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Contest Clubs & DX Foundations/i).length).toBeGreaterThan(0);

    const mailtoLinks = screen.getAllByRole('link', { name: /Inquire/i });
    expect(mailtoLinks.length).toBeGreaterThan(0);
    expect(mailtoLinks[0].getAttribute('href')).toContain('mailto:wrtc2030@hamradio.hr');
  });

  it('renders Rule 8.D notice regarding 4 Sponsored Teams opening in 2029', () => {
    render(<SponsoredTeamNotice />);

    expect(screen.getByText(/Selection Rules v1\.0 Section 8\.D/i)).toBeInTheDocument();
    expect(screen.getAllByText(/4 Sponsored Teams/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/1 January 2029/i)).toBeInTheDocument();
  });

  it('strictly adheres to AD-6 non-transactional invariants (no payment checkouts, no crowdfunding bars)', () => {
    const { container } = render(
      <div>
        <SponsorTierGrid data={sponsorsData} />
        <SponsoredTeamNotice />
      </div>
    );

    // No <progress> elements (no crowdfunding meters)
    expect(container.querySelectorAll('progress').length).toBe(0);

    // No checkout forms or payment inputs
    expect(container.querySelectorAll('input[type="submit"], button[type="submit"]').length).toBe(0);

    // Zero references to crowdfunding or bidding
    const textContent = container.textContent || '';
    expect(textContent).not.toMatch(/crowdfunding|kickstarter|gofundme|bid now|tent reservation grid/i);
  });
});
