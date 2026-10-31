import fs from 'node:fs';
import path from 'node:path';
import {
  StandingsSnapshotSchema,
  type StandingsSnapshot,
  type AreaStandings,
  type OperatorStanding,
  type ContestEntry,
} from './schemas/standings.schema';
import { getQualifyingAreas } from './rules-loader';

const ROOT = process.cwd();

export function parseStandingsCsv(csvText: string): AreaStandings[] {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map((h) => h.trim());
  const rows = lines.slice(1).filter((l) => l.trim().length > 0);

  // Group by qaCode -> callsign
  const qaMap = new Map<string, Map<string, { opInfo: Partial<OperatorStanding>; entries: ContestEntry[] }>>();

  for (const row of rows) {
    const cols = row.split(',').map((c) => c.trim());
    const rowObj: Record<string, string> = {};
    headers.forEach((h, i) => {
      rowObj[h] = cols[i] ?? '';
    });

    const callsign = rowObj.callsign;
    const qaCode = rowObj.qaCode;
    if (!callsign || !qaCode) continue;

    if (!qaMap.has(qaCode)) {
      qaMap.set(qaCode, new Map());
    }
    const opMap = qaMap.get(qaCode)!;

    if (!opMap.has(callsign)) {
      opMap.set(callsign, {
        opInfo: {
          callsign,
          name: rowObj.name || undefined,
          country: rowObj.country || 'Unknown',
          dxcc: rowObj.dxcc || 'Unknown',
          qaCode,
          subAreaCode: rowObj.subAreaCode || undefined,
        },
        entries: [],
      });
    }

    const opRecord = opMap.get(callsign)!;
    const isCounted = rowObj.isCounted === 'true';

    opRecord.entries.push({
      eventId: Number(rowObj.eventId || 1),
      contestName: rowObj.contestName || 'Contest',
      category: rowObj.category || 'SO HP',
      isMultiOp: rowObj.isMultiOp === 'true',
      isOutsideQa: rowObj.isOutsideQa === 'true',
      weightingFactor: Number(rowObj.weightingFactor || 1.0),
      rawScore: Number(rowObj.rawScore || 0),
      qaMaxScore: Number(rowObj.qaMaxScore || 1),
      calculatedPoints: Number(rowObj.calculatedPoints || 0),
      isCounted,
    });
  }

  // Lookup canonical quotas
  let canonicalAreas: { code: string; name: string; allocatedTeams: number }[] = [];
  try {
    canonicalAreas = getQualifyingAreas();
  } catch {
    canonicalAreas = [];
  }

  const result: AreaStandings[] = [];

  for (const [qaCode, opMap] of qaMap.entries()) {
    const areaMeta = canonicalAreas.find((a) => a.code === qaCode);
    const qaName = areaMeta?.name || (qaCode === 'YOUTH' ? 'Youth Teams (Under 25)' : qaCode);
    const allocatedTeams = areaMeta?.allocatedTeams || (qaCode === 'YOUTH' ? 3 : 1);

    const operators: OperatorStanding[] = [];

    for (const [callsign, record] of opMap.entries()) {
      const countedEntries = record.entries.filter((e) => e.isCounted);
      const totalPoints = Number(
        countedEntries.reduce((acc, curr) => acc + curr.calculatedPoints, 0).toFixed(2)
      );

      operators.push({
        callsign,
        name: record.opInfo.name,
        country: record.opInfo.country || 'Unknown',
        dxcc: record.opInfo.dxcc || 'Unknown',
        qaCode,
        subAreaCode: record.opInfo.subAreaCode,
        rank: 1, // temporary, will sort next
        totalPoints,
        countedEventsCount: countedEntries.length,
        entries: record.entries,
      });
    }

    // Sort by totalPoints descending
    operators.sort((a, b) => b.totalPoints - a.totalPoints);

    // Assign rank
    operators.forEach((op, idx) => {
      op.rank = idx + 1;
    });

    result.push({
      qaCode,
      qaName,
      allocatedTeams,
      standings: operators,
    });
  }

  return result;
}

export function getStandingsSnapshot(rootDir: string = ROOT): StandingsSnapshot {
  const latestPath = path.join(rootDir, 'data/standings/latest.json');
  const simPath = path.join(rootDir, 'data/standings/example-simulation.json');

  const filePath = fs.existsSync(latestPath) ? latestPath : simPath;

  if (!fs.existsSync(filePath)) {
    throw new Error(`Standings snapshot not found: neither ${latestPath} nor ${simPath} exist.`);
  }

  const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return StandingsSnapshotSchema.parse(raw);
}

export function getStandingsForQa(qaCode: string, rootDir: string = ROOT): AreaStandings | undefined {
  const snapshot = getStandingsSnapshot(rootDir);
  return snapshot.areas.find(
    (a) => a.qaCode.toLowerCase() === qaCode.toLowerCase()
  );
}
