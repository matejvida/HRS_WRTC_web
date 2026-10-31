import React from 'react';
import type { SponsorsData } from '@/lib/schemas/sponsors.schema';

interface SponsorTierGridProps {
  data: SponsorsData;
}

export function SponsorTierGrid({ data }: SponsorTierGridProps) {
  const { institutionalHost, tiers, contactEmail } = data;

  return (
    <div className="space-y-16">
      {/* 1. Institutional Host Showcase */}
      <section aria-labelledby="institutional-host-heading" className="space-y-4">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
            National Amateur Radio Society & IARU Member
          </span>
          <h2
            id="institutional-host-heading"
            className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900 dark:text-white mt-0.5"
          >
            Official Institutional Host
          </h2>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
                {institutionalHost.acronym} · Est. {institutionalHost.foundedYear}
              </span>
              <span className="text-xs font-mono text-slate-500">
                9A Airwaves
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
              {institutionalHost.name}
            </h3>
            <p className="text-xs font-mono text-red-600 dark:text-red-400">
              {institutionalHost.nativeName}
            </p>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
              {institutionalHost.description}
            </p>
          </div>

          <div className="shrink-0">
            <a
              href={institutionalHost.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit HRS Official Site (https://www.hamradio.hr/)"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-mono font-bold text-xs bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white transition-colors"
            >
              <span>Visit HRS Official Site</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Sponsorship Tiers */}
      <section aria-labelledby="sponsor-tiers-heading" className="space-y-12">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
            Commercial, Technological & Foundation Partnerships
          </span>
          <h2
            id="sponsor-tiers-heading"
            className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900 dark:text-white mt-0.5"
          >
            Sponsorship Tiers & Opportunities
          </h2>
        </div>

        <div className="space-y-10">
          {tiers.map((tier) => (
            <article
              key={tier.id}
              className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xs space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-1">
                    {tier.badge}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
                    {tier.title}
                  </h3>
                </div>

                <a
                  href={`mailto:${contactEmail}?subject=[WRTC%202030]%20${encodeURIComponent(tier.inquirySubject)}`}
                  aria-label={`Inquire about ${tier.title}`}
                  className="px-4 py-2 rounded-xl font-mono font-bold text-xs bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 border border-red-200 dark:border-red-800/60 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-colors w-fit"
                >
                  Inquire About {tier.title} →
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Tier Scope & Radiosport Impact
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {tier.description}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-mono">
                    <strong>Package Scope:</strong> {tier.packageScope}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Featured Opportunities / Participating Entities
                  </div>
                  {tier.partners.map((partner) => (
                    <div
                      key={partner.id}
                      className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white font-mono">
                          {partner.name}
                        </h4>
                        {partner.country && (
                          <span className="text-[10px] font-mono text-slate-400">
                            {partner.country}
                          </span>
                        )}
                      </div>
                      {partner.subtitle && (
                        <div className="text-[11px] font-semibold text-red-600 dark:text-red-400">
                          {partner.subtitle}
                        </div>
                      )}
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                        {partner.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
