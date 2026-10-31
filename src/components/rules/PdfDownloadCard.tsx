import React from 'react';

interface PdfDocument {
  title: string;
  filename: string;
  size: string;
  version: string;
  description: string;
}

const OFFICIAL_PDFS: PdfDocument[] = [
  {
    title: 'WRTC 2030 Selection Rules v1.0',
    filename: 'wrtc-2030-selection-rules-v1.0.pdf',
    size: '605 KB',
    version: 'v1.0 (Oct 2026)',
    description: 'Official 20-page document with Sections 1–11 and Tables 1–7.',
  },
  {
    title: 'Questions & Answers (Q&A v1.0)',
    filename: 'wrtc-2030-selection-rules-qa-v1.0.pdf',
    size: '374 KB',
    version: 'v1.0 (Oct 2026)',
    description: 'Detailed rationale and clarifications on selection criteria.',
  },
  {
    title: 'Score Calculation Examples',
    filename: 'wrtc-2030-score-calculation-examples.pdf',
    size: '316 KB',
    version: 'v1.0 (Oct 2026)',
    description: '10 worked mathematical calculation examples and sub-area rules.',
  },
];

export function PdfDownloadCard({ className = '' }: { className?: string }) {
  return (
    <aside
      className={`p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl ${className}`}
      aria-label="Official Document Downloads"
    >
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
        <h3 className="font-bold text-slate-900 dark:text-white text-base">
          Official Documents
        </h3>
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
        Download the authoritative, unedited PDF releases formally approved by the WRTC Sanctioning Committee.
      </p>

      <ul className="space-y-3">
        {OFFICIAL_PDFS.map((doc) => (
          <li key={doc.filename}>
            <a
              href={`/files/${doc.filename}`}
              download={doc.filename}
              className="group block p-3 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-red-500/60 dark:hover:border-red-500/60 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-semibold text-xs text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {doc.title}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
                  <svg
                    className="w-3 h-3 text-slate-400 group-hover:text-red-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  {doc.size}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {doc.description}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
