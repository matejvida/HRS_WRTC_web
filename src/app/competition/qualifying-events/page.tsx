import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getQualifyingEvents } from '@/lib/rules-loader';
import { NextEventTicker } from '@/components/calendar/NextEventTicker';
import { QualifyingCalendar } from '@/components/calendar/QualifyingCalendar';

export const dynamic = 'error';

export const metadata: Metadata = {
  title: 'Qualifying Events Calendar (24 Contests) | WRTC 2030 Croatia',
  description:
    'Complete official schedule of all 24 qualifying contests for WRTC 2030 in Slavonia, Croatia. Filter by mode (CW, SSB, Mixed), view live countdowns, and check Table 2 weighting factors.',
};

export default function QualifyingEventsPage() {
  const events = getQualifyingEvents();
  const event1 = events[0];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Breadcrumbs */}
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
              Qualifying Events Calendar
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
              Official Qualification Schedule (2026–2028)
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              Qualifying Events Calendar
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Explore all 24 internationally sanctioned qualifying contests spanning 24 months, starting with the 9A DX Contest in December 2026 and concluding with CQ WW DX CW in November 2028.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-medium">
              <span className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                24 Contests · 24 Months
              </span>
              <span className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                Best <strong>10 Scores</strong> Count
              </span>
              <span className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                Max <strong>3 Outside-QA</strong> Scores
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        {/* Pinned Event #1 Countdown Ticker */}
        <section aria-labelledby="ticker-heading">
          <h2 id="ticker-heading" className="sr-only">
            Next Upcoming Qualifying Event Countdown
          </h2>
          <NextEventTicker
            targetDate="2026-12-19T14:00:00Z"
            event={event1}
          />
        </section>

        {/* Calendar & Filters */}
        <section aria-labelledby="calendar-heading" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h2
                id="calendar-heading"
                className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
              >
                All 24 Qualifying Contests
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Filter by mode or search by contest title to plan your qualification campaign.
              </p>
            </div>
            <Link
              href="/competition/selection-rules"
              className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Selection Rules &amp; Tables 1–7</span>
              <span>→</span>
            </Link>
          </div>

          <Suspense
            fallback={
              <div className="p-12 text-center text-sm text-slate-500">
                Loading calendar events...
              </div>
            }
          >
            <QualifyingCalendar events={events} />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
