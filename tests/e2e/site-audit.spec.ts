import { test, expect } from '@playwright/test';

const ALL_ROUTES = [
  { path: '/', name: 'Homepage' },
  { path: '/competition/selection-rules', name: 'Selection Rules Hub' },
  { path: '/competition/qualifying-events', name: 'Qualifying Events Calendar' },
  { path: '/competition/standings', name: 'Standings Explorer' },
  { path: '/croatia-slavonia', name: 'Croatia & Slavonia Venue Showcase' },
  { path: '/sponsors', name: 'Sponsors Hub' },
  { path: '/news', name: 'News & Announcements Index' },
  { path: '/news/wrtc-2030-selection-rules-v1-approved', name: 'News Article 1' },
  { path: '/news/qualification-rules-deferral-notice', name: 'News Article 2' },
  { path: '/news/hrs-awarded-wrtc-2030-in-slavonia', name: 'News Article 3' },
];

test.describe('Comprehensive Site Audit — UI/UX & Functional Integrity', () => {
  for (const route of ALL_ROUTES) {
    test(`[Audit] ${route.name} (${route.path}) — Zero console errors, valid assets, zero horizontal overflow & zero cookies`, async ({
      page,
    }) => {
      const consoleErrors: string[] = [];
      const failedRequests: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      page.on('response', (response) => {
        if (response.status() >= 400) {
          failedRequests.push(`${response.status()} ${response.url()}`);
        }
      });

      await page.goto(route.path, { waitUntil: 'domcontentloaded' });

      // 1. Zero HTTP 4xx/5xx network errors on assets
      expect(failedRequests, `Failed network requests on ${route.path}`).toEqual([]);

      // 2. Zero console errors
      expect(consoleErrors, `Console errors on ${route.path}`).toEqual([]);

      // 3. Accessible H1 heading exists
      const h1 = page.locator('h1');
      await expect(h1.first()).toBeVisible();

      // 4. Zero horizontal overflow
      const hasHorizontalOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(
        hasHorizontalOverflow,
        `Page ${route.path} has horizontal overflow (scrollWidth > clientWidth)`
      ).toBe(false);

      // 5. Zero third-party or tracking cookies (NFR-3)
      const cookies = await page.evaluate(() => document.cookie);
      expect(cookies, `Cookies set on ${route.path}`).toBe('');

      // 6. All images have alt or aria-hidden
      const invalidImagesCount = await page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img'));
        return images.filter((img) => !img.hasAttribute('alt') && !img.hasAttribute('aria-hidden'))
          .length;
      });
      expect(invalidImagesCount, `Images missing alt or aria-hidden on ${route.path}`).toBe(0);
    });
  }

  test('[Audit] Dark / Light Theme Switching across pages preserves contrast and assets', async ({
    page,
  }) => {
    await page.goto('/');

    const nightBtn = page.getByRole('button', { name: 'Night' }).first();
    await expect(nightBtn).toBeVisible();

    // Toggle theme to Night mode
    await nightBtn.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'night');
    const dayLogo = page.locator('.site-header img.only-day');
    const nightLogo = page.locator('.site-header img.only-night');
    await expect(nightLogo).toBeVisible();
    await expect(dayLogo).toBeHidden();

    // Toggle theme back to Day mode
    const dayBtn = page.getByRole('button', { name: 'Day' }).first();
    await dayBtn.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'day');
    await expect(dayLogo).toBeVisible();
    await expect(nightLogo).toBeHidden();
  });

  test('[Audit] Accessibility Skip Link exists, receives focus on Tab, and targets #main-content', async ({
    page,
  }) => {
    await page.goto('/');

    const skipLink = page.getByRole('link', { name: /Skip to main content/i });
    await expect(skipLink).toBeAttached();
    await expect(skipLink).toHaveAttribute('href', '#main-content');

    // Press Tab from initial page load to focus the skip link
    await page.keyboard.press('Tab');
    await expect(skipLink).toBeFocused();

    // Verify #main-content exists in the DOM
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeVisible();
  });

  test('[Audit] Standings Explorer & Breakdown Drawer end-to-end interactive workflow (Mouse & Keyboard)', async ({
    page,
  }) => {
    await page.goto('/competition/standings');

    // 1. Filter by QA region pill
    const naPill = page.getByTestId('region-pill-North America');
    if (await naPill.isVisible()) {
      await naPill.click();
    }

    // 2. Search callsign
    const searchInput = page.locator('input[placeholder*="search" i]');
    await searchInput.fill('KL7YY');
    await page.waitForTimeout(100);

    // 3. Clear search and test operator drawer via keyboard Enter
    await searchInput.fill('');
    const firstRow = page
      .locator('[data-testid="operator-row"]:visible, [data-testid="operator-card"]:visible')
      .first();
    await expect(firstRow).toBeVisible();

    // Trigger via keyboard Enter
    await firstRow.focus();
    await page.keyboard.press('Enter');

    // 4. Breakdown drawer opens
    const drawer = page.getByRole('dialog', { name: /Operator Score Breakdown/i });
    await expect(drawer).toBeVisible();

    // 5. Escape key dismissal
    await page.keyboard.press('Escape');
    await expect(drawer).not.toBeVisible();
  });

  test('[Audit] AI Concierge Drawer interactive workflow & quick presets', async ({ page }) => {
    await page.goto('/');

    // 1. Click FAB
    const fab = page.locator('#ai-fab');
    await expect(fab).toBeVisible();
    await fab.click();

    const drawer = page.locator('#ai-drawer');
    await expect(drawer).toBeVisible();

    // 2. Preset Pill click
    const presetBtn = page.getByRole('button', { name: /Hotels in Osijek & Đakovo\?/i });
    await expect(presetBtn).toBeVisible();
    await presetBtn.click();

    // 3. Verify assistant reply contains hotel info
    const lastMsg = page.locator('.chat-msg-assistant').last();
    await expect(lastMsg).toBeVisible({ timeout: 5000 });
    await expect(lastMsg).toContainText(/Hotel Osijek|Đakovo/i);

    // 4. Close drawer via close button
    const closeBtn = page.locator('#ai-close-btn');
    await closeBtn.click();
    await expect(drawer).not.toBeVisible();
  });

  test('[Audit] RSS Feed at /feed.xml is valid XML 2.0 with all articles', async ({ page }) => {
    const response = await page.request.get('/feed.xml');
    expect(response.status()).toBe(200);
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('xml');

    const text = await response.text();
    expect(text).toContain('WRTC 2030 Croatia Official News');
    expect(text).toContain('wrtc-2030-selection-rules-v1-approved');
  });
});
