'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import type { QualifyingEvent } from '@/lib/schemas/rules.schema';
import { EventCard } from './EventCard';

interface QualifyingCalendarProps {
  events: QualifyingEvent[];
}

type ModeFilter = 'ALL' | 'CW' | 'SSB' | 'Mixed';

export function QualifyingCalendar({ events }: QualifyingCalendarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const modeParam = searchParams.get('mode');
  const initialMode: ModeFilter =
    modeParam === 'CW' || modeParam === 'SSB' || modeParam === 'Mixed'
      ? modeParam
      : 'ALL';

  const [modeFilter, setModeFilter] = useState<ModeFilter>(initialMode);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (
      modeParam === 'CW' ||
      modeParam === 'SSB' ||
      modeParam === 'Mixed'
    ) {
      setModeFilter(modeParam);
    } else if (!modeParam) {
      setModeFilter('ALL');
    }
  }, [modeParam]);

  const handleModeChange = (mode: ModeFilter) => {
    setModeFilter(mode);
    const params = new URLSearchParams(searchParams.toString());
    if (mode === 'ALL') {
      params.delete('mode');
    } else {
      params.set('mode', mode);
    }
    const query = params.toString() ? `?${params.toString()}` : '';
    router.replace(`${pathname}${query}`, { scroll: false });
  };

  const filteredEvents = events.filter((evt) => {
    // Mode match
    if (modeFilter === 'CW' && evt.mode !== 'CW') return false;
    if (modeFilter === 'SSB' && evt.mode !== 'SSB') return false;
    if (modeFilter === 'Mixed' && evt.mode !== 'CW & SSB') return false;

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = evt.name.toLowerCase().includes(q);
      const matchShort = evt.shortName.toLowerCase().includes(q);
      const matchYear = String(evt.year).includes(q);
      if (!matchName && !matchShort && !matchYear) return false;
    }

    return true;
  });

  const cwCount = events.filter((e) => e.mode === 'CW').length;
  const ssbCount = events.filter((e) => e.mode === 'SSB').length;
  const mixedCount = events.filter((e) => e.mode === 'CW & SSB').length;

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        {/* Mode Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-1">
            Mode:
          </span>

          <button
            type="button"
            onClick={() => handleModeChange('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              modeFilter === 'ALL'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            All ({events.length})
          </button>

          <button
            type="button"
            onClick={() => handleModeChange('CW')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              modeFilter === 'CW'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-amber-500'
            }`}
          >
            CW ({cwCount})
          </button>

          <button
            type="button"
            onClick={() => handleModeChange('SSB')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              modeFilter === 'SSB'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-500'
            }`}
          >
            SSB ({ssbCount})
          </button>

          <button
            type="button"
            onClick={() => handleModeChange('Mixed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              modeFilter === 'Mixed'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-500'
            }`}
          >
            Mixed ({mixedCount})
          </button>
        </div>

        {/* Search input */}
        <div className="relative min-w-[200px] sm:w-64">
          <input
            type="text"
            placeholder="Search contest name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs py-1.5 pl-8 pr-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-red-500"
          />
          <svg
            className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Showing Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 font-mono">
        <span>
          Showing {filteredEvents.length} of {events.length} qualifying contests
        </span>
        {modeFilter !== 'ALL' && (
          <button
            type="button"
            onClick={() => handleModeChange('ALL')}
            className="text-red-600 dark:text-red-400 font-semibold underline hover:text-red-700 cursor-pointer"
          >
            Reset filter
          </button>
        )}
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            No qualifying contests match your filter criteria.
          </p>
          <button
            type="button"
            onClick={() => {
              setModeFilter('ALL');
              setSearchQuery('');
            }}
            className="mt-3 text-xs font-bold text-red-600 dark:text-red-400 underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
