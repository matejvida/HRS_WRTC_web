---
title: 'Story 3.3: Operator Score Breakdown Drawer & Pre-Season Interactive Simulator Toggle'
type: 'feature'
created: '2026-10-31'
status: 'ready-for-dev'
route: 'dispatch'
review_loop_iteration: 0
context:
  - '_bmad-output/implementation-artifacts/epic-3-context.md'
  - '_bmad-output/implementation-artifacts/spec-3-2-interactive-29-qa-standings-explorer-callsign-search-cutoff.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Contesters audit their own and rivals' scores meticulously; a high-level score number without contest-by-contest itemization leaves doubts about weighting factors, Multi-Op caps, or Outside-QA point reductions. Additionally, prior to the December 2026 `9A DX Contest`, contesters need an interactive simulator to model different operating scenarios.

**Approach:** Implement two critical interactive components within `/competition/standings/`:
1. `<OperatorBreakdownDrawer />`: Accessible slide-over drawer opening when any operator row or card is clicked (or focused + `Enter`), displaying the operator's QA, rank, total score, and a full table of contributing contest scores (Event #, Contest Name, Mode, SO/MO category, In/Out QA flag, EF/MF/OF weights, and calculated points) alongside discarded events.
2. `<PreSeasonSimulator />`: An interactive score calculator toggle allowing contesters to simulate any contest result using the official formula `Points = EF × MF × OF × (Your Score / Leader Score) × 1000`, tracing each multiplier and verifying cap rules.

## Boundaries & Constraints

**Always:**
- Ensure `<OperatorBreakdownDrawer />` is accessible: traps focus when open, sets `aria-expanded="true"`, closes on `Escape` keypress, background overlay click, or close button.
- Explicitly mark counted events vs. discarded events (dropped lower scores beyond top 10 or beyond the 3 Multi-Op / 3 Outside-QA caps).
- Format all point calculations with two decimal places in `JetBrains Mono` (`tabular-nums`).
- Build `<PreSeasonSimulator />` with reactive recalculation on input changes, bound by Table 2 weights (`EF`: 1.0, 0.9, 0.8; `MF`: 1.0, 0.9; `OF`: 1.0, 0.95).
- Ensure smooth mobile ergonomics (`< 768px`) with full-screen or bottom-sheet drawer adaptation.

**Never:**
- Never display confusing or unexplained dropped points without clear badge labeling (`Counted` vs `Dropped — Cap Exceeded` vs `Dropped — Lower Score`).
- Never allow NaN or negative points in simulator calculations.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Operator Click | User clicks row for `9A5W` | Drawer slides open displaying 9A5W's 12 contest entries, highlighting the top 10 counted scores | Closes cleanly on `Escape` |
| Simulator Calculation | User inputs EF=0.80, MF=1.0, OF=1.0, Score=4,000,000, Leader=5,000,000 | Calculates `0.80 × 1.0 × 1.0 × (4M/5M) × 1000 = 640.00 pts` and renders formula trace | Caps ratio at 1.00 if score > leader; prevents division by zero |
| Keyboard Accessibility | User tabs to operator row and presses `Enter` | Opens drawer and shifts focus inside; pressing `Escape` closes drawer and restores focus to row | Focus trap prevents tabbing behind open drawer |
| Dropped Event Badge | Operator has 4 Multi-Op events | Top 3 MO events marked `Counted (MO 1/3, 2/3, 3/3)`; 4th MO marked `Dropped (MO Cap Exceeded)` | Visually greyed out with explanatory tooltip/tag |

</frozen-after-approval>

## Code Map

- `src/components/standings/OperatorBreakdownDrawer.tsx` -- Accessible slide-over drawer with focus trap, backdrop, and score table.
- `src/components/standings/PreSeasonSimulator.tsx` -- Interactive score calculator component with EF/MF/OF dropdowns and formula trace.
- `src/components/standings/StandingsExplorer.tsx` -- Update to mount drawer and simulator toggle banner.
- `tests/unit/operator-drawer-and-simulator.test.tsx` -- Unit tests for drawer keyboard dismissal, focus trap, and simulator formula precision.
- `tests/e2e/standings-breakdown.spec.ts` -- E2E tests verifying drawer opening, contest rows, and simulator interaction on desktop and mobile.

## Tasks & Acceptance

**Execution:**
- [ ] `src/components/standings/OperatorBreakdownDrawer.tsx` -- Implement accessible drawer with focus management and contest score breakdown table -- Satisfies `FR-4`, `UX-DR4`, `NFR-2`.
- [ ] `src/components/standings/PreSeasonSimulator.tsx` -- Implement interactive simulator component with formula trace and cap enforcement -- Satisfies `FR-4`.
- [ ] `src/components/standings/StandingsExplorer.tsx` -- Integrate drawer and simulator toggle into standings view -- Satisfies `FR-3`, `FR-4`.
- [ ] `tests/unit/operator-drawer-and-simulator.test.tsx`, `tests/e2e/standings-breakdown.spec.ts` -- Write failing unit and E2E tests for drawer and simulator -- Enforces TDD Red phase.

**Acceptance Criteria:**
- Given a visitor viewing `/competition/standings/`, when an operator is clicked, then the breakdown drawer slides in, displaying all contributing contests, multipliers, and points (`FR-4`, `UX-DR4`).
- Given the drawer is open, when the visitor presses `Escape`, then the drawer closes and focus returns to the triggering element (`NFR-2`).
- Given `<PreSeasonSimulator />`, when valid contest scores and multipliers are entered, then points calculate instantaneously and trace formula matches Selection Rules v1.0 Section 6 (`FR-4`).
- Given a mobile phone (`375×812`), when the drawer opens, then it renders without horizontal overflow and can be closed via tap or swipe (`NFR-2`).

## Implementation Notes

## Spec Change Log

## Review Triage Log

## Verification

**Commands:**
- `npm run validate:data` -- expected: exits 0
- `npm run typecheck` -- expected: `tsc --noEmit` exits 0
- `npm run test:unit` -- expected: `vitest run` passes 100% of drawer and simulator tests
- `npm run build` -- expected: `next build` exits 0
- `npm run test:e2e` -- expected: `playwright test` passes all breakdown E2E tests
