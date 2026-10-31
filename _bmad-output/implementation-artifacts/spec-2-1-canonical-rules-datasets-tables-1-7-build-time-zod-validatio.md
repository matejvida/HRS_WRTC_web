---
title: 'Story 2.1: Canonical Rules Datasets (Tables 1–7) & Build-Time Zod Validation'
type: 'feature'
created: '2026-10-31'
status: 'ready-for-dev'
route: 'dispatch'
review_loop_iteration: 0
context:
  - '_bmad-output/implementation-artifacts/epic-2-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Selection Rules v1.0 contains complex tables (24 Qualifying Events in Table 1, Category & Mode Weighting Factors in Table 2, 29 Qualifying Areas & 50 Team Quotas in Table 3, Sub-Areas in Table 4, Category Preference in Table 5, QA Changes in Table 6, and 10 Special Teams in Table 7). Hardcoding these across various components will cause data drift, mathematical scoring bugs, and broken schedules.

**Approach:** Author the authoritative, single-source machine-readable JSON datasets in `data/rules/` (`qualifying-events.json`, `weighting-factors.json`, `qualifying-areas.json`, and `special-teams.json`) reflecting Selection Rules v1.0 verbatim, create robust `Zod` validation schemas in `src/lib/schemas/rules.schema.ts` and loader functions in `src/lib/rules-loader.ts`, and integrate them into `scripts/validate-data.ts` and CI to guarantee 100% integrity before any component or standings engine consumes them.

## Boundaries & Constraints

**Always:**
- Follow `AD-5`: Canonical JSON in `data/rules/` is the single source of truth for both Selection Rules UI and downstream Standings / Calendar / AI engines.
- Enforce strict `Zod` schema validation: Table 1 must contain exactly 24 events starting with `#1 9A DX Contest` (19–20 Dec 2026) and concluding with `#24 CQ WW DX CW` (Nov 2028); Table 3 must contain exactly 29 QAs summing to 50 Qualifying Teams; Table 7 must allocate exactly 10 Special Teams (3 Youth, 4 Sponsored, 2 Wild Card, 1 Defending Champion).
- Verify all event dates, weighting multipliers (e.g. EF 1.00, 0.90, 0.80; MF 1.00, 0.90; OF 1.00, 0.95), and ISO 8601 UTC date formats.
- Fail `npm run validate:data` with clear descriptive errors if any quota, event ID, or weighting factor is missing or incorrect.

**Never:**
- Never duplicate rules data in separate files or components.
- Never modify Selection Rules quotas without explicit human stakeholder authorization.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Table 1 Event Validation | `data/rules/qualifying-events.json` validated by schema | 24 events with `id` 1..24, valid contest names, UTC date ranges, modes (`CW`, `SSB`, `Mixed`), and EF multipliers | Throws if count != 24 or event ID sequence broken |
| Table 3 Quota Sum Validation | `data/rules/qualifying-areas.json` validated by schema | 29 QAs (`EU #1`..`EU #9`, `NA #1`..`NA #11`, `AS #1`..`AS #4`, `AF #1`, `SA #1`..`SA #2`, `OC #1`..`OC #2`) summing to exactly 50 slots | Throws if total allocated teams != 50 |
| Table 7 Special Teams | `data/rules/special-teams.json` validated by schema | Exactly 10 teams: Youth=3, Sponsored=4, WildCard=2, Defending=1 | Throws if allocation != 10 |
| Build-time CI Execution | `npm run validate:data` runs on repo | Verifies all 4 rules datasets in `< 100ms` and prints validation summary | Exits non-zero and halts build on error |

</frozen-after-approval>

## Code Map

- `data/rules/qualifying-events.json` -- Table 1: 24 Qualifying Events with dates, modes, and EF weights.
- `data/rules/weighting-factors.json` -- Table 2: Category weights (SO HP/LP, Multi-Op) and overlay multipliers.
- `data/rules/qualifying-areas.json` -- Table 3, 4, 6: 29 QAs, 50 team slots, Sub-Areas, and qualifying criteria.
- `data/rules/special-teams.json` -- Table 7: 10 Special Teams breakdown.
- `src/lib/schemas/rules.schema.ts` -- `Zod` schemas for QualifyingEvent, WeightingFactor, QualifyingArea, and SpecialTeam.
- `src/lib/rules-loader.ts` -- Strongly typed server loaders (e.g. `getQualifyingEvents()`, `getQualifyingAreas()`, `getSpecialTeams()`).
- `scripts/validate-data.ts` -- Extend data validation to include all `data/rules/*.json` datasets.
- `tests/unit/rules-schema.test.ts` -- Unit tests verifying schema parsing, mathematical invariants, and malformed data rejection.

## Tasks & Acceptance

**Execution:**
- [ ] `data/rules/*.json` -- Create canonical JSON datasets for Tables 1 through 7 -- Satisfies `FR-5`, `FR-6`, `AD-5`.
- [ ] `src/lib/schemas/rules.schema.ts`, `src/lib/rules-loader.ts` -- Implement `Zod` schemas and typed loaders -- Satisfies `FR-5`, `AD-5`.
- [ ] `tests/unit/rules-schema.test.ts` -- Write failing unit tests checking 24 events, 29 QAs (sum = 50), 10 special teams, and error handling on mutated data -- Enforces TDD Red phase.
- [ ] `scripts/validate-data.ts` -- Hook rules validation into `validateAssets()` so CI verifies rules integrity on every push -- Satisfies `AD-8`.

**Acceptance Criteria:**
- Given `data/rules/qualifying-events.json`, when parsed by `QualifyingEventListSchema`, then exactly 24 events are returned with valid IDs 1..24, starting with 9A DX Contest (`EF=0.80`) and ending with CQ WW DX CW (`EF=1.00`) (`FR-6`).
- Given `data/rules/qualifying-areas.json`, when parsed by `QualifyingAreaListSchema`, then all 29 QAs are present and the sum of `allocatedTeams` across all QAs equals exactly 50 (`FR-5`).
- Given `data/rules/special-teams.json`, when parsed by `SpecialTeamListSchema`, then the sum of special teams equals 10 (Youth: 3, Sponsored: 4, Wild Card: 2, Defending: 1) (`FR-5`).
- Given `npm run validate:data`, when executed, then it passes with exit code 0 confirming all rules datasets are valid (`AD-5`, `AD-8`).

## Implementation Notes

## Spec Change Log

## Review Triage Log

## Verification

**Commands:**
- `npm run validate:data` -- expected: exits 0 verifying all rules datasets pass schema validation
- `npm run typecheck` -- expected: `tsc --noEmit` exits 0
- `npm run test:unit` -- expected: `vitest run` passes all rules schema tests
- `npm run build` -- expected: `next build` exits 0
