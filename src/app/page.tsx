import React from 'react';
import {
  CheckerMark,
  CheckerFive,
  CheckerRibbon,
  CheckerStrip,
  KockiceCluster,
} from '@/components/brand/CheckerMark';

export const dynamic = 'error';

export default function HomePage() {
  return (
    <main id="top">
      <CheckerRibbon />

      {/* 1. Hero Announcement — Proposal 1: Dynamic "Kockice & 9A Airwaves" */}
      <section className="hero-kockice" id="announcement">
        <svg
          className="p1-kockice-mosaic"
          viewBox="0 0 460 460"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect x="380" y="0" width="80" height="80" fill="#ED1C24" fillOpacity="0.28" />
          <rect x="300" y="80" width="80" height="80" fill="#ED1C24" fillOpacity="0.22" />
          <rect x="220" y="0" width="80" height="80" fill="#FFFFFF" fillOpacity="0.06" />
          <rect x="380" y="160" width="80" height="80" fill="#ED1C24" fillOpacity="0.18" />
          <rect x="220" y="160" width="80" height="80" fill="#ED1C24" fillOpacity="0.12" />
          <rect x="300" y="240" width="80" height="80" fill="#ED1C24" fillOpacity="0.15" />
          <rect x="140" y="240" width="80" height="80" fill="#FFFFFF" fillOpacity="0.04" />
          <rect x="380" y="320" width="80" height="80" fill="#ED1C24" fillOpacity="0.10" />
          <rect x="220" y="320" width="80" height="80" fill="#FFFFFF" fillOpacity="0.05" />
          <circle
            cx="420"
            cy="220"
            r="160"
            stroke="#FFFFFF"
            strokeOpacity="0.14"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <circle
            cx="420"
            cy="220"
            r="260"
            stroke="#FFFFFF"
            strokeOpacity="0.09"
            strokeWidth="1.5"
          />
          <circle
            cx="420"
            cy="220"
            r="360"
            stroke="#ED1C24"
            strokeOpacity="0.25"
            strokeWidth="1.5"
          />
        </svg>

        <div className="wrap hero-grid">
          <div>
            <div className="hero-kicker-pill">
              <CheckerMark size="md" />
              <span>OSIJEK · ČEPIN · ĐAKOVO | JULY 2030 | CALLSIGN PREFIX 9A</span>
            </div>

            <h1 className="hero-title">
              THE OLYMPICS OF AMATEUR RADIO ARRIVES IN{' '}
              <span className="red-highlight">CROATIA</span>
            </h1>

            <p className="hero-lead">
              The WRTC Sanctioning Committee has awarded the organization of WRTC 2030
              to the <strong>Croatian Amateur Radio Association (HRS)</strong>. In July
              2030, <strong>60 teams (120 of the world&apos;s top contesters)</strong>{' '}
              will gather in the northeastern region of{' '}
              <strong>Slavonia — Osijek, Čepin, and Đakovo</strong>.
            </p>

            <p className="hero-text">
              All teams compete head-to-head continuously for 24 hours under identical
              technical conditions — creating a level playing field on the flat
              Pannonian plains where operating skill, strategy, teamwork, and endurance
              determine the world champions.
            </p>

            <div className="callout-box" id="qualifying-events">
              <CheckerMark size="lg" />
              <span>
                Qualifying Event #1 of 24: 9A DX Contest (19–20 December 2026 UTC)
              </span>
            </div>
          </div>

          <aside className="aside-card" aria-label="Official Championship Brief">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'wrap',
                marginBottom: '16px',
                paddingBottom: '14px',
                borderBottom: '1px solid rgba(255,255,255,0.14)',
              }}
            >
              <span className="kicker" style={{ color: '#ff6b70' }}>
                <CheckerMark size="sm" />
                Official Championship Brief
              </span>
              <span
                className="font-mono-tabular"
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  background: '#ED1C24',
                  color: '#FFFFFF',
                  padding: '3px 9px',
                  borderRadius: '4px',
                }}
              >
                9A · CROATIA
              </span>
            </div>

            <dl>
              <div className="facts__row">
                <dt>Event</dt>
                <dd>WRTC 2030 Croatia</dd>
              </div>
              <div className="facts__row">
                <dt>Host Region</dt>
                <dd>Slavonia (Osijek, Čepin, Đakovo)</dd>
              </div>
              <div className="facts__row">
                <dt>Dates</dt>
                <dd>July 2030 (IARU HF Weekend)</dd>
              </div>
              <div className="facts__row">
                <dt>Competing Teams</dt>
                <dd className="font-mono-tabular">60 Identical Field Stations</dd>
              </div>
              <div className="facts__row">
                <dt>Qualification Cycle</dt>
                <dd className="font-mono-tabular">24 Contests (Dec 2026 – Nov 2028)</dd>
              </div>
              <div className="facts__row">
                <dt>Organizer</dt>
                <dd>
                  <a
                    href="https://www.hamradio.hr"
                    style={{ color: '#8ea2ff' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    HRS (hamradio.hr)
                  </a>
                </dd>
              </div>
            </dl>

            <div
              style={{
                marginTop: '16px',
                paddingTop: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '12px', color: '#9fb0e8' }}>
                Sanctioned Oct 3, 2026 in Poreč · Rules v1.0 Approved Oct 19, 2026
              </span>
              <CheckerFive />
            </div>
          </aside>
        </div>
      </section>

      {/* Official Selection Rules v1.0 Documents Section */}
      <section className="section" id="selection-rules">
        <div className="wrap" id="competition">
          <div className="section__head section__head--split" id="standings">
            <div>
              <p className="kicker">
                <CheckerMark size="sm" />
                Official Documentation · Selection Rules v1.0
              </p>
              <h2 className="section__title">Road to Slavonia 2030</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CheckerStrip />
              <KockiceCluster />
            </div>
          </div>

          <div className="rules-grid" id="news">
            <article className="rule-card" id="slavonia">
              <span className="kicker">Document 1 · 19 Oct 2026</span>
              <h3>WRTC 2030 Selection Rules v1.0</h3>
              <p style={{ color: 'var(--muted)', fontSize: '15px' }}>
                Official qualification criteria across 29 Qualification Areas, 24
                qualifying contests, Youth &amp; Sponsored Team rules.
              </p>
              <a
                href="/files/wrtc-2030-selection-rules-v1.0.pdf"
                download
                style={{ fontWeight: 700, marginTop: 'auto' }}
              >
                Download Official PDF →
              </a>
            </article>

            <article className="rule-card" id="sponsors">
              <span className="kicker">Document 2 · Official FAQ</span>
              <h3>Selection Rules Questions &amp; Answers (v1.0)</h3>
              <p style={{ color: 'var(--muted)', fontSize: '15px' }}>
                Official clarifications on Outside-QA operations, Multi-Op caps, Sub-Area
                leader calculations, and residency rules.
              </p>
              <a
                href="/files/wrtc-2030-selection-rules-qa-v1.0.pdf"
                download
                style={{ fontWeight: 700, marginTop: 'auto' }}
              >
                Download Official PDF →
              </a>
            </article>

            <article className="rule-card">
              <span className="kicker">Document 3 · Worked Examples</span>
              <h3>Score Calculation Examples</h3>
              <p style={{ color: 'var(--muted)', fontSize: '15px' }}>
                Step-by-step worked examples of Event Factor (EF), Category Weighting
                Factor (WF), and Sub-Area score ratios.
              </p>
              <a
                href="/files/wrtc-2030-score-calculation-examples.pdf"
                download
                style={{ fontWeight: 700, marginTop: 'auto' }}
              >
                Download Official PDF →
              </a>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
