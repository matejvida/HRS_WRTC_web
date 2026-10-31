import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getStandingsSnapshot } from '@/lib/standings-loader';
import { StandingsExplorer } from '@/components/standings/StandingsExplorer';

export const dynamic = 'error';

export const metadata: Metadata = {
  title: 'WRTC 2030 Qualification Standings | WRTC 2030 Croatia',
  description:
    'Real-time qualification standings across 29 Qualification Areas and Youth for WRTC 2030 in Slavonia, Croatia. Filter by area, search by callsign, and view automatic qualification cutoff lines.',
};

export default function StandingsPage() {
  const snapshot = getStandingsSnapshot();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Breadcrumb */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav
            aria-label="Breadcrumb"
            className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2"
          >
            <Link
              href="/"
              className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-400">Competition</span>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-100 font-semibold">
              Qualification Standings
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 py-10 sm:py-14 bg-linear-to-b from-slate-50 dark:from-slate-900/40 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-950/80 dark:text-red-300 text-xs font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              Official Leaderboard · Selection Rules v1.0
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              Qualification Standings
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Official rankings across all 29 Qualification Areas and Youth applicants. Track cutoff positions for the 50 automatic Team Leader qualification slots.
            </p>

            {/* Pre-Season Notification Banner */}
            <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
              <svg
                className="w-5 h-5 text-amber-600 shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <strong className="font-bold">Pre-Season Simulation Mode:</strong> The 24-month qualification cycle officially opens with the <strong>9A DX Contest on 19 December 2026</strong>. Current standings display the validated simulation model based on the official Selection Rules v1.0 calculation examples.
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-medium">
              <span className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                29 QAs + Youth
              </span>
              <span className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                Total Automatic Slots: <strong>50 Teams</strong>
              </span>
              <span className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                Youth Slots: <strong>3 Teams</strong>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Standings Container */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Suspense
          fallback={
            <div className="p-12 text-center text-sm text-slate-500">
              Loading qualification standings...
            </div>
          }
        >
          <StandingsExplorer snapshot={snapshot} />
        </Suspense>
      </main>
    </div>
  );
}
