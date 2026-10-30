---
title: 'Story 1.1: Project Scaffold, Official Brand Assets, Zero-FOUC Theme & GitHub → Netlify Pipeline'
type: 'feature'
created: '2026-10-30'
status: 'done'
route: 'dispatch'
baseline_commit: 'cb55f2f5c498b1bfee1344c30ee2cae1afedb26a'
review_loop_iteration: 0
context:
  - '_bmad-output/implementation-artifacts/epic-1-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The repository currently holds planning artifacts and static stakeholder previews in `docs/`, but lacks the executable Next.js 15 App Router project, canonical `wrtc2030.hr` SVG brand assets and Selection Rules v1.0 PDFs, reusable Proposal 1 Croatian checker primitives, zero-FOUC Day/Night theme infrastructure, responsive mobile navigation shell, and automated TDD + Netlify CI/CD pipeline required by all downstream stories.

**Approach:** Initialize the Next.js 15.2 (App Router) + React 19 + TypeScript 5.7 + Tailwind CSS 4 project at the repository root (preserving `docs/` for the GitHub Pages Stakeholder Portal), populate `public/brand/` and `public/files/` with the official `wrtc2030.hr` SVGs and Selection Rules v1.0 PDFs, build and test the brand primitives (`WrtcLogo`, `CheckerMark`, `CheckerFive`, `CheckerRibbon`, `KockiceCluster`) and sticky mobile-first `SiteHeader` / `SiteFooter` with zero-FOUC `data-theme="day" | "night"` switching via TDD (`Vitest` + `Playwright` Desktop & Mobile), and configure `netlify.toml` and `.github/workflows/ci-netlify.yml`.

## Boundaries & Constraints

**Always:**
- Preserve `docs/` and the GitHub Pages workflow job untouched so `https://matejvida.github.io/HRS_WRTC_web/` remains live for stakeholders.
- Follow strict TDD (`Red → Green → Refactor`): write failing `Vitest` unit/component tests and `Playwright` E2E tests (`Desktop Chrome 1440×900` and `Mobile iPhone 375×812`) before implementing components.
- Use the official `wrtc-logo.svg` (Day) and `wrtc-logo-white.svg` (Night) from `wrtc2030.hr` in `public/brand/` and store all 3 Selection Rules v1.0 PDFs in `public/files/`.
- Initialize `data-theme="day" | "night"` on `<html>` via a synchronous inline `<script>` in `src/app/layout.tsx` reading `localStorage.getItem('wrtc2030-theme')` (fallback to `prefers-color-scheme: dark`) with zero FOUC and zero hydration mismatch.
- Configure `Barlow Condensed` (`--font-display`, 700/800 uppercase), `Barlow` (`--font-sans`, 400–700), and `JetBrains Mono` (`--font-mono`, 600/700 `tabular-nums`).
- Enforce mobile ergonomics (`320px–430px`): collapsible Hamburger Drawer (`< 920px`) with `≥ 44×44px` tap targets, `aria-expanded`, `Escape` dismissal, and zero horizontal overflow (`scrollWidth <= clientWidth`).

**Never:**
- Never modify global directories (`~/.claude/`, `~/.agents/`, `~/.gemini/skills/`) per `AGENTS.md`.
- Never invent a replacement logo or set third-party tracking cookies (`NFR-3`).

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| First visit (OS light) | `wrtc2030-theme` unset, `prefers-color-scheme: light` | `<html data-theme="day">` before paint; `wrtc-logo.svg` visible, Night logo hidden via CSS | Fallback to `"day"` if `localStorage` throws |
| First visit (OS dark) | `wrtc2030-theme` unset, `prefers-color-scheme: dark` | `<html data-theme="night">` before paint; `wrtc-logo-white.svg` visible, Day logo hidden | Fallback to `"day"` if `matchMedia` unavailable |
| Theme toggle (`Day ↔ Night`) | User clicks `Night` or `Day` button in `ThemeToggle` | Updates `<html data-theme>`, persists `"day" \| "night"` in `localStorage('wrtc2030-theme')`, updates `aria-pressed="true"` | Normalize invalid stored values to `"day"` |
| Mobile navigation (`< 920px`) | User taps Hamburger button (`≥ 44×44px`) on `375×812` | Opens mobile drawer (`aria-expanded="true"`), exposes nav links (`≥ 44×44px` height); `Escape` or link click closes drawer | Zero horizontal overflow (`scrollWidth <= clientWidth`) |

</frozen-after-approval>

## Code Map

- `docs/site-preview.html` -- Reference inline SVGs for `wrtc-logo.svg` (lines 711–767) and `wrtc-logo-white.svg` (lines 769–792) and Proposal 1 tokens (`#273B8F`, `#ED1C24`, `#0D1333`, `#D99B26`); preserve `docs/` unchanged.
- `netlify.toml` & `.github/workflows/ci-netlify.yml` -- Upgrade to Next.js build (`@netlify/plugin-nextjs`) and Node 22 CI gates (`validate:data`, `typecheck`, `test:unit`, `build`, `test:e2e`) while keeping `deploy-github-pages`.
- `package.json`, `tsconfig.json`, `next.config.ts`, `vitest.config.ts`, `playwright.config.ts`, `scripts/validate-data.ts` -- Next.js 15.2 + React 19 + TypeScript 5.7 + Tailwind CSS 4 + Vitest + Playwright configs.
- `public/brand/wrtc-logo.svg`, `public/brand/wrtc-logo-white.svg`, `public/brand/hrs-logo.svg` -- Official SVG logos.
- `public/files/wrtc-2030-selection-rules-v1.0.pdf`, `public/files/wrtc-2030-selection-rules-qa-v1.0.pdf`, `public/files/wrtc-2030-score-calculation-examples.pdf` -- Official Selection Rules v1.0 PDFs from `wrtc2030.hr`.
- `src/components/brand/WrtcLogo.tsx` & `src/components/brand/CheckerMark.tsx` -- Dual-theme `<WrtcLogo />` and `<CheckerMark />`, `<CheckerFive />`, `<CheckerRibbon />` (plus alias `<CheckerStrip />`), `<KockiceCluster />`.
- `src/components/layout/ThemeToggle.tsx`, `src/components/layout/SiteHeader.tsx`, `src/components/layout/SiteFooter.tsx` -- Day/Night switcher, sticky header with mobile Hamburger Drawer (`< 920px`), and HRS footer.
- `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx` -- Semantic Day/Night CSS variables, Google Fonts, inline zero-FOUC script, and Proposal 1 Hero + Championship Brief homepage shell.

## Tasks & Acceptance

**Execution:**
- [x] `package.json`, `tsconfig.json`, `next.config.ts`, `vitest.config.ts`, `playwright.config.ts`, `.gitignore`, `scripts/validate-data.ts` -- Initialize Next.js 15.2 + React 19 + TypeScript 5.7 + Tailwind CSS 4 + Vitest + Playwright (`Desktop Chrome 1440×900` & `Mobile iPhone 375×812`) -- Establishes the build and TDD harness (`AD-8`, `AD-9`).
- [x] `public/brand/wrtc-logo.svg`, `public/brand/wrtc-logo-white.svg`, `public/brand/hrs-logo.svg`, `public/files/wrtc-2030-selection-rules-v1.0.pdf`, `public/files/wrtc-2030-selection-rules-qa-v1.0.pdf`, `public/files/wrtc-2030-score-calculation-examples.pdf` -- Populate official SVG logos and the 3 Selection Rules v1.0 PDFs (valid `%PDF-` headers) -- Satisfies `FR-1`, `FR-5`, `AD-1`.
- [x] `tests/unit/brand-and-header.test.tsx`, `tests/e2e/foundation.spec.ts` -- Write failing `Vitest` unit/component tests and `Playwright` Desktop + Mobile E2E tests covering brand primitives, `ThemeToggle` I/O matrix cases, zero-FOUC theme script, and mobile Hamburger Drawer (`≥ 44×44px` targets, `Escape` close, zero horizontal overflow) -- Enforces `FR-15` and `AD-9` TDD Red phase.
- [x] `src/components/brand/WrtcLogo.tsx`, `src/components/brand/CheckerMark.tsx` -- Implement `<WrtcLogo />`, `<CheckerMark />`, `<CheckerFive />`, `<CheckerRibbon />` (with `<CheckerStrip />` alias), and `<KockiceCluster />` -- Satisfies `FR-1`, `FR-2`, `AD-1`, `UX-DR2`.
- [x] `src/components/layout/ThemeToggle.tsx`, `src/components/layout/SiteHeader.tsx`, `src/components/layout/SiteFooter.tsx` -- Implement `<ThemeToggle />`, sticky `<SiteHeader />` with collapsible mobile Hamburger Drawer (`< 920px`), and `<SiteFooter />` -- Satisfies `FR-1`, `NFR-2`, `NFR-3`, `UX-DR3`.
- [x] `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx` -- Configure Proposal 1 CSS tokens (`#273B8F`, `#ED1C24`, `#0D1333`, `#D99B26`), `Barlow Condensed` / `Barlow` / `JetBrains Mono` (`tabular-nums`) fonts, inline zero-FOUC theme script, and Proposal 1 Hero + Championship Brief homepage shell (`export const dynamic = 'error'`) -- Satisfies `AD-2`, `NFR-1`, `NFR-2`, `UX-DR1`.
- [x] `netlify.toml`, `.github/workflows/ci-netlify.yml` -- Configure `@netlify/plugin-nextjs` and CI gates (`validate:data`, `typecheck`, `test:unit`, `build`, `test:e2e`) alongside `deploy-github-pages` -- Satisfies `FR-14`, `AD-8`.

**Acceptance Criteria:**
- Given the repository root, when `npm run validate:data` runs, then it verifies `public/brand/wrtc-logo.svg`, `public/brand/wrtc-logo-white.svg`, and `public/brand/hrs-logo.svg` contain `<svg` markup and the 3 official PDFs in `public/files/` start with valid `%PDF-` headers (`FR-1`, `FR-5`, `AD-1`).
- Given a visitor loads `/` in Day or Night mode, when `src/app/layout.tsx` renders, then the inline `<script>` sets `data-theme="day" | "night"` on `<html>` before paint with zero FOUC and zero third-party cookies (`AD-2`, `NFR-3`).
- Given the brand components, when `<WrtcLogo />`, `<CheckerMark />`, `<CheckerFive />`, `<CheckerRibbon />` (`<CheckerStrip />`), and `<KockiceCluster />` render, then they apply `#273B8F` Royal Blue, `#ED1C24` Checker Red, and `#0D1333` Shack Navy tokens (`FR-2`, `UX-DR2`).
- Given a mobile smartphone viewport (`375×812` and `320×568`), when the visitor taps the Hamburger button in `<SiteHeader />`, then the button and nav links measure `≥ 44×44px`, the drawer toggles `aria-expanded`, closes on `Escape`, and has zero horizontal overflow (`NFR-2`, `UX-DR3`).
- Given `netlify.toml` and `.github/workflows/ci-netlify.yml`, when `npm run typecheck`, `npm run test:unit`, `npm run build`, and `npm run test:e2e` execute, then all checks exit `0` across Desktop (`1440×900`) and Mobile (`375×812`) Playwright projects (`FR-14`, `FR-15`, `AD-8`, `AD-9`).

## Implementation Notes

- Initialized the Next.js 15 App Router + React 19 + TypeScript 5.7 + Tailwind CSS 4 + Vitest + Playwright (`Desktop Chrome 1440×900` and `Mobile iPhone 375×812`) scaffold at repository root while preserving `docs/` untouched for the live GitHub Pages Stakeholder Portal.
- Populated `public/brand/` (`wrtc-logo.svg`, `wrtc-logo-white.svg`, `hrs-logo.svg`) and `public/files/` (`wrtc-2030-selection-rules-v1.0.pdf`, `wrtc-2030-selection-rules-qa-v1.0.pdf`, `wrtc-2030-score-calculation-examples.pdf`) from `wrtc2030.hr`, verified by `scripts/validate-data.ts`.
- Followed Red → Green → Refactor TDD: wrote failing Vitest unit/component tests (`tests/unit/brand-and-header.test.tsx`) and Playwright E2E tests (`tests/e2e/foundation.spec.ts`) before implementing `<WrtcLogo />`, `<CheckerMark />`, `<CheckerFive />`, `<CheckerRibbon />` (`<CheckerStrip />`), `<KockiceCluster />`, `<ThemeToggle />`, `<SiteHeader />`, `<SiteFooter />`, `src/app/globals.css`, `src/app/layout.tsx`, and `src/app/page.tsx`.
- Configured `netlify.toml` (`@netlify/plugin-nextjs`, Node 22) and `.github/workflows/ci-netlify.yml` to run all 5 CI verification gates alongside the `deploy-github-pages` job.

## Spec Change Log

## Review Triage Log

- `scripts/validate-data.ts` (`low` → `patch`): Direct CLI entrypoint guard used raw string interpolation `file://${process.argv[1]}`, which breaks on paths containing spaces or URL-encoded characters; patched to `pathToFileURL(path.resolve(process.argv[1])).href`.
- `src/components/brand/*` & `src/components/layout/*` (`false`): Verified all I/O matrix rows, zero-FOUC theme initialization, `<CheckerRibbon />` / `<CheckerStrip />` exports, and mobile drawer `≥ 44×44px` tap targets pass across unit and Desktop/Mobile E2E suites.

## Verification

**Commands:**
- `npm run validate:data` -- expected: exits 0 confirming official brand SVGs and 3 Selection Rules v1.0 PDFs are present and non-empty
- `npm run typecheck` -- expected: `tsc --noEmit` exits 0 with zero TypeScript errors
- `npm run test:unit` -- expected: `vitest run` passes 100% of unit and component tests
- `npm run build` -- expected: `next build` statically generates routes and exits 0
- `npm run test:e2e` -- expected: `playwright test` passes 100% of tests on `Desktop Chrome (1440x900)` and `Mobile iPhone (375x812)`
