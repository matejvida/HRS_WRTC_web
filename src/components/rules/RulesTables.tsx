import React from 'react';
import {
  getQualifyingEvents,
  getWeightingFactors,
  getQualifyingAreas,
  getSpecialTeams,
} from '@/lib/rules-loader';

export function Table1QualifyingEvents() {
  const events = getQualifyingEvents();

  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
          Table 1 - Qualifying Events (24 Contests)
        </h4>
        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
          Dec 2026 – Nov 2028
        </span>
      </div>
      <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="py-2.5 px-3 w-12 text-center font-mono">#</th>
              <th className="py-2.5 px-3 min-w-[200px]">Contest Name</th>
              <th className="py-2.5 px-3 min-w-[140px] font-mono">Dates (UTC)</th>
              <th className="py-2.5 px-3 w-24 text-center">Mode</th>
              <th className="py-2.5 px-3 w-24 text-right font-mono">Max Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono tabular-nums bg-white dark:bg-slate-950">
            {events.map((evt) => (
              <tr
                key={evt.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
              >
                <td className="py-2 px-3 text-center text-slate-500 font-medium">
                  {evt.id}
                </td>
                <td className="py-2 px-3 font-sans font-medium text-slate-900 dark:text-slate-100">
                  <span>{evt.name}</span>
                  <span className="block text-xs text-slate-500 font-mono">
                    {evt.shortName}
                  </span>
                </td>
                <td className="py-2 px-3 text-slate-600 dark:text-slate-400 text-xs whitespace-nowrap">
                  {evt.datesUtc}
                </td>
                <td className="py-2 px-3 text-center font-sans">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                      evt.mode === 'CW'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        : evt.mode === 'SSB'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    }`}
                  >
                    {evt.mode}
                  </span>
                </td>
                <td className="py-2 px-3 text-right font-bold text-slate-900 dark:text-slate-100">
                  {evt.value}
                  {evt.primaryRegionValue && (
                    <span className="block text-[10px] text-red-600 dark:text-red-400 font-normal">
                      ({evt.primaryRegionValue} reg.)
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Table2WeightingFactors() {
  const wf = getWeightingFactors();

  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
          Table 2 - Category Weighting Factor (WF)
        </h4>
      </div>
      <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="py-2.5 px-3 min-w-[120px]">Category Code</th>
              <th className="py-2.5 px-3 min-w-[240px]">Contest Category Description</th>
              <th className="py-2.5 px-3 w-28 text-right font-mono">Weight (WF)</th>
              <th className="py-2.5 px-3 min-w-[200px]">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-950 font-mono tabular-nums">
            {wf.categories.map((cat) => (
              <tr
                key={cat.code}
                className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
              >
                <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-slate-100">
                  {cat.code}
                </td>
                <td className="py-2.5 px-3 font-sans text-slate-800 dark:text-slate-200">
                  {cat.description}
                </td>
                <td className="py-2.5 px-3 text-right font-bold text-red-600 dark:text-red-400">
                  {cat.weight.toFixed(2)}
                </td>
                <td className="py-2.5 px-3 font-sans text-xs text-slate-500 dark:text-slate-400">
                  {cat.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Table3QualifyingAreas() {
  const qas = getQualifyingAreas();
  const totalSlots = qas.reduce((acc, curr) => acc + curr.allocatedTeams, 0);

  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
          Table 3 - Qualification Areas and Number of Qualifying Teams
        </h4>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
          50 Qualifying Teams
        </span>
      </div>
      <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="py-2.5 px-3 w-24 font-mono">Area ID</th>
              <th className="py-2.5 px-3 w-28">Continent</th>
              <th className="py-2.5 px-3 min-w-[240px]">Geographic Coverage</th>
              <th className="py-2.5 px-3 min-w-[200px]">Prefixes / DXCC Entities</th>
              <th className="py-2.5 px-3 w-24 text-right font-mono">Quotas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-950 font-mono tabular-nums">
            {qas.map((qa) => (
              <tr
                key={qa.code}
                className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
              >
                <td className="py-2 px-3 font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                  {qa.code}
                </td>
                <td className="py-2 px-3 font-sans text-xs text-slate-600 dark:text-slate-400">
                  {qa.continent}
                </td>
                <td className="py-2 px-3 font-sans font-medium text-slate-800 dark:text-slate-200">
                  {qa.name}
                  {qa.hasSubAreas && (
                    <span className="ml-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      Sub-Areas
                    </span>
                  )}
                </td>
                <td className="py-2 px-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {qa.countriesDescription}
                </td>
                <td className="py-2 px-3 text-right font-bold text-slate-900 dark:text-slate-100">
                  {qa.allocatedTeams}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-50 dark:bg-slate-900/80 font-bold border-t border-slate-200 dark:border-slate-800">
            <tr>
              <td colSpan={4} className="py-2.5 px-3 text-right text-slate-700 dark:text-slate-300 font-sans">
                Total Allocated Teams (Table 3):
              </td>
              <td className="py-2.5 px-3 text-right text-red-600 dark:text-red-400 font-mono text-sm">
                {totalSlots}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export function Table4SubAreas() {
  const qas = getQualifyingAreas();
  const subAreaQas = qas.filter((q) => q.hasSubAreas && q.subAreas && q.subAreas.length > 0);

  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
          Table 4 - Sub-Areas
        </h4>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          6 Qualifying Areas
        </span>
      </div>
      <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="py-2.5 px-3 w-28 font-mono">QA Code</th>
              <th className="py-2.5 px-3 min-w-[200px]">Sub-Area Breakdown</th>
              <th className="py-2.5 px-3 min-w-[300px]">Entities / Call Areas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-950 font-mono tabular-nums">
            {subAreaQas.map((qa) => (
              <React.Fragment key={qa.code}>
                {qa.subAreas?.map((sub, idx) => (
                  <tr
                    key={sub.code}
                    className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                  >
                    {idx === 0 && (
                      <td
                        rowSpan={qa.subAreas?.length}
                        className="py-2.5 px-3 font-bold text-slate-900 dark:text-slate-100 align-top border-r border-slate-100 dark:border-slate-800"
                      >
                        {qa.code}
                        <span className="block font-sans text-xs text-slate-500 font-normal">
                          {qa.name}
                        </span>
                      </td>
                    )}
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-800 dark:text-slate-200">
                      {sub.name}
                    </td>
                    <td className="py-2.5 px-3 text-xs text-slate-600 dark:text-slate-400">
                      {sub.description}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Table5CategoryOrder() {
  const wf = getWeightingFactors();

  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
          Table 5 - Category Preference in Order of Reference Results
        </h4>
      </div>
      <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="py-2.5 px-3 w-16 text-center font-mono">Order</th>
              <th className="py-2.5 px-3 min-w-[160px] font-mono">Category</th>
              <th className="py-2.5 px-3 min-w-[260px]">Criteria / Comparison Rule</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-950 font-mono tabular-nums">
            {wf.categoryOrder.map((row) => (
              <tr
                key={row.order}
                className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
              >
                <td className="py-2 px-3 text-center font-bold text-slate-500">
                  {row.order}
                </td>
                <td className="py-2 px-3 font-bold text-slate-900 dark:text-slate-100">
                  {row.code}
                </td>
                <td className="py-2 px-3 font-sans text-xs text-slate-700 dark:text-slate-300">
                  {row.criteria}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Table6QaChanges() {
  const situations = [
    {
      situation: 'Operates from Home QA',
      rankingQa: 'Home QA',
      outsideQaScore: 'No',
      approval: 'No',
    },
    {
      situation: 'Temporarily operates from another QA (max. 3 scores)',
      rankingQa: 'Home QA',
      outsideQaScore: 'Yes',
      approval: 'No',
    },
    {
      situation: 'Seeks to qualify from another QA with a substantial continuing connection',
      rankingQa: 'Approved Alternate Home QA',
      outsideQaScore: 'Other than Home QA only if approved',
      approval: 'Yes',
    },
    {
      situation: 'Permanently relocates to another QA during qualification',
      rankingQa: 'Determined by WRTC OC',
      outsideQaScore: 'Determined case-by-case',
      approval: 'Notification and OC determination required',
    },
  ];

  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
          Table 6 - Qualification Area Changes and Approvals
        </h4>
      </div>
      <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="py-2.5 px-3 min-w-[220px]">Situation</th>
              <th className="py-2.5 px-3 min-w-[160px]">QA Used for TL Ranking</th>
              <th className="py-2.5 px-3 min-w-[140px]">Outside-QA Score</th>
              <th className="py-2.5 px-3 min-w-[160px]">Prior WRTC OC Approval</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-950 font-sans">
            {situations.map((sit, idx) => (
              <tr
                key={idx}
                className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
              >
                <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-slate-100">
                  {sit.situation}
                </td>
                <td className="py-2.5 px-3 text-xs text-slate-700 dark:text-slate-300 font-mono">
                  {sit.rankingQa}
                </td>
                <td className="py-2.5 px-3 text-xs text-slate-600 dark:text-slate-400">
                  {sit.outsideQaScore}
                </td>
                <td className="py-2.5 px-3 text-xs font-semibold text-slate-900 dark:text-slate-200">
                  {sit.approval}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Table7SpecialTeams() {
  const teams = getSpecialTeams();
  const totalSpecial = teams.reduce((acc, curr) => acc + curr.allocatedTeams, 0);

  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
          Table 7 - Special Teams
        </h4>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-mono">
          {totalSpecial} Teams
        </span>
      </div>
      <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="py-2.5 px-3 min-w-[160px]">Category</th>
              <th className="py-2.5 px-3 w-20 text-right font-mono">Quota</th>
              <th className="py-2.5 px-3 min-w-[280px]">Description / Eligibility Criteria</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-950 font-sans">
            {teams.map((team) => (
              <tr
                key={team.code}
                className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
              >
                <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-slate-100">
                  {team.name}
                </td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-600 dark:text-amber-400">
                  {team.allocatedTeams}
                </td>
                <td className="py-2.5 px-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <div>{team.description}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">{team.criteria}</div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-50 dark:bg-slate-900/80 font-bold border-t border-slate-200 dark:border-slate-800">
            <tr>
              <td className="py-2.5 px-3 text-right text-slate-700 dark:text-slate-300 font-sans">
                Total Special Teams:
              </td>
              <td className="py-2.5 px-3 text-right text-amber-600 dark:text-amber-400 font-mono text-sm">
                {totalSpecial}
              </td>
              <td className="py-2.5 px-3 text-xs text-slate-500 font-normal font-sans">
                Brings total WRTC 2030 championship field to exactly 60 teams (120 competitors).
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
