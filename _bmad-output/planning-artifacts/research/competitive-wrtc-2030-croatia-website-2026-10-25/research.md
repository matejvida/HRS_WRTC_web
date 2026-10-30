---
title: 'Competitive & Domain Research: WRTC 2030 Croatia Website (wrtc2030.hr vs. wrtc2026.org)'
type: 'competitive'
topic: 'WRTC 2030 Croatia Website'
decision: 'What to keep vs. discard from the wrtc2030.hr fast preview and how to architect the official HRS WRTC 2030 Croatia web platform on par with wrtc2026.org with an authentic Croatian & Slavonian touch'
source: 'native-run'
status: complete
preset: 'standard'
validation: 'normal'
claims_verified: 8
claims_unverified: 0
created: '2026-10-25'
updated: '2026-10-25'
---

# Competitive & Domain Research: WRTC 2030 Croatia Website

**Decision this research serves:** Determine what to keep and what to discard from the existing fast preview (`https://wrtc2030.hr/`), benchmark against `https://www.wrtc2026.org/` and host `https://www.hamradio.hr/`, and define the product, UX, and technical plan for the official WRTC 2030 Croatia web platform.

---

## 1. Executive Summary

- **Verdict:** **Keep the domain, official Selection Rules v1.0, Q&A content, and Organizing Committee data from `wrtc2030.hr`, but replace its generic, static preview shell with a purpose-built, multi-phase WRTC 2030 platform.**
- **Why now (Urgent Deadline — Dec 19–20, 2026):** The WRTC Sanctioning Committee approved HRS (*Hrvatski radioamaterski savez*) as host on October 3, 2026 in Poreč [1] and approved the WRTC 2030 Selection Rules v1.0 on October 19, 2026 [3]. The 24-contest global qualification cycle begins in **less than 8 weeks** at the **Croatian DX Contest (`9A DX Contest`) on December 19–20, 2026** [4]. Immediately after that weekend, global contesters will visit `wrtc2030.hr` expecting an interactive **Qualification Standings Engine**.
- **Key Findings Driving the Architecture:**
  1. **`wrtc2030.hr` is a stopgap skeleton clone of early `wrtc2026.org`:** It was stood up rapidly to publish the mandatory October 2026 Selection Rules and OC roster [5][7], copying `wrtc2026.org`'s top-level menu labels (`About Us`, `Competition`, `Past Events`, `Contact`) [6][7]. It lacks interactive qualification standings, sponsorship/donation funnels, Slavonia venue storytelling, and a distinctive Croatian visual identity [7].
  2. **Expansion to 60 teams makes Sponsorship UX mission-critical:** WRTC 2030 expands the field from 50 teams (UK 2026) to **60 competing teams (120 operators)** [3]. To fund those 10 extra field stations in Slavonia, the rules explicitly add **4 Sponsored Team slots** (up from 2) alongside Tent/Station Sponsors, Commercial Sponsors, Club Sponsors, and Personal Donations [3][6]. The website must be a high-converting sponsorship showcase, not just a document bulletin board.
  3. **"Croatian Touch" = National `9A` Heritage + "Golden Slavonia" Technical Storytelling:** Rather than tourist clichés, the Croatian touch should marry **national identity** (subtle geometric *šahovnica* red/white accents, deep Adriatic navy, `9A` callsign pride, and HRS institutional authority [1][5]) with **Slavonian regional identity** (*Zlatna Slavonija* golden wheat/oak tones and the technical story of why the flat Pannonian plains around **Osijek, Čepin, and Đakovo** [2] offer the fairest, most identical HF propagation battlefield in WRTC history).

---

## 2. Dimension 1: Domain & Host Context (`hamradio.hr` & WRTC 2030 Slavonia)

The **World Radiosport Team Championship (WRTC)** is the quadrennial "Olympic Games" of amateur radio contesting, where two-person teams compete head-to-head for 24 hours (concurrently with the IARU HF World Championship in July) from identical field locations using identical antennas, 100W power limits, randomized special callsigns, and on-site referees [1][2][6].

### Core Facts Verified for WRTC 2030 Croatia
- **Host Organization:** **Hrvatski radioamaterski savez (HRS)** (`https://www.hamradio.hr/`, headquartered at Dalmatinska 12, Zagreb; ITU prefix `9A`) [1].
- **Sanctioning & Dates:** Formally sanctioned by the WRTC Sanctioning Committee (WRTC SC) on **October 3, 2026** at the Istria Contest Conference in Poreč for **July 2030** [1].
- **Geographic Venue:** **Slavonia (Northeastern Croatia)**, with competition sites and headquarters spanning **Osijek, Čepin, and Đakovo** [2].
- **Expanded 60-Team Format (120 Operators):** Per the WRTC 2030 Selection Rules v1.0 (approved October 19, 2026), the competition expands from 50 to **60 teams** [3]:
  - **50 Qualifying Teams** selected across global Qualification Areas (QAs) and sub-areas [3].
  - **1 Defending Champion Team** reserved for the WRTC 2026 UK champions (`DJ5MW` & `DM5EE`) [3][6].
  - **4 Sponsored Teams** (+2 over previous editions to co-finance the 60-station expansion) [3].
  - **3 Youth Teams** (dedicated youth qualification track based on best 6 scores) [3].
  - **2 Wild Card Teams** allocated by the Organizing Committee [3].
- **Qualification Pathway:** 24 designated HF contests over two years (up to 10 best normalized scores combined using category Weighting Factors), kicking off **December 19–20, 2026** with HRS's flagship **Croatian DX Contest (`9A DX Contest`)** [4].
- **Organizing Committee (OC) Leadership:**
  - **Chairman / President:** Mate Botica (`9A4M`) [5]
  - **Vice Chairman & Finance Lead:** Davor Kucelin (`9A1UN`) [5]
  - **Chief Advisor Team:** Nikola Perčin (`9A5W`) [5]
  - **Competition & Judging Lead:** Ivo Pezer (`9A3A`) [5]
  - **Site & Technical Operations Lead:** Zlatko Tonković (`9A2G`) [5]
  - **Referee / Judging Team Lead:** Darko Martinčević (`9A5X`) [5]
  - **Logistics Director:** Željko Dražić Karalić (`9A5R`) [5]
  - **IT, Scoring & Communications Lead:** Aleksandar Jugović (`9A3XV`) [5]
  - **Media & PR Director:** Ivan Mastilović (`YU1LA`) [5]
  - **Administrative Secretary:** Marija Sorić (`9A6PAX`) [5]
  - **Committee Member:** Mirko Jurman (`9A6KX`) [5]

---

## 3. Dimension 2: Benchmark Teardown of `wrtc2026.org` (UK) & Past Editions

Analyzing `https://www.wrtc2026.org/` (held in East Anglia, UK, July 7–13, 2026) alongside `wrtc2022.it` (Bologna) and `wrtc2018.de` (Wittenberg) reveals how a WRTC website must evolve across a **4-year lifecycle** [6][8]:

| Lifecycle Phase | Primary Website Job-to-be-Done | Key Features on `wrtc2026.org` / `wrtc2022.it` / `wrtc2018.de` |
| :--- | :--- | :--- |
| **Phase 1: Qualification & Fundraising (2026–2028)** | Drive global contest participation, track QA standings after each of the 24 events, and secure commercial/club/tent sponsors. | Selection Criteria & Q&A, **Interactive Qualification Standings** (filter by QA, callsign, Youth, contest), Commercial/Club Sponsor tiers, **Tent Sponsorship portal**, Personal Donations [6][8]. |
| **Phase 2: Team Selection & Logistics (2028–Early 2030)** | Onboard 60 Team Leaders + 60 Team Mates, 60+ Referees, hundreds of volunteers, and international visitors. | Team Application portals, **Sponsored Teams** showcase, Station Description & Antenna specs, **Volunteer & Coordinator signup**, Customs/Equipment paperwork, **Tourist Trips & HQ Hotel bookings**, Test Event logs [6]. |
| **Phase 3: Live Championship Week (July 2030)** | Broadcast "Olympics of Ham Radio" to tens of thousands of live online spectators worldwide. | **Interactive 60-Site Deployment Map**, Live Online Scoreboard integration, Special Event (`9A`) & Remote Stations, 64-page Commemorative Brochure, Daily Photo/Video Stream [6][8]. |
| **Phase 4: Post-Event Archive (Late 2030+)** | Permanent historical record for `wrtc.info` and the contesting community. | Final Judged Results, Score Penalties/Ubn reports, Full Cabrillo Log Archive, Awards Ceremony gallery [6][8]. |

### What `wrtc2026.org` Did Well vs. Where We Can Beat It
- **Keep from `wrtc2026.org`'s model:** Comprehensive operational transparency (Referee Handbook, Station Description, Customs Info, Q&A video/text, Tent Sponsorship recognition, Tourist Trips for spouses/visitors) [6].
- **Improve over `wrtc2026.org`:** `wrtc2026.org` suffered from sprawling, multi-level dropdown menus added piecemeal over 4 years, heavy reliance on static PDFs, and a dated template aesthetic. `wrtc2030.hr` can leapfrog it with a clean, phase-aware information architecture, native interactive standings, an interactive Slavonia site/propagation showcase, and bilingual (EN + HR) accessibility.

---

## 4. Dimension 3: Audit of Fast Preview (`wrtc2030.hr`) — Keep vs. Discard

The current site at `https://wrtc2030.hr/` was launched in October 2026 as a rapid informational launchpad right after the Poreč announcement and Selection Rules v1.0 approval [1][3][7].

### Decision Matrix: What to Keep, Refactor, and Discard from `wrtc2030.hr`

| Element on `wrtc2030.hr` | Verdict | Rationale & Action Plan |
| :--- | :---: | :--- |
| **Domain (`wrtc2030.hr`) & Official Emails (`wrtc2030@hamradio.hr`, `rules-wrtc2030@hamradio.hr`)** | **KEEP** | Official domain already cited by HRS, `cq.sk`, `jutarnji.hr`, and the WRTC SC [1][4][7]. Preserve URL redirects for existing rule links. |
| **Selection Rules v1.0, Weighting Factors (WF), QA Table & Score Calculation Examples** | **KEEP & UPGRADE** | Official SC-approved regulatory text [3][7]. Keep the exact content and downloadable PDFs, but convert the tables into an **interactive Qualification Explorer** (searchable QAs, interactive score calculator, and 24-contest calendar). |
| **Selection Criteria Q&A and Qualification Rules Q&A** | **KEEP & UPGRADE** | Crucial trust-builder for contesters [7]. Migrate into a **searchable, taggable FAQ component** with direct anchor links for forum sharing. |
| **Organizing Committee Roster (`WRTC Team`)** | **KEEP & ENHANCE** | All 11 key roles (`9A4M`, `9A1UN`, `9A5W`, `9A3A`, `9A2G`, `9A5X`, `9A5R`, `9A6KX`, `9A3XV`, `YU1LA`, `9A6PAX`) are verified [5]. Upgrade with callsign badges, QRZ.com links, portraits, and functional contact routing. |
| **Initial News Posts & Past Events History** | **KEEP** | Good foundational content (Poreč announcement, Rules v1.0 release, WRTC 1990–2026 history) [7]. Migrate into a structured News/Press engine. |
| **Visual Design & Generic Template Layout** | **DISCARD** | Looks like a hurried template clone with zero Croatian/Slavonian character or modern sports-championship energy [7]. Replace with the custom **"Croatia 9A / Golden Slavonia" Design System**. |
| **Cloned `wrtc2026.org` Menu Skeleton (`About Us / Competition / Past Events / Contact`)** | **REFACTOR** | Too narrow for a 4-year championship portal; buries Qualification Standings, Sponsorships/Donations, and Venue/Slavonia discovery [6][7]. Replace with a 6-pillar Championship IA. |
| **Static-Only Architecture (No Standings Database / No Sponsor Engine)** | **DISCARD** | Cannot support post-contest standings updates starting after Dec 19–20, 2026 (`9A DX Contest`) or online Tent/Team sponsorship tracking [4][7]. |

---

## 5. Cross-Dimension Insights: Defining the "Professional Croatian Touch"

Combining the HRS institutional context (`hamradio.hr`) [1], the Slavonia venue (Osijek, Čepin, Đakovo) [2], and the global radiosport audience yields a clear creative direction that avoids kitschy tourist tropes while feeling unmistakably Croatian:

1. **Visual Palette — "Adriatic Navy, Šahovnica Crimson & Slavonian Gold":**
   - **Primary Canvas:** Crisp White (`#F8FAFC`) and Deep Navy (`#0B1F3A`, echoing the Croatian coat of arms crown and HRS technical authority).
   - **Primary Accent:** Croatian Crimson (`#D62828` — used for live badges, CTAs, `9A` callsign highlights, and geometric *šahovnica* micro-accents).
   - **Regional Accent:** Slavonian Harvest Gold (`#D99B26` — *Zlatna Slavonija*, representing the golden plains of Osijek/Čepin/Đakovo and championship gold medals).
2. **Signature Graphic Motifs:**
   - **RF-Šahovnica Pattern:** A subtle, architectural 45-degree or fading checkerboard grid that morphs into radio-frequency waveforms / coaxial radiation patterns in hero headers and section dividers.
   - **Croatian Heritage & Technical Pride:** Subtle nods to Croatia's technical and radio heritage (the `9A` prefix badge, Glagolitic/Croatian interlace *pleter* border geometry reimagined as circuit/antenna lines, and Slavonia's legendary hospitality).
3. **"Why Slavonia?" — Turning Geography into a Radiosport Story:**
   - Global contesters know Dubrovnik and Split, not Osijek, Čepin, and Đakovo [2]. A dedicated **"Discover Slavonia & Venue"** section should connect the **technical advantage** (60 flat, open Pannonian field sites with zero terrain shadowing and identical take-off angles in every direction) with **cultural warmth** (Osijek's baroque Tvrđa fortress on the Drava river, Đakovo's UNESCO cathedral and Lipizzaner stud farm, Kopački Rit nature park, and Slavonian gastronomy/wines).
4. **Language Strategy:**
   - **English-first** (mandatory as the global language of WRTC and IARU contesting), with a clean **Croatian (`HR`) toggle** for domestic media (`jutarnji.hr`, HRT, local municipalities in Osijek-Baranja County), Croatian sponsors, Ministries, and HRS members [1][2].

---

## 6. Recommendations & Downstream BMad Bindings

1. **Proceed Immediately to Product Brief (`bmad-product-brief`) & UX Specification (`bmad-ux`) (`Confidence: High`):**
   - **Target Artifact:** `_bmad-output/planning-artifacts/brief.md` and `DESIGN.md` / `EXPERIENCE.md`.
   - **Binding:** Scope **Release 1.0 (Qualification & Sponsorship Launch — Target: Pre-Dec 19, 2026 `9A DX Contest`)** vs. **Release 2.0 (Interactive Standings Engine & Sponsor Portal)** vs. **Release 3.0 (2028–2030 Team/Referee/Live Event Portal)**.
2. **Adopt a 6-Pillar Information Architecture (`Confidence: High`):**
   - **Binding (PRD & UX):**
     1. **Home** (Hero countdown to 9A DX Contest & July 2030, Quick Standings widget, Latest News, Why Slavonia teaser, Sponsor ribbon)
     2. **Qualification & Rules** (Interactive Standings Leaderboard by QA/Youth, 24 Qualifying Contests Calendar, Selection Rules v1.0, Score Calculator/Examples, Searchable Q&A)
     3. **The Championship** (60-Team Format, Station & Antenna Setup, Judging & Referees, Past WRTC Archive 1990–2026)
     4. **Slavonia & Venue** (Osijek / Čepin / Đakovo Interactive Map, Why the Pannonian Plain for HF, Travel & Accommodation, Experience Croatia)
     5. **Sponsors & Support** (Sponsored Teams [4 slots], Tent Sponsorship Program [60 tents], Commercial & Club Tiers, Personal Donations)
     6. **About HRS & Team** (HRS `hamradio.hr` Host Profile, Organizing Committee `9A` Roster, Press/Media Kit, Contact Routing)
3. **Architect for Fast Editorial Updates + Structured Standings Data (`Confidence: High`):**
   - **Binding (`bmad-architecture`):** Coordinate with IT/Scoring Lead Aleksandar Jugović (`9A3XV`) [5] so the Qualification Standings component can ingest JSON/CSV exports from the scoring script after each of the 24 contests without manual HTML table editing.

---

## 7. Open Questions (For Planning Alignment)

1. **Tech Stack & Hosting Preference:** Does HRS / `9A3XV` want a modern static/SSR web app (e.g., Next.js / Astro + headless CMS or Markdown/JSON data) for maximum speed and custom interactive standings, or do they require WordPress so non-technical committee members can edit pages?
2. **Standings Engine Ownership:** Is the Qualification Standings calculation script already being built separately (emitting JSON/CSV/API), or should our web platform also include the admin upload/calculation pipeline?
3. **Sponsorship & Donation Payment Flow:** Should the website process Personal Donations and Tent Sponsorships directly online (Stripe / PayPal / IBAN QR barkod for Croatia), or route through an HRS sponsorship inquiry form first?

---

## 8. Source Appendix

| Ref | Claim / Finding Supported | Publisher | Pub Date | Accessed | Confidence |
| :---: | :--- | :--- | :---: | :---: | :---: |
| [1] | WRTC SC officially approved HRS (*Hrvatski radioamaterski savez*) on Oct 3, 2026 at the Istria Contest Conference in Poreč to host WRTC 2030 in July 2030 | [Hrvatski radioamaterski savez (hamradio.hr)](https://www.hamradio.hr/) | 2026-10-03 | 2026-10-25 | High (Verified) |
| [2] | WRTC 2030 venue is in Slavonia, Croatia, spanning Osijek, Čepin, and Đakovo, bringing 120 elite operators under identical technical conditions | [Jutarnji list / HRS](https://www.jutarnji.hr/) | 2026-10 | 2026-10-25 | High (Verified) |
| [3] | WRTC 2030 Selection Rules v1.0 (approved Oct 19, 2026) expand the field to 60 teams: 50 QA qualifiers, 1 Defending Champion, 4 Sponsored Teams, 3 Youth Teams, 2 Wild Cards | [WRTC 2030 Organizing Committee (wrtc2030.hr)](https://www.wrtc2030.hr/) | 2026-10-19 | 2026-10-25 | High (Verified) |
| [4] | Two-year qualification process spans 24 international/regional contests (best 10 scores; best 6 for Youth), starting with the Croatian 9A DX Contest on Dec 19–20, 2026 | [Hrvatski radioamaterski savez (hamradio.hr)](https://www.hamradio.hr/) | 2026-10-19 | 2026-10-25 | High (Verified) |
| [5] | WRTC 2030 Organizing Committee roster led by Chairman Mate Botica (9A4M), Vice Chairman Davor Kucelin (9A1UN), and 9 directors (`9A5W`, `9A3A`, `9A2G`, `9A5X`, `9A5R`, `9A6KX`, `9A3XV`, `YU1LA`, `9A6PAX`) | [WRTC 2030 Organizing Committee (wrtc2030.hr)](https://www.wrtc2030.hr/) | 2026-10 | 2026-10-25 | High (Verified) |
| [6] | `wrtc2026.org` UK benchmark IA (6 pillars: About, Competition, Qualification & Teams, Events & Bookings, Sponsors & Volunteers, Contact), Tent Sponsors, Sponsored Teams, Referee Handbook, and East Anglia July 2026 results (`DJ5MW` & `DM5EE` champions) | [WRTC 2026 UK (wrtc2026.org)](https://www.wrtc2026.org/) | 2026-07 | 2026-10-25 | High (Verified) |
| [7] | `wrtc2030.hr` fast-preview audit: mirrors early `wrtc2026.org` menu taxonomy (`About Us`, `Competition`, `Past Events`, `Contact`), houses valid Selection Rules v1.0 and Q&A, but lacks interactive standings, sponsorship funnels, and Croatian/Slavonian brand identity | [WRTC 2030 Official Portal (wrtc2030.hr)](https://www.wrtc2030.hr/) | 2026-10 | 2026-10-25 | High (Verified) |
| [8] | Historical WRTC portals (`wrtc2022.it` Bologna, `wrtc2018.de` Wittenberg, `wrtc.info`) confirm interactive qualification standings, 60+ tent deployment maps, and live scoreboards as core multi-year platform requirements | [WRTC Archive (wrtc.info)](https://wrtc.info/) | 2026-07 | 2026-10-25 | High (Verified) |

---

## 9. Staleness Map

Computed via `recon_kit.py staleness` against Competitive & Domain freshness windows (`features`: 3 months, `pricing/funding`: 3 months, `positioning`: 3 months, `rules`: 6 months, `player-landscape`: 18 months, `structure`: 36 months):

| Claim Class | Representative Claim | Pub Date | Freshness Window | Re-check Date | Status |
| :--- | :--- | :---: | :---: | :---: | :---: |
| `features` / `positioning` | `wrtc2030.hr` fast-preview feature state & post-9A DX Contest standings launch [7] | 2026-10 | 3 mo | **2027-01-01** | Fresh |
| `rules` | WRTC 2030 Selection Rules v1.0 & 24 Qualifying Contests schedule [3][4] | 2026-10-19 | 6 mo | **2027-04-19** | Fresh |
| `player-landscape` | WRTC 2030 Organizing Committee roster & leads [5] | 2026-10 | 18 mo | **2028-04-01** | Fresh |
| `structure` | Slavonia venue (Osijek, Čepin, Đakovo) & July 2030 schedule [1][2] | 2026-10-03 | 36 mo | **2029-10-03** | Fresh |

- **Earliest Re-check Date:** **2027-01-01** (immediately following the first qualifying contest, the **9A DX Contest on Dec 19–20, 2026**, when first qualification standings and initial sponsors go live).
