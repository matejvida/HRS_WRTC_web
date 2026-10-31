# Epic 3 Context: Interactive Qualification Standings Engine, Score Simulator & Validated Ingestion

<!-- Compiled from planning artifacts. Edit freely. Regenerate with compile-epic-context if planning docs change. -->

## Goal

Build the interactive Qualification Standings leaderboard across all 29 Qualifying Areas, Sub-Areas, and Youth (`/competition/standings/`), the Operator Score Breakdown Drawer, the Pre-Season Interactive Score Simulator (seeded with official Selection Rules v1.0 examples), and the build-time `Zod`-validated CSV/JSON standings ingestion pipeline (`scripts/import-standings.ts`) so radio contesters worldwide can track qualification quotas, inspect scores in `< 50ms`, and test-drive the scoring engine.

## Stories

- Story 3.1: Standings Snapshot Schema, CSV/JSON Importer CLI & Pre-Season Simulation Seed
- Story 3.2: Interactive 29-QA Standings Explorer, Callsign Search & Cutoff Line (`/competition/standings/`)
- Story 3.3: Operator Score Breakdown Drawer & Pre-Season Interactive Simulator Toggle

## Requirements & Constraints

- **Build-Time Schema Validation for Standings Snapshots (`AD-3`):** Every standings snapshot in `data/standings/*.json` (or converted from CSV via `scripts/import-standings.ts`) must pass `StandingsSnapshotSchema` (`Zod`) during `next build` and CI. Enforces: valid QA codes matching Table 3 (`29 QAs`, `50 Qualifying Teams`), valid event IDs (`1..24`), max 10 counted events per applicant (max 3 Multi-Op, max 3 Outside-QA; max 6 for Youth), and monotonic rank sorting with deterministic tie-breaking.
- **Static Edge Pre-Rendering with Client-Side Indexing (`AD-4`):** `/competition/standings/` pre-renders the initial Quota & Leaderboard shell at build time (`export const dynamic = 'error'`) and hydrates the `<StandingsExplorer />` Client Component with a pre-indexed JSON payload (`< 250 KB`). Filtering by QA, Sub-Area, callsign prefix search, and drawer inspection execute in `< 50ms` in memory while syncing to URL search params (`?qa=EU-2&call=9A5W`).
- **Exact Qualification Cutoff Line (`FR-3`):** Renders a distinct `#ED1C24` red dashed/solid line immediately beneath Rank $N$ matching Table 3's quota for the selected QA (e.g. 2 teams for EU #2, 4 teams for EU #4, 1 team for NA #1) with label `"Top N Qualify as Automatic Team Leaders"`.
- **Operator Score Breakdown Drawer (`FR-4`):** Clicking or pressing `Enter` on any operator row opens an accessible slide-over drawer (`aria-expanded`, keyboard focus trap, `Escape` to close) detailing their total score and all contributing contest entries (Event #, Contest Name, Category `SO`/`MO`, In/Out QA flag, Weighting Factor, and Points) plus dropped lower-scoring events.
- **Pre-Season Interactive Simulator (`FR-4`):** When in pre-season state (prior to Event #1 results), a prominent mode switcher allows contesters to test the official scoring formula: `Points = EF × MF × OF × (Your Score / Leader Score) × 1000` with inputs for EF, MF, OF, claimed score, and QA leader score.

## Technical Decisions

- **In-Memory Filtering:** Standings client component holds pre-filtered structures per QA to eliminate search recomputation delays.
- **Zod-Guarded CLI Ingestion:** `scripts/import-standings.ts` processes raw CSV/JSON dumps from the WRTC scoring software and writes canonical snapshots to `data/standings/latest.json`.

## UX & Interaction Patterns

- **Deep Linking:** Standings explorer reflects state directly into query parameters: `qa` (`EU-1`..`OC-2` or `ALL`), `sub` (Sub-Area code), `call` (callsign substring), and `view` (`standings` | `simulator`).
- **Ergonomics & Accessibility:** High-density desktop table switches to responsive operator cards on mobile (`< 768px`) with zero horizontal clipping.

## Cross-Story Dependencies

- **Story 3.1 → Story 3.2 & 3.3:** The validated schemas, ingestion CLI, and seed simulation data from Story 3.1 are prerequisites for the Standings Explorer (3.2) and Breakdown Drawer (3.3).
- **Epic 2 → Epic 3:** Epic 3 relies on the Table 1–7 event and quota definitions established in Epic 2.
