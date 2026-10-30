---
title: 'Product Brief: WRTC 2030 Croatia Official Web Platform (wrtc2030.hr)'
status: final
created: '2026-10-25'
updated: '2026-10-25'
---

# Product Brief: WRTC 2030 Croatia Official Web Platform (`wrtc2030.hr`)

## Executive Summary

In July 2030, the **Croatian Amateur Radio Association (*Hrvatski radioamaterski savez* — HRS)** will host the **11th World Radiosport Team Championship (WRTC 2030)** across **Osijek, Čepin, and Đakovo in Slavonia, Croatia**. Widely regarded as the "Olympic Games" of amateur radio contesting, WRTC 2030 brings together **60 two-person teams (120 of the world's top contesters)** competing head-to-head continuously for 24 hours under identical technical conditions.

The current fast preview at `https://wrtc2030.hr/` already has an excellent visual foundation — including the official **WRTC 2030 Croatia SVG logo** (Day & Night variants), the signature red **Croatian `.checker` motif**, the `Barlow Condensed` / `Barlow` / `JetBrains Mono` typography, a `Day | Night` theme toggle, the complete **Selection Rules v1.0** (with sticky TOC, Q&A, and Score Calculation Examples), and the 11-member **Organizing Committee roster**. Our goal is to **keep that exact visual DNA and authoritative content** while expanding the site into a full multi-year championship portal (comparable to `wrtc2026.org`) with interactive **Qualification Standings** (for the 24 qualifying events starting with the `9A DX Contest` on Dec 19–20, 2026), rich **Croatia & Slavonia Venue** pages, **Sponsors & Partners** recognition, and tasteful Croatian checker placements throughout.

## What We Keep from `wrtc2030.hr` vs. What We Expand

1. **Keep from `wrtc2030.hr`:**
   - **Official WRTC 2030 Croatia SVG Logo** (`wrtc-logo.svg` for Day, `wrtc-logo-white.svg` for Night).
   - **Croatian Checkers Design System:** The `.checker` (`2×2` red squares) and the 5-square stepped checker motif from the logo, expanded to neat architectural locations across section kickers, callouts, card corners, table headers, and dividers.
   - **Typography & Day/Night Theme:** `Barlow Condensed` (uppercase display), `Barlow` (body), and `JetBrains Mono` (kickers, callsigns, formulas, tables) with the `Day` (`#ffffff` / `#273b8f` / `#ed1c24`) and `Night` (`#0d1333` / `#161e45` / `#8ea2ff` / `#ed1c24`) color tokens.
   - **Authoritative Content & Doc Layout:** The Poreč announcement, Latest News, Selection Rules v1.0 (Sections 1–11, Tables 1–7, PDF downloads), Q&A, Score Calculation Examples, Organizing Committee (`9A4M`, `9A1UN`, `9A5W`, `9A3A`, `9A2G`, `9A5X`, `9A5R`, `9A6KX`, `9A3XV`, `YU1LA`, `9A6PAX`), Past Events (1990–2026), and HRS footer.
2. **Expand to Match `wrtc2026.org` Scope + Croatian Touch:**
   - **Qualification Standings Leaderboard (`/competition/standings`):** Dynamic standings across the 24 qualifying contests (Dec 2026 – Nov 2028) filterable by the **29 Qualification Areas (QAs)**, Sub-Areas, **Youth Track** (under 25 on Dec 20, 2026; best 6 scores), and operator callsign.
   - **Croatia & Slavonia Venue Showcase (`/slavonia`):** Highlighting **Osijek, Čepin, and Đakovo**, why the flat Pannonian plains guarantee a level HF propagation playing field for all 60 stations, Croatian cultural/travel info, and host **HRS (`hamradio.hr`)**.
   - **Sponsors, Volunteers & Referees (`/sponsors`, `/competition`):** Clean, professional presentation of Commercial Sponsors, Club Sponsors, Personal Donors, Referee/Station documentation, and volunteer coordination (as on `wrtc2026.org`).

## Phased Scope (Next.js 15 App Router + Tailwind CSS + shadcn/ui)

- **Phase 1 — Foundation, Rules & Venue Launch (2026):**
  - Next.js 15 implementation preserving all current `wrtc2030.hr` pages, official SVG logos, Day/Night theme, and expanded Croatian checker placements.
  - Dedicated **Slavonia & Croatia Venue** section and **Sponsors & Partners** page.
  - Pre-contest **Qualification Standings** hub ready for Event #1 (**9A DX Contest**, Dec 19–20, 2026).
- **Phase 2 — Live Qualification Standings Engine (Dec 2026 – Nov 2028):**
  - JSON/CSV standings ingestion from Scoring Lead (`9A3XV`) after each of the 24 qualifying contests, with filtering across all 29 QAs and the Youth track.
- **Phase 3 — Championship Operations, Teams, Referees & Visitors (2029 – July 2030):**
  - Qualified Team Leader / Team Mate profiles, Sponsored Team & Wild Card announcements (opening after 1 Jan 2029 per Rule 8.D), Station & Antenna descriptions, Referee Handbook, Customs/Travel guides, and live July 2030 scoreboard integration.
