'use client';

import React, { useState, useId } from 'react';

interface PreSeasonSimulatorProps {
  onClose?: () => void;
}

export function PreSeasonSimulator({ onClose }: PreSeasonSimulatorProps) {
  const [eventValue, setEventValue] = useState<number>(1000);
  const [eventFactor, setEventFactor] = useState<number>(1.0);
  const [modeFactor, setModeFactor] = useState<number>(1.0);
  const [opFactor, setOpFactor] = useState<number>(1.0);
  const [qaFactor, setQaFactor] = useState<number>(1.0);
  const [rawScore, setRawScore] = useState<string>('4000000');
  const [leaderScore, setLeaderScore] = useState<string>('5000000');

  const evId = useId();
  const efId = useId();
  const mfId = useId();
  const ofId = useId();
  const qfId = useId();
  const rawId = useId();
  const leaderId = useId();

  const numRaw = Math.max(0, parseFloat(rawScore) || 0);
  const numLeader = Math.max(0, parseFloat(leaderScore) || 0);

  // Score ratio capped at 1.00 (100%)
  const scoreRatio = numLeader > 0 ? Math.min(1.0, numRaw / numLeader) : 0;
  const effectiveWf = eventFactor * modeFactor * opFactor * qaFactor;
  const calculatedPoints = eventValue * effectiveWf * scoreRatio;

  return (
    <section
      aria-label="Pre-Season Score Simulator"
      className="p-4 sm:p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6"
    >
      <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-red-600/30 text-red-400 border border-red-500/30 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Selection Rules v1.0 Section 6
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-mono">
            Pre-Season Score Simulator
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Simulate your qualification points under official Table 1 & Table 2 multipliers before the 24-month cycle opens with the 9A DX Contest.
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close simulator"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Control Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
        {/* Event Value */}
        <div className="space-y-1.5">
          <label htmlFor={evId} className="block font-semibold text-slate-300">
            Event Base Value
          </label>
          <select
            id={evId}
            value={eventValue}
            onChange={(e) => setEventValue(parseFloat(e.target.value))}
            className="w-full py-2 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono"
          >
            <option value="1000">1000 pts (Major / 9A DX / WRTC)</option>
            <option value="900">900 pts (WAEDC / All Asian)</option>
            <option value="800">800 pts (Regional Contests)</option>
          </select>
        </div>

        {/* Event Factor */}
        <div className="space-y-1.5">
          <label htmlFor={efId} className="block font-semibold text-slate-300">
            Event Factor (EF)
          </label>
          <select
            id={efId}
            value={eventFactor.toFixed(2)}
            onChange={(e) => setEventFactor(parseFloat(e.target.value))}
            className="w-full py-2 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono"
          >
            <option value="1.00">1.00 (Major Contest)</option>
            <option value="0.90">0.90 (Large Contest)</option>
            <option value="0.80">0.80 (Regular Contest)</option>
          </select>
        </div>

        {/* Mode Factor */}
        <div className="space-y-1.5">
          <label htmlFor={mfId} className="block font-semibold text-slate-300">
            Mode Factor (MF)
          </label>
          <select
            id={mfId}
            value={modeFactor.toFixed(2)}
            onChange={(e) => setModeFactor(parseFloat(e.target.value))}
            className="w-full py-2 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono"
          >
            <option value="1.00">1.00 (CW / Mixed)</option>
            <option value="0.90">0.90 (SSB Phone)</option>
          </select>
        </div>

        {/* Operator Factor */}
        <div className="space-y-1.5">
          <label htmlFor={ofId} className="block font-semibold text-slate-300">
            Operator Factor (OF)
          </label>
          <select
            id={ofId}
            value={opFactor.toFixed(2)}
            onChange={(e) => setOpFactor(parseFloat(e.target.value))}
            className="w-full py-2 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono"
          >
            <option value="1.00">1.00 (Single-Operator)</option>
            <option value="0.90">0.90 (Multi-Operator §5.A)</option>
          </select>
        </div>
      </div>

      {/* Second Row: Outside QA & Raw Scores */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
        <div className="space-y-1.5">
          <label htmlFor={qfId} className="block font-semibold text-slate-300">
            QA Location Factor (§5.B)
          </label>
          <select
            id={qfId}
            value={qaFactor.toFixed(2)}
            onChange={(e) => setQaFactor(parseFloat(e.target.value))}
            className="w-full py-2 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono"
          >
            <option value="1.00">1.00 (Inside Operator QA)</option>
            <option value="0.75">0.75 (Outside QA - 25% Reduction)</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor={rawId} className="block font-semibold text-slate-300">
            Your Raw Score
          </label>
          <input
            id={rawId}
            type="number"
            min="0"
            value={rawScore}
            onChange={(e) => setRawScore(e.target.value)}
            className="w-full py-2 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono"
            placeholder="e.g. 4000000"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor={leaderId} className="block font-semibold text-slate-300">
            QA Leader Raw Score
          </label>
          <input
            id={leaderId}
            type="number"
            min="0"
            value={leaderScore}
            onChange={(e) => setLeaderScore(e.target.value)}
            className="w-full py-2 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono"
            placeholder="e.g. 5000000"
          />
        </div>
      </div>

      {/* Calculated Result Display Banner */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
        <div>
          <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-1">
            Calculated Qualification Points
          </div>
          <div className="text-3xl sm:text-4xl font-black text-red-500">
            {calculatedPoints.toFixed(2)} pts
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Effective Weighting Factor: <span className="text-white font-bold">{effectiveWf.toFixed(4)}</span> · Score Ratio:{' '}
            <span className="text-white font-bold">{(scoreRatio * 100).toFixed(2)}%</span>
            {numRaw > numLeader && numLeader > 0 && (
              <span className="text-amber-400 ml-1.5">(Capped at 100%)</span>
            )}
          </div>
        </div>

        {/* Formula Trace */}
        <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 max-w-md">
          <div className="text-[10px] text-slate-500 font-semibold mb-1">FORMULA TRACE:</div>
          <p className="font-mono text-[11px] text-slate-300">
            {eventValue} × ({eventFactor.toFixed(2)} × {modeFactor.toFixed(2)} × {opFactor.toFixed(2)}
            {qaFactor < 1 ? ` × ${qaFactor.toFixed(2)}` : ''}) × ({numRaw.toLocaleString()} / {numLeader > 0 ? numLeader.toLocaleString() : '1'})
          </p>
          <p className="font-mono text-xs text-red-400 font-bold mt-1">
            = {calculatedPoints.toFixed(2)} pts
          </p>
        </div>
      </div>
    </section>
  );
}
