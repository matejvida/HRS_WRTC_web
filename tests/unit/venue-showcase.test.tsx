import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PropagationArena } from '@/components/venue/PropagationArena';
import { DestinationCards } from '@/components/venue/DestinationCards';
import { GastronomyGuide } from '@/components/venue/GastronomyGuide';
import { TravelTransitTable } from '@/components/venue/TravelTransitTable';

describe('Venue Showcase Components (Story 4.1)', () => {
  it('renders technical propagation arena specifications', () => {
    render(<PropagationArena />);

    expect(screen.getByText(/Pannonian Propagation Arena/i)).toBeInTheDocument();
    expect(screen.getAllByText(/0°/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/85m.*110m/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/60/).length).toBeGreaterThan(0);
  });

  it('renders curated destination cards for Osijek, Đakovo, Čepin, and Kopački Rit', () => {
    render(<DestinationCards />);

    expect(screen.getByRole('heading', { name: /Osijek/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Tvrđa/i).length).toBeGreaterThan(0);

    expect(screen.getByRole('heading', { name: /Đakovo/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Lipizzaner/i).length).toBeGreaterThan(0);

    expect(screen.getByRole('heading', { name: /Čepin/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Kopački Rit/i })).toBeInTheDocument();
  });

  it('renders Slavonian culinary and wine guide', () => {
    render(<GastronomyGuide />);

    expect(screen.getAllByText(/Slavonski Kulen/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Fiš Paprikaš/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Čobanac/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Graševina/i).length).toBeGreaterThan(0);
  });

  it('renders international travel transit table with 4 airports and A5 corridor', () => {
    render(<TravelTransitTable />);

    expect(screen.getByText(/Osijek Airport/i)).toBeInTheDocument();
    expect(screen.getAllByText(/OSI/).length).toBeGreaterThan(0);

    expect(screen.getByText(/Zagreb Airport/i)).toBeInTheDocument();
    expect(screen.getAllByText(/ZAG/).length).toBeGreaterThan(0);

    expect(screen.getByText(/Budapest Ferenc Liszt/i)).toBeInTheDocument();
    expect(screen.getAllByText(/BUD/).length).toBeGreaterThan(0);

    expect(screen.getByText(/Belgrade Nikola Tesla/i)).toBeInTheDocument();
    expect(screen.getAllByText(/BEG/).length).toBeGreaterThan(0);

    expect(screen.getByText(/A5 Slavonika/i)).toBeInTheDocument();
  });
});
