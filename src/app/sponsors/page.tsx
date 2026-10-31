import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getSponsorsData } from '@/lib/sponsors-loader';
import { SponsorTierGrid } from '@/components/sponsors/SponsorTierGrid';
import { SponsoredTeamNotice } from '@/components/sponsors/SponsoredTeamNotice';

export const dynamic = 'error';

export const metadata: Metadata = {
  title: 'Partners & Sponsors — WRTC 2030 Croatia',
  description:
    'Institutional host Croatian Amateur Radio Association (HRS), commercial equipment partnerships, contest club patrons, and Rule 8.D Sponsored Teams.',
  openGraph: {
    title: 'Partners & Sponsors — WRTC 2030 Croatia',
    description:
      'Institutional host HRS, commercial equipment partnerships, contest club patrons, and Rule 8.D Sponsored Teams.',
    url: 'https://wrtc2030.hr/sponsors',
    siteName: 'WRTC 2030 Croatia',
    images: [{ url: '/brand/wrtc-logo.svg', width: 800, height: 600, alt: 'WRTC 2030 Croatia' }],
  },
};

export default function SponsorsPage() {
  const sponsorsData = getSponsorsData();

  return (
    <div className="space-y-16 py-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-xs font-mono text-slate-500">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-red-600 transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-900 dark:text-white font-semibold">Partners & Sponsors</li>
        </ol>
      </nav>

      {/* Hero Header */}
      <header className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          <span className="w-2 h-2 rounded-full bg-slate-900 dark:bg-white" />
          <span>Institutional & Equipment Partnerships · WRTC 2030</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
          Partners & Sponsors — WRTC 2030 Croatia
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          The World Radiosport Team Championship is powered by the international fellowship of amateur radio. From our Institutional Host, the <strong>Croatian Amateur Radio Association (HRS)</strong>, to global equipment manufacturers, DX foundations, and individual patrons, your support ensures equalized conditions and fair play on the airwaves of Slavonia.
        </p>

        <div className="pt-2">
          <a
            href={`mailto:${sponsorsData.contactEmail}?subject=[WRTC%202030]%20Partnership%20Inquiry`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono font-bold text-xs bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            <span>Inquire About Sponsorship</span>
            <span aria-hidden="true">✉</span>
          </a>
        </div>
      </header>

      {/* Main Tiers and Institutional Host */}
      <SponsorTierGrid data={sponsorsData} />

      {/* Rule 8.D Sponsored Teams Section */}
      <SponsoredTeamNotice />
    </div>
  );
}
