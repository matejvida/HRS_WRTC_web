import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { CutoffRow } from '@/components/standings/CutoffRow';
import { StandingsTable } from '@/components/standings/StandingsTable';
import { StandingsExplorer } from '@/components/standings/StandingsExplorer';
import { getStandingsSnapshot } from '@/lib/standings-loader';

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(''),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  usePathname: () => '/competition/standings',
}));

describe('Standings Explorer Components (Story 3.2)', () => {
  const snapshot = getStandingsSnapshot();
  const eu6Area = snapshot.areas.find((a) => a.qaCode === 'EU #6')!;

  describe('CutoffRow', () => {
    it('renders the quota cutoff marker with quota label', () => {
      render(
        <table>
          <tbody>
            <CutoffRow quota={2} colSpan={6} />
          </tbody>
        </table>
      );
      expect(
        screen.getByText(/Top 2 Qualify as Automatic Team Leaders/i)
      ).toBeInTheDocument();
    });
  });

  describe('StandingsTable', () => {
    it('renders operator rankings and inserts CutoffRow at the correct position', () => {
      render(<StandingsTable area={eu6Area} onSelectOperator={() => {}} />);

      // Verify operators
      expect(screen.getByText('9A5W')).toBeInTheDocument();
      expect(screen.getByText('9A3XV')).toBeInTheDocument();
      expect(screen.getByText('9A1AA')).toBeInTheDocument();

      // Check Cutoff Line for EU #6 (quota = 4 in canonical Table 3)
      expect(
        screen.getByText(/Top 4 Qualify as Automatic Team Leaders/i)
      ).toBeInTheDocument();
    });
  });

  describe('StandingsExplorer', () => {
    it('renders region tabs and QA selector', () => {
      render(<StandingsExplorer snapshot={snapshot} />);
      expect(screen.getByRole('button', { name: /^all/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^europe/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^north america/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^youth/i })).toBeInTheDocument();
    }, 15000);

    it('filters operators when typing callsign into search field in < 200ms', () => {
      render(<StandingsExplorer snapshot={snapshot} />);
      const searchInput = screen.getByPlaceholderText(/search by callsign/i);

      const start = performance.now();
      fireEvent.change(searchInput, { target: { value: '9A5W' } });
      const duration = performance.now() - start;

      expect(duration).toBeLessThan(200);
      expect(screen.getAllByText('9A5W').length).toBeGreaterThan(0);
      expect(screen.queryByText('K1AA')).not.toBeInTheDocument();
    }, 15000);

    it('filters by region pill when clicked', () => {
      render(<StandingsExplorer snapshot={snapshot} />);
      const youthBtn = screen.getByRole('button', { name: /^youth/i });
      fireEvent.click(youthBtn);

      expect(screen.getAllByText('9A3YTH').length).toBeGreaterThan(0);
      expect(screen.queryByText('G4ABC')).not.toBeInTheDocument();
    }, 15000);
  });
});
