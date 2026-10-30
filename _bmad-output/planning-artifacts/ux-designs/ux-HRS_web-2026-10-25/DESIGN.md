---
name: WRTC 2030 Croatia — Proposal 1: Dynamic "Kockice & 9A Airwaves" (Official Logo & Croatian Checkers)
status: final
updated: 2026-10-25
description: Official Championship Platform for WRTC 2030 hosted by Hrvatski radioamaterski savez (HRS) in Slavonia, Croatia (Osijek, Čepin, Đakovo). Next.js 15 (App Router) + Tailwind CSS + shadcn/ui, implementing Proposal 1 ("Dynamic Kockice & 9A Airwaves") with the official wrtc2030.hr SVG logos, kinetic Croatian checker mosaic, 9A propagation arcs, Barlow Condensed / Barlow / JetBrains Mono typography, and Day/Night theme system.
colors:
  # Day Mode (Default) — preserved from wrtc2030.hr + Golden Slavonia accent
  background: '#FFFFFF'
  surface: '#F3F4F7'
  card: '#FFFFFF'
  border: '#E4E6EC'
  foreground: '#14142B'
  muted: '#4B4F63'
  primary: '#273B8F'
  primary-foreground: '#FFFFFF'
  red: '#ED1C24'
  gold: '#D99B26'
  # Night Mode ([data-theme="night"]) — preserved from wrtc2030.hr
  background-dark: '#0D1333'
  surface-dark: '#161E45'
  card-dark: '#121940'
  border-dark: '#262E57'
  foreground-dark: '#FFFFFF'
  muted-dark: '#B4BAD6'
  primary-dark: '#8EA2FF'
typography:
  display:
    fontFamily: 'Barlow Condensed, sans-serif'
    fontSize: 56px
    fontWeight: '800'
    lineHeight: '1.0'
    textTransform: 'uppercase'
  body:
    fontFamily: 'Barlow, system-ui, sans-serif'
    fontSize: 17px
    fontWeight: '400'
    lineHeight: '1.65'
  mono:
    fontFamily: 'JetBrains Mono, ui-monospace, monospace'
    fontSize: 13px
    fontWeight: '700'
rounded:
  sm: 4px
  md: 10px
  lg: 14px
  xl: 20px
spacing:
  # 4px base scale; section vertical padding 104px desktop / 56px mobile; max container width 1200px
components:
  checker-mark:
    color: '{colors.red}'
    sizes: 'sm (6px), default (7px), md (8px), lg (10px)'
  kicker:
    fontFamily: '{typography.mono.fontFamily}'
    color: '{colors.primary}'
    letterSpacing: '0.12em'
    textTransform: 'uppercase'
  callsign-badge:
    color: '{colors.primary}'
    fontFamily: '{typography.mono.fontFamily}'
---

## Brand & Style

**WRTC 2030 Croatia (`wrtc2030.hr`)** builds directly upon the clean visual identity established in the initial `wrtc2030.hr` launch and expands it into a full multi-year championship platform (similar in scope to `wrtc2026.org`) with tasteful Croatian and Slavonian touches.

### Official Logo (Kept Verbatim from `wrtc2030.hr`)
- **Day Logo (`imports/wrtc-logo.svg`):** Bold Royal Blue (`#273B8F`) `WRTC 2030` + `WORLD RADIOSPORT TEAM CHAMPIONSHIP`, paired with Croatian Red (`#ED1C24`) `CROATIA` along the base and **5 staggered diagonal red checker squares** on the right flank.
- **Night Logo (`imports/wrtc-logo-white.svg`):** Crisp White (`#FFFFFF`) `WRTC 2030` + `WORLD RADIOSPORT TEAM CHAMPIONSHIP`, with Croatian Red (`#ED1C24`) `CROATIA` and the 5 red checker squares preserved at full vibrancy.
- **Rule:** Never substitute or redraw the official WRTC 2030 Croatia SVG mark.

### Signature Croatian Checkers Motif — Proposal 1: Dynamic "Kockice & 9A Airwaves"
Rather than leaving the page as flat white space like the fast preview (`wrtc2030.hr`), we adopt **Proposal 1 ("Dynamic Kockice & 9A Airwaves")**, giving the championship a crisp Olympic / UEFA Euro broadcast visual identity strictly anchored in the official logo's colors (`#273B8F` Royal Blue, `#ED1C24` Checker Red, `#0D1333` Shack Navy):
1. **Hero Kinetic Kockice Mosaic & 9A Propagation Arcs (`.p1-kockice-mosaic`):** A deep Royal Blue & Shack Navy (`linear-gradient(135deg, #0D1333 0%, #1D2D73 60%, #273B8F 100%)`) hero canvas featuring stepped Croatian `#ED1C24` red and translucent white `80×80` geometric squares radiating from the top-right corner, intersected by concentric `9A` radio propagation rings (`stroke-dasharray`) and paired with a frosted **Croatian Championship Passport Card** (`border-top: 4px solid #ED1C24`).
2. **Full-Width Croatian Checker Ribbon Dividers (`.checker-ribbon`):** Crisp `12px` alternating `#ED1C24` checkerboard structural strips framing the header-to-hero transition and the pre-footer boundary.
3. **Section Kickers & Header Accent Bars (`.checker` & `.section-head::after`):** A `2×2` diagonal red checker grid (`6px–10px` squares) preceding every monospace uppercase section kicker, paired with a `96px` `#ED1C24` red accent bar along the bottom rule of every section header.
4. **Stepped 5-Square Logo Motif (`.checker-five`) & Corner Clusters (`.kockice-cluster`):** Echoing the exact 5 staggered red squares on the right flank of `wrtc-logo.svg` in the Championship Passport Card, section headers, and the Slavonia Pannonian Propagation Arena showcase card.

## Colors

Preserves the exact Day/Night CSS custom property palette from `wrtc2030.hr`, accented with a warm Slavonian gold highlight for #1 leaderboard positions and regional storytelling:

- **Croatian Royal Blue (`#273B8F` Day / `#8EA2FF` Night):** Primary brand accent (`--accent`). Used for logo lettering, primary pill buttons, active doc tabs, callsigns, kickers, and stat numbers.
- **Croatian Checker Red (`#ED1C24`):** Used for the `CROATIA` logo wordmark, `.checker` geometric squares, `.doc-note` left borders, and live contest badges.
- **Day Canvas (`#FFFFFF` bg / `#F3F4F7` surface / `#14142B` text / `#E4E6EC` line):** Crisp, high-contrast editorial daylight theme.
- **Night Canvas (`#0D1333` bg / `#161E45` surface / `#121940` card / `#262E57` line):** Deep midnight blue Contest-Shack dark mode, toggled via the header `Day | Night` pill switch.
- **Slavonian Gold (`#D99B26`):** Subtle secondary accent used for Trophy / Defending Champion badges and Golden Slavonia (*Zlatna Slavonija*) regional highlights.

## Typography

Preserves the exact three-font system from `wrtc2030.hr`:
- **Display Headlines (`Barlow Condensed`, 700 & 800, Uppercase):**
  - Hero / Announcement Title: `72px–96px` (`line-height: 0.92–0.95`)
  - Section Title (`.section__title`): `56px` desktop / `40px` mobile (`line-height: 1.0`)
  - Doc Heading `H2`: `40px` (`weight: 800`); `H3`: `28px` (`weight: 700`)
- **Body Copy (`Barlow`, 400 / 500 / 600 / 700):** `17px–19px` (`line-height: 1.65`) for effortless reading across long rule documents and news posts.
- **Monospace Telemetry (`JetBrains Mono`, 700):** `13px–19px` for section kickers, amateur radio callsigns (`9A4M`, `DJ5MW`), contest formulas, dates, and Qualification Standings tables.

## Layout & Spacing

- **Container (`.wrap`):** `max-width: 1200px`, `padding-inline: 40px` (`16px` on `≤900px`).
- **Section Rhythm (`.section`):** `padding-block: 104px` (`56px` on mobile), separated by `1px solid var(--line)`.
- **Documentation Split Layout (`.doc-layout`):** `280px` sticky left sidebar (`.doc-side` with `.doc-tabs` + collapsible `.toc` with numbered `.toc__num` links) + `minmax(0, 1fr)` main article column (`max-width: 820px`).

## Components

- **`.site-header`:** Sticky `84px` header with the official Day/Night SVG logo on the left, horizontal `.site-nav` links (`44px` min-height, pill CTA for Contact), and the `Day | Night` segmented `.theme-switch`.
- **`.checker` & `.checker-cluster`:** Pure CSS grid checker marks (`2×2` diagonal or `2×3` 5-square logo motif) placed in kickers, callout boxes, card corners, and table captions.
- **`StandingsTable` (`.doc-table`):** Rounded `14px` bordered table container with monospace uppercase caption (`padding: 14px 16px`), instant filter tabs by Qualification Area (`29 QAs` across EU, NA, AS, AF, SA, OC + `Youth`), and callsign search.
- **`SponsorShowcaseGrid` (Modelled on `wrtc2026.org`):** Clean, non-interactive tiered logo & callsign cards (Commercial Sponsors, Club Sponsors, Individual Supporters, and info on the 4 Sponsored Team slots whose formal application opens after 1 January 2029 per Rule 8.D).

## Do's and Don'ts

| Do | Don't |
|---|---|
| Use the official `wrtc-logo.svg` (Day) and `wrtc-logo-white.svg` (Night) from `wrtc2030.hr` | Invent a replacement CSS square logo |
| Place `.checker` (`2×2`) and `.checker-cluster` (`5-square` logo pattern) in neat architectural spots (kickers, callouts, card corners, breadcrumbs, footer divider) | Overcrowd body paragraphs with checker backgrounds that reduce readability |
| Present Sponsors & Supporters as clean, dignified recognition tiers with contact via `wrtc2030@hamradio.hr` (and note Rule 8.D's Jan 1, 2029 timeline for Sponsored Teams) | Add unrequested interactive tent-picking seat maps, crowdfunding progress bars, or live auction widgets |
| Preserve `Barlow Condensed` + `Barlow` + `JetBrains Mono` and the `Day / Night` theme switch | Mix incompatible serif fonts or break the Day/Night token contrast |
