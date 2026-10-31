'use client';

import React, { useEffect, useRef } from 'react';
import type { OperatorStanding, ContestEntry } from '@/lib/schemas/standings.schema';

interface OperatorBreakdownDrawerProps {
  operator: OperatorStanding | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OperatorBreakdownDrawer({
  operator,
  isOpen,
  onClose,
}: OperatorBreakdownDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus management & Escape key listener
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        }

        // Trap focus inside drawer
        if (e.key === 'Tab' && drawerRef.current) {
          const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length > 0) {
            const first = focusableElements[0];
            const last = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      // Focus first focusable element inside drawer
      const timer = setTimeout(() => {
        const closeBtn = drawerRef.current?.querySelector<HTMLElement>('button');
        closeBtn?.focus();
      }, 50);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        clearTimeout(timer);
        previousFocusRef.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !operator) return null;

  const countedEntries = operator.entries.filter((e) => e.isCounted);
  const isYouth = operator.qaCode.toUpperCase() === 'YOUTH';
  const maxEvents = isYouth ? 6 : 10;

  const getEntryBadge = (entry: ContestEntry) => {
    if (entry.isCounted) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Counted
        </span>
      );
    }

    if (entry.isMultiOp) {
      const countedMoCount = countedEntries.filter((e) => e.isMultiOp).length;
      if (countedMoCount >= 3) {
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
            Dropped (MO Cap §5.A)
          </span>
        );
      }
    }

    if (entry.isOutsideQa) {
      const countedOutside = countedEntries.filter((e) => e.isOutsideQa).length;
      if (countedOutside >= 3) {
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
            Dropped (Outside QA Cap §5.B)
          </span>
        );
      }
    }

    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
        Dropped (Lower Score)
      </span>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Operator Score Breakdown for ${operator.callsign}`}
        className="w-full max-w-2xl bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col overflow-hidden border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-250"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
                  Rank #{operator.rank}
                </span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                  {operator.qaCode}
                </span>
                {operator.subAreaCode && (
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                    {operator.subAreaCode}
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
                {operator.callsign}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                {operator.name ? `${operator.name} · ` : ''}{operator.country} ({operator.dxcc})
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close drawer"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Key Metrics Banner */}
          <div className="mt-4 grid grid-cols-2 gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono">
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">Total Selection Points</div>
              <div className="text-xl font-bold text-red-600 dark:text-red-400">
                {operator.totalPoints.toFixed(2)} pts
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">Counted Events</div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">
                {operator.countedEventsCount} / {maxEvents} max
              </div>
            </div>
          </div>
        </div>

        {/* Contest Breakdown List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Contributing Contest Entries ({operator.entries.length})
            </h3>
            <span className="text-xs font-mono text-slate-500">
              Top {maxEvents} scores counted
            </span>
          </div>

          {operator.entries.length > 0 ? (
            <div className="space-y-3">
              {operator.entries.map((entry) => {
                const ratio = entry.qaMaxScore > 0 ? (entry.rawScore / entry.qaMaxScore) * 100 : 0;

                return (
                  <article
                    key={`${entry.eventId}-${entry.contestName}`}
                    className={`p-3.5 rounded-xl border transition-colors ${
                      entry.isCounted
                        ? 'border-emerald-500/40 bg-emerald-50/20 dark:bg-emerald-950/10'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 opacity-75'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-bold text-slate-500">
                            #{entry.eventId}
                          </span>
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                            {entry.contestName}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5 font-mono">
                          <span>Cat: {entry.category}</span>
                          <span>·</span>
                          <span>WF: {entry.weightingFactor.toFixed(2)}</span>
                          {entry.isOutsideQa && (
                            <>
                              <span>·</span>
                              <span className="text-amber-600 dark:text-amber-400 font-semibold">Outside QA</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                          {entry.calculatedPoints.toFixed(2)} pts
                        </div>
                        <div className="mt-1">{getEntryBadge(entry)}</div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      <span>
                        Raw: {entry.rawScore.toLocaleString()} / QA Max: {entry.qaMaxScore.toLocaleString()}
                      </span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {ratio.toFixed(2)}%
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic p-6 text-center border border-dashed rounded-xl">
              No contest scores submitted yet for this operator.
            </p>
          )}
        </div>

        {/* Drawer Footer Rules Note */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-[11px] text-slate-500 space-y-1">
          <p>
            <strong>Selection Rules §5:</strong> Total score is the sum of the best 10 contest scores (6 for Youth).
          </p>
          <p>
            <strong>Caps:</strong> Max 3 Multi-Op scores (§5.A); max 3 outside-QA scores (§5.B with 25% point reduction).
          </p>
        </div>
      </div>
    </div>
  );
}
