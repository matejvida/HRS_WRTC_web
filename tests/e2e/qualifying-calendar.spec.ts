import { test, expect } from '@playwright/test';

test.describe('Qualifying Events Calendar (/competition/qualifying-events) - Desktop & Mobile (Story 2.3)', () => {
  test('renders 24-contest calendar, pinned Event #1 countdown ticker, and mode filters', async ({ page }) => {
    await page.goto('/competition/qualifying-events');

    // Heading
    await expect(page.locator('h1')).toContainText(/Qualifying Events Calendar/i);

    // Event #1 Pinned Countdown Ticker
    const ticker = page.locator('[data-testid="next-event-ticker"]');
    await expect(ticker).toBeVisible();
    await expect(ticker).toContainText(/9A DX Contest 2026/i);
    await expect(ticker).toContainText(/19–20 December 2026 UTC/i);

    // Default 24 events
    const eventCards = page.locator('[data-testid="event-card"]');
    await expect(eventCards).toHaveCount(24);

    // First and last events
    await expect(page.locator('text=9A DX Contest 2026').first()).toBeVisible();
    await expect(page.locator('text=CQ WW CW 2028').first()).toBeVisible();
  });

  test('filters events by mode (CW, SSB, Mixed) and synchronizes with URL search params', async ({ page }) => {
    await page.goto('/competition/qualifying-events');

    // Click CW filter
    await page.click('button:has-text("CW"):not(:has-text("SSB"))');
    await expect(page).toHaveURL(/.*[?&]mode=CW/);

    const eventCards = page.locator('[data-testid="event-card"]');
    // There are 10 CW events in the 24-event schedule
    await expect(eventCards).toHaveCount(10);
    await expect(page.locator('text=ARRL International DX Contest CW 2027')).toBeVisible();

    // Click SSB filter
    await page.click('button:has-text("SSB"):not(:has-text("CW"))');
    await expect(page).toHaveURL(/.*[?&]mode=SSB/);
    // 10 SSB events in the 24-event schedule
    await expect(eventCards).toHaveCount(10);
    await expect(page.locator('text=ARRL International DX Contest SSB 2027')).toBeVisible();

    // Direct deep-link URL navigation with mode
    await page.goto('/competition/qualifying-events?mode=Mixed');
    // 4 Mixed events (9A DX 2026, 9A DX 2027, IARU 2027, IARU 2028)
    await expect(page.locator('[data-testid="event-card"]')).toHaveCount(4);
  });

  test('mobile viewport (375x812) has vertical stacking and zero horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/competition/qualifying-events');

    // Verify zero horizontal page overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Verify all 24 cards stack cleanly
    const cards = page.locator('[data-testid="event-card"]');
    await expect(cards).toHaveCount(24);
  });
});
