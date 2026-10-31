---
title: 'Story 3.1: Standings Snapshot Schema, CSV/JSON Importer CLI & Pre-Season Simulation Seed'
type: 'feature'
created: '2026-10-31'
status: 'ready-for-dev'
route: 'dispatch'
review_loop_iteration: 0
context:
  - '_bmad-output/implementation-artifacts/epic-3-context.md'
  - '_bmad-output/implementation-artifacts/spec-2-1-canonical-rules-datasets-tables-1-7-build-time-zod-validatio.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** When the WRTC 2030 qualification cycle begins in December 2026, the WRTC OC IT & Scoring Lead (`9A3XV`) needs an automated, bulletproof mechanism to ingest contest standings exports (CSV or JSON) without runtime crashes or scoring drift. Furthermore, contesters and stakeholders need rich simulation data available before December 2026 to test the standings interface.

**Approach:** Develop `StandingsSnapshotSchema` (`src/lib/schemas/standings.schema.ts`) with strict `Zod` validation rules enforcing Selection Rules v1.0 constraints (valid QA codes from Table 3, valid event IDs 1..24 from Table 1, max 10 counted events per operator, max 3 Multi-Op, max 3 Outside-QA, max 6 for Youth, and monotonic rank ordering). Build `scripts/import-standings.ts` to convert and validate CSV/JSON into `data/standings/latest.json`. Seed `data/standings/example-simulation.json` using the official worked examples from Selection Rules v1.0.

## Boundaries & Constraints

**Always:**
- Follow `AD-3`: Standings snapshots must pass `StandingsSnapshotSchema` during `next build` and CI.
- Validate QA codes against Table 3 (`29 QAs`: `EU #1`–`EU #9`, `NA #1`–`NA #11`, `AS #1`–`AS #4`, `AF #1`, `SA #1`–`SA #2`, `OC #1`–`OC #2`, plus `YOUTH`).
- Validate event IDs (`1..24` matching Table 1) and score caps (max 10 counted events, max 3 Multi-Op, max 3 Outside-QA for standard QAs; max 6 counted events for Youth).
- Ensure deterministic tie-breaking and monotonic sorting by total qualification score descending per QA.
- Seed `data/standings/example-simulation.json` with realistic operator entries across multiple continents based on the official Score Calculation Examples PDF.

**Never:**
- Never allow unvalidated CSV or JSON to be read directly by client or server UI components.
- Never allow a malformed score file to deploy to production.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| CSV Ingestion via CLI | `npm run import:standings -- input.csv` | Parses CSV rows, applies calculation weights, verifies schema, writes `data/standings/latest.json` | Rejects with line numbers if CSV headers or values are invalid |
| Exceeded Multi-Op Cap | Operator standing has 4 counted Multi-Op events | Fails schema validation: max 3 Multi-Op events allowed per Section 5.A | Throws detailed `ZodError` naming operator and event IDs |
| Exceeded Outside-QA Cap | Operator standing has 4 counted Outside-QA events | Fails schema validation: max 3 Outside-QA events allowed per Section 5.B | Throws detailed `ZodError` |
| Pre-Season Simulation Seed | Load `data/standings/example-simulation.json` | Valid snapshot with 29 QAs, multi-event operator breakdowns, and realistic point totals | Schema asserts validity in `validate:data` |

</frozen-after-approval>

## Code Map

- `src/lib/schemas/standings.schema.ts` -- `Zod` schemas for `ContestEntrySchema`, `OperatorStandingSchema`, `AreaStandingsSchema`, and `StandingsSnapshotSchema`.
- `scripts/import-standings.ts` -- CLI tool converting CSV/JSON exports into validated snapshot format.
- `data/standings/example-simulation.json` -- Pre-season simulation dataset populated with official worked examples.
- `src/lib/standings-loader.ts` -- Server loader reading and validating active standings snapshot (`latest.json` or fallback to simulation).
- `scripts/validate-data.ts` -- Integrate standings snapshot validation into `npm run validate:data`.
- `tests/unit/standings-schema-and-importer.test.ts` -- Unit tests for schema validation, capping rules, CSV parsing, and simulation data.

## Tasks & Acceptance

**Execution:**
- [ ] `src/lib/schemas/standings.schema.ts` -- Define complete `Zod` schema with custom refinements for Multi-Op/Outside-QA caps and sorting -- Satisfies `FR-12`, `AD-3`.
- [ ] `data/standings/example-simulation.json` -- Author rich pre-season simulation snapshot matching Selection Rules v1.0 examples -- Satisfies `FR-4`.
- [ ] `scripts/import-standings.ts`, `src/lib/standings-loader.ts` -- Build CLI converter and server loader -- Satisfies `FR-12`.
- [ ] `scripts/validate-data.ts` -- Add standings snapshot checks to `validate:data` -- Satisfies `AD-3`, `AD-8`.
- [ ] `tests/unit/standings-schema-and-importer.test.ts` -- Write failing unit tests checking valid parsing, cap rejections, and CSV conversion -- Enforces TDD Red phase.

**Acceptance Criteria:**
- Given a valid standings JSON snapshot, when parsed by `StandingsSnapshotSchema`, then it validates successfully with all operator scores non-negative and properly ranked (`FR-12`).
- Given an operator record with 4 counted Multi-Op entries or 4 Outside-QA entries, when validated, then `Zod` throws an error citing the rule violation (`FR-12`, `AD-3`).
- Given `data/standings/example-simulation.json`, when loaded, then all 29 QAs have valid representation and match Table 3 quota structures (`FR-4`).
- Given `npm run validate:data`, when executed, then it verifies the simulation standings dataset exits 0 (`AD-3`).

## Implementation Notes

## Spec Change Log

## Review Triage Log

## Verification

**Commands:**
- `npm run validate:data` -- expected: exits 0 verifying standings snapshot schema
- `npm run typecheck` -- expected: `tsc --noEmit` exits 0
- `npm run test:unit` -- expected: `vitest run` passes 100% of standings schema tests
- `npm run build` -- expected: `next build` exits 0
