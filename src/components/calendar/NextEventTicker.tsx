'use client';

import React, { useState, useEffect } from 'react';
import type { QualifyingEvent } from '@/lib/schemas/rules.schema';

interface NextEventTickerProps {
  targetDate: string; // ISO 8601 UTC
  event: QualifyingEvent;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function calculateTimeRemaining(targetIso: string): TimeRemaining {
  const target = new Date(targetIso).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isPast: false };
}

export function NextEventTicker({ targetDate, event }: NextEventTickerProps) {
  const [time, setTime] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(targetDate)
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTime(calculateTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <aside
      data-testid="next-event-ticker"
      className="p-6 sm:p-8 rounded-2xl bg-linear-to-br from-slate-900 to-slate-950 text-white border-2 border-red-600/80 shadow-xl relative overflow-hidden"
      aria-label="Qualifying Event #1 Countdown"
    >
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        {/* Left: Event Details */}
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400">
              Qualifying Event #1 · Season Kickoff
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {event.name}
          </h2>
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-300 font-medium">
            <span className="font-mono text-red-400 font-semibold">{event.datesUtc}</span>
            <span>·</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">
              {event.mode}
            </span>
            <span>·</span>
            <span className="text-slate-400">Value: {event.value} pts</span>
          </div>
        </div>

        {/* Right: Live UTC Countdown Grid */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0 font-mono tabular-nums">
          <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 min-w-[70px] sm:min-w-[84px]">
            <span className="text-2xl sm:text-4xl font-black text-white">
              {mounted ? time.days : 413}
            </span>
            <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-slate-400 font-medium mt-1">
              Days
            </span>
          </div>

          <div className="text-xl sm:text-2xl font-bold text-slate-600">:</div>

          <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 min-w-[64px] sm:min-w-[74px]">
            <span className="text-2xl sm:text-4xl font-black text-white">
              {mounted ? String(time.hours).padStart(2, '0') : '14'}
            </span>
            <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-slate-400 font-medium mt-1">
              Hours
            </span>
          </div>

          <div className="text-xl sm:text-2xl font-bold text-slate-600">:</div>

          <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 min-w-[64px] sm:min-w-[74px]">
            <span className="text-2xl sm:text-4xl font-black text-white">
              {mounted ? String(time.minutes).padStart(2, '0') : '00'}
            </span>
            <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-slate-400 font-medium mt-1">
              Mins
            </span>
          </div>

          <div className="text-xl sm:text-2xl font-bold text-slate-600 hidden sm:block">:</div>

          <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 min-w-[64px] sm:min-w-[74px] hidden sm:flex">
            <span className="text-2xl sm:text-4xl font-black text-red-500">
              {mounted ? String(time.seconds).padStart(2, '0') : '00'}
            </span>
            <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-slate-400 font-medium mt-1">
              Secs
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
