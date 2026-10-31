import React from 'react';
import Link from 'next/link';
import {
  CheckerMark,
  CheckerFive,
  CheckerRibbon,
  CheckerStrip,
  KockiceCluster,
} from '@/components/brand/CheckerMark';
import { getCommitteeMembers, getPastEvents } from '@/lib/content-loader';
import { getAllNewsPosts } from '@/lib/news-loader';

export const dynamic = 'error';

export default function HomePage() {
  const committee = getCommitteeMembers();
  const pastEvents = getPastEvents();
  const latestNews = getAllNewsPosts().slice(0, 2);

  return (
    <main id="main-content">
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

            <div className="callout-box">
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
                    aria-label="HRS official website (hamradio.hr) (opens in a new tab)"
                  >
                    HRS (hamradio.hr) <span aria-hidden="true">↗</span>
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

      {/* 2. Dedicated Live Qualifying Event #1 Countdown / Telemetry Ticker Bar */}
      <div className="ticker-bar" id="qualifying-events">
        <div className="wrap ticker-bar__inner">
          <div className="ticker-badge">
            <CheckerMark size="sm" />
            <span>Qualifying Event #1 of 24</span>
          </div>
          <div className="ticker-event">
            <strong>9A DX Contest — Dec 19–20, 2026 UTC</strong> (Opening Event · 1,000 pts · CW &amp; SSB)
          </div>
          <div className="ticker-meta font-mono-tabular">
            19–20 December 2026 UTC · EF 0.80
          </div>
          <Link
            href="/competition/qualifying-events"
            style={{
              marginLeft: 'auto',
              fontWeight: 700,
              fontSize: '13px',
              color: 'var(--brand-red)',
              whiteSpace: 'nowrap',
            }}
          >
            Full 24-Contest Calendar →
          </Link>
        </div>
      </div>

      {/* 2.5. Latest News Ribbon (Story 1.3) */}
      <section className="news-ribbon" id="news">
        <div className="wrap news-ribbon__grid">
          <div>
            <h2 className="kicker">
              <CheckerMark size="sm" />
              <span>Latest News</span>
            </h2>
            <div style={{ marginTop: '12px' }}>
              <Link
                href="/news"
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span>View all announcements</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="news-cards">
            {latestNews.map((article) => (
              <article
                key={article.slug}
                className={`news-card ${article.featured ? 'news-card--featured' : ''}`}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                  }}
                >
                  <time className="news-card__date" dateTime={article.date}>
                    {article.date}
                  </time>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 8px',
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

                <p style={{ color: 'var(--muted)', fontSize: '15px', margin: '4px 0 10px' }}>
                  {article.summary}
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '6px' }}>
                  <Link
                    href={`/news/${article.slug}`}
                    style={{
                      fontWeight: 700,
                      fontSize: '14px',
                      color: 'var(--accent)',
                      textDecoration: 'none',
                    }}
                  >
                    Read full announcement →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. About WRTC & 60-Team Format Section */}
      <section className="section" id="about">
        <div className="wrap">
          <div className="about-grid">
            <div>
              <p className="kicker">
                <CheckerMark size="sm" />
                About WRTC
              </p>
              <h2 className="section__title">World Radiosport Team Championship</h2>
              <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.6, marginBottom: '16px' }}>
                The <strong>World Radiosport Team Championship (WRTC)</strong> is the pinnacle of competitive amateur radio contesting. Every four years, the world&apos;s elite operators qualify through an arduous multi-year cycle and gather at a single host venue to compete under identical conditions.
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.6 }}>
                In Slavonia 2030, <strong>60 identical field stations</strong> will be deployed across flat Pannonian agricultural terrain, equipped with identical transceivers, matching antennas, and independent on-site referees. For 24 continuous hours, operating skill, propagation strategy, teamwork, and endurance determine the world champions.
              </p>
            </div>

            <div className="about-stats-grid">
              <div className="about-stat-card">
                <div className="about-stat-card__val font-mono-tabular">2 operators</div>
                <div className="about-stat-card__label">per team (Team Leader &amp; Teammate)</div>
              </div>
              <div className="about-stat-card">
                <div className="about-stat-card__val font-mono-tabular">24h</div>
                <div className="about-stat-card__label">continuous non-stop competition</div>
              </div>
              <div className="about-stat-card">
                <div className="about-stat-card__val font-mono-tabular">~4M radio amateurs</div>
                <div className="about-stat-card__label">worldwide supporting the airwaves</div>
              </div>
              <div className="about-stat-card">
                <div className="about-stat-card__val font-mono-tabular">60 identical field stations</div>
                <div className="about-stat-card__label">across Osijek, Čepin &amp; Đakovo</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Slavonia, Croatia Venue Showcase */}
      <section className="section" id="slavonia">
        <div className="wrap">
          <div className="section__head section__head--split">
            <div>
              <p className="kicker">
                <CheckerMark size="sm" />
                Host Region &amp; Venue · Slavonia, Croatia
              </p>
              <h2 className="section__title">Osijek · Čepin · Đakovo</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CheckerStrip />
              <KockiceCluster />
            </div>
          </div>

          <div className="slavonia-grid">
            <article className="venue-card">
              <div className="venue-card__head">
                <span className="kicker">
                  <CheckerMark size="sm" />
                  Level Playing Field
                </span>
                <CheckerFive />
              </div>
              <h3 className="venue-card__title">Pannonian Propagation Arena</h3>
              <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6 }}>
                The flat agricultural plains spanning <strong>Osijek, Čepin, and Đakovo</strong> provide uniform soil conductivity, unobstructed 360° low-angle horizons, and equalized propagation across all 60 stations.
              </p>
            </article>

            <article className="venue-card">
              <div className="venue-card__head">
                <span className="kicker">
                  <CheckerMark size="sm" />
                  Culture &amp; Heritage
                </span>
                <CheckerFive />
              </div>
              <h3 className="venue-card__title">Heart of Golden Slavonia</h3>
              <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6 }}>
                Experience Osijek&apos;s 18th-century baroque <strong>Tvrđa</strong> fortress on the Drava River, Đakovo&apos;s majestic St. Peter&apos;s Cathedral and State Lipizzaner Stud Farm, Kopački Rit nature park, and warm Slavonian gastronomy.
              </p>
            </article>

            <article className="venue-card">
              <div className="venue-card__head">
                <span className="kicker">
                  <CheckerMark size="sm" />
                  9A Contesting Tradition
                </span>
                <CheckerFive />
              </div>
              <h3 className="venue-card__title">Organized by HRS (hamradio.hr)</h3>
              <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6 }}>
                Hosted by the <strong>Croatian Amateur Radio Association (HRS)</strong> and backed by Croatia&apos;s world-renowned <span className="font-mono-tabular">9A</span> contesting community, kicking off qualification with the 9A DX Contest.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 5. Organizing Committee Section (#team) */}
      <section className="section" id="team">
        <div className="wrap">
          <div className="section__head section__head--split">
            <div>
              <p className="kicker">
                <CheckerMark size="sm" />
                Leadership
              </p>
              <h2 className="section__title">Organizing Committee</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="font-mono-tabular" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--muted)' }}>
                11 Committee Members · HRS Croatia
              </span>
            </div>
          </div>

          <ul className="team">
            {committee.map((member) => (
              <li key={member.callsign}>
                <div className="person">
                  <span className="person__avatar" aria-hidden="true">
                    {member.initials}
                  </span>
                  <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span className="person__call font-mono-tabular">{member.callsign}</span>
                    <h3 className="person__name">{member.name}</h3>
                    <span className="person__role">{member.role}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Past WRTC History Archive (#past-events) */}
      <section className="section" id="past-events">
        <div className="wrap">
          <div className="section__head section__head--split">
            <div>
              <p className="kicker">
                <CheckerMark size="sm" />
                Historical Archive
              </p>
              <h2 className="section__title">A Championship Since 1990</h2>
            </div>
            <a
              href="https://wrtc.info"
              rel="noopener noreferrer"
              aria-label="WRTC History at wrtc.info (opens in a new tab)"
              style={{ fontWeight: 700, fontSize: '15px' }}
            >
              WRTC History at wrtc.info <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="past-events-grid">
            {pastEvents.map((event) => (
              <article key={event.year} className="past-event-card">
                <div className="past-event-card__top">
                  <span className="past-event-card__year font-mono-tabular">{event.year}</span>
                  <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{event.edition}</span>
                </div>
                <h3 className="past-event-card__location">{event.location}</h3>
                <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
                  Host: {event.hostCity}, {event.hostCountry}
                </div>
                <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--line)' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--muted)', marginBottom: '6px' }}>
                    Champions
                  </div>
                  <div className="past-event-card__champions">
                    {event.champions.map((champ) => (
                      <span key={champ} className="callsign-badge font-mono-tabular">
                        {champ}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={event.archiveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '13px', fontWeight: 600, marginTop: '8px' }}
                >
                  View Archive ↗
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Official Selection Rules v1.0 Documents Section */}
      <section className="section" id="selection-rules">
        <div className="wrap" id="competition">
          <div className="section__head section__head--split" id="standings">
            <div>
              <p className="kicker">
                <CheckerMark size="sm" />
                Official Documentation · Selection Rules v1.0
              </p>
              <h2 className="section__title">Road to Slavonia 2030</h2>
              <div style={{ marginTop: '12px' }}>
                <Link
                  href="/competition/selection-rules"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: 700,
                    fontSize: '14px',
                    color: 'var(--brand-red)',
                  }}
                >
                  Explore Complete 3-Tab Online Hub &amp; Tables 1–7 →
                </Link>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CheckerStrip />
              <KockiceCluster />
            </div>
          </div>

          <div className="rules-grid" id="selection-rules-docs">
            <article className="rule-card">
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

            <article className="rule-card">
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

      {/* 8. Sponsors & Supporters Strip (#sponsors) */}
      <section className="section" id="sponsors">
        <div className="wrap">
          <div className="section__head section__head--split">
            <div>
              <p className="kicker">
                <CheckerMark size="sm" />
                Sponsors &amp; Partners
              </p>
              <h2 className="section__title">Supporting WRTC 2030</h2>
            </div>
            <a className="btn" href="mailto:wrtc2030@hamradio.hr">
              Inquire About Sponsorship →
            </a>
          </div>

          <div className="sponsor-tiers">
            <div className="tier-box">
              <h3>
                <CheckerMark size="sm" />
                Commercial Partners
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6 }}>
                Equipment manufacturers, transceiver sponsors, tower &amp; antenna suppliers supporting 60 stations in Slavonia.
              </p>
            </div>
            <div className="tier-box">
              <h3>
                <CheckerMark size="sm" />
                Club &amp; DX Foundations
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6 }}>
                National amateur radio societies, contest clubs, and DX foundations backing the Olympic spirit of amateur radio.
              </p>
            </div>
            <div className="tier-box">
              <h3>
                <CheckerMark size="sm" />
                Sponsored Teams (2029)
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6 }}>
                Per Section 8.D of Selection Rules v1.0, the formal application process for the 4 Sponsored Teams opens after <strong>1 January 2029</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
