import fs from 'node:fs';
import path from 'node:path';
import {
  NewsArticleSchema,
  NewsFrontmatterSchema,
  type NewsArticle,
} from './schemas/news.schema';

const ROOT = process.cwd();

export function parseMarkdownFrontmatter(fileContent: string): {
  frontmatter: Record<string, any>;
  content: string;
} {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    throw new Error('Markdown file does not contain valid YAML frontmatter delimiters (---)');
  }

  const rawYaml = match[1];
  const content = match[2].trim();
  const frontmatter: Record<string, any> = {};

  for (const line of rawYaml.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) continue;
    const key = trimmed.slice(0, colonIndex).trim();
    let val = trimmed.slice(colonIndex + 1).trim();

    // Strip wrapping quotes
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    } else if (val === 'true') {
      frontmatter[key] = true;
      continue;
    } else if (val === 'false') {
      frontmatter[key] = false;
      continue;
    }
    frontmatter[key] = val;
  }

  return { frontmatter, content };
}

export function getAllNewsPosts(rootDir: string = ROOT): NewsArticle[] {
  const newsDir = path.join(rootDir, 'content/news');
  if (!fs.existsSync(newsDir)) {
    return [];
  }

  const filenames = fs.readdirSync(newsDir).filter((file) => file.endsWith('.md'));
  const articles: NewsArticle[] = [];

  for (const filename of filenames) {
    const filePath = path.join(newsDir, filename);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { frontmatter, content } = parseMarkdownFrontmatter(raw);

    const parsedFrontmatter = NewsFrontmatterSchema.parse(frontmatter);
    const article = NewsArticleSchema.parse({
      ...parsedFrontmatter,
      content,
    });
    articles.push(article);
  }

  // Sort descending by date (newest first)
  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return articles;
}

export function getNewsPostBySlug(
  slug: string,
  rootDir: string = ROOT
): NewsArticle | null {
  const articles = getAllNewsPosts(rootDir);
  const found = articles.find((art) => art.slug === slug);
  return found || null;
}

export function generateRssFeedXml(
  articles: NewsArticle[],
  siteUrl: string = 'https://wrtc2030.hr'
): string {
  const channelTitle = 'WRTC 2030 Croatia Official News';
  const channelLink = `${siteUrl}/news`;
  const channelDesc =
    'Official announcements, qualification updates, and rules releases for the World Radiosport Team Championship 2030 in Croatia.';
  const lastBuildDate = new Date().toUTCString();

  const itemsXml = articles
    .map((art) => {
      const pubDate = new Date(`${art.date}T12:00:00Z`).toUTCString();
      const articleUrl = `${siteUrl}/news/${art.slug}`;
      return `    <item>
      <title><![CDATA[${art.title}]]></title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${art.summary}]]></description>
      <category><![CDATA[${art.category}]]></category>
      <author><![CDATA[${art.author}]]></author>
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${channelTitle}</title>
    <link>${channelLink}</link>
    <description>${channelDesc}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;
}
