import React from 'react';
import qaData from '../../../data/rules/selection-rules-qa.json';

interface QaItem {
  num: string;
  title: string;
  answer: string;
}

export function SelectionRulesQa() {
  const items = qaData as QaItem[];

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-2 text-red-600 dark:text-red-500 font-bold text-xs uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
          Official Clarification Document
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Selection Criteria Questions & Answers
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          This document explains the background and reasoning behind the WRTC 2030 Selection Rules, including event selection, weighting factors, qualification areas, cheating prevention, and 60-team championship quotas.
        </p>
      </div>

      <div className="space-y-6">
        {items.map((item) => (
          <article
            key={item.num}
            id={item.num.toLowerCase()}
            className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <div className="flex items-start gap-3">
              <span className="shrink-0 font-mono font-bold text-xs px-2.5 py-1 rounded bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
                {item.num}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {item.title}
              </h3>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line space-y-3">
              {item.answer}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
