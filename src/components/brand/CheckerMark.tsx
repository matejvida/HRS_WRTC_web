import React from 'react';

export interface CheckerMarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg';
}

/**
 * 2x2 diagonal Croatian Checker Red (#ED1C24) mark used for section kickers and badges.
 */
export function CheckerMark({
  size = 'md',
  className = '',
  ...rest
}: CheckerMarkProps) {
  return (
    <span
      className={`checker checker--${size} ${className}`.trim()}
      aria-hidden="true"
      data-token-red="#ED1C24"
      data-token-navy="#273B8F"
      {...rest}
    />
  );
}

export interface CheckerFiveProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * 5-Square stepped Croatian Checker motif matching the right flank of the official WRTC 2030 logo.
 */
export function CheckerFive({ className = '', ...rest }: CheckerFiveProps) {
  return (
    <div
      className={`checker-five ${className}`.trim()}
      aria-hidden="true"
      title="5-Square Motif from Official WRTC 2030 Logo"
      data-token-red="#ED1C24"
      {...rest}
    >
      <span style={{ backgroundColor: '#ED1C24' }} />
      <span style={{ backgroundColor: '#ED1C24' }} />
      <span style={{ backgroundColor: '#ED1C24' }} />
      <span style={{ backgroundColor: '#ED1C24' }} />
      <span style={{ backgroundColor: '#ED1C24' }} />
    </div>
  );
}

export interface CheckerRibbonProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * 12px full-width alternating Croatian checkerboard architectural section divider (Proposal 1).
 */
export function CheckerRibbon({ className = '', ...rest }: CheckerRibbonProps) {
  return (
    <div
      className={`checker-ribbon ${className}`.trim()}
      aria-hidden="true"
      data-token-red="#ED1C24"
      {...rest}
    />
  );
}

/**
 * Compact horizontal checker strip alias for section headers and card accents.
 */
export function CheckerStrip({ className = '', ...rest }: CheckerRibbonProps) {
  return (
    <div
      className={`checker-strip ${className}`.trim()}
      aria-hidden="true"
      data-token-red="#ED1C24"
      {...rest}
    />
  );
}

export interface KockiceClusterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CLUSTER_CELLS: Array<'r' | 'b' | 'n' | 'e'> = [
  'r', 'e', 'r', 'e',
  'e', 'r', 'e', 'b',
  'r', 'e', 'b', 'e',
  'e', 'n', 'e', 'r',
];

/**
 * 4x4 stepped Croatian Kockice corner stamp applying #ED1C24 Checker Red,
 * #273B8F Royal Blue, and #0D1333 Shack Navy tokens.
 */
export function KockiceCluster({ className = '', ...rest }: KockiceClusterProps) {
  return (
    <div
      className={`kockice-cluster ${className}`.trim()}
      aria-hidden="true"
      data-token-red="#ED1C24"
      data-token-navy="#273B8F"
      data-token-shack="#0D1333"
      {...rest}
    >
      {CLUSTER_CELLS.map((cell, idx) => {
        const bg =
          cell === 'r'
            ? '#ED1C24'
            : cell === 'b'
              ? '#273B8F'
              : cell === 'n'
                ? '#0D1333'
                : 'transparent';
        return <span key={idx} className={cell} style={{ backgroundColor: bg }} />;
      })}
    </div>
  );
}
