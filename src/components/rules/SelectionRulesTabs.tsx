'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export type TabKey = 'rules' | 'qa' | 'examples';

interface SelectionRulesTabsProps {
  rulesContent: React.ReactNode;
  qaContent: React.ReactNode;
  examplesContent: React.ReactNode;
}

const TABS: { id: TabKey; label: string; badge?: string }[] = [
  { id: 'rules', label: 'Selection Rules v1.0', badge: 'Official' },
  { id: 'qa', label: 'Questions & Answers', badge: 'Q&A' },
  { id: 'examples', label: 'Score Calculation Examples', badge: '10 Examples' },
];

export function SelectionRulesTabs({
  rulesContent,
  qaContent,
  examplesContent,
}: SelectionRulesTabsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const tabParam = searchParams.get('tab') as TabKey | null;
  const initialTab: TabKey =
    tabParam === 'qa' || tabParam === 'examples' ? tabParam : 'rules';

  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);

  useEffect(() => {
    if (tabParam === 'rules' || tabParam === 'qa' || tabParam === 'examples') {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (key: TabKey) => {
    setActiveTab(key);
    const params = new URLSearchParams(searchParams.toString());
    if (key === 'rules') {
      params.delete('tab');
    } else {
      params.set('tab', key);
    }
    const query = params.toString() ? `?${params.toString()}` : '';
    router.replace(`${pathname}${query}`, { scroll: false });
  };

  return (
    <div className="w-full">
      {/* Tab Switcher Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 mb-8 sticky top-16 z-20 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md pt-2">
        <div
          role="tablist"
          aria-label="Selection Rules Documentation Tabs"
          className="flex space-x-2 sm:space-x-6 overflow-x-auto no-scrollbar"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 py-3.5 px-3 border-b-2 font-semibold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'border-red-600 text-red-600 dark:text-red-400 dark:border-red-500'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                        : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Panels */}
      <div>
        <div
          role="tabpanel"
          id="tabpanel-rules"
          aria-labelledby="tab-rules"
          hidden={activeTab !== 'rules'}
          className={activeTab === 'rules' ? 'block' : 'hidden'}
        >
          {rulesContent}
        </div>

        <div
          role="tabpanel"
          id="tabpanel-qa"
          aria-labelledby="tab-qa"
          hidden={activeTab !== 'qa'}
          className={activeTab === 'qa' ? 'block' : 'hidden'}
        >
          {qaContent}
        </div>

        <div
          role="tabpanel"
          id="tabpanel-examples"
          aria-labelledby="tab-examples"
          hidden={activeTab !== 'examples'}
          className={activeTab === 'examples' ? 'block' : 'hidden'}
        >
          {examplesContent}
        </div>
      </div>
    </div>
  );
}
