import { describe, it, expect } from 'vitest';
import {
  QualifyingEventListSchema,
  QualifyingAreaListSchema,
  WeightingFactorsSchema,
  SpecialTeamListSchema,
} from '@/lib/schemas/rules.schema';
import {
  getQualifyingEvents,
  getQualifyingAreas,
  getWeightingFactors,
  getSpecialTeams,
} from '@/lib/rules-loader';

describe('Canonical Rules Datasets & Zod Validation (Story 2.1)', () => {
  it('validates and loads all 24 Qualifying Events (Table 1)', () => {
    const events = getQualifyingEvents();
    expect(events).toHaveLength(24);

    // Verify IDs 1 through 24 in sequential order
    events.forEach((ev, idx) => {
      expect(ev.id).toBe(idx + 1);
      expect(ev.name).toBeTruthy();
      expect(ev.mode).toMatch(/CW|SSB|Mixed|CW & SSB/);
      expect(ev.value).toBeGreaterThanOrEqual(800);
      expect(ev.value).toBeLessThanOrEqual(1000);
      expect(ev.year).toBeGreaterThanOrEqual(2026);
      expect(ev.year).toBeLessThanOrEqual(2028);
    });

    // Opening event is 9A DX Contest 2026
    expect(events[0].name).toContain('9A DX Contest');
    expect(events[0].year).toBe(2026);
    expect(events[0].value).toBe(1000);

    // Final event is CQ WW DX CW 2028
    expect(events[23].name).toContain('CQ World Wide DX Contest CW');
    expect(events[23].shortName).toContain('CQ WW CW');
    expect(events[23].year).toBe(2028);
    expect(events[23].value).toBe(1000);
  });

  it('validates 29 Qualifying Areas with exactly 50 total teams allocated (Table 3)', () => {
    const qas = getQualifyingAreas();
    expect(qas.length).toBe(29);

    const totalAllocatedTeams = qas.reduce(
      (sum, qa) => sum + qa.allocatedTeams,
      0
    );
    expect(totalAllocatedTeams).toBe(50);

    // Verify Continental breakdown: EU=23, NA=16, AS=5, AF=2, SA=2, OC=2
    const continentSums = qas.reduce<Record<string, number>>((acc, qa) => {
      acc[qa.continent] = (acc[qa.continent] || 0) + qa.allocatedTeams;
      return acc;
    }, {});

    expect(continentSums['Europe']).toBe(23);
    expect(continentSums['North America']).toBe(16);
    expect(continentSums['Asia']).toBe(5);
    expect(continentSums['Africa']).toBe(2);
    expect(continentSums['South America']).toBe(2);
    expect(continentSums['Oceania']).toBe(2);
  });

  it('verifies Sub-Areas defined in Table 4 for subdivided QAs', () => {
    const qas = getQualifyingAreas();
    const subdividedQas = qas.filter((qa) => qa.hasSubAreas);

    expect(subdividedQas.length).toBeGreaterThanOrEqual(6); // EU #1, NA #1, NA #6, NA #10, AF #1, SA #2
    const eu1 = qas.find((qa) => qa.code === 'EU #1');
    expect(eu1?.hasSubAreas).toBe(true);
    expect(eu1?.subAreas).toHaveLength(2); // North and South
    expect(eu1?.subAreas?.[0].name).toContain('North');

    const na1 = qas.find((qa) => qa.code === 'NA #1');
    expect(na1?.hasSubAreas).toBe(true);
    expect(na1?.subAreas).toHaveLength(3); // W1, W2, W3
  });

  it('validates Category Weighting Factors and hierarchy (Table 2 & Table 5)', () => {
    const wf = getWeightingFactors();
    expect(wf.categories).toBeDefined();

    // Verify SO HP is 1.00 and SO LP is 0.90
    const soHp = wf.categories.find((c) => c.code === 'SO HP');
    expect(soHp?.weight).toBe(1.0);

    const soLp = wf.categories.find((c) => c.code === 'SO LP');
    expect(soLp?.weight).toBe(0.9);

    const ms = wf.categories.find((c) => c.code === 'MS');
    expect(ms?.weight).toBe(0.9);

    const mm = wf.categories.find((c) => c.code === 'MM');
    expect(mm?.weight).toBe(0.75);

    // Verify Table 5 category hierarchy has MM at rank 1
    expect(wf.categoryOrder[0].code).toBe('MM');
    expect(wf.categoryOrder[wf.categoryOrder.length - 1].code).toBe('SO LP');
  });

  it('validates Special Teams allocating exactly 10 teams (Table 7)', () => {
    const special = getSpecialTeams();
    const totalSpecial = special.reduce((sum, s) => sum + s.allocatedTeams, 0);
    expect(totalSpecial).toBe(10);

    const defending = special.find((s) => s.code === 'defending');
    expect(defending?.allocatedTeams).toBe(1);

    const youth = special.find((s) => s.code === 'youth');
    expect(youth?.allocatedTeams).toBe(3);

    const sponsored = special.find((s) => s.code === 'sponsored');
    expect(sponsored?.allocatedTeams).toBe(4);

    const wildCard = special.find((s) => s.code === 'wildcard');
    expect(wildCard?.allocatedTeams).toBe(2);
  });

  it('rejects malformed QA dataset where allocated teams do not sum to 50', () => {
    const badQas = [
      {
        code: 'EU #1',
        name: 'Europe 1',
        continent: 'Europe',
        allocatedTeams: 10,
        countriesDescription: 'Test',
        hasSubAreas: false,
      },
    ];
    expect(() => QualifyingAreaListSchema.parse(badQas)).toThrow(
      /must equal exactly 50/i
    );
  });
});
