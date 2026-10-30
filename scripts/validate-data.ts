import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

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

  return {
    svgsChecked: REQUIRED_SVGS.length,
    pdfsChecked: REQUIRED_PDFS.length,
  };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  const result = validateAssets();
  console.log(
    `[validate:data] OK — verified ${result.svgsChecked} official brand SVGs and ${result.pdfsChecked} Selection Rules v1.0 PDFs.`
  );
}
