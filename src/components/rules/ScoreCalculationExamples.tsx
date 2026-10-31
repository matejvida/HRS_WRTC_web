import React from 'react';
import examplesData from '../../../data/rules/selection-rules-examples.json';

interface ExampleItem {
  id: string;
  title: string;
  content: string;
}

export function ScoreCalculationExamples() {
  const items = examplesData as ExampleItem[];
  const generalExamples = items.slice(0, 3);
  const subAreaExamples = items.slice(3);

  return (
    <div className="space-y-8">
      {/* Overview Card */}
      <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-2 text-red-600 dark:text-red-500 font-bold text-xs uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
          Mathematical Reference & Formulas
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Score Calculation Examples
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          The following 10 worked examples illustrate how WRTC 2030 Event Scores are calculated in real-world scenarios, including outside-QA operations, multi-operator score sharing, Table 5 lower-category substitution, and Table 4 Sub-Area propagation normalization.
        </p>

        <div className="p-4 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs sm:text-sm">
          <span className="text-slate-500 dark:text-slate-400 block mb-1">Standard Calculation Formula:</span>
          <span className="font-bold text-slate-900 dark:text-white">
            Event Score = Event Max Value × Category WF × (Applicant Score / Max Score in QA)
          </span>
        </div>
      </div>

      {/* Part 1: General Score Calculations */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-red-600 rounded-sm" />
            General Score Calculations (Examples 1–3)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Outside-QA limits, Multi-Operator score sharing, and Table 5 denominator substitution.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {generalExamples.map((ex) => (
            <article
              key={ex.id}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xs"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                  {ex.id}
                </span>
                <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  {ex.title}
                </h4>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                {ex.content}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Part 2: Sub-Area Normalization Examples */}
      <section className="space-y-4 pt-4">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-red-600 rounded-sm" />
            Sub-Area Normalization Examples (Examples 4–10)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Table 4 normalization across AF #1, SA #2, EU #1, NA #1, NA #6, and NA #10 (ARRL DX KL7 exception).
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {subAreaExamples.map((ex) => (
            <article
              key={ex.id}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xs"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
                  {ex.id}
                </span>
                <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  {ex.title}
                </h4>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                {ex.content}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
