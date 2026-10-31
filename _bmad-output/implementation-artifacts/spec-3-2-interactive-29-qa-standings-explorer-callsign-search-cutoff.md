---
title: 'Story 3.2: Interactive 29-QA Standings Explorer, Callsign Search & Cutoff Line (/competition/standings/)'
type: 'feature'
created: '2026-10-31'
status: 'ready-for-dev'
route: 'dispatch'
review_loop_iteration: 0
context:
  - '_bmad-output/implementation-artifacts/epic-3-context.md'
  - '_bmad-output/implementation-artifacts/spec-3-1-standings-snapshot-schema-csv-json-importer-cli-pre-season-s.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Contesters, team leader aspirants, and spectators need to track real-time standings across 29 Qualifying Areas, search by callsign in milliseconds, and clearly see who currently sits above the qualification cutoff line without sluggish server roundtrips or complex spreadsheet downloads.

**Approach:** Build the primary `/competition/standings/` leaderboard powered by a pre-indexed client component (`<StandingsExplorer />`). It features continent/macro-region tabs (`EU`, `NA`, `AS`, `AF`, `SA`, `OC`, `Youth`, `All`), a 29-QA dropdown with Sub-Area options, an instant `< 50ms` callsign prefix search box, and a prominent `#ED1C24` red **Allocation Cutoff Line** marking the Table 3 automatic qualification boundary for each QA. All filter state synchronizes cleanly with URL query parameters (`?qa=EU-2&call=9A`).

## Boundaries & Constraints

**Always:**
- Follow `AD-4`: Pre-render static page shell (`export const dynamic = 'error'`) and hydrate `<StandingsExplorer />` with pre-indexed snapshot JSON (`< 250 KB`).
- Execute all filtering, search, and sorting entirely in memory in `< 50ms`.
- Sync filter states to URL search parameters: `qa` (`EU-1`..`OC-2` or `ALL`), `sub` (Sub-Area), and `call` (callsign query).
- Render a distinct `#ED1C24` red cutoff divider immediately beneath Rank $N$ matching Table 3 quota (e.g. 4 teams for EU #4, 2 teams for EU #6) with label `"Top N Qualify as Automatic Team Leaders"`.
- Provide responsive mobile card presentation for screens `< 768px` ensuring zero horizontal clipping.
- Use `JetBrains Mono` (`tabular-nums`) for callsigns, scores, ranks, and quota badges.

**Never:**
- Never execute dynamic database or server SQL queries on every keypress.
- Never display an incorrect cutoff line rank that disagrees with Table 3 team quotas.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| QA Selection (`EU #6`) | User selects `EU #6 (Croatia, etc.)` | Renders EU #6 leaderboards, sets cutoff line after Rank 2, updates URL `?qa=EU-6` | Shows empty state banner if no operators recorded yet |
| Callsign Search (`9A`) | User types `9A` in search box | Filters visible operators in `< 50ms` to those matching prefix, case-insensitively | Shows `"No matching operators found"` if search yields zero hits |
| Sub-Area Filter (`NA #1`) | User selects Sub-Area `W1` | Filters NA #1 list to operators in `W1` with sub-area quota marker | Retains parent QA selection |
| Deep-linked URL Visit | User opens `/competition/standings/?qa=EU-4&call=DL` | Automatically initializes with `EU-4` selected, `DL` in search box, and filtered results | Normalizes invalid QA parameters to `ALL` |

</frozen-after-approval>

## Code Map

- `src/components/standings/StandingsExplorer.tsx` -- Main client island orchestrating macro-region tabs, QA selector, search input, and table rendering.
- `src/components/standings/StandingsTable.tsx` -- High-density leaderboard table with cutoff row and `JetBrains Mono` formatting.
- `src/components/standings/StandingsCardList.tsx` -- Mobile-optimized card layout for screens `< 768px`.
- `src/components/standings/CutoffRow.tsx` -- Prominent `#ED1C24` red quota cutoff line indicator.
- `src/app/competition/standings/page.tsx` -- Route segment pre-rendering the standings page shell.
- `tests/unit/standings-explorer.test.tsx` -- Unit tests for search latency, QA filtering, cutoff positioning, and URL sync.
- `tests/e2e/standings-explorer.spec.ts` -- E2E tests across Desktop (`1440×900`) and Mobile (`375×812`) viewports.

## Tasks & Acceptance

**Execution:**
- [ ] `src/components/standings/CutoffRow.tsx`, `src/components/standings/StandingsTable.tsx`, `src/components/standings/StandingsCardList.tsx` -- Build leaderboard presentation components -- Satisfies `FR-3`, `UX-DR4`.
- [ ] `src/components/standings/StandingsExplorer.tsx` -- Implement client search/filter engine, URL sync, and in-memory indexing -- Satisfies `FR-3`, `AD-4`.
- [ ] `src/app/competition/standings/page.tsx` -- Assemble `/competition/standings/` static page route -- Satisfies `FR-3`, `NFR-1`.
- [ ] `tests/unit/standings-explorer.test.tsx`, `tests/e2e/standings-explorer.spec.ts` -- Write failing unit and E2E tests verifying search speed, cutoff placement, and mobile layout -- Enforces TDD Red phase.

**Acceptance Criteria:**
- Given `/competition/standings/`, when a visitor opens the page, then the standings table renders with verified data, `JetBrains Mono` callsign badges, and ranks (`FR-3`).
- Given a visitor selects a QA (e.g. `EU #6`), when rendered, then the cutoff line appears exactly after Rank $N$ matching Table 3 quota (e.g. Rank 2 for EU #6) (`FR-3`, `UX-DR4`).
- Given a callsign query typed into the search field, when tested, then the table filters in under 50ms and updates the URL parameter (`FR-3`, `NFR-1`).
- Given a mobile phone (`375×812`), when viewing standings, then operator cards render with `scrollWidth <= clientWidth` (`NFR-2`).

## Implementation Notes

## Spec Change Log

## Review Triage Log

## Verification

**Commands:**
- `npm run validate:data` -- expected: exits 0
- `npm run typecheck` -- expected: `tsc --noEmit` exits 0
- `npm run test:unit` -- expected: `vitest run` passes 100% of standings explorer tests
- `npm run build` -- expected: `next build` statically pre-renders `/competition/standings/`
- `npm run test:e2e` -- expected: `playwright test` passes all standings E2E tests
