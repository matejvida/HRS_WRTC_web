---
status: final
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
inputDocuments:
  - _bmad-output/planning-artifacts/prds/prd-HRS_web-2026-10-25/prd.md
  - _bmad-output/planning-artifacts/architecture/architecture-HRS_web-2026-10-25/ARCHITECTURE-SPINE.md
  - _bmad-output/planning-artifacts/ux-designs/ux-HRS_web-2026-10-25/DESIGN.md
  - _bmad-output/planning-artifacts/ux-designs/ux-HRS_web-2026-10-25/EXPERIENCE.md
  - _bmad-output/planning-artifacts/briefs/brief-HRS_web-2026-10-25/brief.md
  - _bmad-output/planning-artifacts/research/competitive-wrtc-2030-croatia-website-2026-10-25/research.md
---

# HRS_web (WRTC 2030 Croatia Official Web Platform) - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for **HRS_web (WRTC 2030 Croatia Official Web Platform — `wrtc2030.hr`)**, decomposing the requirements from the PRD (`FR-1` to `FR-14`, `NFR-1` to `NFR-3`), UX Design (`DESIGN.md` & `EXPERIENCE.md` — Proposal 1: Dynamic *"Kockice & 9A Airwaves"*), and Architecture Spine (`ARCHITECTURE-SPINE.md` — `AD-1` to `AD-8`) into implementable stories.

## Requirements Inventory

### Functional Requirements

- **FR-1 (Official WRTC 2030 Croatia SVG Logo & Dual-Theme Header):** Visitors can view the official WRTC 2030 Croatia SVG logo (`wrtc-logo.svg` in Day mode, `wrtc-logo-white.svg` in Night mode) in the sticky top header and footer, and toggle seamlessly between **Day** and **Night** themes (`data-theme="day"` | `"night"`), persisted in `localStorage` (`wrtc2030-theme`) with zero FOUC.
- **FR-2 (Architectural Placement of Croatian Checker Motifs — Proposal 1: Dynamic "Kockice & 9A Airwaves"):** The platform renders the Croatian red checker motif (`#ED1C24`) using reusable design-system primitives across designated architectural locations: `2×2` diagonal `.checker` kickers/breadcrumbs, `.checker-five` (5-square stepped pattern matching `wrtc-logo.svg`), `.checker-ribbon` (`12px` full-width alternating checkerboard dividers), and the kinetic **Hero Kockice Mosaic + 9A Propagation Arcs** (`.p1-kockice-mosaic`).
- **FR-3 (Qualifying Area Filter, Callsign Search & Allocation Cutoff Line):** Visitors can filter the **Qualification Standings** table by any of the 29 **Qualifying Areas** (or Global All-QA view), filter by **Sub-Area** where applicable (Table 4), and search instantaneously (`< 50ms`) by operator callsign or name, dynamically rendering the **Allocation Cutoff Line** (`Top N Qualify`) per QA quota (Table 3) and syncing state to URL query parameters (`?qa=EU-3&call=9A5W`).
- **FR-4 (Operator Score Breakdown Drawer & Pre-Season Interactive Score Simulator):** Visitors can click or tap any operator row in the **Qualification Standings** table to open an **Operator Breakdown Drawer** showing each contest counted toward their **Qualification Score** (up to 12 best events, mode, category `Single-Op` vs `Multi-Op`, raw points, Table 2 weighting factor, and normalized points), or toggle the **Pre-Season Interactive Score Simulator** (seeded with the official Selection Rules v1.0 Score Calculation Examples) and **29-QA Quota Overview** before Event #1 results are published.
- **FR-5 (Selection Rules v1.0, Q&A, Score Examples & Official PDF Downloads):** Visitors can read the complete **Selection Rules v1.0**, **Questions & Answers**, and **Score Calculation Examples** on `/competition/selection-rules/` with a sticky collapsible Table of Contents (`Sections 1–11`), responsive monospace-aligned data tables (`Tables 1–7`), and direct downloads for the 3 official PDFs (`wrtc-2030-selection-rules-v1.0.pdf`, `wrtc-2030-selection-rules-qa-v1.0.pdf`, `wrtc-2030-score-calculation-examples.pdf`).
- **FR-6 (Interactive 24-Contest Qualifying Events Timeline):** Visitors can browse all 24 **Qualifying Events** (from `#1 9A DX Contest` on Dec 19–20, 2026 through `#24 CQ WW DX CW` in Nov 2028) on `/competition/qualifying-events/`, filtered by status (`Upcoming`, `Completed`), mode (`CW`, `SSB`, `Mixed`), and Table 2 weighting factor, with automatic highlighting of the **Next Qualifying Event** in the homepage ticker.
- **FR-7 (Slavonia Propagation & 60-Field-Station Technical Overview):** Visitors can explore the technical profile of the Slavonian competition zone (Osijek, Čepin, Đakovo) and the standardized 60-station field configuration (`2 operators`, `24h`, identical antennas, 0° Pannonian plain horizon take-off, and propagation paths to EU, NA, and JA) on `/croatia-slavonia/`.
- **FR-8 (Host Cities, Accommodation, Gastronomy & International Travel Guide):** Visitors and families can browse curated guides for **Osijek** (Tvrđa baroque fortress, Drava riverfront, hotels), **Đakovo** (St. Peter's Cathedral, State Lipizzaner Stud Farm), **Čepin**, **Kopački Rit Nature Park**, traditional Slavonian food & wine (*kulen*, *fiš paprikaš*, *čobanac*, Graševina wineries), and international arrival routes (`ZAG`, `OSI`, `BUD`, `BEG` airports and A3/A5 highways).
- **FR-9 (Structured News & Announcements Feed):** Visitors can read chronological announcements from the `WRTC OC` on the homepage and `/news/` (`/news/[slug]/`), filter by category (`Official Rules`, `Standings Update`, `Organization`, `Venue`), and subscribe via RSS (`/feed.xml`).
- **FR-10 (Clean Sponsors, Partners & Institutional Recognition):** Visitors can view official, dignified static tier recognition on `/sponsors/` and the homepage (`HRS` Institutional Host, Commercial Partners, Club & DX Foundations, Individual Donors, and the informational note on Rule 8.D Sponsored Teams opening after 1 Jan 2029) and initiate a partnership inquiry via `wrtc2030@hamradio.hr` — with **no** interactive tent-picking grid and **no** crowdfunding/bidding widgets.
- **FR-11 (Organizing Committee Roster & Past WRTC History 1990–2026):** Visitors can view all 11 **Organizing Committee** members (`9A4M` Mate Botica, `9A1UN` Davor Kucelin, `9A5W` Nikola Perčin, `9A3A` Ivo Pezer, `9A2G` Zlatko Tonković, `9A5X` Darko Martinčević, `9A5R` Željko Dražić Karalić, `9A6KX` Mirko Jurman, `9A3XV` Aleksandar Jugović, `YU1LA` Ivan Mastilović, `9A6PAX` Marija Sorić) and all 9 historical WRTC editions (`1990 Seattle` – `2026 UK`).
- **FR-12 (Validated Standings Snapshot Ingestion Pipeline):** `WRTC OC` administrators can publish a new **Standings Snapshot** by committing/importing a CSV or JSON file (`scripts/import-standings.ts` → `data/standings/latest.json`) validated at build time via `Zod` against all 29 QAs, 24 event IDs, and max-12-events rules.
- **FR-13 (Grounded AI Assistant for Website Content, Rules & Croatia/Slavonia Tourism):** Visitors can open an accessible floating **AI Assistant** widget on any page to ask questions about WRTC 2030 Croatia rules/content (Selection Rules v1.0, Q&A, Score Calculation Examples, 24 Qualifying Events, 29 QA quotas) and about Croatia & Slavonia tourism, accommodations, food (*kulen*, *fiš paprikaš*, *čobanac*), and travel logistics, powered by `/api/chat` and a structured local knowledge bundle.
- **FR-14 (Automated GitHub → Netlify CI/CD Deployment Pipeline):** Repository includes `netlify.toml` (`@netlify/plugin-nextjs`) and GitHub Actions workflow (`.github/workflows/ci-netlify.yml`) running TypeScript type-checking, `Zod` data validation, Vitest unit tests, and automated Netlify Preview & Production deployments.

### NonFunctional Requirements

- **NFR-1 (Performance & Static Edge Delivery):** All content routes compile as static pages (`SSG`, `export const dynamic = 'error'`) so initial HTML loads in `< 200ms` TTFB from CDN edge nodes, and client-side standings filtering across 3,500+ callsigns completes in `< 50ms` with Lighthouse Performance & Accessibility scores `>= 95`.
- **NFR-2 (Accessibility & Monospace Telemetry Legibility):** Both **Day** (`#FFFFFF` / `#14142B`) and **Night** (`#0D1333` / `#FFFFFF`) themes must meet **WCAG 2.1 AA** contrast ratios. All callsigns, QA codes, contest scores, and formulas must render in `JetBrains Mono` with `font-variant-numeric: tabular-nums` so `0` and `O` are unmistakably distinct.
- **NFR-3 (Privacy & Zero-Cookie Compliance):** Public browsing, standings filtering, AI assistant sessions, and theme persistence (`localStorage`) operate with zero third-party tracking cookies, requiring no intrusive GDPR cookie banner.

### Additional Requirements

- **Starter / Stack Seed (`ARCHITECTURE-SPINE.md`):** Greenfield **Next.js 15.2.x (App Router)** + **React 19** + **TypeScript 5.7.x** + **Tailwind CSS 4.0.x** + **Radix UI / shadcn/ui** + **Zod 3.24.x** + **next-mdx-remote 5.0.x** + **@netlify/plugin-nextjs 5.10.x** + **Vitest & Playwright**.
- **AD-1 & AD-2 (Official Brand Assets, Checker Primitives & Zero-FOUC Theme):** Copy official `wrtc-logo.svg`, `wrtc-logo-white.svg`, and the 3 official Selection Rules v1.0 PDFs into `public/brand/` and `public/files/`; implement `<WrtcLogo />`, `<CheckerMark />`, `<CheckerFive />`, `<CheckerRibbon />`, `<KockiceHeroBackdrop />`, and synchronous inline theme initialization in `src/app/layout.tsx`.
- **AD-3, AD-4 & AD-5 (Single-Source Rules & Standings Schemas):** Canonical JSON datasets in `data/rules/` (`qualifying-events.json`, `weighting-factors.json`, `qualifying-areas.json`, `special-teams.json`) shared between `/competition/selection-rules/`, `/competition/standings/`, and `/competition/qualifying-events/`, validated at build time via `Zod`.
- **AD-6 (Strictly Non-Transactional Sponsorship):** Static Server Components driven by `data/sponsors.json` with `mailto:wrtc2030@hamradio.hr` CTAs; zero payment/crowdfunding/tent-picking code.
- **AD-7 (Grounded Serverless AI Concierge):** `/api/chat` Route Handler (Netlify Serverless Function) backed by `data/knowledge/wrtc2030-and-slavonia-kb.json` with server-side LLM API key support and deterministic local retrieval fallback.
- **AD-8 (GitHub → Netlify CI/CD Topology):** `netlify.toml` + `.github/workflows/ci-netlify.yml` gating every push/PR on schema validation, typecheck, tests, and build.

### UX Design Requirements

- **UX-DR1 (Proposal 1 "Dynamic Kockice & 9A Airwaves" Hero & Visual Tokens):** Implement the Royal Blue & Shack Navy broadcast hero (`linear-gradient(135deg, #0D1333 0%, #1D2D73 60%, #273B8F 100%)`), the right-side stepped `#ED1C24` red & translucent white **Kockice Mosaic + Concentric 9A Propagation Arcs SVG** (`.p1-kockice-mosaic`), and the frosted **Official Championship Brief (`9A · CROATIA`)** passport card with `#ED1C24` top border and `.checker-five` mark.
- **UX-DR2 (Reusable Croatian Checker Design System Components):** Implement 4 dedicated brand primitives: `<CheckerMark size="sm|md|lg" />`, `<CheckerFive />`, `<CheckerRibbon />`, and `<KockiceCluster />`.
- **UX-DR3 (Typography & Tabular Callsign System):** Configure Google Fonts (`Barlow Condensed` 700/800 uppercase, `Barlow` 400–700, `JetBrains Mono` 600/700 with `tabular-nums`).
- **UX-DR4 (Interactive Standings Explorer, Score Simulator & Breakdown Drawer):** Build `<StandingsExplorer />` with QA pills, Sub-Area dropdown, instant callsign search, visual `#ED1C24` **Allocation Cutoff Row**, **Pre-Season Score Simulator Toggle**, and accessible `<OperatorBreakdownDrawer />`.
- **UX-DR5 (Selection Rules v1.0 Sticky Split Layout):** Build `<SelectionRulesTabs />` with `280px` sticky left sidebar (3 tabs, collapsible numbered TOC `Sections 1–11`, PDF download card) and `<RulesTables />` (`Tables 1–7`).
- **UX-DR6 (Responsive Slavonia Tourism/Gastronomy Showcase, Clean Static Sponsor Grid & Floating AI Concierge Drawer):** Build the `/croatia-slavonia/` propagation + Osijek/Đakovo/Čepin/Kopački Rit accommodation & food cards, `/sponsors/` static tier grid, and the `<WrtcAiAssistant />` floating chat widget with quick-prompt chips (*"How are Multi-Op scores weighted?"*, *"Where to stay and eat in Osijek & Đakovo?"*, *"When is the 9A DX Contest?"*).

### FR Coverage Map

- **FR-1:** Epic 1 — Official WRTC 2030 Croatia SVG Logo (`wrtc-logo.svg` / `wrtc-logo-white.svg`) & Zero-FOUC Day | Night Theme Switcher
- **FR-2:** Epic 1 — Architectural Placement of Croatian Checker Motifs (Proposal 1: *"Dynamic Kockice & 9A Airwaves"* Hero Mosaic, `.checker`, `.checker-five`, `.checker-ribbon`)
- **FR-3:** Epic 3 — Qualifying Area (29 QAs) & Sub-Area Filter, Instant Callsign Search (`< 50ms`), and Visual Allocation Cutoff Line
- **FR-4:** Epic 3 — Operator Score Breakdown Drawer (Top 12 Contests Math) & Pre-Season Interactive Score Simulator
- **FR-5:** Epic 2 — Selection Rules v1.0, Questions & Answers, Score Calculation Examples (`Sections 1–11`, `Tables 1–7`) & 3 Official PDF Downloads
- **FR-6:** Epic 2 — Interactive 24-Contest Qualifying Events Calendar (`Dec 2026 – Nov 2028`) & Next Event Countdown Ticker
- **FR-7:** Epic 4 — Slavonia Pannonian Propagation Arena (`0°` Horizon Take-Off) & 60-Field-Station Technical Overview
- **FR-8:** Epic 4 — Host Cities (`Osijek · Čepin · Đakovo`), Accommodation, Slavonian Gastronomy & International Travel Guide
- **FR-9:** Epic 1 — Structured News & Official Announcements Feed (`/news/`, `/news/[slug]/`, and `/feed.xml` RSS)
- **FR-10:** Epic 4 — Clean, Dignified Static Sponsors & Partners Recognition (`/sponsors/` & `wrtc2030@hamradio.hr` CTA)
- **FR-11:** Epic 1 — Organizing Committee Roster (`11 members`) & Past WRTC History Archive (`1990–2026`)
- **FR-12:** Epic 3 — Validated Standings Snapshot CSV/JSON Ingestion Pipeline (`scripts/import-standings.ts` + build-time `Zod` schema validation)
- **FR-13:** Epic 4 — Grounded AI Assistant for Website/Rules Content & Croatia/Slavonia Tourism, Accommodation & Food (`/api/chat` + `<WrtcAiAssistant />`)
- **FR-14:** Epic 1 — Automated GitHub → Netlify CI/CD Deployment Pipeline (`netlify.toml` + `.github/workflows/ci-netlify.yml`)

## Epic List

### Epic 1: Next.js Foundation, GitHub → Netlify Pipeline, "Kockice & 9A Airwaves" Homepage, News & Committee Hub
Visitors immediately experience the upgraded WRTC 2030 Croatia official web platform deployed via an automated GitHub → Netlify CI/CD pipeline (`FR-14`), featuring the authentic `wrtc2030.hr` SVG logos (`FR-1`), zero-flash Day | Night theme switcher, Proposal 1 *"Dynamic Kockice & 9A Airwaves"* hero and checker design system (`FR-2`), chronological News & Announcements feed with RSS (`FR-9`), the 11-member Organizing Committee roster, and the 1990–2026 Past WRTC archive (`FR-11`).
**FRs covered:** `FR-1`, `FR-2`, `FR-9`, `FR-11`, `FR-14` (`+ NFR-1, NFR-2, NFR-3, AD-1, AD-2, AD-8, UX-DR1, UX-DR2, UX-DR3`)

### Epic 2: Selection Rules v1.0 Hub & 24-Contest Qualifying Calendar
Contesters and team leader applicants can study the complete Selection Rules v1.0, Questions & Answers, and Score Calculation Examples via a sticky scroll-spy sidebar (`Sections 1–11`, `Tables 1–7`), download the 3 official PDF documents (`FR-5`), and filter the interactive 24-Contest Qualifying Events Calendar (`Dec 2026 – Nov 2028`, starting with the `9A DX Contest`, `FR-6`), backed by canonical `Zod`-validated JSON datasets (`AD-5`).
**FRs covered:** `FR-5`, `FR-6` (`+ AD-5, UX-DR5`)

### Epic 3: Interactive Qualification Standings Engine, Score Simulator & Validated Ingestion
Contesters worldwide can track Qualification Standings across all 29 Qualifying Areas, Sub-Areas, and Youth, search instantaneously by callsign (`< 50ms`), see the exact qualification cutoff line for their region (`FR-3`), inspect any operator's 12-contest score breakdown drawer or test-drive the **Pre-Season Interactive Score Simulator** seeded with official Selection Rules v1.0 examples (`FR-4`), and the WRTC OC IT/Scoring lead (`9A3XV`) can publish updated standings snapshots via a build-time `Zod`-validated CSV/JSON pipeline (`FR-12`).
**FRs covered:** `FR-3`, `FR-4`, `FR-12` (`+ AD-3, AD-4, AD-5, UX-DR4`)

### Epic 4: Croatia & Slavonia Tourism/Venue Showcase, Clean Sponsors Hub & Grounded AI Concierge
International competitors, referees, visiting families, and sponsors can explore Slavonia's 60-station propagation arena (`FR-7`), browse curated guides for Osijek, Đakovo, Čepin, and Kopački Rit including hotels/accommodations, traditional Slavonian food & wine, and travel logistics (`FR-8`), view clean static Sponsor & Partner tiers (`FR-10`), and ask any question to the on-page **WRTC 2030 & Slavonia AI Assistant** (`FR-13`).
**FRs covered:** `FR-7`, `FR-8`, `FR-10`, `FR-13` (`+ AD-6, AD-7, UX-DR6`)

---

## Epic 1: Next.js Foundation, GitHub → Netlify Pipeline, "Kockice & 9A Airwaves" Homepage, News & Committee Hub

Establish the Next.js 15 App Router project, automated GitHub → Netlify CI/CD pipeline, Proposal 1 (*"Dynamic Kockice & 9A Airwaves"*) brand design system, full Homepage (`/`), News & Announcements engine (`/news/` & `/feed.xml`), Organizing Committee roster (`11 members`), and Past WRTC archive (`1990–2026`).

### Story 1.1: Project Scaffold, Official Brand Assets, Zero-FOUC Theme & GitHub → Netlify Pipeline

As a WRTC Organizing Committee maintainer and visitor,
I want the Next.js 15 App Router platform initialized with the official `wrtc2030.hr` SVG logos, Proposal 1 Croatian checker primitives, zero-flash Day/Night theme switcher, and automated GitHub → Netlify CI/CD configuration,
So that every commit is automatically validated and deployed to Netlify with authentic Croatian brand fidelity.

**Acceptance Criteria:**

**Given** the repository root
**When** the Next.js 15.2 (App Router) + TypeScript 5.7 + Tailwind CSS 4 project is initialized
**Then** the official `wrtc-logo.svg` (Day) and `wrtc-logo-white.svg` (Night) and the 3 official Selection Rules PDFs are present in `public/brand/` and `public/files/` (`FR-1`, `AD-1`)
**And** `src/app/layout.tsx` configures `Barlow Condensed`, `Barlow`, and `JetBrains Mono` (`tabular-nums`) alongside a synchronous inline `<script>` that sets `data-theme="day" | "night"` on `<html>` from `localStorage('wrtc2030-theme')` or `prefers-color-scheme` with zero FOUC (`AD-2`, `NFR-2`, `UX-DR3`)
**And** reusable components `<WrtcLogo />`, `<CheckerMark />` (`2×2` diagonal red squares), `<CheckerFive />` (`5-square` logo flank motif), `<CheckerRibbon />` (`12px` full-width alternating checkerboard divider), and `<KockiceCluster />` (`4×4` corner stamp) render with `#273B8F` Royal Blue, `#ED1C24` Checker Red, and `#0D1333` Shack Navy tokens (`FR-2`, `UX-DR2`)
**And** the sticky header provides a mobile-first collapsible Hamburger Navigation Drawer (`< 920px`) with `≥ 44×44px` touch targets and zero horizontal overflow down to `320px` smartphone viewports (`NFR-2`, `UX-DR3`)
**And** `netlify.toml` (with `@netlify/plugin-nextjs`) and `.github/workflows/ci-netlify.yml` are configured to run `typecheck`, `test`, and `next build` on every GitHub push/PR (`FR-14`, `AD-8`).

### Story 1.2: "Dynamic Kockice & 9A Airwaves" Homepage, OC Roster & Past WRTCs (1990–2026)

As an international radio contester or visitor landing on `wrtc2030.hr`,
I want to experience the Proposal 1 *"Dynamic Kockice & 9A Airwaves"* Hero, Live Event #1 Countdown Ticker (`9A DX Contest`), Poreč Host Announcement, About WRTC summary, Slavonia teaser, 11-member Organizing Committee roster, and 1990–2026 Past WRTC archive,
So that I immediately understand the prestige, dates, rules status, and leadership of WRTC 2030 Croatia.

**Acceptance Criteria:**

**Given** a visitor opens `/` in either Day or Night mode
**When** the homepage renders
**Then** the Hero displays the Royal Blue & Shack Navy gradient backdrop with the stepped `#ED1C24` red & white **Kockice Mosaic + Concentric 9A Propagation Arcs SVG**, the headline *"THE OLYMPICS OF AMATEUR RADIO ARRIVES IN CROATIA"*, and the frosted **Official Championship Brief (`9A · CROATIA`)** card with `#ED1C24` top border and `.checker-five` mark (`FR-2`, `UX-DR1`)
**And** the live ticker bar highlights Qualifying Event #1 (`9A DX Contest — Dec 19–20, 2026 UTC`) (`FR-6`)
**And** all 11 Organizing Committee members (`9A4M` Mate Botica, `9A1UN` Davor Kucelin, `9A5W` Nikola Perčin, `9A3A` Ivo Pezer, `9A2G` Zlatko Tonković, `9A5X` Darko Martinčević, `9A5R` Željko Dražić Karalić, `9A6KX` Mirko Jurman, `9A3XV` Aleksandar Jugović, `YU1LA` Ivan Mastilović, `9A6PAX` Marija Sorić) and all 9 historical WRTC editions (`1990 Seattle` through `2026 UK`) render from structured JSON (`data/committee.json`, `data/past-events.json`) with `JetBrains Mono` callsign badges (`FR-11`).

### Story 1.3: Structured News & Official Announcements Feed (`/news/`, `/news/[slug]/` & `/feed.xml`)

As a contester or media follower,
I want to browse chronological announcements from the WRTC OC on the homepage ribbon and `/news/`, filter by category, read full articles at `/news/[slug]/`, and subscribe via `/feed.xml` RSS,
So that I never miss an official rules update or standings release.

**Acceptance Criteria:**

**Given** MDX news articles in `content/news/` (seeded with the Oct 3, 2026 Poreč Host Award, Oct 16, 2026 Deferral Notice, and Oct 19, 2026 Selection Rules v1.0 Approval)
**When** a visitor views the homepage news ribbon or navigates to `/news/`
**Then** articles are listed newest-first with `.checker` kickers, category badges (`Official Rules`, `Standings Update`, `Organization`, `Venue`), and permalink routes (`/news/[slug]/`) pre-rendered statically (`FR-9`, `NFR-1`)
**And** requesting `/feed.xml` returns a valid RSS 2.0 XML feed of all published announcements (`FR-9`).

---

## Epic 2: Selection Rules v1.0 Hub & 24-Contest Qualifying Calendar

Deliver the canonical machine-readable rules datasets (`Tables 1–7`), the complete 3-tab Selection Rules v1.0 documentation hub (`/competition/selection-rules/`), the 3 official PDF downloads, and the interactive 24-Contest Qualifying Events Calendar (`/competition/qualifying-events/`).

### Story 2.1: Canonical Rules Datasets (`Tables 1–7`) & Build-Time Zod Validation

As a developer and WRTC OC rules maintainer,
I want the 24 Qualifying Events (`Table 1`), Weighting Factors (`Table 2`), 29 Qualifying Areas & 50 Team Quotas (`Table 3`), Sub-Areas (`Table 4`), Category Order (`Table 5`), QA Changes (`Table 6`), and 10 Special Teams (`Table 7`) stored in single-source JSON files validated by `Zod`,
So that the Selection Rules page, Qualifying Calendar, Standings Engine, and AI Assistant all read from one guaranteed-accurate source of truth.

**Acceptance Criteria:**

**Given** JSON files in `data/rules/` (`qualifying-events.json`, `weighting-factors.json`, `qualifying-areas.json`, `special-teams.json`)
**When** `npm run validate:data` or `next build` runs
**Then** `src/lib/schemas/rules.schema.ts` validates that all 24 events (`#1 9A DX Contest` Dec 2026 to `#24 CQ WW DX CW` Nov 2028), all 29 QAs summing to 50 Qualifying Teams (`EU #1–#9` = 23, `NA #1–#11` = 16, `AS #1–#4` = 5, `AF #1` = 2, `SA #1–#2` = 2, `OC #1–#2` = 2), and 10 Special Teams (`Youth` 3, `Sponsored` 4, `Wild Card` 2, `Defending Champion` 1) match Selection Rules v1.0 verbatim (`FR-5`, `FR-6`, `AD-5`).

### Story 2.2: Selection Rules v1.0 3-Tab Hub, Sticky Scroll-Spy TOC & Official PDF Downloads (`/competition/selection-rules/`)

As a competitive contester preparing for qualification,
I want to read the complete Selection Rules v1.0, Questions & Answers, and Score Calculation Examples on `/competition/selection-rules/` with a sticky collapsible Table of Contents (`Sections 1–11`), monospace-aligned `Tables 1–7`, and one-click downloads for all 3 official PDFs,
So that I can verify any rule or scoring formula on desktop or mobile in seconds.

**Acceptance Criteria:**

**Given** a visitor navigates to `/competition/selection-rules/`
**When** they switch between the 3 tabs (`Selection Rules`, `Questions & Answers`, `Score Calculation Examples`) or click a section in the `280px` sticky left TOC (`Sections 1–11`)
**Then** the active tab and TOC section highlight with a `.checker` mark, the URL query param (`?tab=rules|qa|examples`) updates cleanly, and all 11 sections and `Tables 1–7` render with `JetBrains Mono` `tabular-nums` alignment (`FR-5`, `UX-DR5`, `NFR-2`)
**And** the sidebar download card provides direct links to `wrtc-2030-selection-rules-v1.0.pdf`, `wrtc-2030-selection-rules-qa-v1.0.pdf`, and `wrtc-2030-score-calculation-examples.pdf` (`FR-5`).

### Story 2.3: Interactive 24-Contest Qualifying Events Calendar (`/competition/qualifying-events/`)

As a contester planning my 2026–2028 operating schedule,
I want to browse all 24 Qualifying Events on `/competition/qualifying-events/` and filter them by status (`Upcoming` vs `Completed`), mode (`CW`, `SSB`, `Mixed`), and Table 2 weighting factor,
So that I know exactly which contests count toward WRTC 2030 qualification and when the next event takes place.

**Acceptance Criteria:**

**Given** the 24 Qualifying Events in `data/rules/qualifying-events.json`
**When** a visitor views `/competition/qualifying-events/`
**Then** the next upcoming event (`#1 9A DX Contest — Dec 19–20, 2026 UTC`) is pinned at the top with a live countdown badge and `.checker` mark (`FR-6`)
**And** filtering by mode (`All`, `CW`, `SSB`, `Mixed`) or weighting factor updates the 24-contest timeline instantaneously and displays each contest's Single-Op and Multi-Op weighting multipliers from Table 2 (`FR-6`).

---

## Epic 3: Interactive Qualification Standings Engine, Score Simulator & Validated Ingestion

Build the flagship `/competition/standings/` interactive leaderboard across all 29 Qualifying Areas, the Pre-Season Interactive Score Simulator (seeded with official Selection Rules v1.0 examples), the Operator Score Breakdown Drawer, and the `Zod`-validated CSV/JSON standings ingestion CLI.

### Story 3.1: Standings Snapshot Schema, CSV/JSON Importer CLI & Pre-Season Simulation Seed

As the WRTC OC IT & Scoring Lead (`9A3XV`),
I want a validated CLI importer (`scripts/import-standings.ts`) that converts CSV or JSON standings exports into `data/standings/latest.json` verified by `Zod`, along with a pre-seeded `data/standings/example-simulation.json` built from the official Selection Rules v1.0 Score Calculation Examples,
So that publishing standings after each of the 24 contests takes one command and broken data can never pass CI, while contesters can test-drive the standings engine before December 2026.

**Acceptance Criteria:**

**Given** a CSV or JSON standings file exported from the scoring software
**When** `npm run import:standings -- <file>` or `npm run validate:data` executes
**Then** `StandingsSnapshotSchema` (`src/lib/schemas/standings.schema.ts`) verifies valid QA codes (`EU #1`..`OC #2`, `YOUTH`), valid event IDs (`1..24`), max 10 counted events per QA applicant (max 3 Multi-Op, max 3 Out-of-QA per Selection Rules v1.0; or max 6 for Youth), and monotonic rank ordering (`FR-12`, `AD-3`)
**And** `data/standings/example-simulation.json` is pre-populated and validated using the official Score Calculation Examples so `/competition/standings/` has rich, realistic simulation data from Day 1 (`FR-4`).

### Story 3.2: Interactive 29-QA Standings Explorer, Callsign Search & Cutoff Line (`/competition/standings/`)

As a contester or fan visiting `/competition/standings/`,
I want to filter standings by macro-region (`EU`, `NA`, `AS`, `AF`, `SA`, `OC`, `Youth`, `All`), specific Qualifying Area (`29 QAs`) or Sub-Area, and search by callsign in `< 50ms`, while seeing the exact **Allocation Cutoff Line** (`Top N Qualify`) for the selected QA,
So that I can immediately see who is currently inside the qualification quota.

**Acceptance Criteria:**

**Given** `/competition/standings/` is opened
**When** a visitor selects a Qualifying Area (e.g., `EU #6` or `NA #1`) or types a callsign prefix (`9A`, `DL`, `K3`)
**Then** the table filters in `< 50ms` client-side, synchronizes state to URL query parameters (`?qa=EU-6&call=9A`), and renders a dashed/solid `#ED1C24` red **Allocation Cutoff Row** (`Top N Automatic Team Leader Qualification Cutoff`) immediately below Rank $N$ matching Table 3's quota for that QA (`FR-3`, `AD-4`, `UX-DR4`, `NFR-1`).

### Story 3.3: Operator Score Breakdown Drawer & Pre-Season Interactive Simulator Toggle

As a contester inspecting the standings table,
I want to click any operator row to open an accessible **Operator Score Breakdown Drawer** showing each contest counted toward their score (or toggle between the **29-QA Quota Overview** and the **Official Score Calculation Example Simulator** before Event #1 is adjudicated),
So that I can audit every point, weighting factor, and Single-Op/Multi-Op rule in detail.

**Acceptance Criteria:**

**Given** a visitor is viewing `/competition/standings/`
**When** they click or press `Enter` on an operator row
**Then** `<OperatorBreakdownDrawer />` slides open (with keyboard focus trap and `Escape` to close), displaying the operator's callsign, QA, total Qualification Score, and a per-contest breakdown table (`Event #`, Contest Name, Mode, Category `Single-Op`/`Multi-Op`, In/Out of QA flag, Weighting Factor, and Points) plus any dropped lower-scoring events (`FR-4`, `UX-DR4`, `NFR-2`)
**And** when in Pre-Season mode (prior to Event #1 results), a prominent banner allows visitors to toggle between the **29-QA Team Allocation Map** and the **Interactive Score Calculation Example Simulator** (`FR-4`).

---

## Epic 4: Croatia & Slavonia Tourism/Venue Showcase, Clean Sponsors Hub & Grounded AI Concierge

Showcase Croatia and the Slavonian competition region (`/croatia-slavonia/` covering propagation, Osijek, Đakovo, Čepin, Kopački Rit, accommodations, and local gastronomy), deliver the clean static Sponsors & Partners page (`/sponsors/`), and embed the grounded **WRTC 2030 & Slavonia AI Assistant** (`FR-13`).

### Story 4.1: Croatia & Slavonia Propagation Arena, Accommodation, Gastronomy & Travel Guide (`/croatia-slavonia/`)

As an international competitor, referee, or visiting family member,
I want to explore `/croatia-slavonia/` to learn why the flat Pannonian plain (`Osijek, Čepin, Đakovo`) is a premier 60-station propagation arena and discover where to stay, what traditional Slavonian food to try, what cultural landmarks to visit, and how to travel there,
So that I can plan my trip to Croatia for July 2030.

**Acceptance Criteria:**

**Given** a visitor navigates to `/croatia-slavonia/`
**When** the page renders
**Then** it displays the **Pannonian Propagation Arena** technical overview (`0°` horizon take-off, `85m–110m ASL` elevation profile, 60 identical field stations) framed with `.checker-five` and `.kockice-cluster` marks (`FR-7`, `UX-DR6`)
**And** it renders dedicated regional cards for **Osijek** (Tvrđa baroque fortress, Drava promenade, hotel & accommodation zones), **Đakovo** (St. Peter's Cathedral, State Lipizzaner Stud Farm), **Čepin** (field station plains), **Kopački Rit Nature Park**, **Slavonian Gastronomy & Wine** (*slavonski kulen*, *fiš paprikaš*, *čobanac*, Graševina wine routes), and **International Arrival Corridors** (`ZAG`, `OSI`, `BUD`, `BEG` airports and A3/A5 highways) (`FR-8`, `UX-DR6`).

### Story 4.2: Clean, Dignified Static Sponsors & Partners Hub (`/sponsors/`)

As a corporate equipment manufacturer, radio club, or prospective partner,
I want to view official Sponsor & Partner tiers on `/sponsors/` and contact the WRTC OC directly via `wrtc2030@hamradio.hr`,
So that our support for WRTC 2030 Croatia is recognized professionally without any crowdfunding or tent-picking gimmicks.

**Acceptance Criteria:**

**Given** `data/sponsors.json`
**When** a visitor opens `/sponsors/` (or views the homepage sponsor strip)
**Then** the page renders clean, non-interactive recognition tiers for **Institutional Host (`HRS — hamradio.hr`)**, **Commercial & Equipment Partners**, **Club & DX Foundations**, **Individual Donors**, and an informational card noting that the **Rule 8.D Sponsored Team (4 teams)** application process opens after **1 January 2029**, paired with a `mailto:wrtc2030@hamradio.hr` partnership inquiry CTA (`FR-10`, `AD-6`, `UX-DR6`)
**And** the page contains zero interactive tent-picking grids, zero crowdfunding progress bars, and zero payment/bidding widgets (`FR-10`, `AD-6`).

### Story 4.3: Grounded WRTC 2030 & Croatia/Slavonia AI Assistant (`/api/chat` + `<WrtcAiAssistant />`)

As a contester or visitor browsing `wrtc2030.hr`,
I want to open an on-page **AI Assistant** to ask questions about website content and Selection Rules v1.0, as well as tourism, accommodations, local food, and travel in Croatia and Slavonia (`Osijek, Čepin, Đakovo`),
So that I get instant, accurate, cited answers without searching through PDFs or external travel sites.

**Acceptance Criteria:**

**Given** a build-time knowledge bundle (`data/knowledge/wrtc2030-and-slavonia-kb.json`) compiled from Selection Rules v1.0, Q&A, Score Examples, the 24 Qualifying Events, the 29 QA quotas, and the Croatia & Slavonia accommodation/gastronomy/tourism guide
**When** a visitor clicks the floating **"Ask 9A · WRTC & Croatia AI"** button on any page and submits a question (or clicks a starter chip such as *"How are Multi-Op scores weighted?"*, *"Where to stay and eat in Osijek & Đakovo?"*, or *"How do I travel to Slavonia?"*)
**Then** `src/app/api/chat/route.ts` (deployed as a Netlify Serverless Function) returns a grounded answer that cites the exact rule section/table for competition questions or provides specific Slavonia/Croatia hotel, food (*kulen*, *fiš paprikaš*, *čobanac*), and travel recommendations (`FR-13`, `AD-7`, `UX-DR6`)
**And** when `GEMINI_API_KEY` / `OPENAI_API_KEY` is configured in Netlify, it uses the LLM with strict system-prompt guardrails against off-topic queries; when unset in local/CI environments, it deterministically answers from the local knowledge retriever so automated tests pass 100% of the time (`AD-7`, `NFR-3`).
