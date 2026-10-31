# Epic 4 Context: Croatia & Slavonia Tourism/Venue Showcase, Clean Sponsors Hub & Grounded AI Concierge

<!-- Compiled from planning artifacts. Edit freely. Regenerate with compile-epic-context if planning docs change. -->

## Goal

Showcase Croatia and the Slavonian host region (`/croatia-slavonia/` covering the 60-station propagation arena, Osijek, Đakovo, Čepin, Kopački Rit, accommodations, gastronomy, and international travel logistics), deliver the clean static Sponsors & Partners hub (`/sponsors/`), and embed the grounded on-page WRTC 2030 & Slavonia AI Assistant (`/api/chat` + `<WrtcAiAssistant />`) so international contesters, referees, visiting families, and sponsors have an authoritative guide.

## Stories

- Story 4.1: Croatia & Slavonia Propagation Arena, Accommodation, Gastronomy & Travel Guide (`/croatia-slavonia/`)
- Story 4.2: Clean, Dignified Static Sponsors & Partners Hub (`/sponsors/`)
- Story 4.3: Grounded WRTC 2030 Croatia & Slavonia AI Assistant (`/api/chat` + `<WrtcAiAssistant />`)

## Requirements & Constraints

- **Pannonian Propagation Arena & Venue Guide (`FR-7`, `FR-8`):** Dedicated `/croatia-slavonia/` route pre-rendered statically with technical details on the flat Pannonian plains (`0°` horizon take-off, `85m–110m ASL`, uniform soil conductivity, 60 identical stations), regional cards for **Osijek** (Tvrđa baroque fortress, Drava promenade, hotels), **Đakovo** (St. Peter's Cathedral, State Lipizzaner Stud Farm), **Čepin** (field station plains), **Kopački Rit Nature Park**, Slavonian gastronomy (*slavonski kulen*, *fiš paprikaš*, *čobanac*, Graševina wine routes), and international arrival corridors (`ZAG`, `OSI`, `BUD`, `BEG` airports and A3/A5 highways).
- **Strictly Non-Transactional Sponsorship Hub (`AD-6`, `FR-10`):** `/sponsors/` and the homepage sponsor strip are strictly static Server Components driven by `data/sponsors.json` (grouped into `Institutional Host`, `Corporate & Equipment Tiers`, `Club Sponsors`, and `Individual Donors`) with direct `mailto:wrtc2030@hamradio.hr` partnership links. **Zero** payment gateways, crowdfunding meters, bidding widgets, or 60-tent reservation grids.
- **Grounded Serverless AI Concierge (`AD-7`, `FR-13`):** Accessible floating `<WrtcAiAssistant />` drawer communicating with Next.js Route Handler `/api/chat` (Netlify Serverless Function) backed by build-time-compiled knowledge bundle `data/knowledge/wrtc2030-and-slavonia-kb.json`. Cites exact Selection Rules v1.0 sections for rules questions and gives concrete guidance for Osijek/Đakovo/Croatia travel. Falls back deterministically to local keyword retrieval when no LLM API key is set so preview and test runs always pass out of the box with zero third-party cookies (`NFR-3`).

## Technical Decisions

- **Static Pre-rendering:** `/croatia-slavonia/` and `/sponsors/` compile with `export const dynamic = 'error'`.
- **Knowledge Base Compilation:** Pre-compiled JSON knowledge base bundled server-side for fast `< 100ms` lookup.
- **Security:** API keys (`GEMINI_API_KEY` / `OPENAI_API_KEY`) remain strictly server-side in Netlify environment variables.

## UX & Interaction Patterns

- **Floating AI FAB:** Fixed bottom-right launcher button (`height: 52px`, pill shape, `#273B8F` gradient with red badge) opening accessible drawer (`Escape` to close, quick-prompt pills for scoring, hotels, food, and youth).
- **Visual Polish:** Proposal 1 brand motifs (`.checker`, `<CheckerFive />`, `<KockiceCluster />`) throughout venue cards and sponsor tiers.

## Cross-Story Dependencies

- **Story 4.1 & 4.2 → Story 4.3:** The AI Concierge knowledge bundle in Story 4.3 synthesizes content from the rules (Epics 2 & 3), venue guides (4.1), and sponsor guidelines (4.2).
- **Epics 1–3 → Epic 4:** Epic 4 completes the comprehensive four-epic web platform.
