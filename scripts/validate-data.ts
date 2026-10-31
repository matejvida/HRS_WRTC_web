import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  CommitteeListSchema,
  PastEventListSchema,
} from '../src/lib/schemas/homepage-data.schema';
import {
  NewsArticleSchema,
  NewsFrontmatterSchema,
} from '../src/lib/schemas/news.schema';
import {
  QualifyingEventListSchema,
  QualifyingAreaListSchema,
  WeightingFactorsSchema,
  SpecialTeamListSchema,
} from '../src/lib/schemas/rules.schema';
import { StandingsSnapshotSchema } from '../src/lib/schemas/standings.schema';
import { SponsorsDataSchema } from '../src/lib/schemas/sponsors.schema';
import { parseMarkdownFrontmatter } from '../src/lib/news-loader';

const ROOT = process.cwd();

const REQUIRED_SVGS = [
  'public/brand/wrtc-logo.svg',
  'public/brand/wrtc-logo-white.svg',
  'public/brand/hrs-logo.svg',
];

const REQUIRED_PDFS = [
  'public/files/wrtc-2030-selection-rules-v1.0.pdf',
  'public/files/wrtc-2030-selection-rules-qa-v1.0.pdf',
  'public/files/wrtc-2030-score-calculation-examples.pdf',
];

export function validateAssets(rootDir: string = ROOT): {
  svgsChecked: number;
  pdfsChecked: number;
  committeeMembersChecked: number;
  pastEventsChecked: number;
  newsArticlesChecked: number;
  rulesEventsChecked: number;
  qualifyingAreasChecked: number;
  specialTeamsChecked: number;
  standingsAreasChecked: number;
  sponsorTiersChecked: number;
} {
  for (const relPath of REQUIRED_SVGS) {
    const fullPath = path.join(rootDir, relPath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Missing required brand SVG asset: ${relPath}`);
    }
    const content = fs.readFileSync(fullPath, 'utf8');
    if (!content.includes('<svg') || !content.includes('</svg>')) {
      throw new Error(`Invalid SVG markup in ${relPath}`);
    }
  }

  for (const relPath of REQUIRED_PDFS) {
    const fullPath = path.join(rootDir, relPath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Missing required official PDF document: ${relPath}`);
    }
    const stat = fs.statSync(fullPath);
    if (stat.size < 100) {
      throw new Error(`PDF document ${relPath} is empty or truncated (${stat.size} bytes)`);
    }
    const fd = fs.openSync(fullPath, 'r');
    const headerBuf = Buffer.alloc(5);
    fs.readSync(fd, headerBuf, 0, 5, 0);
    fs.closeSync(fd);
    const header = headerBuf.toString('ascii');
    if (header !== '%PDF-') {
      throw new Error(`Invalid PDF header in ${relPath}: expected "%PDF-", got "${header}"`);
    }
  }

  const committeePath = path.join(rootDir, 'data/committee.json');
  if (!fs.existsSync(committeePath)) {
    throw new Error('Missing required dataset: data/committee.json');
  }
  const committeeData = CommitteeListSchema.parse(
    JSON.parse(fs.readFileSync(committeePath, 'utf8'))
  );

  const pastEventsPath = path.join(rootDir, 'data/past-events.json');
  if (!fs.existsSync(pastEventsPath)) {
    throw new Error('Missing required dataset: data/past-events.json');
  }
  const pastEventsData = PastEventListSchema.parse(
    JSON.parse(fs.readFileSync(pastEventsPath, 'utf8'))
  );

  const newsDir = path.join(rootDir, 'content/news');
  if (!fs.existsSync(newsDir)) {
    throw new Error('Missing required directory: content/news');
  }
  const newsFiles = fs.readdirSync(newsDir).filter((file) => file.endsWith('.md'));
  if (newsFiles.length === 0) {
    throw new Error('No news articles found in content/news');
  }

  for (const filename of newsFiles) {
    const raw = fs.readFileSync(path.join(newsDir, filename), 'utf8');
    const { frontmatter, content } = parseMarkdownFrontmatter(raw);
    const parsedFrontmatter = NewsFrontmatterSchema.parse(frontmatter);
    NewsArticleSchema.parse({
      ...parsedFrontmatter,
      content,
    });
  }

  // Canonical Rules Datasets (Story 2.1 / AD-5)
  const eventsPath = path.join(rootDir, 'data/rules/qualifying-events.json');
  if (!fs.existsSync(eventsPath)) {
    throw new Error('Missing canonical rules dataset: data/rules/qualifying-events.json');
  }
  const events = QualifyingEventListSchema.parse(
    JSON.parse(fs.readFileSync(eventsPath, 'utf8'))
  );

  const wfPath = path.join(rootDir, 'data/rules/weighting-factors.json');
  if (!fs.existsSync(wfPath)) {
    throw new Error('Missing canonical rules dataset: data/rules/weighting-factors.json');
  }
  WeightingFactorsSchema.parse(
    JSON.parse(fs.readFileSync(wfPath, 'utf8'))
  );

  const qasPath = path.join(rootDir, 'data/rules/qualifying-areas.json');
  if (!fs.existsSync(qasPath)) {
    throw new Error('Missing canonical rules dataset: data/rules/qualifying-areas.json');
  }
  const qas = QualifyingAreaListSchema.parse(
    JSON.parse(fs.readFileSync(qasPath, 'utf8'))
  );

  const specialPath = path.join(rootDir, 'data/rules/special-teams.json');
  if (!fs.existsSync(specialPath)) {
    throw new Error('Missing canonical rules dataset: data/rules/special-teams.json');
  }
  const special = SpecialTeamListSchema.parse(
    JSON.parse(fs.readFileSync(specialPath, 'utf8'))
  );

  const simStandingsPath = path.join(rootDir, 'data/standings/example-simulation.json');
  if (!fs.existsSync(simStandingsPath)) {
    throw new Error('Missing required dataset: data/standings/example-simulation.json');
  }
  const standingsData = StandingsSnapshotSchema.parse(
    JSON.parse(fs.readFileSync(simStandingsPath, 'utf8'))
  );

  const sponsorsPath = path.join(rootDir, 'data/sponsors.json');
  if (!fs.existsSync(sponsorsPath)) {
    throw new Error('Missing required dataset: data/sponsors.json');
  }
  const sponsorsData = SponsorsDataSchema.parse(
    JSON.parse(fs.readFileSync(sponsorsPath, 'utf8'))
  );

  return {
    svgsChecked: REQUIRED_SVGS.length,
    pdfsChecked: REQUIRED_PDFS.length,
    committeeMembersChecked: committeeData.length,
    pastEventsChecked: pastEventsData.length,
    newsArticlesChecked: newsFiles.length,
    rulesEventsChecked: events.length,
    qualifyingAreasChecked: qas.length,
    specialTeamsChecked: special.length,
    standingsAreasChecked: standingsData.areas.length,
    sponsorTiersChecked: sponsorsData.tiers.length,
  };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  const result = validateAssets();
  console.log(
    `[validate:data] OK — verified ${result.svgsChecked} brand SVGs, ${result.pdfsChecked} Selection Rules PDFs, ${result.committeeMembersChecked} OC members, ${result.pastEventsChecked} Past WRTCs, ${result.newsArticlesChecked} news articles, ${result.rulesEventsChecked} qualifying events, ${result.qualifyingAreasChecked} QAs (50 slots), ${result.specialTeamsChecked} special team categories, ${result.standingsAreasChecked} simulation standings areas, and ${result.sponsorTiersChecked} sponsor tiers.`
  );
}
