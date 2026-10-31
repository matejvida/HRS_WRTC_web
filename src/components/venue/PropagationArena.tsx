import React from 'react';

export function PropagationArena() {
  return (
    <section aria-labelledby="propagation-arena-heading" className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            Equalized RF Conditions · Slavonia 2030
          </div>
          <h2
            id="propagation-arena-heading"
            className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900 dark:text-white"
          >
            Pannonian Propagation Arena
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md">
          The flat Pannonian Basin around Osijek, Čepin, and Đakovo provides the most egalitarian HF radiosport terrain in WRTC history.
        </p>
      </div>

      {/* 4 Technical Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        {/* Metric 1: Horizon Take-off */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xs relative overflow-hidden">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Horizon Take-off</div>
          <div className="text-2xl sm:text-3xl font-black text-red-600 dark:text-red-400 mt-1">
            0° horizon take-off
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-sans mt-2">
            Unobstructed 360° radiation angles to North America, Asia, South America, and Africa.
          </p>
          <div className="absolute top-0 right-0 w-8 h-8 bg-red-500/10 rounded-bl-xl" />
        </div>

        {/* Metric 2: Uniform Elevation */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xs relative overflow-hidden">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Elevation Band</div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            85m–110m ASL
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-sans mt-2">
            Minimal vertical variance across all 60 competition fields ensures identical antenna height-over-terrain.
          </p>
        </div>

        {/* Metric 3: Ground Conductivity */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xs relative overflow-hidden">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Soil Conductivity</div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            ~0.015 S/m
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-sans mt-2">
            Rich agricultural chernozem and alluvial soils deliver exceptional ground reflection for low-angle DX lobes.
          </p>
        </div>

        {/* Metric 4: Standardized Stations */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xs relative overflow-hidden">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Competition Scale</div>
          <div className="text-2xl sm:text-3xl font-black text-red-600 dark:text-red-400 mt-1">
            60 Field Sites
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-sans mt-2">
            60 identical station set-ups (50 qualified teams + 10 youth/special allocations) spaced for zero mutual interference.
          </p>
        </div>
      </div>

      {/* Technical Propagation SVG Diagram */}
      <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 overflow-hidden relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <h3 className="font-bold font-mono text-sm tracking-wide text-slate-200">
              Low-Angle HF Wave Launch Profile (10m · 15m · 20m)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Drava-Danube Plain · Slavonia, Croatia
          </span>
        </div>

        <div className="w-full h-36 relative overflow-hidden">
          <svg
            className="w-full h-full"
            viewBox="0 0 800 140"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Ionosphere boundary */}
            <path d="M0,20 Q400,10 800,20" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
            <text x="20" y="16" fill="#93C5FD" fontSize="10" fontFamily="monospace">Ionospheric F2 Layer (~250-300 km)</text>

            {/* Flat terrain line */}
            <line x1="0" y1="120" x2="800" y2="120" stroke="#475569" strokeWidth="2" />
            <text x="20" y="134" fill="#94A3B8" fontSize="10" fontFamily="monospace">Flat Pannonian Plain (85m–110m ASL · 0° Horizon Take-off)</text>

            {/* Antenna Mast representation at x=150 */}
            <line x1="150" y1="120" x2="150" y2="70" stroke="#ED1C24" strokeWidth="2.5" />
            <circle cx="150" cy="70" r="3" fill="#ED1C24" />
            <text x="135" y="64" fill="#FCA5A5" fontSize="9" fontFamily="monospace" fontWeight="bold">15m Mast</text>

            {/* Low-angle RF Rays */}
            <path d="M150,70 Q450,20 750,25" stroke="#ED1C24" strokeWidth="2" opacity="0.85" />
            <path d="M150,70 Q480,25 800,45" stroke="#F87171" strokeWidth="1.5" opacity="0.7" />
            <path d="M150,70 Q510,35 800,65" stroke="#FCA5A5" strokeWidth="1" opacity="0.5" strokeDasharray="3 3" />

            {/* Takeoff angle arc */}
            <path d="M190,118 A40,40 0 0,0 188,96" stroke="#FBBF24" strokeWidth="1.5" />
            <text x="200" y="110" fill="#FCD34D" fontSize="10" fontFamily="monospace" fontWeight="bold">0° - 5°</text>
          </svg>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400">
          <div>
            <span className="text-white font-bold">No Geographical Blocking:</span> Zero mountain ranges or hills impeding long-path DX to JA, VK/ZL, and W6/W7.
          </div>
          <div>
            <span className="text-white font-bold">Standardized Spacing:</span> Stations isolated by &gt; 1,500m to guarantee clean receivers without adjacent-channel saturation.
          </div>
          <div>
            <span className="text-white font-bold">Pristine Noise Floor:</span> Ambient man-made RF noise lower than ITU rural limits across 160m–10m.
          </div>
        </div>
      </div>
    </section>
  );
}
