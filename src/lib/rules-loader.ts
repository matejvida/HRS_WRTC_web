import fs from 'node:fs';
import path from 'node:path';
import {
  QualifyingEventListSchema,
  QualifyingAreaListSchema,
  WeightingFactorsSchema,
  SpecialTeamListSchema,
  type QualifyingEvent,
  type QualifyingArea,
  type WeightingFactors,
  type SpecialTeam,
} from './schemas/rules.schema';

const ROOT = process.cwd();

export function getQualifyingEvents(rootDir: string = ROOT): QualifyingEvent[] {
  const filePath = path.join(rootDir, 'data/rules/qualifying-events.json');
  if (!fs.existsSync(filePath)) {
    throw new Error('Missing canonical rules dataset: data/rules/qualifying-events.json');
  }
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return QualifyingEventListSchema.parse(raw);
}

export function getWeightingFactors(rootDir: string = ROOT): WeightingFactors {
  const filePath = path.join(rootDir, 'data/rules/weighting-factors.json');
  if (!fs.existsSync(filePath)) {
    throw new Error('Missing canonical rules dataset: data/rules/weighting-factors.json');
  }
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return WeightingFactorsSchema.parse(raw);
}

export function getQualifyingAreas(rootDir: string = ROOT): QualifyingArea[] {
  const filePath = path.join(rootDir, 'data/rules/qualifying-areas.json');
  if (!fs.existsSync(filePath)) {
    throw new Error('Missing canonical rules dataset: data/rules/qualifying-areas.json');
  }
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return QualifyingAreaListSchema.parse(raw);
}

export function getSpecialTeams(rootDir: string = ROOT): SpecialTeam[] {
  const filePath = path.join(rootDir, 'data/rules/special-teams.json');
  if (!fs.existsSync(filePath)) {
    throw new Error('Missing canonical rules dataset: data/rules/special-teams.json');
  }
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return SpecialTeamListSchema.parse(raw);
}
