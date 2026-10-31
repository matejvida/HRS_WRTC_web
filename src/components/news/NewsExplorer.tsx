'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckerMark } from '@/components/brand/CheckerMark';
import type { NewsArticle, NewsCategory } from '@/lib/schemas/news.schema';

interface NewsExplorerProps {
  articles: NewsArticle[];
}

const CATEGORIES: ('All' | NewsCategory)[] = [
  'All',
  'Official Rules',
  'Organization',
  'Standings Update',
  'Venue',
];

export function NewsExplorer({ articles }: NewsExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | NewsCategory>('All');

  const filteredArticles =
    selectedCategory === 'All'
      ? articles
      : articles.filter((art) => art.category === selectedCategory);

  return (
    <div>
      {/* Category Filter Pills */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '28px',
        }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              className="category-filter-btn"
              onClick={() => setSelectedCategory(cat)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                fontWeight: 600,
                padding: '8px 16px',
                borderRadius: '999px',
                border: '1px solid var(--line)',
                background: isActive ? 'var(--accent)' : 'var(--card)',
                color: isActive ? 'var(--on-accent)' : 'var(--text)',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div
          style={{
            padding: '36px',
            textAlign: 'center',
            background: 'var(--card)',
            border: '1px solid var(--line)',
            borderRadius: '14px',
            color: 'var(--muted)',
          }}
        >
          No announcements found in this category.
        </div>
      ) : (
        <div className="news-cards">
          {filteredArticles.map((article) => {
            const isFeatured = Boolean(article.featured);
            return (
              <article
                key={article.slug}
                className={`news-card ${isFeatured ? 'news-card--featured' : ''}`}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                  }}
                >
                  <time
                    className="news-card__date"
                    dateTime={article.date}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: 'var(--muted)',
                    }}
                  >
                    {article.date}
                  </time>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      background: 'var(--surface)',
                      color: 'var(--accent)',
                      border: '1px solid var(--line)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    <CheckerMark size="sm" />
                    {article.category}
                  </span>
                </div>

                <h3 className="news-card__title">
                  <Link
                    href={`/news/${article.slug}`}
                    style={{ color: 'var(--text)', textDecoration: 'none' }}
                  >
                    {article.title}
                  </Link>
                </h3>

                <p style={{ color: 'var(--muted)', fontSize: '15px', margin: '4px 0 12px' }}>
                  {article.summary}
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
                  <Link
                    href={`/news/${article.slug}`}
                    style={{
                      fontWeight: 700,
                      fontSize: '14px',
                      color: 'var(--accent)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      textDecoration: 'none',
                    }}
                  >
                    <span>Read full announcement</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
