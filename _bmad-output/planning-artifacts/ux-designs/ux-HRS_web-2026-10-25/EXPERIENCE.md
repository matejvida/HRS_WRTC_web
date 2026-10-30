---
name: WRTC 2030 Croatia (Official Logo, Croatian Checkers & Golden Slavonia)
status: final
sources:
  - _bmad-output/planning-artifacts/research/competitive-wrtc-2030-croatia-website-2026-10-25/research.md
  - _bmad-output/planning-artifacts/briefs/brief-HRS_web-2026-10-25/brief.md
updated: 2026-10-25
---

# WRTC 2030 Croatia (`wrtc2030.hr`) — Experience Spine

## Foundation

Responsive web platform built on **Next.js 15 (App Router) + Tailwind CSS + shadcn/ui**, paired with `DESIGN.md`. Preserves everything that already works well on `https://www.wrtc2030.hr/` — the official SVG logo (`wrtc-logo.svg` / `wrtc-logo-white.svg`), the `.checker` design language, the `Barlow Condensed` / `Barlow` / `JetBrains Mono` typography, the `Day | Night` theme switcher, the sticky `.doc-layout` for Selection Rules v1.0, and the Organizing Committee roster — while expanding the site to support the full multi-year feature set of `wrtc2026.org` and showcasing Croatia (HRS) and Slavonia (Osijek, Čepin, Đakovo).

## What We Keep from `wrtc2030.hr` vs. What We Expand (from `wrtc2026.org`)

| Area | Kept Verbatim from `wrtc2030.hr` | Expanded / Added (Inspired by `wrtc2026.org` + Croatian Touch) |
|---|---|---|
| **Brand & Visuals** | Official Day/Night SVG logos, `.checker` kicker marks, concentric radio wave SVGs, `Barlow Condensed` + `Barlow` + `JetBrains Mono`, Day/Night theme switch | Tasteful `.checker` & 5-square `.checker-cluster` placements across cards, callouts, table headers, and section transitions + Slavonia regional photography/maps |
| **Competition & Qualification** | Complete Selection Rules v1.0 (11 sections, 7 tables, footnotes, changelog, 3 PDF downloads), Q&A page, Score Calculation Examples page | **Qualification Standings Leaderboard** (for the 24 qualifying contests starting with `9A DX Contest` Dec 19–20, 2026), filterable by the **29 Qualification Areas (QAs)** and **Youth Track** |
| **Host & Venue (Croatia / Slavonia)** | Poreč sanctioning announcement, 11-member Organizing Committee (`9A4M`, `9A1UN`, `9A5W`, `9A3A`, `9A2G`, `9A5X`, `9A5R`, `9A6KX`, `9A3XV`, `YU1LA`, `9A6PAX`), HRS footer | Dedicated **Croatia & Slavonia Venue** section introducing **Osijek, Čepin, and Đakovo**, the flat Pannonian plain propagation advantage, travel logistics, and HRS (`hamradio.hr`) heritage |
| **Sponsors & Support** | Contact routing (`wrtc2030@hamradio.hr`) and Rule 8.D definition of the 4 Sponsored Teams (applications open after 1 Jan 2029) | Dedicated **Sponsors & Supporters** showcase page (Commercial Sponsors, Club Sponsors, Donor recognition, and how to support via HRS — static & professional, no crowdfunding/tent-picking gimmicks) |

## Information Architecture

| Surface | Path | Reached From | Purpose |
|---|---|---|---|
| **Home** | `/` | Logo / Nav | Latest News, Official Announcement & Key Facts card (with official SVG logo), Next Qualifying Contest Countdown (`9A DX Contest`), Slavonia Venue highlight, About WRTC, Organizing Committee (`Team`), Past Events (1990–2026), Sponsors & Contact |
| **Qualification Standings** | `/competition/standings` | `Competition` Nav / Sub-tabs | Leaderboard of qualification scores across the 24 qualifying events (2026–2028), filterable by Continent, 29 Qualification Areas (`EU #1`–`EU #9`, `NA #1`–`NA #11`, `AS #1`–`AS #4`, `AF #1`, `SA #1`–`SA #2`, `OC #1`–`OC #2`), Sub-Areas, Youth Track, and Callsign search |
| **Selection Rules v1.0** | `/competition/selection-rules` | `Competition` Nav / Sub-tabs | Existing sticky `.doc-layout` with numbered TOC, Tables 1–7, formulas, footnotes, and PDF downloads (`Selection Rules`, `Q&A`, `Score Calculation Examples`) |
| **Questions & Answers** | `/competition/selection-rules/questions-and-answers` | `.doc-tabs` | Official rule clarifications from `rules-wrtc2030@hamradio.hr` with instant keyword filter and deep-linkable question anchors |
| **Score Calculation Examples** | `/competition/selection-rules/score-calculation-examples` | `.doc-tabs` | Official worked examples of Event Score and Sub-Area normalization calculations |
| **Croatia & Slavonia Venue** | `/slavonia` | Top Nav `Slavonia` | Why Slavonia (Osijek, Čepin, Đakovo) was chosen: flat Pannonian terrain for 60 equal HF sites, cultural highlights, travel/customs info, and host HRS (`hamradio.hr`) |
| **Sponsors & Support** | `/sponsors` | Top Nav `Sponsors` | Recognition of Commercial Sponsors, Club Sponsors, and Supporters (like `wrtc2026.org`), plus official partnership contact (`wrtc2030@hamradio.hr`) |

→ Composition reference: [`mockups/homepage-preview.html`](file:///Users/matejvida/Documents/Development/HRS_docs/_bmad-output/planning-artifacts/ux-designs/ux-HRS_web-2026-10-25/mockups/homepage-preview.html). Spine wins on conflict.

## Component Patterns

| Component | Surface | Behavioral Rules |
|---|---|---|
| **`ThemeSwitch` (`Day / Night`)** | Header (global) | Persists choice in `localStorage('wrtc-theme')`, defaults to OS `prefers-color-scheme`, and swaps `.only-day` (`wrtc-logo.svg`) and `.only-night` (`wrtc-logo-white.svg`) logos seamlessly. |
| **`CheckerKicker` & `CheckerCluster`** | All sections, callouts, cards | Pure CSS geometric Croatian checker accents (`--red: #ed1c24`) used on section kickers, announcement callouts, card headers, and breadcrumb trails. |
| **`QualificationStandingsTable`** | `/competition/standings` | Displays official standings calculated by the WRTC OC (`9A3XV`) after each published qualifying contest result. Filters by the 29 QAs, Youth Track (under 25 on Dec 20, 2026; best 6 scores), or operator callsign. Clicking an operator row expands their contributing contest scores (up to 10 best; max 3 Multi-Op; max 3 Outside-QA). |
| **`QualifyingEventsCalendar`** | Home & `/competition/standings` | Displays the 24 qualifying contests (2026–2028) from Table 1 of the Selection Rules, highlighting the next upcoming contest (**9A DX Contest**, Dec 19–20, 2026, 1,000 pts) and linking completed contests to their published WRTC point breakdowns. |
| **`DocLayoutWithStickyTOC`** | `/competition/selection-rules/*` | Preserves the exact `wrtc2030.hr` two-column documentation reader: sticky left `.doc-tabs` + collapsible `<details class="toc">` with active scroll-spy and mobile floating `Contents` jump pill. |

## State Patterns

| State | Surface | Treatment |
|---|---|---|
| **Pre-First Qualifying Contest (Before Dec 2026 Results)** | `/competition/standings` | Shows the 24 Qualifying Events schedule (Table 1) and the 29 Qualification Area quotas (Table 3: 50 QA teams + 10 Special teams), with a `.doc-note` callout: *"Qualification begins with the 9A DX Contest (19–20 December 2026). Standings will be published here once official contest results are released."* |
| **Active Qualification Cycle (2027–2028)** | `/competition/standings` | Shows live QA standings with a badge indicating how many of the 24 events have been adjudicated and the date of the latest update. |

## Key Flows

### Flow 1 — Contester Reviewing Selection Rules & Checking Standings (Marco, `IK7UXW`)
1. Marco opens `wrtc2030.hr` and sees the official WRTC 2030 Croatia logo, Latest News, and the callout for Qualification Event #1 (**9A DX Contest, 19–20 December 2026**).
2. He clicks **Competition**, which opens the unified Competition hub with tabs for **Qualification Standings**, **Selection Rules**, **Questions & Answers**, and **Score Calculation Examples**.
3. In **Selection Rules**, he uses the sticky left Table of Contents (`3. Qualification Areas (QA)`) to check his QA (`EU #5 — 2 Teams`) and downloads the official 20-page PDF if needed.
4. Once contest results are published, he switches to the **Qualification Standings** tab, selects `EU #5`, and inspects his top-10 normalized event scores.

### Flow 2 — Prospective Sponsor or International Visitor Exploring Croatia & Slavonia (David, Commercial Sponsor / Visitor)
1. David visits `wrtc2030.hr` and navigates to **Slavonia & Venue** to learn about the July 2030 host region (**Osijek, Čepin, and Đakovo** in northeastern Croatia) and host organization **HRS (`hamradio.hr`)**.
2. He visits **Sponsors** to see current Commercial and Club partners supporting the 60-team championship and clicks the direct contact CTA (`wrtc2030@hamradio.hr`) to connect with the Organizing Committee.
