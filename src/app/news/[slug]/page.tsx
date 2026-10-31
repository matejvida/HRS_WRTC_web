import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckerMark, CheckerFive, CheckerStrip } from '@/components/brand/CheckerMark';
import { getAllNewsPosts, getNewsPostBySlug } from '@/lib/news-loader';

export const dynamic = 'error';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllNewsPosts();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsPostBySlug(slug);
  if (!article) {
    return {
      title: 'Article Not Found | WRTC 2030 Croatia',
    };
  }

  return {
    title: `${article.title} | WRTC 2030 News`,
    description: article.summary,
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getNewsPostBySlug(slug);

  if (!article) {
    notFound();
  }

  // Format content paragraphs and clean markdown headers
  const contentParagraphs = article.content
    .split('\n\n')
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  return (
    <main style={{ paddingBlock: '48px 88px' }}>
      <div className="wrap" style={{ maxWidth: '840px' }}>
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '28px' }}>
          <Link
            href="/news"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--accent)',
              fontWeight: 700,
              fontSize: '15px',
              textDecoration: 'none',
            }}
          >
            <span aria-hidden="true">←</span>
            <span>Back to All Announcements</span>
          </Link>
        </div>

        {/* Article Card Wrapper */}
        <article
          style={{
            background: 'var(--card)',
            border: '1px solid var(--line)',
            borderTop: '4px solid var(--red)',
            borderRadius: '16px',
            padding: '36px',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.04)',
          }}
        >
          {/* Metadata Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              borderBottom: '1px solid var(--line)',
              paddingBottom: '18px',
              marginBottom: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
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

              <time
                dateTime={article.date}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'var(--muted)',
                }}
              >
                {article.date}
              </time>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckerFive />
            </div>
          </div>

          {/* Article Title */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '44px',
              fontWeight: 800,
              textTransform: 'uppercase',
              lineHeight: 1.05,
              margin: '0 0 16px',
              color: 'var(--text)',
            }}
          >
            {article.title}
          </h1>

          {/* Author Badge */}
          <p
            style={{
              fontSize: '14px',
              color: 'var(--muted)',
              fontFamily: 'var(--font-mono)',
              marginBottom: '28px',
            }}
          >
            Published by <strong>{article.author}</strong>
          </p>

          <CheckerStrip />

          {/* Render Markdown Content Body */}
          <div
            style={{
              fontSize: '17px',
              lineHeight: 1.7,
              color: 'var(--text)',
              marginTop: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}
          >
            {contentParagraphs.map((para, idx) => {
              if (para.startsWith('# ')) {
                // Main heading already rendered above
                return null;
              }
              if (para.startsWith('## ')) {
                return (
                  <h2
                    key={idx}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '28px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      marginTop: '20px',
                      marginBottom: '4px',
                      color: 'var(--text)',
                    }}
                  >
                    {para.replace('## ', '')}
                  </h2>
                );
              }
              if (para.startsWith('- ')) {
                const listItems = para.split('\n').map((item) => item.replace(/^[-\*]\s+/, ''));
                return (
                  <ul key={idx} style={{ paddingLeft: '24px', margin: 0 }}>
                    {listItems.map((li, liIdx) => (
                      <li key={liIdx} style={{ marginBottom: '8px' }}>
                        {li}
                      </li>
                    ))}
                  </ul>
                );
              }
              return <p key={idx}>{para}</p>;
            })}
          </div>

          {/* Footer Back Link & Citation */}
          <div
            style={{
              marginTop: '40px',
              paddingTop: '24px',
              borderTop: '1px solid var(--line)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <Link
              href="/news"
              style={{
                fontWeight: 700,
                color: 'var(--accent)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>← Return to Dispatches</span>
            </Link>
            <span style={{ fontSize: '13px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
              WRTC 2030 Croatia Official Announcement
            </span>
          </div>
        </article>
      </div>
    </main>
  );
}
