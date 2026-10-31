import { test, expect } from '@playwright/test';

test.describe('Sponsors Hub (/sponsors/) (Story 4.2)', () => {
  test('renders institutional host, sponsor tiers, and inquiry links on desktop', async ({ page }) => {
    await page.goto('/sponsors');

    // Page Heading
    await expect(page.locator('h1')).toContainText(/Partners & Sponsors/i);

    // Institutional Host
    await expect(page.getByRole('heading', { name: /Croatian Amateur Radio/i })).toBeVisible();
    const hrsLink = page.getByRole('link', { name: /Visit HRS Official Site/i });
    await expect(hrsLink).toHaveAttribute('href', 'https://www.hamradio.hr/');

    // Sponsor Tiers
    await expect(page.getByRole('heading', { name: 'Principal Partners' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Equipment & Technology' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Contest Clubs & DX Foundations' })).toBeVisible();

    // Mailto CTAs
    const mailtoLink = page.getByRole('link', { name: /Inquire/i }).first();
    await expect(mailtoLink).toHaveAttribute('href', /mailto:wrtc2030@hamradio\.hr/);

    // Rule 8.D Notice
    await expect(page.getByText(/Selection Rules v1\.0 Section 8\.D/i)).toBeVisible();
    await expect(page.getByText(/1 January 2029/i)).toBeVisible();
  });

  test('strictly enforces AD-6 non-transactional invariants in DOM', async ({ page }) => {
    await page.goto('/sponsors');

    // No crowdfunding meters or progress bars
    await expect(page.locator('progress')).toHaveCount(0);

    // No payment checkout or submit buttons
    await expect(page.locator('input[type="submit"], button[type="submit"]')).toHaveCount(0);
    await expect(page.locator('button:has-text("Pay"), button:has-text("Checkout"), button:has-text("Donate")')).toHaveCount(0);
  });

  test('mobile viewport (375x812) renders with zero root horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/sponsors');

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Institutional host visible on mobile
    await expect(page.getByRole('heading', { name: /Croatian Amateur Radio/i })).toBeVisible();
  });
});
