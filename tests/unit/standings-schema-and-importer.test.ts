import { describe, it, expect } from 'vitest';
import {
  ContestEntrySchema,
  OperatorStandingSchema,
  AreaStandingsSchema,
  StandingsSnapshotSchema,
  type StandingsSnapshot,
} from '@/lib/schemas/standings.schema';
import { getStandingsSnapshot, parseStandingsCsv } from '@/lib/standings-loader';

describe('Standings Schema & Importer (Story 3.1)', () => {
  const baseValidEntry = {
    eventId: 1,
    contestName: '9A DX Contest 2026',
    category: 'SO HP',
    isMultiOp: false,
    isOutsideQa: false,
    weightingFactor: 1.0,
    rawScore: 2500000,
    qaMaxScore: 3000000,
    calculatedPoints: 833.33,
    isCounted: true,
  };

  const baseValidOperator = {
    callsign: '9A5W',
    name: 'Nikola',
    country: 'Croatia',
    dxcc: '9A',
    qaCode: 'EU #6',
    rank: 1,
    totalPoints: 833.33,
    countedEventsCount: 1,
    entries: [baseValidEntry],
  };

  const baseValidArea = {
    qaCode: 'EU #6',
    qaName: 'South-Eastern Europe',
    allocatedTeams: 3,
    standings: [baseValidOperator],
  };

  const baseValidSnapshot: StandingsSnapshot = {
    version: '1.0.0',
    generatedAt: '2026-10-31T08:00:00Z',
    description: 'Pre-Season Simulation Snapshot',
    areas: [baseValidArea],
  };

  it('validates a conformant standings snapshot', () => {
    expect(() => StandingsSnapshotSchema.parse(baseValidSnapshot)).not.toThrow();
  });

  it('rejects operator standing with more than 10 counted events', () => {
    const elevenCountedEntries = Array.from({ length: 11 }, (_, i) => ({
      ...baseValidEntry,
      eventId: i + 1,
      calculatedPoints: 800,
      isCounted: true,
    }));

    const invalidOperator = {
      ...baseValidOperator,
      countedEventsCount: 11,
      entries: elevenCountedEntries,
    };

    const invalidSnapshot = {
      ...baseValidSnapshot,
      areas: [{ ...baseValidArea, standings: [invalidOperator] }],
    };

    expect(() => StandingsSnapshotSchema.parse(invalidSnapshot)).toThrow(
      /cannot exceed 10/i
    );
  });

  it('rejects operator standing with more than 3 counted Multi-Op events (§5.A)', () => {
    const fourMultiOpEntries = Array.from({ length: 4 }, (_, i) => ({
      ...baseValidEntry,
      eventId: i + 1,
      isMultiOp: true,
      category: 'MS',
      calculatedPoints: 750,
      isCounted: true,
    }));

    const invalidOperator = {
      ...baseValidOperator,
      countedEventsCount: 4,
      entries: fourMultiOpEntries,
    };

    const invalidSnapshot = {
      ...baseValidSnapshot,
      areas: [{ ...baseValidArea, standings: [invalidOperator] }],
    };

    expect(() => StandingsSnapshotSchema.parse(invalidSnapshot)).toThrow(
      /multi-op/i
    );
  });

  it('rejects operator standing with more than 3 counted Outside-QA events (§5.B)', () => {
    const fourOutsideQaEntries = Array.from({ length: 4 }, (_, i) => ({
      ...baseValidEntry,
      eventId: i + 1,
      isOutsideQa: true,
      calculatedPoints: 800,
      isCounted: true,
    }));

    const invalidOperator = {
      ...baseValidOperator,
      countedEventsCount: 4,
      entries: fourOutsideQaEntries,
    };

    const invalidSnapshot = {
      ...baseValidSnapshot,
      areas: [{ ...baseValidArea, standings: [invalidOperator] }],
    };

    expect(() => StandingsSnapshotSchema.parse(invalidSnapshot)).toThrow(
      /outside-qa/i
    );
  });

  it('rejects Youth operator with more than 6 counted events', () => {
    const sevenCountedEntries = Array.from({ length: 7 }, (_, i) => ({
      ...baseValidEntry,
      eventId: i + 1,
      calculatedPoints: 800,
      isCounted: true,
    }));

    const youthOperator = {
      ...baseValidOperator,
      qaCode: 'YOUTH',
      countedEventsCount: 7,
      entries: sevenCountedEntries,
    };

    const youthArea = {
      qaCode: 'YOUTH',
      qaName: 'Youth Teams (Under 25)',
      allocatedTeams: 3,
      standings: [youthOperator],
    };

    const invalidSnapshot = {
      ...baseValidSnapshot,
      areas: [youthArea],
    };

    expect(() => StandingsSnapshotSchema.parse(invalidSnapshot)).toThrow(
      /youth.*6/i
    );
  });

  it('parses valid CSV text into an AreaStandings structure', () => {
    const csvContent = `callsign,name,country,dxcc,qaCode,subAreaCode,eventId,contestName,category,isMultiOp,isOutsideQa,weightingFactor,rawScore,qaMaxScore,calculatedPoints,isCounted
9A5W,Nikola,Croatia,9A,EU #6,,1,9A DX Contest 2026,SO HP,false,false,1.0,2500000,3000000,833.33,true
9A1AA,Ivo,Croatia,9A,EU #6,,1,9A DX Contest 2026,SO LP,false,false,0.9,1500000,2000000,675.00,true`;

    const parsed = parseStandingsCsv(csvContent);
    expect(parsed.length).toBeGreaterThan(0);
    expect(parsed[0].qaCode).toBe('EU #6');
    expect(parsed[0].standings.length).toBe(2);
    expect(parsed[0].standings[0].rank).toBe(1);
    expect(parsed[0].standings[0].callsign).toBe('9A5W');
    expect(parsed[0].standings[1].rank).toBe(2);
    expect(parsed[0].standings[1].callsign).toBe('9A1AA');
  });

  it('loads and validates the pre-season example simulation snapshot', () => {
    const snapshot = getStandingsSnapshot();
    expect(() => StandingsSnapshotSchema.parse(snapshot)).not.toThrow();

    // Must contain 29 QAs + YOUTH
    expect(snapshot.areas.length).toBeGreaterThanOrEqual(29);

    // Verify key worked-example operators from Selection Rules PDF
    const allOperators = snapshot.areas.flatMap((a) => a.standings);
    const callsigns = allOperators.map((o) => o.callsign);

    expect(callsigns).toContain('G4ABC');
    expect(callsigns).toContain('CN8AA');
    expect(callsigns).toContain('ZS6XYZ');
    expect(callsigns).toContain('HK3A');
    expect(callsigns).toContain('CE3BB');
    expect(callsigns).toContain('OH2A');
    expect(callsigns).toContain('K1AA');
    expect(callsigns).toContain('VE1BBB');
    expect(callsigns).toContain('VE4AAA');
    expect(callsigns).toContain('KL7YY');
  });
});
