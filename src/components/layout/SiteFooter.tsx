import React from 'react';
import Link from 'next/link';
import { CheckerMark, CheckerRibbon } from '@/components/brand/CheckerMark';

export function SiteFooter() {
  return (
    <>
      <CheckerRibbon />
      <footer className="site-footer" id="contact">
        <div className="wrap site-footer__inner">
          <div className="site-footer__brand">
            <img
              src="/brand/hrs-logo.svg"
              alt="Croatian Amateur Radio Association (HRS)"
              width={120}
              height={32}
            />
            <div className="site-footer__org-line">
              <CheckerMark size="md" />
              <span>
                Organized by the{' '}
                <strong>
                  <a
                    href="https://www.hamradio.hr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Croatian Amateur Radio Association (HRS) official site (opens in a new tab)"
                  >
                    Croatian Amateur Radio Association (HRS) <span aria-hidden="true">↗</span>
                  </a>
                </strong>{' '}
                · Dalmatinska 12, Zagreb
              </span>
            </div>
          </div>

          <div className="site-footer__docs">
            <Link href="/competition/selection-rules" style={{ fontWeight: 600 }}>
              Online Selection Rules Hub →
            </Link>
            <a href="/files/wrtc-2030-selection-rules-v1.0.pdf" download>
              Selection Rules v1.0 (PDF)
            </a>
            <a href="/files/wrtc-2030-selection-rules-qa-v1.0.pdf" download>
              Rules Q&amp;A v1.0 (PDF)
            </a>
            <a href="/files/wrtc-2030-score-calculation-examples.pdf" download>
              Score Examples (PDF)
            </a>
          </div>

          <div className="site-footer__meta">
            <a href="mailto:wrtc2030@hamradio.hr">wrtc2030@hamradio.hr</a>
            <a href="mailto:rules-wrtc2030@hamradio.hr">
              rules-wrtc2030@hamradio.hr
            </a>
            <span>© 2026 WRTC 2030 Organizing Committee</span>
          </div>
        </div>
      </footer>
    </>
  );
}
