import { test, expect } from '@playwright/test';

test.describe('Selection Rules Hub (/competition/selection-rules) - Desktop & Mobile (Story 2.2)', () => {
  test('renders 3-tab hub, sticky TOC, Tables 1–7, and official PDF download cards', async ({ page }) => {
    await page.goto('/competition/selection-rules');

    // Heading & Title
    await expect(page.locator('h1')).toContainText(/Selection Criteria Rules/i);

    // 3 Tabs present
    const tabs = page.locator('[role="tab"]');
    await expect(tabs).toHaveCount(3);
    await expect(tabs.nth(0)).toContainText(/Selection Rules/i);
    await expect(tabs.nth(1)).toContainText(/Questions & Answers/i);
    await expect(tabs.nth(2)).toContainText(/Score Calculation Examples/i);

    // Active tab is Selection Rules
    await expect(page.locator('#section-1')).toBeVisible();

    // Tables 1–7 are rendered
    await expect(page.locator('text=9A DX Contest 2026').first()).toBeVisible();
    await expect(page.locator('text=CQ WW CW 2028').first()).toBeVisible();
    await expect(page.locator('text=EU #1').first()).toBeVisible();
    await expect(page.locator('text=Defending Champions').first()).toBeVisible();

    // Official PDF downloads in visible card
    const visiblePdfCard = page.locator('aside[aria-label="Official Document Downloads"]:visible');
    const pdfLinks = visiblePdfCard.locator('a[download]');
    await expect(pdfLinks).toHaveCount(3);
    await expect(visiblePdfCard.locator('a[href="/files/wrtc-2030-selection-rules-v1.0.pdf"]')).toBeVisible();
    await expect(visiblePdfCard.locator('a[href="/files/wrtc-2030-selection-rules-qa-v1.0.pdf"]')).toBeVisible();
    await expect(visiblePdfCard.locator('a[href="/files/wrtc-2030-score-calculation-examples.pdf"]')).toBeVisible();
  });

  test('switches tabs smoothly and synchronizes URL query params (?tab=qa, ?tab=examples)', async ({ page }) => {
    await page.goto('/competition/selection-rules');

    // Click Questions & Answers
    await page.click('button[role="tab"]:has-text("Questions & Answers")');
    await expect(page).toHaveURL(/.*[?&]tab=qa/);
    await expect(page.locator('text=How did you prepare these Qualification Rules?')).toBeVisible();

    // Click Score Calculation Examples
    await page.click('button[role="tab"]:has-text("Score Calculation Examples")');
    await expect(page).toHaveURL(/.*[?&]tab=examples/);
    await expect(page.locator('text=Operating Outside an Applicant’s Home QA')).toBeVisible();

    // Direct deep-link URL navigation
    await page.goto('/competition/selection-rules?tab=qa');
    await expect(page.locator('text=Why is the WRTC qualification contest list almost the same')).toBeVisible();
  });

  test('mobile viewport (375x812) has zero root horizontal overflow and collapsible TOC', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/competition/selection-rules');

    // Collapsible TOC exists on mobile
    const tocDetails = page.locator('details.toc');
    await expect(tocDetails).toBeVisible();

    // Verify zero horizontal page overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Verify table container allows horizontal scroll without breaking page
    const tableContainers = page.locator('.overflow-x-auto');
    expect(await tableContainers.count()).toBeGreaterThan(0);
  });
});
