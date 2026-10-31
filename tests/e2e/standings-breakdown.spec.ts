import { test, expect } from '@playwright/test';

test.describe('Standings Breakdown Drawer & Score Simulator (Story 3.3)', () => {
  test('opens breakdown drawer upon operator click and closes via Escape key', async ({ page }) => {
    await page.goto('/competition/standings');

    // Click on 9A5W
    const opElement = page
      .locator('[data-testid="operator-row"]:visible, [data-testid="operator-card"]:visible')
      .filter({ hasText: '9A5W' })
      .first();
    await opElement.click();

    // Drawer should open
    const drawer = page.getByRole('dialog', { name: /Operator Score Breakdown for 9A5W/i });
    await expect(drawer).toBeVisible();

    // Verify drawer details
    await expect(drawer.getByText('9A5W')).toBeVisible();
    await expect(drawer.getByText('9A DX Contest')).toBeVisible();

    // Press Escape to close
    await page.keyboard.press('Escape');
    await expect(drawer).not.toBeVisible();
  });

  test('toggles simulator and calculates scores interactively', async ({ page }) => {
    await page.goto('/competition/standings');

    // Toggle simulator button
    const simToggle = page.getByRole('button', { name: /Score Simulator/i });
    await expect(simToggle).toBeVisible();
    await simToggle.click();

    // Simulator container visible
    await expect(page.getByText('Pre-Season Score Simulator')).toBeVisible();

    // Fill score inputs
    const opScoreInput = page.getByLabel(/Your Raw Score/i);
    await opScoreInput.fill('4000000');

    const leaderScoreInput = page.getByLabel(/QA Leader Raw Score/i);
    await leaderScoreInput.fill('5000000');

    // Verify calculated points update inside the simulator region
    const simRegion = page.getByRole('region', { name: 'Pre-Season Score Simulator' });
    await expect(simRegion.getByText('800.00 pts', { exact: true })).toBeVisible();
  });

  test('mobile viewport (375x812) opens drawer with zero horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/competition/standings');

    const opCard = page
      .locator('[data-testid="operator-card"]:visible')
      .filter({ hasText: '9A5W' })
      .first();
    await opCard.click();

    const drawer = page.getByRole('dialog', { name: /Operator Score Breakdown for 9A5W/i });
    await expect(drawer).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Close via close button
    const closeBtn = drawer.getByRole('button', { name: /Close drawer/i });
    await closeBtn.click();
    await expect(drawer).not.toBeVisible();
  });
});
