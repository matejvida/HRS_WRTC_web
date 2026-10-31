---
title: 'Story 2.3: Interactive 24-Contest Qualifying Events Calendar (/competition/qualifying-events/)'
type: 'feature'
created: '2026-10-31'
status: 'ready-for-dev'
route: 'dispatch'
review_loop_iteration: 0
context:
  - '_bmad-output/implementation-artifacts/epic-2-context.md'
  - '_bmad-output/implementation-artifacts/spec-2-1-canonical-rules-datasets-tables-1-7-build-time-zod-validatio.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Contesters worldwide need to plan their contest calendar across 24 qualifying events over a 24-month period (December 2026 to November 2028). A static PDF table doesn't let them filter by mode, see live countdowns to upcoming events, or audit how different weighting factors impact their qualifying strategy.

**Approach:** Build `/competition/qualifying-events/` as an interactive calendar powered by `data/rules/qualifying-events.json` and `data/rules/weighting-factors.json`. The page features a prominent pinned Countdown Ticker for Event #1 (`9A DX Contest — 19–20 Dec 2026 UTC`), filter pills for Mode (`All`, `CW`, `SSB`, `Mixed`) and Status (`All`, `Upcoming`, `Completed`), and an interactive event card/timeline view detailing each contest's dates, sponsoring organization, Table 2 multipliers (Single-Op and Multi-Op), and official contest website link.

## Boundaries & Constraints

**Always:**
- Source all 24 events directly from `data/rules/qualifying-events.json` validated in Story 2.1 (`AD-5`).
- Pin Qualifying Event #1 (`9A DX Contest — Dec 19–20, 2026 UTC`) with live countdown telemetry, `.checker` kicker, and `#ED1C24` red accent border.
- All contest dates and timestamps must be displayed in explicit UTC with `JetBrains Mono` (`tabular-nums`) formatting.
- Instantaneous client-side filtering (`< 50ms`) synced to URL search parameters (`?mode=CW&status=upcoming`).
- Zero horizontal overflow on mobile screens down to `320px`.

**Never:**
- Never hardcode event metadata or dates inside React components.
- Never show conflicting dates or weighting multipliers that diverge from Selection Rules v1.0 Table 1 and Table 2.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Mode Filter | User clicks `CW` pill | Instantaneously filters timeline to show only CW contests (e.g. CQ WW CW, ARRL DX CW), updating URL to `?mode=CW` | Displays empty-state banner if no events match |
| Event #1 Countdown Ticker | System clock before 19 Dec 2026 14:00 UTC | Displays days, hours, minutes, and seconds countdown to 9A DX Contest start | Switches to `IN PROGRESS` during event, then `COMPLETED` afterwards |
| Contest External Link | User clicks contest sponsor link | Opens official contest rules/sponsor in new tab (`target="_blank" rel="noopener noreferrer"`) | Validates URL protocol in data schema |
| Deep-linked Filter | User opens `/competition/qualifying-events/?mode=SSB` | Pre-selects `SSB` filter pill and renders only SSB contests on initial render | Defaults to `All` if query parameter is unrecognized |

</frozen-after-approval>

## Code Map

- `src/components/calendar/QualifyingCalendar.tsx` -- Client island for the 24-event interactive calendar with filter pills and search param sync.
- `src/components/calendar/NextEventTicker.tsx` -- Countdown widget for Event #1 (`9A DX Contest`) with UTC timer logic.
- `src/components/calendar/EventCard.tsx` -- Responsive event card displaying contest name, dates, mode badge, Table 2 weights, and external links.
- `src/app/competition/qualifying-events/page.tsx` -- Main static page route assembling header, countdown ticker, and calendar timeline.
- `tests/unit/qualifying-calendar.test.tsx` -- Unit tests verifying countdown logic, filtering by mode/status, and Table 2 weight rendering.
- `tests/e2e/qualifying-calendar.spec.ts` -- E2E tests verifying filter responsiveness, deep-linking, and mobile ergonomics.

## Tasks & Acceptance

**Execution:**
- [ ] `src/components/calendar/NextEventTicker.tsx`, `src/components/calendar/EventCard.tsx` -- Create countdown ticker and event card components -- Satisfies `FR-6`.
- [ ] `src/components/calendar/QualifyingCalendar.tsx` -- Implement interactive filter pills (Mode & Status) and URL sync -- Satisfies `FR-6`.
- [ ] `src/app/competition/qualifying-events/page.tsx` -- Assemble `/competition/qualifying-events/` static route segment -- Satisfies `FR-6`, `NFR-1`.
- [ ] `tests/unit/qualifying-calendar.test.tsx`, `tests/e2e/qualifying-calendar.spec.ts` -- Author failing unit and E2E tests for filtering, countdown, and mobile layout -- Enforces TDD Red phase.

**Acceptance Criteria:**
- Given a visitor opens `/competition/qualifying-events/`, when rendered, then all 24 events are listed in chronological order from Event #1 (9A DX Contest) to Event #24 (CQ WW CW) (`FR-6`).
- Given the visitor clicks `CW`, when filtered, then only CW contests are shown, the count updates, and URL reflects `?mode=CW` (`FR-6`).
- Given Event #1, when rendered, then its countdown timer displays remaining time until 19 Dec 2026 14:00 UTC with `tabular-nums` formatting (`FR-6`).
- Given a mobile screen (`375×812`), when viewing the timeline, then event cards stack vertically with `scrollWidth <= clientWidth` (`NFR-2`).

## Implementation Notes

## Spec Change Log

## Review Triage Log

## Verification

**Commands:**
- `npm run validate:data` -- expected: exits 0
- `npm run typecheck` -- expected: `tsc --noEmit` exits 0
- `npm run test:unit` -- expected: `vitest run` passes 100% of calendar unit tests
- `npm run build` -- expected: `next build` statically pre-renders `/competition/qualifying-events/`
- `npm run test:e2e` -- expected: `playwright test` passes all calendar E2E tests
