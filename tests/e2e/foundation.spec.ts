import { test, expect } from '@playwright/test';

test.describe('Story 1.1 — WRTC 2030 Foundation, Zero-FOUC Theme & Mobile Navigation', () => {
  test('First visit (OS light): sets data-theme="day" before paint, displays wrtc-logo.svg, and sets zero cookies', async ({
    browser,
  }) => {
    const context = await browser.newContext({ colorScheme: 'light' });
    const page = await context.newPage();

    await page.goto('/');

    const htmlTheme = await page.locator('html').getAttribute('data-theme');
    expect(htmlTheme).toBe('day');

    const dayLogo = page.locator('.site-header img.only-day');
    const nightLogo = page.locator('.site-header img.only-night');

    await expect(dayLogo).toBeVisible();
    await expect(nightLogo).toBeHidden();

    // Verify zero third-party or tracking cookies (NFR-3)
    const cookies = await context.cookies();
    expect(cookies).toHaveLength(0);

    await context.close();
  });

  test('First visit (OS dark): sets data-theme="night" before paint and displays wrtc-logo-white.svg', async ({
    browser,
  }) => {
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();

    await page.goto('/');

    const htmlTheme = await page.locator('html').getAttribute('data-theme');
    expect(htmlTheme).toBe('night');

    const dayLogo = page.locator('.site-header img.only-day');
    const nightLogo = page.locator('.site-header img.only-night');

    await expect(nightLogo).toBeVisible();
    await expect(dayLogo).toBeHidden();

    await context.close();
  });

  test('ThemeToggle switches Day <-> Night, persists wrtc2030-theme in localStorage, and normalizes invalid stored values', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('wrtc2030-theme', 'invalid-theme-value');
    });

    await page.goto('/');

    // Invalid stored value normalized to "day"
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'day');

    const nightBtn = page.getByRole('button', { name: 'Night', exact: true });
    const dayBtn = page.getByRole('button', { name: 'Day', exact: true });

    await nightBtn.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'night');
    await expect(nightBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(dayBtn).toHaveAttribute('aria-pressed', 'false');

    const storedAfterNight = await page.evaluate(() =>
      window.localStorage.getItem('wrtc2030-theme')
    );
    expect(storedAfterNight).toBe('night');

    await dayBtn.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'day');
    await expect(dayBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(nightBtn).toHaveAttribute('aria-pressed', 'false');
  });

  test('Mobile navigation ergonomics (375x812 and 320x568): >=44x44px tap targets, Escape dismissal, and zero horizontal overflow', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const hamburger = page.getByRole('button', { name: /toggle mobile menu/i });
    await expect(hamburger).toBeVisible();
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');

    const btnBox = await hamburger.boundingBox();
    expect(btnBox).not.toBeNull();
    expect(btnBox!.width).toBeGreaterThanOrEqual(44);
    expect(btnBox!.height).toBeGreaterThanOrEqual(44);

    // Open mobile drawer
    await hamburger.click();
    await expect(hamburger).toHaveAttribute('aria-expanded', 'true');

    const navLinks = page.locator('#site-nav-menu a.site-nav__link');
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThanOrEqual(6);

    for (let i = 0; i < linkCount; i++) {
      const box = await navLinks.nth(i).boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.height).toBeGreaterThanOrEqual(44);
    }

    // Escape key closes drawer
    await page.keyboard.press('Escape');
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');

    // Verify zero horizontal overflow at 375x812
    const overflow375 = await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth
    );
    expect(overflow375).toBe(true);

    // Verify zero horizontal overflow at 320x568
    await page.setViewportSize({ width: 320, height: 568 });
    const overflow320 = await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth
    );
    expect(overflow320).toBe(true);
  });
});
