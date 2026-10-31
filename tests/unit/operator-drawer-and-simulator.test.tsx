import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OperatorBreakdownDrawer } from '@/components/standings/OperatorBreakdownDrawer';
import { PreSeasonSimulator } from '@/components/standings/PreSeasonSimulator';
import type { OperatorStanding } from '@/lib/schemas/standings.schema';

const mockOperator: OperatorStanding = {
  callsign: '9A5W',
  name: 'Nikola',
  country: 'Croatia',
  dxcc: '9A',
  qaCode: 'EU #6',
  rank: 1,
  totalPoints: 950.0,
  countedEventsCount: 1,
  entries: [
    {
      eventId: 1,
      contestName: '9A DX Contest',
      category: 'SOAB HP CW',
      isMultiOp: false,
      isOutsideQa: false,
      weightingFactor: 1.0,
      rawScore: 950000,
      qaMaxScore: 1000000,
      calculatedPoints: 950.0,
      isCounted: true,
    },
    {
      eventId: 2,
      contestName: 'CQ World Wide DX Contest CW',
      category: 'M/S',
      isMultiOp: true,
      isOutsideQa: false,
      weightingFactor: 0.9,
      rawScore: 700000,
      qaMaxScore: 1000000,
      calculatedPoints: 630.0,
      isCounted: false,
    },
  ],
};

describe('OperatorBreakdownDrawer (Story 3.3)', () => {
  it('renders operator header, contest scores, and badges when open', () => {
    render(<OperatorBreakdownDrawer operator={mockOperator} isOpen={true} onClose={vi.fn()} />);

    expect(screen.getByRole('dialog', { name: /Operator Score Breakdown for 9A5W/i })).toBeInTheDocument();
    expect(screen.getByText('9A5W')).toBeInTheDocument();
    expect(screen.getByText(/Nikola/)).toBeInTheDocument();
    expect(screen.getByText(/Croatia/)).toBeInTheDocument();
    expect(screen.getAllByText(/950\.00 pts/i).length).toBeGreaterThan(0);

    // Entries
    expect(screen.getByText('9A DX Contest')).toBeInTheDocument();
    expect(screen.getByText('CQ World Wide DX Contest CW')).toBeInTheDocument();

    // Counted and Dropped badges
    expect(screen.getAllByText(/Counted/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Dropped/i).length).toBeGreaterThan(0);
  });

  it('invokes onClose when close button is clicked', async () => {
    const handleClose = vi.fn();
    render(<OperatorBreakdownDrawer operator={mockOperator} isOpen={true} onClose={handleClose} />);

    const closeBtn = screen.getByRole('button', { name: /Close drawer/i });
    await userEvent.click(closeBtn);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('invokes onClose when Escape key is pressed', () => {
    const handleClose = vi.fn();
    render(<OperatorBreakdownDrawer operator={mockOperator} isOpen={true} onClose={handleClose} />);

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('renders null or hidden when isOpen is false', () => {
    render(<OperatorBreakdownDrawer operator={mockOperator} isOpen={false} onClose={vi.fn()} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('PreSeasonSimulator (Story 3.3)', () => {
  it('calculates points instantaneously with formula trace', async () => {
    render(<PreSeasonSimulator />);

    expect(screen.getByText(/Pre-Season Score Simulator/i)).toBeInTheDocument();

    // Verify default or input calculation renders a points number with 2 decimals
    const pointsDisplays = screen.getAllByText(/\d+\.\d{2} pts/i);
    expect(pointsDisplays.length).toBeGreaterThan(0);
  });

  it('correctly calculates 640.00 pts for EF=0.80, MF=1.0, OF=1.0, Score=4M, Leader=5M', async () => {
    render(<PreSeasonSimulator />);

    // Select EF = 0.80
    const efSelect = screen.getByLabelText(/Event Factor/i);
    fireEvent.change(efSelect, { target: { value: '0.80' } });

    // Set operator score
    const opScoreInput = screen.getByLabelText(/Your Raw Score/i);
    fireEvent.change(opScoreInput, { target: { value: '4000000' } });

    // Set leader score
    const leaderScoreInput = screen.getByLabelText(/QA Leader Raw Score/i);
    fireEvent.change(leaderScoreInput, { target: { value: '5000000' } });

    // 1000 * 0.80 * 1.0 * 1.0 * 1.0 * (4M / 5M) = 640.00 pts
    expect(screen.getAllByText(/640\.00 pts/i).length).toBeGreaterThan(0);
  });

  it('caps score ratio at 1.00 when raw score exceeds leader score', () => {
    render(<PreSeasonSimulator />);

    const opScoreInput = screen.getByLabelText(/Your Raw Score/i);
    fireEvent.change(opScoreInput, { target: { value: '6000000' } });

    const leaderScoreInput = screen.getByLabelText(/QA Leader Raw Score/i);
    fireEvent.change(leaderScoreInput, { target: { value: '5000000' } });

    // Ratio capped at 1.00 -> base 1000 * 1.0 = 1000.00 pts (not 1200 pts)
    expect(screen.getAllByText(/1000\.00 pts/i).length).toBeGreaterThan(0);
  });

  it('safely handles zero leader score without division by zero', () => {
    render(<PreSeasonSimulator />);

    const leaderScoreInput = screen.getByLabelText(/QA Leader Raw Score/i);
    fireEvent.change(leaderScoreInput, { target: { value: '0' } });

    expect(screen.getAllByText(/0\.00 pts/i).length).toBeGreaterThan(0);
  });
});
