import React from 'react';

interface Destination {
  id: string;
  name: string;
  tagline: string;
  role: string;
  highlights: string[];
  description: string;
}

const DESTINATIONS: Destination[] = [
  {
    id: 'osijek',
    name: 'Osijek',
    tagline: 'Host City Headquarters & Baroque Drava Metropolis',
    role: 'WRTC 2030 Central Headquarters & Accommodations',
    highlights: [
      'Tvrđa 18th-century Habsburg star fortress',
      '5 km scenic Drava River promenade',
      'Hotel Osijek & modern athlete village campus',
      'Historic tram network & craft beer culinary quarter',
    ],
    description:
      'The administrative and cultural capital of eastern Croatia, Osijek welcomes the global radiosport community with historic Habsburg architecture, vibrant Drava riverfront promenades, and world-class hospitality infrastructure.',
  },
  {
    id: 'dakovo',
    name: 'Đakovo',
    tagline: 'The Heart of Slavonia & Royal Lipizzaner Heritage',
    role: 'Co-Host City & Cultural Gala Venue',
    highlights: [
      'Cathedral of St. Peter with 84m red-brick spires',
      'State Lipizzaner Stud Farm (founded 1506)',
      'Traditional Slavonian folklore (Đakovački vezovi)',
      'Centuries-old diocese wine cellars',
    ],
    description:
      'Home to the majestic twin-spired Cathedral of St. Peter—described by Pope John XXIII as the most beautiful cathedral between Venice and Constantinople—and the legendary 500-year-old Lipizzaner stud farm visited by Queen Elizabeth II in 1972.',
  },
  {
    id: 'cepin',
    name: 'Čepin',
    tagline: 'Radiosport Operating Heartland & Pannonian Fields',
    role: '60-Station Operating Arena & Field Headquarters',
    highlights: [
      'Unbroken 0° horizon take-off agricultural plain',
      'Central technical staging base & logistics depot',
      'Rich alluvial soil conductivity (~0.015 S/m)',
      'Direct access via A5 Slavonika motorway corridor',
    ],
    description:
      'Situated just south of Osijek in the heart of the fertile plain, Čepin provides the expansive, unshielded agricultural fields hosting the 60 standardized WRTC 2030 operating stations with zero terrain obstruction.',
  },
  {
    id: 'kopacki-rit',
    name: 'Kopački Rit',
    tagline: 'Nature Park & The "Amazon of Europe"',
    role: 'Official Excursion & Visiting Family Destination',
    highlights: [
      'One of Europe’s largest preserved inland river wetlands',
      'Confluence of the mighty Danube and Drava rivers',
      'Habitat for 300+ bird species including white-tailed eagles',
      'Traditional wooden walkways and electric boat safaris',
    ],
    description:
      'Located minutes north of Osijek across the Drava in Baranja, this biological wetland jewel offers visiting families and spectators unforgettable boat safaris, birdwatching, and idyllic ethno-villages.',
  },
];

export function DestinationCards() {
  return (
    <section aria-labelledby="destinations-heading" className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-2">
            Regional Showcase · Slavonia & Baranja
          </div>
          <h2
            id="destinations-heading"
            className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900 dark:text-white"
          >
            Host Cities & Regional Destinations
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md">
          Discover the historical cities, protected nature reserves, and field stations that will host the World Radiosport Team Championship in July 2030.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DESTINATIONS.map((dest) => (
          <article
            key={dest.id}
            className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xs flex flex-col justify-between hover:border-red-500/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
                  {dest.role}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white">
                {dest.name}
              </h3>
              <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-3">
                {dest.tagline}
              </p>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {dest.description}
              </p>

              <div className="space-y-1.5 border-t border-slate-100 dark:border-slate-800/80 pt-3">
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Highlights:
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  {dest.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
