---
title: 'Story 4.1: Croatia & Slavonia Propagation Arena, Accommodation, Gastronomy & Travel Guide (/croatia-slavonia/)'
type: 'feature'
created: '2026-10-31'
status: 'ready-for-dev'
route: 'dispatch'
review_loop_iteration: 0
context:
  - '_bmad-output/implementation-artifacts/epic-4-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** International competitors, referees, family members, and media know Croatia primarily for its Dalmatian coastline. They lack a dedicated, authoritative guide explaining why the flat Pannonian plains of Slavonia (`Osijek, Čepin, Đakovo`) offer an exceptional, equalized HF propagation arena, where to stay, what authentic local culinary traditions to experience, and how to travel there.

**Approach:** Build `/croatia-slavonia/` as a static, rich regional and technical guide featuring:
1. The **Pannonian Propagation Arena** technical breakdown (`0°` horizon take-off, `85m–110m ASL` uniform elevation, high-conductivity agricultural soil, and 60 identical stations).
2. Curated destination cards for **Osijek** (Tvrđa baroque fortress, Drava river walk, hotels), **Đakovo** (St. Peter's Cathedral, State Lipizzaner Stud Farm), **Čepin** (Pannonian plain station hub), and **Kopački Rit Nature Park**.
3. A **Slavonian Gastronomy & Wine Guide** (*slavonski kulen*, *fiš paprikaš*, *čobanac*, and Graševina wine trails).
4. An **International Travel & Arrival Guide** detailing airport gateways (`ZAG` Zagreb, `OSI` Osijek, `BUD` Budapest, `BEG` Belgrade) and the A5 Slavonika motorway corridor.

## Boundaries & Constraints

**Always:**
- Pre-render all pages statically (`export const dynamic = 'error'`) with zero runtime server latency.
- Frame sections and cards with Proposal 1 brand motifs (`.checker`, `<CheckerFive />`, `<CheckerRibbon />`, `<KockiceCluster />`).
- Ensure all technical propagation specifications match the official bid documentation (`0°` take-off, `85m–110m ASL`, 60 field stations).
- Ensure zero horizontal overflow on smartphone viewports (`320px–430px`).
- Include verified links to regional tourism boards and international transit info.

**Never:**
- Never use generic placeholder descriptions that could apply to any region; ground every card specifically in Slavonia, Baranja, Osijek, Čepin, and Đakovo.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Page Render | Visitor opens `/croatia-slavonia/` | Pre-renders technical propagation section, destination cards, food/wine guide, and transit table | Static generation exits 0 |
| Theme Switching | User toggles Day/Night theme on `/croatia-slavonia/` | Seamlessly switches color tokens (`#0D1333` Shack Navy in Night, `#FFFFFF` card in Day) with zero FOUC | Inline script handles theme |
| Mobile Viewport (`375×812`) | Smartphone visitor scrolls through regional cards | Cards collapse from 3 columns to 1 column with full touch ergonomics and zero clipping | Verified in Playwright mobile project |

</frozen-after-approval>

## Code Map

- `src/components/venue/PropagationArena.tsx` -- Technical propagation overview component with elevation profile and take-off diagrams.
- `src/components/venue/DestinationCards.tsx` -- Responsive cards for Osijek, Đakovo, Čepin, and Kopački Rit.
- `src/components/venue/GastronomyGuide.tsx` -- Slavonian culinary guide covering kulen, fiš, čobanac, and Graševina.
- `src/components/venue/TravelTransitTable.tsx` -- Airport and highway travel corridor table.
- `src/app/croatia-slavonia/page.tsx` -- Main static page route assembling the venue showcase.
- `tests/unit/venue-showcase.test.tsx` -- Unit tests verifying propagation facts, destination cards, and travel table rendering.
- `tests/e2e/venue-showcase.spec.ts` -- E2E tests verifying desktop layout, theme switching, and mobile zero-overflow.

## Tasks & Acceptance

**Execution:**
- [ ] `src/components/venue/*.tsx` -- Implement technical propagation, destination, gastronomy, and transit components -- Satisfies `FR-7`, `FR-8`, `UX-DR6`.
- [ ] `src/app/croatia-slavonia/page.tsx` -- Assemble `/croatia-slavonia/` static route segment -- Satisfies `FR-7`, `FR-8`, `NFR-1`.
- [ ] `tests/unit/venue-showcase.test.tsx`, `tests/e2e/venue-showcase.spec.ts` -- Write failing unit and E2E tests for venue page -- Enforces TDD Red phase.

**Acceptance Criteria:**
- Given a visitor navigates to `/croatia-slavonia/`, when rendered, then the page displays the Pannonian Propagation Arena overview (`0°` horizon take-off, `85m–110m ASL`, 60 field stations) (`FR-7`).
- Given the destination section, when viewed, then dedicated cards render for Osijek (Tvrđa), Đakovo (Cathedral & Lipizzaners), Čepin, and Kopački Rit (`FR-8`).
- Given the travel section, when viewed, then airport corridors (`ZAG`, `OSI`, `BUD`, `BEG`) and the A5 motorway are clearly itemized (`FR-8`).
- Given a mobile phone (`375×812` and `320×568`), when viewing the page, then `scrollWidth <= clientWidth` (`NFR-2`).

## Implementation Notes

## Spec Change Log

## Review Triage Log

## Verification

**Commands:**
- `npm run validate:data` -- expected: exits 0
- `npm run typecheck` -- expected: `tsc --noEmit` exits 0
- `npm run test:unit` -- expected: `vitest run` passes 100% of venue unit tests
- `npm run build` -- expected: `next build` statically pre-renders `/croatia-slavonia/`
- `npm run test:e2e` -- expected: `playwright test` passes all venue E2E tests
