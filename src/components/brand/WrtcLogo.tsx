import React from 'react';

export interface WrtcLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Renders both the official WRTC 2030 Croatia Day SVG (`/brand/wrtc-logo.svg`)
 * and Night SVG (`/brand/wrtc-logo-white.svg`) from wrtc2030.hr.
 * Visibility is toggled purely via CSS (`.only-day` / `.only-night`) scoped to
 * `html[data-theme="day" | "night"]` so SSR HTML never causes hydration mismatches.
 */
export function WrtcLogo({
  width = 76,
  height = 64,
  className = '',
}: WrtcLogoProps) {
  return (
    <span className={`wrtc-logo ${className}`.trim()}>
      <img
        className="only-day"
        src="/brand/wrtc-logo.svg"
        alt="WRTC 2030 Croatia Logo"
        width={width}
        height={height}
        data-brand-navy="#273B8F"
        data-brand-red="#ED1C24"
        data-brand-shack-navy="#0D1333"
      />
      <img
        className="only-night"
        src="/brand/wrtc-logo-white.svg"
        alt="WRTC 2030 Croatia Logo"
        width={width}
        height={height}
        data-brand-navy="#273B8F"
        data-brand-red="#ED1C24"
        data-brand-shack-navy="#0D1333"
      />
    </span>
  );
}
