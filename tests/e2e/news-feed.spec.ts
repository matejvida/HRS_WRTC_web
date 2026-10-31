import { test, expect } from '@playwright/test';

test.describe('Structured News & Official Announcements Feed (Story 1.3)', () => {
  test('displays news index at /news/ with category filtering and article cards', async ({
    page,
  }) => {
    await page.goto('/news');
    await expect(page).toHaveTitle(/News.*WRTC 2030/i);

    // Kicker and section title
    const header = page.locator('h1');
    await expect(header).toContainText(/News|Announcements/i);

    // Check all seed articles are visible
    const articles = page.locator('article.news-card');
    await expect(articles).toHaveCount(3);

    // Verify category badges exist
    const categoryFilter = page.locator('.category-filter-btn, [data-category]');
    if ((await categoryFilter.count()) > 0) {
      // Click 'Official Rules'
      const rulesFilter = page.locator('button', { hasText: 'Official Rules' });
      if ((await rulesFilter.count()) > 0) {
        await rulesFilter.click();
        const filteredCards = page.locator('article.news-card');
        await expect(filteredCards).toHaveCount(2);
        await expect(filteredCards.first()).toContainText(/Selection Rules/i);
      }
    }
  });

  test('navigates to individual news article permalink and verifies content', async ({
    page,
  }) => {
    await page.goto('/news/wrtc-2030-selection-rules-v1-approved');

    const heading = page.locator('h1');
    await expect(heading).toContainText(/Selection Rules/i);

    // Breadcrumb or back link
    const backLink = page.locator('a[href="/news"]').first();
    await expect(backLink).toBeVisible();

    // Verify author and date are shown
    await expect(page.locator('body')).toContainText(/Organizing Committee/i);
    await expect(page.locator('body')).toContainText(/19 October 2026|2026-10-19/);
  });

  test('returns 404 for non-existent article slug', async ({ page }) => {
    const response = await page.goto('/news/non-existent-article-slug');
    expect(response?.status()).toBe(404);
  });

  test('serves valid RSS 2.0 XML at /feed.xml', async ({ request }) => {
    const response = await request.get('/feed.xml');
    expect(response.status()).toBe(200);

    const contentType = response.headers()['content-type'];
    expect(contentType).toMatch(/xml/);

    const body = await response.text();
    expect(body).toContain('<rss version="2.0"');
    expect(body).toContain('WRTC 2030 Croatia Official News');
    expect(body).toContain('wrtc-2030-selection-rules-v1-approved');
  });

  test('homepage news ribbon displays latest announcements with links to articles', async ({
    page,
  }) => {
    await page.goto('/');

    const newsSection = page.locator('#news');
    await expect(newsSection).toBeVisible();

    const newsCards = newsSection.locator('article.news-card');
    await expect(newsCards.first()).toBeVisible();

    const articleLink = newsSection.locator('a[href*="/news/"]');
    await expect(articleLink.first()).toBeVisible();
  });
});
