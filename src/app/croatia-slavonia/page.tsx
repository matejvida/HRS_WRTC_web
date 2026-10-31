import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PropagationArena } from '@/components/venue/PropagationArena';
import { DestinationCards } from '@/components/venue/DestinationCards';
import { GastronomyGuide } from '@/components/venue/GastronomyGuide';
import { TravelTransitTable } from '@/components/venue/TravelTransitTable';

export const dynamic = 'error';

export const metadata: Metadata = {
  title: 'Croatia & Slavonia — WRTC 2030 Host Region & Venue Guide',
  description:
    'Explore the Pannonian Propagation Arena, host cities Osijek, Đakovo, and Čepin, Kopački Rit Nature Park, Slavonian gastronomy, and international transit corridors.',
  openGraph: {
    title: 'Croatia & Slavonia — WRTC 2030 Venue Guide',
    description:
      'The flat Pannonian Basin offers 0° horizon take-off, 85m–110m ASL elevation, and 60 identical stations in Osijek, Čepin, and Đakovo.',
    url: 'https://wrtc2030.hr/croatia-slavonia',
    siteName: 'WRTC 2030 Croatia',
    images: [{ url: '/brand/wrtc-logo.svg', width: 800, height: 600, alt: 'WRTC 2030 Croatia' }],
  },
};

export default function CroatiaSlavoniaPage() {
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
          <li className="text-slate-900 dark:text-white font-semibold">Croatia & Slavonia</li>
        </ol>
      </nav>

      {/* Hero Header */}
      <header className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span>WRTC 2030 Host Region · Slavonia & Baranja, Croatia</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
          Croatia & Slavonia — WRTC 2030 Venue & Host Region
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Beyond Croatia&apos;s celebrated Adriatic coastline lies the vast, fertile Pannonian plain of Slavonia and Baranja—an extraordinary landscape offering 0° horizon take-off angles, rich soil conductivity, deep cultural heritage, and world-renowned hospitality for the 2030 World Radiosport Team Championship.
        </p>

        {/* Quick Anchor Links */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono">
          <a
            href="#propagation-arena"
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-red-500/50 hover:text-red-600 transition-colors"
          >
            ↓ Propagation Arena
          </a>
          <a
            href="#destinations"
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-red-500/50 hover:text-red-600 transition-colors"
          >
            ↓ Host Destinations
          </a>
          <a
            href="#gastronomy"
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-red-500/50 hover:text-red-600 transition-colors"
          >
            ↓ Gastronomy & Wine
          </a>
          <a
            href="#travel"
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-red-500/50 hover:text-red-600 transition-colors"
          >
            ↓ Travel & Transit
          </a>
        </div>
      </header>

      {/* 1. Propagation Arena */}
      <section id="propagation-arena" className="scroll-mt-24">
        <PropagationArena />
      </section>

      {/* 2. Destination Cards */}
      <section id="destinations" className="scroll-mt-24">
        <DestinationCards />
      </section>

      {/* 3. Gastronomy & Wine */}
      <section id="gastronomy" className="scroll-mt-24">
        <GastronomyGuide />
      </section>

      {/* 4. Travel & Transit Table */}
      <section id="travel" className="scroll-mt-24">
        <TravelTransitTable />
      </section>

      {/* Bottom CTA Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
            Ready to Compete in Slavonia?
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-mono">
            Check the Official Selection Rules v1.0 & Qualifying Standings
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Track cutoff lines across all 29 Qualification Areas, download official rulebooks, or explore the 24-contest qualification calendar.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/competition/selection-rules"
            className="px-5 py-2.5 rounded-xl font-mono font-bold text-xs bg-red-600 text-white hover:bg-red-700 transition-colors text-center"
          >
            Selection Rules
          </Link>
          <Link
            href="/competition/standings"
            className="px-5 py-2.5 rounded-xl font-mono font-bold text-xs bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 transition-colors text-center"
          >
            Live Standings
          </Link>
        </div>
      </div>
    </div>
  );
}
