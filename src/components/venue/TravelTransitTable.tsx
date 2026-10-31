import React from 'react';

interface Gateway {
  code: string;
  name: string;
  city: string;
  country: string;
  distance: string;
  driveTime: string;
  role: string;
}

const GATEWAYS: Gateway[] = [
  {
    code: 'OSI',
    name: 'Osijek Airport (Klisa)',
    city: 'Osijek',
    country: 'Croatia',
    distance: '18 km',
    driveTime: '15–20 min',
    role: 'Host Region Regional Airport (Direct European & Charter Connections)',
  },
  {
    code: 'ZAG',
    name: 'Zagreb Airport (Franjo Tuđman)',
    city: 'Zagreb',
    country: 'Croatia',
    distance: '280 km',
    driveTime: '2h 30m',
    role: 'Croatia’s Flagship International Hub (Star Alliance / SkyTeam / OneWorld)',
  },
  {
    code: 'BUD',
    name: 'Budapest Ferenc Liszt Airport',
    city: 'Budapest',
    country: 'Hungary',
    distance: '260 km',
    driveTime: '2h 45m',
    role: 'Central European Megahub (Direct Transatlantic & Global Flights)',
  },
  {
    code: 'BEG',
    name: 'Belgrade Nikola Tesla Airport',
    city: 'Belgrade',
    country: 'Serbia',
    distance: '170 km',
    driveTime: '1h 50m',
    role: 'Southeastern European Gateway (Direct Flights from North America & Asia)',
  },
];

export function TravelTransitTable() {
  return (
    <section aria-labelledby="transit-heading" className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 mb-2">
            International Logistics · How to Reach Slavonia
          </div>
          <h2
            id="transit-heading"
            className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900 dark:text-white"
          >
            International Travel & Arrival Corridors
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md">
          Slavonia sits at the crossroads of Central Europe with four international airports within a 2.5-hour radius and modern motorway connections.
        </p>
      </div>

      {/* Airport Table (Desktop) */}
      <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-950 shadow-xs">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 font-semibold text-slate-700 dark:text-slate-300">
            <tr>
              <th className="py-3 px-4 w-20 font-mono">IATA</th>
              <th className="py-3 px-4 min-w-[180px]">Airport & City</th>
              <th className="py-3 px-3 w-28 font-mono">Distance</th>
              <th className="py-3 px-3 w-28 font-mono">Drive Time</th>
              <th className="py-3 px-4">Role & Connectivity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-sans">
            {GATEWAYS.map((gw) => (
              <tr key={gw.code} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                <td className="py-3.5 px-4 font-mono font-black text-red-600 dark:text-red-400 text-sm">
                  {gw.code}
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-900 dark:text-white">{gw.name}</div>
                  <div className="text-xs text-slate-500">{gw.city}, {gw.country}</div>
                </td>
                <td className="py-3.5 px-3 font-mono text-slate-700 dark:text-slate-300">
                  {gw.distance}
                </td>
                <td className="py-3.5 px-3 font-mono font-bold text-slate-900 dark:text-white">
                  {gw.driveTime}
                </td>
                <td className="py-3.5 px-4 text-xs text-slate-600 dark:text-slate-400">
                  {gw.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Highway and Transit Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 font-sans">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              Motorway Corridor
            </span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              A5 Slavonika (European Corridor Vc)
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Direct 4-lane motorway linking Osijek, Čepin, and Đakovo with the central Zagreb–Belgrade highway (A3/E70) and European motorway networks through Hungary. Zero traffic congestion in the contest field arena.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 font-sans">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
              WRTC Shuttle Fleet
            </span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Dedicated Competitor & Referee Shuttles
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            The Organizing Committee will operate direct scheduled shuttle vans from Zagreb (ZAG), Osijek (OSI), and Belgrade (BEG) airports directly to hotel registrations and operating station field headquarters.
          </p>
        </div>
      </div>
    </section>
  );
}
