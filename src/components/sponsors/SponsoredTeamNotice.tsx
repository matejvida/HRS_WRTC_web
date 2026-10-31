import React from 'react';

export function SponsoredTeamNotice() {
  return (
    <section
      aria-labelledby="sponsored-team-heading"
      className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="font-mono text-xs font-bold text-red-400 uppercase tracking-wider">
            Selection Rules v1.0 Section 8.D
          </span>
        </div>
        <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-semibold border border-slate-700 w-fit">
          Applications Open: 1 January 2029
        </span>
      </div>

      <div className="space-y-2">
        <h3
          id="sponsored-team-heading"
          className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white"
        >
          4 Sponsored Teams Allocation
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          In strict accordance with WRTC tradition and Section 8.D of the official Selection Rules v1.0, exactly <strong>4 Sponsored Teams</strong> are reserved for organizations, equipment manufacturers, or DX foundations providing principal underwriting for WRTC 2030.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 font-mono text-xs">
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="text-slate-500 uppercase tracking-wider text-[10px]">Team Composition</div>
          <div className="text-sm font-bold text-white">1 Team Leader + 1 Team Mate</div>
          <p className="text-[11px] text-slate-400 font-sans mt-1">
            The sponsoring organization nominates the Team Leader, subject to qualification standards and confirmation by the WRTC Steering Committee.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="text-slate-500 uppercase tracking-wider text-[10px]">Equal Station Parity</div>
          <div className="text-sm font-bold text-white">100% Identical Competition Field</div>
          <p className="text-[11px] text-slate-400 font-sans mt-1">
            Sponsored Teams compete under the exact same technical constraints (100W, identical masts, antennas, and referee monitoring) as all 50 automatically qualified teams.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="text-slate-500 uppercase tracking-wider text-[10px]">Dignified Governance</div>
          <div className="text-sm font-bold text-white">Zero Public Bidding Auctions</div>
          <p className="text-[11px] text-slate-400 font-sans mt-1">
            WRTC 2030 does not operate speculative online auctions, tent-picking grids, or commercial checkout carts.
          </p>
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs text-slate-400 font-sans">
          Interested corporate or institutional sponsors may submit preliminary formal inquiries directly to the Organizing Committee.
        </p>
        <a
          href="mailto:wrtc2030@hamradio.hr?subject=[WRTC%202030]%20Sponsored%20Team%20Inquiry%20(Rule%208.D)"
          className="px-5 py-2.5 rounded-xl font-mono font-bold text-xs bg-red-600 text-white hover:bg-red-700 transition-colors whitespace-nowrap text-center shrink-0"
        >
          Inquire About Sponsored Teams (Rule 8.D) →
        </a>
      </div>
    </section>
  );
}
