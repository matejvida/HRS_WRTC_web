import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { RulesToc } from '@/components/rules/RulesToc';
import { PdfDownloadCard } from '@/components/rules/PdfDownloadCard';
import { SelectionRulesTabs } from '@/components/rules/SelectionRulesTabs';
import { SelectionRulesProse } from '@/components/rules/SelectionRulesProse';
import { SelectionRulesQa } from '@/components/rules/SelectionRulesQa';
import { ScoreCalculationExamples } from '@/components/rules/ScoreCalculationExamples';

export const dynamic = 'error';

export const metadata: Metadata = {
  title: 'Selection Criteria Rules v1.0 | WRTC 2030 Croatia',
  description:
    'Official WRTC 2030 Selection Criteria Rules approved by the WRTC Sanctioning Committee. Authoritative 24 qualifying events, 29 Qualification Areas, scoring formulas, official Q&A clarifications, and calculation examples.',
};

export default function SelectionRulesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Top Banner / Breadcrumb */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav aria-label="Breadcrumb" className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <Link href="/" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-400">Competition</span>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-100 font-semibold">
              Selection Rules
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 py-10 sm:py-14 bg-linear-to-b from-slate-50 dark:from-slate-900/40 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-950/80 dark:text-red-300 text-xs font-semibold mb-4">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                World Radiosport Team Championship 2030
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                Selection Criteria Rules
              </h1>
              <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Official qualification standards, 24 qualifying contest schedule, geographic quota allocations, and mathematical scoring procedures for WRTC 2030 in Osijek, Slavonia, Croatia.
              </p>

              {/* Status / Meta badges */}
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-medium">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <span className="w-2 h-2 rounded-xs bg-emerald-500" />
                  Status: <strong>Approved by WRTC SC</strong>
                </span>
                <span className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                  Release v1.0 (15 Oct 2026)
                </span>
                <span className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  Total Championship Field: <strong>60 Teams (120 Operators)</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Sticky Scroll-Spy TOC (Desktop: 3 cols, Mobile: Collapsible at top) */}
          <aside className="lg:col-span-3">
            <RulesToc />
            {/* Desktop Sidebar Download Card */}
            <div className="hidden lg:block mt-6">
              <PdfDownloadCard />
            </div>
          </aside>

          {/* Center Column: 3-Tab Content Hub (Desktop: 9 cols) */}
          <div className="lg:col-span-9 min-w-0">
            <Suspense
              fallback={
                <div className="p-12 text-center text-sm text-slate-500 dark:text-slate-400">
                  Loading selection rules documentation...
                </div>
              }
            >
              <SelectionRulesTabs
                rulesContent={<SelectionRulesProse />}
                qaContent={<SelectionRulesQa />}
                examplesContent={<ScoreCalculationExamples />}
              />
            </Suspense>

            {/* Mobile / Tablet Download Card placed below content */}
            <div className="block lg:hidden mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
              <PdfDownloadCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
