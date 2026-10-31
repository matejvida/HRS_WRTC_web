---
title: 'Story 4.2: Clean, Dignified Static Sponsors & Partners Hub (/sponsors/)'
type: 'feature'
created: '2026-10-31'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
context:
  - '_bmad-output/implementation-artifacts/epic-4-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Potential equipment manufacturers, corporate partners, contest clubs, and individual donors need a dignified institutional hub on `wrtc2030.hr` to understand sponsorship tiers and connect with the WRTC Organizing Committee. The site must strictly avoid gimmicky crowdfunding meters or premature bidding auctions that misrepresent WRTC governance.

**Approach:** Build `/sponsors/` as a clean, static, non-transactional Server Component driven by `data/sponsors.json` (`AD-6`). It showcases tiers for the Institutional Host (`HRS — hamradio.hr`), Commercial & Equipment Partners, Club & DX Foundations, and Individual Patrons, with clear explanation of the 4 Sponsored Teams (Rule 8.D, applications open after 1 Jan 2029) and direct inquiry buttons linking to `wrtc2030@hamradio.hr`.

## Boundaries & Constraints

**Always:**
- Follow `AD-6`: `/sponsors/` must remain strictly static, non-transactional, and driven by `data/sponsors.json`.
- Provide prominent direct inquiry CTAs linking to `mailto:wrtc2030@hamradio.hr`.
- Include clear explanation that the 4 Sponsored Team selection process formally opens after **1 January 2029** per Selection Rules v1.0 Section 8.D.
- Include institutional recognition of the host society: **Croatian Amateur Radio Association (HRS)** (`hamradio.hr`).
- Maintain zero horizontal overflow on mobile screens (`320px–430px`).

**Never:**
- Never introduce online payment checkouts, credit card forms, or PayPal buttons (`AD-6`).
- Never introduce live crowdfunding progress bars, donation meters, or online bidding portals (`AD-6`).
- Never introduce interactive 60-tent picking or reservation grids (`AD-6`).

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Page Render | Visitor opens `/sponsors/` | Pre-renders sponsor tiers, HRS host recognition, 2029 Sponsored Teams notice, and inquiry CTA | Static edge generation (`dynamic = 'error'`) |
| Sponsorship Inquiry | Visitor clicks `Inquire About Sponsorship` | Triggers mailto client with subject `[WRTC 2030] Sponsorship Inquiry` to `wrtc2030@hamradio.hr` | Client mailto link |
| Verification of Non-Goals | Automated test searches for crowdfunding or payment elements | Asserts 0 instances of progress bars, payment inputs, or bidding forms | Test fails if transactional elements exist |

</frozen-after-approval>

## Code Map

- `data/sponsors.json` -- Canonical dataset defining sponsor tiers (Institutional, Commercial, Club, Patron).
- `src/lib/schemas/sponsors.schema.ts` -- `Zod` validation schema for sponsor tiers.
- `src/components/sponsors/SponsorTierGrid.tsx` -- Presentational component rendering sponsor tiers.
- `src/components/sponsors/SponsoredTeamNotice.tsx` -- Rule 8.D notice card for the 2029 Sponsored Team process.
- `src/app/sponsors/page.tsx` -- Main static page route for `/sponsors/`.
- `tests/unit/sponsors-hub.test.tsx` -- Unit tests verifying data schema, tier presentation, and non-transactional assertions (`AD-6`).
- `tests/e2e/sponsors.spec.ts` -- E2E tests verifying desktop and mobile rendering.

## Tasks & Acceptance

**Execution:**
- [x] `data/sponsors.json`, `src/lib/schemas/sponsors.schema.ts` -- Create canonical sponsor tier dataset and schema -- Satisfies `FR-10`, `AD-6`.
- [x] `src/components/sponsors/SponsorTierGrid.tsx`, `src/components/sponsors/SponsoredTeamNotice.tsx` -- Implement clean presentational tier components -- Satisfies `FR-10`.
- [x] `src/app/sponsors/page.tsx` -- Assemble `/sponsors/` static route segment -- Satisfies `FR-10`, `NFR-1`.
- [x] `tests/unit/sponsors-hub.test.tsx`, `tests/e2e/sponsors.spec.ts` -- Author failing unit and E2E tests enforcing `AD-6` non-transactional invariants -- Enforces TDD Red phase.

**Acceptance Criteria:**
- Given a visitor opens `/sponsors/`, when rendered, then the Institutional Host (HRS), Commercial Partners, Club Foundations, and Patron tiers are displayed with direct `mailto:wrtc2030@hamradio.hr` links (`FR-10`).
- Given the page markup, when inspected by automated tests, then zero progress bars, zero payment gateways, and zero tent-bidding widgets exist (`AD-6`).
- Given the 2029 Sponsored Team notice, when viewed, then it cites Section 8.D of Selection Rules v1.0 and notes applications open after 1 January 2029 (`FR-10`).

## Implementation Notes
- Created `data/sponsors.json` specifying Institutional Host (Hrvatski radioamaterski savez - HRS), Principal Partners, Equipment & Technology, Contest Clubs & Foundations, and Individual Patrons.
- Created `src/lib/schemas/sponsors.schema.ts` and `src/lib/sponsors-loader.ts`, adding validation to `scripts/validate-data.ts`.
- Implemented `<SponsorTierGrid />` and `<SponsoredTeamNotice />` adhering strictly to `AD-6` non-transactional requirements (zero payment forms, zero crowdfunding progress bars).
- Formatted official Section 8.D notice for the 4 Sponsored Teams opening applications on 1 January 2029.
- Built static route `/sponsors/` with `export const dynamic = 'error'`.
- Updated navigation in `SiteHeader.tsx`.

## Verification

**Commands:**
- `npm run validate:data` -- verified: exits 0 (including 4 sponsor tiers)
- `npm run typecheck` -- verified: `tsc --noEmit` exits 0
- `npm run test:unit` -- verified: 73/73 unit tests pass across 11 test suites
- `npm run build` -- verified: statically builds all 14 routes
- `npm run test:e2e` -- verified: 58/58 Playwright E2E tests pass across Desktop Chrome and Mobile iPhone
