import React from 'react';
import type { AreaStandings, OperatorStanding } from '@/lib/schemas/standings.schema';
import { CutoffRow } from './CutoffRow';

interface StandingsTableProps {
  area: AreaStandings;
  onSelectOperator?: (op: OperatorStanding) => void;
}

export function StandingsTable({ area, onSelectOperator }: StandingsTableProps) {
  const quota = area.allocatedTeams;
  const operators = area.standings;

  return (
    <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 shadow-xs">
      <table className="w-full text-left text-xs sm:text-sm">
        <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
          <tr>
            <th className="py-3 px-3 w-16 text-center font-mono">Rank</th>
            <th className="py-3 px-4 min-w-[140px] font-mono">Callsign</th>
            <th className="py-3 px-3 min-w-[120px]">Name</th>
            <th className="py-3 px-3 min-w-[140px]">Country</th>
            <th className="py-3 px-3 w-28 text-center font-mono">Events</th>
            <th className="py-3 px-4 w-32 text-right font-mono">Total Points</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-sans">
          {operators.map((op, idx) => {
            const isQualified = op.rank <= quota;
            const showCutoffAfter = idx === quota - 1;

            return (
              <React.Fragment key={op.callsign}>
                <tr
                  data-testid="operator-row"
                  tabIndex={0}
                  role="button"
                  aria-label={`View score breakdown for ${op.callsign}`}
                  onClick={() => onSelectOperator?.(op)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectOperator?.(op);
                    }
                  }}
                  className={`group transition-colors cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/60 focus:outline-hidden focus:bg-red-50/50 dark:focus:bg-red-950/20 focus:ring-1 focus:ring-red-500 ${
                    isQualified
                      ? 'bg-emerald-50/20 dark:bg-emerald-950/10'
                      : ''
                  }`}
                >
                  {/* Rank */}
                  <td className="py-3 px-3 text-center font-mono font-bold">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                        isQualified
                          ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 font-bold'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {op.rank}
                    </span>
                  </td>

                  {/* Callsign */}
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        {op.callsign}
                      </span>
                      {op.subAreaCode && (
                        <span className="text-[10px] font-mono font-normal px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                          {op.subAreaCode}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Name */}
                  <td className="py-3 px-3 text-slate-700 dark:text-slate-300">
                    {op.name || '—'}
                  </td>

                  {/* Country */}
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                    <span>{op.country}</span>
                    <span className="ml-1 text-slate-400 font-mono text-xs">
                      ({op.dxcc})
                    </span>
                  </td>

                  {/* Events */}
                  <td className="py-3 px-3 text-center font-mono text-slate-600 dark:text-slate-400">
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {op.countedEventsCount}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      /{op.qaCode === 'YOUTH' ? '6' : '10'}
                    </span>
                  </td>

                  {/* Total Points */}
                  <td className="py-3 px-4 text-right font-mono font-bold text-sm text-red-600 dark:text-red-400">
                    {op.totalPoints.toFixed(2)}
                  </td>
                </tr>

                {showCutoffAfter && <CutoffRow quota={quota} colSpan={6} />}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
