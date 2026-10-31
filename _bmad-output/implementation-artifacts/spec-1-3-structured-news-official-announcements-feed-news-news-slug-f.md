---
title: 'Story 1.3: Structured News & Official Announcements Feed (/news/, /news/[slug]/ & /feed.xml)'
type: 'feature'
created: '2026-10-31'
status: 'ready-for-dev'
route: 'dispatch'
review_loop_iteration: 0
context:
  - '_bmad-output/implementation-artifacts/epic-1-context.md'
  - '_bmad-output/implementation-artifacts/spec-1-2-dynamic-kockice-9a-airwaves-homepage-oc-roster-past-wrtcs-19.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** While the homepage now renders the foundation and static documentation links, contesters, national societies, and media followers have no way to browse historical and ongoing WRTC OC announcements, filter by official categories, read full individual articles with canonical permalinks, or subscribe via an RSS feed.

**Approach:** Implement a structured Markdown/MDX news engine rooted in `content/news/` (seeded with the 3 official historical announcements: Oct 3, 2026 Poreč Host Award, Oct 16, 2026 Deferral Notice, and Oct 19, 2026 Selection Rules v1.0 Approval), build a static news index page at `/news/` with category filtering (`Official Rules`, `Standings Update`, `Organization`, `Venue`), pre-render static permalink pages at `/news/[slug]/`, provide an RSS 2.0 XML feed at `/feed.xml`, and link the latest 3 announcements to the homepage news ribbon (`#news`).

## Boundaries & Constraints

**Always:**
- Pre-render all news routes statically at build time (`export const dynamic = 'error'` or static route generation via `generateStaticParams`).
- Seed `content/news/` with the 3 canonical announcements validated via `Zod` frontmatter schema (`title`, `date`, `category`, `summary`, `slug`, `author`).
- Ensure all news cards and permalinks apply Proposal 1 Croatian brand elements (`.checker`, `font-mono-tabular` UTC dates, `#273B8F` Royal Blue and `#ED1C24` Checker Red accents).
- Return valid RSS 2.0 XML from `/feed.xml` with channel metadata (`title`, `link`, `description`, `lastBuildDate`) and `<item>` tags for all articles.
- Maintain smartphone ergonomics (`320px–430px`) with zero horizontal overflow.

**Never:**
- Never require a dynamic database or external CMS runtime (`AD-4`).
- Never allow an invalid or missing article slug to cause a runtime 500 error; return Next.js `notFound()`.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| News Index (`/news/`) | Visitor opens `/news/` | Displays all published announcements newest-first with category filters (`All`, `Official Rules`, `Organization`, etc.) | Graceful empty-state card if no articles match a filter |
| News Article Permalink (`/news/[slug]/`) | Visitor navigates to `/news/rules-v1-approved/` | Displays full article content, publication date, author, category badge, and breadcrumb link back to `/news/` | Returns 404 via `notFound()` if `slug` does not exist |
| RSS Feed (`/feed.xml`) | RSS reader requests `/feed.xml` | Returns HTTP 200 with `Content-Type: application/xml` (or `text/xml`) containing valid RSS 2.0 XML with all articles | Valid XML syntax verified in unit tests |
| Homepage News Ribbon (`#news`) | Visitor views `#news` on `/` | Shows the top 2-3 latest articles with `.checker` kickers and direct links to `/news/[slug]/` | Seamlessly integrated into homepage flow |

</frozen-after-approval>

## Code Map

- `content/news/2026-10-03-hrs-awarded-wrtc-2030-in-slavonia.md` -- Announcement 1: Oct 3, 2026 Poreč Host Award.
- `content/news/2026-10-16-qualification-rules-deferral-notice.md` -- Announcement 2: Oct 16, 2026 Deferral Notice.
- `content/news/2026-10-19-wrtc-2030-selection-rules-v1-approved.md` -- Announcement 3: Oct 19, 2026 Selection Rules v1.0 Approval.
- `src/lib/schemas/news.schema.ts` -- `Zod` schema for news article frontmatter and post objects.
- `src/lib/news-loader.ts` -- Server loader reading and parsing Markdown from `content/news/` (e.g. `getAllNewsPosts()`, `getNewsPostBySlug(slug)`).
- `src/app/news/page.tsx` -- News index page with category filtering and article cards.
- `src/app/news/[slug]/page.tsx` -- Static article permalink page with `generateStaticParams()`.
- `src/app/feed.xml/route.ts` -- Route handler generating RSS 2.0 XML feed.
- `src/app/page.tsx` -- Connect homepage news ribbon to `getAllNewsPosts().slice(0, 3)`.
- `tests/unit/news-engine.test.tsx` -- Unit tests verifying news loader, schema validation, and RSS XML generation.
- `tests/e2e/news-feed.spec.ts` -- E2E tests verifying `/news/`, `/news/[slug]/`, `/feed.xml`, and category filtering.

## Tasks & Acceptance

**Execution:**
- [ ] `content/news/*.md`, `src/lib/schemas/news.schema.ts`, `src/lib/news-loader.ts` -- Author seed news articles, `Zod` schema, and server news loader -- Satisfies `FR-9`.
- [ ] `tests/unit/news-engine.test.tsx`, `tests/e2e/news-feed.spec.ts` -- Author failing unit tests and Playwright E2E tests verifying article listing, category filtering, permalink rendering, 404 on invalid slug, and RSS feed -- Enforces TDD Red phase.
- [ ] `src/app/news/page.tsx`, `src/app/news/[slug]/page.tsx`, `src/app/feed.xml/route.ts` -- Implement news index, static article permalinks, and `/feed.xml` Route Handler -- Satisfies `FR-9`, `NFR-1`.
- [ ] `src/app/page.tsx` -- Update homepage `#news` section to dynamically display latest news articles from loader -- Satisfies `FR-9`.
- [ ] `scripts/validate-data.ts` -- Add news article validation to `npm run validate:data` verifying all Markdown articles pass schema -- Satisfies `FR-9`, `AD-8`.

**Acceptance Criteria:**
- Given `content/news/` contains seed markdown files, when `getAllNewsPosts()` is called, then articles are returned sorted newest-first with valid categories and parsed frontmatter (`FR-9`).
- Given a visitor opens `/news/`, when they select a category filter (e.g. `Official Rules`), then only articles matching that category are displayed (`FR-9`).
- Given a visitor opens `/news/wrtc-2030-selection-rules-v1-approved/`, when the page renders, then the full article title, date, author, category badge, and markdown body render with zero FOUC and breadcrumbs (`FR-9`).
- Given a request to `/feed.xml`, when fetched, then it returns HTTP 200 with XML content containing `<rss version="2.0">`, channel title *"WRTC 2030 Croatia Official News"*, and an `<item>` for every article (`FR-9`).

## Implementation Notes

## Spec Change Log

## Review Triage Log

## Verification

**Commands:**
- `npm run validate:data` -- expected: exits 0 verifying all news articles pass Zod schema
- `npm run typecheck` -- expected: `tsc --noEmit` exits 0
- `npm run test:unit` -- expected: `vitest run` passes 100% of news unit tests
- `npm run build` -- expected: `next build` statically pre-renders `/news/`, `/news/[slug]/`, and `/feed.xml`
- `npm run test:e2e` -- expected: `playwright test` passes all news E2E tests
