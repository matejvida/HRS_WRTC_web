import { test, expect } from '@playwright/test';

test.describe('WRTC 2030 AI Assistant (<WrtcAiAssistant />) (Story 4.3)', () => {
  test('opens floating drawer, triggers preset pill, and receives grounded response with citation', async ({ page }) => {
    await page.goto('/competition/selection-rules');

    // Floating action button exists and is visible
    const fab = page.locator('#ai-fab');
    await expect(fab).toBeVisible();

    // Click FAB to open drawer
    await fab.click();

    const drawer = page.locator('#ai-drawer');
    await expect(drawer).toBeVisible();

    // Verify preset pills are present
    const scoringPill = page.getByRole('button', { name: /Scoring Formula & Caps\?/i });
    await expect(scoringPill).toBeVisible();

    // Click preset pill
    await scoringPill.click();

    // User message should appear in chat
    await expect(page.locator('.chat-msg-user')).toContainText(/Scoring Formula & Caps\?/i);

    // Assistant response should appear and include citations
    const assistantMsg = page.locator('.chat-msg-assistant').last();
    await expect(assistantMsg).toBeVisible({ timeout: 5000 });
    await expect(assistantMsg).toContainText(/Selection Rules|Section 5|Section 6/i);

    // Close drawer via Escape key
    await page.keyboard.press('Escape');
    await expect(drawer).not.toBeVisible();
  });

  test('sends custom query and displays assistant reply', async ({ page }) => {
    await page.goto('/');

    const fab = page.locator('#ai-fab');
    await fab.click();

    const input = page.locator('#ai-input');
    await input.fill('What is slavonski kulen?');
    await page.locator('#ai-send-btn').click();

    // Assistant reply contains kulen info
    const assistantMsg = page.locator('.chat-msg-assistant').last();
    await expect(assistantMsg).toBeVisible({ timeout: 5000 });
    await expect(assistantMsg).toContainText(/kulen/i);
  });

  test('mobile viewport (375x812) adapts drawer with zero horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const fab = page.locator('#ai-fab');
    await fab.click();

    const drawer = page.locator('#ai-drawer');
    await expect(drawer).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Close via close button
    const closeBtn = page.locator('#ai-close-btn');
    await closeBtn.click();
    await expect(drawer).not.toBeVisible();
  });
});
