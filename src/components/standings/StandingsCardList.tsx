import React from 'react';
import type { AreaStandings, OperatorStanding } from '@/lib/schemas/standings.schema';

interface StandingsCardListProps {
  area: AreaStandings;
  onSelectOperator?: (op: OperatorStanding) => void;
}

export function StandingsCardList({ area, onSelectOperator }: StandingsCardListProps) {
  const quota = area.allocatedTeams;
  const operators = area.standings;

  return (
    <div className="space-y-3">
      {operators.map((op, idx) => {
        const isQualified = op.rank <= quota;
        const showCutoffAfter = idx === quota - 1;

        return (
          <React.Fragment key={op.callsign}>
            <article
              data-testid="operator-card"
              tabIndex={0}
              role="button"
              onClick={() => onSelectOperator?.(op)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectOperator?.(op);
                }
              }}
              className={`p-4 rounded-xl border bg-white dark:bg-slate-950 shadow-xs transition-colors cursor-pointer ${
                isQualified
                  ? 'border-red-500/40 ring-1 ring-red-500/10'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-mono font-bold text-xs ${
                      isQualified
                        ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    #{op.rank}
                  </span>
                  <span className="font-mono font-bold text-base text-slate-900 dark:text-white">
                    {op.callsign}
                  </span>
                  {op.subAreaCode && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                      {op.subAreaCode}
                    </span>
                  )}
                </div>

                <div className="text-right font-mono font-bold text-base text-red-600 dark:text-red-400">
                  {op.totalPoints.toFixed(2)} pts
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <span>
                  {op.name ? `${op.name} · ` : ''}{op.country} ({op.dxcc})
                </span>
                <span className="font-mono">
                  {op.countedEventsCount}/{op.qaCode === 'YOUTH' ? '6' : '10'} events
                </span>
              </div>
            </article>

            {showCutoffAfter && (
              <div
                data-testid="cutoff-marker"
                className="my-3 p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border-2 border-dashed border-red-600/70 text-center text-xs font-bold text-red-700 dark:text-red-400"
              >
                ▲ Top {quota} Qualify as Automatic Team Leaders
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
