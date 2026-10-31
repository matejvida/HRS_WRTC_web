import React from 'react';
import type { QualifyingEvent } from '@/lib/schemas/rules.schema';

interface EventCardProps {
  event: QualifyingEvent;
}

export function EventCard({ event }: EventCardProps) {
  const isSpecialHostContest = event.id === 1 || event.id === 13; // 9A DX Contests

  return (
    <article
      data-testid="event-card"
      id={`event-${event.id}`}
      className={`relative p-5 sm:p-6 rounded-xl border bg-white dark:bg-slate-950 transition-all duration-200 hover:shadow-md ${
        isSpecialHostContest
          ? 'border-red-500/80 dark:border-red-500/60 ring-1 ring-red-500/20'
          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
      }`}
    >
      {/* Top Meta Row */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
            #{event.id}
          </span>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Year {event.year}
          </span>
          {isSpecialHostContest && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
              Host Country Event
            </span>
          )}
        </div>

        {/* Mode Badge */}
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider font-mono ${
            event.mode === 'CW'
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              : event.mode === 'SSB'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
          }`}
        >
          {event.mode}
        </span>
      </div>

      {/* Main Title & Short Name */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
          {event.name}
        </h3>
        <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
          {event.shortName} · {event.yearlySchedule}
        </p>
      </div>

      {/* Date & Points Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 mb-4 text-xs font-mono">
        <div>
          <span className="text-slate-400 dark:text-slate-500 block text-[11px]">
            Dates (UTC):
          </span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {event.datesUtc}
          </span>
        </div>

        <div>
          <span className="text-slate-400 dark:text-slate-500 block text-[11px]">
            Event Value:
          </span>
          <span className="font-bold text-red-600 dark:text-red-400">
            {event.value} pts
          </span>
          {event.primaryRegionValue && (
            <span className="block text-[10px] text-slate-500 font-sans">
              ({event.primaryRegionValue} pts for W/VE)
            </span>
          )}
        </div>
      </div>

      {/* Footer Link & Notes */}
      <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
          SO HP: 1.00 · SO LP: 0.90
        </div>

        {event.websiteUrl ? (
          <a
            href={event.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Official website for ${event.name}`}
            className="font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 inline-flex items-center gap-1 group"
          >
            <span>Official Website</span>
            <svg
              className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        ) : (
          <span className="text-[11px] text-slate-400">Rules via sponsor</span>
        )}
      </div>
    </article>
  );
}
