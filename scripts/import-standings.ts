#!/usr/bin/env tsx

import fs from 'node:fs';
import path from 'node:path';
import { StandingsSnapshotSchema, type StandingsSnapshot } from '../src/lib/schemas/standings.schema';
import { parseStandingsCsv } from '../src/lib/standings-loader';

function parseArgs(): { filePath: string; outPath: string } {
  const args = process.argv.slice(2);
  let filePath = '';
  let outPath = path.join(process.cwd(), 'data/standings/latest.json');

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--file' || args[i] === '-f') {
      filePath = args[++i];
    } else if (args[i] === '--out' || args[i] === '-o') {
      outPath = args[++i];
    } else if (!filePath && !args[i].startsWith('-')) {
      filePath = args[i];
    }
  }

  if (!filePath) {
    console.error('Usage: tsx scripts/import-standings.ts --file <path-to-csv-or-json> [--out <destination.json>]');
    process.exit(1);
  }

  return { filePath, outPath };
}

export function importStandingsFile(filePath: string, outPath: string): StandingsSnapshot {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Input file not found: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, 'utf8');
  let snapshot: StandingsSnapshot;

  if (filePath.endsWith('.csv')) {
    const areas = parseStandingsCsv(content);
    snapshot = {
      version: '1.0.0',
      generatedAt: new Date().toISOString(),
      description: `Ingested standings from ${path.basename(filePath)}`,
      areas,
    };
  } else {
    snapshot = JSON.parse(content);
  }

  // Strict validation
  const validated = StandingsSnapshotSchema.parse(snapshot);

  const outDir = path.dirname(outPath);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(outPath, JSON.stringify(validated, null, 2));
  console.log(`[import-standings] Successfully validated & written ${validated.areas.length} areas to ${outPath}`);
  return validated;
}

if (require.main === module || process.argv[1]?.endsWith('import-standings.ts')) {
  const { filePath, outPath } = parseArgs();
  try {
    importStandingsFile(filePath, outPath);
  } catch (err) {
    console.error('[import-standings] FAILED:', err);
    process.exit(1);
  }
}
