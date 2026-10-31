---
title: 'Story 2.2: Selection Rules v1.0 3-Tab Hub, Sticky Scroll-Spy TOC & Official PDF Downloads (/competition/selection-rules/)'
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

**Problem:** Contesters and team leader applicants need to study the 20-page Selection Rules v1.0, official Q&A clarifications, and score calculation examples on desktop and mobile without having to download a PDF or navigate a clunky document dump.

**Approach:** Implement `/competition/selection-rules/` as a static, responsive documentation hub featuring:
1. A unified 3-tab switcher (`Selection Rules`, `Questions & Answers`, `Score Calculation Examples`) synced with URL search parameter `?tab=rules|qa|examples`.
2. A sticky left Table of Contents (`280px`, `Sections 1–11`) with active scroll-spy and mobile collapsible disclosure (`<details class="toc">`).
3. Complete Sections 1–11 prose pre-rendered with `JetBrains Mono` monospace-aligned `Tables 1–7` importing canonical datasets from Story 2.1.
4. An authoritative sidebar card providing one-click downloads for all 3 official PDFs (`wrtc-2030-selection-rules-v1.0.pdf`, `wrtc-2030-selection-rules-qa-v1.0.pdf`, `wrtc-2030-score-calculation-examples.pdf`).

## Boundaries & Constraints

**Always:**
- Pre-render all documentation tabs statically (`export const dynamic = 'error'`).
- Display all 11 sections of Selection Rules v1.0 and monospace-aligned Tables 1–7 (`JetBrains Mono`, `tabular-nums`) with zero data drift from `data/rules/*.json`.
- Sync active tab to URL search parameter `?tab=rules|qa|examples` using Next.js client state (`useSearchParams` / `nuqs`).
- Ensure smartphone viewports (`320px–430px`) allow comfortable reading with horizontal scrolling on wide tables (`overflow-x: auto`) without breaking the root viewport width (`scrollWidth <= clientWidth`).
- Maintain WCAG 2.1 AA contrast in Day and Night themes.

**Never:**
- Never hardcode duplicate numbers or quota lists into Markdown prose where Tables 1–7 are rendered.
- Never alter the official Selection Rules wording approved on October 19, 2026.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Tab Switcher Navigation | User clicks `Questions & Answers` tab or opens `?tab=qa` | Activates Q&A panel, updates URL to `?tab=qa`, scrolls to top of content | Defaults to `rules` tab if `tab` query param is unrecognized |
| Table of Contents Scroll-Spy | User scrolls past `Section 3: Qualification Areas` | Highlights `Section 3` link in the sticky TOC with a `.checker` mark | Graceful fallback when IntersectionObserver is unsupported |
| Mobile Table Viewport (`375×812`) | User views Table 3 (29 QAs) on mobile | Table scrolls horizontally within its card container (`overflow-x: auto`) while the document body has zero horizontal overflow | Container-scoped scrolling only |
| PDF Downloads | User clicks `Download Official PDF` | Browser initiates download of verified file from `/files/wrtc-2030-selection-rules-v1.0.pdf` | Direct static file serving |

</frozen-after-approval>

## Code Map

- `content/rules/selection-rules-v1.mdx` -- Sections 1–11 prose for the primary rules tab.
- `content/rules/selection-rules-qa-v1.mdx` -- Official Q&A clarifications for Tab 2.
- `content/rules/score-calculation-examples.mdx` -- Worked examples for Tab 3.
- `src/components/rules/SelectionRulesTabs.tsx` -- Client island managing tab switching and URL param sync.
- `src/components/rules/RulesToc.tsx` -- Sticky left scroll-spy Table of Contents (`Sections 1–11`) with mobile disclosure.
- `src/components/rules/RulesTables.tsx` -- Monospace table renderers for Tables 1–7 consuming `data/rules/*.json`.
- `src/components/rules/PdfDownloadCard.tsx` -- Reusable download card for the 3 official PDFs.
- `src/app/competition/selection-rules/page.tsx` -- Main route segment assembling TOC, tabs, tables, and download cards.
- `tests/unit/selection-rules-hub.test.tsx` -- Unit tests for tab switching, TOC generation, table renderers, and PDF download links.
- `tests/e2e/selection-rules.spec.ts` -- E2E tests verifying desktop TOC stickiness, tab switching via URL params, mobile table scroll, and zero horizontal overflow.

## Tasks & Acceptance

**Execution:**
- [ ] `content/rules/*.mdx`, `src/components/rules/RulesTables.tsx`, `src/components/rules/PdfDownloadCard.tsx` -- Author rules content and monospace Table 1–7 components from canonical datasets -- Satisfies `FR-5`, `UX-DR5`.
- [ ] `src/components/rules/SelectionRulesTabs.tsx`, `src/components/rules/RulesToc.tsx` -- Implement 3-tab controller, URL query param sync (`?tab=...`), and sticky scroll-spy TOC -- Satisfies `FR-5`, `UX-DR5`.
- [ ] `src/app/competition/selection-rules/page.tsx` -- Assemble `/competition/selection-rules/` route segment with static edge generation -- Satisfies `FR-5`, `NFR-1`.
- [ ] `tests/unit/selection-rules-hub.test.tsx`, `tests/e2e/selection-rules.spec.ts` -- Write failing unit and E2E tests verifying tabs, TOC navigation, table rendering, and mobile ergonomics -- Enforces TDD Red phase.

**Acceptance Criteria:**
- Given a visitor opens `/competition/selection-rules/`, when rendered, then all 11 sections and Tables 1–7 render with `JetBrains Mono` numeric alignment and the active tab matches `?tab=...` (`FR-5`, `UX-DR5`).
- Given the visitor switches between `Selection Rules`, `Questions & Answers`, and `Score Calculation Examples`, when a tab is clicked, then the content swaps instantaneously and the URL search param updates (`FR-5`).
- Given a mobile viewport (`375×812`), when viewing `/competition/selection-rules/`, then the TOC collapses into an accessible jump menu, wide tables scroll within their containers, and `document.documentElement.scrollWidth <= document.documentElement.clientWidth` (`NFR-2`).
- Given the PDF download card, when clicked, then all 3 official PDFs in `public/files/` are linked with valid download attributes (`FR-5`).

## Implementation Notes

## Spec Change Log

## Review Triage Log

## Verification

**Commands:**
- `npm run validate:data` -- expected: exits 0
- `npm run typecheck` -- expected: `tsc --noEmit` exits 0
- `npm run test:unit` -- expected: `vitest run` passes 100% of rules hub unit tests
- `npm run build` -- expected: `next build` statically generates `/competition/selection-rules/`
- `npm run test:e2e` -- expected: `playwright test` passes all selection rules E2E tests
