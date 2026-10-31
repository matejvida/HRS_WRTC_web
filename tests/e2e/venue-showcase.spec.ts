import { test, expect } from '@playwright/test';

test.describe('Croatia & Slavonia Venue Showcase (/croatia-slavonia/) (Story 4.1)', () => {
  test('renders propagation arena, destination cards, gastronomy, and transit table on desktop', async ({ page }) => {
    await page.goto('/croatia-slavonia');

    // Page Heading
    await expect(page.locator('h1')).toContainText(/Croatia & Slavonia/i);

    // Propagation Arena Section
    await expect(page.getByText('Pannonian Propagation Arena')).toBeVisible();
    await expect(page.getByText('0° horizon take-off', { exact: true })).toBeVisible();
    await expect(page.getByText(/85m–110m ASL/i).first()).toBeVisible();

    // Destination Cards
    await expect(page.getByRole('heading', { name: /Osijek/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Đakovo/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Čepin/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Kopački Rit/i })).toBeVisible();

    // Gastronomy Section
    await expect(page.getByText(/Slavonski Kulen/i).first()).toBeVisible();
    await expect(page.getByText('Fiš Paprikaš', { exact: true })).toBeVisible();
    await expect(page.getByText('Čobanac', { exact: true })).toBeVisible();
    await expect(page.getByText('Graševina', { exact: true })).toBeVisible();

    // Transit Table
    await expect(page.getByRole('cell', { name: 'OSI', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'ZAG', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'BUD', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'BEG', exact: true })).toBeVisible();
    await expect(page.getByText(/A5 Slavonika/i).first()).toBeVisible();
  });

  test('switches theme cleanly between Day and Night modes', async ({ page }) => {
    await page.goto('/croatia-slavonia');

    const html = page.locator('html');
    const nightBtn = page.getByRole('button', { name: 'Night' });
    const dayBtn = page.getByRole('button', { name: 'Day' });

    // Toggle Night
    await nightBtn.click();
    await expect(html).toHaveAttribute('data-theme', 'night');

    // Toggle Day
    await dayBtn.click();
    await expect(html).toHaveAttribute('data-theme', 'day');
  });

  test('mobile viewport (375x812) stacks cards with zero horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/croatia-slavonia');

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Verify key elements are visible on mobile
    await expect(page.getByRole('heading', { name: /Osijek/i })).toBeVisible();
    await expect(page.getByText(/Slavonski Kulen/i).first()).toBeVisible();
    await expect(page.getByRole('cell', { name: 'OSI', exact: true })).toBeVisible();
  });
});
