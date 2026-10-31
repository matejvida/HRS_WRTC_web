import { describe, it, expect } from 'vitest';
import {
  NewsFrontmatterSchema,
  NewsArticleSchema,
} from '@/lib/schemas/news.schema';
import {
  parseMarkdownFrontmatter,
  getAllNewsPosts,
  getNewsPostBySlug,
  generateRssFeedXml,
} from '@/lib/news-loader';

describe('News Engine & Schema (Story 1.3)', () => {
  it('validates a valid news frontmatter object', () => {
    const valid = {
      title: 'WRTC 2030 Qualification Rules Officially Approved and Published',
      date: '2026-10-19',
      category: 'Official Rules',
      summary: 'The WRTC Sanctioning Committee has approved Selection Rules v1.0.',
      slug: 'wrtc-2030-selection-rules-v1-approved',
      author: 'The WRTC 2030 Organizing Committee',
      featured: true,
    };
    expect(() => NewsFrontmatterSchema.parse(valid)).not.toThrow();
  });

  it('rejects news frontmatter with invalid category or date', () => {
    const invalidCategory = {
      title: 'Invalid',
      date: '2026-10-19',
      category: 'Unrecognized Category',
      summary: 'Summary',
      slug: 'test-slug',
      author: 'WRTC OC',
    };
    expect(() => NewsFrontmatterSchema.parse(invalidCategory)).toThrow();

    const invalidDate = {
      title: 'Invalid Date',
      date: '19-10-2026',
      category: 'Official Rules',
      summary: 'Summary',
      slug: 'test-slug',
      author: 'WRTC OC',
    };
    expect(() => NewsFrontmatterSchema.parse(invalidDate)).toThrow();
  });

  it('correctly parses markdown with YAML frontmatter', () => {
    const markdown = `---
title: Test Title
date: 2026-10-19
category: Official Rules
summary: A test summary
slug: test-article
author: WRTC OC
featured: true
---

# Headline

This is the content of the article.`;

    const { frontmatter, content } = parseMarkdownFrontmatter(markdown);
    expect(frontmatter.title).toBe('Test Title');
    expect(frontmatter.date).toBe('2026-10-19');
    expect(frontmatter.category).toBe('Official Rules');
    expect(frontmatter.featured).toBe(true);
    expect(content).toContain('This is the content of the article.');
  });

  it('loads all seed news articles from content/news sorted newest-first', () => {
    const articles = getAllNewsPosts();
    expect(articles.length).toBeGreaterThanOrEqual(3);

    // Verify sorted descending by date
    for (let i = 0; i < articles.length - 1; i++) {
      const current = new Date(articles[i].date).getTime();
      const next = new Date(articles[i + 1].date).getTime();
      expect(current).toBeGreaterThanOrEqual(next);
    }

    // Verify all articles pass NewsArticleSchema
    for (const article of articles) {
      expect(() => NewsArticleSchema.parse(article)).not.toThrow();
      expect(article.slug).toBeTruthy();
      expect(article.content.length).toBeGreaterThan(10);
    }
  });

  it('finds an article by slug and returns null for invalid slug', () => {
    const article = getNewsPostBySlug('wrtc-2030-selection-rules-v1-approved');
    expect(article).not.toBeNull();
    expect(article?.title).toContain('Selection Rules');

    const nonExistent = getNewsPostBySlug('this-slug-does-not-exist');
    expect(nonExistent).toBeNull();
  });

  it('generates valid RSS 2.0 XML with all articles', () => {
    const articles = getAllNewsPosts();
    const xml = generateRssFeedXml(articles);

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain('<title>WRTC 2030 Croatia Official News</title>');
    expect(xml).toContain('<link>https://wrtc2030.hr/news</link>');

    for (const article of articles) {
      expect(xml).toContain(`<title><![CDATA[${article.title}]]></title>`);
      expect(xml).toContain(`https://wrtc2030.hr/news/${article.slug}`);
    }
  });
});
