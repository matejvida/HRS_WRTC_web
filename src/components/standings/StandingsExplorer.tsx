'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import type {
  StandingsSnapshot,
  AreaStandings,
  OperatorStanding,
} from '@/lib/schemas/standings.schema';
import { StandingsTable } from './StandingsTable';
import { StandingsCardList } from './StandingsCardList';
import { OperatorBreakdownDrawer } from './OperatorBreakdownDrawer';
import { PreSeasonSimulator } from './PreSeasonSimulator';

interface StandingsExplorerProps {
  snapshot: StandingsSnapshot;
  onSelectOperator?: (op: OperatorStanding) => void;
}

type Region =
  | 'ALL'
  | 'Europe'
  | 'North America'
  | 'Asia'
  | 'Africa'
  | 'South America'
  | 'Oceania'
  | 'Youth';

const REGIONS: { id: Region; label: string }[] = [
  { id: 'ALL', label: 'All Regions' },
  { id: 'Europe', label: 'Europe' },
  { id: 'North America', label: 'North America' },
  { id: 'Asia', label: 'Asia' },
  { id: 'Africa', label: 'Africa' },
  { id: 'South America', label: 'South America' },
  { id: 'Oceania', label: 'Oceania' },
  { id: 'Youth', label: 'Youth' },
];

function getRegionForQa(qaCode: string): Region {
  if (qaCode === 'YOUTH') return 'Youth';
  if (qaCode.startsWith('EU')) return 'Europe';
  if (qaCode.startsWith('NA')) return 'North America';
  if (qaCode.startsWith('AS')) return 'Asia';
  if (qaCode.startsWith('AF')) return 'Africa';
  if (qaCode.startsWith('SA')) return 'South America';
  if (qaCode.startsWith('OC')) return 'Oceania';
  return 'ALL';
}

export function StandingsExplorer({
  snapshot,
  onSelectOperator,
}: StandingsExplorerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const qaParam = searchParams.get('qa');
  const callParam = searchParams.get('call');

  const [selectedRegion, setSelectedRegion] = useState<Region>('ALL');
  const [selectedQa, setSelectedQa] = useState<string>(qaParam || 'ALL');
  const [searchCall, setSearchCall] = useState<string>(callParam || '');
  const [selectedOperator, setSelectedOperator] = useState<OperatorStanding | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [showSimulator, setShowSimulator] = useState<boolean>(false);

  const handleSelectOperator = (op: OperatorStanding) => {
    setSelectedOperator(op);
    setIsDrawerOpen(true);
    onSelectOperator?.(op);
  };

  // Sync state from URL parameters
  useEffect(() => {
    if (qaParam) {
      const normalized = qaParam.replace('-', ' #').toUpperCase();
      const match = snapshot.areas.find(
        (a) => a.qaCode.toUpperCase() === normalized || a.qaCode.toUpperCase() === qaParam.toUpperCase()
      );
      if (match) {
        setSelectedQa(match.qaCode);
        setSelectedRegion(getRegionForQa(match.qaCode));
      }
    }
    if (callParam !== null && callParam !== undefined) {
      setSearchCall(callParam);
    }
  }, [qaParam, callParam, snapshot.areas]);

  const updateUrl = (qa: string, call: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (qa && qa !== 'ALL') {
      params.set('qa', qa.replace(' #', '-'));
    } else {
      params.delete('qa');
    }

    if (call.trim()) {
      params.set('call', call.trim());
    } else {
      params.delete('call');
    }

    const query = params.toString() ? `?${params.toString()}` : '';
    router.replace(`${pathname}${query}`, { scroll: false });
  };

  const handleRegionChange = (region: Region) => {
    setSelectedRegion(region);
    setSelectedQa('ALL');
    updateUrl('ALL', searchCall);
  };

  const handleQaChange = (qa: string) => {
    setSelectedQa(qa);
    if (qa !== 'ALL') {
      setSelectedRegion(getRegionForQa(qa));
    }
    updateUrl(qa, searchCall);
  };

  const handleSearchChange = (query: string) => {
    setSearchCall(query);
    updateUrl(selectedQa, query);
  };

  // Pre-indexed QAs matching region
  const availableQas = useMemo(() => {
    if (selectedRegion === 'ALL') return snapshot.areas;
    return snapshot.areas.filter((a) => getRegionForQa(a.qaCode) === selectedRegion);
  }, [snapshot.areas, selectedRegion]);

  // Filtered list of AreaStandings (instant in-memory)
  const displayedAreas: AreaStandings[] = useMemo(() => {
    const qLower = searchCall.trim().toLowerCase();

    return snapshot.areas
      .filter((area) => {
        // Region filter
        if (selectedRegion !== 'ALL' && getRegionForQa(area.qaCode) !== selectedRegion) {
          return false;
        }
        // QA filter
        if (selectedQa !== 'ALL' && area.qaCode !== selectedQa) {
          return false;
        }
        return true;
      })
      .map((area) => {
        if (!qLower) return area;

        // Filter operators by callsign or name
        const matchingOps = area.standings.filter(
          (op) =>
            op.callsign.toLowerCase().includes(qLower) ||
            (op.name && op.name.toLowerCase().includes(qLower))
        );

        return {
          ...area,
          standings: matchingOps,
        };
      })
      .filter((area) => area.standings.length > 0);
  }, [snapshot.areas, selectedRegion, selectedQa, searchCall]);

  const totalMatchingOps = useMemo(() => {
    return displayedAreas.reduce((acc, a) => acc + a.standings.length, 0);
  }, [displayedAreas]);

  return (
    <div className="space-y-6">
      {/* Controls Container */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        {/* Header bar with Simulator Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Official Standings Leaderboard · Table 3 Allocation Tracking
          </div>
          <button
            type="button"
            onClick={() => setShowSimulator((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-slate-900 text-white dark:bg-red-600 dark:text-white hover:bg-slate-800 dark:hover:bg-red-700 transition-colors cursor-pointer w-fit"
          >
            <span>⚡</span>
            <span>{showSimulator ? 'Hide Simulator' : 'Pre-Season Score Simulator'}</span>
          </button>
        </div>

        {/* Optional Simulator Expansion */}
        {showSimulator && (
          <div className="pt-1">
            <PreSeasonSimulator onClose={() => setShowSimulator(false)} />
          </div>
        )}

        {/* Region Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {REGIONS.map((reg) => {
            const isActive = selectedRegion === reg.id;
            return (
              <button
                key={reg.id}
                type="button"
                data-testid={`region-pill-${reg.id}`}
                onClick={() => handleRegionChange(reg.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                    : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                {reg.label}
              </button>
            );
          })}
        </div>

        {/* Filters Row: QA Selector & Callsign Search */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          {/* QA Dropdown */}
          <div className="sm:col-span-6 lg:col-span-5">
            <label htmlFor="qa-select" className="sr-only">
              Filter by Qualification Area
            </label>
            <select
              id="qa-select"
              value={selectedQa}
              onChange={(e) => handleQaChange(e.target.value)}
              className="w-full text-xs py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-medium cursor-pointer focus:outline-hidden focus:ring-1 focus:ring-red-500"
            >
              <option value="ALL">All Qualification Areas ({availableQas.length})</option>
              {availableQas.map((qa) => (
                <option key={qa.qaCode} value={qa.qaCode}>
                  {qa.qaCode}: {qa.qaName} ({qa.allocatedTeams} {qa.allocatedTeams === 1 ? 'team' : 'teams'})
                </option>
              ))}
            </select>
          </div>

          {/* Callsign Search Field */}
          <div className="sm:col-span-6 lg:col-span-7 relative">
            <input
              type="text"
              placeholder="Search by callsign (e.g. 9A, K1, G4)..."
              value={searchCall}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full text-xs py-2 pl-9 pr-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-red-500 font-mono"
            />
            <svg
              className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 pointer-events-none"
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

        {/* Results summary bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 font-mono">
          <span>
            Showing {totalMatchingOps} operators across {displayedAreas.length} qualifying areas
          </span>
          {(selectedRegion !== 'ALL' || selectedQa !== 'ALL' || searchCall) && (
            <button
              type="button"
              onClick={() => {
                setSelectedRegion('ALL');
                setSelectedQa('ALL');
                setSearchCall('');
                updateUrl('ALL', '');
              }}
              className="text-red-600 dark:text-red-400 font-semibold underline hover:text-red-700 cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Leaderboard Lists */}
      {displayedAreas.length > 0 ? (
        <div className="space-y-10">
          {displayedAreas.map((area) => (
            <section
              key={area.qaCode}
              id={`qa-${area.qaCode.replace(/[^a-zA-Z0-9]/g, '-')}`}
              className="space-y-3"
            >
              {/* QA Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm px-2 py-0.5 rounded bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                    {area.qaCode}
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                    {area.qaName}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-slate-500 dark:text-slate-400">Quota:</span>
                  <span className="font-bold text-red-600 dark:text-red-400">
                    {area.allocatedTeams} {area.allocatedTeams === 1 ? 'Team' : 'Teams'}
                  </span>
                </div>
              </div>

              {/* Desktop View: Table */}
              <div className="hidden md:block">
                <StandingsTable
                  area={area}
                  onSelectOperator={handleSelectOperator}
                />
              </div>

              {/* Mobile View: Cards */}
              <div className="block md:hidden">
                <StandingsCardList
                  area={area}
                  onSelectOperator={handleSelectOperator}
                />
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            No matching operators found for the selected filter criteria.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedRegion('ALL');
              setSelectedQa('ALL');
              setSearchCall('');
              updateUrl('ALL', '');
            }}
            className="mt-3 text-xs font-bold text-red-600 dark:text-red-400 underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Operator Breakdown Slide-Over Drawer */}
      <OperatorBreakdownDrawer
        operator={selectedOperator}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
