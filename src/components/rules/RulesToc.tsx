'use client';

import React, { useEffect, useState } from 'react';

export interface SectionMeta {
  id: string;
  num: number;
  title: string;
}

export const rulesSections: SectionMeta[] = [
  { id: 'section-1', num: 1, title: 'Qualifying Events and WRTC 2030 Selection Criteria' },
  { id: 'section-2', num: 2, title: 'Category Weighting Factor (WF)' },
  { id: 'section-3', num: 3, title: 'Qualification Areas (QA) and Number of Teams' },
  { id: 'section-4', num: 4, title: 'Qualifying Event Score Calculation' },
  { id: 'section-5', num: 5, title: 'Qualification Score Calculation' },
  { id: 'section-6', num: 6, title: 'Team Leader (TL) Selection and Eligibility Rules' },
  { id: 'section-7', num: 7, title: 'Team Mate (TM) Qualification' },
  { id: 'section-8', num: 8, title: 'Special Teams' },
  { id: 'section-9', num: 9, title: 'Team Leader / Teammate Withdrawal and Replacement' },
  { id: 'section-10', num: 10, title: 'Financial Implications' },
  { id: 'section-11', num: 11, title: 'Questions and Clarifications' },
];

export function RulesToc({ className = '' }: { className?: string }) {
  const [activeId, setActiveId] = useState<string>('section-1');

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible section
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by top coordinate
          visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      }
    );

    rulesSections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={className}>
      {/* Mobile Collapsible TOC */}
      <details className="toc lg:hidden mb-6 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 group">
        <summary className="font-bold text-sm text-slate-900 dark:text-white cursor-pointer flex items-center justify-between list-none">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-red-600 rounded-full inline-block" />
            Table of Contents (Sections 1–11)
          </span>
          <svg
            className="w-4 h-4 text-slate-500 transition-transform group-open:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <nav className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
          {rulesSections.map((sec) => {
            const isActive = activeId === sec.id;
            return (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className={`block py-1.5 px-2 rounded font-medium transition-colors ${
                  isActive
                    ? 'bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span className="font-mono text-slate-400 dark:text-slate-500 mr-2">
                  {sec.num}.
                </span>
                {sec.title}
              </a>
            );
          })}
        </nav>
      </details>

      {/* Desktop Sticky Rail */}
      <nav
        aria-label="Table of Contents"
        className="hidden lg:block sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-3 py-2"
      >
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
          <span className="w-2 h-2 rounded-xs bg-red-600 dark:bg-red-500" />
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Rules Navigation
          </h3>
        </div>

        <ul className="space-y-1 text-xs">
          {rulesSections.map((sec) => {
            const isActive = activeId === sec.id;
            return (
              <li key={sec.id}>
                <a
                  href={`#${sec.id}`}
                  className={`group flex items-start gap-2 py-1.5 px-2.5 rounded-md transition-all ${
                    isActive
                      ? 'bg-red-50 text-red-700 font-bold dark:bg-red-950/40 dark:text-red-400 border-l-2 border-red-600'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span
                    className={`font-mono text-[11px] shrink-0 pt-0.5 ${
                      isActive
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                    }`}
                  >
                    {sec.num}.
                  </span>
                  <span className="line-clamp-2 leading-snug">{sec.title}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
