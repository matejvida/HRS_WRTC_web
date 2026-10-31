import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckerMark, CheckerStrip, KockiceCluster } from '@/components/brand/CheckerMark';
import { NewsExplorer } from '@/components/news/NewsExplorer';
import { getAllNewsPosts } from '@/lib/news-loader';

export const dynamic = 'error';

export const metadata: Metadata = {
  title: 'News & Official Announcements | WRTC 2030 Croatia',
  description:
    'Chronological official news, qualification updates, and organizing committee releases for WRTC 2030 in Slavonia, Croatia.',
};

export default function NewsPage() {
  const articles = getAllNewsPosts();

  return (
    <main style={{ paddingBlock: '48px 80px' }}>
      <div className="wrap">
        {/* Page Header */}
        <div
          style={{
            borderBottom: '1px solid var(--line)',
            paddingBottom: '24px',
            marginBottom: '36px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div>
            <div className="kicker" style={{ marginBottom: '10px' }}>
              <CheckerMark size="md" />
              <span>OFFICIAL WRTC 2030 DISPATCHES · RSS FEED ENABLED</span>
            </div>
            <h1 className="section__title">News &amp; Announcements</h1>
            <p style={{ color: 'var(--muted)', fontSize: '18px', marginTop: '8px' }}>
              Official releases from the WRTC 2030 Organizing Committee and Sanctioning Committee.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link
              href="/feed.xml"
              target="_blank"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent)',
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                textDecoration: 'none',
              }}
            >
              <span>RSS Feed</span>
              <span aria-hidden="true">📡</span>
            </Link>
            <CheckerStrip />
            <KockiceCluster />
          </div>
        </div>

        {/* Interactive News Explorer */}
        <NewsExplorer articles={articles} />
      </div>
    </main>
  );
}
