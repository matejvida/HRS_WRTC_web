---
title: 'Story 4.3: Grounded WRTC 2030 Croatia & Slavonia AI Assistant (/api/chat + <WrtcAiAssistant />)'
type: 'feature'
created: '2026-10-31'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
context:
  - '_bmad-output/implementation-artifacts/epic-4-context.md'
  - '_bmad-output/implementation-artifacts/spec-4-1-croatia-slavonia-propagation-arena-accommodation-gastronomy.md'
  - '_bmad-output/implementation-artifacts/spec-4-2-clean-dignified-static-sponsors-partners-hub-sponsors.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Visitors have diverse questions ranging from complex qualification scoring math (e.g. Multi-Op caps, Outside-QA score scaling) to visiting Slavonia (hotels in Osijek, *slavonski kulen*, travel from Zagreb or Belgrade). Sifting through static documents can be tedious, while ungrounded public LLMs hallucinate contest rules or regional facts.

**Approach:** Build a grounded AI Concierge system (`AD-7`) consisting of:
1. `<WrtcAiAssistant />`: An accessible floating button (`#ai-fab`) and slide-up drawer (`#ai-drawer`) mounted globally across the site with quick-preset prompt pills (`Scoring Formula & Caps?`, `Hotels in Osijek & Đakovo?`, `Slavonian Food & Wine?`, `Youth Teams (U25)?`).
2. `/api/chat` Route Handler (`src/app/api/chat/route.ts`): Serverless endpoint backed by a build-time-compiled knowledge bundle (`data/knowledge/wrtc2030-and-slavonia-kb.json`) combining Selection Rules v1.0, Q&A, 24 events, 29 QA quotas, and Slavonia hospitality guides. When no external LLM API key (`GEMINI_API_KEY` / `OPENAI_API_KEY`) is set in the environment, `/api/chat` deterministically falls back to structured keyword retrieval over the knowledge bundle so tests, CI, and local previews always work out of the box with zero third-party cookies (`NFR-3`).

## Boundaries & Constraints

**Always:**
- Follow `AD-7`: The assistant must be grounded in the local knowledge bundle and cite exact Selection Rules v1.0 sections (`e.g., Section 5.A, Table 2`).
- Provide an accessible floating launcher: `height: 52px`, pill shape, `#273B8F` gradient with red badge, keyboard navigable (`Escape` to close drawer).
- Implement deterministic fallback retrieval when `GEMINI_API_KEY` / `OPENAI_API_KEY` is not present, ensuring CI and offline testing pass 100% reliably.
- Maintain zero third-party tracking cookies (`NFR-3`).
- Set zero horizontal overflow on mobile viewports (`320px–430px`).

**Never:**
- Never expose API keys or LLM credentials in client-side JavaScript bundles.
- Never answer off-topic questions unrelated to WRTC 2030, amateur radio, or visiting Croatia and Slavonia.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Quick Preset Pill Click | User taps `Scoring Formula & Caps?` | Injects query and returns grounded explanation citing Section 5 and Section 6 formula | Displays in drawer message box |
| Rules Question (No API Key) | User asks `"How many events count?"` | Serverless handler falls back to knowledge bundle, returning best 10 of 24 with caps | Deterministic fallback response |
| Tourism Question | User asks `"What food should I try in Slavonia?"` | Returns curated guide covering *čobanac*, *fiš paprikaš*, *slavonski kulen*, and Graševina | Grounded in local hospitality bundle |
| Off-Topic Question | User asks `"Write a poem about quantum physics"` | Politely declines: *"I am the WRTC 2030 Croatia Assistant. I can only answer questions about WRTC 2030 rules, qualification, and visiting Croatia/Slavonia."* | Refusal guardrail |

</frozen-after-approval>

## Code Map

- `data/knowledge/wrtc2030-and-slavonia-kb.json` -- Curated RAG knowledge bundle covering rules, QAs, events, and Slavonia guides.
- `src/lib/assistant/kb-retriever.ts` -- Server-side knowledge retrieval engine with keyword scoring and section citation.
- `src/app/api/chat/route.ts` -- Serverless Next.js Route Handler managing LLM execution and deterministic fallback retrieval.
- `src/components/assistant/WrtcAiAssistant.tsx` -- Floating action button (`#ai-fab`) and slide-up drawer (`#ai-drawer`).
- `src/app/layout.tsx` -- Mount `<WrtcAiAssistant />` globally in the root layout.
- `tests/unit/ai-assistant-api.test.ts` -- Unit tests verifying route handler responses, citation accuracy, fallback logic, and guardrails.
- `tests/e2e/ai-assistant.spec.ts` -- E2E tests verifying drawer opening, quick pills, keyboard dismissal, and chat interaction.

## Tasks & Acceptance

**Execution:**
- [x] `data/knowledge/wrtc2030-and-slavonia-kb.json`, `src/lib/assistant/kb-retriever.ts` -- Build knowledge base bundle and retrieval module -- Satisfies `FR-13`, `AD-7`.
- [x] `src/app/api/chat/route.ts` -- Implement serverless chat route handler with deterministic fallback and guardrails -- Satisfies `FR-13`, `AD-7`.
- [x] `src/components/assistant/WrtcAiAssistant.tsx`, `src/app/layout.tsx` -- Implement global floating assistant drawer -- Satisfies `FR-13`, `NFR-2`.
- [x] `tests/unit/ai-assistant-api.test.ts`, `tests/e2e/ai-assistant.spec.ts` -- Write failing unit and E2E tests covering API queries, citations, and UI drawer -- Enforces TDD Red phase.

**Acceptance Criteria:**
- Given a query to `/api/chat` about qualification scoring, when processed without an API key, then it deterministically returns the Selection Rules v1.0 formula citing Section 5 and Section 6 (`FR-13`, `AD-7`).
- Given a query about Slavonian accommodation or food, when submitted, then it recommends hotels in Osijek/Đakovo and dishes (*kulen*, *fiš paprikaš*, *čobanac*) (`FR-13`).
- Given an off-topic query, when processed, then the response politely refuses (`FR-13`).
- Given a visitor on mobile or desktop, when tapping `#ai-fab`, then the drawer opens smoothly with preset pills and zero cookie creation (`FR-13`, `NFR-3`).

## Implementation Notes
- Created `data/knowledge/wrtc2030-and-slavonia-kb.json` containing 8 structured knowledge categories (rules scoring, youth U25, 24 qualifying contests, 29 QAs, venue RF geography, Osijek/Đakovo hotels, gastronomy, and transit).
- Implemented `src/lib/assistant/kb-retriever.ts` providing keyword scoring, exact section citations, and refusal guardrails.
- Implemented serverless `/api/chat` route handler (`src/app/api/chat/route.ts`) supporting optional LLM API keys with deterministic fallback retrieval.
- Implemented `<WrtcAiAssistant />` mounted globally in `src/app/layout.tsx` with floating action button (`#ai-fab`), slide-up drawer (`#ai-drawer`), preset pills, and full keyboard/Escape accessibility.
- Zero tracking cookies set or evaluated (`NFR-3`).

## Spec Change Log
- 2026-10-31: Initial specification and successful completion of Story 4.3.

## Review Triage Log
- All unit tests and Playwright E2E tests pass.

## Verification

**Commands:**
- `npm run validate:data` -- exited 0
- `npm run test:unit` -- 12 test files / 80 tests passed
- `npm run build` -- 14 static pages + `/api/chat` compiled cleanly
- `npx playwright test` -- 64 tests passed
