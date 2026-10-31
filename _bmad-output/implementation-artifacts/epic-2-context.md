# Epic 2 Context: Selection Rules v1.0 Hub & 24-Contest Qualifying Calendar

<!-- Compiled from planning artifacts. Edit freely. Regenerate with compile-epic-context if planning docs change. -->

## Goal

Deliver the canonical machine-readable rules datasets (`Tables 1–7`), the complete 3-tab Selection Rules v1.0 documentation hub (`/competition/selection-rules/`), the 3 official PDF downloads, and the interactive 24-Contest Qualifying Events Calendar (`/competition/qualifying-events/`) backed by build-time `Zod` validation so contesters and team leader applicants can verify any qualification rule, schedule, or scoring multiplier with 100% precision on desktop and mobile.

## Stories

- Story 2.1: Canonical Rules Datasets (`Tables 1–7`) & Build-Time Zod Validation
- Story 2.2: Selection Rules v1.0 3-Tab Hub, Sticky Scroll-Spy TOC & Official PDF Downloads (`/competition/selection-rules/`)
- Story 2.3: Interactive 24-Contest Qualifying Events Calendar (`/competition/qualifying-events/`)

## Requirements & Constraints

- **Single Source of Truth (`AD-5`):** The 24 Qualifying Events (`data/rules/qualifying-events.json`), Weighting Factors (`data/rules/weighting-factors.json`), 29 Qualifying Areas & 50 Team Quotas (`data/rules/qualifying-areas.json`), and 10 Special Teams (`data/rules/special-teams.json`) are the single source of truth imported by both the Selection Rules page renderers and the downstream Standings and Calendar engines.
- **Build-Time Schema Validation:** `src/lib/schemas/rules.schema.ts` validates that all 24 events (`#1 9A DX Contest` Dec 2026 to `#24 CQ WW DX CW` Nov 2028), all 29 QAs summing to 50 Qualifying Teams (`EU #1–#9` = 23, `NA #1–#11` = 16, `AS #1–#4` = 5, `AF #1` = 2, `SA #1–#2` = 2, `OC #1–#2` = 2), and 10 Special Teams (`Youth` 3, `Sponsored` 4, `Wild Card` 2, `Defending Champion` 1) match Selection Rules v1.0 verbatim (`FR-5`, `FR-6`, `AD-5`).
- **3-Tab Selection Rules Hub (`/competition/selection-rules/`):** Three distinct tab panels (`Selection Rules v1.0`, `Questions & Answers`, `Score Calculation Examples`) synced to URL search parameter `?tab=rules|qa|examples`. Sticky left Table of Contents (`280px`, `Sections 1–11`) with active scroll-spy, mobile jump pill, and monospace-aligned tables for Tables 1–7 (`JetBrains Mono`, `tabular-nums`).
- **Official PDF Downloads Card:** Sidebar card providing one-click downloads for `wrtc-2030-selection-rules-v1.0.pdf`, `wrtc-2030-selection-rules-qa-v1.0.pdf`, and `wrtc-2030-score-calculation-examples.pdf` located in `public/files/`.
- **Interactive 24-Contest Calendar (`/competition/qualifying-events/`):** Filterable timeline across all 24 contests by Mode (`All`, `CW`, `SSB`, `Mixed`) and Status (`Upcoming`, `Completed`). Prominently pins the next upcoming event (`#1 9A DX Contest — Dec 19–20, 2026 UTC`) with countdown ticker and displays Table 2 Single-Op and Multi-Op multipliers.

## Technical Decisions

- **Route Segment Strategy:** Pre-rendered static pages (`export const dynamic = 'error'`) with client-side interaction islands for tab switching, search/filtering, and scroll-spy TOC.
- **Content Organization:** Markdown/MDX prose for Sections 1–11 in `content/rules/selection-rules-v1.mdx`, `content/rules/selection-rules-qa-v1.mdx`, and `content/rules/score-calculation-examples.mdx`.
- **Validation:** Every build/test run executes `npm run validate:data` verifying rules datasets before compilation.

## UX & Interaction Patterns

- **Sticky TOC:** Collapsible on mobile viewports (`< 920px`) via accessible `<details class="toc">` disclosure with `aria-expanded`.
- **Monospace Table Numeric Alignment:** All Table 1–7 columns (event numbers, point multipliers, team quotas, and callsigns) use `JetBrains Mono` with `font-variant-numeric: tabular-nums`.

## Cross-Story Dependencies

- **Story 2.1 → Story 2.2 & 2.3:** The canonical `Zod` schemas and JSON datasets in `data/rules/` are prerequisites for rendering the tables in Story 2.2 and the interactive calendar in Story 2.3.
- **Epic 2 → Epic 3:** The Standings Engine in Epic 3 directly imports the 29 QA quotas and 24 event definitions validated in Epic 2.
