import React from 'react';
import {
  Table1QualifyingEvents,
  Table2WeightingFactors,
  Table3QualifyingAreas,
  Table4SubAreas,
  Table5CategoryOrder,
  Table6QaChanges,
  Table7SpecialTeams,
} from './RulesTables';

export function SelectionRulesProse() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none space-y-12 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base">
      {/* Preamble & Integrity Notice */}
      <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 not-prose">
        <div className="flex items-center gap-2 mb-3 text-red-600 dark:text-red-500 font-bold text-sm uppercase tracking-wider">
          <span className="w-2.5 h-2.5 bg-red-600 rounded-full inline-block animate-pulse" />
          Official Sanction & Personal Integrity Notice
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          On <strong>3 October 2026</strong>, the WRTC Sanctioning Committee (WRTC SC) formally approved the next World Radiosport Team Championship, to be hosted by the Croatian Amateur Radio Association (HRS) in <strong>July 2030</strong>.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The WRTC 2030 Organizing Committee (WRTC OC) looks forward to welcoming 120 of the world’s top contesters to <strong>Osijek, Croatia</strong>. To earn your place, we invite you to compete in the qualifying events listed below. Personal integrity is a core principle: participants are expected to strictly observe all individual contest rules, power limits, remote receiving restrictions, and spotting assistance rules.
        </p>
      </div>

      {/* Section 1 */}
      <section id="section-1" className="scroll-mt-24 pt-2 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <span className="font-mono text-red-600 dark:text-red-500 text-lg sm:text-xl">1.</span>
          Qualifying Events and WRTC 2030 Selection Criteria
        </h2>
        <p>
          Each qualifying event has an assigned maximum point value used in the qualification score calculation. Point values are weighted based on the contest’s scope, participation levels, complexity, and popularity:
        </p>
        <ul className="list-disc pl-5 space-y-1 my-3">
          <li><strong>1,000 points:</strong> Assigned to major, highly popular worldwide contests.</li>
          <li><strong>800–950 points:</strong> Assigned to events with lower overall activity, reduced complexity, or restricted geographic scope.</li>
          <li><strong>900 points:</strong> For eligible entrants in designated primary regions (W/VE stations for ARRL DX, Asian stations for All Asian DX, and European stations for WAE DX), the maximum point value is increased to 900 points to recognize heightened competition.</li>
        </ul>

        <Table1QualifyingEvents />

        <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
          <p><strong>Note 1:</strong> Qualifying events begin on <strong>19 December 2026 (9A DX Contest)</strong> and conclude on <strong>26 November 2028 (CQ WW CW)</strong>.</p>
          <p><strong>Note 2:</strong> Designated primary regions apply to W/VE stations for ARRL DX, Asian stations for All Asian DX, and EU stations for WAE DX.</p>
        </div>
      </section>

      {/* Section 2 */}
      <section id="section-2" className="scroll-mt-24 pt-8 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <span className="font-mono text-red-600 dark:text-red-500 text-lg sm:text-xl">2.</span>
          Category Weighting Factor (WF)
        </h2>
        <p>
          To maintain fairness across operating styles, scores are multiplied by a Category Weighting Factor based on power level, assistance, and operator configuration:
        </p>

        <Table2WeightingFactors />

        <p className="text-sm">
          For contests without separate Assisted and Unassisted categories (e.g. CQ WPX), High Power entrants receive a Weighting Factor of <strong>1.00</strong>, and Low Power entrants receive <strong>0.90</strong>.
        </p>
      </section>

      {/* Section 3 */}
      <section id="section-3" className="scroll-mt-24 pt-8 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <span className="font-mono text-red-600 dark:text-red-500 text-lg sm:text-xl">3.</span>
          Qualification Areas (QA) and Number of Teams
        </h2>
        <p>
          To ensure equitable worldwide geographic representation, the world is divided into <strong>29 Qualification Areas</strong> allocating a total of <strong>50 Qualifying Teams</strong> (100 operators):
        </p>
        <ul className="list-disc pl-5 space-y-1 my-2">
          <li><strong>Europe (EU #1–#9):</strong> 23 Qualifying Teams</li>
          <li><strong>North America (NA #1–#11):</strong> 16 Qualifying Teams</li>
          <li><strong>Asia (AS #1–#4):</strong> 5 Qualifying Teams</li>
          <li><strong>Africa (AF #1):</strong> 2 Qualifying Teams</li>
          <li><strong>South America (SA #1–#2):</strong> 2 Qualifying Teams</li>
          <li><strong>Oceania (OC #1–#2):</strong> 2 Qualifying Teams</li>
        </ul>

        <Table3QualifyingAreas />

        <h3 className="text-base sm:text-lg font-bold mt-8 mb-2 text-slate-900 dark:text-white">
          Sub-Area Normalization (Table 4)
        </h3>
        <p>
          To neutralize extreme intra-area propagation disparities across large geographic distances, six Qualification Areas are subdivided into Sub-Areas. Scores are normalized against the highest score achieved within the entrant’s specific Sub-Area:
        </p>

        <Table4SubAreas />
      </section>

      {/* Section 4 */}
      <section id="section-4" className="scroll-mt-24 pt-8 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <span className="font-mono text-red-600 dark:text-red-500 text-lg sm:text-xl">4.</span>
          Qualifying Event Score Calculation
        </h2>
        <p>
          An applicant’s score in a qualifying contest is calculated according to the official formula:
        </p>
        <div className="not-prose my-4 p-4 rounded-xl bg-slate-900 text-white font-mono text-center text-sm sm:text-base border border-slate-800">
          <span className="text-red-400 font-bold">Event Score</span> = Event Max Value × Category WF × (Applicant’s Score / Maximum Score in QA)
        </div>
        <p>
          Where:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Event Max Value:</strong> Point value from Table 1 (800 to 1,000 points).</li>
          <li><strong>Category WF:</strong> Weighting factor from Table 2 (0.75 to 1.00).</li>
          <li><strong>Applicant’s Score:</strong> Final published raw score achieved by the applicant.</li>
          <li><strong>Maximum Score in QA:</strong> Highest score achieved in that contest category within the applicant’s QA (or Sub-Area, per Table 4).</li>
        </ul>

        <h3 className="text-base sm:text-lg font-bold mt-8 mb-2 text-slate-900 dark:text-white">
          Category Preference Order (Table 5)
        </h3>
        <p>
          If a lower category in Table 5 achieves a higher score than a higher category in the same QA, that higher score replaces the denominator to preserve mathematical fairness:
        </p>

        <Table5CategoryOrder />
      </section>

      {/* Section 5 */}
      <section id="section-5" className="scroll-mt-24 pt-8 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <span className="font-mono text-red-600 dark:text-red-500 text-lg sm:text-xl">5.</span>
          Qualification Score Calculation
        </h2>
        <p>
          An applicant’s overall WRTC 2030 Qualification Score is the sum of their <strong>ten (10) best Event Scores</strong> earned across the 24 qualifying contests.
        </p>
        <div className="not-prose p-4 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs sm:text-sm text-amber-900 dark:text-amber-200 space-y-2">
          <p><strong>Outside-QA Score Cap:</strong> An applicant may count a maximum of <strong>three (3) scores</strong> earned from stations located outside their approved Home QA.</p>
          <p><strong>Single-Op Multi-Operator Cap:</strong> An applicant may count a maximum of <strong>two (2) Multi-Operator scores</strong> toward their top 10 scores.</p>
        </div>
      </section>

      {/* Section 6 */}
      <section id="section-6" className="scroll-mt-24 pt-8 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <span className="font-mono text-red-600 dark:text-red-500 text-lg sm:text-xl">6.</span>
          Team Leader (TL) Selection and Eligibility Rules
        </h2>
        <p>
          To qualify as a Team Leader (TL), an operator must submit their qualifying scores to the WRTC 2030 Organizing Committee following the conclusion of the final qualifying event.
        </p>

        <h3 className="text-base font-bold mt-4 mb-2 text-slate-900 dark:text-white">
          6.1 Determination of Qualification Area (QA)
        </h3>
        <p>
          An applicant’s Home QA is generally determined by their primary continuous residence and licensing. Temporary operations and relocations are governed by strict approval criteria:
        </p>

        <Table6QaChanges />

        <h3 className="text-base font-bold mt-6 mb-2 text-slate-900 dark:text-white">
          6.2 Team Leader Selection by Qualification Area
        </h3>
        <p>
          Eligible TL candidates are ranked within their approved Home QA in descending order of Qualification Score. Invitations will be issued according to the number of positions allocated in Table 3.
        </p>
      </section>

      {/* Section 7 */}
      <section id="section-7" className="scroll-mt-24 pt-8 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <span className="font-mono text-red-600 dark:text-red-500 text-lg sm:text-xl">7.</span>
          Team Mate (TM) Qualification
        </h2>
        <p>
          Each qualified Team Leader selects their Team Mate (TM). The TM must:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Hold a valid amateur radio operator license.</li>
          <li>Have actively participated in at least one qualifying contest during the cycle.</li>
          <li>Not have been disqualified or sanctioned for rule violations by the WRTC OC or SC.</li>
        </ul>
        <p className="text-sm">
          A Team Mate may be selected from any country or Qualification Area worldwide unless restricted by specific Special Team criteria.
        </p>
      </section>

      {/* Section 8 */}
      <section id="section-8" className="scroll-mt-24 pt-8 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <span className="font-mono text-red-600 dark:text-red-500 text-lg sm:text-xl">8.</span>
          Special Teams
        </h2>
        <p>
          In addition to the 50 qualifying teams selected via Table 3, exactly <strong>10 Special Teams</strong> are admitted to complete the 60-team championship roster:
        </p>

        <Table7SpecialTeams />
      </section>

      {/* Section 9 */}
      <section id="section-9" className="scroll-mt-24 pt-8 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <span className="font-mono text-red-600 dark:text-red-500 text-lg sm:text-xl">9.</span>
          Team Leader / Teammate Withdrawal and Replacement
        </h2>
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">9.1 Team Mate (TM) Withdrawals</h3>
            <p>If a TM withdraws, the TL may appoint an eligible replacement with approval from the WRTC OC.</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">9.2 Team Leader (TL) Withdrawals (Standard Timeline)</h3>
            <p>If an invited TL withdraws, the position is offered to the next highest-ranked eligible applicant from the same QA.</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">9.3 TL Withdrawals with No Qualified Replacements</h3>
            <p>If no eligible replacement exists in that QA, the slot reverts to the WRTC OC for reallocation to the highest-scoring unqualified applicant globally.</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">9.4 Last-Minute and On-Site Emergencies</h3>
            <p>A designated pool of on-site referee alternates is maintained in Slavonia to resolve unforeseen travel or medical emergencies.</p>
          </div>
        </div>
      </section>

      {/* Section 10 */}
      <section id="section-10" className="scroll-mt-24 pt-8 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <span className="font-mono text-red-600 dark:text-red-500 text-lg sm:text-xl">10.</span>
          Financial Implications
        </h2>
        <p>
          Participation entry fees, accommodation packages in Osijek / Slavonia, and station hardware security deposits will be announced in 2029 following venue infrastructure finalization.
        </p>
      </section>

      {/* Section 11 */}
      <section id="section-11" className="scroll-mt-24 pt-8 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <span className="font-mono text-red-600 dark:text-red-500 text-lg sm:text-xl">11.</span>
          Questions and Clarifications
        </h2>
        <p>
          Official inquiries regarding the interpretation of Selection Rules should be submitted directly to the WRTC 2030 Organizing Committee via{' '}
          <a
            href="mailto:rules@wrtc2030.hr"
            className="text-red-600 dark:text-red-400 font-mono underline hover:text-red-700"
          >
            rules@wrtc2030.hr
          </a>
          . All formal clarifications are published in the accompanying Questions & Answers document.
        </p>
      </section>
    </article>
  );
}
