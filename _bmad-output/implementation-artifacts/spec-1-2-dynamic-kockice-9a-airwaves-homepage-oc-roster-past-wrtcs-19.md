---
title: 'Story 1.2: "Dynamic Kockice & 9A Airwaves" Homepage, OC Roster & Past WRTCs (1990–2026)'
type: 'feature'
created: '2026-10-31'
status: 'done'
route: 'dispatch'
baseline_commit: '457eeb0'
review_loop_iteration: 0
context:
  - '_bmad-output/implementation-artifacts/epic-1-context.md'
  - '_bmad-output/implementation-artifacts/spec-1-1-project-scaffold-official-brand-assets-zero-fouc-theme-githu.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Story 1.1 established the Next.js 15 App Router scaffold, brand primitives, and an initial Hero shell on `/`, but the homepage still lacks the structured, Zod-validated JSON datasets (`data/committee.json` for all 11 Organizing Committee members and `data/past-events.json` for the historical WRTC archive from `1990 Seattle` through `2026 UK`), the dedicated Live Event #1 Countdown/Telemetry Ticker bar (`9A DX Contest — Dec 19–20, 2026 UTC`), the complete About WRTC section (`2 operators`, `24h`, `~4M radio amateurs`, `60 identical field stations`), the Slavonia Venue showcase cards (`Osijek · Čepin · Đakovo`), the 11-member Organizing Committee roster with `JetBrains Mono` callsign badges, and the 1990–2026 Past WRTC archive.

**Approach:** Create canonical JSON datasets in `data/committee.json` (all 11 OC members from `9A4M` Mate Botica to `9A6PAX` Marija Sorić) and `data/past-events.json` (historical WRTC editions from `1990 Seattle, USA` through `2026 United Kingdom` with champion callsigns and archive URLs), validate them at build/CI time via `Zod` schemas (`src/lib/schemas/homepage-data.schema.ts` and `scripts/validate-data.ts`), and implement the full Proposal 1 *"Dynamic Kockice & 9A Airwaves"* Homepage (`src/app/page.tsx` and modular homepage components) via strict Red → Green → Refactor TDD (`Vitest` + `Playwright` Desktop & Mobile).

## Boundaries & Constraints

**Always:**
- Preserve `docs/` and all Story 1.1 brand/layout components and tests intact.
- Follow strict TDD (`Red → Green → Refactor`): write failing `Vitest` unit/schema/component tests and `Playwright` E2E tests (`Desktop Chrome 1440×900` and `Mobile iPhone 375×812`) before implementing the Story 1.2 data loaders and homepage sections.
- Validate `data/committee.json` (exact 11 OC members: `9A4M`, `9A1UN`, `9A5W`, `9A3A`, `9A2G`, `9A5X`, `9A5R`, `9A6KX`, `9A3XV`, `YU1LA`, `9A6PAX`) and `data/past-events.json` (`1990 Seattle` through `2026 UK`) with `Zod` in `scripts/validate-data.ts` and `src/lib/content-loader.ts`.
- Render callsign badges, contest dates, and numeric telemetry in `JetBrains Mono` (`tabular-nums`) and maintain zero horizontal overflow (`320px–1440px`).

**Never:**
- Never hardcode the 11 OC members or Past WRTC editions inline in JSX—always load them through the validated `data/committee.json` and `data/past-events.json` layer (`AD-1`, `AD-4`).
- Never introduce interactive 60-tent picking grids or crowdfunding progress bars (`AD-6`).

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Build-time dataset validation | `data/committee.json` & `data/past-events.json` validated via `Zod` | Confirms 11 OC members (`9A4M`..`9A6PAX`) and historical WRTC editions (`1990 Seattle`..`2026 UK`) with valid callsigns and URLs | Throws descriptive `ZodError` in `validate:data` if any member/edition is missing or malformed |
| Homepage Hero & Live Event #1 Ticker | Visitor opens `/` in Day or Night mode | Displays Proposal 1 Hero, Kockice Mosaic + 9A Propagation Arcs SVG, `9A · CROATIA` Championship Brief card, and Live Event #1 Ticker (`9A DX Contest — 19–20 December 2026 UTC`) | Static SSR (`export const dynamic = 'error'`), zero hydration mismatch |
| Organizing Committee Roster (`#team`) | Visitor scrolls to `#team` on Desktop (`1440×900`) or Mobile (`375×812`) | Renders all 11 OC members with initials avatar, `JetBrains Mono` callsign badge (`9A4M`..`9A6PAX`), full name, and official role | Responsive grid collapses cleanly to 1 column on mobile with zero horizontal overflow |
| Past WRTC Archive (`#past-events`) | Visitor scrolls to `#past-events` (`1990–2026`) | Renders all historical editions (`1990 Seattle` through `2026 UK`) with year, host location, champion callsign badges (`JetBrains Mono`), and external archive links (`rel="noopener noreferrer"`) | Responsive card/table layout with zero horizontal overflow at `320px` and `375px` |

</frozen-after-approval>

## Code Map

- `data/committee.json` -- Canonical 11-member WRTC 2030 Organizing Committee dataset (`9A4M` Mate Botica, `9A1UN` Davor Kucelin, `9A5W` Nikola Perčin, `9A3A` Ivo Pezer, `9A2G` Zlatko Tonković, `9A5X` Darko Martinčević, `9A5R` Željko Dražić Karalić, `9A6KX` Mirko Jurman, `9A3XV` Aleksandar Jugović, `YU1LA` Ivan Mastilović, `9A6PAX` Marija Sorić).
- `data/past-events.json` -- Canonical historical WRTC archive (`1990 Seattle, USA` through `2026 United Kingdom`) with year, edition label, host city/country, champion callsigns, and official archive URL.
- `src/lib/schemas/homepage-data.schema.ts` & `src/lib/content-loader.ts` -- `Zod` schemas (`CommitteeMemberSchema`, `CommitteeListSchema`, `PastEventSchema`, `PastEventListSchema`) and typed server loaders (`getCommitteeMembers()`, `getPastEvents()`).
- `scripts/validate-data.ts` -- Extend `validateAssets()` to validate `data/committee.json` and `data/past-events.json` using the `Zod` schemas.
- `src/app/page.tsx` & `src/app/globals.css` -- Upgrade `/` with the Live Qualifying Event #1 Ticker bar (`9A DX Contest — Dec 19–20, 2026 UTC`), About WRTC section (`2 operators`, `24h`, `~4M`, `60 field stations`), Slavonia Host Region preview (`Osijek · Čepin · Đakovo`), 11-member Organizing Committee roster (`#team`), 1990–2026 Past WRTC archive (`#past-events`), and clean static Sponsors & Supporters strip (`#sponsors`).
- `tests/unit/homepage-data-and-sections.test.tsx` & `tests/e2e/homepage-story-1-2.spec.ts` -- Unit/schema/component tests and Desktop + Mobile E2E tests.

## Tasks & Acceptance

**Execution:**
- [ ] `data/committee.json`, `data/past-events.json`, `src/lib/schemas/homepage-data.schema.ts`, `src/lib/content-loader.ts`, `scripts/validate-data.ts` -- Create canonical JSON datasets for the 11 OC members and 1990–2026 Past WRTC editions, `Zod` validation schemas, typed loaders, and `validate:data` checks -- Satisfies `FR-11`, `AD-1`, `AD-4`.
- [ ] `tests/unit/homepage-data-and-sections.test.tsx`, `tests/e2e/homepage-story-1-2.spec.ts` -- Write failing `Vitest` unit/component tests and `Playwright` Desktop (`1440×900`) + Mobile (`375×812`) E2E tests covering `Zod` schema validation (including rejection of malformed inputs), Live Event #1 Ticker, About WRTC, Slavonia teaser, all 11 OC members, and 1990–2026 Past WRTC editions -- Enforces `FR-15` and `AD-9` TDD Red phase.
- [ ] `src/app/page.tsx`, `src/app/globals.css` -- Implement the full Story 1.2 Homepage sections (Proposal 1 Hero, Live Event #1 Countdown/Telemetry Ticker bar for `9A DX Contest — Dec 19–20, 2026 UTC`, About WRTC & 60-Team Format overview, Slavonia `Osijek · Čepin · Đakovo` preview cards, 11-member Organizing Committee grid, 1990–2026 Past WRTC archive cards with champion callsigns, Selection Rules v1.0 PDF cards, and clean Sponsors inquiry strip) -- Satisfies `FR-2`, `FR-6`, `FR-11`, `UX-DR1`, `NFR-2`.

**Acceptance Criteria:**
- Given `data/committee.json` and `data/past-events.json`, when `npm run validate:data` runs, then `Zod` verifies all 11 Organizing Committee members (`9A4M` through `9A6PAX`) and all historical WRTC editions (`1990 Seattle` through `2026 UK`) (`FR-11`).
- Given a visitor opens `/` in Day or Night mode, when the homepage renders, then the Hero displays the Royal Blue & Shack Navy gradient backdrop with the stepped `#ED1C24` red & white Kockice Mosaic + Concentric 9A Propagation Arcs SVG, the headline *"THE OLYMPICS OF AMATEUR RADIO ARRIVES IN CROATIA"*, the frosted Official Championship Brief (`9A · CROATIA`) card with `#ED1C24` top border and `<CheckerFive />` mark, and the live ticker bar highlighting Qualifying Event #1 (`9A DX Contest — Dec 19–20, 2026 UTC`) (`FR-2`, `FR-6`, `UX-DR1`).
- Given the Organizing Committee (`#team`) and Past Events (`#past-events`) sections on `/`, when rendered on Desktop (`1440×900`) and Mobile (`375×812`), then all 11 OC members (`9A4M` Mate Botica, `9A1UN` Davor Kucelin, `9A5W` Nikola Perčin, `9A3A` Ivo Pezer, `9A2G` Zlatko Tonković, `9A5X` Darko Martinčević, `9A5R` Željko Dražić Karalić, `9A6KX` Mirko Jurman, `9A3XV` Aleksandar Jugović, `YU1LA` Ivan Mastilović, `9A6PAX` Marija Sorić) and all historical WRTC editions (`1990 Seattle` through `2026 UK`) render from structured JSON with `JetBrains Mono` callsign badges and zero horizontal overflow (`FR-11`, `NFR-2`).

## Implementation Notes

## Spec Change Log

## Review Triage Log

## Verification

**Commands:**
- `npm run validate:data` -- expected: exits 0 confirming SVGs, PDFs, 11 OC members in `data/committee.json`, and Past WRTCs in `data/past-events.json`
- `npm run typecheck` -- expected: `tsc --noEmit` exits 0
- `npm run test:unit` -- expected: `vitest run` passes all Story 1.1 and Story 1.2 unit/schema/component tests
- `npm run build` -- expected: `next build` statically generates `/` and exits 0
- `npm run test:e2e` -- expected: `playwright test` passes 100% of Desktop (`1440x900`) and Mobile (`375x812`) E2E tests
