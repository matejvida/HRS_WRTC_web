import { test, expect } from '@playwright/test';

test.describe('Standings Explorer (/competition/standings) - Desktop & Mobile (Story 3.2)', () => {
  test('renders standings leaderboard, cutoff row, and region filters', async ({ page }) => {
    await page.goto('/competition/standings');

    // Page Heading
    await expect(page.locator('h1')).toContainText(/Qualification Standings/i);

    // Filter controls present
    await expect(page.getByTestId('region-pill-Europe')).toBeVisible();
    await expect(page.getByTestId('region-pill-Youth')).toBeVisible();

    // Cutoff row/card exists and is visible
    await expect(page.locator('[data-testid="cutoff-marker"]:visible').first()).toBeVisible();

    // Verify key operator from simulation is visible
    const opElement = page
      .locator('[data-testid="operator-row"]:visible, [data-testid="operator-card"]:visible')
      .filter({ hasText: '9A5W' })
      .first();
    await expect(opElement).toBeVisible();
  });

  test('filters operators in real-time via callsign search and updates URL', async ({ page }) => {
    await page.goto('/competition/standings');

    const searchInput = page.locator('input[placeholder*="search" i]');
    await searchInput.fill('KL7YY');

    await expect(page).toHaveURL(/.*[?&]call=KL7YY/);

    // KL7YY is visible in the filtered results
    const kl7Element = page
      .locator('[data-testid="operator-row"]:visible, [data-testid="operator-card"]:visible')
      .filter({ hasText: 'KL7YY' })
      .first();
    await expect(kl7Element).toBeVisible();

    // 9A5W is filtered out
    const naFiltered = page
      .locator('[data-testid="operator-row"]:visible, [data-testid="operator-card"]:visible')
      .filter({ hasText: '9A5W' });
    await expect(naFiltered).toHaveCount(0);
  });

  test('mobile viewport (375x812) has zero root horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/competition/standings');

    // Verify zero horizontal page overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Operator elements are visible
    const opElement = page
      .locator('[data-testid="operator-row"]:visible, [data-testid="operator-card"]:visible')
      .filter({ hasText: '9A5W' })
      .first();
    await expect(opElement).toBeVisible();
  });
});
