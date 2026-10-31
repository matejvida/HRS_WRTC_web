import React from 'react';

interface CutoffRowProps {
  quota: number;
  colSpan?: number;
}

export function CutoffRow({ quota, colSpan = 6 }: CutoffRowProps) {
  return (
    <tr
      data-testid="cutoff-marker"
      className="bg-red-50/70 dark:bg-red-950/40 border-y-2 border-dashed border-red-600/80"
    >
      <td colSpan={colSpan} className="py-2.5 px-4 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-red-700 dark:text-red-400">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span>
            Automatic Qualification Cutoff (Top {quota} Qualify as Automatic Team Leaders)
          </span>
          <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400 hidden sm:inline">
            · Table 3 Allocation
          </span>
        </div>
      </td>
    </tr>
  );
}
