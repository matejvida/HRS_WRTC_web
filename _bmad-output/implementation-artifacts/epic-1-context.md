# Epic 1 Context: Next.js Foundation, GitHub → Netlify Pipeline, "Kockice & 9A Airwaves" Homepage, News & Committee Hub

<!-- Compiled from planning artifacts. Edit freely. Regenerate with compile-epic-context if planning docs change. -->

## Goal

Establish the Next.js 15 App Router platform, automated GitHub → Netlify CI/CD pipeline, Proposal 1 (*"Dynamic Kockice & 9A Airwaves"*) Croatian brand design system, full Homepage (`/`), chronological News & Announcements engine (`/news/`, `/news/[slug]/`, and `/feed.xml` RSS), the 11-member Organizing Committee roster, and the 1990–2026 Past WRTC archive so visitors experience an immediately deployable, brand-authentic championship platform on desktop and mobile.

## Stories

- Story 1.1: Project Scaffold, Official Brand Assets, Zero-FOUC Theme & GitHub → Netlify Pipeline
- Story 1.2: "Dynamic Kockice & 9A Airwaves" Homepage, OC Roster & Past WRTCs (1990–2026)
- Story 1.3: Structured News & Official Announcements Feed (`/news/`, `/news/[slug]/` & `/feed.xml`)

## Requirements & Constraints

- **Official Brand Assets & Dual-Theme Header/Footer:** Render the exact official WRTC 2030 Croatia SVG logos (`/brand/wrtc-logo.svg` in Day mode and `/brand/wrtc-logo-white.svg` in Night mode) in the sticky top header and institutional footer, and store the 3 official Selection Rules v1.0 PDFs (`wrtc-2030-selection-rules-v1.0.pdf`, `wrtc-2030-selection-rules-qa-v1.0.pdf`, `wrtc-2030-score-calculation-examples.pdf`) in `/files/`.
- **Zero-FOUC Theme Switching & Zero-Cookie Privacy:** Persist the user's Day (`data-theme="day"`) or Night (`data-theme="night"`) selection in `localStorage` under `wrtc2030-theme` (falling back to `prefers-color-scheme`) via a synchronous inline `<script>` in `src/app/layout.tsx` so there is zero flash of unstyled content on initial render, and set zero third-party tracking cookies.
- **Proposal 1 Croatian Checker Design System:** Provide reusable brand primitives (`<WrtcLogo />`, `<CheckerMark />` for `2×2` diagonal red squares, `<CheckerFive />` for the 5-square stepped motif matching the official SVG logo, `<CheckerRibbon />` for `12px` full-width alternating checkerboard section dividers, and `<KockiceCluster />` for `4×4` corner stamps) alongside the Hero Kockice Mosaic + Concentric 9A Propagation Arcs SVG backdrop.
- **100% Mobile Phone Friendliness & Accessibility:** Ensure smartphone ergonomics (`320px–430px`) with zero horizontal overflow, a collapsible mobile Hamburger Navigation Drawer (`< 920px`) with `≥ 44×44px` touch targets, WCAG 2.1 AA contrast ratios in both Day (`#FFFFFF` / `#14142B`) and Night (`#0D1333` / `#FFFFFF`) modes, and `JetBrains Mono` (`tabular-nums`) for all callsigns, UTC timestamps, and numeric data.
- **Organizing Committee & Past WRTC History:** Render all 11 Organizing Committee members (`9A4M` Mate Botica, `9A1UN` Davor Kucelin, `9A5W` Nikola Perčin, `9A3A` Ivo Pezer, `9A2G` Zlatko Tonković, `9A5X` Darko Martinčević, `9A5R` Željko Dražić Karalić, `9A6KX` Mirko Jurman, `9A3XV` Aleksandar Jugović, `YU1LA` Ivan Mastilović, `9A6PAX` Marija Sorić) and all 9 past WRTC editions (`1990 Seattle` through `2026 UK`) from structured JSON datasets.
- **News & RSS Feed:** Pre-render chronological announcements from `content/news/` newest-first with category filtering (`Official Rules`, `Standings Update`, `Organization`, `Venue`), static article permalinks (`/news/[slug]/`), and a valid RSS 2.0 XML feed at `/feed.xml`.
- **Strict TDD & Per-Story Automated Netlify Deployment:** Every story must follow a Red → Green → Refactor TDD workflow (`Vitest` unit/component tests + `Playwright` E2E tests across `Desktop 1440×900` and `Mobile 375×812` viewports) and leave the repository in a 100% buildable state that passes `.github/workflows/ci-netlify.yml` (`validate:data`, `typecheck`, `test:unit`, `build`, `test:e2e`) and deploys via `netlify.toml`.

## Technical Decisions

- **Stack:** Next.js 15.2.x (App Router, static edge generation `export const dynamic = 'error'`) + React 19 + TypeScript 5.7.x + Tailwind CSS 4.0.x + Zod 3.24.x + `next-mdx-remote` 5.0.x + `@netlify/plugin-nextjs` 5.10.x + Vitest 3.0.x + Playwright 1.50.x.
- **Theme-Agnostic Server HTML:** Toggle Day/Night colors via semantic CSS custom properties (`--bg`, `--surface`, `--text`, `--navy`, `--red`, `--gold`, `--border`) scoped to `[data-theme="day"]` and `[data-theme="night"]`, and toggle `<WrtcLogo />` variants via CSS rules so server-rendered HTML never causes hydration mismatches.
- **Typography:** Configure Google Fonts (`Barlow Condensed` 700/800 uppercase for `--font-display`, `Barlow` 400–700 for `--font-sans`, and `JetBrains Mono` 600/700 with `tabular-nums` for `--font-mono`).
- **Preserve Existing `docs/` Stakeholder Portal:** Keep the existing `/docs` directory intact so the live GitHub Pages Stakeholder Portal (`https://matejvida.github.io/HRS_WRTC_web/`) remains online while the Next.js application builds from `src/`, `public/`, `data/`, and `content/`.

## UX & Interaction Patterns

- **Sticky Header & Mobile Drawer:** Sticky top bar (`height: 76px`, backdrop blur) with `<WrtcLogo />` on the left, primary route links (`Competition`, `Selection Rules`, `Standings`, `Qualifying Events`, `Croatia & Slavonia`, `News`, `Sponsors`), the `Day | Night` theme switcher pill, and a mobile hamburger button (`< 920px`) opening an accessible vertical drawer (`aria-expanded`, `Escape` to close, `≥ 44×44px` tap targets).
- **Dynamic "Kockice & 9A Airwaves" Hero:** Royal Blue & Shack Navy gradient (`linear-gradient(135deg, #0D1333 0%, #1D2D73 60%, #273B8F 100%)`), right-side stepped `#ED1C24` red & translucent white Kockice Mosaic + Concentric `9A` Propagation Arcs SVG, and frosted Official Championship Brief (`9A · CROATIA`) card with `#ED1C24` top border and `<CheckerFive />` mark.

## Cross-Story Dependencies

- **Story 1.1 → Story 1.2 & 1.3:** Story 1.1 establishes the Next.js 15 App Router scaffold, fonts, zero-FOUC theme infrastructure, brand primitives (`<WrtcLogo />`, `<CheckerMark />`, `<CheckerFive />`, `<CheckerRibbon />`, `<KockiceCluster />`), sticky header/footer, and `Vitest` + `Playwright` test harnesses that Story 1.2 (Homepage, OC Roster, Past WRTCs) and Story 1.3 (News & RSS) build directly upon.
- **Epic 1 → Epics 2, 3, 4:** All downstream routes (`/competition/selection-rules/`, `/competition/qualifying-events/`, `/competition/standings/`, `/croatia-slavonia/`, `/sponsors/`, and `<WrtcAiAssistant />`) mount inside the root layout, navigation shell, and CI/CD pipeline created in Epic 1.
