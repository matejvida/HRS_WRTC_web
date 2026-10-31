import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { PdfDownloadCard } from '@/components/rules/PdfDownloadCard';
import {
  Table1QualifyingEvents,
  Table2WeightingFactors,
  Table3QualifyingAreas,
  Table4SubAreas,
  Table5CategoryOrder,
  Table6QaChanges,
  Table7SpecialTeams,
} from '@/components/rules/RulesTables';
import { RulesToc, rulesSections } from '@/components/rules/RulesToc';
import { SelectionRulesTabs } from '@/components/rules/SelectionRulesTabs';

// Mock next/navigation for client components
vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(''),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  usePathname: () => '/competition/selection-rules',
}));

describe('Selection Rules Hub Components (Story 2.2)', () => {
  describe('PdfDownloadCard', () => {
    it('renders links to all three official PDFs with download attributes', () => {
      render(<PdfDownloadCard />);
      const link1 = screen.getByRole('link', { name: /wrtc 2030 selection rules v1\.0/i });
      const link2 = screen.getByRole('link', { name: /questions & answers/i });
      const link3 = screen.getByRole('link', { name: /score calculation examples/i });

      expect(link1).toHaveAttribute('href', '/files/wrtc-2030-selection-rules-v1.0.pdf');
      expect(link2).toHaveAttribute('href', '/files/wrtc-2030-selection-rules-qa-v1.0.pdf');
      expect(link3).toHaveAttribute('href', '/files/wrtc-2030-score-calculation-examples.pdf');

      expect(link1).toHaveAttribute('download');
      expect(link2).toHaveAttribute('download');
      expect(link3).toHaveAttribute('download');
    });
  });

  describe('RulesTables', () => {
    it('Table1QualifyingEvents renders all 24 events with font-mono and tabular-nums', () => {
      const { container } = render(<Table1QualifyingEvents />);
      const rows = container.querySelectorAll('tbody tr');
      expect(rows.length).toBe(24);

      expect(screen.getByText(/9A DX Contest 2026/i)).toBeInTheDocument();
      expect(screen.getByText(/CQ WW CW 2028/i)).toBeInTheDocument();

      const monoElements = container.querySelectorAll('.font-mono, .tabular-nums');
      expect(monoElements.length).toBeGreaterThan(0);
    });

    it('Table2WeightingFactors renders category multipliers', () => {
      render(<Table2WeightingFactors />);
      expect(screen.getByText(/Single Operator High Power/i)).toBeInTheDocument();
      expect(screen.getByText(/Multi-Operator Two Transmitter High Power/i)).toBeInTheDocument();
      expect(screen.getAllByText('1.00').length).toBeGreaterThan(0);
      expect(screen.getByText('0.85')).toBeInTheDocument();
    });

    it('Table3QualifyingAreas renders all 29 QAs and totals 50 qualifying teams', () => {
      const { container } = render(<Table3QualifyingAreas />);
      const rows = container.querySelectorAll('tbody tr');
      expect(rows.length).toBe(29);
      expect(screen.getByText(/EU #1/i)).toBeInTheDocument();
      expect(screen.getByText(/OC #2/i)).toBeInTheDocument();
      expect(screen.getByText(/50 Qualifying Teams/i)).toBeInTheDocument();
    });

    it('Table4SubAreas renders sub-area breakdowns for the 6 partitioned QAs', () => {
      render(<Table4SubAreas />);
      expect(screen.getByText(/AF #1/i)).toBeInTheDocument();
      expect(screen.getByText(/SA #2/i)).toBeInTheDocument();
      expect(screen.getByText(/NA #10/i)).toBeInTheDocument();
    });

    it('Table5CategoryOrder renders category preference order', () => {
      render(<Table5CategoryOrder />);
      expect(screen.getByText('MM')).toBeInTheDocument();
      expect(screen.getByText('The highest category in the order of reference results')).toBeInTheDocument();
      expect(screen.getByText('SO LP')).toBeInTheDocument();
    });

    it('Table6QaChanges renders qualification area change approval rules', () => {
      render(<Table6QaChanges />);
      expect(screen.getByText(/Temporarily operates from another QA/i)).toBeInTheDocument();
      expect(screen.getByText(/Approved Alternate Home QA/i)).toBeInTheDocument();
    });

    it('Table7SpecialTeams renders all 10 special teams allocation', () => {
      const { container } = render(<Table7SpecialTeams />);
      expect(screen.getByText('Defending Champions')).toBeInTheDocument();
      expect(screen.getByText('Youth Teams')).toBeInTheDocument();
      expect(screen.getByText('Sponsored Teams')).toBeInTheDocument();
      expect(screen.getByText('Wild Card Teams')).toBeInTheDocument();
      expect(screen.getByText(/10 Teams/i)).toBeInTheDocument();
    });
  });

  describe('RulesToc', () => {
    it('defines all 11 official sections', () => {
      expect(rulesSections.length).toBe(11);
      expect(rulesSections[0].title).toContain('Qualifying Events');
      expect(rulesSections[10].title).toContain('Questions and Clarifications');
    });

    it('renders TOC nav with 11 section anchor links and mobile details disclosure', () => {
      const { container } = render(<RulesToc />);
      const links = container.querySelectorAll('nav a');
      expect(links.length).toBeGreaterThanOrEqual(11);
      expect(container.querySelector('details.toc')).toBeInTheDocument();
      expect(container.querySelector('a[href="#section-1"]')).toBeInTheDocument();
      expect(container.querySelector('a[href="#section-11"]')).toBeInTheDocument();
    });
  });

  describe('SelectionRulesTabs', () => {
    it('renders three primary tabs: Selection Rules, Q&A, and Score Calculation Examples', () => {
      render(
        <SelectionRulesTabs
          rulesContent={<div data-testid="rules-content">Rules Content</div>}
          qaContent={<div data-testid="qa-content">QA Content</div>}
          examplesContent={<div data-testid="examples-content">Examples Content</div>}
        />
      );

      expect(screen.getByRole('tab', { name: /selection rules/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /questions & answers/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /score calculation examples/i })).toBeInTheDocument();
      expect(screen.getByTestId('rules-content')).toBeInTheDocument();
    });
  });
});
