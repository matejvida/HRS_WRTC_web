import fs from 'node:fs';
import path from 'node:path';
import {
  CommitteeListSchema,
  PastEventListSchema,
  type CommitteeMember,
  type PastEvent,
} from '@/lib/schemas/homepage-data.schema';

const ROOT = process.cwd();

export function getCommitteeMembers(rootDir: string = ROOT): CommitteeMember[] {
  const filePath = path.join(rootDir, 'data/committee.json');
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required Organizing Committee dataset: data/committee.json`);
  }
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return CommitteeListSchema.parse(raw);
}

export function getPastEvents(rootDir: string = ROOT): PastEvent[] {
  const filePath = path.join(rootDir, 'data/past-events.json');
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required Past WRTC dataset: data/past-events.json`);
  }
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return PastEventListSchema.parse(raw);
}
