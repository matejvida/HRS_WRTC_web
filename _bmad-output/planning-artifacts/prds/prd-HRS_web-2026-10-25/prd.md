---
title: WRTC 2030 Croatia Official Web Platform
status: final
created: 2026-10-25
updated: 2026-10-25
sources:
  - _bmad-output/planning-artifacts/research/competitive-wrtc-2030-croatia-website-2026-10-25/research.md
  - _bmad-output/planning-artifacts/briefs/brief-HRS_web-2026-10-25/brief.md
  - _bmad-output/planning-artifacts/ux-designs/ux-HRS_web-2026-10-25/DESIGN.md
  - _bmad-output/planning-artifacts/ux-designs/ux-HRS_web-2026-10-25/EXPERIENCE.md
---

# PRD: WRTC 2030 Croatia Official Web Platform

## 0. Document Purpose
This PRD defines the functional requirements, scope boundaries, user journeys, and success metrics for the **WRTC 2030 Croatia Official Web Platform** (`wrtc2030.hr`), hosted by the **Croatian Amateur Radio Association (HRS — Hrvatski radioamaterski savez)**. It is written for the Organizing Committee (`WRTC OC`), product stakeholders, and downstream architecture (`bmad-architecture`), epic/story planning (`bmad-create-epics-and-stories`), and development (`bmad-build`) workflows. It directly builds upon our completed Deep Recon report (`research.md`), Product Brief (`brief.md`), and UX Design & Experience specifications (`DESIGN.md` and `EXPERIENCE.md`).

---

## 1. Vision
The **World Radiosport Team Championship (WRTC) 2030** brings the "Olympics of Amateur Radio" to the flatlands of **Slavonia, Croatia (Osijek, Čepin, and Đakovo)** in July 2030. Following the WRTC Sanctioning Committee's official selection of Croatia on October 3, 2026 at the HRS convention in Poreč, and the approval of Selection Rules v1.0 on October 19, 2026, the global contesting community turns its attention to the 24-event, 2-year qualification cycle launching December 19–20, 2026 with the **9A DX Contest**.

The existing fast preview at `wrtc2030.hr` established an outstanding visual and typographic foundation — anchored by the official WRTC 2030 Croatia SVG logo (`wrtc-logo.svg` / `wrtc-logo-white.svg`), the diagonal Croatian red checker motif (`.checker` / `#ED1C24`), `Barlow Condensed` + `Barlow` + `JetBrains Mono` typography, and a clean **Day | Night** (`data-theme="day"` / `"night"`) mode switcher. However, as a 2-page static brochure, it lacks the dynamic operational engines required for a 4-year championship lifecycle.

This platform evolves `wrtc2030.hr` into a complete, world-class championship portal — matching the functional rigor of the `wrtc2026.org` UK benchmark (interactive **Qualification Standings** across all 29 Qualifying Areas, 24-contest **Qualifying Events** calendar, structured **News & Announcements**, and **Sponsors & Partners** recognition) while preserving the authentic `wrtc2030.hr` brand identity, elevating the **Slavonian host region**, and weaves the iconic red checker pattern into refined architectural placements across every page.

---

## 2. Target User

### 2.1 Jobs To Be Done
- **Competitive Contesters & Team Leader Applicants (`Qualifying Cycle: Dec 2026 – Nov 2028`):**
  - *Functional:* Track personal **Qualification Score** across up to 12 best multi-op/single-op contest entries, filter standings by their specific **Qualifying Area (QA)** (29 global regions) or **Sub-Area**, verify which of the 24 **Qualifying Events** is next, and read the **Selection Rules v1.0** and **Score Calculation Examples**.
  - *Emotional:* Trust that the `WRTC OC` score computation is transparent, accurate, and updated promptly after each contest log adjudication.
- **Referees, Volunteers & Pileup Operators (`Preparation & Event Phase: 2028 – July 2030`):**
  - *Functional:* Understand the 60 identical field station setups in Slavonia, review referee/volunteer requirements, and access official application forms when opened by the `WRTC OC`.
- **Corporate Sponsors, Radio Clubs & Individual Donors (`2026 – 2030`):**
  - *Functional:* View official **Sponsor Tier** recognition (Diamond, Platinum, Gold, Club Sponsors, Individual Donors) and contact the `WRTC OC` (`wrtc2030@hamradio.hr`) for partnership opportunities.
- **WRTC Organizing Committee (`WRTC OC` — Mate Botica `9A4M`, Davor Kucelin `9A1UN`, Nikola Perčin `9A5W`, Ivo Pezer `9A3A`, and team):**
  - *Functional:* Publish news updates, upload updated **Standings Snapshots** (JSON/CSV) after each of the 24 qualifying contests without code changes, and showcase Croatia & Slavonia to international visitors and families.

### 2.2 Non-Users (v1)
- **Self-Serve Online Bidders or Crowdfunding Backers:** The platform does **not** process online payments, run live crowdfunding campaigns, or host interactive bidding auctions.
- **Interactive Tent-Slot Reservists:** The platform does **not** allow visitors or sponsors to interactively click and reserve specific numbered field tents on a grid.

### 2.3 Key User Journeys

- **UJ-1. Contester checks Qualification Standings after the 9A DX Contest (`#1 of 24`).**
  - **Persona + context:** Chris (`DL1AAA`), a serious European contester competing in **QA EU-2**, wants to see his standing and breakdown after the `9A DX Contest` results are adjudicated.
  - **Entry state:** Unauthenticated public visitor landing on `/competition/standings/` from a reflector announcement link.
  - **Path:**
    1. Selects `EU-2` (or types `DL1AAA` in the instant callsign search input).
    2. Views the **Standings Table** filtered to `EU-2`, showing rank, callsign, total **Qualification Score**, number of events counted (`X/12`), and the visual **Allocation Cutoff Line** (`Top 3 Qualify in EU-2`).
    3. Clicks his row (`DL1AAA`) to open the **Operator Breakdown Drawer**, inspecting each counted contest (`9A DX 2026`, mode `CW/SSB`, operator role `Single-Op` vs `Multi-Op`, raw points, weighting factor from Table 2, and normalized score).
    4. Toggles the header theme to `Night` mode (`#0D1333` Shack Mode) for comfortable late-night viewing.
  - **Climax:** Immediately verifies his exact standing, gap to the `EU-2` cutoff line, and per-contest point math without downloading a spreadsheet.
  - **Resolution:** Shares the deep-linked URL (`/competition/standings/?qa=EU-2&call=DL1AAA`) with his prospective teammate.
  - **Edge case:** Before the first official standings snapshot is published (prior to `9A DX Contest` adjudication in early 2027), `/competition/standings/` displays a clean **"Pre-Season Preview"** state showing the 29 QAs, their exact team slot allocations (50 Qualifying Teams total), and a countdown to Event #1 (`9A DX Contest — Dec 19–20, 2026`).

- **UJ-2. Contester verifies a rule interpretation and score formula in Selection Rules v1.0.**
  - **Persona + context:** Yuki (`JH1BBB`, **QA AS-2**) wants to check how Multi-Op vs. Single-Op entries are weighted in the IARU HF Championship (`Event #7`) and whether out-of-QA operation is permitted.
  - **Entry state:** Public visitor navigating to `/competition/selection-rules/`.
  - **Path:**
    1. Uses the sticky left sidebar to switch between the 3 official tabs (`Selection Rules`, `Questions & Answers`, `Score Calculation Examples`) and clicks TOC jump-links (`Sections 1–11`).
    2. Reviews **Table 1 (24 Qualifying Events)**, **Table 2 (Weighting Factors)**, and **Table 5 (Category Order)** rendered with monospace callsign/numeric alignment (`JetBrains Mono`).
    3. Downloads the official PDF bundle (`wrtc-2030-selection-rules-v1.0.pdf`, `wrtc-2030-selection-rules-qa-v1.0.pdf`, `wrtc-2030-score-calculation-examples.pdf`) from the sidebar download card.
  - **Climax:** Finds the exact rule and formula in seconds on mobile or desktop.
  - **Resolution:** Plans his 2027–2028 contest schedule accordingly.

- **UJ-3. International visitor & family explore the Croatia & Slavonia venue showcase.**
  - **Persona + context:** Mark (`K1CCC`, **QA NA-1**) and his spouse are planning a trip to Croatia for July 2030 and want to know where the competition takes place, why Slavonia was chosen, and what cultural experiences await.
  - **Entry state:** Public visitor clicking `Croatia & Slavonia` (`/croatia-slavonia/`) from the top navigation or homepage teaser.
  - **Path:**
    1. Explores the **Why Slavonia for Radiosport** technical overview highlighting the flat Pannonian plain horizon (0° take-off angle towards EU, NA, and JA) across **Osijek, Čepin, and Đakovo**.
    2. Browses the regional cards for **Osijek** (Tvrđa baroque fortress, Drava riverfront), **Đakovo** (St. Peter's Cathedral, State Lipizzaner Stud Farm), **Čepin** (field station plains), and **Kopački Rit Nature Park**.
    3. Reviews travel logistics (Zagreb, Osijek, Budapest, and Belgrade airport corridors).
  - **Climax:** Both the radio operator and non-ham family members are excited about attending WRTC 2030 in Slavonia.
  - **Resolution:** Bookmarks the page and subscribes/follows news updates.

- **UJ-4. Prospective corporate or club sponsor evaluates partnership tiers.**
  - **Persona + context:** Marketing director at an amateur radio equipment manufacturer or president of a major contest club wants to support WRTC 2030 Croatia.
  - **Entry state:** Public visitor clicking `Sponsors` (`/sponsors/`) or the homepage Sponsor strip.
  - **Path:**
    1. Reviews the clean, dignified **Sponsor Tiers** (Institutional Host `HRS`, Major Equipment & Corporate Partners, Club Sponsors, and Individual Donors).
    2. Clicks the partnership inquiry CTA (`wrtc2030@hamradio.hr`) with pre-filled subject options to request the official Sponsorship Prospectus from the `WRTC OC`.
  - **Climax:** Connects directly with the `WRTC OC` without confusing gimmicks or fake online checkout forms.
  - **Resolution:** Enters direct sponsorship discussions with the `WRTC OC`.

- **UJ-5. WRTC OC Administrator publishes a new Standings Snapshot and News Post.**
  - **Persona + context:** `WRTC OC` member (`9A5W` or webmaster) receives the adjudicated standings file after `CQ WPX SSB 2027` (`Event #3`).
  - **Entry state:** Authenticated in Git/CMS repository or admin workflow.
  - **Path:**
    1. Drops the validated standings JSON/CSV dataset (`standings-2027-03-cqwpxssb.json`) into the data directory (or CMS upload) and adds a Markdown news announcement (`2027-04-15-cqwpx-ssb-standings-updated.mdx`).
    2. Automated schema validation verifies all 29 QAs, operator callsigns, and contest IDs (`1..24`) before build/revalidation.
  - **Climax:** The live `/competition/standings/` leaderboard, homepage ticker, and `/news/` feed update automatically in under 60 seconds.
  - **Resolution:** Zero manual HTML table editing required.

---

## 3. Glossary
*Downstream workflows and readers must use these terms exactly.*

- **WRTC OC (Organizing Committee)** — The official organizing committee of WRTC 2030 Croatia under the umbrella of **HRS**, chaired by Mate Botica (`9A4M`) alongside vice-presidents and members (`9A1UN`, `9A5W`, `9A3A`, `9A2G`, `9A5X`, `9A5R`, `9A6KX`, `9A3XV`, `YU1LA`, `9A6PAX`).
- **HRS (Hrvatski radioamaterski savez)** — The Croatian Amateur Radio Association (`hamradio.hr`), official national IARU member society and institutional host of WRTC 2030.
- **Qualifying Area (QA)** — One of the **29 global geographic regions** (`EU-1` through `EU-6`, `NA-1` through `NA-7`, `AS-1` through `AS-5`, `SA-1` through `SA-2`, `AF`, `OC-1` through `OC-2`, etc., plus Sub-Areas defined in Table 4 of Selection Rules v1.0) from which **50 Qualifying Teams** are selected.
- **Qualifying Event** — One of the **24 official contests** listed in Table 1 of Selection Rules v1.0 occurring between **December 19, 2026 (`9A DX Contest`)** and **November 26, 2028 (`CQ WW DX CW`)**.
- **Qualification Score** — An operator's cumulative point total calculated from up to **12 best Qualifying Event scores** (incorporating Table 2 weighting factors and Single-Op/Multi-Op rules).
- **Standings Snapshot** — A versioned, timestamped dataset containing all operator **Qualification Scores** across all 29 **Qualifying Areas** following the adjudication of a **Qualifying Event**.
- **Special Team** — One of the **10 non-QA-qualifying teams** defined in Table 7 of Selection Rules v1.0 (Youth Teams: 2, Wild Card Teams: 2, Sponsored Teams: 4, Defending Champion: 1, Host Team: 1), bringing total championship capacity to **60 Field Stations**.
- **Checker Motif (`.checker` / `.checker-five` / `.checker-strip`)** — The signature Croatian `#ED1C24` red diagonal square design token carried over from `wrtc2030.hr` and the official WRTC 2030 Croatia SVG logo (`wrtc-logo.svg`), applied systematically across section kickers, navigation indicators, callout corners, and structural dividers.
- **Day | Night Theme** — The dual-palette visual system (`data-theme="day"` using `#F6F8FC` paper / `#273B8F` royal blue / `#ED1C24` red, and `data-theme="night"` using `#0D1333` deep shack navy / `#151D4A` card surfaces / `#D99B26` Slavonian gold accents).

---

## 4. Features

### 4.1 Brand Identity, Header, Day | Night Theme & Checker Design System
**Description:** Preserves and scales the authentic visual identity of `wrtc2030.hr` across the entire platform. Uses the exact official WRTC 2030 Croatia SVG logos (`wrtc-logo.svg` for Day mode, `wrtc-logo-white.svg` for Night mode) and places the Croatian red checker motif (`.checker`, `.checker-five`, `.checker-strip`) at intentional architectural landmarks throughout the site. Realizes UJ-1, UJ-2, UJ-3, UJ-4.

**Functional Requirements:**

#### FR-1: Official WRTC 2030 Croatia SVG Logo & Dual-Theme Header
Visitors can view the official WRTC 2030 Croatia SVG logo (`wrtc-logo.svg` in Day mode, `wrtc-logo-white.svg` in Night mode) in the sticky top header and footer, and toggle seamlessly between **Day** and **Night** themes (`data-theme="day"` | `"night"`). Realizes UJ-1.

**Consequences (testable):**
- Day mode renders `wrtc-logo.svg` (`#273B8F` royal blue wordmark + `#ED1C24` red `CROATIA` & 5 diagonal squares); Night mode renders `wrtc-logo-white.svg` (`#FFFFFF` wordmark + `#ED1C24` red `CROATIA` & 5 diagonal squares).
- Theme selection persists in `localStorage` (`wrtc2030-theme`) and respects `prefers-color-scheme` when unset, with zero flash of unstyled content (FOUC).
- Top navigation provides direct access to `Home`, `Competition` (dropdown/sub-nav: `Selection Rules`, `Qualification Standings`, `Qualifying Events`, `Past Events`), `Croatia & Slavonia`, `News`, `Sponsors`, `About & Committee`, and `Contact`.

#### FR-2: Architectural Placement of Croatian Checker Motifs
The platform renders the Croatian red checker motif (`#ED1C24`) using reusable design-system primitives across seven designated architectural locations without visual clutter. Realizes UJ-1, UJ-2, UJ-3.

**Consequences (testable):**
- **Kickers & Breadcrumbs:** Every section kicker and breadcrumb prefix includes the `2×2` diagonal `.checker` mark (`6px–10px` scale).
- **Hero & Callout Accents:** Primary announcement callouts and hero cards feature the 5-square stepped `.checker-five` watermark (mirroring the right flank of `wrtc-logo.svg`) paired with subtle concentric radio-wave SVG arcs (`announcement__waves`).
- **Structural Ribbon Dividers:** Major full-bleed transitions (top brand bar, dark Slavonia showcase band, and footer top border) feature the alternating `.checker-strip` ribbon.
- **Active Navigation & Table Cutoffs:** Active tab indicators and **Qualification Standings** cutoff badges incorporate the `.checker` mark.

---

### 4.2 Interactive Qualification Standings & Operator Breakdown Engine
**Description:** The primary operational hub of the website during the 2026–2028 qualification cycle (`/competition/standings/`). Allows contesters and fans worldwide to filter, search, and inspect **Qualification Scores** across all 29 **Qualifying Areas** and 24 **Qualifying Events**, with a graceful Pre-Season state prior to the first contest adjudication. Realizes UJ-1, UJ-5.

**Functional Requirements:**

#### FR-3: Qualifying Area (QA) Filter, Callsign Search & Allocation Cutoff Line
Visitors can filter the **Qualification Standings** table by any of the 29 **Qualifying Areas** (or Global All-QA view), filter by **Sub-Area** where applicable (e.g., `NA-1` through `NA-7`, `EU` sub-regions per Table 4), and search instantaneously by operator callsign or name. Realizes UJ-1.

**Consequences (testable):**
- Selecting a **Qualifying Area** (e.g., `EU-2` with 3 allocated slots, or `EU-3` with 4 allocated slots per Table 3) dynamically renders an explicit **Allocation Cutoff Line** immediately below Rank $N$ (where $N$ equals that QA's team quota).
- Typing a callsign prefix or full callsign (e.g., `9A`, `DL1`, `K3`) filters the visible table in `< 50ms` client-side and highlights matching callsigns in `JetBrains Mono`.
- URL query parameters (`?qa=EU-2&call=9A5W`) synchronize bidirectionally with filter state for deep-linking and sharing.

#### FR-4: Operator Score Breakdown Drawer & Pre-Season Interactive Score Simulator
Visitors can click or tap any operator row in the **Qualification Standings** table to open an **Operator Breakdown Drawer** showing each contest counted toward their **Qualification Score** (up to 12 best events), or toggle the **Pre-Season Interactive Score Simulator** (seeded with the official Selection Rules v1.0 Score Calculation Examples) and **29-QA Quota Overview** before Event #1 results are published. Realizes UJ-1.

**Consequences (testable):**
- The **Operator Breakdown Drawer** lists each counted **Qualifying Event** (`#1` through `#24`), contest year, mode (`CW`, `SSB`, `Mixed`), category (`Single-Op` vs `Multi-Op`), raw points, Table 2 weighting factor, and resulting normalized points, plus indicates which lower-scoring events were dropped outside the top 12.
- Prior to Event #1 adjudication (or when toggled to "Score Calculation Example Simulation"), the page loads `data/standings/example-simulation.json` (mirroring the official Selection Rules v1.0 Score Calculation Examples) alongside the 29 **Qualifying Areas** quota breakdown (50 Qualifying Teams + 10 Special Teams = 60 Teams) and a live countdown to the next **Qualifying Event**.

---

### 4.3 Qualifying Events Calendar (`24 Contests`) & Selection Rules v1.0 Hub
**Description:** Preserves the complete content of `/competition/selection-rules/` from `wrtc2030.hr` while upgrading it with an interactive **24-Contest Qualifying Calendar** (`/competition/qualifying-events/`) that tracks completed vs. upcoming contests across the Dec 2026 – Nov 2028 timeline. Realizes UJ-2.

**Functional Requirements:**

#### FR-5: Selection Rules v1.0, Q&A, Score Examples & Official PDF Downloads
Visitors can read the complete **Selection Rules v1.0**, **Questions & Answers**, and **Score Calculation Examples** on `/competition/selection-rules/` with a sticky collapsible Table of Contents (`Sections 1–11`), responsive data tables (`Tables 1–7`), and direct PDF downloads. Realizes UJ-2.

**Consequences (testable):**
- All 3 tabs (`Selection Rules`, `Questions & Answers`, `Score Calculation Examples`), all 11 numbered sections, and all 7 official tables from `wrtc2030.hr/competition/selection-rules/` are preserved verbatim with zero content loss.
- Sticky sidebar provides instant scroll-spy navigation across `Sections 1–11` and one-click downloads for `wrtc-2030-selection-rules-v1.0.pdf`, `wrtc-2030-selection-rules-qa-v1.0.pdf`, and `wrtc-2030-score-calculation-examples.pdf`.

#### FR-6: Interactive 24-Contest Qualifying Events Timeline
Visitors can browse all 24 **Qualifying Events** (from `#1 9A DX Contest` on Dec 19–20, 2026 through `#24 CQ WW DX CW` in Nov 2028) filtered by status (`Upcoming`, `Completed / Standings Published`), mode (`CW`, `SSB`, `Mixed`), and Table 2 weighting factor. Realizes UJ-1, UJ-2.

**Consequences (testable):**
- Automatically highlights the **Next Qualifying Event** in the homepage ticker and calendar header based on current UTC date.
- Each completed event links directly to the corresponding **Standings Snapshot** delta and official contest rules URL.

---

### 4.4 Croatia & Slavonia Host Region Showcase (`/croatia-slavonia/`)
**Description:** Gives WRTC 2030 its authentic Croatian and Slavonian soul — explaining both *why Slavonia is a world-class radiosport propagation arena* and *what makes Osijek, Čepin, Đakovo, and Kopački Rit unforgettable destinations* for competitors, referees, and visiting families. Realizes UJ-3.

**Functional Requirements:**

#### FR-7: Slavonia Propagation & 60-Field-Station Technical Overview
Visitors can explore the technical profile of the Slavonian competition zone (Osijek, Čepin, Đakovo) and the standardized 60-station field configuration (`2 operators`, `24h`, identical antennas, terrain flatness, and propagation paths to EU, NA, and JA). Realizes UJ-3.

**Consequences (testable):**
- Displays a dedicated technical overview card grid comparing Slavonia's flat Pannonian elevation profile, low local noise floor, and 60-station deployment geography across the Osijek–Čepin–Đakovo triangle.

#### FR-8: Host Cities, Cultural Landmarks & International Travel Guide
Visitors and families can browse curated guides for **Osijek** (Tvrđa baroque fortress, Drava promenade, culinary heritage), **Đakovo** (Cathedral of St. Peter, UNESCO-recognized State Lipizzaner Stud Farm), **Čepin**, and **Kopački Rit Nature Park**, alongside international arrival routes (Zagreb `ZAG`, Osijek `OSI`, Budapest `BUD`, Belgrade `BEG`, and A3/A5 highway corridors). Realizes UJ-3.

**Consequences (testable):**
- Renders dedicated destination cards with cultural highlights, travel times to Osijek HQ, and external tourism links (`croatia.hr`, regional tourist boards).

---

### 4.5 News, Organizing Committee, Past WRTC Archive & Sponsors Recognition
**Description:** Completes the institutional authority of the site by preserving and expanding the **Latest News** engine, **Organizing Committee** roster (`11 members with callsigns`), **Past WRTC Events Archive (`1990–2026`)**, and a clean, dignified **Sponsors & Partners** showcase. Realizes UJ-4, UJ-5.

**Functional Requirements:**

#### FR-9: Structured News & Announcements Feed (`/news/`)
Visitors can read chronological announcements from the `WRTC OC` (starting with the Oct 3, 2026 Poreč Host Announcement, Oct 16, 2026 Deferral Notice, and Oct 19, 2026 Selection Rules v1.0 Approval), filter by category (`Official Rules`, `Standings Update`, `Organization`, `Venue`), and subscribe via RSS/email updates. Realizes UJ-5.

**Consequences (testable):**
- Homepage displays the top 3 latest announcements; `/news/` lists all articles with individual permalink pages (`/news/[slug]/`), OpenGraph social cards, and RSS feed (`/feed.xml`).

#### FR-10: Clean Sponsors, Partners & Institutional Recognition (`/sponsors/`)
Visitors can view official recognition for the Institutional Host (`HRS — hamradio.hr`), Corporate & Equipment Sponsors (by tier), Club Sponsors, and Individual Donors, and initiate a direct sponsorship inquiry via `wrtc2030@hamradio.hr`. Realizes UJ-4.

**Consequences (testable):**
- Displays clean, static, dignified sponsor tiers and logos without any interactive tent-picking grid, live crowdfunding progress bar, or online bidding checkout.
- Provides a direct partnership inquiry CTA linking to `wrtc2030@hamradio.hr` (plus downloadable Sponsorship Prospectus PDF slot when published by the `WRTC OC`).

** Out of Scope:**
- Interactive 60-tent picking/reservation grid (`[NON-GOAL for MVP]`).
- Live crowdfunding progress bars, online payment processing, or online bidding portals (`[NON-GOAL for MVP]` — per Selection Rules v1.0 Section 8.D, the Sponsored Team application process does not open until after 1 January 2029).

#### FR-11: Organizing Committee Roster & Past WRTC History (`1990–2026`)
Visitors can view the complete **Organizing Committee** (`9A4M` Mate Botica, `9A1UN` Davor Kucelin, `9A5W` Nikola Perčin, `9A3A` Ivo Pezer, `9A2G` Zlatko Tonković, `9A5X` Darko Martinčević, `9A5R` Željko Dražić Karalić, `9A6KX` Mirko Jurman, `9A3XV` Aleksandar Jugović, `YU1LA` Ivan Mastilović, `9A6PAX` Marija Sorić) and the historical timeline of all 9 prior WRTC editions (`1990 Seattle` through `2026 UK`). Realizes UJ-3, UJ-4.

**Consequences (testable):**
- Preserves all 11 OC member cards with roles and callsign badges in `JetBrains Mono` and all 9 historical WRTC event summaries with links to archive sites.

---

### 4.6 Standings Data Ingestion & Content Publishing Pipeline
**Description:** Enables the `WRTC OC` to update **Qualification Standings** after each of the 24 contests and publish news articles via versioned JSON/CSV and Markdown/MDX files with build-time validation. Realizes UJ-5.

**Functional Requirements:**

#### FR-12: Validated Standings Snapshot Ingestion (JSON/CSV)
`WRTC OC` administrators can publish a new **Standings Snapshot** by committing or uploading a structured JSON/CSV file containing operator scores across the 29 **Qualifying Areas**, which is validated against a strict schema at build time. Realizes UJ-5.

**Consequences (testable):**
- Build pipeline validates every **Standings Snapshot** against a Zod schema (verifying valid QA codes from Table 3, valid event IDs `1..24` from Table 1, non-negative scores, and max 12 counted events per operator) and fails the build with a clear error message if malformed.

---

### 4.7 AI Assistant ("9A WRTC & Slavonia Concierge") & GitHub → Netlify Deployment Pipeline
**Description:** Provides an intelligent, grounded on-page AI Assistant (`FR-13`) that answers visitor questions about WRTC 2030 rules/website content as well as Croatia & Slavonia tourism, accommodation, and gastronomy, while automating continuous integration and deployment to **Netlify** via **GitHub Actions** (`FR-14`). Realizes UJ-2, UJ-3, UJ-5.

**Functional Requirements:**

#### FR-13: Grounded AI Assistant for Website Content, Rules & Croatia/Slavonia Tourism
Visitors can open an accessible floating **AI Assistant** drawer/widget on any page to ask natural-language questions about WRTC 2030 Croatia (Selection Rules v1.0, Q&A, Score Calculation Examples, 24 Qualifying Events, 29 QA quotas, Organizing Committee) and about visiting Croatia & Slavonia (Osijek, Đakovo, Čepin, Kopački Rit sightseeing, accommodations/hotels, traditional Slavonian food & wine such as *kulen*, *fiš paprikaš*, *čobanac*, and travel routes). Realizes UJ-2, UJ-3.

**Consequences (testable):**
- Powered by a serverless API endpoint (`/api/chat` running on Netlify Functions / Next.js Route Handler) backed by a structured local RAG knowledge bundle (`data/knowledge/wrtc2030-and-slavonia-kb.json`) compiled at build time from the official Selection Rules v1.0, Q&A, event schedule, and curated Croatia/Slavonia tourism, accommodation, and food guides.
- Every rules-related answer cites the exact Selection Rules v1.0 section or table (e.g., `Section 4, Table 2`), and every tourism/hospitality answer provides actionable guidance for Osijek, Đakovo, Čepin, and Croatia.
- Enforces strict system-prompt guardrails: refuses off-topic requests unrelated to WRTC 2030, amateur radio, or visiting Croatia/Slavonia, and includes rate limiting and graceful fallback links if the LLM API key is unset in local preview.

#### FR-14: Automated GitHub → Netlify CI/CD Deployment Pipeline
Developers and `WRTC OC` maintainers can push commits or open Pull Requests in GitHub to automatically run build-time validation and deploy Preview and Production builds to **Netlify**. Realizes UJ-5.

**Consequences (testable):**
- Repository includes a production-ready `netlify.toml` configured with `@netlify/plugin-nextjs`, caching rules, security headers, and serverless function routing for `/api/chat`.
- Includes `.github/workflows/ci-netlify.yml` executing TypeScript type-checking (`tsc --noEmit`), `Zod` standings & rules schema verification, Vitest unit tests, and production `next build` verification on every push and PR.

---

## 9. Open Questions (Synced with Live Bilingual Stakeholder Artifact)
1. **OQ-1 (Official Photographic Assets from HRS / Slavonia):** Which high-resolution photographs from the October 3, 2026 Poreč announcement (`HRS` convention) and regional tourist boards (Osijek Tvrđa, Đakovo Cathedral/Lipizzaners, Čepin plains) can the `WRTC OC` provide to replace generic placeholders in `/croatia-slavonia/`?
2. **OQ-2 (Exact Export Format from the WRTC OC Scoring Software):** When the `WRTC OC` (`9A3XV` / `9A5W`) computes the first **Standings Snapshot** after the `9A DX Contest` (Dec 19–20, 2026), what exact CSV/JSON columns will the scoring script export?
3. **OQ-3 (AI Assistant LLM Key & Partner Hospitality Recommendations):** Which LLM API key (`GEMINI_API_KEY` or `OPENAI_API_KEY`) should be configured in Netlify Environment Variables for `FR-13`, and are there specific partner hotels or restaurants in Osijek/Đakovo that the `WRTC OC` wants highlighted?
4. **OQ-4 (Netlify Staging Subdomain vs. Production DNS Cutover):** Should the GitHub → Netlify pipeline initially publish to a staging URL (`wrtc2030-hr.netlify.app` or `staging.wrtc2030.hr`) for Organizing Committee review before switching the production `wrtc2030.hr` DNS?

---

## 5. Non-Goals (Explicit)
- **No Interactive 60-Tent Picking or Reservation Grid:** Tents are not picked or reserved online by visitors or sponsors.
- **No Crowdfunding Progress Bars or Online Bidding Auctions:** While Selection Rules v1.0 (Section 8, Table 7 & Rule 8.D) notes that 4 Sponsored Teams will be selected via applications/bidding after **1 January 2029**, the website will **not** include crowdfunding meters, live auction bidding widgets, or payment gateways.
- **No Real-Time Contest Log Adjudication Engine:** Contest logs for the 24 **Qualifying Events** are adjudicated externally by each respective contest sponsor (`9A DX`, `CQ WW`, `ARRL DX`, `IARU HF`, `WPX`, `WAE`, `EU HF`, `WRTC OC` scoring software); the website ingests and visualizes the resulting official **Standings Snapshots**.
- **No Public User Accounts or Login System in v1:** Competitors do not need accounts to view standings, breakdown drawers, or rules.

---

## 6. MVP Scope

### 6.1 In Scope (v1 — Qualification Cycle Launch Ready)
- **Official Brand & Dual-Theme Shell:** Exact `wrtc-logo.svg` (Day) and `wrtc-logo-white.svg` (Night) logos, `Day | Night` theme switcher, `Barlow Condensed` / `Barlow` / `JetBrains Mono` typography, and architectural `.checker` / `.checker-five` / `.checker-strip` placements.
- **Homepage (`/`)**: Hero with Poreč Oct 3 announcement & Key Facts card, Live Next Qualifying Event Ticker (`#1 9A DX Contest — Dec 19–20, 2026`), Latest News feed, About WRTC (`2 operators`, `24h`, `60 teams`), Slavonia Host Region preview, Organizing Committee (`11 members`), Past Events (`1990–2026`), Clean Sponsors strip, and Contact/HRS footer.
- **Selection Rules v1.0 Hub (`/competition/selection-rules/`)**: Complete 3-tab (`Selection Rules`, `Q&A`, `Score Calculation Examples`), 11-section, 7-table interactive reference with sticky scroll-spy TOC and 3 PDF downloads.
- **Interactive Qualification Standings (`/competition/standings/`)**: 29-QA filter, Sub-Area filter, instant callsign search, visual Allocation Cutoff Line per QA, Operator Score Breakdown Drawer, and Pre-Season Preview state.
- **24-Contest Qualifying Events Calendar (`/competition/qualifying-events/`)**: Interactive schedule of all 24 events (Dec 2026 – Nov 2028) with weighting factors and status filters.
- **Croatia & Slavonia Venue Showcase (`/croatia-slavonia/`)**: Slavonia propagation/field-station technical profile + Osijek, Đakovo, Čepin, and Kopački Rit cultural and travel guide.
- **News & Announcements (`/news/` & `/news/[slug]/`)**: MDX-powered news archive with category tags and RSS feed.
- **Clean Sponsors & Partners Page (`/sponsors/`)**: Static, dignified tier recognition (`HRS`, Corporate Tiers, Club Sponsors, Donors) + `wrtc2030@hamradio.hr` partnership CTA.

### 6.2 Out of Scope for MVP (Deferred to Phase 2 / 2028–2030)
- **Team Leader Application Submission Portal (`Deferred to late 2028`):** Needed after Event #24 (`CQ WW DX CW`, Nov 2028) when qualified Team Leaders formally apply and name their teammates.
- **Sponsored Team Application & Rule 8.D Instructions (`Deferred to Jan 2029`):** Per Rule 8.D, details open after 1 January 2029.
- **Referee, Volunteer & Pileup Awards Portal (`Deferred to 2029–2030`):** Operational modules for Championship Week in July 2030.
- **Live July 2030 Championship Scoreboard (`Deferred to July 2030`):** Real-time 24-hour contest scoreboard during the actual championship weekend in Slavonia.

---

## 7. Success Metrics

**Primary**
- **SM-1 (Zero Content Regression + Full Brand Fidelity):** 100% of existing official `wrtc2030.hr` text, tables (`Tables 1–7`), PDF downloads (`3 PDFs`), OC members (`11`), and official SVG logos (`wrtc-logo.svg` / `wrtc-logo-white.svg`) are preserved accurately. Validates FR-1, FR-2, FR-5, FR-11.
- **SM-2 (Standings Query Speed & Mobile Usability):** Filtering across any of the 29 **Qualifying Areas** or searching across 3,000+ operator callsigns completes in `< 50ms` client-side with Lighthouse Performance & Accessibility scores `>= 95` on both Mobile and Desktop. Validates FR-3, FR-4.
- **SM-3 (Rapid Standings Publishing Turnaround):** Publishing a new **Standings Snapshot** after any of the 24 **Qualifying Events** requires only committing/uploading a single validated JSON/CSV file, deploying in `< 2 minutes` with zero code edits. Validates FR-6, FR-12.

**Secondary**
- **SM-4 (International Contest Community Engagement):** Deep-linked QA standings views (`?qa=...`) and **Selection Rules v1.0** PDF downloads serve global traffic spikes immediately following major contest adjudications (`9A DX`, `ARRL DX`, `CQ WPX`, `IARU HF`, `CQ WW`) with 99.9% uptime via static/CDN edge caching. Validates FR-3, FR-5, FR-9.

**Counter-metrics (do not optimize)**
- **SM-C1 (No Visual Clutter or Unrequested Gamification):** Do not add decorative animations, fake crowdfunding counters, or interactive gimmicks that obscure contest data density or misrepresent `WRTC OC` procedures. Counterbalances SM-2 and SM-4.

---

## 8. Cross-Cutting Non-Functional Requirements (NFRs)
- **NFR-1 (Performance & Static Edge Delivery):** All pages (`Home`, `Selection Rules`, `Qualification Standings`, `Qualifying Events`, `Croatia & Slavonia`, `News`, `Sponsors`) must be statically pre-rendered (SSG/ISR) so initial HTML loads in `< 200ms` TTFB from CDN edge nodes worldwide.
- **NFR-2 (Accessibility & Legibility):** Both **Day** (`#F6F8FC` / `#10172A`) and **Night** (`#0D1333` / `#F1F5F9`) themes must meet **WCAG 2.1 AA** contrast ratios (`>= 4.5:1` for body text, `>= 3:1` for UI components). All callsigns, scores, and formulas must render with `font-variant-numeric: tabular-nums` in `JetBrains Mono` so digits `0` and letters `O`/`Ø` are unmistakably distinct.
- **NFR-3 (Privacy & Zero-Cookie Compliance):** Public browsing, standings filtering, and theme persistence (`localStorage`) must operate with zero third-party tracking cookies, eliminating intrusive GDPR cookie banners unless optional external embeds are explicitly invoked.

---

## 9. Open Questions
1. **Official Photographic Assets from HRS / Slavonia:** Which high-resolution photographs from the October 3, 2026 Poreč announcement (`HRS` convention) and regional tourist boards (Osijek Tvrđa, Đakovo Cathedral/Lipizzaners, Čepin plains) can the `WRTC OC` provide to replace generic placeholders in `/croatia-slavonia/`?
2. **Exact Export Format from the WRTC OC Scoring Software:** When the `WRTC OC` computes the first **Standings Snapshot** after the `9A DX Contest` (Dec 19–20, 2026), will the scoring script export CSV or JSON natively? (Our ingestion pipeline will support both CSV and JSON via a unified converter).

---

## 10. Assumptions Index
- **§4.2 (`[ASSUMPTION]`):** Assumes up to ~3,500 distinct operator callsigns across all 29 **Qualifying Areas** over the 24-contest cycle (matching historical WRTC 2022/2026 participation volumes of ~200–400KB compressed JSON), allowing instant client-side filtering and search after a single cached payload fetch.
- **§4.5 (`[ASSUMPTION]`):** Assumes all sponsorship inquiries during the 2026–2028 phase route directly to the `WRTC OC` via `wrtc2030@hamradio.hr` alongside static logo/tier recognition.
